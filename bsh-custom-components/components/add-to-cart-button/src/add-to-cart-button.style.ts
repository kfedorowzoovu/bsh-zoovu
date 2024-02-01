import { Classes, Styles } from 'jss';
import { AddToCartButtonConfiguration } from './add-to-cart-button.configuration';
import {
  createBorderStyle,
  createFontStyle,
  createMarginStyles,
  createPaddingStyles,
  NumericValueUtil,
} from '@zoovu/theme-editor-parameter-types';

const toString = NumericValueUtil.stringifyNumericValue;

export const addToCartButtonStyle: Styles<
  'container' | 'label',
  AddToCartButtonConfiguration
> = {
  container: ({
    states,
    padding,
    margin,
    width,
  }: AddToCartButtonConfiguration) => ({
    extend: [
      createBorderStyle(states.default.border),
      createFontStyle(states.default.font),
      createPaddingStyles(padding),
      createMarginStyles(margin),
    ],
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    width: toString(width),
    backgroundColor: states.default.backgroundColor,
    textAlign: 'center',
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
      outline: '2px solid',
      outlineColor: states.focus.border,
      backgroundColor: states.focus.backgroundColor,
    },
  }),
  label: () => ({
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
  }),
};

export type addToCartButtonStyle = Classes<keyof typeof addToCartButtonStyle>;
