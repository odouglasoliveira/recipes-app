import { createContext, useEffect, useMemo, useState } from 'react';
import customFetch from '../helpers/customFetch';

export const FiltersContext = createContext();
const MAX_FILTERS = 5;

export default function FiltersProvider({ children }) {
  const [filtersMeals, setFiltersMeals] = useState([]);
  const [filtersDrinks, setFiltersDrinks] = useState([]);

  const doFetch = async () => {
    const dataDrinks = await customFetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const valuesOfDataDrinks = Object.values(dataDrinks);
    const reduceDataDrinks = valuesOfDataDrinks[0].splice(0, MAX_FILTERS);
    setFiltersDrinks(reduceDataDrinks);

    const dataMeals = await customFetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const valuesOfDataMeals = Object.values(dataMeals);
    const reduceDataMeals = valuesOfDataMeals[0].splice(0, MAX_FILTERS);
    setFiltersMeals(reduceDataMeals);
  };

  const values = useMemo(() => ({
    filtersMeals, filtersDrinks,
  }), [filtersDrinks, filtersMeals]);

  useEffect(() => {
    doFetch();
  }, []);
  return (
    <FiltersContext.Provider value={ values }>
      {children}
    </FiltersContext.Provider>
  );
}
