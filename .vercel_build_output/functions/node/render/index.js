var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// .svelte-kit/vercel/entry.js
__export(exports, {
  default: () => entry_default
});

// node_modules/@sveltejs/kit/dist/install-fetch.js
var import_http = __toModule(require("http"));
var import_https = __toModule(require("https"));
var import_zlib = __toModule(require("zlib"));
var import_stream = __toModule(require("stream"));
var import_util = __toModule(require("util"));
var import_crypto = __toModule(require("crypto"));
var import_url = __toModule(require("url"));
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i = 1; i < meta.length; i++) {
    if (meta[i] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i]}`;
      if (meta[i].indexOf("charset=") === 0) {
        charset = meta[i].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
var src = dataUriToBuffer;
var dataUriToBuffer$1 = src;
var ponyfill_es2018 = { exports: {} };
(function(module2, exports) {
  (function(global2, factory) {
    factory(exports);
  })(commonjsGlobal, function(exports2) {
    const SymbolPolyfill = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol : (description) => `Symbol(${description})`;
    function noop2() {
      return void 0;
    }
    function getGlobals() {
      if (typeof self !== "undefined") {
        return self;
      } else if (typeof window !== "undefined") {
        return window;
      } else if (typeof commonjsGlobal !== "undefined") {
        return commonjsGlobal;
      }
      return void 0;
    }
    const globals = getGlobals();
    function typeIsObject(x) {
      return typeof x === "object" && x !== null || typeof x === "function";
    }
    const rethrowAssertionErrorRejection = noop2;
    const originalPromise = Promise;
    const originalPromiseThen = Promise.prototype.then;
    const originalPromiseResolve = Promise.resolve.bind(originalPromise);
    const originalPromiseReject = Promise.reject.bind(originalPromise);
    function newPromise(executor) {
      return new originalPromise(executor);
    }
    function promiseResolvedWith(value) {
      return originalPromiseResolve(value);
    }
    function promiseRejectedWith(reason) {
      return originalPromiseReject(reason);
    }
    function PerformPromiseThen(promise, onFulfilled, onRejected) {
      return originalPromiseThen.call(promise, onFulfilled, onRejected);
    }
    function uponPromise(promise, onFulfilled, onRejected) {
      PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), void 0, rethrowAssertionErrorRejection);
    }
    function uponFulfillment(promise, onFulfilled) {
      uponPromise(promise, onFulfilled);
    }
    function uponRejection(promise, onRejected) {
      uponPromise(promise, void 0, onRejected);
    }
    function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
      return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
    }
    function setPromiseIsHandledToTrue(promise) {
      PerformPromiseThen(promise, void 0, rethrowAssertionErrorRejection);
    }
    const queueMicrotask = (() => {
      const globalQueueMicrotask = globals && globals.queueMicrotask;
      if (typeof globalQueueMicrotask === "function") {
        return globalQueueMicrotask;
      }
      const resolvedPromise = promiseResolvedWith(void 0);
      return (fn) => PerformPromiseThen(resolvedPromise, fn);
    })();
    function reflectCall(F, V, args) {
      if (typeof F !== "function") {
        throw new TypeError("Argument is not a function");
      }
      return Function.prototype.apply.call(F, V, args);
    }
    function promiseCall(F, V, args) {
      try {
        return promiseResolvedWith(reflectCall(F, V, args));
      } catch (value) {
        return promiseRejectedWith(value);
      }
    }
    const QUEUE_MAX_ARRAY_SIZE = 16384;
    class SimpleQueue {
      constructor() {
        this._cursor = 0;
        this._size = 0;
        this._front = {
          _elements: [],
          _next: void 0
        };
        this._back = this._front;
        this._cursor = 0;
        this._size = 0;
      }
      get length() {
        return this._size;
      }
      push(element) {
        const oldBack = this._back;
        let newBack = oldBack;
        if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
          newBack = {
            _elements: [],
            _next: void 0
          };
        }
        oldBack._elements.push(element);
        if (newBack !== oldBack) {
          this._back = newBack;
          oldBack._next = newBack;
        }
        ++this._size;
      }
      shift() {
        const oldFront = this._front;
        let newFront = oldFront;
        const oldCursor = this._cursor;
        let newCursor = oldCursor + 1;
        const elements = oldFront._elements;
        const element = elements[oldCursor];
        if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
          newFront = oldFront._next;
          newCursor = 0;
        }
        --this._size;
        this._cursor = newCursor;
        if (oldFront !== newFront) {
          this._front = newFront;
        }
        elements[oldCursor] = void 0;
        return element;
      }
      forEach(callback) {
        let i = this._cursor;
        let node = this._front;
        let elements = node._elements;
        while (i !== elements.length || node._next !== void 0) {
          if (i === elements.length) {
            node = node._next;
            elements = node._elements;
            i = 0;
            if (elements.length === 0) {
              break;
            }
          }
          callback(elements[i]);
          ++i;
        }
      }
      peek() {
        const front = this._front;
        const cursor = this._cursor;
        return front._elements[cursor];
      }
    }
    function ReadableStreamReaderGenericInitialize(reader, stream) {
      reader._ownerReadableStream = stream;
      stream._reader = reader;
      if (stream._state === "readable") {
        defaultReaderClosedPromiseInitialize(reader);
      } else if (stream._state === "closed") {
        defaultReaderClosedPromiseInitializeAsResolved(reader);
      } else {
        defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
      }
    }
    function ReadableStreamReaderGenericCancel(reader, reason) {
      const stream = reader._ownerReadableStream;
      return ReadableStreamCancel(stream, reason);
    }
    function ReadableStreamReaderGenericRelease(reader) {
      if (reader._ownerReadableStream._state === "readable") {
        defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
      } else {
        defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
      }
      reader._ownerReadableStream._reader = void 0;
      reader._ownerReadableStream = void 0;
    }
    function readerLockException(name) {
      return new TypeError("Cannot " + name + " a stream using a released reader");
    }
    function defaultReaderClosedPromiseInitialize(reader) {
      reader._closedPromise = newPromise((resolve2, reject) => {
        reader._closedPromise_resolve = resolve2;
        reader._closedPromise_reject = reject;
      });
    }
    function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
      defaultReaderClosedPromiseInitialize(reader);
      defaultReaderClosedPromiseReject(reader, reason);
    }
    function defaultReaderClosedPromiseInitializeAsResolved(reader) {
      defaultReaderClosedPromiseInitialize(reader);
      defaultReaderClosedPromiseResolve(reader);
    }
    function defaultReaderClosedPromiseReject(reader, reason) {
      if (reader._closedPromise_reject === void 0) {
        return;
      }
      setPromiseIsHandledToTrue(reader._closedPromise);
      reader._closedPromise_reject(reason);
      reader._closedPromise_resolve = void 0;
      reader._closedPromise_reject = void 0;
    }
    function defaultReaderClosedPromiseResetToRejected(reader, reason) {
      defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
    }
    function defaultReaderClosedPromiseResolve(reader) {
      if (reader._closedPromise_resolve === void 0) {
        return;
      }
      reader._closedPromise_resolve(void 0);
      reader._closedPromise_resolve = void 0;
      reader._closedPromise_reject = void 0;
    }
    const AbortSteps = SymbolPolyfill("[[AbortSteps]]");
    const ErrorSteps = SymbolPolyfill("[[ErrorSteps]]");
    const CancelSteps = SymbolPolyfill("[[CancelSteps]]");
    const PullSteps = SymbolPolyfill("[[PullSteps]]");
    const NumberIsFinite = Number.isFinite || function(x) {
      return typeof x === "number" && isFinite(x);
    };
    const MathTrunc = Math.trunc || function(v) {
      return v < 0 ? Math.ceil(v) : Math.floor(v);
    };
    function isDictionary(x) {
      return typeof x === "object" || typeof x === "function";
    }
    function assertDictionary(obj, context) {
      if (obj !== void 0 && !isDictionary(obj)) {
        throw new TypeError(`${context} is not an object.`);
      }
    }
    function assertFunction(x, context) {
      if (typeof x !== "function") {
        throw new TypeError(`${context} is not a function.`);
      }
    }
    function isObject(x) {
      return typeof x === "object" && x !== null || typeof x === "function";
    }
    function assertObject(x, context) {
      if (!isObject(x)) {
        throw new TypeError(`${context} is not an object.`);
      }
    }
    function assertRequiredArgument(x, position, context) {
      if (x === void 0) {
        throw new TypeError(`Parameter ${position} is required in '${context}'.`);
      }
    }
    function assertRequiredField(x, field, context) {
      if (x === void 0) {
        throw new TypeError(`${field} is required in '${context}'.`);
      }
    }
    function convertUnrestrictedDouble(value) {
      return Number(value);
    }
    function censorNegativeZero(x) {
      return x === 0 ? 0 : x;
    }
    function integerPart(x) {
      return censorNegativeZero(MathTrunc(x));
    }
    function convertUnsignedLongLongWithEnforceRange(value, context) {
      const lowerBound = 0;
      const upperBound = Number.MAX_SAFE_INTEGER;
      let x = Number(value);
      x = censorNegativeZero(x);
      if (!NumberIsFinite(x)) {
        throw new TypeError(`${context} is not a finite number`);
      }
      x = integerPart(x);
      if (x < lowerBound || x > upperBound) {
        throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
      }
      if (!NumberIsFinite(x) || x === 0) {
        return 0;
      }
      return x;
    }
    function assertReadableStream(x, context) {
      if (!IsReadableStream(x)) {
        throw new TypeError(`${context} is not a ReadableStream.`);
      }
    }
    function AcquireReadableStreamDefaultReader(stream) {
      return new ReadableStreamDefaultReader(stream);
    }
    function ReadableStreamAddReadRequest(stream, readRequest) {
      stream._reader._readRequests.push(readRequest);
    }
    function ReadableStreamFulfillReadRequest(stream, chunk, done) {
      const reader = stream._reader;
      const readRequest = reader._readRequests.shift();
      if (done) {
        readRequest._closeSteps();
      } else {
        readRequest._chunkSteps(chunk);
      }
    }
    function ReadableStreamGetNumReadRequests(stream) {
      return stream._reader._readRequests.length;
    }
    function ReadableStreamHasDefaultReader(stream) {
      const reader = stream._reader;
      if (reader === void 0) {
        return false;
      }
      if (!IsReadableStreamDefaultReader(reader)) {
        return false;
      }
      return true;
    }
    class ReadableStreamDefaultReader {
      constructor(stream) {
        assertRequiredArgument(stream, 1, "ReadableStreamDefaultReader");
        assertReadableStream(stream, "First parameter");
        if (IsReadableStreamLocked(stream)) {
          throw new TypeError("This stream has already been locked for exclusive reading by another reader");
        }
        ReadableStreamReaderGenericInitialize(this, stream);
        this._readRequests = new SimpleQueue();
      }
      get closed() {
        if (!IsReadableStreamDefaultReader(this)) {
          return promiseRejectedWith(defaultReaderBrandCheckException("closed"));
        }
        return this._closedPromise;
      }
      cancel(reason = void 0) {
        if (!IsReadableStreamDefaultReader(this)) {
          return promiseRejectedWith(defaultReaderBrandCheckException("cancel"));
        }
        if (this._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("cancel"));
        }
        return ReadableStreamReaderGenericCancel(this, reason);
      }
      read() {
        if (!IsReadableStreamDefaultReader(this)) {
          return promiseRejectedWith(defaultReaderBrandCheckException("read"));
        }
        if (this._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("read from"));
        }
        let resolvePromise;
        let rejectPromise;
        const promise = newPromise((resolve2, reject) => {
          resolvePromise = resolve2;
          rejectPromise = reject;
        });
        const readRequest = {
          _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
          _closeSteps: () => resolvePromise({ value: void 0, done: true }),
          _errorSteps: (e) => rejectPromise(e)
        };
        ReadableStreamDefaultReaderRead(this, readRequest);
        return promise;
      }
      releaseLock() {
        if (!IsReadableStreamDefaultReader(this)) {
          throw defaultReaderBrandCheckException("releaseLock");
        }
        if (this._ownerReadableStream === void 0) {
          return;
        }
        if (this._readRequests.length > 0) {
          throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
        }
        ReadableStreamReaderGenericRelease(this);
      }
    }
    Object.defineProperties(ReadableStreamDefaultReader.prototype, {
      cancel: { enumerable: true },
      read: { enumerable: true },
      releaseLock: { enumerable: true },
      closed: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableStreamDefaultReader",
        configurable: true
      });
    }
    function IsReadableStreamDefaultReader(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_readRequests")) {
        return false;
      }
      return x instanceof ReadableStreamDefaultReader;
    }
    function ReadableStreamDefaultReaderRead(reader, readRequest) {
      const stream = reader._ownerReadableStream;
      stream._disturbed = true;
      if (stream._state === "closed") {
        readRequest._closeSteps();
      } else if (stream._state === "errored") {
        readRequest._errorSteps(stream._storedError);
      } else {
        stream._readableStreamController[PullSteps](readRequest);
      }
    }
    function defaultReaderBrandCheckException(name) {
      return new TypeError(`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`);
    }
    const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
    }).prototype);
    class ReadableStreamAsyncIteratorImpl {
      constructor(reader, preventCancel) {
        this._ongoingPromise = void 0;
        this._isFinished = false;
        this._reader = reader;
        this._preventCancel = preventCancel;
      }
      next() {
        const nextSteps = () => this._nextSteps();
        this._ongoingPromise = this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
        return this._ongoingPromise;
      }
      return(value) {
        const returnSteps = () => this._returnSteps(value);
        return this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
      }
      _nextSteps() {
        if (this._isFinished) {
          return Promise.resolve({ value: void 0, done: true });
        }
        const reader = this._reader;
        if (reader._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("iterate"));
        }
        let resolvePromise;
        let rejectPromise;
        const promise = newPromise((resolve2, reject) => {
          resolvePromise = resolve2;
          rejectPromise = reject;
        });
        const readRequest = {
          _chunkSteps: (chunk) => {
            this._ongoingPromise = void 0;
            queueMicrotask(() => resolvePromise({ value: chunk, done: false }));
          },
          _closeSteps: () => {
            this._ongoingPromise = void 0;
            this._isFinished = true;
            ReadableStreamReaderGenericRelease(reader);
            resolvePromise({ value: void 0, done: true });
          },
          _errorSteps: (reason) => {
            this._ongoingPromise = void 0;
            this._isFinished = true;
            ReadableStreamReaderGenericRelease(reader);
            rejectPromise(reason);
          }
        };
        ReadableStreamDefaultReaderRead(reader, readRequest);
        return promise;
      }
      _returnSteps(value) {
        if (this._isFinished) {
          return Promise.resolve({ value, done: true });
        }
        this._isFinished = true;
        const reader = this._reader;
        if (reader._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("finish iterating"));
        }
        if (!this._preventCancel) {
          const result = ReadableStreamReaderGenericCancel(reader, value);
          ReadableStreamReaderGenericRelease(reader);
          return transformPromiseWith(result, () => ({ value, done: true }));
        }
        ReadableStreamReaderGenericRelease(reader);
        return promiseResolvedWith({ value, done: true });
      }
    }
    const ReadableStreamAsyncIteratorPrototype = {
      next() {
        if (!IsReadableStreamAsyncIterator(this)) {
          return promiseRejectedWith(streamAsyncIteratorBrandCheckException("next"));
        }
        return this._asyncIteratorImpl.next();
      },
      return(value) {
        if (!IsReadableStreamAsyncIterator(this)) {
          return promiseRejectedWith(streamAsyncIteratorBrandCheckException("return"));
        }
        return this._asyncIteratorImpl.return(value);
      }
    };
    if (AsyncIteratorPrototype !== void 0) {
      Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
    }
    function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
      const reader = AcquireReadableStreamDefaultReader(stream);
      const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
      const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
      iterator._asyncIteratorImpl = impl;
      return iterator;
    }
    function IsReadableStreamAsyncIterator(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_asyncIteratorImpl")) {
        return false;
      }
      try {
        return x._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl;
      } catch (_a) {
        return false;
      }
    }
    function streamAsyncIteratorBrandCheckException(name) {
      return new TypeError(`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`);
    }
    const NumberIsNaN = Number.isNaN || function(x) {
      return x !== x;
    };
    function CreateArrayFromList(elements) {
      return elements.slice();
    }
    function CopyDataBlockBytes(dest, destOffset, src2, srcOffset, n) {
      new Uint8Array(dest).set(new Uint8Array(src2, srcOffset, n), destOffset);
    }
    function TransferArrayBuffer(O) {
      return O;
    }
    function IsDetachedBuffer(O) {
      return false;
    }
    function ArrayBufferSlice(buffer, begin, end) {
      if (buffer.slice) {
        return buffer.slice(begin, end);
      }
      const length = end - begin;
      const slice = new ArrayBuffer(length);
      CopyDataBlockBytes(slice, 0, buffer, begin, length);
      return slice;
    }
    function IsNonNegativeNumber(v) {
      if (typeof v !== "number") {
        return false;
      }
      if (NumberIsNaN(v)) {
        return false;
      }
      if (v < 0) {
        return false;
      }
      return true;
    }
    function CloneAsUint8Array(O) {
      const buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
      return new Uint8Array(buffer);
    }
    function DequeueValue(container) {
      const pair = container._queue.shift();
      container._queueTotalSize -= pair.size;
      if (container._queueTotalSize < 0) {
        container._queueTotalSize = 0;
      }
      return pair.value;
    }
    function EnqueueValueWithSize(container, value, size) {
      if (!IsNonNegativeNumber(size) || size === Infinity) {
        throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
      }
      container._queue.push({ value, size });
      container._queueTotalSize += size;
    }
    function PeekQueueValue(container) {
      const pair = container._queue.peek();
      return pair.value;
    }
    function ResetQueue(container) {
      container._queue = new SimpleQueue();
      container._queueTotalSize = 0;
    }
    class ReadableStreamBYOBRequest {
      constructor() {
        throw new TypeError("Illegal constructor");
      }
      get view() {
        if (!IsReadableStreamBYOBRequest(this)) {
          throw byobRequestBrandCheckException("view");
        }
        return this._view;
      }
      respond(bytesWritten) {
        if (!IsReadableStreamBYOBRequest(this)) {
          throw byobRequestBrandCheckException("respond");
        }
        assertRequiredArgument(bytesWritten, 1, "respond");
        bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, "First parameter");
        if (this._associatedReadableByteStreamController === void 0) {
          throw new TypeError("This BYOB request has been invalidated");
        }
        if (IsDetachedBuffer(this._view.buffer))
          ;
        ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
      }
      respondWithNewView(view) {
        if (!IsReadableStreamBYOBRequest(this)) {
          throw byobRequestBrandCheckException("respondWithNewView");
        }
        assertRequiredArgument(view, 1, "respondWithNewView");
        if (!ArrayBuffer.isView(view)) {
          throw new TypeError("You can only respond with array buffer views");
        }
        if (this._associatedReadableByteStreamController === void 0) {
          throw new TypeError("This BYOB request has been invalidated");
        }
        if (IsDetachedBuffer(view.buffer))
          ;
        ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
      }
    }
    Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
      respond: { enumerable: true },
      respondWithNewView: { enumerable: true },
      view: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableStreamBYOBRequest",
        configurable: true
      });
    }
    class ReadableByteStreamController {
      constructor() {
        throw new TypeError("Illegal constructor");
      }
      get byobRequest() {
        if (!IsReadableByteStreamController(this)) {
          throw byteStreamControllerBrandCheckException("byobRequest");
        }
        return ReadableByteStreamControllerGetBYOBRequest(this);
      }
      get desiredSize() {
        if (!IsReadableByteStreamController(this)) {
          throw byteStreamControllerBrandCheckException("desiredSize");
        }
        return ReadableByteStreamControllerGetDesiredSize(this);
      }
      close() {
        if (!IsReadableByteStreamController(this)) {
          throw byteStreamControllerBrandCheckException("close");
        }
        if (this._closeRequested) {
          throw new TypeError("The stream has already been closed; do not close it again!");
        }
        const state = this._controlledReadableByteStream._state;
        if (state !== "readable") {
          throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
        }
        ReadableByteStreamControllerClose(this);
      }
      enqueue(chunk) {
        if (!IsReadableByteStreamController(this)) {
          throw byteStreamControllerBrandCheckException("enqueue");
        }
        assertRequiredArgument(chunk, 1, "enqueue");
        if (!ArrayBuffer.isView(chunk)) {
          throw new TypeError("chunk must be an array buffer view");
        }
        if (chunk.byteLength === 0) {
          throw new TypeError("chunk must have non-zero byteLength");
        }
        if (chunk.buffer.byteLength === 0) {
          throw new TypeError(`chunk's buffer must have non-zero byteLength`);
        }
        if (this._closeRequested) {
          throw new TypeError("stream is closed or draining");
        }
        const state = this._controlledReadableByteStream._state;
        if (state !== "readable") {
          throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
        }
        ReadableByteStreamControllerEnqueue(this, chunk);
      }
      error(e = void 0) {
        if (!IsReadableByteStreamController(this)) {
          throw byteStreamControllerBrandCheckException("error");
        }
        ReadableByteStreamControllerError(this, e);
      }
      [CancelSteps](reason) {
        ReadableByteStreamControllerClearPendingPullIntos(this);
        ResetQueue(this);
        const result = this._cancelAlgorithm(reason);
        ReadableByteStreamControllerClearAlgorithms(this);
        return result;
      }
      [PullSteps](readRequest) {
        const stream = this._controlledReadableByteStream;
        if (this._queueTotalSize > 0) {
          const entry = this._queue.shift();
          this._queueTotalSize -= entry.byteLength;
          ReadableByteStreamControllerHandleQueueDrain(this);
          const view = new Uint8Array(entry.buffer, entry.byteOffset, entry.byteLength);
          readRequest._chunkSteps(view);
          return;
        }
        const autoAllocateChunkSize = this._autoAllocateChunkSize;
        if (autoAllocateChunkSize !== void 0) {
          let buffer;
          try {
            buffer = new ArrayBuffer(autoAllocateChunkSize);
          } catch (bufferE) {
            readRequest._errorSteps(bufferE);
            return;
          }
          const pullIntoDescriptor = {
            buffer,
            bufferByteLength: autoAllocateChunkSize,
            byteOffset: 0,
            byteLength: autoAllocateChunkSize,
            bytesFilled: 0,
            elementSize: 1,
            viewConstructor: Uint8Array,
            readerType: "default"
          };
          this._pendingPullIntos.push(pullIntoDescriptor);
        }
        ReadableStreamAddReadRequest(stream, readRequest);
        ReadableByteStreamControllerCallPullIfNeeded(this);
      }
    }
    Object.defineProperties(ReadableByteStreamController.prototype, {
      close: { enumerable: true },
      enqueue: { enumerable: true },
      error: { enumerable: true },
      byobRequest: { enumerable: true },
      desiredSize: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableByteStreamController",
        configurable: true
      });
    }
    function IsReadableByteStreamController(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_controlledReadableByteStream")) {
        return false;
      }
      return x instanceof ReadableByteStreamController;
    }
    function IsReadableStreamBYOBRequest(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_associatedReadableByteStreamController")) {
        return false;
      }
      return x instanceof ReadableStreamBYOBRequest;
    }
    function ReadableByteStreamControllerCallPullIfNeeded(controller) {
      const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
      if (!shouldPull) {
        return;
      }
      if (controller._pulling) {
        controller._pullAgain = true;
        return;
      }
      controller._pulling = true;
      const pullPromise = controller._pullAlgorithm();
      uponPromise(pullPromise, () => {
        controller._pulling = false;
        if (controller._pullAgain) {
          controller._pullAgain = false;
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
      }, (e) => {
        ReadableByteStreamControllerError(controller, e);
      });
    }
    function ReadableByteStreamControllerClearPendingPullIntos(controller) {
      ReadableByteStreamControllerInvalidateBYOBRequest(controller);
      controller._pendingPullIntos = new SimpleQueue();
    }
    function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
      let done = false;
      if (stream._state === "closed") {
        done = true;
      }
      const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
      if (pullIntoDescriptor.readerType === "default") {
        ReadableStreamFulfillReadRequest(stream, filledView, done);
      } else {
        ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
      }
    }
    function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
      const bytesFilled = pullIntoDescriptor.bytesFilled;
      const elementSize = pullIntoDescriptor.elementSize;
      return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
    }
    function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
      controller._queue.push({ buffer, byteOffset, byteLength });
      controller._queueTotalSize += byteLength;
    }
    function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
      const elementSize = pullIntoDescriptor.elementSize;
      const currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
      const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
      const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
      const maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
      let totalBytesToCopyRemaining = maxBytesToCopy;
      let ready = false;
      if (maxAlignedBytes > currentAlignedBytes) {
        totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
        ready = true;
      }
      const queue = controller._queue;
      while (totalBytesToCopyRemaining > 0) {
        const headOfQueue = queue.peek();
        const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
        const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
        CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
        if (headOfQueue.byteLength === bytesToCopy) {
          queue.shift();
        } else {
          headOfQueue.byteOffset += bytesToCopy;
          headOfQueue.byteLength -= bytesToCopy;
        }
        controller._queueTotalSize -= bytesToCopy;
        ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
        totalBytesToCopyRemaining -= bytesToCopy;
      }
      return ready;
    }
    function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
      pullIntoDescriptor.bytesFilled += size;
    }
    function ReadableByteStreamControllerHandleQueueDrain(controller) {
      if (controller._queueTotalSize === 0 && controller._closeRequested) {
        ReadableByteStreamControllerClearAlgorithms(controller);
        ReadableStreamClose(controller._controlledReadableByteStream);
      } else {
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }
    }
    function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
      if (controller._byobRequest === null) {
        return;
      }
      controller._byobRequest._associatedReadableByteStreamController = void 0;
      controller._byobRequest._view = null;
      controller._byobRequest = null;
    }
    function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
      while (controller._pendingPullIntos.length > 0) {
        if (controller._queueTotalSize === 0) {
          return;
        }
        const pullIntoDescriptor = controller._pendingPullIntos.peek();
        if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
          ReadableByteStreamControllerShiftPendingPullInto(controller);
          ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
        }
      }
    }
    function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
      const stream = controller._controlledReadableByteStream;
      let elementSize = 1;
      if (view.constructor !== DataView) {
        elementSize = view.constructor.BYTES_PER_ELEMENT;
      }
      const ctor = view.constructor;
      const buffer = TransferArrayBuffer(view.buffer);
      const pullIntoDescriptor = {
        buffer,
        bufferByteLength: buffer.byteLength,
        byteOffset: view.byteOffset,
        byteLength: view.byteLength,
        bytesFilled: 0,
        elementSize,
        viewConstructor: ctor,
        readerType: "byob"
      };
      if (controller._pendingPullIntos.length > 0) {
        controller._pendingPullIntos.push(pullIntoDescriptor);
        ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
        return;
      }
      if (stream._state === "closed") {
        const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
        readIntoRequest._closeSteps(emptyView);
        return;
      }
      if (controller._queueTotalSize > 0) {
        if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
          const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
          ReadableByteStreamControllerHandleQueueDrain(controller);
          readIntoRequest._chunkSteps(filledView);
          return;
        }
        if (controller._closeRequested) {
          const e = new TypeError("Insufficient bytes to fill elements in the given buffer");
          ReadableByteStreamControllerError(controller, e);
          readIntoRequest._errorSteps(e);
          return;
        }
      }
      controller._pendingPullIntos.push(pullIntoDescriptor);
      ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
      ReadableByteStreamControllerCallPullIfNeeded(controller);
    }
    function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
      const stream = controller._controlledReadableByteStream;
      if (ReadableStreamHasBYOBReader(stream)) {
        while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
          const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
          ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
        }
      }
    }
    function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
      ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
      if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
        return;
      }
      ReadableByteStreamControllerShiftPendingPullInto(controller);
      const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
      if (remainderSize > 0) {
        const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
        const remainder = ArrayBufferSlice(pullIntoDescriptor.buffer, end - remainderSize, end);
        ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
      }
      pullIntoDescriptor.bytesFilled -= remainderSize;
      ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
      ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
    }
    function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
      const firstDescriptor = controller._pendingPullIntos.peek();
      ReadableByteStreamControllerInvalidateBYOBRequest(controller);
      const state = controller._controlledReadableByteStream._state;
      if (state === "closed") {
        ReadableByteStreamControllerRespondInClosedState(controller);
      } else {
        ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
      }
      ReadableByteStreamControllerCallPullIfNeeded(controller);
    }
    function ReadableByteStreamControllerShiftPendingPullInto(controller) {
      const descriptor = controller._pendingPullIntos.shift();
      return descriptor;
    }
    function ReadableByteStreamControllerShouldCallPull(controller) {
      const stream = controller._controlledReadableByteStream;
      if (stream._state !== "readable") {
        return false;
      }
      if (controller._closeRequested) {
        return false;
      }
      if (!controller._started) {
        return false;
      }
      if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
        return true;
      }
      if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
        return true;
      }
      const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
      if (desiredSize > 0) {
        return true;
      }
      return false;
    }
    function ReadableByteStreamControllerClearAlgorithms(controller) {
      controller._pullAlgorithm = void 0;
      controller._cancelAlgorithm = void 0;
    }
    function ReadableByteStreamControllerClose(controller) {
      const stream = controller._controlledReadableByteStream;
      if (controller._closeRequested || stream._state !== "readable") {
        return;
      }
      if (controller._queueTotalSize > 0) {
        controller._closeRequested = true;
        return;
      }
      if (controller._pendingPullIntos.length > 0) {
        const firstPendingPullInto = controller._pendingPullIntos.peek();
        if (firstPendingPullInto.bytesFilled > 0) {
          const e = new TypeError("Insufficient bytes to fill elements in the given buffer");
          ReadableByteStreamControllerError(controller, e);
          throw e;
        }
      }
      ReadableByteStreamControllerClearAlgorithms(controller);
      ReadableStreamClose(stream);
    }
    function ReadableByteStreamControllerEnqueue(controller, chunk) {
      const stream = controller._controlledReadableByteStream;
      if (controller._closeRequested || stream._state !== "readable") {
        return;
      }
      const buffer = chunk.buffer;
      const byteOffset = chunk.byteOffset;
      const byteLength = chunk.byteLength;
      const transferredBuffer = TransferArrayBuffer(buffer);
      if (controller._pendingPullIntos.length > 0) {
        const firstPendingPullInto = controller._pendingPullIntos.peek();
        if (IsDetachedBuffer(firstPendingPullInto.buffer))
          ;
        firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
      }
      ReadableByteStreamControllerInvalidateBYOBRequest(controller);
      if (ReadableStreamHasDefaultReader(stream)) {
        if (ReadableStreamGetNumReadRequests(stream) === 0) {
          ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
        } else {
          const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
          ReadableStreamFulfillReadRequest(stream, transferredView, false);
        }
      } else if (ReadableStreamHasBYOBReader(stream)) {
        ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
        ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
      } else {
        ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
      }
      ReadableByteStreamControllerCallPullIfNeeded(controller);
    }
    function ReadableByteStreamControllerError(controller, e) {
      const stream = controller._controlledReadableByteStream;
      if (stream._state !== "readable") {
        return;
      }
      ReadableByteStreamControllerClearPendingPullIntos(controller);
      ResetQueue(controller);
      ReadableByteStreamControllerClearAlgorithms(controller);
      ReadableStreamError(stream, e);
    }
    function ReadableByteStreamControllerGetBYOBRequest(controller) {
      if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
        const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
        SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
        controller._byobRequest = byobRequest;
      }
      return controller._byobRequest;
    }
    function ReadableByteStreamControllerGetDesiredSize(controller) {
      const state = controller._controlledReadableByteStream._state;
      if (state === "errored") {
        return null;
      }
      if (state === "closed") {
        return 0;
      }
      return controller._strategyHWM - controller._queueTotalSize;
    }
    function ReadableByteStreamControllerRespond(controller, bytesWritten) {
      const firstDescriptor = controller._pendingPullIntos.peek();
      const state = controller._controlledReadableByteStream._state;
      if (state === "closed") {
        if (bytesWritten !== 0) {
          throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
        }
      } else {
        if (bytesWritten === 0) {
          throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
        }
        if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
          throw new RangeError("bytesWritten out of range");
        }
      }
      firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
      ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
    }
    function ReadableByteStreamControllerRespondWithNewView(controller, view) {
      const firstDescriptor = controller._pendingPullIntos.peek();
      const state = controller._controlledReadableByteStream._state;
      if (state === "closed") {
        if (view.byteLength !== 0) {
          throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
        }
      } else {
        if (view.byteLength === 0) {
          throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
        }
      }
      if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
        throw new RangeError("The region specified by view does not match byobRequest");
      }
      if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
        throw new RangeError("The buffer of view has different capacity than byobRequest");
      }
      if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
        throw new RangeError("The region specified by view is larger than byobRequest");
      }
      firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
      ReadableByteStreamControllerRespondInternal(controller, view.byteLength);
    }
    function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
      controller._controlledReadableByteStream = stream;
      controller._pullAgain = false;
      controller._pulling = false;
      controller._byobRequest = null;
      controller._queue = controller._queueTotalSize = void 0;
      ResetQueue(controller);
      controller._closeRequested = false;
      controller._started = false;
      controller._strategyHWM = highWaterMark;
      controller._pullAlgorithm = pullAlgorithm;
      controller._cancelAlgorithm = cancelAlgorithm;
      controller._autoAllocateChunkSize = autoAllocateChunkSize;
      controller._pendingPullIntos = new SimpleQueue();
      stream._readableStreamController = controller;
      const startResult = startAlgorithm();
      uponPromise(promiseResolvedWith(startResult), () => {
        controller._started = true;
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }, (r) => {
        ReadableByteStreamControllerError(controller, r);
      });
    }
    function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
      const controller = Object.create(ReadableByteStreamController.prototype);
      let startAlgorithm = () => void 0;
      let pullAlgorithm = () => promiseResolvedWith(void 0);
      let cancelAlgorithm = () => promiseResolvedWith(void 0);
      if (underlyingByteSource.start !== void 0) {
        startAlgorithm = () => underlyingByteSource.start(controller);
      }
      if (underlyingByteSource.pull !== void 0) {
        pullAlgorithm = () => underlyingByteSource.pull(controller);
      }
      if (underlyingByteSource.cancel !== void 0) {
        cancelAlgorithm = (reason) => underlyingByteSource.cancel(reason);
      }
      const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
      if (autoAllocateChunkSize === 0) {
        throw new TypeError("autoAllocateChunkSize must be greater than 0");
      }
      SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
    }
    function SetUpReadableStreamBYOBRequest(request, controller, view) {
      request._associatedReadableByteStreamController = controller;
      request._view = view;
    }
    function byobRequestBrandCheckException(name) {
      return new TypeError(`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`);
    }
    function byteStreamControllerBrandCheckException(name) {
      return new TypeError(`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`);
    }
    function AcquireReadableStreamBYOBReader(stream) {
      return new ReadableStreamBYOBReader(stream);
    }
    function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
      stream._reader._readIntoRequests.push(readIntoRequest);
    }
    function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
      const reader = stream._reader;
      const readIntoRequest = reader._readIntoRequests.shift();
      if (done) {
        readIntoRequest._closeSteps(chunk);
      } else {
        readIntoRequest._chunkSteps(chunk);
      }
    }
    function ReadableStreamGetNumReadIntoRequests(stream) {
      return stream._reader._readIntoRequests.length;
    }
    function ReadableStreamHasBYOBReader(stream) {
      const reader = stream._reader;
      if (reader === void 0) {
        return false;
      }
      if (!IsReadableStreamBYOBReader(reader)) {
        return false;
      }
      return true;
    }
    class ReadableStreamBYOBReader {
      constructor(stream) {
        assertRequiredArgument(stream, 1, "ReadableStreamBYOBReader");
        assertReadableStream(stream, "First parameter");
        if (IsReadableStreamLocked(stream)) {
          throw new TypeError("This stream has already been locked for exclusive reading by another reader");
        }
        if (!IsReadableByteStreamController(stream._readableStreamController)) {
          throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
        }
        ReadableStreamReaderGenericInitialize(this, stream);
        this._readIntoRequests = new SimpleQueue();
      }
      get closed() {
        if (!IsReadableStreamBYOBReader(this)) {
          return promiseRejectedWith(byobReaderBrandCheckException("closed"));
        }
        return this._closedPromise;
      }
      cancel(reason = void 0) {
        if (!IsReadableStreamBYOBReader(this)) {
          return promiseRejectedWith(byobReaderBrandCheckException("cancel"));
        }
        if (this._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("cancel"));
        }
        return ReadableStreamReaderGenericCancel(this, reason);
      }
      read(view) {
        if (!IsReadableStreamBYOBReader(this)) {
          return promiseRejectedWith(byobReaderBrandCheckException("read"));
        }
        if (!ArrayBuffer.isView(view)) {
          return promiseRejectedWith(new TypeError("view must be an array buffer view"));
        }
        if (view.byteLength === 0) {
          return promiseRejectedWith(new TypeError("view must have non-zero byteLength"));
        }
        if (view.buffer.byteLength === 0) {
          return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
        }
        if (IsDetachedBuffer(view.buffer))
          ;
        if (this._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("read from"));
        }
        let resolvePromise;
        let rejectPromise;
        const promise = newPromise((resolve2, reject) => {
          resolvePromise = resolve2;
          rejectPromise = reject;
        });
        const readIntoRequest = {
          _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
          _closeSteps: (chunk) => resolvePromise({ value: chunk, done: true }),
          _errorSteps: (e) => rejectPromise(e)
        };
        ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
        return promise;
      }
      releaseLock() {
        if (!IsReadableStreamBYOBReader(this)) {
          throw byobReaderBrandCheckException("releaseLock");
        }
        if (this._ownerReadableStream === void 0) {
          return;
        }
        if (this._readIntoRequests.length > 0) {
          throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
        }
        ReadableStreamReaderGenericRelease(this);
      }
    }
    Object.defineProperties(ReadableStreamBYOBReader.prototype, {
      cancel: { enumerable: true },
      read: { enumerable: true },
      releaseLock: { enumerable: true },
      closed: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableStreamBYOBReader",
        configurable: true
      });
    }
    function IsReadableStreamBYOBReader(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_readIntoRequests")) {
        return false;
      }
      return x instanceof ReadableStreamBYOBReader;
    }
    function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
      const stream = reader._ownerReadableStream;
      stream._disturbed = true;
      if (stream._state === "errored") {
        readIntoRequest._errorSteps(stream._storedError);
      } else {
        ReadableByteStreamControllerPullInto(stream._readableStreamController, view, readIntoRequest);
      }
    }
    function byobReaderBrandCheckException(name) {
      return new TypeError(`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`);
    }
    function ExtractHighWaterMark(strategy, defaultHWM) {
      const { highWaterMark } = strategy;
      if (highWaterMark === void 0) {
        return defaultHWM;
      }
      if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
        throw new RangeError("Invalid highWaterMark");
      }
      return highWaterMark;
    }
    function ExtractSizeAlgorithm(strategy) {
      const { size } = strategy;
      if (!size) {
        return () => 1;
      }
      return size;
    }
    function convertQueuingStrategy(init2, context) {
      assertDictionary(init2, context);
      const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
      const size = init2 === null || init2 === void 0 ? void 0 : init2.size;
      return {
        highWaterMark: highWaterMark === void 0 ? void 0 : convertUnrestrictedDouble(highWaterMark),
        size: size === void 0 ? void 0 : convertQueuingStrategySize(size, `${context} has member 'size' that`)
      };
    }
    function convertQueuingStrategySize(fn, context) {
      assertFunction(fn, context);
      return (chunk) => convertUnrestrictedDouble(fn(chunk));
    }
    function convertUnderlyingSink(original, context) {
      assertDictionary(original, context);
      const abort = original === null || original === void 0 ? void 0 : original.abort;
      const close = original === null || original === void 0 ? void 0 : original.close;
      const start = original === null || original === void 0 ? void 0 : original.start;
      const type = original === null || original === void 0 ? void 0 : original.type;
      const write = original === null || original === void 0 ? void 0 : original.write;
      return {
        abort: abort === void 0 ? void 0 : convertUnderlyingSinkAbortCallback(abort, original, `${context} has member 'abort' that`),
        close: close === void 0 ? void 0 : convertUnderlyingSinkCloseCallback(close, original, `${context} has member 'close' that`),
        start: start === void 0 ? void 0 : convertUnderlyingSinkStartCallback(start, original, `${context} has member 'start' that`),
        write: write === void 0 ? void 0 : convertUnderlyingSinkWriteCallback(write, original, `${context} has member 'write' that`),
        type
      };
    }
    function convertUnderlyingSinkAbortCallback(fn, original, context) {
      assertFunction(fn, context);
      return (reason) => promiseCall(fn, original, [reason]);
    }
    function convertUnderlyingSinkCloseCallback(fn, original, context) {
      assertFunction(fn, context);
      return () => promiseCall(fn, original, []);
    }
    function convertUnderlyingSinkStartCallback(fn, original, context) {
      assertFunction(fn, context);
      return (controller) => reflectCall(fn, original, [controller]);
    }
    function convertUnderlyingSinkWriteCallback(fn, original, context) {
      assertFunction(fn, context);
      return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
    }
    function assertWritableStream(x, context) {
      if (!IsWritableStream(x)) {
        throw new TypeError(`${context} is not a WritableStream.`);
      }
    }
    function isAbortSignal2(value) {
      if (typeof value !== "object" || value === null) {
        return false;
      }
      try {
        return typeof value.aborted === "boolean";
      } catch (_a) {
        return false;
      }
    }
    const supportsAbortController = typeof AbortController === "function";
    function createAbortController() {
      if (supportsAbortController) {
        return new AbortController();
      }
      return void 0;
    }
    class WritableStream {
      constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
        if (rawUnderlyingSink === void 0) {
          rawUnderlyingSink = null;
        } else {
          assertObject(rawUnderlyingSink, "First parameter");
        }
        const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
        const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, "First parameter");
        InitializeWritableStream(this);
        const type = underlyingSink.type;
        if (type !== void 0) {
          throw new RangeError("Invalid type is specified");
        }
        const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
        const highWaterMark = ExtractHighWaterMark(strategy, 1);
        SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
      }
      get locked() {
        if (!IsWritableStream(this)) {
          throw streamBrandCheckException$2("locked");
        }
        return IsWritableStreamLocked(this);
      }
      abort(reason = void 0) {
        if (!IsWritableStream(this)) {
          return promiseRejectedWith(streamBrandCheckException$2("abort"));
        }
        if (IsWritableStreamLocked(this)) {
          return promiseRejectedWith(new TypeError("Cannot abort a stream that already has a writer"));
        }
        return WritableStreamAbort(this, reason);
      }
      close() {
        if (!IsWritableStream(this)) {
          return promiseRejectedWith(streamBrandCheckException$2("close"));
        }
        if (IsWritableStreamLocked(this)) {
          return promiseRejectedWith(new TypeError("Cannot close a stream that already has a writer"));
        }
        if (WritableStreamCloseQueuedOrInFlight(this)) {
          return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
        }
        return WritableStreamClose(this);
      }
      getWriter() {
        if (!IsWritableStream(this)) {
          throw streamBrandCheckException$2("getWriter");
        }
        return AcquireWritableStreamDefaultWriter(this);
      }
    }
    Object.defineProperties(WritableStream.prototype, {
      abort: { enumerable: true },
      close: { enumerable: true },
      getWriter: { enumerable: true },
      locked: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(WritableStream.prototype, SymbolPolyfill.toStringTag, {
        value: "WritableStream",
        configurable: true
      });
    }
    function AcquireWritableStreamDefaultWriter(stream) {
      return new WritableStreamDefaultWriter(stream);
    }
    function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
      const stream = Object.create(WritableStream.prototype);
      InitializeWritableStream(stream);
      const controller = Object.create(WritableStreamDefaultController.prototype);
      SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
      return stream;
    }
    function InitializeWritableStream(stream) {
      stream._state = "writable";
      stream._storedError = void 0;
      stream._writer = void 0;
      stream._writableStreamController = void 0;
      stream._writeRequests = new SimpleQueue();
      stream._inFlightWriteRequest = void 0;
      stream._closeRequest = void 0;
      stream._inFlightCloseRequest = void 0;
      stream._pendingAbortRequest = void 0;
      stream._backpressure = false;
    }
    function IsWritableStream(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_writableStreamController")) {
        return false;
      }
      return x instanceof WritableStream;
    }
    function IsWritableStreamLocked(stream) {
      if (stream._writer === void 0) {
        return false;
      }
      return true;
    }
    function WritableStreamAbort(stream, reason) {
      var _a;
      if (stream._state === "closed" || stream._state === "errored") {
        return promiseResolvedWith(void 0);
      }
      stream._writableStreamController._abortReason = reason;
      (_a = stream._writableStreamController._abortController) === null || _a === void 0 ? void 0 : _a.abort();
      const state = stream._state;
      if (state === "closed" || state === "errored") {
        return promiseResolvedWith(void 0);
      }
      if (stream._pendingAbortRequest !== void 0) {
        return stream._pendingAbortRequest._promise;
      }
      let wasAlreadyErroring = false;
      if (state === "erroring") {
        wasAlreadyErroring = true;
        reason = void 0;
      }
      const promise = newPromise((resolve2, reject) => {
        stream._pendingAbortRequest = {
          _promise: void 0,
          _resolve: resolve2,
          _reject: reject,
          _reason: reason,
          _wasAlreadyErroring: wasAlreadyErroring
        };
      });
      stream._pendingAbortRequest._promise = promise;
      if (!wasAlreadyErroring) {
        WritableStreamStartErroring(stream, reason);
      }
      return promise;
    }
    function WritableStreamClose(stream) {
      const state = stream._state;
      if (state === "closed" || state === "errored") {
        return promiseRejectedWith(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
      }
      const promise = newPromise((resolve2, reject) => {
        const closeRequest = {
          _resolve: resolve2,
          _reject: reject
        };
        stream._closeRequest = closeRequest;
      });
      const writer = stream._writer;
      if (writer !== void 0 && stream._backpressure && state === "writable") {
        defaultWriterReadyPromiseResolve(writer);
      }
      WritableStreamDefaultControllerClose(stream._writableStreamController);
      return promise;
    }
    function WritableStreamAddWriteRequest(stream) {
      const promise = newPromise((resolve2, reject) => {
        const writeRequest = {
          _resolve: resolve2,
          _reject: reject
        };
        stream._writeRequests.push(writeRequest);
      });
      return promise;
    }
    function WritableStreamDealWithRejection(stream, error2) {
      const state = stream._state;
      if (state === "writable") {
        WritableStreamStartErroring(stream, error2);
        return;
      }
      WritableStreamFinishErroring(stream);
    }
    function WritableStreamStartErroring(stream, reason) {
      const controller = stream._writableStreamController;
      stream._state = "erroring";
      stream._storedError = reason;
      const writer = stream._writer;
      if (writer !== void 0) {
        WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
      }
      if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
        WritableStreamFinishErroring(stream);
      }
    }
    function WritableStreamFinishErroring(stream) {
      stream._state = "errored";
      stream._writableStreamController[ErrorSteps]();
      const storedError = stream._storedError;
      stream._writeRequests.forEach((writeRequest) => {
        writeRequest._reject(storedError);
      });
      stream._writeRequests = new SimpleQueue();
      if (stream._pendingAbortRequest === void 0) {
        WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
        return;
      }
      const abortRequest = stream._pendingAbortRequest;
      stream._pendingAbortRequest = void 0;
      if (abortRequest._wasAlreadyErroring) {
        abortRequest._reject(storedError);
        WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
        return;
      }
      const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
      uponPromise(promise, () => {
        abortRequest._resolve();
        WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
      }, (reason) => {
        abortRequest._reject(reason);
        WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
      });
    }
    function WritableStreamFinishInFlightWrite(stream) {
      stream._inFlightWriteRequest._resolve(void 0);
      stream._inFlightWriteRequest = void 0;
    }
    function WritableStreamFinishInFlightWriteWithError(stream, error2) {
      stream._inFlightWriteRequest._reject(error2);
      stream._inFlightWriteRequest = void 0;
      WritableStreamDealWithRejection(stream, error2);
    }
    function WritableStreamFinishInFlightClose(stream) {
      stream._inFlightCloseRequest._resolve(void 0);
      stream._inFlightCloseRequest = void 0;
      const state = stream._state;
      if (state === "erroring") {
        stream._storedError = void 0;
        if (stream._pendingAbortRequest !== void 0) {
          stream._pendingAbortRequest._resolve();
          stream._pendingAbortRequest = void 0;
        }
      }
      stream._state = "closed";
      const writer = stream._writer;
      if (writer !== void 0) {
        defaultWriterClosedPromiseResolve(writer);
      }
    }
    function WritableStreamFinishInFlightCloseWithError(stream, error2) {
      stream._inFlightCloseRequest._reject(error2);
      stream._inFlightCloseRequest = void 0;
      if (stream._pendingAbortRequest !== void 0) {
        stream._pendingAbortRequest._reject(error2);
        stream._pendingAbortRequest = void 0;
      }
      WritableStreamDealWithRejection(stream, error2);
    }
    function WritableStreamCloseQueuedOrInFlight(stream) {
      if (stream._closeRequest === void 0 && stream._inFlightCloseRequest === void 0) {
        return false;
      }
      return true;
    }
    function WritableStreamHasOperationMarkedInFlight(stream) {
      if (stream._inFlightWriteRequest === void 0 && stream._inFlightCloseRequest === void 0) {
        return false;
      }
      return true;
    }
    function WritableStreamMarkCloseRequestInFlight(stream) {
      stream._inFlightCloseRequest = stream._closeRequest;
      stream._closeRequest = void 0;
    }
    function WritableStreamMarkFirstWriteRequestInFlight(stream) {
      stream._inFlightWriteRequest = stream._writeRequests.shift();
    }
    function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
      if (stream._closeRequest !== void 0) {
        stream._closeRequest._reject(stream._storedError);
        stream._closeRequest = void 0;
      }
      const writer = stream._writer;
      if (writer !== void 0) {
        defaultWriterClosedPromiseReject(writer, stream._storedError);
      }
    }
    function WritableStreamUpdateBackpressure(stream, backpressure) {
      const writer = stream._writer;
      if (writer !== void 0 && backpressure !== stream._backpressure) {
        if (backpressure) {
          defaultWriterReadyPromiseReset(writer);
        } else {
          defaultWriterReadyPromiseResolve(writer);
        }
      }
      stream._backpressure = backpressure;
    }
    class WritableStreamDefaultWriter {
      constructor(stream) {
        assertRequiredArgument(stream, 1, "WritableStreamDefaultWriter");
        assertWritableStream(stream, "First parameter");
        if (IsWritableStreamLocked(stream)) {
          throw new TypeError("This stream has already been locked for exclusive writing by another writer");
        }
        this._ownerWritableStream = stream;
        stream._writer = this;
        const state = stream._state;
        if (state === "writable") {
          if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
            defaultWriterReadyPromiseInitialize(this);
          } else {
            defaultWriterReadyPromiseInitializeAsResolved(this);
          }
          defaultWriterClosedPromiseInitialize(this);
        } else if (state === "erroring") {
          defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
          defaultWriterClosedPromiseInitialize(this);
        } else if (state === "closed") {
          defaultWriterReadyPromiseInitializeAsResolved(this);
          defaultWriterClosedPromiseInitializeAsResolved(this);
        } else {
          const storedError = stream._storedError;
          defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
          defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
        }
      }
      get closed() {
        if (!IsWritableStreamDefaultWriter(this)) {
          return promiseRejectedWith(defaultWriterBrandCheckException("closed"));
        }
        return this._closedPromise;
      }
      get desiredSize() {
        if (!IsWritableStreamDefaultWriter(this)) {
          throw defaultWriterBrandCheckException("desiredSize");
        }
        if (this._ownerWritableStream === void 0) {
          throw defaultWriterLockException("desiredSize");
        }
        return WritableStreamDefaultWriterGetDesiredSize(this);
      }
      get ready() {
        if (!IsWritableStreamDefaultWriter(this)) {
          return promiseRejectedWith(defaultWriterBrandCheckException("ready"));
        }
        return this._readyPromise;
      }
      abort(reason = void 0) {
        if (!IsWritableStreamDefaultWriter(this)) {
          return promiseRejectedWith(defaultWriterBrandCheckException("abort"));
        }
        if (this._ownerWritableStream === void 0) {
          return promiseRejectedWith(defaultWriterLockException("abort"));
        }
        return WritableStreamDefaultWriterAbort(this, reason);
      }
      close() {
        if (!IsWritableStreamDefaultWriter(this)) {
          return promiseRejectedWith(defaultWriterBrandCheckException("close"));
        }
        const stream = this._ownerWritableStream;
        if (stream === void 0) {
          return promiseRejectedWith(defaultWriterLockException("close"));
        }
        if (WritableStreamCloseQueuedOrInFlight(stream)) {
          return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
        }
        return WritableStreamDefaultWriterClose(this);
      }
      releaseLock() {
        if (!IsWritableStreamDefaultWriter(this)) {
          throw defaultWriterBrandCheckException("releaseLock");
        }
        const stream = this._ownerWritableStream;
        if (stream === void 0) {
          return;
        }
        WritableStreamDefaultWriterRelease(this);
      }
      write(chunk = void 0) {
        if (!IsWritableStreamDefaultWriter(this)) {
          return promiseRejectedWith(defaultWriterBrandCheckException("write"));
        }
        if (this._ownerWritableStream === void 0) {
          return promiseRejectedWith(defaultWriterLockException("write to"));
        }
        return WritableStreamDefaultWriterWrite(this, chunk);
      }
    }
    Object.defineProperties(WritableStreamDefaultWriter.prototype, {
      abort: { enumerable: true },
      close: { enumerable: true },
      releaseLock: { enumerable: true },
      write: { enumerable: true },
      closed: { enumerable: true },
      desiredSize: { enumerable: true },
      ready: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
        value: "WritableStreamDefaultWriter",
        configurable: true
      });
    }
    function IsWritableStreamDefaultWriter(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_ownerWritableStream")) {
        return false;
      }
      return x instanceof WritableStreamDefaultWriter;
    }
    function WritableStreamDefaultWriterAbort(writer, reason) {
      const stream = writer._ownerWritableStream;
      return WritableStreamAbort(stream, reason);
    }
    function WritableStreamDefaultWriterClose(writer) {
      const stream = writer._ownerWritableStream;
      return WritableStreamClose(stream);
    }
    function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
      const stream = writer._ownerWritableStream;
      const state = stream._state;
      if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
        return promiseResolvedWith(void 0);
      }
      if (state === "errored") {
        return promiseRejectedWith(stream._storedError);
      }
      return WritableStreamDefaultWriterClose(writer);
    }
    function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error2) {
      if (writer._closedPromiseState === "pending") {
        defaultWriterClosedPromiseReject(writer, error2);
      } else {
        defaultWriterClosedPromiseResetToRejected(writer, error2);
      }
    }
    function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error2) {
      if (writer._readyPromiseState === "pending") {
        defaultWriterReadyPromiseReject(writer, error2);
      } else {
        defaultWriterReadyPromiseResetToRejected(writer, error2);
      }
    }
    function WritableStreamDefaultWriterGetDesiredSize(writer) {
      const stream = writer._ownerWritableStream;
      const state = stream._state;
      if (state === "errored" || state === "erroring") {
        return null;
      }
      if (state === "closed") {
        return 0;
      }
      return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
    }
    function WritableStreamDefaultWriterRelease(writer) {
      const stream = writer._ownerWritableStream;
      const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
      WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
      WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
      stream._writer = void 0;
      writer._ownerWritableStream = void 0;
    }
    function WritableStreamDefaultWriterWrite(writer, chunk) {
      const stream = writer._ownerWritableStream;
      const controller = stream._writableStreamController;
      const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
      if (stream !== writer._ownerWritableStream) {
        return promiseRejectedWith(defaultWriterLockException("write to"));
      }
      const state = stream._state;
      if (state === "errored") {
        return promiseRejectedWith(stream._storedError);
      }
      if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
        return promiseRejectedWith(new TypeError("The stream is closing or closed and cannot be written to"));
      }
      if (state === "erroring") {
        return promiseRejectedWith(stream._storedError);
      }
      const promise = WritableStreamAddWriteRequest(stream);
      WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
      return promise;
    }
    const closeSentinel = {};
    class WritableStreamDefaultController {
      constructor() {
        throw new TypeError("Illegal constructor");
      }
      get abortReason() {
        if (!IsWritableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$2("abortReason");
        }
        return this._abortReason;
      }
      get signal() {
        if (!IsWritableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$2("signal");
        }
        if (this._abortController === void 0) {
          throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
        }
        return this._abortController.signal;
      }
      error(e = void 0) {
        if (!IsWritableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$2("error");
        }
        const state = this._controlledWritableStream._state;
        if (state !== "writable") {
          return;
        }
        WritableStreamDefaultControllerError(this, e);
      }
      [AbortSteps](reason) {
        const result = this._abortAlgorithm(reason);
        WritableStreamDefaultControllerClearAlgorithms(this);
        return result;
      }
      [ErrorSteps]() {
        ResetQueue(this);
      }
    }
    Object.defineProperties(WritableStreamDefaultController.prototype, {
      error: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
        value: "WritableStreamDefaultController",
        configurable: true
      });
    }
    function IsWritableStreamDefaultController(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_controlledWritableStream")) {
        return false;
      }
      return x instanceof WritableStreamDefaultController;
    }
    function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
      controller._controlledWritableStream = stream;
      stream._writableStreamController = controller;
      controller._queue = void 0;
      controller._queueTotalSize = void 0;
      ResetQueue(controller);
      controller._abortReason = void 0;
      controller._abortController = createAbortController();
      controller._started = false;
      controller._strategySizeAlgorithm = sizeAlgorithm;
      controller._strategyHWM = highWaterMark;
      controller._writeAlgorithm = writeAlgorithm;
      controller._closeAlgorithm = closeAlgorithm;
      controller._abortAlgorithm = abortAlgorithm;
      const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
      WritableStreamUpdateBackpressure(stream, backpressure);
      const startResult = startAlgorithm();
      const startPromise = promiseResolvedWith(startResult);
      uponPromise(startPromise, () => {
        controller._started = true;
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
      }, (r) => {
        controller._started = true;
        WritableStreamDealWithRejection(stream, r);
      });
    }
    function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
      const controller = Object.create(WritableStreamDefaultController.prototype);
      let startAlgorithm = () => void 0;
      let writeAlgorithm = () => promiseResolvedWith(void 0);
      let closeAlgorithm = () => promiseResolvedWith(void 0);
      let abortAlgorithm = () => promiseResolvedWith(void 0);
      if (underlyingSink.start !== void 0) {
        startAlgorithm = () => underlyingSink.start(controller);
      }
      if (underlyingSink.write !== void 0) {
        writeAlgorithm = (chunk) => underlyingSink.write(chunk, controller);
      }
      if (underlyingSink.close !== void 0) {
        closeAlgorithm = () => underlyingSink.close();
      }
      if (underlyingSink.abort !== void 0) {
        abortAlgorithm = (reason) => underlyingSink.abort(reason);
      }
      SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
    }
    function WritableStreamDefaultControllerClearAlgorithms(controller) {
      controller._writeAlgorithm = void 0;
      controller._closeAlgorithm = void 0;
      controller._abortAlgorithm = void 0;
      controller._strategySizeAlgorithm = void 0;
    }
    function WritableStreamDefaultControllerClose(controller) {
      EnqueueValueWithSize(controller, closeSentinel, 0);
      WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
    }
    function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
      try {
        return controller._strategySizeAlgorithm(chunk);
      } catch (chunkSizeE) {
        WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
        return 1;
      }
    }
    function WritableStreamDefaultControllerGetDesiredSize(controller) {
      return controller._strategyHWM - controller._queueTotalSize;
    }
    function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
      try {
        EnqueueValueWithSize(controller, chunk, chunkSize);
      } catch (enqueueE) {
        WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
        return;
      }
      const stream = controller._controlledWritableStream;
      if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === "writable") {
        const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
        WritableStreamUpdateBackpressure(stream, backpressure);
      }
      WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
    }
    function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
      const stream = controller._controlledWritableStream;
      if (!controller._started) {
        return;
      }
      if (stream._inFlightWriteRequest !== void 0) {
        return;
      }
      const state = stream._state;
      if (state === "erroring") {
        WritableStreamFinishErroring(stream);
        return;
      }
      if (controller._queue.length === 0) {
        return;
      }
      const value = PeekQueueValue(controller);
      if (value === closeSentinel) {
        WritableStreamDefaultControllerProcessClose(controller);
      } else {
        WritableStreamDefaultControllerProcessWrite(controller, value);
      }
    }
    function WritableStreamDefaultControllerErrorIfNeeded(controller, error2) {
      if (controller._controlledWritableStream._state === "writable") {
        WritableStreamDefaultControllerError(controller, error2);
      }
    }
    function WritableStreamDefaultControllerProcessClose(controller) {
      const stream = controller._controlledWritableStream;
      WritableStreamMarkCloseRequestInFlight(stream);
      DequeueValue(controller);
      const sinkClosePromise = controller._closeAlgorithm();
      WritableStreamDefaultControllerClearAlgorithms(controller);
      uponPromise(sinkClosePromise, () => {
        WritableStreamFinishInFlightClose(stream);
      }, (reason) => {
        WritableStreamFinishInFlightCloseWithError(stream, reason);
      });
    }
    function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
      const stream = controller._controlledWritableStream;
      WritableStreamMarkFirstWriteRequestInFlight(stream);
      const sinkWritePromise = controller._writeAlgorithm(chunk);
      uponPromise(sinkWritePromise, () => {
        WritableStreamFinishInFlightWrite(stream);
        const state = stream._state;
        DequeueValue(controller);
        if (!WritableStreamCloseQueuedOrInFlight(stream) && state === "writable") {
          const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
          WritableStreamUpdateBackpressure(stream, backpressure);
        }
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
      }, (reason) => {
        if (stream._state === "writable") {
          WritableStreamDefaultControllerClearAlgorithms(controller);
        }
        WritableStreamFinishInFlightWriteWithError(stream, reason);
      });
    }
    function WritableStreamDefaultControllerGetBackpressure(controller) {
      const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
      return desiredSize <= 0;
    }
    function WritableStreamDefaultControllerError(controller, error2) {
      const stream = controller._controlledWritableStream;
      WritableStreamDefaultControllerClearAlgorithms(controller);
      WritableStreamStartErroring(stream, error2);
    }
    function streamBrandCheckException$2(name) {
      return new TypeError(`WritableStream.prototype.${name} can only be used on a WritableStream`);
    }
    function defaultControllerBrandCheckException$2(name) {
      return new TypeError(`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`);
    }
    function defaultWriterBrandCheckException(name) {
      return new TypeError(`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`);
    }
    function defaultWriterLockException(name) {
      return new TypeError("Cannot " + name + " a stream using a released writer");
    }
    function defaultWriterClosedPromiseInitialize(writer) {
      writer._closedPromise = newPromise((resolve2, reject) => {
        writer._closedPromise_resolve = resolve2;
        writer._closedPromise_reject = reject;
        writer._closedPromiseState = "pending";
      });
    }
    function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
      defaultWriterClosedPromiseInitialize(writer);
      defaultWriterClosedPromiseReject(writer, reason);
    }
    function defaultWriterClosedPromiseInitializeAsResolved(writer) {
      defaultWriterClosedPromiseInitialize(writer);
      defaultWriterClosedPromiseResolve(writer);
    }
    function defaultWriterClosedPromiseReject(writer, reason) {
      if (writer._closedPromise_reject === void 0) {
        return;
      }
      setPromiseIsHandledToTrue(writer._closedPromise);
      writer._closedPromise_reject(reason);
      writer._closedPromise_resolve = void 0;
      writer._closedPromise_reject = void 0;
      writer._closedPromiseState = "rejected";
    }
    function defaultWriterClosedPromiseResetToRejected(writer, reason) {
      defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
    }
    function defaultWriterClosedPromiseResolve(writer) {
      if (writer._closedPromise_resolve === void 0) {
        return;
      }
      writer._closedPromise_resolve(void 0);
      writer._closedPromise_resolve = void 0;
      writer._closedPromise_reject = void 0;
      writer._closedPromiseState = "resolved";
    }
    function defaultWriterReadyPromiseInitialize(writer) {
      writer._readyPromise = newPromise((resolve2, reject) => {
        writer._readyPromise_resolve = resolve2;
        writer._readyPromise_reject = reject;
      });
      writer._readyPromiseState = "pending";
    }
    function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
      defaultWriterReadyPromiseInitialize(writer);
      defaultWriterReadyPromiseReject(writer, reason);
    }
    function defaultWriterReadyPromiseInitializeAsResolved(writer) {
      defaultWriterReadyPromiseInitialize(writer);
      defaultWriterReadyPromiseResolve(writer);
    }
    function defaultWriterReadyPromiseReject(writer, reason) {
      if (writer._readyPromise_reject === void 0) {
        return;
      }
      setPromiseIsHandledToTrue(writer._readyPromise);
      writer._readyPromise_reject(reason);
      writer._readyPromise_resolve = void 0;
      writer._readyPromise_reject = void 0;
      writer._readyPromiseState = "rejected";
    }
    function defaultWriterReadyPromiseReset(writer) {
      defaultWriterReadyPromiseInitialize(writer);
    }
    function defaultWriterReadyPromiseResetToRejected(writer, reason) {
      defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
    }
    function defaultWriterReadyPromiseResolve(writer) {
      if (writer._readyPromise_resolve === void 0) {
        return;
      }
      writer._readyPromise_resolve(void 0);
      writer._readyPromise_resolve = void 0;
      writer._readyPromise_reject = void 0;
      writer._readyPromiseState = "fulfilled";
    }
    const NativeDOMException = typeof DOMException !== "undefined" ? DOMException : void 0;
    function isDOMExceptionConstructor(ctor) {
      if (!(typeof ctor === "function" || typeof ctor === "object")) {
        return false;
      }
      try {
        new ctor();
        return true;
      } catch (_a) {
        return false;
      }
    }
    function createDOMExceptionPolyfill() {
      const ctor = function DOMException2(message, name) {
        this.message = message || "";
        this.name = name || "Error";
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
        }
      };
      ctor.prototype = Object.create(Error.prototype);
      Object.defineProperty(ctor.prototype, "constructor", { value: ctor, writable: true, configurable: true });
      return ctor;
    }
    const DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();
    function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
      const reader = AcquireReadableStreamDefaultReader(source);
      const writer = AcquireWritableStreamDefaultWriter(dest);
      source._disturbed = true;
      let shuttingDown = false;
      let currentWrite = promiseResolvedWith(void 0);
      return newPromise((resolve2, reject) => {
        let abortAlgorithm;
        if (signal !== void 0) {
          abortAlgorithm = () => {
            const error2 = new DOMException$1("Aborted", "AbortError");
            const actions = [];
            if (!preventAbort) {
              actions.push(() => {
                if (dest._state === "writable") {
                  return WritableStreamAbort(dest, error2);
                }
                return promiseResolvedWith(void 0);
              });
            }
            if (!preventCancel) {
              actions.push(() => {
                if (source._state === "readable") {
                  return ReadableStreamCancel(source, error2);
                }
                return promiseResolvedWith(void 0);
              });
            }
            shutdownWithAction(() => Promise.all(actions.map((action) => action())), true, error2);
          };
          if (signal.aborted) {
            abortAlgorithm();
            return;
          }
          signal.addEventListener("abort", abortAlgorithm);
        }
        function pipeLoop() {
          return newPromise((resolveLoop, rejectLoop) => {
            function next(done) {
              if (done) {
                resolveLoop();
              } else {
                PerformPromiseThen(pipeStep(), next, rejectLoop);
              }
            }
            next(false);
          });
        }
        function pipeStep() {
          if (shuttingDown) {
            return promiseResolvedWith(true);
          }
          return PerformPromiseThen(writer._readyPromise, () => {
            return newPromise((resolveRead, rejectRead) => {
              ReadableStreamDefaultReaderRead(reader, {
                _chunkSteps: (chunk) => {
                  currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), void 0, noop2);
                  resolveRead(false);
                },
                _closeSteps: () => resolveRead(true),
                _errorSteps: rejectRead
              });
            });
          });
        }
        isOrBecomesErrored(source, reader._closedPromise, (storedError) => {
          if (!preventAbort) {
            shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
          } else {
            shutdown(true, storedError);
          }
        });
        isOrBecomesErrored(dest, writer._closedPromise, (storedError) => {
          if (!preventCancel) {
            shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
          } else {
            shutdown(true, storedError);
          }
        });
        isOrBecomesClosed(source, reader._closedPromise, () => {
          if (!preventClose) {
            shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
          } else {
            shutdown();
          }
        });
        if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === "closed") {
          const destClosed = new TypeError("the destination writable stream closed before all data could be piped to it");
          if (!preventCancel) {
            shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
          } else {
            shutdown(true, destClosed);
          }
        }
        setPromiseIsHandledToTrue(pipeLoop());
        function waitForWritesToFinish() {
          const oldCurrentWrite = currentWrite;
          return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : void 0);
        }
        function isOrBecomesErrored(stream, promise, action) {
          if (stream._state === "errored") {
            action(stream._storedError);
          } else {
            uponRejection(promise, action);
          }
        }
        function isOrBecomesClosed(stream, promise, action) {
          if (stream._state === "closed") {
            action();
          } else {
            uponFulfillment(promise, action);
          }
        }
        function shutdownWithAction(action, originalIsError, originalError) {
          if (shuttingDown) {
            return;
          }
          shuttingDown = true;
          if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
            uponFulfillment(waitForWritesToFinish(), doTheRest);
          } else {
            doTheRest();
          }
          function doTheRest() {
            uponPromise(action(), () => finalize(originalIsError, originalError), (newError) => finalize(true, newError));
          }
        }
        function shutdown(isError, error2) {
          if (shuttingDown) {
            return;
          }
          shuttingDown = true;
          if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
            uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error2));
          } else {
            finalize(isError, error2);
          }
        }
        function finalize(isError, error2) {
          WritableStreamDefaultWriterRelease(writer);
          ReadableStreamReaderGenericRelease(reader);
          if (signal !== void 0) {
            signal.removeEventListener("abort", abortAlgorithm);
          }
          if (isError) {
            reject(error2);
          } else {
            resolve2(void 0);
          }
        }
      });
    }
    class ReadableStreamDefaultController {
      constructor() {
        throw new TypeError("Illegal constructor");
      }
      get desiredSize() {
        if (!IsReadableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$1("desiredSize");
        }
        return ReadableStreamDefaultControllerGetDesiredSize(this);
      }
      close() {
        if (!IsReadableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$1("close");
        }
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
          throw new TypeError("The stream is not in a state that permits close");
        }
        ReadableStreamDefaultControllerClose(this);
      }
      enqueue(chunk = void 0) {
        if (!IsReadableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$1("enqueue");
        }
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
          throw new TypeError("The stream is not in a state that permits enqueue");
        }
        return ReadableStreamDefaultControllerEnqueue(this, chunk);
      }
      error(e = void 0) {
        if (!IsReadableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$1("error");
        }
        ReadableStreamDefaultControllerError(this, e);
      }
      [CancelSteps](reason) {
        ResetQueue(this);
        const result = this._cancelAlgorithm(reason);
        ReadableStreamDefaultControllerClearAlgorithms(this);
        return result;
      }
      [PullSteps](readRequest) {
        const stream = this._controlledReadableStream;
        if (this._queue.length > 0) {
          const chunk = DequeueValue(this);
          if (this._closeRequested && this._queue.length === 0) {
            ReadableStreamDefaultControllerClearAlgorithms(this);
            ReadableStreamClose(stream);
          } else {
            ReadableStreamDefaultControllerCallPullIfNeeded(this);
          }
          readRequest._chunkSteps(chunk);
        } else {
          ReadableStreamAddReadRequest(stream, readRequest);
          ReadableStreamDefaultControllerCallPullIfNeeded(this);
        }
      }
    }
    Object.defineProperties(ReadableStreamDefaultController.prototype, {
      close: { enumerable: true },
      enqueue: { enumerable: true },
      error: { enumerable: true },
      desiredSize: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableStreamDefaultController",
        configurable: true
      });
    }
    function IsReadableStreamDefaultController(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_controlledReadableStream")) {
        return false;
      }
      return x instanceof ReadableStreamDefaultController;
    }
    function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
      const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
      if (!shouldPull) {
        return;
      }
      if (controller._pulling) {
        controller._pullAgain = true;
        return;
      }
      controller._pulling = true;
      const pullPromise = controller._pullAlgorithm();
      uponPromise(pullPromise, () => {
        controller._pulling = false;
        if (controller._pullAgain) {
          controller._pullAgain = false;
          ReadableStreamDefaultControllerCallPullIfNeeded(controller);
        }
      }, (e) => {
        ReadableStreamDefaultControllerError(controller, e);
      });
    }
    function ReadableStreamDefaultControllerShouldCallPull(controller) {
      const stream = controller._controlledReadableStream;
      if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
        return false;
      }
      if (!controller._started) {
        return false;
      }
      if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
        return true;
      }
      const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
      if (desiredSize > 0) {
        return true;
      }
      return false;
    }
    function ReadableStreamDefaultControllerClearAlgorithms(controller) {
      controller._pullAlgorithm = void 0;
      controller._cancelAlgorithm = void 0;
      controller._strategySizeAlgorithm = void 0;
    }
    function ReadableStreamDefaultControllerClose(controller) {
      if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
        return;
      }
      const stream = controller._controlledReadableStream;
      controller._closeRequested = true;
      if (controller._queue.length === 0) {
        ReadableStreamDefaultControllerClearAlgorithms(controller);
        ReadableStreamClose(stream);
      }
    }
    function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
      if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
        return;
      }
      const stream = controller._controlledReadableStream;
      if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
        ReadableStreamFulfillReadRequest(stream, chunk, false);
      } else {
        let chunkSize;
        try {
          chunkSize = controller._strategySizeAlgorithm(chunk);
        } catch (chunkSizeE) {
          ReadableStreamDefaultControllerError(controller, chunkSizeE);
          throw chunkSizeE;
        }
        try {
          EnqueueValueWithSize(controller, chunk, chunkSize);
        } catch (enqueueE) {
          ReadableStreamDefaultControllerError(controller, enqueueE);
          throw enqueueE;
        }
      }
      ReadableStreamDefaultControllerCallPullIfNeeded(controller);
    }
    function ReadableStreamDefaultControllerError(controller, e) {
      const stream = controller._controlledReadableStream;
      if (stream._state !== "readable") {
        return;
      }
      ResetQueue(controller);
      ReadableStreamDefaultControllerClearAlgorithms(controller);
      ReadableStreamError(stream, e);
    }
    function ReadableStreamDefaultControllerGetDesiredSize(controller) {
      const state = controller._controlledReadableStream._state;
      if (state === "errored") {
        return null;
      }
      if (state === "closed") {
        return 0;
      }
      return controller._strategyHWM - controller._queueTotalSize;
    }
    function ReadableStreamDefaultControllerHasBackpressure(controller) {
      if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
        return false;
      }
      return true;
    }
    function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
      const state = controller._controlledReadableStream._state;
      if (!controller._closeRequested && state === "readable") {
        return true;
      }
      return false;
    }
    function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
      controller._controlledReadableStream = stream;
      controller._queue = void 0;
      controller._queueTotalSize = void 0;
      ResetQueue(controller);
      controller._started = false;
      controller._closeRequested = false;
      controller._pullAgain = false;
      controller._pulling = false;
      controller._strategySizeAlgorithm = sizeAlgorithm;
      controller._strategyHWM = highWaterMark;
      controller._pullAlgorithm = pullAlgorithm;
      controller._cancelAlgorithm = cancelAlgorithm;
      stream._readableStreamController = controller;
      const startResult = startAlgorithm();
      uponPromise(promiseResolvedWith(startResult), () => {
        controller._started = true;
        ReadableStreamDefaultControllerCallPullIfNeeded(controller);
      }, (r) => {
        ReadableStreamDefaultControllerError(controller, r);
      });
    }
    function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
      const controller = Object.create(ReadableStreamDefaultController.prototype);
      let startAlgorithm = () => void 0;
      let pullAlgorithm = () => promiseResolvedWith(void 0);
      let cancelAlgorithm = () => promiseResolvedWith(void 0);
      if (underlyingSource.start !== void 0) {
        startAlgorithm = () => underlyingSource.start(controller);
      }
      if (underlyingSource.pull !== void 0) {
        pullAlgorithm = () => underlyingSource.pull(controller);
      }
      if (underlyingSource.cancel !== void 0) {
        cancelAlgorithm = (reason) => underlyingSource.cancel(reason);
      }
      SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
    }
    function defaultControllerBrandCheckException$1(name) {
      return new TypeError(`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`);
    }
    function ReadableStreamTee(stream, cloneForBranch2) {
      if (IsReadableByteStreamController(stream._readableStreamController)) {
        return ReadableByteStreamTee(stream);
      }
      return ReadableStreamDefaultTee(stream);
    }
    function ReadableStreamDefaultTee(stream, cloneForBranch2) {
      const reader = AcquireReadableStreamDefaultReader(stream);
      let reading = false;
      let canceled1 = false;
      let canceled2 = false;
      let reason1;
      let reason2;
      let branch1;
      let branch2;
      let resolveCancelPromise;
      const cancelPromise = newPromise((resolve2) => {
        resolveCancelPromise = resolve2;
      });
      function pullAlgorithm() {
        if (reading) {
          return promiseResolvedWith(void 0);
        }
        reading = true;
        const readRequest = {
          _chunkSteps: (chunk) => {
            queueMicrotask(() => {
              reading = false;
              const chunk1 = chunk;
              const chunk2 = chunk;
              if (!canceled1) {
                ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
              }
              if (!canceled2) {
                ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
              }
            });
          },
          _closeSteps: () => {
            reading = false;
            if (!canceled1) {
              ReadableStreamDefaultControllerClose(branch1._readableStreamController);
            }
            if (!canceled2) {
              ReadableStreamDefaultControllerClose(branch2._readableStreamController);
            }
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          },
          _errorSteps: () => {
            reading = false;
          }
        };
        ReadableStreamDefaultReaderRead(reader, readRequest);
        return promiseResolvedWith(void 0);
      }
      function cancel1Algorithm(reason) {
        canceled1 = true;
        reason1 = reason;
        if (canceled2) {
          const compositeReason = CreateArrayFromList([reason1, reason2]);
          const cancelResult = ReadableStreamCancel(stream, compositeReason);
          resolveCancelPromise(cancelResult);
        }
        return cancelPromise;
      }
      function cancel2Algorithm(reason) {
        canceled2 = true;
        reason2 = reason;
        if (canceled1) {
          const compositeReason = CreateArrayFromList([reason1, reason2]);
          const cancelResult = ReadableStreamCancel(stream, compositeReason);
          resolveCancelPromise(cancelResult);
        }
        return cancelPromise;
      }
      function startAlgorithm() {
      }
      branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
      branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
      uponRejection(reader._closedPromise, (r) => {
        ReadableStreamDefaultControllerError(branch1._readableStreamController, r);
        ReadableStreamDefaultControllerError(branch2._readableStreamController, r);
        if (!canceled1 || !canceled2) {
          resolveCancelPromise(void 0);
        }
      });
      return [branch1, branch2];
    }
    function ReadableByteStreamTee(stream) {
      let reader = AcquireReadableStreamDefaultReader(stream);
      let reading = false;
      let canceled1 = false;
      let canceled2 = false;
      let reason1;
      let reason2;
      let branch1;
      let branch2;
      let resolveCancelPromise;
      const cancelPromise = newPromise((resolve2) => {
        resolveCancelPromise = resolve2;
      });
      function forwardReaderError(thisReader) {
        uponRejection(thisReader._closedPromise, (r) => {
          if (thisReader !== reader) {
            return;
          }
          ReadableByteStreamControllerError(branch1._readableStreamController, r);
          ReadableByteStreamControllerError(branch2._readableStreamController, r);
          if (!canceled1 || !canceled2) {
            resolveCancelPromise(void 0);
          }
        });
      }
      function pullWithDefaultReader() {
        if (IsReadableStreamBYOBReader(reader)) {
          ReadableStreamReaderGenericRelease(reader);
          reader = AcquireReadableStreamDefaultReader(stream);
          forwardReaderError(reader);
        }
        const readRequest = {
          _chunkSteps: (chunk) => {
            queueMicrotask(() => {
              reading = false;
              const chunk1 = chunk;
              let chunk2 = chunk;
              if (!canceled1 && !canceled2) {
                try {
                  chunk2 = CloneAsUint8Array(chunk);
                } catch (cloneE) {
                  ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
                  ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
                  resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                  return;
                }
              }
              if (!canceled1) {
                ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
              }
              if (!canceled2) {
                ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
              }
            });
          },
          _closeSteps: () => {
            reading = false;
            if (!canceled1) {
              ReadableByteStreamControllerClose(branch1._readableStreamController);
            }
            if (!canceled2) {
              ReadableByteStreamControllerClose(branch2._readableStreamController);
            }
            if (branch1._readableStreamController._pendingPullIntos.length > 0) {
              ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
            }
            if (branch2._readableStreamController._pendingPullIntos.length > 0) {
              ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
            }
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          },
          _errorSteps: () => {
            reading = false;
          }
        };
        ReadableStreamDefaultReaderRead(reader, readRequest);
      }
      function pullWithBYOBReader(view, forBranch2) {
        if (IsReadableStreamDefaultReader(reader)) {
          ReadableStreamReaderGenericRelease(reader);
          reader = AcquireReadableStreamBYOBReader(stream);
          forwardReaderError(reader);
        }
        const byobBranch = forBranch2 ? branch2 : branch1;
        const otherBranch = forBranch2 ? branch1 : branch2;
        const readIntoRequest = {
          _chunkSteps: (chunk) => {
            queueMicrotask(() => {
              reading = false;
              const byobCanceled = forBranch2 ? canceled2 : canceled1;
              const otherCanceled = forBranch2 ? canceled1 : canceled2;
              if (!otherCanceled) {
                let clonedChunk;
                try {
                  clonedChunk = CloneAsUint8Array(chunk);
                } catch (cloneE) {
                  ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
                  ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
                  resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                  return;
                }
                if (!byobCanceled) {
                  ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                }
                ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
              } else if (!byobCanceled) {
                ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
              }
            });
          },
          _closeSteps: (chunk) => {
            reading = false;
            const byobCanceled = forBranch2 ? canceled2 : canceled1;
            const otherCanceled = forBranch2 ? canceled1 : canceled2;
            if (!byobCanceled) {
              ReadableByteStreamControllerClose(byobBranch._readableStreamController);
            }
            if (!otherCanceled) {
              ReadableByteStreamControllerClose(otherBranch._readableStreamController);
            }
            if (chunk !== void 0) {
              if (!byobCanceled) {
                ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
              }
              if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
              }
            }
            if (!byobCanceled || !otherCanceled) {
              resolveCancelPromise(void 0);
            }
          },
          _errorSteps: () => {
            reading = false;
          }
        };
        ReadableStreamBYOBReaderRead(reader, view, readIntoRequest);
      }
      function pull1Algorithm() {
        if (reading) {
          return promiseResolvedWith(void 0);
        }
        reading = true;
        const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
        if (byobRequest === null) {
          pullWithDefaultReader();
        } else {
          pullWithBYOBReader(byobRequest._view, false);
        }
        return promiseResolvedWith(void 0);
      }
      function pull2Algorithm() {
        if (reading) {
          return promiseResolvedWith(void 0);
        }
        reading = true;
        const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
        if (byobRequest === null) {
          pullWithDefaultReader();
        } else {
          pullWithBYOBReader(byobRequest._view, true);
        }
        return promiseResolvedWith(void 0);
      }
      function cancel1Algorithm(reason) {
        canceled1 = true;
        reason1 = reason;
        if (canceled2) {
          const compositeReason = CreateArrayFromList([reason1, reason2]);
          const cancelResult = ReadableStreamCancel(stream, compositeReason);
          resolveCancelPromise(cancelResult);
        }
        return cancelPromise;
      }
      function cancel2Algorithm(reason) {
        canceled2 = true;
        reason2 = reason;
        if (canceled1) {
          const compositeReason = CreateArrayFromList([reason1, reason2]);
          const cancelResult = ReadableStreamCancel(stream, compositeReason);
          resolveCancelPromise(cancelResult);
        }
        return cancelPromise;
      }
      function startAlgorithm() {
        return;
      }
      branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
      branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
      forwardReaderError(reader);
      return [branch1, branch2];
    }
    function convertUnderlyingDefaultOrByteSource(source, context) {
      assertDictionary(source, context);
      const original = source;
      const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
      const cancel = original === null || original === void 0 ? void 0 : original.cancel;
      const pull = original === null || original === void 0 ? void 0 : original.pull;
      const start = original === null || original === void 0 ? void 0 : original.start;
      const type = original === null || original === void 0 ? void 0 : original.type;
      return {
        autoAllocateChunkSize: autoAllocateChunkSize === void 0 ? void 0 : convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
        cancel: cancel === void 0 ? void 0 : convertUnderlyingSourceCancelCallback(cancel, original, `${context} has member 'cancel' that`),
        pull: pull === void 0 ? void 0 : convertUnderlyingSourcePullCallback(pull, original, `${context} has member 'pull' that`),
        start: start === void 0 ? void 0 : convertUnderlyingSourceStartCallback(start, original, `${context} has member 'start' that`),
        type: type === void 0 ? void 0 : convertReadableStreamType(type, `${context} has member 'type' that`)
      };
    }
    function convertUnderlyingSourceCancelCallback(fn, original, context) {
      assertFunction(fn, context);
      return (reason) => promiseCall(fn, original, [reason]);
    }
    function convertUnderlyingSourcePullCallback(fn, original, context) {
      assertFunction(fn, context);
      return (controller) => promiseCall(fn, original, [controller]);
    }
    function convertUnderlyingSourceStartCallback(fn, original, context) {
      assertFunction(fn, context);
      return (controller) => reflectCall(fn, original, [controller]);
    }
    function convertReadableStreamType(type, context) {
      type = `${type}`;
      if (type !== "bytes") {
        throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
      }
      return type;
    }
    function convertReaderOptions(options2, context) {
      assertDictionary(options2, context);
      const mode = options2 === null || options2 === void 0 ? void 0 : options2.mode;
      return {
        mode: mode === void 0 ? void 0 : convertReadableStreamReaderMode(mode, `${context} has member 'mode' that`)
      };
    }
    function convertReadableStreamReaderMode(mode, context) {
      mode = `${mode}`;
      if (mode !== "byob") {
        throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
      }
      return mode;
    }
    function convertIteratorOptions(options2, context) {
      assertDictionary(options2, context);
      const preventCancel = options2 === null || options2 === void 0 ? void 0 : options2.preventCancel;
      return { preventCancel: Boolean(preventCancel) };
    }
    function convertPipeOptions(options2, context) {
      assertDictionary(options2, context);
      const preventAbort = options2 === null || options2 === void 0 ? void 0 : options2.preventAbort;
      const preventCancel = options2 === null || options2 === void 0 ? void 0 : options2.preventCancel;
      const preventClose = options2 === null || options2 === void 0 ? void 0 : options2.preventClose;
      const signal = options2 === null || options2 === void 0 ? void 0 : options2.signal;
      if (signal !== void 0) {
        assertAbortSignal(signal, `${context} has member 'signal' that`);
      }
      return {
        preventAbort: Boolean(preventAbort),
        preventCancel: Boolean(preventCancel),
        preventClose: Boolean(preventClose),
        signal
      };
    }
    function assertAbortSignal(signal, context) {
      if (!isAbortSignal2(signal)) {
        throw new TypeError(`${context} is not an AbortSignal.`);
      }
    }
    function convertReadableWritablePair(pair, context) {
      assertDictionary(pair, context);
      const readable2 = pair === null || pair === void 0 ? void 0 : pair.readable;
      assertRequiredField(readable2, "readable", "ReadableWritablePair");
      assertReadableStream(readable2, `${context} has member 'readable' that`);
      const writable2 = pair === null || pair === void 0 ? void 0 : pair.writable;
      assertRequiredField(writable2, "writable", "ReadableWritablePair");
      assertWritableStream(writable2, `${context} has member 'writable' that`);
      return { readable: readable2, writable: writable2 };
    }
    class ReadableStream2 {
      constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
        if (rawUnderlyingSource === void 0) {
          rawUnderlyingSource = null;
        } else {
          assertObject(rawUnderlyingSource, "First parameter");
        }
        const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
        const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, "First parameter");
        InitializeReadableStream(this);
        if (underlyingSource.type === "bytes") {
          if (strategy.size !== void 0) {
            throw new RangeError("The strategy for a byte stream cannot have a size function");
          }
          const highWaterMark = ExtractHighWaterMark(strategy, 0);
          SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
        } else {
          const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
          const highWaterMark = ExtractHighWaterMark(strategy, 1);
          SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
        }
      }
      get locked() {
        if (!IsReadableStream(this)) {
          throw streamBrandCheckException$1("locked");
        }
        return IsReadableStreamLocked(this);
      }
      cancel(reason = void 0) {
        if (!IsReadableStream(this)) {
          return promiseRejectedWith(streamBrandCheckException$1("cancel"));
        }
        if (IsReadableStreamLocked(this)) {
          return promiseRejectedWith(new TypeError("Cannot cancel a stream that already has a reader"));
        }
        return ReadableStreamCancel(this, reason);
      }
      getReader(rawOptions = void 0) {
        if (!IsReadableStream(this)) {
          throw streamBrandCheckException$1("getReader");
        }
        const options2 = convertReaderOptions(rawOptions, "First parameter");
        if (options2.mode === void 0) {
          return AcquireReadableStreamDefaultReader(this);
        }
        return AcquireReadableStreamBYOBReader(this);
      }
      pipeThrough(rawTransform, rawOptions = {}) {
        if (!IsReadableStream(this)) {
          throw streamBrandCheckException$1("pipeThrough");
        }
        assertRequiredArgument(rawTransform, 1, "pipeThrough");
        const transform = convertReadableWritablePair(rawTransform, "First parameter");
        const options2 = convertPipeOptions(rawOptions, "Second parameter");
        if (IsReadableStreamLocked(this)) {
          throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
        }
        if (IsWritableStreamLocked(transform.writable)) {
          throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
        }
        const promise = ReadableStreamPipeTo(this, transform.writable, options2.preventClose, options2.preventAbort, options2.preventCancel, options2.signal);
        setPromiseIsHandledToTrue(promise);
        return transform.readable;
      }
      pipeTo(destination, rawOptions = {}) {
        if (!IsReadableStream(this)) {
          return promiseRejectedWith(streamBrandCheckException$1("pipeTo"));
        }
        if (destination === void 0) {
          return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
        }
        if (!IsWritableStream(destination)) {
          return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
        }
        let options2;
        try {
          options2 = convertPipeOptions(rawOptions, "Second parameter");
        } catch (e) {
          return promiseRejectedWith(e);
        }
        if (IsReadableStreamLocked(this)) {
          return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));
        }
        if (IsWritableStreamLocked(destination)) {
          return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));
        }
        return ReadableStreamPipeTo(this, destination, options2.preventClose, options2.preventAbort, options2.preventCancel, options2.signal);
      }
      tee() {
        if (!IsReadableStream(this)) {
          throw streamBrandCheckException$1("tee");
        }
        const branches = ReadableStreamTee(this);
        return CreateArrayFromList(branches);
      }
      values(rawOptions = void 0) {
        if (!IsReadableStream(this)) {
          throw streamBrandCheckException$1("values");
        }
        const options2 = convertIteratorOptions(rawOptions, "First parameter");
        return AcquireReadableStreamAsyncIterator(this, options2.preventCancel);
      }
    }
    Object.defineProperties(ReadableStream2.prototype, {
      cancel: { enumerable: true },
      getReader: { enumerable: true },
      pipeThrough: { enumerable: true },
      pipeTo: { enumerable: true },
      tee: { enumerable: true },
      values: { enumerable: true },
      locked: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableStream",
        configurable: true
      });
    }
    if (typeof SymbolPolyfill.asyncIterator === "symbol") {
      Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.asyncIterator, {
        value: ReadableStream2.prototype.values,
        writable: true,
        configurable: true
      });
    }
    function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
      const stream = Object.create(ReadableStream2.prototype);
      InitializeReadableStream(stream);
      const controller = Object.create(ReadableStreamDefaultController.prototype);
      SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
      return stream;
    }
    function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
      const stream = Object.create(ReadableStream2.prototype);
      InitializeReadableStream(stream);
      const controller = Object.create(ReadableByteStreamController.prototype);
      SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, void 0);
      return stream;
    }
    function InitializeReadableStream(stream) {
      stream._state = "readable";
      stream._reader = void 0;
      stream._storedError = void 0;
      stream._disturbed = false;
    }
    function IsReadableStream(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_readableStreamController")) {
        return false;
      }
      return x instanceof ReadableStream2;
    }
    function IsReadableStreamLocked(stream) {
      if (stream._reader === void 0) {
        return false;
      }
      return true;
    }
    function ReadableStreamCancel(stream, reason) {
      stream._disturbed = true;
      if (stream._state === "closed") {
        return promiseResolvedWith(void 0);
      }
      if (stream._state === "errored") {
        return promiseRejectedWith(stream._storedError);
      }
      ReadableStreamClose(stream);
      const reader = stream._reader;
      if (reader !== void 0 && IsReadableStreamBYOBReader(reader)) {
        reader._readIntoRequests.forEach((readIntoRequest) => {
          readIntoRequest._closeSteps(void 0);
        });
        reader._readIntoRequests = new SimpleQueue();
      }
      const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
      return transformPromiseWith(sourceCancelPromise, noop2);
    }
    function ReadableStreamClose(stream) {
      stream._state = "closed";
      const reader = stream._reader;
      if (reader === void 0) {
        return;
      }
      defaultReaderClosedPromiseResolve(reader);
      if (IsReadableStreamDefaultReader(reader)) {
        reader._readRequests.forEach((readRequest) => {
          readRequest._closeSteps();
        });
        reader._readRequests = new SimpleQueue();
      }
    }
    function ReadableStreamError(stream, e) {
      stream._state = "errored";
      stream._storedError = e;
      const reader = stream._reader;
      if (reader === void 0) {
        return;
      }
      defaultReaderClosedPromiseReject(reader, e);
      if (IsReadableStreamDefaultReader(reader)) {
        reader._readRequests.forEach((readRequest) => {
          readRequest._errorSteps(e);
        });
        reader._readRequests = new SimpleQueue();
      } else {
        reader._readIntoRequests.forEach((readIntoRequest) => {
          readIntoRequest._errorSteps(e);
        });
        reader._readIntoRequests = new SimpleQueue();
      }
    }
    function streamBrandCheckException$1(name) {
      return new TypeError(`ReadableStream.prototype.${name} can only be used on a ReadableStream`);
    }
    function convertQueuingStrategyInit(init2, context) {
      assertDictionary(init2, context);
      const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
      assertRequiredField(highWaterMark, "highWaterMark", "QueuingStrategyInit");
      return {
        highWaterMark: convertUnrestrictedDouble(highWaterMark)
      };
    }
    const byteLengthSizeFunction = (chunk) => {
      return chunk.byteLength;
    };
    Object.defineProperty(byteLengthSizeFunction, "name", {
      value: "size",
      configurable: true
    });
    class ByteLengthQueuingStrategy {
      constructor(options2) {
        assertRequiredArgument(options2, 1, "ByteLengthQueuingStrategy");
        options2 = convertQueuingStrategyInit(options2, "First parameter");
        this._byteLengthQueuingStrategyHighWaterMark = options2.highWaterMark;
      }
      get highWaterMark() {
        if (!IsByteLengthQueuingStrategy(this)) {
          throw byteLengthBrandCheckException("highWaterMark");
        }
        return this._byteLengthQueuingStrategyHighWaterMark;
      }
      get size() {
        if (!IsByteLengthQueuingStrategy(this)) {
          throw byteLengthBrandCheckException("size");
        }
        return byteLengthSizeFunction;
      }
    }
    Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
      highWaterMark: { enumerable: true },
      size: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
        value: "ByteLengthQueuingStrategy",
        configurable: true
      });
    }
    function byteLengthBrandCheckException(name) {
      return new TypeError(`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`);
    }
    function IsByteLengthQueuingStrategy(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_byteLengthQueuingStrategyHighWaterMark")) {
        return false;
      }
      return x instanceof ByteLengthQueuingStrategy;
    }
    const countSizeFunction = () => {
      return 1;
    };
    Object.defineProperty(countSizeFunction, "name", {
      value: "size",
      configurable: true
    });
    class CountQueuingStrategy {
      constructor(options2) {
        assertRequiredArgument(options2, 1, "CountQueuingStrategy");
        options2 = convertQueuingStrategyInit(options2, "First parameter");
        this._countQueuingStrategyHighWaterMark = options2.highWaterMark;
      }
      get highWaterMark() {
        if (!IsCountQueuingStrategy(this)) {
          throw countBrandCheckException("highWaterMark");
        }
        return this._countQueuingStrategyHighWaterMark;
      }
      get size() {
        if (!IsCountQueuingStrategy(this)) {
          throw countBrandCheckException("size");
        }
        return countSizeFunction;
      }
    }
    Object.defineProperties(CountQueuingStrategy.prototype, {
      highWaterMark: { enumerable: true },
      size: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
        value: "CountQueuingStrategy",
        configurable: true
      });
    }
    function countBrandCheckException(name) {
      return new TypeError(`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`);
    }
    function IsCountQueuingStrategy(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_countQueuingStrategyHighWaterMark")) {
        return false;
      }
      return x instanceof CountQueuingStrategy;
    }
    function convertTransformer(original, context) {
      assertDictionary(original, context);
      const flush2 = original === null || original === void 0 ? void 0 : original.flush;
      const readableType = original === null || original === void 0 ? void 0 : original.readableType;
      const start = original === null || original === void 0 ? void 0 : original.start;
      const transform = original === null || original === void 0 ? void 0 : original.transform;
      const writableType = original === null || original === void 0 ? void 0 : original.writableType;
      return {
        flush: flush2 === void 0 ? void 0 : convertTransformerFlushCallback(flush2, original, `${context} has member 'flush' that`),
        readableType,
        start: start === void 0 ? void 0 : convertTransformerStartCallback(start, original, `${context} has member 'start' that`),
        transform: transform === void 0 ? void 0 : convertTransformerTransformCallback(transform, original, `${context} has member 'transform' that`),
        writableType
      };
    }
    function convertTransformerFlushCallback(fn, original, context) {
      assertFunction(fn, context);
      return (controller) => promiseCall(fn, original, [controller]);
    }
    function convertTransformerStartCallback(fn, original, context) {
      assertFunction(fn, context);
      return (controller) => reflectCall(fn, original, [controller]);
    }
    function convertTransformerTransformCallback(fn, original, context) {
      assertFunction(fn, context);
      return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
    }
    class TransformStream {
      constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
        if (rawTransformer === void 0) {
          rawTransformer = null;
        }
        const writableStrategy = convertQueuingStrategy(rawWritableStrategy, "Second parameter");
        const readableStrategy = convertQueuingStrategy(rawReadableStrategy, "Third parameter");
        const transformer = convertTransformer(rawTransformer, "First parameter");
        if (transformer.readableType !== void 0) {
          throw new RangeError("Invalid readableType specified");
        }
        if (transformer.writableType !== void 0) {
          throw new RangeError("Invalid writableType specified");
        }
        const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
        const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
        const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
        const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
        let startPromise_resolve;
        const startPromise = newPromise((resolve2) => {
          startPromise_resolve = resolve2;
        });
        InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
        SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
        if (transformer.start !== void 0) {
          startPromise_resolve(transformer.start(this._transformStreamController));
        } else {
          startPromise_resolve(void 0);
        }
      }
      get readable() {
        if (!IsTransformStream(this)) {
          throw streamBrandCheckException("readable");
        }
        return this._readable;
      }
      get writable() {
        if (!IsTransformStream(this)) {
          throw streamBrandCheckException("writable");
        }
        return this._writable;
      }
    }
    Object.defineProperties(TransformStream.prototype, {
      readable: { enumerable: true },
      writable: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(TransformStream.prototype, SymbolPolyfill.toStringTag, {
        value: "TransformStream",
        configurable: true
      });
    }
    function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
      function startAlgorithm() {
        return startPromise;
      }
      function writeAlgorithm(chunk) {
        return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
      }
      function abortAlgorithm(reason) {
        return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
      }
      function closeAlgorithm() {
        return TransformStreamDefaultSinkCloseAlgorithm(stream);
      }
      stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
      function pullAlgorithm() {
        return TransformStreamDefaultSourcePullAlgorithm(stream);
      }
      function cancelAlgorithm(reason) {
        TransformStreamErrorWritableAndUnblockWrite(stream, reason);
        return promiseResolvedWith(void 0);
      }
      stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
      stream._backpressure = void 0;
      stream._backpressureChangePromise = void 0;
      stream._backpressureChangePromise_resolve = void 0;
      TransformStreamSetBackpressure(stream, true);
      stream._transformStreamController = void 0;
    }
    function IsTransformStream(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_transformStreamController")) {
        return false;
      }
      return x instanceof TransformStream;
    }
    function TransformStreamError(stream, e) {
      ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e);
      TransformStreamErrorWritableAndUnblockWrite(stream, e);
    }
    function TransformStreamErrorWritableAndUnblockWrite(stream, e) {
      TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
      WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e);
      if (stream._backpressure) {
        TransformStreamSetBackpressure(stream, false);
      }
    }
    function TransformStreamSetBackpressure(stream, backpressure) {
      if (stream._backpressureChangePromise !== void 0) {
        stream._backpressureChangePromise_resolve();
      }
      stream._backpressureChangePromise = newPromise((resolve2) => {
        stream._backpressureChangePromise_resolve = resolve2;
      });
      stream._backpressure = backpressure;
    }
    class TransformStreamDefaultController {
      constructor() {
        throw new TypeError("Illegal constructor");
      }
      get desiredSize() {
        if (!IsTransformStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException("desiredSize");
        }
        const readableController = this._controlledTransformStream._readable._readableStreamController;
        return ReadableStreamDefaultControllerGetDesiredSize(readableController);
      }
      enqueue(chunk = void 0) {
        if (!IsTransformStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException("enqueue");
        }
        TransformStreamDefaultControllerEnqueue(this, chunk);
      }
      error(reason = void 0) {
        if (!IsTransformStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException("error");
        }
        TransformStreamDefaultControllerError(this, reason);
      }
      terminate() {
        if (!IsTransformStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException("terminate");
        }
        TransformStreamDefaultControllerTerminate(this);
      }
    }
    Object.defineProperties(TransformStreamDefaultController.prototype, {
      enqueue: { enumerable: true },
      error: { enumerable: true },
      terminate: { enumerable: true },
      desiredSize: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
        value: "TransformStreamDefaultController",
        configurable: true
      });
    }
    function IsTransformStreamDefaultController(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_controlledTransformStream")) {
        return false;
      }
      return x instanceof TransformStreamDefaultController;
    }
    function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
      controller._controlledTransformStream = stream;
      stream._transformStreamController = controller;
      controller._transformAlgorithm = transformAlgorithm;
      controller._flushAlgorithm = flushAlgorithm;
    }
    function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
      const controller = Object.create(TransformStreamDefaultController.prototype);
      let transformAlgorithm = (chunk) => {
        try {
          TransformStreamDefaultControllerEnqueue(controller, chunk);
          return promiseResolvedWith(void 0);
        } catch (transformResultE) {
          return promiseRejectedWith(transformResultE);
        }
      };
      let flushAlgorithm = () => promiseResolvedWith(void 0);
      if (transformer.transform !== void 0) {
        transformAlgorithm = (chunk) => transformer.transform(chunk, controller);
      }
      if (transformer.flush !== void 0) {
        flushAlgorithm = () => transformer.flush(controller);
      }
      SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
    }
    function TransformStreamDefaultControllerClearAlgorithms(controller) {
      controller._transformAlgorithm = void 0;
      controller._flushAlgorithm = void 0;
    }
    function TransformStreamDefaultControllerEnqueue(controller, chunk) {
      const stream = controller._controlledTransformStream;
      const readableController = stream._readable._readableStreamController;
      if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
        throw new TypeError("Readable side is not in a state that permits enqueue");
      }
      try {
        ReadableStreamDefaultControllerEnqueue(readableController, chunk);
      } catch (e) {
        TransformStreamErrorWritableAndUnblockWrite(stream, e);
        throw stream._readable._storedError;
      }
      const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
      if (backpressure !== stream._backpressure) {
        TransformStreamSetBackpressure(stream, true);
      }
    }
    function TransformStreamDefaultControllerError(controller, e) {
      TransformStreamError(controller._controlledTransformStream, e);
    }
    function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
      const transformPromise = controller._transformAlgorithm(chunk);
      return transformPromiseWith(transformPromise, void 0, (r) => {
        TransformStreamError(controller._controlledTransformStream, r);
        throw r;
      });
    }
    function TransformStreamDefaultControllerTerminate(controller) {
      const stream = controller._controlledTransformStream;
      const readableController = stream._readable._readableStreamController;
      ReadableStreamDefaultControllerClose(readableController);
      const error2 = new TypeError("TransformStream terminated");
      TransformStreamErrorWritableAndUnblockWrite(stream, error2);
    }
    function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
      const controller = stream._transformStreamController;
      if (stream._backpressure) {
        const backpressureChangePromise = stream._backpressureChangePromise;
        return transformPromiseWith(backpressureChangePromise, () => {
          const writable2 = stream._writable;
          const state = writable2._state;
          if (state === "erroring") {
            throw writable2._storedError;
          }
          return TransformStreamDefaultControllerPerformTransform(controller, chunk);
        });
      }
      return TransformStreamDefaultControllerPerformTransform(controller, chunk);
    }
    function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
      TransformStreamError(stream, reason);
      return promiseResolvedWith(void 0);
    }
    function TransformStreamDefaultSinkCloseAlgorithm(stream) {
      const readable2 = stream._readable;
      const controller = stream._transformStreamController;
      const flushPromise = controller._flushAlgorithm();
      TransformStreamDefaultControllerClearAlgorithms(controller);
      return transformPromiseWith(flushPromise, () => {
        if (readable2._state === "errored") {
          throw readable2._storedError;
        }
        ReadableStreamDefaultControllerClose(readable2._readableStreamController);
      }, (r) => {
        TransformStreamError(stream, r);
        throw readable2._storedError;
      });
    }
    function TransformStreamDefaultSourcePullAlgorithm(stream) {
      TransformStreamSetBackpressure(stream, false);
      return stream._backpressureChangePromise;
    }
    function defaultControllerBrandCheckException(name) {
      return new TypeError(`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`);
    }
    function streamBrandCheckException(name) {
      return new TypeError(`TransformStream.prototype.${name} can only be used on a TransformStream`);
    }
    exports2.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
    exports2.CountQueuingStrategy = CountQueuingStrategy;
    exports2.ReadableByteStreamController = ReadableByteStreamController;
    exports2.ReadableStream = ReadableStream2;
    exports2.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
    exports2.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
    exports2.ReadableStreamDefaultController = ReadableStreamDefaultController;
    exports2.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
    exports2.TransformStream = TransformStream;
    exports2.TransformStreamDefaultController = TransformStreamDefaultController;
    exports2.WritableStream = WritableStream;
    exports2.WritableStreamDefaultController = WritableStreamDefaultController;
    exports2.WritableStreamDefaultWriter = WritableStreamDefaultWriter;
    Object.defineProperty(exports2, "__esModule", { value: true });
  });
})(ponyfill_es2018, ponyfill_es2018.exports);
var POOL_SIZE$1 = 65536;
if (!globalThis.ReadableStream) {
  try {
    Object.assign(globalThis, require("stream/web"));
  } catch (error2) {
    Object.assign(globalThis, ponyfill_es2018.exports);
  }
}
try {
  const { Blob: Blob3 } = require("buffer");
  if (Blob3 && !Blob3.prototype.stream) {
    Blob3.prototype.stream = function name(params) {
      let position = 0;
      const blob = this;
      return new ReadableStream({
        type: "bytes",
        async pull(ctrl) {
          const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE$1));
          const buffer = await chunk.arrayBuffer();
          position += buffer.byteLength;
          ctrl.enqueue(new Uint8Array(buffer));
          if (position === blob.size) {
            ctrl.close();
          }
        }
      });
    };
  }
} catch (error2) {
}
var POOL_SIZE = 65536;
async function* toIterator(parts, clone2 = true) {
  for (let part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else if (ArrayBuffer.isView(part)) {
      if (clone2) {
        let position = part.byteOffset;
        let end = part.byteOffset + part.byteLength;
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE);
          const chunk = part.buffer.slice(position, position + size);
          position += chunk.byteLength;
          yield new Uint8Array(chunk);
        }
      } else {
        yield part;
      }
    } else {
      let position = 0;
      while (position !== part.size) {
        const chunk = part.slice(position, Math.min(part.size, position + POOL_SIZE));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
      }
    }
  }
}
var _Blob = class Blob {
  #parts = [];
  #type = "";
  #size = 0;
  constructor(blobParts = [], options2 = {}) {
    let size = 0;
    const parts = blobParts.map((element) => {
      let part;
      if (ArrayBuffer.isView(element)) {
        part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength));
      } else if (element instanceof ArrayBuffer) {
        part = new Uint8Array(element.slice(0));
      } else if (element instanceof Blob) {
        part = element;
      } else {
        part = new TextEncoder().encode(element);
      }
      size += ArrayBuffer.isView(part) ? part.byteLength : part.size;
      return part;
    });
    const type = options2.type === void 0 ? "" : String(options2.type);
    this.#type = /[^\u0020-\u007E]/.test(type) ? "" : type;
    this.#size = size;
    this.#parts = parts;
  }
  get size() {
    return this.#size;
  }
  get type() {
    return this.#type;
  }
  async text() {
    const decoder = new TextDecoder();
    let str = "";
    for await (let part of toIterator(this.#parts, false)) {
      str += decoder.decode(part, { stream: true });
    }
    str += decoder.decode();
    return str;
  }
  async arrayBuffer() {
    const data = new Uint8Array(this.size);
    let offset = 0;
    for await (const chunk of toIterator(this.#parts, false)) {
      data.set(chunk, offset);
      offset += chunk.length;
    }
    return data.buffer;
  }
  stream() {
    const it = toIterator(this.#parts, true);
    return new ReadableStream({
      type: "bytes",
      async pull(ctrl) {
        const chunk = await it.next();
        chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
      }
    });
  }
  slice(start = 0, end = this.size, type = "") {
    const { size } = this;
    let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
    let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
    const span = Math.max(relativeEnd - relativeStart, 0);
    const parts = this.#parts;
    const blobParts = [];
    let added = 0;
    for (const part of parts) {
      if (added >= span) {
        break;
      }
      const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
      if (relativeStart && size2 <= relativeStart) {
        relativeStart -= size2;
        relativeEnd -= size2;
      } else {
        let chunk;
        if (ArrayBuffer.isView(part)) {
          chunk = part.subarray(relativeStart, Math.min(size2, relativeEnd));
          added += chunk.byteLength;
        } else {
          chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
          added += chunk.size;
        }
        blobParts.push(chunk);
        relativeStart = 0;
      }
    }
    const blob = new Blob([], { type: String(type).toLowerCase() });
    blob.#size = span;
    blob.#parts = blobParts;
    return blob;
  }
  get [Symbol.toStringTag]() {
    return "Blob";
  }
  static [Symbol.hasInstance](object) {
    return object && typeof object === "object" && typeof object.constructor === "function" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
  }
};
Object.defineProperties(_Blob.prototype, {
  size: { enumerable: true },
  type: { enumerable: true },
  slice: { enumerable: true }
});
var Blob2 = _Blob;
var Blob$1 = Blob2;
var FetchBaseError = class extends Error {
  constructor(message, type) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.type = type;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
};
var FetchError = class extends FetchBaseError {
  constructor(message, type, systemError) {
    super(message, type);
    if (systemError) {
      this.code = this.errno = systemError.code;
      this.erroredSysCall = systemError.syscall;
    }
  }
};
var NAME = Symbol.toStringTag;
var isURLSearchParameters = (object) => {
  return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
};
var isBlob = (object) => {
  return typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
};
function isFormData(object) {
  return typeof object === "object" && typeof object.append === "function" && typeof object.set === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.delete === "function" && typeof object.keys === "function" && typeof object.values === "function" && typeof object.entries === "function" && typeof object.constructor === "function" && object[NAME] === "FormData";
}
var isAbortSignal = (object) => {
  return typeof object === "object" && (object[NAME] === "AbortSignal" || object[NAME] === "EventTarget");
};
var carriage = "\r\n";
var dashes = "-".repeat(2);
var carriageLength = Buffer.byteLength(carriage);
var getFooter = (boundary) => `${dashes}${boundary}${dashes}${carriage.repeat(2)}`;
function getHeader(boundary, name, field) {
  let header = "";
  header += `${dashes}${boundary}${carriage}`;
  header += `Content-Disposition: form-data; name="${name}"`;
  if (isBlob(field)) {
    header += `; filename="${field.name}"${carriage}`;
    header += `Content-Type: ${field.type || "application/octet-stream"}`;
  }
  return `${header}${carriage.repeat(2)}`;
}
var getBoundary = () => (0, import_crypto.randomBytes)(8).toString("hex");
async function* formDataIterator(form, boundary) {
  for (const [name, value] of form) {
    yield getHeader(boundary, name, value);
    if (isBlob(value)) {
      yield* value.stream();
    } else {
      yield value;
    }
    yield carriage;
  }
  yield getFooter(boundary);
}
function getFormDataLength(form, boundary) {
  let length = 0;
  for (const [name, value] of form) {
    length += Buffer.byteLength(getHeader(boundary, name, value));
    length += isBlob(value) ? value.size : Buffer.byteLength(String(value));
    length += carriageLength;
  }
  length += Buffer.byteLength(getFooter(boundary));
  return length;
}
var INTERNALS$2 = Symbol("Body internals");
var Body = class {
  constructor(body, {
    size = 0
  } = {}) {
    let boundary = null;
    if (body === null) {
      body = null;
    } else if (isURLSearchParameters(body)) {
      body = Buffer.from(body.toString());
    } else if (isBlob(body))
      ;
    else if (Buffer.isBuffer(body))
      ;
    else if (import_util.types.isAnyArrayBuffer(body)) {
      body = Buffer.from(body);
    } else if (ArrayBuffer.isView(body)) {
      body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof import_stream.default)
      ;
    else if (isFormData(body)) {
      boundary = `NodeFetchFormDataBoundary${getBoundary()}`;
      body = import_stream.default.Readable.from(formDataIterator(body, boundary));
    } else {
      body = Buffer.from(String(body));
    }
    this[INTERNALS$2] = {
      body,
      boundary,
      disturbed: false,
      error: null
    };
    this.size = size;
    if (body instanceof import_stream.default) {
      body.on("error", (error_) => {
        const error2 = error_ instanceof FetchBaseError ? error_ : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
        this[INTERNALS$2].error = error2;
      });
    }
  }
  get body() {
    return this[INTERNALS$2].body;
  }
  get bodyUsed() {
    return this[INTERNALS$2].disturbed;
  }
  async arrayBuffer() {
    const { buffer, byteOffset, byteLength } = await consumeBody(this);
    return buffer.slice(byteOffset, byteOffset + byteLength);
  }
  async blob() {
    const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
    const buf = await this.buffer();
    return new Blob$1([buf], {
      type: ct
    });
  }
  async json() {
    const buffer = await consumeBody(this);
    return JSON.parse(buffer.toString());
  }
  async text() {
    const buffer = await consumeBody(this);
    return buffer.toString();
  }
  buffer() {
    return consumeBody(this);
  }
};
Object.defineProperties(Body.prototype, {
  body: { enumerable: true },
  bodyUsed: { enumerable: true },
  arrayBuffer: { enumerable: true },
  blob: { enumerable: true },
  json: { enumerable: true },
  text: { enumerable: true }
});
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  let { body } = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (isBlob(body)) {
    body = import_stream.default.Readable.from(body.stream());
  }
  if (Buffer.isBuffer(body)) {
    return body;
  }
  if (!(body instanceof import_stream.default)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const error2 = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(error2);
        throw error2;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error2) {
    const error_ = error2 instanceof FetchBaseError ? error2 : new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error2.message}`, "system", error2);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c2) => typeof c2 === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error2) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error2.message}`, "system", error2);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
var clone = (instance, highWaterMark) => {
  let p1;
  let p2;
  let { body } = instance;
  if (instance.bodyUsed) {
    throw new Error("cannot clone body after it is used");
  }
  if (body instanceof import_stream.default && typeof body.getBoundary !== "function") {
    p1 = new import_stream.PassThrough({ highWaterMark });
    p2 = new import_stream.PassThrough({ highWaterMark });
    body.pipe(p1);
    body.pipe(p2);
    instance[INTERNALS$2].body = p1;
    body = p2;
  }
  return body;
};
var extractContentType = (body, request) => {
  if (body === null) {
    return null;
  }
  if (typeof body === "string") {
    return "text/plain;charset=UTF-8";
  }
  if (isURLSearchParameters(body)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }
  if (isBlob(body)) {
    return body.type || null;
  }
  if (Buffer.isBuffer(body) || import_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
    return null;
  }
  if (body && typeof body.getBoundary === "function") {
    return `multipart/form-data;boundary=${body.getBoundary()}`;
  }
  if (isFormData(body)) {
    return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
  }
  if (body instanceof import_stream.default) {
    return null;
  }
  return "text/plain;charset=UTF-8";
};
var getTotalBytes = (request) => {
  const { body } = request;
  if (body === null) {
    return 0;
  }
  if (isBlob(body)) {
    return body.size;
  }
  if (Buffer.isBuffer(body)) {
    return body.length;
  }
  if (body && typeof body.getLengthSync === "function") {
    return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
  }
  if (isFormData(body)) {
    return getFormDataLength(request[INTERNALS$2].boundary);
  }
  return null;
};
var writeToStream = (dest, { body }) => {
  if (body === null) {
    dest.end();
  } else if (isBlob(body)) {
    import_stream.default.Readable.from(body.stream()).pipe(dest);
  } else if (Buffer.isBuffer(body)) {
    dest.write(body);
    dest.end();
  } else {
    body.pipe(dest);
  }
};
var validateHeaderName = typeof import_http.default.validateHeaderName === "function" ? import_http.default.validateHeaderName : (name) => {
  if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
    const error2 = new TypeError(`Header name must be a valid HTTP token [${name}]`);
    Object.defineProperty(error2, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
    throw error2;
  }
};
var validateHeaderValue = typeof import_http.default.validateHeaderValue === "function" ? import_http.default.validateHeaderValue : (name, value) => {
  if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
    const error2 = new TypeError(`Invalid character in header content ["${name}"]`);
    Object.defineProperty(error2, "code", { value: "ERR_INVALID_CHAR" });
    throw error2;
  }
};
var Headers = class extends URLSearchParams {
  constructor(init2) {
    let result = [];
    if (init2 instanceof Headers) {
      const raw = init2.raw();
      for (const [name, values] of Object.entries(raw)) {
        result.push(...values.map((value) => [name, value]));
      }
    } else if (init2 == null)
      ;
    else if (typeof init2 === "object" && !import_util.types.isBoxedPrimitive(init2)) {
      const method = init2[Symbol.iterator];
      if (method == null) {
        result.push(...Object.entries(init2));
      } else {
        if (typeof method !== "function") {
          throw new TypeError("Header pairs must be iterable");
        }
        result = [...init2].map((pair) => {
          if (typeof pair !== "object" || import_util.types.isBoxedPrimitive(pair)) {
            throw new TypeError("Each header pair must be an iterable object");
          }
          return [...pair];
        }).map((pair) => {
          if (pair.length !== 2) {
            throw new TypeError("Each header pair must be a name/value tuple");
          }
          return [...pair];
        });
      }
    } else {
      throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
    }
    result = result.length > 0 ? result.map(([name, value]) => {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return [String(name).toLowerCase(), String(value)];
    }) : void 0;
    super(result);
    return new Proxy(this, {
      get(target, p, receiver) {
        switch (p) {
          case "append":
          case "set":
            return (name, value) => {
              validateHeaderName(name);
              validateHeaderValue(name, String(value));
              return URLSearchParams.prototype[p].call(target, String(name).toLowerCase(), String(value));
            };
          case "delete":
          case "has":
          case "getAll":
            return (name) => {
              validateHeaderName(name);
              return URLSearchParams.prototype[p].call(target, String(name).toLowerCase());
            };
          case "keys":
            return () => {
              target.sort();
              return new Set(URLSearchParams.prototype.keys.call(target)).keys();
            };
          default:
            return Reflect.get(target, p, receiver);
        }
      }
    });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(name) {
    const values = this.getAll(name);
    if (values.length === 0) {
      return null;
    }
    let value = values.join(", ");
    if (/^content-encoding$/i.test(name)) {
      value = value.toLowerCase();
    }
    return value;
  }
  forEach(callback, thisArg = void 0) {
    for (const name of this.keys()) {
      Reflect.apply(callback, thisArg, [this.get(name), name, this]);
    }
  }
  *values() {
    for (const name of this.keys()) {
      yield this.get(name);
    }
  }
  *entries() {
    for (const name of this.keys()) {
      yield [name, this.get(name)];
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  raw() {
    return [...this.keys()].reduce((result, key) => {
      result[key] = this.getAll(key);
      return result;
    }, {});
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((result, key) => {
      const values = this.getAll(key);
      if (key === "host") {
        result[key] = values[0];
      } else {
        result[key] = values.length > 1 ? values : values[0];
      }
      return result;
    }, {});
  }
};
Object.defineProperties(Headers.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
  result[property] = { enumerable: true };
  return result;
}, {}));
function fromRawHeaders(headers = []) {
  return new Headers(headers.reduce((result, value, index2, array) => {
    if (index2 % 2 === 0) {
      result.push(array.slice(index2, index2 + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
var redirectStatus = new Set([301, 302, 303, 307, 308]);
var isRedirect = (code) => {
  return redirectStatus.has(code);
};
var INTERNALS$1 = Symbol("Response internals");
var Response = class extends Body {
  constructor(body = null, options2 = {}) {
    super(body, options2);
    const status = options2.status != null ? options2.status : 200;
    const headers = new Headers(options2.headers);
    if (body !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(body);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    this[INTERNALS$1] = {
      type: "default",
      url: options2.url,
      status,
      statusText: options2.statusText || "",
      headers,
      counter: options2.counter,
      highWaterMark: options2.highWaterMark
    };
  }
  get type() {
    return this[INTERNALS$1].type;
  }
  get url() {
    return this[INTERNALS$1].url || "";
  }
  get status() {
    return this[INTERNALS$1].status;
  }
  get ok() {
    return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
  }
  get redirected() {
    return this[INTERNALS$1].counter > 0;
  }
  get statusText() {
    return this[INTERNALS$1].statusText;
  }
  get headers() {
    return this[INTERNALS$1].headers;
  }
  get highWaterMark() {
    return this[INTERNALS$1].highWaterMark;
  }
  clone() {
    return new Response(clone(this, this.highWaterMark), {
      type: this.type,
      url: this.url,
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      ok: this.ok,
      redirected: this.redirected,
      size: this.size
    });
  }
  static redirect(url, status = 302) {
    if (!isRedirect(status)) {
      throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    }
    return new Response(null, {
      headers: {
        location: new URL(url).toString()
      },
      status
    });
  }
  static error() {
    const response = new Response(null, { status: 0, statusText: "" });
    response[INTERNALS$1].type = "error";
    return response;
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
};
Object.defineProperties(Response.prototype, {
  type: { enumerable: true },
  url: { enumerable: true },
  status: { enumerable: true },
  ok: { enumerable: true },
  redirected: { enumerable: true },
  statusText: { enumerable: true },
  headers: { enumerable: true },
  clone: { enumerable: true }
});
var getSearch = (parsedURL) => {
  if (parsedURL.search) {
    return parsedURL.search;
  }
  const lastOffset = parsedURL.href.length - 1;
  const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
  return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
};
var INTERNALS = Symbol("Request internals");
var isRequest = (object) => {
  return typeof object === "object" && typeof object[INTERNALS] === "object";
};
var Request = class extends Body {
  constructor(input, init2 = {}) {
    let parsedURL;
    if (isRequest(input)) {
      parsedURL = new URL(input.url);
    } else {
      parsedURL = new URL(input);
      input = {};
    }
    let method = init2.method || input.method || "GET";
    method = method.toUpperCase();
    if ((init2.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
      throw new TypeError("Request with GET/HEAD method cannot have body");
    }
    const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
    super(inputBody, {
      size: init2.size || input.size || 0
    });
    const headers = new Headers(init2.headers || input.headers || {});
    if (inputBody !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(inputBody, this);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    let signal = isRequest(input) ? input.signal : null;
    if ("signal" in init2) {
      signal = init2.signal;
    }
    if (signal != null && !isAbortSignal(signal)) {
      throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
    }
    this[INTERNALS] = {
      method,
      redirect: init2.redirect || input.redirect || "follow",
      headers,
      parsedURL,
      signal
    };
    this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
    this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
    this.counter = init2.counter || input.counter || 0;
    this.agent = init2.agent || input.agent;
    this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
    this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
  }
  get method() {
    return this[INTERNALS].method;
  }
  get url() {
    return (0, import_url.format)(this[INTERNALS].parsedURL);
  }
  get headers() {
    return this[INTERNALS].headers;
  }
  get redirect() {
    return this[INTERNALS].redirect;
  }
  get signal() {
    return this[INTERNALS].signal;
  }
  clone() {
    return new Request(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
};
Object.defineProperties(Request.prototype, {
  method: { enumerable: true },
  url: { enumerable: true },
  headers: { enumerable: true },
  redirect: { enumerable: true },
  clone: { enumerable: true },
  signal: { enumerable: true }
});
var getNodeRequestOptions = (request) => {
  const { parsedURL } = request[INTERNALS];
  const headers = new Headers(request[INTERNALS].headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "*/*");
  }
  let contentLengthValue = null;
  if (request.body === null && /^(post|put)$/i.test(request.method)) {
    contentLengthValue = "0";
  }
  if (request.body !== null) {
    const totalBytes = getTotalBytes(request);
    if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
      contentLengthValue = String(totalBytes);
    }
  }
  if (contentLengthValue) {
    headers.set("Content-Length", contentLengthValue);
  }
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "node-fetch");
  }
  if (request.compress && !headers.has("Accept-Encoding")) {
    headers.set("Accept-Encoding", "gzip,deflate,br");
  }
  let { agent } = request;
  if (typeof agent === "function") {
    agent = agent(parsedURL);
  }
  if (!headers.has("Connection") && !agent) {
    headers.set("Connection", "close");
  }
  const search = getSearch(parsedURL);
  const requestOptions = {
    path: parsedURL.pathname + search,
    pathname: parsedURL.pathname,
    hostname: parsedURL.hostname,
    protocol: parsedURL.protocol,
    port: parsedURL.port,
    hash: parsedURL.hash,
    search: parsedURL.search,
    query: parsedURL.query,
    href: parsedURL.href,
    method: request.method,
    headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
    insecureHTTPParser: request.insecureHTTPParser,
    agent
  };
  return requestOptions;
};
var AbortError = class extends FetchBaseError {
  constructor(message, type = "aborted") {
    super(message, type);
  }
};
var supportedSchemas = new Set(["data:", "http:", "https:"]);
async function fetch(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request(url, options_);
    const options2 = getNodeRequestOptions(request);
    if (!supportedSchemas.has(options2.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${options2.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (options2.protocol === "data:") {
      const data = dataUriToBuffer$1(request.url);
      const response2 = new Response(data, { headers: { "Content-Type": data.typeFull } });
      resolve2(response2);
      return;
    }
    const send2 = (options2.protocol === "https:" ? import_https.default : import_http.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error2 = new AbortError("The operation was aborted.");
      reject(error2);
      if (request.body && request.body instanceof import_stream.default.Readable) {
        request.body.destroy(error2);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error2);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send2(options2);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error2) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${error2.message}`, "system", error2));
      finalize();
    });
    fixResponseChunkedTransferBadEnding(request_, (error2) => {
      response.body.destroy(error2);
    });
    if (process.version < "v14") {
      request_.on("socket", (s2) => {
        let endedWithEventsCount;
        s2.prependListener("end", () => {
          endedWithEventsCount = s2._eventsCount;
        });
        s2.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s2._eventsCount && !hadError) {
            const error2 = new Error("Premature close");
            error2.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error2);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              headers.set("Location", locationURL);
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: request.body,
              signal: request.signal,
              size: request.size
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_stream.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            resolve2(fetch(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), reject);
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_zlib.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createGunzip(zlibOptions), reject);
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), reject);
        raw.once("data", (chunk) => {
          body = (chunk[0] & 15) === 8 ? (0, import_stream.pipeline)(body, import_zlib.default.createInflate(), reject) : (0, import_stream.pipeline)(body, import_zlib.default.createInflateRaw(), reject);
          response = new Response(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createBrotliDecompress(), reject);
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
  const LAST_CHUNK = Buffer.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers } = response;
    isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error2 = new Error("Premature close");
        error2.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error2);
      }
    };
    socket.prependListener("close", onSocketClose);
    request.on("abort", () => {
      socket.removeListener("close", onSocketClose);
    });
    socket.on("data", (buf) => {
      properLastChunkReceived = Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = Buffer.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    });
  });
}

// node_modules/@sveltejs/kit/dist/node.js
function getRawBody(req) {
  return new Promise((fulfil, reject) => {
    const h = req.headers;
    if (!h["content-type"]) {
      return fulfil(null);
    }
    req.on("error", reject);
    const length = Number(h["content-length"]);
    if (isNaN(length) && h["transfer-encoding"] == null) {
      return fulfil(null);
    }
    let data = new Uint8Array(length || 0);
    if (length > 0) {
      let offset = 0;
      req.on("data", (chunk) => {
        const new_len = offset + Buffer.byteLength(chunk);
        if (new_len > length) {
          return reject({
            status: 413,
            reason: 'Exceeded "Content-Length" limit'
          });
        }
        data.set(chunk, offset);
        offset = new_len;
      });
    } else {
      req.on("data", (chunk) => {
        const new_data = new Uint8Array(data.length + chunk.length);
        new_data.set(data, 0);
        new_data.set(chunk, data.length);
        data = new_data;
      });
    }
    req.on("end", () => {
      fulfil(data);
    });
  });
}

// .svelte-kit/output/server/app.js
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _map;
function get_single_valued_header(headers, key) {
  const value = headers[key];
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return void 0;
    }
    if (value.length > 1) {
      throw new Error(`Multiple headers provided for ${key}. Multiple may be provided only for set-cookie`);
    }
    return value[0];
  }
  return value;
}
function coalesce_to_error(err) {
  return err instanceof Error || err && err.name && err.message ? err : new Error(JSON.stringify(err));
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key in obj) {
    clone2[key.toLowerCase()] = obj[key];
  }
  return clone2;
}
function error$1(body) {
  return {
    status: 500,
    body,
    headers: {}
  };
}
function is_string(s2) {
  return typeof s2 === "string" || s2 instanceof String;
}
function is_content_type_textual(content_type) {
  if (!content_type)
    return true;
  const [type] = content_type.split(";");
  return type === "text/plain" || type === "application/json" || type === "application/x-www-form-urlencoded" || type === "multipart/form-data";
}
async function render_endpoint(request, route, match) {
  const mod = await route.load();
  const handler = mod[request.method.toLowerCase().replace("delete", "del")];
  if (!handler) {
    return;
  }
  const params = route.params(match);
  const response = await handler({ ...request, params });
  const preface = `Invalid response from route ${request.path}`;
  if (!response) {
    return;
  }
  if (typeof response !== "object") {
    return error$1(`${preface}: expected an object, got ${typeof response}`);
  }
  let { status = 200, body, headers = {} } = response;
  headers = lowercase_keys(headers);
  const type = get_single_valued_header(headers, "content-type");
  const is_type_textual = is_content_type_textual(type);
  if (!is_type_textual && !(body instanceof Uint8Array || is_string(body))) {
    return error$1(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
  }
  let normalized_body;
  if ((typeof body === "object" || typeof body === "undefined") && !(body instanceof Uint8Array) && (!type || type.startsWith("application/json"))) {
    headers = { ...headers, "content-type": "application/json; charset=utf-8" };
    normalized_body = JSON.stringify(typeof body === "undefined" ? {} : body);
  } else {
    normalized_body = body;
  }
  return { status, body: normalized_body, headers };
}
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names2 = new Map();
  Array.from(counts).filter(function(entry) {
    return entry[1] > 1;
  }).sort(function(a2, b2) {
    return b2[1] - a2[1];
  }).forEach(function(entry, i) {
    names2.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names2.has(thing)) {
      return names2.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i) {
          return i in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names2.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names2.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i) {
            statements_1.push(name + "[" + i + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c2) {
  return escaped$1[c2] || c2;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i = 0; i < str.length; i += 1) {
    var char = str.charAt(i);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$1) {
      result += escaped$1[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop$2() {
}
function safe_not_equal$1(a2, b2) {
  return a2 != a2 ? b2 == b2 : a2 !== b2 || (a2 && typeof a2 === "object" || typeof a2 === "function");
}
Promise.resolve();
var subscriber_queue$1 = [];
function writable$1(value, start = noop$2) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal$1(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue$1.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue$1.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue$1.length; i += 2) {
            subscriber_queue$1[i][0](subscriber_queue$1[i + 1]);
          }
          subscriber_queue$1.length = 0;
        }
      }
    }
  }
  function update2(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop$2) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop$2;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update: update2, subscribe: subscribe2 };
}
function hash(value) {
  let hash2 = 5381;
  let i = value.length;
  if (typeof value === "string") {
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else {
    while (i)
      hash2 = hash2 * 33 ^ value[--i];
  }
  return (hash2 >>> 0).toString(36);
}
var escape_json_string_in_html_dict = {
  '"': '\\"',
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape_json_string_in_html(str) {
  return escape$1(str, escape_json_string_in_html_dict, (code) => `\\u${code.toString(16).toUpperCase()}`);
}
var escape_html_attr_dict = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;"
};
function escape_html_attr(str) {
  return '"' + escape$1(str, escape_html_attr_dict, (code) => `&#${code};`) + '"';
}
function escape$1(str, dict, unicode_encoder) {
  let result = "";
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char in dict) {
      result += dict[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += unicode_encoder(code);
      }
    } else {
      result += char;
    }
  }
  return result;
}
var s$1 = JSON.stringify;
async function render_response({
  branch,
  options: options2,
  $session,
  page_config,
  status,
  error: error2,
  page
}) {
  const css2 = new Set(options2.entry.css);
  const js = new Set(options2.entry.js);
  const styles = new Set();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error2) {
    error2.stack = options2.get_stack(error2);
  }
  if (page_config.ssr) {
    branch.forEach(({ node, loaded: loaded2, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url) => css2.add(url));
      if (node.js)
        node.js.forEach((url) => js.add(url));
      if (node.styles)
        node.styles.forEach((content) => styles.add(content));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded2.maxage;
    });
    const session = writable$1($session);
    const props = {
      stores: {
        page: writable$1(null),
        navigating: writable$1(null),
        session
      },
      page,
      components: branch.map(({ node }) => node.module.default)
    };
    for (let i = 0; i < branch.length; i += 1) {
      props[`props_${i}`] = await branch[i].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options2.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  const include_js = page_config.router || page_config.hydrate;
  if (!include_js)
    js.clear();
  const links = options2.amp ? styles.size > 0 || rendered.css.code.length > 0 ? `<style amp-custom>${Array.from(styles).concat(rendered.css.code).join("\n")}</style>` : "" : [
    ...Array.from(js).map((dep) => `<link rel="modulepreload" href="${dep}">`),
    ...Array.from(css2).map((dep) => `<link rel="stylesheet" href="${dep}">`)
  ].join("\n		");
  let init2 = "";
  if (options2.amp) {
    init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>`;
  } else if (include_js) {
    init2 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${options2.target ? `document.querySelector(${s$1(options2.target)})` : "document.body"},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error3) => {
      throw new Error(`Failed to serialize session data: ${error3.message}`);
    })},
				host: ${page && page.host ? s$1(page.host) : "location.host"},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				trailing_slash: ${s$1(options2.trailing_slash)},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error2)},
					nodes: [
						${(branch || []).map(({ node }) => `import(${s$1(node.entry)})`).join(",\n						")}
					],
					page: {
						host: ${page && page.host ? s$1(page.host) : "location.host"}, // TODO this is redundant
						path: ${s$1(page && page.path)},
						query: new URLSearchParams(${page ? s$1(page.query.toString()) : ""}),
						params: ${page && s$1(page.params)}
					}
				}` : "null"}
			});
		<\/script>`;
  }
  if (options2.service_worker) {
    init2 += `<script>
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.register('${options2.service_worker}');
			}
		<\/script>`;
  }
  const head = [
    rendered.head,
    styles.size && !options2.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
    links,
    init2
  ].join("\n\n		");
  const body = options2.amp ? rendered.html : `${rendered.html}

			${serialized_data.map(({ url, body: body2, json }) => {
    let attributes = `type="application/json" data-type="svelte-data" data-url=${escape_html_attr(url)}`;
    if (body2)
      attributes += ` data-body="${hash(body2)}"`;
    return `<script ${attributes}>${json}<\/script>`;
  }).join("\n\n	")}
		`;
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  if (!options2.floc) {
    headers["permissions-policy"] = "interest-cohort=()";
  }
  return {
    status,
    headers,
    body: options2.template({ head, body })
  };
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(coalesce_to_error(err));
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const { name, message, stack } = error2;
    serialized = try_serialize({ ...error2, name, message, stack });
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded2) {
  const has_error_status = loaded2.status && loaded2.status >= 400 && loaded2.status <= 599 && !loaded2.redirect;
  if (loaded2.error || has_error_status) {
    const status = loaded2.status;
    if (!loaded2.error && has_error_status) {
      return {
        status: status || 500,
        error: new Error()
      };
    }
    const error2 = typeof loaded2.error === "string" ? new Error(loaded2.error) : loaded2.error;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error2 };
    }
    return { status, error: error2 };
  }
  if (loaded2.redirect) {
    if (!loaded2.status || Math.floor(loaded2.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded2.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  if (loaded2.context) {
    throw new Error('You are returning "context" from a load function. "context" was renamed to "stuff", please adjust your code accordingly.');
  }
  return loaded2;
}
var s = JSON.stringify;
async function load_node({
  request,
  options: options2,
  state,
  route,
  page,
  node,
  $session,
  stuff,
  prerender_enabled,
  is_leaf,
  is_error,
  status,
  error: error2
}) {
  const { module: module2 } = node;
  let uses_credentials = false;
  const fetched = [];
  let set_cookie_headers = [];
  let loaded2;
  const page_proxy = new Proxy(page, {
    get: (target, prop, receiver) => {
      if (prop === "query" && prerender_enabled) {
        throw new Error("Cannot access query on a page with prerendering enabled");
      }
      return Reflect.get(target, prop, receiver);
    }
  });
  if (module2.load) {
    const load_input = {
      page: page_proxy,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let url;
        if (typeof resource === "string") {
          url = resource;
        } else {
          url = resource.url;
          opts = {
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity,
            ...opts
          };
        }
        const resolved = resolve(request.path, url.split("?")[0]);
        let response;
        const filename = resolved.replace(options2.paths.assets, "").slice(1);
        const filename_html = `${filename}/index.html`;
        const asset = options2.manifest.assets.find((d) => d.file === filename || d.file === filename_html);
        if (asset) {
          response = options2.read ? new Response(options2.read(asset.file), {
            headers: asset.type ? { "content-type": asset.type } : {}
          }) : await fetch(`http://${page.host}/${asset.file}`, opts);
        } else if (resolved.startsWith("/") && !resolved.startsWith("//")) {
          const relative = resolved;
          const headers = {
            ...opts.headers
          };
          if (opts.credentials !== "omit") {
            uses_credentials = true;
            headers.cookie = request.headers.cookie;
            if (!headers.authorization) {
              headers.authorization = request.headers.authorization;
            }
          }
          if (opts.body && typeof opts.body !== "string") {
            throw new Error("Request body must be a string");
          }
          const search = url.includes("?") ? url.slice(url.indexOf("?") + 1) : "";
          const rendered = await respond({
            host: request.host,
            method: opts.method || "GET",
            headers,
            path: relative,
            rawBody: opts.body == null ? null : new TextEncoder().encode(opts.body),
            query: new URLSearchParams(search)
          }, options2, {
            fetched: url,
            initiator: route
          });
          if (rendered) {
            if (state.prerender) {
              state.prerender.dependencies.set(relative, rendered);
            }
            response = new Response(rendered.body, {
              status: rendered.status,
              headers: rendered.headers
            });
          }
        } else {
          if (resolved.startsWith("//")) {
            throw new Error(`Cannot request protocol-relative URL (${url}) in server-side fetch`);
          }
          if (typeof request.host !== "undefined") {
            const { hostname: fetch_hostname } = new URL(url);
            const [server_hostname] = request.host.split(":");
            if (`.${fetch_hostname}`.endsWith(`.${server_hostname}`) && opts.credentials !== "omit") {
              uses_credentials = true;
              opts.headers = {
                ...opts.headers,
                cookie: request.headers.cookie
              };
            }
          }
          const external_request = new Request(url, opts);
          response = await options2.hooks.externalFetch.call(null, external_request);
        }
        if (response) {
          const proxy = new Proxy(response, {
            get(response2, key, receiver) {
              async function text() {
                const body = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 === "set-cookie") {
                    set_cookie_headers = set_cookie_headers.concat(value);
                  } else if (key2 !== "etag") {
                    headers[key2] = value;
                  }
                }
                if (!opts.body || typeof opts.body === "string") {
                  fetched.push({
                    url,
                    body: opts.body,
                    json: `{"status":${response2.status},"statusText":${s(response2.statusText)},"headers":${s(headers)},"body":"${escape_json_string_in_html(body)}"}`
                  });
                }
                return body;
              }
              if (key === "text") {
                return text;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text());
                };
              }
              return Reflect.get(response2, key, response2);
            }
          });
          return proxy;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      stuff: { ...stuff }
    };
    if (is_error) {
      load_input.status = status;
      load_input.error = error2;
    }
    loaded2 = await module2.load.call(null, load_input);
  } else {
    loaded2 = {};
  }
  if (!loaded2 && is_leaf && !is_error)
    return;
  if (!loaded2) {
    throw new Error(`${node.entry} - load must return a value except for page fall through`);
  }
  return {
    node,
    loaded: normalize(loaded2),
    stuff: loaded2.stuff || stuff,
    fetched,
    set_cookie_headers,
    uses_credentials
  };
}
var absolute = /^([a-z]+:)?\/?\//;
function resolve(base2, path) {
  const base_match = absolute.exec(base2);
  const path_match = absolute.exec(path);
  if (!base_match) {
    throw new Error(`bad base path: "${base2}"`);
  }
  const baseparts = path_match ? [] : base2.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path.slice(path_match[0].length).split("/") : path.split("/");
  baseparts.pop();
  for (let i = 0; i < pathparts.length; i += 1) {
    const part = pathparts[i];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix}${baseparts.join("/")}`;
}
async function respond_with_error({ request, options: options2, state, $session, status, error: error2 }) {
  const default_layout = await options2.load_component(options2.manifest.layout);
  const default_error = await options2.load_component(options2.manifest.error);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params: {}
  };
  const loaded2 = await load_node({
    request,
    options: options2,
    state,
    route: null,
    page,
    node: default_layout,
    $session,
    stuff: {},
    prerender_enabled: is_prerender_enabled(options2, default_error, state),
    is_leaf: false,
    is_error: false
  });
  const branch = [
    loaded2,
    await load_node({
      request,
      options: options2,
      state,
      route: null,
      page,
      node: default_error,
      $session,
      stuff: loaded2 ? loaded2.stuff : {},
      prerender_enabled: is_prerender_enabled(options2, default_error, state),
      is_leaf: false,
      is_error: true,
      status,
      error: error2
    })
  ];
  try {
    return await render_response({
      options: options2,
      $session,
      page_config: {
        hydrate: options2.hydrate,
        router: options2.router,
        ssr: options2.ssr
      },
      status,
      error: error2,
      branch,
      page
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return {
      status: 500,
      headers: {},
      body: error3.stack
    };
  }
}
function is_prerender_enabled(options2, node, state) {
  return options2.prerender && (!!node.module.prerender || !!state.prerender && state.prerender.all);
}
async function respond$1(opts) {
  const { request, options: options2, state, $session, route } = opts;
  let nodes;
  try {
    nodes = await Promise.all(route.a.map((id) => id ? options2.load_component(id) : void 0));
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error3
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  let page_config = get_page_config(leaf, options2);
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return {
      status: 204,
      headers: {},
      body: ""
    };
  }
  let branch = [];
  let status = 200;
  let error2;
  let set_cookie_headers = [];
  ssr:
    if (page_config.ssr) {
      let stuff = {};
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        let loaded2;
        if (node) {
          try {
            loaded2 = await load_node({
              ...opts,
              node,
              stuff,
              prerender_enabled: is_prerender_enabled(options2, node, state),
              is_leaf: i === nodes.length - 1,
              is_error: false
            });
            if (!loaded2)
              return;
            set_cookie_headers = set_cookie_headers.concat(loaded2.set_cookie_headers);
            if (loaded2.loaded.redirect) {
              return with_cookies({
                status: loaded2.loaded.status,
                headers: {
                  location: encodeURI(loaded2.loaded.redirect)
                }
              }, set_cookie_headers);
            }
            if (loaded2.loaded.error) {
              ({ status, error: error2 } = loaded2.loaded);
            }
          } catch (err) {
            const e = coalesce_to_error(err);
            options2.handle_error(e, request);
            status = 500;
            error2 = e;
          }
          if (loaded2 && !error2) {
            branch.push(loaded2);
          }
          if (error2) {
            while (i--) {
              if (route.b[i]) {
                const error_node = await options2.load_component(route.b[i]);
                let node_loaded;
                let j = i;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  const error_loaded = await load_node({
                    ...opts,
                    node: error_node,
                    stuff: node_loaded.stuff,
                    prerender_enabled: is_prerender_enabled(options2, error_node, state),
                    is_leaf: false,
                    is_error: true,
                    status,
                    error: error2
                  });
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  page_config = get_page_config(error_node.module, options2);
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  break ssr;
                } catch (err) {
                  const e = coalesce_to_error(err);
                  options2.handle_error(e, request);
                  continue;
                }
              }
            }
            return with_cookies(await respond_with_error({
              request,
              options: options2,
              state,
              $session,
              status,
              error: error2
            }), set_cookie_headers);
          }
        }
        if (loaded2 && loaded2.loaded.stuff) {
          stuff = {
            ...stuff,
            ...loaded2.loaded.stuff
          };
        }
      }
    }
  try {
    return with_cookies(await render_response({
      ...opts,
      page_config,
      status,
      error: error2,
      branch: branch.filter(Boolean)
    }), set_cookie_headers);
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return with_cookies(await respond_with_error({
      ...opts,
      status: 500,
      error: error3
    }), set_cookie_headers);
  }
}
function get_page_config(leaf, options2) {
  return {
    ssr: "ssr" in leaf ? !!leaf.ssr : options2.ssr,
    router: "router" in leaf ? !!leaf.router : options2.router,
    hydrate: "hydrate" in leaf ? !!leaf.hydrate : options2.hydrate
  };
}
function with_cookies(response, set_cookie_headers) {
  if (set_cookie_headers.length) {
    response.headers["set-cookie"] = set_cookie_headers;
  }
  return response;
}
async function render_page(request, route, match, options2, state) {
  if (state.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.path}`
    };
  }
  const params = route.params(match);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params
  };
  const $session = await options2.hooks.getSession(request);
  const response = await respond$1({
    request,
    options: options2,
    state,
    $session,
    route,
    page
  });
  if (response) {
    return response;
  }
  if (state.fetched) {
    return {
      status: 500,
      headers: {},
      body: `Bad request in load function: failed to fetch ${state.fetched}`
    };
  }
}
function read_only_form_data() {
  const map = new Map();
  return {
    append(key, value) {
      if (map.has(key)) {
        (map.get(key) || []).push(value);
      } else {
        map.set(key, [value]);
      }
    },
    data: new ReadOnlyFormData(map)
  };
}
var ReadOnlyFormData = class {
  constructor(map) {
    __privateAdd(this, _map, void 0);
    __privateSet(this, _map, map);
  }
  get(key) {
    const value = __privateGet(this, _map).get(key);
    return value && value[0];
  }
  getAll(key) {
    return __privateGet(this, _map).get(key);
  }
  has(key) {
    return __privateGet(this, _map).has(key);
  }
  *[Symbol.iterator]() {
    for (const [key, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *entries() {
    for (const [key, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *keys() {
    for (const [key] of __privateGet(this, _map))
      yield key;
  }
  *values() {
    for (const [, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield value[i];
      }
    }
  }
};
_map = new WeakMap();
function parse_body(raw, headers) {
  if (!raw)
    return raw;
  const content_type = headers["content-type"];
  const [type, ...directives] = content_type ? content_type.split(/;\s*/) : [];
  const text = () => new TextDecoder(headers["content-encoding"] || "utf-8").decode(raw);
  switch (type) {
    case "text/plain":
      return text();
    case "application/json":
      return JSON.parse(text());
    case "application/x-www-form-urlencoded":
      return get_urlencoded(text());
    case "multipart/form-data": {
      const boundary = directives.find((directive) => directive.startsWith("boundary="));
      if (!boundary)
        throw new Error("Missing boundary");
      return get_multipart(text(), boundary.slice("boundary=".length));
    }
    default:
      return raw;
  }
}
function get_urlencoded(text) {
  const { data, append } = read_only_form_data();
  text.replace(/\+/g, " ").split("&").forEach((str) => {
    const [key, value] = str.split("=");
    append(decodeURIComponent(key), decodeURIComponent(value));
  });
  return data;
}
function get_multipart(text, boundary) {
  const parts = text.split(`--${boundary}`);
  if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
    throw new Error("Malformed form data");
  }
  const { data, append } = read_only_form_data();
  parts.slice(1, -1).forEach((part) => {
    const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
    if (!match) {
      throw new Error("Malformed form data");
    }
    const raw_headers = match[1];
    const body = match[2].trim();
    let key;
    const headers = {};
    raw_headers.split("\r\n").forEach((str) => {
      const [raw_header, ...raw_directives] = str.split("; ");
      let [name, value] = raw_header.split(": ");
      name = name.toLowerCase();
      headers[name] = value;
      const directives = {};
      raw_directives.forEach((raw_directive) => {
        const [name2, value2] = raw_directive.split("=");
        directives[name2] = JSON.parse(value2);
      });
      if (name === "content-disposition") {
        if (value !== "form-data")
          throw new Error("Malformed form data");
        if (directives.filename) {
          throw new Error("File upload is not yet implemented");
        }
        if (directives.name) {
          key = directives.name;
        }
      }
    });
    if (!key)
      throw new Error("Malformed form data");
    append(key, body);
  });
  return data;
}
async function respond(incoming, options2, state = {}) {
  if (incoming.path !== "/" && options2.trailing_slash !== "ignore") {
    const has_trailing_slash = incoming.path.endsWith("/");
    if (has_trailing_slash && options2.trailing_slash === "never" || !has_trailing_slash && options2.trailing_slash === "always" && !(incoming.path.split("/").pop() || "").includes(".")) {
      const path = has_trailing_slash ? incoming.path.slice(0, -1) : incoming.path + "/";
      const q = incoming.query.toString();
      return {
        status: 301,
        headers: {
          location: options2.paths.base + path + (q ? `?${q}` : "")
        }
      };
    }
  }
  const headers = lowercase_keys(incoming.headers);
  const request = {
    ...incoming,
    headers,
    body: parse_body(incoming.rawBody, headers),
    params: {},
    locals: {}
  };
  try {
    return await options2.hooks.handle({
      request,
      resolve: async (request2) => {
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            options: options2,
            $session: await options2.hooks.getSession(request2),
            page_config: { ssr: false, router: true, hydrate: true },
            status: 200,
            branch: []
          });
        }
        const decoded = decodeURI(request2.path);
        for (const route of options2.manifest.routes) {
          const match = route.pattern.exec(decoded);
          if (!match)
            continue;
          const response = route.type === "endpoint" ? await render_endpoint(request2, route, match) : await render_page(request2, route, match, options2, state);
          if (response) {
            if (response.status === 200) {
              const cache_control = get_single_valued_header(response.headers, "cache-control");
              if (!cache_control || !/(no-store|immutable)/.test(cache_control)) {
                const etag = `"${hash(response.body || "")}"`;
                if (request2.headers["if-none-match"] === etag) {
                  return {
                    status: 304,
                    headers: {},
                    body: ""
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        const $session = await options2.hooks.getSession(request2);
        return await respond_with_error({
          request: request2,
          options: options2,
          state,
          $session,
          status: 404,
          error: new Error(`Not found: ${request2.path}`)
        });
      }
    });
  } catch (err) {
    const e = coalesce_to_error(err);
    options2.handle_error(e, request);
    return {
      status: 500,
      headers: {},
      body: options2.dev ? e.stack : e.message
    };
  }
}
function noop$1() {
}
function is_promise(value) {
  return value && typeof value === "object" && typeof value.then === "function";
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a2, b2) {
  return a2 != a2 ? b2 == b2 : a2 !== b2 || (a2 && typeof a2 === "object" || typeof a2 === "function");
}
function subscribe(store, ...callbacks2) {
  if (store == null) {
    return noop$1;
  }
  const unsub = store.subscribe(...callbacks2);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
  let value;
  subscribe(store, (_) => value = _)();
  return value;
}
function compute_rest_props(props, keys) {
  const rest = {};
  keys = new Set(keys);
  for (const k in props)
    if (!keys.has(k) && k[0] !== "$")
      rest[k] = props[k];
  return rest;
}
var is_client = typeof window !== "undefined";
var now = is_client ? () => window.performance.now() : () => Date.now();
var raf = is_client ? (cb2) => requestAnimationFrame(cb2) : noop$1;
var tasks = new Set();
function run_tasks(now2) {
  tasks.forEach((task) => {
    if (!task.c(now2)) {
      tasks.delete(task);
      task.f();
    }
  });
  if (tasks.size !== 0)
    raf(run_tasks);
}
function loop(callback) {
  let task;
  if (tasks.size === 0)
    raf(run_tasks);
  return {
    promise: new Promise((fulfill) => {
      tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      tasks.delete(task);
    }
  };
}
function custom_event(type, detail, bubbles = false) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, bubbles, false, detail);
  return e;
}
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail) => {
    const callbacks2 = component.$$.callbacks[type];
    if (callbacks2) {
      const event = custom_event(type, detail);
      callbacks2.slice().forEach((fn) => {
        fn.call(component, event);
      });
    }
  };
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
function getContext(key) {
  return get_current_component().$$.context.get(key);
}
var dirty_components = [];
var binding_callbacks = [];
var render_callbacks = [];
var flush_callbacks = [];
var resolved_promise = Promise.resolve();
var update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
var flushing = false;
var seen_callbacks = new Set();
function flush() {
  if (flushing)
    return;
  flushing = true;
  do {
    for (let i = 0; i < dirty_components.length; i += 1) {
      const component = dirty_components[i];
      set_current_component(component);
      update(component.$$);
    }
    set_current_component(null);
    dirty_components.length = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  flushing = false;
  seen_callbacks.clear();
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
var boolean_attributes = new Set([
  "allowfullscreen",
  "allowpaymentrequest",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected"
]);
var invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
function spread(args, classes_to_add) {
  const attributes = Object.assign({}, ...args);
  if (classes_to_add) {
    if (attributes.class == null) {
      attributes.class = classes_to_add;
    } else {
      attributes.class += " " + classes_to_add;
    }
  }
  let str = "";
  Object.keys(attributes).forEach((name) => {
    if (invalid_attribute_name_character.test(name))
      return;
    const value = attributes[name];
    if (value === true)
      str += " " + name;
    else if (boolean_attributes.has(name.toLowerCase())) {
      if (value)
        str += " " + name;
    } else if (value != null) {
      str += ` ${name}="${value}"`;
    }
  });
  return str;
}
var escaped = {
  '"': "&quot;",
  "'": "&#39;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};
function escape(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
}
function escape_attribute_value(value) {
  return typeof value === "string" ? escape(value) : value;
}
function escape_object(obj) {
  const result = {};
  for (const key in obj) {
    result[key] = escape_attribute_value(obj[key]);
  }
  return result;
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
var missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
var on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}
function afterUpdate() {
}
var css$s = {
  code: "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
  map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title || 'untitled page';\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n<\/script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}/>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\t{title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t#svelte-announcer {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\ttop: 0;\\n\\t\\tclip: rect(0 0 0 0);\\n\\t\\tclip-path: inset(50%);\\n\\t\\toverflow: hidden;\\n\\t\\twhite-space: nowrap;\\n\\t\\twidth: 1px;\\n\\t\\theight: 1px;\\n\\t}\\n</style>"],"names":[],"mappings":"AAsDC,iBAAiB,eAAC,CAAC,AAClB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnB,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,AACZ,CAAC"}`
};
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  $$result.css.add(css$s);
  {
    stores.page.set(page);
  }
  return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
      default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}` : ``}`
    })}` : ``}`
  })}

${``}`;
});
var base = "";
var assets = "";
function set_paths(paths) {
  base = paths.base;
  assets = paths.assets || base;
}
function set_prerendering(value) {
}
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module"
});
var template = ({ head, body }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="/favicon.png" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n		' + head + '\n	</head>\n	<body>\n		<div id="svelte">' + body + "</div>\n	</body>\n</html>\n";
var options = null;
var default_settings = { paths: { "base": "", "assets": "" } };
function init(settings = default_settings) {
  set_paths(settings.paths);
  set_prerendering(settings.prerendering || false);
  const hooks = get_hooks(user_hooks);
  options = {
    amp: false,
    dev: false,
    entry: {
      file: assets + "/_app/start-787e4791.js",
      css: [assets + "/_app/assets/start-d5b4de3e.css"],
      js: [assets + "/_app/start-787e4791.js", assets + "/_app/chunks/vendor-0f86114f.js", assets + "/_app/chunks/preload-helper-ec9aa979.js"]
    },
    fetched: void 0,
    floc: false,
    get_component_path: (id) => assets + "/_app/" + entry_lookup[id],
    get_stack: (error2) => String(error2),
    handle_error: (error2, request) => {
      hooks.handleError({ error: error2, request });
      error2.stack = options.get_stack(error2);
    },
    hooks,
    hydrate: true,
    initiator: void 0,
    load_component,
    manifest,
    paths: settings.paths,
    prerender: true,
    read: settings.read,
    root: Root,
    service_worker: null,
    router: true,
    ssr: true,
    target: "#svelte",
    template,
    trailing_slash: "never"
  };
}
var empty = () => ({});
var manifest = {
  assets: [{ "file": "assets/background.jpg", "size": 353899, "type": "image/jpeg" }, { "file": "assets/dial-codes.json", "size": 16207, "type": "application/json" }, { "file": "assets/icons/chevron-left-hover.svg", "size": 1854, "type": "image/svg+xml" }, { "file": "assets/icons/chevron-left.svg", "size": 1847, "type": "image/svg+xml" }, { "file": "assets/icons/chevron-right-hover.svg", "size": 1862, "type": "image/svg+xml" }, { "file": "assets/icons/chevron-right.svg", "size": 1846, "type": "image/svg+xml" }, { "file": "assets/logo.png", "size": 4800, "type": "image/png" }, { "file": "assets/planta.fbx", "size": 64436396, "type": null }, { "file": "favicon.png", "size": 1571, "type": "image/png" }],
  layout: "src/routes/__layout.svelte",
  error: ".svelte-kit/build/components/error.svelte",
  routes: [
    {
      type: "page",
      pattern: /^\/$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/leadership\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/leadership.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/what-we-do\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/what-we-do.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/who-we-are\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/who-we-are.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/contact\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/contact.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/news\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/news.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    }
  ]
};
var get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({ request, resolve: resolve2 }) => resolve2(request)),
  handleError: hooks.handleError || (({ error: error2 }) => console.error(error2.stack)),
  externalFetch: hooks.externalFetch || fetch
});
var module_lookup = {
  "src/routes/__layout.svelte": () => Promise.resolve().then(function() {
    return __layout;
  }),
  ".svelte-kit/build/components/error.svelte": () => Promise.resolve().then(function() {
    return error;
  }),
  "src/routes/index.svelte": () => Promise.resolve().then(function() {
    return index;
  }),
  "src/routes/leadership.svelte": () => Promise.resolve().then(function() {
    return leadership;
  }),
  "src/routes/what-we-do.svelte": () => Promise.resolve().then(function() {
    return whatWeDo;
  }),
  "src/routes/who-we-are.svelte": () => Promise.resolve().then(function() {
    return whoWeAre;
  }),
  "src/routes/contact.svelte": () => Promise.resolve().then(function() {
    return contact;
  }),
  "src/routes/news.svelte": () => Promise.resolve().then(function() {
    return news;
  })
};
var metadata_lookup = { "src/routes/__layout.svelte": { "entry": "pages/__layout.svelte-df356afc.js", "css": ["assets/pages/__layout.svelte-36c1cefd.css"], "js": ["pages/__layout.svelte-df356afc.js", "chunks/vendor-0f86114f.js", "chunks/renuestore-b148bdc6.js"], "styles": [] }, ".svelte-kit/build/components/error.svelte": { "entry": "error.svelte-bd0c9bbd.js", "css": [], "js": ["error.svelte-bd0c9bbd.js", "chunks/vendor-0f86114f.js"], "styles": [] }, "src/routes/index.svelte": { "entry": "pages/index.svelte-fd85c196.js", "css": ["assets/pages/index.svelte-975def59.css", "assets/lg-primary-icon-fill.svelte_svelte&type=style&lang-dc4ed441.css", "assets/section-one-col-center-4b6fe5dd.css"], "js": ["pages/index.svelte-fd85c196.js", "chunks/vendor-0f86114f.js", "chunks/renuestore-b148bdc6.js", "chunks/section-one-col-center-f6008215.js"], "styles": [] }, "src/routes/leadership.svelte": { "entry": "pages/leadership.svelte-bc954268.js", "css": ["assets/pages/leadership.svelte-70f2077d.css", "assets/lg-primary-icon-fill.svelte_svelte&type=style&lang-dc4ed441.css", "assets/hero-secondary-bd0cefc1.css", "assets/section-one-col-center-4b6fe5dd.css"], "js": ["pages/leadership.svelte-bc954268.js", "chunks/vendor-0f86114f.js", "chunks/renuestore-b148bdc6.js", "chunks/hero-secondary-c38fc00f.js", "chunks/section-one-col-center-f6008215.js", "chunks/contact-section-37c5f470.js"], "styles": [] }, "src/routes/what-we-do.svelte": { "entry": "pages/what-we-do.svelte-11c7bc15.js", "css": ["assets/pages/what-we-do.svelte-61b078f1.css"], "js": ["pages/what-we-do.svelte-11c7bc15.js", "chunks/vendor-0f86114f.js", "chunks/preload-helper-ec9aa979.js"], "styles": [] }, "src/routes/who-we-are.svelte": { "entry": "pages/who-we-are.svelte-8bfbec49.js", "css": ["assets/pages/who-we-are.svelte-030fdceb.css", "assets/lg-primary-icon-fill.svelte_svelte&type=style&lang-dc4ed441.css", "assets/hero-secondary-bd0cefc1.css", "assets/section-one-col-center-4b6fe5dd.css"], "js": ["pages/who-we-are.svelte-8bfbec49.js", "chunks/vendor-0f86114f.js", "chunks/renuestore-b148bdc6.js", "chunks/hero-secondary-c38fc00f.js", "chunks/section-one-col-center-f6008215.js", "chunks/contact-section-37c5f470.js"], "styles": [] }, "src/routes/contact.svelte": { "entry": "pages/contact.svelte-79c9e890.js", "css": ["assets/pages/contact.svelte-9be117a5.css", "assets/lg-primary-icon-fill.svelte_svelte&type=style&lang-dc4ed441.css", "assets/hero-secondary-bd0cefc1.css"], "js": ["pages/contact.svelte-79c9e890.js", "chunks/vendor-0f86114f.js", "chunks/renuestore-b148bdc6.js", "chunks/hero-secondary-c38fc00f.js"], "styles": [] }, "src/routes/news.svelte": { "entry": "pages/news.svelte-6e510a13.js", "css": [], "js": ["pages/news.svelte-6e510a13.js", "chunks/vendor-0f86114f.js"], "styles": [] } };
async function load_component(file) {
  const { entry, css: css2, js, styles } = metadata_lookup[file];
  return {
    module: await module_lookup[file](),
    entry: assets + "/_app/" + entry,
    css: css2.map((dep) => assets + "/_app/" + dep),
    js: js.map((dep) => assets + "/_app/" + dep),
    styles
  };
}
function render$1(request, {
  prerender
} = {}) {
  const host = request.headers["host"];
  return respond({ ...request, host }, options, { prerender });
}
var css$r = {
  code: ".svelte-w79mn2{overflow:hidden}.underline-object.svelte-w79mn2{background:linear-gradient(to right, #3fc4e5, #c5e87b)}.underline-wrapper.svelte-w79mn2{position:absolute}",
  map: '{"version":3,"file":"menu-item.svelte","sources":["menu-item.svelte"],"sourcesContent":["<script>\\n  //LIBS\\n  import { scale } from \\"svelte/transition\\";\\n\\n  //PROPS\\n  export let label, url, id;\\n\\n  $: visible = false;\\n\\n  const handleMouseEnter = () => {\\n    // let underline = document.getElementById(id);\\n    // underline.style.background = \\"linear-gradient(to right, #3FC4E5, #C5E87B)\\";\\n    visible = true;\\n  };\\n\\n  const handleMouseleave = () => {\\n    // let underline = document.getElementById(id);\\n    // underline.style.background = \\"#00000000\\";\\n    visible = false;\\n  };\\n<\/script>\\n\\n<div\\n  id=\\"wrapper\\"\\n  class=\\"transition ease-in-out hover:text-secondary-main duration-400 cursor-pointer\\"\\n  on:mouseenter={handleMouseEnter}\\n  on:mouseleave={handleMouseleave}\\n>\\n  <div id=\\"text-wrapper\\" class=\\"px-16 mb-8\\">\\n    <a href={url}>\\n      {label}\\n    </a>\\n  </div>\\n  <!-- <div class=\\"w-75 h-8\\" /> -->\\n  {#if visible}\\n    <div class=\\"flex items-center justify-center\\">\\n      <div\\n        transition:scale={{ start: 0.5, duration: 600 }}\\n        class=\\"underline-wrapper w-120 h-6\\"\\n      >\\n        <div class=\\"underline-object w-full h-6\\" {id} />\\n      </div>\\n    </div>\\n  {/if}\\n</div>\\n\\n<style>\\n  * {\\n    overflow: hidden;\\n  }\\n\\n  #wrapper {\\n    /* position: relative; */\\n  }\\n\\n  #text-wrapper {\\n  }\\n\\n  .underline-object {\\n    background: linear-gradient(to right, #3fc4e5, #c5e87b);\\n  }\\n\\n  .underline-wrapper {\\n    position: absolute;\\n  }\\n</style>\\n"],"names":[],"mappings":"AA+CE,cAAE,CAAC,AACD,QAAQ,CAAE,MAAM,AAClB,CAAC,AASD,iBAAiB,cAAC,CAAC,AACjB,UAAU,CAAE,gBAAgB,EAAE,CAAC,KAAK,CAAC,CAAC,OAAO,CAAC,CAAC,OAAO,CAAC,AACzD,CAAC,AAED,kBAAkB,cAAC,CAAC,AAClB,QAAQ,CAAE,QAAQ,AACpB,CAAC"}'
};
var Menu_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let visible;
  let { label, url, id } = $$props;
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.url === void 0 && $$bindings.url && url !== void 0)
    $$bindings.url(url);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  $$result.css.add(css$r);
  visible = false;
  return `<div id="${"wrapper"}" class="${"transition ease-in-out hover:text-secondary-main duration-400 cursor-pointer svelte-w79mn2"}"><div id="${"text-wrapper"}" class="${"px-16 mb-8 svelte-w79mn2"}"><a${add_attribute("href", url, 0)} class="${"svelte-w79mn2"}">${escape(label)}</a></div>
  
  ${visible ? `<div class="${"flex items-center justify-center svelte-w79mn2"}"><div class="${"underline-wrapper w-120 h-6 svelte-w79mn2"}"><div class="${"underline-object w-full h-6 svelte-w79mn2"}"${add_attribute("id", id, 0)}></div></div></div>` : ``}
</div>`;
});
var subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop$1) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update2(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop$1) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop$1;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update: update2, subscribe: subscribe2 };
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  const auto2 = fn.length < 2;
  return readable(initial_value, (set) => {
    let inited = false;
    const values = [];
    let pending = 0;
    let cleanup = noop$1;
    const sync2 = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set);
      if (auto2) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop$1;
      }
    };
    const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
      values[i] = value;
      pending &= ~(1 << i);
      if (inited) {
        sync2();
      }
    }, () => {
      pending |= 1 << i;
    }));
    inited = true;
    sync2();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
    };
  });
}
var repoUrl = "https://renue-web-app.prismic.io/api/v2";
var cms_url = readable(repoUrl);
var css$q = {
  code: ".svelte-1kk9iex{overflow:hidden}#wrapper.svelte-1kk9iex{position:fixed;left:0;top:0;z-index:100}",
  map: '{"version":3,"file":"navbar.svelte","sources":["navbar.svelte"],"sourcesContent":["<script>\\n  //LIBS\\n  import { onMount } from \\"svelte\\";\\n\\n  //COMPONENTS\\n  import MenuItem from \\"./menu-item.svelte\\";\\n\\n  //STORES\\n  import { cms_url } from \\"../../stores/renuestore\\";\\n\\n  let navBarItems = {};\\n  let socialItems = {};\\n\\n  /////////////////////////////////////////////\\n\\n  const fetchRefs = async () => {\\n    const res = await fetch($cms_url);\\n    const data = await res.json();\\n    return data.refs;\\n  };\\n\\n  const fetchData = async (callback) => {\\n    const refs = await fetchRefs();\\n\\n    const masterRef = await refs.map((ref, index) => {\\n      return ref.ref;\\n    });\\n\\n    const url =\\n      $cms_url + \\"/documents/search?ref=\\" + masterRef + \\"#format=json\\";\\n    const res = await fetch(url);\\n    const data = await res.json();\\n\\n    let navBarData = {};\\n\\n    await data.results.map((data, index) => {\\n      if (data.slugs[0] === \\"navbar\\") {\\n        navBarData = data.data;\\n      }\\n    });\\n\\n    callback(navBarData);\\n  };\\n\\n  onMount(async () => {\\n    fetchData(async (navbar) => {\\n      //console.log(\\"navbar\\", navbar);\\n      navBarItems = await navbar;\\n      socialItems = navbar.social;\\n    });\\n    return () => navBarItems;\\n  });\\n<\/script>\\n\\n<div\\n  id=\\"wrapper\\"\\n  class=\\"w-full xl:px-148 lg:px-96 md:px-72 h-72 bg-on-background-variant-alpha\\"\\n>\\n  <nav class=\\"flex py-16 lg:text-md md:text-md\\">\\n    <div class=\\"flex-grow\\">\\n      <a class=\\"\\" href=\\"/\\">\\n        {#if navBarItems.logo !== undefined}\\n          <img src={navBarItems.logo.url} alt=\\"Renue Logo\\" class=\\"md:w-168\\" />\\n        {/if}\\n      </a>\\n    </div>\\n    <div class=\\"flex items-center xl:space-x-16 lg:space-x-32\\">\\n      {#if navBarItems[\\"menu-item\\"] !== undefined}\\n        {#each navBarItems[\\"menu-item\\"] as item}\\n          <MenuItem label={item.label} url={item.url} id={item.label} />\\n        {/each}\\n      {/if}\\n    </div>\\n  </nav>\\n</div>\\n\\n<style>\\n  * {\\n    overflow: hidden;\\n  }\\n  #wrapper {\\n    position: fixed;\\n    left: 0;\\n    top: 0;\\n    z-index: 100;\\n  }\\n</style>\\n"],"names":[],"mappings":"AA6EE,eAAE,CAAC,AACD,QAAQ,CAAE,MAAM,AAClB,CAAC,AACD,QAAQ,eAAC,CAAC,AACR,QAAQ,CAAE,KAAK,CACf,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,OAAO,CAAE,GAAG,AACd,CAAC"}'
};
var Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_cms_url;
  $$unsubscribe_cms_url = subscribe(cms_url, (value) => value);
  let navBarItems = {};
  $$result.css.add(css$q);
  $$unsubscribe_cms_url();
  return `<div id="${"wrapper"}" class="${"w-full xl:px-148 lg:px-96 md:px-72 h-72 bg-on-background-variant-alpha svelte-1kk9iex"}"><nav class="${"flex py-16 lg:text-md md:text-md svelte-1kk9iex"}"><div class="${"flex-grow svelte-1kk9iex"}"><a class="${" svelte-1kk9iex"}" href="${"/"}">${navBarItems.logo !== void 0 ? `<img${add_attribute("src", navBarItems.logo.url, 0)} alt="${"Renue Logo"}" class="${"md:w-168 svelte-1kk9iex"}">` : ``}</a></div>
    <div class="${"flex items-center xl:space-x-16 lg:space-x-32 svelte-1kk9iex"}">${navBarItems["menu-item"] !== void 0 ? `${each(navBarItems["menu-item"], (item) => `${validate_component(Menu_item, "MenuItem").$$render($$result, {
    label: item.label,
    url: item.url,
    id: item.label
  }, {}, {})}`)}` : ``}</div></nav>
</div>`;
});
var matchName = /^[a-z0-9]+(-[a-z0-9]+)*$/;
var iconDefaults = Object.freeze({
  left: 0,
  top: 0,
  width: 16,
  height: 16,
  rotate: 0,
  vFlip: false,
  hFlip: false
});
function fullIcon(data) {
  return { ...iconDefaults, ...data };
}
var stringToIcon = (value, validate, allowSimpleName, provider = "") => {
  const colonSeparated = value.split(":");
  if (value.slice(0, 1) === "@") {
    if (colonSeparated.length < 2 || colonSeparated.length > 3) {
      return null;
    }
    provider = colonSeparated.shift().slice(1);
  }
  if (colonSeparated.length > 3 || !colonSeparated.length) {
    return null;
  }
  if (colonSeparated.length > 1) {
    const name2 = colonSeparated.pop();
    const prefix = colonSeparated.pop();
    const result = {
      provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
      prefix,
      name: name2
    };
    return validate && !validateIcon(result) ? null : result;
  }
  const name = colonSeparated[0];
  const dashSeparated = name.split("-");
  if (dashSeparated.length > 1) {
    const result = {
      provider,
      prefix: dashSeparated.shift(),
      name: dashSeparated.join("-")
    };
    return validate && !validateIcon(result) ? null : result;
  }
  if (allowSimpleName && provider === "") {
    const result = {
      provider,
      prefix: "",
      name
    };
    return validate && !validateIcon(result, allowSimpleName) ? null : result;
  }
  return null;
};
var validateIcon = (icon, allowSimpleName) => {
  if (!icon) {
    return false;
  }
  return !!((icon.provider === "" || icon.provider.match(matchName)) && (allowSimpleName && icon.prefix === "" || icon.prefix.match(matchName)) && icon.name.match(matchName));
};
function mergeIconData(icon, alias) {
  const result = { ...icon };
  for (const key in iconDefaults) {
    const prop = key;
    if (alias[prop] !== void 0) {
      const value = alias[prop];
      if (result[prop] === void 0) {
        result[prop] = value;
        continue;
      }
      switch (prop) {
        case "rotate":
          result[prop] = (result[prop] + value) % 4;
          break;
        case "hFlip":
        case "vFlip":
          result[prop] = value !== result[prop];
          break;
        default:
          result[prop] = value;
      }
    }
  }
  return result;
}
function getIconData$1(data, name, full = false) {
  function getIcon(name2, iteration) {
    var _a, _b, _c, _d;
    if (data.icons[name2] !== void 0) {
      return Object.assign({}, data.icons[name2]);
    }
    if (iteration > 5) {
      return null;
    }
    if (((_a = data.aliases) == null ? void 0 : _a[name2]) !== void 0) {
      const item = (_b = data.aliases) == null ? void 0 : _b[name2];
      const result2 = getIcon(item.parent, iteration + 1);
      if (result2) {
        return mergeIconData(result2, item);
      }
      return result2;
    }
    if (iteration === 0 && ((_c = data.chars) == null ? void 0 : _c[name2]) !== void 0) {
      return getIcon((_d = data.chars) == null ? void 0 : _d[name2], iteration + 1);
    }
    return null;
  }
  const result = getIcon(name, 0);
  if (result) {
    for (const key in iconDefaults) {
      if (result[key] === void 0 && data[key] !== void 0) {
        result[key] = data[key];
      }
    }
  }
  return result && full ? fullIcon(result) : result;
}
var matchChar = /^[a-f0-9]+(-[a-f0-9]+)*$/;
function validateIconProps(item, fix2) {
  for (const key in item) {
    const attr = key;
    const value = item[attr];
    const type = typeof value;
    if (type === "undefined") {
      delete item[attr];
      continue;
    }
    switch (key) {
      case "body":
      case "parent":
        if (type !== "string") {
          return key;
        }
        break;
      case "hFlip":
      case "vFlip":
      case "hidden":
        if (type !== "boolean") {
          if (fix2) {
            delete item[attr];
          } else {
            return key;
          }
        }
        break;
      case "width":
      case "height":
      case "left":
      case "top":
      case "rotate":
      case "inlineHeight":
      case "inlineTop":
      case "verticalAlign":
        if (type !== "number") {
          if (fix2) {
            delete item[attr];
          } else {
            return key;
          }
        }
        break;
      default:
        if (type === "object") {
          if (fix2) {
            delete item[attr];
          } else {
            return key;
          }
        }
    }
  }
  return null;
}
function validateIconSet(obj, options2) {
  const fix2 = !!(options2 == null ? void 0 : options2.fix);
  if (typeof obj !== "object" || obj === null || typeof obj.icons !== "object" || !obj.icons) {
    throw new Error("Bad icon set");
  }
  const data = obj;
  if (typeof (options2 == null ? void 0 : options2.prefix) === "string") {
    data.prefix = options2.prefix;
  } else if (typeof data.prefix !== "string" || !data.prefix.match(matchName)) {
    throw new Error("Invalid prefix");
  }
  if (typeof (options2 == null ? void 0 : options2.provider) === "string") {
    data.provider = options2.provider;
  } else if (data.provider !== void 0) {
    const value = data.provider;
    if (typeof value !== "string" || value !== "" && !value.match(matchName)) {
      if (fix2) {
        delete data.provider;
      } else {
        throw new Error("Invalid provider");
      }
    }
  }
  const icons = data.icons;
  Object.keys(icons).forEach((name) => {
    if (!name.match(matchName)) {
      if (fix2) {
        delete icons[name];
        return;
      }
      throw new Error(`Invalid icon name: "${name}"`);
    }
    const item = icons[name];
    if (typeof item !== "object" || item === null || typeof item.body !== "string") {
      if (fix2) {
        delete icons[name];
        return;
      }
      throw new Error(`Invalid icon: "${name}"`);
    }
    const key = typeof item.parent === "string" ? "parent" : validateIconProps(item, fix2);
    if (key !== null) {
      if (fix2) {
        delete icons[name];
        return;
      }
      throw new Error(`Invalid property "${key}" in icon "${name}"`);
    }
  });
  if (!Object.keys(data.icons).length) {
    throw new Error("Icon set is empty");
  }
  if (data.aliases !== void 0) {
    if (typeof data.aliases !== "object" || data.aliases === null) {
      if (fix2) {
        delete data.aliases;
      } else {
        throw new Error("Invalid aliases list");
      }
    }
  }
  if (typeof data.aliases === "object") {
    let validateAlias = function(name, iteration) {
      if (validatedAliases.has(name)) {
        return !failedAliases.has(name);
      }
      const item = aliases[name];
      if (iteration > 5 || typeof item !== "object" || item === null || typeof item.parent !== "string" || !name.match(matchName)) {
        if (fix2) {
          delete aliases[name];
          failedAliases.add(name);
          return false;
        }
        throw new Error(`Invalid icon alias: "${name}"`);
      }
      const parent = item.parent;
      if (data.icons[parent] === void 0) {
        if (aliases[parent] === void 0 || !validateAlias(parent, iteration + 1)) {
          if (fix2) {
            delete aliases[name];
            failedAliases.add(name);
            return false;
          }
          throw new Error(`Missing parent icon for alias "${name}`);
        }
      }
      if (fix2 && item.body !== void 0) {
        delete item.body;
      }
      const key = item.body !== void 0 ? "body" : validateIconProps(item, fix2);
      if (key !== null) {
        if (fix2) {
          delete aliases[name];
          failedAliases.add(name);
          return false;
        }
        throw new Error(`Invalid property "${key}" in alias "${name}"`);
      }
      validatedAliases.add(name);
      return true;
    };
    const aliases = data.aliases;
    const validatedAliases = new Set();
    const failedAliases = new Set();
    Object.keys(aliases).forEach((name) => {
      validateAlias(name, 0);
    });
    if (fix2 && !Object.keys(data.aliases).length) {
      delete data.aliases;
    }
  }
  Object.keys(iconDefaults).forEach((prop) => {
    const expectedType = typeof iconDefaults[prop];
    const actualType = typeof data[prop];
    if (actualType !== "undefined" && actualType !== expectedType) {
      throw new Error(`Invalid value type for "${prop}"`);
    }
  });
  if (data.chars !== void 0) {
    if (typeof data.chars !== "object" || data.chars === null) {
      if (fix2) {
        delete data.chars;
      } else {
        throw new Error("Invalid characters map");
      }
    }
  }
  if (typeof data.chars === "object") {
    const chars2 = data.chars;
    Object.keys(chars2).forEach((char) => {
      var _a;
      if (!char.match(matchChar) || typeof chars2[char] !== "string") {
        if (fix2) {
          delete chars2[char];
          return;
        }
        throw new Error(`Invalid character "${char}"`);
      }
      const target = chars2[char];
      if (data.icons[target] === void 0 && ((_a = data.aliases) == null ? void 0 : _a[target]) === void 0) {
        if (fix2) {
          delete chars2[char];
          return;
        }
        throw new Error(`Character "${char}" points to missing icon "${target}"`);
      }
    });
    if (fix2 && !Object.keys(data.chars).length) {
      delete data.chars;
    }
  }
  return data;
}
function isVariation(item) {
  for (const key in iconDefaults) {
    if (item[key] !== void 0) {
      return true;
    }
  }
  return false;
}
function parseIconSet(data, callback, options2) {
  options2 = options2 || {};
  const names2 = [];
  if (typeof data !== "object" || typeof data.icons !== "object") {
    return names2;
  }
  const validate = options2.validate;
  if (validate !== false) {
    try {
      validateIconSet(data, typeof validate === "object" ? validate : { fix: true });
    } catch (err) {
      return names2;
    }
  }
  if (data.not_found instanceof Array) {
    data.not_found.forEach((name) => {
      callback(name, null);
      names2.push(name);
    });
  }
  const icons = data.icons;
  Object.keys(icons).forEach((name) => {
    const iconData = getIconData$1(data, name, true);
    if (iconData) {
      callback(name, iconData);
      names2.push(name);
    }
  });
  const parseAliases = options2.aliases || "all";
  if (parseAliases !== "none" && typeof data.aliases === "object") {
    const aliases = data.aliases;
    Object.keys(aliases).forEach((name) => {
      if (parseAliases === "variations" && isVariation(aliases[name])) {
        return;
      }
      const iconData = getIconData$1(data, name, true);
      if (iconData) {
        callback(name, iconData);
        names2.push(name);
      }
    });
  }
  return names2;
}
var storage$1 = Object.create(null);
function newStorage(provider, prefix) {
  return {
    provider,
    prefix,
    icons: Object.create(null),
    missing: Object.create(null)
  };
}
function getStorage(provider, prefix) {
  if (storage$1[provider] === void 0) {
    storage$1[provider] = Object.create(null);
  }
  const providerStorage = storage$1[provider];
  if (providerStorage[prefix] === void 0) {
    providerStorage[prefix] = newStorage(provider, prefix);
  }
  return providerStorage[prefix];
}
function addIconSet(storage2, data) {
  const t = Date.now();
  return parseIconSet(data, (name, icon) => {
    if (icon) {
      storage2.icons[name] = icon;
    } else {
      storage2.missing[name] = t;
    }
  });
}
function addIconToStorage(storage2, name, icon) {
  try {
    if (typeof icon.body === "string") {
      storage2.icons[name] = Object.freeze(fullIcon(icon));
      return true;
    }
  } catch (err) {
  }
  return false;
}
function getIconFromStorage(storage2, name) {
  const value = storage2.icons[name];
  return value === void 0 ? null : value;
}
var simpleNames = false;
function allowSimpleNames(allow) {
  if (typeof allow === "boolean") {
    simpleNames = allow;
  }
  return simpleNames;
}
function getIconData(name) {
  const icon = typeof name === "string" ? stringToIcon(name, true, simpleNames) : name;
  return icon ? getIconFromStorage(getStorage(icon.provider, icon.prefix), icon.name) : null;
}
function addIcon(name, data) {
  const icon = stringToIcon(name, true, simpleNames);
  if (!icon) {
    return false;
  }
  const storage2 = getStorage(icon.provider, icon.prefix);
  return addIconToStorage(storage2, icon.name, data);
}
function addCollection(data, provider) {
  if (typeof data !== "object") {
    return false;
  }
  if (typeof provider !== "string") {
    provider = typeof data.provider === "string" ? data.provider : "";
  }
  if (simpleNames && provider === "" && (typeof data.prefix !== "string" || data.prefix === "")) {
    let added = false;
    parseIconSet(data, (name, icon) => {
      if (icon && addIcon(name, icon)) {
        added = true;
      }
    }, {
      validate: {
        fix: true,
        prefix: ""
      }
    });
    return added;
  }
  if (typeof data.prefix !== "string" || !validateIcon({
    provider,
    prefix: data.prefix,
    name: "a"
  })) {
    return false;
  }
  const storage2 = getStorage(provider, data.prefix);
  return !!addIconSet(storage2, data);
}
var defaults = Object.freeze({
  inline: false,
  width: null,
  height: null,
  hAlign: "center",
  vAlign: "middle",
  slice: false,
  hFlip: false,
  vFlip: false,
  rotate: 0
});
function mergeCustomisations(defaults2, item) {
  const result = {};
  for (const key in defaults2) {
    const attr = key;
    result[attr] = defaults2[attr];
    if (item[attr] === void 0) {
      continue;
    }
    const value = item[attr];
    switch (attr) {
      case "inline":
      case "slice":
        if (typeof value === "boolean") {
          result[attr] = value;
        }
        break;
      case "hFlip":
      case "vFlip":
        if (value === true) {
          result[attr] = !result[attr];
        }
        break;
      case "hAlign":
      case "vAlign":
        if (typeof value === "string" && value !== "") {
          result[attr] = value;
        }
        break;
      case "width":
      case "height":
        if (typeof value === "string" && value !== "" || typeof value === "number" && value || value === null) {
          result[attr] = value;
        }
        break;
      case "rotate":
        if (typeof value === "number") {
          result[attr] += value;
        }
        break;
    }
  }
  return result;
}
var unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
var unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function calculateSize(size, ratio, precision) {
  if (ratio === 1) {
    return size;
  }
  precision = precision === void 0 ? 100 : precision;
  if (typeof size === "number") {
    return Math.ceil(size * ratio * precision) / precision;
  }
  if (typeof size !== "string") {
    return size;
  }
  const oldParts = size.split(unitsSplit);
  if (oldParts === null || !oldParts.length) {
    return size;
  }
  const newParts = [];
  let code = oldParts.shift();
  let isNumber = unitsTest.test(code);
  while (true) {
    if (isNumber) {
      const num = parseFloat(code);
      if (isNaN(num)) {
        newParts.push(code);
      } else {
        newParts.push(Math.ceil(num * ratio * precision) / precision);
      }
    } else {
      newParts.push(code);
    }
    code = oldParts.shift();
    if (code === void 0) {
      return newParts.join("");
    }
    isNumber = !isNumber;
  }
}
function preserveAspectRatio(props) {
  let result = "";
  switch (props.hAlign) {
    case "left":
      result += "xMin";
      break;
    case "right":
      result += "xMax";
      break;
    default:
      result += "xMid";
  }
  switch (props.vAlign) {
    case "top":
      result += "YMin";
      break;
    case "bottom":
      result += "YMax";
      break;
    default:
      result += "YMid";
  }
  result += props.slice ? " slice" : " meet";
  return result;
}
function iconToSVG(icon, customisations) {
  const box = {
    left: icon.left,
    top: icon.top,
    width: icon.width,
    height: icon.height
  };
  let body = icon.body;
  [icon, customisations].forEach((props) => {
    const transformations = [];
    const hFlip = props.hFlip;
    const vFlip = props.vFlip;
    let rotation = props.rotate;
    if (hFlip) {
      if (vFlip) {
        rotation += 2;
      } else {
        transformations.push("translate(" + (box.width + box.left) + " " + (0 - box.top) + ")");
        transformations.push("scale(-1 1)");
        box.top = box.left = 0;
      }
    } else if (vFlip) {
      transformations.push("translate(" + (0 - box.left) + " " + (box.height + box.top) + ")");
      transformations.push("scale(1 -1)");
      box.top = box.left = 0;
    }
    let tempValue;
    if (rotation < 0) {
      rotation -= Math.floor(rotation / 4) * 4;
    }
    rotation = rotation % 4;
    switch (rotation) {
      case 1:
        tempValue = box.height / 2 + box.top;
        transformations.unshift("rotate(90 " + tempValue + " " + tempValue + ")");
        break;
      case 2:
        transformations.unshift("rotate(180 " + (box.width / 2 + box.left) + " " + (box.height / 2 + box.top) + ")");
        break;
      case 3:
        tempValue = box.width / 2 + box.left;
        transformations.unshift("rotate(-90 " + tempValue + " " + tempValue + ")");
        break;
    }
    if (rotation % 2 === 1) {
      if (box.left !== 0 || box.top !== 0) {
        tempValue = box.left;
        box.left = box.top;
        box.top = tempValue;
      }
      if (box.width !== box.height) {
        tempValue = box.width;
        box.width = box.height;
        box.height = tempValue;
      }
    }
    if (transformations.length) {
      body = '<g transform="' + transformations.join(" ") + '">' + body + "</g>";
    }
  });
  let width, height;
  if (customisations.width === null && customisations.height === null) {
    height = "1em";
    width = calculateSize(height, box.width / box.height);
  } else if (customisations.width !== null && customisations.height !== null) {
    width = customisations.width;
    height = customisations.height;
  } else if (customisations.height !== null) {
    height = customisations.height;
    width = calculateSize(height, box.width / box.height);
  } else {
    width = customisations.width;
    height = calculateSize(width, box.height / box.width);
  }
  if (width === "auto") {
    width = box.width;
  }
  if (height === "auto") {
    height = box.height;
  }
  width = typeof width === "string" ? width : width + "";
  height = typeof height === "string" ? height : height + "";
  const result = {
    attributes: {
      width,
      height,
      preserveAspectRatio: preserveAspectRatio(customisations),
      viewBox: box.left + " " + box.top + " " + box.width + " " + box.height
    },
    body
  };
  if (customisations.inline) {
    result.inline = true;
  }
  return result;
}
var regex = /\sid="(\S+)"/g;
var randomPrefix = "IconifyId-" + Date.now().toString(16) + "-" + (Math.random() * 16777216 | 0).toString(16) + "-";
var counter$1 = 0;
function replaceIDs(body, prefix = randomPrefix) {
  const ids = [];
  let match;
  while (match = regex.exec(body)) {
    ids.push(match[1]);
  }
  if (!ids.length) {
    return body;
  }
  ids.forEach((id) => {
    const newID = typeof prefix === "function" ? prefix(id) : prefix + counter$1++;
    const escapedID = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    body = body.replace(new RegExp('([#;"])(' + escapedID + ')([")]|\\.[a-z])', "g"), "$1" + newID + "$3");
  });
  return body;
}
var storage = Object.create(null);
function setAPIModule(provider, item) {
  storage[provider] = item;
}
function getAPIModule(provider) {
  return storage[provider] || storage[""];
}
function createAPIConfig(source) {
  let resources;
  if (typeof source.resources === "string") {
    resources = [source.resources];
  } else {
    resources = source.resources;
    if (!(resources instanceof Array) || !resources.length) {
      return null;
    }
  }
  const result = {
    resources,
    path: source.path === void 0 ? "/" : source.path,
    maxURL: source.maxURL ? source.maxURL : 500,
    rotate: source.rotate ? source.rotate : 750,
    timeout: source.timeout ? source.timeout : 5e3,
    random: source.random === true,
    index: source.index ? source.index : 0,
    dataAfterTimeout: source.dataAfterTimeout !== false
  };
  return result;
}
var configStorage = Object.create(null);
var fallBackAPISources = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
];
var fallBackAPI = [];
while (fallBackAPISources.length > 0) {
  if (fallBackAPISources.length === 1) {
    fallBackAPI.push(fallBackAPISources.shift());
  } else {
    if (Math.random() > 0.5) {
      fallBackAPI.push(fallBackAPISources.shift());
    } else {
      fallBackAPI.push(fallBackAPISources.pop());
    }
  }
}
configStorage[""] = createAPIConfig({
  resources: ["https://api.iconify.design"].concat(fallBackAPI)
});
function addAPIProvider(provider, customConfig) {
  const config2 = createAPIConfig(customConfig);
  if (config2 === null) {
    return false;
  }
  configStorage[provider] = config2;
  return true;
}
function getAPIConfig(provider) {
  return configStorage[provider];
}
var mergeParams = (base2, params) => {
  let result = base2, hasParams = result.indexOf("?") !== -1;
  function paramToString(value) {
    switch (typeof value) {
      case "boolean":
        return value ? "true" : "false";
      case "number":
        return encodeURIComponent(value);
      case "string":
        return encodeURIComponent(value);
      default:
        throw new Error("Invalid parameter");
    }
  }
  Object.keys(params).forEach((key) => {
    let value;
    try {
      value = paramToString(params[key]);
    } catch (err) {
      return;
    }
    result += (hasParams ? "&" : "?") + encodeURIComponent(key) + "=" + value;
    hasParams = true;
  });
  return result;
};
var maxLengthCache = Object.create(null);
var pathCache = Object.create(null);
var detectFetch = () => {
  let callback;
  try {
    callback = fetch;
    if (typeof callback === "function") {
      return callback;
    }
  } catch (err) {
  }
  try {
    const chunk = String.fromCharCode(114) + String.fromCharCode(101);
    const req = global[chunk + "qui" + chunk];
    callback = req("cross-fetch");
    if (typeof callback === "function") {
      return callback;
    }
  } catch (err) {
  }
  return null;
};
var fetchModule = detectFetch();
function calculateMaxLength(provider, prefix) {
  const config2 = getAPIConfig(provider);
  if (!config2) {
    return 0;
  }
  let result;
  if (!config2.maxURL) {
    result = 0;
  } else {
    let maxHostLength = 0;
    config2.resources.forEach((item) => {
      const host = item;
      maxHostLength = Math.max(maxHostLength, host.length);
    });
    const url = mergeParams(prefix + ".json", {
      icons: ""
    });
    result = config2.maxURL - maxHostLength - config2.path.length - url.length;
  }
  const cacheKey = provider + ":" + prefix;
  pathCache[provider] = config2.path;
  maxLengthCache[cacheKey] = result;
  return result;
}
var prepare = (provider, prefix, icons) => {
  const results = [];
  let maxLength = maxLengthCache[prefix];
  if (maxLength === void 0) {
    maxLength = calculateMaxLength(provider, prefix);
  }
  const type = "icons";
  let item = {
    type,
    provider,
    prefix,
    icons: []
  };
  let length = 0;
  icons.forEach((name, index2) => {
    length += name.length + 1;
    if (length >= maxLength && index2 > 0) {
      results.push(item);
      item = {
        type,
        provider,
        prefix,
        icons: []
      };
      length = name.length;
    }
    item.icons.push(name);
  });
  results.push(item);
  return results;
};
function getPath(provider) {
  if (typeof provider === "string") {
    if (pathCache[provider] === void 0) {
      const config2 = getAPIConfig(provider);
      if (!config2) {
        return "/";
      }
      pathCache[provider] = config2.path;
    }
    return pathCache[provider];
  }
  return "/";
}
var send = (host, params, status) => {
  if (!fetchModule) {
    status.done(void 0, 424);
    return;
  }
  let path = getPath(params.provider);
  switch (params.type) {
    case "icons": {
      const prefix = params.prefix;
      const icons = params.icons;
      const iconsList = icons.join(",");
      path += mergeParams(prefix + ".json", {
        icons: iconsList
      });
      break;
    }
    case "custom": {
      const uri = params.uri;
      path += uri.slice(0, 1) === "/" ? uri.slice(1) : uri;
      break;
    }
    default:
      status.done(void 0, 400);
      return;
  }
  let defaultError = 503;
  fetchModule(host + path).then((response) => {
    if (response.status !== 200) {
      setTimeout(() => {
        status.done(void 0, response.status);
      });
      return;
    }
    defaultError = 501;
    return response.json();
  }).then((data) => {
    if (typeof data !== "object" || data === null) {
      setTimeout(() => {
        status.done(void 0, defaultError);
      });
      return;
    }
    setTimeout(() => {
      status.done(data);
    });
  }).catch(() => {
    status.done(void 0, defaultError);
  });
};
var fetchAPIModule = {
  prepare,
  send
};
function sortIcons(icons) {
  const result = {
    loaded: [],
    missing: [],
    pending: []
  };
  const storage2 = Object.create(null);
  icons.sort((a2, b2) => {
    if (a2.provider !== b2.provider) {
      return a2.provider.localeCompare(b2.provider);
    }
    if (a2.prefix !== b2.prefix) {
      return a2.prefix.localeCompare(b2.prefix);
    }
    return a2.name.localeCompare(b2.name);
  });
  let lastIcon = {
    provider: "",
    prefix: "",
    name: ""
  };
  icons.forEach((icon) => {
    if (lastIcon.name === icon.name && lastIcon.prefix === icon.prefix && lastIcon.provider === icon.provider) {
      return;
    }
    lastIcon = icon;
    const provider = icon.provider;
    const prefix = icon.prefix;
    const name = icon.name;
    if (storage2[provider] === void 0) {
      storage2[provider] = Object.create(null);
    }
    const providerStorage = storage2[provider];
    if (providerStorage[prefix] === void 0) {
      providerStorage[prefix] = getStorage(provider, prefix);
    }
    const localStorage = providerStorage[prefix];
    let list;
    if (localStorage.icons[name] !== void 0) {
      list = result.loaded;
    } else if (prefix === "" || localStorage.missing[name] !== void 0) {
      list = result.missing;
    } else {
      list = result.pending;
    }
    const item = {
      provider,
      prefix,
      name
    };
    list.push(item);
  });
  return result;
}
var callbacks = Object.create(null);
var pendingUpdates = Object.create(null);
function removeCallback(sources, id) {
  sources.forEach((source) => {
    const provider = source.provider;
    if (callbacks[provider] === void 0) {
      return;
    }
    const providerCallbacks = callbacks[provider];
    const prefix = source.prefix;
    const items = providerCallbacks[prefix];
    if (items) {
      providerCallbacks[prefix] = items.filter((row) => row.id !== id);
    }
  });
}
function updateCallbacks(provider, prefix) {
  if (pendingUpdates[provider] === void 0) {
    pendingUpdates[provider] = Object.create(null);
  }
  const providerPendingUpdates = pendingUpdates[provider];
  if (!providerPendingUpdates[prefix]) {
    providerPendingUpdates[prefix] = true;
    setTimeout(() => {
      providerPendingUpdates[prefix] = false;
      if (callbacks[provider] === void 0 || callbacks[provider][prefix] === void 0) {
        return;
      }
      const items = callbacks[provider][prefix].slice(0);
      if (!items.length) {
        return;
      }
      const storage2 = getStorage(provider, prefix);
      let hasPending = false;
      items.forEach((item) => {
        const icons = item.icons;
        const oldLength = icons.pending.length;
        icons.pending = icons.pending.filter((icon) => {
          if (icon.prefix !== prefix) {
            return true;
          }
          const name = icon.name;
          if (storage2.icons[name] !== void 0) {
            icons.loaded.push({
              provider,
              prefix,
              name
            });
          } else if (storage2.missing[name] !== void 0) {
            icons.missing.push({
              provider,
              prefix,
              name
            });
          } else {
            hasPending = true;
            return true;
          }
          return false;
        });
        if (icons.pending.length !== oldLength) {
          if (!hasPending) {
            removeCallback([
              {
                provider,
                prefix
              }
            ], item.id);
          }
          item.callback(icons.loaded.slice(0), icons.missing.slice(0), icons.pending.slice(0), item.abort);
        }
      });
    });
  }
}
var idCounter = 0;
function storeCallback(callback, icons, pendingSources) {
  const id = idCounter++;
  const abort = removeCallback.bind(null, pendingSources, id);
  if (!icons.pending.length) {
    return abort;
  }
  const item = {
    id,
    icons,
    callback,
    abort
  };
  pendingSources.forEach((source) => {
    const provider = source.provider;
    const prefix = source.prefix;
    if (callbacks[provider] === void 0) {
      callbacks[provider] = Object.create(null);
    }
    const providerCallbacks = callbacks[provider];
    if (providerCallbacks[prefix] === void 0) {
      providerCallbacks[prefix] = [];
    }
    providerCallbacks[prefix].push(item);
  });
  return abort;
}
function listToIcons(list, validate = true, simpleNames2 = false) {
  const result = [];
  list.forEach((item) => {
    const icon = typeof item === "string" ? stringToIcon(item, false, simpleNames2) : item;
    if (!validate || validateIcon(icon, simpleNames2)) {
      result.push({
        provider: icon.provider,
        prefix: icon.prefix,
        name: icon.name
      });
    }
  });
  return result;
}
var defaultConfig = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: false,
  dataAfterTimeout: false
};
function sendQuery(config2, payload, query, done, success) {
  const resourcesCount = config2.resources.length;
  const startIndex = config2.random ? Math.floor(Math.random() * resourcesCount) : config2.index;
  let resources;
  if (config2.random) {
    let list = config2.resources.slice(0);
    resources = [];
    while (list.length > 1) {
      const nextIndex = Math.floor(Math.random() * list.length);
      resources.push(list[nextIndex]);
      list = list.slice(0, nextIndex).concat(list.slice(nextIndex + 1));
    }
    resources = resources.concat(list);
  } else {
    resources = config2.resources.slice(startIndex).concat(config2.resources.slice(0, startIndex));
  }
  const startTime = Date.now();
  let status = "pending";
  let queriesSent = 0;
  let lastError = void 0;
  let timer = null;
  let queue = [];
  let doneCallbacks = [];
  if (typeof done === "function") {
    doneCallbacks.push(done);
  }
  function resetTimer() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function abort() {
    if (status === "pending") {
      status = "aborted";
    }
    resetTimer();
    queue.forEach((item) => {
      if (item.abort) {
        item.abort();
      }
      if (item.status === "pending") {
        item.status = "aborted";
      }
    });
    queue = [];
  }
  function subscribe2(callback, overwrite) {
    if (overwrite) {
      doneCallbacks = [];
    }
    if (typeof callback === "function") {
      doneCallbacks.push(callback);
    }
  }
  function getQueryStatus() {
    return {
      startTime,
      payload,
      status,
      queriesSent,
      queriesPending: queue.length,
      subscribe: subscribe2,
      abort
    };
  }
  function failQuery() {
    status = "failed";
    doneCallbacks.forEach((callback) => {
      callback(void 0, lastError);
    });
  }
  function clearQueue() {
    queue = queue.filter((item) => {
      if (item.status === "pending") {
        item.status = "aborted";
      }
      if (item.abort) {
        item.abort();
      }
      return false;
    });
  }
  function moduleResponse(item, data, error2) {
    const isError = data === void 0;
    queue = queue.filter((queued) => queued !== item);
    switch (status) {
      case "pending":
        break;
      case "failed":
        if (isError || !config2.dataAfterTimeout) {
          return;
        }
        break;
      default:
        return;
    }
    if (isError) {
      if (error2 !== void 0) {
        lastError = error2;
      }
      if (!queue.length) {
        if (!resources.length) {
          failQuery();
        } else {
          execNext();
        }
      }
      return;
    }
    resetTimer();
    clearQueue();
    if (success && !config2.random) {
      const index2 = config2.resources.indexOf(item.resource);
      if (index2 !== -1 && index2 !== config2.index) {
        success(index2);
      }
    }
    status = "completed";
    doneCallbacks.forEach((callback) => {
      callback(data);
    });
  }
  function execNext() {
    if (status !== "pending") {
      return;
    }
    resetTimer();
    const resource = resources.shift();
    if (resource === void 0) {
      if (queue.length) {
        const timeout2 = typeof config2.timeout === "function" ? config2.timeout(startTime) : config2.timeout;
        if (timeout2) {
          timer = setTimeout(() => {
            resetTimer();
            if (status === "pending") {
              clearQueue();
              failQuery();
            }
          }, timeout2);
          return;
        }
      }
      failQuery();
      return;
    }
    const item = {
      getQueryStatus,
      status: "pending",
      resource,
      done: (data, error2) => {
        moduleResponse(item, data, error2);
      }
    };
    queue.push(item);
    queriesSent++;
    const timeout = typeof config2.rotate === "function" ? config2.rotate(queriesSent, startTime) : config2.rotate;
    timer = setTimeout(execNext, timeout);
    query(resource, payload, item);
  }
  setTimeout(execNext);
  return getQueryStatus;
}
function setConfig(config2) {
  if (typeof config2 !== "object" || typeof config2.resources !== "object" || !(config2.resources instanceof Array) || !config2.resources.length) {
    throw new Error("Invalid Reduncancy configuration");
  }
  const newConfig = Object.create(null);
  let key;
  for (key in defaultConfig) {
    if (config2[key] !== void 0) {
      newConfig[key] = config2[key];
    } else {
      newConfig[key] = defaultConfig[key];
    }
  }
  return newConfig;
}
function initRedundancy(cfg) {
  const config2 = setConfig(cfg);
  let queries = [];
  function cleanup() {
    queries = queries.filter((item) => item().status === "pending");
  }
  function query(payload, queryCallback, doneCallback) {
    const query2 = sendQuery(config2, payload, queryCallback, (data, error2) => {
      cleanup();
      if (doneCallback) {
        doneCallback(data, error2);
      }
    }, (newIndex) => {
      config2.index = newIndex;
    });
    queries.push(query2);
    return query2;
  }
  function find(callback) {
    const result = queries.find((value) => {
      return callback(value);
    });
    return result !== void 0 ? result : null;
  }
  const instance = {
    query,
    find,
    setIndex: (index2) => {
      config2.index = index2;
    },
    getIndex: () => config2.index,
    cleanup
  };
  return instance;
}
function emptyCallback$1() {
}
var redundancyCache = Object.create(null);
function getRedundancyCache(provider) {
  if (redundancyCache[provider] === void 0) {
    const config2 = getAPIConfig(provider);
    if (!config2) {
      return;
    }
    const redundancy = initRedundancy(config2);
    const cachedReundancy = {
      config: config2,
      redundancy
    };
    redundancyCache[provider] = cachedReundancy;
  }
  return redundancyCache[provider];
}
function sendAPIQuery(target, query, callback) {
  let redundancy;
  let send2;
  if (typeof target === "string") {
    const api = getAPIModule(target);
    if (!api) {
      callback(void 0, 424);
      return emptyCallback$1;
    }
    send2 = api.send;
    const cached = getRedundancyCache(target);
    if (cached) {
      redundancy = cached.redundancy;
    }
  } else {
    const config2 = createAPIConfig(target);
    if (config2) {
      redundancy = initRedundancy(config2);
      const moduleKey = target.resources ? target.resources[0] : "";
      const api = getAPIModule(moduleKey);
      if (api) {
        send2 = api.send;
      }
    }
  }
  if (!redundancy || !send2) {
    callback(void 0, 424);
    return emptyCallback$1;
  }
  return redundancy.query(query, send2, callback)().abort;
}
var cache = {};
function emptyCallback() {
}
var pendingIcons = Object.create(null);
var iconsToLoad = Object.create(null);
var loaderFlags = Object.create(null);
var queueFlags = Object.create(null);
function loadedNewIcons(provider, prefix) {
  if (loaderFlags[provider] === void 0) {
    loaderFlags[provider] = Object.create(null);
  }
  const providerLoaderFlags = loaderFlags[provider];
  if (!providerLoaderFlags[prefix]) {
    providerLoaderFlags[prefix] = true;
    setTimeout(() => {
      providerLoaderFlags[prefix] = false;
      updateCallbacks(provider, prefix);
    });
  }
}
var errorsCache = Object.create(null);
function loadNewIcons(provider, prefix, icons) {
  function err() {
    const key = (provider === "" ? "" : "@" + provider + ":") + prefix;
    const time = Math.floor(Date.now() / 6e4);
    if (errorsCache[key] < time) {
      errorsCache[key] = time;
      console.error('Unable to retrieve icons for "' + key + '" because API is not configured properly.');
    }
  }
  if (iconsToLoad[provider] === void 0) {
    iconsToLoad[provider] = Object.create(null);
  }
  const providerIconsToLoad = iconsToLoad[provider];
  if (queueFlags[provider] === void 0) {
    queueFlags[provider] = Object.create(null);
  }
  const providerQueueFlags = queueFlags[provider];
  if (pendingIcons[provider] === void 0) {
    pendingIcons[provider] = Object.create(null);
  }
  const providerPendingIcons = pendingIcons[provider];
  if (providerIconsToLoad[prefix] === void 0) {
    providerIconsToLoad[prefix] = icons;
  } else {
    providerIconsToLoad[prefix] = providerIconsToLoad[prefix].concat(icons).sort();
  }
  if (!providerQueueFlags[prefix]) {
    providerQueueFlags[prefix] = true;
    setTimeout(() => {
      providerQueueFlags[prefix] = false;
      const icons2 = providerIconsToLoad[prefix];
      delete providerIconsToLoad[prefix];
      const api = getAPIModule(provider);
      if (!api) {
        err();
        return;
      }
      const params = api.prepare(provider, prefix, icons2);
      params.forEach((item) => {
        sendAPIQuery(provider, item, (data, error2) => {
          const storage2 = getStorage(provider, prefix);
          if (typeof data !== "object") {
            if (error2 !== 404) {
              return;
            }
            const t = Date.now();
            item.icons.forEach((name) => {
              storage2.missing[name] = t;
            });
          } else {
            try {
              const parsed = addIconSet(storage2, data);
              if (!parsed.length) {
                return;
              }
              const pending = providerPendingIcons[prefix];
              parsed.forEach((name) => {
                delete pending[name];
              });
              if (cache.store) {
                cache.store(provider, data);
              }
            } catch (err2) {
              console.error(err2);
            }
          }
          loadedNewIcons(provider, prefix);
        });
      });
    });
  }
}
var loadIcons = (icons, callback) => {
  const cleanedIcons = listToIcons(icons, true, allowSimpleNames());
  const sortedIcons = sortIcons(cleanedIcons);
  if (!sortedIcons.pending.length) {
    let callCallback = true;
    if (callback) {
      setTimeout(() => {
        if (callCallback) {
          callback(sortedIcons.loaded, sortedIcons.missing, sortedIcons.pending, emptyCallback);
        }
      });
    }
    return () => {
      callCallback = false;
    };
  }
  const newIcons = Object.create(null);
  const sources = [];
  let lastProvider, lastPrefix;
  sortedIcons.pending.forEach((icon) => {
    const provider = icon.provider;
    const prefix = icon.prefix;
    if (prefix === lastPrefix && provider === lastProvider) {
      return;
    }
    lastProvider = provider;
    lastPrefix = prefix;
    sources.push({
      provider,
      prefix
    });
    if (pendingIcons[provider] === void 0) {
      pendingIcons[provider] = Object.create(null);
    }
    const providerPendingIcons = pendingIcons[provider];
    if (providerPendingIcons[prefix] === void 0) {
      providerPendingIcons[prefix] = Object.create(null);
    }
    if (newIcons[provider] === void 0) {
      newIcons[provider] = Object.create(null);
    }
    const providerNewIcons = newIcons[provider];
    if (providerNewIcons[prefix] === void 0) {
      providerNewIcons[prefix] = [];
    }
  });
  const time = Date.now();
  sortedIcons.pending.forEach((icon) => {
    const provider = icon.provider;
    const prefix = icon.prefix;
    const name = icon.name;
    const pendingQueue = pendingIcons[provider][prefix];
    if (pendingQueue[name] === void 0) {
      pendingQueue[name] = time;
      newIcons[provider][prefix].push(name);
    }
  });
  sources.forEach((source) => {
    const provider = source.provider;
    const prefix = source.prefix;
    if (newIcons[provider][prefix].length) {
      loadNewIcons(provider, prefix, newIcons[provider][prefix]);
    }
  });
  return callback ? storeCallback(callback, sortedIcons, sources) : emptyCallback;
};
var cacheVersion = "iconify2";
var cachePrefix = "iconify";
var countKey = cachePrefix + "-count";
var versionKey = cachePrefix + "-version";
var hour = 36e5;
var cacheExpiration = 168;
var config = {
  local: true,
  session: true
};
var loaded = false;
var count = {
  local: 0,
  session: 0
};
var emptyList = {
  local: [],
  session: []
};
var _window = typeof window === "undefined" ? {} : window;
function getGlobal(key) {
  const attr = key + "Storage";
  try {
    if (_window && _window[attr] && typeof _window[attr].length === "number") {
      return _window[attr];
    }
  } catch (err) {
  }
  config[key] = false;
  return null;
}
function setCount(storage2, key, value) {
  try {
    storage2.setItem(countKey, value + "");
    count[key] = value;
    return true;
  } catch (err) {
    return false;
  }
}
function getCount(storage2) {
  const count2 = storage2.getItem(countKey);
  if (count2) {
    const total = parseInt(count2);
    return total ? total : 0;
  }
  return 0;
}
function initCache(storage2, key) {
  try {
    storage2.setItem(versionKey, cacheVersion);
  } catch (err) {
  }
  setCount(storage2, key, 0);
}
function destroyCache(storage2) {
  try {
    const total = getCount(storage2);
    for (let i = 0; i < total; i++) {
      storage2.removeItem(cachePrefix + i);
    }
  } catch (err) {
  }
}
var loadCache = () => {
  if (loaded) {
    return;
  }
  loaded = true;
  const minTime = Math.floor(Date.now() / hour) - cacheExpiration;
  function load2(key) {
    const func = getGlobal(key);
    if (!func) {
      return;
    }
    const getItem = (index2) => {
      const name = cachePrefix + index2;
      const item = func.getItem(name);
      if (typeof item !== "string") {
        return false;
      }
      let valid = true;
      try {
        const data = JSON.parse(item);
        if (typeof data !== "object" || typeof data.cached !== "number" || data.cached < minTime || typeof data.provider !== "string" || typeof data.data !== "object" || typeof data.data.prefix !== "string") {
          valid = false;
        } else {
          const provider = data.provider;
          const prefix = data.data.prefix;
          const storage2 = getStorage(provider, prefix);
          valid = addIconSet(storage2, data.data).length > 0;
        }
      } catch (err) {
        valid = false;
      }
      if (!valid) {
        func.removeItem(name);
      }
      return valid;
    };
    try {
      const version = func.getItem(versionKey);
      if (version !== cacheVersion) {
        if (version) {
          destroyCache(func);
        }
        initCache(func, key);
        return;
      }
      let total = getCount(func);
      for (let i = total - 1; i >= 0; i--) {
        if (!getItem(i)) {
          if (i === total - 1) {
            total--;
          } else {
            emptyList[key].push(i);
          }
        }
      }
      setCount(func, key, total);
    } catch (err) {
    }
  }
  for (const key in config) {
    load2(key);
  }
};
var storeCache = (provider, data) => {
  if (!loaded) {
    loadCache();
  }
  function store(key) {
    if (!config[key]) {
      return false;
    }
    const func = getGlobal(key);
    if (!func) {
      return false;
    }
    let index2 = emptyList[key].shift();
    if (index2 === void 0) {
      index2 = count[key];
      if (!setCount(func, key, index2 + 1)) {
        return false;
      }
    }
    try {
      const item = {
        cached: Math.floor(Date.now() / hour),
        provider,
        data
      };
      func.setItem(cachePrefix + index2, JSON.stringify(item));
    } catch (err) {
      return false;
    }
    return true;
  }
  if (!store("local")) {
    store("session");
  }
};
var separator = /[\s,]+/;
function flipFromString(custom, flip) {
  flip.split(separator).forEach((str) => {
    const value = str.trim();
    switch (value) {
      case "horizontal":
        custom.hFlip = true;
        break;
      case "vertical":
        custom.vFlip = true;
        break;
    }
  });
}
function alignmentFromString(custom, align) {
  align.split(separator).forEach((str) => {
    const value = str.trim();
    switch (value) {
      case "left":
      case "center":
      case "right":
        custom.hAlign = value;
        break;
      case "top":
      case "middle":
      case "bottom":
        custom.vAlign = value;
        break;
      case "slice":
      case "crop":
        custom.slice = true;
        break;
      case "meet":
        custom.slice = false;
    }
  });
}
function rotateFromString(value, defaultValue = 0) {
  const units = value.replace(/^-?[0-9.]*/, "");
  function cleanup(value2) {
    while (value2 < 0) {
      value2 += 4;
    }
    return value2 % 4;
  }
  if (units === "") {
    const num = parseInt(value);
    return isNaN(num) ? 0 : cleanup(num);
  } else if (units !== value) {
    let split = 0;
    switch (units) {
      case "%":
        split = 25;
        break;
      case "deg":
        split = 90;
    }
    if (split) {
      let num = parseFloat(value.slice(0, value.length - units.length));
      if (isNaN(num)) {
        return 0;
      }
      num = num / split;
      return num % 1 === 0 ? cleanup(num) : 0;
    }
  }
  return defaultValue;
}
var svgDefaults = {
  "xmlns": "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": true,
  "role": "img"
};
function render(icon, props) {
  const customisations = mergeCustomisations(defaults, props);
  const componentProps = { ...svgDefaults };
  let style = typeof props.style === "string" ? props.style : "";
  for (let key in props) {
    const value = props[key];
    if (value === void 0) {
      continue;
    }
    switch (key) {
      case "icon":
      case "style":
      case "onLoad":
        break;
      case "inline":
      case "hFlip":
      case "vFlip":
        customisations[key] = value === true || value === "true" || value === 1;
        break;
      case "flip":
        if (typeof value === "string") {
          flipFromString(customisations, value);
        }
        break;
      case "align":
        if (typeof value === "string") {
          alignmentFromString(customisations, value);
        }
        break;
      case "color":
        style = style + (style.length > 0 && style.trim().slice(-1) !== ";" ? ";" : "") + "color: " + value + "; ";
        break;
      case "rotate":
        if (typeof value === "string") {
          customisations[key] = rotateFromString(value);
        } else if (typeof value === "number") {
          customisations[key] = value;
        }
        break;
      case "ariaHidden":
      case "aria-hidden":
        if (value !== true && value !== "true") {
          delete componentProps["aria-hidden"];
        }
        break;
      default:
        if (key.slice(0, 3) === "on:") {
          break;
        }
        if (defaults[key] === void 0) {
          componentProps[key] = value;
        }
    }
  }
  const item = iconToSVG(icon, customisations);
  for (let key in item.attributes) {
    componentProps[key] = item.attributes[key];
  }
  if (item.inline) {
    style = "vertical-align: -0.125em; " + style;
  }
  if (style !== "") {
    componentProps.style = style;
  }
  let localCounter = 0;
  const id = props.id;
  return {
    attributes: componentProps,
    body: replaceIDs(item.body, id ? () => id + "-" + localCounter++ : "iconify-svelte-")
  };
}
allowSimpleNames(true);
setAPIModule("", fetchAPIModule);
if (typeof document !== "undefined" && typeof window !== "undefined") {
  cache.store = storeCache;
  loadCache();
  const _window2 = window;
  if (_window2.IconifyPreload !== void 0) {
    const preload = _window2.IconifyPreload;
    const err = "Invalid IconifyPreload syntax.";
    if (typeof preload === "object" && preload !== null) {
      (preload instanceof Array ? preload : [preload]).forEach((item) => {
        try {
          if (typeof item !== "object" || item === null || item instanceof Array || typeof item.icons !== "object" || typeof item.prefix !== "string" || !addCollection(item)) {
            console.error(err);
          }
        } catch (e) {
          console.error(err);
        }
      });
    }
  }
  if (_window2.IconifyProviders !== void 0) {
    const providers = _window2.IconifyProviders;
    if (typeof providers === "object" && providers !== null) {
      for (let key in providers) {
        const err = "IconifyProviders[" + key + "] is invalid.";
        try {
          const value = providers[key];
          if (typeof value !== "object" || !value || value.resources === void 0) {
            continue;
          }
          if (!addAPIProvider(key, value)) {
            console.error(err);
          }
        } catch (e) {
          console.error(err);
        }
      }
    }
  }
}
function checkIconState(icon, state, mounted, callback, onload) {
  function abortLoading() {
    if (state.loading) {
      state.loading.abort();
      state.loading = null;
    }
  }
  if (typeof icon === "object" && icon !== null && typeof icon.body === "string") {
    state.name = "";
    abortLoading();
    return { data: fullIcon(icon) };
  }
  let iconName;
  if (typeof icon !== "string" || (iconName = stringToIcon(icon, false, true)) === null) {
    abortLoading();
    return null;
  }
  const data = getIconData(iconName);
  if (data === null) {
    if (mounted && (!state.loading || state.loading.name !== icon)) {
      abortLoading();
      state.name = "";
      state.loading = {
        name: icon,
        abort: loadIcons([iconName], callback)
      };
    }
    return null;
  }
  abortLoading();
  if (state.name !== icon) {
    state.name = icon;
    if (onload && !state.destroyed) {
      onload(icon);
    }
  }
  const classes = ["iconify"];
  if (iconName.prefix !== "") {
    classes.push("iconify--" + iconName.prefix);
  }
  if (iconName.provider !== "") {
    classes.push("iconify--" + iconName.provider);
  }
  return { data, classes };
}
function generateIcon(icon, props) {
  return icon ? render(icon, props) : null;
}
var Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const state = {
    name: "",
    loading: null,
    destroyed: false
  };
  let mounted = false;
  let data;
  const onLoad = (icon) => {
    if (typeof $$props.onLoad === "function") {
      $$props.onLoad(icon);
    }
    const dispatch = createEventDispatcher();
    dispatch("load", { icon });
  };
  function loaded2() {
  }
  onDestroy(() => {
    state.destroyed = true;
    if (state.loading) {
      state.loading.abort();
      state.loading = null;
    }
  });
  {
    {
      const iconData = checkIconState($$props.icon, state, mounted, loaded2, onLoad);
      data = iconData ? generateIcon(iconData.data, $$props) : null;
      if (data && iconData.classes) {
        data.attributes["class"] = (typeof $$props["class"] === "string" ? $$props["class"] + " " : "") + iconData.classes.join(" ");
      }
    }
  }
  return `${data !== null ? `<svg${spread([escape_object(data.attributes)])}><!-- HTML_TAG_START -->${data.body}<!-- HTML_TAG_END --></svg>` : ``}`;
});
var css$p = {
  code: ".svelte-gqdjtz{overflow:hidden}#wrapper.svelte-gqdjtz{z-index:100}",
  map: '{"version":3,"file":"footer.svelte","sources":["footer.svelte"],"sourcesContent":["<script>\\n  //LIBS\\n  import { onMount } from \\"svelte\\";\\n  import Icon from \\"@iconify/svelte\\";\\n\\n  //STORES\\n  import { cms_url } from \\"../../stores/renuestore\\";\\n\\n  let footerItems = {};\\n  let socialItems = [];\\n\\n  /////////////////////////////////////////////\\n\\n  const fetchRefs = async () => {\\n    const res = await fetch($cms_url);\\n    const data = await res.json();\\n    return data.refs;\\n  };\\n\\n  const fetchData = async (callback) => {\\n    const refs = await fetchRefs();\\n\\n    const masterRef = await refs.map((ref, index) => {\\n      return ref.ref;\\n    });\\n\\n    const url =\\n      $cms_url + \\"/documents/search?ref=\\" + masterRef + \\"#format=json\\";\\n    const res = await fetch(url);\\n    const data = await res.json();\\n\\n    let footerData = {};\\n\\n    await data.results.map((data, index) => {\\n      if (data.slugs[0] === \\"footer\\") {\\n        footerData = data.data;\\n      }\\n    });\\n\\n    callback(footerData);\\n  };\\n\\n  onMount(async () => {\\n    fetchData(async (footer) => {\\n      //console.log(\\"footer\\", footer);\\n      footerItems = await footer;\\n      socialItems = await footer.social;\\n    });\\n  });\\n<\/script>\\n\\n<div\\n  id=\\"wrapper\\"\\n  class=\\"w-full h-auto xl:px-148 lg:px-96 md:px-72 bg-on-background-variant-alpha\\"\\n>\\n  <nav class=\\"flex items-center py-32 xl:text-lg lg:text-lg md:text-md\\">\\n    <div class=\\"flex flex-grow space-x-32 text-sm\\">\\n      {#if footerItems.logo !== undefined}\\n        <a href=\\"/\\">\\n          <img src={footerItems.logo.url} alt=\\"Renue Logo\\" class=\\"w-120\\" />\\n        </a>\\n        <p>{footerItems.copyright[0].text}</p>\\n      {/if}\\n    </div>\\n    <div class=\\"flex items-center xl:space-x-48 sm:space-x-32 text-2xl\\">\\n      {#if socialItems.length > 0}\\n        {#each socialItems as item}\\n          <a href=\\"\\">\\n            <div class=\\"text-secondary-dark hover:text-secondary-main\\">\\n              <Icon icon={\\"akar-icons:\\" + item.id + \\"-fill\\"} />\\n            </div>\\n          </a>\\n        {/each}\\n      {/if}\\n    </div>\\n  </nav>\\n</div>\\n\\n<style>\\n  * {\\n    overflow: hidden;\\n  }\\n  #wrapper {\\n    /* position: relative; */\\n    z-index: 100;\\n  }\\n</style>\\n"],"names":[],"mappings":"AA+EE,cAAE,CAAC,AACD,QAAQ,CAAE,MAAM,AAClB,CAAC,AACD,QAAQ,cAAC,CAAC,AAER,OAAO,CAAE,GAAG,AACd,CAAC"}'
};
var Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_cms_url;
  $$unsubscribe_cms_url = subscribe(cms_url, (value) => value);
  let socialItems = [];
  $$result.css.add(css$p);
  $$unsubscribe_cms_url();
  return `<div id="${"wrapper"}" class="${"w-full h-auto xl:px-148 lg:px-96 md:px-72 bg-on-background-variant-alpha svelte-gqdjtz"}"><nav class="${"flex items-center py-32 xl:text-lg lg:text-lg md:text-md svelte-gqdjtz"}"><div class="${"flex flex-grow space-x-32 text-sm svelte-gqdjtz"}">${``}</div>
    <div class="${"flex items-center xl:space-x-48 sm:space-x-32 text-2xl svelte-gqdjtz"}">${socialItems.length > 0 ? `${each(socialItems, (item) => `<a href="${""}" class="${"svelte-gqdjtz"}"><div class="${"text-secondary-dark hover:text-secondary-main svelte-gqdjtz"}">${validate_component(Icon, "Icon").$$render($$result, { icon: "akar-icons:" + item.id + "-fill" }, {}, {})}</div>
          </a>`)}` : ``}</div></nav>
</div>`;
});
var css$o = {
  code: "#main-container.svelte-fx0rbu{max-width:1920px;margin-left:auto;margin-right:auto}",
  map: '{"version":3,"file":"main.svelte","sources":["main.svelte"],"sourcesContent":["<main id=\\"main-container\\" class=\\"w-full h-full gradient-bg-dark-secondary\\">\\n  <slot />\\n</main>\\n\\n<style>\\n  #main-container {\\n    max-width: 1920px;\\n    margin-left: auto;\\n    margin-right: auto;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAKE,eAAe,cAAC,CAAC,AACf,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,IAAI,CACjB,YAAY,CAAE,IAAI,AACpB,CAAC"}'
};
var Main = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$o);
  return `<main id="${"main-container"}" class="${"w-full h-full gradient-bg-dark-secondary svelte-fx0rbu"}">${slots.default ? slots.default({}) : ``}
</main>`;
});
var css$n = {
  code: "@tailwind base;@tailwind components;@tailwind utilities;",
  map: '{"version":3,"file":"__layout.svelte","sources":["__layout.svelte"],"sourcesContent":["<script>\\n  //COMPONENTS\\n  import Navbar from \\"../components/navigation/navbar.svelte\\";\\n  import Footer from \\"../components/navigation/footer.svelte\\";\\n\\n  //CONTAINERS\\n  import MainContainer from \\"../components/containers/main.svelte\\";\\n\\n  import \\"../layout.css\\";\\n<\/script>\\n\\n<svelte:head>\\n  <link rel=\\"preconnect\\" href=\\"https://fonts.googleapis.com\\" />\\n  <link rel=\\"preconnect\\" href=\\"https://fonts.gstatic.com\\" crossorigin />\\n  <link\\n    href=\\"https://fonts.googleapis.com/css2?family=Mulish&display=swap\\"\\n    rel=\\"stylesheet\\"\\n  />\\n</svelte:head>\\n\\n<MainContainer>\\n  <Navbar />\\n  <slot />\\n  <Footer />\\n</MainContainer>\\n\\n<style>\\n  @tailwind base;\\n  @tailwind components;\\n  @tailwind utilities;\\n</style>\\n"],"names":[],"mappings":"AA2BE,UAAU,IAAI,CAAC,AACf,UAAU,UAAU,CAAC,AACrB,UAAU,SAAS,CAAC"}'
};
var _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$n);
  return `${$$result.head += `<link rel="${"preconnect"}" href="${"https://fonts.googleapis.com"}" data-svelte="svelte-veb0m8"><link rel="${"preconnect"}" href="${"https://fonts.gstatic.com"}" crossorigin data-svelte="svelte-veb0m8"><link href="${"https://fonts.googleapis.com/css2?family=Mulish&display=swap"}" rel="${"stylesheet"}" data-svelte="svelte-veb0m8">`, ""}

${validate_component(Main, "MainContainer").$$render($$result, {}, {}, {
    default: () => `${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}
  ${slots.default ? slots.default({}) : ``}
  ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`
  })}`;
});
var __layout = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _layout
});
function load({ error: error2, status }) {
  return { props: { error: error2, status } };
}
var Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { status } = $$props;
  let { error: error2 } = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
    $$bindings.error(error2);
  return `<h1>${escape(status)}</h1>

<pre>${escape(error2.message)}</pre>



${error2.frame ? `<pre>${escape(error2.frame)}</pre>` : ``}
${error2.stack ? `<pre>${escape(error2.stack)}</pre>` : ``}`;
});
var error = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Error$1,
  load
});
var css$m = {
  code: "div.svelte-hxax12{background:linear-gradient(to right, #a6cf4d, #00bcea)}",
  map: '{"version":3,"file":"spacer-line.svelte","sources":["spacer-line.svelte"],"sourcesContent":["<div class=\\"h-12 w-full\\" />\\n\\n<style>\\n  div {\\n    background: linear-gradient(to right, #a6cf4d, #00bcea);\\n  }\\n</style>\\n"],"names":[],"mappings":"AAGE,GAAG,cAAC,CAAC,AACH,UAAU,CAAE,gBAAgB,EAAE,CAAC,KAAK,CAAC,CAAC,OAAO,CAAC,CAAC,OAAO,CAAC,AACzD,CAAC"}'
};
var Spacer_line = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$m);
  return `<div class="${"h-12 w-full svelte-hxax12"}"></div>`;
});
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function tick_spring(ctx, last_value, current_value, target_value) {
  if (typeof current_value === "number" || is_date(current_value)) {
    const delta2 = target_value - current_value;
    const velocity = (current_value - last_value) / (ctx.dt || 1 / 60);
    const spring2 = ctx.opts.stiffness * delta2;
    const damper = ctx.opts.damping * velocity;
    const acceleration = (spring2 - damper) * ctx.inv_mass;
    const d = (velocity + acceleration) * ctx.dt;
    if (Math.abs(d) < ctx.opts.precision && Math.abs(delta2) < ctx.opts.precision) {
      return target_value;
    } else {
      ctx.settled = false;
      return is_date(current_value) ? new Date(current_value.getTime() + d) : current_value + d;
    }
  } else if (Array.isArray(current_value)) {
    return current_value.map((_, i) => tick_spring(ctx, last_value[i], current_value[i], target_value[i]));
  } else if (typeof current_value === "object") {
    const next_value = {};
    for (const k in current_value) {
      next_value[k] = tick_spring(ctx, last_value[k], current_value[k], target_value[k]);
    }
    return next_value;
  } else {
    throw new Error(`Cannot spring ${typeof current_value} values`);
  }
}
function spring$1(value, opts = {}) {
  const store = writable(value);
  const { stiffness = 0.15, damping = 0.8, precision = 0.01 } = opts;
  let last_time;
  let task;
  let current_token;
  let last_value = value;
  let target_value = value;
  let inv_mass = 1;
  let inv_mass_recovery_rate = 0;
  let cancel_task = false;
  function set(new_value, opts2 = {}) {
    target_value = new_value;
    const token = current_token = {};
    if (value == null || opts2.hard || spring2.stiffness >= 1 && spring2.damping >= 1) {
      cancel_task = true;
      last_time = now();
      last_value = new_value;
      store.set(value = target_value);
      return Promise.resolve();
    } else if (opts2.soft) {
      const rate = opts2.soft === true ? 0.5 : +opts2.soft;
      inv_mass_recovery_rate = 1 / (rate * 60);
      inv_mass = 0;
    }
    if (!task) {
      last_time = now();
      cancel_task = false;
      task = loop((now2) => {
        if (cancel_task) {
          cancel_task = false;
          task = null;
          return false;
        }
        inv_mass = Math.min(inv_mass + inv_mass_recovery_rate, 1);
        const ctx = {
          inv_mass,
          opts: spring2,
          settled: true,
          dt: (now2 - last_time) * 60 / 1e3
        };
        const next_value = tick_spring(ctx, last_value, value, target_value);
        last_time = now2;
        last_value = value;
        store.set(value = next_value);
        if (ctx.settled) {
          task = null;
        }
        return !ctx.settled;
      });
    }
    return new Promise((fulfil) => {
      task.promise.then(() => {
        if (token === current_token)
          fulfil();
      });
    });
  }
  const spring2 = {
    set,
    update: (fn, opts2) => set(fn(target_value, value), opts2),
    subscribe: store.subscribe,
    stiffness,
    damping,
    precision
  };
  return spring2;
}
var css$l = {
  code: ".svelte-1m1p432{overflow:hidden}",
  map: '{"version":3,"file":"lg-primary-icon-fill.svelte","sources":["lg-primary-icon-fill.svelte"],"sourcesContent":["<script>\\n  //LIBS\\n  import { onMount } from \\"svelte\\";\\n  import Icon from \\"@iconify/svelte\\";\\n  import { spring } from \\"svelte/motion\\";\\n\\n  //PROPS\\n  export let icon_label, label, url, type;\\n\\n  let isBooped = false;\\n  let rotation = 10;\\n  let timing = 200;\\n\\n  let springyRotation = spring(0, {\\n    stiffness: 0.1,\\n    damping: 0.15,\\n  });\\n\\n  $: springyRotation.set(isBooped ? rotation : 0);\\n\\n  $: style = `\\n\\t\\ttransform: rotate(${$springyRotation}deg)\\n\\t`;\\n\\n  $: if (isBooped) {\\n    setTimeout(() => {\\n      isBooped = false;\\n    }, timing);\\n  }\\n\\n  const toggle = () => {\\n    isBooped = true;\\n  };\\n\\n  onMount(() => {});\\n<\/script>\\n\\n<a href={url}>\\n  <button\\n    {type}\\n    on:mouseenter={toggle}\\n    on:mouseleave={toggle}\\n    class=\\"flex items-center px-32 space-x-16 w-268 h-72 text-on-background-variant font-bold rounded-md bg-primary-main transition ease-in-out hover:bg-secondary-main duration-500\\"\\n  >\\n    <div class=\\"text-xl\\">\\n      <Icon icon={icon_label} {style} />\\n    </div>\\n    <h1 class=\\"text-lg\\">{label}</h1>\\n  </button>\\n</a>\\n\\n<style>\\n  * {\\n    overflow: hidden;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAoDE,eAAE,CAAC,AACD,QAAQ,CAAE,MAAM,AAClB,CAAC"}'
};
var Lg_primary_icon_fill = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let style;
  let $springyRotation, $$unsubscribe_springyRotation;
  let { icon_label, label, url, type } = $$props;
  let springyRotation = spring$1(0, { stiffness: 0.1, damping: 0.15 });
  $$unsubscribe_springyRotation = subscribe(springyRotation, (value) => $springyRotation = value);
  if ($$props.icon_label === void 0 && $$bindings.icon_label && icon_label !== void 0)
    $$bindings.icon_label(icon_label);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.url === void 0 && $$bindings.url && url !== void 0)
    $$bindings.url(url);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  $$result.css.add(css$l);
  {
    springyRotation.set(0);
  }
  style = `
		transform: rotate(${$springyRotation}deg)
	`;
  $$unsubscribe_springyRotation();
  return `<a${add_attribute("href", url, 0)} class="${"svelte-1m1p432"}"><button${add_attribute("type", type, 0)} class="${"flex items-center px-32 space-x-16 w-268 h-72 text-on-background-variant font-bold rounded-md bg-primary-main transition ease-in-out hover:bg-secondary-main duration-500 svelte-1m1p432"}"><div class="${"text-xl svelte-1m1p432"}">${validate_component(Icon, "Icon").$$render($$result, { icon: icon_label, style }, {}, {})}</div>
    <h1 class="${"text-lg svelte-1m1p432"}">${escape(label)}</h1></button>
</a>`;
});
var css$k = {
  code: '.svelte-1c7seld{overflow:hidden}#wrapper.svelte-1c7seld{position:relative;z-index:1;min-height:800px;margin:auto;background-image:url("https://media.istockphoto.com/photos/stainless-steel-pipes-and-pipelines-in-modern-beer-factory-brewery-picture-id1152495926");background-repeat:no-repeat;background-size:cover}#gradient.svelte-1c7seld{position:absolute;margin:auto;left:0;top:0;min-height:800px;width:100%;z-index:-10;background:linear-gradient(\n      to bottom right,\n      #0b1d2ee5 40%,\n      rgba(53, 53, 53, 0.541)\n    )}#contents.svelte-1c7seld{position:absolute;z-index:10}',
  map: '{"version":3,"file":"hero-primary.svelte","sources":["hero-primary.svelte"],"sourcesContent":["<script>\\n  import Button from \\"../buttons/lg-primary-icon-fill.svelte\\";\\n  export let heading, subheading, paragraph;\\n\\n  let splitted = subheading.split(\\"%%\\");\\n  // console.log(\\"splitted\\", splitted);\\n<\/script>\\n\\n<div id=\\"wrapper\\">\\n  <div id=\\"gradient\\">\\n    <div\\n      id=\\"contents\\"\\n      class=\\"text-on-background-variant pt-168 xl:px-148 lg:px-96 md:px-72\\"\\n    >\\n      <h1 class=\\"text-4xl font-bold leading-6xl\\">\\n        {heading}\\n      </h1>\\n      <h2 class=\\"text-4xl font-bold leading-4xl\\">\\n        {splitted[0]}<span class=\\"text-primary-main\\">{splitted[1]}</span\\n        >{splitted[2]}\\n      </h2>\\n      <h2 class=\\"text-lg leading-md mt-56 xl:max-w-lg md:max-w-lg\\">\\n        {paragraph}\\n      </h2>\\n      <div class=\\"mt-56\\">\\n        <Button\\n          icon_label=\\"ic:outline-eco\\"\\n          label=\\"Get Started\\"\\n          url=\\"/contact\\"\\n        />\\n      </div>\\n    </div>\\n  </div>\\n</div>\\n\\n<style>\\n  * {\\n    overflow: hidden;\\n  }\\n  #wrapper {\\n    position: relative;\\n    z-index: 1;\\n    min-height: 800px;\\n    margin: auto;\\n    background-image: url(\\"https://media.istockphoto.com/photos/stainless-steel-pipes-and-pipelines-in-modern-beer-factory-brewery-picture-id1152495926\\");\\n    background-repeat: no-repeat;\\n    background-size: cover;\\n  }\\n\\n  #gradient {\\n    position: absolute;\\n    margin: auto;\\n    left: 0;\\n    top: 0;\\n    min-height: 800px;\\n    width: 100%;\\n    z-index: -10;\\n    background: linear-gradient(\\n      to bottom right,\\n      #0b1d2ee5 40%,\\n      rgba(53, 53, 53, 0.541)\\n    );\\n  }\\n\\n  #contents {\\n    position: absolute;\\n    z-index: 10;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAoCE,eAAE,CAAC,AACD,QAAQ,CAAE,MAAM,AAClB,CAAC,AACD,QAAQ,eAAC,CAAC,AACR,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,KAAK,CACjB,MAAM,CAAE,IAAI,CACZ,gBAAgB,CAAE,IAAI,8HAA8H,CAAC,CACrJ,iBAAiB,CAAE,SAAS,CAC5B,eAAe,CAAE,KAAK,AACxB,CAAC,AAED,SAAS,eAAC,CAAC,AACT,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,IAAI,CACZ,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,UAAU,CAAE,KAAK,CACjB,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,GAAG,CACZ,UAAU,CAAE;MACV,EAAE,CAAC,MAAM,CAAC,KAAK,CAAC;MAChB,SAAS,CAAC,GAAG,CAAC;MACd,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,KAAK,CAAC;KACxB,AACH,CAAC,AAED,SAAS,eAAC,CAAC,AACT,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,EAAE,AACb,CAAC"}'
};
var Hero_primary = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { heading, subheading, paragraph } = $$props;
  let splitted = subheading.split("%%");
  if ($$props.heading === void 0 && $$bindings.heading && heading !== void 0)
    $$bindings.heading(heading);
  if ($$props.subheading === void 0 && $$bindings.subheading && subheading !== void 0)
    $$bindings.subheading(subheading);
  if ($$props.paragraph === void 0 && $$bindings.paragraph && paragraph !== void 0)
    $$bindings.paragraph(paragraph);
  $$result.css.add(css$k);
  return `<div id="${"wrapper"}" class="${"svelte-1c7seld"}"><div id="${"gradient"}" class="${"svelte-1c7seld"}"><div id="${"contents"}" class="${"text-on-background-variant pt-168 xl:px-148 lg:px-96 md:px-72 svelte-1c7seld"}"><h1 class="${"text-4xl font-bold leading-6xl svelte-1c7seld"}">${escape(heading)}</h1>
      <h2 class="${"text-4xl font-bold leading-4xl svelte-1c7seld"}">${escape(splitted[0])}<span class="${"text-primary-main svelte-1c7seld"}">${escape(splitted[1])}</span>${escape(splitted[2])}</h2>
      <h2 class="${"text-lg leading-md mt-56 xl:max-w-lg md:max-w-lg svelte-1c7seld"}">${escape(paragraph)}</h2>
      <div class="${"mt-56 svelte-1c7seld"}">${validate_component(Lg_primary_icon_fill, "Button").$$render($$result, {
    icon_label: "ic:outline-eco",
    label: "Get Started",
    url: "/contact"
  }, {}, {})}</div></div></div>
</div>`;
});
var Hero_section$3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { contents } = $$props;
  if ($$props.contents === void 0 && $$bindings.contents && contents !== void 0)
    $$bindings.contents(contents);
  return `${validate_component(Hero_primary, "HeroPrimary").$$render($$result, {
    heading: contents.heading,
    subheading: contents.subheading,
    paragraph: contents.paragraph
  }, {}, {})}`;
});
var css$j = {
  code: ".svelte-1m1p432{overflow:hidden}",
  map: '{"version":3,"file":"md-primary-icon-outlined.svelte","sources":["md-primary-icon-outlined.svelte"],"sourcesContent":["<script>\\n  //LIBS\\n  import Icon from \\"@iconify/svelte\\";\\n  import { spring } from \\"svelte/motion\\";\\n\\n  //PROPS\\n  export let icon_label, label, url;\\n\\n  let isBooped = false;\\n  let rotation = 10;\\n  let timing = 200;\\n\\n  let springyRotation = spring(0, {\\n    stiffness: 0.1,\\n    damping: 0.15,\\n  });\\n\\n  $: springyRotation.set(isBooped ? rotation : 0);\\n\\n  $: style = `\\n\\t\\ttransform: rotate(${$springyRotation}deg)\\n\\t`;\\n\\n  $: if (isBooped) {\\n    setTimeout(() => {\\n      isBooped = false;\\n    }, timing);\\n  }\\n\\n  const toggle = () => {\\n    isBooped = true;\\n  };\\n<\/script>\\n\\n<button\\n  on:mouseenter={toggle}\\n  on:mouseleave={toggle}\\n  on:click={window.open(url, \\"_blank\\").focus()}\\n  class=\\"flex items-center space-x-8 w-auto h-56 text-primary-main font-bold rounded-md border-4 border-primary-main hover:border-secondary-main transition ease-in-out hover:text-secondary-main duration-500 px-16\\"\\n>\\n  <h1 class=\\"text-md\\">{label}</h1>\\n  <div class=\\"text-xl\\">\\n    <Icon icon={icon_label} {style} />\\n  </div>\\n</button>\\n\\n<style>\\n  * {\\n    overflow: hidden;\\n  }\\n</style>\\n"],"names":[],"mappings":"AA+CE,eAAE,CAAC,AACD,QAAQ,CAAE,MAAM,AAClB,CAAC"}'
};
var Md_primary_icon_outlined = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let style;
  let $springyRotation, $$unsubscribe_springyRotation;
  let { icon_label, label, url } = $$props;
  let springyRotation = spring$1(0, { stiffness: 0.1, damping: 0.15 });
  $$unsubscribe_springyRotation = subscribe(springyRotation, (value) => $springyRotation = value);
  if ($$props.icon_label === void 0 && $$bindings.icon_label && icon_label !== void 0)
    $$bindings.icon_label(icon_label);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.url === void 0 && $$bindings.url && url !== void 0)
    $$bindings.url(url);
  $$result.css.add(css$j);
  {
    springyRotation.set(0);
  }
  style = `
		transform: rotate(${$springyRotation}deg)
	`;
  $$unsubscribe_springyRotation();
  return `<button class="${"flex items-center space-x-8 w-auto h-56 text-primary-main font-bold rounded-md border-4 border-primary-main hover:border-secondary-main transition ease-in-out hover:text-secondary-main duration-500 px-16 svelte-1m1p432"}"><h1 class="${"text-md svelte-1m1p432"}">${escape(label)}</h1>
  <div class="${"text-xl svelte-1m1p432"}">${validate_component(Icon, "Icon").$$render($$result, { icon: icon_label, style }, {}, {})}</div>
</button>`;
});
var css$i = {
  code: ".svelte-46yhsj{overflow:hidden}:root{--w:100%}#carousel-container.svelte-46yhsj{width:var(--w);position:relative;display:flex;flex-direction:column}#carousel-slides.svelte-46yhsj{width:100%;display:flex;justify-content:center;z-index:1}#control-wrapper-left.svelte-46yhsj{position:absolute;width:5%;height:100%;top:0;left:0;z-index:10}#control-wrapper-right.svelte-46yhsj{position:absolute;width:5%;height:100%;top:0;right:50%;z-index:10}button.svelte-46yhsj{position:absolute;top:50%;transform:translateY(-50%);display:flex;align-items:center;justify-content:center;background:transparent;border:none}button.svelte-46yhsj:focus{outline:none}#left.svelte-46yhsj{left:10px}#right.svelte-46yhsj{right:10px}#chevronRight.svelte-46yhsj{cursor:pointer}#chevronLeft.svelte-46yhsj{cursor:pointer}#paginator-container.svelte-46yhsj{position:absolute;bottom:0}",
  map: '{"version":3,"file":"carousel.svelte","sources":["carousel.svelte"],"sourcesContent":["<script>\\n  //LIBS\\n  import { onMount, onDestroy } from \\"svelte\\";\\n  import { flip } from \\"svelte/animate\\";\\n  import { spring } from \\"svelte/motion\\";\\n  import Icon from \\"@iconify/svelte\\";\\n\\n  //COMPONENTS\\n  import Button from \\"../../buttons/md-primary-icon-outlined.svelte\\";\\n\\n  //PROPS\\n  export let slides;\\n  export let speed;\\n  export let autoplay;\\n  export let autoplaySpeed;\\n  export let displayControls;\\n\\n  let interval;\\n  let paginatorIndex = 0;\\n\\n  // console.log(slides);\\n\\n  onMount(async () => {\\n    let root = document.querySelector(\\":root\\");\\n    root.style.setProperty(\\"--w\\", slides.length * 100 + \\"%\\");\\n    root.style.setProperty(\\"--controlWidth\\", 100 / slides.length - 2 + \\"%\\");\\n  });\\n\\n  const handleEnterLeft = () => {\\n    // let chevronLeft = document.getElementById(\\"chevronLeft\\");\\n    // chevronLeft.src = \\"/assets/icons/chevron-left-hover.svg\\";\\n    toggle();\\n  };\\n\\n  const handleLeaveLeft = () => {\\n    // let chevronLeft = document.getElementById(\\"chevronLeft\\");\\n    // chevronLeft.src = \\"/assets/icons/chevron-left.svg\\";\\n  };\\n\\n  const handleEnterRight = () => {\\n    let chevronRight = document.getElementById(\\"chevronRight\\");\\n    chevronRight.src = \\"/assets/icons/chevron-right-hover.svg\\";\\n    toggle();\\n  };\\n\\n  const handleLeaveRight = () => {\\n    let chevronRight = document.getElementById(\\"chevronRight\\");\\n    chevronRight.src = \\"/assets/icons/chevron-right.svg\\";\\n  };\\n\\n  const rotateLeft = (e) => {\\n    const transitioningSlide = slides[slides.length - 1];\\n    document.getElementById(transitioningSlide.id).style.opacity = 0;\\n    slides = [slides[slides.length - 1], ...slides.slice(0, slides.length - 1)];\\n    document.getElementById(transitioningSlide.id).style.opacity = 1;\\n\\n    paginatorIndex++;\\n    if (paginatorIndex >= slides.length) {\\n      paginatorIndex = 0;\\n    }\\n\\n    slides[paginatorIndex].active = true;\\n  };\\n\\n  const rotateRight = (e) => {\\n    const transitioningSlide = slides[0];\\n    document.getElementById(transitioningSlide.id).style.opacity = 0;\\n    slides = [...slides.slice(1, slides.length), slides[0]];\\n    document.getElementById(transitioningSlide.id).style.opacity = 1;\\n\\n    paginatorIndex++;\\n    if (paginatorIndex >= slides.length) {\\n      paginatorIndex = 0;\\n    }\\n    // console.log(paginatorIndex);\\n\\n    slides[paginatorIndex].active = true;\\n  };\\n\\n  const startAutoPlay = () => {\\n    if (autoplay) {\\n      interval = setInterval(rotateRight, autoplaySpeed);\\n    }\\n  };\\n\\n  const stopAutoPlay = () => {\\n    clearInterval(interval);\\n  };\\n\\n  if (autoplay) {\\n    startAutoPlay();\\n  }\\n\\n  onDestroy(() => {\\n    stopAutoPlay();\\n  });\\n\\n  //ANIMATION\\n  let isBooped = false;\\n  let rotation = 5;\\n  let timing = 200;\\n\\n  let springyRotation = spring(0, {\\n    stiffness: 0.1,\\n    damping: 0.15,\\n  });\\n\\n  $: springyRotation.set(isBooped ? rotation : 0);\\n\\n  $: style = `\\n\\t\\ttransform: rotate(${$springyRotation}deg)\\n\\t`;\\n\\n  $: if (isBooped) {\\n    setTimeout(() => {\\n      isBooped = false;\\n    }, timing);\\n  }\\n\\n  const toggle = () => {\\n    isBooped = true;\\n    console.log(\\"boop\\");\\n  };\\n<\/script>\\n\\n<div id=\\"carousel-container\\">\\n  <div id=\\"carousel-slides\\">\\n    {#each slides as slide (slide.id)}\\n      <div\\n        alt={slide.id}\\n        id={slide.id}\\n        on:mouseover={stopAutoPlay}\\n        on:mouseout={startAutoPlay}\\n        on:blur={() => console.log(\\"BLUR\\")}\\n        on:focus={() => console.log(\\"FOCUS\\")}\\n        animate:flip={{ duration: speed }}\\n      >\\n        <div class=\\"flex items-center xl:mx-120 md:mx-120\\">\\n          <img id=\\"thumb\\" class=\\"w-720\\" src={slide.path} alt=\\"\\" />\\n          <div class=\\"px-72 space-y-32\\">\\n            <div class=\\"flex items-center\\">\\n              <div class=\\"text-2xl text-primary-main\\">\\n                <Icon icon=\\"carbon:flood-warning\\" />\\n              </div>\\n              <h1 class=\\"text-scondary-dark text-xl font-bold px-16\\">\\n                {slide.headline}\\n              </h1>\\n            </div>\\n\\n            <div class=\\"text-lg\\">\\n              <h1 class=\\"\\">\\n                {slide.paragraph}\\n              </h1>\\n            </div>\\n            <div id=\\"more-btn\\">\\n              <Button\\n                icon_label=\\"ic:baseline-read-more\\"\\n                label=\\"Read More\\"\\n                url={slide.button_url.url}\\n              />\\n            </div>\\n          </div>\\n        </div>\\n      </div>\\n    {/each}\\n  </div>\\n  {#if displayControls}\\n    <div id=\\"control-wrapper-left\\" class=\\"mx-1\\">\\n      <button id=\\"left\\" on:click={rotateLeft}>\\n        <slot name=\\"left-control\\">\\n          <!-- <div class=\\"xl:w-48 lg:w-56 md:w-120 sm:w-96\\"> -->\\n          <div\\n            on:mouseenter={handleEnterLeft}\\n            on:mouseleave={handleLeaveLeft}\\n            class=\\"w-full h-full text-6xl text-primary-main transition ease-in-out hover:text-secondary-main duration-600\\"\\n          >\\n            <Icon {style} icon=\\"bx:bx-chevron-left\\" />\\n          </div>\\n        </slot>\\n      </button>\\n    </div>\\n    <div id=\\"control-wrapper-right\\" class=\\"mx-1\\">\\n      <button id=\\"right\\" on:click={rotateRight}>\\n        <slot name=\\"right-control\\">\\n          <div\\n            on:mouseenter={handleEnterLeft}\\n            on:mouseleave={handleLeaveLeft}\\n            class=\\"w-full h-full text-6xl text-primary-main transition ease-in-out hover:text-secondary-main duration-600\\"\\n          >\\n            <Icon {style} icon=\\"bx:bx-chevron-right\\" />\\n          </div>\\n        </slot>\\n      </button>\\n      <!-- <div\\n        id=\\"paginator-container\\"\\n        class=\\"flex justify-center w-full space-x-12\\"\\n      >\\n        <Paginator {slides} />\\n      </div> -->\\n    </div>\\n  {/if}\\n</div>\\n\\n<style>\\n  * {\\n    overflow: hidden;\\n  }\\n\\n  a {\\n    cursor: pointer;\\n  }\\n\\n  :root {\\n    --w: 100%;\\n  }\\n\\n  #carousel-container {\\n    width: var(--w);\\n    position: relative;\\n    display: flex;\\n    flex-direction: column;\\n    /* overflow-x: hidden; */\\n  }\\n  #carousel-slides {\\n    width: 100%;\\n    display: flex;\\n    justify-content: center;\\n    z-index: 1;\\n  }\\n\\n  #control-wrapper-left {\\n    position: absolute;\\n    width: 5%;\\n    height: 100%;\\n    top: 0;\\n    left: 0;\\n    z-index: 10;\\n  }\\n\\n  #control-wrapper-right {\\n    position: absolute;\\n    width: 5%;\\n    height: 100%;\\n    top: 0;\\n    right: 50%;\\n    z-index: 10;\\n  }\\n\\n  #more-btn {\\n  }\\n\\n  button {\\n    position: absolute;\\n    top: 50%;\\n    transform: translateY(-50%);\\n    display: flex;\\n    align-items: center;\\n    justify-content: center;\\n    background: transparent;\\n    border: none;\\n  }\\n  button:focus {\\n    outline: none;\\n  }\\n  #left {\\n    left: 10px;\\n  }\\n  #right {\\n    right: 10px;\\n  }\\n\\n  #chevronRight {\\n    cursor: pointer;\\n  }\\n\\n  #chevronLeft {\\n    cursor: pointer;\\n  }\\n\\n  #paginator-container {\\n    position: absolute;\\n    bottom: 0;\\n  }\\n</style>\\n"],"names":[],"mappings":"AA4ME,cAAE,CAAC,AACD,QAAQ,CAAE,MAAM,AAClB,CAAC,AAMD,KAAK,AAAC,CAAC,AACL,GAAG,CAAE,IAAI,AACX,CAAC,AAED,mBAAmB,cAAC,CAAC,AACnB,KAAK,CAAE,IAAI,GAAG,CAAC,CACf,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,AAExB,CAAC,AACD,gBAAgB,cAAC,CAAC,AAChB,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,OAAO,CAAE,CAAC,AACZ,CAAC,AAED,qBAAqB,cAAC,CAAC,AACrB,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,EAAE,CACT,MAAM,CAAE,IAAI,CACZ,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,OAAO,CAAE,EAAE,AACb,CAAC,AAED,sBAAsB,cAAC,CAAC,AACtB,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,EAAE,CACT,MAAM,CAAE,IAAI,CACZ,GAAG,CAAE,CAAC,CACN,KAAK,CAAE,GAAG,CACV,OAAO,CAAE,EAAE,AACb,CAAC,AAKD,MAAM,cAAC,CAAC,AACN,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CACR,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,UAAU,CAAE,WAAW,CACvB,MAAM,CAAE,IAAI,AACd,CAAC,AACD,oBAAM,MAAM,AAAC,CAAC,AACZ,OAAO,CAAE,IAAI,AACf,CAAC,AACD,KAAK,cAAC,CAAC,AACL,IAAI,CAAE,IAAI,AACZ,CAAC,AACD,MAAM,cAAC,CAAC,AACN,KAAK,CAAE,IAAI,AACb,CAAC,AAED,aAAa,cAAC,CAAC,AACb,MAAM,CAAE,OAAO,AACjB,CAAC,AAED,YAAY,cAAC,CAAC,AACZ,MAAM,CAAE,OAAO,AACjB,CAAC,AAED,oBAAoB,cAAC,CAAC,AACpB,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,CAAC,AACX,CAAC"}'
};
var Carousel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let style;
  let $springyRotation, $$unsubscribe_springyRotation;
  let { slides } = $$props;
  let { speed } = $$props;
  let { autoplay } = $$props;
  let { autoplaySpeed } = $$props;
  let { displayControls } = $$props;
  let interval;
  let paginatorIndex = 0;
  const rotateRight = (e) => {
    const transitioningSlide = slides[0];
    document.getElementById(transitioningSlide.id).style.opacity = 0;
    slides = [...slides.slice(1, slides.length), slides[0]];
    document.getElementById(transitioningSlide.id).style.opacity = 1;
    paginatorIndex++;
    if (paginatorIndex >= slides.length) {
      paginatorIndex = 0;
    }
    slides[paginatorIndex].active = true;
  };
  const startAutoPlay = () => {
    if (autoplay) {
      interval = setInterval(rotateRight, autoplaySpeed);
    }
  };
  const stopAutoPlay = () => {
    clearInterval(interval);
  };
  if (autoplay) {
    startAutoPlay();
  }
  onDestroy(() => {
    stopAutoPlay();
  });
  let springyRotation = spring$1(0, { stiffness: 0.1, damping: 0.15 });
  $$unsubscribe_springyRotation = subscribe(springyRotation, (value) => $springyRotation = value);
  if ($$props.slides === void 0 && $$bindings.slides && slides !== void 0)
    $$bindings.slides(slides);
  if ($$props.speed === void 0 && $$bindings.speed && speed !== void 0)
    $$bindings.speed(speed);
  if ($$props.autoplay === void 0 && $$bindings.autoplay && autoplay !== void 0)
    $$bindings.autoplay(autoplay);
  if ($$props.autoplaySpeed === void 0 && $$bindings.autoplaySpeed && autoplaySpeed !== void 0)
    $$bindings.autoplaySpeed(autoplaySpeed);
  if ($$props.displayControls === void 0 && $$bindings.displayControls && displayControls !== void 0)
    $$bindings.displayControls(displayControls);
  $$result.css.add(css$i);
  {
    springyRotation.set(0);
  }
  style = `
		transform: rotate(${$springyRotation}deg)
	`;
  $$unsubscribe_springyRotation();
  return `<div id="${"carousel-container"}" class="${"svelte-46yhsj"}"><div id="${"carousel-slides"}" class="${"svelte-46yhsj"}">${each(slides, (slide) => `<div${add_attribute("alt", slide.id, 0)}${add_attribute("id", slide.id, 0)} class="${"svelte-46yhsj"}"><div class="${"flex items-center xl:mx-120 md:mx-120 svelte-46yhsj"}"><img id="${"thumb"}" class="${"w-720 svelte-46yhsj"}"${add_attribute("src", slide.path, 0)} alt="${""}">
          <div class="${"px-72 space-y-32 svelte-46yhsj"}"><div class="${"flex items-center svelte-46yhsj"}"><div class="${"text-2xl text-primary-main svelte-46yhsj"}">${validate_component(Icon, "Icon").$$render($$result, { icon: "carbon:flood-warning" }, {}, {})}</div>
              <h1 class="${"text-scondary-dark text-xl font-bold px-16 svelte-46yhsj"}">${escape(slide.headline)}
              </h1></div>

            <div class="${"text-lg svelte-46yhsj"}"><h1 class="${" svelte-46yhsj"}">${escape(slide.paragraph)}
              </h1></div>
            <div id="${"more-btn"}" class="${"svelte-46yhsj"}">${validate_component(Md_primary_icon_outlined, "Button").$$render($$result, {
    icon_label: "ic:baseline-read-more",
    label: "Read More",
    url: slide.button_url.url
  }, {}, {})}</div>
          </div></div>
      </div>`)}</div>
  ${displayControls ? `<div id="${"control-wrapper-left"}" class="${"mx-1 svelte-46yhsj"}"><button id="${"left"}" class="${"svelte-46yhsj"}">${slots["left-control"] ? slots["left-control"]({}) : `
          
          <div class="${"w-full h-full text-6xl text-primary-main transition ease-in-out hover:text-secondary-main duration-600 svelte-46yhsj"}">${validate_component(Icon, "Icon").$$render($$result, { style, icon: "bx:bx-chevron-left" }, {}, {})}</div>
        `}</button></div>
    <div id="${"control-wrapper-right"}" class="${"mx-1 svelte-46yhsj"}"><button id="${"right"}" class="${"svelte-46yhsj"}">${slots["right-control"] ? slots["right-control"]({}) : `
          <div class="${"w-full h-full text-6xl text-primary-main transition ease-in-out hover:text-secondary-main duration-600 svelte-46yhsj"}">${validate_component(Icon, "Icon").$$render($$result, { style, icon: "bx:bx-chevron-right" }, {}, {})}</div>
        `}</button>
      </div>` : ``}
</div>`;
});
var Section_1$3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const slides = [];
  let id = 1;
  data.carousel.slides.forEach((slide) => {
    let isActive;
    if (id == 1) {
      isActive = true;
    } else {
      isActive = false;
    }
    slides.push({
      path: slide.image_url,
      headline: slide.headline,
      paragraph: slide.paragraph,
      id,
      active: isActive,
      button_url: slide.button_url
    });
    id++;
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="${"bg-background-light w-full h-auto py-120"}">${validate_component(Carousel, "Carousel").$$render($$result, {
    slides,
    displayControls: true,
    autoplay: true,
    autoplaySpeed: 5e3,
    speed: 800
  }, {}, {})}</div>`;
});
var Section_two_cols = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"w-auto h-auto grid grid-flow-col xl:mx-168 md:mx-72 my-120 gap-x-120"}">${slots.default ? slots.default({}) : ``}</div>`;
});
var css$h = {
  code: ".svelte-1m1p432{overflow:hidden}",
  map: '{"version":3,"file":"section-2.svelte","sources":["section-2.svelte"],"sourcesContent":["<script>\\n  //LIBS\\n\\n  //CONTAINERS\\n  import SectionContainer from \\"../../containers/section-two-cols.svelte\\";\\n\\n  //PROPS\\n  export let data;\\n  // console.log(\\"DATA\\", data);\\n<\/script>\\n\\n<SectionContainer>\\n  <div\\n    class=\\"flex items-center w-full text-on-background-variant md:text-2xl md:leading-3xl text-left my-240\\"\\n  >\\n    <h1>\\n      {data.headline}\\n    </h1>\\n  </div>\\n  <div\\n    class=\\"flex items-center w-full text-on-background-variant text-lg text-left\\"\\n  >\\n    <h1>\\n      {data.paragraph.substr(0, data.start)}\\n      <span class=\\"text-primary-light font-bold underline\\"\\n        >{data.paragraph.substr(data.start, data.end)}</span\\n      >\\n    </h1>\\n  </div>\\n</SectionContainer>\\n\\n<style>\\n  * {\\n    overflow: hidden;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAgCE,eAAE,CAAC,AACD,QAAQ,CAAE,MAAM,AAClB,CAAC"}'
};
var Section_2$2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css$h);
  return `${validate_component(Section_two_cols, "SectionContainer").$$render($$result, {}, {}, {
    default: () => `<div class="${"flex items-center w-full text-on-background-variant md:text-2xl md:leading-3xl text-left my-240 svelte-1m1p432"}"><h1 class="${"svelte-1m1p432"}">${escape(data.headline)}</h1></div>
  <div class="${"flex items-center w-full text-on-background-variant text-lg text-left svelte-1m1p432"}"><h1 class="${"svelte-1m1p432"}">${escape(data.paragraph.substr(0, data.start))}
      <span class="${"text-primary-light font-bold underline svelte-1m1p432"}">${escape(data.paragraph.substr(data.start, data.end))}</span></h1></div>`
  })}`;
});
var css$g = {
  code: ".svelte-1m1p432{overflow:hidden}",
  map: '{"version":3,"file":"section-one-col-center.svelte","sources":["section-one-col-center.svelte"],"sourcesContent":["<div class=\\"flex justify-center w-full h-full\\">\\n  <slot />\\n</div>\\n\\n<style>\\n  * {\\n    overflow: hidden;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAKE,eAAE,CAAC,AACD,QAAQ,CAAE,MAAM,AAClB,CAAC"}'
};
var Section_one_col_center = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$g);
  return `<div class="${"flex justify-center w-full h-full svelte-1m1p432"}">${slots.default ? slots.default({}) : ``}
</div>`;
});
var css$f = {
  code: '.svelte-onor3{overflow:hidden}#wrapper.svelte-onor3{position:relative;z-index:1;background-image:url("https://media.istockphoto.com/photos/sewage-treatment-plant-waste-water-purification-picture-id684896938?s=2048x2048");background-repeat:no-repeat;background-size:cover}#gradient.svelte-onor3{position:absolute;left:0;top:0;width:100%;height:100%;z-index:-10;background:linear-gradient(\n      to bottom right,\n      #0b1d2ec4 50%,\n      rgba(27, 50, 56, 0.726)\n    )}',
  map: '{"version":3,"file":"section-3.svelte","sources":["section-3.svelte"],"sourcesContent":["<script>\\n  //CONTAINERS\\n  import SectionContainer from \\"../../containers/section-one-col-center.svelte\\";\\n\\n  //PROPS\\n  export let data;\\n<\/script>\\n\\n<SectionContainer>\\n  <div\\n    id=\\"wrapper\\"\\n    class=\\"flex items-center h-full xl:text-4xl md:text-2xl xl:leading-6xl md:leading-4xl font-bold text-center text-on-background-variant\\"\\n  >\\n    <h1 class=\\"px-168 py-360\\">\\n      {data.headline}\\n    </h1>\\n    <div id=\\"gradient\\" class=\\"\\" />\\n  </div>\\n</SectionContainer>\\n\\n<style>\\n  * {\\n    overflow: hidden;\\n  }\\n  #wrapper {\\n    position: relative;\\n    z-index: 1;\\n    background-image: url(\\"https://media.istockphoto.com/photos/sewage-treatment-plant-waste-water-purification-picture-id684896938?s=2048x2048\\");\\n    background-repeat: no-repeat;\\n    background-size: cover;\\n  }\\n\\n  #gradient {\\n    position: absolute;\\n    left: 0;\\n    top: 0;\\n    width: 100%;\\n    height: 100%;\\n    z-index: -10;\\n    background: linear-gradient(\\n      to bottom right,\\n      #0b1d2ec4 50%,\\n      rgba(27, 50, 56, 0.726)\\n    );\\n  }\\n</style>\\n"],"names":[],"mappings":"AAqBE,aAAE,CAAC,AACD,QAAQ,CAAE,MAAM,AAClB,CAAC,AACD,QAAQ,aAAC,CAAC,AACR,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CAAC,CACV,gBAAgB,CAAE,IAAI,sHAAsH,CAAC,CAC7I,iBAAiB,CAAE,SAAS,CAC5B,eAAe,CAAE,KAAK,AACxB,CAAC,AAED,SAAS,aAAC,CAAC,AACT,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,GAAG,CACZ,UAAU,CAAE;MACV,EAAE,CAAC,MAAM,CAAC,KAAK,CAAC;MAChB,SAAS,CAAC,GAAG,CAAC;MACd,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,KAAK,CAAC;KACxB,AACH,CAAC"}'
};
var Section_3$2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css$f);
  return `${validate_component(Section_one_col_center, "SectionContainer").$$render($$result, {}, {}, {
    default: () => `<div id="${"wrapper"}" class="${"flex items-center h-full xl:text-4xl md:text-2xl xl:leading-6xl md:leading-4xl font-bold text-center text-on-background-variant svelte-onor3"}"><h1 class="${"px-168 py-360 svelte-onor3"}">${escape(data.headline)}</h1>
    <div id="${"gradient"}" class="${" svelte-onor3"}"></div></div>`
  })}`;
});
var Contact_section$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Section_one_col_center, "SectionContainer").$$render($$result, {}, {}, {
    default: () => `<div class="${"flex flex-col justify-center w-full text-center py-120"}"><h1 class="${"text-2xl font-bold text-on-background-variant mb-56"}">${escape(data.headline.slice(0, data.start))}
      <span class="${"text-primary-main font-bold"}">${escape(data.headline.slice(data.start, data.end))}</span>
      ${escape(data.headline.slice(data.end))}</h1>
    <div class="${"w-auto mx-auto"}">${validate_component(Lg_primary_icon_fill, "Button").$$render($$result, {
      icon_label: "ic:outline-eco",
      label: "Get Started",
      url: "/contact"
    }, {}, {})}</div></div>`
  })}`;
});
var css$e = {
  code: "@keyframes svelte-1ahnb3d-fadein{0%{opacity:0}100%{opacity:1}}@-moz-keyframes svelte-1ahnb3d-fadein{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes svelte-1ahnb3d-fadein{0%{opacity:0}100%{opacity:1}}@-ms-keyframes svelte-1ahnb3d-fadein{0%{opacity:0}100%{opacity:1}}@-o-keyframes svelte-1ahnb3d-fadein{0%{opacity:0}100%{opacity:1}}",
  map: '{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script>\\n  //STORES\\n  import { cms_url } from \\"../stores/renuestore\\";\\n\\n  //LIBS\\n\\n  //COMPONENTS\\n  import SpacerLine from \\"../components/containers/spacer-line.svelte\\";\\n\\n  //SECTIONS\\n  import HeroSection from \\"../components/sections/home/hero-section.svelte\\";\\n  import Section1 from \\"../components/sections/home/section-1.svelte\\";\\n  import Section2 from \\"../components/sections/home/section-2.svelte\\";\\n  import Section3 from \\"../components/sections/home/section-3.svelte\\";\\n  import ContactSection from \\"../components/sections/home/contact-section.svelte\\";\\n\\n  //CODE\\n\\n  const fetchRefs = async (url) => {\\n    const res = await fetch(url);\\n    const data = await res.json();\\n    return data.refs;\\n  };\\n\\n  const fetchData = async (cms_url, callback) => {\\n    const refs = await fetchRefs(cms_url);\\n\\n    const masterRef = await refs.map((ref, index) => {\\n      return ref.ref;\\n    });\\n\\n    const url = cms_url + \\"/documents/search?ref=\\" + masterRef + \\"#format=json\\";\\n    const res = await fetch(url);\\n    const data = await res.json();\\n\\n    // console.log(data);\\n\\n    let carouselSlides = [];\\n\\n    let hero_data = {};\\n    let section_2_data = {};\\n    let section_3_data = {};\\n    let contact_data = {};\\n\\n    data.results.forEach((result, i) => {\\n      //console.log(index, result.uid);\\n      if (result.uid === \\"homepage\\") {\\n        //console.log(result.data.body);\\n        result.data.body.forEach((section, j) => {\\n          //console.log(section);\\n          if (section.slice_type === \\"hero-section\\") {\\n            hero_data.imageUrl = section.primary[\\"bg-image\\"].url;\\n            hero_data.heading = section.primary.heading[0].text;\\n            hero_data.paragraph = section.primary.paragraph[0].text;\\n            hero_data.subheading = section.primary.subheading[0].text;\\n            hero_data.buttonLabel = section.primary[\\"button-label\\"];\\n          }\\n          if (section.slice_type === \\"section-1\\") {\\n            section.items.forEach((item) => {\\n              let tmpData = {\\n                image_url: item.thumbnail.url,\\n                headline: item.headline[0].text,\\n                paragraph: item.paragraph[0].text,\\n                button_url: item[\\"button-url\\"],\\n              };\\n              carouselSlides.push(tmpData);\\n            });\\n          }\\n          if (section.slice_type === \\"section-2\\") {\\n            section_2_data.headline = section.items[0].headline[0].text;\\n            section_2_data.paragraph = section.items[0].paragraph[0].text;\\n            section_2_data.start = section.items[0].paragraph[0].spans[0].start;\\n            section_2_data.end = section.items[0].paragraph[0].spans[0].end;\\n          }\\n          if (section.slice_type === \\"section-3\\") {\\n            section_3_data.headline = section.primary.headline[0].text;\\n          }\\n          if (section.slice_type === \\"contact-section\\") {\\n            contact_data.headline = section.primary.headline[0].text;\\n            contact_data.start = section.primary.headline[0].spans[0].start;\\n            contact_data.end = section.primary.headline[0].spans[0].end;\\n            contact_data.buttonLabel = section.primary[\\"button-label\\"];\\n            contact_data.buttonUrl = section.primary[\\"button-url\\"];\\n          }\\n        });\\n      }\\n    });\\n\\n    // console.log(\\"original data\\", data);\\n\\n    let cleanData = {\\n      hero: {\\n        id: 1, //data.id,\\n        uid: \\"hero\\", //data.uid,\\n        image_url: hero_data.imageUrl,\\n        button_label: hero_data.buttonLabel,\\n        heading: hero_data.heading,\\n        subheading: hero_data.subheading,\\n        paragraph: hero_data.paragraph,\\n      },\\n      section1: {\\n        carousel: {\\n          slides: carouselSlides,\\n        },\\n      },\\n      section2: {\\n        headline: section_2_data.headline,\\n        paragraph: section_2_data.paragraph,\\n        start: section_2_data.start,\\n        end: section_2_data.end,\\n      },\\n      section3: {\\n        headline: section_3_data.headline,\\n      },\\n      contact: {\\n        headline: contact_data.headline,\\n        start: contact_data.start,\\n        end: contact_data.end,\\n      },\\n    };\\n    //console.log(\\"cleanData\\", cleanData);\\n    callback(cleanData);\\n    // });\\n  };\\n\\n  let heroData;\\n  let section1Data, section2Data, section3Data;\\n  let contactData;\\n\\n  fetchData($cms_url, async (data) => {\\n    heroData = await data.hero;\\n    section1Data = await data.section1;\\n    section2Data = await data.section2;\\n    section3Data = await data.section3;\\n    contactData = await data.contact;\\n  });\\n<\/script>\\n\\n<svelte:head>\\n  <title>RENUE</title>\\n</svelte:head>\\n\\n{#await heroData}\\n  <h1 class=\\"text-secondary text-8xl mt-72\\">Loading...</h1>\\n{:then data}\\n  {#if data !== undefined}\\n    <HeroSection contents={data} />\\n  {/if}\\n{/await}\\n\\n{#await section1Data}\\n  <h1 class=\\"text-secondary text-8xl mt-72\\">Loading...</h1>\\n{:then data}\\n  {#if data !== undefined}\\n    <Section1 {data} />\\n  {/if}\\n{/await}\\n\\n<SpacerLine />\\n\\n{#await section2Data}\\n  <h1 class=\\"text-secondary text-8xl mt-72\\">Loading...</h1>\\n{:then data}\\n  {#if data !== undefined}\\n    <Section2 {data} />\\n  {/if}\\n{/await}\\n\\n{#await section3Data}\\n  <h1 class=\\"text-secondary text-8xl mt-72\\">Loading...</h1>\\n{:then data}\\n  {#if data !== undefined}\\n    <Section3 {data} />\\n  {/if}\\n{/await}\\n\\n{#await contactData}\\n  <h1 class=\\"text-secondary text-8xl mt-72\\">Loading...</h1>\\n{:then data}\\n  {#if data !== undefined}\\n    <ContactSection {data} />\\n  {/if}\\n{/await}\\n\\n<style>\\n  .section-2-out {\\n    opacity: 0;\\n  }\\n\\n  .section-2-in {\\n    -webkit-animation: fadein 20s; /* Safari, Chrome and Opera > 12.1 */\\n    -moz-animation: fadein 20s; /* Firefox < 16 */\\n    -ms-animation: fadein 20s; /* Internet Explorer */\\n    -o-animation: fadein 20s; /* Opera < 12.1 */\\n    animation: fadein 20s;\\n  }\\n\\n  @keyframes fadein {\\n    0% {\\n      opacity: 0;\\n    }\\n    100% {\\n      opacity: 1;\\n    }\\n  }\\n\\n  /* Firefox < 16 */\\n  @-moz-keyframes fadein {\\n    0% {\\n      opacity: 0;\\n    }\\n    100% {\\n      opacity: 1;\\n    }\\n  }\\n\\n  /* Safari, Chrome and Opera > 12.1 */\\n  @-webkit-keyframes fadein {\\n    0% {\\n      opacity: 0;\\n    }\\n    100% {\\n      opacity: 1;\\n    }\\n  }\\n\\n  /* Internet Explorer */\\n  @-ms-keyframes fadein {\\n    0% {\\n      opacity: 0;\\n    }\\n    100% {\\n      opacity: 1;\\n    }\\n  }\\n\\n  /* Opera < 12.1 */\\n  @-o-keyframes fadein {\\n    0% {\\n      opacity: 0;\\n    }\\n    100% {\\n      opacity: 1;\\n    }\\n  }\\n</style>\\n"],"names":[],"mappings":"AAqME,WAAW,qBAAO,CAAC,AACjB,EAAE,AAAC,CAAC,AACF,OAAO,CAAE,CAAC,AACZ,CAAC,AACD,IAAI,AAAC,CAAC,AACJ,OAAO,CAAE,CAAC,AACZ,CAAC,AACH,CAAC,AAGD,gBAAgB,qBAAO,CAAC,AACtB,EAAE,AAAC,CAAC,AACF,OAAO,CAAE,CAAC,AACZ,CAAC,AACD,IAAI,AAAC,CAAC,AACJ,OAAO,CAAE,CAAC,AACZ,CAAC,AACH,CAAC,AAGD,mBAAmB,qBAAO,CAAC,AACzB,EAAE,AAAC,CAAC,AACF,OAAO,CAAE,CAAC,AACZ,CAAC,AACD,IAAI,AAAC,CAAC,AACJ,OAAO,CAAE,CAAC,AACZ,CAAC,AACH,CAAC,AAGD,eAAe,qBAAO,CAAC,AACrB,EAAE,AAAC,CAAC,AACF,OAAO,CAAE,CAAC,AACZ,CAAC,AACD,IAAI,AAAC,CAAC,AACJ,OAAO,CAAE,CAAC,AACZ,CAAC,AACH,CAAC,AAGD,cAAc,qBAAO,CAAC,AACpB,EAAE,AAAC,CAAC,AACF,OAAO,CAAE,CAAC,AACZ,CAAC,AACD,IAAI,AAAC,CAAC,AACJ,OAAO,CAAE,CAAC,AACZ,CAAC,AACH,CAAC"}'
};
var Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $cms_url, $$unsubscribe_cms_url;
  $$unsubscribe_cms_url = subscribe(cms_url, (value) => $cms_url = value);
  const fetchRefs = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data.refs;
  };
  const fetchData = async (cms_url2, callback) => {
    const refs = await fetchRefs(cms_url2);
    const masterRef = await refs.map((ref, index2) => {
      return ref.ref;
    });
    const url = cms_url2 + "/documents/search?ref=" + masterRef + "#format=json";
    const res = await fetch(url);
    const data = await res.json();
    let carouselSlides = [];
    let hero_data = {};
    let section_2_data = {};
    let section_3_data = {};
    let contact_data = {};
    data.results.forEach((result, i) => {
      if (result.uid === "homepage") {
        result.data.body.forEach((section, j) => {
          if (section.slice_type === "hero-section") {
            hero_data.imageUrl = section.primary["bg-image"].url;
            hero_data.heading = section.primary.heading[0].text;
            hero_data.paragraph = section.primary.paragraph[0].text;
            hero_data.subheading = section.primary.subheading[0].text;
            hero_data.buttonLabel = section.primary["button-label"];
          }
          if (section.slice_type === "section-1") {
            section.items.forEach((item) => {
              let tmpData = {
                image_url: item.thumbnail.url,
                headline: item.headline[0].text,
                paragraph: item.paragraph[0].text,
                button_url: item["button-url"]
              };
              carouselSlides.push(tmpData);
            });
          }
          if (section.slice_type === "section-2") {
            section_2_data.headline = section.items[0].headline[0].text;
            section_2_data.paragraph = section.items[0].paragraph[0].text;
            section_2_data.start = section.items[0].paragraph[0].spans[0].start;
            section_2_data.end = section.items[0].paragraph[0].spans[0].end;
          }
          if (section.slice_type === "section-3") {
            section_3_data.headline = section.primary.headline[0].text;
          }
          if (section.slice_type === "contact-section") {
            contact_data.headline = section.primary.headline[0].text;
            contact_data.start = section.primary.headline[0].spans[0].start;
            contact_data.end = section.primary.headline[0].spans[0].end;
            contact_data.buttonLabel = section.primary["button-label"];
            contact_data.buttonUrl = section.primary["button-url"];
          }
        });
      }
    });
    let cleanData = {
      hero: {
        id: 1,
        uid: "hero",
        image_url: hero_data.imageUrl,
        button_label: hero_data.buttonLabel,
        heading: hero_data.heading,
        subheading: hero_data.subheading,
        paragraph: hero_data.paragraph
      },
      section1: { carousel: { slides: carouselSlides } },
      section2: {
        headline: section_2_data.headline,
        paragraph: section_2_data.paragraph,
        start: section_2_data.start,
        end: section_2_data.end
      },
      section3: { headline: section_3_data.headline },
      contact: {
        headline: contact_data.headline,
        start: contact_data.start,
        end: contact_data.end
      }
    };
    callback(cleanData);
  };
  let heroData;
  let section1Data, section2Data, section3Data;
  let contactData;
  fetchData($cms_url, async (data) => {
    heroData = await data.hero;
    section1Data = await data.section1;
    section2Data = await data.section2;
    section3Data = await data.section3;
    contactData = await data.contact;
  });
  $$result.css.add(css$e);
  $$unsubscribe_cms_url();
  return `${$$result.head += `${$$result.title = `<title>RENUE</title>`, ""}`, ""}

${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop$1);
      return `
  <h1 class="${"text-secondary text-8xl mt-72"}">Loading...</h1>
`;
    }
    return function(data) {
      return `
  ${data !== void 0 ? `${validate_component(Hero_section$3, "HeroSection").$$render($$result, { contents: data }, {}, {})}` : ``}
`;
    }(__value);
  }(heroData)}

${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop$1);
      return `
  <h1 class="${"text-secondary text-8xl mt-72"}">Loading...</h1>
`;
    }
    return function(data) {
      return `
  ${data !== void 0 ? `${validate_component(Section_1$3, "Section1").$$render($$result, { data }, {}, {})}` : ``}
`;
    }(__value);
  }(section1Data)}

${validate_component(Spacer_line, "SpacerLine").$$render($$result, {}, {}, {})}

${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop$1);
      return `
  <h1 class="${"text-secondary text-8xl mt-72"}">Loading...</h1>
`;
    }
    return function(data) {
      return `
  ${data !== void 0 ? `${validate_component(Section_2$2, "Section2").$$render($$result, { data }, {}, {})}` : ``}
`;
    }(__value);
  }(section2Data)}

${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop$1);
      return `
  <h1 class="${"text-secondary text-8xl mt-72"}">Loading...</h1>
`;
    }
    return function(data) {
      return `
  ${data !== void 0 ? `${validate_component(Section_3$2, "Section3").$$render($$result, { data }, {}, {})}` : ``}
`;
    }(__value);
  }(section3Data)}

${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop$1);
      return `
  <h1 class="${"text-secondary text-8xl mt-72"}">Loading...</h1>
`;
    }
    return function(data) {
      return `
  ${data !== void 0 ? `${validate_component(Contact_section$1, "ContactSection").$$render($$result, { data }, {}, {})}` : ``}
`;
    }(__value);
  }(contactData)}`;
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Routes
});
var css$d = {
  code: '.svelte-1nn82np{overflow:hidden}:root{--image-url:url("https://media.istockphoto.com/photos/stainless-steel-pipes-and-pipelines-in-modern-beer-factory-brewery-picture-id1152495926")}#wrapper.svelte-1nn82np{position:relative;z-index:1;min-height:800px;margin:auto;background-image:var(--image-url);background-repeat:no-repeat;background-size:cover}#gradient.svelte-1nn82np{position:absolute;margin:auto;left:0;top:0;min-height:800px;width:100%;z-index:-10;background:linear-gradient(\n      to bottom right,\n      #0b1d2ee5 10%,\n      rgba(53, 53, 53, 0.541)\n    )}#contents.svelte-1nn82np{position:absolute;z-index:10}',
  map: '{"version":3,"file":"hero-secondary.svelte","sources":["hero-secondary.svelte"],"sourcesContent":["<script>\\n  //LIBS\\n  import { onMount } from \\"svelte\\";\\n\\n  //PROPS\\n  export let headline, paragraph, image_url, start, end;\\n\\n  onMount(async () => {\\n    let root = document.documentElement;\\n    //let style = getComputedStyle(document.body);\\n    await root.style.setProperty(\\"--image-url\\", \\"url(\\" + image_url + \\")\\");\\n    //console.log(\\"XXXX:\\", style.getPropertyValue(\\"--image-url\\"));\\n  });\\n<\/script>\\n\\n<div id=\\"wrapper\\">\\n  <div id=\\"gradient\\">\\n    <div\\n      id=\\"contents\\"\\n      class=\\"flex flex-col text-on-background-variant pt-360 xl:px-148 lg:px-96 md:px-72\\"\\n    >\\n      <div class=\\"flex items-center space-x-24 lg:h-240\\">\\n        <div\\n          id=\\"vertical-line\\"\\n          class=\\"pt-360 w-24 gradient-blue-to-green-light-diagonal\\"\\n        />\\n        <div>\\n          <div>\\n            <h1 class=\\"text-4xl font-bold leading-4xl\\">\\n              {headline}\\n            </h1>\\n          </div>\\n          <div class=\\"lg:w-720 sm:w-520\\">\\n            {#if start != undefined}\\n              <h2 class=\\"text-lg leading-md mt-16\\">\\n                {paragraph.substring(0, start)}\\n                <a\\n                  href=\\"mailto:cnieto@renueenviro.com\\"\\n                  class=\\"text-primary-main font-bold\\"\\n                >\\n                  {paragraph.substring(start, end)}\\n                </a>\\n              </h2>\\n            {:else}\\n              <h2 class=\\"text-lg leading-md mt-16\\">\\n                {paragraph}\\n              </h2>\\n            {/if}\\n          </div>\\n        </div>\\n      </div>\\n    </div>\\n  </div>\\n</div>\\n\\n<style>\\n  * {\\n    overflow: hidden;\\n  }\\n\\n  :root {\\n    --image-url: url(\\"https://media.istockphoto.com/photos/stainless-steel-pipes-and-pipelines-in-modern-beer-factory-brewery-picture-id1152495926\\");\\n  }\\n\\n  #wrapper {\\n    position: relative;\\n    z-index: 1;\\n    min-height: 800px;\\n    margin: auto;\\n    background-image: var(--image-url);\\n    background-repeat: no-repeat;\\n    background-size: cover;\\n  }\\n\\n  #gradient {\\n    position: absolute;\\n    margin: auto;\\n    left: 0;\\n    top: 0;\\n    min-height: 800px;\\n    width: 100%;\\n    z-index: -10;\\n    background: linear-gradient(\\n      to bottom right,\\n      #0b1d2ee5 10%,\\n      rgba(53, 53, 53, 0.541)\\n    );\\n  }\\n\\n  #contents {\\n    position: absolute;\\n    z-index: 10;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAwDE,eAAE,CAAC,AACD,QAAQ,CAAE,MAAM,AAClB,CAAC,AAED,KAAK,AAAC,CAAC,AACL,WAAW,CAAE,mIAAmI,AAClJ,CAAC,AAED,QAAQ,eAAC,CAAC,AACR,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,KAAK,CACjB,MAAM,CAAE,IAAI,CACZ,gBAAgB,CAAE,IAAI,WAAW,CAAC,CAClC,iBAAiB,CAAE,SAAS,CAC5B,eAAe,CAAE,KAAK,AACxB,CAAC,AAED,SAAS,eAAC,CAAC,AACT,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,IAAI,CACZ,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,UAAU,CAAE,KAAK,CACjB,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,GAAG,CACZ,UAAU,CAAE;MACV,EAAE,CAAC,MAAM,CAAC,KAAK,CAAC;MAChB,SAAS,CAAC,GAAG,CAAC;MACd,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,KAAK,CAAC;KACxB,AACH,CAAC,AAED,SAAS,eAAC,CAAC,AACT,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,EAAE,AACb,CAAC"}'
};
var Hero_secondary = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { headline, paragraph, image_url, start, end } = $$props;
  if ($$props.headline === void 0 && $$bindings.headline && headline !== void 0)
    $$bindings.headline(headline);
  if ($$props.paragraph === void 0 && $$bindings.paragraph && paragraph !== void 0)
    $$bindings.paragraph(paragraph);
  if ($$props.image_url === void 0 && $$bindings.image_url && image_url !== void 0)
    $$bindings.image_url(image_url);
  if ($$props.start === void 0 && $$bindings.start && start !== void 0)
    $$bindings.start(start);
  if ($$props.end === void 0 && $$bindings.end && end !== void 0)
    $$bindings.end(end);
  $$result.css.add(css$d);
  return `<div id="${"wrapper"}" class="${"svelte-1nn82np"}"><div id="${"gradient"}" class="${"svelte-1nn82np"}"><div id="${"contents"}" class="${"flex flex-col text-on-background-variant pt-360 xl:px-148 lg:px-96 md:px-72 svelte-1nn82np"}"><div class="${"flex items-center space-x-24 lg:h-240 svelte-1nn82np"}"><div id="${"vertical-line"}" class="${"pt-360 w-24 gradient-blue-to-green-light-diagonal svelte-1nn82np"}"></div>
        <div class="${"svelte-1nn82np"}"><div class="${"svelte-1nn82np"}"><h1 class="${"text-4xl font-bold leading-4xl svelte-1nn82np"}">${escape(headline)}</h1></div>
          <div class="${"lg:w-720 sm:w-520 svelte-1nn82np"}">${start != void 0 ? `<h2 class="${"text-lg leading-md mt-16 svelte-1nn82np"}">${escape(paragraph.substring(0, start))}
                <a href="${"mailto:cnieto@renueenviro.com"}" class="${"text-primary-main font-bold svelte-1nn82np"}">${escape(paragraph.substring(start, end))}</a></h2>` : `<h2 class="${"text-lg leading-md mt-16 svelte-1nn82np"}">${escape(paragraph)}</h2>`}</div></div></div></div></div>
</div>`;
});
var Hero_section$2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { contents } = $$props;
  if ($$props.contents === void 0 && $$bindings.contents && contents !== void 0)
    $$bindings.contents(contents);
  return `${validate_component(Hero_secondary, "HeroSecondary").$$render($$result, {
    headline: contents.headline,
    paragraph: contents.paragraph,
    image_url: contents.image_url
  }, {}, {})}`;
});
var css$c = {
  code: ".svelte-1m1p432{overflow:hidden}",
  map: '{"version":3,"file":"section-1.svelte","sources":["section-1.svelte"],"sourcesContent":["<script>\\n  //CONTAINERS\\n  import SectionContainer from \\"../../containers/section-two-cols.svelte\\";\\n\\n  //PROPS\\n  export let contents;\\n<\/script>\\n\\n<div class=\\"bg-background-light text-secondary-dark \\">\\n  <SectionContainer>\\n    <div class=\\"flex items-center w-full text-lg text-left\\">\\n      <h1>\\n        {contents.paragraph}\\n      </h1>\\n    </div>\\n    <div\\n      class=\\"flex items-center justify-center w-full md:text-2xl md:leading-3xl text-left\\"\\n    >\\n      <div class=\\"w-640\\">\\n        <img src={contents.image_url} alt=\\"\\" />\\n      </div>\\n    </div>\\n  </SectionContainer>\\n</div>\\n\\n<style>\\n  * {\\n    overflow: hidden;\\n  }\\n</style>\\n"],"names":[],"mappings":"AA0BE,eAAE,CAAC,AACD,QAAQ,CAAE,MAAM,AAClB,CAAC"}'
};
var Section_1$2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { contents } = $$props;
  if ($$props.contents === void 0 && $$bindings.contents && contents !== void 0)
    $$bindings.contents(contents);
  $$result.css.add(css$c);
  return `<div class="${"bg-background-light text-secondary-dark  svelte-1m1p432"}">${validate_component(Section_two_cols, "SectionContainer").$$render($$result, {}, {}, {
    default: () => `<div class="${"flex items-center w-full text-lg text-left svelte-1m1p432"}"><h1 class="${"svelte-1m1p432"}">${escape(contents.paragraph)}</h1></div>
    <div class="${"flex items-center justify-center w-full md:text-2xl md:leading-3xl text-left svelte-1m1p432"}"><div class="${"w-640 svelte-1m1p432"}"><img${add_attribute("src", contents.image_url, 0)} alt="${""}" class="${"svelte-1m1p432"}"></div></div>`
  })}
</div>`;
});
var Section_matrix = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"grid grid-cols-4 gap-x-32 w-auto h-auto xl:mx-168 md:mx-72 my-48"}">${slots.default ? slots.default({}) : ``}</div>`;
});
var Presence;
(function(Presence2) {
  Presence2[Presence2["Entering"] = 0] = "Entering";
  Presence2[Presence2["Present"] = 1] = "Present";
  Presence2[Presence2["Exiting"] = 2] = "Exiting";
})(Presence || (Presence = {}));
var VisibilityAction;
(function(VisibilityAction2) {
  VisibilityAction2[VisibilityAction2["Hide"] = 0] = "Hide";
  VisibilityAction2[VisibilityAction2["Show"] = 1] = "Show";
})(VisibilityAction || (VisibilityAction = {}));
var fix = () => {
  try {
    if (!process.env) {
      process.env = {};
    }
    return true;
    ;
  } catch (e) {
  }
  if (!window || window.process && window.process.env) {
    return false;
  }
  if (!window.process) {
    window.process = {};
  }
  window.process.env = {};
  return true;
};
fix();
var defaultTimestep = 1 / 60 * 1e3;
var getCurrentTime = typeof performance !== "undefined" ? function() {
  return performance.now();
} : function() {
  return Date.now();
};
var onNextFrame = typeof window !== "undefined" ? function(callback) {
  return window.requestAnimationFrame(callback);
} : function(callback) {
  return setTimeout(function() {
    return callback(getCurrentTime());
  }, defaultTimestep);
};
function createRenderStep(runNextFrame2) {
  var toRun = [];
  var toRunNextFrame = [];
  var numToRun = 0;
  var isProcessing2 = false;
  var toKeepAlive = new WeakSet();
  var step = {
    schedule: function(callback, keepAlive, immediate) {
      if (keepAlive === void 0) {
        keepAlive = false;
      }
      if (immediate === void 0) {
        immediate = false;
      }
      var addToCurrentFrame = immediate && isProcessing2;
      var buffer = addToCurrentFrame ? toRun : toRunNextFrame;
      if (keepAlive)
        toKeepAlive.add(callback);
      if (buffer.indexOf(callback) === -1) {
        buffer.push(callback);
        if (addToCurrentFrame && isProcessing2)
          numToRun = toRun.length;
      }
      return callback;
    },
    cancel: function(callback) {
      var index2 = toRunNextFrame.indexOf(callback);
      if (index2 !== -1)
        toRunNextFrame.splice(index2, 1);
      toKeepAlive.delete(callback);
    },
    process: function(frameData) {
      var _a;
      isProcessing2 = true;
      _a = [toRunNextFrame, toRun], toRun = _a[0], toRunNextFrame = _a[1];
      toRunNextFrame.length = 0;
      numToRun = toRun.length;
      if (numToRun) {
        for (var i = 0; i < numToRun; i++) {
          var callback = toRun[i];
          callback(frameData);
          if (toKeepAlive.has(callback)) {
            step.schedule(callback);
            runNextFrame2();
          }
        }
      }
      isProcessing2 = false;
    }
  };
  return step;
}
var maxElapsed = 40;
var useDefaultElapsed = true;
var runNextFrame = false;
var isProcessing = false;
var frame = {
  delta: 0,
  timestamp: 0
};
var stepsOrder = ["read", "update", "preRender", "render", "postRender"];
var steps = /* @__PURE__ */ stepsOrder.reduce(function(acc, key) {
  acc[key] = createRenderStep(function() {
    return runNextFrame = true;
  });
  return acc;
}, {});
var sync = /* @__PURE__ */ stepsOrder.reduce(function(acc, key) {
  var step = steps[key];
  acc[key] = function(process2, keepAlive, immediate) {
    if (keepAlive === void 0) {
      keepAlive = false;
    }
    if (immediate === void 0) {
      immediate = false;
    }
    if (!runNextFrame)
      startLoop();
    return step.schedule(process2, keepAlive, immediate);
  };
  return acc;
}, {});
var cancelSync = /* @__PURE__ */ stepsOrder.reduce(function(acc, key) {
  acc[key] = steps[key].cancel;
  return acc;
}, {});
var flushSync = /* @__PURE__ */ stepsOrder.reduce(function(acc, key) {
  acc[key] = function() {
    return steps[key].process(frame);
  };
  return acc;
}, {});
var processStep = function(stepId) {
  return steps[stepId].process(frame);
};
var processFrame = function(timestamp) {
  runNextFrame = false;
  frame.delta = useDefaultElapsed ? defaultTimestep : Math.max(Math.min(timestamp - frame.timestamp, maxElapsed), 1);
  frame.timestamp = timestamp;
  isProcessing = true;
  stepsOrder.forEach(processStep);
  isProcessing = false;
  if (runNextFrame) {
    useDefaultElapsed = false;
    onNextFrame(processFrame);
  }
};
var startLoop = function() {
  runNextFrame = true;
  useDefaultElapsed = true;
  if (!isProcessing)
    onNextFrame(processFrame);
};
var getFrameData = function() {
  return frame;
};
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s2, i = 1, n = arguments.length; i < n; i++) {
      s2 = arguments[i];
      for (var p in s2)
        if (Object.prototype.hasOwnProperty.call(s2, p))
          t[p] = s2[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __rest(s2, e) {
  var t = {};
  for (var p in s2)
    if (Object.prototype.hasOwnProperty.call(s2, p) && e.indexOf(p) < 0)
      t[p] = s2[p];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s2); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i]))
        t[p[i]] = s2[p[i]];
    }
  return t;
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error2) {
    e = { error: error2 };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
}
var invariant = function() {
};
var clamp$1 = function(min, max, v) {
  return Math.min(Math.max(v, min), max);
};
var safeMin = 1e-3;
var minDuration = 0.01;
var maxDuration = 10;
var minDamping = 0.05;
var maxDamping = 1;
function findSpring(_a) {
  var _b = _a.duration, duration = _b === void 0 ? 800 : _b, _c = _a.bounce, bounce = _c === void 0 ? 0.25 : _c, _d = _a.velocity, velocity = _d === void 0 ? 0 : _d, _e = _a.mass, mass = _e === void 0 ? 1 : _e;
  var envelope;
  var derivative;
  var dampingRatio = 1 - bounce;
  dampingRatio = clamp$1(minDamping, maxDamping, dampingRatio);
  duration = clamp$1(minDuration, maxDuration, duration / 1e3);
  if (dampingRatio < 1) {
    envelope = function(undampedFreq2) {
      var exponentialDecay = undampedFreq2 * dampingRatio;
      var delta2 = exponentialDecay * duration;
      var a2 = exponentialDecay - velocity;
      var b2 = calcAngularFreq(undampedFreq2, dampingRatio);
      var c2 = Math.exp(-delta2);
      return safeMin - a2 / b2 * c2;
    };
    derivative = function(undampedFreq2) {
      var exponentialDecay = undampedFreq2 * dampingRatio;
      var delta2 = exponentialDecay * duration;
      var d = delta2 * velocity + velocity;
      var e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq2, 2) * duration;
      var f = Math.exp(-delta2);
      var g = calcAngularFreq(Math.pow(undampedFreq2, 2), dampingRatio);
      var factor = -envelope(undampedFreq2) + safeMin > 0 ? -1 : 1;
      return factor * ((d - e) * f) / g;
    };
  } else {
    envelope = function(undampedFreq2) {
      var a2 = Math.exp(-undampedFreq2 * duration);
      var b2 = (undampedFreq2 - velocity) * duration + 1;
      return -safeMin + a2 * b2;
    };
    derivative = function(undampedFreq2) {
      var a2 = Math.exp(-undampedFreq2 * duration);
      var b2 = (velocity - undampedFreq2) * (duration * duration);
      return a2 * b2;
    };
  }
  var initialGuess = 5 / duration;
  var undampedFreq = approximateRoot(envelope, derivative, initialGuess);
  if (isNaN(undampedFreq)) {
    return {
      stiffness: 100,
      damping: 10
    };
  } else {
    var stiffness = Math.pow(undampedFreq, 2) * mass;
    return {
      stiffness,
      damping: dampingRatio * 2 * Math.sqrt(mass * stiffness)
    };
  }
}
var rootIterations = 12;
function approximateRoot(envelope, derivative, initialGuess) {
  var result = initialGuess;
  for (var i = 1; i < rootIterations; i++) {
    result = result - envelope(result) / derivative(result);
  }
  return result;
}
function calcAngularFreq(undampedFreq, dampingRatio) {
  return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}
var durationKeys = ["duration", "bounce"];
var physicsKeys = ["stiffness", "damping", "mass"];
function isSpringType(options2, keys) {
  return keys.some(function(key) {
    return options2[key] !== void 0;
  });
}
function getSpringOptions(options2) {
  var springOptions = __assign({ velocity: 0, stiffness: 100, damping: 10, mass: 1, isResolvedFromDuration: false }, options2);
  if (!isSpringType(options2, physicsKeys) && isSpringType(options2, durationKeys)) {
    var derived2 = findSpring(options2);
    springOptions = __assign(__assign(__assign({}, springOptions), derived2), { velocity: 0, mass: 1 });
    springOptions.isResolvedFromDuration = true;
  }
  return springOptions;
}
function spring(_a) {
  var _b = _a.from, from = _b === void 0 ? 0 : _b, _c = _a.to, to = _c === void 0 ? 1 : _c, _d = _a.restSpeed, restSpeed = _d === void 0 ? 2 : _d, restDelta = _a.restDelta, options2 = __rest(_a, ["from", "to", "restSpeed", "restDelta"]);
  var state = { done: false, value: from };
  var _e = getSpringOptions(options2), stiffness = _e.stiffness, damping = _e.damping, mass = _e.mass, velocity = _e.velocity, isResolvedFromDuration = _e.isResolvedFromDuration;
  var resolveSpring = zero;
  var resolveVelocity = zero;
  function createSpring() {
    var initialVelocity = velocity ? -(velocity / 1e3) : 0;
    var initialDelta = to - from;
    var dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
    var undampedAngularFreq = Math.sqrt(stiffness / mass) / 1e3;
    restDelta !== null && restDelta !== void 0 ? restDelta : restDelta = Math.abs(to - from) <= 1 ? 0.01 : 0.4;
    if (dampingRatio < 1) {
      var angularFreq_1 = calcAngularFreq(undampedAngularFreq, dampingRatio);
      resolveSpring = function(t) {
        var envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
        return to - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq_1 * Math.sin(angularFreq_1 * t) + initialDelta * Math.cos(angularFreq_1 * t));
      };
      resolveVelocity = function(t) {
        var envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
        return dampingRatio * undampedAngularFreq * envelope * (Math.sin(angularFreq_1 * t) * (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq_1 + initialDelta * Math.cos(angularFreq_1 * t)) - envelope * (Math.cos(angularFreq_1 * t) * (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) - angularFreq_1 * initialDelta * Math.sin(angularFreq_1 * t));
      };
    } else if (dampingRatio === 1) {
      resolveSpring = function(t) {
        return to - Math.exp(-undampedAngularFreq * t) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t);
      };
    } else {
      var dampedAngularFreq_1 = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
      resolveSpring = function(t) {
        var envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
        var freqForT = Math.min(dampedAngularFreq_1 * t, 300);
        return to - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq_1 * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq_1;
      };
    }
  }
  createSpring();
  return {
    next: function(t) {
      var current = resolveSpring(t);
      if (!isResolvedFromDuration) {
        var currentVelocity = resolveVelocity(t) * 1e3;
        var isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
        var isBelowDisplacementThreshold = Math.abs(to - current) <= restDelta;
        state.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
      } else {
        state.done = t >= options2.duration;
      }
      state.value = state.done ? to : current;
      return state;
    },
    flipTarget: function() {
      var _a2;
      velocity = -velocity;
      _a2 = [to, from], from = _a2[0], to = _a2[1];
      createSpring();
    }
  };
}
spring.needsInterpolation = function(a2, b2) {
  return typeof a2 === "string" || typeof b2 === "string";
};
var zero = function(_t) {
  return 0;
};
var progress = function(from, to, value) {
  var toFromDifference = to - from;
  return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
};
var mix = function(from, to, progress2) {
  return -progress2 * from + progress2 * to + from;
};
var clamp = function(min, max) {
  return function(v) {
    return Math.max(Math.min(v, max), min);
  };
};
var sanitize = function(v) {
  return v % 1 ? Number(v.toFixed(5)) : v;
};
var floatRegex = /(-)?([\d]*\.?[\d])+/g;
var colorRegex = /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))/gi;
var singleColorRegex = /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))$/i;
function isString(v) {
  return typeof v === "string";
}
var number = {
  test: function(v) {
    return typeof v === "number";
  },
  parse: parseFloat,
  transform: function(v) {
    return v;
  }
};
var alpha = __assign(__assign({}, number), { transform: clamp(0, 1) });
var scale = __assign(__assign({}, number), { default: 1 });
var createUnitType = function(unit) {
  return {
    test: function(v) {
      return isString(v) && v.endsWith(unit) && v.split(" ").length === 1;
    },
    parse: parseFloat,
    transform: function(v) {
      return "" + v + unit;
    }
  };
};
var degrees = createUnitType("deg");
var percent = createUnitType("%");
var px = createUnitType("px");
var vh = createUnitType("vh");
var vw = createUnitType("vw");
var progressPercentage = __assign(__assign({}, percent), { parse: function(v) {
  return percent.parse(v) / 100;
}, transform: function(v) {
  return percent.transform(v * 100);
} });
var isColorString = function(type, testProp) {
  return function(v) {
    return Boolean(isString(v) && singleColorRegex.test(v) && v.startsWith(type) || testProp && Object.prototype.hasOwnProperty.call(v, testProp));
  };
};
var splitColor = function(aName, bName, cName) {
  return function(v) {
    var _a;
    if (!isString(v))
      return v;
    var _b = v.match(floatRegex), a2 = _b[0], b2 = _b[1], c2 = _b[2], alpha2 = _b[3];
    return _a = {}, _a[aName] = parseFloat(a2), _a[bName] = parseFloat(b2), _a[cName] = parseFloat(c2), _a.alpha = alpha2 !== void 0 ? parseFloat(alpha2) : 1, _a;
  };
};
var hsla = {
  test: isColorString("hsl", "hue"),
  parse: splitColor("hue", "saturation", "lightness"),
  transform: function(_a) {
    var hue = _a.hue, saturation = _a.saturation, lightness = _a.lightness, _b = _a.alpha, alpha$1 = _b === void 0 ? 1 : _b;
    return "hsla(" + Math.round(hue) + ", " + percent.transform(sanitize(saturation)) + ", " + percent.transform(sanitize(lightness)) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
  }
};
var clampRgbUnit = clamp(0, 255);
var rgbUnit = __assign(__assign({}, number), { transform: function(v) {
  return Math.round(clampRgbUnit(v));
} });
var rgba = {
  test: isColorString("rgb", "red"),
  parse: splitColor("red", "green", "blue"),
  transform: function(_a) {
    var red = _a.red, green = _a.green, blue = _a.blue, _b = _a.alpha, alpha$1 = _b === void 0 ? 1 : _b;
    return "rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
  }
};
function parseHex(v) {
  var r = "";
  var g = "";
  var b2 = "";
  var a2 = "";
  if (v.length > 5) {
    r = v.substr(1, 2);
    g = v.substr(3, 2);
    b2 = v.substr(5, 2);
    a2 = v.substr(7, 2);
  } else {
    r = v.substr(1, 1);
    g = v.substr(2, 1);
    b2 = v.substr(3, 1);
    a2 = v.substr(4, 1);
    r += r;
    g += g;
    b2 += b2;
    a2 += a2;
  }
  return {
    red: parseInt(r, 16),
    green: parseInt(g, 16),
    blue: parseInt(b2, 16),
    alpha: a2 ? parseInt(a2, 16) / 255 : 1
  };
}
var hex = {
  test: isColorString("#"),
  parse: parseHex,
  transform: rgba.transform
};
var color = {
  test: function(v) {
    return rgba.test(v) || hex.test(v) || hsla.test(v);
  },
  parse: function(v) {
    if (rgba.test(v)) {
      return rgba.parse(v);
    } else if (hsla.test(v)) {
      return hsla.parse(v);
    } else {
      return hex.parse(v);
    }
  },
  transform: function(v) {
    return isString(v) ? v : v.hasOwnProperty("red") ? rgba.transform(v) : hsla.transform(v);
  }
};
var colorToken = "${c}";
var numberToken = "${n}";
function test(v) {
  var _a, _b, _c, _d;
  return isNaN(v) && isString(v) && ((_b = (_a = v.match(floatRegex)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) + ((_d = (_c = v.match(colorRegex)) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) > 0;
}
function analyse$1(v) {
  var values = [];
  var numColors = 0;
  var colors = v.match(colorRegex);
  if (colors) {
    numColors = colors.length;
    v = v.replace(colorRegex, colorToken);
    values.push.apply(values, colors.map(color.parse));
  }
  var numbers = v.match(floatRegex);
  if (numbers) {
    v = v.replace(floatRegex, numberToken);
    values.push.apply(values, numbers.map(number.parse));
  }
  return { values, numColors, tokenised: v };
}
function parse(v) {
  return analyse$1(v).values;
}
function createTransformer(v) {
  var _a = analyse$1(v), values = _a.values, numColors = _a.numColors, tokenised = _a.tokenised;
  var numValues = values.length;
  return function(v2) {
    var output = tokenised;
    for (var i = 0; i < numValues; i++) {
      output = output.replace(i < numColors ? colorToken : numberToken, i < numColors ? color.transform(v2[i]) : sanitize(v2[i]));
    }
    return output;
  };
}
var convertNumbersToZero = function(v) {
  return typeof v === "number" ? 0 : v;
};
function getAnimatableNone$1(v) {
  var parsed = parse(v);
  var transformer = createTransformer(v);
  return transformer(parsed.map(convertNumbersToZero));
}
var complex = { test, parse, createTransformer, getAnimatableNone: getAnimatableNone$1 };
var maxDefaults = new Set(["brightness", "contrast", "saturate", "opacity"]);
function applyDefaultFilter(v) {
  var _a = v.slice(0, -1).split("("), name = _a[0], value = _a[1];
  if (name === "drop-shadow")
    return v;
  var number2 = (value.match(floatRegex) || [])[0];
  if (!number2)
    return v;
  var unit = value.replace(number2, "");
  var defaultValue = maxDefaults.has(name) ? 1 : 0;
  if (number2 !== value)
    defaultValue *= 100;
  return name + "(" + defaultValue + unit + ")";
}
var functionRegex = /([a-z-]*)\(.*?\)/g;
var filter = __assign(__assign({}, complex), { getAnimatableNone: function(v) {
  var functions = v.match(functionRegex);
  return functions ? functions.map(applyDefaultFilter).join(" ") : v;
} });
var mixLinearColor = function(from, to, v) {
  var fromExpo = from * from;
  var toExpo = to * to;
  return Math.sqrt(Math.max(0, v * (toExpo - fromExpo) + fromExpo));
};
var colorTypes = [hex, rgba, hsla];
var getColorType = function(v) {
  return colorTypes.find(function(type) {
    return type.test(v);
  });
};
var mixColor = function(from, to) {
  var fromColorType = getColorType(from);
  var toColorType = getColorType(to);
  invariant(fromColorType.transform === toColorType.transform);
  var fromColor = fromColorType.parse(from);
  var toColor = toColorType.parse(to);
  var blended = __assign({}, fromColor);
  var mixFunc = fromColorType === hsla ? mix : mixLinearColor;
  return function(v) {
    for (var key in blended) {
      if (key !== "alpha") {
        blended[key] = mixFunc(fromColor[key], toColor[key], v);
      }
    }
    blended.alpha = mix(fromColor.alpha, toColor.alpha, v);
    return fromColorType.transform(blended);
  };
};
var isNum = function(v) {
  return typeof v === "number";
};
var combineFunctions = function(a2, b2) {
  return function(v) {
    return b2(a2(v));
  };
};
var pipe = function() {
  var transformers = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    transformers[_i] = arguments[_i];
  }
  return transformers.reduce(combineFunctions);
};
function getMixer(origin, target) {
  if (isNum(origin)) {
    return function(v) {
      return mix(origin, target, v);
    };
  } else if (color.test(origin)) {
    return mixColor(origin, target);
  } else {
    return mixComplex(origin, target);
  }
}
var mixArray = function(from, to) {
  var output = __spreadArray([], from);
  var numValues = output.length;
  var blendValue = from.map(function(fromThis, i) {
    return getMixer(fromThis, to[i]);
  });
  return function(v) {
    for (var i = 0; i < numValues; i++) {
      output[i] = blendValue[i](v);
    }
    return output;
  };
};
var mixObject = function(origin, target) {
  var output = __assign(__assign({}, origin), target);
  var blendValue = {};
  for (var key in output) {
    if (origin[key] !== void 0 && target[key] !== void 0) {
      blendValue[key] = getMixer(origin[key], target[key]);
    }
  }
  return function(v) {
    for (var key2 in blendValue) {
      output[key2] = blendValue[key2](v);
    }
    return output;
  };
};
function analyse(value) {
  var parsed = complex.parse(value);
  var numValues = parsed.length;
  var numNumbers = 0;
  var numRGB = 0;
  var numHSL = 0;
  for (var i = 0; i < numValues; i++) {
    if (numNumbers || typeof parsed[i] === "number") {
      numNumbers++;
    } else {
      if (parsed[i].hue !== void 0) {
        numHSL++;
      } else {
        numRGB++;
      }
    }
  }
  return { parsed, numNumbers, numRGB, numHSL };
}
var mixComplex = function(origin, target) {
  var template2 = complex.createTransformer(target);
  var originStats = analyse(origin);
  var targetStats = analyse(target);
  return pipe(mixArray(originStats.parsed, targetStats.parsed), template2);
};
var mixNumber = function(from, to) {
  return function(p) {
    return mix(from, to, p);
  };
};
function detectMixerFactory(v) {
  if (typeof v === "number") {
    return mixNumber;
  } else if (typeof v === "string") {
    if (color.test(v)) {
      return mixColor;
    } else {
      return mixComplex;
    }
  } else if (Array.isArray(v)) {
    return mixArray;
  } else if (typeof v === "object") {
    return mixObject;
  }
}
function createMixers(output, ease, customMixer) {
  var mixers = [];
  var mixerFactory = customMixer || detectMixerFactory(output[0]);
  var numMixers = output.length - 1;
  for (var i = 0; i < numMixers; i++) {
    var mixer = mixerFactory(output[i], output[i + 1]);
    if (ease) {
      var easingFunction = Array.isArray(ease) ? ease[i] : ease;
      mixer = pipe(easingFunction, mixer);
    }
    mixers.push(mixer);
  }
  return mixers;
}
function fastInterpolate(_a, _b) {
  var from = _a[0], to = _a[1];
  var mixer = _b[0];
  return function(v) {
    return mixer(progress(from, to, v));
  };
}
function slowInterpolate(input, mixers) {
  var inputLength = input.length;
  var lastInputIndex = inputLength - 1;
  return function(v) {
    var mixerIndex = 0;
    var foundMixerIndex = false;
    if (v <= input[0]) {
      foundMixerIndex = true;
    } else if (v >= input[lastInputIndex]) {
      mixerIndex = lastInputIndex - 1;
      foundMixerIndex = true;
    }
    if (!foundMixerIndex) {
      var i = 1;
      for (; i < inputLength; i++) {
        if (input[i] > v || i === lastInputIndex) {
          break;
        }
      }
      mixerIndex = i - 1;
    }
    var progressInRange = progress(input[mixerIndex], input[mixerIndex + 1], v);
    return mixers[mixerIndex](progressInRange);
  };
}
function interpolate(input, output, _a) {
  var _b = _a === void 0 ? {} : _a, _c = _b.clamp, isClamp = _c === void 0 ? true : _c, ease = _b.ease, mixer = _b.mixer;
  var inputLength = input.length;
  invariant(inputLength === output.length);
  invariant(!ease || !Array.isArray(ease) || ease.length === inputLength - 1);
  if (input[0] > input[inputLength - 1]) {
    input = [].concat(input);
    output = [].concat(output);
    input.reverse();
    output.reverse();
  }
  var mixers = createMixers(output, ease, mixer);
  var interpolator = inputLength === 2 ? fastInterpolate(input, mixers) : slowInterpolate(input, mixers);
  return isClamp ? function(v) {
    return interpolator(clamp$1(input[0], input[inputLength - 1], v));
  } : interpolator;
}
var reverseEasing = function(easing) {
  return function(p) {
    return 1 - easing(1 - p);
  };
};
var mirrorEasing = function(easing) {
  return function(p) {
    return p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;
  };
};
var createExpoIn = function(power) {
  return function(p) {
    return Math.pow(p, power);
  };
};
var createBackIn = function(power) {
  return function(p) {
    return p * p * ((power + 1) * p - power);
  };
};
var createAnticipate = function(power) {
  var backEasing = createBackIn(power);
  return function(p) {
    return (p *= 2) < 1 ? 0.5 * backEasing(p) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
  };
};
var DEFAULT_OVERSHOOT_STRENGTH = 1.525;
var BOUNCE_FIRST_THRESHOLD = 4 / 11;
var BOUNCE_SECOND_THRESHOLD = 8 / 11;
var BOUNCE_THIRD_THRESHOLD = 9 / 10;
var linear = function(p) {
  return p;
};
var easeIn = createExpoIn(2);
var easeOut = reverseEasing(easeIn);
var easeInOut = mirrorEasing(easeIn);
var circIn = function(p) {
  return 1 - Math.sin(Math.acos(p));
};
var circOut = reverseEasing(circIn);
var circInOut = mirrorEasing(circOut);
var backIn = createBackIn(DEFAULT_OVERSHOOT_STRENGTH);
var backOut = reverseEasing(backIn);
var backInOut = mirrorEasing(backIn);
var anticipate = createAnticipate(DEFAULT_OVERSHOOT_STRENGTH);
var ca = 4356 / 361;
var cb = 35442 / 1805;
var cc = 16061 / 1805;
var bounceOut = function(p) {
  if (p === 1 || p === 0)
    return p;
  var p2 = p * p;
  return p < BOUNCE_FIRST_THRESHOLD ? 7.5625 * p2 : p < BOUNCE_SECOND_THRESHOLD ? 9.075 * p2 - 9.9 * p + 3.4 : p < BOUNCE_THIRD_THRESHOLD ? ca * p2 - cb * p + cc : 10.8 * p * p - 20.52 * p + 10.72;
};
var bounceIn = reverseEasing(bounceOut);
var bounceInOut = function(p) {
  return p < 0.5 ? 0.5 * (1 - bounceOut(1 - p * 2)) : 0.5 * bounceOut(p * 2 - 1) + 0.5;
};
function defaultEasing(values, easing) {
  return values.map(function() {
    return easing || easeInOut;
  }).splice(0, values.length - 1);
}
function defaultOffset(values) {
  var numValues = values.length;
  return values.map(function(_value, i) {
    return i !== 0 ? i / (numValues - 1) : 0;
  });
}
function convertOffsetToTimes(offset, duration) {
  return offset.map(function(o) {
    return o * duration;
  });
}
function keyframes$1(_a) {
  var _b = _a.from, from = _b === void 0 ? 0 : _b, _c = _a.to, to = _c === void 0 ? 1 : _c, ease = _a.ease, offset = _a.offset, _d = _a.duration, duration = _d === void 0 ? 300 : _d;
  var state = { done: false, value: from };
  var values = Array.isArray(to) ? to : [from, to];
  var times = convertOffsetToTimes(offset && offset.length === values.length ? offset : defaultOffset(values), duration);
  function createInterpolator() {
    return interpolate(times, values, {
      ease: Array.isArray(ease) ? ease : defaultEasing(values, ease)
    });
  }
  var interpolator = createInterpolator();
  return {
    next: function(t) {
      state.value = interpolator(t);
      state.done = t >= duration;
      return state;
    },
    flipTarget: function() {
      values.reverse();
      interpolator = createInterpolator();
    }
  };
}
function decay(_a) {
  var _b = _a.velocity, velocity = _b === void 0 ? 0 : _b, _c = _a.from, from = _c === void 0 ? 0 : _c, _d = _a.power, power = _d === void 0 ? 0.8 : _d, _e = _a.timeConstant, timeConstant = _e === void 0 ? 350 : _e, _f = _a.restDelta, restDelta = _f === void 0 ? 0.5 : _f, modifyTarget = _a.modifyTarget;
  var state = { done: false, value: from };
  var amplitude = power * velocity;
  var ideal = from + amplitude;
  var target = modifyTarget === void 0 ? ideal : modifyTarget(ideal);
  if (target !== ideal)
    amplitude = target - from;
  return {
    next: function(t) {
      var delta2 = -amplitude * Math.exp(-t / timeConstant);
      state.done = !(delta2 > restDelta || delta2 < -restDelta);
      state.value = state.done ? target : target + delta2;
      return state;
    },
    flipTarget: function() {
    }
  };
}
var types2 = { keyframes: keyframes$1, spring, decay };
function detectAnimationFromOptions(config2) {
  if (Array.isArray(config2.to)) {
    return keyframes$1;
  } else if (types2[config2.type]) {
    return types2[config2.type];
  }
  var keys = new Set(Object.keys(config2));
  if (keys.has("ease") || keys.has("duration") && !keys.has("dampingRatio")) {
    return keyframes$1;
  } else if (keys.has("dampingRatio") || keys.has("stiffness") || keys.has("mass") || keys.has("damping") || keys.has("restSpeed") || keys.has("restDelta")) {
    return spring;
  }
  return keyframes$1;
}
function loopElapsed(elapsed, duration, delay) {
  if (delay === void 0) {
    delay = 0;
  }
  return elapsed - duration - delay;
}
function reverseElapsed(elapsed, duration, delay, isForwardPlayback) {
  if (delay === void 0) {
    delay = 0;
  }
  if (isForwardPlayback === void 0) {
    isForwardPlayback = true;
  }
  return isForwardPlayback ? loopElapsed(duration + -elapsed, duration, delay) : duration - (elapsed - duration) + delay;
}
function hasRepeatDelayElapsed(elapsed, duration, delay, isForwardPlayback) {
  return isForwardPlayback ? elapsed >= duration + delay : elapsed <= -delay;
}
var framesync = function(update2) {
  var passTimestamp = function(_a) {
    var delta2 = _a.delta;
    return update2(delta2);
  };
  return {
    start: function() {
      return sync.update(passTimestamp, true);
    },
    stop: function() {
      return cancelSync.update(passTimestamp);
    }
  };
};
function animate(_a) {
  var _b, _c;
  var from = _a.from, _d = _a.autoplay, autoplay = _d === void 0 ? true : _d, _e = _a.driver, driver = _e === void 0 ? framesync : _e, _f = _a.elapsed, elapsed = _f === void 0 ? 0 : _f, _g = _a.repeat, repeatMax = _g === void 0 ? 0 : _g, _h = _a.repeatType, repeatType = _h === void 0 ? "loop" : _h, _j = _a.repeatDelay, repeatDelay = _j === void 0 ? 0 : _j, onPlay = _a.onPlay, onStop = _a.onStop, onComplete = _a.onComplete, onRepeat = _a.onRepeat, onUpdate = _a.onUpdate, options2 = __rest(_a, ["from", "autoplay", "driver", "elapsed", "repeat", "repeatType", "repeatDelay", "onPlay", "onStop", "onComplete", "onRepeat", "onUpdate"]);
  var to = options2.to;
  var driverControls;
  var repeatCount = 0;
  var computedDuration = options2.duration;
  var latest;
  var isComplete = false;
  var isForwardPlayback = true;
  var interpolateFromNumber;
  var animator = detectAnimationFromOptions(options2);
  if ((_c = (_b = animator).needsInterpolation) === null || _c === void 0 ? void 0 : _c.call(_b, from, to)) {
    interpolateFromNumber = interpolate([0, 100], [from, to], {
      clamp: false
    });
    from = 0;
    to = 100;
  }
  var animation = animator(__assign(__assign({}, options2), { from, to }));
  function repeat() {
    repeatCount++;
    if (repeatType === "reverse") {
      isForwardPlayback = repeatCount % 2 === 0;
      elapsed = reverseElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback);
    } else {
      elapsed = loopElapsed(elapsed, computedDuration, repeatDelay);
      if (repeatType === "mirror")
        animation.flipTarget();
    }
    isComplete = false;
    onRepeat && onRepeat();
  }
  function complete() {
    driverControls.stop();
    onComplete && onComplete();
  }
  function update2(delta2) {
    if (!isForwardPlayback)
      delta2 = -delta2;
    elapsed += delta2;
    if (!isComplete) {
      var state = animation.next(Math.max(0, elapsed));
      latest = state.value;
      if (interpolateFromNumber)
        latest = interpolateFromNumber(latest);
      isComplete = isForwardPlayback ? state.done : elapsed <= 0;
    }
    onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(latest);
    if (isComplete) {
      if (repeatCount === 0)
        computedDuration !== null && computedDuration !== void 0 ? computedDuration : computedDuration = elapsed;
      if (repeatCount < repeatMax) {
        hasRepeatDelayElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback) && repeat();
      } else {
        complete();
      }
    }
  }
  function play() {
    onPlay === null || onPlay === void 0 ? void 0 : onPlay();
    driverControls = driver(update2);
    driverControls.start();
  }
  autoplay && play();
  return {
    stop: function() {
      onStop === null || onStop === void 0 ? void 0 : onStop();
      driverControls.stop();
    }
  };
}
function velocityPerSecond(velocity, frameDuration) {
  return frameDuration ? velocity * (1e3 / frameDuration) : 0;
}
function inertia(_a) {
  var _b = _a.from, from = _b === void 0 ? 0 : _b, _c = _a.velocity, velocity = _c === void 0 ? 0 : _c, min = _a.min, max = _a.max, _d = _a.power, power = _d === void 0 ? 0.8 : _d, _e = _a.timeConstant, timeConstant = _e === void 0 ? 750 : _e, _f = _a.bounceStiffness, bounceStiffness = _f === void 0 ? 500 : _f, _g = _a.bounceDamping, bounceDamping = _g === void 0 ? 10 : _g, _h = _a.restDelta, restDelta = _h === void 0 ? 1 : _h, modifyTarget = _a.modifyTarget, driver = _a.driver, onUpdate = _a.onUpdate, onComplete = _a.onComplete;
  var currentAnimation;
  function isOutOfBounds(v) {
    return min !== void 0 && v < min || max !== void 0 && v > max;
  }
  function boundaryNearest(v) {
    if (min === void 0)
      return max;
    if (max === void 0)
      return min;
    return Math.abs(min - v) < Math.abs(max - v) ? min : max;
  }
  function startAnimation2(options2) {
    currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop();
    currentAnimation = animate(__assign(__assign({}, options2), { driver, onUpdate: function(v) {
      var _a2;
      onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(v);
      (_a2 = options2.onUpdate) === null || _a2 === void 0 ? void 0 : _a2.call(options2, v);
    }, onComplete }));
  }
  function startSpring(options2) {
    startAnimation2(__assign({ type: "spring", stiffness: bounceStiffness, damping: bounceDamping, restDelta }, options2));
  }
  if (isOutOfBounds(from)) {
    startSpring({ from, velocity, to: boundaryNearest(from) });
  } else {
    var target = power * velocity + from;
    if (typeof modifyTarget !== "undefined")
      target = modifyTarget(target);
    var boundary_1 = boundaryNearest(target);
    var heading_1 = boundary_1 === min ? -1 : 1;
    var prev_1;
    var current_1;
    var checkBoundary = function(v) {
      prev_1 = current_1;
      current_1 = v;
      velocity = velocityPerSecond(v - prev_1, getFrameData().delta);
      if (heading_1 === 1 && v > boundary_1 || heading_1 === -1 && v < boundary_1) {
        startSpring({ from: v, to: boundary_1, velocity });
      }
    };
    startAnimation2({
      type: "decay",
      from,
      velocity,
      timeConstant,
      power,
      restDelta,
      modifyTarget,
      onUpdate: isOutOfBounds(target) ? checkBoundary : void 0
    });
  }
  return {
    stop: function() {
      return currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop();
    }
  };
}
var isPoint = function(point) {
  return point.hasOwnProperty("x") && point.hasOwnProperty("y");
};
var isPoint3D = function(point) {
  return isPoint(point) && point.hasOwnProperty("z");
};
var distance1D = function(a2, b2) {
  return Math.abs(a2 - b2);
};
function distance(a2, b2) {
  if (isNum(a2) && isNum(b2)) {
    return distance1D(a2, b2);
  } else if (isPoint(a2) && isPoint(b2)) {
    var xDelta = distance1D(a2.x, b2.x);
    var yDelta = distance1D(a2.y, b2.y);
    var zDelta = isPoint3D(a2) && isPoint3D(b2) ? distance1D(a2.z, b2.z) : 0;
    return Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2) + Math.pow(zDelta, 2));
  }
}
var a = function(a1, a2) {
  return 1 - 3 * a2 + 3 * a1;
};
var b = function(a1, a2) {
  return 3 * a2 - 6 * a1;
};
var c = function(a1) {
  return 3 * a1;
};
var calcBezier = function(t, a1, a2) {
  return ((a(a1, a2) * t + b(a1, a2)) * t + c(a1)) * t;
};
var getSlope = function(t, a1, a2) {
  return 3 * a(a1, a2) * t * t + 2 * b(a1, a2) * t + c(a1);
};
var subdivisionPrecision = 1e-7;
var subdivisionMaxIterations = 10;
function binarySubdivide(aX, aA, aB, mX1, mX2) {
  var currentX;
  var currentT;
  var i = 0;
  do {
    currentT = aA + (aB - aA) / 2;
    currentX = calcBezier(currentT, mX1, mX2) - aX;
    if (currentX > 0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (Math.abs(currentX) > subdivisionPrecision && ++i < subdivisionMaxIterations);
  return currentT;
}
var newtonIterations = 8;
var newtonMinSlope = 1e-3;
function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
  for (var i = 0; i < newtonIterations; ++i) {
    var currentSlope = getSlope(aGuessT, mX1, mX2);
    if (currentSlope === 0) {
      return aGuessT;
    }
    var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
    aGuessT -= currentX / currentSlope;
  }
  return aGuessT;
}
var kSplineTableSize = 11;
var kSampleStepSize = 1 / (kSplineTableSize - 1);
function cubicBezier(mX1, mY1, mX2, mY2) {
  if (mX1 === mY1 && mX2 === mY2)
    return linear;
  var sampleValues = new Float32Array(kSplineTableSize);
  for (var i = 0; i < kSplineTableSize; ++i) {
    sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
  }
  function getTForX(aX) {
    var intervalStart = 0;
    var currentSample = 1;
    var lastSample = kSplineTableSize - 1;
    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }
    --currentSample;
    var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    var guessForT = intervalStart + dist * kSampleStepSize;
    var initialSlope = getSlope(guessForT, mX1, mX2);
    if (initialSlope >= newtonMinSlope) {
      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
    } else if (initialSlope === 0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }
  }
  return function(t) {
    return t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
  };
}
function addUniqueItem(arr, item) {
  arr.indexOf(item) === -1 && arr.push(item);
}
function removeItem(arr, item) {
  var index2 = arr.indexOf(item);
  index2 > -1 && arr.splice(index2, 1);
}
var SubscriptionManager = function() {
  function SubscriptionManager2() {
    this.subscriptions = [];
  }
  SubscriptionManager2.prototype.add = function(handler) {
    var _this = this;
    addUniqueItem(this.subscriptions, handler);
    return function() {
      return removeItem(_this.subscriptions, handler);
    };
  };
  SubscriptionManager2.prototype.notify = function(a2, b2, c2) {
    var numSubscriptions = this.subscriptions.length;
    if (!numSubscriptions)
      return;
    if (numSubscriptions === 1) {
      this.subscriptions[0](a2, b2, c2);
    } else {
      for (var i = 0; i < numSubscriptions; i++) {
        var handler = this.subscriptions[i];
        handler && handler(a2, b2, c2);
      }
    }
  };
  SubscriptionManager2.prototype.getSize = function() {
    return this.subscriptions.length;
  };
  SubscriptionManager2.prototype.clear = function() {
    this.subscriptions.length = 0;
  };
  return SubscriptionManager2;
}();
var isFloat = function(value) {
  return !isNaN(parseFloat(value));
};
var MotionValue = function() {
  function MotionValue2(init2, startStopNotifier) {
    var _this = this;
    this.timeDelta = 0;
    this.lastUpdated = 0;
    this.updateSubscribers = new SubscriptionManager();
    this.velocityUpdateSubscribers = new SubscriptionManager();
    this.renderSubscribers = new SubscriptionManager();
    this.canTrackVelocity = false;
    this.updateAndNotify = function(v, render2) {
      if (render2 === void 0) {
        render2 = true;
      }
      _this.prev = _this.current;
      _this.current = v;
      var _a = getFrameData(), delta2 = _a.delta, timestamp = _a.timestamp;
      if (_this.lastUpdated !== timestamp) {
        _this.timeDelta = delta2;
        _this.lastUpdated = timestamp;
        sync.postRender(_this.scheduleVelocityCheck);
      }
      if (_this.prev !== _this.current) {
        _this.updateSubscribers.notify(_this.current);
      }
      if (_this.velocityUpdateSubscribers.getSize()) {
        _this.velocityUpdateSubscribers.notify(_this.getVelocity());
      }
      if (render2) {
        _this.renderSubscribers.notify(_this.current);
      }
    };
    this.scheduleVelocityCheck = function() {
      return sync.postRender(_this.velocityCheck);
    };
    this.velocityCheck = function(_a) {
      var timestamp = _a.timestamp;
      if (timestamp !== _this.lastUpdated) {
        _this.prev = _this.current;
        _this.velocityUpdateSubscribers.notify(_this.getVelocity());
      }
    };
    this.hasAnimated = false;
    this.prev = this.current = init2;
    this.canTrackVelocity = isFloat(this.current);
    this.onSubscription = () => {
    };
    this.onUnsubscription = () => {
    };
    if (startStopNotifier) {
      this.onSubscription = () => {
        if (this.updateSubscribers.getSize() + this.velocityUpdateSubscribers.getSize() + this.renderSubscribers.getSize() === 0) {
          const unsub = startStopNotifier();
          this.onUnsubscription = () => {
          };
          if (unsub) {
            this.onUnsubscription = () => {
              if (this.updateSubscribers.getSize() + this.velocityUpdateSubscribers.getSize() + this.renderSubscribers.getSize() === 0) {
                unsub();
              }
            };
          }
        }
      };
    }
  }
  MotionValue2.prototype.onChange = function(subscription) {
    this.onSubscription();
    const unsub = this.updateSubscribers.add(subscription);
    return () => {
      unsub();
      this.onUnsubscription();
    };
  };
  MotionValue2.prototype.subscribe = function(subscription) {
    return this.onChange(subscription);
  };
  MotionValue2.prototype.clearListeners = function() {
    this.updateSubscribers.clear();
    this.onUnsubscription();
  };
  MotionValue2.prototype.onRenderRequest = function(subscription) {
    this.onSubscription();
    subscription(this.get());
    const unsub = this.renderSubscribers.add(subscription);
    return () => {
      unsub();
      this.onUnsubscription();
    };
  };
  MotionValue2.prototype.attach = function(passiveEffect) {
    this.passiveEffect = passiveEffect;
  };
  MotionValue2.prototype.set = function(v, render2) {
    if (render2 === void 0) {
      render2 = true;
    }
    if (!render2 || !this.passiveEffect) {
      this.updateAndNotify(v, render2);
    } else {
      this.passiveEffect(v, this.updateAndNotify);
    }
  };
  MotionValue2.prototype.update = function(v) {
    this.set(v(this.get()));
  };
  MotionValue2.prototype.get = function() {
    this.onSubscription();
    const curr = this.current;
    this.onUnsubscription();
    return curr;
  };
  MotionValue2.prototype.getPrevious = function() {
    return this.prev;
  };
  MotionValue2.prototype.getVelocity = function() {
    this.onSubscription();
    const vel = this.canTrackVelocity ? velocityPerSecond(parseFloat(this.current) - parseFloat(this.prev), this.timeDelta) : 0;
    this.onUnsubscription();
    return vel;
  };
  MotionValue2.prototype.start = function(animation) {
    var _this = this;
    this.stop();
    return new Promise(function(resolve2) {
      _this.hasAnimated = true;
      _this.stopAnimation = animation(resolve2);
    }).then(function() {
      return _this.clearAnimation();
    });
  };
  MotionValue2.prototype.stop = function() {
    if (this.stopAnimation)
      this.stopAnimation();
    this.clearAnimation();
  };
  MotionValue2.prototype.isAnimating = function() {
    return !!this.stopAnimation;
  };
  MotionValue2.prototype.clearAnimation = function() {
    this.stopAnimation = null;
  };
  MotionValue2.prototype.destroy = function() {
    this.updateSubscribers.clear();
    this.renderSubscribers.clear();
    this.stop();
    this.onUnsubscription();
  };
  return MotionValue2;
}();
function motionValue(init2, startStopNotifier) {
  return new MotionValue(init2, startStopNotifier);
}
var getDomContext = (name, el) => {
  if (!el || !window) {
    return void 0;
  }
  let par = el;
  while (par = par.parentNode) {
    if (par.motionDomContext && par.motionDomContext.has(name)) {
      return par.motionDomContext.get(name);
    }
  }
  return void 0;
};
var setDomContext = (name, el, value) => {
  if (el && window) {
    if (!el.motionDomContext) {
      el.motionDomContext = new Map();
    }
    el.motionDomContext.set(name, value);
  }
};
var MotionConfigContext = (c2) => getDomContext("MotionConfig", c2) || writable({
  transformPagePoint: function(p) {
    return p;
  },
  isStatic: false
});
var ScaleCorrectionContext = (isCustom) => getDomContext("ScaleCorrection", isCustom) || writable([]);
var ScaleCorrectionParentContext = () => writable([]);
var provideScaleCorrection = (isCustom) => {
  const fromParent = getContext(ScaleCorrectionContext) || ScaleCorrectionContext(isCustom);
  const ctx = ScaleCorrectionContext();
  setContext(ScaleCorrectionContext, ctx);
  setDomContext("ScaleCorrection", isCustom, ctx);
  setContext(ScaleCorrectionParentContext, fromParent);
};
var ScaleCorrectionProvider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { isCustom } = $$props;
  provideScaleCorrection(isCustom);
  if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0)
    $$bindings.isCustom(isCustom);
  return `${slots.default ? slots.default({}) : ``}`;
});
var secondsToMilliseconds = function(seconds) {
  return seconds * 1e3;
};
var easingLookup = {
  linear,
  easeIn,
  easeInOut,
  easeOut,
  circIn,
  circInOut,
  circOut,
  backIn,
  backInOut,
  backOut,
  anticipate,
  bounceIn,
  bounceInOut,
  bounceOut
};
var easingDefinitionToFunction = function(definition) {
  if (Array.isArray(definition)) {
    var _a = __read(definition, 4), x1 = _a[0], y1 = _a[1], x2 = _a[2], y2 = _a[3];
    return cubicBezier(x1, y1, x2, y2);
  } else if (typeof definition === "string") {
    return easingLookup[definition];
  }
  return definition;
};
var isEasingArray = function(ease) {
  return Array.isArray(ease) && typeof ease[0] !== "number";
};
var isAnimatable = function(key, value) {
  if (key === "zIndex")
    return false;
  if (typeof value === "number" || Array.isArray(value))
    return true;
  if (typeof value === "string" && complex.test(value) && !value.startsWith("url(")) {
    return true;
  }
  return false;
};
var isKeyframesTarget = function(v) {
  return Array.isArray(v);
};
var underDampedSpring = function() {
  return {
    type: "spring",
    stiffness: 500,
    damping: 25,
    restDelta: 0.5,
    restSpeed: 10
  };
};
var criticallyDampedSpring = function(to) {
  return {
    type: "spring",
    stiffness: 550,
    damping: to === 0 ? 2 * Math.sqrt(550) : 30,
    restDelta: 0.01,
    restSpeed: 10
  };
};
var linearTween = function() {
  return {
    type: "keyframes",
    ease: "linear",
    duration: 0.3
  };
};
var keyframes = function(values) {
  return {
    type: "keyframes",
    duration: 0.8,
    values
  };
};
var defaultTransitions = {
  x: underDampedSpring,
  y: underDampedSpring,
  z: underDampedSpring,
  rotate: underDampedSpring,
  rotateX: underDampedSpring,
  rotateY: underDampedSpring,
  rotateZ: underDampedSpring,
  scaleX: criticallyDampedSpring,
  scaleY: criticallyDampedSpring,
  scale: criticallyDampedSpring,
  opacity: linearTween,
  backgroundColor: linearTween,
  color: linearTween,
  default: criticallyDampedSpring
};
var getDefaultTransition = function(valueKey, to) {
  var transitionFactory;
  if (isKeyframesTarget(to)) {
    transitionFactory = keyframes;
  } else {
    transitionFactory = defaultTransitions[valueKey] || defaultTransitions.default;
  }
  return __assign({ to }, transitionFactory(to));
};
var int = __assign(__assign({}, number), { transform: Math.round });
var numberValueTypes = {
  borderWidth: px,
  borderTopWidth: px,
  borderRightWidth: px,
  borderBottomWidth: px,
  borderLeftWidth: px,
  borderRadius: px,
  radius: px,
  borderTopLeftRadius: px,
  borderTopRightRadius: px,
  borderBottomRightRadius: px,
  borderBottomLeftRadius: px,
  width: px,
  maxWidth: px,
  height: px,
  maxHeight: px,
  size: px,
  top: px,
  right: px,
  bottom: px,
  left: px,
  padding: px,
  paddingTop: px,
  paddingRight: px,
  paddingBottom: px,
  paddingLeft: px,
  margin: px,
  marginTop: px,
  marginRight: px,
  marginBottom: px,
  marginLeft: px,
  rotate: degrees,
  rotateX: degrees,
  rotateY: degrees,
  rotateZ: degrees,
  scale,
  scaleX: scale,
  scaleY: scale,
  scaleZ: scale,
  skew: degrees,
  skewX: degrees,
  skewY: degrees,
  distance: px,
  translateX: px,
  translateY: px,
  translateZ: px,
  x: px,
  y: px,
  z: px,
  perspective: px,
  transformPerspective: px,
  opacity: alpha,
  originX: progressPercentage,
  originY: progressPercentage,
  originZ: px,
  zIndex: int,
  fillOpacity: alpha,
  strokeOpacity: alpha,
  numOctaves: int
};
var defaultValueTypes = __assign(__assign({}, numberValueTypes), {
  color,
  backgroundColor: color,
  outlineColor: color,
  fill: color,
  stroke: color,
  borderColor: color,
  borderTopColor: color,
  borderRightColor: color,
  borderBottomColor: color,
  borderLeftColor: color,
  filter,
  WebkitFilter: filter
});
var getDefaultValueType = function(key) {
  return defaultValueTypes[key];
};
function getAnimatableNone(key, value) {
  var _a;
  var defaultValueType = getDefaultValueType(key);
  if (defaultValueType !== filter)
    defaultValueType = complex;
  return (_a = defaultValueType.getAnimatableNone) === null || _a === void 0 ? void 0 : _a.call(defaultValueType, value);
}
function isTransitionDefined(_a) {
  _a.when;
  _a.delay;
  _a.delayChildren;
  _a.staggerChildren;
  _a.staggerDirection;
  _a.repeat;
  _a.repeatType;
  _a.repeatDelay;
  _a.from;
  var transition = __rest(_a, ["when", "delay", "delayChildren", "staggerChildren", "staggerDirection", "repeat", "repeatType", "repeatDelay", "from"]);
  return !!Object.keys(transition).length;
}
function convertTransitionToAnimationOptions(_a) {
  var ease = _a.ease, times = _a.times, yoyo = _a.yoyo, flip = _a.flip, loop2 = _a.loop, transition = __rest(_a, ["ease", "times", "yoyo", "flip", "loop"]);
  var options2 = __assign({}, transition);
  if (times)
    options2["offset"] = times;
  if (transition.duration)
    options2["duration"] = secondsToMilliseconds(transition.duration);
  if (transition.repeatDelay)
    options2.repeatDelay = secondsToMilliseconds(transition.repeatDelay);
  if (ease) {
    options2["ease"] = isEasingArray(ease) ? ease.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease);
  }
  if (transition.type === "tween")
    options2.type = "keyframes";
  if (yoyo || loop2 || flip) {
    if (yoyo) {
      options2.repeatType = "reverse";
    } else if (loop2) {
      options2.repeatType = "loop";
    } else if (flip) {
      options2.repeatType = "mirror";
    }
    options2.repeat = loop2 || yoyo || flip || transition.repeat;
  }
  if (transition.type !== "spring")
    options2.type = "keyframes";
  return options2;
}
function getDelayFromTransition(transition, key) {
  var _a;
  var valueTransition = getValueTransition(transition, key) || {};
  return (_a = valueTransition.delay) !== null && _a !== void 0 ? _a : 0;
}
function hydrateKeyframes(options2) {
  if (Array.isArray(options2.to) && options2.to[0] === null) {
    options2.to = __spreadArray([], __read(options2.to));
    options2.to[0] = options2.from;
  }
  return options2;
}
function getPopmotionAnimationOptions(transition, options2, key) {
  var _a;
  if (Array.isArray(options2.to)) {
    (_a = transition.duration) !== null && _a !== void 0 ? _a : transition.duration = 0.8;
  }
  hydrateKeyframes(options2);
  if (!isTransitionDefined(transition)) {
    transition = __assign(__assign({}, transition), getDefaultTransition(key, options2.to));
  }
  return __assign(__assign({}, options2), convertTransitionToAnimationOptions(transition));
}
function getAnimation(key, value, target, transition, onComplete) {
  var _a;
  var valueTransition = getValueTransition(transition, key);
  var origin = (_a = valueTransition.from) !== null && _a !== void 0 ? _a : value.get();
  var isTargetAnimatable = isAnimatable(key, target);
  if (origin === "none" && isTargetAnimatable && typeof target === "string") {
    origin = getAnimatableNone(key, target);
  } else if (isZero(origin) && typeof target === "string") {
    origin = getZeroUnit(target);
  } else if (!Array.isArray(target) && isZero(target) && typeof origin === "string") {
    target = getZeroUnit(origin);
  }
  var isOriginAnimatable = isAnimatable(key, origin);
  function start() {
    var options2 = {
      from: origin,
      to: target,
      velocity: value.getVelocity(),
      onComplete,
      onUpdate: function(v) {
        return value.set(v);
      }
    };
    return valueTransition.type === "inertia" || valueTransition.type === "decay" ? inertia(__assign(__assign({}, options2), valueTransition)) : animate(__assign(__assign({}, getPopmotionAnimationOptions(valueTransition, options2, key)), { onUpdate: function(v) {
      var _a2;
      options2.onUpdate(v);
      (_a2 = valueTransition.onUpdate) === null || _a2 === void 0 ? void 0 : _a2.call(valueTransition, v);
    }, onComplete: function() {
      var _a2;
      options2.onComplete();
      (_a2 = valueTransition.onComplete) === null || _a2 === void 0 ? void 0 : _a2.call(valueTransition);
    } }));
  }
  function set() {
    var _a2;
    value.set(target);
    onComplete();
    (_a2 = valueTransition === null || valueTransition === void 0 ? void 0 : valueTransition.onComplete) === null || _a2 === void 0 ? void 0 : _a2.call(valueTransition);
    return { stop: function() {
    } };
  }
  return !isOriginAnimatable || !isTargetAnimatable || valueTransition.type === false ? set : start;
}
function isZero(value) {
  return value === 0 || typeof value === "string" && parseFloat(value) === 0 && value.indexOf(" ") === -1;
}
function getZeroUnit(potentialUnitType) {
  return typeof potentialUnitType === "number" ? 0 : getAnimatableNone("", potentialUnitType);
}
function getValueTransition(transition, key) {
  return transition[key] || transition["default"] || transition;
}
function startAnimation(key, value, target, transition) {
  if (transition === void 0) {
    transition = {};
  }
  return value.start(function(onComplete) {
    var delayTimer;
    var controls;
    var animation = getAnimation(key, value, target, transition, onComplete);
    var delay = getDelayFromTransition(transition, key);
    var start = function() {
      return controls = animation();
    };
    if (delay) {
      delayTimer = setTimeout(start, secondsToMilliseconds(delay));
    } else {
      start();
    }
    return function() {
      clearTimeout(delayTimer);
      controls === null || controls === void 0 ? void 0 : controls.stop();
    };
  });
}
var isNumericalString = function(v) {
  return /^\-?\d*\.?\d+$/.test(v);
};
var isCustomValue = function(v) {
  return Boolean(v && typeof v === "object" && v.mix && v.toValue);
};
var resolveFinalValueInKeyframes = function(v) {
  return isKeyframesTarget(v) ? v[v.length - 1] || 0 : v;
};
var testValueType = function(v) {
  return function(type) {
    return type.test(v);
  };
};
var auto = {
  test: function(v) {
    return v === "auto";
  },
  parse: function(v) {
    return v;
  }
};
var dimensionValueTypes = [number, px, percent, degrees, vw, vh, auto];
var findDimensionValueType = function(v) {
  return dimensionValueTypes.find(testValueType(v));
};
var valueTypes = __spreadArray(__spreadArray([], __read(dimensionValueTypes)), [color, complex]);
var findValueType = function(v) {
  return valueTypes.find(testValueType(v));
};
function isVariantLabels(v) {
  return Array.isArray(v);
}
function isVariantLabel(v) {
  return typeof v === "string" || isVariantLabels(v);
}
function getCurrent(visualElement2) {
  var current = {};
  visualElement2.forEachValue(function(value, key) {
    return current[key] = value.get();
  });
  return current;
}
function getVelocity$1(visualElement2) {
  var velocity = {};
  visualElement2.forEachValue(function(value, key) {
    return velocity[key] = value.getVelocity();
  });
  return velocity;
}
function resolveVariantFromProps(props, definition, custom, currentValues, currentVelocity) {
  var _a;
  if (currentValues === void 0) {
    currentValues = {};
  }
  if (currentVelocity === void 0) {
    currentVelocity = {};
  }
  if (typeof definition === "string") {
    definition = (_a = props.variants) === null || _a === void 0 ? void 0 : _a[definition];
  }
  return typeof definition === "function" ? definition(custom !== null && custom !== void 0 ? custom : props.custom, currentValues, currentVelocity) : definition;
}
function resolveVariant(visualElement2, definition, custom) {
  var props = visualElement2.getProps();
  return resolveVariantFromProps(props, definition, custom !== null && custom !== void 0 ? custom : props.custom, getCurrent(visualElement2), getVelocity$1(visualElement2));
}
function checkIfControllingVariants(props) {
  var _a;
  return typeof ((_a = props.animate) === null || _a === void 0 ? void 0 : _a.start) === "function" || isVariantLabel(props.initial) || isVariantLabel(props.animate) || isVariantLabel(props.whileHover) || isVariantLabel(props.whileDrag) || isVariantLabel(props.whileTap) || isVariantLabel(props.whileFocus) || isVariantLabel(props.exit);
}
function checkIfVariantNode(props) {
  return Boolean(checkIfControllingVariants(props) || props.variants);
}
function setMotionValue(visualElement2, key, value) {
  if (visualElement2.hasValue(key)) {
    visualElement2.getValue(key).set(value);
  } else {
    visualElement2.addValue(key, motionValue(value));
  }
}
function setTarget(visualElement2, definition) {
  var resolved = resolveVariant(visualElement2, definition);
  var _a = resolved ? visualElement2.makeTargetAnimatable(resolved, false) : {}, _b = _a.transitionEnd, transitionEnd = _b === void 0 ? {} : _b;
  _a.transition;
  var target = __rest(_a, ["transitionEnd", "transition"]);
  target = __assign(__assign({}, target), transitionEnd);
  for (var key in target) {
    var value = resolveFinalValueInKeyframes(target[key]);
    setMotionValue(visualElement2, key, value);
  }
}
function checkTargetForNewValues(visualElement2, target, origin) {
  var _a, _b, _c;
  var _d;
  var newValueKeys = Object.keys(target).filter(function(key2) {
    return !visualElement2.hasValue(key2);
  });
  var numNewValues = newValueKeys.length;
  if (!numNewValues)
    return;
  for (var i = 0; i < numNewValues; i++) {
    var key = newValueKeys[i];
    var targetValue = target[key];
    var value = null;
    if (Array.isArray(targetValue)) {
      value = targetValue[0];
    }
    if (value === null) {
      value = (_b = (_a = origin[key]) !== null && _a !== void 0 ? _a : visualElement2.readValue(key)) !== null && _b !== void 0 ? _b : target[key];
    }
    if (value === void 0 || value === null)
      continue;
    if (typeof value === "string" && isNumericalString(value)) {
      value = parseFloat(value);
    } else if (!findValueType(value) && complex.test(targetValue)) {
      value = getAnimatableNone(key, targetValue);
    }
    visualElement2.addValue(key, motionValue(value));
    (_c = (_d = origin)[key]) !== null && _c !== void 0 ? _c : _d[key] = value;
    visualElement2.setBaseTarget(key, value);
  }
}
function getOriginFromTransition(key, transition) {
  if (!transition)
    return;
  var valueTransition = transition[key] || transition["default"] || transition;
  return valueTransition.from;
}
function getOrigin(target, transition, visualElement2) {
  var _a, _b;
  var origin = {};
  for (var key in target) {
    origin[key] = (_a = getOriginFromTransition(key, transition)) !== null && _a !== void 0 ? _a : (_b = visualElement2.getValue(key)) === null || _b === void 0 ? void 0 : _b.get();
  }
  return origin;
}
function animateVisualElement(visualElement2, definition, options2) {
  if (options2 === void 0) {
    options2 = {};
  }
  visualElement2.notifyAnimationStart();
  var animation;
  if (Array.isArray(definition)) {
    var animations2 = definition.map(function(variant) {
      return animateVariant(visualElement2, variant, options2);
    });
    animation = Promise.all(animations2);
  } else if (typeof definition === "string") {
    animation = animateVariant(visualElement2, definition, options2);
  } else {
    var resolvedDefinition = typeof definition === "function" ? resolveVariant(visualElement2, definition, options2.custom) : definition;
    animation = animateTarget(visualElement2, resolvedDefinition, options2);
  }
  return animation.then(function() {
    return visualElement2.notifyAnimationComplete(definition);
  });
}
function animateVariant(visualElement2, variant, options2) {
  var _a;
  if (options2 === void 0) {
    options2 = {};
  }
  var resolved = resolveVariant(visualElement2, variant, options2.custom);
  var _b = (resolved || {}).transition, transition = _b === void 0 ? visualElement2.getDefaultTransition() || {} : _b;
  if (options2.transitionOverride) {
    transition = options2.transitionOverride;
  }
  var getAnimation2 = resolved ? function() {
    return animateTarget(visualElement2, resolved, options2);
  } : function() {
    return Promise.resolve();
  };
  var getChildAnimations = ((_a = visualElement2.variantChildren) === null || _a === void 0 ? void 0 : _a.size) ? function(forwardDelay) {
    if (forwardDelay === void 0) {
      forwardDelay = 0;
    }
    var _a2 = transition.delayChildren, delayChildren = _a2 === void 0 ? 0 : _a2, staggerChildren = transition.staggerChildren, staggerDirection = transition.staggerDirection;
    return animateChildren(visualElement2, variant, delayChildren + forwardDelay, staggerChildren, staggerDirection, options2);
  } : function() {
    return Promise.resolve();
  };
  var when = transition.when;
  if (when) {
    var _c = __read(when === "beforeChildren" ? [getAnimation2, getChildAnimations] : [getChildAnimations, getAnimation2], 2), first = _c[0], last = _c[1];
    return first().then(last);
  } else {
    return Promise.all([getAnimation2(), getChildAnimations(options2.delay)]);
  }
}
function animateTarget(visualElement2, definition, _a) {
  var _b;
  var _c = _a === void 0 ? {} : _a, _d = _c.delay, delay = _d === void 0 ? 0 : _d, transitionOverride = _c.transitionOverride, type = _c.type;
  var _e = visualElement2.makeTargetAnimatable(definition), _f = _e.transition, transition = _f === void 0 ? visualElement2.getDefaultTransition() : _f, transitionEnd = _e.transitionEnd, target = __rest(_e, ["transition", "transitionEnd"]);
  if (transitionOverride)
    transition = transitionOverride;
  var animations2 = [];
  var animationTypeState = type && ((_b = visualElement2.animationState) === null || _b === void 0 ? void 0 : _b.getState()[type]);
  for (var key in target) {
    var value = visualElement2.getValue(key);
    var valueTarget = target[key];
    if (!value || valueTarget === void 0 || animationTypeState && shouldBlockAnimation(animationTypeState, key)) {
      continue;
    }
    var animation = startAnimation(key, value, valueTarget, __assign({ delay }, transition));
    animations2.push(animation);
  }
  return Promise.all(animations2).then(function() {
    transitionEnd && setTarget(visualElement2, transitionEnd);
  });
}
function animateChildren(visualElement2, variant, delayChildren, staggerChildren, staggerDirection, options2) {
  if (delayChildren === void 0) {
    delayChildren = 0;
  }
  if (staggerChildren === void 0) {
    staggerChildren = 0;
  }
  if (staggerDirection === void 0) {
    staggerDirection = 1;
  }
  var animations2 = [];
  var maxStaggerDuration = (visualElement2.variantChildren.size - 1) * staggerChildren;
  var generateStaggerDuration = staggerDirection === 1 ? function(i) {
    if (i === void 0) {
      i = 0;
    }
    return i * staggerChildren;
  } : function(i) {
    if (i === void 0) {
      i = 0;
    }
    return maxStaggerDuration - i * staggerChildren;
  };
  Array.from(visualElement2.variantChildren).sort(sortByTreeOrder).forEach(function(child, i) {
    animations2.push(animateVariant(child, variant, __assign(__assign({}, options2), { delay: delayChildren + generateStaggerDuration(i) })).then(function() {
      return child.notifyAnimationComplete(variant);
    }));
  });
  return Promise.all(animations2);
}
function sortByTreeOrder(a2, b2) {
  return a2.sortNodePosition(b2);
}
function shouldBlockAnimation(_a, key) {
  var protectedKeys = _a.protectedKeys, needsAnimating = _a.needsAnimating;
  var shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
  needsAnimating[key] = false;
  return shouldBlock;
}
var valueScaleCorrection = {};
function eachAxis(handler) {
  return [handler("x"), handler("y")];
}
function noop(any) {
  return any;
}
function convertBoundingBoxToAxisBox(_a) {
  var top = _a.top, left = _a.left, right = _a.right, bottom = _a.bottom;
  return {
    x: { min: left, max: right },
    y: { min: top, max: bottom }
  };
}
function convertAxisBoxToBoundingBox(_a) {
  var x = _a.x, y = _a.y;
  return {
    top: y.min,
    bottom: y.max,
    left: x.min,
    right: x.max
  };
}
function transformBoundingBox(_a, transformPoint2) {
  var top = _a.top, left = _a.left, bottom = _a.bottom, right = _a.right;
  if (transformPoint2 === void 0) {
    transformPoint2 = noop;
  }
  var topLeft = transformPoint2({ x: left, y: top });
  var bottomRight = transformPoint2({ x: right, y: bottom });
  return {
    top: topLeft.y,
    left: topLeft.x,
    bottom: bottomRight.y,
    right: bottomRight.x
  };
}
function axisBox() {
  return { x: { min: 0, max: 1 }, y: { min: 0, max: 1 } };
}
function copyAxisBox(box) {
  return {
    x: __assign({}, box.x),
    y: __assign({}, box.y)
  };
}
var zeroDelta = {
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
};
function delta() {
  return {
    x: __assign({}, zeroDelta),
    y: __assign({}, zeroDelta)
  };
}
function isDraggable(visualElement2) {
  var _a = visualElement2.getProps(), drag2 = _a.drag, _dragX = _a._dragX;
  return drag2 && !_dragX;
}
function resetAxis(axis, originAxis) {
  axis.min = originAxis.min;
  axis.max = originAxis.max;
}
function resetBox(box, originBox) {
  resetAxis(box.x, originBox.x);
  resetAxis(box.y, originBox.y);
}
function scalePoint(point, scale2, originPoint) {
  var distanceFromOrigin = point - originPoint;
  var scaled = scale2 * distanceFromOrigin;
  return originPoint + scaled;
}
function applyPointDelta(point, translate, scale2, originPoint, boxScale) {
  if (boxScale !== void 0) {
    point = scalePoint(point, boxScale, originPoint);
  }
  return scalePoint(point, scale2, originPoint) + translate;
}
function applyAxisDelta(axis, translate, scale2, originPoint, boxScale) {
  if (translate === void 0) {
    translate = 0;
  }
  if (scale2 === void 0) {
    scale2 = 1;
  }
  axis.min = applyPointDelta(axis.min, translate, scale2, originPoint, boxScale);
  axis.max = applyPointDelta(axis.max, translate, scale2, originPoint, boxScale);
}
function applyBoxDelta(box, _a) {
  var x = _a.x, y = _a.y;
  applyAxisDelta(box.x, x.translate, x.scale, x.originPoint);
  applyAxisDelta(box.y, y.translate, y.scale, y.originPoint);
}
function applyAxisTransforms(final, axis, transforms, _a) {
  var _b = __read(_a, 3), key = _b[0], scaleKey = _b[1], originKey = _b[2];
  final.min = axis.min;
  final.max = axis.max;
  var axisOrigin = transforms[originKey] !== void 0 ? transforms[originKey] : 0.5;
  var originPoint = mix(axis.min, axis.max, axisOrigin);
  applyAxisDelta(final, transforms[key], transforms[scaleKey], originPoint, transforms.scale);
}
var xKeys = ["x", "scaleX", "originX"];
var yKeys = ["y", "scaleY", "originY"];
function applyBoxTransforms(finalBox, box, transforms) {
  applyAxisTransforms(finalBox.x, box.x, transforms, xKeys);
  applyAxisTransforms(finalBox.y, box.y, transforms, yKeys);
}
function removePointDelta(point, translate, scale2, originPoint, boxScale) {
  point -= translate;
  point = scalePoint(point, 1 / scale2, originPoint);
  if (boxScale !== void 0) {
    point = scalePoint(point, 1 / boxScale, originPoint);
  }
  return point;
}
function removeAxisDelta(axis, translate, scale2, origin, boxScale) {
  if (translate === void 0) {
    translate = 0;
  }
  if (scale2 === void 0) {
    scale2 = 1;
  }
  if (origin === void 0) {
    origin = 0.5;
  }
  var originPoint = mix(axis.min, axis.max, origin) - translate;
  axis.min = removePointDelta(axis.min, translate, scale2, originPoint, boxScale);
  axis.max = removePointDelta(axis.max, translate, scale2, originPoint, boxScale);
}
function removeAxisTransforms(axis, transforms, _a) {
  var _b = __read(_a, 3), key = _b[0], scaleKey = _b[1], originKey = _b[2];
  removeAxisDelta(axis, transforms[key], transforms[scaleKey], transforms[originKey], transforms.scale);
}
function removeBoxTransforms(box, transforms) {
  removeAxisTransforms(box.x, transforms, xKeys);
  removeAxisTransforms(box.y, transforms, yKeys);
}
function applyTreeDeltas(box, treeScale, treePath) {
  var treeLength = treePath.length;
  if (!treeLength)
    return;
  treeScale.x = treeScale.y = 1;
  var node;
  var delta2;
  for (var i = 0; i < treeLength; i++) {
    node = treePath[i];
    delta2 = node.getLayoutState().delta;
    treeScale.x *= delta2.x.scale;
    treeScale.y *= delta2.y.scale;
    applyBoxDelta(box, delta2);
    if (isDraggable(node)) {
      applyBoxTransforms(box, box, node.getLatestValues());
    }
  }
}
var clampProgress = function(v) {
  return clamp$1(0, 1, v);
};
function isNear(value, target, maxDistance) {
  if (target === void 0) {
    target = 0;
  }
  if (maxDistance === void 0) {
    maxDistance = 0.01;
  }
  return distance(value, target) < maxDistance;
}
function calcLength(axis) {
  return axis.max - axis.min;
}
function calcOrigin$1(source, target) {
  var origin = 0.5;
  var sourceLength = calcLength(source);
  var targetLength = calcLength(target);
  if (targetLength > sourceLength) {
    origin = progress(target.min, target.max - sourceLength, source.min);
  } else if (sourceLength > targetLength) {
    origin = progress(source.min, source.max - targetLength, target.min);
  }
  return clampProgress(origin);
}
function updateAxisDelta(delta2, source, target, origin) {
  if (origin === void 0) {
    origin = 0.5;
  }
  delta2.origin = origin;
  delta2.originPoint = mix(source.min, source.max, delta2.origin);
  delta2.scale = calcLength(target) / calcLength(source);
  if (isNear(delta2.scale, 1, 1e-4))
    delta2.scale = 1;
  delta2.translate = mix(target.min, target.max, delta2.origin) - delta2.originPoint;
  if (isNear(delta2.translate))
    delta2.translate = 0;
}
function updateBoxDelta(delta2, source, target, origin) {
  updateAxisDelta(delta2.x, source.x, target.x, defaultOrigin(origin.originX));
  updateAxisDelta(delta2.y, source.y, target.y, defaultOrigin(origin.originY));
}
function defaultOrigin(origin) {
  return typeof origin === "number" ? origin : 0.5;
}
function calcRelativeAxis(target, relative, parent) {
  target.min = parent.min + relative.min;
  target.max = target.min + calcLength(relative);
}
function calcRelativeBox(projection, parentProjection) {
  calcRelativeAxis(projection.target.x, projection.relativeTarget.x, parentProjection.target.x);
  calcRelativeAxis(projection.target.y, projection.relativeTarget.y, parentProjection.target.y);
}
var isMotionValue = function(value) {
  return value !== null && typeof value === "object" && value.getVelocity;
};
var createProjectionState = function() {
  return {
    isEnabled: false,
    isTargetLocked: false,
    target: axisBox(),
    targetFinal: axisBox()
  };
};
function createLayoutState() {
  return {
    isHydrated: false,
    layout: axisBox(),
    layoutCorrected: axisBox(),
    treeScale: { x: 1, y: 1 },
    delta: delta(),
    deltaFinal: delta(),
    deltaTransform: ""
  };
}
var zeroLayout = createLayoutState();
function buildLayoutProjectionTransform(_a, treeScale, latestTransform) {
  var x = _a.x, y = _a.y;
  var xTranslate = x.translate / treeScale.x;
  var yTranslate = y.translate / treeScale.y;
  var transform = "translate3d(" + xTranslate + "px, " + yTranslate + "px, 0) ";
  if (latestTransform) {
    var rotate = latestTransform.rotate, rotateX = latestTransform.rotateX, rotateY = latestTransform.rotateY;
    if (rotate)
      transform += "rotate(" + rotate + ") ";
    if (rotateX)
      transform += "rotateX(" + rotateX + ") ";
    if (rotateY)
      transform += "rotateY(" + rotateY + ") ";
  }
  transform += "scale(" + x.scale + ", " + y.scale + ")";
  return !latestTransform && transform === identityProjection ? "" : transform;
}
function buildLayoutProjectionTransformOrigin(_a) {
  var deltaFinal = _a.deltaFinal;
  return deltaFinal.x.origin * 100 + "% " + deltaFinal.y.origin * 100 + "% 0";
}
var identityProjection = buildLayoutProjectionTransform(zeroLayout.delta, zeroLayout.treeScale, { x: 1, y: 1 });
var isAnimationControls = function(v) {
  return typeof v === "object" && typeof v.start === "function";
};
function shallowCompare(next, prev) {
  if (!Array.isArray(prev))
    return false;
  var prevLength = prev.length;
  if (prevLength !== next.length)
    return false;
  for (var i = 0; i < prevLength; i++) {
    if (prev[i] !== next[i])
      return false;
  }
  return true;
}
var AnimationType;
(function(AnimationType2) {
  AnimationType2["Animate"] = "animate";
  AnimationType2["Hover"] = "whileHover";
  AnimationType2["Tap"] = "whileTap";
  AnimationType2["Drag"] = "whileDrag";
  AnimationType2["Focus"] = "whileFocus";
  AnimationType2["Exit"] = "exit";
})(AnimationType || (AnimationType = {}));
var variantPriorityOrder = [
  AnimationType.Animate,
  AnimationType.Hover,
  AnimationType.Tap,
  AnimationType.Drag,
  AnimationType.Focus,
  AnimationType.Exit
];
var reversePriorityOrder = __spreadArray([], __read(variantPriorityOrder)).reverse();
var numAnimationTypes = variantPriorityOrder.length;
function animateList(visualElement2) {
  return function(animations2) {
    return Promise.all(animations2.map(function(_a) {
      var animation = _a.animation, options2 = _a.options;
      return animateVisualElement(visualElement2, animation, options2);
    }));
  };
}
function createAnimationState(visualElement2) {
  var animate2 = animateList(visualElement2);
  var state = createState();
  var allAnimatedKeys = {};
  var isInitialRender = true;
  var buildResolvedTypeValues = function(acc, definition) {
    var resolved = resolveVariant(visualElement2, definition);
    if (resolved) {
      resolved.transition;
      var transitionEnd = resolved.transitionEnd, target = __rest(resolved, ["transition", "transitionEnd"]);
      acc = __assign(__assign(__assign({}, acc), target), transitionEnd);
    }
    return acc;
  };
  function isAnimated(key) {
    return allAnimatedKeys[key] !== void 0;
  }
  function setAnimateFunction(makeAnimator) {
    animate2 = makeAnimator(visualElement2);
  }
  function animateChanges(options2, changedActiveType) {
    var _a;
    var props = visualElement2.getProps();
    var context = visualElement2.getVariantContext(true) || {};
    var animations2 = [];
    var removedKeys = new Set();
    var encounteredKeys = {};
    var removedVariantIndex = Infinity;
    var _loop_1 = function(i2) {
      var type = reversePriorityOrder[i2];
      var typeState = state[type];
      var prop = (_a = props[type]) !== null && _a !== void 0 ? _a : context[type];
      var propIsVariant = isVariantLabel(prop);
      var activeDelta = type === changedActiveType ? typeState.isActive : null;
      if (activeDelta === false)
        removedVariantIndex = i2;
      var isInherited = prop === context[type] && prop !== props[type] && propIsVariant;
      if (isInherited && isInitialRender && visualElement2.manuallyAnimateOnMount) {
        isInherited = false;
      }
      typeState.protectedKeys = __assign({}, encounteredKeys);
      if (!typeState.isActive && activeDelta === null || !prop && !typeState.prevProp || isAnimationControls(prop) || typeof prop === "boolean") {
        return "continue";
      }
      var shouldAnimateType = variantsHaveChanged(typeState.prevProp, prop) || type === changedActiveType && typeState.isActive && !isInherited && propIsVariant || i2 > removedVariantIndex && propIsVariant;
      var definitionList = Array.isArray(prop) ? prop : [prop];
      var resolvedValues = definitionList.reduce(buildResolvedTypeValues, {});
      if (activeDelta === false)
        resolvedValues = {};
      var _b = typeState.prevResolvedValues, prevResolvedValues = _b === void 0 ? {} : _b;
      var allKeys = __assign(__assign({}, prevResolvedValues), resolvedValues);
      var markToAnimate = function(key2) {
        shouldAnimateType = true;
        removedKeys.delete(key2);
        typeState.needsAnimating[key2] = true;
      };
      for (var key in allKeys) {
        var next = resolvedValues[key];
        var prev = prevResolvedValues[key];
        if (encounteredKeys.hasOwnProperty(key))
          continue;
        if (next !== prev) {
          if (isKeyframesTarget(next) && isKeyframesTarget(prev)) {
            if (!shallowCompare(next, prev)) {
              markToAnimate(key);
            } else {
              typeState.protectedKeys[key] = true;
            }
          } else if (next !== void 0) {
            markToAnimate(key);
          } else {
            removedKeys.add(key);
          }
        } else if (next !== void 0 && removedKeys.has(key)) {
          markToAnimate(key);
        } else {
          typeState.protectedKeys[key] = true;
        }
      }
      typeState.prevProp = prop;
      typeState.prevResolvedValues = resolvedValues;
      if (typeState.isActive) {
        encounteredKeys = __assign(__assign({}, encounteredKeys), resolvedValues);
      }
      if (isInitialRender && visualElement2.blockInitialAnimation) {
        shouldAnimateType = false;
      }
      if (shouldAnimateType && !isInherited) {
        animations2.push.apply(animations2, __spreadArray([], __read(definitionList.map(function(animation) {
          return {
            animation,
            options: __assign({ type }, options2)
          };
        }))));
      }
    };
    for (var i = 0; i < numAnimationTypes; i++) {
      _loop_1(i);
    }
    allAnimatedKeys = __assign({}, encounteredKeys);
    if (removedKeys.size) {
      var fallbackAnimation_1 = {};
      removedKeys.forEach(function(key) {
        var fallbackTarget = visualElement2.getBaseTarget(key);
        if (fallbackTarget !== void 0) {
          fallbackAnimation_1[key] = fallbackTarget;
        }
      });
      animations2.push({ animation: fallbackAnimation_1 });
    }
    var shouldAnimate = Boolean(animations2.length);
    if (isInitialRender && props.initial === false && !visualElement2.manuallyAnimateOnMount) {
      shouldAnimate = false;
    }
    isInitialRender = false;
    return shouldAnimate ? animate2(animations2) : Promise.resolve();
  }
  function setActive(type, isActive, options2) {
    var _a;
    if (state[type].isActive === isActive)
      return Promise.resolve();
    (_a = visualElement2.variantChildren) === null || _a === void 0 ? void 0 : _a.forEach(function(child) {
      var _a2;
      return (_a2 = child.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(type, isActive);
    });
    state[type].isActive = isActive;
    return animateChanges(options2, type);
  }
  return {
    isAnimated,
    animateChanges,
    setActive,
    setAnimateFunction,
    getState: function() {
      return state;
    }
  };
}
function variantsHaveChanged(prev, next) {
  if (typeof next === "string") {
    return next !== prev;
  } else if (isVariantLabels(next)) {
    return !shallowCompare(next, prev);
  }
  return false;
}
function createTypeState(isActive) {
  if (isActive === void 0) {
    isActive = false;
  }
  return {
    isActive,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function createState() {
  var _a;
  return _a = {}, _a[AnimationType.Animate] = createTypeState(true), _a[AnimationType.Hover] = createTypeState(), _a[AnimationType.Tap] = createTypeState(), _a[AnimationType.Drag] = createTypeState(), _a[AnimationType.Focus] = createTypeState(), _a[AnimationType.Exit] = createTypeState(), _a;
}
var names = [
  "LayoutMeasure",
  "BeforeLayoutMeasure",
  "LayoutUpdate",
  "ViewportBoxUpdate",
  "Update",
  "Render",
  "AnimationComplete",
  "LayoutAnimationComplete",
  "AnimationStart",
  "SetAxisTarget",
  "Unmount"
];
function createLifecycles() {
  var managers = names.map(function() {
    return new SubscriptionManager();
  });
  var propSubscriptions = {};
  var lifecycles = {
    clearAllListeners: function() {
      return managers.forEach(function(manager) {
        return manager.clear();
      });
    },
    updatePropListeners: function(props) {
      return names.forEach(function(name) {
        var _a;
        (_a = propSubscriptions[name]) === null || _a === void 0 ? void 0 : _a.call(propSubscriptions);
        var on = "on" + name;
        var propListener = props[on];
        if (propListener) {
          propSubscriptions[name] = lifecycles[on](propListener);
        }
      });
    }
  };
  managers.forEach(function(manager, i) {
    lifecycles["on" + names[i]] = function(handler) {
      return manager.add(handler);
    };
    lifecycles["notify" + names[i]] = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return manager.notify.apply(manager, __spreadArray([], __read(args)));
    };
  });
  return lifecycles;
}
function updateMotionValuesFromProps(element, next, prev) {
  var _a;
  for (var key in next) {
    var nextValue = next[key];
    var prevValue = prev[key];
    if (isMotionValue(nextValue)) {
      element.addValue(key, nextValue);
    } else if (isMotionValue(prevValue)) {
      element.addValue(key, motionValue(nextValue));
    } else if (prevValue !== nextValue) {
      if (element.hasValue(key)) {
        var existingValue = element.getValue(key);
        !existingValue.hasAnimated && existingValue.set(nextValue);
      } else {
        element.addValue(key, motionValue((_a = element.getStaticValue(key)) !== null && _a !== void 0 ? _a : nextValue));
      }
    }
  }
  for (var key in prev) {
    if (next[key] === void 0)
      element.removeValue(key);
  }
  return next;
}
function updateLayoutDeltas(_a, _b, treePath, transformOrigin) {
  var delta2 = _a.delta, layout2 = _a.layout, layoutCorrected = _a.layoutCorrected, treeScale = _a.treeScale;
  var target = _b.target;
  resetBox(layoutCorrected, layout2);
  applyTreeDeltas(layoutCorrected, treeScale, treePath);
  updateBoxDelta(delta2, layoutCorrected, target, transformOrigin);
}
var compareByDepth = function(a2, b2) {
  return a2.depth - b2.depth;
};
var FlatTree = function() {
  function FlatTree2() {
    this.children = [];
    this.isDirty = false;
  }
  FlatTree2.prototype.add = function(child) {
    addUniqueItem(this.children, child);
    this.isDirty = true;
  };
  FlatTree2.prototype.remove = function(child) {
    removeItem(this.children, child);
    this.isDirty = true;
  };
  FlatTree2.prototype.forEach = function(callback) {
    this.isDirty && this.children.sort(compareByDepth);
    var numChildren = this.children.length;
    for (var i = 0; i < numChildren; i++) {
      callback(this.children[i]);
    }
  };
  return FlatTree2;
}();
function calcRelativeOffsetAxis(parent, child) {
  return {
    min: child.min - parent.min,
    max: child.max - parent.min
  };
}
function calcRelativeOffset(parent, child) {
  return {
    x: calcRelativeOffsetAxis(parent.x, child.x),
    y: calcRelativeOffsetAxis(parent.y, child.y)
  };
}
function setCurrentViewportBox(visualElement2) {
  var projectionParent = visualElement2.getProjectionParent();
  if (!projectionParent) {
    visualElement2.rebaseProjectionTarget();
    return;
  }
  var relativeOffset = calcRelativeOffset(projectionParent.getLayoutState().layout, visualElement2.getLayoutState().layout);
  eachAxis(function(axis) {
    visualElement2.setProjectionTargetAxis(axis, relativeOffset[axis].min, relativeOffset[axis].max, true);
  });
}
var visualElement = function(_a) {
  var _b = _a.treeType, treeType = _b === void 0 ? "" : _b, build = _a.build, getBaseTarget = _a.getBaseTarget, makeTargetAnimatable = _a.makeTargetAnimatable, measureViewportBox = _a.measureViewportBox, renderInstance = _a.render, readValueFromInstance = _a.readValueFromInstance, resetTransform = _a.resetTransform, restoreTransform = _a.restoreTransform, removeValueFromRenderState = _a.removeValueFromRenderState, sortNodePosition = _a.sortNodePosition, scrapeMotionValuesFromProps2 = _a.scrapeMotionValuesFromProps;
  return function(_a2, options2) {
    var parent = _a2.parent, props = _a2.props, presenceId = _a2.presenceId, blockInitialAnimation = _a2.blockInitialAnimation, visualState = _a2.visualState;
    if (options2 === void 0) {
      options2 = {};
    }
    var latestValues = visualState.latestValues, renderState = visualState.renderState;
    var instance;
    var lifecycles = createLifecycles();
    var projection = createProjectionState();
    var projectionParent;
    var leadProjection = projection;
    var leadLatestValues = latestValues;
    var unsubscribeFromLeadVisualElement;
    var layoutState = createLayoutState();
    var crossfader;
    var hasViewportBoxUpdated = false;
    var values = new Map();
    var valueSubscriptions = new Map();
    var prevMotionValues = {};
    var projectionTargetProgress;
    var baseTarget = __assign({}, latestValues);
    var removeFromVariantTree;
    function render2() {
      if (!instance)
        return;
      if (element.isProjectionReady()) {
        applyBoxTransforms(leadProjection.targetFinal, leadProjection.target, leadLatestValues);
        updateBoxDelta(layoutState.deltaFinal, layoutState.layoutCorrected, leadProjection.targetFinal, latestValues);
      }
      triggerBuild();
      renderInstance(instance, renderState);
    }
    function triggerBuild() {
      var valuesToRender = latestValues;
      if (crossfader && crossfader.isActive()) {
        var crossfadedValues = crossfader.getCrossfadeState(element);
        if (crossfadedValues)
          valuesToRender = crossfadedValues;
      }
      build(element, renderState, valuesToRender, leadProjection, layoutState, options2, props);
    }
    function update2() {
      lifecycles.notifyUpdate(latestValues);
    }
    function updateLayoutProjection() {
      if (!element.isProjectionReady())
        return;
      var delta2 = layoutState.delta, treeScale = layoutState.treeScale;
      var prevTreeScaleX = treeScale.x;
      var prevTreeScaleY = treeScale.y;
      var prevDeltaTransform = layoutState.deltaTransform;
      updateLayoutDeltas(layoutState, leadProjection, element.path, latestValues);
      hasViewportBoxUpdated && element.notifyViewportBoxUpdate(leadProjection.target, delta2);
      hasViewportBoxUpdated = false;
      var deltaTransform = buildLayoutProjectionTransform(delta2, treeScale);
      if (deltaTransform !== prevDeltaTransform || prevTreeScaleX !== treeScale.x || prevTreeScaleY !== treeScale.y) {
        element.scheduleRender();
      }
      layoutState.deltaTransform = deltaTransform;
    }
    function updateTreeLayoutProjection() {
      element.layoutTree.forEach(fireUpdateLayoutProjection);
    }
    function bindToMotionValue(key2, value2) {
      var removeOnChange = value2.onChange(function(latestValue) {
        latestValues[key2] = latestValue;
        props.onUpdate && sync.update(update2, false, true);
      });
      var removeOnRenderRequest = value2.onRenderRequest(element.scheduleRender);
      valueSubscriptions.set(key2, function() {
        removeOnChange();
        removeOnRenderRequest();
      });
    }
    var initialMotionValues = scrapeMotionValuesFromProps2(props);
    for (var key in initialMotionValues) {
      var value = initialMotionValues[key];
      if (latestValues[key] !== void 0 && isMotionValue(value)) {
        value.set(latestValues[key], false);
      }
    }
    var isControllingVariants = checkIfControllingVariants(props);
    var isVariantNode = checkIfVariantNode(props);
    var element = __assign(__assign({
      treeType,
      current: null,
      depth: parent ? parent.depth + 1 : 0,
      parent,
      children: new Set(),
      path: parent ? __spreadArray(__spreadArray([], __read(parent.path)), [parent]) : [],
      layoutTree: parent ? parent.layoutTree : new FlatTree(),
      presenceId,
      projection,
      variantChildren: isVariantNode ? new Set() : void 0,
      isVisible: void 0,
      manuallyAnimateOnMount: Boolean(parent === null || parent === void 0 ? void 0 : parent.isMounted()),
      blockInitialAnimation,
      isMounted: function() {
        return Boolean(instance);
      },
      mount: function(newInstance) {
        instance = element.current = newInstance;
        element.pointTo(element);
        if (isVariantNode && parent && !isControllingVariants) {
          removeFromVariantTree = parent === null || parent === void 0 ? void 0 : parent.addVariantChild(element);
        }
        parent === null || parent === void 0 ? void 0 : parent.children.add(element);
      },
      unmount: function() {
        cancelSync.update(update2);
        cancelSync.render(render2);
        cancelSync.preRender(element.updateLayoutProjection);
        valueSubscriptions.forEach(function(remove) {
          return remove();
        });
        element.stopLayoutAnimation();
        element.layoutTree.remove(element);
        removeFromVariantTree === null || removeFromVariantTree === void 0 ? void 0 : removeFromVariantTree();
        parent === null || parent === void 0 ? void 0 : parent.children.delete(element);
        unsubscribeFromLeadVisualElement === null || unsubscribeFromLeadVisualElement === void 0 ? void 0 : unsubscribeFromLeadVisualElement();
        lifecycles.clearAllListeners();
      },
      addVariantChild: function(child) {
        var _a3;
        var closestVariantNode = element.getClosestVariantNode();
        if (closestVariantNode) {
          (_a3 = closestVariantNode.variantChildren) === null || _a3 === void 0 ? void 0 : _a3.add(child);
          return function() {
            return closestVariantNode.variantChildren.delete(child);
          };
        }
      },
      sortNodePosition: function(other) {
        if (!sortNodePosition || treeType !== other.treeType)
          return 0;
        return sortNodePosition(element.getInstance(), other.getInstance());
      },
      getClosestVariantNode: function() {
        return isVariantNode ? element : parent === null || parent === void 0 ? void 0 : parent.getClosestVariantNode();
      },
      scheduleUpdateLayoutProjection: parent ? parent.scheduleUpdateLayoutProjection : function() {
        return sync.preRender(element.updateTreeLayoutProjection, false, true);
      },
      getLayoutId: function() {
        return props.layoutId;
      },
      getInstance: function() {
        return instance;
      },
      getStaticValue: function(key2) {
        return latestValues[key2];
      },
      setStaticValue: function(key2, value2) {
        return latestValues[key2] = value2;
      },
      getLatestValues: function() {
        return latestValues;
      },
      setVisibility: function(visibility) {
        if (element.isVisible === visibility)
          return;
        element.isVisible = visibility;
        element.scheduleRender();
      },
      makeTargetAnimatable: function(target, canMutate) {
        if (canMutate === void 0) {
          canMutate = true;
        }
        return makeTargetAnimatable(element, target, props, canMutate);
      },
      addValue: function(key2, value2) {
        if (element.hasValue(key2))
          element.removeValue(key2);
        values.set(key2, value2);
        latestValues[key2] = value2.get();
        bindToMotionValue(key2, value2);
      },
      removeValue: function(key2) {
        var _a3;
        values.delete(key2);
        (_a3 = valueSubscriptions.get(key2)) === null || _a3 === void 0 ? void 0 : _a3();
        valueSubscriptions.delete(key2);
        delete latestValues[key2];
        removeValueFromRenderState(key2, renderState);
      },
      hasValue: function(key2) {
        return values.has(key2);
      },
      getValue: function(key2, defaultValue) {
        var value2 = values.get(key2);
        if (value2 === void 0 && defaultValue !== void 0) {
          value2 = motionValue(defaultValue);
          element.addValue(key2, value2);
        }
        return value2;
      },
      forEachValue: function(callback) {
        return values.forEach(callback);
      },
      readValue: function(key2) {
        var _a3;
        return (_a3 = latestValues[key2]) !== null && _a3 !== void 0 ? _a3 : readValueFromInstance(instance, key2, options2);
      },
      setBaseTarget: function(key2, value2) {
        baseTarget[key2] = value2;
      },
      getBaseTarget: function(key2) {
        if (getBaseTarget) {
          var target = getBaseTarget(props, key2);
          if (target !== void 0 && !isMotionValue(target))
            return target;
        }
        return baseTarget[key2];
      }
    }, lifecycles), {
      build: function() {
        triggerBuild();
        return renderState;
      },
      scheduleRender: function() {
        sync.render(render2, false, true);
      },
      syncRender: render2,
      setProps: function(newProps) {
        props = newProps;
        lifecycles.updatePropListeners(newProps);
        prevMotionValues = updateMotionValuesFromProps(element, scrapeMotionValuesFromProps2(props), prevMotionValues);
      },
      getProps: function() {
        return props;
      },
      getVariant: function(name) {
        var _a3;
        return (_a3 = props.variants) === null || _a3 === void 0 ? void 0 : _a3[name];
      },
      getDefaultTransition: function() {
        return props.transition;
      },
      getVariantContext: function(startAtParent) {
        if (startAtParent === void 0) {
          startAtParent = false;
        }
        if (startAtParent)
          return parent === null || parent === void 0 ? void 0 : parent.getVariantContext();
        if (!isControllingVariants) {
          var context_1 = (parent === null || parent === void 0 ? void 0 : parent.getVariantContext()) || {};
          if (props.initial !== void 0) {
            context_1.initial = props.initial;
          }
          return context_1;
        }
        var context = {};
        for (var i = 0; i < numVariantProps; i++) {
          var name_1 = variantProps[i];
          var prop = props[name_1];
          if (isVariantLabel(prop) || prop === false) {
            context[name_1] = prop;
          }
        }
        return context;
      },
      enableLayoutProjection: function() {
        projection.isEnabled = true;
        element.layoutTree.add(element);
      },
      lockProjectionTarget: function() {
        projection.isTargetLocked = true;
      },
      unlockProjectionTarget: function() {
        element.stopLayoutAnimation();
        projection.isTargetLocked = false;
      },
      getLayoutState: function() {
        return layoutState;
      },
      setCrossfader: function(newCrossfader) {
        crossfader = newCrossfader;
      },
      isProjectionReady: function() {
        return projection.isEnabled && projection.isHydrated && layoutState.isHydrated;
      },
      startLayoutAnimation: function(axis, transition, isRelative) {
        if (isRelative === void 0) {
          isRelative = false;
        }
        var progress2 = element.getProjectionAnimationProgress()[axis];
        var _a3 = isRelative ? projection.relativeTarget[axis] : projection.target[axis], min = _a3.min, max = _a3.max;
        var length = max - min;
        progress2.clearListeners();
        progress2.set(min);
        progress2.set(min);
        progress2.onChange(function(v) {
          element.setProjectionTargetAxis(axis, v, v + length, isRelative);
        });
        return element.animateMotionValue(axis, progress2, 0, transition);
      },
      stopLayoutAnimation: function() {
        eachAxis(function(axis) {
          return element.getProjectionAnimationProgress()[axis].stop();
        });
      },
      measureViewportBox: function(withTransform) {
        if (withTransform === void 0) {
          withTransform = true;
        }
        var viewportBox = measureViewportBox(instance, options2);
        if (!withTransform)
          removeBoxTransforms(viewportBox, latestValues);
        return viewportBox;
      },
      getProjectionAnimationProgress: function() {
        projectionTargetProgress || (projectionTargetProgress = {
          x: motionValue(0),
          y: motionValue(0)
        });
        return projectionTargetProgress;
      },
      setProjectionTargetAxis: function(axis, min, max, isRelative) {
        if (isRelative === void 0) {
          isRelative = false;
        }
        var target;
        if (isRelative) {
          if (!projection.relativeTarget) {
            projection.relativeTarget = axisBox();
          }
          target = projection.relativeTarget[axis];
        } else {
          projection.relativeTarget = void 0;
          target = projection.target[axis];
        }
        projection.isHydrated = true;
        target.min = min;
        target.max = max;
        hasViewportBoxUpdated = true;
        lifecycles.notifySetAxisTarget();
      },
      rebaseProjectionTarget: function(force, box) {
        if (box === void 0) {
          box = layoutState.layout;
        }
        var _a3 = element.getProjectionAnimationProgress(), x = _a3.x, y = _a3.y;
        var shouldRebase = !projection.relativeTarget && !projection.isTargetLocked && !x.isAnimating() && !y.isAnimating();
        if (force || shouldRebase) {
          eachAxis(function(axis) {
            var _a4 = box[axis], min = _a4.min, max = _a4.max;
            element.setProjectionTargetAxis(axis, min, max);
          });
        }
      },
      notifyLayoutReady: function(config2) {
        setCurrentViewportBox(element);
        element.notifyLayoutUpdate(layoutState.layout, element.prevViewportBox || layoutState.layout, config2);
      },
      resetTransform: function() {
        return resetTransform(element, instance, props);
      },
      restoreTransform: function() {
        return restoreTransform(instance, renderState);
      },
      updateLayoutProjection,
      updateTreeLayoutProjection: function() {
        element.layoutTree.forEach(fireResolveRelativeTargetBox);
        sync.preRender(updateTreeLayoutProjection, false, true);
      },
      getProjectionParent: function() {
        if (projectionParent === void 0) {
          var foundParent = false;
          for (var i = element.path.length - 1; i >= 0; i--) {
            var ancestor = element.path[i];
            if (ancestor.projection.isEnabled) {
              foundParent = ancestor;
              break;
            }
          }
          projectionParent = foundParent;
        }
        return projectionParent;
      },
      resolveRelativeTargetBox: function() {
        var relativeParent = element.getProjectionParent();
        if (!projection.relativeTarget || !relativeParent)
          return;
        calcRelativeBox(projection, relativeParent.projection);
        if (isDraggable(relativeParent)) {
          var target = projection.target;
          applyBoxTransforms(target, target, relativeParent.getLatestValues());
        }
      },
      shouldResetTransform: function() {
        return Boolean(props._layoutResetTransform);
      },
      pointTo: function(newLead) {
        leadProjection = newLead.projection;
        leadLatestValues = newLead.getLatestValues();
        unsubscribeFromLeadVisualElement === null || unsubscribeFromLeadVisualElement === void 0 ? void 0 : unsubscribeFromLeadVisualElement();
        unsubscribeFromLeadVisualElement = pipe(newLead.onSetAxisTarget(element.scheduleUpdateLayoutProjection), newLead.onLayoutAnimationComplete(function() {
          var _a3;
          if (element.isPresent) {
            element.presence = Presence.Present;
          } else {
            (_a3 = element.layoutSafeToRemove) === null || _a3 === void 0 ? void 0 : _a3.call(element);
          }
        }));
      },
      isPresent: true,
      presence: Presence.Entering
    });
    return element;
  };
};
function fireResolveRelativeTargetBox(child) {
  child.resolveRelativeTargetBox();
}
function fireUpdateLayoutProjection(child) {
  child.updateLayoutProjection();
}
var variantProps = __spreadArray(["initial"], __read(variantPriorityOrder));
var numVariantProps = variantProps.length;
var validMotionProps = new Set([
  "initial",
  "animate",
  "exit",
  "style",
  "variants",
  "transition",
  "transformTemplate",
  "transformValues",
  "custom",
  "inherit",
  "layout",
  "layoutId",
  "onLayoutAnimationComplete",
  "onViewportBoxUpdate",
  "onLayoutMeasure",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "drag",
  "dragControls",
  "dragListener",
  "dragConstraints",
  "dragDirectionLock",
  "_dragX",
  "_dragY",
  "dragElastic",
  "dragMomentum",
  "dragPropagation",
  "dragTransition",
  "whileDrag",
  "onPan",
  "onPanStart",
  "onPanEnd",
  "onPanSessionStart",
  "onTap",
  "onTapStart",
  "onTapCancel",
  "onHoverStart",
  "onHoverEnd",
  "whileFocus",
  "whileTap",
  "whileHover"
]);
function isValidMotionProp(key) {
  return validMotionProps.has(key);
}
var PresenceContext = (c2) => getDomContext("Presence", c2) || writable(null);
var counter = 0;
var incrementId = () => counter++;
function isPresent(context) {
  return context === null ? true : context.isPresent;
}
var usePresence = (isCustom = false) => {
  const context = getContext(PresenceContext) || PresenceContext(isCustom);
  const id = get_store_value(context) === null ? void 0 : incrementId();
  if (get_store_value(context) === null) {
    return readable([true, null]);
  }
  return derived(context, ($v) => !$v.isPresent && $v.onExitComplete ? [false, () => {
    var _a;
    return (_a = $v.onExitComplete) == null ? void 0 : _a.call($v, id);
  }] : [true]);
};
var LayoutGroupContext = (c2) => getDomContext("LayoutGroup", c2) || writable(null);
function isProjecting(visualElement2) {
  var isEnabled = visualElement2.projection.isEnabled;
  return isEnabled || visualElement2.shouldResetTransform();
}
function collectProjectingAncestors(visualElement2, ancestors) {
  if (ancestors === void 0) {
    ancestors = [];
  }
  var parent = visualElement2.parent;
  if (parent)
    collectProjectingAncestors(parent, ancestors);
  if (isProjecting(visualElement2))
    ancestors.push(visualElement2);
  return ancestors;
}
function collectProjectingChildren(visualElement2) {
  var children = [];
  var addChild = function(child) {
    if (isProjecting(child))
      children.push(child);
    child.children.forEach(addChild);
  };
  visualElement2.children.forEach(addChild);
  return children.sort(compareByDepth);
}
function updateLayoutMeasurement(visualElement2) {
  if (visualElement2.shouldResetTransform())
    return;
  var layoutState = visualElement2.getLayoutState();
  visualElement2.notifyBeforeLayoutMeasure(layoutState.layout);
  layoutState.isHydrated = true;
  layoutState.layout = visualElement2.measureViewportBox();
  layoutState.layoutCorrected = copyAxisBox(layoutState.layout);
  visualElement2.notifyLayoutMeasure(layoutState.layout, visualElement2.prevViewportBox || layoutState.layout);
  sync.update(function() {
    return visualElement2.rebaseProjectionTarget();
  });
}
function snapshotViewportBox(visualElement2, nc) {
  if (visualElement2.shouldResetTransform())
    return;
  if (!nc)
    visualElement2.prevViewportBox = visualElement2.measureViewportBox(false);
  visualElement2.rebaseProjectionTarget(false, visualElement2.prevViewportBox);
}
var unresolvedJobs = new Set();
function pushJob(stack, job, pointer) {
  if (!stack[pointer])
    stack[pointer] = [];
  stack[pointer].push(job);
}
function batchLayout(callback) {
  unresolvedJobs.add(callback);
  return function() {
    return unresolvedJobs.delete(callback);
  };
}
function flushLayout() {
  if (!unresolvedJobs.size)
    return;
  var pointer = 0;
  var reads = [[]];
  var writes = [];
  var setRead = function(job) {
    return pushJob(reads, job, pointer);
  };
  var setWrite = function(job) {
    pushJob(writes, job, pointer);
    pointer++;
  };
  unresolvedJobs.forEach(function(callback) {
    callback(setRead, setWrite);
    pointer = 0;
  });
  unresolvedJobs.clear();
  sync.postRender(function() {
    setTimeout(function() {
      return false;
    }, 10);
  });
  var numStacks = writes.length;
  for (var i = 0; i <= numStacks; i++) {
    reads[i] && reads[i].forEach(executeJob);
    writes[i] && writes[i].forEach(executeJob);
  }
}
var executeJob = function(job) {
  return job();
};
var defaultHandler = {
  layoutReady: function(child) {
    return child.notifyLayoutReady();
  }
};
function createBatcher() {
  var queue = new Set();
  return {
    add: function(child) {
      return queue.add(child);
    },
    flush: function(_a) {
      var _b = _a === void 0 ? defaultHandler : _a, layoutReady = _b.layoutReady, parent = _b.parent;
      batchLayout(function(read, write) {
        var order2 = Array.from(queue).sort(compareByDepth);
        var ancestors = parent ? collectProjectingAncestors(parent) : [];
        write(function() {
          var allElements = __spreadArray(__spreadArray([], __read(ancestors)), __read(order2));
          allElements.forEach(function(element) {
            return element.resetTransform();
          });
        });
        read(function() {
          order2.forEach(updateLayoutMeasurement);
        });
        write(function() {
          ancestors.forEach(function(element) {
            return element.restoreTransform();
          });
          order2.forEach(layoutReady);
        });
        read(function() {
          order2.forEach(function(child) {
            if (child.isPresent)
              child.presence = Presence.Present;
          });
        });
        write(function() {
          flushSync.preRender();
          flushSync.render();
        });
        read(function() {
          sync.postRender(function() {
            return order2.forEach(assignProjectionToSnapshot);
          });
          queue.clear();
        });
      });
      flushLayout();
    }
  };
}
function assignProjectionToSnapshot(child) {
  child.prevViewportBox = child.projection.target;
}
var SharedLayoutContext = (custom) => getDomContext("SharedLayout", custom) || writable(createBatcher());
var FramerTreeLayoutContext = () => writable(createBatcher());
function isSharedLayout(context) {
  return !!context.forceUpdate;
}
var LazyContext = (c2) => getDomContext("Lazy", c2) || writable({ strict: false });
var MotionContext = (c2) => getDomContext("Motion", c2) || writable({});
var UseVisualElement = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $presenceContext, $$unsubscribe_presenceContext;
  let $config, $$unsubscribe_config;
  let $lazyContext, $$unsubscribe_lazyContext;
  let $layoutGroupId, $$unsubscribe_layoutGroupId;
  let $mc, $$unsubscribe_mc;
  let { createVisualElement = void 0, props, Component, visualState, isCustom } = $$props;
  const config2 = getContext(MotionConfigContext) || MotionConfigContext(isCustom);
  $$unsubscribe_config = subscribe(config2, (value) => $config = value);
  const presenceContext = getContext(PresenceContext) || PresenceContext(isCustom);
  $$unsubscribe_presenceContext = subscribe(presenceContext, (value) => $presenceContext = value);
  const lazyContext = getContext(LazyContext) || LazyContext(isCustom);
  $$unsubscribe_lazyContext = subscribe(lazyContext, (value) => $lazyContext = value);
  const mc = getContext(MotionContext) || MotionContext(isCustom);
  $$unsubscribe_mc = subscribe(mc, (value) => $mc = value);
  let parent = get_store_value(mc).visualElement;
  const layoutGroupId = getContext(LayoutGroupContext) || LayoutGroupContext(isCustom);
  $$unsubscribe_layoutGroupId = subscribe(layoutGroupId, (value) => $layoutGroupId = value);
  let layoutId = $layoutGroupId && props.layoutId !== void 0 ? $layoutGroupId + "-" + props.layoutId : props.layoutId;
  let visualElementRef = void 0;
  if (!createVisualElement) {
    createVisualElement = $lazyContext.renderer;
  }
  let visualElement2 = visualElementRef;
  onDestroy(() => {
    visualElement2 == null ? void 0 : visualElement2.notifyUnmount();
  });
  if ($$props.createVisualElement === void 0 && $$bindings.createVisualElement && createVisualElement !== void 0)
    $$bindings.createVisualElement(createVisualElement);
  if ($$props.props === void 0 && $$bindings.props && props !== void 0)
    $$bindings.props(props);
  if ($$props.Component === void 0 && $$bindings.Component && Component !== void 0)
    $$bindings.Component(Component);
  if ($$props.visualState === void 0 && $$bindings.visualState && visualState !== void 0)
    $$bindings.visualState(visualState);
  if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0)
    $$bindings.isCustom(isCustom);
  parent = $mc.visualElement;
  layoutId = $layoutGroupId && props.layoutId !== void 0 ? $layoutGroupId + "-" + props.layoutId : props.layoutId;
  {
    if (!visualElementRef && createVisualElement) {
      visualElementRef = createVisualElement(Component, {
        visualState,
        parent,
        props: { ...props, layoutId },
        presenceId: $presenceContext == null ? void 0 : $presenceContext.id,
        blockInitialAnimation: ($presenceContext == null ? void 0 : $presenceContext.initial) === false
      });
    }
  }
  visualElement2 = visualElementRef;
  {
    if (visualElement2) {
      visualElement2.setProps({ ...$config, ...props, layoutId });
      visualElement2.isPresent = isPresent($presenceContext);
      visualElement2.isPresenceRoot = !parent || parent.presenceId !== ($presenceContext == null ? void 0 : $presenceContext.id);
      visualElement2.syncRender();
    }
  }
  $$unsubscribe_presenceContext();
  $$unsubscribe_config();
  $$unsubscribe_lazyContext();
  $$unsubscribe_layoutGroupId();
  $$unsubscribe_mc();
  return `${slots.default ? slots.default({ visualElement: visualElement2 }) : ``}`;
});
var createDefinition = function(propNames) {
  return {
    isEnabled: function(props) {
      return propNames.some(function(name) {
        return !!props[name];
      });
    }
  };
};
var featureDefinitions = {
  measureLayout: createDefinition(["layout", "layoutId", "drag"]),
  animation: createDefinition([
    "animate",
    "exit",
    "variants",
    "whileHover",
    "whileTap",
    "whileFocus",
    "whileDrag"
  ]),
  exit: createDefinition(["exit"]),
  drag: createDefinition(["drag", "dragControls"]),
  focus: createDefinition(["whileFocus"]),
  hover: createDefinition(["whileHover", "onHoverStart", "onHoverEnd"]),
  tap: createDefinition(["whileTap", "onTap", "onTapStart", "onTapCancel"]),
  pan: createDefinition([
    "onPan",
    "onPanStart",
    "onPanSessionStart",
    "onPanEnd"
  ]),
  layoutAnimation: createDefinition(["layout", "layoutId"])
};
function loadFeatures(features) {
  for (var key in features) {
    var Component = features[key];
    if (Component !== null) {
      featureDefinitions[key].Component = Component;
    }
  }
}
var UseFeatures = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const featureNames = Object.keys(featureDefinitions);
  const numFeatures = featureNames.length;
  let { visualElement: visualElement2, props } = $$props;
  let features = [];
  if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0)
    $$bindings.visualElement(visualElement2);
  if ($$props.props === void 0 && $$bindings.props && props !== void 0)
    $$bindings.props(props);
  {
    {
      features = [];
      for (let i = 0; i < numFeatures; i++) {
        const name = featureNames[i];
        const { isEnabled, Component } = featureDefinitions[name];
        if (isEnabled(props) && Component) {
          features.push({
            Component,
            key: name,
            props,
            visualElement: visualElement2
          });
        }
      }
    }
  }
  return `${visualElement2 ? `${slots.default ? slots.default({ features }) : ``}` : ``}`;
});
var MotionContextProvider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { value, isCustom } = $$props;
  let store = writable(value);
  setContext(MotionContext, store);
  setDomContext("Motion", isCustom, store);
  onDestroy(() => {
    var _a;
    (_a = value == null ? void 0 : value.visualElement) == null ? void 0 : _a.unmount();
  });
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0)
    $$bindings.isCustom(isCustom);
  {
    store.set(value);
  }
  return `${slots.default ? slots.default({}) : ``}`;
});
var createHtmlRenderState = function() {
  return {
    style: {},
    transform: {},
    transformKeys: [],
    transformOrigin: {},
    vars: {}
  };
};
var createSvgRenderState = function() {
  return __assign(__assign({}, createHtmlRenderState()), { attrs: {} });
};
var transformAxes = ["", "X", "Y", "Z"];
var order = ["translate", "scale", "rotate", "skew"];
var transformProps = ["transformPerspective", "x", "y", "z"];
order.forEach(function(operationKey) {
  return transformAxes.forEach(function(axesKey) {
    return transformProps.push(operationKey + axesKey);
  });
});
function sortTransformProps(a2, b2) {
  return transformProps.indexOf(a2) - transformProps.indexOf(b2);
}
var transformPropSet = new Set(transformProps);
function isTransformProp(key) {
  return transformPropSet.has(key);
}
var transformOriginProps = new Set(["originX", "originY", "originZ"]);
function isTransformOriginProp(key) {
  return transformOriginProps.has(key);
}
function isForcedMotionValue(key, _a) {
  var layout2 = _a.layout, layoutId = _a.layoutId;
  return isTransformProp(key) || isTransformOriginProp(key) || (layout2 || layoutId !== void 0) && !!valueScaleCorrection[key];
}
var translateAlias = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
};
function buildTransform(_a, _b, transformIsDefault, transformTemplate) {
  var transform = _a.transform, transformKeys2 = _a.transformKeys;
  var _c = _b.enableHardwareAcceleration, enableHardwareAcceleration = _c === void 0 ? true : _c, _d = _b.allowTransformNone, allowTransformNone = _d === void 0 ? true : _d;
  var transformString = "";
  transformKeys2.sort(sortTransformProps);
  var transformHasZ = false;
  var numTransformKeys = transformKeys2.length;
  for (var i = 0; i < numTransformKeys; i++) {
    var key = transformKeys2[i];
    transformString += (translateAlias[key] || key) + "(" + transform[key] + ") ";
    if (key === "z")
      transformHasZ = true;
  }
  if (!transformHasZ && enableHardwareAcceleration) {
    transformString += "translateZ(0)";
  } else {
    transformString = transformString.trim();
  }
  if (transformTemplate) {
    transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
  } else if (allowTransformNone && transformIsDefault) {
    transformString = "none";
  }
  return transformString;
}
function buildTransformOrigin(_a) {
  var _b = _a.originX, originX = _b === void 0 ? "50%" : _b, _c = _a.originY, originY = _c === void 0 ? "50%" : _c, _d = _a.originZ, originZ = _d === void 0 ? 0 : _d;
  return originX + " " + originY + " " + originZ;
}
function isCSSVariable$1(key) {
  return key.startsWith("--");
}
var getValueAsType = function(value, type) {
  return type && typeof value === "number" ? type.transform(value) : value;
};
function buildHTMLStyles(state, latestValues, projection, layoutState, options2, transformTemplate, buildProjectionTransform, buildProjectionTransformOrigin) {
  var _a;
  var style = state.style, vars = state.vars, transform = state.transform, transformKeys2 = state.transformKeys, transformOrigin = state.transformOrigin;
  transformKeys2.length = 0;
  var hasTransform = false;
  var hasTransformOrigin = false;
  var transformIsNone = true;
  for (var key in latestValues) {
    var value = latestValues[key];
    if (isCSSVariable$1(key)) {
      vars[key] = value;
      continue;
    }
    var valueType = numberValueTypes[key];
    var valueAsType = getValueAsType(value, valueType);
    if (isTransformProp(key)) {
      hasTransform = true;
      transform[key] = valueAsType;
      transformKeys2.push(key);
      if (!transformIsNone)
        continue;
      if (value !== ((_a = valueType.default) !== null && _a !== void 0 ? _a : 0))
        transformIsNone = false;
    } else if (isTransformOriginProp(key)) {
      transformOrigin[key] = valueAsType;
      hasTransformOrigin = true;
    } else {
      if (layoutState && projection && layoutState.isHydrated && valueScaleCorrection[key]) {
        var correctedValue = valueScaleCorrection[key].process(value, layoutState, projection);
        var applyTo = valueScaleCorrection[key].applyTo;
        if (applyTo) {
          var num = applyTo.length;
          for (var i = 0; i < num; i++) {
            style[applyTo[i]] = correctedValue;
          }
        } else {
          style[key] = correctedValue;
        }
      } else {
        style[key] = valueAsType;
      }
    }
  }
  if (layoutState && projection && buildProjectionTransform && buildProjectionTransformOrigin) {
    style.transform = buildProjectionTransform(layoutState.deltaFinal, layoutState.treeScale, hasTransform ? transform : void 0);
    if (transformTemplate) {
      style.transform = transformTemplate(transform, style.transform);
    }
    style.transformOrigin = buildProjectionTransformOrigin(layoutState);
  } else {
    if (hasTransform) {
      style.transform = buildTransform(state, options2, transformIsNone, transformTemplate);
    }
    if (hasTransformOrigin) {
      style.transformOrigin = buildTransformOrigin(transformOrigin);
    }
  }
}
var UseInitialMotionValues = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let styles;
  let { visualState, isStatic, props } = $$props;
  const memo = () => {
    let state = createHtmlRenderState();
    buildHTMLStyles(state, visualState, void 0, void 0, { enableHardwareAcceleration: !isStatic }, props.transformTemplate);
    const { vars, style } = state;
    return { ...vars, ...style };
  };
  if ($$props.visualState === void 0 && $$bindings.visualState && visualState !== void 0)
    $$bindings.visualState(visualState);
  if ($$props.isStatic === void 0 && $$bindings.isStatic && isStatic !== void 0)
    $$bindings.isStatic(isStatic);
  if ($$props.props === void 0 && $$bindings.props && props !== void 0)
    $$bindings.props(props);
  styles = memo();
  return `${slots.default ? slots.default({ styles }) : ``}`;
});
function copyRawValuesOnly(target, source, props) {
  for (const key in source) {
    if (!isMotionValue(source[key]) && !isForcedMotionValue(key, props)) {
      target[key] = source[key];
    }
  }
}
var UseStyle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let styleProp;
  let { visualState, props, isStatic } = $$props;
  let style = {};
  const cRVO = copyRawValuesOnly;
  const toStyle = (s1) => {
    Object.assign(style, s1);
    if (props.transformValues) {
      style = props.transformValues(style);
    }
    return style;
  };
  if ($$props.visualState === void 0 && $$bindings.visualState && visualState !== void 0)
    $$bindings.visualState(visualState);
  if ($$props.props === void 0 && $$bindings.props && props !== void 0)
    $$bindings.props(props);
  if ($$props.isStatic === void 0 && $$bindings.isStatic && isStatic !== void 0)
    $$bindings.isStatic(isStatic);
  styleProp = props.style || {};
  {
    cRVO(style, styleProp, props);
  }
  return `${validate_component(UseInitialMotionValues, "UseInitialMotionValues").$$render($$result, { props, visualState, isStatic }, {}, {
    default: ({ styles: s1 }) => `${slots.default ? slots.default({ styles: toStyle(s1) }) : ``}`
  })}`;
});
var UseHTMLProps = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { props, visualState, isStatic } = $$props;
  const getHTMLProps = (style, props2) => {
    let htmlProps = {};
    if (Boolean(props2.drag)) {
      htmlProps.draggable = false;
      style.userSelect = style.WebkitUserSelect = style.WebkitTouchCallout = "none";
      style.touchAction = props2.drag === true ? "none" : `pan-${props2.drag === "x" ? "y" : "x"}`;
    }
    htmlProps.style = style;
    return htmlProps;
  };
  if ($$props.props === void 0 && $$bindings.props && props !== void 0)
    $$bindings.props(props);
  if ($$props.visualState === void 0 && $$bindings.visualState && visualState !== void 0)
    $$bindings.visualState(visualState);
  if ($$props.isStatic === void 0 && $$bindings.isStatic && isStatic !== void 0)
    $$bindings.isStatic(isStatic);
  return `${validate_component(UseStyle, "UseStyle").$$render($$result, { visualState, props, isStatic }, {}, {
    default: ({ styles }) => `${slots.default ? slots.default({ visualProps: getHTMLProps(styles, props) }) : ``}`
  })}`;
});
function calcOrigin(origin, offset, size) {
  return typeof origin === "string" ? origin : px.transform(offset + size * origin);
}
function calcSVGTransformOrigin(dimensions, originX, originY) {
  var pxOriginX = calcOrigin(originX, dimensions.x, dimensions.width);
  var pxOriginY = calcOrigin(originY, dimensions.y, dimensions.height);
  return pxOriginX + " " + pxOriginY;
}
var progressToPixels = function(progress2, length) {
  return px.transform(progress2 * length);
};
var dashKeys = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
};
var camelKeys = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function buildSVGPath(attrs, totalLength, length, spacing, offset, useDashCase) {
  if (spacing === void 0) {
    spacing = 1;
  }
  if (offset === void 0) {
    offset = 0;
  }
  if (useDashCase === void 0) {
    useDashCase = true;
  }
  var keys = useDashCase ? dashKeys : camelKeys;
  attrs[keys.offset] = progressToPixels(-offset, totalLength);
  var pathLength = progressToPixels(length, totalLength);
  var pathSpacing = progressToPixels(spacing, totalLength);
  attrs[keys.array] = pathLength + " " + pathSpacing;
}
function buildSVGAttrs(state, _a, projection, layoutState, options2, transformTemplate, buildProjectionTransform, buildProjectionTransformOrigin) {
  var attrX = _a.attrX, attrY = _a.attrY, originX = _a.originX, originY = _a.originY, pathLength = _a.pathLength, _b = _a.pathSpacing, pathSpacing = _b === void 0 ? 1 : _b, _c = _a.pathOffset, pathOffset = _c === void 0 ? 0 : _c, latest = __rest(_a, ["attrX", "attrY", "originX", "originY", "pathLength", "pathSpacing", "pathOffset"]);
  buildHTMLStyles(state, latest, projection, layoutState, options2, transformTemplate, buildProjectionTransform, buildProjectionTransformOrigin);
  state.attrs = state.style;
  state.style = {};
  var attrs = state.attrs, style = state.style, dimensions = state.dimensions, totalPathLength = state.totalPathLength;
  if (attrs.transform) {
    if (dimensions)
      style.transform = attrs.transform;
    delete attrs.transform;
  }
  if (dimensions && (originX !== void 0 || originY !== void 0 || style.transform)) {
    style.transformOrigin = calcSVGTransformOrigin(dimensions, originX !== void 0 ? originX : 0.5, originY !== void 0 ? originY : 0.5);
  }
  if (attrX !== void 0)
    attrs.x = attrX;
  if (attrY !== void 0)
    attrs.y = attrY;
  if (totalPathLength !== void 0 && pathLength !== void 0) {
    buildSVGPath(attrs, totalPathLength, pathLength, pathSpacing, pathOffset, false);
  }
}
var UseSVGProps = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let visualProps;
  let { visualState, props } = $$props;
  let memo = () => {
    const state = createSvgRenderState();
    buildSVGAttrs(state, visualState, void 0, void 0, { enableHardwareAcceleration: false }, props.transformTemplate);
    return {
      ...state.attrs,
      style: { ...state.style }
    };
  };
  if ($$props.visualState === void 0 && $$bindings.visualState && visualState !== void 0)
    $$bindings.visualState(visualState);
  if ($$props.props === void 0 && $$bindings.props && props !== void 0)
    $$bindings.props(props);
  visualProps = memo();
  {
    if (props.style) {
      const rawStyles = {};
      copyRawValuesOnly(rawStyles, props.style, props);
      visualProps.style = { ...rawStyles, ...visualProps.style };
    }
  }
  return `${slots.default ? slots.default({ visualProps }) : ``}`;
});
var shouldForward = function(key) {
  return !isValidMotionProp(key);
};
try {
  emotionIsPropValid_1 = require("@emotion/is-prop-valid").default;
  shouldForward = function(key) {
    if (key.startsWith("on")) {
      return !isValidMotionProp(key);
    } else {
      return emotionIsPropValid_1(key);
    }
  };
} catch (_a) {
}
var emotionIsPropValid_1;
function filterProps(props, isDom, forwardMotionProps) {
  var filteredProps = {};
  for (var key in props) {
    if (shouldForward(key) || forwardMotionProps === true && isValidMotionProp(key) || !isDom && !isValidMotionProp(key)) {
      filteredProps[key] = props[key];
    }
  }
  return filteredProps;
}
var UseRender = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filteredProps;
  let { props, visualState, Component, forwardMotionProps = false, isStatic, ref, targetEl = void 0 } = $$props;
  const motion2 = (node) => {
    ref(node);
  };
  if ($$props.props === void 0 && $$bindings.props && props !== void 0)
    $$bindings.props(props);
  if ($$props.visualState === void 0 && $$bindings.visualState && visualState !== void 0)
    $$bindings.visualState(visualState);
  if ($$props.Component === void 0 && $$bindings.Component && Component !== void 0)
    $$bindings.Component(Component);
  if ($$props.forwardMotionProps === void 0 && $$bindings.forwardMotionProps && forwardMotionProps !== void 0)
    $$bindings.forwardMotionProps(forwardMotionProps);
  if ($$props.isStatic === void 0 && $$bindings.isStatic && isStatic !== void 0)
    $$bindings.isStatic(isStatic);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  if ($$props.targetEl === void 0 && $$bindings.targetEl && targetEl !== void 0)
    $$bindings.targetEl(targetEl);
  filteredProps = filterProps(props, typeof Component === "string", forwardMotionProps);
  {
    if (targetEl) {
      motion2(targetEl);
    }
  }
  return `${validate_component((Component === "SVG" ? UseSVGProps : UseHTMLProps) || missing_component, "svelte:component").$$render($$result, { visualState, isStatic, props }, {}, {
    default: ({ visualProps }) => `${slots.default ? slots.default({
      motion: motion2,
      props: { ...filteredProps, ...visualProps }
    }) : ``}`
  })}`;
});
function getBoundingBox(element, transformPagePoint) {
  var box = element.getBoundingClientRect();
  return convertBoundingBoxToAxisBox(transformBoundingBox(box, transformPagePoint));
}
function isCSSVariable(value) {
  return typeof value === "string" && value.startsWith("var(--");
}
var cssVariableRegex = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
function parseCSSVariable(current) {
  var match = cssVariableRegex.exec(current);
  if (!match)
    return [,];
  var _a = __read(match, 3), token = _a[1], fallback = _a[2];
  return [token, fallback];
}
function getVariableValue(current, element, depth) {
  var _a = __read(parseCSSVariable(current), 2), token = _a[0], fallback = _a[1];
  if (!token)
    return;
  var resolved = window.getComputedStyle(element).getPropertyValue(token);
  if (resolved) {
    return resolved.trim();
  } else if (isCSSVariable(fallback)) {
    return getVariableValue(fallback, element);
  } else {
    return fallback;
  }
}
function resolveCSSVariables(visualElement2, _a, transitionEnd) {
  var _b;
  var target = __rest(_a, []);
  var element = visualElement2.getInstance();
  if (!(element instanceof HTMLElement))
    return { target, transitionEnd };
  if (transitionEnd) {
    transitionEnd = __assign({}, transitionEnd);
  }
  visualElement2.forEachValue(function(value) {
    var current2 = value.get();
    if (!isCSSVariable(current2))
      return;
    var resolved2 = getVariableValue(current2, element);
    if (resolved2)
      value.set(resolved2);
  });
  for (var key in target) {
    var current = target[key];
    if (!isCSSVariable(current))
      continue;
    var resolved = getVariableValue(current, element);
    if (!resolved)
      continue;
    target[key] = resolved;
    if (transitionEnd)
      (_b = transitionEnd[key]) !== null && _b !== void 0 ? _b : transitionEnd[key] = current;
  }
  return { target, transitionEnd };
}
var positionalKeys = new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  "x",
  "y"
]);
var isPositionalKey = function(key) {
  return positionalKeys.has(key);
};
var hasPositionalKey = function(target) {
  return Object.keys(target).some(isPositionalKey);
};
var setAndResetVelocity = function(value, to) {
  value.set(to, false);
  value.set(to);
};
var isNumOrPxType = function(v) {
  return v === number || v === px;
};
var BoundingBoxDimension;
(function(BoundingBoxDimension2) {
  BoundingBoxDimension2["width"] = "width";
  BoundingBoxDimension2["height"] = "height";
  BoundingBoxDimension2["left"] = "left";
  BoundingBoxDimension2["right"] = "right";
  BoundingBoxDimension2["top"] = "top";
  BoundingBoxDimension2["bottom"] = "bottom";
})(BoundingBoxDimension || (BoundingBoxDimension = {}));
var getPosFromMatrix = function(matrix, pos) {
  return parseFloat(matrix.split(", ")[pos]);
};
var getTranslateFromMatrix = function(pos2, pos3) {
  return function(_bbox, _a) {
    var transform = _a.transform;
    if (transform === "none" || !transform)
      return 0;
    var matrix3d = transform.match(/^matrix3d\((.+)\)$/);
    if (matrix3d) {
      return getPosFromMatrix(matrix3d[1], pos3);
    } else {
      var matrix = transform.match(/^matrix\((.+)\)$/);
      if (matrix) {
        return getPosFromMatrix(matrix[1], pos2);
      } else {
        return 0;
      }
    }
  };
};
var transformKeys = new Set(["x", "y", "z"]);
var nonTranslationalTransformKeys = transformProps.filter(function(key) {
  return !transformKeys.has(key);
});
function removeNonTranslationalTransform(visualElement2) {
  var removedTransforms = [];
  nonTranslationalTransformKeys.forEach(function(key) {
    var value = visualElement2.getValue(key);
    if (value !== void 0) {
      removedTransforms.push([key, value.get()]);
      value.set(key.startsWith("scale") ? 1 : 0);
    }
  });
  if (removedTransforms.length)
    visualElement2.syncRender();
  return removedTransforms;
}
var positionalValues = {
  width: function(_a) {
    var x = _a.x;
    return x.max - x.min;
  },
  height: function(_a) {
    var y = _a.y;
    return y.max - y.min;
  },
  top: function(_bbox, _a) {
    var top = _a.top;
    return parseFloat(top);
  },
  left: function(_bbox, _a) {
    var left = _a.left;
    return parseFloat(left);
  },
  bottom: function(_a, _b) {
    var y = _a.y;
    var top = _b.top;
    return parseFloat(top) + (y.max - y.min);
  },
  right: function(_a, _b) {
    var x = _a.x;
    var left = _b.left;
    return parseFloat(left) + (x.max - x.min);
  },
  x: getTranslateFromMatrix(4, 13),
  y: getTranslateFromMatrix(5, 14)
};
var convertChangedValueTypes = function(target, visualElement2, changedKeys) {
  var originBbox = visualElement2.measureViewportBox();
  var element = visualElement2.getInstance();
  var elementComputedStyle = getComputedStyle(element);
  var display = elementComputedStyle.display, top = elementComputedStyle.top, left = elementComputedStyle.left, bottom = elementComputedStyle.bottom, right = elementComputedStyle.right, transform = elementComputedStyle.transform;
  var originComputedStyle = { top, left, bottom, right, transform };
  if (display === "none") {
    visualElement2.setStaticValue("display", target.display || "block");
  }
  visualElement2.syncRender();
  var targetBbox = visualElement2.measureViewportBox();
  changedKeys.forEach(function(key) {
    var value = visualElement2.getValue(key);
    setAndResetVelocity(value, positionalValues[key](originBbox, originComputedStyle));
    target[key] = positionalValues[key](targetBbox, elementComputedStyle);
  });
  return target;
};
var checkAndConvertChangedValueTypes = function(visualElement2, target, origin, transitionEnd) {
  if (origin === void 0) {
    origin = {};
  }
  if (transitionEnd === void 0) {
    transitionEnd = {};
  }
  target = __assign({}, target);
  transitionEnd = __assign({}, transitionEnd);
  var targetPositionalKeys = Object.keys(target).filter(isPositionalKey);
  var removedTransformValues = [];
  var hasAttemptedToRemoveTransformValues = false;
  var changedValueTypeKeys = [];
  targetPositionalKeys.forEach(function(key) {
    var value = visualElement2.getValue(key);
    if (!visualElement2.hasValue(key))
      return;
    var from = origin[key];
    var to = target[key];
    var fromType = findDimensionValueType(from);
    var toType;
    if (isKeyframesTarget(to)) {
      var numKeyframes = to.length;
      for (var i = to[0] === null ? 1 : 0; i < numKeyframes; i++) {
        if (!toType) {
          toType = findDimensionValueType(to[i]);
        }
      }
    } else {
      toType = findDimensionValueType(to);
    }
    if (fromType !== toType) {
      if (isNumOrPxType(fromType) && isNumOrPxType(toType)) {
        var current = value.get();
        if (typeof current === "string") {
          value.set(parseFloat(current));
        }
        if (typeof to === "string") {
          target[key] = parseFloat(to);
        } else if (Array.isArray(to) && toType === px) {
          target[key] = to.map(parseFloat);
        }
      } else if ((fromType === null || fromType === void 0 ? void 0 : fromType.transform) && (toType === null || toType === void 0 ? void 0 : toType.transform) && (from === 0 || to === 0)) {
        if (from === 0) {
          value.set(toType.transform(from));
        } else {
          target[key] = fromType.transform(to);
        }
      } else {
        if (!hasAttemptedToRemoveTransformValues) {
          removedTransformValues = removeNonTranslationalTransform(visualElement2);
          hasAttemptedToRemoveTransformValues = true;
        }
        changedValueTypeKeys.push(key);
        transitionEnd[key] = transitionEnd[key] !== void 0 ? transitionEnd[key] : target[key];
        setAndResetVelocity(value, to);
      }
    }
  });
  if (changedValueTypeKeys.length) {
    var convertedTarget = convertChangedValueTypes(target, visualElement2, changedValueTypeKeys);
    if (removedTransformValues.length) {
      removedTransformValues.forEach(function(_a) {
        var _b = __read(_a, 2), key = _b[0], value = _b[1];
        visualElement2.getValue(key).set(value);
      });
    }
    visualElement2.syncRender();
    return { target: convertedTarget, transitionEnd };
  } else {
    return { target, transitionEnd };
  }
};
function unitConversion(visualElement2, target, origin, transitionEnd) {
  return hasPositionalKey(target) ? checkAndConvertChangedValueTypes(visualElement2, target, origin, transitionEnd) : { target, transitionEnd };
}
var parseDomVariant = function(visualElement2, target, origin, transitionEnd) {
  var resolved = resolveCSSVariables(visualElement2, target, transitionEnd);
  target = resolved.target;
  transitionEnd = resolved.transitionEnd;
  return unitConversion(visualElement2, target, origin, transitionEnd);
};
function scrapeMotionValuesFromProps$1(props) {
  var style = props.style;
  var newValues = {};
  for (var key in style) {
    if (isMotionValue(style[key]) || isForcedMotionValue(key, props)) {
      newValues[key] = style[key];
    }
  }
  return newValues;
}
function renderHTML(element, _a) {
  var style = _a.style, vars = _a.vars;
  Object.assign(element.style, style);
  for (var key in vars) {
    element.style.setProperty(key, vars[key]);
  }
}
function getComputedStyle$1(element) {
  return window.getComputedStyle(element);
}
var htmlConfig = {
  treeType: "dom",
  readValueFromInstance: function(domElement, key) {
    if (isTransformProp(key)) {
      var defaultType = getDefaultValueType(key);
      return defaultType ? defaultType.default || 0 : 0;
    } else {
      var computedStyle = getComputedStyle$1(domElement);
      return (isCSSVariable$1(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
    }
  },
  sortNodePosition: function(a2, b2) {
    return a2.compareDocumentPosition(b2) & 2 ? 1 : -1;
  },
  getBaseTarget: function(props, key) {
    var _a;
    return (_a = props.style) === null || _a === void 0 ? void 0 : _a[key];
  },
  measureViewportBox: function(element, _a) {
    var transformPagePoint = _a.transformPagePoint;
    return getBoundingBox(element, transformPagePoint);
  },
  resetTransform: function(element, domElement, props) {
    var transformTemplate = props.transformTemplate;
    domElement.style.transform = transformTemplate ? transformTemplate({}, "") : "none";
    element.scheduleRender();
  },
  restoreTransform: function(instance, mutableState) {
    instance.style.transform = mutableState.style.transform;
  },
  removeValueFromRenderState: function(key, _a) {
    var vars = _a.vars, style = _a.style;
    delete vars[key];
    delete style[key];
  },
  makeTargetAnimatable: function(element, _a, _b, isMounted) {
    var transformValues = _b.transformValues;
    if (isMounted === void 0) {
      isMounted = true;
    }
    var transition = _a.transition, transitionEnd = _a.transitionEnd, target = __rest(_a, ["transition", "transitionEnd"]);
    var origin = getOrigin(target, transition || {}, element);
    if (transformValues) {
      if (transitionEnd)
        transitionEnd = transformValues(transitionEnd);
      if (target)
        target = transformValues(target);
      if (origin)
        origin = transformValues(origin);
    }
    if (isMounted) {
      checkTargetForNewValues(element, target, origin);
      var parsed = parseDomVariant(element, target, origin, transitionEnd);
      transitionEnd = parsed.transitionEnd;
      target = parsed.target;
    }
    return __assign({
      transition,
      transitionEnd
    }, target);
  },
  scrapeMotionValuesFromProps: scrapeMotionValuesFromProps$1,
  build: function(element, renderState, latestValues, projection, layoutState, options2, props) {
    if (element.isVisible !== void 0) {
      renderState.style.visibility = element.isVisible ? "visible" : "hidden";
    }
    var isProjectionTranform = projection.isEnabled && layoutState.isHydrated;
    buildHTMLStyles(renderState, latestValues, projection, layoutState, options2, props.transformTemplate, isProjectionTranform ? buildLayoutProjectionTransform : void 0, isProjectionTranform ? buildLayoutProjectionTransformOrigin : void 0);
  },
  render: renderHTML
};
var htmlVisualElement = visualElement(htmlConfig);
function scrapeMotionValuesFromProps(props) {
  var newValues = scrapeMotionValuesFromProps$1(props);
  for (var key in props) {
    if (isMotionValue(props[key])) {
      var targetKey = key === "x" || key === "y" ? "attr" + key.toUpperCase() : key;
      newValues[targetKey] = props[key];
    }
  }
  return newValues;
}
var CAMEL_CASE_PATTERN = /([a-z])([A-Z])/g;
var REPLACE_TEMPLATE = "$1-$2";
var camelToDash = function(str) {
  return str.replace(CAMEL_CASE_PATTERN, REPLACE_TEMPLATE).toLowerCase();
};
var camelCaseAttributes = new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox"
]);
function renderSVG(element, renderState) {
  renderHTML(element, renderState);
  for (var key in renderState.attrs) {
    element.setAttribute(!camelCaseAttributes.has(key) ? camelToDash(key) : key, renderState.attrs[key]);
  }
}
var svgVisualElement = visualElement(__assign(__assign({}, htmlConfig), {
  getBaseTarget: function(props, key) {
    return props[key];
  },
  readValueFromInstance: function(domElement, key) {
    var _a;
    if (isTransformProp(key)) {
      return ((_a = getDefaultValueType(key)) === null || _a === void 0 ? void 0 : _a.default) || 0;
    }
    key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
    return domElement.getAttribute(key);
  },
  scrapeMotionValuesFromProps,
  build: function(_element, renderState, latestValues, projection, layoutState, options2, props) {
    var isProjectionTranform = projection.isEnabled && layoutState.isHydrated;
    buildSVGAttrs(renderState, latestValues, projection, layoutState, options2, props.transformTemplate, isProjectionTranform ? buildLayoutProjectionTransform : void 0, isProjectionTranform ? buildLayoutProjectionTransformOrigin : void 0);
  },
  render: renderSVG
}));
var createDomVisualElement = function(Component, options2) {
  return Component === "SVG" ? svgVisualElement(options2, { enableHardwareAcceleration: false }) : htmlVisualElement(options2, { enableHardwareAcceleration: true });
};
var svgMotionConfig = {
  scrapeMotionValuesFromProps,
  createRenderState: createSvgRenderState,
  onMount: function(props, instance, _a) {
    var renderState = _a.renderState, latestValues = _a.latestValues;
    try {
      renderState.dimensions = typeof instance.getBBox === "function" ? instance.getBBox() : instance.getBoundingClientRect();
    } catch (e) {
      renderState.dimensions = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
    }
    if (isPath(instance)) {
      renderState.totalPathLength = instance.getTotalLength();
    }
    buildSVGAttrs(renderState, latestValues, void 0, void 0, { enableHardwareAcceleration: false }, props.transformTemplate);
    renderSVG(instance, renderState);
  }
};
function isPath(element) {
  return element.tagName === "path";
}
var htmlMotionConfig = {
  scrapeMotionValuesFromProps: scrapeMotionValuesFromProps$1,
  createRenderState: createHtmlRenderState
};
function getCurrentTreeVariants(props, context) {
  if (checkIfControllingVariants(props)) {
    var initial = props.initial, animate2 = props.animate;
    return {
      initial: initial === false || isVariantLabel(initial) ? initial : void 0,
      animate: isVariantLabel(animate2) ? animate2 : void 0
    };
  }
  return props.inherit !== false ? context || {} : {};
}
var UseCreateMotionContext = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $mc, $$unsubscribe_mc;
  let { props, isStatic, isCustom } = $$props;
  let mc = getContext(MotionContext) || MotionContext(isCustom);
  $$unsubscribe_mc = subscribe(mc, (value2) => $mc = value2);
  let { initial, animate: animate2 } = getCurrentTreeVariants(props, get_store_value(mc));
  const variantLabelsAsDependency = (prop) => {
    return Array.isArray(prop) ? prop.join(" ") : prop;
  };
  const memo = () => {
    return { initial, animate: animate2 };
  };
  let value = memo();
  if ($$props.props === void 0 && $$bindings.props && props !== void 0)
    $$bindings.props(props);
  if ($$props.isStatic === void 0 && $$bindings.isStatic && isStatic !== void 0)
    $$bindings.isStatic(isStatic);
  if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0)
    $$bindings.isCustom(isCustom);
  ({ initial, animate: animate2 } = getCurrentTreeVariants(props, $mc));
  {
    if (isStatic) {
      value = memo(variantLabelsAsDependency(initial), variantLabelsAsDependency(animate2));
    }
  }
  $$unsubscribe_mc();
  return `${slots.default ? slots.default({ value }) : ``}`;
});
function resolveMotionValue(value) {
  var unwrappedValue = isMotionValue(value) ? value.get() : value;
  return isCustomValue(unwrappedValue) ? unwrappedValue.toValue() : unwrappedValue;
}
var makeState = ({ scrapeMotionValuesFromProps: scrapeMotionValuesFromProps2, createRenderState, onMount }, props, context, presenceContext) => {
  const state = {
    latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps2),
    renderState: createRenderState()
  };
  if (onMount) {
    state.mount = (instance) => onMount(props, instance, state);
  }
  return state;
};
function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
  const values = {};
  const blockInitialAnimation = (presenceContext == null ? void 0 : presenceContext.initial) === false;
  const motionValues = scrapeMotionValues(props);
  for (const key in motionValues) {
    values[key] = resolveMotionValue(motionValues[key]);
  }
  let { initial, animate: animate2 } = props;
  const isControllingVariants = checkIfControllingVariants(props);
  const isVariantNode = checkIfVariantNode(props);
  if (context && isVariantNode && !isControllingVariants && props.inherit !== false) {
    initial !== null && initial !== void 0 ? initial : initial = context.initial;
    animate2 !== null && animate2 !== void 0 ? animate2 : animate2 = context.animate;
  }
  const variantToSet = blockInitialAnimation || initial === false ? animate2 : initial;
  if (variantToSet && typeof variantToSet !== "boolean" && !isAnimationControls(variantToSet)) {
    const list = Array.isArray(variantToSet) ? variantToSet : [variantToSet];
    list.forEach((definition) => {
      const resolved = resolveVariantFromProps(props, definition);
      if (!resolved)
        return;
      const { transitionEnd, transition, ...target } = resolved;
      for (const key in target)
        values[key] = target[key];
      for (const key in transitionEnd)
        values[key] = transitionEnd[key];
    });
  }
  return values;
}
var UseVisualState = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $presenceContext, $$unsubscribe_presenceContext;
  let $context, $$unsubscribe_context;
  let { config: config2, props, isStatic, isCustom } = $$props;
  const context = getContext(MotionContext) || MotionContext(isCustom);
  $$unsubscribe_context = subscribe(context, (value) => $context = value);
  const presenceContext = getContext(PresenceContext) || PresenceContext(isCustom);
  $$unsubscribe_presenceContext = subscribe(presenceContext, (value) => $presenceContext = value);
  let state = makeState(config2, props, get_store_value(context), get_store_value(presenceContext));
  const ms = makeState;
  if ($$props.config === void 0 && $$bindings.config && config2 !== void 0)
    $$bindings.config(config2);
  if ($$props.props === void 0 && $$bindings.props && props !== void 0)
    $$bindings.props(props);
  if ($$props.isStatic === void 0 && $$bindings.isStatic && isStatic !== void 0)
    $$bindings.isStatic(isStatic);
  if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0)
    $$bindings.isCustom(isCustom);
  {
    if (isStatic) {
      state = ms(config2, props, $context, $presenceContext);
    }
  }
  $$unsubscribe_presenceContext();
  $$unsubscribe_context();
  return `${slots.default ? slots.default({ state }) : ``}`;
});
function isRefObject(ref) {
  return typeof ref === "object" && Object.prototype.hasOwnProperty.call(ref, "current");
}
function useMotionRef(visualState, visualElement2, externalRef) {
  return function(instance) {
    var _a;
    instance && ((_a = visualState.mount) === null || _a === void 0 ? void 0 : _a.call(visualState, instance));
    if (visualElement2) {
      instance ? visualElement2.mount(instance) : visualElement2.unmount();
    }
    if (externalRef) {
      if (typeof externalRef === "function") {
        externalRef(instance);
      } else if (isRefObject(externalRef)) {
        externalRef.current = instance;
      }
    }
  };
}
var Motion = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let motionProps;
  let isStatic;
  let $$restProps = compute_rest_props($$props, ["isSVG", "forwardMotionProps", "externalRef", "targetEl"]);
  let $a, $$unsubscribe_a;
  let { isSVG = false, forwardMotionProps = false, externalRef = void 0, targetEl = void 0 } = $$props;
  const isCustom = targetEl;
  let Component = isSVG ? "SVG" : "DOM";
  let createVisualElement = createDomVisualElement;
  let visualStateConfig = isSVG ? svgMotionConfig : htmlMotionConfig;
  const a2 = getContext(MotionConfigContext) || MotionConfigContext(isCustom);
  $$unsubscribe_a = subscribe(a2, (value) => $a = value);
  const setContext2 = (c2, v) => {
    c2.visualElement = v;
    return v;
  };
  if ($$props.isSVG === void 0 && $$bindings.isSVG && isSVG !== void 0)
    $$bindings.isSVG(isSVG);
  if ($$props.forwardMotionProps === void 0 && $$bindings.forwardMotionProps && forwardMotionProps !== void 0)
    $$bindings.forwardMotionProps(forwardMotionProps);
  if ($$props.externalRef === void 0 && $$bindings.externalRef && externalRef !== void 0)
    $$bindings.externalRef(externalRef);
  if ($$props.targetEl === void 0 && $$bindings.targetEl && targetEl !== void 0)
    $$bindings.targetEl(targetEl);
  motionProps = $$restProps;
  ({ isStatic } = $a || {});
  $$unsubscribe_a();
  return `${validate_component(ScaleCorrectionProvider, "ScaleCorrectionProvider").$$render($$result, { isCustom }, {}, {
    default: () => `${validate_component(UseCreateMotionContext, "UseCreateMotionContext").$$render($$result, { props: motionProps, isStatic, isCustom }, {}, {
      default: ({ value: context }) => `${validate_component(UseVisualState, "UseVisualState").$$render($$result, {
        config: visualStateConfig,
        props: motionProps,
        isStatic,
        isCustom
      }, {}, {
        default: ({ state: visualState }) => `${validate_component(UseVisualElement, "UseVisualElement").$$render($$result, {
          Component,
          visualState,
          createVisualElement,
          props: motionProps,
          isCustom
        }, {}, {
          default: ({ visualElement: visualElement2 }) => `${validate_component(UseFeatures, "UseFeatures").$$render($$result, {
            visualElement: setContext2(context, visualElement2),
            props: motionProps
          }, {}, {
            default: ({ features: _features }) => `${validate_component(MotionContextProvider, "MotionContextProvider").$$render($$result, { value: context, isCustom }, {}, {
              default: () => `${validate_component(UseRender, "UseRender").$$render($$result, {
                Component,
                props: motionProps,
                ref: useMotionRef(visualState, context.visualElement, externalRef),
                visualState,
                isStatic,
                forwardMotionProps
              }, {}, {
                default: ({ motion: motion2, props: renderProps }) => `${slots.default ? slots.default({ motion: motion2, props: renderProps }) : ``}`
              })}`
            })}

                    ${``}`
          })}`
        })}`
      })}`
    })}`
  })}`;
});
function addDomEvent(target, eventName, handler, options2) {
  target.addEventListener(eventName, handler, options2);
  return function() {
    return target.removeEventListener(eventName, handler, options2);
  };
}
var UseDomEvent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { ref, eventName, handler = void 0, options: options2 = void 0 } = $$props;
  let cleanup = () => {
  };
  const effect = () => {
    cleanup();
    if (!ref) {
      return () => {
      };
    }
    const element = ref.current;
    if (handler && element) {
      return addDomEvent(element, eventName, handler, options2);
    }
    return () => {
    };
  };
  onDestroy(cleanup);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  if ($$props.eventName === void 0 && $$bindings.eventName && eventName !== void 0)
    $$bindings.eventName(eventName);
  if ($$props.handler === void 0 && $$bindings.handler && handler !== void 0)
    $$bindings.handler(handler);
  if ($$props.options === void 0 && $$bindings.options && options2 !== void 0)
    $$bindings.options(options2);
  cleanup = effect();
  return `${slots.default ? slots.default({}) : ``}`;
});
function isMouseEvent(event) {
  if (typeof PointerEvent !== "undefined" && event instanceof PointerEvent) {
    return !!(event.pointerType === "mouse");
  }
  return event instanceof MouseEvent;
}
function isTouchEvent(event) {
  var hasTouches = !!event.touches;
  return hasTouches;
}
function filterPrimaryPointer(eventHandler) {
  return function(event) {
    var isMouseEvent2 = event instanceof MouseEvent;
    var isPrimaryPointer = !isMouseEvent2 || isMouseEvent2 && event.button === 0;
    if (isPrimaryPointer) {
      eventHandler(event);
    }
  };
}
var defaultPagePoint = { pageX: 0, pageY: 0 };
function pointFromTouch(e, pointType) {
  if (pointType === void 0) {
    pointType = "page";
  }
  var primaryTouch = e.touches[0] || e.changedTouches[0];
  var point = primaryTouch || defaultPagePoint;
  return {
    x: point[pointType + "X"],
    y: point[pointType + "Y"]
  };
}
function pointFromMouse(point, pointType) {
  if (pointType === void 0) {
    pointType = "page";
  }
  return {
    x: point[pointType + "X"],
    y: point[pointType + "Y"]
  };
}
function extractEventInfo(event, pointType) {
  if (pointType === void 0) {
    pointType = "page";
  }
  return {
    point: isTouchEvent(event) ? pointFromTouch(event, pointType) : pointFromMouse(event, pointType)
  };
}
function getViewportPointFromEvent(event) {
  return extractEventInfo(event, "client");
}
var wrapHandler = function(handler, shouldFilterPrimaryPointer) {
  if (shouldFilterPrimaryPointer === void 0) {
    shouldFilterPrimaryPointer = false;
  }
  var listener = function(event) {
    return handler(event, extractEventInfo(event));
  };
  return shouldFilterPrimaryPointer ? filterPrimaryPointer(listener) : listener;
};
var isBrowser = typeof window !== "undefined";
var supportsPointerEvents = function() {
  return isBrowser && window.onpointerdown === null;
};
var supportsTouchEvents = function() {
  return isBrowser && window.ontouchstart === null;
};
var supportsMouseEvents = function() {
  return isBrowser && window.onmousedown === null;
};
var mouseEventNames = {
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointercancel: "mousecancel",
  pointerover: "mouseover",
  pointerout: "mouseout",
  pointerenter: "mouseenter",
  pointerleave: "mouseleave"
};
var touchEventNames = {
  pointerdown: "touchstart",
  pointermove: "touchmove",
  pointerup: "touchend",
  pointercancel: "touchcancel"
};
function getPointerEventName(name) {
  if (supportsPointerEvents()) {
    return name;
  } else if (supportsTouchEvents()) {
    return touchEventNames[name];
  } else if (supportsMouseEvents()) {
    return mouseEventNames[name];
  }
  return name;
}
function addPointerEvent(target, eventName, handler, options2) {
  return addDomEvent(target, getPointerEventName(eventName), wrapHandler(handler, eventName === "pointerdown"), options2);
}
var UsePointerEvent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { ref, eventName, handler = void 0, options: options2 = void 0 } = $$props;
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  if ($$props.eventName === void 0 && $$bindings.eventName && eventName !== void 0)
    $$bindings.eventName(eventName);
  if ($$props.handler === void 0 && $$bindings.handler && handler !== void 0)
    $$bindings.handler(handler);
  if ($$props.options === void 0 && $$bindings.options && options2 !== void 0)
    $$bindings.options(options2);
  return `${validate_component(UseDomEvent, "UseDomEvent").$$render($$result, {
    ref,
    eventName: getPointerEventName(eventName),
    handler: handler && wrapHandler(handler, eventName === "pointerdown"),
    options: options2
  }, {}, {
    default: () => `${slots.default ? slots.default({}) : ``}`
  })}`;
});
var PanSession = function() {
  function PanSession2(event, handlers, _a) {
    var _this = this;
    var _b = _a === void 0 ? {} : _a, transformPagePoint = _b.transformPagePoint;
    this.startEvent = null;
    this.lastMoveEvent = null;
    this.lastMoveEventInfo = null;
    this.handlers = {};
    this.updatePoint = function() {
      if (!(_this.lastMoveEvent && _this.lastMoveEventInfo))
        return;
      var info2 = getPanInfo(_this.lastMoveEventInfo, _this.history);
      var isPanStarted = _this.startEvent !== null;
      var isDistancePastThreshold = distance(info2.offset, { x: 0, y: 0 }) >= 3;
      if (!isPanStarted && !isDistancePastThreshold)
        return;
      var point2 = info2.point;
      var timestamp2 = getFrameData().timestamp;
      _this.history.push(__assign(__assign({}, point2), { timestamp: timestamp2 }));
      var _a2 = _this.handlers, onStart = _a2.onStart, onMove = _a2.onMove;
      if (!isPanStarted) {
        onStart && onStart(_this.lastMoveEvent, info2);
        _this.startEvent = _this.lastMoveEvent;
      }
      onMove && onMove(_this.lastMoveEvent, info2);
    };
    this.handlePointerMove = function(event2, info2) {
      _this.lastMoveEvent = event2;
      _this.lastMoveEventInfo = transformPoint(info2, _this.transformPagePoint);
      if (isMouseEvent(event2) && event2.buttons === 0) {
        _this.handlePointerUp(event2, info2);
        return;
      }
      sync.update(_this.updatePoint, true);
    };
    this.handlePointerUp = function(event2, info2) {
      _this.end();
      var _a2 = _this.handlers, onEnd = _a2.onEnd, onSessionEnd = _a2.onSessionEnd;
      var panInfo = getPanInfo(transformPoint(info2, _this.transformPagePoint), _this.history);
      if (_this.startEvent && onEnd) {
        onEnd(event2, panInfo);
      }
      onSessionEnd && onSessionEnd(event2, panInfo);
    };
    if (isTouchEvent(event) && event.touches.length > 1)
      return;
    this.handlers = handlers;
    this.transformPagePoint = transformPagePoint;
    var info = extractEventInfo(event);
    var initialInfo = transformPoint(info, this.transformPagePoint);
    var point = initialInfo.point;
    var timestamp = getFrameData().timestamp;
    this.history = [__assign(__assign({}, point), { timestamp })];
    var onSessionStart = handlers.onSessionStart;
    onSessionStart && onSessionStart(event, getPanInfo(initialInfo, this.history));
    this.removeListeners = pipe(addPointerEvent(window, "pointermove", this.handlePointerMove), addPointerEvent(window, "pointerup", this.handlePointerUp), addPointerEvent(window, "pointercancel", this.handlePointerUp));
  }
  PanSession2.prototype.updateHandlers = function(handlers) {
    this.handlers = handlers;
  };
  PanSession2.prototype.end = function() {
    this.removeListeners && this.removeListeners();
    cancelSync.update(this.updatePoint);
  };
  return PanSession2;
}();
function transformPoint(info, transformPagePoint) {
  return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
}
function subtractPoint(a2, b2) {
  return { x: a2.x - b2.x, y: a2.y - b2.y };
}
function getPanInfo(_a, history) {
  var point = _a.point;
  return {
    point,
    delta: subtractPoint(point, lastDevicePoint(history)),
    offset: subtractPoint(point, startDevicePoint(history)),
    velocity: getVelocity(history, 0.1)
  };
}
function startDevicePoint(history) {
  return history[0];
}
function lastDevicePoint(history) {
  return history[history.length - 1];
}
function getVelocity(history, timeDelta) {
  if (history.length < 2) {
    return { x: 0, y: 0 };
  }
  var i = history.length - 1;
  var timestampedPoint = null;
  var lastPoint = lastDevicePoint(history);
  while (i >= 0) {
    timestampedPoint = history[i];
    if (lastPoint.timestamp - timestampedPoint.timestamp > secondsToMilliseconds(timeDelta)) {
      break;
    }
    i--;
  }
  if (!timestampedPoint) {
    return { x: 0, y: 0 };
  }
  var time = (lastPoint.timestamp - timestampedPoint.timestamp) / 1e3;
  if (time === 0) {
    return { x: 0, y: 0 };
  }
  var currentVelocity = {
    x: (lastPoint.x - timestampedPoint.x) / time,
    y: (lastPoint.y - timestampedPoint.y) / time
  };
  if (currentVelocity.x === Infinity) {
    currentVelocity.x = 0;
  }
  if (currentVelocity.y === Infinity) {
    currentVelocity.y = 0;
  }
  return currentVelocity;
}
var UsePanGesture = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let hasPanEvents;
  let $mcc, $$unsubscribe_mcc;
  let { props, visualElement: visualElement2, isCustom } = $$props;
  let { onPan, onPanStart, onPanEnd, onPanSessionStart } = props;
  let panSession = null;
  const mcc = getContext(MotionConfigContext) || MotionConfigContext(isCustom);
  $$unsubscribe_mcc = subscribe(mcc, (value) => $mcc = value);
  let { transformPagePoint } = get_store_value(mcc);
  let handlers = {
    onSessionStart: onPanSessionStart,
    onStart: onPanStart,
    onMove: onPan,
    onEnd: (event, info) => {
      panSession = null;
      onPanEnd && onPanEnd(event, info);
    }
  };
  function onPointerDown(event) {
    panSession = new PanSession(event, handlers, { transformPagePoint });
  }
  onDestroy(() => panSession && panSession.end());
  if ($$props.props === void 0 && $$bindings.props && props !== void 0)
    $$bindings.props(props);
  if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0)
    $$bindings.visualElement(visualElement2);
  if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0)
    $$bindings.isCustom(isCustom);
  ({ onPan, onPanStart, onPanEnd, onPanSessionStart } = props);
  hasPanEvents = onPan || onPanStart || onPanEnd || onPanSessionStart;
  ({ transformPagePoint } = $mcc);
  handlers = {
    onSessionStart: onPanSessionStart,
    onStart: onPanStart,
    onMove: onPan,
    onEnd: (event, info) => {
      panSession = null;
      onPanEnd && onPanEnd(event, info);
    }
  };
  $$unsubscribe_mcc();
  return `${validate_component(UsePointerEvent, "UsePointerEvent").$$render($$result, {
    ref: visualElement2,
    eventName: "pointerdown",
    handler: hasPanEvents && onPointerDown
  }, {}, {
    default: () => `${slots.default ? slots.default({}) : ``}`
  })}`;
});
var isNodeOrChild = function(parent, child) {
  if (!child) {
    return false;
  } else if (parent === child) {
    return true;
  } else {
    return isNodeOrChild(parent, child.parentElement);
  }
};
function createLock(name) {
  var lock = null;
  return function() {
    var openLock = function() {
      lock = null;
    };
    if (lock === null) {
      lock = name;
      return openLock;
    }
    return false;
  };
}
var globalHorizontalLock = createLock("dragHorizontal");
var globalVerticalLock = createLock("dragVertical");
function getGlobalLock(drag2) {
  var lock = false;
  if (drag2 === "y") {
    lock = globalVerticalLock();
  } else if (drag2 === "x") {
    lock = globalHorizontalLock();
  } else {
    var openHorizontal_1 = globalHorizontalLock();
    var openVertical_1 = globalVerticalLock();
    if (openHorizontal_1 && openVertical_1) {
      lock = function() {
        openHorizontal_1();
        openVertical_1();
      };
    } else {
      if (openHorizontal_1)
        openHorizontal_1();
      if (openVertical_1)
        openVertical_1();
    }
  }
  return lock;
}
function isDragActive() {
  var openGestureLock = getGlobalLock(true);
  if (!openGestureLock)
    return true;
  openGestureLock();
  return false;
}
var UseTapGesture = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let onTap;
  let onTapStart;
  let onTapCancel;
  let whileTap;
  let hasPressListeners;
  let { props, visualElement: visualElement2 } = $$props;
  let isPressing = false;
  let cancelPointerEndListeners = null;
  function removePointerEndListener() {
    cancelPointerEndListeners == null ? void 0 : cancelPointerEndListeners();
    cancelPointerEndListeners = null;
  }
  function checkPointerEnd() {
    var _a;
    removePointerEndListener();
    isPressing = false;
    (_a = visualElement2.animationState) == null ? void 0 : _a.setActive(AnimationType.Tap, false);
    return !isDragActive();
  }
  function onPointerUp(event, info) {
    if (!checkPointerEnd())
      return;
    !isNodeOrChild(visualElement2.getInstance(), event.target) ? onTapCancel == null ? void 0 : onTapCancel(event, info) : onTap == null ? void 0 : onTap(event, info);
  }
  function onPointerCancel(event, info) {
    if (!checkPointerEnd())
      return;
    onTapCancel == null ? void 0 : onTapCancel(event, info);
  }
  function onPointerDown(event, info) {
    var _a;
    if (isPressing)
      return;
    removePointerEndListener();
    isPressing = true;
    cancelPointerEndListeners = pipe(addPointerEvent(window, "pointerup", onPointerUp), addPointerEvent(window, "pointercancel", onPointerCancel));
    onTapStart == null ? void 0 : onTapStart(event, info);
    (_a = visualElement2.animationState) == null ? void 0 : _a.setActive(AnimationType.Tap, true);
  }
  onDestroy(removePointerEndListener);
  if ($$props.props === void 0 && $$bindings.props && props !== void 0)
    $$bindings.props(props);
  if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0)
    $$bindings.visualElement(visualElement2);
  ({ onTap, onTapStart, onTapCancel, whileTap } = props);
  hasPressListeners = onTap || onTapStart || onTapCancel || whileTap;
  return `${validate_component(UsePointerEvent, "UsePointerEvent").$$render($$result, {
    ref: visualElement2,
    eventName: "pointerdown",
    handler: hasPressListeners ? onPointerDown : void 0
  }, {}, {
    default: () => `${slots.default ? slots.default({}) : ``}`
  })}`;
});
function createHoverEvent(visualElement2, isActive, callback) {
  return (event, info) => {
    var _a;
    if (!isMouseEvent(event) || isDragActive())
      return;
    callback == null ? void 0 : callback(event, info);
    (_a = visualElement2.animationState) == null ? void 0 : _a.setActive(AnimationType.Hover, isActive);
  };
}
var UseHoverGesture = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { props, visualElement: visualElement2 } = $$props;
  let { onHoverStart, onHoverEnd, whileHover } = props;
  if ($$props.props === void 0 && $$bindings.props && props !== void 0)
    $$bindings.props(props);
  if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0)
    $$bindings.visualElement(visualElement2);
  ({ onHoverStart, onHoverEnd, whileHover } = props);
  return `${validate_component(UsePointerEvent, "UsePointerEvent").$$render($$result, {
    ref: visualElement2,
    eventName: "pointerenter",
    handler: onHoverStart || whileHover ? createHoverEvent(visualElement2, true, onHoverStart) : void 0
  }, {}, {})}
${validate_component(UsePointerEvent, "UsePointerEvent").$$render($$result, {
    ref: visualElement2,
    eventName: "pointerleave",
    handler: onHoverEnd || whileHover ? createHoverEvent(visualElement2, false, onHoverEnd) : void 0
  }, {}, {})}
${slots.default ? slots.default({}) : ``}`;
});
var UseFocusGesture = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let whileFocus;
  let { props, visualElement: visualElement2 } = $$props;
  const onFocus = () => {
    var _a;
    (_a = visualElement2.animationState) == null ? void 0 : _a.setActive(AnimationType.Focus, true);
  };
  const onBlur = () => {
    var _a;
    (_a = visualElement2.animationState) == null ? void 0 : _a.setActive(AnimationType.Focus, false);
  };
  if ($$props.props === void 0 && $$bindings.props && props !== void 0)
    $$bindings.props(props);
  if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0)
    $$bindings.visualElement(visualElement2);
  ({ whileFocus } = props);
  return `${validate_component(UseDomEvent, "UseDomEvent").$$render($$result, {
    ref: visualElement2,
    eventName: "focus",
    handler: whileFocus ? onFocus : void 0
  }, {}, {
    default: () => `${validate_component(UseDomEvent, "UseDomEvent").$$render($$result, {
      ref: visualElement2,
      eventName: "blur",
      handler: whileFocus ? onBlur : void 0
    }, {}, {
      default: () => `${slots.default ? slots.default({}) : ``}`
    })}`
  })}`;
});
var createMotionClass = (features) => {
  features && loadFeatures(features);
  return Motion;
};
var gestureAnimations = {
  tap: UseTapGesture,
  focus: UseFocusGesture,
  hover: UseHoverGesture
};
function applyConstraints(point, _a, elastic) {
  var min = _a.min, max = _a.max;
  if (min !== void 0 && point < min) {
    point = elastic ? mix(min, point, elastic.min) : Math.max(point, min);
  } else if (max !== void 0 && point > max) {
    point = elastic ? mix(max, point, elastic.max) : Math.min(point, max);
  }
  return point;
}
function calcConstrainedMinPoint(point, length, progress2, constraints, elastic) {
  var min = point - length * progress2;
  return constraints ? applyConstraints(min, constraints, elastic) : min;
}
function calcRelativeAxisConstraints(axis, min, max) {
  return {
    min: min !== void 0 ? axis.min + min : void 0,
    max: max !== void 0 ? axis.max + max - (axis.max - axis.min) : void 0
  };
}
function calcRelativeConstraints(layoutBox, _a) {
  var top = _a.top, left = _a.left, bottom = _a.bottom, right = _a.right;
  return {
    x: calcRelativeAxisConstraints(layoutBox.x, left, right),
    y: calcRelativeAxisConstraints(layoutBox.y, top, bottom)
  };
}
function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
  var _a;
  var min = constraintsAxis.min - layoutAxis.min;
  var max = constraintsAxis.max - layoutAxis.max;
  if (constraintsAxis.max - constraintsAxis.min < layoutAxis.max - layoutAxis.min) {
    _a = __read([max, min], 2), min = _a[0], max = _a[1];
  }
  return {
    min: layoutAxis.min + min,
    max: layoutAxis.min + max
  };
}
function calcViewportConstraints(layoutBox, constraintsBox) {
  return {
    x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
    y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y)
  };
}
function calcPositionFromProgress(axis, constraints, progress2) {
  var axisLength = axis.max - axis.min;
  var min = mix(constraints.min, constraints.max - axisLength, progress2);
  return { min, max: min + axisLength };
}
function rebaseAxisConstraints(layout2, constraints) {
  var relativeConstraints = {};
  if (constraints.min !== void 0) {
    relativeConstraints.min = constraints.min - layout2.min;
  }
  if (constraints.max !== void 0) {
    relativeConstraints.max = constraints.max - layout2.min;
  }
  return relativeConstraints;
}
var defaultElastic = 0.35;
function resolveDragElastic(dragElastic) {
  if (dragElastic === false) {
    dragElastic = 0;
  } else if (dragElastic === true) {
    dragElastic = defaultElastic;
  }
  return {
    x: resolveAxisElastic(dragElastic, "left", "right"),
    y: resolveAxisElastic(dragElastic, "top", "bottom")
  };
}
function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
  return {
    min: resolvePointElastic(dragElastic, minLabel),
    max: resolvePointElastic(dragElastic, maxLabel)
  };
}
function resolvePointElastic(dragElastic, label) {
  var _a;
  return typeof dragElastic === "number" ? dragElastic : (_a = dragElastic[label]) !== null && _a !== void 0 ? _a : 0;
}
function convertToRelativeProjection(visualElement2, isLayoutDrag) {
  if (isLayoutDrag === void 0) {
    isLayoutDrag = true;
  }
  var projectionParent = visualElement2.getProjectionParent();
  if (!projectionParent)
    return false;
  var offset;
  if (isLayoutDrag) {
    offset = calcRelativeOffset(projectionParent.projection.target, visualElement2.projection.target);
    removeBoxTransforms(offset, projectionParent.getLatestValues());
  } else {
    offset = calcRelativeOffset(projectionParent.getLayoutState().layout, visualElement2.getLayoutState().layout);
  }
  eachAxis(function(axis) {
    return visualElement2.setProjectionTargetAxis(axis, offset[axis].min, offset[axis].max, true);
  });
  return true;
}
var elementDragControls = new WeakMap();
var lastPointerEvent;
var VisualElementDragControls = function() {
  function VisualElementDragControls2(_a) {
    var visualElement2 = _a.visualElement;
    this.isDragging = false;
    this.currentDirection = null;
    this.constraints = false;
    this.elastic = axisBox();
    this.props = {};
    this.hasMutatedConstraints = false;
    this.cursorProgress = {
      x: 0.5,
      y: 0.5
    };
    this.originPoint = {};
    this.openGlobalLock = null;
    this.panSession = null;
    this.visualElement = visualElement2;
    this.visualElement.enableLayoutProjection();
    elementDragControls.set(visualElement2, this);
  }
  VisualElementDragControls2.prototype.start = function(originEvent, _a) {
    var _this = this;
    var _b = _a === void 0 ? {} : _a, _c = _b.snapToCursor, snapToCursor = _c === void 0 ? false : _c, cursorProgress = _b.cursorProgress;
    var onSessionStart = function(event) {
      var _a2;
      _this.stopMotion();
      var initialPoint = getViewportPointFromEvent(event).point;
      (_a2 = _this.cancelLayout) === null || _a2 === void 0 ? void 0 : _a2.call(_this);
      _this.cancelLayout = batchLayout(function(read, write) {
        var ancestors = collectProjectingAncestors(_this.visualElement);
        var children = collectProjectingChildren(_this.visualElement);
        var tree = __spreadArray(__spreadArray([], __read(ancestors)), __read(children));
        var hasManuallySetCursorOrigin = false;
        _this.isLayoutDrag() && _this.visualElement.lockProjectionTarget();
        write(function() {
          tree.forEach(function(element) {
            return element.resetTransform();
          });
        });
        read(function() {
          updateLayoutMeasurement(_this.visualElement);
          children.forEach(updateLayoutMeasurement);
        });
        write(function() {
          tree.forEach(function(element) {
            return element.restoreTransform();
          });
          if (snapToCursor) {
            hasManuallySetCursorOrigin = _this.snapToCursor(initialPoint);
          }
        });
        read(function() {
          var isRelativeDrag = Boolean(_this.getAxisMotionValue("x") && !_this.isExternalDrag());
          if (!isRelativeDrag) {
            _this.visualElement.rebaseProjectionTarget(true, _this.visualElement.measureViewportBox(false));
          }
          _this.visualElement.scheduleUpdateLayoutProjection();
          var projection = _this.visualElement.projection;
          eachAxis(function(axis) {
            if (!hasManuallySetCursorOrigin) {
              var _a3 = projection.target[axis], min = _a3.min, max = _a3.max;
              _this.cursorProgress[axis] = cursorProgress ? cursorProgress[axis] : progress(min, max, initialPoint[axis]);
            }
            var axisValue = _this.getAxisMotionValue(axis);
            if (axisValue) {
              _this.originPoint[axis] = axisValue.get();
            }
          });
        });
        write(function() {
          flushSync.update();
          flushSync.preRender();
          flushSync.render();
          flushSync.postRender();
        });
        read(function() {
          return _this.resolveDragConstraints();
        });
      });
    };
    var onStart = function(event, info) {
      var _a2, _b2, _c2;
      var _d = _this.props, drag2 = _d.drag, dragPropagation = _d.dragPropagation;
      if (drag2 && !dragPropagation) {
        if (_this.openGlobalLock)
          _this.openGlobalLock();
        _this.openGlobalLock = getGlobalLock(drag2);
        if (!_this.openGlobalLock)
          return;
      }
      flushLayout();
      _this.isDragging = true;
      _this.currentDirection = null;
      (_b2 = (_a2 = _this.props).onDragStart) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, event, info);
      (_c2 = _this.visualElement.animationState) === null || _c2 === void 0 ? void 0 : _c2.setActive(AnimationType.Drag, true);
    };
    var onMove = function(event, info) {
      var _a2, _b2, _c2, _d;
      var _e = _this.props, dragPropagation = _e.dragPropagation, dragDirectionLock = _e.dragDirectionLock;
      if (!dragPropagation && !_this.openGlobalLock)
        return;
      var offset = info.offset;
      if (dragDirectionLock && _this.currentDirection === null) {
        _this.currentDirection = getCurrentDirection(offset);
        if (_this.currentDirection !== null) {
          (_b2 = (_a2 = _this.props).onDirectionLock) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, _this.currentDirection);
        }
        return;
      }
      _this.updateAxis("x", info.point, offset);
      _this.updateAxis("y", info.point, offset);
      (_d = (_c2 = _this.props).onDrag) === null || _d === void 0 ? void 0 : _d.call(_c2, event, info);
      lastPointerEvent = event;
    };
    var onSessionEnd = function(event, info) {
      return _this.stop(event, info);
    };
    var transformPagePoint = this.props.transformPagePoint;
    this.panSession = new PanSession(originEvent, {
      onSessionStart,
      onStart,
      onMove,
      onSessionEnd
    }, { transformPagePoint });
  };
  VisualElementDragControls2.prototype.resolveDragConstraints = function() {
    var _this = this;
    var _a = this.props, dragConstraints = _a.dragConstraints, dragElastic = _a.dragElastic;
    var layout2 = this.visualElement.getLayoutState().layoutCorrected;
    if (dragConstraints) {
      this.constraints = isRefObject(dragConstraints) ? this.resolveRefConstraints(layout2, dragConstraints) : calcRelativeConstraints(layout2, dragConstraints);
    } else {
      this.constraints = false;
    }
    this.elastic = resolveDragElastic(dragElastic);
    if (this.constraints && !this.hasMutatedConstraints) {
      eachAxis(function(axis) {
        if (_this.getAxisMotionValue(axis)) {
          _this.constraints[axis] = rebaseAxisConstraints(layout2[axis], _this.constraints[axis]);
        }
      });
    }
  };
  VisualElementDragControls2.prototype.resolveRefConstraints = function(layoutBox, constraints) {
    var _a = this.props, onMeasureDragConstraints = _a.onMeasureDragConstraints, transformPagePoint = _a.transformPagePoint;
    var constraintsElement = constraints.current;
    this.constraintsBox = getBoundingBox(constraintsElement, transformPagePoint);
    var measuredConstraints = calcViewportConstraints(layoutBox, this.constraintsBox);
    if (onMeasureDragConstraints) {
      var userConstraints = onMeasureDragConstraints(convertAxisBoxToBoundingBox(measuredConstraints));
      this.hasMutatedConstraints = !!userConstraints;
      if (userConstraints) {
        measuredConstraints = convertBoundingBoxToAxisBox(userConstraints);
      }
    }
    return measuredConstraints;
  };
  VisualElementDragControls2.prototype.cancelDrag = function() {
    var _a, _b;
    this.visualElement.unlockProjectionTarget();
    (_a = this.cancelLayout) === null || _a === void 0 ? void 0 : _a.call(this);
    this.isDragging = false;
    this.panSession && this.panSession.end();
    this.panSession = null;
    if (!this.props.dragPropagation && this.openGlobalLock) {
      this.openGlobalLock();
      this.openGlobalLock = null;
    }
    (_b = this.visualElement.animationState) === null || _b === void 0 ? void 0 : _b.setActive(AnimationType.Drag, false);
  };
  VisualElementDragControls2.prototype.stop = function(event, info) {
    var _a, _b, _c;
    (_a = this.panSession) === null || _a === void 0 ? void 0 : _a.end();
    this.panSession = null;
    var isDragging = this.isDragging;
    this.cancelDrag();
    if (!isDragging)
      return;
    var velocity = info.velocity;
    this.animateDragEnd(velocity);
    (_c = (_b = this.props).onDragEnd) === null || _c === void 0 ? void 0 : _c.call(_b, event, info);
  };
  VisualElementDragControls2.prototype.snapToCursor = function(point) {
    var _this = this;
    return eachAxis(function(axis) {
      var drag2 = _this.props.drag;
      if (!shouldDrag(axis, drag2, _this.currentDirection))
        return;
      var axisValue = _this.getAxisMotionValue(axis);
      if (axisValue) {
        var box = _this.visualElement.getLayoutState().layout;
        var length_1 = box[axis].max - box[axis].min;
        var center = box[axis].min + length_1 / 2;
        var offset = point[axis] - center;
        _this.originPoint[axis] = point[axis];
        axisValue.set(offset);
      } else {
        _this.cursorProgress[axis] = 0.5;
        return true;
      }
    }).includes(true);
  };
  VisualElementDragControls2.prototype.updateAxis = function(axis, point, offset) {
    var drag2 = this.props.drag;
    if (!shouldDrag(axis, drag2, this.currentDirection))
      return;
    return this.getAxisMotionValue(axis) ? this.updateAxisMotionValue(axis, offset) : this.updateVisualElementAxis(axis, point);
  };
  VisualElementDragControls2.prototype.updateAxisMotionValue = function(axis, offset) {
    var axisValue = this.getAxisMotionValue(axis);
    if (!offset || !axisValue)
      return;
    var nextValue = this.originPoint[axis] + offset[axis];
    var update2 = this.constraints ? applyConstraints(nextValue, this.constraints[axis], this.elastic[axis]) : nextValue;
    axisValue.set(update2);
  };
  VisualElementDragControls2.prototype.updateVisualElementAxis = function(axis, point) {
    var _a;
    var axisLayout = this.visualElement.getLayoutState().layout[axis];
    var axisLength = axisLayout.max - axisLayout.min;
    var axisProgress = this.cursorProgress[axis];
    var min = calcConstrainedMinPoint(point[axis], axisLength, axisProgress, (_a = this.constraints) === null || _a === void 0 ? void 0 : _a[axis], this.elastic[axis]);
    this.visualElement.setProjectionTargetAxis(axis, min, min + axisLength);
  };
  VisualElementDragControls2.prototype.setProps = function(_a) {
    var _b = _a.drag, drag2 = _b === void 0 ? false : _b, _c = _a.dragDirectionLock, dragDirectionLock = _c === void 0 ? false : _c, _d = _a.dragPropagation, dragPropagation = _d === void 0 ? false : _d, _e = _a.dragConstraints, dragConstraints = _e === void 0 ? false : _e, _f = _a.dragElastic, dragElastic = _f === void 0 ? defaultElastic : _f, _g = _a.dragMomentum, dragMomentum = _g === void 0 ? true : _g, remainingProps = __rest(_a, ["drag", "dragDirectionLock", "dragPropagation", "dragConstraints", "dragElastic", "dragMomentum"]);
    this.props = __assign({
      drag: drag2,
      dragDirectionLock,
      dragPropagation,
      dragConstraints,
      dragElastic,
      dragMomentum
    }, remainingProps);
  };
  VisualElementDragControls2.prototype.getAxisMotionValue = function(axis) {
    var _a = this.props, layout2 = _a.layout, layoutId = _a.layoutId;
    var dragKey = "_drag" + axis.toUpperCase();
    if (this.props[dragKey]) {
      return this.props[dragKey];
    } else if (!layout2 && layoutId === void 0) {
      return this.visualElement.getValue(axis, 0);
    }
  };
  VisualElementDragControls2.prototype.isLayoutDrag = function() {
    return !this.getAxisMotionValue("x");
  };
  VisualElementDragControls2.prototype.isExternalDrag = function() {
    var _a = this.props, _dragX = _a._dragX, _dragY = _a._dragY;
    return _dragX || _dragY;
  };
  VisualElementDragControls2.prototype.animateDragEnd = function(velocity) {
    var _this = this;
    var _a = this.props, drag2 = _a.drag, dragMomentum = _a.dragMomentum, dragElastic = _a.dragElastic, dragTransition = _a.dragTransition;
    var isRelative = convertToRelativeProjection(this.visualElement, this.isLayoutDrag() && !this.isExternalDrag());
    var constraints = this.constraints || {};
    if (isRelative && Object.keys(constraints).length && this.isLayoutDrag()) {
      var projectionParent = this.visualElement.getProjectionParent();
      if (projectionParent) {
        var relativeConstraints_1 = calcRelativeOffset(projectionParent.projection.targetFinal, constraints);
        eachAxis(function(axis) {
          var _a2 = relativeConstraints_1[axis], min = _a2.min, max = _a2.max;
          constraints[axis] = {
            min: isNaN(min) ? void 0 : min,
            max: isNaN(max) ? void 0 : max
          };
        });
      }
    }
    var momentumAnimations = eachAxis(function(axis) {
      var _a2;
      if (!shouldDrag(axis, drag2, _this.currentDirection)) {
        return;
      }
      var transition = (_a2 = constraints === null || constraints === void 0 ? void 0 : constraints[axis]) !== null && _a2 !== void 0 ? _a2 : {};
      var bounceStiffness = dragElastic ? 200 : 1e6;
      var bounceDamping = dragElastic ? 40 : 1e7;
      var inertia2 = __assign(__assign({
        type: "inertia",
        velocity: dragMomentum ? velocity[axis] : 0,
        bounceStiffness,
        bounceDamping,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10
      }, dragTransition), transition);
      return _this.getAxisMotionValue(axis) ? _this.startAxisValueAnimation(axis, inertia2) : _this.visualElement.startLayoutAnimation(axis, inertia2, isRelative);
    });
    return Promise.all(momentumAnimations).then(function() {
      var _a2, _b;
      (_b = (_a2 = _this.props).onDragTransitionEnd) === null || _b === void 0 ? void 0 : _b.call(_a2);
    });
  };
  VisualElementDragControls2.prototype.stopMotion = function() {
    var _this = this;
    eachAxis(function(axis) {
      var axisValue = _this.getAxisMotionValue(axis);
      axisValue ? axisValue.stop() : _this.visualElement.stopLayoutAnimation();
    });
  };
  VisualElementDragControls2.prototype.startAxisValueAnimation = function(axis, transition) {
    var axisValue = this.getAxisMotionValue(axis);
    if (!axisValue)
      return;
    var currentValue = axisValue.get();
    axisValue.set(currentValue);
    axisValue.set(currentValue);
    return startAnimation(axis, axisValue, 0, transition);
  };
  VisualElementDragControls2.prototype.scalePoint = function() {
    var _this = this;
    var _a = this.props, drag2 = _a.drag, dragConstraints = _a.dragConstraints;
    if (!isRefObject(dragConstraints) || !this.constraintsBox)
      return;
    this.stopMotion();
    var boxProgress = { x: 0, y: 0 };
    eachAxis(function(axis) {
      boxProgress[axis] = calcOrigin$1(_this.visualElement.projection.target[axis], _this.constraintsBox[axis]);
    });
    this.updateConstraints(function() {
      eachAxis(function(axis) {
        if (!shouldDrag(axis, drag2, null))
          return;
        var _a2 = calcPositionFromProgress(_this.visualElement.projection.target[axis], _this.constraintsBox[axis], boxProgress[axis]), min = _a2.min, max = _a2.max;
        _this.visualElement.setProjectionTargetAxis(axis, min, max);
      });
    });
    setTimeout(flushLayout, 1);
  };
  VisualElementDragControls2.prototype.updateConstraints = function(onReady) {
    var _this = this;
    this.cancelLayout = batchLayout(function(read, write) {
      var ancestors = collectProjectingAncestors(_this.visualElement);
      write(function() {
        return ancestors.forEach(function(element) {
          return element.resetTransform();
        });
      });
      read(function() {
        return updateLayoutMeasurement(_this.visualElement);
      });
      write(function() {
        return ancestors.forEach(function(element) {
          return element.restoreTransform();
        });
      });
      read(function() {
        _this.resolveDragConstraints();
      });
      if (onReady)
        write(onReady);
    });
  };
  VisualElementDragControls2.prototype.mount = function(visualElement2) {
    var _this = this;
    var element = visualElement2.getInstance();
    var stopPointerListener = addPointerEvent(element, "pointerdown", function(event) {
      var _a = _this.props, drag2 = _a.drag, _b = _a.dragListener, dragListener = _b === void 0 ? true : _b;
      drag2 && dragListener && _this.start(event);
    });
    var stopResizeListener = addDomEvent(window, "resize", function() {
      _this.scalePoint();
    });
    var stopLayoutUpdateListener = visualElement2.onLayoutUpdate(function() {
      if (_this.isDragging) {
        _this.resolveDragConstraints();
      }
    });
    var prevDragCursor = visualElement2.prevDragCursor;
    if (prevDragCursor) {
      this.start(lastPointerEvent, { cursorProgress: prevDragCursor });
    }
    return function() {
      stopPointerListener === null || stopPointerListener === void 0 ? void 0 : stopPointerListener();
      stopResizeListener === null || stopResizeListener === void 0 ? void 0 : stopResizeListener();
      stopLayoutUpdateListener === null || stopLayoutUpdateListener === void 0 ? void 0 : stopLayoutUpdateListener();
      _this.cancelDrag();
    };
  };
  return VisualElementDragControls2;
}();
function shouldDrag(direction, drag2, currentDirection) {
  return (drag2 === true || drag2 === direction) && (currentDirection === null || currentDirection === direction);
}
function getCurrentDirection(offset, lockThreshold) {
  if (lockThreshold === void 0) {
    lockThreshold = 10;
  }
  var direction = null;
  if (Math.abs(offset.y) > lockThreshold) {
    direction = "y";
  } else if (Math.abs(offset.x) > lockThreshold) {
    direction = "x";
  }
  return direction;
}
var UseDrag = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $mcc, $$unsubscribe_mcc;
  let { visualElement: visualElement2, props, isCustom } = $$props;
  const mcc = getContext(MotionConfigContext) || MotionConfigContext(isCustom);
  $$unsubscribe_mcc = subscribe(mcc, (value) => $mcc = value);
  let dragControls = new VisualElementDragControls({ visualElement: visualElement2 });
  let cleanup;
  const dragEffect = () => {
    if (cleanup) {
      cleanup();
    }
    if (groupDragControls) {
      cleanup = groupDragControls.subscribe(dragControls);
    }
  };
  let { dragControls: groupDragControls } = props;
  let { transformPagePoint } = get_store_value(mcc);
  dragControls.setProps({ ...props, transformPagePoint });
  onDestroy(() => {
    if (cleanup) {
      cleanup();
    }
  });
  if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0)
    $$bindings.visualElement(visualElement2);
  if ($$props.props === void 0 && $$bindings.props && props !== void 0)
    $$bindings.props(props);
  if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0)
    $$bindings.isCustom(isCustom);
  ({ dragControls: groupDragControls } = props);
  ({ transformPagePoint } = $mcc);
  {
    dragControls.setProps({ ...props, transformPagePoint });
  }
  {
    dragEffect();
  }
  $$unsubscribe_mcc();
  return `${slots.default ? slots.default({}) : ``}`;
});
var drag = {
  pan: UsePanGesture,
  drag: UseDrag
};
function pixelsToPercent(pixels, axis) {
  return pixels / (axis.max - axis.min) * 100;
}
function correctBorderRadius(latest, _layoutState, _a) {
  var target = _a.target;
  if (typeof latest === "string") {
    if (px.test(latest)) {
      latest = parseFloat(latest);
    } else {
      return latest;
    }
  }
  var x = pixelsToPercent(latest, target.x);
  var y = pixelsToPercent(latest, target.y);
  return x + "% " + y + "%";
}
var varToken = "_$css";
function correctBoxShadow(latest, _a) {
  var delta2 = _a.delta, treeScale = _a.treeScale;
  var original = latest;
  var containsCSSVariables = latest.includes("var(");
  var cssVariables = [];
  if (containsCSSVariables) {
    latest = latest.replace(cssVariableRegex, function(match) {
      cssVariables.push(match);
      return varToken;
    });
  }
  var shadow = complex.parse(latest);
  if (shadow.length > 5)
    return original;
  var template2 = complex.createTransformer(latest);
  var offset = typeof shadow[0] !== "number" ? 1 : 0;
  var xScale = delta2.x.scale * treeScale.x;
  var yScale = delta2.y.scale * treeScale.y;
  shadow[0 + offset] /= xScale;
  shadow[1 + offset] /= yScale;
  var averageScale = mix(xScale, yScale, 0.5);
  if (typeof shadow[2 + offset] === "number")
    shadow[2 + offset] /= averageScale;
  if (typeof shadow[3 + offset] === "number")
    shadow[3 + offset] /= averageScale;
  var output = template2(shadow);
  if (containsCSSVariables) {
    var i_1 = 0;
    output = output.replace(varToken, function() {
      var cssVariable = cssVariables[i_1];
      i_1++;
      return cssVariable;
    });
  }
  return output;
}
var borderCorrectionDefinition = {
  process: correctBorderRadius
};
({
  borderRadius: __assign(__assign({}, borderCorrectionDefinition), { applyTo: [
    "borderTopLeftRadius",
    "borderTopRightRadius",
    "borderBottomLeftRadius",
    "borderBottomRightRadius"
  ] }),
  borderTopLeftRadius: borderCorrectionDefinition,
  borderTopRightRadius: borderCorrectionDefinition,
  borderBottomLeftRadius: borderCorrectionDefinition,
  borderBottomRightRadius: borderCorrectionDefinition,
  boxShadow: {
    process: correctBoxShadow
  }
});
var Animate = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { visualElement: visualElement2, layout: layout2 = void 0, safeToRemove } = $$props;
  let stopAxisAnimation = { x: void 0, y: void 0 };
  let unsubLayoutReady;
  onDestroy(() => {
    unsubLayoutReady();
    eachAxis((axis) => {
      var _a;
      return (_a = stopAxisAnimation[axis]) == null ? void 0 : _a.call(stopAxisAnimation);
    });
  });
  if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0)
    $$bindings.visualElement(visualElement2);
  if ($$props.layout === void 0 && $$bindings.layout && layout2 !== void 0)
    $$bindings.layout(layout2);
  if ($$props.safeToRemove === void 0 && $$bindings.safeToRemove && safeToRemove !== void 0)
    $$bindings.safeToRemove(safeToRemove);
  return ``;
});
var AnimateLayoutContextProvider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $presence, $$unsubscribe_presence;
  let { visualElement: visualElement2, props, isCustom } = $$props;
  let { layout: layout2 } = props;
  const presence = usePresence(isCustom);
  $$unsubscribe_presence = subscribe(presence, (value) => $presence = value);
  if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0)
    $$bindings.visualElement(visualElement2);
  if ($$props.props === void 0 && $$bindings.props && props !== void 0)
    $$bindings.props(props);
  if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0)
    $$bindings.isCustom(isCustom);
  ({ layout: layout2 } = props);
  $$unsubscribe_presence();
  return `${validate_component(Animate, "Animate").$$render($$result, {
    visualElement: visualElement2,
    layout: layout2,
    safeToRemove: $presence[1]
  }, {}, {})}`;
});
var Measure = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { visualElement: visualElement2, syncLayout, framerSyncLayout, update: update2 } = $$props;
  const scaleCorrectionContext = getContext(ScaleCorrectionContext);
  const scaleCorrectionParentContext = getContext(ScaleCorrectionParentContext);
  let updated = false;
  const updater = (nc = false) => {
    if (updated) {
      return null;
    }
    updated = true;
    get_store_value(scaleCorrectionContext).forEach((v) => {
      var _a;
      (_a = v.updater) == null ? void 0 : _a.call(v, true);
    });
    if (isSharedLayout(syncLayout)) {
      syncLayout.syncUpdate();
    } else {
      snapshotViewportBox(visualElement2, nc);
      syncLayout.add(visualElement2);
    }
    return null;
  };
  const afterU = (nc = false) => {
    updated = false;
    const scc = get_store_value(scaleCorrectionContext);
    scc.forEach((v, i) => {
      var _a;
      (_a = v.afterU) == null ? void 0 : _a.call(v, true);
    });
    if (!isSharedLayout(syncLayout)) {
      syncLayout.flush();
    }
  };
  scaleCorrectionParentContext.update((v) => v.concat([{ updater, afterU }]));
  if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0)
    $$bindings.visualElement(visualElement2);
  if ($$props.syncLayout === void 0 && $$bindings.syncLayout && syncLayout !== void 0)
    $$bindings.syncLayout(syncLayout);
  if ($$props.framerSyncLayout === void 0 && $$bindings.framerSyncLayout && framerSyncLayout !== void 0)
    $$bindings.framerSyncLayout(framerSyncLayout);
  if ($$props.update === void 0 && $$bindings.update && update2 !== void 0)
    $$bindings.update(update2);
  update2 !== void 0 && updater(update2);
  return ``;
});
var MeasureContextProvider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let update2;
  let $syncLayout, $$unsubscribe_syncLayout;
  let $framerSyncLayout, $$unsubscribe_framerSyncLayout;
  let { visualElement: visualElement2, props, isCustom } = $$props;
  const syncLayout = getContext(SharedLayoutContext) || SharedLayoutContext(isCustom);
  $$unsubscribe_syncLayout = subscribe(syncLayout, (value) => $syncLayout = value);
  const framerSyncLayout = getContext(FramerTreeLayoutContext) || FramerTreeLayoutContext();
  $$unsubscribe_framerSyncLayout = subscribe(framerSyncLayout, (value) => $framerSyncLayout = value);
  if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0)
    $$bindings.visualElement(visualElement2);
  if ($$props.props === void 0 && $$bindings.props && props !== void 0)
    $$bindings.props(props);
  if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0)
    $$bindings.isCustom(isCustom);
  ({ update: update2 } = props);
  $$unsubscribe_syncLayout();
  $$unsubscribe_framerSyncLayout();
  return `${validate_component(Measure, "Measure").$$render($$result, {
    syncLayout: $syncLayout,
    framerSyncLayout: $framerSyncLayout,
    visualElement: visualElement2,
    update: update2
  }, {}, {})}`;
});
var layoutAnimations = {
  measureLayout: MeasureContextProvider,
  layoutAnimation: AnimateLayoutContextProvider
};
var AnimationState = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { visualElement: visualElement2, props } = $$props;
  let { animate: animate2 } = props;
  if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0)
    $$bindings.visualElement(visualElement2);
  if ($$props.props === void 0 && $$bindings.props && props !== void 0)
    $$bindings.props(props);
  ({ animate: animate2 } = props);
  {
    {
      visualElement2.animationState = visualElement2.animationState || createAnimationState(visualElement2);
    }
  }
  {
    if (isAnimationControls(animate2)) {
      tick().then(() => animate2.subscribe(visualElement2));
    }
  }
  return ``;
});
var Exit = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let custom;
  let $presence, $$unsubscribe_presence;
  let $presenceContext, $$unsubscribe_presenceContext;
  let { props, visualElement: visualElement2, isCustom } = $$props;
  const presenceContext = getContext(PresenceContext) || PresenceContext(isCustom);
  $$unsubscribe_presenceContext = subscribe(presenceContext, (value) => $presenceContext = value);
  const presence = usePresence(isCustom);
  $$unsubscribe_presence = subscribe(presence, (value) => $presence = value);
  const effect = (pres) => {
    var _a, _b;
    const [isPresent2, onExitComplete] = pres;
    const animation = (_b = visualElement2.animationState) == null ? void 0 : _b.setActive(AnimationType.Exit, !isPresent2, {
      custom: (_a = $presenceContext == null ? void 0 : $presenceContext.custom) != null ? _a : custom
    });
    !isPresent2 && (animation == null ? void 0 : animation.then(onExitComplete));
    return "";
  };
  if ($$props.props === void 0 && $$bindings.props && props !== void 0)
    $$bindings.props(props);
  if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0)
    $$bindings.visualElement(visualElement2);
  if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0)
    $$bindings.isCustom(isCustom);
  ({ custom } = props);
  {
    effect($presence);
  }
  $$unsubscribe_presence();
  $$unsubscribe_presenceContext();
  return `${slots.default ? slots.default({}) : ``}`;
});
var animations = {
  animation: AnimationState,
  exit: Exit
};
var featureBundle = {
  ...animations,
  ...gestureAnimations,
  ...drag,
  ...layoutAnimations
};
var motion = /* @__PURE__ */ createMotionClass(featureBundle);
var lowercaseSVGElements = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "svg",
  "switch",
  "symbol",
  "text",
  "tspan",
  "use",
  "view"
];
function isSVGComponent(Component) {
  if (typeof Component !== "string" || Component.includes("-")) {
    return false;
  } else if (lowercaseSVGElements.indexOf(Component) > -1 || /[A-Z]/.test(Component)) {
    return true;
  }
  return false;
}
var Transformer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["___tag", "motion"]);
  let { ___tag = "div" } = $$props;
  let { motion: motion2 } = $$props;
  let container;
  if ($$props.___tag === void 0 && $$bindings.___tag && ___tag !== void 0)
    $$bindings.___tag(___tag);
  if ($$props.motion === void 0 && $$bindings.motion && motion2 !== void 0)
    $$bindings.motion(motion2);
  return `<div${spread([escape_object($$restProps)])}${add_attribute("this", container, 0)}>${slots.default ? slots.default({}) : ``}</div>`;
});
var M = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["___tag"]);
  let { ___tag } = $$props;
  if ($$props.___tag === void 0 && $$bindings.___tag && ___tag !== void 0)
    $$bindings.___tag(___tag);
  return `${validate_component(Motion, "Motion").$$render($$result, Object.assign($$restProps), {}, {
    default: ({ props, motion: motion2 }) => `${validate_component(Transformer, "T").$$render($$result, Object.assign({ motion: motion2 }, { ___tag }, props), {}, {
      default: () => `${slots.default ? slots.default({}) : ``}`
    })}`
  })}`;
});
function createMotionProxy(defaultFeatures) {
  return new Proxy({}, {
    get: function(_target, key) {
      let type = key;
      if (key.slice(0, 1) === key.slice(0, 1).toLowerCase()) {
        type = isSVGComponent(key) ? "SVG" : "DOM";
      }
      const ret = new Proxy(M, {
        construct(target, args) {
          if (!args || !args[0]) {
            args.push({});
          }
          if (!args[0].props) {
            args[0].props = { ___tag: key, isSVG: type === "SVG" };
          } else {
            args[0].props.___tag = key;
            args[0].props.isSVG = type === "SVG";
          }
          return new target(...args);
        }
      });
      return ret;
    }
  });
}
createMotionProxy();
var Sm_primary_text_only = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { label } = $$props;
  createEventDispatcher();
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  return `<div class="${"mx-auto w-120 text-md text-center text-primary-main font-bold hover:text-secondary-main cursor-pointer"}"><h1>${escape(label)}</h1></div>`;
});
var css$b = {
  code: '.svelte-dosqm2{overflow:hidden}:root{--img_url:url("")}#wrapper.svelte-dosqm2{position:relative}#info-wrapper.svelte-dosqm2{position:absolute;bottom:0}#info-window.svelte-dosqm2{position:absolute;top:0;left:0;z-index:50;backdrop-filter:blur(4px)}#horizontal-spacer.svelte-dosqm2{position:absolute;top:0;z-index:20}#image-container.svelte-dosqm2{height:100%;width:100%;cursor:pointer;background-image:var(--img_url);background-position:center;background-repeat:no-repeat;background-size:cover}#image-container-small.svelte-dosqm2{cursor:pointer;background-image:var(--img_url);background-position:center;background-repeat:no-repeat;background-size:cover}',
  map: '{"version":3,"file":"bio-dark.svelte","sources":["bio-dark.svelte"],"sourcesContent":["<script>\\n  //LIBS\\n  import { Motion } from \\"svelte-motion\\";\\n  import { fly } from \\"svelte/transition\\";\\n  import { onMount } from \\"svelte\\";\\n  import { scale } from \\"svelte/transition\\";\\n  import Icon from \\"@iconify/svelte\\";\\n\\n  //COMPONENTS\\n  import Button from \\"../buttons/sm-primary-text-only.svelte\\";\\n\\n  //PROPS\\n  export let name, role, more, bio, img_url;\\n  //console.log(img_url);\\n\\n  let isInfoVisible = false;\\n\\n  const handleInfoVisibility = (e) => {\\n    console.log(\\"state\\", e.detail.state);\\n    isInfoVisible = e.detail.state;\\n  };\\n\\n  onMount(async () => {\\n    let root = document.querySelector(\\":root\\");\\n    root.style.setProperty(\\"--img_url\\", \\"url(\\" + img_url + \\")\\");\\n  });\\n<\/script>\\n\\n{#if isInfoVisible}\\n  <div\\n    transition:fly={{ x: 900, duration: 1000 }}\\n    id=\\"info-window\\"\\n    class=\\"w-screen h-full bg-secondary-dark-alpha\\"\\n  >\\n    <div class=\\"flex w-full h-72 justify-end items-center p-64\\">\\n      <div\\n        on:click={() => {\\n          isInfoVisible = false;\\n        }}\\n        class=\\"text-2xl text-primary-light hover:text-secondary-main cursor-pointer\\"\\n      >\\n        <Icon icon=\\"ant-design:close-square-outlined\\" />\\n      </div>\\n    </div>\\n    <div class=\\"flex px-120\\">\\n      <div class=\\"w-75 h-800 px-72\\">\\n        <div id=\\"image-container-small\\" class=\\"w-full h-75\\" />\\n        <div class=\\"text-2xl font-bold text-primary-light pt-32\\">\\n          <h1>{name}</h1>\\n        </div>\\n        <div class=\\"text-lg font-bold text-primary-light-variant pt-8\\">\\n          <h1>{role}</h1>\\n        </div>\\n      </div>\\n      <div class=\\"w-100 px-72 text-lg text-on-background-variant\\">\\n        <p>{bio}</p>\\n      </div>\\n    </div>\\n  </div>\\n{/if}\\n\\n<div id=\\"wrapper\\" class=\\"w-full h-75 gradient-bg-secondary-main rounded-lg\\">\\n  <div\\n    id=\\"horizontal-spacer\\"\\n    class=\\"w-full h-24 gradient-blue-to-green-light-diagonal\\"\\n  />\\n\\n  <Motion whileHover={{ scale: 1.1, transition: { duration: 0.5 } }} let:motion>\\n    <div id=\\"image-container\\" transition:scale={{ start: 1.5 }} use:motion />\\n  </Motion>\\n\\n  <div\\n    id=\\"info-wrapper\\"\\n    class=\\"space-y-4 py-24 w-full gradient-bg-secondary-main\\"\\n  >\\n    <div class=\\"text-2lg text-center text-primary-light font-bold\\">\\n      <h1>{name}</h1>\\n    </div>\\n    <div class=\\"text-md text-center text-primary-light-variant font-bold\\">\\n      <p>{role}</p>\\n    </div>\\n    <div>\\n      <Button on:infovisible={handleInfoVisibility} label={more} />\\n    </div>\\n  </div>\\n</div>\\n\\n<style>\\n  * {\\n    overflow: hidden;\\n  }\\n\\n  :root {\\n    --img_url: url(\\"\\");\\n  }\\n\\n  #wrapper {\\n    position: relative;\\n  }\\n\\n  #info-wrapper {\\n    position: absolute;\\n    bottom: 0;\\n  }\\n\\n  #info-window {\\n    position: absolute;\\n    top: 0;\\n    left: 0;\\n    z-index: 50;\\n    backdrop-filter: blur(4px);\\n  }\\n\\n  #horizontal-spacer {\\n    position: absolute;\\n    top: 0;\\n    z-index: 20;\\n  }\\n\\n  #image-container {\\n    height: 100%;\\n    width: 100%;\\n    cursor: pointer;\\n    background-image: var(--img_url);\\n    background-position: center;\\n    background-repeat: no-repeat;\\n    background-size: cover;\\n  }\\n\\n  #image-container-small {\\n    cursor: pointer;\\n    background-image: var(--img_url);\\n    background-position: center;\\n    background-repeat: no-repeat;\\n    background-size: cover;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAwFE,cAAE,CAAC,AACD,QAAQ,CAAE,MAAM,AAClB,CAAC,AAED,KAAK,AAAC,CAAC,AACL,SAAS,CAAE,OAAO,AACpB,CAAC,AAED,QAAQ,cAAC,CAAC,AACR,QAAQ,CAAE,QAAQ,AACpB,CAAC,AAED,aAAa,cAAC,CAAC,AACb,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,CAAC,AACX,CAAC,AAED,YAAY,cAAC,CAAC,AACZ,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,OAAO,CAAE,EAAE,CACX,eAAe,CAAE,KAAK,GAAG,CAAC,AAC5B,CAAC,AAED,kBAAkB,cAAC,CAAC,AAClB,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,OAAO,CAAE,EAAE,AACb,CAAC,AAED,gBAAgB,cAAC,CAAC,AAChB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,OAAO,CACf,gBAAgB,CAAE,IAAI,SAAS,CAAC,CAChC,mBAAmB,CAAE,MAAM,CAC3B,iBAAiB,CAAE,SAAS,CAC5B,eAAe,CAAE,KAAK,AACxB,CAAC,AAED,sBAAsB,cAAC,CAAC,AACtB,MAAM,CAAE,OAAO,CACf,gBAAgB,CAAE,IAAI,SAAS,CAAC,CAChC,mBAAmB,CAAE,MAAM,CAC3B,iBAAiB,CAAE,SAAS,CAC5B,eAAe,CAAE,KAAK,AACxB,CAAC"}'
};
var Bio_dark = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { name, role, more, bio, img_url } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0)
    $$bindings.role(role);
  if ($$props.more === void 0 && $$bindings.more && more !== void 0)
    $$bindings.more(more);
  if ($$props.bio === void 0 && $$bindings.bio && bio !== void 0)
    $$bindings.bio(bio);
  if ($$props.img_url === void 0 && $$bindings.img_url && img_url !== void 0)
    $$bindings.img_url(img_url);
  $$result.css.add(css$b);
  return `${``}

<div id="${"wrapper"}" class="${"w-full h-75 gradient-bg-secondary-main rounded-lg svelte-dosqm2"}"><div id="${"horizontal-spacer"}" class="${"w-full h-24 gradient-blue-to-green-light-diagonal svelte-dosqm2"}"></div>

  ${validate_component(motion, "Motion").$$render($$result, {
    whileHover: {
      scale: 1.1,
      transition: { duration: 0.5 }
    }
  }, {}, {
    default: ({ motion: motion2 }) => `<div id="${"image-container"}" class="${"svelte-dosqm2"}"></div>`
  })}

  <div id="${"info-wrapper"}" class="${"space-y-4 py-24 w-full gradient-bg-secondary-main svelte-dosqm2"}"><div class="${"text-2lg text-center text-primary-light font-bold svelte-dosqm2"}"><h1 class="${"svelte-dosqm2"}">${escape(name)}</h1></div>
    <div class="${"text-md text-center text-primary-light-variant font-bold svelte-dosqm2"}"><p class="${"svelte-dosqm2"}">${escape(role)}</p></div>
    <div class="${"svelte-dosqm2"}">${validate_component(Sm_primary_text_only, "Button").$$render($$result, { label: more }, {}, {})}</div></div>
</div>`;
});
var Section_2$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { contents } = $$props;
  if ($$props.contents === void 0 && $$bindings.contents && contents !== void 0)
    $$bindings.contents(contents);
  return `<div class="${"flex items-center space-x-12 w-full mt-72 text-2xl font-bold text-primary-light px-168"}">${validate_component(Icon, "Icon").$$render($$result, { icon: "fluent:people-team-24-regular" }, {}, {})}
  <h1 class="${"text-on-background-variant"}">${escape(contents.title)}</h1></div>

<div class="${"relative"}">${validate_component(Section_matrix, "SectionContainer").$$render($$result, {}, {}, {
    default: () => `${contents !== void 0 ? `${each(contents.section_2_data, (card) => `<div class="${"flex justify-center w-full h-640"}">${validate_component(Bio_dark, "CardBioDark").$$render($$result, {
      name: card.name,
      role: card.role,
      more: card.more,
      bio: card.bio,
      img_url: card.img_url
    }, {}, {})}
        </div>`)}` : ``}`
  })}</div>`;
});
var Section_3$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { contents } = $$props;
  if ($$props.contents === void 0 && $$bindings.contents && contents !== void 0)
    $$bindings.contents(contents);
  return `<div class="${"flex items-center space-x-12 w-full mt-72 text-2xl font-bold text-primary-light px-168"}">${validate_component(Icon, "Icon").$$render($$result, { icon: "bx:bx-comment-detail" }, {}, {})}
  <h1 class="${"text-on-background-variant"}">${escape(contents.title)}</h1></div>
<div class="${"relative"}">${validate_component(Section_matrix, "SectionContainer").$$render($$result, {}, {}, {
    default: () => `${contents !== void 0 ? `${each(contents.section_3_data, (card) => `<div class="${"flex justify-center w-full h-640"}">${validate_component(Bio_dark, "CardBioDark").$$render($$result, {
      name: card.name,
      role: card.role,
      more: card.more,
      bio: card.bio,
      img_url: card.img_url
    }, {}, {})}
        </div>`)}` : ``}`
  })}</div>`;
});
var css$a = {
  code: '.svelte-1mi48bf{overflow:hidden}:root{--image_url:url("https://previews.123rf.com/images/kinwun/kinwun1703/kinwun170300510/74707872-equipment-and-piping-as-found-inside-of-industrial-thermal-power-plant.jpg")}#wrapper.svelte-1mi48bf{position:relative;z-index:1;background-image:var(--image_url);background-repeat:no-repeat;background-position:center;background-size:cover}#gradient.svelte-1mi48bf{position:absolute;left:0;top:0;width:100%;height:100%;z-index:-1;background:linear-gradient(\n      to bottom right,\n      #0b1d2ec4 25%,\n      rgba(27, 50, 56, 0.493)\n    )}',
  map: '{"version":3,"file":"section-4.svelte","sources":["section-4.svelte"],"sourcesContent":["<script>\\n  //LIBS\\n  import { onMount } from \\"svelte\\";\\n\\n  //CONTAINERS\\n  import SectionContainer from \\"../../containers/section-one-col-center.svelte\\";\\n\\n  //PROPS\\n  export let contents;\\n  console.log(contents);\\n\\n  onMount(async () => {\\n    let root = document.querySelector(\\":root\\");\\n    root.style.setProperty(\\"--image_url\\", \\"url(\\" + contents.image_url + \\")\\");\\n  });\\n<\/script>\\n\\n<SectionContainer>\\n  <div\\n    id=\\"wrapper\\"\\n    class=\\"px-148 py-240 text-center text-2xl font-bold text-on-background-variant leading-lg\\"\\n  >\\n    <h1>{contents.headline}</h1>\\n    <div id=\\"gradient\\" class=\\"\\" />\\n  </div>\\n</SectionContainer>\\n\\n<style>\\n  * {\\n    overflow: hidden;\\n  }\\n\\n  :root {\\n    --image_url: url(\\"https://previews.123rf.com/images/kinwun/kinwun1703/kinwun170300510/74707872-equipment-and-piping-as-found-inside-of-industrial-thermal-power-plant.jpg\\");\\n  }\\n\\n  #wrapper {\\n    position: relative;\\n    z-index: 1;\\n    background-image: var(--image_url);\\n    background-repeat: no-repeat;\\n    background-position: center;\\n    background-size: cover;\\n  }\\n\\n  #gradient {\\n    position: absolute;\\n    left: 0;\\n    top: 0;\\n    width: 100%;\\n    height: 100%;\\n    z-index: -1;\\n    background: linear-gradient(\\n      to bottom right,\\n      #0b1d2ec4 25%,\\n      rgba(27, 50, 56, 0.493)\\n    );\\n  }\\n</style>\\n"],"names":[],"mappings":"AA4BE,eAAE,CAAC,AACD,QAAQ,CAAE,MAAM,AAClB,CAAC,AAED,KAAK,AAAC,CAAC,AACL,WAAW,CAAE,8JAA8J,AAC7K,CAAC,AAED,QAAQ,eAAC,CAAC,AACR,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CAAC,CACV,gBAAgB,CAAE,IAAI,WAAW,CAAC,CAClC,iBAAiB,CAAE,SAAS,CAC5B,mBAAmB,CAAE,MAAM,CAC3B,eAAe,CAAE,KAAK,AACxB,CAAC,AAED,SAAS,eAAC,CAAC,AACT,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,EAAE,CACX,UAAU,CAAE;MACV,EAAE,CAAC,MAAM,CAAC,KAAK,CAAC;MAChB,SAAS,CAAC,GAAG,CAAC;MACd,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,KAAK,CAAC;KACxB,AACH,CAAC"}'
};
var Section_4 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { contents } = $$props;
  console.log(contents);
  if ($$props.contents === void 0 && $$bindings.contents && contents !== void 0)
    $$bindings.contents(contents);
  $$result.css.add(css$a);
  return `${validate_component(Section_one_col_center, "SectionContainer").$$render($$result, {}, {}, {
    default: () => `<div id="${"wrapper"}" class="${"px-148 py-240 text-center text-2xl font-bold text-on-background-variant leading-lg svelte-1mi48bf"}"><h1 class="${"svelte-1mi48bf"}">${escape(contents.headline)}</h1>
    <div id="${"gradient"}" class="${" svelte-1mi48bf"}"></div></div>`
  })}`;
});
var Contact_section = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Section_one_col_center, "SectionContainer").$$render($$result, {}, {}, {
    default: () => `<div class="${"flex flex-col justify-center w-full text-center py-120"}"><h1 class="${"text-2xl font-bold text-on-background-variant mb-56"}">${escape(data.headline.slice(0, data.start))}
      <span class="${"text-primary-main font-bold"}">${escape(data.headline.slice(data.start, data.end))}</span>
      ${escape(data.headline.slice(data.end))}</h1>
    <div class="${"w-auto mx-auto"}">${validate_component(Lg_primary_icon_fill, "Button").$$render($$result, {
      icon_label: "ic:outline-eco",
      label: "Get Started",
      url: "/contact"
    }, {}, {})}</div></div>`
  })}`;
});
var Leadership = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_cms_url;
  $$unsubscribe_cms_url = subscribe(cms_url, (value) => value);
  let heroData;
  let section1Data, section2Data, section3Data, section4Data;
  let contactData;
  $$unsubscribe_cms_url();
  return `${$$result.head += `${$$result.title = `<title>RENUE</title>`, ""}`, ""}

${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop$1);
      return `
  <h1 class="${"text-secondary text-8xl mt-72"}">Loading...</h1>
`;
    }
    return function(data) {
      return `
  ${data !== void 0 ? `${validate_component(Hero_section$2, "HeroSection").$$render($$result, { contents: data }, {}, {})}` : ``}
`;
    }(__value);
  }(heroData)}

${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop$1);
      return `
  <h1 class="${"text-secondary text-8xl mt-72"}">Loading...</h1>
`;
    }
    return function(data) {
      return `
  ${data !== void 0 ? `${validate_component(Section_1$2, "Section1").$$render($$result, { contents: data }, {}, {})}` : ``}
`;
    }(__value);
  }(section1Data)}

${validate_component(Spacer_line, "SpacerLine").$$render($$result, {}, {}, {})}

${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop$1);
      return `
  <h1 class="${"text-secondary text-8xl mt-72"}">Loading...</h1>
`;
    }
    return function(data) {
      return `
  ${data !== void 0 ? `${validate_component(Section_2$1, "Section2").$$render($$result, { contents: data }, {}, {})}` : ``}
`;
    }(__value);
  }(section2Data)}

${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop$1);
      return `
  <h1 class="${"text-secondary text-8xl mt-72"}">Loading...</h1>
`;
    }
    return function(data) {
      return `
  ${data !== void 0 ? `${validate_component(Section_3$1, "Section3").$$render($$result, { contents: data }, {}, {})}` : ``}
`;
    }(__value);
  }(section3Data)}



${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop$1);
      return `
  <h1 class="${"text-secondary text-8xl mt-72"}">Loading...</h1>
`;
    }
    return function(data) {
      return `
  ${data !== void 0 ? `${validate_component(Section_4, "Section4").$$render($$result, { contents: data }, {}, {})}` : ``}
`;
    }(__value);
  }(section4Data)}

${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop$1);
      return `
  <h1 class="${"text-secondary text-8xl mt-72"}">Loading...</h1>
`;
    }
    return function(data) {
      return `
  ${data !== void 0 ? `${validate_component(Contact_section, "ContactSection").$$render($$result, { data }, {}, {})}` : ``}
`;
    }(__value);
  }(contactData)}`;
});
var leadership = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Leadership
});
var css$9 = {
  code: "#main-container.svelte-fx0rbu{max-width:1920px;margin-left:auto;margin-right:auto}",
  map: '{"version":3,"file":"threejs.svelte","sources":["threejs.svelte"],"sourcesContent":["<main id=\\"main-container\\" class=\\"w-full gradient-blue-to-green-light-vertical\\">\\n  <slot />\\n</main>\\n\\n<style>\\n  #main-container {\\n    max-width: 1920px;\\n    margin-left: auto;\\n    margin-right: auto;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAKE,eAAe,cAAC,CAAC,AACf,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,IAAI,CACjB,YAAY,CAAE,IAAI,AACpB,CAAC"}'
};
var Threejs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$9);
  return `<main id="${"main-container"}" class="${"w-full gradient-blue-to-green-light-vertical svelte-fx0rbu"}">${slots.default ? slots.default({}) : ``}
</main>`;
});
var css$8 = {
  code: "div.svelte-lusfug{position:absolute;top:0;z-index:10}",
  map: '{"version":3,"file":"threejs-viewer.svelte","sources":["threejs-viewer.svelte"],"sourcesContent":["<script>\\n  import { onMount } from \\"svelte\\";\\n\\n  let e;\\n\\n  onMount(async () => {\\n    const { createScene } = await import(\\"./js/scene\\");\\n    createScene(e);\\n  });\\n<\/script>\\n\\n<canvas bind:this={e} />\\n<div\\n  id=\\"loader\\"\\n  class=\\"flex w-full h-full items-center justify-center text-4xl text-secondary-dark\\"\\n/>\\n\\n<style>\\n  div {\\n    position: absolute;\\n    top: 0;\\n    z-index: 10;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAkBE,GAAG,cAAC,CAAC,AACH,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,OAAO,CAAE,EAAE,AACb,CAAC"}'
};
var Threejs_viewer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let e;
  $$result.css.add(css$8);
  return `<canvas${add_attribute("this", e, 0)}></canvas>
<div id="${"loader"}" class="${"flex w-full h-full items-center justify-center text-4xl text-secondary-dark svelte-lusfug"}"></div>`;
});
var What_we_do = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Threejs, "ThreejsContainer").$$render($$result, {}, {}, {
    default: () => `${validate_component(Threejs_viewer, "ThreejsViewer").$$render($$result, {}, {}, {})}`
  })}`;
});
var whatWeDo = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": What_we_do
});
var Hero_section$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { contents } = $$props;
  if ($$props.contents === void 0 && $$bindings.contents && contents !== void 0)
    $$bindings.contents(contents);
  return `${validate_component(Hero_secondary, "HeroSecondary").$$render($$result, {
    headline: contents.headline,
    paragraph: contents.paragraph,
    image_url: contents.image_url
  }, {}, {})}`;
});
var css$7 = {
  code: ".svelte-1m1p432{overflow:hidden}",
  map: '{"version":3,"file":"section-1.svelte","sources":["section-1.svelte"],"sourcesContent":["<script>\\n  //LIBS\\n  import { fade } from \\"svelte/transition\\";\\n\\n  //CONTAINERS\\n  import SectionContainer from \\"../../containers/section-two-cols.svelte\\";\\n\\n  //PROPS\\n  export let contents;\\n\\n  let y;\\n<\/script>\\n\\n<svelte:window bind:scrollY={y} />\\n\\n<div id=\\"bg\\" class=\\"bg-background-light text-secondary-dark\\">\\n  <SectionContainer>\\n    <div\\n      class=\\"flex items-center justify-center w-full md:text-2xl md:leading-3xl text-left\\"\\n    >\\n      <div class=\\"w-100 h-full\\">\\n        <img src={contents.image_url} alt=\\"\\" />\\n      </div>\\n    </div>\\n    <div class=\\"flex items-center w-100 h-100 text-lg text-left\\">\\n      {#if y > 250}\\n        <h1 in:fade={{ duration: 600 }} out:fade class=\\"\\">\\n          {contents.paragraph}\\n        </h1>\\n      {/if}\\n    </div>\\n  </SectionContainer>\\n</div>\\n\\n<style>\\n  * {\\n    overflow: hidden;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAmCE,eAAE,CAAC,AACD,QAAQ,CAAE,MAAM,AAClB,CAAC"}'
};
var Section_1$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { contents } = $$props;
  if ($$props.contents === void 0 && $$bindings.contents && contents !== void 0)
    $$bindings.contents(contents);
  $$result.css.add(css$7);
  return `

<div id="${"bg"}" class="${"bg-background-light text-secondary-dark svelte-1m1p432"}">${validate_component(Section_two_cols, "SectionContainer").$$render($$result, {}, {}, {
    default: () => `<div class="${"flex items-center justify-center w-full md:text-2xl md:leading-3xl text-left svelte-1m1p432"}"><div class="${"w-100 h-full svelte-1m1p432"}"><img${add_attribute("src", contents.image_url, 0)} alt="${""}" class="${"svelte-1m1p432"}"></div></div>
    <div class="${"flex items-center w-100 h-100 text-lg text-left svelte-1m1p432"}">${``}</div>`
  })}
</div>`;
});
var css$6 = {
  code: ':root{--imgurl:""}.svelte-3u4xp6{overflow:hidden}#wrapper.svelte-3u4xp6{position:relative}#img-container.svelte-3u4xp6{width:1200px;height:720px;background-image:var(--imgurl);background-repeat:no-repeat;background-size:fit}#slide.svelte-3u4xp6{position:absolute;right:0;display:flex;height:auto;align-items:center;justify-content:center;z-index:10}#text-bar.svelte-3u4xp6{background-color:-webkit-linear-gradient(\n      rgb(82, 235, 255),\n      rgb(168, 255, 128)\n    );z-index:10}#title.svelte-3u4xp6{margin:auto;z-index:20}#overlay.svelte-3u4xp6{position:absolute;right:0;background:linear-gradient(\n      180deg,\n      #02161ba6,\n      #02161ba6 20%,\n      #000000a4 75%\n    )}',
  map: '{"version":3,"file":"interactive.svelte","sources":["interactive.svelte"],"sourcesContent":["<script>\\n  //LIBS\\n  import { onMount } from \\"svelte\\";\\n  import { fly, scale } from \\"svelte/transition\\";\\n  import Icon from \\"@iconify/svelte\\";\\n\\n  //PROPS\\n  export let contents;\\n\\n  let y;\\n\\n  onMount(async () => {\\n    await contents.forEach((item, i) => {\\n      let highlight = document.getElementById(item.id);\\n      highlight.style.visibility = \\"hidden\\";\\n\\n      if (item.visible == true) {\\n        let root = document.querySelector(\\":root\\");\\n        root.style.setProperty(\\"--imgurl\\", \\"url(\\" + item.imageUrl + \\")\\");\\n      }\\n    });\\n  });\\n\\n  const handleMouseEnter = async (item) => {\\n    let highlight = await document.getElementById(item);\\n    highlight.style.visibility = \\"visible\\";\\n\\n    await contents.forEach((interactiveItem, i) => {\\n      if (interactiveItem.id == item) {\\n        contents[i].visible = true;\\n        let root = document.querySelector(\\":root\\");\\n        root.style.setProperty(\\n          \\"--imgurl\\",\\n          \\"url(\\" + interactiveItem.imageUrl + \\")\\"\\n        );\\n      } else {\\n        contents[i].visible = false;\\n      }\\n    });\\n  };\\n\\n  const handleMouseLeave = async (item) => {\\n    // let highlight = document.getElementById(item);\\n    // highlight.style.visibility = \\"hidden\\";\\n  };\\n<\/script>\\n\\n<div\\n  id=\\"wrapper\\"\\n  class=\\"grid grid-flow-col grid-cols-5 w-full h-screen gradient-bg-semidark-secondary\\"\\n>\\n  <div class=\\"flex my-auto col-span-2 pl-148 text-4xl font-bold\\">\\n    <div class=\\"w-full space-y-24\\">\\n      {#each contents as item}\\n        <div\\n          class=\\"flex w-full items-center space-x-16\\"\\n          on:mouseenter={() => handleMouseEnter(item.id)}\\n          on:mouseleave={() => handleMouseLeave(item.id)}\\n        >\\n          {#if item.visible}\\n            <div\\n              id={item.id}\\n              class=\\"absolute w-16 h-64 gradient-blue-to-green-light-diagonal\\"\\n              transition:scale={{ start: 0.1, duration: 300 }}\\n            />\\n          {:else}\\n            <div id={item.id} class=\\"absolute w-16 h-64 bg-transparent\\" />\\n          {/if}\\n          <h1 class=\\"px-16 gradient-text-blue-to-green-vertical\\">\\n            {item.label}\\n          </h1>\\n        </div>\\n      {/each}\\n    </div>\\n  </div>\\n  <div class=\\"flex relative items-center col-span-3\\">\\n    {#each contents as item}\\n      {#if item.visible}\\n        <div\\n          id=\\"slide\\"\\n          class=\\"w-1120 h-1120\\"\\n          transition:fly={{ x: 600, duration: 1000 }}\\n        >\\n          <div\\n            id=\\"overlay\\"\\n            class=\\"flex flex-col w-1120 text-lg space-y-24 py-400\\"\\n          >\\n            <div\\n              id=\\"title\\"\\n              class=\\"flex items-center text-xl text-on-background-variant w-full px-120 space-x-12\\"\\n            >\\n              <Icon icon=\\"gridicons:share-computer\\" />\\n              <h1 class=\\"text-xl font-bold text-on-background-variant\\">\\n                {item.label}\\n              </h1>\\n            </div>\\n            <div\\n              id=\\"text-wrapper\\"\\n              class=\\"flex mx-120 text-on-background-variant\\"\\n            >\\n              <div\\n                id=\\"text-bar\\"\\n                class=\\"py-72 w-48 gradient-blue-to-green-light-diagonal\\"\\n              />\\n              <p class=\\"text-secondary-light text-lg px-16\\">\\n                {item.paragraph}\\n              </p>\\n            </div>\\n          </div>\\n          <div id=\\"img-container\\" />\\n        </div>\\n      {/if}\\n    {/each}\\n  </div>\\n</div>\\n\\n<style>\\n  :root {\\n    --imgurl: \\"\\";\\n  }\\n\\n  * {\\n    overflow: hidden;\\n  }\\n\\n  #wrapper {\\n    position: relative;\\n  }\\n\\n  #img-container {\\n    width: 1200px;\\n    height: 720px;\\n    background-image: var(--imgurl);\\n    background-repeat: no-repeat;\\n    background-size: fit;\\n  }\\n\\n  #slide {\\n    position: absolute;\\n    right: 0;\\n    display: flex;\\n    height: auto;\\n    align-items: center;\\n    justify-content: center;\\n    z-index: 10;\\n  }\\n\\n  #text-bar {\\n    /* position: absolute; */\\n    background-color: -webkit-linear-gradient(\\n      rgb(82, 235, 255),\\n      rgb(168, 255, 128)\\n    );\\n    z-index: 10;\\n  }\\n\\n  #title {\\n    margin: auto;\\n    z-index: 20;\\n  }\\n\\n  #overlay {\\n    position: absolute;\\n    right: 0;\\n    background: linear-gradient(\\n      180deg,\\n      #02161ba6,\\n      #02161ba6 20%,\\n      #000000a4 75%\\n    );\\n  }\\n</style>\\n"],"names":[],"mappings":"AAqHE,KAAK,AAAC,CAAC,AACL,QAAQ,CAAE,EAAE,AACd,CAAC,AAED,cAAE,CAAC,AACD,QAAQ,CAAE,MAAM,AAClB,CAAC,AAED,QAAQ,cAAC,CAAC,AACR,QAAQ,CAAE,QAAQ,AACpB,CAAC,AAED,cAAc,cAAC,CAAC,AACd,KAAK,CAAE,MAAM,CACb,MAAM,CAAE,KAAK,CACb,gBAAgB,CAAE,IAAI,QAAQ,CAAC,CAC/B,iBAAiB,CAAE,SAAS,CAC5B,eAAe,CAAE,GAAG,AACtB,CAAC,AAED,MAAM,cAAC,CAAC,AACN,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,CAAC,CACR,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,IAAI,CACZ,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,OAAO,CAAE,EAAE,AACb,CAAC,AAED,SAAS,cAAC,CAAC,AAET,gBAAgB,CAAE;MAChB,IAAI,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC;MAClB,IAAI,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC;KACnB,CACD,OAAO,CAAE,EAAE,AACb,CAAC,AAED,MAAM,cAAC,CAAC,AACN,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,EAAE,AACb,CAAC,AAED,QAAQ,cAAC,CAAC,AACR,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,CAAC,CACR,UAAU,CAAE;MACV,MAAM,CAAC;MACP,SAAS,CAAC;MACV,SAAS,CAAC,GAAG,CAAC;MACd,SAAS,CAAC,GAAG;KACd,AACH,CAAC"}'
};
var Interactive = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { contents } = $$props;
  if ($$props.contents === void 0 && $$bindings.contents && contents !== void 0)
    $$bindings.contents(contents);
  $$result.css.add(css$6);
  return `<div id="${"wrapper"}" class="${"grid grid-flow-col grid-cols-5 w-full h-screen gradient-bg-semidark-secondary svelte-3u4xp6"}"><div class="${"flex my-auto col-span-2 pl-148 text-4xl font-bold svelte-3u4xp6"}"><div class="${"w-full space-y-24 svelte-3u4xp6"}">${each(contents, (item) => `<div class="${"flex w-full items-center space-x-16 svelte-3u4xp6"}">${item.visible ? `<div${add_attribute("id", item.id, 0)} class="${"absolute w-16 h-64 gradient-blue-to-green-light-diagonal svelte-3u4xp6"}"></div>` : `<div${add_attribute("id", item.id, 0)} class="${"absolute w-16 h-64 bg-transparent svelte-3u4xp6"}"></div>`}
          <h1 class="${"px-16 gradient-text-blue-to-green-vertical svelte-3u4xp6"}">${escape(item.label)}</h1>
        </div>`)}</div></div>
  <div class="${"flex relative items-center col-span-3 svelte-3u4xp6"}">${each(contents, (item) => `${item.visible ? `<div id="${"slide"}" class="${"w-1120 h-1120 svelte-3u4xp6"}"><div id="${"overlay"}" class="${"flex flex-col w-1120 text-lg space-y-24 py-400 svelte-3u4xp6"}"><div id="${"title"}" class="${"flex items-center text-xl text-on-background-variant w-full px-120 space-x-12 svelte-3u4xp6"}">${validate_component(Icon, "Icon").$$render($$result, { icon: "gridicons:share-computer" }, {}, {})}
              <h1 class="${"text-xl font-bold text-on-background-variant svelte-3u4xp6"}">${escape(item.label)}
              </h1></div>
            <div id="${"text-wrapper"}" class="${"flex mx-120 text-on-background-variant svelte-3u4xp6"}"><div id="${"text-bar"}" class="${"py-72 w-48 gradient-blue-to-green-light-diagonal svelte-3u4xp6"}"></div>
              <p class="${"text-secondary-light text-lg px-16 svelte-3u4xp6"}">${escape(item.paragraph)}</p>
            </div></div>
          <div id="${"img-container"}" class="${"svelte-3u4xp6"}"></div>
        </div>` : ``}`)}</div>
</div>`;
});
var Section_2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { contents } = $$props;
  if ($$props.contents === void 0 && $$bindings.contents && contents !== void 0)
    $$bindings.contents(contents);
  return `${validate_component(Section_one_col_center, "SectionContainer").$$render($$result, {}, {}, {
    default: () => `${validate_component(Interactive, "Interactive").$$render($$result, { contents }, {}, {})}`
  })}`;
});
var Section_3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { contents } = $$props;
  let y;
  const mapValue = (val, in_min, in_max, out_min, out_max) => {
    return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  };
  if ($$props.contents === void 0 && $$bindings.contents && contents !== void 0)
    $$bindings.contents(contents);
  return `

${validate_component(Section_one_col_center, "SectionContainer").$$render($$result, {}, {}, {
    default: () => `${contents !== void 0 ? `<div${add_attribute("style", "background: linear-gradient(" + mapValue(y, 2500, 3e3, 0, 180) + "deg, rgb(255, 255, 255), rgb(220, 255, 220));", 0)} class="${"text-4xl font-bold px-168 py-360 text-center"}"><p class="${"gradient-text-dark"}">${escape(contents.headline)}</p></div>` : ``}`
  })}`;
});
var Who_we_are = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $cms_url, $$unsubscribe_cms_url;
  $$unsubscribe_cms_url = subscribe(cms_url, (value) => $cms_url = value);
  const fetchRefs = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data.refs;
  };
  const fetchData = async (cms_url2, callback) => {
    const refs = await fetchRefs(cms_url2);
    const masterRef = await refs.map((ref, index2) => {
      return ref.ref;
    });
    const url = cms_url2 + "/documents/search?ref=" + masterRef + "#format=json";
    const res = await fetch(url);
    const data = await res.json();
    let hero_data = {};
    let section_1_data = {};
    let section_2_data = [];
    let section_3_title = "";
    let contact_data = {};
    data.results.forEach((result, i) => {
      if (result.uid === "who-we-are") {
        result.data.body.forEach((section, j) => {
          if (section.slice_type === "hero-section") {
            hero_data.imageUrl = section.primary.image_url.url;
            hero_data.headline = section.primary.headline[0].text;
            hero_data.paragraph = section.primary.paragraph[0].text;
          }
          if (section.slice_type === "section-1") {
            console.log(section.primary.image.url);
            section_1_data.imageUrl = section.primary.image.url;
            section_1_data.paragraph = section.primary.paragraph[0].text;
          }
          if (section.slice_type === "section-2") {
            section.items.forEach((item, i2) => {
              let tmp = {};
              if (i2 == 0) {
                tmp.visible = true;
              } else {
                tmp.visible = false;
              }
              tmp.paragraph = item.paragraph[0].text;
              tmp.imageUrl = item["image-url"].url;
              tmp.label = item["interactive-menu-item"][0].text;
              tmp.id = item["interactive-menu-item"][0].text.toLowerCase();
              section_2_data.push(tmp);
            });
          }
          if (section.slice_type === "section-3") {
            console.log(section);
            section_3_title = section.primary.headline[0].text;
          }
          if (section.slice_type === "contact-section") {
            contact_data.headline = section.primary.headline[0].text;
            contact_data.start = section.primary.headline[0].spans[0].start;
            contact_data.end = section.primary.headline[0].spans[0].end;
          }
        });
      }
    });
    let cleanData = {
      hero: {
        id: 1,
        uid: "hero",
        image_url: hero_data.imageUrl,
        headline: hero_data.headline,
        paragraph: hero_data.paragraph
      },
      section1: {
        image_url: section_1_data.imageUrl,
        paragraph: section_1_data.paragraph
      },
      section2: section_2_data,
      section3: { headline: section_3_title },
      contact: {
        headline: contact_data.headline,
        start: contact_data.start,
        end: contact_data.end
      }
    };
    callback(cleanData);
  };
  let heroData;
  let section1Data, section2Data, section3Data;
  let contactData;
  fetchData($cms_url, async (data) => {
    heroData = await data.hero;
    section1Data = await data.section1;
    section2Data = await data.section2;
    section3Data = await data.section3;
    contactData = await data.contact;
  });
  $$unsubscribe_cms_url();
  return `${$$result.head += `${$$result.title = `<title>RENUE</title>`, ""}`, ""}

${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop$1);
      return `
  <h1 class="${"text-secondary text-8xl mt-72"}">Loading...</h1>
`;
    }
    return function(data) {
      return `
  ${data !== void 0 ? `${validate_component(Hero_section$1, "HeroSection").$$render($$result, { contents: data }, {}, {})}` : ``}
`;
    }(__value);
  }(heroData)}

${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop$1);
      return `
  <h1 class="${"text-secondary text-8xl mt-72"}">Loading...</h1>
`;
    }
    return function(data) {
      return `
  ${data !== void 0 ? `${validate_component(Section_1$1, "Section1").$$render($$result, { contents: data }, {}, {})}` : ``}
`;
    }(__value);
  }(section1Data)}

${validate_component(Spacer_line, "SpacerLine").$$render($$result, {}, {}, {})}

${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop$1);
      return `
  <h1 class="${"text-secondary text-8xl mt-72"}">Loading...</h1>
`;
    }
    return function(data) {
      return `
  ${data !== void 0 ? `${validate_component(Section_2, "Section2").$$render($$result, { contents: data }, {}, {})}` : ``}
`;
    }(__value);
  }(section2Data)}

${validate_component(Spacer_line, "SpacerLine").$$render($$result, {}, {}, {})}

${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop$1);
      return `
  <h1 class="${"text-secondary text-8xl mt-72"}">Loading...</h1>
`;
    }
    return function(data) {
      return `
  ${data !== void 0 ? `${validate_component(Section_3, "Section3").$$render($$result, { contents: data }, {}, {})}` : ``}
`;
    }(__value);
  }(section3Data)}

${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop$1);
      return `
  <h1 class="${"text-secondary text-8xl mt-72"}">Loading...</h1>
`;
    }
    return function(data) {
      return `
  ${data !== void 0 ? `${validate_component(Contact_section, "ContactSection").$$render($$result, { data }, {}, {})}` : ``}
`;
    }(__value);
  }(contactData)}`;
});
var whoWeAre = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Who_we_are
});
var Hero_section = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { contents } = $$props;
  if ($$props.contents === void 0 && $$bindings.contents && contents !== void 0)
    $$bindings.contents(contents);
  return `${validate_component(Hero_secondary, "HeroSecondary").$$render($$result, {
    headline: contents.headline,
    paragraph: contents.paragraph,
    image_url: contents.image_url,
    start: contents.start,
    end: contents.end
  }, {}, {})}`;
});
var css$5 = {
  code: "#main-container.svelte-fx0rbu{max-width:1920px;margin-left:auto;margin-right:auto}",
  map: '{"version":3,"file":"form.svelte","sources":["form.svelte"],"sourcesContent":["<main id=\\"main-container\\" class=\\"w-full gradient-bg-semidark-secondary py-168\\">\\n  <slot />\\n</main>\\n\\n<style>\\n  #main-container {\\n    max-width: 1920px;\\n    margin-left: auto;\\n    margin-right: auto;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAKE,eAAe,cAAC,CAAC,AACf,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,IAAI,CACjB,YAAY,CAAE,IAAI,AACpB,CAAC"}'
};
var Form = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$5);
  return `<main id="${"main-container"}" class="${"w-full gradient-bg-semidark-secondary py-168 svelte-fx0rbu"}">${slots.default ? slots.default({}) : ``}
</main>`;
});
var css$4 = {
  code: '.svelte-15u9n0j,.svelte-15u9n0j:focus,.svelte-15u9n0j:hover{outline:none}input[type="text"].svelte-15u9n0j{outline:none;border:none;color:#eee}input[type="email"].svelte-15u9n0j{outline:none;border:none;color:#eee}input[type="tel"].svelte-15u9n0j{outline:none;border:none;color:#eee}.svelte-15u9n0j::-webkit-input-placeholder{color:rgb(200, 200, 200)}.svelte-15u9n0j:-moz-placeholder{color:#eee}.svelte-15u9n0j::-moz-placeholder{color:#eee}.svelte-15u9n0j:-ms-input-placeholder{color:#eee}input[type="text"].svelte-15u9n0j:focus{outline:none;border:2px solid #a6cf4d;color:#eee}input[type="email"].svelte-15u9n0j:focus{outline:none;border:2px solid #a6cf4d;color:#eee}input[type="tel"].svelte-15u9n0j:focus{outline:none;border:2px solid #a6cf4d;color:#eee}.grad-line.svelte-15u9n0j{position:absolute;bottom:0}',
  map: '{"version":3,"file":"text-input-dark-sm.svelte","sources":["text-input-dark-sm.svelte"],"sourcesContent":["<script>\\n  export let type, label, placeholder, id;\\n<\/script>\\n\\n<div class=\\"\\">\\n  <div class=\\"my-16 text-md text-on-background-variant\\">\\n    <label for={id}>{label}</label>\\n  </div>\\n\\n  <div class=\\"relative flex w-full h-64 flex-col items-center\\">\\n    <input\\n      {id}\\n      {type}\\n      name={id}\\n      {placeholder}\\n      class=\\"w-full h-64 rounded-md px-16 bg-secondary-variant text-md\\"\\n      required\\n    />\\n    <div class=\\"grad-line w-full h-6 gradient-blue-to-green-light-diagonal\\" />\\n  </div>\\n</div>\\n\\n<style>\\n  *,\\n  *:focus,\\n  *:hover {\\n    outline: none;\\n  }\\n\\n  input[type=\\"text\\"] {\\n    outline: none;\\n    border: none;\\n    color: #eee;\\n  }\\n\\n  input[type=\\"email\\"] {\\n    outline: none;\\n    border: none;\\n    color: #eee;\\n  }\\n\\n  input[type=\\"tel\\"] {\\n    outline: none;\\n    border: none;\\n    color: #eee;\\n  }\\n\\n  ::-webkit-input-placeholder {\\n    color: rgb(200, 200, 200);\\n  }\\n\\n  :-moz-placeholder {\\n    /* Firefox 18- */\\n    color: #eee;\\n  }\\n\\n  ::-moz-placeholder {\\n    /* Firefox 19+ */\\n    color: #eee;\\n  }\\n\\n  :-ms-input-placeholder {\\n    color: #eee;\\n  }\\n\\n  /**/\\n  input[type=\\"text\\"]:focus {\\n    outline: none;\\n    border: 2px solid #a6cf4d;\\n    color: #eee;\\n  }\\n\\n  input[type=\\"email\\"]:focus {\\n    outline: none;\\n    border: 2px solid #a6cf4d;\\n    color: #eee;\\n  }\\n\\n  input[type=\\"tel\\"]:focus {\\n    outline: none;\\n    border: 2px solid #a6cf4d;\\n    color: #eee;\\n  }\\n\\n  .grad-line {\\n    position: absolute;\\n    bottom: 0;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAuBE,eAAC,CACD,eAAC,MAAM,CACP,eAAC,MAAM,AAAC,CAAC,AACP,OAAO,CAAE,IAAI,AACf,CAAC,AAED,KAAK,CAAC,IAAI,CAAC,MAAM,CAAC,eAAC,CAAC,AAClB,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,AACb,CAAC,AAED,KAAK,CAAC,IAAI,CAAC,OAAO,CAAC,eAAC,CAAC,AACnB,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,AACb,CAAC,AAED,KAAK,CAAC,IAAI,CAAC,KAAK,CAAC,eAAC,CAAC,AACjB,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,AACb,CAAC,eAED,2BAA2B,AAAC,CAAC,AAC3B,KAAK,CAAE,IAAI,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,AAC3B,CAAC,eAED,iBAAiB,AAAC,CAAC,AAEjB,KAAK,CAAE,IAAI,AACb,CAAC,eAED,kBAAkB,AAAC,CAAC,AAElB,KAAK,CAAE,IAAI,AACb,CAAC,eAED,sBAAsB,AAAC,CAAC,AACtB,KAAK,CAAE,IAAI,AACb,CAAC,AAGD,KAAK,CAAC,IAAI,CAAC,MAAM,gBAAC,MAAM,AAAC,CAAC,AACxB,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CACzB,KAAK,CAAE,IAAI,AACb,CAAC,AAED,KAAK,CAAC,IAAI,CAAC,OAAO,gBAAC,MAAM,AAAC,CAAC,AACzB,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CACzB,KAAK,CAAE,IAAI,AACb,CAAC,AAED,KAAK,CAAC,IAAI,CAAC,KAAK,gBAAC,MAAM,AAAC,CAAC,AACvB,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CACzB,KAAK,CAAE,IAAI,AACb,CAAC,AAED,UAAU,eAAC,CAAC,AACV,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,CAAC,AACX,CAAC"}'
};
var Text_input_dark_sm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { type, label, placeholder, id } = $$props;
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  $$result.css.add(css$4);
  return `<div class="${" svelte-15u9n0j"}"><div class="${"my-16 text-md text-on-background-variant svelte-15u9n0j"}"><label${add_attribute("for", id, 0)} class="${"svelte-15u9n0j"}">${escape(label)}</label></div>

  <div class="${"relative flex w-full h-64 flex-col items-center svelte-15u9n0j"}"><input${add_attribute("id", id, 0)}${add_attribute("type", type, 0)}${add_attribute("name", id, 0)}${add_attribute("placeholder", placeholder, 0)} class="${"w-full h-64 rounded-md px-16 bg-secondary-variant text-md svelte-15u9n0j"}" required>
    <div class="${"grad-line w-full h-6 gradient-blue-to-green-light-diagonal svelte-15u9n0j"}"></div></div>
</div>`;
});
var css$3 = {
  code: '.svelte-3g7zi1,.svelte-3g7zi1:focus,.svelte-3g7zi1:hover{outline:none}input[type="text"].svelte-3g7zi1{outline:none;border:none;color:#eee}input[type="email"].svelte-3g7zi1{outline:none;border:none;color:#eee}.svelte-3g7zi1::-webkit-input-placeholder{color:rgb(200, 200, 200)}.svelte-3g7zi1:-moz-placeholder{color:rgb(200, 200, 200)}.svelte-3g7zi1::-moz-placeholder{color:rgb(200, 200, 200)}.svelte-3g7zi1:-ms-input-placeholder{color:rgb(200, 200, 200)}input[type="text"].svelte-3g7zi1:focus{outline:none;border:2px solid #a6cf4d;color:#eee}input[type="email"].svelte-3g7zi1:focus{outline:none;border:2px solid #a6cf4d;color:#eee}.grad-line.svelte-3g7zi1{position:absolute;bottom:0}',
  map: '{"version":3,"file":"text-input-dark-lg.svelte","sources":["text-input-dark-lg.svelte"],"sourcesContent":["<script>\\n  export let type, label, placeholder, id;\\n<\/script>\\n\\n<div>\\n  <div class=\\"my-16 text-md  text-on-background-variant\\">\\n    <label for={id}>{label}</label>\\n  </div>\\n\\n  <div class=\\"relative flex w-800 h-64 flex-col items-center\\">\\n    <input\\n      {id}\\n      {type}\\n      name={id}\\n      {placeholder}\\n      class=\\"w-800 h-64 rounded-md px-16 bg-secondary-variant text-md \\"\\n      required\\n    />\\n    <div class=\\"grad-line w-full h-6 gradient-blue-to-green-light-diagonal\\" />\\n  </div>\\n</div>\\n\\n<style>\\n  *,\\n  *:focus,\\n  *:hover {\\n    outline: none;\\n  }\\n\\n  input[type=\\"text\\"] {\\n    outline: none;\\n    border: none;\\n    color: #eee;\\n  }\\n\\n  input[type=\\"email\\"] {\\n    outline: none;\\n    border: none;\\n    color: #eee;\\n  }\\n\\n  ::-webkit-input-placeholder {\\n    color: rgb(200, 200, 200);\\n  }\\n\\n  :-moz-placeholder {\\n    /* Firefox 18- */\\n    color: rgb(200, 200, 200);\\n  }\\n\\n  ::-moz-placeholder {\\n    /* Firefox 19+ */\\n    color: rgb(200, 200, 200);\\n  }\\n\\n  :-ms-input-placeholder {\\n    color: rgb(200, 200, 200);\\n  }\\n\\n  /**/\\n  input[type=\\"text\\"]:focus {\\n    outline: none;\\n    border: 2px solid #a6cf4d;\\n    color: #eee;\\n  }\\n\\n  input[type=\\"email\\"]:focus {\\n    outline: none;\\n    border: 2px solid #a6cf4d;\\n    color: #eee;\\n  }\\n\\n  .grad-line {\\n    position: absolute;\\n    bottom: 0;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAuBE,cAAC,CACD,cAAC,MAAM,CACP,cAAC,MAAM,AAAC,CAAC,AACP,OAAO,CAAE,IAAI,AACf,CAAC,AAED,KAAK,CAAC,IAAI,CAAC,MAAM,CAAC,cAAC,CAAC,AAClB,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,AACb,CAAC,AAED,KAAK,CAAC,IAAI,CAAC,OAAO,CAAC,cAAC,CAAC,AACnB,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,AACb,CAAC,cAED,2BAA2B,AAAC,CAAC,AAC3B,KAAK,CAAE,IAAI,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,AAC3B,CAAC,cAED,iBAAiB,AAAC,CAAC,AAEjB,KAAK,CAAE,IAAI,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,AAC3B,CAAC,cAED,kBAAkB,AAAC,CAAC,AAElB,KAAK,CAAE,IAAI,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,AAC3B,CAAC,cAED,sBAAsB,AAAC,CAAC,AACtB,KAAK,CAAE,IAAI,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,AAC3B,CAAC,AAGD,KAAK,CAAC,IAAI,CAAC,MAAM,eAAC,MAAM,AAAC,CAAC,AACxB,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CACzB,KAAK,CAAE,IAAI,AACb,CAAC,AAED,KAAK,CAAC,IAAI,CAAC,OAAO,eAAC,MAAM,AAAC,CAAC,AACzB,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CACzB,KAAK,CAAE,IAAI,AACb,CAAC,AAED,UAAU,cAAC,CAAC,AACV,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,CAAC,AACX,CAAC"}'
};
var Text_input_dark_lg = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { type, label, placeholder, id } = $$props;
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  $$result.css.add(css$3);
  return `<div class="${"svelte-3g7zi1"}"><div class="${"my-16 text-md text-on-background-variant svelte-3g7zi1"}"><label${add_attribute("for", id, 0)} class="${"svelte-3g7zi1"}">${escape(label)}</label></div>

  <div class="${"relative flex w-800 h-64 flex-col items-center svelte-3g7zi1"}"><input${add_attribute("id", id, 0)}${add_attribute("type", type, 0)}${add_attribute("name", id, 0)}${add_attribute("placeholder", placeholder, 0)} class="${"w-800 h-64 rounded-md px-16 bg-secondary-variant text-md  svelte-3g7zi1"}" required>
    <div class="${"grad-line w-full h-6 gradient-blue-to-green-light-diagonal svelte-3g7zi1"}"></div></div>
</div>`;
});
var css$2 = {
  code: '.svelte-1gmvbsd{overflow:hidden}.grad-line.svelte-1gmvbsd{position:absolute;bottom:0}select.svelte-1gmvbsd{-webkit-appearance:none;-moz-appearance:none;outline:none;border:none;color:#eee;cursor:pointer}select.svelte-1gmvbsd:focus{outline:none;border:2px solid #a6cf4d;color:#eee;cursor:pointer}input[type="tel"].svelte-1gmvbsd{outline:none;border:none;color:#eee}.svelte-1gmvbsd::-webkit-input-placeholder{color:rgb(200, 200, 200)}.svelte-1gmvbsd:-moz-placeholder{color:#eee}.svelte-1gmvbsd::-moz-placeholder{color:#eee}.svelte-1gmvbsd:-ms-input-placeholder{color:#eee}input[type="tel"].svelte-1gmvbsd:focus{outline:none;border:2px solid #a6cf4d;color:#eee}',
  map: '{"version":3,"file":"phone-input-dark-sm.svelte","sources":["phone-input-dark-sm.svelte"],"sourcesContent":["<script>\\n  //LIBS\\n  import { onMount } from \\"svelte\\";\\n  import Icon from \\"@iconify/svelte\\";\\n\\n  //HELPERS\\n  import { getFlags } from \\"../../helpers/flags\\";\\n\\n  //PROPS\\n  export let type, label, placeholder, id;\\n\\n  let items;\\n\\n  onMount(async () => {\\n    items = await getData();\\n  });\\n\\n  const getData = async () => {\\n    let objs = [];\\n    await fetch(\\"/assets/dial-codes.json\\").then(async (res) => {\\n      await res.json().then(async (data) => {\\n        await data.map((obj) => {\\n          //console.log(obj);\\n          obj.flag = getFlags(obj.ccode);\\n          objs.push(obj);\\n        });\\n      });\\n    });\\n    return objs;\\n  };\\n<\/script>\\n\\n<div class=\\"my-16 text-md text-on-background-variant\\">\\n  <label for={id}>{label}</label>\\n</div>\\n\\n<div class=\\"flex w-full h-64 flex-col relative\\">\\n  {#await items}\\n    <h1 class=\\"text-secondary text-xl\\">Loading...</h1>\\n  {:then countryData}\\n    {#if countryData}\\n      <div class=\\"flex w-full bg-secondary-variant rounded-md\\">\\n        <div class=\\"flex select-container w-120\\">\\n          <select\\n            class=\\"w-full h-64 bg-secondary-variant-light px-12 text-md rounded-sm\\"\\n          >\\n            {#each countryData as country}\\n              <option value={country}>\\n                <div>\\n                  {country.flag} &nbsp; {country.mcode}\\n                </div>\\n              </option>\\n            {/each}\\n          </select>\\n        </div>\\n        <!-- <div class=\\"w-thin h-64 bg-tertiary-main mx-12 my-12\\" /> -->\\n        <div\\n          class=\\"flex w-50 h-64 items-center px-16 text-tertiary-main text-md\\"\\n        >\\n          <input\\n            id=\\"phone\\"\\n            type=\\"tel\\"\\n            placeholder=\\"000-000-0000\\"\\n            class=\\"bg-secondary-variant\\"\\n          />\\n        </div>\\n      </div>\\n    {/if}\\n  {/await}\\n  <div class=\\"grad-line w-full h-6 gradient-blue-to-green-light-diagonal\\" />\\n</div>\\n\\n<style>\\n  * {\\n    overflow: hidden;\\n  }\\n\\n  .grad-line {\\n    position: absolute;\\n    bottom: 0;\\n  }\\n\\n  select {\\n    -webkit-appearance: none;\\n    -moz-appearance: none;\\n    outline: none;\\n    border: none;\\n    color: #eee;\\n    cursor: pointer;\\n  }\\n\\n  select:focus {\\n    outline: none;\\n    border: 2px solid #a6cf4d;\\n    color: #eee;\\n    cursor: pointer;\\n  }\\n\\n  input[type=\\"tel\\"] {\\n    outline: none;\\n    border: none;\\n    color: #eee;\\n  }\\n\\n  ::-webkit-input-placeholder {\\n    color: rgb(200, 200, 200);\\n  }\\n\\n  :-moz-placeholder {\\n    /* Firefox 18- */\\n    color: #eee;\\n  }\\n\\n  ::-moz-placeholder {\\n    /* Firefox 19+ */\\n    color: #eee;\\n  }\\n\\n  :-ms-input-placeholder {\\n    color: #eee;\\n  }\\n\\n  input[type=\\"tel\\"]:focus {\\n    outline: none;\\n    border: 2px solid #a6cf4d;\\n    color: #eee;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAyEE,eAAE,CAAC,AACD,QAAQ,CAAE,MAAM,AAClB,CAAC,AAED,UAAU,eAAC,CAAC,AACV,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,CAAC,AACX,CAAC,AAED,MAAM,eAAC,CAAC,AACN,kBAAkB,CAAE,IAAI,CACxB,eAAe,CAAE,IAAI,CACrB,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,OAAO,AACjB,CAAC,AAED,qBAAM,MAAM,AAAC,CAAC,AACZ,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CACzB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,OAAO,AACjB,CAAC,AAED,KAAK,CAAC,IAAI,CAAC,KAAK,CAAC,eAAC,CAAC,AACjB,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,AACb,CAAC,eAED,2BAA2B,AAAC,CAAC,AAC3B,KAAK,CAAE,IAAI,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,AAC3B,CAAC,eAED,iBAAiB,AAAC,CAAC,AAEjB,KAAK,CAAE,IAAI,AACb,CAAC,eAED,kBAAkB,AAAC,CAAC,AAElB,KAAK,CAAE,IAAI,AACb,CAAC,eAED,sBAAsB,AAAC,CAAC,AACtB,KAAK,CAAE,IAAI,AACb,CAAC,AAED,KAAK,CAAC,IAAI,CAAC,KAAK,gBAAC,MAAM,AAAC,CAAC,AACvB,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CACzB,KAAK,CAAE,IAAI,AACb,CAAC"}'
};
var Phone_input_dark_sm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { type, label, placeholder, id } = $$props;
  let items;
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  $$result.css.add(css$2);
  return `<div class="${"my-16 text-md text-on-background-variant svelte-1gmvbsd"}"><label${add_attribute("for", id, 0)} class="${"svelte-1gmvbsd"}">${escape(label)}</label></div>

<div class="${"flex w-full h-64 flex-col relative svelte-1gmvbsd"}">${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop$1);
      return `
    <h1 class="${"text-secondary text-xl svelte-1gmvbsd"}">Loading...</h1>
  `;
    }
    return function(countryData) {
      return `
    ${countryData ? `<div class="${"flex w-full bg-secondary-variant rounded-md svelte-1gmvbsd"}"><div class="${"flex select-container w-120 svelte-1gmvbsd"}"><select class="${"w-full h-64 bg-secondary-variant-light px-12 text-md rounded-sm svelte-1gmvbsd"}">${each(countryData, (country) => `<option${add_attribute("value", country, 0)} class="${"svelte-1gmvbsd"}"><div class="${"svelte-1gmvbsd"}">${escape(country.flag)} \xA0 ${escape(country.mcode)}</div>
              </option>`)}</select></div>
        
        <div class="${"flex w-50 h-64 items-center px-16 text-tertiary-main text-md svelte-1gmvbsd"}"><input id="${"phone"}" type="${"tel"}" placeholder="${"000-000-0000"}" class="${"bg-secondary-variant svelte-1gmvbsd"}"></div></div>` : ``}
  `;
    }(__value);
  }(items)}
  <div class="${"grad-line w-full h-6 gradient-blue-to-green-light-diagonal svelte-1gmvbsd"}"></div>
</div>`;
});
var css$1 = {
  code: ".svelte-3g7zi1,.svelte-3g7zi1:focus,.svelte-3g7zi1:hover{outline:none}.svelte-3g7zi1::-webkit-input-placeholder{color:rgb(200, 200, 200)}.svelte-3g7zi1:-moz-placeholder{color:rgb(200, 200, 200)}.svelte-3g7zi1::-moz-placeholder{color:rgb(200, 200, 200)}.svelte-3g7zi1:-ms-input-placeholder{color:rgb(200, 200, 200)}.grad-line.svelte-3g7zi1{position:absolute;bottom:0}",
  map: '{"version":3,"file":"textarea-dark-lg.svelte","sources":["textarea-dark-lg.svelte"],"sourcesContent":["<script>\\n  export let name, label, placeholder, id, rows, cols;\\n<\/script>\\n\\n<div>\\n  <div class=\\"my-16 text-md  text-on-background-variant\\">\\n    <label for={id}>{label}</label>\\n  </div>\\n\\n  <div class=\\"relative flex w-800 flex-col items-center\\">\\n    <textarea\\n      {id}\\n      name={id}\\n      class=\\"w-800 p-16 rounded-md bg-secondary-variant text-md text-tertiary-main\\"\\n      {rows}\\n      {cols}\\n      {placeholder}\\n      required\\n    />\\n    <div class=\\"grad-line w-full h-6 gradient-blue-to-green-light-diagonal\\" />\\n  </div>\\n</div>\\n\\n<style>\\n  *,\\n  *:focus,\\n  *:hover {\\n    outline: none;\\n  }\\n\\n  input[type=\\"text\\"] {\\n    outline: none;\\n    border: none;\\n    color: #eee;\\n  }\\n\\n  input[type=\\"email\\"] {\\n    outline: none;\\n    border: none;\\n    color: #eee;\\n  }\\n\\n  ::-webkit-input-placeholder {\\n    color: rgb(200, 200, 200);\\n  }\\n\\n  :-moz-placeholder {\\n    /* Firefox 18- */\\n    color: rgb(200, 200, 200);\\n  }\\n\\n  ::-moz-placeholder {\\n    /* Firefox 19+ */\\n    color: rgb(200, 200, 200);\\n  }\\n\\n  :-ms-input-placeholder {\\n    color: rgb(200, 200, 200);\\n  }\\n\\n  /**/\\n  input[type=\\"text\\"]:focus {\\n    outline: none;\\n    border: 2px solid #a6cf4d;\\n    color: #eee;\\n  }\\n\\n  input[type=\\"email\\"]:focus {\\n    outline: none;\\n    border: 2px solid #a6cf4d;\\n    color: #eee;\\n  }\\n\\n  .grad-line {\\n    position: absolute;\\n    bottom: 0;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAwBE,cAAC,CACD,cAAC,MAAM,CACP,cAAC,MAAM,AAAC,CAAC,AACP,OAAO,CAAE,IAAI,AACf,CAAC,cAcD,2BAA2B,AAAC,CAAC,AAC3B,KAAK,CAAE,IAAI,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,AAC3B,CAAC,cAED,iBAAiB,AAAC,CAAC,AAEjB,KAAK,CAAE,IAAI,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,AAC3B,CAAC,cAED,kBAAkB,AAAC,CAAC,AAElB,KAAK,CAAE,IAAI,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,AAC3B,CAAC,cAED,sBAAsB,AAAC,CAAC,AACtB,KAAK,CAAE,IAAI,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,AAC3B,CAAC,AAeD,UAAU,cAAC,CAAC,AACV,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,CAAC,AACX,CAAC"}'
};
var Textarea_dark_lg = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { name, label, placeholder, id, rows, cols } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.rows === void 0 && $$bindings.rows && rows !== void 0)
    $$bindings.rows(rows);
  if ($$props.cols === void 0 && $$bindings.cols && cols !== void 0)
    $$bindings.cols(cols);
  $$result.css.add(css$1);
  return `<div class="${"svelte-3g7zi1"}"><div class="${"my-16 text-md text-on-background-variant svelte-3g7zi1"}"><label${add_attribute("for", id, 0)} class="${"svelte-3g7zi1"}">${escape(label)}</label></div>

  <div class="${"relative flex w-800 flex-col items-center svelte-3g7zi1"}"><textarea${add_attribute("id", id, 0)}${add_attribute("name", id, 0)} class="${"w-800 p-16 rounded-md bg-secondary-variant text-md text-tertiary-main svelte-3g7zi1"}"${add_attribute("rows", rows, 0)}${add_attribute("cols", cols, 0)}${add_attribute("placeholder", placeholder, 0)} required></textarea>
    <div class="${"grad-line w-full h-6 gradient-blue-to-green-light-diagonal svelte-3g7zi1"}"></div></div>
</div>`;
});
var css = {
  code: ".svelte-1m1p432{overflow:hidden}",
  map: '{"version":3,"file":"section-1.svelte","sources":["section-1.svelte"],"sourcesContent":["<script>\\n  //LIBS\\n  import Icon from \\"@iconify/svelte\\";\\n  import { spring } from \\"svelte/motion\\";\\n\\n  //CONTAINERS\\n  import SectionContainer from \\"../../containers/form.svelte\\";\\n\\n  //COMPONENTS\\n  import TextInputDarkSm from \\"../../forms/text-input-dark-sm.svelte\\";\\n  import TextInputDarkLg from \\"../../forms/text-input-dark-lg.svelte\\";\\n  import PhoneInputDarkSm from \\"../../forms/phone-input-dark-sm.svelte\\";\\n  import TextAreaDarkLg from \\"../../forms/textarea-dark-lg.svelte\\";\\n  import Button from \\"../../buttons/lg-primary-icon-fill.svelte\\";\\n\\n  //PROPS\\n  export let contents;\\n\\n  const onSubmit = async (e) => {\\n    // console.log(e);\\n    const formData = new FormData(e.target);\\n    const data = {};\\n    for (let field of formData) {\\n      const [key, value] = field;\\n      data[key] = value;\\n    }\\n\\n    let composedMail = {\\n      Host: \\"smtp.gmail.com\\",\\n      Username: \\"renueenviro@gmail.com\\",\\n      Password: \\"RenueEnviro_2021!\\",\\n      To: \\"fitosegrera@gmail.com\\",\\n      From: \\"renueenviro@gmail.com\\",\\n      Subject: \\"Message from \\" + data.first_name + \\" \\" + data.last_name,\\n      Body: JSON.stringify(data),\\n    };\\n\\n    console.log(composedMail);\\n\\n    await Email.send(composedMail).then((message) => {\\n      console.log(message);\\n      alert(\\"mail sent successfully\\");\\n    });\\n  };\\n\\n  let isBooped = false;\\n  let rotation = 10;\\n  let timing = 200;\\n\\n  let springyRotation = spring(0, {\\n    stiffness: 0.1,\\n    damping: 0.15,\\n  });\\n\\n  $: springyRotation.set(isBooped ? rotation : 0);\\n\\n  $: style = `\\n\\t\\ttransform: rotate(${$springyRotation}deg)\\n\\t`;\\n\\n  $: if (isBooped) {\\n    setTimeout(() => {\\n      isBooped = false;\\n    }, timing);\\n  }\\n\\n  const toggle = () => {\\n    isBooped = true;\\n  };\\n<\/script>\\n\\n<SectionContainer>\\n  <div class=\\"w-800 mx-auto\\">\\n    <div\\n      class=\\"w-800 md:text-3xl md:leading-5xl text-on-background-variant text-left font-bold\\"\\n    >\\n      <div class=\\"w-100 h-full\\">\\n        <h1>\\n          {contents.heading.substring(0, contents.start)}\\n          <a href=\\"mailto:cnieto@renueenviro.com\\" class=\\"text-primary-main\\">\\n            {contents.heading.substring(contents.start, contents.end)}\\n          </a>\\n          {contents.heading.substring(contents.end)}\\n        </h1>\\n      </div>\\n    </div>\\n    <div\\n      class=\\"w-800 md:text-lg md:leading-xl text-on-background-variant text-left pt-96\\"\\n    >\\n      <div class=\\"w-100 h-full\\">\\n        <p>{contents.instructions}</p>\\n      </div>\\n    </div>\\n    <form on:submit|preventDefault={onSubmit}>\\n      <div class=\\"grid grid-flow-col justify-items-center my-24 gap-32\\">\\n        <div class=\\"w-full\\">\\n          <TextInputDarkSm\\n            id=\\"first_name\\"\\n            label=\\"First Name *\\"\\n            type=\\"text\\"\\n            placeholder=\\"First Name\\"\\n          />\\n        </div>\\n        <div class=\\"w-full\\">\\n          <TextInputDarkSm\\n            id=\\"last_name\\"\\n            label=\\"Last Name *\\"\\n            type=\\"text\\"\\n            placeholder=\\"Last Name\\"\\n          />\\n        </div>\\n      </div>\\n      <div class=\\"my-24\\">\\n        <div class=\\"w-full\\">\\n          <TextInputDarkLg\\n            id=\\"email\\"\\n            label=\\"Email *\\"\\n            type=\\"email\\"\\n            placeholder=\\"Email\\"\\n          />\\n        </div>\\n      </div>\\n      <div class=\\"grid grid-flow-col justify-items-center my-24 gap-32\\">\\n        <div class=\\"w-full\\">\\n          <PhoneInputDarkSm\\n            id=\\"phone\\"\\n            label=\\"Phone *\\"\\n            type=\\"tel\\"\\n            placeholder=\\"Phone number\\"\\n          />\\n        </div>\\n        <div class=\\"w-full\\">\\n          <TextInputDarkSm\\n            id=\\"company_name\\"\\n            label=\\"Company (optional)\\"\\n            type=\\"text\\"\\n            placeholder=\\"Company Name\\"\\n          />\\n        </div>\\n      </div>\\n      <div>\\n        <TextAreaDarkLg\\n          id=\\"message\\"\\n          label=\\"Message *\\"\\n          placeholder=\\"Send us a message...\\"\\n          rows=\\"6\\"\\n          cols=\\"50\\"\\n        />\\n      </div>\\n      <div class=\\"flex mt-56 justify-end\\">\\n        <!-- <Button\\n          type=\\"submit\\"\\n          icon_label=\\"bi:send\\"\\n          label=\\"Send Message\\"\\n          url=\\"/contact\\"\\n        /> -->\\n\\n        <button\\n          type=\\"submit\\"\\n          on:mouseenter={toggle}\\n          on:mouseleave={toggle}\\n          class=\\"flex items-center px-32 space-x-16 w-268 h-72 text-on-background-variant font-bold rounded-md bg-primary-main transition ease-in-out hover:bg-secondary-main duration-500\\"\\n        >\\n          <div class=\\"text-xl\\">\\n            <Icon icon=\\"bi:send\\" {style} />\\n          </div>\\n          <h1 class=\\"text-lg\\">Send Message</h1>\\n        </button>\\n      </div>\\n    </form>\\n  </div></SectionContainer\\n>\\n\\n<style>\\n  * {\\n    overflow: hidden;\\n  }\\n</style>\\n"],"names":[],"mappings":"AA8KE,eAAE,CAAC,AACD,QAAQ,CAAE,MAAM,AAClB,CAAC"}'
};
var Section_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let style;
  let $springyRotation, $$unsubscribe_springyRotation;
  let { contents } = $$props;
  let springyRotation = spring$1(0, { stiffness: 0.1, damping: 0.15 });
  $$unsubscribe_springyRotation = subscribe(springyRotation, (value) => $springyRotation = value);
  if ($$props.contents === void 0 && $$bindings.contents && contents !== void 0)
    $$bindings.contents(contents);
  $$result.css.add(css);
  {
    springyRotation.set(0);
  }
  style = `
		transform: rotate(${$springyRotation}deg)
	`;
  $$unsubscribe_springyRotation();
  return `${validate_component(Form, "SectionContainer").$$render($$result, {}, {}, {
    default: () => `<div class="${"w-800 mx-auto svelte-1m1p432"}"><div class="${"w-800 md:text-3xl md:leading-5xl text-on-background-variant text-left font-bold svelte-1m1p432"}"><div class="${"w-100 h-full svelte-1m1p432"}"><h1 class="${"svelte-1m1p432"}">${escape(contents.heading.substring(0, contents.start))}
          <a href="${"mailto:cnieto@renueenviro.com"}" class="${"text-primary-main svelte-1m1p432"}">${escape(contents.heading.substring(contents.start, contents.end))}</a>
          ${escape(contents.heading.substring(contents.end))}</h1></div></div>
    <div class="${"w-800 md:text-lg md:leading-xl text-on-background-variant text-left pt-96 svelte-1m1p432"}"><div class="${"w-100 h-full svelte-1m1p432"}"><p class="${"svelte-1m1p432"}">${escape(contents.instructions)}</p></div></div>
    <form class="${"svelte-1m1p432"}"><div class="${"grid grid-flow-col justify-items-center my-24 gap-32 svelte-1m1p432"}"><div class="${"w-full svelte-1m1p432"}">${validate_component(Text_input_dark_sm, "TextInputDarkSm").$$render($$result, {
      id: "first_name",
      label: "First Name *",
      type: "text",
      placeholder: "First Name"
    }, {}, {})}</div>
        <div class="${"w-full svelte-1m1p432"}">${validate_component(Text_input_dark_sm, "TextInputDarkSm").$$render($$result, {
      id: "last_name",
      label: "Last Name *",
      type: "text",
      placeholder: "Last Name"
    }, {}, {})}</div></div>
      <div class="${"my-24 svelte-1m1p432"}"><div class="${"w-full svelte-1m1p432"}">${validate_component(Text_input_dark_lg, "TextInputDarkLg").$$render($$result, {
      id: "email",
      label: "Email *",
      type: "email",
      placeholder: "Email"
    }, {}, {})}</div></div>
      <div class="${"grid grid-flow-col justify-items-center my-24 gap-32 svelte-1m1p432"}"><div class="${"w-full svelte-1m1p432"}">${validate_component(Phone_input_dark_sm, "PhoneInputDarkSm").$$render($$result, {
      id: "phone",
      label: "Phone *",
      type: "tel",
      placeholder: "Phone number"
    }, {}, {})}</div>
        <div class="${"w-full svelte-1m1p432"}">${validate_component(Text_input_dark_sm, "TextInputDarkSm").$$render($$result, {
      id: "company_name",
      label: "Company (optional)",
      type: "text",
      placeholder: "Company Name"
    }, {}, {})}</div></div>
      <div class="${"svelte-1m1p432"}">${validate_component(Textarea_dark_lg, "TextAreaDarkLg").$$render($$result, {
      id: "message",
      label: "Message *",
      placeholder: "Send us a message...",
      rows: "6",
      cols: "50"
    }, {}, {})}</div>
      <div class="${"flex mt-56 justify-end svelte-1m1p432"}">

        <button type="${"submit"}" class="${"flex items-center px-32 space-x-16 w-268 h-72 text-on-background-variant font-bold rounded-md bg-primary-main transition ease-in-out hover:bg-secondary-main duration-500 svelte-1m1p432"}"><div class="${"text-xl svelte-1m1p432"}">${validate_component(Icon, "Icon").$$render($$result, { icon: "bi:send", style }, {}, {})}</div>
          <h1 class="${"text-lg svelte-1m1p432"}">Send Message</h1></button></div></form></div>`
  })}`;
});
var Contact = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $cms_url, $$unsubscribe_cms_url;
  $$unsubscribe_cms_url = subscribe(cms_url, (value) => $cms_url = value);
  const fetchRefs = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data.refs;
  };
  const fetchData = async (cms_url2, callback) => {
    const refs = await fetchRefs(cms_url2);
    const masterRef = await refs.map((ref, index2) => {
      return ref.ref;
    });
    const url = cms_url2 + "/documents/search?ref=" + masterRef + "#format=json";
    const res = await fetch(url);
    const data = await res.json();
    let hero_data = {};
    let section_1_data = {};
    data.results.forEach((result, i) => {
      if (result.uid === "contact") {
        result.data.body.forEach((section, j) => {
          if (section.slice_type === "hero-section") {
            hero_data.imageUrl = section.primary.image.url;
            hero_data.headline = section.primary.headline[0].text;
            hero_data.paragraph = section.primary.paragraph[0].text;
            hero_data.start = section.primary.paragraph[0].spans[0].start;
            hero_data.end = section.primary.paragraph[0].spans[0].end;
          }
          if (section.slice_type === "section-1") {
            section_1_data.heading = section.primary.heading[0].text;
            section_1_data.instructions = section.primary.instructions[0].text;
            section_1_data.start = section.primary.heading[0].spans[0].start;
            section_1_data.end = section.primary.heading[0].spans[0].end;
          }
        });
      }
    });
    let cleanData = {
      hero: {
        id: 1,
        uid: "hero",
        image_url: hero_data.imageUrl,
        headline: hero_data.headline,
        paragraph: hero_data.paragraph,
        start: hero_data.start,
        end: hero_data.end
      },
      section1: {
        heading: section_1_data.heading,
        start: section_1_data.start,
        end: section_1_data.end,
        instructions: section_1_data.instructions
      }
    };
    callback(cleanData);
  };
  let heroData;
  let section1Data;
  fetchData($cms_url, async (data) => {
    heroData = await data.hero;
    section1Data = await data.section1;
  });
  $$unsubscribe_cms_url();
  return `${$$result.head += `${$$result.title = `<title>RENUE</title>`, ""}<script src="${"https://smtpjs.com/v3/smtp.js"}" data-svelte="svelte-1mfiea1"><\/script>`, ""}

${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop$1);
      return `
  <h1 class="${"text-secondary text-8xl mt-72"}">Loading...</h1>
`;
    }
    return function(data) {
      return `
  ${data !== void 0 ? `${validate_component(Hero_section, "HeroSection").$$render($$result, { contents: data }, {}, {})}` : ``}
`;
    }(__value);
  }(heroData)}

${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop$1);
      return `
  <h1 class="${"text-secondary text-8xl mt-72"}">Loading...</h1>
`;
    }
    return function(data) {
      return `
  ${data !== void 0 ? `${validate_component(Section_1, "Section1").$$render($$result, { contents: data }, {}, {})}` : ``}
`;
    }(__value);
  }(section1Data)}`;
});
var contact = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Contact
});
var News = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ``;
});
var news = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": News
});

// .svelte-kit/vercel/entry.js
init();
var entry_default = async (req, res) => {
  const { pathname, searchParams } = new URL(req.url || "", "http://localhost");
  let body;
  try {
    body = await getRawBody(req);
  } catch (err) {
    res.statusCode = err.status || 400;
    return res.end(err.reason || "Invalid request body");
  }
  const rendered = await render$1({
    method: req.method,
    headers: req.headers,
    path: pathname,
    query: searchParams,
    rawBody: body
  });
  if (rendered) {
    const { status, headers, body: body2 } = rendered;
    return res.writeHead(status, headers).end(body2);
  }
  return res.writeHead(404).end();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
