import { Classes, Styles } from 'jss';
import {
  createBorderStyle,
  createFontStyle,
  createMarginStyles,
  createPaddingStyles,
  NumericValueUtil,
} from '@zoovu/theme-editor-parameter-types';
import { LoadMoreConfiguration } from './load-more.configuration';

const toString = NumericValueUtil.stringifyNumericValue;

export const loadMoreStyle: Styles<'container'> = {
  container: ({ states, padding, margin, width }: LoadMoreConfiguration) => ({
    extend: [
      createBorderStyle(states.default.border),
      createFontStyle(states.default.font),
      createPaddingStyles(padding),
      createMarginStyles(margin),
    ],
    cursor: 'pointer',
    width: toString(width),
    backgroundColor: states.default.backgroundColor,
    color: states.default.font.color,
    '&:hover': {
      extend: [
        createBorderStyle(states.hover.border),
        createFontStyle(states.hover.font),
      ],
      color: states.hover.font.color,
      backgroundColor: states.hover.backgroundColor,
    },
    '&:active': {
      extend: [
        createBorderStyle(states.active.border),
        createFontStyle(states.active.font),
      ],
      color: states.active.font.color,
      backgroundColor: states.active.backgroundColor,
    },
    '&:focus': {
      extend: [
        createBorderStyle(states.focus.border),
        createFontStyle(states.focus.font),
      ],
      color: states.focus.font.color,
      outlineColor: states.focus.border,
      backgroundColor: states.focus.backgroundColor,
    },
  }),
};

export type loadMoreStyle = Classes<keyof typeof loadMoreStyle>;
