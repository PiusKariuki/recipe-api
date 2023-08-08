const {shield} = require("graphql-shield");
const {isAuthorized} = require("./rules");


exports.permissions = shield({
    mutation: {
        createRecipe: isAuthorized
    },

})