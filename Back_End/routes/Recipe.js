const express = require("express");
const router = express.Router();
var cors = require("cors");
const RecipeModel = require("../model/Recipe");
const recipeScraper = require("recipe-scraper");

router.get('/get', async (req, res) => {

 const URL = req.body.url;


 let recipe = await recipeScraper(URL).catch(error=> { 
     
    res.status(400).json({error: error.message})
    console.log(error.message)});

    const recipeExist = await  RecipeModel.findOne({ name: recipe.name });
  if (recipeExist) {
    return res.status(400).send("This recipe is already saved in the cookbook");
  }

const newRecipe = new RecipeModel({
 name : recipe.name,
 ingredients: recipe.ingredients,
 instructions: recipe.instructions,
 servings: recipe.servings,
 image: recipe.image, 
 prepTime: recipe.time.prep,
 cookTime:recipe.time.cook,
 activeTime: recipe.time.active,
 inactiveTime:recipe.time.inactive,
 readyTime: recipe.time.ready,
 totalTime: recipe.time.total

})
const savedRecipe = await newRecipe.save();
 try{
     res.status(200).json(savedRecipe);

 }
 catch(error){
    console.log(error.message);
 }


})

module.exports = router;