import { MarketplaceComponentParameterType } from '@zoovu/theme-editor-parameter-types';

export enum BackgroundFitOptionsValues {
  CONTAIN = 'contain',
  COVER = 'cover',
}

export const backgroundFitOptions: any = {
  label: 'Object fit',
  type: MarketplaceComponentParameterType.SELECT,
  default: BackgroundFitOptionsValues.COVER,
  options: [
    BackgroundFitOptionsValues.CONTAIN,
    BackgroundFitOptionsValues.COVER,
  ],
};
