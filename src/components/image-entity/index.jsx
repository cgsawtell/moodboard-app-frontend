import React, { Component } from 'react';
import { Group,Rect, Image } from 'react-konva';
import EntityResizer from '../entity-resizer';

class ImageEntity extends Component {
  
  render() {
    const scale = 0.3
    const resizeHitzoneSize = 30
    const { entity, image, updateEntityPos, updateEntityScale } = this.props
    const imageHeight = image.height
    const imageWidth = image.width
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
        <EntityResizer entity={entity} updateEntityScale={updateEntityScale} x={imageWidth-resizeHitzoneSize} y={0} resizeHitzoneSize={resizeHitzoneSize}/>
        <EntityResizer entity={entity} updateEntityScale={updateEntityScale} x={0} y={imageHeight-resizeHitzoneSize} resizeHitzoneSize={resizeHitzoneSize}/>
        <EntityResizer entity={entity} updateEntityScale={updateEntityScale} x={imageWidth-resizeHitzoneSize} y={imageHeight-resizeHitzoneSize} resizeHitzoneSize={resizeHitzoneSize}/>
      </Group>
    );
  }
}

export default ImageEntity;