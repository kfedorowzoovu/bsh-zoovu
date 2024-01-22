<template>
    <div :class="[componentStyle.container]" v-dompurify-html="icon" />
</template>

<script lang="ts">
import { Axios, Component, ComponentConfig, ComponentStyle, Prop, Vue, Watch } from "@zoovu/runner-browser-api";
import { SelectIconClasses, iconStyles } from "./icon.styles";
import { IconConfiguration } from "./icon.configuration";

@Component({})
export default class IconRemoteComponent extends Vue {
    @ComponentStyle(iconStyles)
    public componentStyle!: SelectIconClasses;

    @ComponentConfig(IconConfiguration)
    public componentConfiguration!: IconConfiguration;

    @Prop({ required: false })
    private svg?: null | string;

    private svgHtml!: null | string = null;

    get icon(): string {
        return this.svg ?? this.svgHtml;
    }

    @Watch("componentConfiguration.svgUrl", { immediate: true })
    handleIconChange(): void {
        if (this.svg) {
            this.svgHtml = this.svg;
            return;
        }
        const svgUrl = this.componentConfiguration.svgUrl;
        if (!svgUrl) {
            return;
        }
        Axios.get(svgUrl)
            .then((res) => {
                if (!res.headers["content-type"]?.includes("image/svg+xml")) {
                    throw new Error("Icon can only render svg images");
                }

                return res.data;
            })
            .then((svgFileContent) => (this.svgHtml = svgFileContent));
    }
}
</script>
