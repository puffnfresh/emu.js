/**
   # emu.js

   emu is a tiny documentation generator. It does the following:

   * Parses stdin JavaScript
   * Extract comments with double asterisks
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

var parse = require('esprima').parse,
    source = '';

process.stdin.resume();

process.stdin.on('data', function(d) {
    source += d.toString();
});

process.stdin.on('end', function() {
    var comments = parse(source, {comment: true}).comments;

    console.log(comments.filter(function(c) {
        // Only block comments with double asterisks
        return c.type == 'Block' && c.value[0] == '*' && c.value[c.value.length - 1] == '*';
    }).map(function(c) {
        // Remove equal prefixed whitespace
        var value = c.value.slice(1, c.value.length - 1).replace(/\s+$/, ''),
            r = /(\n[ \t]+)[^ \t\n]/g,
            prefix,
            result;

        while(result = r.exec(value)) {
            if(prefix === undefined || result[1].length < prefix.length)
                prefix = result[1];
        }

        return value.split(prefix).join('\n').replace(/^\n+/, '');
    }).join('\n\n'));
});
