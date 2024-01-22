import { createPaddingStyles, createFontStyle } from "../../../helpers/helpers";
import { NumericValueUtil } from "@zoovu/theme-editor-parameter-types";
import { Classes, Styles } from "jss";
import { InfoTextModalConfiguration } from "../custom-info-text-trigger.configuration";

type InfoTextStyleNames = "container" | "overlay" | "modal" | "modalArrow" | "modalClose" | "modalText";

export const infoTextModalStyles: Styles<InfoTextStyleNames, InfoTextModalConfiguration> = {
  container: ({ popupSize }) => ({
    alignItems: "center",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    left: 0,
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 100,

    "&.zv-small-popup": {
      width: NumericValueUtil.from(popupSize.width).toString(),
      height: "auto",
      border: "1px solid #000",
      position: "absolute",

      // Styles for devices with screen width < 960px
      "@media only screen and (max-width: 959px)": {
        position: "fixed",
        left: "0%",
        right: "0%",
        width: "100%",
        top: "130px",
        zIndex: "9999",
        "& .modal-arrow-top-angle": {
          display: "none",
        },
      },
    },
  }),
  overlay: {
    backgroundColor: "rgba(0, 0, 0, .5)",
    cursor: "auto",
    height: "100%",
    left: 0,
    position: "fixed",
    top: 0,
    width: "100%",
    "&.transparent-overlay": {
      opacity: 0,
      "@media only screen and (max-width: 959px)": {
        opacity: 0.5,
      },
    },
  },
  modal: ({ font, popupPadding, size }) => ({
    alignItems: "center",
    backgroundColor: "#fff",
    display: "flex",
    extend: [createFontStyle(font), createPaddingStyles(popupPadding)],
    height: NumericValueUtil.from(size.height).toString(),
    justifyContent: "center",
    position: "relative",
    width: NumericValueUtil.from(size.width).toString(),
    zIndex: 9999,
    "&.zv-info-text-popup": {
      width: "100%",
      height: "auto",
    },
  }),
  modalArrow: {
    width: 0,
    height: 0,
    borderStyle: "solid",
    position: "absolute",
    zIndex: 1,
    borderWidth: [0, "15px", "15px", "15px"],
    borderColor: "transparent transparent #000",
    top: "-15px",
    left: "calc(50% - 7px)",
    "&:after": {
      content: "''",
      position: "absolute",
      left: "-14px",
      top: "1px",
      width: 0,
      height: 0,
      borderStyle: "solid",
      borderWidth: [0, "14px", "14px", "14px"],
      borderColor: `transparent transparent #fff`,
    },
  },
  modalClose: {
    border: "none",
    zIndex: 10,
    width: "14px",
    height: "14px",
    display: "block",
    position: "absolute",
    cursor: "pointer",
    top: 10,
    right: 10,
    overflow: "hidden",
    boxSizing: "border-box",
    backgroundColor: "transparent",
    backgroundSize: "contain",
    backgroundImage: "url(http://d3smx8fpgq4j0l.cloudfront.net/zoovu/674e4ba4-7bc1-4a09-bfe9-3f976d460bab)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  },
  modalText: {
    cursor: "default",
    position: "relative",
    "&.zv-popup-text": {
      width: "inherit",
      "& *": {
        width: "inherit",
      },
    },
  },
};

export type InfoTextModalClasses = Classes<keyof typeof infoTextModalStyles>;
