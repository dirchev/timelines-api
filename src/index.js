module.exports = function (done) {
  const express = require('express')
  const bodyParser = require('body-parser')
  const cors = require('cors')
  const app = express()

  var database = {
    timelines: [],
    timelineEventLinks: [],
    eventEventLinks: [],
    events: []
  }

  app.use(cors())
  app.use(bodyParser.json())

  app.get('/', function (req, res) {
    res.redirect('https://github.com/dirchev/timelines-api')
  })

  require('./Timeline')(app, database)
  require('./TimelineEventLinks')(app, database)
  require('./EventEventLinks')(app, database)
  require('./Event')(app, database)
  var listener = app.listen(process.env.PORT || 3001, () => {done(listener, app)})
}
