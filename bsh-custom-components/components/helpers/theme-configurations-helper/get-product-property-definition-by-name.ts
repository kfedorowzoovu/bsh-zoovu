import { Product, ProductProperty } from '@zoovu/exd-api';
import { getRecommendationProperty } from './get-recommendation-property';

export const getProductPropertyDefinitionByName = (
  recommendation: Product,
  propertyName: string,
): ProductProperty => {
  const { additionalProperties, properties } = recommendation;

  if (!propertyName) return null;

  let propertyDefinition: ProductProperty;

  if (additionalProperties?.[propertyName]) {
    propertyDefinition = additionalProperties[propertyName];
  } else if (Array.isArray(properties)) {
    propertyDefinition = getRecommendationProperty(
      recommendation,
      propertyName,
    );
  }
  return propertyDefinition;
};
