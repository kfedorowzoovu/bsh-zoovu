import { ComponentStyleDefinition } from "@zoovu/runner-browser-api";
import { ComparisonConfiguration } from "./comparison.configuration";
import { createMarginStyles } from "../../helpers/helpers";

export const comparisonStyle: ComponentStyleDefinition = {
  container: (config: ComparisonConfiguration) => ({
    extend: createMarginStyles(config.margin),
  }),
  compareSelector: (config: ComparisonConfiguration) => ({
    extend: createMarginStyles(config.margin),
    "& .product-compare-selection": {
      alignItems: "center",
      cursor: "pointer",
      display: "flex",
      "& .answer-selection-button": {
        height: "15px",
        width: "15px",
        border: `1px solid grey`,
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        borderRadius: "4px",
        marginRight: "5px",
        "& span": {
          display: "none",
          width: "10px",
        },
        "&.isSelected span": {
          display: "block",
        },
      },
    },
  }),
};
