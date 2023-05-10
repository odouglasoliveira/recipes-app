import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';

import App from '../App';

describe('Página de detalhes do produto', () => {
  it('Ao acessar o produto de id "52771", verifica se todos os dados estão na tela', async () => {
    const initialEntries = ['/meals/52771'];
    renderWithRouter(<App />, { initialEntries });

    const instructions = 'Bring a large pot of water to a boil. Add kosher salt to the boiling water, then add the pasta. Cook according to the package instructions, about 9 minutes. In a large skillet over medium-high heat, add the olive oil and heat until the oil starts to shimmer. Add the garlic and cook, stirring, until fragrant, 1 to 2 minutes. Add the chopped tomatoes, red chile flakes, Italian seasoning and salt and pepper to taste. Bring to a boil and cook for 5 minutes. Remove from the heat and add the chopped basil. Drain the pasta and add it to the sauce. Garnish with Parmigiano-Reggiano flakes and more basil and serve warm.';

    const recipeName = screen.getByTestId('recipe-title');
    const recipeCategory = screen.getByTestId('recipe-category');
    const recipeIngredient0 = await screen.findByTestId('0-ingredient-name-and-measure');
    const recipeIngredient7 = await screen.findByTestId('7-ingredient-name-and-measure');
    const recipeInstructions = screen.getByTestId('instructions');
    const recipeVideo = screen.getByTestId('video');
    const recipeRecomendation0 = await screen.findByTestId('0-recommendation-card');
    const recipeRecomendation5 = await screen.findByTestId('5-recommendation-card');

    expect(recipeName).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(recipeIngredient0).toBeInTheDocument();
    expect(recipeIngredient7).toBeInTheDocument();
    expect(recipeInstructions).toBeInTheDocument();
    expect(recipeVideo).toBeInTheDocument();
    expect(recipeRecomendation0).toBeInTheDocument();
    expect(recipeRecomendation5).toBeInTheDocument();

    expect(recipeName).toHaveTextContent('Spicy Arrabiata Penne');
    expect(recipeCategory).toHaveTextContent('Vegetarian');
    expect(recipeIngredient0).toHaveTextContent('penne rigate 1 pound');
    expect(recipeIngredient7).toHaveTextContent('Parmigiano-Reggiano spinkling');
    expect(recipeInstructions).toHaveTextContent(instructions);
    expect(recipeVideo).toHaveAttribute('src', 'https://www.youtube.com/embed/1IszT_guI08');
  });

  it('Ao acessar o produto de id "17256", verifica se todos os dados estão na tela', async () => {
    const initialEntries = ['/drinks/17256'];
    renderWithRouter(<App />, { initialEntries });

    const instructions = 'Add all ingredients to a mixing glass and fill with ice. Stir until chilled, and strain into a chilled coupe glass.';

    const recipeName = screen.getByTestId('recipe-title');
    const recipeCategory = screen.getByTestId('recipe-category');
    const recipeIngredient0 = await screen.findByTestId('0-ingredient-name-and-measure');
    const recipeIngredient3 = await screen.findByTestId('3-ingredient-name-and-measure');
    const recipeInstructions = screen.getByTestId('instructions');
    const recipeRecomendation0 = await screen.findByTestId('0-recommendation-card');
    const recipeRecomendation5 = await screen.findByTestId('5-recommendation-card');

    expect(recipeName).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(recipeIngredient0).toBeInTheDocument();
    expect(recipeIngredient3).toBeInTheDocument();
    expect(recipeInstructions).toBeInTheDocument();
    expect(recipeRecomendation0).toBeInTheDocument();
    expect(recipeRecomendation5).toBeInTheDocument();

    expect(recipeName).toHaveTextContent('Martinez 2');
    expect(recipeCategory).toHaveTextContent('Alcoholic');
    expect(recipeIngredient0).toHaveTextContent('Gin 1 1/2 oz');
    expect(recipeIngredient3).toHaveTextContent('Angostura Bitters 2 dashes');
    expect(recipeInstructions).toHaveTextContent(instructions);
  });
});
