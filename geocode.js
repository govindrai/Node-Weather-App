const request = require('request');

var geocodeAddress = (address) => {
  let url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(address);

  request({
    url: url,
    json: true
  }, (error, response, body) => {
    if (error) {
      console.log("Unable to connect to Google Servers");
    } else {
      if (body.status === "OK") {
        queryDarkSky(body.results[0].geometry.location);
      } else if (body.status === "ZERO_RESULTS") {
        console.log("I'm sorry, no address matches " + address);
      } else {
        console.log(body.error_message);
      }
    }
  });
};

var queryDarkSky = (latLng) => {
  var baseURL = `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/`;
  var url = baseURL + encodeURIComponent(`${latLng.lat},${latLng.lng}`);
  request({
    url: url,
    json: true
  }, (error, response, body) => {
    if (error) {
      console.log("Could not connect to Dark Sky servers");
      console.log(error);
    } else {
      console.log("Hooray! We were able to connect to DarkSky servers");
      console.log(`"It is currently ${body.currently.temperature} degrees Farenheit`);
      console.log(`Here's a summary ${body.daily.summary}`);
    }
  })
};

module.exports = {
  geocodeAddress
};
