import React, { useState } from 'react';

const LanguageContext = React.createContext();

function LanguageContextProvider ({children}) {

  const [language, setLanguage] = useState("pt");

  return (
    <LanguageContext.Provider value={{"language": language, "setLanguage": setLanguage}}>
      {children}
    </LanguageContext.Provider>
  );

}


export  { LanguageContextProvider, LanguageContext };