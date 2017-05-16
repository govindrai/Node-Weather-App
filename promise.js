const request = require('request');

var geocodeAddress = (address) => {
  let baseURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
  let url = baseURL + encodeURIComponent(address);

  return new Promise((resolve, reject) => {
    request({
      url: url,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject("Unable to connect to Google Servers");
      } else if (body.status === "ZERO_RESULTS") {
        reject("No results for that address");
      } else if (body.status === "OK") {
        let results = body.results[0];
        let address = results.formatted_address;
        let latLng = results.geometry.location;
        resolve({
          address,
          latitude: latLng.lat,
          longitude: latLng.lng
        });
      }
    });
  });
}

geocodeAddress('3305 Madden Way Dublin CA').then((locationObj) => {
  console.log("success!")
  console.log(JSON.stringify(locationObj, undefined, 2))
}).catch((errorObj) => {
  console.log("You done goofed, eh");
  console.log(errorObj);
});