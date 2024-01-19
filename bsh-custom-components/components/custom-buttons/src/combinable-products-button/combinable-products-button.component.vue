<template>
  <a
    v-product-click-out-link
    v-if="shouldDisplayCombinableProduct || showButtonInEditorMode"
    :class="componentStyle.container"
    :href="combinableProductsURL"
  >
    {{ isProductionEnvironment ? linkText : linkTextPlaceholder }}
  </a>
</template>

<script lang="ts">
  import {
    Component,
    ComponentConfig,
    ComponentStyle,
    Prop,
    Mixins,
    ComponentStyleDefinition
  } from "@zoovu/runner-browser-api";
  import { combinableProductsStyle } from "./combinable-products-button.styles";
  import { CombinableProductsButtonConfiguration } from "../custom-buttons.configuration";
  import { getProductPropertyDefinitionByName } from "../../../helpers/helpers";
  import axios from "axios";
  import { ProductClickOutLink } from "./combinable-products-button.directive";
  import { CustomURLPropertyName } from "./combinable-products-button.enum";
  import { getContextValue } from "../../../helpers/context-from-advisor-modal";
  import { ZoovuFacadeMixin } from "../../../helpers/zoovu-facade.mixin";
  import { Product } from "@zoovu/exd-api";

  @Component({
    directives: {
      ProductClickOutLink,
    },
  })
  export default class CombinableProductsButtonComponent extends Mixins(ZoovuFacadeMixin) {
    
    @Prop()
    public productRecommendation: Product;

    @ComponentStyle(combinableProductsStyle)
    public componentStyle: ComponentStyleDefinition;

    @ComponentConfig(CombinableProductsButtonConfiguration)
    public componentConfiguration: CombinableProductsButtonConfiguration;

    customURLPropertyName = CustomURLPropertyName.COMBINABLE_PRODUCTS_URL;

    isCombinableVisibilityState;

    linkURL = "";

    linkText = "";

    type = "";

    defaultDomain = "https://www.bosch-home.com";

    get showButtonInEditorMode(): boolean {
      return this.isEditMode && Boolean(this.combinableProductsEndpoint);
    }

    async mounted() {
      await this.zoovuFacade.waitForIdle();
      this.isCombinableVisibilityState = getContextValue(this.zoovuFacade, "displayCombinableProducts", "boolean");
    }

    get shouldDisplayCombinableProduct(): boolean {
      const isEnabled = this.isCombinableVisibilityState;
      if (!this.isProductionEnvironment) {
        return isEnabled && Boolean(this.combinableProductsEndpoint);
      }
      return isEnabled && Boolean(this.combinableProductsEndpoint) && this.isTypeCorrect;
    }

    get isProductionEnvironment(): boolean {
      return Object.prototype.hasOwnProperty.call(window, "T");
    }

    get domain(): string {
      return this.isProductionEnvironment ? window.location.origin : this.defaultDomain;
    }

    get combinableProductsURL(): string {
      return `${this.domain}${this.linkURL}`;
    }

    get combinableProductsEndpoint(): string {
      return getProductPropertyDefinitionByName(this.productRecommendation, this.componentConfiguration.attributeName)?.value;
    }

    get isTypeCorrect(): boolean {
      return this.type === this.componentConfiguration.customTypeName;
    }

    get linkTextPlaceholder(): string {
      return "Combinable Products Link";
    }

    created(): void {
      if (this.combinableProductsEndpoint) {
        axios
          .get(this.combinableProductsEndpoint)
          .then((resp) => {
            const { url, linkText, type } = resp.data[0];
            this.linkURL = url;
            this.linkText = linkText;
            this.type = type;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }
</script>
