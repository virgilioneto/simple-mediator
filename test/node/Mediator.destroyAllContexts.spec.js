'use strict'
const chai = require('chai')
const Mediator = require('../../')
const expect = chai.expect

chai.should()

describe('Mediator#destroyAllContexts', () => {
  context('Valid operations', () => {
    it('Destroy all without get any contexts', () => {
      let result = Mediator.destroyAllContexts()
      expect(result).to.be.equal(undefined)
    })

    it('Destroy all instanced contexts', () => {
      Mediator.getContext()
      Mediator.getContext('My new Context')
      Mediator.getContext('My other Context')
      let cList = Mediator.getContextList()
      expect(cList).to.be.an('Array')
      expect(cList).to.have.length(3)
      expect(cList).to.have.members(['default', 'My new Context', 'My other Context'])

      let result = Mediator.destroyAllContexts()
      expect(result).to.be.equal(undefined)

      cList = Mediator.getContextList()
      expect(cList).to.be.an('Array')
      expect(cList).to.have.length(0)
    })
  })
})
