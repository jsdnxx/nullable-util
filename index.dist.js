'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Nullable = require('nullable');

function isArraylike(obj) {
  return obj && typeof obj.length === 'number' && Number.isFinite(obj.length);
}

function isFinite(obj) {
  return obj && typeof obj.size === 'number' && Number.isFinite(obj.size);
}

function isIterable(obj) {
  return Symbol.iterator in obj;
}

function first(collection, predicate) {
  if (!isIterable(collection)) {
    if ((typeof collection === 'undefined' ? 'undefined' : _typeof(collection)) === 'object') {
      var pair = []; // avoid creating garbage by re-using pair Array
      for (var key in collection) {
        pair[0] = key;
        pair[1] = collection[key];
        if (!predicate || predicate(pair)) {
          return Nullable.of(pair);
        }
      }
      return Nullable.EMPTY;
    }

    throw new TypeError('collection argument must be iterable!');
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = collection[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      if (!predicate || predicate(item)) {
        return Nullable.of(item);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return Nullable.EMPTY;
}

function last(collection, predicate) {
  if (isIterable(collection)) {
    if (isArraylike(collection)) {
      for (var i = collection.length - 1; i >= 0; i--) {
        var item = collection[i];
        if (!predicate || predicate(item)) {
          return Nullable.of(item);
        }
      }
      return Nullable.EMPTY;
    } else {
      if (isFinite(collection)) {
        // slow path: we have to iterate everything, unfortunately
        var match = void 0;
        var matched = false;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = collection[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _item = _step2.value;

            if (!predicate || predicate(_item)) {
              matched = true;
              match = _item;
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        return matched ? Nullable.of(match) : Nullable.EMPTY;
      } else {
        throw new TypeError('collection argument must be a finite collection. Supported types: Array, Object, Set, Map');
      }
    }
  } else if ((typeof collection === 'undefined' ? 'undefined' : _typeof(collection)) === 'object') {
    // slow path: we materialize all pairs
    return last(Object.keys(collection).map(function (k) {
      return [k, collection[k]];
    }));
  }
  return Nullable.EMPTY;
}

module.exports.first = first;
module.exports.last = last;

