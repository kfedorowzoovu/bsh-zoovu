<template>
  <div
    v-if="infoText"
    :class="componentStyle.container"
    class="zv-info-text"
    :style="iconLocationAdjustment"
  >
    <button
      :class="[componentStyle.icon]"
      type="button"
      @keypress.enter.stop="showModal"
      @keypress.space.stop="showModal"
      @mouseup.left.stop.prevent="showModal"
      @click.stop.prevent
    >
      <div
        :class="[componentStyle.tooltip, 'zv-answer-tooltip']"
        v-if="hasIframe"
      >
        <div :class="componentStyle.tooltipArrow"></div>
        {{ $t(componentConfiguration.tooltipText) }}
      </div>
      <svg v-if="hasIframe" width="13px" height="14px" viewBox="0 0 13 14">
        <polygon points="4 1 12 7 4 13" :style="iconStyles" />
      </svg>
      <span v-else aria-hidden="true">i</span>
    </button>
    <InfoTextModalComponent
      :component-configuration="componentConfiguration.infoTextModal"
      :info-text="infoText"
      :hide-modal="hideModal"
      v-if="isModalVisible"
      :has-iframe="hasIframe"
      :style="modalPosition"
    />
  </div>
</template>

<script lang="ts">
import {
  Component,
  ComponentConfig,
  ComponentStyle,
  Prop,
  Vue,
} from '@zoovu/runner-browser-api';
import { CustomInfoTextTriggerConfiguration } from './custom-info-text-trigger.configuration';
import {
  customInfoTextTriggerStyles,
  CustomInfoTextTriggerClasses,
} from './custom-info-text-trigger.styles';
import InfoTextModalComponent from './info-text-modal/info-text-modal.component.vue';
interface IconLocationAdjustment {
  position: string;
  top: string;
  right: string;
}
@Component({
  components: { InfoTextModalComponent },
})
export default class CustomInfoTextTriggerComponent extends Vue {
  @ComponentStyle(customInfoTextTriggerStyles)
  componentStyle!: CustomInfoTextTriggerClasses;

  @ComponentConfig(CustomInfoTextTriggerConfiguration)
  componentConfiguration!: CustomInfoTextTriggerConfiguration;

  @Prop({ default: '' })
  infoText!: string;

  @Prop({ default: '' })
  focusElementQueryOnHide!: string;

  isModalVisible = false;

  positionOfInfoTextIcon = 0;

  isDesktopWidth: boolean = false;

  isTabletWidth: boolean = false;

  get hasIframe(): boolean {
    return this.infoText.indexOf('iframe') !== -1;
  }

  get iconStyles(): string {
    return `fill:none;stroke:${this.componentConfiguration.iconColor};stroke-width:1.5px`;
  }

  get modalPosition(): { left: string; top: string } {
    if (this.hasIframe) {
      return { left: '0px', top: '0px' };
    } else if (!this.isDesktopWidth || this.isTabletWidth) {
      return;
    }
    const iconWidth = this.componentConfiguration.width.value;
    const left = `-${
      this.componentConfiguration.infoTextModal.popupSize.width.value / 2 -
      iconWidth / 2 -
      2
    }px`;
    const top = `${iconWidth + 20}px`;
    return { left, top };
  }

  showModal(): void {
    this.isModalVisible = true;
    window.addEventListener('click', this.handleOutsideClick);
  }

  callculatePositionOfInfoTextIcon(): void {
    const parentHeight =
      this.$el.parentElement?.parentElement?.parentElement?.parentElement
        ?.parentElement?.parentElement;
    if (!parentHeight) return;
    const headerImageHeight = this.getElementWithHeight(
      parentHeight,
      'header',
    )?.offsetHeight;
    const answerTextContainer = this.getElementWithHeight(
      parentHeight,
      '.answer-text-container',
    )?.offsetHeight;
    const infoTextWrapperHeight = this.getElementWithHeight(
      parentHeight,
      '.zv-info-text',
    )?.offsetHeight;
    const positionForInfoIcon = headerImageHeight
      ? Number(headerImageHeight) +
        Number(answerTextContainer / 2 - infoTextWrapperHeight)
      : Number(answerTextContainer / 2 - infoTextWrapperHeight);

    if (answerTextContainer) {
      this.positionOfInfoTextIcon = positionForInfoIcon - 9;
    }
  }

  getElementWithHeight(
    parentElement: HTMLElement,
    selector: string,
  ): HTMLElement {
    return Array.from(parentElement.querySelectorAll(selector)).find(
      (element) => element?.offsetHeight > 0,
    );
  }

  get iconLocationAdjustment(): IconLocationAdjustment {
    if (
      (this.isDesktopWidth || this.isTabletWidth) &&
      this.componentConfiguration.moveIconToAnswerTextSection
    ) {
      return {
        position: 'absolute',
        top: `${this.positionOfInfoTextIcon}px`,
        right: `10px`,
      } as IconLocationAdjustment;
    }
    return null;
  }

  isDesktopWidthFunc(): void {
    if (window.innerWidth > 960) {
      this.isDesktopWidth = true;
    } else if (window.innerWidth > 784 && window.innerWidth < 960) {
      this.isDesktopWidth = false;
      this.isTabletWidth = true;
    } else {
      this.isDesktopWidth = false;
      this.isTabletWidth = false;
    }
    this.callculatePositionOfInfoTextIcon();
  }

  mounted() {
    this.$nextTick(() => {
      this.callculatePositionOfInfoTextIcon();
      this.isDesktopWidthFunc();
    });
    window.addEventListener('resize', this.isDesktopWidthFunc);
  }

  beforeUnmount() {
    window.removeEventListener('resize', this.isDesktopWidthFunc);
  }

  hideModal(): void {
    this.isModalVisible = false;
    window.removeEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick(event): void {
    event.stopPropagation();
    this.hideModal();
  }
}
</script>
