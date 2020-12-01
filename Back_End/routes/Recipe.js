const express = require("express");
const router = express.Router();
var cors = require("cors");
const RecipeModel = require("../model/Recipe");
const recipeScraper = require("recipe-scraper");
var unirest = require("unirest");


router.get('/get', async (req, res) => {

 const URL = req.body.url;


 let recipe = await recipeScraper(URL).catch(error=> { 
     
    res.status(400).json({error: error.message})
    console.log(error.message)});

    const recipeExist = await  RecipeModel.findOne({ name: recipe.name });
  if (recipeExist) {
    return res.status(400).send("This recipe is already saved in the cookbook");
  }


  //const spliItems = recipe.ingredients.map(ingredient => parse(ingredient))
  //const items = spliItems.map(item => item.ingredient)


//   const items = NotFormateditems.map(item => item.replace('cups', '').replace("cup", '').replace('½', '').replace('warm', '')
//                                                         .replace('hot', '').replace('cold', '').replace('⅔', '').replace('⅓', '')
//                                                         .replace('teaspoons', '').replace('ripe', '').replace('fresh', '')
//                                                         .replace('¼', '').replace('package', '').replace('chopped','')
//                                                         .replace('¾ ', '').replace('large', '').trim())
 

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
 totalTime: recipe.time.total,
 
})
const savedRecipe = await newRecipe.save();

//console.log(data);
 try{
     res.status(200).json(savedRecipe);

 }
 catch(error){
    console.log(error.message);
 }

 var request = unirest("POST", "https://zestful.p.rapidapi.com/parseIngredients");

 request.type("json");

 request.headers({
 "content-type": "application/json",
 "x-rapidapi-key": "6f7dd3742amsh14daeae1d8b8b1cp1107f5jsnb6658ad46560",
 "x-rapidapi-host": "zestful.p.rapidapi.com",
 "useQueryString": true
});
request.send({
 "ingredients":recipe.ingredients
});

 request.end(function (response) {
 if (response.error) throw new Error(response.error);

  const items= response.body.results.map(item => item.ingredientParsed.product)
  RecipeModel.findById(savedRecipe._id, function (err, doc) {
    if (err) return res.status(400).send("Unable to update recipe with list of items");
    doc.Items = items;
    doc.save();
  });
 //console.log(items);
   });

  
})

module.exports = router;