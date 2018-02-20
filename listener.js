const path = require('path');
const program = require('commander');
 
program
  .version('1.0.0')
  .option('-l, --listener <listener>', 'the listener you want to run')
  .option('-a, --action <start | stop>')
  .option('-c, --cron [cron]', 'cron time, for example，* * * * * * means execute every second. Seconds: 0-59, Minutes: 0-59, Hours: 0-23, Day of Month: 1-31, Months: 0-11, Day of Week: 0-6')
  .parse(process.argv);


const Listener = require(path.resolve(__dirname, 'listeners', program.listener));
const listener = new Listener({
  cron: program.cron,
  name: program.listener
});

if (program.action === 'stop') {
  listener.stop();
} else {
  listener.start();
}