/**
 * Actor definition class.
 * TODO Don't forget to add this actor to the casting's actors (delete this todo afterwards)
 */
class RoomsBoy {

  initialize(self) {
    this.logger = self.getLog()
    this.logger.info('started')
  }

  get({db}) {
    return db
      .sendAndReceive('findAll', {collectionName:'roomsposttest'})
      .then(reply => reply)
  }

  getByName({db, name}) {
    return db
      .sendAndReceive('findOneRoom', {
        collectionName:'roomsposttest', roomName: name
      })
      .then(
        reply => ({status: 200, content: reply}),
        err => err
      )
  }

  post({db, room}) {

    this.logger.info('<- received post ' + room)

    let bad = (attr, type) => ({
      status: 400,
      content: attr+' does not exist or is not a valid '+type
    })
    let valid = false

    // I check whether this is is a valid room and add to it
    if(!room.name || 0 === room.name.length) return bad('name', 'string')
    if(room.settings) {
      if(!room.settings.isValid()) return bad('settings', 'Settings object') // TODO: do isValid()
    } else {
      room.settings = {game: "Fortnite", maxUsers: 4}
    }
    room.currentUsers = []
    // I check whether the name already exists
    return this.nameExists(db, room.name)
      .then(
        exists => {
          if(exists) return ({status: 409, content: 'a room with the name ' + room.name + ' already exists'})
          else {
            return db
              .sendAndReceive('insertOne', {collectionName:'roomsposttest', object: room})
              .then(
                reply => ({status: 201, content: room}),
                err => ({status: 500, content: err})
              )
          }
        },
        err => ({status: 500, content: err}))

    

  }

  put({db, name, room}) {

    return db
      .sendAndReceive('update', {
        collectionName:'roomsposttest',
        query: {name: name},
        object: room
      })
      .then(reply => {
        if(reply === 404) return {status: 404, content: 'could not find room with name ' + name}
        else return {status: 200, content: room}
      })

  }

  delete({db, name}) {
    return db
      .sendAndReceive('deleteOne', {
        collectionName:'roomsposttest', query: {name: name}
      })
      .then(reply => {
        if(reply > 0) return {status: 204, content: ''}
        else return {status: 404, content: 'could not delete room with name ' + name}
      })
  }

  // utils

  nameExists(db, name) {
    return db
      .sendAndReceive('exists', {
        collectionName:'roomsposttest', query: {name: name}
      })
      .then(
        // reply => !!reply
        reply => reply
      )
  }

  // basic actor topic

  ping() {
    this.logger.info('<- received ping, -> sending pong')
    return 'pong'
  }

}

module.exports = RoomsBoy;
