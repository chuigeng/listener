const CronJob = require('cron').CronJob;

const listenerPool = require('./listener-pool');

class Listener {

  constructor(name, cronTime, onTick) {
    this.name = name;
    this.job = new CronJob({
      cronTime,
      onTick,
      start: false,
    });
  }

  start() {
    listenerPool.add(this);
    this.job.start();
  }

  stop() {
    this.job.stop();
    listenerPool.remove(this);
  }

  getName() {
    return this.name;
  }
};

module.exports = Listener;