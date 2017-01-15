'use strict'
const chai = require('chai')
const Mediator = require('../../')
const NodeContext = require('../../lib/nodeContext')
const expect = chai.expect

chai.should()

describe('Mediator#getContext', () => {
  context('Valid operations', () => {
    beforeEach(() => {
      Mediator.destroyAllContexts()
    })

    it('Without namespace param', () => {
      let c1 = Mediator.getContext()
      expect(c1).to.be.an.instanceof(NodeContext)
      c1.name.should.be.a('String')
      expect(c1.name).to.be.equal('default')
    })

    it('With namespace param', () => {
      let c1 = Mediator.getContext('My Namespace')
      expect(c1).to.be.an.instanceof(NodeContext)
      c1.name.should.be.a('String')
      expect(c1.name).to.be.equal('My Namespace')
    })
  })

  context('Invalid operations', () => {
    beforeEach(() => {
      Mediator.destroyAllContexts()
    })

    it('With a non-string namespace param', () => {
      let c1 = Mediator.getContext({})
      expect(c1).to.be.an.instanceof(Error)
      c1.message.should.be.a('String')
      expect(c1.message).to.be.equal('Namespace MUST BE A String')
    })
  })
})
