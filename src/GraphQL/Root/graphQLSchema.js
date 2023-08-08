const {rootMutation} = require("./rootMutations");
const {rootQuery} = require("./rootQueries");
const {GraphQLSchema} = require("graphql");


exports.graphQLSchema = new GraphQLSchema({
    mutation: rootMutation,
    query: rootQuery
})