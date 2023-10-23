import React from 'react';
import { Meme } from '../Meme/Meme';
import { Routes, Route } from 'react-router-dom';
import { MemeGenerated } from '../MemeGenerated/MemeGenerated';
import { Home } from '../authentication/Home';
import { Signup } from '../authentication/Signup';
import { Post } from '../Post/Post';
import { Signin } from '../authentication/Signin'
// import { useState } from 'react';
// import Dashboard from '../dashboard';
// import * as ROUTES from '../constants/routes';4
// import ProtectedRoute from '../helpers/protected-route';
// import styles from './styles.module.css';

export const App = () => {
  return (
    <div>
      <h1>Meme Creator</h1>
      <Routes>
        <Route exact path='/Signup' element={<Signup />}></Route>
        <Route exact path='/Home' element={<Home />}></Route>
        <Route exact path='/' element={<Signin />}></Route>
        <Route exact path='/Meme' element={<Meme />}></Route>
        <Route path='/generated' element={<MemeGenerated />}></Route>
        <Route exact path='/Post' element={<Post />}></Route>
      </Routes>
    </div>
  );
}
