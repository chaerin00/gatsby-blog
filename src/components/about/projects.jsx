import React from 'react'
import Panel from './panel'
import styled from '@emotion/styled'
import { ReactComponent as LinkIcon } from '../../../assets/external-link.svg'
import Badge from './Badge'

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 16px;
  box-shadow:
    0px 4px 3px rgba(0, 0, 0, 0.07),
    0px 2px 2px rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-left: 20px;
  overflow: auto;
  .description {
    font-weight: 300px;
    font-size: 14px;
  }
`

const Skill = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin: 16px 0;
  flex: 1;
  gap: 8px;
`

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 48px;
`

const PROJECTS = [
  {
    title: 'Cookie Parking',
    descriptions: [
      'Chrome extension designed to simplify the process of archiving and categorizing websites with a single click. By clicking on the Chrome favicon, users can save and organize website information',
      ' Acquired 1,000 users in the first six months of launch and achieved 1st place at Youth Entrepreneurship Competition',
    ],
    skills: [
      'React',
      'Next.js',
      'Typescript',
      'SWR',
      'Recoil',
      'Storybook',
      'Git',
    ],
    link: 'https://chromewebstore.google.com/detail/cookie-parking/gbpliecdabaekbhmncopnbkfpdippdnl?pli=1',
  },
  {
    title: 'Korean Diary',
    descriptions: [
      'Korean diary app with grammar correction and pronunciation evaluation features',
      'Implemented a pronunciation evaluation feature utilizing the Korean-tailored Bidirectional Encoder Representations from Transformers (BERT) language model',
    ],
    skills: [
      'React',
      'Typescript',
      'React Query',
      'Python',
      'Flask',
      'Java',
      'Spring',
      'AWS',
    ],
    link: 'https://github.com/2023-FINAL-PROJECT',
  },
]

const Projects = () => {
  return (
    <Panel className="projects" title={'Personal Projects'}>
      <CardContainer>
        {PROJECTS.map(({ title, descriptions, skills, link }) => (
          <Card className="card">
            <CardContent>
              <h3 className="title">{title}</h3>
              {descriptions.map((description) => (
                <p className="description">{description}</p>
              ))}
              <Skill>
                {skills.map((skill) => (
                  <Badge>{skill}</Badge>
                ))}
              </Skill>
              <a style={{ all: 'unset' }} target="_blank" href={link}>
                <LinkIcon />
              </a>
            </CardContent>
          </Card>
        ))}
      </CardContainer>
    </Panel>
  )
}

export default Projects
