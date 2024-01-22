import {
  boolean,
  ExpressionComparator,
  object,
  remoteComponentConfig,
  script,
  string,
  standardText,
  color,
  selectProductAttributes,
  numeric,
  EmbeddedComponentParameterFormat,
} from "@zoovu/theme-editor-parameter-types";
import { fontParameters, borderStyles, padding, margin } from "../../helpers/helpers";
const createBackgroundColor = (defaultValue = "#0070D8") => {
  return color({
    default: defaultValue,
    label: "Background color",
  });
};

const states = object(
  {
    default: object(
      {
        border: borderStyles("solid", "white", 1),
        font: fontParameters("white", 18),
        backgroundColor: createBackgroundColor(),
      },
      { label: "default" }
    ),
    hover: object(
      {
        border: borderStyles("solid", "white", 1),
        font: fontParameters("white", 18),
        backgroundColor: createBackgroundColor(),
      },
      { label: "hover" }
    ),
    active: object(
      {
        border: borderStyles("solid", "white", 1),
        font: fontParameters("white", 18),
        backgroundColor: createBackgroundColor(),
      },
      { label: "active" }
    ),
    focus: object(
      {
        border: borderStyles("solid", "white", 1),
        font: fontParameters("white", 18),
        backgroundColor: createBackgroundColor("transparent"),
      },
      { label: "focus" }
    ),
  },
  {
    label: "",
    format: EmbeddedComponentParameterFormat.TABS,
  }
);

const addToCartButtonPreset = remoteComponentConfig(
  object(
    {
      states,
      margin: margin(0, 0, 0, 0),
      padding: padding(16, 13, 16, 15),
      width: numeric({
        default: { value: 0, unit: "auto" },
        label: "Width",
        units: ["px", "em", "rem", "%", "auto"],
      }),
      addToCartText: standardText({
        label: "Add to cart text",
        default: "Add to cart",
      }),
      useScript: boolean({
        label: "Use add to cart script",
        default: false,
      }),

      addToCartScript: script({
        label: "Add to cart script",
        default: "",
        assistantParameterId: "bshAddToCartScript",
        displayIf: {
          expressions: [{ path: "useScript", comparator: ExpressionComparator.EQUALS, value: true }],
        },
      }),

      addToCartProductCatalogToggle: boolean({
        label: "Use  from product catalog",
        default: false,
        displayIf: {
          expressions: [{ path: "useScript", comparator: ExpressionComparator.EQUALS, value: false }],
        },
      }),

      addToCartLink: string({
        label: "Add to cart path",
        default: "",
        displayIf: {
          expressions: [
            { path: "addToCartProductCatalogToggle", comparator: ExpressionComparator.EQUALS, value: false },
            { path: "useScript", comparator: ExpressionComparator.EQUALS, value: false },
          ],
        },
      }),
      addToCartFromProductCatalog: selectProductAttributes({
        label: "Add to cart column name",
        default: "",
        displayIf: {
          expressions: [
            { path: "addToCartProductCatalogToggle", comparator: ExpressionComparator.EQUALS, value: true },
            { path: "useScript", comparator: ExpressionComparator.EQUALS, value: false },
          ],
        },
      }),
    },
    { label: "AddToCartButtonComponent" }
  )
);

export default addToCartButtonPreset;
