import React from 'react'
import styled from '@emotion/styled'

const Badge = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 115px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 28px;
`
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
