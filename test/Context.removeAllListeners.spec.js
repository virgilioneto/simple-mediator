'use strict'
const EventEmitter = require('events').EventEmitter
const chai = require('chai')
const Context = require('../lib/Context')
const expect = chai.expect

chai.should()

describe('Context#on', () => {
  context('Valid operations', () => {
    it('Event and function', () => {
      let c = new Context('context')
      let result = c.removeAllListeners()
      expect(result).to.be.an.instanceof(EventEmitter)
      expect(result).to.have.property('_eventsCount')
      expect(result._eventsCount).to.be.a('Number')
      result._eventsCount.should.be.equal(0)
    })

    it('Same event and function more than once', () => {
      let t = Math.round(Math.random() * 10) || 2
      let c = new Context('context')
      for (let i = 1; i <= t; i++) {
        c.on(`event${i}`, () => {})
      }
      let result = c.removeAllListeners()
      expect(result).to.be.an.instanceof(EventEmitter)
      expect(result).to.have.property('_eventsCount')
      expect(result._eventsCount).to.be.a('Number')
      result._eventsCount.should.be.equal(t)
    })
  })
})
