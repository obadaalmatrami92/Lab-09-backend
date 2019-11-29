'use strict';

const superagent = require('superagent');

const client = require('./client.js');

module.exports = location;

let cache = {};
const location = {};

location.getLocationData = function(city) {
    let SQL = 'SELECT * FROM locations WHERE search_query = $1';
    let cities = [city];
    return client.query(SQL, cities)
        .then(results => {
            if (results.rowCount) { return results.rows[0]; } else {
                const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${process.env.GEOCODE_API_KEY}`;
                return superagent.get(url)
                    .then(data => storeLocationInCache(city, data.body));
            }
        });
};

function storeLocationInCache(city, data) {
    const location = new Location(data.results[0]);
    let SQL = 'INSERT INTO locations (search_query, formatted_query, latitude, longitude) cities ($1, $2, $3, $4) RETURNING *';
    let cities = [city, location.formatted_query, location.lat, location.lng];
    return client.query(SQL, cities)
        .then(results => {
            const storedLocation = results.rows[0];
            cache[city] = storedLocation;
            return storedLocation;
        });
};

function Location(data) {
    this.formatted_query = data.formatted_address;
    this.latitude = data.geometry.location.lat;
    this.longitude = data.geometry.location.lng;
}