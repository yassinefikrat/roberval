import test from 'ava'

const name = 'main-man' // Change this and only this

let actor

test.before(t => {
  const comedy = require('comedy')
  const actorDefinition = require('../services/actors/' + name)
  actor = comedy()
    .rootActor()
    .then(rootActor => rootActor.createChild(actorDefinition))
})

test(name + ' receives ping, sends pong', t => {

  t.plan(1)

  return actor
    .then(actor => actor.sendAndReceive('ping'))
    .then(reply => t.is(reply, 'pong'))

})

test.todo(name + ' creates 2 endpoint guys')

test(name + ' forwards message to endpoint guy', t => {
  return actor
    .then(actor => actor.sendAndReceive('forward', {to: 'endpointGuy', topic: 'ping'}))
    .then(reply => t.is(reply, 'pong'))
})
