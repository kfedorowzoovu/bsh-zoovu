import {
  image,
  ImageComponentParameterFormat,
  object,
  remoteComponentConfig,
  standardText,
  string,
} from "@zoovu/theme-editor-parameter-types";
import { margin } from "../../helpers/helpers";

const comparisonPreset = remoteComponentConfig(
  object(
    {
      margin: margin(0, 0, 0, 0),
      comparisonPageUrl: string({
        label: "Comparison page url",
        default: "#",
      }),
      checkIcon: image({
        label: "Icon",
        default: "https://themes-tiger.zoovu.com/custom-dev/assets/icons/checkmark.svg",
        format: ImageComponentParameterFormat.ICON_LIBRARY,
        static: true,
      }),
      compareTitle: standardText({
        label: "Product Compare - Compare Title",
        default: "You have selected {selectedProducts} products to compare.",
      }),
      compareStart: standardText({
        label: "Start compare",
        default: "Compare products",
      }),
      compareSelector: standardText({
        label: "Compare selector - headline",
        default: "Compare product ",
      }),
      maxNumber: standardText({
        label: "Product Compare - Warning about max number of products",
        default: "You already selected 4 products to compare.",
      }),
    },
    { label: "BuyOnlineButtonComponent" }
  )
);

export default comparisonPreset;
