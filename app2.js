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
  let results = response.data.results[0];
  let address = results.formatted_address;
  let latitude = results.geometry.location.lat;
  let longitude = results.geometry.location.lng;
  let baseWeatherURL = `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/`;
  let weatherURL = baseWeatherURL + encodeURIComponent(`${latitude},${longitude}`);
  console.log(weatherURL)
  return axios.get(weatherURL)
}).then((response) => {
  console.log(`This temperature is ${response.data.currently.temperature}. It feels like ${response.data.currently.apparentTemperature}.`)
}).catch((e) => {
  if (e.code === "ENOTFOUND") {
    console.log("Unable to connect to Google Servers :(");
  }
  console.log(e.message);
});

