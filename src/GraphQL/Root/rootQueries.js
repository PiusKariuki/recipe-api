const {GraphQLObjectType} = require("graphql");
const {login} = require("../Queries/authQueries");
const {getAllRecipes, getRecipeById, searchRecipes, getRecipesByCuisineId} = require("../Queries/recipeQueries");


exports.rootQuery = new GraphQLObjectType({
    name: 'rootQuery',
    fields: {
        /**
         * Auth Queries
         */
        login,

        /**
         * Recipe Queries
         */
        getAllRecipes,
        getRecipeById,
        searchRecipes,
        getRecipesByCuisineId
    }
})