import {
    color,
    DEFAULT_FONT_PARAMETER_VALUE,
    EmbeddedComponentParameterFormat,
    ExpressionComparator,
    image,
    ImageComponentParameterFormat,
    font,
    numeric,
    object,
    ObjectOptions,
    select,
    SelectComponentParameterFormat,
} from "@zoovu/theme-editor-parameter-types";

export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export const supportedFontWeightOptions: {
    label: string;
    value: FontWeight;
}[] = [
        { label: "Thin", value: 100 },
        { label: "Extra Light", value: 200 },
        { label: "Light", value: 300 },
        { label: "Normal", value: 400 },
        { label: "Medium", value: 500 },
        { label: "Semi Bold", value: 600 },
        { label: "Bold", value: 700 },
        { label: "Extra Bold", value: 800 },
        { label: "Black", value: 900 },
    ];

export const padding = (top = 0, right = 0, bottom = 0, left = 0, unit = "px"): ObjectOptions =>
    object(
        {
            top: numeric({
                default: { value: top, unit },
                label: "Top",
                units: ["px", "%", "rem", "em"],
            }),
            right: numeric({
                default: { value: right, unit },
                label: "Right",
                units: ["px", "%", "rem", "em"],
            }),
            bottom: numeric({
                default: { value: bottom, unit },
                label: "Bottom",
                units: ["px", "%", "rem", "em"],
            }),
            left: numeric({
                default: { value: left, unit },
                label: "Left",
                units: ["px", "%", "rem", "em"],
            }),
        },
        {
            label: "Padding",
            format: EmbeddedComponentParameterFormat.NUMERIC_VALUES_GROUP,
        }
    );

export const margin = (top = 0, right = 0, bottom = 0, left = 0, unit = "px", label = "Margin"): ObjectOptions =>
    object(
        {
            top: numeric({
                default: { value: top, unit },
                label: "Top",
                units: ["px", "%", "rem", "em"],
            }),
            right: numeric({
                default: { value: right, unit },
                label: "Right",
                units: ["px", "%", "rem", "em"],
            }),
            bottom: numeric({
                default: { value: bottom, unit },
                label: "Bottom",
                units: ["px", "%", "rem", "em"],
            }),
            left: numeric({
                default: { value: left, unit },
                label: "Left",
                units: ["px", "%", "rem", "em"],
            }),
        },
        {
            label,
            format: EmbeddedComponentParameterFormat.NUMERIC_VALUES_GROUP,
        }
    );

export const fontParameters = (
    fontColor = "black",
    fontSize = 14,
    fontWeight = 500,
    textAlign = "left"
): ObjectOptions =>
    object(
        {
            fontFamily: font({ label: "Font family", default: DEFAULT_FONT_PARAMETER_VALUE }),
            fontWeight: select({ options: supportedFontWeightOptions, default: fontWeight, label: "Font weight" }),
            fontSize: numeric({
                default: { value: fontSize, unit: "px" },
                label: "Font size",
                units: ["px", "em", "rem"],
            }),
            color: color({ default: fontColor, label: "Color" }),
            textAlign: select({
                options: ["left", "center", "right", "justify"],
                default: textAlign,
                label: "Alignment",
                format: SelectComponentParameterFormat.BUTTONS,
            }),
        },
        {
            label: "Font",
        }
    );

export const border = (label = "Border", lineStyle = "none", borderColor = "black", width = 0): ObjectOptions =>
    object(
        {
            lineStyle: select({
                options: ["none", "solid", "dashed", "dotted"],
                default: lineStyle,
                label: "Line style",
                format: SelectComponentParameterFormat.BUTTONS,
            }),
            width: numeric({
                default: { value: width, unit: "px" },
                label: "Width",
                units: ["px", "em", "rem"],
                displayIf: {
                    expressions: [
                        {
                            path: "lineStyle",
                            comparator: ExpressionComparator.NOT_EQUALS,
                            value: "none",
                        },
                    ],
                },
            }),
            color: color({
                default: borderColor,
                label: "Color",
                displayIf: {
                    expressions: [
                        {
                            path: "lineStyle",
                            comparator: ExpressionComparator.NOT_EQUALS,
                            value: "none",
                        },
                    ],
                },
            }),
        },
        {
            label,
        }
    );

export const size = (height = 0, width = 0, heightUnit = "%", widthUnit = "%", label = "Size"): ObjectOptions =>
    object(
        {
            width: numeric({
                default: { value: width, unit: widthUnit },
                label: "Width",
                units: ["px", "em", "rem", "%", "auto"],
            }),
            height: numeric({
                default: { value: height, unit: heightUnit },
                label: "Height",
                units: ["px", "em", "rem", "%", "auto"],
            }),
        },
        {
            label: label,
            format: EmbeddedComponentParameterFormat.ROW,
        }
    );

export const icon = (svg = "", value = 14, defaultColor = "black"): ObjectOptions =>
    object(
        {
            svgUrl: image({ default: svg, label: "SvgURL", format: ImageComponentParameterFormat.ICON_LIBRARY }),
            size: numeric({
                default: { value: value, unit: "px" },
                label: "Size",
                units: ["px", "%", "rem", "em"],
            }),
            color: color({ default: defaultColor, label: "Color" }),
        },
        { label: "Icon", addSeparator: true, format: EmbeddedComponentParameterFormat.ACCORDION }
    );
