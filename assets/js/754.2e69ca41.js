/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

;// CONCATENATED MODULE: ./node_modules/comlink/dist/esm/comlink.mjs
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const proxyMarker = Symbol("Comlink.proxy");
const createEndpoint = Symbol("Comlink.endpoint");
const releaseProxy = Symbol("Comlink.releaseProxy");
const finalizer = Symbol("Comlink.finalizer");
const throwMarker = Symbol("Comlink.thrown");
const isObject = (val) => (typeof val === "object" && val !== null) || typeof val === "function";
/**
 * Internal transfer handle to handle objects marked to proxy.
 */
const proxyTransferHandler = {
    canHandle: (val) => isObject(val) && val[proxyMarker],
    serialize(obj) {
        const { port1, port2 } = new MessageChannel();
        expose(obj, port1);
        return [port2, [port2]];
    },
    deserialize(port) {
        port.start();
        return wrap(port);
    },
};
/**
 * Internal transfer handler to handle thrown exceptions.
 */
const throwTransferHandler = {
    canHandle: (value) => isObject(value) && throwMarker in value,
    serialize({ value }) {
        let serialized;
        if (value instanceof Error) {
            serialized = {
                isError: true,
                value: {
                    message: value.message,
                    name: value.name,
                    stack: value.stack,
                },
            };
        }
        else {
            serialized = { isError: false, value };
        }
        return [serialized, []];
    },
    deserialize(serialized) {
        if (serialized.isError) {
            throw Object.assign(new Error(serialized.value.message), serialized.value);
        }
        throw serialized.value;
    },
};
/**
 * Allows customizing the serialization of certain values.
 */
const transferHandlers = new Map([
    ["proxy", proxyTransferHandler],
    ["throw", throwTransferHandler],
]);
function isAllowedOrigin(allowedOrigins, origin) {
    for (const allowedOrigin of allowedOrigins) {
        if (origin === allowedOrigin || allowedOrigin === "*") {
            return true;
        }
        if (allowedOrigin instanceof RegExp && allowedOrigin.test(origin)) {
            return true;
        }
    }
    return false;
}
function expose(obj, ep = globalThis, allowedOrigins = ["*"]) {
    ep.addEventListener("message", function callback(ev) {
        if (!ev || !ev.data) {
            return;
        }
        if (!isAllowedOrigin(allowedOrigins, ev.origin)) {
            console.warn(`Invalid origin '${ev.origin}' for comlink proxy`);
            return;
        }
        const { id, type, path } = Object.assign({ path: [] }, ev.data);
        const argumentList = (ev.data.argumentList || []).map(fromWireValue);
        let returnValue;
        try {
            const parent = path.slice(0, -1).reduce((obj, prop) => obj[prop], obj);
            const rawValue = path.reduce((obj, prop) => obj[prop], obj);
            switch (type) {
                case "GET" /* MessageType.GET */:
                    {
                        returnValue = rawValue;
                    }
                    break;
                case "SET" /* MessageType.SET */:
                    {
                        parent[path.slice(-1)[0]] = fromWireValue(ev.data.value);
                        returnValue = true;
                    }
                    break;
                case "APPLY" /* MessageType.APPLY */:
                    {
                        returnValue = rawValue.apply(parent, argumentList);
                    }
                    break;
                case "CONSTRUCT" /* MessageType.CONSTRUCT */:
                    {
                        const value = new rawValue(...argumentList);
                        returnValue = proxy(value);
                    }
                    break;
                case "ENDPOINT" /* MessageType.ENDPOINT */:
                    {
                        const { port1, port2 } = new MessageChannel();
                        expose(obj, port2);
                        returnValue = transfer(port1, [port1]);
                    }
                    break;
                case "RELEASE" /* MessageType.RELEASE */:
                    {
                        returnValue = undefined;
                    }
                    break;
                default:
                    return;
            }
        }
        catch (value) {
            returnValue = { value, [throwMarker]: 0 };
        }
        Promise.resolve(returnValue)
            .catch((value) => {
            return { value, [throwMarker]: 0 };
        })
            .then((returnValue) => {
            const [wireValue, transferables] = toWireValue(returnValue);
            ep.postMessage(Object.assign(Object.assign({}, wireValue), { id }), transferables);
            if (type === "RELEASE" /* MessageType.RELEASE */) {
                // detach and deactive after sending release response above.
                ep.removeEventListener("message", callback);
                closeEndPoint(ep);
                if (finalizer in obj && typeof obj[finalizer] === "function") {
                    obj[finalizer]();
                }
            }
        })
            .catch((error) => {
            // Send Serialization Error To Caller
            const [wireValue, transferables] = toWireValue({
                value: new TypeError("Unserializable return value"),
                [throwMarker]: 0,
            });
            ep.postMessage(Object.assign(Object.assign({}, wireValue), { id }), transferables);
        });
    });
    if (ep.start) {
        ep.start();
    }
}
function isMessagePort(endpoint) {
    return endpoint.constructor.name === "MessagePort";
}
function closeEndPoint(endpoint) {
    if (isMessagePort(endpoint))
        endpoint.close();
}
function wrap(ep, target) {
    return createProxy(ep, [], target);
}
function throwIfProxyReleased(isReleased) {
    if (isReleased) {
        throw new Error("Proxy has been released and is not useable");
    }
}
function releaseEndpoint(ep) {
    return requestResponseMessage(ep, {
        type: "RELEASE" /* MessageType.RELEASE */,
    }).then(() => {
        closeEndPoint(ep);
    });
}
const proxyCounter = new WeakMap();
const proxyFinalizers = "FinalizationRegistry" in globalThis &&
    new FinalizationRegistry((ep) => {
        const newCount = (proxyCounter.get(ep) || 0) - 1;
        proxyCounter.set(ep, newCount);
        if (newCount === 0) {
            releaseEndpoint(ep);
        }
    });
function registerProxy(proxy, ep) {
    const newCount = (proxyCounter.get(ep) || 0) + 1;
    proxyCounter.set(ep, newCount);
    if (proxyFinalizers) {
        proxyFinalizers.register(proxy, ep, proxy);
    }
}
function unregisterProxy(proxy) {
    if (proxyFinalizers) {
        proxyFinalizers.unregister(proxy);
    }
}
function createProxy(ep, path = [], target = function () { }) {
    let isProxyReleased = false;
    const proxy = new Proxy(target, {
        get(_target, prop) {
            throwIfProxyReleased(isProxyReleased);
            if (prop === releaseProxy) {
                return () => {
                    unregisterProxy(proxy);
                    releaseEndpoint(ep);
                    isProxyReleased = true;
                };
            }
            if (prop === "then") {
                if (path.length === 0) {
                    return { then: () => proxy };
                }
                const r = requestResponseMessage(ep, {
                    type: "GET" /* MessageType.GET */,
                    path: path.map((p) => p.toString()),
                }).then(fromWireValue);
                return r.then.bind(r);
            }
            return createProxy(ep, [...path, prop]);
        },
        set(_target, prop, rawValue) {
            throwIfProxyReleased(isProxyReleased);
            // FIXME: ES6 Proxy Handler `set` methods are supposed to return a
            // boolean. To show good will, we return true asynchronously ¯\_(ツ)_/¯
            const [value, transferables] = toWireValue(rawValue);
            return requestResponseMessage(ep, {
                type: "SET" /* MessageType.SET */,
                path: [...path, prop].map((p) => p.toString()),
                value,
            }, transferables).then(fromWireValue);
        },
        apply(_target, _thisArg, rawArgumentList) {
            throwIfProxyReleased(isProxyReleased);
            const last = path[path.length - 1];
            if (last === createEndpoint) {
                return requestResponseMessage(ep, {
                    type: "ENDPOINT" /* MessageType.ENDPOINT */,
                }).then(fromWireValue);
            }
            // We just pretend that `bind()` didn’t happen.
            if (last === "bind") {
                return createProxy(ep, path.slice(0, -1));
            }
            const [argumentList, transferables] = processArguments(rawArgumentList);
            return requestResponseMessage(ep, {
                type: "APPLY" /* MessageType.APPLY */,
                path: path.map((p) => p.toString()),
                argumentList,
            }, transferables).then(fromWireValue);
        },
        construct(_target, rawArgumentList) {
            throwIfProxyReleased(isProxyReleased);
            const [argumentList, transferables] = processArguments(rawArgumentList);
            return requestResponseMessage(ep, {
                type: "CONSTRUCT" /* MessageType.CONSTRUCT */,
                path: path.map((p) => p.toString()),
                argumentList,
            }, transferables).then(fromWireValue);
        },
    });
    registerProxy(proxy, ep);
    return proxy;
}
function myFlat(arr) {
    return Array.prototype.concat.apply([], arr);
}
function processArguments(argumentList) {
    const processed = argumentList.map(toWireValue);
    return [processed.map((v) => v[0]), myFlat(processed.map((v) => v[1]))];
}
const transferCache = new WeakMap();
function transfer(obj, transfers) {
    transferCache.set(obj, transfers);
    return obj;
}
function proxy(obj) {
    return Object.assign(obj, { [proxyMarker]: true });
}
function windowEndpoint(w, context = globalThis, targetOrigin = "*") {
    return {
        postMessage: (msg, transferables) => w.postMessage(msg, targetOrigin, transferables),
        addEventListener: context.addEventListener.bind(context),
        removeEventListener: context.removeEventListener.bind(context),
    };
}
function toWireValue(value) {
    for (const [name, handler] of transferHandlers) {
        if (handler.canHandle(value)) {
            const [serializedValue, transferables] = handler.serialize(value);
            return [
                {
                    type: "HANDLER" /* WireValueType.HANDLER */,
                    name,
                    value: serializedValue,
                },
                transferables,
            ];
        }
    }
    return [
        {
            type: "RAW" /* WireValueType.RAW */,
            value,
        },
        transferCache.get(value) || [],
    ];
}
function fromWireValue(value) {
    switch (value.type) {
        case "HANDLER" /* WireValueType.HANDLER */:
            return transferHandlers.get(value.name).deserialize(value.value);
        case "RAW" /* WireValueType.RAW */:
            return value.value;
    }
}
function requestResponseMessage(ep, msg, transfers) {
    return new Promise((resolve) => {
        const id = generateUUID();
        ep.addEventListener("message", function l(ev) {
            if (!ev.data || !ev.data.id || ev.data.id !== id) {
                return;
            }
            ep.removeEventListener("message", l);
            resolve(ev.data);
        });
        if (ep.start) {
            ep.start();
        }
        ep.postMessage(Object.assign({ id }, msg), transfers);
    });
}
function generateUUID() {
    return new Array(4)
        .fill(0)
        .map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16))
        .join("-");
}


//# sourceMappingURL=comlink.mjs.map

;// CONCATENATED MODULE: ./node_modules/@datalayer/jupyterlite-ipykernel/lib/worker.js
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
class PyoliteRemoteKernel {
    constructor() {
        /**
         * Initialization options.
         */
        this._options = null;
        this._initializer = null;
        /** TODO: real typing */
        this._localPath = '';
        this._driveName = '';
        this._initialized = new Promise((resolve, reject) => {
            this._initializer = { resolve, reject };
        });
    }
    /**
     * Accept the URLs from the host
     **/
    async initialize(options) {
        var _a;
        this._options = options;
        if (options.location.includes(':')) {
            const parts = options.location.split(':');
            this._driveName = parts[0];
            this._localPath = parts[1];
        }
        else {
            this._driveName = '';
            this._localPath = options.location;
        }
        await this.initRuntime(options);
        await this.initPackageManager(options);
        await this.initKernel(options);
        await this.initGlobals(options);
        (_a = this._initializer) === null || _a === void 0 ? void 0 : _a.resolve();
    }
    async initRuntime(options) {
        const { pyodideUrl, indexUrl } = options;
        if (pyodideUrl.endsWith('.mjs')) {
            const pyodideModule = await import(/* webpackIgnore: true */ pyodideUrl);
            this._pyodide = await pyodideModule.loadPyodide({ indexURL: indexUrl });
        }
        else {
            importScripts(pyodideUrl);
            this._pyodide = await self.loadPyodide({ indexURL: indexUrl });
        }
    }
    async initPackageManager(options) {
        if (!this._options) {
            throw new Error('Uninitialized');
        }
        const { pipliteWheelUrl, disablePyPIFallback, pipliteUrls } = this._options;
        // this is the only use of `loadPackage`, allow `piplite` to handle the rest
        await this._pyodide.loadPackage(['micropip']);
        // get piplite early enough to impact pyolite dependencies
        await this._pyodide.runPythonAsync(`
      import micropip
      await micropip.install('${pipliteWheelUrl}', keep_going=True)
      import piplite.piplite
      piplite.piplite._PIPLITE_DISABLE_PYPI = ${disablePyPIFallback ? 'True' : 'False'}
      piplite.piplite._PIPLITE_URLS = ${JSON.stringify(pipliteUrls)}
    `);
    }
    async initKernel(options) {
        // from this point forward, only use piplite
        await this._pyodide.runPythonAsync(`
      await piplite.install(['matplotlib', 'ipykernel'], keep_going=True);
      await piplite.install(['pyolite'], keep_going=True);
      await piplite.install(['ipython'], keep_going=True);
      import pyolite
    `);
        // cd to the kernel location
        if (options.mountDrive && this._localPath) {
            await this._pyodide.runPythonAsync(`
        import os;
        os.chdir("${this._localPath}");
      `);
        }
    }
    async initGlobals(options) {
        const { globals } = this._pyodide;
        this._kernel = globals.get('pyolite').kernel_instance.copy();
        this._stdout_stream = globals.get('pyolite').stdout_stream.copy();
        this._stderr_stream = globals.get('pyolite').stderr_stream.copy();
        this._interpreter = this._kernel.interpreter.copy();
        this._interpreter.send_comm = this.sendComm.bind(this);
    }
    /**
     * Recursively convert a Map to a JavaScript object
     * @param obj A Map, Array, or other  object to convert
     */
    mapToObject(obj) {
        const out = obj instanceof Array ? [] : {};
        obj.forEach((value, key) => {
            out[key] =
                value instanceof Map || value instanceof Array
                    ? this.mapToObject(value)
                    : value;
        });
        return out;
    }
    /**
     * Format the response from the Pyodide evaluation.
     *
     * @param res The result object from the Pyodide evaluation
     */
    formatResult(res) {
        if (!this._pyodide.isPyProxy(res)) {
            return res;
        }
        // TODO: this is a bit brittle
        const m = res.toJs();
        const results = this.mapToObject(m);
        return results;
    }
    /**
     * Makes sure pyodide is ready before continuing, and cache the parent message.
     */
    async setup(parent) {
        await this._initialized;
        this._kernel._parent_header = this._pyodide.toPy(parent);
    }
    /**
     * Execute code with the interpreter.
     *
     * @param content The incoming message with the code to execute.
     */
    async execute(content, parent) {
        await this.setup(parent);
        const publishExecutionResult = (prompt_count, data, metadata) => {
            const bundle = {
                execution_count: prompt_count,
                data: this.formatResult(data),
                metadata: this.formatResult(metadata),
            };
            postMessage({
                parentHeader: this.formatResult(this._kernel._parent_header)['header'],
                bundle,
                type: 'execute_result',
            });
        };
        const publishExecutionError = (ename, evalue, traceback) => {
            const bundle = {
                ename: ename,
                evalue: evalue,
                traceback: traceback,
            };
            postMessage({
                parentHeader: this.formatResult(this._kernel._parent_header)['header'],
                bundle,
                type: 'execute_error',
            });
        };
        const clearOutputCallback = (wait) => {
            const bundle = {
                wait: this.formatResult(wait),
            };
            postMessage({
                parentHeader: this.formatResult(this._kernel._parent_header)['header'],
                bundle,
                type: 'clear_output',
            });
        };
        const displayDataCallback = (data, metadata, transient) => {
            const bundle = {
                data: this.formatResult(data),
                metadata: this.formatResult(metadata),
                transient: this.formatResult(transient),
            };
            postMessage({
                parentHeader: this.formatResult(this._kernel._parent_header)['header'],
                bundle,
                type: 'display_data',
            });
        };
        const updateDisplayDataCallback = (data, metadata, transient) => {
            const bundle = {
                data: this.formatResult(data),
                metadata: this.formatResult(metadata),
                transient: this.formatResult(transient),
            };
            postMessage({
                parentHeader: this.formatResult(this._kernel._parent_header)['header'],
                bundle,
                type: 'update_display_data',
            });
        };
        const publishStreamCallback = (name, text) => {
            const bundle = {
                name: this.formatResult(name),
                text: this.formatResult(text),
            };
            postMessage({
                parentHeader: this.formatResult(this._kernel._parent_header)['header'],
                bundle,
                type: 'stream',
            });
        };
        this._stdout_stream.publish_stream_callback = publishStreamCallback;
        this._stderr_stream.publish_stream_callback = publishStreamCallback;
        this._interpreter.display_pub.clear_output_callback = clearOutputCallback;
        this._interpreter.display_pub.display_data_callback = displayDataCallback;
        this._interpreter.display_pub.update_display_data_callback =
            updateDisplayDataCallback;
        this._interpreter.displayhook.publish_execution_result = publishExecutionResult;
        this._interpreter.input = this.input.bind(this);
        this._interpreter.getpass = this.getpass.bind(this);
        const res = await this._kernel.run(content.code);
        const results = this.formatResult(res);
        if (results['status'] === 'error') {
            publishExecutionError(results['ename'], results['evalue'], results['traceback']);
        }
        return results;
    }
    /**
     * Complete the code submitted by a user.
     *
     * @param content The incoming message with the code to complete.
     */
    async complete(content, parent) {
        await this.setup(parent);
        const res = this._kernel.complete(content.code, content.cursor_pos);
        const results = this.formatResult(res);
        return results;
    }
    /**
     * Inspect the code submitted by a user.
     *
     * @param content The incoming message with the code to inspect.
     */
    async inspect(content, parent) {
        await this.setup(parent);
        const res = this._kernel.inspect(content.code, content.cursor_pos, content.detail_level);
        const results = this.formatResult(res);
        return results;
    }
    /**
     * Check code for completeness submitted by a user.
     *
     * @param content The incoming message with the code to check.
     */
    async isComplete(content, parent) {
        await this.setup(parent);
        const res = this._kernel.is_complete(content.code);
        const results = this.formatResult(res);
        return results;
    }
    /**
     * Respond to the commInfoRequest.
     *
     * @param content The incoming message with the comm target name.
     */
    async commInfo(content, parent) {
        await this.setup(parent);
        const res = this._kernel.comm_info(content.target_name);
        const results = this.formatResult(res);
        return {
            comms: results,
            status: 'ok',
        };
    }
    /**
     * Respond to the commOpen.
     *
     * @param content The incoming message with the comm open.
     */
    async commOpen(content, parent) {
        await this.setup(parent);
        const res = this._kernel.comm_manager.comm_open(this._pyodide.toPy(content));
        const results = this.formatResult(res);
        return results;
    }
    /**
     * Respond to the commMsg.
     *
     * @param content The incoming message with the comm msg.
     */
    async commMsg(content, parent) {
        await this.setup(parent);
        const res = this._kernel.comm_manager.comm_msg(this._pyodide.toPy(content));
        const results = this.formatResult(res);
        return results;
    }
    /**
     * Respond to the commClose.
     *
     * @param content The incoming message with the comm close.
     */
    async commClose(content, parent) {
        await this.setup(parent);
        const res = this._kernel.comm_manager.comm_close(this._pyodide.toPy(content));
        const results = this.formatResult(res);
        return results;
    }
    /**
     * Resolve the input request by getting back the reply from the main thread
     *
     * @param content The incoming message with the reply
     */
    async inputReply(content, parent) {
        await this.setup(parent);
        this._resolveInputReply(content);
    }
    /**
     * Send a input request to the front-end.
     *
     * @param prompt the text to show at the prompt
     * @param password Is the request for a password?
     */
    async sendInputRequest(prompt, password) {
        const content = {
            prompt,
            password,
        };
        postMessage({
            type: 'input_request',
            parentHeader: this.formatResult(this._kernel._parent_header)['header'],
            content,
        });
    }
    async getpass(prompt) {
        prompt = typeof prompt === 'undefined' ? '' : prompt;
        await this.sendInputRequest(prompt, true);
        const replyPromise = new Promise((resolve) => {
            this._resolveInputReply = resolve;
        });
        const result = await replyPromise;
        return result['value'];
    }
    async input(prompt) {
        prompt = typeof prompt === 'undefined' ? '' : prompt;
        await this.sendInputRequest(prompt, false);
        const replyPromise = new Promise((resolve) => {
            this._resolveInputReply = resolve;
        });
        const result = await replyPromise;
        return result['value'];
    }
    /**
     * Send a comm message to the front-end.
     *
     * @param type The type of the comm message.
     * @param content The content.
     * @param metadata The metadata.
     * @param ident The ident.
     * @param buffers The binary buffers.
     */
    async sendComm(type, content, metadata, ident, buffers) {
        postMessage({
            type: type,
            content: this.formatResult(content),
            metadata: this.formatResult(metadata),
            ident: this.formatResult(ident),
            buffers: this.formatResult(buffers),
            parentHeader: this.formatResult(this._kernel._parent_header)['header'],
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/@datalayer/jupyterlite-ipykernel/lib/comlink.worker.js
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * A WebWorker entrypoint that uses comlink to handle postMessage details
 */


const worker = new PyoliteRemoteKernel();
expose(worker);

module.exports = __webpack_exports__;
/******/ })()
;