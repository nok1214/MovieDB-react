import axios from "axios";

export const API_KEY = "4d23d4db7ad62fd6708c59ed6ffc2cfd";
export const BASE_URL = "https://api.themoviedb.org/3/";
export const getFullImgUrl = (imgUrl) => {
  return `https://image.tmdb.org/t/p/w500${imgUrl}`;
};

export const fetchMovieByOptions = (option, page) => {
  const url = `${BASE_URL}movie/${option}?api_key=${API_KEY}&page=${page}`;
  return axios.get(url);
};

export const fetchMovieDetails = (movieId) => {
  const url = `${BASE_URL}movie/${movieId}?api_key=${API_KEY}`;

  return axios.get(url);
};

export const fetchUserFavorite = (id, sessionId) => {
  const url = `${BASE_URL}account/${id}/favorite/movies?api_key=${API_KEY}&session_id=${sessionId}`;
  return axios.get(url);
};

export const fetchUserRated = (id, sessionId) => {
  const url = `${BASE_URL}account/${id}/rated/movies?api_key=${API_KEY}&session_id=${sessionId}`;
  return axios.get(url);
};

const favoriteConfig = {
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
};

export const addToFavorite = (userId, sessionId, movieId, isFavorite) => {
  const data = {
    media_type: "movie",
    media_id: movieId,
    favorite: isFavorite,
  };
  const url = `${BASE_URL}account/${userId}/favorite?api_key=${API_KEY}&session_id=${sessionId}`;
  return axios.post(url, data, favoriteConfig);
};

const ratingConfig = {
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
};

export const addToRated = (sessionId, movieId, ratings) => {
  const data = {
    value: ratings,
  };
  const url = `${BASE_URL}movie/${movieId}/rating?api_key=${API_KEY}&session_id=${sessionId}`;
  return axios.post(url, data, ratingConfig);
};
