import test from 'ava'

let actor

test.before(t => {
  const comedy = require('comedy')
  const endpointGuy = require('../services/actors/endpoint-guy')
  actor = comedy()
    .rootActor() // Get a root actor reference.
    .then(rootActor => rootActor.createChild(endpointGuy)) // Create a module-defined child actor.
})

test('endpoint guy receives ping, sends pong', t => {
  t.plan(1)

  // prep
  return actor.then(actor => actor.sendAndReceive('ping'))
    .then(reply => t.is(reply, 'pong'))
})

test.todo('endpoint guy receives get rooms, sends a list of rooms')
