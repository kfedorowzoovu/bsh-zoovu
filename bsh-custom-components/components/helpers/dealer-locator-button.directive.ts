  import { Product } from  "@zoovu/exd-api";

export enum MouseButton {
  LEFT = 0,
  MIDDLE = 1,
  RIGHT = 2,
}

const mouseDownEventHandler = (event: MouseEvent) => {
  const element = event.currentTarget;

  element?.["__setClickOutTarget__"]?.(event.currentTarget);
  element?.["__setTrackingUrl__"]?.(event.currentTarget, event);
};

export const ProductClickOutLink: Vue.DirectiveOptions = {
  bind(element: HTMLAnchorElement, binding, vNode) {
    const product: Product = binding.value || vNode?.context?.["product"];
    const recommendation: Product = binding.value || vNode?.context?.["productRecommendation"];
    const customURLProperty: string = recommendation && (vNode?.context?.["customURLPropertyName"] ?? "")
    const recommendationURL: string = recommendation && customURLProperty && (vNode?.context?.[customURLProperty] ?? "");
    const regex = /url=[^&]+/;
    const newEncondedUrl = `url=${encodeURIComponent(recommendationURL)}`;
    const isPdf = recommendationURL?.match(/pdf$/);

    if ((!product && !recommendation) || element.tagName !== "A") {
      if (process.env.NODE_ENV !== "production") console.warn(`"v-product-click-out-link" directive should be used only with A tag!`);
      return;
    }
    if(product){
      element.setAttribute("href", product.getTrackedOfferUrl())
    }
    else {
      (recommendation && !isPdf) ? element.setAttribute("href", recommendation.getTrackedOfferUrl().replace(regex,newEncondedUrl)) : element.setAttribute("href",recommendationURL);
    }
    element["__setClickOutTarget__"] = (currentElement: HTMLAnchorElement) => {
      currentElement.setAttribute("target", vNode.context?.["clickOutTarget"] || "_blank");
    };

    element["__setTrackingUrl__"] = (currentElement: HTMLAnchorElement, {button}: MouseEvent) => {
      if(product){
        currentElement.setAttribute("href", product.getTrackedOfferUrl())
      }
      else {
        (recommendation && !isPdf) ? element.setAttribute("href", recommendation.getTrackedOfferUrl().replace(regex,newEncondedUrl)) : element.setAttribute("href",recommendationURL);
      }
      if ([MouseButton.LEFT, MouseButton.MIDDLE].includes(button) && !isPdf) {
        product ? product.notifyUserMovedToProductDetails(): recommendation.notifyUserMovedToProductDetails();
      }
    };

    element.addEventListener("mousedown", mouseDownEventHandler);
  },
  unbind(element) {
    element.removeEventListener("mousedown", mouseDownEventHandler);
  },
};
