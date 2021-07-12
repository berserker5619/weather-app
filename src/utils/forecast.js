const request = require('request')

const foreCast = (lattitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=bca9aa94aafeca86e183c3c9505e55dc&query=${lattitude},${longitude}&units=f`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services', undefined);
        } else if (body.error) {
            callback("Unable to find location", undefined);
        } else {
            const temperature = body.current.temperature
            const weather_descriptions = body.current.weather_descriptions[0]
            const precipitation = body.current.precip
            callback(undefined, { weather_descriptions: weather_descriptions, temperature: temperature, precipitation: precipitation })
        }
    })

}

module.exports = foreCast