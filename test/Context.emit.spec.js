'use strict'
const chai = require('chai')
const Context = require('../lib/Context')
const expect = chai.expect
const assert = chai.assert

chai.should()

describe('Context#on', () => {
  context('Valid operations', () => {
    it('Without any event', () => {
      let c = new Context('context')
      let result = c.emit('event', {data: 'a'})
      expect(result).to.be.an('Boolean')
      result.should.be.equal(false)
    })

    it('Without params', () => {
      let c = new Context('context')
      c.on('event', () => {})
      let result = c.emit()
      expect(result).to.be.an('Boolean')
      result.should.be.equal(false)
    })

    it('Should receive event', (done) => {
      let c = new Context('context')
      let someValue = Math.round(Math.random() * 100)
      c.on('event', (data) => {
        expect(data).to.be.an('Object')
        expect(data).to.have.property('v')
        expect(data.v).to.be.a('Number')
        data.v.should.be.equal(someValue)
        done()
      })
      let result = c.emit('event', {v: someValue})
      expect(result).to.be.an('Boolean')
      result.should.be.equal(true)
    })

    it('Should receive N events', (done) => {
      let c = new Context('context')
      let someValue = Math.round(Math.random() * 100)
      let received = 0
      let t = Math.round(Math.random() * 10) || 2
      for (let i = 1; i <= t; i++) {
        c.on('event', (data) => {
          received ++
          expect(data).to.be.an('Object')
          expect(data).to.have.property('v')
          expect(data.v).to.be.a('Number')
          data.v.should.be.equal(someValue)
          if (received === t) done()
        })
      }

      let result = c.emit('event', {v: someValue})
      expect(result).to.be.an('Boolean')
      result.should.be.equal(true)
    })

    it('Should not receive event when disabled', () => {
      let c = new Context('context')
      c.on('event', assert.fail)
      c.disable()
      let result = c.emit('event', {v: 1})
      expect(result).to.be.an('Boolean')
      result.should.be.equal(false)
    })

    it('Should receive event when re-enabled', (done) => {
      let c = new Context('context')
      let someValue = Math.round(Math.random() * 100)
      c.on('event', (data) => {
        expect(data).to.be.an('Object')
        expect(data).to.have.property('v')
        expect(data.v).to.be.a('Number')
        data.v.should.be.equal(someValue)
        done()
      })
      c.disable()
      let result = c.emit('event', {v: someValue})
      expect(result).to.be.an('Boolean')
      result.should.be.equal(false)

      c.enable()
      result = c.emit('event', {v: someValue})
      expect(result).to.be.an('Boolean')
      result.should.be.equal(false)
    })

    it('Should receive event only once', (done) => {
      let c = new Context('context')
      let someValue = Math.round(Math.random() * 100)
      let received = 0
      c.once('event', (data) => {
        received ++
        expect(data).to.be.an('Object')
        expect(data).to.have.property('v')
        expect(data.v).to.be.a('Number')
        data.v.should.be.equal(someValue)
      })
      let result = c.emit('event', {v: someValue})
      expect(result).to.be.an('Boolean')
      result.should.be.equal(true)

      result = c.emit('event', {v: someValue})
      expect(result).to.be.an('Boolean')
      result.should.be.equal(false)

      setTimeout(() => {
        if (received > 1) assert.fail()
        else done()
      })
    })
  })
})
