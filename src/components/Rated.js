import React, { useState, useEffect } from "react";
import { fetchUserRated, fetchUserFavorite } from "../apis/api";
import MovieLists from "./MovieLists";

export default function Rated({ user, isLogin }) {
  const [userRatedMovies, setUserRatedMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);

  useEffect(() => {
    if (user && isLogin) {
      fetchUserRated(user.id, user.session_id).then((response) => {
        setUserRatedMovies(response.data.results);
      });

      fetchUserFavorite(user.id, user.session_id).then((response) => {
        setLikedMovies(response.data.results);
      });
    }
  }, [user, isLogin]);

  const handleSetLikedMovies = (newLikedMovies) => {
    setLikedMovies(newLikedMovies);
  };

  const movies = userRatedMovies.map((movie) => {
    const isLiked = likedMovies.some(
      (likedMovie) => likedMovie.id === movie.id,
    );

    return { ...movie, isLiked };
  });

  return (
    <MovieLists
      movies={movies}
      user={user}
      likedMovies={likedMovies}
      isLogin={isLogin}
      setLikedMovies={handleSetLikedMovies}
    />
  );
}
