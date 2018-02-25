var _ = require('lodash')

module.exports = function (app, database) {
  app.put('/Timeline/Create', function (req, res, next) {
    var newTimeline = {
      Id: req.body.TimelineId,
      Title: req.body.Title,
      CreationTimeStamp: Date.now()
    }
    var timeline = _.find(database.timelines, {Id: req.body.TimelineId})
    if (timeline) {
      _.extend(timeline, newTimeline)
    } else {
      database.timelines.push(newTimeline)
    }
    res.body = newTimeline
    res.json(res.body)
  })

  app.get('/Timeline/GetTimelines', function (req, res, next) {
    res.body = database.timelines
    res.json(res.body)
  })

  app.get('/Timeline/GetTimeline', function (req, res, next) {
    var TimelineId = req.headers.timelineid
    var timeline = _.find(database.timelines, {Id: TimelineId})
    if (!timeline) return res.status(400).send({ error: 'timeline not found' });
    res.body = timeline
    res.json(res.body)
  })

  app.put('/Timeline/EditTitle', function (req, res, next) {
    var TimelineId = req.body.TimelineId
    var timeline = _.find(database.timelines, {Id: TimelineId})
    if (!timeline) return res.status(400).send({ error: 'timeline not found' });
    timeline.Title = req.body.Title
    res.body = timeline
    res.json(res.body)
  })

  app.put('/Timeline/Delete', function (req, res, next) {
    var TimelineId = req.body.TimelineId
    var timeline = _.remove(database.timelines, {Id: TimelineId})[0]
    res.send('Deleted timeline ' + timeline.Id)
  })
}
