import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { ReactComponent as LocationIcon } from '../../../assets/location.svg'
import { ReactComponent as LinkedInIcon } from '../../../assets/linkedin.svg'
import { ReactComponent as GitHubIcon } from '../../../assets/github.svg'

const ExternalLink = styled.a`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`

const Greeting = () => {
  return (
    <>
      <h1 style={{ border: 'none' }}>Hi, I'm Chaerin An 👋</h1>
      <p>
        I am a full stack developer with experience in web development and
        robotics, currently pursuing a Master's degree in Embedded and
        Cyber-physical Systems at UC Irvine. I am passionate about efficient
        collaboration by writing maintainable, readable, and scalable code.
        <br /> I also enjoy documenting everything I learn on{' '}
        <Link to="/">my tech blog</Link> to share knowledge.
      </p>
      <p style={{ display: 'flex', gap: '4px' }}>
        <span>
          <LocationIcon css={{ color: '$dark-gray' }} />
        </span>
        Irvine, California, USA
      </p>
      <section style={{ display: 'flex', gap: '12px' }}>
        <ExternalLink href="https://www.linkedin.com/in/chaerin00/">
          <LinkedInIcon css={{ fill: '$dark-gray' }} />
        </ExternalLink>
        <ExternalLink href="https://github.com/chaerin00">
          <GitHubIcon css={{ fill: '$dark-gray' }} />
        </ExternalLink>
      </section>
    </>
  )
}

export default Greeting
