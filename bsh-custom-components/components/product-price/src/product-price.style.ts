import { ComponentStyleDefinition } from '@zoovu/runner-browser-api';
import { ProductPriceConfiguration } from './product-price.configuration';
import {
  createMarginStyles,
  createFontStyle,
  createPaddingStyles,
} from '@zoovu/theme-editor-parameter-types';

export const productPriceStyle: ComponentStyleDefinition = {
  container: (config: ProductPriceConfiguration) => ({
    extend: createMarginStyles(config.margin),
    width: `${config.width.value}${config.width.unit}`,
  }),
  priceContainer: (config: ProductPriceConfiguration) => ({
    extend: createPaddingStyles(config.pricePadding),
  }),
  originalPriceElement: (config: ProductPriceConfiguration) => ({
    extend: createFontStyle(config.originalPriceFont),
    textDecoration: config.crossedOutOriginalPrice ? 'line-through' : 'none',
  }),
  discountPriceElement: (config: ProductPriceConfiguration) => ({
    extend: createFontStyle(config.discountPriceFont),
  }),
  priceElement: (config: ProductPriceConfiguration) => ({
    extend: createFontStyle(config.priceFont),
  }),
  descriptionContainer: (config: ProductPriceConfiguration) => ({
    extend: [
      createFontStyle(config.descriptionFont),
      createPaddingStyles(config.descriptionPadding),
    ],
  }),
};
