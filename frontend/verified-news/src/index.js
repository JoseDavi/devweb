import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import News from './pages/news/news';
import Home from './pages/home/home';
import Profile from './pages/profile/profile';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate replace to="/news" />} />
        <Route path="/news" element={<News />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />

        {/*<Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />*/}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
