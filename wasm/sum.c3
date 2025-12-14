fn int sum(int a, int b) @wasm @extern("sum") {
  return a + b;
}