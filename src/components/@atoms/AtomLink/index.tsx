import { FC, forwardRef, Ref } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import { AtomTextTypes } from '../AtomText';

const Animation = {
  whileHover: { scale: 1.02, transition: { duration: 0.3 } },
  whileTap: { scale: 0.95, opacity: 0.8 }
};
export type AtomLinkProps = AtomTextTypes & {
  link?: string;
  href?: string;
  ref?: Ref<HTMLAnchorElement>;
  target?: string;
};

export const TextStyle = (props: AtomTextTypes) => css`
  line-height: 150%;
  font-family: ${props?.font || `'Montserrat', sans-serif`};
  color: ${props?.color || `#202124`};
  text-align: ${props?.align || `left`};
  padding: ${props?.padding || `0px 0px 0px 0px`};
  margin: ${props?.margin || `0px 0px 0px 0px`};
  width: ${props?.width || `max-content`};
  max-width: ${props?.maxWidth || `100%`};
  font-size: ${props?.fontSize || `14px`};
  font-weight: ${props?.fontWeight || 500};
  text-decoration: ${props?.textDecoration || `none`};
  cursor: ${props?.cursor || `pointer`};
  * {
    cursor: ${props?.cursor || `pointer`};
  }

  ${props?.customCSS};
`;
export const TextStyledA = styled(motion.a)<AtomTextTypes>`
  ${(props) => TextStyle(props)}
`;

const LinkForewardRef = forwardRef<HTMLAnchorElement, AtomLinkProps>(
  (props, ref) => {
    const { children } = props;
    return (
      <TextStyledA
        {...Animation}
        fontWeight="bold"
        cursor="pointer"
        {...props}
        ref={ref}
      >
        {children}
      </TextStyledA>
    );
  }
);

LinkForewardRef.displayName = 'LinkForewardRef';

const Link: FC<AtomLinkProps> = (props) => {
  const { children, link } = props;
  return link ? (
    <NextLink href={link} passHref>
      <LinkForewardRef {...props}>{children}</LinkForewardRef>
    </NextLink>
  ) : (
    <TextStyledA
      {...Animation}
      fontWeight="bold"
      cursor="pointer"
      target="_blank"
      {...props}
    >
      {children}
    </TextStyledA>
  );
};

export default Link;
