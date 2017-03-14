import React, { Component } from 'react';
import {Stage, Layer} from 'react-konva';
import ImageEntity from '../image-entity';

class BoardRenderer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomLevel: 1,
      inputPosition:{x:0,y:0},
    }
    this.zoomStage = this.zoomStage.bind(this)
    this.saveMousePosition = this.saveMousePosition.bind(this)
  }
  saveMousePosition(e){
    // console.log(e.clientX);
  }
  zoomStage(e){
    e.preventDefault()
    const sensitivity = 0.001
    const minZoomLevel = 0.009
    const oldZoomLevel = this.state.zoomLevel
    let newZoomLevel = oldZoomLevel + e.deltaY * sensitivity
    if(newZoomLevel<minZoomLevel){ newZoomLevel = minZoomLevel}
    const stage = this.stageComponent.getStage()
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldZoomLevel - stage.x() / oldZoomLevel,
      y: stage.getPointerPosition().y / oldZoomLevel - stage.y() / oldZoomLevel,
    }
    stage.scale({x:newZoomLevel, y:newZoomLevel})

    const newPos = {
      x: -(mousePointTo.x - stage.getPointerPosition().x / newZoomLevel) * newZoomLevel,
      y: -(mousePointTo.y - stage.getPointerPosition().y / newZoomLevel) * newZoomLevel
    };
    stage.position(newPos);
    stage.batchDraw();

    this.setState({zoomLevel:newZoomLevel})
  }
  render() {
    const {entities, images, updateEntityPos, updateEntityScale} = this.props
    return (
      <div onWheel={this.zoomStage} onMouseMove={this.saveMousePosition}>
        <Stage 
          ref={el => {this.stageComponent = el}} 
          width={window.innerWidth} 
          height={window.innerHeight} 
          draggable={true}>
          <Layer>
          {
            entities.map(
              entity => {
                switch (entity.type) {
                  case 'image':
                    return (
                      <ImageEntity
                        key={entity.id}
                        image={ images[entity.id] }
                        entity={ entity }
                        updateEntityPos={ updateEntityPos }
                        updateEntityScale={ updateEntityScale }
                      />
                      )
                  default:
                    return ''
                }
              }
            )
          }
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default BoardRenderer;