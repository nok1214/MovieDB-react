import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import OptionSelector from "./OptionSelector";
import MovieLists from "./MovieLists";
import { OPTIONS } from "../constants";
import { fetchMovieByOptions, fetchUserFavorite } from "../apis/api";
import { MovieContextProvider } from "../context/MovieContext";
import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  font-size: 20px;
  justify-content: space-around;
`;

export default function Home({ user, isLogin }) {
  const [movieList, setMovieList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(999);
  const [options, setOptions] = useState(OPTIONS.NOW_PLAYING.value);
  const [likedMovies, setLikedMovies] = useState([]);

  useEffect(() => {
    fetchMovieByOptions(options, currentPage).then((response) => {
      setMovieList(response.data.results);
      setTotalPage(response.data.total_pages);
    });
  }, [options, currentPage]);

  useEffect(() => {
    if (user && isLogin) {
      fetchUserFavorite(user.id, user.session_id).then((response) => {
        setLikedMovies(response.data.results);
      });
    }
  }, [user, isLogin]);

  const handlePrevPage = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage === totalPage) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  return (
    <MovieContextProvider>
      <div>
        <PaginationContainer>
          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
          />
        </PaginationContainer>
        <div>
          <OptionSelector
            options={options}
            setOptions={setOptions}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <div>
          <MovieLists
            movies={movieList}
            user={user}
            likedMovies={likedMovies}
            isLogin={isLogin}
            setLikedMovies={setLikedMovies}
          />
        </div>
      </div>
    </MovieContextProvider>
  );
}
