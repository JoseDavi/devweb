import React from 'react';
import './style.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import News from './pages/news/news';
import Home from './pages/home/home';
import Profile from './pages/profile/profile';
import Header from "./shared/components/header/header";

function App() {
  return (
    <>
    <div className="App">
    <React.StrictMode>
      <BrowserRouter>
      <header className="header">
        <Header />
      </header>
      <main className='main'>
        <Routes>
          <Route path="*" element={<Navigate replace to="/news" />} />
          <Route path="/news" element={<News />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>   
      </BrowserRouter>
    </React.StrictMode>
    </div>
    </>
  );
}

export default App;