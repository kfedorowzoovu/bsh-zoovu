import { ConfigurationWithStates } from '../../helpers/configurations-helper';
import {
  BorderConfiguration,
  FontWithoutAlignConfiguration,
  MarginConfiguration,
  PaddingConfiguration,
} from '@zoovu/theme-editor-parameter-types';

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

export class AddToCartButtonConfiguration {
  public states: ConfigurationWithStates<
    configuratorButtonStateTypes,
    ConfiguratorBasicButtonDefaultConfiguration
  > = createConfigurationInstanceWithStates(
    configuratorButtonStateValues,
    ConfiguratorBasicButtonDefaultConfiguration,
  );
  addToCartScript = '';
  addToCartLink = '';
  addToCartProductCatalogToggle = '';
  addToCartFromProductCatalog = '';
  addToCartText = '';
  useScript = false;
  public buttonLabel = 'Default value';
  public width = { value: 0, unit: 'auto' };
  public margin = new MarginConfiguration();
  public padding = new PaddingConfiguration();
  public size = null;
}
