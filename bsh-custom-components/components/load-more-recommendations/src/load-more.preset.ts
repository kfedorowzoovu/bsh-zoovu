import {
  object,
  standardText,
  color,
  numeric,
  EmbeddedComponentParameterFormat,
  remoteComponentConfig,
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
const loadMorePreset = remoteComponentConfig(
  object(
    {
      states,
      margin: margin(0, 0, 0, 0),
      padding: padding(16, 13, 16, 15),
      width: numeric({
        default: { value: 0, unit: 'auto' },
        label: 'Width',
        units: ['px', 'em', 'rem', '%', 'auto'],
      }),
      buttonLabel: standardText({
        default: 'Lore More',
        label: 'Load more button text',
      }),
      buttonLabelAfterClicked: standardText({
        default: 'Load Less',
        label: 'Load less button text',
      }),
    },
    { label: 'Load More Recommendations' },
  ),
);

export default loadMorePreset;
