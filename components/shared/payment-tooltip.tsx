import clsx from 'clsx'
import { FunctionComponent, ReactNode, useRef } from 'react'

interface ToolTipProps {
  children: ReactNode
  text?: string
}

export const PaymentToolTip: FunctionComponent<ToolTipProps> = ({ children, text }) => {
  const tooltipRef = useRef<HTMLSpanElement>(null)
  const container = useRef<HTMLDivElement>(null)

  const toolTipClasses = clsx(
    'invisible absolute z-999 whitespace-nowrap rounded',
    'bg-gray-900 py-1 px-2 text-xs text-white opacity-0',
    'group-hover:visible group-hover:-translate-y-1/2 group-hover:opacity-100',
    'group-hover:transition group-hover:duration-700 group-hover:ease-in-out'
  )

  const handleMouseEnter = () => {
    // INFO: If you want to use the mouse position to position the tooltip
    // const handleMouseEnter = (props) => {
    // const { clientX, clientY } = props

    if (!tooltipRef.current || !container.current) return

    const { top, right, bottom, left, x, y } =
      container.current.getBoundingClientRect()

    tooltipRef.current.style.top = `${y - y + 52}px`
  }

  return (
    <div
      ref={container}
      onMouseEnter={handleMouseEnter}
      className="group-hover:vi group relative inline-block"
    >
      {children}
      {text ? (
        <span
          ref={tooltipRef}
          className={toolTipClasses}
          id="i-am-the-tool-tip-span"
        >
          {text}
        </span>
      ) : null}
    </div>
  )
}
