import React from 'react'
import styled from '@emotion/styled'
import Panel from './panel'
import Stack from './stack'
import Badge from './Badge'
import Card from './card'

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 48px;
`

const Company = styled.p`
  font-weight: 600;
  font-size: 20px;
`

const Position = styled.p`
  margin: 4px;
  font-weight: 600;
  .position-detail {
    font-weight: 400;
  }
`

const Summary = styled.ul`
  margin-top: 8px;
`

const Skills = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin: 16px 0;
  flex: 1;
  gap: 8px;
`

const EXPERIENCES = [
  {
    company: 'Bear Robotics',
    location: 'Redwood City, California, USA',
    positions: [
      { title: 'Software Engineer Intern', period: 'July 2023 - Jun 2024' },
    ],
    descriptions: [
      `Developed new features for a hospitality robot such as localization,
      overload notification and self-diagnosis, providing users with a smoother experience
      in restaurant environments`,
      `Utilized technology stacks for robot development, including React for touchscreen interfaces,
       ROS for robot control, and Flask for backend services`,
      `Designed, developed, and deployed a robot network service for Wi-Fi connectivity 
      and network status uploads to the cloud, utilizing a microservices architecture
      with Python, Bazel, Protobuf, and gRPC`,
      `Achieved 100% test coverage for new features through Test Driven Development,
      preventing bugs that may arise during further development`,
    ],
    skills: [
      'Typescript',
      'Python',
      'C++',
      'React',
      'Bazel',
      'Docker',
      'Protobuf',
      'gRPC',
      'ROS',
    ],
  },
  {
    company: 'FreeD Group',
    location: 'Seoul, Korea',
    positions: [
      {
        title: 'Frontend Developer ',
        period: 'June 2022 - February 2023',
        detail: '(part-time)',
      },
      {
        title: 'Frontend Developer Intern',
        period: 'September 2021 - May 2022',
      },
    ],
    descriptions: [
      `Developed cart, transaction and order pages for an e-commerce platform serving 3,000+ suppliers and 10 marketplaces,
       including Hyundai Card and BMW`,
      `Implemented a dynamic theme website that adjusts layouts, theme colors, and logos based on brand specifications
      using Server-Side Rendering (SSR) with Next.js, enabling the management of multiple brands within a single project`,
      `Delivered a food-delivery chatbot service that offers brands customizable templates, previews, and data visualization
       for RCS (Rich Communication Services) messages,
       enabling efficient marketing communication with customers`,
      `Spearheaded the development of an in-house design system using reusable React components, and tested with Storybook and Jest. 
      This design system improved developer productivity, reduced bug rates by 25%, and ensured consistent UI and logic across the platform`,
    ],
    skills: [
      'Typescript',
      'React',
      'Next.js',
      'Vue',
      'Nuxt.js',
      'React Query',
      'Redux',
      'Jest',
      'Storybook',
    ],
  },
]

const Experience = () => {
  return (
    <Panel className="experience" title="Experience">
      <CardContainer>
        {EXPERIENCES.map(
          ({ company, location, positions, descriptions, skills }) => (
            <Card className="card">
              <Stack>
                <Company>{company}</Company>
                <span>{location}</span>
              </Stack>
              {positions.map(({ title, period, detail }) => (
                <Stack>
                  <Position>
                    {title}
                    {detail && (
                      <span className="position-detail">{detail}</span>
                    )}
                  </Position>
                  <span className="period">{period}</span>
                </Stack>
              ))}
              <Summary>
                {descriptions.map((description) => (
                  <li>{description}</li>
                ))}
              </Summary>
              <Skills>
                {skills.map((skill) => (
                  <Badge>{skill}</Badge>
                ))}
              </Skills>
            </Card>
          )
        )}
      </CardContainer>
    </Panel>
  )
}

export default Experience
