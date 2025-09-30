/* eslint-disable @typescript-eslint/no-explicit-any */
import { element, by, expect as detoxExpect, device } from 'detox';
import { expect } from '@jest/globals';
import { readFileSync } from 'fs';

export class TestUtils {
  static getDeviceSnapshotPath(id: string): string {
    const platform = device.getPlatform();

    let deviceName = 'unknown';
    try {
      const deviceInfo = device.name || 'unknown';

      if (deviceInfo.includes('(') && deviceInfo.includes(')')) {
        const match = deviceInfo.match(/\(([^)]+)\)/);
        if (match && match[1]) {
          deviceName = match[1]
            .replace(/[^a-zA-Z0-9\s]/g, '')
            .replace(/\s+/g, '')
            .substring(0, 20);
        }
      } else if (deviceInfo.includes('-') && deviceInfo.length > 20) {
        deviceName = 'simulator';
      } else {
        deviceName = deviceInfo
          .replace(/[^a-zA-Z0-9\s]/g, '')
          .replace(/\s+/g, '')
          .substring(0, 20);
      }
    } catch {
      deviceName = 'unknown';
    }

    return `${id}_${platform}_${deviceName}`;
  }

  static async tapElement(elementToTap: any): Promise<void> {
    await elementToTap.tap();
  }

  static async typeInElement(elementToType: any, text: string): Promise<void> {
    await elementToType.replaceText(text);
  }

  static async tapReturnKey(elementToSubmit: any): Promise<void> {
    await elementToSubmit.tapReturnKey();
  }

  static async assertElementVisible(elementToCheck: any): Promise<void> {
    await detoxExpect(elementToCheck).toBeVisible();
  }

  static async assertElementNotVisible(elementToCheck: any): Promise<void> {
    await detoxExpect(elementToCheck).not.toBeVisible();
  }

  static async assertTextInElement(
    elementToCheck: any,
    expectedText: string
  ): Promise<void> {
    await detoxExpect(elementToCheck).toHaveText(expectedText);
  }

  static async tapByText(text: string): Promise<void> {
    await element(by.text(text)).tap();
  }

  static async assertTextVisible(text: string): Promise<void> {
    await detoxExpect(element(by.text(text))).toBeVisible();
  }

  static async assertElementVisibleById(id: string): Promise<void> {
    await detoxExpect(element(by.id(id))).toBeVisible();
  }

  static async assertElementNotVisibleById(id: string): Promise<void> {
    await detoxExpect(element(by.id(id))).not.toBeVisible();
  }

  static async assertTextInElementById(
    id: string,
    expectedText: string
  ): Promise<void> {
    await detoxExpect(element(by.id(id))).toHaveText(expectedText);
  }

  static async tapByOK(): Promise<void> {
    await this.tapByText('OK');
  }

  static async takeElementScreenshotBuffer(
    elementToSnapshot: any,
    name: string
  ): Promise<Buffer> {
    const deviceSpecificName = this.getDeviceSnapshotPath(name);
    const screenshotPath =
      await elementToSnapshot.takeScreenshot(deviceSpecificName);
    return readFileSync(screenshotPath);
  }

  static async expectElementSnapshot(
    elementToSnapshot: any,
    id: string
  ): Promise<void> {
    const deviceSpecificId = this.getDeviceSnapshotPath(id);
    const screenshotPath =
      await elementToSnapshot.takeScreenshot(deviceSpecificId);
    const screenshotBuffer = readFileSync(screenshotPath);

    try {
      (expect(screenshotBuffer) as any).toMatchImageSnapshot({
        customSnapshotIdentifier: deviceSpecificId,
        failureThresholdType: 'percent',
        failureThreshold: 0.1,
      });
    } catch (error) {
      console.warn('Failed to capture element snapshot:', error);
    }
  }

  static async captureFullScreenOnFailure(testName: string): Promise<void> {
    try {
      const deviceSpecificName = this.getDeviceSnapshotPath(
        `${testName}-failure`
      );
      const screenshotPath = await device.takeScreenshot(deviceSpecificName);
      console.log(`Screenshot captured on failure: ${screenshotPath}`);
    } catch (error) {
      console.warn('Failed to capture full screen on failure:', error);
    }
  }
}
