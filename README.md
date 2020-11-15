An example of basic command-line arguments validation for programs that should take a fixed number of arguments.

I find it interesting how TypeScript can be leveraged to provide strong static guarantees about this type of code.

```console
$ npm ci
$ npm run build

$ node index.js
Expected 2 arguments, but got 0. Argument list:
[]
$ echo $?
1

$ node index.js one
Expected 2 arguments, but got 1. Argument list:
["one"]
$ echo $?
1

$ node index.js one two three
Expected 2 arguments, but got 3. Argument list:
["one","two","three"]
$ echo $?
1

$ node index.js one two
one two
$ echo $?
0
```
