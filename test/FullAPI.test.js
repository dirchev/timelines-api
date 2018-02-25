var _ = require('lodash')
var request = require('request-promise-native')
var config = require('./config.json')
var TestServer = require('./setup')
var server = new TestServer()

describe('Full API Test', function () {
  before(function () {
    return server.start()
  })

  after(function () {
    return server.stop()
  })

  it('Creates a Timeline', function () {
    return request({
      uri: `${config.endpoint}/Timeline/Create`,
      method: 'PUT',
      json: {
        TenantId: config.TenantId,
        AuthToken: config.AuthToken,
        TimelineId: '1234',
        Title: 'Test Title'
      }
    }).then((body) => {
      expect(body.Id).to.equal('1234')
      expect(body.Title).to.equal('Test Title')
      expect(body.CreationTimeStamp).to.exist
    })
  })

  it('Edits Timeline Title', function () {
    return request({
      uri: `${config.endpoint}/Timeline/EditTitle`,
      method: 'PUT',
      json: {
        TenantId: config.TenantId,
        AuthToken: config.AuthToken,
        TimelineId: '1234',
        Title: 'Test Title 2'
      }
    }).then((body) => {
      // IDEAGEN's double JSON stringify-ing
      if (typeof body === 'string') body = JSON.parse(body)

      expect(body.Id).to.equal('1234')
      expect(body.Title).to.equal('Test Title 2')
      expect(body.CreationTimeStamp).to.exist
    })
  })

  it('Get Timeline', function () {
    return request({
      uri: `${config.endpoint}/Timeline/GetTimeline`,
      method: 'GET',
      headers: {
        TenantId: config.TenantId,
        AuthToken: config.AuthToken,
        TimelineId: '1234',
        Title: 'Test Title 2'
      },
      json: true
    }).then((body) => {
      expect(body.Id).to.equal('1234')
      expect(body.Title).to.equal('Test Title 2')
      expect(body.CreationTimeStamp).to.exist
    })
  })

  it('Get Timelines', function () {
    return request({
      uri: `${config.endpoint}/Timeline/GetTimelines`,
      method: 'GET',
      headers: {
        TenantId: config.TenantId,
        AuthToken: config.AuthToken,
        TimelineId: '1234',
        Title: 'Test Title 2'
      },
      json: true
    }).then((body) => {
      var timeline = _.find(body, {Id: '1234'})
      expect(timeline.Id).to.equal('1234')
      expect(timeline.Title).to.equal('Test Title 2')
      expect(timeline.CreationTimeStamp).to.exist
    })
  })

  it('Link an Event to a Timeline', function () {
    return request({
      uri: `${config.endpoint}/Timeline/LinkEvent`,
      method: 'PUT',
      json: {
        TenantId: config.TenantId,
        AuthToken: config.AuthToken,
        TimelineId: '1234',
        EventId: '4321',
      }
    }).then((body) => {
      expect(body).to.eq('OK')
    })
  })

  it('Get Timeline Linked Events', function () {
    return request({
      uri: `${config.endpoint}/Timeline/GetEvents`,
      method: 'GET',
      headers: {
        TenantId: config.TenantId,
        AuthToken: config.AuthToken,
        TimelineId: '1234',
      },
      json: true
    }).then((body) => {
      var link = _.find(body, {TimelineId: '1234'})
      expect(link.TimelineId).to.equal('1234')
      expect(link.TimelineEventId).to.equal('4321')
    })
  })

  it('Unlink an Event from a Timeline', function () {
    return request({
      uri: `${config.endpoint}/Timeline/UnlinkEvent`,
      method: 'PUT',
      json: {
        TenantId: config.TenantId,
        AuthToken: config.AuthToken,
        TimelineId: '1234',
        EventId: '4321',
      }
    }).then((body) => {
      expect(body).to.eq('OK')
    })
  })

  it('Creates an Event', function () {
    return request({
      uri: `${config.endpoint}/TimelineEvent/Create`,
      method: 'PUT',
      json: {
        TenantId: config.TenantId,
        AuthToken: config.AuthToken,
        TimelineEventId: '4321',
        Title: 'Test Title',
        Description: 'Test Description',
        EventDateTime: 'Test DateTime',
        Location: 'Test Location'
      }
    }).then((body) => {
      expect(body.Id).to.eq('4321')
      expect(body.Title).to.eq('Test Title')
      expect(body.Description).to.eq('Test Description')
      expect(body.EventDateTime).to.eq('Test DateTime')
      expect(body.Location).to.eq('Test Location')
    })
  })

  it('Edits Event Title', function () {
    return request({
      uri: `${config.endpoint}/TimelineEvent/EditTitle`,
      method: 'PUT',
      json: {
        TenantId: config.TenantId,
        AuthToken: config.AuthToken,
        TimelineEventId: '4321',
        Title: 'Test Title 2',
      }
    }).then((body) => {
      expect(body.Id).to.eq('4321')
      expect(body.Title).to.eq('Test Title 2')
      expect(body.Description).to.eq('Test Description')
      expect(body.EventDateTime).to.eq('Test DateTime')
      expect(body.Location).to.eq('Test Location')
    })
  })

  it('Edits Event Description', function () {
    return request({
      uri: `${config.endpoint}/TimelineEvent/EditDescription`,
      method: 'PUT',
      json: {
        TenantId: config.TenantId,
        AuthToken: config.AuthToken,
        TimelineEventId: '4321',
        Description: 'Test Description 2',
      }
    }).then((body) => {
      expect(body.Id).to.eq('4321')
      expect(body.Title).to.eq('Test Title 2')
      expect(body.Description).to.eq('Test Description 2')
      expect(body.EventDateTime).to.eq('Test DateTime')
      expect(body.Location).to.eq('Test Location')
    })
  })

  it('Edits Event EventDateTime', function () {
    return request({
      uri: `${config.endpoint}/TimelineEvent/EditEventDateTime`,
      method: 'PUT',
      json: {
        TenantId: config.TenantId,
        AuthToken: config.AuthToken,
        TimelineEventId: '4321',
        EventDateTime: 'Test Event Date Time 2',
      }
    }).then((body) => {
      expect(body.Id).to.eq('4321')
      expect(body.Title).to.eq('Test Title 2')
      expect(body.Description).to.eq('Test Description 2')
      expect(body.EventDateTime).to.eq('Test Event Date Time 2')
      expect(body.Location).to.eq('Test Location')
    })
  })

  it('Edits Event Location', function () {
    return request({
      uri: `${config.endpoint}/TimelineEvent/EditLocation`,
      method: 'PUT',
      json: {
        TenantId: config.TenantId,
        AuthToken: config.AuthToken,
        TimelineEventId: '4321',
        Location: 'Test Location 2',
      }
    }).then((body) => {
      expect(body.Id).to.eq('4321')
      expect(body.Title).to.eq('Test Title 2')
      expect(body.Description).to.eq('Test Description 2')
      expect(body.EventDateTime).to.eq('Test Event Date Time 2')
      expect(body.Location).to.eq('Test Location 2')
    })
  })

  it('Get Event', function () {
    return request({
      uri: `${config.endpoint}/TimelineEvent/GetTimelineEvent`,
      method: 'GET',
      headers: {
        TenantId: config.TenantId,
        AuthToken: config.AuthToken,
        TimelineEventId: '4321',
      },
      json: true
    }).then((body) => {
      expect(body.Id).to.eq('4321')
      expect(body.Title).to.eq('Test Title 2')
      expect(body.Description).to.eq('Test Description 2')
      expect(body.EventDateTime).to.eq('Test Event Date Time 2')
      expect(body.Location).to.eq('Test Location 2')
    })
  })

  it('Creates an Event', function () {
    return request({
      uri: `${config.endpoint}/TimelineEvent/Create`,
      method: 'PUT',
      json: {
        TenantId: config.TenantId,
        AuthToken: config.AuthToken,
        TimelineEventId: '43211',
        Title: 'Test Title',
        Description: 'Test Description',
        EventDateTime: 'Test DateTime',
        Location: 'Test Location'
      }
    }).then((body) => {
      expect(body.Id).to.eq('43211')
      expect(body.Title).to.eq('Test Title')
      expect(body.Description).to.eq('Test Description')
      expect(body.EventDateTime).to.eq('Test DateTime')
      expect(body.Location).to.eq('Test Location')
    })
  })

  it('Link Timeline Events', function () {
    return request({
      uri: `${config.endpoint}/TimelineEvent/LinkEvents`,
      method: 'PUT',
      json: {
        TenantId: config.TenantId,
        AuthToken: config.AuthToken,
        TimelineEventId: '4321',
        LinkedToTimelineEventId: '43211',
      }
    }).then((body) => {
      expect(body.Id).to.exist
      expect(body.TimelineEventId).to.eq('4321')
      expect(body.LinkedToTimelineEventId).to.eq('43211')
    })
  })

  it('Get Linked Timeline Events', function () {
    return request({
      uri: `${config.endpoint}/TimelineEvent/GetLinkedTimelineEvents`,
      method: 'GET',
      headers: {
        TenantId: config.TenantId,
        AuthToken: config.AuthToken,
        TimelineEventId: '4321'
      },
      json: true
    }).then((body) => {
      var link = _.find(body, {
        TimelineEventId: '4321',
        LinkedToTimelineEventId: '43211'
      })
      expect(link.Id).to.exist
      expect(link.TimelineEventId).to.eq('4321')
      expect(link.LinkedToTimelineEventId).to.eq('43211')
    })
  })

  it('Unlink Timeline Events', function () {
    return request({
      uri: `${config.endpoint}/TimelineEvent/UnlinkEvents`,
      method: 'PUT',
      json: {
        TenantId: config.TenantId,
        AuthToken: config.AuthToken,
        TimelineEventId: '4321',
        UnlinkedFromTimelineEventId: '43211',
      }
    }).then((body) => {
      expect(body).to.eq('Successfully unlinked Timeline Event: 4321 from Timeline Event: 43211')
    })
  })

  it('Deletes Timeline', function () {
    return request({
      uri: `${config.endpoint}/Timeline/Delete`,
      method: 'PUT',
      json: {
        TenantId: config.TenantId,
        AuthToken: config.AuthToken,
        TimelineId: '1234',
      }
    }).then((body) => {
      expect(body).to.eq('Deleted timeline 1234')
    })
  })

  it('Deletes Event', function () {
    return request({
      uri: `${config.endpoint}/TimelineEvent/Delete`,
      method: 'PUT',
      json: {
        TenantId: config.TenantId,
        AuthToken: config.AuthToken,
        TimelineEventId: '4321',
      }
    }).then((body) => {
      expect(body).to.eq('Successfully Deleted Timeline Event: 4321')
    })
  })
})
