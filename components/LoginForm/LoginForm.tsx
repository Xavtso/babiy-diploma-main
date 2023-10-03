import React from 'react'
import { useForm } from 'react-hook-form'
import { MdLogin } from 'react-icons/md'
import { Form, Input, SubmitButton, ErrorMessage } from './styles'

interface LoginFormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>
  error?: React.ReactNode
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, error }) => {
  const { register, handleSubmit } = useForm()

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input type="email" placeholder="Пошта" required {...register('email', { required: true })} />
      <Input type="password" placeholder="Пароль" required {...register('password', { required: true })} />
      <SubmitButton type="submit">
        <span>Увiйти</span> <MdLogin />
      </SubmitButton>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Form>
  )
}

export default LoginForm
