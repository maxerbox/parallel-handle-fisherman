const async = require('async')
const parallel = async.parallel
/**
 * A parallel middleware handler, usign async
 *
 * @class ParallelHandle
 */
class ParallelHandle {
  /**
   * Creates an instance of ParallelHandle.
   * @memberof ParallelHandle
   */
  constructor () {
      /**
       * An array of functions
       * @name ParallelHandle#stack
       * @private
       * @type {Array<function>}
       */
    this.stack = []
    /**
     * An array of functions
     * @name ParallelHandle#initializingStack
     * @private
     * @type {Array<function>}
     */
    this.initializingStack = []
    /**
     * Binded to the call function
     * @name ParallelHandle#routerReference
     * @private
     * @type {Object}
     */
    this.routerReference = {}
    /**
     * Client reference to bind to setUp function
     * @name ParallelHandle#clientReference
     * @private
     * @type {Object}
     */
    this.clientReference = {client: null}
  }
  /**
   * Fisherman setup handler
   * @private
   * @param {Fisherman} client
   * @param {function} next
   * @memberof ParallelHandle
   */
  setUp (client, next) {
    this.clientReference.client = client
    parallel(this.initializingStack, function (err) {
      next(err)
    })
  }
  /**
   * Fisherman handler
   * @private
   * @param {FisherRequest} req request
   * @param {FisherResponse} res response
   * @param {function} next next func
   * @memberof ParallelHandle
   */
  handle (req, res, next) {
    this.routerReference.req = req
    this.routerReference.res = res
    parallel(this.stack, function (err) {
      next(err, req, res)
    })
  }
/**
 * Append a middleware to the parallel stack
 * @param {(function|Object)} middleware The middleware
 * @memberof ParallelHandle
 * @return {ParallelHandle}
 */
  use (middleware) {
    if (typeof middleware !== 'object' && typeof middleware !== 'function') throw new TypeError('A middleware must be a function or an object')
    this.appendMiddleware(middleware)
    return this
  }
  /**
   *
   * Add a middleware
   * @param {(function|Object)} middleware The middleware
   * @memberof ParallelHandle
   */
  appendMiddleware (middleware) {
    if (typeof middleware.parallelHandle === 'function') this.stack.push(middleware.parallelHandle.bind(middleware, this.routerReference))
    if (typeof middleware.setUp === 'function') this.initializingStack.push(middleware.setUp.bind(middleware, this.clientReference))
  }
}
module.exports = ParallelHandle
