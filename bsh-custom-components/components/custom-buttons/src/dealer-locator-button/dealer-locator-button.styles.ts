import { ComponentStyleDefinition } from '@zoovu/runner-browser-api';
import { DealerLocatorButtonConfiguration } from '../custom-buttons.configuration';
import {
  createMarginStyles,
  createPaddingStyles,
  createSizeStyles,
  createBorderStyle,
  createFontStyle,
} from '../../../helpers/helpers';

export const dealerLocatorButtonStyle: ComponentStyleDefinition = {
  container: ({
    states,
    padding,
    margin,
    size,
    icon,
    iconSize,
    iconMargin,
  }: DealerLocatorButtonConfiguration) => ({
    extend: [
      createBorderStyle(states.default.border),
      createFontStyle(states.default.font),
      createPaddingStyles(padding),
      createMarginStyles(margin),
      createSizeStyles(size),
    ],
    display: 'block',
    cursor: 'pointer',
    backgroundColor: states.default.backgroundColor,
    textAlign: 'center',
    textDecoration: 'none',
    '&::before': {
      extend: [createSizeStyles(iconSize), createMarginStyles(iconMargin)],
      content: "''",
      backgroundImage: `url("${icon}")`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
    },
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
};
