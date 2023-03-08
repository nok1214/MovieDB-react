import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getFullImgUrl, addToFavorite } from "../apis/api";
import styled from "styled-components";

const MovieCardsContainer = styled.div`
  box-shadow: 0 2px 8px 2px rgb(1, 180, 228);
`;

const TitleContainer = styled.div`
  text-align: center;
  padding: 10px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  font-size: 20px;

  .fa-star {
    color: yellow;
  }

  .fa-heart {
    color: ${({ isLiked }) => (isLiked ? "red" : "#fff")};
    cursor: ${({ isLogin }) => (isLogin ? "pointer" : "default")};
  }
`;

export default function MovieCards({
  movie,
  user,
  isLogin,
  likedMovies,
  setLikedMovies,
}) {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (
      likedMovies &&
      likedMovies.length > 0 &&
      likedMovies.some((likedMovie) => likedMovie.id === movie.id)
    ) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [likedMovies, movie.id]);

  const handleToggleLike = () => {
    if (!isLogin) {
      alert("Please login to favorite this movie");
      return;
    }
    const newLikedMovie = !isLiked;
    setIsLiked(newLikedMovie);

    addToFavorite(user.id, user.session_id, movie.id, newLikedMovie).then(
      () => {
        if (newLikedMovie) {
          setLikedMovies((prevState) => [...prevState, movie]);
        } else {
          setLikedMovies((prevState) =>
            prevState.filter((likedMovie) => likedMovie.id !== movie.id),
          );
        }
      },
    );
  };

  return (
    <MovieCardsContainer>
      <div>
        <img
          src={getFullImgUrl(movie.poster_path)}
          alt={movie.title}
          width='100%'
        />
      </div>
      <TitleContainer>
        <Link to={`/movies/${movie.id}`}>
          <h2>{movie.title}</h2>
        </Link>
      </TitleContainer>
      <IconContainer isLiked={isLiked} isLogin={isLogin}>
        <i className='fa-solid fa-star'> {movie.vote_average}</i>
        <i
          className={isLiked ? "fa-solid fa-heart" : "fa-regular fa-heart"}
          onClick={handleToggleLike}
        />
      </IconContainer>
    </MovieCardsContainer>
  );
}
