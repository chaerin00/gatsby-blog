import React, { useContext, useState } from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import KRIcon from '../../../content/assets/south-korea.png'
import USIcon from '../../../content/assets/united-states.png'
import { LanguageContext } from '../../hooks/context/languageContext'

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: scaleY(0);
  }
  to {
    opacity: 1;
    transform: scaleY(1);
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  float: right;
  position: relative;
`

const FlagButton = styled.div`
  width: 32px;
  cursor: pointer;
`

const FlagIcon = styled.img`
  width: 32px;
  margin-bottom: 0;
`

const DropDown = styled.div`
  width: 80px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  animation: ${slideDown} 0.3s ease forwards;
  transform-origin: top;
  position: absolute;
  top: 52px;
`

const DropDownItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 10px;
  gap: 8px;
`

const LANG_ICON_MAP = {
  KR: KRIcon,
  EN: USIcon,
}

const LanguageSelector = () => {
  const { language, setLanguage } = useContext(LanguageContext)
  const [isListOpen, setIsListOpen] = useState(false)

  const handleLanguageChange = (lang) => {
    setLanguage(lang)
    setIsListOpen(false)
  }

  return (
    <Wrapper>
      <FlagButton onClick={() => setIsListOpen(!isListOpen)}>
        <FlagIcon src={LANG_ICON_MAP[language]} alt="flag-icon" />
      </FlagButton>
      {isListOpen && (
        <DropDown>
          {Object.keys(LANG_ICON_MAP).map((lang) => (
            <DropDownItem onClick={() => handleLanguageChange(lang)}>
              <span>{lang}</span>
              <FlagIcon src={LANG_ICON_MAP[lang]} />
            </DropDownItem>
          ))}
        </DropDown>
      )}
    </Wrapper>
  )
}

export default LanguageSelector
