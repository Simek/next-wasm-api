import path from 'node:path';
import fs from 'node:fs';
import { parseNumber } from '~/utils/parseQueryParams';

const wasmBuffer = fs.readFileSync(path.resolve(process.cwd(), './wasm/sum.wasm'));
const wasmPromise = WebAssembly.instantiate(wasmBuffer);

type SumWasmExports = {
  sum: (a: number, b: number) => number;
};

export async function GET(request: Request) {
  const url = new URL(request.url);

  try {
    const a = parseNumber('a', url.searchParams.get('a'));
    const b = parseNumber('b', url.searchParams.get('b'));

    const { sum } = (await wasmPromise).instance.exports as SumWasmExports;

    return Response.json({ sum: sum(a, b), a, b });
  } catch (error) {
    if (error instanceof Response) return error;
    throw error;
  }
}
