const {GraphQLList, GraphQLID, GraphQLString} = require("graphql");
const {recipeType} = require("../Types/recipeType");
const {recipeModel} = require("../../Models/recipeModel");


exports.getAllRecipes = {
    type: new GraphQLList(recipeType),
    resolve() {
        try {
            return recipeModel.find({})
        } catch (e) {
            return e
        }
    }
}

exports.getRecipeById = {
    type: recipeType,
    args: {id: {type: GraphQLID}},
    resolve(parent, args) {
        try {
            return recipeModel.findById(args.id)
        } catch (e) {
            return e
        }
    }
}


exports.searchRecipes = {
    type: new GraphQLList(recipeType),
    args: {key: {type: GraphQLString}},
    resolve(parent, args) {
        try {
            const regex = new RegExp(args.key, 'i')
            return recipeModel.findById({"name": {$regex: regex}})
        } catch (e) {
            return e
        }
    }
}

exports.getRecipesByCuisineId = {
    type: new GraphQLList(recipeType),
    args: {cuisineId: {type: GraphQLID}},
    resolve(parent, args){
        try{
            return recipeModel.findById({cuisineId: args.cuisineId})
        }catch (e) {
            return e
        }
    }
}