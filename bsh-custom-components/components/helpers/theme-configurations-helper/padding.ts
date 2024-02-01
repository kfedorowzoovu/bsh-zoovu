import {
  numeric,
  object,
  ObjectOptions,
  EmbeddedComponentParameterFormat,
} from '@zoovu/theme-editor-parameter-types';

export const padding = (
  top = 0,
  right = 0,
  bottom = 0,
  left = 0,
  unit = 'px',
): ObjectOptions =>
  object(
    {
      top: numeric({
        default: { value: top, unit },
        label: 'Top',
        units: ['px', '%', 'rem', 'em'],
      }),
      right: numeric({
        default: { value: right, unit },
        label: 'Right',
        units: ['px', '%', 'rem', 'em'],
      }),
      bottom: numeric({
        default: { value: bottom, unit },
        label: 'Bottom',
        units: ['px', '%', 'rem', 'em'],
      }),
      left: numeric({
        default: { value: left, unit },
        label: 'Left',
        units: ['px', '%', 'rem', 'em'],
      }),
    },
    {
      label: 'Padding',
      format: EmbeddedComponentParameterFormat.NUMERIC_VALUES_GROUP,
    },
  );
