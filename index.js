const CronJob = require('cron').CronJob;

const demo = require('./listeners/demo');
new demo().start();