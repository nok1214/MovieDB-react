import { createContext, useState } from "react";

export const MovieContext = createContext();
export const MovieContextProvider = ({ children }) => {
  const [selectedMovieId, setSelectedMovieId] = useState();

  return (
    <MovieContext.Provider value={{ selectedMovieId, setSelectedMovieId }}>
      {children}
    </MovieContext.Provider>
  );
};
