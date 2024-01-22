<template>
  <div v-if="shouldRenderAnyPrice" :class="[componentStyle.container]">
    <div v-if="shouldRenderPriceWithDiscount" :class="[componentStyle.priceContainer]">
      <div :class="[componentStyle.originalPriceElement]">
        {{ originalPrice }}
      </div>
      <div :class="[componentStyle.discountPriceElement]">
        {{ price }}
      </div>
    </div>
    <div v-else :class="[componentStyle.container]">
      <div :class="[componentStyle.priceElement]">
        {{ price }}
      </div>
    </div>
    <div
      v-if="shouldRenderPriceDescription || isShopCatalogType || shouldRenderFixedPromotion"
      :class="[componentStyle.descriptionContainer]"
    >
      <div v-if="shouldRenderPriceDescription">
        <div v-if="isMarketCatalogType">
          {{ $t(componentConfiguration.rrpText) }}
        </div>
        <div v-else-if="isShopCatalogType">
          {{ $t(componentConfiguration.shopPriceDescription) }}
        </div>
      </div>
      <div v-if="shouldRenderFixedPromotion">
        {{ promotionValue }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ComponentStyleDefinition,
  Component,
  ComponentConfig,
  ComponentStyle,
  Prop,
  Mixins
} from "@zoovu/runner-browser-api";
import { ProductPriceConfiguration } from "./product-price.configuration";
import { productPriceStyle } from "./product-price.style";
import { getRecommendationPropertyValue } from "../../helpers/helpers";
import { FormatAsPriceMixin } from "./format-as-price-mixin";
import { getContextValue } from "../../helpers/context-from-advisor-modal";
import { Product } from "@zoovu/exd-api";
@Component
export default class ProductPriceComponent extends Mixins(FormatAsPriceMixin) {
  @ComponentConfig(ProductPriceConfiguration)
  componentConfiguration: ProductPriceConfiguration;

  @ComponentStyle(productPriceStyle)
  componentStyle: ComponentStyleDefinition;

  @Prop()
  public productRecommendation: Product;

  priceVisibilityState: boolean = false;


  async created(): Promise<void> {
    await this.zoovuFacade.waitForIdle();
    this.priceVisibilityState = getContextValue(this.zoovuFacade, "displayProductPrice", "boolean") as boolean;
  }

  get shouldRenderPriceWithDiscount(): boolean {
    return this.isShopCatalogType && this.isDiscountPriceLowerThenOriginalPrice;
  }

  get shouldRenderAnyPrice(): boolean {
    if (this.isEditMode) {
      return Boolean(this.productRecommendation);
    } else {
      return Boolean(
        this.productRecommendation && this.priceVisibilityState && parseFloat(this.productRecommendation.price.value.toString()).toString()
      );
    }
  }

  get isDiscountPriceLowerThenOriginalPrice(): boolean {
    const discountPriceValue: number = parseFloat(this.productRecommendation.price.value.toString());
    const originalPriceValue: number = parseFloat(this.recomendationsPriceValue);

    return !isNaN(discountPriceValue) && !isNaN(originalPriceValue) && discountPriceValue < originalPriceValue;
  }

  get originalPrice(): string {
    const originalPrice = this.recomendationsPriceValue;

    return this.priceDecorator(originalPrice);
  }

  get recomendationsPriceValue(): string {
    return getRecommendationPropertyValue(
      this.productRecommendation,
      this.$t(this.componentConfiguration.originalPriceColumnName) as string
    ) as string;
  }

  get price(): string {
    return this.priceDecorator(this.productRecommendation.price.value.toString(), this.productRecommendation.price.valueWithCurrency);
  }

  priceDecorator(value: string, valueWithCurrency?: string): string {
    let price = value;
    if (!this.componentConfiguration.hideCurrency && !this.componentConfiguration.showCommaDash) {
      return this.isEditMode || !valueWithCurrency ? this.formatValueAsPrice(price) : valueWithCurrency ?? "";
    }
    if (this.componentConfiguration.showCommaDash) {
      price = this.formatAsPriceWithCommaDash(price);
    }

    return this.componentConfiguration.hideCurrency ? this.formatAsPriceWithoutCurrency(price) : price;
  }

  get promotionValue(): string {
    return getRecommendationPropertyValue(this.productRecommendation, "fixed_promotion")?.split("|")[1] ?? "";
  }

  get shouldRenderFixedPromotion(): boolean {
    return this.promotionValue !== "";
  }

  get shouldRenderPriceDescription(): boolean {
    return (
      this.priceVisibilityState &&
      parseFloat(this.productRecommendation.price.value.toString()) > 0.01 &&
      (this.isMarketCatalogType || this.isShopCatalogType)
    );
  }

  get catalogVisibilityType(): string {
    const catalogVisibilityType =
      (getRecommendationPropertyValue(this.productRecommendation, "catalogVisibilityType") as string) || "";

    return catalogVisibilityType.toLowerCase();
  }

  get isMarketCatalogType(): boolean {
    return this.catalogVisibilityType === "marketing";
  }

  get isShopCatalogType(): boolean {
    return this.catalogVisibilityType === "shop";
  }
}
</script>
