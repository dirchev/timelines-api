var _ = require('lodash')
var uuid = require('uuid')

module.exports = function (app, database) {
  app.put('/TimelineEvent/LinkEvents', function (req, res, next) {
    var newLink = {
      Id: uuid.v4(),
      TimelineEventId: req.body.TimelineEventId,
      LinkedToTimelineEventId: req.body.LinkedToTimelineEventId,
    }
    var link = _.find(database.eventEventLinks, newLink)
    if (!link) database.eventEventLinks.push(newLink)
    res.body = newLink
    res.json(res.body)
  })

  app.put('/TimelineEvent/UnlinkEvents', function (req, res, next) {
    var linkSearch = {
      TimelineEventId: req.body.TimelineEventId,
      LinkedToTimelineEventId: req.body.UnlinkedFromTimelineEventId,
    }
    var link = _.remove(database.eventEventLinks, linkSearch)[0]
    if (!link) {
      return res.status(400).send({ error: 'timeline event link not found' });
    }
    res.send('Successfully unlinked Timeline Event: ' + linkSearch.TimelineEventId + ' from Timeline Event: ' + linkSearch.LinkedToTimelineEventId)
  })

  app.get('/TimelineEvent/GetLinkedTimelineEvents', function (req, res, next) {
    var linkSearch = {
      TimelineEventId: req.headers.timelineeventid,
    }
    var links = _.filter(database.eventEventLinks, linkSearch)
    res.body = links
    res.json(res.body)
  })
}
