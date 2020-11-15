mainWrapper(process.argv.slice(2)); // First two items are e.g. "node" and "index.js".

/**
 * Static guarantees made by this function:
 *
 *   * It will always require the actual number of arguments that `main` takes.
 *   * `main` can only have a fixed number of string parameters (no optional or rest parameters).
 *   * The error message will always be correctly pluralized (e.g. "Expected 1 argument" or "Expected 5 arguments").
 */
function mainWrapper(args: readonly string[]): void {
    // The types here restrict main to having only string parameters (none of other types including optional string parameters):
    type Argv = Parameters<typeof main>;
    const exampleArgv: (Argv extends typeof args ? Argv : never) = ["", ""];

    // The types here restrict main to having a fixed number of parameters (no rest parameters):
    type ArgvLength = typeof exampleArgv.length;
    const expectedNumberOfArgs: (number extends ArgvLength ? never : ArgvLength) = exampleArgv.length;

    // Now we know statically and dynamically how many arguments to expect and can do the actual check:
    if (args.length === expectedNumberOfArgs) {
        main(...args as Argv);
    } else {
        const s: (typeof expectedNumberOfArgs extends 1 ? "" : "s") = "s";
        console.error(`Expected ${expectedNumberOfArgs} argument${s}, but got ${args.length}. Argument list:`);
        console.error(JSON.stringify(args));
        process.exit(1);
    }
}

function main(a: string, b: string): void {
    console.log(a, b);
}
