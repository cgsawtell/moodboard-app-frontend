/**
 * A utility function that wraps a callback style function in a promise.
 * @param {*context that the function is run in} context 
 * @param {*callback function that need to be wrapped in promise} func 
 * @param {*the paramerters to be passed to the function to be run} params
 * @returns promise
 */
export const call = (context, func, params = []) => {
    const handlePromise = (resolve, reject) => {
      func.call(context, ...params,
        (...callbackArgs) => {
          resolve(callbackArgs)
        }
      )
    }
    const promise = new Promise(handlePromise)
    return promise
}

// takes function as param
// sets function as a resolve
// returns a promse so we can await

export const wait = (functionToWaitFor) => {
  const handlePromise = (resolve, reject) => {
    functionToWaitFor = ( ) => {
      resolve()
    }
  }
  return new Promise(handlePromise)
}