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
      if (body.status === "OK") {
        let results = body.results[0];
        let address = results.formatted_address;
        let latLng = results.geometry.location;
        console.log(`The address is ${address}`);
        console.log(`The latitude is ${latLng.lat}`);
        console.log(`The longitude is ${latLng.lng}`);
      } else if (body.status === "ZERO_RESULTS") {
        console.log("I'm sorry, no address matches " + address);
      } else {
        console.log(body.error_message);
      }
    }
  });
}

module.exports = {
  geocodeAddress
}