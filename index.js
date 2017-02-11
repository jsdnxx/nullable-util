'use strict'

const Nullable = require('nullable')

function isArraylike (obj) {
  return obj && typeof obj.length === 'number' && Number.isFinite(obj.length)
}

function isFinite (obj) {
  return obj && typeof obj.size === 'number' && Number.isFinite(obj.size)
}

function isIterable (obj) {
  return Symbol.iterator in obj
}

function first (collection, predicate) {
  if (!isIterable(collection)) {
    if (typeof collection === 'object') {
      const pair = [] // avoid creating garbage by re-using pair Array
      for (const key in collection) {
        pair[0] = key
        pair[1] = collection[key]
        if (!predicate || predicate(pair)) {
          return Nullable.of(pair)
        }
      }
      return Nullable.EMPTY
    }

    throw new TypeError('collection argument must be iterable!')
  }

  for (const item of collection) {
    if (!predicate || predicate(item)) {
      return Nullable.of(item)
    }
  }
  return Nullable.EMPTY
}

function last (collection, predicate) {
  if (isIterable(collection)) {
    if (isArraylike(collection)) {
      for (let i = collection.length - 1; i >= 0; i--) {
        const item = collection[i]
        if (!predicate || predicate(item)) {
          return Nullable.of(item)
        }
      }
      return Nullable.EMPTY
    } else {
      if (isFinite(collection)) {
        // slow path: we have to iterate everything, unfortunately
        let match
        let matched = false
        for (const item of collection) {
          if (!predicate || predicate(item)) {
            matched = true
            match = item
          }
        }
        return matched ? Nullable.of(match) : Nullable.EMPTY
      } else {
        throw new TypeError('collection argument must be a finite collection. Supported types: Array, Object, Set, Map')
      }
    }
  } else if (typeof collection === 'object') {
    // slow path: we materialize all pairs
    return last(Object.keys(collection).map(k => [k, collection[k]]))
  }
  return Nullable.EMPTY
}

module.exports.first = first
module.exports.last = last
