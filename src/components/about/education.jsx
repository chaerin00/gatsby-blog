import React from 'react'
import Panel from './panel'
import styled from '@emotion/styled'
import Stack from './stack'

const Detail = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const Item = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const Time = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
  min-width: 160px;
  font-weight: 300;
  position: relative;
  white-space: pre;
  &::before {
    position: absolute;
    left: -23px;
    content: '';
    width: 12px;
    height: 12px;
    border: 2px solid;
    border-radius: 100%;
    background-color: white;
  }
`

const TimeLine = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  p {
    margin-bottom: 0;
  }
`

const Education = () => {
  return (
    <Panel className="education" title="Education">
      <TimeLine className="time-line">
        <Item>
          <Time className="time">September 2024 - </Time>
          <Detail>
            <Stack>
              <p className="school">University of California, Irvine</p>
            </Stack>
            <Stack>
              <p className="degree">
                Master of Embedded and Cyber-Physical Systems
              </p>
            </Stack>
            <ul style={{ marginTop: '8px' }}>
              <li> Expected Graduation: December 2025</li>
            </ul>
          </Detail>
        </Item>
        <Item>
          <Time className="time">{`March 2019 -\nFebruary 2024`}</Time>
          <Detail>
            <Stack>
              <p className="school">Sookmyung Women's University</p>
            </Stack>
            <Stack>
              <p className="degree">Bachelor of IT Engineering</p>
            </Stack>
            <ul style={{ marginTop: '8px' }}>
              <li> Overall GPA: 4.20/4.5, Major: 4.29/4.5</li>
              <li>
                Scholarships: Academic Excellence Scholarships for 3 times (Fall
                2019, Spring 2020, Spring 2023)
              </li>
            </ul>
          </Detail>
        </Item>
      </TimeLine>
    </Panel>
  )
}

export default Education
