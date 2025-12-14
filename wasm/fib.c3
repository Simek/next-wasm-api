fn int fib(int n) @wasm @extern("fib") {
    return n < 2 ? n : fib(n - 1) + fib(n - 2);
}