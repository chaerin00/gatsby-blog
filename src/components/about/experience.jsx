import React from 'react'
import styled from '@emotion/styled'

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 96px 0;
`

const Badge = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 115px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 28px;
`

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
`

const Experience = () => {
  return (
    <Wrapper className="experience">
      <Badge className="badge">Experience</Badge>
      <p style={{ fontWeight: 300, marginTop: '16px' }}>
        Here is a quick summary of my most recent experiences:
      </p>
      <CardContainer>
        <Card className="card">
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <p className="company">Bear Robotics</p>
            <span className="location">Redwood City, California, USA</span>
          </div>
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <p className="position">Software Engineer Intern</p>
            <span className="period">July 2023 - Jun 2024</span>
          </div>
          <ul className="summary">
            <li>
              Developed new features for hospitality robots in restaurant
              environments using various technology stacks: React for user
              interfaces, ROS for robot control, and Flask for backend services
            </li>
            <li>
              Designed, developed, and deployed robot infrastructure using
              microservices architecture with Bazel, utilizing protobuf and gRPC
              for communication between services
            </li>
            <li>Contributed to the company code as a Javascript reviewer</li>
          </ul>
        </Card>
        <Card className="card">
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <p className="company">FreeD Group</p>
            <span className="location">Seoul, Korea</span>
          </div>
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <p className="position">
              Frontend Developer
              <span className="position-detail">(part-time)</span>
            </p>
            <span className="period">June 2022 - February 2023</span>
          </div>
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <p className="position">
              Frontend Developer Intern
              <span className="position-detail"></span>
            </p>
            <span className="period">September 2021 - May 2022</span>
          </div>
          <ul className="summary">
            <li>
              Developed a user interface for an e-commerce platform serving
              3,000+ suppliers and 10 marketplaces, including Hyundai Card and
              BMW.
            </li>
            <li>
              Integrated message templates, previews, and data visualization
              into a food-delivery chat-bot using RCS technology.
            </li>
            <li>
              Created an in-house design system with reusable React components,
              improving developer productivity and reducing bug rates.
            </li>
          </ul>
        </Card>
      </CardContainer>
    </Wrapper>
  )
}

export default Experience
