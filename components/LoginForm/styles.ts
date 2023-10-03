import styled from 'styled-components'

export const Form = styled.form`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: center;
  max-width: 320px;
  width: 100%;
`

export const Input = styled.input`
  font-weight: 400;
  font-size: 24px;
  line-height: 21px;
  letter-spacing: 0.1px;
  color: #1d1d1d;
  min-height: 48px;
  padding: 12px 32px;
  background: #f2f2f2;
  border-radius: 32px;
  width: 100%;
`

export const SubmitButton = styled.button`
  align-items: center;
  background: #eaf2fd;
  border-radius: 32px;
  display: flex;
  gap: 12px;
  font-weight: 400;
  font-size: 20px;
  line-height: 21px;
  letter-spacing: 0.1px;
  justify-content: center;
  min-height: 48px;
  min-width: 160px;
  padding: 12px 32px;
  transition: all 0.2s ease-in;
  text-align: center;
  &:hover,
  &:focus {
    background: #2f80ed;
    color: white;
  }
  & svg {
    height: 24px;
    width: 24px;
  }
`

export const ErrorMessage = styled.div`
  color: red;
  margin-top: 20px;
`
