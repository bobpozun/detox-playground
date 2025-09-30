import { device, element, by } from 'detox';
import { MainAppPage } from './pages/MainAppPage';
import { TestUtils } from '../../utils/TestUtils';

describe('Counter Tests', () => {
  let mainAppPage: MainAppPage;

  beforeAll(async () => {
    await device.launchApp();
    mainAppPage = new MainAppPage();
  });

  test('Counter flow', async () => {
    const { counter } = mainAppPage;
    const appTitle = mainAppPage.appTitle;
    const counterElement = element(by.id(counter.counterSection));

    await TestUtils.assertTextVisible(appTitle);
    await TestUtils.assertTextVisible(counter.sectionTitle);

    await TestUtils.assertTextInElementById(counter.counterText, 'Count: 0');
    await TestUtils.expectElementSnapshot(counterElement, 'counter-initial');

    await counter.incrementCounter();
    await TestUtils.assertTextInElementById(counter.counterText, 'Count: 1');
    await TestUtils.expectElementSnapshot(counterElement, 'counter-increment');

    await counter.incrementCounter();
    await TestUtils.assertTextInElementById(counter.counterText, 'Count: 2');

    await counter.decrementCounter();
    await TestUtils.assertTextInElementById(counter.counterText, 'Count: 1');

    await counter.resetCounter();
    await TestUtils.assertTextInElementById(counter.counterText, 'Count: 0');
  });
});
