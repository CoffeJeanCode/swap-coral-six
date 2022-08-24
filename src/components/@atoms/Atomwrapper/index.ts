import { css, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import { motion, MotionProps } from 'framer-motion';
import { PointerEventHandler, RefObject, UIEventHandler } from 'react';

export interface AtomWrapperTypes extends MotionProps {
  id?: string;
  onClick?: PointerEventHandler<any>;
  children?: React.ReactNode;
  gap?: string;
  backgroundImage?: string;
  maxHeight?: string;
  alignItems?: 'center' | 'flex-start' | 'flex-end';
  flexDirection?: 'column' | 'row' | 'row-reverse' | 'column-reverse';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  flexWrap?: 'nowrap' | 'wrap';
  mixBlendMode?:
    | 'normal'
    | 'multiply'
    | 'screen'
    | 'overlay'
    | 'darken'
    | 'lighten'
    | 'color-dodge'
    | 'color-burn'
    | 'hard-light'
    | 'soft-light'
    | 'difference'
    | 'exclusion'
    | 'hue'
    | 'saturation'
    | 'color'
    | 'luminosity';
  shadow?: boolean;
  onScroll?: UIEventHandler<HTMLDivElement | HTMLFormElement | HTMLLIElement>;
  maxWidth?: string;
  minHeight?: string;
  backgroundColor?: string;
  backgroundSize?: string;
  borderRadius?: string;
  margin?: string;
  padding?: string;
  border?: string;
  outline?: string;
  width?: string;
  height?: string;
  zIndex?: string;
  overflowX?: string;
  onSubmit?: () => void;
  position?: 'relative' | 'absolute' | 'fixed' | 'sticky';
  cursor?:
    | 'pointer'
    | 'default'
    | 'text'
    | 'wait'
    | 'move'
    | 'not-allowed'
    | 'help'
    | 'zoom-in'
    | 'zoom-out'
    | 'context-menu'
    | 'cell'
    | 'crosshair'
    | 'vertical-text'
    | 'alias'
    | 'progress'
    | 'no-drop'
    | 'copy'
    | 'grab'
    | 'grabbing'
    | 'all-scroll'
    | 'col-resize'
    | 'row-resize'
    | 'n-resize'
    | 'e-resize'
    | 's-resize'
    | 'w-resize'
    | 'ne-resize'
    | 'nw-resize'
    | 'se-resize'
    | 'sw-resize'
    | 'ew-resize'
    | 'ns-resize'
    | 'nesw-resize'
    | 'nwse-resize'
    | 'zoom-in'
    | 'zoom-out'
    | 'grab'
    | 'grabbing'
    | 'custom';
  asWrapper?: string;
  as?: 'div' | 'form' | 'section' | 'li';
  refObject?: RefObject<any>;
  customCSS?: SerializedStyles;
  onPointerDown?: PointerEventHandler<any>;
  dangerouslySetInnerHTML?: { __html: string };
}

const AtomWrapperStyled = (props: AtomWrapperTypes) => css`
  display: flex;
  width: ${props?.width || `100%`};
  max-width: ${props?.maxWidth || `100%`};
  border: ${props?.border || `none`};
  outline: ${props?.outline || `none`};
  min-height: ${props?.minHeight || `initial`};
  gap: ${props?.gap || `0`};
  max-height: ${props?.maxHeight || `initial`};
  height: ${props?.height || `max-content`};
  flex-direction: ${props?.flexDirection || `column`};
  justify-content: ${props?.justifyContent || `center`};
  align-items: ${props?.alignItems || `flex-start`};
  background-image: ${props?.backgroundImage};
  background-color: ${props?.backgroundColor || `transparent`};
  background-position: center;
  background-size: ${props?.backgroundSize || `cover`};
  padding: ${props?.padding || `0px 0px 0px 0px`};
  margin: ${props?.margin || `0px 0px 0px 0px`};
  flex-wrap: ${props?.flexWrap || `nowrap`};
  ${props?.shadow && `box-shadow: 0px 10px 20px #00000029`};
  border-radius: ${props?.borderRadius || `0px`};
  ${`overflow-x:${props?.overflowX}`};
  z-index: ${props?.zIndex || `0`};
  position: ${props?.position || `static`};
  cursor: ${props?.cursor || `default`};
  mix-blend-mode: ${props?.mixBlendMode || `normal`};

  ${props?.customCSS};
`;
export const AtomWrapperDefaultStyled = styled(motion.div)<AtomWrapperTypes>`
  ${(props) => AtomWrapperStyled(props)};
`;

export default AtomWrapperDefaultStyled;
