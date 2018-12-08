import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Recipe } from '../recipe';
import 'rxjs/add/operator/map';
@Injectable()
export class RecipeService {
newRecipe;
  constructor(private http:Http) { }
    // get Recipes

    getRecipes(){
      return this.http.get('http://localhost:3000/api/recipes')
      .map(res => res.json());
    }

    // get one recipe
    getRecipe(id){
      return this.http.get('http://localhost:3000/api/recipe' + id)
      .map(res => res.json());
    }
  // get  recipe by type
  selectRecipe(id) {
    return this.http.get('http://localhost:3000/api/recipe' + id)
      .map(res => res.json());
  }


    // UPDATE recipe
  updateRecipe(newRecipe) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/api/recipe/'+ newRecipe._id, newRecipe, {headers:headers})
        .map(res => res.json());
    }





    // add recipe method
    addRecipe(newRecipe){
      var headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:3000/api/recipe', newRecipe, {headers:headers})
      .map(res=>res.json());
    }

    // delete recipe
    deleteRecipe(id){
      return this.http.delete('http://localhost:3000/api/recipe/' + id)
      .map(res=>res.json());
    }
}
