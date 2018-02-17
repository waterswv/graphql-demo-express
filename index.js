let express = require('express'),
    mongoose = require('mongoose'),
    graphqlHTTP = require('express-graphql'),
    {buildSchema} = require('graphql');

    // Create client with a Promise constructor
    const googleMapsClient = require('@google/maps').createClient({
      key: 'AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg',
      Promise: Promise // 'Promise' is the native constructor.
    });

    // Geocode an address with a promise
    googleMapsClient.geocode({address: '1600 Amphitheatre Parkway, Mountain View, CA'}).asPromise()
      .then((response) => {
        console.log(response.json.results);
      })
      .catch((err) => {
        console.log(err);
      });

// Schema Example

let schema = buildSchema(`
  type Query {
    hello: String
  }
`);

let root = { hello: () => {return 'Hello World'}};

let app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen(4000, console.log('Express Server running on localhost:4000/graphql'));
// Updated Google Maps NPM Module https://github.com/googlemaps/google-maps-services-js
// Google Maps URI for generating waypoint directions
// https://maps.googleapis.com/maps/api/directions/json?origin=Boston,MA&destination=Concord,MA&waypoints=Charlestown,MA|Lexington,MA&key=YOUR_API_KEY
