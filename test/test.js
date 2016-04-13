import fs from 'fs';
import test from 'ava';
import emu from '../';

/**
   # tests

   simple emu tests

**/
test('generates correct output', t => {
  var source = fs.readFileSync('../index.js', 'utf8');
  var readme = fs.readFileSync('../README.md', 'utf8');

  t.is(emu.process(source) + '\n', readme);
});

test('generates correct output, ES6', t => {
  var source = fs.readFileSync('./test.js', 'utf8');
  t.is(emu.process(source), "\n# tests\n\nsimple emu tests");
});

test('generates correct output, other', t => {
  var source = fs.readFileSync('./test.txt', 'utf8');
  t.is(emu.process(source), "\n# These are not JavaScript\n- C\n- Coffee Script\n- Scheme\n- Joy");
});
