import { SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import { motion, MotionProps } from 'framer-motion';
import { FC, PointerEventHandler, useEffect, useState } from 'react';

export interface AtomIconTypes extends MotionProps {
  icon?: string;
  url?: string;
  color?: string;
  width?: string;
  height?: string;
  customCSS?: SerializedStyles;
  className?: string;
  onPointerDown?: PointerEventHandler<HTMLDivElement>;
}

export const IconContainer = styled(motion.div)<AtomIconTypes>`
  display: flex;
  width: max-content;
  height: max-content;
  svg {
    width: ${({ width }) => width || `34px`};
    height: ${({ height }) => height || `34px`};
    path {
      fill: ${({ color }) => color || `#000`}!important;
    }
    polygon {
      fill: ${({ color }) => color || `#000`}!important;
    }
    circle {
      fill: ${({ color }) => color || `#000`}!important;
    }
  }

  ${({ customCSS }) => customCSS};
`;

export const PlaceholderIcon = styled(motion.div)<AtomIconTypes>`
  width: ${({ width }) => width || `34px`};
  height: ${({ height }) => height || `34px`};
`;

const AtomIcon: FC<AtomIconTypes> = (props) => {
  const { icon } = props;
  const [getIcon, setGetIcon] = useState(``);

  useEffect(() => {
    const fetchIcon = () =>
      fetch(
        icon ||
          'https://res.cloudinary.com/whil/image/upload/v1661402006/Group_101_a4dcb6.svg'
      )
        .then((response) => response.text())
        .then((res) => res && setGetIcon(res));
    fetchIcon();
    return () => {
      setGetIcon('');
    };
  }, [icon]);

  return getIcon ? (
    <IconContainer
      {...props}
      dangerouslySetInnerHTML={{
        __html: getIcon
      }}
    />
  ) : (
    <PlaceholderIcon {...props} />
  );
};

export default AtomIcon;
