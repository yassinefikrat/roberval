const endpointGuyDefinition = require('./endpoint-guy')

/**
 * Actor definition class.
 */
class MainMan {

  initialize(self) {

    this.logger = self.getLog()
    this.logger.info('initializing')

    this.book = new Map()

    this.logger.info('creating child endpointGuy')
    return self.createChild(endpointGuyDefinition)
      .then(endpointGuy => {
        this.logger.info('child endpointGuy created')
        this.book.set('endpointGuy', endpointGuy)
        this.logger.info('started')
      })


  }

  ping() {
    this.logger.info('received ping, sending pong')
    return 'pong'
  }

  do(that) {
    console.log('did ' + that)
  }

  forward({to, topic}) {
    return this.book.get(to).sendAndReceive(topic).then(reply => reply)
  }

  forwardWithMessage({to, topic, message}) {
    return this.book.get(to).sendAndReceive(topic, message).then(reply => reply)
  }

}

module.exports = MainMan;
