// The director exports an object

const comedy = require('comedy')

const endpointGuy = require('./actors/endpoint-guy')
const dbClerk = require('./actors/db-clerk')
const mongoGuy = require('./actors/mongo-guy')
const mainManDefinition = require('./actors/main-man')
const actors = [
  dbClerk,
  mongoGuy
]

let mainManActor

const createActor = (actor) => {
  return comedy()
    .rootActor() // Get a root actor reference.
    .then(rootActor => rootActor.createChild(actor))
}

function createAllActors() {
  return new Promise((resolve, reject) => {
    for(let actorDef of actors) createActor(actorDef).then(myActor => {})
    createActor(mainManDefinition).then(actor => {
      mainManActor = actor
      resolve()
    })
  })
}

function sendToMainMan(topic, message) {
  mainManActor.send(topic, message)
}

let casting = {
  hire: createAllActors,
  sendToMainMan: sendToMainMan
}

module.exports = casting
