/**
 * Actor definition class.
 * TODO Don't forget to add this actor to the casting's actors (delete this todo afterwards)
 */
class BlankGuy {

  initialize(self) {
    this.logger = self.getLog()
    this.logger.info('started')
  }

  ping() {
    this.logger.info('received ping, sending pong')
    return 'pong'
  }

}

module.exports = BlankGuy;
