import { useEffect, useState } from 'react';
import Header from '../components/Header';
import DoneRecipeCard from '../components/DoneRecipeCard';
import FilterButtonsDoneRecipes from '../components/FilterButtonsDoneRecipes';
import favIconSvgBlack from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const [dataRecipes, setDataRecipes] = useState([]);
  const [filterBy, setFilterBy] = useState('');

  const handleClickUnfav = (recipe) => {
    const fromLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const { id } = recipe;
    const verifyIndex = fromLS.findIndex((recip) => id === recip.id);
    fromLS.splice(verifyIndex, 1);
    localStorage.setItem('favoriteRecipes', JSON.stringify(fromLS));
    setDataRecipes((prevState) => {
      const newDataRecipe = prevState.filter((recip) => recip.id !== id);
      return [...newDataRecipe];
    });
  };

  useEffect(() => {
    const fromLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!fromLS) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
      return;
    }
    setDataRecipes(fromLS);
  }, []);

  return (
    <>
      <Header pageTitle="Favorite Recipes" />
      <div>
        <FilterButtonsDoneRecipes setFilterBy={ setFilterBy } />
      </div>
      <ul>
        {
          dataRecipes
            .filter(({ type }) => type.includes(filterBy))
            .map((recipe, ind) => (
              <section key={ ind }>
                <DoneRecipeCard
                  key={ ind }
                  recipe={ recipe }
                  index={ ind }
                />
                <button
                  onClick={ () => handleClickUnfav(recipe) }
                  src={ favIconSvgBlack }
                  data-testid={ `${ind}-horizontal-favorite-btn` }
                >
                  <img src={ favIconSvgBlack } alt="" />
                </button>
              </section>
            ))
        }
      </ul>
    </>

  );
}
