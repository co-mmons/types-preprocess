export interface PreprocessOptions {

    /**
     * When using @include variants and @extend, preprocess will by 
     * default throw an exception in case an included file can't be found. Set this option 
     * to true to instruct preprocess to fail silently and instead of throwing to write 
     * a message inside of the preprocessed file that an included fi could not be found.
     * 
     * Default value is false.
     */
    fileNotFoundSilentFail?: boolean;

    /**
     * The directory where to look for files included via @include variants and @extend.
     * 
     * Default value is process.cwd().
     */
    srcDir?: string;

    /**
     * The end of line (EOL) character to use for the preprocessed result. May be one of:
     * - \r\n - Windows
     * - \n - Linux/OSX/Unix
     * - \r - legacy Mac
     * 
     * Default: EOL of source string or os.EOL if source string contains multiple different or no EOLs.
     */
    srcEol?: string;

    /**
     * The syntax type of source string to preprocess. There are 3 main syntax variants:
     * - html, aliases: xml
     * - js, aliases: javascript, jsx, c, cc, cpp, cs, csharp, java, less, sass, scss, css, php, ts, tsx, peg, pegjs, jade, styl
     * - coffee, aliases: bash, shell, sh
     */
    type?: string;
}

declare module "preprocess" {

    /**
     * Preprocesses a source provided as a string and returns the preprocessed source.
     * 
     * @param {string} source The source to preprocess.
     * 
     * @param {*} [context] The context that contains the variables that are used in the source. 
     * For @extend variants and @include the additional context property src is available inside 
     * of files to be included that contains the current file name. This property is also 
     * available in the context of the source file if one of the preprocessFile*() API variants are used.
     * If not given or undefined by default process.env will be used.
     * 
     * @param {PreprocessOptions} [options] The options object allows to pass additional options to preprocess.
     */
    export function preprocess(source: string, context?: any, options?: PreprocessOptions): string;

    /**
     * Preprocesses a sourceFile and saves the result to destFile. Simple wrapper around fs.readFile() and fs.writeFile().
     * 
     * @param {string} srcFile The path to the source file to preprocess.
     * 
     * @param {string} destFile The path to the destination file where the preprocessed result shall be saved.
     * 
     * @param {*} [context] See context parameter description of preprocess() function.
     * 
     * @param {Function} [callback] The callback function that is called upon error or completion. 
     * Receives an error if something goes wrong as first parameter.
     * 
     * @param {PreprocessOptions} [options] See options attribute description of preprocess() function. 
     * Differs only in that the default srcDir value is set to the path of the provided 
     * source file instead of process.cwd() and the default type is derived from source file extension.
     */
    export function preprocessFile(srcFile: string, destFile: string, context?: any, callback?: Function, options?: PreprocessOptions);

    /**
     * Preprocesses a sourceFile and saves the result to destFile. Simple wrapper around fs.readFileSync() and fs.writeFileSync().
     * 
     * @param {string} srcFile The path to the source file to preprocess.
     * 
     * @param {string} destFile The path to the destination file where the preprocessed result shall be saved.
     * 
     * @param {*} [context] See context parameter description of preprocess() function.
     * 
     * @param {PreprocessOptions} [options] See options attribute description of preprocess() function. 
     * Differs only in that the default srcDir value is set to the path of the provided 
     * source file instead of process.cwd() and the default type is derived from source file extension.
     */
    export function preprocessFileSync(srcFile: string, destFile: string, context?: any, options?: PreprocessOptions);
    
}
