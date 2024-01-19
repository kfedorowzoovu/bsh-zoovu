import { Component, Mixins, } from "@zoovu/runner-browser-api";
import { ZoovuFacadeMixin } from "../../helpers/zoovu-facade.mixin";

@Component({
  name: "FormatAsPriceMixin",
})
export class FormatAsPriceMixin extends Mixins(ZoovuFacadeMixin) {

  formatValueAsPrice(value: string | number): string {
    const nonZeroFalsyValue = !value && value !== 0 && value !== "0";
    if (nonZeroFalsyValue) {
      return "";
    }

    return this.zoovuFacade.localizationInfo().formatPrice(value);
  }

  formatAsPriceWithoutCurrency(formatValue: string | number): string {
    const currencySymbol = this.zoovuFacade.localizationInfo().currencySymbol ?? "";
    if (`${formatValue}`.indexOf(currencySymbol) > -1) {
      return `${formatValue}`.replace(currencySymbol, "").trim();
    }
    return `${formatValue}`;
  }

  formatAsPriceWithCommaDash(value: string): string {
    const formattedValue = this.formatValueAsPrice(value);
    const integer = formattedValue.split(".")[0].replace(",", ".");
    const decimal = formattedValue.split(".")[1];

    return decimal === "00" ? `${integer},-` : `${integer},${decimal}`;
  }
}
