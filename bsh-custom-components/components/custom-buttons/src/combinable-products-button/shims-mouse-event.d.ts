import { MouseButton } from './combinable-products-button.directive';

interface MouseEvent extends UIEvent {
  readonly button: number & MouseButton;
}
