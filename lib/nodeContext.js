'use strict'
const EventEmitter = require('events')
const prop = Symbol()

/**
 * @class NodeContext
 */
class NodeContext {

  constructor (name) {
    if (!name) throw new Error('Name MUST BE given')
    else if (name && typeof name !== 'string') throw new Error('Name MUST BE a String')

    this[prop] = {
      emitter: new EventEmitter(),
      enabled: 0,
      name
    }
  }

  /**
   * Get context status
   * @returns {String}
   */
  get status () {
    return this[prop].enabled ? 'ENABLED' : 'DISABLED'
  }

  /**
   * Get context name
   * @return {String}
   */
  get name () {
    return this[prop].name
  }

  /**
   * Bind event listener
   * @param event {String} Event name
   * @param fn {Function} Callback function
   */
  on (event, fn) {
    if (this.getListeners(event).include(fn)) return false
    this[prop].emitter.on(event, fn)
  }

  /**
   * Bind event listener once
   * @param event {String} Event name
   * @param fn {Function} Callback function
   * @returns {Boolean}
   */
  once (event, fn) {
    this[prop].emitter.once(event, fn)
  }

  /**
   * Unbind event listener
   * @param event {String} Event name
   * @param fn {Function} Callback function
   */
  off (event, fn) {
    this[prop].emitter.removeListener(event, fn)
  }

  /**
   * Unbind listeners from event
   * @param event {String} Event name
   * @returns {Boolean}
   */
  removeAllListeners (event) {
    this[prop].emitter.removeAllListeners(event)
  }

  /**
   * Remove all events and listeners from context
   */
  removeAll () {
    this.getEventList().forEach((event) => this.removeAllListeners(event))
  }

  /**
   * Send data to event
   * @param event {String} Event name
   * @param data {*} Event data
   */
  emit (event, data) {
    if (!this[prop].enabled) return false
    this[prop].emitter.emit(event, data)
  }

  /**
   * Get all event names
   * @returns {Array}
   */
  getEventList () {
    return this[prop].emitter.eventNames()
  }

  /**
   * Get event listeners list
   * @param event {String} Event name
   * @returns {Array}
   */
  getListeners (event) {
    return this[prop].emitter.listeners(event)
  }

  /**
   * Get event listeners count
   * @param event {String} Event name
   * @returns {Number}
   */
  getListenersCount (event) {
    return this[prop].emitter.listenerCount(event) || 0
  }

  /**
   * Enable context
   */
  enable () {
    this[prop].enambed = true
  }

  /**
   * Disable context
   */
  disable () {
    this[prop].enambed = false
  }
}

module.exports = NodeContext
