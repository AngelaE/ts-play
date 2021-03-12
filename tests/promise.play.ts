// This sample file demonstrates some simple patterns on how to use promises.
// These are not real tests!
// Reason for this format is that we had problems with lost promises in
// after hooks and the tests are an easy way to run lots of different scenarios.

import { slowCall } from '../src/slow-method';

describe('Samples of waiting for promises - no real tests', () => {
  it('Wait for two promises after each other', async () => {
    console.log('test entry');
    console.log(await slowCall('1', 100));
    console.log(await slowCall('2', 50));
    console.log('test entry');
  });

  it.skip('messes everything up if Array.foreach is used', async () => {
    console.log('test entry');
    const callsToMake = [
      { name: '1 - Array.foreach', ms: 200 },
      { name: '2 - Array.foreach', ms: 150 },
    ];
    callsToMake.forEach(async (call) => {
      console.log('Result: ', await slowCall(call.name, call.ms));
    });
    console.log('test exit');
  });

  it('Wait for all promises in a list sequentially', async () => {
    console.log('test entry');
    const callsToMake = [
      { name: '1', ms: 100 },
      { name: '2', ms: 50 },
    ];
    for (const call of callsToMake) {
      console.log('Result: ', await slowCall(call.name, call.ms));
    }
    console.log('test exit');
  });

  it('Wait for promises running parallel', async () => {
    console.log('test entry');
    const callsToMake = [
      { name: '1', ms: 100 },
      { name: '2', ms: 50 },
    ];

    const allPromises = callsToMake.map((call) => slowCall(call.name, call.ms));
    const results = await Promise.all(allPromises);
    console.log('All promises are resolved');
    results.forEach((result) => console.log('Result: ', result));
    console.log('test exit');
  });

  it('Wait for promises running parallel V2', async () => {
    console.log('test entry');

    const allPromises = [slowCall('1', 100), slowCall('2', 50)];
    const results = await Promise.all(allPromises);
    console.log('All promises are resolved');
    results.forEach((result) => console.log('Result: ', result));
    console.log('test exit');
  });

  it('Wait for first promise', async () => {
    console.log('test entry');

    const allPromises = [slowCall('1', 100), slowCall('2', 50)];
    const result = await Promise.race(allPromises);
    console.log('First promise is resolved');
    console.log('Result: ', result);
    console.log('test exit');
  });
});
