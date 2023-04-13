import { useMutation } from "react-query"

interface addHomeownerProps {
  firstName: string
  lastName: string
  email: string
  phone: string
}

const addHomeowner = async ({
  firstName,
  lastName,
  email,
  phone,
}: addHomeownerProps) => {
  const body = JSON.stringify({ firstName, lastName, email, phone })

  const response = await fetch('/api/homeowner/addHomeowner', {
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
}

export const useAddHomeowner = (config?: any) => {
  return useMutation(
    async (request: addHomeownerProps) => await addHomeowner(request),
    { ...config }
  )
}

/******************************************************************************/