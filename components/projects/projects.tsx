import { ROUTE_MAP } from "@utils/routes"
import Link from "next/link"
import { FunctionComponent } from "react"

export const Projects: FunctionComponent<ProjectsProps> = ({ projectsData }) => {
  return (
    <>
      <div className="mt-8 sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 lg:text-3xl">
            Projects
          </h1>
        </div>
      </div>

      <div className="mt-8 mb-1 overflow-hidden rounded-lg shadow ring-1 ring-black ring-opacity-5 md:mx-0">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Projects
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Addresses
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Total
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Milestones
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">View Project</span>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {projectsData.map((project) => {
              const {
                _id,
                totalCost,
                milestones,
                address: { street, city, state, zip },
              } = project

              const address = `${street}, ${city} ${state} ${zip}`

              return (
                <tr key={_id}>
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                    {_id}
                    <dl className="font-normal lg:hidden">
                      <dt className="sr-only">Address</dt>
                      <dd className="mt-1 truncate text-gray-700">{address}</dd>
                      <dt className="sr-only sm:hidden">Total</dt>
                      <dd className="mt-1 truncate text-gray-500 lg:hidden">
                        ${totalCost.toLocaleString()}
                      </dd>
                    </dl>
                  </td>

                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    {address}
                  </td>

                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    ${totalCost.toLocaleString()}
                  </td>

                  <td className="px-3 py-4 text-sm text-gray-500">
                    {milestones.length}
                  </td>

                  <td className="py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                    {project.activated ? (
                      <Link
                        href={`${ROUTE_MAP.dashboard.projectDetails}/${_id}`}
                        legacyBehavior
                      >
                        <span className="text-start text-indigo-600 hover:cursor-pointer hover:text-indigo-900">
                          View Details
                        </span>
                      </Link>
                    ) : (
                      <Link href={`/projects/book/${_id}`} legacyBehavior>
                        <button
                          type="button"
                          className="text-start text-indigo-600 hover:cursor-pointer hover:text-indigo-900"
                          // onClick={() => {
                          //   trackEvent({
                          //     name: ESTIMATE_BUILDER_EVENTS.ESTIMATE_EVENT_ACTION,
                          //     props: {
                          //       type: ESTIMATE_BUILDER_EVENTS.STEP_REVIEW_AND_BOOK,
                          //       projectId: _id,
                          //     },
                          //   })
                          // }}
                        >
                          Book Project
                        </button>
                      </Link>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

interface ProjectsProps {
  projectsData: Estimate[]
}