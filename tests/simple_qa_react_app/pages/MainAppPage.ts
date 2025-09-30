import { Counter } from '../components/Counter';
import { Greeting } from '../components/Greeting';

export class MainAppPage {
  readonly counter: Counter;
  readonly greeting: Greeting;
  readonly appTitle = 'Simple QA React App';

  constructor() {
    this.counter = new Counter();
    this.greeting = new Greeting();
  }
}
