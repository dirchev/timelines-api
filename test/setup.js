var chai = require('chai')
expect = chai.expect

var server = require('../src/index.js')

module.exports = function () {
  this.listener = null
}

module.exports.prototype.start = function () {
  return new Promise((resolve, reject) => {
    server((listener) => {
      this.listener = listener
      resolve(this)
    })
  })
}

module.exports.prototype.stop = function () {
  return new Promise((resolve, reject) => {
    if (!this.listener) return reject(new Error('server not started'))
    this.listener.close((err) => {
      if (err) return reject(err)
      resolve(this)
    })
  })
}
