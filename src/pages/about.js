import React from 'react'
import { graphql } from 'gatsby'
import { Layout } from '../layout'

import { rhythm } from '../utils/typography'
import * as Lang from '../constants'

const About = ({ data, location }) => {
  const resumes = data.allMarkdownRemark.edges

  const resume = resumes
    .filter(({ node }) => node.frontmatter.lang === Lang.ENGLISH)
    .map(({ node }) => node)[0]

  return (
    <Layout location={location}>
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(0.5)} ${rhythm(3 / 4)} ${rhythm(1.5)} ${rhythm(
            3 / 4
          )}`,
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: resume.html }} />
      </div>
      {/* <Bio>Hi there</Bio>
      <Experience>experiences...</Experience>
      <Work>Some of the noteworthy projects I have built:</Work>
      <Contact id="contact">Get in Touch</Contact> */}
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
