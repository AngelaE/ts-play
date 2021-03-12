// This sample file demonstrates some simple patterns on how to use promises.
// These are not real tests!
// Reason for this format is that we had problems with lost promises in
// after hooks and the tests are an easy way to run lots of different scenarios.

import { assert, expect } from 'chai';
import { slowCall } from '../src/slow-method';

describe('Play with exceptions and promises', () => {
  it('Error is caught with wait', async () => {
    try {
      await slowCall('1', 10, true);
    } catch (e) {
      return Promise.resolve();
    }
    assert.fail('We should never get here, an error should have been thrown');
  });

  it('No wait - no error', async () => {
    try {
      slowCall('1', 1, true);
    } catch (e) {
      assert.fail('no exception should have been thrown');
    }
  });

  it('Wait for promises running parallel fails if any call throws an error', async () => {
    const allPromises = [
      slowCall('1', 20, true),
      slowCall('2', 10),
      slowCall('3', 5),
    ];
    try {
      await Promise.all(allPromises);
    } catch (e) {
      // an exception is thrown if ANY promise throws an error
      return Promise.resolve();
    }
    assert.fail('An exception should have been thrown');
  });

  it('Wait for first promise passes if the first promise is successful', async () => {
    const allPromises = [slowCall('1', 60, true), slowCall('2', 50)];
    const result = await Promise.race(allPromises);
    expect(result).to.equal('2(50)');
  });

  it('Wait for first promise passes fails if the first promise throws', async () => {
    const allPromises = [slowCall('1', 10, true), slowCall('2', 50)];

    try {
      await Promise.race(allPromises);
    } catch (e) {
      return Promise.resolve();
    }
    assert.fail('an exception should have been thrown');
  });
});
