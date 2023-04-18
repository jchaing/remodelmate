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

/******************************************************************************/

const getProject = async (id: string) => {
  const token = await getUserToken()

  const body = JSON.stringify({ id })

  return fetch('/api/projects/getProject', {
    method: 'POST',
    body: body,
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then((d) => d.json())
}

export const useProject = (id: string, config?: any) => {
  return useQuery(['project', id], () => getProject(id), { ...config })
}
