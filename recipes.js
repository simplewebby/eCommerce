const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Recipe = require('../models/recipe.js');

/* GET ALL RECIPES */
router.get('/recipes', (req, res, next) =>{
  Recipe.find(function (err, recipes) {
    if (err) return next(err);
    res.json(recipes);
  });
});

/* GET SINGLE recipe BY ID */
router.get('/recipe/:_id', function (req, res, next) {
  Recipe.findById(req.params._id, function (err, recipe) {
    if (err) return next(err);
    res.json(recipe);
  });
});

/* GET SINGLE recipe BY type */
router.get('/recipe/:type', function (req, res, next) {
  Recipe.find(req.params.type, function (err, recipe) {
    if (err) return next(err);
    res.json(recipe);
  });
});






/* SAVE recipe */
router.post('/recipe', function (req, res, next) {
  let newRecipe = new Recipe({
    title: req.body.title,
    type: req.body.type,
    author: req.body.author,
    ingredients: req.body.ingredients,
    image_url: req.body.image_url,
    created_date: req.body.created_date,
    price: req.body.price
  });
  newRecipe.save((err, recipe)=>{
    if(err){
      res.json(err);
    }
    else{
      res.json(recipe);
    }
  })
});
/* UPDATE recipe */
router.put('/recipe/:id',(req, res, next) => {
  Recipe.findByIdAndUpdate({_id:req.params.id},{
    $set:{
      title: req.body.title,
      type: req.body.type,
      author: req.body.author,
      ingredients: req.body.ingredients,
      image_url: req.body.image_url,
      created_date: req.body.created_date,
      price: req.body.price
    }
  },
    function (err, recipe) {
      if (err) return next(err);
      res.json(recipe);
    });
  });
/* Add RECIPE */
router.post('/recipe',(req, res, next)=> {
({
  title:  req.body.title,
  type: req.body.type,
  author: req.body.author,
  ingredients: req.body.ingredients,
  image_url: req.body.image_url, 
  created_date: req.body.created_date,
  price: req.body.price
  });
  newRecipe.save((err,recipe)=>{
    if (err){
      res.json({msg: 'Failed to add recipe'});
    }
    else {
      res.json({msg: 'Recipe added successfully'});
    }
  })
});

/* DELETE Recipe */
router.delete('/recipe/:id', (req, res, next) =>{
  Recipe.deleteOne({ _id: req.params.id }, function(err, result) {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;