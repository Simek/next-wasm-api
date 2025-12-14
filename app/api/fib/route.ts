import path from 'node:path';
import fs from 'node:fs';
import { parseNumber } from '~/utils/parseQueryParams';

const wasmBuffer = fs.readFileSync(path.resolve(process.cwd(), './wasm/fib.wasm'));
const wasmPromise = WebAssembly.instantiate(wasmBuffer);

type FibWasmExports = {
  fib: (n: number) => number;
};

export async function GET(request: Request) {
  const url = new URL(request.url);

  try {
    const n = parseNumber('n', url.searchParams.get('n'));

    const { fib } = (await wasmPromise).instance.exports as FibWasmExports;

    return Response.json({ fib: fib(n), n });
  } catch (error) {
    if (error instanceof Response) return error;
    throw error;
  }
}
