export class ContextModule {
    /**
     * @param {string} code
     * @param {string} filename
     * @param {ContextModule} [parent]
     */
    constructor(code: string, filename: string, parent?: ContextModule | undefined);
    code: string;
    filename: string;
    parent: ContextModule | undefined;
    /**
     * @returns {Record<string, unknown>}
     */
    _getGlobals(): Record<string, unknown>;
    /**
     * @protected
     * @param {string} id
     * @return {any}
     */
    protected _require(id: string): any;
    /**
     * @protected
     * @param {string} id
     * @param {string} basedir
     */
    protected _internalRequire(id: string, basedir: string): any;
    /**
     * @public
     * @return {unknown}
     */
    public evaluate(): unknown;
}
