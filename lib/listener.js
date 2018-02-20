const CronJob = require('cron').CronJob;
const dateFormat = require('dateformat');
const fs = require('fs');
const jsonfile = require('jsonfile');
const Log = require('log');
const path = require('path');

const listenerJsonPath = path.resolve(__dirname, '../listener.json');

class Listener {

  constructor(name, cronTime, onTick) {
    this.name = name;
    this.runTime = 0;
    const that = this;
    this.job = new CronJob({
      cronTime,
      onTick: function() {
        const listenerJson = jsonfile.readFileSync(listenerJsonPath,
          { 
            encoding: 'utf-8' 
          }
        );

        if (!listenerJson || !listenerJson.listeners || 
          !listenerJson.listeners[that.name] || !listenerJson.listeners[that.name].run) {
          that.stop();
        } else {
          that.runTime++;
          try {
            that.logger.info(`Listener[${that.name}][${that.runTime}] start`);
            onTick(that);
            that.logger.info(`Listener[${that.name}][${that.runTime}] finish`);
          } catch (e) {
            that.logger.info(`Listener[${that.name}][${that.runTime}] meet exception.`, e);
          }
        }
      },
      start: false,
    });

    this.logger = new Log('debug', fs.createWriteStream(path.resolve(__dirname, `../logs/${dateFormat(Date.now(), 'yyyy-mm-dd')}.log`)));
  }

  start() {
    this._updateListenerJson(true);
    this.job.start();
    this.logger.info(`Listener[${this.name}] start`);
  }

  stop() {
    this._updateListenerJson(false);
    this.job.stop();
    this.logger.info(`Listener[${this.name}] stop`);
  }

  getName() {
    return this.name;
  }

  _updateListenerJson(run) {
    let listenerJson = jsonfile.readFileSync(listenerJsonPath,
      { 
        encoding: 'utf-8' 
      }
    );
    listenerJson = listenerJson || {};
    listenerJson.listeners = listenerJson.listeners || {};
    listenerJson.listeners[this.name] = listenerJson.listeners[this.name] || {};
    listenerJson.listeners[this.name].run = run;

    jsonfile.writeFileSync(listenerJsonPath, listenerJson, {
      encoding: 'utf-8',
      spaces: 2,
    });
  }
};

module.exports = Listener;