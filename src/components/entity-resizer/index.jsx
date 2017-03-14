import React, { Component } from 'react';
import { Rect } from 'react-konva';

class EntityResizer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {x, y, resizeHitzoneSize, updateEntityScale, entity} = this.props
    return (
      <Rect 
        x={x} 
        y={y}
        width={resizeHitzoneSize}
        height={resizeHitzoneSize}
        fill={'red'}
        draggable={true}
        onDragMove={ 
          e => { 
            const scaleSensitivity = 0.001            
            const distanceFromPoint = distance(e.target.attrs.x,e.target.attrs.y,x,y)
            const scaleAdjustment = distanceFromPoint !== 0 ? distanceFromPoint * scaleSensitivity : 0
            console.log(distanceFromPoint, entity.scale+scaleAdjustment);
            updateEntityScale(entity.id, entity.scale+scaleAdjustment);
            //angle(e.target.attrs.x,e.target.attrs.y,x,y)
          }
        }
      />
    );
  }
}

function angle(x1,y1,x2,y2){
  return Math.atan2(y1-y2,x1-x2) * 180 / Math.PI
}

function direction(x1,y1,x2,y2){
  return Math.atan2(y2, x2) - Math.atan2(y1, x1)
}

function distance(x1,y1,x2,y2){
  const x = x2 - x1
  const y = y2 - y1
  return(length(x,y))
}

function length(x,y){
  const xSqr = Math.pow(x, 2)
  const ySqr = Math.pow(y, 2)
  return Math.sqrt(xSqr+ySqr)
}

export default EntityResizer;