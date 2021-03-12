// This sample file demonstrates some simple patterns on how to use promises.
// These are not real tests!
// Reason for this format is that we had problems with lost promises in 
// after hooks and the tests are an easy way to run lots of different scenarios.

async function SlowCall(name: string, timeoutMs: number): Promise<string> {
  console.log(`Level ${name} started, timeout ${timeoutMs}`);
  await new Promise((resolve) => setTimeout(resolve, timeoutMs));
  console.log(`Level ${name} finished`);
  return Promise.resolve(`${name}(${timeoutMs})`);
}

describe('Samples of waiting for promises - no real tests', () => {
  it('Wait for two promises after each other', async () => {
    console.log('test entry');
    console.log(await SlowCall('1', 100));
    console.log(await SlowCall('2', 50));
    console.log('test entry');
  });

  it('messes everything up if Array.foreach is used', async () => {
    console.log('test entry');
    const callsToMake = [
      { name: '1 - Array.foreach', ms: 200 },
      { name: '2 - Array.foreach', ms: 150 },
    ];
    callsToMake.forEach(async (call) => {
      console.log('Result: ', await SlowCall(call.name, call.ms));
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
      console.log('Result: ', await SlowCall(call.name, call.ms));
    }
    console.log('test exit');
  });

  it('Wait for promises running parallel', async () => {
    console.log('test entry');
    const callsToMake = [
      { name: '1', ms: 100 },
      { name: '2', ms: 50 },
    ];

    const allPromises = callsToMake.map((call) => SlowCall(call.name, call.ms));
    const results = await Promise.all(allPromises);
    console.log('All promises are resolved');
    results.forEach((result) => console.log('Result: ', result));
    console.log('test exit');
  });

  it('Wait for promises running parallel V2', async () => {
    console.log('test entry');

    const allPromises = [SlowCall('1', 100), SlowCall('2', 50)];
    const results = await Promise.all(allPromises);
    console.log('All promises are resolved');
    results.forEach((result) => console.log('Result: ', result));
    console.log('test exit');
  });

  it('Wait for first promise', async () => {
    console.log('test entry');

    const allPromises = [SlowCall('1', 100), SlowCall('2', 50)];
    const result = await Promise.race(allPromises);
    console.log('First promise is resolved');
    console.log('Result: ', result);
    console.log('test exit');
  });
});
