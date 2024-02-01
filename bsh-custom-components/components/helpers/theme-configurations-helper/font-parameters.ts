// @ts-nocheck
import {
  color,
  font,
  numeric,
  object,
  ObjectOptions,
  select,
  SelectComponentParameterFormat,
  supportedFontWeightOptions,
} from '@zoovu/theme-editor-parameter-types';

export const fontParameters = (
  fontColor = 'black',
  fontSize = 14,
  fontWeight = 500,
  textAlign = 'center',
): ObjectOptions =>
  object(
    {
      fontFamily: font({
        label: 'Font family',
        default: {
          id: 'serif',
          name: 'Times New Roman / Times',
          type: 'FALLBACK',
          fontFamily: `"Times New Roman", Times, serif`,
        },
      }),
      fontWeight: select({
        options: supportedFontWeightOptions,
        default: fontWeight,
        label: 'Font weight',
      }),
      fontSize: numeric({
        default: { value: fontSize, unit: 'px' },
        label: 'Font size',
        units: ['px', 'em', 'rem'],
      }),
      color: color({ default: fontColor, label: 'Color' }),
      textAlign: select({
        options: ['left', 'center', 'right', 'justify'],
        default: textAlign,
        label: 'Alignment',
        format: SelectComponentParameterFormat.BUTTONS,
      }),
    },
    {
      label: 'Font',
    },
  );
