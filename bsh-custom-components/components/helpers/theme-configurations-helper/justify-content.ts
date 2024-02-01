import {
  object,
  ObjectOptions,
  select,
} from '@zoovu/theme-editor-parameter-types';

export const justifyContent = (
  defaultValue: unknown = 'flex-start',
): ObjectOptions =>
  object(
    {
      value: select({
        options: [
          'flex-start',
          'center',
          'flex-end',
          'space-between',
          'space-around',
        ],
        default: defaultValue,
        label: 'Justify Content',
      }),
    },
    { label: 'Justify Content' },
  );
