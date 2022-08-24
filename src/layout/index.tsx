import { FC, ReactNode } from 'react'

const Layouts = {
//   swap: SwapUser,
//   public: Public,
  default: ({ children }: { children: ReactNode }) => <>{children}</>,
}

export type PropsLayout = {
  children?: ReactNode
  Layout?: keyof typeof Layouts
  SEO?: {
    title?: string
    image?: string
    keywords?: string[]
    description?: string
  }
}

const Layout: FC<PropsLayout> = (props) => {
  const { Layout, children } = props
  const GetLayout = Layouts[Layout || 'default']
  return <GetLayout {...props}>{children}</GetLayout>
}

export default Layout