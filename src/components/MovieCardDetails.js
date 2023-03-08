import React, { useState, useEffect } from "react";

import {
  fetchMovieDetails,
  getFullImgUrl,
  addToRated,
  fetchUserRated,
} from "../apis/api";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { RATINGS } from "../constants";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const MovieCardDetailsContainer = styled.div`
  display: flex;
  padding: 40px;
  align-items: center;
  justify-content: center;
  margin-left: 128px;
  margin-right: 128px;
`;

const DetailsContainer = styled.div`
  display: flex;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  img {
    box-shadow: 0 2px 8px 2px rgb(1, 180, 228);
  }
`;

const MovieDetailsContainer = styled.div`
  margin-left: 35px;
  color: white;
  .fa-star {
    color: yellow;
  }
`;

const MovieTitle = styled.h1`
  font-size: 45px;
`;

const OtherTitiles = styled.h3`
  font-size: 25px;
`;

const Descriptions = styled.p`
  font-size: 15px;
`;

const ReleaseDateContainer = styled.div`
  margin-top: 8px;
  margin-bottom: 8px;
`;

const OverviewContainer = styled.div`
  padding: 8px 0;
`;

const GenresContainer = styled.div`
  padding: 8px 0;
`;

const GenreTitles = styled.div`
  display: flex;
`;

const GenreItems = styled.div`
  padding: 8px;
  box-shadow: 0 1px 5px 1px rgb(1, 180, 228);
`;

const SelectionContainer = styled.div`
  display: flex;
  padding: 8px;
`;

const ProductionCompanyContainer = styled.div`
  margin-top: 8px;
  margin-bottom: 8px;
`;

const ProductionCompanyItems = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  img {
    width: 50px;
    height: 30px;
    background-color: white;
  }
  p {
    font-size: 14px;
  }
`;

export default function MovieCardDetails({ isLogin, user }) {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [ratings, setRatings] = useState();
  const [userRatings, setUserRating] = useState();

  const handleMovieRating = () => {
    if (!isLogin) {
      alert("Please login to rate this movie");
      return;
    }
    addToRated(user.session_id, movieId, ratings).then((response) => {
      fetchUserRated(user.id, user.session_id).then((response) => {
        const userRatedMovie = response.data.results.find(
          (m) => m.id === parseInt(movieId),
        );
        if (userRatedMovie) {
          setUserRating(ratings);
        }
      });
    });
  };

  const handleRatingChange = (event) => {
    setRatings(event.target.value);
  };

  useEffect(() => {
    fetchMovieDetails(movieId).then((response) => {
      setMovieDetails(response.data);
    });
  }, [movieId]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }
  return (
    <MovieCardDetailsContainer>
      <DetailsContainer>
        <ImgContainer>
          <img
            src={getFullImgUrl(movieDetails.poster_path)}
            alt={movieDetails.title}
          />
        </ImgContainer>
        <MovieDetailsContainer>
          <MovieTitle>{movieDetails.title}</MovieTitle>
          <br />
          <ReleaseDateContainer>
            <OtherTitiles>Release date:</OtherTitiles>
            <Descriptions>{movieDetails.release_date}</Descriptions>
          </ReleaseDateContainer>
          <OverviewContainer>
            <OtherTitiles>Overview:</OtherTitiles>
            <Descriptions>{movieDetails.overview}</Descriptions>
          </OverviewContainer>
          <GenresContainer>
            <OtherTitiles>Genres:</OtherTitiles>
            <GenreTitles>
              {movieDetails.genres.map((genre) => {
                return <GenreItems key={genre.id}>{genre.name}</GenreItems>;
              })}
            </GenreTitles>
          </GenresContainer>
          <div>
            <OtherTitiles>Average Rating:</OtherTitiles>
            <i className='fa-solid fa-star'>{movieDetails.vote_average}</i>
            <div>
              <OtherTitiles>
                Your Rating: {userRatings ? userRatings : "not yet"}
              </OtherTitiles>
              <SelectionContainer>
                <div>
                  <Select
                    variant='standard'
                    value=''
                    onChange={handleRatingChange}>
                    <MenuItem value=''>Select rating</MenuItem>
                    {RATINGS.map((rating) => (
                      <MenuItem key={rating} value={rating}>
                        {rating}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div>
                  <Button variant='contained' onClick={handleMovieRating}>
                    Rate it!
                  </Button>
                </div>
              </SelectionContainer>
            </div>
          </div>

          <ProductionCompanyContainer>
            <OtherTitiles>Production Companies:</OtherTitiles>
            <div>
              {movieDetails.production_companies.map((productionCompany) => {
                return (
                  <ProductionCompanyItems key={productionCompany.id}>
                    <img
                      src={getFullImgUrl(productionCompany.logo_path)}
                      alt={productionCompany.name}
                    />
                    <Descriptions>{productionCompany.name}</Descriptions>
                  </ProductionCompanyItems>
                );
              })}
            </div>
          </ProductionCompanyContainer>
        </MovieDetailsContainer>
      </DetailsContainer>
    </MovieCardDetailsContainer>
  );
}
