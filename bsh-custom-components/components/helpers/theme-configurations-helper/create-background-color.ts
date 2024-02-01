import { color } from '@zoovu/theme-editor-parameter-types';

export const createBackgroundColor = (defaultValue = '#0070D8') => {
  return color({
    default: defaultValue,
    label: 'Background color',
  });
};
