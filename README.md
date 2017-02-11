# nullable-util
utility functions with Nullable

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)


## usage example
```js
const util = require('nullable-util')

const collection = [1, 2, 3, 4, 5]

util.first(collection)
// => Nullable.of(1)

util.first(collection. x => x > 3)
// => Nullable.of(4)

util.last(collection)
// => Nullable.of(5)

util.last(collection, x => x < 3)
// => Nullable.of(2)


const users = {
  1: {
    name: 'A'
    admin: false
  },
  2: {
    name: 'B',
    admin: true
  }
}

util.first(users)
// => ['1', {name: 'A', admin: false}]
// This returns a [key, value] pair as a 2-element Array.
// Note, Object property names are always strings.

util.first(users, user => user.admin)
// => ['2', {name: 'B', admin: true}]

```

`first` and `last` operate on Arrays and Array-likes (NodeList, etc.), plain Objects,
ES6 collections (Set and Map, but not WeakSet or WeakMap which are not iterable).

`first` can also operate on generators, but not `last` since generators may be infinite.

See test suite for more examples.


## installation

    $ npm install nullable-util


## running the tests

From package root:

    $ npm install
    $ npm test


## license

ISC. (c) MMXVII jsdnxxSee LICENSE.md
