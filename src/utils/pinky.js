/**
 * A utility function that wraps a callback style function in a promise.
 * @param {*callback function that need to be wrapped in promise} func 
 * @param {*context that the function is run in} context 
 * @returns promise
 */
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