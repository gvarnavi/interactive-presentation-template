"use strict";
exports.id = 4111;
exports.ids = [4111];
exports.modules = {

/***/ 44111:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(83336);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _datalayer_jupyterlite_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(73054);
/* harmony import */ var _datalayer_jupyterlite_kernel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(65657);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.



/**
 * The default CDN fallback for Pyodide
 */
const PYODIDE_CDN_URL = 'https://cdn.jsdelivr.net/pyodide/v0.20.0/full/pyodide.js';
/**
 * The id for the extension, and key in the litePlugins.
 */
const PLUGIN_ID = '@datalayer/jupyterlite-ipykernel-extension:kernel';
/**
 * A plugin to register the Pyodide kernel.
 */
const kernel = {
    id: PLUGIN_ID,
    autoStart: true,
    requires: [_datalayer_jupyterlite_kernel__WEBPACK_IMPORTED_MODULE_0__.IKernelSpecs, _datalayer_jupyterlite_server__WEBPACK_IMPORTED_MODULE_1__.IServiceWorkerRegistrationWrapper],
    activate: (app, kernelspecs, serviceWorkerRegistrationWrapper) => {
        const baseUrl = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PageConfig.getBaseUrl();
        const config = JSON.parse(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PageConfig.getOption('litePluginSettings') || '{}')[PLUGIN_ID] || {};
        const url = config.pyodideUrl || PYODIDE_CDN_URL;
        const pyodideUrl = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.URLExt.parse(url).href;
        const rawPipUrls = config.pipliteUrls || [];
        const pipliteUrls = rawPipUrls.map((pipUrl) => _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.URLExt.parse(pipUrl).href);
        const disablePyPIFallback = !!config.disablePyPIFallback;
        kernelspecs.register({
            spec: {
                name: 'python',
                display_name: 'Python (Pyodide)',
                language: 'python',
                argv: [],
                resources: {
                    'logo-32x32': 'TODO',
                    'logo-64x64': _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.URLExt.join(baseUrl, '/kernelspecs/python.png'),
                },
            },
            create: async (options) => {
                const { PyoliteKernel } = await __webpack_require__.e(/* import() */ 1224).then(__webpack_require__.bind(__webpack_require__, 61224));
                return new PyoliteKernel({
                    ...options,
                    pyodideUrl,
                    pipliteUrls,
                    disablePyPIFallback,
                    mountDrive: serviceWorkerRegistrationWrapper.enabled,
                });
            },
        });
    },
};
const plugins = [kernel];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugins);


/***/ }),

/***/ 73615:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActivityMonitor = void 0;
const signaling_1 = __webpack_require__(76674);
/**
 * A class that monitors activity on a signal.
 */
class ActivityMonitor {
    /**
     * Construct a new activity monitor.
     */
    constructor(options) {
        this._timer = -1;
        this._timeout = -1;
        this._isDisposed = false;
        this._activityStopped = new signaling_1.Signal(this);
        options.signal.connect(this._onSignalFired, this);
        this._timeout = options.timeout || 1000;
    }
    /**
     * A signal emitted when activity has ceased.
     */
    get activityStopped() {
        return this._activityStopped;
    }
    /**
     * The timeout associated with the monitor, in milliseconds.
     */
    get timeout() {
        return this._timeout;
    }
    set timeout(value) {
        this._timeout = value;
    }
    /**
     * Test whether the monitor has been disposed.
     *
     * #### Notes
     * This is a read-only property.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Dispose of the resources used by the activity monitor.
     */
    dispose() {
        if (this._isDisposed) {
            return;
        }
        this._isDisposed = true;
        signaling_1.Signal.clearData(this);
    }
    /**
     * A signal handler for the monitored signal.
     */
    _onSignalFired(sender, args) {
        clearTimeout(this._timer);
        this._sender = sender;
        this._args = args;
        this._timer = setTimeout(() => {
            this._activityStopped.emit({
                sender: this._sender,
                args: this._args
            });
        }, this._timeout);
    }
}
exports.ActivityMonitor = ActivityMonitor;
//# sourceMappingURL=activitymonitor.js.map

/***/ }),

/***/ 83336:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module coreutils
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(73615), exports);
__exportStar(__webpack_require__(48195), exports);
__exportStar(__webpack_require__(52664), exports);
__exportStar(__webpack_require__(80335), exports);
__exportStar(__webpack_require__(39971), exports);
__exportStar(__webpack_require__(88589), exports);
__exportStar(__webpack_require__(98842), exports);
__exportStar(__webpack_require__(58726), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 48195:
/***/ ((__unused_webpack_module, exports) => {


// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=interfaces.js.map

/***/ }),

/***/ 52664:
/***/ ((__unused_webpack_module, exports) => {


// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MarkdownCodeBlocks = void 0;
/**
 * The namespace for code block functions which help
 * in extract code from markdown text
 */
var MarkdownCodeBlocks;
(function (MarkdownCodeBlocks) {
    MarkdownCodeBlocks.CODE_BLOCK_MARKER = '```';
    const markdownExtensions = [
        '.markdown',
        '.mdown',
        '.mkdn',
        '.md',
        '.mkd',
        '.mdwn',
        '.mdtxt',
        '.mdtext',
        '.text',
        '.txt',
        '.Rmd'
    ];
    class MarkdownCodeBlock {
        constructor(startLine) {
            this.startLine = startLine;
            this.code = '';
            this.endLine = -1;
        }
    }
    MarkdownCodeBlocks.MarkdownCodeBlock = MarkdownCodeBlock;
    /**
     * Check whether the given file extension is a markdown extension
     * @param extension - A file extension
     *
     * @returns true/false depending on whether this is a supported markdown extension
     */
    function isMarkdown(extension) {
        return markdownExtensions.indexOf(extension) > -1;
    }
    MarkdownCodeBlocks.isMarkdown = isMarkdown;
    /**
     * Construct all code snippets from current text
     * (this could be potentially optimized if we can cache and detect differences)
     * @param text - A string to parse codeblocks from
     *
     * @returns An array of MarkdownCodeBlocks.
     */
    function findMarkdownCodeBlocks(text) {
        if (!text || text === '') {
            return [];
        }
        const lines = text.split('\n');
        const codeBlocks = [];
        let currentBlock = null;
        for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            const line = lines[lineIndex];
            const lineContainsMarker = line.indexOf(MarkdownCodeBlocks.CODE_BLOCK_MARKER) === 0;
            const constructingBlock = currentBlock != null;
            // Skip this line if it is not part of any code block and doesn't contain a marker.
            if (!lineContainsMarker && !constructingBlock) {
                continue;
            }
            // Check if we are already constructing a code block.
            if (!constructingBlock) {
                // Start constructing a new code block.
                currentBlock = new MarkdownCodeBlock(lineIndex);
                // Check whether this is a single line code block of the form ```a = 10```.
                const firstIndex = line.indexOf(MarkdownCodeBlocks.CODE_BLOCK_MARKER);
                const lastIndex = line.lastIndexOf(MarkdownCodeBlocks.CODE_BLOCK_MARKER);
                const isSingleLine = firstIndex !== lastIndex;
                if (isSingleLine) {
                    currentBlock.code = line.substring(firstIndex + MarkdownCodeBlocks.CODE_BLOCK_MARKER.length, lastIndex);
                    currentBlock.endLine = lineIndex;
                    codeBlocks.push(currentBlock);
                    currentBlock = null;
                }
            }
            else if (currentBlock) {
                if (lineContainsMarker) {
                    // End of block, finish it up.
                    currentBlock.endLine = lineIndex - 1;
                    codeBlocks.push(currentBlock);
                    currentBlock = null;
                }
                else {
                    // Append the current line.
                    currentBlock.code += line + '\n';
                }
            }
        }
        return codeBlocks;
    }
    MarkdownCodeBlocks.findMarkdownCodeBlocks = findMarkdownCodeBlocks;
})(MarkdownCodeBlocks = exports.MarkdownCodeBlocks || (exports.MarkdownCodeBlocks = {}));
//# sourceMappingURL=markdowncodeblocks.js.map

/***/ }),

/***/ 80335:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PageConfig = void 0;
const coreutils_1 = __webpack_require__(66201);
const minimist_1 = __importDefault(__webpack_require__(96562));
const url_1 = __webpack_require__(58726);
/**
 * The namespace for `PageConfig` functions.
 */
var PageConfig;
(function (PageConfig) {
    /**
     * Get global configuration data for the Jupyter application.
     *
     * @param name - The name of the configuration option.
     *
     * @returns The config value or an empty string if not found.
     *
     * #### Notes
     * All values are treated as strings.
     * For browser based applications, it is assumed that the page HTML
     * includes a script tag with the id `jupyter-config-data` containing the
     * configuration as valid JSON.  In order to support the classic Notebook,
     * we fall back on checking for `body` data of the given `name`.
     *
     * For node applications, it is assumed that the process was launched
     * with a `--jupyter-config-data` option pointing to a JSON settings
     * file.
     */
    function getOption(name) {
        if (configData) {
            return configData[name] || getBodyData(name);
        }
        configData = Object.create(null);
        let found = false;
        // Use script tag if available.
        if (typeof document !== 'undefined' && document) {
            const el = document.getElementById('jupyter-config-data');
            if (el) {
                configData = JSON.parse(el.textContent || '');
                found = true;
            }
        }
        // Otherwise use CLI if given.
        if (!found && typeof process !== 'undefined' && process.argv) {
            try {
                const cli = (0, minimist_1.default)(process.argv.slice(2));
                const path = __webpack_require__(71017);
                let fullPath = '';
                if ('jupyter-config-data' in cli) {
                    fullPath = path.resolve(cli['jupyter-config-data']);
                }
                else if ('JUPYTER_CONFIG_DATA' in process.env) {
                    fullPath = path.resolve(process.env['JUPYTER_CONFIG_DATA']);
                }
                if (fullPath) {
                    // Force Webpack to ignore this require.
                    // eslint-disable-next-line
                    configData = eval('require')(fullPath);
                }
            }
            catch (e) {
                console.error(e);
            }
        }
        if (!coreutils_1.JSONExt.isObject(configData)) {
            configData = Object.create(null);
        }
        else {
            for (const key in configData) {
                // PageConfig expects strings
                if (typeof configData[key] !== 'string') {
                    configData[key] = JSON.stringify(configData[key]);
                }
            }
        }
        return configData[name] || getBodyData(name);
    }
    PageConfig.getOption = getOption;
    /**
     * Set global configuration data for the Jupyter application.
     *
     * @param name - The name of the configuration option.
     * @param value - The value to set the option to.
     *
     * @returns The last config value or an empty string if it doesn't exist.
     */
    function setOption(name, value) {
        const last = getOption(name);
        configData[name] = value;
        return last;
    }
    PageConfig.setOption = setOption;
    /**
     * Get the base url for a Jupyter application, or the base url of the page.
     */
    function getBaseUrl() {
        return url_1.URLExt.normalize(getOption('baseUrl') || '/');
    }
    PageConfig.getBaseUrl = getBaseUrl;
    /**
     * Get the tree url for a JupyterLab application.
     */
    function getTreeUrl() {
        return url_1.URLExt.join(getBaseUrl(), getOption('treeUrl'));
    }
    PageConfig.getTreeUrl = getTreeUrl;
    /**
     * Get the base url for sharing links (usually baseUrl)
     */
    function getShareUrl() {
        return url_1.URLExt.normalize(getOption('shareUrl') || getBaseUrl());
    }
    PageConfig.getShareUrl = getShareUrl;
    /**
     * Get the tree url for shareable links.
     * Usually the same as treeUrl,
     * but overrideable e.g. when sharing with JupyterHub.
     */
    function getTreeShareUrl() {
        return url_1.URLExt.normalize(url_1.URLExt.join(getShareUrl(), getOption('treeUrl')));
    }
    PageConfig.getTreeShareUrl = getTreeShareUrl;
    /**
     * Create a new URL given an optional mode and tree path.
     *
     * This is used to create URLS when the mode or tree path change as the user
     * changes mode or the current document in the main area. If fields in
     * options are omitted, the value in PageConfig will be used.
     *
     * @param options - IGetUrlOptions for the new path.
     */
    function getUrl(options) {
        var _a, _b, _c, _d;
        let path = options.toShare ? getShareUrl() : getBaseUrl();
        const mode = (_a = options.mode) !== null && _a !== void 0 ? _a : getOption('mode');
        const workspace = (_b = options.workspace) !== null && _b !== void 0 ? _b : getOption('workspace');
        const labOrDoc = mode === 'single-document' ? 'doc' : 'lab';
        path = url_1.URLExt.join(path, labOrDoc);
        if (workspace !== PageConfig.defaultWorkspace) {
            path = url_1.URLExt.join(path, 'workspaces', encodeURIComponent((_c = getOption('workspace')) !== null && _c !== void 0 ? _c : PageConfig.defaultWorkspace));
        }
        const treePath = (_d = options.treePath) !== null && _d !== void 0 ? _d : getOption('treePath');
        if (treePath) {
            path = url_1.URLExt.join(path, 'tree', url_1.URLExt.encodeParts(treePath));
        }
        return path;
    }
    PageConfig.getUrl = getUrl;
    PageConfig.defaultWorkspace = 'default';
    /**
     * Get the base websocket url for a Jupyter application, or an empty string.
     */
    function getWsUrl(baseUrl) {
        let wsUrl = getOption('wsUrl');
        if (!wsUrl) {
            baseUrl = baseUrl ? url_1.URLExt.normalize(baseUrl) : getBaseUrl();
            if (baseUrl.indexOf('http') !== 0) {
                return '';
            }
            wsUrl = 'ws' + baseUrl.slice(4);
        }
        return url_1.URLExt.normalize(wsUrl);
    }
    PageConfig.getWsUrl = getWsUrl;
    /**
     * Returns the URL converting this notebook to a certain
     * format with nbconvert.
     */
    function getNBConvertURL({ path, format, download }) {
        const notebookPath = url_1.URLExt.encodeParts(path);
        const url = url_1.URLExt.join(getBaseUrl(), 'nbconvert', format, notebookPath);
        if (download) {
            return url + '?download=true';
        }
        return url;
    }
    PageConfig.getNBConvertURL = getNBConvertURL;
    /**
     * Get the authorization token for a Jupyter application.
     */
    function getToken() {
        return getOption('token') || getBodyData('jupyterApiToken');
    }
    PageConfig.getToken = getToken;
    /**
     * Get the Notebook version info [major, minor, patch].
     */
    function getNotebookVersion() {
        const notebookVersion = getOption('notebookVersion');
        if (notebookVersion === '') {
            return [0, 0, 0];
        }
        return JSON.parse(notebookVersion);
    }
    PageConfig.getNotebookVersion = getNotebookVersion;
    /**
     * Private page config data for the Jupyter application.
     */
    let configData = null;
    /**
     * Get a url-encoded item from `body.data` and decode it
     * We should never have any encoded URLs anywhere else in code
     * until we are building an actual request.
     */
    function getBodyData(key) {
        if (typeof document === 'undefined' || !document.body) {
            return '';
        }
        const val = document.body.dataset[key];
        if (typeof val === 'undefined') {
            return '';
        }
        return decodeURIComponent(val);
    }
    /**
     * The namespace for page config `Extension` functions.
     */
    let Extension;
    (function (Extension) {
        /**
         * Populate an array from page config.
         *
         * @param key - The page config key (e.g., `deferredExtensions`).
         *
         * #### Notes
         * This is intended for `deferredExtensions` and `disabledExtensions`.
         */
        function populate(key) {
            try {
                const raw = getOption(key);
                if (raw) {
                    return JSON.parse(raw);
                }
            }
            catch (error) {
                console.warn(`Unable to parse ${key}.`, error);
            }
            return [];
        }
        /**
         * The collection of deferred extensions in page config.
         */
        Extension.deferred = populate('deferredExtensions');
        /**
         * The collection of disabled extensions in page config.
         */
        Extension.disabled = populate('disabledExtensions');
        /**
         * Returns whether a plugin is deferred.
         *
         * @param id - The plugin ID.
         */
        function isDeferred(id) {
            // Check for either a full plugin id match or an extension
            // name match.
            const separatorIndex = id.indexOf(':');
            let extName = '';
            if (separatorIndex !== -1) {
                extName = id.slice(0, separatorIndex);
            }
            return Extension.deferred.some(val => val === id || (extName && val === extName));
        }
        Extension.isDeferred = isDeferred;
        /**
         * Returns whether a plugin is disabled.
         *
         * @param id - The plugin ID.
         */
        function isDisabled(id) {
            // Check for either a full plugin id match or an extension
            // name match.
            const separatorIndex = id.indexOf(':');
            let extName = '';
            if (separatorIndex !== -1) {
                extName = id.slice(0, separatorIndex);
            }
            return Extension.disabled.some(val => val === id || (extName && val === extName));
        }
        Extension.isDisabled = isDisabled;
    })(Extension = PageConfig.Extension || (PageConfig.Extension = {}));
})(PageConfig = exports.PageConfig || (exports.PageConfig = {}));
//# sourceMappingURL=pageconfig.js.map

/***/ }),

/***/ 39971:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PathExt = void 0;
const path_1 = __webpack_require__(71017);
/**
 * The namespace for path-related functions.
 *
 * Note that Jupyter server paths do not start with a leading slash.
 */
var PathExt;
(function (PathExt) {
    /**
     * Join all arguments together and normalize the resulting path.
     * Arguments must be strings. In v0.8, non-string arguments were silently ignored. In v0.10 and up, an exception is thrown.
     *
     * @param paths - The string paths to join.
     */
    function join(...paths) {
        const path = path_1.posix.join(...paths);
        return path === '.' ? '' : removeSlash(path);
    }
    PathExt.join = join;
    /**
     * Return the last portion of a path. Similar to the Unix basename command.
     * Often used to extract the file name from a fully qualified path.
     *
     * @param path - The path to evaluate.
     *
     * @param ext - An extension to remove from the result.
     */
    function basename(path, ext) {
        return path_1.posix.basename(path, ext);
    }
    PathExt.basename = basename;
    /**
     * Get the directory name of a path, similar to the Unix dirname command.
     * When an empty path is given, returns the root path.
     *
     * @param path - The file path.
     */
    function dirname(path) {
        const dir = removeSlash(path_1.posix.dirname(path));
        return dir === '.' ? '' : dir;
    }
    PathExt.dirname = dirname;
    /**
     * Get the extension of the path.
     *
     * @param path - The file path.
     *
     * @returns the extension of the file.
     *
     * #### Notes
     * The extension is the string from the last occurrence of the `.`
     * character to end of string in the last portion of the path, inclusive.
     * If there is no `.` in the last portion of the path, or if the first
     * character of the basename of path [[basename]] is `.`, then an
     * empty string is returned.
     */
    function extname(path) {
        return path_1.posix.extname(path);
    }
    PathExt.extname = extname;
    /**
     * Normalize a string path, reducing '..' and '.' parts.
     * When multiple slashes are found, they're replaced by a single one; when the path contains a trailing slash, it is preserved. On Windows backslashes are used.
     * When an empty path is given, returns the root path.
     *
     * @param path - The string path to normalize.
     */
    function normalize(path) {
        if (path === '') {
            return '';
        }
        return removeSlash(path_1.posix.normalize(path));
    }
    PathExt.normalize = normalize;
    /**
     * Resolve a sequence of paths or path segments into an absolute path.
     * The root path in the application has no leading slash, so it is removed.
     *
     * @param parts - The paths to join.
     *
     * #### Notes
     * The right-most parameter is considered {to}.  Other parameters are considered an array of {from}.
     *
     * Starting from leftmost {from} parameter, resolves {to} to an absolute path.
     *
     * If {to} isn't already absolute, {from} arguments are prepended in right to left order, until an absolute path is found. If after using all {from} paths still no absolute path is found, the current working directory is used as well. The resulting path is normalized, and trailing slashes are removed unless the path gets resolved to the root directory.
     */
    function resolve(...parts) {
        return removeSlash(path_1.posix.resolve(...parts));
    }
    PathExt.resolve = resolve;
    /**
     * Solve the relative path from {from} to {to}.
     *
     * @param from - The source path.
     *
     * @param to - The target path.
     *
     * #### Notes
     * If from and to each resolve to the same path (after calling
     * path.resolve() on each), a zero-length string is returned.
     * If a zero-length string is passed as from or to, `/`
     * will be used instead of the zero-length strings.
     */
    function relative(from, to) {
        return removeSlash(path_1.posix.relative(from, to));
    }
    PathExt.relative = relative;
    /**
     * Normalize a file extension to be of the type `'.foo'`.
     *
     * @param extension - the file extension.
     *
     * #### Notes
     * Adds a leading dot if not present and converts to lower case.
     */
    function normalizeExtension(extension) {
        if (extension.length > 0 && extension.indexOf('.') !== 0) {
            extension = `.${extension}`;
        }
        return extension;
    }
    PathExt.normalizeExtension = normalizeExtension;
    /**
     * Remove the leading slash from a path.
     *
     * @param path: the path from which to remove a leading slash.
     */
    function removeSlash(path) {
        if (path.indexOf('/') === 0) {
            path = path.slice(1);
        }
        return path;
    }
    PathExt.removeSlash = removeSlash;
})(PathExt = exports.PathExt || (exports.PathExt = {}));
//# sourceMappingURL=path.js.map

/***/ }),

/***/ 88589:
/***/ ((__unused_webpack_module, exports) => {


// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Text = void 0;
/**
 * The namespace for text-related functions.
 */
var Text;
(function (Text) {
    // javascript stores text as utf16 and string indices use "code units",
    // which stores high-codepoint characters as "surrogate pairs",
    // which occupy two indices in the javascript string.
    // We need to translate cursor_pos in the Jupyter protocol (in characters)
    // to js offset (with surrogate pairs taking two spots).
    const HAS_SURROGATES = '𝐚'.length > 1;
    /**
     * Convert a javascript string index into a unicode character offset
     *
     * @param jsIdx - The javascript string index (counting surrogate pairs)
     *
     * @param text - The text in which the offset is calculated
     *
     * @returns The unicode character offset
     */
    function jsIndexToCharIndex(jsIdx, text) {
        if (HAS_SURROGATES) {
            // not using surrogates, nothing to do
            return jsIdx;
        }
        let charIdx = jsIdx;
        for (let i = 0; i + 1 < text.length && i < jsIdx; i++) {
            const charCode = text.charCodeAt(i);
            // check for surrogate pair
            if (charCode >= 0xd800 && charCode <= 0xdbff) {
                const nextCharCode = text.charCodeAt(i + 1);
                if (nextCharCode >= 0xdc00 && nextCharCode <= 0xdfff) {
                    charIdx--;
                    i++;
                }
            }
        }
        return charIdx;
    }
    Text.jsIndexToCharIndex = jsIndexToCharIndex;
    /**
     * Convert a unicode character offset to a javascript string index.
     *
     * @param charIdx - The index in unicode characters
     *
     * @param text - The text in which the offset is calculated
     *
     * @returns The js-native index
     */
    function charIndexToJsIndex(charIdx, text) {
        if (HAS_SURROGATES) {
            // not using surrogates, nothing to do
            return charIdx;
        }
        let jsIdx = charIdx;
        for (let i = 0; i + 1 < text.length && i < jsIdx; i++) {
            const charCode = text.charCodeAt(i);
            // check for surrogate pair
            if (charCode >= 0xd800 && charCode <= 0xdbff) {
                const nextCharCode = text.charCodeAt(i + 1);
                if (nextCharCode >= 0xdc00 && nextCharCode <= 0xdfff) {
                    jsIdx++;
                    i++;
                }
            }
        }
        return jsIdx;
    }
    Text.charIndexToJsIndex = charIndexToJsIndex;
    /**
     * Given a 'snake-case', 'snake_case', 'snake:case', or
     * 'snake case' string, will return the camel case version: 'snakeCase'.
     *
     * @param str: the snake-case input string.
     *
     * @param upper: default = false. If true, the first letter of the
     * returned string will be capitalized.
     *
     * @returns the camel case version of the input string.
     */
    function camelCase(str, upper = false) {
        return str.replace(/^(\w)|[\s-_:]+(\w)/g, function (match, p1, p2) {
            if (p2) {
                return p2.toUpperCase();
            }
            else {
                return upper ? p1.toUpperCase() : p1.toLowerCase();
            }
        });
    }
    Text.camelCase = camelCase;
    /**
     * Given a string, title case the words in the string.
     *
     * @param str: the string to title case.
     *
     * @returns the same string, but with each word capitalized.
     */
    function titleCase(str) {
        return (str || '')
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    Text.titleCase = titleCase;
})(Text = exports.Text || (exports.Text = {}));
//# sourceMappingURL=text.js.map

/***/ }),

/***/ 98842:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Time = void 0;
const moment_1 = __importDefault(__webpack_require__(30381));
/**
 * The namespace for date functions.
 */
var Time;
(function (Time) {
    /**
     * Convert a timestring to a human readable string (e.g. 'two minutes ago').
     *
     * @param value - The date timestring or date object.
     *
     * @returns A formatted date.
     */
    function formatHuman(value) {
        moment_1.default.locale(document.documentElement.lang);
        let time = (0, moment_1.default)(value).fromNow();
        // FIXME-TRANS: This is not localization friendly!
        time = time === 'a few seconds ago' ? 'seconds ago' : time;
        return time;
    }
    Time.formatHuman = formatHuman;
    /**
     * Convert a timestring to a date format.
     *
     * @param value - The date timestring or date object.
     *
     * @param format - The format string.
     *
     * @returns A formatted date.
     */
    function format(value, timeFormat = 'YYYY-MM-DD HH:mm') {
        return (0, moment_1.default)(value).format(timeFormat);
    }
    Time.format = format;
})(Time = exports.Time || (exports.Time = {}));
//# sourceMappingURL=time.js.map

/***/ }),

/***/ 58726:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.URLExt = void 0;
const path_1 = __webpack_require__(71017);
const url_parse_1 = __importDefault(__webpack_require__(84564));
/**
 * The namespace for URL-related functions.
 */
var URLExt;
(function (URLExt) {
    /**
     * Parse a url into a URL object.
     *
     * @param urlString - The URL string to parse.
     *
     * @returns A URL object.
     */
    function parse(url) {
        if (typeof document !== 'undefined' && document) {
            const a = document.createElement('a');
            a.href = url;
            return a;
        }
        return (0, url_parse_1.default)(url);
    }
    URLExt.parse = parse;
    /**
     * Parse URL and retrieve hostname
     *
     * @param url - The URL string to parse
     *
     * @returns a hostname string value
     */
    function getHostName(url) {
        return (0, url_parse_1.default)(url).hostname;
    }
    URLExt.getHostName = getHostName;
    function normalize(url) {
        return url && parse(url).toString();
    }
    URLExt.normalize = normalize;
    /**
     * Join a sequence of url components and normalizes as in node `path.join`.
     *
     * @param parts - The url components.
     *
     * @returns the joined url.
     */
    function join(...parts) {
        let u = (0, url_parse_1.default)(parts[0], {});
        // Schema-less URL can be only parsed as relative to a base URL
        // see https://github.com/unshiftio/url-parse/issues/219#issuecomment-1002219326
        const isSchemaLess = u.protocol === '' && u.slashes;
        if (isSchemaLess) {
            u = (0, url_parse_1.default)(parts[0], 'https:' + parts[0]);
        }
        const prefix = `${isSchemaLess ? '' : u.protocol}${u.slashes ? '//' : ''}${u.auth}${u.auth ? '@' : ''}${u.host}`;
        // If there was a prefix, then the first path must start at the root.
        const path = path_1.posix.join(`${!!prefix && u.pathname[0] !== '/' ? '/' : ''}${u.pathname}`, ...parts.slice(1));
        return `${prefix}${path === '.' ? '' : path}`;
    }
    URLExt.join = join;
    /**
     * Encode the components of a multi-segment url.
     *
     * @param url - The url to encode.
     *
     * @returns the encoded url.
     *
     * #### Notes
     * Preserves the `'/'` separators.
     * Should not include the base url, since all parts are escaped.
     */
    function encodeParts(url) {
        return join(...url.split('/').map(encodeURIComponent));
    }
    URLExt.encodeParts = encodeParts;
    /**
     * Return a serialized object string suitable for a query.
     *
     * @param object - The source object.
     *
     * @returns an encoded url query.
     *
     * #### Notes
     * Modified version of [stackoverflow](http://stackoverflow.com/a/30707423).
     */
    function objectToQueryString(value) {
        const keys = Object.keys(value).filter(key => key.length > 0);
        if (!keys.length) {
            return '';
        }
        return ('?' +
            keys
                .map(key => {
                const content = encodeURIComponent(String(value[key]));
                return key + (content ? '=' + content : '');
            })
                .join('&'));
    }
    URLExt.objectToQueryString = objectToQueryString;
    /**
     * Return a parsed object that represents the values in a query string.
     */
    function queryStringToObject(value) {
        return value
            .replace(/^\?/, '')
            .split('&')
            .reduce((acc, val) => {
            const [key, value] = val.split('=');
            if (key.length > 0) {
                acc[key] = decodeURIComponent(value || '');
            }
            return acc;
        }, {});
    }
    URLExt.queryStringToObject = queryStringToObject;
    /**
     * Test whether the url is a local url.
     *
     * #### Notes
     * This function returns `false` for any fully qualified url, including
     * `data:`, `file:`, and `//` protocol URLs.
     */
    function isLocal(url) {
        const { protocol } = parse(url);
        return ((!protocol || url.toLowerCase().indexOf(protocol) !== 0) &&
            url.indexOf('/') !== 0);
    }
    URLExt.isLocal = isLocal;
})(URLExt = exports.URLExt || (exports.URLExt = {}));
//# sourceMappingURL=url.js.map

/***/ }),

/***/ 65657:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FALLBACK_KERNEL: () => (/* binding */ FALLBACK_KERNEL),
/* harmony export */   IKernelSpecs: () => (/* binding */ IKernelSpecs),
/* harmony export */   IKernels: () => (/* binding */ IKernels)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(66201);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/**
 * The token for the kernels service.
 */
const IKernels = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@datalayer/jupyterlite-kernel:IKernels');
/**
 * The kernel name of last resort.
 */
const FALLBACK_KERNEL = 'javascript';
/**
 * The token for the kernel spec service.
 */
const IKernelSpecs = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@datalayer/jupyterlite-kernel:IKernelSpecs');


/***/ }),

/***/ 73054:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IServiceWorkerRegistrationWrapper: () => (/* binding */ IServiceWorkerRegistrationWrapper)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(66201);

/**
 * The token for the ServiceWorker.
 */
const IServiceWorkerRegistrationWrapper = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@datalayer/jupyterlite-server-extension:IServiceWorkerRegistrationWrapper');


/***/ })

};
;