<template>
  <div v-if="shouldDisplayRetailerLogos || showButtonInEditorMode" :class="componentStyle.container">
    <div v-if="headerText.length !== 0" :class="componentStyle.heading">
      {{ headerText }}
    </div>
    <div :class="componentStyle.dealerLogos">
      <a
        v-for="(dealer, index) in dealers"
        :key="`dealer-${index}`"
        :class="componentStyle.dealerInfo"
        :href="dealer.url"
        target="_blank"
      >
        <img :src="dealer.logo" :class="componentStyle.dealerLogo" />
        <div :class="componentStyle.arrow" />
      </a>
    </div>

    <div
      v-if="componentConfiguration.retailerLogosPrivacyPolicyUrl.length !== 0"
      v-dompurify-html="privacyPolicyText"
      :class="componentStyle.policyText"
    />
  </div>
</template>

<script lang="ts">
  import {
    Component,
    ComponentConfig,
    ComponentStyle,
    Prop,
    ComponentStyleDefinition,
    Mixins
  } from "@zoovu/runner-browser-api";
  import { RetailerLogosConfiguration } from "../custom-buttons.configuration";
  import { retailerLogoButtonStyle } from "./retailer-logo-button.styles";
  import axios from "axios";
  import { ProductProperty } from "./retailer-logos.enum";
  import { getContextValue } from "../../../helpers/context-from-advisor-modal";
  import { Dealer } from "../../../helpers/types";
  import { ZoovuFacadeMixin } from "../../../helpers/zoovu-facade.mixin";
  import { Product } from "@zoovu/exd-api";
  @Component
  export default class RetailerLogosView extends Mixins(ZoovuFacadeMixin) {
    @ComponentStyle(retailerLogoButtonStyle)
    componentStyle: ComponentStyleDefinition;

    @ComponentConfig(RetailerLogosConfiguration)
    componentConfiguration: RetailerLogosConfiguration;

    @Prop()
    public productRecommendation: Product;

    dealers: Dealer[] = [];

    isRetailerLogosEnabled: boolean = false;

    isReRendered: boolean = false;

    get headerText(): string {
      return this.$t(this.componentConfiguration.buyOnline) as string;
    }

    get showButtonInEditorMode(): boolean {
      return this.isEditMode && this.isDealer;
    }

    get isDealer(): boolean {
      return this.dealers?.length > 0;
    }

    async mounted() {
      await this.zoovuFacade.waitForIdle();
      this.isRetailerLogosEnabled = Boolean(getContextValue(this.zoovuFacade, "displayRetailersLogos", "boolean"));
      this.executeRetailerLogoApiRequest();
    }

    get privacyPolicyText(): string {
      const privacyPolicyUrl: string  = this.$t(this.componentConfiguration.retailerLogosPrivacyPolicyUrl).toString();
      let privacyPolicyStandardText: string = this.$t(this.componentConfiguration.privacyPolicy).toString();

      const hasLinkPlaceholders =
        privacyPolicyStandardText.includes("{{link}}") && privacyPolicyStandardText.includes("{{/link}}");

      if (hasLinkPlaceholders && privacyPolicyUrl) {
        const linkStartTag = `<a class="a-link a-link-inline" href="${privacyPolicyUrl}" target="_blank"><span class="text">`;
        const linkEndTag = `</span></a>`;

        privacyPolicyStandardText = privacyPolicyStandardText
          .replace("{{link}}", linkStartTag)
          .replace("{{/link}}", linkEndTag);
      } else {
        privacyPolicyStandardText = privacyPolicyStandardText.replace("{{link}}", "").replace("{{/link}}", "");
      }

      return privacyPolicyStandardText;
    }

    get endPoint(): string {
      return this.componentConfiguration.apiEndPointUrl ?? "/ajax/dealer/integration/button/";
    }

    get endPointURL(): string {

      const countryCode = this.productRecommendation?.properties[ProductProperty.COUNTRY_CODE]?.value;

      const prefixFromAttrs = countryCode ? `/${countryCode}` : "";
      return `${prefixFromAttrs}${this.endPoint}`;
    }

    get shouldDisplayRetailerLogos(): boolean {
      return this.isRetailerLogosEnabled && this.isDealer;
    }

    executeRetailerLogoApiRequest(): void {
      const isZoovuEnv = window.location.host.indexOf("zoovu.com") !== -1;
      if (this.isRetailerLogosEnabled && !isZoovuEnv && !this.isReRendered) {
        axios
          .get(`${this.endPointURL}${this.productRecommendation.sku}`)
          .then((resp) => {
            this.$emit("dealer-api-data", resp.data);
            this.dealers = resp.data?.dealers?.slice(0, 4);
            this.isReRendered = true;
          })
          .catch((error) => {
            console.log("Fetching dealers information failed");
          });
      }
    }
  }
</script>
