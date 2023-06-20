import { getUserToken } from "@utils/magic"
import { useQuery } from "react-query"

const getMilestone = async (id: string) => {
  const token = await getUserToken()

  const body = JSON.stringify({ id })

  return fetch('/api/milestones/getMilestone', {
    method: 'POST',
    body: body,
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then((d) => d.json())
}

export const useMilestone = (id: string, config?: any) => {
  return useQuery(['milestone', id], () => getMilestone(id), { ...config })
}
