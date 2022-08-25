import { FC, ReactNode } from 'react';
import PublicLayout from './public';

const Layouts = {
  public: PublicLayout,
  default: ({ children }: { children: ReactNode }) => <>{children}</>
};

export type PropsLayout = {
  children?: ReactNode;
  Layout?: keyof typeof Layouts;
  SEO?: {
    title?: string;
    image?: string;
    keywords?: string[];
    description?: string;
  };
};

const LayoutComponent: FC<PropsLayout> = (props) => {
  const { Layout, children } = props;
  const GetLayout = Layouts[Layout || 'default'];
  return <GetLayout {...props}>{children}</GetLayout>;
};

export default LayoutComponent;
