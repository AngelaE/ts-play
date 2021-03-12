export async function slowCall(
  name: string,
  timeoutMs: number,
  failAfterWait: boolean = false
): Promise<string> {
  console.log(`Level ${name} started, timeout ${timeoutMs}`);
  await new Promise((resolve) => setTimeout(resolve, timeoutMs));
  console.log(`Level ${name} finished`);
  if (failAfterWait) throw new Error(`Error in ${name}`);
  return Promise.resolve(`${name}(${timeoutMs})`);
}
