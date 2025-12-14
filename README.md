# Next WebAssembly API demo

An example of generating WebAssembly (WASM) from C3 source files and exposing it through a Next.js API routes.

This example includes:
- Small function examples written in C3,
- A WASM build script that outputs optimized WASM modules and WAT (WebAssembly Text Format) files for easier debugging,
- Example API routes that depends on the compiled WASM module,
- Simple home page to test the API endpoints.

## 🔧 Prerequisites

1. Install the C3 compiler - follow the official [C3 getting started guide](https://c3-lang.org/getting-started/prebuilt-binaries/) for your OS.
2. Install Bun - follow the [Bun installation guide](https://bun.com/docs/installation) for your OS.

## 🌐 Running locally

1. Compile the C3 code examples to WASM:
   ```sh
   bun wasm:compile
   ```
2. Start the Next.js development server:
   ```sh
   bun dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the home page.

## 🧑‍💻 Contributing

Any contributions are welcome! Quick guide:
- Clearly describe your changes,
- Test your code,
- Run `lint` command before submitting PR.