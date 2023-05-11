// import App from '../App';
// import { renderWithRouter } from './helpers/renderWith';

// const doneRecipes = [{
//   id: 'id-da-receita',
//   type: 'meal-ou-drink',
//   nationality: 'nacionalidade-da-receita-ou-texto-vazio',
//   category: 'categoria-da-receita-ou-texto-vazio',
//   alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
//   name: 'nome-da-receita',
//   image: 'imagem-da-receita',
//   doneDate: 'quando-a-receita-foi-concluida',
//   tags: 'array-de-tags-da-receita-ou-array-vazio',
// }];

// const localStorageMock = (() => {
//   let store = {};

//   return {
//     getItem(key) {
//       return (store[key]);
//     },

//     setItem(key, value) {
//       store[key] = value;
//     },

//     clear() {
//       store = {};
//     },

//     removeItem(key) {
//       delete store[key];
//     },

//     getAll() {
//       return store;
//     },
//   };
// })();

// Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// const setLocalStorage = (id, data) => {
//   window.localStorage.setItem(id, JSON.stringify(data));
// };

// describe('Renderize a página <DoneRecipes> e ...', () => {
//   beforeEach(() => {
//     renderWithRouter(<App />, { initialEntries: ['/done-recipes'] });
// window.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
// setLocalStorage('doneRecipes', doneRecipes);
// });

// afterEach(() => {
// window.localStorage.clear();
//   });
// });
