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
