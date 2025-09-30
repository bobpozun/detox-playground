/* eslint-disable @typescript-eslint/no-explicit-any */
import detox from 'detox';
import { expect } from '@jest/globals';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import { TestUtils } from './TestUtils';

beforeAll(async () => {
  const initSymbol = Object.getOwnPropertySymbols(detox).find(
    (s) => s.toString() === 'Symbol(init)'
  );
  if (initSymbol) {
    await (detox as any)[initSymbol]();
  }
});

afterAll(async () => {
  const cleanupSymbol = Object.getOwnPropertySymbols(detox).find(
    (s) => s.toString() === 'Symbol(cleanup)'
  );
  if (cleanupSymbol) {
    await (detox as any)[cleanupSymbol]();
  }
});

afterEach(async () => {
  const currentTestName = expect.getState().currentTestName;
  if (currentTestName && currentTestName.includes('flow')) {
    const testResult = expect.getState().assertionCalls;

    const hasFailures =
      Array.isArray(testResult) &&
      testResult.some((result: any) => result.pass === false);

    if (hasFailures) {
      await TestUtils.captureFullScreenOnFailure(currentTestName);
    }
  }
});

expect.extend({ toMatchImageSnapshot });
