import React from 'react';
import axios from 'axios';

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css'
// Higher Order Components

import MovieHOC from './HOC/Movie.HOC';
import MoviePage from './Pages/Movie.Page';

// Pages

import HomePage from './Pages/Home.Page';
import DefaultHOC from './HOC/Default.HOC';
import Login from './Pages/Login';
import SignUp from './Pages/Signup';
import Plays from './Pages/Plays.Page';
axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.params = {};
axios.defaults.params['api_key'] = process.env.REACT_APP_API_KEY;



function App() {
  return <>
    <DefaultHOC path='/' exact component={HomePage} />
    <MovieHOC path='/movie/:id' exact component={MoviePage} />
    <DefaultHOC path='/plays' exact component={Plays}/>
    <DefaultHOC path='/login' exact component={Login} />
    <DefaultHOC path='/signup' exact component={SignUp} />
    
    
  </>;
}

export default App;
