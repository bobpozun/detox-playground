import { TestUtils } from '../../utils/TestUtils';
import { element, by } from 'detox';

export class Counter {
  readonly counterSection = 'counter-section';
  readonly counterText = 'counter-text';
  readonly incrementButton = 'increment-button';
  readonly decrementButton = 'decrement-button';
  readonly resetButton = 'reset-button';
  readonly sectionTitle = 'Counter';

  readonly incrementButtonMatcher;
  readonly decrementButtonMatcher;
  readonly resetButtonMatcher;

  constructor() {
    this.incrementButtonMatcher = element(by.id(this.incrementButton));
    this.decrementButtonMatcher = element(by.id(this.decrementButton));
    this.resetButtonMatcher = element(by.id(this.resetButton));
  }

  async incrementCounter(): Promise<void> {
    await TestUtils.tapElement(this.incrementButtonMatcher);
  }

  async decrementCounter(): Promise<void> {
    await TestUtils.tapElement(this.decrementButtonMatcher);
  }

  async resetCounter(): Promise<void> {
    await TestUtils.tapElement(this.resetButtonMatcher);
  }
}
