import React from 'react'
import Panel from './panel'
import styled from '@emotion/styled'
import javascriptImg from '../../../assets/javascript.png'
import typescriptImg from '../../../assets/typescript.png'
import reactImg from '../../../assets/react.png'
import storybookImg from '../../../assets/storybook.png'
import jestImg from '../../../assets/jest.png'
import pythonImg from '../../../assets/python.png'
import dockerImg from '../../../assets/docker.png'
import bazelImg from '../../../assets/bazel.png'
import protobufImg from '../../../assets/protobuf.png'
import grpcImg from '../../../assets/grpc.png'
import javaImg from '../../../assets/java.png'
import springImg from '../../../assets/spring.png'

const SKILLS = [
  { name: 'Javascript', image: javascriptImg },
  { name: 'Typescript', image: typescriptImg },
  { name: 'React', image: reactImg },
  { name: 'Storybook', image: storybookImg },
  { name: 'Jest', image: jestImg },
  { name: 'Python', image: pythonImg },
  { name: 'Docker', image: dockerImg },
  { name: 'Bazel', image: bazelImg },
  { name: 'Protobuf', image: protobufImg },
  { name: 'gRPC', image: grpcImg },
  { name: 'Java', image: javaImg },
  { name: 'SpringBoot', image: springImg },
]

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(88px, 1fr));
  gap: 16px;
  padding: 16px;
  .skill {
    font-size: 14px;
    font-weight: 300;
  }
`

const Skills = () => {
  return (
    <Panel
      className="skills"
      title="skills"
      description="The skills, tools and technologies I am good at:"
    >
      <Grid>
        {SKILLS.map(({ name, image }) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <img src={image} alt={name} width="64px" />
            <span className="skill">{name}</span>
          </div>
        ))}
      </Grid>
    </Panel>
  )
}

export default Skills
