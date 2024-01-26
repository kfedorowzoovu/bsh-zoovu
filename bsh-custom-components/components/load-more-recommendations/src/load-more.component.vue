<template>
  <button :class="[componentStyle.container]" @click="showRecommendations">
    <span v-if="showMoreText">{{
      $t(componentConfiguration.buttonLabel)
    }}</span>
    <span v-else>{{ $t(componentConfiguration.buttonLabelAfterClicked) }}</span>
  </button>
</template>

<script lang="ts">
import {
  Component,
  ComponentConfig,
  ComponentStyle,
  ComponentStyleDefinition,
  Mixins,
  Watch,
} from '@zoovu/runner-browser-api';
import { LoadMoreConfiguration } from './load-more.configuration';
import { loadMoreStyle } from './load-more.style';
import { ZoovuFacadeMixin } from '@zoovu/exd-api';

/**
 * Example component which renders the assistant info and passed configuration.
 */

export enum ClassEnumValues {
  TARGETED_CLASS_NAME = '.zv-advisor-cluster-number-2',
  CLASS_VISIBILITY_STATE = 'block',
  CLASS_HIDDEN_STATE = 'none',
}
@Component
export default class LoadMoreComponent extends Mixins(ZoovuFacadeMixin) {
  @ComponentConfig(LoadMoreConfiguration)
  componentConfiguration: LoadMoreConfiguration;

  @ComponentStyle(loadMoreStyle)
  componentStyle: ComponentStyleDefinition;

  showMoreText = true;

  buttonVisibilityState = false;

  MIN_DESKTOP_WIDTH = 993;

  isLargeScreen = false;

  @Watch('$vuetify.breakpoint.width')
  onResize() {
    this.isLargeScreen = this.isWindowInnerWidth();
  }

  isWindowInnerWidth = (): boolean =>
    window.innerWidth > this.MIN_DESKTOP_WIDTH;

  getElement(selector) {
    return this.$root.$el.querySelector<HTMLElement>(selector);
  }

  async mounted() {
    await this.zoovuFacade.waitForAdvisorInitialization();
    this.isLargeScreen = this.isWindowInnerWidth();
    this.getElement(ClassEnumValues.TARGETED_CLASS_NAME).style.display =
      ClassEnumValues.CLASS_HIDDEN_STATE;
  }

  // @todo: Test this reactivity
  @Watch('monitorClusters')
  changeInitiallyExpanded() {
    this.buttonVisibilityState = this.monitorClusters;

    if (this.buttonVisibilityState) {
      setTimeout(this.adjustDropDown, 1500);
    }

    const element = this.getElement(
      ClassEnumValues.TARGETED_CLASS_NAME,
    ) as HTMLElement;
    const productSortDropdown = this.getElement(
      '[class^="productSortBy"]',
    ) as HTMLElement;

    if (element && element.style?.display === 'block') {
      this.showMoreText = true;
      element.style.display = ClassEnumValues.CLASS_HIDDEN_STATE;
      productSortDropdown.style.display = 'none';
    }
  }

  get monitorClusters(): boolean {
    return this.zoovuFacade.products?.hasProductsByCluster(2);
  }

  adjustDropDown(): void {
    const getHeight = (selector: string) =>
      (this.getElement(selector) as HTMLElement)?.offsetHeight ?? 0;
    const totalHeight =
      getHeight('.zv-advisor-cluster-number-0') +
      getHeight('.zv-advisor-cluster-number-1') -
      15;
    const productSortDropdown = this.getElement(
      '[class^="productSortBy"]',
    ) as HTMLElement;

    if (productSortDropdown && this.isWindowInnerWidth()) {
      Object.assign(productSortDropdown.style, {
        position: 'absolute',
        top: `${totalHeight}px`,
        right: `0px`,
      });
    }
  }

  showRecommendations(): void {
    const element = this.getElement(
      ClassEnumValues.TARGETED_CLASS_NAME,
    ) as HTMLElement;
    const productSortDropdown = this.getElement(
      '[class^="productSortBy"]',
    ) as HTMLElement;
    const isHidden =
      element.style.display === ClassEnumValues.CLASS_HIDDEN_STATE;

    element.style.display = isHidden
      ? ClassEnumValues.CLASS_VISIBILITY_STATE
      : ClassEnumValues.CLASS_HIDDEN_STATE;
    this.showMoreText = !isHidden;
    productSortDropdown.style.display = isHidden ? 'block' : 'none';
  }
}
</script>
