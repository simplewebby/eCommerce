import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../recipe';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
  providers: [ RecipeService ]
})
export class RecipeComponent implements OnInit {
  recipes: Recipe[] = [];
  recipe: Recipe;
  type: String;
  author: String;
  title:  String;
  ingredients:  String;
  image_url: String;
  _id;
  selectedRecipe: Recipe;
  toggleForm = false;
  price: String;

  constructor(private recipeService: RecipeService, private router: Router, private _flashMessagesService: FlashMessagesService ) {}
  getRecipe(id) {
    this.recipeService.getRecipe('/recipe/' + id).subscribe(recipe => {
      this.recipe = recipe;
    });
  }
  selectRecipe(id) {
    this.recipeService.getRecipe('/recipe/' + id).subscribe(recipe => {
      this.recipe = recipe;
    });
  }

  getRecipes() {
    this.recipeService.getRecipes().subscribe(recipes => {
      this.recipe = recipes;
      console.log('data from recipeService: ' + this.recipe);
    });
  }
  addRecipe() {
    const newRecipe = {
      title: this.title,
      type: this.type,
      author: this.author,
      ingredients: this.ingredients,
      image_url: this.image_url,
      price: this.price
     }
    this.recipeService.addRecipe(newRecipe).subscribe(recipe => {
      this.recipes.unshift(recipe);
      this._flashMessagesService.show('Recipe added!', { cssClass: 'alert-success' });
      this.recipeService
        .getRecipes()
        .subscribe(recipes => (this.recipes = recipes));
    });
  }

  deleteRecipe(id: any) {
    var recipes = this.recipes;
    this.recipeService.deleteRecipe(id)
    .subscribe(data => {
      // tslint:disable-next-line:whitespace
      if( data.n== 1){
        for(var i=0; i< recipes.length; i++){
            if(recipes[i]._id ==id){
              recipes.splice(i,1);
            }

        }
      }
    });
    this._flashMessagesService.show('Recipe deleted!!!', { cssClass: 'alert-danger' });
  }


  editRecipe(form) {
    let newRecipe = {
      _id: this.selectedRecipe._id,
      type: form.value.type,
      author: form.value.author,
      title: form.value.title,
      ingredients: form.value.ingredients,
      image_url: form.value.image_url,
      created_date: form.value.created_date,
      price: form.value.price
    };
    this.recipeService.updateRecipe(newRecipe)
    .subscribe(result => {
      console.log('Original item to be updated with old values: '+ result);
      this.getRecipes();
      this._flashMessagesService.show('Recipe updated!', { cssClass: 'alert-success' });

    });
    this.toggleForm = !this.toggleForm;
    }


  showEditForm(recipe) {
    this.selectedRecipe = recipe;
   this.toggleForm = !this.toggleForm;
  }
  ngOnInit() {
    this.recipeService.getRecipes()
      .subscribe(recipes =>
      this.recipes = recipes);
  }
}
