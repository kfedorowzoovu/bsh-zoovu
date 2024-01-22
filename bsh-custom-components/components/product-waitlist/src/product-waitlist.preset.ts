import {
  string,
  object,
  standardText,
  EmbeddedComponentParameterFormat,
  remoteComponentConfig,
} from "@zoovu/theme-editor-parameter-types";

const productWaitlistPreset = remoteComponentConfig(
  object(
    {
      dataActionEndpoint: string({
        label: "Data action endpoint",
        description: "For example: 'ajax/product/back_in_stock_notify'",
        default: "ajax/product/back_in_stock_notify",
        addSeparator: true,
      }),
      subscribeForUnavailableProductText: standardText({
        label: "Subscribe for unavailable product",
        default: "Subscribe for unavailable product",
      }),
      emailAddressLabel: standardText({
        label: "Email address label",
        default: "Email address",
      }),
      headerText: standardText({
        label: "Header text",
        default: "Header",
      }),
      footerText: standardText({
        label: "Footer text",
        default: "Footer",
      }),
      submitText: standardText({
        label: "Submit",
        default: "Submit",
      }),
      emailFieldsMismatchText: standardText({
        label: "Product waitlist email fields mismatch",
        default: "Product waitlist email fields mismatch",
      }),
      emailAddressIsMissingText: standardText({
        label: "Email address is missing",
        default: "Email address is missing",
      }),
      emailAddressIsNotValidText: standardText({
        label: "Email address is not valid",
        default: "Email address is not valid",
      }),
      productSubscriptionWasSuccessfulText: standardText({
        label: "Product subscription was successful",
        default: "Product subscription was successful",
      }),
      closeButtonAriaLabel: standardText({
        label: "Close button aria label",
        default: "Close",
      }),
    },
    {
      label: "Product Waitlist",
      format: EmbeddedComponentParameterFormat.ACCORDION,
    }
  )
);

export default productWaitlistPreset;
