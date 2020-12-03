const express = require("express");
const router = express.Router();
var cors = require("cors");
const RecipeModel = require("../model/Recipe");
const recipeScraper = require("recipe-scraper");
var unirest = require("unirest");

router.post("/get", async (req, res) => {
  const URL = req.body.url;
  const userID = req.body.userId;

  let recipe = await recipeScraper(URL).catch((error) => {
    res.status(400).json({ error: error.message });
    console.log(error.message);
  });

  const recipeExist = await RecipeModel.findOne({
    name: recipe.name,
    user: userID,
  });
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
    name: recipe.name,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    servings: recipe.servings,
    image: recipe.image,
    prepTime: recipe.time.prep,
    cookTime: recipe.time.cook,
    activeTime: recipe.time.active,
    inactiveTime: recipe.time.inactive,
    readyTime: recipe.time.ready,
    totalTime: recipe.time.total,
    user: userID,
  });
  const savedRecipe = await newRecipe.save();

  //console.log(data);
  //  try{
  //      res.status(200).json(savedRecipe);

  //  }
  //  catch(error){
  //     console.log(error.message);
  //  }

  var request = unirest("POST", process.env.RAPID_URL);

  request.type("json");

  request.headers({
    "content-type": "application/json",

    "x-rapidapi-key": process.env.RAPID_KEY,
    "x-rapidapi-host": process.env.RAPID_HOST,
    useQueryString: true,
  });
  request.send({
    ingredients: recipe.ingredients,
  });

  request.end(function (response) {
    if (response.error) throw new Error(response.error);

    const items = response.body.results.map(
      (item) => item.ingredientParsed.product
    );
    RecipeModel.findById(savedRecipe._id, function (err, doc) {
      if (err)
        return res
          .status(400)
          .send("Unable to update recipe with list of items");
      doc.Items = items;
      doc.save();
      try {
        res.status(200).json(doc);
      } catch (error) {
        console.log(error.message);
      }
    });
    //console.log(items);
  });
});

router.post("/recipes", async (req, res) => {
  const userID = req.body.userId;
  console.log(userID);
  const recipes = await RecipeModel.find({ user: userID }).exec();
  if (recipes.length == 0)
    return res
      .status(400)
      .send("No recipe found. Please consider adding recipes");

  try {
    res.status(200).json(recipes);
  } catch (error) {
    console.log(error.message);
  }
});
module.exports = router;
