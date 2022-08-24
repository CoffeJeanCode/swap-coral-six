import { SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import { motion, MotionProps } from 'framer-motion';
import NextImage from 'next/image';
import { FC } from 'react';
export interface AtomNextImageTypes {
  src: string;
  alt: string;
}

export interface AtomImageTypes extends MotionProps {
  width?: string;
  maxWidth?: string;
  height?: string;
  maxHeight?: string;
  objectFit?: `fill` | `contain` | `cover` | `none` | `scale-down`;
  margin?: string;
  position?:
    | `absolute`
    | `relative`
    | `static`
    | `sticky`
    | `fixed`
    | `initial`;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  objectPosition?: string;
  zIndex?: string;
  customCSS?: SerializedStyles;
}

export interface AtomImageProps extends AtomNextImageTypes, AtomImageTypes {
  isNextImage?: boolean;
}

export const AtomImageStyled = styled(motion.div)<AtomImageTypes>`
  width: ${({ width }) => width || `100%`};
  max-width: ${({ maxWidth }) => maxWidth || `initial`};
  height: ${({ height }) => height || `100%`};
  max-height: ${({ maxHeight }) => maxHeight || `initial`};
  margin: ${({ margin }) => margin || `0`};
  position: ${({ position }) => position || `initial`};
  left: ${({ left }) => left || `initial`};
  top: ${({ top }) => top || `initial`};
  right: ${({ right }) => right || `initial`};
  bottom: ${({ bottom }) => bottom || `initial`};
  img {
    object-fit: ${({ objectFit }) => objectFit || `cover`};
    object-position: ${({ objectPosition }) =>
      objectPosition || `center center`};
  }
  z-index: ${({ zIndex }) => zIndex || `initial`};

  ${({ customCSS }) => customCSS};
`;

export const AtomImageWrapperStyled = styled.div<AtomImageTypes>`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const AtomImageImgStyled = styled.img<AtomImageTypes>`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Image: FC<AtomImageProps> = (props) => {
  const { src, alt, isNextImage } = props;
  return (
    <AtomImageStyled {...{ ...props, src: undefined }}>
      {isNextImage ? (
        <AtomImageWrapperStyled>
          <NextImage
            src={src}
            alt={`${alt}image`}
            layout="fill"
            placeholder="blur"
            blurDataURL={src}
          />
        </AtomImageWrapperStyled>
      ) : (
        <AtomImageImgStyled src={src} alt={alt} />
      )}
    </AtomImageStyled>
  );
};

export default Image;
