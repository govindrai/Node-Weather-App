const axios = require('axios');
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

  let baseMapsURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
  let mapsURL = baseMapsURL + encodeURIComponent(args.address);

  axios.get(mapsURL).then((response) => {
    if (response.data.status == "ZERO_RESULTS") {
      throw new Error("Unable to find addresss");
    }
    console.log(response.data);
  }).catch((e) => {
    if (e.code === "ENOTFOUND") {
      console.log("Unable to connect to Google Servers :(");
    }
    console.log(e.message);
  });

