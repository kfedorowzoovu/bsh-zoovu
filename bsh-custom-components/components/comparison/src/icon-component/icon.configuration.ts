import { ColorValue, NumericValue } from '@zoovu/theme-editor-parameter-types';
import { MarginConfiguration } from '../../../helpers/helpers';

export class IconConfiguration {
  svgUrl?: string = '';

  size?: NumericValue = {
    value: 100,
    unit: '%',
  };

  color?: ColorValue | null = '';

  margin?: MarginConfiguration = new MarginConfiguration();
}
