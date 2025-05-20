import { defineConfig } from 'tsup'

export default defineConfig({
    entry: [
        'src/index.ts',
    ],
    format: ['cjs', 'esm'],
    banner: {
        js: '"use client";',
    },
    // prefer .mjs for ESM output
    outExtension: ({ format }) => ({
        js: format === 'esm' ? '.mjs' : '.cjs',
    }),
    dts: true,
    clean: true,
    outDir: 'dist',
    treeshake: true,
    sourcemap: false,
    esbuildOptions(options) {
        options.banner = {
            js: '"use client";',
        }
    },
    splitting: false
})
