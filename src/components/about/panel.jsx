import React from 'react'
import styled from '@emotion/styled'
import Badge from './Badge'
import { useInView, animated } from '@react-spring/web'

const AnimatedDiv = styled(animated.div)`
  width: 100%;
`

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 96px 0;
`

const Panel = ({ title, description, children, useAnimation, ...props }) => {
  const [ref, springs] = useInView(
    () => ({
      from: {
        opacity: 0,
        y: 100,
      },
      to: {
        opacity: 1,
        y: 0,
      },
    }),
    {
      rootMargin: '-5% 0%',
    }
  )

  return (
    <Wrapper {...props}>
      <Badge className="badge">{title}</Badge>
      <p style={{ fontWeight: 300, marginTop: '16px', textAlign: 'center' }}>
        {description}
      </p>
      {useAnimation ? (
        <AnimatedDiv ref={ref} style={springs}>
          {children}
        </AnimatedDiv>
      ) : (
        children
      )}
    </Wrapper>
  )
}

export default Panel
