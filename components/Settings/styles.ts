import styled from 'styled-components'

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  font-size: 16px;
  line-height: 21px;
  letter-spacing: 0.1px;
  color: #000000;
  min-height: 320px;

  & strong {
    font-weight: 500;
  }

  & a {
    text-decoration: underline;
  }
`

export const Body = styled.data`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const Footer = styled.div`
  margin-top: auto;
  font-weight: 500;
`
