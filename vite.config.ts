/// <reference types="vitest/config" />
/// <reference types="vite/client" />
import { resolve as pathResolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import { EsLinter, linterPlugin } from 'vite-plugin-linter';
// @ts-ignore
import packageJson from './package.json';

const resolve = (path: string) => pathResolve(__dirname, path);

const getPackageName = (name: string = ''): string => {
  let nameToUse = name;
  if (name.startsWith('@')) nameToUse = name.split('/')[1];
  return nameToUse.replace(/-./g, (char) => char[1].toUpperCase());
};

const { name, types } = packageJson;

// app
const appDir = 'app';
const appFile = 'index.ts';

// lib
const libDir = 'src';
const libFile = 'index.ts';
const libEntry = resolve('src/index.ts');

const pkgName = getPackageName(name);
const fileNames = {
  es: `${pkgName}.mjs`,
  cjs: `${pkgName}.cjs`,
  iife: `${pkgName}.iife.js`
};
const formats = Object.keys(fileNames);

/*
      dts({
        // // @ts-ignore
        // rollupTypes: true,
        // include: ['src/index.ts'],
        // insertTypesEntry: true,
        include: ['src/index.ts'],
        // exclude: ['react-jsx-runtime'],
        // beforeWriteFile: (filePath, content) => {
        //   console.log(filePath);
        //   return {
        //     filePath: filePath.replace(libDir, '').replace('index', pkgName),
        //     content,
        //
        //   };
        // }
      })
 */

// https://vitejs.dev/config/
// @ts-ignore
export default defineConfig((configEnv, ...rest) => {
  // console.log(configEnv, ...rest);
  return {
		resolve: {
			alias: {
				"~": resolve("src")
			}
		},
    plugins: [
      react(),
      tsConfigPaths(),
      // linterPlugin({
      //   include: [`./${libDir}/**/*.{ts,tsx}`],
      //   linters: [new EsLinter({ configEnv })],
      // }),
      dts({
        // // @ts-ignore
        // rollupTypes: true,
        // include: ['src/index.ts'],
        insertTypesEntry: true,
        // include: ['src/index.ts'],
        // exclude: ['react-jsx-runtime'],
        beforeWriteFile: (filePath, content) => {
          return {
            filePath: filePath.replace(libDir, 'types'),
            content

          };
        }
      })
    ],
		test: {
			globals: true,
			watch: false,
			environment: "jsdom",
			setupFiles: "./vitest.setup.ts",
			resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension
		},
    // polyfill: false,
    build: {
      lib: {
        entry: libEntry,
        name: pkgName,
        formats,
        fileName: (format) => {
          console.log(format)
          return fileNames[format]
        }
      },
      rollupOptions: {
        external: ['react'],
        output: {
          globals: {
            react: 'React'
          }
        }
      }
    }
  };
});
