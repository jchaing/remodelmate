interface CheckRequest {
  phone: string
}

export const checkUserExists = async ({ phone }: CheckRequest) => {
  const body = JSON.stringify({ phone })

  try {
    const res = await fetch('/api/auth/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    })

    const userExists = await res.json()

    console.log({ res: userExists.success })

    return userExists.success
  } catch (error) {
    return false
  }
}
