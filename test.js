import fs from 'fs';
import test from 'ava';
import emu from './index.js';

/**
   # tests

   simple emu tests

**/
test('generates correct output', t => {
  var source = fs.readFileSync('./index.js', 'utf8');
  var readme = fs.readFileSync('./README.md', 'utf8');

  t.is(emu.process(source) + '\n', readme);
});
