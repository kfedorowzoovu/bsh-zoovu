import {
  color,
  numeric,
  object,
  ObjectOptions,
  select,
  ExpressionComparator,
  SelectComponentParameterFormat,
} from '@zoovu/theme-editor-parameter-types';

export const border = (
  label = 'Border',
  lineStyle = 'none',
  borderColor = 'black',
  width = 0,
): ObjectOptions =>
  object(
    {
      lineStyle: select({
        options: ['none', 'solid', 'dashed', 'dotted'],
        default: lineStyle,
        label: 'Line style',
        format: SelectComponentParameterFormat.BUTTONS,
      }),
      width: numeric({
        default: { value: width, unit: 'px' },
        label: 'Width',
        units: ['px', 'em', 'rem'],
        displayIf: {
          expressions: [
            {
              path: 'lineStyle',
              comparator: ExpressionComparator.NOT_EQUALS,
              value: 'none',
            },
          ],
        },
      }),
      color: color({
        default: borderColor,
        label: 'Color',
        displayIf: {
          expressions: [
            {
              path: 'lineStyle',
              comparator: ExpressionComparator.NOT_EQUALS,
              value: 'none',
            },
          ],
        },
      }),
    },
    {
      label,
    },
  );
