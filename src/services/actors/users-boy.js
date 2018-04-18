/**
 * Actor definition class.
 * TODO Don't forget to add this actor to the casting's actors (delete this todo afterwards)
 */
class UsersBoy {

  get({db}) {
    return db
      .sendAndReceive('findAll', {collectionName:'users'})
      .then(reply => reply)
  }

  getByName({db, name}) {
    return db
      .sendAndReceive('findOne', {
        collectionName:'users', query: {name: name}
      })
      .then(
        reply => ({status: 200, content: reply}),
        err => err
      )
  }

  post({db, user}) {

    let bad = (attr, type) => ({
      status: 400,
      content: attr+' does not exist or is not a valid '+type
    })
    let valid = false

    // I check whether this is is a valid room and add to it
    if(!user.name || 0 === user.name.length) return bad('name', 'string')
    if(user.settings) {
      if(!user.settings.isValid()) return bad('settings', 'Settings object') // TODO: do isValid()
    } else {
      user.settings = {favoriteGame: "Fortnite"}
    }
    
    // I check whether the name already exists
    return this.nameExists(db, user.name)
      .then(
        exists => {
          if(exists) return ({status: 409, content: 'a user with the name ' + room.name + ' already exists'})
          else {
            return db
              .sendAndReceive('insertOne', {collectionName:'users', object: user})
              .then(
                reply => ({status: 201, content: user}),
                err => ({status: 500, content: err})
              )
          }
        },
        err => ({status: 500, content: err}))

    

  }

  put({db, name, user}) {

    return db
      .sendAndReceive('update', {
        collectionName:'users',
        query: {name: name},
        object: user
      })
      .then(reply => {
        if(reply === 404) return {status: 404, content: 'could not find user with name ' + name}
        else return {status: 200, content: user}
      })

  }

  delete({db, name}) {
    return db
      .sendAndReceive('deleteOne', {
        collectionName:'users', query: {name: name}
      })
      .then(reply => {
        if(reply > 0) return {status: 204, content: ''}
        else return {status: 404, content: 'could not find user with name ' + name}
      })
  }

  // utils

  nameExists(db, name) {
    return db
      .sendAndReceive('exists', {
        collectionName:'users', query: {name: name}
      })
      .then(
        // reply => !!reply
        reply => reply
      )
  }


  initialize(self) {
    this.logger = self.getLog()
    this.logger.info('started')
  }

  ping() {
    this.logger.info('received ping, sending pong')
    return 'pong'
  }

}

module.exports = UsersBoy;
