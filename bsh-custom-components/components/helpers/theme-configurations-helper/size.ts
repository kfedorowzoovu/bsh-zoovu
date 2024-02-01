import {
  numeric,
  object,
  ObjectOptions,
  EmbeddedComponentParameterFormat,
} from '@zoovu/theme-editor-parameter-types';
export const size = (
  height = 0,
  width = 0,
  heightUnit = '%',
  widthUnit = '%',
  label = 'Size',
): ObjectOptions =>
  object(
    {
      width: numeric({
        default: { value: width, unit: widthUnit },
        label: 'Width',
        units: ['px', 'em', 'rem', '%', 'auto'],
      }),
      height: numeric({
        default: { value: height, unit: heightUnit },
        label: 'Height',
        units: ['px', 'em', 'rem', '%', 'auto'],
      }),
    },
    {
      label: label,
      format: EmbeddedComponentParameterFormat.ROW,
    },
  );
