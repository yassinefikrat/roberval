const mongoGuyDefinition = require('./mongo-guy')
const roomsBoyDefinition = require('./rooms-boy')
const usersBoyDefinition = require('./users-boy')

/**
 * Actor definition class.
 */
class EndPointGuy {

  getRooms({req, res, next}) {

    return this.book.get('roomsBoy')
      .sendAndReceive('get', {db: this.book.get('mongoGuy')})
      .then(reply => {
        res.status(200).send(reply)
      })

  }

  getRoomByName({req, res, next}) {

    return this.book.get('roomsBoy')
      .sendAndReceive('getByName', {
        db: this.book.get('mongoGuy'),
        name: req.params.name
      })
      .then(reply => {
        res.status(reply.status).send(reply.content)
      })

  }

  postRoom({req, res, next}) {

    this.logger.info('<- received postRoom ' + req.body)

    return this.book.get('roomsBoy')
      .sendAndReceive('post', {
        db: this.book.get('mongoGuy'),
        room: req.body
      })
      .then(reply => {
        this.logger.info('-> replied ' + reply)
        res.status(reply.status).send(reply.content)
      })

  }

  putRoom({req, res, next}) {

    this.logger.info('<- received putRoom ' + req.body)

    return this.book.get('roomsBoy')
      .sendAndReceive('put', {
        db: this.book.get('mongoGuy'),
        name: req.params.name,
        room: req.body
      })
      .then(reply => {
        res.status(reply.status).send(reply.content)
      })

  }

  deleteRoom({req, res, next}) {

    return this.book.get('roomsBoy')
      .sendAndReceive('delete', {
        db: this.book.get('mongoGuy'),
        name: req.params.name})
      .then(reply => {
        res.status(reply.status).send(reply.content)
      })

  }

  getUsers({req, res, next}) {

    return this.book.get('usersBoy')
      .sendAndReceive('get', {db: this.book.get('mongoGuy')})
      .then(reply => {
        res.status(200).send(reply)
      })

  }

  getUserByName({req, res, next}) {

    return this.book.get('usersBoy')
      .sendAndReceive('getByName', {
        db: this.book.get('mongoGuy'),
        name: req.params.name
      })
      .then(reply => {
        res.status(reply.status).send(reply.content)
      })

  }

  postUser({req, res, next}) {

    return this.book.get('usersBoy')
      .sendAndReceive('post', {
        db: this.book.get('mongoGuy'),
        user: req.body
      })
      .then(reply => {
        this.logger.info('-> replied ' + reply)
        res.status(reply.status).send(reply.content)
      })

  }

  putUser({req, res, next}) {

    return this.book.get('usersBoy')
      .sendAndReceive('put', {
        db: this.book.get('mongoGuy'),
        name: req.params.name,
        user: req.body
      })
      .then(reply => {
        res.status(reply.status).send(reply.content)
      })

  }

  deleteUser({req, res, next}) {

    return this.book.get('usersBoy')
      .sendAndReceive('delete', {
        db: this.book.get('mongoGuy'),
        name: req.params.name})
      .then(reply => {
        res.status(reply.status).send(reply.content)
      })

  }

  initialize(self) {

    this.logger = self.getLog()
    this.logger.info('initializing')

    this.book = new Map()

    return Promise.all([
      self.createChild(mongoGuyDefinition),
      self.createChild(roomsBoyDefinition),
      self.createChild(usersBoyDefinition)
    ]).then(guys => {
      this.book.set('mongoGuy', guys[0])
      this.logger.info('child mongoGuy created')
      this.book.set('roomsBoy', guys[1])
      this.logger.info('child roomsBoy created')
      this.book.set('usersBoy', guys[2])
      this.logger.info('child usersBoy created')
      this.logger.info('started')
    })

  }

  ping() {

    this.logger.info('received ping, sending pong')
    return 'pong'

  }

}

module.exports = EndPointGuy;
