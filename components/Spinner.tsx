import React from 'react'
import styled, { keyframes } from 'styled-components'

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`

const spin = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  `

const Loader = styled.div`
  --size: 7em;

  &,
  &:after {
    border-radius: 50%;
    height: var(--size);
    width: var(--size);
  }

  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1em solid rgba(55, 88, 250, 0.2);
  border-right: 1em solid rgba(55, 88, 250, 0.2);
  border-bottom: 1em solid rgba(55, 88, 2505, 0.2);
  border-left: 1em solid #2f80ed;

  transform: translateZ(0);
  animation: ${spin} 1.1s infinite linear;
`

const Spinner: React.FC = () => (
  <Wrapper>
    <Loader />
  </Wrapper>
)

export default Spinner
