import React, { useState } from 'react'
import { ReactComponent as MenuIcon } from '../../../assets/menu-icon.svg'
import { ReactComponent as CloseIcon } from '../../../assets/close.svg'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

const IconButton = styled.button`
  all: unset;
  float: right;
  padding: 14px;
  margin: 0;
  cursor: pointer;
`

const SidePanel = styled.div`
  position: fixed;
  display: flex;
  justify-content: flex-end;
  z-index: 100;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
`

const SideMenu = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  height: 100vh;
  box-shadow: -10px 0px 10px -5px rgba(0, 0, 0, 0.3);
`

const Header = styled.section`
  height: 60px;
  border-bottom: 1px solid;
`

const LinkContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border-bottom: 1px solid;
  flex: 1;
`

const Footer = styled.section`
  padding: 14px;
  padding-bottom: 25px;
`

const DownloadCvButton = styled.a`
  padding: 10px 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  cursor: pointer;
`

const Sidebar = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <IconButton
        className="menu-icon-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MenuIcon />
      </IconButton>
      {isOpen && (
        <SidePanel onClick={() => setIsOpen(false)}>
          <SideMenu className="sidebar" onClick={(e) => e.stopPropagation()}>
            <Header className="sidebar-header">
              <IconButton onClick={() => setIsOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Header>
            <LinkContainer className="sidebar-link__container">
              <Link to="/about" className="sidebar-link">
                About
              </Link>
              <Link to="/" className="sidebar-link">
                Blog
              </Link>
              <Link
                to="/about#contact"
                onClick={() => setIsOpen(false)}
                className="sidebar-link"
              >
                Contact
              </Link>
            </LinkContainer>
            <Footer>
              <DownloadCvButton
                className="download-cv"
                href="https://drive.google.com/file/d/1pvcQ3fkdYGfs6HWw8HHBzBW7L6KocMnt/view?usp=sharing"
                target="_blank"
              >
                Download CV
              </DownloadCvButton>
            </Footer>
          </SideMenu>
        </SidePanel>
      )}
    </div>
  )
}

export default Sidebar
