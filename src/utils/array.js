import {findIndex} from 'lodash';

export function update(array, index, elementToInsert) {
  return [...array.slice(0,index), elementToInsert, ...array.slice(index+1,array.length)]
}

export function drop(array, index) {
  return [...array.slice(0,index),...array.slice(index+1,array.length)]
}

export function replace(array, elementToInsert, predicate = {"id":elementToInsert.id}){
  let index = findIndex(array,predicate)
  return update(array, index, elementToInsert)
}

export function findAndDrop(array, elementToDrop, predicate = {"id":elementToDrop.id}) {
  let index = findIndex(array, predicate)
  return drop(array, index)
}