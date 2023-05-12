import { useState } from 'react';

const MAX_INGREDIENTS = 20;

export default function ChecklistIngredients({ recipe }) {
  const [checkedIng, setCheckedIng] = useState({});

  const listOfIngredients = [];
  for (let i = 1; i <= MAX_INGREDIENTS; i += 1) {
    listOfIngredients.push(recipe[`strIngredient${i}`]);
  }

  const handleChange = ({ target }) => {
    setCheckedIng((prevState) => ({ ...prevState, [target.name]: target.checked }));
  };

  return (
    listOfIngredients
      .filter((ingredient) => ingredient)
      .map((ingredient, ind) => (
        <li key={ ind }>
          <label
            className={ checkedIng[ingredient] ? 'ingredientDone' : '' }
            data-testid={ `${ind}-ingredient-step` }
          >
            {ingredient}
            <input
              name={ ingredient }
              onChange={ handleChange }
              type="checkbox"
            />
          </label>
        </li>
      ))
  );
}
