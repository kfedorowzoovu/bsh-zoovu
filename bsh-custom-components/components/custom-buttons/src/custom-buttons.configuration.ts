import {
  SizeValuesConfiguration,
  PaddingConfiguration,
  MarginConfiguration,
  FontConfiguration,
  FontWithoutAlignConfiguration,
  BorderConfiguration,
  NumericValue,
} from '@zoovu/theme-editor-parameter-types';
import { ConfigurationWithStates } from '../../helpers/configurations-helper';

export const configuratorButtonStateValues = [
  'default',
  'hover',
  'active',
  'focus',
];
export type configuratorButtonStateTypes =
  | 'default'
  | 'hover'
  | 'active'
  | 'focus';

export class ConfiguratorBasicButtonDefaultConfiguration {
  public backgroundColor = '';
  public font: FontWithoutAlignConfiguration =
    new FontWithoutAlignConfiguration();
  public border: BorderConfiguration = new BorderConfiguration();
  public textAlign: BorderConfiguration = new BorderConfiguration();
}

export class FontWithTextDecorationAndAlignConfiguration extends FontConfiguration {
  public textAlign: 'left' | 'center' | 'right' | 'justify' = 'center';
  public textDecoration: 'underline' | 'none' = 'underline';
}

class ConfiguratorCombinableProductsButtonConfiguration {
  public backgroundColor = '';
  public font: FontWithTextDecorationAndAlignConfiguration =
    new FontWithTextDecorationAndAlignConfiguration();
  public border: BorderConfiguration = new BorderConfiguration();
  public textAlign = 'center';
  public textDecoration = 'underline';
}

class CombinableProductsSizeValuesConfiguration {
  public width: NumericValue = { value: 100, unit: '%' };
  public height: NumericValue = { value: 100, unit: 'auto' };
}

export const createConfigurationInstanceWithStates = <
  CustomConfigurationWithStates extends ConfigurationWithStates,
>(
  states: string[],
  ConfigurationConstructor: new () => unknown,
): CustomConfigurationWithStates => {
  const classPlaceholder = {} as CustomConfigurationWithStates;
  states.forEach((state) => {
    classPlaceholder[state] = new ConfigurationConstructor();
  });

  return classPlaceholder;
};

export class BuyOnlineOverlayConfiguration {
  rootColor = '';
  buyButton = '';
  inStock = '';
  outOfStock = '';
  visitRetailerShop = '';
  close = '';
  headline = '';
  privacy = '';
  privacyLink = '';
  tabCaption = '';
  panelHeadline = '';
  showMore = '';
}
export class BuyOnlineButtonConfiguration {
  buyOnlineText = '';
  icon = '';
  iconSize: SizeValuesConfiguration = new SizeValuesConfiguration();
  iconMargin: MarginConfiguration = new MarginConfiguration();
  public states: ConfigurationWithStates<
    configuratorButtonStateTypes,
    ConfiguratorBasicButtonDefaultConfiguration
  > = createConfigurationInstanceWithStates(
    configuratorButtonStateValues,
    ConfiguratorBasicButtonDefaultConfiguration,
  );
  margin: MarginConfiguration = new MarginConfiguration();
  padding: PaddingConfiguration = new PaddingConfiguration();
  size: SizeValuesConfiguration = new SizeValuesConfiguration();
  buyOnlineOverlay: BuyOnlineOverlayConfiguration =
    new BuyOnlineOverlayConfiguration();
}

export class CustomProductPDPButtoConfiguration {
  buttonVisiblityState = false;
  attributeName = '';
  customButtonLabel = '';
  icon = '';
  iconSize: SizeValuesConfiguration = new SizeValuesConfiguration();
  iconMargin: MarginConfiguration = new MarginConfiguration();
  public states: ConfigurationWithStates<
    configuratorButtonStateTypes,
    ConfiguratorBasicButtonDefaultConfiguration
  > = createConfigurationInstanceWithStates(
    configuratorButtonStateValues,
    ConfiguratorBasicButtonDefaultConfiguration,
  );
  margin: MarginConfiguration = new MarginConfiguration();
  padding: PaddingConfiguration = new PaddingConfiguration();
  size: SizeValuesConfiguration = new SizeValuesConfiguration();
  attribute: any;
}

export class DealerLocatorButtonConfiguration {
  attributeName = '';
  customButtonLabel = '';
  icon = '';
  iconSize: SizeValuesConfiguration = new SizeValuesConfiguration();
  iconMargin: MarginConfiguration = new MarginConfiguration();
  public states: ConfigurationWithStates<
    configuratorButtonStateTypes,
    ConfiguratorBasicButtonDefaultConfiguration
  > = createConfigurationInstanceWithStates(
    configuratorButtonStateValues,
    ConfiguratorBasicButtonDefaultConfiguration,
  );
  margin: MarginConfiguration = new MarginConfiguration();
  padding: PaddingConfiguration = new PaddingConfiguration();
  size: SizeValuesConfiguration = new SizeValuesConfiguration();
}

export class CombinableProductsButtonConfiguration {
  attributeName = '';
  customTypeName = '';
  public states: ConfigurationWithStates<
    configuratorButtonStateTypes,
    ConfiguratorCombinableProductsButtonConfiguration
  > = createConfigurationInstanceWithStates(
    configuratorButtonStateValues,
    ConfiguratorCombinableProductsButtonConfiguration,
  );
  margin: MarginConfiguration = new MarginConfiguration();
  padding: PaddingConfiguration = new PaddingConfiguration();
  size: SizeValuesConfiguration =
    new CombinableProductsSizeValuesConfiguration();
}

export class RetailerLogosConfiguration {
  retailerLogosPrivacyPolicyUrl =
    '/dealer-locator/dealer_locator_privacy_policy';
  apiEndPointUrl = '/ajax/dealer/integration/button/';
  buyOnline = 'Buy online';
  privacyPolicy = `You accept the {{link}}privacy policy{{/link}} when you click "visit retailer shop"`;
  font: FontWithoutAlignConfiguration = new FontWithoutAlignConfiguration();
  margin: MarginConfiguration = new MarginConfiguration();
  buyOnlinePadding: PaddingConfiguration = new PaddingConfiguration();
  arrowColor = '';
  arrowRightPadding: NumericValue = { value: 5 };
  iconSize: NumericValue = { value: 10 };
  logoBorder: BorderConfiguration = new BorderConfiguration();
  logoPadding: PaddingConfiguration = new PaddingConfiguration();
  verticalMargin: NumericValue = { value: 10 };
  horizontalMargin: NumericValue = { value: 10 };
  privacyPolicyPadding: PaddingConfiguration = new PaddingConfiguration();
}

export class CustomButtonsConfiguration {
  buyOnlineButton: BuyOnlineButtonConfiguration =
    new BuyOnlineButtonConfiguration();
  dealerLocatorButton: DealerLocatorButtonConfiguration =
    new DealerLocatorButtonConfiguration();
  combinableProductsButton: CombinableProductsButtonConfiguration =
    new CombinableProductsButtonConfiguration();
  retailerLogoButton: RetailerLogosConfiguration =
    new RetailerLogosConfiguration();
}
