const express = require("express");
const {graphQLSchema} = require("../src/GraphQL/Root/graphQLSchema");
const cors = require("cors");
const {graphqlHTTP} = require("express-graphql");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const {applyMiddleware} = require("graphql-middleware");
const {permissions} = require("../src/GraphQL/Middleware/permissions");


const app = express();

const schema = applyMiddleware(graphQLSchema, permissions)

/**
 * Extended options for our create event route that uses form-data
 */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


/**
 * GQl  route and middleware
 */
app.use('/api/graphql', (req, res, next) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    next();
});


app.use(
    '/api/graphql',
    cors(),
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);


mongoose
    .connect(process.env.DATABASE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to database')
    })
    .catch((err) => console.log(err));

module.exports = app;