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
     * Binded to the call function
     * @name ParallelHandle#routerReference
     * @private
     * @type {Object}
     */
    this.routerReference = {}
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
      if (err) next(err)
      else next()
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
  }
}
module.exports = ParallelHandle
