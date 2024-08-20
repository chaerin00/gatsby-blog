import React from 'react'
import { graphql } from 'gatsby'
import { Layout } from '../layout'

import { rhythm } from '../utils/typography'
import * as Lang from '../constants'
import Greeting from '../components/about/greeting'
import Experience from '../components/about/experience'
import Education from '../components/about/education'
import Skills from '../components/about/skills'
import Contact from '../components/about/contact'
import Projects from '../components/about/projects'
import { Helmet } from 'react-helmet'
import logo from '../../assets/logo.png'

const About = ({ data, location }) => {
  const resumes = data.allMarkdownRemark.edges

  const resume = resumes
    .filter(({ node }) => node.frontmatter.lang === Lang.ENGLISH)
    .map(({ node }) => node)[0]

  return (
    <Layout location={location}>
      <Helmet>
        <title>Chaerin.dev</title>
        <meta name="author" content="Chaerin An " />
        <meta name="description" content="Chaerin An Portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.chaerin.dev/about" />
        <meta property="og:title" content="Chaerin.dev" />
        <meta property="og:image" content={logo} />
        <meta property="og:description" content="Chaerin An Portfolio" />
        <meta property="og:site_name" content="Chaerin.dev" />
      </Helmet>
      <div className="about">
        <Greeting />
        <Experience />
        <Projects />
        <Education />
        <Skills />
        <Contact />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(filter: { frontmatter: { category: { eq: null } } }) {
      edges {
        node {
          id
          excerpt(pruneLength: 160)
          html
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            lang
          }
        }
      }
    }
  }
`
export default About
