let express = require('express'),
    mongoose = require('mongoose'),
    graphqlHTTP = require('express-graphql'),
    {buildSchema} = require('graphql');


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
