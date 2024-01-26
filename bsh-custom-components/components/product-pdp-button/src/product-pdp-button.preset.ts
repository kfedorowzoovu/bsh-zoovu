import {
  boolean,
  object,
  remoteComponentConfig,
  standardText,
  color,
  selectProductAttributes,
  numeric,
  EmbeddedComponentParameterFormat,
} from '@zoovu/theme-editor-parameter-types';
import {
  fontParameters,
  borderStyles,
  padding,
  margin,
} from '../../helpers/helpers';

const createBackgroundColor = (defaultValue = '#0070D8') => {
  return color({
    default: defaultValue,
    label: 'Background color',
  });
};

const states = object(
  {
    default: object(
      {
        border: borderStyles('solid', 'white', 1),
        font: fontParameters('white', 18),
        backgroundColor: createBackgroundColor(),
      },
      { label: 'default' },
    ),
    hover: object(
      {
        border: borderStyles('solid', 'white', 1),
        font: fontParameters('white', 18),
        backgroundColor: createBackgroundColor(),
      },
      { label: 'hover' },
    ),
    active: object(
      {
        border: borderStyles('solid', 'white', 1),
        font: fontParameters('white', 18),
        backgroundColor: createBackgroundColor(),
      },
      { label: 'active' },
    ),
    focus: object(
      {
        border: borderStyles('solid', 'white', 1),
        font: fontParameters('white', 18),
        backgroundColor: createBackgroundColor('transparent'),
      },
      { label: 'focus' },
    ),
  },
  {
    label: '',
    format: EmbeddedComponentParameterFormat.TABS,
  },
);
const productPdpButtonPreset = remoteComponentConfig(
  object(
    {
      buttonVisiblityState: boolean({
        default: false,
        label: 'Enable Custom PDP Button',
      }),
      openLinkInNewTab: boolean({
        default: false,
        label: 'Open the link in the new tab',
      }),
      states,
      margin: margin(0, 0, 0, 0),
      padding: padding(16, 13, 16, 15),
      attribute: selectProductAttributes({
        label: 'Select Url',
        default: '',
      }),
      width: numeric({
        default: { value: 0, unit: 'auto' },
        label: 'Width',
        units: ['px', 'em', 'rem', '%', 'auto'],
      }),
      buttonLabel: standardText({
        default: 'View Product',
        label: 'View product button text',
      }),
    },
    { label: 'Product Pdp Button' },
  ),
);

export default productPdpButtonPreset;
