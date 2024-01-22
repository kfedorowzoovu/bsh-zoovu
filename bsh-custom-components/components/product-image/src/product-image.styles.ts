import { Classes, Styles } from "jss";
import { ProductImageConfiguration } from "./product-image.configuration";
import {
  createMarginStyles,
  createPaddingStyles,
  createBorderStyle,
} from "../../helpers/helpers";

export const productImageStyles: Styles<"container" | "iconList"> = {
  container: ({ border, margin, padding, width, height, fit }: ProductImageConfiguration) => ({
    extend: [createBorderStyle(border), createMarginStyles(margin), createPaddingStyles(padding)],
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    width: "auto",
    height: "100%",
    maxWidth: "100%",
    "& img": {
      maxWidth: "100%",
      maxHeight: "100%",
      width: `${width.value}${width.unit}`,
      height: `${height.value}${height.unit}`,
      objectFit: fit,
    },
  }),
  iconList: ({ iconWidth, iconHeight, iconBorder, iconListMargin, iconPadding, fit, iconJustifyContent }: ProductImageConfiguration) => ({
    extend: [createMarginStyles(iconListMargin)],
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: iconJustifyContent,
    "& img": {
      extend: [createPaddingStyles(iconPadding), createBorderStyle(iconBorder)],
      width: `${iconWidth.value}${iconWidth.unit}`,
      height: `${iconHeight.value}${iconHeight.unit}`,
      objectFit: fit,
    },
  }),
};

export type ProductImageStyles = Classes<keyof typeof productImageStyles>;
