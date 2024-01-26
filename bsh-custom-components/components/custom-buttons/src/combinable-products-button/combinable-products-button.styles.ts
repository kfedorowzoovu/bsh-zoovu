import { CombinableProductsButtonConfiguration } from '../custom-buttons.configuration';
import { ComponentStyleDefinition } from '@zoovu/runner-browser-api';
import {
  createMarginStyles,
  createPaddingStyles,
  createSizeStyles,
  createBorderStyle,
  createFontStyle,
} from '../../../helpers/helpers';

export const combinableProductsStyle: ComponentStyleDefinition = {
  container: ({
    states,
    padding,
    margin,
    size,
  }: CombinableProductsButtonConfiguration) => ({
    extend: [
      createBorderStyle(states.default.border),
      createFontStyle(states.default.font),
      createPaddingStyles(padding),
      createMarginStyles(margin),
      createSizeStyles(size),
    ],
    display: 'flex',
    textDecoration: states.default.font.textDecoration,
    cursor: 'pointer',
    backgroundColor: states.default.backgroundColor,
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
      outline: 'none',
      outlineColor: states.focus.border,
      backgroundColor: states.focus.backgroundColor,
    },
  }),
};
