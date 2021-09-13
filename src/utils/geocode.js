const request = require('request');
const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
    )}.json?access_token=pk.eyJ1Ijoibmd1eWVuZGFuZzUyIiwiYSI6ImNrdDRrbGV6YzBpYWcydm8yZHEzMGQzam8ifQ.sBJopXXVSh9TsvIaYeE78g`;
    request({ url, json: true }, function (error, response) {
        //console.log(Object.getOwnPropertyNames(body.body));
        console.log('Test response');
        if (error) {
            callback('Unable to connect to location services', undefined);
        } else if (response.body.features.length == 0) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name,
            });
        }
    });
    console.log('abc');
};
module.exports = geoCode;
