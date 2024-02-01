import {
  color,
  numeric,
  object,
  ObjectOptions,
  EmbeddedComponentParameterFormat,
  image,
  ImageComponentParameterFormat,
} from '@zoovu/theme-editor-parameter-types';

export const icon = (
  svg = '',
  value = 14,
  defaultColor = 'black',
): ObjectOptions =>
  object(
    {
      svgUrl: image({
        default: svg,
        label: 'SvgURL',
        format: ImageComponentParameterFormat.ICON_LIBRARY,
      }),
      size: numeric({
        default: { value: value, unit: 'px' },
        label: 'Size',
        units: ['px', '%', 'rem', 'em'],
      }),
      color: color({ default: defaultColor, label: 'Color' }),
    },
    {
      label: 'Icon',
      addSeparator: true,
      format: EmbeddedComponentParameterFormat.ACCORDION,
    },
  );
