
import { Navigation } from '../navigation'
import { FunctionComponent, ReactNode } from 'react'

export const Layout: FunctionComponent<LayoutProp> = ({ children }) => {
  return (
    <>
      <Navigation>{children}</Navigation>
    </>
  )
}

interface LayoutProp {
  children: ReactNode
}