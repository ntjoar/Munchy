const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema({

    name:String,
    ingredients: [String],
    instructions: [String],
    tags: [String],
    servings: String,
    image: String,
    prepTime: String,
    cookTime: String,
    activeTime: String,
    inactiveTime: String,
    readyTime: String,
    totalTime: String,
    Items: [String],
    user: String, //{ type:  mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdDate: {type:Date,
    default:Date.now}
})

module.exports=mongoose.model('Recipe', recipeSchema)
