import React, { useState } from 'react'
import MenuIcon from '../../../content/assets/menu-icon.svg'
import CloseIcon from '../../../content/assets/close.svg'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

const IconButton = styled.img`
  float: right;
  padding: 14px;
  opacity: 0.6;
  margin: 0;
  cursor: pointer;
`

const SidePanel = styled.div`
  position: absolute;
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

const DownloadCvButton = styled(Link)`
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
        src={MenuIcon}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <SidePanel onClick={() => setIsOpen(false)}>
          <SideMenu className="sidebar" onClick={(e) => e.stopPropagation()}>
            <Header className="sidebar-header">
              <IconButton src={CloseIcon} onClick={() => setIsOpen(false)} />
            </Header>
            <LinkContainer className="sidebar-link__container">
              <Link to="/about" className="sidebar-link">
                About
              </Link>
              <Link to="/" className="sidebar-link">
                Blog
              </Link>
              <Link to="/about#contact" className="sidebar-link">
                Contact
              </Link>
            </LinkContainer>
            <Footer>
              <DownloadCvButton className="download-cv">
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
