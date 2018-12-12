const Endpoint = require('./endpoint');
const debug = require('./utils/debug')(__filename);
const MissingApiEndpointError = require('./error/missing-api-endpoint');

class Api {
  /**
   * @param {string} namespace
   * @param {*} endpoints 
   * @param {string} token
   */
  constructor(namespace, endpoints, token) {
    this.namespace = namespace;
    this._endpoints = endpoints;
    this.token = token;

    debug(`endpoints:${this.namespace}`, this.endpoints);
  }

  /**
   * Create endpoint instance
   * @param {string} endpoint 
   * @returns {Endpoint}
   */
  endpoint(endpoint) {
    if (!this.exists(endpoint)) {
      throw new MissingApiEndpointError(this.namespace, endpoint);
    }

    return new Endpoint(
      `${this.namespace}:${endpoint}`,
      this._endpoints[endpoint],
      this.token
    );
  }

  /**
   * Check if api endpoint exists
   * @param {string} endpoint 
   * @returns {boolean}
   */
  exists(endpoint) {
    return this._endpoints.hasOwnProperty(endpoint);
  }

  /**
   * Get the list of available API endpoints
   * @returns {string[]}
   */
  get endpoints() {
    return Object.keys(this._endpoints);
  }
}

module.exports = Api;
