import { APIRouteTester } from '~/components/APIRouteTester';

export default function Home() {
  return (
    <main className="relative z-10 flex flex-col min-h-screen max-w-6xl mx-auto px-3 py-8 gap-6">
      <h1 className="text-3xl font-bold">Next WebAssembly API demo</h1>
      <APIRouteTester apiPath="/api/fib" params={['n']} />
      <APIRouteTester apiPath="/api/sum" params={['a', 'b']} />
    </main>
  );
}
