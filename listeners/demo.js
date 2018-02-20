const Listener = require('../lib/listener');

class DemoListener extends Listener {

  constructor(options) {
    super(options.name, (options.cron || '* * * * * *'), function(ctx) {
      console.log('hi! My name is demo!');
    });
  }
};

module.exports = DemoListener;