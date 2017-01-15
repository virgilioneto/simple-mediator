'use strict'
const chai = require('chai')
const Mediator = require('../../')
const NodeContext = require('../../lib/nodeContext')
const assert = chai.assert
const expect = chai.expect

chai.should()

describe('Mediator#getContextList', () => {
  context('Valid operations', () => {
    beforeEach(() => {
      Mediator.destroyAllContexts()
    })

    it('Without namespace param', () => {
      Mediator.getContext()
      let cList = Mediator.getContextList()
      expect(cList).to.be.an('Array')
      expect(cList).to.have.length(1)
      expect(cList).to.have.members(['default'])
    })

    it('Custom context', () => {
      Mediator.getContext('My Context')
      let cList = Mediator.getContextList()
      expect(cList).to.be.an('Array')
      expect(cList).to.have.length(1)
      expect(cList).to.have.members(['My Context'])
    })

    it('Default and a custom context', () => {
      Mediator.getContext()
      Mediator.getContext('My Context')
      let cList = Mediator.getContextList()
      expect(cList).to.be.an('Array')
      expect(cList).to.have.length(2)
      expect(cList).to.have.members(['default', 'My Context'])
    })
  })
})
