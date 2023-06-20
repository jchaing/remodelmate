import { useMutation } from 'react-query'

interface contactUsMessageProps {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
}

const contactUsMessage = async ({
  firstName,
  lastName,
  email,
  phone,
  message,
}: contactUsMessageProps) => {
  const body = JSON.stringify({
    firstName,
    lastName,
    email,
    phone,
    message,
  })

  const response = await fetch('/api/email/contactUs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  })

  const apiRes = await response.json()

  if (!response.ok) {
    console.error('Error:', apiRes)
    throw apiRes.error
  }

  return apiRes
}

export const useContactUsMessage = (config?: any) => {
  return useMutation(
    async (request: contactUsMessageProps) => await contactUsMessage(request),
    { ...config }
  )
}
