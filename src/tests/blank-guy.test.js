import test from 'ava'

const name = 'blank-guy' // Change this and only this

let actor

test.before(t => {
  const comedy = require('comedy')
  const actorDefinition = require('../services/actors/' + name)
  actor = comedy()
    .rootActor() // Get a root actor reference.
    .then(rootActor => rootActor.createChild(actorDefinition)) // Create a module-defined child actor.
})

test(name + ' receives ping, sends pong', t => {

  t.plan(1)

  return actor
    .then(actor => actor.sendAndReceive('ping'))
    .then(reply => t.is(reply, 'pong'))

})
