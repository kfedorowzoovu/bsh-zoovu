import { MarginConfiguration, FontConfiguration, NumericValue, PaddingConfiguration } from "../../helpers/helpers";

export class ProductPriceConfiguration {
  hideCurrency = false;
  showCommaDash = false;
  originalPriceFont: FontConfiguration = new FontConfiguration();
  crossedOutOriginalPrice = true;
  discountPriceFont: FontConfiguration = new FontConfiguration();
  priceFont: FontConfiguration = new FontConfiguration();
  pricePadding: PaddingConfiguration = new PaddingConfiguration();
  originalPriceColumnName = "";
  rrpText = "";
  shopPriceDescription = "";
  descriptionFont: FontConfiguration = new FontConfiguration();
  descriptionPadding: PaddingConfiguration = new PaddingConfiguration();
  margin: MarginConfiguration = new MarginConfiguration();
  width: NumericValue = { value: 150 };
}
