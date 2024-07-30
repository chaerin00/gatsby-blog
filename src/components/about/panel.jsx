import React from 'react'
import styled from '@emotion/styled'
import Badge from './Badge'

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 96px 0;
`

const Panel = ({ title, description, children, ...props }) => {
  return (
    <Wrapper {...props}>
      <Badge className="badge">{title}</Badge>
      <p style={{ fontWeight: 300, marginTop: '16px', textAlign: 'center' }}>
        {description}
      </p>
      {children}
    </Wrapper>
  )
}

export default Panel
