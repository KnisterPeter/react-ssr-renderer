const { runInNewContext } = require("vm");
const { sync: resolveSync, isCore } = require("resolve");
const { readFileSync } = require("fs");
const { dirname } = require("path");

/**
 * @type {Map<string, {module: { exports: any }}>}
 */
const requireCache = new Map();

class ContextModule {
  /**
   * @param {string} code
   * @param {string} filename
   * @param {ContextModule} [parent]
   */
  constructor(code, filename, parent) {
    this.code = code;
    this.filename = filename;
    this.parent = parent;
  }

  /**
   * @returns {Record<string, unknown>}
   */
  _getGlobals() {
    return this.parent ? this.parent._getGlobals() : {};
  }

  /**
   * @protected
   * @param {string} id
   * @return {any}
   */
  _require(id) {
    if (isCore(id)) {
      return require(id);
    }

    return this._internalRequire(id, dirname(this.filename));
  }

  /**
   * @protected
   * @param {string} id
   * @param {string} basedir
   */
  _internalRequire(id, basedir) {
    const resolvedId = resolveSync(id, {
      basedir,
      includeCoreModules: false,
    });

    if (requireCache.has(resolvedId)) {
      return requireCache.get(resolvedId)?.module.exports;
    }

    const code = readFileSync(resolvedId, "utf-8");

    if (resolvedId.endsWith(".json")) {
      return JSON.parse(code);
    }

    return new ContextModule(code, resolvedId, this).evaluate();
  }

  /**
   * @public
   * @return {unknown}
   */
  evaluate() {
    const globals = this._getGlobals();

    const context = {
      ...globals,
      global: globals,
      require: this._require.bind(this),
      module: {
        exports: {},
      },
    };

    requireCache.set(this.filename, context);

    runInNewContext(
      `
      (function (module, exports) {
        ${this.code}
      })(module, module.exports);
      `,
      context,
      {
        filename: this.filename,
        timeout: undefined,
      }
    );

    return context.module.exports;
  }
}

module.exports = {
  ContextModule,
};
