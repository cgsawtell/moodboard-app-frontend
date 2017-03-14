import React, { Component } from 'react';
import { Group,Rect, Image } from 'react-konva';
import EntityResizer from '../entity-resizer';

class ImageEntity extends Component {
  render() {
    const scale = 0.3
    const resizeHitzoneSize = 30
    const { entity, image, updateEntityPos, updateEntityScale} = this.props
    const imageDimentions = {
      width:image ? image.width:0,
      height:image ? image.height:0      
    }
    return (
      <Group
          x={entity.x}
          y={entity.y}
          scale={{x:entity.scale,y:entity.scale}}
          onMouseUp={
            e => { 
              const {x,y} = e.target.parent.attrs
              updateEntityPos(entity.id, x, y)
            }
          }
        draggable={true}>
        <Image
          image={image}
        />
        <EntityResizer entity={entity} updateEntityScale={updateEntityScale} x={0} y={0} resizeHitzoneSize={resizeHitzoneSize}/>
        <EntityResizer entity={entity} updateEntityScale={updateEntityScale} x={imageDimentions.width-resizeHitzoneSize} y={0} resizeHitzoneSize={resizeHitzoneSize}/>
        <EntityResizer entity={entity} updateEntityScale={updateEntityScale} x={0} y={imageDimentions.height-resizeHitzoneSize} resizeHitzoneSize={resizeHitzoneSize}/>
        <EntityResizer entity={entity} updateEntityScale={updateEntityScale} x={imageDimentions.width-resizeHitzoneSize} y={imageDimentions.height-resizeHitzoneSize} resizeHitzoneSize={resizeHitzoneSize}/>
      </Group>
    );
  }
}

export default ImageEntity;