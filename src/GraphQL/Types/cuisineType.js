const {GraphQLID, GraphQLString, GraphQLObjectType} = require("graphql");


exports.cuisineType = new GraphQLObjectType({
    name: 'cuisine',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString}
    })
})