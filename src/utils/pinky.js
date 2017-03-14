import {forEach} from 'lodash'

const pinky = (func, context) => {
    const handlePromise = (resolve, reject) => {
      func.call(context,
        (...callbackArgs) => {
          resolve(callbackArgs)
        }
      )
    }
    const promise = new Promise(handlePromise)
    return promise
}

export default pinky