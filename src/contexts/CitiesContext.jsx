import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

const BASE_URL = 'http://localhost:9000';

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        isLoading: true,
      };
    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case 'city/loaded':
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity:
          state.currentCity.id === action.payload ? {} : state.currentCity,
      };
    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error('Unknown action');
  }
}

function CitiesProvider({ children }) {
  const [{
    cities, isLoading, currentCity, error,
  }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: 'loading' });

      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();

        dispatch({ type: 'cities/loaded', payload: data });
      } catch {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading data',
        });
      }
    };

    fetchCities();
  }, []);

  const getCity = useCallback(
    async (id) => {
      if (Number(id) === Number(currentCity.id)) return;

      dispatch({ type: 'loading' });

      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();

        dispatch({ type: 'city/loaded', payload: data });
      } catch {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading data',
        });
      }
    },
    [currentCity.id],
  );

  const createCity = async (newCity) => {
    dispatch({ type: 'loading' });

    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();

      if (res.ok) {
        dispatch({ type: 'city/created', payload: data });
      }
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error sending data',
      });
    }
  };

  const deleteCity = async (id) => {
    dispatch({ type: 'loading' });

    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        dispatch({ type: 'city/deleted', payload: id });
      }
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error deleting the data',
      });
    }
  };

  const citiesData = useMemo(
    () => ({
      cities,
      isLoading,
      currentCity,
      error,
    }),
    [cities, isLoading, currentCity, error],
  );

  return (
    <CitiesContext.Provider
      value={{
        ...citiesData,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined) {
    throw new Error('Cities context was used outside the cities provider');
  }

  return context;
}

export { CitiesProvider, useCities };
