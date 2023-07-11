import { getUserToken } from "@utils/magic"
import { useMutation } from "react-query"

const generateCode = async () => {
  const token = await getUserToken()

  const response = await fetch("/api/referral/generateCode", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const apiRes = await response.json()

  if (!response.ok) {
    console.error("Error:", apiRes)
    throw apiRes.error
  }

  return apiRes
}

export const useGenerateCode = (config?: any) => {
  return useMutation(async () => await generateCode(), { ...config })
}

/******************************************************************************/

const validateCode = async (referralCode: string) => {
  const body = JSON.stringify({ referralCode })

  const response = await fetch("/api/referral/validateCode", {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
  })

  const apiRes = await response.json()

  if (!response.ok) {
    console.error("Error:", apiRes)
    throw apiRes.error
  }

  return apiRes
}

export const useValidateCode = (config?: any) => {
  return useMutation(async (referralCode: string) => await validateCode(referralCode), { ...config })
}

/******************************************************************************/

const validateOwnCode = async (referralCode: string) => {
  const token = await getUserToken()

  const body = JSON.stringify({ referralCode })

  const response = await fetch("/api/referral/validateOwnCode", {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  const apiRes = await response.json()

  if (!response.ok) {
    console.error("Error:", apiRes)
    throw apiRes.error
  }

  return apiRes
}

export const useValidateOwnCode = (config?: any) => {
  return useMutation(async (referralCode: string) => await validateOwnCode(referralCode), { ...config })
}
