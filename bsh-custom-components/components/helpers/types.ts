import { ContextScope } from '@zoovu/runner-browser-api';

/* eslint-disable camelcase */
export interface TrackingProduct {
  product_id: string;
  product_quantity?: string;
  product_price?: string;
}

export interface TrackingDataValues {
  products?: Array<TrackingProduct>;
  basket_interaction?: string;
}
/* eslint-enable camelcase */

export interface TrackingData {
  trackType: string;
  eventType: string;
  dataValues: TrackingDataValues;
}

export enum CatalogVisibilityType {
  Marketing = 'MARKETING',
  Shop = 'SHOP',
}

export interface AddToCartData {
  'data-base-url'?: string;
  id?: string;
}

export interface AjaxRequestData {
  url: string;
  method: string;
  dataType: string;
}

export enum DataColumnName {
  Buyable = 'buyable',
  CountryCode = 'country_code',
  PermanentlyNotAvailable = 'permanently_not_available',
  CatalogVisibilityType = 'catalogVisibilityType',
  EnergyIcon = 'energyIcon120',
  EnergyLabelIcon = 'energyLabelIcon',
  EnergyLabelDoc = 'energyLabelDoc',
  CampaignIcons = 'campaign_icons',
  KeyFeatures = 'keyfeatures',
  Availability = 'availability',
  FixedPromotion = 'fixed_promotion',
  Price = 'price',
  OriginalPrice = 'originalPrice',
  Header1 = 'HE_HEADER1',
  Header2 = 'HE_HEADER2',
  Header4 = 'HE_HEADER4',
  Header5 = 'HE_HEADER5',
  Header6 = 'HE_HEADER6',
}

export enum AdditionalPropertyMetaDataKey {
  BuyOnline = '__buy_online_dealer_list__',
  TargetCluster = '__target_cluster__',
}

export interface Window {
  mountedFunctionsExecuted?: boolean;
  T?: {
    Utils: {
      initializeModules: ($el: Element) => void;
      destroyModules: ($el: Element) => void;
    };
  };
}

interface CompositeContextStroreItem {
  key: string;
  value: any;
  type?: ContextSchemaAttributeType;
  defaultValue: string | number | boolean | string[];
  scope: ContextScope;
  usesPersonalData: boolean;
  get(variableName: string): any;
}
declare type ContextSchemaAttributeType = 'TEXT' | 'BOOL' | 'NUMBER' | 'LIST';

export interface AdvisorForContext {
  contextManager: CompositeContextStroreItem;
}

export interface Button {
  buttonID: string;
  href: string;
  action: string;
}

export interface BuyButton {
  buttonLabel: string;
  buttons: Button[];
}

export interface Dealer {
  dealerId: string;
  logo?: string;
  title?: string;
  price?: string;
  url?: string;
  inStock?: boolean;
  dealerInfo?: string;
}

export interface TypeGroups {
  buyButton: BuyButton;
}

export interface RetailerLogosData {
  typeGroups: TypeGroups;
  action: null;
  productCode: string;
  dealers: Dealer[];
}
