<template>
  <div :class="[componentStyle.container]">
    <a
      :href="currentUrl"
      @click="navigateToTrackedUrl"
      ref="link"
      class="zv-product-pdp-button"
      v-show="componentConfiguration.buttonVisiblityState"
      :target="openLinkOnNewTab ? '_blank' : '_self'"
    >
      <span>{{ $t(componentConfiguration.buttonLabel) }}</span>
    </a>
  </div>
</template>

<script lang="ts">
import {
  Component,
  ComponentConfig,
  ComponentStyle,
  ComponentStyleDefinition,
  Vue,
  Prop,
  Ref,
} from '@zoovu/runner-browser-api';
import { ProductPdpButtonConfiguration } from './product-pdp-button.configuration';
import { productPdpButtonStyle } from './product-pdp-button.style';
import { Product } from '@zoovu/exd-api';

@Component({})
export default class ProductPdpButtoncomponent extends Vue {
  @ComponentConfig(ProductPdpButtonConfiguration)
  componentConfiguration: ProductPdpButtonConfiguration;

  @ComponentStyle(productPdpButtonStyle)
  componentStyle: ComponentStyleDefinition;

  @Prop()
  public productRecommendation: Product;

  get openLinkOnNewTab(): boolean {
    return this.componentConfiguration.openLinkInNewTab;
  }

  @Ref() link!: HTMLAnchorElement;

  get currentUrl(): string {
    return this.productRecommendation?.offerUrl;
  }

  navigateToTrackedUrl(event: Event) {
    event.preventDefault();
    const trackedUrl = this.productRecommendation.getTrackedOfferUrl();
    this.link.href = trackedUrl;
    window.location.href = trackedUrl;
    this.link.href = this.currentUrl;
  }
}
</script>
