<template>
  <div class="zv-buy-online-main-button-wrapper">
    <div v-show="isProductionEnvironment && isBuyOnlineFeatureEnabled">
      <div
        class="m-productconversionarea"
        data-t-name="ProductConversionArea"
        v-show="buttonVisibility"
      >
        <div class="js-conversion-wrapper">
          <div class="js-button-group-wrapper">
            <a
              ref="buyOnlineButton"
              v-bind="addToCartDataAttributes"
              href="javascript:;"
              :data-sku="productSKU"
              :is-production-environment="isProductionEnvironment"
              class="disableicon js-onlinedealer-action wtb zv-buy-onine-button"
              style=""
              tracked="true"
              :data-eventtracking="trackingEventData"
              @click="mountTrackingToAllBuyOnlineButtons"
              :class="componentStyle.container"
            >
              <span class="text">
                <font style="vertical-align: inherit">
                  <font style="vertical-align: inherit">{{
                    $t(componentConfiguration.buyOnlineText)
                  }}</font>
                </font>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div
      data-target-name="productBuyOnline"
      class="buy-online-overlay-model"
      v-show="isProductionEnvironment"
    >
      <BuyOnlineOverlay
        :is-production-environment="isProductionEnvironment"
        :component-configuration="componentConfiguration.buyOnlineOverlay"
        :path-of-overlay-api="this.fetchButtonData"
        :privacy-page-url="privacyPageUrl"
      />
    </div>

    <div
      v-if="
        (!isProductionEnvironment &&
          isBuyOnlineFeatureEnabled &&
          buttonVisibility) ||
        showButtonInEditorMode
      "
    >
      <button type="button" :class="componentStyle.container">
        <em class="icon icon-shoppingcart icon-m"></em>
        {{ $t(componentConfiguration.buyOnlineText) }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ComponentStyleDefinition,
  Mixins,
  Component,
  ComponentConfig,
  ComponentStyle,
  Prop,
} from '@zoovu/runner-browser-api';
import { BuyOnlineButtonConfiguration } from '../custom-buttons.configuration';
import {
  getRecommendationPropertyValue,
  getContextValue,
} from '../../../helpers/configurations-helper';
import {
  AddToCartData,
  CatalogVisibilityType,
  DataColumnName,
} from '../../../helpers/types';
import BuyOnlineOverlay from './buy-online-overlay.vue';
import { Window } from '../../../helpers/types';
import { buyOnlineButtonStyle } from './buy-online-button.style';
import { RetailerLogosData, Button } from '../../../helpers/types';
import { Product, ZoovuFacadeMixin } from '@zoovu/exd-api';

/**
 * BSH - Buy online button
 */
@Component({
  components: { BuyOnlineOverlay },
})
export default class BuyOnlineButtonComponent extends Mixins(ZoovuFacadeMixin) {
  @ComponentConfig(BuyOnlineButtonConfiguration)
  componentConfiguration: BuyOnlineButtonConfiguration;

  @ComponentStyle(buyOnlineButtonStyle)
  componentStyle: ComponentStyleDefinition;

  @Prop()
  public productRecommendation: Product;

  @Prop()
  public apiDataEvent!: RetailerLogosData;

  observer = null;

  mcIdSetFromClientSide = [];

  buttonVisibility: boolean = false;

  privacyPageUrl: string = '';

  get showButtonInEditorMode(): boolean {
    return (
      this.isEditMode &&
      this.catalogVisibilityType === CatalogVisibilityType.Marketing
    );
  }

  get productSKU(): string | undefined {
    return this.productRecommendation?.sku;
  }

  async mounted() {
    await this.zoovuFacade.waitForAdvisorInitialization();
    this.buttonVisibility = getContextValue(
      this.zoovuFacade,
      'displayBuyOnlineButton',
      'boolean',
    ) as boolean;
    this.privacyPageUrl = getContextValue(
      this.zoovuFacade,
      'privacyPageURL',
      'string',
    ) as string;

    const productBuyonlineButtonMain: NodeListOf<Element> =
      document.querySelectorAll('.zv-buy-online-main-button-wrapper');

    const buyonlineLastDiv: Element =
      productBuyonlineButtonMain[productBuyonlineButtonMain.length - 1];
    if (buyonlineLastDiv) {
      buyonlineLastDiv.classList.add('zv-last-buy-online-main-button-wrapper');
    }

    this.$nextTick(() => {
      setTimeout(() => {
        const stickyBarDivs: NodeListOf<Element> = document.querySelectorAll(
          '.buy-online-overlay-model',
        );

        for (let i: number = 1; i < stickyBarDivs?.length; i++) {
          stickyBarDivs[i].remove();
        }
        this.initializeBuyOnline();
      }, 100);
    });
  }

  get fetchButtonData(): Button {
    return this.apiDataEvent[0]?.typeGroups?.buyButton?.buttons[0];
  }

  get shouldShowBuyOnline(): boolean {
    const dealersLength = this.apiDataEvent[0]?.typeGroups?.dealers?.length;
    const hasFetchButtonData = Boolean(this.fetchButtonData);
    return (dealersLength > 4 || !dealersLength) && hasFetchButtonData;
  }

  get isBuyOnlineFeatureEnabled(): boolean {
    return (
      this.catalogVisibilityType === CatalogVisibilityType.Marketing &&
      this.shouldShowBuyOnline
    );
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

  get productSku(): string {
    return `${this.productRecommendation.sku}`;
  }

  get productPrice(): string {
    return `${this.productRecommendation.price.value}`;
  }

  initializeBuyOnline() {
    const isRendered = (window as Window).mountedFunctionsExecuted;
    if (this.isProductionEnvironment && !isRendered) {
      (window as Window).T.Utils.initializeModules($(this.$el));
      (window as Window).mountedFunctionsExecuted = true;
    }
  }

  beforeDestroy(): void {
    if (this.isProductionEnvironment) {
      (window as Window).T.Utils.destroyModules($(this.$el));
      $('.m-productconversionarea').off();
      (window as Window).mountedFunctionsExecuted = false;
    }
  }

  get trackingEventData(): string {
    const productID = this.fetchButtonData?.buttonID;
    return `{"trackType":"buy online click", "eventType":"click", "dataValues":{"products":[/{"product_id":"${productID}","product_quantity":"1","product_price":"${this.productPrice}"}/]} }`;
  }

  get addToCartDataAttributes(): AddToCartData {
    const baseUrl = this.fetchButtonData?.href ?? '';
    return {
      'data-base-url': baseUrl,
      id: baseUrl,
    };
  }

  mountTrackingToAllBuyOnlineButtons(): void {
    const TIMEOUT_MS = 300;
    const CTA_SELECTOR =
      'div.o-onlinedealerlayer .m-layer.is-active a[data-eventTracking]';
    const EVENT_NAME = 'click';
    const INTERVAL_COUNTER_MAX = 30;

    let product = this.productRecommendation;
    let intervalCounter = 0;

    let interval = setInterval(() => {
      let buttons = document.querySelectorAll(CTA_SELECTOR);

      for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener(EVENT_NAME, function (e) {
          product.notifyUserMovedToProductDetails();
        });
      }

      if (buttons.length || intervalCounter === INTERVAL_COUNTER_MAX)
        clearInterval(interval);
      intervalCounter++;
    }, TIMEOUT_MS);
  }
}
</script>
