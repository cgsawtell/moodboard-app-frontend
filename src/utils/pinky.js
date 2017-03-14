import {forEach} from 'lodash'

const pinky = (func, context) => {
  console.log('pinky!',func);
    const handlePromise = (resolve, reject) => {
      func.call(context,
        (...callbackArgs) => {
          forEach(callbackArgs, arg => console.log(arg))
          resolve(callbackArgs)
        }
      )
    }
    const promise = new Promise(handlePromise)
    return promise
}

export default pinky