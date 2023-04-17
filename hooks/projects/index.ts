import { getUserToken } from "@utils/magic"
import { useQuery } from "react-query"

const getProjects = async () => {
  const token = await getUserToken()
  return fetch('/api/projects/getProjects', {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((d) => d.json())
}

export const useProjects = (config?: any) => {
  return useQuery('projects', getProjects, { ...config })
}
