import {
  SizeValuesConfiguration,
  PaddingConfiguration,
  FontConfiguration,
  BorderConfiguration,
} from "@zoovu/theme-editor-parameter-types";
import { NumericValue } from "../../helpers/helpers";

export class InfoTextModalConfiguration {
  font: FontConfiguration = new FontConfiguration();
  popupSize: SizeValuesConfiguration = new SizeValuesConfiguration();
  popupPadding: PaddingConfiguration = new PaddingConfiguration();
  size: SizeValuesConfiguration = new SizeValuesConfiguration();
  padding: PaddingConfiguration = new PaddingConfiguration();
}

export class CustomInfoTextTriggerConfiguration {
  tooltipText = "";
  iconBackground = "";
  iconHoverBackground = "";
  iconColor = "";
  iconBorder: BorderConfiguration = new BorderConfiguration();
  width: NumericValue = { value: 20 };
  tooltipWidth: NumericValue = { value: 300 };
  tooltipPadding: PaddingConfiguration = new PaddingConfiguration();
  tooltipBorder: BorderConfiguration = new BorderConfiguration();
  tooltipBackground = "";
  tooltipFont: FontConfiguration = new FontConfiguration();
  infoTextModal: InfoTextModalConfiguration = new InfoTextModalConfiguration();
  moveIconToAnswerTextSection = false;
}
