import { SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import { MotionProps } from 'framer-motion';
import { Ref } from 'react';

type TagsTexts =
  | 'htmlFor'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'li'
  | 'a'
  | 'strong'
  | 'em'
  | 'i'
  | 'b'
  | 'u'
  | 's'
  | 'small'
  | 'big'
  | 'code'
  | 'pre'
  | 'blockquote'
  | 'hr'
  | 'br'
  | 'img'
  | 'table'
  | 'thead'
  | 'tbody'
  | 'tr'
  | 'td'
  | 'th'
  | 'ul'
  | 'ol'
  | 'dl'
  | 'dt'
  | 'dd'
  | 'q'
  | 'cite'
  | 'abbr'
  | 'acronym'
  | 'del'
  | 'ins'
  | 'sub'
  | 'sup'
  | 'var'
  | 'samp'
  | 'kbd'
  | 'tt'
  | 'bdo'
  | 'button'
  | 'label'
  | 'select'
  | 'option'
  | 'textarea'
  | 'form'
  | 'fieldset'
  | 'legend'
  | 'optgroup'
  | 'option'
  | 'select'
  | 'datalist'
  | 'keygen'
  | 'output'
  | 'progress'
  | 'meter'
  | 'details'
  | 'summary'
  | 'menu'
  | 'menuitem'
  | 'canvas'
  | 'caption'
  | 'col'
  | 'colgroup'
  | 'table'
  | 'tbody'
  | 'tfoot'
  | 'thead'
  | 'tr'
  | 'td'
  | 'th'
  | 'button'
  | 'datalist'
  | 'fieldset'
  | 'form'
  | 'input'
  | 'label'
  | 'legend'
  | 'meter'
  | 'optgroup'
  | 'option'
  | 'output'
  | 'progress'
  | 'select'
  | 'textarea'
  | 'details'
  | 'summary'
  | 'menu'
  | 'menuitem'
  | 'canvas'
  | 'caption'
  | 'col'
  | 'colgroup'
  | 'table'
  | 'tbody'
  | 'tfoot'
  | 'thead'
  | 'tr'
  | 'td'
  | 'th'
  | 'a'
  | 'b'
  | 'i'
  | 'em'
  | 'strong'
  | 'u'
  | 's'
  | 'small'
  | 'big'
  | 'code'
  | 'pre'
  | 'blockquote'
  | 'hr'
  | 'br'
  | 'img'
  | 'table';

export type AtomTextTypes = MotionProps & {
  color?: string;
  font?: string;
  as?: TagsTexts;
  href?: string;
  children?: React.ReactNode | string | number | boolean | null;
  align?: 'center' | 'left' | 'right' | 'inherit';
  padding?: string;
  margin?: string;
  width?: string;
  maxWidth?: string;
  fontSize?: string;
  textDecoration?: 'underline' | 'line-through' | 'none' | 'inherit';
  ref?: Ref<any>;
  fontWeight?:
    | 'bold'
    | 'normal'
    | 'light'
    | 'inherit'
    | 'semibold'
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900;
  cursor?:
    | 'pointer'
    | 'default'
    | 'inherit'
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
  htmlFor?: string;
  customCSS?: SerializedStyles;
  dangerouslySetInnerHTML?: { __html: string };
  opacity?: string;
};

export const AtomText = styled.span<AtomTextTypes>`
  line-height: 150%;
  font-family: ${(props) => props?.font || `'Open Sans', sans-serif`};
  color: ${(props) => props?.color || `#202124`};
  text-align: ${(props) => props?.align || `left`};
  padding: ${(props) => props?.padding || `0px 0px 0px 0px`};
  opacity: ${({ opacity }) => opacity ?? '1'};
  margin: ${(props) => props?.margin || `0px 0px 0px 0px`};
  width: ${(props) => props?.width || `max-content`};
  max-width: ${(props) => props?.maxWidth || `100%`};
  font-size: ${(props) => props?.fontSize || `14px`};
  font-weight: ${(props) => props?.fontWeight || 500};
  text-decoration: ${(props) => props?.textDecoration || `none`};
  cursor: ${(props) => props?.cursor || `pointer`};
  * {
    cursor: ${(props) => props?.cursor || `pointer`};
  }

  ${(props) => props?.customCSS};
`;
