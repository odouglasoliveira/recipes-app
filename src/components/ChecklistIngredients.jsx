const MAX_INGREDIENTS = 20;

export default function ChecklistIngredients({ recipe }) {
  const listOfIngredients = [];
  for (let i = 1; i <= MAX_INGREDIENTS; i += 1) {
    listOfIngredients.push(recipe[`strIngredient${i}`]);
  }

  return (
    listOfIngredients
      .filter((ingredient) => ingredient)
      .map((ingredient, ind) => (
        <li key={ ind }>
          <label data-testid={ `${ind}-ingredient-step` }>
            {ingredient}
            <input type="checkbox" />
          </label>
        </li>
      ))
  );
}
