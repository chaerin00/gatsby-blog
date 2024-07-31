import styled from '@emotion/styled'
import React from 'react'
import { useInView, animated } from '@react-spring/web'

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
`

const AnimatedCard = ({ children, ...props }) => {
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
      rootMargin: '-10% 0%',
    }
  )

  return (
    <animated.div ref={ref} style={springs}>
      <Card {...props}>{children}</Card>
    </animated.div>
  )
}

export default AnimatedCard
