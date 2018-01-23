'use strict';

const fsJetpack = require('fs-jetpack');
const pjson = require('../package.json');
const resolve = require('rollup-plugin-node-resolve');

let banner = `
/*
 * ${pjson.name} v${pjson.version}
 * (c) ${new Date().getFullYear()} @pandamicro
 * Released under the MIT License.
 */
`;

let dest = './dist';
let file = 'engine';
let moduleName = 'engine';

// clear directory
fsJetpack.dir(dest, { empty: true });

module.exports = {
  input: './index.js',
  output: [
    { 
      file: `${dest}/${file}.dev.js`, 
      format: 'iife',
      name: moduleName,
      external: ['gfx.js'],
      globals: {'gfx.js': 'window.gfx'},
      sourcemap: true,
      banner,
    },
    {
      file: `${dest}/${file}.js`,
      format: 'cjs',
      name: moduleName,
      external: ['gfx.js'],
      globals: {'gfx.js': 'window.gfx'},
      sourcemap: true,
      banner,
    },
  ],
  plugins: [
    resolve({
      jsnext: true,
      main: true,
    })
  ],
};