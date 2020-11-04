import React, { useState } from "react";
import "./index.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import config from "./axios/config";

// Components
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Main from "./Components/Main";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import Sign from "./Components/Sign";
import About from "./Components/About";
import Rate from "./Components/Rate";
import Profile from "./Components/Profile";
import Pricing from "./Components/Pricing";

// img
import team from "./assets/images/team.png";
import mac from "./assets/images/mac.jpeg";
import motivation from "./assets/images/motivation.svg";
import profits from "./assets/images/profits.svg";
import security from "./assets/images/security.svg";
import community from "./assets/images/community.svg";
import analysis from "./assets/images/analysis.png";
import feedback from "./assets/images/feedback.svg";
import MK from "./assets/images/MKK.png";
import WT from "./assets/images/WTT.png";

function App() {
  const [Token, setToken] = useState("");
  const [ID, setID] = useState("");
  const mainPackage = {
    images: [mac, security, motivation, profits, community, analysis, feedback],
  };
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/Login">
          {Token ? (
            <Redirect to="/" />
          ) : (
            <Login
              newToken={(parameter) => {
                setToken(parameter[0].token);
                setID(parameter[0]._id);
                config.headers.authorization = parameter[0].token;
              }}
            />
          )}
        </Route>
        <Route path="/Register">
          <Sign />
        </Route>
        <Route path="/About">
          <Navbar Token={ID ? ID : false} style />
          <About images={[MK, WT]} />
          <Footer />
        </Route>
        <Route path="/Pricing">
          <Navbar Token={ID ? ID : false} style />
          <Pricing />
          <Footer />
        </Route>
        <Route path="/Rate/:id">
          <Navbar Token={ID ? ID : false} style />
          <Rate id={ID} />
          <Footer />
        </Route>
        <Route path="/Profile">
          <Navbar Token={ID ? ID : false} style />
          <Profile id={ID} token={Token} isLogged={ID ? true : false} />
          <Footer />
        </Route>

        <Route path="/">
          <Navbar Token={ID ? ID : false} />
          <Hero img={team} />
          <Main package={mainPackage} />
          <Footer />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
