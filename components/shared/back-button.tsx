import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'

export const BackButton: FunctionComponent = () => {
  const router = useRouter()

  return (
    <button className="flex space-x-2" onClick={() => router.back()}>
      <svg
        className="h-6 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
        enableBackground="new 0 0 1000 1000"
      >
        <g>
          <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)">
            <path d="M2531-1929L100-4360l2431-2431l2431-2431l455.8,455.8l455.8,455.8L4202.3-6639.1L2531-4967.8h3692.1H9900v607.8v607.7H6223.1H2531l1640.9,1640.9c896.5,896.5,1625.8,1701.7,1625.8,1792.9c0,151.9-623,820.4-774.9,820.4C4992.4,502,3868-592,2531-1929z" />
          </g>
        </g>
      </svg>
      <p>Back</p>
    </button>
  )
}
