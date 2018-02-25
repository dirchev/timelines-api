var _ = require('lodash')

module.exports = function (app, database) {
  app.put('/Timeline/LinkEvent', function (req, res, next) {
    var newLink = {
      TimelineId: req.body.TimelineId,
      TimelineEventId: req.body.EventId,
    }
    var link = _.find(database.timelineEventLinks, newLink)
    if (!link) database.timelineEventLinks.push(newLink)
    res.send('OK')
  })

  app.put('/Timeline/UnlinkEvent', function (req, res, next) {
    var linkSearch = {
      TimelineId: req.body.TimelineId,
      TimelineEventId: req.body.EventId,
    }
    var link = _.remove(database.timelineEventLinks, linkSearch)[0]
    if (!link) {
      return res.status(400).send({ error: 'timeline event link not found' });
    }
    res.send('OK')
  })

  app.get('/Timeline/GetEvents', function (req, res, next) {
    var linkSearch = {
      TimelineId: req.headers.timelineid,
    }
    var links = _.filter(database.timelineEventLinks, linkSearch)
    res.body = links
    res.json(res.body)
  })
}
