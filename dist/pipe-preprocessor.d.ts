export interface PipePreprocessorOptions {
    pipePrefix?: string;
    pipeRegistry?: any;
    debug?: boolean;
    generateDTS?: boolean;
    ideMode?: boolean;
    suppressIDEWarnings?: boolean;
}
export interface PreprocessorResult {
    code: string;
    map?: any;
}
export declare function createIDEFriendlyPipePreprocessor(options?: PipePreprocessorOptions): {
    markup: (params: {
        content: string;
        filename: string;
    }) => PreprocessorResult;
};
//# sourceMappingURL=pipe-preprocessor.d.ts.map