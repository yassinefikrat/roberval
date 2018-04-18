import test from 'ava'
import {MongoDBServer} from 'mongomem'

const name = 'mongo-guy'
let mongoGuy

const MongoClient = require('mongodb').MongoClient
const dbUrl = 'mongodb://localhost:27017/test'
const dbName = 'robervalDB'
let dbClient

test.before.cb(t => {

  const comedy = require('comedy')
  const actorDefinition = require('../services/actors/' + name)

  comedy()
    .rootActor() // Get a root actor reference.
    .then(rootActor => rootActor.createChild(actorDefinition)) // Create a module-defined child actor.
    .then(actor => {
      mongoGuy = actor
      t.end()
    })

})

test(name + ' receives ping, sends pong', t => {

  return mongoGuy.sendAndReceive('ping')
    .then(reply => t.is(reply, 'pong'))

})

test(name + ' finds all documents in mongo collection test', t => {

  return populateCollection('testing').then(result => {
    return mongoGuy.sendAndReceive('findAll', {collectionName:'testing'})
      .then(docs => {
        t.is(docs[0].name, 'Alice')
        t.is(docs[1].name, 'Bob')
        t.is(docs[2].name, 'Carol')
      })
	});

})

test(name + ' finds one room given a name', t => {

  const collectionName = 'testingFindOneRoomCollection'
  const data = [{ name: 'lmsqklmkd'}, { name: 'sqx'}, { name: 'azeeeeee'}, { name: 'logecaroom'}, { name: 'lmsqksslmkd'}, ]

  return populateCollection(collectionName, data).then(result => {
    return mongoGuy.sendAndReceive('findOneRoom', {collectionName: collectionName, roomName: 'logecaroom'})
      .then(doc => {
        t.is(doc.name, 'logecaroom')
      })
	});

})

test.after.always.cb(t => {
  dbClient.db(dbName).collection('testing').deleteMany({}, t.end)
})

function populateCollection(collectionName, data=[{ name: 'Alice' }, { name: 'Bob' }, { name: 'Carol' }]) {
  return new Promise((resolve, reject) => {
    mongo().then(db => {
      db.collection(collectionName).insertMany(data, (err, r) => {
        resolve()
      })
    })
  })
}

function mongo() {

  return new Promise((resolve, reject) => {
    MongoClient.connect(dbUrl, (err, client) => {
      if(err) reject(err)
      dbClient = client
      resolve(client.db(dbName))
    })
  })
}
