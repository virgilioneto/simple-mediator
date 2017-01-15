/**
 * @module Mediator
 * @requires NodeContext
 * @requires BrowserContext
 */
;(function (root, Mediator) {
  if(typeof define === "function" && define.amd) {
    define(["Mediator"], function(Context){
      return (root.Mediator = Mediator(Context));
    });
  } else if(typeof module === "object" && module.exports) {
    if (typeof process === 'object' && process.hasOwnProperty('versions') && process.versions.node) {
      module.exports = Mediator(require('./lib/nodeContext'))
    } else {
      module.exports = (root.Mediator = Mediator(require('./lib/browserContext')));
    }
  } else {
    root.Mediator = Mediator(root.Context);
  }
}(this, function(Context) {
  'use strict'

  var contextList = {}
  var defaultNamespace = 'default'

  /**
   * Instantiate context based on namespace
   * @member instantiateContext
   * @function instantiateContext
   * @private
   * @param [namespace='default'] {String=} Context namespace
   * @returns {Mediator.Context} Context instance
   */
  function instantiateContext (namespace) {
    contextList[namespace || defaultNamespace] = new Context(namespace || defaultNamespace)
    return contextList[namespace]
  }

  /**
   * Get mediator context based on namespace
   * @member getContext
   * @static
   * @function getContext
   * @param [namespace='default' {String=} Context namespace
   * @returns {Mediator.Context|Error} Context instance
   */
  function getContext (namespace) {
    namespace = namespace || defaultNamespace
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
  function getContextList () {
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
  function destroyContext (namespace) {
    namespace = namespace || defaultNamespace
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
  function destroyAllContexts () {
    return Object.keys(contextList).forEach(function (namespace) {
      destroyContext(namespace)
    })
  }

  return {
    getContext: getContext,
    getContextList: getContextList,
    destroyContext: destroyContext,
    destroyAllContexts: destroyAllContexts
  }
}))