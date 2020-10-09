import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import pkg from './package.json';

export default [
	{
		input: 'src/main.ts',
		output: {
			name: 'QuantumReport',
			file: pkg.main,
			format: 'umd'
		},
		plugins: [
			resolve(),
			commonjs(),
			typescript()
		]
	},
	{
		input: 'src/main.ts',
		external: [],
		plugins: [
			typescript()
		],
		output: [
			{ file: pkg.cjs, format: 'cjs' },
			{ file: pkg.esm, format: 'es' }
		]
	}
];
