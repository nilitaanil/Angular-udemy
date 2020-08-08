import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {

  @Output() recipeWasSelected = new EventEmitter<Recipe>(); // we can listen to this event form outside
  recipes: Recipe[] = [
    new Recipe('Test Recipe', 'This is a test recipe.', 
    'https://assets.bonappetit.com/photos/5d7296eec4af4d0008ad1263/3:2/w_2560,c_limit/Basically-Gojuchang-Chicken-Recipe-Wide.jpg'),
    new Recipe('Another Test Recipe', 'This is a test recipe.', 
    'https://assets.bonappetit.com/photos/5d7296eec4af4d0008ad1263/3:2/w_2560,c_limit/Basically-Gojuchang-Chicken-Recipe-Wide.jpg')


  ];
  constructor() { }

  ngOnInit(): void {
  }
  
  onRecipeSelected(recipe:Recipe)
  {
    this.recipeWasSelected.emit(recipe);

  }

}
