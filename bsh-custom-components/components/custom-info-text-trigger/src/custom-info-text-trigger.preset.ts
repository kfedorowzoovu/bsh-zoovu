import {
  object,
  remoteComponentConfig,
  numeric,
  standardText,
  color,
  boolean,
} from '@zoovu/theme-editor-parameter-types';
import {
  padding,
  border,
  fontParameters,
  size,
} from '../../helpers/configurations-helper';

const customInfoTextTriggerPreset = remoteComponentConfig(
  object(
    {
      tooltipText: standardText({
        label: 'Tooltip text',
        default: '',
      }),
      iconBackground: color({
        label: 'Icon background',
        default: '#a4a4a4',
      }),
      iconHoverBackground: color({
        label: 'Icon highlight color',
        default: '#444444',
      }),
      iconColor: color({
        label: 'Icon color',
        default: '#000',
      }),
      iconBorder: border('Icon border'),
      width: numeric({
        default: { value: 20, unit: 'px' },
        label: 'Icon width',
        units: ['px'],
      }),
      tooltipWidth: numeric({
        default: { value: 300, unit: 'px' },
        label: 'Tooltip width',
        units: ['px'],
      }),
      tooltipPadding: padding(20, 0, 20, 0, 'px'),
      tooltipBorder: border('Tooltip border'),
      tooltipBackground: color({
        label: 'Tooltip background',
        default: '#fff',
      }),
      tooltipFont: fontParameters('#000000', 14, 500, 'center'),
      infoTextModal: object(
        {
          font: fontParameters('#000000', 18),
          popupSize: size(200, 200, 'auto', 'px', 'Small modal size'),
          popupPadding: padding(7, 0, 0, 0, 'px'),
          size: size(50, 50, '%', '%', 'Modal with video size'),
          padding: padding(7, 0, 0, 0),
        },
        { label: 'CustomBSHInfoTextModal' },
      ),
      moveIconToAnswerTextSection: boolean({
        default: false,
        label: 'Move info icon to answer text section',
      }),
    },
    { label: 'CustomBSHInfoTextTrigger' },
  ),
);

export default customInfoTextTriggerPreset;
