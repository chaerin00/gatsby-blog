import React from 'react'
import styled from '@emotion/styled'
import Panel from './panel'
import Stack from './stack'
import Badge from './Badge'

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 48px;
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px;
  width: 100%;
  box-shadow:
    0px 4px 3px rgba(0, 0, 0, 0.07),
    0px 2px 2px rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  .company {
    font-weight: 600;
    font-size: 20px;
  }
  .position {
    margin: 4px;
    font-weight: 600;
    .position-detail {
      font-weight: 400;
    }
  }
  .summary {
    margin-top: 8px;
  }

  .skills {
    display: flex;
    flex-wrap: wrap;
    margin: 16px 0;
    flex: 1;
    gap: 8px;
  }
`

const EXPERIENCES = [
  {
    company: 'Bear Robotics',
    location: 'Redwood City, California, USA',
    positions: [
      { title: 'Software Engineer Intern', period: 'July 2023 - Jun 2024' },
    ],
    descriptions: [
      `Developed new features for hospitality robots in restaurant
              environments using various technology stacks: React for user
              interfaces, ROS for robot control, and Flask for backend services
            `,
      `Designed, developed, and deployed robot infrastructure using
            microservices architecture with Bazel, utilizing protobuf and gRPC
            for communication between services`,
      `Contributed to the company code as a Javascript reviewer`,
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
      `Developed a user interface for an e-commerce platform serving 3,000+ suppliers and 10 marketplaces, including Hyundai Card and BMW.`,
      `Integrated message templates, previews, and data visualization into a food-delivery chat-bot using RCS technology.`,
      `Created an in-house design system with reusable React components, improving developer productivity and reducing bug rates.`,
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
    <Panel
      className="experience"
      title="Experience"
      description="Here is a quick summary of my most recent experiences:"
    >
      <CardContainer>
        {EXPERIENCES.map(
          ({ company, location, positions, descriptions, skills }) => (
            <Card className="card">
              <Stack>
                <p className="company">{company}</p>
                <span className="location">{location}</span>
              </Stack>
              {positions.map(({ title, period, detail }) => (
                <Stack>
                  <p className="position">
                    {title}
                    {detail && (
                      <span className="position-detail">{detail}</span>
                    )}
                  </p>
                  <span className="period">{period}</span>
                </Stack>
              ))}
              <ul className="summary">
                {descriptions.map((description) => (
                  <li>{description}</li>
                ))}
              </ul>
              <section className="skills">
                {skills.map((skill) => (
                  <Badge>{skill}</Badge>
                ))}
              </section>
            </Card>
          )
        )}
      </CardContainer>
    </Panel>
  )
}

export default Experience
