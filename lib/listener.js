const CronJob = require('cron').CronJob;
const jsonfile = require('jsonfile');
const path = require('path');

const listenerJsonPath = path.resolve(__dirname, '../listener.json');

class Listener {

  constructor(name, cronTime, onTick) {
    this.name = name;
    const that = this;
    this.job = new CronJob({
      cronTime,
      onTick: function() {
        const listenerJson = jsonfile.readFileSync(listenerJsonPath,
          { 
            encoding: 'utf-8' 
          }
        );

        console.log(listenerJson);

        if (!listenerJson || !listenerJson.listeners || 
          !listenerJson.listeners[that.name] || !listenerJson.listeners[that.name].run) {
          that.stop();
        } else {
          onTick();
        }
      },
      start: false,
    });
  }

  start() {
    this._updateListenerJson(true);
    this.job.start();
  }

  stop() {
    this._updateListenerJson(false);
    this.job.stop();
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