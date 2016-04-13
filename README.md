
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

    emu < index.js > README.md

Now you can process the output with something like
[Pandoc](http://johnmacfarlane.net/pandoc).
