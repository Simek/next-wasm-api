import { spawn, argv, which } from 'bun';

const c3c = which('c3c');

if (!c3c) {
  throw new Error('C3 compiler cannot be find in PATH!');
}

const files = argv.slice(2);

for (let i = 0, len = files.length; i < len; i++) {
  const sourceFile = files[i];
  const sourceFileName = sourceFile.split('.')[0];

  spawn(
    [
      c3c,
      'compile',
      '--target',
      'wasm32',
      '-g0',
      '-O3',
      '--link-libc=no',
      '--use-stdlib=no',
      '--no-entry',
      '--reloc=none',
      '-o',
      `./wasm/${sourceFileName}`,
      `./wasm/${sourceFile}`,
    ],
    {
      stdout: 'inherit',
      stderr: 'inherit',
      onExit(_subprocess, exitCode) {
        if (exitCode === 0) {
          console.info(`C3 -> Wasm compilation of ${sourceFileName}.wasm was successful!`);
        } else {
          console.error(`C3 -> Wasm compilation of ${sourceFileName}.wasm failed!`);
          process.exitCode = exitCode;
        }
      },
    }
  );

  spawn(['bun', 'wasm2wat', '-o', `./wasm/${sourceFileName}.wat`, `./wasm/${sourceFileName}.wasm`], {
    stderr: 'inherit',
    onExit(_subprocess, exitCode) {
      if (exitCode === 0) {
        console.info(`Wasm -> Wat conversion of ${sourceFileName}.wasm was successful!`);
      } else {
        console.error(`Wasm -> Wat conversion of ${sourceFileName}.wasm failed!`);
        process.exitCode = exitCode;
      }
    },
  });
}
