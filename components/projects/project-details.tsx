import { FunctionComponent } from 'react'

export const ProjectDetails: FunctionComponent<ProjectDetailsProps> = ({
  project,
}) => {
  const { _id, address, totalCost, milestones } = project

  return (
    <section id="project-details">
      <div className="mt-8 sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 lg:text-3xl">
            Project Details
          </h1>
        </div>
      </div>
      <div className="mt-8 overflow-hidden rounded-lg bg-white pl-4 shadow ring-1 ring-black ring-opacity-5 md:mx-0">
        <div className="py-6 sm:px-6 lg:grid lg:grid-cols-12">
          <div className="sm:flex lg:col-span-4">
            <div>
              <h3 className="text-bold font-medium text-gray-500">
                <span>Project Id</span>
              </h3>
              <p className="mt-2 mr-4 break-all text-gray-900">{_id}</p>
            </div>
          </div>

          <div className="sm:flex lg:col-span-4">
            <div className="mt-6 lg:mt-0">
              <h3 className="text-base font-medium text-gray-500">
                <span>Address</span>
              </h3>
              <p className="mt-2  text-gray-900">{address.street}</p>
              {address.additional && (
                <p className="text-gray-900">{address.additional}</p>
              )}
              <p className=" text-gray-900">
                {`${address.city}, ${address.state} ${address.zip}`}
              </p>
            </div>
          </div>

          <div className="sm:flex lg:col-span-2">
            <div className="mt-6 lg:mt-0">
              <h3 className="text-base font-medium text-gray-500">
                <span>Total</span>
              </h3>
              <p className="mt-2  text-gray-900">
                ${totalCost.toLocaleString('en-US')}
              </p>
            </div>
          </div>

          <div className="sm:flex lg:col-span-2">
            <div className="mt-6 lg:mt-0">
              <h3 className="text-bold font-medium text-gray-500">
                <span>Milestones</span>
              </h3>
              <p className="mt-2 text-gray-900">{milestones?.length}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface ProjectDetailsProps {
  project: Estimate
}
