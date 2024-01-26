import {
  color,
  EmbeddedComponentParameterFormat,
  object,
  remoteComponentConfig,
  standardText,
  string,
  numeric,
} from '@zoovu/theme-editor-parameter-types';
import {
  padding,
  margin,
  size,
  borderStyles,
  fontParameters,
  createBackgroundColor,
  fontParametersWithTextDecoration,
} from '../../helpers/helpers';

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

const customButtonsPreset = remoteComponentConfig(
  object(
    {
      buyOnlineButton: object(
        {
          states,
          margin: margin(0, 0, 0, 0),
          padding: padding(16, 13, 16, 15),
          size: size(100, 10, 'auto', 'auto'),
          buyOnlineText: standardText({
            label: 'Buy online text',
            default: 'Buy online',
          }),
          icon: string({
            label: 'Icon url',
            default: '#',
          }),
          iconSize: size(12, 12, 'px', 'px', 'Icon size'),
          iconMargin: margin(0, 5, 0, 0, 'px', 'Icon margin'),
          buyOnlineOverlay: object(
            {
              rootColor: color({
                label: 'Root color',
                default: (themeContext) =>
                  themeContext.colorsPalette.primary.main,
              }),
              buyButton: standardText({
                label: "'Buy online' button",
                default: 'Buy online',
              }),
              inStock: standardText({
                label: 'In stock',
                default: 'In stock',
              }),
              outOfStock: standardText({
                label: 'Out of stock',
                default: 'Out of stock',
              }),
              visitRetailerShop: standardText({
                label: 'Visit retailer shop button',
                default: 'Visit retailer shop',
              }),
              close: standardText({
                label: "'Close overlay' button",
                default: 'Close',
              }),
              headline: standardText({
                label: 'Headline',
                default: 'Product is available at below online stores',
              }),
              privacy: standardText({
                label: 'Privacy policy text (interpolated with {0})',
                default:
                  'You accept the {0} when you click "visit retailer shop"',
              }),
              privacyLink: standardText({
                label: 'Privacy policy link text (interpolation of {0})',
                default: 'privacy policy',
              }),
              tabCaption: standardText({
                label: 'Tab caption',
                default: 'All dealers',
              }),
              panelHeadline: standardText({
                label: 'Panel headline',
                default: 'All dealers',
              }),
              showMore: standardText({
                label: 'Show more button',
                default: 'Show more',
              }),
            },
            {
              label: 'Buy online overlay',
              format: EmbeddedComponentParameterFormat.ACCORDION,
            },
          ),
        },
        {
          label: 'Buy Online Button',
          format: EmbeddedComponentParameterFormat.ACCORDION,
        },
      ),

      dealerLocatorButton: object(
        {
          attributeName: string({
            label: 'Data column name (sku)',
            default: 'sku',
          }),
          customButtonLabel: standardText({
            label: 'Button text',
            default: 'Button text',
          }),
          icon: string({
            label: 'Icon url',
            default: '#',
          }),
          iconSize: size(12, 12, 'px', 'px', 'Icon size'),
          iconMargin: margin(0, 5, 0, 0, 'px', 'Icon margin'),
          states,
          margin: margin(0, 0, 0, 0),
          padding: padding(16, 13, 16, 15),
          size: size(100, 10, 'auto', 'auto'),
        },
        {
          label: 'Dealer Locator Button',
          format: EmbeddedComponentParameterFormat.ACCORDION,
        },
      ),
      combinableProductsButton: object(
        {
          attributeName: string({
            label: 'Property column name',
            default: 'combinableProductsURL',
          }),
          customTypeName: string({
            label: 'Custom type name',
            default: 'combinable_products',
          }),
          margin: margin(0, 0, 0, 0),
          padding: padding(0, 0, 0, 0),
          size: size(100, 100, 'auto', '%'),
          states: object(
            {
              default: object(
                {
                  border: borderStyles(),
                  font: fontParametersWithTextDecoration('#0070D8', 15),
                  backgroundColor: createBackgroundColor('white'),
                },
                { label: 'default' },
              ),
              hover: object(
                {
                  border: borderStyles(),
                  font: fontParametersWithTextDecoration('#0070D8', 15),
                  backgroundColor: createBackgroundColor('white'),
                },
                { label: 'hover' },
              ),
              active: object(
                {
                  border: borderStyles(),
                  font: fontParametersWithTextDecoration('#0070D8', 15),
                  backgroundColor: createBackgroundColor('white'),
                },
                { label: 'active' },
              ),
              focus: object(
                {
                  border: borderStyles(),
                  font: fontParametersWithTextDecoration('#0070D8', 15),
                  backgroundColor: createBackgroundColor('white'),
                },
                { label: 'focus' },
              ),
            },
            {
              label: '',
              format: EmbeddedComponentParameterFormat.TABS,
            },
          ),
        },
        {
          label: 'Combinable Products Button',
          format: EmbeddedComponentParameterFormat.ACCORDION,
        },
      ),
      retailerLogoButton: object(
        {
          retailerLogosPrivacyPolicyUrl: standardText({
            label: 'Retailer logos privacy policy url',
            default: '/dealer-locator/dealer_locator_privacy_policy',
          }),
          apiEndPointUrl: string({
            label: 'Button api endpoint url',
            default: '/ajax/dealer/integration/button/',
          }),
          buyOnline: standardText({
            label: 'Buy Online header',
            default: 'Buy online',
          }),
          privacyPolicy: standardText({
            label: 'Private policy text',
            default: `You accept the {{link}}privacy policy{{/link}} when you click "visit retailer shop"`,
          }),
          font: fontParameters('#000', 14),
          margin: margin(5, 0, 5, 0),
          buyOnlinePadding: padding(15, 0, 15, 0, 'px'),
          arrowColor: color({
            default: '#000',
            label: 'Arrow color',
          }),
          arrowRightPadding: numeric({
            default: { value: 5, unit: 'px' },
            label: 'Arrow right padding',
            units: ['px'],
          }),
          iconSize: numeric({
            default: { value: 10, unit: 'px' },
            label: 'Arrow width',
            units: ['px'],
          }),
          logoBorder: borderStyles('solid', '#bfc0c2', 1),
          logoPadding: padding(15, 15, 15, 15, 'px'),
          verticalMargin: numeric({
            default: { value: 10, unit: 'px' },
            label: 'Vertical margin between logos',
            units: ['px'],
          }),
          horizontalMargin: numeric({
            default: { value: 10, unit: 'px' },
            label: 'Horizontal margin between logos',
            units: ['px'],
          }),
          privacyPolicyPadding: padding(15, 0, 15, 0, 'px'),
        },
        {
          label: 'Retailer Logo Button',
          format: EmbeddedComponentParameterFormat.ACCORDION,
        },
      ),
    },
    { label: 'Custom BSH Buttons' },
  ),
);

export default customButtonsPreset;
