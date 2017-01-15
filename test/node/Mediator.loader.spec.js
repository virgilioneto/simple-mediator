'use strict'
const chai = require('chai')
const expect = chai.expect

chai.should()

describe('Mediator#loader', () => {
  context('Valid operations', () => {
    beforeEach(() => {
      delete require.cache[require.resolve('../../')]
    })

    it('Have define and define.amd', () => {
      global.define = (dep, fn) => {fn()}
      global.define.amd = true
      let loader = require('../../')
      delete global.define
      loader.should.be.an('Object')
      expect(loader).to.have.key('Mediator')
      loader.Mediator.should.be.an('Object')
      expect(loader.Mediator).to.have.property('getContext')
      loader.Mediator.getContext.should.be.a('Function')
      expect(loader.Mediator).to.have.property('getContextList')
      loader.Mediator.getContextList.should.be.a('Function')
      expect(loader.Mediator).to.have.property('destroyContext')
      loader.Mediator.destroyContext.should.be.a('Function')
      expect(loader.Mediator).to.have.property('destroyAllContexts')
      loader.Mediator.destroyAllContexts.should.be.a('Function')
    })

    it('NodeJS Module', () => {
      let Mediator = require('../../')
      Mediator.should.be.an('Object')
      expect(Mediator).to.have.property('getContext')
      Mediator.getContext.should.be.a('Function')
      expect(Mediator).to.have.property('getContextList')
      Mediator.getContextList.should.be.a('Function')
      expect(Mediator).to.have.property('destroyContext')
      Mediator.destroyContext.should.be.a('Function')
      expect(Mediator).to.have.property('destroyAllContexts')
      Mediator.destroyAllContexts.should.be.a('Function')
    })

    it('Browser Module', () => {
      delete process.versions
      let Mediator = require('../../')
      Mediator.should.be.an('Object')
      expect(Mediator).to.have.property('getContext')
      Mediator.getContext.should.be.a('Function')
      expect(Mediator).to.have.property('getContextList')
      Mediator.getContextList.should.be.a('Function')
      expect(Mediator).to.have.property('destroyContext')
      Mediator.destroyContext.should.be.a('Function')
      expect(Mediator).to.have.property('destroyAllContexts')
      Mediator.destroyAllContexts.should.be.a('Function')
    })
  })
})
