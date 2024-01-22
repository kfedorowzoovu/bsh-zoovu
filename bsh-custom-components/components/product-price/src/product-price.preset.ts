import { boolean, object, remoteComponentConfig, standardText, numeric } from "@zoovu/theme-editor-parameter-types";
import { margin, padding, fontParameters } from "../../helpers/helpers";

const productPricePreset = remoteComponentConfig(
  object(
    {
      hideCurrency: boolean({
        label: "Hide currency",
        default: false,
      }),
      showCommaDash: boolean({
        label: "Show comma and dash",
        default: false,
      }),
      originalPriceFont: fontParameters( "#000000", 14, 400),
      crossedOutOriginalPrice: boolean({
        label: "Crossed out original price",
        default: true,
      }),
      discountPriceFont: fontParameters( "#000000", 14, 400),
      priceFont: fontParameters( "#000000", 14, 400),
      pricePadding: padding(0, 0, 0, 0, "px"),
      originalPriceColumnName: standardText({
        label: "Original price column name",
        default: "originalPrice",
      }),
      rrpText: standardText({
        label: "RRP text",
        default: "",
      }),
      shopPriceDescription: standardText({
        label: "Shop price description",
        default: "",
      }),
      descriptionFont: fontParameters( "#000000", 14, 400),
      descriptionPadding: padding(0, 0, 0, 0, "px"),
      margin: margin(0, 0, 0, 0),
      width: numeric({
        default: { value: 152, unit: "px" },
        label: "Width",
        units: ["px", "em", "rem", "%"],
      }),
    },
    { label: "ProductPriceComponent" }
  )
);

export default productPricePreset;
