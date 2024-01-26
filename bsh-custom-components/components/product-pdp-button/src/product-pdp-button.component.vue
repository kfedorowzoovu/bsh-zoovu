<template>
  <div :class="[componentStyle.container]">
    <a
      :href="offersUrl()"
      v-product-click-out-link
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
} from '@zoovu/runner-browser-api';
import { ProductPdpButtonConfiguration } from './product-pdp-button.configuration';
import { productPdpButtonStyle } from './product-pdp-button.style';
import { ProductClickOutLink } from '../../helpers/product-pdp-button.directive';
import { Product } from '@zoovu/exd-api';

@Component({
  directives: {
    ProductClickOutLink,
  },
})
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

  offersUrl(): string {
    return this.productRecommendation?.offerUrl;
  }
}
</script>
