import { expect } from '@playwright/test';
import { Logger } from '@playwright-shared/utils/logger/logger';

export function compareByKey<T, K extends keyof T>(
  actual: T | T[],
  expected: T | T[],
  key: K | K[],
): void {
  const keys = Array.isArray(key) ? key : [key];

  // Ensure both are same type (array or object)
  if (Array.isArray(actual) !== Array.isArray(expected)) {
    throw new Error('Both actual and expected must be either arrays or objects');
  }

  //  ARRAY CASE
  if (Array.isArray(actual) && Array.isArray(expected)) {
    expect(actual.length).toBe(expected.length);
    Logger.info(`Comparing arrays`);
    // Create a map for quick lookup of actual items by composite key
    const map = new Map<string, T>(
      actual.map((item) => {
        const composite = JSON.stringify(keys.map((k) => item[k]));
        return [composite, item]; // example: {id: 1, name: 'A'} with key 'id' => map.set('1', {id: 1, name: 'A'})
      }),
    );
    // For each expected item, find the corresponding actual item using the composite key and compare
    for (const exp of expected) {
      const composite = JSON.stringify(keys.map((k) => exp[k]));
      // Check for duplicate keys in the actual array
      if (map.has(composite)) {
        throw new Error(
          `Duplicate key detected: ${composite}`
        );
      }
      const act = map.get(composite); // example: map.get('1') => {id: 1, name: 'A'}

      expect(act).toBeDefined();
      expect(act as unknown).toEqual(exp as unknown); //  deep equality
    }

    return; // exit after array comparison
  }

  //  OBJECT CASE
  const actObj = actual as T;
  const expObj = expected as T;

  Logger.info(`Comparing objects`);
  Logger.info(`Actual: ${JSON.stringify(actObj)}`);
  Logger.info(`Expected: ${JSON.stringify(expObj)}`);

  for (const k of keys) {
    expect(actObj[k] as unknown).toEqual(expObj[k] as unknown); // ✅ deep equality
  }
}
