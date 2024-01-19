<template>
  <div :class="[componentStyle.container]" v-if="productRecommendation">
    <img
      v-if="!isImagePdpLink"
      :src="productRecommendation.picture"
      :alt="productImageAriaLabelText"
      data-testid="product-image"
    />
    <a
      v-else
      ref="anchor"
      rel="noopener noreferrer"
      target="_blank"
      :href="offerUrl"
      @mousedown="updateOfferUrl"
      @mousedown.left="onLeftMouseDown"
    >
      <img :src="productRecommendation.picture" :alt="productImageAriaLabelText" data-testid="product-image" />
    </a>
    <div v-if="iconList.length !== 0" :class="[componentStyle.iconList]">
      <img
        v-for="icon in iconList"
        :src="icon"
        alt="campaign"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import {
    Component,
    ComponentConfig,
    ComponentStyle,
    InjectReactive,
    Prop,
    Vue,
  } from "@zoovu/runner-browser-api";
  import { ProductImageConfiguration } from "./product-image.configuration";
  import { productImageStyles, ProductImageStyles } from "./product-image.styles";
  import { getRecommendationPropertyValue } from "../../helpers/helpers";
  import { Product } from  "@zoovu/exd-api";
  /**
   * Product Image component
   */
  @Component
  export default class ProductImageComponent extends Vue {
    @Prop()
    public productRecommendation: Product;

    @ComponentStyle(productImageStyles)
    public componentStyle: ProductImageStyles;

    @ComponentConfig(ProductImageConfiguration)
    public componentConfiguration: ProductImageConfiguration;

    @InjectReactive("accessibilityContext")
    accessibilityContext!;

    offerUrl: string;

    mounted() {
     this.offerUrl = this.productRecommendation.offerUrl; 
    }

    get isImagePdpLink() {
      return this.componentConfiguration.isImagePdpLink;
    }

    get productImageAriaLabelText(): string {
      return this.$t(this.accessibilityContext.accessibility.standardTexts.productImageText, {
        recommendationName: this.productRecommendation.name,
      }) as string;
    }

    get iconList(): string[] {
      const list = getRecommendationPropertyValue(this.productRecommendation, this.componentConfiguration.campaignIconsColumn) as string;

      if (list && list.indexOf("|") !== -1) {
        return list.split("|");
      }

      return list && list !== "" ? [list] : [];
    }

    updateOfferUrl(): void {
      const trackedOfferUrl = this.productRecommendation.getTrackedOfferUrl();
      this.offerUrl = trackedOfferUrl;
      (this.$refs.anchor as HTMLElement).setAttribute("href", trackedOfferUrl); //it is important to change link without waiting for vue next tick!
    }

    onLeftMouseDown(): void {
      this.productRecommendation.notifyUserMovedToProductDetails();
    }
  }
</script>
