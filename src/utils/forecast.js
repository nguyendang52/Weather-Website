const request = require('request');

const forecast = ({ latitude, longitude }, callback) => {
    //
    console.log(latitude, longitude);
    const url =
        'http://api.weatherstack.com/current?access_key=ca964e31bfecaba4dfd050efb3849f54&query=' +
        latitude +
        ',' +
        longitude +
        '&units=m';

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (response.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(
                undefined,
                response.body.current.weather_descriptions[0] +
                    '. It is currently ' +
                    response.body.current.temperature +
                    ' degress out.'
            );
        }
    });
};

module.exports = forecast;
