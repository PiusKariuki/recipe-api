const {GraphQLObjectType} = require("graphql");
const {register, newPassword, recoverPassword} = require("../Controllers/authController")
const {createRecipe} = require("../Controllers/recipeController");

exports.rootMutation = new GraphQLObjectType({
    name: 'mutation',
    fields: {
        /**
         * Auth Mutations
         */
        register,
        newPassword,
        recoverPassword,
        /**
         * Recipe Mutations
         */
        createRecipe,
    }
})