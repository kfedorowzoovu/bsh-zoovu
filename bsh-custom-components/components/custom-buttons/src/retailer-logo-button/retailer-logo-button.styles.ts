import { Styles } from 'jss';
import { RetailerLogosConfiguration } from '../custom-buttons.configuration';
import {
  createMarginStyles,
  createPaddingStyles,
  createBorderStyle,
  createFontStyle,
} from '@zoovu/theme-editor-parameter-types';

export const retailerLogoButtonStyle: Styles<
  | 'container'
  | 'heading'
  | 'dealerLogos'
  | 'dealerInfo'
  | 'dealerLogo'
  | 'arrow'
  | 'policyText'
> = {
  container: ({ margin, font }: RetailerLogosConfiguration) => ({
    extend: [createMarginStyles(margin), createFontStyle(font)],
  }),
  heading: ({ buyOnlinePadding }: RetailerLogosConfiguration) => ({
    extend: [createPaddingStyles(buyOnlinePadding)],
    textAlign: 'initial',
  }),
  dealerLogos: ({ horizontalMargin }: RetailerLogosConfiguration) => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    '& a:nth-child(2n+1)': {
      marginRight: `${horizontalMargin.value}px`,
    },
    '& a:nth-child(1)': {
      marginTop: 0,
    },
    '& a:nth-child(2)': {
      marginTop: 0,
    },
  }),
  dealerInfo: ({
    logoBorder,
    verticalMargin,
    horizontalMargin,
    logoPadding,
  }: RetailerLogosConfiguration) => ({
    extend: [createBorderStyle(logoBorder), createPaddingStyles(logoPadding)],
    boxSizing: 'border-box',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    width: `calc(50% - ${horizontalMargin.value / 2}px)`,
    marginTop: `${verticalMargin.value}px`,
  }),
  dealerLogo: () => ({
    width: '100%',
  }),
  arrow: ({
    arrowColor,
    arrowRightPadding,
    iconSize,
  }: RetailerLogosConfiguration) => ({
    border: `solid ${arrowColor}`,
    borderWidth: '0 1px 1px 0',
    position: 'absolute',
    transform: 'rotate(-45deg)',
    right: `${arrowRightPadding.value}px`,
    top: `calc(50% - ${iconSize.value / 2}px)`,
    width: `${iconSize.value}px`,
    height: `${iconSize.value}px`,
  }),
  policyText: ({ font, privacyPolicyPadding }: RetailerLogosConfiguration) => ({
    extend: [createFontStyle(font), createPaddingStyles(privacyPolicyPadding)],
    fontVariant: 'no-common-ligatures',
    textAlign: 'initial',
  }),
};
