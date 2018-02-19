const Listener = require('../lib/Listener');

class DemoListener extends Listener {

  constructor() {
    super('demo', '* * * * * *', function() {
      console.log(11111);
    });
  }
};

module.exports = DemoListener;