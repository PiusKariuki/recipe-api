const { recipeType} = require("../Types/recipeType");
const {GraphQLString, GraphQLNonNull, GraphQLID, GraphQLBoolean, GraphQLList, GraphQLInt} = require("graphql");
const {recipeModel} = require("../../Models/recipeModel");


exports.createRecipe = {
    type: recipeType,
    args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        cuisineId: {type: new GraphQLNonNull(GraphQLID)},
        veganFriendly: {type: new GraphQLNonNull(GraphQLBoolean)},
        ingredients: {type: new GraphQLNonNull(GraphQLList(GraphQLString))},
        cookingInstructions: {type: new GraphQLNonNull(GraphQLList(GraphQLString))},
        prepTime: {type: new GraphQLNonNull(GraphQLInt)},
        servingSize: {type: new GraphQLNonNull(GraphQLInt)},
        tags: {type: new GraphQLList(GraphQLString)},
        banner: {type: new GraphQLNonNull(GraphQLString)},
    },
    async resolve(parent, args) {
        try {
            const newDoc = new recipeModel({
                name: args.name,
                cuisineId: args.cuisineId,
                veganFriendly: args.veganFriendly,
                ingredients: args.ingredients,
                cookingInstructions: args.cookingInstructions,
                prepTime: args.prepTime,
                servingSize: args.servingSize,
                tags: args?.tags,
                banner: args.banner
            })

            const savedDoc = await newDoc.save()
            return savedDoc

        } catch (e) {
            return e
        }
    }
}