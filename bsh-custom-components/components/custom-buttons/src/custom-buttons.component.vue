<template>
  <div :class="componentStyle.container">
    <RetailerLogosView
      :is-edit-mode="isEditMode"
      :productRecommendation="productRecommendation"
      :component-configuration="componentConfiguration.retailerLogoButton"
      @dealer-api-data="handleChildEvent"
    />
    <BuyOnlineButtonComponent
      :is-edit-mode="isEditMode"
      :productRecommendation="productRecommendation"
      :component-configuration="componentConfiguration.buyOnlineButton"
      :api-data-event="retailersLogosDataFromApi"
    />
    <DealerLocatorButtonComponent
      :is-edit-mode="isEditMode"
      :productRecommendation="productRecommendation"
      :component-configuration="componentConfiguration.dealerLocatorButton"
    />

    <CombinableProductsButtonComponent
      :is-edit-mode="isEditMode"
      :productRecommendation="productRecommendation"
      :component-configuration="componentConfiguration.combinableProductsButton"
    />
  </div>
</template>

<script lang="ts">
  import {
    Mixins,
    Component,
    ComponentConfig,
    Prop,
    ComponentStyle,
    ComponentStyleDefinition,
  } from "@zoovu/runner-browser-api";
  import { CustomButtonsConfiguration } from "./custom-buttons.configuration";
  import DealerLocatorButtonComponent from "./dealer-locator-button/dealer-locator-button.component.vue";
  import BuyOnlineButtonComponent from "./buy-online-button/buy-online-button.component.vue";
  import CombinableProductsButtonComponent from "./combinable-products-button/combinable-products-button.component.vue";
  import RetailerLogosView from "./retailer-logo-button/retailer-logo-button.component.vue";
  import { customButtonsStyles } from "./custom-buttons.styles";
  import { RetailerLogosData } from "../../helpers/types";
  import { ZoovuFacadeMixin } from "../../helpers/zoovu-facade.mixin";
  import { Product } from  "@zoovu/exd-api";

  /**
   * BSH - Custom buttons
   */
  @Component({
    components: {
      BuyOnlineButtonComponent,
      DealerLocatorButtonComponent,
      CombinableProductsButtonComponent,
      RetailerLogosView,
    },
  })

    export default class CustomButtonsComponent extends Mixins(ZoovuFacadeMixin) {

    @ComponentConfig(CustomButtonsConfiguration)
    componentConfiguration: CustomButtonsConfiguration;

    @ComponentStyle(customButtonsStyles)
    public componentStyle: ComponentStyleDefinition;

    @Prop()
    public productRecommendation: Product;

    retailersLogosDataFromApi = [];

    handleChildEvent(responseData: RetailerLogosData) {
      this.retailersLogosDataFromApi.push(responseData);
    }
  }
</script>
