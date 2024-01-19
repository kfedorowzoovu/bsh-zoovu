import { NumericValue } from "@zoovu/theme-editor-parameter-types";
import { Classes, Styles } from "jss";
import { IconConfiguration } from "./icon.configuration";
// import { stringifyNumericValue } from "../helpers/numeric";

export const iconStyles: Styles<"container", IconConfiguration> = {
    container: (icon: IconConfiguration) => ({
        extend: {
            ...iconSvgStyle(icon),
        },
    }),
};

export type SelectIconClasses = Classes<keyof typeof iconStyles>;

const stringifyNumericValue = (numericValue?: NumericValue): string | null => {
    if (numericValue == null) {
        return null;
    }
    const { value, unit } = numericValue;
    if (typeof value !== "number" || unit === "auto") {
        return null;
    }
    if (value === 0) {
        return "0px";
    }

    return `${value}${unit}`;
};

export const iconSvgStyle = (icon: IconConfiguration) => ({
    display: "flex",
    fill: icon.color || "none",
    width: stringifyNumericValue(icon.size) || "10px",
    height: stringifyNumericValue(icon.size) || "100%",
    "& svg": {
        width: "100%",
        height: "100%",
    },
});
