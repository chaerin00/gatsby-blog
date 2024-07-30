import React from 'react'
import Panel from './panel'
import styled from '@emotion/styled'
import Stack from './stack'

const Item = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 50%;
  padding: 16px;

  .school {
    font-weight: 600;
    font-size: 20px;
  }
  .degree {
    all: unset;
    font-weight: 600;
  }
  .period {
    text-align: right;
  }
  ul {
    width: 100%;
  }
`

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Education = () => {
  return (
    <Panel className="education" title="Education">
      <ItemContainer>
        <Item>
          <Stack>
            <p className="school">University of California, Irvine</p>
          </Stack>
          <Stack>
            <p className="degree">
              Master of Embedded and Cyber-Physical Systems
            </p>
          </Stack>
          <ul>
            <li> Incoming grad student @UCI</li>
          </ul>
        </Item>
        <Item>
          <Stack>
            <p className="school">Sookmyung Women's University</p>
          </Stack>
          <Stack>
            <p className="degree">Bachelor of IT Engineering</p>
          </Stack>
          <ul>
            <li>Graduation: February 2024</li>
            <li> Overall GPA: 4.20/4.5, Major: 4.29/4.5</li>
            <li>
              Scholarships: Academic Excellence Scholarships for 3 times (Fall
              2019, Spring 2020, Spring 2023)
            </li>
          </ul>
        </Item>
      </ItemContainer>
    </Panel>
  )
}

export default Education
