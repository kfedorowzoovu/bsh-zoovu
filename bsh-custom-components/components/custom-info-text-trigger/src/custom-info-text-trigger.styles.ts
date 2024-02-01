import { Classes, Styles } from 'jss';
import { CustomInfoTextTriggerConfiguration } from './custom-info-text-trigger.configuration';
import {
  createBorderStyle,
  createPaddingStyles,
  createFontStyle,
} from '@zoovu/theme-editor-parameter-types';

type InfoTextStyleNames = 'container' | 'icon' | 'tooltip' | 'tooltipArrow';

export const customInfoTextTriggerStyles: Styles<
  InfoTextStyleNames,
  CustomInfoTextTriggerConfiguration
> = {
  container: {
    display: 'inline-block',
    position: 'relative',
  },
  icon: ({
    iconBackground,
    iconHoverBackground,
    iconColor,
    width,
    iconBorder,
  }: CustomInfoTextTriggerConfiguration) => ({
    extend: [createBorderStyle(iconBorder)],
    backgroundColor: iconBackground,
    borderRadius: '50%',
    color: iconColor,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Times New Roman', sans-serif",
    fontSize: '14px',
    fontWeight: '900',
    height: `${width.value}${width.unit}`,
    marginLeft: '10px',
    outline: 0,
    position: 'relative',
    transition: 'all 0.3s ease',
    width: `${width.value}${width.unit}`,
    padding: 0,
    '&:hover': {
      backgroundColor: iconHoverBackground,
      '& .zv-answer-tooltip': {
        display: 'block',
      },
    },
  }),
  tooltip: ({
    tooltipBackground,
    tooltipBorder,
    tooltipPadding,
    tooltipFont,
    tooltipWidth,
  }: CustomInfoTextTriggerConfiguration) => ({
    extend: [
      createBorderStyle(tooltipBorder),
      createPaddingStyles(tooltipPadding),
      createFontStyle(tooltipFont),
    ],
    boxSizing: 'border-box',
    display: 'none',
    position: 'absolute',
    backgroundColor: tooltipBackground,
    bottom: 'calc(100% + 21px)',
    left: `-${tooltipWidth.value / 2 - 2}${tooltipWidth.unit}`,
    width: `${tooltipWidth.value}${tooltipWidth.unit}`,
  }),
  tooltipArrow: ({
    tooltipBackground,
    tooltipBorder,
  }: CustomInfoTextTriggerConfiguration) => ({
    width: 0,
    height: 0,
    borderStyle: tooltipBorder.lineStyle,
    position: 'absolute',
    zIndex: 1,
    borderWidth: ['15px', '15px', 0, '15px'],
    borderColor: `${tooltipBorder.color} transparent transparent`,
    bottom: '-15px',
    left: `calc(50% - 7px)`,
    '&:after': {
      content: "''",
      position: 'absolute',
      left: '-14px',
      top: '-15px',
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderWidth: ['14px', '14px', 0, '14px'],
      borderColor: `${tooltipBackground} transparent transparent transparent`,
    },
  }),
};

export type CustomInfoTextTriggerClasses = Classes<
  keyof typeof customInfoTextTriggerStyles
>;
