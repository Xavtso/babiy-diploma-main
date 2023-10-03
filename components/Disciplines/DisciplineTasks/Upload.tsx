import React, { useCallback, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { violet, blackA, mauve, green } from '@radix-ui/colors'
import { useForm } from 'react-hook-form'
import { MdClose } from 'react-icons/md'
import axios from 'axios'

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
})

const StyledOverlay = styled(DialogPrimitive.Overlay)`
  background-color: ${blackA.blackA9};
  position: fixed;
  inset: 0;
  @media (prefers-reduced-motion: no-preference) {
    animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
`

const StyledContent = styled(DialogPrimitive.Content)`
  background-color: white;
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 25px;
  @media (prefers-reduced-motion: no-preference) {
    animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  &:focus {
    outline: none;
  }
`

const Content = ({ children, ...props }) => (
  <DialogPrimitive.Portal>
    <StyledOverlay />
    <StyledContent {...props}>{children}</StyledContent>
  </DialogPrimitive.Portal>
)

const StyledTitle = styled(DialogPrimitive.Title)`
  margin: 0 0 20px;
  font-weight: 500;
  color: ${mauve.mauve12};
  font-size: 17px;
`

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogContent = Content
const DialogTitle = StyledTitle
const DialogClose = DialogPrimitive.Close

const Footer = styled.div`
  display: flex;
  margin-top: 25px;
  justify-content: flex-end;
`

const Button = styled.button`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 15px;
  line-height: 1;
  font-weight: 500;
  height: 35px;
`

const OpenDialogButton = styled(Button)`
  background-color: white;
  color: ${violet.violet11};
  box-shadow: 0 2px 10px ${blackA.blackA7};
  &:hover {
    background-color: ${mauve.mauve3};
  }
  &:focus {
    box-shadow: 0 0 0 2px black;
  }
`

const SaveButton = styled(Button)`
  background-color: ${green.green4};
  color: ${green.green11};
  &:hover {
    background-color: ${green.green5};
  }
  &:focus {
    box-shadow: 0 0 0 2px ${green.green7};
  }
  &:disabled {
    opacity: 0.5;
  }
`

const IconButton = styled.button`
  all: unset;
  font-family: inherit;
  border-radius: 100%;
  height: 25px;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${violet.violet11};
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    background-color: ${violet.violet4};
  }
  &:focus {
    box-shadow: 0 0 0 2px ${violet.violet7};
  }
`

const Fieldset = styled.fieldset`
  all: unset;
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 15px;
`

const Label = styled.label`
  font-size: 15px;
  color: ${violet.violet11};
  width: auto;
  text-align: right;
`

const Input = styled.input`
  all: unset;
  width: 100%;
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 10px;
  font-size: 15px;
  line-height: 1;
  color: ${violet.violet11};
  box-shadow: 0 0 0 1px ${violet.violet7};
  height: 35px;

  &:focus {
    box-shadow: 0 0 0 2px ${violet.violet8};
  }
`

export const Error = styled.p`
  color: red;
  margin-top: 20px;
`

interface UploadProps {
  title: string
  taskId: string
  mutate?: () => Promise<any>
}

const Upload: React.FC<UploadProps> = ({ title = 'Додати посилання на роботу', taskId, mutate }) => {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit } = useForm()

  const onSubmit = useCallback(
    async (data) => {
      const { link } = data
      if (!link) return

      setLoading(true)
      try {
        const res = await axios.post('/api/upload', {
          link,
          task_id: taskId,
        })

        if (res?.status === 200) {
          mutate()
          setOpen(false)
        }
      } catch (e) {
        setError(e)
      }

      setLoading(false)
    },
    [mutate, taskId],
  )

  if (!taskId) return null
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <OpenDialogButton>Завантажити</OpenDialogButton>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>{title}</DialogTitle>

          <Fieldset>
            <Label htmlFor="name">Файл</Label>
            <Input
              type="url"
              {...register('link', { required: true })}
              placeholder="https://drive.google.com/drive/my-drive/..."
              required
            />
          </Fieldset>

          <Footer>
            <SaveButton type="submit" aria-label="Close" disabled={loading}>
              Додати
            </SaveButton>
          </Footer>

          {error && <Error>{error.response?.data?.message || error.message}</Error>}
        </form>

        <DialogClose asChild>
          <IconButton>
            <MdClose />
          </IconButton>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default Upload
