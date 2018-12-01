'use strict'
const Context = require('./Context')
let contextList = {}
let defaultNamespace = 'default'

/**
 * @class Mediator
 */
class Mediator {

  /**
   * Get mediator context based on namespace
   * @memberof Mediator
   * @static
   * @method getContext
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
   * @memberof Mediator
   * @static
   * @method getContextList
   * @returns {Array} Context list names
   */
  static getContextList() {
    return Object.keys(contextList)
  }

  /**
   * Destroy mediator context based on namespace
   * @memberof Mediator
   * @static
   * @method destroyContext
   * @param [namespace='default'] {String=} Context namespace
   * @returns {Boolean}
   * @throws {Error} Namespace MUST BE A String
   */
  static destroyContext(namespace = defaultNamespace) {
    if (typeof namespace !== 'string') return new Error('Namespace MUST BE A String')
    if (!contextList.hasOwnProperty(namespace)) return false

    contextList[namespace].removeAll()
    return delete contextList[namespace]
  }

  /**
   * Destroy all contexts
   * @memberof Mediator
   * @static
   * @method destroyAllContexts
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
   * @memberof Mediator
   * @method instantiateContext
   * @private
   * @param [namespace='default'] {String=} Context namespace
   * @returns {Mediator.Context} Context instance
   */
function instantiateContext(namespace = defaultNamespace) {
  contextList[namespace] = new Context(namespace)
  return contextList[namespace]
}
