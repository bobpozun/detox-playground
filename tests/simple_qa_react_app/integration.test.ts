import { device } from 'detox';
import { MainAppPage } from './pages/MainAppPage';
import { TestUtils } from '../../utils/TestUtils';

describe('Integration Tests', () => {
  let mainAppPage: MainAppPage;

  beforeAll(async () => {
    await device.launchApp();
    mainAppPage = new MainAppPage();
  });

  test('Integration flow', async () => {
    const { counter, greeting } = mainAppPage;
    const appTitle = mainAppPage.appTitle;

    await TestUtils.assertTextVisible(appTitle);

    await counter.incrementCounter();
    await counter.incrementCounter();

    await greeting.tapNameInput();
    await greeting.typeName('Test User');
    await greeting.submitNameInput();
    await greeting.tapGreetButton();

    await TestUtils.assertTextInElementById(
      greeting.greetingText,
      'Hello, Test User!'
    );
    await TestUtils.assertTextInElementById(counter.counterText, 'Count: 2');
  });
});
