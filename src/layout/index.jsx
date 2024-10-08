import React from 'react'

import { Top } from '../components/top'
import { Header } from '../components/header'
import { ThemeSwitch } from '../components/theme-switch'
import { Footer } from '../components/footer'
import { rhythm } from '../utils/typography'

import './index.scss'
import LanguageSelector from '../components/language-selector'
import { LanguageProvider } from '../hooks/context/languageContext'

export const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRoot = location.pathname === rootPath

  return (
    <React.Fragment>
      <LanguageProvider>
        <Top title={title} location={location} rootPath={rootPath} />
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(30),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'flex-end',
              gap: '8px',
            }}
          >
            <ThemeSwitch />
            {isRoot && <LanguageSelector />}
          </div>
          <Header title={title} location={location} rootPath={rootPath} />
          {children}
          <Footer />
        </div>
      </LanguageProvider>
    </React.Fragment>
  )
}
