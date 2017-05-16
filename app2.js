const args = require('yargs')
  .options({
    a: {
      demand: true,
      string: true,
      alias: 'address',
      describe: 'The address for which to fetch weather'
    }
  })
  .help()
  .argv;