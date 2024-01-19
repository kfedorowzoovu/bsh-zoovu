import {
  boolean,
  object,
  remoteComponentConfig,
  numeric,
  select,
  string
} from "@zoovu/theme-editor-parameter-types";
import { margin, padding, border, justifyContent } from "../../helpers/helpers";

const productImagePreset = remoteComponentConfig(
  object(
    {
      campaignIconsColumn: string({
        label: "Campaign icons column name",
        default: "",
      }),
      width: numeric({
        default: { value: 100, unit: "auto" },
        label: "Width",
        units: ["px", "em", "rem", "%", "auto"],
      }),
      height: numeric({
        default: { value: 100, unit: "auto" },
        label: "Height",
        units: ["px", "em", "rem", "%", "auto"],
      }),
      isImagePdpLink: boolean({
        label: "Image links to product page",
        default: false,
      }),
      containerWidth: numeric({
        default: { value: 100, unit: "auto" },
        label: "Container width",
        units: ["px", "em", "rem", "%", "auto"],
      }),
      fit: select({
        options: ["none", "fill", "contain", "cover", "scale-down"],
        default: "cover",
        label: "Object fit",
      }),
      border: border(),
      margin: margin(20, 0, 20, 0),
      padding: padding(20, 0, 20, 0),
      iconListMargin: margin(20, 0, 20, 0, "px", "Icons list margin"),
      iconWidth: numeric({
        default: { value: 100, unit: "auto" },
        label: "Icon width",
        units: ["px", "em", "rem", "%", "auto"],
      }),
      iconHeight: numeric({
        default: { value: 100, unit: "auto" },
        label: "Icon height",
        units: ["px", "em", "rem", "%", "auto"],
      }),
      iconPadding: padding(20, 0, 20, 0, "px"),
      iconBorder: border("Icon border"),
      iconJustifyContent: justifyContent(),
    },
    { label: "ProductImageComponent" }
  )
);

export default productImagePreset;
