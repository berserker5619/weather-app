const request = require('request')

const geoCode = (address, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoibml6YW01NjE5IiwiYSI6ImNrcXQxcG81azI1ZTkyd3BlbHM4eWR5MXcifQ.Hqif_znroprpg9TDs04f-g&limit=1`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to location services", undefined);
        } else if (body.message || body.features.length === 0) {
            callback("location not found", undefined);
        } else {
            const longitude = body.features[0].center[0]
            const lattitude = body.features[0].center[1]
            const place_name = body.features[0].place_name
            callback(undefined, { longitude: longitude, lattitude: lattitude, place_name: place_name })
        }
    })
}

module.exports = geoCode