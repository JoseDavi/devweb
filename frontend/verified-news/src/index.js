import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { LanguageContextProvider } from './shared/utils/contexts/LanguageContext'

ReactDOM.render(
  <React.StrictMode>
    <LanguageContextProvider children={<App />}/>
  </React.StrictMode>,
  document.getElementById('root')
);
