import { device, element, by } from 'detox';
import { MainAppPage } from './pages/MainAppPage';
import { TestUtils } from '../../utils/TestUtils';

describe('Greeting Tests', () => {
  let mainAppPage: MainAppPage;

  beforeAll(async () => {
    await device.launchApp();
    mainAppPage = new MainAppPage();
  });

  test('Greeting flow', async () => {
    const { greeting } = mainAppPage;
    const greetingElement = element(by.id(greeting.greetingSection));

    await TestUtils.expectElementSnapshot(greetingElement, 'greeting-initial');
    await TestUtils.assertTextVisible(greeting.sectionTitle);

    await greeting.tapGreetButton();
    await TestUtils.assertTextVisible('Error');
    await TestUtils.assertTextVisible('Please enter your name');
    await TestUtils.tapByOK();

    await greeting.tapNameInput();
    await greeting.typeName('John Doe');
    await greeting.submitNameInput();
    await greeting.tapGreetButton();
    await TestUtils.assertTextInElementById(
      greeting.greetingText,
      'Hello, John Doe!'
    );
    await TestUtils.expectElementSnapshot(greetingElement, 'greeting-success');

    await greeting.tapClearButton();

    await greeting.tapNameInput();
    await greeting.typeName('Jane Smith');
    await greeting.submitNameInput();
    await greeting.tapGreetButton();
    await TestUtils.assertTextInElementById(
      greeting.greetingText,
      'Hello, Jane Smith!'
    );
  });
});
