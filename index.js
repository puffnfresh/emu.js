/**
   # emu.js

   emu is a tiny documentation generator. It does the following:

**/

const BLOCK = '/**';
const LINE = '///';

exports.process = function process(source) {
  return require('literalizer').lex(source)  /// * Parses stdin JavaScript
    .filter(function (x) {
      if (x.type !== 1) {
        return false;
      }
      x.type = x.val.slice(0, 3);
      if (x.type === BLOCK && x.val.slice(-3) === '**/') {  /// * Extract block comments with double asterisks
        return true;
      }
      if (x.type === LINE) { /// * Extract line comments with triple forward slash
        return true;
      }
      return false;
    })
    .map(function (c) {
      var value;
      var prefix;
      var r;
      var result;

      if (c.type === BLOCK) {
        value = c.val.slice(3, -3).replace(/\s+$/, '');
        r = /(\n[ \t]+)[^ \t\n]/g;

        while (result = r.exec(value)) {  // eslint-disable-line no-cond-assign
          if (prefix === undefined || result[1].length < prefix.length) {
            prefix = result[1];
          }
        }

        return '\n' + value.split(prefix).join('\n').replace(/^\n+/, '');  /// * Trims out the prefixed whitespace
      }

      value = c.val.slice(4).replace(/\s+$/, '');
      return value.split(prefix).join('').replace(/^\n+/, '');
    })
    .join('\n');   /// * Prints the results to stdout
};

/**

  That's it.

  ## Example

  See the `index.js` file for an example of how emu generates its own
  README.md

  ## Usage

      emu < index.js > README.md

  Now you can process the output with something like
  [Pandoc](http://johnmacfarlane.net/pandoc).

**/
