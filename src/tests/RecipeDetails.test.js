import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import fetchMock from '../../cypress/mocks/fetch';

const setLocalStorage = (id, data) => {
  window.localStorage.setItem(id, JSON.stringify(data));
};

const inProgressRecipesMock = {
  meals: {
    id: 52771,
    type: 'meal',
    nationality: '',
    category: '',
    alcoholicOrNot: '',
    name: '',
    image: '',
    doneDate: '',
    tags: [],
  },
  drinks: {
    id: 15997,
    type: 'drink',
    nationality: '',
    category: '',
    alcoholicOrNot: '',
    name: '',
    image: '',
    doneDate: '',
    tags: [],
  },
};

const favoriteRecipesMock = [{
  id: '52771',
  type: 'meal',
  nationality: 'Italian',
  category: 'Vegetarian',
  alcoholicOrNot: '',
  name: 'Spicy Arrabiata Penne',
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
},
{
  id: '15997',
  type: 'drink',
  nationality: '',
  category: 'Ordinary Drink',
  alcoholicOrNot: 'Optional alcohol',
  name: 'GG',
  image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
}];

const doneRecipesMock = [
  {
    id: 52771,
    type: 'meal',
    nationality: '',
    category: '',
    alcoholicOrNot: '',
    name: '',
    image: '',
    doneDate: '',
    tags: [],
  },
  {
    id: 15997,
    type: 'drink',
    nationality: '',
    category: '',
    alcoholicOrNot: '',
    name: '',
    image: '',
    doneDate: '',
    tags: [],
  },
];

describe('Página de detalhes do do produto /meals', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
    setLocalStorage('inProgressRecipes', inProgressRecipesMock);
    setLocalStorage('doneRecipes', doneRecipesMock);
    setLocalStorage('favoriteRecipes', favoriteRecipesMock);
    act(() => {
      renderWithRouter(<App />, { initialEntries: ['/meals/52771'] });
    });
  });

  it('Ao acessar o produto de id "52771", verifica se todos os dados estão na tela', async () => {
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

    const copyBtn = screen.getByRole('img', { name: /share button/i });
    expect(copyBtn).toBeInTheDocument();
    act(() => {
      userEvent.click(copyBtn);
    });

    const favoriteButton = screen.getByTestId('favorite-btn');
    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton).toHaveAttribute('src', 'blackHeartIcon.svg');
    act(() => {
      userEvent.click(favoriteButton);
    });
    expect(favoriteButton).toHaveAttribute('src', 'whiteHeartIcon.svg');
  });
});

describe('Página de detalhes do produto /drinks', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
    setLocalStorage('inProgressRecipes', inProgressRecipesMock);
    setLocalStorage('doneRecipes', doneRecipesMock);
    setLocalStorage('favoriteRecipes', favoriteRecipesMock);
    act(() => {
      renderWithRouter(<App />, { initialEntries: ['/drinks/15997'] });
    });
  });

  it('Ao acessar o produto de id "15997", verifica se todos os dados estão na tela', async () => {
    const instructions = 'Pour the Galliano liqueur over ice. Fill the remainder of the glass with ginger ale and thats all there is to it. You now have a your very own GG.';
    const recipeName = screen.getByTestId('recipe-title');
    const recipeCategory = screen.getByTestId('recipe-category');
    const recipeIngredient0 = await screen.findByTestId('0-ingredient-name-and-measure');
    const recipeIngredient1 = await screen.findByTestId('1-ingredient-name-and-measure');
    const recipeInstructions = screen.getByTestId('instructions');
    const recipeRecomendation0 = await screen.findByTestId('0-recommendation-card');
    const recipeRecomendation5 = await screen.findByTestId('5-recommendation-card');

    expect(recipeName).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(recipeIngredient0).toBeInTheDocument();
    expect(recipeIngredient1).toBeInTheDocument();
    expect(recipeInstructions).toBeInTheDocument();
    expect(recipeRecomendation0).toBeInTheDocument();
    expect(recipeRecomendation5).toBeInTheDocument();

    expect(recipeName).toHaveTextContent('GG');
    expect(recipeCategory).toHaveTextContent('Optional alcohol');
    expect(recipeIngredient0).toHaveTextContent('Galliano 2 1/2 shots');
    expect(recipeIngredient1).toHaveTextContent('Ginger ale null');
    expect(recipeInstructions).toHaveTextContent(instructions);

    const favoriteBtn = screen.getByRole('img', { name: /favorite button/i });
    expect(favoriteBtn).toHaveAttribute('src', 'whiteHeartIcon.svg');
    act(() => {
      userEvent.click(favoriteBtn);
    });
    expect(favoriteBtn).toHaveAttribute('src', 'blackHeartIcon.svg');
  });
});

describe('Testa se o botão "start recipe" redireciona o usuário', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
  });

  it('Testa na tela de meals', () => {
    renderWithRouter(<App />, { initialEntries: ['/meals/52977'] });
    const startBtn = screen.getByRole('button', { name: /start recipe/i });
    expect(startBtn).toBeInTheDocument();
    userEvent.click(startBtn);
  });

  it('Testa na tela de drinks', () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks/178319'] });
    const startBtn = screen.getByRole('button', { name: /start recipe/i });
    expect(startBtn).toBeInTheDocument();
    userEvent.click(startBtn);
  });
});
