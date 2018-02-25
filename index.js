var server = require('./src/index.js')

server(function (listener, app) {
  console.log('App started on port:', listener.address().port)
})
