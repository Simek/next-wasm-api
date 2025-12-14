'use client';

import { type FormEvent, useState } from 'react';

type Props = {
  apiPath: string;
  params: string[];
};

export function APIRouteTester({ apiPath, params }: Props) {
  const [result, setResult] = useState<(Record<string, unknown> & { error?: string }) | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setResult(null);

    const formData = new FormData(event.currentTarget);
    const queryParams = new URLSearchParams();

    for (const [key, value] of formData.entries()) {
      if (typeof value === 'string') {
        queryParams.append(key, value);
      }
    }

    try {
      const res = await fetch(`${apiPath}?${queryParams.toString()}`);
      const data = await res.json();

      setResult(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-3 border-2 rounded-xl py-4 px-5 bg-white/70 dark:bg-black/70 border-violet-400 dark:border-violet-900 shadow-2xl">
      <form onSubmit={onSubmit} className="flex flex-row items-center gap-4">
        <h2 className="text-xl">
          <code>{apiPath}</code>
        </h2>
        <p className="text-zinc-700 dark:text-zinc-400">Params:</p>
        {params.map((param) => (
          <input
            key={param}
            defaultValue=""
            placeholder={param}
            name={param}
            className="border-2 rounded-lg px-3 py-1 w-25 border-zinc-500 dark:border-zinc-800 focus:border-violet-500 focus:ring-0 focus:outline-0"
            autoComplete="off"
            maxLength={8}
          />
        ))}
        <button
          type="submit"
          disabled={loading}
          className="bg-violet-500 px-4 py-1 ml-auto cursor-pointer rounded-lg font-semibold text-white dark:text-black hover:bg-violet-400"
        >
          Send
        </button>
      </form>
      <pre
        className={[
          'min-h-13 text-sm rounded-lg p-4 bg-zinc-200/80 dark:bg-zinc-900/80',
          result && result.error && 'text-red-700 dark:text-red-400',
        ].join(' ')}
      >
        {!!result && JSON.stringify(result, null, 2)}
        {!result && !loading && (
          <span className="text-zinc-700 dark:text-zinc-400">Send request to see the API response</span>
        )}
        {!result && loading && <span className="text-zinc-700 dark:text-zinc-400">Awaiting API response...</span>}
      </pre>
    </div>
  );
}
