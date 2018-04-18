/**
 * Actor DbClerk definition class.
 * This guy does CRUD operations on the database
 * He's made to be database agnostic
 */
class DbClerk {

  /**
   * Actor initialization logic.
   *
   * @param selfActor Self actor instance.
   */
  initialize(self) {
    this.logger = self.getLog()
    this.logger.info('started')
  }

  ping() {
    this.logger.info('received ping, sending pong')
    return 'pong'
  }

  dumpCollection(collection) {
    this.logger.info('received dumpCollection message')
    // return this.mongoDb.collection(name).find({}).toArray().then(result => {
    //   result.forEach((obj, idx) => {
    //     console.log(`Collection "${name}", item #${idx}: ${JSON.stringify(obj, null, 2)}`);
    //   });
    // });
  }

  get() {

  }

}

module.exports = DbClerk;
