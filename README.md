# Timelines API

This is the same API, same functionality, only that it is implemented in nodejs and supports CORS

[![Build Status](https://travis-ci.org/dirchev/timelines-api.svg?branch=master)](https://travis-ci.org/dirchev/timelines-api)

## How to use?

I tried my best to have the same functionality as Ideagen's API, having the same request and response structure. The only difference is that the instead of storing things in a database (which I am too lazy to set up) everything in stored in runtime memory. **Yep, if you crash the server the database is cleared. However, it will be useful to crash it from time to time so that the runtime memory is cleared.**

So, in order to use, instead of sending requests to `https://gcu.ideagen-development.com`, send them to `https://timeline-api-dirchev.herokuapp.com`.

:warning: **Do not pass any TenantId or AuthToken. They are not taken into consideration and as the app is implemented in literally 2 hours, I can not guarantee how secure the data is!!!** :warning:

:warning: **This is a shared database! So if I create a timeline, you will be able to see it!!!! Learn more about XSS attacks [here](http://lmgtfy.com/?q=xss) so no one can steal your code!!** :warning:

## Things Implemented:

* Timeline Create
* Timeline Title Update
* Get Timeline
* Get Timelines
* Delete Timeline

* Link Event To Timeline
* Unlink Event From Timeline
* Get Event-Timeline Links (the one that you pass TimelineId)

* Create Event
* Get Event
* Delete Event
* All of the Event Edit Endpoints

* Link event to event
* Unlink event to event
* Get linked events to event

## But I want to run it locally, too!

And you can totally do this. You just need NodeJS installed (I install it using [nvm](https://github.com/creationix/nvm)) and then:

(this is bash!, but I think it is similar in Windows/Mac)

```
git clone https://github.com/dirchev/timelines-api

cd timelines-api

npm install

npm run
```

then the same server is available on `localhost:3001` or `127.0.0.1:3001`

## Testing

There is a full API test that can be run against this server or the official server. In order to run all tests, do:

```
npm test
```

### `config.json`

The `config.json` file has the set up for the local server testing. However, it can be updated in order to run the tests against the official server.

In order to do this, update `config.json` to:

```
{
  "endpoint": "http://gcu.ideagen-development.com",
  "TenantId": "INSERT TENANT ID",
  "AuthToken": "INSERT AUTH TOKEN"
}
```

## I found a bug

Ping me in slack with `@dirchev`
