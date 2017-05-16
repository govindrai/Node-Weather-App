const request = require('request')

var geocodeAddress = (address) => {
  let baseURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
  let url = baseURL + encodeURIComponent(address);
  request({
    url: url,
    json: true
  }, (error, response, body) => {
    if (error) {
      console.log("there's an error connecting brah")
      console.log(error)
    } else {
      console.log("I don't have errors")
      if (body.status === "OK") {
        let results = body.results[0];
        queryDarkSky(results.geometry.location); //latLng

      } else if (body.status === "ZERO_RESULTS") {
        console.log("I'm sorry, no address matches " + address);
      } else {
        console.log("I made it here in teh last else")
        console.log(body.error_message);
      }
    }
  });
}

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
      console.log(body.currently.temperature);
      console.log(body.daily.summary);
    }
  })

}

module.exports = {
  geocodeAddress
}
