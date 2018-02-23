var _ = require('lodash')

module.exports = function (app, database) {
  app.put('/TimelineEvent/Create', function (req, res, next) {
    var newEvent = {
      Id: req.body.TimelineEventId,
      Title: req.body.Title,
      Description: req.body.Description,
      EventDateTime: req.body.EventDateTime,
      Location: req.body.Location,
      CreationTimeStamp: Date.now()
    }
    var event = _.find(database.events, {Id: req.body.TimelineEventId})
    if (event) {
      _.extend(event, newEvent)
    } else {
      database.events.push(newEvent)
    }
    res.body = newEvent
    res.json(res.body)
  })

  app.put('/TimelineEvent/EditTitle', function (req, res, next) {
    var event = _.find(database.events, {Id: req.body.TimelineEventId})
    if (!event) return res.status(400).send({ error: 'event not found' });
    event.Title = req.body.Title
    res.body = event
    res.json(res.body)
  })

  app.put('/TimelineEvent/EditDescription', function (req, res, next) {
    var event = _.find(database.events, {Id: req.body.TimelineEventId})
    if (!event) return res.status(400).send({ error: 'event not found' });
    event.Description = req.body.Description
    res.body = event
    res.json(res.body)
  })

  app.put('/TimelineEvent/EditLocation', function (req, res, next) {
    var event = _.find(database.events, {Id: req.body.TimelineEventId})
    if (!event) return res.status(400).send({ error: 'event not found' });
    event.Location = req.body.Location
    res.body = event
    res.json(res.body)
  })

  app.put('/TimelineEvent/Delete', function (req, res, next) {
    var event = _.remove(database.events, {Id: req.body.TimelineEventId})[0]
    if (!event) return res.status(400).send({ error: 'event not found' });
    res.body = event
    res.json(res.body)
  })

  app.put('/TimelineEvent/EditEventDateTime', function (req, res, next) {
    var event = _.find(database.events, {Id: req.body.TimelineEventId})
    if (!event) return res.status(400).send({ error: 'event not found' });
    event.EventDateTime = req.body.EventDateTime
    res.body = event
    res.json(res.body)
  })

  app.get('/TimelineEvent/GetTimelineEvent', function (req, res, next) {
    var event = _.find(database.events, {Id: req.headers.timelineeventid})
    if (!event) return res.status(400).send({ error: 'event not found' });
    res.body = event
    res.json(res.body)
  })
}
