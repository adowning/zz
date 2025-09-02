(window.RESOLUTIONS_CONFIG = {
    mobile: {
        landscape: {
            width: 960,
            height: 540,
            pixelFactor: 1,
            portraitTopOffset: 0,
            portraitLeftOffset: 0,
        },
        portrait: {
            width: 540,
            height: 960,
            pixelFactor: 0.5625,
            portraitTopOffset: 0,
            portraitLeftOffset: 0,
        },
    },
    mobileLow: {
        landscape: {
            width: 960,
            height: 540,
            pixelFactor: 1,
            portraitTopOffset: 0,
            portraitLeftOffset: 0,
        },
        portrait: {
            width: 540,
            height: 960,
            pixelFactor: 0.5625,
            portraitTopOffset: 0,
            portraitLeftOffset: 0,
        },
    },
    tablet: {
        default: {
            width: 960,
            height: 540,
            pixelFactor: 1,
        },
    },
    tabletLow: {
        default: {
            width: 960,
            height: 540,
            pixelFactor: 1,
        },
    },
    desktop: {
        default: {
            width: 1280,
            height: 720,
            pixelFactor: 1.33,
        },
    },
    default: {
        default: {
            width: 1280,
            height: 720,
            pixelFactor: 1.33,
        },
    },
}),
    (window.VIRTUAL_RESOLUTIONS_CONFIG = {
        default: {
            landscape: {
                width: 1280,
                height: 720,
            },
            portrait: {
                width: 720,
                height: 1280,
            },
        },
        tablet: {
            default: {
                width: 1280,
                height: 720,
            },
        },
    });
(window.Sys = {}),
    (function () {
        var e,
            t,
            n = navigator.userAgent;
        (Sys.openBetMode = !1),
            /callbackurl/i.test(window.location.search) &&
                (/integration=openbet/i.test(window.location.search) ||
                    /openbet\.user_id/i.test(window.location.search)) &&
                (Sys.openBetMode = !0),
            (Sys.openBetPlayForFunMode = !1),
            /integration=openbet/i.test(window.location.search) &&
                !Sys.openBetMode &&
                (Sys.openBetPlayForFunMode = !0),
            (Sys.isGcmEnabled = !1),
            /openbet.gcmMode=true/i.test(window.location.search) &&
                (Sys.isGcmEnabled = !0),
            (Sys.isiPad = !1),
            (Sys.isiPhone = !1),
            (Sys.isiPhoneIOS7 = !1),
            (Sys.isiPhoneIOS8 = !1),
            (Sys.isiPhoneIOS9 = !1),
            (Sys.isiPod = !1),
            (Sys.isAndroidDevice = !1),
            (Sys.isSamsungS = !1),
            (Sys.isOneX = !1),
            (Sys.isHTCOne = !1),
            (Sys.isAndroid23Device = !1),
            (Sys.isAndroid400 = !1),
            (Sys.isAndroid410 = !1),
            (Sys.isAndroidTablet = !1),
            (Sys.isAndroid3Tablet = !1),
            (Sys.isDesktop = !1),
            (Sys.has3DTransforms = !1),
            (Sys.isChrome = !1),
            (Sys.isChrome280 = !1),
            (Sys.isSafari = !1),
            (Sys.isChromeForIOS = !1),
            (function () {
                var e,
                    t = document,
                    n = t.createElement("div"),
                    i = !1;
                void 0 !== n.style.webkitPerspective &&
                    ((e = t.createElement("style")),
                    (e.textContent =
                        "@media (-webkit-transform-3d){#test3d{height:3px}}"),
                    t.getElementsByTagName("head")[0].appendChild(e),
                    (n.id = "test3d"),
                    t.body &&
                        (t.body.appendChild(n),
                        (i = 3 === n.offsetHeight),
                        e.parentNode.removeChild(e),
                        n.parentNode.removeChild(n))),
                    (Sys.has3DTransforms = i);
            })(),
            n.match(/Chrome/i) &&
                ((Sys.isChrome = !0),
                n.match(/Chrome\/28[\.\d]/i) && (Sys.isChrome280 = !0)),
            n.match(/CriOS/i) && (Sys.isChromeForIOS = !0),
            n.match(/Safari/i) && !Sys.isChromeForIOS && (Sys.isSafari = !0),
            null !== n.match(/iPad/i)
                ? (Sys.isiPad = !0)
                : n.match(/iPod/i)
                ? (Sys.isiPod = !0)
                : n.match(/iPhone/i)
                ? ((e = "3gs,4,4s"),
                  (t = "standard"),
                  (e = 568 === window.screen.height ? "5" : e),
                  (e = 667 === window.screen.height ? "6" : e),
                  (t =
                      window.matchMedia("(-webkit-min-device-pixel-ratio: 3)")
                          .matches && "6" === e
                          ? "zoomed"
                          : t),
                  (e = window.matchMedia("(-webkit-min-device-pixel-ratio: 3)")
                      .matches
                      ? "6+"
                      : e),
                  (Sys.isiPhone = {
                      series: "iPhone",
                      model: e,
                      displayZoom: t,
                  }))
                : n.match(/Android/i) || n.match(/HTC_Sensation/i)
                ? ((Sys.isAndroidDevice = !0),
                  n.match(/Android 3[\.\d]+/i)
                      ? ((Sys.isAndroid3Tablet = !0),
                        (Sys.isAndroidTablet = !0))
                      : n.match(/mobile/i)
                      ? n.match(/Android 2\.3/i)
                          ? (Sys.isAndroid23Device = !0)
                          : n.match(/Android 4\.0/i)
                          ? (Sys.isAndroid400 = !0)
                          : n.match(/Android 4\.1/i)
                          ? (Sys.isAndroid410 = !0)
                          : n.match(/Android 4\.2/i)
                          ? (Sys.isAndroid420 = !0)
                          : n.match(/Android 4\.3/i) && (Sys.isAndroid430 = !0)
                      : (Sys.isAndroidTablet = !0))
                : (Sys.isDesktop = !0),
            (Sys.isiPhoneIOS7 =
                n.indexOf("IEMobile") < 0 &&
                /(?:OS\s*[7]+_0(?:_\d+)?\s*)/i.test(n) &&
                !window.navigator.standalone &&
                (Sys.isiPhone || Sys.isiPod) &&
                Sys.isSafari),
            (Sys.isiPhoneIOS8 =
                /OS\s*8_/i.test(n) &&
                !window.navigator.standalone &&
                Sys.isiPhone &&
                Sys.isSafari),
            (Sys.isiPhoneIOS9 =
                /OS\s*9_/i.test(n) &&
                !window.navigator.standalone &&
                Sys.isiPhone &&
                Sys.isSafari),
            (Sys.isiOS9 = /OS\s*9_/i.test(n)),
            (Sys.isIphone4Or4s =
                Sys.isiPhone &&
                window.matchMedia("(-webkit-min-device-pixel-ratio: 2)")
                    .matches &&
                320 === window.screen.width &&
                480 === window.screen.height),
            (Sys.isIphone5Or5sOr5c =
                Sys.isiPhone &&
                320 === window.screen.width &&
                568 === window.screen.height),
            n.match(/GT-I9100/)
                ? (Sys.isSamsungS = {
                      series: "samsungS",
                      model: "s2",
                  })
                : n.match(/GT-I9300/)
                ? (Sys.isSamsungS = {
                      series: "samsungS",
                      model: "s3",
                  })
                : (n.match(/GT-I9505/) ||
                      n.match(/GT-I9506/) ||
                      n.match(/GT-I9521/) ||
                      n.match(/GT-I9525/)) &&
                  (Sys.isSamsungS = {
                      series: "samsungS",
                      model: "s4",
                  }),
            (Sys.isiOSDevice = Sys.isiPad || Sys.isiPhone || Sys.isiPod),
            (Sys.isIphone3GS =
                Sys.isiOSDevice &&
                !window.matchMedia("(-webkit-min-device-pixel-ratio: 2)")
                    .matches &&
                320 === window.screen.width &&
                480 === window.screen.height),
            (Sys.isTouchDevice = Boolean("ontouchstart" in window)),
            (Sys.clickEvent = Sys.isTouchDevice ? "touchend" : "click"),
            (Sys.touchstartEvent = Sys.isTouchDevice
                ? "touchstart"
                : "mousedown"),
            (Sys.touchendEvent = Sys.isTouchDevice ? "touchend" : "mouseup"),
            (Sys.touchoutEvent = "mouseout"),
            (Sys.touchmoveEvent = Sys.isTouchDevice
                ? "touchmove"
                : "mousemove"),
            (Sys.isInIFrame = window !== window.parent);
    })(),
    (Sys.apply = function (e, t) {
        var n;
        if (((e = e || {}), null === t || !Sys.isDefined(t))) return e;
        if (e && t && Sys.isObj(t))
            for (n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
        return e;
    }),
    (Sys.applyProperties = function (e, t) {
        var n,
            i,
            o = Object.keys(t),
            s = o.length;
        for (n = -1; ++n < s; )
            (i = o[n]), Sys.isDefined(t[i]) && (e[i] = t[i]);
        return e;
    }),
    (Sys.applyIf = function (e, t) {
        var n;
        if (!(e && t && Sys.isObj(t))) throw new Error("Error in Sys.applyIf");
        for (n in t)
            t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n]);
        return e;
    }),
    (Sys.applyPropertiesIf = function (e, t) {
        var n,
            i,
            o = Object.keys(t),
            s = o.length;
        for (n = -1; ++n < s; )
            (i = o[n]),
                !Sys.isDefined(e[i]) && Sys.isDefined(t[i]) && (e[i] = t[i]);
        return e;
    }),
    (Sys.iterate = function (e, t, n) {
        var i;
        if (!Sys.isObj(e) || "function" != typeof t) return e;
        for (i in e) e.hasOwnProperty(i) && t.call(n || e, i, e[i]);
        return e;
    }),
    (Sys.each = function (e, t, n) {
        var i, o;
        if (!Sys.isArray(e) || "function" != typeof t) return e;
        for (i = 0, o = e.length; i < o; i += 1)
            if (!1 === t.call(n || e[i], e[i], i)) return i;
        return e;
    }),
    (Sys.contains = function (e, t) {
        return Array.prototype.includes ? e.includes(t) : e.indexOf(t) > -1;
    }),
    (Sys.variadic = function (e) {
        var t = e.length - 1;
        return function () {
            var n = [].slice.call(arguments, 0, t),
                i = [].slice.call(arguments, t);
            return e.apply(this, n.concat([i]));
        };
    }),
    (Sys.ns = function (e) {
        var t,
            n,
            i = e || "";
        for (t = i.split(".") || [], n = window; t.length > 0; )
            (i = t.shift()), Sys.isEmpty(n[i]) && (n[i] = {}), (n = n[i]);
    }),
    (Sys.pluck = function (e, t) {
        var n = [];
        return (
            Sys.each(e, function (e) {
                n.push(e[t]);
            }),
            n
        );
    }),
    (Sys.isEmpty = function (e) {
        return null === e || !Sys.isDefined(e) || (Sys.isArray(e) && !e.length);
    }),
    (Sys.isDefined = function (e) {
        return void 0 !== e;
    }),
    (Sys.defaultValue = function (e, t) {
        return Sys.isEmpty(e) ? t : e;
    }),
    (Sys.override = function (e, t) {
        t && Sys.apply(e.prototype, t);
    }),
    (Sys.overrideClass = function (e, t) {
        var n, i;
        return (
            Sys.isObj(t) &&
                (Sys.apply(e.prototype, t),
                (n = e.prototype),
                (i = e.superclass),
                "function" == typeof t.constructor && (e = t.constructor),
                (e.prototype = n),
                (e.superclass = i)),
            e
        );
    }),
    (Sys.isArray = function (e) {
        var t = Object.prototype.toString.call(e);
        return (
            "[object Array]" === t ||
            "[object NodeList]" === t ||
            "[object TouchList]" === t ||
            "[object HTMLCollection]" === t
        );
    }),
    (Sys.isString = function (e) {
        return "string" == typeof e;
    }),
    (Sys.isNumber = function (e) {
        return !isNaN(e) && "number" == typeof e;
    }),
    (Sys.isObj = function (e) {
        return !Sys.isArray(e) && "object" == typeof e;
    }),
    (Sys.isFunc = function (e) {
        return "function" == typeof e;
    }),
    (Sys.isAudioBuffer = function (e) {
        return "[object AudioBuffer]" === Object.prototype.toString.call(e);
    }),
    (Sys.isInstanceOf = function (e, t) {
        var n = !1;
        try {
            n = e instanceof t;
        } catch (e) {}
        return n;
    }),
    (Sys.copyObject = function (e) {
        return Sys.apply({}, e);
    }),
    (Sys.copyObj = Sys.copyObject),
    (Sys.clone = function (e) {
        var t, n;
        if (Sys.isArray(e)) {
            for (n = e.length, t = []; --n > -1; ) t[n] = Sys.clone(e[n]);
            return t;
        }
        return Sys.isObj(e)
            ? ((t = {}),
              Object.keys(e).forEach(function (n) {
                  var i = e[n];
                  t[n] = Sys.clone(i);
              }),
              t)
            : e;
    }),
    (Sys.extend = function (e, t, n) {
        var i = Object.prototype.constructor,
            o = t,
            s = function () {};
        return (
            (t =
                o.constructor !== i
                    ? o.constructor
                    : function () {
                          e.apply(this, arguments);
                      }),
            (s.prototype = e.prototype),
            (t.prototype = new s()),
            (t.prototype.constructor = t),
            e.prototype.constructor === i && (e.prototype.constructor = e),
            (t.superclass = e.prototype),
            Sys.override(t, o),
            t
        );
    }),
    (Sys.clamp = function (e) {
        return e.value < e.min ? e.min : e.value > e.max ? e.max : e.value;
    }),
    (Sys.range = function (e, t, n) {
        var i,
            o,
            s = [e],
            r = e > t;
        for (
            i = r ? -1 * Math.abs(n) || -1 : Math.abs(n) || 1, o = e + i;
            r ? o >= t : o <= t;

        )
            s.push(o), (o += i);
        return s;
    }),
    (Sys.reduce = function (e, t, n) {
        var i, o;
        if (Array.prototype.reduce) return e.reduce(t, n);
        for (
            Sys.isDefined(n) || ((n = e[0]), (e = e.slice(1))),
                i = 0,
                o = e.length;
            i < o;
            i++
        )
            n = t(n, e[i], i, e);
        return n;
    }),
    (Sys.map = function (e, t) {
        return Array.prototype.map
            ? e.map(t)
            : e.reduce(function (n, i, o) {
                  return n.concat(t(i, o, e));
              }, []);
    }),
    (Sys.filter = function (e, t) {
        return Array.prototype.filter
            ? e.filter(t)
            : e.reduce(function (n, i, o) {
                  return t(i, o, e) ? n.concat(i) : n;
              }, []);
    }),
    (Sys.find = function (e, t) {
        var n, i;
        if (Array.prototype.find) return e.find(t);
        for (n = 0, i = e.length; n < i; n++) if (t(e[n])) return e[n];
    }),
    (Sys.EventHandler = function () {
        this.EVENTS = {};
    }),
    (Sys.EventHandler.prototype = {
        DEBUG: !1,
        LOG_FUNC: !1,
        LOG: !1,
        LOG_WARN: !1,
        LOG_FILTER: /(?:)/,
        history: [],
        toStringHistory: function (e) {
            var t,
                n = this,
                i = "",
                o = e || new RegExp();
            return (
                Sys.each(n.history, function (e) {
                    try {
                        t = JSON.stringify(e.params);
                    } catch (n) {
                        t = e.params;
                    }
                    o.test(e.event) &&
                        (i +=
                            e.event +
                            " (" +
                            e.listeners +
                            ") -> " +
                            t +
                            "\r\n");
                }),
                i
            );
        },
        addListener: function (e, t) {
            var n = this;
            Sys.isDefined(n.EVENTS[t]) || (n.EVENTS[t] = []),
                Sys.contains(n.EVENTS[t], e) || n.EVENTS[t].push(e);
        },
        removeListener: function (e, t) {
            var n = this.EVENTS[t] || [],
                i = n.indexOf(e);
            i >= 0 && (n[i] = "removed");
        },
        dispatchEvent: Sys.variadic(function (e, t) {
            var n,
                i,
                o,
                s = this.EVENTS[e] || [],
                r = s.length - 1;
            for (n = r; n >= 0; n--)
                (i = s[n]),
                    (o = Sys.isObj(i) ? i.handlers[e] : null) && o.apply(i, t);
            for (n = r; n >= 0; n--)
                "removed" === s[n] && (s.splice(n, 1), ++n);
        }),
        sortEventListeners: function (e) {
            var t,
                n,
                i,
                o = this.EVENTS,
                s = Object.keys(o),
                r = s.length;
            for (i = -1; ++i < r; )
                (t = o[s[i]]),
                    (n = t.indexOf(e)) > 0 && (t.splice(n, 1), t.unshift(e));
        },
    }),
    (window.EventHandler = new Sys.EventHandler()),
    Sys.ns("Sys"),
    (Sys.Observable = function (e) {
        (this.eventHandler =
            Sys.isDefined(e) && Sys.isDefined(e.eventHandler)
                ? e.eventHandler
                : EventHandler),
            (this.handlers = {});
    }),
    (Sys.Observable.prototype = {
        fireEvent: function () {
            0 !== arguments.length &&
                this.eventHandler.dispatchEvent.apply(
                    this.eventHandler,
                    arguments
                );
        },
        on: function (e) {
            for (
                var t, n = this, i = Object.keys(e), o = i.length, s = 0;
                s < o;

            )
                (t = i[s]), n.addListener(t, e[t]), ++s;
        },
        off: function () {
            for (
                var e,
                    t = this,
                    n = Object.keys(t.handlers),
                    i = n.length,
                    o = 0;
                o < i;

            )
                (e = n[o]), t.removeListener(e), ++o;
        },
        addListener: function (e, t) {
            (this.handlers[e] = t), this.eventHandler.addListener(this, e);
        },
        removeListener: function (e) {
            this.eventHandler.removeListener(this, e),
                (this.handlers[e] = void 0);
        },
        hasListener: function (e) {
            return Sys.isDefined(this.handlers[e]);
        },
    }),
    Sys.ns("Sys"),
    (Sys.Element = {
        constructor: function (e) {
            var t = this;
            if (
                (Sys.Element.superclass.constructor.apply(this, arguments),
                (this.DOMEvents = {}),
                (this.el = this.setupElement(e)),
                !this.el)
            )
                throw new Error(
                    "Invalid instantiation of Sys.Element, invalid input, needs element string or object"
                );
            this.el.addEventListener(
                "transitionend",
                function (e) {
                    t.transitionEnd && t.transitionEnd.apply(t, arguments),
                        e.stopPropagation();
                },
                !1
            ),
                document.getElementById(e.renderTo) &&
                    document.getElementById(e.renderTo).appendChild(this.el);
        },
        setupElement: function (e) {
            return (
                (this.el = null),
                e
                    ? ("string" == typeof e
                          ? (this.el = document.createElement(e))
                          : e instanceof Element
                          ? (this.el = e)
                          : Sys.isObj(e) &&
                            ((this.el = document.createElement(e.tag)),
                            Object.keys(e).forEach(function (t) {
                                var n = e[t];
                                "cls" === t
                                    ? this.el.setAttribute("class", n)
                                    : "innerHTML" === t
                                    ? (this.el.innerHTML = n)
                                    : "textContent" === t
                                    ? (this.el.textContent = n)
                                    : "onClick" === t
                                    ? this.el.addEventListener("click", n)
                                    : "items" === t
                                    ? n.forEach(function (e) {
                                          this.add(e);
                                      }, this)
                                    : "transitionend" === t &&
                                      "function" == typeof n
                                    ? (this.transitionEnd = n)
                                    : "renderTo" !== t &&
                                      "tag" !== t &&
                                      this.el.setAttribute(t, n);
                            }, this)),
                      this.el)
                    : null
            );
        },
        getEl: function () {
            return this.el;
        },
        getChildren: function () {
            return Array.prototype.slice.call(this.getEl().childNodes, 0);
        },
        add: function (e) {
            return this.el.appendChild(e.getEl()), (e.parent = this), e;
        },
        addBefore: function (e, t) {
            return (
                this.el.insertBefore(e.getEl(), t.getEl()), (e.parent = this), e
            );
        },
        addChildren: function (e) {
            e.forEach(function (e) {
                this.el.appendChild(e);
            }, this);
        },
        remove: function (e) {
            var t = e.getEl();
            return this.el === t.parentNode && this.el.removeChild(t), e;
        },
        removeAll: function () {
            for (; this.el.firstChild; )
                this.el.removeChild(this.el.firstChild);
        },
        addListener: function (e, t, n, i) {
            var o = this,
                s = n || this.el,
                r = i || {},
                a = function () {
                    t.apply(s);
                };
            Sys.Element.superclass.addListener.apply(this, arguments),
                r.single &&
                    (a = function () {
                        o.removeListener(e, t, s), t.call(s);
                    }),
                (this.DOMEvents[e] = this.DOMEvents[e] || []),
                this.DOMEvents[e].push({
                    event: e,
                    func: t,
                    scope: s,
                    wrappedFn: a,
                }),
                this.el.addEventListener(e, a, !1);
        },
        removeListener: function (e, t, n) {
            var i = n || this.el;
            Sys.Element.superclass.removeListener.apply(this, arguments),
                this.DOMEvents[e].forEach(function (n, o) {
                    return (
                        n.event === e &&
                        n.func === t &&
                        n.scope === i &&
                        (this.DOMEvents[e].splice(o, 1),
                        this.el.removeEventListener(e, n.wrappedFn, !1),
                        !0)
                    );
                }, this);
        },
        getOffset: function () {
            return Sys.utils.getElOffset(this.el);
        },
        addAsFirst: function (e) {
            return this.el.insertBefore(e.el, this.el.firstChild), e;
        },
        hasClass: function (e) {
            return this.el.classList.contains(e);
        },
        addClass: function (e) {
            var t;
            if (e && e.length) {
                if (((t = e.split(" ")), t.length > 1))
                    return void t.forEach(
                        function (e) {
                            this.el.classList.add(e);
                        }.bind(this)
                    );
                this.el.classList.add(e);
            }
        },
        removeClass: function (e) {
            var t;
            if (e && e.length) {
                if (((t = e.split(" ")), t.length > 1))
                    return void t.forEach(
                        function (e) {
                            this.el.classList.remove(e);
                        }.bind(this)
                    );
                this.el.classList.remove(e);
            }
        },
        replaceClass: function (e, t, n) {
            this.el.classList.contains(e)
                ? (this.el.classList.remove(e), this.el.classList.add(t))
                : n && this.el.classList.add(t);
        },
        setClass: function (e) {
            this.el.className = e;
        },
        toggleClass: function (e, t) {
            "boolean" == typeof t
                ? t
                    ? this.addClass(e)
                    : this.removeClass(e)
                : this.hasClass(e)
                ? this.removeClass(e)
                : this.addClass(e);
        },
    }),
    (Sys.Element.hasCls = Sys.Element.hasCSSClass = Sys.Element.hasClass),
    (Sys.Element.addCls = Sys.Element.addCSSClass = Sys.Element.addClass),
    (Sys.Element.removeCls = Sys.Element.removeCSSClass =
        Sys.Element.removeClass),
    (Sys.Element.replaceCls = Sys.Element.replaceCSSClass =
        Sys.Element.replaceClass),
    (Sys.Element.setCSSClassString = Sys.Element.setClass),
    (Sys.Element.toggleCls = Sys.Element.toggleClass),
    (Sys.Element = Sys.extend(Sys.Observable, Sys.Element, "Sys.Element")),
    (Sys.Deferred = function () {
        (this.whenList = []),
            (this.thenList = []),
            (this.failList = []),
            (this.alwaysList = []),
            (this.states = {
                pending: 0,
                resolved: 1,
                rejected: 2,
            }),
            (this.resolved = 0),
            (this.rejected = 0),
            (this.args = []),
            (this.state = this.states.pending);
    }),
    (Sys.Deferred.prototype = {
        when: function (e) {
            var t;
            return (
                (t = Sys.isArray(e)
                    ? e
                    : Array.prototype.slice.call(arguments, 0)),
                Sys.each(
                    t,
                    function (e) {
                        this.whenList.push(e),
                            e.always(function () {
                                this.onDeferredUpdated();
                            }, this);
                    },
                    this
                ),
                this.onDeferredUpdated(),
                this
            );
        },
        then: function (e, t) {
            return (
                (t = t || window),
                this.isWaiting()
                    ? this.thenList.push({
                          fn: e,
                          scope: t,
                      })
                    : this.isResolved() && e.call(t),
                this
            );
        },
        fail: function (e, t) {
            return (
                (t = t || window),
                this.isWaiting()
                    ? this.failList.push({
                          fn: e,
                          scope: t,
                      })
                    : this.isRejected() && e.call(t),
                this
            );
        },
        always: function (e, t) {
            return (
                (t = t || window),
                this.isWaiting()
                    ? this.alwaysList.push({
                          fn: e,
                          scope: t,
                      })
                    : e.call(t),
                this
            );
        },
        resolve: function () {
            (this.state = this.states.resolved), this.onStateUpdated();
        },
        resolveWith: function (e) {
            (this.args = e), this.resolve();
        },
        reject: function () {
            "function" == typeof this.fallbackFilter
                ? this.onFallback()
                : ((this.state = this.states.rejected), this.onStateUpdated());
        },
        rejectWith: function (e) {
            (this.args = e), this.reject();
        },
        isRejected: function () {
            return this.state === this.states.rejected;
        },
        isResolved: function () {
            return this.state === this.states.resolved;
        },
        fallback: function (e) {
            return (this.fallbackFilter = e), this;
        },
        onFallback: function () {
            var e = this,
                t = e.fallbackFilter.call(this, this.args);
            Sys.isObj(t) &&
                t
                    .done(function () {
                        e.resolveWith(t.args);
                    })
                    .fail(function () {
                        e.rejectWith(t.args);
                    });
        },
        onDeferredUpdated: function () {
            var e,
                t = 0,
                n = 0;
            Sys.each(
                this.whenList,
                function (e) {
                    e.isRejected() ? (t += 1) : e.isResolved() && (n += 1);
                },
                this
            ),
                (this.resolved = n),
                (this.rejected = t),
                this.isWaiting() ||
                    ((e = []),
                    Sys.each(this.whenList, function (t) {
                        e = e.concat(t.args);
                    }),
                    t > 0 ? this.rejectWith(e) : n > 0 && this.resolveWith(e));
        },
        isWaiting: function () {
            return (
                !this.whenList.length ||
                this.resolved + this.rejected < this.whenList.length
            );
        },
        onStateUpdated: function () {
            var e,
                t,
                n,
                i = [];
            for (
                this.state === this.states.resolved
                    ? (i = this.thenList.concat(this.alwaysList))
                    : this.state === this.states.rejected &&
                      (i = this.failList.concat(this.alwaysList)),
                    n = i.length,
                    t = -1;
                ++t < n;

            )
                if (
                    ((e = i[t].fn.apply(i[t].scope, this.args)),
                    Sys.isObj(e) && t + 1 < n)
                ) {
                    e.thenList.push.apply(e.thenList, i.slice(t + 1));
                    break;
                }
            (this.thenList = []), (this.alwaysList = []), (this.failList = []);
        },
    }),
    (Sys.Deferred.prototype.done = Sys.Deferred.prototype.then),
    Sys.ns("Sys.utils"),
    (function () {
        var e = {
            queryStringToObject: function (e, t) {
                var n,
                    i,
                    o,
                    s = {},
                    r = !Sys.isDefined(t) || t;
                return e
                    ? ((o = e.replace("?", "").split(/&/)),
                      Sys.each(o, function (e) {
                          (n = e.split("=")),
                              (i = n[1]),
                              r && (i = decodeURIComponent(i)),
                              "false" === i
                                  ? (i = !1)
                                  : "true" === i && (i = !0),
                              (s[n[0]] = i);
                      }),
                      s)
                    : s;
            },
            appendParameterToQuery: function (e, t) {
                var n = e[e.length - 1];
                return (
                    "?" === n || "&" === n
                        ? (e += t)
                        : -1 === e.indexOf("?")
                        ? (e += "?" + t)
                        : (e += "&" + t),
                    e
                );
            },
            httpGet: function (request) {
                // Create a new XMLHttpRequest object
                var xhr = new XMLHttpRequest();
                // Create a new deferred object
                var deferred = new Sys.Deferred();
                // Append the token to the URL
                var url = request.url;
                console.log(url)
                // Set the Authorization header with the token

                // Determine the HTTP method (GET or POST)
                var method = "GET";
                if (url.indexOf("/server") !== -1) {
                    method = "POST";
                }

                // If a URL is provided, set up the request
                if (url) {
                    xhr.onreadystatechange = function () {
                        if (this.readyState === 4) {
                            this.onreadystatechange = function () {};

                            if (Sys.utils.httpRequestIsOK(this)) {
                                if (
                                    request.responseType !== "arraybuffer" &&
                                    Sys.isDefined(Sys.utils.getErrorCode(this))
                                ) {
                                    deferred.rejectWith([this]);
                                } else {
                                    deferred.resolveWith([this]);
                                }
                            } else {
                                deferred.rejectWith([this]);
                            }
                        }
                    };

                    // Set up the onprogress callback if provided
                    if (Sys.isDefined(request.onProgressCallback)) {
                        xhr.onprogress = function (event) {
                            request.onProgressCallback(event, request.name);
                        };
                    }
                    // Open the request with the determined method and URL
                    xhr.open(method, url);
                    if (url.indexOf("/server") !== -1) {
                        xhr.setRequestHeader(
                            "Authorization",
                            `Bearer ${window.token}`
                        );
                    }
                    // Set the response type if provided
                    if (Sys.isDefined(request.responseType)) {
                        xhr.responseType = request.responseType;
                    }
                    console.log(request.useCredentials);
                    // Set the withCredentials property if provided
                    if (!Sys.isEmpty(request.useCredentials)) {
                        xhr.withCredentials = request.useCredentials;
                    }

                    // Send the request
                    xhr.send();

                    return deferred;
                } else {
                    // If no URL is provided, resolve the deferred object with null
                    deferred.resolveWith([null]);
                    return deferred;
                }
            },
            httpRequestIsOK: function (e) {
                return (
                    200 === e.status ||
                    (0 === e.status && e.responseText.length > 0)
                );
            },
            getErrorCode: function (e) {
                var t = Sys.utils.toInt(
                    Sys.utils.getResponseParameter("errorcode", e)
                );
                return isNaN(t) ? void 0 : t;
            },
            getErrorData: function (e) {
                return this.getResponseParameter("errordata", e);
            },
            getResponseParameter: function (e, t) {
                var n = new RegExp(e + "=([^&]+)"),
                    i = Sys.isDefined(t.responseText)
                        ? t.responseText.match(n)
                        : null;
                return null !== i ? i[1] : void 0;
            },
            loadJS: function (e) {
                var t = new Sys.Deferred(),
                    n = document.createElement("script");
                return (
                    n.addEventListener("load", function () {
                        t.resolve();
                    }),
                    (n.type = "text/javascript"),
                    (n.src = e.url),
                    setTimeout(function () {
                        t.isResolved() ||
                            (console.error("Failed to load: " + n.src),
                            t.reject());
                    }, 5e3),
                    document.getElementsByTagName("head")[0].appendChild(n),
                    t
                );
            },
            strIsTrue: function (e) {
                return !Sys.isEmpty(e) && "true" === e.toString().toLowerCase();
            },
            pseudoGUID: function () {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                    /[xy]/g,
                    function (e) {
                        var t = (16 * Math.random()) | 0;
                        return ("x" === e ? t : (3 & t) | 8).toString(16);
                    }
                );
            },
            getNodesByFormat: function (e, t) {
                var n,
                    i = this,
                    o = [],
                    s = 0;
                return (
                    e.replace(/\{([^\{\}]*)\}/g, function (e, r, a, u) {
                        o.push(document.createTextNode(u.slice(s, a))),
                            (s = a + e.length),
                            (n = function () {
                                var e = t[Sys.utils.toInt(r)];
                                return "string" == typeof e || Sys.isNumber(e)
                                    ? (o.push(
                                          document.createTextNode(e.toString())
                                      ),
                                      e)
                                    : (Sys.isObj(e) && o.push(e.getEl()), "");
                            }),
                            n.apply(i, arguments);
                    }),
                    s < e.length &&
                        o.push(document.createTextNode(e.slice(s, e.length))),
                    o
                );
            },
            objSort: function (e, t, n) {
                var i = function (e, i) {
                    return n ? i[t] - e[t] : e[t] - i[t];
                };
                return e.sort(i), e;
            },
            toInt: function (e) {
                return parseInt(e, 10);
            },
            toFloat: function (e) {
                return parseFloat(e);
            },
            floorToEven: function (e) {
                return e - (e % 2);
            },
            ceilToEven: function (e) {
                return e + (2 - (e % 2));
            },
            numberToFixedDigits: function (e, t) {
                if (t <= 0) throw Error("digits can't be 0 or less");
                return Math.abs(e) < 1
                    ? e.toFixed(t - 1)
                    : e.toString().length >= t
                    ? e.toString()
                    : e.toPrecision(t);
            },
            isUrl: function (e) {
                return new RegExp(
                    "(ftp|http|https):\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-\\/]))?"
                ).test(e);
            },
            getElOffset: function (e) {
                var t = 0,
                    n = 0;
                if (e.offsetParent)
                    do {
                        (t += e.offsetLeft), (n += e.offsetTop);
                    } while ((e = e.offsetParent));
                return {
                    left: t,
                    top: n,
                    x: t,
                    y: n,
                };
            },
            getTransformationOffset: function (e) {
                var t,
                    n = 0,
                    i = 0;
                if (e.parentElement)
                    do {
                        (t = new WebKitCSSMatrix(
                            window.getComputedStyle(e).webkitTransform
                        )),
                            (n += t.e),
                            (i += t.f);
                    } while ((e = e.parentElement));
                return {
                    left: n,
                    top: i,
                    x: n,
                    y: i,
                };
            },
            getPointCoordinates: function (e) {
                var t = {
                        x: 0,
                        y: 0,
                    },
                    n = e.type;
                return (
                    /touch/.test(n)
                        ? ((t.x = e.changedTouches[0].pageX),
                          (t.y = e.changedTouches[0].pageY))
                        : /mouse/.test(n) && ((t.x = e.x), (t.y = e.y)),
                    t
                );
            },
            goTo: function (e) {
                window.location = this.sanitizeURL(e);
            },
            objectToQueryString: function (e) {
                var t,
                    n = "";
                for (t in e) e.hasOwnProperty(t) && (n += "&" + t + "=" + e[t]);
                return n;
            },
            reload: function () {
                window.location.reload();
            },
            containsObject: function (e, t) {
                var n;
                if (Sys.isObj(e) && Sys.isArray(t)) {
                    for (n = 0; n < t.length; n++)
                        if (t[n] === e)
                            return {
                                found: !0,
                                index: n,
                            };
                } else
                    console.warn(
                        "Input to Sys.utils.containsObject is not an object and an array"
                    );
                return {
                    found: !1,
                    index: NaN,
                };
            },
            getKeys: function (e) {
                var t,
                    n = [],
                    i = e.keys;
                if ("function" != typeof i)
                    for (t in e) e.hasOwnProperty(t) && n.push(t);
                else n = i(e);
                return n;
            },
            init2dMatrix: function (e, t, n) {
                var i,
                    o = [];
                for (i = -1; ++i < e; ) o.push(Sys.utils.initArray(t, n));
                return o;
            },
            initArray: function (e, t) {
                var n,
                    i = [];
                for (n = -1; ++n < e; ) i.push(t);
                return i;
            },
            getPrefixedCSSProperty: function (e) {
                return this.tryPrefixPropery(e, document.body.style);
            },
            tryPrefixPropery: function (e, t) {
                var n,
                    i,
                    o,
                    s = ["webkit", "moz", "ms", "o"];
                if (Sys.isDefined(e)) {
                    if (e in t) return e;
                    for (
                        i = e.charAt(0).toUpperCase() + e.substr(1), o = 0;
                        o < s.length;
                        o++
                    )
                        if ((n = s[o] + i) in t) return n;
                }
            },
            pollyFill: function (e) {
                return this.getPrefixedCSSProperty(e);
            },
            parseQueryStringToNestedObject: function (e) {
                return this.parseQueryString(e, !0);
            },
            parseQueryString: function (e, t) {
                var n,
                    i,
                    o,
                    s,
                    r,
                    a,
                    u,
                    c = {},
                    l = e.split("&");
                for (n = 0; n < l.length; n++) {
                    for (
                        i = l[n].split("="), o = i[0].split("."), r = c, s = 0;
                        s < o.length - 1;
                        s++
                    )
                        r[o[s]] || (r[o[s]] = {}), (r = r[o[s]]);
                    (a = o[o.length - 1]),
                        (u =
                            !0 === t
                                ? this.parseValue(decodeURIComponent(i[1]))
                                : decodeURIComponent(i[1])),
                        "" !== a && (r[a] = u);
                }
                return c;
            },
            parseValue: function (e) {
                var t,
                    n,
                    i = {};
                if ("true" === e.toLowerCase()) return !0;
                if ("false" === e.toLowerCase()) return !1;
                if ("null" === e.toLowerCase()) return null;
                if ("undefined" !== e.toLowerCase()) {
                    if (!isNaN(Number(e))) return e.length > 16 ? e : Number(e);
                    if (e.split(",").length > 1) {
                        for (t = e.split(","), n = 0; n < t.length; n++)
                            t[n] = this.parseValue(t[n]);
                        return t;
                    }
                    return e.split(":").length > 1
                        ? ((t = e.split(":")),
                          (i[t[0]] = this.parseValue(t[1])),
                          i)
                        : e;
                }
            },
            parseReelInfo: function (e, t) {
                var n,
                    i,
                    o,
                    s = [];
                for (
                    Sys.isDefined(t) &&
                        Sys.iterate(e.rs, function (e, i) {
                            Sys.isObj(i) && i.id === t && (n = i.r);
                        }),
                        Sys.isDefined(n) || (n = e.rs.i0.r),
                        i = 0;
                    Sys.isDefined(n["i" + i]);
                    i++
                )
                    (o = {
                        hold: n["i" + i].hold,
                        symbols: n["i" + i].syms,
                        overlaySymbols: [],
                    }),
                        n["i" + i].overlay &&
                            (o.overlaySymbols = this.getOverlaySymbols(
                                n["i" + i].overlay
                            )),
                        s.push(o);
                return s;
            },
            getOverlaySymbols: function (e) {
                var t,
                    n = [];
                for (t = 0; e["i" + t]; t++)
                    n[e["i" + t].row] = e["i" + t].with;
                return n;
            },
            getClassFromString: function (e) {
                var t,
                    n,
                    i,
                    o = window;
                if ("string" == typeof e) {
                    for (t = e.split("."), i = t.length, n = 0; n < i; n++)
                        if (((o = o[t[n]]), !Sys.isDefined(o))) return;
                    return o;
                }
            },
            openURL: function (e, t) {
                var n = this.sanitizeURL(e);
                try {
                    this.openNewBrowserTab(n, t);
                } catch (e) {
                    this.setWindowLocation(n);
                }
            },
            sanitizeURL: function (e) {
                var t = /^(https?:)?\/\//,
                    n = /<|>/g,
                    i = {
                        "<": "&lt;",
                        ">": "&gt;",
                    };
                return t.test(e)
                    ? e.replace(n, function (e) {
                          return i[e];
                      })
                    : null;
            },
            onTransitionCheck: function (e, t) {
                Sys.utils.checkTransition(e, t, !1);
            },
            checkTransition: function (e, t, n) {
                e()
                    ? n
                        ? t()
                        : window.requestAnimationFrame(function () {
                              Sys.utils.checkTransition(e, t, !0);
                          })
                    : window.requestAnimationFrame(function () {
                          Sys.utils.checkTransition(e, t, !1);
                      });
            },
            goToLobby: function (e) {
                var t = Resources.readData("lobbyUrl");
                t
                    ? Utils.Platform.inIframe() && "#" === t
                        ? window.parent.postMessage(
                              ["event", "goToLobby", e],
                              "*"
                          )
                        : this.setWindowLocation(this.processLobbyUrl(t, e))
                    : console.warn(
                          "Environment#goToLobby - lobbyURL can not be resolved."
                      );
            },
            isHomeAvailable: function () {
                var e = Resources.readData("lobbyUrl");
                return (
                    void 0 !== e &&
                    "undefined" !== e &&
                    "" !== e &&
                    null !== e &&
                    !Platform.isDesktopDevice
                );
            },
            processLobbyUrl: function (e, t) {
                var n,
                    i = Resources.readData("queryData"),
                    o = Resources.readData("sessionID"),
                    s = /#.*/,
                    r = "";
                return (
                    s.test(e)
                        ? ((r = s.exec(e)[0]), (n = e.replace(s, "")))
                        : (n = e),
                    void 0 !== t &&
                        (n = Sys.utils.appendParameterToQuery(
                            n,
                            "reason=" + t
                        )),
                    i &&
                        (i.gameId &&
                            (n = Sys.utils.appendParameterToQuery(
                                n,
                                "gameId=" + i.gameId
                            )),
                        o &&
                            (n = Sys.utils.appendParameterToQuery(
                                n,
                                "sessId=" + o
                            ))),
                    (n += r)
                );
            },
            goToCashier: function () {
                this.goToLobby(5);
            },
            setWindowLocation: function (e) {
                window.location.href = this.sanitizeURL(e);
            },
            openNewBrowserTab: function (e, t) {
                window.open(e, t).focus();
            },
            createElement: function (e, t) {
                var n = document.createElement(e);
                return (
                    (t || []).forEach(function (e) {
                        n.classList.add(e);
                    }),
                    n
                );
            },
            objToQueryStrHavingPrefixValue: function (e, t, n, i) {
                var o,
                    s = "";
                for (o in e)
                    0 === o.indexOf(t) &&
                        o.length <= n &&
                        e[o].length <= i &&
                        (s += "&" + o + "=" + encodeURIComponent(e[o]));
                return s;
            },
            getMoneyConfig: function (e, t) {
                var n,
                    i,
                    o = {};
                return (
                    (n = e.bettingMode || t.bettingMode),
                    (i = e.defaultBettingMode || t.defaultBettingMode),
                    (o.MONEY_TYPES = n
                        ? this.fetchBettingMode(n, "cash,coins")
                        : "cash,coins"),
                    (o.defaultBettingMode = i
                        ? this.fetchDefaultBettingMode(i, o.MONEY_TYPES)
                        : this.getDefaultBettingMode(o.MONEY_TYPES)),
                    o
                );
            },
            fetchBettingMode: function (e, t) {
                return (
                    (e =
                        "string" == typeof e
                            ? e.replace(/ /g, "").toLowerCase()
                            : t),
                    "cash" === e || "coins" === e ? e : t
                );
            },
            fetchDefaultBettingMode: function (e, t) {
                return (
                    (e =
                        "string" == typeof e
                            ? e.replace(/ /g, "").toLowerCase()
                            : "cash"),
                    "string" != typeof e || ("coins" !== e && "cash" !== e)
                        ? this.getDefaultBettingMode(t)
                        : e
                );
            },
            getDefaultBettingMode: function (e) {
                var t = e.split(",");
                return t.length > 1 ? "cash" : t[0];
            },
        };
        Sys.utils = Sys.apply(Sys.utils, e);
    })(),
    Sys.ns("Core"),
    (Core.Module = {
        constructor: function (e) {
            Core.Module.superclass.constructor.apply(this, arguments),
                this.init(e);
        },
        getStateChanges: function () {
            return {};
        },
        getMixinDependencies: function () {
            return [];
        },
        getDefaultMVCClasses: function () {
            return {
                controller: Core.Controller,
            };
        },
        init: function (e) {
            var t,
                n,
                i,
                o = ["model", "view", "controller"],
                s = this.getDefaultMVCClasses(),
                r = Object.keys(s),
                a = new Sys.EventHandler();
            Sys.each(o, function (t) {
                if (e[t]) s[t] = e[t];
                else if (Sys.contains(r, t) && !s[t])
                    throw new Error(
                        "Module :: The " +
                            e.name +
                            " module has a " +
                            t +
                            " class defined that is not included"
                    );
            }),
                s.model &&
                    ((t = s.model),
                    (this.model = new t({
                        name: e.name,
                        eventHandler: a,
                    }))),
                s.view &&
                    (this.model ||
                        (this.model = new Core.Model({
                            name: e.name,
                            eventHandler: a,
                        })),
                    (n = s.view),
                    (this.view = new n({
                        name: e.name,
                        model: this.model,
                        controller: this.controller,
                        eventHandler: a,
                    }))),
                (i = s.controller),
                (this.controller = new i({
                    name: e.name,
                    view: this.view,
                    model: this.model,
                    eventHandler: a,
                })),
                (this.MODULE_NAME = e.name);
        },
    }),
    (Core.Module = Sys.extend(Sys.Observable, Core.Module, "Core.Module")),
    Sys.ns("Core"),
    (Core.Controller = {
        constructor: function (e) {
            (this.localEventHandler = e.eventHandler),
                (this.eventHandler = EventHandler),
                (this.handlers = {}),
                this.init(e);
        },
        init: function (e) {
            (this.model = e.model),
                (this.view = e.view),
                (this.MODULE_NAME = e.name),
                this.setupEvents();
        },
        setupEvents: function () {},
        onModulesFinishedLoading: function () {
            this.model.setState("loaded");
        },
        addListener: function (e, t) {
            (this.handlers[e] = t),
                0 === e.indexOf("view:")
                    ? this.localEventHandler.addListener(this, e)
                    : this.eventHandler.addListener(this, e);
        },
        removeListener: function (e) {
            0 === e.indexOf("view:")
                ? this.localEventHandler.removeListener(this, e)
                : this.eventHandler.removeListener(this, e),
                (this.handlers[e] = void 0);
        },
    }),
    (Core.Controller = Sys.extend(
        Sys.Observable,
        Core.Controller,
        "Core.Controller"
    )),
    Sys.ns("Core"),
    (Core.Model = {
        constructor: function (e) {
            Core.Model.superclass.constructor.apply(this, arguments),
                this.init(e);
        },
        init: function (e) {
            (this.data = {}),
                (this.state = void 0),
                (this.MODULE_NAME = e && e.name ? e.name : null),
                this.setupData();
        },
        setupData: function () {},
        readData: function (e) {
            return this.data[e];
        },
        storeData: function (e, t) {
            return (this.data[e] = t), this.data[e];
        },
        removeData: function (e) {
            delete this.data[e];
        },
        setState: function (e, t) {
            (this.state = e), this.fireEvent("model:" + this.state, t);
        },
        getState: function () {
            return this.state;
        },
        isState: function (e) {
            return e === this.state;
        },
    }),
    (Core.Model = Sys.extend(Sys.Observable, Core.Model, "Core.Model")),
    Sys.ns("Core"),
    (Core.View = {
        constructor: function (e) {
            Core.View.superclass.constructor.apply(this, arguments),
                this.init(e);
        },
        init: function (e) {
            (this.model = e.model),
                (this.MODULE_NAME = e.name),
                this.setupEvents();
        },
        setupEvents: function () {},
    }),
    (Core.View = Sys.extend(Sys.Observable, Core.View, "Core.View")),
    (function (e) {
        "use strict";
        var t = e.webkitAudioContext,
            n = function (e) {
                e &&
                    (e.setTargetAtTime ||
                        (e.setTargetAtTime = e.setTargetValueAtTime));
            };
        !e.AudioContext &&
            t &&
            ((window.AudioContext = t),
            t.prototype.createGain ||
                ((AudioContext.prototype._createGain =
                    t.prototype.createGainNode),
                (AudioContext.prototype.createGain = function () {
                    var e = this._createGain();
                    return n(e.gain), e;
                })),
            t.prototype.createDelay ||
                ((AudioContext.prototype._createDelay =
                    t.prototype.createDelayNode),
                (AudioContext.prototype.createDelay = function () {
                    var e = this._createDelay();
                    return n(e.delayTime), e;
                })),
            (AudioContext.prototype.createScriptProcessor =
                t.prototype.createScriptProcessor ||
                t.prototype.createJavascriptNode),
            (AudioContext.prototype._createOscillator =
                t.prototype.createOscillator),
            (AudioContext.prototype.createOscillator = function () {
                var e = this._createOscillator();
                return (
                    e.start || (e.start = e.noteOn),
                    e.stop || (e.stop = e.noteOff),
                    e
                );
            }),
            (AudioContext.prototype._createBufferSource =
                t.prototype.createBufferSource),
            (AudioContext.prototype.createBufferSource = function () {
                var e = this._createBufferSource();
                return (
                    e.start || (e.start = e.noteGrainOn || e.noteOn),
                    e.stop || (e.stop = e.noteOff),
                    n(e.playbackRate),
                    e
                );
            }));
    })(window),
    Sys.ns("Utils"),
    (Utils.Platform = {
        DEBUG: !1,
        LANDSCAPE: "LANDSCAPE",
        PORTRAIT: "PORTRAIT",
        init: function () {
            var e,
                t = this;
            window.addEventListener(
                "orientationchange",
                function () {
                    var e,
                        n =
                            (screen.orientation || {}).type ||
                            screen.mozOrientation ||
                            screen.msOrientation,
                        i = null,
                        o = 0,
                        s = function (e) {
                            t.DEBUG &&
                                console.info("Orientation changed to:", e),
                                EventHandler.dispatchEvent(
                                    "notify:platform.orientationChanged",
                                    e
                                );
                        },
                        r = function (n) {
                            i || (i = n),
                                (o = "number" != typeof (n - i) ? 0 : n - i),
                                o < 150
                                    ? window.requestAnimationFrame(r)
                                    : ((e = t.getOrientation()),
                                      s(e),
                                      (i = null));
                        };
                    t.DEBUG && console.info("Screen orientation:", n),
                        void 0 !== n
                            ? ((e = t.getOrientation(n)), s(e))
                            : window.requestAnimationFrame(r);
                },
                !1
            ),
                window.addEventListener(
                    "resize",
                    function () {
                        t.DEBUG && console.info("Resize triggered."),
                            EventHandler.dispatchEvent(
                                "notify:platform.resized"
                            );
                    },
                    !1
                ),
                (e = this.getPageVisibilityAPI()) &&
                    document.addEventListener(
                        e.event,
                        function () {
                            var n = document[e.type];
                            t.DEBUG &&
                                console.info("Page visibility changed to:", n),
                                EventHandler.dispatchEvent(
                                    "notify:platform.visibilityChanged",
                                    n
                                ),
                                EventHandler.dispatchEvent(
                                    "pageVisibilityChanged_event",
                                    n
                                );
                        },
                        !1
                    );
        },
        getOrientation: function (e) {
            if (Platform.isDesktopDevice || Platform.isTabletDevice)
                return this.LANDSCAPE;
            if (void 0 !== e) {
                if (-1 !== e.indexOf("landscape")) return this.LANDSCAPE;
                if (-1 !== e.indexOf("portrait")) return this.PORTRAIT;
            }
            return document.documentElement.clientWidth >=
                document.documentElement.clientHeight
                ? this.LANDSCAPE
                : this.PORTRAIT;
        },
        isLandscape: function (e) {
            return void 0 !== e
                ? e === this.LANDSCAPE
                : this.getOrientation() === this.LANDSCAPE;
        },
        isPortrait: function (e) {
            return void 0 !== e
                ? e === this.PORTRAIT
                : this.getOrientation() === this.PORTRAIT;
        },
        inIframe: function () {
            try {
                return window.self !== window.top;
            } catch (e) {
                return !0;
            }
        },
        isTouchSupported: function () {
            return (
                "ontouchstart" in window ||
                "ontouchstart" in document.documentElement ||
                navigator.maxTouchPoints > 0 ||
                navigator.msMaxTouchPoints > 0
            );
        },
        getInputEvents: function () {
            var e = this.isTouchSupported();
            return {
                down: e ? "touchstart" : "mousedown",
                up: e ? "touchend" : "mouseup",
            };
        },
        is3DTransformSupported: function () {
            var e = document.createElement("p"),
                t = [
                    "-webkit-transform",
                    "-o-transform",
                    "-ms-transform",
                    "-moz-transform",
                    "transform",
                ],
                n = !1;
            return (
                !!window.getComputedStyle &&
                (document.body.insertBefore(e, null),
                t.forEach(function (t) {
                    e.style[t] &&
                        ((e.style[t] = "translate3d(1px,1px,1px)"),
                        (n = window.getComputedStyle(e).getPropertyValue(t)));
                }),
                document.body.removeChild(e),
                n && n.length > 0 && "none" !== n)
            );
        },
        isFullScreenAPISupported: function () {
            return [
                "exitFullscreen",
                "webkitExitFullscreen",
                "mozCancelFullScreen",
                "msExitFullscreen",
            ].some(function (e) {
                return e in document;
            });
        },
        isWebAudioAPISupported: function () {
            return window.AudioContext || null;
        },
        isVibrationAPISupported: function () {
            return (
                window.navigator.vibrate ||
                window.navigator.webkitVibrate ||
                window.navigator.mozVibrate ||
                null
            );
        },
        isWebGLSupported: function () {
            var e,
                t = document.createElement("canvas"),
                n = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
            for (e = 0; e < n.length; e++)
                try {
                    if (t.getContext(n[e])) return !0;
                } catch (e) {
                    return !1;
                }
            return !1;
        },
        getPageVisibilityAPI: function () {
            return document.hidden
                ? document.webkitHidden
                    ? {
                          type: "webkitHidden",
                          event: "webkitvisibilitychange",
                      }
                    : null
                : {
                      type: "hidden",
                      event: "visibilitychange",
                  };
        },
        getViewportSize: function () {
            var e = document.documentElement;
            return {
                width: (function () {
                    var t = e.clientWidth,
                        n = window.innerWidth;
                    return t < n ? n : t;
                })(),
                height: (function () {
                    var t = e.clientHeight,
                        n = window.innerHeight;
                    return t < n ? n : t;
                })(),
            };
        },
        getViewportInnerSize: function () {
            return {
                width: window.innerWidth,
                height: window.innerHeight,
            };
        },
        getViewportOuterSize: function () {
            return {
                width: window.outerWidth,
                height: window.outerHeight,
            };
        },
        getDeviceSize: function () {
            return window.screen || null;
        },
        getDevicePixelRatio: function () {
            return window.devicePixelRatio || null;
        },
        isStandAlone: function () {
            return window.navigator.standalone;
        },
        handleNonCompliantScenarios: function () {
            this.isTouchSupported() &&
                Platform.isMacintoshDevice &&
                !this.inIframe() &&
                Sys.utils.goToLobby(Utils.CONSTANTS.REASON_CODES.NON_COMPLIANT);
        },
    }),
    Sys.ns("Utils"),
    (Utils.CONSTANTS = {
        JURISDICTION_SPECIFIC_CODES: {
            SHOW_GAME_INFORMATION: ["CH"],
        },
        REASON_CODES: {
            NORMAL_GAME_TERMINATION: "0",
            BOOKMARK: "1",
            SESSION_TIMEOUT: "3",
            WANTS_TO_PLAY_FOR_REAL: "4",
            WANTS_TO_DEPOSIT_MONEY: "5",
            DEVICE_NOT_SUPPORTED: "6",
            TECHNICAL_ERROR: "9",
            ACKNOWLEDGES_PLAYER_LIMIT: "11",
            NON_COMPLIANT: "12",
        },
    }),
    Sys.ns("Utils"),
    (Utils.Helpers = {
        decodeDataString: function (e) {
            return e.match(/%/) ? decodeURIComponent(e) : e;
        },
        getCustomCoinValues: function (e, t) {
            var n,
                i,
                o,
                s,
                r,
                a,
                u = [],
                c = t["customConfiguration.coinValues"];
            if (
                ((a =
                    Sys.isDefined(t["customConfiguration.coinValues"]) ||
                    Sys.isDefined(t["customConfiguration.coinValues.0"])),
                void 0 === e || !a)
            )
                return [];
            if (
                (Sys.isDefined(t["customConfiguration.coinValues.0"]) &&
                    ((s = Object.keys(t).filter(function (e) {
                        return (
                            -1 !== e.indexOf("customConfiguration.coinValues")
                        );
                    })),
                    (c = s
                        .map(function (e) {
                            return t[e];
                        })
                        .join())),
                (i = this.decodeDataString(c)),
                0 === i.trim().length)
            )
                return [];
            for (n = i.split(","), r = 0; r < n.length; r++) {
                if (((o = parseInt(n[r], 10)), -1 === e.indexOf(o))) return [];
                u.push(o);
            }
            return u.sort(function (e, t) {
                return e - t;
            });
        },
        getISODate: function () {
            return new Date().toISOString();
        },
        logData: function (e, t, n) {
            if (
                window.netent_gcc &&
                window.netent_gcc.Api &&
                window.netent_gcc.Api.logData
            )
                try {
                    window.netent_gcc.Api.logData(e, t, n);
                } catch (e) {}
        },
        logError: function (e, t, n) {
            var i = {
                errorLogs: [
                    {
                        clts: this.getISODate(),
                        code: t || 400,
                        msg: n.stack,
                        src: "origin",
                    },
                ],
            };
            this.logData(e, i, !0);
        },
        logPlayerInteracted: function (e, t, n) {
            var i = {
                interaction: {
                    type: e,
                    data: {
                        valueBefore: t,
                        valueAfter: n,
                    },
                },
            };
            this.logData("PLAYER_INTERACTED", i, !1);
        },
    }),
    Sys.ns("Sys"),
    (Sys.Environment = {
        constructor: function (e) {
            Sys.Environment.superclass.constructor.apply(this, arguments),
                (this.defaultResolutions = {
                    mobile: {
                        default: {
                            width: 960,
                            height: 540,
                            pixelFactor: 1,
                            portraitTopOffset: 0.3,
                        },
                    },
                    tablet: {
                        default: {
                            width: 960,
                            height: 540,
                            pixelFactor: 1,
                        },
                    },
                    desktop: {
                        default: {
                            width: 1280,
                            height: 720,
                            pixelFactor: 1.33,
                        },
                    },
                }),
                (this.defaultVirtualResolutions = {
                    default: {
                        default: {
                            width: 1280,
                            height: 720,
                        },
                    },
                }),
                this.onResized(),
                this.setupEvents();
        },
        setupEvents: function () {
            this.on({
                "notify:platform.resized": this.onResized,
            });
        },
        onResized: function () {
            document.documentElement.style.fontSize =
                parseInt(
                    100 * this.determineResolution().resolution.pixelFactor,
                    10
                ) + "px";
        },
        getResolution: function () {
            return this.determineResolution().resolution;
        },
        getStageResolution: function () {
            return this.determineResolution().virtualResolution;
        },
        allowsCustomCanvasSize: function () {
            return Boolean(
                window.RESOLUTIONS_CONFIG && window.VIRTUAL_RESOLUTIONS_CONFIG
            );
        },
        getViewportOrientation: function (e) {
            return this.allowsCustomCanvasSize() && !e
                ? this.viewportOrientation
                : this.orientation();
        },
        getCurrentResolutionPixelFactor: function () {
            return this.determineResolution().resolution.pixelFactor;
        },
        scaleValue: function (e, t) {
            var n = Sys.isNumber(t) ? t : 0;
            return parseFloat(e.toFixed(n));
        },
        scaleX: function (e, t) {
            return this.scaleValue(e, t);
        },
        scaleY: function (e, t) {
            return this.scaleValue(e, t);
        },
        getVirtualToWindowScale: function () {
            return this.determineResolution().virtualToWindowScale;
        },
        getWindowToVirtualScale: function (e) {
            return parseFloat(
                (1 / this.determineResolution().virtualToWindowScale).toFixed(e)
            );
        },
        updateResolutionProperties: function () {
            (this.resolutionProperties = this.determineResolution()),
                (document.documentElement.style.fontSize =
                    100 * this.resolutionProperties.resolution.pixelFactor +
                    "px");
        },
        getInitialScreenSize: function () {
            return this.initialScreenSize;
        },
        setPortraitSupport: function () {
            this.portraitSupport = !1;
        },
        isPortraitSupported: function () {
            return this.portraitSupport;
        },
        identifyOS: function () {
            var e = navigator.userAgent,
                t = "";
            e.match(/Windows/i)
                ? (t = "windows")
                : e.match(/Android/i)
                ? (t = "android")
                : (e.match(/iPad/i) ||
                      e.match(/iPhone/i) ||
                      e.match(/iPod/i)) &&
                  (t = "ios"),
                (this.os = t);
        },
        identifyBrowser: function () {
            var e = navigator.userAgent,
                t = this.os,
                n = "";
            e.match(/CriOS/i) || e.match(/Chrome/i)
                ? (n = "chrome")
                : e.match(/MSIE [0-9]*\.[0-9]*;/i)
                ? (n = "ie")
                : e.match(/Safari/i)
                ? "ios" === t
                    ? (n = "safari")
                    : "android" === t && (n = "stock")
                : e.match(/Firefox/i) && (n = "firefox"),
                (this.browser = n);
        },
        identifyPlatform: function () {
            var e = "mobile";
            Platform.isTabletDevice
                ? (e = "tablet")
                : Platform.isDesktopDevice && (e = "desktop"),
                (this.platformCSS = e),
                "desktop" !== e && Platform.isLowEndDevice && (e += "Low"),
                (this.platform = e);
        },
        getOrientation: function () {
            return Sys.isDefined(this.deviceOrientation)
                ? this.deviceOrientation
                : Platform.isDesktopDevice ||
                  (!this.allowsCustomCanvasSize() && Platform.isTabletDevice)
                ? "LANDSCAPE"
                : Platform.isAndroidStockBrowser
                ? 90 === Math.abs(window.orientation)
                    ? "LANDSCAPE"
                    : "PORTRAIT"
                : window.innerWidth >= window.innerHeight
                ? "LANDSCAPE"
                : "PORTRAIT";
        },
        getDeviceOrientation: function () {
            return window.innerWidth >= window.innerHeight
                ? "LANDSCAPE"
                : "PORTRAIT";
        },
        determineResolution: function () {
            var e = {
                    standard:
                        window.RESOLUTIONS_CONFIG || this.defaultResolutions,
                    virtual:
                        window.VIRTUAL_RESOLUTIONS_CONFIG ||
                        this.defaultVirtualResolutions,
                },
                t = this.getConfigForCurrentDeviceState(e.virtual, !1, !0),
                n = this.getClosestResolution(e.standard, t),
                i = n.height / t.height;
            return {
                virtualResolution: t,
                resolution: n,
                virtualToWindowScale: i,
                windowToVirtualScale: 1 / i,
                portraitTopOffset: n.portraitTopOffset || 0,
            };
        },
        getKeyOfClosestResolution: function (e, t) {
            for (
                var n,
                    i = t[0].value,
                    o = t[0].key,
                    s = Math.abs(e - i),
                    r = t.length;
                r--;

            )
                (n = Math.abs(e - t[r].value)) < s && ((s = n), (o = t[r].key));
            return o;
        },
        getClosestResolution: function (e, t) {
            var n = this.getPlatformSpecificConfig(e),
                i = {};
            return null === n || 0 === Object.keys(n).length
                ? (console.warn(
                      "No resolutions found. Check the documentation."
                  ),
                  null)
                : (Sys.iterate(n, function (e, t) {
                      i[e] = {
                          source: t,
                          width: t.width,
                          height: t.height,
                          ratio: t.width / t.height,
                      };
                  }),
                  this.findClosestResolution(t, i));
        },
        findClosestResolution: function (e, t) {
            var n = {
                    source: e,
                    width: e.width,
                    height: e.height,
                    ratio: e.width / e.height,
                },
                i = [],
                o = function (e, t) {
                    return Math.abs(e.diff) < Math.abs(t.diff)
                        ? -1
                        : Math.abs(e.diff) > Math.abs(t.diff)
                        ? 1
                        : 0;
                };
            return (
                Sys.iterate(t, function (e, t) {
                    var o,
                        s,
                        r,
                        a,
                        u = t;
                    (o = Math.abs(u.width - n.width)),
                        (s = Math.abs(u.height - n.height)),
                        (r = o + s),
                        (a = Math.abs(u.ratio - n.ratio)),
                        (u.diff = r * (1 + a)),
                        i.push(u);
                }),
                i.sort(o),
                i[0].source
            );
        },
        examineResolution: function (e) {
            return {
                source: e,
                width: e.width,
                height: e.height,
                ratio: e.width / e.height,
            };
        },
        getPlatformSpecificConfig: function (e, t) {
            var n = this.getCurrentPlatform(),
                i = "Low",
                o = "default";
            return (
                t &&
                    ((n = n.toUpperCase()),
                    (i = i.toUpperCase()),
                    (o = o.toUpperCase())),
                e[n] || e[n.replace(i, "")] || e[o] || null
            );
        },
        getOrientationSpecificConfig: function (e, t) {
            var n = Utils.Platform.getOrientation(),
                i = "default",
                o = "base",
                s = {};
            return Sys.isDefined(e) && null !== e
                ? (t
                      ? ((i = i.toUpperCase()), (o = o.toUpperCase()))
                      : ((n = n.toLowerCase()), (o = o.toLowerCase())),
                  Sys.isDefined(e[o])
                      ? ((s = Sys.applyProperties(s, e[o])),
                        (s = Sys.applyProperties(s, e[n] || {})))
                      : e[n] || e[i] || null)
                : null;
        },
        getConfigForCurrentDeviceState: function (e, t) {
            var n = this.getPlatformSpecificConfig(e, t);
            return this.getOrientationSpecificConfig(n, t);
        },
        getVirtualResolution: function (e) {
            var t = this.getConfigForCurrentDeviceState(e, !1, !0);
            return null !== t
                ? t
                : (console.error(
                      "No default virtual resolution provided. Please check documentation."
                  ),
                  null);
        },
        getTopAboveGame: function (e) {
            var t = this.getSpaceAboveGame();
            return Math.round(t * e - t);
        },
        getTopInGame: function (e) {
            return Math.round(this.determineResolution().resolution.height * e);
        },
        getTopBelowGame: function (e) {
            return Math.round(
                this.determineResolution().resolution.height +
                    e * this.getSpaceBelowGame()
            );
        },
        getBottomAboveGame: function (e) {
            return Math.round(-1 * this.getSpaceAboveGame() * e);
        },
        getBottomInGame: function (e) {
            return Math.round(this.determineResolution().resolution.height * e);
        },
        getBottomBelowGame: function (e) {
            var t = this.getSpaceBelowGame();
            return Math.round(e * t - t);
        },
        getSpaceAboveGame: function () {
            var e = Game.stage.getGameContainer().getBoundingClientRect(),
                t = 1 / Services.scaling.getScale();
            return e.top * t;
        },
        getSpaceBelowGame: function () {
            var e = Game.stage.getGameContainer().getBoundingClientRect(),
                t = 1 / Services.scaling.getScale(),
                n = Utils.Platform.isStandAlone()
                    ? Utils.Platform.getViewportSize()
                    : Utils.Platform.getViewportInnerSize(),
                i = e.top + e.height;
            return (n.height - i) * t;
        },
        getGameHeight: function () {
            return this.determineResolution().resolution.height;
        },
        getCroppedCanvasTopOffsetToBottom: function () {
            return this.determineResolution().resolution.height;
        },
        getCroppedViewportBottomOffset: function () {
            var e = this.determineResolution().resolution;
            return Math.abs(
                e.height - Utils.Platform.getViewportInnerSize().height
            );
        },
        getSupportedPlatforms: function () {
            return ["mobile", "mobileLow", "tablet", "tabletLow", "desktop"];
        },
        getCurrentPlatform: function () {
            var e = "mobile";
            return (
                Platform.isTabletDevice
                    ? (e = "tablet")
                    : Platform.isDesktopDevice && (e = "desktop"),
                "desktop" !== e && Platform.isLowEndDevice && (e += "Low"),
                e
            );
        },
        getCurrentPlatformCSS: function () {
            var e = "mobile";
            return (
                Platform.isTabletDevice
                    ? (e = "tablet")
                    : Platform.isDesktopDevice && (e = "desktop"),
                e
            );
        },
        orientation: function () {
            return this.getOrientation();
        },
        getScreenSize: function () {
            return {
                width: window.outerWidth,
                height: window.outerHeight,
            };
        },
        getRealScreenSize: function () {
            var e, t;
            return Platform.isDesktopDevice
                ? Utils.Platform.getViewportInnerSize()
                : ("PORTRAIT" === this.getDeviceOrientation()
                      ? ((e = Math.min(
                            window.screen.width,
                            window.screen.height
                        )),
                        (t = Math.max(
                            window.screen.width,
                            window.screen.height
                        )))
                      : "LANDSCAPE" === this.getDeviceOrientation() &&
                        ((e = Math.max(
                            window.screen.width,
                            window.screen.height
                        )),
                        (t = Math.min(
                            window.screen.width,
                            window.screen.height
                        ))),
                  {
                      width: e,
                      height: t,
                  });
        },
        getInnerScreenSize: function () {
            return {
                width: window.innerWidth,
                height: window.innerHeight,
            };
        },
        getScale: function () {
            return this.scale;
        },
        setScale: function (e) {
            this.scale = e;
        },
        goTo: function (e) {
            this.fireEvent("request:fullscreen.exit"),
                this.setWindowLocation(e);
        },
        setWindowLocation: function (e) {
            setTimeout(function () {
                window.location = Sys.utils.sanitizeURL(e);
            }, 300);
        },
        openNewBrowserTab: function (e, t) {
            window.open(e, t).focus();
        },
        goToCashier: function () {
            this.goToLobby(5);
        },
        reload: function () {
            window.location.reload();
        },
        getInteractionEvents: function (e) {
            return e ? this.interactionEvents[e] || [] : this.interactionEvents;
        },
        getEventType: function () {
            return this.eventType;
        },
        isStartEvent: function (e) {
            var t = this,
                n = Sys.contains(t.interactionEvents.start, e.type);
            return (
                "mousedown" !== e.type || t.leftButtonClicked(e) || (n = !1), n
            );
        },
        isEndEvent: function (e) {
            var t = this,
                n = Sys.contains(t.interactionEvents.end, e.type);
            return (
                "mouseup" !== e.type || t.leftButtonClicked(e) || (n = !1), n
            );
        },
        isMoveEvent: function (e) {
            return Sys.contains(this.interactionEvents.move, e.type);
        },
        isCancelEvent: function (e) {
            return Sys.contains(this.interactionEvents.cancel, e.type);
        },
        isScrollEvent: function (e) {
            return Sys.contains(this.interactionEvents.scroll, e.type);
        },
        isKeyUpEvent: function (e) {
            return Sys.contains(this.interactionEvents.keyUp, e.type);
        },
        isKeyDownEvent: function (e) {
            return Sys.contains(this.interactionEvents.keyDown, e.type);
        },
        isKeyPressEvent: function (e) {
            return Sys.contains(this.interactionEvents.keyPress, e.type);
        },
        isTouchCapable: function () {
            return (
                "ontouchstart" in window ||
                (window.DocumentTouch &&
                    document instanceof window.DocumentTouch) ||
                window.navigator.maxTouchPoints > 0 ||
                window.navigator.msMaxTouchPoints > 0
            );
        },
        defineInputEvents: function () {
            var e = this,
                t = [],
                n = [],
                i = [],
                o = [],
                s = [],
                r = [],
                a = [],
                u = [];
            window.navigator.pointerEnabled || window.navigator.msPointerEnabled
                ? (t.push(
                      window.navigator.pointerEnabled
                          ? "pointerdown"
                          : "MSPointerDown"
                  ),
                  n.push(
                      window.navigator.pointerEnabled
                          ? "pointermove"
                          : "MSPointerMove"
                  ),
                  i.push(
                      window.navigator.pointerEnabled
                          ? "pointerup"
                          : "MSPointerUp"
                  ),
                  o.push(
                      window.navigator.pointerEnabled
                          ? "pointerout"
                          : "MSPointerOut"
                  ),
                  Utils.Platform.isTouchSupported() ||
                      s.push(e.getMouseWheelEventName()),
                  u.push("pointerEvent"))
                : (Utils.Platform.isTouchSupported() &&
                      (t.push("touchstart"),
                      n.push("touchmove"),
                      i.push("touchend"),
                      o.push("touchcancel"),
                      u.push("touchEvent")),
                  Platform.isAndroidStockBrowser ||
                      (t.push("mousedown"),
                      n.push("mousemove"),
                      i.push("mouseup"),
                      o.push("mouseout"),
                      s.push(e.getMouseWheelEventName()),
                      u.push("mouseEvent"))),
                "desktop" === e.platform &&
                    (r.push("keyup"), a.push("keydown")),
                (e.interactionEvents = {
                    start: t,
                    move: n,
                    end: i,
                    cancel: o,
                    keyUp: r,
                    keyDown: a,
                    scroll: s,
                }),
                (e.eventType = u);
        },
        leftButtonClicked: function (e) {
            return "buttons" in e && 0 !== e.buttons
                ? 1 === e.buttons
                : "which" in e
                ? 1 === e.which
                : 0 === e.button;
        },
    }),
    (Sys.Environment = Sys.extend(
        Sys.Observable,
        Sys.Environment,
        "Sys.Environment"
    )),
    Sys.ns("Sys"),
    (Sys.Resources = {
        constructor: function () {
            var e = this;
            Sys.Resources.superclass.constructor.apply(e, arguments), e.init();
        },
        init: function () {
            this.data = {};
        },
        readData: function (e) {
            return this.data[e];
        },
        storeData: function (e, t) {
            return (
                (this.data[e] = t),
                this.fireEvent("notify:resources.dataStored", e),
                this.data[e]
            );
        },
        processAudio: function (e) {
            var t,
                n = this,
                i = n.readData(e),
                o = window.AudioContext,
                s = new o();
            s.decodeAudioData(
                i,
                function (i) {
                    (t = i),
                        n.storeData("decoded:" + e, {
                            context: s,
                            buffer: t,
                        }),
                        n.fireEvent("notify:resources.soundDecoded");
                },
                function () {}
            );
        },
        removeData: function (e) {
            delete this.data[e];
        },
    }),
    (Sys.Resources = Sys.extend(
        Sys.Observable,
        Sys.Resources,
        "Sys.Resources"
    )),
    Sys.ns("Sys"),
    Sys.ns("Services"),
    (Sys.Storage = {
        constructor: function () {
            Sys.Storage.superclass.constructor.apply(this, arguments),
                this.init();
        },
        init: function () {
            this.data = {};
        },
        readData: function (e) {
            return this.data[e];
        },
        storeData: function (e, t) {
            return (this.data[e] = t), this.data[e];
        },
        removeData: function (e) {
            delete this.data[e];
        },
    }),
    (Sys.Storage = Sys.extend(Sys.Observable, Sys.Storage, "Sys.Storage")),
    (Sys.UserInputUtils = {
        getDOMElementFromCoordinates: function (e) {
            var t;
            return !Sys.isObj(e) || (Sys.isDefined(e.x) && Sys.isDefined(e.y))
                ? ((t = document.elementFromPoint(e.x, e.y)),
                  Sys.isEmpty(t) ||
                      3 !== t.nodeType ||
                      (t.target = t.parentNode),
                  t)
                : null;
        },
        getUserInputCoordinates: function (e) {
            return {
                x: e.changedTouches ? e.changedTouches[0].clientX : e.clientX,
                y: e.changedTouches ? e.changedTouches[0].clientY : e.clientY,
            };
        },
        getDOMElementFromEvent: function (e) {
            return Sys.UserInputUtils.getDOMElementFromCoordinates(
                Sys.UserInputUtils.getUserInputCoordinates(e)
            );
        },
        calculateMetrics: function (e) {
            var t = e.getBoundingClientRect();
            return {
                top: t.top,
                left: t.left,
                width: t.width,
                height: t.height,
                scale: e.offsetWidth / t.width,
            };
        },
        getCoordinatesRelativeToElement: function (e, t) {
            var n = Sys.UserInputUtils.calculateMetrics(t);
            return {
                x: (e.x - n.left) * n.scale,
                y: (e.y - n.top) * n.scale,
            };
        },
        isParentAndChildElements: function (e, t) {
            return (
                e === t ||
                (!(!t || t === document.body || !t.parentElement) &&
                    this.isParentAndChildElements(e, t.parentElement))
            );
        },
        isCoordinateTarget: function (e, t) {
            return Sys.UserInputUtils.isParentAndChildElements(
                e,
                Sys.UserInputUtils.getDOMElementFromCoordinates(t)
            );
        },
        isEventTarget: function (e, t) {
            return Sys.UserInputUtils.isParentAndChildElements(
                e,
                Sys.UserInputUtils.getDOMElementFromEvent(t)
            );
        },
        isUserInputInSegment: function (e, t, n) {
            var i,
                o,
                s,
                r,
                a,
                u,
                c = t,
                l = n;
            if (!Sys.isDefined(e) || !Sys.isDefined(c)) return !1;
            for (
                Sys.isArray(c) || (c = [c]),
                    l = !Sys.isDefined(l) || l,
                    o = l
                        ? Environment.determineResolution().windowToVirtualScale
                        : 1,
                    s = e.x * o,
                    r = e.y * o,
                    u = -1,
                    i = c.length;
                ++u < i;

            )
                if (
                    ((a = c[u]),
                    s >= a.x &&
                        s <= a.x + a.width &&
                        r >= a.y &&
                        r <= a.y + a.height)
                )
                    return !0;
            return !1;
        },
    }),
    Sys.ns("Core"),
    (Core.LanguageManager = {
        constructor: function () {
            Core.LanguageManager.superclass.constructor.apply(this, arguments),
                (this.texts = {}),
                this.setupEvents();
        },
        setupEvents: function () {
            this.on({
                "notify:resources.dataStored": this.preload,
            });
        },
        preload: function (e) {
            var t;
            ("languageJSON" !== e && "languageXML" !== e) ||
                ((t = Resources.readData(e)),
                "languageJSON" === e
                    ? (this.texts = this.loadLanguage(t))
                    : "languageXML" === e &&
                      (this.texts = this.loadLanguageXML(t)),
                this.fireEvent("languageLoaded_event"));
        },
        loadLanguage: function (e) {
            return e.reduce(function (e, t) {
                var n = {};
                return (n[t.id] = t.text), Sys.applyProperties(e, n);
            }, {});
        },
        loadLanguageXML: function (e) {
            var t,
                n,
                i,
                o = Sys.utils.XMLHelper.findAll("ds", e.documentElement),
                s = {};
            for (t = 0; t < o.length; t++)
                (n = o.item(t)),
                    (i = Sys.utils.XMLHelper.getAttributeValue("name", n)),
                    (s[i] = n.textContent);
            return s;
        },
        getErrorText: function (e) {
            return this.hasText(e) ? this.getText(e) : "[Error ID not found]";
        },
        hasText: function (e) {
            return Sys.isDefined(this.texts[e]);
        },
        getText: function (e, t) {
            var n, i;
            return this.hasText(e)
                ? "" === this.texts[e]
                    ? "[" + e + " not translated]"
                    : ((i = this.texts[e].replace("%2B", "+")),
                      t
                          ? ((n = Sys.utils.getNodesByFormat(i, t)),
                            n.reduce(function (e, t) {
                                var n = e;
                                return (n += t.data.toString());
                            }, ""))
                          : i)
                : "[" + e + " not defined]";
        },
    }),
    (Core.LanguageManager = Sys.extend(
        Sys.Observable,
        Core.LanguageManager,
        "Core.LanguageManager"
    )),
    Sys.ns("Language"),
    (Language.Keys = {
        accountUnavailable: "OCTaccountUnavailable",
        additonalFreeSpinsWon: "OCTadditonalFreeSpinsWon",
        autoplay: "OCTautoplayPanelLabel",
        autoplay_advancedSettings: "OCTadvancedSettings",
        autoplay_numberSpins: "OCTnumberSpins",
        autoplay_panelStartText: "OCTautoplayPanelStartText",
        autoplay_setting_stopAutoPlay: "OCTstopAutoPlayColon",
        autoplay_setting_ifCashDecreasesBy: "OCTifCashDecreasesBy",
        autoplay_setting_ifCashIncreasesBy: "OCTifCashIncreasesBy",
        autoplay_setting_ifFBonusIsStarted: "OCTifFBonusIsStarted",
        autoplay_setting_ifFreeSpinsIsStarted: "OCTifFreeSpinsIsStarted",
        autoplay_setting_ifWinExeeds: "OCTifWinExeeds",
        autoplay_setting_onAnyWin: "OCTonAnyWin",
        autoplay_setting_ifCashDecreasesByInfoTouch: "OCTlossLimitInfoTouch",
        autoplay_setting_ifCashDecreasesByInfo: "OCTlossLimitInfo",
        autoplay_setting_ifCashDecreasesByWarning: "OCTlossLimitWarning",
        autoplay_setting_ifCashDecreasesByWarningTouch: "betExceedCDB",
        autoplay_stopAutoPlay: "OCTstopAutoPlay",
        autoplay_stopText: "OCTautoplayStopText",
        autoSpins: "OCTautoSpins",
        betColonVar: "OCTbetColonVar",
        betInCash: "OCTbetInCash",
        betInCoins: "OCTbetInCoins",
        betLevel: "OCTbetlevel",
        betSettings_uc: "OCTbetSettingsCaps",
        bigWin: "OCTbigWin",
        bonusAwardedTitle: "bonusAwardedTitle",
        bonusAwardedCongrats: "bonusAwardedCongrats",
        btn_autoplay: "OCTautoplayButton",
        btn_casino: "OCTcasino_btn",
        btn_checkEnd: "OCTCheckEndButton",
        btn_close: "OCTclose_btn",
        btn_continue: "OCTContinue",
        btn_deposit: "OCTdeposit_btn",
        btn_login: "OCTlogin_btn",
        btn_maxbet: "OCTmaxbetbutton",
        btn_no: "OCTbtnNo",
        btn_ok: "OCTbtnOK",
        btn_reduceBet: "OCTreduceBet_btn",
        btn_reload: "OCTreload_btn",
        btn_sessionTimeOut: "OCTreload_btnRev",
        btn_yes: "OCTbtnYes",
        btn_addValue: "addValue",
        cash: "OCTcash",
        cashColon: "OCTcashColon",
        cashColonVar: "OCTcashColonVar",
        cashWonColon: "OCTcashWonColon",
        coinsColonVar: "OCTcoinsColonVar",
        coinsWonColon: "OCTcoinsWonColon",
        coinValue: "OCTcoinValue",
        congratulations: "OCTcongratsLC",
        congratulations_uc: "OCTcongratsUC",
        connectionLost: "OCTconnectionLost",
        connectionQualityPoor: "OCTconnectionQualityPoor",
        continue: "OCTContinue",
        continue_uc: "OCTbutton_CONTINUE",
        continuePlaying: "OCTcontinuePlaying",
        deposit: "OCTdeposit",
        depositPlay: "OCTdepositPlay",
        error: "OCTerror",
        freeRounds_expired: "OCTfreerounds",
        freeRoundsFinished: "OCTfreeRoundsFinished",
        freeRoundsLeftColon: "OCTFreeRoundsLeftwithColon",
        freeRoundsOfferUsed: "16",
        freeRoundsVar: "OCTfreeRoundsVar",
        freeRoundsExtraTitle: "OCTfreeRoundsExtraTitle",
        freeRoundsExtraWon: "OCTfreeRoundsExtraWon",
        freeRoundWidgetFirstNoWin: "freeRoundWidgetFirstNoWin",
        freeRoundWidgetIntro: "freeRoundWidgetIntro",
        freeRoundWidgetPlurCongratulations:
            "freeRoundWidgetPlurCongratulations",
        freeRoundWidgetSingCongratulations:
            "freeRoundWidgetSingCongratulations",
        freeRoundWidgetSecondNoWin: "freeRoundWidgetSecondNoWin",
        freeSpins: "OCTfreeSpinsUC",
        freeSpinsLeftColonVar: "OCTfreeSpinsLeftColonVar",
        gameClientVersion: "OCTgameClientVersion",
        gameHistory: "OCTgameHistory",
        gameHistory_uc: "OCTgameHistoryHeadingUC",
        gameHistoryHeading: "OCTgameHistoryHeadingUC",
        gameRules_uc: "OCTgameRulesUC",
        gameServerVersion: "OCTgameServerVersion",
        gameSettingsPanelLabel: "OCTslidePanelLabel",
        gameUnavailable: "OCTgameUnavailable",
        haveFreeRounds: "OCThaveFreeRounds",
        historyNotAvailable: "OCThistoryNotAvailable",
        landscapeMode: "OCTlandscapeMode",
        level: "OCTlevel",
        loading: "OCTloadingText",
        loadingDots: "OCTloading",
        loadingTakesLonger: "OCTloadingTakesLonger",
        lostConnectInactivity: "OCTlostConnectInactivity",
        machinetext_bet: "OCTmachinetext_bet",
        machinetext_coins: "OCTmachinetext_coins",
        machinetext_coinvalue: "OCTmachinetext_coinvalue",
        machinetext_win: "OCTmachinetext_win",
        megaWin: "OCTmegaWin",
        messageCaption: "OCTmessagecaption",
        maxBet: "OCTmaxBet",
        minBet: "OCTminBet",
        newHistoryWindow: "OCTnewHistoryWindow",
        outOfMoney: "OCToutOfMoney",
        paytable_betLineWinsLeftToRightOnly: "OCTbetLineWinsLeftToRightOnly",
        paytable_extraInfo: "OCTextraInfo",
        paytable_highest: "OCTpaytableHighest",
        paytable_symbolPayout: "OCTsymbolPayout",
        paytable_uc: "OCTbutton_paytableUC",
        paytable_voidAllPays: "OCTvoidAllPays",
        paytable_winningBetLinesHeading: "OCTwinningBetLinesHeading",
        playingForFun: "OCTplayingForFun",
        youPlayingForFun: "OCTyouPlayingFun",
        playLimit: "OCTplayLimit",
        quickSpin: "OCTquickSpin",
        rc_checkPlayingLost: "OCTRCheckPlayingLost",
        rc_checkPlayingWon: "OCTRCheckPlayingWon",
        rc_checkReminder: "OCTRCcheckReminder",
        reduce: "OCTreduce",
        reload: "OCTreload",
        reset: "OCTreset",
        restoredGameHeader: "OCTrestoredGameHeader",
        returnToLobby: "OCTreturnToLobby",
        roundsLeft: "OCTroundsLeft",
        roundsUseAcctMoney: "OCTroundsUseAcctMoney",
        sessionTimeOut: "OCTsessionTimeOut",
        setting_gameSound: "OCTgameSound",
        setting_gameVibration: "OCTgameVibration",
        setting_introGame: "OCTintroGameSetting",
        setting_introScreenGame: "OCTintroScreeGameSetting",
        setting_isCash: "setting_isCash",
        setting_leftHandMode: "OCTleftHandMode",
        setting_quickSpinGame: "OCTquickSpinGameSetting",
        setting_spaceSpin: "OCTspaceSpin",
        skipIntro: "OCTskipIntro",
        slowConnection: "OCTslowConnection",
        soundSettings_uc: "OCTsoundSettingsCaps",
        spinSettings_uc: "OCTspinSettingsCaps",
        spinsLeftText: "OCTspinsLeftText",
        startFreespins: "OCTstartFreeSpins",
        stopIfFreeSpins: "OCTstopIfFreeSpins",
        superMegaWin: "OCTsuperMegaWin",
        totalbet: "OCTtotalbet",
        totalWin: "OCTTotalWinwithColonVar",
        totalWinColon: "OCTtotalWinWithColon",
        totalWinColon_uc: "OCTtotalWinUCnoVar",
        totalWinColonVar: "OCTtotalWinColonVar",
        totalWinColonVar_uc: "OCTTotalWinwithColonUC",
        varRetriggerFSNoSpan: "OCTvarRetriggerFSNoSpan",
        win: "OCTWin",
        winColon_uc: "OCTwinColonUC",
        winColonVar: "OCTwinColonVar",
        winUpTo: "OCTwinUpTo",
        youWin: "OCTyouWinUCNoExclamation",
        youWonCoins: "OCTyouWonCoins",
        cookiePolicy: "cookiePolicy",
        cookiePolicyPart2: "cookiePolicyPart2",
        totalWinUC: "OCTTotalWinSingleUC",
        chooseAutoplayStopConditions: "OCTchooseAutoplayStopConditions",
        chooseAutoplayRounds: "OCTchooseAutoplayRounds",
        balance: "OCTbalance",
        bet: "OCTmachinetext_bet",
        coins: "OCTmachinetext_coins",
        gameRulesNewTab: "OCTgameRulesNewTab",
        gameHistoryNewTab: "OCTgameHistoryNewTab",
        gameMode: "OCTgameMode",
        required: "OCTrequired",
        open: "OCTopen",
        deviceBestGameExperience: "deviceBestGameExperience",
        deviceBrowserUpdateMust: "deviceBrowserUpdateMust",
        deviceOptimizedFor: "deviceOptimizedFor",
        deviceUpdateBrowser: "deviceUpdateBrowser",
        deviceUpdateOS: "deviceUpdateOS",
        deviceUseBrowser: "deviceUseBrowser",
        gameOptimisedFor: "gameOptimisedFor",
        MGcontinueYesNo: "MGcontinueYesNo",
        MGdeviceNoSupport: "MGdeviceNoSupport",
        MGnoOSSupport: "MGnoOSSupport",
        optimisedForVersion: "optimisedForVersion",
        upgradeIn: "upgradeIn",
    }),
    Sys.ns("Core"),
    (Core.DeviceDetectionCodes = {
        WHITE: 0,
        GREY_OS: 1,
        GREY_OS_VERSION: 2,
        GREY_BROWSER: 3,
        GREY_BROWSER_VERSION: 4,
        BLACK_OS: 5,
        BLACK_OS_VERSION: 6,
        BLACK_BROWSER: 7,
        BLACK_BROWSER_VERSION: 8,
    }),
    (Core.DeviceDetectionService = (function () {
        var e, t, n, i, o;
        return (
            (e = function (e, t, n) {
                var i,
                    o = new RegExp(t),
                    s = o.exec(e);
                if (!(s && s.length > 0))
                    throw new Error("Could not find a matching version");
                if (
                    ((i = s[1]),
                    n && (i = i.replace(new RegExp(n, "g"), ".")),
                    !Core._DeviceDetectionUtils.isVersionNumber(i))
                )
                    throw new Error("The match found is not a valid version");
                return i;
            }),
            (t = function (t, n, i) {
                var o,
                    s,
                    r,
                    a,
                    u,
                    c,
                    l,
                    d = Object.keys(n),
                    h = d.length;
                for (l = 0; l < h; l++)
                    if (
                        ((o = n[d[l]]),
                        (s = i[d[l]]),
                        (a = !1),
                        (r = new RegExp(s.matchPattern)),
                        s.excludePattern &&
                            (a = new RegExp(s.excludePattern).test(t)),
                        r.test(t) && !a)
                    )
                        return (
                            o.version
                                ? ((u = e(
                                      t,
                                      s.version.matchPattern,
                                      s.version.separator
                                  )),
                                  (c = Core._DeviceDetectionUtils.isInRange(
                                      u,
                                      o.version.min,
                                      o.version.max
                                  )))
                                : (c = !0),
                            {
                                name: d[l],
                                inRange: c,
                            }
                        );
                return null;
            }),
            (n = function (e, n) {
                var i,
                    o,
                    s = n.definitions.operatingSystems,
                    r = n.ruleSets.white || {},
                    a = t(e, r, s),
                    u = {};
                if (a) {
                    if (
                        ((u.allowed = !0),
                        (u.preferredBrowser = s[a.name].preferredBrowser),
                        !a.inRange)
                    )
                        return (
                            (u.code =
                                Core.DeviceDetectionCodes.GREY_OS_VERSION),
                            u
                        );
                    (o = r[a.name].browsers),
                        (i = t(e, o || {}, n.definitions.browsers)),
                        o
                            ? i
                                ? i.inRange
                                    ? (u.code = Core.DeviceDetectionCodes.WHITE)
                                    : (u.code =
                                          Core.DeviceDetectionCodes.GREY_BROWSER_VERSION)
                                : (u.code =
                                      Core.DeviceDetectionCodes.GREY_BROWSER)
                            : (u.code = Core.DeviceDetectionCodes.WHITE);
                }
                return u;
            }),
            (i = function (e, n) {
                var i,
                    o,
                    s,
                    r,
                    a = n.definitions.operatingSystems,
                    u = n.ruleSets.black || {},
                    c = t(e, u, a),
                    l = {};
                return (
                    c &&
                        c.inRange &&
                        ((i = u[c.name]),
                        (o = i.browsers),
                        (s = t(e, o || {}, n.definitions.browsers)),
                        s && s.inRange
                            ? ((r = o[s.name]),
                              (l.preferredBrowser = a[c.name].preferredBrowser),
                              (l.allowed = !1),
                              r.version
                                  ? (l.code =
                                        Core.DeviceDetectionCodes.BLACK_BROWSER_VERSION)
                                  : (l.code =
                                        Core.DeviceDetectionCodes.BLACK_BROWSER))
                            : i.version
                            ? o ||
                              ((l.allowed = !1),
                              (l.code =
                                  Core.DeviceDetectionCodes.BLACK_OS_VERSION))
                            : ((l.allowed = !1),
                              (l.code = Core.DeviceDetectionCodes.BLACK_OS))),
                    l
                );
            }),
            (o = function (e, t) {
                var o = {
                    preferredBrowser: null,
                    allowed: !0,
                    code: Core.DeviceDetectionCodes.GREY_OS,
                };
                return (
                    Sys.applyProperties(o, n(e, t)),
                    Sys.applyProperties(o, i(e, t)),
                    o
                );
            }),
            {
                validate: function (e, t) {
                    if ("string" != typeof e)
                        throw new Error(
                            "Could not validate the device since the user agent was not a string"
                        );
                    if (!Sys.isObj(t))
                        throw new Error(
                            "Could not validate the device since the configuration was not an object"
                        );
                    return o(e, t);
                },
            }
        );
    })()),
    Sys.ns("Core"),
    (Core._DeviceDetectionUtils = (function () {
        return {
            isVersionNumber: function (e) {
                return /^\d+(\.\d+){0,2}$/.test(e);
            },
            compareVersions: function (e, t) {
                var n, i, o, s, r;
                if (
                    !Core._DeviceDetectionUtils.isVersionNumber(e) ||
                    !Core._DeviceDetectionUtils.isVersionNumber(t)
                )
                    throw new Error(
                        "The versions provided are not valid versions"
                    );
                for (
                    s = e.split(".").map(parseFloat),
                        r = t.split(".").map(parseFloat);
                    s.length < r.length;

                )
                    s.push(0);
                for (; r.length < s.length; ) r.push(0);
                for (n = 0; n < s.length; n++)
                    if (((i = s[n]), (o = r[n]), i !== o))
                        return i < o ? -1 : 1;
                return 0;
            },
            isInRange: function (e, t, n) {
                var i = !0,
                    o = !0;
                return (
                    t &&
                        Core._DeviceDetectionUtils.compareVersions(e, t) < 0 &&
                        (i = !1),
                    n &&
                        Core._DeviceDetectionUtils.compareVersions(e, n) > 0 &&
                        (o = !1),
                    i && o
                );
            },
        };
    })()),
    Sys.ns("Sys.utils"),
    (Sys.utils.XMLHelper = {
        getNodeValue: function (e, t) {
            var n;
            return t.getElementsByTagName &&
                ((n = t.getElementsByTagName(e)), n.length > 0)
                ? n[0].textContent
                : null;
        },
        findNode: function (e, t) {
            var n;
            return t.getElementsByTagName &&
                ((n = t.getElementsByTagName(e)), n.length > 0)
                ? n[0]
                : null;
        },
        findAll: function (e, t) {
            return !Sys.isEmpty(t) && t.getElementsByTagName
                ? t.getElementsByTagName(e)
                : [];
        },
        getAttributeValue: function (e, t) {
            return t.attributes && t.hasAttribute(e)
                ? t.attributes.getNamedItem(e).value
                : null;
        },
        toJSON: function (e) {
            var t,
                n,
                i,
                o,
                s = {
                    tag: e.nodeName,
                };
            if (e.hasChildNodes())
                for (
                    s.children = [], i = 0, o = e.childNodes.length;
                    i < o;
                    i++
                )
                    (t = e.childNodes.item(i)),
                        1 === t.nodeType
                            ? s.children.push(this.toJSON(t))
                            : 3 === t.nodeType &&
                              (s.text = t.nodeValue.replace(/^\s+|\s+$/g, ""));
            if (e.attributes)
                for (
                    s.attributes = {}, i = 0, o = e.attributes.length;
                    i < o;
                    i++
                )
                    (n = e.attributes[i]),
                        (s.attributes[n.nodeName] = n.nodeValue);
            return (
                (s.find = this.findNodeInJSON),
                (s.findAll = this.findAllNodesInJSON),
                s
            );
        },
        findNodeInJSON: function (e) {
            return (
                Sys.find(this.children, function (t) {
                    return t.tag === e;
                }) || null
            );
        },
        findAllNodesInJSON: function (e) {
            return this.children.filter(function (t) {
                return t.tag === e;
            });
        },
        getMoneyFormatFromXML: function (e, t) {
            var n,
                i,
                o = this.findAll("moneyformat", e);
            for (i = 0, n = o.length; i < n; i++)
                if (this.getNodeValue("iso", o[i]) === t)
                    return this.getMoneyFormatFromNode(o[i]);
            return null;
        },
        getMoneyFormatFromNode: function (e) {
            var t = this.findNode("dividers", e),
                n = this.getAttributeValue("thousands", t),
                i = this.getAttributeValue("decimal", t),
                o = this.findNode("curchar", e);
            return {
                thousandsDivider: n,
                decimalDivider: i,
                currencyChar: o.textContent,
                isCurrCharAfter: "true" === this.getAttributeValue("after", o),
                iso: this.findNode("iso", e).textContent,
            };
        },
    });
Sys.ns("Platform"),
    (Platform.PlatformManager = {
        AVAILABLE_RESOURCE_BUNDLES: [],
        gatherUserAgentInformation: function () {
            var e,
                i = navigator.userAgent.toLowerCase();
            (Platform.isWindowsMobileDevice = !1),
                (Platform.isWindowsHandHeldDevice = !1),
                (Platform.isMobileDevice = !1),
                (Platform.isDesktopDevice = !1),
                (Platform.isMacintoshDevice = !1),
                (Platform.isWindowsTabletDevice = !1),
                (Platform.isTabletDevice = !1),
                (Platform.isAndroidDevice = !1),
                (Platform.isAndroidMajorVersion = !1),
                (Platform.isAndroidMinorVersion = !1),
                (Platform.isChromeBrowser = !1),
                (Platform.isChromeMajorVersion = !1),
                (Platform.isChromeMinorVersion = !1),
                (Platform.isAndroidStockBrowser = !1),
                (Platform.isSamsungS2Device = !1),
                (Platform.isSamsungS3Device = !1),
                (Platform.isSamsungS4Device = !1),
                (Platform.isIEBrowser = !1),
                (Platform.isEdgeBrowser = !1),
                (Platform.isSafariBrowser = !1),
                (Platform.isLowEndDevice = !1),
                (Platform.isVibrationAPISupported = !1),
                (Platform.isStandalone = !1),
                /Windows Phone/i.test(i)
                    ? ((Platform.isWindowsMobileDevice = !0),
                      (Platform.isWindowsHandHeldDevice = !0),
                      (Platform.isMobileDevice = !0))
                    : /\sarm;/.test(i) &&
                      /trident/.test(i) &&
                      ((Platform.isWindowsTabletDevice = !0),
                      (Platform.isWindowsHandHeldDevice = !0),
                      (navigator.msMaxTouchPoints > 0 && window.MouseEvent) ||
                      /touch; wpdesktop/.test(i)
                          ? (Platform.isTabletDevice = !1)
                          : (Platform.isTabletDevice = !0)),
                /Macintosh/i.test(i) && (Platform.isMacintoshDevice = !0),
                /ipod|ipad|iphone/i.test(i) &&
                    !0 !== Platform.isWindowsHandHeldDevice &&
                    ((Platform.isIOSDevice = !0),
                    /ipad/i.test(i)
                        ? (Platform.isTabletDevice = !0)
                        : (Platform.isMobileDevice = !0),
                    /iPhone\sOS\s13/i.test(i) && (Platform.isIOS13Device = !0),
                    /iPhone\sOS\s14/i.test(i) && (Platform.isIOS14Device = !0),
                    !0 === window.navigator.standalone &&
                        (Platform.isStandalone = !0),
                    (Platform.iPhoneWithHomeIndicator = (function () {
                        var e = window.devicePixelRatio || 1,
                            i = {
                                width: window.screen.width * e,
                                height: window.screen.height * e,
                            },
                            o = function (e, o) {
                                return (
                                    (i.width === e && i.height === o) ||
                                    (i.width === o && i.height === e)
                                );
                            },
                            t = o(1125, 2436),
                            r = o(1125, 2436),
                            s = o(1242, 2688),
                            a = o(828, 1792);
                        return t || r || s || a;
                    })())),
                /Android/i.test(i) &&
                    !0 !== Platform.isWindowsHandHeldDevice &&
                    ((Platform.isAndroidDevice = !0),
                    (e = i.match(/Android (\d+)(\.\d*)*/i)),
                    (Platform.isAndroidMajorVersion = Number(e[1])),
                    (Platform.isAndroidMinorVersion = Number(e[2])),
                    /mobile/i.test(i)
                        ? (Platform.isMobileDevice = !0)
                        : (Platform.isTabletDevice = !0),
                    /Chrome/i.test(i)
                        ? ((Platform.isChromeBrowser = !0),
                          (e = i.match(/Chrome\/(\d+)\.(\d+)/i)),
                          (Platform.isChromeMajorVersion = Number(e[1])),
                          (Platform.isChromeMinorVersion = Number(e[2])))
                        : (Platform.isAndroidStockBrowser = !0),
                    /GT-I9100/i.test(i) && (Platform.isSamsungS2Device = !0),
                    /GT-I9300/i.test(i) && (Platform.isSamsungS3Device = !0),
                    /GT-I9505|GT-I9521|GT-I9525/i.test(i) &&
                        (Platform.isSamsungS4Device = !0)),
                Platform.isMobileDevice ||
                    Platform.isTabletDevice ||
                    (Platform.isDesktopDevice = !0),
                (Platform.isIEBrowser = /trident/i.test(i)),
                (Platform.isEdgeBrowser = /edge/i.test(i)),
                (Platform.isSafariBrowser =
                    /Safari/i.test(i) &&
                    !/Chrome/i.test(i) &&
                    !/CriOS/i.test(i)),
                (Platform.isChromeForIOS = /CriOS/i.test(i)),
                (!Platform.isDesktopDevice ||
                    (Platform.isDesktopDevice &&
                        Sys.isDefined(window.orientation))) &&
                    ((Platform.isLowEndDevice = this.checkIfLowEndDevice(i)),
                    (Platform.isVibrationAPISupported =
                        this.isVibrationAPISupported(navigator)));
        },
        checkIfLowEndDevice: function (e) {
            var i = !1;
            return (
                (Platform.isAndroidStockBrowser ||
                    (4 === Platform.isAndroidMajorVersion &&
                        Platform.isAndroidMinorVersion <= 3 &&
                        Platform.isAndroidMajorVersion < 5) ||
                    Sys.isIphone3GS ||
                    (Sys.isiPad &&
                        !window.matchMedia(
                            "(-webkit-min-device-pixel-ratio: 2)"
                        ).matches) ||
                    (Platform.isWindowsHandHeldDevice &&
                        this.isLowMemoryWinPhone(e)) ||
                    !this.isWebGLSupported()) &&
                    (i = !0),
                i
            );
        },
        isLowMemoryWinPhone: function (e) {
            var i,
                o = [];
            return !!(
                /Lumia/i.test(e) &&
                ((i = e.match(/[L|l]umia (\d+)/i)), o.indexOf(i[1]) > -1)
            );
        },
        isWebGLSupported: function () {
            var e,
                i,
                o = {
                    stencil: !0,
                };
            try {
                return (
                    !!window.WebGLRenderingContext &&
                    ((e = document.createElement("canvas")),
                    (i =
                        e.getContext("webgl", o) ||
                        e.getContext("experimental-webgl", o)),
                    Boolean(i && i.getContextAttributes().stencil))
                );
            } catch (e) {
                return !1;
            }
        },
        isVibrationAPISupported: function (e) {
            return Sys.isDefined(
                e.vibrate || e.webkitVibrate || e.mozVibrate || e.msVibrate
            );
        },
        detectPlatformFeatures: function () {
            var e, i;
            for (
                Platform.hasWebAudioContext =
                    this.isWebAudioContextAvailable() &&
                    !Platform.isAndroidStockBrowser,
                    Platform.hasFullscreenAPI = !1,
                    e = [
                        "exitFullscreen",
                        "webkitExitFullscreen",
                        "webkitCancelFullScreen",
                        "mozCancelFullScreen",
                        "msExitFullscreen",
                    ],
                    i = 0;
                i < e.length;
                i++
            )
                if (e[i] in document) {
                    Platform.hasFullscreenAPI = !0;
                    break;
                }
        },
        isWebAudioContextAvailable: function () {
            return Sys.isDefined(window.AudioContext);
        },
        consolidatePlatformKnowledge: function () {
            var e =
                    4 === Platform.isAndroidMajorVersion &&
                    3 === Platform.isAndroidMinorVersion,
                i = Platform.isSamsungS3Device || Platform.isSamsungS4Device,
                o = Platform.isAndroidStockBrowser;
            (o = o || Platform.isIphone3GSDevice),
                (o = o || (e && i && 28 === Platform.isChromeMajorVersion)),
                (Platform.isWebAudioEnabled =
                    Platform.hasWebAudioContext && !o);
        },
        applyOverrides: function () {},
        determineResourceBundle: function () {
            var e,
                i,
                o = this;
            if (!Sys.isDefined(Platform.resourceBundle)) {
                for (
                    o.detectPlatformFeatures(),
                        o.consolidatePlatformKnowledge(),
                        o.applyOverrides(),
                        e = 0;
                    e < o.AVAILABLE_RESOURCE_BUNDLES.length;
                    e++
                )
                    if (
                        ((i = Platform["_" + o.AVAILABLE_RESOURCE_BUNDLES[e]]),
                        i.requirementsAreMet())
                    ) {
                        (Platform.resourceBundle = i),
                            (Platform.resourceBundle.preloadAudio =
                                i.preloadAudio());
                        try {
                            Platform.hasWebGLContext =
                                i.preloadOptionalWebGLLibrary();
                        } catch (e) {
                            break;
                        }
                    }
                o.applyFeatureDetectedProperties();
            }
        },
        applyFeatureDetectedProperties: function () {
            Platform.resourceBundle.loaderResourceKeys.audio =
                this.determineAudioConfiguration(
                    Platform.resourceBundle.loaderResourceKeys.audio
                );
        },
        determineAudioConfiguration: function (e) {
            var i,
                o,
                t = Platform.hasWebAudioContext ? "webAudio" : "legacyAudio",
                r = "";
            return (
                "webAudio" !== t ||
                    Platform.isDesktopDevice ||
                    ((i =
                        Platform.resourceBundle.audioType &&
                        Platform.resourceBundle.audioType.postFix
                            ? Platform.resourceBundle.audioType.postFix
                            : "_mobile"),
                    (t += i || "_mobile"),
                    (r = "_sprite")),
                (o = "_" + e + r),
                t + o
            );
        },
    });
Sys.ns("Platform"),
    (Platform._android = {
        IDENTIFIER: "Android",
        loaderResourceKeys: {
            GFX: "960x540",
            audio: "ogg",
        },
        requirementsAreMet: function () {
            return Platform.isAndroidDevice;
        },
        preloadAudio: function () {
            return !1;
        },
        preloadOptionalWebGLLibrary: function () {
            return !1;
        },
    }),
    Platform.PlatformManager.AVAILABLE_RESOURCE_BUNDLES.push("android");
Sys.ns("Platform"),
    (Platform._mobile = {
        IDENTIFIER: "mobile",
        loaderResourceKeys: {
            GFX: "960x540",
            audio: "mp3",
        },
        requirementsAreMet: function () {
            return !Platform.isDesktopDevice && !Platform.isLowEndDevice;
        },
        preloadAudio: function () {
            return !1;
        },
        preloadOptionalWebGLLibrary: function () {
            return !1;
        },
    }),
    Platform.PlatformManager.AVAILABLE_RESOURCE_BUNDLES.push("mobile");
Sys.ns("Platform"),
    (Platform._mobile_low = {
        IDENTIFIER: "mobileLow",
        loaderResourceKeys: {
            GFX: "960x540",
            audio: "mp3",
        },
        requirementsAreMet: function () {
            return !Platform.isDesktopDevice && Platform.isLowEndDevice;
        },
        preloadAudio: function () {
            return !1;
        },
        preloadOptionalWebGLLibrary: function () {
            return !1;
        },
    }),
    Platform.PlatformManager.AVAILABLE_RESOURCE_BUNDLES.push("mobile_low");
Sys.ns("Platform"),
    (Platform._android_low = {
        IDENTIFIER: "androidLow",
        loaderResourceKeys: {
            GFX: "960x540",
            audio: "ogg",
        },
        requirementsAreMet: function () {
            return Platform.isAndroidDevice && Platform.isLowEndDevice;
        },
        preloadAudio: function () {
            return !1;
        },
        preloadOptionalWebGLLibrary: function () {
            return !1;
        },
    }),
    Platform.PlatformManager.AVAILABLE_RESOURCE_BUNDLES.push("android_low");
Sys.ns("Platform"),
    (Platform._desktop = {
        IDENTIFIER: "Desktop",
        loaderResourceKeys: {
            GFX: "1280x720",
            audio: "ogg",
        },
        requirementsAreMet: function () {
            return Platform.isDesktopDevice;
        },
        preloadAudio: function () {
            return Platform.hasWebAudioContext;
        },
        preloadOptionalWebGLLibrary: function () {
            return !1;
        },
    }),
    Platform.PlatformManager.AVAILABLE_RESOURCE_BUNDLES.push("desktop");
Sys.ns("Platform"),
    (Platform._desktop_edge = {
        IDENTIFIER: "Desktop Edge",
        loaderResourceKeys: {
            GFX: "1280x720",
            audio: "mp3",
        },
        requirementsAreMet: function () {
            return Platform.isDesktopDevice && Platform.isEdgeBrowser;
        },
        preloadAudio: function () {
            return Platform.hasWebAudioContext;
        },
        preloadOptionalWebGLLibrary: function () {
            return !1;
        },
    }),
    Platform.PlatformManager.AVAILABLE_RESOURCE_BUNDLES.push("desktop_edge");
Sys.ns("Platform"),
    (Platform._desktop_IE = {
        IDENTIFIER: "Desktop IE",
        loaderResourceKeys: {
            GFX: "1280x720",
            audio: "mp3",
        },
        requirementsAreMet: function () {
            return Platform.isDesktopDevice && Platform.isIEBrowser;
        },
        preloadAudio: function () {
            return Platform.hasWebAudioContext;
        },
        preloadOptionalWebGLLibrary: function () {
            return !1;
        },
    }),
    Platform.PlatformManager.AVAILABLE_RESOURCE_BUNDLES.push("desktop_IE");
Sys.ns("Platform"),
    (Platform._desktop_safari = {
        IDENTIFIER: "Desktop Safari",
        loaderResourceKeys: {
            GFX: "1280x720",
            audio: "mp3",
        },
        requirementsAreMet: function () {
            return Platform.isDesktopDevice && Platform.isSafariBrowser;
        },
        preloadAudio: function () {
            return Platform.hasWebAudioContext;
        },
        preloadOptionalWebGLLibrary: function () {
            return !1;
        },
    }),
    Platform.PlatformManager.AVAILABLE_RESOURCE_BUNDLES.push("desktop_safari");
Sys.ns("Platform"),
    (Platform._default = {
        IDENTIFIER: "Default",
        loaderResourceKeys: {
            GFX: "960x540",
            audio: "mp3",
        },
        requirementsAreMet: function () {
            return !1;
        },
        preloadAudio: function () {
            return !1;
        },
        preloadOptionalWebGLLibrary: function () {
            return !1;
        },
    }),
    Platform.PlatformManager.AVAILABLE_RESOURCE_BUNDLES.push("default");
Sys.ns("Interface.utils"),
    (Interface.utils.UserInputBase = {
        CSS: {},
        constructor: function (n) {
            Interface.utils.UserInputBase.superclass.constructor.apply(
                this,
                arguments
            ),
                this.init(n);
        },
        enable: function () {
            var n = this;
            (n.enabled = !0),
                n.startListeningToUserInput(),
                n.container.removeCls(n.CSS.disabled);
        },
        disable: function () {
            var n = this;
            (n.enabled = !1),
                n.stopListeningToUserInput(),
                n.container.addCls(n.CSS.disabled);
        },
        isEnabled: function () {
            return this.enabled;
        },
        lock: function (n) {
            var e = this;
            Sys.contains(e.locker, n) || e.locker.push(n), e.disable();
        },
        unlock: function (n) {
            var e = this,
                t = e.locker.indexOf(n);
            t >= 0 && e.locker.splice(t, 1), e.isLocked() || e.enable();
        },
        isLocked: function () {
            return 0 !== this.locker.length;
        },
        getContainer: function () {
            return this.container;
        },
        init: function (n) {
            var e = this;
            (n = n || {}),
                (n.cls = "string" == typeof n.cls ? n.cls : ""),
                (e.id = n.id),
                (e.locker = []),
                Sys.isDefined(n.CSS) && (e.CSS = Sys.applyIf(n.CSS, e.CSS)),
                e.setupContainer(n),
                n.enabled ? e.enable() : e.disable();
        },
        onUserInputStart: function () {},
        onUserInputEnd: function () {},
        onUserInputMove: function () {},
        onUserInputCanceled: function () {},
        setupContainer: function () {
            var n = this;
            n.container = new Sys.Element({
                id: n.id,
                tag: "div",
                cls: n.CSS.base,
            });
        },
        startListeningToUserInput: function () {
            var n = this;
            n.on({
                "notify:userInputManager.userInputStarted": n.onUserInputStart,
                "notify:userInputManager.userInputEnded": n.onUserInputEnd,
                "notify:userInputManager.userInputMove": n.onUserInputMove,
                "notify:userInputManager.userInputCanceled":
                    n.onUserInputCanceled,
            });
        },
        stopListeningToUserInput: function () {
            var n = this;
            n.removeListener("notify:userInputManager.userInputStarted"),
                n.removeListener("notify:userInputManager.userInputEnded"),
                n.removeListener("notify:userInputManager.userInputMove"),
                n.removeListener("notify:userInputManager.userInputCanceled");
        },
        setValue: function () {},
    }),
    (Interface.utils.UserInputBase = Sys.extend(
        Sys.Observable,
        Interface.utils.UserInputBase,
        "Interface.utils.UserInputBase"
    ));
Sys.ns("Interface.utils"),
    (Interface.utils.Button = {
        CSS: {
            base: "button",
            pressed: "button_pressed",
            disabled: "button_disabled",
        },
        DEFAULT_USER_INPUT_EVENTS: {
            started: "notify:userInputManager.userInputStarted",
            ended: "notify:userInputManager.userInputEnded",
            move: "notify:userInputManager.userInputMove",
            canceled: "notify:userInputManager.userInputCanceled",
        },
        constructor: function (e) {
            Interface.utils.Button.superclass.constructor.apply(
                this,
                arguments
            );
        },
        enable: function () {
            var e = this;
            (e.enabled = !0),
                e.container.removeCls(e.CSS.disabled),
                e.enableInteraction && e.startListeningToUserInput();
        },
        disable: function () {
            var e = this;
            (e.enabled = !1),
                e.container.addCls(e.CSS.disabled),
                e.enableInteraction && e.stopListeningToUserInput();
        },
        setText: function (e) {
            (this.label = e), (this.container.el.textContent = e);
        },
        getText: function () {
            return this.label;
        },
        show: function (e) {
            this.container.el.style.display = Sys.isDefined(e) ? e : "block";
        },
        hide: function () {
            this.container.el.style.display = "none";
        },
        init: function (e) {
            var t = this;
            Sys.isDefined(e.userInputEvents)
                ? (t.userInputEvents = e.userInputEvents)
                : (t.userInputEvents = t.DEFAULT_USER_INPUT_EVENTS),
                (t.clickCallback = e.clickCallback),
                (t.enableInteraction = Sys.isDefined(t.clickCallback)),
                Interface.utils.Button.superclass.init.call(t, e),
                !0 === e.hidden && t.hide(),
                "string" == typeof e.label && t.setText(e.label);
        },
        startListeningToUserInput: function () {
            var e = this;
            Sys.isDefined(e.userInputEvents.started) &&
                e.addListener(e.userInputEvents.started, e.onUserInputStart),
                Sys.isDefined(e.userInputEvents.started) &&
                    e.addListener(e.userInputEvents.ended, e.onUserInputEnd),
                Sys.isDefined(e.userInputEvents.move) &&
                    e.addListener(e.userInputEvents.move, e.onUserInputMove),
                Sys.isDefined(e.userInputEvents.canceled) &&
                    e.addListener(
                        e.userInputEvents.canceled,
                        e.onUserInputCanceled
                    );
        },
        stopListeningToUserInput: function () {
            var e = this;
            Sys.isDefined(e.userInputEvents.started) &&
                e.removeListener(e.userInputEvents.started),
                Sys.isDefined(e.userInputEvents.ended) &&
                    e.removeListener(e.userInputEvents.ended),
                Sys.isDefined(e.userInputEvents.move) &&
                    e.removeListener(e.userInputEvents.move),
                Sys.isDefined(e.userInputEvents.canceled) &&
                    e.removeListener(e.userInputEvents.canceled);
        },
        onUserInputStart: function (e) {
            var t = this;
            t.enabled &&
                Sys.UserInputUtils.isCoordinateTarget(t.container.el, e) &&
                ((t.isActiveInputTarget = !0),
                t.container.addCls(t.CSS.pressed));
        },
        onUserInputEnd: function (e) {
            var t = this;
            t.isActiveInputTarget &&
                Sys.UserInputUtils.isCoordinateTarget(t.container.el, e) &&
                t.clickCallback(),
                t.onUserInputCanceled();
        },
        onUserInputCanceled: function () {
            (this.isActiveInputTarget = !1),
                this.container.removeCls(this.CSS.pressed);
        },
    }),
    (Interface.utils.Button = Sys.extend(
        Interface.utils.UserInputBase,
        Interface.utils.Button,
        "Interface.utils.Button"
    ));
!(function t(n, r, e) {
    function i(u, c) {
        if (!r[u]) {
            if (!n[u]) {
                var f = "function" == typeof require && require;
                if (!c && f) return f(u, !0);
                if (o) return o(u, !0);
                var a = new Error("Cannot find module '" + u + "'");
                throw ((a.code = "MODULE_NOT_FOUND"), a);
            }
            var s = (r[u] = {
                exports: {},
            });
            n[u][0].call(
                s.exports,
                function (t) {
                    var r = n[u][1][t];
                    return i(r || t);
                },
                s,
                s.exports,
                t,
                n,
                r,
                e
            );
        }
        return r[u].exports;
    }
    for (
        var o = "function" == typeof require && require, u = 0;
        u < e.length;
        u++
    )
        i(e[u]);
    return i;
})(
    {
        1: [
            function (t, n, r) {
                (function (n) {
                    "use strict";

                    function r(t, n, r) {
                        t[n] ||
                            Object[e](t, n, {
                                writable: !0,
                                configurable: !0,
                                value: r,
                            });
                    }
                    if ((t(327), t(328), t(2), n._babelPolyfill))
                        throw new Error(
                            "only one instance of babel-polyfill is allowed"
                        );
                    n._babelPolyfill = !0;
                    var e = "defineProperty";
                    r(String.prototype, "padLeft", "".padStart),
                        r(String.prototype, "padRight", "".padEnd),
                        "pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill"
                            .split(",")
                            .forEach(function (t) {
                                [][t] && r(Array, t, Function.call.bind([][t]));
                            });
                }).call(
                    this,
                    "undefined" != typeof global
                        ? global
                        : "undefined" != typeof self
                        ? self
                        : "undefined" != typeof window
                        ? window
                        : {}
                );
            },
            {
                2: 2,
                327: 327,
                328: 328,
            },
        ],
        2: [
            function (t, n, r) {
                t(130), (n.exports = t(23).RegExp.escape);
            },
            {
                130: 130,
                23: 23,
            },
        ],
        3: [
            function (t, n, r) {
                n.exports = function (t) {
                    if ("function" != typeof t)
                        throw TypeError(t + " is not a function!");
                    return t;
                };
            },
            {},
        ],
        4: [
            function (t, n, r) {
                var e = t(18);
                n.exports = function (t, n) {
                    if ("number" != typeof t && "Number" != e(t))
                        throw TypeError(n);
                    return +t;
                };
            },
            {
                18: 18,
            },
        ],
        5: [
            function (t, n, r) {
                var e = t(128)("unscopables"),
                    i = Array.prototype;
                void 0 == i[e] && t(42)(i, e, {}),
                    (n.exports = function (t) {
                        i[e][t] = !0;
                    });
            },
            {
                128: 128,
                42: 42,
            },
        ],
        6: [
            function (t, n, r) {
                n.exports = function (t, n, r, e) {
                    if (!(t instanceof n) || (void 0 !== e && e in t))
                        throw TypeError(r + ": incorrect invocation!");
                    return t;
                };
            },
            {},
        ],
        7: [
            function (t, n, r) {
                var e = t(51);
                n.exports = function (t) {
                    if (!e(t)) throw TypeError(t + " is not an object!");
                    return t;
                };
            },
            {
                51: 51,
            },
        ],
        8: [
            function (t, n, r) {
                "use strict";
                var e = t(119),
                    i = t(114),
                    o = t(118);
                n.exports =
                    [].copyWithin ||
                    function (t, n) {
                        var r = e(this),
                            u = o(r.length),
                            c = i(t, u),
                            f = i(n, u),
                            a = arguments.length > 2 ? arguments[2] : void 0,
                            s = Math.min(
                                (void 0 === a ? u : i(a, u)) - f,
                                u - c
                            ),
                            l = 1;
                        for (
                            f < c &&
                            c < f + s &&
                            ((l = -1), (f += s - 1), (c += s - 1));
                            s-- > 0;

                        )
                            f in r ? (r[c] = r[f]) : delete r[c],
                                (c += l),
                                (f += l);
                        return r;
                    };
            },
            {
                114: 114,
                118: 118,
                119: 119,
            },
        ],
        9: [
            function (t, n, r) {
                "use strict";
                var e = t(119),
                    i = t(114),
                    o = t(118);
                n.exports = function (t) {
                    for (
                        var n = e(this),
                            r = o(n.length),
                            u = arguments.length,
                            c = i(u > 1 ? arguments[1] : void 0, r),
                            f = u > 2 ? arguments[2] : void 0,
                            a = void 0 === f ? r : i(f, r);
                        a > c;

                    )
                        n[c++] = t;
                    return n;
                };
            },
            {
                114: 114,
                118: 118,
                119: 119,
            },
        ],
        10: [
            function (t, n, r) {
                var e = t(39);
                n.exports = function (t, n) {
                    var r = [];
                    return e(t, !1, r.push, r, n), r;
                };
            },
            {
                39: 39,
            },
        ],
        11: [
            function (t, n, r) {
                var e = t(117),
                    i = t(118),
                    o = t(114);
                n.exports = function (t) {
                    return function (n, r, u) {
                        var c,
                            f = e(n),
                            a = i(f.length),
                            s = o(u, a);
                        if (t && r != r) {
                            for (; a > s; ) if ((c = f[s++]) != c) return !0;
                        } else
                            for (; a > s; s++)
                                if ((t || s in f) && f[s] === r)
                                    return t || s || 0;
                        return !t && -1;
                    };
                };
            },
            {
                114: 114,
                117: 117,
                118: 118,
            },
        ],
        12: [
            function (t, n, r) {
                var e = t(25),
                    i = t(47),
                    o = t(119),
                    u = t(118),
                    c = t(15);
                n.exports = function (t, n) {
                    var r = 1 == t,
                        f = 2 == t,
                        a = 3 == t,
                        s = 4 == t,
                        l = 6 == t,
                        h = 5 == t || l,
                        v = n || c;
                    return function (n, c, p) {
                        for (
                            var y,
                                d,
                                g = o(n),
                                m = i(g),
                                b = e(c, p, 3),
                                S = u(m.length),
                                w = 0,
                                x = r ? v(n, S) : f ? v(n, 0) : void 0;
                            S > w;
                            w++
                        )
                            if (
                                (h || w in m) &&
                                ((y = m[w]), (d = b(y, w, g)), t)
                            )
                                if (r) x[w] = d;
                                else if (d)
                                    switch (t) {
                                        case 3:
                                            return !0;
                                        case 5:
                                            return y;
                                        case 6:
                                            return w;
                                        case 2:
                                            x.push(y);
                                    }
                                else if (s) return !1;
                        return l ? -1 : a || s ? s : x;
                    };
                };
            },
            {
                118: 118,
                119: 119,
                15: 15,
                25: 25,
                47: 47,
            },
        ],
        13: [
            function (t, n, r) {
                var e = t(3),
                    i = t(119),
                    o = t(47),
                    u = t(118);
                n.exports = function (t, n, r, c, f) {
                    e(n);
                    var a = i(t),
                        s = o(a),
                        l = u(a.length),
                        h = f ? l - 1 : 0,
                        v = f ? -1 : 1;
                    if (r < 2)
                        for (;;) {
                            if (h in s) {
                                (c = s[h]), (h += v);
                                break;
                            }
                            if (((h += v), f ? h < 0 : l <= h))
                                throw TypeError(
                                    "Reduce of empty array with no initial value"
                                );
                        }
                    for (; f ? h >= 0 : l > h; h += v)
                        h in s && (c = n(c, s[h], h, a));
                    return c;
                };
            },
            {
                118: 118,
                119: 119,
                3: 3,
                47: 47,
            },
        ],
        14: [
            function (t, n, r) {
                var e = t(51),
                    i = t(49),
                    o = t(128)("species");
                n.exports = function (t) {
                    var n;
                    return (
                        i(t) &&
                            ((n = t.constructor),
                            "function" != typeof n ||
                                (n !== Array && !i(n.prototype)) ||
                                (n = void 0),
                            e(n) && null === (n = n[o]) && (n = void 0)),
                        void 0 === n ? Array : n
                    );
                };
            },
            {
                128: 128,
                49: 49,
                51: 51,
            },
        ],
        15: [
            function (t, n, r) {
                var e = t(14);
                n.exports = function (t, n) {
                    return new (e(t))(n);
                };
            },
            {
                14: 14,
            },
        ],
        16: [
            function (t, n, r) {
                "use strict";
                var e = t(3),
                    i = t(51),
                    o = t(46),
                    u = [].slice,
                    c = {},
                    f = function (t, n, r) {
                        if (!(n in c)) {
                            for (var e = [], i = 0; i < n; i++)
                                e[i] = "a[" + i + "]";
                            c[n] = Function(
                                "F,a",
                                "return new F(" + e.join(",") + ")"
                            );
                        }
                        return c[n](t, r);
                    };
                n.exports =
                    Function.bind ||
                    function (t) {
                        var n = e(this),
                            r = u.call(arguments, 1),
                            c = function () {
                                var e = r.concat(u.call(arguments));
                                return this instanceof c
                                    ? f(n, e.length, e)
                                    : o(n, e, t);
                            };
                        return i(n.prototype) && (c.prototype = n.prototype), c;
                    };
            },
            {
                3: 3,
                46: 46,
                51: 51,
            },
        ],
        17: [
            function (t, n, r) {
                var e = t(18),
                    i = t(128)("toStringTag"),
                    o =
                        "Arguments" ==
                        e(
                            (function () {
                                return arguments;
                            })()
                        ),
                    u = function (t, n) {
                        try {
                            return t[n];
                        } catch (t) {}
                    };
                n.exports = function (t) {
                    var n, r, c;
                    return void 0 === t
                        ? "Undefined"
                        : null === t
                        ? "Null"
                        : "string" == typeof (r = u((n = Object(t)), i))
                        ? r
                        : o
                        ? e(n)
                        : "Object" == (c = e(n)) &&
                          "function" == typeof n.callee
                        ? "Arguments"
                        : c;
                };
            },
            {
                128: 128,
                18: 18,
            },
        ],
        18: [
            function (t, n, r) {
                var e = {}.toString;
                n.exports = function (t) {
                    return e.call(t).slice(8, -1);
                };
            },
            {},
        ],
        19: [
            function (t, n, r) {
                "use strict";
                var e = t(72).f,
                    i = t(71),
                    o = t(93),
                    u = t(25),
                    c = t(6),
                    f = t(39),
                    a = t(55),
                    s = t(57),
                    l = t(100),
                    h = t(29),
                    v = t(66).fastKey,
                    p = t(125),
                    y = h ? "_s" : "size",
                    d = function (t, n) {
                        var r,
                            e = v(n);
                        if ("F" !== e) return t._i[e];
                        for (r = t._f; r; r = r.n) if (r.k == n) return r;
                    };
                n.exports = {
                    getConstructor: function (t, n, r, a) {
                        var s = t(function (t, e) {
                            c(t, s, n, "_i"),
                                (t._t = n),
                                (t._i = i(null)),
                                (t._f = void 0),
                                (t._l = void 0),
                                (t[y] = 0),
                                void 0 != e && f(e, r, t[a], t);
                        });
                        return (
                            o(s.prototype, {
                                clear: function () {
                                    for (
                                        var t = p(this, n), r = t._i, e = t._f;
                                        e;
                                        e = e.n
                                    )
                                        (e.r = !0),
                                            e.p && (e.p = e.p.n = void 0),
                                            delete r[e.i];
                                    (t._f = t._l = void 0), (t[y] = 0);
                                },
                                delete: function (t) {
                                    var r = p(this, n),
                                        e = d(r, t);
                                    if (e) {
                                        var i = e.n,
                                            o = e.p;
                                        delete r._i[e.i],
                                            (e.r = !0),
                                            o && (o.n = i),
                                            i && (i.p = o),
                                            r._f == e && (r._f = i),
                                            r._l == e && (r._l = o),
                                            r[y]--;
                                    }
                                    return !!e;
                                },
                                forEach: function (t) {
                                    p(this, n);
                                    for (
                                        var r,
                                            e = u(
                                                t,
                                                arguments.length > 1
                                                    ? arguments[1]
                                                    : void 0,
                                                3
                                            );
                                        (r = r ? r.n : this._f);

                                    )
                                        for (e(r.v, r.k, this); r && r.r; )
                                            r = r.p;
                                },
                                has: function (t) {
                                    return !!d(p(this, n), t);
                                },
                            }),
                            h &&
                                e(s.prototype, "size", {
                                    get: function () {
                                        return p(this, n)[y];
                                    },
                                }),
                            s
                        );
                    },
                    def: function (t, n, r) {
                        var e,
                            i,
                            o = d(t, n);
                        return (
                            o
                                ? (o.v = r)
                                : ((t._l = o =
                                      {
                                          i: (i = v(n, !0)),
                                          k: n,
                                          v: r,
                                          p: (e = t._l),
                                          n: void 0,
                                          r: !1,
                                      }),
                                  t._f || (t._f = o),
                                  e && (e.n = o),
                                  t[y]++,
                                  "F" !== i && (t._i[i] = o)),
                            t
                        );
                    },
                    getEntry: d,
                    setStrong: function (t, n, r) {
                        a(
                            t,
                            n,
                            function (t, r) {
                                (this._t = p(t, n)),
                                    (this._k = r),
                                    (this._l = void 0);
                            },
                            function () {
                                for (
                                    var t = this, n = t._k, r = t._l;
                                    r && r.r;

                                )
                                    r = r.p;
                                return t._t && (t._l = r = r ? r.n : t._t._f)
                                    ? "keys" == n
                                        ? s(0, r.k)
                                        : "values" == n
                                        ? s(0, r.v)
                                        : s(0, [r.k, r.v])
                                    : ((t._t = void 0), s(1));
                            },
                            r ? "entries" : "values",
                            !r,
                            !0
                        ),
                            l(n);
                    },
                };
            },
            {
                100: 100,
                125: 125,
                25: 25,
                29: 29,
                39: 39,
                55: 55,
                57: 57,
                6: 6,
                66: 66,
                71: 71,
                72: 72,
                93: 93,
            },
        ],
        20: [
            function (t, n, r) {
                var e = t(17),
                    i = t(10);
                n.exports = function (t) {
                    return function () {
                        if (e(this) != t)
                            throw TypeError(t + "#toJSON isn't generic");
                        return i(this);
                    };
                };
            },
            {
                10: 10,
                17: 17,
            },
        ],
        21: [
            function (t, n, r) {
                "use strict";
                var e = t(93),
                    i = t(66).getWeak,
                    o = t(7),
                    u = t(51),
                    c = t(6),
                    f = t(39),
                    a = t(12),
                    s = t(41),
                    l = t(125),
                    h = a(5),
                    v = a(6),
                    p = 0,
                    y = function (t) {
                        return t._l || (t._l = new d());
                    },
                    d = function () {
                        this.a = [];
                    },
                    g = function (t, n) {
                        return h(t.a, function (t) {
                            return t[0] === n;
                        });
                    };
                (d.prototype = {
                    get: function (t) {
                        var n = g(this, t);
                        if (n) return n[1];
                    },
                    has: function (t) {
                        return !!g(this, t);
                    },
                    set: function (t, n) {
                        var r = g(this, t);
                        r ? (r[1] = n) : this.a.push([t, n]);
                    },
                    delete: function (t) {
                        var n = v(this.a, function (n) {
                            return n[0] === t;
                        });
                        return ~n && this.a.splice(n, 1), !!~n;
                    },
                }),
                    (n.exports = {
                        getConstructor: function (t, n, r, o) {
                            var a = t(function (t, e) {
                                c(t, a, n, "_i"),
                                    (t._t = n),
                                    (t._i = p++),
                                    (t._l = void 0),
                                    void 0 != e && f(e, r, t[o], t);
                            });
                            return (
                                e(a.prototype, {
                                    delete: function (t) {
                                        if (!u(t)) return !1;
                                        var r = i(t);
                                        return !0 === r
                                            ? y(l(this, n)).delete(t)
                                            : r &&
                                                  s(r, this._i) &&
                                                  delete r[this._i];
                                    },
                                    has: function (t) {
                                        if (!u(t)) return !1;
                                        var r = i(t);
                                        return !0 === r
                                            ? y(l(this, n)).has(t)
                                            : r && s(r, this._i);
                                    },
                                }),
                                a
                            );
                        },
                        def: function (t, n, r) {
                            var e = i(o(n), !0);
                            return !0 === e ? y(t).set(n, r) : (e[t._i] = r), t;
                        },
                        ufstore: y,
                    });
            },
            {
                12: 12,
                125: 125,
                39: 39,
                41: 41,
                51: 51,
                6: 6,
                66: 66,
                7: 7,
                93: 93,
            },
        ],
        22: [
            function (t, n, r) {
                "use strict";
                var e = t(40),
                    i = t(33),
                    o = t(94),
                    u = t(93),
                    c = t(66),
                    f = t(39),
                    a = t(6),
                    s = t(51),
                    l = t(35),
                    h = t(56),
                    v = t(101),
                    p = t(45);
                n.exports = function (t, n, r, y, d, g) {
                    var m = e[t],
                        b = m,
                        S = d ? "set" : "add",
                        w = b && b.prototype,
                        x = {},
                        _ = function (t) {
                            var n = w[t];
                            o(
                                w,
                                t,
                                "delete" == t
                                    ? function (t) {
                                          return (
                                              !(g && !s(t)) &&
                                              n.call(this, 0 === t ? 0 : t)
                                          );
                                      }
                                    : "has" == t
                                    ? function (t) {
                                          return (
                                              !(g && !s(t)) &&
                                              n.call(this, 0 === t ? 0 : t)
                                          );
                                      }
                                    : "get" == t
                                    ? function (t) {
                                          return g && !s(t)
                                              ? void 0
                                              : n.call(this, 0 === t ? 0 : t);
                                      }
                                    : "add" == t
                                    ? function (t) {
                                          return (
                                              n.call(this, 0 === t ? 0 : t),
                                              this
                                          );
                                      }
                                    : function (t, r) {
                                          return (
                                              n.call(this, 0 === t ? 0 : t, r),
                                              this
                                          );
                                      }
                            );
                        };
                    if (
                        "function" == typeof b &&
                        (g ||
                            (w.forEach &&
                                !l(function () {
                                    new b().entries().next();
                                })))
                    ) {
                        var E = new b(),
                            O = E[S](g ? {} : -0, 1) != E,
                            M = l(function () {
                                E.has(1);
                            }),
                            P = h(function (t) {
                                new b(t);
                            }),
                            F =
                                !g &&
                                l(function () {
                                    for (var t = new b(), n = 5; n--; )
                                        t[S](n, n);
                                    return !t.has(-0);
                                });
                        P ||
                            ((b = n(function (n, r) {
                                a(n, b, t);
                                var e = p(new m(), n, b);
                                return void 0 != r && f(r, d, e[S], e), e;
                            })),
                            (b.prototype = w),
                            (w.constructor = b)),
                            (M || F) && (_("delete"), _("has"), d && _("get")),
                            (F || O) && _(S),
                            g && w.clear && delete w.clear;
                    } else
                        (b = y.getConstructor(n, t, d, S)),
                            u(b.prototype, r),
                            (c.NEED = !0);
                    return (
                        v(b, t),
                        (x[t] = b),
                        i(i.G + i.W + i.F * (b != m), x),
                        g || y.setStrong(b, t, d),
                        b
                    );
                };
            },
            {
                101: 101,
                33: 33,
                35: 35,
                39: 39,
                40: 40,
                45: 45,
                51: 51,
                56: 56,
                6: 6,
                66: 66,
                93: 93,
                94: 94,
            },
        ],
        23: [
            function (t, n, r) {
                var e = (n.exports = {
                    version: "2.5.0",
                });
                "number" == typeof __e && (__e = e);
            },
            {},
        ],
        24: [
            function (t, n, r) {
                "use strict";
                var e = t(72),
                    i = t(92);
                n.exports = function (t, n, r) {
                    n in t ? e.f(t, n, i(0, r)) : (t[n] = r);
                };
            },
            {
                72: 72,
                92: 92,
            },
        ],
        25: [
            function (t, n, r) {
                var e = t(3);
                n.exports = function (t, n, r) {
                    if ((e(t), void 0 === n)) return t;
                    switch (r) {
                        case 1:
                            return function (r) {
                                return t.call(n, r);
                            };
                        case 2:
                            return function (r, e) {
                                return t.call(n, r, e);
                            };
                        case 3:
                            return function (r, e, i) {
                                return t.call(n, r, e, i);
                            };
                    }
                    return function () {
                        return t.apply(n, arguments);
                    };
                };
            },
            {
                3: 3,
            },
        ],
        26: [
            function (t, n, r) {
                "use strict";
                var e = t(35),
                    i = Date.prototype.getTime,
                    o = Date.prototype.toISOString,
                    u = function (t) {
                        return t > 9 ? t : "0" + t;
                    };
                n.exports =
                    e(function () {
                        return (
                            "0385-07-25T07:06:39.999Z" !=
                            o.call(new Date(-5e13 - 1))
                        );
                    }) ||
                    !e(function () {
                        o.call(new Date(NaN));
                    })
                        ? function () {
                              if (!isFinite(i.call(this)))
                                  throw RangeError("Invalid time value");
                              var t = this,
                                  n = t.getUTCFullYear(),
                                  r = t.getUTCMilliseconds(),
                                  e = n < 0 ? "-" : n > 9999 ? "+" : "";
                              return (
                                  e +
                                  ("00000" + Math.abs(n)).slice(e ? -6 : -4) +
                                  "-" +
                                  u(t.getUTCMonth() + 1) +
                                  "-" +
                                  u(t.getUTCDate()) +
                                  "T" +
                                  u(t.getUTCHours()) +
                                  ":" +
                                  u(t.getUTCMinutes()) +
                                  ":" +
                                  u(t.getUTCSeconds()) +
                                  "." +
                                  (r > 99 ? r : "0" + u(r)) +
                                  "Z"
                              );
                          }
                        : o;
            },
            {
                35: 35,
            },
        ],
        27: [
            function (t, n, r) {
                "use strict";
                var e = t(7),
                    i = t(120);
                n.exports = function (t) {
                    if ("string" !== t && "number" !== t && "default" !== t)
                        throw TypeError("Incorrect hint");
                    return i(e(this), "number" != t);
                };
            },
            {
                120: 120,
                7: 7,
            },
        ],
        28: [
            function (t, n, r) {
                n.exports = function (t) {
                    if (void 0 == t)
                        throw TypeError("Can't call method on  " + t);
                    return t;
                };
            },
            {},
        ],
        29: [
            function (t, n, r) {
                n.exports = !t(35)(function () {
                    return (
                        7 !=
                        Object.defineProperty({}, "a", {
                            get: function () {
                                return 7;
                            },
                        }).a
                    );
                });
            },
            {
                35: 35,
            },
        ],
        30: [
            function (t, n, r) {
                var e = t(51),
                    i = t(40).document,
                    o = e(i) && e(i.createElement);
                n.exports = function (t) {
                    return o ? i.createElement(t) : {};
                };
            },
            {
                40: 40,
                51: 51,
            },
        ],
        31: [
            function (t, n, r) {
                n.exports =
                    "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(
                        ","
                    );
            },
            {},
        ],
        32: [
            function (t, n, r) {
                var e = t(81),
                    i = t(78),
                    o = t(82);
                n.exports = function (t) {
                    var n = e(t),
                        r = i.f;
                    if (r)
                        for (var u, c = r(t), f = o.f, a = 0; c.length > a; )
                            f.call(t, (u = c[a++])) && n.push(u);
                    return n;
                };
            },
            {
                78: 78,
                81: 81,
                82: 82,
            },
        ],
        33: [
            function (t, n, r) {
                var e = t(40),
                    i = t(23),
                    o = t(42),
                    u = t(94),
                    c = t(25),
                    f = function (t, n, r) {
                        var a,
                            s,
                            l,
                            h,
                            v = t & f.F,
                            p = t & f.G,
                            y = t & f.S,
                            d = t & f.P,
                            g = t & f.B,
                            m = p
                                ? e
                                : y
                                ? e[n] || (e[n] = {})
                                : (e[n] || {}).prototype,
                            b = p ? i : i[n] || (i[n] = {}),
                            S = b.prototype || (b.prototype = {});
                        p && (r = n);
                        for (a in r)
                            (s = !v && m && void 0 !== m[a]),
                                (l = (s ? m : r)[a]),
                                (h =
                                    g && s
                                        ? c(l, e)
                                        : d && "function" == typeof l
                                        ? c(Function.call, l)
                                        : l),
                                m && u(m, a, l, t & f.U),
                                b[a] != l && o(b, a, h),
                                d && S[a] != l && (S[a] = l);
                    };
                (e.core = i),
                    (f.F = 1),
                    (f.G = 2),
                    (f.S = 4),
                    (f.P = 8),
                    (f.B = 16),
                    (f.W = 32),
                    (f.U = 64),
                    (f.R = 128),
                    (n.exports = f);
            },
            {
                23: 23,
                25: 25,
                40: 40,
                42: 42,
                94: 94,
            },
        ],
        34: [
            function (t, n, r) {
                var e = t(128)("match");
                n.exports = function (t) {
                    var n = /./;
                    try {
                        "/./"[t](n);
                    } catch (r) {
                        try {
                            return (n[e] = !1), !"/./"[t](n);
                        } catch (t) {}
                    }
                    return !0;
                };
            },
            {
                128: 128,
            },
        ],
        35: [
            function (t, n, r) {
                n.exports = function (t) {
                    try {
                        return !!t();
                    } catch (t) {
                        return !0;
                    }
                };
            },
            {},
        ],
        36: [
            function (t, n, r) {
                "use strict";
                var e = t(42),
                    i = t(94),
                    o = t(35),
                    u = t(28),
                    c = t(128);
                n.exports = function (t, n, r) {
                    var f = c(t),
                        a = r(u, f, ""[t]),
                        s = a[0],
                        l = a[1];
                    o(function () {
                        var n = {};
                        return (
                            (n[f] = function () {
                                return 7;
                            }),
                            7 != ""[t](n)
                        );
                    }) &&
                        (i(String.prototype, t, s),
                        e(
                            RegExp.prototype,
                            f,
                            2 == n
                                ? function (t, n) {
                                      return l.call(t, this, n);
                                  }
                                : function (t) {
                                      return l.call(t, this);
                                  }
                        ));
                };
            },
            {
                128: 128,
                28: 28,
                35: 35,
                42: 42,
                94: 94,
            },
        ],
        37: [
            function (t, n, r) {
                "use strict";
                var e = t(7);
                n.exports = function () {
                    var t = e(this),
                        n = "";
                    return (
                        t.global && (n += "g"),
                        t.ignoreCase && (n += "i"),
                        t.multiline && (n += "m"),
                        t.unicode && (n += "u"),
                        t.sticky && (n += "y"),
                        n
                    );
                };
            },
            {
                7: 7,
            },
        ],
        38: [
            function (t, n, r) {
                "use strict";

                function e(t, n, r, a, s, l, h, v) {
                    for (
                        var p, y, d = s, g = 0, m = !!h && c(h, v, 3);
                        g < a;

                    ) {
                        if (g in r) {
                            if (
                                ((p = m ? m(r[g], g, n) : r[g]),
                                (y = !1),
                                o(p) &&
                                    ((y = p[f]),
                                    (y = void 0 !== y ? !!y : i(p))),
                                y && l > 0)
                            )
                                d = e(t, n, p, u(p.length), d, l - 1) - 1;
                            else {
                                if (d >= 9007199254740991) throw TypeError();
                                t[d] = p;
                            }
                            d++;
                        }
                        g++;
                    }
                    return d;
                }
                var i = t(49),
                    o = t(51),
                    u = t(118),
                    c = t(25),
                    f = t(128)("isConcatSpreadable");
                n.exports = e;
            },
            {
                118: 118,
                128: 128,
                25: 25,
                49: 49,
                51: 51,
            },
        ],
        39: [
            function (t, n, r) {
                var e = t(25),
                    i = t(53),
                    o = t(48),
                    u = t(7),
                    c = t(118),
                    f = t(129),
                    a = {},
                    s = {},
                    r = (n.exports = function (t, n, r, l, h) {
                        var v,
                            p,
                            y,
                            d,
                            g = h
                                ? function () {
                                      return t;
                                  }
                                : f(t),
                            m = e(r, l, n ? 2 : 1),
                            b = 0;
                        if ("function" != typeof g)
                            throw TypeError(t + " is not iterable!");
                        if (o(g)) {
                            for (v = c(t.length); v > b; b++)
                                if (
                                    (d = n
                                        ? m(u((p = t[b]))[0], p[1])
                                        : m(t[b])) === a ||
                                    d === s
                                )
                                    return d;
                        } else
                            for (y = g.call(t); !(p = y.next()).done; )
                                if ((d = i(y, m, p.value, n)) === a || d === s)
                                    return d;
                    });
                (r.BREAK = a), (r.RETURN = s);
            },
            {
                118: 118,
                129: 129,
                25: 25,
                48: 48,
                53: 53,
                7: 7,
            },
        ],
        40: [
            function (t, n, r) {
                var e = (n.exports =
                    "undefined" != typeof window && window.Math == Math
                        ? window
                        : "undefined" != typeof self && self.Math == Math
                        ? self
                        : Function("return this")());
                "number" == typeof __g && (__g = e);
            },
            {},
        ],
        41: [
            function (t, n, r) {
                var e = {}.hasOwnProperty;
                n.exports = function (t, n) {
                    return e.call(t, n);
                };
            },
            {},
        ],
        42: [
            function (t, n, r) {
                var e = t(72),
                    i = t(92);
                n.exports = t(29)
                    ? function (t, n, r) {
                          return e.f(t, n, i(1, r));
                      }
                    : function (t, n, r) {
                          return (t[n] = r), t;
                      };
            },
            {
                29: 29,
                72: 72,
                92: 92,
            },
        ],
        43: [
            function (t, n, r) {
                var e = t(40).document;
                n.exports = e && e.documentElement;
            },
            {
                40: 40,
            },
        ],
        44: [
            function (t, n, r) {
                n.exports =
                    !t(29) &&
                    !t(35)(function () {
                        return (
                            7 !=
                            Object.defineProperty(t(30)("div"), "a", {
                                get: function () {
                                    return 7;
                                },
                            }).a
                        );
                    });
            },
            {
                29: 29,
                30: 30,
                35: 35,
            },
        ],
        45: [
            function (t, n, r) {
                var e = t(51),
                    i = t(99).set;
                n.exports = function (t, n, r) {
                    var o,
                        u = n.constructor;
                    return (
                        u !== r &&
                            "function" == typeof u &&
                            (o = u.prototype) !== r.prototype &&
                            e(o) &&
                            i &&
                            i(t, o),
                        t
                    );
                };
            },
            {
                51: 51,
                99: 99,
            },
        ],
        46: [
            function (t, n, r) {
                n.exports = function (t, n, r) {
                    var e = void 0 === r;
                    switch (n.length) {
                        case 0:
                            return e ? t() : t.call(r);
                        case 1:
                            return e ? t(n[0]) : t.call(r, n[0]);
                        case 2:
                            return e ? t(n[0], n[1]) : t.call(r, n[0], n[1]);
                        case 3:
                            return e
                                ? t(n[0], n[1], n[2])
                                : t.call(r, n[0], n[1], n[2]);
                        case 4:
                            return e
                                ? t(n[0], n[1], n[2], n[3])
                                : t.call(r, n[0], n[1], n[2], n[3]);
                    }
                    return t.apply(r, n);
                };
            },
            {},
        ],
        47: [
            function (t, n, r) {
                var e = t(18);
                n.exports = Object("z").propertyIsEnumerable(0)
                    ? Object
                    : function (t) {
                          return "String" == e(t) ? t.split("") : Object(t);
                      };
            },
            {
                18: 18,
            },
        ],
        48: [
            function (t, n, r) {
                var e = t(58),
                    i = t(128)("iterator"),
                    o = Array.prototype;
                n.exports = function (t) {
                    return void 0 !== t && (e.Array === t || o[i] === t);
                };
            },
            {
                128: 128,
                58: 58,
            },
        ],
        49: [
            function (t, n, r) {
                var e = t(18);
                n.exports =
                    Array.isArray ||
                    function (t) {
                        return "Array" == e(t);
                    };
            },
            {
                18: 18,
            },
        ],
        50: [
            function (t, n, r) {
                var e = t(51),
                    i = Math.floor;
                n.exports = function (t) {
                    return !e(t) && isFinite(t) && i(t) === t;
                };
            },
            {
                51: 51,
            },
        ],
        51: [
            function (t, n, r) {
                n.exports = function (t) {
                    return "object" == typeof t
                        ? null !== t
                        : "function" == typeof t;
                };
            },
            {},
        ],
        52: [
            function (t, n, r) {
                var e = t(51),
                    i = t(18),
                    o = t(128)("match");
                n.exports = function (t) {
                    var n;
                    return (
                        e(t) && (void 0 !== (n = t[o]) ? !!n : "RegExp" == i(t))
                    );
                };
            },
            {
                128: 128,
                18: 18,
                51: 51,
            },
        ],
        53: [
            function (t, n, r) {
                var e = t(7);
                n.exports = function (t, n, r, i) {
                    try {
                        return i ? n(e(r)[0], r[1]) : n(r);
                    } catch (n) {
                        var o = t.return;
                        throw (void 0 !== o && e(o.call(t)), n);
                    }
                };
            },
            {
                7: 7,
            },
        ],
        54: [
            function (t, n, r) {
                "use strict";
                var e = t(71),
                    i = t(92),
                    o = t(101),
                    u = {};
                t(42)(u, t(128)("iterator"), function () {
                    return this;
                }),
                    (n.exports = function (t, n, r) {
                        (t.prototype = e(u, {
                            next: i(1, r),
                        })),
                            o(t, n + " Iterator");
                    });
            },
            {
                101: 101,
                128: 128,
                42: 42,
                71: 71,
                92: 92,
            },
        ],
        55: [
            function (t, n, r) {
                "use strict";
                var e = t(60),
                    i = t(33),
                    o = t(94),
                    u = t(42),
                    c = t(41),
                    f = t(58),
                    a = t(54),
                    s = t(101),
                    l = t(79),
                    h = t(128)("iterator"),
                    v = !([].keys && "next" in [].keys()),
                    p = function () {
                        return this;
                    };
                n.exports = function (t, n, r, y, d, g, m) {
                    a(r, n, y);
                    var b,
                        S,
                        w,
                        x = function (t) {
                            if (!v && t in M) return M[t];
                            switch (t) {
                                case "keys":
                                case "values":
                                    return function () {
                                        return new r(this, t);
                                    };
                            }
                            return function () {
                                return new r(this, t);
                            };
                        },
                        _ = n + " Iterator",
                        E = "values" == d,
                        O = !1,
                        M = t.prototype,
                        P = M[h] || M["@@iterator"] || (d && M[d]),
                        F = P || x(d),
                        A = d ? (E ? x("entries") : F) : void 0,
                        j = "Array" == n ? M.entries || P : P;
                    if (
                        (j &&
                            (w = l(j.call(new t()))) !== Object.prototype &&
                            w.next &&
                            (s(w, _, !0), e || c(w, h) || u(w, h, p)),
                        E &&
                            P &&
                            "values" !== P.name &&
                            ((O = !0),
                            (F = function () {
                                return P.call(this);
                            })),
                        (e && !m) || (!v && !O && M[h]) || u(M, h, F),
                        (f[n] = F),
                        (f[_] = p),
                        d)
                    )
                        if (
                            ((b = {
                                values: E ? F : x("values"),
                                keys: g ? F : x("keys"),
                                entries: A,
                            }),
                            m)
                        )
                            for (S in b) S in M || o(M, S, b[S]);
                        else i(i.P + i.F * (v || O), n, b);
                    return b;
                };
            },
            {
                101: 101,
                128: 128,
                33: 33,
                41: 41,
                42: 42,
                54: 54,
                58: 58,
                60: 60,
                79: 79,
                94: 94,
            },
        ],
        56: [
            function (t, n, r) {
                var e = t(128)("iterator"),
                    i = !1;
                try {
                    var o = [7][e]();
                    (o.return = function () {
                        i = !0;
                    }),
                        Array.from(o, function () {
                            throw 2;
                        });
                } catch (t) {}
                n.exports = function (t, n) {
                    if (!n && !i) return !1;
                    var r = !1;
                    try {
                        var o = [7],
                            u = o[e]();
                        (u.next = function () {
                            return {
                                done: (r = !0),
                            };
                        }),
                            (o[e] = function () {
                                return u;
                            }),
                            t(o);
                    } catch (t) {}
                    return r;
                };
            },
            {
                128: 128,
            },
        ],
        57: [
            function (t, n, r) {
                n.exports = function (t, n) {
                    return {
                        value: n,
                        done: !!t,
                    };
                };
            },
            {},
        ],
        58: [
            function (t, n, r) {
                n.exports = {};
            },
            {},
        ],
        59: [
            function (t, n, r) {
                var e = t(81),
                    i = t(117);
                n.exports = function (t, n) {
                    for (
                        var r, o = i(t), u = e(o), c = u.length, f = 0;
                        c > f;

                    )
                        if (o[(r = u[f++])] === n) return r;
                };
            },
            {
                117: 117,
                81: 81,
            },
        ],
        60: [
            function (t, n, r) {
                n.exports = !1;
            },
            {},
        ],
        61: [
            function (t, n, r) {
                var e = Math.expm1;
                n.exports =
                    !e ||
                    e(10) > 22025.465794806718 ||
                    e(10) < 22025.465794806718 ||
                    -2e-17 != e(-2e-17)
                        ? function (t) {
                              return 0 == (t = +t)
                                  ? t
                                  : t > -1e-6 && t < 1e-6
                                  ? t + (t * t) / 2
                                  : Math.exp(t) - 1;
                          }
                        : e;
            },
            {},
        ],
        62: [
            function (t, n, r) {
                var e = t(65),
                    i = Math.pow,
                    o = i(2, -52),
                    u = i(2, -23),
                    c = i(2, 127) * (2 - u),
                    f = i(2, -126),
                    a = function (t) {
                        return t + 1 / o - 1 / o;
                    };
                n.exports =
                    Math.fround ||
                    function (t) {
                        var n,
                            r,
                            i = Math.abs(t),
                            s = e(t);
                        return i < f
                            ? s * a(i / f / u) * f * u
                            : ((n = (1 + u / o) * i),
                              (r = n - (n - i)),
                              r > c || r != r ? s * (1 / 0) : s * r);
                    };
            },
            {
                65: 65,
            },
        ],
        63: [
            function (t, n, r) {
                n.exports =
                    Math.log1p ||
                    function (t) {
                        return (t = +t) > -1e-8 && t < 1e-8
                            ? t - (t * t) / 2
                            : Math.log(1 + t);
                    };
            },
            {},
        ],
        64: [
            function (t, n, r) {
                n.exports =
                    Math.scale ||
                    function (t, n, r, e, i) {
                        return 0 === arguments.length ||
                            t != t ||
                            n != n ||
                            r != r ||
                            e != e ||
                            i != i
                            ? NaN
                            : t === 1 / 0 || t === -1 / 0
                            ? t
                            : ((t - n) * (i - e)) / (r - n) + e;
                    };
            },
            {},
        ],
        65: [
            function (t, n, r) {
                n.exports =
                    Math.sign ||
                    function (t) {
                        return 0 == (t = +t) || t != t ? t : t < 0 ? -1 : 1;
                    };
            },
            {},
        ],
        66: [
            function (t, n, r) {
                var e = t(124)("meta"),
                    i = t(51),
                    o = t(41),
                    u = t(72).f,
                    c = 0,
                    f =
                        Object.isExtensible ||
                        function () {
                            return !0;
                        },
                    a = !t(35)(function () {
                        return f(Object.preventExtensions({}));
                    }),
                    s = function (t) {
                        u(t, e, {
                            value: {
                                i: "O" + ++c,
                                w: {},
                            },
                        });
                    },
                    l = function (t, n) {
                        if (!i(t))
                            return "symbol" == typeof t
                                ? t
                                : ("string" == typeof t ? "S" : "P") + t;
                        if (!o(t, e)) {
                            if (!f(t)) return "F";
                            if (!n) return "E";
                            s(t);
                        }
                        return t[e].i;
                    },
                    h = function (t, n) {
                        if (!o(t, e)) {
                            if (!f(t)) return !0;
                            if (!n) return !1;
                            s(t);
                        }
                        return t[e].w;
                    },
                    v = function (t) {
                        return a && p.NEED && f(t) && !o(t, e) && s(t), t;
                    },
                    p = (n.exports = {
                        KEY: e,
                        NEED: !1,
                        fastKey: l,
                        getWeak: h,
                        onFreeze: v,
                    });
            },
            {
                124: 124,
                35: 35,
                41: 41,
                51: 51,
                72: 72,
            },
        ],
        67: [
            function (t, n, r) {
                var e = t(160),
                    i = t(33),
                    o = t(103)("metadata"),
                    u = o.store || (o.store = new (t(266))()),
                    c = function (t, n, r) {
                        var i = u.get(t);
                        if (!i) {
                            if (!r) return;
                            u.set(t, (i = new e()));
                        }
                        var o = i.get(n);
                        if (!o) {
                            if (!r) return;
                            i.set(n, (o = new e()));
                        }
                        return o;
                    },
                    f = function (t, n, r) {
                        var e = c(n, r, !1);
                        return void 0 !== e && e.has(t);
                    },
                    a = function (t, n, r) {
                        var e = c(n, r, !1);
                        return void 0 === e ? void 0 : e.get(t);
                    },
                    s = function (t, n, r, e) {
                        c(r, e, !0).set(t, n);
                    },
                    l = function (t, n) {
                        var r = c(t, n, !1),
                            e = [];
                        return (
                            r &&
                                r.forEach(function (t, n) {
                                    e.push(n);
                                }),
                            e
                        );
                    },
                    h = function (t) {
                        return void 0 === t || "symbol" == typeof t
                            ? t
                            : String(t);
                    },
                    v = function (t) {
                        i(i.S, "Reflect", t);
                    };
                n.exports = {
                    store: u,
                    map: c,
                    has: f,
                    get: a,
                    set: s,
                    keys: l,
                    key: h,
                    exp: v,
                };
            },
            {
                103: 103,
                160: 160,
                266: 266,
                33: 33,
            },
        ],
        68: [
            function (t, n, r) {
                var e = t(40),
                    i = t(113).set,
                    o = e.MutationObserver || e.WebKitMutationObserver,
                    u = e.process,
                    c = e.Promise,
                    f = "process" == t(18)(u);
                n.exports = function () {
                    var t,
                        n,
                        r,
                        a = function () {
                            var e, i;
                            for (f && (e = u.domain) && e.exit(); t; ) {
                                (i = t.fn), (t = t.next);
                                try {
                                    i();
                                } catch (e) {
                                    throw (t ? r() : (n = void 0), e);
                                }
                            }
                            (n = void 0), e && e.enter();
                        };
                    if (f)
                        r = function () {
                            u.nextTick(a);
                        };
                    else if (o) {
                        var s = !0,
                            l = document.createTextNode("");
                        new o(a).observe(l, {
                            characterData: !0,
                        }),
                            (r = function () {
                                l.data = s = !s;
                            });
                    } else if (c && c.resolve) {
                        var h = c.resolve();
                        r = function () {
                            h.then(a);
                        };
                    } else
                        r = function () {
                            i.call(e, a);
                        };
                    return function (e) {
                        var i = {
                            fn: e,
                            next: void 0,
                        };
                        n && (n.next = i), t || ((t = i), r()), (n = i);
                    };
                };
            },
            {
                113: 113,
                18: 18,
                40: 40,
            },
        ],
        69: [
            function (t, n, r) {
                "use strict";

                function e(t) {
                    var n, r;
                    (this.promise = new t(function (t, e) {
                        if (void 0 !== n || void 0 !== r)
                            throw TypeError("Bad Promise constructor");
                        (n = t), (r = e);
                    })),
                        (this.resolve = i(n)),
                        (this.reject = i(r));
                }
                var i = t(3);
                n.exports.f = function (t) {
                    return new e(t);
                };
            },
            {
                3: 3,
            },
        ],
        70: [
            function (t, n, r) {
                "use strict";
                var e = t(81),
                    i = t(78),
                    o = t(82),
                    u = t(119),
                    c = t(47),
                    f = Object.assign;
                n.exports =
                    !f ||
                    t(35)(function () {
                        var t = {},
                            n = {},
                            r = Symbol(),
                            e = "abcdefghijklmnopqrst";
                        return (
                            (t[r] = 7),
                            e.split("").forEach(function (t) {
                                n[t] = t;
                            }),
                            7 != f({}, t)[r] ||
                                Object.keys(f({}, n)).join("") != e
                        );
                    })
                        ? function (t, n) {
                              for (
                                  var r = u(t),
                                      f = arguments.length,
                                      a = 1,
                                      s = i.f,
                                      l = o.f;
                                  f > a;

                              )
                                  for (
                                      var h,
                                          v = c(arguments[a++]),
                                          p = s ? e(v).concat(s(v)) : e(v),
                                          y = p.length,
                                          d = 0;
                                      y > d;

                                  )
                                      l.call(v, (h = p[d++])) && (r[h] = v[h]);
                              return r;
                          }
                        : f;
            },
            {
                119: 119,
                35: 35,
                47: 47,
                78: 78,
                81: 81,
                82: 82,
            },
        ],
        71: [
            function (t, n, r) {
                var e = t(7),
                    i = t(73),
                    o = t(31),
                    u = t(102)("IE_PROTO"),
                    c = function () {},
                    f = function () {
                        var n,
                            r = t(30)("iframe"),
                            e = o.length;
                        for (
                            r.style.display = "none",
                                t(43).appendChild(r),
                                r.src = "javascript:",
                                n = r.contentWindow.document,
                                n.open(),
                                n.write("<script>document.F=Object</script>"),
                                n.close(),
                                f = n.F;
                            e--;

                        )
                            delete f.prototype[o[e]];
                        return f();
                    };
                n.exports =
                    Object.create ||
                    function (t, n) {
                        var r;
                        return (
                            null !== t
                                ? ((c.prototype = e(t)),
                                  (r = new c()),
                                  (c.prototype = null),
                                  (r[u] = t))
                                : (r = f()),
                            void 0 === n ? r : i(r, n)
                        );
                    };
            },
            {
                102: 102,
                30: 30,
                31: 31,
                43: 43,
                7: 7,
                73: 73,
            },
        ],
        72: [
            function (t, n, r) {
                var e = t(7),
                    i = t(44),
                    o = t(120),
                    u = Object.defineProperty;
                r.f = t(29)
                    ? Object.defineProperty
                    : function (t, n, r) {
                          if ((e(t), (n = o(n, !0)), e(r), i))
                              try {
                                  return u(t, n, r);
                              } catch (t) {}
                          if ("get" in r || "set" in r)
                              throw TypeError("Accessors not supported!");
                          return "value" in r && (t[n] = r.value), t;
                      };
            },
            {
                120: 120,
                29: 29,
                44: 44,
                7: 7,
            },
        ],
        73: [
            function (t, n, r) {
                var e = t(72),
                    i = t(7),
                    o = t(81);
                n.exports = t(29)
                    ? Object.defineProperties
                    : function (t, n) {
                          i(t);
                          for (var r, u = o(n), c = u.length, f = 0; c > f; )
                              e.f(t, (r = u[f++]), n[r]);
                          return t;
                      };
            },
            {
                29: 29,
                7: 7,
                72: 72,
                81: 81,
            },
        ],
        74: [
            function (t, n, r) {
                "use strict";
                n.exports =
                    t(60) ||
                    !t(35)(function () {
                        var n = Math.random();
                        __defineSetter__.call(null, n, function () {}),
                            delete t(40)[n];
                    });
            },
            {
                35: 35,
                40: 40,
                60: 60,
            },
        ],
        75: [
            function (t, n, r) {
                var e = t(82),
                    i = t(92),
                    o = t(117),
                    u = t(120),
                    c = t(41),
                    f = t(44),
                    a = Object.getOwnPropertyDescriptor;
                r.f = t(29)
                    ? a
                    : function (t, n) {
                          if (((t = o(t)), (n = u(n, !0)), f))
                              try {
                                  return a(t, n);
                              } catch (t) {}
                          if (c(t, n)) return i(!e.f.call(t, n), t[n]);
                      };
            },
            {
                117: 117,
                120: 120,
                29: 29,
                41: 41,
                44: 44,
                82: 82,
                92: 92,
            },
        ],
        76: [
            function (t, n, r) {
                var e = t(117),
                    i = t(77).f,
                    o = {}.toString,
                    u =
                        "object" == typeof window &&
                        window &&
                        Object.getOwnPropertyNames
                            ? Object.getOwnPropertyNames(window)
                            : [],
                    c = function (t) {
                        try {
                            return i(t);
                        } catch (t) {
                            return u.slice();
                        }
                    };
                n.exports.f = function (t) {
                    return u && "[object Window]" == o.call(t) ? c(t) : i(e(t));
                };
            },
            {
                117: 117,
                77: 77,
            },
        ],
        77: [
            function (t, n, r) {
                var e = t(80),
                    i = t(31).concat("length", "prototype");
                r.f =
                    Object.getOwnPropertyNames ||
                    function (t) {
                        return e(t, i);
                    };
            },
            {
                31: 31,
                80: 80,
            },
        ],
        78: [
            function (t, n, r) {
                r.f = Object.getOwnPropertySymbols;
            },
            {},
        ],
        79: [
            function (t, n, r) {
                var e = t(41),
                    i = t(119),
                    o = t(102)("IE_PROTO"),
                    u = Object.prototype;
                n.exports =
                    Object.getPrototypeOf ||
                    function (t) {
                        return (
                            (t = i(t)),
                            e(t, o)
                                ? t[o]
                                : "function" == typeof t.constructor &&
                                  t instanceof t.constructor
                                ? t.constructor.prototype
                                : t instanceof Object
                                ? u
                                : null
                        );
                    };
            },
            {
                102: 102,
                119: 119,
                41: 41,
            },
        ],
        80: [
            function (t, n, r) {
                var e = t(41),
                    i = t(117),
                    o = t(11)(!1),
                    u = t(102)("IE_PROTO");
                n.exports = function (t, n) {
                    var r,
                        c = i(t),
                        f = 0,
                        a = [];
                    for (r in c) r != u && e(c, r) && a.push(r);
                    for (; n.length > f; )
                        e(c, (r = n[f++])) && (~o(a, r) || a.push(r));
                    return a;
                };
            },
            {
                102: 102,
                11: 11,
                117: 117,
                41: 41,
            },
        ],
        81: [
            function (t, n, r) {
                var e = t(80),
                    i = t(31);
                n.exports =
                    Object.keys ||
                    function (t) {
                        return e(t, i);
                    };
            },
            {
                31: 31,
                80: 80,
            },
        ],
        82: [
            function (t, n, r) {
                r.f = {}.propertyIsEnumerable;
            },
            {},
        ],
        83: [
            function (t, n, r) {
                var e = t(33),
                    i = t(23),
                    o = t(35);
                n.exports = function (t, n) {
                    var r = (i.Object || {})[t] || Object[t],
                        u = {};
                    (u[t] = n(r)),
                        e(
                            e.S +
                                e.F *
                                    o(function () {
                                        r(1);
                                    }),
                            "Object",
                            u
                        );
                };
            },
            {
                23: 23,
                33: 33,
                35: 35,
            },
        ],
        84: [
            function (t, n, r) {
                var e = t(81),
                    i = t(117),
                    o = t(82).f;
                n.exports = function (t) {
                    return function (n) {
                        for (
                            var r,
                                u = i(n),
                                c = e(u),
                                f = c.length,
                                a = 0,
                                s = [];
                            f > a;

                        )
                            o.call(u, (r = c[a++])) &&
                                s.push(t ? [r, u[r]] : u[r]);
                        return s;
                    };
                };
            },
            {
                117: 117,
                81: 81,
                82: 82,
            },
        ],
        85: [
            function (t, n, r) {
                var e = t(77),
                    i = t(78),
                    o = t(7),
                    u = t(40).Reflect;
                n.exports =
                    (u && u.ownKeys) ||
                    function (t) {
                        var n = e.f(o(t)),
                            r = i.f;
                        return r ? n.concat(r(t)) : n;
                    };
            },
            {
                40: 40,
                7: 7,
                77: 77,
                78: 78,
            },
        ],
        86: [
            function (t, n, r) {
                var e = t(40).parseFloat,
                    i = t(111).trim;
                n.exports =
                    1 / e(t(112) + "-0") != -1 / 0
                        ? function (t) {
                              var n = i(String(t), 3),
                                  r = e(n);
                              return 0 === r && "-" == n.charAt(0) ? -0 : r;
                          }
                        : e;
            },
            {
                111: 111,
                112: 112,
                40: 40,
            },
        ],
        87: [
            function (t, n, r) {
                var e = t(40).parseInt,
                    i = t(111).trim,
                    o = t(112),
                    u = /^[-+]?0[xX]/;
                n.exports =
                    8 !== e(o + "08") || 22 !== e(o + "0x16")
                        ? function (t, n) {
                              var r = i(String(t), 3);
                              return e(r, n >>> 0 || (u.test(r) ? 16 : 10));
                          }
                        : e;
            },
            {
                111: 111,
                112: 112,
                40: 40,
            },
        ],
        88: [
            function (t, n, r) {
                "use strict";
                var e = t(89),
                    i = t(46),
                    o = t(3);
                n.exports = function () {
                    for (
                        var t = o(this),
                            n = arguments.length,
                            r = Array(n),
                            u = 0,
                            c = e._,
                            f = !1;
                        n > u;

                    )
                        (r[u] = arguments[u++]) === c && (f = !0);
                    return function () {
                        var e,
                            o = this,
                            u = arguments.length,
                            a = 0,
                            s = 0;
                        if (!f && !u) return i(t, r, o);
                        if (((e = r.slice()), f))
                            for (; n > a; a++)
                                e[a] === c && (e[a] = arguments[s++]);
                        for (; u > s; ) e.push(arguments[s++]);
                        return i(t, e, o);
                    };
                };
            },
            {
                3: 3,
                46: 46,
                89: 89,
            },
        ],
        89: [
            function (t, n, r) {
                n.exports = t(40);
            },
            {
                40: 40,
            },
        ],
        90: [
            function (t, n, r) {
                n.exports = function (t) {
                    try {
                        return {
                            e: !1,
                            v: t(),
                        };
                    } catch (t) {
                        return {
                            e: !0,
                            v: t,
                        };
                    }
                };
            },
            {},
        ],
        91: [
            function (t, n, r) {
                var e = t(69);
                n.exports = function (t, n) {
                    var r = e.f(t);
                    return (0, r.resolve)(n), r.promise;
                };
            },
            {
                69: 69,
            },
        ],
        92: [
            function (t, n, r) {
                n.exports = function (t, n) {
                    return {
                        enumerable: !(1 & t),
                        configurable: !(2 & t),
                        writable: !(4 & t),
                        value: n,
                    };
                };
            },
            {},
        ],
        93: [
            function (t, n, r) {
                var e = t(94);
                n.exports = function (t, n, r) {
                    for (var i in n) e(t, i, n[i], r);
                    return t;
                };
            },
            {
                94: 94,
            },
        ],
        94: [
            function (t, n, r) {
                var e = t(40),
                    i = t(42),
                    o = t(41),
                    u = t(124)("src"),
                    c = Function.toString,
                    f = ("" + c).split("toString");
                (t(23).inspectSource = function (t) {
                    return c.call(t);
                }),
                    (n.exports = function (t, n, r, c) {
                        var a = "function" == typeof r;
                        a && (o(r, "name") || i(r, "name", n)),
                            t[n] !== r &&
                                (a &&
                                    (o(r, u) ||
                                        i(
                                            r,
                                            u,
                                            t[n] ? "" + t[n] : f.join(String(n))
                                        )),
                                t === e
                                    ? (t[n] = r)
                                    : c
                                    ? t[n]
                                        ? (t[n] = r)
                                        : i(t, n, r)
                                    : (delete t[n], i(t, n, r)));
                    })(Function.prototype, "toString", function () {
                        return (
                            ("function" == typeof this && this[u]) ||
                            c.call(this)
                        );
                    });
            },
            {
                124: 124,
                23: 23,
                40: 40,
                41: 41,
                42: 42,
            },
        ],
        95: [
            function (t, n, r) {
                n.exports = function (t, n) {
                    var r =
                        n === Object(n)
                            ? function (t) {
                                  return n[t];
                              }
                            : n;
                    return function (n) {
                        return String(n).replace(t, r);
                    };
                };
            },
            {},
        ],
        96: [
            function (t, n, r) {
                n.exports =
                    Object.is ||
                    function (t, n) {
                        return t === n
                            ? 0 !== t || 1 / t == 1 / n
                            : t != t && n != n;
                    };
            },
            {},
        ],
        97: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(3),
                    o = t(25),
                    u = t(39);
                n.exports = function (t) {
                    e(e.S, t, {
                        from: function (t) {
                            var n,
                                r,
                                e,
                                c,
                                f = arguments[1];
                            return (
                                i(this),
                                (n = void 0 !== f),
                                n && i(f),
                                void 0 == t
                                    ? new this()
                                    : ((r = []),
                                      n
                                          ? ((e = 0),
                                            (c = o(f, arguments[2], 2)),
                                            u(t, !1, function (t) {
                                                r.push(c(t, e++));
                                            }))
                                          : u(t, !1, r.push, r),
                                      new this(r))
                            );
                        },
                    });
                };
            },
            {
                25: 25,
                3: 3,
                33: 33,
                39: 39,
            },
        ],
        98: [
            function (t, n, r) {
                "use strict";
                var e = t(33);
                n.exports = function (t) {
                    e(e.S, t, {
                        of: function () {
                            for (var t = arguments.length, n = Array(t); t--; )
                                n[t] = arguments[t];
                            return new this(n);
                        },
                    });
                };
            },
            {
                33: 33,
            },
        ],
        99: [
            function (t, n, r) {
                var e = t(51),
                    i = t(7),
                    o = function (t, n) {
                        if ((i(t), !e(n) && null !== n))
                            throw TypeError(n + ": can't set as prototype!");
                    };
                n.exports = {
                    set:
                        Object.setPrototypeOf ||
                        ("__proto__" in {}
                            ? (function (n, r, e) {
                                  try {
                                      (e = t(25)(
                                          Function.call,
                                          t(75).f(Object.prototype, "__proto__")
                                              .set,
                                          2
                                      )),
                                          e(n, []),
                                          (r = !(n instanceof Array));
                                  } catch (t) {
                                      r = !0;
                                  }
                                  return function (t, n) {
                                      return (
                                          o(t, n),
                                          r ? (t.__proto__ = n) : e(t, n),
                                          t
                                      );
                                  };
                              })({}, !1)
                            : void 0),
                    check: o,
                };
            },
            {
                25: 25,
                51: 51,
                7: 7,
                75: 75,
            },
        ],
        100: [
            function (t, n, r) {
                "use strict";
                var e = t(40),
                    i = t(72),
                    o = t(29),
                    u = t(128)("species");
                n.exports = function (t) {
                    var n = e[t];
                    o &&
                        n &&
                        !n[u] &&
                        i.f(n, u, {
                            configurable: !0,
                            get: function () {
                                return this;
                            },
                        });
                };
            },
            {
                128: 128,
                29: 29,
                40: 40,
                72: 72,
            },
        ],
        101: [
            function (t, n, r) {
                var e = t(72).f,
                    i = t(41),
                    o = t(128)("toStringTag");
                n.exports = function (t, n, r) {
                    t &&
                        !i((t = r ? t : t.prototype), o) &&
                        e(t, o, {
                            configurable: !0,
                            value: n,
                        });
                };
            },
            {
                128: 128,
                41: 41,
                72: 72,
            },
        ],
        102: [
            function (t, n, r) {
                var e = t(103)("keys"),
                    i = t(124);
                n.exports = function (t) {
                    return e[t] || (e[t] = i(t));
                };
            },
            {
                103: 103,
                124: 124,
            },
        ],
        103: [
            function (t, n, r) {
                var e = t(40),
                    i =
                        e["__core-js_shared__"] ||
                        (e["__core-js_shared__"] = {});
                n.exports = function (t) {
                    return i[t] || (i[t] = {});
                };
            },
            {
                40: 40,
            },
        ],
        104: [
            function (t, n, r) {
                var e = t(7),
                    i = t(3),
                    o = t(128)("species");
                n.exports = function (t, n) {
                    var r,
                        u = e(t).constructor;
                    return void 0 === u || void 0 == (r = e(u)[o]) ? n : i(r);
                };
            },
            {
                128: 128,
                3: 3,
                7: 7,
            },
        ],
        105: [
            function (t, n, r) {
                "use strict";
                var e = t(35);
                n.exports = function (t, n) {
                    return (
                        !!t &&
                        e(function () {
                            n ? t.call(null, function () {}, 1) : t.call(null);
                        })
                    );
                };
            },
            {
                35: 35,
            },
        ],
        106: [
            function (t, n, r) {
                var e = t(116),
                    i = t(28);
                n.exports = function (t) {
                    return function (n, r) {
                        var o,
                            u,
                            c = String(i(n)),
                            f = e(r),
                            a = c.length;
                        return f < 0 || f >= a
                            ? t
                                ? ""
                                : void 0
                            : ((o = c.charCodeAt(f)),
                              o < 55296 ||
                              o > 56319 ||
                              f + 1 === a ||
                              (u = c.charCodeAt(f + 1)) < 56320 ||
                              u > 57343
                                  ? t
                                      ? c.charAt(f)
                                      : o
                                  : t
                                  ? c.slice(f, f + 2)
                                  : u - 56320 + ((o - 55296) << 10) + 65536);
                    };
                };
            },
            {
                116: 116,
                28: 28,
            },
        ],
        107: [
            function (t, n, r) {
                var e = t(52),
                    i = t(28);
                n.exports = function (t, n, r) {
                    if (e(n))
                        throw TypeError(
                            "String#" + r + " doesn't accept regex!"
                        );
                    return String(i(t));
                };
            },
            {
                28: 28,
                52: 52,
            },
        ],
        108: [
            function (t, n, r) {
                var e = t(33),
                    i = t(35),
                    o = t(28),
                    u = /"/g,
                    c = function (t, n, r, e) {
                        var i = String(o(t)),
                            c = "<" + n;
                        return (
                            "" !== r &&
                                (c +=
                                    " " +
                                    r +
                                    '="' +
                                    String(e).replace(u, "&quot;") +
                                    '"'),
                            c + ">" + i + "</" + n + ">"
                        );
                    };
                n.exports = function (t, n) {
                    var r = {};
                    (r[t] = n(c)),
                        e(
                            e.P +
                                e.F *
                                    i(function () {
                                        var n = ""[t]('"');
                                        return (
                                            n !== n.toLowerCase() ||
                                            n.split('"').length > 3
                                        );
                                    }),
                            "String",
                            r
                        );
                };
            },
            {
                28: 28,
                33: 33,
                35: 35,
            },
        ],
        109: [
            function (t, n, r) {
                var e = t(118),
                    i = t(110),
                    o = t(28);
                n.exports = function (t, n, r, u) {
                    var c = String(o(t)),
                        f = c.length,
                        a = void 0 === r ? " " : String(r),
                        s = e(n);
                    if (s <= f || "" == a) return c;
                    var l = s - f,
                        h = i.call(a, Math.ceil(l / a.length));
                    return (
                        h.length > l && (h = h.slice(0, l)), u ? h + c : c + h
                    );
                };
            },
            {
                110: 110,
                118: 118,
                28: 28,
            },
        ],
        110: [
            function (t, n, r) {
                "use strict";
                var e = t(116),
                    i = t(28);
                n.exports = function (t) {
                    var n = String(i(this)),
                        r = "",
                        o = e(t);
                    if (o < 0 || o == 1 / 0)
                        throw RangeError("Count can't be negative");
                    for (; o > 0; (o >>>= 1) && (n += n)) 1 & o && (r += n);
                    return r;
                };
            },
            {
                116: 116,
                28: 28,
            },
        ],
        111: [
            function (t, n, r) {
                var e = t(33),
                    i = t(28),
                    o = t(35),
                    u = t(112),
                    c = "[" + u + "]",
                    f = "​",
                    a = RegExp("^" + c + c + "*"),
                    s = RegExp(c + c + "*$"),
                    l = function (t, n, r) {
                        var i = {},
                            c = o(function () {
                                return !!u[t]() || f[t]() != f;
                            }),
                            a = (i[t] = c ? n(h) : u[t]);
                        r && (i[r] = a), e(e.P + e.F * c, "String", i);
                    },
                    h = (l.trim = function (t, n) {
                        return (
                            (t = String(i(t))),
                            1 & n && (t = t.replace(a, "")),
                            2 & n && (t = t.replace(s, "")),
                            t
                        );
                    });
                n.exports = l;
            },
            {
                112: 112,
                28: 28,
                33: 33,
                35: 35,
            },
        ],
        112: [
            function (t, n, r) {
                n.exports = "\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff";
            },
            {},
        ],
        113: [
            function (t, n, r) {
                var e,
                    i,
                    o,
                    u = t(25),
                    c = t(46),
                    f = t(43),
                    a = t(30),
                    s = t(40),
                    l = s.process,
                    h = s.setImmediate,
                    v = s.clearImmediate,
                    p = s.MessageChannel,
                    y = s.Dispatch,
                    d = 0,
                    g = {},
                    m = function () {
                        var t = +this;
                        if (g.hasOwnProperty(t)) {
                            var n = g[t];
                            delete g[t], n();
                        }
                    },
                    b = function (t) {
                        m.call(t.data);
                    };
                (h && v) ||
                    ((h = function (t) {
                        for (var n = [], r = 1; arguments.length > r; )
                            n.push(arguments[r++]);
                        return (
                            (g[++d] = function () {
                                c("function" == typeof t ? t : Function(t), n);
                            }),
                            e(d),
                            d
                        );
                    }),
                    (v = function (t) {
                        delete g[t];
                    }),
                    "process" == t(18)(l)
                        ? (e = function (t) {
                              l.nextTick(u(m, t, 1));
                          })
                        : y && y.now
                        ? (e = function (t) {
                              y.now(u(m, t, 1));
                          })
                        : p
                        ? ((i = new p()),
                          (o = i.port2),
                          (i.port1.onmessage = b),
                          (e = u(o.postMessage, o, 1)))
                        : s.addEventListener &&
                          "function" == typeof postMessage &&
                          !s.importScripts
                        ? ((e = function (t) {
                              s.postMessage(t + "", "*");
                          }),
                          s.addEventListener("message", b, !1))
                        : (e =
                              "onreadystatechange" in a("script")
                                  ? function (t) {
                                        f.appendChild(
                                            a("script")
                                        ).onreadystatechange = function () {
                                            f.removeChild(this), m.call(t);
                                        };
                                    }
                                  : function (t) {
                                        setTimeout(u(m, t, 1), 0);
                                    })),
                    (n.exports = {
                        set: h,
                        clear: v,
                    });
            },
            {
                18: 18,
                25: 25,
                30: 30,
                40: 40,
                43: 43,
                46: 46,
            },
        ],
        114: [
            function (t, n, r) {
                var e = t(116),
                    i = Math.max,
                    o = Math.min;
                n.exports = function (t, n) {
                    return (t = e(t)), t < 0 ? i(t + n, 0) : o(t, n);
                };
            },
            {
                116: 116,
            },
        ],
        115: [
            function (t, n, r) {
                var e = t(116),
                    i = t(118);
                n.exports = function (t) {
                    if (void 0 === t) return 0;
                    var n = e(t),
                        r = i(n);
                    if (n !== r) throw RangeError("Wrong length!");
                    return r;
                };
            },
            {
                116: 116,
                118: 118,
            },
        ],
        116: [
            function (t, n, r) {
                var e = Math.ceil,
                    i = Math.floor;
                n.exports = function (t) {
                    return isNaN((t = +t)) ? 0 : (t > 0 ? i : e)(t);
                };
            },
            {},
        ],
        117: [
            function (t, n, r) {
                var e = t(47),
                    i = t(28);
                n.exports = function (t) {
                    return e(i(t));
                };
            },
            {
                28: 28,
                47: 47,
            },
        ],
        118: [
            function (t, n, r) {
                var e = t(116),
                    i = Math.min;
                n.exports = function (t) {
                    return t > 0 ? i(e(t), 9007199254740991) : 0;
                };
            },
            {
                116: 116,
            },
        ],
        119: [
            function (t, n, r) {
                var e = t(28);
                n.exports = function (t) {
                    return Object(e(t));
                };
            },
            {
                28: 28,
            },
        ],
        120: [
            function (t, n, r) {
                var e = t(51);
                n.exports = function (t, n) {
                    if (!e(t)) return t;
                    var r, i;
                    if (
                        n &&
                        "function" == typeof (r = t.toString) &&
                        !e((i = r.call(t)))
                    )
                        return i;
                    if (
                        "function" == typeof (r = t.valueOf) &&
                        !e((i = r.call(t)))
                    )
                        return i;
                    if (
                        !n &&
                        "function" == typeof (r = t.toString) &&
                        !e((i = r.call(t)))
                    )
                        return i;
                    throw TypeError("Can't convert object to primitive value");
                };
            },
            {
                51: 51,
            },
        ],
        121: [
            function (t, n, r) {
                "use strict";
                if (t(29)) {
                    var e = t(60),
                        i = t(40),
                        o = t(35),
                        u = t(33),
                        c = t(123),
                        f = t(122),
                        a = t(25),
                        s = t(6),
                        l = t(92),
                        h = t(42),
                        v = t(93),
                        p = t(116),
                        y = t(118),
                        d = t(115),
                        g = t(114),
                        m = t(120),
                        b = t(41),
                        S = t(17),
                        w = t(51),
                        x = t(119),
                        _ = t(48),
                        E = t(71),
                        O = t(79),
                        M = t(77).f,
                        P = t(129),
                        F = t(124),
                        A = t(128),
                        j = t(12),
                        N = t(11),
                        I = t(104),
                        T = t(141),
                        L = t(58),
                        R = t(56),
                        k = t(100),
                        D = t(9),
                        W = t(8),
                        C = t(72),
                        G = t(75),
                        U = C.f,
                        B = G.f,
                        V = i.RangeError,
                        z = i.TypeError,
                        Y = i.Uint8Array,
                        q = Array.prototype,
                        J = f.ArrayBuffer,
                        K = f.DataView,
                        H = j(0),
                        X = j(2),
                        $ = j(3),
                        Z = j(4),
                        Q = j(5),
                        tt = j(6),
                        nt = N(!0),
                        rt = N(!1),
                        et = T.values,
                        it = T.keys,
                        ot = T.entries,
                        ut = q.lastIndexOf,
                        ct = q.reduce,
                        ft = q.reduceRight,
                        at = q.join,
                        st = q.sort,
                        lt = q.slice,
                        ht = q.toString,
                        vt = q.toLocaleString,
                        pt = A("iterator"),
                        yt = A("toStringTag"),
                        dt = F("typed_constructor"),
                        gt = F("def_constructor"),
                        mt = c.CONSTR,
                        bt = c.TYPED,
                        St = c.VIEW,
                        wt = j(1, function (t, n) {
                            return Mt(I(t, t[gt]), n);
                        }),
                        xt = o(function () {
                            return 1 === new Y(new Uint16Array([1]).buffer)[0];
                        }),
                        _t =
                            !!Y &&
                            !!Y.prototype.set &&
                            o(function () {
                                new Y(1).set({});
                            }),
                        Et = function (t, n) {
                            var r = p(t);
                            if (r < 0 || r % n) throw V("Wrong offset!");
                            return r;
                        },
                        Ot = function (t) {
                            if (w(t) && bt in t) return t;
                            throw z(t + " is not a typed array!");
                        },
                        Mt = function (t, n) {
                            if (!(w(t) && dt in t))
                                throw z("It is not a typed array constructor!");
                            return new t(n);
                        },
                        Pt = function (t, n) {
                            return Ft(I(t, t[gt]), n);
                        },
                        Ft = function (t, n) {
                            for (var r = 0, e = n.length, i = Mt(t, e); e > r; )
                                i[r] = n[r++];
                            return i;
                        },
                        At = function (t, n, r) {
                            U(t, n, {
                                get: function () {
                                    return this._d[r];
                                },
                            });
                        },
                        jt = function (t) {
                            var n,
                                r,
                                e,
                                i,
                                o,
                                u,
                                c = x(t),
                                f = arguments.length,
                                s = f > 1 ? arguments[1] : void 0,
                                l = void 0 !== s,
                                h = P(c);
                            if (void 0 != h && !_(h)) {
                                for (
                                    u = h.call(c), e = [], n = 0;
                                    !(o = u.next()).done;
                                    n++
                                )
                                    e.push(o.value);
                                c = e;
                            }
                            for (
                                l && f > 2 && (s = a(s, arguments[2], 2)),
                                    n = 0,
                                    r = y(c.length),
                                    i = Mt(this, r);
                                r > n;
                                n++
                            )
                                i[n] = l ? s(c[n], n) : c[n];
                            return i;
                        },
                        Nt = function () {
                            for (
                                var t = 0,
                                    n = arguments.length,
                                    r = Mt(this, n);
                                n > t;

                            )
                                r[t] = arguments[t++];
                            return r;
                        },
                        It =
                            !!Y &&
                            o(function () {
                                vt.call(new Y(1));
                            }),
                        Tt = function () {
                            return vt.apply(
                                It ? lt.call(Ot(this)) : Ot(this),
                                arguments
                            );
                        },
                        Lt = {
                            copyWithin: function (t, n) {
                                return W.call(
                                    Ot(this),
                                    t,
                                    n,
                                    arguments.length > 2 ? arguments[2] : void 0
                                );
                            },
                            every: function (t) {
                                return Z(
                                    Ot(this),
                                    t,
                                    arguments.length > 1 ? arguments[1] : void 0
                                );
                            },
                            fill: function (t) {
                                return D.apply(Ot(this), arguments);
                            },
                            filter: function (t) {
                                return Pt(
                                    this,
                                    X(
                                        Ot(this),
                                        t,
                                        arguments.length > 1
                                            ? arguments[1]
                                            : void 0
                                    )
                                );
                            },
                            find: function (t) {
                                return Q(
                                    Ot(this),
                                    t,
                                    arguments.length > 1 ? arguments[1] : void 0
                                );
                            },
                            findIndex: function (t) {
                                return tt(
                                    Ot(this),
                                    t,
                                    arguments.length > 1 ? arguments[1] : void 0
                                );
                            },
                            forEach: function (t) {
                                H(
                                    Ot(this),
                                    t,
                                    arguments.length > 1 ? arguments[1] : void 0
                                );
                            },
                            indexOf: function (t) {
                                return rt(
                                    Ot(this),
                                    t,
                                    arguments.length > 1 ? arguments[1] : void 0
                                );
                            },
                            includes: function (t) {
                                return nt(
                                    Ot(this),
                                    t,
                                    arguments.length > 1 ? arguments[1] : void 0
                                );
                            },
                            join: function (t) {
                                return at.apply(Ot(this), arguments);
                            },
                            lastIndexOf: function (t) {
                                return ut.apply(Ot(this), arguments);
                            },
                            map: function (t) {
                                return wt(
                                    Ot(this),
                                    t,
                                    arguments.length > 1 ? arguments[1] : void 0
                                );
                            },
                            reduce: function (t) {
                                return ct.apply(Ot(this), arguments);
                            },
                            reduceRight: function (t) {
                                return ft.apply(Ot(this), arguments);
                            },
                            reverse: function () {
                                for (
                                    var t,
                                        n = this,
                                        r = Ot(n).length,
                                        e = Math.floor(r / 2),
                                        i = 0;
                                    i < e;

                                )
                                    (t = n[i]), (n[i++] = n[--r]), (n[r] = t);
                                return n;
                            },
                            some: function (t) {
                                return $(
                                    Ot(this),
                                    t,
                                    arguments.length > 1 ? arguments[1] : void 0
                                );
                            },
                            sort: function (t) {
                                return st.call(Ot(this), t);
                            },
                            subarray: function (t, n) {
                                var r = Ot(this),
                                    e = r.length,
                                    i = g(t, e);
                                return new (I(r, r[gt]))(
                                    r.buffer,
                                    r.byteOffset + i * r.BYTES_PER_ELEMENT,
                                    y((void 0 === n ? e : g(n, e)) - i)
                                );
                            },
                        },
                        Rt = function (t, n) {
                            return Pt(this, lt.call(Ot(this), t, n));
                        },
                        kt = function (t) {
                            Ot(this);
                            var n = Et(arguments[1], 1),
                                r = this.length,
                                e = x(t),
                                i = y(e.length),
                                o = 0;
                            if (i + n > r) throw V("Wrong length!");
                            for (; o < i; ) this[n + o] = e[o++];
                        },
                        Dt = {
                            entries: function () {
                                return ot.call(Ot(this));
                            },
                            keys: function () {
                                return it.call(Ot(this));
                            },
                            values: function () {
                                return et.call(Ot(this));
                            },
                        },
                        Wt = function (t, n) {
                            return (
                                w(t) &&
                                t[bt] &&
                                "symbol" != typeof n &&
                                n in t &&
                                String(+n) == String(n)
                            );
                        },
                        Ct = function (t, n) {
                            return Wt(t, (n = m(n, !0))) ? l(2, t[n]) : B(t, n);
                        },
                        Gt = function (t, n, r) {
                            return !(
                                Wt(t, (n = m(n, !0))) &&
                                w(r) &&
                                b(r, "value")
                            ) ||
                                b(r, "get") ||
                                b(r, "set") ||
                                r.configurable ||
                                (b(r, "writable") && !r.writable) ||
                                (b(r, "enumerable") && !r.enumerable)
                                ? U(t, n, r)
                                : ((t[n] = r.value), t);
                        };
                    mt || ((G.f = Ct), (C.f = Gt)),
                        u(u.S + u.F * !mt, "Object", {
                            getOwnPropertyDescriptor: Ct,
                            defineProperty: Gt,
                        }),
                        o(function () {
                            ht.call({});
                        }) &&
                            (ht = vt =
                                function () {
                                    return at.call(this);
                                });
                    var Ut = v({}, Lt);
                    v(Ut, Dt),
                        h(Ut, pt, Dt.values),
                        v(Ut, {
                            slice: Rt,
                            set: kt,
                            constructor: function () {},
                            toString: ht,
                            toLocaleString: Tt,
                        }),
                        At(Ut, "buffer", "b"),
                        At(Ut, "byteOffset", "o"),
                        At(Ut, "byteLength", "l"),
                        At(Ut, "length", "e"),
                        U(Ut, yt, {
                            get: function () {
                                return this[bt];
                            },
                        }),
                        (n.exports = function (t, n, r, f) {
                            f = !!f;
                            var a = t + (f ? "Clamped" : "") + "Array",
                                l = "get" + t,
                                v = "set" + t,
                                p = i[a],
                                g = p || {},
                                m = p && O(p),
                                b = !p || !c.ABV,
                                x = {},
                                _ = p && p.prototype,
                                P = function (t, r) {
                                    var e = t._d;
                                    return e.v[l](r * n + e.o, xt);
                                },
                                F = function (t, r, e) {
                                    var i = t._d;
                                    f &&
                                        (e =
                                            (e = Math.round(e)) < 0
                                                ? 0
                                                : e > 255
                                                ? 255
                                                : 255 & e),
                                        i.v[v](r * n + i.o, e, xt);
                                },
                                A = function (t, n) {
                                    U(t, n, {
                                        get: function () {
                                            return P(this, n);
                                        },
                                        set: function (t) {
                                            return F(this, n, t);
                                        },
                                        enumerable: !0,
                                    });
                                };
                            b
                                ? ((p = r(function (t, r, e, i) {
                                      s(t, p, a, "_d");
                                      var o,
                                          u,
                                          c,
                                          f,
                                          l = 0,
                                          v = 0;
                                      if (w(r)) {
                                          if (
                                              !(
                                                  r instanceof J ||
                                                  "ArrayBuffer" == (f = S(r)) ||
                                                  "SharedArrayBuffer" == f
                                              )
                                          )
                                              return bt in r
                                                  ? Ft(p, r)
                                                  : jt.call(p, r);
                                          (o = r), (v = Et(e, n));
                                          var g = r.byteLength;
                                          if (void 0 === i) {
                                              if (g % n)
                                                  throw V("Wrong length!");
                                              if ((u = g - v) < 0)
                                                  throw V("Wrong length!");
                                          } else if ((u = y(i) * n) + v > g)
                                              throw V("Wrong length!");
                                          c = u / n;
                                      } else (c = d(r)), (u = c * n), (o = new J(u));
                                      for (
                                          h(t, "_d", {
                                              b: o,
                                              o: v,
                                              l: u,
                                              e: c,
                                              v: new K(o),
                                          });
                                          l < c;

                                      )
                                          A(t, l++);
                                  })),
                                  (_ = p.prototype = E(Ut)),
                                  h(_, "constructor", p))
                                : (o(function () {
                                      p(1);
                                  }) &&
                                      o(function () {
                                          new p(-1);
                                      }) &&
                                      R(function (t) {
                                          new p(),
                                              new p(null),
                                              new p(1.5),
                                              new p(t);
                                      }, !0)) ||
                                  ((p = r(function (t, r, e, i) {
                                      s(t, p, a);
                                      var o;
                                      return w(r)
                                          ? r instanceof J ||
                                            "ArrayBuffer" == (o = S(r)) ||
                                            "SharedArrayBuffer" == o
                                              ? void 0 !== i
                                                  ? new g(r, Et(e, n), i)
                                                  : void 0 !== e
                                                  ? new g(r, Et(e, n))
                                                  : new g(r)
                                              : bt in r
                                              ? Ft(p, r)
                                              : jt.call(p, r)
                                          : new g(d(r));
                                  })),
                                  H(
                                      m !== Function.prototype
                                          ? M(g).concat(M(m))
                                          : M(g),
                                      function (t) {
                                          t in p || h(p, t, g[t]);
                                      }
                                  ),
                                  (p.prototype = _),
                                  e || (_.constructor = p));
                            var j = _[pt],
                                N =
                                    !!j &&
                                    ("values" == j.name || void 0 == j.name),
                                I = Dt.values;
                            h(p, dt, !0),
                                h(_, bt, a),
                                h(_, St, !0),
                                h(_, gt, p),
                                (f ? new p(1)[yt] == a : yt in _) ||
                                    U(_, yt, {
                                        get: function () {
                                            return a;
                                        },
                                    }),
                                (x[a] = p),
                                u(u.G + u.W + u.F * (p != g), x),
                                u(u.S, a, {
                                    BYTES_PER_ELEMENT: n,
                                }),
                                u(
                                    u.S +
                                        u.F *
                                            o(function () {
                                                g.of.call(p, 1);
                                            }),
                                    a,
                                    {
                                        from: jt,
                                        of: Nt,
                                    }
                                ),
                                "BYTES_PER_ELEMENT" in _ ||
                                    h(_, "BYTES_PER_ELEMENT", n),
                                u(u.P, a, Lt),
                                k(a),
                                u(u.P + u.F * _t, a, {
                                    set: kt,
                                }),
                                u(u.P + u.F * !N, a, Dt),
                                e || _.toString == ht || (_.toString = ht),
                                u(
                                    u.P +
                                        u.F *
                                            o(function () {
                                                new p(1).slice();
                                            }),
                                    a,
                                    {
                                        slice: Rt,
                                    }
                                ),
                                u(
                                    u.P +
                                        u.F *
                                            (o(function () {
                                                return (
                                                    [1, 2].toLocaleString() !=
                                                    new p([
                                                        1, 2,
                                                    ]).toLocaleString()
                                                );
                                            }) ||
                                                !o(function () {
                                                    _.toLocaleString.call([
                                                        1, 2,
                                                    ]);
                                                })),
                                    a,
                                    {
                                        toLocaleString: Tt,
                                    }
                                ),
                                (L[a] = N ? j : I),
                                e || N || h(_, pt, I);
                        });
                } else n.exports = function () {};
            },
            {
                100: 100,
                104: 104,
                11: 11,
                114: 114,
                115: 115,
                116: 116,
                118: 118,
                119: 119,
                12: 12,
                120: 120,
                122: 122,
                123: 123,
                124: 124,
                128: 128,
                129: 129,
                141: 141,
                17: 17,
                25: 25,
                29: 29,
                33: 33,
                35: 35,
                40: 40,
                41: 41,
                42: 42,
                48: 48,
                51: 51,
                56: 56,
                58: 58,
                6: 6,
                60: 60,
                71: 71,
                72: 72,
                75: 75,
                77: 77,
                79: 79,
                8: 8,
                9: 9,
                92: 92,
                93: 93,
            },
        ],
        122: [
            function (t, n, r) {
                "use strict";

                function e(t, n, r) {
                    var e,
                        i,
                        o,
                        u = Array(r),
                        c = 8 * r - n - 1,
                        f = (1 << c) - 1,
                        a = f >> 1,
                        s = 23 === n ? W(2, -24) - W(2, -77) : 0,
                        l = 0,
                        h = t < 0 || (0 === t && 1 / t < 0) ? 1 : 0;
                    for (
                        t = D(t),
                            t != t || t === R
                                ? ((i = t != t ? 1 : 0), (e = f))
                                : ((e = C(G(t) / U)),
                                  t * (o = W(2, -e)) < 1 && (e--, (o *= 2)),
                                  (t += e + a >= 1 ? s / o : s * W(2, 1 - a)),
                                  t * o >= 2 && (e++, (o /= 2)),
                                  e + a >= f
                                      ? ((i = 0), (e = f))
                                      : e + a >= 1
                                      ? ((i = (t * o - 1) * W(2, n)), (e += a))
                                      : ((i = t * W(2, a - 1) * W(2, n)),
                                        (e = 0)));
                        n >= 8;
                        u[l++] = 255 & i, i /= 256, n -= 8
                    );
                    for (
                        e = (e << n) | i, c += n;
                        c > 0;
                        u[l++] = 255 & e, e /= 256, c -= 8
                    );
                    return (u[--l] |= 128 * h), u;
                }

                function i(t, n, r) {
                    var e,
                        i = 8 * r - n - 1,
                        o = (1 << i) - 1,
                        u = o >> 1,
                        c = i - 7,
                        f = r - 1,
                        a = t[f--],
                        s = 127 & a;
                    for (a >>= 7; c > 0; s = 256 * s + t[f], f--, c -= 8);
                    for (
                        e = s & ((1 << -c) - 1), s >>= -c, c += n;
                        c > 0;
                        e = 256 * e + t[f], f--, c -= 8
                    );
                    if (0 === s) s = 1 - u;
                    else {
                        if (s === o) return e ? NaN : a ? -R : R;
                        (e += W(2, n)), (s -= u);
                    }
                    return (a ? -1 : 1) * e * W(2, s - n);
                }

                function o(t) {
                    return (t[3] << 24) | (t[2] << 16) | (t[1] << 8) | t[0];
                }

                function u(t) {
                    return [255 & t];
                }

                function c(t) {
                    return [255 & t, (t >> 8) & 255];
                }

                function f(t) {
                    return [
                        255 & t,
                        (t >> 8) & 255,
                        (t >> 16) & 255,
                        (t >> 24) & 255,
                    ];
                }

                function a(t) {
                    return e(t, 52, 8);
                }

                function s(t) {
                    return e(t, 23, 4);
                }

                function l(t, n, r) {
                    M(t[A], n, {
                        get: function () {
                            return this[r];
                        },
                    });
                }

                function h(t, n, r, e) {
                    var i = +r,
                        o = E(i);
                    if (o + n > t[V]) throw L(j);
                    var u = t[B]._b,
                        c = o + t[z],
                        f = u.slice(c, c + n);
                    return e ? f : f.reverse();
                }

                function v(t, n, r, e, i, o) {
                    var u = +r,
                        c = E(u);
                    if (c + n > t[V]) throw L(j);
                    for (
                        var f = t[B]._b, a = c + t[z], s = e(+i), l = 0;
                        l < n;
                        l++
                    )
                        f[a + l] = s[o ? l : n - l - 1];
                }
                var p = t(40),
                    y = t(29),
                    d = t(60),
                    g = t(123),
                    m = t(42),
                    b = t(93),
                    S = t(35),
                    w = t(6),
                    x = t(116),
                    _ = t(118),
                    E = t(115),
                    O = t(77).f,
                    M = t(72).f,
                    P = t(9),
                    F = t(101),
                    A = "prototype",
                    j = "Wrong index!",
                    N = p.ArrayBuffer,
                    I = p.DataView,
                    T = p.Math,
                    L = p.RangeError,
                    R = p.Infinity,
                    k = N,
                    D = T.abs,
                    W = T.pow,
                    C = T.floor,
                    G = T.log,
                    U = T.LN2,
                    B = y ? "_b" : "buffer",
                    V = y ? "_l" : "byteLength",
                    z = y ? "_o" : "byteOffset";
                if (g.ABV) {
                    if (
                        !S(function () {
                            N(1);
                        }) ||
                        !S(function () {
                            new N(-1);
                        }) ||
                        S(function () {
                            return (
                                new N(),
                                new N(1.5),
                                new N(NaN),
                                "ArrayBuffer" != N.name
                            );
                        })
                    ) {
                        N = function (t) {
                            return w(this, N), new k(E(t));
                        };
                        for (
                            var Y, q = (N[A] = k[A]), J = O(k), K = 0;
                            J.length > K;

                        )
                            (Y = J[K++]) in N || m(N, Y, k[Y]);
                        d || (q.constructor = N);
                    }
                    var H = new I(new N(2)),
                        X = I[A].setInt8;
                    H.setInt8(0, 2147483648),
                        H.setInt8(1, 2147483649),
                        (!H.getInt8(0) && H.getInt8(1)) ||
                            b(
                                I[A],
                                {
                                    setInt8: function (t, n) {
                                        X.call(this, t, (n << 24) >> 24);
                                    },
                                    setUint8: function (t, n) {
                                        X.call(this, t, (n << 24) >> 24);
                                    },
                                },
                                !0
                            );
                } else
                    (N = function (t) {
                        w(this, N, "ArrayBuffer");
                        var n = E(t);
                        (this._b = P.call(Array(n), 0)), (this[V] = n);
                    }),
                        (I = function (t, n, r) {
                            w(this, I, "DataView"), w(t, N, "DataView");
                            var e = t[V],
                                i = x(n);
                            if (i < 0 || i > e) throw L("Wrong offset!");
                            if (((r = void 0 === r ? e - i : _(r)), i + r > e))
                                throw L("Wrong length!");
                            (this[B] = t), (this[z] = i), (this[V] = r);
                        }),
                        y &&
                            (l(N, "byteLength", "_l"),
                            l(I, "buffer", "_b"),
                            l(I, "byteLength", "_l"),
                            l(I, "byteOffset", "_o")),
                        b(I[A], {
                            getInt8: function (t) {
                                return (h(this, 1, t)[0] << 24) >> 24;
                            },
                            getUint8: function (t) {
                                return h(this, 1, t)[0];
                            },
                            getInt16: function (t) {
                                var n = h(this, 2, t, arguments[1]);
                                return (((n[1] << 8) | n[0]) << 16) >> 16;
                            },
                            getUint16: function (t) {
                                var n = h(this, 2, t, arguments[1]);
                                return (n[1] << 8) | n[0];
                            },
                            getInt32: function (t) {
                                return o(h(this, 4, t, arguments[1]));
                            },
                            getUint32: function (t) {
                                return o(h(this, 4, t, arguments[1])) >>> 0;
                            },
                            getFloat32: function (t) {
                                return i(h(this, 4, t, arguments[1]), 23, 4);
                            },
                            getFloat64: function (t) {
                                return i(h(this, 8, t, arguments[1]), 52, 8);
                            },
                            setInt8: function (t, n) {
                                v(this, 1, t, u, n);
                            },
                            setUint8: function (t, n) {
                                v(this, 1, t, u, n);
                            },
                            setInt16: function (t, n) {
                                v(this, 2, t, c, n, arguments[2]);
                            },
                            setUint16: function (t, n) {
                                v(this, 2, t, c, n, arguments[2]);
                            },
                            setInt32: function (t, n) {
                                v(this, 4, t, f, n, arguments[2]);
                            },
                            setUint32: function (t, n) {
                                v(this, 4, t, f, n, arguments[2]);
                            },
                            setFloat32: function (t, n) {
                                v(this, 4, t, s, n, arguments[2]);
                            },
                            setFloat64: function (t, n) {
                                v(this, 8, t, a, n, arguments[2]);
                            },
                        });
                F(N, "ArrayBuffer"),
                    F(I, "DataView"),
                    m(I[A], g.VIEW, !0),
                    (r.ArrayBuffer = N),
                    (r.DataView = I);
            },
            {
                101: 101,
                115: 115,
                116: 116,
                118: 118,
                123: 123,
                29: 29,
                35: 35,
                40: 40,
                42: 42,
                6: 6,
                60: 60,
                72: 72,
                77: 77,
                9: 9,
                93: 93,
            },
        ],
        123: [
            function (t, n, r) {
                for (
                    var e,
                        i = t(40),
                        o = t(42),
                        u = t(124),
                        c = u("typed_array"),
                        f = u("view"),
                        a = !(!i.ArrayBuffer || !i.DataView),
                        s = a,
                        l = 0,
                        h =
                            "Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array".split(
                                ","
                            );
                    l < 9;

                )
                    (e = i[h[l++]])
                        ? (o(e.prototype, c, !0), o(e.prototype, f, !0))
                        : (s = !1);
                n.exports = {
                    ABV: a,
                    CONSTR: s,
                    TYPED: c,
                    VIEW: f,
                };
            },
            {
                124: 124,
                40: 40,
                42: 42,
            },
        ],
        124: [
            function (t, n, r) {
                var e = 0,
                    i = Math.random();
                n.exports = function (t) {
                    return "Symbol(".concat(
                        void 0 === t ? "" : t,
                        ")_",
                        (++e + i).toString(36)
                    );
                };
            },
            {},
        ],
        125: [
            function (t, n, r) {
                var e = t(51);
                n.exports = function (t, n) {
                    if (!e(t) || t._t !== n)
                        throw TypeError(
                            "Incompatible receiver, " + n + " required!"
                        );
                    return t;
                };
            },
            {
                51: 51,
            },
        ],
        126: [
            function (t, n, r) {
                var e = t(40),
                    i = t(23),
                    o = t(60),
                    u = t(127),
                    c = t(72).f;
                n.exports = function (t) {
                    var n = i.Symbol || (i.Symbol = o ? {} : e.Symbol || {});
                    "_" == t.charAt(0) ||
                        t in n ||
                        c(n, t, {
                            value: u.f(t),
                        });
                };
            },
            {
                127: 127,
                23: 23,
                40: 40,
                60: 60,
                72: 72,
            },
        ],
        127: [
            function (t, n, r) {
                r.f = t(128);
            },
            {
                128: 128,
            },
        ],
        128: [
            function (t, n, r) {
                var e = t(103)("wks"),
                    i = t(124),
                    o = t(40).Symbol,
                    u = "function" == typeof o;
                (n.exports = function (t) {
                    return (
                        e[t] ||
                        (e[t] = (u && o[t]) || (u ? o : i)("Symbol." + t))
                    );
                }).store = e;
            },
            {
                103: 103,
                124: 124,
                40: 40,
            },
        ],
        129: [
            function (t, n, r) {
                var e = t(17),
                    i = t(128)("iterator"),
                    o = t(58);
                n.exports = t(23).getIteratorMethod = function (t) {
                    if (void 0 != t) return t[i] || t["@@iterator"] || o[e(t)];
                };
            },
            {
                128: 128,
                17: 17,
                23: 23,
                58: 58,
            },
        ],
        130: [
            function (t, n, r) {
                var e = t(33),
                    i = t(95)(/[\\^$*+?.()|[\]{}]/g, "\\$&");
                e(e.S, "RegExp", {
                    escape: function (t) {
                        return i(t);
                    },
                });
            },
            {
                33: 33,
                95: 95,
            },
        ],
        131: [
            function (t, n, r) {
                var e = t(33);
                e(e.P, "Array", {
                    copyWithin: t(8),
                }),
                    t(5)("copyWithin");
            },
            {
                33: 33,
                5: 5,
                8: 8,
            },
        ],
        132: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(12)(4);
                e(e.P + e.F * !t(105)([].every, !0), "Array", {
                    every: function (t) {
                        return i(this, t, arguments[1]);
                    },
                });
            },
            {
                105: 105,
                12: 12,
                33: 33,
            },
        ],
        133: [
            function (t, n, r) {
                var e = t(33);
                e(e.P, "Array", {
                    fill: t(9),
                }),
                    t(5)("fill");
            },
            {
                33: 33,
                5: 5,
                9: 9,
            },
        ],
        134: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(12)(2);
                e(e.P + e.F * !t(105)([].filter, !0), "Array", {
                    filter: function (t) {
                        return i(this, t, arguments[1]);
                    },
                });
            },
            {
                105: 105,
                12: 12,
                33: 33,
            },
        ],
        135: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(12)(6),
                    o = "findIndex",
                    u = !0;
                o in [] &&
                    Array(1)[o](function () {
                        u = !1;
                    }),
                    e(e.P + e.F * u, "Array", {
                        findIndex: function (t) {
                            return i(
                                this,
                                t,
                                arguments.length > 1 ? arguments[1] : void 0
                            );
                        },
                    }),
                    t(5)(o);
            },
            {
                12: 12,
                33: 33,
                5: 5,
            },
        ],
        136: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(12)(5),
                    o = !0;
                "find" in [] &&
                    Array(1).find(function () {
                        o = !1;
                    }),
                    e(e.P + e.F * o, "Array", {
                        find: function (t) {
                            return i(
                                this,
                                t,
                                arguments.length > 1 ? arguments[1] : void 0
                            );
                        },
                    }),
                    t(5)("find");
            },
            {
                12: 12,
                33: 33,
                5: 5,
            },
        ],
        137: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(12)(0),
                    o = t(105)([].forEach, !0);
                e(e.P + e.F * !o, "Array", {
                    forEach: function (t) {
                        return i(this, t, arguments[1]);
                    },
                });
            },
            {
                105: 105,
                12: 12,
                33: 33,
            },
        ],
        138: [
            function (t, n, r) {
                "use strict";
                var e = t(25),
                    i = t(33),
                    o = t(119),
                    u = t(53),
                    c = t(48),
                    f = t(118),
                    a = t(24),
                    s = t(129);
                i(
                    i.S +
                        i.F *
                            !t(56)(function (t) {
                                Array.from(t);
                            }),
                    "Array",
                    {
                        from: function (t) {
                            var n,
                                r,
                                i,
                                l,
                                h = o(t),
                                v = "function" == typeof this ? this : Array,
                                p = arguments.length,
                                y = p > 1 ? arguments[1] : void 0,
                                d = void 0 !== y,
                                g = 0,
                                m = s(h);
                            if (
                                (d &&
                                    (y = e(
                                        y,
                                        p > 2 ? arguments[2] : void 0,
                                        2
                                    )),
                                void 0 == m || (v == Array && c(m)))
                            )
                                for (n = f(h.length), r = new v(n); n > g; g++)
                                    a(r, g, d ? y(h[g], g) : h[g]);
                            else
                                for (
                                    l = m.call(h), r = new v();
                                    !(i = l.next()).done;
                                    g++
                                )
                                    a(
                                        r,
                                        g,
                                        d ? u(l, y, [i.value, g], !0) : i.value
                                    );
                            return (r.length = g), r;
                        },
                    }
                );
            },
            {
                118: 118,
                119: 119,
                129: 129,
                24: 24,
                25: 25,
                33: 33,
                48: 48,
                53: 53,
                56: 56,
            },
        ],
        139: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(11)(!1),
                    o = [].indexOf,
                    u = !!o && 1 / [1].indexOf(1, -0) < 0;
                e(e.P + e.F * (u || !t(105)(o)), "Array", {
                    indexOf: function (t) {
                        return u
                            ? o.apply(this, arguments) || 0
                            : i(this, t, arguments[1]);
                    },
                });
            },
            {
                105: 105,
                11: 11,
                33: 33,
            },
        ],
        140: [
            function (t, n, r) {
                var e = t(33);
                e(e.S, "Array", {
                    isArray: t(49),
                });
            },
            {
                33: 33,
                49: 49,
            },
        ],
        141: [
            function (t, n, r) {
                "use strict";
                var e = t(5),
                    i = t(57),
                    o = t(58),
                    u = t(117);
                (n.exports = t(55)(
                    Array,
                    "Array",
                    function (t, n) {
                        (this._t = u(t)), (this._i = 0), (this._k = n);
                    },
                    function () {
                        var t = this._t,
                            n = this._k,
                            r = this._i++;
                        return !t || r >= t.length
                            ? ((this._t = void 0), i(1))
                            : "keys" == n
                            ? i(0, r)
                            : "values" == n
                            ? i(0, t[r])
                            : i(0, [r, t[r]]);
                    },
                    "values"
                )),
                    (o.Arguments = o.Array),
                    e("keys"),
                    e("values"),
                    e("entries");
            },
            {
                117: 117,
                5: 5,
                55: 55,
                57: 57,
                58: 58,
            },
        ],
        142: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(117),
                    o = [].join;
                e(e.P + e.F * (t(47) != Object || !t(105)(o)), "Array", {
                    join: function (t) {
                        return o.call(i(this), void 0 === t ? "," : t);
                    },
                });
            },
            {
                105: 105,
                117: 117,
                33: 33,
                47: 47,
            },
        ],
        143: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(117),
                    o = t(116),
                    u = t(118),
                    c = [].lastIndexOf,
                    f = !!c && 1 / [1].lastIndexOf(1, -0) < 0;
                e(e.P + e.F * (f || !t(105)(c)), "Array", {
                    lastIndexOf: function (t) {
                        if (f) return c.apply(this, arguments) || 0;
                        var n = i(this),
                            r = u(n.length),
                            e = r - 1;
                        for (
                            arguments.length > 1 &&
                                (e = Math.min(e, o(arguments[1]))),
                                e < 0 && (e = r + e);
                            e >= 0;
                            e--
                        )
                            if (e in n && n[e] === t) return e || 0;
                        return -1;
                    },
                });
            },
            {
                105: 105,
                116: 116,
                117: 117,
                118: 118,
                33: 33,
            },
        ],
        144: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(12)(1);
                e(e.P + e.F * !t(105)([].map, !0), "Array", {
                    map: function (t) {
                        return i(this, t, arguments[1]);
                    },
                });
            },
            {
                105: 105,
                12: 12,
                33: 33,
            },
        ],
        145: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(24);
                e(
                    e.S +
                        e.F *
                            t(35)(function () {
                                function t() {}
                                return !(Array.of.call(t) instanceof t);
                            }),
                    "Array",
                    {
                        of: function () {
                            for (
                                var t = 0,
                                    n = arguments.length,
                                    r = new (
                                        "function" == typeof this ? this : Array
                                    )(n);
                                n > t;

                            )
                                i(r, t, arguments[t++]);
                            return (r.length = n), r;
                        },
                    }
                );
            },
            {
                24: 24,
                33: 33,
                35: 35,
            },
        ],
        146: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(13);
                e(e.P + e.F * !t(105)([].reduceRight, !0), "Array", {
                    reduceRight: function (t) {
                        return i(this, t, arguments.length, arguments[1], !0);
                    },
                });
            },
            {
                105: 105,
                13: 13,
                33: 33,
            },
        ],
        147: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(13);
                e(e.P + e.F * !t(105)([].reduce, !0), "Array", {
                    reduce: function (t) {
                        return i(this, t, arguments.length, arguments[1], !1);
                    },
                });
            },
            {
                105: 105,
                13: 13,
                33: 33,
            },
        ],
        148: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(43),
                    o = t(18),
                    u = t(114),
                    c = t(118),
                    f = [].slice;
                e(
                    e.P +
                        e.F *
                            t(35)(function () {
                                i && f.call(i);
                            }),
                    "Array",
                    {
                        slice: function (t, n) {
                            var r = c(this.length),
                                e = o(this);
                            if (((n = void 0 === n ? r : n), "Array" == e))
                                return f.call(this, t, n);
                            for (
                                var i = u(t, r),
                                    a = u(n, r),
                                    s = c(a - i),
                                    l = Array(s),
                                    h = 0;
                                h < s;
                                h++
                            )
                                l[h] =
                                    "String" == e
                                        ? this.charAt(i + h)
                                        : this[i + h];
                            return l;
                        },
                    }
                );
            },
            {
                114: 114,
                118: 118,
                18: 18,
                33: 33,
                35: 35,
                43: 43,
            },
        ],
        149: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(12)(3);
                e(e.P + e.F * !t(105)([].some, !0), "Array", {
                    some: function (t) {
                        return i(this, t, arguments[1]);
                    },
                });
            },
            {
                105: 105,
                12: 12,
                33: 33,
            },
        ],
        150: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(3),
                    o = t(119),
                    u = t(35),
                    c = [].sort,
                    f = [1, 2, 3];
                e(
                    e.P +
                        e.F *
                            (u(function () {
                                f.sort(void 0);
                            }) ||
                                !u(function () {
                                    f.sort(null);
                                }) ||
                                !t(105)(c)),
                    "Array",
                    {
                        sort: function (t) {
                            return void 0 === t
                                ? c.call(o(this))
                                : c.call(o(this), i(t));
                        },
                    }
                );
            },
            {
                105: 105,
                119: 119,
                3: 3,
                33: 33,
                35: 35,
            },
        ],
        151: [
            function (t, n, r) {
                t(100)("Array");
            },
            {
                100: 100,
            },
        ],
        152: [
            function (t, n, r) {
                var e = t(33);
                e(e.S, "Date", {
                    now: function () {
                        return new Date().getTime();
                    },
                });
            },
            {
                33: 33,
            },
        ],
        153: [
            function (t, n, r) {
                var e = t(33),
                    i = t(26);
                e(e.P + e.F * (Date.prototype.toISOString !== i), "Date", {
                    toISOString: i,
                });
            },
            {
                26: 26,
                33: 33,
            },
        ],
        154: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(119),
                    o = t(120);
                e(
                    e.P +
                        e.F *
                            t(35)(function () {
                                return (
                                    null !== new Date(NaN).toJSON() ||
                                    1 !==
                                        Date.prototype.toJSON.call({
                                            toISOString: function () {
                                                return 1;
                                            },
                                        })
                                );
                            }),
                    "Date",
                    {
                        toJSON: function (t) {
                            var n = i(this),
                                r = o(n);
                            return "number" != typeof r || isFinite(r)
                                ? n.toISOString()
                                : null;
                        },
                    }
                );
            },
            {
                119: 119,
                120: 120,
                33: 33,
                35: 35,
            },
        ],
        155: [
            function (t, n, r) {
                var e = t(128)("toPrimitive"),
                    i = Date.prototype;
                e in i || t(42)(i, e, t(27));
            },
            {
                128: 128,
                27: 27,
                42: 42,
            },
        ],
        156: [
            function (t, n, r) {
                var e = Date.prototype,
                    i = e.toString,
                    o = e.getTime;
                new Date(NaN) + "" != "Invalid Date" &&
                    t(94)(e, "toString", function () {
                        var t = o.call(this);
                        return t === t ? i.call(this) : "Invalid Date";
                    });
            },
            {
                94: 94,
            },
        ],
        157: [
            function (t, n, r) {
                var e = t(33);
                e(e.P, "Function", {
                    bind: t(16),
                });
            },
            {
                16: 16,
                33: 33,
            },
        ],
        158: [
            function (t, n, r) {
                "use strict";
                var e = t(51),
                    i = t(79),
                    o = t(128)("hasInstance"),
                    u = Function.prototype;
                o in u ||
                    t(72).f(u, o, {
                        value: function (t) {
                            if ("function" != typeof this || !e(t)) return !1;
                            if (!e(this.prototype)) return t instanceof this;
                            for (; (t = i(t)); )
                                if (this.prototype === t) return !0;
                            return !1;
                        },
                    });
            },
            {
                128: 128,
                51: 51,
                72: 72,
                79: 79,
            },
        ],
        159: [
            function (t, n, r) {
                var e = t(72).f,
                    i = Function.prototype,
                    o = /^\s*function ([^ (]*)/;
                "name" in i ||
                    (t(29) &&
                        e(i, "name", {
                            configurable: !0,
                            get: function () {
                                try {
                                    return ("" + this).match(o)[1];
                                } catch (t) {
                                    return "";
                                }
                            },
                        }));
            },
            {
                29: 29,
                72: 72,
            },
        ],
        160: [
            function (t, n, r) {
                "use strict";
                var e = t(19),
                    i = t(125);
                n.exports = t(22)(
                    "Map",
                    function (t) {
                        return function () {
                            return t(
                                this,
                                arguments.length > 0 ? arguments[0] : void 0
                            );
                        };
                    },
                    {
                        get: function (t) {
                            var n = e.getEntry(i(this, "Map"), t);
                            return n && n.v;
                        },
                        set: function (t, n) {
                            return e.def(i(this, "Map"), 0 === t ? 0 : t, n);
                        },
                    },
                    e,
                    !0
                );
            },
            {
                125: 125,
                19: 19,
                22: 22,
            },
        ],
        161: [
            function (t, n, r) {
                var e = t(33),
                    i = t(63),
                    o = Math.sqrt,
                    u = Math.acosh;
                e(
                    e.S +
                        e.F *
                            !(
                                u &&
                                710 == Math.floor(u(Number.MAX_VALUE)) &&
                                u(1 / 0) == 1 / 0
                            ),
                    "Math",
                    {
                        acosh: function (t) {
                            return (t = +t) < 1
                                ? NaN
                                : t > 94906265.62425156
                                ? Math.log(t) + Math.LN2
                                : i(t - 1 + o(t - 1) * o(t + 1));
                        },
                    }
                );
            },
            {
                33: 33,
                63: 63,
            },
        ],
        162: [
            function (t, n, r) {
                function e(t) {
                    return isFinite((t = +t)) && 0 != t
                        ? t < 0
                            ? -e(-t)
                            : Math.log(t + Math.sqrt(t * t + 1))
                        : t;
                }
                var i = t(33),
                    o = Math.asinh;
                i(i.S + i.F * !(o && 1 / o(0) > 0), "Math", {
                    asinh: e,
                });
            },
            {
                33: 33,
            },
        ],
        163: [
            function (t, n, r) {
                var e = t(33),
                    i = Math.atanh;
                e(e.S + e.F * !(i && 1 / i(-0) < 0), "Math", {
                    atanh: function (t) {
                        return 0 == (t = +t)
                            ? t
                            : Math.log((1 + t) / (1 - t)) / 2;
                    },
                });
            },
            {
                33: 33,
            },
        ],
        164: [
            function (t, n, r) {
                var e = t(33),
                    i = t(65);
                e(e.S, "Math", {
                    cbrt: function (t) {
                        return i((t = +t)) * Math.pow(Math.abs(t), 1 / 3);
                    },
                });
            },
            {
                33: 33,
                65: 65,
            },
        ],
        165: [
            function (t, n, r) {
                var e = t(33);
                e(e.S, "Math", {
                    clz32: function (t) {
                        return (t >>>= 0)
                            ? 31 - Math.floor(Math.log(t + 0.5) * Math.LOG2E)
                            : 32;
                    },
                });
            },
            {
                33: 33,
            },
        ],
        166: [
            function (t, n, r) {
                var e = t(33),
                    i = Math.exp;
                e(e.S, "Math", {
                    cosh: function (t) {
                        return (i((t = +t)) + i(-t)) / 2;
                    },
                });
            },
            {
                33: 33,
            },
        ],
        167: [
            function (t, n, r) {
                var e = t(33),
                    i = t(61);
                e(e.S + e.F * (i != Math.expm1), "Math", {
                    expm1: i,
                });
            },
            {
                33: 33,
                61: 61,
            },
        ],
        168: [
            function (t, n, r) {
                var e = t(33);
                e(e.S, "Math", {
                    fround: t(62),
                });
            },
            {
                33: 33,
                62: 62,
            },
        ],
        169: [
            function (t, n, r) {
                var e = t(33),
                    i = Math.abs;
                e(e.S, "Math", {
                    hypot: function (t, n) {
                        for (
                            var r, e, o = 0, u = 0, c = arguments.length, f = 0;
                            u < c;

                        )
                            (r = i(arguments[u++])),
                                f < r
                                    ? ((e = f / r),
                                      (o = o * e * e + 1),
                                      (f = r))
                                    : r > 0
                                    ? ((e = r / f), (o += e * e))
                                    : (o += r);
                        return f === 1 / 0 ? 1 / 0 : f * Math.sqrt(o);
                    },
                });
            },
            {
                33: 33,
            },
        ],
        170: [
            function (t, n, r) {
                var e = t(33),
                    i = Math.imul;
                e(
                    e.S +
                        e.F *
                            t(35)(function () {
                                return -5 != i(4294967295, 5) || 2 != i.length;
                            }),
                    "Math",
                    {
                        imul: function (t, n) {
                            var r = +t,
                                e = +n,
                                i = 65535 & r,
                                o = 65535 & e;
                            return (
                                0 |
                                (i * o +
                                    ((((65535 & (r >>> 16)) * o +
                                        i * (65535 & (e >>> 16))) <<
                                        16) >>>
                                        0))
                            );
                        },
                    }
                );
            },
            {
                33: 33,
                35: 35,
            },
        ],
        171: [
            function (t, n, r) {
                var e = t(33);
                e(e.S, "Math", {
                    log10: function (t) {
                        return Math.log(t) * Math.LOG10E;
                    },
                });
            },
            {
                33: 33,
            },
        ],
        172: [
            function (t, n, r) {
                var e = t(33);
                e(e.S, "Math", {
                    log1p: t(63),
                });
            },
            {
                33: 33,
                63: 63,
            },
        ],
        173: [
            function (t, n, r) {
                var e = t(33);
                e(e.S, "Math", {
                    log2: function (t) {
                        return Math.log(t) / Math.LN2;
                    },
                });
            },
            {
                33: 33,
            },
        ],
        174: [
            function (t, n, r) {
                var e = t(33);
                e(e.S, "Math", {
                    sign: t(65),
                });
            },
            {
                33: 33,
                65: 65,
            },
        ],
        175: [
            function (t, n, r) {
                var e = t(33),
                    i = t(61),
                    o = Math.exp;
                e(
                    e.S +
                        e.F *
                            t(35)(function () {
                                return -2e-17 != !Math.sinh(-2e-17);
                            }),
                    "Math",
                    {
                        sinh: function (t) {
                            return Math.abs((t = +t)) < 1
                                ? (i(t) - i(-t)) / 2
                                : (o(t - 1) - o(-t - 1)) * (Math.E / 2);
                        },
                    }
                );
            },
            {
                33: 33,
                35: 35,
                61: 61,
            },
        ],
        176: [
            function (t, n, r) {
                var e = t(33),
                    i = t(61),
                    o = Math.exp;
                e(e.S, "Math", {
                    tanh: function (t) {
                        var n = i((t = +t)),
                            r = i(-t);
                        return n == 1 / 0
                            ? 1
                            : r == 1 / 0
                            ? -1
                            : (n - r) / (o(t) + o(-t));
                    },
                });
            },
            {
                33: 33,
                61: 61,
            },
        ],
        177: [
            function (t, n, r) {
                var e = t(33);
                e(e.S, "Math", {
                    trunc: function (t) {
                        return (t > 0 ? Math.floor : Math.ceil)(t);
                    },
                });
            },
            {
                33: 33,
            },
        ],
        178: [
            function (t, n, r) {
                "use strict";
                var e = t(40),
                    i = t(41),
                    o = t(18),
                    u = t(45),
                    c = t(120),
                    f = t(35),
                    a = t(77).f,
                    s = t(75).f,
                    l = t(72).f,
                    h = t(111).trim,
                    v = e.Number,
                    p = v,
                    y = v.prototype,
                    d = "Number" == o(t(71)(y)),
                    g = "trim" in String.prototype,
                    m = function (t) {
                        var n = c(t, !1);
                        if ("string" == typeof n && n.length > 2) {
                            n = g ? n.trim() : h(n, 3);
                            var r,
                                e,
                                i,
                                o = n.charCodeAt(0);
                            if (43 === o || 45 === o) {
                                if (88 === (r = n.charCodeAt(2)) || 120 === r)
                                    return NaN;
                            } else if (48 === o) {
                                switch (n.charCodeAt(1)) {
                                    case 66:
                                    case 98:
                                        (e = 2), (i = 49);
                                        break;
                                    case 79:
                                    case 111:
                                        (e = 8), (i = 55);
                                        break;
                                    default:
                                        return +n;
                                }
                                for (
                                    var u, f = n.slice(2), a = 0, s = f.length;
                                    a < s;
                                    a++
                                )
                                    if ((u = f.charCodeAt(a)) < 48 || u > i)
                                        return NaN;
                                return parseInt(f, e);
                            }
                        }
                        return +n;
                    };
                if (!v(" 0o1") || !v("0b1") || v("+0x1")) {
                    v = function (t) {
                        var n = arguments.length < 1 ? 0 : t,
                            r = this;
                        return r instanceof v &&
                            (d
                                ? f(function () {
                                      y.valueOf.call(r);
                                  })
                                : "Number" != o(r))
                            ? u(new p(m(n)), r, v)
                            : m(n);
                    };
                    for (
                        var b,
                            S = t(29)
                                ? a(p)
                                : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(
                                      ","
                                  ),
                            w = 0;
                        S.length > w;
                        w++
                    )
                        i(p, (b = S[w])) && !i(v, b) && l(v, b, s(p, b));
                    (v.prototype = y),
                        (y.constructor = v),
                        t(94)(e, "Number", v);
                }
            },
            {
                111: 111,
                120: 120,
                18: 18,
                29: 29,
                35: 35,
                40: 40,
                41: 41,
                45: 45,
                71: 71,
                72: 72,
                75: 75,
                77: 77,
                94: 94,
            },
        ],
        179: [
            function (t, n, r) {
                var e = t(33);
                e(e.S, "Number", {
                    EPSILON: Math.pow(2, -52),
                });
            },
            {
                33: 33,
            },
        ],
        180: [
            function (t, n, r) {
                var e = t(33),
                    i = t(40).isFinite;
                e(e.S, "Number", {
                    isFinite: function (t) {
                        return "number" == typeof t && i(t);
                    },
                });
            },
            {
                33: 33,
                40: 40,
            },
        ],
        181: [
            function (t, n, r) {
                var e = t(33);
                e(e.S, "Number", {
                    isInteger: t(50),
                });
            },
            {
                33: 33,
                50: 50,
            },
        ],
        182: [
            function (t, n, r) {
                var e = t(33);
                e(e.S, "Number", {
                    isNaN: function (t) {
                        return t != t;
                    },
                });
            },
            {
                33: 33,
            },
        ],
        183: [
            function (t, n, r) {
                var e = t(33),
                    i = t(50),
                    o = Math.abs;
                e(e.S, "Number", {
                    isSafeInteger: function (t) {
                        return i(t) && o(t) <= 9007199254740991;
                    },
                });
            },
            {
                33: 33,
                50: 50,
            },
        ],
        184: [
            function (t, n, r) {
                var e = t(33);
                e(e.S, "Number", {
                    MAX_SAFE_INTEGER: 9007199254740991,
                });
            },
            {
                33: 33,
            },
        ],
        185: [
            function (t, n, r) {
                var e = t(33);
                e(e.S, "Number", {
                    MIN_SAFE_INTEGER: -9007199254740991,
                });
            },
            {
                33: 33,
            },
        ],
        186: [
            function (t, n, r) {
                var e = t(33),
                    i = t(86);
                e(e.S + e.F * (Number.parseFloat != i), "Number", {
                    parseFloat: i,
                });
            },
            {
                33: 33,
                86: 86,
            },
        ],
        187: [
            function (t, n, r) {
                var e = t(33),
                    i = t(87);
                e(e.S + e.F * (Number.parseInt != i), "Number", {
                    parseInt: i,
                });
            },
            {
                33: 33,
                87: 87,
            },
        ],
        188: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(116),
                    o = t(4),
                    u = t(110),
                    c = (1).toFixed,
                    f = Math.floor,
                    a = [0, 0, 0, 0, 0, 0],
                    s = "Number.toFixed: incorrect invocation!",
                    l = function (t, n) {
                        for (var r = -1, e = n; ++r < 6; )
                            (e += t * a[r]), (a[r] = e % 1e7), (e = f(e / 1e7));
                    },
                    h = function (t) {
                        for (var n = 6, r = 0; --n >= 0; )
                            (r += a[n]), (a[n] = f(r / t)), (r = (r % t) * 1e7);
                    },
                    v = function () {
                        for (var t = 6, n = ""; --t >= 0; )
                            if ("" !== n || 0 === t || 0 !== a[t]) {
                                var r = String(a[t]);
                                n =
                                    "" === n
                                        ? r
                                        : n + u.call("0", 7 - r.length) + r;
                            }
                        return n;
                    },
                    p = function (t, n, r) {
                        return 0 === n
                            ? r
                            : n % 2 == 1
                            ? p(t, n - 1, r * t)
                            : p(t * t, n / 2, r);
                    },
                    y = function (t) {
                        for (var n = 0, r = t; r >= 4096; )
                            (n += 12), (r /= 4096);
                        for (; r >= 2; ) (n += 1), (r /= 2);
                        return n;
                    };
                e(
                    e.P +
                        e.F *
                            ((!!c &&
                                ("0.000" !== (8e-5).toFixed(3) ||
                                    "1" !== (0.9).toFixed(0) ||
                                    "1.25" !== (1.255).toFixed(2) ||
                                    "1000000000000000128" !==
                                        (0xde0b6b3a7640080).toFixed(0))) ||
                                !t(35)(function () {
                                    c.call({});
                                })),
                    "Number",
                    {
                        toFixed: function (t) {
                            var n,
                                r,
                                e,
                                c,
                                f = o(this, s),
                                a = i(t),
                                d = "",
                                g = "0";
                            if (a < 0 || a > 20) throw RangeError(s);
                            if (f != f) return "NaN";
                            if (f <= -1e21 || f >= 1e21) return String(f);
                            if ((f < 0 && ((d = "-"), (f = -f)), f > 1e-21))
                                if (
                                    ((n = y(f * p(2, 69, 1)) - 69),
                                    (r =
                                        n < 0
                                            ? f * p(2, -n, 1)
                                            : f / p(2, n, 1)),
                                    (r *= 4503599627370496),
                                    (n = 52 - n) > 0)
                                ) {
                                    for (l(0, r), e = a; e >= 7; )
                                        l(1e7, 0), (e -= 7);
                                    for (
                                        l(p(10, e, 1), 0), e = n - 1;
                                        e >= 23;

                                    )
                                        h(1 << 23), (e -= 23);
                                    h(1 << e), l(1, 1), h(2), (g = v());
                                } else
                                    l(0, r),
                                        l(1 << -n, 0),
                                        (g = v() + u.call("0", a));
                            return (
                                a > 0
                                    ? ((c = g.length),
                                      (g =
                                          d +
                                          (c <= a
                                              ? "0." + u.call("0", a - c) + g
                                              : g.slice(0, c - a) +
                                                "." +
                                                g.slice(c - a))))
                                    : (g = d + g),
                                g
                            );
                        },
                    }
                );
            },
            {
                110: 110,
                116: 116,
                33: 33,
                35: 35,
                4: 4,
            },
        ],
        189: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(35),
                    o = t(4),
                    u = (1).toPrecision;
                e(
                    e.P +
                        e.F *
                            (i(function () {
                                return "1" !== u.call(1, void 0);
                            }) ||
                                !i(function () {
                                    u.call({});
                                })),
                    "Number",
                    {
                        toPrecision: function (t) {
                            var n = o(
                                this,
                                "Number#toPrecision: incorrect invocation!"
                            );
                            return void 0 === t ? u.call(n) : u.call(n, t);
                        },
                    }
                );
            },
            {
                33: 33,
                35: 35,
                4: 4,
            },
        ],
        190: [
            function (t, n, r) {
                var e = t(33);
                e(e.S + e.F, "Object", {
                    assign: t(70),
                });
            },
            {
                33: 33,
                70: 70,
            },
        ],
        191: [
            function (t, n, r) {
                var e = t(33);
                e(e.S, "Object", {
                    create: t(71),
                });
            },
            {
                33: 33,
                71: 71,
            },
        ],
        192: [
            function (t, n, r) {
                var e = t(33);
                e(e.S + e.F * !t(29), "Object", {
                    defineProperties: t(73),
                });
            },
            {
                29: 29,
                33: 33,
                73: 73,
            },
        ],
        193: [
            function (t, n, r) {
                var e = t(33);
                e(e.S + e.F * !t(29), "Object", {
                    defineProperty: t(72).f,
                });
            },
            {
                29: 29,
                33: 33,
                72: 72,
            },
        ],
        194: [
            function (t, n, r) {
                var e = t(51),
                    i = t(66).onFreeze;
                t(83)("freeze", function (t) {
                    return function (n) {
                        return t && e(n) ? t(i(n)) : n;
                    };
                });
            },
            {
                51: 51,
                66: 66,
                83: 83,
            },
        ],
        195: [
            function (t, n, r) {
                var e = t(117),
                    i = t(75).f;
                t(83)("getOwnPropertyDescriptor", function () {
                    return function (t, n) {
                        return i(e(t), n);
                    };
                });
            },
            {
                117: 117,
                75: 75,
                83: 83,
            },
        ],
        196: [
            function (t, n, r) {
                t(83)("getOwnPropertyNames", function () {
                    return t(76).f;
                });
            },
            {
                76: 76,
                83: 83,
            },
        ],
        197: [
            function (t, n, r) {
                var e = t(119),
                    i = t(79);
                t(83)("getPrototypeOf", function () {
                    return function (t) {
                        return i(e(t));
                    };
                });
            },
            {
                119: 119,
                79: 79,
                83: 83,
            },
        ],
        198: [
            function (t, n, r) {
                var e = t(51);
                t(83)("isExtensible", function (t) {
                    return function (n) {
                        return !!e(n) && (!t || t(n));
                    };
                });
            },
            {
                51: 51,
                83: 83,
            },
        ],
        199: [
            function (t, n, r) {
                var e = t(51);
                t(83)("isFrozen", function (t) {
                    return function (n) {
                        return !e(n) || (!!t && t(n));
                    };
                });
            },
            {
                51: 51,
                83: 83,
            },
        ],
        200: [
            function (t, n, r) {
                var e = t(51);
                t(83)("isSealed", function (t) {
                    return function (n) {
                        return !e(n) || (!!t && t(n));
                    };
                });
            },
            {
                51: 51,
                83: 83,
            },
        ],
        201: [
            function (t, n, r) {
                var e = t(33);
                e(e.S, "Object", {
                    is: t(96),
                });
            },
            {
                33: 33,
                96: 96,
            },
        ],
        202: [
            function (t, n, r) {
                var e = t(119),
                    i = t(81);
                t(83)("keys", function () {
                    return function (t) {
                        return i(e(t));
                    };
                });
            },
            {
                119: 119,
                81: 81,
                83: 83,
            },
        ],
        203: [
            function (t, n, r) {
                var e = t(51),
                    i = t(66).onFreeze;
                t(83)("preventExtensions", function (t) {
                    return function (n) {
                        return t && e(n) ? t(i(n)) : n;
                    };
                });
            },
            {
                51: 51,
                66: 66,
                83: 83,
            },
        ],
        204: [
            function (t, n, r) {
                var e = t(51),
                    i = t(66).onFreeze;
                t(83)("seal", function (t) {
                    return function (n) {
                        return t && e(n) ? t(i(n)) : n;
                    };
                });
            },
            {
                51: 51,
                66: 66,
                83: 83,
            },
        ],
        205: [
            function (t, n, r) {
                var e = t(33);
                e(e.S, "Object", {
                    setPrototypeOf: t(99).set,
                });
            },
            {
                33: 33,
                99: 99,
            },
        ],
        206: [
            function (t, n, r) {
                "use strict";
                var e = t(17),
                    i = {};
                (i[t(128)("toStringTag")] = "z"),
                    i + "" != "[object z]" &&
                        t(94)(
                            Object.prototype,
                            "toString",
                            function () {
                                return "[object " + e(this) + "]";
                            },
                            !0
                        );
            },
            {
                128: 128,
                17: 17,
                94: 94,
            },
        ],
        207: [
            function (t, n, r) {
                var e = t(33),
                    i = t(86);
                e(e.G + e.F * (parseFloat != i), {
                    parseFloat: i,
                });
            },
            {
                33: 33,
                86: 86,
            },
        ],
        208: [
            function (t, n, r) {
                var e = t(33),
                    i = t(87);
                e(e.G + e.F * (parseInt != i), {
                    parseInt: i,
                });
            },
            {
                33: 33,
                87: 87,
            },
        ],
        209: [
            function (t, n, r) {
                "use strict";
                var e,
                    i,
                    o,
                    u,
                    c = t(60),
                    f = t(40),
                    a = t(25),
                    s = t(17),
                    l = t(33),
                    h = t(51),
                    v = t(3),
                    p = t(6),
                    y = t(39),
                    d = t(104),
                    g = t(113).set,
                    m = t(68)(),
                    b = t(69),
                    S = t(90),
                    w = t(91),
                    x = f.TypeError,
                    _ = f.process,
                    E = f.Promise,
                    O = "process" == s(_),
                    M = function () {},
                    P = (i = b.f),
                    F = !!(function () {
                        try {
                            var n = E.resolve(1),
                                r = ((n.constructor = {})[t(128)("species")] =
                                    function (t) {
                                        t(M, M);
                                    });
                            return (
                                (O ||
                                    "function" ==
                                        typeof PromiseRejectionEvent) &&
                                n.then(M) instanceof r
                            );
                        } catch (t) {}
                    })(),
                    A = c
                        ? function (t, n) {
                              return t === n || (t === E && n === u);
                          }
                        : function (t, n) {
                              return t === n;
                          },
                    j = function (t) {
                        var n;
                        return (
                            !(!h(t) || "function" != typeof (n = t.then)) && n
                        );
                    },
                    N = function (t, n) {
                        if (!t._n) {
                            t._n = !0;
                            var r = t._c;
                            m(function () {
                                for (
                                    var e = t._v, i = 1 == t._s, o = 0;
                                    r.length > o;

                                )
                                    !(function (n) {
                                        var r,
                                            o,
                                            u = i ? n.ok : n.fail,
                                            c = n.resolve,
                                            f = n.reject,
                                            a = n.domain;
                                        try {
                                            u
                                                ? (i ||
                                                      (2 == t._h && L(t),
                                                      (t._h = 1)),
                                                  !0 === u
                                                      ? (r = e)
                                                      : (a && a.enter(),
                                                        (r = u(e)),
                                                        a && a.exit()),
                                                  r === n.promise
                                                      ? f(
                                                            x(
                                                                "Promise-chain cycle"
                                                            )
                                                        )
                                                      : (o = j(r))
                                                      ? o.call(r, c, f)
                                                      : c(r))
                                                : f(e);
                                        } catch (t) {
                                            f(t);
                                        }
                                    })(r[o++]);
                                (t._c = []), (t._n = !1), n && !t._h && I(t);
                            });
                        }
                    },
                    I = function (t) {
                        g.call(f, function () {
                            var n,
                                r,
                                e,
                                i = t._v,
                                o = T(t);
                            if (
                                (o &&
                                    ((n = S(function () {
                                        O
                                            ? _.emit("unhandledRejection", i, t)
                                            : (r = f.onunhandledrejection)
                                            ? r({
                                                  promise: t,
                                                  reason: i,
                                              })
                                            : (e = f.console) &&
                                              e.error &&
                                              e.error(
                                                  "Unhandled promise rejection",
                                                  i
                                              );
                                    })),
                                    (t._h = O || T(t) ? 2 : 1)),
                                (t._a = void 0),
                                o && n.e)
                            )
                                throw n.v;
                        });
                    },
                    T = function (t) {
                        if (1 == t._h) return !1;
                        for (var n, r = t._a || t._c, e = 0; r.length > e; )
                            if (((n = r[e++]), n.fail || !T(n.promise)))
                                return !1;
                        return !0;
                    },
                    L = function (t) {
                        g.call(f, function () {
                            var n;
                            O
                                ? _.emit("rejectionHandled", t)
                                : (n = f.onrejectionhandled) &&
                                  n({
                                      promise: t,
                                      reason: t._v,
                                  });
                        });
                    },
                    R = function (t) {
                        var n = this;
                        n._d ||
                            ((n._d = !0),
                            (n = n._w || n),
                            (n._v = t),
                            (n._s = 2),
                            n._a || (n._a = n._c.slice()),
                            N(n, !0));
                    },
                    k = function (t) {
                        var n,
                            r = this;
                        if (!r._d) {
                            (r._d = !0), (r = r._w || r);
                            try {
                                if (r === t)
                                    throw x("Promise can't be resolved itself");
                                (n = j(t))
                                    ? m(function () {
                                          var e = {
                                              _w: r,
                                              _d: !1,
                                          };
                                          try {
                                              n.call(t, a(k, e, 1), a(R, e, 1));
                                          } catch (t) {
                                              R.call(e, t);
                                          }
                                      })
                                    : ((r._v = t), (r._s = 1), N(r, !1));
                            } catch (t) {
                                R.call(
                                    {
                                        _w: r,
                                        _d: !1,
                                    },
                                    t
                                );
                            }
                        }
                    };
                F ||
                    ((E = function (t) {
                        p(this, E, "Promise", "_h"), v(t), e.call(this);
                        try {
                            t(a(k, this, 1), a(R, this, 1));
                        } catch (t) {
                            R.call(this, t);
                        }
                    }),
                    (e = function (t) {
                        (this._c = []),
                            (this._a = void 0),
                            (this._s = 0),
                            (this._d = !1),
                            (this._v = void 0),
                            (this._h = 0),
                            (this._n = !1);
                    }),
                    (e.prototype = t(93)(E.prototype, {
                        then: function (t, n) {
                            var r = P(d(this, E));
                            return (
                                (r.ok = "function" != typeof t || t),
                                (r.fail = "function" == typeof n && n),
                                (r.domain = O ? _.domain : void 0),
                                this._c.push(r),
                                this._a && this._a.push(r),
                                this._s && N(this, !1),
                                r.promise
                            );
                        },
                        catch: function (t) {
                            return this.then(void 0, t);
                        },
                    })),
                    (o = function () {
                        var t = new e();
                        (this.promise = t),
                            (this.resolve = a(k, t, 1)),
                            (this.reject = a(R, t, 1));
                    }),
                    (b.f = P =
                        function (t) {
                            return A(E, t) ? new o(t) : i(t);
                        })),
                    l(l.G + l.W + l.F * !F, {
                        Promise: E,
                    }),
                    t(101)(E, "Promise"),
                    t(100)("Promise"),
                    (u = t(23).Promise),
                    l(l.S + l.F * !F, "Promise", {
                        reject: function (t) {
                            var n = P(this);
                            return (0, n.reject)(t), n.promise;
                        },
                    }),
                    l(l.S + l.F * (c || !F), "Promise", {
                        resolve: function (t) {
                            return t instanceof E && A(t.constructor, this)
                                ? t
                                : w(this, t);
                        },
                    }),
                    l(
                        l.S +
                            l.F *
                                !(
                                    F &&
                                    t(56)(function (t) {
                                        E.all(t).catch(M);
                                    })
                                ),
                        "Promise",
                        {
                            all: function (t) {
                                var n = this,
                                    r = P(n),
                                    e = r.resolve,
                                    i = r.reject,
                                    o = S(function () {
                                        var r = [],
                                            o = 0,
                                            u = 1;
                                        y(t, !1, function (t) {
                                            var c = o++,
                                                f = !1;
                                            r.push(void 0),
                                                u++,
                                                n.resolve(t).then(function (t) {
                                                    f ||
                                                        ((f = !0),
                                                        (r[c] = t),
                                                        --u || e(r));
                                                }, i);
                                        }),
                                            --u || e(r);
                                    });
                                return o.e && i(o.v), r.promise;
                            },
                            race: function (t) {
                                var n = this,
                                    r = P(n),
                                    e = r.reject,
                                    i = S(function () {
                                        y(t, !1, function (t) {
                                            n.resolve(t).then(r.resolve, e);
                                        });
                                    });
                                return i.e && e(i.v), r.promise;
                            },
                        }
                    );
            },
            {
                100: 100,
                101: 101,
                104: 104,
                113: 113,
                128: 128,
                17: 17,
                23: 23,
                25: 25,
                3: 3,
                33: 33,
                39: 39,
                40: 40,
                51: 51,
                56: 56,
                6: 6,
                60: 60,
                68: 68,
                69: 69,
                90: 90,
                91: 91,
                93: 93,
            },
        ],
        210: [
            function (t, n, r) {
                var e = t(33),
                    i = t(3),
                    o = t(7),
                    u = (t(40).Reflect || {}).apply,
                    c = Function.apply;
                e(
                    e.S +
                        e.F *
                            !t(35)(function () {
                                u(function () {});
                            }),
                    "Reflect",
                    {
                        apply: function (t, n, r) {
                            var e = i(t),
                                f = o(r);
                            return u ? u(e, n, f) : c.call(e, n, f);
                        },
                    }
                );
            },
            {
                3: 3,
                33: 33,
                35: 35,
                40: 40,
                7: 7,
            },
        ],
        211: [
            function (t, n, r) {
                var e = t(33),
                    i = t(71),
                    o = t(3),
                    u = t(7),
                    c = t(51),
                    f = t(35),
                    a = t(16),
                    s = (t(40).Reflect || {}).construct,
                    l = f(function () {
                        function t() {}
                        return !(s(function () {}, [], t) instanceof t);
                    }),
                    h = !f(function () {
                        s(function () {});
                    });
                e(e.S + e.F * (l || h), "Reflect", {
                    construct: function (t, n) {
                        o(t), u(n);
                        var r = arguments.length < 3 ? t : o(arguments[2]);
                        if (h && !l) return s(t, n, r);
                        if (t == r) {
                            switch (n.length) {
                                case 0:
                                    return new t();
                                case 1:
                                    return new t(n[0]);
                                case 2:
                                    return new t(n[0], n[1]);
                                case 3:
                                    return new t(n[0], n[1], n[2]);
                                case 4:
                                    return new t(n[0], n[1], n[2], n[3]);
                            }
                            var e = [null];
                            return e.push.apply(e, n), new (a.apply(t, e))();
                        }
                        var f = r.prototype,
                            v = i(c(f) ? f : Object.prototype),
                            p = Function.apply.call(t, v, n);
                        return c(p) ? p : v;
                    },
                });
            },
            {
                16: 16,
                3: 3,
                33: 33,
                35: 35,
                40: 40,
                51: 51,
                7: 7,
                71: 71,
            },
        ],
        212: [
            function (t, n, r) {
                var e = t(72),
                    i = t(33),
                    o = t(7),
                    u = t(120);
                i(
                    i.S +
                        i.F *
                            t(35)(function () {
                                Reflect.defineProperty(
                                    e.f({}, 1, {
                                        value: 1,
                                    }),
                                    1,
                                    {
                                        value: 2,
                                    }
                                );
                            }),
                    "Reflect",
                    {
                        defineProperty: function (t, n, r) {
                            o(t), (n = u(n, !0)), o(r);
                            try {
                                return e.f(t, n, r), !0;
                            } catch (t) {
                                return !1;
                            }
                        },
                    }
                );
            },
            {
                120: 120,
                33: 33,
                35: 35,
                7: 7,
                72: 72,
            },
        ],
        213: [
            function (t, n, r) {
                var e = t(33),
                    i = t(75).f,
                    o = t(7);
                e(e.S, "Reflect", {
                    deleteProperty: function (t, n) {
                        var r = i(o(t), n);
                        return !(r && !r.configurable) && delete t[n];
                    },
                });
            },
            {
                33: 33,
                7: 7,
                75: 75,
            },
        ],
        214: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(7),
                    o = function (t) {
                        (this._t = i(t)), (this._i = 0);
                        var n,
                            r = (this._k = []);
                        for (n in t) r.push(n);
                    };
                t(54)(o, "Object", function () {
                    var t,
                        n = this,
                        r = n._k;
                    do {
                        if (n._i >= r.length)
                            return {
                                value: void 0,
                                done: !0,
                            };
                    } while (!((t = r[n._i++]) in n._t));
                    return {
                        value: t,
                        done: !1,
                    };
                }),
                    e(e.S, "Reflect", {
                        enumerate: function (t) {
                            return new o(t);
                        },
                    });
            },
            {
                33: 33,
                54: 54,
                7: 7,
            },
        ],
        215: [
            function (t, n, r) {
                var e = t(75),
                    i = t(33),
                    o = t(7);
                i(i.S, "Reflect", {
                    getOwnPropertyDescriptor: function (t, n) {
                        return e.f(o(t), n);
                    },
                });
            },
            {
                33: 33,
                7: 7,
                75: 75,
            },
        ],
        216: [
            function (t, n, r) {
                var e = t(33),
                    i = t(79),
                    o = t(7);
                e(e.S, "Reflect", {
                    getPrototypeOf: function (t) {
                        return i(o(t));
                    },
                });
            },
            {
                33: 33,
                7: 7,
                79: 79,
            },
        ],
        217: [
            function (t, n, r) {
                function e(t, n) {
                    var r,
                        c,
                        s = arguments.length < 3 ? t : arguments[2];
                    return a(t) === s
                        ? t[n]
                        : (r = i.f(t, n))
                        ? u(r, "value")
                            ? r.value
                            : void 0 !== r.get
                            ? r.get.call(s)
                            : void 0
                        : f((c = o(t)))
                        ? e(c, n, s)
                        : void 0;
                }
                var i = t(75),
                    o = t(79),
                    u = t(41),
                    c = t(33),
                    f = t(51),
                    a = t(7);
                c(c.S, "Reflect", {
                    get: e,
                });
            },
            {
                33: 33,
                41: 41,
                51: 51,
                7: 7,
                75: 75,
                79: 79,
            },
        ],
        218: [
            function (t, n, r) {
                var e = t(33);
                e(e.S, "Reflect", {
                    has: function (t, n) {
                        return n in t;
                    },
                });
            },
            {
                33: 33,
            },
        ],
        219: [
            function (t, n, r) {
                var e = t(33),
                    i = t(7),
                    o = Object.isExtensible;
                e(e.S, "Reflect", {
                    isExtensible: function (t) {
                        return i(t), !o || o(t);
                    },
                });
            },
            {
                33: 33,
                7: 7,
            },
        ],
        220: [
            function (t, n, r) {
                var e = t(33);
                e(e.S, "Reflect", {
                    ownKeys: t(85),
                });
            },
            {
                33: 33,
                85: 85,
            },
        ],
        221: [
            function (t, n, r) {
                var e = t(33),
                    i = t(7),
                    o = Object.preventExtensions;
                e(e.S, "Reflect", {
                    preventExtensions: function (t) {
                        i(t);
                        try {
                            return o && o(t), !0;
                        } catch (t) {
                            return !1;
                        }
                    },
                });
            },
            {
                33: 33,
                7: 7,
            },
        ],
        222: [
            function (t, n, r) {
                var e = t(33),
                    i = t(99);
                i &&
                    e(e.S, "Reflect", {
                        setPrototypeOf: function (t, n) {
                            i.check(t, n);
                            try {
                                return i.set(t, n), !0;
                            } catch (t) {
                                return !1;
                            }
                        },
                    });
            },
            {
                33: 33,
                99: 99,
            },
        ],
        223: [
            function (t, n, r) {
                function e(t, n, r) {
                    var f,
                        h,
                        v = arguments.length < 4 ? t : arguments[3],
                        p = o.f(s(t), n);
                    if (!p) {
                        if (l((h = u(t)))) return e(h, n, r, v);
                        p = a(0);
                    }
                    return c(p, "value")
                        ? !(!1 === p.writable || !l(v)) &&
                              ((f = o.f(v, n) || a(0)),
                              (f.value = r),
                              i.f(v, n, f),
                              !0)
                        : void 0 !== p.set && (p.set.call(v, r), !0);
                }
                var i = t(72),
                    o = t(75),
                    u = t(79),
                    c = t(41),
                    f = t(33),
                    a = t(92),
                    s = t(7),
                    l = t(51);
                f(f.S, "Reflect", {
                    set: e,
                });
            },
            {
                33: 33,
                41: 41,
                51: 51,
                7: 7,
                72: 72,
                75: 75,
                79: 79,
                92: 92,
            },
        ],
        224: [
            function (t, n, r) {
                var e = t(40),
                    i = t(45),
                    o = t(72).f,
                    u = t(77).f,
                    c = t(52),
                    f = t(37),
                    a = e.RegExp,
                    s = a,
                    l = a.prototype,
                    h = /a/g,
                    v = /a/g,
                    p = new a(h) !== h;
                if (
                    t(29) &&
                    (!p ||
                        t(35)(function () {
                            return (
                                (v[t(128)("match")] = !1),
                                a(h) != h || a(v) == v || "/a/i" != a(h, "i")
                            );
                        }))
                ) {
                    a = function (t, n) {
                        var r = this instanceof a,
                            e = c(t),
                            o = void 0 === n;
                        return !r && e && t.constructor === a && o
                            ? t
                            : i(
                                  p
                                      ? new s(e && !o ? t.source : t, n)
                                      : s(
                                            (e = t instanceof a) ? t.source : t,
                                            e && o ? f.call(t) : n
                                        ),
                                  r ? this : l,
                                  a
                              );
                    };
                    for (var y = u(s), d = 0; y.length > d; )
                        !(function (t) {
                            t in a ||
                                o(a, t, {
                                    configurable: !0,
                                    get: function () {
                                        return s[t];
                                    },
                                    set: function (n) {
                                        s[t] = n;
                                    },
                                });
                        })(y[d++]);
                    (l.constructor = a),
                        (a.prototype = l),
                        t(94)(e, "RegExp", a);
                }
                t(100)("RegExp");
            },
            {
                100: 100,
                128: 128,
                29: 29,
                35: 35,
                37: 37,
                40: 40,
                45: 45,
                52: 52,
                72: 72,
                77: 77,
                94: 94,
            },
        ],
        225: [
            function (t, n, r) {
                t(29) &&
                    "g" != /./g.flags &&
                    t(72).f(RegExp.prototype, "flags", {
                        configurable: !0,
                        get: t(37),
                    });
            },
            {
                29: 29,
                37: 37,
                72: 72,
            },
        ],
        226: [
            function (t, n, r) {
                t(36)("match", 1, function (t, n, r) {
                    return [
                        function (r) {
                            "use strict";
                            var e = t(this),
                                i = void 0 == r ? void 0 : r[n];
                            return void 0 !== i
                                ? i.call(r, e)
                                : new RegExp(r)[n](String(e));
                        },
                        r,
                    ];
                });
            },
            {
                36: 36,
            },
        ],
        227: [
            function (t, n, r) {
                t(36)("replace", 2, function (t, n, r) {
                    return [
                        function (e, i) {
                            "use strict";
                            var o = t(this),
                                u = void 0 == e ? void 0 : e[n];
                            return void 0 !== u
                                ? u.call(e, o, i)
                                : r.call(String(o), e, i);
                        },
                        r,
                    ];
                });
            },
            {
                36: 36,
            },
        ],
        228: [
            function (t, n, r) {
                t(36)("search", 1, function (t, n, r) {
                    return [
                        function (r) {
                            "use strict";
                            var e = t(this),
                                i = void 0 == r ? void 0 : r[n];
                            return void 0 !== i
                                ? i.call(r, e)
                                : new RegExp(r)[n](String(e));
                        },
                        r,
                    ];
                });
            },
            {
                36: 36,
            },
        ],
        229: [
            function (t, n, r) {
                t(36)("split", 2, function (n, r, e) {
                    "use strict";
                    var i = t(52),
                        o = e,
                        u = [].push,
                        c = "length";
                    if (
                        "c" == "abbc".split(/(b)*/)[1] ||
                        4 != "test".split(/(?:)/, -1)[c] ||
                        2 != "ab".split(/(?:ab)*/)[c] ||
                        4 != ".".split(/(.?)(.?)/)[c] ||
                        ".".split(/()()/)[c] > 1 ||
                        "".split(/.?/)[c]
                    ) {
                        var f = void 0 === /()??/.exec("")[1];
                        e = function (t, n) {
                            var r = String(this);
                            if (void 0 === t && 0 === n) return [];
                            if (!i(t)) return o.call(r, t, n);
                            var e,
                                a,
                                s,
                                l,
                                h,
                                v = [],
                                p =
                                    (t.ignoreCase ? "i" : "") +
                                    (t.multiline ? "m" : "") +
                                    (t.unicode ? "u" : "") +
                                    (t.sticky ? "y" : ""),
                                y = 0,
                                d = void 0 === n ? 4294967295 : n >>> 0,
                                g = new RegExp(t.source, p + "g");
                            for (
                                f ||
                                (e = new RegExp(
                                    "^" + g.source + "$(?!\\s)",
                                    p
                                ));
                                (a = g.exec(r)) &&
                                !(
                                    (s = a.index + a[0][c]) > y &&
                                    (v.push(r.slice(y, a.index)),
                                    !f &&
                                        a[c] > 1 &&
                                        a[0].replace(e, function () {
                                            for (
                                                h = 1;
                                                h < arguments[c] - 2;
                                                h++
                                            )
                                                void 0 === arguments[h] &&
                                                    (a[h] = void 0);
                                        }),
                                    a[c] > 1 &&
                                        a.index < r[c] &&
                                        u.apply(v, a.slice(1)),
                                    (l = a[0][c]),
                                    (y = s),
                                    v[c] >= d)
                                );

                            )
                                g.lastIndex === a.index && g.lastIndex++;
                            return (
                                y === r[c]
                                    ? (!l && g.test("")) || v.push("")
                                    : v.push(r.slice(y)),
                                v[c] > d ? v.slice(0, d) : v
                            );
                        };
                    } else
                        "0".split(void 0, 0)[c] &&
                            (e = function (t, n) {
                                return void 0 === t && 0 === n
                                    ? []
                                    : o.call(this, t, n);
                            });
                    return [
                        function (t, i) {
                            var o = n(this),
                                u = void 0 == t ? void 0 : t[r];
                            return void 0 !== u
                                ? u.call(t, o, i)
                                : e.call(String(o), t, i);
                        },
                        e,
                    ];
                });
            },
            {
                36: 36,
                52: 52,
            },
        ],
        230: [
            function (t, n, r) {
                "use strict";
                t(225);
                var e = t(7),
                    i = t(37),
                    o = t(29),
                    u = /./.toString,
                    c = function (n) {
                        t(94)(RegExp.prototype, "toString", n, !0);
                    };
                t(35)(function () {
                    return (
                        "/a/b" !=
                        u.call({
                            source: "a",
                            flags: "b",
                        })
                    );
                })
                    ? c(function () {
                          var t = e(this);
                          return "/".concat(
                              t.source,
                              "/",
                              "flags" in t
                                  ? t.flags
                                  : !o && t instanceof RegExp
                                  ? i.call(t)
                                  : void 0
                          );
                      })
                    : "toString" != u.name &&
                      c(function () {
                          return u.call(this);
                      });
            },
            {
                225: 225,
                29: 29,
                35: 35,
                37: 37,
                7: 7,
                94: 94,
            },
        ],
        231: [
            function (t, n, r) {
                "use strict";
                var e = t(19),
                    i = t(125);
                n.exports = t(22)(
                    "Set",
                    function (t) {
                        return function () {
                            return t(
                                this,
                                arguments.length > 0 ? arguments[0] : void 0
                            );
                        };
                    },
                    {
                        add: function (t) {
                            return e.def(
                                i(this, "Set"),
                                (t = 0 === t ? 0 : t),
                                t
                            );
                        },
                    },
                    e
                );
            },
            {
                125: 125,
                19: 19,
                22: 22,
            },
        ],
        232: [
            function (t, n, r) {
                "use strict";
                t(108)("anchor", function (t) {
                    return function (n) {
                        return t(this, "a", "name", n);
                    };
                });
            },
            {
                108: 108,
            },
        ],
        233: [
            function (t, n, r) {
                "use strict";
                t(108)("big", function (t) {
                    return function () {
                        return t(this, "big", "", "");
                    };
                });
            },
            {
                108: 108,
            },
        ],
        234: [
            function (t, n, r) {
                "use strict";
                t(108)("blink", function (t) {
                    return function () {
                        return t(this, "blink", "", "");
                    };
                });
            },
            {
                108: 108,
            },
        ],
        235: [
            function (t, n, r) {
                "use strict";
                t(108)("bold", function (t) {
                    return function () {
                        return t(this, "b", "", "");
                    };
                });
            },
            {
                108: 108,
            },
        ],
        236: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(106)(!1);
                e(e.P, "String", {
                    codePointAt: function (t) {
                        return i(this, t);
                    },
                });
            },
            {
                106: 106,
                33: 33,
            },
        ],
        237: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(118),
                    o = t(107),
                    u = "".endsWith;
                e(e.P + e.F * t(34)("endsWith"), "String", {
                    endsWith: function (t) {
                        var n = o(this, t, "endsWith"),
                            r = arguments.length > 1 ? arguments[1] : void 0,
                            e = i(n.length),
                            c = void 0 === r ? e : Math.min(i(r), e),
                            f = String(t);
                        return u
                            ? u.call(n, f, c)
                            : n.slice(c - f.length, c) === f;
                    },
                });
            },
            {
                107: 107,
                118: 118,
                33: 33,
                34: 34,
            },
        ],
        238: [
            function (t, n, r) {
                "use strict";
                t(108)("fixed", function (t) {
                    return function () {
                        return t(this, "tt", "", "");
                    };
                });
            },
            {
                108: 108,
            },
        ],
        239: [
            function (t, n, r) {
                "use strict";
                t(108)("fontcolor", function (t) {
                    return function (n) {
                        return t(this, "font", "color", n);
                    };
                });
            },
            {
                108: 108,
            },
        ],
        240: [
            function (t, n, r) {
                "use strict";
                t(108)("fontsize", function (t) {
                    return function (n) {
                        return t(this, "font", "size", n);
                    };
                });
            },
            {
                108: 108,
            },
        ],
        241: [
            function (t, n, r) {
                var e = t(33),
                    i = t(114),
                    o = String.fromCharCode,
                    u = String.fromCodePoint;
                e(e.S + e.F * (!!u && 1 != u.length), "String", {
                    fromCodePoint: function (t) {
                        for (
                            var n, r = [], e = arguments.length, u = 0;
                            e > u;

                        ) {
                            if (((n = +arguments[u++]), i(n, 1114111) !== n))
                                throw RangeError(
                                    n + " is not a valid code point"
                                );
                            r.push(
                                n < 65536
                                    ? o(n)
                                    : o(
                                          55296 + ((n -= 65536) >> 10),
                                          (n % 1024) + 56320
                                      )
                            );
                        }
                        return r.join("");
                    },
                });
            },
            {
                114: 114,
                33: 33,
            },
        ],
        242: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(107);
                e(e.P + e.F * t(34)("includes"), "String", {
                    includes: function (t) {
                        return !!~i(this, t, "includes").indexOf(
                            t,
                            arguments.length > 1 ? arguments[1] : void 0
                        );
                    },
                });
            },
            {
                107: 107,
                33: 33,
                34: 34,
            },
        ],
        243: [
            function (t, n, r) {
                "use strict";
                t(108)("italics", function (t) {
                    return function () {
                        return t(this, "i", "", "");
                    };
                });
            },
            {
                108: 108,
            },
        ],
        244: [
            function (t, n, r) {
                "use strict";
                var e = t(106)(!0);
                t(55)(
                    String,
                    "String",
                    function (t) {
                        (this._t = String(t)), (this._i = 0);
                    },
                    function () {
                        var t,
                            n = this._t,
                            r = this._i;
                        return r >= n.length
                            ? {
                                  value: void 0,
                                  done: !0,
                              }
                            : ((t = e(n, r)),
                              (this._i += t.length),
                              {
                                  value: t,
                                  done: !1,
                              });
                    }
                );
            },
            {
                106: 106,
                55: 55,
            },
        ],
        245: [
            function (t, n, r) {
                "use strict";
                t(108)("link", function (t) {
                    return function (n) {
                        return t(this, "a", "href", n);
                    };
                });
            },
            {
                108: 108,
            },
        ],
        246: [
            function (t, n, r) {
                var e = t(33),
                    i = t(117),
                    o = t(118);
                e(e.S, "String", {
                    raw: function (t) {
                        for (
                            var n = i(t.raw),
                                r = o(n.length),
                                e = arguments.length,
                                u = [],
                                c = 0;
                            r > c;

                        )
                            u.push(String(n[c++])),
                                c < e && u.push(String(arguments[c]));
                        return u.join("");
                    },
                });
            },
            {
                117: 117,
                118: 118,
                33: 33,
            },
        ],
        247: [
            function (t, n, r) {
                var e = t(33);
                e(e.P, "String", {
                    repeat: t(110),
                });
            },
            {
                110: 110,
                33: 33,
            },
        ],
        248: [
            function (t, n, r) {
                "use strict";
                t(108)("small", function (t) {
                    return function () {
                        return t(this, "small", "", "");
                    };
                });
            },
            {
                108: 108,
            },
        ],
        249: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(118),
                    o = t(107),
                    u = "".startsWith;
                e(e.P + e.F * t(34)("startsWith"), "String", {
                    startsWith: function (t) {
                        var n = o(this, t, "startsWith"),
                            r = i(
                                Math.min(
                                    arguments.length > 1
                                        ? arguments[1]
                                        : void 0,
                                    n.length
                                )
                            ),
                            e = String(t);
                        return u
                            ? u.call(n, e, r)
                            : n.slice(r, r + e.length) === e;
                    },
                });
            },
            {
                107: 107,
                118: 118,
                33: 33,
                34: 34,
            },
        ],
        250: [
            function (t, n, r) {
                "use strict";
                t(108)("strike", function (t) {
                    return function () {
                        return t(this, "strike", "", "");
                    };
                });
            },
            {
                108: 108,
            },
        ],
        251: [
            function (t, n, r) {
                "use strict";
                t(108)("sub", function (t) {
                    return function () {
                        return t(this, "sub", "", "");
                    };
                });
            },
            {
                108: 108,
            },
        ],
        252: [
            function (t, n, r) {
                "use strict";
                t(108)("sup", function (t) {
                    return function () {
                        return t(this, "sup", "", "");
                    };
                });
            },
            {
                108: 108,
            },
        ],
        253: [
            function (t, n, r) {
                "use strict";
                t(111)("trim", function (t) {
                    return function () {
                        return t(this, 3);
                    };
                });
            },
            {
                111: 111,
            },
        ],
        254: [
            function (t, n, r) {
                "use strict";
                var e = t(40),
                    i = t(41),
                    o = t(29),
                    u = t(33),
                    c = t(94),
                    f = t(66).KEY,
                    a = t(35),
                    s = t(103),
                    l = t(101),
                    h = t(124),
                    v = t(128),
                    p = t(127),
                    y = t(126),
                    d = t(59),
                    g = t(32),
                    m = t(49),
                    b = t(7),
                    S = t(117),
                    w = t(120),
                    x = t(92),
                    _ = t(71),
                    E = t(76),
                    O = t(75),
                    M = t(72),
                    P = t(81),
                    F = O.f,
                    A = M.f,
                    j = E.f,
                    N = e.Symbol,
                    I = e.JSON,
                    T = I && I.stringify,
                    L = v("_hidden"),
                    R = v("toPrimitive"),
                    k = {}.propertyIsEnumerable,
                    D = s("symbol-registry"),
                    W = s("symbols"),
                    C = s("op-symbols"),
                    G = Object.prototype,
                    U = "function" == typeof N,
                    B = e.QObject,
                    V = !B || !B.prototype || !B.prototype.findChild,
                    z =
                        o &&
                        a(function () {
                            return (
                                7 !=
                                _(
                                    A({}, "a", {
                                        get: function () {
                                            return A(this, "a", {
                                                value: 7,
                                            }).a;
                                        },
                                    })
                                ).a
                            );
                        })
                            ? function (t, n, r) {
                                  var e = F(G, n);
                                  e && delete G[n],
                                      A(t, n, r),
                                      e && t !== G && A(G, n, e);
                              }
                            : A,
                    Y = function (t) {
                        var n = (W[t] = _(N.prototype));
                        return (n._k = t), n;
                    },
                    q =
                        U && "symbol" == typeof N.iterator
                            ? function (t) {
                                  return "symbol" == typeof t;
                              }
                            : function (t) {
                                  return t instanceof N;
                              },
                    J = function (t, n, r) {
                        return (
                            t === G && J(C, n, r),
                            b(t),
                            (n = w(n, !0)),
                            b(r),
                            i(W, n)
                                ? (r.enumerable
                                      ? (i(t, L) && t[L][n] && (t[L][n] = !1),
                                        (r = _(r, {
                                            enumerable: x(0, !1),
                                        })))
                                      : (i(t, L) || A(t, L, x(1, {})),
                                        (t[L][n] = !0)),
                                  z(t, n, r))
                                : A(t, n, r)
                        );
                    },
                    K = function (t, n) {
                        b(t);
                        for (
                            var r, e = g((n = S(n))), i = 0, o = e.length;
                            o > i;

                        )
                            J(t, (r = e[i++]), n[r]);
                        return t;
                    },
                    H = function (t, n) {
                        return void 0 === n ? _(t) : K(_(t), n);
                    },
                    X = function (t) {
                        var n = k.call(this, (t = w(t, !0)));
                        return (
                            !(this === G && i(W, t) && !i(C, t)) &&
                            (!(
                                n ||
                                !i(this, t) ||
                                !i(W, t) ||
                                (i(this, L) && this[L][t])
                            ) ||
                                n)
                        );
                    },
                    $ = function (t, n) {
                        if (
                            ((t = S(t)),
                            (n = w(n, !0)),
                            t !== G || !i(W, n) || i(C, n))
                        ) {
                            var r = F(t, n);
                            return (
                                !r ||
                                    !i(W, n) ||
                                    (i(t, L) && t[L][n]) ||
                                    (r.enumerable = !0),
                                r
                            );
                        }
                    },
                    Z = function (t) {
                        for (var n, r = j(S(t)), e = [], o = 0; r.length > o; )
                            i(W, (n = r[o++])) || n == L || n == f || e.push(n);
                        return e;
                    },
                    Q = function (t) {
                        for (
                            var n,
                                r = t === G,
                                e = j(r ? C : S(t)),
                                o = [],
                                u = 0;
                            e.length > u;

                        )
                            !i(W, (n = e[u++])) ||
                                (r && !i(G, n)) ||
                                o.push(W[n]);
                        return o;
                    };
                U ||
                    ((N = function () {
                        if (this instanceof N)
                            throw TypeError("Symbol is not a constructor!");
                        var t = h(arguments.length > 0 ? arguments[0] : void 0),
                            n = function (r) {
                                this === G && n.call(C, r),
                                    i(this, L) &&
                                        i(this[L], t) &&
                                        (this[L][t] = !1),
                                    z(this, t, x(1, r));
                            };
                        return (
                            o &&
                                V &&
                                z(G, t, {
                                    configurable: !0,
                                    set: n,
                                }),
                            Y(t)
                        );
                    }),
                    c(N.prototype, "toString", function () {
                        return this._k;
                    }),
                    (O.f = $),
                    (M.f = J),
                    (t(77).f = E.f = Z),
                    (t(82).f = X),
                    (t(78).f = Q),
                    o && !t(60) && c(G, "propertyIsEnumerable", X, !0),
                    (p.f = function (t) {
                        return Y(v(t));
                    })),
                    u(u.G + u.W + u.F * !U, {
                        Symbol: N,
                    });
                for (
                    var tt =
                            "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(
                                ","
                            ),
                        nt = 0;
                    tt.length > nt;

                )
                    v(tt[nt++]);
                for (var rt = P(v.store), et = 0; rt.length > et; ) y(rt[et++]);
                u(u.S + u.F * !U, "Symbol", {
                    for: function (t) {
                        return i(D, (t += "")) ? D[t] : (D[t] = N(t));
                    },
                    keyFor: function (t) {
                        if (q(t)) return d(D, t);
                        throw TypeError(t + " is not a symbol!");
                    },
                    useSetter: function () {
                        V = !0;
                    },
                    useSimple: function () {
                        V = !1;
                    },
                }),
                    u(u.S + u.F * !U, "Object", {
                        create: H,
                        defineProperty: J,
                        defineProperties: K,
                        getOwnPropertyDescriptor: $,
                        getOwnPropertyNames: Z,
                        getOwnPropertySymbols: Q,
                    }),
                    I &&
                        u(
                            u.S +
                                u.F *
                                    (!U ||
                                        a(function () {
                                            var t = N();
                                            return (
                                                "[null]" != T([t]) ||
                                                "{}" !=
                                                    T({
                                                        a: t,
                                                    }) ||
                                                "{}" != T(Object(t))
                                            );
                                        })),
                            "JSON",
                            {
                                stringify: function (t) {
                                    if (void 0 !== t && !q(t)) {
                                        for (
                                            var n, r, e = [t], i = 1;
                                            arguments.length > i;

                                        )
                                            e.push(arguments[i++]);
                                        return (
                                            (n = e[1]),
                                            "function" == typeof n && (r = n),
                                            (!r && m(n)) ||
                                                (n = function (t, n) {
                                                    if (
                                                        (r &&
                                                            (n = r.call(
                                                                this,
                                                                t,
                                                                n
                                                            )),
                                                        !q(n))
                                                    )
                                                        return n;
                                                }),
                                            (e[1] = n),
                                            T.apply(I, e)
                                        );
                                    }
                                },
                            }
                        ),
                    N.prototype[R] ||
                        t(42)(N.prototype, R, N.prototype.valueOf),
                    l(N, "Symbol"),
                    l(Math, "Math", !0),
                    l(e.JSON, "JSON", !0);
            },
            {
                101: 101,
                103: 103,
                117: 117,
                120: 120,
                124: 124,
                126: 126,
                127: 127,
                128: 128,
                29: 29,
                32: 32,
                33: 33,
                35: 35,
                40: 40,
                41: 41,
                42: 42,
                49: 49,
                59: 59,
                60: 60,
                66: 66,
                7: 7,
                71: 71,
                72: 72,
                75: 75,
                76: 76,
                77: 77,
                78: 78,
                81: 81,
                82: 82,
                92: 92,
                94: 94,
            },
        ],
        255: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(123),
                    o = t(122),
                    u = t(7),
                    c = t(114),
                    f = t(118),
                    a = t(51),
                    s = t(40).ArrayBuffer,
                    l = t(104),
                    h = o.ArrayBuffer,
                    v = o.DataView,
                    p = i.ABV && s.isView,
                    y = h.prototype.slice,
                    d = i.VIEW;
                e(e.G + e.W + e.F * (s !== h), {
                    ArrayBuffer: h,
                }),
                    e(e.S + e.F * !i.CONSTR, "ArrayBuffer", {
                        isView: function (t) {
                            return (p && p(t)) || (a(t) && d in t);
                        },
                    }),
                    e(
                        e.P +
                            e.U +
                            e.F *
                                t(35)(function () {
                                    return !new h(2).slice(
                                        1,
                                        void 0
                                    ).byteLength;
                                }),
                        "ArrayBuffer",
                        {
                            slice: function (t, n) {
                                if (void 0 !== y && void 0 === n)
                                    return y.call(u(this), t);
                                for (
                                    var r = u(this).byteLength,
                                        e = c(t, r),
                                        i = c(void 0 === n ? r : n, r),
                                        o = new (l(this, h))(f(i - e)),
                                        a = new v(this),
                                        s = new v(o),
                                        p = 0;
                                    e < i;

                                )
                                    s.setUint8(p++, a.getUint8(e++));
                                return o;
                            },
                        }
                    ),
                    t(100)("ArrayBuffer");
            },
            {
                100: 100,
                104: 104,
                114: 114,
                118: 118,
                122: 122,
                123: 123,
                33: 33,
                35: 35,
                40: 40,
                51: 51,
                7: 7,
            },
        ],
        256: [
            function (t, n, r) {
                var e = t(33);
                e(e.G + e.W + e.F * !t(123).ABV, {
                    DataView: t(122).DataView,
                });
            },
            {
                122: 122,
                123: 123,
                33: 33,
            },
        ],
        257: [
            function (t, n, r) {
                t(121)("Float32", 4, function (t) {
                    return function (n, r, e) {
                        return t(this, n, r, e);
                    };
                });
            },
            {
                121: 121,
            },
        ],
        258: [
            function (t, n, r) {
                t(121)("Float64", 8, function (t) {
                    return function (n, r, e) {
                        return t(this, n, r, e);
                    };
                });
            },
            {
                121: 121,
            },
        ],
        259: [
            function (t, n, r) {
                t(121)("Int16", 2, function (t) {
                    return function (n, r, e) {
                        return t(this, n, r, e);
                    };
                });
            },
            {
                121: 121,
            },
        ],
        260: [
            function (t, n, r) {
                t(121)("Int32", 4, function (t) {
                    return function (n, r, e) {
                        return t(this, n, r, e);
                    };
                });
            },
            {
                121: 121,
            },
        ],
        261: [
            function (t, n, r) {
                t(121)("Int8", 1, function (t) {
                    return function (n, r, e) {
                        return t(this, n, r, e);
                    };
                });
            },
            {
                121: 121,
            },
        ],
        262: [
            function (t, n, r) {
                t(121)("Uint16", 2, function (t) {
                    return function (n, r, e) {
                        return t(this, n, r, e);
                    };
                });
            },
            {
                121: 121,
            },
        ],
        263: [
            function (t, n, r) {
                t(121)("Uint32", 4, function (t) {
                    return function (n, r, e) {
                        return t(this, n, r, e);
                    };
                });
            },
            {
                121: 121,
            },
        ],
        264: [
            function (t, n, r) {
                t(121)("Uint8", 1, function (t) {
                    return function (n, r, e) {
                        return t(this, n, r, e);
                    };
                });
            },
            {
                121: 121,
            },
        ],
        265: [
            function (t, n, r) {
                t(121)(
                    "Uint8",
                    1,
                    function (t) {
                        return function (n, r, e) {
                            return t(this, n, r, e);
                        };
                    },
                    !0
                );
            },
            {
                121: 121,
            },
        ],
        266: [
            function (t, n, r) {
                "use strict";
                var e,
                    i = t(12)(0),
                    o = t(94),
                    u = t(66),
                    c = t(70),
                    f = t(21),
                    a = t(51),
                    s = t(35),
                    l = t(125),
                    h = u.getWeak,
                    v = Object.isExtensible,
                    p = f.ufstore,
                    y = {},
                    d = function (t) {
                        return function () {
                            return t(
                                this,
                                arguments.length > 0 ? arguments[0] : void 0
                            );
                        };
                    },
                    g = {
                        get: function (t) {
                            if (a(t)) {
                                var n = h(t);
                                return !0 === n
                                    ? p(l(this, "WeakMap")).get(t)
                                    : n
                                    ? n[this._i]
                                    : void 0;
                            }
                        },
                        set: function (t, n) {
                            return f.def(l(this, "WeakMap"), t, n);
                        },
                    },
                    m = (n.exports = t(22)("WeakMap", d, g, f, !0, !0));
                s(function () {
                    return (
                        7 != new m().set((Object.freeze || Object)(y), 7).get(y)
                    );
                }) &&
                    ((e = f.getConstructor(d, "WeakMap")),
                    c(e.prototype, g),
                    (u.NEED = !0),
                    i(["delete", "has", "get", "set"], function (t) {
                        var n = m.prototype,
                            r = n[t];
                        o(n, t, function (n, i) {
                            if (a(n) && !v(n)) {
                                this._f || (this._f = new e());
                                var o = this._f[t](n, i);
                                return "set" == t ? this : o;
                            }
                            return r.call(this, n, i);
                        });
                    }));
            },
            {
                12: 12,
                125: 125,
                21: 21,
                22: 22,
                35: 35,
                51: 51,
                66: 66,
                70: 70,
                94: 94,
            },
        ],
        267: [
            function (t, n, r) {
                "use strict";
                var e = t(21),
                    i = t(125);
                t(22)(
                    "WeakSet",
                    function (t) {
                        return function () {
                            return t(
                                this,
                                arguments.length > 0 ? arguments[0] : void 0
                            );
                        };
                    },
                    {
                        add: function (t) {
                            return e.def(i(this, "WeakSet"), t, !0);
                        },
                    },
                    e,
                    !1,
                    !0
                );
            },
            {
                125: 125,
                21: 21,
                22: 22,
            },
        ],
        268: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(38),
                    o = t(119),
                    u = t(118),
                    c = t(3),
                    f = t(15);
                e(e.P, "Array", {
                    flatMap: function (t) {
                        var n,
                            r,
                            e = o(this);
                        return (
                            c(t),
                            (n = u(e.length)),
                            (r = f(e, 0)),
                            i(r, e, e, n, 0, 1, t, arguments[1]),
                            r
                        );
                    },
                }),
                    t(5)("flatMap");
            },
            {
                118: 118,
                119: 119,
                15: 15,
                3: 3,
                33: 33,
                38: 38,
                5: 5,
            },
        ],
        269: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(38),
                    o = t(119),
                    u = t(118),
                    c = t(116),
                    f = t(15);
                e(e.P, "Array", {
                    flatten: function () {
                        var t = arguments[0],
                            n = o(this),
                            r = u(n.length),
                            e = f(n, 0);
                        return i(e, n, n, r, 0, void 0 === t ? 1 : c(t)), e;
                    },
                }),
                    t(5)("flatten");
            },
            {
                116: 116,
                118: 118,
                119: 119,
                15: 15,
                33: 33,
                38: 38,
                5: 5,
            },
        ],
        270: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(11)(!0);
                e(e.P, "Array", {
                    includes: function (t) {
                        return i(
                            this,
                            t,
                            arguments.length > 1 ? arguments[1] : void 0
                        );
                    },
                }),
                    t(5)("includes");
            },
            {
                11: 11,
                33: 33,
                5: 5,
            },
        ],
        271: [
            function (t, n, r) {
                var e = t(33),
                    i = t(68)(),
                    o = t(40).process,
                    u = "process" == t(18)(o);
                e(e.G, {
                    asap: function (t) {
                        var n = u && o.domain;
                        i(n ? n.bind(t) : t);
                    },
                });
            },
            {
                18: 18,
                33: 33,
                40: 40,
                68: 68,
            },
        ],
        272: [
            function (t, n, r) {
                var e = t(33),
                    i = t(18);
                e(e.S, "Error", {
                    isError: function (t) {
                        return "Error" === i(t);
                    },
                });
            },
            {
                18: 18,
                33: 33,
            },
        ],
        273: [
            function (t, n, r) {
                var e = t(33);
                e(e.G, {
                    global: t(40),
                });
            },
            {
                33: 33,
                40: 40,
            },
        ],
        274: [
            function (t, n, r) {
                t(97)("Map");
            },
            {
                97: 97,
            },
        ],
        275: [
            function (t, n, r) {
                t(98)("Map");
            },
            {
                98: 98,
            },
        ],
        276: [
            function (t, n, r) {
                var e = t(33);
                e(e.P + e.R, "Map", {
                    toJSON: t(20)("Map"),
                });
            },
            {
                20: 20,
                33: 33,
            },
        ],
        277: [
            function (t, n, r) {
                var e = t(33);
                e(e.S, "Math", {
                    clamp: function (t, n, r) {
                        return Math.min(r, Math.max(n, t));
                    },
                });
            },
            {
                33: 33,
            },
        ],
        278: [
            function (t, n, r) {
                var e = t(33);
                e(e.S, "Math", {
                    DEG_PER_RAD: Math.PI / 180,
                });
            },
            {
                33: 33,
            },
        ],
        279: [
            function (t, n, r) {
                var e = t(33),
                    i = 180 / Math.PI;
                e(e.S, "Math", {
                    degrees: function (t) {
                        return t * i;
                    },
                });
            },
            {
                33: 33,
            },
        ],
        280: [
            function (t, n, r) {
                var e = t(33),
                    i = t(64),
                    o = t(62);
                e(e.S, "Math", {
                    fscale: function (t, n, r, e, u) {
                        return o(i(t, n, r, e, u));
                    },
                });
            },
            {
                33: 33,
                62: 62,
                64: 64,
            },
        ],
        281: [
            function (t, n, r) {
                var e = t(33);
                e(e.S, "Math", {
                    iaddh: function (t, n, r, e) {
                        var i = t >>> 0,
                            o = n >>> 0,
                            u = r >>> 0;
                        return (
                            (o +
                                (e >>> 0) +
                                (((i & u) | ((i | u) & ~((i + u) >>> 0))) >>>
                                    31)) |
                            0
                        );
                    },
                });
            },
            {
                33: 33,
            },
        ],
        282: [
            function (t, n, r) {
                var e = t(33);
                e(e.S, "Math", {
                    imulh: function (t, n) {
                        var r = +t,
                            e = +n,
                            i = 65535 & r,
                            o = 65535 & e,
                            u = r >> 16,
                            c = e >> 16,
                            f = ((u * o) >>> 0) + ((i * o) >>> 16);
                        return (
                            u * c +
                            (f >> 16) +
                            ((((i * c) >>> 0) + (65535 & f)) >> 16)
                        );
                    },
                });
            },
            {
                33: 33,
            },
        ],
        283: [
            function (t, n, r) {
                var e = t(33);
                e(e.S, "Math", {
                    isubh: function (t, n, r, e) {
                        var i = t >>> 0,
                            o = n >>> 0,
                            u = r >>> 0;
                        return (
                            (o -
                                (e >>> 0) -
                                (((~i & u) | (~(i ^ u) & ((i - u) >>> 0))) >>>
                                    31)) |
                            0
                        );
                    },
                });
            },
            {
                33: 33,
            },
        ],
        284: [
            function (t, n, r) {
                var e = t(33);
                e(e.S, "Math", {
                    RAD_PER_DEG: 180 / Math.PI,
                });
            },
            {
                33: 33,
            },
        ],
        285: [
            function (t, n, r) {
                var e = t(33),
                    i = Math.PI / 180;
                e(e.S, "Math", {
                    radians: function (t) {
                        return t * i;
                    },
                });
            },
            {
                33: 33,
            },
        ],
        286: [
            function (t, n, r) {
                var e = t(33);
                e(e.S, "Math", {
                    scale: t(64),
                });
            },
            {
                33: 33,
                64: 64,
            },
        ],
        287: [
            function (t, n, r) {
                var e = t(33);
                e(e.S, "Math", {
                    signbit: function (t) {
                        return (t = +t) != t
                            ? t
                            : 0 == t
                            ? 1 / t == 1 / 0
                            : t > 0;
                    },
                });
            },
            {
                33: 33,
            },
        ],
        288: [
            function (t, n, r) {
                var e = t(33);
                e(e.S, "Math", {
                    umulh: function (t, n) {
                        var r = +t,
                            e = +n,
                            i = 65535 & r,
                            o = 65535 & e,
                            u = r >>> 16,
                            c = e >>> 16,
                            f = ((u * o) >>> 0) + ((i * o) >>> 16);
                        return (
                            u * c +
                            (f >>> 16) +
                            ((((i * c) >>> 0) + (65535 & f)) >>> 16)
                        );
                    },
                });
            },
            {
                33: 33,
            },
        ],
        289: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(119),
                    o = t(3),
                    u = t(72);
                t(29) &&
                    e(e.P + t(74), "Object", {
                        __defineGetter__: function (t, n) {
                            u.f(i(this), t, {
                                get: o(n),
                                enumerable: !0,
                                configurable: !0,
                            });
                        },
                    });
            },
            {
                119: 119,
                29: 29,
                3: 3,
                33: 33,
                72: 72,
                74: 74,
            },
        ],
        290: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(119),
                    o = t(3),
                    u = t(72);
                t(29) &&
                    e(e.P + t(74), "Object", {
                        __defineSetter__: function (t, n) {
                            u.f(i(this), t, {
                                set: o(n),
                                enumerable: !0,
                                configurable: !0,
                            });
                        },
                    });
            },
            {
                119: 119,
                29: 29,
                3: 3,
                33: 33,
                72: 72,
                74: 74,
            },
        ],
        291: [
            function (t, n, r) {
                var e = t(33),
                    i = t(84)(!0);
                e(e.S, "Object", {
                    entries: function (t) {
                        return i(t);
                    },
                });
            },
            {
                33: 33,
                84: 84,
            },
        ],
        292: [
            function (t, n, r) {
                var e = t(33),
                    i = t(85),
                    o = t(117),
                    u = t(75),
                    c = t(24);
                e(e.S, "Object", {
                    getOwnPropertyDescriptors: function (t) {
                        for (
                            var n,
                                r,
                                e = o(t),
                                f = u.f,
                                a = i(e),
                                s = {},
                                l = 0;
                            a.length > l;

                        )
                            void 0 !== (r = f(e, (n = a[l++]))) && c(s, n, r);
                        return s;
                    },
                });
            },
            {
                117: 117,
                24: 24,
                33: 33,
                75: 75,
                85: 85,
            },
        ],
        293: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(119),
                    o = t(120),
                    u = t(79),
                    c = t(75).f;
                t(29) &&
                    e(e.P + t(74), "Object", {
                        __lookupGetter__: function (t) {
                            var n,
                                r = i(this),
                                e = o(t, !0);
                            do {
                                if ((n = c(r, e))) return n.get;
                            } while ((r = u(r)));
                        },
                    });
            },
            {
                119: 119,
                120: 120,
                29: 29,
                33: 33,
                74: 74,
                75: 75,
                79: 79,
            },
        ],
        294: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(119),
                    o = t(120),
                    u = t(79),
                    c = t(75).f;
                t(29) &&
                    e(e.P + t(74), "Object", {
                        __lookupSetter__: function (t) {
                            var n,
                                r = i(this),
                                e = o(t, !0);
                            do {
                                if ((n = c(r, e))) return n.set;
                            } while ((r = u(r)));
                        },
                    });
            },
            {
                119: 119,
                120: 120,
                29: 29,
                33: 33,
                74: 74,
                75: 75,
                79: 79,
            },
        ],
        295: [
            function (t, n, r) {
                var e = t(33),
                    i = t(84)(!1);
                e(e.S, "Object", {
                    values: function (t) {
                        return i(t);
                    },
                });
            },
            {
                33: 33,
                84: 84,
            },
        ],
        296: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(40),
                    o = t(23),
                    u = t(68)(),
                    c = t(128)("observable"),
                    f = t(3),
                    a = t(7),
                    s = t(6),
                    l = t(93),
                    h = t(42),
                    v = t(39),
                    p = v.RETURN,
                    y = function (t) {
                        return null == t ? void 0 : f(t);
                    },
                    d = function (t) {
                        var n = t._c;
                        n && ((t._c = void 0), n());
                    },
                    g = function (t) {
                        return void 0 === t._o;
                    },
                    m = function (t) {
                        g(t) || ((t._o = void 0), d(t));
                    },
                    b = function (t, n) {
                        a(t),
                            (this._c = void 0),
                            (this._o = t),
                            (t = new S(this));
                        try {
                            var r = n(t),
                                e = r;
                            null != r &&
                                ("function" == typeof r.unsubscribe
                                    ? (r = function () {
                                          e.unsubscribe();
                                      })
                                    : f(r),
                                (this._c = r));
                        } catch (n) {
                            return void t.error(n);
                        }
                        g(this) && d(this);
                    };
                b.prototype = l(
                    {},
                    {
                        unsubscribe: function () {
                            m(this);
                        },
                    }
                );
                var S = function (t) {
                    this._s = t;
                };
                S.prototype = l(
                    {},
                    {
                        next: function (t) {
                            var n = this._s;
                            if (!g(n)) {
                                var r = n._o;
                                try {
                                    var e = y(r.next);
                                    if (e) return e.call(r, t);
                                } catch (t) {
                                    try {
                                        m(n);
                                    } finally {
                                        throw t;
                                    }
                                }
                            }
                        },
                        error: function (t) {
                            var n = this._s;
                            if (g(n)) throw t;
                            var r = n._o;
                            n._o = void 0;
                            try {
                                var e = y(r.error);
                                if (!e) throw t;
                                t = e.call(r, t);
                            } catch (t) {
                                try {
                                    d(n);
                                } finally {
                                    throw t;
                                }
                            }
                            return d(n), t;
                        },
                        complete: function (t) {
                            var n = this._s;
                            if (!g(n)) {
                                var r = n._o;
                                n._o = void 0;
                                try {
                                    var e = y(r.complete);
                                    t = e ? e.call(r, t) : void 0;
                                } catch (t) {
                                    try {
                                        d(n);
                                    } finally {
                                        throw t;
                                    }
                                }
                                return d(n), t;
                            }
                        },
                    }
                );
                var w = function (t) {
                    s(this, w, "Observable", "_f")._f = f(t);
                };
                l(w.prototype, {
                    subscribe: function (t) {
                        return new b(t, this._f);
                    },
                    forEach: function (t) {
                        var n = this;
                        return new (o.Promise || i.Promise)(function (r, e) {
                            f(t);
                            var i = n.subscribe({
                                next: function (n) {
                                    try {
                                        return t(n);
                                    } catch (t) {
                                        e(t), i.unsubscribe();
                                    }
                                },
                                error: e,
                                complete: r,
                            });
                        });
                    },
                }),
                    l(w, {
                        from: function (t) {
                            var n = "function" == typeof this ? this : w,
                                r = y(a(t)[c]);
                            if (r) {
                                var e = a(r.call(t));
                                return e.constructor === n
                                    ? e
                                    : new n(function (t) {
                                          return e.subscribe(t);
                                      });
                            }
                            return new n(function (n) {
                                var r = !1;
                                return (
                                    u(function () {
                                        if (!r) {
                                            try {
                                                if (
                                                    v(t, !1, function (t) {
                                                        if ((n.next(t), r))
                                                            return p;
                                                    }) === p
                                                )
                                                    return;
                                            } catch (t) {
                                                if (r) throw t;
                                                return void n.error(t);
                                            }
                                            n.complete();
                                        }
                                    }),
                                    function () {
                                        r = !0;
                                    }
                                );
                            });
                        },
                        of: function () {
                            for (
                                var t = 0, n = arguments.length, r = Array(n);
                                t < n;

                            )
                                r[t] = arguments[t++];
                            return new ("function" == typeof this ? this : w)(
                                function (t) {
                                    var n = !1;
                                    return (
                                        u(function () {
                                            if (!n) {
                                                for (
                                                    var e = 0;
                                                    e < r.length;
                                                    ++e
                                                )
                                                    if ((t.next(r[e]), n))
                                                        return;
                                                t.complete();
                                            }
                                        }),
                                        function () {
                                            n = !0;
                                        }
                                    );
                                }
                            );
                        },
                    }),
                    h(w.prototype, c, function () {
                        return this;
                    }),
                    e(e.G, {
                        Observable: w,
                    }),
                    t(100)("Observable");
            },
            {
                100: 100,
                128: 128,
                23: 23,
                3: 3,
                33: 33,
                39: 39,
                40: 40,
                42: 42,
                6: 6,
                68: 68,
                7: 7,
                93: 93,
            },
        ],
        297: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(23),
                    o = t(40),
                    u = t(104),
                    c = t(91);
                e(e.P + e.R, "Promise", {
                    finally: function (t) {
                        var n = u(this, i.Promise || o.Promise),
                            r = "function" == typeof t;
                        return this.then(
                            r
                                ? function (r) {
                                      return c(n, t()).then(function () {
                                          return r;
                                      });
                                  }
                                : t,
                            r
                                ? function (r) {
                                      return c(n, t()).then(function () {
                                          throw r;
                                      });
                                  }
                                : t
                        );
                    },
                });
            },
            {
                104: 104,
                23: 23,
                33: 33,
                40: 40,
                91: 91,
            },
        ],
        298: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(69),
                    o = t(90);
                e(e.S, "Promise", {
                    try: function (t) {
                        var n = i.f(this),
                            r = o(t);
                        return (r.e ? n.reject : n.resolve)(r.v), n.promise;
                    },
                });
            },
            {
                33: 33,
                69: 69,
                90: 90,
            },
        ],
        299: [
            function (t, n, r) {
                var e = t(67),
                    i = t(7),
                    o = e.key,
                    u = e.set;
                e.exp({
                    defineMetadata: function (t, n, r, e) {
                        u(t, n, i(r), o(e));
                    },
                });
            },
            {
                67: 67,
                7: 7,
            },
        ],
        300: [
            function (t, n, r) {
                var e = t(67),
                    i = t(7),
                    o = e.key,
                    u = e.map,
                    c = e.store;
                e.exp({
                    deleteMetadata: function (t, n) {
                        var r = arguments.length < 3 ? void 0 : o(arguments[2]),
                            e = u(i(n), r, !1);
                        if (void 0 === e || !e.delete(t)) return !1;
                        if (e.size) return !0;
                        var f = c.get(n);
                        return f.delete(r), !!f.size || c.delete(n);
                    },
                });
            },
            {
                67: 67,
                7: 7,
            },
        ],
        301: [
            function (t, n, r) {
                var e = t(231),
                    i = t(10),
                    o = t(67),
                    u = t(7),
                    c = t(79),
                    f = o.keys,
                    a = o.key,
                    s = function (t, n) {
                        var r = f(t, n),
                            o = c(t);
                        if (null === o) return r;
                        var u = s(o, n);
                        return u.length
                            ? r.length
                                ? i(new e(r.concat(u)))
                                : u
                            : r;
                    };
                o.exp({
                    getMetadataKeys: function (t) {
                        return s(
                            u(t),
                            arguments.length < 2 ? void 0 : a(arguments[1])
                        );
                    },
                });
            },
            {
                10: 10,
                231: 231,
                67: 67,
                7: 7,
                79: 79,
            },
        ],
        302: [
            function (t, n, r) {
                var e = t(67),
                    i = t(7),
                    o = t(79),
                    u = e.has,
                    c = e.get,
                    f = e.key,
                    a = function (t, n, r) {
                        if (u(t, n, r)) return c(t, n, r);
                        var e = o(n);
                        return null !== e ? a(t, e, r) : void 0;
                    };
                e.exp({
                    getMetadata: function (t, n) {
                        return a(
                            t,
                            i(n),
                            arguments.length < 3 ? void 0 : f(arguments[2])
                        );
                    },
                });
            },
            {
                67: 67,
                7: 7,
                79: 79,
            },
        ],
        303: [
            function (t, n, r) {
                var e = t(67),
                    i = t(7),
                    o = e.keys,
                    u = e.key;
                e.exp({
                    getOwnMetadataKeys: function (t) {
                        return o(
                            i(t),
                            arguments.length < 2 ? void 0 : u(arguments[1])
                        );
                    },
                });
            },
            {
                67: 67,
                7: 7,
            },
        ],
        304: [
            function (t, n, r) {
                var e = t(67),
                    i = t(7),
                    o = e.get,
                    u = e.key;
                e.exp({
                    getOwnMetadata: function (t, n) {
                        return o(
                            t,
                            i(n),
                            arguments.length < 3 ? void 0 : u(arguments[2])
                        );
                    },
                });
            },
            {
                67: 67,
                7: 7,
            },
        ],
        305: [
            function (t, n, r) {
                var e = t(67),
                    i = t(7),
                    o = t(79),
                    u = e.has,
                    c = e.key,
                    f = function (t, n, r) {
                        if (u(t, n, r)) return !0;
                        var e = o(n);
                        return null !== e && f(t, e, r);
                    };
                e.exp({
                    hasMetadata: function (t, n) {
                        return f(
                            t,
                            i(n),
                            arguments.length < 3 ? void 0 : c(arguments[2])
                        );
                    },
                });
            },
            {
                67: 67,
                7: 7,
                79: 79,
            },
        ],
        306: [
            function (t, n, r) {
                var e = t(67),
                    i = t(7),
                    o = e.has,
                    u = e.key;
                e.exp({
                    hasOwnMetadata: function (t, n) {
                        return o(
                            t,
                            i(n),
                            arguments.length < 3 ? void 0 : u(arguments[2])
                        );
                    },
                });
            },
            {
                67: 67,
                7: 7,
            },
        ],
        307: [
            function (t, n, r) {
                var e = t(67),
                    i = t(7),
                    o = t(3),
                    u = e.key,
                    c = e.set;
                e.exp({
                    metadata: function (t, n) {
                        return function (r, e) {
                            c(t, n, (void 0 !== e ? i : o)(r), u(e));
                        };
                    },
                });
            },
            {
                3: 3,
                67: 67,
                7: 7,
            },
        ],
        308: [
            function (t, n, r) {
                t(97)("Set");
            },
            {
                97: 97,
            },
        ],
        309: [
            function (t, n, r) {
                t(98)("Set");
            },
            {
                98: 98,
            },
        ],
        310: [
            function (t, n, r) {
                var e = t(33);
                e(e.P + e.R, "Set", {
                    toJSON: t(20)("Set"),
                });
            },
            {
                20: 20,
                33: 33,
            },
        ],
        311: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(106)(!0);
                e(e.P, "String", {
                    at: function (t) {
                        return i(this, t);
                    },
                });
            },
            {
                106: 106,
                33: 33,
            },
        ],
        312: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(28),
                    o = t(118),
                    u = t(52),
                    c = t(37),
                    f = RegExp.prototype,
                    a = function (t, n) {
                        (this._r = t), (this._s = n);
                    };
                t(54)(a, "RegExp String", function () {
                    var t = this._r.exec(this._s);
                    return {
                        value: t,
                        done: null === t,
                    };
                }),
                    e(e.P, "String", {
                        matchAll: function (t) {
                            if ((i(this), !u(t)))
                                throw TypeError(t + " is not a regexp!");
                            var n = String(this),
                                r = "flags" in f ? String(t.flags) : c.call(t),
                                e = new RegExp(
                                    t.source,
                                    ~r.indexOf("g") ? r : "g" + r
                                );
                            return (e.lastIndex = o(t.lastIndex)), new a(e, n);
                        },
                    });
            },
            {
                118: 118,
                28: 28,
                33: 33,
                37: 37,
                52: 52,
                54: 54,
            },
        ],
        313: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(109);
                e(e.P, "String", {
                    padEnd: function (t) {
                        return i(
                            this,
                            t,
                            arguments.length > 1 ? arguments[1] : void 0,
                            !1
                        );
                    },
                });
            },
            {
                109: 109,
                33: 33,
            },
        ],
        314: [
            function (t, n, r) {
                "use strict";
                var e = t(33),
                    i = t(109);
                e(e.P, "String", {
                    padStart: function (t) {
                        return i(
                            this,
                            t,
                            arguments.length > 1 ? arguments[1] : void 0,
                            !0
                        );
                    },
                });
            },
            {
                109: 109,
                33: 33,
            },
        ],
        315: [
            function (t, n, r) {
                "use strict";
                t(111)(
                    "trimLeft",
                    function (t) {
                        return function () {
                            return t(this, 1);
                        };
                    },
                    "trimStart"
                );
            },
            {
                111: 111,
            },
        ],
        316: [
            function (t, n, r) {
                "use strict";
                t(111)(
                    "trimRight",
                    function (t) {
                        return function () {
                            return t(this, 2);
                        };
                    },
                    "trimEnd"
                );
            },
            {
                111: 111,
            },
        ],
        317: [
            function (t, n, r) {
                t(126)("asyncIterator");
            },
            {
                126: 126,
            },
        ],
        318: [
            function (t, n, r) {
                t(126)("observable");
            },
            {
                126: 126,
            },
        ],
        319: [
            function (t, n, r) {
                var e = t(33);
                e(e.S, "System", {
                    global: t(40),
                });
            },
            {
                33: 33,
                40: 40,
            },
        ],
        320: [
            function (t, n, r) {
                t(97)("WeakMap");
            },
            {
                97: 97,
            },
        ],
        321: [
            function (t, n, r) {
                t(98)("WeakMap");
            },
            {
                98: 98,
            },
        ],
        322: [
            function (t, n, r) {
                t(97)("WeakSet");
            },
            {
                97: 97,
            },
        ],
        323: [
            function (t, n, r) {
                t(98)("WeakSet");
            },
            {
                98: 98,
            },
        ],
        324: [
            function (t, n, r) {
                for (
                    var e = t(141),
                        i = t(81),
                        o = t(94),
                        u = t(40),
                        c = t(42),
                        f = t(58),
                        a = t(128),
                        s = a("iterator"),
                        l = a("toStringTag"),
                        h = f.Array,
                        v = {
                            CSSRuleList: !0,
                            CSSStyleDeclaration: !1,
                            CSSValueList: !1,
                            ClientRectList: !1,
                            DOMRectList: !1,
                            DOMStringList: !1,
                            DOMTokenList: !0,
                            DataTransferItemList: !1,
                            FileList: !1,
                            HTMLAllCollection: !1,
                            HTMLCollection: !1,
                            HTMLFormElement: !1,
                            HTMLSelectElement: !1,
                            MediaList: !0,
                            MimeTypeArray: !1,
                            NamedNodeMap: !1,
                            NodeList: !0,
                            PaintRequestList: !1,
                            Plugin: !1,
                            PluginArray: !1,
                            SVGLengthList: !1,
                            SVGNumberList: !1,
                            SVGPathSegList: !1,
                            SVGPointList: !1,
                            SVGStringList: !1,
                            SVGTransformList: !1,
                            SourceBufferList: !1,
                            StyleSheetList: !0,
                            TextTrackCueList: !1,
                            TextTrackList: !1,
                            TouchList: !1,
                        },
                        p = i(v),
                        y = 0;
                    y < p.length;
                    y++
                ) {
                    var d,
                        g = p[y],
                        m = v[g],
                        b = u[g],
                        S = b && b.prototype;
                    if (
                        S &&
                        (S[s] || c(S, s, h), S[l] || c(S, l, g), (f[g] = h), m)
                    )
                        for (d in e) S[d] || o(S, d, e[d], !0);
                }
            },
            {
                128: 128,
                141: 141,
                40: 40,
                42: 42,
                58: 58,
                81: 81,
                94: 94,
            },
        ],
        325: [
            function (t, n, r) {
                var e = t(33),
                    i = t(113);
                e(e.G + e.B, {
                    setImmediate: i.set,
                    clearImmediate: i.clear,
                });
            },
            {
                113: 113,
                33: 33,
            },
        ],
        326: [
            function (t, n, r) {
                var e = t(40),
                    i = t(33),
                    o = t(46),
                    u = t(88),
                    c = e.navigator,
                    f = !!c && /MSIE .\./.test(c.userAgent),
                    a = function (t) {
                        return f
                            ? function (n, r) {
                                  return t(
                                      o(
                                          u,
                                          [].slice.call(arguments, 2),
                                          "function" == typeof n
                                              ? n
                                              : Function(n)
                                      ),
                                      r
                                  );
                              }
                            : t;
                    };
                i(i.G + i.B + i.F * f, {
                    setTimeout: a(e.setTimeout),
                    setInterval: a(e.setInterval),
                });
            },
            {
                33: 33,
                40: 40,
                46: 46,
                88: 88,
            },
        ],
        327: [
            function (t, n, r) {
                t(254),
                    t(191),
                    t(193),
                    t(192),
                    t(195),
                    t(197),
                    t(202),
                    t(196),
                    t(194),
                    t(204),
                    t(203),
                    t(199),
                    t(200),
                    t(198),
                    t(190),
                    t(201),
                    t(205),
                    t(206),
                    t(157),
                    t(159),
                    t(158),
                    t(208),
                    t(207),
                    t(178),
                    t(188),
                    t(189),
                    t(179),
                    t(180),
                    t(181),
                    t(182),
                    t(183),
                    t(184),
                    t(185),
                    t(186),
                    t(187),
                    t(161),
                    t(162),
                    t(163),
                    t(164),
                    t(165),
                    t(166),
                    t(167),
                    t(168),
                    t(169),
                    t(170),
                    t(171),
                    t(172),
                    t(173),
                    t(174),
                    t(175),
                    t(176),
                    t(177),
                    t(241),
                    t(246),
                    t(253),
                    t(244),
                    t(236),
                    t(237),
                    t(242),
                    t(247),
                    t(249),
                    t(232),
                    t(233),
                    t(234),
                    t(235),
                    t(238),
                    t(239),
                    t(240),
                    t(243),
                    t(245),
                    t(248),
                    t(250),
                    t(251),
                    t(252),
                    t(152),
                    t(154),
                    t(153),
                    t(156),
                    t(155),
                    t(140),
                    t(138),
                    t(145),
                    t(142),
                    t(148),
                    t(150),
                    t(137),
                    t(144),
                    t(134),
                    t(149),
                    t(132),
                    t(147),
                    t(146),
                    t(139),
                    t(143),
                    t(131),
                    t(133),
                    t(136),
                    t(135),
                    t(151),
                    t(141),
                    t(224),
                    t(230),
                    t(225),
                    t(226),
                    t(227),
                    t(228),
                    t(229),
                    t(209),
                    t(160),
                    t(231),
                    t(266),
                    t(267),
                    t(255),
                    t(256),
                    t(261),
                    t(264),
                    t(265),
                    t(259),
                    t(262),
                    t(260),
                    t(263),
                    t(257),
                    t(258),
                    t(210),
                    t(211),
                    t(212),
                    t(213),
                    t(214),
                    t(217),
                    t(215),
                    t(216),
                    t(218),
                    t(219),
                    t(220),
                    t(221),
                    t(223),
                    t(222),
                    t(270),
                    t(268),
                    t(269),
                    t(311),
                    t(314),
                    t(313),
                    t(315),
                    t(316),
                    t(312),
                    t(317),
                    t(318),
                    t(292),
                    t(295),
                    t(291),
                    t(289),
                    t(290),
                    t(293),
                    t(294),
                    t(276),
                    t(310),
                    t(275),
                    t(309),
                    t(321),
                    t(323),
                    t(274),
                    t(308),
                    t(320),
                    t(322),
                    t(273),
                    t(319),
                    t(272),
                    t(277),
                    t(278),
                    t(279),
                    t(280),
                    t(281),
                    t(283),
                    t(282),
                    t(284),
                    t(285),
                    t(286),
                    t(288),
                    t(287),
                    t(297),
                    t(298),
                    t(299),
                    t(300),
                    t(302),
                    t(301),
                    t(304),
                    t(303),
                    t(305),
                    t(306),
                    t(307),
                    t(271),
                    t(296),
                    t(326),
                    t(325),
                    t(324),
                    (n.exports = t(23));
            },
            {
                131: 131,
                132: 132,
                133: 133,
                134: 134,
                135: 135,
                136: 136,
                137: 137,
                138: 138,
                139: 139,
                140: 140,
                141: 141,
                142: 142,
                143: 143,
                144: 144,
                145: 145,
                146: 146,
                147: 147,
                148: 148,
                149: 149,
                150: 150,
                151: 151,
                152: 152,
                153: 153,
                154: 154,
                155: 155,
                156: 156,
                157: 157,
                158: 158,
                159: 159,
                160: 160,
                161: 161,
                162: 162,
                163: 163,
                164: 164,
                165: 165,
                166: 166,
                167: 167,
                168: 168,
                169: 169,
                170: 170,
                171: 171,
                172: 172,
                173: 173,
                174: 174,
                175: 175,
                176: 176,
                177: 177,
                178: 178,
                179: 179,
                180: 180,
                181: 181,
                182: 182,
                183: 183,
                184: 184,
                185: 185,
                186: 186,
                187: 187,
                188: 188,
                189: 189,
                190: 190,
                191: 191,
                192: 192,
                193: 193,
                194: 194,
                195: 195,
                196: 196,
                197: 197,
                198: 198,
                199: 199,
                200: 200,
                201: 201,
                202: 202,
                203: 203,
                204: 204,
                205: 205,
                206: 206,
                207: 207,
                208: 208,
                209: 209,
                210: 210,
                211: 211,
                212: 212,
                213: 213,
                214: 214,
                215: 215,
                216: 216,
                217: 217,
                218: 218,
                219: 219,
                220: 220,
                221: 221,
                222: 222,
                223: 223,
                224: 224,
                225: 225,
                226: 226,
                227: 227,
                228: 228,
                229: 229,
                23: 23,
                230: 230,
                231: 231,
                232: 232,
                233: 233,
                234: 234,
                235: 235,
                236: 236,
                237: 237,
                238: 238,
                239: 239,
                240: 240,
                241: 241,
                242: 242,
                243: 243,
                244: 244,
                245: 245,
                246: 246,
                247: 247,
                248: 248,
                249: 249,
                250: 250,
                251: 251,
                252: 252,
                253: 253,
                254: 254,
                255: 255,
                256: 256,
                257: 257,
                258: 258,
                259: 259,
                260: 260,
                261: 261,
                262: 262,
                263: 263,
                264: 264,
                265: 265,
                266: 266,
                267: 267,
                268: 268,
                269: 269,
                270: 270,
                271: 271,
                272: 272,
                273: 273,
                274: 274,
                275: 275,
                276: 276,
                277: 277,
                278: 278,
                279: 279,
                280: 280,
                281: 281,
                282: 282,
                283: 283,
                284: 284,
                285: 285,
                286: 286,
                287: 287,
                288: 288,
                289: 289,
                290: 290,
                291: 291,
                292: 292,
                293: 293,
                294: 294,
                295: 295,
                296: 296,
                297: 297,
                298: 298,
                299: 299,
                300: 300,
                301: 301,
                302: 302,
                303: 303,
                304: 304,
                305: 305,
                306: 306,
                307: 307,
                308: 308,
                309: 309,
                310: 310,
                311: 311,
                312: 312,
                313: 313,
                314: 314,
                315: 315,
                316: 316,
                317: 317,
                318: 318,
                319: 319,
                320: 320,
                321: 321,
                322: 322,
                323: 323,
                324: 324,
                325: 325,
                326: 326,
            },
        ],
        328: [
            function (t, n, r) {
                (function (t) {
                    !(function (t) {
                        "use strict";

                        function r(t, n, r, e) {
                            var o = n && n.prototype instanceof i ? n : i,
                                u = Object.create(o.prototype),
                                c = new v(e || []);
                            return (u._invoke = a(t, r, c)), u;
                        }

                        function e(t, n, r) {
                            try {
                                return {
                                    type: "normal",
                                    arg: t.call(n, r),
                                };
                            } catch (t) {
                                return {
                                    type: "throw",
                                    arg: t,
                                };
                            }
                        }

                        function i() {}

                        function o() {}

                        function u() {}

                        function c(t) {
                            ["next", "throw", "return"].forEach(function (n) {
                                t[n] = function (t) {
                                    return this._invoke(n, t);
                                };
                            });
                        }

                        function f(n) {
                            function r(t, i, o, u) {
                                var c = e(n[t], n, i);
                                if ("throw" !== c.type) {
                                    var f = c.arg,
                                        a = f.value;
                                    return a &&
                                        "object" == typeof a &&
                                        m.call(a, "__await")
                                        ? Promise.resolve(a.__await).then(
                                              function (t) {
                                                  r("next", t, o, u);
                                              },
                                              function (t) {
                                                  r("throw", t, o, u);
                                              }
                                          )
                                        : Promise.resolve(a).then(function (t) {
                                              (f.value = t), o(f);
                                          }, u);
                                }
                                u(c.arg);
                            }

                            function i(t, n) {
                                function e() {
                                    return new Promise(function (e, i) {
                                        r(t, n, e, i);
                                    });
                                }
                                return (o = o ? o.then(e, e) : e());
                            }
                            "object" == typeof t.process &&
                                t.process.domain &&
                                (r = t.process.domain.bind(r));
                            var o;
                            this._invoke = i;
                        }

                        function a(t, n, r) {
                            var i = O;
                            return function (o, u) {
                                if (i === P)
                                    throw new Error(
                                        "Generator is already running"
                                    );
                                if (i === F) {
                                    if ("throw" === o) throw u;
                                    return y();
                                }
                                for (r.method = o, r.arg = u; ; ) {
                                    var c = r.delegate;
                                    if (c) {
                                        var f = s(c, r);
                                        if (f) {
                                            if (f === A) continue;
                                            return f;
                                        }
                                    }
                                    if ("next" === r.method)
                                        r.sent = r._sent = r.arg;
                                    else if ("throw" === r.method) {
                                        if (i === O) throw ((i = F), r.arg);
                                        r.dispatchException(r.arg);
                                    } else
                                        "return" === r.method &&
                                            r.abrupt("return", r.arg);
                                    i = P;
                                    var a = e(t, n, r);
                                    if ("normal" === a.type) {
                                        if (((i = r.done ? F : M), a.arg === A))
                                            continue;
                                        return {
                                            value: a.arg,
                                            done: r.done,
                                        };
                                    }
                                    "throw" === a.type &&
                                        ((i = F),
                                        (r.method = "throw"),
                                        (r.arg = a.arg));
                                }
                            };
                        }

                        function s(t, n) {
                            var r = t.iterator[n.method];
                            if (r === d) {
                                if (
                                    ((n.delegate = null), "throw" === n.method)
                                ) {
                                    if (
                                        t.iterator.return &&
                                        ((n.method = "return"),
                                        (n.arg = d),
                                        s(t, n),
                                        "throw" === n.method)
                                    )
                                        return A;
                                    (n.method = "throw"),
                                        (n.arg = new TypeError(
                                            "The iterator does not provide a 'throw' method"
                                        ));
                                }
                                return A;
                            }
                            var i = e(r, t.iterator, n.arg);
                            if ("throw" === i.type)
                                return (
                                    (n.method = "throw"),
                                    (n.arg = i.arg),
                                    (n.delegate = null),
                                    A
                                );
                            var o = i.arg;
                            return o
                                ? o.done
                                    ? ((n[t.resultName] = o.value),
                                      (n.next = t.nextLoc),
                                      "return" !== n.method &&
                                          ((n.method = "next"), (n.arg = d)),
                                      (n.delegate = null),
                                      A)
                                    : o
                                : ((n.method = "throw"),
                                  (n.arg = new TypeError(
                                      "iterator result is not an object"
                                  )),
                                  (n.delegate = null),
                                  A);
                        }

                        function l(t) {
                            var n = {
                                tryLoc: t[0],
                            };
                            1 in t && (n.catchLoc = t[1]),
                                2 in t &&
                                    ((n.finallyLoc = t[2]),
                                    (n.afterLoc = t[3])),
                                this.tryEntries.push(n);
                        }

                        function h(t) {
                            var n = t.completion || {};
                            (n.type = "normal"),
                                delete n.arg,
                                (t.completion = n);
                        }

                        function v(t) {
                            (this.tryEntries = [
                                {
                                    tryLoc: "root",
                                },
                            ]),
                                t.forEach(l, this),
                                this.reset(!0);
                        }

                        function p(t) {
                            if (t) {
                                var n = t[S];
                                if (n) return n.call(t);
                                if ("function" == typeof t.next) return t;
                                if (!isNaN(t.length)) {
                                    var r = -1,
                                        e = function n() {
                                            for (; ++r < t.length; )
                                                if (m.call(t, r))
                                                    return (
                                                        (n.value = t[r]),
                                                        (n.done = !1),
                                                        n
                                                    );
                                            return (
                                                (n.value = d), (n.done = !0), n
                                            );
                                        };
                                    return (e.next = e);
                                }
                            }
                            return {
                                next: y,
                            };
                        }

                        function y() {
                            return {
                                value: d,
                                done: !0,
                            };
                        }
                        var d,
                            g = Object.prototype,
                            m = g.hasOwnProperty,
                            b = "function" == typeof Symbol ? Symbol : {},
                            S = b.iterator || "@@iterator",
                            w = b.asyncIterator || "@@asyncIterator",
                            x = b.toStringTag || "@@toStringTag",
                            _ = "object" == typeof n,
                            E = t.regeneratorRuntime;
                        if (E) return void (_ && (n.exports = E));
                        (E = t.regeneratorRuntime = _ ? n.exports : {}),
                            (E.wrap = r);
                        var O = "suspendedStart",
                            M = "suspendedYield",
                            P = "executing",
                            F = "completed",
                            A = {},
                            j = {};
                        j[S] = function () {
                            return this;
                        };
                        var N = Object.getPrototypeOf,
                            I = N && N(N(p([])));
                        I && I !== g && m.call(I, S) && (j = I);
                        var T = (u.prototype = i.prototype = Object.create(j));
                        (o.prototype = T.constructor = u),
                            (u.constructor = o),
                            (u[x] = o.displayName = "GeneratorFunction"),
                            (E.isGeneratorFunction = function (t) {
                                var n = "function" == typeof t && t.constructor;
                                return (
                                    !!n &&
                                    (n === o ||
                                        "GeneratorFunction" ===
                                            (n.displayName || n.name))
                                );
                            }),
                            (E.mark = function (t) {
                                return (
                                    Object.setPrototypeOf
                                        ? Object.setPrototypeOf(t, u)
                                        : ((t.__proto__ = u),
                                          x in t ||
                                              (t[x] = "GeneratorFunction")),
                                    (t.prototype = Object.create(T)),
                                    t
                                );
                            }),
                            (E.awrap = function (t) {
                                return {
                                    __await: t,
                                };
                            }),
                            c(f.prototype),
                            (f.prototype[w] = function () {
                                return this;
                            }),
                            (E.AsyncIterator = f),
                            (E.async = function (t, n, e, i) {
                                var o = new f(r(t, n, e, i));
                                return E.isGeneratorFunction(n)
                                    ? o
                                    : o.next().then(function (t) {
                                          return t.done ? t.value : o.next();
                                      });
                            }),
                            c(T),
                            (T[x] = "Generator"),
                            (T[S] = function () {
                                return this;
                            }),
                            (T.toString = function () {
                                return "[object Generator]";
                            }),
                            (E.keys = function (t) {
                                var n = [];
                                for (var r in t) n.push(r);
                                return (
                                    n.reverse(),
                                    function r() {
                                        for (; n.length; ) {
                                            var e = n.pop();
                                            if (e in t)
                                                return (
                                                    (r.value = e),
                                                    (r.done = !1),
                                                    r
                                                );
                                        }
                                        return (r.done = !0), r;
                                    }
                                );
                            }),
                            (E.values = p),
                            (v.prototype = {
                                constructor: v,
                                reset: function (t) {
                                    if (
                                        ((this.prev = 0),
                                        (this.next = 0),
                                        (this.sent = this._sent = d),
                                        (this.done = !1),
                                        (this.delegate = null),
                                        (this.method = "next"),
                                        (this.arg = d),
                                        this.tryEntries.forEach(h),
                                        !t)
                                    )
                                        for (var n in this)
                                            "t" === n.charAt(0) &&
                                                m.call(this, n) &&
                                                !isNaN(+n.slice(1)) &&
                                                (this[n] = d);
                                },
                                stop: function () {
                                    this.done = !0;
                                    var t = this.tryEntries[0],
                                        n = t.completion;
                                    if ("throw" === n.type) throw n.arg;
                                    return this.rval;
                                },
                                dispatchException: function (t) {
                                    function n(n, e) {
                                        return (
                                            (o.type = "throw"),
                                            (o.arg = t),
                                            (r.next = n),
                                            e &&
                                                ((r.method = "next"),
                                                (r.arg = d)),
                                            !!e
                                        );
                                    }
                                    if (this.done) throw t;
                                    for (
                                        var r = this,
                                            e = this.tryEntries.length - 1;
                                        e >= 0;
                                        --e
                                    ) {
                                        var i = this.tryEntries[e],
                                            o = i.completion;
                                        if ("root" === i.tryLoc)
                                            return n("end");
                                        if (i.tryLoc <= this.prev) {
                                            var u = m.call(i, "catchLoc"),
                                                c = m.call(i, "finallyLoc");
                                            if (u && c) {
                                                if (this.prev < i.catchLoc)
                                                    return n(i.catchLoc, !0);
                                                if (this.prev < i.finallyLoc)
                                                    return n(i.finallyLoc);
                                            } else if (u) {
                                                if (this.prev < i.catchLoc)
                                                    return n(i.catchLoc, !0);
                                            } else {
                                                if (!c)
                                                    throw new Error(
                                                        "try statement without catch or finally"
                                                    );
                                                if (this.prev < i.finallyLoc)
                                                    return n(i.finallyLoc);
                                            }
                                        }
                                    }
                                },
                                abrupt: function (t, n) {
                                    for (
                                        var r = this.tryEntries.length - 1;
                                        r >= 0;
                                        --r
                                    ) {
                                        var e = this.tryEntries[r];
                                        if (
                                            e.tryLoc <= this.prev &&
                                            m.call(e, "finallyLoc") &&
                                            this.prev < e.finallyLoc
                                        ) {
                                            var i = e;
                                            break;
                                        }
                                    }
                                    i &&
                                        ("break" === t || "continue" === t) &&
                                        i.tryLoc <= n &&
                                        n <= i.finallyLoc &&
                                        (i = null);
                                    var o = i ? i.completion : {};
                                    return (
                                        (o.type = t),
                                        (o.arg = n),
                                        i
                                            ? ((this.method = "next"),
                                              (this.next = i.finallyLoc),
                                              A)
                                            : this.complete(o)
                                    );
                                },
                                complete: function (t, n) {
                                    if ("throw" === t.type) throw t.arg;
                                    return (
                                        "break" === t.type ||
                                        "continue" === t.type
                                            ? (this.next = t.arg)
                                            : "return" === t.type
                                            ? ((this.rval = this.arg = t.arg),
                                              (this.method = "return"),
                                              (this.next = "end"))
                                            : "normal" === t.type &&
                                              n &&
                                              (this.next = n),
                                        A
                                    );
                                },
                                finish: function (t) {
                                    for (
                                        var n = this.tryEntries.length - 1;
                                        n >= 0;
                                        --n
                                    ) {
                                        var r = this.tryEntries[n];
                                        if (r.finallyLoc === t)
                                            return (
                                                this.complete(
                                                    r.completion,
                                                    r.afterLoc
                                                ),
                                                h(r),
                                                A
                                            );
                                    }
                                },
                                catch: function (t) {
                                    for (
                                        var n = this.tryEntries.length - 1;
                                        n >= 0;
                                        --n
                                    ) {
                                        var r = this.tryEntries[n];
                                        if (r.tryLoc === t) {
                                            var e = r.completion;
                                            if ("throw" === e.type) {
                                                var i = e.arg;
                                                h(r);
                                            }
                                            return i;
                                        }
                                    }
                                    throw new Error("illegal catch attempt");
                                },
                                delegateYield: function (t, n, r) {
                                    return (
                                        (this.delegate = {
                                            iterator: p(t),
                                            resultName: n,
                                            nextLoc: r,
                                        }),
                                        "next" === this.method &&
                                            (this.arg = d),
                                        A
                                    );
                                },
                            });
                    })(
                        "object" == typeof t
                            ? t
                            : "object" == typeof window
                            ? window
                            : "object" == typeof self
                            ? self
                            : this
                    );
                }).call(
                    this,
                    "undefined" != typeof global
                        ? global
                        : "undefined" != typeof self
                        ? self
                        : "undefined" != typeof window
                        ? window
                        : {}
                );
            },
            {},
        ],
    },
    {},
    [1]
);
!(function () {
    var n =
            Date.now ||
            function () {
                return +new Date();
            },
        e = {},
        t = 1;
    window.core
        ? core.effect || (core.effect = {})
        : (window.core = {
              effect: {},
          }),
        (window.core.effect.Animate = {
            requestAnimationFrame: (function () {
                var n =
                        window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame,
                    e = !!n;
                if (
                    (n &&
                        !/requestAnimationFrame\(\)\s*\{\s*\[native code\]\s*\}/i.test(
                            n.toString()
                        ) &&
                        (e = !1),
                    e)
                )
                    return function (e, t) {
                        n(e, t);
                    };
                var t = {},
                    r = 0,
                    i = 1,
                    o = null,
                    a = +new Date();
                return function (n, e) {
                    var u = i++;
                    return (
                        (t[u] = n),
                        r++,
                        null === o &&
                            (o = setInterval(function () {
                                var n = +new Date(),
                                    e = t;
                                (t = {}), (r = 0);
                                for (var i in e)
                                    e.hasOwnProperty(i) && (e[i](n), (a = n));
                                n - a > 2500 && (clearInterval(o), (o = null));
                            }, 1e3 / 60)),
                        u
                    );
                };
            })(),
            stop: function (n) {
                var t = null != e[n];
                return t && (e[n] = null), t;
            },
            isRunning: function (n) {
                return null != e[n];
            },
            start: function (r, i, o, a, u, f) {
                var c = n(),
                    m = c,
                    l = 0,
                    w = 0,
                    v = t++;
                if ((f || (f = document.body), v % 20 == 0)) {
                    var s = {};
                    for (var d in e) s[d] = !0;
                    e = s;
                }
                var A = function (t) {
                    var s = !0 !== t,
                        d = n();
                    if (!e[v] || (i && !i(v)))
                        return (
                            (e[v] = null),
                            void (o && o(60 - w / ((d - c) / 1e3), v, !1))
                        );
                    if (s)
                        for (
                            var q = Math.round((d - m) / (1e3 / 60)) - 1, F = 0;
                            F < Math.min(q, 4);
                            F++
                        )
                            A(!0), w++;
                    a && (l = (d - c) / a) > 1 && (l = 1);
                    var D = u ? u(l) : l;
                    (!1 !== r(D, d, s) && 1 !== l) || !s
                        ? s &&
                          ((m = d),
                          core.effect.Animate.requestAnimationFrame(A, f))
                        : ((e[v] = null),
                          o &&
                              o(
                                  60 - w / ((d - c) / 1e3),
                                  v,
                                  1 === l || null == a
                              ));
                };
                return (
                    (e[v] = !0),
                    core.effect.Animate.requestAnimationFrame(A, f),
                    v
                );
            },
        });
})();
window.Scroller,
    (function () {
        var e = function () {};
        Scroller = function (o, _) {
            (this.__callback = o),
                (this.options = {
                    scrollingX: !0,
                    scrollingY: !0,
                    animating: !0,
                    animationDuration: 250,
                    bouncing: !0,
                    locking: !0,
                    paging: !1,
                    snapping: !1,
                    zooming: !1,
                    minZoom: 0.5,
                    maxZoom: 3,
                    speedMultiplier: 1,
                    scrollingComplete: e,
                    penetrationDeceleration: 0.03,
                    penetrationAcceleration: 0.08,
                });
            for (var t in _) this.options[t] = _[t];
        };
        var o = function (e) {
                return Math.pow(e - 1, 3) + 1;
            },
            _ = function (e) {
                return (e /= 0.5) < 1
                    ? 0.5 * Math.pow(e, 3)
                    : 0.5 * (Math.pow(e - 2, 3) + 2);
            },
            t = {
                __isSingleTouch: !1,
                __isTracking: !1,
                __didDecelerationComplete: !1,
                __isGesturing: !1,
                __isDragging: !1,
                __isDecelerating: !1,
                __isAnimating: !1,
                __clientLeft: 0,
                __clientTop: 0,
                __clientWidth: 0,
                __clientHeight: 0,
                __contentWidth: 0,
                __contentHeight: 0,
                __snapWidth: 100,
                __snapHeight: 100,
                __refreshHeight: null,
                __refreshActive: !1,
                __refreshActivate: null,
                __refreshDeactivate: null,
                __refreshStart: null,
                __zoomLevel: 1,
                __scrollLeft: 0,
                __scrollTop: 0,
                __maxScrollLeft: 0,
                __maxScrollTop: 0,
                __scheduledLeft: 0,
                __scheduledTop: 0,
                __scheduledZoom: 0,
                __lastTouchLeft: null,
                __lastTouchTop: null,
                __lastTouchMove: null,
                __positions: null,
                __minDecelerationScrollLeft: null,
                __minDecelerationScrollTop: null,
                __maxDecelerationScrollLeft: null,
                __maxDecelerationScrollTop: null,
                __decelerationVelocityX: null,
                __decelerationVelocityY: null,
                setDimensions: function (e, o, _, t) {
                    var l = this;
                    e === +e && (l.__clientWidth = e),
                        o === +o && (l.__clientHeight = o),
                        _ === +_ && (l.__contentWidth = _),
                        t === +t && (l.__contentHeight = t),
                        l.__computeScrollMax(),
                        l.scrollTo(l.__scrollLeft, l.__scrollTop, !0);
                },
                setPosition: function (e, o) {
                    var _ = this;
                    (_.__clientLeft = e || 0), (_.__clientTop = o || 0);
                },
                setSnapSize: function (e, o) {
                    var _ = this;
                    (_.__snapWidth = e), (_.__snapHeight = o);
                },
                activatePullToRefresh: function (e, o, _, t) {
                    var l = this;
                    (l.__refreshHeight = e),
                        (l.__refreshActivate = o),
                        (l.__refreshDeactivate = _),
                        (l.__refreshStart = t);
                },
                triggerPullToRefresh: function () {
                    this.__publish(
                        this.__scrollLeft,
                        -this.__refreshHeight,
                        this.__zoomLevel,
                        !0
                    ),
                        this.__refreshStart && this.__refreshStart();
                },
                finishPullToRefresh: function () {
                    var e = this;
                    (e.__refreshActive = !1),
                        e.__refreshDeactivate && e.__refreshDeactivate(),
                        e.scrollTo(e.__scrollLeft, e.__scrollTop, !0);
                },
                getValues: function () {
                    var e = this;
                    return {
                        left: e.__scrollLeft,
                        top: e.__scrollTop,
                        zoom: e.__zoomLevel,
                    };
                },
                getScrollMax: function () {
                    var e = this;
                    return {
                        left: e.__maxScrollLeft,
                        top: e.__maxScrollTop,
                    };
                },
                zoomTo: function (e, o, _, t, l) {
                    var i = this;
                    if (!i.options.zooming)
                        throw new Error("Zooming is not enabled!");
                    l && (i.__zoomComplete = l),
                        i.__isDecelerating &&
                            (core.effect.Animate.stop(i.__isDecelerating),
                            (i.__isDecelerating = !1));
                    var n = i.__zoomLevel;
                    null == _ && (_ = i.__clientWidth / 2),
                        null == t && (t = i.__clientHeight / 2),
                        (e = Math.max(
                            Math.min(e, i.options.maxZoom),
                            i.options.minZoom
                        )),
                        i.__computeScrollMax(e);
                    var r = ((_ + i.__scrollLeft) * e) / n - _,
                        a = ((t + i.__scrollTop) * e) / n - t;
                    r > i.__maxScrollLeft
                        ? (r = i.__maxScrollLeft)
                        : r < 0 && (r = 0),
                        a > i.__maxScrollTop
                            ? (a = i.__maxScrollTop)
                            : a < 0 && (a = 0),
                        i.__publish(r, a, e, o);
                },
                zoomBy: function (e, o, _, t, l) {
                    var i = this;
                    i.zoomTo(i.__zoomLevel * e, o, _, t, l);
                },
                scrollTo: function (e, o, _, t) {
                    var l = this;
                    if (
                        (l.__isDecelerating &&
                            (core.effect.Animate.stop(l.__isDecelerating),
                            (l.__isDecelerating = !1)),
                        null != t && t !== l.__zoomLevel)
                    ) {
                        if (!l.options.zooming)
                            throw new Error("Zooming is not enabled!");
                        (e *= t), (o *= t), l.__computeScrollMax(t);
                    } else t = l.__zoomLevel;
                    l.options.scrollingX
                        ? l.options.paging
                            ? (e =
                                  Math.round(e / l.__clientWidth) *
                                  l.__clientWidth)
                            : l.options.snapping &&
                              (e =
                                  Math.round(e / l.__snapWidth) * l.__snapWidth)
                        : (e = l.__scrollLeft),
                        l.options.scrollingY
                            ? l.options.paging
                                ? (o =
                                      Math.round(o / l.__clientHeight) *
                                      l.__clientHeight)
                                : l.options.snapping &&
                                  (o =
                                      Math.round(o / l.__snapHeight) *
                                      l.__snapHeight)
                            : (o = l.__scrollTop),
                        (e = Math.max(Math.min(l.__maxScrollLeft, e), 0)),
                        (o = Math.max(Math.min(l.__maxScrollTop, o), 0)),
                        e === l.__scrollLeft && o === l.__scrollTop && (_ = !1),
                        l.__isTracking || l.__publish(e, o, t, _);
                },
                scrollBy: function (e, o, _) {
                    var t = this,
                        l = t.__isAnimating
                            ? t.__scheduledLeft
                            : t.__scrollLeft,
                        i = t.__isAnimating ? t.__scheduledTop : t.__scrollTop;
                    t.scrollTo(l + (e || 0), i + (o || 0), _);
                },
                doMouseZoom: function (e, o, _, t) {
                    var l = this,
                        i = e > 0 ? 0.97 : 1.03;
                    return l.zoomTo(
                        l.__zoomLevel * i,
                        !1,
                        _ - l.__clientLeft,
                        t - l.__clientTop
                    );
                },
                doTouchStart: function (e, o) {
                    if (null == e.length)
                        throw new Error("Invalid touch list: " + e);
                    if (
                        (o instanceof Date && (o = o.valueOf()),
                        "number" != typeof o)
                    )
                        throw new Error("Invalid timestamp value: " + o);
                    var _ = this;
                    (_.__interruptedAnimation = !0),
                        _.__isDecelerating &&
                            (core.effect.Animate.stop(_.__isDecelerating),
                            (_.__isDecelerating = !1),
                            (_.__interruptedAnimation = !0)),
                        _.__isAnimating &&
                            (core.effect.Animate.stop(_.__isAnimating),
                            (_.__isAnimating = !1),
                            (_.__interruptedAnimation = !0));
                    var t,
                        l,
                        i = 1 === e.length;
                    i
                        ? ((t = e[0].pageX), (l = e[0].pageY))
                        : ((t = Math.abs(e[0].pageX + e[1].pageX) / 2),
                          (l = Math.abs(e[0].pageY + e[1].pageY) / 2)),
                        (_.__initialTouchLeft = t),
                        (_.__initialTouchTop = l),
                        (_.__zoomLevelStart = _.__zoomLevel),
                        (_.__lastTouchLeft = t),
                        (_.__lastTouchTop = l),
                        (_.__lastTouchMove = o),
                        (_.__lastScale = 1),
                        (_.__enableScrollX = !i && _.options.scrollingX),
                        (_.__enableScrollY = !i && _.options.scrollingY),
                        (_.__isTracking = !0),
                        (_.__didDecelerationComplete = !1),
                        (_.__isDragging = !i),
                        (_.__isSingleTouch = i),
                        (_.__positions = []);
                },
                doTouchMove: function (e, o, _) {
                    if (null == e.length)
                        throw new Error("Invalid touch list: " + e);
                    if (
                        (o instanceof Date && (o = o.valueOf()),
                        "number" != typeof o)
                    )
                        throw new Error("Invalid timestamp value: " + o);
                    var t = this;
                    if (t.__isTracking) {
                        var l, i;
                        2 === e.length
                            ? ((l = Math.abs(e[0].pageX + e[1].pageX) / 2),
                              (i = Math.abs(e[0].pageY + e[1].pageY) / 2))
                            : ((l = e[0].pageX), (i = e[0].pageY));
                        var n = t.__positions;
                        if (t.__isDragging) {
                            var r = l - t.__lastTouchLeft,
                                a = i - t.__lastTouchTop,
                                c = t.__scrollLeft,
                                s = t.__scrollTop,
                                p = t.__zoomLevel;
                            if (null != _ && t.options.zooming) {
                                var h = p;
                                if (
                                    ((p = (p / t.__lastScale) * _),
                                    (p = Math.max(
                                        Math.min(p, t.options.maxZoom),
                                        t.options.minZoom
                                    )),
                                    h !== p)
                                ) {
                                    var f = l - t.__clientLeft,
                                        m = i - t.__clientTop;
                                    (c = ((f + c) * p) / h - f),
                                        (s = ((m + s) * p) / h - m),
                                        t.__computeScrollMax(p);
                                }
                            }
                            if (t.__enableScrollX) {
                                c -= r * this.options.speedMultiplier;
                                var g = t.__maxScrollLeft;
                                (c > g || c < 0) &&
                                    (t.options.bouncing
                                        ? (c +=
                                              (r / 2) *
                                              this.options.speedMultiplier)
                                        : (c = c > g ? g : 0));
                            }
                            if (t.__enableScrollY) {
                                s -= a * this.options.speedMultiplier;
                                var u = t.__maxScrollTop;
                                (s > u || s < 0) &&
                                    (t.options.bouncing
                                        ? ((s +=
                                              (a / 2) *
                                              this.options.speedMultiplier),
                                          t.__enableScrollX ||
                                              null == t.__refreshHeight ||
                                              (!t.__refreshActive &&
                                              s <= -t.__refreshHeight
                                                  ? ((t.__refreshActive = !0),
                                                    t.__refreshActivate &&
                                                        t.__refreshActivate())
                                                  : t.__refreshActive &&
                                                    s > -t.__refreshHeight &&
                                                    ((t.__refreshActive = !1),
                                                    t.__refreshDeactivate &&
                                                        t.__refreshDeactivate())))
                                        : (s = s > u ? u : 0));
                            }
                            n.length > 60 && n.splice(0, 30),
                                n.push(c, s, o),
                                t.__publish(c, s, p);
                        } else {
                            var v = t.options.locking ? 3 : 0,
                                T = Math.abs(l - t.__initialTouchLeft),
                                d = Math.abs(i - t.__initialTouchTop);
                            (t.__enableScrollX =
                                t.options.scrollingX && T >= v),
                                (t.__enableScrollY =
                                    t.options.scrollingY && d >= v),
                                n.push(t.__scrollLeft, t.__scrollTop, o),
                                (t.__isDragging =
                                    (t.__enableScrollX || t.__enableScrollY) &&
                                    (T >= 5 || d >= 5)),
                                t.__isDragging &&
                                    (t.__interruptedAnimation = !1);
                        }
                        (t.__lastTouchLeft = l),
                            (t.__lastTouchTop = i),
                            (t.__lastTouchMove = o),
                            (t.__lastScale = _);
                    }
                },
                doTouchEnd: function (e) {
                    if (
                        (e instanceof Date && (e = e.valueOf()),
                        "number" != typeof e)
                    )
                        throw new Error("Invalid timestamp value: " + e);
                    var o = this;
                    if (o.__isTracking) {
                        if (((o.__isTracking = !1), o.__isDragging))
                            if (
                                ((o.__isDragging = !1),
                                o.__isSingleTouch &&
                                    o.options.animating &&
                                    e - o.__lastTouchMove <= 100)
                            ) {
                                for (
                                    var _ = o.__positions,
                                        t = _.length - 1,
                                        l = t,
                                        i = t;
                                    i > 0 && _[i] > o.__lastTouchMove - 100;
                                    i -= 3
                                )
                                    l = i;
                                if (l !== t) {
                                    var n = _[t] - _[l],
                                        r = o.__scrollLeft - _[l - 2],
                                        a = o.__scrollTop - _[l - 1];
                                    (o.__decelerationVelocityX =
                                        (r / n) * (1e3 / 60)),
                                        (o.__decelerationVelocityY =
                                            (a / n) * (1e3 / 60));
                                    var c =
                                        o.options.paging || o.options.snapping
                                            ? 4
                                            : 1;
                                    Math.abs(o.__decelerationVelocityX) > c ||
                                    Math.abs(o.__decelerationVelocityY) > c
                                        ? o.__refreshActive ||
                                          o.__startDeceleration(e)
                                        : o.options.scrollingComplete();
                                } else o.options.scrollingComplete();
                            } else
                                e - o.__lastTouchMove > 100 &&
                                    o.options.scrollingComplete();
                        o.__isDecelerating ||
                            (o.__refreshActive && o.__refreshStart
                                ? (o.__publish(
                                      o.__scrollLeft,
                                      -o.__refreshHeight,
                                      o.__zoomLevel,
                                      !0
                                  ),
                                  o.__refreshStart && o.__refreshStart())
                                : ((o.__interruptedAnimation ||
                                      o.__isDragging) &&
                                      o.options.scrollingComplete(),
                                  o.scrollTo(
                                      o.__scrollLeft,
                                      o.__scrollTop,
                                      !0,
                                      o.__zoomLevel
                                  ),
                                  o.__refreshActive &&
                                      ((o.__refreshActive = !1),
                                      o.__refreshDeactivate &&
                                          o.__refreshDeactivate()))),
                            (o.__positions.length = 0);
                    }
                },
                __publish: function (e, t, l, i) {
                    var n = this,
                        r = n.__isAnimating;
                    if (
                        (r &&
                            (core.effect.Animate.stop(r),
                            (n.__isAnimating = !1)),
                        i && n.options.animating)
                    ) {
                        (n.__scheduledLeft = e),
                            (n.__scheduledTop = t),
                            (n.__scheduledZoom = l);
                        var a = n.__scrollLeft,
                            c = n.__scrollTop,
                            s = n.__zoomLevel,
                            p = e - a,
                            h = t - c,
                            f = l - s,
                            m = function (e, o, _) {
                                _ &&
                                    ((n.__scrollLeft = a + p * e),
                                    (n.__scrollTop = c + h * e),
                                    (n.__zoomLevel = s + f * e),
                                    n.__callback &&
                                        n.__callback(
                                            n.__scrollLeft,
                                            n.__scrollTop,
                                            n.__zoomLevel
                                        ));
                            },
                            g = function (e) {
                                return n.__isAnimating === e;
                            },
                            u = function (e, o, _) {
                                o === n.__isAnimating && (n.__isAnimating = !1),
                                    (n.__didDecelerationComplete || _) &&
                                        n.options.scrollingComplete(),
                                    n.options.zooming &&
                                        (n.__computeScrollMax(),
                                        n.__zoomComplete &&
                                            (n.__zoomComplete(),
                                            (n.__zoomComplete = null)));
                            };
                        n.__isAnimating = core.effect.Animate.start(
                            m,
                            g,
                            u,
                            n.options.animationDuration,
                            r ? o : _
                        );
                    } else
                        (n.__scheduledLeft = n.__scrollLeft = e),
                            (n.__scheduledTop = n.__scrollTop = t),
                            (n.__scheduledZoom = n.__zoomLevel = l),
                            n.__callback && n.__callback(e, t, l),
                            n.options.zooming &&
                                (n.__computeScrollMax(),
                                n.__zoomComplete &&
                                    (n.__zoomComplete(),
                                    (n.__zoomComplete = null)));
                },
                __computeScrollMax: function (e) {
                    var o = this;
                    null == e && (e = o.__zoomLevel),
                        (o.__maxScrollLeft = Math.max(
                            o.__contentWidth * e - o.__clientWidth,
                            0
                        )),
                        (o.__maxScrollTop = Math.max(
                            o.__contentHeight * e - o.__clientHeight,
                            0
                        ));
                },
                __startDeceleration: function (e) {
                    var o = this;
                    if (o.options.paging) {
                        var _ = Math.max(
                                Math.min(o.__scrollLeft, o.__maxScrollLeft),
                                0
                            ),
                            t = Math.max(
                                Math.min(o.__scrollTop, o.__maxScrollTop),
                                0
                            ),
                            l = o.__clientWidth,
                            i = o.__clientHeight;
                        (o.__minDecelerationScrollLeft = Math.floor(_ / l) * l),
                            (o.__minDecelerationScrollTop =
                                Math.floor(t / i) * i),
                            (o.__maxDecelerationScrollLeft =
                                Math.ceil(_ / l) * l),
                            (o.__maxDecelerationScrollTop =
                                Math.ceil(t / i) * i);
                    } else
                        (o.__minDecelerationScrollLeft = 0),
                            (o.__minDecelerationScrollTop = 0),
                            (o.__maxDecelerationScrollLeft = o.__maxScrollLeft),
                            (o.__maxDecelerationScrollTop = o.__maxScrollTop);
                    var n = function (e, _, t) {
                            o.__stepThroughDeceleration(t);
                        },
                        r = o.options.snapping ? 4 : 0.001,
                        a = function () {
                            var e =
                                Math.abs(o.__decelerationVelocityX) >= r ||
                                Math.abs(o.__decelerationVelocityY) >= r;
                            return e || (o.__didDecelerationComplete = !0), e;
                        },
                        c = function (e, _, t) {
                            (o.__isDecelerating = !1),
                                o.__didDecelerationComplete &&
                                    o.options.scrollingComplete(),
                                o.scrollTo(
                                    o.__scrollLeft,
                                    o.__scrollTop,
                                    o.options.snapping
                                );
                        };
                    o.__isDecelerating = core.effect.Animate.start(n, a, c);
                },
                __stepThroughDeceleration: function (e) {
                    var o = this,
                        _ = o.__scrollLeft + o.__decelerationVelocityX,
                        t = o.__scrollTop + o.__decelerationVelocityY;
                    if (!o.options.bouncing) {
                        var l = Math.max(
                            Math.min(o.__maxDecelerationScrollLeft, _),
                            o.__minDecelerationScrollLeft
                        );
                        l !== _ && ((_ = l), (o.__decelerationVelocityX = 0));
                        var i = Math.max(
                            Math.min(o.__maxDecelerationScrollTop, t),
                            o.__minDecelerationScrollTop
                        );
                        i !== t && ((t = i), (o.__decelerationVelocityY = 0));
                    }
                    if (
                        (e
                            ? o.__publish(_, t, o.__zoomLevel)
                            : ((o.__scrollLeft = _), (o.__scrollTop = t)),
                        !o.options.paging)
                    ) {
                        (o.__decelerationVelocityX *= 0.95),
                            (o.__decelerationVelocityY *= 0.95);
                    }
                    if (o.options.bouncing) {
                        var n = 0,
                            r = 0,
                            a = o.options.penetrationDeceleration,
                            c = o.options.penetrationAcceleration;
                        _ < o.__minDecelerationScrollLeft
                            ? (n = o.__minDecelerationScrollLeft - _)
                            : _ > o.__maxDecelerationScrollLeft &&
                              (n = o.__maxDecelerationScrollLeft - _),
                            t < o.__minDecelerationScrollTop
                                ? (r = o.__minDecelerationScrollTop - t)
                                : t > o.__maxDecelerationScrollTop &&
                                  (r = o.__maxDecelerationScrollTop - t),
                            0 !== n &&
                                (n * o.__decelerationVelocityX <= 0
                                    ? (o.__decelerationVelocityX += n * a)
                                    : (o.__decelerationVelocityX = n * c)),
                            0 !== r &&
                                (r * o.__decelerationVelocityY <= 0
                                    ? (o.__decelerationVelocityY += r * a)
                                    : (o.__decelerationVelocityY = r * c));
                    }
                },
            };
        for (var l in t) Scroller.prototype[l] = t[l];
    })();
Sys.ns("Core"),
    (Core.Orientation = {
        constructor: function () {
            Core.Orientation.superclass.constructor.apply(this, arguments),
                (this.previousResolution =
                    Utils.Platform.getViewportInnerSize()),
                this.setupEvents(),
                this.setBodyOrientationClass();
        },
        setupEvents: function () {
            this.on({
                "notify:scaling.updated": this.onScalingUpdated,
            });
        },
        isPortrait: function () {
            return "PORTRAIT" === this.getOrientation();
        },
        isLandscape: function () {
            return "LANDSCAPE" === this.getOrientation();
        },
        getOrientation: function () {
            return Utils.Platform.getOrientation();
        },
        orientationHasChanged: function () {
            var t = this.previousResolution,
                n = Utils.Platform.getViewportInnerSize();
            return (
                Math.floor(t.width / t.height) !==
                Math.floor(n.width / n.height)
            );
        },
        onScalingUpdated: function () {
            this.setBodyOrientationClass();
        },
        setBodyOrientationClass: function () {
            var t = Environment.getCurrentPlatformCSS(),
                n = this.getOrientation(),
                i = "PORTRAIT" === n ? t + "_landscape" : t + "_portrait";
            document.body.classList.remove(i),
                document.body.classList.add(t + "_" + n.toLowerCase());
        },
    }),
    (Core.Orientation = Sys.extend(
        Sys.Observable,
        Core.Orientation,
        "Core.Orientation"
    ));
Sys.ns("Game"),
    (Game.Scaling = {
        constructor: function () {
            Game.Scaling.superclass.constructor.apply(this, arguments),
                this.performiOsSpecificRoutines(),
                (this.scalingPrefix =
                    Sys.utils.getPrefixedCSSProperty("transform")),
                (this.viewport = document.getElementById("viewport")),
                this.setElementSize(this.viewport),
                this.setupEvents();
        },
        performiOsSpecificRoutines: function () {
            Platform.isIOSDevice &&
                (Utils.Platform.inIframe() ||
                    (document.body.classList.add("iOS_ui"),
                    document.body.classList.add("iOS"),
                    (Platform.isIOS13Device || Platform.isIOS14Device) &&
                        Platform.isSafariBrowser &&
                        document.body.classList.add("iOS13Safari"),
                    Platform.iPhoneWithHomeIndicator &&
                        document.body.classList.add(
                            "iPhoneWithHomeIndicator"
                        )));
        },
        setupEvents: function () {
            this.on({
                "notify:platform.resized": this.updateGameSize,
                "notify:loader.closed": this.scaleContent,
            });
        },
        onOrientationChanged: function () {
            Environment.allowsCustomCanvasSize() && this.updateGameSize();
        },
        setElementSize: function (e) {
            var t = Environment.determineResolution().resolution;
            (e.style.width = t.width + "px"),
                (e.style.height = t.height + "px"),
                (e.style[this.scalingPrefix + "Origin"] = "0 0");
        },
        scaleContent: function () {
            var e = Utils.Platform.getOrientation(),
                t = this.calculateScale();
            this.setScale(t),
                this.scaleGame(t),
                this.fireEvent("notify:viewport.scaled"),
                this.fireEvent("notify:scaling.updated"),
                this.fireEvent("notify:viewport." + e);
        },
        getScale: function () {
            return this.scale;
        },
        setScale: function (e) {
            this.scale = e;
        },
        getScreenSize: function () {
            return Utils.Platform.isFullScreenAPISupported()
                ? Utils.Platform.getViewportInnerSize()
                : Environment.getRealScreenSize();
        },
        calculateScale: function () {
            var e,
                t,
                i,
                n,
                o = Environment.determineResolution().resolution;
            return (
                (e =
                    Platform.isSafariBrowser &&
                    (Platform.isIOS13Device || Platform.isIOS14Device) &&
                    !Platform.isStandalone
                        ? Utils.Platform.getViewportInnerSize()
                        : Utils.Platform.getViewportSize()),
                (t = e.height / o.height),
                (i = e.width / o.width),
                (n = Math.min(i, t)),
                parseFloat(n.toFixed(3))
            );
        },
        scaleGame: function (e) {
            (this.viewport.style[this.scalingPrefix] = "scale(" + e + ")"),
                this.centerGame(e);
        },
        centerGame: function (e) {
            var t,
                i,
                n = Environment.determineResolution(),
                o = n.resolution,
                r = document.getElementById("viewport-wrapper");
            (t =
                Platform.isSafariBrowser &&
                (Platform.isIOS13Device || Platform.isIOS14Device)
                    ? Utils.Platform.getViewportInnerSize()
                    : Utils.Platform.getViewportSize()),
                (i =
                    Utils.Platform.isPortrait() && Platform.isMobileDevice
                        ? Math.round(n.portraitTopOffset * o.height * e)
                        : Math.round((t.height - o.height * e) / 2)),
                (this.viewport.style.top = i + "px"),
                (this.viewport.style.left =
                    Math.round((t.width - o.width * e) / 2) + "px"),
                (Platform.isMobileDevice || Platform.isTabletDevice) &&
                    r &&
                    (document.documentElement.clientWidth >=
                    document.documentElement.clientHeight
                        ? ((r.style.width = o.width * e + "px"),
                          (r.style.height = o.height * e + "px"))
                        : ((r.style.width = ""), (r.style.height = ""))),
                window.scrollTo(0, 0);
        },
        setDocumentSize: function () {
            var e = document.body.style,
                t = document.documentElement.style;
            (t.width = "100%"),
                (t.height = "100%"),
                Platform.isDesktopDevice && (t.overflow = "hidden"),
                (e.width = "100%"),
                (e.height = "100%");
        },
        updateGameSize: function () {
            this.setElementSize(this.viewport),
                this.scaleContent(),
                this.fireEvent("notify:scaling.gameSizeChanged"),
                this.forceBrowserRenderCanvas();
        },
        forceBrowserRenderCanvas: function () {
            var e = document.getElementById("canvasAnimationManager");
            e && (e.width++, e.width--);
        },
        setGameSize: function () {
            this.setElementSize(this.viewport);
        },
        formatScaleValue: function (e) {
            return parseFloat(e.toFixed(3));
        },
        getScaledFullscreenElementOffsetTop: function (e) {
            var t = Utils.Platform.getViewportInnerSize().height,
                i = Environment.determineResolution().resolution.height;
            return Math.round((t - i * e) / 2);
        },
        getScaledFullscreenElementOffsetLeft: function (e) {
            var t = Utils.Platform.getViewportInnerSize().width,
                i = Environment.determineResolution().resolution.width;
            return Math.round((t - i * e) / 2);
        },
        getScaledOffset: function (e, t) {
            return Math.round((e - t) / 2);
        },
    }),
    (Game.Scaling = Sys.extend(Sys.Observable, Game.Scaling, "Game.Scaling"));
Sys.ns("Layering"),
    (Layering.Game = {
        ResourceLoader: {
            fade: 50,
            spinner: 51,
        },
        Movie: {
            video: 50,
            button: 51,
        },
    });
Sys.ns("Layering.Game"),
    (Layering.Game.Slots = {
        BigWin: {
            text: 20,
        },
        CoinWin: {
            background: 15,
            text: 16,
        },
        FreeSpinSymbolAttentionAnimation: {
            animationItems: 2,
        },
        FreeSpinAdditional: {
            text: 20,
        },
        FreeSpinCountDown: {
            text: 20,
        },
        FreeSpinIntro: {
            skip: 121,
            background: 122,
            button: 123,
            text: 124,
        },
        FreeSpinOutro: {
            background: 120,
            backgroundImage: 121,
            button: 122,
            text: 123,
        },
        Keypad: {
            background_basic: 3,
            background_freespin: 35,
            bet: 4,
            balance: 4,
            win: 36,
            total_win: 36,
            betLevelSelector: 5,
            coinValueSelector: 5,
            maxBet: {
                button: 5,
                label: 6,
            },
            autoPlay: {
                button: 5,
                label: 6,
            },
            paytable: {
                button: 5,
                label: 6,
            },
        },
        QuickStop: {
            flash: 25,
        },
        Spin: {
            default: {
                symbols: 1,
            },
            symbols: 1,
        },
        SpreadingWild: {
            symbols: 5,
        },
        StickySymbols: {
            symbols: 5,
        },
        WinningSymbols: {
            animationItems: 10,
        },
        WinSituationsDisplay: {
            hoverBetlines: 21,
            betlines: 20,
            betlineNumberHighlight: 20,
        },
    });
Sys.ns("Loader"),
    (Loader.ResourceHandler = {
        INTEGRATION: "standard",
        AP_KEY_PREFIX: "ne_",
        AP_KEY_MAX_LENGTH: 64,
        AP_VALUE_MAX_LENGTH: 256,
        constructor: function (e) {
            (e = e || {}),
                Loader.ResourceHandler.superclass.constructor.call(this, e),
                this.setupData(e),
                this.setupEvents(),
                "function" == typeof e.callback &&
                    (this.progressCallback = e.callback),
                this.setLanguageOfHtmlTag(Resources.readData("queryData").lang);
        },
        setupData: function (e) {
            var t = Sys.utils.queryStringToObject(window.location.search);
            (this.data = {}),
                this.storeData("callback", e.callback),
                this.storeData("scriptFiles", []),
                this.storeData("cssFiles", []),
                this.storeData("totalSize", 0),
                this.storeData("scriptsAppended", !1),
                this.storeData("resourcesLoaded", !1),
                this.storeData("animationComplete", !1),
                this.storeData("animationManagerComplete", !1),
                this.storeData("deviceListPath", {
                    fallbackPath: t.staticsharedurl,
                }),
                this.storeData("detectionComplete", !1),
                this.storeData("allConfirmDialogsClosed", !1),
                this.storeData("loaderCompleted", !1),
                this.storeData(
                    "soundDecoded",
                    !Utils.Platform.isWebAudioAPISupported()
                ),
                Resources.storeData("queryData", t),
                Resources.storeData("extraParams", {
                    wantsfreerounds: !0,
                    freeroundmode: !1,
                    wantsreels: !0,
                }),
                Resources.storeData("language", {
                    defaultLang: "en",
                    lang: t.lang,
                });
        },
        setupEvents: function () {
            this.on({
                "notify:animationManager.loadingProgress":
                    this.onAnimationManagerLoadingProgress,
                "notify:animationManager.allImagesLoaded":
                    this.onAnimationManagerLoadingComplete,
                "notify:loader.animationComplete":
                    this.onLoaderAnimationComplete,
                "notify:gcmProxy.animationComplete":
                    this.onLoaderAnimationComplete,
                "notify:loader.confirmDialogClosed":
                    this.onRequestedConfirmDialogsClosed,
                "notify:deviceDetector.validationComplete":
                    this.onDetectionComplete,
                "notify:deviceDetector.finished":
                    this.onRequestedConfirmDialogsClosed,
            });
        },
        progressCallback: function (e) {
            this.fireEvent("request:loader.updateProgress", e),
                this.fireEvent("request:gcmProxy.updateProgress", e);
        },
        preLoad: function () {
            var e,
                t,
                a = this,
                s = new Sys.Deferred();
            this.fireEvent("request:loader.show"),
                this.storeData("startTime", Date.now()),
                this.isDeviceDetectionDisabled(),
                (e = this.determineSessionID()),
                e
                    ? (t = s.when(e).then(function () {
                          return a.gameServerInit();
                      }))
                    : (this.determinePluginURL(),
                      this.determineLobbyURL(),
                      this.handleNonCompliantScenarios(),
                      (t = s.when(this.gameServerInit()))),
                t
                    .then(function () {
                        return a.loadResourcesXML();
                    })
                    .then(function () {
                        return (
                            a.addDynamicPriorityResources(),
                            a.loadResources("priorityList")
                        );
                    })
                    .done(function () {
                        a.fireEvent(
                            "notify:resourceHandler.priorityListComplete"
                        );
                    });
        },
        load: function () {
            var e = this,
                t = new Sys.Deferred();
            this.addPlatformSpecificResourcesToGenericList(),
                t
                    .when(this.loadResources("genericList"))
                    .fail(function (t) {
                        e.fireEvent(
                            "request:loaderErrorHandler.handleRequestError",
                            t
                        );
                    })
                    .done(function () {
                        e.storeData("loaderCompleted", !0),
                            e.onLoaderComplete();
                    });
        },
        isDeviceDetectionDisabled: function () {
            var e = Resources.readData("queryData");
            "boolean" == typeof e.disableDeviceDetection &&
                Resources.storeData(
                    "disableDeviceDetection",
                    e.disableDeviceDetection
                );
        },
        determineSessionID: function () {
            var e = Resources.readData("queryData"),
                t = e.callbackurl,
                a = e.sessId,
                s = e.integration;
            return Sys.isDefined(t) && Sys.isDefined(s)
                ? this.performServletCall(t, s)
                : (Sys.isDefined(a) || Sys.utils.goToLobby(1),
                  this.storeSessionID(a),
                  null);
        },
        determinePluginURL: function () {
            var e = Resources.readData("queryData");
            Sys.isDefined(e.pluginURL) &&
                Resources.storeData("pluginURL", e.pluginURL);
        },
        determineLobbyURL: function (e) {
            var t = Resources.readData("queryData");
            Sys.isDefined(e)
                ? Resources.storeData("lobbyUrl", e)
                : Sys.isDefined(t.lobbyURL) &&
                  Resources.storeData("lobbyUrl", t.lobbyURL);
        },
        performServletCall: function (e, t) {
            var a,
                s = this,
                r = new Sys.Deferred();
            return (
                t === this.INTEGRATION
                    ? ("openbet" === t &&
                          ((a = "no-cache=" + Number(Date.now())),
                          (e = Sys.utils.appendParameterToQuery(e, a))),
                      r
                          .when(
                              Sys.utils.httpGet({
                                  url: e,
                                  useCredentials: !0,
                              })
                          )
                          .fail(function () {
                              Sys.utils.goToLobby(1);
                          })
                          .done(function (e) {
                              s.handleServletResponse(e);
                          }))
                    : Sys.utils.goToLobby(1),
                r
            );
        },
        handleServletResponse: function (e) {
            var t = Sys.utils.parseQueryString(e.responseText),
                a = t.playerSessionId,
                s = t.pluginURL,
                r = t.lobbyURL;
            Sys.isDefined(a)
                ? this.storeSessionID(decodeURIComponent(a))
                : Sys.utils.goToLobby(1),
                Sys.isDefined(s)
                    ? Resources.storeData("pluginURL", decodeURIComponent(s))
                    : this.determinePluginURL(),
                this.determineLobbyURL(r),
                this.handleNonCompliantScenarios();
        },
        handleNonCompliantScenarios: function () {
            Utils.Platform.handleNonCompliantScenarios();
        },
        storeSessionID: function (e) {
            this.storeData("sessionID", e), Resources.storeData("sessionID", e);
        },
        onDetectionComplete: function (e) {
            e && (this.storeData("detectionComplete", !0), this.load());
        },
        onRequestedConfirmDialogsClosed: function () {
            this.storeData("allConfirmDialogsClosed", !0),
                this.readData("loaderCompleted") && this.initGameIfPossible();
        },
        addPlatformSpecificResourcesToGenericList: function () {
            var e = this.readData("genericList"),
                t = this.readData("dynamicallyLoadedResources"),
                a = this.readData("totalSize");
            Platform.PlatformManager.determineResourceBundle(),
                Sys.iterate(
                    Platform.resourceBundle.loaderResourceKeys,
                    function (s, r) {
                        var o = t[s][r];
                        o && (e.push(o), (a += o.size));
                    }
                ),
                this.storeData("genericList", e),
                this.storeData("totalSize", a);
        },
        addDynamicPriorityResources: function () {
            var e = this.readData("priorityList"),
                t = this.readData("priorityDynamicallyLoadedResources"),
                a = this.readData("totalSize");
            Platform.PlatformManager.determineResourceBundle(),
                Sys.iterate(
                    Platform.resourceBundle.loaderResourceKeys,
                    function (s, r) {
                        var o = t[s] && t[s][r];
                        o && (e.push(o), (a += o.size));
                    }
                ),
                this.storeData("priorityList", e),
                this.storeData("totalSize", a);
        },
        gameServerInit: function () {
            var e = this;
            return new Sys.Deferred()
                .when(
                    Sys.utils.httpGet({
                        url: this.createInitQuery().getQuery(),
                    })
                )
                .fail(function (t) {
                    e.fireEvent(
                        "request:loaderErrorHandler.handleRequestError",
                        t
                    );
                })
                .done(function (t) {
                    e.gameServerInitComplete(t);
                });
        },
        loadResourcesXML: function () {
            var e = this;
            return new Sys.Deferred()
                .when(
                    Sys.utils.httpGet({
                        url: "resources.xml",
                    })
                )
                .fail(function (t) {
                    e.fireEvent(
                        "request:loaderErrorHandler.handleRequestError",
                        t
                    );
                })
                .done(function (t) {
                    e.parseResourceXml(t);
                });
        },
        loadResources: function (e) {
            var t = this,
                a = this.readData(e),
                s = new Sys.Deferred(),
                r = [],
                o = this.readData("resources") || {};
            return (
                a.forEach(function (a) {
                    var s,
                        i = a.type,
                        n = t.getPathFromName(a),
                        l = new Sys.Deferred(),
                        u = "audio" === i ? "arraybuffer" : void 0;
                    "genericList" === e &&
                        (s = function (e, a) {
                            t.onResourcesProgressCallback(e, a);
                        }),
                        "css" === i && t.cssComplete("", a.name, a.url),
                        l
                            .when(
                                Sys.utils.httpGet({
                                    url: n,
                                    name: a.name,
                                    onProgressCallback: s,
                                    responseType: u,
                                })
                            )
                            .fallback(function (e) {
                                return t.onLoadResourceError(e, a);
                            })
                            .done(function (e) {
                                var s = t[i + "Complete"];
                                Sys.isDefined(s)
                                    ? "css" !== i && s.call(t, e, a.name, a.url)
                                    : Resources.storeData(
                                          a.name + "Response",
                                          e
                                      );
                            }),
                        (o[a.name] = 0),
                        r.push(l);
                }),
                this.storeData("resources", o),
                s.when(r),
                s
            );
        },
        onLoadResourceError: function (e, t) {
            var a,
                s = this,
                r = Resources.readData("language"),
                o = "languageJSON" === t.name || "languageXML" === t.name;
            if (o && r.lang !== r.defaultLang)
                return (
                    (a = this.getLanguagePath(r.defaultLang, t.type, t.url)),
                    (r.lang = r.defaultLang),
                    Sys.utils
                        .httpGet({
                            url: a,
                            name: t.name,
                        })
                        .fail(function (e) {
                            s.fireEvent(
                                "request:loaderErrorHandler.handleRequestError",
                                e
                            );
                        })
                        .done(function (e) {
                            s[t.type + "Complete"](e, t.name, t.url);
                        })
                );
            this.fireEvent("request:loaderErrorHandler.handleRequestError", e);
        },
        onResourcesProgressCallback: function (e, t) {
            (this.readData("resources")[t] = e.loaded),
                this.onProgressCallback();
        },
        onProgressCallback: function () {
            this.calculatePercentage(), this.checkLoadSpeed();
        },
        onAnimationManagerLoadingProgress: function (e) {
            this.storeData("animationManagerProgress", e),
                this.onProgressCallback();
        },
        onAnimationManagerLoadingComplete: function () {
            this.storeData("animationManagerProgress", 1),
                this.storeData("animationManagerComplete", !0),
                this.onProgressCallback();
        },
        calculatePercentage: function () {
            var e,
                t,
                a = this.readData("resources"),
                s = this.readData("totalSize"),
                r = this.readData("resourcesLoaded"),
                o = this.readData("animationManagerComplete"),
                i = Math.min(this.readData("animationManagerProgress") || 0, 1),
                n = 0;
            o && (i = 1),
                r
                    ? (e = 1)
                    : (Object.keys(a).forEach(function (e) {
                          n += a[e];
                      }),
                      (e = Math.min(n / s, 1))),
                (t = parseInt(Math.min(((e + i) / 2) * 100, 100), 10)),
                this.storeData("percentageLoaded", t),
                this.progressCallback(t);
        },
        checkLoadSpeed: function () {
            var e = this.readData("startTime"),
                t = this.readData("totalSize"),
                a = this.readData("status"),
                s = 0.024 * t;
            "slow" !== a && Date.now() - e > s && this.slownessDetected();
        },
        slownessDetected: function () {
            var e = {
                    action: function () {
                        Sys.utils.goToLobby(
                            Utils.CONSTANTS.REASON_CODES.TECHNICAL_ERROR
                        );
                    },
                    label: Services.languageManager.hasText(
                        Language.Keys.btn_casino
                    )
                        ? Services.languageManager.getText(
                              Language.Keys.btn_casino
                          )
                        : "Home",
                    scope: this,
                },
                t = {
                    action: function () {
                        Sys.utils.reload();
                    },
                    label: Services.languageManager.hasText(
                        Language.Keys.btn_reload
                    )
                        ? Services.languageManager.getText(
                              Language.Keys.btn_reload
                          )
                        : "Reload",
                    scope: this,
                },
                a = {
                    texts: [
                        Services.languageManager.hasText(
                            Language.Keys.loadingTakesLonger
                        )
                            ? Services.languageManager.getText(
                                  Language.Keys.loadingTakesLonger
                              )
                            : "Loading the game is taking longer than usual.",
                    ],
                    buttons: Sys.utils.isHomeAvailable() ? [e, t] : [t],
                    severity: "slow",
                };
            this.storeData("status", "slow"),
                this.fireEvent("request:loader.showDialog", a);
        },
        onLoaderComplete: function () {
            this.storeData("resourcesLoaded", !0),
                this.fireEvent("notify:resourceHandler.resourcesLoaded"),
                this.storeMoneyInfo(),
                this.onProgressCallback(),
                this.initGameIfPossible();
        },
        onLoaderAnimationComplete: function () {
            this.fireEvent("notify:resourceHandler.animationComplete"),
                this.storeData("animationComplete", !0),
                this.initGameIfPossible();
        },
        initGameIfPossible: function () {
            !this.readData("scriptsAppended") &&
                this.readData("resourcesLoaded") &&
                this.readData("allConfirmDialogsClosed") &&
                (this.fireEvent("notify:resourceHandler.gameAssetsLoaded"),
                this.appendScriptFiles());
        },
        gameServerInitComplete: function (e) {
            Resources.storeData(
                "gameServerInitResponse",
                Sys.utils.queryStringToObject(e.responseText)
            ),
                Resources.storeData(
                    "gameServerInitResponseObject",
                    Sys.utils.parseQueryString(e.responseText, !0)
                ),
                Resources.storeData(
                    "unParsedGameServerInitResponse",
                    e.responseText
                ),
                Resources.storeData("historyUrl", this.buildHistoryUrl());
        },
        jsonComplete: function (e, t) {
            Resources.storeData(t, JSON.parse(e.responseText));
        },
        priorityAudioJsonComplete: function (e, t) {
            var a = JSON.parse(e.responseText);
            Platform.resourceBundle.preloadAudio &&
                this.addAudioToGenericList(a),
                Resources.storeData(t, a);
        },
        addAudioToGenericList: function (e) {
            var t = e.files.main,
                a =
                    Sys.isDefined(e.fileSizes) &&
                    Sys.isDefined(e.fileSizes.main)
                        ? e.fileSizes.main
                        : {},
                s = this.readData("genericList"),
                r = this.readData("totalSize");
            Sys.isObj(t)
                ? Object.keys(t).forEach(function (e) {
                      s.push({
                          url: t[e],
                          type: "audio",
                          name: e,
                          size: 1e5,
                          loadComplete: !1,
                      }),
                          (r += a[e] || 1e5);
                  })
                : (s.push({
                      url: t,
                      type: "audio",
                      name: "main",
                      size: 1e5,
                      loadComplete: !1,
                  }),
                  (r += a || 1e5)),
                this.storeData("genericList", s),
                this.storeData("totalSize", r);
        },
        audioComplete: function (e, t) {
            var a = Resources.readData("preloadedAudio") || {};
            (a["main/" + t] = e.response),
                Resources.storeData("preloadedAudio", a);
        },
        xmlComplete: function (e, t) {
            if (("languageJSON" === t || "languageXML" === t) && !e.responseXML)
                throw (
                    (this.fireEvent(
                        "request:loaderErrorHandler.showTechnicalError"
                    ),
                    new Error(
                        "Unable to parse language file xml. Aborting game."
                    ))
                );
            Resources.storeData(t, e.responseXML);
        },
        cssComplete: function (e, t, a) {
            var s = this.readData("cssFiles"),
                r = document.createElement("link");
            r.setAttribute("rel", "stylesheet"),
                r.setAttribute("type", "text/css"),
                r.setAttribute("href", a),
                s.push(r),
                this.storeData("cssFiles", s);
        },
        javascriptComplete: function (e, t, a) {
            var s = this.readData("scriptFiles"),
                r = document.createElement("script");
            (r.type = "text/javascript"),
                (r.charset = "utf-8"),
                (r.src = a),
                s.push(r),
                this.storeData("scriptFiles", s);
        },
        appendScriptFiles: function () {
            var e = document.getElementsByTagName("head")[0];
            this.readData("cssFiles").forEach(function (t) {
                e.appendChild(t);
            }),
                this.readData("scriptFiles").forEach(function (t) {
                    e.appendChild(t);
                }),
                this.storeData("scriptsAppended", !0);
        },
        preloadAudioComplete: function (e, t) {
            Resources.storeData(t, JSON.parse(e.responseText)),
                Resources.processAudio(t);
        },
        getLanguagePath: function (e, t, a) {
            var s = null;
            return (
                "json" === t
                    ? (s = a + this.setCorrectCasing(e) + ".json")
                    : "xml" === t &&
                      (s = "../langlib/" + this.setCorrectCasing(e) + "/" + a),
                s
            );
        },
        getPathFromName: function (e) {
            var t = e.name,
                a = e.url,
                s = a,
                r = Resources.readData("gameServerInitResponse");
            return (
                "languageJSON" === t || "languageXML" === t
                    ? (s = this.getLanguagePath(
                          Resources.readData("language").lang,
                          e.type,
                          e.url
                      ))
                    : "moneyformat_player" === t
                    ? (s =
                          "../../../currencies/" +
                          r.playercurrencyiso.toLowerCase() +
                          "/" +
                          a)
                    : "moneyformat_jackpot" === t
                    ? (s =
                          "../../../currencies/" +
                          r.jackpotcurrencyiso.toLowerCase() +
                          "/" +
                          a)
                    : ("deviceDetection" !== t &&
                          "deviceDetectionJson" !== t) ||
                      (s =
                          (r.staticsharedurl ||
                              this.readData("deviceListPath").fallbackPath) +
                          "/" +
                          a),
                s
            );
        },
        setCorrectCasing: function (e) {
            return e.match(/[a-z]{2}_[a-z]{2}/i)
                ? e.substr(0, 2).toLowerCase() +
                      "_" +
                      e.substr(3, 2).toUpperCase()
                : e.toLowerCase();
        },
        createInitQuery: function () {
            var e = this.getSessionId(),
                t = Resources.readData("queryData"),
                a = Resources.readData("extraParams"),
                s = Sys.utils.objToQueryStrHavingPrefixValue(
                    Resources.readData("queryData"),
                    this.AP_KEY_PREFIX,
                    this.AP_KEY_MAX_LENGTH,
                    this.AP_VALUE_MAX_LENGTH
                );

            return (
                Resources.storeData("arbitraryParameters", s),
                {
                    serverStr:
                        "/game/NarcosNET/server?sessionId=" +
                        sessionStorage.getItem("sessionId"),
                    initStr: "&action=init&sessid=" + e + "&gameId=" + t.gameId,
                    extraParams: Sys.utils.objectToQueryString(a),
                    noCache: "&no-cache=" + Math.round(Date.now()),
                    arbitraryParameters: s,
                    getQuery: function () {
                        var e,
                            t = "";
                        for (e in this)
                            this.hasOwnProperty(e) &&
                                "string" == typeof this[e] &&
                                (t += this[e]);
                        return t;
                    },
                }
            );
        },
        getSessionId: function () {
            return Resources.readData("sessionID");
        },
        shouldSkipDeviceDetection: function (e) {
            var t = Boolean(Resources.readData("disableDeviceDetection"));
            return (
                !(
                    ("deviceDetectionJson" !== e && "deviceDetection" !== e) ||
                    !t
                ) && t
            );
        },
        parseResourceXml: function (e) {
            var t = Sys.utils.XMLHelper.toJSON(e.responseXML),
                a = t.children[0].children,
                s = [],
                r = [],
                o = {},
                i = {},
                n = 0,
                l = this;
            a.forEach(function (e) {
                e.findAll("resource").forEach(function (e) {
                    var t,
                        a,
                        u,
                        c,
                        d = {
                            url: "",
                            type: "",
                            size: "",
                            loadComplete: !1,
                        };
                    (d.type = e.find("type").text),
                        (d.url = e.find("url").text),
                        (d.size = Sys.utils.toInt(e.find("size").text)),
                        (d.name = e.find("name").text),
                        (t = e.find("priority")),
                        (a = e.find("resourceTag")),
                        l.shouldSkipDeviceDetection(d.name) ||
                            (null !== t
                                ? null !== a
                                    ? ((u = a.find("type").text),
                                      (c = a.find("key").text),
                                      Sys.isDefined(i[u]) || (i[u] = {}),
                                      (i[u][c] = d))
                                    : ((d.priority = t.text), s.push(d))
                                : null !== a
                                ? ((u = a.find("type").text),
                                  (c = a.find("key").text),
                                  Sys.isDefined(o[u]) || (o[u] = {}),
                                  (o[u][c] = d))
                                : (r.push(d), (n += d.size)));
                });
            }),
                this.storeData("totalSize", n),
                this.storeData("priorityList", s),
                this.storeData("genericList", r),
                this.storeData("dynamicallyLoadedResources", o),
                this.storeData("priorityDynamicallyLoadedResources", i);
        },
        buildHistoryUrl: function () {
            var e = Resources.readData("queryData"),
                t = e.server;
            return (
                "/" !== t[t.length - 1] && (t += "/"),
                (t +=
                    "game/history?lang=" +
                    e.lang +
                    "&sessionId=" +
                    Resources.readData("sessionID")),
                Platform.isDesktopDevice || (t += "&type=mobile"),
                t
            );
        },
        readData: function (e) {
            return this.data[e];
        },
        storeData: function (e, t) {
            this.data[e] = t;
        },
        setLanguageOfHtmlTag: function (e) {
            document.documentElement.lang = e;
        },
        storeMoneyInfo: function () {
            var e,
                t = Resources.readData("queryData"),
                a = Resources.readData("gameServerInitResponseObject"),
                s = {
                    bettingMode: t.bettingMode,
                    defaultBettingMode: t.defaultBettingMode,
                },
                r = this.getSppConfig(a);
            (e = Sys.utils.getMoneyConfig(s, r)),
                Resources.storeData("moneyTypes", e),
                Resources.storeData("defaultBettingMode", e.defaultBettingMode);
        },
        getSppConfig: function (e) {
            var t = {};
            return (
                e.config &&
                    e.config.bettingMode &&
                    (t = {
                        bettingMode: e.config.bettingMode.bettingMode,
                        defaultBettingMode:
                            e.config.bettingMode.defaultBettingMode,
                    }),
                t
            );
        },
    }),
    (Loader.ResourceHandler = Sys.extend(
        Sys.Observable,
        Loader.ResourceHandler,
        "Loader.ResourceHandler"
    ));
Sys.ns("Loader"),
    (Loader.DeviceDetector = {
        constructor: function () {
            Loader.DeviceDetector.superclass.constructor.call(this),
                this.setupEvents();
        },
        setupEvents: function () {
            var e = this;
            e.on({
                "notify:resourceHandler.priorityListComplete":
                    e.onPriorityListComplete,
            });
        },
        onPriorityListComplete: function () {
            this.performValidation();
        },
        performValidation: function () {
            var e,
                t = this,
                i = Core.DeviceDetectionCodes,
                o = Resources.readData("deviceDetectionJson");
            if (Resources.readData("disableDeviceDetection"))
                e = {
                    preferredBrowser: null,
                    allowed: !0,
                    code: i.WHITE,
                };
            else
                try {
                    e = Core.DeviceDetectionService.validate(
                        navigator.userAgent,
                        o
                    );
                } catch (e) {
                    return void t.fireEvent(
                        "request:loaderErrorHandler.showTechnicalError"
                    );
                }
            switch (e.code) {
                case i.WHITE:
                    t.handleWhiteListedCombination();
                    break;
                case i.GREY_OS:
                    t.handleGreyListedCombination(
                        Services.languageManager.getText(
                            Language.Keys.MGnoOSSupport
                        )
                    );
                    break;
                case Core.DeviceDetectionCodes.GREY_OS_VERSION:
                    t.handleGreyListedCombination(
                        Services.languageManager.getText(
                            Language.Keys.deviceBestGameExperience
                        )
                    );
                    break;
                case Core.DeviceDetectionCodes.GREY_BROWSER:
                    t.handleGreyListedCombination(
                        Services.languageManager.getText(
                            Language.Keys.optimisedForVersion,
                            [e.preferredBrowser]
                        )
                    );
                    break;
                case Core.DeviceDetectionCodes.GREY_BROWSER_VERSION:
                    t.handleGreyListedCombination(
                        Services.languageManager.getText(
                            Language.Keys.deviceUpdateBrowser
                        )
                    );
                    break;
                case i.BLACK_OS:
                case i.BLACK_OS_VERSION:
                case i.BLACK_BROWSER:
                case i.BLACK_BROWSER_VERSION:
                    t.handleBlackListedCombination();
                    break;
                default:
                    t.fireEvent(
                        "request:loaderErrorHandler.showTechnicalError"
                    );
            }
        },
        handleWhiteListedCombination: function () {
            this.fireEvent("notify:deviceDetector.validationComplete", !0),
                this.fireEvent("notify:deviceDetector.finished");
        },
        handleGreyListedCombination: function (e) {
            var t = this,
                i = {
                    proceed: {
                        label: Services.languageManager.getText(
                            Language.Keys.btn_continue
                        ),
                        action: function () {
                            t.fireEvent("notify:deviceDetector.finished"),
                                t.fireEvent("request:loader.hideDialog");
                        },
                    },
                    casinoLobby: {
                        label: Services.languageManager.getText(
                            Language.Keys.btn_casino
                        ),
                        action: function () {
                            Sys.utils.goToLobby(
                                Utils.CONSTANTS.REASON_CODES
                                    .DEVICE_NOT_SUPPORTED
                            );
                        },
                    },
                };
            t.fireEvent("notify:deviceDetector.validationComplete", !0),
                t.showDialog({
                    texts: [e],
                    buttons: Sys.utils.isHomeAvailable()
                        ? [i.casinoLobby, i.proceed]
                        : [i.proceed],
                    confirmDialog: {
                        id: "deviceDetector.greyList",
                    },
                });
        },
        handleBlackListedCombination: function () {
            var e = this,
                t = {
                    casinoLobby: {
                        label: Services.languageManager.getText(
                            Language.Keys.btn_casino
                        ),
                        action: function () {
                            Sys.utils.goToLobby(
                                Utils.CONSTANTS.REASON_CODES
                                    .DEVICE_NOT_SUPPORTED
                            );
                        },
                    },
                };
            e.fireEvent("notify:deviceDetector.validationComplete", !1),
                e.showDialog({
                    texts: [
                        Services.languageManager.getText(
                            Language.Keys.MGdeviceNoSupport
                        ),
                    ],
                    buttons: Sys.utils.isHomeAvailable() ? [t.casinoLobby] : [],
                    severity: "stopped",
                });
        },
        showDialog: function (e) {
            this.fireEvent("request:loader.showDialog", e),
                this.handleIntegrationSpecificDialogs(e);
        },
        handleIntegrationSpecificDialogs: function (e) {},
    }),
    (Loader.DeviceDetector = Sys.extend(
        Sys.Observable,
        Loader.DeviceDetector,
        "Loader.DeviceDetector"
    ));
Sys.ns("Core"),
    (Core.LoaderController = {
        MINIMUM_LOADING_TIME: 3e3,
        LOADER_PERCENTAGE_STEP: 0.2,
        constructor: function () {
            Core.LoaderController.superclass.constructor.apply(this, arguments);
        },
        init: function () {
            Core.LoaderController.superclass.init.apply(this, arguments),
                this.model.storeData("delayedMessages", []),
                this.model.storeData("visualPercentage", 0),
                this.model.storeData("progress", 0),
                this.model.storeData("resourcesLoaded", !1);
        },
        setupEvents: function () {
            this.on({
                "request:loader.show": this.show,
                "request:loader.hide": this.hide,
                "request:loader.showDialog": this.showDialog,
                "request:loader.hideDialog": this.hideDialog,
                "request:loader.updateProgress": this.updateProgress,
                "notify:resourceHandler.resourcesLoaded":
                    this.onResourcesLoaded,
                "notify:stateHandler.leavingBeforeLoaderCloseState":
                    this.onLeavingBeforeLoaderCloseState.bind(this),
            });
        },
        onLeavingBeforeLoaderCloseState: function () {
            Utils.Helpers.logData("GCS_GAME_READY"), this.hide();
        },
        updateProgress: function (e) {
            this.model.storeData(
                "progress",
                Sys.clamp({
                    value: parseFloat(e, 10) || 0,
                    min: 0,
                    max: 100,
                })
            );
        },
        onResourcesLoaded: function () {
            this.model.storeData("resourcesLoaded", !0);
        },
        tick: function () {
            var e = this,
                t = this.model.readData("visualPercentage"),
                o = Date.now() - this.startTime,
                s = Math.min((o / (this.MINIMUM_LOADING_TIME || 1)) * 100, 100),
                a = Math.min(s, this.model.readData("progress"));
            t !== a &&
                (this.model.storeData("visualPercentage", a),
                this.view.updateLoaderBar(),
                this.model.readData("resourcesLoaded") &&
                    this.showDialogFromQueue(),
                a >= 100 &&
                    (clearInterval(this.tickInterval),
                    setTimeout(function () {
                        e.fireEvent("notify:loader.animationComplete");
                    }, this.MINIMUM_LOADING_TIME *
                        this.LOADER_PERCENTAGE_STEP)));
        },
        show: function () {
            var e = this;
            (this.startTime = Date.now()),
                clearInterval(this.tickInterval),
                (this.tickInterval = setInterval(function () {
                    e.tick();
                }, this.MINIMUM_LOADING_TIME * this.LOADER_PERCENTAGE_STEP)),
                this.view.show();
        },
        hide: function () {
            this.view.destroy(), this.fireEvent("notify:loader.closed");
        },
        showDialog: function (e) {
            if (!Sys.isObj(e))
                throw new Error("Invalid dialog config received:", e);
            this.fireEvent("request:userInputManager.allowPropagation"),
                "stopped" === e.severity || "slow" === e.severity
                    ? ("stopped" === e.severity &&
                          (clearInterval(this.tickInterval),
                          this.model.storeData("error", !0),
                          this.model.storeData("visualPercentage", 100),
                          this.view.updateLoaderBar()),
                      this.view.showDialog(e))
                    : this.model.storeData(
                          "delayedMessage",
                          this.model.readData("delayedMessages").push(e)
                      );
        },
        hideDialog: function () {
            this.fireEvent("notify:loader.confirmDialogClosed"),
                this.view.hideDialog(),
                this.fireEvent("request:userInputManager.disAllowPropagation"),
                this.model.readData("resourcesLoaded") &&
                    this.showDialogFromQueue();
        },
        showDialogFromQueue: function () {
            var e = this.model.readData("delayedMessages");
            e.length && this.view.showDialog(e.pop());
        },
    }),
    (Core.LoaderController = Sys.extend(
        Core.Controller,
        Core.LoaderController,
        "Core.LoaderController"
    ));
Sys.ns("Core"),
    (Core.LoaderView = {
        ANIMATION_DELAY: 100,
        LOGO_SVG: {
            tag: "svg",
            attributes: {
                version: "1.1",
                viewBox: "0 0 258 92",
                xmlns: "http://www.w3.org/2000/svg",
                class: "logo-svg",
            },
            children: [
                {
                    tag: "defs",
                    attributes: {},
                    children: [
                        {
                            tag: "clipPath",
                            attributes: {
                                id: "netMask",
                            },
                            children: [
                                {
                                    tag: "rect",
                                    attributes: {
                                        x: "0",
                                        y: "0",
                                        width: "135px",
                                        height: "92px",
                                    },
                                    children: [],
                                },
                            ],
                        },
                        {
                            tag: "clipPath",
                            attributes: {
                                id: "entMask",
                            },
                            children: [
                                {
                                    tag: "rect",
                                    attributes: {
                                        x: "136",
                                        y: "0",
                                        width: "245.427px",
                                        height: "92px",
                                    },
                                    children: [],
                                },
                            ],
                        },
                    ],
                },
                {
                    tag: "g",
                    attributes: {
                        id: "logo",
                    },
                    children: [
                        {
                            tag: "path",
                            attributes: {
                                id: "line",
                                class: "logo-svg__logo-line logo-parts-fill",
                                d: "M 135,0 L 137.393,0 L 137.393,91.447 L 135,91.447 L 135,0 Z",
                                "shape-rendering": "crispEdges",
                            },
                            children: [],
                        },
                        {
                            tag: "g",
                            attributes: {
                                "clip-path": "url(#netMask)",
                            },
                            children: [
                                {
                                    tag: "g",
                                    attributes: {
                                        class: "logo-svg__net-wrapper",
                                    },
                                    children: [
                                        {
                                            tag: "path",
                                            attributes: {
                                                d: "M 31.69,51.93 L 22.25,36.651 L 10.15,17.731 L 10.032,17.542 L 0.003,17.542 L 0.003,73.621 L 11.133,73.621 L 11.133,39.151 L 19.432,52.581 L 32.78,73.621 L 42.89,73.621 L 42.89,17.541 L 31.692,17.541 L 31.692,51.93 L 31.692,51.93 M 31.692,51.93 ",
                                            },
                                            children: [],
                                        },
                                        {
                                            tag: "path",
                                            attributes: {
                                                d: "M 49.15,73.62 L 85.91,73.62 L 85.91,63.001 L 60.35,63.001 L 60.35,50.772 L 82.199,50.772 L 82.199,40.074 L 60.35,40.074 L 60.35,28.245 L 85.91,28.245 L 85.91,17.547 L 49.15,17.547 L 49.15,73.627 L 49.15,73.627 M 49.15,73.627 ",
                                            },
                                            children: [],
                                        },
                                        {
                                            tag: "path",
                                            attributes: {
                                                d: "M 90.419,28.319 L 103.268,28.319 L 103.268,73.619 L 114.468,73.619 L 114.468,28.319 L 127.237,28.319 L 127.237,17.54 L 90.418,17.54 L 90.418,28.319 L 90.418,28.319 M 90.418,28.319 ",
                                            },
                                            children: [],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            tag: "g",
                            attributes: {
                                "clip-path": "url(#entMask)",
                            },
                            children: [
                                {
                                    tag: "g",
                                    attributes: {
                                        class: "logo-svg__ent-wrapper",
                                    },
                                    children: [
                                        {
                                            tag: "path",
                                            attributes: {
                                                d: "M 135,73.621 L 168.309,73.621 L 168.309,63.002 L 142.753,63.002 L 142.753,50.773 L 164.601,50.773 L 164.601,40.075 L 142.753,40.075 L 142.753,28.246 L 168.309,28.246 L 168.309,17.548 L 135,17.548 ",
                                            },
                                            children: [],
                                        },
                                        {
                                            tag: "path",
                                            attributes: {
                                                d: "M 205.6,52.02 L 196.162,36.75 L 184.064,17.83 L 183.947,17.631 L 173.92,17.631 L 173.92,73.709 L 185.039,73.709 L 185.039,39.24 L 193.339,52.669 L 206.699,73.709 L 216.809,73.709 L 216.809,17.63 L 205.61,17.63 L 205.61,52.02 L 205.61,52.02 M 205.61,52.02 ",
                                            },
                                            children: [],
                                        },
                                        {
                                            tag: "path",
                                            attributes: {
                                                d: "M 221.38,17.629 L 221.38,28.408 L 234.228,28.408 L 234.228,73.706 L 245.427,73.706 L 245.427,28.407 L 258.196,28.407 L 258.196,17.627 L 221.377,17.627 L 221.377,17.627 M 221.377,17.627 ",
                                            },
                                            children: [],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        SLOGAN_SVG: {
            tag: "svg",
            attributes: {
                viewBox: "0 0 195.8 22.1",
                class: "slogan-svg",
            },
            children: [
                {
                    tag: "path",
                    attributes: {
                        d: "M8.8 21.9h-8.8v-18.7h8.4c3.8 0 5.4 2.4 5.4 5.1 0 1.4-.7 3-2.3 3.8 1.8.9 2.6 2.8 2.6 4.3.1 2.9-1.8 5.5-5.3 5.5zm-1.3-15.4h-3.8v4.1h3.8c1.5 0 2.5-.8 2.5-2 0-1.4-.8-2.1-2.5-2.1zm.2 7.3h-4v4.8h4c1.7 0 2.5-.9 2.5-2.4 0-1.4-.9-2.4-2.5-2.4zM15.9 3.2h12.9v3.3h-9.2v4.3h7.9v3.3h-7.9v4.4h9.2v3.3h-12.9v-18.6zM39 6.5v15.4h-3.7v-15.4h-5v-3.3h13.6v3.4h-4.9zM53.8 6.5v15.4h-3.7v-15.4h-5v-3.3h13.6v3.4h-4.9zM60.2 3.2h12.9v3.3h-9.2v4.3h7.9v3.3h-7.9v4.4h9.2v3.3h-12.9v-18.6zM83.1 3.2c3.8 0 5.4 3.1 5.4 5.8 0 2-1.1 4.2-3.1 5.2l3.4 7.7h-4l-2.9-7h-3.4v7h-3.7v-18.7h8.3zm-4.6 8.3h3.8c1.7 0 2.6-1 2.6-2.5 0-1.4-.9-2.5-2.6-2.5h-3.8v5zM103.9 22.1c-3.5 0-7.2-2-7.2-6v-7c0-4 3.6-6.1 7.3-6.1 2.1 0 4.4.6 5.8 1.8l-1.8 2.9c-1.1-1-2.7-1.3-3.9-1.3-1.7 0-3.6.9-3.6 3.4v5.5c0 2.4 1.8 3.4 3.5 3.4.7 0 1.6-.1 2.4-.8v-3.1h-2.7v-3.2h6.4v7.9c-1.7 1.9-4.2 2.6-6.2 2.6zM122.5 18h-6.5l-1.2 3.9h-4l6.6-18.7h3.8l6.5 18.7h-4.1l-1.1-3.9zm-5.5-3.1h4.5l-.7-2.4-1.5-4.9h-.1l-1.4 4.9-.8 2.4zM143.4 11.8l-1.7 3.5-2.1 4h-2.7l-2.1-3.9-1.8-3.5h-.1v10.1h-3.7v-18.8h3.4l3.3 6.6 2.3 4.6h.2l2.3-4.7 3.2-6.5h3.4v18.7h-3.7v-10.1h-.2zM154.3 3.2v18.7h-3.7v-18.7h3.7zM161.1 10.1v11.8h-3.7v-18.7h3.4l4.3 6.4 3.6 5.4h.1v-11.8h3.7v18.7h-3.4l-4.8-7.1-3.1-4.7h-.1zM182.1 22.1c-3.5 0-7.2-2-7.2-6v-7c0-4 3.6-6.1 7.3-6.1 2.1 0 4.4.6 5.8 1.8l-1.8 2.9c-1.1-1-2.7-1.3-3.9-1.3-1.7 0-3.6.9-3.6 3.4v5.5c0 2.4 1.8 3.4 3.5 3.4.7 0 1.6-.1 2.4-.8v-3.1h-2.7v-3.2h6.4v7.9c-1.7 1.9-4.2 2.6-6.2 2.6zM190.2.6v3.5h-.6v-3.5h-1.2v-.6h3.1v.6h-1.3zm3.7 2.2l.5-1.1.9-1.7h.5v4.1h-.6v-2.8l-.4.8-.7 1.4h-.4l-.7-1.3-.5-.9v2.8h-.6v-4.1h.6l.9 1.7.5 1.1z",
                    },
                    children: [],
                },
            ],
        },
        constructor: function () {
            Core.LoaderView.superclass.constructor.apply(this, arguments),
                (this.timeout = null),
                this.create(),
                this.show();
        },
        create: function () {
            (this.loaderEl = document.createElement("div")),
                this.loaderEl.classList.add("loader"),
                document.body.appendChild(this.loaderEl),
                (this.loaderInner = document.createElement("div")),
                this.loaderInner.classList.add("loader__inner"),
                this.loaderEl.appendChild(this.loaderInner),
                (this.loaderBar = document.createElement("div")),
                this.loaderBar.classList.add("loader-bar"),
                this.loaderInner.appendChild(this.loaderBar),
                (this.loaderBarProgress = document.createElement("div")),
                this.loaderBarProgress.classList.add("loader-bar__progress"),
                this.loaderBar.appendChild(this.loaderBarProgress),
                (this.logoContainer = document.createElement("div")),
                this.logoContainer.classList.add("logo-container"),
                (this.logoWrapper = this.createSVG(
                    this.LOGO_SVG,
                    "logo-wrapper"
                )),
                (this.sloganWrapper = this.createSVG(
                    this.SLOGAN_SVG,
                    "slogan-wrapper"
                )),
                this.logoContainer.appendChild(this.logoWrapper),
                this.logoContainer.appendChild(this.sloganWrapper),
                this.loaderInner.appendChild(this.logoContainer),
                (this.loaderDialog = this.createDialog()),
                this.loaderInner.appendChild(this.loaderDialog),
                (this.brandingWrapper = this.createBrandingWrapper()),
                this.loaderInner.appendChild(this.brandingWrapper);
        },
        destroy: function () {
            clearTimeout(this.timeout),
                document.body.removeChild(this.loaderEl);
        },
        show: function () {
            var e = this;
            this.timeout = setTimeout(function () {
                e.logoWrapper.classList.add("logo-wrapper--animate"),
                    e.sloganWrapper.classList.add("slogan-wrapper--animate"),
                    e.brandingWrapper.classList.add(
                        "branding-wrapper--animate"
                    );
            }, this.ANIMATION_DELAY);
        },
        updateLoaderBar: function () {
            this.model.readData("error") &&
                this.loaderBarProgress.classList.add(
                    "loader-bar__progress--error"
                ),
                (this.loaderBarProgress.style.width =
                    this.model.readData("visualPercentage") + "%");
        },
        createLoaderBar: function () {
            var e = document.createElement("div"),
                t = document.createElement("div");
            return (
                e.classList.add("loader__bar"),
                t.classList.add("loader__bar__progress"),
                e.appendChild(t),
                (this.loaderBarProgress = t),
                e
            );
        },
        createSVG: function (e, t) {
            var a = document.createElement("div"),
                r = this.createElement(e, "http://www.w3.org/2000/svg");
            return a.classList.add(t), a.appendChild(r), a;
        },
        createElement: function (e, t) {
            var a, r, i, s;
            if (!e.tag) return null;
            a = t
                ? document.createElementNS(t, e.tag)
                : document.createElement(e.tag);
            for (r in e.attributes)
                e.attributes.hasOwnProperty(r) &&
                    a.setAttribute(r, e.attributes[r]);
            for (i = 0; i < e.children.length; i++)
                (s = this.createElement(e.children[i], t)), a.appendChild(s);
            return a;
        },
        createDialog: function (e) {
            var t = document.createElement("div"),
                a = document.createElement("div"),
                r = document.createElement("div");
            return (
                t.classList.add("loader-dialog"),
                e
                    ? (a.classList.add("loader-dialog__message"),
                      r.classList.add("loader-dialog__button-group"),
                      (e.texts || []).forEach(function (e) {
                          var t = document.createElement("div");
                          (t.textContent = e), a.appendChild(t);
                      }),
                      (e.buttons || []).forEach(function (e) {
                          var t = new Sys.Element({
                                  cls: "button",
                                  textContent: e.label,
                                  onclick: e.action,
                              }),
                              a = t.getEl();
                          (a.onclick = e.action), r.appendChild(a);
                      }),
                      t.appendChild(a),
                      t.appendChild(r),
                      t)
                    : t
            );
        },
        showDialog: function (e) {
            var t = this,
                a = this.createDialog(e);
            this.loaderInner.replaceChild(a, this.loaderDialog),
                (this.loaderDialog = a),
                setTimeout(function () {
                    t.loaderDialog.classList.add("loader-dialog--show"),
                        t.logoContainer.classList.add("logo-container--hidden"),
                        t.brandingWrapper.classList.add(
                            "branding-wrapper--hidden"
                        );
                }, this.ANIMATION_DELAY);
        },
        hideDialog: function () {
            this.loaderDialog.classList.remove("loader-dialog--show"),
                this.logoContainer.classList.remove("logo-container--hidden"),
                this.brandingWrapper.classList.remove(
                    "branding-wrapper--hidden"
                );
        },
        createBrandingWrapper: function () {
            var e = document.createElement("div"),
                t = this.getBrandingContent(),
                a = this.createElement(
                    t,
                    "svg" === t.tag ? "http://www.w3.org/2000/svg" : null
                );
            return (
                e.classList.add("branding-wrapper"), a && e.appendChild(a), e
            );
        },
        getBrandingContent: function () {
            return {};
        },
    }),
    (Core.LoaderView = Sys.extend(
        Core.View,
        Core.LoaderView,
        "Core.LoaderView"
    ));
Sys.ns("Core"),
    (Core.Loader = {
        constructor: function () {
            Core.Loader.superclass.constructor.apply(this, arguments);
        },
        getDefaultMVCClasses: function () {
            return {
                model: Core.Model,
                view: Core.LoaderView,
                controller: Core.LoaderController,
            };
        },
    }),
    (Core.Loader = Sys.extend(Core.Module, Core.Loader, "Core.Loader"));
Sys.ns("Loader"),
    (Loader.ErrorHandler = {
        ERROR_TEXTS: {
            connectionLost: {
                key: Language.Keys.connectionLost,
                fallback: "Connection Lost",
            },
            reload: {
                key: Language.Keys.reload,
                fallback: "Please reload the game.",
            },
            technicalError: {
                key: Language.Keys.error,
                fallback: "Technical Error",
            },
            returnToLobby: {
                key: Language.Keys.returnToLobby,
                fallback: "Please return to Casino.",
            },
        },
        constructor: function () {
            Loader.ErrorHandler.superclass.constructor.apply(this, arguments),
                (this.errorStatus = {
                    http: "handleHttpError",
                    timeout: "handleTimeoutError",
                    server: "handleGameServerError",
                }),
                (this.data = {
                    status: "",
                }),
                this.setupEvents();
        },
        setupEvents: function () {
            this.on({
                "request:loaderErrorHandler.handleRequestError":
                    this.handleRequestError,
                "request:loaderErrorHandler.handlePluginTimeoutError":
                    this.handlePluginTimeoutError,
                "request:loaderErrorHandler.showTechnicalError":
                    this.handleTechnicalError,
            });
        },
        handlePluginTimeoutError: function () {
            var e = Sys.utils.isHomeAvailable()
                ? this.ERROR_TEXTS.returnToLobby
                : this.ERROR_TEXTS.reload;
            Utils.Helpers.logError(
                "GCS_LOAD_ERROR",
                404,
                new Error("Plugin timeout error")
            ),
                this.dispatchDialogRequest({
                    texts: this.getTexts([this.ERROR_TEXTS.technicalError, e]),
                    buttons: this.getDialogButtons(),
                    severity: "stopped",
                });
        },
        readStatus: function () {
            return this.data.status;
        },
        setStatus: function (e) {
            this.readStatus() !== e && (this.data.status = e);
        },
        handleRequestError: function (e) {
            var t,
                r = Sys.utils.getErrorCode(e);
            Sys.utils.httpRequestIsOK(e)
                ? Sys.isDefined(r) && (t = "server")
                : (t = "http"),
                t !== this.readStatus() &&
                    ((Sys.isDefined(t) && 20 !== r) ||
                        Sys.utils.goToLobby(
                            Utils.CONSTANTS.REASON_CODES.BOOKMARK
                        ),
                    this[this.errorStatus[t]](),
                    this.setStatus(t),
                    Utils.Helpers.logError(
                        "GCS_LOAD_ERROR",
                        r,
                        new Error(t + " request error")
                    ));
        },
        handleHttpError: function () {
            this.dispatchDialogRequest({
                texts: this.getTexts([
                    this.ERROR_TEXTS.connectionLost,
                    this.ERROR_TEXTS.reload,
                ]),
                buttons: this.getDialogButtons(),
                severity: "stopped",
            });
        },
        handleGameServerError: function () {
            var e = Sys.utils.isHomeAvailable()
                ? this.ERROR_TEXTS.returnToLobby
                : this.ERROR_TEXTS.reload;
            this.dispatchDialogRequest({
                texts: this.getTexts([this.ERROR_TEXTS.technicalError, e]),
                buttons: this.getDialogButtons(),
                severity: "stopped",
            });
        },
        handleTechnicalError: function () {
            this.handleGameServerError();
        },
        getTexts: function (e) {
            return e.map(function (e) {
                return Services.languageManager.hasText(e.key)
                    ? Services.languageManager.getText(e.key)
                    : e.fallback;
            });
        },
        getDialogButtons: function () {
            var e = {
                    action: function () {
                        Sys.utils.goToLobby(
                            Utils.CONSTANTS.REASON_CODES.TECHNICAL_ERROR
                        );
                    },
                    label: Services.languageManager.hasText(
                        Language.Keys.btn_casino
                    )
                        ? Services.languageManager.getText(
                              Language.Keys.btn_casino
                          )
                        : "Home",
                },
                t = {
                    action: function () {
                        Sys.utils.reload();
                    },
                    label: Services.languageManager.hasText(
                        Language.Keys.btn_reload
                    )
                        ? Services.languageManager.getText(
                              Language.Keys.btn_reload
                          )
                        : "Reload",
                };
            return Sys.utils.isHomeAvailable() ? [e, t] : [t];
        },
        dispatchDialogRequest: function (e) {
            this.fireEvent("request:loader.showDialog", e);
        },
    }),
    (Loader.ErrorHandler = Sys.extend(
        Sys.Observable,
        Loader.ErrorHandler,
        "Loader.ErrorHandler"
    ));
Sys.isDefined(Loader.ResourceHandler) &&
    Platform.isDesktopDevice &&
    Sys.override(Loader.ResourceHandler, {
        slownessDetected: function () {
            var e,
                a = this,
                s = Services.languageManager;
            a.storeData("status", "slow"),
                (e = {
                    texts: [
                        s.hasText(Language.Keys.loadingTakesLonger)
                            ? s.getText(Language.Keys.loadingTakesLonger)
                            : "Loading the game is taking longer than usual.",
                    ],
                    buttons: [
                        {
                            action: function () {
                                Sys.utils.reload();
                            },
                            label: s.hasText(Language.Keys.btn_reload)
                                ? s.getText(Language.Keys.btn_reload)
                                : "Reload",
                            scope: a,
                        },
                    ],
                    severity: "slow",
                }),
                a.fireEvent("request:loader.showDialog", e);
        },
    });
Sys.isDefined(Loader.ErrorHandler) &&
    Platform.isDesktopDevice &&
    Sys.override(Loader.ErrorHandler, {
        GAME_SERVER_ERROR_TEXT: [
            {
                key: Language.Keys.error,
                fallback: "Technical Error",
            },
        ],
        SESSION_TIMEOUT_TEXT: [
            {
                key: "20",
                fallback: "Your session has timed out. Restart the game.",
            },
        ],
        PLUGIN_TIMEOUT_ERROR_TEXT: [
            {
                key: Language.Keys.error,
                fallback: "Technical Error",
            },
        ],
        handleRequestError: function (e) {
            var r,
                t = this,
                s = Sys.utils.getErrorCode(e);
            Sys.utils.httpRequestIsOK(e)
                ? Sys.isDefined(s)
                    ? ((r = "server"), 20 === s && (r = "timeout"))
                    : (r = "server")
                : (r = "http"),
                Sys.isDefined(r) &&
                    r !== t.readStatus() &&
                    (t[t.errorStatus[r]](),
                    t.setStatus(r),
                    Utils.Helpers.logError(
                        "GCS_LOAD_ERROR",
                        s,
                        new Error(r + " request error")
                    ));
        },
        setupDialogButtons: function () {
            this.dialogButtons = [
                {
                    action: function () {
                        Sys.utils.reload();
                    },
                    label: Services.languageManager.hasText(
                        Language.Keys.btn_reload
                    )
                        ? Services.languageManager.getText(
                              Language.Keys.btn_reload
                          )
                        : "Reload",
                },
            ];
        },
        handleTimeoutError: function () {
            var e = this;
            e.dispatchDialogRequest({
                texts: e.getTexts(e.SESSION_TIMEOUT_TEXT),
                buttons: [],
                severity: "stopped",
            });
        },
    });
(Sys.UserInput = {
    constructor: function () {
        Sys.UserInput.superclass.constructor.apply(this, arguments),
            this.setupData(),
            this.setupEvents(),
            (this.interactionEventHandlers = {
                start: this.handleInteractionStart.bind(this),
                end: this.handleInteractionEnd.bind(this),
                cancel: this.handleInteractionEnd.bind(this),
                move: this.handleInteractionMove.bind(this),
                scroll: this.handleInteractionScroll.bind(this),
            }),
            (this.interactionEvents = this.defineInputEvents()),
            this.addEventListeners();
    },
    setupData: function () {
        (this.data = {}),
            this.storeData("standardEvents", {
                start: "notify:userInputManager.userInputStarted",
                end: "notify:userInputManager.userInputEnded",
                move: "notify:userInputManager.userInputMove",
                hover: "notify:userInputManager.userInputHover",
                cancel: "notify:userInputManager.userInputCanceled",
                scroll: "notify:userInputManager.userInputScroll",
            }),
            this.storeData("exclusiveEvents", {}),
            this.storeData("exclusiveQueue", []),
            this.storeData("allowPropagation", !1);
    },
    setupEvents: function () {
        this.on({
            "request:userInputManager.activateExclusivity":
                this.activateExclusivity,
            "request:userInputManager.deactivateExclusivity":
                this.deactivateExclusivity,
            "request:userInputManager.allowInteractions": this.setState.bind(
                this,
                "active"
            ),
            "request:userInputManager.ignoreAllInteractions":
                this.setState.bind(this, "deactivated"),
            "request:userInputManager.allowPropagation": this.storeData.bind(
                this,
                "allowPropagation",
                !0
            ),
            "request:userInputManager.disAllowPropagation": this.storeData.bind(
                this,
                "allowPropagation",
                !1
            ),
        });
    },
    defineInputEvents: function () {
        var t = [],
            e = [],
            n = [],
            s = [],
            i = [];
        return (
            Utils.Platform.isTouchSupported() && Platform.isDesktopDevice
                ? (t.push("mousedown"),
                  e.push("mousemove"),
                  n.push("mouseup"),
                  s.push("mouseout"),
                  t.push("touchstart"),
                  e.push("touchmove"),
                  n.push("touchend"),
                  s.push("touchcancel"),
                  i.push(this.getMouseWheelEventName()))
                : Utils.Platform.isTouchSupported()
                ? (t.push("touchstart"),
                  e.push("touchmove"),
                  n.push("touchend"),
                  s.push("touchcancel"))
                : (t.push("mousedown"),
                  e.push("mousemove"),
                  n.push("mouseup"),
                  s.push("mouseout"),
                  i.push(this.getMouseWheelEventName())),
            {
                start: t,
                move: e,
                end: n,
                cancel: s,
                scroll: i,
            }
        );
    },
    getMouseWheelEventName: function () {
        var t =
                Boolean(window.MSInputMethodContext) &&
                Boolean(document.documentMode),
            e =
                "onwheel" in document.createElement("div") &&
                !navigator.userAgent.match(/Firefox/i);
        return t || e
            ? "wheel"
            : void 0 !== document.onmousewheel
            ? "mousewheel"
            : "DOMMouseScroll";
    },
    isStartEvent: function (t) {
        return (
            !("mousedown" === t.type && !this.leftButtonClicked(t)) &&
            Sys.contains(this.interactionEvents.start, t.type)
        );
    },
    isEndEvent: function (t) {
        return (
            !("mouseup" === t.type && !this.leftButtonClicked(t)) &&
            Sys.contains(this.interactionEvents.end, t.type)
        );
    },
    isMoveEvent: function (t) {
        return Sys.contains(this.interactionEvents.move, t.type);
    },
    isCancelEvent: function (t) {
        return Sys.contains(this.interactionEvents.cancel, t.type);
    },
    isScrollEvent: function (t) {
        return Sys.contains(this.interactionEvents.scroll, t.type);
    },
    isKeyPressEvent: function (t) {
        return Sys.contains(this.interactionEvents.keyPress, t.type);
    },
    leftButtonClicked: function (t) {
        return "buttons" in t && 0 !== t.buttons
            ? 1 === t.buttons
            : "which" in t
            ? 1 === t.which
            : 0 === t.button;
    },
    addEventListeners: function () {
        var t = this,
            e = this.interactionEvents;
        e.start.forEach(function (e) {
            document.body.addEventListener(
                e,
                t.interactionEventHandlers.start,
                !0
            );
        }),
            e.move.forEach(function (e) {
                document.body.addEventListener(
                    e,
                    t.interactionEventHandlers.move,
                    {
                        passive: !1,
                    }
                );
            }),
            e.end.forEach(function (e) {
                document.body.addEventListener(
                    e,
                    t.interactionEventHandlers.end,
                    !0
                );
            }),
            e.scroll.forEach(function (e) {
                document.body.addEventListener(
                    e,
                    t.interactionEventHandlers.scroll,
                    !0
                );
            }),
            document.body.addEventListener(
                "gesturestart",
                this.preventPropagation
            ),
            document.body.addEventListener(
                "gesturechange",
                this.preventPropagation
            ),
            document.body.addEventListener(
                "gestureend",
                this.preventPropagation
            );
    },
    removeListeners: function () {
        var t = this,
            e = this.interactionEvents;
        e.start.forEach(function (e) {
            document.body.removeEventListener(
                e,
                t.interactionEventHandlers.start,
                !0
            );
        }),
            e.move.forEach(function (e) {
                document.body.removeEventListener(
                    e,
                    t.interactionEventHandlers.move,
                    !1
                );
            }),
            e.end.forEach(function (e) {
                document.body.removeEventListener(
                    e,
                    t.interactionEventHandlers.end,
                    !0
                );
            }),
            e.scroll.forEach(function (e) {
                document.body.removeEventListener(
                    e,
                    t.interactionEventHandlers.scroll,
                    !0
                );
            }),
            document.body.removeEventListener(
                "gesturestart",
                this.preventPropagation
            ),
            document.body.removeEventListener(
                "gesturechange",
                this.preventPropagation
            ),
            document.body.removeEventListener(
                "gestureend",
                this.preventPropagation
            );
    },
    getInteractionEvents: function (t) {
        return t ? this.interactionEvents[t] || [] : this.interactionEvents;
    },
    activateExclusivity: function (t) {
        var e;
        this.readData("exclusivityRequested")
            ? ((e = this.readData("exclusiveQueue")),
              e.push(t),
              this.storeData("exclusiveQueue", e))
            : (this.readData("activeInteraction") &&
                  this.sendInputEvent("end", {
                      clientX: -1,
                      clientY: -1,
                  }),
              this.storeData("exclusivityRequested", !0),
              this.setExclusiveEvents(t));
    },
    deactivateExclusivity: function (t) {
        var e,
            n,
            s = this.readData("exclusiveEvents"),
            i = this.readData("exclusiveQueue");
        "string" == typeof t && s.requester === t
            ? (e = !0)
            : Sys.isObj(t) &&
              ((e = !0),
              Sys.iterate(t, function (t, n) {
                  s[t] !== n && (e = !1);
              })),
            e
                ? i.length > 0
                    ? this.setExclusiveEvents(i.shift())
                    : this.storeData("exclusivityRequested", !1)
                : (n = i.indexOf(t)) >= 0 && i.splice(n, 1);
    },
    setExclusiveEvents: function (t) {
        var e;
        (e =
            "string" == typeof t
                ? {
                      requester: t,
                      start: "notify:userInputManager." + t + "ExclusiveStart",
                      end: "notify:userInputManager." + t + "ExclusiveEnd",
                      keyUp: "notify:userInputManager." + t + "ExclusiveKeyUp",
                      keyDown:
                          "notify:userInputManager." + t + "ExclusiveKeyDown",
                      move: "notify:userInputManager." + t + "ExclusiveMove",
                      hover: "notify:userInputManager." + t + "ExclusiveHover",
                      cancel:
                          "notify:userInputManager." + t + "ExclusiveCancel",
                      scroll:
                          "notify:userInputManager." + t + "ExclusiveScroll",
                  }
                : t),
            this.storeData("exclusiveEvents", e);
    },
    checkPropagation: function (t) {
        var e = t.touches ? t.touches.length : 1,
            n = "injected-btn" === t.target.className;
        (this.readData("allowPropagation") && e < 2) ||
            n ||
            this.preventPropagation(t);
    },
    preventPropagation: function (t) {
        t.preventDefault(), t.stopPropagation();
    },
    handleInteractionStart: function (t) {
        var e = this.readData("activeInteraction");
        this.checkPropagation(t),
            this.isState("deactivated") ||
                !this.isStartEvent(t) ||
                Sys.isDefined(e) ||
                ((e = {
                    target: t.target,
                }),
                "touchstart" === t.type &&
                    (e.identifier = t.targetTouches[0].identifier),
                this.storeData("activeInteraction", e),
                Utils.Platform.inIframe() && window.focus(),
                this.sendInputEvent("start", t));
    },
    handleInteractionMove: function (t) {
        var e = !0,
            n = this.readData("activeInteraction");
        this.checkPropagation(t),
            !this.isState("deactivated") &&
                this.isMoveEvent(t) &&
                ("touchmove" === t.type &&
                    Sys.isObj(n) &&
                    (e = this.isTouchInList(t.changedTouches, n.identifier)),
                e &&
                    this.sendInputEvent(
                        Sys.isDefined(n) ? "move" : "hover",
                        t
                    ));
    },
    handleInteractionEnd: function (t) {
        var e = !1,
            n = this.readData("activeInteraction");
        this.checkPropagation(t),
            !this.isState("deactivated") &&
                Sys.isDefined(n) &&
                (this.isEndEvent(t) || this.isCancelEvent(t)) &&
                this.isEndEvent(t) &&
                (("touchend" !== t.type && "touchcancel" !== t.type) ||
                    (e = this.isTouchInList(t.touches, n.identifier)),
                e ||
                    (this.removeData("activeInteraction"),
                    this.sendInputEvent("end", t)));
    },
    handleInteractionScroll: function (t) {
        var e = this,
            n = e.readData("activeInteraction");
        e.checkPropagation(t),
            e.isState("deactivated") ||
                Sys.isDefined(n) ||
                !this.isScrollEvent(t) ||
                e.sendInputEvent("scroll", t);
    },
    isTouchInList: function (t, e) {
        return Object.keys(t).some(function (n) {
            return t[n].identifier === e;
        });
    },
    sendInputEvent: function (t, e) {
        var n = this.getEvent(t);
        n &&
            this.fireEvent(n, Sys.UserInputUtils.getUserInputCoordinates(e), e);
    },
    getEvent: function (t) {
        return this.readData("exclusivityRequested")
            ? this.readData("exclusiveEvents")[t]
            : this.readData("standardEvents")[t];
    },
    storeData: function (t, e) {
        this.data[t] = e;
    },
    readData: function (t) {
        return this.data[t];
    },
    removeData: function (t) {
        delete this.data[t];
    },
    setState: function (t) {
        this.state = t;
    },
    readState: function () {
        return this.state;
    },
    isState: function (t) {
        return t === this.state;
    },
}),
    (Sys.UserInput = Sys.extend(
        Sys.Observable,
        Sys.UserInput,
        "Sys.UserInput"
    ));
Sys.ns("Game"),
    Sys.ns("Services"),
    Sys.ns("Services.legacy"),
    Platform.PlatformManager.gatherUserAgentInformation(),
    Utils.Platform.init(),
    (window.Environment = new Sys.Environment()),
    (window.Resources = new Sys.Resources()),
    (Services.storage = new Core.Model()),
    Sys.UserInput && (window.UserInput = new Sys.UserInput()),
    (window.initializeGame = function (e) {
        (Game.gameStartDateMs = Date.now()),
            Sys.utils
                .loadJS({
                    url: "../../../game-client-components/gcc_loader.js",
                })
                .always(function () {
                    new Loader.DeviceDetector(),
                        (Services.orientation = new Core.Orientation()),
                        (Game.viewport =
                            Services.scaling =
                            Services.legacy.scaling =
                                new Game.Scaling()),
                        (Services.languageManager =
                            Services.legacy.languageManager =
                                new Core.LanguageManager()),
                        (Game.languagemanager = Services.languageManager),
                        Sys.isGcmEnabled ||
                            (Game.loader = new Core.Loader({
                                name: "loader",
                            })),
                        (Game.errorHandler = new Loader.ErrorHandler()),
                        (Game.resourceHandler = new Loader.ResourceHandler()),
                        Services.scaling.scaleContent(),
                        Game.resourceHandler.preLoad();
                });
    }),
    Sys.isGcmEnabled ||
        document.addEventListener("DOMContentLoaded", function () {
            initializeGame();
        });
Sys.ns("Core"),
    (Core.StateHandler = {
        constructor: function () {
            var e = this;
            Core.StateHandler.superclass.constructor.apply(e, arguments),
                (e.useLogging = !1),
                (e.states = window.GenericStates || {}),
                (e.stateStack = []),
                (e.runningStateMachine = !1);
        },
        registerEvents: function (e) {
            var t,
                n = this,
                s = e.length;
            if (Sys.isArray(e))
                for (t = -1; ++t < s; )
                    n.addListener(e[t], n.onDefaultEventHandler.bind(n, e[t]));
            else
                "string" == typeof e &&
                    n.addListener(e, n.onDefaultEventHandler.bind(n, e));
        },
        onDefaultEventHandler: function (e) {
            this.dispatchEvent(e), this.activateStateMachine();
        },
        initStateHandler: function () {
            var e,
                t = this;
            Sys.iterate(window.GenericStates || {}, function (e, n) {
                t._registerTrigger(n);
            }),
                EventHandler.sortEventListeners(this),
                (e = Resources.readData("gameServerInitResponse")),
                !0 !== e.restore && this.pushState(this.states.idle),
                this.pushState(this.states.beforeLoaderClose),
                this.pushState(this.states.setupGame),
                this.activateStateMachine();
        },
        activateStateMachine: function () {
            var e,
                t = this;
            if (!t.runningStateMachine) {
                for (t.runningStateMachine = !0; t.hasStatesInStack(); ) {
                    if (!Sys.isEmpty(t.currentState)) {
                        for (e in t.currentState.waitEvents)
                            if (
                                t.currentState.waitEvents.hasOwnProperty(e) &&
                                !t.currentState.waitEvents[e]
                            )
                                return void (t.runningStateMachine = !1);
                        return void setTimeout(t.leaveCurrentState.bind(t), 1);
                    }
                    (t.currentState = t.stateStack.pop()),
                        t.currentState.execute({
                            stateHandler: t,
                            states: t.states,
                        }),
                        t.processModuleQueue(),
                        Sys.isDefined(t.currentState.executeLast) &&
                            t.currentState.executeLast({
                                stateHandler: t,
                                states: t.states,
                            }),
                        t.fireEvent(
                            "notify:stateHandler.entering" +
                                t.currentState.name +
                                "State"
                        );
                }
                t.runningStateMachine = !1;
            }
        },
        leaveCurrentState: function () {
            var e = this;
            e.fireEvent(
                "notify:stateHandler.leaving" + e.currentState.name + "State"
            ),
                (e.currentState = void 0),
                (e.runningStateMachine = !1),
                e.activateStateMachine();
        },
        processModuleQueue: function () {
            var e,
                t = this,
                n = Game.moduleLoader.getModuleQueueForState(
                    t.currentState.name
                ),
                s = n.length;
            for (e = 0; e < s; e++)
                n[e]({
                    stateHandler: t,
                    states: t.states,
                });
        },
        addState: function (e, t) {
            Sys.isDefined(this.states[e]) ||
                ((this.states[e] = t), this._registerTrigger(t));
        },
        _registerTrigger: function (e) {
            Sys.isDefined(Services.trigger) &&
                (Services.trigger.registerTrigger(
                    "notify:stateHandler.entering" + e.name + "State",
                    this,
                    "When entering the state " + e.name
                ),
                Services.trigger.registerTrigger(
                    "notify:stateHandler.leaving" + e.name + "State",
                    this,
                    "When leaving the state " + e.name
                ));
        },
        pushState: function (e) {
            var t;
            if (this.stateStack.indexOf(e) > -1)
                return void console.error(
                    "Trying to insert state '" +
                        e.name +
                        "', that is already in stack"
                );
            for (t in e.waitEvents)
                e.waitEvents.hasOwnProperty(t) && (e.waitEvents[t] = !1);
            this.stateStack.push(e);
        },
        dispatchEvent: function (e) {
            var t = this;
            Sys.isEmpty(t.currentState) ||
                Sys.isEmpty(t.currentState.waitEvents[e]) ||
                (t.currentState.waitEvents[e] = !0),
                Sys.each(t.stateStack, function (t) {
                    Sys.isEmpty(t.waitEvents[e]) || (t.waitEvents[e] = !0);
                });
        },
        dumpStack: function (e) {
            var t,
                n,
                s,
                i = this,
                r = "";
            if (i.useLogging)
                if (this.currentState) {
                    for (
                        t = e,
                            Sys.each(
                                Object.getOwnPropertyNames(
                                    this.currentState.waitEvents
                                ),
                                function (e) {
                                    (n = i.currentState.waitEvents[e]
                                        ? "*"
                                        : " "),
                                        (r +=
                                            "\n\t\t(" +
                                            n +
                                            ") " +
                                            e.replace(/\s/g, ""));
                                }
                            ),
                            t +=
                                "\nCurrent state:\t" +
                                this.currentState.name +
                                r,
                            s = this.stateStack.length - 1;
                        s >= 0;
                        s--
                    )
                        t += "\n\t" + this.stateStack[s].name;
                    console.info(t);
                } else console.warn("No current state!");
        },
        hasStates: function () {
            return Object.keys(this.states).length > 0;
        },
        hasStatesInStack: function () {
            return this.stateStack.length > 0;
        },
        isRunning: function () {
            return this.runningStateMachine;
        },
    }),
    (Core.StateHandler = Sys.extend(
        Sys.Observable,
        Core.StateHandler,
        "Core.StateHandler"
    )),
    (window.GenericStates = {
        beforeLoaderClose: {
            name: "BeforeLoaderClose",
            execute: function () {},
            waitEvents: {},
        },
        setupGame: {
            name: "SetupGame",
            execute: function () {},
            waitEvents: {},
        },
        idle: {
            name: "Idle",
            execute: function (e) {},
            waitEvents: {},
        },
    }),
    Sys.ns("Core"),
    (Core.ModuleLoader = {
        constructor: function (e) {
            Core.ModuleLoader.superclass.constructor.apply(this, arguments),
                this.init(e);
        },
        getModuleQueueForState: function (e) {
            var t = this.stateOrder[e];
            return Sys.isDefined(t) ? t : [];
        },
        init: function (e) {
            var t = this,
                n = Resources.readData("modules");
            (t.stateHandler = e.stateHandler),
                (t.stateOrder = t.getCommonStateOrder()),
                t.addGameSpecificStateOrder(),
                t.loadModules(n),
                t.updateStates(),
                t.cleanStateQueue(),
                t.fireEvent("notify:moduleLoader.finishedLoadingModules");
        },
        loadModules: function (e) {
            var t,
                n,
                s,
                i = this,
                r = Environment.getCurrentPlatform();
            (i.modules = {}),
                Sys.iterate(e, function (e, o) {
                    if (
                        ((n =
                            Sys.isArray(o.platforms) &&
                            -1 === o.platforms.indexOf(r)),
                        !Sys.isDefined(i.modules[e]) && !n)
                    ) {
                        if (
                            ((s = i.getClassFromString(o.module)),
                            !Sys.isDefined(s) && !0 === o.optional)
                        )
                            return;
                        (i.modules[e] = new s({
                            name: e,
                            model: i.getPlatformSpecificClass(o.model),
                            view: i.getPlatformSpecificClass(o.view),
                            controller: i.getClassFromString(o.controller),
                        })),
                            "string" == typeof o.global &&
                                ((t = "services" === o.global.toLowerCase()),
                                Sys.isDefined(window[o.global]) ||
                                    (window[o.global] = {}),
                                (window[o.global][e] = i.modules[e].controller),
                                t &&
                                    (window[o.global].legacy[e] =
                                        i.modules[e].controller)),
                            i.applyMixins(
                                i.modules[e],
                                i.combineMixins(
                                    i.modules[e].getMixinDependencies(),
                                    o.mixins
                                )
                            );
                    }
                });
        },
        combineMixins: function (e, t) {
            var n,
                s,
                i,
                r,
                o,
                a,
                l = {},
                u = Environment.getCurrentPlatform();
            for (
                Sys.isArray(e)
                    ? ((o = e), (a = e.length))
                    : ((o = e.hasOwnProperty(u) ? e[u] : e.fallback),
                      (a = (o && o.length) || 0)),
                    r = -1;
                ++r < a;

            )
                (n = o[r]),
                    Sys.isObj(n)
                        ? ((i = Object.keys(n)[0]), (s = n[i]), (l[i] = s))
                        : "string" == typeof n && (l[n] = void 0);
            if (Sys.isArray(t))
                for (a = t.length, r = -1; ++r < a; )
                    (n = t[r]), Sys.isDefined(l[n]) || (l[n] = void 0);
            return l;
        },
        applyMixins: function (e, t) {
            var n,
                s,
                i,
                r,
                o,
                a,
                l = ["controller", "model", "view"],
                u = Object.keys(t),
                c = u.length,
                d = l.length;
            for (o = -1; ++o < c; )
                if (
                    ((r = u[o]),
                    (i = t[r] || {}),
                    (n = Mixins[r]),
                    Sys.isDefined(n))
                ) {
                    for (a = -1; ++a < d; )
                        (s = l[a]),
                            Sys.isDefined(n[s]) &&
                                Sys.isDefined(e[s]) &&
                                Sys.isDefined(n[s].methods) &&
                                this.applyMixinProperties(e[s], n[s].methods);
                    for (a = -1; ++a < d; )
                        (s = l[a]),
                            Sys.isDefined(n[s]) &&
                                Sys.isDefined(e[s]) &&
                                Sys.isDefined(n[s].executeOnInstantiation) &&
                                this.executeMixinProperties(
                                    e[s],
                                    n[s].executeOnInstantiation,
                                    i
                                );
                }
        },
        applyMixinProperties: function (e, t) {
            for (var n, s = Object.keys(t), i = s.length, r = 0; r < i; )
                (n = s[r]), Sys.isDefined(e[n]) || (e[n] = t[n]), ++r;
        },
        executeMixinProperties: function (e, t, n) {
            for (var s = Object.keys(t), i = s.length, r = 0; r < i; )
                t[s[r]].call(e, n), ++r;
        },
        updateStates: function () {
            var e = this,
                t = e.modules,
                n = e.stateHandler.states;
            (e.moduleQueues = {}),
                Sys.iterate(t, function (t, n) {
                    var s = n.getStateChanges();
                    Sys.iterate(s, function (t, s) {
                        var i = [];
                        Sys.isDefined(s.state) &&
                            (e.stateHandler.addState(t, s.state),
                            Sys.iterate(s.state.waitEvents, function (e) {
                                i.push(e);
                            }),
                            i.length > 0 &&
                                e.registerListenersOnStateHandler(
                                    n.controller,
                                    i
                                ));
                    });
                }),
                Sys.iterate(t, function (t, s) {
                    var i = s.getStateChanges();
                    Sys.iterate(i, function (i, r) {
                        !Sys.isDefined(r.state) &&
                            Sys.isDefined(n[i]) &&
                            (Sys.isArray(r.waitEvents) &&
                                (Sys.each(r.waitEvents, function (e) {
                                    n[i].waitEvents[e] = !1;
                                }),
                                e.registerListenersOnStateHandler(
                                    s.controller,
                                    r.waitEvents
                                )),
                            Sys.isArray(r.queue) &&
                                e.updateModuleQueue(t, n[i].name, r.queue));
                    });
                });
        },
        registerListenersOnStateHandler: function (e, t) {
            var n,
                s = t.length;
            for (n = -1; ++n < s; )
                this.stateHandler.hasListener(t[n]) ||
                    this.stateHandler.registerEvents(t[n]);
        },
        updateModuleQueue: function (e, t, n) {
            var s,
                i = this.stateOrder[t];
            Sys.isDefined(i)
                ? ((s = i.indexOf(e)),
                  s >= 0
                      ? (i.splice.apply(i, [s, 1].concat(n)),
                        (this.stateOrder[t] = i))
                      : console.warn(
                            "ModuleLoader.updateModuleQueue :: The module (" +
                                e +
                                ") is not specified in the module loader for the current state (" +
                                t +
                                ")"
                        ))
                : console.warn(
                      "ModuleLoader.updateModuleQueue :: The state (" +
                          t +
                          ") is not specified in the module loader"
                  );
        },
        cleanStateQueue: function () {
            var e = this;
            Sys.iterate(e.stateOrder, function (e, t) {
                var n;
                for (n = 0; n < t.length; n++)
                    ("string" != typeof t[n] && Sys.isDefined(t[n])) ||
                        (t.splice(n, 1), n--);
            });
        },
        addGameSpecificStateOrder: function () {
            var e = this,
                t = e.stateOrder,
                n = Resources.readData("config"),
                s = n.stateOrder;
            Sys.isDefined(s) &&
                Sys.iterate(s, function (e, n) {
                    Sys.each(n, function (n) {
                        var s;
                        Sys.isDefined(t[e])
                            ? Sys.isDefined(n.insertBefore)
                                ? ((s = t[e].indexOf(n.insertBefore) + 1),
                                  s < 0
                                      ? (t[e] = n.modules.concat(t[e]))
                                      : t[e].splice.apply(
                                            t[e],
                                            [s, 0].concat(n.modules)
                                        ))
                                : t[e].push.apply(t[e], n.modules)
                            : (t[e] = n.modules);
                    });
                });
        },
        getClassFromString: function (e) {
            var t, n, s, i;
            if ("string" == typeof e) {
                for (
                    t = e.split("."), n = window, i = t.length, s = 0;
                    s < i;
                    s++
                )
                    Sys.isDefined(n) && (n = n[t[s]]);
                return n;
            }
            if ("function" == typeof e) return e;
        },
        getPlatformSpecificClass: function (e) {
            var t = this,
                n = e;
            return (
                Sys.isObj(n) &&
                    (t.isMVCSupported(n)
                        ? (n = t.getPlatformView(n))
                        : console.error(
                              "ModuleLoader.getPlatformSpecificClass : MVCs for non-supported platform provided"
                          )),
                t.getClassFromString(n)
            );
        },
        isMVCSupported: function (e) {
            var t = ["mobile", "mobileLow", "tablet", "tabletLow", "desktop"],
                n = !0;
            return (
                Sys.iterate(e, function (e, s) {
                    t.indexOf(e) < 0 && (n = !1);
                }),
                n
            );
        },
        getPlatformView: function (e) {
            var t = Environment.getCurrentPlatform();
            return (
                "desktop" !== t || Sys.isDefined(e[t]) || (t = "tablet"),
                "tablet" !== t || Sys.isDefined(e[t]) || (t = "mobile"),
                "tabletLow" !== t || Sys.isDefined(e[t]) || (t = "mobileLow"),
                "mobileLow" !== t || Sys.isDefined(e[t]) || (t = "mobile"),
                e[t]
            );
        },
        getCommonStateOrder: function () {
            return {
                BeforeLoaderClose: ["stage"],
                Idle: ["playForRealPromo"],
            };
        },
    }),
    (Core.ModuleLoader = Sys.extend(
        Sys.Observable,
        Core.ModuleLoader,
        "Core.ModuleLoader"
    )),
    Sys.ns("Services"),
    (Services.Base = function () {
        (this._listeners = {}),
            (this._counter = 0),
            (this.observable = new Sys.Observable({})),
            this._setupEvents();
    }),
    (Services.Base.prototype = {
        _setupEvents: function () {},
        publish: function (e) {
            var t,
                n = Array.prototype.slice.call(arguments, 1);
            this._listeners[e] &&
                ((t = this._listeners[e].slice()),
                t.forEach(function (e) {
                    e.callback.apply(null, n);
                }));
        },
        on: function (e, t, n) {
            var s = t,
                i = this._counter++;
            return (
                this._listeners[e] || (this._listeners[e] = []),
                "function" == typeof n
                    ? (s = function () {
                          n.apply(null, arguments) &&
                              (t.apply(null, arguments), this.off(e, i));
                      }.bind(this))
                    : n &&
                      (s = function () {
                          t.apply(null, arguments), this.off(e, i);
                      }.bind(this)),
                this._listeners[e].push({
                    reference: i,
                    callback: s,
                }),
                i
            );
        },
        off: function (e, t) {
            this._listeners[e] &&
                (this._listeners[e] = this._listeners[e].filter(function (e) {
                    return e.reference !== t;
                }));
        },
    }),
    Sys.ns("Services"),
    (Services.Activity = {
        constructor: function () {
            Services.Activity.superclass.constructor.apply(this, arguments),
                (this._activities = []);
        },
        _setupEvents: function () {
            this.observable.on({
                "notify:serverManager.slowRequest": this.addActivity.bind(this),
                "notify:serverManager.actionRequestError":
                    this.removeActivity.bind(this),
                "notify:responseParser.responseParsed":
                    this._onResponseParsed.bind(this),
                "request:slowRequestAnimation.show": this.addActivity.bind(
                    this,
                    "request"
                ),
                "notify:responseParser.bonusProgramWidgetValuesParsed":
                    this.removeActivity.bind(this, "widgetspin"),
                "request:slowRequestAnimation.hide": this.removeActivity.bind(
                    this,
                    "request"
                ),
                "notify:realityCheck:completed": this.removeActivity.bind(this),
                "notify:responseParser.freeSpinInitResponseParsed":
                    this.removeActivity.bind(this, "initfreespin"),
                "notify:responseParser.gameConfigurationParsed":
                    this.removeActivity.bind(this, "init"),
            });
        },
        isActive: function () {
            return this._activities.length > 0;
        },
        addActivity: function (e) {
            this._activities.push(e),
                1 === this._activities.length && this.publish("slow");
        },
        removeActivity: function (e) {
            var t = this._activities.indexOf(e);
            -1 !== t &&
                (this._activities.splice(t, 1),
                this.isActive() || this.publish("normal"));
        },
        _onResponseParsed: function (e) {
            e.clientaction && this.removeActivity(e.clientaction);
        },
    }),
    (Services.Activity = Sys.extend(
        Services.Base,
        Services.Activity,
        "Services.Activity"
    )),
    Sys.ns("Services"),
    (Services.Autoplay = {
        DEFAULT_ROUNDS: [10, 25, 50, 100, 250, 500, 750, 1e3],
        MIN_ROUNDS: 5,
        MAX_ROUNDS: 1e3,
        MAX_ROUND_OPTIONS: 8,
        SETTINGS_DISABLED_FREE_ROUNDS: [
            "stopAutoplayIfWinExceeds",
            "stopAutoplayIfBalanceIncreasedBy",
            "stopAutoplayIfBalanceDecreasedBy",
        ],
        constructor: function (e) {
            Services.Autoplay.superclass.constructor.apply(this, arguments),
                (this._active = !1),
                (this._availableRounds = this._getAvailableRounds(
                    e.initResponse,
                    this.DEFAULT_ROUNDS
                )),
                (this._available = null !== this._availableRounds),
                (this._rounds = 0),
                (this._stopConditions = this._getDefaultStopConditions(
                    e.initResponse,
                    e.ISO
                )),
                (this._settingsOpen = !1),
                (this._initResponse = e.initResponse);
        },
        _setupEvents: function () {
            this.observable.on({
                "notify:autoPlayer.enabled": this._enabled.bind(this),
                "notify:autoPlayer.starting": this._started.bind(this),
                "notify:autoPlayer.startRound": this._roundStarted.bind(this),
                "notify:autoPlayer.reduceCounter":
                    this._counterReduced.bind(this),
                "notify:autoPlayer.stopped": this._stopped.bind(this),
                "notify:freeRounds.started": this._freeRoundsStarted.bind(this),
                "notify:freeRounds.ended": this._freeRoundsEnded.bind(this),
            });
        },
        isActive: function () {
            return this._active;
        },
        isAvailable: function () {
            return this._available;
        },
        getRoundsAvailable: function () {
            return this._availableRounds;
        },
        getRemaining: function () {
            return this._rounds;
        },
        setRounds: function (e) {
            this.isAvailable() &&
                this._validateRound(e) &&
                this.getRoundsAvailable().indexOf(e) > -1 &&
                ((this._rounds = e),
                this.publish("roundsChanged", this._rounds),
                Services.settingsManager.storeSetting("autoPlayNrSpins", e));
        },
        start: function () {
            this.canStartAutoplay()
                ? this.getRemaining() > 0 &&
                  !this.isActive() &&
                  this.observable.fireEvent("request:autoPlayer.start")
                : this.showWarningDialog();
        },
        stop: function () {
            (this._rounds = 0),
                Services.settingsManager.storeSetting("autoPlayNrSpins", 0);
        },
        isRestrictedMode: function () {
            return this._initResponse.autoplayLossLimitEnabled;
        },
        canStartAutoplay: function () {
            var e = this._initResponse.autoplayLossLimitEnabled,
                t = Services.settingsManager.getSetting(
                    "stopAutoplayIfBalanceDecreasedBy"
                ),
                n = Services.freeRounds.isActive(),
                s = Services.bet.isBetOverlapping();
            return !!n || !(s || (e && !t));
        },
        showWarningDialog: function () {
            var e,
                t = this,
                n = Services.languageManager,
                s = n.getText(
                    Language.Keys.autoplay_setting_ifCashDecreasesByWarning
                ),
                i = n.getText(
                    Language.Keys.autoplay_setting_ifCashDecreasesByWarningTouch
                ),
                r = Services.bet.isBetOverlapping();
            (e = Platform.isDesktopDevice
                ? {
                      title: n.getText(
                          Language.Keys.autoplay_setting_ifCashDecreasesBy
                      ),
                      text: r ? i : s,
                      buttons: [
                          {
                              text: n.getText(Language.Keys.btn_ok),
                          },
                      ],
                  }
                : {
                      title: n.getText(
                          Language.Keys.autoplay_setting_ifCashDecreasesBy
                      ),
                      text: i,
                      buttons: [
                          {
                              text: n.getText(Language.Keys.btn_close),
                              action: Services.autoplay.stop.bind(t),
                          },
                          {
                              text: n.getText(Language.Keys.btn_ok),
                              action: function () {
                                  t.observable.fireEvent(
                                      "request:spinSettings.openAdvancedSettingKeyboard",
                                      "stopAutoplayIfBalanceDecreasedBy"
                                  );
                              },
                          },
                      ],
                  }),
                Services.dialog.show(e);
        },
        addStopCondition: function (e) {
            var t = e.attributes,
                n = e.id,
                s = e.active || !1;
            return (
                this._validateStopCondition(e),
                !this.hasStopCondition(e.id) &&
                    (this._stopConditions.push(e),
                    t && (s = void 0 === t.value ? null : t.value),
                    Services.settingsManager.storeSetting(n, s),
                    this.publish("stopConditionAdded", n),
                    !0)
            );
        },
        hasStopCondition: function (e) {
            return null !== this.getStopCondition(e);
        },
        getStopConditions: function () {
            return this._stopConditions.map(function (e) {
                return {
                    id: e.id,
                    text: e.text,
                    active: e.active,
                    enabled: e.enabled,
                    attributes: e.attributes,
                };
            });
        },
        updateStopCondition: function (e) {
            var t,
                n = e.id,
                s = this.getStopCondition(n),
                i = e.active;
            if (!s)
                throw new Error("Condition with id '" + n + "' was not found");
            if (
                ((s.active = e.active),
                (s.enabled = e.enabled),
                (t = e.attributes),
                !1 === e.active &&
                    ((i = null), s.attributes && (s.attributes.value = null)),
                t)
            ) {
                if (
                    ((i = e.attributes.value),
                    t.required &&
                        ((s.active = !0),
                        "function" == typeof t.validate && !t.validate(i)))
                )
                    return;
                s.attributes && (s.attributes.value = i);
            }
            Services.settingsManager.storeSetting(n, i),
                this.publish("stopConditionChanged", n, i);
        },
        resetStopConditions: function () {
            this._stopConditions.forEach(
                function (e) {
                    e.attributes
                        ? ((e.active = Boolean(e.attributes.required)),
                          (e.attributes.value = e.defaultValue))
                        : (e.active = e.defaultValue),
                        this.publish(
                            "stopConditionChanged",
                            e.id,
                            e.defaultValue
                        ),
                        Services.settingsManager.storeSetting(
                            e.id,
                            e.defaultValue
                        );
                }.bind(this)
            );
        },
        removeStopCondition: function (e) {
            var t = this.getStopCondition(e);
            return (
                !!t &&
                (this._stopConditions.splice(
                    this._stopConditions.indexOf(t),
                    1
                ),
                Services.settingsManager.storeSetting(e, null),
                this.publish("stopConditionRemoved", e),
                !0)
            );
        },
        setSettingsState: function (e) {
            switch (e) {
                case "opened":
                    this.openSettings();
                    break;
                case "closed":
                    this.closeSettings();
                    break;
                default:
                    throw new Error("Unsupported AutoPlay state: " + e);
            }
        },
        isShowingSettings: function () {
            return this._settingsOpen;
        },
        openSettings: function () {
            this._settingsOpen ||
                ((this._settingsOpen = !0), this.publish("opened"));
        },
        closeSettings: function () {
            this._settingsOpen &&
                ((this._settingsOpen = !1), this.publish("closed"));
        },
        _getDefaultStopConditions: function (e, t) {
            var n = this,
                s = [],
                i = {
                    id: "stopAutoplayIfBalanceDecreasedBy",
                    text: Services.languageManager.getText(
                        Language.Keys.autoplay_setting_ifCashDecreasesBy
                    ),
                    active: !1,
                    enabled: !0,
                    defaultValue: null,
                    attributes: {
                        label: t,
                        value: null,
                    },
                };
            return (
                s.push({
                    id: "stopAutoplayOnAnyWin",
                    text: Services.languageManager.getText(
                        Language.Keys.autoplay_setting_onAnyWin
                    ),
                    enabled: !0,
                    active: !1,
                    defaultValue: !1,
                }),
                s.push({
                    id: "stopAutoplayIfWinExceeds",
                    text: Services.languageManager.getText(
                        Language.Keys.autoplay_setting_ifWinExeeds
                    ),
                    enabled: !0,
                    active: !1,
                    defaultValue: null,
                    attributes: {
                        label: t,
                        value: null,
                    },
                }),
                s.push({
                    id: "stopAutoplayIfBalanceIncreasedBy",
                    text: Services.languageManager.getText(
                        Language.Keys.autoplay_setting_ifCashIncreasesBy
                    ),
                    active: !1,
                    enabled: !0,
                    defaultValue: null,
                    attributes: {
                        label: t,
                        value: null,
                    },
                }),
                e.autoplayLossLimitEnabled &&
                    ((i.attributes.required = !0),
                    (i.active = !0),
                    (i.attributes.validate = function (e) {
                        return e > 0;
                    })),
                s.push(i),
                e.autoplayLossLimitEnabled &&
                    e.freeRoundsLeft &&
                    s.forEach(function (e) {
                        Sys.contains(n.SETTINGS_DISABLED_FREE_ROUNDS, e.id) &&
                            ((e.enabled = !1), (e.active = !1));
                    }),
                s
            );
        },
        getStopCondition: function (e) {
            return (
                this._stopConditions.filter(function (t) {
                    return t.id === e;
                })[0] || null
            );
        },
        _enabled: function (e) {
            this._rounds = e;
        },
        _started: function () {
            (this._active = !0), this.publish("started");
        },
        _roundStarted: function (e) {},
        _counterReduced: function (e) {
            (this._rounds = e), this.publish("roundStarted", e);
        },
        _stopped: function () {
            (this._rounds = 0), (this._active = !1), this.publish("stopped");
        },
        _getAvailableRounds: function (e, t) {
            var n, s, i;
            return "0" === e.autoplay
                ? null
                : "string" != typeof e.autoplay || "" === e.autoplay
                ? t
                : ((n = e.autoplay.split(",").map(function (e) {
                      return parseInt(e, 10);
                  })),
                  (s = n.length <= this.MAX_ROUND_OPTIONS),
                  (i = n.every(this._validateRound.bind(this))),
                  s && i
                      ? n.sort(function (e, t) {
                            return e - t;
                        })
                      : t);
        },
        _validateRound: function (e) {
            return !isNaN(e) && e >= this.MIN_ROUNDS && e <= this.MAX_ROUNDS;
        },
        _validateStopCondition: function (e) {
            var t = e.attributes;
            if ("string" != typeof e.id)
                throw new Error(
                    "The autoplay stop condition must have a string 'id'."
                );
            if ("string" != typeof e.text)
                throw new Error(
                    "The autoplay stop condition must have a title 'text'."
                );
            if (void 0 === e.defaultValue)
                throw new Error(
                    "The autoplay stop condition must have a default value."
                );
            if (t) {
                if ("string" != typeof t.label)
                    throw new Error(
                        "The autoplay stop condition must have a string 'label' for its attributes."
                    );
                if (Boolean(t.required) && "function" != typeof t.validate)
                    throw new Error(
                        "The autoplay stop condition must have a 'validate' function in its attributes if it is marked as 'required'."
                    );
            }
        },
        _freeRoundsStarted: function () {
            var e = this;
            e._stopConditions.forEach(function (t) {
                Sys.contains(e.SETTINGS_DISABLED_FREE_ROUNDS, t.id) &&
                    ((t.enabled = !1),
                    (t.attributes.required = !1),
                    (t.active = !1),
                    e.updateStopCondition(t));
            });
        },
        _freeRoundsEnded: function () {
            var e = this;
            e._stopConditions.forEach(function (t) {
                Sys.contains(e.SETTINGS_DISABLED_FREE_ROUNDS, t.id) &&
                    (t.enabled = !0),
                    e._initResponse.autoplayLossLimitEnabled &&
                        "stopAutoplayIfBalanceDecreasedBy" === t.id &&
                        ((t.attributes.required = !0),
                        (t.attributes.validate = null)),
                    e.updateStopCondition(t);
            });
        },
    }),
    (Services.Autoplay = Sys.extend(
        Services.Base,
        Services.Autoplay,
        "Services.Autoplay"
    )),
    Sys.ns("Services"),
    (Services.Bet = {
        constructor: function (e) {
            Services.Bet.superclass.constructor.apply(this, arguments),
                (this._ignoreInitialBet =
                    Services.localStorageManager.readData("ignoreInitialBet") ||
                    !1),
                (this._useCustomChanges = !1),
                this._updateBetSettings(e.initResponse),
                (this._allCoinValues = []),
                this._updateAllCoinValues();
        },
        _setupEvents: function () {
            this.observable.on({
                "request:bet.reduceBet": this.reduceBet.bind(this),
                "notify:freeRounds.ended":
                    this._freeRoundsSettingsUpdate.bind(this),
                "notify:freeRounds.reInitResponseReceived":
                    this._freeRoundsSettingsUpdate.bind(this),
            });
        },
        hasMultipleBetLevels: function () {
            return this._betLevels.length > 1;
        },
        getBetCoins: function () {
            return this._betSize * this._betLevel;
        },
        getBetCash: function () {
            return this._betSize * this._betLevel * this._denomination;
        },
        getBetLevels: function () {
            return this._betLevels;
        },
        setBetLevels: function (e) {
            this._betLevels = e;
        },
        getBetLevel: function () {
            return this._betLevel;
        },
        setBetLevel: function (e) {
            this._betLevel !== e &&
                ((this._betLevel = e),
                Services.settingsManager.storeSetting(
                    "betLevel",
                    e,
                    !Services.settingsManager.getSetting("inFreerounds")
                ),
                this.publish("changed"));
        },
        getDenomination: function () {
            return this._denomination;
        },
        setDenomination: function (e) {
            this._denomination !== e &&
                ((this._denomination = e),
                Services.settingsManager.storeSetting(
                    "denomination",
                    e,
                    !Services.settingsManager.getSetting("inFreerounds")
                ),
                this.publish("changed"));
        },
        getDenominations: function () {
            return this._denominations;
        },
        setDenominations: function (e) {
            this._denominations = e;
        },
        getBetSize: function () {
            return this._betSize;
        },
        setBetSize: function (e) {
            (this._betSize = e), this.publish("changed");
        },
        reduceBet: function () {
            this.publish("limitReached");
        },
        isBetOverlapping: function () {
            var e = Services.moneyManager.getBetCents(),
                t = Services.settingsManager.getSetting(
                    "stopAutoplayIfBalanceDecreasedBy"
                ),
                n = !1;
            return "number" == typeof t && t > 0 && (n = e > t), n;
        },
        getCustomCoinValues: function (e) {
            var t = Resources.readData("queryData");
            return Utils.Helpers.getCustomCoinValues(e, t);
        },
        getAllCoinValues: function () {
            return this._allCoinValues;
        },
        hasMultipleCoinValues: function () {
            return this._allCoinValues.length > 1;
        },
        getCustomBetChanges: function (e, t) {
            var n = Resources.readData("queryData"),
                s = parseInt(n["customConfiguration.defaultBetLevel"], 10),
                i = parseInt(n["customConfiguration.defaultCoinValue"], 10),
                r = {};
            return (
                Sys.isDefined(s) &&
                    -1 !== t.indexOf(s) &&
                    (r.defaultBetLevel = s),
                Sys.isDefined(i) &&
                    -1 !== e.indexOf(i) &&
                    (r.defaultCoinValue = i),
                r
            );
        },
        _freeRoundsSettingsUpdate: function () {
            this._updateBetSettings(
                Resources.readData("gameServerInitResponse")
            ),
                this._updateAllCoinValues(),
                this.publish("reInitDataUpdated");
        },
        _updateBetSettings: function (e) {
            var t = this._getBetSettings(e);
            this.setBetLevel(t.betLevel),
                this.setBetLevels(t.betLevels),
                this.setDenominations(t.denominations),
                this.setDenomination(t.denomination),
                (this._betSize = t.betSize),
                this.publish("changed");
        },
        _updateAllCoinValues: function () {
            var e,
                t = this.getDenominations();
            for (this._allCoinValues = [], e = 0; e < t.length; e++)
                this._allCoinValues.push(t[e] / 100);
        },
        _getBetSettings: function (e) {
            var t,
                n,
                s,
                i,
                r = parseInt(e["betlevel.standard"], 10),
                o = e["betlevel.all"].split(",").map(function (e) {
                    return parseInt(e, 10);
                }),
                a = parseInt(e["denomination.standard"], 10),
                l = e["denomination.all"].split(",").map(function (e) {
                    return parseInt(e, 10);
                }),
                u = e["bl.standard"].split(",").reduce(function (t, n, s) {
                    return t + parseInt(e["bl.i" + s + ".coins"], 10);
                }, 0);
            return (
                Services.localStorageManager.hasData("betLevel") &&
                    ((t = Number(
                        Services.localStorageManager.readData("betLevel")
                    )),
                    -1 !== o.indexOf(t) && (r = t)),
                Services.localStorageManager.hasData("denomination") &&
                    ((n = Number(
                        Services.localStorageManager.readData("denomination")
                    )),
                    -1 !== l.indexOf(n) && (a = n)),
                (s = this.getCustomCoinValues(l)),
                (i = this.getCustomBetChanges(s, o)),
                Services.settingsManager.storeSetting(
                    "inFreerounds",
                    parseInt(e.freeRoundsLeft, 10) > 0
                ),
                !Services.settingsManager.getSetting("inFreerounds") &&
                    s.length &&
                    i.defaultCoinValue &&
                    ((l = s),
                    this._ignoreInitialBet ||
                        ((this._useCustomChanges = !0),
                        Services.localStorageManager.storeData(
                            "ignoreInitialBet",
                            (!0).toString()
                        ))),
                Sys.isDefined(e["bet.betlevel"])
                    ? (r = Number(e["bet.betlevel"]))
                    : this._useCustomChanges && i.defaultBetLevel
                    ? (r = i.defaultBetLevel)
                    : -1 !== o.indexOf(t) && (r = t),
                Sys.isDefined(e["bet.denomination"])
                    ? (a = Number(e["bet.denomination"]))
                    : this._useCustomChanges && i.defaultCoinValue
                    ? (a = i.defaultCoinValue)
                    : -1 !== l.indexOf(n)
                    ? (a = n)
                    : i.defaultCoinValue && -1 === l.indexOf(n) && (a = l[0]),
                {
                    betLevels: o,
                    betLevel: r,
                    denomination: a,
                    denominations: l,
                    betSize: u,
                }
            );
        },
    }),
    (Services.Bet = Sys.extend(Services.Base, Services.Bet, "Services.Bet")),
    Sys.ns("Services"),
    (Services.Clock = {
        constructor: function (e) {
            var t;
            Services.Clock.superclass.constructor.apply(this, arguments),
                (this._timeout = null),
                (this._interval = null),
                (t = e.parsedResponse),
                (this._available = !1),
                e.parsedResponse.g4mode
                    ? (this._available = !0)
                    : void 0 !== t.config &&
                      void 0 !== t.config.gameParameters &&
                      void 0 !== t.config.gameParameters.clockRequired &&
                      (this._available = t.config.gameParameters.clockRequired),
                this.observable.on({
                    "notify:loader.closed": this.setAvailable.bind(
                        this,
                        this._available
                    ),
                });
        },
        getTime: function () {
            return new Date();
        },
        isAvailable: function () {
            return this._available;
        },
        setAvailable: function (e) {
            (this._available = e), this._stop(), e && this._start();
        },
        _start: function () {
            var e = this;
            e.publish("tick"),
                e._everyMinute(function () {
                    e.publish("tick");
                });
        },
        _stop: function () {
            clearTimeout(this._timeout),
                clearInterval(this._interval),
                (this._timeout = null),
                (this._interval = null);
        },
        _everyMinute: function (e) {
            var t = this,
                n = function () {
                    t._interval = setInterval(e, 6e4);
                },
                s = function () {
                    e(), n();
                };
            t._timeout = setTimeout(
                s,
                (function () {
                    var e = new Date();
                    return (
                        1e3 * (59 - e.getSeconds()) +
                        (1e3 - e.getMilliseconds())
                    );
                })()
            );
        },
    }),
    (Services.Clock = Sys.extend(
        Services.Base,
        Services.Clock,
        "Services.Clock"
    )),
    Sys.ns("Services"),
    (Services.CustomMessage = {
        constructor: function () {
            Services.CustomMessage.superclass.constructor.apply(
                this,
                arguments
            );
        },
        show: function (e) {
            this.observable.fireEvent("request:customMessages.showDialog", e);
        },
        remove: function (e) {
            this.observable.fireEvent("request:customMessages.removeDialog", e),
                this.observable.fireEvent(
                    "notify:customMessages.messagesClosed"
                );
        },
    }),
    (Services.CustomMessage = Sys.extend(
        Services.Base,
        Services.CustomMessage,
        "Services.CustomMessage"
    )),
    Sys.ns("Services"),
    (Services.Dialog = {
        constructor: function () {
            Services.Dialog.superclass.constructor.apply(this, arguments),
                (this._queue = []),
                (this._currentDialog = null);
        },
        _setupEvents: function () {
            this.observable.on({
                "request:dialogWindow.showDialog": this.show.bind(this),
                "request:dialogWindow.removeDialog": this.remove.bind(this),
            });
        },
        isShowing: function () {
            return null !== this._currentDialog;
        },
        isDialogsQueueEmpty: function () {
            return 0 === this._queue.length;
        },
        show: function (e) {
            var t = Sys.apply({}, e);
            Sys.isGcmEnabled
                ? this._gcmEnabled(e)
                : (t.readyToShow ||
                      (t.id || (t.id = Sys.utils.pseudoGUID()),
                      (t.text = this._parseTextSegments(e.text)),
                      (t.buttons = this._wrapButtonActions(
                          e.buttons || [],
                          t.id
                      )),
                      (t.readyToShow = !0)),
                  this._currentDialog
                      ? e.fatal && !this._currentDialog.fatal
                          ? (this.remove(this._currentDialog),
                            (this._currentDialog = t),
                            this.publish("show", t))
                          : this._queue.push(t)
                      : ((this._currentDialog = t), this.publish("show", t)));
        },
        next: function () {
            return (this._currentDialog = null), this._queue.shift() || null;
        },
        remove: function (e) {
            var t;
            return (
                !!Sys.isDefined(e) &&
                (this._currentDialog && this._currentDialog.id === e
                    ? (this.publish("hide", e),
                      (this._currentDialog = null),
                      !0)
                    : ((t = this._queue.length),
                      (this._queue = this._queue.filter(function (t) {
                          return t.id !== e;
                      })),
                      t !== this._queue.length))
            );
        },
        _wrapButtonActions: function (e, t) {
            var n = this;
            return e.map(function (e) {
                return {
                    primary: !!e.primary && e.primary,
                    text: e.text,
                    action: function () {
                        var s;
                        e.action && e.action.call(e.scope),
                            n.publish("hide", t),
                            (s = n.next()),
                            s
                                ? n.show(s)
                                : n.observable.fireEvent(
                                      "notify:customMessages.messagesClosed"
                                  );
                    },
                };
            });
        },
        _gcmEnabled: function (e) {
            var t = this,
                n = "stopped" === e.severity,
                s = {
                    category: "MULTI_CHOICE_DIALOG",
                    severity: n ? "ERROR" : "INFO",
                    message: Sys.isDefined(e.text) ? e.text : e.title,
                    errorCode: "ERROR",
                    actions: [],
                    revert: !1,
                    extraParameters: {},
                },
                i = [];
            Sys.each(e.buttons, function (e) {
                i.push(e.text), s.actions.push(e.action);
            }),
                (s.extraParameters.options = i),
                t.observable.fireEvent("request:gcmProxy.handleError", s);
        },
        _parseTextSegments: function (e) {
            var t,
                n,
                s,
                i,
                r = /\[([^\]]+)\]\(([^)]+)\)/;
            return r.test(e)
                ? ((t = e.split(/(\[[^\]]+\]\([^)]+\))/)),
                  t.reduce(function (e, t) {
                      return (
                          r.test(t)
                              ? ((n = t.match(r)),
                                (s = n[1]),
                                (i = n[2]),
                                e.push({
                                    text: s,
                                    url: i,
                                }))
                              : e.push({
                                    text: t,
                                }),
                          e
                      );
                  }, []))
                : [
                      {
                          text: e || "",
                      },
                  ];
        },
    }),
    (Services.Dialog = Sys.extend(
        Services.Base,
        Services.Dialog,
        "Services.Dialog"
    )),
    Sys.ns("Services"),
    (Services.Error = {
        constructor: function () {
            Services.Error.superclass.constructor.apply(this, arguments);
        },
        _setupEvents: function () {
            this.observable.on({
                "notify:errorManager.error": this._errorTriggered.bind(this),
                "notify:dialogBoxClosed": this._dialogBoxClosed.bind(this),
            });
        },
        handleError: function (e) {
            this.observable.fireEvent("request:errorManager.handleError", e);
        },
        _errorTriggered: function (e, t) {
            this.publish("triggered", e, t);
        },
        _errorResolved: function () {
            this.publish("resolved");
        },
        _dialogBoxClosed: function (e) {
            e && "error" === e.name && this._errorResolved();
        },
    }),
    (Services.Error = Sys.extend(
        Services.Base,
        Services.Error,
        "Services.Error"
    )),
    Sys.ns("Services"),
    (Services.FreeRounds = {
        constructor: function (e) {
            Services.FreeRounds.superclass.constructor.apply(this, arguments),
                (this._active = !1),
                (this._remaining = 0),
                (this._totalWinCoins = 0),
                (this._totalWinCash = 0),
                this._onResponseParsed(e.initResponse);
        },
        _setupEvents: function () {
            this.observable.on({
                "notify:freeRounds.started": this._started.bind(this),
                "notify:freeRounds.ended": this._ended.bind(this),
                "notify:freeRounds.nextRound": this._next.bind(this),
                "notify:responseParser.responseParsed":
                    this._onResponseParsed.bind(this),
                "notify:freeRounds.reInitResponseReceived":
                    this._onReInitResponseReceived.bind(this),
            });
        },
        isActive: function () {
            return this._active;
        },
        setFreeRoundsLeft: function (e) {
            this._remaining = e;
        },
        getRemaining: function () {
            return this._remaining;
        },
        getTotalWinCoins: function () {
            return this._totalWinCoins;
        },
        getTotalWinCash: function () {
            return this._totalWinCash;
        },
        _started: function (e) {
            (this._active = !0),
                (this._remaining = e),
                this.publish("started", e);
        },
        _next: function (e, t) {
            (this._remaining = t), this.publish("next", t, e);
        },
        _ended: function () {
            (this._active = !1), (this._remaining = 0), this.publish("ended");
        },
        _onResponseParsed: function (e) {
            var t = Services.settingsManager.getSetting("denomination");
            (this._remaining = parseInt(e.freeRoundsLeft, 10) || 0),
                (this._totalWinCash = parseInt(e.freeRoundsWinTot, 10) || 0),
                (this._totalWinCoins = this._totalWinCash / t);
        },
        _onReInitResponseReceived: function (e) {
            this._onResponseParsed(e), this.publish("reInit", e);
        },
    }),
    (Services.FreeRounds = Sys.extend(
        Services.Base,
        Services.FreeRounds,
        "Services.FreeRounds"
    )),
    Sys.ns("Services"),
    (Services.FreeSpins = {
        constructor: function (e) {
            Services.FreeSpins.superclass.constructor.apply(this, arguments),
                (this._isActive = !1),
                (this._freeSpinsLeft = 0);
        },
        _setupEvents: function () {
            this.observable.on({
                "notify:freeSpinIntro.closed":
                    this.setFreeSpinsStarted.bind(this),
                "notify:freeSpinOutro.closed":
                    this.setFreeSpinsEnded.bind(this),
            });
        },
        isActive: function () {
            return this._isActive;
        },
        setFreeSpinsLeft: function (e) {
            this._freeSpinsLeft = e;
        },
        updateCounter: function () {
            this.publish("changed");
        },
        getFreeSpinsLeft: function () {
            return this._freeSpinsLeft;
        },
        showCounter: function () {
            this.publish("show");
        },
        hideCounter: function () {
            this.publish("hide");
        },
        setFreeSpinsStarted: function () {
            (this._isActive = !0), this.publish("started", this._freeSpinsLeft);
        },
        setFreeSpinsEnded: function () {
            (this._isActive = !1), this.publish("ended");
        },
    }),
    (Services.FreeSpins = Sys.extend(
        Services.Base,
        Services.FreeSpins,
        "Services.FreeSpins"
    )),
    Sys.ns("Services"),
    (Services.Game = {
        constructor: function (e) {
            var t, n;
            Services.Game.superclass.constructor.apply(this, arguments),
                (t = e.initResponse),
                (n = e.parsedResponse),
                (this._isPlayForFun = t.playforfun),
                (this._isGameHistoryAvailable = t.historybutton),
                (this._inBaseGame = !0),
                (this._ready = !1),
                (this._modes = [
                    Services.storage.readData("playModeManager.modes"),
                ]),
                (this._homeButtonVisible = !1),
                (this._currentMode = ""),
                (this._isIdle = !1),
                e.parsedResponse.g4mode
                    ? (this._isQuickSpinAvailable = !1)
                    : void 0 !== n.config &&
                      void 0 !== n.config.gameParameters &&
                      void 0 !== n.config.gameParameters.quickSpinAvailable
                    ? (this._isQuickSpinAvailable =
                          n.config.gameParameters.quickSpinAvailable)
                    : (this._isQuickSpinAvailable = !0);
        },
        _setupEvents: function () {
            this.observable.on({
                "notify:stateHandler.leavingBeforeLoaderCloseState":
                    this._onLoaderClosed.bind(this),
                "notify:stateHandler.enteringIdleState":
                    this._onEnteringIdle.bind(this),
                "notify:stateHandler.leavingIdleState":
                    this._onLeavingIdle.bind(this),
                "notify:gameModeChanged": this._gameModeChanged.bind(this),
                "notify:stateHandler.enteringBonusProgramWidgetState":
                    this._setDisplayMode.bind(this, "TOPBAR"),
                "notify:bonusProgramWidget.reInit": this._setDisplayMode.bind(
                    this,
                    "TOPBAR"
                ),
                "notify:bonusProgramWidget.closed": this._setDisplayMode.bind(
                    this,
                    "DEFAULT"
                ),
                "request:playModeManager.addMode": this.addGameMode.bind(this),
                "service:pluginMenu.opened": this._setDisplayMode.bind(
                    this,
                    "TOPBAR"
                ),
                "service:pluginMenu.closed": this._pluginMenuClosed.bind(this),
                "request:playModeManager.removeMode":
                    this.removeGameMode.bind(this),
                "notify:responseParser.gameConfigurationParsed":
                    this._onGameConfigurationParsed.bind(this),
            });
        },
        isReady: function () {
            return this._ready;
        },
        isPlayForFun: function () {
            return this._isPlayForFun;
        },
        isIdle: function () {
            return this._isIdle;
        },
        isGameHistoryAvailable: function () {
            return this._isGameHistoryAvailable;
        },
        getCurrentPlatform: function () {
            return Platform.isDesktopDevice
                ? "desktop"
                : Platform.isTabletDevice
                ? "tablet"
                : "mobile";
        },
        goToLobby: function (e) {
            Sys.utils.goToLobby(e);
        },
        isHomeButtonVisible: function () {
            return this._homeButtonVisible;
        },
        isHomeButtonAvailable: function () {
            return Sys.utils.isHomeAvailable();
        },
        hideHomeButton: function () {
            this._homeButtonVisible &&
                ((this._homeButtonVisible = !1),
                this.publish("hideHomeButton"));
        },
        showHomeButton: function () {
            this.isHomeButtonAvailable() &&
                ((this._homeButtonVisible = !0),
                this.publish("showHomeButton"));
        },
        goToHistory: function () {
            var e = Resources.readData("historyUrl");
            this.isGameHistoryAvailable() &&
                (Platform.isDesktopDevice
                    ? Sys.utils.openNewBrowserTab(e, "gameHistory")
                    : Sys.utils.setWindowLocation(e));
        },
        getGameModes: function () {
            return this._modes;
        },
        addGameMode: function (e) {
            this._modes.indexOf(e) > -1 || this._modes.push(e);
        },
        removeGameMode: function (e) {
            var t = this._modes.indexOf(e);
            -1 !== t && this._modes.splice(t, 1);
        },
        _gameReady: function () {
            (this._ready = !0), this.publish("ready");
        },
        _gameModeChanged: function (e) {
            "BASIC" === e
                ? ((this._inBaseGame = !0),
                  this.publish("enteringMainGame"),
                  this._setDisplayMode("DEFAULT"))
                : this._inBaseGame &&
                  ((this._inBaseGame = !1),
                  this.publish("leavingMainGame"),
                  this._setDisplayMode("MINIMAL")),
                this.publish("modeChanged", e);
        },
        _setDisplayMode: function (e) {
            this._currentMode !== e &&
                ((this._currentMode = e),
                this.publish("setDisplayMode", this._currentMode));
        },
        _pluginMenuClosed: function () {
            this._inBaseGame
                ? this._setDisplayMode("DEFAULT")
                : this._setDisplayMode("MINIMAL");
        },
        _onLoaderClosed: function () {
            this._gameReady(), this.showHomeButton();
        },
        _onEnteringIdle: function () {
            this._isIdle = !0;
        },
        _onLeavingIdle: function () {
            this._isIdle = !1;
        },
        _onGameConfigurationParsed: function (e, t) {
            Resources.storeData(
                "gameServerInitResponse",
                Sys.utils.queryStringToObject(t.responseText)
            ),
                Resources.storeData("gameServerInitResponseObject", e),
                Resources.storeData(
                    "unParsedGameServerInitResponse",
                    t.responseText
                );
        },
        isQuickSpinAvailable: function () {
            return this._isQuickSpinAvailable;
        },
    }),
    (Services.Game = Sys.extend(Services.Base, Services.Game, "Services.Game")),
    Sys.ns("Services"),
    (Services.GameRound = {
        constructor: function (e) {
            var t;
            Services.GameRound.superclass.constructor.apply(this, arguments),
                (t = e.parsedResponse),
                (this._roundActive = !0 === e.initResponse.restore),
                (this._hasQuickStopped = !1),
                (this._isRespin = !1),
                (this._isGameDisabled = !1),
                t.g4mode
                    ? (this._isQuickStopAvailable = !1)
                    : void 0 !== t.config &&
                      void 0 !== t.config.gameParameters &&
                      void 0 !== t.config.gameParameters.quickStopAvailable
                    ? (this._isQuickStopAvailable =
                          t.config.gameParameters.quickStopAvailable)
                    : (this._isQuickStopAvailable = !0);
        },
        _setupEvents: function () {
            this.observable.on({
                "notify:stateHandler.enteringIdleState":
                    this._onGameRoundEnded.bind(this),
                "notify:stateHandler.leavingIdleState":
                    this._onGameRoundStarted.bind(this),
                "notify:responseParser.responseParsed":
                    this._onResponseParsed.bind(this),
                "request:stopGame.disable": this._onGameDisabled.bind(this),
            });
        },
        start: function () {
            this.isRoundActive() ||
                this._isGameDisabled ||
                ((this._hasQuickStopped = !1),
                this._startNewRound(),
                this.publish("startNewRound"));
        },
        quickStop: function () {
            this.isRoundActive() &&
                this.isQuickStopAvailable() &&
                !this._hasQuickStopped &&
                (this._quickStop(),
                (this._hasQuickStopped = !0),
                this.publish("quickStopped"));
        },
        isRoundActive: function () {
            return this._roundActive;
        },
        isQuickStopAvailable: function () {
            return this._isQuickStopAvailable;
        },
        isRespin: function () {
            return this._isRespin;
        },
        _startNewRound: function () {
            this.observable.fireEvent("request:spin.startNewRound");
        },
        _quickStop: function () {
            this.observable.fireEvent("request:spin.quickStop");
        },
        _onGameRoundStarted: function () {
            (this._roundActive = !0), this.publish("started");
        },
        _onGameRoundEnded: function () {
            this._roundActive &&
                ((this._roundActive = !1),
                this.publish("ended"),
                this._isGameDisabled && this.publish("stopped"));
        },
        _onGameDisabled: function () {
            this._isGameDisabled = !0;
        },
        _onResponseParsed: function (e) {
            this._isRespin = "respin" === e.clientaction;
        },
    }),
    (Services.GameRound = Sys.extend(
        Services.Base,
        Services.GameRound,
        "Services.GameRound"
    )),
    Sys.ns("Services"),
    (Services.GameRules = {
        constructor: function () {
            var e,
                t = Resources.readData("queryData");
            Services.GameRules.superclass.constructor.apply(this, arguments),
                (this._enabled = !0),
                (e = t.hasOwnProperty("gameRulesURL") && "" === t.gameRulesURL),
                e && (this._enabled = !1),
                (this._open = !1),
                (this._content = null);
        },
        setState: function (e) {
            switch (e) {
                case "opened":
                    this.openPopup();
                    break;
                case "closed":
                    this.closePopup();
                    break;
                default:
                    throw new Error("Unsupported GameRules state: " + e);
            }
        },
        enable: function () {
            this._enabled || ((this._enabled = !0), this.publish("enabled"));
        },
        disable: function () {
            this._enabled && ((this._enabled = !1), this.publish("disabled"));
        },
        openPopup: function () {
            this._open || ((this._open = !0), this.publish("opened"));
        },
        closePopup: function () {
            this._open && ((this._open = !1), this.publish("closed"));
        },
        setContent: function (e) {
            null === this.getExternalGameRulesURL() &&
                ((this._content = e), this.publish("contentChanged", e));
        },
        getContent: function () {
            return this._content;
        },
        isEnabled: function () {
            return this._enabled;
        },
        isOpen: function () {
            return this._open;
        },
        goToGameRules: function () {
            var e = this.getGameRulesURL();
            Platform.isMobileDevice || Platform.isTabletDevice
                ? (window.location.href = e)
                : Platform.isDesktopDevice &&
                  window.open(e, "gameRules").focus();
        },
        getGameRulesURL: function () {
            var e,
                t = Resources.readData("config"),
                n = t.gameRulesPath,
                s = Resources.readData("language"),
                i = Resources.readData("queryData"),
                r = i.gameId,
                o = i.showRtp,
                a = i.gameRulesURL;
            return void 0 !== a && "undefined" !== a
                ? a
                : ((r = r.replace(/_sw$/, "")),
                  (e = "../" + n + "templates/" + r + "." + s.lang + ".html"),
                  !1 === o &&
                      (e = e
                          .split(s.lang + ".html")
                          .join("nortp." + s.lang + ".html")),
                  e);
        },
        getExternalGameRulesURL: function () {
            var e, t, n;
            return (
                (t = Resources.readData("queryData")),
                (e = t.gameRulesURL),
                (n = void 0 !== e && "undefined" !== e),
                n ? e : null
            );
        },
    }),
    (Services.GameRules = Sys.extend(
        Services.Base,
        Services.GameRules,
        "Services.GameRules"
    )),
    Sys.ns("Services"),
    (Services.GameSettings = {
        constructor: function (e) {
            Services.GameSettings.superclass.constructor.apply(this, arguments),
                (this._enabledSettings = []),
                (this._gameSettings = []),
                (this._settingsOpened = !1),
                e.parsedResponse.g4mode
                    ? ((this._isQuickSpinAvailable = !1),
                      (this._isQuickSpinActive = !1))
                    : void 0 !== e.parsedResponse.config &&
                      void 0 !== e.parsedResponse.config.gameParameters &&
                      void 0 !==
                          e.parsedResponse.config.gameParameters
                              .quickSpinAvailable
                    ? ((this._isQuickSpinAvailable =
                          e.parsedResponse.config.gameParameters.quickSpinAvailable),
                      void 0 !==
                          e.parsedResponse.config.gameParameters
                              .quickSpinActive &&
                          (this._isQuickSpinActive =
                              e.parsedResponse.config.gameParameters.quickSpinActive))
                    : ((this._isQuickSpinAvailable = !0),
                      (this._isQuickSpinActive = !1)),
                this._prepareGameSettings();
        },
        _getValue: function (e) {
            var t;
            try {
                t = JSON.parse(e);
            } catch (n) {
                t = e;
            }
            if ("undefined" !== e) return t;
        },
        _prepareGameSettings: function () {
            var e = this;
            [
                {
                    id: "quickSpin",
                    languageID: window.Language.Keys.setting_quickSpinGame,
                    defaultValue: e._isQuickSpinActive,
                    value: e._isQuickSpinActive,
                    persistent: !0,
                    isGameSetting: !0,
                    enabled: e._isQuickSpinAvailable,
                },
                {
                    id: "spacebarToSpin",
                    languageID: window.Language.Keys.setting_spaceSpin,
                    defaultValue: !1,
                    value: !1,
                    persistent: !0,
                    isGameSetting: !0,
                    enabled: Platform.isDesktopDevice,
                },
                {
                    id: "leftHandMode",
                    languageID: window.Language.Keys.setting_leftHandMode,
                    defaultValue: !1,
                    value: !1,
                    persistent: !0,
                    isGameSetting: !0,
                    enabled: !Platform.isDesktopDevice,
                },
                {
                    id: "volume",
                    defaultValue: 1,
                    persistent: !0,
                    isGameSetting: !1,
                    value: 1,
                },
                {
                    id: "volumeMute",
                    defaultValue: !Platform.isDesktopDevice,
                    persistent: !0,
                    isGameSetting: !1,
                    value: !Platform.isDesktopDevice,
                },
            ].forEach(this._addSetting, this);
        },
        _addSetting: function (e) {
            var t,
                n = e.defaultValue,
                s = this,
                i = s._getValue(s.getSetting(e.id, !0));
            "volumeMute" !== e.id || Platform.isDesktopDevice
                ? (e.persistent && void 0 !== i && (n = i),
                  (t = Sys.apply(e, {
                      value: n,
                  })))
                : (t = e),
                s.setSetting({
                    id: t.id,
                    value: t.value,
                    enabled: t.enabled,
                    persistent: t.persistent,
                }),
                this._gameSettings.push(t);
        },
        addSetting: function (e) {
            this._addSetting(e), this.publish("settingAdded", e.id);
        },
        _getGameSetting: function (e) {
            return this._gameSettings.filter(function (t) {
                return t && t.id === e;
            })[0];
        },
        getGameSettings: function () {
            return this._gameSettings
                .filter(function (e) {
                    return e && e.isGameSetting;
                })
                .map(function (e) {
                    return {
                        available: e.enabled,
                        name: window.Services.language.getText(e.languageID),
                        key: e.id,
                    };
                });
        },
        _setupEvents: function () {
            this.observable.on({
                "notify:settingsManager.settingChanged":
                    this._settingChanged.bind(this),
            });
        },
        isOpen: function () {
            return this._open;
        },
        isAnySettingsOpen: function () {
            return this._settingsOpened;
        },
        open: function () {
            this._open || ((this._open = !0), this.publish("opened"));
        },
        close: function () {
            this._open && ((this._open = !1), this.publish("closed"));
        },
        hasSetting: function (e) {
            return void 0 !== this.getSetting(e);
        },
        getSetting: function (e, t, n) {
            var s = Services.settingsManager.getSetting(e);
            return (
                t &&
                    Services.localStorageManager.hasData(e) &&
                    (s = Services.localStorageManager.readData(e)),
                "volume" === e && this.getSetting("volumeMute") && (s = 0),
                "isCash" !== e ||
                    Sys.isDefined(s) ||
                    (s = "cash" === Resources.readData("defaultBettingMode")),
                n ? this._getValue(s) : s
            );
        },
        isSettingEnabled: function (e) {
            return this._enabledSettings.indexOf(e) > -1;
        },
        setSettingByKeyValue: function (e, t) {
            var n = this._getGameSetting(e);
            n
                ? this.setSetting({
                      id: e,
                      value: t,
                      enabled: n.enabled,
                      persistent: n.persistent,
                  })
                : this.setSetting({
                      id: e,
                      value: t,
                  });
        },
        setSetting: function (e) {
            var t = e.id,
                n = void 0 === e.enabled || !0 === e.enabled,
                s = !0 === e.persistent;
            Services.settingsManager.storeSetting(t, e.value, s),
                this._changeSettingStatus(t, n);
        },
        _changeSettingStatus: function (e, t) {
            var n = this._enabledSettings.indexOf(e);
            this.hasSetting(e) &&
                (t && -1 === n
                    ? this._enabledSettings.push(e)
                    : !t && n > -1 && this._enabledSettings.splice(n, 1));
        },
        _settingChanged: function (e, t) {
            this.publish("changed", {
                id: e,
                value: t,
            });
        },
        setViewState: function (e) {
            "DEFAULT" === e || this._settingsOpened
                ? "DEFAULT" === e &&
                  ((this._settingsOpened = !1), this.publish("settingsClosed"))
                : ((this._settingsOpened = !0), this.publish("settingsOpened"));
        },
    }),
    (Services.GameSettings = Sys.extend(
        Services.Base,
        Services.GameSettings,
        "Services.GameSettings"
    )),
    Sys.ns("Services"),
    (Services.GameInformation = {
        constructor: function () {
            var e,
                t = Resources.readData("queryData"),
                n =
                    Utils.CONSTANTS.JURISDICTION_SPECIFIC_CODES
                        .SHOW_GAME_INFORMATION,
                s = !1;
            Services.GameInformation.superclass.constructor.apply(
                this,
                arguments
            ),
                (this._gameClientManifestURL = "../META-INF/MANIFEST.MF"),
                (e = t.jurisdictionCode),
                (s =
                    void 0 !== e &&
                    n.some(function (t) {
                        return t === e;
                    })),
                (this._minBet = null),
                (this._maxBet = null),
                (this._gameClientVersion = null),
                (this._gameServerVersion = null),
                s &&
                    (this.assignGameInformation(),
                    this.observable.on({
                        "notify:freeRounds.started":
                            this.assignGameInformation.bind(this),
                        "notify:freeRounds.ended":
                            this.assignGameInformation.bind(this),
                    }));
        },
        getGameInformation: function () {
            return {
                minBet: this._minBet,
                maxBet: this._maxBet,
                gameClientVersion: this._gameClientVersion,
                gameServerVersion: this._gameServerVersion,
            };
        },
        setMinAndMaxBetCents: function (e) {
            (this._minBet = e.minBet),
                (this._maxBet = e.maxBet),
                this.publish("changed");
        },
        fetchManifestData: function (e) {
            return Sys.utils.httpGet({
                url: e,
            });
        },
        assignGameClientVersion: function () {
            var e = this;
            this.fetchManifestData(this._gameClientManifestURL)
                .done(function (t) {
                    var n,
                        s = t.responseText;
                    (n = e.getGameClientVersion(s)),
                        (e._gameClientVersion = "" === n ? null : n);
                })
                .fail(function () {
                    console.error("Failed to fetch manifest file");
                })
                .always(function () {
                    e.publish("changed");
                });
        },
        assignGameInformation: function () {
            var e,
                t = Resources.readData("gameServerInitResponseObject"),
                n = this.calculateMinAndMaxBetCents(t);
            (e = this.getGameServerVersion(t)),
                (this._minBet = n.minBet),
                (this._maxBet = n.maxBet),
                (this._gameServerVersion = e),
                this.assignGameClientVersion(),
                this.publish("changed");
        },
        calculateMinAndMaxBetCents: function (e) {
            var t,
                n,
                s,
                i,
                r,
                o,
                a,
                l,
                u = this.getCustomCoinValues();
            return (
                (t = u.length > 0),
                (a = e.betlevel.all),
                (l = e.denomination.all),
                (n = "number" == typeof a ? [a] : a.slice()),
                (s = Services.moneyManager.model.readData("betlineCoins")),
                (l = "number" == typeof l ? [l] : l.slice()),
                (i = t
                    ? u
                    : l.map(function (e) {
                          return e * s;
                      })),
                (r = n[0] * i[0]),
                (o = n[n.length - 1] * i[i.length - 1]),
                {
                    minBet: r,
                    maxBet: o,
                }
            );
        },
        getGameClientVersion: function (e) {
            var t,
                n = "Implementation-Version:";
            return (
                (t = new RegExp(n + ".*")),
                (e.match(t) || [n])[0].split(n)[1].trim()
            );
        },
        getGameServerVersion: function (e) {
            return e.gameServerVersion || null;
        },
        getCustomCoinValues: function (e) {
            var t = Resources.readData("queryData");
            return Utils.Helpers.getCustomCoinValues(e, t);
        },
    }),
    (Services.GameInformation = Sys.extend(
        Services.Base,
        Services.GameInformation,
        "Services.GameInformation"
    )),
    Sys.ns("Services"),
    (Services.Language = {
        constructor: function () {
            Services.Language.superclass.constructor.apply(this, arguments);
        },
        getText: function (e, t) {
            return Services.languageManager.getText(e, t);
        },
        getKeys: function () {
            return Language.Keys;
        },
    }),
    (Services.Language = Sys.extend(
        Services.Base,
        Services.Language,
        "Services.Language"
    )),
    Sys.ns("Services"),
    (Services.Money = {
        MONEY_TYPES: {
            CASH: "cash",
            COINS: "coins",
        },
        constructor: function () {
            Services.Money.superclass.constructor.apply(this, arguments),
                this._setupData();
        },
        _setupEvents: function () {
            this.observable.on({
                "notify:moneyManager.balanceChanged":
                    this._balanceChanged.bind(this),
                "notify:settingsManager.settingChanged":
                    this._moneyTypeChanged.bind(this),
            });
        },
        _setupData: function () {
            (this._types =
                Resources.readData("moneyTypes").MONEY_TYPES.split(",")),
                1 === this._types.length
                    ? ((this._type = this._types[0]),
                      Services.settingsManager.storeSetting(
                          "isCash",
                          "cash" === this._type,
                          !0
                      ))
                    : (this._type =
                          "true" ===
                          Services.localStorageManager.readData("isCash")
                              ? this.MONEY_TYPES.CASH
                              : this.MONEY_TYPES.COINS);
        },
        getBalanceCash: function () {
            return Services.moneyManager.getBalanceCents();
        },
        getBalanceCoins: function () {
            return Services.moneyManager.getBalanceCoins();
        },
        getCurrencyISO: function () {
            return Services.moneyManager.getCurrencyIsoName();
        },
        getType: function () {
            return this._type;
        },
        getTypes: function () {
            return this._types;
        },
        setType: function (e) {
            if (-1 === this._types.indexOf(e))
                throw new Error("Invalid money type");
            (this._type = e), this.publish("typeChanged", e);
        },
        format: function (e, t) {
            var n = t.format || "player",
                s = "number" == typeof t.decimals ? t.decimals : 2;
            return t.useCurrencySign
                ? Services.moneyManager.formatMoneyCurrencySign(e, n, s)
                : Services.moneyManager.formatMoney(e, n, s);
        },
        getCurrencyFormat: function () {
            var e = Resources.readData("moneyformat_player"),
                t = e.getElementsByTagName("dividers")[0],
                n = Number(
                    e.getElementsByTagName("decimals")[0].childNodes[0]
                        .nodeValue
                );
            return {
                iso: e.getElementsByTagName("iso")[0].childNodes[0].nodeValue,
                decimals: n,
                decimalDivider: t.getAttribute("decimal"),
                thousandsDivider: t.getAttribute("thousands"),
            };
        },
        _balanceChanged: function (e) {
            this.publish("balanceChanged", e);
        },
        _moneyTypeChanged: function (e, t) {
            var n;
            "isCash" === e &&
                ((n = this._type),
                (this._type = t
                    ? this.MONEY_TYPES.CASH
                    : this.MONEY_TYPES.COINS),
                Utils.Helpers.logPlayerInteracted(
                    "moneyModeChanged",
                    n,
                    this._type
                ));
        },
    }),
    (Services.Money = Sys.extend(
        Services.Base,
        Services.Money,
        "Services.Money"
    )),
    Sys.ns("Services"),
    (Services.Paytable = {
        constructor: function () {
            Services.Paytable.superclass.constructor.apply(this, arguments),
                (this._enabled = !0),
                (this._open = !1),
                (this._content = []),
                (this._currentPage = null);
        },
        _setupEvents: function () {
            this.observable.on({
                "notify:stateHandler.enteringSpinningState":
                    this.close.bind(this),
                "notify:gameModeChanged": this.close.bind(this),
            });
        },
        enable: function () {
            this._enabled || ((this._enabled = !0), this.publish("enabled"));
        },
        disable: function () {
            this._enabled && ((this._enabled = !1), this.publish("disabled"));
        },
        open: function (e) {
            var t = this.getCurrentPage(),
                n = this._isValidPageNumber(e) ? e : 1;
            (this._currentPage = n),
                (this._open && n === t) ||
                    ((this._open = !0), this.publish("opened", n));
        },
        close: function () {
            this._open &&
                ((this._open = !1),
                (this._currentPage = null),
                this.publish("closed"));
        },
        setContent: function (e) {
            var t = e;
            "string" == typeof e && (t = [e]),
                (this._content = t),
                this.publish("contentChanged", this._content);
        },
        nextPage: function () {
            var e = this._currentPage,
                t = this.getNumberOfPages();
            this.isOpen() &&
                t > 1 &&
                ((this._currentPage = this._currentPage + 1),
                this._currentPage > t && (this._currentPage = 1),
                this.publish("pageChanged", this._currentPage, e, !0));
        },
        previousPage: function () {
            var e = this._currentPage,
                t = this.getNumberOfPages();
            this.isOpen() &&
                t > 1 &&
                ((this._currentPage = this._currentPage - 1),
                this._currentPage <= 0 && (this._currentPage = t),
                this.publish("pageChanged", this._currentPage, e, !0));
        },
        updatePageNumber: function (e, t) {
            (this._currentPage = e),
                this.publish("pageChanged", this._currentPage, t, !1);
        },
        getNumberOfPages: function () {
            return this._content.length;
        },
        getCurrentPage: function () {
            return this._currentPage;
        },
        getContent: function () {
            return this._content;
        },
        isEnabled: function () {
            return this._enabled;
        },
        isOpen: function () {
            return this._open;
        },
        _isValidPageNumber: function (e) {
            return (
                "number" == typeof e &&
                !isNaN(e) &&
                e > 0 &&
                e <= this.getNumberOfPages()
            );
        },
    }),
    (Services.Paytable = Sys.extend(
        Services.Base,
        Services.Paytable,
        "Services.Paytable"
    )),
    Sys.ns("Services"),
    (Services.PluginMenu = {
        constructor: function () {
            Services.PluginMenu.superclass.constructor.apply(this, arguments),
                (this._enabled = !1),
                (this._icon = null),
                (this._initialized = !1),
                (this._notification = !1),
                (this._open = !1),
                (this._overlay = null),
                (this._sizeOptions = null);
        },
        _setupEvents: function () {
            this.observable.on({
                "request:pluginMenu.init": this._init.bind(this),
                "request:pluginMenu.activate": this.open.bind(this),
                "request:pluginMenu.deactivate": this.close.bind(this),
                "request:pluginMenu.notification":
                    this.showNotification.bind(this),
                "request:pluginMenu.changeMenuHeight":
                    this.changeHeight.bind(this),
                "request:pluginMenu.enable": this.enable.bind(this),
                "request:pluginMenu.disable": this.disable.bind(this),
                "notify:viewport.scaled":
                    this._adjustPluginOnViewportResize.bind(this),
                "notify:platform.orientationChanged":
                    this._orientationChanged.bind(this),
                "notify:stateHandler.enteringIdleState": this.enable.bind(this),
                "notify:stateHandler.leavingIdleState": this.disable.bind(this),
            });
        },
        _adjustPluginOnViewportResize: function () {
            window.requestAnimationFrame(
                function () {
                    this._adjustPluginTopbar();
                }.bind(this)
            );
        },
        isEnabled: function () {
            return this._enabled;
        },
        isInitialized: function () {
            return this._initialized;
        },
        enable: function () {
            this.isEnabled() ||
                !this._initialized ||
                Services.autoplay.isActive() ||
                ((this._enabled = !0), this.publish("enabled"));
        },
        disable: function () {
            this.isEnabled() &&
                !Services.autoplay.isActive() &&
                ((this._enabled = !1), this.publish("disabled"));
        },
        isOpen: function () {
            return this._open;
        },
        open: function () {
            this.isOpen() ||
                ((this._open = !0),
                (this._iframe.style.display = "block"),
                (this._overlay.el.style.display = "block"),
                this.publish("opened"),
                this.observable.fireEvent("service:pluginMenu.opened"),
                this.hideNotification(),
                setTimeout(
                    function () {
                        this._adjustPluginTopbar();
                    }.bind(this)
                ));
        },
        _adjustPluginTopbar: function () {
            var e, t;
            return (
                !!this._initialized &&
                ((t = this._getTopBarHeight()),
                this._open &&
                    document.getElementById("play-ui") &&
                    (document.getElementById("viewport").style.marginTop =
                        t + "px"),
                (e = this._getNewHeight(
                    this._sizeOptions,
                    Utils.Platform.getOrientation(),
                    t
                )),
                this._iframe.setAttribute("height", e + "%"),
                !0)
            );
        },
        _getTopBarHeight: function () {
            return this._open && document.getElementById("play-ui")
                ? document.getElementById("playui-topbar").offsetHeight
                : 0;
        },
        close: function () {
            this.isOpen() &&
                ((this._open = !1),
                (this._iframe.style.display = "none"),
                (this._overlay.el.style.display = "none"),
                this.publish("closed"),
                this.observable.fireEvent("service:pluginMenu.closed"),
                (document.getElementById("viewport").style.marginTop = ""));
        },
        showNotification: function (e) {
            e &&
                ((this._notification = !0),
                this.publish("notificationShown"),
                this._displayIcon(this._getIcon(e)));
        },
        hideNotification: function () {
            this._notification &&
                ((this._notification = !1), this._displayIcon(this._icon));
        },
        changeIcon: function (e) {
            (this._icon = this._getIcon(e)), this._displayIcon(this._icon);
        },
        changeHeight: function (e) {
            var t;
            return (
                !(!Sys.isDefined(e) || null === e) &&
                ((this._sizeOptions = e),
                (t = this._getNewHeight(
                    e,
                    Utils.Platform.getOrientation(),
                    this._getTopBarHeight()
                )),
                this._iframe.setAttribute("height", t + "%"),
                this.publish("changeHeight", e),
                !0)
            );
        },
        _init: function (e, t, n) {
            (this._iframe = document.getElementById("netEntExtendPlugin")),
                (this._iframe.style.display = "none"),
                this._createOverlay(),
                (this._initialized = !0),
                this.changeHeight(t),
                this.changeIcon(e),
                n && (this._iframe.style.backgroundColor = "rgba(0,0,0,0)"),
                this.publish("init");
        },
        _displayIcon: function (e) {
            this.publish("iconChanged", e);
        },
        _orientationChanged: function () {
            this._initialized && this.changeHeight(this._sizeOptions);
        },
        _getNewHeight: function (e, t, n) {
            var s,
                i,
                r = Utils.Platform.getViewportSize().height,
                o = 0;
            return (
                "number" == typeof e
                    ? (o = e)
                    : null !== e &&
                      "object" == typeof e &&
                      "number" == typeof (s = e[t.toLowerCase()]) &&
                      (o = s),
                0 === o && (o = r),
                (i = o >= r && "LANDSCAPE" === t ? r + n : r),
                (Math.min(r, o) / i) * 100
            );
        },
        _createOverlay: function () {
            this._overlay = new Sys.Element({
                tag: "div",
                id: "pluginMenuDarkOverlay",
                style: [
                    "position: absolute;",
                    "top: 0;",
                    "left: 0;",
                    "width: 100%;",
                    "height: 100%;",
                    "background-color: rgba(0, 0, 0, 0.6);",
                    "z-index: 1000;",
                    "display:none",
                ].join(""),
                renderTo: "gameWrapper",
                onClick: this.close.bind(this),
            });
        },
        _getIcon: function (e) {
            var t = e;
            return (
                ("string" == typeof t && 0 !== t.length && "default" !== t) ||
                    (t = null),
                t
            );
        },
    }),
    (Services.PluginMenu = Sys.extend(
        Services.Base,
        Services.PluginMenu,
        "Services.PluginMenu"
    )),
    Sys.ns("Services"),
    (Services.Response = {
        constructor: function (e) {
            Services.Response.superclass.constructor.apply(this, arguments),
                (this._initResponse = e.initResponse),
                (this._serverResponse = e.initResponse);
        },
        _setupEvents: function () {
            this.observable.on({
                "notify:responseParser.responseParsed":
                    this._onResponseParsed.bind(this),
            });
        },
        getInitResponse: function () {
            return this._initResponse;
        },
        getServerResponse: function () {
            return this._serverResponse;
        },
        _onResponseParsed: function (e) {
            (this._serverResponse = e),
                this.publish("response", e),
                !0 === e.restore && this.publish("restored", e);
        },
    }),
    (Services.Response = Sys.extend(
        Services.Base,
        Services.Response,
        "Services.Response"
    )),
    Sys.ns("Services"),
    (Services.Spin = {
        constructor: function () {
            Services.Spin.superclass.constructor.apply(this, arguments),
                (this._isAnimating = !1),
                (this._isInSpiningState = !1);
        },
        _setupEvents: function () {
            this.observable.on({
                "notify:stateHandler.enteringSpinningState":
                    this._spinStarted.bind(this),
                "notify:stateHandler.leavingSpinningState":
                    this._spinEnded.bind(this),
            });
        },
        isAnimating: function () {
            return this._isAnimating;
        },
        isInSpinningState: function () {
            return this._isInSpiningState;
        },
        setAnimationStarted: function () {
            (this._isAnimating = !0), this.publish("animationStarted");
        },
        setAnimationEnded: function () {
            (this._isAnimating = !1), this.publish("animationEnded");
        },
        _spinStarted: function () {
            (this._isInSpiningState = !0), this.publish("started");
        },
        _spinEnded: function () {
            (this._isInSpiningState = !1), this.publish("ended");
        },
    }),
    (Services.Spin = Sys.extend(Services.Base, Services.Spin, "Services.Spin")),
    Sys.ns("Services"),
    (Services.Ticker = {
        constructor: function () {
            Services.Ticker.superclass.constructor.apply(this, arguments),
                (this._showing = !1);
        },
        _setupEvents: function () {
            this.observable.on({
                "request:ticker.show": this.show.bind(this),
                "request:ticker.hide": this.hide.bind(this),
            });
        },
        show: function (e) {
            Array.isArray(e) &&
                e.length > 0 &&
                e.every(this._validateMessageSegment.bind(this)) &&
                ((this._showing = !0), this.publish("show", e));
        },
        hide: function () {
            this._showing && ((this._showing = !1), this.publish("hide"));
        },
        _validateMessageSegment: function (e) {
            return e && "string" == typeof e.text;
        },
    }),
    (Services.Ticker = Sys.extend(
        Services.Base,
        Services.Ticker,
        "Services.Ticker"
    )),
    Sys.ns("Services"),
    (Services.Win = {
        constructor: function (e) {
            Services.Win.superclass.constructor.apply(this, arguments),
                (this._winCoins = 0),
                (this._winCents = 0),
                (this._totalWinCoins = 0),
                (this._totalWinCents = 0),
                (this._winType = "noWin"),
                (this._presentationActive = !1),
                this._onInitResponseParsed(e.initResponse);
        },
        _setupEvents: function () {
            this.observable.on({
                "notify:stateHandler.leavingIdleState": this._reset.bind(this),
                "notify:serverManager.serverErrorReceived":
                    this._reset.bind(this),
                "notify:responseParser.responseParsed":
                    this._onResponseParsed.bind(this),
                "notify:freeRounds.reInitResponseReceived":
                    this._onResponseParsed.bind(this),
                "request:cashField.showWin": this.show.bind(this),
                "notify:standardWin.startPresentation":
                    this._presentationStart.bind(this),
                "notify:standardWin.presentationComplete":
                    this._presentationEnd.bind(this),
                "notify:stateHandler.enteringBigWinState":
                    this._presentationStart.bind(this),
                "notify:bigWin.presentationFinished":
                    this._presentationEnd.bind(this),
                "request:coinsField.showProgressiveWin":
                    this._progressiveWin.bind(this),
            });
        },
        getWinCash: function () {
            return this._winCents;
        },
        getWinCoins: function () {
            return this._winCoins;
        },
        getTotalWinCash: function () {
            return this._totalWinCents;
        },
        getTotalWinCoins: function () {
            return this._totalWinCoins;
        },
        getWinType: function () {
            return this._winType;
        },
        show: function () {
            this.publish("show");
        },
        isPresentationActive: function () {
            return this._presentationActive;
        },
        abortPresentation: function () {
            this.observable.fireEvent("request:abortPresentation");
        },
        _reset: function () {
            (this._winCents = 0),
                (this._winCoins = 0),
                (this._totalWinCents = 0),
                (this._totalWinCoins = 0),
                Services.storage.storeData("cashField.winInCents", 0),
                Services.storage.storeData("cashField.winInCoins", 0);
        },
        _onResponseParsed: function (e) {
            Sys.isDefined(e.wins) &&
                ((this._winCents = e.wins.cents || 0),
                (this._winCoins = e.wins.coins || 0),
                (this._totalWinCents = e.wins.centsTotal || 0),
                (this._totalWinCoins = e.wins.coinsTotal || 0),
                (this._winType = e.wins.winType || "noWin"),
                Services.storage.storeData(
                    "cashField.winInCents",
                    this._winCents
                ),
                Services.storage.storeData(
                    "cashField.winInCoins",
                    this._winCoins
                ));
        },
        _onInitResponseParsed: function (e) {
            !0 === e.restore &&
                ((this._winCents = parseInt(e["game.win.cents"], 10) || 0),
                (this._winCoins = parseInt(e["game.win.coins"], 10) || 0),
                (this._totalWinCents = parseInt(e["totalwin.cents"], 10) || 0),
                (this._totalWinCoins = parseInt(e["totalwin.coins"], 10) || 0),
                Services.storage.storeData(
                    "cashField.winInCents",
                    this._winCents
                ),
                Services.storage.storeData(
                    "cashField.winInCoins",
                    this._winCoins
                ));
        },
        _presentationStart: function () {
            (this._presentationActive = !0), this.publish("presentationStart");
        },
        _presentationEnd: function () {
            this._presentationActive = !1;
        },
        _progressiveWin: function (e) {
            this.publish("showProgressiveWin", e);
        },
    }),
    (Services.Win = Sys.extend(Services.Base, Services.Win, "Services.Win")),
    (Services.initServices = function () {
        var e,
            t = Resources.readData("gameServerInitResponse"),
            n = Resources.readData("gameServerInitResponseObject"),
            s = Services.moneyManager.getCurrencyIsoName();
        (window.Services = Sys.apply(window.Services, {
            activity: new Services.Activity(),
            autoplay: new Services.Autoplay({
                initResponse: t,
                ISO: s,
            }),
            bet: new Services.Bet({
                initResponse: t,
            }),
            clock: new Services.Clock({
                initResponse: t,
                parsedResponse: n,
            }),
            customMessage: new Services.CustomMessage(),
            dialog: new Services.Dialog(),
            error: new Services.Error(),
            freeRounds: new Services.FreeRounds({
                initResponse: t,
            }),
            freeSpins: new Services.FreeSpins({
                initResponse: t,
            }),
            game: new Services.Game({
                initResponse: t,
                parsedResponse: n,
            }),
            gameInformation: new Services.GameInformation(),
            gameRound: new Services.GameRound({
                initResponse: t,
                parsedResponse: n,
            }),
            gameRules: new Services.GameRules(),
            gameSettings: new Services.GameSettings({
                parsedResponse: n,
            }),
            language: new Services.Language(),
            money: new Services.Money(),
            paytable: new Services.Paytable(),
            pluginMenu: new Services.PluginMenu(),
            ticker: new Services.Ticker(),
            win: new Services.Win({
                initResponse: t,
            }),
            response: new Services.Response({
                initResponse: t,
            }),
            spin: new Services.Spin(),
        })),
            (e = new window.Sys.Observable()),
            e.fireEvent("notify:services.init"),
            window.Services.game.on("ready", function () {
                Sys.isGcmEnabled && e.fireEvent("notify:loader.closed");
            });
    }),
    Sys.ns("NetEntExtend.API"),
    (NetEntExtend.API.BaseGetter = {
        platforms: ["desktop", "mobile"],
        isAvailable: function () {
            return !0;
        },
        validateNumArguments: function () {
            return 3 === arguments.length;
        },
        validateArguments: function () {
            return !0;
        },
        func: function () {},
    }),
    Sys.ns("NetEntExtend.API"),
    (NetEntExtend.API.BaseSetter = {
        platforms: ["desktop", "mobile"],
        isAvailable: function () {
            return !Services.gameRound.isRoundActive();
        },
        validateNumArguments: function () {
            return 4 === arguments.length;
        },
        validateArguments: function () {
            return !0;
        },
        func: function () {},
    }),
    Sys.ns("NetEntExtend.API"),
    (NetEntExtend.API.BaseCall = {
        platforms: ["desktop", "mobile"],
        isAvailable: function () {
            return !(
                Services.gameRound.isRoundActive() ||
                Services.dialog.isShowing()
            );
        },
        validateNumArguments: function () {
            return 3 === arguments.length;
        },
        validateArguments: function () {
            return !0;
        },
        func: function () {},
    }),
    Sys.ns("NetEntExtend.API"),
    (NetEntExtend.API.Getters = {
        balanceInCurrency: Sys.applyPropertiesIf(
            {
                func: function () {
                    var e = Services.money.getBalanceCash(),
                        t = Services.money.format(e, {
                            useCurrencySign: !0,
                        }),
                        n = Array.prototype.slice.call(arguments);
                    n.push(t), this.success.apply(this, n);
                },
            },
            NetEntExtend.API.BaseGetter
        ),
        balanceInCents: Sys.applyPropertiesIf(
            {
                func: function () {
                    var e = Services.money.getBalanceCash(),
                        t = Array.prototype.slice.call(arguments);
                    t.push(e), this.success.apply(this, t);
                },
            },
            NetEntExtend.API.BaseGetter
        ),
        betInCurrency: Sys.applyPropertiesIf(
            {
                func: function () {
                    var e = Services.bet.getBetCash(),
                        t = Services.money.format(e, {
                            useCurrencySign: !0,
                        }),
                        n = Array.prototype.slice.call(arguments);
                    n.push(t), this.success.apply(this, n);
                },
            },
            NetEntExtend.API.BaseGetter
        ),
        betInCents: Sys.applyPropertiesIf(
            {
                func: function () {
                    var e = Services.bet.getBetCash(),
                        t = Array.prototype.slice.call(arguments);
                    t.push(e), this.success.apply(this, t);
                },
            },
            NetEntExtend.API.BaseGetter
        ),
        winInCurrency: Sys.applyPropertiesIf(
            {
                func: function () {
                    var e = Services.win.getTotalWinCash(),
                        t = Services.money.format(e, {
                            useCurrencySign: !0,
                        }),
                        n = Array.prototype.slice.call(arguments);
                    n.push(t), this.success.apply(this, n);
                },
            },
            NetEntExtend.API.BaseGetter
        ),
        winInCents: Sys.applyPropertiesIf(
            {
                func: function () {
                    var e = Services.win.getTotalWinCash(),
                        t = Array.prototype.slice.call(arguments);
                    t.push(e), this.success.apply(this, t);
                },
            },
            NetEntExtend.API.BaseGetter
        ),
        audio: Sys.applyPropertiesIf(
            {
                func: function () {
                    var e = Services.gameSettings.getSetting("volume"),
                        t = Services.gameSettings.getSetting("volumeMute"),
                        n = !t && e > 0,
                        s = Array.prototype.slice.call(arguments);
                    s.push(n), this.success.apply(this, s);
                },
            },
            NetEntExtend.API.BaseGetter
        ),
        currentPlayMode: Sys.applyPropertiesIf(
            {
                func: function () {
                    var e = Services.game.getGameModes(),
                        t = Array.prototype.slice.call(arguments);
                    t.push(e.join(",")), this.success.apply(this, t);
                },
            },
            NetEntExtend.API.BaseGetter
        ),
        autoplayNumberOfRoundsAvailable: Sys.applyPropertiesIf(
            {
                func: function () {
                    var e = Services.autoplay.getRoundsAvailable(),
                        t = null === e ? null : e.join(","),
                        n = Array.prototype.slice.call(arguments);
                    n.push(t), this.success.apply(this, n);
                },
            },
            NetEntExtend.API.BaseGetter
        ),
        autoplayCurrentRoundsLeft: Sys.applyPropertiesIf(
            {
                func: function () {
                    var e = Services.autoplay.isActive(),
                        t = e ? Services.autoplay.getRemaining() : null,
                        n = Array.prototype.slice.call(arguments);
                    n.push(t), this.success.apply(this, n);
                },
            },
            NetEntExtend.API.BaseGetter
        ),
        paytableCount: Sys.applyPropertiesIf(
            {
                func: function () {
                    var e = Services.paytable.getNumberOfPages(),
                        t = Array.prototype.slice.call(arguments);
                    t.push(e), this.success.apply(this, t);
                },
            },
            NetEntExtend.API.BaseGetter
        ),
        paytablePage: Sys.applyPropertiesIf(
            {
                func: function () {
                    var e = Services.paytable.getCurrentPage(),
                        t = Array.prototype.slice.call(arguments);
                    t.push(e), this.success.apply(this, t);
                },
            },
            NetEntExtend.API.BaseGetter
        ),
        volumeLevel: Sys.applyPropertiesIf(
            {
                func: function () {
                    var e = Services.gameSettings.getSetting("volume"),
                        t = Services.gameSettings.getSetting("volumeMute"),
                        n = Array.prototype.slice.call(arguments);
                    (e = t || "number" != typeof e ? 0 : Math.round(100 * e)),
                        n.push(e),
                        this.success.apply(this, n);
                },
            },
            NetEntExtend.API.BaseGetter
        ),
        debugMode: Sys.applyPropertiesIf(
            {
                func: function () {
                    var e = Array.prototype.slice.call(arguments);
                    e.push(!1), this.success.apply(this, e);
                },
            },
            NetEntExtend.API.BaseGetter
        ),
    }),
    Sys.ns("NetEntExtend.API"),
    (NetEntExtend.API.Setters = {
        volumeLevel: Sys.applyPropertiesIf(
            {
                platforms: ["desktop"],
                isAvailable: function () {
                    return !0;
                },
                validateArguments: function () {
                    var e = arguments[3];
                    return "number" == typeof e && e >= 0 && e <= 100;
                },
                func: function () {
                    var e = arguments[3] / 100,
                        t = Array.prototype.slice.call(arguments);
                    Services.gameSettings.setSetting({
                        id: "volume",
                        value: e,
                    }),
                        Services.gameSettings.setSetting({
                            id: "volumeMute",
                            value: 0 === e,
                        }),
                        Services.gameSettings.getSetting("volume") === e
                            ? this.success.apply(this, t)
                            : this.error(
                                  t,
                                  this.model.ERROR_CODES.UNKNOWN_ERROR
                              );
                },
            },
            NetEntExtend.API.BaseSetter
        ),
        audio: Sys.applyPropertiesIf(
            {
                isAvailable: function () {
                    return !0;
                },
                validateArguments: function () {
                    return "boolean" == typeof arguments[3];
                },
                func: function () {
                    var e = !1 === arguments[3],
                        t = Array.prototype.slice.call(arguments);
                    Services.gameSettings.setSetting({
                        id: "volumeMute",
                        value: e,
                    }),
                        Services.gameSettings.getSetting("volumeMute") === e
                            ? this.success.apply(this, t)
                            : this.error(
                                  t,
                                  this.model.ERROR_CODES.UNKNOWN_ERROR
                              );
                },
            },
            NetEntExtend.API.BaseSetter
        ),
        inGameMessage: Sys.applyPropertiesIf(
            {
                platforms: ["mobile"],
                isAvailable: function () {
                    return !0;
                },
                validateArguments: function () {
                    var e,
                        t = arguments[3];
                    return (
                        !!(Sys.isArray(t) && t.length > 0) &&
                        ((e = Sys.find(t, function (e) {
                            if (Sys.isObj(e) && Sys.isString(e.text)) {
                                if (Sys.isDefined(e.type)) {
                                    if ("link" !== e.type && "text" !== e.type)
                                        return !0;
                                    if (
                                        "link" === e.type &&
                                        Sys.isDefined(e.url) &&
                                        !Sys.isString(e.url)
                                    )
                                        return !0;
                                }
                                return !1;
                            }
                            return !0;
                        })),
                        !Sys.isDefined(e))
                    );
                },
                func: function () {
                    var e,
                        t = arguments[3],
                        n = 0;
                    (e = t.reduce(function (e, t) {
                        return (
                            n < 60 &&
                                ((n += t.text.length),
                                n > 60 &&
                                    (t.text = t.text.substring(
                                        0,
                                        t.text.length - n + 60
                                    )),
                                t.text.length > 0 && e.push(t)),
                            e
                        );
                    }, [])),
                        Services.ticker.show(e),
                        this.success.apply(this, arguments);
                },
            },
            NetEntExtend.API.BaseSetter
        ),
    }),
    Sys.ns("NetEntExtend.API"),
    (NetEntExtend.API.Calls = {
        stopAutoplay: Sys.applyPropertiesIf(
            {
                platforms: ["desktop", "mobile"],
                isAvailable: function () {
                    var e = Services.dialog.isShowing(),
                        t = Services.autoplay.isActive();
                    return !e && t;
                },
                func: function () {
                    Services.autoplay.stop(),
                        this.success.apply(this, arguments);
                },
            },
            NetEntExtend.API.BaseCall
        ),
        pauseAutoplay: Sys.applyPropertiesIf(
            {
                platforms: ["desktop", "mobile"],
                isAvailable: function () {
                    return Services.autoplay.isActive();
                },
                func: function () {
                    this.fireEvent("request:autoPlayer.pause"),
                        this.success.apply(this, arguments);
                },
            },
            NetEntExtend.API.BaseCall
        ),
        resumeAutoplay: Sys.applyPropertiesIf(
            {
                platforms: ["desktop", "mobile"],
                isAvailable: function () {
                    return Services.autoplay.isActive();
                },
                func: function () {
                    this.fireEvent("request:autoPlayer.resume"),
                        this.success.apply(this, arguments);
                },
            },
            NetEntExtend.API.BaseCall
        ),
        reloadBalance: Sys.applyPropertiesIf(
            {
                func: function () {
                    var e = this,
                        t = Array.prototype.slice.call(arguments);
                    Services.moneyManager
                        .reloadBalance()
                        .then(function (n) {
                            var s = n.credit;
                            Services.gameRound.isRoundActive()
                                ? (t.push("busy"), e.success.apply(e, t))
                                : "number" == typeof s &&
                                  (t.push(s), e.success.apply(e, t));
                        })
                        .fail(function () {
                            e.error(t, e.model.UNKNOWN_ERROR);
                        });
                },
            },
            NetEntExtend.API.BaseCall
        ),
        createDialogbox: Sys.applyPropertiesIf(
            {
                platforms: ["mobile"],
                isAvailable: function () {
                    var e = !1,
                        t = arguments[6],
                        n =
                            Services.pluginMenu.isOpen() ||
                            Services.dialog.isShowing();
                    return (
                        Object.keys(t).forEach(function (n) {
                            "showplugin" ===
                                (void 0 !== t[n].action
                                    ? t[n].action.toLowerCase()
                                    : "") && (e = !0);
                        }),
                        !e || !n
                    );
                },
                validateNumArguments: function () {
                    return 7 === arguments.length;
                },
                validateArguments: function () {
                    var e = arguments[3],
                        t = arguments[4],
                        n = arguments[5],
                        s = arguments[6],
                        i = ["reload", "showplugin", ""];
                    return (
                        Sys.utils.isHomeAvailable() && i.push("gotolobby"),
                        Object.keys(s).every(function (e) {
                            var t =
                                void 0 !== s[e].action
                                    ? s[e].action.toLowerCase()
                                    : "";
                            return -1 !== i.indexOf(t);
                        }) &&
                            Sys.isString(e) &&
                            Sys.isString(t) &&
                            Sys.isString(n) &&
                            Sys.isArray(s) &&
                            s.length > 0 &&
                            s.length <= 2 &&
                            void 0 ===
                                Sys.find(s, function (e) {
                                    return !(
                                        "string" == typeof e.buttonid &&
                                        "string" == typeof e.buttontext
                                    );
                                })
                    );
                },
                func: function () {
                    var e = this,
                        t = arguments[3],
                        n = arguments[4].substring(0, 20),
                        s = arguments[5],
                        i = arguments[6],
                        r = {
                            id: "netEntExtend_" + t,
                            title: n,
                            text: s,
                            buttons: [],
                            stopAutoplay: !0,
                        },
                        o = Array.prototype.slice.call(arguments);
                    Object.keys(i).forEach(function (e) {
                        "showplugin" ===
                            (void 0 !== i[e].action
                                ? i[e].action.toLowerCase()
                                : "") &&
                            Services.customMessage.remove("netEntExtend_" + t);
                    }),
                        Sys.each(i, function (n) {
                            var s = {};
                            (s.action = function () {
                                var t = Sys.isDefined(this.buttontype)
                                    ? this.buttontype.toLowerCase()
                                    : "";
                                switch (
                                    (e.fireEvent(
                                        "notify:dialogBoxClosed",
                                        this.dialogid,
                                        this.buttonid,
                                        {
                                            name: this.dialogid,
                                            button: this.buttonid,
                                        }
                                    ),
                                    t)
                                ) {
                                    case "gotolobby":
                                        e.fireEvent(
                                            "request:disableBasicGamePanel",
                                            "prevent_panel_work_before_go_to_lobby"
                                        ),
                                            Sys.utils.goToLobby(this.reason);
                                        break;
                                    case "reload":
                                        Sys.utils.reload();
                                        break;
                                    case "showplugin":
                                        e.fireEvent("request:pluginMenu.init"),
                                            Services.pluginMenu.open();
                                }
                            }),
                                (s.scope = {
                                    dialogid: t,
                                    buttonid: n.buttonid,
                                    buttontype: n.action,
                                    reason: n.reason,
                                }),
                                (s.text = n.buttontext),
                                (s.buttonid = n.buttonid),
                                r.buttons.push(s);
                        }),
                        Services.customMessage.show(r),
                        e.success.apply(e, o);
                },
            },
            NetEntExtend.API.BaseCall
        ),
        removeDialogbox: Sys.applyPropertiesIf(
            {
                platforms: ["mobile"],
                isAvailable: function () {
                    return !0;
                },
                validateNumArguments: function () {
                    return 4 === arguments.length;
                },
                validateArguments: function () {
                    return "string" == typeof arguments[3];
                },
                func: function () {
                    Services.customMessage.remove(
                        "netEntExtend_" + arguments[3]
                    ),
                        this.success.apply(this, arguments);
                },
            },
            NetEntExtend.API.BaseCall
        ),
        pluginError: Sys.applyPropertiesIf(
            {
                platforms: ["mobile"],
                isAvailable: function () {
                    return !0;
                },
                func: function () {
                    Services.error.handleError(),
                        this.success.apply(this, arguments);
                },
            },
            NetEntExtend.API.BaseCall
        ),
        deactivatePluginMenu: Sys.applyPropertiesIf(
            {
                platforms: ["mobile"],
                isAvailable: function () {
                    return !0;
                },
                func: function () {
                    Services.pluginMenu.close(),
                        this.success.apply(this, arguments);
                },
            },
            NetEntExtend.API.BaseCall
        ),
        activatePluginMenu: Sys.applyPropertiesIf(
            {
                platforms: ["mobile"],
                isAvailable: function () {
                    var e = Services.gameRound.isRoundActive(),
                        t = Services.pluginMenu.isOpen(),
                        n = !0 === Resources.readData("overlayVisible");
                    return !(e || t || n);
                },
                func: function () {
                    Services.pluginMenu.open(),
                        this.success.apply(this, arguments);
                },
            },
            NetEntExtend.API.BaseCall
        ),
        pluginNotification: Sys.applyPropertiesIf(
            {
                platforms: ["mobile"],
                isAvailable: function () {
                    return !0;
                },
                validateNumArguments: function () {
                    return 4 === arguments.length;
                },
                validateArguments: function () {
                    return "string" == typeof arguments[3];
                },
                func: function () {
                    var e = arguments[3];
                    Services.pluginMenu.showNotification(e),
                        this.success.apply(this, arguments);
                },
            },
            NetEntExtend.API.BaseCall
        ),
        pluginChangeMenuHeight: Sys.applyPropertiesIf(
            {
                platforms: ["mobile"],
                isAvailable: function () {
                    return !0;
                },
                validateNumArguments: function () {
                    return 4 === arguments.length;
                },
                validateArguments: function () {
                    return (
                        Sys.isNumber(arguments[3]) || Sys.isObj(arguments[3])
                    );
                },
                func: function () {
                    var e = arguments[3];
                    Services.pluginMenu.changeHeight(e),
                        this.success.apply(this, arguments);
                },
            },
            NetEntExtend.API.BaseCall
        ),
        showSystemClock: Sys.applyPropertiesIf(
            {
                platforms: ["desktop", "mobile"],
                isAvailable: function () {
                    return !0;
                },
                func: function () {
                    var e = Array.prototype.slice.call(arguments);
                    Services.clock.setAvailable(!0),
                        this.success.apply(this, e);
                },
            },
            NetEntExtend.API.BaseCall
        ),
        addButton: Sys.applyPropertiesIf(
            {
                platforms: ["desktop", "mobile"],
                isAvailable: function () {
                    return !0;
                },
                validateNumArguments: function () {
                    return 4 === arguments.length;
                },
                validateArguments: function () {
                    return Sys.isObj(arguments[3]);
                },
                func: function () {
                    var e,
                        t,
                        n,
                        s,
                        i,
                        r = this,
                        o = Array.prototype.slice.call(arguments),
                        a = o[3];
                    a.image
                        ? ((e = document.createElement("img")),
                          (e.src = a.image),
                          (e.alt = a.text))
                        : ((e = document.createElement("input")),
                          (e.type = "button"),
                          (e.value = a.text)),
                        (e.name = a.name),
                        (e.id = a.id),
                        (e.className = "injected-btn"),
                        (n = document.createElement("style")),
                        (n.type = "text/css"),
                        (i = function (e) {
                            return (
                                ".mobile_landscape #" +
                                e.id +
                                " { z-index: 1000;position: fixed;background: " +
                                e.landscape.color +
                                ";top:" +
                                e.landscape.top +
                                ";left:" +
                                e.landscape.left +
                                ";width:" +
                                e.landscape.width +
                                ";height:" +
                                e.landscape.height +
                                ";" +
                                e.landscape.style +
                                ";}.mobile_portrait #" +
                                e.id +
                                " { z-index: 1000;position: fixed;background: " +
                                e.portrait.color +
                                ";top:" +
                                e.portrait.top +
                                ";left:" +
                                e.portrait.left +
                                ";width:" +
                                e.portrait.width +
                                ";height:" +
                                e.portrait.height +
                                ";" +
                                e.portrait.style +
                                ";}.tablet_landscape #" +
                                e.id +
                                " { z-index: 1000;position: fixed;background: " +
                                e.tablet.color +
                                ";top:" +
                                e.tablet.top +
                                ";left:" +
                                e.tablet.left +
                                ";width:" +
                                e.tablet.width +
                                ";height:" +
                                e.tablet.height +
                                ";" +
                                e.tablet.style +
                                ";}"
                            );
                        }),
                        (s = i(a)),
                        n.styleSheet
                            ? (n.styleSheet.cssText = s)
                            : n.appendChild(document.createTextNode(s)),
                        document.getElementsByTagName("head")[0].appendChild(n),
                        (t = function (e) {
                            e.target &&
                                "injected-btn" === e.target.className &&
                                (e.preventDefault(),
                                r.fireEvent("request:postman.sendMessage", [
                                    "event",
                                    e.target.id + "_click",
                                    e.target.id,
                                ]));
                        }),
                        e.addEventListener("click", t),
                        r.fireEvent(
                            "request:userInputManager.allowPropagation"
                        ),
                        document.body.appendChild(e),
                        r.success.apply(this, o);
                },
            },
            NetEntExtend.API.BaseCall
        ),
    }),
    Sys.ns("NetEntExtend.API"),
    Sys.apply(NetEntExtend.API.Getters, {
        balanceInCoins: Sys.applyPropertiesIf(
            {
                func: function () {
                    var e = Services.money.getBalanceCoins(),
                        t = Array.prototype.slice.call(arguments);
                    t.push(e), this.success.apply(this, t);
                },
            },
            NetEntExtend.API.BaseGetter
        ),
        betInCoins: Sys.applyPropertiesIf(
            {
                func: function () {
                    var e = Services.bet.getBetCoins(),
                        t = Array.prototype.slice.call(arguments);
                    t.push(e), this.success.apply(this, t);
                },
            },
            NetEntExtend.API.BaseGetter
        ),
        availableCoins: Sys.applyPropertiesIf(
            {
                func: function () {
                    var e = Services.bet.getDenominations().join(","),
                        t = Array.prototype.slice.call(arguments);
                    t.push(e), this.success.apply(this, t);
                },
            },
            NetEntExtend.API.BaseGetter
        ),
        selectedCoinValue: Sys.applyPropertiesIf(
            {
                func: function () {
                    var e = Services.bet.getDenomination(),
                        t = Array.prototype.slice.call(arguments);
                    t.push(e), this.success.apply(this, t);
                },
            },
            NetEntExtend.API.BaseGetter
        ),
        winInCoins: Sys.applyPropertiesIf(
            {
                func: function () {
                    var e = Services.win.getWinCoins(),
                        t = Array.prototype.slice.call(arguments);
                    t.push(e), this.success.apply(this, t);
                },
            },
            NetEntExtend.API.BaseGetter
        ),
        freeRoundsLeft: Sys.applyPropertiesIf(
            {
                func: function () {
                    var e = null,
                        t = Array.prototype.slice.call(arguments);
                    Services.freeRounds.isActive() &&
                        (e = Services.freeRounds.getRemaining()),
                        t.push(e),
                        this.success.apply(this, t);
                },
            },
            NetEntExtend.API.BaseGetter
        ),
        freeSpinsLeft: Sys.applyPropertiesIf(
            {
                func: function () {
                    var e = this,
                        t = Services.freeSpins.getFreeSpinsLeft(),
                        n =
                            Sys.isDefined(t) &&
                            t >= 0 &&
                            Sys.contains(
                                ["FREESPIN", "SUPERSPIN"],
                                e.model.readData("gameMode")
                            )
                                ? t
                                : null;
                    e.success.apply(e, e.addParamsToArgument(arguments, n));
                },
            },
            NetEntExtend.API.BaseGetter
        ),
    }),
    Sys.ns("NetEntExtend.API"),
    Sys.apply(NetEntExtend.API.Setters, {}),
    Sys.ns("NetEntExtend.API"),
    Sys.apply(NetEntExtend.API.Calls, {}),
    Sys.ns("NetEntExtend.API.Restricted"),
    (NetEntExtend.API.Restricted.Getters = Sys.apply(
        Sys.clone(NetEntExtend.API.Getters),
        {}
    )),
    Sys.ns("NetEntExtend.API.Restricted"),
    (NetEntExtend.API.Restricted.Setters = Sys.apply(
        Sys.clone(NetEntExtend.API.Setters),
        {}
    )),
    Sys.ns("NetEntExtend.API.Restricted"),
    (NetEntExtend.API.Restricted.Calls = Sys.apply(
        Sys.clone(NetEntExtend.API.Calls),
        {
            startAutoplay: Sys.applyPropertiesIf(
                {
                    platforms: ["desktop"],
                    validateNumArguments: function () {
                        return 4 === arguments.length;
                    },
                    validateArguments: function () {
                        var e = Services.autoplay.getRoundsAvailable(),
                            t = parseInt(arguments[3], 10);
                        return (
                            Services.autoplay.isAvailable() &&
                            !isNaN(t) &&
                            e.indexOf(t) > -1
                        );
                    },
                    func: function () {
                        var e = parseInt(arguments[3], 10);
                        Services.autoplay.setRounds(e),
                            Services.autoplay.start(),
                            this.success.apply(this, arguments);
                    },
                },
                NetEntExtend.API.BaseCall
            ),
            showAutoplay: Sys.applyPropertiesIf(
                {
                    platforms: ["desktop"],
                    isAvailable: function () {
                        var e = Services.autoplay.isShowingSettings(),
                            t = Services.dialog.isShowing(),
                            n = Services.storage.readData("IntroMovie.showing"),
                            s = this.model.readData("featureSplash.showing");
                        return !(e || t || n || s);
                    },
                    func: function () {
                        Services.autoplay.setSettingsState("opened"),
                            this.success.apply(this, arguments);
                    },
                },
                NetEntExtend.API.BaseCall
            ),
            hideAutoplay: Sys.applyPropertiesIf(
                {
                    platforms: ["desktop"],
                    isAvailable: function () {
                        return (
                            !Services.dialog.isShowing() &&
                            Services.autoplay.isShowingSettings()
                        );
                    },
                    func: function () {
                        Services.autoplay.setSettingsState("closed"),
                            this.success.apply(this, arguments);
                    },
                },
                NetEntExtend.API.BaseCall
            ),
            showPaytable: Sys.applyPropertiesIf(
                {
                    platforms: ["desktop"],
                    isAvailable: function () {
                        return !Services.dialog.isShowing();
                    },
                    validateNumArguments: function () {
                        return 4 === arguments.length;
                    },
                    validateArguments: function () {
                        var e = arguments[3],
                            t = Services.paytable.getNumberOfPages();
                        return "number" == typeof e && e >= 1 && e <= t;
                    },
                    func: function () {
                        var e = arguments[3];
                        Services.paytable.open(e),
                            this.success.apply(this, arguments);
                    },
                },
                NetEntExtend.API.BaseCall
            ),
            hidePaytable: Sys.applyPropertiesIf(
                {
                    platforms: ["desktop"],
                    isAvailable: function () {
                        return (
                            !Services.dialog.isShowing() &&
                            Services.paytable.isOpen()
                        );
                    },
                    func: function () {
                        Services.paytable.close(),
                            this.success.apply(this, arguments);
                    },
                },
                NetEntExtend.API.BaseCall
            ),
            paytableForward: Sys.applyPropertiesIf(
                {
                    platforms: ["desktop"],
                    isAvailable: function () {
                        return (
                            !Services.dialog.isShowing() &&
                            Services.paytable.isOpen()
                        );
                    },
                    func: function () {
                        Services.paytable.nextPage(),
                            this.success.apply(this, arguments);
                    },
                },
                NetEntExtend.API.BaseCall
            ),
            paytableBackward: Sys.applyPropertiesIf(
                {
                    platforms: ["desktop"],
                    isAvailable: function () {
                        return (
                            !Services.dialog.isShowing() &&
                            Services.paytable.isOpen()
                        );
                    },
                    func: function () {
                        Services.paytable.previousPage(),
                            this.success.apply(this, arguments);
                    },
                },
                NetEntExtend.API.BaseCall
            ),
            closeSplash: Sys.applyPropertiesIf(
                {
                    platforms: ["desktop"],
                    isAvailable: function () {
                        var e = this;
                        return (
                            !Services.dialog.isShowing() &&
                            e.model.readData("featureSplash.showing")
                        );
                    },
                    func: function () {
                        var e = this;
                        e.fireEvent("request:featureSplash.close"),
                            e.success.apply(e, arguments);
                    },
                },
                NetEntExtend.API.BaseCall
            ),
            startFreespins: Sys.applyPropertiesIf(
                {
                    platforms: ["desktop"],
                    isAvailable: function () {
                        return (
                            !Services.dialog.isShowing() &&
                            Services.storage.readData("freeSpins.canStart")
                        );
                    },
                    func: function () {
                        var e = this;
                        e.fireEvent("request:freeSpins.start"),
                            e.success.apply(e, arguments);
                    },
                },
                NetEntExtend.API.BaseCall
            ),
            openHelp: Sys.applyPropertiesIf(
                {
                    platforms: ["desktop"],
                    isAvailable: function () {
                        return !(
                            Services.dialog.isShowing() ||
                            Services.gameRound.isRoundActive() ||
                            Services.gameRules.isOpen()
                        );
                    },
                    func: function () {
                        Services.gameRules.setState("opened"),
                            this.success.apply(this, arguments);
                    },
                },
                NetEntExtend.API.BaseCall
            ),
            skipIntro: Sys.applyPropertiesIf(
                {
                    platforms: ["desktop"],
                    isAvailable: function () {
                        return (
                            !Services.dialog.isShowing() &&
                            Services.storage.readData("IntroMovie.showing")
                        );
                    },
                    func: function () {
                        var e = this;
                        e.fireEvent("request:introMovie.close"),
                            e.success.apply(e, arguments);
                    },
                },
                NetEntExtend.API.BaseCall
            ),
        }
    )),
    Sys.ns("NetEntExtend.API"),
    Sys.apply(NetEntExtend.API.Restricted.Setters, {
        betLevel: Sys.applyPropertiesIf(
            {
                platforms: ["desktop"],
                isAvailable: function () {
                    return !(
                        Services.gameRound.isRoundActive() ||
                        Services.freeRounds.isActive()
                    );
                },
                validateArguments: function () {
                    var e = parseInt(arguments[3], 10),
                        t = Services.bet.getBetLevels();
                    return !(isNaN(e) || -1 === t.indexOf(e));
                },
                func: function () {
                    var e = parseInt(arguments[3], 10);
                    Services.bet.setBetLevel(e),
                        this.success.apply(this, arguments);
                },
            },
            NetEntExtend.API.BaseSetter
        ),
        coinValue: Sys.applyPropertiesIf(
            {
                platforms: ["desktop"],
                isAvailable: function () {
                    return !(
                        Services.gameRound.isRoundActive() ||
                        Services.freeRounds.isActive()
                    );
                },
                validateArguments: function () {
                    var e = parseInt(arguments[3], 10),
                        t = Services.bet.getDenominations();
                    return !(isNaN(e) || -1 === t.indexOf(e));
                },
                func: function () {
                    var e = parseInt(arguments[3], 10);
                    Services.bet.setDenomination(e),
                        this.success.apply(this, arguments);
                },
            },
            NetEntExtend.API.BaseSetter
        ),
    }),
    Sys.ns("NetEntExtend.API"),
    Sys.apply(NetEntExtend.API.Restricted.Calls, {
        startSpin: Sys.applyPropertiesIf(
            {
                platforms: ["desktop"],
                isAvailable: function () {
                    return (
                        !(
                            Services.gameRound.isRoundActive() ||
                            Services.dialog.isShowing()
                        ) &&
                        (Services.bet.getBetCash() <=
                            Services.money.getBalanceCash() ||
                            Services.freeRounds.isActive())
                    );
                },
                func: function () {
                    Services.gameRound.start(),
                        this.success.apply(this, arguments);
                },
            },
            NetEntExtend.API.BaseCall
        ),
        startQuickSpin: Sys.applyPropertiesIf(
            {
                platforms: ["desktop"],
                isAvailable: function () {
                    return (
                        !(
                            Services.gameRound.isRoundActive() ||
                            Services.dialog.isShowing()
                        ) &&
                        Services.gameSettings.isSettingEnabled("quickSpin") &&
                        (Services.bet.getBetCash() <=
                            Services.money.getBalanceCash() ||
                            Services.freeRounds.isActive())
                    );
                },
                func: function () {
                    var e = Services.gameSettings.getSetting("quickSpin");
                    Services.gameSettings.setSetting({
                        id: "quickSpin",
                        value: !0,
                    }),
                        Services.gameRound.on(
                            "ended",
                            function () {
                                Services.gameSettings.setSetting({
                                    id: "quickSpin",
                                    value: e,
                                });
                            },
                            !0
                        ),
                        Services.gameRound.start(),
                        this.success.apply(this, arguments);
                },
            },
            NetEntExtend.API.BaseCall
        ),
        maxBetSpin: Sys.applyPropertiesIf(
            {
                platforms: ["desktop"],
                func: function () {
                    var e = Services.bet.getBetLevel(),
                        t = Math.max.apply(null, Services.bet.getBetLevels());
                    Services.bet.setBetLevel(t),
                        Services.gameRound.on(
                            "ended",
                            function () {
                                Services.bet.setBetLevel(e);
                            },
                            !0
                        ),
                        Services.gameRound.start(),
                        this.success.apply(this, arguments);
                },
            },
            NetEntExtend.API.BaseCall
        ),
        featurePreview: Sys.applyPropertiesIf(
            {
                platforms: ["desktop"],
                func: function () {
                    this.success.apply(this, arguments);
                },
            },
            NetEntExtend.API.BaseCall
        ),
    }),
    Sys.ns("Core.NetEntExtend"),
    (Core.NetEntExtend = {
        constructor: function () {
            Core.NetEntExtend.superclass.constructor.apply(this, arguments);
        },
        getDefaultMVCClasses: function () {
            return {
                model: Core.NetEntExtendModel,
                controller: Core.NetEntExtendController,
            };
        },
    }),
    (Core.NetEntExtend = Sys.extend(
        Core.Module,
        Core.NetEntExtend,
        "Core.NetEntExtend"
    )),
    Sys.ns("Core"),
    (Core.NetEntExtendController = {
        USE_LOGGING: !1,
        constructor: function () {
            Core.NetEntExtendController.superclass.constructor.apply(
                this,
                arguments
            );
        },
        init: function () {
            var e = this;
            Core.NetEntExtendController.superclass.init.apply(e, arguments),
                (e.onEnteringIdleState = []),
                e.setupAPI();
        },
        setupEvents: function () {
            var e = this;
            e.on({
                "notify:stateHandler.enteringIdleState": e.enteringIdleState,
                "notify:stateHandler.leavingIdleState": e.leavingIdleState,
                "notify:netEntExtendEvents.eventTriggered": e.sendMessage,
                "notify:responseParser.reloadBalanceResponseParsed":
                    e.onReloadBalanceResponse,
                "notify:serverManager.reloadBalanceFailed":
                    e.onReloadBalanceFailed,
                "notify:featureSplash.showing": e.onFeatureSplashShowing,
                "notify:featureSplash.closed": e.onFeatureSplashClosed,
                "notify:gameModeChanged": e.onGameModeChanged,
                "request:NetEntExtend.newMessage": e.handleIncomingMessage,
            });
        },
        setupAPI: function () {
            var e = this,
                t = e.model.readData("useRestricted"),
                n = !0 === t ? NetEntExtend.API.Restricted : NetEntExtend.API;
            e.API = {
                get: n.Getters,
                set: n.Setters,
                call: n.Calls,
            };
        },
        enteringIdleState: function () {
            var e = this;
            e.onEnteringIdleState.forEach(function (t) {
                t.apply(e, arguments);
            }),
                (e.onEnteringIdleState = []),
                e.model.storeData("inIdleState", !0);
        },
        leavingIdleState: function () {
            var e = this;
            e.model.storeData("inIdleState", !1),
                e.model.storeData("reloadBalanceSpin", !0);
        },
        handleIncomingMessage: function () {
            var e,
                t = this,
                n = arguments[0],
                s = arguments[1],
                i = arguments[2];
            if (
                arguments.length < 3 ||
                "string" != typeof n ||
                !Sys.isNumber(s) ||
                "string" != typeof i
            )
                t.error(
                    arguments,
                    t.model.ERROR_CODES.WRONG_NUMBER_OF_ARGUMENTS
                );
            else if (Sys.isDefined(t.API[n]) && Sys.isDefined(t.API[n][i]))
                if (
                    ((e = t.API[n][i]),
                    (Platform.isDesktopDevice &&
                        -1 === e.platforms.indexOf("desktop")) ||
                        ((Platform.isMobileDevice || Platform.isTabletDevice) &&
                            -1 === e.platforms.indexOf("mobile")))
                )
                    t.error(
                        arguments,
                        t.model.ERROR_CODES.FUNCTIONALITY_NOT_AVAILABLE
                    );
                else if (e.isAvailable.apply(t, arguments))
                    if (e.validateNumArguments.apply(t, arguments))
                        if (e.validateArguments.apply(t, arguments))
                            try {
                                e.func.apply(t, arguments);
                            } catch (e) {
                                t.error(
                                    arguments,
                                    t.model.ERROR_CODES.UNKNOWN_ERROR
                                );
                            }
                        else
                            t.error(
                                arguments,
                                t.model.ERROR_CODES.ILLEGAL_ARGUMENT
                            );
                    else
                        t.error(
                            arguments,
                            t.model.ERROR_CODES.WRONG_NUMBER_OF_ARGUMENTS
                        );
                else
                    t.error(
                        arguments,
                        t.model.ERROR_CODES.NOT_AVAILABLE_IN_CURRENT_STATE
                    );
            else
                t.error(
                    arguments,
                    t.model.ERROR_CODES.FUNCTIONALITY_NOT_AVAILABLE
                );
        },
        success: function () {
            var e = this,
                t = e.getResponseArguments.apply(e, arguments);
            e.sendMessage(["success", t.callId].concat(t.rest));
        },
        error: function (e, t, n) {
            var s = this,
                i = s.getResponseArguments.apply(s, e);
            s.sendMessage(["error", i.callId, t, n]);
        },
        sendMessage: function (e) {
            this.fireEvent("request:postman.sendMessage", e);
        },
        getResponseArguments: function () {
            var e = Array.prototype.slice.call(arguments);
            return {
                callId: e[1],
                rest: e.splice(3),
            };
        },
        addParamsToArgument: function (e, t) {
            var n = Array.prototype.slice.call(e);
            return (
                Sys.isArray(t)
                    ? t.forEach(function (e) {
                          n.push(e);
                      })
                    : n.push(t),
                n
            );
        },
        onReloadBalanceResponse: function (e) {
            var t = this,
                n = t.model.readData("reloadBalanceArguments"),
                s = t.model.readData("reloadBalanceSpin"),
                i = e.credit;
            s
                ? t.success.apply(t, t.addParamsToArgument(n, "busy"))
                : Sys.isNumber(i) &&
                  (Services.moneyManager.setBalance(i),
                  t.success.apply(t, t.addParamsToArgument(n, i)));
        },
        onReloadBalanceFailed: function () {
            var e = this,
                t = e.model.readData("reloadBalanceArguments");
            e.error(t, e.model.UNKNOWN_ERROR);
        },
        onFeatureSplashShowing: function () {
            this.model.storeData("featureSplash.showing", !0);
        },
        onFeatureSplashClosed: function () {
            this.model.storeData("featureSplash.showing", !1);
        },
        startRound: function () {
            Services.gameRound.start();
        },
        onGameModeChanged: function (e) {
            this.model.storeData("gameMode", e);
        },
    }),
    (Core.NetEntExtendController = Sys.extend(
        Core.Controller,
        Core.NetEntExtendController,
        "Core.NetEntExtendController"
    )),
    Sys.ns("Core"),
    (Core.NetEntExtendModel = {
        ERROR_CODES: {
            UNKNOWN_ERROR: 0,
            ILLEGAL_ARGUMENT: 1,
            EVENTS_NOT_AVAILABLE_IN_GAME: 7,
            CALLBACK_NOT_PROVIDED: 8,
            FUNCTIONALITY_NOT_AVAILABLE: 9,
            WRONG_NUMBER_OF_ARGUMENTS: 10,
            NO_RESPONSE_FROM_GAME: 11,
            NOT_AVAILABLE_IN_CURRENT_STATE: 12,
            HTML_GAME_LAUNCH_FAILED: 18,
        },
        constructor: function () {
            Core.NetEntExtendModel.superclass.constructor.apply(
                this,
                arguments
            );
        },
        setupData: function () {
            var e = this,
                t = Resources.readData("gameServerInitResponse"),
                n = !!Sys.isDefined(t) && t["gameEventSetters.enabled"],
                s = !1;
            Sys.isDefined(n) && !0 === n && (s = !0),
                e.storeData("useRestricted", s),
                e.storeData("locked", !0),
                e.storeData("inIdleState", !1),
                e.storeData("featureSplash.showing", !1);
        },
    }),
    (Core.NetEntExtendModel = Sys.extend(
        Core.Model,
        Core.NetEntExtendModel,
        "Core.NetEntExtendModel"
    )),
    Sys.ns("Core"),
    (Core.Postman = {
        constructor: function () {
            Core.Postman.superclass.constructor.apply(this, arguments);
        },
        getStateChanges: function () {
            return {
                setupGame: {
                    waitEvents: ["notify:postman.ready"],
                },
            };
        },
        getDefaultMVCClasses: function () {
            return {
                controller: Core.PostmanController,
            };
        },
    }),
    (Core.Postman = Sys.extend(Core.Module, Core.Postman, "Core.Postman")),
    Sys.ns("Core"),
    (Core.PostmanController = {
        IS_READY: !1,
        PLUGIN_TIMEOUT: 3e4,
        constructor: function () {
            Core.PostmanController.superclass.constructor.apply(
                this,
                arguments
            );
        },
        setupEvents: function () {
            var e = this;
            (this.pluginURL = Resources.readData("pluginURL")),
                (this.enableSwedenPlugin =
                    !!Resources.readData("queryData") &&
                    Resources.readData("queryData").enableDefaultSwedenButtons),
                (this.swedenButtonPluginHost = Resources.readData("queryData")
                    ? Resources.readData("queryData").swedenButtonPluginHost
                    : void 0),
                (this.hiddenIframeForSweden = null),
                (this.iframe = null),
                this.on({
                    "request:postman.sendMessage": this.sendMessage,
                    "notify:stateHandler.enteringSetupGameState":
                        this.setupPlugin,
                }),
                window.addEventListener("message", function (t) {
                    e.onMessage(t);
                });
        },
        onMessage: function (e) {
            e.data.moduleId
                ? this.fireEvent(
                      "notify:" + e.data.moduleId + ".notification",
                      e.data
                  )
                : this.handleIncomingMessage(e.data);
        },
        setupPlugin: function () {
            var e,
                t = this;
            this.pluginURL
                ? (this.enableSwedenPlugin &&
                      this.loadPluginForSwedenIntegration(),
                  (this.iframe = document.createElement("iframe")),
                  this.iframe.setAttribute("id", "netEntExtendPlugin"),
                  this.iframe.setAttribute(
                      "sandbox",
                      "allow-scripts allow-popups allow-popups-to-escape-sandbox allow-top-navigation allow-top-navigation-by-user-activation allow-same-origin allow-forms allow-pointer-lock"
                  ),
                  this.iframe.setAttribute("frameborder", 0),
                  this.iframe.setAttribute("width", "100%"),
                  this.iframe.setAttribute("height", 0),
                  (this.iframe.src = this.pluginURL),
                  (e = document.getElementById("viewport")),
                  e.insertBefore(this.iframe, e.firstChild),
                  (this.timeout = setTimeout(function () {
                      t.fireEvent(
                          "request:loaderErrorHandler.handlePluginTimeoutError"
                      );
                  }, this.PLUGIN_TIMEOUT)))
                : (this.fireEvent("notify:postman.ready"),
                  (this.IS_READY = !0));
        },
        handlePluginReadyCall: function (e) {
            var t = e[3],
                n = e[4],
                s = e[5];
            "call" === e[0] &&
                "pluginReady" === e[2] &&
                (clearTimeout(this.timeout),
                (this.IS_READY = !0),
                this.fireEvent("notify:postman.ready"),
                Sys.isDefined(t) &&
                    Sys.isDefined(n) &&
                    this.fireEvent("request:pluginMenu.init", t, n, s),
                this.sendMessage(["success", e[1]]));
        },
        handleIncomingMessage: function (e) {
            this.pluginURL && !this.IS_READY
                ? this.handlePluginReadyCall(e)
                : this.fireEvent.apply(
                      this,
                      ["request:NetEntExtend.newMessage"].concat(e)
                  );
        },
        sendMessage: function (e) {
            Utils.Platform.inIframe() && window.parent.postMessage(e, "*"),
                this.iframe &&
                    this.pluginURL &&
                    (this.iframe.contentWindow.postMessage(e, "*"),
                    this.hiddenIframeForSweden &&
                        this.hiddenIframeForSweden.contentWindow.postMessage(
                            e,
                            "*"
                        ));
        },
        loadPluginForSwedenIntegration: function () {
            var e = document.createElement("link"),
                t = Resources.readData("queryData").gameId;
            (this.hiddenIframeForSweden = document.createElement("iframe")),
                this.hiddenIframeForSweden.setAttribute("frameborder", 0),
                this.hiddenIframeForSweden.setAttribute(
                    "style",
                    "width: 100%;height: 0px;z-index: -1;position: absolute;"
                ),
                // (this.hiddenIframeForSweden.src =
                //     (this.swedenButtonPluginHost
                //         ? this.swedenButtonPluginHost
                //         : "https://static-shared.casinomodule.com") +
                //     "/sweden-plugin/sweden_buttons.html?gameid=" +
                //     t),
                // (this.cssPath =
                //     (this.swedenButtonPluginHost
                //         ? this.swedenButtonPluginHost
                //         : "https://static-shared.casinomodule.com") +
                //     "/sweden-plugin/origin.css"),
                // document.body.insertBefore(
                //     this.hiddenIframeForSweden,
                //     document.body.firstChild
                // ),
                (e.href = this.cssPath),
                (e.type = "text/css"),
                (e.rel = "stylesheet"),
                document.body.classList.add("sweden-regulation"),
                document.body.classList.add(t),
                document.getElementsByTagName("head")[0].appendChild(e);
        },
    }),
    (Core.PostmanController = Sys.extend(
        Core.Controller,
        Core.PostmanController,
        "Core.PostmanController"
    )),
    Sys.ns("Core"),
    (Core.CustomMessages = {
        constructor: function () {
            Core.CustomMessages.superclass.constructor.apply(this, arguments);
        },
        getStateChanges: function () {
            var e = this.model;
            return {
                showingCustomMessages: {
                    state: {
                        name: "ShowingCustomMessages",
                        execute: function () {},
                        waitEvents: {
                            "notify:customMessages.messagesClosed": !1,
                        },
                    },
                },
                delayBeforeShowingMessages: {
                    state: {
                        name: "DelayBeforeShowingMessages",
                        execute: function () {},
                        waitEvents: {
                            "notify:customMessages.delayComplete": !1,
                        },
                    },
                },
                idle: {
                    waitEvents: ["notify:customMessages.messagesClosed"],
                },
                beforeStopping: {
                    queue: [
                        function (t) {
                            (!e.hasImmediate() &&
                                e.readData("shouldShowDialogs")) ||
                                t.stateHandler.pushState(
                                    t.states.showingCustomMessages
                                );
                        },
                    ],
                },
                setupGame: {
                    waitEvents: ["notify:customMessages.ready"],
                },
                noWinPresentation: {
                    queue: [
                        function (t) {
                            (!e.hasDialogs() &&
                                e.readData("shouldShowDialogs")) ||
                                t.stateHandler.pushState(
                                    t.states.delayBeforeShowingMessages
                                );
                        },
                    ],
                },
            };
        },
        getMixinDependencies: function () {
            return ["userInput"];
        },
        getDefaultMVCClasses: function () {
            return {
                controller: Core.CustomMessagesController,
                model: Core.CustomMessagesModel,
            };
        },
    }),
    (Core.CustomMessages = Sys.extend(
        Core.Module,
        Core.CustomMessages,
        "Core.CustomMessages"
    )),
    Sys.ns("Core"),
    (Core.CustomMessagesController = {
        DIALOG_DELAY: 3e3,
        ERRORS: {
            DISPLAY_IMMEDIATELY_CLOSE: 990,
            DISPLAY_IMMEDIATELY_CONTINUE: 991,
            DISPLAY_ON_IDLE_CLOSE: 992,
            DISPLAY_ON_IDLE_CONTINUE: 993,
        },
        constructor: function () {
            Core.CustomMessagesController.superclass.constructor.apply(
                this,
                arguments
            );
        },
        setupEvents: function () {
            this.on({
                "request:customMessages.showDialog": this.onShowDialogRequest,
                "request:customMessages.removeDialog":
                    this.onRemoveDialogRequest,
                "notify:serverManager.serverResponseReceived":
                    this.onServerResponseReceived,
                "notify:serverManager.serverErrorReceived":
                    this.onServerErrorReceived,
                "notify:stateHandler.enteringSetupGameState":
                    this.onEnteringSetupGameState,
                "notify:stateHandler.enteringIdleState":
                    this.onEnteringIdleState,
                "notify:stateHandler.leavingIdleState": this.onLeavingIdleState,
                "notify:stateHandler.enteringShowingCustomMessagesState":
                    this.onEnteringShowingCustomMessagesState,
                "notify:stateHandler.leavingBeforeLoaderCloseState":
                    this.onLoaderClose,
                "notify:stateHandler.enteringDelayBeforeShowingMessagesState":
                    this.onEnteringDelayBeforeShowingMessagesState,
                "notify:stateHandler.leavingDelayBeforeShowingMessagesState":
                    this.onLeavingDelayBeforeShowingMessagesState,
                "notify:dialogWindow.dialogShown": this.onDialogShown,
            });
        },
        onLoaderClose: function () {
            this.model.storeData("showingLoader", !1),
                this.model.storeData("shouldShowDialogs", !0);
        },
        onShowDialogRequest: function (e) {
            var t;
            try {
                t = this.prepareDialogConfig(e);
            } catch (e) {
                return (
                    this.showTechnicalError(),
                    void this.model.storeData("shouldShowDialogs", !1)
                );
            }
            delete t.immediate,
                this.model.readData("isIdle")
                    ? (this.model.hasDialogsToWaitFor() &&
                          this.model.addDialogToWaitFor(t.id),
                      Services.dialog.show(t))
                    : this.model.addDialog(t);
        },
        onRemoveDialogRequest: function (e) {
            this.model.removeDialogToWaitFor(e),
                this.model.removeDialog(e),
                Services.dialog.remove(e);
        },
        onServerResponseReceived: function (e) {
            var t = Sys.utils.queryStringToObject(e.responseText, !0),
                n = Object.keys(t).length;
            Sys.isDefined(t.messages) &&
                this.handleMessagesFromServerRequest(t.messages, 1 === n);
        },
        onServerErrorReceived: function (e) {
            var t = Sys.utils.queryStringToObject(e.responseText, !0);
            Sys.isDefined(t.messages) &&
                this.handleMessagesFromServerRequest(t.messages, !0);
        },
        handleMessagesFromServerRequest: function (e, t) {
            var n, s, i, r;
            try {
                (n = JSON.parse(e)),
                    Sys.isArray(n) &&
                        ((s = n.pop()),
                        Sys.isDefined(s) &&
                            ((i = this.createConfigFromMessage(s)),
                            (r = this.prepareDialogConfig(i)),
                            this.model.addDialog(r)),
                        t && this.showImmediateMessages());
            } catch (e) {
                this.showTechnicalError(),
                    this.model.storeData("shouldShowDialogs", !1);
            }
        },
        onEnteringSetupGameState: function () {
            this.model.readData("showingError") ||
                this.fireEvent("notify:customMessages.ready");
        },
        onEnteringIdleState: function () {
            this.model.storeData("isIdle", !0),
                this.model.readData("shouldShowDialogs") &&
                    this.showDialogs(this.model.popAll());
        },
        onLeavingIdleState: function () {
            this.model.storeData("isIdle", !1);
        },
        onEnteringShowingCustomMessagesState: function () {
            this.showImmediateMessages();
        },
        onEnteringDelayBeforeShowingMessagesState: function () {
            var e = this;
            clearTimeout(this.delayTimeout),
                this.startListeningToUserInput(),
                (this.delayTimeout = setTimeout(function () {
                    e.fireEvent("notify:customMessages.delayComplete");
                }, this.DIALOG_DELAY));
        },
        onLeavingDelayBeforeShowingMessagesState: function () {
            this.stopListeningToUserInput();
        },
        onUserInputEnd: function (e) {
            Sys.UserInputUtils.isCoordinateTarget(
                Game.stage.getGameContainer(),
                e
            ) &&
                (clearTimeout(this.delayTimeout),
                this.fireEvent("notify:customMessages.delayComplete"));
        },
        showImmediateMessages: function () {
            this.model.readData("shouldShowDialogs") &&
                this.showDialogs(this.model.popAllImmediate());
        },
        onDialogShown: function (e) {
            Sys.isDefined(e) &&
                (this.model.removeDialogToWaitFor(e),
                this.model.hasDialogsToWaitFor() ||
                    this.fireEvent("notify:customMessages.messagesClosed"));
        },
        showDialogs: function (e) {
            var t = this;
            e.length > 0
                ? e.forEach(function (e) {
                      t.model.addDialogToWaitFor(e.id),
                          Services.settingsManager.getSetting(
                              "autoPlayNrSpins"
                          ) > 0 &&
                              (t.isErrorMessage(e.messageCode) ||
                                  e.stopAutoplay) &&
                              t.fireEvent("request:autoPlayer.stop"),
                          Services.dialog.show(e),
                          (e.messageCode !==
                              t.ERRORS.DISPLAY_IMMEDIATELY_CLOSE &&
                              e.messageCode !==
                                  t.ERRORS.DISPLAY_ON_IDLE_CLOSE) ||
                              t.fireEvent(
                                  "notify:customMessages.fatalMessageShowing",
                                  e.messageCode,
                                  e.text
                              );
                  })
                : this.fireEvent("notify:customMessages.messagesClosed");
        },
        isErrorMessage: function (e) {
            var t,
                n = this;
            for (t in n.ERRORS)
                if (n.ERRORS.hasOwnProperty(t) && e === n.ERRORS[t]) return !0;
            return !1;
        },
        createConfigFromMessage: function (e) {
            var t,
                n = {
                    title: Services.languageManager.getText(
                        Language.Keys.messageCaption
                    ),
                    text: e.message,
                    buttons: [],
                    immediate: !0,
                    id: e.code,
                    messageCode: e.code,
                };
            switch (e.code) {
                case this.ERRORS.DISPLAY_IMMEDIATELY_CLOSE:
                    (t = this.model.getCloseButtonConfig(this)),
                        (n.hideGame = !0);
                    break;
                case this.ERRORS.DISPLAY_IMMEDIATELY_CONTINUE:
                    t = this.model.getContinueButtonConfig(this, !0);
                    break;
                case this.ERRORS.DISPLAY_ON_IDLE_CLOSE:
                    (t = this.model.getCloseButtonConfig(this)),
                        (n.hideGame = !0),
                        (n.immediate = !1);
                    break;
                case this.ERRORS.DISPLAY_ON_IDLE_CONTINUE:
                    (t = this.model.getContinueButtonConfig(this)),
                        (n.immediate = !1);
                    break;
                default:
                    throw new Error("Technical Error");
            }
            return Sys.isDefined(t) && n.buttons.push(t), n;
        },
        prepareDialogConfig: function (e) {
            return (e.text = this.scrubMessageString(e.text)), e;
        },
        scrubMessageString: function (e) {
            var t =
                    (
                        e.match(
                            /<\/?\w+((\s+\w+(\s*=\s*(?:\".*?\"|'.*?'|[^'\">\s]+))?)+\s*|\s*)\/?>/g
                        ) || []
                    ).length > 0,
                n = document.createElement("div");
            if (t) throw new Error("Technical Error");
            try {
                n.textContent = e;
            } catch (e) {
                throw new Error("Technical Error");
            }
            return e;
        },
        showTechnicalError: function () {
            this.model.storeData("showingError", !0),
                this.model.readData("showingLoader")
                    ? this.fireEvent(
                          "request:loaderErrorHandler.showTechnicalError"
                      )
                    : this.fireEvent("request:errorManager.handleError");
        },
        revertSpin: function () {
            Services.activity.removeActivity("spin"),
                this.fireEvent("request:moneyManager.revertBet"),
                this.fireEvent("request:spin.cancelSpin");
        },
    }),
    (Core.CustomMessagesController = Sys.extend(
        Core.Controller,
        Core.CustomMessagesController,
        "Core.CustomMessagesController"
    )),
    Sys.ns("Core"),
    (Core.CustomMessagesModel = {
        constructor: function () {
            Core.CustomMessagesModel.superclass.constructor.apply(
                this,
                arguments
            );
        },
        setupData: function () {
            (this.roundEndQueue = []),
                (this.immediateQueue = []),
                (this.dialogsToWaitFor = []),
                this.storeData("isIdle", !1),
                this.storeData("showingLoader", !0);
        },
        addDialogToWaitFor: function (e) {
            this.dialogsToWaitFor.push(e);
        },
        removeDialogToWaitFor: function (e) {
            var t = this.dialogsToWaitFor.indexOf(e);
            -1 !== t && this.dialogsToWaitFor.splice(t, 1);
        },
        hasDialogsToWaitFor: function () {
            return this.dialogsToWaitFor.length > 0;
        },
        addDialog: function (e) {
            e.immediate
                ? this.immediateQueue.push(e)
                : this.roundEndQueue.push(e);
        },
        removeDialog: function (e) {
            this.spliceDialogFromQueue(this.roundEndQueue, e),
                this.spliceDialogFromQueue(this.immediateQueue, e);
        },
        spliceDialogFromQueue: function (e, t) {
            var n,
                s = e.length;
            for (n = 0; n < s; n++) if (e[n].id === t) return e.splice(n, 1);
            return null;
        },
        popAllImmediate: function () {
            return this.immediateQueue.splice(0, this.immediateQueue.length);
        },
        popAllRoundEnd: function () {
            return this.roundEndQueue.splice(0, this.roundEndQueue.length);
        },
        popAll: function () {
            return this.popAllImmediate().concat(this.popAllRoundEnd());
        },
        hasImmediate: function () {
            return this.immediateQueue.length > 0;
        },
        hasDialogs: function () {
            return (
                this.immediateQueue.length > 0 || this.roundEndQueue.length > 0
            );
        },
        getCloseButtonConfig: function (e) {
            if (Sys.utils.isHomeAvailable())
                return {
                    scope: e,
                    text: Services.languageManager.getText(
                        Language.Keys.btn_casino
                    ),
                    action: function () {
                        e.fireEvent("notify:dialogBoxClosed", {
                            name: "netentExtendCustomError",
                            button: "home",
                        }),
                            Sys.utils.goToLobby();
                    },
                };
        },
        getContinueButtonConfig: function (e, t) {
            return {
                scope: e,
                text: Services.languageManager.getText(
                    Language.Keys.btn_continue
                ),
                action: function () {
                    e.fireEvent("notify:dialogBoxClosed", {
                        name: "netentExtendCustomError",
                        button: "continue",
                    }),
                        t && e.revertSpin();
                },
            };
        },
    }),
    (Core.CustomMessagesModel = Sys.extend(
        Core.Model,
        Core.CustomMessagesModel,
        "Core.CustomMessagesModel"
    )),
    Sys.ns("Core"),
    (Core.ServerManager = {
        constructor: function () {
            Core.ServerManager.superclass.constructor.apply(this, arguments);
        },
        getDefaultMVCClasses: function () {
            return {
                model: Core.ServerManagerModel,
                controller: Core.ServerManagerController,
            };
        },
    }),
    (Core.ServerManager = Sys.extend(
        Core.Module,
        Core.ServerManager,
        "Core.ServerManager"
    )),
    Sys.ns("Core"),
    (Core.ServerManagerController = {
        constructor: function () {
            Core.ServerManagerController.superclass.constructor.apply(
                this,
                arguments
            );
        },
        setupEvents: function () {
            this.on({
                "request:serverManager.sendAction": this.sendAction,
                "request:serverManager.storeParameter": this.storeParameter,
                "notify:moduleLoader.finishedLoadingModules": this.initResponse,
            });
        },
        initResponse: function () {
            this.fireEvent("notify:serverManager.serverResponseReceived", {
                responseText: Resources.readData(
                    "unParsedGameServerInitResponse"
                ),
            });
        },
        sendAction: function (e, t, n) {
            var s = this.model.getRequestURL(e),
                i = this.model.readData("slowServerRequestTimeLimit"),
                r = setTimeout(
                    function () {
                        this.fireEvent("notify:serverManager.slowRequest", e);
                    }.bind(this),
                    i
                );
            this.fireEvent("notify:serverManager.actionRequestSent", e),
                Sys.utils
                    .httpGet({
                        url: s,
                    })
                    .fail(function (t) {
                        this.fireEvent(
                            "notify:serverManager.serverErrorReceived",
                            t
                        ),
                            this.fireEvent(
                                "request:errorManager.handleRequestError",
                                t
                            ),
                            this.fireEvent(
                                "notify:serverManager.actionRequestError",
                                e
                            ),
                            n && this.fireEvent(n, t);
                    }, this)
                    .done(function (e) {
                        this.fireEvent(
                            "notify:serverManager.serverResponseReceived",
                            e,
                            t
                        );
                    }, this)
                    .always(function () {
                        clearTimeout(r);
                    });
        },
        storeParameter: function (e, t) {
            this.model.storeData("parameter:" + e, t);
        },
    }),
    (Core.ServerManagerController = Sys.extend(
        Core.Controller,
        Core.ServerManagerController,
        "Core.ServerManagerController"
    )),
    Sys.ns("Core"),
    (Core.ServerManagerModel = {
        constructor: function () {
            Core.ServerManagerModel.superclass.constructor.apply(
                this,
                arguments
            );
        },
        setupData: function () {
            var e = Resources.readData("queryData");
            this.storeData("queryData", e),
                this.storeData("serverURL", e.server),
                this.storeData(
                    "parameter:sessionID",
                    Resources.readData("sessionID")
                ),
                this.storeData("parameter:gameID", e.gameId),
                this.storeData("slowServerRequestTimeLimit", 5e3);
        },
        getRequestURL: function (e) {
            var t = [
                "/game/NarcosNET/server?sessionId=",
                sessionStorage.getItem("sessionId"),
                "&",
                this.getActionParameters(e),
                Resources.readData("arbitraryParameters"),
                "&no-cache=",
                Sys.utils.pseudoGUID(),
            ].join("");
            return this.doIntegrationSpecificRequestUrlUpdates(t);
        },
        getActionParameters: function (e) {
            return "init" === e ? this.getInitParameters(e) : "";
        },
        getInitParameters: function (e) {
            return [
                "action=" + e,
                "&sessid=" + this.readData("parameter:sessionID"),
                "&gameId=" + this.readData("parameter:gameID"),
            ].join("");
        },
        doIntegrationSpecificRequestUrlUpdates: function (e) {
            return e;
        },
    }),
    (Core.ServerManagerModel = Sys.extend(
        Core.Model,
        Core.ServerManagerModel,
        "Core.ServerManagerModel"
    )),
    Sys.ns("Core"),
    (Core.MoneyManager = {
        constructor: function () {
            Core.MoneyManager.superclass.constructor.apply(this, arguments);
        },
        getDefaultMVCClasses: function () {
            return {
                model: Core.MoneyManagerModel,
                controller: Core.MoneyManagerController,
            };
        },
    }),
    (Core.MoneyManager = Sys.extend(
        Core.Module,
        Core.MoneyManager,
        "Core.MoneyManager"
    )),
    Sys.ns("Core"),
    (Core.MoneyManagerController = {
        constructor: function () {
            Core.MoneyManagerController.superclass.constructor.apply(
                this,
                arguments
            );
        },
        setupEvents: function () {
            this.on({
                "notify:stateHandler.leavingBeforeLoaderCloseState":
                    this.onBeforeLoaderClose,
                "notify:responseParser.responseParsed": this.onServerResponse,
                "notify:settingsManager.settingChanged": this.onSettingChanged,
                "request:moneyManager.revertBet": this.revertBet,
                "notify:freeRounds.reInitResponseReceived":
                    this.onFreeRoundsReInit,
                "notify:freeRounds.ended": this.onFreeRoundsEnded,
            });
        },
        onBeforeLoaderClose: function () {
            this.notifyBalanceChange();
        },
        onServerResponse: function (e) {
            void 0 !== e.credit && this.model.setBalance(e.credit);
        },
        onSettingChanged: function (e, t) {
            "betLevel" === e
                ? this.model.setBetLevel(t) && this.notifyBetChange()
                : "denomination" === e &&
                  this.model.setDenomination(t) &&
                  this.notifyBetChange();
        },
        notifyBalanceChange: function () {
            this.fireEvent("notify:moneyManager.balanceChanged", {
                denomination: this.model.readData("denomination"),
                playerBetCents: this.model.readData("playerBetCents"),
                playerBalanceCoins: this.model.readData("playerBalanceCoins"),
                playerBalanceCents: this.model.readData("playerBalanceCents"),
                playerBalanceFormatted: this.formatMoneyCurrencySign(
                    this.model.readData("playerBalanceCents")
                ),
            });
        },
        notifyBetChange: function () {
            this.fireEvent("notify:moneyManager.betChanged", {
                playerBetCoins: this.model.readData("playerBetCoins"),
                playerBetCents: this.model.readData("playerBetCents"),
                playerBetFormatted: this.formatMoneyCurrencySign(
                    this.model.readData("playerBetCents")
                ),
            });
        },
        revertBet: function () {
            this.setBalance(this.getBalanceCents() + this.getBetCents()),
                this.reloadBalance();
        },
        setBalance: function (e) {
            this.model.setBalance(e) &&
                (this.notifyBetChange(), this.notifyBalanceChange());
        },
        reloadBalance: function () {
            var e = this,
                t = new Sys.Deferred(),
                n = function () {
                    e.removeListener(
                        "notify:responseParser.reloadBalanceParsed"
                    ),
                        e.removeListener(
                            "notify:serverManager.reloadBalanceRequestFailed"
                        );
                };
            return (
                this.addListener(
                    "notify:responseParser.reloadBalanceParsed",
                    function (s) {
                        e.setBalance(parseInt(s.credit, 10)),
                            t.resolveWith([s]),
                            n(),
                            e.fireEvent("notify:moneyManager.balanceReloaded");
                    }
                ),
                this.addListener(
                    "notify:serverManager.reloadBalanceRequestFailed",
                    function (e) {
                        t.reject(e), n();
                    }
                ),
                this.fireEvent(
                    "request:serverManager.sendAction",
                    "reloadbalance",
                    "notify:responseParser.reloadBalanceParsed",
                    "notify:serverManager.reloadBalanceRequestFailed"
                ),
                t
            );
        },
        formatMoney: function (e, t, n) {
            var s = this.model.getMoneyFormat(t),
                i = Sys.isNumber(n) ? n : 2,
                r = (Math.floor(e) / 100).toFixed(i).split("."),
                o = r[0],
                a = r[1];
            return (
                o.split("").reduce(function (e, t, n, i) {
                    var r = e;
                    return (
                        n > 0 && n % 3 == 0 && (r = s.thousandsDivider + r),
                        (r = i[i.length - n - 1] + r)
                    );
                }, "") + (a ? s.decimalDivider + a : "")
            );
        },
        formatMoneyCurrencySign: function (e, t, n) {
            var s = this.model.getMoneyFormat(t),
                i = s.currencyChar,
                r = this.formatMoney(e, t, n),
                o = function (e) {
                    return e.length > 1 ? " " : "";
                };
            return s.isCurrCharAfter ? r + o(i) + i : i + o(i) + r;
        },
        getBalanceCents: function () {
            return this.model.readData("playerBalanceCents");
        },
        getBalanceCoins: function () {
            return this.model.readData("playerBalanceCoins");
        },
        getBetCents: function () {
            return this.model.readData("playerBetCents");
        },
        getBetCoins: function () {
            return this.model.readData("playerBetCoins");
        },
        getBetlineCoinValue: function () {
            return this.model.readData("betlineCoins");
        },
        canPlaceAnotherBet: function () {
            return (
                this.getBetCents() <= this.getBalanceCents() ||
                this.model.readData("inFreeRounds")
            );
        },
        placeBet: function () {
            this.model.readData("inFreeRounds") ||
                this.setBalance(this.getBalanceCents() - this.getBetCents());
        },
        getMinimumBetCents: function () {
            return this.model.readData("minimumBetInCents");
        },
        getCurrencyIsoName: function (e) {
            return this.model.getMoneyFormat(e).iso;
        },
        onFreeRoundsReInit: function () {
            this.model.setupData();
        },
        onFreeRoundsEnded: function () {
            this.model.storeData("inFreeRounds", !1);
        },
    }),
    (Core.MoneyManagerController = Sys.extend(
        Core.Controller,
        Core.MoneyManagerController,
        "Core.MoneyManagerController"
    )),
    Sys.ns("Core"),
    (Core.MoneyManagerModel = {
        constructor: function () {
            Core.MoneyManagerModel.superclass.constructor.apply(
                this,
                arguments
            );
        },
        setupData: function () {
            var e = Resources.readData("gameServerInitResponse");
            this.setupMoneyHandling(),
                this.setBalance(Number(e.credit)),
                this.storeData("betlineCoins", this.getBetlineCoinValue(e)),
                this.storeData(
                    "inFreeRounds",
                    parseInt(e.freeRoundsLeft, 10) > 0
                ),
                this.calculateMinimumBetInCents();
        },
        setupMoneyHandling: function () {
            var e = Resources.readData("gameServerInitResponse"),
                t = {
                    player: Sys.utils.XMLHelper.getMoneyFormatFromXML(
                        Resources.readData("moneyformat_player"),
                        e.playercurrencyiso
                    ),
                    jackpot: Sys.utils.XMLHelper.getMoneyFormatFromXML(
                        Resources.readData("moneyformat_jackpot"),
                        e.jackpotcurrencyiso
                    ),
                };
            if (!t.player)
                throw new Error("The player currency format is missing!");
            if (!t.jackpot)
                throw new Error("The jackpot currency format is missing!");
            this.storeData("moneyFormats", t);
        },
        getMoneyFormat: function (e) {
            var t = this.readData("moneyFormats");
            return t[e] ? t[e] : t.player;
        },
        getCurrency: function (e) {
            return this.getMoneyFormat(e).currencyChar;
        },
        setBalance: function (e) {
            var t = parseInt(e, 10);
            return (
                !isNaN(t) &&
                t >= 0 &&
                (this.storeData("playerBalanceCents", t),
                this.storeData(
                    "playerBalanceCoins",
                    Math.floor(t / this.readData("denomination"))
                ),
                !0)
            );
        },
        setBetLevel: function (e) {
            var t;
            return (
                e > 0 &&
                Math.floor(e) === e &&
                (this.storeData("betLevel", e),
                (t = e * this.readData("betlineCoins")),
                this.storeData("playerBetCoins", t),
                this.storeData(
                    "playerBetCents",
                    t * this.readData("denomination")
                ),
                !0)
            );
        },
        setDenomination: function (e) {
            return (
                e > 0 &&
                (this.storeData("denomination", e),
                this.storeData(
                    "playerBetCents",
                    this.readData("playerBetCoins") * e
                ),
                this.storeData(
                    "playerBalanceCoins",
                    Math.floor(this.readData("playerBalanceCents") / e)
                ),
                !0)
            );
        },
        getBalanceCents: function () {
            return this.readData("playerBalanceCents");
        },
        getBalanceCoins: function () {
            return this.readData("playerBalanceCoins");
        },
        getBetCents: function () {
            return this.readData("playerBetCents");
        },
        getBetCoins: function () {
            return this.readData("playerBetCoins");
        },
        getBetlineCoinValue: function (e) {
            var t,
                n = e["bl.standard"].split(","),
                s = n.length,
                i = 0;
            for (t = 0; t < s; t++) i += parseInt(e["bl.i" + t + ".coins"], 10);
            return i;
        },
        calculateMinimumBetInCents: function () {
            var e = Resources.readData("gameServerInitResponseObject"),
                t = e.betlevel.all,
                n = e.denomination.all,
                s = this.validateArray(t),
                i = this.validateArray(n),
                r = this.readData("betlineCoins"),
                o = s[0] * r * i[0];
            this.storeData("minimumBetInCents", o);
        },
        validateArray: function (e) {
            return Sys.isArray(e)
                ? e.slice(0).sort(function (e, t) {
                      return e - t;
                  })
                : [e];
        },
        setMinimumBetInCents: function (e) {
            this.storeData("minimumBetInCents", e);
        },
        getMinimumBetInCents: function () {
            return this.readData("minimumBetInCents");
        },
    }),
    (Core.MoneyManagerModel = Sys.extend(
        Core.Model,
        Core.MoneyManagerModel,
        "Core.MoneyManagerModel"
    )),
    Sys.ns("Core"),
    (Core.SettingsManager = {
        constructor: function () {
            Core.SettingsManager.superclass.constructor.apply(this, arguments);
        },
        getMixinDependencies: function () {
            return ["trigger"];
        },
        getDefaultMVCClasses: function () {
            return {
                model: Core.SettingsManagerModel,
                controller: Core.SettingsManagerController,
            };
        },
    }),
    (Core.SettingsManager = Sys.extend(
        Core.Module,
        Core.SettingsManager,
        "Core.SettingsManager"
    )),
    Sys.ns("Core"),
    (Core.SettingsManagerController = {
        constructor: function () {
            Core.SettingsManagerController.superclass.constructor.apply(
                this,
                arguments
            );
        },
        setupEvents: function () {
            var e = this;
            e.on({
                "request:settingsManager.storeData": e.storeSetting,
                "request:settingsManager.lockSetting": e.lockSetting,
                "request:settingsManager.unlockSetting": e.unlockSetting,
                "request:settingsManager.disableSetting": e.disableSetting,
                "request:settingsManager.enableSetting": e.enableSetting,
            });
        },
        registerTriggers: function () {
            Services.trigger.registerTrigger(
                "notify:settingsManager.settingChanged",
                this,
                "When the settings are changed"
            );
        },
        isSettable: function (e) {
            var t = this;
            return !t.model.isLocked(e) && !t.model.isDisabled(e);
        },
        storeSetting: function (e, t, n, s) {
            var i,
                r = this;
            r.model.isLocked(e) ||
                r.model.isDisabled(e) ||
                ((i = r.model.readData("settings")),
                i[e] !== t &&
                    ((i[e] = t),
                    r.model.storeData("settings", i),
                    n &&
                        Services.localStorageManager.storeData(
                            e,
                            "string" == typeof t ? t : JSON.stringify(t)
                        ),
                    s ||
                        r.fireEvent(
                            "notify:settingsManager.settingChanged",
                            e,
                            t
                        )));
        },
        getSetting: function (e) {
            return this.model.readData("settings")[e];
        },
        lockSetting: function (e, t) {
            var n = this.model.readData("lockedSettings");
            Sys.isArray(n[e]) || (n[e] = []),
                Sys.contains(n[e], t) ||
                    (n[e].push(t),
                    this.model.storeData("lockedSettings", n),
                    1 === n[e].length &&
                        this.fireEvent(
                            "notify:settingsManager.settingLocked",
                            e
                        ));
        },
        unlockSetting: function (e, t) {
            var n = this.model.readData("lockedSettings");
            Sys.isArray(n[e]) &&
                Sys.contains(n[e], t) &&
                (n[e].splice(n[e].indexOf(t), 1),
                this.model.storeData("lockedSettings", n),
                0 === n[e].length &&
                    this.fireEvent(
                        "notify:settingsManager.settingUnlocked",
                        e
                    ));
        },
        disableSetting: function (e) {
            var t = this;
            (t.model.readData("disabledSettings")[e] = !0),
                t.fireEvent("notify:settingsManager.settingDisabled", e);
        },
        enableSetting: function (e) {
            var t = this;
            (t.model.readData("disabledSettings")[e] = !1),
                t.fireEvent("notify:settingsManager.settingEnabled", e);
        },
    }),
    (Core.SettingsManagerController = Sys.extend(
        Core.Controller,
        Core.SettingsManagerController,
        "Core.SettingsManagerController"
    )),
    Sys.ns("Core"),
    (Core.SettingsManagerModel = {
        constructor: function () {
            Core.SettingsManagerModel.superclass.constructor.apply(
                this,
                arguments
            );
        },
        setupData: function () {
            this.data = {
                settings: {},
                lockedSettings: {},
                disabledSettings: {},
            };
        },
        isLocked: function (e) {
            var t = this.readData("lockedSettings")[e];
            return Sys.isArray(t) && t.length > 0;
        },
        isDisabled: function (e) {
            return this.readData("disabledSettings")[e];
        },
    }),
    (Core.SettingsManagerModel = Sys.extend(
        Core.Model,
        Core.SettingsManagerModel,
        "Core.SettingsManagerModel"
    )),
    Sys.ns("Core"),
    (Core.RealityCheck = {
        CONTROL_STATE: "idle",
        constructor: function () {
            Core.RealityCheck.superclass.constructor.apply(this, arguments);
        },
        getStateChanges: function () {
            var e = this.model,
                t = {
                    realityCheck: {
                        state: {
                            name: "RealityCheck",
                            execute: function (e) {},
                            waitEvents: {
                                "notify:realityCheck:completed": !1,
                            },
                        },
                    },
                };
            return (
                (t[this.CONTROL_STATE] = {
                    queue: [
                        function (t) {
                            e.isTimeToDoRealityCheck() &&
                                t.stateHandler.pushState(t.states.realityCheck);
                        },
                    ],
                }),
                t
            );
        },
        getDefaultMVCClasses: function () {
            return {
                model: Core.RealityCheckModel,
                view: Core.View,
                controller: Core.RealityCheckController,
            };
        },
    }),
    (Core.RealityCheck = Sys.extend(
        Core.Module,
        Core.RealityCheck,
        "Core.RealityCheck"
    )),
    Sys.ns("Core"),
    (Core.RealityCheckController = {
        constructor: function () {
            Core.RealityCheckController.superclass.constructor.apply(
                this,
                arguments
            );
        },
        setupEvents: function () {
            this.on({
                "notify:stateHandler.enteringRealityCheckState":
                    this.doRealityCheck,
                "notify:responseParser.rcInfoParsed": this.handleInfoResponse,
                "notify:responseParser.rcInfoReset": this.handleResetResponse,
                "notify:responseParser.responseParsed": this.onServerResponse,
                "notify:responseParser.gameConfigurationParsed":
                    this.onFreeRoundsEnded,
            });
        },
        onServerResponse: function (e) {
            this.model.processServerResponse(e);
        },
        sendServerAction: function (e, t) {
            this.model.setState("requestPending"),
                this.fireEvent("request:serverManager.sendAction", e, t);
        },
        handleResetResponse: function (e) {
            this.model.storeData("msUntilTimeout", e.rc.msuntiltimeout),
                this.model.storeData("lastCheckTime", Date.now()),
                this.complete(e.clientaction);
        },
        handleInfoResponse: function (e) {
            var t,
                n,
                s,
                i = this,
                r = e.rc,
                o = e.clientaction;
            Sys.isDefined(r) && r.msuntiltimeout <= 0
                ? ((s = Math.round(r.duration / 60 / 60 / 10) / 100),
                  r.totalwin >= 0
                      ? ((n = r.totalwin),
                        (t = Language.Keys.rc_checkPlayingWon))
                      : ((n = Sys.utils.toInt(-r.totalwin)),
                        (t = Language.Keys.rc_checkPlayingLost)),
                  i.requestDialog(
                      Services.languageManager.getText(t, [
                          s,
                          Services.moneyManager.formatMoneyCurrencySign(n),
                      ]),
                      o
                  ),
                  i.model.setState("dialogOpen"))
                : i.handleResetResponse(e);
        },
        requestDialog: function (e, t) {
            var n = this.model.getDialog(e, this, t);
            Services.dialog.show(n);
        },
        complete: function (e) {
            this.fireEvent("notify:realityCheck:completed", e);
        },
        doRealityCheck: function () {
            this.sendServerAction(
                "rcinfo",
                "notify:responseParser.rcInfoParsed"
            );
        },
        onFreeRoundsEnded: function () {
            this.model.processInitData(
                Resources.readData("gameServerInitResponse")
            );
        },
    }),
    (Core.RealityCheckController = Sys.extend(
        Core.Controller,
        Core.RealityCheckController,
        "Core.RealityCheckController"
    )),
    Sys.ns("Core"),
    (Core.RealityCheckModel = {
        constructor: function () {
            Core.RealityCheckModel.superclass.constructor.apply(
                this,
                arguments
            );
        },
        getDialog: function (e, t, n) {
            var s = {
                    scope: t,
                    text: Services.languageManager.getText(
                        Language.Keys.btn_casino
                    ),
                    action: function () {
                        t.fireEvent("notify:dialogBoxClosed", {
                            name: "realityCheck",
                            button: "home",
                        }),
                            Sys.utils.goToLobby(
                                Utils.CONSTANTS.REASON_CODES
                                    .NORMAL_GAME_TERMINATION
                            );
                    },
                },
                i = {
                    scope: t,
                    text: Services.languageManager.getText(
                        Language.Keys.btn_continue
                    ),
                    action: function () {
                        t.complete(n),
                            t.fireEvent("notify:dialogBoxClosed", {
                                name: "realityCheck",
                                button: "continue",
                            }),
                            t.sendServerAction(
                                "rcreset",
                                "notify:responseParser.rcInfoReset"
                            );
                    },
                    primary: !0,
                },
                r = {
                    scope: t,
                    text: Services.languageManager.getText(
                        Language.Keys.btn_checkEnd
                    ),
                    action: function () {
                        t.complete(n),
                            t.fireEvent("notify:dialogBoxClosed", {
                                name: "realityCheck",
                                button: "end",
                            }),
                            t.fireEvent("request:stopGame.disable");
                    },
                };
            return {
                title: Services.languageManager.getText(
                    Language.Keys.rc_checkReminder
                ),
                text: e,
                buttons: Sys.utils.isHomeAvailable() ? [s, i] : [r, i],
            };
        },
        setupData: function () {
            this.processInitData(Resources.readData("gameServerInitResponse"));
        },
        processInitData: function (e) {
            var t = Sys.utils.strIsTrue(e["rc.enabled"]);
            Sys.utils.toInt(e.freeRoundsLeft) > 0 && (t = !1),
                this.storeData("rcEnabled", t),
                t &&
                    (Sys.isDefined(e["rc.msuntiltimeout"])
                        ? (this.storeData(
                              "msUntilTimeout",
                              Sys.utils.toInt(e["rc.msuntiltimeout"])
                          ),
                          this.storeData("lastCheckTime", Date.now()))
                        : this.storeData("rcEnabled", !1));
        },
        processServerResponse: function (e) {
            this.storeData("nextAction", e.nextaction);
        },
        isTimeToDoRealityCheck: function () {
            var e;
            return !(
                !this.readData("rcEnabled") ||
                ((e =
                    this.readData("lastCheckTime") +
                        this.readData("msUntilTimeout") <=
                    Date.now()),
                "spin" !== this.readData("nextAction") || !e)
            );
        },
    }),
    (Core.RealityCheckModel = Sys.extend(
        Core.Model,
        Core.RealityCheckModel,
        "Core.RealityCheckModel"
    )),
    Sys.ns("Core.Slots"),
    (Core.Slots.RealityCheck = {
        CONTROL_STATE: "stopped",
        constructor: function () {
            Core.Slots.RealityCheck.superclass.constructor.apply(
                this,
                arguments
            );
        },
    }),
    (Core.Slots.RealityCheck = Sys.extend(
        Core.RealityCheck,
        Core.Slots.RealityCheck,
        "Core.Slots.RealityCheck"
    )),
    Sys.ns("Core"),
    (Core.BonusMessage = {
        constructor: function () {
            Core.BonusMessage.superclass.constructor.apply(this, arguments);
        },
        getDefaultMVCClasses: function () {
            return {
                model: Core.Model,
                controller: Core.BonusMessageController,
            };
        },
    }),
    (Core.BonusMessage = Sys.extend(
        Core.Module,
        Core.BonusMessage,
        "Core.BonusMessage"
    )),
    Sys.ns("Core"),
    (Core.BonusMessageController = {
        constructor: function () {
            Core.BonusMessageController.superclass.constructor.apply(
                this,
                arguments
            );
        },
        setupEvents: function () {
            this.on({
                "notify:responseParser.responseParsed": this.onServerResponse,
                "notify:stateHandler.enteringIdleState":
                    this.showBonusMessageDialog,
            });
        },
        onServerResponse: function (e) {
            var t;
            Sys.isNumber(e.bonusAwarded) && (t = e.bonusAwarded.toFixed(2)),
                this.model.storeData("bonusAwarded", t);
        },
        showBonusMessageDialog: function () {
            var e = this.model.readData("bonusAwarded");
            Sys.isDefined(e) &&
                (this.requestDialog(e), this.model.setState("dialogOpen"));
        },
        requestDialog: function (e) {
            var t = this.getDialog(e);
            Services.dialog.show(t);
        },
        getDialog: function (e) {
            var t = this;
            return {
                title: Services.languageManager.getText(
                    Language.Keys.bonusAwardedTitle
                ),
                text: Services.languageManager.getText(
                    Language.Keys.bonusAwardedCongrats,
                    [e]
                ),
                buttons: [
                    {
                        text: Services.languageManager.getText(
                            Language.Keys.btn_continue
                        ),
                        action: function () {
                            t.fireEvent("notify:dialogBoxClosed", {
                                name: "bonusMessage",
                                button: "continue",
                            });
                        },
                        primary: !0,
                    },
                ],
            };
        },
    }),
    (Core.BonusMessageController = Sys.extend(
        Core.Controller,
        Core.BonusMessageController,
        "Core.BonusMessageController"
    )),
    Sys.ns("Core"),
    (Core.KeepAlive = {
        constructor: function () {
            Core.KeepAlive.superclass.constructor.apply(this, arguments);
        },
        getDefaultMVCClasses: function () {
            return {
                model: Core.KeepAliveModel,
                view: Core.View,
                controller: Core.KeepAliveController,
            };
        },
    }),
    (Core.KeepAlive = Sys.extend(
        Core.Module,
        Core.KeepAlive,
        "Core.KeepAlive"
    )),
    Sys.ns("Core"),
    (Core.KeepAliveController = {
        constructor: function () {
            Core.KeepAliveController.superclass.constructor.apply(
                this,
                arguments
            ),
                this.model.readData("url") && this.keepAlive();
        },
        keepAlive: function () {
            var e = this,
                t = this.model.readData("interval");
            Sys.utils
                .httpGet({
                    url: this.model.readData("url"),
                    handleError: !1,
                    showTimeoutDialog: !1,
                })
                .always(function () {
                    setTimeout(function () {
                        e.keepAlive();
                    }, t);
                });
        },
    }),
    (Core.KeepAliveController = Sys.extend(
        Core.Controller,
        Core.KeepAliveController,
        "Core.KeepAliveController"
    )),
    Sys.ns("Core"),
    (Core.KeepAliveModel = {
        constructor: function () {
            Core.KeepAliveModel.superclass.constructor.apply(this, arguments);
        },
        setupData: function () {
            var e = Resources.readData("queryData"),
                t = e.keepAliveURL,
                n = e.keepAliveInterval,
                s = Resources.readData("sessionID");
            s &&
                Sys.utils.isUrl(t) &&
                parseInt(n, 10) >= 5 &&
                (this.storeData(
                    "url",
                    Sys.utils.appendParameterToQuery(t, "sessId=" + s)
                ),
                this.storeData("interval", 1e3 * n));
        },
    }),
    (Core.KeepAliveModel = Sys.extend(
        Core.Model,
        Core.KeepAliveModel,
        "Core.KeepAliveModel"
    )),
    Sys.ns("Core"),
    (Core.PlayForRealPromo = {
        constructor: function () {
            Core.PlayForRealPromo.superclass.constructor.apply(this, arguments);
        },
        getStateChanges: function () {
            return {
                idle: {
                    waitEvents: ["notify:playForRealPromo:completed"],
                },
            };
        },
        getDefaultMVCClasses: function () {
            return {
                model: Core.PlayForRealPromoModel,
                view: Core.View,
                controller: Core.PlayForRealPromoController,
            };
        },
    }),
    (Core.PlayForRealPromo = Sys.extend(
        Core.Module,
        Core.PlayForRealPromo,
        "Core.PlayForRealPromo"
    )),
    Sys.ns("Core"),
    (Core.PlayForRealPromoController = {
        constructor: function () {
            Core.PlayForRealPromoController.superclass.constructor.apply(
                this,
                arguments
            );
        },
        setupEvents: function () {
            var e = this;
            e.on({
                "notify:stateHandler.enteringIdleState": e.onEnteringIdleState,
                "request:playForRealPromo:enable": e.onEnable,
                "request:playForRealPromo:disable": e.onDisable,
            });
        },
        onEnteringIdleState: function () {
            var e = this,
                t = e.model.readData("roundsLeft");
            0 !== t || e.isDisabled ? e.complete() : e.requestDialog(),
                Sys.isDefined(t) && e.model.handleRounds();
        },
        requestDialog: function () {
            Services.dialog.show(this.model.getDialog(this));
        },
        complete: function () {
            this.fireEvent("notify:playForRealPromo:completed");
        },
        onEnable: function () {
            this.isDisabled = !1;
        },
        onDisable: function () {
            this.isDisabled = !0;
        },
    }),
    (Core.PlayForRealPromoController = Sys.extend(
        Core.Controller,
        Core.PlayForRealPromoController,
        "Core.PlayForRealPromoController"
    )),
    Sys.ns("Core"),
    (Core.PlayForRealPromoModel = {
        constructor: function () {
            Core.PlayForRealPromoModel.superclass.constructor.apply(
                this,
                arguments
            );
        },
        setupData: function () {
            var e,
                t = Resources.readData("gameServerInitResponse") || {};
            t.playforfun &&
                Sys.isDefined(t["playforrealpromo.rounds"]) &&
                ((e = Sys.utils.toInt(t["playforrealpromo.rounds"])),
                this.storeData("roundsLeft", e),
                this.storeData("rounds", e));
        },
        getDialog: function (e) {
            var t = {
                    text: Services.languageManager.getText(
                        Language.Keys.btn_continue
                    ),
                    scope: e,
                    action: function () {
                        e.fireEvent("notify:dialogBoxClosed", {
                            name: "playForRealPromo",
                            button: "continue",
                        }),
                            e.complete();
                    },
                },
                n = {
                    text: Services.languageManager.getText(
                        Language.Keys.btn_login
                    ),
                    scope: e,
                    action: function () {
                        e.fireEvent("notify:dialogBoxClosed", {
                            name: "playForRealPromo",
                            button: "login",
                        }),
                            e.complete(),
                            Sys.utils.goToLobby(
                                Utils.CONSTANTS.REASON_CODES
                                    .WANTS_TO_PLAY_FOR_REAL
                            );
                    },
                    primary: !0,
                };
            return {
                title: Services.languageManager.getText(
                    Language.Keys.youPlayingForFun
                ),
                buttons: Sys.utils.isHomeAvailable() ? [t, n] : [t],
            };
        },
        handleRounds: function () {
            var e,
                t = this.readData("roundsLeft");
            (e = 0 === t ? this.readData("rounds") : --t),
                this.storeData("roundsLeft", e);
        },
    }),
    (Core.PlayForRealPromoModel = Sys.extend(
        Core.Model,
        Core.PlayForRealPromoModel,
        "Core.PlayForRealPromoModel"
    )),
    Sys.ns("Core"),
    (Core.ErrorManager = {
        constructor: function () {
            Core.ErrorManager.superclass.constructor.apply(this, arguments);
        },
        getDefaultMVCClasses: function () {
            return {
                controller: Core.ErrorManagerController,
                model: Core.ErrorManagerModel,
            };
        },
    }),
    (Core.ErrorManager = Sys.extend(
        Core.Module,
        Core.ErrorManager,
        "Core.ErrorManager"
    )),
    Sys.ns("Core"),
    (Core.ErrorManagerModel = {
        constructor: function () {
            Core.ErrorManagerModel.superclass.constructor.apply(
                this,
                arguments
            );
        },
        setupData: function () {
            var e = Resources.readData("queryData"),
                t =
                    Sys.isDefined(e.depositAvailable) &&
                    !0 === e.depositAvailable;
            this.storeData("depositAvailable", t),
                this.storeData("dialogConfig", this.setupDialogConfig(t));
        },
        setupDialogConfig: function (e) {
            var t = {},
                n = {
                    type: "reload",
                    primary: !0,
                },
                s = e
                    ? [
                          {
                              type: "reduceBetAndRevertSpin",
                          },
                          {
                              type: "deposit",
                              primary: !0,
                          },
                      ]
                    : [
                          {
                              type: "casino",
                          },
                          {
                              type: "reduceBetAndRevertSpin",
                              primary: !0,
                          },
                      ],
                i = Sys.utils.isHomeAvailable();
            return (
                (t.http = {
                    title: Services.languageManager.getText(
                        Language.Keys.connectionLost
                    ),
                    text: Services.languageManager.getText(
                        Language.Keys.reload
                    ),
                    buttons: i
                        ? [
                              {
                                  type: "casino",
                                  reason: Utils.CONSTANTS.REASON_CODES
                                      .TECHNICAL_ERROR,
                              },
                              n,
                          ]
                        : [n],
                    fatal: !0,
                }),
                (t[11] = {
                    title: Services.languageManager.getText(
                        Language.Keys.playLimit
                    ),
                    text: Services.languageManager.getText("11"),
                    buttons: i
                        ? [
                              {
                                  type: "casino",
                                  reason: Utils.CONSTANTS.REASON_CODES
                                      .ACKNOWLEDGES_PLAYER_LIMIT,
                                  primary: !0,
                              },
                          ]
                        : [],
                }),
                (t[12] = {
                    title: Services.languageManager.getText(
                        Language.Keys.freeRounds_expired
                    ),
                    buttons: i
                        ? [
                              {
                                  type: "casino",
                                  primary: !0,
                              },
                          ]
                        : [n],
                    fatal: !0,
                }),
                (t[13] = {
                    title: Services.languageManager.getText(
                        Language.Keys.playLimit
                    ),
                    text: Services.languageManager.getText("13"),
                    buttons: [
                        {
                            type: "closeAndRevertSpin",
                        },
                        {
                            type: "reduceBetAndRevertSpin",
                            primary: !0,
                        },
                    ],
                }),
                Sys.each([14, 16], function (e) {
                    t[e] = {
                        text: Services.languageManager.getText(
                            Language.Keys.freeRoundsOfferUsed
                        ),
                        buttons: [
                            {
                                type: "closeBonusProgramWidget",
                                primary: !0,
                            },
                        ],
                    };
                }),
                (t[20] = {
                    title: Services.languageManager.getText(
                        Language.Keys.sessionTimeOut
                    ),
                    text: Services.languageManager.getText(
                        i ? Language.Keys.returnToLobby : "20"
                    ),
                    buttons: i
                        ? [
                              {
                                  type: "casino",
                                  reason: Utils.CONSTANTS.REASON_CODES
                                      .SESSION_TIMEOUT,
                                  primary: !0,
                              },
                          ]
                        : [],
                    fatal: !0,
                }),
                Sys.each([10, 15, 51, 100, 101, 102], function (e) {
                    t[e] = {
                        title: Services.languageManager.getText(
                            Language.Keys.outOfMoney
                        ),
                        text: Services.languageManager.getText(
                            Language.Keys.deposit
                        ),
                        buttons: i
                            ? s
                            : [
                                  {
                                      type: "closeAndRevertSpin",
                                      primary: !0,
                                  },
                              ],
                    };
                }),
                Sys.each([0, 53, 56, 58], function (e) {
                    t[e] = {
                        title:
                            Services.languageManager.getText(
                                Language.Keys.gameUnavailable
                            ) +
                            " (" +
                            e +
                            ")",
                        buttons: i
                            ? [
                                  {
                                      type: "casino",
                                      reason: Utils.CONSTANTS.REASON_CODES
                                          .TECHNICAL_ERROR,
                                  },
                                  n,
                              ]
                            : [n],
                        fatal: !0,
                    };
                }),
                (t[70] = {
                    title: Services.languageManager.getText(
                        Language.Keys.accountUnavailable
                    ),
                    buttons: i
                        ? [
                              {
                                  type: "casino",
                              },
                              n,
                          ]
                        : [n],
                    fatal: !0,
                }),
                (t.generic = {
                    title: Services.languageManager.getText(
                        Language.Keys.error
                    ),
                    text: Services.languageManager.getText(
                        i ? Language.Keys.returnToLobby : Language.Keys.reload
                    ),
                    buttons: i
                        ? [
                              {
                                  type: "casino",
                                  reason: Utils.CONSTANTS.REASON_CODES
                                      .TECHNICAL_ERROR,
                                  primary: !0,
                              },
                          ]
                        : [n],
                    fatal: !0,
                    hideGame: !0,
                }),
                (t.gameInactive = {
                    title: Services.languageManager.getText(
                        Language.Keys.gameUnavailable
                    ),
                    text: Services.languageManager.getText(
                        Language.Keys.lostConnectInactivity
                    ),
                    buttons: i
                        ? [
                              {
                                  type: "casino",
                                  reason: Utils.CONSTANTS.REASON_CODES
                                      .TECHNICAL_ERROR,
                              },
                              n,
                          ]
                        : [n],
                    fatal: !0,
                    hideGame: !0,
                }),
                t
            );
        },
        getDialogConfig: function (e) {
            var t,
                n = this.readData("dialogConfig");
            return (
                (t = Sys.isDefined(n[e]) ? n[e] : n.generic),
                (t.errorCode = e),
                t
            );
        },
        setUpOutOfMoneyErrorConfig: function () {
            var e,
                t,
                n = Services.languageManager.getText(Language.Keys.outOfMoney),
                s = this.readData("depositAvailable"),
                i = Services.moneyManager.getBalanceCents(),
                r = Services.moneyManager.getMinimumBetCents(),
                o = Sys.utils.isHomeAvailable();
            return (
                i >= r
                    ? s && o
                        ? ((e = Services.languageManager.getText(
                              Language.Keys.deposit
                          )),
                          (t = [
                              {
                                  type: "deposit",
                              },
                              {
                                  type: "reduceBet",
                                  primary: !0,
                              },
                          ]))
                        : !s && o
                        ? ((e = Services.languageManager.getText(
                              Language.Keys.deposit
                          )),
                          (t = [
                              {
                                  type: "casino",
                              },
                              {
                                  type: "reduceBet",
                                  primary: !0,
                              },
                          ]))
                        : ((e = Services.languageManager.getText(
                              Language.Keys.reduce
                          )),
                          (t = [
                              {
                                  type: "close",
                                  primary: !0,
                              },
                          ]))
                    : ((e = Services.languageManager.getText(
                          Language.Keys.depositPlay
                      )),
                      (t =
                          s && o
                              ? [
                                    {
                                        type: "deposit",
                                    },
                                    {
                                        type: "close",
                                        primary: !0,
                                    },
                                ]
                              : !s && o
                              ? [
                                    {
                                        type: "casino",
                                    },
                                    {
                                        type: "close",
                                        primary: !0,
                                    },
                                ]
                              : [
                                    {
                                        type: "close",
                                        primary: !0,
                                    },
                                ])),
                {
                    title: n,
                    text: e,
                    buttons: t,
                    errorCode: 100,
                }
            );
        },
    }),
    (Core.ErrorManagerModel = Sys.extend(
        Core.Model,
        Core.ErrorManagerModel,
        "Core.ErrorManagerModel"
    )),
    Sys.ns("Core"),
    (Core.ErrorManagerController = {
        constructor: function () {
            Core.ErrorManagerController.superclass.constructor.apply(
                this,
                arguments
            );
        },
        setupEvents: function () {
            this.on({
                "request:errorManager.handleError": this.handleError.bind(this),
                "request:errorManager.handleRequestError":
                    this.handleRequestError,
                "request:errorManager.handleGameInactive":
                    this.handleGameInactive,
                "request:errorManager.handleClientOutOfMoneyError":
                    this.handleClientOutOfMoneyError,
            });
        },
        showDialog: function (e) {
            var t = "http" === e.errorCode ? 0 : e.errorCode;
            this.fireEvent(
                "notify:errorManager.error",
                t,
                Services.languageManager.getText(t)
            ),
                Services.dialog.show(e);
        },
        showDialogForErrorCode: function (e) {
            this.showDialog(this.getDialogConfig(e));
        },
        handleError: function (e) {
            Utils.Helpers.logError(
                "GCS_RUNTIME_ERROR",
                e,
                new Error("Runtime error")
            ),
                this.showDialogForErrorCode(e);
        },
        handleRequestError: function (e) {
            var t,
                n = this.handleHttpErrors(e);
            n || (n = this.handleIntegrationSpecificErrors(e)),
                n || (n = this.handleGameSpecificErrors(e)),
                n || (n = this.handleServerErrors(e)),
                n
                    ? (n.fatal && this.fireEvent("request:audioPlayer.stopAll"),
                      (t = "http" === n.errorCode ? 0 : n.errorCode),
                      Utils.Helpers.logError(
                          "GCS_RUNTIME_ERROR",
                          t,
                          new Error("Runtime server request error")
                      ),
                      this.showDialog(n))
                    : this.fireEvent("notify:errorManager.noErrorDetected");
        },
        handleHttpErrors: function (e) {
            if (!Sys.utils.httpRequestIsOK(e))
                return this.getDialogConfig("http");
        },
        handleIntegrationSpecificErrors: function (e) {},
        handleGameSpecificErrors: function (e) {},
        handleServerErrors: function (e) {
            var t = Sys.utils.getErrorCode(e);
            if (Sys.isDefined(t)) return this.getDialogConfig(t);
        },
        handleGameInactive: function () {},
        handleClientOutOfMoneyError: function () {
            var e = this.model.setUpOutOfMoneyErrorConfig();
            (e.buttons = this.getButtons(e.buttons)),
                Utils.Helpers.logError(
                    "GCS_RUNTIME_ERROR",
                    402,
                    new Error("Client out of money error")
                ),
                this.showDialog(e);
        },
        getDialogConfig: function (e) {
            var t = this.model.getDialogConfig(e);
            return {
                title: t.title,
                text: t.text,
                buttons: this.getButtons(t.buttons),
                fatal: Boolean(t.fatal),
                hideGame: Boolean(t.hideGame),
                errorCode: e,
            };
        },
        getButtons: function (e) {
            var t = this;
            return e.map(function (e) {
                return t.getButton(e);
            });
        },
        getButton: function (e) {
            var t = this,
                n = e.type;
            switch (n) {
                case "casino":
                    return {
                        text: Services.languageManager.getText(
                            Language.Keys.btn_casino
                        ),
                        primary: !!e.primary && e.primary,
                        action: function () {
                            t.onButtonInteraction("home"),
                                Sys.utils.goToLobby(e.reason);
                        },
                    };
                case "reload":
                    return {
                        text: Services.languageManager.getText(
                            Language.Keys.btn_reload
                        ),
                        primary: !!e.primary && e.primary,
                        action: function () {
                            t.onButtonInteraction(n), Sys.utils.reload();
                        },
                    };
                case "close":
                    return {
                        text: Services.languageManager.getText(
                            Language.Keys.btn_close
                        ),
                        primary: !!e.primary && e.primary,
                        action: function () {
                            t.onButtonInteraction(n);
                        },
                    };
                case "closeBonusProgramWidget":
                    return {
                        text: Services.languageManager.getText(
                            Language.Keys.btn_close
                        ),
                        primary: !!e.primary && e.primary,
                        action: function () {
                            t.onButtonInteraction(n),
                                t.closeBonusProgramWidget();
                        },
                    };
                case "closeAndRevertSpin":
                    return {
                        text: Services.languageManager.getText(
                            Language.Keys.btn_close
                        ),
                        primary: !!e.primary && e.primary,
                        action: function () {
                            t.onButtonInteraction(n), t.revertSpin();
                        },
                    };
                case "reduceBetAndRevertSpin":
                    return {
                        text: Services.languageManager.getText(
                            Language.Keys.btn_reduceBet
                        ),
                        primary: !!e.primary && e.primary,
                        action: function () {
                            t.onButtonInteraction(n),
                                t.revertSpin(),
                                t.openBetSettings();
                        },
                    };
                case "reduceBet":
                    return {
                        text: Services.languageManager.getText(
                            Language.Keys.btn_reduceBet
                        ),
                        primary: !!e.primary && e.primary,
                        action: function () {
                            t.onButtonInteraction(n), t.openBetSettings();
                        },
                    };
                case "deposit":
                    return {
                        text: Services.languageManager.getText(
                            Language.Keys.btn_deposit
                        ),
                        primary: !!e.primary && e.primary,
                        action: function () {
                            t.onButtonInteraction(n),
                                Services.moneyManager.reloadBalance(),
                                Sys.utils.goToCashier();
                        },
                    };
                default:
                    return {
                        text: "[ERROR]",
                        action: function () {
                            console.error(
                                "this button was not correctly configured in the error manager"
                            );
                        },
                    };
            }
        },
        openBetSettings: function () {
            this.fireEvent("request:betSettings.show"),
                this.fireEvent("request:bet.reduceBet");
        },
        revertSpin: function () {
            this.fireEvent("request:moneyManager.revertBet"),
                this.fireEvent("request:spin.activateDefaultOutcome", "basic");
        },
        closeBonusProgramWidget: function () {
            this.fireEvent("notify:bonusProgramWidget.close");
        },
        onButtonInteraction: function (e) {
            this.fireEvent("notify:errorManager.errorDialogClosed"),
                this.fireEvent("notify:dialogBoxClosed", {
                    name: "error",
                    button: e,
                });
        },
    });
(Core.ErrorManagerController = Sys.extend(
    Core.Controller,
    Core.ErrorManagerController,
    "Core.ErrorManagerController"
)),
    Sys.ns("Core"),
    (Core.LocalStorageManager = {
        constructor: function () {
            Core.LocalStorageManager.superclass.constructor.apply(
                this,
                arguments
            );
        },
        getDefaultMVCClasses: function () {
            return {
                model: Core.LocalStorageManagerModel,
                controller: Core.LocalStorageManagerController,
            };
        },
    }),
    (Core.LocalStorageManager = Sys.extend(
        Core.Module,
        Core.LocalStorageManager,
        "Core.LocalStorageManager"
    )),
    Sys.ns("Core"),
    (Core.LocalStorageManagerController = {
        constructor: function () {
            Core.LocalStorageManagerController.superclass.constructor.apply(
                this,
                arguments
            );
        },
        storeData: function (e, t) {
            this.model.writeToStorage(e, t);
        },
        readData: function (e) {
            return this.model.readFromStorage(e);
        },
        removeData: function (e) {
            this.model.removeFromStorage(e);
        },
        hasData: function (e) {
            return this.model.hasData(e);
        },
    }),
    (Core.LocalStorageManagerController = Sys.extend(
        Core.Controller,
        Core.LocalStorageManagerController,
        "Core.LocalStorageManagerController"
    )),
    Sys.ns("Core"),
    (Core.LocalStorageManagerModel = {
        constructor: function () {
            Core.LocalStorageManagerModel.superclass.constructor.apply(
                this,
                arguments
            );
        },
        writeToStorage: function (e, t) {
            this.readData("storageActive") &&
                "string" == typeof e &&
                "string" == typeof t &&
                this._setItemInStorage(this.accessKey + e, t);
        },
        readFromStorage: function (e) {
            var t = this;
            if (t.readData("storageActive")) {
                if (!Sys.isDefined(e)) return t.getAllData();
                if ("string" == typeof e)
                    return t._getItemFromStorage(t.accessKey + e);
            }
            return !1;
        },
        removeFromStorage: function (e) {
            this.readData("storageActive") &&
                "string" == typeof e &&
                this._removeItemFromStorage(this.accessKey + e);
        },
        hasData: function (e) {
            return !(
                !Sys.isDefined(e) || "string" != typeof this.readFromStorage(e)
            );
        },
        setupData: function () {
            var e = Resources.readData("queryData");
            (this.accessKey = "netent." + e.operatorId + "." + e.gameId + "."),
                this.storeData("storageActive", this.isLocalStorageSupported());
        },
        createAccessKey: function (e, t, n) {
            if (Sys.isDefined(e) && Sys.isDefined(t) && Sys.isDefined(n))
                return this.hashValue(e + "." + t + "." + n) + ".";
        },
        activate: function () {
            this.storeData("storageActive", !0);
        },
        deactivate: function () {
            this.storeData("storageActive", !1);
        },
        getAllData: function () {
            for (var e = this, t = {}, n = 0, s = e._getKeyFromStorage(n); s; )
                0 === s.indexOf(e.accessKey) &&
                    (t[s.replace(e.accessKey, "")] = e._getItemFromStorage(s)),
                    ++n,
                    (s = e._getKeyFromStorage(n));
            return t;
        },
        hashValue: function (e) {
            var t,
                n,
                s = 2285455121;
            if ("string" != typeof e) return null;
            for (n = 0, t = e.length; n < t; n++)
                s += e.charCodeAt(n) * (n + 1);
            return s;
        },
        isLocalStorageSupported: function () {
            try {
                return (
                    "object" == typeof window.localStorage &&
                    (this._setItemInStorage("availabilityCheck", "true"),
                    this._removeItemFromStorage("availabilityCheck"),
                    !0)
                );
            } catch (e) {
                return !1;
            }
        },
        _setItemInStorage: function (e, t) {
            localStorage.setItem(e, t);
        },
        _removeItemFromStorage: function (e) {
            localStorage.removeItem(e);
        },
        _getItemFromStorage: function (e) {
            return localStorage.getItem(e);
        },
        _getKeyFromStorage: function (e) {
            return localStorage.key(e);
        },
    }),
    (Core.LocalStorageManagerModel = Sys.extend(
        Core.Model,
        Core.LocalStorageManagerModel,
        "Core.LocalStorageManagerModel"
    )),
    Sys.ns("Core"),
    (Core.AutoPlayer = {
        constructor: function () {
            Core.AutoPlayer.superclass.constructor.apply(this, arguments);
        },
        getDefaultMVCClasses: function () {
            return {
                model: Core.AutoPlayerModel,
                controller: Core.AutoPlayerController,
            };
        },
    }),
    (Core.AutoPlayer = Sys.extend(
        Core.Module,
        Core.AutoPlayer,
        "Core.AutoPlayer"
    )),
    Sys.ns("Core"),
    (Core.AutoPlayerController = {
        constructor: function () {
            Core.AutoPlayerController.superclass.constructor.apply(
                this,
                arguments
            );
        },
        setupEvents: function () {
            this.on({
                "request:autoPlayer.stop": this.stop,
                "request:autoPlayer.pause": this.pause,
                "request:autoPlayer.start": this.start,
                "request:autoPlayer.resume": this.resume,
                "notify:responseParser.responseParsed": this.onServerResponse,
                "notify:serverManager.serverErrorReceived": this.stop,
                "notify:stateHandler.leavingIdleState": this.onLeavingIdleState,
                "notify:stateHandler.enteringIdleState":
                    this.onEnteringIdleState,
                "notify:stateHandler.enteringStandardWinPresentationState":
                    this.onEnteringWinPresentationState,
                "notify:stateHandler.enteringBigWinState":
                    this.onEnteringWinPresentationState,
                "notify:spinButton.clicked": this.onSpinButtonClicked,
                "notify.dialogWindow.showingDialog": this.onShowingDialog,
                "notify:dialogWindow.allDialogsClosed": this.onAllDialogsClosed,
                "notify:settingsManager.settingChanged": this.onSettingChanged,
                "notify:errorManager.error": this.stop,
            });
        },
        onServerResponse: function (e) {
            this.model.processServerResponse(e);
        },
        playRound: function () {
            this.model.readData("nrRounds") > 0 && this.requestRoundStart();
        },
        start: function () {
            this.play(),
                !this.model.readData("spinning") &&
                    this.model.readData("isBasicState") &&
                    this.requestRoundStart();
        },
        stop: function () {
            this.model.isState("STOPPED") ||
                (this.fireEvent(
                    "request:spinButton.removeProperty",
                    "visibleDuringRound",
                    this.MODULE_NAME
                ),
                this.fireEvent("request:spinButton.hideCounter"),
                this.fireEvent(
                    "request:spinButton.removeDisplayType",
                    "autoPlay"
                ),
                this.fireEvent(
                    "request:spinButton.removeDisplayType",
                    "autoPlayStop"
                ),
                this.fireEvent("request:quickStopper.enableInMode", "autoPlay"),
                this.fireEvent(
                    "request:playModeManager.removeMode",
                    "autoplay"
                ),
                this.model.setState("STOPPED"),
                this.model.storeData("nrRounds", 0),
                this.fireEvent(
                    "request:settingsManager.storeData",
                    "autoPlayNrSpins",
                    0
                ),
                this.fireEvent("request:spinButton.enable", this.MODULE_NAME),
                this.fireEvent(
                    "request:settingsButton.enable",
                    this.MODULE_NAME
                ),
                this.fireEvent("request:pluginMenu.enable", this.MODULE_NAME),
                this.fireEvent("request:betSettings.enable", this.MODULE_NAME),
                this.fireEvent("request:maxBetButton.enable", this.MODULE_NAME),
                this.fireEvent("notify:autoPlayer.stopped"));
        },
        pause: function () {
            this.model.isState("PLAYING") && this.model.setState("PAUSED");
        },
        resume: function () {
            var e = this;
            this.model.isState("PAUSED") &&
                (this.model.setState("PLAYING"),
                e.model.readData("spinning") ||
                    (e.playRound(), e.model.isState("STOPPING") && e.stop()),
                this.model.isState("STOPPING") && e.stop());
        },
        play: function () {
            var e = this;
            !e.model.isState("PLAYING") &&
                e.model.readData("nrRounds") > 0 &&
                (e.model.setState("PLAYING"),
                e.fireEvent("request:spinButton.removeDisplayType", "autoPlay"),
                e.fireEvent(
                    "request:spinButton.addDisplayType",
                    "autoPlayStop"
                ),
                e.fireEvent("request:quickStopper.disableInMode", "autoPlay"),
                e.fireEvent("request:spinButton.disable", e.MODULE_NAME),
                e.fireEvent("request:betSettings.disable", e.MODULE_NAME),
                e.fireEvent("request:maxBetButton.disable", e.MODULE_NAME),
                e.fireEvent("request:settingsButton.disable", e.MODULE_NAME),
                e.fireEvent("request:pluginMenu.disable", e.MODULE_NAME),
                e.fireEvent("notify:autoPlayer.starting"),
                e.fireEvent("request:playModeManager.addMode", "autoplay"));
        },
        onSpinButtonClicked: function (e) {
            return (
                (!Sys.isDefined(e) ||
                    !e.hasOwnProperty("skip") ||
                    !0 !== e.skip) &&
                ((this.model.isState("PLAYING") ||
                    this.model.isState("PAUSED") ||
                    this.model.isState("STOPPING")) &&
                    this.stop(),
                !0)
            );
        },
        onEnteringIdleState: function () {
            var e = this,
                t = e.model;
            t.storeData("spinning", !1),
                t.isState("PLAYING") && e.playRound(),
                t.isState("STOPPING") && e.stop(),
                t.isState("WAITING") &&
                    (e.fireEvent("request:playModeManager.addMode", "autoplay"),
                    e.play(),
                    e.requestRoundStart());
        },
        onLeavingIdleState: function () {
            var e = this;
            e.model.storeData("spinning", !0),
                e.model.isState("WAITING") &&
                    (e.fireEvent("request:playModeManager.addMode", "autoplay"),
                    e.play()),
                e.model.isState("PLAYING") && this.notifyNumberOfRounds();
        },
        onEnteringWinPresentationState: function () {
            var e = this;
            e.model.isState("STOPPING") &&
                Services.settingsManager.getSetting("autoPlayNrSpins") > 0 &&
                e.fireEvent(
                    "request:settingsManager.storeData",
                    "autoPlayNrSpins",
                    0
                );
        },
        onShowingDialog: function () {
            this.model.readData("nrRounds") > 0 && this.pause();
        },
        onAllDialogsClosed: function () {
            this.model.readData("nrRounds") > 0 && this.resume();
        },
        reduceNumberOfRounds: function () {
            this.model.playRound();
        },
        notifyNumberOfRounds: function () {
            this.fireEvent(
                "request:spinButton.updateCounter",
                this.model.readData("nrRounds")
            ),
                this.fireEvent(
                    "notify:autoPlayer.reduceCounter",
                    this.model.readData("nrRounds")
                );
        },
        onSettingChanged: function (e, t) {
            var n = this;
            "autoPlayNrSpins" === e && t !== n.model.readData("nrRounds")
                ? (n.model.storeData("nrRounds", t),
                  0 === t
                      ? n.stop()
                      : (n.fireEvent("notify:autoPlayer.enabled", t),
                        n.fireEvent("request:spinButton.showCounter", t),
                        n.fireEvent(
                            "request:spinButton.addDisplayType",
                            "autoPlay"
                        ),
                        n.fireEvent(
                            "request:spinButton.addProperty",
                            "visibleDuringRound",
                            n.MODULE_NAME
                        ),
                        n.model.setState("WAITING"),
                        n.model.storeData(
                            "startingBalance",
                            Services.moneyManager.getBalanceCents()
                        )))
                : Sys.contains(
                      [
                          "stopAutoplayIfBalanceIncreasedBy",
                          "stopAutoplayIfBalanceDecreasedBy",
                          "stopAutoplayOnAnyWin",
                          "stopAutoplayIfWinExceeds",
                      ],
                      e
                  ) && n.model.storeData(e, t);
        },
        requestRoundStart: function () {
            this.reduceNumberOfRounds(),
                this.fireEvent(
                    "notify:autoPlayer.startRound",
                    this.model.readData("nrRounds")
                ),
                Services.gameRound.start();
        },
    }),
    (Core.AutoPlayerController = Sys.extend(
        Core.Controller,
        Core.AutoPlayerController,
        "Core.AutoPlayerController"
    )),
    Sys.ns("Core"),
    (Core.AutoPlayerModel = {
        constructor: function () {
            Core.AutoPlayerModel.superclass.constructor.apply(this, arguments);
        },
        setupData: function () {
            this.storeData("nrRounds", 0),
                this.storeData("spinning", !0),
                this.storeData("startingBalance", 0),
                this.storeData("stopAutoplayIfBalanceIncreasedBy", !1),
                this.storeData("stopAutoplayIfBalanceDecreasedBy", !1),
                this.storeData("stopAutoplayOnAnyWin", !1),
                this.storeData("stopAutoplayIfWinExceeds", !1),
                this.setState("STOPPED");
        },
        playRound: function () {
            var e = this.readData("nrRounds") - 1;
            e <= 0 && ((e = 0), this.setState("STOPPING")),
                this.storeData("nrRounds", e);
        },
        storeData: function (e, t) {
            Core.AutoPlayerModel.superclass.storeData.apply(this, arguments),
                "nrRounds" === e &&
                    Services.storage.storeData("autoPlayer.roundsLeft", t);
        },
        shouldPlayAnotherRound: function () {
            return this.isState("PLAYING");
        },
        shouldStopAutoplay: function (e) {
            var t,
                n,
                s = this.readData("startingBalance"),
                i = this.readData("stopAutoplayIfBalanceIncreasedBy"),
                r = this.readData("stopAutoplayIfBalanceDecreasedBy"),
                o = this.readData("stopAutoplayOnAnyWin"),
                a = this.readData("stopAutoplayIfWinExceeds"),
                l =
                    "spin" === e.nextaction
                        ? Services.moneyManager.getBetCents()
                        : 0;
            return (
                Sys.isObj(e.wins) &&
                    ((t = e.wins.cents), (n = e.wins.centsTotal)),
                !!(i && e.credit >= s + i) ||
                    !!(r && e.credit - l < s - r) ||
                    (!0 === o && (t > 0 || n > 0)) ||
                    (a && (t >= a || n >= a))
            );
        },
        processServerResponse: function (e) {
            var t = e.gamestate || {};
            !this.isState("STOPPED") &&
                this.shouldStopAutoplay(e) &&
                this.setState("STOPPING"),
                this.storeData("isBasicState", "basic" === t.current);
        },
    }),
    (Core.AutoPlayerModel = Sys.extend(
        Core.Model,
        Core.AutoPlayerModel,
        "Core.AutoPlayerModel"
    )),
    Sys.ns("Core.Slots"),
    (Core.Slots.FreeRounds = {
        constructor: function () {
            Core.Slots.FreeRounds.superclass.constructor.apply(this, arguments);
        },
        getStateChanges: function () {
            var e = this.model;
            return {
                beforeLoaderClose: {
                    queue: [
                        function (t) {
                            Services.freeRounds.getRemaining() > 0 &&
                                !e.readData("hasShownSplash") &&
                                t.stateHandler.pushState(
                                    t.states.freeRoundsDialog
                                );
                        },
                    ],
                },
                stopped: {
                    queue: [
                        function (e) {
                            Services.freeRounds.isActive() &&
                                0 === Services.freeRounds.getRemaining() &&
                                e.stateHandler.pushState(
                                    e.states.checkForAdditionalFreeRounds
                                );
                        },
                    ],
                },
                checkForAdditionalFreeRounds: {
                    state: {
                        name: "CheckForAdditionalFreeRounds",
                        execute: function () {},
                        waitEvents: {
                            "notify:responseParser.gameConfigurationParsed": !1,
                        },
                    },
                },
                freeRoundsDialog: {
                    state: {
                        name: "FreeRoundsDialog",
                        execute: function () {},
                        waitEvents: {},
                    },
                },
            };
        },
        getDefaultMVCClasses: function () {
            return {
                model: Core.Slots.FreeRoundsModel,
                controller: Core.Slots.FreeRoundsController,
            };
        },
    }),
    (Core.Slots.FreeRounds = Sys.extend(
        Core.Module,
        Core.Slots.FreeRounds,
        "Core.Slots.FreeRounds"
    )),
    Sys.ns("Core.Slots"),
    (Core.Slots.FreeRoundsController = {
        constructor: function () {
            Core.Slots.FreeRoundsController.superclass.constructor.apply(
                this,
                arguments
            );
        },
        init: function () {
            Core.Slots.FreeRoundsController.superclass.init.apply(
                this,
                arguments
            );
        },
        setupEvents: function () {
            this.on({
                "notify:stateHandler.enteringFreeRoundsDialogState":
                    this.showEnforcedContinueDialog,
                "notify:stateHandler.enteringCheckForAdditionalFreeRoundsState":
                    this.requestGameConfiguration,
                "notify:responseParser.gameConfigurationParsed":
                    this.onGameConfigurationParsed,
                "request:freeRounds.requestGameConfiguration":
                    this.requestGameConfiguration,
            });
        },
        startFreeRounds: function () {
            (this.freeRoundsStarted = !0),
                this.addListener(
                    "notify:stateHandler.enteringIdleState",
                    this.onEnteringIdleState
                ),
                this.addListener(
                    "notify:stateHandler.leavingIdleState",
                    this.onLeavingIdleState
                ),
                this.fireEvent(
                    "request:maxBetButton.disable",
                    this.MODULE_NAME
                ),
                this.fireEvent("request:betSettings.disable", this.MODULE_NAME),
                this.fireEvent(
                    "notify:freeRounds.started",
                    Services.freeRounds.getRemaining()
                ),
                this.setFreeroundModeParameter(!0),
                this.model.storeData("hasShownSplash", !0),
                this.model.storeData(
                    "totalFreeRounds",
                    Services.freeRounds.getRemaining()
                );
        },
        endFreeRounds: function () {
            (this.freeRoundsStarted = !1),
                this.showFreeRoundsEndDialog(),
                this.removeListener("notify:stateHandler.enteringIdleState"),
                this.removeListener("notify:stateHandler.leavingIdleState"),
                this.fireEvent("request:maxBetButton.enable", this.MODULE_NAME),
                this.fireEvent("notify:freeRounds.ended");
        },
        setFreeroundModeParameter: function (e) {
            this.setExtraParameter("freeroundmode", e);
        },
        setExtraParameter: function (e, t) {
            var n = Resources.readData("extraParams");
            Sys.isObj(n) && ((n[e] = t), Resources.storeData("extraParams", n));
        },
        onEnteringIdleState: function () {
            this.requestCounterUpdate();
        },
        onLeavingIdleState: function () {
            this.notifyFreeRoundsLeft();
        },
        notifyFreeRoundsLeft: function () {
            var e = this.model.readData("totalFreeRounds"),
                t = Services.freeRounds.getRemaining();
            this.fireEvent("notify:freeRounds.nextRound", e, t);
        },
        requestGameConfiguration: function () {
            this.fireEvent("request:autoPlayer.stop"),
                this.setFreeroundModeParameter(!1),
                this.fireEvent(
                    "request:serverManager.sendAction",
                    "init",
                    "notify:responseParser.gameConfigurationParsed",
                    "notify:serverManager.reInitRequestFailed"
                );
        },
        onGameConfigurationParsed: function (e) {
            var t = this,
                n = "spin" === e.nextaction;
            (this.bonusProgramWidgetQueued = Boolean(e.freeRoundWidgetEnabled)),
                (this.bonusProgramWidgetActive = Boolean(
                    Resources.readData("bonusProgramWidgetActive")
                )),
                this.model.storeData("hasShownSplash", !1),
                Sys.isNumber(e.freeRoundsLeft) && e.freeRoundsLeft > 0
                    ? (Services.freeRounds.setFreeRoundsLeft(e.freeRoundsLeft),
                      e.isLowWinFreeRound
                          ? this.showExtraFreeRoundsDialog()
                          : this.bonusProgramWidgetActive
                          ? (this.fireEvent(
                                "notify:freeRounds.reInitResponseReceived",
                                e
                            ),
                            this.startFreeRounds(),
                            Resources.removeData("bonusProgramWidgetActive"))
                          : (this.showFreeRoundsEndDialog(function () {
                                t.showEnforcedContinueDialog(function () {
                                    t.fireEvent(
                                        "notify:freeRounds.reInitResponseReceived",
                                        e
                                    ),
                                        t.fireEvent("notify:dialogBoxClosed", {
                                            name: "freeRoundsStart",
                                            button: "continue",
                                        }),
                                        t.startFreeRounds();
                                });
                            }),
                            t.fireEvent(
                                "request:cashField.showBasicCashValues"
                            )),
                      this.requestCounterUpdate(),
                      this.notifyFreeRoundsLeft(),
                      this.setFreeroundModeParameter(!0))
                    : n
                    ? this.freeRoundsStarted && this.endFreeRounds()
                    : this.showFreeRoundsReloadDialog();
        },
        requestCounterUpdate: function () {
            Services.storage.storeData(
                "freeRounds.roundsLeft",
                Services.freeRounds.getRemaining()
            );
        },
        closeFreeRoundsDialog: function () {
            this.fireEvent("notify:freeRounds.dialogClosed"),
                this.bonusProgramWidgetQueued &&
                    (this.fireEvent(
                        "notify:bonusProgramWidget.reInit",
                        Resources.readData("gameServerInitResponse")
                    ),
                    (this.bonusProgramWidgetQueued = !1));
        },
        showExtraFreeRoundsDialog: function () {
            var e = this;
            e.requestDialog({
                title: Services.languageManager.getText(
                    Language.Keys.freeRoundsExtraTitle
                ),
                text: Services.languageManager.getText(
                    Language.Keys.freeRoundsExtraWon,
                    [Services.freeRounds.getRemaining()]
                ),
                buttons: [
                    {
                        scope: this,
                        text: Services.languageManager.getText(
                            Language.Keys.continue
                        ),
                        action: function () {
                            e.fireEvent("notify:dialogBoxClosed", {
                                name: "freeRoundsExtra",
                                button: "continue",
                            }),
                                e.closeFreeRoundsDialog();
                        },
                    },
                ],
            });
        },
        showFreeRoundsReloadDialog: function () {
            var e = this;
            e.requestDialog({
                title: Services.languageManager.getText(
                    Language.Keys.freeRoundsFinished
                ),
                text:
                    Services.languageManager.getText(
                        Language.Keys.roundsUseAcctMoney
                    ) +
                    " " +
                    Services.languageManager.getText(Language.Keys.reload),
                buttons: [
                    {
                        scope: this,
                        text: Services.languageManager.getText(
                            Language.Keys.btn_reload
                        ),
                        action: function () {
                            e.fireEvent("notify:dialogBoxClosed", {
                                name: "freeRoundsReload",
                                button: "reload",
                            }),
                                Sys.utils.reload();
                        },
                    },
                ],
            });
        },
        showFreeRoundsEndDialog: function (e) {
            var t = this;
            t.requestDialog({
                title: Services.languageManager.getText(
                    Language.Keys.freeRoundsFinished
                ),
                text: Services.languageManager.getText(
                    Language.Keys.roundsUseAcctMoney
                ),
                buttons: [
                    {
                        scope: this,
                        text: Services.languageManager.getText(
                            Language.Keys.continue
                        ),
                        action: function () {
                            e && e(),
                                t.fireEvent("notify:dialogBoxClosed", {
                                    name: "freeRoundsEnd",
                                    button: "continue",
                                }),
                                t.closeFreeRoundsDialog();
                        },
                    },
                ],
            });
        },
        showEnforcedContinueDialog: function (e) {
            var t = this;
            t.requestDialog({
                title: Services.languageManager.getText(
                    Language.Keys.roundsLeft
                ),
                text: Services.languageManager.getText(
                    Language.Keys.haveFreeRounds,
                    [Services.freeRounds.getRemaining()]
                ),
                buttons: [
                    {
                        scope: this,
                        text: Services.languageManager.getText(
                            Language.Keys.continue
                        ),
                        action:
                            e ||
                            function () {
                                t.fireEvent("notify:dialogBoxClosed", {
                                    name: "freeRoundsStart",
                                    button: "continue",
                                }),
                                    t.startFreeRounds();
                            },
                    },
                ],
            });
        },
        requestDialog: function (e) {
            Services.dialog.show(e);
        },
    }),
    (Core.Slots.FreeRoundsController = Sys.extend(
        Core.Controller,
        Core.Slots.FreeRoundsController,
        "Core.Slots.FreeRoundsController"
    )),
    Sys.ns("Core.Slots"),
    (Core.Slots.FreeRoundsModel = {
        constructor: function () {
            Core.Slots.FreeRoundsModel.superclass.constructor.apply(
                this,
                arguments
            );
        },
        setupData: function () {
            this.storeData("hasShownSplash", !1);
        },
    }),
    (Core.Slots.FreeRoundsModel = Sys.extend(
        Core.Model,
        Core.Slots.FreeRoundsModel,
        "Core.Slots.FreeRoundsModel"
    )),
    Sys.ns("Core.Slots"),
    (Core.Slots.BonusProgramWidget = {
        constructor: function () {
            Core.Slots.BonusProgramWidget.superclass.constructor.apply(
                this,
                arguments
            );
        },
        getMixinDependencies: function () {
            return ["orientation"];
        },
        getDefaultMVCClasses: function () {
            return {
                model: Core.Slots.BonusProgramWidgetModel,
                controller: Core.Slots.BonusProgramWidgetController,
                view: Core.Slots.BonusProgramWidgetView,
            };
        },
        getStateChanges: function () {
            var e = this.model,
                t = e.readData("widgetUrl"),
                n = e.readData("nextAction");
            return {
                beforeLoaderClose: {
                    queue: [
                        function (s) {
                            e.bonusProgramWidgetEnabled() &&
                                t &&
                                "spin" === n &&
                                s.stateHandler.pushState(
                                    s.states.bonusProgramWidget
                                );
                        },
                    ],
                },
                checkForAdditionalFreeRounds: {
                    waitEvents: ["notify:bonusProgramWidget.closed"],
                },
                bonusProgramWidget: {
                    state: {
                        name: "BonusProgramWidget",
                        execute: function () {},
                        waitEvents: {
                            "notify:bonusProgramWidget.closed": !1,
                            "notify:responseParser.gameConfigurationParsed": !1,
                        },
                    },
                },
            };
        },
    }),
    (Core.Slots.BonusProgramWidget = Sys.extend(
        Core.Module,
        Core.Slots.BonusProgramWidget,
        "Core.Slots.BonusProgramWidget"
    )),
    Sys.ns("Core.Slots"),
    (Core.Slots.BonusProgramWidgetModel = {
        constructor: function () {
            Core.Slots.BonusProgramWidgetModel.superclass.constructor.apply(
                this,
                arguments
            );
        },
        setupData: function () {
            var e = Resources.readData("gameServerInitResponse") || {};
            this.storeData("widgetUrl", "../../"),
                this.storeData("slowServerRequestTimeLimit", 5e3),
                this.setBonusProgramData(e);
        },
        setBonusProgramData: function (e) {
            this.storeData(
                "bonusProgramWidgetEnabled",
                Boolean(e.freeRoundWidgetEnabled)
            ),
                this.storeData(
                    "bonusProgramWidgetGameId",
                    e.freeRoundWidgetGameId
                ),
                this.storeData(
                    "bonusProgramWidgetSections",
                    e.freeRoundWidgetSections
                ),
                this.storeData("nextAction", e.nextaction);
        },
        bonusProgramWidgetEnabled: function () {
            return Boolean(this.readData("bonusProgramWidgetEnabled"));
        },
    }),
    (Core.Slots.BonusProgramWidgetModel = Sys.extend(
        Core.Model,
        Core.Slots.BonusProgramWidgetModel,
        "Core.Slots.BonusProgramWidgetModel"
    )),
    Sys.ns("Core.Slots"),
    (Core.Slots.BonusProgramWidgetController = {
        constructor: function () {
            Core.Slots.BonusProgramWidgetController.superclass.constructor.apply(
                this,
                arguments
            );
        },
        setupEvents: function () {
            this.on({
                "notify:stateHandler.enteringBonusProgramWidgetState":
                    this.initBonusProgramWidget,
                "notify:scaling.gameSizeChanged": this.onGameSizeChanged,
                "notify:bonusProgramWidget.notification":
                    this.notificationHandler,
                "notify:bonusProgramWidget.close": this.closeBonusProgramWidget,
                "notify:responseParser.gameConfigurationParsed":
                    this.checkForAdditionalFreeRounds,
                "notify:responseParser.bonusProgramWidgetValuesParsed":
                    this.onBonusProgramWidgetValuesParsed,
                "notify:bonusProgramWidget.reInit": this.reInit,
                "notify:settingsManager.settingChanged": this.onSettingChanged,
                "view:orientationChanged": this.notifyOrientation,
                "notify:viewport.scaled": this.viewportScaled,
            });
        },
        viewportScaled: function () {
            var e = this;
            Platform.isChromeForIOS &&
                window.setTimeout(function () {
                    e.view.refresh(),
                        e.notifyOrientation(Utils.Platform.getOrientation()),
                        e.onGameSizeChanged();
                }, 500);
        },
        initBonusProgramWidget: function () {
            var e,
                t = this,
                n = this.model.readData("widgetUrl"),
                s = this.model.readData("bonusProgramWidgetGameId"),
                i = Resources.readData("queryData").gameId,
                r = this.model.readData("slowServerRequestTimeLimit");
            this.view.initViewData(),
                -1 !== s.indexOf("##") &&
                    ((e = s.split("##")[1]),
                    (s = s.split("##")[0]),
                    this.model.storeData("bonusProgramWidgetTheme", e)),
                this.fetchWidgetVariants(n, s, r, function (r) {
                    var o;
                    if (!r) return void t.closeBonusProgramWidget();
                    (o = t.parseVariantsResponse(r, n, s, e, i)),
                        t.startBonusProgramWidget(o);
                });
        },
        fetchWidgetVariants: function (e, t, n, s) {
            var i = this.getWidgetLocationByWidgetID(t),
                r = Sys.utils.httpGet({
                    url: e + i + "/variants.json",
                }),
                o = setTimeout(function () {
                    s(!1);
                }, n);
            r.done(function (e) {
                s(e);
            })
                .fail(function (e) {
                    s(!1);
                })
                .always(function () {
                    clearTimeout(o);
                });
        },
        getWidgetLocationByWidgetID: function (e) {
            return "default_w" === e || "game_branded_w" === e
                ? "free_rounds_widget"
                : e;
        },
        parseVariantsResponse: function (e, t, n, s, i) {
            var r, o;
            try {
                return (
                    (r = JSON.parse(e.response)),
                    (o = s ? r[s] : r[i]),
                    t + this.getWidgetLocationByWidgetID(n) + (o || r.default)
                );
            } catch (e) {
                return !1;
            }
        },
        startBonusProgramWidget: function (e) {
            e
                ? (this.view.loadIframePage(e),
                  this.disableSettingsButton(),
                  Resources.storeData("bonusProgramWidgetActive", !0))
                : this.closeBonusProgramWidget();
        },
        reInit: function (e) {
            this.model.setBonusProgramData(e),
                this.model.bonusProgramWidgetEnabled() &&
                    this.initBonusProgramWidget();
        },
        sendMessage: function (e, t, n) {
            var s = document.getElementById("bonusProgramWidgetIframe");
            s &&
                s.contentWindow.postMessage(
                    {
                        moduleId: "bonusProgramWidget",
                        action: e,
                        data: t || null,
                        dataRoute: n || null,
                    },
                    "*"
                );
        },
        notificationHandler: function (e) {
            var t, n, s;
            switch (e.action) {
                case "widgetReady":
                    this.notifyOrientation(Utils.Platform.getOrientation()),
                        (t = Resources.readData("language")),
                        (s = Resources.readData("queryData")),
                        (n = t.lang || t.defaultLang),
                        this.notifyLanguage(n),
                        this.sendMessage(
                            "soundSettingChange",
                            Services.gameSettings.getSetting("volume")
                        ),
                        this.sendMessage("defaultValues", {
                            operatorId: s.operatorId,
                            gameId: s.gameId,
                            theme: this.model.readData(
                                "bonusProgramWidgetTheme"
                            ),
                        });
                    break;
                case "getTextStrings":
                    this.getTextStrings(e.data, e.dataRoute);
                    break;
                case "roundStarted":
                    this.roundStarted();
                    break;
                case "resumeNormalGameplay":
                    this.resumeNormalGameplay();
                    break;
                case "playFreeRoundsNow":
                    this.playFreeRoundsNow();
                    break;
                case "getSectionValues":
                    this.sendMessage(
                        "populateSectionValues",
                        this.model.readData("bonusProgramWidgetSections")
                    );
                    break;
                default:
                    this.sendMessage("actionNotSupported");
            }
        },
        getTextStrings: function (e, t) {
            var n,
                s = {};
            Sys.iterate(e, function (e, t) {
                (n =
                    Sys.isArray(t) && t.length > 0
                        ? Services.languageManager.getText(e, t)
                        : Services.languageManager.getText(e)) && (s[e] = n);
            }),
                this.sendMessage("populateTextStrings", s, t);
        },
        roundStarted: function () {
            this.requestWidgetAction();
        },
        requestWidgetAction: function () {
            this.fireEvent(
                "request:serverManager.sendAction",
                "widgetspin",
                "notify:responseParser.bonusProgramWidgetValuesParsed"
            );
        },
        checkForAdditionalFreeRounds: function (e) {
            e.freeRoundWidgetEnabled ||
                this.fireEvent("notify:bonusProgramWidget.closed");
        },
        onBonusProgramWidgetValuesParsed: function (e) {
            this.sendMessage("processRoundOutcome", {
                indexToShow: e.indexToShow,
            });
        },
        resumeNormalGameplay: function () {
            this.closeBonusProgramWidget();
        },
        playFreeRoundsNow: function () {
            this.closeBonusProgramWidget(),
                this.fireEvent("request:freeRounds.requestGameConfiguration");
        },
        closeBonusProgramWidget: function () {
            this.view.closeIframePage(),
                this.fireEvent("notify:bonusProgramWidget.closed"),
                this.enableSettingsButton();
        },
        enableSettingsButton: function () {
            this.fireEvent("request:settingsButton.enable");
        },
        disableSettingsButton: function () {
            this.fireEvent("request:settingsButton.disable");
        },
        notifyOrientation: function (e) {
            this.sendMessage("updateOrientation", {
                orientation: e,
            });
        },
        notifyLanguage: function (e) {
            this.sendMessage("updateLanguage", {
                lang: e,
            });
        },
        onGameSizeChanged: function () {
            var e;
            "function" == typeof this.view.refresh &&
                (this.model.storeData("gameSizeChangedTriggered", !0),
                this.view.refresh(),
                (e = function () {
                    this.notifyOrientation(Utils.Platform.getOrientation());
                }),
                window.requestAnimationFrame(e.bind(this)));
        },
        onSettingChanged: function (e, t) {
            "volume" === e && this.sendMessage("soundSettingChange", t);
        },
    }),
    (Core.Slots.BonusProgramWidgetController = Sys.extend(
        Core.Controller,
        Core.Slots.BonusProgramWidgetController,
        "Core.Slots.BonusProgramWidgetController"
    )),
    Sys.ns("Core.Slots"),
    (Core.Slots.BonusProgramWidgetView = {
        PARENT_CONTAINER_ID: "viewport",
        viewElements: {},
        bonusProgramWidgetIframeId: "bonusProgramWidgetIframe",
        constructor: function () {
            Core.Slots.BonusProgramWidgetView.superclass.constructor.apply(
                this,
                arguments
            );
        },
        initViewData: function () {
            var e, t, n;
            (t = document.createElement("div")),
                (n = document.createElement("div")),
                t.appendChild(n),
                (e = document.getElementById(this.PARENT_CONTAINER_ID)),
                t.setAttribute("id", "bonusProgramWidgetContainer"),
                n.setAttribute("id", "bonusProgramWidgetOverlay"),
                e.appendChild(t),
                (this.viewElements = {
                    mainContainer: t,
                    overlay: n,
                }),
                this.refresh();
        },
        adaptToOrientation: function (e) {
            this.model.readData("gameSizeChangedTriggered") ||
                (this.fireEvent("view:orientationChanged", e), this.refresh());
        },
        refresh: function () {
            void 0 !== this.viewElements.mainContainer &&
                "mobile" === Environment.getCurrentPlatform() &&
                this.setIframeContainerHeight(),
                this.viewElements.iframe &&
                    ((this.viewElements.iframe.style.width = "100%"),
                    (this.viewElements.iframe.style.height = "100%"));
        },
        setIframeContainerHeight: function () {
            var e = Sys.utils.toInt(
                Environment.determineResolution().resolution.height +
                    (Platform.isTabletDevice
                        ? 0
                        : Environment.getSpaceBelowGame())
            );
            this.viewElements.mainContainer.style.height = e + "px";
        },
        loadIframePage: function (e) {
            this.removeIframeInstance(), this.createIframeInstance(e);
        },
        createIframeInstance: function (e) {
            var t = document.createElement("iframe");
            t.setAttribute("id", this.bonusProgramWidgetIframeId),
                t.setAttribute("scrolling", "no"),
                t.setAttribute("allowtransparency", "true"),
                t.setAttribute("src", e),
                t.setAttribute("style", "width: 100%; height: 100%"),
                (t.onload = this.refresh.bind(this)),
                this.viewElements.mainContainer.appendChild(t),
                (this.viewElements.iframe = t);
        },
        removeIframeInstance: function () {
            var e = document.getElementById(this.bonusProgramWidgetIframeId);
            e &&
                (e.parentNode.removeChild(e),
                (this.viewElements.iframe = null));
        },
        closeIframePage: function () {
            var e = this.viewElements.mainContainer;
            e.parentNode.removeChild(e);
        },
    }),
    (Core.Slots.BonusProgramWidgetView = Sys.extend(
        Core.View,
        Core.Slots.BonusProgramWidgetView,
        "Core.Slots.BonusProgramWidgetView"
    )),
    Sys.ns("Core.Slots"),
    (Core.Slots.ServerManager = {
        constructor: function () {
            Core.Slots.ServerManager.superclass.constructor.apply(
                this,
                arguments
            );
        },
        getStateChanges: function () {
            return {
                spinning: {
                    queue: [
                        function (e) {
                            e.stateHandler.pushState(
                                e.states.processServerResponse
                            );
                        },
                    ],
                },
                processServerResponse: {
                    state: {
                        name: "ProcessServerResponse",
                        execute: function (e) {},
                        waitEvents: {},
                    },
                },
            };
        },
        getDefaultMVCClasses: function () {
            return {
                model: Core.Slots.ServerManagerModel,
                view: Core.View,
                controller: Core.Slots.ServerManagerController,
            };
        },
    }),
    (Core.Slots.ServerManager = Sys.extend(
        Core.Module,
        Core.Slots.ServerManager,
        "Core.Slots.ServerManager"
    )),
    Sys.ns("Core.Slots"),
    (Core.Slots.ServerManagerController = {
        constructor: function () {
            Core.Slots.ServerManagerController.superclass.constructor.apply(
                this,
                arguments
            );
        },
        setupEvents: function () {
            var e = this;
            Core.Slots.ServerManagerController.superclass.setupEvents.apply(
                this,
                arguments
            ),
                e.on({
                    "notify:responseParser.responseParsed": e.storeNextAction,
                    "notify:settingsManager.settingChanged":
                        e.onSettingsChanged,
                });
        },
        onSettingsChanged: function (e, t) {
            ("betLevel" !== e && "denomination" !== e && "betLines" !== e) ||
                this.model.storeData("parameters:" + e, t);
        },
        sendAction: function (e, t) {
            (e = "nextAction" === e ? this.model.readData("nextAction") : e),
                Core.Slots.ServerManagerController.superclass.sendAction.call(
                    this,
                    e,
                    t
                );
        },
        storeNextAction: function (e) {
            this.model.storeData("nextAction", e.nextaction);
        },
    }),
    (Core.Slots.ServerManagerController = Sys.extend(
        Core.ServerManagerController,
        Core.Slots.ServerManagerController,
        "Core.Slots.ServerManagerController"
    )),
    Sys.ns("Core.Slots"),
    (Core.Slots.ServerManagerModel = {
        constructor: function () {
            Core.Slots.ServerManagerModel.superclass.constructor.apply(
                this,
                arguments
            );
        },
        setupData: function () {
            var e,
                t,
                n,
                s = this;
            Core.Slots.ServerManagerModel.superclass.setupData.apply(
                s,
                arguments
            ),
                (e = Resources.readData("gameServerInitResponse")),
                (t = e["bl.standard"].split(",").length),
                (n = "0-" + (t - 1).toString()),
                s.storeData("parameters:betLines", n),
                s.storeData("nextAction", e.nextaction);
        },
        getActionParameters: function (e) {
            var t = this.getBaseParameters(e);
            switch (((t += this.getFreeroundsParameters()), e)) {
                case "init":
                    return t + this.getInitParameters();
                case "jmxinit":
                    return t + this.getJMXInitParameters();
                case "paytable":
                    return t + this.getPaytableParameters();
                case "spin":
                    return t + this.getSpinParameters();
                case "initfreespin":
                    return t + this.getInitFreespinParameters();
                case "respin":
                case "freespin":
                    return t + this.getFreespinParameters();
                case "widgetspin":
                    return t + this.getWidgetspinParameters();
                case "initbonus":
                    return t + this.getInitBonusParameters();
                case "bonusaction":
                    return t + this.getBonusActionParameters();
                default:
                    return t;
            }
        },
        getBaseParameters: function (e) {
            return (
                "action=" +
                e +
                "&sessid=" +
                this.readData("parameter:sessionID") +
                "&gameId=" +
                this.readData("parameter:gameID") +
                "&wantsreels=true"
            );
        },
        getFreeroundsParameters: function () {
            var e = Resources.readData("extraParams");
            return (
                "&wantsfreerounds=" +
                e.wantsfreerounds +
                "&freeroundmode=" +
                e.freeroundmode
            );
        },
        getInitParameters: function () {
            return "";
        },
        getJMXInitParameters: function () {
            return this.getInitParameters();
        },
        getPaytableParameters: function () {
            return "";
        },
        getSpinParameters: function () {
            var e = this,
                t =
                    "&bet.betlevel=" +
                    e.readData("parameters:betLevel") +
                    "&bet.denomination=" +
                    e.readData("parameters:denomination") +
                    "&bet.betlines=" +
                    e.readData("parameters:betLines"),
                n = e.readData("parameter:jmx");
            return n && (t += "&" + n), t;
        },
        getInitFreespinParameters: function () {
            return this.getInitParameters();
        },
        getFreespinParameters: function () {
            var e = this.getInitParameters(),
                t = this.readData("parameter:jmx");
            return t && (e += "&" + t), e;
        },
        getInitBonusParameters: function () {
            var e = "&bonusid=" + this.readData("parameter:bonusid"),
                t = this.readData("parameter:jmx");
            return t && (e += "&" + t), e;
        },
        getBonusActionParameters: function () {
            var e = "",
                t = this.readData("parameter:bonusactiontype"),
                n = this.readData("parameter:jmx");
            return t && (e += "&bonusactiontype=" + t), n && (e += "&" + n), e;
        },
        getWidgetspinParameters: function () {
            return (
                "&bonusProgramId=" +
                Resources.readData("gameServerInitResponse").bonusProgramId
            );
        },
    }),
    (Core.Slots.ServerManagerModel = Sys.extend(
        Core.ServerManagerModel,
        Core.Slots.ServerManagerModel,
        "Core.Slots.ServerManagerModel"
    )),
    Sys.ns("Core"),
    (Core.ResponseParser = {
        constructor: function () {
            Core.ResponseParser.superclass.constructor.apply(this, arguments);
        },
        getDefaultMVCClasses: function () {
            return {
                controller: Core.ResponseParserController,
            };
        },
    }),
    (Core.ResponseParser = Sys.extend(
        Core.Module,
        Core.ResponseParser,
        "Core.ResponseParser"
    )),
    Sys.ns("Core"),
    (Core.ResponseParserController = {
        constructor: function () {
            Core.ResponseParserController.superclass.constructor.apply(
                this,
                arguments
            );
        },
        init: function () {
            var e = Resources.readData("unParsedGameServerInitResponse") || "";
            Core.ResponseParserController.superclass.init.apply(
                this,
                arguments
            ),
                this.doIntegrationSpecificResponseHandling(
                    this.parseServerResponse(e)
                );
        },
        setupEvents: function () {
            this.on({
                "notify:serverManager.serverResponseReceived":
                    this.parseAndBroadcastServerResponse,
            });
        },
        parseAndBroadcastServerResponse: function (e, t) {
            var n = Sys.isDefined(t)
                    ? t
                    : "notify:responseParser.responseParsed",
                s = this.doIntegrationSpecificResponseHandling(
                    this.parseServerResponse(e.responseText)
                );
            0 === e.responseText.trim().length
                ? this.fireEvent("request:errorManager.handleError")
                : Object.keys(s).length > 1 && this.fireEvent(n, s, e);
        },
        parseServerResponse: function (e) {
            return Sys.utils.parseQueryString(e, !0);
        },
        doIntegrationSpecificResponseHandling: function (e) {
            return e;
        },
    }),
    (Core.ResponseParserController = Sys.extend(
        Core.Controller,
        Core.ResponseParserController,
        "Core.ResponseParserController"
    )),
    Sys.ns("Core.Slots"),
    (Core.Slots.ResponseParser = {
        constructor: function () {
            Core.Slots.ResponseParser.superclass.constructor.apply(
                this,
                arguments
            );
        },
        getDefaultMVCClasses: function () {
            return {
                model: Core.Model,
                view: Core.View,
                controller: Core.Slots.ResponseParserController,
            };
        },
    }),
    (Core.Slots.ResponseParser = Sys.extend(
        Core.ResponseParser,
        Core.Slots.ResponseParser,
        "Core.Slots.ResponseParser"
    )),
    Sys.ns("Core.Slots"),
    (Core.Slots.ResponseParserController = {
        constructor: function () {
            Core.Slots.ResponseParserController.superclass.constructor.apply(
                this,
                arguments
            );
        },
        parseServerResponse: function (e) {
            var t,
                n = this,
                s =
                    Core.Slots.ResponseParserController.superclass.parseServerResponse.call(
                        n,
                        e
                    ),
                i = Resources.readData("config");
            return (
                s.gamestate && (s.currentGameState = n.getCurrentGameState(s)),
                s.rs
                    ? ((s.rs = this.sortReelSets(s.rs, i.expectedReelSetOrder)),
                      (t = this.parseReelInfo(s)),
                      (s.reelInfo = t),
                      (s.nearWinList = this.parseNearWin(s)),
                      s.ws
                          ? ((s.wins = n.parseWinSituations(s, t)),
                            (s.wins.winType = n.setWinType(
                                s.wins.coins,
                                Services.moneyManager.getBetCoins()
                            )),
                            (s.wins.centsTotal = s.totalwin.cents),
                            (s.wins.coinsTotal = s.totalwin.coins))
                          : Sys.isDefined(s.totalwin) &&
                            (s.wins = {
                                centsTotal: s.totalwin.cents,
                                coinsTotal: s.totalwin.coins,
                            }))
                    : Sys.isDefined(s.totalwin) &&
                      (s.wins = {
                          centsTotal: s.totalwin.cents,
                          coinsTotal: s.totalwin.coins,
                      }),
                s
            );
        },
        sortReelSets: function (e, t) {
            return Object.keys(e)
                .map(function (t) {
                    return e[t];
                })
                .sort(function (e, n) {
                    if (t) {
                        if (-1 === t.indexOf(e.id) || -1 === t.indexOf(n.id))
                            throw new Error("Missing order of item.");
                        return t.indexOf(e.id) > t.indexOf(n.id) ? 1 : -1;
                    }
                    return e.id > n.id ? 1 : -1;
                })
                .reduce(function (e, t, n) {
                    return (e["i" + n] = t), e;
                }, {});
        },
        getCurrentGameState: function (e) {
            var t = this,
                n = t.model.readData("currentServerGameState");
            return (
                e.gamestate.current
                    ? t.model.storeData(
                          "currentServerGameState",
                          e.gamestate.current
                      )
                    : t.model.storeData("currentServerGameState", e.gamestate),
                n ||
                    ("basic" ===
                        (n = t.model.readData("currentServerGameState")) &&
                        t.fireEvent(
                            "request:playModeManager.addMode",
                            "basic"
                        )),
                n
            );
        },
        parseNearWin: function (e) {
            var t;
            if (Sys.isDefined(e.rs.i0)) {
                if (((t = e.rs.i0.nearwin), Sys.isArray(t))) return t;
                if (Sys.isNumber(t)) return [t];
            }
        },
        setWinType: function (e, t) {
            var n = Resources.readData("config"),
                s = n.winTypes,
                i = "";
            return (
                e > 0 &&
                    (e >= t * s.smallWin.from && e < t * s.smallWin.to
                        ? (i = "smallWin")
                        : e >= t * s.mediumWin.from && e < t * s.mediumWin.to
                        ? (i = "mediumWin")
                        : e >= t * s.largeWin.from && e < t * s.largeWin.to
                        ? (i = "largeWin")
                        : e >= t * s.bigWin.from && (i = "bigWin")),
                i
            );
        },
        parseReelInfo: function (e) {
            return Sys.utils.parseReelInfo(e);
        },
        parseWinSituations: function (e, t) {
            var n,
                s = 0,
                i = [];
            if (e.ws) for (; e.ws["i" + s]; ) i.push(e.ws["i" + s]), s++;
            return (
                (n = this.parseWinLayouts(i, t)),
                this.doGameSpecificWinSituationParsing(n, i),
                n
            );
        },
        parseWinLayouts: function (e, t) {
            var n,
                s,
                i,
                r,
                o = [],
                a = 0,
                l = 0,
                u = 0;
            for (n = 0; n < e.length; n++) {
                if (
                    (o.push({
                        betline: Sys.isNumber(e[n].betline)
                            ? e[n].betline + 1
                            : void 0,
                        positions: [],
                        reelset: e[n].reelset,
                        wins: {},
                    }),
                    Sys.isDefined(e[n].pos))
                ) {
                    for (s = 0; Sys.isDefined(e[n].pos["i" + s]); s++)
                        (r = {}),
                            (r.reelIndex = e[n].pos["i" + s][0]),
                            (r.symbolIndex = e[n].pos["i" + s][1]),
                            (r = Sys.apply(
                                r,
                                t[r.reelIndex].symbols[r.symbolIndex]
                            )),
                            o[n].positions.push(r);
                    o[n].positions.sort(this.sortSymbols);
                }
                for (
                    i = 0;
                    Sys.isDefined(e[n].types["i" + i]) &&
                    Sys.isDefined(e[n].types["i" + i].wintype);
                    i++
                )
                    (o[n].wins.type = e[n].types["i" + i].wintype),
                        "coins" === e[n].types["i" + i].wintype
                            ? ((o[n].wins.coins = e[n].types["i" + i].coins),
                              (o[n].wins.cents = e[n].types["i" + i].cents),
                              (a += e[n].types["i" + i].coins),
                              (l += e[n].types["i" + i].cents))
                            : "freespins" === e[n].types["i" + i].wintype &&
                              ((o[n].wins.freespins =
                                  e[n].types["i" + i].freespins),
                              (u += e[n].types["i" + i].freespins));
            }
            return (
                o.sort(this.sortWinSituations),
                {
                    winSituations: o,
                    coins: a,
                    cents: l,
                    freespins: u,
                }
            );
        },
        sortSymbols: function (e, t) {
            return e.reelIndex - t.reelIndex;
        },
        sortWinSituations: function (e, t) {
            return e.wins.coins
                ? t.wins.coins
                    ? t.wins.coins - e.wins.coins
                    : -1
                : t.wins.coins
                ? 1
                : t.wins.freespins - e.wins.freespins;
        },
        doGameSpecificWinSituationParsing: function (e, t) {},
    }),
    (Core.Slots.ResponseParserController = Sys.extend(
        Core.ResponseParserController,
        Core.Slots.ResponseParserController,
        "Core.Slots.ResponseParserController"
    )),
    Sys.ns("Core"),
    (Core.G4 = {
        constructor: function () {
            Core.G4.superclass.constructor.apply(this, arguments);
        },
        getDefaultMVCClasses: function () {
            return {
                model: Core.G4Model,
                view: Core.View,
                controller: Core.G4Controller,
            };
        },
        getStateChanges: function () {
            var e = this.model;
            return {
                minimumRoundTimeEnforcement: {
                    state: {
                        name: "MinimumRoundTimeEnforcement",
                        execute: function (e) {},
                        waitEvents: {
                            "notify:g4.minimumRoundTimePassed": !1,
                        },
                    },
                },
                stopped: {
                    queue: [
                        function (t) {
                            e.isEnforcementRequired() &&
                                e.isNewRound() &&
                                t.stateHandler.pushState(
                                    t.states.minimumRoundTimeEnforcement
                                );
                        },
                    ],
                },
            };
        },
    }),
    (Core.G4 = Sys.extend(Core.Module, Core.G4, "Core.G4")),
    Sys.ns("Core"),
    (Core.G4Model = {
        constructor: function () {
            Core.G4Model.superclass.constructor.apply(this, arguments);
        },
        setupData: function () {
            var e = Resources.readData("gameServerInitResponseObject") || {};
            this.storeData("isG4", e.g4mode),
                this.storeData("isNewRound", !1),
                this.storeData("disabledDuringRound", !1),
                e.g4mode
                    ? (this.storeData("g4RoundTimeLimit", 3e3),
                      this.storeData("g4QuickSpinActive", !1),
                      this.storeData("g4QuickSpinAvailable", !1),
                      this.storeData("g4QuickStopAvailable", !1),
                      this.storeData("g4ClockRequired", !0))
                    : this.isG4PropertyDefined() &&
                      (this.storeData(
                          "g4RoundTimeLimit",
                          e.config.gameParameters.minimumRoundDuration
                      ),
                      this.storeData(
                          "g4QuickSpinActive",
                          e.config.gameParameters.quickSpinActive
                      ),
                      this.storeData(
                          "g4QuickSpinAvailable",
                          e.config.gameParameters.quickSpinAvailable
                      ),
                      this.storeData(
                          "g4QuickStopAvailable",
                          e.config.gameParameters.quickStopAvailable
                      ),
                      this.storeData(
                          "g4ClockRequired",
                          e.config.gameParameters.clockRequired
                      )),
                this.storeData("G4Config", this.setupConfig());
        },
        setupConfig: function () {
            var e = this;
            return {
                minGameRoundDuration: e.readData("g4RoundTimeLimit"),
                settings: [
                    {
                        name: "quickSpin",
                        enabled: e.readData("g4QuickSpinAvailable"),
                        offValue: !1,
                    },
                ],
                modules: [
                    {
                        name: "systemClock",
                        enabled: e.readData("g4ClockRequired"),
                    },
                    {
                        name: "quickStopper",
                        enabled: e.readData("g4QuickStopAvailable"),
                    },
                ],
            };
        },
        isEnforcementRequired: function () {
            var e = this;
            return (
                e.readData("isG4") ||
                !(void 0 === e.readData("g4RoundTimeLimit"))
            );
        },
        isG4PropertyDefined: function () {
            var e = Resources.readData("gameServerInitResponseObject") || {};
            return (
                void 0 !== e.config &&
                void 0 !== e.config.gameParameters &&
                !(
                    void 0 === e.config.gameParameters.quickSpinAvailable &&
                    void 0 === e.config.gameParameters.quickStopAvailable &&
                    void 0 === e.config.gameParameters.clockRequired &&
                    void 0 === e.config.gameParameters.minimumRoundDuration
                )
            );
        },
        getMinimumTimeLeft: function () {
            var e =
                    this.getRoundStartTime() +
                    this.readData("g4RoundTimeLimit"),
                t = e - Date.now();
            return t > 0 ? t : 0;
        },
        isNewRound: function () {
            return this.readData("isNewRound");
        },
        setRoundStartTime: function () {
            var e = Date.now();
            this.storeData("roundStartTime", e);
        },
        getRoundStartTime: function () {
            return this.readData("roundStartTime");
        },
        getG4Config: function (e) {
            var t = this.readData("G4Config");
            if (t.hasOwnProperty(e)) return t[e];
        },
    }),
    (Core.G4Model = Sys.extend(Core.Model, Core.G4Model, "Core.G4Model")),
    Sys.ns("Core"),
    (Core.G4DesktopModel = {
        constructor: function () {
            Core.G4DesktopModel.superclass.constructor.apply(this, arguments);
        },
        setupData: function () {
            Core.G4DesktopModel.superclass.setupData.apply(this, arguments),
                this.storeData("disabledDuringRound", !0);
        },
    }),
    (Core.G4DesktopModel = Sys.extend(
        Core.G4Model,
        Core.G4DesktopModel,
        "Core.G4DesktopModel"
    )),
    Sys.ns("Core"),
    (Core.G4Controller = {
        constructor: function () {
            Core.G4Controller.superclass.constructor.apply(this, arguments);
        },
        setupEvents: function () {
            var e = this;
            e.on({
                "notify:stateHandler.enteringBeforeLoaderCloseState":
                    e.initG4IfActive,
                "notify:stateHandler.enteringMinimumRoundTimeEnforcementState":
                    e.minimumRoundTimeEnforcement,
                "notify:stateHandler.enteringSpinningState": e.onStartSpin,
            });
        },
        initG4IfActive: function () {
            var e,
                t = this;
            (t.model.readData("isG4") || t.model.isG4PropertyDefined()) &&
                ((e = t.model.readData("G4Config")),
                t.requestModuleChanges(e.modules),
                t.requestSettingChanges(e.settings),
                t.model.readData("disabledDuringRound") &&
                    t.fireEvent(
                        "request:spinButton.addProperty",
                        "disabledDuringRound",
                        t.MODULE_NAME
                    ));
        },
        minimumRoundTimeEnforcement: function () {
            var e,
                t,
                n,
                s = this;
            s.model.isNewRound() &&
                ((n = s.model.getMinimumTimeLeft()),
                (t = s.model.readData("roundExtensionTimer")),
                n > 0
                    ? (Sys.isDefined(t) && clearTimeout(t),
                      (e = setTimeout(function () {
                          s.fireEvent("notify:g4.minimumRoundTimePassed");
                      }, n)),
                      s.model.storeData("roundExtensionTimer", e))
                    : s.fireEvent("notify:g4.minimumRoundTimePassed"));
        },
        onStartSpin: function () {
            this.model.storeData("isNewRound", !0),
                this.model.setRoundStartTime();
        },
        requestSettingChanges: function (e) {
            var t = this;
            Sys.each(e, function (e) {
                void 0 !== e.enabled &&
                    (e.enabled
                        ? t.dispatchRequestEnableSettingEvent(e.name)
                        : e.enabled ||
                          t.dispatchRequestDisableSettingEvent(
                              e.name,
                              e.offValue
                          ));
            });
        },
        requestModuleChanges: function (e) {
            var t = this;
            Sys.each(e, function (e) {
                void 0 !== e.enabled &&
                    (e.enabled
                        ? t.dispatchRequestEnableModuleEvent(e.name)
                        : e.enabled ||
                          t.dispatchRequestDisableModuleEvent(e.name));
            });
        },
        dispatchRequestDisableSettingEvent: function (e, t) {
            var n = this;
            Sys.isDefined(t) &&
                n.fireEvent("request:settingsManager.storeValue", e, t),
                n.fireEvent("request:settingsManager.disableSetting", e),
                n.fireEvent(
                    "request:settingsManager.lockSetting",
                    e,
                    n.MODULE_NAME
                );
        },
        dispatchRequestEnableSettingEvent: function (e, t) {
            this.fireEvent("request:settingsManager.enableSetting", e);
        },
        dispatchRequestDisableModuleEvent: function (e) {
            this.fireEvent("request:" + e + ".disableInMode", "g4");
        },
        dispatchRequestEnableModuleEvent: function (e) {
            this.fireEvent("request:" + e + ".enableInMode", "g4");
        },
    }),
    (Core.G4Controller = Sys.extend(
        Core.Controller,
        Core.G4Controller,
        "Core.G4Controller"
    )),
    Sys.ns("Core"),
    (Core.PlayModeManager = {
        constructor: function () {
            Core.PlayModeManager.superclass.constructor.apply(this, arguments);
        },
        getDefaultMVCClasses: function () {
            return {
                model: Core.PlayModeManagerModel,
                controller: Core.PlayModeManagerController,
            };
        },
    }),
    (Core.PlayModeManager = Sys.extend(
        Core.Module,
        Core.PlayModeManager,
        "Core.PlayModeManager"
    )),
    Sys.ns("Core"),
    (Core.PlayModeManagerController = {
        USE_LOGGING: !1,
        constructor: function () {
            Core.PlayModeManagerController.superclass.constructor.apply(
                this,
                arguments
            );
        },
        setupEvents: function () {
            var e = this;
            e.on({
                "request:playModeManager.addMode": e.addMode,
                "request:playModeManager.removeMode": e.removeMode,
            });
        },
        addMode: function (e) {
            this.model.addMode(e);
        },
        removeMode: function (e) {
            this.model.removeMode(e);
        },
    }),
    (Core.PlayModeManagerController = Sys.extend(
        Core.Controller,
        Core.PlayModeManagerController,
        "Core.PlayModeManagerController"
    )),
    Sys.ns("Core"),
    (Core.PlayModeManagerModel = {
        constructor: function () {
            Core.PlayModeManagerModel.superclass.constructor.apply(
                this,
                arguments
            );
        },
        addMode: function (e) {
            var t = this.readData("modes");
            -1 === t.indexOf(e) && (t.push(e), this.storeModeString());
        },
        removeMode: function (e) {
            var t = this.readData("modes"),
                n = t.indexOf(e);
            n >= 0 && (t.splice(n, 1), this.storeModeString());
        },
        getModeString: function () {
            var e,
                t = this.readData("modes"),
                n = t.length,
                s = "";
            for (e = -1; ++e < n; ) s += (e > 0 ? "," : "") + t[e];
            return s;
        },
        setupData: function () {
            this.storeData("modes", []), this.storeModeString();
        },
        storeModeString: function () {
            Services.storage.storeData(
                this.MODULE_NAME + ".modes",
                this.getModeString()
            );
        },
    }),
    (Core.PlayModeManagerModel = Sys.extend(
        Core.Model,
        Core.PlayModeManagerModel,
        "Core.PlayModeManagerModel"
    ));
Sys.ns("Interface.utils"),
    (Interface.utils.InteractiveContainer = {
        DEFAULT_BUTTON_TEXT: "Add Value",
        CSS: {
            base: "interface-interactiveContainer_base",
            disabled: "interface-interactiveContainer_disabled",
            label: "interface-interactiveContainer_label",
            button_wrapper: "interface-interactiveContainer_buttonWrapper",
            button: "interface-interactiveContainer_button",
        },
        constructor: function (t) {
            Interface.utils.InteractiveContainer.superclass.constructor.apply(
                this,
                arguments
            );
        },
        init: function (t) {
            var e = this;
            (t = t || {}),
                (e.title = t.title),
                (e.callback = t.callback),
                (e.minValue = t.minValue),
                (e.info = t.info || ""),
                (e.buttonText = t.buttonText || e.DEFAULT_BUTTON_TEXT),
                (e.callback = t.callback || function () {}),
                (e.keyboardResult = {}),
                Interface.utils.InteractiveContainer.superclass.init.apply(
                    e,
                    arguments
                );
        },
        setMinValue: function (t) {
            this.minValue = t;
        },
        setupContainer: function (t) {
            var e = this;
            (e.container = new Sys.Element({
                id: e.id,
                tag: "div",
                cls: t.cls + " " + e.CSS.base,
            })),
                e.title &&
                    (e.label = e.container.add(
                        new Sys.Element({
                            id: e.id + "_title",
                            tag: "div",
                            cls: e.CSS.label,
                            textContent: e.title,
                        })
                    )),
                (e.buttonWrapper = e.container.add(
                    new Sys.Element({
                        id: e.id + "_button_wrapper",
                        tag: "div",
                        cls: e.CSS.button_wrapper,
                    })
                )),
                (e.addButton = e.buttonWrapper.add(
                    new Sys.Element({
                        id: e.id + "_button",
                        tag: "div",
                        cls: String(e.CSS.button),
                        textContent: e.buttonText,
                    })
                ));
        },
        setValue: function (t, e) {
            var n,
                a = this;
            Sys.isNumber(t) &&
                ((n = {
                    formattedInputField: Services.money.format(
                        Sys.utils.toInt(t),
                        {
                            decimals: 0,
                            useCurrencySign: !0,
                        }
                    ),
                    input: String(Sys.utils.toInt(t / 100)),
                    value: Sys.utils.toInt(t / 100),
                    cents: t,
                }),
                !0 !== e
                    ? a.keyboardCallback(n)
                    : ((a.keyboardResult = n), a.updateButtonText()));
        },
        onUserInputStart: function (t) {
            this.wasInitialInputTarget =
                Sys.UserInputUtils.isCoordinateTarget(
                    this.buttonWrapper.el,
                    t
                ) && this.enabled;
        },
        onUserInputEnd: function (t) {
            var e = this;
            Sys.UserInputUtils.isCoordinateTarget(e.buttonWrapper.el, t) &&
                e.wasInitialInputTarget &&
                e.requestKeyboard(),
                (e.wasInitialInputTarget = !1);
        },
        click: function () {
            this.requestKeyboard();
        },
        requestKeyboard: function () {
            var t = this;
            t.fireEvent("request:keyboard.open", {
                info: t.info,
                label: t.title,
                okCallback: t.keyboardCallback.bind(t),
                cancelCallback: t.keyboardCallback.bind(t),
                minValue: t.minValue,
            });
        },
        keyboardCallback: function (t) {
            var e = this;
            Sys.isDefined(t) && (e.keyboardResult = t),
                e.updateButtonText(),
                e.callback(e.keyboardResult.cents || 0);
        },
        updateButtonText: function () {
            var t = this,
                e = t.addButton;
            t.keyboardResult.value > 0
                ? ((e.el.textContent = t.keyboardResult.formattedInput),
                  e.addCSSClass("interactive_pushed"))
                : ((e.el.textContent = t.buttonText),
                  e.removeCSSClass("interactive_pushed"));
        },
    }),
    (Interface.utils.InteractiveContainer = Sys.extend(
        Interface.utils.UserInputBase,
        Interface.utils.InteractiveContainer,
        "Interface.utils.InteractiveContainer"
    ));
Loader.ResourceHandler &&
    Sys.apply(Loader.ResourceHandler.prototype, {
        addPlatformSpecificResourcesToGenericList: function () {
            var e,
                a,
                r,
                o,
                s = this;
            Platform.PlatformManager.determineResourceBundle(),
                (e = s.readData("genericList")),
                (a = s.readData("dynamicallyLoadedResources")),
                (r = s.readData("totalSize")),
                Object.keys(Platform.resourceBundle.loaderResourceKeys).forEach(
                    function (s) {
                        var t = Platform.resourceBundle.loaderResourceKeys[s];
                        Sys.isDefined(a[s]) &&
                            Sys.isDefined(a[s][t]) &&
                            ((o = a[s][t]), e.push(o), (r += o.size));
                    }
                ),
                s.storeData("genericList", e),
                s.storeData("totalSize", r);
        },
    });
Sys.ns("Integration"),
    (Integration.OpenBetResourceHandlerOverride = {
        INTEGRATION: "openbet",
        determineSessionID: function () {
            return this.performServletCall(
                Resources.readData("queryData").callbackurl,
                "openbet"
            );
        },
        handleServletResponse: function (e) {
            var t = this,
                r = {},
                n = Sys.utils.queryStringToObject(e.responseText, !1),
                a = Resources.readData("queryData"),
                o = n.pluginURL;
            (r["openbet.rgitoken"] = n.rgitoken),
                (r["openbet.user_id"] = a["openbet.user_id"]),
                (r["openbet.game_code"] = a["openbet.game_code"]),
                (r["openbet.channel"] = t.getOpenBetChannel()),
                (r["openbet.user_type"] = a["openbet.user_type"]),
                (r["openbet.affiliate"] = Sys.isDefined(a["openbet.affiliate"])
                    ? a["openbet.affiliate"]
                    : ""),
                (r["openbet.rgs_site"] = "NetEnt site"),
                (r["openbet.promotions"] = "NO"),
                Sys.applyIf(Resources.readData("extraParams"), r),
                t.storeSessionID("NULL"),
                Sys.isDefined(o)
                    ? Resources.storeData("pluginURL", decodeURIComponent(o))
                    : t.determinePluginURL();
        },
        getOpenBetChannel: function () {
            return Resources.readData("queryData")["openbet.channel"];
        },
        _gameServerInitComplete:
            Loader.ResourceHandler.prototype.gameServerInitComplete,
        gameServerInitComplete: function (e) {
            var t = Sys.utils.parseQueryString(e.responseText, !0);
            Resources.storeData(
                "gameServerInitResponse",
                Sys.utils.queryStringToObject(e.responseText)
            ),
                Resources.storeData("gameServerInitResponseObject", t),
                this.storeSessionID(t.openbet.sessionid),
                Resources.storeData(
                    "unParsedGameServerInitResponse",
                    e.responseText
                ),
                Resources.storeData("historyUrl", this.buildHistoryUrl());
        },
    }),
    (Integration.OpenBetLanguageManagerOverride = {
        _getText: Core.LanguageManager.prototype.getText,
        getText: function (e, t) {
            var r = this,
                n = "OB" + e;
            return r.hasText(n) ? r._getText(n, t) : r._getText(e, t);
        },
    }),
    (Integration.applyOpenBetOverrides = function () {
        Sys.override(
            Loader.ResourceHandler,
            Integration.OpenBetResourceHandlerOverride
        ),
            Integration.applyOpenBetLanguageOverrides();
    }),
    (Integration.applyOpenBetLanguageOverrides = function () {
        Platform.isDesktopDevice &&
            Sys.override(
                Core.LanguageManager,
                Integration.OpenBetLanguageManagerOverride
            );
    }),
    Sys.openBetMode
        ? Integration.applyOpenBetOverrides()
        : Sys.openBetPlayForFunMode &&
          Integration.applyOpenBetLanguageOverrides();
Sys.ns("Integration.GCM"),
    (Integration.GCM.availableOptions = ["MUTE", "TURBO"]),
    (window.setViewportHidden = function (e) {
        var n,
            t = document.getElementById("viewport");
        null !== t &&
            Sys.isDefined(t) &&
            ((n = 1), e && (n = 0.01), (t.style.opacity = n));
    }),
    (Integration.GCM.Proxy = {
        MODULE_NAME: "GCMProxy",
        gcmCoreInstance: void 0,
        exclusivityEnable: !1,
        inIdleState: !1,
        multiChoiceGameDialogsQueue: [],
        freeBetBalance: 0,
        latestWin: 0,
        basicGamePanelEnabled: !0,
        balanceUpdatedWithNewRound: !1,
        constructor: function () {
            var e,
                n,
                t = this;
            Integration.GCM.Proxy.superclass.constructor.call(t),
                Sys.override(Loader.ResourceHandler, {
                    getOpenBetChannel: t.getGcmChannel.bind(t),
                }),
                Sys.override(Environment, {
                    goToLobby: t.goToLobby.bind(t),
                }),
                (t.exposedInterface = {
                    gameRevealed: t.gameRevealed.bind(t),
                    gcmReady: t.gcmReady.bind(t),
                    optionHasChanged: t.optionHasChanged.bind(t),
                    balancesHasChanged: t.balancesHasChanged.bind(t),
                    toggleMute: t.toggleMute.bind(t),
                    configReady: t.configReady.bind(t),
                    resume: t.resume.bind(t),
                    updateLoadingBar: t.simulateLoading.bind(t),
                }),
                (e = com.openbet.gcmBridge),
                e.init(document.body, window.location.href, t.exposedInterface),
                (n = t.getIframe()),
                null !== n &&
                    Sys.isDefined(n) &&
                    ((n.style.zIndex = 10), (n.style.position = "fixed")),
                t.on({
                    "notify:resourceHandler.gameAssetsLoaded":
                        t.onGameLoadedSuccessfully.bind(t),
                    "request:gcmProxy.updateProgress":
                        t.simulateLoading.bind(t),
                    "notify:stateHandler.leavingBeforeLoaderCloseState":
                        t.onGameResourcesLoaded.bind(t),
                    "notify:stateHandler.enteringIdleState":
                        this.onEnteringIdleState.bind(t),
                    "notify:resourceHandler.animationComplete":
                        t.onLoadAnimationClosed.bind(t),
                    "notify:loader.closed": t.onLoadAnimationClosed.bind(t),
                    "notify:moneyManager.balanceReloaded":
                        t.updateBalanceInUI.bind(t),
                    "request:disableBasicGamePanel":
                        t.disableBasicGamePanel.bind(t),
                    "request:enableBasicGamePanel":
                        t.enableBasicGamePanel.bind(t),
                    "request:gcmProxy.handleError": t.handleError.bind(t),
                });
        },
        goToLobby: function () {
            this.handleError({
                category: "CRITICAL",
                severity: "ERROR",
                errorCode: "CRITICAL_ERROR",
                message: Services.languageManager.getText(
                    Language.Keys.btn_casino
                ),
                extraParameters: {
                    originalError: "criticalError",
                    originalTitle: Services.languageManager.getText(
                        Language.Keys.btn_casino
                    ),
                    reason: 3,
                    suppressMessage: !0,
                },
            });
        },
        getIframe: function () {
            return document.querySelector("iframe[name='commonUIIFrame']");
        },
        getGcmChannel: function () {
            return this.gcmCoreInstance.getConfig().channel;
        },
        onGameLoadedSuccessfully: function () {
            this.setupAccount(), setViewportHidden(!1);
        },
        setupAccount: function () {
            var e = Resources.readData("gameServerInitResponse"),
                n = e.playercurrencyiso,
                t = Sys.utils.XMLHelper.getMoneyFormatFromXML(
                    Resources.readData("moneyformat_player"),
                    n
                ),
                a = {
                    ccy_code: n,
                    ccy_decimal_separator: t.decimalDivider,
                    ccy_thousand_separator: t.thousandsDivider,
                },
                i = Number(e.credit) / 100,
                o = Sys.isDefined(e["openbet.freebets"])
                    ? Number(e["openbet.freebets"])
                    : 0,
                s = {
                    CASH: {
                        amount: i,
                    },
                    FREEBET: {
                        amount: o / 100,
                    },
                };
            (this.freeBetBalance = o),
                this.gcmCoreInstance.accountInit(a, s),
                this.gcmCoreInstance.stakeUpdate(0),
                this.gcmCoreInstance.paidUpdate(0);
        },
        onGameResourcesLoaded: function () {
            (this.gameResourcesLoaded = !0),
                this.tryToFinishGCMInitialization();
        },
        onLoadAnimationClosed: function () {
            (this.loadAnimationClosed = !0),
                this.tryToFinishGCMInitialization();
        },
        tryToFinishGCMInitialization: function () {
            var e = this;
            e.gameResourcesLoaded &&
                e.loadAnimationClosed &&
                (e.updateBalanceInUI(),
                e.updateBetInUI(),
                e.updatePayoutInUI(),
                e.registerAvailableOptions(),
                e.gcmCoreInstance.gameReady(),
                e.fireEvent("request:scaling.update"));
        },
        registerAvailableOptions: function () {
            var e = this,
                n = e.gcmCoreInstance;
            Sys.each(Integration.GCM.availableOptions, function (e) {
                n.regOption(e);
            }),
                (e.hasRegisteredOptions = !0),
                e.updateTurboSettingInUI(),
                e.updateAudioSettingInUI();
        },
        onSpinStart: function () {
            var e = this.getBalances(!0);
            this.hideCommonUI(),
                this.gcmCoreInstance.balancesUpdate(e),
                (this.balanceUpdatedWithNewRound = !0);
        },
        hideCommonUI: function () {
            this.gcmCoreInstance.gameAnimationStart();
        },
        processServerResponse: function (e) {
            var n = this,
                t = e.openbet;
            (n.freeBetBalance =
                Sys.isDefined(t) && Sys.isDefined(t.freebets)
                    ? Number(t.freebets)
                    : n.freeBetBalance),
                (n.latestWin = Sys.isDefined(e.wins) ? e.wins.centsTotal : 0);
        },
        onShowWin: function () {
            (this.latestWin = Services.win.getTotalWinCash()),
                this.updateBalanceInUI(),
                this.updatePayoutInUI();
        },
        onEnteringIdleState: function () {
            var e = this;
            (e.inIdleState = !0), e.showCommonUI();
        },
        showCommonUI: function () {
            this.gcmCoreInstance.gameAnimationComplete(this.enableUI);
        },
        enableUI: function () {},
        updateBalanceInUI: function () {
            var e = this.getBalances();
            this.balanceUpdatedWithNewRound ||
                this.gcmCoreInstance.balancesUpdate(e),
                (this.balanceUpdatedWithNewRound = !1);
        },
        getBalances: function (e) {
            var n = Services.money.getBalanceCash() / 100,
                t = this.freeBetBalance / 100,
                a = n - t,
                i = t,
                o = Services.bet.getBetCash() / 100;
            return (
                e &&
                    ((a += o), (t -= o), t < 0 ? ((a += t), (i = 0)) : (i = t)),
                {
                    CASH: {
                        amount: a,
                    },
                    FREEBET: {
                        amount: i,
                    },
                }
            );
        },
        updatePayoutInUI: function () {
            this.gcmCoreInstance.paidUpdate(this.latestWin / 100);
        },
        onLeavingIdleState: function () {
            (this.inIdleState = !1),
                this.gcmCoreInstance.paidUpdate(0),
                this.updateBalanceInUI();
        },
        onSettingChanged: function (e) {
            "quickSpin" === e.id
                ? this.updateTurboSettingInUI()
                : "volumeMute" === e.id && this.updateAudioSettingInUI();
        },
        updateBetInUI: function () {
            var e;
            Services.money &&
                ((e = Services.bet.getBetCash() / 100),
                Sys.isNumber(e) && this.gcmCoreInstance.stakeUpdate(e));
        },
        updateTurboSettingInUI: function () {
            var e = this,
                n = Services.gameSettings.getSetting("quickSpin");
            e.hasRegisteredOptions &&
                Sys.contains(Integration.GCM.availableOptions, "TURBO") &&
                e.gcmCoreInstance.optionHasChanged("TURBO", "GAME", n);
        },
        updateAudioSettingInUI: function () {
            var e = this,
                n = Services.gameSettings.getSetting("volumeMute");
            e.hasRegisteredOptions &&
                Sys.contains(Integration.GCM.availableOptions, "MUTE") &&
                e.exposedInterface.toggleMute(n);
        },
        handleError: function (e) {
            var n,
                t,
                a,
                i = this;
            i.disableUI(),
                (n = !0),
                e.RGIError
                    ? ((t = com.openbet.gcm.xmlutil),
                      (a = t.getErrorInfoFromRGIXml(
                          decodeURIComponent(e.RGIXML)
                      )),
                      (i.shouldRevertRound = "VOID_TXN" === a.errorAction),
                      i.gcmCoreInstance.handleServerError(a))
                    : ((e = Sys.applyIf(e, {
                          category: "NON_RECOVERABLE_ERROR",
                          severity: "ERROR",
                          message: "An error occurred",
                          errorCode: "CLIENTERROR",
                      })),
                      "MULTI_CHOICE_DIALOG" === e.category &&
                          (Sys.isDefined(i.actionsOfCurrentDialog)
                              ? ((n = !1),
                                i.multiChoiceGameDialogsQueue.push(e))
                              : ((i.actionsOfCurrentDialog = e.actions),
                                i.exclusivityEnable ||
                                    (i.fireEvent(
                                        "request:userInputManager.activateExclusivity",
                                        i.MODULE_NAME
                                    ),
                                    i.fireEvent(
                                        "request:quickSettingsMenu.externalDeactivate",
                                        i.MODULE_NAME
                                    ),
                                    i.fireEvent(
                                        "request:spinButton.hide",
                                        i.MODULE_NAME
                                    ),
                                    (i.exclusivityEnable = !0)))),
                      n &&
                          ((i.shouldRevertRound = !0 === e.revert),
                          i.gcmCoreInstance.handleError(
                              e.category,
                              e.severity,
                              e.errorCode,
                              e.message,
                              e.extraParameters
                          )));
        },
        disableUI: function () {},
        gcmReady: function (e) {
            (this.gcmCoreInstance = e), this.simulateLoading(0);
        },
        configReady: function () {
            var e = this,
                n = !e.isDemoMode();
            (n && Sys.openBetMode) || (!n && !Sys.openBetMode)
                ? initializeGame({
                      loaderProgressCallBack: e.simulateLoading.bind(e),
                  })
                : n && !Sys.openBetMode
                ? e.handleError({
                      category: "LOGIN_ERROR",
                      severity: "ERROR",
                      message: "ACCOUNT_UNAVAILABLE",
                      errorCode: "ACCOUNT_UNAVAILABLE",
                      extraParameters: {
                          originalError: 70,
                          originalTitle: "MGaccountUnavailable",
                      },
                  })
                : Sys.utils.goToLobby();
        },
        isDemoMode: function () {
            return "demo" === this.gcmCoreInstance.getConfig().playMode;
        },
        simulateLoading: function (e) {
            var n = Sys.utils.toInt(e);
            n < 100
                ? this.gcmCoreInstance.loadProgressUpdate(n)
                : (this.gcmCoreInstance.loadProgressUpdate(99),
                  this.hideCommonUI(),
                  this.fireEvent("notify:gcmProxy.animationComplete"));
        },
        gameRevealed: function () {
            this.configureGameForGcm();
        },
        configureGameForGcm: function () {
            var e = this;
            Services.response.on("response", e.processServerResponse.bind(e)),
                Services.gameSettings.on("changed", e.onSettingChanged.bind(e)),
                Services.gameSettings.on(
                    "opened",
                    e.notifySettingChangeToUI.bind(e, "GAME_PREFERENCES", !0)
                ),
                Services.gameSettings.on(
                    "closed",
                    e.notifySettingChangeToUI.bind(e, "GAME_PREFERENCES", !1)
                ),
                Services.bet.on("changed", e.updateBetInUI.bind(e)),
                Services.win.on("show", e.onShowWin.bind(e)),
                Services.spin.on("animationStarted", e.hideCommonUI.bind(e)),
                Services.spin.on("started", e.onSpinStart.bind(e)),
                Services.gameRound.on("started", e.onLeavingIdleState.bind(e)),
                Services.gameRound.on("ended", e.onShowWin.bind(e)),
                Services.paytable.on(
                    "opened",
                    e.notifySettingChangeToUI.bind(e, "PAYTABLE", !0)
                ),
                Services.paytable.on(
                    "closed",
                    e.notifySettingChangeToUI.bind(e, "PAYTABLE", !1)
                ),
                Services.gameRules.on(
                    "opened",
                    e.notifySettingChangeToUI.bind(e, "ABOUT", !0)
                ),
                Services.gameRules.on(
                    "closed",
                    e.notifySettingChangeToUI.bind(e, "ABOUT", !1)
                ),
                Services.game.hideHomeButton(),
                Services.gameRules.disable();
        },
        notifySettingChangeToUI: function (e, n) {
            var t = this;
            t.hasRegisteredOptions &&
                Sys.contains(Integration.GCM.availableOptions, e) &&
                t.gcmCoreInstance.optionHasChanged(e, "GAME", n);
        },
        optionHasChanged: function (e, n) {
            var t = this;
            switch (e) {
                case "MUTE":
                    t.toggleSound(n);
                    break;
                case "TURBO":
                    t.toggleQuickSpin(n);
                    break;
                case "GAME_PREFERENCES":
                    t.inIdleState &&
                        (!0 === n
                            ? Services.gameSettings.open()
                            : Services.gameSettings.close());
                    break;
                case "PAYTABLE":
                    t.inIdleState &&
                        (!0 === n
                            ? Services.paytable.open()
                            : Services.paytable.close());
                    break;
                case "ABOUT":
                    t.inIdleState &&
                        Services.gameRules.setState(n ? "opened" : "closed");
                    break;
                default:
                    console.error("unknown option [" + e + "] changed by gcm ");
            }
        },
        disableBasicGamePanel: function () {
            this.basicGamePanelEnabled = !1;
        },
        enableBasicGamePanel: function () {
            this.basicGamePanelEnabled = !0;
        },
        toggleSound: function (e) {
            Services.gameSettings.setSetting({
                id: "volumeMute",
                value: e,
                persistent: !0,
            });
        },
        toggleQuickSpin: function (e) {
            Services.gameSettings.setSetting({
                id: "quickSpin",
                value: e,
                persistent: !0,
            });
        },
        balancesHasChanged: function (e) {
            var n, t;
            this.inIdleState
                ? ((n = parseInt(Math.round(100 * e.CASH.amount), 10)),
                  (t = parseInt(Math.round(100 * e.FREEBET.amount), 10)),
                  Services.moneyManager.setBalance(n + t),
                  (this.freeBetBalance = t))
                : Sys.utils.reload();
        },
        toggleMute: function (e) {
            this.gcmCoreInstance.optionHasChanged("MUTE", "GAME", e);
        },
        resume: function (e) {
            var n,
                t = this,
                a = e,
                i = Sys.isArray(t.actionsOfCurrentDialog);
            try {
                i &&
                    1 === t.actionsOfCurrentDialog.length &&
                    !Sys.isDefined(a) &&
                    (a = 0),
                    i && Sys.isDefined(t.actionsOfCurrentDialog[a])
                        ? t.actionsOfCurrentDialog[a]()
                        : t.shouldRevertRound &&
                          (t.fireEvent("request:moneyManager.revertBet"),
                          t.fireEvent(
                              "request:spin.activateDefaultOutcome",
                              "basic"
                          ),
                          t.updateBalanceInUI());
            } finally {
                t.actionsOfCurrentDialog = void 0;
            }
            t.multiChoiceGameDialogsQueue.length > 0
                ? ((n = t.multiChoiceGameDialogsQueue.shift()),
                  t.handleError(n))
                : ((t.exclusivityEnable = !1),
                  t.fireEvent(
                      "request:userInputManager.deactivateExclusivity",
                      t.MODULE_NAME
                  ),
                  t.fireEvent(
                      "request:quickSettingsMenu.externalActivate",
                      t.MODULE_NAME
                  ),
                  t.fireEvent("request:spinButton.show", t.MODULE_NAME));
        },
    }),
    (Integration.GCM.Proxy = Sys.extend(
        Sys.Observable,
        Integration.GCM.Proxy,
        "Integration.GCM.Proxy"
    )),
    Sys.isGcmEnabled &&
        (setViewportHidden(!0),
        document.body.classList.add("gcmMode"),
        Sys.utils
            .loadJS({
                url: "../../../gcm/js/gcmBridge.js",
            })
            .then(function () {
                new Integration.GCM.Proxy();
            }));
Sys.ns("Integration.GCM"),
    Sys.ns("Narcos"),
    (Narcos.originalGCMProxyRegisterAvailableOptions =
        Integration.GCM.Proxy.prototype.registerAvailableOptions),
    (Narcos.originalGCMProxyprocessServerResponse =
        Integration.GCM.Proxy.prototype.processServerResponse),
    Sys.apply(Integration.GCM.Proxy.prototype, {
        registerAvailableOptions: function () {
            var e = this;
            Narcos.originalGCMProxyRegisterAvailableOptions.apply(e, arguments),
                e.addListener(
                    "notify:responseParser.responseParsed",
                    e.processServerResponse
                ),
                e.addListener(
                    "notify:lockUp.updateInitialWin",
                    e.updateInitialLockUpWin
                );
        },
        processServerResponse: function (e) {
            var r = this,
                s = e.client.respinStates.isEnteringRespins;
            Narcos.originalGCMProxyprocessServerResponse.apply(r, arguments),
                (r.firstLockUpWin = s ? e.lockup.win.cents : null);
        },
        updateInitialLockUpWin: function () {
            var e = this;
            e.firstLockUpWin &&
                ((e.latestWin = e.firstLockUpWin), e.onShowWin());
        },
    });
Sys.ns("Integration.GCM"),
    (Integration.GCM.ErrorHandler = {
        handleRequestError: function (e) {
            var r,
                t = this,
                o = Sys.utils.getResponseParameter("openbet.error.xml", e),
                s = Sys.utils.getErrorCode(e);
            Sys.utils.httpRequestIsOK(e)
                ? Sys.isDefined(o)
                    ? this.fireEvent("request:gcmProxy.handleError", {
                          RGIError: !0,
                          RGIXML: o.replace(/\+/g, " "),
                      })
                    : (r = "server")
                : (r = "http"),
                Sys.isDefined(r) &&
                    r !== t.readStatus() &&
                    (t[t.errorStatus[r]](),
                    t.setStatus(r),
                    Utils.Helpers.logError(
                        "GCS_LOAD_ERROR",
                        s,
                        new Error("GCM " + r + " error")
                    ));
        },
    }),
    (Integration.GCM.ResourceHandler = {
        slownessDetected: function () {},
    }),
    (Integration.GCM.DeviceDetector = {
        handleIntegrationSpecificDialogs: function (e) {
            var r = "stopped" === e.severity,
                t = {
                    category: "MULTI_CHOICE_DIALOG",
                    severity: r ? "ERROR" : "INFO",
                    message: e.texts.join("\n"),
                    errorCode: "ERROR",
                    actions: [],
                    extraParameters: {},
                },
                o = [];
            Sys.each(e.buttons, function (e) {
                o.push(e.label), t.actions.push(e.action);
            }),
                (t.extraParameters.options = o),
                this.fireEvent("request:gcmProxy.handleError", t);
        },
    }),
    (function () {
        Sys.isGcmEnabled &&
            (Sys.override(Loader.ErrorHandler, Integration.GCM.ErrorHandler),
            Sys.override(
                Loader.ResourceHandler,
                Integration.GCM.ResourceHandler
            ),
            Sys.isDefined(Loader.DeviceDetector) &&
                Sys.override(
                    Loader.DeviceDetector,
                    Integration.GCM.DeviceDetector
                ));
    })();
Sys.ns("Archbot"),
    (Archbot.Controller = {
        init: function (t) {
            (this.model = t.model),
                (this.view = t.view),
                (this.MODULE_NAME = t.name),
                this.setupEvents(),
                this.setupArchbotEvents();
        },
        setupArchbotEvents: function () {
            Sys.isDefined(this.view) &&
                (this.addListener(
                    "request:" + this.MODULE_NAME + ".fetchItem",
                    this.view.getItem.bind(this.view)
                ),
                this.addListener(
                    "view:sendItem",
                    this.fireEvent.bind(
                        this,
                        "request:archBotGUI.saveItem",
                        this.MODULE_NAME
                    )
                )),
                this.addListener(
                    "request:" + this.MODULE_NAME + ".fetchData",
                    this.sendDataToArchbotModule
                );
        },
        sendDataToArchbotModule: function (t) {
            this.fireEvent(
                "request:archBotGUI.saveData",
                this.model.readData(t)
            );
        },
    }),
    Sys.override(Core.Controller, Archbot.Controller);
Sys.ns("Archbot"),
    (Archbot.View = {
        getItem: function (e, i) {
            var s,
                t,
                n = this;
            Sys.isDefined(e) &&
                Sys.isDefined(i) &&
                ((t = i.split(".")),
                Sys.each(t, function (e, i) {
                    return (s = 0 === i ? n[e] : s[e]), !!Sys.isDefined(s);
                }),
                Sys.isDefined(s) &&
                    this.fireEvent("view:sendItem", {
                        itemName: e,
                        item: s,
                    }));
        },
    }),
    Sys.override(Core.View, Archbot.View);
