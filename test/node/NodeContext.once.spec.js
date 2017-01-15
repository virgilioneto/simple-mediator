'use strict'
const chai = require('chai')
const NodeContext = require('../../lib/nodeContext')
const expect = chai.expect

chai.should()

describe('NodeContext#once', () => {
  context('Valid operations', () => {
    it('Event and function', () => {
      let c = new NodeContext('context')
      let fn = () => {}
      c.once('event', fn)
      let listeners = c.getListeners('event')
      expect(listeners).to.be.an('Array')
      expect(listeners).to.have.length(1)
    })
  })

  context('Invalid operations', () => {
    it('No params given', () => {
      let c = new NodeContext('context')
      try {
        c.once()
      } catch (ex) {
        expect(ex).to.be.an.instanceof(Error)
        ex.message.should.be.a('String')
        expect(ex.message).to.be.equal('Event and fn MUST BE given')
      }
    })

    it('No event given', () => {
      let c = new NodeContext('context')
      try {
        c.once(null, () => {})
      } catch (ex) {
        expect(ex).to.be.an.instanceof(Error)
        ex.message.should.be.a('String')
        expect(ex.message).to.be.equal('Event MUST BE given')
      }
    })

    it('With non-string event param', () => {
      let c = new NodeContext('context')
      try {
        c.once(123, () => {})
      } catch (ex) {
        expect(ex).to.be.an.instanceof(Error)
        ex.message.should.be.a('String')
        expect(ex.message).to.be.equal('Event MUST BE a String')
      }
    })

    it('No fn given', () => {
      let c = new NodeContext('context')
      try {
        c.once('event')
      } catch (ex) {
        expect(ex).to.be.an.instanceof(Error)
        ex.message.should.be.a('String')
        expect(ex.message).to.be.equal('Fn MUST BE given')
      }
    })

    it('With non-function fn param', () => {
      let c = new NodeContext('context')
      try {
        c.once('event', 'something wrong')
      } catch (ex) {
        expect(ex).to.be.an.instanceof(Error)
        ex.message.should.be.a('String')
        expect(ex.message).to.be.equal('Fn MUST BE a Function')
      }
    })
  })
})
