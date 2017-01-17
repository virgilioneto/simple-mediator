'use strict'
const chai = require('chai')
const NodeContext = require('../../lib/nodeContext')
const expect = chai.expect

chai.should()

describe('NodeContext#status', () => {
  context('Valid operations', () => {
    it('Must be ENABLED by default', () => {
      let c = new NodeContext('context')
      c.status.should.be.a('String')
      expect(c.status).to.be.equal('ENABLED')
    })

    it('Can be disabled', () => {
      let c = new NodeContext('context')
      c.disable()
      c.status.should.be.a('String')
      expect(c.status).to.be.equal('DISABLED')
    })

    it('Can be re-enabled', () => {
      let c = new NodeContext('context')
      c.disable()
      c.status.should.be.a('String')
      expect(c.status).to.be.equal('DISABLED')
      c.enable()
      c.status.should.be.a('String')
      expect(c.status).to.be.equal('ENABLED')
    })
  })
})
