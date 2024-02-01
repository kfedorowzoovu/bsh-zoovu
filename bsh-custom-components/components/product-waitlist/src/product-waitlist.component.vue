<template>
  <div
    v-if="shouldRenderWaitListOnProduction"
    :class="[componentStyle.container]"
  >
    <div
      class="m-productsubscription js-productSubscription m-productconversionarea__m-productsubscription"
      data-t-name="ProductSubscription"
    >
      <a
        href=""
        class="a-link js-trigger-popover-link"
        :aria-label="
          $t(componentConfiguration.subscribeForUnavailableProductText)
        "
        :data-eventtracking="markupDataEventTrackingPopover"
      >
        <span class="text">{{
          $t(componentConfiguration.subscribeForUnavailableProductText)
        }}</span>
      </a>
      <aside class="m-popover js-popover" data-t-name="Popover" data-id="">
        <span class="popover-arrow js-popover-arrow"></span>
        <div class="popover-header">
          <button
            name="close-button"
            class="a-button a-button-plain js-popover-close popover-close"
            :aria-label="$t(componentConfiguration.closeButtonAriaLabel)"
            tabindex="-1"
          >
            <em class="icon icon-close icon-s"></em>
          </button>
        </div>
        <div class="popover-content">
          <p class="js-successful-message">
            {{
              $t(componentConfiguration.productSubscriptionWasSuccessfulText)
            }}
          </p>
          <div :data-actionUrl="markupDataActionUrl" class="m-form js-form">
            <input
              type="hidden"
              name="productCode"
              class="js-input-productCode"
              :value="markupInputValue"
            />
            <div class="form-layout-full">
              <p>{{ $t(componentConfiguration.headerText) }}</p>
              <fieldset class="form-row" data-field-count="1">
                <input
                  class="m-forminput input js-input-email"
                  data-t-name="FormInput"
                  value=""
                  required="required"
                  type="email"
                  name="email"
                  id="email"
                  data-field-nr="1"
                  :aria-label="$t(componentConfiguration.emailAddressLabel)"
                  :placeholder="$t(componentConfiguration.emailAddressLabel)"
                />
                <div class="form-error-wrapper">
                  <section class="error-container">
                    <div class="a-errormessage error-required">
                      {{ $t(componentConfiguration.emailAddressIsMissingText) }}
                    </div>
                    <div class="a-errormessage error-mismatch">
                      {{
                        $t(componentConfiguration.emailAddressIsNotValidText)
                      }}
                    </div>
                    <div class="a-errormessage error-min-length"></div>
                    <div class="a-errormessage error-confirm">
                      {{ $t(componentConfiguration.emailFieldsMismatchText) }}
                    </div>
                    <div class="a-errormessage error-bad-input"></div>
                    <div
                      :id="markupCustomErrorId"
                      class="a-errormessage error-custom js-custom-error-message"
                      :data-replace-origin="markupDataReplaceOrigin"
                    ></div>
                  </section>
                </div>
                <sub v-html="$t(componentConfiguration.footerText)" />
                <button
                  type="submit"
                  class="a-button a-button-primary js-submit-button m-productsubscription__a-button"
                  data-loader-type="layer"
                  data-loader-event="request"
                  :aria-label="$t(componentConfiguration.submitText)"
                  :data-eventtracking="markupDataEventTrackingSubmit"
                >
                  <span class="text">{{
                    $t(componentConfiguration.submitText)
                  }}</span>
                </button>
              </fieldset>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
  <a
    v-else-if="shouldRenderWaitList"
    href="#"
    :class="componentStyle.placeholder"
    :aria-label="$t(componentConfiguration.subscribeForUnavailableProductText)"
    :data-eventtracking="markupDataEventTrackingPopover"
  >
    <span class="text">{{
      $t(componentConfiguration.subscribeForUnavailableProductText)
    }}</span>
  </a>
</template>

<script lang="ts">
import {
  Component,
  ComponentConfig,
  ComponentStyle,
  Mixins,
  Prop,
} from '@zoovu/runner-browser-api';
import {
  getProductPropertyDefinitionByName,
  getContextValue,
} from '../../helpers/configurations-helper';
import {
  DataColumnName,
  CatalogVisibilityType,
  Window,
} from '../../helpers/types';
import { ProductWaitlistConfiguration } from './product-waitlist.configuration';
import {
  productWaitlistStyle,
  productWaitlistStyleType,
} from './product-waitlist.style';
import { Product, ZoovuFacadeMixin } from '@zoovu/exd-api';
@Component
export default class ProductWaitlist extends Mixins(ZoovuFacadeMixin) {
  @ComponentStyle(productWaitlistStyle)
  componentStyle: productWaitlistStyleType;

  @ComponentConfig(ProductWaitlistConfiguration)
  componentConfiguration: ProductWaitlistConfiguration;

  @Prop()
  public productRecommendation: Product;

  isWaitlistVisibilityState: boolean = true;

  get isProductionEnvironment(): boolean {
    return Object.prototype.hasOwnProperty.call(window, 'T');
  }

  get shouldRenderWaitList(): boolean {
    return (
      this.isWaitlistVisibilityState &&
      getProductPropertyDefinitionByName(
        this.productRecommendation,
        DataColumnName.CatalogVisibilityType,
      )?.value === CatalogVisibilityType.Shop &&
      getProductPropertyDefinitionByName(
        this.productRecommendation,
        DataColumnName.Buyable,
      )?.value === false &&
      getProductPropertyDefinitionByName(
        this.productRecommendation,
        DataColumnName.PermanentlyNotAvailable,
      )?.value === false
    );
  }

  get shouldRenderWaitListOnProduction(): boolean {
    return this.shouldRenderWaitList && this.isProductionEnvironment;
  }

  get productSKU(): string {
    return this.productRecommendation.sku;
  }

  get markupDataEventTrackingPopover(): string {
    return `{"trackType":"waitlist link clicked","eventType":"click","dataValues":{"product_id":"${this.productSKU}"}}`;
  }

  get markupDataEventTrackingSubmit(): string {
    return `{"trackType":"waitlist email submitted","eventType":"click","dataValues":{"product_id":"${this.productSKU}"}}`;
  }

  get markupCustomErrorId(): string {
    return `productSubscription-${this.productSKU}-error-custom`;
  }

  get markupDataReplaceOrigin(): string {
    return `productSubscription-${this.productSKU}`;
  }

  get markupInputValue(): string {
    return `${this.productSKU}`;
  }

  get markupDataActionEndpoint(): string {
    return this.componentConfiguration.dataActionEndpoint;
  }

  get markupDataActionUrl(): string {
    const countryCode: string = getProductPropertyDefinitionByName(
      this.productRecommendation,
      DataColumnName.CountryCode,
    )?.value;
    return countryCode
      ? `${window.location.origin}/${countryCode}/${this.markupDataActionEndpoint}`
      : `${window.location.origin}/${this.markupDataActionEndpoint}`;
  }

  async mounted() {
    if (this.shouldRenderWaitListOnProduction) {
      this.$nextTick(() => {
        setTimeout(() => {
          (window as Window).T.Utils.initializeModules($(this.$el));
        }, 100);
      });
    }

    await this.zoovuFacade.waitForAdvisorInitialization();
    this.isWaitlistVisibilityState = getContextValue(
      this.zoovuFacade,
      'displayWaitlistButton',
      'boolean',
    ) as boolean;
  }

  beforeDestroy(): void {
    if (this.shouldRenderWaitListOnProduction) {
      (window as Window).T.Utils.destroyModules($(this.$el));
    }
  }
}
</script>
