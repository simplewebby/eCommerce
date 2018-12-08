import { RecipesPipe } from './recipes.pipe';

describe('RecipesPipe', () => {
  it('create an instance', () => {
    const pipe = new RecipesPipe();
    expect(pipe).toBeTruthy();
  });
});
