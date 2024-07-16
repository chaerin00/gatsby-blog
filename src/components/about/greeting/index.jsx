import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { ReactComponent as LocationIcon } from '../../../../assets/location.svg'
import { ReactComponent as LinkedInIcon } from '../../../../assets/linkedin.svg'
import { ReactComponent as GitHubIcon } from '../../../../assets/github.svg'

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
        I am a software engineer with a Bachelor's degree in Computer Science,
        and I am pursuing a Master's degree in Computer Engineering at UC
        Irvine. I am passionate about efficient collaboration by writing
        maintainable, readable, and scalable code.
        <br /> I am also dedicated to documenting everything I learn on{' '}
        <Link to="/">my tech blog</Link> to share knowledge and deepen my
        understanding.
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
