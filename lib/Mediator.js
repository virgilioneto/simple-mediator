'use strict'
const Context = require('./Context')
let contextList = {}
let defaultNamespace = 'default'

class Mediator {

  /**
   * Get mediator context based on namespace
   * @member getContext
   * @static
   * @function getContext
   * @param [namespace='default' {String=} Context namespace
   * @returns {Mediator.Context|Error} Context instance
   */
  static getContext(namespace = defaultNamespace) {
    if (typeof namespace !== 'string') return new Error('Namespace MUST BE A String')
    return contextList.hasOwnProperty(namespace)
      ? contextList[namespace]
      : instantiateContext(namespace)
  }

  /**
   * Get context name list
   * @member getContextList
   * @static
   * @function getContextList
   * @returns {Array} Context list names
   */
  static getContextList() {
    return Object.keys(contextList)
  }

  /**
   * Destroy mediator context based on namespace
   * @member destroyContext
   * @static
   * @function destroyContext
   * @param [namespace='default'] {String=} Context namespace
   * @returns {Boolean|Error}
   */
  static destroyContext(namespace = defaultNamespace) {
    if (typeof namespace !== 'string') return new Error('Namespace MUST BE A String')
    if (!contextList.hasOwnProperty(namespace)) return false

    contextList[namespace].removeAll()
    return delete contextList[namespace]
  }

  /**
   * Destroy all contexts
   * @member destroyAllContexts
   * @static
   * @function destroyAllContexts
   */
  static destroyAllContexts() {
    return Object.keys(contextList).forEach(function (namespace) {
      Mediator.destroyContext(namespace)
    })
  }
}

module.exports = Mediator

/**
   * Instantiate context based on namespace
   * @member instantiateContext
   * @function instantiateContext
   * @private
   * @param [namespace='default'] {String=} Context namespace
   * @returns {Mediator.Context} Context instance
   */
function instantiateContext(namespace = defaultNamespace) {
  contextList[namespace] = new Context(namespace)
  return contextList[namespace]
}
