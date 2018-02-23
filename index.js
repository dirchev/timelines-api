const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

var database = {
  timelines: [],
  timelineEventLinks: [],
  events: []
}
app.use(cors())
app.use(bodyParser.json())

require('./Timeline')(app, database)
require('./TimelineEventLinks')(app, database)
require('./Event')(app, database)

app.listen(process.env.port || 3001, () => console.log('Example app listening on port 3000!'))
