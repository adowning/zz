
if (!sessionStorage.getItem('sessionId')) {
    sessionStorage.setItem('sessionId', parseInt(Math.random() * 1000000));
}
var serverString = '';
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');
const gameName = urlParams.get('g');
// const token = urlParams.get('token');
// var XmlHttpRequest = new XMLHttpRequest();
// XmlHttpRequest.overrideMimeType("application/json");
// XmlHttpRequest.open('GET', '/games/public/socket_config0.json', false);
// XmlHttpRequest.onreadystatechange = function ()
// {
//     if (XmlHttpRequest.readyState == 4 && XmlHttpRequest.status == "200")
//     {
//         var serverConfig = JSON.parse(XmlHttpRequest.responseText);
//         // serverString=serverConfig.prefix_ws+serverConfig.host_ws+':'+serverConfig.port;
//         serverString=`wss://22188.andrewscarpetcleaning.com/${gameName}/${userId}/ka_fish`;

//     }
// }
// XmlHttpRequest.send(null);
serverString = `wss://apidev.cashflowcasino.com/ws/spacecat?gameName=${gameName}&userId=${userId}&token=${window.token}`;

window.__require = function e(t, o, n) {
    function i(a, s) {
        if (!o[a]) {
            if (!t[a]) {
                var c = a.split("/");
                if (c = c[c.length - 1], !t[c]) {
                    var l = typeof __require === "function" && __require;
                    if (!s && l) { return l(c, !0); }
                    if (r) { return r(c, !0); }
                    throw new Error("Cannot find module '" + a + "'")
                }
            }
            var u = o[a] = {
                exports: {}
            };
            t[a][0].call(u.exports, function (e) {
                return i(t[a][1][e] || e)
            }, u, u.exports, e, t, o, n)
        }
        return o[a].exports
    }
    for (var r = typeof __require === "function" && __require, a = 0; a < n.length; a++) { i(n[a]); }
    return i
}({
    1: [function (e, t, o) {
        function n() {
            this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
        }

        function i(e) {
            return typeof e === "function"
        }

        function r(e) {
            return typeof e === "number"
        }

        function a(e) {
            return typeof e === "object" && e !== null
        }

        function s(e) {
            return void 0 === e
        }
        t.exports = n, n.EventEmitter = n, n.prototype._events = void 0, n.prototype._maxListeners = void 0, n.defaultMaxListeners = 10, n.prototype.setMaxListeners = function (e) {
            if (!r(e) || e < 0 || isNaN(e)) { throw TypeError("n must be a positive number"); }
            return this._maxListeners = e, this
        }, n.prototype.emit = function (e) {
            var t, o, n, r, c, l;
            if (this._events || (this._events = {}), e === "error" && (!this._events.error || a(this._events.error) && !this._events.error.length)) {
                if ((t = arguments[1]) instanceof Error) { throw t; }
                var u = new Error('Uncaught, unspecified "error" event. (' + t + ")");
                throw u.context = t, u
            }
            if (s(o = this._events[e])) { return !1; }
            if (i(o)) {
                switch (arguments.length) {
                    case 1:
                        o.call(this);
                        break;
                    case 2:
                        o.call(this, arguments[1]);
                        break;
                    case 3:
                        o.call(this, arguments[1], arguments[2]);
                        break;
                    default:
                        r = Array.prototype.slice.call(arguments, 1), o.apply(this, r)
                }
            } else if (a(o)) { for (r = Array.prototype.slice.call(arguments, 1), n = (l = o.slice()).length, c = 0; c < n; c++) { l[c].apply(this, r); } }
            return !0
        }, n.prototype.addListener = function (e, t) {
            var o;
            if (!i(t)) { throw TypeError("listener must be a function"); }
            return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, i(t.listener) ? t.listener : t), this._events[e] ? a(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, a(this._events[e]) && !this._events[e].warned && (o = s(this._maxListeners) ? n.defaultMaxListeners : this._maxListeners) && o > 0 && this._events[e].length > o && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), typeof console.trace === "function" && console.trace()), this
        }, n.prototype.on = n.prototype.addListener, n.prototype.once = function (e, t) {
            if (!i(t)) { throw TypeError("listener must be a function"); }
            var o = !1;

            function n() {
                this.removeListener(e, n), o || (o = !0, t.apply(this, arguments))
            }
            return n.listener = t, this.on(e, n), this
        }, n.prototype.removeListener = function (e, t) {
            var o, n, r, s;
            if (!i(t)) { throw TypeError("listener must be a function"); }
            if (!this._events || !this._events[e]) { return this; }
            if (r = (o = this._events[e]).length, n = -1, o === t || i(o.listener) && o.listener === t) { delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t); }
            else if (a(o)) {
                for (s = r; s-- > 0;) {
                    if (o[s] === t || o[s].listener && o[s].listener === t) {
                        n = s;
                        break
                    }
                } if (n < 0) { return this; }
                o.length === 1 ? (o.length = 0, delete this._events[e]) : o.splice(n, 1), this._events.removeListener && this.emit("removeListener", e, t)
            }
            return this
        }, n.prototype.removeAllListeners = function (e) {
            var t, o;
            if (!this._events) { return this; }
            if (!this._events.removeListener) { return arguments.length === 0 ? this._events = {} : this._events[e] && delete this._events[e], this; }
            if (arguments.length === 0) {
                for (t in this._events) { t !== "removeListener" && this.removeAllListeners(t); }
                return this.removeAllListeners("removeListener"), this._events = {}, this
            }
            if (i(o = this._events[e])) { this.removeListener(e, o); }
            else if (o) { for (; o.length;) { this.removeListener(e, o[o.length - 1]); } }
            return delete this._events[e], this
        }, n.prototype.listeners = function (e) {
            return this._events && this._events[e] ? i(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
        }, n.prototype.listenerCount = function (e) {
            if (this._events) {
                var t = this._events[e];
                if (i(t)) { return 1; }
                if (t) { return t.length }
            }
            return 0
        }, n.listenerCount = function (e, t) {
            return e.listenerCount(t)
        }
    }, {}],
    2: [function (e, t, o) {
        var n, i, r = t.exports = {};

        function a() {
            throw new Error("setTimeout has not been defined")
        }

        function s() {
            throw new Error("clearTimeout has not been defined")
        }

        function c(e) {
            if (n === setTimeout) { return setTimeout(e, 0); }
            if ((n === a || !n) && setTimeout) { return n = setTimeout, setTimeout(e, 0); }
            try {
                return n(e, 0)
            } catch (t) {
                try {
                    return n.call(null, e, 0)
                } catch (t) {
                    return n.call(this, e, 0)
                }
            }
        }

        function l(e) {
            if (i === clearTimeout) { return clearTimeout(e); }
            if ((i === s || !i) && clearTimeout) { return i = clearTimeout, clearTimeout(e); }
            try {
                return i(e)
            } catch (t) {
                try {
                    return i.call(null, e)
                } catch (t) {
                    return i.call(this, e)
                }
            }
        } (function () {
            try {
                n = typeof setTimeout === "function" ? setTimeout : a
            } catch (e) {
                n = a
            }
            try {
                i = typeof clearTimeout === "function" ? clearTimeout : s
            } catch (e) {
                i = s
            }
        })();
        var u, p = [],
            h = !1,
            f = -1;

        function d() {
            h && u && (h = !1, u.length ? p = u.concat(p) : f = -1, p.length && _())
        }

        function _() {
            if (!h) {
                var e = c(d);
                h = !0;
                for (var t = p.length; t;) {
                    for (u = p, p = []; ++f < t;) { u && u[f].run(); }
                    f = -1, t = p.length
                }
                u = null, h = !1, l(e)
            }
        }

        function g(e, t) {
            this.fun = e, this.array = t
        }

        function y() { }
        r.nextTick = function (e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1) { for (var o = 1; o < arguments.length; o++) { t[o - 1] = arguments[o]; } }
            p.push(new g(e, t)), p.length !== 1 || h || c(_)
        }, g.prototype.run = function () {
            this.fun.apply(null, this.array)
        }, r.title = "browser", r.browser = !0, r.env = {}, r.argv = [], r.version = "", r.versions = {}, r.on = y, r.addListener = y, r.once = y, r.off = y, r.removeListener = y, r.removeAllListeners = y, r.emit = y, r.prependListener = y, r.prependOnceListener = y, r.listeners = function (e) {
            return []
        }, r.binding = function (e) {
            throw new Error("process.binding is not supported")
        }, r.cwd = function () {
            return "/"
        }, r.chdir = function (e) {
            throw new Error("process.chdir is not supported")
        }, r.umask = function () {
            return 0
        }
    }, {}],
    3: [function (e, t, o) {
        "use strict";
        o.byteLength = function (e) {
            var t = l(e),
                o = t[0],
                n = t[1];
            return 3 * (o + n) / 4 - n
        }, o.toByteArray = function (e) {
            for (var t, o = l(e), n = o[0], a = o[1], s = new r(u(e, n, a)), c = 0, p = a > 0 ? n - 4 : n, h = 0; h < p; h += 4) { t = i[e.charCodeAt(h)] << 18 | i[e.charCodeAt(h + 1)] << 12 | i[e.charCodeAt(h + 2)] << 6 | i[e.charCodeAt(h + 3)], s[c++] = t >> 16 & 255, s[c++] = t >> 8 & 255, s[c++] = 255 & t; }
            a === 2 && (t = i[e.charCodeAt(h)] << 2 | i[e.charCodeAt(h + 1)] >> 4, s[c++] = 255 & t);
            a === 1 && (t = i[e.charCodeAt(h)] << 10 | i[e.charCodeAt(h + 1)] << 4 | i[e.charCodeAt(h + 2)] >> 2, s[c++] = t >> 8 & 255, s[c++] = 255 & t);
            return s
        }, o.fromByteArray = function (e) {
            for (var t, o = e.length, i = o % 3, r = [], a = 0, s = o - i; a < s; a += 16383) { r.push(h(e, a, a + 16383 > s ? s : a + 16383)); }
            i === 1 ? (t = e[o - 1], r.push(n[t >> 2] + n[t << 4 & 63] + "==")) : i === 2 && (t = (e[o - 2] << 8) + e[o - 1], r.push(n[t >> 10] + n[t >> 4 & 63] + n[t << 2 & 63] + "="));
            return r.join("")
        };
        for (var n = [], i = [], r = typeof Uint8Array !== "undefined" ? Uint8Array : Array, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0, c = a.length; s < c; ++s) { n[s] = a[s], i[a.charCodeAt(s)] = s; }

        function l(e) {
            var t = e.length;
            if (t % 4 > 0) { throw new Error("Invalid string. Length must be a multiple of 4"); }
            var o = e.indexOf("=");
            return o === -1 && (o = t), [o, o === t ? 0 : 4 - o % 4]
        }

        function u(e, t, o) {
            return 3 * (t + o) / 4 - o
        }

        function p(e) {
            return n[e >> 18 & 63] + n[e >> 12 & 63] + n[e >> 6 & 63] + n[63 & e]
        }

        function h(e, t, o) {
            for (var n, i = [], r = t; r < o; r += 3) { n = (e[r] << 16 & 16711680) + (e[r + 1] << 8 & 65280) + (255 & e[r + 2]), i.push(p(n)); }
            return i.join("")
        }
        i["-".charCodeAt(0)] = 62, i["_".charCodeAt(0)] = 63
    }, {}],
    4: [function (e, t, o) {
        (function (n, i) {
            (function (e, n) {
                typeof o === "object" && void 0 !== t ? t.exports = n() : typeof define === "function" && define.amd ? define(n) : e.ES6Promise = n()
            })(this, function () {
                "use strict";

                function t(e) {
                    var t = typeof e;
                    return e !== null && (t === "object" || t === "function")
                }

                function o(e) {
                    return typeof e === "function"
                }
                var r = Array.isArray ? Array.isArray : function (e) {
                    return Object.prototype.toString.call(e) === "[object Array]"
                },
                    a = 0,
                    s = void 0,
                    c = void 0,
                    l = function (e, t) {
                        g[a] = e, g[a + 1] = t, (a += 2) === 2 && (c ? c(y) : m())
                    };
                var u = typeof window !== "undefined" ? window : void 0,
                    p = u || {},
                    h = p.MutationObserver || p.WebKitMutationObserver,
                    f = typeof self === "undefined" && void 0 !== n && {}.toString.call(n) === "[object process]",
                    d = typeof Uint8ClampedArray !== "undefined" && typeof importScripts !== "undefined" && typeof MessageChannel !== "undefined";

                function _() {
                    var e = setTimeout;
                    return function () {
                        return e(y, 1)
                    }
                }
                var g = new Array(1e3);

                function y() {
                    for (var e = 0; e < a; e += 2) {
                        (0, g[e])(g[e + 1]), g[e] = void 0, g[e + 1] = void 0
                    }
                    a = 0
                }
                var m = void 0;

                function v(e, t) {
                    var o = this,
                        n = new this.constructor(S);
                    void 0 === n[C] && G(n);
                    var i = o._state;
                    if (i) {
                        var r = arguments[i - 1];
                        l(function () {
                            return D(i, n, r, o._result)
                        })
                    } else { M(o, n, e, t); }
                    return n
                }

                function b(e) {
                    if (e && typeof e === "object" && e.constructor === this) { return e; }
                    var t = new this(S);
                    return F(t, e), t
                }
                m = f ? function () {
                    return n.nextTick(y)
                } : h ? function () {
                    var e = 0,
                        t = new h(y),
                        o = document.createTextNode("");
                    return t.observe(o, {
                        characterData: !0
                    }),
                        function () {
                            o.data = e = ++e % 2
                        }
                }() : d ? function () {
                    var e = new MessageChannel;
                    return e.port1.onmessage = y,
                        function () {
                            return e.port2.postMessage(0)
                        }
                }() : void 0 === u && typeof e === "function" ? function () {
                    try {
                        var e = Function("return this")().require("vertx");
                        return void 0 !== (s = e.runOnLoop || e.runOnContext) ? function () {
                            s(y)
                        } : _()
                    } catch (e) {
                        return _()
                    }
                }() : _();
                var C = Math.random().toString(36).substring(2);

                function S() { }
                var P = void 0,
                    w = 1,
                    O = 2,
                    A = {
                        error: null
                    };

                function R(e) {
                    try {
                        return e.then
                    } catch (e) {
                        return A.error = e, A
                    }
                }

                function T(e, t, o, n) {
                    try {
                        e.call(t, o, n)
                    } catch (e) {
                        return e
                    }
                }

                function k(e, t, o) {
                    l(function (e) {
                        var n = !1,
                            i = T(o, t, function (o) {
                                n || (n = !0, t !== o ? F(e, o) : B(e, o))
                            }, function (t) {
                                n || (n = !0, N(e, t))
                            }, e._label);
                        !n && i && (n = !0, N(e, i))
                    }, e)
                }

                function E(e, t) {
                    t._state === w ? B(e, t._result) : t._state === O ? N(e, t._result) : M(t, void 0, function (t) {
                        return F(e, t)
                    }, function (t) {
                        return N(e, t)
                    })
                }

                function I(e, t, n) {
                    t.constructor === e.constructor && n === v && t.constructor.resolve === b ? E(e, t) : n === A ? (N(e, A.error), A.error = null) : void 0 === n ? B(e, t) : o(n) ? k(e, t, n) : B(e, t)
                }

                function F(e, o) {
                    e === o ? N(e, new TypeError("You cannot resolve a promise with itself")) : t(o) ? I(e, o, R(o)) : B(e, o)
                }

                function x(e) {
                    e._onerror && e._onerror(e._result), L(e)
                }

                function B(e, t) {
                    e._state === P && (e._result = t, e._state = w, e._subscribers.length !== 0 && l(L, e))
                }

                function N(e, t) {
                    e._state === P && (e._state = O, e._result = t, l(x, e))
                }

                function M(e, t, o, n) {
                    var i = e._subscribers,
                        r = i.length;
                    e._onerror = null, i[r] = t, i[r + w] = o, i[r + O] = n, r === 0 && e._state && l(L, e)
                }

                function L(e) {
                    var t = e._subscribers,
                        o = e._state;
                    if (t.length !== 0) {
                        for (var n = void 0, i = void 0, r = e._result, a = 0; a < t.length; a += 3) { n = t[a], i = t[a + o], n ? D(o, n, i, r) : i(r); }
                        e._subscribers.length = 0
                    }
                }

                function j(e, t) {
                    try {
                        return e(t)
                    } catch (e) {
                        return A.error = e, A
                    }
                }

                function D(e, t, n, i) {
                    var r = o(n),
                        a = void 0,
                        s = void 0,
                        c = void 0,
                        l = void 0;
                    if (r) {
                        if ((a = j(n, i)) === A ? (l = !0, s = a.error, a.error = null) : c = !0, t === a) { return void N(t, new TypeError("A promises callback cannot return that same promise.")) }
                    } else { a = i, c = !0; }
                    t._state !== P || (r && c ? F(t, a) : l ? N(t, s) : e === w ? B(t, a) : e === O && N(t, a))
                }

                function U(e, t) {
                    try {
                        t(function (t) {
                            F(e, t)
                        }, function (t) {
                            N(e, t)
                        })
                    } catch (t) {
                        N(e, t)
                    }
                }
                var H = 0;

                function G(e) {
                    e[C] = H++, e._state = void 0, e._result = void 0, e._subscribers = []
                }
                var W = function () {
                    function e(e, t) {
                        this._instanceConstructor = e, this.promise = new e(S), this.promise[C] || G(this.promise), r(t) ? (this.length = t.length, this._remaining = t.length, this._result = new Array(this.length), this.length === 0 ? B(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(t), this._remaining === 0 && B(this.promise, this._result))) : N(this.promise, new Error("Array Methods must be provided an Array"))
                    }
                    return e.prototype._enumerate = function (e) {
                        for (var t = 0; this._state === P && t < e.length; t++) { this._eachEntry(e[t], t) }
                    }, e.prototype._eachEntry = function (e, t) {
                        var o = this._instanceConstructor,
                            n = o.resolve;
                        if (n === b) {
                            var i = R(e);
                            if (i === v && e._state !== P) { this._settledAt(e._state, t, e._result); }
                            else if (typeof i !== "function") { this._remaining--, this._result[t] = e; }
                            else if (o === Q) {
                                var r = new o(S);
                                I(r, e, i), this._willSettleAt(r, t)
                            } else {
                                this._willSettleAt(new o(function (t) {
                                    return t(e)
                                }), t)
                            }
                        } else { this._willSettleAt(n(e), t) }
                    }, e.prototype._settledAt = function (e, t, o) {
                        var n = this.promise;
                        n._state === P && (this._remaining--, e === O ? N(n, o) : this._result[t] = o), this._remaining === 0 && B(n, this._result)
                    }, e.prototype._willSettleAt = function (e, t) {
                        var o = this;
                        M(e, void 0, function (e) {
                            return o._settledAt(w, t, e)
                        }, function (e) {
                            return o._settledAt(O, t, e)
                        })
                    }, e
                }();

                function z() {
                    throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
                }

                function $() {
                    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
                }
                var Q = function () {
                    function e(t) {
                        this[C] = H++, this._result = this._state = void 0, this._subscribers = [], S !== t && (typeof t !== "function" && z(), this instanceof e ? U(this, t) : $())
                    }
                    return e.prototype.catch = function (e) {
                        return this.then(null, e)
                    }, e.prototype.finally = function (e) {
                        var t = this.constructor;
                        return o(e) ? this.then(function (o) {
                            return t.resolve(e()).then(function () {
                                return o
                            })
                        }, function (o) {
                            return t.resolve(e()).then(function () {
                                throw o
                            })
                        }) : this.then(e, e)
                    }, e
                }();
                return Q.prototype.then = v, Q.all = function (e) {
                    return new W(this, e).promise
                }, Q.race = function (e) {
                    var t = this;
                    return r(e) ? new t(function (o, n) {
                        for (var i = e.length, r = 0; r < i; r++) { t.resolve(e[r]).then(o, n) }
                    }) : new t(function (e, t) {
                        return t(new TypeError("You must pass an array to race."))
                    })
                }, Q.resolve = b, Q.reject = function (e) {
                    var t = new this(S);
                    return N(t, e), t
                }, Q._setScheduler = function (e) {
                    c = e
                }, Q._setAsap = function (e) {
                    l = e
                }, Q._asap = l, Q.polyfill = function () {
                    var e = void 0;
                    if (void 0 !== i) { e = i; }
                    else if (typeof self !== "undefined") { e = self; }
                    else {
                        try {
                            e = Function("return this")()
                        } catch (e) {
                            throw new Error("polyfill failed because global object is unavailable in this environment")
                        }
                    }
                    var t = e.Promise;
                    if (t) {
                        var o = null;
                        try {
                            o = Object.prototype.toString.call(t.resolve())
                        } catch (e) { }
                        if (o === "[object Promise]" && !t.cast) { return }
                    }
                    e.Promise = Q
                }, Q.Promise = Q, Q
            })
        }).call(this, e("_process"), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {
        _process: 2
    }],
    5: [function (e, t, o) {
        "use strict";
        var n = e("./lib/Pomelo");
        t.exports = new n({
            wsCreator: function (e) {
                var t = e.url,
                    o = e.onError,
                    n = e.onOpen,
                    i = e.onMessage,
                    r = e.onClose,
                    a = wx.connectSocket({
                        url: t
                    });
                return a.onError(o), a.onOpen(n), a.onMessage(i), a.onClose(r), a
            },
            wsCreatorWeb: function (e) {
                var t = e.url,
                    o = e.onError,
                    n = e.onOpen,
                    i = e.onMessage,
                    r = e.onClose,
                    a = new WebSocket(serverString);
                return a.onerror = o, a.onopen = n, a.onmessage = i, a.onclose = r, a
            },
            urlGenerator: function (e, t, o) {
                return e + o
            }
        })
    }, {
        "./lib/Pomelo": 8
    }],
    6: [function (e, t, o) {
        "use strict";
        var n = function () {
            function e(e, t) {
                for (var o = 0; o < t.length; o++) {
                    var n = t[o];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function (t, o, n) {
                return o && e(t.prototype, o), n && e(t, n), t
            }
        }();

        function i(e, t) {
            if (!(e instanceof t)) { throw new TypeError("Cannot call a class as a function") }
        }
        var r = e("./Protocal"),
            a = e("./util").copyArray;
        t.exports = function () {
            function e() {
                i(this, e)
            }
            return n(e, null, [{
                key: "encode",
                value: function (e, t, o, n, i) {
                    var a = 1 + (s(t) ? l(e) : 0);
                    if (c(t)) {
                        if (o) {
                            if (typeof n !== "number") { throw new Error("error flag for number route!"); }
                            a += 2
                        } else if (a += 1, n) {
                            if ((n = r.strencode(n)).length > 255) { throw new Error("route maxlength is overflow"); }
                            a += n.length
                        }
                    }
                    i && (a += i.length);
                    var d = new Uint8Array(a),
                        _ = 0;
                    return _ = u(t, o, d, _), s(t) && (_ = p(e, d, _)), c(t) && (_ = h(o, n, d, _)), i && (_ = f(i, d, _)), d
                }
            }, {
                key: "decode",
                value: function (e) {
                    var t = new Uint8Array(e),
                        o = t.length || t.byteLength,
                        n = 0,
                        i = 0,
                        l = null,
                        u = t[n++],
                        p = 1 & u,
                        h = u >> 1 & 7;
                    if (s(h)) {
                        var f = parseInt(t[n]),
                            d = 0;
                        do {
                            i += (127 & (f = parseInt(t[n]))) * Math.pow(2, 7 * d), n++, d++
                        } while (f >= 128)
                    }
                    if (c(h)) {
                        if (p) { l = t[n++] << 8 | t[n++]; }
                        else {
                            var _ = t[n++];
                            _ ? (l = new Uint8Array(_), a(l, 0, t, n, _), l = r.strdecode(l)) : l = "", n += _
                        }
                    } var g = o - n,
                        y = new Uint8Array(g);
                    return a(y, 0, t, n, g), {
                        id: i,
                        type: h,
                        compressRoute: p,
                        route: l,
                        body: y
                    }
                }
            }, {
                key: "TYPE_REQUEST",
                get: function () {
                    return 0
                }
            }, {
                key: "TYPE_NOTIFY",
                get: function () {
                    return 1
                }
            }, {
                key: "TYPE_RESPONSE",
                get: function () {
                    return 2
                }
            }, {
                key: "TYPE_PUSH",
                get: function () {
                    return 3
                }
            }]), e
        }();
        var s = function (e) {
            return e === 0 || e === 2
        },
            c = function (e) {
                return e === 0 || e === 1 || e === 3
            },
            l = function (e) {
                var t = 0;
                do {
                    t += 1, e >>= 7
                } while (e > 0);
                return t
            },
            u = function (e, t, o, n) {
                if (e !== 0 && e !== 1 && e !== 2 && e !== 3) { throw new Error("unkonw message type: " + e); }
                return o[n] = e << 1 | (t ? 1 : 0), n + 1
            },
            p = function (e, t, o) {
                do {
                    var n = e % 128,
                        i = Math.floor(e / 128);
                    i !== 0 && (n += 128), t[o++] = n, e = i
                } while (e !== 0);
                return o
            },
            h = function (e, t, o, n) {
                if (e) {
                    if (t > 65535) { throw new Error("route number is overflow"); }
                    o[n++] = t >> 8 & 255, o[n++] = 255 & t
                } else { t ? (o[n++] = 255 & t.length, a(o, n, t, 0, t.length), n += t.length) : o[n++] = 0; }
                return n
            },
            f = function (e, t, o) {
                return a(t, o, e, 0, e.length), o + e.length
            }
    }, {
        "./Protocal": 9,
        "./util": 10
    }],
    7: [function (e, t, o) {
        "use strict";
        var n = function () {
            function e(e, t) {
                for (var o = 0; o < t.length; o++) {
                    var n = t[o];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function (t, o, n) {
                return o && e(t.prototype, o), n && e(t, n), t
            }
        }();

        function i(e, t) {
            if (!(e instanceof t)) { throw new TypeError("Cannot call a class as a function") }
        }
        var r = e("./util").copyArray;
        t.exports = function () {
            function e() {
                i(this, e)
            }
            return n(e, null, [{
                key: "encode",
                value: function (e, t) {
                    var o = t ? t.length : 0,
                        n = new Uint8Array(4 + o),
                        i = 0;
                    return n[i++] = 255 & e, n[i++] = o >> 16 & 255, n[i++] = o >> 8 & 255, n[i++] = 255 & o, t && r(n, i, t, 0, o), n
                }
            }, {
                key: "decode",
                value: function (e) {
                    for (var t = 0, o = new Uint8Array(e), n = 0, i = []; t < o.length;) {
                        var a = o[t++],
                            s = (n = (o[t++] << 16 | o[t++] << 8 | o[t++]) >>> 0) ? new Uint8Array(n) : null;
                        r(s, 0, o, t, n), t += n, i.push({
                            type: a,
                            body: s
                        })
                    }
                    return i.length === 1 ? i[0] : i
                }
            }, {
                key: "TYPE_HANDSHAKE",
                get: function () {
                    return 1
                }
            }, {
                key: "TYPE_HANDSHAKE_ACK",
                get: function () {
                    return 2
                }
            }, {
                key: "TYPE_HEARTBEAT",
                get: function () {
                    return 3
                }
            }, {
                key: "TYPE_DATA",
                get: function () {
                    return 4
                }
            }, {
                key: "TYPE_KICK",
                get: function () {
                    return 5
                }
            }]), e
        }()
    }, {
        "./util": 10
    }],
    8: [function (e, t, o) {
        "use strict";
        var n = function () {
            function e(e, t) {
                for (var o = 0; o < t.length; o++) {
                    var n = t[o];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function (t, o, n) {
                return o && e(t.prototype, o), n && e(t, n), t
            }
        }();

        function i(e, t) {
            if (!(e instanceof t)) { throw new TypeError("Cannot call a class as a function") }
        }

        function r(e, t) {
            if (!e) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); }
            return !t || typeof t !== "object" && typeof t !== "function" ? e : t
        }

        function a(e, t) {
            if (typeof t !== "function" && t !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof t); }
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var s = e("events"),
            c = e("./Message"),
            l = e("./Protocal"),
            u = e("./Package"),
            p = "js-websocket",
            h = "0.0.1";

        function f(e, t) {
            var o = new FileReader;
            o.onload = function (e) {
                var o = e.target.result;
                t(o)
            }, o.readAsArrayBuffer(e)
        }

        function d(e) {
            var t = c.decode(e);
            try {
                t.body = JSON.parse(l.strdecode(t.body))
            } catch (e) {
                console.log("defaultDecode err ", l.strdecode(t.body))
            }
            return t
        }

        function _(e, t, o) {
            var n = e ? c.TYPE_REQUEST : c.TYPE_NOTIFY;
            o = l.strencode(JSON.stringify(o));
            return c.encode(e, n, 0, t, o)
        }

        function g(e, t) {
            var o = e;
            return t && (o += ":" + t), o
        }
        t.exports = function (e) {
            function t(e) {
                i(this, t);
                var o = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)),
                    n = e.wsCreator,
                    a = e.wsCreatorWeb,
                    s = e.urlGenerator,
                    c = void 0 === s ? g : s;
                return o.wsCreator = n, o.wsCreatorWeb = a, o.urlGenerator = c, o.reconnect = !1, o.reconncetTimer = null, o.reconnectAttempts = 0, o.reconnectionDelay = 5e3, o.handshakeBuffer = {
                    sys: {
                        type: p,
                        version: h,
                        rsa: {}
                    },
                    user: {}
                }, o.heartbeatInterval = 0, o.heartbeatTimeout = 0, o.nextHeartbeatTimeout = 0, o.gapThreshold = 100, o.heartbeatId = null, o.heartbeatTimeoutId = null, o.handshakeCallback = null, o.callbacks = {}, o.handlers = {}, o.handlers[u.TYPE_HANDSHAKE] = o.handshake.bind(o), o.handlers[u.TYPE_HEARTBEAT] = o.heartbeat.bind(o), o.handlers[u.TYPE_DATA] = o.onData.bind(o), o.handlers[u.TYPE_KICK] = o.onKick.bind(o), o.reqId = 0, o
            }
            return a(t, s), n(t, [{
                key: "handshake",
                value: function (e) {
                    if (console.log("handshake"), (e = JSON.parse(l.strdecode(e))).code !== 501) {
                        if (e.code === 200) {
                            this.handshakeInit(e);
                            var t = u.encode(u.TYPE_HANDSHAKE_ACK);
                            this.send(t), this.initCallback && this.initCallback(this.socket)
                        } else { this.emit("error", "handshake fail"); }
                    }
                    else { this.emit("error", "client version not fullfill") }
                }
            }, {
                key: "handshakeInit",
                value: function (e) {
                    console.log("handshakeInit"), e.sys && e.sys.heartbeat ? (this.heartbeatInterval = 1e3 * e.sys.heartbeat, this.heartbeatTimeout = 2 * this.heartbeatInterval) : (this.heartbeatInterval = 0, this.heartbeatTimeout = 0), typeof this.handshakeCallback === "function" && this.handshakeCallback(e.user)
                }
            }, {
                key: "heartbeat",
                value: function (e) {
                    var t = this;
                    if (this.heartbeatInterval) {
                        var o = u.encode(u.TYPE_HEARTBEAT);
                        this.heartbeatTimeoutId && (clearTimeout(this.heartbeatTimeoutId), this.heartbeatTimeoutId = null), this.heartbeatId || (this.heartbeatId = setTimeout(function () {
                            t.heartbeatId = null, t.send(o), t.nextHeartbeatTimeout = Date.now() + t.heartbeatTimeout, t.heartbeatTimeoutId = setTimeout(function () {
                                return t.heartbeatTimeoutCb()
                            }, t.heartbeatTimeout)
                        }, this.heartbeatInterval))
                    }
                }
            }, {
                key: "heartbeatTimeoutCb",
                value: function () {
                    var e = this,
                        t = this.nextHeartbeatTimeout - Date.now();
                    t > this.gapThreshold ? this.heartbeatTimeoutId = setTimeout(function () {
                        return e.heartbeatTimeoutCb()
                    }, t) : (console.error("server heartbeat timeout"), this.emit("heartbeat timeout"), this.disconnect())
                }
            }, {
                key: "reset",
                value: function () {
                    this.reconnect = !1, this.reconnectionDelay = 5e3, this.reconnectAttempts = 0, clearTimeout(this.reconncetTimer)
                }
            }, {
                key: "init",
                value: function (e, t) {
                    this.initCallback = t, this.params = e;
                    var o = e.host,
                        n = e.port,
                        i = e.user,
                        r = e.gamePath,
                        a = e.handshakeCallback,
                        s = e.encode,
                        c = void 0 === s ? _ : s,
                        l = e.decode,
                        u = void 0 === l ? d : l,
                        p = (e.debugMode, e.browserWS);
                    this.encode = c, this.decode = u, this.url = this.urlGenerator(o, n, r), p && (this.wsCreator = this.wsCreatorWeb, this.browserWS = p), this.handshakeBuffer.user = i, this.handshakeCallback = a, this.connect()
                }
            }, {
                key: "connect",
                value: function () {
                    var e = this,
                        t = this.params,
                        o = t.maxReconnectAttempts || 10,
                        n = this.url;
                    this.socket = this.wsCreator({
                        url: n,
                        onError: function (t) {
                            e.emit("io-error", t), console.error("socket error: ", t)
                        },
                        onOpen: function (t) {
                            e.reconnect && e.emit("reconnect"), e.reset();
                            var o = u.encode(u.TYPE_HANDSHAKE, l.strencode(JSON.stringify(e.handshakeBuffer)));
                            e.send(o)
                        },
                        onMessage: function (t) {
                            e.browserWS ? f(t.data, function (t) {
                                e.processPackage(u.decode(t)), e.heartbeatTimeout && (e.nextHeartbeatTimeout = Date.now() + e.heartbeatTimeout)
                            }) : (e.processPackage(u.decode(t.data)), e.heartbeatTimeout && (e.nextHeartbeatTimeout = Date.now() + e.heartbeatTimeout))
                        },
                        onClose: function (n) {
                            e.emit("close", n), e.emit("disconnect", n), t.reconnect && e.reconnectAttempts < o && (e.reconnect = !0, e.reconnectAttempts++, e.reconncetTimer = setTimeout(function () {
                                return e.connect()
                            }, e.reconnectionDelay), e.reconnectionDelay *= 2)
                        }
                    })
                }
            }, {
                key: "disconnect",
                value: function () {
                    this.socket && (this.socket.close(), this.socket = !1), this.heartbeatId && (clearTimeout(this.heartbeatId), this.heartbeatId = null), this.heartbeatTimeoutId && (clearTimeout(this.heartbeatTimeoutId), this.heartbeatTimeoutId = null)
                }
            }, {
                key: "request",
                value: function (e, t, o, n) {


                    t.action = e;
                    t.cookie = document.cookie;
                    t.sessionId = sessionStorage.getItem('sessionId');
                    t.gameName = 'SpaceCatKA';


                    arguments.length === 2 && typeof t === "function" ? (o = t, t = {}) : t = t || {}, (e = e || t.route) && (this.reqId++, this.sendMessage(this.reqId, e, t), o && o != null && void 0 !== o && (this.callbacks[this.reqId] = o))
                }
            }, {
                key: "notify",
                value: function (e, t) {
                    t = t || {}, this.sendMessage(0, e, t)
                }
            }, {
                key: "sendMessage",
                value: function (e, t, o) {
                    o = this.encode(e, t, o);
                    var n = u.encode(u.TYPE_DATA, o);
                    this.send(n)
                }
            }, {
                key: "send",
                value: function (e) {
                    this.browserWS ? this.socket.send(e.buffer) : this.socket.send({
                        data: e.buffer
                    })
                }
            }, {
                key: "onData",
                value: function (e) {
                    e = this.decode(e), this.processMessage(e)
                }
            }, {
                key: "onKick",
                value: function (e) {
                    e = JSON.parse(l.strdecode(e)), this.emit("onKick", e)
                }
            }, {
                key: "processMessage",
                value: function (e) {
                    if (e.id) {
                        var t = this.callbacks[e.id];
                        delete this.callbacks[e.id], typeof t === "function" && t(e.body)
                    } else { this.emit(e.route, e.body) }
                }
            }, {
                key: "processPackage",
                value: function (e) {
                    if (Array.isArray(e)) {
                        for (var t = 0; t < e.length; t++) {
                            var o = e[t];
                            this.handlers[o.type](o.body)
                        }
                    } else { this.handlers[e.type](e.body) }
                }
            }, {
                key: "newInstance",
                value: function () {
                    return new t({
                        wsCreator: this.wsCreator,
                        wsCreatorWeb: this.wsCreatorWeb,
                        urlGenerator: this.urlGenerator
                    })
                }
            }]), t
        }()
    }, {
        "./Message": 6,
        "./Package": 7,
        "./Protocal": 9,
        events: 1
    }],
    9: [function (e, t, o) {
        "use strict";
        var n = function () {
            function e(e, t) {
                for (var o = 0; o < t.length; o++) {
                    var n = t[o];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function (t, o, n) {
                return o && e(t.prototype, o), n && e(t, n), t
            }
        }();

        function i(e, t) {
            if (!(e instanceof t)) { throw new TypeError("Cannot call a class as a function") }
        }
        var r = e("./util").copyArray;
        t.exports = function () {
            function e() {
                i(this, e)
            }
            return n(e, null, [{
                key: "strencode",
                value: function (e) {
                    for (var t = new Uint8Array(3 * e.length), o = 0, n = 0; n < e.length; n++) {
                        var i = e.charCodeAt(n),
                            a = null;
                        a = i <= 127 ? [i] : i <= 2047 ? [192 | i >> 6, 128 | 63 & i] : [224 | i >> 12, 128 | (4032 & i) >> 6, 128 | 63 & i];
                        for (var s = 0; s < a.length; s++) { t[o] = a[s], ++o }
                    }
                    var c = new Uint8Array(o);
                    return r(c, 0, t, 0, o), c
                }
            }, {
                key: "strdecode",
                value: function (e) {
                    for (var t = new Uint8Array(e), o = [], n = 0, i = 0, r = t.length; n < r;) { t[n] < 128 ? (i = t[n], n += 1) : t[n] < 224 ? (i = ((63 & t[n]) << 6) + (63 & t[n + 1]), n += 2) : t[n] < 240 ? (i = ((15 & t[n]) << 12) + ((63 & t[n + 1]) << 6) + (63 & t[n + 2]), n += 3) : t[n] < 256 && (i = ((7 & t[n]) << 18) + ((63 & t[n + 1]) << 12) + ((63 & t[n + 2]) << 6) + (63 & t[n + 3]), n += 4), o.push(i); }
                    var a, s = String.fromCodePoint ? String.fromCodePoint : String.fromCharCode,
                        c = "";
                    for (a = 0; a < o.length / 8192; a++) { c += s.apply(null, o.slice(8192 * a, 8192 * (a + 1))); }
                    return c += s.apply(null, o.slice(8192 * a))
                }
            }]), e
        }()
    }, {
        "./util": 10
    }],
    10: [function (e, t, o) {
        "use strict";
        t.exports.copyArray = function (e, t, o, n, i) {
            if (typeof o.copy === "function") { o.copy(e, t, n, n + i); }
            else { for (var r = 0; r < i; r++) { e[t++] = o[n++] } }
        }
    }, {}],
    AircraftManager: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "af49dL1hnNBn457BUfo/Xjb", "AircraftManager");
        var n = this && this.__decorate || function (e, t, o, n) {
            var i, r = arguments.length,
                a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
            else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
            return r > 3 && a && Object.defineProperty(t, o, a), a
        };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var i = cc._decorator,
            r = i.ccclass,
            a = (i.property, e("../Aircraft")),
            s = e("../../Business/AudioManage"),
            c = function () {
                function e() {
                    this.seatAirCraft = {}, this.mainContainer = null, this.startAsyncPos = !1
                }
                var t;
                return t = e, e.prototype.init = function (e) {
                    this.mainContainer = e
                }, e.prototype.setStartSyncPos = function (e) {
                    this.startAsyncPos = e
                }, e.prototype.getStartSyncPos = function () {
                    return this.startAsyncPos
                }, e.prototype.join = function (e, t, o, n) {
                    if (!this.isExists(o)) {
                        var i = this.createNewOne();
                        i.id = o, i.aircraft = n, i.pos = [], this.mainContainer.addChild(n, t ? 1 : 2, "aircarft_" + e), this.seatAirCraft[o] = i;
                        var r = n.getComponent(a.default);
                        return r && (r.initAircraft(!t), r.setNickName(e, t)), i
                    }
                    return null
                }, e.prototype.leave = function (e) {
                    if (this.isExists(e)) {
                        var t = this.seatAirCraft[e],
                            o = t.aircraft;
                        o.stopAllActions();
                        var n = o.getComponent(a.default);
                        n && n.clear(), o.removeFromParent(), t = null, delete this.seatAirCraft[e], s.default.getInstance().playUserLeave()
                    }
                }, e.prototype.getData = function (e) {
                    return this.isExists(e) ? this.seatAirCraft[e] : null
                }, e.prototype.getAirCraft = function (e) {
                    return this.isExists(e) ? this.seatAirCraft[e].aircraft : null
                }, e.prototype.getPlayIds = function () {
                    return Object.keys(this.seatAirCraft)
                }, e.prototype.getSlaverPlayerIds = function (e) {
                    var t = Object.keys(this.seatAirCraft);
                    return t = t.filter(function (t) {
                        return t !== e
                    })
                }, e.prototype.isExists = function (e) {
                    return !!this.seatAirCraft[e]
                }, e.prototype.createNewOne = function () {
                    return {
                        id: null,
                        aircraft: null,
                        pos: [],
                        state: t.STATE_STANDY
                    }
                }, e.prototype.checkLeavePlayer = function (e, t) {
                    return this.getSlaverPlayerIds(e).filter(function (e) {
                        for (var o = 0; o < t.length; o++) { if (e === t[o]) { return !1; } }
                        return !0
                    })
                }, e.prototype.checkJoin = function (e, t) {
                    var o = this.getSlaverPlayerIds(e);
                    return t.filter(function (t) {
                        return t.id !== e && !(o.indexOf(t.id) >= 0)
                    })
                }, e.prototype.runStandyAnimation = function (e) {
                    e.aircraft.setPosition(cc.v2(0, 0 - this.mainContainer.getContentSize().height / 2 - 200)), e.aircraft.setScale(.2);
                    var o = this,
                        n = this.mainContainer.y - 600,
                        i = -50,
                        r = new Array(160, 0, 0, 0),
                        s = new Array(0, -200, 200, -400),
                        c = Object.keys(this.seatAirCraft).length;
                    n += r[c - 1], i += s[c - 1], e.aircraft.runAction(cc.sequence(cc.spawn(cc.scaleTo(2, 1), cc.moveTo(2, i, n)), cc.callFunc(function (e, n) {
                        var i = o.getData(n.id);
                        i && (i.state = t.STATE_REDAY);
                        var r = e.getComponent(a.default);
                        r && r.runFocusArrowAnim()
                    }, this, e)))
                }, e.prototype.runSlaveMoveAction = function (e) {
                    if (this.isExists(e.playerId)) {
                        var o = this.getData(e.playerId);
                        if (o.state == t.STATE_STANDY) { return; }
                        o.pos.length >= 2 && o.pos.pop(), o.pos.push(e.pos);
                        var n = o.pos;
                        o.pos = [];
                        var i = cc.moveTo(1, n[0]);
                        i = i.easing(cc.easeSineOut()), o.aircraft.runAction(i)
                    }
                }, e.STATE_STANDY = 0, e.STATE_REDAY = 1, e = t = n([r], e)
            }();
        o.default = c, cc._RF.pop()
    }, {
        "../../Business/AudioManage": "AudioManage",
        "../Aircraft": "Aircraft"
    }],
    Aircraft: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "3a202DixExKJ6s3HjJmo0Ls", "Aircraft");
        var n = this && this.__extends || function () {
            var e = function (t, o) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                    })(t, o)
            };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("../../Utils/CCHelper")),
            c = e("../Business/AudioManage"),
            l = e("../../Utils/KAFishGameAssets"),
            u = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t.speedX = 16, t.speedY = 16, t.skin = 1, t.updateSkin = !1, t.movePos = null, t.shipSpine = null, t.isMaster = !1, t.animationName = null, t.runSpeedupAura = !1, t.ndAura = null, t.ndEffect = null, t.isLockMode = !1, t
                }
                return n(t, e), t.prototype.onLoad = function () {
                    var e = this.node.getChildByName("ship"),
                        t = this.node.getChildByName("id"),
                        o = this.node.getChildByName("_selfarrow");
                    this.ndEffect = this.node.getChildByName("effect"), this.ndEffect.active = !1, e.setPosition(cc.v2(0, 0)), t.setPosition(cc.v2(0, -90)), o.setPosition(cc.v2(0, 213)), this.shipSpine = e.getComponent(sp.Skeleton), this.ndAura = this.node.getChildByName("aura"), this.ndAura.getComponent(cc.Sprite).spriteFrame = l.default.getSpriteFrame("effectAltas", "speedup_aura"), this.ndAura.active = !1, this.isLockMode = !1
                }, t.prototype.setLockMode = function (e) {
                    this.isLockMode = e
                }, t.prototype.getLockMode = function () {
                    return this.isLockMode
                }, t.prototype.setNickName = function (e, t) {
                    var o = this.node.getChildByName("id"),
                        n = o.getComponent(cc.Label);
                    t && (e = s.default.maskNickName(e), o.color = cc.color(255, 255, 255)), n.string = e
                }, t.prototype.initAircraft = function (e) {
                    this.isMaster = e, this.shipSpine.skeletonData = l.default.getSpine("S1"), this.shipSpine.setAnimationCacheMode(sp.Skeleton.AnimationCacheMode.SHARED_CACHE), this.shipSpine.setAnimation(0, this.isMaster ? "Idle" : "Idle_other", !0)
                }, t.prototype.isMasterPlayer = function () {
                    return this.isMaster
                }, t.prototype.clear = function () {
                    this.node.getChildByName("_selfarrow").active = !1, this.shipSpine.skeletonData = null, this.node.active = !1
                }, t.prototype.setAirCraftPos = function (e) {
                    this.node.setPosition(e)
                }, t.prototype.setMovePosition = function (e) {
                    this.movePos = e
                }, t.prototype.setLevel = function (e) {
                    this.skin != e && this.changeSkin(e), this.skin = e
                }, t.prototype.moveToTarget = function (e) {
                    if (this.movePos && this.isMaster) {
                        var t = this.node.parent.convertToNodeSpaceAR(this.movePos);
                        if (this.node.position.sub(t).mag() <= 10) { this.movePos = null; }
                        else {
                            var o = this.speedX,
                                n = this.speedY,
                                i = this.node.x < 0 ? -this.node.x : this.node.x,
                                r = this.node.y < 0 ? -this.node.y : this.node.y,
                                a = t.x < 0 ? -t.x : t.x,
                                s = t.y < 0 ? -t.y : t.y,
                                c = i - a;
                            (c <= 10 && c >= 0 || c >= -10 && c <= 0) && (o = .1);
                            var l = r - s;
                            (l <= 10 && l >= 0 || l >= -10 && l <= 0) && (n = .1), this.isLockMode && (o = o == .1 ? 2 : o, n = n == .1 ? 2 : n), this.node.x != t.x && (this.node.x += t.x < this.node.x ? -o : o), this.node.y != t.y && (this.node.y += t.y < this.node.y ? -n : n)
                        }
                    }
                }, t.prototype.runFocusArrowAnim = function () {
                    var e = this.node.getChildByName("_selfarrow");
                    if (!e || this.isMaster) {
                        if (e && this.isMaster) {
                            var t = cc.repeatForever(cc.jumpTo(.8, cc.v2(e.x, e.y), 30, 1));
                            e.active = !0;
                            var o = e.runAction(t);
                            setTimeout(function () {
                                e.stopAction(o), e.active = !1
                            }, 3e3)
                        }
                    } else { e.active = !1 }
                }, t.prototype.enableSpeedUpAura = function (e) {
                    this.runSpeedupAura = e
                }, t.prototype.playSpeedUpAura = function (e) {
                    if (!this.ndAura.active) {
                        this.ndAura.active = !0;
                        var t = this;
                        this.unscheduleAllCallbacks(), this.ndEffect.active = !0;
                        var o = this.ndEffect.getComponent(sp.Skeleton);
                        o.unscheduleAllCallbacks(), o.skeletonData = l.default.getSpine("speedeffect"), o.setAnimationCacheMode(sp.Skeleton.AnimationCacheMode.SHARED_CACHE), o.setAnimation(0, "animation", !1), o.setCompleteListener(function () {
                            var e = cc.scaleTo(.3, 4, 4);
                            e.easing = cc.easeBackInOut, t.ndAura.runAction(cc.sequence(cc.spawn(e, cc.fadeOut(.3)), cc.callFunc(function () {
                                t.ndAura.setScale(1), t.ndAura.opacity = 255
                            }))), o.skeletonData = null, t.ndEffect.active = !1
                        }), c.default.getInstance().playTurboShootStart(), this.scheduleOnce(function () {
                            t.stopSpeedUpAura()
                        }, e.effect.duration)
                    }
                }, t.prototype.stopSpeedUpAura = function () {
                    this.ndAura.active = !1;
                    var e = this.ndAura.getComponent(cc.Animation);
                    e && e.stop(), c.default.getInstance().playTurboShootEnd()
                }, t.prototype.hasSpeedUpAura = function () {
                    return this.ndAura.active
                }, t.prototype.changeSkin = function (e) {
                    this.shipSpine.paused = !0, this.shipSpine.skeletonData = l.default.getSpine("S" + e), this.shipSpine.setAnimationCacheMode(sp.Skeleton.AnimationCacheMode.SHARED_CACHE), this.shipSpine.setAnimation(0, this.isMaster ? "Idle" : "Idle_other", !0), this.shipSpine.paused = !1, e == 1 ? this.ndAura.setPosition(cc.v2(0, 5)) : e == 2 ? this.ndAura.setPosition(cc.v2(0, 25)) : e == 3 && this.ndAura.setPosition(cc.v2(0, 20))
                }, t.prototype.update = function (e) {
                    this.moveToTarget(e), this.ndAura.active && (this.ndAura.angle -= 6, this.ndAura.angle < -360 && (this.ndAura.angle = 0))
                }, t.MAX_SHIP = 3, t = i([a], t)
            }(cc.Component);
        o.default = u, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper",
        "../../Utils/KAFishGameAssets": "KAFishGameAssets",
        "../Business/AudioManage": "AudioManage"
    }],
    AndroidAskFullScreen: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "3d26fc68NdMYqUQ/EdQc06w", "AndroidAskFullScreen");
        var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("../Business/AudioManage")),
            c = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t._parent = null, t
                }
                var o;
                return n(t, e), o = t, t.prototype._btnFullScreenClick = function (e) {
                    s.default.getInstance().playBtnEffect(), e.target.runAction(cc.sequence(cc.scaleTo(.05, .8), cc.scaleTo(.05, 1))), cc.screen.requestFullScreen(), cc.screen.fullScreen ? cc.screen.exitFullScreen() : cc.screen.requestFullScreen(), s.default.getInstance().playBtnEffect(), o.instance.close()
                }, t.prototype._bgTouchClick = function (e) {
                    s.default.getInstance().playBtnEffect(), o.instance.close()
                }, t.prototype.show = function (e) {
                    o.instance = this, this.node.position = cc.v2(0, 0);
                    var t = this.node.getChildByName("_btnbg"),
                        n = this.node.getChildByName("_info").getChildByName("_btnfullscreen");
                    t.on(cc.Node.EventType.TOUCH_END, this._bgTouchClick, e, !0), n.on(cc.Node.EventType.TOUCH_END, this._btnFullScreenClick, e, !0), this.node.active = !0
                }, t.prototype.close = function () {
                    var e = this.node.getChildByName("_btnbg"),
                        t = this.node.getChildByName("_info").getChildByName("_btnfullscreen");
                    e.off(cc.Node.EventType.TOUCH_END, this._bgTouchClick, this), t.off(cc.Node.EventType.TOUCH_END, this._btnFullScreenClick, this), this.node.active = !1, this.node.destroy()
                }, t.TAG_NAME = "Android_Fullscreen_Frame", t.instance = null, t = o = i([a], t)
            }(cc.Component);
        o.default = c, cc._RF.pop()
    }, {
        "../Business/AudioManage": "AudioManage"
    }],
    AnimationBingo: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "4a34d841uFB4aRn/VSesovd", "AnimationBingo");
        var n = this && this.__extends || function () {
            var e = function (t, o) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                    })(t, o)
            };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("../../Utils/CCHelper")),
            c = e("../../Utils/RealMoneyPlatform"),
            l = e("../../Utils/KAFishGameAssets"),
            u = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t._recycleCb = null, t._bgimg = null, t
                }
                return n(t, e), t.prototype.play = function (e, t, o) {
                    var n = c.default.getRealMoney(t),
                        i = this.node.getChildByName("_amount"),
                        r = i.getChildByName("_currency"),
                        a = i.getChildByName("_money"),
                        u = r.getComponent(cc.Sprite),
                        p = a.getComponent(cc.Label),
                        h = !1;
                    if (this.node.active) {
                        if (n.rmp < parseInt(p.string)) { return; }
                        i.stopAllActions(), h = !0
                    }
                    this.node.active = !0, this._bgimg = this.node.getChildByName("_img"), this._bgimg.angle = 0, a.color = o ? cc.color(255, 255, 255) : cc.color(0, 255, 255), e.y += 100 + this._bgimg.getContentSize().width / 2, this.node.position = this.node.getParent().convertToNodeSpaceAR(e), p.string = c.default.numberFormat(n.rmp), p._updateRenderData(!0), u.spriteFrame = l.default.getSpriteFrame("currencysymbol", "reelwinmeter_" + s.default.getRealSpriteCurrency(n.cy)), n.isbehind ? r.position = cc.v2(a.position.x + a.getContentSize().width / 2 + r.getContentSize().width / 2 + 4, 0) : r.position = cc.v2(a.position.x - a.getContentSize().width / 2 - r.getContentSize().width / 2 - 4, 0);
                    var f = this;
                    h ? (f.unscheduleAllCallbacks(), i.runAction(cc.sequence(cc.scaleTo(.3, 2, 2), cc.scaleTo(.2, 1, 1), cc.callFunc(function () {
                        i.runAction(cc.repeatForever(cc.sequence(cc.rotateTo(.2, 10), cc.rotateTo(.2, 0), cc.rotateTo(.2, 350), cc.rotateTo(.2, 0)))), f.scheduleOnce(function () {
                            f.stop()
                        }, 4)
                    })))) : (i.runAction(cc.repeatForever(cc.sequence(cc.rotateTo(.2, 10), cc.rotateTo(.2, 0), cc.rotateTo(.2, 350), cc.rotateTo(.2, 0)))), this.scheduleOnce(function () {
                        f.stop()
                    }, 4))
                }, t.prototype.isPlay = function () {
                    return this.node.active
                }, t.prototype.stop = function () {
                    this.node.getChildByName("_amount").stopAllActions(), this.node.active = !1
                }, t.prototype.update = function () {
                    this.node.active && (this._bgimg.angle -= 12, this._bgimg.angle < -360 && (this._bgimg.angle = 0))
                }, t = i([a], t)
            }(cc.Component);
        o.default = u, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper",
        "../../Utils/KAFishGameAssets": "KAFishGameAssets",
        "../../Utils/RealMoneyPlatform": "RealMoneyPlatform"
    }],
    AnimationBonus: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "0b80dUeLCRMBrZzwEVQ39Ga", "AnimationBonus");
        var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("../../Utils/CCHelper")),
            c = e("../../Utils/KAFishGameAssets"),
            l = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t._recycleCb = null, t
                }
                return n(t, e), t.prototype.onLoad = function () { }, t.prototype.init = function (e) {
                    this._recycleCb = e;
                    for (var t = this.node.getChildByName("_image").getComponent(cc.Animation); t.getClips().length > 0;) { t.removeClip(t.getClips()[0], !0); }
                    var o, n;
                    o = this.getSpriteFrameList("glowa", 1, 42), n = this.getSBonusSpriteFrameList("sglow", 1, 34);
                    var i = cc.AnimationClip.createWithSpriteFrames(o, 24),
                        r = cc.AnimationClip.createWithSpriteFrames(n, 48);
                    i.wrapMode = cc.WrapMode.Loop, r.wrapMode = cc.WrapMode.Loop, t.addClip(i, "glow"), t.addClip(r, "sglow")
                }, t.prototype.playHitEffect = function (e, t) {
                    this.playAnimation(e, t, "sglow")
                }, t.prototype.playBigHitEffect = function (e, t) {
                    this.playAnimation(e, t, "glow")
                }, t.prototype.playAnimation = function (e, t, o) {
                    var n = this,
                        i = this.node.getChildByName("_image"),
                        r = i.getComponent(cc.Animation),
                        a = this.node.getParent().convertToNodeSpaceAR(e);
                    this.node.position = a, i.position = cc.v2(0, 0), r.stop(), r.play(o), this.scheduleOnce(function () {
                        n._recycleCb && n._recycleCb(n.node)
                    }, .6)
                }, t.prototype.getSpriteFrameList = function (e, t, o) {
                    for (var n = [], i = t; i < o + 1; i++) {
                        var r = e + "_" + s.default.paddingZeroLeft(i.toString(), 2);
                        (a = c.default.getSpriteFrame("effectanimate-0", r)) && n.push(a)
                    }
                    for (i = t; i < o + 1; i++) {
                        var a;
                        r = e + "_" + s.default.paddingZeroLeft(i.toString(), 2);
                        (a = c.default.getSpriteFrame("effectanimate-1", r)) && n.push(a)
                    }
                    return n.sort(), n
                }, t.prototype.getSBonusSpriteFrameList = function (e, t, o) {
                    for (var n = [], i = t; i < o + 1; i++) {
                        var r = e + "_" + s.default.paddingZeroLeft(i.toString(), 2),
                            a = c.default.getSpriteFrame("seffectanimate", r);
                        a && n.push(a)
                    }
                    return n.sort(), n
                }, t = i([a], t)
            }(cc.Component);
        o.default = l, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper",
        "../../Utils/KAFishGameAssets": "KAFishGameAssets"
    }],
    AnimationCoin: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "bad8d2AWgVCq5PcUjaTGpBg", "AnimationCoin");
        var n = this && this.__extends || function () {
            var e = function (t, o) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                    })(t, o)
            };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("../../Utils/RealMoneyPlatform")),
            c = e("../../Utils/KAFishGameAssets"),
            l = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t._recycleCb = null, t
                }
                return n(t, e), t.prototype.onLoad = function () { }, t.prototype.init = function (e) {
                    this._recycleCb = e;
                    var t = [{
                        pre: "coin",
                        start: 1,
                        end: 12
                    }, {
                        pre: "bingo",
                        start: 1,
                        end: 10
                    }],
                        o = this.node.getChildByName("_image").getComponent(cc.Animation);
                    if (o.getClips().length != t.length) {
                        for (; o.getClips().length > 0;) { o.removeClip(o.getClips()[0]); }
                        for (var n = 0; n < t.length; n++) {
                            var i = null;
                            i = t[n].pre === "coin" ? this.getSpriteFrameList(t[n].pre, t[n].start, t[n].end) : this.getBingoSpriteFrameList(t[n].pre, t[n].start, t[n].end);
                            var r = cc.AnimationClip.createWithSpriteFrames(i, t[n].pre === "coin" ? 10 : 15);
                            r.wrapMode = cc.WrapMode.Loop, o.addClip(r, t[n].pre)
                        }
                    }
                }, t.prototype.playAnimation = function (e, t, o, n, i, r, a) {
                    if (t.indexOf("coin") < 0) { this._recycleCb && this._recycleCb(this.node); }
                    else {
                        var c = this,
                            l = this.node.getParent().convertToNodeSpaceAR(e);
                        l.x += 0, l.y += 0, this.node.position = l;
                        var u = this.node.getChildByName("_moneyNode");
                        u.position = cc.v2(0, 0), u.opacity = 255, u.stopAllActions();
                        var p = u.getChildByName("_lbRCurrency");
                        p.active = !1;
                        var h = u.getChildByName("_lbLCurrency"),
                            f = u.getChildByName("_lblAmount"),
                            d = f.getComponent(cc.Label),
                            _ = s.default.getRealMoney(o);
                        if (_.rmp == 0) { d.string = "", h.active = !1, p.active = !1; }
                        else {
                            h.active = !0, d.string = s.default.numberFormat(_.rmp), d._updateRenderData(!0);
                            var g = h.getComponent(cc.Label);
                            g.string = _.cy, g._updateRenderData(!0), s.default.walletInfo.currencySymbolInBack ? h.x = f.x + f.width / 2 + h.width / 2 + 15 : h.x = f.x - f.width / 2 - h.width / 2 - 15, h.y = f.y + 8
                        }
                        n ? (f.color = cc.color(255, 255, 255), h.color = cc.color(255, 255, 255)) : (f.color = cc.color(0, 255, 255), h.color = cc.color(0, 255, 255)), u.runAction(cc.sequence(cc.moveTo(.6, cc.v2(0, 40)), cc.fadeOut(.8), cc.callFunc(function () {
                            c._recycleCb && c._recycleCb(c.node)
                        })))
                    }
                }, t.prototype.moveToTarge = function (e) {
                    var t = this.node.getChildByName("_image");
                    t.stopAllActions();
                    var o = this.node.convertToNodeSpaceAR(cc.v2(e.x - 50, e.y));
                    t.runAction(cc.moveTo(.5, o))
                }, t.prototype.getSpriteFrameList = function (e, t, o) {
                    for (var n = [], i = t; i < o + 1; i++) {
                        var r = e + "_" + i,
                            a = c.default.getSpriteFrame("cannonAtlas", r);
                        n.push(a)
                    }
                    return n
                }, t.prototype.getBingoSpriteFrameList = function (e, t, o) {
                    return []
                }, t = i([a], t)
            }(cc.Component);
        o.default = l, cc._RF.pop()
    }, {
        "../../Utils/KAFishGameAssets": "KAFishGameAssets",
        "../../Utils/RealMoneyPlatform": "RealMoneyPlatform"
    }],
    AnimationFire: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "d37fbbWG1lBSIE0qcLSIltH", "AnimationFire");
        var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = e("../../Utils/KAFishGameAssets"),
            a = cc._decorator,
            s = a.ccclass,
            c = (a.property, function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t._recycleCb = null, t
                }
                return n(t, e), t.prototype.init = function (e, t, o) {
                    this._recycleCb = o;
                    var n = e.animats.fire,
                        i = this.node.getComponent(cc.Animation),
                        r = this.getSpriteFrameList(n.pre, n.start, n.end),
                        a = cc.AnimationClip.createWithSpriteFrames(r, n.speed);
                    a.wrapMode = cc.WrapMode.Loop, i.addClip(a, "fire"), this.node.position = t
                }, t.prototype.playAnimation = function () {
                    var e = this,
                        t = this.node.getComponent(cc.Animation);
                    t.stop(), t.play("fire"), this.scheduleOnce(function () {
                        e._recycleCb && e._recycleCb(e.node)
                    }, .2)
                }, t.prototype.getSpriteFrameList = function (e, t, o) {
                    for (var n = [], i = t; i < o + 1; i++) {
                        var a = e + "_" + i,
                            s = r.default.getSpriteFrame("cannonAtlas", a);
                        n.push(s)
                    }
                    return n
                }, t = i([s], t)
            }(cc.Component));
        o.default = c, cc._RF.pop()
    }, {
        "../../Utils/KAFishGameAssets": "KAFishGameAssets"
    }],
    AnimationFlash: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "e4485+98idJULlKsRsLzwfm", "AnimationFlash");
        var n = this && this.__extends || function () {
            var e = function (t, o) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                    })(t, o)
            };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = e("../../Utils/KAFishGameAssets"),
            a = cc._decorator,
            s = a.ccclass,
            c = (a.property, function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t._recycleCb = null, t
                }
                return n(t, e), t.prototype.init = function (e) {
                    this._recycleCb = e;
                    var t, o = this.node.getComponent(cc.Animation);
                    t = this.getSpriteFrameList("flash", 1, 10);
                    var n = cc.AnimationClip.createWithSpriteFrames(t, 40);
                    n.wrapMode = cc.WrapMode.Loop, o.addClip(n, "flash")
                }, t.prototype.playAnimation = function (e, t) {
                    var o = this;
                    e = this.node.getParent().convertToNodeSpaceAR(e), t = this.node.getParent().convertToNodeSpaceAR(t), this.node.position = e, this.node.angle = -this.calcDegree(e, t);
                    var n = t.sub(e).mag();
                    this.node.scaleX = n / 103, this.node.scaleX > 3 ? this.node.scaleY = 3 : this.node.scaleX < 1 ? this.node.scaleY = 1 : this.node.scaleY = this.node.scaleX;
                    var i = this.node.getComponent(cc.Animation);
                    i.stop(), i.play("flash"), this.scheduleOnce(function () {
                        o._recycleCb && o._recycleCb(o.node)
                    }, .7)
                }, t.prototype.calcDegree = function (e, t) {
                    var o;
                    return t.x - e.x == 0 ? o = t.y - e.y > 0 ? -90 : 90 : (o = 180 * -Math.atan((t.y - e.y) / (t.x - e.x)) / 3.14, t.x < e.x && (o += 180)), o
                }, t.prototype.getSpriteFrameList = function (e, t, o) {
                    for (var n = [], i = t; i <= o; i++) { n.push(r.default.getSpriteFrame("effectAltas", e + "_" + i)); }
                    return n
                }, t = i([s], t)
            }(cc.Component));
        o.default = c, cc._RF.pop()
    }, {
        "../../Utils/KAFishGameAssets": "KAFishGameAssets"
    }],
    AnimationOnlyCoin: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "4383eAgok5F4avJQ1zidPD4", "AnimationOnlyCoin");
        var n = this && this.__extends || function () {
            var e = function (t, o) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                    })(t, o)
            };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("../../Utils/CCHelper")),
            c = e("../../Utils/KAFishGameAssets"),
            l = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t._recycleCb = null, t
                }
                return n(t, e), t.prototype.onLoad = function () { }, t.prototype.init = function (e) {
                    this._recycleCb = e;
                    for (var t = this.node.getChildByName("_image").getComponent(cc.Animation); t.getClips().length > 0;) { t.removeClip(t.getClips()[0]); }
                    var o;
                    o = this.getSpriteFrameList("coin", 1, 12);
                    var n = cc.AnimationClip.createWithSpriteFrames(o, 30);
                    n.wrapMode = cc.WrapMode.Loop, t.addClip(n, "start")
                }, t.prototype.playAnimation = function (e) {
                    var t = this.node.getParent().convertToNodeSpaceAR(e);
                    this.node.position = t;
                    var o = this.node.getChildByName("_image"),
                        n = o.getComponent(cc.Animation);
                    o.position = cc.v2(0, 0), n.stop(), n.play("start")
                }, t.prototype.jumpAndMoveToTarget = function (e, t) {
                    var o = this.node.getChildByName("_image"),
                        n = e ? this.node.convertToNodeSpaceAR(cc.v2(e.x - 50, e.y)) : null,
                        i = s.default.getRandomNum(-200, 200),
                        r = s.default.getRandomNum(30, 200),
                        a = s.default.getRandomNum(3, 6),
                        c = this;
                    n ? o.runAction(cc.sequence(cc.jumpTo(1, cc.v2(i, i), r, a), cc.moveTo(.5 + .05 * t, n), cc.callFunc(function () {
                        c._recycleCb && c._recycleCb(c.node)
                    }))) : o.runAction(cc.sequence(cc.jumpTo(1.5, cc.v2(i, i), r, a), cc.callFunc(function () {
                        c._recycleCb && c._recycleCb(c.node)
                    })))
                }, t.prototype.jumpAndFlyToMoveTarget = function (e, t) {
                    var o = this.node.getChildByName("_image"),
                        n = s.default.getRandomNum(-200, 200),
                        i = s.default.getRandomNum(30, 200),
                        r = s.default.getRandomNum(3, 6),
                        a = this;
                    e ? o.runAction(cc.sequence(cc.jumpTo(1, cc.v2(n, n), i, r), cc.callFunc(function () {
                        if (e && e.getParent()) {
                            var t = e.getParent().convertToWorldSpaceAR(e.position),
                                n = t ? a.node.convertToNodeSpaceAR(cc.v2(t.x, t.y)) : null;
                            o.runAction(cc.sequence(cc.moveTo(.3, n), cc.callFunc(function () {
                                a._recycleCb && a._recycleCb(a.node)
                            })))
                        } else { a._recycleCb && a._recycleCb(a.node) }
                    }))) : o.runAction(cc.sequence(cc.jumpTo(1.5, cc.v2(n, n), i, r), cc.callFunc(function () {
                        a._recycleCb && a._recycleCb(a.node)
                    })))
                }, t.prototype.getSpriteFrameList = function (e, t, o) {
                    for (var n = [], i = t; i < o + 1; i++) {
                        var r = e + "_" + i,
                            a = c.default.getSpriteFrame("cannonAtlas", r);
                        n.push(a)
                    }
                    return n
                }, t = i([a], t)
            }(cc.Component);
        o.default = l, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper",
        "../../Utils/KAFishGameAssets": "KAFishGameAssets"
    }],
    AnimationPause: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "097ddv9bDRDy6UDJIMctBz0", "AnimationPause");
        var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = e("../Business/AudioManage"),
            a = cc._decorator,
            s = a.ccclass,
            c = (a.property, function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t._ndParticleSys = null, t._ndSprite = null, t._pauseTime = 0, t._callback = null, t
                }
                return n(t, e), t.prototype.onLoad = function () {
                    this.node.active = !1, this.loadAllRes()
                }, t.prototype.loadAllRes = function () { }, t.prototype.playAnimation = function (e, t) {
                    if (!this.node.active) {
                        this._callback = t, this._pauseTime = e, this.node.active = !0;
                        var o = this.node.getChildByName("_cycle");
                        o.active = !0;
                        var n = cc.scaleTo(.5, 20);
                        n.easing = cc.easeExponentialIn, o.runAction(cc.sequence(n, cc.callFunc(function (e) {
                            e.setScale(1), e.active = !1
                        })))
                    }
                }, t.prototype.stop = function () {
                    this.node.active = !1, this._pauseTime = 0
                }, t.prototype.update = function (e) {
                    this._pauseTime > 0 ? this._pauseTime -= e : this.node.active && (this.node.active = !1, r.default.getInstance().playThawedOut(), this._callback && this._callback())
                }, t = i([s], t)
            }(cc.Component));
        o.default = c, cc._RF.pop()
    }, {
        "../Business/AudioManage": "AudioManage"
    }],
    AudioManage: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "5567erOxZtG8pwC3ZzOpYuc", "AudioManage");
        var n = this && this.__extends || function () {
            var e = function (t, o) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                    })(t, o)
            };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("../../Utils/CCHelper")),
            c = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t._musicAudioId = -1, t._effectAudioId = -1, t._effectPause = !1, t._effectDisable = !1, t._musicDisable = !1, t._audioClips = {}, t._bgMusicName1 = "SpaceCat_bg1", t._bgMusicName2 = "SpaceCat_bg2", t._bgBossMusicName = "SpaceCat_BossBattle", t._gunlevel = 0, t._shipLevel = 1, t._prefix = "SpaceCat_", t
                }
                var o;
                return n(t, e), o = t, t.getInstance = function () {
                    return o._instance
                }, t.prototype.onLoad = function () {
                    o._instance = this, this.loadAllRes()
                }, t.prototype.loadAllRes = function () {
                    var e = this;
                    if (this._audioClips) {
                        ["SpaceCat_bg1", "SpaceCat_bg2", "SpaceCat_BossBattle"].forEach(function (t, o, n) {
                            var i = "sound/music/" + t + ".mp3";
                            s.default.loadResource(i, function (o) {
                                cc.log(t, " ", o), e._audioClips && (e._audioClips[t] = o)
                            })
                        });
                        ["SpaceCat_Auto", "SpaceCat_BetDecrement", "SpaceCat_BetIncrement", "SpaceCat_Bingo", "SpaceCat_BigGunFire", "SpaceCat_BigWinSound", "SpaceCat_ButtonPress", "SpaceCat_FishHit", "SpaceCat_FishHit2", "SpaceCat_FishHit3", "SpaceCat_FishThawedOut", "SpaceCat_FishTypePopUp", "SpaceCat_FreezeBomb", "SpaceCat_FrozenBombEntered", "SpaceCat_LightningChain", "SpaceCat_LightningChainEntered", "SpaceCat_Lock", "SpaceCat_LuckyAurax7", "SpaceCat_MediumGunFire", "SpaceCat_MediumWinSound", "SpaceCat_NewPlayerJoined", "SpaceCat_PlayerLeft", "SpaceCat_SmallGunFire", "SpaceCat_SmallWinSound", "SpaceCat_StopAuto", "SpaceCat_Unlock", "SpaceCat_wave", "SpaceCat_big_cock", "SpaceCat_medium_cock", "SpaceCat_small_cock", "SpaceCat_BossEnter1", "SpaceCat_BossEnter2", "SpaceCat_BossEnter3", "SpaceCat_BossSoldierSpawn1", "SpaceCat_BossSoldierSpawn2", "SpaceCat_BossSoldierSpawn3", "SpaceCat_TurboBoxEnter", "SpaceCat_TurboShootStart", "SpaceCat_TurboShootEnd", "SpaceCat_BossLostLife1", "SpaceCat_BossLostLife2", "SpaceCat_BossLostLife3", "SpaceCat_BossCoinWin", "SpaceCat_BossDeath1", "SpaceCat_BossDeath2", "SpaceCat_BossDeath3", "SpaceCat_SmallRoomEnter", "SpaceCat_MediumRoomEnter", "SpaceCat_LargeRoomEnter"].forEach(function (t, o, n) {
                            var i = "sound/music/" + t + ".mp3";
                            s.default.loadResource(i, function (o) {
                                e._audioClips && (e._audioClips[t] = o)
                            })
                        })
                    }
                }, t.prototype.onDestroy = function () {
                    this._musicAudioId != -1 && cc.audioEngine.stop(this._musicAudioId), this._effectAudioId != -1 && cc.audioEngine.stop(this._effectAudioId), this._musicAudioId = -1, this._effectAudioId = -1
                }, t.prototype.start = function () {
                    this.playBgMusic(o._instance._bgMusicName1)
                }, t.prototype.changeMusicVolume = function (e) {
                    this._musicAudioId != -1 && cc.audioEngine.setVolume(this._musicAudioId, e)
                }, t.prototype.playTestEffect = function () { }, t.prototype.changeEffectVolume = function (e) { }, t.prototype.stopEffect = function () {
                    this._effectAudioId != -1 && cc.audioEngine.setEffectsVolume(0)
                }, t.prototype.stopMusic = function () {
                    this._musicAudioId != -1 && cc.audioEngine.setMusicVolume(0)
                }, t.prototype.disableEffect = function (e) {
                    this._effectDisable = e, e ? this.stopEffect() : cc.audioEngine.setEffectsVolume(1)
                }, t.prototype.disableMusic = function (e) {
                    this._musicDisable = e, e ? this.stopMusic() : (cc.audioEngine.setMusicVolume(1), this._musicAudioId != -1 && cc.audioEngine.setVolume(this._musicAudioId, 1), this._tempbgMusicName && (this.playBgMusic(this._tempbgMusicName), this._tempbgMusicName = null))
                }, t.prototype.pauseMusic = function () {
                    this._musicAudioId != -1 && cc.audioEngine.pause(this._musicAudioId)
                }, t.prototype.resumeMusic = function () {
                    this._musicAudioId != -1 && cc.audioEngine.resume(this._musicAudioId)
                }, t.prototype.pauseEffect = function () {
                    this._effectPause = !0, this._effectAudioId != -1 && (cc.audioEngine.stop(this._effectAudioId), this._effectAudioId = -1)
                }, t.prototype.resumeEffect = function () {
                    this._effectPause = !1
                }, t.prototype.playBgMusic = function (e) {
                    this._musicDisable ? this._tempbgMusicName = e : (this._musicAudioId != -1 && (cc.audioEngine.stop(this._musicAudioId), this._musicAudioId = -1), this._audioClips[e] && (this._musicAudioId = cc.audioEngine.play(this._audioClips[e], !0, 1)))
                }, t.prototype.playCannonSwitchEffect = function (e, t) {
                    if (e > this._gunlevel ? this._playEffect(this._audioClips[this._prefix + "BetIncrement"], null) : this._playEffect(this._audioClips[this._prefix + "BetDecrement"], null), t != this._shipLevel) {
                        var o = "small_cock";
                        t == 2 ? o = "medium_cock" : t == 3 && (o = "big_cock"), this._playEffect(this._audioClips[this._prefix + o], null)
                    }
                    this._gunlevel = e, this._shipLevel = t
                }, t.prototype.playGunFire = function (e) {
                    var t = "SmallGunFire";
                    e == 2 ? t = "MediumGunFire" : e == 3 && (t = "BigGunFire"), this._playEffect(this._audioClips[this._prefix + t], null)
                }, t.prototype.playHit = function (e) {
                    var t = "FishHit";
                    e == 2 ? t = "FishHit2" : e == 3 && (t = "FishHit3"), this._playEffect(this._audioClips[this._prefix + t], null)
                }, t.prototype.playPayTablePopUp = function () {
                    this._playEffect(this._audioClips[this._prefix + "FishTypePopUp"], null)
                }, t.prototype.playFreezeBomb = function () {
                    this._playEffect(this._audioClips[this._prefix + "FreezeBomb"], null)
                }, t.prototype.playThawedOut = function () {
                    this._playEffect(this._audioClips[this._prefix + "FishThawedOut"], null)
                }, t.prototype.playFreezeBomEnter = function () {
                    this._playEffect(this._audioClips[this._prefix + "FrozenBombEntered"], null)
                }, t.prototype.playLightning = function () {
                    this._playEffect(this._audioClips[this._prefix + "LightningChain"], null)
                }, t.prototype.playLightningEnter = function () {
                    this._playEffect(this._audioClips[this._prefix + "LightningChainEntered"], null)
                }, t.prototype.playTurboEnter = function () {
                    this._playEffect(this._audioClips[this._prefix + "TurboBoxEnter"], null)
                }, t.prototype.playTurboShootStart = function () {
                    this._playEffect(this._audioClips[this._prefix + "TurboShootStart"], null)
                }, t.prototype.playTurboShootEnd = function () {
                    this._playEffect(this._audioClips[this._prefix + "TurboShootEnd"], null)
                }, t.prototype.playCastEffect = function () { }, t.prototype.playCoinEffect = function (e) {
                    var t = "SmallWinSound";
                    e == 1 ? t = "MediumWinSound" : e == 2 && (t = "BigWinSound"), this._playEffect(this._audioClips[this._prefix + t], null)
                }, t.prototype.playAura = function () {
                    this._playEffect(this._audioClips[this._prefix + "LuckyAurax7"], null)
                }, t.prototype.playBingo = function () {
                    this._playEffect(this._audioClips[this._prefix + "Bingo"], null)
                }, t.prototype.playBtnEffect = function () {
                    this._playEffect(this._audioClips[this._prefix + "ButtonPress"], null)
                }, t.prototype.playBtnAuto = function (e) {
                    var t = e ? "StopAuto" : "Auto";
                    this._playEffect(this._audioClips[this._prefix + t], 1)
                }, t.prototype.playBtnLock = function (e) {
                    var t = stop ? "Unlock" : "Lock";
                    this._playEffect(this._audioClips[this._prefix + t], 1)
                }, t.prototype.playWaveEffect = function () {
                    this._playEffect(this._audioClips[this._prefix + "wave"], null)
                }, t.prototype.playUserJoin = function () {
                    this._playEffect(this._audioClips[this._prefix + "NewPlayerJoined"], null)
                }, t.prototype.playUserLeave = function () {
                    this._playEffect(this._audioClips[this._prefix + "PlayerLeft"], null)
                }, t.prototype.playBossEnter = function (e) {
                    var t = "BossEnter1";
                    e == "Fish_03" ? t = "BossEnter3" : e == "Fish_04" && (t = "BossEnter2"), this._playEffect(this._audioClips[this._prefix + t], null)
                }, t.prototype.playBossSoldierSpawn = function (e) {
                    var t = "BossSoldierSpawn1";
                    e == "Fish_03" ? t = "BossSoldierSpawn3" : e == "Fish_04" && (t = "BossSoldierSpawn2"), this._playEffect(this._audioClips[this._prefix + t], .8)
                }, t.prototype.playBossLostLife = function (e) {
                    var t = "BossLostLife1";
                    e == "Fish_03" ? t = "BossLostLife3" : e == "Fish_04" && (t = "BossLostLife2"), this._playEffect(this._audioClips[this._prefix + t], null)
                }, t.prototype.playBossDeath = function (e) {
                    var t = "BossDeath1";
                    e == "Fish_03" ? t = "BossDeath3" : e == "Fish_04" && (t = "BossDeath2"), this._playEffect(this._audioClips[this._prefix + t], null)
                }, t.prototype.playBossFlyOut = function (e) {
                    var t = "BossFlyOut1";
                    e == "Fish_03" ? t = "BossFlyOut3" : e == "Fish_04" && (t = "BossFlyOut2"), this._playEffect(this._audioClips[this._prefix + t], null)
                }, t.prototype.playEnterRoom = function (e) {
                    var t = "SmallRoomEnter";
                    e == 1 ? t = "MediumRoomEnter" : e == 2 && (t = "LargeRoomEnter"), cc.log("Enter room " + e), this._playEffect(this._audioClips[this._prefix + t], null)
                }, t.prototype.playBossCoinWin = function () {
                    this._playEffect(this._audioClips[this._prefix + "BossCoinWin"], null)
                }, t.prototype.playBoyEffect = function (e) { }, t.prototype.playGirlEffect = function (e) { }, t.prototype._playEffect = function (e, t) {
                    t || (t = 1), this._effectPause != 1 && (this._effectDisable || (this._effectAudioId != -1 && (this._effectAudioId = -1), this._effectAudioId = cc.audioEngine.play(e, !1, t)))
                }, t._instance = null, t = o = i([a], t)
            }(cc.Component);
        o.default = c, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper"
    }],
    AutoScollLayer: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "e9bcfQdO4ZPbYAA07rTk1Sm", "AutoScollLayer");
        var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t.direction = o.DIRECTION_Y, t.speed = 1, t.pause = !1, t.scrollBgList = [], t.bgHeight = {}, t
                }
                var o;
                return n(t, e), o = t, t.prototype.onLoad = function () {
                    for (var e = 1; e <= 100; e++) {
                        var t = this.node.getChildByName("_bg" + e);
                        if (!t) { break; }
                        this.scrollBgList.push(t), this.bgHeight[t.name] = t.getContentSize().height
                    }
                }, t.prototype.init = function (e, t, o) {
                    this.direction = e, this.speed = t
                }, t.prototype.setPause = function (e) {
                    this.pause = e
                }, t.prototype.doScoll = function (e) {
                    for (var t = 0; t < this.scrollBgList.length; t++) { this.scrollBgList[t].y -= this.speed; }
                    if (this.scrollBgList[0].y <= -this.bgHeight[this.scrollBgList[0].name]) {
                        var o = this.scrollBgList.shift();
                        o.y = this.scrollBgList[this.scrollBgList.length - 1].y + this.bgHeight[this.scrollBgList[this.scrollBgList.length - 1].name], this.scrollBgList.push(o)
                    }
                }, t.prototype.update = function (e) {
                    this.pause || this.doScoll(e)
                }, t.DIRECTION_X = 0, t.DIRECTION_Y = 1, t.BG_WIDTH = 1080, t.BG_HEIGHT = 1920, t = o = i([a], t)
            }(cc.Component));
        o.default = s, cc._RF.pop()
    }, {}],
    BackHome: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "39284G+tTNDWbtCrXF00tFC", "BackHome");
        var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("../Model/BusinessStorage")),
            c = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t._businessStorage = null, t
                }
                return n(t, e), t.prototype.onLoad = function () {
                    this._businessStorage = this.node.getComponent(s.default), this.node.on(cc.Node.EventType.TOUCH_END, this.backHome, this)
                }, t.prototype.backHome = function () {
                    this._businessStorage && (this._businessStorage.startGame = !1)
                }, t = i([a], t)
            }(cc.Component);
        o.default = c, cc._RF.pop()
    }, {
        "../Model/BusinessStorage": "BusinessStorage"
    }],
    Bezier: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "ad2b4u73N1OsLz5RGqWZNYZ", "Bezier"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = function () {
            function e(e, t, o) {
                this._maskIdleIndex = [], this._pointList = [], this._aliveTime = 0, this._listSize = 0, this._pointList = e, this._aliveTime = o, this._listSize = t, this._maskIdleIndex = []
            }
            return e.prototype.PointForBezier = function (e, t) {
                for (var o = new cc.Vec2, n = e.length, i = 0; i < n; i++) {
                    var r = this.formula(n - 1, i, t);
                    o.x += e[i].x * r, o.y += e[i].y * r
                }
                return o
            }, e.prototype.ComputeBezier = function (e, t, o) {
                var n, i;
                for (n = 1 / (t - 1), i = 0; i < t; i++) { o[i] = this.PointForBezier(e, i * n) }
            }, e.prototype.getPoints = function (e) {
                var t = [],
                    o = this._listSize;
                return e && (o = e), this.ComputeBezier(this._pointList, o, t), t
            }, e.prototype.getPoint = function (e) {
                if (e > this._aliveTime) { return null; }
                for (var t = new cc.Vec2, o = this._pointList.length, n = 0; n < o; n++) {
                    var i = this.formula(o - 1, n, e / this._aliveTime);
                    t.x += this._pointList[n].x * i, t.y += this._pointList[n].y * i
                }
                return t
            }, e.prototype.getPointIdx = function (e) {
                for (var t = 0; t < this._pointList.length; t++) {
                    var o = this._pointList[t];
                    if (e.sub(o).mag() <= 200) { return this._maskIdleIndex.indexOf(t) >= 0 ? -1 : (this._maskIdleIndex.push(t), t) }
                }
                return -1
            }, e.prototype.getCurrentPoint = function (e) {
                return this._pointList[e]
            }, e.prototype.getPointPlus = function (e, t) {
                if (e > this._aliveTime) { return null; }
                for (var o = new cc.Vec2, n = this._pointList.length, i = 0; i < n; i++) {
                    var r = this.formula(n - 1, i, e / this._aliveTime);
                    o.x += this._pointList[i].x * r, o.y += this._pointList[i].y * r
                }
                return o
            }, e.prototype.formula = function (e, t, o) {
                return this.c(e, t) * Math.pow(o, t) * Math.pow(1 - o, e - t)
            }, e.prototype.c = function (e, t) {
                return this.factorial(e) / (this.factorial(t) * this.factorial(e - t))
            }, e.prototype.factorial = function (e) {
                for (var t = 1, o = 1; o <= e; o++) { t *= o; }
                return t
            }, e
        }();
        o.default = n, cc._RF.pop()
    }, {}],
    BossNotify: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "91f2a0vaApCb50ewmg9Ba/2", "BossNotify");
        var n = this && this.__extends || function () {
            var e = function (t, o) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                    })(t, o)
            };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t.rotationRate = 1, t._ndScan = null, t
                }
                return n(t, e), t.prototype.start = function () {
                    this._ndScan = this.node.getChildByName("_scan"), this.node.active = !0
                }, t.prototype.stop = function () {
                    this._ndScan = null, this.node.active = !1
                }, t.prototype.update = function () {
                    if (this.node.active && this._ndScan && (this._ndScan.angle -= this.rotationRate, this._ndScan.angle <= -360 && (this._ndScan.angle = 0), this._ndScan.angle == -270)) {
                        var e = this.node.getChildByName("_notifyImgFadeout");
                        e.opacity = 255, e.setScale(1, 1);
                        var t = cc.fadeOut(.3);
                        t.easing = cc.easeBackInOut;
                        var o = cc.spawn(t, cc.scaleTo(.1, 1.2, 1.2));
                        e.runAction(o)
                    }
                }, i([s], t.prototype, "rotationRate", void 0), t = i([a], t)
            }(cc.Component);
        o.default = c, cc._RF.pop()
    }, {}],
    BossShowAction: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "c39ad5xBxtODZuulEJPEXxk", "BossShowAction");
        var n = this && this.__decorate || function (e, t, o, n) {
            var i, r = arguments.length,
                a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
            else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
            return r > 3 && a && Object.defineProperty(t, o, a), a
        };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var i = cc._decorator,
            r = i.ccclass,
            a = (i.property, function () {
                function e() { }
                var t;
                return t = e, e.runShowAction = function (e, o, n) {
                    t[e] && t[e](o, n)
                }, e.DoDie = function (e, t) {
                    e.runAction(cc.sequence(cc.fadeOut(2), cc.callFunc(function (e, t) {
                        t(e)
                    }, e, t)))
                }, e.DoDieFlyOut = function (e, t) {
                    var o = cc.moveTo(3, 0, 1920);
                    o.easing(cc.easeBackInOut()), e.runAction(cc.sequence(o, cc.callFunc(function (e, t) {
                        t(e)
                    }, e, t)))
                }, e.samllMoveToSacleBig = function (e, t) {
                    e.setPosition(cc.v2(0, -1920)), e.runAction(cc.sequence(cc.scaleTo(.1, .2), cc.moveTo(5, 0, 650), cc.scaleTo(.6, 1), cc.callFunc(function (e, t) {
                        t(e)
                    }, e, t)))
                }, e = t = n([r], e)
            }());
        o.default = a, cc._RF.pop()
    }, {}],
    BossWarning: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "c1a06SbDnxBkZrwcH5VCX6l", "BossWarning");
        var n = this && this.__extends || function () {
            var e = function (t, o) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                    })(t, o)
            };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = e("../../Utils/KAFishGameAssets"),
            a = cc._decorator,
            s = a.ccclass,
            c = (a.property, function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t.warning = null, t.bg = null, t.defImgleftPos = null, t.defImgrightPos = null, t
                }
                return n(t, e), t.prototype.init = function () {
                    this.warning = this.node.getChildByName("_warning"), this.bg = this.node.getChildByName("_bg");
                    var e = this.warning.getChildByName("_imgleft"),
                        t = this.warning.getChildByName("_imgright");
                    this.defImgleftPos ? e.setPosition(cc.v2(this.defImgleftPos.x, this.defImgleftPos.y)) : this.defImgleftPos = cc.v2(e.position.x, e.position.y), this.defImgrightPos ? t.setPosition(cc.v2(this.defImgrightPos.x, this.defImgrightPos.y)) : this.defImgrightPos = cc.v2(t.position.x, t.position.y), this.warning.getChildByName("_light").opacity = 0, this.bg.opacity = 0, this.node.active = !0
                }, t.prototype.playAnimation = function () {
                    this.bg.runAction(cc.repeat(cc.sequence(cc.fadeTo(1, 59), cc.fadeOut(1)), 6));
                    var e = this.warning.getChildByName("_imgleft"),
                        t = this.warning.getChildByName("_imgright"),
                        o = this.node.getChildByName("_showgirl").getComponent(sp.Skeleton);
                    o.skeletonData = r.default.getSpine("showgirl"), o.setAnimationCacheMode(sp.Skeleton.AnimationCacheMode.SHARED_CACHE), o.animation = "Idle", o.loop = !0, o.paused = !1;
                    var n = this,
                        i = cc.moveTo(.2, cc.v2(48, 30));
                    i.easing = cc.easeBackInOut, e.runAction(i);
                    var a = cc.moveTo(.2, cc.v2(45, -32));
                    a.easing = cc.easeBackInOut, t.runAction(cc.sequence(a, cc.callFunc(function (e) {
                        var t = n.warning.getChildByName("_light"),
                            o = cc.fadeIn(.3);
                        o.easing = cc.easeBackInOut, t.runAction(cc.sequence(o, cc.delayTime(.05), cc.fadeOut(.3)))
                    })))
                }, t.prototype.close = function () {
                    var e = this.node.getChildByName("_showgirl").getComponent(sp.Skeleton);
                    e.loop = !0, e.paused = !0, e.skeletonData = null, this.node.active = !1
                }, t = i([s], t)
            }(cc.Component));
        o.default = c, cc._RF.pop()
    }, {
        "../../Utils/KAFishGameAssets": "KAFishGameAssets"
    }],
    Boss: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "22ea81A1IdNDI4dAfpv7i42", "Boss");
        var n = this && this.__extends || function () {
            var e = function (t, o) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                    })(t, o)
            };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = e("./action/BossShowAction"),
            a = e("./Bullet"),
            s = e("../../Utils/KAFishGameAssets"),
            c = e("../../Components/Business/AudioManage"),
            l = cc._decorator,
            u = l.ccclass,
            p = (l.property, function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t.recycleCb = null, t.spineData = null, t.bossName = null, t.id = null, t.type = null, t.durationTime = 0, t.actionData = null, t.actionScript = null, t.config = null, t.collideBox = null, t.skeleton = null, t.die = !1, t.fishType = null, t.hitPoint = 0, t.onStageRect = !1, t.score = 0, t
                }
                var o;
                return n(t, e), o = t, t.prototype.init = function (e, t, o) {
                    var n = s.default.getConfig("boss"),
                        i = s.default.getConfig("fish");
                    this.id = null, this.bossName = e, this.config = n[e], this.spineData = s.default.getSpine(this.config.id), this.recycleCb = o, this.fishType = this.config.id, this.id = t.opt.id, this.hitPoint = t.opt.hp, this.score = 1, this.actionScript = [];
                    for (var r = 0; r < this.config.action.length; r++) { this.actionScript.push(this.config.action[r]); }
                    var a = this.node.getChildByName("_spine");
                    this.skeleton = a.getComponent(sp.Skeleton), this.skeleton.setAnimationCacheMode(sp.Skeleton.AnimationCacheMode.SHARED_CACHE), this.skeleton.skeletonData = this.spineData, this.skeleton.animation = "Idle", this.skeleton.loop = !0, cc.log("Boss FishType:", this.fishType, i[this.fishType]), this.collideBox = this.node.getComponent(cc.BoxCollider), this.collideBox.offset.x = i[this.fishType].collider.offset.x, this.collideBox.offset.y = i[this.fishType].collider.offset.y, this.collideBox.size.width = i[this.fishType].collider.size.w, this.collideBox.size.height = i[this.fishType].collider.size.h, this.collideBox.tag = this.id[0], this.collideBox.enabled = !1, this.actionData = this.actionScript.shift(), this.durationTime = this.actionData.duration, this.die = !1, this.node.setScale(1), this.node.opacity = 255, this.node.name = "boss", this.node.active = !0
                }, t.prototype.enableOnStageRect = function (e) {
                    this.onStageRect = e
                }, t.prototype.isOnStage = function () {
                    return this.onStageRect
                }, t.prototype.getName = function () {
                    return this.node.name
                }, t.prototype.getHp = function () {
                    return this.hitPoint
                }, t.prototype.reduceHp = function () {
                    this.hitPoint--
                }, t.prototype.getFishType = function () {
                    return this.fishType
                }, t.prototype.removeOneIds = function () {
                    if (this.id.length > 0) {
                        var e = this.id.shift();
                        return this.collideBox.tag = this.id[0], c.default.getInstance().playBossLostLife(this.bossName), c.default.getInstance().playBossCoinWin(), e
                    }
                }, t.prototype.getIds = function () {
                    return this.id
                }, t.prototype.getId = function () {
                    return this.id[0]
                }, t.prototype.runHurt = function () { }, t.prototype.runShowTime = function () {
                    r.default.runShowAction(this.config.showaction, this.node, this.showTimeOverCallBack)
                }, t.prototype.runToDie = function () {
                    this.die = !0, this.collideBox.enabled = !1, this.enableOnStageRect(!1), this.unschedule(this.cancelAttackShow), this.cancelAttackShow(), this.node.stopAllActions(), r.default.runShowAction("DoDie", this.node, this.dieOverCallBack), c.default.getInstance().playBossDeath(this.bossName), c.default.getInstance().playBossCoinWin()
                }, t.prototype.runGetOut = function () {
                    this.die = !0, this.collideBox.enabled = !1, this.enableOnStageRect(!1), this.unschedule(this.cancelAttackShow), this.cancelAttackShow(), this.node.stopAllActions(), r.default.runShowAction("DoDieFlyOut", this.node, this.dieOverCallBack), c.default.getInstance().playBossFlyOut(this.bossName)
                }, t.prototype.isDie = function () {
                    return this.die
                }, t.prototype.showTimeOverCallBack = function (e) {
                    var t = e.getComponent(o);
                    t && (cc.log("showTimeOverCallBack"), t.enableColldeState(!0), t.enableOnStageRect(!0), c.default.getInstance().playBossEnter(t.bossName))
                }, t.prototype.dieOverCallBack = function (e) {
                    e.setPosition(cc.v2(0, 0)), e.active = !1
                }, t.prototype.getCollideState = function () {
                    return this.collideBox.enabled
                }, t.prototype.enableColldeState = function (e) {
                    this.collideBox.enabled = e
                }, t.prototype.onCollisionEnter = function (e, t) {
                    if (this.collideBox.enabled) {
                        this.unschedule(this.cancelAttackShow);
                        var o = e.node.getComponent(a.default),
                            n = this.node.getChildByName("_spine");
                        o.lockId && this.id.indexOf(parseInt(o.lockId)) == -1 ? n.color.getR() != 255 && n.color.getG() != 255 && n.color.getB() != 255 && (n.color = cc.color(255, 255, 255)) : (n.color = cc.color(235, 46, 46), this.scheduleOnce(this.cancelAttackShow, .3))
                    }
                }, t.prototype.cancelAttackShow = function () {
                    this.node.getChildByName("_spine").color = cc.color(255, 255, 255)
                }, t.prototype.update = function (e) {
                    if (this.collideBox.enabled && !this.die && (this.durationTime -= e, this.durationTime <= 0)) {
                        if (this.actionScript.length > 0) {
                            var t = this.actionData.animation;
                            this.actionData = this.actionScript.shift(), this.durationTime = this.actionData.duration, this.actionData.animation !== t && (this.skeleton.animation = this.actionData.animation, this.skeleton.loop = !0)
                        } else { this.runGetOut() }
                    }
                }, t.prototype.getBossName = function () {
                    return this.bossName
                }, t.prototype.inRect = function (e) {
                    var t = this.node.getParent().convertToNodeSpaceAR(e),
                        o = cc.v2(this.node.position.x, 0).sub(cc.v2(t.x, 0)).mag(),
                        n = cc.v2(0, this.node.position.y).sub(cc.v2(0, t.y)).mag();
                    return o <= this.collideBox.size.width && n <= this.collideBox.size.height
                }, t.prototype.isEffectBox = function () {
                    return !1
                }, t = o = i([u], t)
            }(cc.Component));
        o.default = p, cc._RF.pop()
    }, {
        "../../Components/Business/AudioManage": "AudioManage",
        "../../Utils/KAFishGameAssets": "KAFishGameAssets",
        "./Bullet": "Bullet",
        "./action/BossShowAction": "BossShowAction"
    }],
    Bullet: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "ce1b8nzFldPvIrppzoTO2OO", "Bullet");
        var n = this && this.__extends || function () {
            var e = function (t, o) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                    })(t, o)
            };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = e("../../Utils/CCHelper"),
            a = e("./Enemy"),
            s = e("./Boss"),
            c = e("../../Utils/KAFishGameAssets"),
            l = cc._decorator,
            u = l.ccclass,
            p = (l.property, function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t._bulletType = 0, t._speed = 0, t._angle = 0, t._vx = 0, t._vy = 0, t._ndAnimation = null, t._lockId = null, t._recycleCb = null, t._colliderCb = null, t._isBomb = !1, t._tag = 0, t._isPending = !1, t._enableColliderEvent = !0, t._frameRate = 0, t._selfBullet = !1, t._hideInst = !1, t._isMe = !1, t
                }
                var o;
                return n(t, e), o = t, t.prototype.onLoad = function () { }, t.prototype.init = function (e, t, o, n, i, r, a, s, c, l, u) {
                    var p = this;
                    this._selfBullet = s, this._speed = n, this._bulletType = a, r ? (this._lockId = r, this.node.name = "lock_" + r, this._frameRate >= 40 ? this._speed = 6500 : this._frameRate < 40 && this._frameRate >= 35 ? this._speed = 6e3 : this._speed = 5e3) : (this._lockId = null, this.node.name = "bullet" + e), this._recycleCb = l, this._isPending = !1, this._colliderCb = u, this._isBomb = !1, this._enableColliderEvent = s, this._tag = e, this._isMe = c;
                    var h = this.node.getChildByName("img");
                    this._ndAnimation = h, this._ndAnimation.color = c ? cc.color(255, 255, 255) : cc.color(105, 105, 105);
                    for (var f = h.getComponent(cc.Animation), d = f.getClips(); d.length > 0;) { f.removeClip(d[0], !0), d = f.getClips(); }
                    var _ = i.animats;
                    ["run", "dead"].forEach(function (e, t, o) {
                        var n = p.getSpriteFrameList(_[e], e),
                            i = cc.AnimationClip.createWithSpriteFrames(n, _[e].speed);
                        e === "run" && (i.wrapMode = cc.WrapMode.Loop), f.addClip(i, e)
                    }), f.play("run");
                    var g = this._enableCollider(!0);
                    g.offset.x = i.collider.offset.x, g.offset.y = i.collider.offset.y, g.size.width = i.collider.size.w, g.size.height = i.collider.size.h, g.tag = e, t.y += 40, this.node.active = !0, this.node.position = t, this._angle = o, this._vx = this._getAngleX(this._angle, 1), this._vy = this._getAngleY(this._angle, 1), this.node.angle = 0, this.node.angle = -this._getFilpAngle(this._angle, ""), this._angle = this.node.angle, h.setScale(1)
                }, Object.defineProperty(t.prototype, "IsMe", {
                    get: function () {
                        return this._isMe
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "lockId", {
                    get: function () {
                        return this._lockId
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.setActiveByHide = function () {
                    this._hideInst = !0, this.node.opacity = 0
                }, t.prototype.setFrameRate = function (e) {
                    this._frameRate = 1 / e
                }, t.prototype.getId = function () {
                    return this._tag
                }, t.prototype.getSpriteFrameList = function (e, t) {
                    var o = e.pre;
                    t == "dead" && this._selfBullet && (o = e.selfpre);
                    for (var n = e.start, i = e.end, r = [], a = n; a < i + 1; a++) {
                        var s = o + "_" + a,
                            l = c.default.getSpriteFrame("cannonAtlas", s);
                        r.push(l)
                    }
                    return r
                }, t.prototype.onCollisionEnter = function (e, t) {
                    if ((!this._lockId || e.tag == this._lockId) && e.node.opacity != 0) {
                        (e.node.name == "boss" ? e.node.getComponent(s.default) : e.node.getComponent(a.default)).isDie() ? cc.log("bullet target is Die!!!!!") : (this._enableCollider(!1), this._enableColliderEvent && this._colliderCb && this._colliderCb({
                            bullet: t,
                            fish: e
                        }), this.doBomb())
                    }
                }, t.prototype._playBombAnimation = function () {
                    this._isBomb || (this._isBomb = !0, this.node.getChildByName("img").getComponent(cc.Animation).play("dead"))
                }, t.prototype.doBomb = function () {
                    var e = this;
                    this._isBomb || (this._playBombAnimation(), this.scheduleOnce(function () {
                        e.node.active = !1, e._hideInst = !1, e.node.opacity = 255, e._recycleCb && e._recycleCb(e.node)
                    }, .7))
                }, t.prototype.resume = function () {
                    this._enableCollider(!0), this._isPending = !1
                }, t.prototype._enableCollider = function (e) {
                    var t = this.node.getComponent(cc.BoxCollider);
                    return t && (t.enabled = e), t
                }, t.prototype.update = function (e) {
                    if (!this._isPending && !this._isBomb) {
                        var t, n = 0;
                        t = e * this._speed * this._vx, n += e * this._speed * this._vy, this.node.x += t, this.node.y += n;
                        var i = !1,
                            r = !1,
                            a = "";
                        if (this.node.x >= cc.winSize.width / 2 ? (this.node.x = cc.winSize.width / 2, this._vx = -this._vx, r = !0, a = "right", i = !0) : this.node.x <= -cc.winSize.width / 2 && (this.node.x = -cc.winSize.width / 2, this._vx = -this._vx, r = !0, a = "left", i = !0), r) {
                            var s = this._getFilpAngle(this._angle, a);
                            this.node.angle = -s, this._angle = this.node.angle
                        }
                        if (r = !1, this.node.y >= cc.winSize.height / 2 ? (this.node.y = cc.winSize.height / 2, this._vy = -this._vy, r = !0, a = "top", i = !0) : this.node.y <= -cc.winSize.height / 2 && (this.node.y = -cc.winSize.height / 2, this._vy = -this._vy, r = !0, a = "bottom", i = !0), r) {
                            s = this._getFilpAngle(this._angle, a);
                            this.node.angle = -s, this._angle = this.node.angle
                        }
                        i && this._lockId && (this._speed = o.BULLET_DEFAULT_SPEED, this._lockId = null, this.node.name = "bullet" + this._tag)
                    }
                }, t.prototype._getFilpAngle = function (e, t) {
                    var o = 0;
                    return t == "left" || t == "right" ? o = (360 - e) % 360 : t == "bottom" || t == "top" ? o = (180 - e) % 360 : (o = e, o += -90, o %= 360), o
                }, t.prototype._getAngleX = function (e, t) {
                    return e += 180, t * Math.cos(r.default.DegreesToRadians(e))
                }, t.prototype._getAngleY = function (e, t) {
                    return t * Math.sin(r.default.DegreesToRadians(e))
                }, t.prototype.getBulletType = function () {
                    return this._bulletType
                }, t.isUniqueBulletId = function (e) {
                    return !(o.bulletIdQueue.indexOf(e.bid) >= 0) && (o.bulletIdQueue.length >= 5 && o.bulletIdQueue.shift(), o.bulletIdQueue.push(e.bid), !0)
                }, t.BULLET_DEFAULT_SPEED = 2800, t.bulletIdQueue = [], t = o = i([u], t)
            }(cc.Component));
        o.default = p, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper",
        "../../Utils/KAFishGameAssets": "KAFishGameAssets",
        "./Boss": "Boss",
        "./Enemy": "Enemy"
    }],
    BusinessStorage: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "a00dd+/e75BfrFjtoCf+naf", "BusinessStorage");
        var n = this && this.__extends || function () {
            var e = function (t, o) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                    })(t, o)
            };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, function (e) {
                function t() {
                    return e !== null && e.apply(this, arguments) || this
                }
                var o;
                return n(t, e), o = t, Object.defineProperty(t.prototype, "nowBossName", {
                    get: function () {
                        return o._bossName
                    },
                    set: function (e) {
                        o._bossName = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.popBossSoldier = function () {
                    if (o._bossSoldierQueue.length > 0) {
                        var e = o._bossSoldierQueue;
                        return o._bossSoldierQueue = [], e
                    }
                    return null
                }, Object.defineProperty(t.prototype, "bossSoldierQueue", {
                    get: function () {
                        return o._bossSoldierQueue
                    },
                    set: function (e) {
                        o._bossSoldierQueue.push(e)
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.isPushBossSoldier = function (e) {
                    return o._bossSoldierQueue.length != 0 && (o._bossSoldierQueue[0].delaytime -= e, o._bossSoldierQueue[0].delaytime <= 0)
                }, t.prototype.shiftBossSoldierQueue = function () {
                    return o._bossSoldierQueue.length == 0 ? null : o._bossSoldierQueue.shift()
                }, Object.defineProperty(t.prototype, "syncPosIntervalId", {
                    get: function () {
                        return o._syncPosIntervalId
                    },
                    set: function (e) {
                        o._syncPosIntervalId = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.getSyncMovePos = function (e) {
                    return o._syncMovePosQueue[e]
                }, t.prototype.clearSyncMovePos = function () {
                    o._syncMovePosQueue = {}
                }, Object.defineProperty(t.prototype, "syncMovePosQueue", {
                    get: function () {
                        return o._syncMovePosQueue
                    },
                    set: function (e) {
                        o._syncMovePosQueue[e.playerId] = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.popBosses = function () {
                    if (o._bossQueue.length > 0) {
                        var e = o._bossQueue;
                        return o._bossQueue = [], e
                    }
                    return []
                }, Object.defineProperty(t.prototype, "bossQueue", {
                    get: function () {
                        return o._bossQueue
                    },
                    set: function (e) {
                        o._bossQueue.push(e)
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "pingIntervalId", {
                    set: function (e) {
                        o._pingIntervalId = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "maxBetSetLen", {
                    get: function () {
                        return o._maxBetSetLen
                    },
                    set: function (e) {
                        o._maxBetSetLen = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "recallCallBack", {
                    get: function () {
                        return o._recallCallBack
                    },
                    set: function (e) {
                        o._recallCallBack = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "recallQueue", {
                    get: function () {
                        return o._reacllQueue
                    },
                    set: function (e) {
                        o._reacllQueue = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "showRecall", {
                    get: function () {
                        return o._showRecall
                    },
                    set: function (e) {
                        o._showRecall = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "lockFishType", {
                    get: function () {
                        return o._lockFishType
                    },
                    set: function (e) {
                        o._lockFishType = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "battleBoss", {
                    get: function () {
                        return o._battleboss
                    },
                    set: function (e) {
                        o._battleboss = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "Robot", {
                    get: function () {
                        return o._isRobot
                    },
                    set: function (e) {
                        o._isRobot = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "startGame", {
                    get: function () {
                        return o._startGame
                    },
                    set: function (e) {
                        o._startGame = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "shareMessage", {
                    get: function () {
                        return o._shareMessage
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "taskReward", {
                    get: function () {
                        return o._taskReward
                    },
                    set: function (e) {
                        o._taskReward = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "gameFinish", {
                    get: function () {
                        return o._gameFinish
                    },
                    set: function (e) {
                        o._gameFinish = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "tableInfo", {
                    get: function () {
                        return o._tableInfo
                    },
                    set: function (e) {
                        o._tableInfo = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "playersInfo", {
                    get: function () {
                        return o._playersInfo
                    },
                    set: function (e) {
                        o._playersInfo = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "area", {
                    get: function () {
                        return o._area
                    },
                    set: function (e) {
                        o._area = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "areaPlayers", {
                    get: function () {
                        return o._areaPlayers
                    },
                    set: function (e) {
                        o._areaPlayers = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "joyStickState", {
                    get: function () {
                        return o._joyStickState
                    },
                    set: function (e) {
                        o._joyStickState = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "autoFire", {
                    get: function () {
                        return o._autoFire
                    },
                    set: function (e) {
                        o._autoFire = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "lockTarget", {
                    get: function () {
                        return o._lockTarget
                    },
                    set: function (e) {
                        o._lockTarget = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "lockTargetId", {
                    get: function () {
                        return o._lockTargetId
                    },
                    set: function (e) {
                        o._lockTargetId = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.pushBullet = function (e) {
                    o._bulletQueue.push(e)
                }, t.prototype.popBullet = function () {
                    return o._bulletQueue.length > 0 ? o._bulletQueue.shift() : null
                }, t.prototype.bulletQueueLen = function () {
                    return o._bulletQueue.length
                }, t.prototype.pushCollider = function (e) {
                    o._colliderQueue.push(e)
                }, t.prototype.popAllCollider = function () {
                    if (o._colliderQueue.length > 0) {
                        var e = o._colliderQueue;
                        return o._colliderQueue = [], e
                    }
                    return []
                }, t.prototype.colliderQueueLen = function () {
                    return o._colliderQueue.length
                }, t.prototype.pushColliderResult = function (e) {
                    o._colliderResultQueue = o._colliderResultQueue.concat(e)
                }, t.prototype.popAllColliderResult = function () {
                    if (o._colliderResultQueue.length > 0) {
                        var e = o._colliderResultQueue;
                        return o._colliderResultQueue = [], e
                    }
                    return []
                }, t.prototype.colliderResultQueueLen = function () {
                    return o._colliderResultQueue.length
                }, t.prototype.pushFishes = function (e) {
                    o._fishesQueue = o._fishesQueue.concat(e)
                }, t.prototype.popFishes = function () {
                    if (o._fishesQueue.length > 0) {
                        var e = o._fishesQueue;
                        return o._fishesQueue = [], e
                    }
                    return []
                }, t.prototype.fishesQueueLen = function () {
                    return o._fishesQueue.length
                }, t.prototype.pushBulletsRefund = function (e) {
                    o._bulletsRefund = o._bulletsRefund.concat(e)
                }, t.prototype.popAllBulletsRefund = function () {
                    if (o._bulletsRefund.length > 0) {
                        var e = o._bulletsRefund;
                        return o._bulletsRefund = [], e
                    }
                    return []
                }, t.prototype.BulletsRefundQueueLen = function () {
                    return o._bulletsRefund.length
                }, t.prototype.clearAllData = function () {
                    o._bulletsRefund = [], o._fishesQueue = [], o._colliderResultQueue = [], o._colliderQueue = [], o._bulletQueue = [], o._bulletsRefund = [], o._startGame = !1, o._shareMessage = null, o._gameFinish = !1, o._area = null, o._areaPlayers = null, o._tableInfo = null, o._playersInfo = null, o._joyStickState = {
                        direction: 0,
                        angle: 0
                    }, o._autoFire = !1, o._lockTarget = !1, o._lockTargetId = null, o._lockFishType = "", o._bulletQueue = [], o._colliderQueue = [], o._colliderResultQueue = [], o._fishesQueue = [], o._bulletsRefund = [], o._chatMsgQueue = [], o._gameRecallQueue = [], o._changeScene = !1, o._battleboss = !1, o._showRecall = !1, o._reacllQueue = [], o._recallCallBack = null, o._maxBetSetLen = 15
                }, Object.defineProperty(t.prototype, "changeScene", {
                    get: function () {
                        return o._changeScene
                    },
                    set: function (e) {
                        o._changeScene = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "sceneId", {
                    get: function () {
                        return o._sceneId
                    },
                    set: function (e) {
                        o._sceneId = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.pushChatMsgQueue = function (e) {
                    o._chatMsgQueue.push(e)
                }, t.prototype.popAllChatMsgQueue = function () {
                    if (o._chatMsgQueue.length > 0) {
                        var e = o._chatMsgQueue;
                        return o._chatMsgQueue = [], e
                    }
                    return []
                }, t.prototype.ChatMsgQueueLen = function () {
                    return o._chatMsgQueue.length
                }, t.prototype.pushToGameRecallQueue = function (e) {
                    o._gameRecallQueue.push(e)
                }, t.prototype.gameRecallQueue = function () {
                    return o._gameRecallQueue
                }, t._startGame = !1, t._shareMessage = null, t._taskReward = null, t._gameFinish = !1, t._area = null, t._areaPlayers = null, t._tableInfo = null, t._playersInfo = null, t._joyStickState = {
                    direction: 0,
                    angle: 0
                }, t._autoFire = !1, t._lockTarget = !1, t._lockTargetId = null, t._lockFishType = "", t._bulletQueue = [], t._colliderQueue = [], t._colliderResultQueue = [], t._fishesQueue = [], t._bulletsRefund = [], t._chatMsgQueue = [], t._gameRecallQueue = [], t._changeScene = !1, t._sceneId = 0, t._isRobot = !1, t._battleboss = !1, t._showRecall = !1, t._reacllQueue = [], t._recallCallBack = null, t._maxBetSetLen = 15, t._pingIntervalId = null, t._syncPosIntervalId = null, t._bossName = null, t._playview = null, t._bossQueue = [], t._bossSoldierQueue = [], t._syncMovePosQueue = {}, t = o = i([a], t)
            }(cc.Component));
        o.default = s, cc._RF.pop()
    }, {}],
    CCHelper: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "bb5c1y43DhOE6Y0Jz1RYrWf", "CCHelper"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("base64-js"),
            i = e("../Config/Config"),
            r = function () {
                function e() { }
                return e.getInstNum = function (e) {
                    var t = e.lastIndexOf("_");
                    if (t < 0) { return t; }
                    var o = e.substr(t + 1, e.length - t);
                    return parseInt(o)
                }, e.preloadScene = function (e, t, o, n) {
                    var i = cc.director,
                        r = i._getSceneUuid(t);
                    if (r) {
                        i.emit(cc.Director.EVENT_BEFORE_SCENE_LOADING, t), cc.loader.load({
                            uuid: r.uuid,
                            type: "uuid"
                        }, n == null ? null : function (t, o) {
                            n && n.call(e, t, o)
                        }, function (e, n) {
                            e && cc.errorID(1215, t, e.message), o && o(e, n)
                        });
                    }
                    else {
                        var a = 'Can not preload the scene "' + t + '" because it is not in the build settings.';
                        o && o(new Error(a)), cc.error("preloadScene: " + a)
                    }
                }, e.dispatchEvent = function (e, t, o, n) {
                    var i = new cc.Event.EventCustom(t, !0),
                        r = {
                            request: o,
                            data: n
                        };
                    i.setUserData(r), e.dispatchEvent(i)
                }, e.isRealNum = function (e) {
                    return typeof e === "number" && !isNaN(e)
                }, e.stringToByte = function (e) {
                    var t, o, n = new Array;
                    t = e.length;
                    for (var i = 0; i < t; i++) { (o = e.charCodeAt(i)) >= 65536 && o <= 1114111 ? (n.push(o >> 18 & 7 | 240), n.push(o >> 12 & 63 | 128), n.push(o >> 6 & 63 | 128), n.push(63 & o | 128)) : o >= 2048 && o <= 65535 ? (n.push(o >> 12 & 15 | 224), n.push(o >> 6 & 63 | 128), n.push(63 & o | 128)) : o >= 128 && o <= 2047 ? (n.push(o >> 6 & 31 | 192), n.push(63 & o | 128)) : n.push(255 & o); }
                    return n
                }, e.byteToString = function (e) {
                    if (typeof e === "string") { return e; }
                    for (var t = "", o = e, n = 0; n < o.length; n++) {
                        var i = o[n].toString(2),
                            r = i.match(/^1+?(?=0)/);
                        if (r && i.length == 8) {
                            for (var a = r[0].length, s = o[n].toString(2).slice(7 - a), c = 1; c < a; c++) { s += o[c + n].toString(2).slice(2); }
                            t += String.fromCharCode(parseInt(s, 2)), n += a - 1
                        } else { t += String.fromCharCode(o[n]) }
                    }
                    return t
                }, e.base64Encode = function (t) {
                    var o = JSON.stringify(t);
                    return n.fromByteArray(e.stringToByte(o))
                }, e.base64Decode = function (t) {
                    var o = n.toByteArray(t),
                        i = e.byteToString(o);
                    try {
                        return JSON.parse(i)
                    } catch (e) {
                        return cc.log("_decode ", e), {}
                    }
                }, e.splitNodeName = function (e) {
                    if (e == "") {
                        return {
                            name: ""
                        };
                    }
                    var t = e.split("$");
                    if (t.length > 2) { throw console.error("Invalid Node Name ", e), "Invalid Node Name"; }
                    return t.length == 2 ? {
                        name: t[0],
                        tag: t[1]
                    } : {
                        name: t[0]
                    }
                }, e.shuffle = function (e) {
                    return e.sort(function () {
                        return .5 - Math.random()
                    }), e
                }, e.loadResource = function (e, t) {
                    var o = e;
                    if (!t) {
                        return new Promise(function (e, t) {
                            cc.loader.loadRes(o, function (n, i) {
                                n ? (cc.log("load config err " + o + " = " + n), t("load failed " + o + " " + n)) : e(i)
                            })
                        });
                    }
                    cc.loader.loadRes(o, function (e, n) {
                        e ? cc.log("load config err " + o + " = " + e) : t && t(n)
                    })
                }, e.loadResAsync = function (e, t, o) {
                    if (!o) {
                        return new Promise(function (o, n) {
                            cc.loader.loadRes(e, t, function (t, i) {
                                t ? (cc.log("loadResAsync err " + e + " = " + t), n("load failed " + e + " " + t)) : o(i)
                            })
                        });
                    }
                    cc.loader.loadRes(e, t, function (t, n) {
                        t ? cc.log("loadResAsync err " + e + " = " + t) : o && o(n)
                    })
                }, e.DegreesToRadians = function (e) {
                    return e * (Math.PI / 180)
                }, e.RadiansToDegrees = function (e) {
                    return e * (180 / Math.PI)
                }, e.getRandomNum = function (e, t) {
                    var o = t - e,
                        n = Math.random();
                    return e + Math.round(n * o)
                }, e.urlParse = function () {
                    var t, o;
                    if (window.location == null) { return null; }
                    if (Object.keys(e.realMoneyState).length > 0) { return e.realMoneyState; }
                    var n = window.location.href,
                        i = n.indexOf("?"),
                        r = (n = window.btoaQuery ? window.btoaQuery : n.substr(i + 1)).split("&");
                    r.length > 0 && (e.realMoneyState = {});
                    for (var a = 0; a < r.length; a++) { (i = r[a].indexOf("=")) > 0 && (t = r[a].substring(0, i), o = r[a].substr(i + 1), e.realMoneyState[t] = o); }
                    return e.isFreePlay() && (e.realMoneyState.p = "demo", e.realMoneyState.ak = "accessKey"), e.realMoneyState
                }, e.getRawUrl = function () {
                    if (window.location == null) { return ""; }
                    var e = window.location.href,
                        t = e.indexOf("?");
                    return e.substr(0, t)
                }, e.paddingZeroLeft = function (t, o) {
                    return t.length >= o ? t : e.paddingZeroLeft("0" + t, o)
                }, e.createLabelWithTTF = function (e, t, o, n, i, r) {
                    var a = new cc.Node;
                    a.setContentSize(n);
                    var s = a.addComponent(cc.Label);
                    return s.fontSize = o, s.string = e, s.font = t, s.horizontalAlign = i, s.verticalAlign = r, a
                }, e.getRealCurrency = function (t) {
                    return e.currencyTables[t] ? e.currencyTables[t] : t
                }, e.getRealSpriteCurrency = function (e) {
                    return e == "S/" ? "S:" : e == "B/." ? "B:." : e
                }, e.maskNickName = function (e) {
                    return e.substr(0, 2) + "***" + e.substr(6, e.length - 1)
                }, e.isQueryExpried = function () {
                    var e = new Date,
                        t = this.urlParse(),
                        o = Math.round(e.getTime() / 1e3);
                    if (t.p) {
                        var n = t.p.toLowerCase();
                        if (i.default.sameUrlQueryRejectPartnerList.indexOf(n) >= 0 && t.ts && o - t.ts >= i.default.consts.REJECT_QUERY_EXPRIED_SEC_TIME) { return !0 }
                    }
                    return !!(t.ts && o - t.ts >= i.default.consts.QUERY_EXPRIED_SEC_TIME)
                }, e.isShowFullScreenNotice = function (t) {
                    if (window.osdevice.isSafari && !window.osdevice.isChrome) { return !1; }
                    if (!window.osdevice.isMobile) { return !1; }
                    if (window.osdevice.iOS || window.osdevice.isiPhone || window.osdevice.isiPad) { return !1; }
                    var o = e.urlParse();
                    if (t == i.default.consts.ANDROID_FULLSCREEN_LOBBY) {
                        if (!o.rlv || void 0 == o.rlv) { return !0 }
                    } else if (t == i.default.consts.ANDROID_FULLSCREEN_PLAY && o.rlv) { return !0; }
                    return !1
                }, e.isCanBackToLobby = function () {
                    var t = e.urlParse();
                    return !t.rlv || void 0 == t.rlv
                }, e.isAutoSearchTable = function () {
                    var t = e.urlParse();
                    return !(!t.rlv && t.rlv != -1)
                }, e.getUrlRoomLevel = function () {
                    var t = e.urlParse();
                    return t.rlv ? e.IsSpecialRoomMode() ? 0 : t.rlv : 0
                }, e.getUrlParam = function (t) {
                    return Object.keys(e.realMoneyState).length > 0 ? e.realMoneyState.hasOwnProperty(t) ? e.realMoneyState[t] : null : (e.urlParse(), e.realMoneyState.hasOwnProperty(t) ? e.realMoneyState[t] : null)
                }, e.IsSpecialRoomMode = function () {
                    var t = e.getUrlParam("rlv");
                    return t == "-1" || t == -1
                }, e.isFreePlay = function () {
                    var t = e.urlParse();
                    return !(!t.m || t.m != 1 && t.m != "1")
                }, e.setRecommendData = function (t) {
                    e.realMoneyState.openRecommendedGamesInNewWindow = t.openRecommendedGamesInNewWindow, e.realMoneyState.recommendedGames = t.recommendedGames
                }, e.getReCommendGames = function () {
                    var t = {};
                    if (e.realMoneyState.recommendedGames.length > 0) {
                        for (var o = 0; o < e.realMoneyState.recommendedGames.length; o++) {
                            var n = e.realMoneyState.recommendedGames[o];
                            if (e.isZhHans() || e.isZhHant()) {
                                var i = e.urlParse();
                                n.iu = n.iu.replace("lang=en", "lang=" + i.loc)
                            }
                            t[n.iu] = n, t[n.iu].idx = o
                        }
                    }
                    return t
                }, e.isShowReCommendGames = function () {
                    return !(!e.realMoneyState.recommendedGames || e.realMoneyState.recommendedGames.length == 0)
                }, e.isReCommendOpenNewWindow = function () {
                    return e.realMoneyState.openRecommendedGamesInNewWindow
                }, e.getReCommendUrlString = function (t) {
                    var o = [];
                    o.push("g"), o.push("loginType"), o.push("uid"), o.push("appId"), o.push("gameId"), o.push("isSpecialRoomMode"), o.push("recommendedGames"), o.push("openRecommendedGamesInNewWindow");
                    for (var n = e.urlParse(), i = Object.keys(n), r = 0; r < o.length; r++) {
                        for (var a = -1, s = 0; s < i.length; s++) {
                            if (i[s] == o[r]) {
                                a = s;
                                break
                            }
                        } a > -1 && delete i[a]
                    }
                    var c = "";
                    for (r = 0; r < i.length; r++) {
                        if (i[r]) {
                            if (i[r] == "t" || i[r] == "rcmd") { continue; }
                            c += "&" + i[r] + "=" + n[i[r]]
                        }
                    } return t.replace("&rcmd=1", "") + c
                }, e.getMyCannonCostList = function (e, t) {
                    if (!e || t < 0 || t > i.default.consts.MAX_ROOM) { return []; }
                    var o = Math.ceil(e.length / i.default.consts.MAX_ROOM),
                        n = o * t,
                        r = n + o;
                    return e;
                }, e.getLang = function () {
                    var t = e.urlParse();
                    return t.loc ? t.loc.toLowerCase() : (navigator.languages && navigator.languages[0] || navigator.language || navigator.userLanguage).toLowerCase()
                }, e.checkAndSetFrameScale = function (e) {
                    var t = cc.winSize.height / i.default.consts.FRAME_HEIGHT;
                    t < 1 && e && e.setScale(t)
                }, e.isZhHans = function () {
                    var t = e.getLang();
                    return t === "zh-hans" || t == "zh_hans" || t == "zh-cn" || t == "zh" || t == "zh_cn" || t == "zh-sg" || t == "zh_sg"
                }, e.isZhHant = function () {
                    var t = e.getLang();
                    return t === "zh-hant" || t == "zh_hant" || t == "zh-tw" || t == "zh_tw" || t == "zh-hk" || t == "zh_hk" || t == "zh-mo" || t == "zh_mo"
                }, e.realMoneyState = {}, e.currencyTables = {
                    MDASH: "mDASH",
                    MBTC: "mBTC",
                    METC: "mETC",
                    MLTC: "mLTC",
                    MXMR: "mXMR",
                    MEOS: "mEOS",
                    USDT: "USDT",
                    USDC: "USDC",
                    mETH: "mETC",
                    EOS: "mS",
                    mB: "mBTC",
                    BTC: "mBTC",
                    ETC: "mTC",
                    LTC: "mLTC",
                    XMR: "mMR",
                    DAS: "mDASH",
                    USC: "USDC",
                    UST: "USDT",
                    TRX: "TRX",
                    mDASH: "mDASH",
                    TRY: "\u20ba",
                    TL: "\u20ba",
                    "\u0440\u0443\u0431": "\u20bd",
                    AFN: "AFN",
                    DZD: "DZD",
                    IRR: "IRR",
                    OMR: "OMR",
                    QAR: "QAR",
                    SAR: "SAR",
                    YER: "YER",
                    MVR: "MVR",
                    PAB: "B/."
                }, e
            }();
        o.default = r, cc._RF.pop()
    }, {
        "../Config/Config": "Config",
        "base64-js": 3
    }],
    CancelTransparentClick: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "3becdPlNmFGyqPtC5evYjrv", "CancelTransparentClick");
        var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("../../Utils/CCHelper")),
            c = function (e) {
                function t() {
                    return e !== null && e.apply(this, arguments) || this
                }
                return n(t, e), t.prototype.onLoad = function () {
                    var e = this;
                    this.node.on(cc.Node.EventType.TOUCH_END, function (t) {
                        e.node.active = !1
                    }), s.default.isCanBackToLobby() && (this.node.active = !1)
                }, t = i([a], t)
            }(cc.Component);
        o.default = c, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper"
    }],
    ClickSprite: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "db33c9+lJtGkKzvwQl841Kc", "ClickSprite");
        var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = e("../../Utils/CCHelper"),
            l = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t.spfAvatar = [], t._spAvatar = null, t._currIndex = 0, t
                }
                var o;
                return n(t, e), o = t, t.prototype.onLoad = function () {
                    this._addSpriteComponent(), this._spAvatar = this.node.getComponent(cc.Sprite), this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this)
                }, t.prototype.reset = function (e) {
                    this._currIndex = e, this.spfAvatar.length > e && this._spAvatar && (this._spAvatar.spriteFrame = new cc.SpriteFrame(this.spfAvatar[this._currIndex]))
                }, t.prototype._addSpriteComponent = function () {
                    var e = this.node.getComponent(cc.Sprite);
                    e || (e = this.node.addComponent(cc.Sprite))
                }, t.prototype._onTouchEnd = function (e) {
                    e.stopPropagation(), cc.log("ClickSprite click ", this._currIndex, " length ", this.spfAvatar.length), ++this._currIndex, this.spfAvatar.length > this._currIndex && this._spAvatar && (cc.log("clickSprite set image ", this.spfAvatar[this._currIndex]), this._spAvatar.spriteFrame = new cc.SpriteFrame(this.spfAvatar[this._currIndex])), c.default.dispatchEvent(this.node, o.EVENT, cc.Node.EventType.TOUCH_END, {
                        sender: this,
                        hitCount: this._currIndex,
                        event: e
                    })
                }, t.EVENT = "ClickSprite", i([s({
                    type: [cc.Texture2D]
                })], t.prototype, "spfAvatar", void 0), t = o = i([a], t)
            }(cc.Component);
        o.default = l, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper"
    }],
    Config: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "b8c19gLqjZFkIJRpbpMAF2Q", "Config");
        var n = this && this.__decorate || function (e, t, o, n) {
            var i, r = arguments.length,
                a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
            else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
            return r > 3 && a && Object.defineProperty(t, o, a), a
        };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var i = cc._decorator,
            r = i.ccclass,
            a = (i.property, e("events")),
            s = function () {
                function e() { }
                return e.getDefaultWSConnectData = function () {
                    return {
                        host: "",
                        port: 0
                    }
                }, e.ASK_LOGOUT_GAME = "ask.logout", e.ERR_TXT_500 = "error.other", e.ERR_TXT_1000 = "error.network", e.ERR_TXT_216 = "error.balance", e.ERR_TXT_KICK = "error.kick", e.ERR_CODE_BALANCE = 216, e.ERR_CODE_NETWORK = 1e3, e.ERR_CODE_SYSTEM = 500, e.ERR_CODE_KICK_LOGOUT = 2e3, e.ERR_CODE_WEBSOCKET_EXCEPTION = 2001, e.ERR_CODE_WEBSOCKET = 2002, e.ERR_CODE_OTHERS = 2999, e.mock = !1, e.mockNetEvent = new a, e.gameId = "10007", e.pomeloRoute = {
                    getConnector: "gate.gateHandler.getConnector",
                    getWebConnector: "gate.gateHandler.getWebConnector",
                    twLogin: "connector.accountHandler.twLogin",
                    searchTable: "playerControl.tableHandler.searchTableAndJoin",
                    createTable: "playerControl.tableHandler.createTable",
                    leaveTable: "playerControl.tableHandler.leaveTable",
                    sitDown: "playerControl.areaHandler.sitDown",
                    quitGame: "playerControl.areaHandler.quitGame",
                    fetchCurrentFishes: "areaFishControl.fishHandler.fetchCurrentFishes",
                    fetchFishInfo: "areaFishControl.fishHandler.fetchFishInfo",
                    onFire: "fishHunter.areaHandler.onFire",
                    onCollider: "playerControl.areaHandler.onCollider",
                    onUpdateCannon: "fishHunter.areaHandler.onUpdateCannon",
                    onLockTarget: "fishHunter.areaHandler.onLockTarget",
                    onPingBalance: "connector.accountHandler.onPingBalance",
                    gameRecall: "connector.accountHandler.gameRecall",
                    gameRecallUrl: "connector.accountHandler.gameRecallUrl",
                    syncMovePos: "connector.syncPlayMsgHandler.SyncPlayerMovePosition"
                }, e.pomeloPushRoute = {
                    joinTable: "table.join",
                    quitTable: "table.quit",
                    sitDown: "game.sitDown",
                    standUp: "game.standUp",
                    gameStart: "game.start",
                    gameEnd: "game.end",
                    gameQuit: "game.quit",
                    onFire: "game.fire",
                    onBulletBomb: "game.bulletBomb",
                    onColliderResult: "game.colliderResult",
                    onSpawnFishes: "game.onSpawnFishes",
                    onSpawnGroup: "game.onSpawnGroup",
                    onChangeScene: "game.changeScene",
                    onUpdateCannon: "game.updateCannon",
                    onLockTarget: "game.lockTarget",
                    onUpdateBalance: "game.updateBalance",
                    onUpdateWallet: "game.updateWallet",
                    onSyncMovePos: "game.syncMovePos",
                    onSpawnBoss: "game.spawnBoss",
                    onKick: "onKick"
                }, e.consts = {
                    SHOOT_DELAY: 100,
                    SPACE_SHOOT_DELAY: 100,
                    PING_DELAY: 5,
                    QUERY_EXPRIED_SEC_TIME: 1800,
                    REJECT_QUERY_EXPRIED_SEC_TIME: 30,
                    NOVICE_DELAY_TIME: 300,
                    BG_SCOLL_SPEED: 10,
                    SOLO: "solo",
                    GROUP: "group",
                    BOMB: "bomb",
                    FLOCK: "flock",
                    SPEEDUP: "speedup",
                    FREEZE: "freeze",
                    ANDROID_FULLSCREEN_LOBBY: "lobby",
                    ANDROID_FULLSCREEN_PLAY: "play",
                    FRAME_WIDTH: 1080,
                    FRAME_HEIGHT: 1920,
                    MAX_ROOM: 3,
                    AREA_STAGE_NORMAL: "normal",
                    AREA_STAGE_WAIT: "wait",
                    AREA_STAGE_GROUP: "group",
                    FISH_LIGHTING_BOMB: 1,
                    FISH_LUCKY_AURA: 2
                }, e.sameUrlQueryRejectPartnerList = ["gt", "demo"], e.determineProductionRMPServerUrl = function (e) {
                    var t = new URL(window.location.href),
                        o = window.location.host,
                        n = {
                            host: "",
                            port: null
                        };
                    n.host = o == "sc.kga8.com" ? "pml.kga8.com" : o == "sc.kaga88.com" ? "pml.kaga88.com" : o == "sc.kaifa88.com" ? "pml.kaifa88.com" : o == "scsea.kga8.com" ? "pmlsea.kga8.com" : o == "scsea.kaga88.com" ? "pmlsea.kaga88.com" : o == "scsea.kaifa88.com" ? "pmlsea.kaifa88.com" : o == "sceu.kaga88.com" ? "pmleu.kaga88.com" : o == "scna.kaga88.com" ? "pmlna.kaga88.com" : o == "scaf.kaga88.com" ? "pmlaf.kaga88.com" : o == "scstage.kga8.com" ? "pmlstage.kga8.com" : o == "scstage.kaga88.com" ? "pmlstage.kaga88.com" : o == "scstage.kaifa88.com" ? "pmlstage.kaifa88.com" : o == "sctest.kaga88.com" ? "rmptest.kaga88.com" : o === "localhost:7456" ? "localhost:3080" : o === "10.10.2.165:7456" ? "rmptest.kaga88.com" : o;
                    return n.gamePath = "/kaga/fish/SpaceCat", n.host = (t.protocol == "http:" ? "ws" : "wss") + "://" + n.host, cc.log("host=", n.host, "gamePath", n.gamePath), n
                }, e = n([r], e)
            }();
        o.default = s, cc._RF.pop()
    }, {
        events: 1
    }],
    CurrencyLabel: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "9c918yOK+FJ7Y4z08HSjzaH", "CurrencyLabel");
        var n = this && this.__extends || function () {
            var e = function (t, o) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                    })(t, o)
            };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = e("../../Utils/CCHelper"),
            a = e("../../Utils/KAFishGameAssets"),
            s = e("../../Utils/RealMoneyPlatform"),
            c = cc._decorator,
            l = c.ccclass,
            u = (c.property, function (e) {
                function t() {
                    return e !== null && e.apply(this, arguments) || this
                }
                return n(t, e), t.prototype.init = function (e, t, o) {
                    var n = this.node.getChildByName("_minbet"),
                        i = this.node.getChildByName("_maxbet"),
                        s = this.node.getChildByName("_mincurrency"),
                        c = this.node.getChildByName("_maxcurrency"),
                        l = n.getComponent(cc.Label),
                        u = i.getComponent(cc.Label),
                        p = s.getComponent(cc.Sprite),
                        h = c.getComponent(cc.Sprite);
                    l.string = t, l._updateRenderData(!0), u.string = o, u._updateRenderData(!0), p.spriteFrame = a.default.getSpriteFrame("currencysymbol", "reelwinmeter_" + r.default.getRealSpriteCurrency(e)), h.spriteFrame = a.default.getSpriteFrame("currencysymbol", "reelwinmeter_" + r.default.getRealSpriteCurrency(e))
                }, t.prototype.setSeparate = function (e) {
                    var t = this.node.getChildByName("_separate").getComponent(cc.Label);
                    t.string = " " + e + " ", t._updateRenderData(!0)
                }, t.prototype.show = function (e, t) {
                    var o = this.node.getChildByName("_minbet"),
                        n = this.node.getChildByName("_maxbet"),
                        i = this.node.getChildByName("_mincurrency"),
                        r = this.node.getChildByName("_maxcurrency"),
                        a = this.node.getChildByName("_separate"),
                        c = i.scale * i.width;
                    cc.log("currencySymbolInBack", s.default.walletInfo.currencySymbolInBack), s.default.walletInfo.currencySymbolInBack ? (a.position = cc.v2(t.x, t.y + 8), i.position = cc.v2(a.position.x - a.width / 2 - c / 2 + t.x - 10, t.y + 5), o.position = cc.v2(i.position.x - o.width / 2 - c / 2 + t.x, t.y + 8), n.position = cc.v2(a.position.x + a.width / 2 + n.width / 2 + t.x, t.y + 8), r.position = cc.v2(n.position.x + n.width / 2 + c / 2 + t.x + 15, t.y + 5)) : (a.position = cc.v2(t.x, t.y + 8), o.position = cc.v2(a.position.x - a.width / 2 - o.width / 2 + t.x, t.y + 8), i.position = cc.v2(o.position.x - o.width / 2 - c / 2 + t.x, t.y + 5), r.position = cc.v2(a.position.x + a.width / 2 + c / 2 + t.x + 0, t.y + 5), n.position = cc.v2(r.position.x + c / 2 + n.width / 2 + t.x + 10, t.y + 8))
                }, t = i([l], t)
            }(cc.Component));
        o.default = u, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper",
        "../../Utils/KAFishGameAssets": "KAFishGameAssets",
        "../../Utils/RealMoneyPlatform": "RealMoneyPlatform"
    }],
    DrawBoards: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "fbb7e7xV+5C3rEoZ+w+A8t7", "DrawBoards");
        var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t.draw = null, t._positiones = [], t._savePath = [], t
                }
                return n(t, e), t.prototype.onLoad = function () {
                    this.draw = this.node.getComponent(cc.Graphics), this.draw.lineWidth = 5, this.show()
                }, t.prototype.show = function () {
                    this.node.active = !0, this.node.on("mousedown", this.mouseDown, this, !1), this.node.getChildByName("_savepath").on(cc.Node.EventType.TOUCH_END, this.savePath, this, !1), this.node.getChildByName("_output").on(cc.Node.EventType.TOUCH_END, this.printPathPosition, this, !1)
                }, t.prototype.hide = function () {
                    this.node.active = !1, this.node.off("mousedown", this.mouseDown, this)
                }, t.prototype.mouseDown = function (e) {
                    var t = this.node.getParent().convertToNodeSpaceAR(e.getLocation()),
                        o = cc.v2(Math.ceil(t.x), Math.ceil(t.y));
                    this._positiones.push(o), this.draw.circle(t.x, t.y, 20), this.draw.fill()
                }, t.prototype.savePath = function (e) {
                    var t = this._positiones.slice(0, this._positiones.length - 2),
                        o = JSON.stringify(t);
                    this._positiones = [];
                    var n = Math.floor(256 * Math.random()),
                        i = Math.floor(256 * Math.random()),
                        r = Math.floor(256 * Math.random());
                    this.draw.fillColor = new cc.Color(n, i, r), this._savePath.push(o)
                }, t.prototype.printPathPosition = function (e) {
                    for (var t = 0; t < this._savePath.length; t++) { cc.log(t + 1, ":", this._savePath[t]); }
                    this._savePath = [], this._positiones = [], this.draw.clear()
                }, t = i([a], t)
            }(cc.Component));
        o.default = s, cc._RF.pop()
    }, {}],
    Enemy: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "ac037FOHg5MD59A+SDMfOKf", "Enemy");
        var n = this && this.__extends || function () {
            var e = function (t, o) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                    })(t, o)
            };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = e("../../Config/Config"),
            a = e("./Bullet"),
            s = e("../../Utils/Bezier"),
            c = e("../../Utils/KAFishGameAssets"),
            l = cc._decorator,
            u = l.ccclass,
            p = (l.property, function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t._ndAnimation = null, t._bezier = null, t._runTime = 0, t._lastPosition = cc.v2(0, 0), t._initPosition = cc.v2(0, 0), t._mode = "normal", t._delay = 0, t._initDelay = 0, t._rate = 1, t._alive = 0, t._state = "", t._idle = -1, t._pauseTime = 0, t._recycleCb = null, t._delaySpawnCallback = null, t._isDie = !1, t._tag = 0, t._fishType = "", t._score = 0, t._portrait = !1, t._onStageRect = !1, t._hasLuckyAura = !1, t.skeleton = null, t.collideBox = null, t.aniConfig = null, t._fishContainer = null, t
                }
                return n(t, e), t.prototype.onLoad = function () { }, t.prototype.isOnStage = function () {
                    return this._onStageRect
                }, t.prototype.init = function (e, t, o, n, i, a) {
                    var l = null;
                    if (e.state == r.default.consts.FLOCK) {
                        var u = e.path.split("|")[1];
                        l = c.default.getConfig("groupPath")[u]
                    } else { l = c.default.getConfig("path")[e.path]; }
                    var p = c.default.getConfig("fish")[e.type];
                    this.unschedule(this.cancelAttackShow), this.node.stopAllActions(), this._score = e.amount && e.score ? e.amount * e.score : 1, this._recycleCb = a, this._isDie = !1, this._runTime = 0, this._delaySpawnCallback = null, this._mode = "normal", this._delay = 0, this._initDelay = 0, this._rate = .4, this._alive = 99, this._pauseTime = 0, this._tag = e.id, this._state = e.state, this._onStageRect = !1, this._hasLuckyAura = !1, this._fishType = e.type, this.aniConfig = p.animats;
                    var h = this.node.getChildByName("_spine");
                    this.skeleton = h.getComponent(sp.Skeleton), this.skeleton.skeletonData = c.default.getSpine(e.type), this.skeleton.setAnimationCacheMode(sp.Skeleton.AnimationCacheMode.SHARED_CACHE), this.skeleton.animation = this.aniConfig.run.animation, this.skeleton.loop = this.aniConfig.run.repeat, this.skeleton.paused = !1, h.setScale(this.aniConfig.run.scale);
                    var f = [];
                    for (var d in l) {
                        f.push({
                            x: l[d].x + t.x,
                            y: l[d].y + t.y,
                            idle: l[d].idle ? l[d].idle : null
                        });
                    }
                    i || (f = o && n ? this.setGroupPosOffset(p, e.path, f, n) : this.setNormlPositionOffset(p, e.path, f)), this._bezier = new s.default(f, f.length, e.alive), f.length > 0 && (this._lastPosition = cc.v2(f[0].x, f[0].y), this.node.position = this._lastPosition, this._initPosition = this.node.position), this.collideBox = this.node.getComponent(cc.BoxCollider), this.collideBox.offset.x = p.collider.offset.x, this.collideBox.offset.y = p.collider.offset.y, this.collideBox.size.width = p.collider.size.w, this.collideBox.size.height = p.collider.size.h, this.collideBox.tag = e.id, this._portrait = !0, this.node.active = !0, this.node.name = "fish" + e.id, this.node.getChildByName("_spine").color = cc.color(255, 255, 255), this.node.getChildByName("_lable").string = e.path + "" + this._tag, this.node.opacity = o ? 0 : 255, this.enableCollider(!0)
                }, t.prototype.getName = function () {
                    return this.node.name
                }, t.prototype.checkEndPos = function (e, t) {
                    e.width, e.height, e.width, e.height, e.width, e.height, e.width, e.height;
                    return t.y > 0 && t.y < e.height / 2 ? t.y = e.height + 200 : t.y < 0 && t.y > e.height / 2 && (t.y = -e.height - 200), t.x > 0 && t.x < e.width / 2 ? t.x = e.width + 200 : t.x < 0 && t.x > e.width / 2 && (t.x = -e.width - 200), t
                }, t.prototype.setNormlPositionOffset = function (e, t, o) {
                    cc.winSize.width;
                    var n = cc.winSize.height / 2;
                    n > 460 ? n -= 460 : n = 0;
                    var i = o[0].x > 0 ? o[0].x + 500 : o[0].x - 500,
                        r = o[0].y > 0 ? o[0].y + n : o[0].y - n,
                        a = o[0].x > 0 ? o[0].x + 250 : o[0].x - 250,
                        s = r,
                        c = o.length - 1,
                        l = o[c].x > 0 ? o[c].x + 500 : o[c].x - 500,
                        u = o[c].y > 0 ? o[c].y + 500 : o[c].y - 500,
                        p = [{
                            x: i,
                            y: r
                        }, {
                            x: a,
                            y: s
                        }],
                        h = [{
                            x: o[c].x > 0 ? o[c].x + 250 : o[c].x - 250,
                            y: o[c].y > 0 ? o[c].y + 250 : o[c].y - 250
                        }, {
                            x: l,
                            y: u
                        }];
                    return Array.prototype.concat(p, o, h)
                }, t.prototype.setGroupPosOffset = function (e, t, o, n) {
                    if (n == "group_id_cycle") {
                        var i = cc.winSize.height / 2;
                        i = i > 540 ? 540 : i;
                        var r = o[0],
                            a = o[o.length - 1];
                        r.y >= 0 ? r.y > i && (r.y = i + 300) : r.y > -i && (r.y = -i - 300), a.y >= 0 ? a.y > i && (a.y = i + 300) : a.y > -i && (a.y = -i - 300), o[0] = r, o[o.length - 1] = a
                    }
                    return o
                }, t.prototype.isDie = function () {
                    return this._isDie
                }, t.prototype.setDelay = function (e) {
                    this._delay = e, this._initDelay = e
                }, t.prototype.setRate = function (e) {
                    this._rate = e
                }, t.prototype.setMode = function (e) {
                    this._mode = e
                }, t.prototype.getId = function () {
                    return this._tag
                }, t.prototype.getFishType = function () {
                    return this._fishType
                }, t.prototype.getState = function () {
                    return this._state
                }, Object.defineProperty(t.prototype, "score", {
                    get: function () {
                        return this._score
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.setBackground = function (e, t) { }, t.prototype.hasLuckyAura = function () {
                    return this._hasLuckyAura
                }, t.prototype.onCollisionEnter = function (e, t) {
                    if (this.node.opacity != 0) {
                        this.unschedule(this.cancelAttackShow);
                        var o = e.node.getComponent(a.default);
                        if (o.lockId && o.lockId != this._tag) {
                            var n = this.node.getChildByName("_spine");
                            n.color.getR() != 255 && n.color.getG() != 255 && n.color.getB() != 255 && this.cancelAttackShow()
                        } else { this.node.getChildByName("_spine").color = cc.color(235, 46, 46), this.scheduleOnce(this.cancelAttackShow, .3) }
                    }
                }, t.prototype.doDieForBossBattleWarning = function () {
                    var e = this;
                    if (!this._isDie) {
                        this.enableCollider(!1), this.unschedule(this.cancelAttackShow), this.cancelAttackShow();
                        var t = this;
                        this.node.runAction(cc.sequence(cc.fadeOut(1), cc.callFunc(function () {
                            t._isDie = !0, t.skeleton.paused = !0, t.skeleton = null, t.node.active = !1, t._recycleCb && t._recycleCb(e.node)
                        })))
                    }
                }, t.prototype.doDie = function () {
                    var e = this;
                    if (!this._isDie && this.collideBox.enabled) {
                        this._isDie = !0, this.enableCollider(!1), this.unschedule(this.cancelAttackShow), this.cancelAttackShow();
                        var t = this;
                        this.aniConfig.dead.type != "none" ? (this.skeleton.animation = this.aniConfig.dead.animation, this.skeleton.loop = !1, this.skeleton.setCompleteListener(function (o, n) {
                            t.skeleton ? (t.skeleton.paused = !0, t.skeleton = null, t.node.runAction(cc.sequence(cc.fadeOut(.1), cc.callFunc(function () {
                                t.node.active = !1, t._recycleCb && t._recycleCb(e.node)
                            })))) : (t.node.active = !1, t._recycleCb && t._recycleCb(e.node))
                        })) : t.skeleton ? (t.skeleton.paused = !0, t.skeleton = null, t.node.runAction(cc.sequence(cc.fadeOut(.1), cc.callFunc(function () {
                            t.node.active = !1, t._recycleCb && t._recycleCb(e.node)
                        })))) : (t.node.active = !1, t._recycleCb && t._recycleCb(this.node))
                    }
                }, t.prototype.doPause = function (e) {
                    this._pauseTime = e
                }, t.prototype.cancelAttackShow = function () {
                    this.node.getChildByName("_spine").color = cc.color(255, 255, 255)
                }, t.prototype.enableCollider = function (e) {
                    this.collideBox.enabled = e
                }, t.prototype.moveEnd = function () {
                    this._mode == "loop" && this._initDelay > 0 && (this._runTime = 0, this.node.position = this._initPosition)
                }, t.prototype.update = function (e) {
                    if (!this._isDie) {
                        if (this._pauseTime - e > 0) { this._pauseTime -= e; }
                        else if (this._state == r.default.consts.GROUP && this.node.opacity == 0 && (this.node.opacity = 255), this._delay -= e, !(this._delay > 0)) {
                            if (this._delaySpawnCallback && (this._delaySpawnCallback(), this._delaySpawnCallback = null), this._idle < 0) {
                                var t = this._bezier.getPointIdx(this.node.position);
                                if (t >= 0) {
                                    var o = this._bezier.getCurrentPoint(t);
                                    o.idle != null && this._delay < 0 && (this._idle = o.idle)
                                }
                            } else if (this._idle -= e, this._idle > 0) { return; }
                            if (this._alive -= e, this._runTime += e * this._rate, this._bezier != null) {
                                var n = this._bezier.getPoint(this._runTime);
                                if (n) {
                                    this.node.position = n;
                                    var i = this.getRealParent().convertToWorldSpaceAR(this.node.position),
                                        a = 0;
                                    i.x >= 0 && i.x <= cc.winSize.width && a++, i.y >= 0 && i.y <= cc.winSize.height && a++, this._onStageRect = a == 2
                                } else { this.moveEnd(), this._state != "group" && (this._onStageRect = !1), this.node.active = !1, this._recycleCb && this._recycleCb(this.node) }
                            }
                        }
                    }
                }, t.prototype.updateDegree = function () {
                    if (this._lastPosition) {
                        var e = this.node.getPosition();
                        if (!(this._lastPosition.sub(e).mag() < 1)) {
                            var t, o = !1;
                            e.x - this._lastPosition.x == 0 ? e.y - this._lastPosition.y > 0 ? (t = -90, o = !0) : (t = 90, o = !1) : (t = 180 * -Math.atan((e.y - this._lastPosition.y) / (e.x - this._lastPosition.x)) / 3.14, e.x < this._lastPosition.x ? (t += 180, o = !1) : o = !0), this._portrait && o ? this.node.scaleX = -1 : this.node.scaleX = 1, this._portrait ? this.node.angle = 0 : this.node.angle = -(t + 90), this._lastPosition = e
                        }
                    } else { this._lastPosition = this.node.position }
                }, t.prototype.inRect = function (e) {
                    var t = this.getRealParent().convertToNodeSpaceAR(e),
                        o = 50;
                    if (this._fishType <= "Fish_08" && this._fishType >= "Fish_00") {
                        var n = cc.v2(this.node.position.x, 0).sub(cc.v2(t.x, 0)).mag(),
                            i = cc.v2(0, this.node.position.y).sub(cc.v2(0, t.y)).mag();
                        return n <= this.collideBox.size.width && i <= this.collideBox.size.height
                    }
                    return this._fishType > "Fish_08" && this._fishType <= "Fish_12" && (o = 80), !(this.node.position.sub(t).mag() > o)
                }, t.prototype.isEffectBox = function () {
                    return this._fishType <= "Fish_02"
                }, t.prototype.setDelaySpawnCallback = function (e) {
                    this._delaySpawnCallback = e
                }, t.prototype.setFishContainer = function (e) {
                    this._fishContainer = e
                }, t.prototype.getRealParent = function () {
                    return this.node.getParent() ? this.node.getParent() : this._fishContainer
                }, t = i([u], t)
            }(cc.Component));
        o.default = p, cc._RF.pop()
    }, {
        "../../Config/Config": "Config",
        "../../Utils/Bezier": "Bezier",
        "../../Utils/KAFishGameAssets": "KAFishGameAssets",
        "./Bullet": "Bullet"
    }],
    EventButton: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "9abbccIMSRHKZMjOzSZtOIq", "EventButton");
        var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = e("../../Utils/CCHelper"),
            a = cc._decorator,
            s = a.ccclass,
            c = a.property,
            l = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t.eventName = "EventButton", t._ndBg = null, t._lblText = null, t
                }
                return n(t, e), t.prototype.onLoad = function () {
                    this.node.on(cc.Node.EventType.TOUCH_END, this.onHandle, this)
                }, t.prototype.onHandle = function () {
                    var e = r.default.splitNodeName(this.node.name);
                    e.sender = this, r.default.dispatchEvent(this.node, this.eventName, cc.Node.EventType.TOUCH_END, e)
                }, t.prototype.highLight = function (e) {
                    this._ndBg || (this._ndBg = this.node.getChildByName("bgHighLight")), this._ndBg.active = e
                }, t.prototype.setText = function (e) {
                    if (!this._lblText) {
                        var t = this.node.getChildByName("text");
                        t && (this._lblText = t.getComponent(cc.Label))
                    }
                    this._lblText && (this._lblText.string = e)
                }, i([c], t.prototype, "eventName", void 0), t = i([s], t)
            }(cc.Component);
        o.default = l, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper"
    }],
    FishPondAnimation: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "1b2adRm/sxDerttXAQ9wJJK", "FishPondAnimation");
        var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t.animAtlas = null, t
                }
                return n(t, e), t.prototype.onLoad = function () {
                    this.init()
                }, t.prototype.init = function () {
                    var e, t = null,
                        o = null;
                    t = this.node.getChildByName("_ndRipples").getComponent(cc.Animation), e = this.getSpriteFrameList("SunLight", 1, 32), (o = cc.AnimationClip.createWithSpriteFrames(e, 16)).wrapMode = cc.WrapMode.Loop, t.addClip(o, "SunLight"), t.play("SunLight")
                }, t.prototype.getSpriteFrameList = function (e, t, o) {
                    for (var n = [], i = t; i < o + 1; i++) {
                        var r = e + "_" + i,
                            a = this.animAtlas.getSpriteFrame(r);
                        n.push(a)
                    }
                    return n
                }, i([s({
                    type: cc.SpriteAtlas
                })], t.prototype, "animAtlas", void 0), t = i([a], t)
            }(cc.Component);
        o.default = c, cc._RF.pop()
    }, {}],
    Fish: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "6a062qQt21A3Iiwe95B8Am5", "Fish");
        var n = this && this.__extends || function () {
            var e = function (t, o) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                    })(t, o)
            };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = e("../../Utils/Bezier"),
            l = e("../../Config/Config"),
            u = e("./Bullet"),
            p = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t.spriteAtlas = [], t.bgAtlas = null, t._ndAnimation = null, t._bezier = null, t._runTime = 0, t._lastPosition = cc.v2(0, 0), t._initPosition = cc.v2(0, 0), t._mode = "normal", t._delay = 0, t._initDelay = 0, t._rate = 1, t._alive = 0, t._state = "", t._pauseTime = 0, t._fishContainer = null, t._recycleCb = null, t._isDie = !1, t._tag = 0, t._fishType = "", t._score = 0, t._portrait = !1, t._onStageRect = !1, t._hasLuckyAura = !1, t
                }
                return n(t, e), t.prototype.onLoad = function () { }, t.prototype.isOnStage = function () {
                    return this._onStageRect
                }, t.prototype.onClick = function (e) {
                    cc.log("Click Fish:", this._tag, this._fishType)
                }, t.prototype.init = function (e, t, o, n, i, r, a, s, l, u, p) {
                    var h = this;
                    if (n) {
                        this.unschedule(this._cancelAttackShow), this.node.stopAllActions(), this._score = s, this._recycleCb = p, this._isDie = !1, this._runTime = 0, this._mode = "normal", this._delay = 0, this._initDelay = 0, this._rate = .4, this._alive = 99, this._pauseTime = 0, this._tag = o, this._state = t, this._onStageRect = !1, this._hasLuckyAura = !1;
                        var f = [];
                        for (var d in i) {
                            f.push({
                                x: i[d].x + a.x,
                                y: i[d].y + a.y
                            });
                        }
                        f = l && u ? this.setGroupPosOffset(n, e, f, u) : this.setNormlPositionOffset(n, e, f), this._bezier = new c.default(f, f.length, r), f.length > 0 && (this._lastPosition = cc.v2(f[0].x, f[0].y), this.node.position = this._lastPosition, this._initPosition = this.node.position);
                        var _ = this.node.getComponent(cc.BoxCollider);
                        _.offset.x = n.collider.offset.x, _.offset.y = n.collider.offset.y, _.size.width = n.collider.size.w, _.size.height = n.collider.size.h, _.tag = o, n.portrait ? this._portrait = !0 : this._portrait = !1;
                        var g = this.node.getChildByName("bg");
                        g && (g.stopAllActions(), g.active = !1);
                        var y = this.node.getChildByName("img");
                        this._ndAnimation = y;
                        for (var m = y.getComponent(cc.Animation), v = m.getClips(); v.length > 0;) { m.removeClip(v[0], !0), v = m.getClips(); }
                        var b = n.animats;
                        this._fishType = b.run.pre.trim(), ["run"].forEach(function (e, t, o) {
                            var n = h.getSpriteFrameList(b[e]),
                                i = cc.AnimationClip.createWithSpriteFrames(n, b[e].speed);
                            e === "run" && (i.wrapMode = cc.WrapMode.Loop), m.addClip(i, e)
                        }), m.play("run"), y.color = cc.color(255, 255, 255), this.node.active = !0, this.node.name = "fish" + o, this.node.opacity = l ? 0 : 255, this.enableCollider(!0)
                    }
                }, t.prototype.checkEndPos = function (e, t) {
                    e.width, e.height, e.width, e.height, e.width, e.height, e.width, e.height;
                    return t.y > 0 && t.y < e.height / 2 ? t.y = e.height + 200 : t.y < 0 && t.y > e.height / 2 && (t.y = -e.height - 200), t.x > 0 && t.x < e.width / 2 ? t.x = e.width + 200 : t.x < 0 && t.x > e.width / 2 && (t.x = -e.width - 200), t
                }, t.prototype.setNormlPositionOffset = function (e, t, o) {
                    e.animats.run.pre > "Fish_08" && (this._rate = .5), t == "bezier_id_6" && e.animats.run.pre == "Fish_02" && (o[0].y += 300), t != "bezier_id_14" || e.animats.run.pre != "Fish_02" && e.animats.run.pre != "Fish_03" && e.animats.run.pre != "Fish_04" && e.animats.run.pre != "Fish_05" || (o[o.length - 1].x -= 200);
                    cc.winSize.width;
                    var n = cc.winSize.height / 2;
                    n > 460 ? n -= 460 : n = 0;
                    var i = o[0].x > 0 ? o[0].x + 500 : o[0].x - 500,
                        r = o[0].y > 0 ? o[0].y + n : o[0].y - n,
                        a = o[0].x > 0 ? o[0].x + 250 : o[0].x - 250,
                        s = r,
                        c = o.length - 1,
                        l = o[c].x > 0 ? o[c].x + 500 : o[c].x - 500,
                        u = o[c].y > 0 ? o[c].y + 500 : o[c].y - 500,
                        p = [{
                            x: i,
                            y: r
                        }, {
                            x: a,
                            y: s
                        }],
                        h = [{
                            x: o[c].x > 0 ? o[c].x + 250 : o[c].x - 250,
                            y: o[c].y > 0 ? o[c].y + 250 : o[c].y - 250
                        }, {
                            x: l,
                            y: u
                        }];
                    return Array.prototype.concat(p, o, h)
                }, t.prototype.setGroupPosOffset = function (e, t, o, n) {
                    if (n == "group_id_cycle") {
                        var i = cc.winSize.height / 2;
                        i = i > 540 ? 540 : i;
                        var r = o[0],
                            a = o[o.length - 1];
                        r.y >= 0 ? r.y > i && (r.y = i + 300) : r.y > -i && (r.y = -i - 300), a.y >= 0 ? a.y > i && (a.y = i + 300) : a.y > -i && (a.y = -i - 300), o[0] = r, o[o.length - 1] = a
                    }
                    return o
                }, t.prototype.isDie = function () {
                    return this._isDie
                }, t.prototype.setDelay = function (e) {
                    this._delay = e, this._initDelay = e
                }, t.prototype.setRate = function (e) {
                    this._rate = e
                }, t.prototype.setMode = function (e) {
                    this._mode = e
                }, t.prototype.getId = function () {
                    return this._tag
                }, t.prototype.getFishType = function () {
                    return this._fishType
                }, Object.defineProperty(t.prototype, "score", {
                    get: function () {
                        return this._score
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.getSpriteFrameList = function (e) {
                    for (var t = e.pre, o = [], n = 0; n < 20; n++) {
                        var i = t + "_" + n,
                            r = this._getSpriteFrame(i);
                        r && o.push(r)
                    }
                    return o
                }, t.prototype.setBackground = function (e, t) {
                    var o = this.node.getChildByName("bg");
                    if (o) {
                        var n = e.animats.run.pre,
                            i = this.bgAtlas.getSpriteFrame(n);
                        o.active = !0, o.setContentSize(i.getRect().width, i.getRect().height), o.setScale(4), o.getComponent(cc.Sprite).spriteFrame = i, o.runAction(cc.repeatForever(cc.rotateBy(.1, 36)));
                        var r = this.node.getComponent(cc.BoxCollider);
                        r.offset.x = e.collider.offset.x, r.offset.y = e.collider.offset.y, r.size.width = e.collider.size.w, r.size.height = e.collider.size.h, this._hasLuckyAura = t != l.default.consts.FISH_LIGHTING_BOMB
                    }
                }, t.prototype.hasLuckyAura = function () {
                    return this._hasLuckyAura
                }, t.prototype.onCollisionEnter = function (e, t) {
                    if (this.node.opacity != 0) {
                        this.unschedule(this._cancelAttackShow);
                        var o = e.node.getComponent(u.default);
                        if (o.lockId && o.lockId != this._tag) {
                            var n = this.node.getChildByName("img");
                            n.color.getR() != 255 && n.color.getG() != 255 && n.color.getB() != 255 && (n.color = cc.color(255, 255, 255))
                        } else {
                            this.node.getChildByName("img").color = cc.color(235, 46, 46), this.scheduleOnce(this._cancelAttackShow, .3)
                        }
                    }
                }, t.prototype.pickStatus = function (e) {
                    var t = this.node.getChildByName("img");
                    t.color = e ? cc.color(255, 255, 255) : cc.color(235, 46, 46)
                }, t.prototype.doDie = function () {
                    var e = this;
                    if (!this._isDie) {
                        this._isDie = !0, this.enableCollider(!1), this.unschedule(this._cancelAttackShow), this._cancelAttackShow();
                        var t = this.node.getChildByName("bg");
                        t.stopAllActions(), t.active = !1;
                        var o = this;
                        this.node.runAction(cc.sequence(cc.fadeOut(.4), cc.callFunc(function () {
                            o.node.active = !1, o.node.removeFromParent(), o._recycleCb && e._recycleCb(e.node)
                        })))
                    }
                }, t.prototype.doPause = function (e) {
                    this._pauseTime = e
                }, t.prototype._cancelAttackShow = function () {
                    this.node.getChildByName("img").color = cc.color(255, 255, 255)
                }, t.prototype.enableCollider = function (e) {
                    var t = this.node.getComponent(cc.BoxCollider);
                    return t && (t.enabled = e), t
                }, t.prototype._moveEnd = function () {
                    this._mode == "loop" && this._initDelay > 0 && (this._runTime = 0, this.node.position = this._initPosition)
                }, t.prototype.update = function (e) {
                    if (!this._isDie) {
                        if (this._pauseTime - e > 0) { this._pauseTime -= e; }
                        else if (this._delay -= e, !(this._delay > 0) && (this._state == l.default.consts.GROUP && this.node.opacity == 0 && (this.node.opacity = 255), this._alive -= e, this._runTime += e * this._rate, this._bezier != null)) {
                            var t = this._bezier.getPoint(this._runTime);
                            if (t) {
                                this.node.position = t, this.updateDegree();
                                var o = this.getRealParent().convertToWorldSpaceAR(this.node.position),
                                    n = 0;
                                o.x >= 0 && o.x <= cc.winSize.width && n++, o.y >= 0 && o.y <= cc.winSize.height && n++, this._onStageRect = n == 2
                            } else { this._moveEnd(), this._state != "group" && (this._onStageRect = !1), this.node.active = !1, this._recycleCb && this._recycleCb(this.node) }
                        }
                    }
                }, t.prototype.updateDegree = function () {
                    if (this._lastPosition) {
                        var e = this.node.getPosition();
                        if (!(this._lastPosition.sub(e).mag() < 1)) {
                            var t, o = !1;
                            e.x - this._lastPosition.x == 0 ? e.y - this._lastPosition.y > 0 ? (t = -90, o = !0) : (t = 90, o = !1) : (t = 180 * -Math.atan((e.y - this._lastPosition.y) / (e.x - this._lastPosition.x)) / 3.14, e.x < this._lastPosition.x ? (t += 180, o = !1) : o = !0), this._portrait && o ? this.node.scaleX = -1 : this.node.scaleX = 1, this._portrait ? this.node.angle = 0 : this.node.angle = -(t + 90), this._lastPosition = e
                        }
                    } else { this._lastPosition = this.node.position }
                }, t.prototype._getSpriteFrame = function (e) {
                    for (var t = 0; t < this.spriteAtlas.length; t++) {
                        var o = this.spriteAtlas[t].getSpriteFrame(e);
                        if (o) { return o }
                    }
                    return null
                }, t.prototype.inRect = function (e) {
                    var t = this.getRealParent().convertToNodeSpaceAR(e),
                        o = this.node.position.sub(t).mag(),
                        n = 50;
                    return this._fishType <= "Fish_07" ? n = 100 : this._fishType > "Fish_07" && this._fishType <= "Fish_12" && (n = 80), !(o > n)
                }, t.prototype.setFishContainer = function (e) {
                    this._fishContainer = e
                }, t.prototype.getRealParent = function () {
                    return this.node.getParent() ? this.node.getParent() : this._fishContainer
                }, i([s({
                    type: [cc.SpriteAtlas]
                })], t.prototype, "spriteAtlas", void 0), i([s({
                    type: [cc.SpriteAtlas]
                })], t.prototype, "bgAtlas", void 0), t = i([a], t)
            }(cc.Component);
        o.default = p, cc._RF.pop()
    }, {
        "../../Config/Config": "Config",
        "../../Utils/Bezier": "Bezier",
        "./Bullet": "Bullet"
    }],
    GameRankStorage: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "b8445zY/zRKY7Q095dsrZGQ", "GameRankStorage");
        var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, function (e) {
                function t() {
                    return e !== null && e.apply(this, arguments) || this
                }
                var o;
                return n(t, e), o = t, Object.defineProperty(t.prototype, "displayRankType", {
                    get: function () {
                        return o._displayRankType
                    },
                    set: function (e) {
                        o._displayRankType = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "worldRankData", {
                    get: function () {
                        return o._worldRankData
                    },
                    set: function (e) {
                        o._worldRankData = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), t._displayRankType = 0, t._worldRankData = [], t = o = i([a], t)
            }(cc.Component));
        o.default = s, cc._RF.pop()
    }, {}],
    GameReCall: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "8f5fbIuhfBIcK2u3O+rsKTD", "GameReCall");
        var n = this && this.__extends || function () {
            var e = function (t, o) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                    })(t, o)
            };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = e("../../uikiller/Thor"),
            l = e("../../Config/Config"),
            u = e("../Business/AudioManage"),
            p = e("./RecallRow"),
            h = e("../Model/BusinessStorage"),
            f = e("../../Utils/KAFishGameAssets"),
            d = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t.pfbRecallRow = null, t._businessStorage = null, t.TITLE_COL_MARGIN = 65, t.COL_ROW0_MARGIN = 50, t.COL_ROW_MARGIN = 30, t.MAX_ROW = 5, t._reacllQueue = [], t._defScaleY = 0, t._pageIndex = 0, t
                }
                return n(t, e), t.prototype.onLoad = function () {
                    this._businessStorage = this.node.getComponent(h.default)
                }, t.prototype.init = function (e) {
                    var t = this.getHScale(),
                        o = this.node.getChildByName("_recallframe"),
                        n = (o.getChildByName("_title"), o.getChildByName("_colum")),
                        i = o.getChildByName("_closeBtn"),
                        r = o.getChildByName("_empty"),
                        a = o.getChildByName("_larrow"),
                        s = o.getChildByName("_rarrow"),
                        c = o.getChildByName("_pagenumber"),
                        l = Math.ceil(this._reacllQueue.length / this.MAX_ROW);
                    if (this._reacllQueue.length > 0) {
                        var p = this.MAX_ROW * (this._pageIndex + 1),
                            h = this.MAX_ROW * this._pageIndex;
                        p > this._reacllQueue.length && (p = this._reacllQueue.length);
                        var f = n.y + n.height / 2 - 100,
                            d = 0 + this.MAX_ROW * this._pageIndex,
                            _ = this.createRow(this._reacllQueue[d]);
                        for (_.x = n.x, _.y = f - _.height / 2, _.name = "row_" + (d - h), _.on(cc.Node.EventType.TOUCH_END, e), o.addChild(_, 99), ++d; d < this.MAX_ROW + h; d++) {
                            var g = this.createRow(this._reacllQueue[d]);
                            g.x = _.x, g.y = _.y - g.height - 80, g.name = "row_" + (d - h), o.addChild(g, 99), (_ = g).on(cc.Node.EventType.TOUCH_END, e)
                        }
                        c.active = !0;
                        var y = c.getComponent(cc.Label);
                        y.string = this._pageIndex + 1 + " / " + l, y._updateRenderData(!0), c.y = _.y - _.height - 60, r.active = !1, l > 1 ? (a.active = !0, s.active = !0, a.on(cc.Node.EventType.TOUCH_END, this.btnArrowClick, this), s.on(cc.Node.EventType.TOUCH_END, this.btnArrowClick, this)) : (a.active = !1, s.active = !1)
                    } else { a.active = !1, s.active = !1, c.active = !1; }
                    var m = this;
                    i.active = !0, i.on(cc.Node.EventType.TOUCH_END, function (e) {
                        u.default.getInstance().playBtnEffect(), i.off(cc.Node.EventType.TOUCH_END), m._businessStorage.showRecall = !1
                    }, this), this._defScaleY = t
                }, t.prototype.show = function () {
                    var e = this.node.getChildByName("_maskbg");
                    if (e && !e.active) {
                        e.active = !0;
                        var t = this.node.getChildByName("_recallframe");
                        t && (t.active = !0), this._reacllQueue = this._businessStorage.recallQueue, this.init(this._businessStorage.recallCallBack)
                    }
                }, t.prototype.close = function () {
                    var e = this.node.getChildByName("_maskbg");
                    if (e && e.active) {
                        e.active = !1;
                        var t = this.node.getChildByName("_recallframe");
                        if (t) {
                            this.clearRow(t);
                            var o = t.getChildByName("_larrow"),
                                n = t.getChildByName("_rarrow");
                            o && o.active && o.off(cc.Node.EventType.TOUCH_END, this.btnArrowClick, this), n && n.active && n.off(cc.Node.EventType.TOUCH_END, this.btnArrowClick, this), t.active = !1
                        }
                        this._pageIndex = 0
                    }
                }, t.prototype.btnArrowClick = function (e) {
                    e.target.name == "_larrow" ? this._pageIndex-- : this._pageIndex++;
                    var t = Math.ceil(this._reacllQueue.length / this.MAX_ROW);
                    this._pageIndex < 0 ? this._pageIndex = t - 1 : this._pageIndex >= t && (this._pageIndex = 0);
                    var o = this.node.getChildByName("_recallframe");
                    this.clearRow(o), this.init(this._businessStorage.recallCallBack), u.default.getInstance().playBtnEffect()
                }, t.prototype.clearRow = function (e) {
                    for (var t = 0, o = e.getChildByName("row_" + t); o;) { e.removeChild(o, !0), o = e.getChildByName("row_" + ++t) }
                }, t.prototype.getHScale = function () {
                    cc.winSize.height, l.default.consts.FRAME_HEIGHT;
                    return 1
                }, t.prototype.resetPosition = function () {
                    var e = this.node.getChildByName("_recallframe");
                    e && (this.clearRow(e), this.init(this._businessStorage.recallCallBack))
                }, t.prototype.createRow = function (e) {
                    var t = cc.instantiate(f.default.getPrefab("recallRow"));
                    return t.getComponent(p.default).init(e), t
                }, t.prototype.update = function (e) {
                    this._businessStorage && this._businessStorage.showRecall ? (this.show(), this._defScaleY != this.getHScale() && this.resetPosition()) : this.close()
                }, i([s({
                    type: cc.Prefab
                })], t.prototype, "pfbRecallRow", void 0), t = i([a], t)
            }(c.default);
        o.default = d, cc._RF.pop()
    }, {
        "../../Config/Config": "Config",
        "../../Utils/KAFishGameAssets": "KAFishGameAssets",
        "../../uikiller/Thor": "Thor",
        "../Business/AudioManage": "AudioManage",
        "../Model/BusinessStorage": "BusinessStorage",
        "./RecallRow": "RecallRow"
    }],
    GameServerWsConnector: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "2aeb64RATVGXrxSrP7cjyH8", "GameServerWsConnector");
        var n = this && this.__extends || function () {
            var e = function (t, o) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                    })(t, o)
            };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("../../Config/Config")),
            c = e("pomelo-weixin-client"),
            l = e("../Model/NetConnector"),
            u = e("es6-promise"),
            p = e("../Model/PromptDialogStorage"),
            h = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t.socketConn = c, t.wsConn = c.newInstance(), t._netConnector = null, t._retryDelay = 0, t
                }
                return n(t, e), t.prototype.onLoad = function () {
                    this._netConnector = this.node.getComponent(l.default), this.initWsConnector()
                }, t.prototype.queryGameServer = function () {
                    return new u.Promise(function (e, t) {
                        e(!0)
                    }).then(function () {
                        return s.default.getDefaultWSConnectData()
                    })
                }, t.prototype.initWsConnector = function () {
                    var e = this;
                    this.queryGameServer().then(function (t) {
                        if (t) {
                            if (e._netConnector) {
                                cc.log("porxy back:", t);
                                var o = s.default.determineProductionRMPServerUrl("connector", t.port);
                                e._netConnector.gameSocketServer.ip = o.host, e._netConnector.gameSocketServer.port = o.port, e._netConnector.gameSocketServer.gamePath = o.gamePath, e.configWsConnector()
                            }
                        } else { e._netConnector && (e._netConnector.gameSocketServer.ip = "", e._netConnector.gameSocketServer.port = 0), p.default.showMsg(s.default.ERR_CODE_NETWORK.toString()) }
                    }).catch(function (t) {
                        cc.log("queryGameServer reject ", t), p.default.showMsg(s.default.ERR_CODE_NETWORK.toString()), e._netConnector && (e._netConnector.socketConnector = null)
                    })
                }, t.prototype._retry = function () {
                    var e = this;
                    cc.log("_retry ", e._retryDelay), ++e._retryDelay, e._retryDelay > 6 && (e._retryDelay = 6), e.scheduleOnce(function () {
                        e.initWsConnector()
                    }, e._retryDelay)
                }, t.prototype.configWsConnector = function () {
                    var e = this;
                    if (e._netConnector && e._netConnector.gameSocketServer.ip != "" && e._netConnector.gameSocketServer.port != 0) {
                        var t = e._netConnector.gameSocketServer.ip,
                            o = e._netConnector.gameSocketServer.port,
                            n = e._netConnector.gameSocketServer.gamePath;
                        e.wsConn.init({
                            host: t,
                            port: o,
                            gamePath: n,
                            debugMode: !1,
                            browserWS: !0
                        }, function (t) {
                            t ? (e.wsConn.on("close", function (e) {
                                p.default.showMsg(s.default.ERR_CODE_NETWORK.toString())
                            }), e._netConnector.socketConnector = e.wsConn) : (e._netConnector.gameSocketServer.ip = "", e._netConnector.gameSocketServer.port = 0, e._netConnector.socketConnector = null, p.default.showMsg(s.default.ERR_CODE_NETWORK.toString()))
                        })
                    }
                }, t = i([a], t)
            }(cc.Component);
        o.default = h, cc._RF.pop()
    }, {
        "../../Config/Config": "Config",
        "../Model/NetConnector": "NetConnector",
        "../Model/PromptDialogStorage": "PromptDialogStorage",
        "es6-promise": 4,
        "pomelo-weixin-client": 5
    }],
    GameStage: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "04778ZBUxpO9qkWl8D+jXbu", "GameStage");
        var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("../Components/Model/UserInfoStorage")),
            c = e("../Utils/CCHelper"),
            l = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t._userInfo = null, t
                }
                return n(t, e), t.prototype.onLoad = function () {
                    this._userInfo = this.node.getComponent(s.default), this._userInfo.isLogin || (cc.log("Jump to login"), c.default.preloadScene(this, "Login", function (e, t) {
                        cc.director.loadScene("Login")
                    }, function (e, t) { }))
                }, t = i([a], t)
            }(cc.Component);
        o.default = l, cc._RF.pop()
    }, {
        "../Components/Model/UserInfoStorage": "UserInfoStorage",
        "../Utils/CCHelper": "CCHelper"
    }],
    GameStart: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "26b38pjY3pNn5+/+CqpYgMz", "GameStart");
        var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("../Model/BusinessStorage")),
            c = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t._businessStorage = null, t
                }
                return n(t, e), t.prototype.onLoad = function () {
                    this._businessStorage = this.node.getComponent(s.default)
                }, t.prototype._onTouchEnd = function (e) {
                    if (this._businessStorage) {
                        if (this._businessStorage.startGame) { return; }
                        this._businessStorage.currQueIndex = this._businessStorage.questionCursor, this._businessStorage.startGame = !0
                    }
                }, t = i([a], t)
            }(e("../../uikiller/Thor").default);
        o.default = c, cc._RF.pop()
    }, {
        "../../uikiller/Thor": "Thor",
        "../Model/BusinessStorage": "BusinessStorage"
    }],
    GunSight: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "1babalw7BBG05dWCMYlaasQ", "GunSight");
        var n = this && this.__extends || function () {
            var e = function (t, o) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                    })(t, o)
            };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = e("../../Utils/KAFishGameAssets"),
            a = cc._decorator,
            s = a.ccclass,
            c = a.property,
            l = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t.fishAtlas = null, t.framePos = {
                        x: 1,
                        y: 1
                    }, t.defPos = null, t
                }
                return n(t, e), t.prototype.init = function () {
                    this.setBoxStatus(!1);
                    var e = this.node.getChildByName("_fishbox");
                    this.defPos = cc.v2(e.x, e.y)
                }, t.prototype.setBoxStatus = function (e) {
                    var t = this.node.getChildByName("_fishbox"),
                        o = this.node.getChildByName("_boxbg");
                    t.active = e, o.active = e
                }, t.prototype.setLockFish = function (e) {
                    var t = this.node.getChildByName("_fishbox"),
                        o = this.node.getChildByName("_boxbg"),
                        n = t.getComponent(cc.Sprite),
                        i = r.default.getSpriteFrame("fish_alpha_sheet", e);
                    n.spriteFrame = i, t.position = o.position, this.lockFramePosBackToDefault()
                }, t.prototype.lockFramePosBackToDefault = function () {
                    var e = this.node.getChildByName("_fishbox"),
                        t = this.node.getChildByName("_boxbg");
                    this.framePos = {
                        x: 1,
                        y: 1
                    }, e.setPosition(cc.v2(this.defPos.x, this.defPos.y)), t.setPosition(cc.v2(this.defPos.x, this.defPos.y))
                }, t.prototype.showBox = function () {
                    this.setBoxStatus(!0)
                }, t.prototype.closeBox = function () {
                    this.setBoxStatus(!1)
                }, t.prototype.clearFishSprite = function () {
                    var e = this.node.getChildByName("_fishbox");
                    this.node.getChildByName("_boxbg");
                    e.getComponent(cc.Sprite).spriteFrame = null
                }, t.prototype.getSpriteFrame = function (e) {
                    return this.fishAtlas.getSpriteFrame(e)
                }, t.prototype.reLockFramePos = function (e) {
                    var t = {
                        x: 1,
                        y: 1
                    },
                        o = cc.winSize.width / 2,
                        n = cc.winSize.height / 2,
                        i = this.node.getChildByName("_boxbg"),
                        r = i.x >= 0 ? i.x : -i.x,
                        a = i.y >= 0 ? i.y : -i.y;
                    if (e.x < 0 && e.x - r - i.width < -o ? t.x = 1 : e.x > 0 && e.x + r + i.width > o && (t.x = -1), e.y < 0 && e.y - a - i.height < -n ? t.y = 1 : e.y > 0 && e.y + a + i.height > n && (t.y = -1), this.framePos.x != t.x || this.framePos.y != t.y) {
                        this.framePos = t;
                        var s = this.node.getChildByName("_fishbox");
                        i.setPosition(cc.v2(i.x * this.framePos.x, i.y * this.framePos.y)), s.setPosition(cc.v2(s.x * this.framePos.x, s.y * this.framePos.y))
                    }
                }, i([c({
                    type: [cc.SpriteAtlas]
                })], t.prototype, "fishAtlas", void 0), t = i([s], t)
            }(cc.Component);
        o.default = l, cc._RF.pop()
    }, {
        "../../Utils/KAFishGameAssets": "KAFishGameAssets"
    }],
    HandlingAnimation: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "a60edR/kfVPfZZ0zbB/UBuO", "HandlingAnimation");
        var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t.rate = .5, t._idx = 0, t._elapse = 0, t
                }
                return n(t, e), t.prototype.onLoad = function () { }, t.prototype.onAnimation = function (e) {
                    if (this._elapse < this.rate) { this._elapse += e; }
                    else {
                        this._elapse = 0;
                        for (var t = this.node.children, o = 0; o < t.length; o++) { o <= this._idx ? t[o].active = !0 : t[o].active = !1; }
                        this._idx = ++this._idx % t.length
                    }
                }, t.prototype.update = function (e) {
                    this.onAnimation(e)
                }, i([s], t.prototype, "rate", void 0), t = i([a], t)
            }(cc.Component);
        o.default = c, cc._RF.pop()
    }, {}],
    HorizontalScroll: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "a1e47515pBJd5XPaBn8lpsI", "HorizontalScroll");
        var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t._scrollView = null, t._percent = 0, t._initPercent = 0, t
                }
                return n(t, e), t.prototype.onLoad = function () {
                    var e = this;
                    this._scrollView = this.node.getComponent(cc.ScrollView), this.calcInitPercent(), this._scrollView && this._scrollView.node.on(cc.Node.EventType.SIZE_CHANGED, function () {
                        e.calcInitPercent()
                    })
                }, t.prototype.calcInitPercent = function () {
                    this._scrollView && (this._initPercent = this._scrollView.node.width / this._scrollView.content.width)
                }, t.prototype.horScroll = function (e, t) {
                    if (this._scrollView) {
                        if ((t = parseInt(t)) < 0) {
                            if (this._percent < 0) { return void (this._percent = 0); }
                            this._percent -= .1
                        } else if (t > 0) {
                            if (this._percent >= 1) { return void (this._percent = 1); }
                            this._percent += .1
                        }
                        this._scrollView.scrollToPercentHorizontal(this._percent, .3)
                    }
                }, t = i([a], t)
            }(cc.Component));
        o.default = s, cc._RF.pop()
    }, {}],
    IphoneXTopPadding: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "838absHsq9Aap9KwdJNZM4l", "IphoneXTopPadding");
        var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t.yOffset = 30, t
                }
                return n(t, e), t.prototype.onLoad = function () {
                    this.onHandle()
                }, t.prototype.onHandle = function () { }, i([s], t.prototype, "yOffset", void 0), t = i([a], t)
            }(cc.Component);
        o.default = c, cc._RF.pop()
    }, {}],
    JettonsItem: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "a380dFUFIdLlr3qCsHoXQ4d", "JettonsItem");
        var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = e("../../Utils/CCHelper"),
            a = cc._decorator,
            s = a.ccclass,
            c = a.property,
            l = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t.goldAtlas = null, t._ndTagBg = null, t._lblAmount = null, t._ndAnim = null, t._recycleCb = null, t
                }
                return n(t, e), t.prototype.init = function (e) {
                    this._recycleCb = e, this._ndAnim = this.node.getChildByName("anim"), this._ndTagBg = this.node.getChildByName("tagbg"), this._lblAmount = this._ndTagBg.getChildByName("amount").getComponent(cc.Label);
                    var t = this._ndAnim.getComponent(cc.Animation),
                        o = this.getSpriteFrameList("jetton_1", 1, 3),
                        n = cc.AnimationClip.createWithSpriteFrames(o, 15);
                    n.wrapMode = cc.WrapMode.Loop, t.addClip(n, "jetton")
                }, t.prototype.playAnimation = function (e) {
                    var t = this;
                    this._lblAmount.string = e;
                    var o = e / 5e3 * 372;
                    o < 10 && (o = e / 500 * 372), o %= 372;
                    var n = r.default.getRandomNum(-2, 2);
                    this._ndTagBg.getComponent(cc.Sprite).spriteFrame = n < 0 ? this.goldAtlas.getSpriteFrame("jetton_bgc1") : this.goldAtlas.getSpriteFrame("jetton_bgc2"), this.node.active = !0, this.node.opacity = 255, this.node.y = 0, this._ndTagBg.active = !1, this._ndAnim.active = !0;
                    var i = this._ndAnim.getComponent(cc.Animation);
                    i.stop(), i.play("jetton"), this.node.runAction(cc.sequence(cc.moveTo(1, cc.v2(0, o)), cc.callFunc(function () {
                        i.stop(), t._ndAnim.active = !1, t._ndTagBg.active = !0
                    }), cc.delayTime(.1), cc.fadeOut(.3), cc.callFunc(function () {
                        t._recycleCb && t._recycleCb(t.node)
                    })))
                }, t.prototype.getSpriteFrameList = function (e, t, o) {
                    for (var n = [], i = t; i < o + 1; i++) {
                        var r = e + "_" + i,
                            a = this.goldAtlas.getSpriteFrame(r);
                        n.push(a)
                    }
                    return n
                }, i([c(cc.SpriteAtlas)], t.prototype, "goldAtlas", void 0), t = i([s], t)
            }(cc.Component);
        o.default = l, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper"
    }],
    Joystick: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "a962eBT4ohFNbE++6Onpd97", "Joystick");
        var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r, a = cc._decorator,
            s = a.ccclass,
            c = a.property;
        (function (e) {
            e[e.IDLE = 0] = "IDLE", e[e.LEFT = 1] = "LEFT", e[e.UP = 2] = "UP", e[e.RIGHT = 3] = "RIGHT", e[e.DOWN = 4] = "DOWN", e[e.LEFT_UP = 5] = "LEFT_UP", e[e.RIGHT_UP = 6] = "RIGHT_UP", e[e.LEFT_DOWN = 7] = "LEFT_DOWN", e[e.RIGHT_DOWN = 8] = "RIGHT_DOWN"
        })(r = o.Direction || (o.Direction = {}));
        var l = function (e) {
            function t() {
                var t = e !== null && e.apply(this, arguments) || this;
                return t.interactable = !0, t.fixed = !0, t.background = null, t.bar = null, t.moveEvents = [], t.radius = 0, t._dirction = r.IDLE, t._localPos = null, t._angle = 0, t
            }
            var o;
            return n(t, e), o = t, Object.defineProperty(t.prototype, "direction", {
                get: function () {
                    return this._dirction
                },
                set: function (e) {
                    cc.Component.EventHandler.emitEvents(this.moveEvents, {
                        oldDir: this.direction,
                        newDir: e,
                        angle: this._angle,
                        wPos: this._localPos
                    }), this._dirction = e
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.start = function () {
                this.radius = this.background.width / 2, this.direction = r.IDLE, this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this), this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this), this.originPos = this.background.position
            }, t.prototype.calcAngleFromWorldPos = function (e) {
                if (!(this.radius <= 0)) {
                    var t = (e = this.background.convertToNodeSpaceAR(e)).mag();
                    return t > this.radius && e.mulSelf(this.radius / t), 180 * e.signAngle(cc.v2(-1, 0)) / Math.PI
                }
            }, t.prototype.onTouchStart = function (e) {
                this.interactable && (this.fixed ? this.onTouchMove(e) : this.background.position = this.node.convertToNodeSpaceAR(e.getLocation()))
            }, t.prototype.onTouchMove = function (e) {
                if (this.interactable) {
                    var t = this.background.convertToNodeSpaceAR(e.getLocation());
                    this.bar && (this.bar.position = t), this._localPos = e.getLocation();
                    var n = t.mag();
                    n > this.radius && t.mulSelf(this.radius / n), this.bar && (this.bar.position = t), this._angle = 180 * t.signAngle(cc.v2(-1, 0)) / Math.PI;
                    var i = o.GetDirctionByAngle(this._angle);
                    this.direction = i
                }
            }, t.prototype.onTouchEnd = function () {
                this.interactable && (this.direction = r.IDLE, this.bar && (this.bar.position = cc.v2()), this.fixed || (this.background.position = this.originPos))
            }, t.GetDirctionByAngle = function (e) {
                return e >= -22.5 && e < 22.5 ? r.LEFT : e >= 22.5 && e < 67.5 ? r.LEFT_UP : e >= 67.5 && e < 112.5 ? r.UP : e >= 112.5 && e < 157.5 ? r.RIGHT_UP : e >= 157.5 || e < -157.5 ? r.RIGHT : e >= -157.5 && e < -112.5 ? r.RIGHT_DOWN : e >= -112.5 && e < -67.5 ? r.DOWN : e >= -67.5 && e < -22.5 ? r.LEFT_DOWN : void 0
            }, t.GetDirVecByDir = function (e) {
                switch (e) {
                    case r.LEFT:
                        return cc.v2(-1, 0);
                    case r.UP:
                        return cc.v2(0, 1);
                    case r.RIGHT:
                        return cc.v2(1, 0);
                    case r.DOWN:
                        return cc.v2(0, -1);
                    case r.LEFT_UP:
                        return cc.v2(-1, 1).normalize();
                    case r.RIGHT_UP:
                        return cc.v2(1, 1).normalize();
                    case r.RIGHT_DOWN:
                        return cc.v2(1, -1).normalize();
                    case r.LEFT_DOWN:
                        return cc.v2(-1, -1).normalize();
                    default:
                        return cc.v2()
                }
            }, i([c(cc.Boolean)], t.prototype, "interactable", void 0), i([c({
                tooltip: "\u662f\u5426\u56fa\u5b9a\u4f4d\u7f6e"
            })], t.prototype, "fixed", void 0), i([c(cc.Node)], t.prototype, "background", void 0), i([c(cc.Node)], t.prototype, "bar", void 0), i([c([cc.Component.EventHandler])], t.prototype, "moveEvents", void 0), t = o = i([s], t)
        }(cc.Component);
        o.Joystick = l, cc._RF.pop()
    }, {}],
    KAFishGameAssets: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "4ec59uLW7ZC0KUImjgmWigO", "KAFishGameAssets");
        var n = this && this.__extends || function () {
            var e = function (t, o) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                    })(t, o)
            };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = e("./CCHelper"),
            l = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t.spineData = [], t.spriteAtlaseData = [], t.pfbsData = [], t
                }
                var o;
                return n(t, e), o = t, t.prototype.onLoad = function () {
                    c.default.loadResource("config/bullet.json", function (e) {
                        cc.log("load bullet config ", e), e.json ? o._bulletConfig = e.json : o._bulletConfig = e
                    }), c.default.loadResource("config/fish.json", function (e) {
                        cc.log("load fish config ", e), e.json ? o._fishConfig = e.json : o._fishConfig = e
                    }), c.default.loadResource("config/path.json", function (e) {
                        cc.log("load path config ", e), e.json ? o._pathConfig = e.json : o._pathConfig = e
                    }), c.default.loadResource("config/group.json", function (e) {
                        cc.log("load group config ", e), e.json ? o._groupConfig = e.json : o._groupConfig = e
                    }), c.default.loadResource("config/groupPath.json", function (e) {
                        cc.log("load groupPath config ", e), e.json ? o._groupPathConfig = e.json : o._groupPathConfig = e
                    }), c.default.loadResource("config/fishFlock.json", function (e) {
                        cc.log("load fishFlock config ", e), e.json ? o._flockConfig = e.json : o._flockConfig = e
                    }), c.default.loadResource("config/boss.json", function (e) {
                        cc.log("load boss config ", e), e.json ? o._bossConfig = e.json : o._bossConfig = e
                    });
                    for (var e = 0; e < this.spineData.length; e++) { o._spine[this.spineData[e].name] = this.spineData[e], o._spineNodePool[this.spineData[e].name] = new cc.NodePool; }
                    for (e = 0; e < this.spriteAtlaseData.length; e++) { o._sprite[this.spriteAtlaseData[e].name] = this.spriteAtlaseData[e]; }
                    for (e = 0; e < this.pfbsData.length; e++) { o._prefab[this.pfbsData[e].name] = this.pfbsData[e], o._pfbNodePool[this.pfbsData[e].name] = new cc.NodePool }
                }, t.getPrefab = function (e) {
                    var t = o._pfbNodePool[e].get();
                    return t || (t = o._prefab[e]), t
                }, t.recyclePrefab = function (e, t) {
                    o._pfbNodePool[t].put(e)
                }, t.getSpriteFrame = function (e, t) {
                    return o._sprite[e + ".plist"].getSpriteFrame(t)
                }, t.getSpriteFrameByMulti = function (e, t) {
                    for (var n = 0, i = null; o._sprite[e + "_" + n + ".plist"] && !(i = o._sprite[e + "_" + n + ".plist"].getSpriteFrame(t));) { n++; }
                    return i
                }, t.getSpine = function (e) {
                    return o._spine[e]
                }, t.recycleSpineNode = function (e, t) {
                    o._spineNodePool[t] || cc.log(t, o._spineNodePool), o._spineNodePool[t].put(e)
                }, t.getConfig = function (e) {
                    return this["_" + e + "Config"]
                }, t._bulletConfig = {}, t._fishConfig = {}, t._pathConfig = {}, t._groupConfig = {}, t._groupPathConfig = {}, t._flockConfig = {}, t._bossConfig = {}, t._spine = {}, t._sprite = {}, t._prefab = {}, t._pfbNodePool = {}, t._spineNodePool = {}, i([s({
                    type: sp.SkeletonData
                })], t.prototype, "spineData", void 0), i([s({
                    type: cc.SpriteAtlas
                })], t.prototype, "spriteAtlaseData", void 0), i([s({
                    type: cc.Prefab
                })], t.prototype, "pfbsData", void 0), t = o = i([a], t)
            }(cc.Component);
        o.default = l, cc._RF.pop()
    }, {
        "./CCHelper": "CCHelper"
    }],
    LanguageData: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "61de062n4dJ7ZM9/Xdumozn", "LanguageData");
        var n = e("polyglot.min"),
            i = null;

        function r(e) {
            return window.i18n.languages[e]
        }

        function a(e) {
            e && (i ? i.replace(e) : i = new n({
                phrases: e,
                allowMissing: !0
            }))
        }
        window.i18n || (window.i18n = {
            languages: {},
            curLang: ""
        }), t.exports = {
            init: function (e) {
                if (e !== window.i18n.curLang) {
                    var t = r(e) || {};
                    window.i18n.curLang = e, a(t), this.inst = i
                }
            },
            t: function (e, t) {
                if (i) { return i.t(e, t) }
            },
            inst: i,
            updateSceneRenderers: function () {
                for (var e = cc.director.getScene().children, t = [], o = 0; o < e.length; ++o) {
                    var n = e[o].getComponentsInChildren("LocalizedLabel");
                    Array.prototype.push.apply(t, n)
                }
                for (var i = 0; i < t.length; ++i) {
                    var r = t[i];
                    r.node.active && r.updateLabel()
                }
                for (var a = [], s = 0; s < e.length; ++s) {
                    var c = e[s].getComponentsInChildren("LocalizedSprite");
                    Array.prototype.push.apply(a, c)
                }
                for (var l = 0; l < a.length; ++l) {
                    var u = a[l];
                    u.node.active && u.updateSprite(window.i18n.curLang)
                }
            }
        }, cc._RF.pop()
    }, {
        "polyglot.min": "polyglot.min"
    }],
    Language: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "6f4b7AVVWdHprs6M9gicjos", "Language");
        var n = this && this.__extends || function () {
            var e = function (t, o) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                    })(t, o)
            };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("LanguageData")),
            c = e("../../Utils/CCHelper"),
            l = function (e) {
                function t() {
                    return e !== null && e.apply(this, arguments) || this
                }
                return n(t, e), t.prototype.start = function () {
                    var e = c.default.getLang();
                    e ? c.default.isZhHans() ? s.init("zh-hans") : c.default.isZhHant() ? s.init("zh-hant") : e == "ru" ? s.init(e) : ["en", "ru", "ja", "ko", "th"].indexOf(e) >= 0 ? s.init(e) : s.init("en") : s.init("en"), cc.debug.setDisplayStats(!1)
                }, t.prototype.update = function (e) {
                    s.updateSceneRenderers()
                }, t = i([a], t)
            }(cc.Component);
        o.default = l, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper",
        LanguageData: "LanguageData"
    }],
    LobbyViewControl: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "8c0f7sp31VJUoCy7GY1cVQM", "LobbyViewControl");
        var n = this && this.__extends || function () {
            var e = function (t, o) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                    })(t, o)
            };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = e("../Components/Model/UserInfoStorage"),
            l = e("../uikiller/Thor"),
            u = e("../Config/Config"),
            p = e("../Components/UI/AndroidAskFullScreen"),
            h = e("../Utils/CCHelper"),
            f = e("../Components/Model/TableSearchStorage"),
            d = e("../Components/Business/StartSearchTable"),
            _ = e("../Components/UI/CurrencyLabel"),
            g = e("../Components/Model/WalletStorage"),
            y = e("../Utils/RealMoneyPlatform"),
            m = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t.autoSearchOnce = !1, t.pfbFullScreen = null, t.pfbCurrencyLabel = null, t._userInfoStorage = null, t._tableSearchStorage = null, t._walletStorage = null, t._netConnector = null, t._hasInitRoom = !1, t._initLabelPos = !1, t._currenyLabelPoole = [], t
                }
                return n(t, e), t.prototype.onLoad = function () {
                    if (this._userInfoStorage = this.node.getComponent(c.default), this._tableSearchStorage = this.node.getComponent(f.default), this._walletStorage = this.node.getComponent(g.default), this._showHideChildren(!0), h.default.isShowFullScreenNotice(u.default.consts.ANDROID_FULLSCREEN_LOBBY)) {
                        var e = cc.instantiate(this.pfbFullScreen),
                            t = e.getComponent(p.default);
                        e.setParent(this.node), t.show(this.node)
                    }
                    h.default.isAutoSearchTable() && (this.node.getChildByName("_roomoption").active = !1, this.scheduleOnce(function (e) {
                        if (this._tableSearchStorage) {
                            var t = {};
                            t.level = h.default.getUrlRoomLevel(), cc.log("rlv==", t), this._tableSearchStorage.searchParams = t, this._tableSearchStorage.startSearch = !0
                        }
                    }, 1));
                    for (var o = 0; o < u.default.consts.MAX_ROOM; o++) { this._currenyLabelPoole.push(cc.instantiate(this.pfbCurrencyLabel)) }
                }, t.prototype.update = function (e) {
                    if (this._userInfoStorage && this._userInfoStorage.roomlevelCost && !this._hasInitRoom) {
                        this._hasInitRoom = !0;
                        for (var t = this.node.getChildByName("_roomoption"), o = 0; o < u.default.consts.MAX_ROOM; o++) {
                            var n = t.getChildByName("_room" + o),
                                i = (n.getComponent(d.default), h.default.getMyCannonCostList(this._userInfoStorage.roomlevelCost, o)),
                                r = this._currenyLabelPoole[o],
                                a = r.getComponent(_.default);
                            r.setParent(n), r.name = "room_currency_x" + o, a.init(i[0].cy, y.default.numberFormat(i[0].rmp), y.default.numberFormat(i[i.length - 1].rmp)), a.setSeparate("-")
                        }
                        h.default.checkAndSetFrameScale(this.node)
                    }
                }, t.prototype.lateUpdate = function () {
                    if (!this._initLabelPos) {
                        this._initLabelPos = !0;
                        for (var e = [-211, -211, -211], t = this.node.getChildByName("_roomoption"), o = 0; o < u.default.consts.MAX_ROOM; o++) {
                            var n = t.getChildByName("_room" + o);
                            this._currenyLabelPoole[o].getComponent(_.default).show(n.position, cc.v2(-10, e[o]))
                        }
                    }
                }, t.prototype._showHideChildren = function (e) {
                    for (var t = this.node.children, o = 0; o < t.length; o++) { t[o].active = e }
                }, i([s], t.prototype, "autoSearchOnce", void 0), i([s({
                    type: cc.Prefab
                })], t.prototype, "pfbFullScreen", void 0), i([s({
                    type: cc.Prefab
                })], t.prototype, "pfbCurrencyLabel", void 0), t = i([a], t)
            }(l.default);
        o.default = m, cc._RF.pop()
    }, {
        "../Components/Business/StartSearchTable": "StartSearchTable",
        "../Components/Model/TableSearchStorage": "TableSearchStorage",
        "../Components/Model/UserInfoStorage": "UserInfoStorage",
        "../Components/Model/WalletStorage": "WalletStorage",
        "../Components/UI/AndroidAskFullScreen": "AndroidAskFullScreen",
        "../Components/UI/CurrencyLabel": "CurrencyLabel",
        "../Config/Config": "Config",
        "../Utils/CCHelper": "CCHelper",
        "../Utils/RealMoneyPlatform": "RealMoneyPlatform",
        "../uikiller/Thor": "Thor"
    }],
    LocalizedLabel: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "744dcs4DCdNprNhG0xwq6FK", "LocalizedLabel");
        var n = e("LanguageData");
        cc.Class({
            extends: cc.Component,
            editor: {
                executeInEditMode: !0,
                menu: "i18n/LocalizedLabel"
            },
            properties: {
                dataID: {
                    get: function () {
                        return this._dataID
                    },
                    set: function (e) {
                        this._dataID !== e && (this._dataID = e, this.updateLabel())
                    }
                },
                _dataID: ""
            },
            onLoad: function () {
                n.inst || n.init(), this.fetchRender()
            },
            fetchRender: function () {
                var e = this.getComponent(cc.Label);
                if (e) { return this.label = e, void this.updateLabel() }
            },
            updateLabel: function () {
                this.label ? n.t(this.dataID) && (this.label.string = n.t(this.dataID)) : cc.error("Failed to update localized label, label component is invalid!")
            }
        }), cc._RF.pop()
    }, {
        LanguageData: "LanguageData"
    }],
    LocalizedSprite: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "f34ac2GGiVOBbG6XlfvgYP4", "LocalizedSprite");
        var n = e("SpriteFrameSet");
        cc.Class({
            extends: cc.Component,
            editor: {
                executeInEditMode: !0,
                inspector: "packages://i18n/inspector/localized-sprite.js",
                menu: "i18n/LocalizedSprite"
            },
            properties: {
                spriteFrameSet: {
                    default: [],
                    type: n
                }
            },
            onLoad: function () {
                this.fetchRender()
            },
            fetchRender: function () {
                var e = this.getComponent(cc.Sprite);
                if (e) { return this.sprite = e, void this.updateSprite(window.i18n.curLang) }
            },
            getSpriteFrameByLang: function (e) {
                for (var t = 0; t < this.spriteFrameSet.length; ++t) { if (this.spriteFrameSet[t].language === e) { return this.spriteFrameSet[t].spriteFrame } }
            },
            updateSprite: function (e) {
                if (this.sprite) {
                    var t = this.getSpriteFrameByLang(e);
                    !t && this.spriteFrameSet[0] && (t = this.spriteFrameSet[0].spriteFrame), this.sprite.spriteFrame = t
                } else { cc.error("Failed to update localized sprite, sprite component is invalid!") }
            }
        }), cc._RF.pop()
    }, {
        SpriteFrameSet: "SpriteFrameSet"
    }],
    LoginSuccessRedirector: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "78e87AMRhxIh6p0dF/0ZDdp", "LoginSuccessRedirector");
        var n = this && this.__extends || function () {
            var e = function (t, o) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                    })(t, o)
            };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = e("../Model/UserInfoStorage"),
            l = e("../../Utils/CCHelper"),
            u = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t.sceneName = "", t.loadAtlas = null, t._userInfoStorage = null, t._progressBar = null, t._isPreLoad = !1, t
                }
                return n(t, e), t.prototype.onLoad = function () {
                    this._userInfoStorage = this.node.getComponent(c.default);
                    var e = this.node.getChildByName("ProgressBar");
                    e && (this._progressBar = e.getComponent(cc.ProgressBar));
                    var t = this.node.getChildByName("_gamename");
                    t && ((l.default.isZhHans() || l.default.isZhHant()) && (t.getComponent(cc.Sprite).spriteFrame = this.loadAtlas.getSpriteFrame("loading_hant"), t.x -= 60))
                }, t.prototype.loadGameScene = function (e) {
                    var t = this;
                    if (this.sceneName != "" && !this._isPreLoad) {
                        var o = this;
                        o._isPreLoad = !0, l.default.preloadScene(this, this.sceneName, function (e, n) {
                            cc.director.loadScene(t.sceneName), o._isPreLoad = !1
                        }, function (t, o) {
                            e && (e.progress = t / o)
                        })
                    }
                }, t.prototype.update = function (e) {
                    this._userInfoStorage && this._userInfoStorage.isLogin && this.loadGameScene(this._progressBar)
                }, i([s], t.prototype, "sceneName", void 0), i([s({
                    type: cc.SpriteAtlas
                })], t.prototype, "loadAtlas", void 0), t = i([a], t)
            }(cc.Component);
        o.default = u, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper",
        "../Model/UserInfoStorage": "UserInfoStorage"
    }],
    MockPanel: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "30bb2CZ0yxMOLlwEE9V/Gay", "MockPanel");
        var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("../../uikiller/Thor")),
            c = e("../../Config/Config"),
            l = function (e) {
                function t() {
                    return e !== null && e.apply(this, arguments) || this
                }
                return n(t, e), t.prototype.onLoad = function () { }, t.prototype._onBtnStartGameTouchEnd = function () {
                    var e = {
                        msg: null
                    };
                    e.msg = {
                        table: {
                            _id: "8a662f70-e333-11e8-9f54-a103d88c53cf",
                            playerIds: ["a6d39f61-e0fb-11e8-9c78-8f51870b57b4"],
                            chairId: ["9a5c8d51-e0fb-11e8-9c78-8f51870b57b4", "c9dd7051-e333-11e8-9e0d-fbd490cfe815", "a6d39f61-e0fb-11e8-9c78-8f51870b57b4", "c2103741-e333-11e8-9e0d-fbd490cfe815"],
                            gameId: "10001",
                            serverId: "whackMole-server-1",
                            hostId: "",
                            name: "Auto"
                        },
                        players: [{
                            id: "a6d39f61-e0fb-11e8-9c78-8f51870b57b4",
                            gameState: "playing",
                            gender: 1,
                            avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erQkUeq69icJFhiaqUl8cQ5GpWicxxNoFmMZOu1PqhVQzo3TOSobhGS8APU9S9GbZVggIex0cAn9NLZw/132",
                            nickName: "Fs2hero",
                            tableId: "f482ce70-e367-11e8-baf2-e565bf78afe9",
                            connectorId: "connector-server-1",
                            gameId: "10001",
                            gameServerId: "whackMole-server-1",
                            teamId: "",
                            updateTime: 1541423207585,
                            createTime: 1541423207585,
                            wxOpenId: "o9ZyP4tYZo0v7QYn_dG6Ldv6ejjg",
                            gold: 999
                        }, {
                            id: "c2103741-e333-11e8-9e0d-fbd490cfe815",
                            gameState: "free",
                            gender: 1,
                            avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoyNOEic1I3QM87b62sNZphBPJwuMJ6CYe6HA2q1UEicEmsJ80Do9ic0tfDlnwDUtVibVJHzRghZHSgJw/132",
                            nickName: "Baggio",
                            tableId: "8a662f70-e333-11e8-9f54-a103d88c53cf",
                            connectorId: "",
                            gameId: "",
                            gameServerId: "",
                            teamId: "",
                            updateTime: 1541667207421,
                            createTime: 1541667207421,
                            wxOpenId: "o9ZyP4pDCqeLEFG68q4rT75aF0ew",
                            gold: 686
                        }, {
                            id: "9a5c8d51-e0fb-11e8-9c78-8f51870b57b4",
                            gameState: "playing",
                            gender: 0,
                            avatarUrl: "",
                            nickName: "coder",
                            tableId: "f482ce70-e367-11e8-baf2-e565bf78afe9",
                            connectorId: "connector-server-1",
                            gameId: "10001",
                            gameServerId: "whackMole-server-1",
                            teamId: "",
                            updateTime: 1541423186729,
                            createTime: 1541423186729,
                            wxOpenId: "o9ZyP4or1BMhcsNy8LtW6MQbTL8w",
                            gold: 222
                        }, {
                            id: "c9dd7051-e333-11e8-9e0d-fbd490cfe815",
                            gameState: "free",
                            gender: 1,
                            avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJKq1370yicYc9zuEkQibUBdLlibviameJCRxV9SZ1WUoe03ka3e2HJJblHUELHib17LzU0cfI7JYISP0A/132",
                            nickName: "\u6664\u6668",
                            tableId: "",
                            connectorId: "",
                            gameId: "",
                            gameServerId: "",
                            teamId: "",
                            updateTime: 1541667220481,
                            createTime: 1541667220481,
                            wxOpenId: "o9ZyP4sfCxl5xFCDiSGoFhY9URE4",
                            gold: 161
                        }],
                        area: {
                            _id: "f68925c0-e367-11e8-baf2-e565bf78afe9",
                            winner: "",
                            state: "started",
                            seed: 1541689629212,
                            tableId: "f482ce70-e367-11e8-baf2-e565bf78afe9",
                            createTime: 1541689629212
                        },
                        areaPlayers: [{
                            _id: "f68ad370-e367-11e8-baf2-e565bf78afe9",
                            score: 0,
                            hits: [],
                            playerId: "a6d39f61-e0fb-11e8-9c78-8f51870b57b4",
                            areaId: "f68925c0-e367-11e8-baf2-e565bf78afe9",
                            createTime: 1541689629223
                        }, {
                            _id: "f68de0b0-e367-11e8-baf2-e565bf78afe9",
                            score: 0,
                            hits: [],
                            playerId: "9a5c8d51-e0fb-11e8-9c78-8f51870b57b4",
                            areaId: "f68925c0-e367-11e8-baf2-e565bf78afe9",
                            createTime: 1541689629243
                        }]
                    }, cc.log("MockPanel StartGame Click "), c.default.mockNetEvent.emit(c.default.pomeloPushRoute.gameStart, e)
                }, t.prototype._onBtnShowHideTouchEnd = function () {
                    this._$._ndContent && (this._$._ndContent.active = !this._$._ndContent.active)
                }, t.prototype._onBtnSpawnFishesTouchEnd = function () {
                    cc.log("_onBtnSpawnFishesTouchEnd");
                    var e = [{
                        state: c.default.consts.SOLO,
                        type: "Fish_00",
                        path: "bezier_id_4",
                        alive: 30
                    }, {
                        state: c.default.consts.SOLO,
                        type: "Fish_01",
                        path: "bezier_id_3",
                        alive: 30
                    }, {
                        state: c.default.consts.SOLO,
                        type: "Fish_02",
                        path: "bezier_id_2",
                        alive: 30
                    }];
                    c.default.mockNetEvent.emit(c.default.pomeloPushRoute.onSpawnFishes, {
                        msg: e
                    })
                }, t.prototype._onBtnSpawnFishGroupTouchEnd = function () {
                    cc.log("_onBtnSpawnFishGroupTouchEnd");
                    var e = [{
                        state: c.default.consts.GROUP,
                        group: "group_id_0",
                        path: "bezier_id_4",
                        seed: Date.now(),
                        alive: 60
                    }];
                    c.default.mockNetEvent.emit(c.default.pomeloPushRoute.onSpawnFishes, {
                        msg: e
                    })
                }, t.prototype._onBtnSitDownTouchEnd = function () {
                    cc.log("_onBtnSitDownTouchEnd"), c.default.mockNetEvent.emit("clickSitDown", {
                        msg: "sitdown"
                    })
                }, t = i([a], t)
            }(s.default);
        o.default = l, cc._RF.pop()
    }, {
        "../../Config/Config": "Config",
        "../../uikiller/Thor": "Thor"
    }],
    MountUiKiller: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "dd7720VwZpGrba2aJMzWDEK", "MountUiKiller");
        var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, function (e) {
                function t() {
                    return e !== null && e.apply(this, arguments) || this
                }
                return n(t, e), t.prototype.onLoad = function () {
                    cc.log("MountUiKiller "), this._$._lblName.$Label.string = "NotFound"
                }, t = i([a], t)
            }(e("../uikiller/Thor").default));
        o.default = s, cc._RF.pop()
    }, {
        "../uikiller/Thor": "Thor"
    }],
    NetConnector: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "77ad4zmU09HprtqxyXfHVQG", "NetConnector");
        var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, function (e) {
                function t() {
                    return e !== null && e.apply(this, arguments) || this
                }
                var o;
                return n(t, e), o = t, Object.defineProperty(t.prototype, "webConnector", {
                    get: function () {
                        return o._webConnector
                    },
                    set: function (e) {
                        o._webConnector = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "gameWebServer", {
                    get: function () {
                        return o._gameWebServer
                    },
                    set: function (e) {
                        o._gameWebServer = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "socketConnector", {
                    get: function () {
                        return o._socketConnector
                    },
                    set: function (e) {
                        o._socketConnector = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "gameSocketServer", {
                    get: function () {
                        return o._gameSocketServer
                    },
                    set: function (e) {
                        o._gameSocketServer = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "jwtToken", {
                    get: function () {
                        return o._jwtToken
                    },
                    set: function (e) {
                        o._jwtToken = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.makeWsPacket = function (e) {
                    return {
                        accessToken: o._jwtToken,
                        query: e
                    }
                }, t._webConnector = null, t._gameWebServer = {
                    ip: "",
                    port: 0
                }, t._socketConnector = null, t._gameSocketServer = {
                    ip: "",
                    port: 0
                }, t._jwtToken = "", t = o = i([a], t)
            }(cc.Component));
        o.default = s, cc._RF.pop()
    }, {}],
    NodeZOrder: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "495472oJ8lG1qvM5pkcBFgM", "NodeZOrder");
        var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = function (e) {
                function t() {
                    return e !== null && e.apply(this, arguments) || this
                }
                return n(t, e), Object.defineProperty(t.prototype, "zOrder", {
                    get: function () {
                        return this.node.zIndex
                    },
                    set: function (e) {
                        this.node.zIndex = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), i([s({
                    type: cc.Integer
                })], t.prototype, "zOrder", null), t = i([a], t)
            }(cc.Component);
        o.default = c, cc._RF.pop()
    }, {}],
    NoviceTeaching: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "666a5xqX5dILYFVVinqFGd/", "NoviceTeaching");
        var n = this && this.__extends || function () {
            var e = function (t, o) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                    })(t, o)
            };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("../../Config/Config")),
            c = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t._nerverShow = !1, t
                }
                return n(t, e), t.prototype.play = function () {
                    if (!this._nerverShow) {
                        this.node.active = !0, this._nerverShow = !0;
                        var e = this;
                        this.scheduleOnce(function () {
                            e.close()
                        }, s.default.consts.NOVICE_DELAY_TIME)
                    }
                }, t.prototype.close = function () {
                    var e = this;
                    this.unscheduleAllCallbacks(), this.node.runAction(cc.sequence(cc.fadeOut(.5), cc.callFunc(function () {
                        e.node.active = !1
                    })))
                }, t = i([a], t)
            }(cc.Component);
        o.default = c, cc._RF.pop()
    }, {
        "../../Config/Config": "Config"
    }],
    Pair: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "2775dsfqeBJsrkdHGeGozcG", "Pair");
        var n = cc.Class({
            name: "Pair",
            properties: {
                key: "",
                value: ""
            }
        });
        t.exports = n, cc._RF.pop()
    }, {}],
    PayTableFishFrame: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "46680inQnRPZpyVE/ViXk8m", "PayTableFishFrame");
        var n = this && this.__extends || function () {
            var e = function (t, o) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                    })(t, o)
            };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("../../Utils/KAFishGameAssets")),
            c = e("./PayTablePayScoreLabel"),
            l = function (e) {
                function t() {
                    return e !== null && e.apply(this, arguments) || this
                }
                return n(t, e), t.prototype.init = function (e, t) {
                    var o = this.node.getChildByName("_separate"),
                        n = this.node.getChildByName("_fish"),
                        i = n.getComponent(sp.Skeleton);
                    i.skeletonData = s.default.getSpine(e), i.animation = i.findAnimation("Idle") ? "Idle" : "animation", i.setAnimationCacheMode(sp.Skeleton.AnimationCacheMode.SHARED_CACHE), i.loop = !0;
                    var r = cc.instantiate(s.default.getPrefab("PTPayScoreLabel"));
                    r.name = "score", r.setParent(this.node), r.getComponent(c.default).init(t), o.setPosition(cc.v2(n.x, n.y - 100)), r.setPosition(cc.v2(o.x, o.y - o.height / 2 - 30))
                }, t.prototype.setSpineScale = function (e) {
                    this.node.getChildByName("_fish").setScale(e)
                }, t = i([a], t)
            }(cc.Component);
        o.default = l, cc._RF.pop()
    }, {
        "../../Utils/KAFishGameAssets": "KAFishGameAssets",
        "./PayTablePayScoreLabel": "PayTablePayScoreLabel"
    }],
    PayTablePayScoreLabel: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "a9118QZOiRH3qBoUCFbOO+e", "PayTablePayScoreLabel");
        var n = this && this.__extends || function () {
            var e = function (t, o) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                    })(t, o)
            };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("../../Utils/CCHelper")),
            c = e("../../Utils/RealMoneyPlatform"),
            l = e("../../Utils/KAFishGameAssets"),
            u = function (e) {
                function t() {
                    return e !== null && e.apply(this, arguments) || this
                }
                return n(t, e), t.prototype.init = function (e) {
                    var t = this.node.getChildByName("_score"),
                        o = this.node.getChildByName("_currency");
                    if (!e) { return t.active = !1, void (o.active = !1); }
                    var n = t.getComponent(cc.Label),
                        i = o.getComponent(cc.Sprite);
                    n.string = c.default.numberFormat(e.rmp), n._updateRenderData(!0), i.spriteFrame = l.default.getSpriteFrame("currencysymbol", "reelwinmeter_" + s.default.getRealSpriteCurrency(e.cy)), e.isbehind ? this.node.getChildByName("_currency").setPosition(cc.v2(t.x + t.width / 2 + 40, t.y - 5)) : this.node.getChildByName("_currency").setPosition(cc.v2(t.x - t.width / 2 - 40, t.y - 5))
                }, t = i([a], t)
            }(cc.Component);
        o.default = u, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper",
        "../../Utils/KAFishGameAssets": "KAFishGameAssets",
        "../../Utils/RealMoneyPlatform": "RealMoneyPlatform"
    }],
    PayTableViewStorage: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "cfeb96SjvJHxKJ9WGrtkmB+", "PayTableViewStorage");
        var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, function (e) {
                function t() {
                    return e !== null && e.apply(this, arguments) || this
                }
                var o;
                return n(t, e), o = t, Object.defineProperty(t.prototype, "payData", {
                    get: function () {
                        return o._payData
                    },
                    set: function (e) {
                        o._payData = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "isOpen", {
                    get: function () {
                        return o._isOpen
                    },
                    set: function (e) {
                        o._isOpen = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "pageIdx", {
                    get: function () {
                        return o._pageIdx
                    },
                    set: function (e) {
                        o._pageIdx = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "scaleX", {
                    get: function () {
                        return o._scaleX
                    },
                    set: function (e) {
                        o._scaleX = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "scaleY", {
                    get: function () {
                        return o._scaleY
                    },
                    set: function (e) {
                        o._scaleY = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), t._isOpen = !1, t._pageIdx = -1, t._payData = null, t._scaleX = 1, t._scaleY = 1, t = o = i([a], t)
            }(cc.Component));
        o.default = s, cc._RF.pop()
    }, {}],
    PayTableView: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "15e7cC8EjVPX7S37tIqYi0A", "PayTableView");
        var n = this && this.__extends || function () {
            var e = function (t, o) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                    })(t, o)
            };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("../../uikiller/Thor")),
            c = e("../../Utils/CCHelper"),
            l = e("../Model/PayTableViewStorage"),
            u = e("../UI/PayTableFishFrame"),
            p = e("../Model/NetConnector"),
            h = e("../../Utils/RealMoneyPlatform"),
            f = e("../Business/AudioManage"),
            d = e("../../Utils/KAFishGameAssets"),
            _ = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t._paytableData = null, t._bulletCost = null, t._cps = 0, t._totalBet = 0, t._closing = !1, t._framecount = 0, t._pageViews = [], t._pageIndex = -1, t._paytableStorage = null, t._netConnector = null, t._intervalId = null, t._scaleX = 1, t._scaleY = 1, t._frameWidth = 0, t._frameHeight = 0, t._frameRatio = 1, t._FRAME_DEF_WIDTH = 1096, t._FRAME_DEF_HEIGHT = 915, t._L_ROW_SPACE = 244, t._S_ROW_SPACE = 126, t
                }
                var o;
                return n(t, e), o = t, t.prototype.onLoad = function () {
                    this._netConnector = this.node.getComponent(p.default), this._paytableStorage = this.node.getComponent(l.default), o._self = this, this.initView(), this.hideAll(!0);
                    var e = this.node.getChildByName("_paytable");
                    this._frameWidth = e.getContentSize().width, this._frameHeight = e.getContentSize().height
                }, t.prototype.getPTFrame = function () {
                    return cc.instantiate(d.default.getPrefab("PTFishFrame"))
                }, t.prototype.clearPTFrame = function () {
                    for (var e = 0; e < o.MAX_FISH_TYPE; e++) {
                        var t = this.node.getChildByName(o.PFB_ICON_NAME + e);
                        t && t.removeFromParent()
                    }
                }, t.prototype.getPayRealMoney = function (e) {
                    if (this._paytableData) {
                        var t = this._paytableData.scores["Fish_" + c.default.paddingZeroLeft(e.toString(), 2)];
                        if (t) { return h.default.getRealMoney(this._paytableData.cannonCost * t) }
                    }
                }, t.prototype.hideAll = function (e) {
                    for (var t = this.node.children, o = 0; o < t.length; o++) { t[o].active = !e }
                }, t.prototype.changePage = function (e) {
                    this.clearPage(), e > this._pageViews.length || this._pageViews[e - 1]()
                }, t.prototype.clearPage = function () {
                    this.clearPTFrame()
                }, t.prototype.closePaytable = function () {
                    this._paytableStorage.isOpen != 0 && (this.clearPage(), this.clearPTFrame(), this.hideAll(!0), this._paytableStorage.isOpen = !1, this._pageIndex = -1, this._intervalId && (clearInterval(this._intervalId), this._intervalId = null))
                }, t.prototype.showPage = function () {
                    this._pageIndex != this._paytableStorage.pageIdx && (this._paytableData = this._paytableStorage.payData, this.hideAll(!1), this.changePage(this._paytableStorage.pageIdx), this._pageIndex = this._paytableStorage.pageIdx)
                }, t.prototype.onArrowClick = function (e) {
                    var t = e.target.name == "_arrowleft" ? -1 : 1;
                    this._paytableStorage.pageIdx + t > this._pageViews.length ? this._paytableStorage.pageIdx = 1 : this._paytableStorage.pageIdx + t < 0 ? this._paytableStorage.pageIdx = this._pageViews.length : this._paytableStorage.pageIdx += t, this._paytableStorage.pageIdx == 0 && (this._paytableStorage.pageIdx = this._pageViews.length), e.target.runAction(cc.sequence(cc.scaleTo(.05, .8), cc.scaleTo(.05, 1))), f.default.getInstance().playBtnEffect()
                }, t.prototype.onCloseClick = function (e) {
                    f.default.getInstance().playBtnEffect(), this.closePaytable()
                }, t.prototype.update = function (e) {
                    this._paytableStorage && this._paytableStorage.payData && (this._paytableStorage.isOpen ? this.showPage() : this.closePaytable())
                }, t.prototype.createEmtpyLayout = function () {
                    return o._self._fishNode
                }, t.prototype.initView = function () {
                    this._arrowleft.on(cc.Node.EventType.TOUCH_END, this.onArrowClick, this, !0), this._arrowright.on(cc.Node.EventType.TOUCH_END, this.onArrowClick, this, !0), this._close.on(cc.Node.EventType.TOUCH_END, this.onCloseClick, this, !0), this._pageViews.push(this.createPage1), this._pageViews.push(this.createPage2), this._pageViews.push(this.createPage3), this._pageViews.push(this.createPage4), this._pageViews.push(this.createPage5)
                }, t.prototype.closePage = function () {
                    var e = o._self._fishNode.getChildByName("_page1");
                    e.active = !1;
                    var t = e.getChildByName("_boss"),
                        n = e.getChildByName("_speedup"),
                        i = e.getChildByName("_lightning"),
                        r = e.getChildByName("_timepause");
                    t.active = !1, n.active = !1, i.active = !1, r.active = !1, this.clearPTFrame()
                }, t.prototype.createPage1 = function () {
                    o._self.closePage();
                    var e = o._self._fishNode.getChildByName("_page1");
                    e.active = !0;
                    var t = o._self.getPTFrame();
                    t.setParent(o._self.node), t.name = o.PFB_ICON_NAME + "3", t.x += 0, t.y = 500;
                    var n = t.getComponent(u.default);
                    n.init("Fish_" + c.default.paddingZeroLeft("3", 2), o._self.getPayRealMoney("3")), n.setSpineScale(.8);
                    var i = o._self.getPTFrame();
                    i.setParent(o._self.node), i.name = o.PFB_ICON_NAME + "4", i.x += -200, i.y = -550;
                    var r = i.getComponent(u.default);
                    r.init("Fish_" + c.default.paddingZeroLeft("4", 2), o._self.getPayRealMoney("4")), r.setSpineScale(.6);
                    var a = o._self.getPTFrame();
                    a.setParent(o._self.node), a.name = o.PFB_ICON_NAME + "5", a.x = i.x + i.width + a.width + 200, a.y = i.y;
                    var s = a.getComponent(u.default);
                    s.init("Fish_" + c.default.paddingZeroLeft("5", 2), o._self.getPayRealMoney("5")), s.setSpineScale(.6);
                    var l = e.getChildByName("_boss");
                    l.active = !0, l.setPosition(cc.v2(0, -400)), e.runAction(cc.fadeIn(1))
                }, t.prototype.createPage2 = function () {
                    o._self.closePage();
                    var e = o._self._fishNode.getChildByName("_page1");
                    e.active = !0;
                    var t = o._self.getPTFrame();
                    t.setParent(o._self.node), t.name = o.PFB_ICON_NAME + "0", t.x += -250, t.y += 515;
                    var n = t.getComponent(u.default);
                    n.init("Fish_" + c.default.paddingZeroLeft("0", 2), o._self.getPayRealMoney("0")), n.setSpineScale(.6);
                    var i = o._self.getPTFrame();
                    i.setParent(o._self.node), i.name = o.PFB_ICON_NAME + "1", i.x += -250, i.y += t.y - 480;
                    var r = i.getComponent(u.default);
                    r.init("Fish_" + c.default.paddingZeroLeft("1", 2), o._self.getPayRealMoney("1")), r.setSpineScale(.6);
                    var a = o._self.getPTFrame();
                    a.setParent(o._self.node), a.name = o.PFB_ICON_NAME + "2", a.x += -250, a.y += i.y - 480;
                    var s = a.getComponent(u.default);
                    s.init("Fish_" + c.default.paddingZeroLeft("2", 2), o._self.getPayRealMoney("2")), s.setSpineScale(.6);
                    var l = e.getChildByName("_speedup"),
                        p = e.getChildByName("_lightning"),
                        h = e.getChildByName("_timepause");
                    l.active = !0, p.active = !0, h.active = !0, h.setPosition(cc.v2(160, t.y - 145)), p.setPosition(cc.v2(160, i.y - 140)), l.setPosition(cc.v2(160, a.y - 180)), e.runAction(cc.fadeIn(1))
                }, t.prototype.createPage3 = function () {
                    o._self.closePage();
                    var e = o._self._fishNode.getChildByName("_page1");
                    e.active = !0;
                    var t = o._self.getPTFrame();
                    t.setParent(o._self.node), t.name = o.PFB_ICON_NAME + "6", t.x += 0, t.y += 495;
                    var n = t.getComponent(u.default);
                    n.init("Fish_" + c.default.paddingZeroLeft("6", 2), o._self.getPayRealMoney("6")), n.setSpineScale(.6);
                    var i = o._self.getPTFrame();
                    i.setParent(o._self.node), i.name = o.PFB_ICON_NAME + "7", i.x += 0, i.y += t.y - 495 - 50;
                    var r = i.getComponent(u.default);
                    r.init("Fish_" + c.default.paddingZeroLeft("7", 2), o._self.getPayRealMoney("7")), r.setSpineScale(.6);
                    var a = o._self.getPTFrame();
                    a.setParent(o._self.node), a.name = o.PFB_ICON_NAME + "8", a.x += 0, a.y += i.y - 495;
                    var s = a.getComponent(u.default);
                    s.init("Fish_" + c.default.paddingZeroLeft("8", 2), o._self.getPayRealMoney("8")), s.setSpineScale(.6), e.runAction(cc.fadeIn(1))
                }, t.prototype.createPage4 = function () {
                    o._self.closePage();
                    var e = o._self._fishNode.getChildByName("_page1");
                    e.active = !0;
                    var t = o._self.getPTFrame();
                    t.setParent(o._self.node), t.name = o.PFB_ICON_NAME + "9", t.x += -200, t.y += 600;
                    var n = t.getComponent(u.default);
                    n.init("Fish_" + c.default.paddingZeroLeft("9", 2), o._self.getPayRealMoney("9")), n.setSpineScale(1);
                    var i = o._self.getPTFrame();
                    i.setParent(o._self.node), i.name = o.PFB_ICON_NAME + "10", i.x += -200, i.y += t.y - 380;
                    var r = i.getComponent(u.default);
                    r.init("Fish_" + c.default.paddingZeroLeft("10", 2), o._self.getPayRealMoney("10")), r.setSpineScale(1);
                    var a = o._self.getPTFrame();
                    a.setParent(o._self.node), a.name = o.PFB_ICON_NAME + "11", a.x += -200, a.y += i.y - 380;
                    var s = a.getComponent(u.default);
                    s.init("Fish_" + c.default.paddingZeroLeft("11", 2), o._self.getPayRealMoney("11")), s.setSpineScale(1);
                    var l = o._self.getPTFrame();
                    l.setParent(o._self.node), l.name = o.PFB_ICON_NAME + "12", l.x += -200, l.y += a.y - 380;
                    var p = l.getComponent(u.default);
                    p.init("Fish_" + c.default.paddingZeroLeft("12", 2), o._self.getPayRealMoney("12")), p.setSpineScale(1);
                    var h = o._self.getPTFrame();
                    h.setParent(o._self.node), h.name = o.PFB_ICON_NAME + "13", h.x += 205, h.y += 600;
                    var f = h.getComponent(u.default);
                    f.init("Fish_" + c.default.paddingZeroLeft("13", 2), o._self.getPayRealMoney("13")), f.setSpineScale(1);
                    var d = o._self.getPTFrame();
                    d.setParent(o._self.node), d.name = o.PFB_ICON_NAME + "14", d.x += 205, d.y += h.y - 380;
                    var _ = d.getComponent(u.default);
                    _.init("Fish_" + c.default.paddingZeroLeft("14", 2), o._self.getPayRealMoney("14")), _.setSpineScale(1);
                    var g = o._self.getPTFrame();
                    g.setParent(o._self.node), g.name = o.PFB_ICON_NAME + "15", g.x += 205, g.y += d.y - 380;
                    var y = g.getComponent(u.default);
                    y.init("Fish_" + c.default.paddingZeroLeft("15", 2), o._self.getPayRealMoney("15")), y.setSpineScale(1);
                    var m = o._self.getPTFrame();
                    m.setParent(o._self.node), m.name = o.PFB_ICON_NAME + "16", m.x += 205, m.y += g.y - 380;
                    var v = m.getComponent(u.default);
                    v.init("Fish_" + c.default.paddingZeroLeft("16", 2), o._self.getPayRealMoney("16")), v.setSpineScale(1), e.runAction(cc.fadeIn(1))
                }, t.prototype.createPage5 = function () {
                    o._self.closePage();
                    var e = o._self._fishNode.getChildByName("_page1");
                    e.active = !0;
                    var t = o._self.getPTFrame();
                    t.setParent(o._self.node), t.name = o.PFB_ICON_NAME + "17", t.x += -200, t.y += 600;
                    var n = t.getComponent(u.default);
                    n.init("Fish_" + c.default.paddingZeroLeft("17", 2), o._self.getPayRealMoney("17")), n.setSpineScale(1);
                    var i = o._self.getPTFrame();
                    i.setParent(o._self.node), i.name = o.PFB_ICON_NAME + "18", i.x += -200, i.y += t.y - 380;
                    var r = i.getComponent(u.default);
                    r.init("Fish_" + c.default.paddingZeroLeft("18", 2), o._self.getPayRealMoney("18")), r.setSpineScale(1);
                    var a = o._self.getPTFrame();
                    a.setParent(o._self.node), a.name = o.PFB_ICON_NAME + "19", a.x += -200, a.y += i.y - 380;
                    var s = a.getComponent(u.default);
                    s.init("Fish_" + c.default.paddingZeroLeft("19", 2), o._self.getPayRealMoney("19")), s.setSpineScale(1);
                    var l = o._self.getPTFrame();
                    l.setParent(o._self.node), l.name = o.PFB_ICON_NAME + "20", l.x += -200, l.y += a.y - 380;
                    var p = l.getComponent(u.default);
                    p.init("Fish_" + c.default.paddingZeroLeft("20", 2), o._self.getPayRealMoney("20")), p.setSpineScale(1);
                    var h = o._self.getPTFrame();
                    h.setParent(o._self.node), h.name = o.PFB_ICON_NAME + "21", h.x += 205, h.y += 600;
                    var f = h.getComponent(u.default);
                    f.init("Fish_" + c.default.paddingZeroLeft("21", 2), o._self.getPayRealMoney("21")), f.setSpineScale(1);
                    var d = o._self.getPTFrame();
                    d.setParent(o._self.node), d.name = o.PFB_ICON_NAME + "22", d.x += 205, d.y += h.y - 380;
                    var _ = d.getComponent(u.default);
                    _.init("Fish_" + c.default.paddingZeroLeft("22", 2), o._self.getPayRealMoney("22")), _.setSpineScale(1);
                    var g = o._self.getPTFrame();
                    g.setParent(o._self.node), g.name = o.PFB_ICON_NAME + "23", g.x += 205, g.y += d.y - 380;
                    var y = g.getComponent(u.default);
                    y.init("Fish_" + c.default.paddingZeroLeft("23", 2), o._self.getPayRealMoney("23")), y.setSpineScale(1);
                    var m = o._self.getPTFrame();
                    m.setParent(o._self.node), m.name = o.PFB_ICON_NAME + "24", m.x += 205, m.y += g.y - 380;
                    var v = m.getComponent(u.default);
                    v.init("Fish_" + c.default.paddingZeroLeft("24", 2), o._self.getPayRealMoney("24")), v.setSpineScale(1), e.runAction(cc.fadeIn(1))
                }, t._self = null, t.MAX_FISH_TYPE = 25, t.PFB_ICON_NAME = "fishicon", t = o = i([a], t)
            }(s.default);
        o.default = _, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper",
        "../../Utils/KAFishGameAssets": "KAFishGameAssets",
        "../../Utils/RealMoneyPlatform": "RealMoneyPlatform",
        "../../uikiller/Thor": "Thor",
        "../Business/AudioManage": "AudioManage",
        "../Model/NetConnector": "NetConnector",
        "../Model/PayTableViewStorage": "PayTableViewStorage",
        "../UI/PayTableFishFrame": "PayTableFishFrame"
    }],
    PlatformStorage: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "2648dwwmShIuoaGIHVcPfi2", "PlatformStorage");
        var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, function (e) {
                function t() {
                    return e !== null && e.apply(this, arguments) || this
                }
                var o;
                return n(t, e), o = t, Object.defineProperty(t.prototype, "helpSignalSender", {
                    get: function () {
                        return o._helpSignalSender
                    },
                    set: function (e) {
                        o._helpSignalSender = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "helpSignalSenderFinish", {
                    get: function () {
                        return o._helpSignalSenderFinish
                    },
                    set: function (e) {
                        o._helpSignalSenderFinish = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "doNavigateAction", {
                    get: function () {
                        return o._doNavigateAction
                    },
                    set: function (e) {
                        o._doNavigateAction = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), t._helpSignalSender = null, t._helpSignalSenderFinish = null, t._doNavigateAction = !1, t = o = i([a], t)
            }(cc.Component));
        o.default = s, cc._RF.pop()
    }, {}],
    PlayViewControl: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "019ddEszC9PqZMFn7DaxuVP", "PlayViewControl");
        var n = this && this.__extends || function () {
            var e = function (t, o) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                    })(t, o)
            };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("../uikiller/Thor")),
            c = e("../Components/Model/BusinessStorage"),
            l = e("../Components/Model/UserInfoStorage"),
            u = e("../Components/Model/NetConnector"),
            p = e("../Config/Config"),
            h = e("../Utils/CCHelper"),
            f = e("../Components/Model/TableSearchStorage"),
            d = e("../Utils/SeedRandom"),
            _ = e("../Components/UI/joystick/Joystick"),
            g = e("../Components/UI/Bullet"),
            y = e("../Components/UI/Fish"),
            m = e("../Components/UI/AnimationCoin"),
            v = e("../Components/UI/AnimationFire"),
            b = e("../Components/Business/AudioManage"),
            C = e("../Components/UI/AnimationFlash"),
            S = e("../Components/UI/AnimationPause"),
            P = e("../Components/Model/WalletStorage"),
            w = e("../Components/Model/PromptDialogStorage"),
            O = e("../Components/Model/PngStorage"),
            A = e("LanguageData"),
            R = e("../Utils/RealMoneyPlatform"),
            T = e("../Components/Model/PayTableViewStorage"),
            k = e("../Components/UI/AnimationBonus"),
            E = e("../Components/UI/AnimationOnlyCoin"),
            I = e("../Components/UI/RecallRow"),
            F = e("../Components/UI/AndroidAskFullScreen"),
            x = e("../Components/Business/StartSearchTableForPlayView"),
            B = e("../Components/UI/GunSight"),
            N = e("../Components/UI/CurrencyLabel"),
            M = e("../Components/UI/BossNotify"),
            L = e("../Components/UI/AnimationBingo"),
            j = e("../Components/UI/NoviceTeaching"),
            D = e("../Components/UI/AutoScollLayer"),
            U = e("../Components/UI/Aircraft"),
            H = e("../Components/UI/manager/AircraftManager"),
            G = e("../Components/UI/Boss"),
            W = e("../Components/UI/Enemy"),
            z = e("../Utils/KAFishGameAssets"),
            $ = e("../Components/UI/webViewGameRecall"),
            Q = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t._hideStarttime = 0, t._hideStacktime = 0, t._isHideDrop = !1, t._hideDrawCount = 0, t._businessStorage = null, t._userInfo = null, t._netConnector = null, t._tableSearchStorage = null, t._walletStorage = null, t._paytableStorage = null, t._ping = null, t._isShow = !1, t._isPending = !1, t._isCancelLock = !1, t._bulletConfig = {}, t._fishConfig = {}, t._bossConfig = {}, t._shootDelay = 0, t._spaceShootDelay = 0, t._ndEnemyPool = null, t._ndBulletPool = null, t._screenJoyStick = null, t._animationPause = null, t._bingoAnim = null, t._airCraiftManager = null, t._bossWarning = null, t._fishesNodeCacheMap = {}, t._bulletsNodeCacheMap = {}, t._btnQuitClick = !1, t._showcounter = !1, t._scrollbarPos = null, t._scrollState = !1, t._scrollAction = !1, t._frameRateTime = 0, t._tideStopFire = !1, t._isShake = !1, t
                }
                var o;
                return n(t, e), o = t, t.prototype.onLoad = function () {
                    var e = this;
                    o._instance = this;
                    var t = h.default.urlParse();
                    t && t.showfps ? this._showcounter = !0 : this._showcounter = !1, cc.director.getCollisionManager().enabled = !0, this._businessStorage = this.node.getComponent(c.default), this._userInfo = this.node.getComponent(l.default), this._netConnector = this.node.getComponent(u.default), this._tableSearchStorage = this.node.getComponent(f.default), this._walletStorage = this.node.getComponent(P.default), this._ping = this.node.getComponent(O.default), this._paytableStorage = this.node.getComponent(T.default), this._airCraiftManager = new H.default, this._airCraiftManager.init(this._$._ndTouchScreen), R.default.walletInfo = this.node.getComponent(P.default);
                    var n, i = this._$._ndJoyStick,
                        r = this._$._ndScreenCtrl,
                        a = new cc.Component.EventHandler;
                    (a.target = this.node, a.component = "PlayViewControl", a.handler = "onJoyStickMove", a.customEventData = "", i) && ((n = i.getComponent(_.Joystick)) && (n.moveEvents = [], n.moveEvents.push(a)));
                    r && ((n = r.getComponent(_.Joystick)) && (this._screenJoyStick = n, n.moveEvents = [], n.moveEvents.push(a)));
                    this._$._ndBulletPool && (this._ndBulletPool = this._$._ndBulletPool), this._$._ndEnemyContainer && (this._ndEnemyPool = this._$._ndEnemyContainer), h.default.loadResource("config/bullet.json", function (t) {
                        cc.log("load bullet config ", t), t.json ? e._bulletConfig = t.json : e._bulletConfig = t
                    }), h.default.loadResource("config/fish.json", function (t) {
                        cc.log("load fish config ", t), t.json ? e._fishConfig = t.json : e._fishConfig = t
                    }), h.default.loadResource("config/path.json", function (t) {
                        cc.log("load path config ", t), t.json ? e._pathConfig = t.json : e._pathConfig = t
                    }), h.default.loadResource("config/group.json", function (t) {
                        cc.log("load group config ", t), t.json ? e._groupConfig = t.json : e._groupConfig = t
                    }), h.default.loadResource("config/groupPath.json", function (t) {
                        cc.log("load groupPath config ", t), t.json ? e._groupPathConfig = t.json : e._groupPathConfig = t
                    }), h.default.loadResource("config/fishFlock.json", function (t) {
                        cc.log("load fishFlock config ", t), t.json ? e._flockConfig = t.json : e._flockConfig = t
                    }), h.default.loadResource("config/boss.json", function (t) {
                        cc.log("load boss config ", t), t.json ? e._bossConfig = t.json : e._bossConfig = t
                    }), c.default._playview = this, this._$._locktouchScreen.active = !1, this._showHideChildren(!1), this._initComponentevent()
                }, t.prototype._initComponentevent = function () {
                    var e = this;
                    this._$._btnAutoFire.getComponent(cc.Toggle).node.on(cc.Node.EventType.TOUCH_END, this._onBtnAutoFireTouchEnd, this, !0), this._$._btnLockTarget.getComponent(cc.Toggle).node.on(cc.Node.EventType.TOUCH_END, this._onBtnLockTargetTouchEnd, this, !0), this._$._btnSound.getComponent(cc.Toggle).node.on(cc.Node.EventType.TOUCH_END, this._onBtnAudioTouchEnd, this, !0), this._btnPaytable.on(cc.Node.EventType.TOUCH_END, this._onBtnPayTable, this, !0), this._scrollbar.getChildByName("_bg").on(cc.Node.EventType.TOUCH_END, this._onBtnScrolbarClick, this, !0), this._scrollbarPos = this._scrollbar.position, cc.log("device info = ", cc.sys.os);
                    var t = this._scrollbar.getChildByName("_btnlayout"),
                        o = h.default.urlParse(),
                        n = o.nf;
                    if (cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.OS_OSX) {
                        if (t) {
                            (s = t.getChildByName("_resize")).active = !1;
                            var i = t.getChildByName("_recall");
                            h.default.isFreePlay() ? i.active = !1 : (i.active = !0, i.on(cc.Node.EventType.TOUCH_END, this._onBtnRecallClick, this, !0));
                            var r = t.getChildByName("_btnQuit"),
                                a = t.getChildByName("_btnPromote");
                            o.l == "-2" || o.l == "-1" ? (r.active = !1, h.default.isShowReCommendGames() && (a.active = !0, a.on(cc.Node.EventType.TOUCH_END, this._onBtnRecommendGameClick, this, !0))) : r.on(cc.Node.EventType.TOUCH_END, this._onBtnQuitClick, this, !0)
                        }
                    } else if (t) {
                        var s = t.getChildByName("_resize");
                        n && n == 1 ? s.active = !1 : (s.active = !0, s.on(cc.Node.EventType.TOUCH_END, this._onBtnResizeClick, this, !0));
                        i = t.getChildByName("_recall");
                        h.default.isFreePlay() ? i.active = !1 : (i.active = !0, i.on(cc.Node.EventType.TOUCH_END, this._onBtnRecallClick, this, !0));
                        r = t.getChildByName("_btnQuit"), a = t.getChildByName("_btnPromote");
                        o.l == "-2" || o.l == "-1" ? (r.active = !1, h.default.isShowReCommendGames() && (a.active = !0, a.on(cc.Node.EventType.TOUCH_END, this._onBtnRecommendGameClick, this, !0))) : r.on(cc.Node.EventType.TOUCH_END, this._onBtnQuitClick, this, !0)
                    }
                    if (cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._systemKeyBoardHandle, this), cc.game.on(cc.game.EVENT_SHOW, function (t) {
                        e._netConnector.socketConnector ? (e._hideStarttime = 0, e._hideStacktime = 0, e._isHideDrop = !1, e._hideDrawCount = 0) : window.location.href = "";
                        var o = e._$._btnSound.getComponent(cc.Toggle);
                        o.isChecked && o.uncheck(), b.default.getInstance().disableMusic(!1), b.default.getInstance().disableEffect(!1), cc.log("emit cc.game.EVENT_SHOW!")
                    }), cc.game.on(cc.game.EVENT_HIDE, function (t) {
                        e._hideStarttime = (new Date).getTime(), b.default.getInstance().disableMusic(!0), b.default.getInstance().disableEffect(!0), cc.log("emit cc.game.EVENT_HIDE!")
                    }), h.default.isAutoSearchTable()) {
                        c = t.getChildByName("_changeroomlevel"), l = this._$._selectRoomLevel.getChildByName("_closebtn"), u = this._$._selectRoomLevel.getChildByName("_roomoption");
                        c.active = !1, u.active = !1, l.active = !1
                    } else {
                        var c, l;
                        (c = t.getChildByName("_changeroomlevel")).on(cc.Node.EventType.TOUCH_END, function (e) {
                            this._businessStorage.lockTarget = !1, this._businessStorage.lockTargetId = null, this._businessStorage.lockFishType = "", this._$._lockboard.active = !1, this._$._locktouchScreen.off(cc.Node.EventType.TOUCH_END, this), this._$._locktouchScreen.active = !1, this._businessStorage.autoFire = !1, this._closeLockTarget(), this._closeAutoFire(!1), this._$._selectRoomLevel.active = !0
                        }, this, !0), (l = this._$._selectRoomLevel.getChildByName("_closebtn")).on(cc.Node.EventType.TOUCH_END, function (e) {
                            this._$._selectRoomLevel.active = !1
                        }, this, !0);
                        for (var u = this._$._selectRoomLevel.getChildByName("_roomoption"), f = 0; f < p.default.consts.MAX_ROOM; f++) {
                            var d = u.getChildByName("_room" + f);
                            d.getComponent(x.default).init(this._onChangeRoomLevelClickfunction, this._userInfo.roomlevelCost, f);
                            var _ = h.default.getMyCannonCostList(this._userInfo.roomlevelCost, f),
                                g = cc.instantiate(z.default.getPrefab("CurrencyLabel")),
                                y = g.getComponent(N.default);
                            g.setParent(d), g.name = "room_currency_" + f, y.init(_[0].cy, R.default.numberFormat(_[0].rmp), R.default.numberFormat(_[_.length - 1].rmp)), y.setSeparate("-")
                        }
                        h.default.checkAndSetFrameScale(this._$._selectRoomLevel)
                    }
                    this._$._ndGunsight.getComponent(B.default).init(), this._bingoAnim = cc.instantiate(z.default.getPrefab("animBingo")), this._bingoAnim.active = !1, this._bossWarning = cc.instantiate(z.default.getPrefab("BossWarning")), this._bossWarning.setParent(this._$._ndScreenCtrl), this._bossWarning.setPosition(cc.v2(0, 900)), this._bossWarning.active = !1
                }, t.prototype._initPauseAnimNode = function () {
                    var e = cc.instantiate(z.default.getPrefab("animPause"));
                    this._animationPause = e.getComponent(S.default), e.setParent(this._$._ndFishpond)
                }, t.prototype._onChangeRoomLevelClickfunction = function (e) {
                    if (c.default._playview._netConnector.socketConnector) {
                        if (c.default._playview._bingoAnim && c.default._playview._bingoAnim.active == 1) {
                            var t = c.default._playview._bingoAnim.getComponent(L.default);
                            t && t.stop()
                        }
                        var o = e.target.getComponent(x.default),
                            n = c.default._playview;
                        c.default._playview._netConnector.socketConnector.request(p.default.pomeloRoute.leaveTable, u.default.makeWsPacket({}), function (e) {
                            if (cc.log("leaveTable res:", e), !e || e.err) { cc.log("leaveTable error ", e); }
                            else {
                                for (n._businessStorage.pingIntervalId && (clearInterval(n._businessStorage.pingIntervalId), n._businessStorage.pingIntervalId = null), n._businessStorage.syncPosIntervalId && (clearInterval(n._businessStorage.syncPosIntervalId), n._businessStorage.syncPosIntervalId = null), b.default.getInstance().onDestroy(); n._ndEnemyPool.childrenCount > 0;) { z.default.recyclePrefab(n._ndEnemyPool.children[0], "Enemy"); }
                                for (; n._ndBulletPool.childrenCount > 0;) {
                                    n._ndBulletPool.children[0].getComponent(g.default) && z.default.recyclePrefab(n._ndBulletPool.children[0], "bullet")
                                }
                                n._animationPause && n._animationPause.stop(), n._fishesNodeCacheMap = {}, n._bulletsNodeCacheMap = {}, n._businessStorage.popFishes(), n._businessStorage.popBosses(), n._businessStorage.popBullet(), n._businessStorage.popBossSoldier(), n._airCraiftManager.leave(n._userInfo.playerId);
                                var t = {};
                                t[o.searchParams[0].key] = parseInt(o.searchParams[0].value), n._businessStorage.startGame = !1, n._tableSearchStorage.searchParams = t, n._tableSearchStorage.startSearch = !0, n._tableSearchStorage.doSearching = !0, n._tableSearchStorage.changeRoom = !0, n._onBtnScrolbarClick(null)
                            }
                        })
                    }
                }, t.prototype._onBtnQuitClick = function (e) {
                    b.default.getInstance().playBtnEffect(), this._isCancelLock = !0, this._businessStorage.lockTarget = !1, this._businessStorage.lockTargetId = null, this._businessStorage.lockFishType = "", this._$._locktouchScreen.off(cc.Node.EventType.TOUCH_END, this), this._$._locktouchScreen.active = !1, this._$._lockboard.active = !1, this._closeLockTarget(), this._closeAutoFire(!1), this._businessStorage.autoFire = !1, h.default.urlParse().l != "-1" && w.default.showAskLogOut(), e.target.runAction(cc.sequence(cc.scaleTo(.05, .9), cc.scaleTo(.05, 1)))
                }, t.prototype._onBtnRecommendGameClick = function (e) {
                    b.default.getInstance().playBtnEffect(), this._isCancelLock = !0, this._businessStorage.lockTarget = !1, this._businessStorage.lockTargetId = null, this._businessStorage.lockFishType = "", this._$._locktouchScreen.off(cc.Node.EventType.TOUCH_END, this), this._$._locktouchScreen.active = !1, this._$._lockboard.active = !1, this._closeLockTarget(), this._closeAutoFire(!1), this._businessStorage.autoFire = !1, h.default.isShowReCommendGames() && w.default.showRecommendGame(), e.target.runAction(cc.sequence(cc.scaleTo(.05, .9), cc.scaleTo(.05, 1)))
                }, t.prototype._onBtnScrolbarClick = function (e) {
                    var t = this;
                    if (!this._scrollAction) {
                        this.closeNoviceTeaching();
                        for (var o = 0, n = (this._scrollbar.position, this._scrollbar.getChildByName("_btnlayout")), i = this._scrollbar.getChildByName("_bg").getChildByName("_arrow"), r = n.children, a = 0; a < r.length; a++) { o += r[a].active ? 1 : 0; }
                        this._scrollAction = !0, this._scrollState ? this._scrollbar.runAction(cc.sequence(cc.moveTo(.2, cc.v2(this._scrollbarPos.x, this._scrollbarPos.y)), cc.callFunc(function () {
                            t._scrollAction = !1, t._scrollState = !1, i.getComponent(cc.Sprite).spriteFrame = z.default.getSpriteFrame("uiAtlas", "board_out")
                        }))) : this._scrollbar.runAction(cc.sequence(cc.moveTo(.2, cc.v2(this._scrollbarPos.x + 147 * o + 10, this._scrollbarPos.y)), cc.callFunc(function () {
                            t._scrollAction = !1, t._scrollState = !0, i.getComponent(cc.Sprite).spriteFrame = z.default.getSpriteFrame("uiAtlas", "board_in")
                        }))), b.default.getInstance().playBtnEffect()
                    }
                }, t.prototype._onBtnResizeClick = function (e) {
                    b.default.getInstance().playBtnEffect(), cc.screen.requestFullScreen(), cc.screen.fullScreen ? cc.screen.exitFullScreen() : cc.screen.requestFullScreen(), b.default.getInstance().playBtnEffect()
                }, t.prototype._onBtnRecallClick = function (e) {
                    var t = this;
                    if (b.default.getInstance().playBtnEffect(), this._netConnector.socketConnector) {
                        var o = this;
                        this._netConnector.socketConnector.request(p.default.pomeloRoute.gameRecall, u.default.makeWsPacket({}), function (e) {
                            cc.log("recall res:", e), !e || e.err ? cc.log("gameRecall error ", e) : (t._businessStorage.recallQueue = e.msg.records, t._businessStorage.recallCallBack = o.getRecallUrl, t._businessStorage.showRecall = !0)
                        })
                    }
                }, t.prototype._onBtnPayTable = function (e) {
                    var t = this;
                    e.target.runAction(cc.sequence(cc.scaleTo(.05, .8), cc.scaleTo(.05, 1))), this.closeNoviceTeaching(), this._netConnector.socketConnector && !this._paytableStorage.isOpen && (this._paytableStorage.payData = null, this._paytableStorage.isOpen = !this._paytableStorage.isOpen, this._netConnector.socketConnector.request(p.default.pomeloRoute.fetchFishInfo, u.default.makeWsPacket({}), function (e) {
                        !e || e.err ? t._paytableStorage.isOpen = !1 : e.code == 200 ? (t._paytableStorage.payData = e.data, t._paytableStorage.pageIdx = 1, b.default.getInstance().playPayTablePopUp()) : t._paytableStorage.isOpen = !1
                    }))
                }, t.prototype.getRecallUrl = function (e) {
                    var t = e.target.getComponent(I.default);
                    if (t) {
                        var o = h.default.urlParse(),
                            n = t.getTransactionId();
                        if (c.default._playview._netConnector.socketConnector) {
                            c.default._playview;
                            c.default._playview._netConnector.socketConnector.request(p.default.pomeloRoute.gameRecallUrl, u.default.makeWsPacket({
                                tid: n
                            }), function (e) {
                                !e || e.err ? cc.log("gameRecallURL error ", e) : $.default.getInstance().disPatchEvent($.default.EVENT_OPEN, e.msg.url + "&loc=" + o.loc)
                            })
                        }
                    }
                }, t.prototype._disConnet = function () {
                    this._netConnector.socketConnector.disconnect(), this._netConnector.socketConnector = null, cc.log("emit cc.game.EVENT_HIDE! socketConnector close!")
                }, t.prototype._onHideUpdate = function (e) {
                    var t = this;
                    Object.keys(this._fishesNodeCacheMap).forEach(function (o) {
                        var n = t._fishesNodeCacheMap[o].getComponent(y.default);
                        n && n.update(e)
                    }), Object.keys(this._bulletsNodeCacheMap).forEach(function (o) {
                        var n = t._bulletsNodeCacheMap[o].getComponent(g.default);
                        n && n.update(e)
                    }), this.update(e)
                }, t.prototype._onHideStackTime = function (e) {
                    this._hideStacktime += e, this._hideStacktime > o.HIDE_WAIT_TIME && (this._disConnet(), c.default._playview = null)
                }, t.prototype._systemKeyBoardHandle = function (e) {
                    if (!w.default.isShow()) {
                        if (e.keyCode == cc.macro.KEY.space) {
                            if (this._businessStorage.autoFire || this._businessStorage.lockTarget) { return; }
                            var t = (new Date).getTime(),
                                o = this._airCraiftManager.getAirCraft(this._userInfo.playerId).getComponent(U.default).hasSpeedUpAura() ? p.default.consts.SPACE_SHOOT_DELAY / 2 : p.default.consts.SPACE_SHOOT_DELAY;
                            if (t - this._spaceShootDelay < o) { return; }
                            this._sendFireRequest(), this._spaceShootDelay = t
                        } else { e.keyCode == cc.macro.KEY.left || e.keyCode == 37 ? this._updateAirCraftMove(-100, 0) : e.keyCode == cc.macro.KEY.right || e.keyCode == 39 ? this._updateAirCraftMove(100, 0) : e.keyCode == cc.macro.KEY.up || e.keyCode == 38 ? this._updateAirCraftMove(0, 100) : e.keyCode == cc.macro.KEY.down || e.keyCode == 40 ? this._updateAirCraftMove(0, -100) : e.keyCode == cc.macro.KEY["-"] || e.keyCode == 189 ? this._sendCannonUpdateRequest(!1) : e.keyCode != cc.macro.KEY["+"] && e.keyCode != 187 || this._sendCannonUpdateRequest(!0) }
                    }
                }, t.prototype._updateAirCraftMove = function (e, t) {
                    if (this._businessStorage && !this._businessStorage.lockTarget) {
                        var o = this._airCraiftManager.getData(this._userInfo.playerId);
                        if (o && o.state == H.default.STATE_REDAY) {
                            var n = o.aircraft;
                            if (n) { n.getComponent(U.default).setAirCraftPos(cc.v2(n.x + e, n.y + t)) }
                        }
                    }
                }, t.prototype._getAnimFlashNodeIns = function () {
                    var e = cc.instantiate(z.default.getPrefab("animFlash"));
                    return e.getComponent(C.default).init(function (e) {
                        z.default.recyclePrefab(e, "animFlash")
                    }), e
                }, t.prototype._getAnimOnlyCoinIns = function () {
                    var e = cc.instantiate(z.default.getPrefab("animOnlyCoin"));
                    return e.getComponent(E.default).init(function (e) {
                        z.default.recyclePrefab(e, "animOnlyCoin")
                    }), e
                }, t.prototype._getAnimBonusIns = function () {
                    var e = cc.instantiate(z.default.getPrefab("animBonus"));
                    return e.getComponent(k.default).init(function (e) {
                        z.default.recyclePrefab(e, "animBonus")
                    }), e
                }, t.prototype._getAnimCoinIns = function () {
                    var e = cc.instantiate(z.default.getPrefab("animCoin"));
                    return e.getComponent(m.default).init(function (e) {
                        z.default.recyclePrefab(e, "animCoin")
                    }), e
                }, t.prototype._getGunFireAnimIns = function () {
                    return cc.instantiate(z.default.getPrefab("animGunFire"))
                }, t.prototype._getBulletIns = function () {
                    return cc.instantiate(z.default.getPrefab("bullet"))
                }, t.prototype._getEnemyIns = function () {
                    return cc.instantiate(z.default.getPrefab("Enemy"))
                }, t.prototype._insertFishNodeCacheMap = function (e, t) {
                    this._removeFishNodeCacheMap(e), this._fishesNodeCacheMap[e] = t
                }, t.prototype._removeFishNodeCacheMap = function (e) {
                    this._fishesNodeCacheMap[e] && delete this._fishesNodeCacheMap[e]
                }, t.prototype._getFishNodeCacheMap = function (e) {
                    return this._fishesNodeCacheMap[e ? e.toString() : e]
                }, t.prototype._findTargetFish = function () {
                    if (this._businessStorage && this._businessStorage.lockTarget && this._businessStorage.lockFishType) {
                        for (var e in this._fishesNodeCacheMap) {
                            var t = this._fishesNodeCacheMap[e];
                            if (this._fishesNodeCacheMap[e].getFishType() == this._businessStorage.lockFishType) {
                                if (!t.isOnStage()) { continue; }
                                if (!t.node.getParent()) { continue; }
                                return t
                            }
                        }
                    }
                    return null
                }, t.prototype._insertBulletNodeCacheMap = function (e, t) {
                    this._bulletsNodeCacheMap[e] = t
                }, t.prototype._removeBulletNodeCacheMap = function (e) {
                    this._bulletsNodeCacheMap[e] && delete this._bulletsNodeCacheMap[e]
                }, t.prototype._getBulletNodeCacheMap = function (e) {
                    return this._bulletsNodeCacheMap[e]
                }, t.prototype._adjustScreenJoyStick = function (e) {
                    if (e) {
                        var t = this._$._ndScreenCtrl,
                            o = e.getParent().convertToWorldSpaceAR(e.position);
                        o = t.convertToNodeSpaceAR(o), t.bg.position = o
                    }
                }, t.prototype._adjustCannonShiftBtns = function (e) {
                    if (e) {
                        var t = this._$._ndShift;
                        if (!t) { return; }
                        var o = e.position,
                            n = e.getParent().convertToWorldSpaceAR(cc.v2(o.x, o.y - 90));
                        n = t.getParent().convertToNodeSpaceAR(n), t.position = n, t.active = !0
                    }
                }, t.prototype._getSelfChairId = function () {
                    if (this._userInfo) {
                        for (var e = this._businessStorage.tableInfo.chairIds, t = 0; t < e.length; t++) { if (e[t] == this._userInfo.playerId) { return t; } }
                    }
                    return -1
                }, t.prototype.onJoyStickMove = function (e) {
                    if (this._businessStorage.startGame) {
                        if (!e.wPos || !this._airCraiftManager.isExists(this._userInfo.playerId)) { return; }
                        var t = this._airCraiftManager.getData(this._userInfo.playerId);
                        if (t.state != H.default.STATE_REDAY) { return; }
                        if (this._airCraiftManager.setStartSyncPos(!0), !this._businessStorage.lockTarget) {
                            var o = t.aircraft.getComponent(U.default);
                            o && o.setMovePosition(e.wPos)
                        }
                    }
                    this._businessStorage && (this._businessStorage.joyStickState.direction = e.newDir, this._businessStorage.joyStickState.angle = e.angle)
                }, t.prototype.fireHandle = function (e, t) {

                    if (this._tableSearchStorage.tableInfo && this._businessStorage.startGame && (this._businessStorage.joyStickState.direction != _.Direction.IDLE || this._businessStorage.autoFire)) {
                        this._spaceShootDelay = (new Date).getTime();
                        var o = this._airCraiftManager.getAirCraft(this._userInfo.playerId).getComponent(U.default);
                        this._spaceShootDelay - this._shootDelay < (o.hasSpeedUpAura() ? p.default.consts.SPACE_SHOOT_DELAY / 2 : p.default.consts.SPACE_SHOOT_DELAY) || (this._shootDelay = this._spaceShootDelay, this._sendFireRequest())
                    }
                }, t.prototype._sendFireRequest = function () {
                    var e = this;
                    console.log('x')
                    if (p.default.mock) {
                        var t = {
                            chairId: this._getSelfChairId(),
                            angle: this._businessStorage.joyStickState.angle,
                            lockTargetId: this._businessStorage.lockTargetId
                        };
                        p.default.mockNetEvent.emit(p.default.pomeloPushRoute.onFire, {
                            msg: t
                        }), cc.log("mock sendFireRequest ", t)
                    } else {
                        if (w.default.isShow()) { return; }
                        if (this._$._bossNofity.active) { return; }
                        if (this._tideStopFire && this._businessStorage.lockTarget) { return; }
                        this.closeNoviceTeaching();
                        for (var o = null, n = this._businessStorage.areaPlayers, i = 0; i < n.length; i++) {
                            if (this._userInfo.playerId == n[i].playerId) {
                                o = n[i];
                                break
                            }
                        } if (!o) { return; }
                        if (this._netConnector.socketConnector) {
                            var r = this;
                            this._netConnector.socketConnector.request(p.default.pomeloRoute.onFire, u.default.makeWsPacket({
                                angle: this._businessStorage.joyStickState.angle,
                                lockId: this._businessStorage.lockTargetId,
                                cannonlevel: o.cannonLevel
                            }), function (t) {
                                if (!t || t.err) { cc.log("onFire error ", t), e._businessStorage.autoFire = !1, e._closeAutoFire(!1); }
                                else if (t.code == 200) {
                                    if (e._ping.updateDelayTime(), t.data) {
                                        b.default.getInstance().playGunFire(t.data.cannonskin);
                                        var o = R.default.getRealMoney(R.default.convertCentsToCredits(t.data.balance));
                                        e._userInfo.gold = o.rmp
                                    }
                                } else {
                                    if (t.code != 200 && t.code != 217 && t.code != 216) { return void w.default.showMsg(t.code); }
                                    if (t.code == 216) { (n = r._$._btnLockTarget.getComponent(cc.Toggle)) && n.uncheck(), e._businessStorage.lockTarget = !1, e._businessStorage.lockTargetId = null, e._businessStorage.lockFishType = "", e._$._locktouchScreen.off(cc.Node.EventType.TOUCH_END, e), e._$._locktouchScreen.active = !1, e._businessStorage.autoFire = !1, e._closeAutoFire(!1), e._closeLockTarget(), w.default.showMsg(t.code.toString()); }
                                    if (t.code == 217) { e._shootDelay = -.9; }
                                    else {
                                        if (e._businessStorage.Robot) { return; }
                                        var n;
                                        e._businessStorage.autoFire = !1, (n = e._$._btnAutoFire.getComponent(cc.Toggle)) && n.uncheck()
                                    }
                                }
                            })
                        }
                    }
                }, t.prototype.spawnBullet = function (e) {
                    var t = this;
                    if (this._ndBulletPool && this._businessStorage && !(this._businessStorage.bulletQueueLen() <= 0)) {
                        var o = this._businessStorage.popBullet();
                        this._getSelfChairId() > 1 && 2;
                        for (var n, i, r, a = function () {
                            var e = o.chairId,
                                a = o.playerId == s._userInfo.playerId;
                            if (e < 0) {
                                return {
                                    value: void 0
                                };
                            }
                            if (s._$._bossNofity.active) {
                                return {
                                    value: void 0
                                };
                            }
                            var c = "bullet_" + (e + 1),
                                l = 150,
                                u = s._bulletConfig[c].small;
                            o.cannonskin == 2 ? (l = 150, u = s._bulletConfig[c].mid) : o.cannonskin == 3 && (l = 145, u = s._bulletConfig[c].big);
                            var p = s._getBulletIns(),
                                h = p.getComponent(g.default);
                            if (!h) {
                                return cc.log("spawnBullet component not find"), {
                                    value: void 0
                                };
                            }
                            if (!(n = s._airCraiftManager.getAirCraft(o.playerId))) {
                                return {
                                    value: void 0
                                };
                            }
                            if (!(i = n.getComponent(U.default))) {
                                return {
                                    value: void 0
                                };
                            }
                            var f = s._$._ndTouchScreen.convertToWorldSpaceAR(n.position);
                            f = s._ndBulletPool.convertToNodeSpaceAR(f), o.cannonskin == 2 ? f.y += 150 : o.cannonskin == 3 ? f.y += 150 : f.y += 40, h.setFrameRate(s._frameRateTime), h.init(o.bulletId, f, 90, g.default.BULLET_DEFAULT_SPEED, u, o.lockTargetId, o.cannonskin, a, i.isMasterPlayer(), function (e) {
                                t._removeBulletNodeCacheMap(h.getId()), z.default.recyclePrefab(e, "bullet")
                            }, function (e) {
                                t._businessStorage && t._businessStorage.pushCollider({
                                    bid: e.bullet.tag,
                                    fid: e.fish.tag
                                })
                            }), r = s._getGunFireAnimIns(), n.addChild(r, -1, "gunfire");
                            var d = r.getComponent(v.default);
                            d.init(u, cc.v2(0, l), function (e) {
                                z.default.recyclePrefab(e, "animGunFire")
                            }), d.playAnimation(), b.default.getInstance().playCastEffect(), s._insertBulletNodeCacheMap(o.bulletId, h), s._ndBulletPool.addChild(p, i.isMasterPlayer() ? 100 : 10), o = s._businessStorage.popBullet()
                        }, s = this; o;) {
                            var c = a();
                            if (typeof c === "object") { return c.value }
                        }
                    }
                }, t.prototype.spawnBoss = function (e) {
                    if (this._businessStorage && this._businessStorage.startGame) {
                        var t = this._businessStorage.popBosses();
                        if (t.length != 0) {
                            for (var o = 0; o < t.length; o++) {
                                var n = t[o].bossId,
                                    i = cc.instantiate(z.default.getPrefab("Boss"));
                                this._ndEnemyPool.addChild(i, 999, "boss");
                                var r = i.getComponent("Boss");
                                if (!r) { return void cc.log("spawnBoss component not find"); }
                                r.init(n, t[o], function (e) {
                                    z.default.recyclePrefab(e, "Boss")
                                });
                                for (var a = r.getIds(), s = 0; s < a.length; s++) { this._insertFishNodeCacheMap(a[s], r); }
                                r.runShowTime()
                            }
                        }
                    }
                }, t.prototype.spawnBossSoldier = function (e) {
                    var t = this;
                    if (this._businessStorage && this._businessStorage.startGame && !this._$._bossNofity.active && this._businessStorage.isPushBossSoldier(e)) {
                        var o = this._ndEnemyPool.getChildByName("boss"),
                            n = null;
                        o && (n = o.getComponent("Boss"));
                        var i = this._businessStorage.nowBossName,
                            r = this._businessStorage.shiftBossSoldierQueue();
                        for (var a in r.data) {
                            for (var s = r.data[a], c = 0; c < s.length; c++) {
                                var l = s[c],
                                    u = this._bossConfig[i].soldier[a],
                                    p = this._getEnemyIns(),
                                    h = p.getComponent(W.default);
                                if (!h) { return void cc.log("spawnBossSoldier component not find"); }
                                h.init(l, cc.v2(0, 0), !1, null, !0, function (e) {
                                    var o = e.getComponent(W.default);
                                    t._removeFishNodeCacheMap(o.getId()), z.default.recyclePrefab(e, "Enemy")
                                }), h.setDelaySpawnCallback(function () {
                                    n && b.default.getInstance().playBossSoldierSpawn(i)
                                }), h.setDelay(u.fristdelay + c * u.interval), h.setRate(u.speed), h.setFishContainer(this._ndEnemyPool), p.setParent(this._ndEnemyPool), this._insertFishNodeCacheMap(l.id, h)
                            }
                        }
                    }
                }, t.prototype.spawnEnemy = function (e) {
                    var t = this;
                    if (this._ndEnemyPool) {
                        var o = this._businessStorage.popFishes();
                        if (this._businessStorage && !(o.length <= 0)) {
                            for (var n = !1, i = 0; i < o.length; i++) {
                                var r = o[i];
                                if (r.type == "Fish_03" || r.type == "Fish_04" || r.type == "Fish_05") { return void cc.log("miss enemy :", r.type); }
                                if (r.state == p.default.consts.SOLO || r.state == p.default.consts.FREEZE || r.state == p.default.consts.SPEEDUP) {
                                    if (!(s = (a = this._getEnemyIns()).getComponent("Enemy"))) { return void cc.log("spawnEnemy component not find"); }
                                    s.init(r, cc.v2(0, 0), !1, null, !1, function (e) {
                                        var o = e.getComponent(W.default);
                                        t._removeFishNodeCacheMap(o.getId()), z.default.recyclePrefab(e, "Enemy")
                                    }), s.setFishContainer(this._ndEnemyPool), a.setParent(this._ndEnemyPool), this._insertFishNodeCacheMap(r.id, s), r.state == p.default.consts.FREEZE ? n || (b.default.getInstance().playFreezeBomEnter(), n = !0) : r.state == p.default.consts.SPEEDUP && (n || (b.default.getInstance().playTurboEnter(), n = !0))
                                } else if (r.state == p.default.consts.BOMB) {
                                    if (!(s = (a = this._getEnemyIns()).getComponent(W.default))) { return; }
                                    s.init(r, cc.v2(0, 0), !1, null, !1, function (e) {
                                        var o = e.getComponent(W.default);
                                        t._removeFishNodeCacheMap(o.getId()), z.default.recyclePrefab(e, "Enemy")
                                    }), s.setFishContainer(this._ndEnemyPool), a.setParent(this._ndEnemyPool), this._insertFishNodeCacheMap(r.id, s), n || (b.default.getInstance().playLightningEnter(), n = !0)
                                } else if (r.state == p.default.consts.FLOCK) {
                                    var a, s, c = r.path.split("|");
                                    if (c.length != 2) { continue; }
                                    for (var l = c[0], u = z.default.getConfig("flock")[l], h = Object.keys(u), f = [], d = 0; d < h.length; d++) { for (var _ = 0; _ < u[h[d]].anim.repeat; _++) { f = f.concat(u[h[d]].points); } }
                                    if (!(s = (a = this._getEnemyIns()).getComponent("Enemy"))) { return; }
                                    s.init(r, f[r.index], !1, null, !1, function (e) {
                                        var o = e.getComponent(W.default);
                                        t._removeFishNodeCacheMap(o.getId()), z.default.recyclePrefab(e, "Enemy")
                                    }), s.setFishContainer(this._ndEnemyPool), a.setParent(this._ndEnemyPool), this._insertFishNodeCacheMap(r.id, s)
                                }
                            }
                        }
                    }
                }, t.prototype.onColliderHandle = function (e) {
                    if (this._businessStorage && !(this._businessStorage.colliderQueueLen() <= 0)) {
                        for (var t = this._businessStorage.popAllCollider(), o = 0, n = 0; n < t.length; n++) {
                            var i = this._getBulletNodeCacheMap(t[n].bid);
                            if (i) {
                                var r = i;
                                t[n].success && r && r.doBomb(), o = r.getBulletType()
                            }
                        }
                        for (var a = null, s = this._businessStorage.areaPlayers, c = 0; c < s.length; c++) {
                            if (this._userInfo.playerId == s[c].playerId) {
                                a = s[c];
                                break
                            }
                        } if (a) {
                            var l = [];
                            for (c = 0; c < t.length; c++) { g.default.isUniqueBulletId(t[c]) ? (t[c].creditBet = this._userInfo.rmpcannonCost[a.cannonLevel], t[c].denom = R.default.walletInfo.currentDenomination, t[c].currency = h.default.getUrlParam("cr"), l.push(t[c])) : cc.log("Duplcate bullet Id", t[c].bid, l); }
                            b.default.getInstance().playHit(o), this._netConnector && this._netConnector.socketConnector && this._netConnector.socketConnector.request(p.default.pomeloRoute.onCollider, u.default.makeWsPacket(l), null)
                        }
                    }
                }, t.prototype.onColliderResultHandle = function (e) {
                    if (this._businessStorage && !(this._businessStorage.colliderResultQueueLen() <= 0)) {
                        for (var t = this._businessStorage.popAllColliderResult(), o = 0; o < t.length; o++) {
                            if (this._$._bossNofity.active) { return; }
                            for (var n = t[o].result, i = 0; i < n.length; i++) {
                                for (var r = 0; r < n[i].diefids.length; r++) {
                                    n[i].playerId = t[o].player.id;
                                    var a = this._getFishNodeCacheMap(n[i].diefids[r]);
                                    if (a instanceof W.default) {
                                        if ((l = a) && l.node && l.node.getParent()) {
                                            if (n[i].winscore[r] && this._playScreenGoldAnim(l.node.getParent().convertToWorldSpaceAR(l.node.position), n[i].fishscore[r], n[i].ftypes, n[i].playerId, n[i].score, n[i].cannonlevel), l.doDie(), l.getFishType() <= "Fish_08" && l.getFishType() >= "Fish_06") { this._playHitEffect(l, n[i].playerId, 8, !0), b.default.getInstance().playBingo(), this.runShake(30); }
                                            else {
                                                var s = z.default.getConfig("fish")[l.getFishType()];
                                                if (s.effect && s.effect.type == p.default.consts.SPEEDUP) {
                                                    var c = this._airCraiftManager.getAirCraft(n[i].playerId);
                                                    if (c) { c.getComponent(U.default).playSpeedUpAura(s) }
                                                }
                                                if (n[i].pause && n[i].pause.length > 0) { continue; }
                                                if (n[i].typeBombs && n[i].typeBombs.length > 0) { continue; }
                                                this._playHitEffect(l, n[i].playerId, l.hasLuckyAura() ? 4 : 2, !!l.hasLuckyAura()), l.getFishType() <= "Fish_02" && l.getFishType() >= "Fish_00" ? this.runShake(30) : this.runShake(4)
                                            }
                                        }
                                    } else if (a instanceof G.default) {
                                        var l;
                                        if ((l = a) && l.node && l.node.getParent()) {
                                            n[i].winscore[r] && this._playScreenGoldAnim(l.node.getParent().convertToWorldSpaceAR(l.node.position), n[i].fishscore[r], n[i].ftypes, n[i].playerId, n[i].score, n[i].cannonlevel);
                                            var u = l.removeOneIds();
                                            this._removeFishNodeCacheMap(u), l.getIds().length <= 0 ? (l.runToDie(), this._businessStorage.lockTargetId = null) : this._businessStorage.lockTargetId == u && (this._businessStorage.lockTargetId = l.getId()), this._playHitEffect(l, n[i].playerId, 8, !0), this.runShake(30)
                                        }
                                    } else if (!a) { return void cc.log("no fish cache ", n[i].diefids[r]) }
                                }
                                if (n[i].typeBombs && n[i].typeBombs.length > 0 && (b.default.getInstance().playLightning(), this._playTypeBombAnim(n[i].typeBombs, n[i].playerId), this.runShake(60)), n[i].pause && n[i].pause.length > 0) {
                                    if (!n[i].pauseTime || n[i].pauseTime == 0) { return; }
                                    b.default.getInstance().playFreezeBomb(), this._pauseScreenFish(n[i].pauseTime), this.runShake(60)
                                }
                            }
                        }
                    }
                }, t.prototype._playHitEffect = function (e, t, o, n) {
                    var i = this._airCraiftManager.getData(t);
                    if (i) {
                        var r = this._getAnimBonusIns();
                        r.setParent(this._$._ndCoinPool);
                        var a = e.node.getParent().convertToWorldSpaceAR(e.node.position);
                        if (r) {
                            var s = r.getComponent(k.default);
                            s && (n ? s.playBigHitEffect(a, e) : s.playHitEffect(a, e))
                        }
                        for (var c = 0; c < o; c++) {
                            var l = this._getAnimOnlyCoinIns();
                            l.setParent(this._$._ndCoinPool);
                            var u = l.getComponent(E.default);
                            u.playAnimation(a), u.jumpAndFlyToMoveTarget(i.aircraft, c)
                        }
                    }
                }, t.prototype._playTypeBombAnim = function (e, t) {
                    var o = this;
                    if (e.length != 0) {
                        var n = this._airCraiftManager.getAirCraft(t);
                        if (n) {
                            var i = n.getParent().convertToWorldSpaceAR(n.position);
                            if (!n.getParent()) { return; }
                            for (var r = 1; r < e.length; r++) {
                                var a = this._getFishNodeCacheMap(e[r]);
                                if (a && a.node.getParent()) {
                                    if (a) {
                                        var s = a.node.getParent().convertToWorldSpaceAR(a.node.position),
                                            c = this._getAnimFlashNodeIns();
                                        if (c) { c.setParent(this._$._ndTouchScreen), c.getComponent(C.default).playAnimation(i, s) }
                                    }
                                    this._playHitEffect(a, t, 2, !1)
                                }
                            }
                        }
                        this._$._ndFishpond.stopAllActions(), this._$._ndFishpond.runAction(cc.sequence(cc.repeat(cc.sequence(cc.moveTo(.05, cc.v2(-5, 5)), cc.moveTo(.05, cc.v2(-5, -5)), cc.moveTo(.05, cc.v2(5, 5)), cc.moveTo(.05, cc.v2(5, -5))), 3), cc.callFunc(function () {
                            o._$._ndFishpond.position = cc.v2(0, 0)
                        })))
                    }
                }, t.prototype._pauseScreenFish = function (e) {
                    var t = this._ndEnemyPool.children;
                    e /= 1e3;
                    for (var o = 0; o < t.length; o++) {
                        var n = t[o].getComponent("Enemy");
                        n && n.doPause(e)
                    }
                    var i = this;
                    this._animationPause && this._animationPause.playAnimation(e, function () {
                        var e = i._$._ndFishpondBg.getComponent(D.default);
                        e && e.setPause(!1)
                    });
                    var r = this._$._ndFishpondBg.getComponent(D.default);
                    r && r.setPause(!0)
                }, t.prototype._getAnimCoinType = function (e, t) {
                    for (var o = 0, n = 0; n < t.length; n++) {
                        var i = t[n].split("|");
                        i.length != 0 && ((i = i[0]) != "Fish_any" ? i < "Fish_19" ? o < 0 && (o = 0) : i < "Fish_14" ? o < 1 && (o = 1) : o < 2 && (o = 2) : o = 2)
                    }
                    var r = 0;
                    if (o == 0) {
                        var a = e / 10;
                        a = Math.ceil(a), a %= 4
                    } else if (o == 1) {
                        var s = e / 50;
                        s = Math.ceil(s), s %= 4
                    } else {
                        var c = e / 100;
                        c = Math.ceil(c), c %= 4
                    }
                    r == 0 && (r = 1);
                    return {
                        type: ["coin_1", "coin_5", "coin_10"][o],
                        count: r
                    }
                }, t.prototype._isShowGoldPlate = function (e) {
                    for (var t = !1, o = 0; o < e.length; o++) {
                        var n = e[o].split("|");
                        if (n.length == 2) {
                            (n = n[0])[1];
                            if (n <= "Fish_07" ? b.default.getInstance().playCoinEffect(2) : n >= "Fish_08" && n <= "Fish_16" ? b.default.getInstance().playCoinEffect(1) : b.default.getInstance().playCoinEffect(0), n < "Fish_08") {
                                t = !0;
                                break
                            }
                        }
                    }
                    return t
                }, t.prototype._playScreenGoldAnim = function (e, t, o, n, i, r) {
                    var a = this._airCraiftManager.getData(n);
                    if (a) {
                        for (var s = R.default.getRealAmountByOtherCannonLevel(t, this._userInfo.rmpcannonCost, r), c = this._getAnimCoinType(s, o), l = 0; l < c.count; l++) {
                            var u = this._getAnimCoinIns();
                            if (u) {
                                var p = a.aircraft.getComponent(U.default),
                                    h = u.getComponent(m.default);
                                u.setParent(this._$._ndTouchScreen), u.zIndex = 98, l == 0 ? h.playAnimation(e, c.type, s, p.isMasterPlayer(), this._walletStorage.currencyFractionDigits, this._walletStorage.thousandsGroupingSeparator, this._walletStorage.decimalSeparator) : h.playAnimation(e, c.type, 0, !1, this._walletStorage.currencyFractionDigits, this._walletStorage.thousandsGroupingSeparator, this._walletStorage.decimalSeparator), h.moveToTarge(a.aircraft.getParent().convertToWorldSpaceAR(a.aircraft.position))
                            }
                        }
                        if (this._isShowGoldPlate(o) && this._bingoAnim) {
                            p = a.aircraft.getComponent(U.default);
                            var f = R.default.getRealAmountByOtherCannonLevel(i, this._userInfo.rmpcannonCost, r);
                            this._bingoAnim.setParent(this._$._ndTouchScreen), this._bingoAnim.zIndex = 99, this._bingoAnim.getComponent(L.default).play(a.aircraft.getParent().convertToWorldSpaceAR(a.aircraft.position), f, p.isMasterPlayer())
                        }
                    } else { cc.log("_playScreenGoldAnim undefine playerId=", n) }
                }, t.prototype.showHide = function () {
                    if (this._businessStorage && this._businessStorage.startGame) {
                        if (this._isShow) { return; }
                        this._tableSearchStorage && (this._tableSearchStorage.doSearching = !1), this._showHideChildren(!0), this.startGame()
                    } else {
                        if (!this._isShow) { return; }
                        b.default.getInstance().stopMusic(), this._showHideChildren(!1)
                    }
                }, t.prototype._sendCannonUpdateRequest = function (e) {
                    var t = this;
                    if (this._netConnector.socketConnector) {
                        var o = this;
                        this._netConnector.socketConnector.request(p.default.pomeloRoute.onUpdateCannon, u.default.makeWsPacket({
                            upgrade: e
                        }), function (e) {
                            if (!e || e.err) { cc.log("onUpdateCannon error ", e); }
                            else if (e.code == 200) {
                                var n = t._airCraiftManager.getAirCraft(o._userInfo.playerId);
                                if (n) { n.getComponent(U.default).setLevel(e.data.areaPlayer.skin); }
                                b.default.getInstance().playCannonSwitchEffect(e.data.areaPlayer.cannonLevel, e.data.areaPlayer.skin)
                            }
                        })
                    }
                }, t.prototype._onBtnUpgradeTouchEnd = function () {
                    this._btnUpgrade && this._btnUpgrade.runAction(cc.sequence(cc.scaleTo(.05, .6, .6), cc.scaleTo(.05, 1, 1))), this._sendCannonUpdateRequest(!0)
                }, t.prototype._onBtnDowngradeTouchEnd = function () {
                    this._btnDowngrade && this._btnDowngrade.runAction(cc.sequence(cc.scaleTo(.05, .6, .6), cc.scaleTo(.05, 1, 1))), this._sendCannonUpdateRequest(!1)
                }, t.prototype._onBtnJoyStickSwitchTouchEnd = function () {
                    var e = this;
                    this.scheduleOnce(function () {
                        e._$._ndJoyStick && e._$._btnJoyStickSwitch && (e._$._btnJoyStickSwitch.getComponent(cc.Toggle).isChecked ? e._$._ndJoyStick.active = !0 : e._$._ndJoyStick.active = !1)
                    })
                }, t.prototype._onBtnAutoFireTouchEnd = function () {
                    var e = this;
                    this._businessStorage && this._businessStorage.lockTarget || (this.closeNoviceTeaching(), this._setAutoFireStatus(!1), this.scheduleOnce(function () {
                        e._$._btnAutoFire.getComponent(cc.Toggle).isChecked ? e._businessStorage.autoFire = !0 : e._businessStorage.autoFire = !1
                    }))
                }, t.prototype._setAutoFireStatus = function (e) {
                    var t = this._$._btnAutoFire.getComponent(cc.Toggle);
                    t.isChecked ? t.uncheck() : t.check(), this._$._btnAutoFire.getChildByName("label_auto").getComponent(cc.Label).string = t.isChecked ? A.t("text.autofire.stop") : A.t("text.autofire"), e || (b.default.getInstance().playBtnEffect(), b.default.getInstance().playBtnAuto(!t.isChecked))
                }, t.prototype._closeAutoFire = function (e) {
                    var t = this._$._btnAutoFire.getComponent(cc.Toggle);
                    t.uncheck(), this._$._btnAutoFire.getChildByName("label_auto").getComponent(cc.Label).string = t.isChecked ? A.t("text.autofire.stop") : A.t("text.autofire"), e || (b.default.getInstance().playBtnEffect(), b.default.getInstance().playBtnAuto(!t.isChecked))
                }, t.prototype._onBtnLockTargetTouchEnd = function () {
                    var e = this;
                    this._setLockTargeStatue(), this.closeNoviceTeaching(), this.scheduleOnce(function () {
                        e._$._btnLockTarget.getComponent(cc.Toggle).isChecked ? (e._businessStorage.lockTarget = !0, e._$._lockboard.active = !0) : (e._businessStorage.lockTarget = !1, e._businessStorage.lockTargetId = null, e._businessStorage.lockFishType = "", e._$._locktouchScreen.off(cc.Node.EventType.TOUCH_END, e), e._$._locktouchScreen.active = !1, e._$._lockboard.active = !1, e._closeAutoFire(!1), e._businessStorage.autoFire = !1)
                    })
                }, t.prototype._setLockTargeStatue = function () {
                    var e = this._$._btnLockTarget.getComponent(cc.Toggle);
                    e.isChecked ? e.uncheck() : e.check(), this._$._btnLockTarget.getChildByName("label_lock").getComponent(cc.Label).string = e.isChecked ? A.t("text.unlocktarget") : A.t("text.locktarget"), b.default.getInstance().playBtnEffect(), b.default.getInstance().playBtnLock(!e.isChecked)
                }, t.prototype._closeLockTarget = function () {
                    var e = this._$._btnLockTarget.getComponent(cc.Toggle);
                    e.uncheck(), this._$._btnLockTarget.getChildByName("label_lock").getComponent(cc.Label).string = A.t("text.locktarget"), b.default.getInstance().playBtnEffect(), b.default.getInstance().playBtnLock(!e.isChecked)
                }, t.prototype._onBtnAudioTouchEnd = function () {
                    var e = this._$._btnSound.getComponent(cc.Toggle);
                    e.isChecked ? e.uncheck() : e.check(), b.default.getInstance().playBtnEffect();
                    var t = this;
                    this.scheduleOnce(function () {
                        t._$._btnSound.getComponent(cc.Toggle).isChecked ? (b.default.getInstance().disableMusic(!0), b.default.getInstance().disableEffect(!0)) : (b.default.getInstance().disableMusic(!1), b.default.getInstance().disableEffect(!1))
                    })
                }, t.prototype._onBtnQuitTouchEnd = function () {
                    this._tableSearchStorage && !this._tableSearchStorage.quitGameReq && (this._tableSearchStorage.quitGameReq = !0, this._btnQuitClick = !0, this._isCancelLock = !0, this._businessStorage.lockTarget = !1, this._businessStorage.lockTargetId = null, this._businessStorage.lockFishType = "", this._$._locktouchScreen.off(cc.Node.EventType.TOUCH_END, this), this._$._locktouchScreen.active = !1, this._$._lockboard.active = !1, this._closeLockTarget(), cc.log("_onBtnQuitTouchEnd _onBtnQuitTouchEnd"), this._closeAutoFire(!1), this._businessStorage.autoFire = !1)
                }, t.prototype._onNdTouchScreenTouchStart = function () {
                    return !1
                }, t.prototype._onBtnCurrencyExchangeTouchEnd = function () {
                    this._walletStorage && (this._walletStorage.showExchangeUi = !0)
                }, t.prototype.update = function (e) {
                    this._frameRateTime = e, this.showHide(), this.displayPlayers(), this.spawnBoss(e), this.spawnBossSoldier(e), this.spawnEnemy(e), this.onColliderHandle(e), this.onColliderResultHandle(e), this.autoLockTarget(e), this.fireHandle(e, !1), this.spawnBullet(e), this.moveSlaverAircraft(e), this.playTideAnimation(), this.checkEndGame(), this.closeBossNotify()
                }, t.prototype.autoLockTarget = function (e) {
                    var t = this;
                    if (this._businessStorage && this._businessStorage.startGame) {
                        if (this._businessStorage.lockTarget) {
                            if (this._businessStorage.lockTarget && this._businessStorage.lockFishType != "") {
                                var o;
                                o = this._businessStorage.lockTargetId;
                                var n = this._getFishNodeCacheMap(o);
                                if (this._businessStorage.battleBoss || !n || n.isOnStage() || (cc.log("fish not on stage ", n.getId(), n.getFishType(), n.isOnStage()), n = null), this._tideStopFire) { return n = null, void (this._businessStorage.lockTargetId = ""); }
                                if (!n && this._businessStorage.lockTarget && (this._closeAutoFire(!0), this._businessStorage.autoFire = !1), !n && this._businessStorage.lockTarget) {
                                    if (n = this._findTargetFish(), this._businessStorage.lockTargetId = n ? n.getId() : "", !this._businessStorage.lockTargetId) { return this._closeAutoFire(!0), void (this._businessStorage.autoFire = !1); }
                                    this._$._ndGunsight.getComponent(B.default).lockFramePosBackToDefault()
                                }
                                if (!n || !n.node.getParent()) { return this._closeAutoFire(!0), void (this._businessStorage.autoFire = !1); }
                                n && this._businessStorage.lockTargetId && !this._businessStorage.autoFire && this.scheduleOnce(function () {
                                    !t._$._selectRoomLevel.active && t._$._ndGunsight.active && t._businessStorage.lockTarget && (t._setAutoFireStatus(!0), t._businessStorage.autoFire = !0)
                                }, .6);
                                var i, r = n.node.getParent().convertToWorldSpaceAR(n.node.position);
                                if (this._$._ndGunsight) {
                                    var a = cc.v2(r.x, r.y + 30);
                                    this._$._ndGunsight.active = !0, this._$._ndGunsight.position = this.node.convertToNodeSpaceAR(a), this._$._ndGunsight.getComponent(B.default).reLockFramePos(n.node)
                                } (i = this._airCraiftManager.getAirCraft(this._userInfo.playerId).getComponent(U.default)) && (r = cc.v2(r.x, r.y - 240), i.setMovePosition(r))
                            } else if (!this._$._locktouchScreen.active) {
                                this._$._locktouchScreen.active = !0;
                                var s = this,
                                    c = this._$._locktouchScreen;
                                this._$._locktouchScreen.on(cc.Node.EventType.TOUCH_END, function (e) {
                                    var t = this,
                                        o = c.getParent().convertToNodeSpaceAR(e.getLocation());
                                    if (this._$._ndGunsight) {
                                        Math.round(p.default.consts.FRAME_HEIGHT / cc.winSize.height);
                                        if (this._$._ndGunsight.active = !0, this._$._ndGunsight.position = o, !s._businessStorage.lockFishType) {
                                            var n = this._$._ndGunsight.getComponent(B.default);
                                            n && n.clearFishSprite()
                                        }
                                    }
                                    var i = null,
                                        r = 0,
                                        a = this._$._ndGunsight.getParent().convertToWorldSpaceAR(this._$._ndGunsight.position);
                                    for (var l in s._fishesNodeCacheMap) {
                                        var u = s._fishesNodeCacheMap[l];
                                        u.isOnStage() && (u.node.getParent() && u.inRect(a) && (u.isEffectBox() ? i = l : u.score > r && (i = l, r = u.score)))
                                    }
                                    if (i || (cc.log("not find fishkey"), this._closeAutoFire(!0), this._businessStorage.autoFire = !1), i) {
                                        var h = s._fishesNodeCacheMap[i];
                                        s._businessStorage.lockTargetId = h.getId().toString(), s._businessStorage.lockFishType = h.getFishType();
                                        var f = this._$._ndGunsight.getComponent(B.default);
                                        f.setLockFish(s._businessStorage.lockFishType), f.showBox(), this._$._lockboard.active = !1, s._businessStorage.autoFire && s._closeAutoFire(!0), s.scheduleOnce(function () {
                                            !t._$._selectRoomLevel.active && t._$._ndGunsight.active && t._businessStorage.lockTarget && (s._setAutoFireStatus(!0), s._businessStorage.autoFire = !0)
                                        }, .6);
                                        var d = h.node.getParent().convertToWorldSpaceAR(h.node.position),
                                            _ = this._airCraiftManager.getAirCraft(this._userInfo.playerId).getComponent(U.default);
                                        _ && (d = cc.v2(d.x, d.y - 240), _.setMovePosition(d), _.setLockMode(!0))
                                    }
                                }, this, !1)
                            }
                        } else { this._$._ndGunsight && this._$._ndGunsight.active && (this._$._ndGunsight.active = !1, (i = this._airCraiftManager.getAirCraft(this._userInfo.playerId).getComponent(U.default)) && i.setLockMode(!1)) }
                    }
                }, t.prototype.startGame = function () {
                    if (this._businessStorage) {
                        this.scheduleOnce(function () {
                            b.default.getInstance().playBgMusic(b.default.getInstance()._bgMusicName1)
                        }, 2.5), this._initPauseAnimNode(), this._isHideDrop = !1, this._hideDrawCount = 0, d.default.seed = this._businessStorage.area.seed;
                        var e = this;
                        if (this._businessStorage.pingIntervalId && clearInterval(this._businessStorage.pingIntervalId), this._businessStorage.syncPosIntervalId && clearInterval(this._businessStorage.syncPosIntervalId), this._businessStorage.pingIntervalId = setInterval(function () {
                            var t = !1;
                            Object.keys(e._bulletsNodeCacheMap).forEach(function (o) {
                                e._bulletsNodeCacheMap[o].getComponent(g.default).IsMe && (t = !0)
                            }), t || e._ping.DoPing(!1)
                        }, 5e3), this._businessStorage.syncPosIntervalId = setInterval(function () {
                            e.sendSyncMovePos()
                        }, 500), this._fishesNodeCacheMap = {}, this._bulletsNodeCacheMap = {}, this._userInfo) {
                            var t = this._airCraiftManager.join(this._userInfo.nickName, !1, this._userInfo.playerId, cc.instantiate(z.default.getPrefab("AirCraift")));
                            this._airCraiftManager.runStandyAnimation(t)
                        }
                        if (h.default.isShowFullScreenNotice(p.default.consts.ANDROID_FULLSCREEN_PLAY)) {
                            var o = (a = cc.instantiate(z.default.getPrefab("AndroidAskfullscreen"))).getComponent(F.default);
                            a.setParent(this.node), a.setContentSize(this.node.width, this.node.height), o.show(this.node)
                        }
                        if (h.default.isCanBackToLobby()) {
                            for (var n = [-211, -211, -211], i = this._$._selectRoomLevel.getChildByName("_roomoption"), r = 0; r < p.default.consts.MAX_ROOM; r++) {
                                var a, s = i.getChildByName("_room" + r);
                                (a = s.getChildByName("room_currency_" + r)).getComponent(N.default).show(s.position, cc.v2(-10, n[r]))
                            }
                        }
                        if (this._businessStorage && this._businessStorage.area && this._businessStorage.area.stage == p.default.consts.AREA_STAGE_GROUP) {
                            var c = this._$._bossNofity.getComponent(M.default);
                            c && c.start()
                        } (o = this._$._novice.getComponent(j.default)) && o.play();
                        var l = this._$._ndFishpondBg.getComponent(D.default);
                        l && l.init(D.default.DIRECTION_Y, p.default.consts.BG_SCOLL_SPEED)
                    }
                }, t.prototype._sendLeaveTable = function () {
                    var e = this;
                    this._netConnector.socketConnector && this._netConnector.socketConnector.request(p.default.pomeloRoute.leaveTable, u.default.makeWsPacket({}), function (t) {
                        !t || t.err ? cc.log("_sendLeaveTable error ", t) : (cc.log("_sendLeaveTable ", t), t.code == 200 && (e._tableSearchStorage.tableInfo = null, window.location.href = "about:blank", window.close()))
                    })
                }, t.prototype.checkEndGame = function () {
                    this._isShow && this._btnQuitClick && this._businessStorage && this._businessStorage.gameFinish && (this._btnQuitClick = !1, this._businessStorage.startGame = !1, this._businessStorage.gameFinish = !1, this._sendLeaveTable(), this._$._ndTouchScreen.removeAllChildren(), b.default.getInstance().stopEffect())
                }, t.prototype.displayPlayers = function () {
                    if (this._businessStorage && this._businessStorage.startGame && this._businessStorage.tableInfo) {
                        var e = this._businessStorage.tableInfo.chairIds,
                            t = this._businessStorage.playersInfo,
                            o = this._businessStorage.areaPlayers,
                            n = this._airCraiftManager.checkLeavePlayer(this._userInfo.playerId, e);
                        for (var i in n) { this._airCraiftManager.leave(n[i]); }
                        var r = this._airCraiftManager.checkJoin(this._userInfo.playerId, t);
                        for (var a in r) {
                            var s = r[a],
                                c = this._airCraiftManager.join(s.nickName, !0, s.id, cc.instantiate(z.default.getPrefab("AirCraift")));
                            b.default.getInstance().playUserJoin(), c && this._airCraiftManager.runStandyAnimation(c)
                        }
                        for (var l = 0; l < o.length; l++) {
                            if (this._cannonCost && o[l].playerId == this._userInfo.playerId && this._setupMyselfTurrent(null, this._userInfo.rmpcannonCost[o[l].cannonLevel]), this._cannonCost && o[l].playerId != this._userInfo.playerId) {
                                var u = this._airCraiftManager.getAirCraft(o[l].playerId);
                                if (u) { u.getComponent(U.default).setLevel(o[l].skin) }
                            }
                        }
                    }
                }, t.prototype._setupMyselfTurrent = function (e, t) {
                    var o = R.default.getRealMoney(t);
                    this._cannonCost.getComponent(cc.Label).string = R.default.numberFormat(o.rmp), this._crfontend.getComponent(cc.Label).string = o.isbehind ? "" : o.cy, this._crbehind.getComponent(cc.Label).string = o.isbehind ? o.cy : "";
                    var n = this._balance.getChildByName("currency"),
                        i = this._balance.getChildByName("balance"),
                        r = h.default.getRealCurrency(this._walletStorage.currencySymbol);
                    i.getComponent(cc.Label).string = R.default.numberFormat(this._userInfo.gold), n.getComponent(cc.Sprite).spriteFrame = z.default.getSpriteFrame("currencysymbol", "reelwinmeter_" + h.default.getRealSpriteCurrency(r))
                }, t.prototype.closeBossNotify = function () {
                    if (this._$._bossNofity.active && this._businessStorage.startGame && (this._businessStorage.area.stage == p.default.consts.AREA_STAGE_NORMAL || this._businessStorage.area.stage == p.default.consts.AREA_STAGE_WAIT)) {
                        var e = this._$._bossNofity.getComponent(M.default);
                        e && e.stop()
                    }
                }, t.prototype._showHideChildren = function (e) {
                    for (var t = this.node.children, o = 0; o < t.length; o++) { t[o].active = e; }
                    e && (this._showcounter ? this._$._ndCounter && (this._$._ndCounter.active = !0) : this._$._ndCounter && (this._$._ndCounter.active = !1), this._onBtnJoyStickSwitchTouchEnd()), this._$._locktouchScreen.active = !1, this._$._selectRoomLevel.active = !1, this._$._bossNofity.active = !1, this._$._novice.active = !1, this._$._pathDraw.active = !1, h.default.isFreePlay() || (this._$._FreePlay.active = !1), this._isShow = e
                }, t.prototype.playTideAnimation = function () {
                    var e = this;
                    if (this._businessStorage && this._businessStorage.changeScene) {
                        this._businessStorage.changeScene = !1, b.default.getInstance().playWaveEffect();
                        for (var t = 0; t < this._ndEnemyPool.children.length; t++) {
                            var o = this._ndEnemyPool.children[t].getComponent("Enemy");
                            o && o.doDieForBossBattleWarning()
                        }
                        var n = this;
                        if (n._tideStopFire = !0, setTimeout(function () {
                            n._tideStopFire = !1
                        }, 9e3), this._bossWarning) {
                            var i = this._bossWarning.getComponent("BossWarning");
                            i.init(), i.playAnimation(), this.scheduleOnce(function (e) {
                                i.close()
                            }, 6)
                        }
                        if (this._animationPause) {
                            this._animationPause.stop();
                            var r = n._$._ndFishpondBg.getComponent(D.default);
                            r && r.setPause(!1)
                        }
                        this.scheduleOnce(function (t) {
                            b.default.getInstance().playBgMusic(b.default.getInstance()._bgBossMusicName), e.scheduleOnce(function () {
                                e._businessStorage.sceneId == 0 ? b.default.getInstance().playBgMusic(b.default.getInstance()._bgMusicName1) : b.default.getInstance().playBgMusic(b.default.getInstance()._bgMusicName2)
                            }, 40)
                        }, 6.5)
                    }
                }, t.prototype.runShake = function (e) {
                    var t = this;
                    if (!this._isShake) {
                        this._isShake = !0;
                        var o = cc.v2(0, e);
                        this.node.runAction(cc.sequence(cc.moveTo(.03, o.rotate(Math.PI / 4 * 0 % 8)), cc.moveTo(.03, o.rotate(Math.PI / 4 * 3 % 8)), cc.moveTo(.03, o.rotate(Math.PI / 4 * 6 % 8)), cc.moveTo(.03, o.rotate(Math.PI / 4 * 9 % 8)), cc.moveTo(.03, o.rotate(Math.PI / 4 * 12 % 8)), cc.moveTo(.03, o.rotate(Math.PI / 4 * 15 % 8)), cc.moveTo(.03, o.rotate(Math.PI / 4 * 18 % 8)), cc.moveTo(.03, o.rotate(Math.PI / 4 * 21 % 8)), cc.moveTo(.01, cc.v2(0, 0)), cc.callFunc(function () {
                            t._isShake = !1
                        })))
                    }
                }, t.prototype.closeNoviceTeaching = function () {
                    if (this._$._novice.active) {
                        var e = this._$._novice.getComponent(j.default);
                        e && e.close()
                    }
                }, t.prototype.sendSyncMovePos = function () {
                    if (this._businessStorage && !(this._businessStorage.areaPlayers.length <= 1) && this._airCraiftManager.getStartSyncPos()) {
                        var e = this._airCraiftManager.getData(this._userInfo.playerId);
                        if (e && this._netConnector.socketConnector) {
                            var t = e.aircraft.getPosition();
                            this._netConnector.socketConnector.request(p.default.pomeloRoute.syncMovePos, u.default.makeWsPacket({
                                x: Math.floor(t.x),
                                y: Math.floor(t.y)
                            }), null)
                        }
                    }
                }, t.prototype.moveSlaverAircraft = function (e) {
                    if (this._businessStorage && this._businessStorage.startGame && !this._$._bossNofity.active && !(this._businessStorage.areaPlayers.length <= 1)) {
                        var t = this._businessStorage.syncMovePosQueue;
                        for (var o in t) {
                            var n = this._businessStorage.getSyncMovePos(o);
                            this._airCraiftManager.runSlaveMoveAction(n)
                        }
                        this._businessStorage.clearSyncMovePos()
                    }
                }, t.prototype.hideDrawCheck = function () {
                    this._hideDrawCount++, this._hideDrawCount == 2 && (this._isHideDrop = !0)
                }, t.HIDE_WAIT_TIME = 3e5, t._instance = null, t = o = i([a], t)
            }(s.default);
        o.default = Q, cc._RF.pop()
    }, {
        "../Components/Business/AudioManage": "AudioManage",
        "../Components/Business/StartSearchTableForPlayView": "StartSearchTableForPlayView",
        "../Components/Model/BusinessStorage": "BusinessStorage",
        "../Components/Model/NetConnector": "NetConnector",
        "../Components/Model/PayTableViewStorage": "PayTableViewStorage",
        "../Components/Model/PngStorage": "PngStorage",
        "../Components/Model/PromptDialogStorage": "PromptDialogStorage",
        "../Components/Model/TableSearchStorage": "TableSearchStorage",
        "../Components/Model/UserInfoStorage": "UserInfoStorage",
        "../Components/Model/WalletStorage": "WalletStorage",
        "../Components/UI/Aircraft": "Aircraft",
        "../Components/UI/AndroidAskFullScreen": "AndroidAskFullScreen",
        "../Components/UI/AnimationBingo": "AnimationBingo",
        "../Components/UI/AnimationBonus": "AnimationBonus",
        "../Components/UI/AnimationCoin": "AnimationCoin",
        "../Components/UI/AnimationFire": "AnimationFire",
        "../Components/UI/AnimationFlash": "AnimationFlash",
        "../Components/UI/AnimationOnlyCoin": "AnimationOnlyCoin",
        "../Components/UI/AnimationPause": "AnimationPause",
        "../Components/UI/AutoScollLayer": "AutoScollLayer",
        "../Components/UI/Boss": "Boss",
        "../Components/UI/BossNotify": "BossNotify",
        "../Components/UI/Bullet": "Bullet",
        "../Components/UI/CurrencyLabel": "CurrencyLabel",
        "../Components/UI/Enemy": "Enemy",
        "../Components/UI/Fish": "Fish",
        "../Components/UI/GunSight": "GunSight",
        "../Components/UI/NoviceTeaching": "NoviceTeaching",
        "../Components/UI/RecallRow": "RecallRow",
        "../Components/UI/joystick/Joystick": "Joystick",
        "../Components/UI/manager/AircraftManager": "AircraftManager",
        "../Components/UI/webViewGameRecall": "WebViewGameRecall",
        "../Config/Config": "Config",
        "../Utils/CCHelper": "CCHelper",
        "../Utils/KAFishGameAssets": "KAFishGameAssets",
        "../Utils/RealMoneyPlatform": "RealMoneyPlatform",
        "../Utils/SeedRandom": "SeedRandom",
        "../uikiller/Thor": "Thor",
        LanguageData: "LanguageData"
    }],
    PngStorage: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "4dedag+TXpFn6TP2s7iRf6E", "PngStorage");
        var n = this && this.__extends || function () {
            var e = function (t, o) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                    })(t, o)
            };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = e("./UserInfoStorage"),
            a = e("../../Config/Config"),
            s = e("./NetConnector"),
            c = e("./BusinessStorage"),
            l = e("../../Utils/RealMoneyPlatform"),
            u = cc._decorator,
            p = u.ccclass,
            h = (u.property, function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t._dt = 0, t._userInfo = null, t._netConnector = null, t._businessStorage = null, t
                }
                return n(t, e), t.prototype.onLoad = function () {
                    this._userInfo = this.node.getComponent(r.default), this._netConnector = this.node.getComponent(s.default), this._businessStorage = this.node.getComponent(c.default), this._dt = (new Date).getTime()
                }, t.prototype.updateDelayTime = function () {
                    this._dt = (new Date).getTime()
                }, t.prototype.DoPing = function (e) {
                    var t = this,
                        o = (new Date).getTime();
                    o - this._dt < 1e3 * a.default.consts.PING_DELAY && !e || (this._dt = o, this._netConnector.socketConnector && this._userInfo && this._businessStorage && this._netConnector.socketConnector.request(a.default.pomeloRoute.onPingBalance, s.default.makeWsPacket({}), function (e) {
                        if (!e || e.err || e.code != 200) { cc.log("ping error"); }
                        else {
                            var o = l.default.getRealMoney(l.default.convertCentsToCredits(e.msg.rmpRatioCredit));
                            t._userInfo.gold = o.rmp
                        }
                    }))
                }, t = i([p], t)
            }(cc.Component));
        o.default = h, cc._RF.pop()
    }, {
        "../../Config/Config": "Config",
        "../../Utils/RealMoneyPlatform": "RealMoneyPlatform",
        "./BusinessStorage": "BusinessStorage",
        "./NetConnector": "NetConnector",
        "./UserInfoStorage": "UserInfoStorage"
    }],
    PromptDialogStorage: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "e0def8rI7NGEqRl7b0WvAqU", "PromptDialogStorage");
        var n = this && this.__extends || function () {
            var e = function (t, o) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                    })(t, o)
            };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("../../Config/Config")),
            c = function (e) {
                function t() {
                    return e !== null && e.apply(this, arguments) || this
                }
                var o;
                return n(t, e), o = t, Object.defineProperty(t.prototype, "IsQuit", {
                    get: function () {
                        return o._isQuit
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "IsRecommendGame", {
                    get: function () {
                        return o._isRecommendGame
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "IsAskQuestion", {
                    get: function () {
                        return o._isAskQuestion
                    },
                    set: function (e) {
                        o._isAskQuestion = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "errortype", {
                    get: function () {
                        return o._errortype
                    },
                    set: function (e) {
                        o._errortype = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "show", {
                    get: function () {
                        return o._show
                    },
                    set: function (e) {
                        o._show = e, e && (o._exitCode = -1)
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "visibleButtons", {
                    get: function () {
                        return o._visibleButtons
                    },
                    set: function (e) {
                        o._visibleButtons = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "content", {
                    get: function () {
                        return o._content
                    },
                    set: function (e) {
                        o._content = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "exitCode", {
                    get: function () {
                        return o._exitCode
                    },
                    set: function (e) {
                        o._exitCode = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "textHAlign", {
                    get: function () {
                        return o._textHAlign
                    },
                    set: function (e) {
                        o._textHAlign = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.showMsg = function (e) {
                    var t = parseInt(e);
                    o._content = e.toString(), o._exitCode = t, o._show = !0, o._errortype = t === 216 ? s.default.ERR_TXT_216 : t === 1e3 ? s.default.ERR_TXT_1000 : t === 2e3 ? s.default.ERR_TXT_KICK : s.default.ERR_TXT_500, cc.log("errortype=", o._errortype)
                }, t.showAskLogOut = function () {
                    o._show = !0, o._isQuit = !0, o._errortype = s.default.ASK_LOGOUT_GAME
                }, t.reset = function () {
                    o._show = !1, o._isAskQuestion = !1, o._isQuit = !1, o._isRecommendGame = !1, o._errortype = "", o._exitCode = -1
                }, t.isShow = function () {
                    return o._show
                }, t.showRecommendGame = function () {
                    o._show = !0, o._isRecommendGame = !0
                }, t._show = !1, t._visibleButtons = [], t._content = "", t._exitCode = -1, t._textHAlign = cc.macro.TextAlignment.LEFT, t._errortype = "", t._isAskQuestion = !1, t._isQuit = !1, t._isRecommendGame = !1, t = o = i([a], t)
            }(cc.Component);
        o.default = c, cc._RF.pop()
    }, {
        "../../Config/Config": "Config"
    }],
    PromptDialog: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "7ef55aM5lZNHp2ORWmddpVt", "PromptDialog");
        var n = this && this.__extends || function () {
            var e = function (t, o) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                    })(t, o)
            };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("../Model/PromptDialogStorage")),
            c = e("../../uikiller/Thor"),
            l = e("../../Config/Config"),
            u = e("../../Utils/CCHelper"),
            p = e("LanguageData"),
            h = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t._promptDialogStorage = null, t._isShow = !1, t
                }
                return n(t, e), t.prototype.onLoad = function () {
                    this._promptDialogStorage = this.node.getComponent(s.default), this._label_ok.active = !1, this._label_cancel.active = !1, this._btnOK.on(cc.Node.EventType.TOUCH_END, this._onBtnOKTouchEnd, this, !0), this._btnCancel.on(cc.Node.EventType.TOUCH_END, this._onBtnCancelTouchEnd, this, !0), this.showHideChildren(!1)
                }, t.prototype._onBtnOKTouchEnd = function (e) {
                    if (cc.log("btn ", e.name, " click ", e.$, " isAskQuestion", this._promptDialogStorage.IsAskQuestion), this._promptDialogStorage) {
                        if (cc.log("exitCode ", this._promptDialogStorage.exitCode), this._promptDialogStorage.IsQuit) { return cc.game.end(), void this.closePage(); }
                        s.default.reset(), this._promptDialogStorage.content == String(l.default.ERR_CODE_KICK_LOGOUT) ? (cc.game.end(), this.closePage()) : this._promptDialogStorage.content != String(l.default.ERR_CODE_BALANCE) && (window.location.href = "")
                    }
                }, t.prototype._onBtnCancelTouchEnd = function (e) {
                    this._promptDialogStorage && s.default.reset()
                }, t.prototype.update = function (e) {
                    this._promptDialogStorage && (this._promptDialogStorage.show && !this._isShow ? this.showHideChildren(!0) : !this._promptDialogStorage.show && this._isShow && this.showHideChildren(!1))
                }, t.prototype.showHideChildren = function (e) {
                    for (var t = this.node.children, o = 0; o < t.length; o++) { cc.log(t[o].name), t[o].active = e; }
                    e && (this.hideAllButtons(), this._promptDialogStorage && (this._promptDialogStorage.IsAskQuestion ? this.showAskQuestionUI() : this._promptDialogStorage.IsQuit ? u.default.isShowReCommendGames() ? this.showQuitGameRecommendDialog() : this.showAskQuestionUI() : this._promptDialogStorage.IsRecommendGame ? this.showRecommendDialog() : this.showAlertUI())), this._isShow = e
                }, t.prototype.hideAllButtons = function () {
                    this._btnOK.active = !1, this._btnCancel.active = !1, this._label_ok.active = !1, this._label_cancel.active = !1
                }, t.prototype.showAlertUI = function () {
                    (cc.log("showAlertUI"), this._$._btnOK && (this._$._btnOK.active = !0, this._label_ok.active = !0), this._$._recommend && (this._$._recommend.active = !1), this._$._msg) && (this._$._msg.getComponent(cc.Label).string = p.t(this._promptDialogStorage.errortype));
                    u.default.checkAndSetFrameScale(this.node.getChildByName("content"))
                }, t.prototype.showButtons = function (e) {
                    cc.log("showButtons  ", e), this._$._btnOK && (this._$._btnOK.active = !0, this._label_ok.active = !0)
                }, t.prototype.showAskQuestionUI = function () {
                    (this._$._btnOK && (this._$._btnOK.active = !0, this._label_ok.active = !0), this._$._btnCancel && (this._$._btnCancel.active = !0, this._label_cancel.active = !0), this._$._recommend && (this._$._recommend.active = !1), this._$._msg) && (this._$._msg.getComponent(cc.Label).string = p.t(this._promptDialogStorage.errortype));
                    u.default.checkAndSetFrameScale(this.node)
                }, t.prototype.showReCommandUI = function () {
                    this._$._recommend && (this._$._recommend.active = !0);
                    for (var e = this._$._recommend.getChildByName("view").getChildByName("content"), t = 1; t < 50; t++) {
                        var o = e.getChildByName("_game" + t);
                        if (!o) { break; }
                        o.off(cc.Node.EventType.TOUCH_END), o.active = !1
                    }
                    var n = u.default.getReCommendGames(),
                        i = [];
                    for (var r in n) { i.push(n[r]); }
                    var a = this;
                    (i.sort(function (e, t) {
                        return e.idx - t.idx
                    }).forEach(function (t) {
                        if (!e.getChildByName("_node" + (t.idx + 1))) {
                            var o = a.createEmptyNode(t.idx);
                            e.addChild(o)
                        }
                        cc.loader.load({
                            url: t.iu,
                            type: "png"
                        }, function (t, o) {
                            var i = n[o.url],
                                r = e.getChildByName("_node" + (i.idx + 1));
                            if (r) {
                                var a = r.getChildByName("_game");
                                a.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(o), a.on(cc.Node.EventType.TOUCH_END, function (e) {
                                    r.runAction(cc.sequence(cc.scaleTo(.3, 1.1, 1.1), cc.scaleTo(.3, 1, 1), cc.callFunc(function () {
                                        var e = u.default.getReCommendUrlString(i.lu);
                                        window.location.href = e
                                    })))
                                }), a.active = !0
                            }
                        })
                    }), this._$._btnOK) && (this._$._btnOK.active = !0, this._label_ok.active = !0, this._label_ok.getComponent(cc.Label).string = p.t("text.endgame"));
                    this._$._btnCancel && (this._$._btnCancel.active = !0, this._label_cancel.active = !0, this._label_cancel.getComponent(cc.Label).string = p.t("text.playon"));
                    i.length;
                    e.width = 420 * i.length, u.default.checkAndSetFrameScale(this.node)
                }, t.prototype.showRecommendDialog = function () {
                    this.showQuitGameRecommendDialog(), this._$._btnOK && (this._$._btnOK.active = !1, this._label_ok.active = !1), this._$._btnCancel && (this._$._btnCancel.active = !0, this._label_cancel.active = !0)
                }, t.prototype.showQuitGameRecommendDialog = function () {
                    this._$._recommend && (this._$._recommend.active = !0);
                    for (var e = this._$._recommend.getChildByName("view").getChildByName("content"), t = 1; t < 50; t++) {
                        var o = e.getChildByName("_game" + t);
                        if (!o) { break; }
                        o.off(cc.Node.EventType.TOUCH_END), o.active = !1
                    }
                    var n = u.default.getReCommendGames(),
                        i = [];
                    for (var r in n) { i.push(n[r]); }
                    var a = this;
                    i.sort(function (e, t) {
                        return e.idx - t.idx
                    }).forEach(function (t) {
                        if (!e.getChildByName("_node" + (t.idx + 1))) {
                            var o = a.createEmptyNode(t.idx);
                            e.addChild(o)
                        }
                        cc.loader.load({
                            id: t.iu,
                            type: "png"
                        }, function (t, o) {
                            var i = n[o.url],
                                r = e.getChildByName("_node" + (i.idx + 1));
                            if (r) {
                                var a = r.getChildByName("_game");
                                a.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(o), a.on(cc.Node.EventType.TOUCH_END, function (e) {
                                    r.runAction(cc.sequence(cc.scaleTo(.3, 1.1, 1.1), cc.scaleTo(.3, 1, 1), cc.callFunc(function () {
                                        var e = u.default.getReCommendUrlString(i.lu);
                                        window.location.href = e
                                    })))
                                }), a.active = !0
                            }
                        })
                    }), this._$._btnOK && (this._$._btnOK.active = !0, this._label_ok.active = !0), this._$._btnCancel && (this._$._btnCancel.active = !0, this._label_cancel.active = !0);
                    i.length;
                    e.width = 420 * i.length, u.default.checkAndSetFrameScale(this.node)
                }, t.prototype.closePage = function () {
                    window.parent.postMessage('CloseGame', "*");
                }, t.prototype.createEmptyNode = function (e) {
                    var t = new cc.Node,
                        o = new cc.Node;
                    return o.addComponent(cc.Sprite), t.name = "_node" + (e + 1), t.setContentSize(400, 400), o.name = "_game", o.setContentSize(t.getContentSize()), t.addChild(o), t
                }, t = i([a], t)
            }(c.default);
        o.default = h, cc._RF.pop()
    }, {
        "../../Config/Config": "Config",
        "../../Utils/CCHelper": "CCHelper",
        "../../uikiller/Thor": "Thor",
        "../Model/PromptDialogStorage": "PromptDialogStorage",
        LanguageData: "LanguageData"
    }],
    RealMoneyPlatform: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "024be6qUD1PVKmWO3n36AVJ", "RealMoneyPlatform"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./CCHelper"),
            i = function () {
                function e() { }
                return Object.defineProperty(e, "walletInfo", {
                    get: function () {
                        return e._walletInfo
                    },
                    set: function (t) {
                        e._walletInfo = t
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.calculateCentsFromCredits = function (e, t) {
                    if (!e || !t) { return 0; }
                    var o = 100 * e * t;
                    return Math.round(o)
                }, e.formatCents = function (e) {
                    return e / 100
                }, e.convertCreditsToCents = function (t, o) {
                    return o = void 0 === o ? e.walletInfo.currentDenomination : o, Math.floor(t * o * 100 + e.FLT_EPSILON)
                }, e.convertCentsToCredits = function (t) {
                    return Math.floor(t / e.walletInfo.currentDenomination / 100)
                }, e.formatCredits = function (t) {
                    return Math.floor(t / e.walletInfo.currentDenomination / 100)
                }, e.formatCurrencySymbol = function (t, o) {
                    o = void 0 === o || o;
                    var i = n.default.getRealCurrency(e.walletInfo.currencySymbol);
                    return e.walletInfo.currencySymbolInBack ? {
                        cy: i,
                        isbehind: !0,
                        rmp: o ? String(t.toFixed(e.walletInfo.currencyFractionDigits)) : String(t)
                    } : {
                        cy: i,
                        isbehind: !1,
                        rmp: o ? String(t.toFixed(e.walletInfo.currencyFractionDigits)) : String(t)
                    }
                }, e.convertCreditsToCurrency = function (t, o) {
                    return e.formatCents(e.convertCreditsToCents(t, o))
                }, e.formatCreditsToCurrency = function (t, o) {
                    return e.formatCurrencySymbol(e.convertCreditsToCurrency(t, o), "undefined")
                }, e.getRealMoney = function (t) {
                    var o = e.convertCreditsToCurrency(t, e.walletInfo.currentDenomination);
                    return e.formatCurrencySymbol(o, "undefined")
                }, e.numberFormat = function (t) {
                    var o = void 0 === this.walletInfo.thousandsSeparator || this.walletInfo.thousandsSeparator == null ? e.thousandsGroupingSeparator : this.walletInfo.thousandsSeparator,
                        n = void 0 === this.walletInfo.decimalSeparator || this.walletInfo.decimalSeparator == null ? e.decimalSeparator : this.walletInfo.decimalSeparator,
                        i = Number(t).toFixed(this.walletInfo.currencyFractionDigits).split("."),
                        r = i[0].split("").reverse(),
                        a = "",
                        s = 0;
                    for (var c in r) { a = ++s % 3 == 1 && s !== 1 ? r[c] + o + a : r[c] + a; }
                    return i[1] ? a + n + i[1] : a
                }, e.getRealAmountByOtherCannonLevel = function (e, t, o) {
                    var n = o;
                    return n >= t && (n = t.length - 1), e * t[n]
                }, e.FLT_EPSILON = 1.1920929e-7, e.thousandsGroupingSeparator = ",", e.decimalSeparator = ".", e._walletInfo = null, e
            }();
        o.default = i, cc._RF.pop()
    }, {
        "./CCHelper": "CCHelper"
    }],
    RecallRow: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "50254fwYJ9HYbtTxHI3jj7v", "RecallRow");
        var n = this && this.__extends || function () {
            var e = function (t, o) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                    })(t, o)
            };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = e("../../Utils/CCHelper"),
            a = e("../../Utils/RealMoneyPlatform"),
            s = cc._decorator,
            c = s.ccclass,
            l = (s.property, function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t._data = null, t
                }
                return n(t, e), t.prototype.init = function (e) {
                    var t = this;
                    this._data = e;
                    var o = this.node.getChildByName("_col1"),
                        n = this.node.getChildByName("_col2"),
                        i = this.node.getChildByName("_col3"),
                        r = this.node.getChildByName("_col4"),
                        a = this.node.getChildByName("_col5");
                    e ? (o.active = !0, n.active = !0, i.active = !0, r.active = !0, a.active = !0, this.initDate(), this.initTransactionId(), this.initBullets(), this.initBet(), this.initWinScore(), this.node.on(cc.Node.EventType.TOUCH_START, function (e) {
                        var o = t.node.getChildByName("_event_bg");
                        o && (o.active = !0)
                    }), this.node.on(cc.Node.EventType.MOUSE_MOVE, function (e) {
                        var o = t.node.getChildByName("_event_bg");
                        o && (o.active = !0)
                    }), this.node.on(cc.Node.EventType.TOUCH_END, function (e) {
                        var o = t.node.getChildByName("_event_bg");
                        o && (o.active = !1)
                    }), this.node.on(cc.Node.EventType.MOUSE_LEAVE, function (e) {
                        var o = t.node.getChildByName("_event_bg");
                        o && (o.active = !1)
                    })) : (o.active = !1, n.active = !1, i.active = !1, r.active = !1, a.active = !1)
                }, Object.defineProperty(t.prototype, "data", {
                    get: function () {
                        return this._data
                    },
                    set: function (e) {
                        this._data = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.getTransactionId = function () {
                    return this._data.transactionId
                }, t.prototype.initDate = function () {
                    var e = this.node.getChildByName("_col1").getChildByName("_date").getChildByName("_label").getComponent(cc.Label);
                    e.string = this._data.spinDate, e._updateRenderData(!0)
                }, t.prototype.initTransactionId = function () {
                    var e = this.node.getChildByName("_col2").getChildByName("_trainsaction").getChildByName("_label").getComponent(cc.Label);
                    e.string = this._data.transactionId, e._updateRenderData(!0)
                }, t.prototype.initBullets = function () {
                    var e = this.node.getChildByName("_col3").getChildByName("_bullets").getChildByName("_label").getComponent(cc.Label),
                        t = this._data.additionalSpin.length == 0 ? 0 : this._data.additionalSpin[0].swi.length;
                    e.string = (1 + t).toString(), e._updateRenderData(!0)
                }, t.prototype.initBet = function () {
                    var e = this.node.getChildByName("_col4"),
                        t = e.getChildByName("_bet").getChildByName("_label"),
                        o = e.getChildByName("_bet").getChildByName("_currency"),
                        n = t.getComponent(cc.Label),
                        i = o.getComponent(cc.Label),
                        r = a.default.getRealMoney(this._data.totalWager);
                    n.string = a.default.numberFormat(r.rmp), i.string = r.cy, n._updateRenderData(!0), i._updateRenderData(!0);
                    var s = this.getCurrencyOffset();
                    r.isbehind ? o.x = t.x + o.width / 2 + 10 : o.x = t.x - t.getContentSize().width - o.width / 2 - 10, o.y += s.y
                }, t.prototype.initWinScore = function () {
                    var e = this.node.getChildByName("_col5"),
                        t = e.getChildByName("_winscore").getChildByName("_label"),
                        o = e.getChildByName("_winscore").getChildByName("_currency"),
                        n = t.getComponent(cc.Label),
                        i = o.getComponent(cc.Label),
                        r = a.default.getRealMoney(this._data.totalWager),
                        s = a.default.getRealMoney(this._data.totalWin),
                        c = Math.round(100 * (s.rmp - r.rmp)) / 100;
                    n.string = a.default.numberFormat(c.toString()), i.string = s.cy, n._updateRenderData(!0), i._updateRenderData(!0);
                    var l = this.getCurrencyOffset();
                    s.isbehind ? o.x = t.x + o.width / 2 + 10 : o.x = t.x - t.getContentSize().width - o.width / 2 - 10, o.y += l.y
                }, t.prototype.getCurrencyOffset = function () {
                    return r.default.urlParse().cr == "VND" ? {
                        x: 0,
                        y: 10
                    } : {
                        x: 0,
                        y: 6
                    }
                }, t = i([c], t)
            }(cc.Component));
        o.default = l, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper",
        "../../Utils/RealMoneyPlatform": "RealMoneyPlatform"
    }],
    RotationXY: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "4f2a3t4ZShPsqpzK8ME3aGJ", "RotationXY");
        var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = function (e) {
                function t() {
                    return e !== null && e.apply(this, arguments) || this
                }
                return n(t, e), Object.defineProperty(t.prototype, "rotationX", {
                    get: function () {
                        return this.node.rotationX
                    },
                    set: function (e) {
                        this.node.rotationX = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "rotationY", {
                    get: function () {
                        return this.node.rotationY
                    },
                    set: function (e) {
                        this.node.rotationY = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.start = function () { }, i([s({
                    type: cc.Integer
                })], t.prototype, "rotationX", null), i([s({
                    type: cc.Integer
                })], t.prototype, "rotationY", null), t = i([a], t)
            }(cc.Component);
        o.default = c, cc._RF.pop()
    }, {}],
    ScanAnimation: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "dc9a3bPB/FF7Y31/6GDFCq3", "ScanAnimation");
        var n = this && this.__extends || function () {
            var e = function (t, o) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                    })(t, o)
            };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t.rotationRate = 5, t._ndScan = null, t
                }
                return n(t, e), t.prototype.onLoad = function () {
                    this._ndScan = this.node.getChildByName("_ndScan")
                }, t.prototype.doAnimation = function () {
                    this._ndScan && (this._ndScan.angle -= this.rotationRate)
                }, t.prototype.update = function (e) {
                    this.doAnimation()
                }, i([s], t.prototype, "rotationRate", void 0), t = i([a], t)
            }(cc.Component);
        o.default = c, cc._RF.pop()
    }, {}],
    SearchTableViewControl: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "b9a0fAoxeFEv7V5s//78YNU", "SearchTableViewControl");
        var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("../uikiller/Thor")),
            c = e("../Components/Model/TableSearchStorage"),
            l = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t._tableSearchStorage = null, t._isShow = !1, t._isMatchComplete = !1, t
                }
                return n(t, e), t.prototype.onLoad = function () {
                    this._showHideChildren(!1), this._tableSearchStorage = this.node.getComponent(c.default)
                }, t.prototype.checkShow = function () {
                    this._tableSearchStorage && this._tableSearchStorage.doSearching && (this._isShow || this._showHideChildren(!0))
                }, t.prototype.checkHide = function () {
                    this._tableSearchStorage && !this._tableSearchStorage.doSearching && this._isShow && (this._showHideChildren(!1), this._isMatchComplete = !1)
                }, t.prototype.update = function (e) {
                    this.checkShow(), this.checkHide()
                }, t.prototype._showHideChildren = function (e) {
                    for (var t = this.node.children, o = 0; o < t.length; o++) { t[o].active = e; }
                    this._isShow = e
                }, t = i([a], t)
            }(s.default);
        o.default = l, cc._RF.pop()
    }, {
        "../Components/Model/TableSearchStorage": "TableSearchStorage",
        "../uikiller/Thor": "Thor"
    }],
    SeedRandom: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "4ea69YUNFlJFKfwt9AddjW9", "SeedRandom");
        var n = this && this.__decorate || function (e, t, o, n) {
            var i, r = arguments.length,
                a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
            else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
            return r > 3 && a && Object.defineProperty(t, o, a), a
        };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var i = cc._decorator,
            r = i.ccclass,
            a = (i.property, function () {
                function e() { }
                var t;
                return t = e, e.random = function (e, o) {
                    return o = o || 1, e = e || 0, t.seed = (9301 * t.seed + 49297) % 233280, e + t.seed / 233280 * (o - e)
                }, e.seed = Date.now(), e = t = n([r], e)
            }());
        o.default = a, cc._RF.pop()
    }, {}],
    SpriteFrameSet: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "97019Q80jpE2Yfz4zbuCZBq", "SpriteFrameSet");
        var n = cc.Class({
            name: "SpriteFrameSet",
            properties: {
                language: "",
                spriteFrame: cc.SpriteFrame
            }
        });
        t.exports = n, cc._RF.pop()
    }, {}],
    StartSearchTableForPlayView: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "01f7fh/q2dNVYhwd2yL4pm7", "StartSearchTableForPlayView");
        var n = this && this.__extends || function () {
            var e = function (t, o) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                    })(t, o)
            };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = e("../../Utils/Pair"),
            l = e("../../Components/Business/AudioManage"),
            u = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t.searchParams = [], t
                }
                return n(t, e), t.prototype.init = function (e, t, o) {
                    this.node.on(cc.Node.EventType.TOUCH_END, function (t) {
                        l.default.getInstance().playEnterRoom(o), e(t)
                    }, this), window.osdevice.isMobile || (this.node.on(cc.Node.EventType.MOUSE_MOVE, this.onShowLight, this), this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onCloseLight, this))
                }, t.prototype.onShowLight = function () {
                    this.node.runAction(cc.scaleTo(.1, 1.1))
                }, t.prototype.onCloseLight = function () {
                    this.node.runAction(cc.scaleTo(.1, 1))
                }, i([s({
                    type: c
                })], t.prototype, "searchParams", void 0), t = i([a], t)
            }(cc.Component);
        o.default = u, cc._RF.pop()
    }, {
        "../../Components/Business/AudioManage": "AudioManage",
        "../../Utils/Pair": "Pair"
    }],
    StartSearchTable: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "9e2b6R8U5hFmoGf+9Xm7w8J", "StartSearchTable");
        var n = this && this.__extends || function () {
            var e = function (t, o) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                    })(t, o)
            };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = e("../Model/TableSearchStorage"),
            l = e("../../Utils/Pair"),
            u = e("../../Components/Business/AudioManage"),
            p = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t.searchParams = [], t._tableSearchStorage = null, t
                }
                return n(t, e), t.prototype.onLoad = function () {
                    this.node.on(cc.Node.EventType.TOUCH_END, this.onHandle, this), window.osdevice.isMobile || (this.node.on(cc.Node.EventType.MOUSE_MOVE, this.onShowLight, this), this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onCloseLight, this)), this._tableSearchStorage = this.node.getComponent(c.default)
                }, t.prototype.onHandle = function () {
                    if (this._tableSearchStorage) {
                        var e = {};
                        e[this.searchParams[0].key] = parseInt(this.searchParams[0].value), this._tableSearchStorage.searchParams = e, this._tableSearchStorage.startSearch = !0, this.node.getParent().getParent().getChildByName("_selecttext").active = !1, this.node.getParent().active = !1, u.default.getInstance().playEnterRoom(e.level)
                    }
                }, t.prototype.onShowLight = function () {
                    this.node.runAction(cc.scaleTo(.1, 1.1))
                }, t.prototype.onCloseLight = function () {
                    this.node.runAction(cc.scaleTo(.1, 1))
                }, t.CURRENCY_LABEL_TAG_NAME = "CURRENCY_LABEL", i([s({
                    type: l
                })], t.prototype, "searchParams", void 0), t = i([a], t)
            }(cc.Component);
        o.default = p, cc._RF.pop()
    }, {
        "../../Components/Business/AudioManage": "AudioManage",
        "../../Utils/Pair": "Pair",
        "../Model/TableSearchStorage": "TableSearchStorage"
    }],
    TableSearchStorage: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "d248esxR7lPlpa7lsTRnOZj", "TableSearchStorage");
        var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, function (e) {
                function t() {
                    return e !== null && e.apply(this, arguments) || this
                }
                var o;
                return n(t, e), o = t, Object.defineProperty(t.prototype, "changeRoom", {
                    get: function () {
                        return o._changeRoom
                    },
                    set: function (e) {
                        o._changeRoom = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "startSearch", {
                    get: function () {
                        return o._startSearch
                    },
                    set: function (e) {
                        o._startSearch = e, e && (o._doSearching = !0)
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "searchParams", {
                    get: function () {
                        return o._searchParams
                    },
                    set: function (e) {
                        o._searchParams = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "startCreate", {
                    get: function () {
                        return o._startCreate
                    },
                    set: function (e) {
                        o._startCreate = e, e && (o._doSearching = !0)
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "doSearching", {
                    get: function () {
                        return o._doSearching
                    },
                    set: function (e) {
                        o._doSearching = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "tableInfo", {
                    get: function () {
                        return o._tableInfo
                    },
                    set: function (e) {
                        o._tableInfo = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "playersInfo", {
                    get: function () {
                        return o._playersInfo
                    },
                    set: function (e) {
                        o._playersInfo = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "sitDownReq", {
                    get: function () {
                        return o._sitDownReq
                    },
                    set: function (e) {
                        o._sitDownReq = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "standUpReq", {
                    get: function () {
                        return o._standUpReq
                    },
                    set: function (e) {
                        o._standUpReq = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "quitGameReq", {
                    get: function () {
                        return o._quitGameReq
                    },
                    set: function (e) {
                        o._quitGameReq = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), t._startSearch = !1, t._searchParams = {}, t._startCreate = !1, t._doSearching = !1, t._tableInfo = null, t._playersInfo = null, t._sitDownReq = !1, t._standUpReq = !1, t._quitGameReq = !1, t._changeRoom = !1, t = o = i([a], t)
            }(cc.Component));
        o.default = s, cc._RF.pop()
    }, {}],
    TableSearch: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "1781aH1jwFA9b1sIgGBtb96", "TableSearch");
        var n = this && this.__extends || function () {
            var e = function (t, o) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                    })(t, o)
            };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("../Model/TableSearchStorage")),
            c = e("../Model/NetConnector"),
            l = e("../../Config/Config"),
            u = e("../Model/BusinessStorage"),
            p = e("../Model/WalletStorage"),
            h = e("../Model/PromptDialogStorage"),
            f = e("../../Utils/RealMoneyPlatform"),
            d = e("../Model/UserInfoStorage"),
            _ = e("../../Utils/CCHelper"),
            g = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t._tableSearchStorage = null, t._netConnector = null, t._isPending = !1, t._initOnPushMsg = !1, t._businessStorage = null, t._walletStorage = null, t._userInfo = null, t
                }
                return n(t, e), t.prototype.onLoad = function () {
                    this._tableSearchStorage = this.node.getComponent(s.default), this._netConnector = this.node.getComponent(c.default), this._businessStorage = this.node.getComponent(u.default), this._walletStorage = this.node.getComponent(p.default), this._userInfo = this.node.getComponent(d.default), f.default.walletInfo = this.node.getComponent(p.default)
                }, t.prototype.doSearchHandle = function () {
                    var e = this;
                    this._tableSearchStorage && this._netConnector && this._netConnector.socketConnector && this._tableSearchStorage.startSearch && !this._isPending && (cc.log("start searching Table "), this._tableSearchStorage.changeRoom && (this._tableSearchStorage.tableInfo = null, this._tableSearchStorage.playersInfo = null, this._businessStorage.clearAllData(), this._tableSearchStorage.changeRoom = !1), this._isPending = !0, this._netConnector.socketConnector.request(l.default.pomeloRoute.searchTable, c.default.makeWsPacket(this._tableSearchStorage.searchParams), function (t) {
                        e._isPending = !1, e._tableSearchStorage.startSearch = !1, !t || t.err ? (cc.log("searchTable error ", t), h.default.showMsg(l.default.ERR_CODE_OTHERS.toString())) : (cc.log("searchTable ", t), t.code == 200 ? (e._tableSearchStorage.tableInfo = t.data.table, e._tableSearchStorage.playersInfo = t.data.players, e._walletStorage.ratio = t.data.ratio ? t.data.ratio : 1, e._userInfo.roomLevel = t.data.roomLevel, e._userInfo.rmpcannonCost = _.default.getMyCannonCostList(t.data.rmpCannonCost, t.data.roomLevel)) : (e._tableSearchStorage.doSearching = !1, h.default.showMsg(l.default.ERR_CODE_OTHERS.toString())))
                    }))
                }, t.prototype.doCreateHandle = function () {
                    this._tableSearchStorage && this._netConnector && this._netConnector.socketConnector && this._tableSearchStorage.startCreate && this._isPending
                }, t.prototype.doSitDownRequest = function () {
                    this._tableSearchStorage && this._netConnector && this._netConnector.socketConnector && this._tableSearchStorage.sitDownReq && this._isPending
                }, t.prototype.doQuitGameRequest = function () {
                    var e = this;
                    this._tableSearchStorage && this._netConnector && this._netConnector.socketConnector && this._tableSearchStorage.quitGameReq && !this._isPending && (this._isPending = !0, this._netConnector.socketConnector.request(l.default.pomeloRoute.quitGame, c.default.makeWsPacket({}), function (t) {
                        e._tableSearchStorage.quitGameReq = !1, e._isPending = !1, !t || t.err ? (cc.log("quitGame error ", t), h.default.showMsg(l.default.ERR_CODE_OTHERS.toString())) : cc.log("quitGame ", t)
                    }))
                }, t.prototype.onPushMsg = function () {
                    var e = this;
                    this._initOnPushMsg || this._netConnector && this._netConnector.socketConnector && (this._initOnPushMsg = !0, this._netConnector.socketConnector.on(l.default.pomeloPushRoute.onKick, function (e) {
                        cc.log("onKick ", e), h.default.showMsg(l.default.ERR_CODE_KICK_LOGOUT.toString())
                    }), this._netConnector.socketConnector.on(l.default.pomeloPushRoute.joinTable, function (t) {
                        cc.log("onTableJoin ", t), e._tableSearchStorage.tableInfo = t.msg.table, e._tableSearchStorage.playersInfo = t.msg.players
                    }), this._netConnector.socketConnector.on(l.default.pomeloPushRoute.quitTable, function (t) {
                        cc.log("quitTable ", t), e._tableSearchStorage.tableInfo = t.msg.table, e._tableSearchStorage.playersInfo = t.msg.players
                    }), this._netConnector.socketConnector.on(l.default.pomeloPushRoute.sitDown, function (e) {
                        cc.log("onGameSitDown ", e)
                    }), this._netConnector.socketConnector.on(l.default.pomeloPushRoute.standUp, function (e) {
                        cc.log("onGameStandUp ", e)
                    }), this._netConnector.socketConnector.on(l.default.pomeloPushRoute.gameStart, function (t) {
                        if (cc.log("onGameStart ", t), e._businessStorage && (e._businessStorage.tableInfo = t.msg.table, e._businessStorage.playersInfo = t.msg.players, e._businessStorage.area = t.msg.area, e._businessStorage.areaPlayers = t.msg.areaPlayers, cc.log("game start area:", e._businessStorage.area), t.msg.playerId == e._userInfo.playerId)) {
                            e._businessStorage.startGame = !0;
                            for (var o = 0; o < e._businessStorage.playersInfo.length; o++) {
                                if (e._businessStorage.playersInfo[o].id == e._userInfo.playerId) {
                                    e._businessStorage.maxBetSetLen = e._businessStorage.playersInfo[o].cannonMaxLen;
                                    break
                                }
                            }
                        }
                    }), this._netConnector.socketConnector.on(l.default.pomeloPushRoute.gameEnd, function (t) {
                        cc.log("onGameEnd ", t), e._businessStorage && (e._businessStorage.gameFinish = !0)
                    }), this._netConnector.socketConnector.on(l.default.pomeloPushRoute.gameQuit, function (t) {
                        if (cc.log("gameQuit ", t), e._businessStorage) {
                            if (!e._businessStorage.tableInfo) { return void (h.default.isShow() || h.default.showMsg(l.default.ERR_CODE_SYSTEM.toString())); }
                            e._businessStorage.area = t.msg.area, e._businessStorage.areaPlayers = t.msg.areaPlayers;
                            for (var o = [], n = 0; n < t.msg.players.length; n++) {
                                for (var i = e._businessStorage.tableInfo.chairIds, r = e._businessStorage.playersInfo, a = 0; a < i.length; a++) {
                                    if (i[a] == t.msg.players[n].id) {
                                        e._businessStorage.tableInfo.chairIds[a] = "";
                                        break
                                    }
                                } for (var s in r) { r[s].id != t.msg.players[n].id && o.push(r[s]) }
                            }
                            e._businessStorage.playersInfo = o
                        }
                    }), this._netConnector.socketConnector.on(l.default.pomeloPushRoute.onFire, function (t) {
                        if (e._businessStorage) {
                            if (!e._businessStorage.startGame || u.default._playview._isHideDrop) { return; }
                            e._businessStorage.pushBullet(t.msg.bullet)
                        }
                    }), this._netConnector.socketConnector.on(l.default.pomeloPushRoute.onColliderResult, function (t) {
                        if (e._businessStorage) {
                            if (!e._businessStorage.startGame) { return; }
                            if (e._businessStorage.pushColliderResult(t.msg), e._userInfo.playerId == t.msg.player.id && t.msg.player.rmpRatioCredit > 0) {
                                var o = f.default.getRealMoney(f.default.convertCentsToCredits(t.msg.player.rmpRatioCredit));
                                e._userInfo.gold = o.rmp
                            }
                        }
                    }), this._netConnector.socketConnector.on(l.default.pomeloPushRoute.onUpdateBalance, function (t) {
                        if (cc.log("onUpdateBalance ", t), e._businessStorage) {

                            if (!e._businessStorage.startGame) { return; }
                            if (e._userInfo.playerId == t.msg.pid) {
                                var o = f.default.getRealMoney(f.default.convertCentsToCredits(t.msg.balance));
                                e._userInfo.gold = o.rmp

                            }
                        }
                    }), this._netConnector.socketConnector.on(l.default.pomeloPushRoute.onUpdateWallet, function (t) {
                        if (cc.log("onUpdateWallet ", t), e._businessStorage && e._userInfo.playerId == t.msg.playerId) {
                            var o = f.default.getRealMoney(f.default.convertCentsToCredits(t.msg.amount));
                            e._userInfo.gold = o.rmp
                        }
                    }), this._netConnector.socketConnector.on(l.default.pomeloPushRoute.onUpdateCannon, function (t) {
                        if (cc.log("onUpdateCannon ", t), e._businessStorage) {
                            if (!e._businessStorage.startGame) { return; }
                            for (var o = e._businessStorage.areaPlayers, n = 0; n < o.length; n++) {
                                if (o[n].playerId == t.msg.areaPlayer.playerId) {
                                    o[n] = t.msg.areaPlayer, o[n].playerId == e._userInfo.playerId && (e._businessStorage.maxBetSetLen = o[n].cannonMaxLen);
                                    break
                                }
                            }
                        }
                    }), this._netConnector.socketConnector.on(l.default.pomeloPushRoute.onBulletBomb, function (t) {
                        if (e._businessStorage) {
                            if (!e._businessStorage.startGame) { return; }
                            e._businessStorage.pushColliderResult(t.msg.bullets)
                        }
                    }), this._netConnector.socketConnector.on(l.default.pomeloPushRoute.onSpawnFishes, function (t) {
                        if (e._businessStorage) {
                            if (!e._businessStorage.startGame || u.default._playview._isHideDrop) { return; }
                            if (e._businessStorage.battleBoss && (e._businessStorage.battleBoss = !1), e._businessStorage.area.stage && (e._businessStorage.area.stage = l.default.consts.AREA_STAGE_NORMAL), e._businessStorage.pushFishes(t.msg.fishes), u.default._playview && u.default._playview._hideStarttime != 0) {
                                var o = (new Date).getTime() - u.default._playview._hideStarttime;
                                if (!u.default._playview) { return; }
                                var n = o / 1e3;
                                u.default._playview.update(n), u.default._playview._onHideUpdate(n), u.default._playview._hideStarttime = (new Date).getTime(), u.default._playview._onHideStackTime(o), u.default._playview.hideDrawCheck()
                            }
                        }
                    }), this._netConnector.socketConnector.on(l.default.pomeloPushRoute.onSpawnGroup, function (t) {
                        if (e._businessStorage) {
                            if (!e._businessStorage.startGame || u.default._playview._isHideDrop) { return; }
                            e._businessStorage.battleBoss = !0, e._businessStorage.area.stage = l.default.consts.AREA_STAGE_GROUP;
                            var o = t.msg.group;
                            o.fishes = t.msg.fishes, e._businessStorage.pushFishes(o)
                        }
                    }), this._netConnector.socketConnector.on(l.default.pomeloPushRoute.onChangeScene, function (t) {
                        if (e._businessStorage) {
                            if (!e._businessStorage.startGame) { return; }
                            e._businessStorage.changeScene = !0, e._businessStorage.sceneId = t.msg.scene
                        }
                    }), this._netConnector.socketConnector.on(l.default.pomeloPushRoute.onSyncMovePos, function (t) {
                        if (e._businessStorage) {
                            if (!e._businessStorage.startGame) { return; }
                            e._businessStorage.syncMovePosQueue = t.msg
                        }
                    }), this._netConnector.socketConnector.on(l.default.pomeloPushRoute.onSpawnBoss, function (t) {
                        if (e._businessStorage) {
                            if (!e._businessStorage.startGame || u.default._playview._isHideDrop) { return; }
                            for (var o in e._businessStorage.nowBossName = t.msg.bossId, e._businessStorage.bossQueue = {
                                bossId: t.msg.bossId,
                                opt: t.msg.bossOpt
                            }, t.msg.soldiers) { e._businessStorage.bossSoldierQueue = t.msg.soldiers[o]; }
                            cc.log(e._businessStorage.bossSoldierQueue)
                        }
                    }))
                }, t.prototype.update = function (e) {
                    this.doSearchHandle(), this.onPushMsg()
                }, t = i([a], t)
            }(cc.Component);
        o.default = g, cc._RF.pop()
    }, {
        "../../Config/Config": "Config",
        "../../Utils/CCHelper": "CCHelper",
        "../../Utils/RealMoneyPlatform": "RealMoneyPlatform",
        "../Model/BusinessStorage": "BusinessStorage",
        "../Model/NetConnector": "NetConnector",
        "../Model/PromptDialogStorage": "PromptDialogStorage",
        "../Model/TableSearchStorage": "TableSearchStorage",
        "../Model/UserInfoStorage": "UserInfoStorage",
        "../Model/WalletStorage": "WalletStorage"
    }],
    TextButton: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "edf84qoIl9Ae72B3F8GFcHp", "TextButton");
        var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = e("../../Utils/CCHelper"),
            l = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t.normalColor = cc.color(0, 0, 0), t.disableColor = cc.color(255, 255, 255), t._data = null, t._isInit = !1, t._enable = !0, t
                }
                var o;
                return n(t, e), o = t, t.prototype.onLoad = function () {
                    this._addToggleComponent(), this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this)
                }, t.prototype.setText = function (e) {
                    var t = this.node.getChildByName("_text");
                    t || (t = this._addToggleComponent());
                    var o = t.getComponent(cc.Label);
                    o && (o.string = e), this._enable ? t.color = this.normalColor : t.color = this.disableColor
                }, t.prototype.setData = function (e) {
                    this._data = e
                }, t.prototype.getData = function () {
                    return this._data
                }, t.prototype.enabledButton = function (e) {
                    this._enable = e;
                    var t = this.node.getComponent(cc.Button);
                    t && (t.interactable = e);
                    var o = this.node.getChildByName("_text");
                    o.color = e ? this.normalColor : this.disableColor
                }, t.prototype._addToggleComponent = function () {
                    var e = this.node.getChildByName("_text");
                    return e || ((e = new cc.Node("_text")).addComponent(cc.Label), this.node.addChild(e)), e
                }, t.prototype._onTouchEnd = function () {
                    this._enable && c.default.dispatchEvent(this.node, o.EVENT, cc.Node.EventType.TOUCH_END, this)
                }, t.EVENT = "TextButton", i([s({
                    type: cc.Color
                })], t.prototype, "normalColor", void 0), i([s({
                    type: cc.Color
                })], t.prototype, "disableColor", void 0), t = o = i([a], t)
            }(cc.Component);
        o.default = l, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper"
    }],
    Thor: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "a24b5qC2zpMabUJAoI3Q3lt", "Thor");
        var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = e("./uikiller"),
            a = cc._decorator,
            s = a.ccclass,
            c = a.executeInEditMode,
            l = function (t) {
                function o() {
                    var e = t !== null && t.apply(this, arguments) || this;
                    return e.useController = !1, e.controllerName = "", e._$ = null, e._bindHammer = !1, e.$controller = null, e
                }
                return n(o, t), o.prototype.__preload = function () {
                    this.bindHammer(), this.addEventListen()
                }, o.prototype.getOptions = function () {
                    return {
                        debug: !1
                    }
                }, o.prototype.bindHammer = function () {
                    if (!this._bindHammer) {
                        this._bindHammer = !0;
                        Date.now();
                        var e = this.getOptions();
                        this._$ = this, r.bindComponent(this, e), this.bindController()
                    }
                }, o.prototype.bindController = function () {
                    if (this.useController) {
                        var t = this.controllerName || this.__classname__ + "Controller",
                            o = e(t);
                        this.$controller = new o.default, r.bindNode(this.node, this.$controller)
                    }
                }, o.prototype.getChildNode = function (e) {
                    return this[e]
                }, o.prototype.addEventListen = function () {
                    this.node.on("child-added", this._onSomeChildAdd, this), this.node.on("child-removed", this._onSomeChildRemove, this)
                }, o.prototype._onSomeChildAdd = function (e) { }, o.prototype._onSomeChildRemove = function (e) { }, o = i([s, c], o)
            }(cc.Component);
        o.default = l, window.Thor = l, cc._RF.pop()
    }, {
        "./uikiller": "uikiller"
    }],
    ToggleText: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "d9fdbLI4pJLg5OR4uPyjZfd", "ToggleText");
        var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = e("../../Utils/CCHelper"),
            l = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t.defaultColor = cc.color(255, 255, 255), t.highlightClr = cc.color(0, 0, 0), t._data = null, t._preState = null, t
                }
                var o;
                return n(t, e), o = t, t.prototype.onLoad = function () {
                    this._addToggleComponent(), this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this)
                }, Object.defineProperty(t.prototype, "text", {
                    get: function () {
                        var e = this.node.getChildByName("_text");
                        return e ? e.getComponent(cc.Label).string : ""
                    },
                    set: function (e) {
                        var t = this.node.getChildByName("_text");
                        t && (t.getComponent(cc.Label).string = e)
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.setData = function (e) {
                    this._data = e
                }, t.prototype.getData = function () {
                    return this._data
                }, t.prototype._addToggleComponent = function () {
                    var e = this.node.getComponent(cc.Toggle);
                    e || (e = this.node.addComponent(cc.Toggle));
                    var t = this.node.getChildByName("_checkmask");
                    t && (e.checkMark = t.getComponent(cc.Sprite)), e.isChecked = !1, e.interactable = !0
                }, t.prototype.check = function () {
                    var e = this.node.getComponent(cc.Toggle);
                    e && e.check()
                }, t.prototype.uncheck = function () {
                    var e = this.node.getComponent(cc.Toggle);
                    e && e.uncheck()
                }, t.prototype._onTouchEnd = function () {
                    c.default.dispatchEvent(this.node, o.EVENT, cc.Node.EventType.TOUCH_END, this)
                }, t.prototype.update = function (e) {
                    var t = this.node.getComponent(cc.Toggle);
                    if (this._preState == null || this._preState != t.isChecked) {
                        this._preState = t.isChecked;
                        var o = this.node.getChildByName("_text");
                        t.isChecked ? o.color = this.highlightClr : o.color = this.defaultColor
                    }
                }, t.EVENT = "ToggleText", i([s({
                    type: cc.Color
                })], t.prototype, "defaultColor", void 0), i([s({
                    type: cc.Color
                })], t.prototype, "highlightClr", void 0), t = o = i([a], t)
            }(cc.Component);
        o.default = l, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper"
    }],
    TwLoginLocal: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "69363uu56NEo4YLBc7GSxmW", "TwLoginLocal");
        var n = this && this.__extends || function () {
            var e = function (t, o) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                    })(t, o)
            };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("../Model/UserInfoStorage")),
            c = e("../../Utils/CCHelper"),
            l = e("../Model/PromptDialogStorage"),
            u = e("../Model/WalletStorage"),
            p = e("../../Utils/RealMoneyPlatform"),
            h = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t.ssoRequestPacket = null, t._userInfoStorage = null, t._walletStorage = null, t._tryCount = 0, t
                }
                return n(t, e), t.prototype.onLoad = function () {
                    this._userInfoStorage = this.node.getComponent(s.default), this._walletStorage = this.node.getComponent(u.default), p.default.walletInfo = this.node.getComponent(u.default), this.checkUserInfo()
                }, t.prototype.checkUserInfo = function () {
                    var e = c.default.urlParse();
                    e.loginType = "web", e.m == 1 && (e.u = "G-" + Math.floor(1e8 * Math.random()) + 0), e.uid = e.u, e.loginType == "web" && (this.ssoRequestPacket = e)
                }, t.prototype.loginSuccess = function (e) {
                    this._tryCount = 0, this.ssoRequestPacket = null;
                    var t = e.playerId || e.openId;
                    if (cc.sys.localStorage.setItem("uid", t), this._userInfoStorage && (this._userInfoStorage.nickName = e.nickName, this._userInfoStorage.openId = e.openId, this._userInfoStorage.avatarUrl = e.avatarUrl, this._userInfoStorage.token = e.token, this._userInfoStorage.isLogin = !0, this._userInfoStorage.playerId = e.playerId ? e.playerId : "", this._userInfoStorage.gold = e.rmpCredit, this._userInfoStorage.money = e.rmpCredit), this._walletStorage && (this._walletStorage.currentDenomination = e.denom, this._walletStorage.currencyFractionDigits = e.currencyFractionDigits, this._walletStorage.currencySymbol = e.currencySymbol, this._walletStorage.currencySymbolInBack = e.currencySymbolInBack, this._walletStorage.thousandsGroupingSeparator = e.thousandGroupingSepartor, this._walletStorage.decimalSeparator = e.decimalSeparator), this._userInfoStorage) {
                        for (var o = [], n = 0; n < e.rmpCannonCost.length; n++) {
                            var i = p.default.getRealMoney(e.rmpCannonCost[n]);
                            o.push(i)
                        }
                        this._userInfoStorage.roomlevelCost = o
                    }
                    c.default.setRecommendData(e)
                }, t.prototype.loginFailed = function (e) {
                    l.default.showMsg(e.code), this.ssoRequestPacket = null
                }, t.prototype.retryLogin = function (e) {
                    this.ssoRequestPacket = null, this._tryCount <= 3 && ++this._tryCount, this._tryCount > 3 ? l.default.showMsg(e.code) : this.checkUserInfo()
                }, t = i([a], t)
            }(cc.Component);
        o.default = h, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper",
        "../../Utils/RealMoneyPlatform": "RealMoneyPlatform",
        "../Model/PromptDialogStorage": "PromptDialogStorage",
        "../Model/UserInfoStorage": "UserInfoStorage",
        "../Model/WalletStorage": "WalletStorage"
    }],
    TwLoginWsConnector: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "36e0e/zoU9DObW74es/pgoz", "TwLoginWsConnector");
        var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, e("./TwLoginLocal")),
            c = e("../../Config/Config"),
            l = e("../Model/NetConnector"),
            u = e("../../Utils/CCHelper"),
            p = function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t._twLoginLocal = null, t._netConnector = null, t._delayLogin = !1, t._delaytime = 0, t
                }
                return n(t, e), t.prototype.onLoad = function () {
                    this._twLoginLocal = this.node.getComponent(s.default), this._netConnector = this.node.getComponent(l.default)
                }, t.prototype.loginRequest = function () {
                    var e = this;
                    if (this._twLoginLocal && this._twLoginLocal.ssoRequestPacket && this._netConnector && this._netConnector.socketConnector) {
                        var t = this._netConnector.socketConnector;
                        e._twLoginLocal.ssoRequestPacket.appId = c.default.appId, e._twLoginLocal.ssoRequestPacket.gameId = c.default.gameId, e._twLoginLocal.ssoRequestPacket.isSpecialRoomMode = u.default.IsSpecialRoomMode(), t.request(c.default.pomeloRoute.twLogin, e._twLoginLocal.ssoRequestPacket, function (t) {
                            !t || t.err ? (cc.log("login error ", t), t.err === 105 ? e._delayLogin = !0 : e._twLoginLocal.loginFailed(t)) : (cc.log("login ", t), t.code === 200 ? (e._twLoginLocal.loginSuccess(t.data), t.data.token && (e._netConnector.jwtToken = t.data.token)) : e._twLoginLocal.retryLogin(t))
                        })
                    }
                }, t.prototype.doMock = function () { }, t.prototype.update = function (e) {
                    if (this._twLoginLocal && this._twLoginLocal.ssoRequestPacket && this._netConnector && this._netConnector.socketConnector) {
                        if (this._delaytime < 1) { return void (this._delaytime += e); }
                        this._delaytime = 0, this._delayLogin = !1, this.loginRequest(), this._twLoginLocal.ssoRequestPacket = null
                    }
                    this.doMock()
                }, t = i([a], t)
            }(cc.Component);
        o.default = p, cc._RF.pop()
    }, {
        "../../Config/Config": "Config",
        "../../Utils/CCHelper": "CCHelper",
        "../Model/NetConnector": "NetConnector",
        "./TwLoginLocal": "TwLoginLocal"
    }],
    UserInfoStorage: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "6a583kzC/tM9rcNH/utUwEH", "UserInfoStorage");
        var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, function (e) {
                function t() {
                    return e !== null && e.apply(this, arguments) || this
                }
                var o;
                return n(t, e), o = t, Object.defineProperty(t.prototype, "roomlevelCost", {
                    get: function () {
                        return o._roomlevelCost
                    },
                    set: function (e) {
                        o._roomlevelCost = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "rmpcannonCost", {
                    get: function () {
                        return o._rmpcannonCost
                    },
                    set: function (e) {
                        o._rmpcannonCost = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "roomLevel", {
                    get: function () {
                        return o._roomLevel
                    },
                    set: function (e) {
                        o._roomLevel = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "isLogin", {
                    get: function () {
                        return o._isLogin
                    },
                    set: function (e) {
                        o._isLogin = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "nickName", {
                    get: function () {
                        return o._nickName
                    },
                    set: function (e) {
                        o._nickName = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "openId", {
                    get: function () {
                        return o._openId
                    },
                    set: function (e) {
                        o._openId = e, o._getShareMessage().id = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "avatarUrl", {
                    get: function () {
                        return o._avatarUrl
                    },
                    set: function (e) {
                        o._avatarUrl = e, o._getShareMessage().hd = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "token", {
                    get: function () {
                        return o._token
                    },
                    set: function (e) {
                        o._token = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "gold", {
                    get: function () {
                        return o._gold
                    },
                    set: function (e) {
                        if (e != o._gold) {
                            try {
                                window.parent && window.parent.postMessage({ type: 'balanceChange', newBalance: e, oldBalance: o._gold, }, '*')
                            } catch (z) { console.log(z) }
                        }
                        o._gold = e

                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "playerId", {
                    get: function () {
                        return o._playerId
                    },
                    set: function (e) {
                        o._playerId = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "money", {
                    get: function () {
                        return o._money
                    },
                    set: function (e) {
                        console.log('set ', e)
                        o._money = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "shareMessage", {
                    get: function () {
                        return o._shareMessage
                    },
                    enumerable: !0,
                    configurable: !0
                }), t._getShareMessage = function () {
                    return o._shareMessage || (o._shareMessage = {}), o._shareMessage
                }, t._isLogin = !1, t._nickName = "", t._openId = "", t._avatarUrl = "", t._token = "", t._gold = 0, t._playerId = "", t._money = 0, t._roomLevel = 0, t._rmpcannonCost = [], t._roomlevelCost = [], t._shareMessage = null, t = o = i([a], t)
            }(cc.Component));
        o.default = s, cc._RF.pop()
    }, {}],
    WalletStorage: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "e24bdWWvsJJxqc/0vHZIZL/", "WalletStorage");
        var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, function (e) {
                function t() {
                    return e !== null && e.apply(this, arguments) || this
                }
                var o;
                return n(t, e), o = t, Object.defineProperty(t.prototype, "currentDenomination", {
                    get: function () {
                        return o._currentDenomination
                    },
                    set: function (e) {
                        o._currentDenomination = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "currencySymbol", {
                    get: function () {
                        return o._currencySymbol
                    },
                    set: function (e) {
                        o._currencySymbol = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "currencySymbolInBack", {
                    get: function () {
                        return o._currencySymbolInBack
                    },
                    set: function (e) {
                        o._currencySymbolInBack = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "thousandsGroupingSeparator", {
                    get: function () {
                        return o._thousandsGroupingSeparator
                    },
                    set: function (e) {
                        o._thousandsGroupingSeparator = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "decimalSeparator", {
                    get: function () {
                        return o._decimalSeparator
                    },
                    set: function (e) {
                        o._decimalSeparator = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "currencyFractionDigits", {
                    get: function () {
                        return o._currencyFractionDigits
                    },
                    set: function (e) {
                        o._currencyFractionDigits = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "balanceMeterConfig", {
                    get: function () {
                        return o._balanceMeterConfig
                    },
                    set: function (e) {
                        o._balanceMeterConfig = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "exchangeRatio", {
                    get: function () {
                        return o._exchangeRatio
                    },
                    set: function (e) {
                        o._exchangeRatio = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "exchangeScore", {
                    get: function () {
                        return o._exchangeScore
                    },
                    set: function (e) {
                        o._exchangeScore = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "credit", {
                    get: function () {
                        return o._credit
                    },
                    set: function (e) {
                        o._credit = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "score", {
                    get: function () {
                        return o._score
                    },
                    set: function (e) {
                        o._score = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "showExchangeUi", {
                    get: function () {
                        return o._showExchangeUi
                    },
                    set: function (e) {
                        o._showExchangeUi = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.getSelection = function () {
                    return o._selection
                }, Object.defineProperty(t.prototype, "ratio", {
                    get: function () {
                        return o._ratio
                    },
                    set: function (e) {
                        o._ratio = e
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.getCPS = function () {
                    return o._score * o._ratio * o._currentDenomination
                }, t.convertToCps = function (e, t) {
                    return e
                }, t._exchangeRatio = 0, t._exchangeScore = 0, t._credit = 0, t._score = 0, t._showExchangeUi = !1, t._selection = 1, t._ratio = 1, t._currencySymbol = null, t._currencySymbolInBack = !1, t._thousandsGroupingSeparator = ",", t._decimalSeparator = ".", t._currencyFractionDigits = 2, t._balanceMeterConfig = 0, t._currentDenomination = 1, t = o = i([a], t)
            }(cc.Component));
        o.default = s, cc._RF.pop()
    }, {}],
    WebViewGameRecall: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "ea5adhOOGZM+LOyOfOa7ELT", "WebViewGameRecall");
        var n = this && this.__extends || function () {
            var e = function (t, o) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                        e.__proto__ = t
                    } || function (e, t) {
                        for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                    })(t, o)
            };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t.webview = null, t
                }
                var o;
                return n(t, e), o = t, t.prototype.onLoad = function () {
                    var e = this;
                    o.instance = this, this.webview = this.node.getChildByName("_webView").getComponent(cc.WebView), this.webview.url = o.BLANK;
                    var t = this;
                    this.node.getChildByName("_closeBtn").on(cc.Node.EventType.TOUCH_END, function (n) {
                        t.webview.url = o.BLANK, e.useIOSWebView(!1), e.node.getChildByName("_closeBtn").active = !1, window.osdevice.iOS || (e.node.getChildByName("_webView").active = !1)
                    }), this.node.on(o.EVENT_OPEN, this.open, this)
                }, t.prototype.start = function () {
                    window.osdevice.iOS ? document.getElementById("Cocos2dGameContainer").children[1].style.zIndex = 5 : (document.getElementsByTagName("iframe")[0].style.zIndex = 5, this.node.getChildByName("_webView").active = !1);
                    this.useIOSWebView(!1);
                    var e = document.getElementsByClassName("gameCanvas")[0];
                    e.style.position = "relative", e.style.zIndex = 2, this.node.getChildByName("_closeBtn").active = !1
                }, t.prototype.open = function (e) {
                    this.useIOSWebView(!0), o.instance.node.getChildByName("_webView").active = !0;
                    var t = o.instance.node.getChildByName("_closeBtn");
                    t.x = o.instance.node.getChildByName("_webView").getContentSize().width / 2 - 45, t.y = o.instance.node.getChildByName("_webView").getContentSize().height / 2 + 50, t.active = !0, o.instance.webview.url = e
                }, t.getInstance = function () {
                    return o.instance
                }, t.prototype.disPatchEvent = function (e, t) {
                    o.instance.node.emit(e, t)
                }, t.prototype.useIOSWebView = function (e) {
                    if (window.osdevice.iOS) {
                        var t = document.getElementById("Cocos2dGameContainer").children;
                        t[1].style.zIndex = 5, t[1].style.display = e ? "block" : "none"
                    }
                }, t.EVENT_OPEN = "openGameRecall", t.BLANK = "about:blank", t.instance = null, t = o = i([a], t)
            }(cc.Component));
        o.default = s, cc._RF.pop()
    }, {}],
    WechatAvatarLoader: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "fe82c5tkZdBWa+0UrWPpV7N", "WechatAvatarLoader");
        var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            },
            r = this && this.__awaiter || function (e, t, o, n) {
                return new (o || (o = Promise))(function (i, r) {
                    function a(e) {
                        try {
                            c(n.next(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function s(e) {
                        try {
                            c(n.throw(e))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function c(e) {
                        e.done ? i(e.value) : new o(function (t) {
                            t(e.value)
                        }).then(a, s)
                    }
                    c((n = n.apply(e, t || [])).next())
                })
            },
            a = this && this.__generator || function (e, t) {
                var o, n, i, r, a = {
                    label: 0,
                    sent: function () {
                        if (1 & i[0]) { throw i[1]; }
                        return i[1]
                    },
                    trys: [],
                    ops: []
                };
                return r = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, typeof Symbol === "function" && (r[Symbol.iterator] = function () {
                    return this
                }), r;

                function s(e) {
                    return function (t) {
                        return c([e, t])
                    }
                }

                function c(r) {
                    if (o) { throw new TypeError("Generator is already executing."); }
                    for (; a;) {
                        try {
                            if (o = 1, n && (i = 2 & r[0] ? n.return : r[0] ? n.throw || ((i = n.return) && i.call(n), 0) : n.next) && !(i = i.call(n, r[1])).done) { return i; }
                            switch (n = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                case 0:
                                case 1:
                                    i = r;
                                    break;
                                case 4:
                                    return a.label++, {
                                        value: r[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++, n = r[1], r = [0];
                                    continue;
                                case 7:
                                    r = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (r[0] === 6 || r[0] === 2)) {
                                        a = 0;
                                        continue
                                    }
                                    if (r[0] === 3 && (!i || r[1] > i[0] && r[1] < i[3])) {
                                        a.label = r[1];
                                        break
                                    }
                                    if (r[0] === 6 && a.label < i[1]) {
                                        a.label = i[1], i = r;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(r);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            r = t.call(e, a)
                        } catch (e) {
                            r = [6, e], n = 0
                        } finally {
                            o = i = 0
                        }
                    }
                    if (5 & r[0]) { throw r[1]; }
                    return {
                        value: r[0] ? r[1] : void 0,
                        done: !0
                    }
                }
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var s = cc._decorator,
            c = s.ccclass,
            l = (s.property, e("es6-promise")),
            u = function (e) {
                function t() {
                    return e !== null && e.apply(this, arguments) || this
                }
                var o;
                return n(t, e), o = t, t.prototype.onLoad = function () { }, t.prototype.load = function (e, t) {
                    return r(this, void 0, void 0, function () {
                        var n, i;
                        return a(this, function (r) {
                            return n = this, e ? (i = e.substring(0, e.lastIndexOf("/") + 1) + "64", o._avatarCache[i] ? [2, o._avatarCache[i]] : [2, new l.Promise(function (e, r) {
                                n._loadRes(i, function (n) {
                                    n ? (t && (o._avatarCache[i] = n), e(n)) : e(null)
                                })
                            })]) : [2, null]
                        })
                    })
                }, t.prototype._loadRes = function (e, t) {
                    e ? cc.loader.load({
                        url: e,
                        type: "png"
                    }, function (e, o) {
                        e ? t && t(null) : t && t(o)
                    }) : t && t(null)
                }, t._avatarCache = {}, t = o = i([c], t)
            }(cc.Component);
        o.default = u, cc._RF.pop()
    }, {
        "es6-promise": 4
    }],
    WxWebOauth: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "21b92fae8JIq4aW3n42D/X3", "WxWebOauth");
        var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {
                __proto__: []
            }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var o in t) { t.hasOwnProperty(o) && (e[o] = t[o]) }
                };
            return function (t, o) {
                function n() {
                    this.constructor = t
                }
                e(t, o), t.prototype = o === null ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }(),
            i = this && this.__decorate || function (e, t, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { a = Reflect.decorate(e, t, o, n); }
                else { for (var s = e.length - 1; s >= 0; s--) { (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a); } }
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = e("../../Utils/CCHelper"),
            a = cc._decorator,
            s = a.ccclass,
            c = (a.property, function (e) {
                function t() {
                    var t = e !== null && e.apply(this, arguments) || this;
                    return t._urlParams = null, t._isComplete = !1, t
                }
                return n(t, e), t.prototype.onLoad = function () {
                    this._urlParams = r.default.urlParse()
                }, t = i([s], t)
            }(cc.Component));
        o.default = c, cc._RF.pop()
    }, {
        "../../Utils/CCHelper": "CCHelper"
    }],
    "cocos-help": [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "64762NugJpC/6ETW46GD8US", "cocos-help"), cc.createPrefab = function (e, t) {
            cc.loader.loadRes(e, cc.Prefab, function (e, o) {
                var n = null;
                e ? cc.error("createPrefab " + e) : n = cc.instantiate(o), t && t(e, n)
            })
        }, cc.Component.prototype.createNode = function (e, t, o) {
            var n = this;
            cc.log("createNode " + t), cc.createPrefab(t, function (t, i) {
                e instanceof cc.Node ? e.addChild(i) : n.node && n.node instanceof cc.Node && n.node.addChild(i, 0), o && o(i)
            })
        }, cc.Component.prototype.destroyNode = function () {
            this.node && this.node.destroy()
        }, cc.Node.prototype.hasComponent = function (e) {
            var t = this;
            return Array.isArray(e) || (e = [e]), !!e.find(function (e) {
                return t.getComponent(e)
            })
        }, cc.Sprite.prototype.getTextureFilename = function () {
            if (this.spriteFrame) {
                var e = this.spriteFrame._textureFilename,
                    t = e.indexOf("resources/");
                return e.substr(t + 10)
            }
            return ""
        }, cc.getSpriteFrameByAtlas = function (e, t) {
            var o = cc.path.mainFileName(e),
                n = cc.loader.getRes(o, cc.SpriteAtlas);
            return n ? n.getSpriteFrame(t) : null
        }, cc.createNodeComponent = function (e) {
            return (new cc.Node).addComponent(e)
        }, cc.Component.prototype.loadScene = function (e, t, o) {
            cc.director.loadScene(t, o)
        }, cc._RF.pop()
    }, {}],
    en: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "c178dxcKLNJfKddMNzyhVeR", "en"), window.i18n || (window.i18n = {}), window.i18n.languages || (window.i18n.languages = {}), window.i18n.languages.en = {
            "text.loading": "LOADING",
            "text.search": "SEARCHING",
            "text.ok": "OK",
            "text.cancel": "CANCEL",
            "text.playon": "Play On",
            "text.endgame": "End Game",
            "text.locktarget": "LOCK",
            "text.unlocktarget": "UNLOCK",
            "text.autofire": "AUTO",
            "text.autofire.stop": "STOP",
            "text.paytable": "PAY TABLE",
            "text.waitforplayer": "WAITING FOR PLAYER",
            "text.locking": "CLICK ON ENEMY TO ATTACK",
            "text.androidfullscreen": "Click the button above to turn on the full screen for the best visual experience!!",
            "text.recommend.title": "PLAY MORE KA GAMES",
            "text.reminder.optionmenu": "OPTION MENU",
            "text.reminder.lockfish": "LOCK TARGET",
            "text.reminder.autofire": "AUTO SHOOT",
            "text.reminder.clicktomove": "DRAG OR CLICK TO MOVE YOUR AIRCRAFT AND SHOOT",
            "text.recall.date": "DATE",
            "text.recall.tid": "ID",
            "text.recall.bullets": "BULLETS",
            "text.recall.totalwager": "BET",
            "text.recall.totalwin": "RESULT",
            "text.recall.title": "GAME RECORD",
            "text.recall.empty": "EMPTY DATA",
            "text.room.pick": "  ",
            "text.room.roomA": "BRONZE",
            "text.room.roomB": "SILVER",
            "text.room.roomC": "GOLD",
            "text.bossbattle.wait": "PLEASE WAIT FOR BOSS BATTLE TO END",
            "ask.logout": "Do you really want to exit the game?",
            "error.network": "A network error occurred. Please check your connection and reload.",
            "error.balance": "Your balance is insufficient to play the current bet. Please lower your bet and try again.",
            "error.kick": "Your session has been logged out. Please reload the page and try again.",
            "error.other": "Your balance is intact. Please reload and try again.",
            "fish.pt.inst.title": "SPACE CAT RULES",
            "fish.pt.inst.bosses": "BOSS BATTLE - When in a boss battle, each boss can be killed three times.",
            "fish.pt.inst.speedup": "SPEED UP - Wins of this BOX type will increase fire speed and multiply wins by 10x,15x,20x,25x,30x,35x,40x,45x,50x",
            "fish.pt.inst.lightning": "CHAIN WIN - Wins of this BOX type will cause a chain reaction and kill a random number of enemies on the screen.",
            "fish.pt.inst.bomb": "EMP BOMB - Wins of this BOX type will cause an EMP bomb to go off and pause all enemies on the screen."
        }, cc._RF.pop()
    }, {}],
    ja: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "1c976GXABpDK7qXZ97L9Hrd", "ja"), window.i18n || (window.i18n = {}), window.i18n.languages || (window.i18n.languages = {}), window.i18n.languages.ja = {
            "text.loading": "\u8aad\u307f\u8fbc\u307f\u4e2d",
            "text.search": "\u691c\u7d22\u4e2d",
            "text.ok": "\u30aa\u30c3\u30b1\u30fc",
            "text.cancel": "\u30ad\u30e3\u30f3\u30bb\u30eb",
            "text.playon": "\u30d7\u30ec\u30a4\u30aa\u30f3",
            "text.endgame": "\u30b2\u30fc\u30e0\u7d42\u4e86",
            "text.locktarget": "\u30ed\u30c3\u30af",
            "text.unlocktarget": "\u30ed\u30c3\u30af\u89e3\u9664",
            "text.autofire": "\u30aa\u30fc\u30c8",
            "text.autofire.stop": "\u30b9\u30c8\u30c3\u30d7",
            "text.paytable": "\u6575\u306e\u7a2e\u985e",
            "text.waitforplayer": "\u53c2\u52a0\u3092\u5f85\u3063\u3066\u3044\u307e\u3059",
            "text.locking": "\u653b\u6483\u3059\u308b\u306b\u306f\u6575\u3092\u30af\u30ea\u30c3\u30af\u3057\u3066\u304f\u3060\u3055\u3044",
            "text.androidfullscreen": "\u4e0a\u306e\u30dc\u30bf\u30f3\u3092\u30af\u30ea\u30c3\u30af\u3057\u3066\u5168\u753b\u9762\u3092\u958b\u304d\u3001\u6700\u9ad8\u54c1\u8cea\u306e\u8996\u899a\u4f53\u9a13\u3092\u4f53\u9a13\u3057\u3066\u304f\u3060\u3055\u3044!!",
            "text.recommend.title": "KA GAMES\u3092\u3082\u3063\u3068\u904a\u3076",
            "text.reminder.optionmenu": "\u30aa\u30d7\u30b7\u30e7\u30f3\u30e1\u30cb\u30e5\u30fc",
            "text.reminder.lockfish": "\u30bf\u30fc\u30b2\u30c3\u30c8\u3092\u30ed\u30c3\u30af",
            "text.reminder.autofire": "\u81ea\u52d5\u653b\u6483",
            "text.reminder.clicktomove": "DRAG OR CLICK TO MOVE YOUR AIRCRAFT AND SHOOT",
            "text.recall.date": "\u65e5\u4ed8",
            "text.recall.tid": "\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3",
            "text.recall.bullets": "\u767a\u5c04\u3055\u308c\u305f\u5f3e\u4e38",
            "text.recall.totalwager": "\u3059\u3079\u3066\u306e\u8ced\u3051",
            "text.recall.totalwin": "\u52dd\u3061\u8ca0\u3051\u306e\u7d50\u679c",
            "text.recall.title": "\u30b2\u30fc\u30e0\u8a18\u9332",
            "text.recall.empty": "\u7a7a\u306e\u30c7\u30fc\u30bf",
            "text.room.pick": "\u30eb\u30fc\u30e0\u3092\u9078\u3093\u3067\u304f\u3060\u3055\u3044",
            "text.room.roomA": "\u30d6\u30ed\u30f3\u30ba\u30d5\u30a3\u30fc\u30eb\u30c9",
            "text.room.roomB": "\u30b7\u30eb\u30d0\u30fc\u30d5\u30a3\u30fc\u30eb\u30c9",
            "text.room.roomC": "\u91d1\u30e1\u30c0\u30eb\u30d5\u30a3\u30fc\u30eb\u30c9",
            "text.bossbattle.wait": "BOSS\u30d0\u30c8\u30eb\u30bf\u30a4\u30e0\u306e\u7d42\u4e86\u3092\u304a\u5f85\u3061\u4e0b\u3055\u3044",
            "ask.logout": "\u30b2\u30fc\u30e0\u3092\u7d42\u4e86\u3057\u307e\u3059\u304b\uff1f",
            "error.network": "\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u30a8\u30e9\u30fc\u304c\u767a\u751f\u3057\u307e\u3057\u305f\u3002\u63a5\u7d9a\u3092\u78ba\u8a8d\u3057\u3066\u30ea\u30ed\u30fc\u30c9\u3057\u3066\u304f\u3060\u3055\u3044\u3002",
            "error.balance": "\u73fe\u5728\u306e\u30d9\u30c3\u30c8\u3092\u30d7\u30ec\u30a4\u3059\u308b\u306b\u306f\u6b8b\u9ad8\u304c\u4e0d\u8db3\u3057\u3066\u3044\u307e\u3059\u3002\u30d9\u30c3\u30c8\u3092\u4e0b\u3052\u3066\u3001\u3082\u3046\u4e00\u5ea6\u304a\u8a66\u3057\u304f\u3060\u3055\u3044\u3002",
            "error.kick": "\u30b7\u30b9\u30c6\u30e0\u304c\u30ed\u30b0\u30a2\u30a6\u30c8\u3092\u691c\u51fa\u3057\u307e\u3057\u305f\u3002\u30ea\u30ed\u30fc\u30c9\u3057\u3066\u8a66\u3057\u3066\u304f\u3060\u3055\u3044\u3002",
            "error.other": "\u6b8b\u9ad8\u306f\u305d\u306e\u307e\u307e\u3067\u3059\u3002\u518d\u30ea\u30ed\u30fc\u30c9\u3057\u3066\u3082\u3046\u4e00\u5ea6\u304a\u8a66\u3057\u304f\u3060\u3055\u3044\u3002",
            "fish.pt.inst.title": "\u6575\u30ad\u30e3\u30e9\u7d39\u4ecb",
            "fish.pt.inst.bosses": "BOSS\u30d0\u30c8\u30eb - BOSS\u30d0\u30c8\u30eb\u30bf\u30a4\u30e0\u306e\u6642\u3001\u30dc\u30b9\u304c\u4e09\u56de\u6bba\u305b\u308b\u3002",
            "fish.pt.inst.speedup": "\u52a0\u901f\u30b7\u30e5\u30fc\u30c8 - \u3053\u306e\u5b9d\u7bb1\u304c\u6bba\u3055\u308c\u305f\u3089\u3001\u653b\u6483\u901f\u5ea6\u304c\u30a2\u30c3\u30d7\u3057\u3066\u3001\u8ffd\u52a0\u500d\u6570\u5831\u916c\u304c\u3082\u3089\u3048\u307e\u3059\u3002(10x/15x/20x/25x/30x/35x/40x/45x/50x)",
            "fish.pt.inst.lightning": "\u9023\u9396\u7a32\u59bb - \u3053\u306e\u5b9d\u7bb1\u304c\u6bba\u3055\u308c\u305f\u3089\u3001\u9023\u9396\u53cd\u5fdc\u304c\u8d77\u3053\u3063\u3066\u3001\u3042\u308b\u91cf\u306e\u602a\u7269\u304c\u4e00\u6589\u306b\u6bba\u3055\u308c\u307e\u3059\u3002",
            "fish.pt.inst.bomb": "EMP\u7206\u5f3e - \u3053\u306e\u5b9d\u7bb1\u3092\u6bba\u3057\u306b\u6210\u529f\u3057\u305f\u3089\u3001\u753b\u9762\u4e0a\u306b\u3044\u308b\u5168\u90e8\u306e\u6575\u304c\u30bf\u30a4\u30e0\u30b9\u30c8\u30c3\u30d7\u72b6\u614b\u306b\u306a\u3063\u3066\u3001\u884c\u52d5\u304c\u505c\u6b62\u3057\u307e\u3059\u3002"
        }, cc._RF.pop()
    }, {}],
    ko: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "be996k0ypdD0oP574sSGSvi", "ko"), window.i18n || (window.i18n = {}), window.i18n.languages || (window.i18n.languages = {}), window.i18n.languages.ko = {
            "text.loading": "LOADING",
            "text.search": "SEARCHING",
            "text.ok": "OK",
            "text.cancel": "CANCEL",
            "text.playon": "Play On",
            "text.endgame": "End Game",
            "text.locktarget": "LOCK",
            "text.unlocktarget": "UNLOCK",
            "text.autofire": "AUTO",
            "text.autofire.stop": "STOP",
            "text.paytable": "PAY TABLE",
            "text.waitforplayer": "WAITING FOR PLAYER",
            "text.locking": "CLICK ON ENEMY TO ATTACK",
            "text.androidfullscreen": "Click the button above to turn on the full screen for the best visual experience!!",
            "text.recommend.title": "PLAY MORE KA GAMES",
            "text.reminder.optionmenu": "OPTION MENU",
            "text.reminder.lockfish": "LOCK TARGET",
            "text.reminder.autofire": "AUTO SHOOT",
            "text.reminder.clicktomove": "DRAG OR CLICK TO MOVE YOUR AIRCRAFT AND SHOOT",
            "text.recall.date": "DATE",
            "text.recall.tid": "ID",
            "text.recall.bullets": "BULLETS",
            "text.recall.totalwager": "BET",
            "text.recall.totalwin": "RESULT",
            "text.recall.title": "GAME RECORD",
            "text.recall.empty": "EMPTY DATA",
            "text.room.pick": "  ",
            "text.room.roomA": "BRONZE",
            "text.room.roomB": "SILVER",
            "text.room.roomC": "GOLD",
            "text.bossbattle.wait": "PLEASE WAIT FOR BOSS BATTLE TO END",
            "ask.logout": "Do you really want to exit the game?",
            "error.network": "A network error occurred. Please check your connection and reload.",
            "error.balance": "Your balance is insufficient to play the current bet. Please lower your bet and try again.",
            "error.kick": "Your session has been logged out. Please reload the page and try again.",
            "error.other": "Your balance is intact. Please reload and try again.",
            "fish.pt.inst.title": "SPACE CAT RULES",
            "fish.pt.inst.bosses": "BOSS BATTLE - When in a boss battle, each boss can be killed three times.",
            "fish.pt.inst.speedup": "SPEED UP - Wins of this BOX type will increase fire speed and multiply wins by 10x,15x,20x,25x,30x,35x,40x,45x,50x",
            "fish.pt.inst.lightning": "CHAIN WIN - Wins of this BOX type will cause a chain reaction and kill a random number of enemies on the screen.",
            "fish.pt.inst.bomb": "EMP BOMB - Wins of this BOX type will cause an EMP bomb to go off and pause all enemies on the screen."
        }, cc._RF.pop()
    }, {}],
    "polyglot.min": [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "e26fd9yy65A4q3/JkpVnFYg", "polyglot.min");
        var n = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (e) {
            return typeof e
        } : function (e) {
            return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        (function (e, i) {
            typeof define === "function" && define.amd ? define([], function () {
                return i(e)
            }) : (void 0 === o ? "undefined" : n(o)) == "object" ? t.exports = i(e) : e.Polyglot = i(e)
        })(void 0, function (e) {
            function t(e) {
                e = e || {}, this.phrases = {}, this.extend(e.phrases || {}), this.currentLocale = e.locale || "en", this.allowMissing = !!e.allowMissing, this.warn = e.warn || l
            }

            function o(e) {
                var t, o, n, i = {};
                for (t in e) {
                    if (e.hasOwnProperty(t)) { for (n in o = e[t]) { i[o[n]] = t; } }
                }
                return i
            }

            function i(e) {
                return e.replace(/^\s+|\s+$/g, "")
            }

            function r(e, t, o) {
                var n, r;
                return o != null && e ? n = i((r = e.split(p))[s(t, o)] || r[0]) : n = e, n
            }

            function a(e) {
                var t = o(f);
                return t[e] || t.en
            }

            function s(e, t) {
                return h[a(e)](t)
            }

            function c(e, t) {
                for (var o in t) { o !== "_" && t.hasOwnProperty(o) && (e = e.replace(new RegExp("%\\{" + o + "\\}", "g"), t[o])); }
                return e
            }

            function l(t) {
                e.console && e.console.warn && e.console.warn("WARNING: " + t)
            }

            function u(e) {
                var t = {};
                for (var o in e) { t[o] = e[o]; }
                return t
            }
            t.VERSION = "0.4.3", t.prototype.locale = function (e) {
                return e && (this.currentLocale = e), this.currentLocale
            }, t.prototype.extend = function (e, t) {
                var o;
                for (var i in e) { e.hasOwnProperty(i) && (o = e[i], t && (i = t + "." + i), (void 0 === o ? "undefined" : n(o)) == "object" ? this.extend(o, i) : this.phrases[i] = o) }
            }, t.prototype.clear = function () {
                this.phrases = {}
            }, t.prototype.replace = function (e) {
                this.clear(), this.extend(e)
            }, t.prototype.t = function (e, t) {
                var o, n;
                return typeof (t = t == null ? {} : t) === "number" && (t = {
                    smart_count: t
                }), typeof this.phrases[e] === "string" ? o = this.phrases[e] : typeof t._ === "string" ? o = t._ : this.allowMissing ? o = e : (this.warn('Missing translation for key: "' + e + '"'), n = e), typeof o === "string" && (t = u(t), n = c(n = r(o, this.currentLocale, t.smart_count), t)), n
            }, t.prototype.has = function (e) {
                return e in this.phrases
            };
            var p = "||||",
                h = {
                    chinese: function (e) {
                        return 0
                    },
                    german: function (e) {
                        return e !== 1 ? 1 : 0
                    },
                    french: function (e) {
                        return e > 1 ? 1 : 0
                    },
                    russian: function (e) {
                        return e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2
                    },
                    czech: function (e) {
                        return e === 1 ? 0 : e >= 2 && e <= 4 ? 1 : 2
                    },
                    polish: function (e) {
                        return e === 1 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2
                    },
                    icelandic: function (e) {
                        return e % 10 != 1 || e % 100 == 11 ? 1 : 0
                    }
                },
                f = {
                    chinese: ["fa", "id", "ja", "ko", "lo", "ms", "th", "tr", "zh"],
                    german: ["da", "de", "en", "es", "fi", "el", "he", "hu", "it", "nl", "no", "pt", "sv"],
                    french: ["fr", "tl", "pt-br"],
                    russian: ["hr", "ru"],
                    czech: ["cs"],
                    polish: ["pl"],
                    icelandic: ["is"]
                };
            return t
        }), cc._RF.pop()
    }, {}],
    ru: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "c18d4qlJIRPa6HT54xeak3f", "ru"), window.i18n || (window.i18n = {}), window.i18n.languages || (window.i18n.languages = {}), window.i18n.languages.ru = {
            "text.loading": "\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430",
            "text.search": "\u041f\u043e\u0438\u0441\u043a",
            "text.ok": "OK",
            "text.cancel": "\u041e\u0442\u043c\u0435\u043d\u0430",
            "text.playon": "\u0418\u0433\u0440\u0430\u0442\u044c \u0434\u0430\u043b\u044c\u0448\u0435",
            "text.endgame": "\u0417\u0430\u043a\u043e\u043d\u0447\u0438\u0442\u044c \u0438\u0433\u0440\u0443",
            "text.locktarget": "\u0431\u043b\u043e\u043a.",
            "text.unlocktarget": "\u043e\u0442\u043a\u0440.",
            "text.autofire": "\u0410\u0432\u0442\u043e",
            "text.autofire.stop": "\u0421\u0442\u043e\u043f",
            "text.paytable": "\u043f\u0440\u0430\u0432\u0438\u043b\u0430",
            "text.waitforplayer": "\u0416\u0434\u0451\u043c \u0438\u0433\u0440\u043e\u043a\u0430",
            "text.locking": "H\u0430\u0436\u043c\u0438\u0442\u0435 \u043d\u0430 \u0432\u0440\u0430\u0433\u0430, \u0447\u0442\u043e\u0431\u044b \u043d\u0430\u0447\u0430\u0442\u044c \u0430\u0442\u0430\u043a\u0443",
            "text.androidfullscreen": "\u041d\u0430\u0436\u043c\u0438\u0442\u0435 \u043d\u0430 \u043a\u043d\u043e\u043f\u043a\u0443 \u0432\u044b\u0448\u0435, \u0447\u0442\u043e\u0431\u044b \u043e\u0442\u043a\u0440\u044b\u0442\u044c \u043f\u043e\u043b\u043d\u044b\u0439 \u044d\u043a\u0440\u0430\u043d \u0438 \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u043d\u0430\u0438\u043b\u0443\u0447\u0448\u0435\u0435 \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u043e \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f!",
            "text.recommend.title": "\u0418\u0433\u0440\u0430\u0442\u044c \u0431\u043e\u043b\u044c\u0448\u0435 \u0438\u0433\u0440 \u043e\u0442 KA",
            "text.reminder.optionmenu": "\u041c\u0435\u043d\u044e",
            "text.reminder.lockfish": "\u0424\u0438\u043a\u0441\u0430\u0446\u0438\u044f \u043f\u0440\u0438\u0446\u0435\u043b\u0430",
            "text.reminder.autofire": "\u0410\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0447\u0435\u0441\u043a\u0430\u044f \u0441\u0442\u0440\u0435\u043b\u044c\u0431\u0430",
            "text.reminder.clicktomove": "DRAG OR CLICK TO MOVE YOUR AIRCRAFT AND SHOOT",
            "text.recall.date": "\u0414\u0430\u0442\u0430",
            "text.recall.tid": "\u0422\u0440\u0430\u043d\u0437\u0430\u043a\u0446\u0438\u0438",
            "text.recall.bullets": "\u0412\u044b\u043f\u0443\u0449\u0435\u043d\u043d\u044b\u0435 \u043f\u0443\u043b\u0438",
            "text.recall.totalwager": "\u0421\u0443\u043c\u043c\u0430 \u0441\u0442\u0430\u0432\u043a\u0438",
            "text.recall.totalwin": "\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442",
            "text.recall.title": "\u0417\u0430\u043f\u0438\u0441\u044c \u0438\u0433\u0440\u044b",
            "text.recall.empty": "\u041f\u0443\u0441\u0442\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435",
            "text.room.pick": "\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0443\u0440\u043e\u0432\u0435\u043d\u044c \u0441\u0442\u0430\u0432\u043e\u043a",
            "text.room.roomA": "\u0411\u0420\u041e\u041d\u0417\u0410",
            "text.room.roomB": "\u0421\u0415\u0420\u0415\u0411\u0420\u041e",
            "text.room.roomC": "\u0417\u041e\u041b\u041e\u0422\u041e",
            "text.bossbattle.wait": "\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043f\u043e\u0434\u043e\u0436\u0434\u0438\u0442\u0435, \u043f\u043e\u043a\u0430 \u0434\u0440\u0443\u0433\u0438\u0435 \u0438\u0433\u0440\u043e\u043a\u0438 \u043e\u043a\u043e\u043d\u0447\u0430\u0442 \u0443\u0440\u043e\u0432\u0435\u043d\u044c \u0431\u043e\u0441\u0441\u0430.",
            "ask.logout": "\u0412\u044b \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u044c\u043d\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0432\u044b\u0439\u0442\u0438 \u0438\u0437 \u0438\u0433\u0440\u044b?",
            "error.network": "\u041e\u0448\u0438\u0431\u043a\u0430 \u0441\u0435\u0442\u0438. \u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u0432\u0430\u0448\u0435 \u0441\u043e\u0435\u0434\u0438\u043d\u0435\u043d\u0438\u0435 \u0438 \u043f\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0438\u0433\u0440\u0443.",
            "error.balance": "\u0412\u0430\u0448 \u0431\u0430\u043b\u0430\u043d\u0441 \u043d\u0435\u0434\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u0435\u043d \u0434\u043b\u044f \u0438\u0433\u0440\u044b \u043f\u043e \u0432\u044b\u0431\u0440\u0430\u043d\u043d\u043e\u0439 \u0441\u0442\u0430\u0432\u043a\u0435. \u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0438\u0433\u0440\u0430\u0439\u0442\u0435 \u043f\u043e \u0431\u043e\u043b\u0435\u0435 \u043d\u0438\u0437\u043a\u043e\u0439 \u0441\u0442\u0430\u0432\u043a\u0435 \u0438\u043b\u0438 \u0432\u043d\u0435\u0441\u0438\u0442\u0435 \u0431\u043e\u043b\u044c\u0448\u0435 \u0441\u0440\u0435\u0434\u0441\u0442\u0432.",
            "error.kick": "\u0412\u0430\u0448\u0430 \u0441\u0435\u0441\u0441\u0438\u044f \u0431\u044b\u043b\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u0430. \u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043e\u0431\u043d\u043e\u0432\u0438\u0442\u0435 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443 \u0438 \u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437.",
            "error.other": "\u0412\u0430\u0448 \u0431\u0430\u043b\u0430\u043d\u0441 \u0432 \u043f\u043e\u0440\u044f\u0434\u043a\u0435. \u041f\u0435\u0440\u0435\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0441\u0440\u0430\u043d\u0438\u0446\u0443 \u0438 \u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0441\u043d\u043e\u0432\u0430.",
            "fish.pt.inst.title": "\u041f\u0440\u0430\u0432\u0438\u043b\u0430 Space Cat",
            "fish.pt.inst.bosses": "\u0421\u0440\u0430\u0436\u0435\u043d\u0438\u0435 \u0441 \u0411\u043e\u0441\u0441\u043e\u043c - \u0412 \u0441\u0440\u0430\u0436\u0435\u043d\u0438\u0438 \u0441 \u0411\u043e\u0441\u0441\u043e\u043c, \u043a\u0430\u0436\u0434\u044b\u0439 \u0438\u0437 \u0411\u043e\u0441\u0441\u043e\u0432 \u043c\u043e\u0436\u0435\u0442 \u0431\u044b\u0442\u044c \u0443\u0431\u0438\u0442 \u0442\u0440\u0438 \u0440\u0430\u0437\u0430.",
            "fish.pt.inst.speedup": "\u0423\u0421\u041a\u041e\u0420\u0418\u0422\u0415\u041b\u042c - \u0421\u0431\u0438\u0442\u044b\u0439 \u0423\u0421\u041a\u041e\u0420\u0418\u0422\u0415\u041b\u042c \u0443\u0432\u0435\u043b\u0438\u0447\u0430\u0442 \u0441\u043a\u043e\u0440\u043e\u0441\u0442\u044c \u0441\u0442\u0440\u0435\u043b\u044c\u0431\u044b \u0438 \u0443\u043c\u043d\u043e\u0436\u0430\u0442 \u0432\u044b\u0438\u0433\u0440\u044b\u0448\u0438 \u043d\u0430 10x, 15x, 20x, 25x, 30x, 35x, 40x, 45x, 50x",
            "fish.pt.inst.lightning": "\u0426\u0415\u041f\u041d\u0410\u042f \u0420\u0415\u0410\u041a\u0426\u0418\u042f - \u0421\u0431\u0438\u0442\u044b\u0439 \u044d\u043b\u0435\u043c\u0435\u043d\u0442 \u0426\u0415\u041f\u041d\u0410\u042f \u0420\u0415\u0410\u041a\u0426\u0418\u042f \u0432\u044b\u0437\u043e\u0432\u0435\u0442 \u0446\u0435\u043f\u043d\u0443\u044e \u0440\u0435\u0430\u043a\u0446\u0438\u044e \u0438 \u0443\u0431\u044c\u0451\u0442 \u0441\u043b\u0443\u0447\u0430\u0439\u043d\u043e\u0435 \u043a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u0432\u0440\u0430\u0433\u043e\u0432 \u043d\u0430 \u044d\u043a\u0440\u0430\u043d\u0435",
            "fish.pt.inst.bomb": "\u042d\u041c\u0418 \u0411\u041e\u041c\u0411\u0410 - \u0412\u0437\u043e\u0440\u0432\u0430\u0432 \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u043c\u0430\u0433\u043d\u0438\u0442\u043d\u0443\u044e \u0431\u043e\u043c\u0431\u0443 \u0432\u044b \u043e\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u0435 \u0432\u0441\u0435\u0445 \u0432\u0440\u0430\u0433\u043e\u0432 \u043d\u0430 \u044d\u043a\u0440\u0430\u043d\u0435"
        }, cc._RF.pop()
    }, {}],
    th: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "7fefdH5hWBJDYy7rVoulvGY", "th"), window.i18n || (window.i18n = {}), window.i18n.languages || (window.i18n.languages = {}), window.i18n.languages.th = {
            "text.loading": "\u0e14\u0e32\u0e27\u0e19\u0e4c\u0e42\u0e2b\u0e25\u0e14",
            "text.search": "\u0e04\u0e49\u0e19\u0e2b\u0e32",
            "text.ok": "\u0e42\u0e2d\u0e40\u0e04",
            "text.cancel": "\u0e22\u0e01\u0e40\u0e25\u0e34\u0e01",
            "text.playon": "\u0e40\u0e25\u0e48\u0e19\u0e15\u0e48\u0e2d",
            "text.endgame": "\u0e08\u0e1a\u0e40\u0e01\u0e21\u0e2a\u0e4c",
            "text.locktarget": "\u0e25\u0e47\u0e2d\u0e01",
            "text.unlocktarget": "\u0e40\u0e1b\u0e34\u0e14\u0e25\u0e47\u0e2d\u0e01",
            "text.autofire": "\u0e2d\u0e31\u0e15\u0e42\u0e19\u0e21\u0e31\u0e15\u0e34",
            "text.autofire.stop": "\u0e2b\u0e22\u0e38\u0e14",
            "text.paytable": "\u0e0a\u0e19\u0e34\u0e14\u0e02\u0e2d\u0e07\u0e1b\u0e25\u0e32",
            "text.waitforplayer": "\u0e23\u0e2d\u0e43\u0e2b\u0e49\u0e1c\u0e39\u0e49\u0e40\u0e25\u0e48\u0e19\u0e40\u0e02\u0e49\u0e32\u0e23\u0e48\u0e27\u0e21",
            "text.locking": "\u0e04\u0e25\u0e34\u0e01\u0e17\u0e35\u0e48\u0e28\u0e31\u0e15\u0e23\u0e39\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e42\u0e08\u0e21\u0e15\u0e35",
            "text.androidfullscreen": "\u0e04\u0e25\u0e34\u0e01\u0e1b\u0e38\u0e48\u0e21\u0e14\u0e49\u0e32\u0e19\u0e1a\u0e19\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e40\u0e1b\u0e34\u0e14\u0e41\u0e1a\u0e1a\u0e40\u0e15\u0e47\u0e21\u0e2b\u0e19\u0e49\u0e32\u0e08\u0e2d\u0e41\u0e25\u0e30\u0e2a\u0e31\u0e21\u0e1c\u0e31\u0e2a\u0e1b\u0e23\u0e30\u0e2a\u0e1a\u0e01\u0e32\u0e23\u0e13\u0e4c\u0e20\u0e32\u0e1e\u0e17\u0e35\u0e48\u0e21\u0e35\u0e04\u0e38\u0e13\u0e20\u0e32\u0e1e\u0e14\u0e35\u0e17\u0e35\u0e48\u0e2a\u0e38\u0e14",
            "text.recommend.title": "\u0e40\u0e25\u0e48\u0e19\u0e40\u0e01\u0e21\u0e2a\u0e4c KA \u0e21\u0e32\u0e01\u0e02\u0e36\u0e49\u0e19",
            "text.reminder.optionmenu": "\u0e40\u0e21\u0e19\u0e39\u0e15\u0e31\u0e27\u0e40\u0e25\u0e37\u0e2d\u0e01",
            "text.reminder.lockfish": "\u0e1b\u0e25\u0e32\u0e25\u0e47\u0e2d\u0e04",
            "text.reminder.autofire": "\u0e22\u0e34\u0e07\u0e2d\u0e31\u0e15\u0e42\u0e19\u0e21\u0e31\u0e15\u0e34",
            "text.reminder.clicktomove": "DRAG OR CLICK TO MOVE YOUR AIRCRAFT AND SHOOT",
            "text.recall.date": "\u0e27\u0e31\u0e19\u0e17\u0e35\u0e48",
            "text.recall.tid": "\u0e01\u0e32\u0e23\u0e17\u0e33\u0e18\u0e38\u0e23\u0e01\u0e23\u0e23\u0e21",
            "text.recall.bullets": "\u0e01\u0e23\u0e30\u0e2a\u0e38\u0e19\u0e16\u0e39\u0e01\u0e22\u0e34\u0e07",
            "text.recall.totalwager": "\u0e08\u0e33\u0e19\u0e27\u0e19\u0e40\u0e07\u0e34\u0e19\u0e40\u0e14\u0e34\u0e21\u0e1e\u0e31\u0e19",
            "text.recall.totalwin": "\u0e1c\u0e25\u0e17\u0e35\u0e48\u0e44\u0e14\u0e49",
            "text.recall.title": "\u0e1a\u0e31\u0e19\u0e17\u0e36\u0e01\u0e40\u0e01\u0e21",
            "text.recall.empty": "\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e27\u0e48\u0e32\u0e07\u0e40\u0e1b\u0e25\u0e48\u0e32",
            "text.room.pick": "\u0e01\u0e23\u0e38\u0e13\u0e32\u0e40\u0e25\u0e37\u0e2d\u0e01\u0e2b\u0e49\u0e2d\u0e07",
            "text.room.roomA": "BRONZE",
            "text.room.roomB": "SILVER",
            "text.room.roomC": "GOLD",
            "text.bossbattle.wait": "\u0e23\u0e2d\u0e43\u0e2b\u0e49\u0e40\u0e27\u0e25\u0e32\u0e01\u0e32\u0e23\u0e15\u0e48\u0e2d\u0e2a\u0e39\u0e49\u0e02\u0e2d\u0e07 BOSS \u0e2a\u0e34\u0e49\u0e19\u0e2a\u0e38\u0e14\u0e25\u0e07",
            "ask.logout": "\u0e04\u0e38\u0e13\u0e41\u0e19\u0e48\u0e43\u0e08\u0e2b\u0e23\u0e37\u0e2d\u0e27\u0e48\u0e32\u0e15\u0e49\u0e2d\u0e07\u0e01\u0e32\u0e23\u0e2d\u0e2d\u0e01\u0e08\u0e32\u0e01\u0e40\u0e01\u0e21",
            "error.network": "\u0e40\u0e19\u0e47\u0e15\u0e40\u0e27\u0e34\u0e23\u0e4c\u0e04\u0e02\u0e31\u0e14\u0e02\u0e49\u0e2d\u0e07 \u0e01\u0e23\u0e38\u0e13\u0e32\u0e15\u0e23\u0e27\u0e08\u0e2a\u0e2d\u0e1a\u0e01\u0e32\u0e23\u0e40\u0e0a\u0e37\u0e48\u0e2d\u0e21\u0e15\u0e48\u0e2d\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13\u0e41\u0e25\u0e30\u0e42\u0e2b\u0e25\u0e14\u0e43\u0e2b\u0e21\u0e48\u0e2d\u0e35\u0e01\u0e04\u0e23\u0e31\u0e49\u0e07",
            "error.balance": "\u0e22\u0e2d\u0e14\u0e40\u0e07\u0e34\u0e19\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13\u0e44\u0e21\u0e48\u0e40\u0e1e\u0e35\u0e22\u0e07\u0e1e\u0e2d\u0e15\u0e48\u0e2d\u0e01\u0e32\u0e23\u0e40\u0e25\u0e48\u0e19\u0e40\u0e14\u0e34\u0e21\u0e1e\u0e31\u0e19\u0e1b\u0e31\u0e08\u0e08\u0e38\u0e1a\u0e31\u0e19 \u0e01\u0e23\u0e38\u0e13\u0e32\u0e25\u0e14\u0e40\u0e07\u0e34\u0e19\u0e40\u0e14\u0e34\u0e21\u0e1e\u0e31\u0e19\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13\u0e41\u0e25\u0e30\u0e25\u0e2d\u0e07\u0e2d\u0e35\u0e01\u0e04\u0e23\u0e31\u0e49\u0e07",
            "error.kick": "\u0e40\u0e0b\u0e2a\u0e0a\u0e31\u0e19\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13\u0e44\u0e14\u0e49\u0e2d\u0e2d\u0e01\u0e08\u0e32\u0e01\u0e23\u0e30\u0e1a\u0e1a\u0e41\u0e25\u0e49\u0e27 \u0e42\u0e1b\u0e23\u0e14\u0e42\u0e2b\u0e25\u0e14\u0e43\u0e2b\u0e21\u0e48\u0e41\u0e25\u0e49\u0e27\u0e25\u0e2d\u0e07\u0e2d\u0e35\u0e01\u0e04\u0e23\u0e31\u0e49\u0e07",
            "error.other": "\u0e22\u0e2d\u0e14\u0e40\u0e07\u0e34\u0e19\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13\u0e22\u0e31\u0e07\u0e04\u0e07\u0e2d\u0e22\u0e39\u0e48 \u0e42\u0e1b\u0e23\u0e14\u0e42\u0e2b\u0e25\u0e14\u0e0b\u0e49\u0e33\u0e41\u0e25\u0e49\u0e27\u0e25\u0e2d\u0e07\u0e2d\u0e35\u0e01\u0e04\u0e23\u0e31\u0e49\u0e07",
            "fish.pt.inst.title": "\u0e04\u0e33\u0e41\u0e19\u0e30\u0e19\u0e33\u0e02\u0e2d\u0e07\u0e28\u0e31\u0e15\u0e23\u0e39",
            "fish.pt.inst.bosses": "\u0e2a\u0e19\u0e32\u0e21\u0e23\u0e1a\u0e23\u0e32\u0e0a\u0e32\u0e1b\u0e35\u0e28\u0e32\u0e08 - \u0e40\u0e21\u0e37\u0e48\u0e2d\u0e40\u0e02\u0e49\u0e32\u0e2a\u0e39\u0e48\u0e0a\u0e48\u0e27\u0e07\u0e40\u0e27\u0e25\u0e32\u0e01\u0e32\u0e23\u0e15\u0e48\u0e2d\u0e2a\u0e39\u0e49\u0e02\u0e2d\u0e07\u0e23\u0e32\u0e0a\u0e32\u0e1b\u0e35\u0e28\u0e32\u0e08 \u0e23\u0e32\u0e0a\u0e32\u0e1b\u0e35\u0e28\u0e32\u0e08\u0e41\u0e15\u0e48\u0e25\u0e30\u0e15\u0e31\u0e27\u0e43\u0e19\u0e2a\u0e19\u0e32\u0e21\u0e08\u0e30\u0e16\u0e39\u0e01\u0e06\u0e48\u0e32\u0e44\u0e14\u0e49\u0e2a\u0e32\u0e21\u0e04\u0e23\u0e31\u0e49\u0e07",
            "fish.pt.inst.speedup": "\u0e40\u0e23\u0e48\u0e07\u0e04\u0e27\u0e32\u0e21\u0e40\u0e23\u0e47\u0e27\u0e43\u0e19\u0e01\u0e32\u0e23\u0e06\u0e48\u0e32 \u0e15\u0e39\u0e49\u0e2a\u0e21\u0e1a\u0e31\u0e15\u0e34\u0e19\u0e35\u0e49\u0e08\u0e30\u0e40\u0e1e\u0e34\u0e48\u0e21\u0e04\u0e27\u0e32\u0e21\u0e40\u0e23\u0e47\u0e27\u0e43\u0e19\u0e01\u0e32\u0e23\u0e22\u0e34\u0e07\u0e41\u0e25\u0e30\u0e23\u0e31\u0e1a\u0e42\u0e1a\u0e19\u0e31\u0e2a\u0e40\u0e1e\u0e34\u0e48\u0e21\u0e2b\u0e25\u0e32\u0e22\u0e40\u0e17\u0e48\u0e32 (10x / 15x / 20x / 25x / 30x / 35x / 40x / 45x / 50x)",
            "fish.pt.inst.lightning": "\u0e2a\u0e32\u0e22\u0e1f\u0e49\u0e32\u0e1c\u0e48\u0e32 - \u0e40\u0e21\u0e37\u0e48\u0e2d\u0e2b\u0e35\u0e1a\u0e2a\u0e21\u0e1a\u0e31\u0e15\u0e34\u0e19\u0e35\u0e49\u0e16\u0e39\u0e01\u0e06\u0e48\u0e32\u0e21\u0e31\u0e19\u0e08\u0e30\u0e17\u0e33\u0e43\u0e2b\u0e49\u0e40\u0e01\u0e34\u0e14\u0e1b\u0e0f\u0e34\u0e01\u0e34\u0e23\u0e34\u0e22\u0e32\u0e25\u0e39\u0e01\u0e42\u0e0b\u0e48\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e06\u0e48\u0e32\u0e21\u0e2d\u0e19\u0e2a\u0e40\u0e15\u0e2d\u0e23\u0e4c\u0e08\u0e33\u0e19\u0e27\u0e19\u0e2b\u0e19\u0e36\u0e48\u0e07",
            "fish.pt.inst.bomb": "EMP Bomb - \u0e40\u0e21\u0e37\u0e48\u0e2d\u0e2a\u0e31\u0e07\u0e2b\u0e32\u0e23\u0e2b\u0e35\u0e1a\u0e2a\u0e21\u0e1a\u0e31\u0e15\u0e34\u0e2a\u0e33\u0e40\u0e23\u0e47\u0e08\u0e41\u0e25\u0e49\u0e27\u0e28\u0e31\u0e15\u0e23\u0e39\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14\u0e1a\u0e19\u0e2b\u0e19\u0e49\u0e32\u0e08\u0e2d\u0e08\u0e30\u0e40\u0e02\u0e49\u0e32\u0e2a\u0e39\u0e48\u0e40\u0e27\u0e25\u0e32\u0e2b\u0e22\u0e38\u0e14\u0e0a\u0e31\u0e48\u0e27\u0e04\u0e23\u0e32\u0e27\u0e41\u0e25\u0e30\u0e2b\u0e22\u0e38\u0e14\u0e01\u0e32\u0e23\u0e17\u0e33\u0e07\u0e32\u0e19"
        }, cc._RF.pop()
    }, {}],
    "uikiller-plugins": [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "440e7HUsftCuJ8tA+eTGl0B", "uikiller-plugins");
        var n = e("./uikiller"),
            i = {
                name: "UIKillerBindFilter",
                onCheckNode: function (e, t) {
                    if (e === t.node) { return !0; }
                    var o = t.$options;
                    return (!n.isFunction(o.filter) || !o.filter(e)) && (e.name[0] !== "@" && void 0)
                }
            },
            r = {
                hello: "\u4f60\u597dXXX",
                world: "\u4e16\u754c",
                1: "hello",
                2: "wrold"
            },
            a = {
                name: "UIKillerLabelLanguage",
                onCheckNode: function (e, t) {
                    var o = e.getComponent(cc.Label);
                    if (o) {
                        var n = e.$ || e.name,
                            i = r[n];
                        i && (o.string = i)
                    }
                }
            },
            s = {
                _attack: "3002",
                _expedition: "3006",
                click: "click"
            },
            c = {
                name: "UIKillerTouchSound",
                onAfterHandleEvent: function (e, t, o, n) {
                    if (t.type === cc.Node.EventType.TOUCH_END && !1 !== n) {
                        var i = "sound/" + (s[n] || s[e.name] || s.click);
                        cc.loader.loadRes(i, cc.AudioClip, function (e, t) {
                            Array.isArray(t) || cc.audioEngine.play(t)
                        })
                    }
                }
            };
        n.registerPlugin(i), n.registerPlugin(a), n.registerPlugin(c), cc._RF.pop()
    }, {
        "./uikiller": "uikiller"
    }],
    uikiller: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "db263mqxsdLII30NkwT0ZVm", "uikiller");
        var n = ["_onTouchStart", "_onTouchMove", "_onTouchEnd", "_onTouchCancel"],
            i = {
                _prefix: "_",
                _plugins: [],
                registerPlugin: function (e) {
                    var t = this;
                    Array.isArray(e) || (e = [e]), e.forEach(function (e) {
                        t._plugins.find(function (t) {
                            return t.name === e.name || t === e
                        }) || (t._plugins.push(e), e.onRegister && e.onRegister())
                    })
                },
                _getComponentName: function (e) {
                    return e.name.match(/<.*>$/)[0].slice(1, -1)
                },
                bindComponent: function (e, t) {
                    var o = this;
                    e.$options = t || {};
                    var i = e.node;
                    i._components.forEach(function (e) {
                        if (e.name.match) {
                            var t = o._getComponentName(e);
                            i[t = "$" + t] = e
                        }
                    }), this._bindTouchEvent(i, e, n), this._bindNode(e.node, e)
                },
                bindNode: function (e, t, o) {
                    var n = this;
                    if (t.$options = o || {}, t.$collector) {
                        if (t.$collector.node === e) { return; }
                        delete t.$collector.node, Object.keys(t.$collector).forEach(function (e) {
                            delete t[e]
                        })
                    }
                    t.$collector = {
                        node: e
                    }, e._components.forEach(function (e) {
                        var o = n._getComponentName(e);
                        t[o = "$" + o] = e, t.$collector[o] = e
                    }), this._bindStartByPlugins(e, t), this._bindNode(e, t), this._bindEndByPlugins(e, t)
                },
                _bindStartByPlugins: function (e, t) {
                    this._plugins.forEach(function (o) {
                        o.onBindStart && o.onBindStart(e, t)
                    })
                },
                _bindEndByPlugins: function (e, t) {
                    this._plugins.forEach(function (o) {
                        o.onBindEnd && o.onBindEnd(e, t)
                    })
                },
                _bindNode: function (e, t) {
                    var o = this,
                        n = e,
                        r = !1;
                    n.name[0] === this._prefix && n._components.forEach(function (e) {
                        var a = o._getComponentName(e);
                        n[a = "$" + a] && t.$options.debug ? cc.warn(a + " property is already exists") : (n[a] = e, i.isFunction(e.onBind) && e.onBind(t), e instanceof Thor && (r || e === t || (r = !0), n.active || e.bindHammer()))
                    }), this._checkNodeByPlugins(n, t) && !r && n.children.forEach(function (e) {
                        var i = e.name;
                        if (i[0] === o._prefix) {
                            var r = i.indexOf("$");
                            if (r !== -1 && (e.$eventName = i.substr(0, r), e.$ = i.substr(r + 1), i = e.$eventName + e.$[0].toUpperCase() + e.$.substr(1), e.name = i), t[i] && t.$options.debug) { return void cc.warn(t.name + "." + i + " property is already exists"); }
                            o._bindTouchEvent(e, t), t[i] = e, t.$collector && (t.$collector[i] = e)
                        } else { n[i] || (n[i] = e); }
                        o._bindNode(e, t)
                    })
                },
                _getTouchEventName: function (e, t) {
                    var o = e.$eventName || e.name;
                    return o && (o = o[this._prefix.length].toUpperCase() + o.slice(this._prefix.length + 1)), t ? "_on" + o + t : ["_on" + o + "TouchStart", "_on" + o + "TouchMove", "_on" + o + "TouchEnd", "_on" + o + "TouchCancel"]
                },
                _bindTouchEvent: function (e, t, o) {
                    var n = this;
                    if (!e.getComponent(cc.EditBox)) {
                        var i = o || this._getTouchEventName(e),
                            r = [cc.Node.EventType.TOUCH_START, cc.Node.EventType.TOUCH_MOVE, cc.Node.EventType.TOUCH_END, cc.Node.EventType.TOUCH_CANCEL];
                        i.forEach(function (o, i) {
                            (t[o] || e.getComponent(cc.Button)) && e.on(r[i], function (i) {
                                var r = i.currentTarget;
                                if (!1 !== r.interactable && !1 !== r.active) {
                                    var a = r.getComponent(cc.Button);
                                    if (!a || !1 !== a.interactable) {
                                        var s = t[o],
                                            c = s || a && a.clickEvents.length;
                                        c && n._beforeHandleEventByPlugins(r, i, !!s);
                                        var l = void 0;
                                        s && (l = s.call(t, r, i), i.type === cc.Node.EventType.TOUCH_START && !1 === l ? r._touchListener.setSwallowTouches(!1) : (e._touchListener.setSwallowTouches(!0), i.stopPropagation())), c && n._afterHandleEventByPlugins(r, i, !!s, l)
                                    }
                                }
                            })
                        }), this._bindTouchLongEvent(e, t)
                    }
                },
                _bindTouchLongEvent: function (e, t) {
                    var o = e,
                        n = this._getTouchEventName(o, "TouchLong"),
                        r = t[n];
                    i.isFunction(r) && (o._touchLongTimer = null, o.on(cc.Node.EventType.TOUCH_END, function () {
                        o._touchLongTimer && (clearTimeout(o._touchLongTimer), o._touchLongTimer = 0, delete o.interactable)
                    }), o.on(cc.Node.EventType.TOUCH_START, function (e) {
                        o._touchLongTimer = setTimeout(function () {
                            o.interactable = !!r.call(t, o, e), o._touchLongTimer = 0
                        }, o.touchLongTime || 1e3)
                    }))
                },
                _checkNodeByPlugins: function (e, t) {
                    return !this._plugins.find(function (o) {
                        return o.onCheckNode ? !1 === o.onCheckNode(e, t) : null
                    })
                },
                _beforeHandleEventByPlugins: function (e, t, o) {
                    this._plugins.forEach(function (n) {
                        n.onBeforeHandleEvent && n.onBeforeHandleEvent(e, t, o)
                    })
                },
                _afterHandleEventByPlugins: function (e, t, o, n) {
                    this._plugins.forEach(function (i) {
                        i.onAfterHandleEvent && i.onAfterHandleEvent(e, t, o, n)
                    })
                },
                isFunction: function (e) {
                    return typeof e === "function"
                }
            };
        window.uikiller = t.exports = i, cc._RF.pop()
    }, {}],
    "zh-hans": [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "f7c08RqK+lKKI8QCwkJwps3", "zh-hans"), window.i18n || (window.i18n = {}), window.i18n.languages || (window.i18n.languages = {}), window.i18n.languages["zh-hans"] = {
            "text.loading": "\u52a0\u8f7d\u4e2d",
            "text.search": "\u914d\u5bf9\u4e2d",
            "text.ok": "\u786e\u5b9a",
            "text.cancel": "\u53d6\u6d88",
            "text.playon": "\u7ee7\u7eed",
            "text.endgame": "\u7ed3\u675f\u6e38\u620f",
            "text.locktarget": "\u9501\u5b9a",
            "text.unlocktarget": "\u89e3\u9501",
            "text.autofire": "\u81ea\u52a8",
            "text.autofire.stop": "\u505c\u6b62",
            "text.paytable": "\u8d54\u4ed8\u8868",
            "text.waitforplayer": "\u7b49\u5f85\u52a0\u5165",
            "text.locking": "\u70b9\u51fb\u602a\u7269\u53ef\u653b\u51fb",
            "text.androidfullscreen": "\u70b9\u51fb\u4e0a\u65b9\u6309\u94ae\u5f00\u542f\u5168\u8424\u5e55,\u4f53\u9a8c\u6700\u4f18\u8d28\u7684\u89c6\u89c9\u611f\u53d7!!",
            "text.recommend.title": "\u73a9\u66f4\u591a\u5f00\u53d1\u7535\u5b50\u7684\u6e38\u620f",
            "ask.logout": "\u771f\u7684\u8981\u767b\u51fa\u6e38\u620f\u5417?",
            "text.reminder.optionmenu": "\u529f\u80fd\u9009\u9879",
            "text.reminder.lockfish": "\u9501\u5b9a\u5c04\u51fb",
            "text.reminder.autofire": "\u81ea\u52a8\u5c04\u51fb",
            "text.reminder.clicktomove": "\u4f7f\u7528\u62d6\u66f3\u6216\u70b9\u51fb\u6765\u79fb\u52a8\u6218\u673a\u5e76\u5c04\u51fb",
            "text.recall.date": "\u65e5\u671f",
            "text.recall.tid": "\u6ce8\u5355",
            "text.recall.bullets": "\u53d1\u5c04\u5b50\u5f39\u6570",
            "text.recall.totalwager": "\u603b\u6295\u6ce8",
            "text.recall.totalwin": "\u8f93\u8d62\u7ed3\u679c",
            "text.recall.title": "\u6e38\u620f\u8bb0\u5f55",
            "text.recall.empty": "\u65e0\u6e38\u620f\u8bb0\u5f55",
            "text.room.pick": "\u8bf7\u9009\u62e9\u4e00\u4e2a\u623f\u95f4",
            "text.room.roomA": "\u94dc\u724c\u573a",
            "text.room.roomB": "\u94f6\u724c\u573a",
            "text.room.roomC": "\u91d1\u724c\u573a",
            "text.bossbattle.wait": "\u7b49\u5f85BOSS\u6218\u6597\u65f6\u95f4\u7ed3\u675f",
            "error.network": "\u7f51\u8def\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u6574\u7406\u9875\u9762",
            "error.balance": "\u4f59\u989d\u4e0d\u8db3\u65e0\u6cd5\u8fdb\u884c\u4e0b\u6ce8\uff0c\u8bf7\u964d\u4f4e\u60a8\u7684\u4e0b\u6ce8\u91d1\u989d\uff0c\u7136\u540e\u91cd\u8bd5\u3002",
            "error.kick": "\u7cfb\u7edf\u4fa6\u6d4b\u5230\u767b\u51fa\uff0c\u8bf7\u91cd\u65b0\u767b\u5165",
            "error.other": "\u60a8\u7684\u4f59\u989d\u662f\u6ca1\u6709\u53d8\u66f4. \u8bf7\u91cd\u65b0\u52a0\u8f7d\u518d\u8bd5\u4e00\u6b21.",
            "fish.pt.inst.title": "\u602a\u7269\u4ecb\u7d39",
            "fish.pt.inst.bosses": "\u9b54\u738b\u6218\u573a - \u5f53\u8fdb\u5165\u9b54\u738b\u6218\u6597\u65f6\u6bb5\uff0c\u6bcf\u53ea\u5728\u573a\u4e0a\u7684\u9b54\u738b\u53ef\u51fb\u6740\u4e09\u6b21",
            "fish.pt.inst.speedup": "\u52a0\u901f\u5c04\u51fb - \u6b64\u5b9d\u7bb1\u88ab\u51fb\u6740\u65f6\uff0c\u4f1a\u63d0\u9ad8\u5c04\u51fb\u901f\u5ea6\u5e76\u4e14\u5f97\u5230\u989d\u5916\u7684\u5956\u52b1\u500d\u6570(10x/15x/20x/25x/30x/35x/40x/45x/50x)",
            "fish.pt.inst.lightning": "\u8fde\u9501\u95ea\u7535 - \u6b64\u5b9d\u7bb1\u88ab\u51fb\u6740\u65f6\uff0c\u5c06\u4f1a\u9020\u6210\u8fde\u9501\u53cd\u5e94\u4e00\u5e76\u51fb\u6740\u67d0\u4e2a\u6570\u91cf\u7684\u654c\u4eba",
            "fish.pt.inst.bomb": "EMP\u70b8\u5f39 - \u5f53\u6210\u529f\u51fb\u6740\u6b64\u5b9d\u7bb1\u65f6\uff0c\u753b\u9762\u4e0a\u6240\u6709\u654c\u4eba\u5c06\u8fdb\u5165\u65f6\u95f4\u6682\u505c\u72b6\u6001"
        }, cc._RF.pop()
    }, {}],
    "zh-hant": [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "28261MsSFVOpKI1gSck/Co2", "zh-hant"), window.i18n || (window.i18n = {}), window.i18n.languages || (window.i18n.languages = {}), window.i18n.languages["zh-hant"] = {
            "text.loading": "\u52a0\u8f09\u4e2d",
            "text.search": "\u914d\u5c0d\u4e2d",
            "text.ok": "\u78ba\u5b9a",
            "text.cancel": "\u53d6\u6d88",
            "text.playon": "\u7e7c\u7e8c",
            "text.endgame": "\u7d50\u675f\u904a\u6232",
            "text.locktarget": "\u9396\u5b9a",
            "text.unlocktarget": "\u89e3\u9396",
            "text.autofire": "\u81ea\u52d5",
            "text.autofire.stop": "\u505c\u6b62",
            "text.paytable": "\u8ce0\u4ed8\u8868",
            "text.waitforplayer": "\u7b49\u5f85\u52a0\u5165",
            "text.locking": "\u9ede\u64ca\u602a\u7269\u53ef\u653b\u64ca",
            "text.androidfullscreen": "\u9ede\u64ca\u4e0a\u65b9\u6309\u9215\u958b\u555f\u5168\u87a2\u5e55,\u9ad4\u9a57\u6700\u512a\u8cea\u7684\u8996\u89ba\u611f\u53d7!!",
            "text.recommend.title": "\u73a9\u66f4\u591a\u958b\u767c\u96fb\u5b50\u7684\u904a\u6232",
            "text.reminder.optionmenu": "\u529f\u80fd\u9078\u9805",
            "text.reminder.lockfish": "\u9396\u5b9a\u5c04\u64ca",
            "text.reminder.autofire": "\u81ea\u52d5\u5c04\u64ca",
            "text.reminder.clicktomove": "\u4f7f\u7528\u62d6\u66f3\u6216\u9ede\u64ca\u4f86\u79fb\u52d5\u6230\u6a5f\u4e26\u5c04\u64ca",
            "text.recall.date": "\u65e5\u671f",
            "text.recall.tid": "\u6ce8\u55ae",
            "text.recall.bullets": "\u767c\u5c04\u5b50\u5f48\u6578",
            "text.recall.totalwager": "\u7e3d\u6295\u6ce8",
            "text.recall.totalwin": "\u8f38\u8d0f\u7d50\u679c",
            "text.recall.title": "\u904a\u6232\u8a18\u9304",
            "text.recall.empty": "\u7121\u904a\u6232\u8a18\u9304",
            "text.room.pick": "\u8acb\u9078\u64c7\u4e00\u500b\u623f\u9593",
            "text.room.roomA": "\u9285\u724c\u5834",
            "text.room.roomB": "\u9280\u724c\u5834",
            "text.room.roomC": "\u91d1\u724c\u5834",
            "text.bossbattle.wait": "\u7b49\u5f85BOSS\u6230\u9b25\u6642\u9593\u7d50\u675f",
            "ask.logout": "\u771f\u7684\u8981\u767b\u51fa\u904a\u6232\u55ce?",
            "error.network": "\u7db2\u8def\u932f\u8aa4\uff0c\u8acb\u91cd\u65b0\u6574\u7406\u9801\u9762",
            "error.balance": "\u9918\u984d\u4e0d\u8db3\u7121\u6cd5\u9032\u884c\u4e0b\u6ce8\uff0c\u8acb\u964d\u4f4e\u60a8\u7684\u4e0b\u6ce8\u91d1\u984d\uff0c\u7136\u5f8c\u91cd\u8a66\u3002",
            "error.kick": "\u7cfb\u7d71\u5075\u6e2c\u5230\u767b\u51fa\uff0c\u8acb\u91cd\u65b0\u767b\u5165",
            "error.other": "\u60a8\u7684\u9918\u984d\u662f\u6c92\u6709\u8b8a\u66f4. \u8acb\u91cd\u65b0\u52a0\u8f09\u518d\u8a66\u4e00\u6b21.",
            "fish.pt.inst.title": "\u602a\u7269\u4ecb\u7d39",
            "fish.pt.inst.bosses": "\u9b54\u738b\u6230\u5834 - \u7576\u9032\u5165\u9b54\u738b\u6230\u9b25\u6642\u6bb5\uff0c\u6bcf\u96bb\u5728\u5834\u4e0a\u7684\u9b54\u738b\u53ef\u64ca\u6bba\u4e09\u6b21",
            "fish.pt.inst.speedup": "\u52a0\u901f\u5c04\u64ca - \u6b64\u5bf6\u7bb1\u88ab\u64ca\u6bba\u6642\uff0c\u6703\u63d0\u9ad8\u5c04\u64ca\u901f\u5ea6\u4e26\u4e14\u5f97\u5230\u984d\u5916\u7684\u734e\u52f5\u500d\u6578(10x/15x/20x/25x/30x/35x/40x/45x/50x)",
            "fish.pt.inst.lightning": "\u9023\u9396\u9583\u96fb - \u6b64\u5bf6\u7bb1\u88ab\u64ca\u6bba\u6642\uff0c\u5c07\u6703\u9020\u6210\u9023\u9396\u53cd\u61c9\u4e00\u4f75\u64ca\u6bba\u67d0\u500b\u6578\u91cf\u7684\u6575\u4eba",
            "fish.pt.inst.bomb": "EMP\u70b8\u5f48 - \u7576\u6210\u529f\u64ca\u6bba\u6b64\u5bf6\u7bb1\u6642\uff0c\u756b\u9762\u4e0a\u6240\u6709\u6575\u4eba\u5c07\u9032\u5165\u6642\u9593\u66ab\u505c\u72c0\u614b"
        }, cc._RF.pop()
    }, {}]
}, {}, ["AudioManage", "BackHome", "CancelTransparentClick", "GameStart", "StartSearchTable", "StartSearchTableForPlayView", "TableSearch", "BusinessStorage", "GameRankStorage", "NetConnector", "PayTableViewStorage", "PlatformStorage", "PngStorage", "PromptDialogStorage", "TableSearchStorage", "UserInfoStorage", "WalletStorage", "GameServerWsConnector", "Language", "WechatAvatarLoader", "LoginSuccessRedirector", "TwLoginLocal", "TwLoginWsConnector", "WxWebOauth", "MockPanel", "Aircraft", "AndroidAskFullScreen", "AnimationBingo", "AnimationBonus", "AnimationCoin", "AnimationFire", "AnimationFlash", "AnimationOnlyCoin", "AnimationPause", "AutoScollLayer", "Boss", "BossNotify", "BossWarning", "Bullet", "ClickSprite", "CurrencyLabel", "DrawBoards", "Enemy", "EventButton", "Fish", "GameReCall", "GunSight", "HandlingAnimation", "HorizontalScroll", "IphoneXTopPadding", "JettonsItem", "NodeZOrder", "NoviceTeaching", "PayTableFishFrame", "PayTablePayScoreLabel", "PayTableView", "PromptDialog", "RecallRow", "RotationXY", "ScanAnimation", "TextButton", "ToggleText", "WebViewGameRecall", "BossShowAction", "Joystick", "AircraftManager", "Config", "FishPondAnimation", "GameStage", "LobbyViewControl", "MountUiKiller", "PlayViewControl", "SearchTableViewControl", "Bezier", "CCHelper", "KAFishGameAssets", "Pair", "RealMoneyPlatform", "SeedRandom", "Thor", "cocos-help", "uikiller-plugins", "uikiller", "en", "ja", "ko", "ru", "th", "zh-hans", "zh-hant", "LanguageData", "LocalizedLabel", "LocalizedSprite", "SpriteFrameSet", "polyglot.min"]);