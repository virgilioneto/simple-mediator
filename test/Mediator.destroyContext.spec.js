'use strict'
const chai = require('chai')
const Mediator = require('..')
const expect = chai.expect

chai.should()

describe('Mediator#destroyContext', () => {
  context('Valid operations', () => {
    beforeEach(() => {
      Mediator.destroyAllContexts()
    })

    it('One namespace and destroy without a namespace param', () => {
      Mediator.getContext()
      let result = Mediator.destroyContext()
      result.should.be.a('Boolean')
      expect(result).to.be.equal(true)

      let cList = Mediator.getContextList()
      expect(cList).to.be.an('Array')
      expect(cList).to.have.length(0)
    })

    it('Two namespaces and destroy without a namespace param', () => {
      Mediator.getContext()
      Mediator.getContext('My Context')
      let result = Mediator.destroyContext()
      result.should.be.a('Boolean')
      expect(result).to.be.equal(true)

      let cList = Mediator.getContextList()
      expect(cList).to.be.an('Array')
      expect(cList).to.have.length(1)
      expect(cList).to.have.members(['My Context'])
    })

    it('Two namespaces and destroy without a namespace param', () => {
      Mediator.getContext()
      Mediator.getContext('My Context')
      let result = Mediator.destroyContext('My Context')
      result.should.be.a('Boolean')
      expect(result).to.be.equal(true)

      let cList = Mediator.getContextList()
      expect(cList).to.be.an('Array')
      expect(cList).to.have.length(1)
      expect(cList).to.have.members(['default'])
    })

    it('One namespace and destroy two times the same namespace', () => {
      Mediator.getContext()
      let result = Mediator.destroyContext()
      result.should.be.a('Boolean')
      expect(result).to.be.equal(true)

      result = Mediator.destroyContext()
      result.should.be.a('Boolean')
      expect(result).to.be.equal(false)

      let cList = Mediator.getContextList()
      expect(cList).to.be.an('Array')
      expect(cList).to.have.length(0)
    })

    it('Destroy a namespace without get any contexts', () => {
      let result = Mediator.destroyContext()
      result.should.be.a('Boolean')
      expect(result).to.be.equal(false)
    })
  })

  context('Invalid operations', () => {
    beforeEach(() => {
      Mediator.destroyAllContexts()
    })

    it('With a non-string namespace param', () => {
      Mediator.getContext()
      let result = Mediator.destroyContext({})
      expect(result).to.be.an.instanceof(Error)
      result.message.should.be.a('String')
      expect(result.message).to.be.equal('Namespace MUST BE A String')
    })
  })
})
