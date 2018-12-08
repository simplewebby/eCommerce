const mongoose = require('mongoose');


// Recipe Schema
const RecipeSchema = new mongoose.Schema({
  
  title:  String,
  author: String,
  type: String,
  ingredients:  String,
  image_url: String, 
  created_date: {
    type: Date,
    default: Date.now
  },
  price: String
});


module.exports = mongoose.model('Recipe', RecipeSchema);


