const Listener = require('../lib/Listener');

class DemoListener extends Listener {

  constructor(options) {
    super('demo', (options.cron || '* * * * * *'), function() {
      console.log('hi! My name is demo!');
    });
  }
};

module.exports = DemoListener;