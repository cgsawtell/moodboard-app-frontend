import React, { Component } from 'react';
import { get, post, put} from 'axios';
import { each, cloneDeep } from 'lodash';
import shortid from 'shortid'
import fileType from 'file-type'
import BoardRenderer from '../board-renderer'
import {call, wait} from '../../utils/pinky'

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      name:'',
      description:'',
      entities:[],
      images:{}
    }
    this.handleDrop = this.handleDrop.bind(this)
    this.updateEntityPos = this.updateEntityPos.bind(this)
    this.updateEntityScale = this.updateEntityScale.bind(this)
  }
  async componentWillMount() {
    const boardData = await this.getBoard(this.props.boardId)
    const imagesArray = await this.getImages(boardData.entities)
    let images = {}
    imagesArray.forEach(
      (image => {
        images[image.id] = image.image
      })
    )
    this.addDropEventListeners()
    this.setState({
      _id:boardData._id,
      name: boardData.name,
      description:boardData.description,
      entities:boardData.entities,
      images
    })
  }
  async getBoard(id){
    const boardRequest = await get(`/api/board/${id}`)
    const {_id, name, description, entities} = boardRequest.data
    return {_id, name, description, entities}
  }
  getImages(entities){
    const imageEntities = entities.filter( entity => ( entity.type === 'image' ) )
    const imagePromises = imageEntities.map(
      entity => {
        return this.getImage(entity.id, entity.url)
      }
    )
    const handleImagesPromise = (resolve, reject) => {
      Promise.all(imagePromises)
      .then(
        images =>{
          resolve(images)
        }
      )
    }
    const imagesPromise = new Promise(handleImagesPromise)
    return imagesPromise
  }
  getImage(id, url){
    let image = new Image()
    image.src = url
    const handleImagePromise = (resolve, reject) => {
      image.onload = () => {
        resolve({id,image})
      }
    }
    const imagePromise = new Promise(handleImagePromise);
    return(imagePromise)
  }
  updateEntityPos(id, x, y){
    const entities = cloneDeep(this.state.entities)
    const entityIndex = entities.findIndex(entity => (entity.id === id))
    let entity = cloneDeep(entities[entityIndex])
    entity.x = x
    entity.y = y
    const updatedEntities = [...entities.slice(0,entityIndex), entity,...entities.slice(entityIndex+1, entities.length)]
    this.setState({entities:updatedEntities})
    this.persistEntityChanges(entity)
  }
  updateEntityScale(id, scale){
    const entities = cloneDeep(this.state.entities)
    const entityIndex = entities.findIndex(entity => (entity.id === id))
    let entity = cloneDeep(entities[entityIndex])
    entity.scale = scale
    const updatedEntities = [...entities.slice(0,entityIndex), entity,...entities.slice(entityIndex+1, entities.length)]
    this.setState({entities:updatedEntities})
    this.persistEntityChanges(entity)
  }
  persistEntityChanges(entity){
    const boardId = this.state._id
    const entityId = entity.id
    put(`/api/board/${boardId}/updateEntity/${entityId}`,{entity})
  }
  addDropEventListeners(){
    window.addEventListener("dragstart",this.handleDragStart)
    window.addEventListener("dragover",this.handleDragOver)
    window.addEventListener("drop",this.handleDrop)
  }
  componentWillUnmount() {
    this.removeDropEventListeners()
  }
  removeDropEventListeners(){
    window.removeEventListener("dragstart",this.handleDragStart)
    window.removeEventListener("dragover",this.handleDragOver)
    window.removeEventListener("drop",this.handleDrop)
  }
  handleDragStart(e){
    e.preventDefault()
    e.stopPropagation()
  }
  handleDragOver(e){
    e.preventDefault()
    e.stopPropagation()
  }
  async handleDrop(e){
    e.preventDefault()
    e.stopPropagation()
    let dropPosition = {}
    dropPosition.x = e.x
    dropPosition.y = e.y
    
    if(e.dataTransfer.files.length){
      this.processFiles(e.dataTransfer.files, dropPosition);
      return
    }
    if(e.dataTransfer.items.length){
      this.processDataTransferItems(e.dataTransfer.items, dropPosition)
    }
  }
  processDataTransferItems(items, dropPosition){
    each(items, async item => {
      console.log('item.type',item.type);
      switch (item.type) {
        case 'text/uri-list':
          const url = await this.dataTransferItemToString(item)
          const mimeTypeRequest = await get(`/api/file/mime-type?url=${url}`)
          switch (mimeTypeRequest.data.mimeType) {
            case 'image/png':
            case 'image/jpeg':
            case 'image/gif':
            case 'image/webp':            
              const downloadRequest = await post(`/api/file/download?url=${url}`)
              this.createAndSaveImageEntity({url:downloadRequest.data.fileUrl, dropPosition})
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
    })
  }
  dataTransferItemToString(item){
    return call(item, item.getAsString)
  }
  processFiles(files, dropPosition){
    each( 
      files,
      file => {
        switch (file.type) {
          case 'image/png':
          case 'image/jpeg':
          case 'image/gif':
          case 'image/webp':
            this.handleImageFile(file, dropPosition)
            break;
        
          default:
            alert(`file type ${file.type} not supported`)
            break;
        }
      }
    )
  }
  handleImageFile(file, dropPosition){
    const url = URL.createObjectURL(file)
    this.createAndSaveImageEntity({url, file, dropPosition})
  }
  createAndSaveImageEntity({url, file = undefined, dropPosition}){
    const newImageEntity = this.createImageEntity(url, dropPosition)
    this.addEntityToState(newImageEntity);
    this.addImageObject(newImageEntity.id, url)
    this.persistEntity(newImageEntity, file)
  }
  createImageEntity(url, dropPosition){
    const {x,y} = dropPosition
    return {
      type: "image",
      id: shortid.generate(),
      scale: 1,
      url,
      x,
      y
    }
  }
  async addImageObject(id, url){
    const image = new Image()
    image.src = url
    image.onload = () => {
      const imageObject = {[id]:image}
      const images = {...this.state.images, ...imageObject}
      this.setState({images})
    }
  }
  addEntityToState(newEntity){
    const oldEntities = this.state.entities
    const entities = [...oldEntities, newEntity]
    this.setState({entities})
  }
  async persistEntity(entity, file){
    const boardId = this.state._id
    if (file) {
      let data = new FormData()
      data.append('file',file)
      const fileUpload = await post('/api/file/upload', data, {headers:{"content-type":"multipart/form-data"}})
      entity.url = fileUpload.data.fileUrl
    }
    await put(`/api/board/${boardId}/addEntity`,{entity})
  }
  render() {
    return (
      <div>
        <BoardRenderer updateEntityPos={this.updateEntityPos} updateEntityScale={this.updateEntityScale} entities={this.state.entities} images={this.state.images}/>
      </div>
    );
  }
}

export default Board;