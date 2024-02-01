import { Product, ProductProperty } from '@zoovu/exd-api';
export const getProductPropertyByName = (
  { properties }: Product,
  propertyName: string,
): ProductProperty | null => {
  if (!propertyName) return;
  return properties[propertyName];
};
