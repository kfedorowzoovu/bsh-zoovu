import { Product } from '@zoovu/exd-api';
export function getRecommendationPropertyValue(
  product: Product,
  propertyName: string,
): string | undefined {
  if (!product.additionalProperties?.[propertyName]) {
    const foundProperty = product.properties[propertyName];
    return foundProperty?.value;
  }
  return product.additionalProperties?.[propertyName]?.value;
}
