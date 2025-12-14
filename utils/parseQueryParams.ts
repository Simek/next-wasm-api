export function parseNumber(name: string, rawParam: string | null) {
  if (!rawParam) {
    throw Response.json(
      {
        error: 'Missing required query param!',
        got: { [name]: rawParam },
      },
      { status: 400 }
    );
  }

  const param = Number(rawParam);

  if (Number.isNaN(param) || !Number.isFinite(param)) {
    throw Response.json(
      {
        error: `Query param ${name} must be a number!`,
        got: { [name]: rawParam },
      },
      { status: 400 }
    );
  }

  return param;
}
