/**
 * @namespace Mediator
 */
;(function (root, Mediator) {
  if(typeof define === "function" && define.amd) {
    define(["Mediator"], function(Context){
      return (root.Mediator = Mediator(Context));
    });
  } else if(typeof module === "object" && module.exports) {
    if (typeof process && process.hasOwnProperty('node')) {
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
   * @memberOf! Mediator
   * @function instantiateContext
   * @private
   * @param [namespace='default'] {String=} Context namespace
   * @returns {Mediator.Context} Context instance
   */
  function instantiateContext (namespace) {
    contextList[namespace || defaultNamespace] = new Context()
    return contextList[namespace]
  }

  /**
   * Get mediator context based on namespace
   * @memberOf! Mediator
   * @function getContext
   * @param [namespace='default' {String=} Context namespace
   * @returns {Mediator.Context} Context instance
   */
  function getContext (namespace) {
    namespace = namespace || defaultNamespace
    return contextList.hasOwnProperty(namespace)
      ? contextList[namespace]
      : instantiateContext(namespace)
  }

  /**
   * Get context name list
   * @memberOf! Mediator
   * @function getContextList
   * @returns {Array} Context list names
   */
  function getContextList () {
    return Object.keys(contextList)
  }

  /**
   * Destroy mediator context based on namespace
   * @memberOf! Mediator
   * @function destroyContext
   * @param [namespace='default'] {String=} Context namespace
   * @returns {Boolean}
   */
  function destroyContext (namespace) {
    if (!contextList.hasOwnProperty(namespace)) return false

    return contextList[namespace].removeAll()
  }

  /**
   * Destroy all contexts
   * @memberOf! Mediator
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