import React from 'react'
import Panel from './panel'
import styled from '@emotion/styled'
import { ReactComponent as EmailIcon } from '../../../assets/email.svg'
import { ReactComponent as GithubIcon } from '../../../assets/github.svg'
import { ReactComponent as LinkedinIcon } from '../../../assets/linkedin.svg'
import { ReactComponent as CopyIcon } from '../../../assets/copy.svg'
import { ReactComponent as LinkIcon } from '../../../assets/external-link.svg'
import Stack from './stack'

const ExternalLink = styled.a`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  margin-bottom: 10px;
`

const IconButton = styled.button`
  all: unset;
  float: right;
  margin: 0;
  cursor: pointer;
`

const Contact = () => {
  const handleCopy = () => {
    navigator.clipboard.writeText('achrvvv@gmail.com')
  }
  return (
    <Panel
      title="Get in touch"
      description="Feel free to reach out to me if you're looking for a developer, have a query, or simply want to connect."
    >
      <section id="contact" />
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <EmailIcon />
          <p>achrvvv@gmail.com</p>
          <IconButton onClick={handleCopy}>
            <CopyIcon />
          </IconButton>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <GithubIcon />
          <p>chaerin00</p>
          <ExternalLink href="https://github.com/chaerin00" target="_blank">
            <LinkIcon />
          </ExternalLink>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <LinkedinIcon />
          <p>Chaerin An</p>
          <ExternalLink
            href="https://www.linkedin.com/in/chaerin00/"
            target="_blank"
          >
            <LinkIcon />
          </ExternalLink>
        </div>
      </div>
    </Panel>
  )
}

export default Contact
