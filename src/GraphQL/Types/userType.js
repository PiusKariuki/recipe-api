const {GraphQLObjectType, GraphQLString, GraphQLID} = require("graphql");


exports.userType = new GraphQLObjectType({
    name: 'user',
    fields: ()=>({
        id: {type: GraphQLID},
        fullName: {type: GraphQLString},
        userName: {type: GraphQLString},
        email: {type: GraphQLString},
        avatar: {type: GraphQLString},
        nationality: {type: GraphQLString},
        role: {type: GraphQLString},
        token: {type: GraphQLString},
    })
})