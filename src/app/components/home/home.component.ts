import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../recipe';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [RecipeService]
})
export class HomeComponent implements OnInit {
  recipe: Recipe;
  recipes: Recipe[] = [];
  
  constructor(private recipeService: RecipeService, private router: Router, private _flashMessagesService: FlashMessagesService) { }
  getRecipe(id) {
    this.recipeService.getRecipe('/recipe/' + id).subscribe(recipe => {
      this.recipe = recipe;
    });
  }
  // tslint:disable-next-line:no-trailing-whitespace
  

  getRecipes() {
    this.recipeService.getRecipes().subscribe(recipes => {
      this.recipe = recipes;
      console.log('data from recipeService: ' + this.recipe);
    });
  }
  ngOnInit() {
    this.recipeService.getRecipes()
      .subscribe(recipes =>
        this.recipes = recipes);

  }

}
