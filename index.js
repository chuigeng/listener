const CronJob = require('cron').CronJob;
const fs = require('fs');
const path = require('path');

const listenerPool = require('./lib/listener-pool');
const demo = require('./listeners/demo');

// 专门的 stoppper 管理
let manager = new CronJob({
  cronTime: '* * * * * *',
  start: false,
  onTick: function() {
    const listenerConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'listener.json'),
      { 
        encoding: 'utf-8' 
      }
    ));

    console.log(listenerConfig);

    if (!listenerConfig || !listenerConfig.run) {
      listenerPool.list().forEach(listener => listener.stop());
    }
  },
}).start();


new demo().start();