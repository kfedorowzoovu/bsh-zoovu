<template>
  <a
    v-product-click-out-link
    :class="componentStyle.container"
    :disabled="!isProductionEnv"
    v-show="showButton || showButtonInEditorMode"
    :href="customButtonURL"
  >
    {{ $t(componentConfiguration.customButtonLabel) }}
  </a>
</template>

<script lang="ts">
import {
  Component,
  ComponentConfig,
  ComponentStyle,
  Prop,
  Mixins,
  ComponentStyleDefinition,
} from '@zoovu/runner-browser-api';
import { ProductClickOutLink } from '../../../helpers/dealer-locator-button.directive';
import { DealerLocatorButtonConfiguration } from '../custom-buttons.configuration';
import { dealerLocatorButtonStyle } from './dealer-locator-button.styles';
import {
  getRecommendationPropertyValue,
  getProductPropertyByName,
  getContextValue,
} from '../../../helpers/configurations-helper';
import { CustomURLPropertyName } from './dealer-locator-button.enum';
import { Product, ZoovuFacadeMixin } from '@zoovu/exd-api';
@Component({
  directives: {
    ProductClickOutLink,
  },
})
export default class DealerLocatorButtonComponent extends Mixins(
  ZoovuFacadeMixin,
) {
  @Prop()
  public productRecommendation: Product;

  @ComponentStyle(dealerLocatorButtonStyle)
  public componentStyle: ComponentStyleDefinition;

  @ComponentConfig(DealerLocatorButtonConfiguration)
  componentConfiguration: DealerLocatorButtonConfiguration;

  customURLPropertyName = CustomURLPropertyName.CUSTOM_BUTTON_URL;

  isProductionEnv: boolean = window.hasOwnProperty('T');

  dealersLocatorVisiblity;

  hideDealersLocatorForShopProducts;

  dealersLocatorUrl: string = '';

  async mounted() {
    await this.zoovuFacade.waitForAdvisorInitialization();
    this.dealersLocatorVisiblity = getContextValue(
      this.zoovuFacade,
      'displayDealerLocatorButton',
      'boolean',
    ) as boolean;
    this.hideDealersLocatorForShopProducts = getContextValue(
      this.zoovuFacade,
      'hideDealerLocatorForShopProducts',
      'boolean',
    ) as boolean;
    this.dealersLocatorUrl = getContextValue(
      this.zoovuFacade,
      'dealerLocatorButtonURL',
      'string',
    ) as string;
  }

  get showButtonInEditorMode(): boolean {
    const hasEnabled = !!this.enabled;
    const isInEditMode = !!this.isEditMode;
    const hasCustomButtonURL = !!this.customButtonURL;
    return !!(hasEnabled && isInEditMode && hasCustomButtonURL);
  }

  get showButton(): boolean {
    const hasEnabled = !!this.enabled;
    const hasDealerLocatorVisible = !!this.dealersLocatorVisiblity;
    const hasCustomButtonURL = !!this.customButtonURL;
    return !!(hasEnabled && hasDealerLocatorVisible && hasCustomButtonURL);
  }

  get enabled(): boolean {
    return this.productRecommendation && !this.isProductShopType;
  }

  get isProductShopType(): boolean {
    return (
      getRecommendationPropertyValue(
        this.productRecommendation,
        'catalogVisibilityType',
      ) === 'SHOP' && this.hideDealersLocatorForShopProducts
    );
  }

  get propertyValue(): string | undefined {
    if (this.componentConfiguration.attributeName === 'sku') {
      return getRecommendationPropertyValue(this.productRecommendation, 'sku');
    }
    return getProductPropertyByName(
      this.productRecommendation,
      this.componentConfiguration.attributeName,
    )?.valueTranslation;
  }

  get dealersLocatorUrlFromContext(): string {
    return this.dealersLocatorUrl;
  }

  get customButtonURL(): string {
    if (this.dealersLocatorUrlFromContext) {
      return this.dealersLocatorUrlFromContext + this.propertyValue;
    }

    return this.propertyValue;
  }
}
</script>
