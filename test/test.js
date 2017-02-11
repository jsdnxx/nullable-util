/* globals describe, it */
'use strict'

const expect = require('chai').expect
const nullableUtil = require('../')
const Nullable = require('nullable')

describe('first', () => {
  const first = nullableUtil.first

  describe('given an Array', () => {
    const arr = [1, 2, 3, 4, 5]

    it('returns the first', () => {
      const ret = first(arr)
      expect(ret).to.be.instanceof(Nullable)
      expect(ret.value).to.equal(1)
    })

    it('returns the first matching a predicate', () => {
      const ret = first(arr, (x) => x > 3)
      expect(ret).to.be.instanceof(Nullable)
      expect(ret.value).to.equal(4)
    })
  })

  describe('given an Object', () => {
    const obj = {1: 'one', 2: 'two', 3: 'three'}

    it('returns the first property as a [k, v] pair', () => {
      const ret = first(obj)
      expect(ret).to.be.instanceof(Nullable)
      expect(ret.value).to.deep.equal(['1', 'one'])
    })

    it('returns the first matching a predicate', () => {
      const ret = first(obj, ([k, v]) => v.startsWith('t'))
      expect(ret).to.be.instanceof(Nullable)
      expect(ret.value).to.deep.equal(['2', 'two'])
    })
  })

  describe('given a generator', () => {
    function * odds () {
      let i = 1
      while (true) {
        yield i
        i += 2
      }
    }

    it('returns the first value', () => {
      const ret = first(odds())
      expect(ret).to.be.instanceof(Nullable)
      expect(ret.value).to.equal(1)
    })

    it('returns the first matching a predicate', () => {
      const ret = first(odds(), (x) => x > 50)
      expect(ret).to.be.instanceof(Nullable)
      expect(ret.value).to.equal(51)
    })
  })

  describe('given a Set', () => {
    const set = new Set([1, 2, 3])

    it('returns the first value', () => {
      const ret = first(set)
      expect(ret).to.be.instanceof(Nullable)
      expect(ret.value).to.equal(1)
    })

    it('returns the first matching a predicate', () => {
      const ret = first(set, (x) => x > 2)
      expect(ret).to.be.instanceof(Nullable)
      expect(ret.value).to.equal(3)
    })
  })

  describe('given a Map', () => {
    const map = new Map([[1, 'one'], [2, 'two'], [3, 'three']])

    it('returns the first value', () => {
      const ret = first(map)
      expect(ret).to.be.instanceof(Nullable)
      expect(ret.value).to.deep.equal([1, 'one'])
    })

    it('returns the first matching a predicate', () => {
      const ret = first(map, ([k, v]) => k > 2)
      expect(ret).to.be.instanceof(Nullable)
      expect(ret.value).to.deep.equal([3, 'three'])
    })
  })

  describe('given an empty iterator', () => {
    const emptyArr = []
    const emptyObj = {}
    const emptySet = new Set()
    it('returns Nullable.EMPTY', () => {
      expect(first(emptyArr)).to.equal(Nullable.EMPTY)
      expect(first(emptyObj)).to.equal(Nullable.EMPTY)
      expect(first(emptySet)).to.equal(Nullable.EMPTY)
    })
  })
})

describe('last', () => {
  const last = nullableUtil.last

  describe('given an Array', () => {
    const arr = [1, 2, 3]

    it('returns the last value', () => {
      const ret = last(arr)
      expect(ret).to.be.instanceof(Nullable)
      expect(ret.value).to.equal(3)
    })

    it('returns the last matching a predicate', () => {
      const ret = last(arr, (x) => x < 3)
      expect(ret).to.be.instanceof(Nullable)
      expect(ret.value).to.equal(2)
    })
  })
  describe('given an Object', () => {
    const obj = {1: 'one', 2: 'two', 3: 'three'}
    it('returns the last value', () => {
      const ret = last(obj)
      expect(ret).to.be.instanceof(Nullable)
      expect(ret.value).to.deep.equal(['3', 'three'])
    })
    it('returns the last matching a predicate', () => {
      const ret = last(obj, ([k, v]) => v.startsWith('t'))
      expect(ret).to.be.instanceof(Nullable)
      expect(ret.value).to.deep.equal(['3', 'three'])
    })
  })
  describe('given a Set', () => {
    const set = new Set([1, 2, 3])
    it('returns the last value', () => {
      const ret = last(set)
      expect(ret).to.be.instanceof(Nullable)
      expect(ret.value).to.equal(3)
    })
    it('returns the last matching a predicate', () => {
      const ret = last(set, (x) => x < 3)
      expect(ret).to.be.instanceof(Nullable)
      expect(ret.value).to.equal(2)
    })
  })
  describe('given a Map', () => {
    const map = new Map([[1, 'one'], [2, 'two'], [3, 'three']])
    it('returns the last value', () => {
      const ret = last(map)
      expect(ret).to.be.instanceof(Nullable)
      expect(ret.value).to.deep.equal([3, 'three'])
    })
    it('returns the last matching a predicate', () => {
      const ret = last(map, ([k, v]) => v.startsWith('t'))
      expect(ret).to.be.instanceof(Nullable)
      expect(ret.value).to.deep.equal([3, 'three'])
    })
  })
  describe('given a generator', () => {
    function * generator () {}
    it('throws', () => {
      expect(() => last(generator())).to.throw(/finite collection/)
    })
  })
  describe('given an empty collection', () => {
    const emptyArray = []
    const emptyObj = {}
    const emptySet = new Set()
    it('returns Nullable.EMPTY', () => {
      expect(last(emptyArray)).to.equal(Nullable.EMPTY)
      expect(last(emptyObj)).to.equal(Nullable.EMPTY)
      expect(last(emptySet)).to.equal(Nullable.EMPTY)
    })
  })
})
