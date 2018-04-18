/**
 * Actor definition class.
 */
class MongoGuy {



  initialize(self) {

    this.logger = self.getLog()

    // open a db connection
    const MongoClient = require('mongodb').MongoClient;
    const assert = require('assert');
    const url = 'mongodb://localhost:27017/test';
    const dbName = 'robervalDB';

    let _this = this

    return new Promise((resolve, reject) => {
      MongoClient.connect(url, (err, client) => {
        if(err) reject()
        this.logger.info("connected successfully to mongo");
        this.client = client
        this.db = client.db(dbName)
        this.logger.info('started')
        resolve()
      })
    })

  }

  findAll({collectionName}) {

    const collection = this.db.collection(collectionName)

    return new Promise((resolve, reject) => {
      collection.find({}).toArray((err, docs) => {
        if(err) reject()
        resolve(docs)
      })
    })

  }

  findOne({collectionName, query}) {

    const collection = this.db.collection(collectionName)

    return new Promise((resolve, reject) => {
      collection
        .find(query)
        .limit(1)
        .toArray((err, docs) => {
          if(err) reject({status: 500, content: 'query to mongo failed'})
          if(docs.length < 1) reject({status: 404, content: 'could not find room with name ' + query.name})
          resolve(docs[0])
        })
    })

  }

  findOneRoom({collectionName, roomName}) {

    const collection = this.db.collection(collectionName)

    return new Promise((resolve, reject) => {
      collection
        .find({name: roomName})
        .limit(1)
        .toArray((err, docs) => {
          if(err) reject({status: 500, content: 'query to mongo failed'})
          if(docs.length < 1) reject({status: 404, content: 'could not find room with name ' + roomName})
          resolve(docs[0])
        })
    })

  }

  // TODO: replies with object created
  insertOne({collectionName, object}) {

    this.logger.info('<- received insertOne ' + object)

    const collection = this.db.collection(collectionName)

    return new Promise((resolve, reject) => {
      collection.insertOne(object, (err, r) => {
        if(err) reject(r)
        resolve(r)
      })
    })

  }

  update({collectionName, query, object}) {

    const collection = this.db.collection(collectionName)

    return new Promise((resolve, reject) => {
      delete object._id
      collection.update(query, object, (err, r) => {
        if(err) reject(err)
        if(r.result.nModified < 1) resolve (404)
        resolve(r.result)
      })
    })

  }

  // replies with number of entries deleted
  deleteOne({collectionName, query}) {

    const collection = this.db.collection(collectionName)

    return new Promise((resolve, reject) => {
      collection.deleteOne(query, (err, r) => {
        if(err) reject()
        resolve(r.deletedCount)
      })
    })

  }

  // replies with true if query returns a doc, else otherwise
  exists({collectionName, query}) {

    const collection = this.db.collection(collectionName)

    return new Promise((resolve, reject) => {
      collection.find(query).toArray((err, docs) => {
        if(err) reject()
        resolve(docs.length > 0)
      })
    })

  }

  ping() {
    this.logger.info('received ping, sending pong')
    return 'pong'
  }

  destroy(self) {
    this.logger.info('closing connection to mongo')
    this.client.close
  }

}

module.exports = MongoGuy
