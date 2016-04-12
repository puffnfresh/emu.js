/**
   # emu.js

   emu is a tiny documentation generator. It does the following:

   * Parses stdin JavaScript
   * Extract block comments with double asterisks
   * Extract line comments with triple forward slash
   * Trims out the prefixed whitespace
   * Prints the results to stdout

   That's it.

   ## Example

   See the `index.js` file for an example of how emu generates its own
   README.md

   ## Usage

       emu < bilby.js > bilby-docs.md

   Now you can process the output with something like
   [Pandoc](http://johnmacfarlane.net/pandoc).

**/

function getComments(source) {

    var comments = require('esprima').parse(source, {comment: true}).comments;

    return comments.filter(function(c) {
        // Only block comments with double asterisks
        if (c.type == 'Block') {
          return c.value[0] == '*' && c.value[c.value.length - 1] == '*';
        } else if (c.type == 'Line') {
          return c.value[0] == '/';
        }
        return false;
    }).map(function(c) {
        var value,r,prefix, result;
        if (c.type == 'Block') {
          value = c.value.slice(1, c.value.length - 1).replace(/\s+$/, '');
          r = /(\n[ \t]+)[^ \t\n]/g;
        } else if (c.type == 'Line') {
          value = c.value.replace(/\s+$/, '');
          r = /(\/[ \t]+)[^ \t\n]/g;
        }

        while(result = r.exec(value)) {
            if(prefix === undefined || result[1].length < prefix.length)
                prefix = result[1];
        }

        if (c.type == 'Block') {
          return '\n' + value.split(prefix).join('\n').replace(/^\n+/, '');
        } else if (c.type == 'Line') {
          return value.split(prefix).join('').replace(/^\n+/, '');
        }
    }).join('\n');
}
exports.getComments = getComments;
