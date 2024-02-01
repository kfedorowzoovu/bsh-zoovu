import { Product, ProductProperty } from '@zoovu/exd-api';
export function getRecommendationProperty(
  product: Product,
  propertyName: string,
): ProductProperty {
  if (!product.additionalProperties?.[propertyName]) {
    const foundProperty = product.properties[propertyName];
    return foundProperty;
  }
  return product.additionalProperties?.[propertyName];
}
