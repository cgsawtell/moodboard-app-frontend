let stage = null

const registerStage = (stageToRegister) => {
  if(!stage){
    stage = stageToRegister.getStage()
  }
}

const unregisterStage = () => {
  stage = null
}

const windowPositionToStagePosition = (x,y) => {
  if(stage){
    const scale = stage.attrs.scaleX || 1
    const scaledX = x / scale
    const scaledY = y / scale
    const relativeX = scaledX - stage.x() / scale
    const relativeY = scaledY - stage.y() / scale
    return {x: relativeX, y: relativeY}
  }
}

export {
  registerStage,
  unregisterStage,
  windowPositionToStagePosition
}