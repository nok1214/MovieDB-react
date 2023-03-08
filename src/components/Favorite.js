import React, { useState, useEffect } from "react";
import { fetchUserFavorite } from "../apis/api";
import MovieLists from "./MovieLists";

export default function Favorite({ user, isLogin }) {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    fetchUserFavorite(user.id, user.session_id).then((response) => {
      setFavoriteMovies(response.data.results);
    });
  }, [user.id, user.session_id]);

  const handleSetLikedMovies = (newLikedMovies) => {
    setFavoriteMovies(newLikedMovies);
  };

  if (!user.id || !user.session_id) {
    return <div>Loading...</div>;
  }
  return (
    <MovieLists
      movies={favoriteMovies}
      isLogin={isLogin}
      likedMovies={favoriteMovies}
      user={user}
      setLikedMovies={handleSetLikedMovies}
    />
  );
}
