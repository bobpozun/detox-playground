import { TestUtils } from '../../utils/TestUtils';
import { element, by } from 'detox';

export class Greeting {
  readonly greetingSection = 'greeting-section';
  readonly nameInput = 'name-input';
  readonly greetButton = 'greet-button';
  readonly clearButton = 'clear-button';
  readonly greetingText = 'greeting-text';
  readonly sectionTitle = 'Greeting';

  readonly nameInputMatcher;
  readonly greetButtonMatcher;
  readonly clearButtonMatcher;

  constructor() {
    this.nameInputMatcher = element(by.id(this.nameInput));
    this.greetButtonMatcher = element(by.id(this.greetButton));
    this.clearButtonMatcher = element(by.id(this.clearButton));
  }

  async tapGreetButton(): Promise<void> {
    await TestUtils.tapElement(this.greetButtonMatcher);
  }

  async tapClearButton(): Promise<void> {
    await TestUtils.tapElement(this.clearButtonMatcher);
  }

  async tapNameInput(): Promise<void> {
    await TestUtils.tapElement(this.nameInputMatcher);
  }

  async typeName(name: string): Promise<void> {
    await TestUtils.typeInElement(this.nameInputMatcher, name);
  }

  async submitNameInput(): Promise<void> {
    await TestUtils.tapReturnKey(this.nameInputMatcher);
  }
}
