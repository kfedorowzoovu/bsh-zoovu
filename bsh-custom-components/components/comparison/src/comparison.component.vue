<template>
  <div
    v-if="isProductionEnvironment"
    :class="[
      { 'is-selected': productRecommendation.isSelectedForComparison },
      componentStyle.container,
    ]"
    class="product-compare-wrapper m-productconversionarea"
    data-t-name="ProductConversionArea"
  >
    <div
      class="js-ajax-request js-product-compare"
      :data-ajax-id="markupDataAjaxId"
      :data-ajax="markupDataAjax"
    >
      <div :data-replace-container="markupDataReplaceContainer">
        <div
          class="product-compare-selection m-forminput m-forminput-checkbox js-toggle-compare"
          data-t-name="FormInput"
        >
          <input
            :id="markupChkId"
            class="m-forminput compare-product js-update-localstorage js-compare-popover"
            type="checkbox"
            :value="productSKU"
            name="compared-product"
            :data-skuincomparison="markupSkuInComparison"
            :data-eventTracking="markupDataEventTracking()"
            :data-key="markupDataKey"
            :data-popover-id="markupDataPopoverId"
          />
          <label class="a-formlabel checkbox" :for="markupChkId">
            <span class="label-text">{{
              $t(componentConfiguration.compareSelector)
            }}</span>
            <span class="label-text js-compare-label">
              <a
                :href="componentConfiguration.comparisonPageUrl"
                class="a-link a-link-inline"
              >
                {{ $t(componentConfiguration.compareSelector) }}
              </a>
            </span>
          </label>
        </div>
      </div>
    </div>
    <aside
      class="m-popover add-to-compare"
      data-t-name="Popover"
      :data-id="markupDataPopoverId"
      data-position="top"
      data-events="false"
      data-open-onload="false"
    >
      <span class="popover-arrow js-popover-arrow"></span>
      <div class="popover-header">
        <button
          name="close-button"
          class="a-button a-button-plain js-popover-close popover-close"
          aria-label="Cerrar"
          tabindex="-1"
        >
          <em class="icon icon-close icon-s"></em>
        </button>
      </div>
      <div class="popover-content">
        <p class="highlight">{{ $t(componentConfiguration.maxNumber) }}</p>
        <a
          :href="componentConfiguration.comparisonPageUrl"
          class="a-link a-button a-button-primary disableicon"
        >
          <span class="text">{{
            $t(componentConfiguration.compareStart)
          }}</span>
        </a>
      </div>
    </aside>
  </div>
  <div
    v-else
    title="This is just a placeholder - feature only works in production environment!"
    class="product-compare-wrapper"
    :class="[
      { 'is-selected': productRecommendation.isSelectedForComparison },
      componentStyle.compareSelector,
    ]"
  >
    <label class="product-compare-selection" @click="onSelectClicked">
      <span
        class="answer-selection-button answer-selection-button--checkbox"
        :class="{
          isSelected: productRecommendation.isSelectedForComparison,
        }"
      >
        <IconComponent :component-configuration="iconConfiguration" />
      </span>
      <span
        v-dompurify-html="$t(componentConfiguration.compareSelector)"
      ></span>
    </label>
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
import { ComparisonConfiguration } from './comparison.configuration';
import { comparisonStyle } from './comparison.style';
import { getRecommendationPropertyValue } from '../../helpers/configurations-helper';
import {
  AjaxRequestData,
  CatalogVisibilityType,
  DataColumnName,
} from '../../helpers/types';
import IconComponent from './icon-component/icon.component.vue';
import { Window } from '../../helpers/types';
import { ZoovuFacadeMixin, Product } from '@zoovu/exd-api';

/**
 * BSH - Comparison
 */
@Component({
  components: { IconComponent },
})
export default class ComparisonComponent extends Mixins(ZoovuFacadeMixin) {
  @ComponentConfig(ComparisonConfiguration)
  componentConfiguration: ComparisonConfiguration;

  @ComponentStyle(comparisonStyle)
  componentStyle: ComponentStyleDefinition;

  @Prop()
  public productRecommendation: Product;

  get iconConfiguration() {
    return {
      svgUrl: this.componentConfiguration.checkIcon,
      color: 'black',
      size: {
        width: { value: 16, unit: 'px' },
        height: { value: 16, unit: 'px' },
      },
    };
  }

  get isProductionEnvironment(): boolean {
    return Object.prototype.hasOwnProperty.call(window, 'T');
  }

  markupDataEventTracking(): string {
    return `{"trackType":"product compare interaction","eventType":"click","dataValues":{}}`;
  }

  get numberOfSelectedProducts(): number {
    const { selectionsLength } = this.zoovuFacade.comparison;
    return selectionsLength ?? 0;
  }

  get canStartComparison(): boolean {
    return (
      this.numberOfSelectedProducts < 5 && this.numberOfSelectedProducts > 0
    );
  }

  get markupRemoveFromCompareEndpoint(): string {
    return this.isCatalogVisibilityTypeShop
      ? 'ajax/shop-compare/remove-from-overlay'
      : 'ajax/compare/remove-from-overlay';
  }

  get productSKU(): string {
    return this.productRecommendation.sku;
  }

  public get markupDataAjaxId(): string {
    return `product-compare${this.productSKU}`;
  }

  get markupDataPopoverId(): string {
    return `popover-product-compare-${this.productSKU}`;
  }

  get markupDataReplaceContainer(): string {
    return `product-compare${this.productSKU}`;
  }

  get markupChkId(): string {
    return `chk${this.productSKU}`;
  }

  get startComparisonText(): string {
    return this.numberOfSelectedProducts < 5
      ? (this.$t(this.componentConfiguration.compareTitle, {
          selectedProducts: this.numberOfSelectedProducts,
        }) as string)
      : (this.$t(this.componentConfiguration.maxNumber) as string);
  }

  get markupAddToCompareEndpoint(): string {
    return this.isCatalogVisibilityTypeShop
      ? 'ajax/shop-compare/add-to-overlay'
      : 'ajax/compare/add-to-overlay';
  }

  get isCatalogVisibilityTypeShop(): boolean {
    return (
      getRecommendationPropertyValue(
        this.productRecommendation,
        DataColumnName.CountryCode,
      ) === CatalogVisibilityType.Shop
    );
  }

  get markupModel(): boolean {
    return (
      this.markupSkuInComparison.indexOf(this.productRecommendation.sku) > -1
    );
  }

  get markupSkuInComparison(): string {
    const localStorageData = window.localStorage.getItem(this.markupDataKey);
    return localStorageData || '[]';
  }

  get markupDataKey(): string {
    return this.isCatalogVisibilityTypeShop
      ? 'product-compare-shop'
      : 'product-compare-mkt';
  }

  get markupDataAjax(): AjaxRequestData {
    const countryCode: string = getRecommendationPropertyValue(
      this.productRecommendation,
      DataColumnName.CountryCode,
    ) as string;
    const countryCodeString = countryCode ? `${countryCode}/` : '';
    const removeFromCompareUrl = `${window.location.origin}/${countryCodeString}${this.markupRemoveFromCompareEndpoint}`;
    const addToCompareUrl = `${window.location.origin}/${countryCodeString}${this.markupAddToCompareEndpoint}`;

    const currentEndpointUrl = this.markupModel
      ? removeFromCompareUrl
      : addToCompareUrl;
    return { url: currentEndpointUrl, method: 'POST', dataType: 'html' };
  }

  beforeMount(): void {
    (window as Window).T.Utils.initializeModules(this.$el);
  }

  beforeDestroy(): void {
    (window as Window).T!.Utils.initializeModules(this.$el);
  }

  onSelectClicked(): void {
    this.productRecommendation.toggleSelectionForComparison();
  }
}
</script>
