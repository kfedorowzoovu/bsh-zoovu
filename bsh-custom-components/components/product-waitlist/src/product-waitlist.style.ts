import { Classes, Styles } from "jss";
import { ProductWaitlistConfiguration } from "./product-waitlist.configuration";

export const productWaitlistStyle: Styles<"container" | "placeholder", ProductWaitlistConfiguration> = {
  container: {},
  placeholder: {
    color: "#000",
    display: "block",
    fontSize: "0.85rem",
    margin: "8px",
  },
};

export type productWaitlistStyleType = Classes<keyof typeof productWaitlistStyle>;
