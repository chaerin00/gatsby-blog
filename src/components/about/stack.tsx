import React from 'react'
import styled from '@emotion/styled'

const Stack = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`

export default Stack
