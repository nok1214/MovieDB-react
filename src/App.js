import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Logo from "./components/Logo";
import Layout from "./components/Layout";
import Favorite from "./components/Favorite";
import Home from "./components/Home";
import Rated from "./components/Rated";
import LoginPage from "./components/LoginPage";
import MovieCardDetails from "./components/MovieCardDetails";
import styled from "styled-components";

const AppContainer = styled.div`
  margin: 0 auto;
  background-color: rgb(13, 37, 63);
  padding: 20px;
`;

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLogin(true);
      setUser(user);
    }
  }, []);
  return (
    <AppContainer className='App'>
      <BrowserRouter>
        <Logo />
        <Routes>
          <Route
            path='/'
            element={
              <Layout
                isLogin={isLogin}
                user={user}
                setIsLogin={setIsLogin}
                setUser={setUser}
              />
            }>
            <Route index element={<Home user={user} isLogin={isLogin} />} />
            <Route
              path='/movies/:movieId'
              element={<MovieCardDetails isLogin={isLogin} user={user} />}
            />
            <Route
              path='/favorite'
              element={
                <Favorite user={user} isLogin={true} setIsLogin={setIsLogin} />
              }
            />

            <Route
              path='/rated'
              element={<Rated user={user} isLogin={isLogin} />}
            />
            <Route
              path='/login'
              element={<LoginPage setIsLogin={setIsLogin} setUser={setUser} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;
