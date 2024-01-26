import { MouseButton } from '../../../helpers/dealer-locator-button.directive';

interface MouseEvent extends UIEvent {
  readonly button: number & MouseButton;
}
