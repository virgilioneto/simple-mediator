'use strict'
const chai = require('chai')
const Context = require('../lib/Context')
const expect = chai.expect

chai.should()

describe('Context#on', () => {
  context('Valid operations', () => {
    it('Without params', () => {
      let c = new Context('context')
      let count = c.getListenersCount()
      expect(count).to.be.a('Number')
      count.should.be.equal(0)
    })

    it('One bind', () => {
      let c = new Context('context')
      c.on('event', () => {})
      let count = c.getListenersCount('event')
      expect(count).to.be.a('Number')
      count.should.be.equal(1)
    })

    it('N binds', () => {
      let t = Math.round(Math.random() * 10) || 2
      let c = new Context('context')
      for (let i = 1; i <= t; i++) {
        c.on('event', () => {})
      }
      let count = c.getListenersCount('event')
      expect(count).to.be.a('Number')
      count.should.be.equal(t)
    })
  })
})
