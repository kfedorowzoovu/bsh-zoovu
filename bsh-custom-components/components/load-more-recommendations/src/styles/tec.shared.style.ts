/**
 * This package is required for component styling configuration.
 * Here the code is a code with important/used in this component `shared styling classes & functions`
 *    copy-past from TEC/ExD-repo v.4.2.1
 * NOTE: These classes and functions were available at `@zoovu/theme-editor-components-shared/theme-editor-helpers`
 *       before TEC v.4.4.0
 */
import {
  FontConfiguration,
  FontWithoutAlignConfiguration,
  createFontFamilyStyle,
  NumericValue,
  NumericValueUtil,
} from '@zoovu/theme-editor-parameter-types';
import { JssStyle } from 'jss';

// ******** createConfigurationWithStates ********
export type ConfigurationWithStates<
  States extends string = 'default',
  Configuration = unknown,
> = Record<States, Configuration>;

export const createConfigurationWithStates = <
  CustomConfigurationWithStates extends ConfigurationWithStates,
>(
  states: string[],
  ConfigurationConstructor: new () => unknown,
): { new (): CustomConfigurationWithStates } => {
  const classPlaceholder = class {} as new () => CustomConfigurationWithStates;
  states.forEach((state) => {
    classPlaceholder.prototype[state] = new ConfigurationConstructor();
  });
  return classPlaceholder;
};

// ******** createBorderStyle ********
// NOTE: @m.berger use: import { createBorderStyle } from "@zoovu/theme-editor-parameter-types";

// ******** createShadowStyles ********
class Dimensions {
  public offsetX: NumericValue = { value: 0, unit: 'px' };
  public offsetY: NumericValue = { value: 0, unit: 'px' };
}

export class ShadowConfiguration {
  public applyBoxShadow = true;
  public dimensions: Dimensions = new Dimensions();
  public blur: NumericValue = { value: 0, unit: 'px' };
  public spread: NumericValue = { value: 0, unit: 'px' };
  public shadowColor = 'black';
}

const toString = NumericValueUtil.stringifyNumericValue;

export const createShadowStyles = ({
  applyBoxShadow,
  blur,
  dimensions,
  shadowColor,
  spread,
}: ShadowConfiguration): JssStyle => {
  const { offsetX, offsetY } = dimensions;

  const boxShadow = applyBoxShadow
    ? `${toString(offsetX)} ${toString(offsetY)} ${toString(blur)} ${toString(
        spread,
      )} ${shadowColor}`
    : 'none';

  return {
    boxShadow,
  };
};

// ******** createFontStyle ********
export const createFontStyle = (
  fontConfiguration:
    | FontConfiguration
    | FontWithoutAlignConfiguration
    | undefined,
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

// ******** createMarginStyles ********
// NOTE: @m.berger use: import { createMarginStyles } from "@zoovu/theme-editor-parameter-types";

// ******** createPaddingStyles ********
// NOTE: @m.berger use: import { createPaddingStyles } from "@zoovu/theme-editor-parameter-types";

// ******** createSizeStyles ********
// NOTE: @m.berger use: import { createSizeStyles } from "@zoovu/theme-editor-parameter-types";

export function scrollTo(elementY: number, duration: number): void {
  const startingY = window.pageYOffset;
  const diff = elementY - startingY;
  let start: number;

  // Bootstrap our animation - it will get called right before next frame shall be rendered.
  window.requestAnimationFrame(function step(timestamp) {
    if (!start) {
      start = timestamp;
    }
    // Elapsed milliseconds since start of scrolling.
    const time = timestamp - start;
    // Get percent of completion in range [0, 1].
    const percent = Math.min(time / duration, 1);

    window.scrollTo(0, startingY + diff * percent);

    // Proceed with animation as long as we wanted it to.
    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  });
}
