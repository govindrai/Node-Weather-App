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

let mapsURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(args.address);

axios.get(mapsURL).then((response) => {
  if (response.data.status == "ZERO_RESULTS") {
    throw new Error("Unable to find addresss");
  }
  console.log(`Address: ${response.data.results[0].formatted_address}`);
  let latitude = response.data.results[0].geometry.location.lat;
  let longitude = response.data.results[0].geometry.location.lng;

  let weatherURL = `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/` + encodeURIComponent(`${latitude},${longitude}`);
  return axios.get(weatherURL)
}).then((response) => {
  console.log(`This temperature is ${response.data.currently.temperature}. It feels like ${response.data.currently.apparentTemperature}.`)
}).catch((e) => {
  if (e.code === "ENOTFOUND") {
    console.log("Unable to connect to Google Servers");
  }
  console.log(e.message);
});

