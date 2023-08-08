const {GraphQLInputObjectType, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLInt, GraphQLID, GraphQLObjectType} = require("graphql");
const {cuisineType} = require("./cuisineType");
const {cuisineModel} = require("../../Models/cuisineModel");


exports.recipeInputType = new GraphQLInputObjectType({
    name: 'recipeInput',
    fields: () => ({
        name: {type: GraphQLString},
        cuisine: {type: GraphQLID},
        veganFriendly: {type: GraphQLBoolean},
        ingredients: {
            type: new GraphQLList(GraphQLString)
        },
        cookingInstructions: {
            type: new GraphQLList(GraphQLString)
        },
        prepTime: {
            type: GraphQLInt
        },
        servingSize:{
            type: GraphQLInt
        },
        tags: {
            type: new GraphQLList(GraphQLString)
        },
        banner: {
            type: GraphQLString
        }
    })
})


exports.recipeType = new GraphQLObjectType({
    name: 'recipe',
    fields: () => ({
        name: {type: GraphQLString},
        cuisine: {
            type: cuisineType,
            resolve(parent, args){
                return cuisineModel.findById(parent.cuisineId)
            }
        },
        veganFriendly: {type: GraphQLBoolean},
        ingredients: {
            type: new GraphQLList(GraphQLString)
        },
        cookingInstructions: {
            type: new GraphQLList(GraphQLString)
        },
        prepTime: {
            type: GraphQLInt
        },
        servingSize:{
            type: GraphQLInt
        },
        tags: {
            type: new GraphQLList(GraphQLString)
        },
        banner: {
            type: GraphQLString
        }
    })
})