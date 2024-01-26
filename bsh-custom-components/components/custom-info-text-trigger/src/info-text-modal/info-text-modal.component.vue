<template>
  <div
    :class="[componentStyle.container, { 'zv-small-popup': !hasIframe }]"
    aria-modal="true"
    aria-labelledby="zv-info-text-modal-content"
    @keydown.esc.stop="hideModal"
    @click.stop.prevent
  >
    <div
      :class="[componentStyle.overlay, { 'transparent-overlay': !hasIframe }]"
      @mouseup.left.stop="hideModal"
    />
    <div :class="[componentStyle.modal, { 'zv-info-text-popup': !hasIframe }]">
      <div
        :class="componentStyle.modalArrow"
        class="modal-arrow-top-angle"
        v-if="!hasIframe"
      ></div>
      <button
        :class="[componentStyle.modalClose]"
        type="button"
        @keypress.enter.stop="hideModal"
        @keypress.space.stop="hideModal"
        @mouseup.left.stop="hideModal"
      />
      <p
        :class="[componentStyle.modalText, { 'zv-popup-text': !hasIframe }]"
        tabindex="0"
        v-html="infoText"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  ComponentConfig,
  ComponentStyle,
  Vue,
  Prop,
} from '@zoovu/runner-browser-api';
import { InfoTextModalConfiguration } from '../custom-info-text-trigger.configuration';
import {
  infoTextModalStyles,
  InfoTextModalClasses,
} from './info-text-modal.styles';

@Component
export default class InfoTextModalComponent extends Vue {
  @ComponentStyle(infoTextModalStyles)
  componentStyle!: InfoTextModalClasses;

  @ComponentConfig(InfoTextModalConfiguration)
  componentConfiguration!: InfoTextModalConfiguration;

  @Prop({ default: '' })
  infoText!: string;

  @Prop()
  hideModal!: void;

  @Prop()
  hasIframe!: boolean;
}
</script>
