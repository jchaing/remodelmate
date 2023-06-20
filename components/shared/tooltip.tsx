export const Tooltip = ({ message }: {message: string}) => {
  const checkAndCloseDropDown = (e: any) => {
    const targetEl = e.currentTarget
    if (targetEl && targetEl.matches(':focus')) {
      setTimeout(function () {
        targetEl.blur()
      }, 0)
    }
  }

  return (
    <div className="dropdown dropdown-bottom">
      <label
        tabIndex={0}
        className="btn btn-circle btn-ghost btn-xs text-info"
        onMouseDown={checkAndCloseDropDown}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-4 w-4 stroke-sky-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </label>
      <div
        tabIndex={0}
        className="card compact dropdown-content bg-base-100 rounded-box w-64 shadow"
      >
        <div className="card-body">
          <ul className="pl-4 text-sm font-medium text-gray-500">
            <li>{message}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
