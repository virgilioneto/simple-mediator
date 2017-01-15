;(function (root, Context) {
  if (typeof define === "function" && define.amd) {
    define(["context"], function () {
      return (root.Context = Context());
    });
  } else if (typeof module === "object" && module.exports) {
    module.exports = (root.Context = Context());
  } else {
    root.Context = Context();
  }
}(this, function () {
  'use strict'

  var eventList = {}
  var enabled = true

  /**
   * @class BrowserContext
   */
  function BrowserContext () {}

  BrowserContext.prototype = {
    /**
     * Get context status
     * @memberOf! BrowserContext
     * @instance
     * @returns {String}
     */
    get status () { return enabled ? 'ENABLED' : 'DISABLED' }
  }

  /**
   * Bind event listener
   * @memberOf! BrowserContext
   * @param event {String} Event name
   * @param fn {Function} Callback function
   */
  BrowserContext.prototype.on = function (event, fn) {
    if (!eventList.hasOwnProperty(event)) eventList[event] = []
    else if (eventList[event].indexOf(fn) >= 0) return false

    eventList[event].push(fn)
  }

  /**
   * Unbind event listener
   * @memberOf! BrowserContext
   * @param event {String} Event name
   * @param fn {Function} Callback function
   */
  BrowserContext.prototype.off = function (event, fn) {
    var index
    if (eventList.hasOwnProperty(event) && (index = eventList[event].indexOf(fn)) >= 0) {
      eventList[event].splice(index, 1)
    }
  }

  /**
   * Unbind listeners from event
   * @memberOf! BrowserContext
   * @param event {String} Event name
   */
  BrowserContext.prototype.removeAllListeners = function (event) {
    if (!event || !eventList.hasOwnProperty(event)) return false
    delete eventList[event]
  }

  /**
   * Remove all events and listeners from context
   * @memberOf! BrowserContext
   */
  BrowserContext.prototype.removeAll = function () {
    Object.keys(eventList).forEach(function (event) {
      this.removeAllListeners(event)
    }.bind(this))
  }

  /**
   * Send data to event
   * @memberOf! BrowserContext
   * @param event {String} Event name
   * @param data {*} Event data
   */
  BrowserContext.prototype.emit = function (event, data) {
    if (eventList.hasOwnProperty(event) && enabled) {
      eventList[event].forEach(function (fn) {
        fn(data)
      })
    }
  }

  /**
   * Get all event names
   * @memberOf! BrowserContext
   * @returns {Array}
   */
  BrowserContext.prototype.getEventList = function () {
    return Object.keys(eventList)
  }

  /**
   * Get event listeners list
   * @memberOf! BrowserContext
   * @param event {String} Event name
   * @returns {Array}
   */
  BrowserContext.prototype.getListeners = function (event) {
    return eventList[event]
  }

  /**
   * Get event listeners count
   * @memberOf! BrowserContext
   * @param event {String} Event name
   * @returns {Number}
   */
  BrowserContext.prototype.getListenersCount = function (event) {
    return eventList.hasOwnProperty(event)
      ? eventList[event].length
      : 0
  }

  /**
   * Enable context
   * @memberOf! BrowserContext
   */
  BrowserContext.prototype.enable = function () {
    enabled = true
  }

  /**
   * Disable context
   * @memberOf! BrowserContext
   */
  BrowserContext.prototype.disable = function () {
    enabled = false
  }

  return BrowserContext
}))
