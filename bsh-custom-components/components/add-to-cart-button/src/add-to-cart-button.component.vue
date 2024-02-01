<template>
  <div
    v-if="showAddToCartButton && isProductionEnvironment"
    class="m-productconversionarea"
    data-t-name="ProductConversionArea"
  >
    <div class="js-conversion-wrapper" v-if="!componentConfiguration.useScript">
      <div class="js-button-group-wrapper">
        <form
          ref="buttonForm"
          class="js-ajax-request"
          :data-ajax-id="'addtocart-' + productSKU"
          :data-ajax="dataAjax"
          data-prevent-double-submit="true"
        >
          <input type="hidden" name="productCode" :value="productSKU" />
          <input type="hidden" name="quantity" value="1" />
          <button
            class="zv-add-to-cart-button js-add-to-basket"
            :class="componentStyle.container"
            :testing_id="'addToBasket_' + productSKU"
            :data-popover-id="'add-to-cart-' + productSKU"
            :disabled="!isProductBuyable"
            :data-eventTracking="trackingEventData"
          >
            <em class="icon icon-shoppingcart icon-m"></em>
            <span class="text">{{
              $t(componentConfiguration.addToCartText)
            }}</span>
          </button>
        </form>
      </div>
    </div>

    <div v-else-if="componentConfiguration.useScript">
      <button
        type="button"
        class="product-button primary-button"
        :disabled="!isProductBuyable"
        @click="addToCart"
        :class="componentStyle.container"
      >
        <em class="icon icon-shoppingcart icon-m"></em>
        {{ $t(componentConfiguration.addToCartText) }}
      </button>
    </div>
  </div>

  <div v-else-if="showAddToCartButton">
    <button
      type="button"
      class="product-button primary-button"
      :disabled="!isProductBuyable"
      @click="addToCart"
      :class="componentStyle.container"
      :data-ajax="dataAjax"
    >
      <em class="icon icon-shoppingcart icon-m"></em>
      {{ $t(componentConfiguration.addToCartText) }}
    </button>
  </div>
</template>

<script lang="ts">
import {
  ComponentStyleDefinition,
  Component,
  ComponentConfig,
  ComponentStyle,
  Prop,
  Mixins,
} from '@zoovu/runner-browser-api';
import { AddToCartButtonConfiguration } from './add-to-cart-button.configuration';
import { addToCartButtonStyle } from './add-to-cart-button.style';
import { getRecommendationPropertyValue } from '../../helpers/configurations-helper';
import { CatalogVisibilityType, DataColumnName } from '../../helpers/types';
import { Product, ZoovuFacadeMixin } from '@zoovu/exd-api';

/**
 * BSH - Custom add to cart button
 */
@Component
export default class AddToCartButtonComponent extends Mixins(ZoovuFacadeMixin) {
  @ComponentConfig(AddToCartButtonConfiguration)
  componentConfiguration: AddToCartButtonConfiguration;

  @ComponentStyle(addToCartButtonStyle)
  componentStyle: ComponentStyleDefinition;

  @Prop()
  public productRecommendation: Product;

  buttonVisibility: boolean = false;

  async mounted() {
    console.log('thi is new bsh add to cart');
    await this.zoovuFacade.waitForAdvisorInitialization();
    this.buttonVisibility = this.getContextBooleanValue(
      'displayAddToCartButton',
    );
  }

  getContextBooleanValue(variableName: string): boolean {
    const readContextValue = this.zoovuFacade.context.get(variableName);
    return Boolean(readContextValue.value || readContextValue.defaultValue);
  }

  get dataAjax(): string {
    if (!this.componentConfiguration.useScript)
      return `{"url":"${this.addToCartLink}", "dataType":"html", "method":"POST"}`;
    return '';
  }

  get isProductionEnvironment(): boolean {
    return Object.prototype.hasOwnProperty.call(window, 'T');
  }

  get catalogVisibilityType(): string {
    return getRecommendationPropertyValue(
      this.productRecommendation,
      DataColumnName.CatalogVisibilityType,
    ) as string;
  }

  get productSKU(): string {
    return this.productRecommendation.sku;
  }

  get productPrice() {
    return this.productRecommendation.price.value;
  }

  get trackingEventData(): string {
    return `{"trackType":"shopping cart interaction", "eventType":"click", "dataValues":{"products":[/{"product_id":"${this.productSKU}","product_quantity":"1","product_price":"${this.productPrice}"}/],"basket_interaction":"add"} }`;
  }

  get showAddToCartButton(): boolean {
    if (this.isEditMode) {
      return this.catalogVisibilityType === CatalogVisibilityType.Shop;
    } else {
      return (
        this.catalogVisibilityType === CatalogVisibilityType.Shop &&
        this.buttonVisibility
      );
    }
  }

  get isProductBuyable(): boolean {
    return Boolean(
      getRecommendationPropertyValue(
        this.productRecommendation,
        DataColumnName.Buyable,
      ),
    );
  }

  get countryCode(): string {
    return getRecommendationPropertyValue(
      this.productRecommendation,
      DataColumnName.CountryCode,
    ) as string;
  }

  public addToCartViaJS(): void {
    try {
      if (this.componentConfiguration.addToCartScript === '') {
        return;
      }
      // eslint-disable-next-line no-new-func
      const addToCartSnippet = Function(
        'product',
        `${this.componentConfiguration.addToCartScript}`,
      );
      this.productRecommendation.notifyProductAddedToCart();
      addToCartSnippet.call({}, Object.assign({}, this.productRecommendation));
    } catch (error) {
      console.error(error);
    }
  }

  get addToCartLink(): string {
    if (this.componentConfiguration.addToCartProductCatalogToggle) {
      return this.componentConfiguration.addToCartFromProductCatalog;
    } else {
      const cartLink = this.componentConfiguration.addToCartLink || '';
      const countryCode = this.countryCode ? `/${this.countryCode}` : '';
      return `${countryCode}${cartLink}`;
    }
  }

  addToCart(): void {
    if (!this.componentConfiguration.useScript) return;
    this.addToCartViaJS();
  }
}
</script>
