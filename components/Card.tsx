import styled from 'styled-components'

const Card = styled.div`
  background: white;
  border-radius: 20px;
  color: #1d1d1d;
  min-height: 320px;
  padding: 24px;
  position: relative;
  overflow: auto;
  width: 100%;
`

export const Title = styled.h3`
  font-weight: 500;
  font-size: 24px;
  line-height: 30px;
  letter-spacing: 0.15px;
  position: sticky;
  left: 0;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`

export default Card
