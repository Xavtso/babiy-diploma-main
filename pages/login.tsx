import React, { useCallback, useState } from 'react'
import axios, { AxiosError } from 'axios'
import styled from 'styled-components'
import useUser from 'utils/useUser'
import LoginForm from 'components/LoginForm'

const Wrapper = styled.div`
  align-items: center;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  width: 100%;
`

const Title = styled.h1`
  font-weight: 500;
  font-size: 36px;
  line-height: 48px;
  letter-spacing: 0.1px;
  margin-bottom: 24px;
`

const Login = () => {
  // here we just check if user is already logged in and redirect to profile
  const { mutateUser } = useUser({
    redirectTo: '/dashboard',
    redirectIfFound: true,
  })

  const [errorMsg, setErrorMsg] = useState('')

  const onSubmit = useCallback(
    async (data) => {
      try {
        mutateUser(await axios.post('/api/login', data))
      } catch (error) {
        if (error instanceof AxiosError) {
          setErrorMsg(error.response?.data?.message || error.message)
        } else {
          console.error('An unexpected error happened:', error)
        }
      }
    },
    [mutateUser],
  )

  return (
    <Wrapper>
      <Title>Авторизація</Title>
      <LoginForm onSubmit={onSubmit} error={errorMsg} />
    </Wrapper>
  )
}

export default Login
