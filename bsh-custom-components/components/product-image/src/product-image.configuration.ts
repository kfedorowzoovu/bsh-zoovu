import {
  BackgroundFitOptionsValues,
  BorderConfiguration,
  MarginConfiguration,
  PaddingConfiguration,
} from '../../helpers/helpers';
import { NumericValue } from '@zoovu/theme-editor-parameter-types';

export class ProductImageConfiguration {
  campaignIconsColumn = '';
  containerWidth: NumericValue = { value: 0 };
  padding: PaddingConfiguration = new PaddingConfiguration();
  margin: MarginConfiguration = new MarginConfiguration();
  width: NumericValue = { value: 0 };
  height: NumericValue = { value: 0 };
  fit: BackgroundFitOptionsValues = BackgroundFitOptionsValues.COVER;
  border: BorderConfiguration = new BorderConfiguration();
  isImagePdpLink: boolean = false;
  iconListMargin: MarginConfiguration = new MarginConfiguration();
  iconWidth: NumericValue = { value: 0 };
  iconHeight: NumericValue = { value: 0 };
  iconPadding: PaddingConfiguration = new PaddingConfiguration();
  iconBorder: BorderConfiguration = new BorderConfiguration();
  iconJustifyContent: {
    value:
      | 'flex-start'
      | 'flex-end'
      | 'center'
      | 'space-between'
      | 'space-around'
      | 'space-evenly';
  } = { value: 'flex-start' };
}
