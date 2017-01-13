;(function (root, Context) {
  if(typeof define === "function" && define.amd) {
    define(["Context"], function(){
      return (root.Context = Context());
    });
  } else if(typeof module === "object" && module.exports) {
    module.exports = (root.Context = Context());
  } else {
    root.Context = Context();
  }
}(this, function() {
  'use strict'

  /**
   * @constructor
   * @class Context
   * @memberOf Mediator
   */
  function Context () {
    this.eventList = {}
    this.enabled = true
  }

  /**
   * Bind event listener
   * @param event {String} Event name
   * @param fn {Function} Callback function
   * @returns {Boolean}
   */
  Context.prototype.on = function (event, fn) {
    if (!this.eventList.hasOwnProperty(event)) this.eventList[event] = []
    else if (this.eventList[event].indexOf(fn) >= 0) return false

    return this.eventList[event].push(fn)
  }

  /**
   * Unbind event listener
   * @param event {String} Event name
   * @param fn {Function} Callback function
   */
  Context.prototype.off = function (event, fn) {
    var index
    if (this.eventList.hasOwnProperty(event) && (index = this.eventList[event].indexOf(fn)) >= 0) {
      this.eventList[event].splice(index, 1)
    }
  }

  /**
   * Unbind listeners from event
   * @param event {String} Event name
   * @returns {Boolean}
   */
  Context.prototype.removeAllListeners = function (event) {
    return event && this.eventList.hasOwnProperty(event)
      ? delete this.eventList[event]
      : false
  }

  /**
   * Remove all events and listeners from context
   */
  Context.prototype.removeAll = function () {
    return Object.keys(this.eventList).forEach(function (event) {
      this.removeAllListeners(event)
    }.bind(this))
  }

  /**
   * Send data to event
   * @param event {String} Event name
   * @param data {*} Event data
   */
  Context.prototype.emit = function (event, data) {
    if (this.eventList.hasOwnProperty(event) && this.enabled) {
      this.eventList[event].forEach(function (fn) {
        fn(data)
      })
    }
  }

  /**
   * Get all event names
   * @returns {Array}
   */
  Context.prototype.getEventList = function () {
    return Object.keys(this.eventList)
  }

  /**
   * Get event listeners count
   * @param event {String} Event name
   * @returns {Number}
   */
  Context.prototype.getListenersCount = function (event) {
    return this.eventList.hasOwnProperty(event)
      ? this.eventList[event].length
      : 0
  }

  /**
   * Enable context
   */
  Context.prototype.enable = function () {
    this.enabled = true
  }

  /**
   * Disable context
   */
  Context.prototype.disable = function () {
    this.enabled = false
  }

  return Context
}))
