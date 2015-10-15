Data structures for [EcmaScript syntax trees](https://github.com/estree/estree).
Includes super-fast renderer.


## Install

### Bower/RequireJS

 	bower install --save andy-hanson/esast

To use it:

	require.config({
		paths: {
			esast: "bower_components/esast/dist"
		}
	})

	// Later...
	define([ "esast/ast", "esast/render" ], (ast, render) => {
		const four = new BinaryExpression('+', new Literal(2), new Literal(2))
		render(four)
	})

### Npm/Node

	npm install --save andy-hanson/esast

To use it:

	import { BinaryExpression, Literal } from 'esast/dist/ast'
	import render from 'esast/dist/render'
	const four = new BinaryExpression('+', new Literal(2), new Literal(2))
	console.log(render(four))


## Use

### Node Types

See [the docs](https://github.com/andy-hanson/esast/blob/master/doc.md).

Constructors are called by passing in their values in order, e.g.

	// if (1) 2

	new IfStatement(new Literal(1), new Literal(2))


### Source Maps

When building an AST from source code, you may want to attach `loc` property.

	import { Literal } from 'esast/dist/ast'
	import Loc, { Pos } from 'esast/dist/Loc'
	import { renderWithSourceMap } from 'esast/dist/render'

	// Lines are 1-indexed, columns are 0-indexed.
	const ast = Literal(5)
	ast.loc = Loc(Pos(1, 0), Pos(1, 5))
	const { code, map } = renderWithSourceMap(ast, 'inFileName', 'outFileName.js')


### fromJson

This converts a JSON ast to an esast version.
You can go the other way with `ast.toJSON()`.
If you want to parse, you could use [acorn](https://github.com/marijnh/acorn) and do:

	import  {parse} from 'acorn'
	import fromJson from 'esast/dist/fromJson'
	const ast = fromJson(parse(src, options))


## Render times

	gulp perf-test

Name | Render time | Render time with source maps
:-: | :-: | :-:
esast | 1.5ms | 17ms
[escodegen](https://github.com/estools/escodegen) | 7ms | 120ms
[esotope](https://github.com/inikulin/esotope) | 2.5ms | not supported

Keep in mind that `fromJson` takes about 6ms.


## Build

	npm install
	sudo npm install -g gulp-cli
	gulp all
