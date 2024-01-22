<template>
  <div class="o-onlinedealerlayer zv-buyonline-overlay" data-t-name="OnlineDealerLayer" data-mcid="true">
    <form class="js-ajax-request buyonlinepopupwrapper" v-bind="modelAjaxIdPath">
      <fieldset data-replace-container="request-param_dealer-integration-buttons"></fieldset>
      <input type="hidden" class="js-mcid" name="mcid" />
      <script data-ajax-template="success" type="text/x-dot-template">
        [{? it.typeGroups && it.typeGroups.buyButton }]
        [{ var onlinedealer=it.typeGroups.buyButton; }]

        [{? onlinedealer && onlinedealer.buttons && onlinedealer.buttons.length}]
        [{~onlinedealer.buttons :button:idx}]
        [{ var priceValue = ($('.price[data-sku="' + button.buttonID + '"]').data('price-value')); }]
        <section data-replace-id="dealers_[{=button.buttonID}]" data-add-method="prepend">
          [{? button.action == "LINK" }]
          <a href="[{=button.href}]" data-sku="[{=button.buttonID}]" data-base-url="[{=button.href}]" id="[{=button.buttonID}]"
             class="a-link a-button a-button-primary disableicon js-link-action"
             data-eventTracking='{"trackType":"buy_online_d2c_click","eventType":"click","dataValues":{"products":[/{"product_id":"[{=button.buttonID}]","product_category":["Washers & Dryers","Washing machines","Frontloader"],"product_price":"[{=priceValue ? priceValue : 0}]"}/]}}'>
                        <span class="text">
                            [{?onlinedealer.buttonLabel}][{=onlinedealer.buttonLabel}][{??}]
                                {{$t(componentConfiguration.buyButton)}}
                            [{?}]
                        </span>
          </a>
          [{?? button.action == "SHOPATRON_ADD2CART"}]
          <a href="" data-sku="[{=button.buttonID}]" data-base-url="[{=button.href}]" id="shopatron-button-[{=idx}]"
             class="a-link a-button a-button-primary disableicon js-shopatron-addtocart-action"
             data-eventTracking='{"trackType":"buy online click", "eventType":"click", "dataValues":{"products":[/{"product_id":"[{=button.buttonID}]","product_category":["Washers & Dryers","Washing machines","Frontloader"],"product_price":"[{=priceValue ? priceValue : 0}]"}/]}}'>
                        <span class="text">
                            [{?onlinedealer.buttonLabel}][{=onlinedealer.buttonLabel}][{??}]
                                {{$t(componentConfiguration.buyButton)}}
                            [{?}]
                        </span>
          </a>
          [{?? button.action == "REQUEST_PRICING"}]
          <a href="[{=button.href}]" data-sku="[{=button.buttonID}]" data-base-url="[{=button.href}]" id="[{=button.buttonID}]"
             class="a-link a-button a-button-primary disableicon js-link-action"
             data-eventTracking='{"trackType":"request pricing click","eventType":"click","dataValues":{"products":[/{"product_id":"[{=button.buttonID}]","product_category":["Washers & Dryers","Washing machines","Frontloader"],"product_price":"[{=priceValue ? priceValue : 0}]"}/]}}'>
                        <span class="text">
                            [{?onlinedealer.buttonLabel}][{=onlinedealer.buttonLabel}][{??}]
                                {{$t(componentConfiguration.buyButton)}}
                            [{?}]
                        </span>
          </a>
          [{?? button.action == "REQUEST_PRICING_LABEL"}]
          <p class="onlinedealerlayer_request_integratebuttons-text">[n3.productdetail.txt.requestpricinglabel]</p>

          [{??}]
          <a href="" data-sku="[{=button.buttonID}]" data-base-url="[{=button.href}]" id="[{=button.href}]"
             class="a-link a-button a-button-primary disableicon js-onlinedealer-action wtb"
             data-eventTracking='{"trackType":"buy online click", "eventType":"click", "dataValues":{"products":[/{"product_id":"[{=button.buttonID}]","product_category":["Washers & Dryers","Washing machines","Frontloader"],"product_price":"[{=priceValue ? priceValue : 0}]"}/]}}'>
                        <span class="text">
                            [{?onlinedealer.buttonLabel}][{=onlinedealer.buttonLabel}][{??}]
                                {{$t(componentConfiguration.buyButton)}}
                            [{?}]
                        </span>
          </a>
          [{?}]
        </section>
        [{~}]
        [{?}]
        [{?}]
        <section data-replace-id="dealer_logos" data-add-method="append">
          [{? it.dealers && (it.dealers.length > 0)}]
          <!-- A-1-003_Headings -->
          <h3 class="a-heading">
            {{$t(componentConfiguration.buyButton)}}</h3>
          <!-- /A-1-003_Headings -->

          [{~it.dealers :dealer:index}]
          [{? index < 4}]
          <!-- A-0-002_Logo -->


          <a href="[{=dealer.url}]" target="_blank" aria-label="[{=dealer.title}]" class="a-logo"
             data-eventTracking='{"trackType":"external retailer click", "eventType":"click", "dataValues":{"products":[/{"product_id":"","product_category":["Washers & Dryers","Washing machines","Frontloader"],"product_price":"[{=priceValue ? priceValue : 0}]"}/]}}'>
            <!-- A-1-016_Image -->
            <div
              class="a-image "
              data-t-name="Image"
            >
              <picture>
                <!--[if IE 9]>
                <audio><![endif]-->
                <source class="js_vp_3" media="(min-width: 900px)"
                        data-srcset="[{=dealer.logo}]">
                <source class="js_vp_2" media="(min-width: 600px)"
                        data-srcset="[{=dealer.logo}]">
                <source class="js_vp_1" data-srcset="[{=dealer.logo}]">
                <!--[if IE 9]></audio><![endif]-->
                <img class="lazyload  "
                     data-src="[{=dealer.logo}]"
                     src="../../img/1x1.png"
                     alt="[{=dealer.title}]">
              </picture>
            </div>
            <!-- /A-1-016_Image -->

            [{? dealer.price !== null}]
            <div class="dealer-price-wrapper">
            </div>
            [{?}]

            [{? dealer.dealerInfo !== null}]
            <div class="js-usp-dealer dealer-info">
              <span>[{=dealer.dealerInfo}]</span>
            </div>
            [{?}]
          </a>
          <!-- /A-0-002_Logo -->
          [{?}]
          [{~}]
          [{?}]
        </section>
        <section data-replace-id="pcarea-legal-text" data-add-method="replace">
          [{? (it.dealers && (it.dealers.length > 0))}]
          <p class="layer-intro-text">
            You accept the <a class="a-link a-link-inline" href="/dealer-locator/dealer_locator_privacy_policy" target="_blank" >
            <span class="text">privacy policy</span>
          </a>
            when you click "visit retailer shop"</p>

          [{?}]
        </section>
      </script>
    </form>
    <div class="ajax-success-tpl-wrapper">
      <script data-ajax-template="success" type="text/x-dot-template">
        <section data-replace-id="ajax-online-dealers-[{=it.option}]">
          [{?it.dealers}]
          [{~it.dealers :dealer:index}]
          <div class="item g-col js-item">
            <div class="m-dealerteaser" [{? !dealer.logo || dealer.logo==='' }] data-has-no-image="true" [{?}]
                 data-t-name="DealerTeaser">
              <div class="media js-media">
                [{? dealer.logo && dealer.logo !== "" }]
                <a href="[{=dealer.url}]"
                   target="_blank" data-eventtracking='{"trackType":"external retailer click", "eventType":"click", "dataValues":{"products":[/{"product_id":"[{=it._response.productCode}]"}/] }}'>
                  <div class="a-image" data-t-name="Image">
                    <picture>
                      <!--[if IE 9]>
                      <audio><![endif]-->
                      <source data-srcset="[{=dealer.logo}]">
                      <!--[if IE 9]>
                      </audio><![endif]-->
                      <img class="lazyload  "	src="/store/resources/afc2bd602592868d63feaa32c794d1f45cde6465/mbmd/a01/img/1x1.png"  alt="">
                    </picture>
                  </div>
                </a>
                [{?}]
              </div>
              <h2 class="a-heading shop-title">
                [{=dealer.title}]
              </h2>

              [{? dealer.price !== null}]

              [{?}]

              <div class="js-usp-dealer dealer-info">
                [{? dealer.dealerInfo !== null}]
                <span>[{=dealer.dealerInfo}]</span>
                [{?}]
              </div>

              [{? dealer.inStock}]
              <span class="a-productavailability in-stock">
                        <span class="text">
                            {{$t(componentConfiguration.inStock)}}</span>
                    </span>
              [{??}]
              <span class="a-productavailability out-of-stock">
                        <span class="text">
                            {{$t(componentConfiguration.outOfStock)}}</span>
                    </span>
              [{?}]
              <p>
                <a href="[{=dealer.url}]" class="a-link a-button a-button-primary disableicon "
                   target="_blank" data-eventtracking='{"trackType":"external retailer click", "eventType":"click", "dataValues":{"products":[/{"product_id":"[{=it._response.productCode}]"}/] }}'>
                  <span class="text">{{$t(componentConfiguration.visitRetailerShop)}}</span>
                </a>
              </p>
              [{? dealer.email }]
              <p class="dealerteaser-mail">
                <a href="mailto:[{=dealer.email}]" class="a-link has-icon ">
                  <i class="icon icon-mail icon-m"></i>
                  <span class="text">[{=dealer.email}]</span>
                </a>
              </p>
              [{?}]
            </div>
          </div>
          [{~}]
          [{?}]
        </section>
      </script>
    </div>

    <div data-t-name="Layer" data-id="online-dealer-layer" class="m-layer" data-t-decorator="OnlineDealer">
      <div class="js-overlay layer-overlay" />
      <div class="layer-wrapper">
        <div class="layer-content g-container">
          <div class="layer-close">
            <button name="close-button" class="a-button a-button-plain js-close-button">
              <i class="icon icon-close" />
              <span class="text sr-only">
                {{ $t(componentConfiguration.close) }}
              </span>
            </button>
          </div>
          <div class="layer-content-inner js-layer-container-inner">
            <h2 class="a-heading">
              {{ $t(componentConfiguration.headline) }}
            </h2>
            <p class="layer-intro-text" v-html="privacyPolicyText" :style="`color: ${rootColor} !important;`" />

            <div class="m-tabs" data-t-name="Tabs">
              <div class="tabs-wrapper">
                <ul class="tabs-nav">
                  <li>
                    <a href="#/Tabs=tab1/">{{ $t(componentConfiguration.tabCaption) }}</a>
                  </li>
                  <li class="tab-more">
                    <a href="#"><i class="icon icon-arrow-down"></i></a>
                  </li>
                  <li class="js-tab-more-pane tab-more-pane">
                    <ul class="js-tab-more-pane-list tab-more-pane-list" />
                  </li>
                </ul>
                <section class="tab-panel" id="tab1">
                  <h2 class="a-heading">
                    {{ $t(componentConfiguration.panelHeadline) }}
                  </h2>

                  <div
                    data-t-name="List"
                    class="o-list grid-view full-outer"
                    data-list-id="list-094d714c-3f01-4253-a89d-9b75e9aa92fc"
                    data-page-size-initial="8"
                    data-page-size-loadmore="8"
                    data-t-decorator="OnlineDealer"
                  >
                    <div class="list-layout js-list-layout" data-replace-container="ajax-online-dealers-randomized" />
                    <div
                      class="a-loadmore"
                      data-t-name="LoadMore"
                      data-list-id="list-094d714c-3f01-4253-a89d-9b75e9aa92fc"
                      data-page-size-initial="8"
                      data-page-size-loadmore="8"
                      data-t-decorator="Data"
                      data-loadmore-json-property="dealers"
                      data-loadmore-replace-container="ajax-online-dealers"
                      data-loadmore-url-param="option=randomized"
                      data-request-context=".ajax-success-tpl-wrapper"
                      data-init-event="onlinedealerbutton:click"
                    >
                      <button class="a-button a-button-primary" data-loader-type="inline" data-loader>
                        <span class="text">{{ $t(componentConfiguration.showMore) }}</span>
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, ModelProp, Vue, Prop } from "@zoovu/runner-browser-api";
  import { BuyOnlineOverlayConfiguration } from "../custom-buttons.configuration";
  import {  Button } from "../../../helpers/types";

  @Component
  export default class BuyOnlineOverlay extends Vue {
    @ModelProp()
    componentConfiguration: BuyOnlineOverlayConfiguration;

    @Prop()
    pathOfOverlayApi!: Button;

    @Prop()
    privacyPageUrl!: string;

    @Prop()
    isProductionEnvironment!: boolean;

    rootColor: string = null;

    get modelAjaxIdPath(): Object {
      return {
        "data-ajax-id": "dealerlayer-integration-buttons",
        "data-ajax": `{"url":"${this.pathOfOverlayApi?.href}", "method":"POST"}`,
      };
    }

    get privacyPolicyText(): string {
      const privacyPolicyUrl = this.privacyPageUrl;
      let privacyPolicyStandardText: string = this.$t(this.componentConfiguration.privacy).toString();

      if (
        privacyPolicyStandardText.includes("{{link}}") &&
        privacyPolicyStandardText.includes("{{/link}}") &&
        privacyPolicyUrl
      ) {
        privacyPolicyStandardText = privacyPolicyStandardText
          .replace(
            "{{link}}",
            `<a class="a-link a-link-inline" href="${privacyPolicyUrl}" target="_blank"><span class="text">`,
          )
          .replace("{{/link}}", `</span></a>`);
      } else {
        privacyPolicyStandardText = privacyPolicyStandardText.replace("{{link}}", "").replace("{{/link}}", "");
      }
      return privacyPolicyStandardText;
    }

    mounted() {
      this.rootColor = getComputedStyle(window.document.body)?.color || this.componentConfiguration.rootColor;
    }
  }
</script>
