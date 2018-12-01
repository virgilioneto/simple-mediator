'use strict'
const chai = require('chai')
const Context = require('../lib/Context')
const expect = chai.expect

chai.should()

describe('Context#constructor', () => {
  context('Valid operations', () => {
    it('With String param', () => {
      let c = new Context('context')
      c.should.be.an.instanceof(Context)
    })
  })

  context('Invalid operations', () => {
    it('No param given', () => {
      try {
        new Context()
      } catch (ex) {
        expect(ex).to.be.an.instanceof(Error)
        ex.message.should.be.a('String')
        expect(ex.message).to.be.equal('Name MUST BE given')
      }
    })

    it('With a non-string param', () => {
      try {
        new Context(1)
      } catch (ex) {
        expect(ex).to.be.an.instanceof(Error)
        ex.message.should.be.a('String')
        expect(ex.message).to.be.equal('Name MUST BE a String')
      }
    })
  })
})
