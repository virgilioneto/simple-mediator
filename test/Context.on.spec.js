'use strict'
const chai = require('chai')
const Context = require('../lib/Context')
const expect = chai.expect

chai.should()

describe('Context#on', () => {
  context('Valid operations', () => {
    it('Event and function', () => {
      let c = new Context('context')
      let fn = () => {}
      c.on('event', fn)
      let listeners = c.getListeners('event')
      expect(listeners).to.be.an('Array')
      expect(listeners).to.have.length(1)
      expect(listeners).to.have.members([fn])
    })

    it('Same event and function more than once', () => {
      let c = new Context('context')
      let fn = () => {}
      c.on('event', fn)
      let result = c.on('event', fn)
      expect(result).to.be.a('Boolean')
      result.should.be.equal(false)
    })
  })

  context('Invalid operations', () => {
    it('No params given', () => {
      let c = new Context('context')
      try {
        c.on()
      } catch (ex) {
        expect(ex).to.be.an.instanceof(Error)
        ex.message.should.be.a('String')
        expect(ex.message).to.be.equal('Event and fn MUST BE given')
      }
    })

    it('No event given', () => {
      let c = new Context('context')
      try {
        c.on(null, () => {})
      } catch (ex) {
        expect(ex).to.be.an.instanceof(Error)
        ex.message.should.be.a('String')
        expect(ex.message).to.be.equal('Event MUST BE given')
      }
    })

    it('With non-string event param', () => {
      let c = new Context('context')
      try {
        c.on(123, () => {})
      } catch (ex) {
        expect(ex).to.be.an.instanceof(Error)
        ex.message.should.be.a('String')
        expect(ex.message).to.be.equal('Event MUST BE a String')
      }
    })

    it('No fn given', () => {
      let c = new Context('context')
      try {
        c.on('event')
      } catch (ex) {
        expect(ex).to.be.an.instanceof(Error)
        ex.message.should.be.a('String')
        expect(ex.message).to.be.equal('Fn MUST BE given')
      }
    })

    it('With non-function fn param', () => {
      let c = new Context('context')
      try {
        c.on('event', 'something wrong')
      } catch (ex) {
        expect(ex).to.be.an.instanceof(Error)
        ex.message.should.be.a('String')
        expect(ex.message).to.be.equal('Fn MUST BE a Function')
      }
    })
  })
})
