'use strict'
const EventEmitter = require('events')
const prop = Symbol()

/**
 * @class Context
 */
class Context {

  /**
   * Context contstructor
   * @memberof Context
   * @instance
   * @method constructor
   * @param {String} name Context name
   * @throws {Error} Name MUST BE given
   * @throws {Error} Name MUST BE a String
   */
  constructor (name) {
    if (!name) throw new Error('Name MUST BE given')
    else if (typeof name !== 'string') throw new Error('Name MUST BE a String')

    this[prop] = {
      emitter: new EventEmitter(),
      enabled: 1,
      name
    }
  }

  /**
   * Get context status
   * @memberof Context
   * @instance
   * @method status
   * @returns {String}
   */
  get status () {
    return this[prop].enabled ? 'ENABLED' : 'DISABLED'
  }

  /**
   * Get context name
   * @memberof Context
   * @instance
   * @method name
   * @return {String}
   */
  get name () {
    return this[prop].name
  }

  /**
   * Bind event listener
   * @memberof Context
   * @instance
   * @method on
   * @param event {String} Event name
   * @param fn {Function} Callback function
   * @throws {Error} Event and fn MUST BE given
   * @throws {Error} Event MUST BE given
   * @throws {Error} Event MUST BE a String
   * @throws {Error} Fn MUST BE given
   * @throws {Error} Fn MUST BE a Function
   */
  on (event, fn) {
    if (!event && !fn) throw new Error('Event and fn MUST BE given')
    if (!event) throw new Error('Event MUST BE given')
    else if (typeof event !== 'string') throw new Error('Event MUST BE a String')
    if (!fn) throw new Error('Fn MUST BE given')
    else if (typeof fn !== 'function') throw new Error('Fn MUST BE a Function')

    if (this.getListeners(event).includes(fn)) return false
    this[prop].emitter.on(event, fn)
  }

  /**
   * Bind event listener once
   * @memberof Context
   * @instance
   * @method once
   * @param event {String} Event name
   * @param fn {Function} Callback function
   * @returns {Boolean}
   * @throws {Error} Event and fn MUST BE given
   * @throws {Error} Event MUST BE given
   * @throws {Error} Event MUST BE a String
   * @throws {Error} Fn MUST BE given
   * @throws {Error} Fn MUST BE a Function
   */
  once (event, fn) {
    if (!event && !fn) throw new Error('Event and fn MUST BE given')
    if (!event) throw new Error('Event MUST BE given')
    else if (typeof event !== 'string') throw new Error('Event MUST BE a String')
    if (!fn) throw new Error('Fn MUST BE given')
    else if (typeof fn !== 'function') throw new Error('Fn MUST BE a Function')

    this[prop].emitter.once(event, fn)
  }

  /**
   * Unbind event listener
   * @memberof Context
   * @instance
   * @method off
   * @param event {String} Event name
   * @param fn {Function} Callback function
   * @throws {Error} Event and fn MUST BE given
   * @throws {Error} Event MUST BE given
   * @throws {Error} Event MUST BE a String
   * @throws {Error} Fn MUST BE given
   * @throws {Error} Fn MUST BE a Function
   */
  off (event, fn) {
    if (!event && !fn) throw new Error('Event and fn MUST BE given')
    if (!event) throw new Error('Event MUST BE given')
    else if (typeof event !== 'string') throw new Error('Event MUST BE a String')
    if (!fn) throw new Error('Fn MUST BE given')
    else if (typeof fn !== 'function') throw new Error('Fn MUST BE a Function')

    if (!this.getListeners(event).includes(fn)) return false
    this[prop].emitter.removeListener(event, fn)
  }

  /**
   * Unbind listeners from event
   * @memberof Context
   * @instance
   * @method removeAllListeners
   * @param event {String} Event name
   * @returns {EventEmitter}
   */
  removeAllListeners (event) {
    return this[prop].emitter.removeAllListeners(event)
  }

  /**
   * Remove all events and listeners from context
   * @memberof Context
   * @instance
   * @method removeAll
   */
  removeAll () {
    this.getEventList().forEach((event) => this.removeAllListeners(event))
  }

  /**
   * Send data to event
   * @memberof Context
   * @instance
   * @method emit
   * @param event {String} Event name
   * @param data {*} Event data
   * @returns {Boolean}
   */
  emit (event, data) {
    if (!this[prop].enabled) return false
    return this[prop].emitter.emit(event, data)
  }

  /**
   * Get all event names
   * @memberof Context
   * @instance
   * @method getEventList
   * @returns {Array}
   */
  getEventList () {
    return this[prop].emitter.eventNames()
  }

  /**
   * Get event listeners list
   * @memberof Context
   * @instance
   * @method getListeners
   * @param event {String} Event name
   * @returns {Array}
   */
  getListeners (event) {
    return this[prop].emitter.listeners(event)
  }

  /**
   * Get event listeners count
   * @memberof Context
   * @instance
   * @method getListenersCount
   * @param event {String} Event name
   * @returns {Number}
   */
  getListenersCount (event) {
    return this[prop].emitter.listenerCount(event) || 0
  }

  /**
   * Enable context
   * @memberof Context
   * @instance
   * @method enable
   */
  enable () {
    this[prop].enabled = 1
  }

  /**
   * Disable context
   * @instance
   * @memberof Context
   * @method disable
   */
  disable () {
    this[prop].enabled = 0
  }
}

module.exports = Context
