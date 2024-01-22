// @ts-nocheck
import {
  color,
  font,
  numeric,
  object,
  ObjectOptions,
  select,
  EmbeddedComponentParameterFormat,
  ExpressionComparator,
  SelectComponentParameterFormat,
} from "@zoovu/theme-editor-parameter-types";
import { Product, ProductProperty } from "@zoovu/exd-api";

export enum MarketplaceComponentParameterType {
  BOOLEAN = "boolean",
  COLOR = "color",
  EMBEDDED = "embedded",
  IMAGE = "image",
  JSON = "object",
  LIST = "array",
  NUMBER = "number",
  NUMERIC = "numeric",
  COLUMNS_ORDER = "columns-order",
  ORDER = "order",
  SELECT = "select",
  STANDARD_TEXT = "standard-text",
  STRING = "string",
  FONT = "font",
  SCRIPT = "script",
  SELECT_PRODUCT_ATTRIBUTES = "select-product-attributes",
  SELECT_CONTEXT_ATTRIBUTES = "select-context-attributes",
  APPEARANCE_SETTINGS_CHANGE_ACTION = "appearance-settings-change-action",
  ADD_BUTTON = "add-button",
  REMOVE_FACTORY_PARAMETER = "remove-factory-parameter",
  BADGE = "badge",
  HTML = "html",
  STYLE = "style",
  // /** Shouldn't be used as parameter definition itself */
  // DEPENDENCY = "DEPENDENCY",
}
export enum BackgroundFitOptionsValues {
  CONTAIN = "contain",
  COVER = "cover",
}
import { JssStyle } from "jss";

export declare type ExtensibleJss = JssStyle & {
  extend?: JssStyle[];
};


export const fontParametersWithTextDecoration = (
  fontColor = "black",
  fontSize = 14,
  fontWeight = 500,
  textAlign = "center",
  textDecoration = "underline",
): ObjectOptions =>
  object(
    {
      fontFamily: font({
        label: "Font family",
        default: {
          id: "serif",
          name: "Times New Roman / Times",
          type: "FALLBACK",
          fontFamily: `"Times New Roman", Times, serif`,
        },
      }),
      fontWeight: select({
        options: supportedFontWeightOptions,
        default: fontWeight,
        label: "Font weight",
      }),
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
      textDecoration: select({
        options: ["underline", "none"],
        default: textDecoration,
        label: "Text Decoration",
        format: SelectComponentParameterFormat.BUTTONS,
      }),
    },
    {
      label: "Font",
    },
  );
 

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
    },
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
    },
  );

export const fontParameters = (
  fontColor = "black",
  fontSize = 14,
  fontWeight = 500,
  textAlign = "center",
): ObjectOptions =>
  object(
    {
      fontFamily: font({
        label: "Font family",
        default: {
          id: "serif",
          name: "Times New Roman / Times",
          type: "FALLBACK",
          fontFamily: `"Times New Roman", Times, serif`,
        },
      }),
      fontWeight: select({
        options: supportedFontWeightOptions,
        default: fontWeight,
        label: "Font weight",
      }),
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
    },
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
    },
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
    },
  );

export const borderStyles = (lineStyle = "none", borderColor = "black", width = 0, radius = 0) =>
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
      radius: numeric({
        default: { value: radius, unit: "px" },
        label: "Radius",
        units: ["px", "em", "rem", "%"],
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
    { label: "border" },
  );

export const configuratorButtonStateValues = ["default", "hover", "selected", "focus", "disabled"];
const capitalize = (label: string): string => label.charAt(0).toUpperCase() + label.slice(1);

export interface NumericValue {
  value: number;
  unit?: string | undefined;
}

export type ColorValue = string;

export class PaddingConfiguration {
  public top: NumericValue = { value: 0 };
  public right: NumericValue = { value: 0 };
  public bottom: NumericValue = { value: 0 };
  public left: NumericValue = { value: 0 };
}

export const fallbackFontFamily = "Arial, Helvetica, sans-serif";

export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type FontFamilyConfiguration = string;

export class FontConfiguration {
  public fontFamily: FontFamilyConfiguration | null = null;

  public fontWeight: FontWeight = 400;

  public fontSize: NumericValue = { value: 16 };

  public color: ColorValue | null = "black";

  public textAlign: "left" | "center" | "right" | "justify" = "left";
}

export class DirectionalNumericValuesConfiguration {
  public top: NumericValue = { value: 0 };
  public right: NumericValue = { value: 0 };
  public bottom: NumericValue = { value: 0 };
  public left: NumericValue = { value: 0 };
}

export const zeroNumericValue = { value: 0 };

const applyDecimalPrecisionTo = (
  mathOperation: (a: number) => number,
  fractionDigits = 0,
): ((value: number) => number) => {
  if (fractionDigits === 0) return mathOperation;
  const multiplier = Math.pow(10, Math.abs(fractionDigits));
  return (value: number) => mathOperation(value * multiplier) / multiplier;
};

const isObject = (input: unknown): input is Record<string, unknown> => typeof input === "object" && input != null;

export class NumericValueUtil implements NumericValue {
  public static isNumericValue(input: unknown): input is NumericValue {
    if (!isObject(input) || typeof input["value"] !== "number") {
      return false;
    }
    if (typeof input["unit"] !== "string" && typeof input["unit"] !== "undefined") {
      return false;
    }
    return true;
  }

  public static parseDirectionalNumericValue = (
    values: number[],
    unit = "px",
  ): DirectionalNumericValuesConfiguration => {
    const valuesLength = values.length;
    const indexes = [
      [0, 0, 0, 0],
      [0, 1, 0, 1],
      [0, 1, 2, 1],
      [0, 1, 2, 3],
    ];

    const [top, right, bottom, left] = indexes[valuesLength - 1].map((index) => values[index]);

    return {
      top: { value: top, unit },
      bottom: { value: bottom, unit },
      left: { value: left, unit },
      right: { value: right, unit },
    };
  };

  public static stringifyNumericValue = (numericValue?: NumericValue): string | null => {
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

  public static isDefined({ value }: NumericValue = zeroNumericValue): boolean {
    return !!value || value === 0;
  }

  public static isNotZero({ value }: NumericValue = zeroNumericValue): boolean {
    return !!value;
  }

  public static from({ value, unit }: NumericValue = zeroNumericValue): NumericValueUtil {
    return new NumericValueUtil(value, unit);
  }

  public value: number;
  public unit: string | undefined;

  constructor(value: string | number = 0, unit: string | undefined = undefined) {
    const parsedValue = Number.parseFloat(`${value}`);
    this.value = Number.isNaN(parsedValue) ? 0 : parsedValue;
    this.unit = unit;
  }

  public inverse(): this {
    if (this.notDefined()) return this;
    this.value = this.value * -1;
    return this;
  }

  public absolute(): this {
    if (this.notDefined()) return this;
    this.value = Math.abs(this.value);
    return this;
  }

  public divide(divider: number): this {
    if (this.notDefined()) return this;
    this.value = this.value / divider;
    return this;
  }

  public multiply(multiplier: number): this {
    if (this.notDefined()) return this;
    this.value = this.value * multiplier;
    return this;
  }

  public floor(fractionDigits = 0): this {
    if (this.notDefined()) return this;
    this.value = applyDecimalPrecisionTo(Math.floor, fractionDigits)(this.value);
    return this;
  }

  public round(fractionDigits = 0): this {
    if (this.notDefined()) return this;
    this.value = applyDecimalPrecisionTo(Math.round, fractionDigits)(this.value);
    return this;
  }

  public ceil(fractionDigits = 0): this {
    if (this.notDefined()) return this;
    this.value = applyDecimalPrecisionTo(Math.ceil, fractionDigits)(this.value);
    return this;
  }

  public toString(fallback = "", fallbackWhenZero = false): string {
    if (this.notDefined()) return fallback;
    if (fallbackWhenZero && this.value === 0) return fallback;
    return `${this.value}${this.unit ?? ""}`;
  }

  public getMobileValues(maxValue: number): string {
    return this.value > maxValue ? `${maxValue}px` : this.toString();
  }

  private notDefined(): boolean {
    return !this.value && this.value !== 0;
  }
}

export const createFontFamilyStyle = (
  fontFamilyConfiguration: FontFamilyConfiguration | null | undefined,
): string | null => fontFamilyConfiguration ?? null;

export const createFontStyle = (
  fontConfiguration: FontConfiguration | FontWithoutAlignConfiguration | undefined,
): JssStyle => {
  if (!fontConfiguration) {
    return {};
  }
  const { color, fontFamily, fontSize, fontWeight } = fontConfiguration;

  return {
    color,
    fontFamily: createFontFamilyStyle(fontFamily),
    fontSize: NumericValueUtil.from(fontSize).toString(),
    fontWeight,
    ...(!(fontConfiguration instanceof FontWithoutAlignConfiguration) && {
      textAlign: fontConfiguration.textAlign,
    }),
  };
};

export type BorderStyle = "none" | "dotted" | "dashed" | "solid";

export class BorderConfiguration {
  public lineStyle: BorderStyle = "solid";
  public color: ColorValue = "black";
  public width: NumericValue = { value: 1 };
  public radius: NumericValue = { value: 0 };
}

export const createBorderStyle = (
  { color, lineStyle: style, width, radius }: BorderConfiguration,
  target?: "top" | "right" | "bottom" | "left" | undefined,
): JssStyle =>
  target == null
    ? {
        border: {
          color,
          style,
          width: NumericValueUtil.from(width).toString(),
          radius: NumericValueUtil.from(radius).toString(),
        },
      }
    : {
        border: "none",
        [`border${capitalize(target)}`]: {
          color,
          style,
          width: NumericValueUtil.from(width).toString(),
          radius: NumericValueUtil.from(radius).toString(),
        },
      };

export const createMarginStyles = (configuration: MarginConfiguration): JssStyle => ({
  margin: {
    top: NumericValueUtil.from(configuration.top).toString(),
    right: NumericValueUtil.from(configuration.right).toString(),
    left: NumericValueUtil.from(configuration.left).toString(),
    bottom: NumericValueUtil.from(configuration.bottom).toString(),
  },
});

export const createPaddingStyles = (configuration: PaddingConfiguration): JssStyle => ({
  padding: {
    top: NumericValueUtil.from(configuration.top).toString(),
    right: NumericValueUtil.from(configuration.right).toString(),
    left: NumericValueUtil.from(configuration.left).toString(),
    bottom: NumericValueUtil.from(configuration.bottom).toString(),
  },
});

export type ConfigurationWithStates<States extends string = "default", Configuration = unknown> = Record<
  States,
  Configuration
>;

export interface NumericValue {
  value: number;
  unit?: string | undefined;
}

export class FontWithoutAlignConfiguration {
  public fontFamily: string | null = null;

  public fontWeight: FontWeight = 400;

  public fontSize: NumericValue = { value: 16 };

  public color: string | null = "black";
}

export const createConfigurationWithStates = <CustomConfigurationWithStates extends ConfigurationWithStates>(
  states: string[],
  ConfigurationConstructor: new () => unknown,
): { new (): CustomConfigurationWithStates } => {
  const classPlaceholder = class {} as new () => CustomConfigurationWithStates;
  states.forEach((state) => {
    classPlaceholder.prototype[state] = new ConfigurationConstructor();
  });
  return classPlaceholder;
};

export const createBackgroundColor = (defaultValue = "#0070D8") => {
  return color({
    default: defaultValue,
    label: "Background color",
  });
};

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
    { label: "Icon", addSeparator: true, format: EmbeddedComponentParameterFormat.ACCORDION },
  );

export const fallbackFontFamily = "Arial, Helvetica, sans-serif";

export class MarginConfiguration {
  public top: NumericValue = { value: 0 };
  public right: NumericValue = { value: 0 };
  public bottom: NumericValue = { value: 0 };
  public left: NumericValue = { value: 0 };
}

export const createSizeStyles = (config: SizeValuesConfiguration): ExtensibleJss => {
  return {
    width: NumericValueUtil.stringifyNumericValue(config.width),
    height: NumericValueUtil.stringifyNumericValue(config.height),
  };
};

export const backgroundFitOptions: any = {
  label: "Object fit",
  type: MarketplaceComponentParameterType.SELECT,
  default: BackgroundFitOptionsValues.COVER,
  options: [BackgroundFitOptionsValues.CONTAIN, BackgroundFitOptionsValues.COVER],
};

export const justifyContent = (defaultValue: unknown = "flex-start"): ObjectOptions =>
  object(
    {
      value: select({
        options: ["flex-start", "center", "flex-end", "space-between", "space-around"],
        default: defaultValue,
        label: "Justify Content",
      }),
    },
    { label: "Justify Content" },
  );

   
export function getRecommendationPropertyValue(product: Product, propertyName: string): string | undefined {
  if (!product.additionalProperties?.[propertyName]) {
    const foundProperty = product.properties[propertyName];
    return foundProperty?.value;
  }
  return product.additionalProperties?.[propertyName]?.value;
}

export const getProductPropertyByName = (
  { properties }: Product,
  propertyName: string,
): ProductProperty | null => {
  if (!propertyName) return;
  return properties[propertyName];
};

export const getProductPropertyDefinitionByName = (
  recommendation: Product,
  propertyName: string,
): ProductProperty => {
  const { additionalProperties, properties } = recommendation;

  if (!propertyName) return null;

  let propertyDefinition: ProductProperty;

  if (additionalProperties?.[propertyName]) {
    propertyDefinition = additionalProperties[propertyName];
  } else if (Array.isArray(properties)) {
    propertyDefinition = getRecommendationProperty(recommendation, propertyName);
  }
  return propertyDefinition;
};


export function getRecommendationProperty(product: Product, propertyName: string): ProductProperty {
  if (!product.additionalProperties?.[propertyName]) {
    const foundProperty = product.properties[propertyName];
    return foundProperty;
  }
  return product.additionalProperties?.[propertyName];
}