import React, { createContext, useContext, useEffect, useState } from 'react'
import * as Storage from '../../utils/storage'

const LanguageContext = createContext()

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(Storage.getLanguage('EN'))

  useEffect(() => {
    Storage.setLanguage(language)
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export { LanguageContext, LanguageProvider }
