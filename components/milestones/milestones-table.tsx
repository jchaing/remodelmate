import { ContractorModal } from '@components/shared'
import { ROUTE_MAP } from '@utils/routes'
import clsx from 'clsx'
import Link from 'next/link'

enum MilestoneStatus {
  NOT_STARTED = 'notStarted',
  IN_PROGRESS = 'inProgress',
  PENDING_REVIEW = 'pendingReview',
  REJECTED = 'rejected',
  APPROVED = 'approved',
}

const getText = {
  [MilestoneStatus.NOT_STARTED]: 'Not Started',
  [MilestoneStatus.IN_PROGRESS]: 'In Progress',
  [MilestoneStatus.PENDING_REVIEW]: 'Pending',
  [MilestoneStatus.REJECTED]: 'Rejected',
  [MilestoneStatus.APPROVED]: 'Approved',
}

const getColor = {
  [MilestoneStatus.NOT_STARTED]: 'bg-trueGray-500 border-trueGray-500',
  [MilestoneStatus.IN_PROGRESS]: 'bg-yellow-500 border-yellow-500',
  [MilestoneStatus.PENDING_REVIEW]: 'bg-blue-500 border-blue-500',
  [MilestoneStatus.REJECTED]: 'bg-red-500 border-red-500',
  [MilestoneStatus.APPROVED]: 'bg-emerald-500 border-emerald-500',
}

const getAction = {
  [MilestoneStatus.NOT_STARTED]: 'View Details',
  [MilestoneStatus.IN_PROGRESS]: 'View Details',
  [MilestoneStatus.PENDING_REVIEW]: 'Review & Pay',
  [MilestoneStatus.REJECTED]: 'Under Review',
  [MilestoneStatus.APPROVED]: 'View Receipt',
}

export const MilestonesTable = ({ milestones }) => (
  <section id="milestones-table">
    <div className="mt-8 sm:flex sm:items-center">
      <div className="sm:flex-auto">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 lg:text-3xl">
          Milestones
        </h1>
      </div>
    </div>

    <div className="mt-8 overflow-hidden rounded-lg shadow ring-1 ring-black ring-opacity-5 md:mx-0">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
            >
              Name
            </th>

            <th
              scope="col"
              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
            >
              Price
            </th>

            <th
              scope="col"
              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
            >
              Status
            </th>

            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Contractor
            </th>

            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">Action</span>
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 bg-white">
          {milestones.map((milestone: any) => {
            const { _id, name, price, _contractor, _project } = milestone

            const text = getText[milestone.status as MilestoneStatus]
            const color = getColor[milestone.status as MilestoneStatus]
            const action = getAction[milestone.status as MilestoneStatus]
            const styles = 'badge w-24 p-3 mt-1 sm:w-28'

            return (
              <tr key={_id}>
                <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {name}
                  <dl className="font-normal lg:hidden">
                    <dt className="sr-only">Price</dt>
                    <dd className="mt-1 truncate text-gray-700">
                      ${price.toLocaleString('en-US')}
                    </dd>

                    <dt className="sr-only sm:hidden">Status</dt>
                    <dd className="mt-1 truncate text-gray-500 md:hidden">
                      <div className={clsx(color, styles)}>{text}</div>
                    </dd>
                  </dl>
                </td>

                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  ${price.toLocaleString('en-US')}
                </td>

                <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">
                  <div className={clsx(color, styles)}>{text}</div>
                </td>

                <td className="justify-start px-3 py-4 text-sm text-gray-500">
                  <ContractorModal contractor={_contractor} />
                </td>

                <td className="py-4 pl-3 pr-4 text-sm font-medium">
                  <Link
                    href={`${ROUTE_MAP.dashboard.projectDetails}/${_project}/${_id}`}
                    legacyBehavior
                  >
                    <span className="text-indigo-600 hover:cursor-pointer hover:text-indigo-900">
                      {action}
                    </span>
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  </section>
)
