'use strict'
const chai = require('chai')
const NodeContext = require('../../lib/nodeContext')
const expect = chai.expect

chai.should()

describe('NodeContext#constructor', () => {
  context('Valid operations', () => {
    it('With String param', () => {
      let c = new NodeContext('context')
      c.should.be.an.instanceof(NodeContext)
    })
  })

  context('Invalid operations', () => {
    it('No param given', () => {
      try {
        new NodeContext()
      } catch (ex) {
        expect(ex).to.be.an.instanceof(Error)
        ex.message.should.be.a('String')
        expect(ex.message).to.be.equal('Name MUST BE given')
      }
    })

    it('With a non-string param', () => {
      try {
        new NodeContext(1)
      } catch (ex) {
        expect(ex).to.be.an.instanceof(Error)
        ex.message.should.be.a('String')
        expect(ex.message).to.be.equal('Name MUST BE a String')
      }
    })
  })
})
