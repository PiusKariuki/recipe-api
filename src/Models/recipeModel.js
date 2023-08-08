const {Schema, model} = require("mongoose");


const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    cuisineId: {
        type:Schema.Types.ObjectId,
        ref: 'cuisine'
    },
    veganFriendly: Boolean,
    ingredients:[String],
    cookingInstructions: [String],
    prepTime: Number,
    servingSize: Number,
    tags: [String],
    banner: String
})


exports.recipeModel = model('recipe', schema)