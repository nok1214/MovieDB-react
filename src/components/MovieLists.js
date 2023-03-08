import React from "react";
import styled from "styled-components";
import MovieCards from "./MovieCards";

const MovieListsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 35px;
  padding: 25px 15px;
`;

export default function MovieLists({
  movies,
  user,
  isLogin,
  likedMovies,
  setLikedMovies,
  setSelectedMovieId,
}) {
  return (
    <MovieListsContainer>
      {movies.map((movie) => {
        return (
          <MovieCards
            key={movie.id}
            movie={movie}
            user={user}
            isLogin={isLogin}
            likedMovies={likedMovies}
            setLikedMovies={setLikedMovies}
            setSelectedMovieId={setSelectedMovieId}
          />
        );
      })}
    </MovieListsContainer>
  );
}
