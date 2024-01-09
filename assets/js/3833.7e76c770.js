exports.id = 3833;
exports.ids = [3833];
exports.modules = {

/***/ 65657:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 72486:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

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

/***/ 25323:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
__exportStar(__webpack_require__(72486), exports);
__exportStar(__webpack_require__(13769), exports);
__exportStar(__webpack_require__(19142), exports);
__exportStar(__webpack_require__(57889), exports);
__exportStar(__webpack_require__(85463), exports);
__exportStar(__webpack_require__(60944), exports);
__exportStar(__webpack_require__(63601), exports);
__exportStar(__webpack_require__(44031), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 13769:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=interfaces.js.map

/***/ }),

/***/ 19142:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

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

/***/ 57889:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PageConfig = void 0;
const coreutils_1 = __webpack_require__(66201);
const minimist_1 = __importDefault(__webpack_require__(96562));
const url_1 = __webpack_require__(44031);
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

/***/ 85463:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

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

/***/ 60944:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

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

/***/ 63601:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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

/***/ 44031:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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

/***/ 80581:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.supportedKernelWebSocketProtocols = exports.isInputReplyMsg = exports.isInputRequestMsg = exports.isDebugReplyMsg = exports.isDebugRequestMsg = exports.isExecuteReplyMsg = exports.isInfoRequestMsg = exports.isCommMsgMsg = exports.isCommCloseMsg = exports.isCommOpenMsg = exports.isDebugEventMsg = exports.isClearOutputMsg = exports.isStatusMsg = exports.isErrorMsg = exports.isExecuteResultMsg = exports.isExecuteInputMsg = exports.isUpdateDisplayDataMsg = exports.isDisplayDataMsg = exports.isStreamMsg = exports.createMessage = void 0;
const coreutils_1 = __webpack_require__(66201);
function createMessage(options) {
    var _a, _b, _c, _d, _e;
    return {
        buffers: (_a = options.buffers) !== null && _a !== void 0 ? _a : [],
        channel: options.channel,
        content: options.content,
        header: {
            date: new Date().toISOString(),
            msg_id: (_b = options.msgId) !== null && _b !== void 0 ? _b : coreutils_1.UUID.uuid4(),
            msg_type: options.msgType,
            session: options.session,
            username: (_c = options.username) !== null && _c !== void 0 ? _c : '',
            version: '5.2'
        },
        metadata: (_d = options.metadata) !== null && _d !== void 0 ? _d : {},
        parent_header: (_e = options.parentHeader) !== null && _e !== void 0 ? _e : {}
    };
}
exports.createMessage = createMessage;
/**
 * Test whether a kernel message is a `'stream'` message.
 */
function isStreamMsg(msg) {
    return msg.header.msg_type === 'stream';
}
exports.isStreamMsg = isStreamMsg;
/**
 * Test whether a kernel message is an `'display_data'` message.
 */
function isDisplayDataMsg(msg) {
    return msg.header.msg_type === 'display_data';
}
exports.isDisplayDataMsg = isDisplayDataMsg;
/**
 * Test whether a kernel message is an `'update_display_data'` message.
 */
function isUpdateDisplayDataMsg(msg) {
    return msg.header.msg_type === 'update_display_data';
}
exports.isUpdateDisplayDataMsg = isUpdateDisplayDataMsg;
/**
 * Test whether a kernel message is an `'execute_input'` message.
 */
function isExecuteInputMsg(msg) {
    return msg.header.msg_type === 'execute_input';
}
exports.isExecuteInputMsg = isExecuteInputMsg;
/**
 * Test whether a kernel message is an `'execute_result'` message.
 */
function isExecuteResultMsg(msg) {
    return msg.header.msg_type === 'execute_result';
}
exports.isExecuteResultMsg = isExecuteResultMsg;
/**
 * Test whether a kernel message is an `'error'` message.
 */
function isErrorMsg(msg) {
    return msg.header.msg_type === 'error';
}
exports.isErrorMsg = isErrorMsg;
/**
 * Test whether a kernel message is a `'status'` message.
 */
function isStatusMsg(msg) {
    return msg.header.msg_type === 'status';
}
exports.isStatusMsg = isStatusMsg;
/**
 * Test whether a kernel message is a `'clear_output'` message.
 */
function isClearOutputMsg(msg) {
    return msg.header.msg_type === 'clear_output';
}
exports.isClearOutputMsg = isClearOutputMsg;
/**
 * Test whether a kernel message is an experimental `'debug_event'` message.
 *
 * @hidden
 *
 * #### Notes
 * Debug messages are experimental messages that are not in the official
 * kernel message specification. As such, this is *NOT* considered
 * part of the public API, and may change without notice.
 */
function isDebugEventMsg(msg) {
    return msg.header.msg_type === 'debug_event';
}
exports.isDebugEventMsg = isDebugEventMsg;
/**
 * Test whether a kernel message is a `'comm_open'` message.
 */
function isCommOpenMsg(msg) {
    return msg.header.msg_type === 'comm_open';
}
exports.isCommOpenMsg = isCommOpenMsg;
/**
 * Test whether a kernel message is a `'comm_close'` message.
 */
function isCommCloseMsg(msg) {
    return msg.header.msg_type === 'comm_close';
}
exports.isCommCloseMsg = isCommCloseMsg;
/**
 * Test whether a kernel message is a `'comm_msg'` message.
 */
function isCommMsgMsg(msg) {
    return msg.header.msg_type === 'comm_msg';
}
exports.isCommMsgMsg = isCommMsgMsg;
/**
 * Test whether a kernel message is a `'kernel_info_request'` message.
 */
function isInfoRequestMsg(msg) {
    return msg.header.msg_type === 'kernel_info_request';
}
exports.isInfoRequestMsg = isInfoRequestMsg;
/**
 * Test whether a kernel message is an `'execute_reply'` message.
 */
function isExecuteReplyMsg(msg) {
    return msg.header.msg_type === 'execute_reply';
}
exports.isExecuteReplyMsg = isExecuteReplyMsg;
/**
 * Test whether a kernel message is an experimental `'debug_request'` message.
 *
 * @hidden
 *
 * #### Notes
 * Debug messages are experimental messages that are not in the official
 * kernel message specification. As such, this is *NOT* considered
 * part of the public API, and may change without notice.
 */
function isDebugRequestMsg(msg) {
    return msg.header.msg_type === 'debug_request';
}
exports.isDebugRequestMsg = isDebugRequestMsg;
/**
 * Test whether a kernel message is an experimental `'debug_reply'` message.
 *
 * @hidden
 *
 * #### Notes
 * Debug messages are experimental messages that are not in the official
 * kernel message specification. As such, this is *NOT* considered
 * part of the public API, and may change without notice.
 */
function isDebugReplyMsg(msg) {
    return msg.header.msg_type === 'debug_reply';
}
exports.isDebugReplyMsg = isDebugReplyMsg;
/**
 * Test whether a kernel message is an `'input_request'` message.
 */
function isInputRequestMsg(msg) {
    return msg.header.msg_type === 'input_request';
}
exports.isInputRequestMsg = isInputRequestMsg;
/**
 * Test whether a kernel message is an `'input_reply'` message.
 */
function isInputReplyMsg(msg) {
    return msg.header.msg_type === 'input_reply';
}
exports.isInputReplyMsg = isInputReplyMsg;
// ///////////////////////////////////////////////
// Message (de)serialization
// ///////////////////////////////////////////////
/**
 * The list of supported kernel wire protocols over websocket.
 */
var supportedKernelWebSocketProtocols;
(function (supportedKernelWebSocketProtocols) {
    supportedKernelWebSocketProtocols["v1KernelWebsocketJupyterOrg"] = "v1.kernel.websocket.jupyter.org";
})(supportedKernelWebSocketProtocols = exports.supportedKernelWebSocketProtocols || (exports.supportedKernelWebSocketProtocols = {}));
//# sourceMappingURL=messages.js.map

/***/ }),

/***/ 19075:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deserialize = exports.serialize = void 0;
const KernelMessage = __importStar(__webpack_require__(80581));
/**
 * Serialize a kernel message for transport.
 */
function serialize(msg, protocol = '') {
    switch (protocol) {
        case KernelMessage.supportedKernelWebSocketProtocols
            .v1KernelWebsocketJupyterOrg:
            return Private.serializeV1KernelWebsocketJupyterOrg(msg);
        default:
            return Private.serializeDefault(msg);
    }
}
exports.serialize = serialize;
/**
 * Deserialize and return the unpacked message.
 */
function deserialize(data, protocol = '') {
    switch (protocol) {
        case KernelMessage.supportedKernelWebSocketProtocols
            .v1KernelWebsocketJupyterOrg:
            return Private.deserializeV1KernelWebsocketJupyterOrg(data);
        default:
            return Private.deserializeDefault(data);
    }
}
exports.deserialize = deserialize;
var Private;
(function (Private) {
    /**
     * Deserialize and return the unpacked message.
     * Protocol `v1.kernel.websocket.jupyter.org`
     */
    function deserializeV1KernelWebsocketJupyterOrg(binMsg) {
        let msg;
        const data = new DataView(binMsg);
        const offsetNumber = Number(data.getBigUint64(0, true /* littleEndian */));
        let offsets = [];
        for (let i = 0; i < offsetNumber; i++) {
            // WARNING: we cast our 64-bit unsigned int to a number!
            // so offsets cannot index up to 2**64 bytes
            offsets.push(Number(data.getBigUint64(8 * (i + 1), true /* littleEndian */)));
        }
        const decoder = new TextDecoder('utf8');
        const channel = decoder.decode(binMsg.slice(offsets[0], offsets[1]));
        const header = JSON.parse(decoder.decode(binMsg.slice(offsets[1], offsets[2])));
        const parent_header = JSON.parse(decoder.decode(binMsg.slice(offsets[2], offsets[3])));
        const metadata = JSON.parse(decoder.decode(binMsg.slice(offsets[3], offsets[4])));
        const content = JSON.parse(decoder.decode(binMsg.slice(offsets[4], offsets[5])));
        let buffers = [];
        for (let i = 5; i < offsets.length; i++) {
            if (i == offsets.length - 1) {
                buffers.push(binMsg.slice(offsets[i]));
            }
            else {
                buffers.push(binMsg.slice(offsets[i], offsets[i + 1]));
            }
        }
        msg = {
            channel,
            header,
            parent_header,
            metadata,
            content,
            buffers
        };
        return msg;
    }
    Private.deserializeV1KernelWebsocketJupyterOrg = deserializeV1KernelWebsocketJupyterOrg;
    /**
     * Serialize a kernel message for transport.
     * Protocol `v1.kernel.websocket.jupyter.org`
     */
    function serializeV1KernelWebsocketJupyterOrg(msg) {
        const header = JSON.stringify(msg.header);
        const parentHeader = msg.parent_header == null ? '{}' : JSON.stringify(msg.parent_header);
        const metadata = JSON.stringify(msg.metadata);
        const content = JSON.stringify(msg.content);
        const buffers = msg.buffers !== undefined ? msg.buffers : [];
        const offsetNumber = 1 + 4 + buffers.length + 1;
        let offsets = [];
        offsets.push(8 * (1 + offsetNumber));
        offsets.push(msg.channel.length + offsets[offsets.length - 1]);
        const encoder = new TextEncoder();
        const channelEncoded = encoder.encode(msg.channel);
        const headerEncoded = encoder.encode(header);
        const parentHeaderEncoded = encoder.encode(parentHeader);
        const metadataEncoded = encoder.encode(metadata);
        const contentEncoded = encoder.encode(content);
        const binMsgNoBuff = new Uint8Array(channelEncoded.length +
            headerEncoded.length +
            parentHeaderEncoded.length +
            metadataEncoded.length +
            contentEncoded.length);
        binMsgNoBuff.set(channelEncoded);
        binMsgNoBuff.set(headerEncoded, channelEncoded.length);
        binMsgNoBuff.set(parentHeaderEncoded, channelEncoded.length + headerEncoded.length);
        binMsgNoBuff.set(metadataEncoded, channelEncoded.length + headerEncoded.length + parentHeaderEncoded.length);
        binMsgNoBuff.set(contentEncoded, channelEncoded.length +
            headerEncoded.length +
            parentHeaderEncoded.length +
            metadataEncoded.length);
        for (let length of [
            headerEncoded.length,
            parentHeaderEncoded.length,
            metadataEncoded.length,
            contentEncoded.length
        ]) {
            offsets.push(length + offsets[offsets.length - 1]);
        }
        let buffersByteLength = 0;
        for (let buffer of buffers) {
            let length = buffer.byteLength;
            offsets.push(length + offsets[offsets.length - 1]);
            buffersByteLength += length;
        }
        const binMsg = new Uint8Array(8 * (1 + offsetNumber) + binMsgNoBuff.byteLength + buffersByteLength);
        const word = new ArrayBuffer(8);
        const data = new DataView(word);
        data.setBigUint64(0, BigInt(offsetNumber), true /* littleEndian */);
        binMsg.set(new Uint8Array(word), 0);
        for (let i = 0; i < offsets.length; i++) {
            data.setBigUint64(0, BigInt(offsets[i]), true /* littleEndian */);
            binMsg.set(new Uint8Array(word), 8 * (i + 1));
        }
        binMsg.set(binMsgNoBuff, offsets[0]);
        for (let i = 0; i < buffers.length; i++) {
            const buffer = buffers[i];
            binMsg.set(new Uint8Array(ArrayBuffer.isView(buffer) ? buffer.buffer : buffer), offsets[5 + i]);
        }
        return binMsg.buffer;
    }
    Private.serializeV1KernelWebsocketJupyterOrg = serializeV1KernelWebsocketJupyterOrg;
    /**
     * Deserialize and return the unpacked message.
     * Default protocol
     *
     * #### Notes
     * Handles JSON blob strings and binary messages.
     */
    function deserializeDefault(data) {
        let value;
        if (typeof data === 'string') {
            value = JSON.parse(data);
        }
        else {
            value = deserializeBinary(data);
        }
        return value;
    }
    Private.deserializeDefault = deserializeDefault;
    /**
     * Serialize a kernel message for transport.
     * Default protocol
     *
     * #### Notes
     * If there is binary content, an `ArrayBuffer` is returned,
     * otherwise the message is converted to a JSON string.
     */
    function serializeDefault(msg) {
        var _a;
        let value;
        if ((_a = msg.buffers) === null || _a === void 0 ? void 0 : _a.length) {
            value = serializeBinary(msg);
        }
        else {
            value = JSON.stringify(msg);
        }
        return value;
    }
    Private.serializeDefault = serializeDefault;
    /**
     * Deserialize a binary message to a Kernel Message.
     */
    function deserializeBinary(buf) {
        const data = new DataView(buf);
        // read the header: 1 + nbufs 32b integers
        const nbufs = data.getUint32(0);
        const offsets = [];
        if (nbufs < 2) {
            throw new Error('Invalid incoming Kernel Message');
        }
        for (let i = 1; i <= nbufs; i++) {
            offsets.push(data.getUint32(i * 4));
        }
        const jsonBytes = new Uint8Array(buf.slice(offsets[0], offsets[1]));
        const msg = JSON.parse(new TextDecoder('utf8').decode(jsonBytes));
        // the remaining chunks are stored as DataViews in msg.buffers
        msg.buffers = [];
        for (let i = 1; i < nbufs; i++) {
            const start = offsets[i];
            const stop = offsets[i + 1] || buf.byteLength;
            msg.buffers.push(new DataView(buf.slice(start, stop)));
        }
        return msg;
    }
    /**
     * Implement the binary serialization protocol.
     *
     * Serialize Kernel message to ArrayBuffer.
     */
    function serializeBinary(msg) {
        const offsets = [];
        const buffers = [];
        const encoder = new TextEncoder();
        let origBuffers = [];
        if (msg.buffers !== undefined) {
            origBuffers = msg.buffers;
            delete msg['buffers'];
        }
        const jsonUtf8 = encoder.encode(JSON.stringify(msg));
        buffers.push(jsonUtf8.buffer);
        for (let i = 0; i < origBuffers.length; i++) {
            // msg.buffers elements could be either views or ArrayBuffers
            // buffers elements are ArrayBuffers
            const b = origBuffers[i];
            buffers.push(ArrayBuffer.isView(b) ? b.buffer : b);
        }
        const nbufs = buffers.length;
        offsets.push(4 * (nbufs + 1));
        for (let i = 0; i + 1 < buffers.length; i++) {
            offsets.push(offsets[offsets.length - 1] + buffers[i].byteLength);
        }
        const msgBuf = new Uint8Array(offsets[offsets.length - 1] + buffers[buffers.length - 1].byteLength);
        // use DataView.setUint32 for network byte-order
        const view = new DataView(msgBuf.buffer);
        // write nbufs to first 4 bytes
        view.setUint32(0, nbufs);
        // write offsets to next 4 * nbufs bytes
        for (let i = 0; i < offsets.length; i++) {
            view.setUint32(4 * (i + 1), offsets[i]);
        }
        // write all the buffers at their respective offsets
        for (let i = 0; i < buffers.length; i++) {
            msgBuf.set(new Uint8Array(buffers[i]), offsets[i]);
        }
        return msgBuf.buffer;
    }
})(Private || (Private = {}));
//# sourceMappingURL=serialize.js.map

/***/ }),

/***/ 43833:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ jupyterlite_server_extension_lib)
});

// EXTERNAL MODULE: ./node_modules/@datalayer/jupyterlite-server-extension/node_modules/@jupyterlab/coreutils/lib/index.js
var lib = __webpack_require__(91363);
// EXTERNAL MODULE: ./node_modules/@datalayer/jupyterlite-kernel/lib/tokens.js
var tokens = __webpack_require__(65657);
// EXTERNAL MODULE: ./node_modules/@lumino/signaling/dist/index.es6.js + 1 modules
var index_es6 = __webpack_require__(76674);
;// CONCATENATED MODULE: ./node_modules/@datalayer/jupyterlite-kernel/node_modules/@jupyterlab/observables/lib/observablemap.js
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/**
 * A concrete implementation of IObservableMap<T>.
 */
class ObservableMap {
    /**
     * Construct a new observable map.
     */
    constructor(options = {}) {
        this._map = new Map();
        this._changed = new index_es6.Signal(this);
        this._isDisposed = false;
        this._itemCmp = options.itemCmp || Private.itemCmp;
        if (options.values) {
            for (const key in options.values) {
                this._map.set(key, options.values[key]);
            }
        }
    }
    /**
     * The type of the Observable.
     */
    get type() {
        return 'Map';
    }
    /**
     * A signal emitted when the map has changed.
     */
    get changed() {
        return this._changed;
    }
    /**
     * Whether this map has been disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * The number of key-value pairs in the map.
     */
    get size() {
        return this._map.size;
    }
    /**
     * Set a key-value pair in the map
     *
     * @param key - The key to set.
     *
     * @param value - The value for the key.
     *
     * @returns the old value for the key, or undefined
     *   if that did not exist.
     *
     * @throws if the new value is undefined.
     *
     * #### Notes
     * This is a no-op if the value does not change.
     */
    set(key, value) {
        const oldVal = this._map.get(key);
        if (value === undefined) {
            throw Error('Cannot set an undefined value, use remove');
        }
        // Bail if the value does not change.
        const itemCmp = this._itemCmp;
        if (oldVal !== undefined && itemCmp(oldVal, value)) {
            return oldVal;
        }
        this._map.set(key, value);
        this._changed.emit({
            type: oldVal ? 'change' : 'add',
            key: key,
            oldValue: oldVal,
            newValue: value
        });
        return oldVal;
    }
    /**
     * Get a value for a given key.
     *
     * @param key - the key.
     *
     * @returns the value for that key.
     */
    get(key) {
        return this._map.get(key);
    }
    /**
     * Check whether the map has a key.
     *
     * @param key - the key to check.
     *
     * @returns `true` if the map has the key, `false` otherwise.
     */
    has(key) {
        return this._map.has(key);
    }
    /**
     * Get a list of the keys in the map.
     *
     * @returns - a list of keys.
     */
    keys() {
        const keyList = [];
        this._map.forEach((v, k) => {
            keyList.push(k);
        });
        return keyList;
    }
    /**
     * Get a list of the values in the map.
     *
     * @returns - a list of values.
     */
    values() {
        const valList = [];
        this._map.forEach((v, k) => {
            valList.push(v);
        });
        return valList;
    }
    /**
     * Remove a key from the map
     *
     * @param key - the key to remove.
     *
     * @returns the value of the given key,
     *   or undefined if that does not exist.
     *
     * #### Notes
     * This is a no-op if the value does not change.
     */
    delete(key) {
        const oldVal = this._map.get(key);
        const removed = this._map.delete(key);
        if (removed) {
            this._changed.emit({
                type: 'remove',
                key: key,
                oldValue: oldVal,
                newValue: undefined
            });
        }
        return oldVal;
    }
    /**
     * Set the ObservableMap to an empty map.
     */
    clear() {
        // Delete one by one to emit the correct signals.
        const keyList = this.keys();
        for (let i = 0; i < keyList.length; i++) {
            this.delete(keyList[i]);
        }
    }
    /**
     * Dispose of the resources held by the map.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._isDisposed = true;
        index_es6.Signal.clearData(this);
        this._map.clear();
    }
}
/**
 * The namespace for module private data.
 */
var Private;
(function (Private) {
    /**
     * The default strict equality item comparator.
     */
    function itemCmp(first, second) {
        return first === second;
    }
    Private.itemCmp = itemCmp;
})(Private || (Private = {}));
//# sourceMappingURL=observablemap.js.map
// EXTERNAL MODULE: ./node_modules/@datalayer/jupyterlite-kernel/node_modules/@jupyterlab/services/lib/kernel/serialize.js
var serialize = __webpack_require__(19075);
// EXTERNAL MODULE: ./node_modules/@lumino/coreutils/dist/index.es6.js
var dist_index_es6 = __webpack_require__(66201);
// EXTERNAL MODULE: ./node_modules/mock-socket/dist/mock-socket.js
var mock_socket = __webpack_require__(31670);
;// CONCATENATED MODULE: ./node_modules/async-mutex/index.mjs
const E_TIMEOUT = new Error('timeout while waiting for mutex to become available');
const E_ALREADY_LOCKED = new Error('mutex already locked');
const E_CANCELED = new Error('request for lock canceled');

var __awaiter$2 = ( false) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Semaphore {
    constructor(_maxConcurrency, _cancelError = E_CANCELED) {
        this._maxConcurrency = _maxConcurrency;
        this._cancelError = _cancelError;
        this._queue = [];
        this._waiters = [];
        if (_maxConcurrency <= 0) {
            throw new Error('semaphore must be initialized to a positive value');
        }
        this._value = _maxConcurrency;
    }
    acquire() {
        const locked = this.isLocked();
        const ticketPromise = new Promise((resolve, reject) => this._queue.push({ resolve, reject }));
        if (!locked)
            this._dispatch();
        return ticketPromise;
    }
    runExclusive(callback) {
        return __awaiter$2(this, void 0, void 0, function* () {
            const [value, release] = yield this.acquire();
            try {
                return yield callback(value);
            }
            finally {
                release();
            }
        });
    }
    waitForUnlock() {
        return __awaiter$2(this, void 0, void 0, function* () {
            if (!this.isLocked()) {
                return Promise.resolve();
            }
            const waitPromise = new Promise((resolve) => this._waiters.push({ resolve }));
            return waitPromise;
        });
    }
    isLocked() {
        return this._value <= 0;
    }
    /** @deprecated Deprecated in 0.3.0, will be removed in 0.4.0. Use runExclusive instead. */
    release() {
        if (this._maxConcurrency > 1) {
            throw new Error('this method is unavailable on semaphores with concurrency > 1; use the scoped release returned by acquire instead');
        }
        if (this._currentReleaser) {
            const releaser = this._currentReleaser;
            this._currentReleaser = undefined;
            releaser();
        }
    }
    cancel() {
        this._queue.forEach((ticket) => ticket.reject(this._cancelError));
        this._queue = [];
    }
    _dispatch() {
        const nextTicket = this._queue.shift();
        if (!nextTicket)
            return;
        let released = false;
        this._currentReleaser = () => {
            if (released)
                return;
            released = true;
            this._value++;
            this._resolveWaiters();
            this._dispatch();
        };
        nextTicket.resolve([this._value--, this._currentReleaser]);
    }
    _resolveWaiters() {
        this._waiters.forEach((waiter) => waiter.resolve());
        this._waiters = [];
    }
}

var __awaiter$1 = ( false) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Mutex {
    constructor(cancelError) {
        this._semaphore = new Semaphore(1, cancelError);
    }
    acquire() {
        return __awaiter$1(this, void 0, void 0, function* () {
            const [, releaser] = yield this._semaphore.acquire();
            return releaser;
        });
    }
    runExclusive(callback) {
        return this._semaphore.runExclusive(() => callback());
    }
    isLocked() {
        return this._semaphore.isLocked();
    }
    waitForUnlock() {
        return this._semaphore.waitForUnlock();
    }
    /** @deprecated Deprecated in 0.3.0, will be removed in 0.4.0. Use runExclusive instead. */
    release() {
        this._semaphore.release();
    }
    cancel() {
        return this._semaphore.cancel();
    }
}

var __awaiter = ( false) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function withTimeout(sync, timeout, timeoutError = E_TIMEOUT) {
    return {
        acquire: () => new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let isTimeout = false;
            const handle = setTimeout(() => {
                isTimeout = true;
                reject(timeoutError);
            }, timeout);
            try {
                const ticket = yield sync.acquire();
                if (isTimeout) {
                    const release = Array.isArray(ticket) ? ticket[1] : ticket;
                    release();
                }
                else {
                    clearTimeout(handle);
                    resolve(ticket);
                }
            }
            catch (e) {
                if (!isTimeout) {
                    clearTimeout(handle);
                    reject(e);
                }
            }
        })),
        runExclusive(callback) {
            return __awaiter(this, void 0, void 0, function* () {
                let release = () => undefined;
                try {
                    const ticket = yield this.acquire();
                    if (Array.isArray(ticket)) {
                        release = ticket[1];
                        return yield callback(ticket[0]);
                    }
                    else {
                        release = ticket;
                        return yield callback();
                    }
                }
                finally {
                    release();
                }
            });
        },
        /** @deprecated Deprecated in 0.3.0, will be removed in 0.4.0. Use runExclusive instead. */
        release() {
            sync.release();
        },
        cancel() {
            return sync.cancel();
        },
        waitForUnlock: () => sync.waitForUnlock(),
        isLocked: () => sync.isLocked(),
    };
}

// eslint-disable-next-lisne @typescript-eslint/explicit-module-boundary-types
function tryAcquire(sync, alreadyAcquiredError = E_ALREADY_LOCKED) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return withTimeout(sync, 0, alreadyAcquiredError);
}



// EXTERNAL MODULE: ./node_modules/@datalayer/jupyterlite-kernel/node_modules/@jupyterlab/coreutils/lib/index.js
var coreutils_lib = __webpack_require__(25323);
;// CONCATENATED MODULE: ./node_modules/@datalayer/jupyterlite-kernel/lib/kernels.js






/**
 * A class to handle requests to /api/kernels
 */
class Kernels {
    /**
     * Construct a new Kernels
     *
     * @param options The instantiation options
     */
    constructor(options) {
        this._kernels = new ObservableMap();
        this._clients = new ObservableMap();
        this._kernelClients = new ObservableMap();
        const { kernelspecs } = options;
        this._kernelspecs = kernelspecs;
    }
    /**
     * Start a new kernel.
     *
     * @param options The kernel start options.
     */
    async startNew(options) {
        const { id, name, location } = options;
        const factory = this._kernelspecs.factories.get(name);
        // bail if there is no factory associated with the requested kernel
        if (!factory) {
            return { id, name };
        }
        // create a synchronization mechanism to allow only one message
        // to be processed at a time
        const mutex = new Mutex();
        // hook a new client to a kernel
        const hook = (kernelId, clientId, socket) => {
            var _a;
            const kernel = this._kernels.get(kernelId);
            if (!kernel) {
                throw Error(`No kernel ${kernelId}`);
            }
            this._clients.set(clientId, socket);
            (_a = this._kernelClients.get(kernelId)) === null || _a === void 0 ? void 0 : _a.add(clientId);
            const processMsg = async (msg) => {
                await mutex.runExclusive(async () => {
                    await kernel.handleMessage(msg);
                });
            };
            socket.on('message', async (message) => {
                let msg;
                if (message instanceof ArrayBuffer) {
                    message = new Uint8Array(message).buffer;
                    msg = (0,serialize.deserialize)(message, 'v1.kernel.websocket.jupyter.org');
                }
                else if (typeof message === 'string') {
                    const enc = new TextEncoder();
                    const mb = enc.encode(message);
                    msg = (0,serialize.deserialize)(mb, 'v1.kernel.websocket.jupyter.org');
                }
                else {
                    return;
                }
                // TODO Find a better solution for this?
                // input-reply is asynchronous, must not be processed like other messages
                if (msg.header.msg_type === 'input_reply') {
                    kernel.handleMessage(msg);
                }
                else {
                    void processMsg(msg);
                }
            });
            const removeClient = () => {
                var _a;
                this._clients.delete(clientId);
                (_a = this._kernelClients.get(kernelId)) === null || _a === void 0 ? void 0 : _a.delete(clientId);
            };
            kernel.disposed.connect(removeClient);
            // TODO: check whether this is called
            // https://github.com/thoov/mock-socket/issues/298
            // https://github.com/jupyterlab/jupyterlab/blob/6bc884a7a8ed73c615ce72ba097bdb790482b5bf/packages/services/src/kernel/default.ts#L1245
            socket.onclose = removeClient;
        };
        // ensure kernel id
        const kernelId = id !== null && id !== void 0 ? id : dist_index_es6.UUID.uuid4();
        // There is one server per kernel which handles multiple clients
        const kernelUrl = `${Kernels.WS_BASE_URL}api/kernels/${kernelId}/channels`;
        const runningKernel = this._kernels.get(kernelId);
        if (runningKernel) {
            return {
                id: runningKernel.id,
                name: runningKernel.name,
            };
        }
        // start the kernel
        const sendMessage = (msg) => {
            const clientId = msg.header.session;
            const socket = this._clients.get(clientId);
            if (!socket) {
                console.warn(`Trying to send message on removed socket for kernel ${kernelId}`);
                return;
            }
            const message = (0,serialize.serialize)(msg, 'v1.kernel.websocket.jupyter.org');
            // process iopub messages
            if (msg.channel === 'iopub') {
                const clients = this._kernelClients.get(kernelId);
                clients === null || clients === void 0 ? void 0 : clients.forEach((id) => {
                    var _a;
                    (_a = this._clients.get(id)) === null || _a === void 0 ? void 0 : _a.send(message);
                });
                return;
            }
            socket.send(message);
        };
        const kernel = await factory({
            id: kernelId,
            sendMessage,
            name,
            location,
        });
        await kernel.ready;
        this._kernels.set(kernelId, kernel);
        this._kernelClients.set(kernelId, new Set());
        // create the websocket server for the kernel
        const wsServer = new mock_socket.Server(kernelUrl);
        wsServer.on('connection', (socket) => {
            var _a;
            const url = new URL(socket.url);
            const clientId = (_a = url.searchParams.get('session_id')) !== null && _a !== void 0 ? _a : '';
            hook(kernelId, clientId, socket);
        });
        // clean up closed connection
        wsServer.on('close', () => {
            this._clients.keys().forEach((clientId) => {
                var _a;
                const socket = this._clients.get(clientId);
                if ((socket === null || socket === void 0 ? void 0 : socket.readyState) === WebSocket.CLOSED) {
                    this._clients.delete(clientId);
                    (_a = this._kernelClients.get(kernelId)) === null || _a === void 0 ? void 0 : _a.delete(clientId);
                }
            });
        });
        // cleanup on kernel shutdown
        kernel.disposed.connect(() => {
            wsServer.close();
            this._kernels.delete(kernelId);
            this._kernelClients.delete(kernelId);
        });
        return {
            id: kernel.id,
            name: kernel.name,
        };
    }
    /**
     * Restart a kernel.
     *
     * @param kernelId The kernel id.
     */
    async restart(kernelId) {
        const kernel = this._kernels.get(kernelId);
        if (!kernel) {
            throw Error(`Kernel ${kernelId} does not exist`);
        }
        const { id, name, location } = kernel;
        kernel.dispose();
        return this.startNew({ id, name, location });
    }
    /**
     * Shut down a kernel.
     *
     * @param id The kernel id.
     */
    async shutdown(id) {
        var _a;
        (_a = this._kernels.delete(id)) === null || _a === void 0 ? void 0 : _a.dispose();
    }
}
/**
 * A namespace for Kernels statics.
 */
(function (Kernels) {
    /**
     * The base url for the Kernels manager
     */
    Kernels.WS_BASE_URL = coreutils_lib.PageConfig.getBaseUrl().replace(/^http/, 'ws');
})(Kernels || (Kernels = {}));

;// CONCATENATED MODULE: ./node_modules/@datalayer/jupyterlite-kernel/lib/kernelspecs.js


/**
 * A class to handle requests to /api/kernelspecs
 */
class KernelSpecs {
    constructor() {
        this._specs = new Map();
        this._factories = new Map();
    }
    /**
     * Get the kernel specs.
     */
    get specs() {
        if (this._specs.size === 0) {
            return null;
        }
        return {
            default: this.defaultKernelName,
            kernelspecs: Object.fromEntries(this._specs),
        };
    }
    /**
     * Get the default kernel name.
     */
    get defaultKernelName() {
        let defaultKernelName = coreutils_lib.PageConfig.getOption('defaultKernelName');
        if (!defaultKernelName && this._specs.size) {
            const keys = Array.from(this._specs.keys());
            keys.sort();
            defaultKernelName = keys[0];
        }
        return defaultKernelName || tokens.FALLBACK_KERNEL;
    }
    /**
     * Get the kernel factories for the current kernels.
     */
    get factories() {
        return this._factories;
    }
    /**
     * Register a new kernel.
     *
     * @param options The options to register a new kernel.
     */
    register(options) {
        const { spec, create } = options;
        this._specs.set(spec.name, spec);
        this._factories.set(spec.name, create);
    }
}

// EXTERNAL MODULE: ./node_modules/@datalayer/jupyterlite-server/lib/tokens.js
var lib_tokens = __webpack_require__(73054);
// EXTERNAL MODULE: ./node_modules/@datalayer/jupyterlite-server/node_modules/@jupyterlab/coreutils/lib/index.js
var _jupyterlab_coreutils_lib = __webpack_require__(90593);
;// CONCATENATED MODULE: ./node_modules/@datalayer/jupyterlite-server/lib/serviceworker.js


class ServiceWorkerRegistrationWrapper {
    constructor() {
        this._registration = null;
        this._registrationChanged = new index_es6.Signal(this);
        this.initialize();
    }
    /**
     * A signal emitted when the registration changes.
     */
    get registrationChanged() {
        return this._registrationChanged;
    }
    /**
     * Whether the ServiceWorker is enabled or not.
     */
    get enabled() {
        return this._registration !== null;
    }
    async initialize() {
        if (!('serviceWorker' in navigator)) {
            console.error('ServiceWorker registration failed: Service Workers not supported in this browser');
            this.setRegistration(null);
        }
        if (navigator.serviceWorker.controller) {
            const registration = await navigator.serviceWorker.getRegistration(navigator.serviceWorker.controller.scriptURL);
            if (registration) {
                this.setRegistration(registration);
            }
        }
        return await navigator.serviceWorker
            .register(_jupyterlab_coreutils_lib.URLExt.join(_jupyterlab_coreutils_lib.PageConfig.getBaseUrl(), 'services.js'))
            .then((registration) => {
            this.setRegistration(registration);
        }, (err) => {
            console.error(`ServiceWorker registration failed: ${err}`);
            this.setRegistration(null);
        });
    }
    setRegistration(registration) {
        this._registration = registration;
        this._registrationChanged.emit(this._registration);
    }
}

;// CONCATENATED MODULE: ./node_modules/@datalayer/jupyterlite-session/lib/tokens.js

/**
 * The token for the sessions service.
 */
const ISessions = new dist_index_es6.Token('@datalayer/jupyterlite-session:ISessions');

// EXTERNAL MODULE: ./node_modules/@datalayer/jupyterlite-session/node_modules/@jupyterlab/coreutils/lib/index.js
var node_modules_jupyterlab_coreutils_lib = __webpack_require__(70969);
// EXTERNAL MODULE: ./node_modules/@lumino/algorithm/dist/index.es6.js
var algorithm_dist_index_es6 = __webpack_require__(35259);
;// CONCATENATED MODULE: ./node_modules/@datalayer/jupyterlite-session/lib/sessions.js



/**
 * A class to handle requests to /api/sessions
 */
class Sessions {
    /**
     * Construct a new Sessions.
     *
     * @param options The instantiation options for a Sessions.
     */
    constructor(options) {
        // TODO: offload to a database
        this._sessions = [];
        this._kernels = options.kernels;
    }
    /**
     * Get a session by id.
     *
     * @param id The id of the session.
     */
    async get(id) {
        const session = this._sessions.find((s) => s.id === id);
        if (!session) {
            throw Error(`Session ${id} not found`);
        }
        return session;
    }
    /**
     * List the running sessions
     */
    async list() {
        return this._sessions;
    }
    /**
     * Path an existing session.
     * This can be used to rename a session.
     * TODO: read path and name
     *
     * @param options The options to patch the session.
     */
    async patch(options) {
        const { id, path, name } = options;
        const index = this._sessions.findIndex((s) => s.id === id);
        const session = this._sessions[index];
        if (!session) {
            throw Error(`Session ${id} not found`);
        }
        const patched = {
            ...session,
            path: path !== null && path !== void 0 ? path : session.path,
            name: name !== null && name !== void 0 ? name : session.name,
        };
        this._sessions[index] = patched;
        return patched;
    }
    /**
     * Start a new session
     * TODO: read path and name
     *
     * @param options The options to start a new session.
     */
    async startNew(options) {
        var _a, _b, _c;
        const { path, name } = options;
        const running = this._sessions.find((s) => s.name === name);
        if (running) {
            return running;
        }
        const kernelName = (_b = (_a = options.kernel) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '';
        const id = (_c = options.id) !== null && _c !== void 0 ? _c : dist_index_es6.UUID.uuid4();
        const kernel = await this._kernels.startNew({
            id,
            name: kernelName,
            location: node_modules_jupyterlab_coreutils_lib.PathExt.dirname(options.path),
        });
        const session = {
            id,
            path,
            name: name !== null && name !== void 0 ? name : path,
            type: 'notebook',
            kernel: {
                id: kernel.id,
                name: kernel.name,
            },
        };
        this._sessions.push(session);
        return session;
    }
    /**
     * Shut down a session.
     *
     * @param id The id of the session to shut down.
     */
    async shutdown(id) {
        var _a;
        const session = this._sessions.find((s) => s.id === id);
        if (!session) {
            throw Error(`Session ${id} not found`);
        }
        const kernelId = (_a = session.kernel) === null || _a === void 0 ? void 0 : _a.id;
        if (kernelId) {
            await this._kernels.shutdown(kernelId);
        }
        algorithm_dist_index_es6.ArrayExt.removeFirstOf(this._sessions, session);
    }
}

;// CONCATENATED MODULE: ./node_modules/@datalayer/jupyterlite-settings/lib/tokens.js

/**
 * The token for the settings service.
 */
const ISettings = new dist_index_es6.Token('@datalayer/jupyterlite-settings:ISettings');

// EXTERNAL MODULE: ./node_modules/@datalayer/jupyterlite-settings/node_modules/@jupyterlab/coreutils/lib/index.js
var jupyterlite_settings_node_modules_jupyterlab_coreutils_lib = __webpack_require__(40412);
// EXTERNAL MODULE: ./node_modules/json5/dist/index.mjs
var dist = __webpack_require__(15876);
;// CONCATENATED MODULE: ./node_modules/@datalayer/jupyterlite-settings/lib/settings.js



/**
 * The name of the local storage.
 */
const DEFAULT_STORAGE_NAME = 'JupyterLite Storage';
/**
 * A class to handle requests to /api/settings
 */
class Settings {
    constructor(options) {
        this._storageName = DEFAULT_STORAGE_NAME;
        this._storageDrivers = null;
        this._localforage = options.localforage;
        this._storageName = options.storageName || DEFAULT_STORAGE_NAME;
        this._storageDrivers = options.storageDrivers || null;
        this._ready = new dist_index_es6.PromiseDelegate();
    }
    /**
     * A promise that resolves when the settings storage is fully initialized
     */
    get ready() {
        return this._ready.promise;
    }
    /**
     * A lazy reference to initialized storage
     */
    get storage() {
        return this.ready.then(() => this._storage);
    }
    /**
     * Finish any initialization after server has started and all extensions are applied.
     */
    async initialize() {
        await this.initStorage();
        this._ready.resolve(void 0);
    }
    /**
     * Prepare the storage
     */
    async initStorage() {
        this._storage = this.defaultSettingsStorage();
    }
    /**
     * Get default options for localForage instances
     */
    get defaultStorageOptions() {
        var _a;
        const driver = ((_a = this._storageDrivers) === null || _a === void 0 ? void 0 : _a.length) ? this._storageDrivers : null;
        return {
            version: 1,
            name: this._storageName,
            ...(driver ? { driver } : {}),
        };
    }
    /**
     * Create a settings store.
     */
    defaultSettingsStorage() {
        return this._localforage.createInstance({
            description: 'Offline Storage for Settings',
            storeName: 'settings',
            ...this.defaultStorageOptions,
        });
    }
    /**
     * Get settings by plugin id
     *
     * @param pluginId the id of the plugin
     *
     */
    async get(pluginId) {
        const all = await this.getAll();
        const settings = all.settings;
        let found = settings.find((setting) => {
            return setting.id === pluginId;
        });
        if (!found) {
            found = await this._getFederated(pluginId);
        }
        return found;
    }
    /**
     * Get all the settings
     */
    async getAll() {
        var _a;
        const settingsUrl = (_a = jupyterlite_settings_node_modules_jupyterlab_coreutils_lib.PageConfig.getOption('settingsUrl')) !== null && _a !== void 0 ? _a : '/';
        const storage = await this.storage;
        const all = (await (await fetch(jupyterlite_settings_node_modules_jupyterlab_coreutils_lib.URLExt.join(settingsUrl, 'all.json'))).json());
        const settings = await Promise.all(all.map(async (plugin) => {
            var _a;
            const { id } = plugin;
            const raw = (_a = (await storage.getItem(id))) !== null && _a !== void 0 ? _a : plugin.raw;
            return {
                ...settings_Private.override(plugin),
                raw,
                settings: dist.parse(raw),
            };
        }));
        return { settings };
    }
    /**
     * Save settings for a given plugin id
     *
     * @param pluginId The id of the plugin
     * @param raw The raw settings
     *
     */
    async save(pluginId, raw) {
        await (await this.storage).setItem(pluginId, raw);
    }
    /**
     * Get the settings for a federated extension
     *
     * @param pluginId The id of a plugin
     */
    async _getFederated(pluginId) {
        var _a;
        const [packageName, schemaName] = pluginId.split(':');
        if (!settings_Private.isFederated(packageName)) {
            return;
        }
        const labExtensionsUrl = jupyterlite_settings_node_modules_jupyterlab_coreutils_lib.PageConfig.getOption('fullLabextensionsUrl');
        const schemaUrl = jupyterlite_settings_node_modules_jupyterlab_coreutils_lib.URLExt.join(labExtensionsUrl, packageName, 'schemas', packageName, `${schemaName}.json`);
        const packageUrl = jupyterlite_settings_node_modules_jupyterlab_coreutils_lib.URLExt.join(labExtensionsUrl, packageName, 'package.json');
        const schema = await (await fetch(schemaUrl)).json();
        const packageJson = await (await fetch(packageUrl)).json();
        const raw = (_a = (await (await this.storage).getItem(pluginId))) !== null && _a !== void 0 ? _a : '{}';
        const settings = dist.parse(raw) || {};
        return settings_Private.override({
            id: pluginId,
            raw,
            schema,
            settings,
            version: packageJson.version || '3.0.8',
        });
    }
}
/**
 * A namespace for private data
 */
var settings_Private;
(function (Private) {
    const _overrides = JSON.parse(jupyterlite_settings_node_modules_jupyterlab_coreutils_lib.PageConfig.getOption('settingsOverrides') || '{}');
    /**
     * Test whether this package is configured in `federated_extensions` in this app
     *
     * @param packageName The npm name of a package
     */
    function isFederated(packageName) {
        let federated;
        try {
            federated = JSON.parse(jupyterlite_settings_node_modules_jupyterlab_coreutils_lib.PageConfig.getOption('federated_extensions'));
        }
        catch {
            return false;
        }
        for (const { name } of federated) {
            if (name === packageName) {
                return true;
            }
        }
        return false;
    }
    Private.isFederated = isFederated;
    /**
     * Override the defaults of the schema with ones from PageConfig
     *
     * @see https://github.com/jupyterlab/jupyterlab_server/blob/v2.5.2/jupyterlab_server/settings_handler.py#L216-L227
     */
    function override(plugin) {
        if (_overrides[plugin.id]) {
            if (!plugin.schema.properties) {
                // probably malformed, or only provides keyboard shortcuts, etc.
                plugin.schema.properties = {};
            }
            for (const [prop, propDefault] of Object.entries(_overrides[plugin.id] || {})) {
                plugin.schema.properties[prop].default = propDefault;
            }
        }
        return plugin;
    }
    Private.override = override;
})(settings_Private || (settings_Private = {}));

// EXTERNAL MODULE: ./node_modules/localforage/dist/localforage.js
var localforage = __webpack_require__(69483);
var localforage_default = /*#__PURE__*/__webpack_require__.n(localforage);
;// CONCATENATED MODULE: ./node_modules/@datalayer/jupyterlite-server-extension/lib/index.js
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.






/**
 * A plugin installing the service worker.
 */
const serviceWorkerPlugin = {
    id: '@datalayer/jupyterlite-server-extension:service-worker',
    autoStart: true,
    provides: lib_tokens.IServiceWorkerRegistrationWrapper,
    activate: (app) => {
        return new ServiceWorkerRegistrationWrapper();
    },
};
/**
 * The kernels service plugin.
 */
const kernelsPlugin = {
    id: '@datalayer/jupyterlite-server-extension:kernels',
    autoStart: true,
    provides: tokens.IKernels,
    requires: [tokens.IKernelSpecs],
    activate: (app, kernelspecs) => {
        return new Kernels({ kernelspecs });
    },
};
/**
 * A plugin providing the routes for the kernels service
 */
const kernelsRoutesPlugin = {
    id: '@datalayer/jupyterlite-server-extension:kernels-routes',
    autoStart: true,
    requires: [tokens.IKernels],
    activate: (app, kernels) => {
        // POST /api/kernels/{kernel_id} - Restart a kernel
        app.router.post('/api/kernels/(.*)/restart', async (req, kernelId) => {
            const res = await kernels.restart(kernelId);
            return new Response(JSON.stringify(res));
        });
        // DELETE /api/kernels/{kernel_id} - Kill a kernel and delete the kernel id
        app.router.delete('/api/kernels/(.*)', async (req, kernelId) => {
            const res = await kernels.shutdown(kernelId);
            return new Response(JSON.stringify(res), { status: 204 });
        });
    },
};
/**
 * The kernel spec service plugin.
 */
const kernelSpecPlugin = {
    id: '@datalayer/jupyterlite-server-extension:kernelspec',
    autoStart: true,
    provides: tokens.IKernelSpecs,
    activate: (app) => {
        return new KernelSpecs();
    },
};
/**
 * A plugin providing the routes for the kernelspec service.
 */
const kernelSpecRoutesPlugin = {
    id: '@datalayer/jupyterlite-server-extension:kernelspec-routes',
    autoStart: true,
    requires: [tokens.IKernelSpecs],
    activate: (app, kernelspecs) => {
        app.router.get('/api/kernelspecs', async (req) => {
            const { specs } = kernelspecs;
            if (!specs) {
                return new Response(null);
            }
            // follow the same format as in Jupyter Server
            const allKernelSpecs = {};
            const allSpecs = specs.kernelspecs;
            Object.keys(allSpecs).forEach((name) => {
                const spec = allSpecs[name];
                const { resources } = spec !== null && spec !== void 0 ? spec : {};
                allKernelSpecs[name] = {
                    name,
                    spec,
                    resources,
                };
            });
            const res = {
                default: specs.default,
                kernelspecs: allKernelSpecs,
            };
            return new Response(JSON.stringify(res));
        });
    },
};
/**
 * A plugin providing the routes for the nbconvert service.
 * TODO: provide the service in a separate plugin?
 */
const nbconvertRoutesPlugin = {
    id: '@datalayer/jupyterlite-server-extension:nbconvert-routes',
    autoStart: true,
    activate: (app) => {
        app.router.get('/api/nbconvert', async (req) => {
            return new Response(JSON.stringify({}));
        });
    },
};
/**
 * The sessions service plugin.
 */
const sessionsPlugin = {
    id: '@datalayer/jupyterlite-server-extension:sessions',
    autoStart: true,
    provides: ISessions,
    requires: [tokens.IKernels],
    activate: (app, kernels) => {
        return new Sessions({ kernels });
    },
};
/**
 * A plugin providing the routes for the session service.
 */
const sessionsRoutesPlugin = {
    id: '@datalayer/jupyterlite-server-extension:sessions-routes',
    autoStart: true,
    requires: [ISessions],
    activate: (app, sessions) => {
        // GET /api/sessions/{session} - Get session
        app.router.get('/api/sessions/(.+)', async (req, id) => {
            const session = await sessions.get(id);
            return new Response(JSON.stringify(session), { status: 200 });
        });
        // GET /api/sessions - List available sessions
        app.router.get('/api/sessions', async (req) => {
            const list = await sessions.list();
            return new Response(JSON.stringify(list), { status: 200 });
        });
        // PATCH /api/sessions/{session} - This can be used to rename a session
        app.router.patch('/api/sessions(.*)', async (req, id) => {
            const options = req.body;
            const session = await sessions.patch(options);
            return new Response(JSON.stringify(session), { status: 200 });
        });
        // DELETE /api/sessions/{session} - Delete a session
        app.router.delete('/api/sessions/(.+)', async (req, id) => {
            await sessions.shutdown(id);
            return new Response(null, { status: 204 });
        });
        // POST /api/sessions - Create a new session or return an existing session if a session of the same name already exists
        app.router.post('/api/sessions', async (req) => {
            const options = req.body;
            const session = await sessions.startNew(options);
            return new Response(JSON.stringify(session), { status: 201 });
        });
    },
};
/**
 * The settings service plugin.
 */
const settingsPlugin = {
    id: '@datalayer/jupyterlite-server-extension:settings',
    autoStart: true,
    requires: [],
    provides: ISettings,
    activate: (app) => {
        const storageName = lib.PageConfig.getOption('settingsStorageName');
        const storageDrivers = JSON.parse(lib.PageConfig.getOption('settingsStorageDrivers') || 'null');
        const settings = new Settings({ storageName, storageDrivers, localforage: (localforage_default()) });
        app.started.then(() => settings.initialize().catch(console.warn));
        return settings;
    },
};
/**
 * A plugin providing the routes for the settings service.
 */
const settingsRoutesPlugin = {
    id: '@datalayer/jupyterlite-server-extension:settings-routes',
    autoStart: true,
    requires: [ISettings],
    activate: (app, settings) => {
        // TODO: improve the regex
        // const pluginPattern = new RegExp(/(?:@([^/]+?)[/])?([^/]+?):(\w+)/);
        const pluginPattern = '/api/settings/((?:@([^/]+?)[/])?([^/]+?):([^:]+))$';
        app.router.get(pluginPattern, async (req, pluginId) => {
            const setting = await settings.get(pluginId);
            return new Response(JSON.stringify(setting));
        });
        app.router.put(pluginPattern, async (req, pluginId) => {
            const body = req.body;
            const { raw } = body;
            await settings.save(pluginId, raw);
            return new Response(null, { status: 204 });
        });
        app.router.get('/api/settings', async (req) => {
            const plugins = await settings.getAll();
            return new Response(JSON.stringify(plugins));
        });
    },
};
const plugins = [
    kernelsPlugin,
    kernelsRoutesPlugin,
    kernelSpecPlugin,
    kernelSpecRoutesPlugin,
    nbconvertRoutesPlugin,
    serviceWorkerPlugin,
    sessionsPlugin,
    sessionsRoutesPlugin,
    settingsPlugin,
    settingsRoutesPlugin,
];
/* harmony default export */ const jupyterlite_server_extension_lib = (plugins);


/***/ }),

/***/ 25474:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

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

/***/ 91363:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
__exportStar(__webpack_require__(25474), exports);
__exportStar(__webpack_require__(67724), exports);
__exportStar(__webpack_require__(25157), exports);
__exportStar(__webpack_require__(49087), exports);
__exportStar(__webpack_require__(45316), exports);
__exportStar(__webpack_require__(84087), exports);
__exportStar(__webpack_require__(17192), exports);
__exportStar(__webpack_require__(54486), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 67724:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=interfaces.js.map

/***/ }),

/***/ 25157:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

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

/***/ 49087:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PageConfig = void 0;
const coreutils_1 = __webpack_require__(66201);
const minimist_1 = __importDefault(__webpack_require__(96562));
const url_1 = __webpack_require__(54486);
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

/***/ 45316:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

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

/***/ 84087:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

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

/***/ 17192:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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

/***/ 54486:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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

/***/ 73054:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IServiceWorkerRegistrationWrapper: () => (/* binding */ IServiceWorkerRegistrationWrapper)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(66201);

/**
 * The token for the ServiceWorker.
 */
const IServiceWorkerRegistrationWrapper = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@datalayer/jupyterlite-server-extension:IServiceWorkerRegistrationWrapper');


/***/ }),

/***/ 98992:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

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

/***/ 70969:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
__exportStar(__webpack_require__(98992), exports);
__exportStar(__webpack_require__(47516), exports);
__exportStar(__webpack_require__(22191), exports);
__exportStar(__webpack_require__(57279), exports);
__exportStar(__webpack_require__(6882), exports);
__exportStar(__webpack_require__(27009), exports);
__exportStar(__webpack_require__(97724), exports);
__exportStar(__webpack_require__(31285), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 47516:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=interfaces.js.map

/***/ }),

/***/ 22191:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

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

/***/ 57279:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PageConfig = void 0;
const coreutils_1 = __webpack_require__(66201);
const minimist_1 = __importDefault(__webpack_require__(96562));
const url_1 = __webpack_require__(31285);
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

/***/ 6882:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

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

/***/ 27009:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

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

/***/ 97724:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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

/***/ 31285:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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

/***/ 36598:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

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

/***/ 40412:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
__exportStar(__webpack_require__(36598), exports);
__exportStar(__webpack_require__(19148), exports);
__exportStar(__webpack_require__(73885), exports);
__exportStar(__webpack_require__(31992), exports);
__exportStar(__webpack_require__(55691), exports);
__exportStar(__webpack_require__(49558), exports);
__exportStar(__webpack_require__(63086), exports);
__exportStar(__webpack_require__(78694), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 19148:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=interfaces.js.map

/***/ }),

/***/ 73885:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

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

/***/ 31992:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PageConfig = void 0;
const coreutils_1 = __webpack_require__(66201);
const minimist_1 = __importDefault(__webpack_require__(96562));
const url_1 = __webpack_require__(78694);
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

/***/ 55691:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

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

/***/ 49558:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

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

/***/ 63086:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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

/***/ 78694:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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

/***/ 69483:
/***/ ((module) => {

/*!
    localForage -- Offline Storage, Improved
    Version 1.10.0
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/
(function(f){if(true){module.exports=f()}else { var g; }})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=undefined;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw (f.code="MODULE_NOT_FOUND", f)}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=undefined;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
'use strict';
var Mutation = global.MutationObserver || global.WebKitMutationObserver;

var scheduleDrain;

{
  if (Mutation) {
    var called = 0;
    var observer = new Mutation(nextTick);
    var element = global.document.createTextNode('');
    observer.observe(element, {
      characterData: true
    });
    scheduleDrain = function () {
      element.data = (called = ++called % 2);
    };
  } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
    var channel = new global.MessageChannel();
    channel.port1.onmessage = nextTick;
    scheduleDrain = function () {
      channel.port2.postMessage(0);
    };
  } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
    scheduleDrain = function () {

      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
      var scriptEl = global.document.createElement('script');
      scriptEl.onreadystatechange = function () {
        nextTick();

        scriptEl.onreadystatechange = null;
        scriptEl.parentNode.removeChild(scriptEl);
        scriptEl = null;
      };
      global.document.documentElement.appendChild(scriptEl);
    };
  } else {
    scheduleDrain = function () {
      setTimeout(nextTick, 0);
    };
  }
}

var draining;
var queue = [];
//named nextTick for less confusing stack traces
function nextTick() {
  draining = true;
  var i, oldQueue;
  var len = queue.length;
  while (len) {
    oldQueue = queue;
    queue = [];
    i = -1;
    while (++i < len) {
      oldQueue[i]();
    }
    len = queue.length;
  }
  draining = false;
}

module.exports = immediate;
function immediate(task) {
  if (queue.push(task) === 1 && !draining) {
    scheduleDrain();
  }
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(_dereq_,module,exports){
'use strict';
var immediate = _dereq_(1);

/* istanbul ignore next */
function INTERNAL() {}

var handlers = {};

var REJECTED = ['REJECTED'];
var FULFILLED = ['FULFILLED'];
var PENDING = ['PENDING'];

module.exports = Promise;

function Promise(resolver) {
  if (typeof resolver !== 'function') {
    throw new TypeError('resolver must be a function');
  }
  this.state = PENDING;
  this.queue = [];
  this.outcome = void 0;
  if (resolver !== INTERNAL) {
    safelyResolveThenable(this, resolver);
  }
}

Promise.prototype["catch"] = function (onRejected) {
  return this.then(null, onRejected);
};
Promise.prototype.then = function (onFulfilled, onRejected) {
  if (typeof onFulfilled !== 'function' && this.state === FULFILLED ||
    typeof onRejected !== 'function' && this.state === REJECTED) {
    return this;
  }
  var promise = new this.constructor(INTERNAL);
  if (this.state !== PENDING) {
    var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
    unwrap(promise, resolver, this.outcome);
  } else {
    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
  }

  return promise;
};
function QueueItem(promise, onFulfilled, onRejected) {
  this.promise = promise;
  if (typeof onFulfilled === 'function') {
    this.onFulfilled = onFulfilled;
    this.callFulfilled = this.otherCallFulfilled;
  }
  if (typeof onRejected === 'function') {
    this.onRejected = onRejected;
    this.callRejected = this.otherCallRejected;
  }
}
QueueItem.prototype.callFulfilled = function (value) {
  handlers.resolve(this.promise, value);
};
QueueItem.prototype.otherCallFulfilled = function (value) {
  unwrap(this.promise, this.onFulfilled, value);
};
QueueItem.prototype.callRejected = function (value) {
  handlers.reject(this.promise, value);
};
QueueItem.prototype.otherCallRejected = function (value) {
  unwrap(this.promise, this.onRejected, value);
};

function unwrap(promise, func, value) {
  immediate(function () {
    var returnValue;
    try {
      returnValue = func(value);
    } catch (e) {
      return handlers.reject(promise, e);
    }
    if (returnValue === promise) {
      handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
    } else {
      handlers.resolve(promise, returnValue);
    }
  });
}

handlers.resolve = function (self, value) {
  var result = tryCatch(getThen, value);
  if (result.status === 'error') {
    return handlers.reject(self, result.value);
  }
  var thenable = result.value;

  if (thenable) {
    safelyResolveThenable(self, thenable);
  } else {
    self.state = FULFILLED;
    self.outcome = value;
    var i = -1;
    var len = self.queue.length;
    while (++i < len) {
      self.queue[i].callFulfilled(value);
    }
  }
  return self;
};
handlers.reject = function (self, error) {
  self.state = REJECTED;
  self.outcome = error;
  var i = -1;
  var len = self.queue.length;
  while (++i < len) {
    self.queue[i].callRejected(error);
  }
  return self;
};

function getThen(obj) {
  // Make sure we only access the accessor once as required by the spec
  var then = obj && obj.then;
  if (obj && (typeof obj === 'object' || typeof obj === 'function') && typeof then === 'function') {
    return function appyThen() {
      then.apply(obj, arguments);
    };
  }
}

function safelyResolveThenable(self, thenable) {
  // Either fulfill, reject or reject with error
  var called = false;
  function onError(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.reject(self, value);
  }

  function onSuccess(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.resolve(self, value);
  }

  function tryToUnwrap() {
    thenable(onSuccess, onError);
  }

  var result = tryCatch(tryToUnwrap);
  if (result.status === 'error') {
    onError(result.value);
  }
}

function tryCatch(func, value) {
  var out = {};
  try {
    out.value = func(value);
    out.status = 'success';
  } catch (e) {
    out.status = 'error';
    out.value = e;
  }
  return out;
}

Promise.resolve = resolve;
function resolve(value) {
  if (value instanceof this) {
    return value;
  }
  return handlers.resolve(new this(INTERNAL), value);
}

Promise.reject = reject;
function reject(reason) {
  var promise = new this(INTERNAL);
  return handlers.reject(promise, reason);
}

Promise.all = all;
function all(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var values = new Array(len);
  var resolved = 0;
  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    allResolver(iterable[i], i);
  }
  return promise;
  function allResolver(value, i) {
    self.resolve(value).then(resolveFromAll, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
    function resolveFromAll(outValue) {
      values[i] = outValue;
      if (++resolved === len && !called) {
        called = true;
        handlers.resolve(promise, values);
      }
    }
  }
}

Promise.race = race;
function race(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    resolver(iterable[i]);
  }
  return promise;
  function resolver(value) {
    self.resolve(value).then(function (response) {
      if (!called) {
        called = true;
        handlers.resolve(promise, response);
      }
    }, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
  }
}

},{"1":1}],3:[function(_dereq_,module,exports){
(function (global){
'use strict';
if (typeof global.Promise !== 'function') {
  global.Promise = _dereq_(2);
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"2":2}],4:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getIDB() {
    /* global indexedDB,webkitIndexedDB,mozIndexedDB,OIndexedDB,msIndexedDB */
    try {
        if (typeof indexedDB !== 'undefined') {
            return indexedDB;
        }
        if (typeof webkitIndexedDB !== 'undefined') {
            return webkitIndexedDB;
        }
        if (typeof mozIndexedDB !== 'undefined') {
            return mozIndexedDB;
        }
        if (typeof OIndexedDB !== 'undefined') {
            return OIndexedDB;
        }
        if (typeof msIndexedDB !== 'undefined') {
            return msIndexedDB;
        }
    } catch (e) {
        return;
    }
}

var idb = getIDB();

function isIndexedDBValid() {
    try {
        // Initialize IndexedDB; fall back to vendor-prefixed versions
        // if needed.
        if (!idb || !idb.open) {
            return false;
        }
        // We mimic PouchDB here;
        //
        // We test for openDatabase because IE Mobile identifies itself
        // as Safari. Oh the lulz...
        var isSafari = typeof openDatabase !== 'undefined' && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);

        var hasFetch = typeof fetch === 'function' && fetch.toString().indexOf('[native code') !== -1;

        // Safari <10.1 does not meet our requirements for IDB support
        // (see: https://github.com/pouchdb/pouchdb/issues/5572).
        // Safari 10.1 shipped with fetch, we can use that to detect it.
        // Note: this creates issues with `window.fetch` polyfills and
        // overrides; see:
        // https://github.com/localForage/localForage/issues/856
        return (!isSafari || hasFetch) && typeof indexedDB !== 'undefined' &&
        // some outdated implementations of IDB that appear on Samsung
        // and HTC Android devices <4.4 are missing IDBKeyRange
        // See: https://github.com/mozilla/localForage/issues/128
        // See: https://github.com/mozilla/localForage/issues/272
        typeof IDBKeyRange !== 'undefined';
    } catch (e) {
        return false;
    }
}

// Abstracts constructing a Blob object, so it also works in older
// browsers that don't support the native Blob constructor. (i.e.
// old QtWebKit versions, at least).
// Abstracts constructing a Blob object, so it also works in older
// browsers that don't support the native Blob constructor. (i.e.
// old QtWebKit versions, at least).
function createBlob(parts, properties) {
    /* global BlobBuilder,MSBlobBuilder,MozBlobBuilder,WebKitBlobBuilder */
    parts = parts || [];
    properties = properties || {};
    try {
        return new Blob(parts, properties);
    } catch (e) {
        if (e.name !== 'TypeError') {
            throw e;
        }
        var Builder = typeof BlobBuilder !== 'undefined' ? BlobBuilder : typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder : typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder : WebKitBlobBuilder;
        var builder = new Builder();
        for (var i = 0; i < parts.length; i += 1) {
            builder.append(parts[i]);
        }
        return builder.getBlob(properties.type);
    }
}

// This is CommonJS because lie is an external dependency, so Rollup
// can just ignore it.
if (typeof Promise === 'undefined') {
    // In the "nopromises" build this will just throw if you don't have
    // a global promise object, but it would throw anyway later.
    _dereq_(3);
}
var Promise$1 = Promise;

function executeCallback(promise, callback) {
    if (callback) {
        promise.then(function (result) {
            callback(null, result);
        }, function (error) {
            callback(error);
        });
    }
}

function executeTwoCallbacks(promise, callback, errorCallback) {
    if (typeof callback === 'function') {
        promise.then(callback);
    }

    if (typeof errorCallback === 'function') {
        promise["catch"](errorCallback);
    }
}

function normalizeKey(key) {
    // Cast the key to a string, as that's all we can set as a key.
    if (typeof key !== 'string') {
        console.warn(key + ' used as a key, but it is not a string.');
        key = String(key);
    }

    return key;
}

function getCallback() {
    if (arguments.length && typeof arguments[arguments.length - 1] === 'function') {
        return arguments[arguments.length - 1];
    }
}

// Some code originally from async_storage.js in
// [Gaia](https://github.com/mozilla-b2g/gaia).

var DETECT_BLOB_SUPPORT_STORE = 'local-forage-detect-blob-support';
var supportsBlobs = void 0;
var dbContexts = {};
var toString = Object.prototype.toString;

// Transaction Modes
var READ_ONLY = 'readonly';
var READ_WRITE = 'readwrite';

// Transform a binary string to an array buffer, because otherwise
// weird stuff happens when you try to work with the binary string directly.
// It is known.
// From http://stackoverflow.com/questions/14967647/ (continues on next line)
// encode-decode-image-with-base64-breaks-image (2013-04-21)
function _binStringToArrayBuffer(bin) {
    var length = bin.length;
    var buf = new ArrayBuffer(length);
    var arr = new Uint8Array(buf);
    for (var i = 0; i < length; i++) {
        arr[i] = bin.charCodeAt(i);
    }
    return buf;
}

//
// Blobs are not supported in all versions of IndexedDB, notably
// Chrome <37 and Android <5. In those versions, storing a blob will throw.
//
// Various other blob bugs exist in Chrome v37-42 (inclusive).
// Detecting them is expensive and confusing to users, and Chrome 37-42
// is at very low usage worldwide, so we do a hacky userAgent check instead.
//
// content-type bug: https://code.google.com/p/chromium/issues/detail?id=408120
// 404 bug: https://code.google.com/p/chromium/issues/detail?id=447916
// FileReader bug: https://code.google.com/p/chromium/issues/detail?id=447836
//
// Code borrowed from PouchDB. See:
// https://github.com/pouchdb/pouchdb/blob/master/packages/node_modules/pouchdb-adapter-idb/src/blobSupport.js
//
function _checkBlobSupportWithoutCaching(idb) {
    return new Promise$1(function (resolve) {
        var txn = idb.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
        var blob = createBlob(['']);
        txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, 'key');

        txn.onabort = function (e) {
            // If the transaction aborts now its due to not being able to
            // write to the database, likely due to the disk being full
            e.preventDefault();
            e.stopPropagation();
            resolve(false);
        };

        txn.oncomplete = function () {
            var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
            var matchedEdge = navigator.userAgent.match(/Edge\//);
            // MS Edge pretends to be Chrome 42:
            // https://msdn.microsoft.com/en-us/library/hh869301%28v=vs.85%29.aspx
            resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
        };
    })["catch"](function () {
        return false; // error, so assume unsupported
    });
}

function _checkBlobSupport(idb) {
    if (typeof supportsBlobs === 'boolean') {
        return Promise$1.resolve(supportsBlobs);
    }
    return _checkBlobSupportWithoutCaching(idb).then(function (value) {
        supportsBlobs = value;
        return supportsBlobs;
    });
}

function _deferReadiness(dbInfo) {
    var dbContext = dbContexts[dbInfo.name];

    // Create a deferred object representing the current database operation.
    var deferredOperation = {};

    deferredOperation.promise = new Promise$1(function (resolve, reject) {
        deferredOperation.resolve = resolve;
        deferredOperation.reject = reject;
    });

    // Enqueue the deferred operation.
    dbContext.deferredOperations.push(deferredOperation);

    // Chain its promise to the database readiness.
    if (!dbContext.dbReady) {
        dbContext.dbReady = deferredOperation.promise;
    } else {
        dbContext.dbReady = dbContext.dbReady.then(function () {
            return deferredOperation.promise;
        });
    }
}

function _advanceReadiness(dbInfo) {
    var dbContext = dbContexts[dbInfo.name];

    // Dequeue a deferred operation.
    var deferredOperation = dbContext.deferredOperations.pop();

    // Resolve its promise (which is part of the database readiness
    // chain of promises).
    if (deferredOperation) {
        deferredOperation.resolve();
        return deferredOperation.promise;
    }
}

function _rejectReadiness(dbInfo, err) {
    var dbContext = dbContexts[dbInfo.name];

    // Dequeue a deferred operation.
    var deferredOperation = dbContext.deferredOperations.pop();

    // Reject its promise (which is part of the database readiness
    // chain of promises).
    if (deferredOperation) {
        deferredOperation.reject(err);
        return deferredOperation.promise;
    }
}

function _getConnection(dbInfo, upgradeNeeded) {
    return new Promise$1(function (resolve, reject) {
        dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();

        if (dbInfo.db) {
            if (upgradeNeeded) {
                _deferReadiness(dbInfo);
                dbInfo.db.close();
            } else {
                return resolve(dbInfo.db);
            }
        }

        var dbArgs = [dbInfo.name];

        if (upgradeNeeded) {
            dbArgs.push(dbInfo.version);
        }

        var openreq = idb.open.apply(idb, dbArgs);

        if (upgradeNeeded) {
            openreq.onupgradeneeded = function (e) {
                var db = openreq.result;
                try {
                    db.createObjectStore(dbInfo.storeName);
                    if (e.oldVersion <= 1) {
                        // Added when support for blob shims was added
                        db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                    }
                } catch (ex) {
                    if (ex.name === 'ConstraintError') {
                        console.warn('The database "' + dbInfo.name + '"' + ' has been upgraded from version ' + e.oldVersion + ' to version ' + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                    } else {
                        throw ex;
                    }
                }
            };
        }

        openreq.onerror = function (e) {
            e.preventDefault();
            reject(openreq.error);
        };

        openreq.onsuccess = function () {
            var db = openreq.result;
            db.onversionchange = function (e) {
                // Triggered when the database is modified (e.g. adding an objectStore) or
                // deleted (even when initiated by other sessions in different tabs).
                // Closing the connection here prevents those operations from being blocked.
                // If the database is accessed again later by this instance, the connection
                // will be reopened or the database recreated as needed.
                e.target.close();
            };
            resolve(db);
            _advanceReadiness(dbInfo);
        };
    });
}

function _getOriginalConnection(dbInfo) {
    return _getConnection(dbInfo, false);
}

function _getUpgradedConnection(dbInfo) {
    return _getConnection(dbInfo, true);
}

function _isUpgradeNeeded(dbInfo, defaultVersion) {
    if (!dbInfo.db) {
        return true;
    }

    var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
    var isDowngrade = dbInfo.version < dbInfo.db.version;
    var isUpgrade = dbInfo.version > dbInfo.db.version;

    if (isDowngrade) {
        // If the version is not the default one
        // then warn for impossible downgrade.
        if (dbInfo.version !== defaultVersion) {
            console.warn('The database "' + dbInfo.name + '"' + " can't be downgraded from version " + dbInfo.db.version + ' to version ' + dbInfo.version + '.');
        }
        // Align the versions to prevent errors.
        dbInfo.version = dbInfo.db.version;
    }

    if (isUpgrade || isNewStore) {
        // If the store is new then increment the version (if needed).
        // This will trigger an "upgradeneeded" event which is required
        // for creating a store.
        if (isNewStore) {
            var incVersion = dbInfo.db.version + 1;
            if (incVersion > dbInfo.version) {
                dbInfo.version = incVersion;
            }
        }

        return true;
    }

    return false;
}

// encode a blob for indexeddb engines that don't support blobs
function _encodeBlob(blob) {
    return new Promise$1(function (resolve, reject) {
        var reader = new FileReader();
        reader.onerror = reject;
        reader.onloadend = function (e) {
            var base64 = btoa(e.target.result || '');
            resolve({
                __local_forage_encoded_blob: true,
                data: base64,
                type: blob.type
            });
        };
        reader.readAsBinaryString(blob);
    });
}

// decode an encoded blob
function _decodeBlob(encodedBlob) {
    var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));
    return createBlob([arrayBuff], { type: encodedBlob.type });
}

// is this one of our fancy encoded blobs?
function _isEncodedBlob(value) {
    return value && value.__local_forage_encoded_blob;
}

// Specialize the default `ready()` function by making it dependent
// on the current database operations. Thus, the driver will be actually
// ready when it's been initialized (default) *and* there are no pending
// operations on the database (initiated by some other instances).
function _fullyReady(callback) {
    var self = this;

    var promise = self._initReady().then(function () {
        var dbContext = dbContexts[self._dbInfo.name];

        if (dbContext && dbContext.dbReady) {
            return dbContext.dbReady;
        }
    });

    executeTwoCallbacks(promise, callback, callback);
    return promise;
}

// Try to establish a new db connection to replace the
// current one which is broken (i.e. experiencing
// InvalidStateError while creating a transaction).
function _tryReconnect(dbInfo) {
    _deferReadiness(dbInfo);

    var dbContext = dbContexts[dbInfo.name];
    var forages = dbContext.forages;

    for (var i = 0; i < forages.length; i++) {
        var forage = forages[i];
        if (forage._dbInfo.db) {
            forage._dbInfo.db.close();
            forage._dbInfo.db = null;
        }
    }
    dbInfo.db = null;

    return _getOriginalConnection(dbInfo).then(function (db) {
        dbInfo.db = db;
        if (_isUpgradeNeeded(dbInfo)) {
            // Reopen the database for upgrading.
            return _getUpgradedConnection(dbInfo);
        }
        return db;
    }).then(function (db) {
        // store the latest db reference
        // in case the db was upgraded
        dbInfo.db = dbContext.db = db;
        for (var i = 0; i < forages.length; i++) {
            forages[i]._dbInfo.db = db;
        }
    })["catch"](function (err) {
        _rejectReadiness(dbInfo, err);
        throw err;
    });
}

// FF doesn't like Promises (micro-tasks) and IDDB store operations,
// so we have to do it with callbacks
function createTransaction(dbInfo, mode, callback, retries) {
    if (retries === undefined) {
        retries = 1;
    }

    try {
        var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
        callback(null, tx);
    } catch (err) {
        if (retries > 0 && (!dbInfo.db || err.name === 'InvalidStateError' || err.name === 'NotFoundError')) {
            return Promise$1.resolve().then(function () {
                if (!dbInfo.db || err.name === 'NotFoundError' && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {
                    // increase the db version, to create the new ObjectStore
                    if (dbInfo.db) {
                        dbInfo.version = dbInfo.db.version + 1;
                    }
                    // Reopen the database for upgrading.
                    return _getUpgradedConnection(dbInfo);
                }
            }).then(function () {
                return _tryReconnect(dbInfo).then(function () {
                    createTransaction(dbInfo, mode, callback, retries - 1);
                });
            })["catch"](callback);
        }

        callback(err);
    }
}

function createDbContext() {
    return {
        // Running localForages sharing a database.
        forages: [],
        // Shared database.
        db: null,
        // Database readiness (promise).
        dbReady: null,
        // Deferred operations on the database.
        deferredOperations: []
    };
}

// Open the IndexedDB database (automatically creates one if one didn't
// previously exist), using any options set in the config.
function _initStorage(options) {
    var self = this;
    var dbInfo = {
        db: null
    };

    if (options) {
        for (var i in options) {
            dbInfo[i] = options[i];
        }
    }

    // Get the current context of the database;
    var dbContext = dbContexts[dbInfo.name];

    // ...or create a new context.
    if (!dbContext) {
        dbContext = createDbContext();
        // Register the new context in the global container.
        dbContexts[dbInfo.name] = dbContext;
    }

    // Register itself as a running localForage in the current context.
    dbContext.forages.push(self);

    // Replace the default `ready()` function with the specialized one.
    if (!self._initReady) {
        self._initReady = self.ready;
        self.ready = _fullyReady;
    }

    // Create an array of initialization states of the related localForages.
    var initPromises = [];

    function ignoreErrors() {
        // Don't handle errors here,
        // just makes sure related localForages aren't pending.
        return Promise$1.resolve();
    }

    for (var j = 0; j < dbContext.forages.length; j++) {
        var forage = dbContext.forages[j];
        if (forage !== self) {
            // Don't wait for itself...
            initPromises.push(forage._initReady()["catch"](ignoreErrors));
        }
    }

    // Take a snapshot of the related localForages.
    var forages = dbContext.forages.slice(0);

    // Initialize the connection process only when
    // all the related localForages aren't pending.
    return Promise$1.all(initPromises).then(function () {
        dbInfo.db = dbContext.db;
        // Get the connection or open a new one without upgrade.
        return _getOriginalConnection(dbInfo);
    }).then(function (db) {
        dbInfo.db = db;
        if (_isUpgradeNeeded(dbInfo, self._defaultConfig.version)) {
            // Reopen the database for upgrading.
            return _getUpgradedConnection(dbInfo);
        }
        return db;
    }).then(function (db) {
        dbInfo.db = dbContext.db = db;
        self._dbInfo = dbInfo;
        // Share the final connection amongst related localForages.
        for (var k = 0; k < forages.length; k++) {
            var forage = forages[k];
            if (forage !== self) {
                // Self is already up-to-date.
                forage._dbInfo.db = dbInfo.db;
                forage._dbInfo.version = dbInfo.version;
            }
        }
    });
}

function getItem(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.get(key);

                    req.onsuccess = function () {
                        var value = req.result;
                        if (value === undefined) {
                            value = null;
                        }
                        if (_isEncodedBlob(value)) {
                            value = _decodeBlob(value);
                        }
                        resolve(value);
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Iterate over all items stored in database.
function iterate(iterator, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.openCursor();
                    var iterationNumber = 1;

                    req.onsuccess = function () {
                        var cursor = req.result;

                        if (cursor) {
                            var value = cursor.value;
                            if (_isEncodedBlob(value)) {
                                value = _decodeBlob(value);
                            }
                            var result = iterator(value, cursor.key, iterationNumber++);

                            // when the iterator callback returns any
                            // (non-`undefined`) value, then we stop
                            // the iteration immediately
                            if (result !== void 0) {
                                resolve(result);
                            } else {
                                cursor["continue"]();
                            }
                        } else {
                            resolve();
                        }
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);

    return promise;
}

function setItem(key, value, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        var dbInfo;
        self.ready().then(function () {
            dbInfo = self._dbInfo;
            if (toString.call(value) === '[object Blob]') {
                return _checkBlobSupport(dbInfo.db).then(function (blobSupport) {
                    if (blobSupport) {
                        return value;
                    }
                    return _encodeBlob(value);
                });
            }
            return value;
        }).then(function (value) {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);

                    // The reason we don't _save_ null is because IE 10 does
                    // not support saving the `null` type in IndexedDB. How
                    // ironic, given the bug below!
                    // See: https://github.com/mozilla/localForage/issues/161
                    if (value === null) {
                        value = undefined;
                    }

                    var req = store.put(value, key);

                    transaction.oncomplete = function () {
                        // Cast to undefined so the value passed to
                        // callback/promise is the same as what one would get out
                        // of `getItem()` later. This leads to some weirdness
                        // (setItem('foo', undefined) will return `null`), but
                        // it's not my fault localStorage is our baseline and that
                        // it's weird.
                        if (value === undefined) {
                            value = null;
                        }

                        resolve(value);
                    };
                    transaction.onabort = transaction.onerror = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function removeItem(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    // We use a Grunt task to make this safe for IE and some
                    // versions of Android (including those used by Cordova).
                    // Normally IE won't like `.delete()` and will insist on
                    // using `['delete']()`, but we have a build step that
                    // fixes this for us now.
                    var req = store["delete"](key);
                    transaction.oncomplete = function () {
                        resolve();
                    };

                    transaction.onerror = function () {
                        reject(req.error);
                    };

                    // The request will be also be aborted if we've exceeded our storage
                    // space.
                    transaction.onabort = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function clear(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.clear();

                    transaction.oncomplete = function () {
                        resolve();
                    };

                    transaction.onabort = transaction.onerror = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function length(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.count();

                    req.onsuccess = function () {
                        resolve(req.result);
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function key(n, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        if (n < 0) {
            resolve(null);

            return;
        }

        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var advanced = false;
                    var req = store.openKeyCursor();

                    req.onsuccess = function () {
                        var cursor = req.result;
                        if (!cursor) {
                            // this means there weren't enough keys
                            resolve(null);

                            return;
                        }

                        if (n === 0) {
                            // We have the first key, return it if that's what they
                            // wanted.
                            resolve(cursor.key);
                        } else {
                            if (!advanced) {
                                // Otherwise, ask the cursor to skip ahead n
                                // records.
                                advanced = true;
                                cursor.advance(n);
                            } else {
                                // When we get here, we've got the nth key.
                                resolve(cursor.key);
                            }
                        }
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function keys(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.openKeyCursor();
                    var keys = [];

                    req.onsuccess = function () {
                        var cursor = req.result;

                        if (!cursor) {
                            resolve(keys);
                            return;
                        }

                        keys.push(cursor.key);
                        cursor["continue"]();
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function dropInstance(options, callback) {
    callback = getCallback.apply(this, arguments);

    var currentConfig = this.config();
    options = typeof options !== 'function' && options || {};
    if (!options.name) {
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }

    var self = this;
    var promise;
    if (!options.name) {
        promise = Promise$1.reject('Invalid arguments');
    } else {
        var isCurrentDb = options.name === currentConfig.name && self._dbInfo.db;

        var dbPromise = isCurrentDb ? Promise$1.resolve(self._dbInfo.db) : _getOriginalConnection(options).then(function (db) {
            var dbContext = dbContexts[options.name];
            var forages = dbContext.forages;
            dbContext.db = db;
            for (var i = 0; i < forages.length; i++) {
                forages[i]._dbInfo.db = db;
            }
            return db;
        });

        if (!options.storeName) {
            promise = dbPromise.then(function (db) {
                _deferReadiness(options);

                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;

                db.close();
                for (var i = 0; i < forages.length; i++) {
                    var forage = forages[i];
                    forage._dbInfo.db = null;
                }

                var dropDBPromise = new Promise$1(function (resolve, reject) {
                    var req = idb.deleteDatabase(options.name);

                    req.onerror = function () {
                        var db = req.result;
                        if (db) {
                            db.close();
                        }
                        reject(req.error);
                    };

                    req.onblocked = function () {
                        // Closing all open connections in onversionchange handler should prevent this situation, but if
                        // we do get here, it just means the request remains pending - eventually it will succeed or error
                        console.warn('dropInstance blocked for database "' + options.name + '" until all open connections are closed');
                    };

                    req.onsuccess = function () {
                        var db = req.result;
                        if (db) {
                            db.close();
                        }
                        resolve(db);
                    };
                });

                return dropDBPromise.then(function (db) {
                    dbContext.db = db;
                    for (var i = 0; i < forages.length; i++) {
                        var _forage = forages[i];
                        _advanceReadiness(_forage._dbInfo);
                    }
                })["catch"](function (err) {
                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                    throw err;
                });
            });
        } else {
            promise = dbPromise.then(function (db) {
                if (!db.objectStoreNames.contains(options.storeName)) {
                    return;
                }

                var newVersion = db.version + 1;

                _deferReadiness(options);

                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;

                db.close();
                for (var i = 0; i < forages.length; i++) {
                    var forage = forages[i];
                    forage._dbInfo.db = null;
                    forage._dbInfo.version = newVersion;
                }

                var dropObjectPromise = new Promise$1(function (resolve, reject) {
                    var req = idb.open(options.name, newVersion);

                    req.onerror = function (err) {
                        var db = req.result;
                        db.close();
                        reject(err);
                    };

                    req.onupgradeneeded = function () {
                        var db = req.result;
                        db.deleteObjectStore(options.storeName);
                    };

                    req.onsuccess = function () {
                        var db = req.result;
                        db.close();
                        resolve(db);
                    };
                });

                return dropObjectPromise.then(function (db) {
                    dbContext.db = db;
                    for (var j = 0; j < forages.length; j++) {
                        var _forage2 = forages[j];
                        _forage2._dbInfo.db = db;
                        _advanceReadiness(_forage2._dbInfo);
                    }
                })["catch"](function (err) {
                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                    throw err;
                });
            });
        }
    }

    executeCallback(promise, callback);
    return promise;
}

var asyncStorage = {
    _driver: 'asyncStorage',
    _initStorage: _initStorage,
    _support: isIndexedDBValid(),
    iterate: iterate,
    getItem: getItem,
    setItem: setItem,
    removeItem: removeItem,
    clear: clear,
    length: length,
    key: key,
    keys: keys,
    dropInstance: dropInstance
};

function isWebSQLValid() {
    return typeof openDatabase === 'function';
}

// Sadly, the best way to save binary data in WebSQL/localStorage is serializing
// it to Base64, so this is how we store it to prevent very strange errors with less
// verbose ways of binary <-> string data storage.
var BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

var BLOB_TYPE_PREFIX = '~~local_forage_type~';
var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;

var SERIALIZED_MARKER = '__lfsc__:';
var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;

// OMG the serializations!
var TYPE_ARRAYBUFFER = 'arbf';
var TYPE_BLOB = 'blob';
var TYPE_INT8ARRAY = 'si08';
var TYPE_UINT8ARRAY = 'ui08';
var TYPE_UINT8CLAMPEDARRAY = 'uic8';
var TYPE_INT16ARRAY = 'si16';
var TYPE_INT32ARRAY = 'si32';
var TYPE_UINT16ARRAY = 'ur16';
var TYPE_UINT32ARRAY = 'ui32';
var TYPE_FLOAT32ARRAY = 'fl32';
var TYPE_FLOAT64ARRAY = 'fl64';
var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;

var toString$1 = Object.prototype.toString;

function stringToBuffer(serializedString) {
    // Fill the string into a ArrayBuffer.
    var bufferLength = serializedString.length * 0.75;
    var len = serializedString.length;
    var i;
    var p = 0;
    var encoded1, encoded2, encoded3, encoded4;

    if (serializedString[serializedString.length - 1] === '=') {
        bufferLength--;
        if (serializedString[serializedString.length - 2] === '=') {
            bufferLength--;
        }
    }

    var buffer = new ArrayBuffer(bufferLength);
    var bytes = new Uint8Array(buffer);

    for (i = 0; i < len; i += 4) {
        encoded1 = BASE_CHARS.indexOf(serializedString[i]);
        encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
        encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
        encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);

        /*jslint bitwise: true */
        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }
    return buffer;
}

// Converts a buffer to a string to store, serialized, in the backend
// storage library.
function bufferToString(buffer) {
    // base64-arraybuffer
    var bytes = new Uint8Array(buffer);
    var base64String = '';
    var i;

    for (i = 0; i < bytes.length; i += 3) {
        /*jslint bitwise: true */
        base64String += BASE_CHARS[bytes[i] >> 2];
        base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
        base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
        base64String += BASE_CHARS[bytes[i + 2] & 63];
    }

    if (bytes.length % 3 === 2) {
        base64String = base64String.substring(0, base64String.length - 1) + '=';
    } else if (bytes.length % 3 === 1) {
        base64String = base64String.substring(0, base64String.length - 2) + '==';
    }

    return base64String;
}

// Serialize a value, afterwards executing a callback (which usually
// instructs the `setItem()` callback/promise to be executed). This is how
// we store binary data with localStorage.
function serialize(value, callback) {
    var valueType = '';
    if (value) {
        valueType = toString$1.call(value);
    }

    // Cannot use `value instanceof ArrayBuffer` or such here, as these
    // checks fail when running the tests using casper.js...
    //
    // TODO: See why those tests fail and use a better solution.
    if (value && (valueType === '[object ArrayBuffer]' || value.buffer && toString$1.call(value.buffer) === '[object ArrayBuffer]')) {
        // Convert binary arrays to a string and prefix the string with
        // a special marker.
        var buffer;
        var marker = SERIALIZED_MARKER;

        if (value instanceof ArrayBuffer) {
            buffer = value;
            marker += TYPE_ARRAYBUFFER;
        } else {
            buffer = value.buffer;

            if (valueType === '[object Int8Array]') {
                marker += TYPE_INT8ARRAY;
            } else if (valueType === '[object Uint8Array]') {
                marker += TYPE_UINT8ARRAY;
            } else if (valueType === '[object Uint8ClampedArray]') {
                marker += TYPE_UINT8CLAMPEDARRAY;
            } else if (valueType === '[object Int16Array]') {
                marker += TYPE_INT16ARRAY;
            } else if (valueType === '[object Uint16Array]') {
                marker += TYPE_UINT16ARRAY;
            } else if (valueType === '[object Int32Array]') {
                marker += TYPE_INT32ARRAY;
            } else if (valueType === '[object Uint32Array]') {
                marker += TYPE_UINT32ARRAY;
            } else if (valueType === '[object Float32Array]') {
                marker += TYPE_FLOAT32ARRAY;
            } else if (valueType === '[object Float64Array]') {
                marker += TYPE_FLOAT64ARRAY;
            } else {
                callback(new Error('Failed to get type for BinaryArray'));
            }
        }

        callback(marker + bufferToString(buffer));
    } else if (valueType === '[object Blob]') {
        // Conver the blob to a binaryArray and then to a string.
        var fileReader = new FileReader();

        fileReader.onload = function () {
            // Backwards-compatible prefix for the blob type.
            var str = BLOB_TYPE_PREFIX + value.type + '~' + bufferToString(this.result);

            callback(SERIALIZED_MARKER + TYPE_BLOB + str);
        };

        fileReader.readAsArrayBuffer(value);
    } else {
        try {
            callback(JSON.stringify(value));
        } catch (e) {
            console.error("Couldn't convert value into a JSON string: ", value);

            callback(null, e);
        }
    }
}

// Deserialize data we've inserted into a value column/field. We place
// special markers into our strings to mark them as encoded; this isn't
// as nice as a meta field, but it's the only sane thing we can do whilst
// keeping localStorage support intact.
//
// Oftentimes this will just deserialize JSON content, but if we have a
// special marker (SERIALIZED_MARKER, defined above), we will extract
// some kind of arraybuffer/binary data/typed array out of the string.
function deserialize(value) {
    // If we haven't marked this string as being specially serialized (i.e.
    // something other than serialized JSON), we can just return it and be
    // done with it.
    if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
        return JSON.parse(value);
    }

    // The following code deals with deserializing some kind of Blob or
    // TypedArray. First we separate out the type of data we're dealing
    // with from the data itself.
    var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
    var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);

    var blobType;
    // Backwards-compatible blob type serialization strategy.
    // DBs created with older versions of localForage will simply not have the blob type.
    if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
        var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
        blobType = matcher[1];
        serializedString = serializedString.substring(matcher[0].length);
    }
    var buffer = stringToBuffer(serializedString);

    // Return the right type based on the code/type set during
    // serialization.
    switch (type) {
        case TYPE_ARRAYBUFFER:
            return buffer;
        case TYPE_BLOB:
            return createBlob([buffer], { type: blobType });
        case TYPE_INT8ARRAY:
            return new Int8Array(buffer);
        case TYPE_UINT8ARRAY:
            return new Uint8Array(buffer);
        case TYPE_UINT8CLAMPEDARRAY:
            return new Uint8ClampedArray(buffer);
        case TYPE_INT16ARRAY:
            return new Int16Array(buffer);
        case TYPE_UINT16ARRAY:
            return new Uint16Array(buffer);
        case TYPE_INT32ARRAY:
            return new Int32Array(buffer);
        case TYPE_UINT32ARRAY:
            return new Uint32Array(buffer);
        case TYPE_FLOAT32ARRAY:
            return new Float32Array(buffer);
        case TYPE_FLOAT64ARRAY:
            return new Float64Array(buffer);
        default:
            throw new Error('Unkown type: ' + type);
    }
}

var localforageSerializer = {
    serialize: serialize,
    deserialize: deserialize,
    stringToBuffer: stringToBuffer,
    bufferToString: bufferToString
};

/*
 * Includes code from:
 *
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */

function createDbTable(t, dbInfo, callback, errorCallback) {
    t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.storeName + ' ' + '(id INTEGER PRIMARY KEY, key unique, value)', [], callback, errorCallback);
}

// Open the WebSQL database (automatically creates one if one didn't
// previously exist), using any options set in the config.
function _initStorage$1(options) {
    var self = this;
    var dbInfo = {
        db: null
    };

    if (options) {
        for (var i in options) {
            dbInfo[i] = typeof options[i] !== 'string' ? options[i].toString() : options[i];
        }
    }

    var dbInfoPromise = new Promise$1(function (resolve, reject) {
        // Open the database; the openDatabase API will automatically
        // create it for us if it doesn't exist.
        try {
            dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
        } catch (e) {
            return reject(e);
        }

        // Create our key/value table if it doesn't exist.
        dbInfo.db.transaction(function (t) {
            createDbTable(t, dbInfo, function () {
                self._dbInfo = dbInfo;
                resolve();
            }, function (t, error) {
                reject(error);
            });
        }, reject);
    });

    dbInfo.serializer = localforageSerializer;
    return dbInfoPromise;
}

function tryExecuteSql(t, dbInfo, sqlStatement, args, callback, errorCallback) {
    t.executeSql(sqlStatement, args, callback, function (t, error) {
        if (error.code === error.SYNTAX_ERR) {
            t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name = ?", [dbInfo.storeName], function (t, results) {
                if (!results.rows.length) {
                    // if the table is missing (was deleted)
                    // re-create it table and retry
                    createDbTable(t, dbInfo, function () {
                        t.executeSql(sqlStatement, args, callback, errorCallback);
                    }, errorCallback);
                } else {
                    errorCallback(t, error);
                }
            }, errorCallback);
        } else {
            errorCallback(t, error);
        }
    }, errorCallback);
}

function getItem$1(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName + ' WHERE key = ? LIMIT 1', [key], function (t, results) {
                    var result = results.rows.length ? results.rows.item(0).value : null;

                    // Check to see if this is serialized content we need to
                    // unpack.
                    if (result) {
                        result = dbInfo.serializer.deserialize(result);
                    }

                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function iterate$1(iterator, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;

            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName, [], function (t, results) {
                    var rows = results.rows;
                    var length = rows.length;

                    for (var i = 0; i < length; i++) {
                        var item = rows.item(i);
                        var result = item.value;

                        // Check to see if this is serialized content
                        // we need to unpack.
                        if (result) {
                            result = dbInfo.serializer.deserialize(result);
                        }

                        result = iterator(result, item.key, i + 1);

                        // void(0) prevents problems with redefinition
                        // of `undefined`.
                        if (result !== void 0) {
                            resolve(result);
                            return;
                        }
                    }

                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function _setItem(key, value, callback, retriesLeft) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            // The localStorage API doesn't return undefined values in an
            // "expected" way, so undefined is always cast to null in all
            // drivers. See: https://github.com/mozilla/localForage/pull/42
            if (value === undefined) {
                value = null;
            }

            // Save the original value to pass to the callback.
            var originalValue = value;

            var dbInfo = self._dbInfo;
            dbInfo.serializer.serialize(value, function (value, error) {
                if (error) {
                    reject(error);
                } else {
                    dbInfo.db.transaction(function (t) {
                        tryExecuteSql(t, dbInfo, 'INSERT OR REPLACE INTO ' + dbInfo.storeName + ' ' + '(key, value) VALUES (?, ?)', [key, value], function () {
                            resolve(originalValue);
                        }, function (t, error) {
                            reject(error);
                        });
                    }, function (sqlError) {
                        // The transaction failed; check
                        // to see if it's a quota error.
                        if (sqlError.code === sqlError.QUOTA_ERR) {
                            // We reject the callback outright for now, but
                            // it's worth trying to re-run the transaction.
                            // Even if the user accepts the prompt to use
                            // more storage on Safari, this error will
                            // be called.
                            //
                            // Try to re-run the transaction.
                            if (retriesLeft > 0) {
                                resolve(_setItem.apply(self, [key, originalValue, callback, retriesLeft - 1]));
                                return;
                            }
                            reject(sqlError);
                        }
                    });
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function setItem$1(key, value, callback) {
    return _setItem.apply(this, [key, value, callback, 1]);
}

function removeItem$1(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName + ' WHERE key = ?', [key], function () {
                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Deletes every item in the table.
// TODO: Find out if this resets the AUTO_INCREMENT number.
function clear$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName, [], function () {
                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Does a simple `COUNT(key)` to get the number of items stored in
// localForage.
function length$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                // Ahhh, SQL makes this one soooooo easy.
                tryExecuteSql(t, dbInfo, 'SELECT COUNT(key) as c FROM ' + dbInfo.storeName, [], function (t, results) {
                    var result = results.rows.item(0).c;
                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Return the key located at key index X; essentially gets the key from a
// `WHERE id = ?`. This is the most efficient way I can think to implement
// this rarely-used (in my experience) part of the API, but it can seem
// inconsistent, because we do `INSERT OR REPLACE INTO` on `setItem()`, so
// the ID of each key will change every time it's updated. Perhaps a stored
// procedure for the `setItem()` SQL would solve this problem?
// TODO: Don't change ID on `setItem()`.
function key$1(n, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName + ' WHERE id = ? LIMIT 1', [n + 1], function (t, results) {
                    var result = results.rows.length ? results.rows.item(0).key : null;
                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function keys$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName, [], function (t, results) {
                    var keys = [];

                    for (var i = 0; i < results.rows.length; i++) {
                        keys.push(results.rows.item(i).key);
                    }

                    resolve(keys);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// https://www.w3.org/TR/webdatabase/#databases
// > There is no way to enumerate or delete the databases available for an origin from this API.
function getAllStoreNames(db) {
    return new Promise$1(function (resolve, reject) {
        db.transaction(function (t) {
            t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function (t, results) {
                var storeNames = [];

                for (var i = 0; i < results.rows.length; i++) {
                    storeNames.push(results.rows.item(i).name);
                }

                resolve({
                    db: db,
                    storeNames: storeNames
                });
            }, function (t, error) {
                reject(error);
            });
        }, function (sqlError) {
            reject(sqlError);
        });
    });
}

function dropInstance$1(options, callback) {
    callback = getCallback.apply(this, arguments);

    var currentConfig = this.config();
    options = typeof options !== 'function' && options || {};
    if (!options.name) {
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }

    var self = this;
    var promise;
    if (!options.name) {
        promise = Promise$1.reject('Invalid arguments');
    } else {
        promise = new Promise$1(function (resolve) {
            var db;
            if (options.name === currentConfig.name) {
                // use the db reference of the current instance
                db = self._dbInfo.db;
            } else {
                db = openDatabase(options.name, '', '', 0);
            }

            if (!options.storeName) {
                // drop all database tables
                resolve(getAllStoreNames(db));
            } else {
                resolve({
                    db: db,
                    storeNames: [options.storeName]
                });
            }
        }).then(function (operationInfo) {
            return new Promise$1(function (resolve, reject) {
                operationInfo.db.transaction(function (t) {
                    function dropTable(storeName) {
                        return new Promise$1(function (resolve, reject) {
                            t.executeSql('DROP TABLE IF EXISTS ' + storeName, [], function () {
                                resolve();
                            }, function (t, error) {
                                reject(error);
                            });
                        });
                    }

                    var operations = [];
                    for (var i = 0, len = operationInfo.storeNames.length; i < len; i++) {
                        operations.push(dropTable(operationInfo.storeNames[i]));
                    }

                    Promise$1.all(operations).then(function () {
                        resolve();
                    })["catch"](function (e) {
                        reject(e);
                    });
                }, function (sqlError) {
                    reject(sqlError);
                });
            });
        });
    }

    executeCallback(promise, callback);
    return promise;
}

var webSQLStorage = {
    _driver: 'webSQLStorage',
    _initStorage: _initStorage$1,
    _support: isWebSQLValid(),
    iterate: iterate$1,
    getItem: getItem$1,
    setItem: setItem$1,
    removeItem: removeItem$1,
    clear: clear$1,
    length: length$1,
    key: key$1,
    keys: keys$1,
    dropInstance: dropInstance$1
};

function isLocalStorageValid() {
    try {
        return typeof localStorage !== 'undefined' && 'setItem' in localStorage &&
        // in IE8 typeof localStorage.setItem === 'object'
        !!localStorage.setItem;
    } catch (e) {
        return false;
    }
}

function _getKeyPrefix(options, defaultConfig) {
    var keyPrefix = options.name + '/';

    if (options.storeName !== defaultConfig.storeName) {
        keyPrefix += options.storeName + '/';
    }
    return keyPrefix;
}

// Check if localStorage throws when saving an item
function checkIfLocalStorageThrows() {
    var localStorageTestKey = '_localforage_support_test';

    try {
        localStorage.setItem(localStorageTestKey, true);
        localStorage.removeItem(localStorageTestKey);

        return false;
    } catch (e) {
        return true;
    }
}

// Check if localStorage is usable and allows to save an item
// This method checks if localStorage is usable in Safari Private Browsing
// mode, or in any other case where the available quota for localStorage
// is 0 and there wasn't any saved items yet.
function _isLocalStorageUsable() {
    return !checkIfLocalStorageThrows() || localStorage.length > 0;
}

// Config the localStorage backend, using options set in the config.
function _initStorage$2(options) {
    var self = this;
    var dbInfo = {};
    if (options) {
        for (var i in options) {
            dbInfo[i] = options[i];
        }
    }

    dbInfo.keyPrefix = _getKeyPrefix(options, self._defaultConfig);

    if (!_isLocalStorageUsable()) {
        return Promise$1.reject();
    }

    self._dbInfo = dbInfo;
    dbInfo.serializer = localforageSerializer;

    return Promise$1.resolve();
}

// Remove all keys from the datastore, effectively destroying all data in
// the app's key/value store!
function clear$2(callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var keyPrefix = self._dbInfo.keyPrefix;

        for (var i = localStorage.length - 1; i >= 0; i--) {
            var key = localStorage.key(i);

            if (key.indexOf(keyPrefix) === 0) {
                localStorage.removeItem(key);
            }
        }
    });

    executeCallback(promise, callback);
    return promise;
}

// Retrieve an item from the store. Unlike the original async_storage
// library in Gaia, we don't modify return values at all. If a key's value
// is `undefined`, we pass that value to the callback function.
function getItem$2(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var result = localStorage.getItem(dbInfo.keyPrefix + key);

        // If a result was found, parse it from the serialized
        // string into a JS object. If result isn't truthy, the key
        // is likely undefined and we'll pass it straight to the
        // callback.
        if (result) {
            result = dbInfo.serializer.deserialize(result);
        }

        return result;
    });

    executeCallback(promise, callback);
    return promise;
}

// Iterate over all items in the store.
function iterate$2(iterator, callback) {
    var self = this;

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var keyPrefix = dbInfo.keyPrefix;
        var keyPrefixLength = keyPrefix.length;
        var length = localStorage.length;

        // We use a dedicated iterator instead of the `i` variable below
        // so other keys we fetch in localStorage aren't counted in
        // the `iterationNumber` argument passed to the `iterate()`
        // callback.
        //
        // See: github.com/mozilla/localForage/pull/435#discussion_r38061530
        var iterationNumber = 1;

        for (var i = 0; i < length; i++) {
            var key = localStorage.key(i);
            if (key.indexOf(keyPrefix) !== 0) {
                continue;
            }
            var value = localStorage.getItem(key);

            // If a result was found, parse it from the serialized
            // string into a JS object. If result isn't truthy, the
            // key is likely undefined and we'll pass it straight
            // to the iterator.
            if (value) {
                value = dbInfo.serializer.deserialize(value);
            }

            value = iterator(value, key.substring(keyPrefixLength), iterationNumber++);

            if (value !== void 0) {
                return value;
            }
        }
    });

    executeCallback(promise, callback);
    return promise;
}

// Same as localStorage's key() method, except takes a callback.
function key$2(n, callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var result;
        try {
            result = localStorage.key(n);
        } catch (error) {
            result = null;
        }

        // Remove the prefix from the key, if a key is found.
        if (result) {
            result = result.substring(dbInfo.keyPrefix.length);
        }

        return result;
    });

    executeCallback(promise, callback);
    return promise;
}

function keys$2(callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var length = localStorage.length;
        var keys = [];

        for (var i = 0; i < length; i++) {
            var itemKey = localStorage.key(i);
            if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {
                keys.push(itemKey.substring(dbInfo.keyPrefix.length));
            }
        }

        return keys;
    });

    executeCallback(promise, callback);
    return promise;
}

// Supply the number of keys in the datastore to the callback function.
function length$2(callback) {
    var self = this;
    var promise = self.keys().then(function (keys) {
        return keys.length;
    });

    executeCallback(promise, callback);
    return promise;
}

// Remove an item from the store, nice and simple.
function removeItem$2(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        localStorage.removeItem(dbInfo.keyPrefix + key);
    });

    executeCallback(promise, callback);
    return promise;
}

// Set a key's value and run an optional callback once the value is set.
// Unlike Gaia's implementation, the callback function is passed the value,
// in case you want to operate on that value only after you're sure it
// saved, or something like that.
function setItem$2(key, value, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        // Convert undefined values to null.
        // https://github.com/mozilla/localForage/pull/42
        if (value === undefined) {
            value = null;
        }

        // Save the original value to pass to the callback.
        var originalValue = value;

        return new Promise$1(function (resolve, reject) {
            var dbInfo = self._dbInfo;
            dbInfo.serializer.serialize(value, function (value, error) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        localStorage.setItem(dbInfo.keyPrefix + key, value);
                        resolve(originalValue);
                    } catch (e) {
                        // localStorage capacity exceeded.
                        // TODO: Make this a specific error/event.
                        if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                            reject(e);
                        }
                        reject(e);
                    }
                }
            });
        });
    });

    executeCallback(promise, callback);
    return promise;
}

function dropInstance$2(options, callback) {
    callback = getCallback.apply(this, arguments);

    options = typeof options !== 'function' && options || {};
    if (!options.name) {
        var currentConfig = this.config();
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }

    var self = this;
    var promise;
    if (!options.name) {
        promise = Promise$1.reject('Invalid arguments');
    } else {
        promise = new Promise$1(function (resolve) {
            if (!options.storeName) {
                resolve(options.name + '/');
            } else {
                resolve(_getKeyPrefix(options, self._defaultConfig));
            }
        }).then(function (keyPrefix) {
            for (var i = localStorage.length - 1; i >= 0; i--) {
                var key = localStorage.key(i);

                if (key.indexOf(keyPrefix) === 0) {
                    localStorage.removeItem(key);
                }
            }
        });
    }

    executeCallback(promise, callback);
    return promise;
}

var localStorageWrapper = {
    _driver: 'localStorageWrapper',
    _initStorage: _initStorage$2,
    _support: isLocalStorageValid(),
    iterate: iterate$2,
    getItem: getItem$2,
    setItem: setItem$2,
    removeItem: removeItem$2,
    clear: clear$2,
    length: length$2,
    key: key$2,
    keys: keys$2,
    dropInstance: dropInstance$2
};

var sameValue = function sameValue(x, y) {
    return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
};

var includes = function includes(array, searchElement) {
    var len = array.length;
    var i = 0;
    while (i < len) {
        if (sameValue(array[i], searchElement)) {
            return true;
        }
        i++;
    }

    return false;
};

var isArray = Array.isArray || function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
};

// Drivers are stored here when `defineDriver()` is called.
// They are shared across all instances of localForage.
var DefinedDrivers = {};

var DriverSupport = {};

var DefaultDrivers = {
    INDEXEDDB: asyncStorage,
    WEBSQL: webSQLStorage,
    LOCALSTORAGE: localStorageWrapper
};

var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];

var OptionalDriverMethods = ['dropInstance'];

var LibraryMethods = ['clear', 'getItem', 'iterate', 'key', 'keys', 'length', 'removeItem', 'setItem'].concat(OptionalDriverMethods);

var DefaultConfig = {
    description: '',
    driver: DefaultDriverOrder.slice(),
    name: 'localforage',
    // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
    // we can use without a prompt.
    size: 4980736,
    storeName: 'keyvaluepairs',
    version: 1.0
};

function callWhenReady(localForageInstance, libraryMethod) {
    localForageInstance[libraryMethod] = function () {
        var _args = arguments;
        return localForageInstance.ready().then(function () {
            return localForageInstance[libraryMethod].apply(localForageInstance, _args);
        });
    };
}

function extend() {
    for (var i = 1; i < arguments.length; i++) {
        var arg = arguments[i];

        if (arg) {
            for (var _key in arg) {
                if (arg.hasOwnProperty(_key)) {
                    if (isArray(arg[_key])) {
                        arguments[0][_key] = arg[_key].slice();
                    } else {
                        arguments[0][_key] = arg[_key];
                    }
                }
            }
        }
    }

    return arguments[0];
}

var LocalForage = function () {
    function LocalForage(options) {
        _classCallCheck(this, LocalForage);

        for (var driverTypeKey in DefaultDrivers) {
            if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
                var driver = DefaultDrivers[driverTypeKey];
                var driverName = driver._driver;
                this[driverTypeKey] = driverName;

                if (!DefinedDrivers[driverName]) {
                    // we don't need to wait for the promise,
                    // since the default drivers can be defined
                    // in a blocking manner
                    this.defineDriver(driver);
                }
            }
        }

        this._defaultConfig = extend({}, DefaultConfig);
        this._config = extend({}, this._defaultConfig, options);
        this._driverSet = null;
        this._initDriver = null;
        this._ready = false;
        this._dbInfo = null;

        this._wrapLibraryMethodsWithReady();
        this.setDriver(this._config.driver)["catch"](function () {});
    }

    // Set any config values for localForage; can be called anytime before
    // the first API call (e.g. `getItem`, `setItem`).
    // We loop through options so we don't overwrite existing config
    // values.


    LocalForage.prototype.config = function config(options) {
        // If the options argument is an object, we use it to set values.
        // Otherwise, we return either a specified config value or all
        // config values.
        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
            // If localforage is ready and fully initialized, we can't set
            // any new configuration values. Instead, we return an error.
            if (this._ready) {
                return new Error("Can't call config() after localforage " + 'has been used.');
            }

            for (var i in options) {
                if (i === 'storeName') {
                    options[i] = options[i].replace(/\W/g, '_');
                }

                if (i === 'version' && typeof options[i] !== 'number') {
                    return new Error('Database version must be a number.');
                }

                this._config[i] = options[i];
            }

            // after all config options are set and
            // the driver option is used, try setting it
            if ('driver' in options && options.driver) {
                return this.setDriver(this._config.driver);
            }

            return true;
        } else if (typeof options === 'string') {
            return this._config[options];
        } else {
            return this._config;
        }
    };

    // Used to define a custom driver, shared across all instances of
    // localForage.


    LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
        var promise = new Promise$1(function (resolve, reject) {
            try {
                var driverName = driverObject._driver;
                var complianceError = new Error('Custom driver not compliant; see ' + 'https://mozilla.github.io/localForage/#definedriver');

                // A driver name should be defined and not overlap with the
                // library-defined, default drivers.
                if (!driverObject._driver) {
                    reject(complianceError);
                    return;
                }

                var driverMethods = LibraryMethods.concat('_initStorage');
                for (var i = 0, len = driverMethods.length; i < len; i++) {
                    var driverMethodName = driverMethods[i];

                    // when the property is there,
                    // it should be a method even when optional
                    var isRequired = !includes(OptionalDriverMethods, driverMethodName);
                    if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== 'function') {
                        reject(complianceError);
                        return;
                    }
                }

                var configureMissingMethods = function configureMissingMethods() {
                    var methodNotImplementedFactory = function methodNotImplementedFactory(methodName) {
                        return function () {
                            var error = new Error('Method ' + methodName + ' is not implemented by the current driver');
                            var promise = Promise$1.reject(error);
                            executeCallback(promise, arguments[arguments.length - 1]);
                            return promise;
                        };
                    };

                    for (var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {
                        var optionalDriverMethod = OptionalDriverMethods[_i];
                        if (!driverObject[optionalDriverMethod]) {
                            driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);
                        }
                    }
                };

                configureMissingMethods();

                var setDriverSupport = function setDriverSupport(support) {
                    if (DefinedDrivers[driverName]) {
                        console.info('Redefining LocalForage driver: ' + driverName);
                    }
                    DefinedDrivers[driverName] = driverObject;
                    DriverSupport[driverName] = support;
                    // don't use a then, so that we can define
                    // drivers that have simple _support methods
                    // in a blocking manner
                    resolve();
                };

                if ('_support' in driverObject) {
                    if (driverObject._support && typeof driverObject._support === 'function') {
                        driverObject._support().then(setDriverSupport, reject);
                    } else {
                        setDriverSupport(!!driverObject._support);
                    }
                } else {
                    setDriverSupport(true);
                }
            } catch (e) {
                reject(e);
            }
        });

        executeTwoCallbacks(promise, callback, errorCallback);
        return promise;
    };

    LocalForage.prototype.driver = function driver() {
        return this._driver || null;
    };

    LocalForage.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
        var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error('Driver not found.'));

        executeTwoCallbacks(getDriverPromise, callback, errorCallback);
        return getDriverPromise;
    };

    LocalForage.prototype.getSerializer = function getSerializer(callback) {
        var serializerPromise = Promise$1.resolve(localforageSerializer);
        executeTwoCallbacks(serializerPromise, callback);
        return serializerPromise;
    };

    LocalForage.prototype.ready = function ready(callback) {
        var self = this;

        var promise = self._driverSet.then(function () {
            if (self._ready === null) {
                self._ready = self._initDriver();
            }

            return self._ready;
        });

        executeTwoCallbacks(promise, callback, callback);
        return promise;
    };

    LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
        var self = this;

        if (!isArray(drivers)) {
            drivers = [drivers];
        }

        var supportedDrivers = this._getSupportedDrivers(drivers);

        function setDriverToConfig() {
            self._config.driver = self.driver();
        }

        function extendSelfWithDriver(driver) {
            self._extend(driver);
            setDriverToConfig();

            self._ready = self._initStorage(self._config);
            return self._ready;
        }

        function initDriver(supportedDrivers) {
            return function () {
                var currentDriverIndex = 0;

                function driverPromiseLoop() {
                    while (currentDriverIndex < supportedDrivers.length) {
                        var driverName = supportedDrivers[currentDriverIndex];
                        currentDriverIndex++;

                        self._dbInfo = null;
                        self._ready = null;

                        return self.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
                    }

                    setDriverToConfig();
                    var error = new Error('No available storage method found.');
                    self._driverSet = Promise$1.reject(error);
                    return self._driverSet;
                }

                return driverPromiseLoop();
            };
        }

        // There might be a driver initialization in progress
        // so wait for it to finish in order to avoid a possible
        // race condition to set _dbInfo
        var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function () {
            return Promise$1.resolve();
        }) : Promise$1.resolve();

        this._driverSet = oldDriverSetDone.then(function () {
            var driverName = supportedDrivers[0];
            self._dbInfo = null;
            self._ready = null;

            return self.getDriver(driverName).then(function (driver) {
                self._driver = driver._driver;
                setDriverToConfig();
                self._wrapLibraryMethodsWithReady();
                self._initDriver = initDriver(supportedDrivers);
            });
        })["catch"](function () {
            setDriverToConfig();
            var error = new Error('No available storage method found.');
            self._driverSet = Promise$1.reject(error);
            return self._driverSet;
        });

        executeTwoCallbacks(this._driverSet, callback, errorCallback);
        return this._driverSet;
    };

    LocalForage.prototype.supports = function supports(driverName) {
        return !!DriverSupport[driverName];
    };

    LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {
        extend(this, libraryMethodsAndProperties);
    };

    LocalForage.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
        var supportedDrivers = [];
        for (var i = 0, len = drivers.length; i < len; i++) {
            var driverName = drivers[i];
            if (this.supports(driverName)) {
                supportedDrivers.push(driverName);
            }
        }
        return supportedDrivers;
    };

    LocalForage.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
        // Add a stub for each driver API method that delays the call to the
        // corresponding driver method until localForage is ready. These stubs
        // will be replaced by the driver methods as soon as the driver is
        // loaded, so there is no performance impact.
        for (var i = 0, len = LibraryMethods.length; i < len; i++) {
            callWhenReady(this, LibraryMethods[i]);
        }
    };

    LocalForage.prototype.createInstance = function createInstance(options) {
        return new LocalForage(options);
    };

    return LocalForage;
}();

// The actual localForage object that we expose as a module or via a
// global. It's extended by pulling in one of our other libraries.


var localforage_js = new LocalForage();

module.exports = localforage_js;

},{"3":3}]},{},[4])(4)
});


/***/ })

};
;