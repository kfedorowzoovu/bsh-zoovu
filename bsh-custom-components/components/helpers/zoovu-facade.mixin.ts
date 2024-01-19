import { AdvisorViewContext, Component, Inject, Vue } from "@zoovu/runner-browser-api";
import { ZoovuFacade } from "@zoovu/exd-api";
@Component({
  name: "ZoovuFacadeMixin",
})
export class ZoovuFacadeMixin extends Vue {
  @Inject("context")
  private _context!: AdvisorViewContext;

  @Inject("EDITABLE_FLEX_LAYOUT_CONTEXT_KEY")
  private editorContext: { isEditMode: boolean };

  private _zoovuFacade: ZoovuFacade | null = null;

  get zoovuFacade(): ZoovuFacade {
    const advisor = this._context.advisor;

    // TODO @g.wojtanowicz Fix this @ts-ignore
    // TODO @g.wojtanowicz Fix reactivity, we should not create the facade anytime the property is accessed
    // @ts-ignore
    this._zoovuFacade = new ZoovuFacade(advisor);

    return this._zoovuFacade; 
  }
  get isEditMode(): boolean {
    return this.editorContext?.isEditMode ?? false;
  }
}