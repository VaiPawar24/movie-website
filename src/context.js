import React, { createContext, useEffect, useContext, useState } from "react";

export const API_URL = `http://www.omdbapi.com/?apikey=727bbdc1`;
// ${process.env.REACT_APP_API_KEY}

const AppContext = createContext();

// We need to Create a Provider Function
const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [isError, setIsError] = useState({ show: "false", msg: "" });
  const [query, setQuery] = useState("Jurassic");

  const getMovies = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (data.Response === "True") {
        setIsLoading(false);
        setIsError({
          show: false,
          msg: ""
        });
        setMovie(data.Search);
      } else {
        setIsError({
          show: true,
          msg: data.Error
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // DEBOUNCING - setTimeout / clearTimeout
  useEffect(() => {
    let timer = setTimeout(() => {
      getMovies(`${API_URL}&s=${query}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <AppContext.Provider value={{ isError, isLoading, movie, query, setQuery }}>
      {children}
    </AppContext.Provider>
  );
};

// Global Custom Hooks
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
