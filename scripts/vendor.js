! function(e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function(e, t) {
    function n(e) {
        var t = "length" in e && e.length,
            n = ie.type(e);
        return "function" === n || ie.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
    }

    function r(e, t, n) {
        if (ie.isFunction(t)) return ie.grep(e, function(e, r) {
            return !!t.call(e, r, e) !== n
        });
        if (t.nodeType) return ie.grep(e, function(e) {
            return e === t !== n
        });
        if ("string" == typeof t) {
            if (he.test(t)) return ie.filter(t, e, n);
            t = ie.filter(t, e)
        }
        return ie.grep(e, function(e) {
            return ie.inArray(e, t) >= 0 !== n
        })
    }

    function i(e, t) {
        do e = e[t]; while (e && 1 !== e.nodeType);
        return e
    }

    function a(e) {
        var t = be[e] = {};
        return ie.each(e.match(xe) || [], function(e, n) {
            t[n] = !0
        }), t
    }

    function o() {
        fe.addEventListener ? (fe.removeEventListener("DOMContentLoaded", s, !1), e.removeEventListener("load", s, !1)) : (fe.detachEvent("onreadystatechange", s), e.detachEvent("onload", s))
    }

    function s() {
        (fe.addEventListener || "load" === event.type || "complete" === fe.readyState) && (o(), ie.ready())
    }

    function l(e, t, n) {
        if (void 0 === n && 1 === e.nodeType) {
            var r = "data-" + t.replace(Se, "-$1").toLowerCase();
            if (n = e.getAttribute(r), "string" == typeof n) {
                try {
                    n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : Te.test(n) ? ie.parseJSON(n) : n
                } catch (i) {}
                ie.data(e, t, n)
            } else n = void 0
        }
        return n
    }

    function u(e) {
        var t;
        for (t in e)
            if (("data" !== t || !ie.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
        return !0
    }

    function c(e, t, n, r) {
        if (ie.acceptData(e)) {
            var i, a, o = ie.expando,
                s = e.nodeType,
                l = s ? ie.cache : e,
                u = s ? e[o] : e[o] && o;
            if (u && l[u] && (r || l[u].data) || void 0 !== n || "string" != typeof t) return u || (u = s ? e[o] = U.pop() || ie.guid++ : o), l[u] || (l[u] = s ? {} : {
                toJSON: ie.noop
            }), ("object" == typeof t || "function" == typeof t) && (r ? l[u] = ie.extend(l[u], t) : l[u].data = ie.extend(l[u].data, t)), a = l[u], r || (a.data || (a.data = {}), a = a.data), void 0 !== n && (a[ie.camelCase(t)] = n), "string" == typeof t ? (i = a[t], null == i && (i = a[ie.camelCase(t)])) : i = a, i
        }
    }

    function d(e, t, n) {
        if (ie.acceptData(e)) {
            var r, i, a = e.nodeType,
                o = a ? ie.cache : e,
                s = a ? e[ie.expando] : ie.expando;
            if (o[s]) {
                if (t && (r = n ? o[s] : o[s].data)) {
                    ie.isArray(t) ? t = t.concat(ie.map(t, ie.camelCase)) : t in r ? t = [t] : (t = ie.camelCase(t), t = t in r ? [t] : t.split(" ")), i = t.length;
                    for (; i--;) delete r[t[i]];
                    if (n ? !u(r) : !ie.isEmptyObject(r)) return
                }(n || (delete o[s].data, u(o[s]))) && (a ? ie.cleanData([e], !0) : ne.deleteExpando || o != o.window ? delete o[s] : o[s] = null)
            }
        }
    }

    function h() {
        return !0
    }

    function p() {
        return !1
    }

    function f() {
        try {
            return fe.activeElement
        } catch (e) {}
    }

    function v(e) {
        var t = Ie.split("|"),
            n = e.createDocumentFragment();
        if (n.createElement)
            for (; t.length;) n.createElement(t.pop());
        return n
    }

    function g(e, t) {
        var n, r, i = 0,
            a = typeof e.getElementsByTagName !== Ee ? e.getElementsByTagName(t || "*") : typeof e.querySelectorAll !== Ee ? e.querySelectorAll(t || "*") : void 0;
        if (!a)
            for (a = [], n = e.childNodes || e; null != (r = n[i]); i++) !t || ie.nodeName(r, t) ? a.push(r) : ie.merge(a, g(r, t));
        return void 0 === t || t && ie.nodeName(e, t) ? ie.merge([e], a) : a
    }

    function y(e) {
        Pe.test(e.type) && (e.defaultChecked = e.checked)
    }

    function m(e, t) {
        return ie.nodeName(e, "table") && ie.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function x(e) {
        return e.type = (null !== ie.find.attr(e, "type")) + "/" + e.type, e
    }

    function b(e) {
        var t = We.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function w(e, t) {
        for (var n, r = 0; null != (n = e[r]); r++) ie._data(n, "globalEval", !t || ie._data(t[r], "globalEval"))
    }

    function _(e, t) {
        if (1 === t.nodeType && ie.hasData(e)) {
            var n, r, i, a = ie._data(e),
                o = ie._data(t, a),
                s = a.events;
            if (s) {
                delete o.handle, o.events = {};
                for (n in s)
                    for (r = 0, i = s[n].length; i > r; r++) ie.event.add(t, n, s[n][r])
            }
            o.data && (o.data = ie.extend({}, o.data))
        }
    }

    function E(e, t) {
        var n, r, i;
        if (1 === t.nodeType) {
            if (n = t.nodeName.toLowerCase(), !ne.noCloneEvent && t[ie.expando]) {
                i = ie._data(t);
                for (r in i.events) ie.removeEvent(t, r, i.handle);
                t.removeAttribute(ie.expando)
            }
            "script" === n && t.text !== e.text ? (x(t).text = e.text, b(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), ne.html5Clone && e.innerHTML && !ie.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Pe.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
        }
    }

    function T(t, n) {
        var r, i = ie(n.createElement(t)).appendTo(n.body),
            a = e.getDefaultComputedStyle && (r = e.getDefaultComputedStyle(i[0])) ? r.display : ie.css(i[0], "display");
        return i.detach(), a
    }

    function S(e) {
        var t = fe,
            n = Qe[e];
        return n || (n = T(e, t), "none" !== n && n || (Je = (Je || ie("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = (Je[0].contentWindow || Je[0].contentDocument).document, t.write(), t.close(), n = T(e, t), Je.detach()), Qe[e] = n), n
    }

    function C(e, t) {
        return {
            get: function() {
                var n = e();
                if (null != n) return n ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    }

    function k(e, t) {
        if (t in e) return t;
        for (var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = ht.length; i--;)
            if (t = ht[i] + n, t in e) return t;
        return r
    }

    function D(e, t) {
        for (var n, r, i, a = [], o = 0, s = e.length; s > o; o++) r = e[o], r.style && (a[o] = ie._data(r, "olddisplay"), n = r.style.display, t ? (a[o] || "none" !== n || (r.style.display = ""), "" === r.style.display && De(r) && (a[o] = ie._data(r, "olddisplay", S(r.nodeName)))) : (i = De(r), (n && "none" !== n || !i) && ie._data(r, "olddisplay", i ? n : ie.css(r, "display"))));
        for (o = 0; s > o; o++) r = e[o], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? a[o] || "" : "none"));
        return e
    }

    function N(e, t, n) {
        var r = lt.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }

    function P(e, t, n, r, i) {
        for (var a = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, o = 0; 4 > a; a += 2) "margin" === n && (o += ie.css(e, n + ke[a], !0, i)), r ? ("content" === n && (o -= ie.css(e, "padding" + ke[a], !0, i)), "margin" !== n && (o -= ie.css(e, "border" + ke[a] + "Width", !0, i))) : (o += ie.css(e, "padding" + ke[a], !0, i), "padding" !== n && (o += ie.css(e, "border" + ke[a] + "Width", !0, i)));
        return o
    }

    function M(e, t, n) {
        var r = !0,
            i = "width" === t ? e.offsetWidth : e.offsetHeight,
            a = et(e),
            o = ne.boxSizing && "border-box" === ie.css(e, "boxSizing", !1, a);
        if (0 >= i || null == i) {
            if (i = tt(e, t, a), (0 > i || null == i) && (i = e.style[t]), rt.test(i)) return i;
            r = o && (ne.boxSizingReliable() || i === e.style[t]), i = parseFloat(i) || 0
        }
        return i + P(e, t, n || (o ? "border" : "content"), r, a) + "px"
    }

    function B(e, t, n, r, i) {
        return new B.prototype.init(e, t, n, r, i)
    }

    function L() {
        return setTimeout(function() {
            pt = void 0
        }), pt = ie.now()
    }

    function O(e, t) {
        var n, r = {
                height: e
            },
            i = 0;
        for (t = t ? 1 : 0; 4 > i; i += 2 - t) n = ke[i], r["margin" + n] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e), r
    }

    function A(e, t, n) {
        for (var r, i = (xt[t] || []).concat(xt["*"]), a = 0, o = i.length; o > a; a++)
            if (r = i[a].call(n, t, e)) return r
    }

    function I(e, t, n) {
        var r, i, a, o, s, l, u, c, d = this,
            h = {},
            p = e.style,
            f = e.nodeType && De(e),
            v = ie._data(e, "fxshow");
        n.queue || (s = ie._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, l = s.empty.fire, s.empty.fire = function() {
            s.unqueued || l()
        }), s.unqueued++, d.always(function() {
            d.always(function() {
                s.unqueued--, ie.queue(e, "fx").length || s.empty.fire()
            })
        })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], u = ie.css(e, "display"), c = "none" === u ? ie._data(e, "olddisplay") || S(e.nodeName) : u, "inline" === c && "none" === ie.css(e, "float") && (ne.inlineBlockNeedsLayout && "inline" !== S(e.nodeName) ? p.zoom = 1 : p.display = "inline-block")), n.overflow && (p.overflow = "hidden", ne.shrinkWrapBlocks() || d.always(function() {
            p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
        }));
        for (r in t)
            if (i = t[r], vt.exec(i)) {
                if (delete t[r], a = a || "toggle" === i, i === (f ? "hide" : "show")) {
                    if ("show" !== i || !v || void 0 === v[r]) continue;
                    f = !0
                }
                h[r] = v && v[r] || ie.style(e, r)
            } else u = void 0;
        if (ie.isEmptyObject(h)) "inline" === ("none" === u ? S(e.nodeName) : u) && (p.display = u);
        else {
            v ? "hidden" in v && (f = v.hidden) : v = ie._data(e, "fxshow", {}), a && (v.hidden = !f), f ? ie(e).show() : d.done(function() {
                ie(e).hide()
            }), d.done(function() {
                var t;
                ie._removeData(e, "fxshow");
                for (t in h) ie.style(e, t, h[t])
            });
            for (r in h) o = A(f ? v[r] : 0, r, d), r in v || (v[r] = o.start, f && (o.end = o.start, o.start = "width" === r || "height" === r ? 1 : 0))
        }
    }

    function z(e, t) {
        var n, r, i, a, o;
        for (n in e)
            if (r = ie.camelCase(n), i = t[r], a = e[n], ie.isArray(a) && (i = a[1], a = e[n] = a[0]), n !== r && (e[r] = a, delete e[n]), o = ie.cssHooks[r], o && "expand" in o) {
                a = o.expand(a), delete e[r];
                for (n in a) n in e || (e[n] = a[n], t[n] = i)
            } else t[r] = i
    }

    function R(e, t, n) {
        var r, i, a = 0,
            o = mt.length,
            s = ie.Deferred().always(function() {
                delete l.elem
            }),
            l = function() {
                if (i) return !1;
                for (var t = pt || L(), n = Math.max(0, u.startTime + u.duration - t), r = n / u.duration || 0, a = 1 - r, o = 0, l = u.tweens.length; l > o; o++) u.tweens[o].run(a);
                return s.notifyWith(e, [u, a, n]), 1 > a && l ? n : (s.resolveWith(e, [u]), !1)
            },
            u = s.promise({
                elem: e,
                props: ie.extend({}, t),
                opts: ie.extend(!0, {
                    specialEasing: {}
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: pt || L(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n) {
                    var r = ie.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing);
                    return u.tweens.push(r), r
                },
                stop: function(t) {
                    var n = 0,
                        r = t ? u.tweens.length : 0;
                    if (i) return this;
                    for (i = !0; r > n; n++) u.tweens[n].run(1);
                    return t ? s.resolveWith(e, [u, t]) : s.rejectWith(e, [u, t]), this
                }
            }),
            c = u.props;
        for (z(c, u.opts.specialEasing); o > a; a++)
            if (r = mt[a].call(u, e, c, u.opts)) return r;
        return ie.map(c, A, u), ie.isFunction(u.opts.start) && u.opts.start.call(e, u), ie.fx.timer(ie.extend(l, {
            elem: e,
            anim: u,
            queue: u.opts.queue
        })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
    }

    function j(e) {
        return function(t, n) {
            "string" != typeof t && (n = t, t = "*");
            var r, i = 0,
                a = t.toLowerCase().match(xe) || [];
            if (ie.isFunction(n))
                for (; r = a[i++];) "+" === r.charAt(0) ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }

    function F(e, t, n, r) {
        function i(s) {
            var l;
            return a[s] = !0, ie.each(e[s] || [], function(e, s) {
                var u = s(t, n, r);
                return "string" != typeof u || o || a[u] ? o ? !(l = u) : void 0 : (t.dataTypes.unshift(u), i(u), !1)
            }), l
        }
        var a = {},
            o = e === Xt;
        return i(t.dataTypes[0]) || !a["*"] && i("*")
    }

    function q(e, t) {
        var n, r, i = ie.ajaxSettings.flatOptions || {};
        for (r in t) void 0 !== t[r] && ((i[r] ? e : n || (n = {}))[r] = t[r]);
        return n && ie.extend(!0, e, n), e
    }

    function V(e, t, n) {
        for (var r, i, a, o, s = e.contents, l = e.dataTypes;
            "*" === l[0];) l.shift(), void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
        if (i)
            for (o in s)
                if (s[o] && s[o].test(i)) {
                    l.unshift(o);
                    break
                }
        if (l[0] in n) a = l[0];
        else {
            for (o in n) {
                if (!l[0] || e.converters[o + " " + l[0]]) {
                    a = o;
                    break
                }
                r || (r = o)
            }
            a = a || r
        }
        return a ? (a !== l[0] && l.unshift(a), n[a]) : void 0
    }

    function X(e, t, n, r) {
        var i, a, o, s, l, u = {},
            c = e.dataTypes.slice();
        if (c[1])
            for (o in e.converters) u[o.toLowerCase()] = e.converters[o];
        for (a = c.shift(); a;)
            if (e.responseFields[a] && (n[e.responseFields[a]] = t), !l && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = a, a = c.shift())
                if ("*" === a) a = l;
                else if ("*" !== l && l !== a) {
            if (o = u[l + " " + a] || u["* " + a], !o)
                for (i in u)
                    if (s = i.split(" "), s[1] === a && (o = u[l + " " + s[0]] || u["* " + s[0]])) {
                        o === !0 ? o = u[i] : u[i] !== !0 && (a = s[0], c.unshift(s[1]));
                        break
                    }
            if (o !== !0)
                if (o && e["throws"]) t = o(t);
                else try {
                    t = o(t)
                } catch (d) {
                    return {
                        state: "parsererror",
                        error: o ? d : "No conversion from " + l + " to " + a
                    }
                }
        }
        return {
            state: "success",
            data: t
        }
    }

    function H(e, t, n, r) {
        var i;
        if (ie.isArray(t)) ie.each(t, function(t, i) {
            n || Wt.test(e) ? r(e, i) : H(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r)
        });
        else if (n || "object" !== ie.type(t)) r(e, t);
        else
            for (i in t) H(e + "[" + i + "]", t[i], n, r)
    }

    function Y() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {}
    }

    function $() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {}
    }

    function W(e) {
        return ie.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
    }
    var U = [],
        Z = U.slice,
        G = U.concat,
        K = U.push,
        J = U.indexOf,
        Q = {},
        ee = Q.toString,
        te = Q.hasOwnProperty,
        ne = {},
        re = "1.11.3",
        ie = function(e, t) {
            return new ie.fn.init(e, t)
        },
        ae = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        oe = /^-ms-/,
        se = /-([\da-z])/gi,
        le = function(e, t) {
            return t.toUpperCase()
        };
    ie.fn = ie.prototype = {
        jquery: re,
        constructor: ie,
        selector: "",
        length: 0,
        toArray: function() {
            return Z.call(this)
        },
        get: function(e) {
            return null != e ? 0 > e ? this[e + this.length] : this[e] : Z.call(this)
        },
        pushStack: function(e) {
            var t = ie.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t
        },
        each: function(e, t) {
            return ie.each(this, e, t)
        },
        map: function(e) {
            return this.pushStack(ie.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        slice: function() {
            return this.pushStack(Z.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length,
                n = +e + (0 > e ? t : 0);
            return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: K,
        sort: U.sort,
        splice: U.splice
    }, ie.extend = ie.fn.extend = function() {
        var e, t, n, r, i, a, o = arguments[0] || {},
            s = 1,
            l = arguments.length,
            u = !1;
        for ("boolean" == typeof o && (u = o, o = arguments[s] || {}, s++), "object" == typeof o || ie.isFunction(o) || (o = {}), s === l && (o = this, s--); l > s; s++)
            if (null != (i = arguments[s]))
                for (r in i) e = o[r], n = i[r], o !== n && (u && n && (ie.isPlainObject(n) || (t = ie.isArray(n))) ? (t ? (t = !1, a = e && ie.isArray(e) ? e : []) : a = e && ie.isPlainObject(e) ? e : {}, o[r] = ie.extend(u, a, n)) : void 0 !== n && (o[r] = n));
        return o
    }, ie.extend({
        expando: "jQuery" + (re + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isFunction: function(e) {
            return "function" === ie.type(e)
        },
        isArray: Array.isArray || function(e) {
            return "array" === ie.type(e)
        },
        isWindow: function(e) {
            return null != e && e == e.window
        },
        isNumeric: function(e) {
            return !ie.isArray(e) && e - parseFloat(e) + 1 >= 0
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        isPlainObject: function(e) {
            var t;
            if (!e || "object" !== ie.type(e) || e.nodeType || ie.isWindow(e)) return !1;
            try {
                if (e.constructor && !te.call(e, "constructor") && !te.call(e.constructor.prototype, "isPrototypeOf")) return !1
            } catch (n) {
                return !1
            }
            if (ne.ownLast)
                for (t in e) return te.call(e, t);
            for (t in e);
            return void 0 === t || te.call(e, t)
        },
        type: function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? Q[ee.call(e)] || "object" : typeof e
        },
        globalEval: function(t) {
            t && ie.trim(t) && (e.execScript || function(t) {
                e.eval.call(e, t)
            })(t)
        },
        camelCase: function(e) {
            return e.replace(oe, "ms-").replace(se, le)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, t, r) {
            var i, a = 0,
                o = e.length,
                s = n(e);
            if (r) {
                if (s)
                    for (; o > a && (i = t.apply(e[a], r), i !== !1); a++);
                else
                    for (a in e)
                        if (i = t.apply(e[a], r), i === !1) break
            } else if (s)
                for (; o > a && (i = t.call(e[a], a, e[a]), i !== !1); a++);
            else
                for (a in e)
                    if (i = t.call(e[a], a, e[a]), i === !1) break;
            return e
        },
        trim: function(e) {
            return null == e ? "" : (e + "").replace(ae, "")
        },
        makeArray: function(e, t) {
            var r = t || [];
            return null != e && (n(Object(e)) ? ie.merge(r, "string" == typeof e ? [e] : e) : K.call(r, e)), r
        },
        inArray: function(e, t, n) {
            var r;
            if (t) {
                if (J) return J.call(t, e, n);
                for (r = t.length, n = n ? 0 > n ? Math.max(0, r + n) : n : 0; r > n; n++)
                    if (n in t && t[n] === e) return n
            }
            return -1
        },
        merge: function(e, t) {
            for (var n = +t.length, r = 0, i = e.length; n > r;) e[i++] = t[r++];
            if (n !== n)
                for (; void 0 !== t[r];) e[i++] = t[r++];
            return e.length = i, e
        },
        grep: function(e, t, n) {
            for (var r, i = [], a = 0, o = e.length, s = !n; o > a; a++) r = !t(e[a], a), r !== s && i.push(e[a]);
            return i
        },
        map: function(e, t, r) {
            var i, a = 0,
                o = e.length,
                s = n(e),
                l = [];
            if (s)
                for (; o > a; a++) i = t(e[a], a, r), null != i && l.push(i);
            else
                for (a in e) i = t(e[a], a, r), null != i && l.push(i);
            return G.apply([], l)
        },
        guid: 1,
        proxy: function(e, t) {
            var n, r, i;
            return "string" == typeof t && (i = e[t], t = e, e = i), ie.isFunction(e) ? (n = Z.call(arguments, 2), r = function() {
                return e.apply(t || this, n.concat(Z.call(arguments)))
            }, r.guid = e.guid = e.guid || ie.guid++, r) : void 0
        },
        now: function() {
            return +new Date
        },
        support: ne
    }), ie.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
        Q["[object " + t + "]"] = t.toLowerCase()
    });
    var ue = function(e) {
        function t(e, t, n, r) {
            var i, a, o, s, l, u, d, p, f, v;
            if ((t ? t.ownerDocument || t : F) !== B && M(t), t = t || B, n = n || [], s = t.nodeType, "string" != typeof e || !e || 1 !== s && 9 !== s && 11 !== s) return n;
            if (!r && O) {
                if (11 !== s && (i = me.exec(e)))
                    if (o = i[1]) {
                        if (9 === s) {
                            if (a = t.getElementById(o), !a || !a.parentNode) return n;
                            if (a.id === o) return n.push(a), n
                        } else if (t.ownerDocument && (a = t.ownerDocument.getElementById(o)) && R(t, a) && a.id === o) return n.push(a), n
                    } else {
                        if (i[2]) return J.apply(n, t.getElementsByTagName(e)), n;
                        if ((o = i[3]) && w.getElementsByClassName) return J.apply(n, t.getElementsByClassName(o)), n
                    }
                if (w.qsa && (!A || !A.test(e))) {
                    if (p = d = j, f = t, v = 1 !== s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
                        for (u = S(e), (d = t.getAttribute("id")) ? p = d.replace(be, "\\$&") : t.setAttribute("id", p), p = "[id='" + p + "'] ", l = u.length; l--;) u[l] = p + h(u[l]);
                        f = xe.test(e) && c(t.parentNode) || t, v = u.join(",")
                    }
                    if (v) try {
                        return J.apply(n, f.querySelectorAll(v)), n
                    } catch (g) {} finally {
                        d || t.removeAttribute("id")
                    }
                }
            }
            return k(e.replace(le, "$1"), t, n, r)
        }

        function n() {
            function e(n, r) {
                return t.push(n + " ") > _.cacheLength && delete e[t.shift()], e[n + " "] = r
            }
            var t = [];
            return e
        }

        function r(e) {
            return e[j] = !0, e
        }

        function i(e) {
            var t = B.createElement("div");
            try {
                return !!e(t)
            } catch (n) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function a(e, t) {
            for (var n = e.split("|"), r = e.length; r--;) _.attrHandle[n[r]] = t
        }

        function o(e, t) {
            var n = t && e,
                r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || W) - (~e.sourceIndex || W);
            if (r) return r;
            if (n)
                for (; n = n.nextSibling;)
                    if (n === t) return -1;
            return e ? 1 : -1
        }

        function s(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e
            }
        }

        function l(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }

        function u(e) {
            return r(function(t) {
                return t = +t, r(function(n, r) {
                    for (var i, a = e([], n.length, t), o = a.length; o--;) n[i = a[o]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }

        function c(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e
        }

        function d() {}

        function h(e) {
            for (var t = 0, n = e.length, r = ""; n > t; t++) r += e[t].value;
            return r
        }

        function p(e, t, n) {
            var r = t.dir,
                i = n && "parentNode" === r,
                a = V++;
            return t.first ? function(t, n, a) {
                for (; t = t[r];)
                    if (1 === t.nodeType || i) return e(t, n, a)
            } : function(t, n, o) {
                var s, l, u = [q, a];
                if (o) {
                    for (; t = t[r];)
                        if ((1 === t.nodeType || i) && e(t, n, o)) return !0
                } else
                    for (; t = t[r];)
                        if (1 === t.nodeType || i) {
                            if (l = t[j] || (t[j] = {}), (s = l[r]) && s[0] === q && s[1] === a) return u[2] = s[2];
                            if (l[r] = u, u[2] = e(t, n, o)) return !0
                        }
            }
        }

        function f(e) {
            return e.length > 1 ? function(t, n, r) {
                for (var i = e.length; i--;)
                    if (!e[i](t, n, r)) return !1;
                return !0
            } : e[0]
        }

        function v(e, n, r) {
            for (var i = 0, a = n.length; a > i; i++) t(e, n[i], r);
            return r
        }

        function g(e, t, n, r, i) {
            for (var a, o = [], s = 0, l = e.length, u = null != t; l > s; s++)(a = e[s]) && (!n || n(a, r, i)) && (o.push(a), u && t.push(s));
            return o
        }

        function y(e, t, n, i, a, o) {
            return i && !i[j] && (i = y(i)), a && !a[j] && (a = y(a, o)), r(function(r, o, s, l) {
                var u, c, d, h = [],
                    p = [],
                    f = o.length,
                    y = r || v(t || "*", s.nodeType ? [s] : s, []),
                    m = !e || !r && t ? y : g(y, h, e, s, l),
                    x = n ? a || (r ? e : f || i) ? [] : o : m;
                if (n && n(m, x, s, l), i)
                    for (u = g(x, p), i(u, [], s, l), c = u.length; c--;)(d = u[c]) && (x[p[c]] = !(m[p[c]] = d));
                if (r) {
                    if (a || e) {
                        if (a) {
                            for (u = [], c = x.length; c--;)(d = x[c]) && u.push(m[c] = d);
                            a(null, x = [], u, l)
                        }
                        for (c = x.length; c--;)(d = x[c]) && (u = a ? ee(r, d) : h[c]) > -1 && (r[u] = !(o[u] = d))
                    }
                } else x = g(x === o ? x.splice(f, x.length) : x), a ? a(null, o, x, l) : J.apply(o, x)
            })
        }

        function m(e) {
            for (var t, n, r, i = e.length, a = _.relative[e[0].type], o = a || _.relative[" "], s = a ? 1 : 0, l = p(function(e) {
                    return e === t
                }, o, !0), u = p(function(e) {
                    return ee(t, e) > -1
                }, o, !0), c = [function(e, n, r) {
                    var i = !a && (r || n !== D) || ((t = n).nodeType ? l(e, n, r) : u(e, n, r));
                    return t = null, i
                }]; i > s; s++)
                if (n = _.relative[e[s].type]) c = [p(f(c), n)];
                else {
                    if (n = _.filter[e[s].type].apply(null, e[s].matches), n[j]) {
                        for (r = ++s; i > r && !_.relative[e[r].type]; r++);
                        return y(s > 1 && f(c), s > 1 && h(e.slice(0, s - 1).concat({
                            value: " " === e[s - 2].type ? "*" : ""
                        })).replace(le, "$1"), n, r > s && m(e.slice(s, r)), i > r && m(e = e.slice(r)), i > r && h(e))
                    }
                    c.push(n)
                }
            return f(c)
        }

        function x(e, n) {
            var i = n.length > 0,
                a = e.length > 0,
                o = function(r, o, s, l, u) {
                    var c, d, h, p = 0,
                        f = "0",
                        v = r && [],
                        y = [],
                        m = D,
                        x = r || a && _.find.TAG("*", u),
                        b = q += null == m ? 1 : Math.random() || .1,
                        w = x.length;
                    for (u && (D = o !== B && o); f !== w && null != (c = x[f]); f++) {
                        if (a && c) {
                            for (d = 0; h = e[d++];)
                                if (h(c, o, s)) {
                                    l.push(c);
                                    break
                                }
                            u && (q = b)
                        }
                        i && ((c = !h && c) && p--, r && v.push(c))
                    }
                    if (p += f, i && f !== p) {
                        for (d = 0; h = n[d++];) h(v, y, o, s);
                        if (r) {
                            if (p > 0)
                                for (; f--;) v[f] || y[f] || (y[f] = G.call(l));
                            y = g(y)
                        }
                        J.apply(l, y), u && !r && y.length > 0 && p + n.length > 1 && t.uniqueSort(l)
                    }
                    return u && (q = b, D = m), v
                };
            return i ? r(o) : o
        }
        var b, w, _, E, T, S, C, k, D, N, P, M, B, L, O, A, I, z, R, j = "sizzle" + 1 * new Date,
            F = e.document,
            q = 0,
            V = 0,
            X = n(),
            H = n(),
            Y = n(),
            $ = function(e, t) {
                return e === t && (P = !0), 0
            },
            W = 1 << 31,
            U = {}.hasOwnProperty,
            Z = [],
            G = Z.pop,
            K = Z.push,
            J = Z.push,
            Q = Z.slice,
            ee = function(e, t) {
                for (var n = 0, r = e.length; r > n; n++)
                    if (e[n] === t) return n;
                return -1
            },
            te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            ne = "[\\x20\\t\\r\\n\\f]",
            re = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            ie = re.replace("w", "w#"),
            ae = "\\[" + ne + "*(" + re + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ie + "))|)" + ne + "*\\]",
            oe = ":(" + re + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ae + ")*)|.*)\\)|)",
            se = new RegExp(ne + "+", "g"),
            le = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
            ue = new RegExp("^" + ne + "*," + ne + "*"),
            ce = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
            de = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"),
            he = new RegExp(oe),
            pe = new RegExp("^" + ie + "$"),
            fe = {
                ID: new RegExp("^#(" + re + ")"),
                CLASS: new RegExp("^\\.(" + re + ")"),
                TAG: new RegExp("^(" + re.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + ae),
                PSEUDO: new RegExp("^" + oe),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + te + ")$", "i"),
                needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
            },
            ve = /^(?:input|select|textarea|button)$/i,
            ge = /^h\d$/i,
            ye = /^[^{]+\{\s*\[native \w/,
            me = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            xe = /[+~]/,
            be = /'|\\/g,
            we = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"),
            _e = function(e, t, n) {
                var r = "0x" + t - 65536;
                return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
            },
            Ee = function() {
                M()
            };
        try {
            J.apply(Z = Q.call(F.childNodes), F.childNodes), Z[F.childNodes.length].nodeType
        } catch (Te) {
            J = {
                apply: Z.length ? function(e, t) {
                    K.apply(e, Q.call(t))
                } : function(e, t) {
                    for (var n = e.length, r = 0; e[n++] = t[r++];);
                    e.length = n - 1
                }
            }
        }
        w = t.support = {}, T = t.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? "HTML" !== t.nodeName : !1
        }, M = t.setDocument = function(e) {
            var t, n, r = e ? e.ownerDocument || e : F;
            return r !== B && 9 === r.nodeType && r.documentElement ? (B = r, L = r.documentElement, n = r.defaultView, n && n !== n.top && (n.addEventListener ? n.addEventListener("unload", Ee, !1) : n.attachEvent && n.attachEvent("onunload", Ee)), O = !T(r), w.attributes = i(function(e) {
                return e.className = "i", !e.getAttribute("className")
            }), w.getElementsByTagName = i(function(e) {
                return e.appendChild(r.createComment("")), !e.getElementsByTagName("*").length
            }), w.getElementsByClassName = ye.test(r.getElementsByClassName), w.getById = i(function(e) {
                return L.appendChild(e).id = j, !r.getElementsByName || !r.getElementsByName(j).length
            }), w.getById ? (_.find.ID = function(e, t) {
                if ("undefined" != typeof t.getElementById && O) {
                    var n = t.getElementById(e);
                    return n && n.parentNode ? [n] : []
                }
            }, _.filter.ID = function(e) {
                var t = e.replace(we, _e);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }) : (delete _.find.ID, _.filter.ID = function(e) {
                var t = e.replace(we, _e);
                return function(e) {
                    var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }), _.find.TAG = w.getElementsByTagName ? function(e, t) {
                return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : w.qsa ? t.querySelectorAll(e) : void 0
            } : function(e, t) {
                var n, r = [],
                    i = 0,
                    a = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = a[i++];) 1 === n.nodeType && r.push(n);
                    return r
                }
                return a
            }, _.find.CLASS = w.getElementsByClassName && function(e, t) {
                return O ? t.getElementsByClassName(e) : void 0
            }, I = [], A = [], (w.qsa = ye.test(r.querySelectorAll)) && (i(function(e) {
                L.appendChild(e).innerHTML = "<a id='" + j + "'></a><select id='" + j + "-\f]' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && A.push("[*^$]=" + ne + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || A.push("\\[" + ne + "*(?:value|" + te + ")"), e.querySelectorAll("[id~=" + j + "-]").length || A.push("~="), e.querySelectorAll(":checked").length || A.push(":checked"), e.querySelectorAll("a#" + j + "+*").length || A.push(".#.+[+~]")
            }), i(function(e) {
                var t = r.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && A.push("name" + ne + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || A.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), A.push(",.*:")
            })), (w.matchesSelector = ye.test(z = L.matches || L.webkitMatchesSelector || L.mozMatchesSelector || L.oMatchesSelector || L.msMatchesSelector)) && i(function(e) {
                w.disconnectedMatch = z.call(e, "div"), z.call(e, "[s!='']:x"), I.push("!=", oe)
            }), A = A.length && new RegExp(A.join("|")), I = I.length && new RegExp(I.join("|")), t = ye.test(L.compareDocumentPosition), R = t || ye.test(L.contains) ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e,
                    r = t && t.parentNode;
                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
            } : function(e, t) {
                if (t)
                    for (; t = t.parentNode;)
                        if (t === e) return !0;
                return !1
            }, $ = t ? function(e, t) {
                if (e === t) return P = !0, 0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !w.sortDetached && t.compareDocumentPosition(e) === n ? e === r || e.ownerDocument === F && R(F, e) ? -1 : t === r || t.ownerDocument === F && R(F, t) ? 1 : N ? ee(N, e) - ee(N, t) : 0 : 4 & n ? -1 : 1)
            } : function(e, t) {
                if (e === t) return P = !0, 0;
                var n, i = 0,
                    a = e.parentNode,
                    s = t.parentNode,
                    l = [e],
                    u = [t];
                if (!a || !s) return e === r ? -1 : t === r ? 1 : a ? -1 : s ? 1 : N ? ee(N, e) - ee(N, t) : 0;
                if (a === s) return o(e, t);
                for (n = e; n = n.parentNode;) l.unshift(n);
                for (n = t; n = n.parentNode;) u.unshift(n);
                for (; l[i] === u[i];) i++;
                return i ? o(l[i], u[i]) : l[i] === F ? -1 : u[i] === F ? 1 : 0
            }, r) : B
        }, t.matches = function(e, n) {
            return t(e, null, null, n)
        }, t.matchesSelector = function(e, n) {
            if ((e.ownerDocument || e) !== B && M(e), n = n.replace(de, "='$1']"), w.matchesSelector && O && (!I || !I.test(n)) && (!A || !A.test(n))) try {
                var r = z.call(e, n);
                if (r || w.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
            } catch (i) {}
            return t(n, B, null, [e]).length > 0
        }, t.contains = function(e, t) {
            return (e.ownerDocument || e) !== B && M(e), R(e, t)
        }, t.attr = function(e, t) {
            (e.ownerDocument || e) !== B && M(e);
            var n = _.attrHandle[t.toLowerCase()],
                r = n && U.call(_.attrHandle, t.toLowerCase()) ? n(e, t, !O) : void 0;
            return void 0 !== r ? r : w.attributes || !O ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }, t.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, t.uniqueSort = function(e) {
            var t, n = [],
                r = 0,
                i = 0;
            if (P = !w.detectDuplicates, N = !w.sortStable && e.slice(0), e.sort($), P) {
                for (; t = e[i++];) t === e[i] && (r = n.push(i));
                for (; r--;) e.splice(n[r], 1)
            }
            return N = null, e
        }, E = t.getText = function(e) {
            var t, n = "",
                r = 0,
                i = e.nodeType;
            if (i) {
                if (1 === i || 9 === i || 11 === i) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += E(e)
                } else if (3 === i || 4 === i) return e.nodeValue
            } else
                for (; t = e[r++];) n += E(t);
            return n
        }, _ = t.selectors = {
            cacheLength: 50,
            createPseudo: r,
            match: fe,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(we, _e), e[3] = (e[3] || e[4] || e[5] || "").replace(we, _e), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    return fe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && he.test(n) && (t = S(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(we, _e).toLowerCase();
                    return "*" === e ? function() {
                        return !0
                    } : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = X[e + " "];
                    return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && X(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(e, n, r) {
                    return function(i) {
                        var a = t.attr(i, e);
                        return null == a ? "!=" === n : n ? (a += "", "=" === n ? a === r : "!=" === n ? a !== r : "^=" === n ? r && 0 === a.indexOf(r) : "*=" === n ? r && a.indexOf(r) > -1 : "$=" === n ? r && a.slice(-r.length) === r : "~=" === n ? (" " + a.replace(se, " ") + " ").indexOf(r) > -1 : "|=" === n ? a === r || a.slice(0, r.length + 1) === r + "-" : !1) : !0
                    }
                },
                CHILD: function(e, t, n, r, i) {
                    var a = "nth" !== e.slice(0, 3),
                        o = "last" !== e.slice(-4),
                        s = "of-type" === t;
                    return 1 === r && 0 === i ? function(e) {
                        return !!e.parentNode
                    } : function(t, n, l) {
                        var u, c, d, h, p, f, v = a !== o ? "nextSibling" : "previousSibling",
                            g = t.parentNode,
                            y = s && t.nodeName.toLowerCase(),
                            m = !l && !s;
                        if (g) {
                            if (a) {
                                for (; v;) {
                                    for (d = t; d = d[v];)
                                        if (s ? d.nodeName.toLowerCase() === y : 1 === d.nodeType) return !1;
                                    f = v = "only" === e && !f && "nextSibling"
                                }
                                return !0
                            }
                            if (f = [o ? g.firstChild : g.lastChild], o && m) {
                                for (c = g[j] || (g[j] = {}), u = c[e] || [], p = u[0] === q && u[1], h = u[0] === q && u[2], d = p && g.childNodes[p]; d = ++p && d && d[v] || (h = p = 0) || f.pop();)
                                    if (1 === d.nodeType && ++h && d === t) {
                                        c[e] = [q, p, h];
                                        break
                                    }
                            } else if (m && (u = (t[j] || (t[j] = {}))[e]) && u[0] === q) h = u[1];
                            else
                                for (;
                                    (d = ++p && d && d[v] || (h = p = 0) || f.pop()) && ((s ? d.nodeName.toLowerCase() !== y : 1 !== d.nodeType) || !++h || (m && ((d[j] || (d[j] = {}))[e] = [q, h]), d !== t)););
                            return h -= i, h === r || h % r === 0 && h / r >= 0
                        }
                    }
                },
                PSEUDO: function(e, n) {
                    var i, a = _.pseudos[e] || _.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    return a[j] ? a(n) : a.length > 1 ? (i = [e, e, "", n], _.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function(e, t) {
                        for (var r, i = a(e, n), o = i.length; o--;) r = ee(e, i[o]), e[r] = !(t[r] = i[o])
                    }) : function(e) {
                        return a(e, 0, i)
                    }) : a
                }
            },
            pseudos: {
                not: r(function(e) {
                    var t = [],
                        n = [],
                        i = C(e.replace(le, "$1"));
                    return i[j] ? r(function(e, t, n, r) {
                        for (var a, o = i(e, null, r, []), s = e.length; s--;)(a = o[s]) && (e[s] = !(t[s] = a))
                    }) : function(e, r, a) {
                        return t[0] = e, i(t, null, a, n), t[0] = null, !n.pop()
                    }
                }),
                has: r(function(e) {
                    return function(n) {
                        return t(e, n).length > 0
                    }
                }),
                contains: r(function(e) {
                    return e = e.replace(we, _e),
                        function(t) {
                            return (t.textContent || t.innerText || E(t)).indexOf(e) > -1
                        }
                }),
                lang: r(function(e) {
                    return pe.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(we, _e).toLowerCase(),
                        function(t) {
                            var n;
                            do
                                if (n = O ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                            return !1
                        }
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                },
                root: function(e) {
                    return e === L
                },
                focus: function(e) {
                    return e === B.activeElement && (!B.hasFocus || B.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: function(e) {
                    return e.disabled === !1
                },
                disabled: function(e) {
                    return e.disabled === !0
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6) return !1;
                    return !0
                },
                parent: function(e) {
                    return !_.pseudos.empty(e)
                },
                header: function(e) {
                    return ge.test(e.nodeName)
                },
                input: function(e) {
                    return ve.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                },
                first: u(function() {
                    return [0]
                }),
                last: u(function(e, t) {
                    return [t - 1]
                }),
                eq: u(function(e, t, n) {
                    return [0 > n ? n + t : n]
                }),
                even: u(function(e, t) {
                    for (var n = 0; t > n; n += 2) e.push(n);
                    return e
                }),
                odd: u(function(e, t) {
                    for (var n = 1; t > n; n += 2) e.push(n);
                    return e
                }),
                lt: u(function(e, t, n) {
                    for (var r = 0 > n ? n + t : n; --r >= 0;) e.push(r);
                    return e
                }),
                gt: u(function(e, t, n) {
                    for (var r = 0 > n ? n + t : n; ++r < t;) e.push(r);
                    return e
                })
            }
        }, _.pseudos.nth = _.pseudos.eq;
        for (b in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) _.pseudos[b] = s(b);
        for (b in {
                submit: !0,
                reset: !0
            }) _.pseudos[b] = l(b);
        return d.prototype = _.filters = _.pseudos, _.setFilters = new d, S = t.tokenize = function(e, n) {
            var r, i, a, o, s, l, u, c = H[e + " "];
            if (c) return n ? 0 : c.slice(0);
            for (s = e, l = [], u = _.preFilter; s;) {
                (!r || (i = ue.exec(s))) && (i && (s = s.slice(i[0].length) || s), l.push(a = [])), r = !1, (i = ce.exec(s)) && (r = i.shift(), a.push({
                    value: r,
                    type: i[0].replace(le, " ")
                }), s = s.slice(r.length));
                for (o in _.filter) !(i = fe[o].exec(s)) || u[o] && !(i = u[o](i)) || (r = i.shift(),
                    a.push({
                        value: r,
                        type: o,
                        matches: i
                    }), s = s.slice(r.length));
                if (!r) break
            }
            return n ? s.length : s ? t.error(e) : H(e, l).slice(0)
        }, C = t.compile = function(e, t) {
            var n, r = [],
                i = [],
                a = Y[e + " "];
            if (!a) {
                for (t || (t = S(e)), n = t.length; n--;) a = m(t[n]), a[j] ? r.push(a) : i.push(a);
                a = Y(e, x(i, r)), a.selector = e
            }
            return a
        }, k = t.select = function(e, t, n, r) {
            var i, a, o, s, l, u = "function" == typeof e && e,
                d = !r && S(e = u.selector || e);
            if (n = n || [], 1 === d.length) {
                if (a = d[0] = d[0].slice(0), a.length > 2 && "ID" === (o = a[0]).type && w.getById && 9 === t.nodeType && O && _.relative[a[1].type]) {
                    if (t = (_.find.ID(o.matches[0].replace(we, _e), t) || [])[0], !t) return n;
                    u && (t = t.parentNode), e = e.slice(a.shift().value.length)
                }
                for (i = fe.needsContext.test(e) ? 0 : a.length; i-- && (o = a[i], !_.relative[s = o.type]);)
                    if ((l = _.find[s]) && (r = l(o.matches[0].replace(we, _e), xe.test(a[0].type) && c(t.parentNode) || t))) {
                        if (a.splice(i, 1), e = r.length && h(a), !e) return J.apply(n, r), n;
                        break
                    }
            }
            return (u || C(e, d))(r, t, !O, n, xe.test(e) && c(t.parentNode) || t), n
        }, w.sortStable = j.split("").sort($).join("") === j, w.detectDuplicates = !!P, M(), w.sortDetached = i(function(e) {
            return 1 & e.compareDocumentPosition(B.createElement("div"))
        }), i(function(e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || a("type|href|height|width", function(e, t, n) {
            return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), w.attributes && i(function(e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || a("value", function(e, t, n) {
            return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
        }), i(function(e) {
            return null == e.getAttribute("disabled")
        }) || a(te, function(e, t, n) {
            var r;
            return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }), t
    }(e);
    ie.find = ue, ie.expr = ue.selectors, ie.expr[":"] = ie.expr.pseudos, ie.unique = ue.uniqueSort, ie.text = ue.getText, ie.isXMLDoc = ue.isXML, ie.contains = ue.contains;
    var ce = ie.expr.match.needsContext,
        de = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        he = /^.[^:#\[\.,]*$/;
    ie.filter = function(e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? ie.find.matchesSelector(r, e) ? [r] : [] : ie.find.matches(e, ie.grep(t, function(e) {
            return 1 === e.nodeType
        }))
    }, ie.fn.extend({
        find: function(e) {
            var t, n = [],
                r = this,
                i = r.length;
            if ("string" != typeof e) return this.pushStack(ie(e).filter(function() {
                for (t = 0; i > t; t++)
                    if (ie.contains(r[t], this)) return !0
            }));
            for (t = 0; i > t; t++) ie.find(e, r[t], n);
            return n = this.pushStack(i > 1 ? ie.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
        },
        filter: function(e) {
            return this.pushStack(r(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(r(this, e || [], !0))
        },
        is: function(e) {
            return !!r(this, "string" == typeof e && ce.test(e) ? ie(e) : e || [], !1).length
        }
    });
    var pe, fe = e.document,
        ve = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        ge = ie.fn.init = function(e, t) {
            var n, r;
            if (!e) return this;
            if ("string" == typeof e) {
                if (n = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : ve.exec(e), !n || !n[1] && t) return !t || t.jquery ? (t || pe).find(e) : this.constructor(t).find(e);
                if (n[1]) {
                    if (t = t instanceof ie ? t[0] : t, ie.merge(this, ie.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : fe, !0)), de.test(n[1]) && ie.isPlainObject(t))
                        for (n in t) ie.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                    return this
                }
                if (r = fe.getElementById(n[2]), r && r.parentNode) {
                    if (r.id !== n[2]) return pe.find(e);
                    this.length = 1, this[0] = r
                }
                return this.context = fe, this.selector = e, this
            }
            return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : ie.isFunction(e) ? "undefined" != typeof pe.ready ? pe.ready(e) : e(ie) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), ie.makeArray(e, this))
        };
    ge.prototype = ie.fn, pe = ie(fe);
    var ye = /^(?:parents|prev(?:Until|All))/,
        me = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    ie.extend({
        dir: function(e, t, n) {
            for (var r = [], i = e[t]; i && 9 !== i.nodeType && (void 0 === n || 1 !== i.nodeType || !ie(i).is(n));) 1 === i.nodeType && r.push(i), i = i[t];
            return r
        },
        sibling: function(e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        }
    }), ie.fn.extend({
        has: function(e) {
            var t, n = ie(e, this),
                r = n.length;
            return this.filter(function() {
                for (t = 0; r > t; t++)
                    if (ie.contains(this, n[t])) return !0
            })
        },
        closest: function(e, t) {
            for (var n, r = 0, i = this.length, a = [], o = ce.test(e) || "string" != typeof e ? ie(e, t || this.context) : 0; i > r; r++)
                for (n = this[r]; n && n !== t; n = n.parentNode)
                    if (n.nodeType < 11 && (o ? o.index(n) > -1 : 1 === n.nodeType && ie.find.matchesSelector(n, e))) {
                        a.push(n);
                        break
                    }
            return this.pushStack(a.length > 1 ? ie.unique(a) : a)
        },
        index: function(e) {
            return e ? "string" == typeof e ? ie.inArray(this[0], ie(e)) : ie.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(ie.unique(ie.merge(this.get(), ie(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), ie.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return ie.dir(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return ie.dir(e, "parentNode", n)
        },
        next: function(e) {
            return i(e, "nextSibling")
        },
        prev: function(e) {
            return i(e, "previousSibling")
        },
        nextAll: function(e) {
            return ie.dir(e, "nextSibling")
        },
        prevAll: function(e) {
            return ie.dir(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return ie.dir(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return ie.dir(e, "previousSibling", n)
        },
        siblings: function(e) {
            return ie.sibling((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return ie.sibling(e.firstChild)
        },
        contents: function(e) {
            return ie.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : ie.merge([], e.childNodes)
        }
    }, function(e, t) {
        ie.fn[e] = function(n, r) {
            var i = ie.map(this, t, n);
            return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = ie.filter(r, i)), this.length > 1 && (me[e] || (i = ie.unique(i)), ye.test(e) && (i = i.reverse())), this.pushStack(i)
        }
    });
    var xe = /\S+/g,
        be = {};
    ie.Callbacks = function(e) {
        e = "string" == typeof e ? be[e] || a(e) : ie.extend({}, e);
        var t, n, r, i, o, s, l = [],
            u = !e.once && [],
            c = function(a) {
                for (n = e.memory && a, r = !0, o = s || 0, s = 0, i = l.length, t = !0; l && i > o; o++)
                    if (l[o].apply(a[0], a[1]) === !1 && e.stopOnFalse) {
                        n = !1;
                        break
                    }
                t = !1, l && (u ? u.length && c(u.shift()) : n ? l = [] : d.disable())
            },
            d = {
                add: function() {
                    if (l) {
                        var r = l.length;
                        ! function a(t) {
                            ie.each(t, function(t, n) {
                                var r = ie.type(n);
                                "function" === r ? e.unique && d.has(n) || l.push(n) : n && n.length && "string" !== r && a(n)
                            })
                        }(arguments), t ? i = l.length : n && (s = r, c(n))
                    }
                    return this
                },
                remove: function() {
                    return l && ie.each(arguments, function(e, n) {
                        for (var r;
                            (r = ie.inArray(n, l, r)) > -1;) l.splice(r, 1), t && (i >= r && i--, o >= r && o--)
                    }), this
                },
                has: function(e) {
                    return e ? ie.inArray(e, l) > -1 : !(!l || !l.length)
                },
                empty: function() {
                    return l = [], i = 0, this
                },
                disable: function() {
                    return l = u = n = void 0, this
                },
                disabled: function() {
                    return !l
                },
                lock: function() {
                    return u = void 0, n || d.disable(), this
                },
                locked: function() {
                    return !u
                },
                fireWith: function(e, n) {
                    return !l || r && !u || (n = n || [], n = [e, n.slice ? n.slice() : n], t ? u.push(n) : c(n)), this
                },
                fire: function() {
                    return d.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!r
                }
            };
        return d
    }, ie.extend({
        Deferred: function(e) {
            var t = [
                    ["resolve", "done", ie.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", ie.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", ie.Callbacks("memory")]
                ],
                n = "pending",
                r = {
                    state: function() {
                        return n
                    },
                    always: function() {
                        return i.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var e = arguments;
                        return ie.Deferred(function(n) {
                            ie.each(t, function(t, a) {
                                var o = ie.isFunction(e[t]) && e[t];
                                i[a[1]](function() {
                                    var e = o && o.apply(this, arguments);
                                    e && ie.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[a[0] + "With"](this === r ? n.promise() : this, o ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? ie.extend(e, r) : r
                    }
                },
                i = {};
            return r.pipe = r.then, ie.each(t, function(e, a) {
                var o = a[2],
                    s = a[3];
                r[a[1]] = o.add, s && o.add(function() {
                    n = s
                }, t[1 ^ e][2].disable, t[2][2].lock), i[a[0]] = function() {
                    return i[a[0] + "With"](this === i ? r : this, arguments), this
                }, i[a[0] + "With"] = o.fireWith
            }), r.promise(i), e && e.call(i, i), i
        },
        when: function(e) {
            var t, n, r, i = 0,
                a = Z.call(arguments),
                o = a.length,
                s = 1 !== o || e && ie.isFunction(e.promise) ? o : 0,
                l = 1 === s ? e : ie.Deferred(),
                u = function(e, n, r) {
                    return function(i) {
                        n[e] = this, r[e] = arguments.length > 1 ? Z.call(arguments) : i, r === t ? l.notifyWith(n, r) : --s || l.resolveWith(n, r)
                    }
                };
            if (o > 1)
                for (t = new Array(o), n = new Array(o), r = new Array(o); o > i; i++) a[i] && ie.isFunction(a[i].promise) ? a[i].promise().done(u(i, r, a)).fail(l.reject).progress(u(i, n, t)) : --s;
            return s || l.resolveWith(r, a), l.promise()
        }
    });
    var we;
    ie.fn.ready = function(e) {
        return ie.ready.promise().done(e), this
    }, ie.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? ie.readyWait++ : ie.ready(!0)
        },
        ready: function(e) {
            if (e === !0 ? !--ie.readyWait : !ie.isReady) {
                if (!fe.body) return setTimeout(ie.ready);
                ie.isReady = !0, e !== !0 && --ie.readyWait > 0 || (we.resolveWith(fe, [ie]), ie.fn.triggerHandler && (ie(fe).triggerHandler("ready"), ie(fe).off("ready")))
            }
        }
    }), ie.ready.promise = function(t) {
        if (!we)
            if (we = ie.Deferred(), "complete" === fe.readyState) setTimeout(ie.ready);
            else if (fe.addEventListener) fe.addEventListener("DOMContentLoaded", s, !1), e.addEventListener("load", s, !1);
        else {
            fe.attachEvent("onreadystatechange", s), e.attachEvent("onload", s);
            var n = !1;
            try {
                n = null == e.frameElement && fe.documentElement
            } catch (r) {}
            n && n.doScroll && ! function i() {
                if (!ie.isReady) {
                    try {
                        n.doScroll("left")
                    } catch (e) {
                        return setTimeout(i, 50)
                    }
                    o(), ie.ready()
                }
            }()
        }
        return we.promise(t)
    };
    var _e, Ee = "undefined";
    for (_e in ie(ne)) break;
    ne.ownLast = "0" !== _e, ne.inlineBlockNeedsLayout = !1, ie(function() {
            var e, t, n, r;
            n = fe.getElementsByTagName("body")[0], n && n.style && (t = fe.createElement("div"), r = fe.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(r).appendChild(t), typeof t.style.zoom !== Ee && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", ne.inlineBlockNeedsLayout = e = 3 === t.offsetWidth, e && (n.style.zoom = 1)), n.removeChild(r))
        }),
        function() {
            var e = fe.createElement("div");
            if (null == ne.deleteExpando) {
                ne.deleteExpando = !0;
                try {
                    delete e.test
                } catch (t) {
                    ne.deleteExpando = !1
                }
            }
            e = null
        }(), ie.acceptData = function(e) {
            var t = ie.noData[(e.nodeName + " ").toLowerCase()],
                n = +e.nodeType || 1;
            return 1 !== n && 9 !== n ? !1 : !t || t !== !0 && e.getAttribute("classid") === t
        };
    var Te = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        Se = /([A-Z])/g;
    ie.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(e) {
            return e = e.nodeType ? ie.cache[e[ie.expando]] : e[ie.expando], !!e && !u(e)
        },
        data: function(e, t, n) {
            return c(e, t, n)
        },
        removeData: function(e, t) {
            return d(e, t)
        },
        _data: function(e, t, n) {
            return c(e, t, n, !0)
        },
        _removeData: function(e, t) {
            return d(e, t, !0)
        }
    }), ie.fn.extend({
        data: function(e, t) {
            var n, r, i, a = this[0],
                o = a && a.attributes;
            if (void 0 === e) {
                if (this.length && (i = ie.data(a), 1 === a.nodeType && !ie._data(a, "parsedAttrs"))) {
                    for (n = o.length; n--;) o[n] && (r = o[n].name, 0 === r.indexOf("data-") && (r = ie.camelCase(r.slice(5)), l(a, r, i[r])));
                    ie._data(a, "parsedAttrs", !0)
                }
                return i
            }
            return "object" == typeof e ? this.each(function() {
                ie.data(this, e)
            }) : arguments.length > 1 ? this.each(function() {
                ie.data(this, e, t)
            }) : a ? l(a, e, ie.data(a, e)) : void 0
        },
        removeData: function(e) {
            return this.each(function() {
                ie.removeData(this, e)
            })
        }
    }), ie.extend({
        queue: function(e, t, n) {
            var r;
            return e ? (t = (t || "fx") + "queue", r = ie._data(e, t), n && (!r || ie.isArray(n) ? r = ie._data(e, t, ie.makeArray(n)) : r.push(n)), r || []) : void 0
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = ie.queue(e, t),
                r = n.length,
                i = n.shift(),
                a = ie._queueHooks(e, t),
                o = function() {
                    ie.dequeue(e, t)
                };
            "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete a.stop, i.call(e, o, a)), !r && a && a.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return ie._data(e, n) || ie._data(e, n, {
                empty: ie.Callbacks("once memory").add(function() {
                    ie._removeData(e, t + "queue"), ie._removeData(e, n)
                })
            })
        }
    }), ie.fn.extend({
        queue: function(e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? ie.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                var n = ie.queue(this, e, t);
                ie._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && ie.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                ie.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, r = 1,
                i = ie.Deferred(),
                a = this,
                o = this.length,
                s = function() {
                    --r || i.resolveWith(a, [a])
                };
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; o--;) n = ie._data(a[o], e + "queueHooks"), n && n.empty && (r++, n.empty.add(s));
            return s(), i.promise(t)
        }
    });
    var Ce = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        ke = ["Top", "Right", "Bottom", "Left"],
        De = function(e, t) {
            return e = t || e, "none" === ie.css(e, "display") || !ie.contains(e.ownerDocument, e)
        },
        Ne = ie.access = function(e, t, n, r, i, a, o) {
            var s = 0,
                l = e.length,
                u = null == n;
            if ("object" === ie.type(n)) {
                i = !0;
                for (s in n) ie.access(e, t, s, n[s], !0, a, o)
            } else if (void 0 !== r && (i = !0, ie.isFunction(r) || (o = !0), u && (o ? (t.call(e, r), t = null) : (u = t, t = function(e, t, n) {
                    return u.call(ie(e), n)
                })), t))
                for (; l > s; s++) t(e[s], n, o ? r : r.call(e[s], s, t(e[s], n)));
            return i ? e : u ? t.call(e) : l ? t(e[0], n) : a
        },
        Pe = /^(?:checkbox|radio)$/i;
    ! function() {
        var e = fe.createElement("input"),
            t = fe.createElement("div"),
            n = fe.createDocumentFragment();
        if (t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", ne.leadingWhitespace = 3 === t.firstChild.nodeType, ne.tbody = !t.getElementsByTagName("tbody").length, ne.htmlSerialize = !!t.getElementsByTagName("link").length, ne.html5Clone = "<:nav></:nav>" !== fe.createElement("nav").cloneNode(!0).outerHTML, e.type = "checkbox", e.checked = !0, n.appendChild(e), ne.appendChecked = e.checked, t.innerHTML = "<textarea>x</textarea>", ne.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue, n.appendChild(t), t.innerHTML = "<input type='radio' checked='checked' name='t'/>", ne.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, ne.noCloneEvent = !0, t.attachEvent && (t.attachEvent("onclick", function() {
                ne.noCloneEvent = !1
            }), t.cloneNode(!0).click()), null == ne.deleteExpando) {
            ne.deleteExpando = !0;
            try {
                delete t.test
            } catch (r) {
                ne.deleteExpando = !1
            }
        }
    }(),
    function() {
        var t, n, r = fe.createElement("div");
        for (t in {
                submit: !0,
                change: !0,
                focusin: !0
            }) n = "on" + t, (ne[t + "Bubbles"] = n in e) || (r.setAttribute(n, "t"), ne[t + "Bubbles"] = r.attributes[n].expando === !1);
        r = null
    }();
    var Me = /^(?:input|select|textarea)$/i,
        Be = /^key/,
        Le = /^(?:mouse|pointer|contextmenu)|click/,
        Oe = /^(?:focusinfocus|focusoutblur)$/,
        Ae = /^([^.]*)(?:\.(.+)|)$/;
    ie.event = {
        global: {},
        add: function(e, t, n, r, i) {
            var a, o, s, l, u, c, d, h, p, f, v, g = ie._data(e);
            if (g) {
                for (n.handler && (l = n, n = l.handler, i = l.selector), n.guid || (n.guid = ie.guid++), (o = g.events) || (o = g.events = {}), (c = g.handle) || (c = g.handle = function(e) {
                        return typeof ie === Ee || e && ie.event.triggered === e.type ? void 0 : ie.event.dispatch.apply(c.elem, arguments)
                    }, c.elem = e), t = (t || "").match(xe) || [""], s = t.length; s--;) a = Ae.exec(t[s]) || [], p = v = a[1], f = (a[2] || "").split(".").sort(), p && (u = ie.event.special[p] || {}, p = (i ? u.delegateType : u.bindType) || p, u = ie.event.special[p] || {}, d = ie.extend({
                    type: p,
                    origType: v,
                    data: r,
                    handler: n,
                    guid: n.guid,
                    selector: i,
                    needsContext: i && ie.expr.match.needsContext.test(i),
                    namespace: f.join(".")
                }, l), (h = o[p]) || (h = o[p] = [], h.delegateCount = 0, u.setup && u.setup.call(e, r, f, c) !== !1 || (e.addEventListener ? e.addEventListener(p, c, !1) : e.attachEvent && e.attachEvent("on" + p, c))), u.add && (u.add.call(e, d), d.handler.guid || (d.handler.guid = n.guid)), i ? h.splice(h.delegateCount++, 0, d) : h.push(d), ie.event.global[p] = !0);
                e = null
            }
        },
        remove: function(e, t, n, r, i) {
            var a, o, s, l, u, c, d, h, p, f, v, g = ie.hasData(e) && ie._data(e);
            if (g && (c = g.events)) {
                for (t = (t || "").match(xe) || [""], u = t.length; u--;)
                    if (s = Ae.exec(t[u]) || [], p = v = s[1], f = (s[2] || "").split(".").sort(), p) {
                        for (d = ie.event.special[p] || {}, p = (r ? d.delegateType : d.bindType) || p, h = c[p] || [], s = s[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = a = h.length; a--;) o = h[a], !i && v !== o.origType || n && n.guid !== o.guid || s && !s.test(o.namespace) || r && r !== o.selector && ("**" !== r || !o.selector) || (h.splice(a, 1), o.selector && h.delegateCount--, d.remove && d.remove.call(e, o));
                        l && !h.length && (d.teardown && d.teardown.call(e, f, g.handle) !== !1 || ie.removeEvent(e, p, g.handle), delete c[p])
                    } else
                        for (p in c) ie.event.remove(e, p + t[u], n, r, !0);
                ie.isEmptyObject(c) && (delete g.handle, ie._removeData(e, "events"))
            }
        },
        trigger: function(t, n, r, i) {
            var a, o, s, l, u, c, d, h = [r || fe],
                p = te.call(t, "type") ? t.type : t,
                f = te.call(t, "namespace") ? t.namespace.split(".") : [];
            if (s = c = r = r || fe, 3 !== r.nodeType && 8 !== r.nodeType && !Oe.test(p + ie.event.triggered) && (p.indexOf(".") >= 0 && (f = p.split("."), p = f.shift(), f.sort()), o = p.indexOf(":") < 0 && "on" + p, t = t[ie.expando] ? t : new ie.Event(p, "object" == typeof t && t), t.isTrigger = i ? 2 : 3, t.namespace = f.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = r), n = null == n ? [t] : ie.makeArray(n, [t]), u = ie.event.special[p] || {}, i || !u.trigger || u.trigger.apply(r, n) !== !1)) {
                if (!i && !u.noBubble && !ie.isWindow(r)) {
                    for (l = u.delegateType || p, Oe.test(l + p) || (s = s.parentNode); s; s = s.parentNode) h.push(s), c = s;
                    c === (r.ownerDocument || fe) && h.push(c.defaultView || c.parentWindow || e)
                }
                for (d = 0;
                    (s = h[d++]) && !t.isPropagationStopped();) t.type = d > 1 ? l : u.bindType || p, a = (ie._data(s, "events") || {})[t.type] && ie._data(s, "handle"), a && a.apply(s, n), a = o && s[o], a && a.apply && ie.acceptData(s) && (t.result = a.apply(s, n), t.result === !1 && t.preventDefault());
                if (t.type = p, !i && !t.isDefaultPrevented() && (!u._default || u._default.apply(h.pop(), n) === !1) && ie.acceptData(r) && o && r[p] && !ie.isWindow(r)) {
                    c = r[o], c && (r[o] = null), ie.event.triggered = p;
                    try {
                        r[p]()
                    } catch (v) {}
                    ie.event.triggered = void 0, c && (r[o] = c)
                }
                return t.result
            }
        },
        dispatch: function(e) {
            e = ie.event.fix(e);
            var t, n, r, i, a, o = [],
                s = Z.call(arguments),
                l = (ie._data(this, "events") || {})[e.type] || [],
                u = ie.event.special[e.type] || {};
            if (s[0] = e, e.delegateTarget = this, !u.preDispatch || u.preDispatch.call(this, e) !== !1) {
                for (o = ie.event.handlers.call(this, e, l), t = 0;
                    (i = o[t++]) && !e.isPropagationStopped();)
                    for (e.currentTarget = i.elem, a = 0;
                        (r = i.handlers[a++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(r.namespace)) && (e.handleObj = r, e.data = r.data, n = ((ie.event.special[r.origType] || {}).handle || r.handler).apply(i.elem, s), void 0 !== n && (e.result = n) === !1 && (e.preventDefault(), e.stopPropagation()));
                return u.postDispatch && u.postDispatch.call(this, e), e.result
            }
        },
        handlers: function(e, t) {
            var n, r, i, a, o = [],
                s = t.delegateCount,
                l = e.target;
            if (s && l.nodeType && (!e.button || "click" !== e.type))
                for (; l != this; l = l.parentNode || this)
                    if (1 === l.nodeType && (l.disabled !== !0 || "click" !== e.type)) {
                        for (i = [], a = 0; s > a; a++) r = t[a], n = r.selector + " ", void 0 === i[n] && (i[n] = r.needsContext ? ie(n, this).index(l) >= 0 : ie.find(n, this, null, [l]).length), i[n] && i.push(r);
                        i.length && o.push({
                            elem: l,
                            handlers: i
                        })
                    }
            return s < t.length && o.push({
                elem: this,
                handlers: t.slice(s)
            }), o
        },
        fix: function(e) {
            if (e[ie.expando]) return e;
            var t, n, r, i = e.type,
                a = e,
                o = this.fixHooks[i];
            for (o || (this.fixHooks[i] = o = Le.test(i) ? this.mouseHooks : Be.test(i) ? this.keyHooks : {}), r = o.props ? this.props.concat(o.props) : this.props, e = new ie.Event(a), t = r.length; t--;) n = r[t], e[n] = a[n];
            return e.target || (e.target = a.srcElement || fe), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, o.filter ? o.filter(e, a) : e
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, t) {
                var n, r, i, a = t.button,
                    o = t.fromElement;
                return null == e.pageX && null != t.clientX && (r = e.target.ownerDocument || fe, i = r.documentElement, n = r.body, e.pageX = t.clientX + (i && i.scrollLeft || n && n.scrollLeft || 0) - (i && i.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (i && i.scrollTop || n && n.scrollTop || 0) - (i && i.clientTop || n && n.clientTop || 0)), !e.relatedTarget && o && (e.relatedTarget = o === e.target ? t.toElement : o), e.which || void 0 === a || (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), e
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== f() && this.focus) try {
                        return this.focus(), !1
                    } catch (e) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === f() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return ie.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                },
                _default: function(e) {
                    return ie.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function(e, t, n, r) {
            var i = ie.extend(new ie.Event, n, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            r ? ie.event.trigger(i, null, t) : ie.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
        }
    }, ie.removeEvent = fe.removeEventListener ? function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    } : function(e, t, n) {
        var r = "on" + t;
        e.detachEvent && (typeof e[r] === Ee && (e[r] = null), e.detachEvent(r, n))
    }, ie.Event = function(e, t) {
        return this instanceof ie.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? h : p) : this.type = e, t && ie.extend(this, t), this.timeStamp = e && e.timeStamp || ie.now(), void(this[ie.expando] = !0)) : new ie.Event(e, t)
    }, ie.Event.prototype = {
        isDefaultPrevented: p,
        isPropagationStopped: p,
        isImmediatePropagationStopped: p,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = h, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = h, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = h, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, ie.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, t) {
        ie.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, r = this,
                    i = e.relatedTarget,
                    a = e.handleObj;
                return (!i || i !== r && !ie.contains(r, i)) && (e.type = a.origType, n = a.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), ne.submitBubbles || (ie.event.special.submit = {
        setup: function() {
            return ie.nodeName(this, "form") ? !1 : void ie.event.add(this, "click._submit keypress._submit", function(e) {
                var t = e.target,
                    n = ie.nodeName(t, "input") || ie.nodeName(t, "button") ? t.form : void 0;
                n && !ie._data(n, "submitBubbles") && (ie.event.add(n, "submit._submit", function(e) {
                    e._submit_bubble = !0
                }), ie._data(n, "submitBubbles", !0))
            })
        },
        postDispatch: function(e) {
            e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && ie.event.simulate("submit", this.parentNode, e, !0))
        },
        teardown: function() {
            return ie.nodeName(this, "form") ? !1 : void ie.event.remove(this, "._submit")
        }
    }), ne.changeBubbles || (ie.event.special.change = {
        setup: function() {
            return Me.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ie.event.add(this, "propertychange._change", function(e) {
                "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
            }), ie.event.add(this, "click._change", function(e) {
                this._just_changed && !e.isTrigger && (this._just_changed = !1), ie.event.simulate("change", this, e, !0)
            })), !1) : void ie.event.add(this, "beforeactivate._change", function(e) {
                var t = e.target;
                Me.test(t.nodeName) && !ie._data(t, "changeBubbles") && (ie.event.add(t, "change._change", function(e) {
                    !this.parentNode || e.isSimulated || e.isTrigger || ie.event.simulate("change", this.parentNode, e, !0)
                }), ie._data(t, "changeBubbles", !0))
            })
        },
        handle: function(e) {
            var t = e.target;
            return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
        },
        teardown: function() {
            return ie.event.remove(this, "._change"), !Me.test(this.nodeName)
        }
    }), ne.focusinBubbles || ie.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = function(e) {
            ie.event.simulate(t, e.target, ie.event.fix(e), !0)
        };
        ie.event.special[t] = {
            setup: function() {
                var r = this.ownerDocument || this,
                    i = ie._data(r, t);
                i || r.addEventListener(e, n, !0), ie._data(r, t, (i || 0) + 1)
            },
            teardown: function() {
                var r = this.ownerDocument || this,
                    i = ie._data(r, t) - 1;
                i ? ie._data(r, t, i) : (r.removeEventListener(e, n, !0), ie._removeData(r, t))
            }
        }
    }), ie.fn.extend({
        on: function(e, t, n, r, i) {
            var a, o;
            if ("object" == typeof e) {
                "string" != typeof t && (n = n || t, t = void 0);
                for (a in e) this.on(a, t, n, e[a], i);
                return this
            }
            if (null == n && null == r ? (r = t, n = t = void 0) : null == r && ("string" == typeof t ? (r = n, n = void 0) : (r = n, n = t, t = void 0)), r === !1) r = p;
            else if (!r) return this;
            return 1 === i && (o = r, r = function(e) {
                return ie().off(e), o.apply(this, arguments)
            }, r.guid = o.guid || (o.guid = ie.guid++)), this.each(function() {
                ie.event.add(this, e, r, n, t)
            })
        },
        one: function(e, t, n, r) {
            return this.on(e, t, n, r, 1)
        },
        off: function(e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj) return r = e.handleObj, ie(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
            if ("object" == typeof e) {
                for (i in e) this.off(i, t, e[i]);
                return this
            }
            return (t === !1 || "function" == typeof t) && (n = t, t = void 0), n === !1 && (n = p), this.each(function() {
                ie.event.remove(this, e, n, t)
            })
        },
        trigger: function(e, t) {
            return this.each(function() {
                ie.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            return n ? ie.event.trigger(e, t, n, !0) : void 0
        }
    });
    var Ie = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        ze = / jQuery\d+="(?:null|\d+)"/g,
        Re = new RegExp("<(?:" + Ie + ")[\\s/>]", "i"),
        je = /^\s+/,
        Fe = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        qe = /<([\w:]+)/,
        Ve = /<tbody/i,
        Xe = /<|&#?\w+;/,
        He = /<(?:script|style|link)/i,
        Ye = /checked\s*(?:[^=]|=\s*.checked.)/i,
        $e = /^$|\/(?:java|ecma)script/i,
        We = /^true\/(.*)/,
        Ue = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        Ze = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: ne.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        },
        Ge = v(fe),
        Ke = Ge.appendChild(fe.createElement("div"));
    Ze.optgroup = Ze.option, Ze.tbody = Ze.tfoot = Ze.colgroup = Ze.caption = Ze.thead, Ze.th = Ze.td, ie.extend({
        clone: function(e, t, n) {
            var r, i, a, o, s, l = ie.contains(e.ownerDocument, e);
            if (ne.html5Clone || ie.isXMLDoc(e) || !Re.test("<" + e.nodeName + ">") ? a = e.cloneNode(!0) : (Ke.innerHTML = e.outerHTML, Ke.removeChild(a = Ke.firstChild)), !(ne.noCloneEvent && ne.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || ie.isXMLDoc(e)))
                for (r = g(a), s = g(e), o = 0; null != (i = s[o]); ++o) r[o] && E(i, r[o]);
            if (t)
                if (n)
                    for (s = s || g(e), r = r || g(a), o = 0; null != (i = s[o]); o++) _(i, r[o]);
                else _(e, a);
            return r = g(a, "script"), r.length > 0 && w(r, !l && g(e, "script")), r = s = i = null, a
        },
        buildFragment: function(e, t, n, r) {
            for (var i, a, o, s, l, u, c, d = e.length, h = v(t), p = [], f = 0; d > f; f++)
                if (a = e[f], a || 0 === a)
                    if ("object" === ie.type(a)) ie.merge(p, a.nodeType ? [a] : a);
                    else if (Xe.test(a)) {
                for (s = s || h.appendChild(t.createElement("div")), l = (qe.exec(a) || ["", ""])[1].toLowerCase(), c = Ze[l] || Ze._default, s.innerHTML = c[1] + a.replace(Fe, "<$1></$2>") + c[2], i = c[0]; i--;) s = s.lastChild;
                if (!ne.leadingWhitespace && je.test(a) && p.push(t.createTextNode(je.exec(a)[0])), !ne.tbody)
                    for (a = "table" !== l || Ve.test(a) ? "<table>" !== c[1] || Ve.test(a) ? 0 : s : s.firstChild, i = a && a.childNodes.length; i--;) ie.nodeName(u = a.childNodes[i], "tbody") && !u.childNodes.length && a.removeChild(u);
                for (ie.merge(p, s.childNodes), s.textContent = ""; s.firstChild;) s.removeChild(s.firstChild);
                s = h.lastChild
            } else p.push(t.createTextNode(a));
            for (s && h.removeChild(s), ne.appendChecked || ie.grep(g(p, "input"), y), f = 0; a = p[f++];)
                if ((!r || -1 === ie.inArray(a, r)) && (o = ie.contains(a.ownerDocument, a), s = g(h.appendChild(a), "script"), o && w(s), n))
                    for (i = 0; a = s[i++];) $e.test(a.type || "") && n.push(a);
            return s = null, h
        },
        cleanData: function(e, t) {
            for (var n, r, i, a, o = 0, s = ie.expando, l = ie.cache, u = ne.deleteExpando, c = ie.event.special; null != (n = e[o]); o++)
                if ((t || ie.acceptData(n)) && (i = n[s], a = i && l[i])) {
                    if (a.events)
                        for (r in a.events) c[r] ? ie.event.remove(n, r) : ie.removeEvent(n, r, a.handle);
                    l[i] && (delete l[i], u ? delete n[s] : typeof n.removeAttribute !== Ee ? n.removeAttribute(s) : n[s] = null, U.push(i))
                }
        }
    }), ie.fn.extend({
        text: function(e) {
            return Ne(this, function(e) {
                return void 0 === e ? ie.text(this) : this.empty().append((this[0] && this[0].ownerDocument || fe).createTextNode(e))
            }, null, e, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = m(this, e);
                    t.appendChild(e)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = m(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        remove: function(e, t) {
            for (var n, r = e ? ie.filter(e, this) : this, i = 0; null != (n = r[i]); i++) t || 1 !== n.nodeType || ie.cleanData(g(n)), n.parentNode && (t && ie.contains(n.ownerDocument, n) && w(g(n, "script")), n.parentNode.removeChild(n));
            return this
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) {
                for (1 === e.nodeType && ie.cleanData(g(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
                e.options && ie.nodeName(e, "select") && (e.options.length = 0)
            }
            return this
        },
        clone: function(e, t) {
            return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
                return ie.clone(this, e, t)
            })
        },
        html: function(e) {
            return Ne(this, function(e) {
                var t = this[0] || {},
                    n = 0,
                    r = this.length;
                if (void 0 === e) return 1 === t.nodeType ? t.innerHTML.replace(ze, "") : void 0;
                if ("string" == typeof e && !He.test(e) && (ne.htmlSerialize || !Re.test(e)) && (ne.leadingWhitespace || !je.test(e)) && !Ze[(qe.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = e.replace(Fe, "<$1></$2>");
                    try {
                        for (; r > n; n++) t = this[n] || {}, 1 === t.nodeType && (ie.cleanData(g(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (i) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = arguments[0];
            return this.domManip(arguments, function(t) {
                e = this.parentNode, ie.cleanData(g(this)), e && e.replaceChild(t, this)
            }), e && (e.length || e.nodeType) ? this : this.remove()
        },
        detach: function(e) {
            return this.remove(e, !0)
        },
        domManip: function(e, t) {
            e = G.apply([], e);
            var n, r, i, a, o, s, l = 0,
                u = this.length,
                c = this,
                d = u - 1,
                h = e[0],
                p = ie.isFunction(h);
            if (p || u > 1 && "string" == typeof h && !ne.checkClone && Ye.test(h)) return this.each(function(n) {
                var r = c.eq(n);
                p && (e[0] = h.call(this, n, r.html())), r.domManip(e, t)
            });
            if (u && (s = ie.buildFragment(e, this[0].ownerDocument, !1, this), n = s.firstChild, 1 === s.childNodes.length && (s = n), n)) {
                for (a = ie.map(g(s, "script"), x), i = a.length; u > l; l++) r = s, l !== d && (r = ie.clone(r, !0, !0), i && ie.merge(a, g(r, "script"))), t.call(this[l], r, l);
                if (i)
                    for (o = a[a.length - 1].ownerDocument, ie.map(a, b), l = 0; i > l; l++) r = a[l], $e.test(r.type || "") && !ie._data(r, "globalEval") && ie.contains(o, r) && (r.src ? ie._evalUrl && ie._evalUrl(r.src) : ie.globalEval((r.text || r.textContent || r.innerHTML || "").replace(Ue, "")));
                s = n = null
            }
            return this
        }
    }), ie.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        ie.fn[e] = function(e) {
            for (var n, r = 0, i = [], a = ie(e), o = a.length - 1; o >= r; r++) n = r === o ? this : this.clone(!0), ie(a[r])[t](n), K.apply(i, n.get());
            return this.pushStack(i)
        }
    });
    var Je, Qe = {};
    ! function() {
        var e;
        ne.shrinkWrapBlocks = function() {
            if (null != e) return e;
            e = !1;
            var t, n, r;
            return n = fe.getElementsByTagName("body")[0], n && n.style ? (t = fe.createElement("div"), r = fe.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(r).appendChild(t), typeof t.style.zoom !== Ee && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", t.appendChild(fe.createElement("div")).style.width = "5px", e = 3 !== t.offsetWidth), n.removeChild(r), e) : void 0
        }
    }();
    var et, tt, nt = /^margin/,
        rt = new RegExp("^(" + Ce + ")(?!px)[a-z%]+$", "i"),
        it = /^(top|right|bottom|left)$/;
    e.getComputedStyle ? (et = function(t) {
            return t.ownerDocument.defaultView.opener ? t.ownerDocument.defaultView.getComputedStyle(t, null) : e.getComputedStyle(t, null)
        }, tt = function(e, t, n) {
            var r, i, a, o, s = e.style;
            return n = n || et(e), o = n ? n.getPropertyValue(t) || n[t] : void 0, n && ("" !== o || ie.contains(e.ownerDocument, e) || (o = ie.style(e, t)), rt.test(o) && nt.test(t) && (r = s.width, i = s.minWidth,
                a = s.maxWidth, s.minWidth = s.maxWidth = s.width = o, o = n.width, s.width = r, s.minWidth = i, s.maxWidth = a)), void 0 === o ? o : o + ""
        }) : fe.documentElement.currentStyle && (et = function(e) {
            return e.currentStyle
        }, tt = function(e, t, n) {
            var r, i, a, o, s = e.style;
            return n = n || et(e), o = n ? n[t] : void 0, null == o && s && s[t] && (o = s[t]), rt.test(o) && !it.test(t) && (r = s.left, i = e.runtimeStyle, a = i && i.left, a && (i.left = e.currentStyle.left), s.left = "fontSize" === t ? "1em" : o, o = s.pixelLeft + "px", s.left = r, a && (i.left = a)), void 0 === o ? o : o + "" || "auto"
        }),
        function() {
            function t() {
                var t, n, r, i;
                n = fe.getElementsByTagName("body")[0], n && n.style && (t = fe.createElement("div"), r = fe.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(r).appendChild(t), t.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", a = o = !1, l = !0, e.getComputedStyle && (a = "1%" !== (e.getComputedStyle(t, null) || {}).top, o = "4px" === (e.getComputedStyle(t, null) || {
                    width: "4px"
                }).width, i = t.appendChild(fe.createElement("div")), i.style.cssText = t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", i.style.marginRight = i.style.width = "0", t.style.width = "1px", l = !parseFloat((e.getComputedStyle(i, null) || {}).marginRight), t.removeChild(i)), t.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", i = t.getElementsByTagName("td"), i[0].style.cssText = "margin:0;border:0;padding:0;display:none", s = 0 === i[0].offsetHeight, s && (i[0].style.display = "", i[1].style.display = "none", s = 0 === i[0].offsetHeight), n.removeChild(r))
            }
            var n, r, i, a, o, s, l;
            n = fe.createElement("div"), n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", i = n.getElementsByTagName("a")[0], r = i && i.style, r && (r.cssText = "float:left;opacity:.5", ne.opacity = "0.5" === r.opacity, ne.cssFloat = !!r.cssFloat, n.style.backgroundClip = "content-box", n.cloneNode(!0).style.backgroundClip = "", ne.clearCloneStyle = "content-box" === n.style.backgroundClip, ne.boxSizing = "" === r.boxSizing || "" === r.MozBoxSizing || "" === r.WebkitBoxSizing, ie.extend(ne, {
                reliableHiddenOffsets: function() {
                    return null == s && t(), s
                },
                boxSizingReliable: function() {
                    return null == o && t(), o
                },
                pixelPosition: function() {
                    return null == a && t(), a
                },
                reliableMarginRight: function() {
                    return null == l && t(), l
                }
            }))
        }(), ie.swap = function(e, t, n, r) {
            var i, a, o = {};
            for (a in t) o[a] = e.style[a], e.style[a] = t[a];
            i = n.apply(e, r || []);
            for (a in t) e.style[a] = o[a];
            return i
        };
    var at = /alpha\([^)]*\)/i,
        ot = /opacity\s*=\s*([^)]*)/,
        st = /^(none|table(?!-c[ea]).+)/,
        lt = new RegExp("^(" + Ce + ")(.*)$", "i"),
        ut = new RegExp("^([+-])=(" + Ce + ")", "i"),
        ct = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        dt = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        ht = ["Webkit", "O", "Moz", "ms"];
    ie.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = tt(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": ne.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, a, o, s = ie.camelCase(t),
                    l = e.style;
                if (t = ie.cssProps[s] || (ie.cssProps[s] = k(l, s)), o = ie.cssHooks[t] || ie.cssHooks[s], void 0 === n) return o && "get" in o && void 0 !== (i = o.get(e, !1, r)) ? i : l[t];
                if (a = typeof n, "string" === a && (i = ut.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(ie.css(e, t)), a = "number"), null != n && n === n && ("number" !== a || ie.cssNumber[s] || (n += "px"), ne.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), !(o && "set" in o && void 0 === (n = o.set(e, n, r))))) try {
                    l[t] = n
                } catch (u) {}
            }
        },
        css: function(e, t, n, r) {
            var i, a, o, s = ie.camelCase(t);
            return t = ie.cssProps[s] || (ie.cssProps[s] = k(e.style, s)), o = ie.cssHooks[t] || ie.cssHooks[s], o && "get" in o && (a = o.get(e, !0, n)), void 0 === a && (a = tt(e, t, r)), "normal" === a && t in dt && (a = dt[t]), "" === n || n ? (i = parseFloat(a), n === !0 || ie.isNumeric(i) ? i || 0 : a) : a
        }
    }), ie.each(["height", "width"], function(e, t) {
        ie.cssHooks[t] = {
            get: function(e, n, r) {
                return n ? st.test(ie.css(e, "display")) && 0 === e.offsetWidth ? ie.swap(e, ct, function() {
                    return M(e, t, r)
                }) : M(e, t, r) : void 0
            },
            set: function(e, n, r) {
                var i = r && et(e);
                return N(e, n, r ? P(e, t, r, ne.boxSizing && "border-box" === ie.css(e, "boxSizing", !1, i), i) : 0)
            }
        }
    }), ne.opacity || (ie.cssHooks.opacity = {
        get: function(e, t) {
            return ot.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
        },
        set: function(e, t) {
            var n = e.style,
                r = e.currentStyle,
                i = ie.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
                a = r && r.filter || n.filter || "";
            n.zoom = 1, (t >= 1 || "" === t) && "" === ie.trim(a.replace(at, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || r && !r.filter) || (n.filter = at.test(a) ? a.replace(at, i) : a + " " + i)
        }
    }), ie.cssHooks.marginRight = C(ne.reliableMarginRight, function(e, t) {
        return t ? ie.swap(e, {
            display: "inline-block"
        }, tt, [e, "marginRight"]) : void 0
    }), ie.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        ie.cssHooks[e + t] = {
            expand: function(n) {
                for (var r = 0, i = {}, a = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++) i[e + ke[r] + t] = a[r] || a[r - 2] || a[0];
                return i
            }
        }, nt.test(e) || (ie.cssHooks[e + t].set = N)
    }), ie.fn.extend({
        css: function(e, t) {
            return Ne(this, function(e, t, n) {
                var r, i, a = {},
                    o = 0;
                if (ie.isArray(t)) {
                    for (r = et(e), i = t.length; i > o; o++) a[t[o]] = ie.css(e, t[o], !1, r);
                    return a
                }
                return void 0 !== n ? ie.style(e, t, n) : ie.css(e, t)
            }, e, t, arguments.length > 1)
        },
        show: function() {
            return D(this, !0)
        },
        hide: function() {
            return D(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                De(this) ? ie(this).show() : ie(this).hide()
            })
        }
    }), ie.Tween = B, B.prototype = {
        constructor: B,
        init: function(e, t, n, r, i, a) {
            this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = a || (ie.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = B.propHooks[this.prop];
            return e && e.get ? e.get(this) : B.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = B.propHooks[this.prop];
            return this.options.duration ? this.pos = t = ie.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : B.propHooks._default.set(this), this
        }
    }, B.prototype.init.prototype = B.prototype, B.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = ie.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
            },
            set: function(e) {
                ie.fx.step[e.prop] ? ie.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[ie.cssProps[e.prop]] || ie.cssHooks[e.prop]) ? ie.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    }, B.propHooks.scrollTop = B.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, ie.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    }, ie.fx = B.prototype.init, ie.fx.step = {};
    var pt, ft, vt = /^(?:toggle|show|hide)$/,
        gt = new RegExp("^(?:([+-])=|)(" + Ce + ")([a-z%]*)$", "i"),
        yt = /queueHooks$/,
        mt = [I],
        xt = {
            "*": [function(e, t) {
                var n = this.createTween(e, t),
                    r = n.cur(),
                    i = gt.exec(t),
                    a = i && i[3] || (ie.cssNumber[e] ? "" : "px"),
                    o = (ie.cssNumber[e] || "px" !== a && +r) && gt.exec(ie.css(n.elem, e)),
                    s = 1,
                    l = 20;
                if (o && o[3] !== a) {
                    a = a || o[3], i = i || [], o = +r || 1;
                    do s = s || ".5", o /= s, ie.style(n.elem, e, o + a); while (s !== (s = n.cur() / r) && 1 !== s && --l)
                }
                return i && (o = n.start = +o || +r || 0, n.unit = a, n.end = i[1] ? o + (i[1] + 1) * i[2] : +i[2]), n
            }]
        };
    ie.Animation = ie.extend(R, {
            tweener: function(e, t) {
                ie.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
                for (var n, r = 0, i = e.length; i > r; r++) n = e[r], xt[n] = xt[n] || [], xt[n].unshift(t)
            },
            prefilter: function(e, t) {
                t ? mt.unshift(e) : mt.push(e)
            }
        }), ie.speed = function(e, t, n) {
            var r = e && "object" == typeof e ? ie.extend({}, e) : {
                complete: n || !n && t || ie.isFunction(e) && e,
                duration: e,
                easing: n && t || t && !ie.isFunction(t) && t
            };
            return r.duration = ie.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in ie.fx.speeds ? ie.fx.speeds[r.duration] : ie.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function() {
                ie.isFunction(r.old) && r.old.call(this), r.queue && ie.dequeue(this, r.queue)
            }, r
        }, ie.fn.extend({
            fadeTo: function(e, t, n, r) {
                return this.filter(De).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, n, r)
            },
            animate: function(e, t, n, r) {
                var i = ie.isEmptyObject(e),
                    a = ie.speed(t, n, r),
                    o = function() {
                        var t = R(this, ie.extend({}, e), a);
                        (i || ie._data(this, "finish")) && t.stop(!0)
                    };
                return o.finish = o, i || a.queue === !1 ? this.each(o) : this.queue(a.queue, o)
            },
            stop: function(e, t, n) {
                var r = function(e) {
                    var t = e.stop;
                    delete e.stop, t(n)
                };
                return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                    var t = !0,
                        i = null != e && e + "queueHooks",
                        a = ie.timers,
                        o = ie._data(this);
                    if (i) o[i] && o[i].stop && r(o[i]);
                    else
                        for (i in o) o[i] && o[i].stop && yt.test(i) && r(o[i]);
                    for (i = a.length; i--;) a[i].elem !== this || null != e && a[i].queue !== e || (a[i].anim.stop(n), t = !1, a.splice(i, 1));
                    (t || !n) && ie.dequeue(this, e)
                })
            },
            finish: function(e) {
                return e !== !1 && (e = e || "fx"), this.each(function() {
                    var t, n = ie._data(this),
                        r = n[e + "queue"],
                        i = n[e + "queueHooks"],
                        a = ie.timers,
                        o = r ? r.length : 0;
                    for (n.finish = !0, ie.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = a.length; t--;) a[t].elem === this && a[t].queue === e && (a[t].anim.stop(!0), a.splice(t, 1));
                    for (t = 0; o > t; t++) r[t] && r[t].finish && r[t].finish.call(this);
                    delete n.finish
                })
            }
        }), ie.each(["toggle", "show", "hide"], function(e, t) {
            var n = ie.fn[t];
            ie.fn[t] = function(e, r, i) {
                return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(O(t, !0), e, r, i)
            }
        }), ie.each({
            slideDown: O("show"),
            slideUp: O("hide"),
            slideToggle: O("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(e, t) {
            ie.fn[e] = function(e, n, r) {
                return this.animate(t, e, n, r)
            }
        }), ie.timers = [], ie.fx.tick = function() {
            var e, t = ie.timers,
                n = 0;
            for (pt = ie.now(); n < t.length; n++) e = t[n], e() || t[n] !== e || t.splice(n--, 1);
            t.length || ie.fx.stop(), pt = void 0
        }, ie.fx.timer = function(e) {
            ie.timers.push(e), e() ? ie.fx.start() : ie.timers.pop()
        }, ie.fx.interval = 13, ie.fx.start = function() {
            ft || (ft = setInterval(ie.fx.tick, ie.fx.interval))
        }, ie.fx.stop = function() {
            clearInterval(ft), ft = null
        }, ie.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, ie.fn.delay = function(e, t) {
            return e = ie.fx ? ie.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
                var r = setTimeout(t, e);
                n.stop = function() {
                    clearTimeout(r)
                }
            })
        },
        function() {
            var e, t, n, r, i;
            t = fe.createElement("div"), t.setAttribute("className", "t"), t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", r = t.getElementsByTagName("a")[0], n = fe.createElement("select"), i = n.appendChild(fe.createElement("option")), e = t.getElementsByTagName("input")[0], r.style.cssText = "top:1px", ne.getSetAttribute = "t" !== t.className, ne.style = /top/.test(r.getAttribute("style")), ne.hrefNormalized = "/a" === r.getAttribute("href"), ne.checkOn = !!e.value, ne.optSelected = i.selected, ne.enctype = !!fe.createElement("form").enctype, n.disabled = !0, ne.optDisabled = !i.disabled, e = fe.createElement("input"), e.setAttribute("value", ""), ne.input = "" === e.getAttribute("value"), e.value = "t", e.setAttribute("type", "radio"), ne.radioValue = "t" === e.value
        }();
    var bt = /\r/g;
    ie.fn.extend({
        val: function(e) {
            var t, n, r, i = this[0]; {
                if (arguments.length) return r = ie.isFunction(e), this.each(function(n) {
                    var i;
                    1 === this.nodeType && (i = r ? e.call(this, n, ie(this).val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : ie.isArray(i) && (i = ie.map(i, function(e) {
                        return null == e ? "" : e + ""
                    })), t = ie.valHooks[this.type] || ie.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
                });
                if (i) return t = ie.valHooks[i.type] || ie.valHooks[i.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : (n = i.value, "string" == typeof n ? n.replace(bt, "") : null == n ? "" : n)
            }
        }
    }), ie.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = ie.find.attr(e, "value");
                    return null != t ? t : ie.trim(ie.text(e))
                }
            },
            select: {
                get: function(e) {
                    for (var t, n, r = e.options, i = e.selectedIndex, a = "select-one" === e.type || 0 > i, o = a ? null : [], s = a ? i + 1 : r.length, l = 0 > i ? s : a ? i : 0; s > l; l++)
                        if (n = r[l], (n.selected || l === i) && (ne.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !ie.nodeName(n.parentNode, "optgroup"))) {
                            if (t = ie(n).val(), a) return t;
                            o.push(t)
                        }
                    return o
                },
                set: function(e, t) {
                    for (var n, r, i = e.options, a = ie.makeArray(t), o = i.length; o--;)
                        if (r = i[o], ie.inArray(ie.valHooks.option.get(r), a) >= 0) try {
                            r.selected = n = !0
                        } catch (s) {
                            r.scrollHeight
                        } else r.selected = !1;
                    return n || (e.selectedIndex = -1), i
                }
            }
        }
    }), ie.each(["radio", "checkbox"], function() {
        ie.valHooks[this] = {
            set: function(e, t) {
                return ie.isArray(t) ? e.checked = ie.inArray(ie(e).val(), t) >= 0 : void 0
            }
        }, ne.checkOn || (ie.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var wt, _t, Et = ie.expr.attrHandle,
        Tt = /^(?:checked|selected)$/i,
        St = ne.getSetAttribute,
        Ct = ne.input;
    ie.fn.extend({
        attr: function(e, t) {
            return Ne(this, ie.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                ie.removeAttr(this, e)
            })
        }
    }), ie.extend({
        attr: function(e, t, n) {
            var r, i, a = e.nodeType;
            if (e && 3 !== a && 8 !== a && 2 !== a) return typeof e.getAttribute === Ee ? ie.prop(e, t, n) : (1 === a && ie.isXMLDoc(e) || (t = t.toLowerCase(), r = ie.attrHooks[t] || (ie.expr.match.bool.test(t) ? _t : wt)), void 0 === n ? r && "get" in r && null !== (i = r.get(e, t)) ? i : (i = ie.find.attr(e, t), null == i ? void 0 : i) : null !== n ? r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : void ie.removeAttr(e, t))
        },
        removeAttr: function(e, t) {
            var n, r, i = 0,
                a = t && t.match(xe);
            if (a && 1 === e.nodeType)
                for (; n = a[i++];) r = ie.propFix[n] || n, ie.expr.match.bool.test(n) ? Ct && St || !Tt.test(n) ? e[r] = !1 : e[ie.camelCase("default-" + n)] = e[r] = !1 : ie.attr(e, n, ""), e.removeAttribute(St ? n : r)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!ne.radioValue && "radio" === t && ie.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        }
    }), _t = {
        set: function(e, t, n) {
            return t === !1 ? ie.removeAttr(e, n) : Ct && St || !Tt.test(n) ? e.setAttribute(!St && ie.propFix[n] || n, n) : e[ie.camelCase("default-" + n)] = e[n] = !0, n
        }
    }, ie.each(ie.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var n = Et[t] || ie.find.attr;
        Et[t] = Ct && St || !Tt.test(t) ? function(e, t, r) {
            var i, a;
            return r || (a = Et[t], Et[t] = i, i = null != n(e, t, r) ? t.toLowerCase() : null, Et[t] = a), i
        } : function(e, t, n) {
            return n ? void 0 : e[ie.camelCase("default-" + t)] ? t.toLowerCase() : null
        }
    }), Ct && St || (ie.attrHooks.value = {
        set: function(e, t, n) {
            return ie.nodeName(e, "input") ? void(e.defaultValue = t) : wt && wt.set(e, t, n)
        }
    }), St || (wt = {
        set: function(e, t, n) {
            var r = e.getAttributeNode(n);
            return r || e.setAttributeNode(r = e.ownerDocument.createAttribute(n)), r.value = t += "", "value" === n || t === e.getAttribute(n) ? t : void 0
        }
    }, Et.id = Et.name = Et.coords = function(e, t, n) {
        var r;
        return n ? void 0 : (r = e.getAttributeNode(t)) && "" !== r.value ? r.value : null
    }, ie.valHooks.button = {
        get: function(e, t) {
            var n = e.getAttributeNode(t);
            return n && n.specified ? n.value : void 0
        },
        set: wt.set
    }, ie.attrHooks.contenteditable = {
        set: function(e, t, n) {
            wt.set(e, "" === t ? !1 : t, n)
        }
    }, ie.each(["width", "height"], function(e, t) {
        ie.attrHooks[t] = {
            set: function(e, n) {
                return "" === n ? (e.setAttribute(t, "auto"), n) : void 0
            }
        }
    })), ne.style || (ie.attrHooks.style = {
        get: function(e) {
            return e.style.cssText || void 0
        },
        set: function(e, t) {
            return e.style.cssText = t + ""
        }
    });
    var kt = /^(?:input|select|textarea|button|object)$/i,
        Dt = /^(?:a|area)$/i;
    ie.fn.extend({
        prop: function(e, t) {
            return Ne(this, ie.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return e = ie.propFix[e] || e, this.each(function() {
                try {
                    this[e] = void 0, delete this[e]
                } catch (t) {}
            })
        }
    }), ie.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(e, t, n) {
            var r, i, a, o = e.nodeType;
            if (e && 3 !== o && 8 !== o && 2 !== o) return a = 1 !== o || !ie.isXMLDoc(e), a && (t = ie.propFix[t] || t, i = ie.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = ie.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : kt.test(e.nodeName) || Dt.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        }
    }), ne.hrefNormalized || ie.each(["href", "src"], function(e, t) {
        ie.propHooks[t] = {
            get: function(e) {
                return e.getAttribute(t, 4)
            }
        }
    }), ne.optSelected || (ie.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
        }
    }), ie.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        ie.propFix[this.toLowerCase()] = this
    }), ne.enctype || (ie.propFix.enctype = "encoding");
    var Nt = /[\t\r\n\f]/g;
    ie.fn.extend({
        addClass: function(e) {
            var t, n, r, i, a, o, s = 0,
                l = this.length,
                u = "string" == typeof e && e;
            if (ie.isFunction(e)) return this.each(function(t) {
                ie(this).addClass(e.call(this, t, this.className))
            });
            if (u)
                for (t = (e || "").match(xe) || []; l > s; s++)
                    if (n = this[s], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Nt, " ") : " ")) {
                        for (a = 0; i = t[a++];) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                        o = ie.trim(r), n.className !== o && (n.className = o)
                    }
            return this
        },
        removeClass: function(e) {
            var t, n, r, i, a, o, s = 0,
                l = this.length,
                u = 0 === arguments.length || "string" == typeof e && e;
            if (ie.isFunction(e)) return this.each(function(t) {
                ie(this).removeClass(e.call(this, t, this.className))
            });
            if (u)
                for (t = (e || "").match(xe) || []; l > s; s++)
                    if (n = this[s], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Nt, " ") : "")) {
                        for (a = 0; i = t[a++];)
                            for (; r.indexOf(" " + i + " ") >= 0;) r = r.replace(" " + i + " ", " ");
                        o = e ? ie.trim(r) : "", n.className !== o && (n.className = o)
                    }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : ie.isFunction(e) ? this.each(function(n) {
                ie(this).toggleClass(e.call(this, n, this.className, t), t)
            }) : this.each(function() {
                if ("string" === n)
                    for (var t, r = 0, i = ie(this), a = e.match(xe) || []; t = a[r++];) i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
                else(n === Ee || "boolean" === n) && (this.className && ie._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : ie._data(this, "__className__") || "")
            })
        },
        hasClass: function(e) {
            for (var t = " " + e + " ", n = 0, r = this.length; r > n; n++)
                if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(Nt, " ").indexOf(t) >= 0) return !0;
            return !1
        }
    }), ie.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
        ie.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), ie.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        },
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    });
    var Pt = ie.now(),
        Mt = /\?/,
        Bt = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    ie.parseJSON = function(t) {
        if (e.JSON && e.JSON.parse) return e.JSON.parse(t + "");
        var n, r = null,
            i = ie.trim(t + "");
        return i && !ie.trim(i.replace(Bt, function(e, t, i, a) {
            return n && t && (r = 0), 0 === r ? e : (n = i || t, r += !a - !i, "")
        })) ? Function("return " + i)() : ie.error("Invalid JSON: " + t)
    }, ie.parseXML = function(t) {
        var n, r;
        if (!t || "string" != typeof t) return null;
        try {
            e.DOMParser ? (r = new DOMParser, n = r.parseFromString(t, "text/xml")) : (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(t))
        } catch (i) {
            n = void 0
        }
        return n && n.documentElement && !n.getElementsByTagName("parsererror").length || ie.error("Invalid XML: " + t), n
    };
    var Lt, Ot, At = /#.*$/,
        It = /([?&])_=[^&]*/,
        zt = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Rt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        jt = /^(?:GET|HEAD)$/,
        Ft = /^\/\//,
        qt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        Vt = {},
        Xt = {},
        Ht = "*/".concat("*");
    try {
        Ot = location.href
    } catch (Yt) {
        Ot = fe.createElement("a"), Ot.href = "", Ot = Ot.href
    }
    Lt = qt.exec(Ot.toLowerCase()) || [], ie.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Ot,
            type: "GET",
            isLocal: Rt.test(Lt[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Ht,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": ie.parseJSON,
                "text xml": ie.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? q(q(e, ie.ajaxSettings), t) : q(ie.ajaxSettings, e)
        },
        ajaxPrefilter: j(Vt),
        ajaxTransport: j(Xt),
        ajax: function(e, t) {
            function n(e, t, n, r) {
                var i, c, y, m, b, _ = t;
                2 !== x && (x = 2, s && clearTimeout(s), u = void 0, o = r || "", w.readyState = e > 0 ? 4 : 0, i = e >= 200 && 300 > e || 304 === e, n && (m = V(d, w, n)), m = X(d, m, w, i), i ? (d.ifModified && (b = w.getResponseHeader("Last-Modified"), b && (ie.lastModified[a] = b), b = w.getResponseHeader("etag"), b && (ie.etag[a] = b)), 204 === e || "HEAD" === d.type ? _ = "nocontent" : 304 === e ? _ = "notmodified" : (_ = m.state, c = m.data, y = m.error, i = !y)) : (y = _, (e || !_) && (_ = "error", 0 > e && (e = 0))), w.status = e, w.statusText = (t || _) + "", i ? f.resolveWith(h, [c, _, w]) : f.rejectWith(h, [w, _, y]), w.statusCode(g), g = void 0, l && p.trigger(i ? "ajaxSuccess" : "ajaxError", [w, d, i ? c : y]), v.fireWith(h, [w, _]), l && (p.trigger("ajaxComplete", [w, d]), --ie.active || ie.event.trigger("ajaxStop")))
            }
            "object" == typeof e && (t = e, e = void 0), t = t || {};
            var r, i, a, o, s, l, u, c, d = ie.ajaxSetup({}, t),
                h = d.context || d,
                p = d.context && (h.nodeType || h.jquery) ? ie(h) : ie.event,
                f = ie.Deferred(),
                v = ie.Callbacks("once memory"),
                g = d.statusCode || {},
                y = {},
                m = {},
                x = 0,
                b = "canceled",
                w = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (2 === x) {
                            if (!c)
                                for (c = {}; t = zt.exec(o);) c[t[1].toLowerCase()] = t[2];
                            t = c[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return 2 === x ? o : null
                    },
                    setRequestHeader: function(e, t) {
                        var n = e.toLowerCase();
                        return x || (e = m[n] = m[n] || e, y[e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return x || (d.mimeType = e), this
                    },
                    statusCode: function(e) {
                        var t;
                        if (e)
                            if (2 > x)
                                for (t in e) g[t] = [g[t], e[t]];
                            else w.always(e[w.status]);
                        return this
                    },
                    abort: function(e) {
                        var t = e || b;
                        return u && u.abort(t), n(0, t), this
                    }
                };
            if (f.promise(w).complete = v.add, w.success = w.done, w.error = w.fail, d.url = ((e || d.url || Ot) + "").replace(At, "").replace(Ft, Lt[1] + "//"), d.type = t.method || t.type || d.method || d.type, d.dataTypes = ie.trim(d.dataType || "*").toLowerCase().match(xe) || [""], null == d.crossDomain && (r = qt.exec(d.url.toLowerCase()), d.crossDomain = !(!r || r[1] === Lt[1] && r[2] === Lt[2] && (r[3] || ("http:" === r[1] ? "80" : "443")) === (Lt[3] || ("http:" === Lt[1] ? "80" : "443")))), d.data && d.processData && "string" != typeof d.data && (d.data = ie.param(d.data, d.traditional)), F(Vt, d, t, w), 2 === x) return w;
            l = ie.event && d.global, l && 0 === ie.active++ && ie.event.trigger("ajaxStart"), d.type = d.type.toUpperCase(), d.hasContent = !jt.test(d.type), a = d.url, d.hasContent || (d.data && (a = d.url += (Mt.test(a) ? "&" : "?") + d.data, delete d.data), d.cache === !1 && (d.url = It.test(a) ? a.replace(It, "$1_=" + Pt++) : a + (Mt.test(a) ? "&" : "?") + "_=" + Pt++)), d.ifModified && (ie.lastModified[a] && w.setRequestHeader("If-Modified-Since", ie.lastModified[a]), ie.etag[a] && w.setRequestHeader("If-None-Match", ie.etag[a])), (d.data && d.hasContent && d.contentType !== !1 || t.contentType) && w.setRequestHeader("Content-Type", d.contentType), w.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + Ht + "; q=0.01" : "") : d.accepts["*"]);
            for (i in d.headers) w.setRequestHeader(i, d.headers[i]);
            if (d.beforeSend && (d.beforeSend.call(h, w, d) === !1 || 2 === x)) return w.abort();
            b = "abort";
            for (i in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) w[i](d[i]);
            if (u = F(Xt, d, t, w)) {
                w.readyState = 1, l && p.trigger("ajaxSend", [w, d]), d.async && d.timeout > 0 && (s = setTimeout(function() {
                    w.abort("timeout")
                }, d.timeout));
                try {
                    x = 1, u.send(y, n)
                } catch (_) {
                    if (!(2 > x)) throw _;
                    n(-1, _)
                }
            } else n(-1, "No Transport");
            return w
        },
        getJSON: function(e, t, n) {
            return ie.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return ie.get(e, void 0, t, "script")
        }
    }), ie.each(["get", "post"], function(e, t) {
        ie[t] = function(e, n, r, i) {
            return ie.isFunction(n) && (i = i || r, r = n, n = void 0), ie.ajax({
                url: e,
                type: t,
                dataType: i,
                data: n,
                success: r
            })
        }
    }), ie._evalUrl = function(e) {
        return ie.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    }, ie.fn.extend({
        wrapAll: function(e) {
            if (ie.isFunction(e)) return this.each(function(t) {
                ie(this).wrapAll(e.call(this, t))
            });
            if (this[0]) {
                var t = ie(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                    for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        },
        wrapInner: function(e) {
            return ie.isFunction(e) ? this.each(function(t) {
                ie(this).wrapInner(e.call(this, t))
            }) : this.each(function() {
                var t = ie(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = ie.isFunction(e);
            return this.each(function(n) {
                ie(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                ie.nodeName(this, "body") || ie(this).replaceWith(this.childNodes)
            }).end()
        }
    }), ie.expr.filters.hidden = function(e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !ne.reliableHiddenOffsets() && "none" === (e.style && e.style.display || ie.css(e, "display"))
    }, ie.expr.filters.visible = function(e) {
        return !ie.expr.filters.hidden(e)
    };
    var $t = /%20/g,
        Wt = /\[\]$/,
        Ut = /\r?\n/g,
        Zt = /^(?:submit|button|image|reset|file)$/i,
        Gt = /^(?:input|select|textarea|keygen)/i;
    ie.param = function(e, t) {
        var n, r = [],
            i = function(e, t) {
                t = ie.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
        if (void 0 === t && (t = ie.ajaxSettings && ie.ajaxSettings.traditional), ie.isArray(e) || e.jquery && !ie.isPlainObject(e)) ie.each(e, function() {
            i(this.name, this.value)
        });
        else
            for (n in e) H(n, e[n], t, i);
        return r.join("&").replace($t, "+")
    }, ie.fn.extend({
        serialize: function() {
            return ie.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = ie.prop(this, "elements");
                return e ? ie.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !ie(this).is(":disabled") && Gt.test(this.nodeName) && !Zt.test(e) && (this.checked || !Pe.test(e))
            }).map(function(e, t) {
                var n = ie(this).val();
                return null == n ? null : ie.isArray(n) ? ie.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(Ut, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(Ut, "\r\n")
                }
            }).get()
        }
    }), ie.ajaxSettings.xhr = void 0 !== e.ActiveXObject ? function() {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && Y() || $()
    } : Y;
    var Kt = 0,
        Jt = {},
        Qt = ie.ajaxSettings.xhr();
    e.attachEvent && e.attachEvent("onunload", function() {
        for (var e in Jt) Jt[e](void 0, !0)
    }), ne.cors = !!Qt && "withCredentials" in Qt, Qt = ne.ajax = !!Qt, Qt && ie.ajaxTransport(function(e) {
        if (!e.crossDomain || ne.cors) {
            var t;
            return {
                send: function(n, r) {
                    var i, a = e.xhr(),
                        o = ++Kt;
                    if (a.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                        for (i in e.xhrFields) a[i] = e.xhrFields[i];
                    e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                    for (i in n) void 0 !== n[i] && a.setRequestHeader(i, n[i] + "");
                    a.send(e.hasContent && e.data || null), t = function(n, i) {
                        var s, l, u;
                        if (t && (i || 4 === a.readyState))
                            if (delete Jt[o], t = void 0, a.onreadystatechange = ie.noop, i) 4 !== a.readyState && a.abort();
                            else {
                                u = {}, s = a.status, "string" == typeof a.responseText && (u.text = a.responseText);
                                try {
                                    l = a.statusText
                                } catch (c) {
                                    l = ""
                                }
                                s || !e.isLocal || e.crossDomain ? 1223 === s && (s = 204) : s = u.text ? 200 : 404
                            }
                        u && r(s, l, u, a.getAllResponseHeaders())
                    }, e.async ? 4 === a.readyState ? setTimeout(t) : a.onreadystatechange = Jt[o] = t : t()
                },
                abort: function() {
                    t && t(void 0, !0)
                }
            }
        }
    }), ie.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(e) {
                return ie.globalEval(e), e
            }
        }
    }), ie.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
    }), ie.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var t, n = fe.head || ie("head")[0] || fe.documentElement;
            return {
                send: function(r, i) {
                    t = fe.createElement("script"), t.async = !0, e.scriptCharset && (t.charset = e.scriptCharset), t.src = e.url, t.onload = t.onreadystatechange = function(e, n) {
                        (n || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), t = null, n || i(200, "success"))
                    }, n.insertBefore(t, n.firstChild)
                },
                abort: function() {
                    t && t.onload(void 0, !0)
                }
            }
        }
    });
    var en = [],
        tn = /(=)\?(?=&|$)|\?\?/;
    ie.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = en.pop() || ie.expando + "_" + Pt++;
            return this[e] = !0, e
        }
    }), ie.ajaxPrefilter("json jsonp", function(t, n, r) {
        var i, a, o, s = t.jsonp !== !1 && (tn.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && tn.test(t.data) && "data");
        return s || "jsonp" === t.dataTypes[0] ? (i = t.jsonpCallback = ie.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(tn, "$1" + i) : t.jsonp !== !1 && (t.url += (Mt.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function() {
            return o || ie.error(i + " was not called"), o[0]
        }, t.dataTypes[0] = "json", a = e[i], e[i] = function() {
            o = arguments
        }, r.always(function() {
            e[i] = a, t[i] && (t.jsonpCallback = n.jsonpCallback, en.push(i)), o && ie.isFunction(a) && a(o[0]), o = a = void 0
        }), "script") : void 0
    }), ie.parseHTML = function(e, t, n) {
        if (!e || "string" != typeof e) return null;
        "boolean" == typeof t && (n = t, t = !1), t = t || fe;
        var r = de.exec(e),
            i = !n && [];
        return r ? [t.createElement(r[1])] : (r = ie.buildFragment([e], t, i), i && i.length && ie(i).remove(), ie.merge([], r.childNodes))
    };
    var nn = ie.fn.load;
    ie.fn.load = function(e, t, n) {
        if ("string" != typeof e && nn) return nn.apply(this, arguments);
        var r, i, a, o = this,
            s = e.indexOf(" ");
        return s >= 0 && (r = ie.trim(e.slice(s, e.length)), e = e.slice(0, s)), ie.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (a = "POST"), o.length > 0 && ie.ajax({
            url: e,
            type: a,
            dataType: "html",
            data: t
        }).done(function(e) {
            i = arguments, o.html(r ? ie("<div>").append(ie.parseHTML(e)).find(r) : e)
        }).complete(n && function(e, t) {
            o.each(n, i || [e.responseText, t, e])
        }), this
    }, ie.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        ie.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), ie.expr.filters.animated = function(e) {
        return ie.grep(ie.timers, function(t) {
            return e === t.elem
        }).length
    };
    var rn = e.document.documentElement;
    ie.offset = {
        setOffset: function(e, t, n) {
            var r, i, a, o, s, l, u, c = ie.css(e, "position"),
                d = ie(e),
                h = {};
            "static" === c && (e.style.position = "relative"), s = d.offset(), a = ie.css(e, "top"), l = ie.css(e, "left"), u = ("absolute" === c || "fixed" === c) && ie.inArray("auto", [a, l]) > -1, u ? (r = d.position(), o = r.top, i = r.left) : (o = parseFloat(a) || 0, i = parseFloat(l) || 0), ie.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (h.top = t.top - s.top + o), null != t.left && (h.left = t.left - s.left + i), "using" in t ? t.using.call(e, h) : d.css(h)
        }
    }, ie.fn.extend({
        offset: function(e) {
            if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                ie.offset.setOffset(this, e, t)
            });
            var t, n, r = {
                    top: 0,
                    left: 0
                },
                i = this[0],
                a = i && i.ownerDocument;
            if (a) return t = a.documentElement, ie.contains(t, i) ? (typeof i.getBoundingClientRect !== Ee && (r = i.getBoundingClientRect()), n = W(a), {
                top: r.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                left: r.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
            }) : r
        },
        position: function() {
            if (this[0]) {
                var e, t, n = {
                        top: 0,
                        left: 0
                    },
                    r = this[0];
                return "fixed" === ie.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), ie.nodeName(e[0], "html") || (n = e.offset()), n.top += ie.css(e[0], "borderTopWidth", !0), n.left += ie.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - n.top - ie.css(r, "marginTop", !0),
                    left: t.left - n.left - ie.css(r, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent || rn; e && !ie.nodeName(e, "html") && "static" === ie.css(e, "position");) e = e.offsetParent;
                return e || rn
            })
        }
    }), ie.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, t) {
        var n = /Y/.test(t);
        ie.fn[e] = function(r) {
            return Ne(this, function(e, r, i) {
                var a = W(e);
                return void 0 === i ? a ? t in a ? a[t] : a.document.documentElement[r] : e[r] : void(a ? a.scrollTo(n ? ie(a).scrollLeft() : i, n ? i : ie(a).scrollTop()) : e[r] = i)
            }, e, r, arguments.length, null)
        }
    }), ie.each(["top", "left"], function(e, t) {
        ie.cssHooks[t] = C(ne.pixelPosition, function(e, n) {
            return n ? (n = tt(e, t), rt.test(n) ? ie(e).position()[t] + "px" : n) : void 0
        })
    }), ie.each({
        Height: "height",
        Width: "width"
    }, function(e, t) {
        ie.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function(n, r) {
            ie.fn[r] = function(r, i) {
                var a = arguments.length && (n || "boolean" != typeof r),
                    o = n || (r === !0 || i === !0 ? "margin" : "border");
                return Ne(this, function(t, n, r) {
                    var i;
                    return ie.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === r ? ie.css(t, n, o) : ie.style(t, n, r, o)
                }, t, a ? r : void 0, a, null)
            }
        })
    }), ie.fn.size = function() {
        return this.length
    }, ie.fn.andSelf = ie.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return ie
    });
    var an = e.jQuery,
        on = e.$;
    return ie.noConflict = function(t) {
        return e.$ === ie && (e.$ = on), t && e.jQuery === ie && (e.jQuery = an), ie
    }, typeof t === Ee && (e.jQuery = e.$ = ie), ie
});
var cytoscape;
! function(e) {
    "use strict";
    var t = cytoscape = function() {
        return cytoscape.init.apply(cytoscape, arguments)
    };
    t.version = "2.4.6", t.init = function(e) {
        return void 0 === e && (e = {}), t.is.plainObject(e) ? new t.Core(e) : t.is.string(e) ? t.extension.apply(t.extension, arguments) : void 0
    }, t.fn = {}, "undefined" != typeof module && module.exports && (module.exports = cytoscape), "undefined" != typeof define && define.amd && define("cytoscape", function() {
        return cytoscape
    }), e && (e.cytoscape = cytoscape)
}("undefined" == typeof window ? null : window), this.cytoscape = cytoscape,
    function(e) {
        "use strict";
        var t = 0,
            n = 1,
            r = 2,
            i = function(e) {
                return this instanceof i ? (this.id = "Thenable/1.0.7", this.state = t, this.fulfillValue = void 0, this.rejectReason = void 0, this.onFulfilled = [], this.onRejected = [], this.proxy = {
                    then: this.then.bind(this)
                }, void("function" == typeof e && e.call(this, this.fulfill.bind(this), this.reject.bind(this)))) : new i(e)
            };
        i.prototype = {
            fulfill: function(e) {
                return a(this, n, "fulfillValue", e)
            },
            reject: function(e) {
                return a(this, r, "rejectReason", e)
            },
            then: function(e, t) {
                var n = this,
                    r = new i;
                return n.onFulfilled.push(l(e, r, "fulfill")), n.onRejected.push(l(t, r, "reject")), o(n), r.proxy
            }
        };
        var a = function(e, n, r, i) {
                return e.state === t && (e.state = n, e[r] = i, o(e)), e
            },
            o = function(e) {
                e.state === n ? s(e, "onFulfilled", e.fulfillValue) : e.state === r && s(e, "onRejected", e.rejectReason)
            },
            s = function(e, t, n) {
                if (0 !== e[t].length) {
                    var r = e[t];
                    e[t] = [];
                    var i = function() {
                        for (var e = 0; e < r.length; e++) r[e](n)
                    };
                    "object" == typeof process && "function" == typeof process.nextTick ? process.nextTick(i) : "function" == typeof setImmediate ? setImmediate(i) : setTimeout(i, 0)
                }
            },
            l = function(e, t, n) {
                return function(r) {
                    if ("function" != typeof e) t[n].call(t, r);
                    else {
                        var i;
                        try {
                            i = e(r)
                        } catch (a) {
                            return void t.reject(a)
                        }
                        u(t, i)
                    }
                }
            },
            u = function(e, t) {
                if (e === t || e.proxy === t) return void e.reject(new TypeError("cannot resolve promise with itself"));
                var n;
                if ("object" == typeof t && null !== t || "function" == typeof t) try {
                    n = t.then
                } catch (r) {
                    return void e.reject(r)
                }
                if ("function" != typeof n) e.fulfill(t);
                else {
                    var i = !1;
                    try {
                        n.call(t, function(n) {
                            i || (i = !0, n === t ? e.reject(new TypeError("circular thenable chain")) : u(e, n))
                        }, function(t) {
                            i || (i = !0, e.reject(t))
                        })
                    } catch (r) {
                        i || e.reject(r)
                    }
                }
            };
        e.Promise = "undefined" == typeof Promise ? i : Promise, e.Promise.all = e.Promise.all || function(t) {
            return new e.Promise(function(e, n) {
                for (var r = new Array(t.length), i = 0, a = function(n, a) {
                        r[n] = a, i++, i === t.length && e(r)
                    }, o = 0; o < t.length; o++) ! function(e) {
                    var r = t[e],
                        i = null != r.then;
                    if (i) r.then(function(t) {
                        a(e, t)
                    }, function(e) {
                        n(e)
                    });
                    else {
                        var o = r;
                        a(e, o)
                    }
                }(o)
            })
        }
    }(cytoscape),
    function(e, t) {
        "use strict";
        var n = "string",
            r = typeof {},
            i = "function";
        e.is = {
            defined: function(e) {
                return null != e
            },
            string: function(e) {
                return null != e && typeof e == n
            },
            fn: function(e) {
                return null != e && typeof e === i
            },
            array: function(e) {
                return Array.isArray ? Array.isArray(e) : null != e && e instanceof Array
            },
            plainObject: function(t) {
                return null != t && typeof t === r && !e.is.array(t) && t.constructor === Object
            },
            object: function(e) {
                return null != e && typeof e === r
            },
            number: function(e) {
                return null != e && "number" == typeof e && !isNaN(e)
            },
            integer: function(t) {
                return e.is.number(t) && Math.floor(t) === t
            },
            color: function(e) {
                return null != e && "string" == typeof e && "" !== $.Color(e).toString()
            },
            bool: function(e) {
                return null != e && typeof e == typeof !0
            },
            elementOrCollection: function(t) {
                return e.is.element(t) || e.is.collection(t)
            },
            element: function(t) {
                return t instanceof e.Element && t._private.single
            },
            collection: function(t) {
                return t instanceof e.Collection && !t._private.single
            },
            core: function(t) {
                return t instanceof e.Core
            },
            style: function(t) {
                return t instanceof e.Style
            },
            stylesheet: function(t) {
                return t instanceof e.Stylesheet
            },
            event: function(t) {
                return t instanceof e.Event
            },
            thread: function(t) {
                return t instanceof e.Thread
            },
            fabric: function(t) {
                return t instanceof e.Fabric
            },
            emptyString: function(t) {
                return t ? e.is.string(t) && ("" === t || t.match(/^\s+$/)) ? !0 : !1 : !0
            },
            nonemptyString: function(t) {
                return t && e.is.string(t) && "" !== t && !t.match(/^\s+$/) ? !0 : !1
            },
            domElement: function(e) {
                return "undefined" == typeof HTMLElement ? !1 : e instanceof HTMLElement
            },
            boundingBox: function(t) {
                return e.is.plainObject(t) && e.is.number(t.x1) && e.is.number(t.x2) && e.is.number(t.y1) && e.is.number(t.y2)
            },
            promise: function(t) {
                return e.is.object(t) && e.is.fn(t.then)
            },
            touch: function() {
                return t && ("ontouchstart" in t || t.DocumentTouch && document instanceof DocumentTouch)
            },
            gecko: function() {
                return "undefined" != typeof InstallTrigger || "MozAppearance" in document.documentElement.style
            },
            webkit: function() {
                return "undefined" != typeof webkitURL || "WebkitAppearance" in document.documentElement.style
            },
            chromium: function() {
                return "undefined" != typeof chrome
            },
            khtml: function() {
                return navigator.vendor.match(/kde/i)
            },
            khtmlEtc: function() {
                return e.is.khtml() || e.is.webkit() || e.is.chromium()
            },
            trident: function() {
                return "undefined" != typeof ActiveXObject || !1
            },
            windows: function() {
                return "undefined" != typeof navigator && navigator.appVersion.match(/Win/i)
            },
            mac: function() {
                return "undefined" != typeof navigator && navigator.appVersion.match(/Mac/i)
            },
            linux: function() {
                return "undefined" != typeof navigator && navigator.appVersion.match(/Linux/i)
            },
            unix: function() {
                return "undefined" != typeof navigator && navigator.appVersion.match(/X11/i)
            }
        }
    }(cytoscape, "undefined" == typeof window ? null : window),
    function(e, t) {
        "use strict";
        e.util = {
            extend: function() {
                var t, n, r, i, a, o, s = arguments[0] || {},
                    l = 1,
                    u = arguments.length,
                    c = !1;
                for ("boolean" == typeof s && (c = s, s = arguments[1] || {}, l = 2), "object" == typeof s || e.is.fn(s) || (s = {}), u === l && (s = this, --l); u > l; l++)
                    if (null != (t = arguments[l]))
                        for (n in t) r = s[n], i = t[n], s !== i && (c && i && (e.is.plainObject(i) || (a = e.is.array(i))) ? (a ? (a = !1, o = r && e.is.array(r) ? r : []) : o = r && e.is.plainObject(r) ? r : {}, s[n] = e.util.extend(c, o, i)) : void 0 !== i && (s[n] = i));
                return s
            },
            require: function(n, r, i) {
                var a;
                i = e.util.extend({
                    msgIfNotFound: !0
                }, i);
                var o = !1,
                    s = function(e) {
                        o = !0, r(e)
                    },
                    l = function(e) {
                        t && (a = t[n]), void 0 !== a && s(a), e && e()
                    },
                    u = function() {
                        o || c(d)
                    },
                    c = function(e) {
                        if ("undefined" != typeof module && module.exports && require) try {
                            a = require(n)
                        } catch (t) {}
                        void 0 !== a && s(a), e && e()
                    },
                    d = function() {
                        o || h(p)
                    },
                    h = function(e) {
                        "undefined" != typeof define && define.amd && require && require([n], function(t) {
                            a = t, void 0 !== a && s(a), e && e()
                        }, function(t) {
                            e && e()
                        })
                    },
                    p = function() {
                        !o && i.msgIfNotFound && e.util.error("Cytoscape.js tried to pull in dependency `" + n + "` but no module (i.e. CommonJS, AMD, or window) was found")
                    };
                l(u)
            },
            requires: function(t, n) {
                for (var r = [], i = [], a = function() {
                        for (var e = 0; e < t.length; e++)
                            if (!i[e]) return;
                        n.apply(n, r)
                    }, o = 0; o < t.length; o++) ! function() {
                    var n = t[o],
                        s = o;
                    e.util.require(n, function(e) {
                        r[s] = e, i[s] = !0, a()
                    })
                }()
            },
            throttle: function(t, n, r) {
                var i = !0,
                    a = !0;
                return r === !1 ? i = !1 : e.is.plainObject(r) && (i = "leading" in r ? r.leading : i, a = "trailing" in r ? r.trailing : a), r = r || {}, r.leading = i, r.maxWait = n, r.trailing = a, e.util.debounce(t, n, r)
            },
            now: function() {
                return +new Date
            },
            debounce: function(t, n, r) {
                var i, a, o, s, l, u, c, d = 0,
                    h = !1,
                    p = !0;
                if (e.is.fn(t)) {
                    if (n = Math.max(0, n) || 0, r === !0) {
                        var f = !0;
                        p = !1
                    } else e.is.plainObject(r) && (f = r.leading, h = "maxWait" in r && (Math.max(n, r.maxWait) || 0), p = "trailing" in r ? r.trailing : p);
                    var v = function() {
                            var r = n - (e.util.now() - s);
                            if (0 >= r) {
                                a && clearTimeout(a);
                                var h = c;
                                a = u = c = void 0, h && (d = e.util.now(), o = t.apply(l, i), u || a || (i = l = null))
                            } else u = setTimeout(v, r)
                        },
                        g = function() {
                            u && clearTimeout(u), a = u = c = void 0, (p || h !== n) && (d = e.util.now(), o = t.apply(l, i), u || a || (i = l = null))
                        };
                    return function() {
                        if (i = arguments, s = e.util.now(), l = this, c = p && (u || !f), h === !1) var r = f && !u;
                        else {
                            a || f || (d = s);
                            var y = h - (s - d),
                                m = 0 >= y;
                            m ? (a && (a = clearTimeout(a)), d = s, o = t.apply(l, i)) : a || (a = setTimeout(g, y))
                        }
                        return m && u ? u = clearTimeout(u) : u || n === h || (u = setTimeout(v, n)), r && (m = !0, o = t.apply(l, i)), !m || u || a || (i = l = null), o
                    }
                }
            },
            error: function(e) {
                if (!console) throw e;
                if (console.error) console.error.apply(console, arguments);
                else {
                    if (!console.log) throw e;
                    console.log.apply(console, arguments)
                }
            },
            clone: function(e) {
                var t = {};
                for (var n in e) t[n] = e[n];
                return t
            },
            copy: function(t) {
                return null == t ? t : e.is.array(t) ? t.slice() : e.is.plainObject(t) ? e.util.clone(t) : t
            },
            makeBoundingBox: function(e) {
                if (null != e.x1 && null != e.y1) {
                    if (null != e.x2 && null != e.y2 && e.x2 >= e.x1 && e.y2 >= e.y1) return {
                        x1: e.x1,
                        y1: e.y1,
                        x2: e.x2,
                        y2: e.y2,
                        w: e.x2 - e.x1,
                        h: e.y2 - e.y1
                    };
                    if (null != e.w && null != e.h && e.w >= 0 && e.h >= 0) return {
                        x1: e.x1,
                        y1: e.y1,
                        x2: e.x1 + e.w,
                        y2: e.y1 + e.h,
                        w: e.w,
                        h: e.h
                    }
                }
            },
            mapEmpty: function(e) {
                var t = !0;
                if (null != e)
                    for (var n in e) {
                        t = !1;
                        break
                    }
                return t
            },
            pushMap: function(t) {
                var n = e.util.getMap(t);
                null == n ? e.util.setMap($.extend({}, t, {
                    value: [t.value]
                })) : n.push(t.value)
            },
            setMap: function(t) {
                for (var n, r = t.map, i = t.keys, a = i.length, o = 0; a > o; o++) {
                    var n = i[o];
                    e.is.plainObject(n) && e.util.error("Tried to set map with object key"), o < i.length - 1 ? (null == r[n] && (r[n] = {}), r = r[n]) : r[n] = t.value
                }
            },
            getMap: function(t) {
                for (var n = t.map, r = t.keys, i = r.length, a = 0; i > a; a++) {
                    var o = r[a];
                    if (e.is.plainObject(o) && e.util.error("Tried to get map with object key"), n = n[o], null == n) return n
                }
                return n
            },
            deleteMap: function(t) {
                for (var n = t.map, r = t.keys, i = r.length, a = t.keepChildren, o = 0; i > o; o++) {
                    var s = r[o];
                    e.is.plainObject(s) && e.util.error("Tried to delete map with object key");
                    var l = o === t.keys.length - 1;
                    if (l)
                        if (a)
                            for (var u in n) a[u] || (n[u] = void 0);
                        else n[s] = void 0;
                    else n = n[s]
                }
            },
            capitalize: function(t) {
                return e.is.emptyString(t) ? t : t.charAt(0).toUpperCase() + t.substring(1)
            },
            trim: function(e) {
                var t, n;
                for (t = 0; t < e.length && " " === e[t]; t++);
                for (n = e.length - 1; n > t && " " === e[n]; n--);
                return e.substring(t, n + 1)
            },
            hex2tuple: function(e) {
                if ((4 === e.length || 7 === e.length) && "#" === e[0]) {
                    var t, n, r, i = 4 === e.length,
                        a = 16;
                    return i ? (t = parseInt(e[1] + e[1], a), n = parseInt(e[2] + e[2], a), r = parseInt(e[3] + e[3], a)) : (t = parseInt(e[1] + e[2], a), n = parseInt(e[3] + e[4], a), r = parseInt(e[5] + e[6], a)), [t, n, r]
                }
            },
            hsl2tuple: function(t) {
                function n(e, t, n) {
                    return 0 > n && (n += 1), n > 1 && (n -= 1), 1 / 6 > n ? e + 6 * (t - e) * n : .5 > n ? t : 2 / 3 > n ? e + (t - e) * (2 / 3 - n) * 6 : e
                }
                var r, i, a, o, s, l, u, c, d = new RegExp("^" + e.util.regex.hsla + "$").exec(t);
                if (d) {
                    if (i = parseInt(d[1]), 0 > i ? i = (360 - -1 * i % 360) % 360 : i > 360 && (i %= 360), i /= 360, a = parseFloat(d[2]), 0 > a || a > 100) return;
                    if (a /= 100, o = parseFloat(d[3]), 0 > o || o > 100) return;
                    if (o /= 100, s = d[4], void 0 !== s && (s = parseFloat(s), 0 > s || s > 1)) return;
                    if (0 === a) l = u = c = Math.round(255 * o);
                    else {
                        var h = .5 > o ? o * (1 + a) : o + a - o * a,
                            p = 2 * o - h;
                        l = Math.round(255 * n(p, h, i + 1 / 3)), u = Math.round(255 * n(p, h, i)), c = Math.round(255 * n(p, h, i - 1 / 3))
                    }
                    r = [l, u, c, s]
                }
                return r
            },
            rgb2tuple: function(t) {
                var n, r = new RegExp("^" + e.util.regex.rgba + "$").exec(t);
                if (r) {
                    n = [];
                    for (var i = [], a = 1; 3 >= a; a++) {
                        var o = r[a];
                        if ("%" === o[o.length - 1] && (i[a] = !0), o = parseFloat(o), i[a] && (o = o / 100 * 255), 0 > o || o > 255) return;
                        n.push(Math.floor(o))
                    }
                    var s = i[1] || i[2] || i[3],
                        l = i[1] && i[2] && i[3];
                    if (s && !l) return;
                    var u = r[4];
                    if (void 0 !== u) {
                        if (u = parseFloat(u), 0 > u || u > 1) return;
                        n.push(u)
                    }
                }
                return n
            },
            colorname2tuple: function(t) {
                return e.util.colors[t.toLowerCase()]
            },
            color2tuple: function(t) {
                return (e.is.array(t) ? t : null) || e.util.colorname2tuple(t) || e.util.hex2tuple(t) || e.util.rgb2tuple(t) || e.util.hsl2tuple(t)
            },
            tuple2hex: function(e) {
                function t(e) {
                    var t = e.toString(16);
                    return 1 === t.length && (t = "0" + t), t
                }
                var n = e[0],
                    r = e[1],
                    i = e[2];
                return "#" + t(n) + t(r) + t(i)
            },
            colors: {
                transparent: [0, 0, 0, 0],
                aliceblue: [240, 248, 255],
                antiquewhite: [250, 235, 215],
                aqua: [0, 255, 255],
                aquamarine: [127, 255, 212],
                azure: [240, 255, 255],
                beige: [245, 245, 220],
                bisque: [255, 228, 196],
                black: [0, 0, 0],
                blanchedalmond: [255, 235, 205],
                blue: [0, 0, 255],
                blueviolet: [138, 43, 226],
                brown: [165, 42, 42],
                burlywood: [222, 184, 135],
                cadetblue: [95, 158, 160],
                chartreuse: [127, 255, 0],
                chocolate: [210, 105, 30],
                coral: [255, 127, 80],
                cornflowerblue: [100, 149, 237],
                cornsilk: [255, 248, 220],
                crimson: [220, 20, 60],
                cyan: [0, 255, 255],
                darkblue: [0, 0, 139],
                darkcyan: [0, 139, 139],
                darkgoldenrod: [184, 134, 11],
                darkgray: [169, 169, 169],
                darkgreen: [0, 100, 0],
                darkgrey: [169, 169, 169],
                darkkhaki: [189, 183, 107],
                darkmagenta: [139, 0, 139],
                darkolivegreen: [85, 107, 47],
                darkorange: [255, 140, 0],
                darkorchid: [153, 50, 204],
                darkred: [139, 0, 0],
                darksalmon: [233, 150, 122],
                darkseagreen: [143, 188, 143],
                darkslateblue: [72, 61, 139],
                darkslategray: [47, 79, 79],
                darkslategrey: [47, 79, 79],
                darkturquoise: [0, 206, 209],
                darkviolet: [148, 0, 211],
                deeppink: [255, 20, 147],
                deepskyblue: [0, 191, 255],
                dimgray: [105, 105, 105],
                dimgrey: [105, 105, 105],
                dodgerblue: [30, 144, 255],
                firebrick: [178, 34, 34],
                floralwhite: [255, 250, 240],
                forestgreen: [34, 139, 34],
                fuchsia: [255, 0, 255],
                gainsboro: [220, 220, 220],
                ghostwhite: [248, 248, 255],
                gold: [255, 215, 0],
                goldenrod: [218, 165, 32],
                gray: [128, 128, 128],
                grey: [128, 128, 128],
                green: [0, 128, 0],
                greenyellow: [173, 255, 47],
                honeydew: [240, 255, 240],
                hotpink: [255, 105, 180],
                indianred: [205, 92, 92],
                indigo: [75, 0, 130],
                ivory: [255, 255, 240],
                khaki: [240, 230, 140],
                lavender: [230, 230, 250],
                lavenderblush: [255, 240, 245],
                lawngreen: [124, 252, 0],
                lemonchiffon: [255, 250, 205],
                lightblue: [173, 216, 230],
                lightcoral: [240, 128, 128],
                lightcyan: [224, 255, 255],
                lightgoldenrodyellow: [250, 250, 210],
                lightgray: [211, 211, 211],
                lightgreen: [144, 238, 144],
                lightgrey: [211, 211, 211],
                lightpink: [255, 182, 193],
                lightsalmon: [255, 160, 122],
                lightseagreen: [32, 178, 170],
                lightskyblue: [135, 206, 250],
                lightslategray: [119, 136, 153],
                lightslategrey: [119, 136, 153],
                lightsteelblue: [176, 196, 222],
                lightyellow: [255, 255, 224],
                lime: [0, 255, 0],
                limegreen: [50, 205, 50],
                linen: [250, 240, 230],
                magenta: [255, 0, 255],
                maroon: [128, 0, 0],
                mediumaquamarine: [102, 205, 170],
                mediumblue: [0, 0, 205],
                mediumorchid: [186, 85, 211],
                mediumpurple: [147, 112, 219],
                mediumseagreen: [60, 179, 113],
                mediumslateblue: [123, 104, 238],
                mediumspringgreen: [0, 250, 154],
                mediumturquoise: [72, 209, 204],
                mediumvioletred: [199, 21, 133],
                midnightblue: [25, 25, 112],
                mintcream: [245, 255, 250],
                mistyrose: [255, 228, 225],
                moccasin: [255, 228, 181],
                navajowhite: [255, 222, 173],
                navy: [0, 0, 128],
                oldlace: [253, 245, 230],
                olive: [128, 128, 0],
                olivedrab: [107, 142, 35],
                orange: [255, 165, 0],
                orangered: [255, 69, 0],
                orchid: [218, 112, 214],
                palegoldenrod: [238, 232, 170],
                palegreen: [152, 251, 152],
                paleturquoise: [175, 238, 238],
                palevioletred: [219, 112, 147],
                papayawhip: [255, 239, 213],
                peachpuff: [255, 218, 185],
                peru: [205, 133, 63],
                pink: [255, 192, 203],
                plum: [221, 160, 221],
                powderblue: [176, 224, 230],
                purple: [128, 0, 128],
                red: [255, 0, 0],
                rosybrown: [188, 143, 143],
                royalblue: [65, 105, 225],
                saddlebrown: [139, 69, 19],
                salmon: [250, 128, 114],
                sandybrown: [244, 164, 96],
                seagreen: [46, 139, 87],
                seashell: [255, 245, 238],
                sienna: [160, 82, 45],
                silver: [192, 192, 192],
                skyblue: [135, 206, 235],
                slateblue: [106, 90, 205],
                slategray: [112, 128, 144],
                slategrey: [112, 128, 144],
                snow: [255, 250, 250],
                springgreen: [0, 255, 127],
                steelblue: [70, 130, 180],
                tan: [210, 180, 140],
                teal: [0, 128, 128],
                thistle: [216, 191, 216],
                tomato: [255, 99, 71],
                turquoise: [64, 224, 208],
                violet: [238, 130, 238],
                wheat: [245, 222, 179],
                white: [255, 255, 255],
                whitesmoke: [245, 245, 245],
                yellow: [255, 255, 0],
                yellowgreen: [154, 205, 50]
            },
            memoize: function(e, t) {
                var n = this,
                    r = {};
                return t || (t = function() {
                        if (1 === arguments.length) return arguments[0];
                        for (var e = [], t = 0; t < arguments.length; t++) e.push(arguments[t]);
                        return e.join("$")
                    }),
                    function() {
                        var i, a = arguments,
                            o = t.apply(n, a);
                        return (i = r[o]) || (i = r[o] = e.apply(n, a)), i
                    }
            }
        }, e.util.camel2dash = e.util.memoize(function(e) {
            for (var t = [], n = 0; n < e.length; n++) {
                var r = e[n],
                    i = r.toLowerCase(),
                    a = r !== i;
                a ? (t.push("-"), t.push(i)) : t.push(r)
            }
            var o = t.length === e.length;
            return o ? e : t.join("")
        }), e.util.dash2camel = e.util.memoize(function(e) {
            for (var t = [], n = !1, r = 0; r < e.length; r++) {
                var i = e[r],
                    a = "-" === i;
                a ? n = !0 : (n ? t.push(i.toUpperCase()) : t.push(i), n = !1)
            }
            return t.join("")
        }), e.util.regex = {}, e.util.regex.number = "(?:[-]?\\d*\\.\\d+|[-]?\\d+|[-]?\\d*\\.\\d+[eE]\\d+)", e.util.regex.rgba = "rgb[a]?\\((" + e.util.regex.number + "[%]?)\\s*,\\s*(" + e.util.regex.number + "[%]?)\\s*,\\s*(" + e.util.regex.number + "[%]?)(?:\\s*,\\s*(" + e.util.regex.number + "))?\\)", e.util.regex.rgbaNoBackRefs = "rgb[a]?\\((?:" + e.util.regex.number + "[%]?)\\s*,\\s*(?:" + e.util.regex.number + "[%]?)\\s*,\\s*(?:" + e.util.regex.number + "[%]?)(?:\\s*,\\s*(?:" + e.util.regex.number + "))?\\)", e.util.regex.hsla = "hsl[a]?\\((" + e.util.regex.number + ")\\s*,\\s*(" + e.util.regex.number + "[%])\\s*,\\s*(" + e.util.regex.number + "[%])(?:\\s*,\\s*(" + e.util.regex.number + "))?\\)", e.util.regex.hslaNoBackRefs = "hsl[a]?\\((?:" + e.util.regex.number + ")\\s*,\\s*(?:" + e.util.regex.number + "[%])\\s*,\\s*(?:" + e.util.regex.number + "[%])(?:\\s*,\\s*(?:" + e.util.regex.number + "))?\\)", e.util.regex.hex3 = "\\#[0-9a-fA-F]{3}", e.util.regex.hex6 = "\\#[0-9a-fA-F]{6}";
        var n = t ? t.requestAnimationFrame || t.mozRequestAnimationFrame || t.webkitRequestAnimationFrame || t.msRequestAnimationFrame : null;
        n = n || function(e) {
            e && setTimeout(e, 1e3 / 60)
        }, e.util.requestAnimationFrame = function(e) {
            n(e)
        }
    }(cytoscape, "undefined" == typeof window ? null : window),
    function(e) {
        "use strict";
        e.math = {}, e.math.signum = function(e) {
            return e > 0 ? 1 : 0 > e ? -1 : 0
        }, e.math.distance = function(e, t) {
            var n = t.x - e.x,
                r = t.y - e.y;
            return Math.sqrt(n * n + r * r)
        }, e.math.qbezierAt = function(e, t, n, r) {
            return (1 - r) * (1 - r) * e + 2 * (1 - r) * r * t + r * r * n
        }, e.math.qbezierPtAt = function(t, n, r, i) {
            return {
                x: e.math.qbezierAt(t.x, n.x, r.x, i),
                y: e.math.qbezierAt(t.y, n.y, r.y, i)
            }
        }, e.math.boundingBoxesIntersect = function(e, t) {
            return e.x1 > t.x2 ? !1 : t.x1 > e.x2 ? !1 : e.x2 < t.x1 ? !1 : t.x2 < e.x1 ? !1 : e.y2 < t.y1 ? !1 : t.y2 < e.y1 ? !1 : e.y1 > t.y2 ? !1 : t.y1 > e.y2 ? !1 : !0
        }, e.math.inBoundingBox = function(e, t, n) {
            return e.x1 <= t && t <= e.x2 && e.y1 <= n && n <= e.y2
        }, e.math.pointInBoundingBox = function(e, t) {
            return this.inBoundingBox(e, t.x, t.y)
        }, e.math.roundRectangleIntersectLine = function(e, t, n, r, i, a, o) {
            var s, l = this.getRoundRectangleRadius(i, a),
                u = i / 2,
                c = a / 2,
                d = n - u + l - o,
                h = r - c - o,
                p = n + u - l + o,
                f = h;
            if (s = this.finiteLinesIntersect(e, t, n, r, d, h, p, f, !1), s.length > 0) return s;
            var v = n + u + o,
                g = r - c + l - o,
                y = v,
                m = r + c - l + o;
            if (s = this.finiteLinesIntersect(e, t, n, r, v, g, y, m, !1), s.length > 0) return s;
            var x = n - u + l - o,
                b = r + c + o,
                w = n + u - l + o,
                _ = b;
            if (s = this.finiteLinesIntersect(e, t, n, r, x, b, w, _, !1), s.length > 0) return s;
            var E = n - u - o,
                T = r - c + l - o,
                S = E,
                C = r + c - l + o;
            if (s = this.finiteLinesIntersect(e, t, n, r, E, T, S, C, !1), s.length > 0) return s;
            var k, D = n - u + l,
                N = r - c + l;
            if (k = this.intersectLineCircle(e, t, n, r, D, N, l + o), k.length > 0 && k[0] <= D && k[1] <= N) return [k[0], k[1]];
            var P = n + u - l,
                M = r - c + l;
            if (k = this.intersectLineCircle(e, t, n, r, P, M, l + o), k.length > 0 && k[0] >= P && k[1] <= M) return [k[0], k[1]];
            var B = n + u - l,
                L = r + c - l;
            if (k = this.intersectLineCircle(e, t, n, r, B, L, l + o), k.length > 0 && k[0] >= B && k[1] >= L) return [k[0], k[1]];
            var O = n - u + l,
                A = r + c - l;
            return k = this.intersectLineCircle(e, t, n, r, O, A, l + o), k.length > 0 && k[0] <= O && k[1] >= A ? [k[0], k[1]] : []
        }, e.math.roundRectangleIntersectBox = function(e, t, n, r, i, a, o, s, l) {
            var u = this.getRoundRectangleRadius(i, a),
                c = o - i / 2 - l,
                d = s - a / 2 + u - l,
                h = o + i / 2 + l,
                p = s + a / 2 - u + l,
                f = o - i / 2 + u - l,
                v = s - a / 2 - l,
                g = o + i / 2 - u + l,
                y = s + a / 2 + l,
                m = Math.min(e, n),
                x = Math.max(e, n),
                b = Math.min(t, r),
                w = Math.max(t, r);
            return c > x ? !1 : m > h ? !1 : v > w ? !1 : b > y ? !1 : c >= m && x >= c && d >= b && w >= d ? !0 : h >= m && x >= h && d >= b && w >= d ? !0 : h >= m && x >= h && p >= b && w >= p ? !0 : c >= m && x >= c && p >= b && w >= p ? !0 : m >= c && h >= m && b >= d && p >= b ? !0 : x >= c && h >= x && b >= d && p >= b ? !0 : x >= c && h >= x && w >= d && p >= w ? !0 : m >= c && h >= m && w >= d && p >= w ? !0 : f >= m && x >= f && v >= b && w >= v ? !0 : g >= m && x >= g && v >= b && w >= v ? !0 : g >= m && x >= g && y >= b && w >= y ? !0 : f >= m && x >= f && y >= b && w >= y ? !0 : m >= f && g >= m && b >= v && y >= b ? !0 : x >= f && g >= x && b >= v && y >= b ? !0 : x >= f && g >= x && w >= v && y >= w ? !0 : m >= f && g >= m && w >= v && y >= w ? !0 : this.boxIntersectEllipse(m, b, x, w, l, 2 * u, 2 * u, f + l, d + l) ? !0 : this.boxIntersectEllipse(m, b, x, w, l, 2 * u, 2 * u, g - l, d + l) ? !0 : this.boxIntersectEllipse(m, b, x, w, l, 2 * u, 2 * u, g - l, p - l) ? !0 : this.boxIntersectEllipse(m, b, x, w, l, 2 * u, 2 * u, f + l, p - l) ? !0 : !1
        }, e.math.checkInBoundingCircle = function(e, t, n, r, i, a, o, s) {
            return e = (e - o) / (i + r), t = (t - s) / (a + r), n >= e * e + t * t
        }, e.math.boxInBezierVicinity = function(e, t, n, r, i, a, o, s, l, u, c) {
            var d = .25 * i + .5 * o + .25 * l,
                h = .25 * a + .5 * s + .25 * u,
                p = Math.min(e, n) - c,
                f = Math.min(t, r) - c,
                v = Math.max(e, n) + c,
                g = Math.max(t, r) + c;
            if (i >= p && v >= i && a >= f && g >= a) return 1;
            if (l >= p && v >= l && u >= f && g >= u) return 1;
            if (d >= p && v >= d && h >= f && g >= h) return 1;
            if (o >= p && v >= o && s >= f && g >= s) return 1;
            var y = Math.min(i, d, l),
                m = Math.min(a, h, u),
                x = Math.max(i, d, l),
                b = Math.max(a, h, u);
            return y > v || p > x || m > g || f > b ? 0 : 1
        }, e.math.checkBezierInBox = function(t, n, r, i, a, o, s, l, u, c, d) {
            function h(d) {
                var h = e.math.qbezierAt(a, s, u, d),
                    p = e.math.qbezierAt(o, l, c, d);
                return h >= t && r >= h && p >= n && i >= p
            }
            for (var p = 0; 1 >= p; p += .25)
                if (!h(p)) return !1;
            return !0
        }, e.math.checkStraightEdgeInBox = function(e, t, n, r, i, a, o, s, l) {
            return i >= e && n >= i && o >= e && n >= o && a >= t && r >= a && s >= t && r >= s
        }, e.math.checkStraightEdgeCrossesBox = function(e, t, n, r, i, a, o, s, l) {
            var u, c, d = Math.min(e, n) - l,
                h = Math.min(t, r) - l,
                p = Math.max(e, n) + l,
                f = Math.max(t, r) + l,
                v = o - i,
                g = i,
                y = s - a,
                m = a;
            if (Math.abs(v) < 1e-4) return i >= d && p >= i && Math.min(a, s) <= h && Math.max(a, s) >= f;
            var x = (d - g) / v;
            if (x > 0 && 1 >= x && (u = y * x + m, u >= h && f >= u)) return !0;
            var b = (p - g) / v;
            if (b > 0 && 1 >= b && (u = y * b + m, u >= h && f >= u)) return !0;
            var w = (h - m) / y;
            if (w > 0 && 1 >= w && (c = v * w + g, c >= d && p >= c)) return !0;
            var _ = (f - m) / y;
            return _ > 0 && 1 >= _ && (c = v * _ + g, c >= d && p >= c) ? !0 : !1
        }, e.math.checkBezierCrossesBox = function(e, t, n, r, i, a, o, s, l, u, c) {
            var d = Math.min(e, n) - c,
                h = Math.min(t, r) - c,
                p = Math.max(e, n) + c,
                f = Math.max(t, r) + c;
            if (i >= d && p >= i && a >= h && f >= a) return !0;
            if (l >= d && p >= l && u >= h && f >= u) return !0;
            var v = i - 2 * o + l,
                g = -2 * i + 2 * o,
                y = i,
                m = [];
            if (Math.abs(v) < 1e-4) {
                var x = (d - i) / g,
                    b = (p - i) / g;
                m.push(x, b)
            } else {
                var w, _, E = g * g - 4 * v * (y - d);
                if (E > 0) {
                    var T = Math.sqrt(E);
                    w = (-g + T) / (2 * v), _ = (-g - T) / (2 * v), m.push(w, _)
                }
                var S, C, k = g * g - 4 * v * (y - p);
                if (k > 0) {
                    var T = Math.sqrt(k);
                    S = (-g + T) / (2 * v), C = (-g - T) / (2 * v), m.push(S, C)
                }
            }
            m.sort(function(e, t) {
                return e - t
            });
            var D = a - 2 * s + u,
                N = -2 * a + 2 * s,
                P = a,
                M = [];
            if (Math.abs(D) < 1e-4) {
                var B = (h - a) / N,
                    L = (f - a) / N;
                M.push(B, L)
            } else {
                var O, A, I = N * N - 4 * D * (P - h);
                if (I > 0) {
                    var T = Math.sqrt(I);
                    O = (-N + T) / (2 * D), A = (-N - T) / (2 * D), M.push(O, A)
                }
                var z, R, j = N * N - 4 * D * (P - f);
                if (j > 0) {
                    var T = Math.sqrt(j);
                    z = (-N + T) / (2 * D), R = (-N - T) / (2 * D), M.push(z, R)
                }
            }
            M.sort(function(e, t) {
                return e - t
            });
            for (var F = 0; F < m.length; F += 2)
                for (var q = 1; q < M.length; q += 2)
                    if (m[F] < M[q] && M[q] >= 0 && m[F] <= 1 && m[F + 1] > M[q - 1] && M[q - 1] <= 1 && m[F + 1] >= 0) return !0;
            return !1
        }, e.math.inLineVicinity = function(e, t, n, r, i, a, o) {
            var s = o,
                l = Math.min(n, i),
                u = Math.max(n, i),
                c = Math.min(r, a),
                d = Math.max(r, a);
            return e >= l - s && u + s >= e && t >= c - s && d + s >= t
        }, e.math.inBezierVicinity = function(e, t, n, r, i, a, o, s, l) {
            var u = {
                x1: Math.min(n, o, i),
                x2: Math.max(n, o, i),
                y1: Math.min(r, s, a),
                y2: Math.max(r, s, a)
            };
            return e < u.x1 || e > u.x2 || t < u.y1 || t > u.y2 ? !1 : !0
        }, e.math.solveCubic = function(e, t, n, r, i) {
            t /= e, n /= e, r /= e;
            var a, o, s, l, u, c, d, h;
            return o = (3 * n - t * t) / 9, s = -(27 * r) + t * (9 * n - 2 * (t * t)), s /= 54, a = o * o * o + s * s, i[1] = 0, d = t / 3, a > 0 ? (u = s + Math.sqrt(a), u = 0 > u ? -Math.pow(-u, 1 / 3) : Math.pow(u, 1 / 3), c = s - Math.sqrt(a), c = 0 > c ? -Math.pow(-c, 1 / 3) : Math.pow(c, 1 / 3), i[0] = -d + u + c, d += (u + c) / 2, i[4] = i[2] = -d, d = Math.sqrt(3) * (-c + u) / 2, i[3] = d, void(i[5] = -d)) : (i[5] = i[3] = 0, 0 === a ? (h = 0 > s ? -Math.pow(-s, 1 / 3) : Math.pow(s, 1 / 3), i[0] = -d + 2 * h, void(i[4] = i[2] = -(h + d))) : (o = -o, l = o * o * o, l = Math.acos(s / Math.sqrt(l)), h = 2 * Math.sqrt(o), i[0] = -d + h * Math.cos(l / 3), i[2] = -d + h * Math.cos((l + 2 * Math.PI) / 3), void(i[4] = -d + h * Math.cos((l + 4 * Math.PI) / 3))))
        }, e.math.sqDistanceToQuadraticBezier = function(e, t, n, r, i, a, o, s) {
            var l = 1 * n * n - 4 * n * i + 2 * n * o + 4 * i * i - 4 * i * o + o * o + r * r - 4 * r * a + 2 * r * s + 4 * a * a - 4 * a * s + s * s,
                u = 9 * n * i - 3 * n * n - 3 * n * o - 6 * i * i + 3 * i * o + 9 * r * a - 3 * r * r - 3 * r * s - 6 * a * a + 3 * a * s,
                c = 3 * n * n - 6 * n * i + n * o - n * e + 2 * i * i + 2 * i * e - o * e + 3 * r * r - 6 * r * a + r * s - r * t + 2 * a * a + 2 * a * t - s * t,
                d = 1 * n * i - n * n + n * e - i * e + r * a - r * r + r * t - a * t,
                h = [];
            this.solveCubic(l, u, c, d, h);
            for (var p = 1e-7, f = [], v = 0; 6 > v; v += 2) Math.abs(h[v + 1]) < p && h[v] >= 0 && h[v] <= 1 && f.push(h[v]);
            f.push(1), f.push(0);
            for (var g, y, m, x, b = -1, w = 0; w < f.length; w++) y = Math.pow(1 - f[w], 2) * n + 2 * (1 - f[w]) * f[w] * i + f[w] * f[w] * o, m = Math.pow(1 - f[w], 2) * r + 2 * (1 - f[w]) * f[w] * a + f[w] * f[w] * s, x = Math.pow(y - e, 2) + Math.pow(m - t, 2), b >= 0 ? b > x && (b = x, g = f[w]) : (b = x, g = f[w]);
            return b
        }, e.math.sqDistanceToFiniteLine = function(e, t, n, r, i, a) {
            var o = [e - n, t - r],
                s = [i - n, a - r],
                l = s[0] * s[0] + s[1] * s[1],
                u = o[0] * o[0] + o[1] * o[1],
                c = o[0] * s[0] + o[1] * s[1],
                d = c * c / l;
            return 0 > c ? u : d > l ? (e - i) * (e - i) + (t - a) * (t - a) : u - d
        }, e.math.pointInsidePolygon = function(e, t, n, r, i, a, o, s, l) {
            var u = new Array(n.length),
                c = Math.asin(s[1] / Math.sqrt(s[0] * s[0] + s[1] * s[1]));
            s[0] < 0 ? c += Math.PI / 2 : c = -c - Math.PI / 2;
            for (var d = Math.cos(-c), h = Math.sin(-c), p = 0; p < u.length / 2; p++) u[2 * p] = a / 2 * (n[2 * p] * d - n[2 * p + 1] * h), u[2 * p + 1] = o / 2 * (n[2 * p + 1] * d + n[2 * p] * h), u[2 * p] += r, u[2 * p + 1] += i;
            var f;
            if (l > 0) {
                var v = this.expandPolygon(u, -l);
                f = this.joinLines(v)
            } else f = u;
            for (var g, y, m, x, b, w = 0, _ = 0, p = 0; p < f.length / 2; p++)
                if (g = f[2 * p], y = f[2 * p + 1], p + 1 < f.length / 2 ? (m = f[2 * (p + 1)], x = f[2 * (p + 1) + 1]) : (m = f[2 * (p + 1 - f.length / 2)], x = f[2 * (p + 1 - f.length / 2) + 1]), g == e && m == e);
                else {
                    if (!(g >= e && e >= m || e >= g && m >= e)) continue;
                    b = (e - g) / (m - g) * (x - y) + y, b > t && w++, t > b && _++
                }
            return w % 2 === 0 ? !1 : !0
        }, e.math.joinLines = function(e) {
            for (var t, n, r, i, a, o, s, l, u = new Array(e.length / 2), c = 0; c < e.length / 4; c++) {
                t = e[4 * c], n = e[4 * c + 1], r = e[4 * c + 2], i = e[4 * c + 3], c < e.length / 4 - 1 ? (a = e[4 * (c + 1)], o = e[4 * (c + 1) + 1], s = e[4 * (c + 1) + 2], l = e[4 * (c + 1) + 3]) : (a = e[0], o = e[1], s = e[2], l = e[3]);
                var d = this.finiteLinesIntersect(t, n, r, i, a, o, s, l, !0);
                u[2 * c] = d[0], u[2 * c + 1] = d[1]
            }
            return u
        }, e.math.expandPolygon = function(e, t) {
            for (var n, r, i, a, o = new Array(2 * e.length), s = 0; s < e.length / 2; s++) {
                n = e[2 * s], r = e[2 * s + 1], s < e.length / 2 - 1 ? (i = e[2 * (s + 1)], a = e[2 * (s + 1) + 1]) : (i = e[0], a = e[1]);
                var l = a - r,
                    u = -(i - n),
                    c = Math.sqrt(l * l + u * u),
                    d = l / c,
                    h = u / c;
                o[4 * s] = n + d * t, o[4 * s + 1] = r + h * t, o[4 * s + 2] = i + d * t, o[4 * s + 3] = a + h * t
            }
            return o
        }, e.math.intersectLineEllipse = function(e, t, n, r, i, a) {
            var o = n - e,
                s = r - t;
            o /= i, s /= a;
            var l = Math.sqrt(o * o + s * s),
                u = l - 1;
            if (0 > u) return [];
            var c = u / l;
            return [(n - e) * c + e, (r - t) * c + t]
        }, e.math.dotProduct = function(e, t) {
            if (2 != e.length || 2 != t.length) throw "dot product: arguments are not vectors";
            return e[0] * t[0] + e[1] * t[1]
        }, e.math.intersectLineCircle = function(e, t, n, r, i, a, o) {
            var s = [n - e, r - t],
                l = [i, a],
                u = [e - i, t - a],
                c = s[0] * s[0] + s[1] * s[1],
                d = 2 * (u[0] * s[0] + u[1] * s[1]),
                l = u[0] * u[0] + u[1] * u[1] - o * o,
                h = d * d - 4 * c * l;
            if (0 > h) return [];
            var p = (-d + Math.sqrt(h)) / (2 * c),
                f = (-d - Math.sqrt(h)) / (2 * c),
                v = Math.min(p, f),
                g = Math.max(p, f),
                y = [];
            if (v >= 0 && 1 >= v && y.push(v), g >= 0 && 1 >= g && y.push(g), 0 === y.length) return [];
            var m = y[0] * s[0] + e,
                x = y[0] * s[1] + t;
            if (y.length > 1) {
                if (y[0] == y[1]) return [m, x];
                var b = y[1] * s[0] + e,
                    w = y[1] * s[1] + t;
                return [m, x, b, w]
            }
            return [m, x]
        }, e.math.findCircleNearPoint = function(e, t, n, r, i) {
            var a = r - e,
                o = i - t,
                s = Math.sqrt(a * a + o * o),
                l = a / s,
                u = o / s;
            return [e + l * n, t + u * n]
        }, e.math.findMaxSqDistanceToOrigin = function(e) {
            for (var t, n = 1e-6, r = 0; r < e.length / 2; r++) t = e[2 * r] * e[2 * r] + e[2 * r + 1] * e[2 * r + 1], t > n && (n = t);
            return n
        }, e.math.finiteLinesIntersect = function(e, t, n, r, i, a, o, s, l) {
            var u = (o - i) * (t - a) - (s - a) * (e - i),
                c = (n - e) * (t - a) - (r - t) * (e - i),
                d = (s - a) * (n - e) - (o - i) * (r - t);
            if (0 !== d) {
                var h = u / d,
                    p = c / d;
                return h >= 0 && 1 >= h && p >= 0 && 1 >= p ? [e + h * (n - e), t + h * (r - t)] : l ? [e + h * (n - e), t + h * (r - t)] : []
            }
            return 0 === u || 0 === c ? [e, n, o].sort()[1] === o ? [o, s] : [e, n, i].sort()[1] === i ? [i, a] : [i, o, n].sort()[1] === n ? [n, r] : [] : []
        }, e.math.boxIntersectEllipse = function(e, t, n, r, i, a, o, s, l) {
            if (e > n) {
                var u = e;
                e = n, n = u
            }
            if (t > r) {
                var c = t;
                t = r, r = c
            }
            var d = [s - a / 2 - i, l],
                h = [s + a / 2 + i, l],
                p = [s, l - o / 2 - i],
                f = [s, l + o / 2 + i];
            return n < d[0] ? !1 : e > h[0] ? !1 : t > f[1] ? !1 : r < p[1] ? !1 : e <= h[0] && h[0] <= n && t <= h[1] && h[1] <= r ? !0 : e <= d[0] && d[0] <= n && t <= d[1] && d[1] <= r ? !0 : e <= p[0] && p[0] <= n && t <= p[1] && p[1] <= r ? !0 : e <= f[0] && f[0] <= n && t <= f[1] && f[1] <= r ? !0 : (e = (e - s) / (a / 2 + i), n = (n - s) / (a / 2 + i), t = (t - l) / (o / 2 + i), r = (r - l) / (o / 2 + i), 1 >= e * e + t * t ? !0 : 1 >= n * n + t * t ? !0 : 1 >= n * n + r * r ? !0 : 1 >= e * e + r * r ? !0 : !1)
        }, e.math.boxIntersectPolygon = function(t, n, r, i, a, o, s, l, u, c, d) {
            if (t > r) {
                var h = t;
                t = r, r = h
            }
            if (n > i) {
                var p = n;
                n = i, i = p
            }
            var f = new Array(a.length),
                v = Math.asin(c[1] / Math.sqrt(c[0] * c[0] + c[1] * c[1]));
            c[0] < 0 ? v += Math.PI / 2 : v = -v - Math.PI / 2;
            for (var g = Math.cos(-v), y = Math.sin(-v), m = 0; m < f.length / 2; m++) f[2 * m] = o / 2 * (a[2 * m] * g - a[2 * m + 1] * y), f[2 * m + 1] = s / 2 * (a[2 * m + 1] * g + a[2 * m] * y), f[2 * m] += l, f[2 * m + 1] += u;
            for (var x = f[0], b = f[0], w = f[1], _ = f[1], m = 1; m < f.length / 2; m++) f[2 * m] > b && (b = f[2 * m]), f[2 * m] < x && (x = f[2 * m]), f[2 * m + 1] > _ && (_ = f[2 * m + 1]), f[2 * m + 1] < w && (w = f[2 * m + 1]);
            if (x - d > r) return !1;
            if (t > b + d) return !1;
            if (w - d > i) return !1;
            if (n > _ + d) return !1;
            var E;
            if (d > 0) {
                var T = e.math.expandPolygon(f, -d);
                E = e.math.joinLines(T)
            } else E = f;
            for (var m = 0; m < f.length / 2; m++)
                if (t <= f[2 * m] && f[2 * m] <= r && n <= f[2 * m + 1] && f[2 * m + 1] <= i) return !0;
            for (var m = 0; m < E.length / 2; m++) {
                var S, C, k = E[2 * m],
                    D = E[2 * m + 1];
                if (m < E.length / 2 - 1 ? (S = E[2 * (m + 1)], C = E[2 * (m + 1) + 1]) : (S = E[0], C = E[1]), e.math.finiteLinesIntersect(k, D, S, C, t, n, r, n, !1).length > 0) return !0;
                if (e.math.finiteLinesIntersect(k, D, S, C, t, i, r, i, !1).length > 0) return !0;
                if (e.math.finiteLinesIntersect(k, D, S, C, t, n, t, i, !1).length > 0) return !0;
                if (e.math.finiteLinesIntersect(k, D, S, C, r, n, r, i, !1).length > 0) return !0
            }
            return !1
        }, e.math.polygonIntersectLine = function(t, n, r, i, a, o, s, l) {
            for (var u, c = [], d = new Array(r.length), h = 0; h < d.length / 2; h++) d[2 * h] = r[2 * h] * o + i, d[2 * h + 1] = r[2 * h + 1] * s + a;
            var p;
            if (l > 0) {
                var f = e.math.expandPolygon(d, -l);
                p = e.math.joinLines(f)
            } else p = d;
            for (var v, g, y, m, h = 0; h < p.length / 2; h++) v = p[2 * h], g = p[2 * h + 1], h < p.length / 2 - 1 ? (y = p[2 * (h + 1)], m = p[2 * (h + 1) + 1]) : (y = p[0], m = p[1]), u = this.finiteLinesIntersect(t, n, i, a, v, g, y, m), 0 !== u.length && c.push(u[0], u[1]);
            return c
        }, e.math.shortenIntersection = function(e, t, n) {
            var r = [e[0] - t[0], e[1] - t[1]],
                i = Math.sqrt(r[0] * r[0] + r[1] * r[1]),
                a = (i - n) / i;
            return 0 > a && (a = 1e-5), [t[0] + a * r[0], t[1] + a * r[1]]
        }, e.math.generateUnitNgonPointsFitToSquare = function(t, n) {
            var r = e.math.generateUnitNgonPoints(t, n);
            return r = e.math.fitPolygonToSquare(r)
        }, e.math.fitPolygonToSquare = function(e) {
            for (var t, n, r = e.length / 2, i = 1 / 0, a = 1 / 0, o = -(1 / 0), s = -(1 / 0), l = 0; r > l; l++) t = e[2 * l], n = e[2 * l + 1], i = Math.min(i, t), o = Math.max(o, t), a = Math.min(a, n), s = Math.max(s, n);
            for (var u = 2 / (o - i), c = 2 / (s - a), l = 0; r > l; l++) t = e[2 * l] = e[2 * l] * u, n = e[2 * l + 1] = e[2 * l + 1] * c, i = Math.min(i, t), o = Math.max(o, t), a = Math.min(a, n), s = Math.max(s, n);
            if (-1 > a)
                for (var l = 0; r > l; l++) n = e[2 * l + 1] = e[2 * l + 1] + (-1 - a);
            return e
        }, e.math.generateUnitNgonPoints = function(e, t) {
            var n = 1 / e * 2 * Math.PI,
                r = e % 2 === 0 ? Math.PI / 2 + n / 2 : Math.PI / 2;
            r += t;
            for (var i, a, o, s = new Array(2 * e), l = 0; e > l; l++) i = l * n + r, a = s[2 * l] = Math.cos(i), o = s[2 * l + 1] = Math.sin(-i);
            return s
        }, e.math.getRoundRectangleRadius = function(e, t) {
            return Math.min(e / 4, t / 4, 8)
        }
    }(cytoscape),
    function(e) {
        "use strict";

        function t(t, n, r) {
            var i = {};
            switch (i[n] = r, t) {
                case "core":
                case "collection":
                    e.fn[t](i)
            }
            if ("layout" === t) {
                for (var o = r.prototype, s = [], l = 0; l < s.length; l++) {
                    var u = s[l];
                    o[u] = o[u] || function() {
                        return this
                    }
                }
                o.start && !o.run ? o.run = function() {
                    return this.start(), this
                } : !o.start && o.run && (o.start = function() {
                    return this.run(), this
                }), o.stop || (o.stop = function() {
                    var e = this.options;
                    return e && e.animate && e.eles.stop(), this
                }), o.on = e.define.on({
                    layout: !0
                }), o.one = e.define.on({
                    layout: !0,
                    unbindSelfOnTrigger: !0
                }), o.once = e.define.on({
                    layout: !0,
                    unbindAllBindersOnTrigger: !0
                }), o.off = e.define.off({
                    layout: !0
                }), o.trigger = e.define.trigger({
                    layout: !0
                }), e.define.eventAliasesOn(o)
            }
            return e.util.setMap({
                map: a,
                keys: [t, n],
                value: r
            })
        }

        function n(t, n) {
            return e.util.getMap({
                map: a,
                keys: [t, n]
            })
        }

        function r(t, n, r, i, a) {
            return e.util.setMap({
                map: o,
                keys: [t, n, r, i],
                value: a
            })
        }

        function i(t, n, r, i) {
            return e.util.getMap({
                map: o,
                keys: [t, n, r, i]
            })
        }
        var a = {};
        e.extensions = a;
        var o = {};
        e.modules = o, e.extension = function() {
            return 2 == arguments.length ? n.apply(this, arguments) : 3 == arguments.length ? t.apply(this, arguments) : 4 == arguments.length ? i.apply(this, arguments) : 5 == arguments.length ? r.apply(this, arguments) : void e.util.error("Invalid extension access syntax")
        }
    }(cytoscape),
    function(e, t) {
        "use strict";
        var n = function(e) {
            var t = e[0]._cyreg = e[0]._cyreg || {};
            return t
        };
        t.registerJquery = function(e) {
            e && (e.fn.cytoscape || (e.fn.cytoscape = function(r) {
                var i = e(this);
                if ("get" === r) return n(i).cy;
                if (t.is.fn(r)) {
                    var a = r,
                        o = n(i).cy;
                    if (o && o.isReady()) o.trigger("ready", [], a);
                    else {
                        var s = n(i),
                            l = s.readies = s.readies || [];
                        l.push(a)
                    }
                } else if (t.is.plainObject(r)) return i.each(function() {
                    var t = e.extend({}, r, {
                        container: e(this)[0]
                    });
                    window.cy = cytoscape(t)
                })
            }, e.cytoscape = cytoscape, null == e.fn.cy && null == e.cy && (e.fn.cy = e.fn.cytoscape, e.cy = e.cytoscape)))
        }, t.registerJquery(e), t.util.require("jquery", function(e) {
            t.registerJquery(e)
        })
    }("undefined" != typeof jQuery ? jQuery : null, cytoscape),
    function(e) {
        "use strict";

        function t() {
            return !1
        }

        function n() {
            return !0
        }
        e.Event = function(r, i) {
            return this instanceof e.Event ? (r && r.type ? (this.originalEvent = r, this.type = r.type, this.isDefaultPrevented = r.defaultPrevented ? n : t) : this.type = r, i && (this.type = void 0 !== i.type ? i.type : this.type, this.cy = i.cy, this.cyTarget = i.cyTarget, this.cyPosition = i.cyPosition, this.cyRenderedPosition = i.cyRenderedPosition, this.namespace = i.namespace, this.layout = i.layout, this.data = i.data, this.message = i.message), void(this.timeStamp = r && r.timeStamp || +new Date)) : new e.Event(r, i)
        }, e.Event.prototype = {
            preventDefault: function() {
                this.isDefaultPrevented = n;
                var e = this.originalEvent;
                e && e.preventDefault && e.preventDefault()
            },
            stopPropagation: function() {
                this.isPropagationStopped = n;
                var e = this.originalEvent;
                e && e.stopPropagation && e.stopPropagation()
            },
            stopImmediatePropagation: function() {
                this.isImmediatePropagationStopped = n, this.stopPropagation()
            },
            isDefaultPrevented: t,
            isPropagationStopped: t,
            isImmediatePropagationStopped: t
        }
    }(cytoscape),
    function(e) {
        "use strict";
        e.define = {
            data: function(t) {
                var n = {
                    field: "data",
                    bindingEvent: "data",
                    allowBinding: !1,
                    allowSetting: !1,
                    allowGetting: !1,
                    settingEvent: "data",
                    settingTriggersEvent: !1,
                    triggerFnName: "trigger",
                    immutableKeys: {},
                    updateStyle: !1,
                    onSet: function(e) {},
                    canSet: function(e) {
                        return !0
                    }
                };
                return t = e.util.extend({}, n, t),
                    function(n, r) {
                        var i = t,
                            a = this,
                            o = void 0 !== a.length,
                            s = o ? a : [a],
                            l = o ? a[0] : a;
                        if (e.is.string(n)) {
                            if (i.allowGetting && void 0 === r) {
                                var u;
                                return l && (u = l._private[i.field][n]), u
                            }
                            if (i.allowSetting && void 0 !== r) {
                                var c = !i.immutableKeys[n];
                                if (c) {
                                    for (var d = 0, h = s.length; h > d; d++) i.canSet(s[d]) && (s[d]._private[i.field][n] = r);
                                    i.updateStyle && a.updateStyle(), i.onSet(a), i.settingTriggersEvent && a[i.triggerFnName](i.settingEvent)
                                }
                            }
                        } else if (i.allowSetting && e.is.plainObject(n)) {
                            var p, f, v = n;
                            for (p in v) {
                                f = v[p];
                                var c = !i.immutableKeys[p];
                                if (c)
                                    for (var d = 0, h = s.length; h > d; d++) i.canSet(s[d]) && (s[d]._private[i.field][p] = f)
                            }
                            i.updateStyle && a.updateStyle(), i.onSet(a), i.settingTriggersEvent && a[i.triggerFnName](i.settingEvent)
                        } else if (i.allowBinding && e.is.fn(n)) {
                            var g = n;
                            a.bind(i.bindingEvent, g)
                        } else if (i.allowGetting && void 0 === n) {
                            var u;
                            return l && (u = l._private[i.field]), u
                        }
                        return a
                    }
            },
            removeData: function(t) {
                var n = {
                    field: "data",
                    event: "data",
                    triggerFnName: "trigger",
                    triggerEvent: !1,
                    immutableKeys: {}
                };
                return t = e.util.extend({}, n, t),
                    function(n) {
                        var r = t,
                            i = this,
                            a = void 0 !== i.length,
                            o = a ? i : [i];
                        if (e.is.string(n)) {
                            for (var s = n.split(/\s+/), l = s.length, u = 0; l > u; u++) {
                                var c = s[u];
                                if (!e.is.emptyString(c)) {
                                    var d = !r.immutableKeys[c];
                                    if (d)
                                        for (var h = 0, p = o.length; p > h; h++) o[h]._private[r.field][c] = void 0
                                }
                            }
                            r.triggerEvent && i[r.triggerFnName](r.event)
                        } else if (void 0 === n) {
                            for (var h = 0, p = o.length; p > h; h++) {
                                var f = o[h]._private[r.field];
                                for (var c in f) {
                                    var v = !r.immutableKeys[c];
                                    v && (f[c] = void 0)
                                }
                            }
                            r.triggerEvent && i[r.triggerFnName](r.event)
                        }
                        return i
                    }
            },
            event: {
                regex: /(\w+)(\.\w+)?/,
                optionalTypeRegex: /(\w+)?(\.\w+)?/,
                falseCallback: function() {
                    return !1
                }
            },
            on: function(t) {
                var n = {
                    unbindSelfOnTrigger: !1,
                    unbindAllBindersOnTrigger: !1
                };
                return t = e.util.extend({}, n, t),
                    function(n, r, i, a) {
                        var o = this,
                            s = void 0 !== o.length,
                            l = s ? o : [o],
                            u = e.is.string(n),
                            c = t;
                        if (e.is.plainObject(r) ? (a = i, i = r, r = void 0) : (e.is.fn(r) || r === !1) && (a = r, i = void 0, r = void 0), (e.is.fn(i) || i === !1) && (a = i, i = void 0), !e.is.fn(a) && a !== !1 && u) return o;
                        if (u) {
                            var d = {};
                            d[n] = a, n = d
                        }
                        for (var h in n)
                            if (a = n[h], a === !1 && (a = e.define.event.falseCallback), e.is.fn(a)) {
                                h = h.split(/\s+/);
                                for (var p = 0; p < h.length; p++) {
                                    var f = h[p];
                                    if (!e.is.emptyString(f)) {
                                        var v = f.match(e.define.event.regex);
                                        if (v)
                                            for (var g = v[1], y = v[2] ? v[2] : void 0, m = {
                                                    callback: a,
                                                    data: i,
                                                    delegated: r ? !0 : !1,
                                                    selector: r,
                                                    selObj: new e.Selector(r),
                                                    type: g,
                                                    namespace: y,
                                                    unbindSelfOnTrigger: c.unbindSelfOnTrigger,
                                                    unbindAllBindersOnTrigger: c.unbindAllBindersOnTrigger,
                                                    binders: l
                                                }, x = 0; x < l.length; x++) {
                                                var b = l[x]._private;
                                                b.listeners = b.listeners || [], b.listeners.push(m)
                                            }
                                    }
                                }
                            }
                        return o
                    }
            },
            eventAliasesOn: function(t) {
                var n = t;
                n.addListener = n.listen = n.bind = n.on, n.removeListener = n.unlisten = n.unbind = n.off, n.emit = n.trigger, n.pon = n.promiseOn = function(t, n) {
                    var r = this,
                        i = Array.prototype.slice.call(arguments, 0);
                    return new e.Promise(function(e, t) {
                        var n = function(t) {
                                r.off.apply(r, o), e(t)
                            },
                            a = i.concat([n]),
                            o = a.concat([]);
                        r.on.apply(r, a)
                    })
                }
            },
            off: function(t) {
                var n = {};
                return t = e.util.extend({}, n, t),
                    function(t, n, r) {
                        var i = this,
                            a = void 0 !== i.length,
                            o = a ? i : [i],
                            s = e.is.string(t);
                        if (0 === arguments.length) {
                            for (var l = 0; l < o.length; l++) o[l]._private.listeners = [];
                            return i
                        }
                        if ((e.is.fn(n) || n === !1) && (r = n, n = void 0), s) {
                            var u = {};
                            u[t] = r, t = u
                        }
                        for (var c in t) {
                            r = t[c], r === !1 && (r = e.define.event.falseCallback), c = c.split(/\s+/);
                            for (var d = 0; d < c.length; d++) {
                                var h = c[d];
                                if (!e.is.emptyString(h)) {
                                    var p = h.match(e.define.event.optionalTypeRegex);
                                    if (p)
                                        for (var f = p[1] ? p[1] : void 0, v = p[2] ? p[2] : void 0, l = 0; l < o.length; l++)
                                            for (var g = o[l]._private.listeners = o[l]._private.listeners || [], y = 0; y < g.length; y++) {
                                                var m = g[y],
                                                    x = !v || v === m.namespace,
                                                    b = !f || m.type === f,
                                                    w = !r || r === m.callback,
                                                    _ = x && b && w;
                                                _ && (g.splice(y, 1), y--)
                                            }
                                }
                            }
                        }
                        return i
                    }
            },
            trigger: function(t) {
                var n = {};
                return t = e.util.extend({}, n, t),
                    function(n, r, i) {
                        var a = this,
                            o = void 0 !== a.length,
                            s = o ? a : [a],
                            l = e.is.string(n),
                            u = e.is.plainObject(n),
                            c = e.is.event(n),
                            d = this._private.cy || (e.is.core(this) ? this : null),
                            h = d ? d.hasCompoundNodes() : !1;
                        if (l) {
                            var p = n.split(/\s+/);
                            n = [];
                            for (var f = 0; f < p.length; f++) {
                                var v = p[f];
                                if (!e.is.emptyString(v)) {
                                    var g = v.match(e.define.event.regex),
                                        y = g[1],
                                        m = g[2] ? g[2] : void 0;
                                    n.push({
                                        type: y,
                                        namespace: m
                                    })
                                }
                            }
                        } else if (u) {
                            var x = n;
                            n = [x]
                        }
                        r ? e.is.array(r) || (r = [r]) : r = [];
                        for (var f = 0; f < n.length; f++)
                            for (var b = n[f], w = 0; w < s.length; w++) {
                                var v, _ = s[w],
                                    E = _._private.listeners = _._private.listeners || [],
                                    T = e.is.element(_),
                                    S = T || t.layout;
                                if (c ? (v = b, v.cyTarget = v.cyTarget || _, v.cy = v.cy || d) : v = new e.Event(b, {
                                        cyTarget: _,
                                        cy: d,
                                        namespace: b.namespace
                                    }), b.layout && (v.layout = b.layout), t.layout && (v.layout = _), v.cyPosition) {
                                    var C = v.cyPosition,
                                        k = d.zoom(),
                                        D = d.pan();
                                    v.cyRenderedPosition = {
                                        x: C.x * k + D.x,
                                        y: C.y * k + D.y
                                    }
                                }
                                i && (E = [{
                                    namespace: v.namespace,
                                    type: v.type,
                                    callback: i
                                }]);
                                for (var N = 0; N < E.length; N++) {
                                    var P = E[N],
                                        M = !P.namespace || P.namespace === v.namespace,
                                        B = P.type === v.type,
                                        L = P.delegated ? _ !== v.cyTarget && e.is.element(v.cyTarget) && P.selObj.matches(v.cyTarget) : !0,
                                        O = M && B && L;
                                    if (O) {
                                        var A = [v];
                                        if (A = A.concat(r), P.data ? v.data = P.data : v.data = void 0, (P.unbindSelfOnTrigger || P.unbindAllBindersOnTrigger) && (E.splice(N, 1), N--), P.unbindAllBindersOnTrigger)
                                            for (var I = P.binders, z = 0; z < I.length; z++) {
                                                var R = I[z];
                                                if (R && R !== _)
                                                    for (var j = R._private.listeners, F = 0; F < j.length; F++) {
                                                        var q = j[F];
                                                        q === P && (j.splice(F, 1), F--)
                                                    }
                                            }
                                        var V = P.delegated ? v.cyTarget : _,
                                            X = P.callback.apply(V, A);
                                        (X === !1 || v.isPropagationStopped()) && (S = !1, X === !1 && (v.stopPropagation(), v.preventDefault()))
                                    }
                                }
                                if (S) {
                                    var H = h ? _._private.parent : null,
                                        Y = null != H && 0 !== H.length;
                                    Y ? (H = H[0], H.trigger(v)) : d.trigger(v)
                                }
                            }
                        return a
                    }
            },
            animated: function(t) {
                var n = {};
                return t = e.util.extend({}, n, t),
                    function() {
                        var e = this,
                            t = void 0 !== e.length,
                            n = t ? e : [e],
                            r = this._private.cy || this;
                        if (!r.styleEnabled()) return !1;
                        var i = n[0];
                        return i ? i._private.animation.current.length > 0 : void 0
                    }
            },
            clearQueue: function(t) {
                var n = {};
                return t = e.util.extend({}, n, t),
                    function() {
                        var e = this,
                            t = void 0 !== e.length,
                            n = t ? e : [e],
                            r = this._private.cy || this;
                        if (!r.styleEnabled()) return this;
                        for (var i = 0; i < n.length; i++) {
                            var a = n[i];
                            a._private.animation.queue = []
                        }
                        return this
                    }
            },
            delay: function(t) {
                var n = {};
                return t = e.util.extend({}, n, t),
                    function(e, t) {
                        var n = this._private.cy || this;
                        return n.styleEnabled() ? (this.animate({
                            delay: e
                        }, {
                            duration: e,
                            complete: t
                        }), this) : this
                    }
            },
            animate: function(t) {
                var n = {};
                return t = e.util.extend({}, n, t),
                    function(e, t) {
                        var n = this,
                            r = void 0 !== n.length,
                            i = r ? n : [n],
                            a = this._private.cy || this,
                            o = !r,
                            s = !o;
                        if (!a.styleEnabled()) return this;
                        var l, u = +new Date,
                            c = a.style();
                        switch (void 0 === t && (t = {}), void 0 === t.duration && (t.duration = 400), t.duration) {
                            case "slow":
                                t.duration = 600;
                                break;
                            case "fast":
                                t.duration = 200
                        }
                        var d = !0;
                        if (e)
                            for (var h in e) {
                                d = !1;
                                break
                            }
                        if (d) return this;
                        if (e.css && s && (e.css = c.getPropsList(e.css)), e.renderedPosition && s) {
                            var p = e.renderedPosition,
                                f = a.pan(),
                                v = a.zoom();
                            e.position = {
                                x: (p.x - f.x) / v,
                                y: (p.y - f.y) / v
                            }
                        }
                        if (e.panBy && o) {
                            var g = e.panBy,
                                y = a.pan();
                            e.pan = {
                                x: y.x + g.x,
                                y: y.y + g.y
                            }
                        }
                        var m = e.center || e.centre;
                        if (m && o) {
                            var x = a.getCenterPan(m.eles, e.zoom);
                            x && (e.pan = x)
                        }
                        if (e.fit && o) {
                            var b = e.fit,
                                w = a.getFitViewport(b.eles || b.boundingBox, b.padding);
                            w && (e.pan = w.pan, e.zoom = w.zoom)
                        }
                        for (var h = 0; h < i.length; h++) {
                            var _ = i[h];
                            l = _.animated() && (void 0 === t.queue || t.queue) ? _._private.animation.queue : _._private.animation.current, l.push({
                                properties: e,
                                duration: t.duration,
                                params: t,
                                callTime: u
                            })
                        }
                        return s && a.addToAnimationPool(this), this
                    }
            },
            stop: function(t) {
                var n = {};
                return t = e.util.extend({}, n, t),
                    function(e, t) {
                        var n = this,
                            r = void 0 !== n.length,
                            i = r ? n : [n],
                            a = this._private.cy || this;
                        if (!a.styleEnabled()) return this;
                        for (var o = 0; o < i.length; o++) {
                            for (var s = i[o], l = s._private.animation.current, u = 0; u < l.length; u++) {
                                var c = l[u];
                                t && (c.duration = 0)
                            }
                            e && (s._private.animation.queue = []), t || (s._private.animation.current = [])
                        }
                        return a.notify({
                            collection: this,
                            type: "draw"
                        }), this
                    }
            }
        }
    }(cytoscape),
    function(e) {
        "use strict";
        e.fn.selector = function(t, n) {
            for (var r in t) {
                var i = t[r];
                e.Selector.prototype[r] = i
            }
        }, e.Selector = function(t, n) {
            if (!(this instanceof e.Selector)) return new e.Selector(t, n);
            void 0 === n && void 0 !== t && (n = t, t = void 0);
            var r = this;
            if (r._private = {
                    selectorText: null,
                    invalid: !0
                }, !n || e.is.string(n) && n.match(/^\s*$/)) null == t ? r.length = 0 : (r[0] = o(), r[0].group = t, r.length = 1);
            else if (e.is.element(n)) {
                var i = new e.Collection(r.cy(), [n]);
                r[0] = o(), r[0].collection = i, r.length = 1
            } else if (e.is.collection(n)) r[0] = o(), r[0].collection = n, r.length = 1;
            else if (e.is.fn(n)) r[0] = o(), r[0].filter = n, r.length = 1;
            else {
                if (!e.is.string(n)) return void e.util.error("A selector must be created from a string; found " + n);
                var a = null,
                    o = function() {
                        return {
                            classes: [],
                            colonSelectors: [],
                            data: [],
                            group: null,
                            ids: [],
                            meta: [],
                            collection: null,
                            filter: null,
                            parent: null,
                            ancestor: null,
                            subject: null,
                            child: null,
                            descendant: null
                        }
                    },
                    s = {
                        metaChar: "[\\!\\\"\\#\\$\\%\\&\\'\\(\\)\\*\\+\\,\\.\\/\\:\\;\\<\\=\\>\\?\\@\\[\\]\\^\\`\\{\\|\\}\\~]",
                        comparatorOp: "=|\\!=|>|>=|<|<=|\\$=|\\^=|\\*=",
                        boolOp: "\\?|\\!|\\^",
                        string: '"(?:\\\\"|[^"])+"|' + "'(?:\\\\'|[^'])+'",
                        number: e.util.regex.number,
                        meta: "degree|indegree|outdegree",
                        separator: "\\s*,\\s*",
                        descendant: "\\s+",
                        child: "\\s+>\\s+",
                        subject: "\\$"
                    };
                s.variable = "(?:[\\w-]|(?:\\\\" + s.metaChar + "))+", s.value = s.string + "|" + s.number, s.className = s.variable, s.id = s.variable;
                for (var l = function(e) {
                        return e.replace(new RegExp("\\\\(" + s.metaChar + ")", "g"), function(e, t, n, r) {
                            return t
                        })
                    }, u = s.comparatorOp.split("|"), c = 0; c < u.length; c++) {
                    var d = u[c];
                    s.comparatorOp += "|@" + d
                }
                for (var u = s.comparatorOp.split("|"), c = 0; c < u.length; c++) {
                    var d = u[c];
                    d.indexOf("!") >= 0 || "=" !== d && (s.comparatorOp += "|\\!" + d)
                }
                var h = {
                        group: {
                            query: !0,
                            regex: "(node|edge|\\*)",
                            populate: function(e) {
                                this.group = "*" == e ? e : e + "s"
                            }
                        },
                        state: {
                            query: !0,
                            regex: "(:selected|:unselected|:locked|:unlocked|:visible|:hidden|:transparent|:grabbed|:free|:removed|:inside|:grabbable|:ungrabbable|:animated|:unanimated|:selectable|:unselectable|:orphan|:nonorphan|:parent|:child|:loop|:simple|:active|:inactive|:touch|:backgrounding|:nonbackgrounding)",
                            populate: function(e) {
                                this.colonSelectors.push(e)
                            }
                        },
                        id: {
                            query: !0,
                            regex: "\\#(" + s.id + ")",
                            populate: function(e) {
                                this.ids.push(l(e))
                            }
                        },
                        className: {
                            query: !0,
                            regex: "\\.(" + s.className + ")",
                            populate: function(e) {
                                this.classes.push(l(e))
                            }
                        },
                        dataExists: {
                            query: !0,
                            regex: "\\[\\s*(" + s.variable + ")\\s*\\]",
                            populate: function(e) {
                                this.data.push({
                                    field: l(e)
                                })
                            }
                        },
                        dataCompare: {
                            query: !0,
                            regex: "\\[\\s*(" + s.variable + ")\\s*(" + s.comparatorOp + ")\\s*(" + s.value + ")\\s*\\]",
                            populate: function(e, t, n) {
                                var r = null != new RegExp("^" + s.string + "$").exec(n);
                                n = r ? n.substring(1, n.length - 1) : parseFloat(n), this.data.push({
                                    field: l(e),
                                    operator: t,
                                    value: n
                                })
                            }
                        },
                        dataBool: {
                            query: !0,
                            regex: "\\[\\s*(" + s.boolOp + ")\\s*(" + s.variable + ")\\s*\\]",
                            populate: function(e, t) {
                                this.data.push({
                                    field: l(t),
                                    operator: e
                                })
                            }
                        },
                        metaCompare: {
                            query: !0,
                            regex: "\\[\\[\\s*(" + s.meta + ")\\s*(" + s.comparatorOp + ")\\s*(" + s.number + ")\\s*\\]\\]",
                            populate: function(e, t, n) {
                                this.meta.push({
                                    field: l(e),
                                    operator: t,
                                    value: parseFloat(n)
                                })
                            }
                        },
                        nextQuery: {
                            separator: !0,
                            regex: s.separator,
                            populate: function() {
                                r[++c] = o(), a = null
                            }
                        },
                        child: {
                            separator: !0,
                            regex: s.child,
                            populate: function() {
                                var e = o();
                                e.parent = this, e.subject = a, r[c] = e
                            }
                        },
                        descendant: {
                            separator: !0,
                            regex: s.descendant,
                            populate: function() {
                                var e = o();
                                e.ancestor = this, e.subject = a, r[c] = e
                            }
                        },
                        subject: {
                            modifier: !0,
                            regex: s.subject,
                            populate: function() {
                                return null != a && this.subject != this ? (e.util.error("Redefinition of subject in selector `" + n + "`"), !1) : (a = this, void(this.subject = this))
                            }
                        }
                    },
                    p = 0;
                for (var f in h) h[p] = h[f], h[p].name = f, p++;
                h.length = p, r._private.selectorText = n;
                var v = n,
                    c = 0,
                    g = function(t) {
                        for (var n, r, i, a = 0; a < h.length; a++) {
                            var o = h[a],
                                s = o.name;
                            if (!e.is.fn(t) || t(s, o)) {
                                var l = v.match(new RegExp("^" + o.regex));
                                if (null != l) {
                                    r = l, n = o, i = s;
                                    var u = l[0];
                                    v = v.substring(u.length);
                                    break
                                }
                            }
                        }
                        return {
                            expr: n,
                            match: r,
                            name: i
                        }
                    },
                    y = function() {
                        var e = v.match(/^\s+/);
                        if (e) {
                            var t = e[0];
                            v = v.substring(t.length)
                        }
                    };
                for (r[0] = o(), y();;) {
                    var m = g();
                    if (null == m.expr) return void e.util.error("The selector `" + n + "`is invalid");
                    for (var x = [], p = 1; p < m.match.length; p++) x.push(m.match[p]);
                    var b = m.expr.populate.apply(r[c], x);
                    if (b === !1) return;
                    if (v.match(/^\s*$/)) break
                }
                for (r.length = c + 1, p = 0; p < r.length; p++) {
                    var w = r[p];
                    if (null != w.subject) {
                        for (; w.subject != w;)
                            if (null != w.parent) {
                                var _ = w.parent,
                                    E = w;
                                E.parent = null, _.child = E, w = _
                            } else {
                                if (null == w.ancestor) {
                                    e.util.error("When adjusting references for the selector `" + w + "`, neither parent nor ancestor was found");
                                    break
                                }
                                var T = w.ancestor,
                                    S = w;
                                S.ancestor = null, T.descendant = S, w = T
                            }
                        r[p] = w.subject
                    }
                }
                if (null != t)
                    for (var p = 0; p < r.length; p++) {
                        if (null != r[p].group && r[p].group != t) return void e.util.error("Group `" + r[p].group + "` conflicts with implicit group `" + t + "` in selector `" + n + "`");
                        r[p].group = t
                    }
            }
            r._private.invalid = !1
        }, e.selfn = e.Selector.prototype, e.selfn.size = function() {
            return this.length
        }, e.selfn.eq = function(e) {
            return this[e]
        }, e.selfn.find = function() {};
        var t = function(n, r) {
            if (null != n.group && "*" != n.group && n.group != r._private.group) return !1;
            for (var i = r.cy(), a = !0, o = 0; o < n.colonSelectors.length; o++) {
                var s = n.colonSelectors[o];
                switch (s) {
                    case ":selected":
                        a = r.selected();
                        break;
                    case ":unselected":
                        a = !r.selected();
                        break;
                    case ":selectable":
                        a = r.selectable();
                        break;
                    case ":unselectable":
                        a = !r.selectable();
                        break;
                    case ":locked":
                        a = r.locked();
                        break;
                    case ":unlocked":
                        a = !r.locked();
                        break;
                    case ":visible":
                        a = r.visible();
                        break;
                    case ":hidden":
                        a = !r.visible();
                        break;
                    case ":transparent":
                        a = r.transparent();
                        break;
                    case ":grabbed":
                        a = r.grabbed();
                        break;
                    case ":free":
                        a = !r.grabbed();
                        break;
                    case ":removed":
                        a = r.removed();
                        break;
                    case ":inside":
                        a = !r.removed();
                        break;
                    case ":grabbable":
                        a = r.grabbable();
                        break;
                    case ":ungrabbable":
                        a = !r.grabbable();
                        break;
                    case ":animated":
                        a = r.animated();
                        break;
                    case ":unanimated":
                        a = !r.animated();
                        break;
                    case ":parent":
                        a = r.isNode() && r.children().nonempty();
                        break;
                    case ":child":
                    case ":nonorphan":
                        a = r.isNode() && r.parent().nonempty();
                        break;
                    case ":orphan":
                        a = r.isNode() && r.parent().empty();
                        break;
                    case ":loop":
                        a = r.isEdge() && r.data("source") === r.data("target");
                        break;
                    case ":simple":
                        a = r.isEdge() && r.data("source") !== r.data("target");
                        break;
                    case ":active":
                        a = r.active();
                        break;
                    case ":inactive":
                        a = !r.active();
                        break;
                    case ":touch":
                        a = e.is.touch();
                        break;
                    case ":backgrounding":
                        a = r.backgrounding();
                        break;
                    case ":nonbackgrounding":
                        a = !r.backgrounding()
                }
                if (!a) break
            }
            if (!a) return !1;
            for (var l = !0, o = 0; o < n.ids.length; o++) {
                var u = n.ids[o],
                    c = r._private.data.id;
                if (l = l && u == c, !l) break
            }
            if (!l) return !1;
            for (var d = !0, o = 0; o < n.classes.length; o++) {
                var h = n.classes[o];
                if (d = d && r.hasClass(h), !d) break
            }
            if (!d) return !1;
            var p = function(t) {
                    for (var r = !0, i = 0; i < n[t.name].length; i++) {
                        var a, o = n[t.name][i],
                            s = o.operator,
                            l = o.value,
                            u = o.field;
                        if (null != s && null != l) {
                            var c = t.fieldValue(u),
                                d = e.is.string(c) || e.is.number(c) ? "" + c : "",
                                h = "" + l,
                                p = !1;
                            s.indexOf("@") >= 0 && (d = d.toLowerCase(), h = h.toLowerCase(), s = s.replace("@", ""), p = !0);
                            var f = !1,
                                v = !1;
                            switch (s.indexOf("!") >= 0 && (s = s.replace("!", ""), f = !0), p && (l = h.toLowerCase(), c = d.toLowerCase()), s) {
                                case "*=":
                                    a = d.search(h) >= 0;
                                    break;
                                case "$=":
                                    a = null != new RegExp(h + "$").exec(d);
                                    break;
                                case "^=":
                                    a = null != new RegExp("^" + h).exec(d);
                                    break;
                                case "=":
                                    a = c === l;
                                    break;
                                case "!=":
                                    a = c !== l;
                                    break;
                                case ">":
                                    a = f ? l >= c : c > l, v = !0;
                                    break;
                                case ">=":
                                    a = f ? l > c : c >= l, v = !0;
                                    break;
                                case "<":
                                    a = f ? c >= l : l > c, v = !0;
                                    break;
                                case "<=":
                                    a = f ? c > l : l >= c, v = !0;
                                    break;
                                default:
                                    a = !1
                            }
                        } else if (null != s) switch (s) {
                            case "?":
                                a = t.fieldTruthy(u);
                                break;
                            case "!":
                                a = !t.fieldTruthy(u);
                                break;
                            case "^":
                                a = t.fieldUndefined(u)
                        } else a = !t.fieldUndefined(u);
                        if (f && !v && (a = !a, v = !0), !a) {
                            r = !1;
                            break
                        }
                    }
                    return r
                },
                f = p({
                    name: "data",
                    fieldValue: function(e) {
                        return r._private.data[e]
                    },
                    fieldRef: function(e) {
                        return "element._private.data." + e
                    },
                    fieldUndefined: function(e) {
                        return void 0 === r._private.data[e]
                    },
                    fieldTruthy: function(e) {
                        return r._private.data[e] ? !0 : !1
                    }
                });
            if (!f) return !1;
            var v = p({
                name: "meta",
                fieldValue: function(e) {
                    return r[e]()
                },
                fieldRef: function(e) {
                    return "element." + e + "()"
                },
                fieldUndefined: function(e) {
                    return null == r[e]()
                },
                fieldTruthy: function(e) {
                    return r[e]() ? !0 : !1
                }
            });
            if (!v) return !1;
            if (null != n.collection) {
                var g = null != n.collection._private.ids[r.id()];
                if (!g) return !1
            }
            if (null != n.filter && 0 === r.collection().filter(n.filter).size()) return !1;
            var y = function(e, n) {
                if (null != e) {
                    var r = !1;
                    if (!i.hasCompoundNodes()) return !1;
                    n = n();
                    for (var a = 0; a < n.length; a++)
                        if (t(e, n[a])) {
                            r = !0;
                            break
                        }
                    return r
                }
                return !0
            };
            return y(n.parent, function() {
                return r.parent()
            }) && y(n.ancestor, function() {
                return r.parents()
            }) && y(n.child, function() {
                return r.children()
            }) && y(n.descendant, function() {
                return r.descendants()
            }) ? !0 : !1
        };
        e.selfn.filter = function(n) {
            var r = this,
                i = n.cy();
            if (r._private.invalid) return new e.Collection(i);
            var a = function(e, n) {
                for (var i = 0; i < r.length; i++) {
                    var a = r[i];
                    if (t(a, n)) return !0
                }
                return !1
            };
            null == r._private.selectorText && (a = function() {
                return !0
            });
            var o = n.filter(a);
            return o
        }, e.selfn.matches = function(e) {
            var n = this;
            if (n._private.invalid) return !1;
            for (var r = 0; r < n.length; r++) {
                var i = n[r];
                if (t(i, e)) return !0
            }
            return !1
        }, e.selfn.toString = e.selfn.selector = function() {
            for (var t = "", n = function(t, n) {
                    return e.is.string(t) ? n ? '"' + t + '"' : t : ""
                }, r = function(e) {
                    var t = "";
                    e.subject === e && (t += "$");
                    var a = n(e.group);
                    t += a.substring(0, a.length - 1);
                    for (var o = 0; o < e.data.length; o++) {
                        var s = e.data[o];
                        t += s.value ? "[" + s.field + n(s.operator) + n(s.value, !0) + "]" : "[" + n(s.operator) + s.field + "]"
                    }
                    for (var o = 0; o < e.meta.length; o++) {
                        var l = e.meta[o];
                        t += "[[" + l.field + n(l.operator) + n(l.value, !0) + "]]"
                    }
                    for (var o = 0; o < e.colonSelectors.length; o++) {
                        var u = e.colonSelectors[i];
                        t += u
                    }
                    for (var o = 0; o < e.ids.length; o++) {
                        var u = "#" + e.ids[i];
                        t += u
                    }
                    for (var o = 0; o < e.classes.length; o++) {
                        var u = "." + e.classes[i];
                        t += u
                    }
                    return null != e.parent && (t = r(e.parent) + " > " + t), null != e.ancestor && (t = r(e.ancestor) + " " + t), null != e.child && (t += " > " + r(e.child)), null != e.descendant && (t += " " + r(e.descendant)), t
                }, i = 0; i < this.length; i++) {
                var a = this[i];
                t += r(a), this.length > 1 && i < this.length - 1 && (t += ", ")
            }
            return t
        }
    }(cytoscape),
    function(e) {
        "use strict";
        e.Style = function(t) {
                return this instanceof e.Style ? e.is.core(t) ? (this._private = {
                    cy: t,
                    coreStyle: {},
                    newStyle: !0
                }, this.length = 0, void this.addDefaultStylesheet()) : void e.util.error("A style must have a core reference") : new e.Style(t)
            }, e.style = e.Style, e.styfn = e.Style.prototype, e.fn.style = function(t, n) {
                for (var r in t) {
                    var i = t[r];
                    e.Style.prototype = i
                }
            },
            function() {
                var t = e.util.regex.number,
                    n = e.util.regex.rgbaNoBackRefs,
                    r = e.util.regex.hslaNoBackRefs,
                    i = e.util.regex.hex3,
                    a = e.util.regex.hex6,
                    o = function(e) {
                        return "^" + e + "\\s*\\(\\s*([\\w\\.]+)\\s*\\)$"
                    },
                    s = function(e) {
                        return "^" + e + "\\s*\\(([\\w\\.]+)\\s*\\,\\s*(" + t + ")\\s*\\,\\s*(" + t + ")\\s*,\\s*(" + t + "|\\w+|" + n + "|" + r + "|" + i + "|" + a + ")\\s*\\,\\s*(" + t + "|\\w+|" + n + "|" + r + "|" + i + "|" + a + ")\\)$"
                    };
                e.style.types = {
                    time: {
                        number: !0,
                        min: 0,
                        units: "s|ms",
                        implicitUnits: "ms"
                    },
                    percent: {
                        number: !0,
                        min: 0,
                        max: 100,
                        units: "%"
                    },
                    zeroOneNumber: {
                        number: !0,
                        min: 0,
                        max: 1,
                        unitless: !0
                    },
                    nOneOneNumber: {
                        number: !0,
                        min: -1,
                        max: 1,
                        unitless: !0
                    },
                    nonNegativeInt: {
                        number: !0,
                        min: 0,
                        integer: !0,
                        unitless: !0
                    },
                    position: {
                        enums: ["parent", "origin"]
                    },
                    autoSize: {
                        number: !0,
                        min: 0,
                        enums: ["auto"]
                    },
                    number: {
                        number: !0
                    },
                    size: {
                        number: !0,
                        min: 0
                    },
                    bgSize: {
                        number: !0,
                        min: 0,
                        allowPercent: !0
                    },
                    bgWH: {
                        number: !0,
                        min: 0,
                        allowPercent: !0,
                        enums: ["auto"]
                    },
                    bgPos: {
                        number: !0,
                        allowPercent: !0
                    },
                    bgRepeat: {
                        enums: ["repeat", "repeat-x", "repeat-y", "no-repeat"]
                    },
                    bgFit: {
                        enums: ["none", "contain", "cover"]
                    },
                    bgClip: {
                        enums: ["none", "node"]
                    },
                    color: {
                        color: !0
                    },
                    lineStyle: {
                        enums: ["solid", "dotted", "dashed"]
                    },
                    borderStyle: {
                        enums: ["solid", "dotted", "dashed", "double"]
                    },
                    curveStyle: {
                        enums: ["bezier", "unbundled-bezier", "haystack"]
                    },
                    fontFamily: {
                        regex: '^([\\w- \\"]+(?:\\s*,\\s*[\\w- \\"]+)*)$'
                    },
                    fontVariant: {
                        enums: ["small-caps", "normal"]
                    },
                    fontStyle: {
                        enums: ["italic", "normal", "oblique"]
                    },
                    fontWeight: {
                        enums: ["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "800", "900", 100, 200, 300, 400, 500, 600, 700, 800, 900]
                    },
                    textDecoration: {
                        enums: ["none", "underline", "overline", "line-through"]
                    },
                    textTransform: {
                        enums: ["none", "uppercase", "lowercase"]
                    },
                    textWrap: {
                        enums: ["none", "wrap"]
                    },
                    textBackgroundShape: {
                        enums: ["rectangle", "roundrectangle"]
                    },
                    nodeShape: {
                        enums: ["rectangle", "roundrectangle", "ellipse", "triangle", "square", "pentagon", "hexagon", "heptagon", "octagon", "star", "diamond", "vee", "rhomboid"]
                    },
                    compoundIncludeLabels: {
                        enums: ["include", "exclude"]
                    },
                    arrowShape: {
                        enums: ["tee", "triangle", "triangle-tee", "triangle-backcurve", "half-triangle-overshot", "square", "circle", "diamond", "none"]
                    },
                    arrowFill: {
                        enums: ["filled", "hollow"]
                    },
                    display: {
                        enums: ["element", "none"]
                    },
                    visibility: {
                        enums: ["hidden", "visible"]
                    },
                    valign: {
                        enums: ["top", "center", "bottom"]
                    },
                    halign: {
                        enums: ["left", "center", "right"]
                    },
                    text: {
                        string: !0
                    },
                    data: {
                        mapping: !0,
                        regex: o("data")
                    },
                    layoutData: {
                        mapping: !0,
                        regex: o("layoutData")
                    },
                    scratch: {
                        mapping: !0,
                        regex: o("scratch")
                    },
                    mapData: {
                        mapping: !0,
                        regex: s("mapData")
                    },
                    mapLayoutData: {
                        mapping: !0,
                        regex: s("mapLayoutData")
                    },
                    mapScratch: {
                        mapping: !0,
                        regex: s("mapScratch")
                    },
                    fn: {
                        mapping: !0,
                        fn: !0
                    },
                    url: {
                        regex: "^url\\s*\\(\\s*([^\\s]+)\\s*\\s*\\)|none|(.+)$"
                    },
                    propList: {
                        propList: !0
                    },
                    angle: {
                        number: !0,
                        units: "deg|rad"
                    },
                    textRotation: {
                        enums: ["none", "autorotate"]
                    }
                };
                var l = e.style.types,
                    u = e.style.properties = [{
                        name: "text-valign",
                        type: l.valign
                    }, {
                        name: "text-halign",
                        type: l.halign
                    }, {
                        name: "color",
                        type: l.color
                    }, {
                        name: "content",
                        type: l.text
                    }, {
                        name: "text-outline-color",
                        type: l.color
                    }, {
                        name: "text-outline-width",
                        type: l.size
                    }, {
                        name: "text-outline-opacity",
                        type: l.zeroOneNumber
                    }, {
                        name: "text-opacity",
                        type: l.zeroOneNumber
                    }, {
                        name: "text-background-color",
                        type: l.color
                    }, {
                        name: "text-background-opacity",
                        type: l.zeroOneNumber
                    }, {
                        name: "text-border-opacity",
                        type: l.zeroOneNumber
                    }, {
                        name: "text-border-color",
                        type: l.color
                    }, {
                        name: "text-border-width",
                        type: l.size
                    }, {
                        name: "text-border-style",
                        type: l.borderStyle
                    }, {
                        name: "text-background-shape",
                        type: l.textBackgroundShape
                    }, {
                        name: "text-transform",
                        type: l.textTransform
                    }, {
                        name: "text-wrap",
                        type: l.textWrap
                    }, {
                        name: "text-max-width",
                        type: l.size
                    }, {
                        name: "font-family",
                        type: l.fontFamily
                    }, {
                        name: "font-style",
                        type: l.fontStyle
                    }, {
                        name: "font-weight",
                        type: l.fontWeight
                    }, {
                        name: "font-size",
                        type: l.size
                    }, {
                        name: "min-zoomed-font-size",
                        type: l.size
                    }, {
                        name: "edge-text-rotation",
                        type: l.textRotation
                    }, {
                        name: "display",
                        type: l.display
                    }, {
                        name: "visibility",
                        type: l.visibility
                    }, {
                        name: "opacity",
                        type: l.zeroOneNumber
                    }, {
                        name: "z-index",
                        type: l.nonNegativeInt
                    }, {
                        name: "overlay-padding",
                        type: l.size
                    }, {
                        name: "overlay-color",
                        type: l.color
                    }, {
                        name: "overlay-opacity",
                        type: l.zeroOneNumber
                    }, {
                        name: "shadow-blur",
                        type: l.size
                    }, {
                        name: "shadow-color",
                        type: l.color
                    }, {
                        name: "shadow-opacity",
                        type: l.zeroOneNumber
                    }, {
                        name: "shadow-offset-x",
                        type: l.number
                    }, {
                        name: "shadow-offset-y",
                        type: l.number
                    }, {
                        name: "text-shadow-blur",
                        type: l.size
                    }, {
                        name: "text-shadow-color",
                        type: l.color
                    }, {
                        name: "text-shadow-opacity",
                        type: l.zeroOneNumber
                    }, {
                        name: "text-shadow-offset-x",
                        type: l.number
                    }, {
                        name: "text-shadow-offset-y",
                        type: l.number
                    }, {
                        name: "transition-property",
                        type: l.propList
                    }, {
                        name: "transition-duration",
                        type: l.time
                    }, {
                        name: "transition-delay",
                        type: l.time
                    }, {
                        name: "height",
                        type: l.autoSize
                    }, {
                        name: "width",
                        type: l.autoSize
                    }, {
                        name: "shape",
                        type: l.nodeShape
                    }, {
                        name: "background-color",
                        type: l.color
                    }, {
                        name: "background-opacity",
                        type: l.zeroOneNumber
                    }, {
                        name: "background-blacken",
                        type: l.nOneOneNumber
                    }, {
                        name: "border-color",
                        type: l.color
                    }, {
                        name: "border-opacity",
                        type: l.zeroOneNumber
                    }, {
                        name: "border-width",
                        type: l.size
                    }, {
                        name: "border-style",
                        type: l.borderStyle
                    }, {
                        name: "background-image",
                        type: l.url
                    }, {
                        name: "background-image-opacity",
                        type: l.zeroOneNumber
                    }, {
                        name: "background-position-x",
                        type: l.bgPos
                    }, {
                        name: "background-position-y",
                        type: l.bgPos
                    }, {
                        name: "background-repeat",
                        type: l.bgRepeat
                    }, {
                        name: "background-fit",
                        type: l.bgFit
                    }, {
                        name: "background-clip",
                        type: l.bgClip
                    }, {
                        name: "background-width",
                        type: l.bgWH
                    }, {
                        name: "background-height",
                        type: l.bgWH
                    }, {
                        name: "padding-left",
                        type: l.size
                    }, {
                        name: "padding-right",
                        type: l.size
                    }, {
                        name: "padding-top",
                        type: l.size
                    }, {
                        name: "padding-bottom",
                        type: l.size
                    }, {
                        name: "position",
                        type: l.position
                    }, {
                        name: "compound-sizing-wrt-labels",
                        type: l.compoundIncludeLabels
                    }, {
                        name: "line-style",
                        type: l.lineStyle
                    }, {
                        name: "line-color",
                        type: l.color
                    }, {
                        name: "control-point-step-size",
                        type: l.size
                    }, {
                        name: "control-point-distance",
                        type: l.number
                    }, {
                        name: "control-point-weight",
                        type: l.zeroOneNumber
                    }, {
                        name: "curve-style",
                        type: l.curveStyle
                    }, {
                        name: "haystack-radius",
                        type: l.zeroOneNumber
                    }, {
                        name: "source-arrow-shape",
                        type: l.arrowShape
                    }, {
                        name: "target-arrow-shape",
                        type: l.arrowShape
                    }, {
                        name: "mid-source-arrow-shape",
                        type: l.arrowShape
                    }, {
                        name: "mid-target-arrow-shape",
                        type: l.arrowShape
                    }, {
                        name: "source-arrow-color",
                        type: l.color
                    }, {
                        name: "target-arrow-color",
                        type: l.color
                    }, {
                        name: "mid-source-arrow-color",
                        type: l.color
                    }, {
                        name: "mid-target-arrow-color",
                        type: l.color
                    }, {
                        name: "source-arrow-fill",
                        type: l.arrowFill
                    }, {
                        name: "target-arrow-fill",
                        type: l.arrowFill
                    }, {
                        name: "mid-source-arrow-fill",
                        type: l.arrowFill
                    }, {
                        name: "mid-target-arrow-fill",
                        type: l.arrowFill
                    }, {
                        name: "selection-box-color",
                        type: l.color
                    }, {
                        name: "selection-box-opacity",
                        type: l.zeroOneNumber
                    }, {
                        name: "selection-box-border-color",
                        type: l.color
                    }, {
                        name: "selection-box-border-width",
                        type: l.size
                    }, {
                        name: "active-bg-color",
                        type: l.color
                    }, {
                        name: "active-bg-opacity",
                        type: l.zeroOneNumber
                    }, {
                        name: "active-bg-size",
                        type: l.size
                    }, {
                        name: "outside-texture-bg-color",
                        type: l.color
                    }, {
                        name: "outside-texture-bg-opacity",
                        type: l.zeroOneNumber
                    }];
                e.style.pieBackgroundN = 16, u.push({
                    name: "pie-size",
                    type: l.bgSize
                });
                for (var c = 1; c <= e.style.pieBackgroundN; c++) u.push({
                    name: "pie-" + c + "-background-color",
                    type: l.color
                }), u.push({
                    name: "pie-" + c + "-background-size",
                    type: l.percent
                }), u.push({
                    name: "pie-" + c + "-background-opacity",
                    type: l.zeroOneNumber
                });
                for (var c = 0; c < u.length; c++) {
                    var d = u[c];
                    u[d.name] = d
                }
            }(), e.styfn.addDefaultStylesheet = function() {
                var e = "Helvetica",
                    t = "normal",
                    n = "normal",
                    r = "#000",
                    i = "none",
                    a = 16,
                    o = 9999;
                this.selector("node, edge").css({
                    "text-valign": "top",
                    "text-halign": "center",
                    color: r,
                    "text-outline-color": "#000",
                    "text-outline-width": 0,
                    "text-outline-opacity": 1,
                    "text-opacity": 1,
                    "text-decoration": "none",
                    "text-transform": i,
                    "text-wrap": "none",
                    "text-max-width": o,
                    "text-background-color": "#000",
                    "text-background-opacity": 0,
                    "text-border-opacity": 0,
                    "text-border-width": 0,
                    "text-border-style": "solid",
                    "text-border-color": "#000",
                    "text-background-shape": "rectangle",
                    "font-family": e,
                    "font-style": t,
                    "font-weight": n,
                    "font-size": a,
                    "min-zoomed-font-size": 0,
                    "edge-text-rotation": "none",
                    visibility: "visible",
                    display: "element",
                    opacity: 1,
                    "z-index": 0,
                    content: "",
                    "overlay-opacity": 0,
                    "overlay-color": "#000",
                    "overlay-padding": 10,
                    "shadow-opacity": 0,
                    "shadow-color": "#000",
                    "shadow-blur": 10,
                    "shadow-offset-x": 0,
                    "shadow-offset-y": 0,
                    "text-shadow-opacity": 0,
                    "text-shadow-color": "#000",
                    "text-shadow-blur": 5,
                    "text-shadow-offset-x": 0,
                    "text-shadow-offset-y": 0,
                    "transition-property": "none",
                    "transition-duration": 0,
                    "transition-delay": 0,
                    "background-blacken": 0,
                    "background-color": "#888",
                    "background-opacity": 1,
                    "background-image": "none",
                    "background-image-opacity": 1,
                    "background-position-x": "50%",
                    "background-position-y": "50%",
                    "background-repeat": "no-repeat",
                    "background-fit": "none",
                    "background-clip": "node",
                    "background-width": "auto",
                    "background-height": "auto",
                    "border-color": "#000",
                    "border-opacity": 1,
                    "border-width": 0,
                    "border-style": "solid",
                    height: 30,
                    width: 30,
                    shape: "ellipse",
                    "padding-top": 0,
                    "padding-bottom": 0,
                    "padding-left": 0,
                    "padding-right": 0,
                    position: "origin",
                    "compound-sizing-wrt-labels": "include",
                    "pie-size": "100%",
                    "pie-1-background-color": "black",
                    "pie-2-background-color": "black",
                    "pie-3-background-color": "black",
                    "pie-4-background-color": "black",
                    "pie-5-background-color": "black",
                    "pie-6-background-color": "black",
                    "pie-7-background-color": "black",
                    "pie-8-background-color": "black",
                    "pie-9-background-color": "black",
                    "pie-10-background-color": "black",
                    "pie-11-background-color": "black",
                    "pie-12-background-color": "black",
                    "pie-13-background-color": "black",
                    "pie-14-background-color": "black",
                    "pie-15-background-color": "black",
                    "pie-16-background-color": "black",
                    "pie-1-background-size": "0%",
                    "pie-2-background-size": "0%",
                    "pie-3-background-size": "0%",
                    "pie-4-background-size": "0%",
                    "pie-5-background-size": "0%",
                    "pie-6-background-size": "0%",
                    "pie-7-background-size": "0%",
                    "pie-8-background-size": "0%",
                    "pie-9-background-size": "0%",
                    "pie-10-background-size": "0%",
                    "pie-11-background-size": "0%",
                    "pie-12-background-size": "0%",
                    "pie-13-background-size": "0%",
                    "pie-14-background-size": "0%",
                    "pie-15-background-size": "0%",
                    "pie-16-background-size": "0%",
                    "pie-1-background-opacity": 1,
                    "pie-2-background-opacity": 1,
                    "pie-3-background-opacity": 1,
                    "pie-4-background-opacity": 1,
                    "pie-5-background-opacity": 1,
                    "pie-6-background-opacity": 1,
                    "pie-7-background-opacity": 1,
                    "pie-8-background-opacity": 1,
                    "pie-9-background-opacity": 1,
                    "pie-10-background-opacity": 1,
                    "pie-11-background-opacity": 1,
                    "pie-12-background-opacity": 1,
                    "pie-13-background-opacity": 1,
                    "pie-14-background-opacity": 1,
                    "pie-15-background-opacity": 1,
                    "pie-16-background-opacity": 1,
                    "source-arrow-shape": "none",
                    "mid-source-arrow-shape": "none",
                    "target-arrow-shape": "none",
                    "mid-target-arrow-shape": "none",
                    "source-arrow-color": "#ddd",
                    "mid-source-arrow-color": "#ddd",
                    "target-arrow-color": "#ddd",
                    "mid-target-arrow-color": "#ddd",
                    "source-arrow-fill": "filled",
                    "mid-source-arrow-fill": "filled",
                    "target-arrow-fill": "filled",
                    "mid-target-arrow-fill": "filled",
                    "line-style": "solid",
                    "line-color": "#ddd",
                    "control-point-step-size": 40,
                    "control-point-weight": .5,
                    "curve-style": "bezier",
                    "haystack-radius": .8
                }).selector("$node > node").css({
                    width: "auto",
                    height: "auto",
                    shape: "rectangle",
                    "background-opacity": .5,
                    "padding-top": 10,
                    "padding-right": 10,
                    "padding-left": 10,
                    "padding-bottom": 10
                }).selector("edge").css({
                    width: 1
                }).selector(":active").css({
                    "overlay-color": "black",
                    "overlay-padding": 10,
                    "overlay-opacity": .25
                }).selector("core").css({
                    "selection-box-color": "#ddd",
                    "selection-box-opacity": .65,
                    "selection-box-border-color": "#aaa",
                    "selection-box-border-width": 1,
                    "active-bg-color": "black",
                    "active-bg-opacity": .15,
                    "active-bg-size": 30,
                    "outside-texture-bg-color": "#000",
                    "outside-texture-bg-opacity": .125
                }), this.defaultLength = this.length
            }, e.styfn.clear = function() {
                for (var e = 0; e < this.length; e++) this[e] = void 0;
                return this.length = 0, this._private.newStyle = !0, this
            }, e.styfn.resetToDefault = function() {
                return this.clear(), this.addDefaultStylesheet(), this
            }, e.styfn.core = function() {
                return this._private.coreStyle
            }, e.styfn.parse = function(t, n, r, i) {
                var a, o = [t, n, r, i].join("$"),
                    s = this.propCache = this.propCache || {};
                return (a = s[o]) || (a = s[o] = this.parseImpl(t, n, r, i)), e.util.copy(a)
            }, e.styfn.parseImpl = function(t, n, r, i) {
                t = e.util.camel2dash(t);
                var a = e.style.properties[t],
                    o = n,
                    s = e.style.types;
                if (!a) return null;
                if (void 0 === n || null === n) return null;
                var l = e.is.string(n);
                l && (n = e.util.trim(n));
                var u = a.type;
                if (!u) return null;
                if (r && ("" === n || null === n)) return {
                    name: t,
                    value: n,
                    bypass: !0,
                    deleteBypass: !0
                };
                var c = t.match(/pie-(\d+)-background-size/);
                if (e.is.fn(n)) return {
                    name: t,
                    value: n,
                    strValue: "fn",
                    mapped: s.fn,
                    bypass: r,
                    hasPie: c
                };
                var d, h, p, f, v, g;
                if (!l || i);
                else {
                    if ((d = new RegExp(s.data.regex).exec(n)) || (p = new RegExp(s.layoutData.regex).exec(n)) || (v = new RegExp(s.scratch.regex).exec(n))) {
                        if (r) return !1;
                        var y;
                        return y = d ? s.data : p ? s.layoutData : s.scratch, d = d || p || v, {
                            name: t,
                            value: d,
                            strValue: "" + n,
                            mapped: y,
                            field: d[1],
                            bypass: r,
                            hasPie: c
                        }
                    }
                    if ((h = new RegExp(s.mapData.regex).exec(n)) || (f = new RegExp(s.mapLayoutData.regex).exec(n)) || (g = new RegExp(s.mapScratch.regex).exec(n))) {
                        if (r) return !1;
                        var y;
                        if (y = h ? s.mapData : f ? s.mapLayoutData : s.mapScratch, h = h || f || g, !u.color && !u.number) return !1;
                        var m = this.parse(t, h[4]);
                        if (!m || m.mapped) return !1;
                        var x = this.parse(t, h[5]);
                        if (!x || x.mapped) return !1;
                        if (m.value === x.value) return !1;
                        if (u.color) {
                            var b = m.value,
                                w = x.value,
                                _ = !(b[0] !== w[0] || b[1] !== w[1] || b[2] !== w[2] || b[3] !== w[3] && (null != b[3] && 1 !== b[3] || null != w[3] && 1 !== w[3]));
                            if (_) return !1
                        }
                        return {
                            name: t,
                            value: h,
                            strValue: "" + n,
                            mapped: y,
                            field: h[1],
                            fieldMin: parseFloat(h[2]),
                            fieldMax: parseFloat(h[3]),
                            valueMin: m.value,
                            valueMax: x.value,
                            bypass: r,
                            hasPie: c
                        }
                    }
                }
                if (u.number) {
                    var E, T = "px";
                    if (u.units && (E = u.units), u.implicitUnits && (T = u.implicitUnits), !u.unitless)
                        if (l) {
                            var S = "px|em" + (u.allowPercent ? "|\\%" : "");
                            E && (S = E);
                            var C = n.match("^(" + e.util.regex.number + ")(" + S + ")?$");
                            C && (n = C[1], E = C[2] || T)
                        } else(!E || u.implicitUnits) && (E = T);
                    if (n = parseFloat(n), isNaN(n) && void 0 === u.enums) return null;
                    if (isNaN(n) && void 0 !== u.enums) {
                        n = o;
                        for (var k = 0; k < u.enums.length; k++) {
                            var D = u.enums[k];
                            if (D === n) return {
                                name: t,
                                value: n,
                                strValue: "" + n,
                                bypass: r
                            }
                        }
                        return null
                    }
                    if (u.integer && !e.is.integer(n)) return null;
                    if (void 0 !== u.min && n < u.min || void 0 !== u.max && n > u.max) return null;
                    var N = {
                        name: t,
                        value: n,
                        strValue: "" + n + (E ? E : ""),
                        units: E,
                        bypass: r,
                        hasPie: c && null != n && 0 !== n && "" !== n
                    };
                    return u.unitless || "px" !== E && "em" !== E || (N.pxValue = "px" !== E && E ? this.getEmSizeInPixels() * n : n), ("ms" === E || "s" === E) && (N.msValue = "ms" === E ? n : 1e3 * n), N
                }
                if (u.propList) {
                    var P = [],
                        M = "" + n;
                    if ("none" === M);
                    else {
                        for (var B = M.split(","), k = 0; k < B.length; k++) {
                            var L = e.util.trim(B[k]);
                            e.style.properties[L] && P.push(L)
                        }
                        if (0 === P.length) return null
                    }
                    return {
                        name: t,
                        value: P,
                        strValue: 0 === P.length ? "none" : P.join(", "),
                        bypass: r
                    }
                }
                if (u.color) {
                    var O = e.util.color2tuple(n);
                    return O ? {
                        name: t,
                        value: O,
                        strValue: "" + n,
                        bypass: r
                    } : null
                }
                if (u.enums) {
                    for (var k = 0; k < u.enums.length; k++) {
                        var D = u.enums[k];
                        if (D === n) return {
                            name: t,
                            value: n,
                            strValue: "" + n,
                            bypass: r
                        }
                    }
                    return null
                }
                if (u.regex) {
                    var A = new RegExp(u.regex),
                        I = A.exec(n);
                    return I ? {
                        name: t,
                        value: I,
                        strValue: "" + n,
                        bypass: r
                    } : null
                }
                return u.string ? {
                    name: t,
                    value: n,
                    strValue: "" + n,
                    bypass: r
                } : null
            }, e.styfn.selector = function(t) {
                var n = "core" === t ? null : new e.Selector(t),
                    r = this.length++;
                return this[r] = {
                    selector: n,
                    properties: [],
                    mappedProperties: [],
                    index: r
                }, this
            }, e.styfn.css = function() {
                var t = arguments;
                switch (t.length) {
                    case 1:
                        for (var n = t[0], r = 0; r < e.style.properties.length; r++) {
                            var i = e.style.properties[r],
                                a = n[i.name];
                            void 0 === a && (a = n[e.util.dash2camel(i.name)]), void 0 !== a && this.cssRule(i.name, a)
                        }
                        break;
                    case 2:
                        this.cssRule(t[0], t[1])
                }
                return this
            }, e.styfn.style = e.styfn.css, e.styfn.cssRule = function(e, t) {
                var n = this.parse(e, t);
                if (n) {
                    var r = this.length - 1;
                    this[r].properties.push(n), this[r].properties[n.name] = n, n.hasPie && (this._private.hasPie = !0), n.mapped && this[r].mappedProperties.push(n);
                    var i = !this[r].selector;
                    i && (this._private.coreStyle[n.name] = n)
                }
                return this
            }
    }(cytoscape),
    function(e) {
        "use strict";
        e.styfn.apply = function(e) {
            var t = this;
            t._private.newStyle && (this._private.contextStyles = {}, this._private.propDiffs = {});
            for (var n = 0; n < e.length; n++) {
                var r = e[n],
                    i = t.getContextMeta(r),
                    a = t.getContextStyle(i),
                    o = t.applyContextStyle(i, a, r);
                t.updateTransitions(r, o.diffProps), t.updateStyleHints(r)
            }
            t._private.newStyle = !1
        }, e.styfn.getPropertiesDiff = function(e, t) {
            var n = this,
                r = n._private.propDiffs = n._private.propDiffs || {},
                i = e + "-" + t,
                a = r[i];
            if (a) return a;
            for (var o = [], s = {}, l = 0; l < n.length; l++) {
                var u = n[l],
                    c = "t" === e[l],
                    d = "t" === t[l],
                    h = c !== d,
                    p = u.mappedProperties.length > 0;
                if (h || p) {
                    var f;
                    h && p ? f = u.properties : h ? f = u.properties : p && (f = u.mappedProperties);
                    for (var v = 0; v < f.length; v++) {
                        for (var g = f[v], y = g.name, m = !1, x = l + 1; x < n.length; x++) {
                            var b = n[x],
                                w = "t" === t[x];
                            if (w && (m = null != b.properties[g.name])) break
                        }
                        s[y] || m || (s[y] = !0, o.push(y))
                    }
                }
            }
            return r[i] = o, o
        }, e.styfn.getContextMeta = function(e) {
            var t, n = this,
                r = "",
                i = e._private.styleCxtKey || "";
            n._private.newStyle && (i = "");
            for (var a = 0; a < n.length; a++) {
                var o = n[a],
                    s = o.selector && o.selector.matches(e);
                r += s ? "t" : "f"
            }
            return t = n.getPropertiesDiff(i, r), e._private.styleCxtKey = r, {
                key: r,
                diffPropNames: t
            }
        }, e.styfn.getContextStyle = function(e) {
            var t = e.key,
                n = this,
                r = this._private.contextStyles = this._private.contextStyles || {};
            if (r[t]) return r[t];
            for (var i = {
                    _private: {
                        key: t
                    }
                }, a = 0; a < n.length; a++) {
                var o = n[a],
                    s = "t" === t[a];
                if (s)
                    for (var l = 0; l < o.properties.length; l++) {
                        var u = o.properties[l],
                            c = i[u.name] = u;
                        c.context = o
                    }
            }
            return r[t] = i, i
        }, e.styfn.applyContextStyle = function(e, t, n) {
            for (var r = this, i = e.diffPropNames, a = {}, o = 0; o < i.length; o++) {
                var s = i[o],
                    l = t[s],
                    u = n._private.style[s];
                if (l && u !== l) {
                    var c = a[s] = {
                        prev: u
                    };
                    r.applyParsedProperty(n, l), c.next = n._private.style[s], c.next && c.next.bypass && (c.next = c.next.bypassed)
                }
            }
            return {
                diffProps: a
            }
        }, e.styfn.updateStyleHints = function(t) {
            var n = t._private,
                r = this,
                i = n.style,
                a = !1;
            if ("nodes" === n.group && r._private.hasPie)
                for (var o = 1; o <= e.style.pieBackgroundN; o++) {
                    var s = n.style["pie-" + o + "-background-size"].value;
                    if (s > 0) {
                        a = !0;
                        break
                    }
                }
            n.hasPie = a;
            var l = i["text-transform"].strValue,
                u = i.content.strValue,
                c = i["font-style"].strValue,
                s = i["font-size"].pxValue + "px",
                d = i["font-family"].strValue,
                h = i["font-weight"].strValue,
                p = i["text-valign"].strValue,
                f = i["text-valign"].strValue,
                v = i["text-outline-width"].pxValue,
                g = i["text-wrap"].strValue,
                y = i["text-max-width"].pxValue;
            n.labelKey = c + "$" + s + "$" + d + "$" + h + "$" + u + "$" + l + "$" + p + "$" + f + "$" + v + "$" + g + "$" + y, n.fontKey = c + "$" + h + "$" + s + "$" + d;
            var m = i.width.pxValue,
                x = i.height.pxValue,
                b = i["border-width"].pxValue;
            if (n.boundingBoxKey = m + "$" + x + "$" + b, "edges" === t._private.group) {
                var w = i["control-point-step-size"].pxValue,
                    _ = i["control-point-distance"] ? i["control-point-distance"].pxValue : void 0,
                    E = i["control-point-weight"].value,
                    T = i["curve-style"].strValue;
                n.boundingBoxKey += "$" + w + "$" + _ + "$" + E + "$" + T
            }
            n.styleKey = Date.now()
        }, e.styfn.applyParsedProperty = function(t, n) {
            var r, i, a = n,
                o = t._private.style,
                s = e.style.types,
                l = e.style.properties[a.name].type,
                u = a.bypass,
                c = o[a.name],
                d = c && c.bypass,
                h = t._private;
            if (("height" === n.name || "width" === n.name) && t.isNode()) {
                if ("auto" === n.value && !t.isParent()) return !1;
                "auto" !== n.value && t.isParent() && (a = n = this.parse(n.name, "auto", u))
            }
            if (u && a.deleteBypass) {
                var p = o[a.name];
                return p ? p.bypass && p.bypassed ? (o[a.name] = p.bypassed, !0) : !1 : !0
            }
            var f = function() {
                e.util.error("Do not assign mappings to elements without corresponding data (e.g. ele `" + t.id() + "` for property `" + a.name + "` with data field `" + a.field + "`); try a `[" + a.field + "]` selector to limit scope to elements with `" + a.field + "` defined")
            };
            switch (a.mapped) {
                case s.mapData:
                case s.mapLayoutData:
                case s.mapScratch:
                    var r, v = a.mapped === s.mapLayoutData,
                        g = a.mapped === s.mapScratch,
                        y = a.field.split(".");
                    r = g || v ? h.scratch : h.data;
                    for (var m = 0; m < y.length && r; m++) {
                        var x = y[m];
                        r = r[x]
                    }
                    var b;
                    if (b = e.is.number(r) ? (r - a.fieldMin) / (a.fieldMax - a.fieldMin) : 0, 0 > b ? b = 0 : b > 1 && (b = 1), l.color) {
                        var w = a.valueMin[0],
                            _ = a.valueMax[0],
                            E = a.valueMin[1],
                            T = a.valueMax[1],
                            S = a.valueMin[2],
                            C = a.valueMax[2],
                            k = null == a.valueMin[3] ? 1 : a.valueMin[3],
                            D = null == a.valueMax[3] ? 1 : a.valueMax[3],
                            N = [Math.round(w + (_ - w) * b), Math.round(E + (T - E) * b), Math.round(S + (C - S) * b), Math.round(k + (D - k) * b)];
                        i = {
                            bypass: a.bypass,
                            name: a.name,
                            value: N,
                            strValue: "rgb(" + N[0] + ", " + N[1] + ", " + N[2] + ")"
                        }
                    } else {
                        if (!l.number) return !1;
                        var P = a.valueMin + (a.valueMax - a.valueMin) * b;
                        i = this.parse(a.name, P, a.bypass, !0)
                    }
                    i || (i = this.parse(a.name, c.strValue, a.bypass, !0)), i || f(), i.mapping = a, a = i;
                    break;
                case s.data:
                case s.layoutData:
                case s.scratch:
                    var r, v = a.mapped === s.layoutData,
                        g = a.mapped === s.scratch,
                        y = a.field.split(".");
                    if (r = g || v ? h.scratch : h.data)
                        for (var m = 0; m < y.length; m++) {
                            var x = y[m];
                            r = r[x]
                        }
                    if (i = this.parse(a.name, r, a.bypass, !0), !i) {
                        var M = c ? c.strValue : "";
                        i = this.parse(a.name, M, a.bypass, !0)
                    }
                    i || f(), i.mapping = a, a = i;
                    break;
                case s.fn:
                    var B = a.value,
                        L = B(t);
                    i = this.parse(a.name, L, a.bypass, !0), i.mapping = a, a = i;
                    break;
                case void 0:
                    break;
                default:
                    return !1
            }
            return u ? (d ? a.bypassed = c.bypassed : a.bypassed = c, o[a.name] = a) : d ? c.bypassed = a : o[a.name] = a, !0
        }, e.styfn.update = function() {
            var e = this._private.cy,
                t = e.elements();
            t.updateStyle()
        }, e.styfn.updateMappers = function(t) {
            for (var n = 0; n < t.length; n++) {
                for (var r = t[n], i = r._private.style, a = 0; a < e.style.properties.length; a++) {
                    var o = e.style.properties[a],
                        s = i[o.name];
                    if (s && s.mapping) {
                        var l = s.mapping;
                        this.applyParsedProperty(r, l)
                    }
                }
                this.updateStyleHints(r)
            }
        }, e.styfn.updateTransitions = function(t, n, r) {
            var i = this,
                a = t._private.style,
                o = a["transition-property"].value,
                s = a["transition-duration"].msValue,
                l = a["transition-delay"].msValue,
                u = {};
            if (o.length > 0 && s > 0) {
                for (var c = !1, d = 0; d < o.length; d++) {
                    var h = o[d],
                        p = a[h],
                        f = n[h];
                    if (f) {
                        var v, g = f.prev,
                            y = g,
                            m = null != f.next ? f.next : p,
                            x = !1,
                            b = 1e-6;
                        y && (e.is.number(y.pxValue) && e.is.number(m.pxValue) ? (x = m.pxValue - y.pxValue, v = y.pxValue + b * x) : e.is.number(y.value) && e.is.number(m.value) ? (x = m.value - y.value, v = y.value + b * x) : e.is.array(y.value) && e.is.array(m.value) && (x = y.value[0] !== m.value[0] || y.value[1] !== m.value[1] || y.value[2] !== m.value[2], v = y.strValue), x && (u[h] = m.strValue, this.applyBypass(t, h, v), c = !0))
                    }
                }
                if (!c) return;
                t._private.transitioning = !0, t.stop(), l > 0 && t.delay(l), t.animate({
                    css: u
                }, {
                    duration: s,
                    queue: !1,
                    complete: function() {
                        r || i.removeBypasses(t, o), t._private.transitioning = !1
                    }
                })
            } else t._private.transitioning && (t.stop(), this.removeBypasses(t, o), t._private.transitioning = !1)
        }
    }(cytoscape),
    function(e) {
        "use strict";
        e.styfn.applyBypass = function(t, n, r, i) {
            var a = [],
                o = !0;
            if ("*" === n || "**" === n) {
                if (void 0 !== r)
                    for (var s = 0; s < e.style.properties.length; s++) {
                        var l = e.style.properties[s],
                            n = l.name,
                            u = this.parse(n, r, !0);
                        u && a.push(u)
                    }
            } else if (e.is.string(n)) {
                var u = this.parse(n, r, !0);
                u && a.push(u)
            } else {
                if (!e.is.plainObject(n)) return !1;
                var c = n;
                i = r;
                for (var s = 0; s < e.style.properties.length; s++) {
                    var l = e.style.properties[s],
                        n = l.name,
                        r = c[n];
                    if (void 0 === r && (r = c[e.util.dash2camel(n)]), void 0 !== r) {
                        var u = this.parse(n, r, !0);
                        u && a.push(u)
                    }
                }
            }
            if (0 === a.length) return !1;
            for (var d = !1, s = 0; s < t.length; s++) {
                for (var h, p = t[s], f = p._private.style, v = {}, g = 0; g < a.length; g++) {
                    var l = a[g];
                    if (i) {
                        var y = f[l.name];
                        h = v[l.name] = {
                            prev: y
                        }
                    }
                    d = this.applyParsedProperty(p, l) || d, i && (h.next = f[l.name])
                }
                i && this.updateTransitions(p, v, o)
            }
            return d
        }, e.styfn.overrideBypass = function(t, n, r) {
            for (var i = 0; i < t.length; i++) {
                var a = t[i],
                    o = a._private.style[e.util.camel2dash(n)];
                o.bypass ? (o.value = r, o.pxValue = r) : this.applyBypass(a, n, r)
            }
        }, e.styfn.removeAllBypasses = function(t, n) {
            for (var r = !0, i = 0; i < t.length; i++) {
                for (var a = t[i], o = {}, s = a._private.style, l = 0; l < e.style.properties.length; l++) {
                    var u = e.style.properties[l],
                        c = u.name,
                        d = "",
                        h = this.parse(c, d, !0),
                        p = s[u.name],
                        f = o[u.name] = {
                            prev: p
                        };
                    this.applyParsedProperty(a, h), f.next = s[u.name]
                }
                n && this.updateTransitions(a, o, r)
            }
        }, e.styfn.removeBypasses = function(t, n, r) {
            for (var i = !0, a = 0; a < t.length; a++) {
                for (var o = t[a], s = {}, l = o._private.style, u = 0; u < n.length; u++) {
                    var c = n[u],
                        d = e.style.properties[c],
                        h = "",
                        p = this.parse(c, h, !0),
                        f = l[d.name],
                        v = s[d.name] = {
                            prev: f
                        };
                    this.applyParsedProperty(o, p), v.next = l[d.name]
                }
                r && this.updateTransitions(o, s, i)
            }
        }
    }(cytoscape),
    function(e, t) {
        "use strict";
        e.styfn.getEmSizeInPixels = function() {
            var e = this._private.cy,
                n = e.container();
            if (t && n && t.getComputedStyle) {
                var r = t.getComputedStyle(n).getPropertyValue("font-size"),
                    i = parseFloat(r);
                return i
            }
            return 1
        }, e.styfn.containerCss = function(e) {
            var n = this._private.cy,
                r = n.container();
            return t && r && t.getComputedStyle ? t.getComputedStyle(r).getPropertyValue(e) : void 0
        }, e.styfn.containerProperty = function(e) {
            var t = this.containerCss(e),
                n = this.parse(e, t);
            return n
        }, e.styfn.containerPropertyAsString = function(e) {
            var t = this.containerProperty(e);
            return t ? t.strValue : void 0
        }
    }(cytoscape, "undefined" == typeof window ? null : window),
    function(e) {
        "use strict";
        e.styfn.getRenderedStyle = function(t) {
            var t = t[0];
            if (t) {
                for (var n = {}, r = t._private.style, i = this._private.cy, a = i.zoom(), o = 0; o < e.style.properties.length; o++) {
                    var s = e.style.properties[o],
                        l = r[s.name];
                    if (l) {
                        var u = l.unitless ? l.strValue : l.pxValue * a + "px";
                        n[s.name] = u, n[e.util.dash2camel(s.name)] = u
                    }
                }
                return n
            }
        }, e.styfn.getRawStyle = function(t) {
            var t = t[0];
            if (t) {
                for (var n = {}, r = t._private.style, i = 0; i < e.style.properties.length; i++) {
                    var a = e.style.properties[i],
                        o = r[a.name];
                    o && (n[a.name] = o.strValue, n[e.util.dash2camel(a.name)] = o.strValue)
                }
                return n
            }
        }, e.styfn.getValueStyle = function(t) {
            var n, r = {},
                i = e.is.element(t);
            if (n = i ? t._private.style : t)
                for (var a = 0; a < e.style.properties.length; a++) {
                    var o = e.style.properties[a],
                        s = n[o.name] || n[e.util.dash2camel(o.name)];
                    void 0 === s || e.is.plainObject(s) || (s = this.parse(o.name, s)), s && (r[o.name] = s, r[e.util.dash2camel(o.name)] = s)
                }
            return r
        }, e.styfn.getPropsList = function(t) {
            var n = [],
                r = t,
                i = e.style.properties;
            if (r)
                for (var a in r) {
                    var o = r[a],
                        s = i[a] || i[e.util.camel2dash(a)],
                        l = this.parse(s.name, o);
                    n.push(l)
                }
            return n
        }
    }(cytoscape),
    function(e) {
        "use strict";
        e.style.applyFromJson = function(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n],
                    i = r.selector,
                    a = r.style || r.css;
                e.selector(i);
                for (var o in a) {
                    var s = a[o];
                    e.css(o, s)
                }
            }
            return e
        }, e.style.fromJson = function(t, n) {
            var r = new e.Style(t);
            return e.style.applyFromJson(r, n), r
        }, e.styfn.fromJson = function(t) {
            var n = this;
            return n.resetToDefault(), e.style.applyFromJson(n, t), n
        }, e.styfn.json = function() {
            for (var e = [], t = this.defaultLength; t < this.length; t++) {
                for (var n = this[t], r = n.selector, i = n.properties, a = {}, o = 0; o < i.length; o++) {
                    var s = i[o];
                    a[s.name] = s.strValue
                }
                e.push({
                    selector: r ? r.toString() : "core",
                    style: a
                })
            }
            return e
        }
    }(cytoscape),
    function(e) {
        "use strict";
        e.style.applyFromString = function(t, n) {
            function r() {
                l = l.length > a.length ? l.substr(a.length) : ""
            }

            function i() {
                o = o.length > s.length ? o.substr(s.length) : ""
            }
            var a, o, s, l = "" + n;
            for (l = l.replace(/[/][*](\s|.)+?[*][/]/g, "");;) {
                var u = l.match(/^\s*$/);
                if (u) break;
                var c = l.match(/^\s*((?:.|\s)+?)\s*\{((?:.|\s)+?)\}/);
                if (!c) {
                    e.util.error("Halting stylesheet parsing: String stylesheet contains more to parse but no selector and block found in: " + l);
                    break
                }
                a = c[0];
                var d = c[1];
                if ("core" !== d) {
                    var h = new e.Selector(d);
                    if (h._private.invalid) {
                        e.util.error("Skipping parsing of block: Invalid selector found in string stylesheet: " + d), r();
                        continue
                    }
                }
                var p = c[2],
                    f = !1;
                o = p;
                for (var v = [];;) {
                    var u = o.match(/^\s*$/);
                    if (u) break;
                    var g = o.match(/^\s*(.+?)\s*:\s*(.+?)\s*;/);
                    if (!g) {
                        e.util.error("Skipping parsing of block: Invalid formatting of style property and value definitions found in:" + p), f = !0;
                        break
                    }
                    s = g[0];
                    var y = g[1],
                        m = g[2],
                        x = e.style.properties[y];
                    if (x) {
                        var b = t.parse(y, m);
                        b ? (v.push({
                            name: y,
                            val: m
                        }), i()) : (e.util.error("Skipping property: Invalid property definition in: " + s), i())
                    } else e.util.error("Skipping property: Invalid property name in: " + s), i()
                }
                if (f) {
                    r();
                    break
                }
                t.selector(d);
                for (var w = 0; w < v.length; w++) {
                    var x = v[w];
                    t.css(x.name, x.val)
                }
                r()
            }
            return t
        }, e.style.fromString = function(t, n) {
            var r = new e.Style(t);
            return e.style.applyFromString(r, n), r
        }, e.styfn.fromString = function(t) {
            var n = this;
            return n.resetToDefault(), e.style.applyFromString(n, t), n
        }
    }(cytoscape),
    function(e) {
        "use strict";
        e.stylesheet = e.Stylesheet = function() {
            return this instanceof e.Stylesheet ? void(this.length = 0) : new e.Stylesheet
        }, e.sheetfn = e.Stylesheet.prototype, e.sheetfn.selector = function(e) {
            var t = this.length++;
            return this[t] = {
                selector: e,
                properties: []
            }, this
        }, e.sheetfn.css = function(t, n) {
            var r = this.length - 1;
            if (e.is.string(t)) this[r].properties.push({
                name: t,
                value: n
            });
            else if (e.is.plainObject(t))
                for (var i = t, a = 0; a < e.style.properties.length; a++) {
                    var o = e.style.properties[a],
                        s = i[o.name];
                    if (void 0 === s && (s = i[e.util.dash2camel(o.name)]), void 0 !== s) {
                        var t = o.name,
                            n = s;
                        this[r].properties.push({
                            name: t,
                            value: n
                        })
                    }
                }
            return this
        }, e.sheetfn.style = e.sheetfn.css, e.sheetfn.generateStyle = function(t) {
            for (var n = new e.Style(t), r = 0; r < this.length; r++) {
                var i = this[r],
                    a = i.selector,
                    o = i.properties;
                n.selector(a);
                for (var s = 0; s < o.length; s++) {
                    var l = o[s];
                    n.css(l.name, l.value)
                }
            }
            return n
        }
    }(cytoscape),
    function(e, t) {
        "use strict";
        e.Thread = function(t) {
            return this instanceof e.Thread ? (this._private = {
                requires: [],
                files: [],
                queue: null,
                pass: []
            }, void(t && this.run(t))) : new e.Thread(t)
        }, e.thread = e.Thread, e.thdfn = e.Thread.prototype, e.fn.thread = function(t, n) {
            for (var r in t) {
                var i = t[r];
                e.Thread.prototype[r] = i
            }
        };
        var n = function(t) {
                var n = e.is.fn(t) ? t.toString() : 'JSON.parse("' + JSON.stringify(t) + '")';
                return n
            },
            r = function(t) {
                var i, o;
                e.is.object(t) && t.fn ? (i = a(t.fn, t.name), o = t.name, t = t.fn) : e.is.fn(t) ? (i = t.toString(), o = t.name) : e.is.string(t) ? i = t : e.is.object(t) && (i = t.proto ? "" : t.name + " = {};", o = t.name, t = t.obj), i += "\n";
                var s = function(e, t) {
                    if (e.prototype) {
                        var n = !1;
                        for (var a in e.prototype) {
                            n = !0;
                            break
                        }
                        n && (i += r({
                            name: t,
                            obj: e,
                            proto: !0
                        }, e))
                    }
                };
                if (t.prototype && null != o)
                    for (var l in t.prototype) {
                        var u = "",
                            c = t.prototype[l],
                            d = n(c),
                            h = o + ".prototype." + l;
                        u += h + " = " + d + ";\n", u && (i += u), s(c, h)
                    }
                if (!e.is.string(t))
                    for (var l in t) {
                        var p = "";
                        if (t.hasOwnProperty(l)) {
                            var c = t[l],
                                d = n(c),
                                h = o + '["' + l + '"]';
                            p += h + " = " + d + ";\n"
                        }
                        p && (i += p), s(c, h)
                    }
                return i
            },
            i = function(t) {
                return e.is.string(t) && t.match(/\.js$/)
            };
        e.fn.thread({
            require: function(t, n) {
                return i(t) ? (this._private.files.push(t), this) : (n && (e.is.fn(t) ? (n = n || t.name, t = {
                    name: n,
                    fn: t
                }) : t = {
                    name: n,
                    obj: t
                }), this._private.requires.push(t), this)
            },
            pass: function(e) {
                return this._private.pass.push(e), this
            },
            run: function(n, i) {
                var a = this,
                    o = this._private;
                if (i = i || o.pass.shift(), o.stopped) return void e.util.error("Attempted to run a stopped thread!  Start a new thread or do not stop the existing thread and reuse it.");
                if (o.running) return o.queue = o.queue.then(function() {
                    return a.run(n, i)
                });
                var s = null != t,
                    l = "undefined" != typeof module;
                a.trigger("run");
                var u = new e.Promise(function(u, c) {
                    o.running = !0;
                    var d = o.ran,
                        h = e.is.string(n) ? n : n.toString(),
                        p = "\n" + o.requires.map(function(e) {
                            return r(e)
                        }).concat(o.files.map(function(e) {
                            if (s) {
                                var n = function(e) {
                                    return e.match(/^\.\//) || e.match(/^\.\./) ? t.location.origin + t.location.pathname + e : e.match(/^\//) ? t.location.origin + "/" + e : e
                                };
                                return 'importScripts("' + n(e) + '");'
                            }
                            return l ? 'eval( require("fs").readFileSync("' + e + '", { encoding: "utf8" }) );' : void 0
                        })).concat(["( function(){", "var ret = (" + h + ")(" + JSON.stringify(i) + ");", "if( ret !== undefined ){ resolve(ret); }", "} )()\n"]).join("\n");
                    if (o.requires = [], o.files = [], s) {
                        var f, v;
                        if (!d) {
                            var g = p + "";
                            p = ["function broadcast(m){ return message(m); };", "function message(m){ postMessage(m); };", "function listen(fn){", '  self.addEventListener("message", function(m){ ', '    if( typeof m === "object" && (m.data.$$eval || m.data === "$$start") ){', "    } else { ", "      fn( m.data );", "    }", "  });", "};", 'self.addEventListener("message", function(m){  if( m.data.$$eval ){ eval( m.data.$$eval ); }  });', "function resolve(v){ postMessage({ $$resolve: v }); };", "function reject(v){ postMessage({ $$reject: v }); };"].join("\n"), p += g, f = new Blob([p], {
                                type: "application/javascript"
                            }), v = t.URL.createObjectURL(f)
                        }
                        var y = o.webworker = o.webworker || new Worker(v);
                        d && y.postMessage({
                            $$eval: p
                        });
                        var m;
                        y.addEventListener("message", m = function(t) {
                            var n = e.is.object(t) && e.is.object(t.data);
                            n && "$$resolve" in t.data ? (y.removeEventListener("message", m), u(t.data.$$resolve)) : n && "$$reject" in t.data ? (y.removeEventListener("message", m), c(t.data.$$reject)) : a.trigger(new e.Event(t, {
                                type: "message",
                                message: t.data
                            }))
                        }, !1), d || y.postMessage("$$start")
                    } else if (l) {
                        var m, x = require("path"),
                            b = require("child_process"),
                            w = o.child = o.child || b.fork(x.join(__dirname, "thread-node-fork"));
                        w.on("message", m = function(t) {
                            e.is.object(t) && "$$resolve" in t ? (w.removeListener("message", m), u(t.$$resolve)) : e.is.object(t) && "$$reject" in t ? (w.removeListener("message", m), c(t.$$reject)) : a.trigger(new e.Event({}, {
                                type: "message",
                                message: t
                            }))
                        }), w.send({
                            $$eval: p
                        })
                    } else e.error("Tried to create thread but no underlying tech found!")
                }).then(function(e) {
                    return o.running = !1, o.ran = !0, a.trigger("ran"), e
                });
                return null == o.queue && (o.queue = u), u
            },
            message: function(e) {
                var t = this._private;
                return t.webworker && t.webworker.postMessage(e), t.child && t.child.send(e), this
            },
            stop: function() {
                var e = this._private;
                return e.webworker && e.webworker.terminate(), e.child && e.child.kill(), e.stopped = !0, this.trigger("stop")
            },
            stopped: function() {
                return this._private.stopped
            }
        });
        var a = function(e, t) {
                var n = e.toString();
                return n = n.replace(/function.*\(/, "function " + t + "(")
            },
            o = function(e) {
                return e = e || {},
                    function(t, n) {
                        var r = a(t, "_$_$_" + e.name);
                        return this.require(r), this.run(["function( data ){", "  var origResolve = resolve;", "  var res = [];", "  ", "  resolve = function( val ){", "    res.push( val );", "  };", "  ", "  var ret = data." + e.name + "( _$_$_" + e.name + (arguments.length > 1 ? ", " + JSON.stringify(n) : "") + " );", "  ", "  resolve = origResolve;", "  resolve( res.length > 0 ? res : ret );", "}"].join("\n"))
                    }
            };
        e.fn.thread({
            reduce: o({
                name: "reduce"
            }),
            reduceRight: o({
                name: "reduceRight"
            }),
            map: o({
                name: "map"
            })
        });
        var s = e.thdfn;
        s.promise = s.run, s.terminate = s.halt = s.stop, s.include = s.require, e.worker = e.Worker = e.Thread, e.fn.thread({
            on: e.define.on(),
            one: e.define.on({
                unbindSelfOnTrigger: !0
            }),
            off: e.define.off(),
            trigger: e.define.trigger()
        }), e.define.eventAliasesOn(e.thdfn)
    }(cytoscape, "undefined" == typeof window ? null : window),
    function(e, t) {
        "use strict";
        e.Fabric = function(t) {
            if (!(this instanceof e.Fabric)) return new e.Fabric(t);
            this._private = {
                pass: []
            };
            var n = 4;
            e.is.number(t), t = "undefined" != typeof navigator && null != navigator.hardwareConcurrency ? navigator.hardwareConcurrency : "undefined" != typeof module ? require("os").cpus().length : n;
            for (var r = 0; t > r; r++) this[r] = e.Thread();
            this.length = t
        }, e.fabric = e.Fabric, e.fabfn = e.Fabric.prototype, e.fn.fabric = function(t, n) {
            for (var r in t) {
                var i = t[r];
                e.Fabric.prototype[r] = i
            }
        }, e.fn.fabric({
            require: function(e, t) {
                for (var n = 0; n < this.length; n++) {
                    var r = this[n];
                    r.require(e, t)
                }
                return this
            },
            random: function() {
                var e = Math.round((this.length - 1) * Math.random()),
                    t = this[e];
                return t
            },
            run: function(e) {
                var t = this._private.pass.shift();
                return this.random().pass(t).run(e)
            },
            message: function(e) {
                return this.random().message(e)
            },
            broadcast: function(e) {
                for (var t = 0; t < this.length; t++) {
                    var n = this[t];
                    n.message(e)
                }
                return this
            },
            stop: function() {
                for (var e = 0; e < this.length; e++) {
                    var t = this[e];
                    t.stop()
                }
                return this
            },
            pass: function(t) {
                var n = this._private.pass;
                return e.is.array(t) ? n.push(t) : e.util.error("Only arrays or collections may be used with fabric.pass()"), this
            },
            spreadSize: function() {
                var e = Math.ceil(this._private.pass[0].length / this.length);
                return e = Math.max(1, e)
            },
            spread: function(t) {
                for (var n = this, r = n._private, i = n.spreadSize(), a = r.pass.shift().concat([]), o = [], s = 0; s < this.length; s++) {
                    var l = this[s],
                        u = a.splice(0, i),
                        c = l.pass(u).run(t);
                    o.push(c);
                    var d = 0 === a.length;
                    if (d) break
                }
                return e.Promise.all(o).then(function(e) {
                    for (var t = [], n = 0, r = 0; r < e.length; r++)
                        for (var i = e[r], a = 0; a < i.length; a++) {
                            var o = i[a];
                            t[n++] = o
                        }
                    return t
                })
            },
            map: function(e) {
                var t = this;
                return t.require(e, "_$_$_fabmap"), t.spread(function(e) {
                    var t = [],
                        n = resolve;
                    resolve = function(e) {
                        t.push(e)
                    };
                    for (var r = 0; r < e.length; r++) {
                        var i = t.length,
                            a = _$_$_fabmap(e[r]),
                            o = i === t.length;
                        o && t.push(a)
                    }
                    return resolve = n, t
                })
            },
            filter: function(e) {
                var t = this._private,
                    n = t.pass[0];
                return this.map(e).then(function(e) {
                    for (var t = [], r = 0; r < n.length; r++) {
                        var i = n[r],
                            a = e[r];
                        a && t.push(i)
                    }
                    return t
                })
            },
            sort: function(e) {
                var t = this,
                    n = this._private.pass[0].length,
                    r = this.spreadSize();
                return e = e || function(e, t) {
                    return t > e ? -1 : e > t ? 1 : 0
                }, t.require(e, "_$_$_cmp"), t.spread(function(e) {
                    var t = e.sort(_$_$_cmp);
                    resolve(t)
                }).then(function(t) {
                    for (var i = function(r, i, a) {
                            i = Math.min(i, n), a = Math.min(a, n);
                            for (var o = r, s = i, l = [], u = o; a > u; u++) {
                                var c = t[r],
                                    d = t[i];
                                s > r && (i >= a || e(c, d) <= 0) ? (l.push(c), r++) : (l.push(d), i++)
                            }
                            for (var u = 0; u < l.length; u++) {
                                var h = o + u;
                                t[h] = l[u]
                            }
                        }, a = r; n > a; a *= 2)
                        for (var o = 0; n > o; o += 2 * a) i(o, o + a, o + 2 * a);
                    return t
                })
            }
        });
        var n = function(e) {
            return e = e || {},
                function(t, n) {
                    var r = this._private.pass.shift();
                    return this.random().pass(r)[e.threadFn](t, n)
                }
        };
        e.fn.fabric({
            randomMap: n({
                threadFn: "map"
            }),
            reduce: n({
                threadFn: "reduce"
            }),
            reduceRight: n({
                threadFn: "reduceRight"
            })
        });
        var r = e.fabfn;
        r.promise = r.run, r.terminate = r.halt = r.stop, r.include = r.require, e.fn.fabric({
            on: e.define.on(),
            one: e.define.on({
                unbindSelfOnTrigger: !0
            }),
            off: e.define.off(),
            trigger: e.define.trigger()
        }), e.define.eventAliasesOn(e.fabfn)
    }(cytoscape, "undefined" == typeof window ? null : window),
    function(e, t) {
        "use strict";
        var n = {},
            r = e.util.copy(n);
        e.defaults = function(t) {
            n = e.util.extend({}, r, t)
        }, e.fn.core = function(t, n) {
            for (var r in t) {
                var i = t[r];
                e.Core.prototype[r] = i
            }
        }, e.Core = function(r) {
            if (!(this instanceof e.Core)) return new e.Core(r);
            var i = this;
            r = e.util.extend({}, n, r);
            var a = r.container,
                o = a ? a._cyreg : null;
            if (o = o || {}, o && o.cy) {
                if (a)
                    for (; a.firstChild;) a.removeChild(a.firstChild);
                o.cy.notify({
                    type: "destroy"
                }), o = {}
            }
            var s = o.readies = o.readies || [];
            a && (a._cyreg = o), o.cy = i;
            var l = void 0 !== t && void 0 !== a && !r.headless,
                u = r;
            u.layout = e.util.extend({
                name: l ? "grid" : "null"
            }, u.layout), u.renderer = e.util.extend({
                name: l ? "canvas" : "null"
            }, u.renderer);
            var c = function(e, t, n) {
                    return void 0 !== t ? t : void 0 !== n ? n : e
                },
                d = this._private = {
                    container: u.container,
                    ready: !1,
                    initrender: !1,
                    options: u,
                    elements: [],
                    id2index: {},
                    listeners: [],
                    onRenders: [],
                    aniEles: e.Collection(this),
                    scratch: {},
                    layout: null,
                    renderer: null,
                    notificationsEnabled: !0,
                    minZoom: 1e-50,
                    maxZoom: 1e50,
                    zoomingEnabled: c(!0, u.zoomingEnabled),
                    userZoomingEnabled: c(!0, u.userZoomingEnabled),
                    panningEnabled: c(!0, u.panningEnabled),
                    userPanningEnabled: c(!0, u.userPanningEnabled),
                    boxSelectionEnabled: c(!1, u.boxSelectionEnabled),
                    autolock: c(!1, u.autolock, u.autolockNodes),
                    autoungrabify: c(!1, u.autoungrabify, u.autoungrabifyNodes),
                    autounselectify: c(!1, u.autounselectify),
                    styleEnabled: void 0 === u.styleEnabled ? l : u.styleEnabled,
                    zoom: e.is.number(u.zoom) ? u.zoom : 1,
                    pan: {
                        x: e.is.plainObject(u.pan) && e.is.number(u.pan.x) ? u.pan.x : 0,
                        y: e.is.plainObject(u.pan) && e.is.number(u.pan.y) ? u.pan.y : 0
                    },
                    animation: {
                        current: [],
                        queue: []
                    },
                    hasCompoundNodes: !1,
                    deferredExecQueue: []
                },
                h = u.selectionType;
            void 0 === h || "additive" !== h && "single" !== h ? d.selectionType = "single" : d.selectionType = h, e.is.number(u.minZoom) && e.is.number(u.maxZoom) && u.minZoom < u.maxZoom ? (d.minZoom = u.minZoom, d.maxZoom = u.maxZoom) : e.is.number(u.minZoom) && void 0 === u.maxZoom ? d.minZoom = u.minZoom : e.is.number(u.maxZoom) && void 0 === u.minZoom && (d.maxZoom = u.maxZoom);
            var p = function(t) {
                    for (var n = !1, r = 0; r < f.length; r++) {
                        var i = f[r];
                        if (e.is.promise(i)) {
                            n = !0;
                            break
                        }
                    }
                    return n ? e.Promise.all(f).then(t) : void t(f)
                },
                f = [u.style, u.elements];
            p(function(t) {
                var n = t[0],
                    r = t[1];
                d.styleEnabled && i.setStyle(n), i.initRenderer(e.util.extend({
                    hideEdgesOnViewport: u.hideEdgesOnViewport,
                    hideLabelsOnViewport: u.hideLabelsOnViewport,
                    textureOnViewport: u.textureOnViewport,
                    wheelSensitivity: e.is.number(u.wheelSensitivity) && u.wheelSensitivity > 0 ? u.wheelSensitivity : 1,
                    motionBlur: void 0 === u.motionBlur ? !0 : u.motionBlur,
                    motionBlurOpacity: void 0 === u.motionBlurOpacity ? .05 : u.motionBlurOpacity,
                    pixelRatio: e.is.number(u.pixelRatio) && u.pixelRatio > 0 ? u.pixelRatio : "auto" === u.pixelRatio ? void 0 : 1,
                    desktopTapThreshold: void 0 === u.desktopTapThreshold ? 4 : u.desktopTapThreshold,
                    touchTapThreshold: void 0 === u.touchTapThreshold ? 8 : u.touchTapThreshold
                }, u.renderer)), u.initrender && (i.on("initrender", u.initrender), i.on("initrender", function() {
                    i._private.initrender = !0
                })), i.load(r, function() {
                    i.startAnimationLoop(), i._private.ready = !0, e.is.fn(u.ready) && i.on("ready", u.ready);
                    for (var t = 0; t < s.length; t++) {
                        var n = s[t];
                        i.on("ready", n)
                    }
                    o && (o.readies = []), i.trigger("ready")
                }, u.done)
            })
        }, e.corefn = e.Core.prototype, e.fn.core({
            isReady: function() {
                return this._private.ready
            },
            ready: function(e) {
                this.isReady() ? this.trigger("ready", [], e) : this.on("ready", e)
            },
            initrender: function() {
                return this._private.initrender
            },
            destroy: function() {
                this.notify({
                    type: "destroy"
                });
                var e = this.container(),
                    t = e.parentNode;
                if (t) try {
                    t.removeChild(e)
                } catch (n) {}
                return this
            },
            getElementById: function(t) {
                var n = this._private.id2index[t];
                return void 0 !== n ? this._private.elements[n] : new e.Collection(this)
            },
            selectionType: function() {
                return this._private.selectionType
            },
            hasCompoundNodes: function() {
                return this._private.hasCompoundNodes
            },
            styleEnabled: function() {
                return this._private.styleEnabled
            },
            addToPool: function(e) {
                for (var t = this._private.elements, n = this._private.id2index, r = 0; r < e.length; r++) {
                    var i = e[r],
                        a = i._private.data.id,
                        o = n[a],
                        s = void 0 !== o;
                    s || (o = t.length, t.push(i), n[a] = o, i._private.index = o)
                }
                return this
            },
            removeFromPool: function(e) {
                for (var t = this._private.elements, n = this._private.id2index, r = 0; r < e.length; r++) {
                    var i = e[r],
                        a = i._private.data.id,
                        o = n[a],
                        s = void 0 !== o;
                    if (s) {
                        this._private.id2index[a] = void 0, t.splice(o, 1);
                        for (var l = o; l < t.length; l++) {
                            var u = t[l]._private.data.id;
                            n[u]--, t[l]._private.index--
                        }
                    }
                }
            },
            container: function() {
                return this._private.container
            },
            options: function() {
                return e.util.copy(this._private.options)
            },
            json: function(e) {
                var t = {},
                    n = this;
                return t.elements = {}, n.elements().each(function(e, n) {
                    var r = n.group();
                    t.elements[r] || (t.elements[r] = []), t.elements[r].push(n.json())
                }), this._private.styleEnabled && (t.style = n.style().json()), t.zoomingEnabled = n._private.zoomingEnabled, t.userZoomingEnabled = n._private.userZoomingEnabled, t.zoom = n._private.zoom, t.minZoom = n._private.minZoom, t.maxZoom = n._private.maxZoom, t.panningEnabled = n._private.panningEnabled, t.userPanningEnabled = n._private.userPanningEnabled, t.pan = n._private.pan, t.boxSelectionEnabled = n._private.boxSelectionEnabled, t.layout = n._private.options.layout, t.renderer = n._private.options.renderer, t.hideEdgesOnViewport = n._private.options.hideEdgesOnViewport, t.hideLabelsOnViewport = n._private.options.hideLabelsOnViewport, t.textureOnViewport = n._private.options.textureOnViewport, t.wheelSensitivity = n._private.options.wheelSensitivity, t.motionBlur = n._private.options.motionBlur, t
            },
            defer: function(e) {
                var t = this,
                    n = t._private,
                    r = n.deferredExecQueue;
                r.push(e), n.deferredTimeout || (n.deferredTimeout = setTimeout(function() {
                    for (; r.length > 0;) r.shift()();
                    n.deferredTimeout = null
                }, 0))
            }
        })
    }(cytoscape, "undefined" == typeof window ? null : window),
    function(e, t) {
        "use strict";

        function n(e) {
            var t = !document || "interactive" !== document.readyState && "complete" !== document.readyState ? n : e;
            setTimeout(t, 9, e)
        }
        e.fn.core({
            add: function(t) {
                var n, r = this;
                if (e.is.elementOrCollection(t)) {
                    var i = t;
                    if (i._private.cy === r) n = i.restore();
                    else {
                        for (var a = [], o = 0; o < i.length; o++) {
                            var s = i[o];
                            a.push(s.json())
                        }
                        n = new e.Collection(r, a)
                    }
                } else if (e.is.array(t)) {
                    var a = t;
                    n = new e.Collection(r, a)
                } else if (e.is.plainObject(t) && (e.is.array(t.nodes) || e.is.array(t.edges))) {
                    for (var l = t, a = [], u = ["nodes", "edges"], o = 0, c = u.length; c > o; o++) {
                        var d = u[o],
                            h = l[d];
                        if (e.is.array(h))
                            for (var p = 0, f = h.length; f > p; p++) {
                                var v = h[p];
                                v.group = d, a.push(v)
                            }
                    }
                    n = new e.Collection(r, a)
                } else {
                    var v = t;
                    n = new e.Element(r, v).collection()
                }
                return n
            },
            remove: function(t) {
                if (e.is.elementOrCollection(t)) t = t;
                else if (e.is.string(t)) {
                    var n = t;
                    t = this.$(n)
                }
                return t.remove()
            },
            load: function(r, i, a) {
                function o() {
                    s.one("layoutready", function(e) {
                        s.notifications(!0), s.trigger(e), s.notify({
                            type: "load",
                            collection: s.elements()
                        }), s.one("load", i), s.trigger("load")
                    }).one("layoutstop", function() {
                        s.one("done", a), s.trigger("done")
                    });
                    var t = e.util.extend({}, s._private.options.layout);
                    t.eles = s.$(), s.layout(t)
                }
                var s = this;
                s.notifications(!1);
                var l = s.elements();
                return l.length > 0 && l.remove(), null != r && (e.is.plainObject(r) || e.is.array(r)) && s.add(r), t ? n(o) : o(), this
            }
        })
    }(cytoscape, "undefined" == typeof window ? null : window),
    function(e, t) {
        "use strict";
        e.fn.core({
            animated: e.define.animated(),
            clearQueue: e.define.clearQueue(),
            delay: e.define.delay(),
            animate: e.define.animate(),
            stop: e.define.stop(),
            addToAnimationPool: function(e) {
                var t = this;
                t.styleEnabled() && t._private.aniEles.merge(e)
            },
            startAnimationLoop: function() {
                function n() {
                    e.util.requestAnimationFrame(function(e) {
                        r(e), n()
                    })
                }

                function r(t) {
                    function n(n, r) {
                        var l = n._private.animation.current,
                            u = n._private.animation.queue,
                            c = !1;
                        if (0 === l.length) {
                            var d = u.length > 0 ? u.shift() : null;
                            d && (d.callTime = t, l.push(d))
                        }
                        for (var h = [], p = l.length - 1; p >= 0; p--) {
                            var f = l[p];
                            f.started || (i(n, f), s = !0), a(n, f, t, r), f.done && (h.push(f), l.splice(p, 1)), c = !0
                        }
                        for (var p = 0; p < h.length; p++) {
                            var f = h[p],
                                v = f.params.complete;
                            e.is.fn(v) && v.apply(n, [t])
                        }
                        return r || 0 !== l.length || 0 !== u.length || o.push(n), c
                    }
                    t = +new Date;
                    for (var r = l._private.aniEles, o = [], s = !1, u = 0; u < r.length; u++) {
                        var c = r[u];
                        n(c)
                    }
                    var d = n(l, !0);
                    if (r.length > 0 || d) {
                        var h;
                        if (r.length > 0) {
                            var p = r.updateCompoundBounds();
                            h = p.length > 0 ? r.add(p) : r
                        }
                        l.notify({
                            type: s ? "style" : "draw",
                            collection: h
                        })
                    }
                    r.unmerge(o)
                }

                function i(t, n) {
                    var r = e.is.core(t),
                        i = !r,
                        a = t,
                        o = l._private.style;
                    if (i) var s = a._private.position,
                        u = {
                            x: s.x,
                            y: s.y
                        },
                        c = o.getValueStyle(a);
                    if (r) var d = l._private.pan,
                        h = {
                            x: d.x,
                            y: d.y
                        },
                        p = l._private.zoom;
                    n.started = !0, n.startTime = Date.now(), n.startPosition = u, n.startStyle = c, n.startPan = h, n.startZoom = p
                }

                function a(t, n, r, i) {
                    var a, u = l._private.style,
                        c = n.properties,
                        d = n.params,
                        h = n.startTime,
                        p = !i;
                    if (a = 0 === n.duration ? 1 : Math.min(1, (r - h) / n.duration), 0 > a ? a = 0 : a > 1 && (a = 1), null == c.delay) {
                        var f = n.startPosition,
                            v = c.position,
                            g = t._private.position;
                        v && p && (o(f.x, v.x) && (g.x = s(f.x, v.x, a)), o(f.y, v.y) && (g.y = s(f.y, v.y, a)));
                        var y = n.startPan,
                            m = c.pan,
                            x = t._private.pan,
                            b = null != m && i;
                        b && (o(y.x, m.x) && (x.x = s(y.x, m.x, a)), o(y.y, m.y) && (x.y = s(y.y, m.y, a)), t.trigger("pan"));
                        var w = n.startZoom,
                            _ = c.zoom,
                            E = null != _ && i;
                        E && (o(w, _) && (t._private.zoom = s(w, _, a)), t.trigger("zoom")), (b || E) && t.trigger("viewport");
                        var T = c.style || c.css;
                        if (T && p)
                            for (var S = 0; S < T.length; S++) {
                                var C = T[S].name,
                                    k = T[S],
                                    D = k,
                                    N = n.startStyle[C],
                                    P = s(N, D, a);
                                u.overrideBypass(t, C, P)
                            }
                    }
                    return e.is.fn(d.step) && d.step.apply(t, [r]), a >= 1 && (n.done = !0), a
                }

                function o(t, n) {
                    return null == t || null == n ? !1 : e.is.number(t) && e.is.number(n) ? !0 : t && n ? !0 : !1
                }

                function s(t, n, r) {
                    0 > r ? r = 0 : r > 1 && (r = 1);
                    var i, a;
                    if (i = null != t.pxValue || null != t.value ? null != t.pxValue ? t.pxValue : t.value : t, a = null != n.pxValue || null != n.value ? null != n.pxValue ? n.pxValue : n.value : n, e.is.number(i) && e.is.number(a)) return i + (a - i) * r;
                    if (e.is.number(i[0]) && e.is.number(a[0])) {
                        var o = i,
                            s = a,
                            l = function(e, t) {
                                var n = t - e,
                                    i = e;
                                return Math.round(r * n + i)
                            },
                            u = l(o[0], s[0]),
                            c = l(o[1], s[1]),
                            d = l(o[2], s[2]);
                        return [u, c, d]
                    }
                    return void 0
                }
                var l = this;
                l.styleEnabled() && t && n()
            }
        })
    }(cytoscape, "undefined" == typeof window ? null : window),
    function(e) {
        "use strict";
        e.fn.core({
            data: e.define.data({
                field: "data",
                bindingEvent: "data",
                allowBinding: !0,
                allowSetting: !0,
                settingEvent: "data",
                settingTriggersEvent: !0,
                triggerFnName: "trigger",
                allowGetting: !0
            }),
            removeData: e.define.removeData({
                field: "data",
                event: "data",
                triggerFnName: "trigger",
                triggerEvent: !0
            }),
            scratch: e.define.data({
                field: "scratch",
                allowBinding: !1,
                allowSetting: !0,
                settingTriggersEvent: !1,
                allowGetting: !0
            }),
            removeScratch: e.define.removeData({
                field: "scratch",
                triggerEvent: !1
            })
        })
    }(cytoscape),
    function(e) {
        "use strict";
        e.fn.core({
            on: e.define.on(),
            one: e.define.on({
                unbindSelfOnTrigger: !0
            }),
            once: e.define.on({
                unbindAllBindersOnTrigger: !0
            }),
            off: e.define.off(),
            trigger: e.define.trigger()
        }), e.define.eventAliasesOn(e.corefn)
    }(cytoscape),
    function(e) {
        "use strict";
        e.fn.core({
            png: function(e) {
                var t = this._private.renderer;
                return e = e || {}, t.png(e)
            },
            jpg: function(e) {
                var t = this._private.renderer;
                return e = e || {}, e.bg = e.bg || "#fff", t.jpg(e)
            }
        }), e.corefn.jpeg = e.corefn.jpg
    }(cytoscape),
    function(e) {
        "use strict";
        e.fn.core({
            layout: function(t) {
                var n;
                return null == t && (t = e.util.extend({}, this._private.options.layout), t.eles = this.$()), n = this.initLayout(t), n.run(), this
            },
            makeLayout: function(e) {
                return this.initLayout(e)
            },
            initLayout: function(t) {
                if (null == t) return void e.util.error("Layout options must be specified to make a layout");
                if (null == t.name) return void e.util.error("A `name` must be specified to make a layout");
                var n = t.name,
                    r = e.extension("layout", n);
                if (null == r) return void e.util.error("Can not apply layout: No such layout `" + n + "` found; did you include its JS file?");
                t.eles = null != t.eles ? t.eles : this.$(), e.is.string(t.eles) && (t.eles = this.$(t.eles));
                var i = new r(e.util.extend({}, t, {
                    cy: this
                }));
                return e.is.plainObject(i._private) || (i._private = {}), i._private.cy = this, i._private.listeners = [], i
            }
        }), e.corefn.createLayout = e.corefn.makeLayout
    }(cytoscape),
    function(e) {
        "use strict";
        e.fn.core({
            notify: function(e) {
                if (this._private.batchingNotify) {
                    var t = this._private.batchNotifyEles,
                        n = this._private.batchNotifyTypes;
                    if (e.collection)
                        for (var r = 0; r < e.collection.length; r++) {
                            var i = e.collection[r];
                            t.ids[i._private.id] || t.push(i)
                        }
                    return void(n.ids[e.type] || n.push(e.type))
                }
                if (this._private.notificationsEnabled) {
                    var a = this.renderer();
                    a.notify(e)
                }
            },
            notifications: function(e) {
                var t = this._private;
                return void 0 === e ? t.notificationsEnabled : void(t.notificationsEnabled = e ? !0 : !1)
            },
            noNotifications: function(e) {
                this.notifications(!1), e(), this.notifications(!0)
            },
            startBatch: function() {
                var e = this._private;
                return e.batchingStyle = e.batchingNotify = !0, e.batchStyleEles = [], e.batchNotifyEles = [], e.batchNotifyTypes = [], e.batchStyleEles.ids = {}, e.batchNotifyEles.ids = {}, e.batchNotifyTypes.ids = {}, this
            },
            endBatch: function() {
                var t = this._private;
                return t.batchingStyle = !1, new e.Collection(this, t.batchStyleEles).updateStyle(), t.batchingNotify = !1, this.notify({
                    type: t.batchNotifyTypes,
                    collection: t.batchNotifyEles
                }), this
            },
            batch: function(e) {
                return this.startBatch(), e(), this.endBatch(), this
            },
            batchData: function(e) {
                var t = this;
                return this.batch(function() {
                    for (var n in e) {
                        var r = e[n],
                            i = t.getElementById(n);
                        i.data(r)
                    }
                })
            }
        })
    }(cytoscape),
    function(e) {
        "use strict";
        e.fn.core({
            renderTo: function(e, t, n, r) {
                var i = this._private.renderer;
                return i.renderTo(e, t, n, r), this
            },
            renderer: function() {
                return this._private.renderer
            },
            forceRender: function() {
                return this.notify({
                    type: "draw"
                }), this
            },
            resize: function() {
                return this.notify({
                    type: "resize"
                }), this.trigger("resize"), this
            },
            initRenderer: function(t) {
                var n = this,
                    r = e.extension("renderer", t.name);
                return null == r ? void e.util.error("Can not initialise: No such renderer `%s` found; did you include its JS file?", t.name) : void(this._private.renderer = new r(e.util.extend({}, t, {
                    cy: n,
                    style: n._private.style
                })))
            },
            triggerOnRender: function() {
                for (var e = this._private.onRenders, t = 0; t < e.length; t++) {
                    var n = e[t];
                    n()
                }
                return this
            },
            onRender: function(e) {
                return this._private.onRenders.push(e), this
            },
            offRender: function(e) {
                var t = this._private.onRenders;
                if (null == e) return this._private.onRenders = [], this;
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    if (e === r) {
                        t.splice(n, 1);
                        break
                    }
                }
                return this
            }
        })
    }(cytoscape),
    function(e) {
        "use strict";
        e.fn.core({
            collection: function(t) {
                return e.is.string(t) ? this.$(t) : e.is.elementOrCollection(t) ? t.collection() : e.is.array(t) ? new e.Collection(this, t) : new e.Collection(this)
            },
            nodes: function(e) {
                var t = this.$(function() {
                    return this.isNode()
                });
                return e ? t.filter(e) : t
            },
            edges: function(e) {
                var t = this.$(function() {
                    return this.isEdge()
                });
                return e ? t.filter(e) : t
            },
            $: function(t) {
                var n = new e.Collection(this, this._private.elements);
                return t ? n.filter(t) : n
            }
        }), e.corefn.elements = e.corefn.filter = e.corefn.$
    }(cytoscape),
    function(e) {
        "use strict";
        e.fn.core({
            style: function(e) {
                if (e) {
                    var t = this.setStyle(e);
                    t.update()
                }
                return this._private.style
            },
            setStyle: function(t) {
                var n = this._private;
                return e.is.stylesheet(t) ? n.style = t.generateStyle(this) : e.is.array(t) ? n.style = e.style.fromJson(this, t) : e.is.string(t) ? n.style = e.style.fromString(this, t) : n.style = new e.Style(this), n.style
            }
        })
    }(cytoscape),
    function(e) {
        "use strict";
        e.fn.core({
            autolock: function(e) {
                return void 0 === e ? this._private.autolock : (this._private.autolock = e ? !0 : !1, this)
            },
            autoungrabify: function(e) {
                return void 0 === e ? this._private.autoungrabify : (this._private.autoungrabify = e ? !0 : !1, this)
            },
            autounselectify: function(e) {
                return void 0 === e ? this._private.autounselectify : (this._private.autounselectify = e ? !0 : !1, this)
            },
            panningEnabled: function(e) {
                return void 0 === e ? this._private.panningEnabled : (this._private.panningEnabled = e ? !0 : !1, this)
            },
            userPanningEnabled: function(e) {
                return void 0 === e ? this._private.userPanningEnabled : (this._private.userPanningEnabled = e ? !0 : !1, this)
            },
            zoomingEnabled: function(e) {
                return void 0 === e ? this._private.zoomingEnabled : (this._private.zoomingEnabled = e ? !0 : !1, this)
            },
            userZoomingEnabled: function(e) {
                return void 0 === e ? this._private.userZoomingEnabled : (this._private.userZoomingEnabled = e ? !0 : !1, this)
            },
            boxSelectionEnabled: function(e) {
                return void 0 === e ? this._private.boxSelectionEnabled : (this._private.boxSelectionEnabled = e ? !0 : !1, this)
            },
            pan: function() {
                var t, n, r, i, a, o = arguments,
                    s = this._private.pan;
                switch (o.length) {
                    case 0:
                        return s;
                    case 1:
                        if (e.is.string(o[0])) return t = o[0], s[t];
                        if (e.is.plainObject(o[0])) {
                            if (!this._private.panningEnabled) return this;
                            r = o[0], i = r.x, a = r.y, e.is.number(i) && (s.x = i), e.is.number(a) && (s.y = a), this.trigger("pan viewport")
                        }
                        break;
                    case 2:
                        if (!this._private.panningEnabled) return this;
                        t = o[0], n = o[1], "x" !== t && "y" !== t || !e.is.number(n) || (s[t] = n), this.trigger("pan viewport")
                }
                return this.notify({
                    type: "viewport"
                }), this
            },
            panBy: function(t) {
                var n, r, i, a, o, s = arguments,
                    l = this._private.pan;
                if (!this._private.panningEnabled) return this;
                switch (s.length) {
                    case 1:
                        e.is.plainObject(s[0]) && (i = s[0], a = i.x, o = i.y, e.is.number(a) && (l.x += a), e.is.number(o) && (l.y += o), this.trigger("pan viewport"));
                        break;
                    case 2:
                        n = s[0], r = s[1], "x" !== n && "y" !== n || !e.is.number(r) || (l[n] += r), this.trigger("pan viewport")
                }
                return this.notify({
                    type: "viewport"
                }), this
            },
            fit: function(e, t) {
                var n = this.getFitViewport(e, t);
                if (n) {
                    var r = this._private;
                    r.zoom = n.zoom, r.pan = n.pan, this.trigger("pan zoom viewport"), this.notify({
                        type: "viewport"
                    })
                }
                return this
            },
            getFitViewport: function(t, n) {
                if (e.is.number(t) && void 0 === n && (n = t, t = void 0), this._private.panningEnabled && this._private.zoomingEnabled) {
                    var r;
                    if (e.is.string(t)) {
                        var i = t;
                        t = this.$(i)
                    } else if (e.is.boundingBox(t)) {
                        var a = t;
                        r = {
                            x1: a.x1,
                            y1: a.y1,
                            x2: a.x2,
                            y2: a.y2
                        }, r.w = r.x2 - r.x1, r.h = r.y2 - r.y1
                    } else e.is.elementOrCollection(t) || (t = this.elements());
                    r = r || t.boundingBox();
                    var o, s = this.width(),
                        l = this.height();
                    if (n = e.is.number(n) ? n : 0, !isNaN(s) && !isNaN(l) && s > 0 && l > 0 && !isNaN(r.w) && !isNaN(r.h) && r.w > 0 && r.h > 0) {
                        o = Math.min((s - 2 * n) / r.w, (l - 2 * n) / r.h), o = o > this._private.maxZoom ? this._private.maxZoom : o, o = o < this._private.minZoom ? this._private.minZoom : o;
                        var u = {
                            x: (s - o * (r.x1 + r.x2)) / 2,
                            y: (l - o * (r.y1 + r.y2)) / 2
                        };
                        return {
                            zoom: o,
                            pan: u
                        }
                    }
                }
            },
            minZoom: function(t) {
                return void 0 === t ? this._private.minZoom : (e.is.number(t) && (this._private.minZoom = t), this)
            },
            maxZoom: function(t) {
                return void 0 === t ? this._private.maxZoom : (e.is.number(t) && (this._private.maxZoom = t), this)
            },
            zoom: function(t) {
                var n, r;
                if (void 0 === t) return this._private.zoom;
                if (e.is.number(t)) r = t;
                else if (e.is.plainObject(t)) {
                    if (r = t.level, t.position) {
                        var i = t.position,
                            a = this._private.pan,
                            o = this._private.zoom;
                        n = {
                            x: i.x * o + a.x,
                            y: i.y * o + a.y
                        }
                    } else t.renderedPosition && (n = t.renderedPosition);
                    if (n && !this._private.panningEnabled) return this
                }
                if (!this._private.zoomingEnabled) return this;
                if (!e.is.number(r) || n && (!e.is.number(n.x) || !e.is.number(n.y))) return this;
                if (r = r > this._private.maxZoom ? this._private.maxZoom : r, r = r < this._private.minZoom ? this._private.minZoom : r, n) {
                    var s = this._private.pan,
                        l = this._private.zoom,
                        u = r,
                        c = {
                            x: -u / l * (n.x - s.x) + n.x,
                            y: -u / l * (n.y - s.y) + n.y
                        };
                    this._private.zoom = r, this._private.pan = c;
                    var d = s.x !== c.x || s.y !== c.y;
                    this.trigger(" zoom " + (d ? " pan " : "") + " viewport ")
                } else this._private.zoom = r, this.trigger("zoom viewport");
                return this.notify({
                    type: "viewport"
                }), this
            },
            viewport: function(t) {
                var n = this._private,
                    r = !0,
                    i = !0,
                    a = [],
                    o = !1,
                    s = !1;
                if (!t) return this;
                if (e.is.number(t.zoom) || (r = !1), e.is.plainObject(t.pan) || (i = !1), !r && !i) return this;
                if (r) {
                    var l = t.zoom;
                    l < n.minZoom || l > n.maxZoom || !n.zoomingEnabled ? o = !0 : (n.zoom = l, a.push("zoom"))
                }
                if (i && (!o || !t.cancelOnFailedZoom) && n.panningEnabled) {
                    var u = t.pan;
                    e.is.number(u.x) && (n.pan.x = u.x, s = !1), e.is.number(u.y) && (n.pan.y = u.y, s = !1), s || a.push("pan")
                }
                return a.length > 0 && (a.push("viewport"), this.trigger(a.join(" ")), this.notify({
                    type: "viewport"
                })), this
            },
            center: function(e) {
                var t = this.getCenterPan(e);
                return t && (this._private.pan = t, this.trigger("pan viewport"), this.notify({
                    type: "viewport"
                })), this
            },
            getCenterPan: function(t, n) {
                if (this._private.panningEnabled) {
                    if (e.is.string(t)) {
                        var r = t;
                        t = this.elements(r)
                    } else e.is.elementOrCollection(t) || (t = this.elements());
                    var i = t.boundingBox(),
                        a = this.width(),
                        o = this.height();
                    n = void 0 === n ? this._private.zoom : n;
                    var s = {
                        x: (a - n * (i.x1 + i.x2)) / 2,
                        y: (o - n * (i.y1 + i.y2)) / 2
                    };
                    return s
                }
            },
            reset: function() {
                return this._private.panningEnabled && this._private.zoomingEnabled ? (this.viewport({
                    pan: {
                        x: 0,
                        y: 0
                    },
                    zoom: 1
                }), this) : this
            },
            width: function() {
                var e = this._private.container;
                return e ? e.clientWidth : 1
            },
            height: function() {
                var e = this._private.container;
                return e ? e.clientHeight : 1
            },
            extent: function() {
                var e = this._private.pan,
                    t = this._private.zoom,
                    n = this.renderedExtent(),
                    r = {
                        x1: (n.x1 - e.x) / t,
                        x2: (n.x2 - e.x) / t,
                        y1: (n.y1 - e.y) / t,
                        y2: (n.y2 - e.y) / t
                    };
                return r.w = r.x2 - r.x1, r.h = r.y2 - r.y1, r
            },
            renderedExtent: function() {
                var e = this.width(),
                    t = this.height();
                return {
                    x1: 0,
                    y1: 0,
                    x2: e,
                    y2: t,
                    w: e,
                    h: t
                }
            }
        }), e.corefn.centre = e.corefn.center, e.corefn.autolockNodes = e.corefn.autolock, e.corefn.autoungrabifyNodes = e.corefn.autoungrabify
    }(cytoscape),
    function(e) {
        "use strict";
        e.fn.collection = e.fn.eles = function(t, n) {
            for (var r in t) {
                var i = t[r];
                e.Collection.prototype[r] = i
            }
        };
        var t = {
            prefix: {
                nodes: "n",
                edges: "e"
            },
            id: {
                nodes: 0,
                edges: 0
            },
            generate: function(t, n, r) {
                var i = e.is.element(n) ? n._private : n,
                    a = i.group,
                    o = null != r ? r : this.prefix[a] + this.id[a];
                if (t.getElementById(o).empty()) this.id[a]++;
                else
                    for (; !t.getElementById(o).empty();) o = this.prefix[a] + ++this.id[a];
                return o
            }
        };
        e.Element = function(t, n, r) {
            if (!(this instanceof e.Element)) return new e.Element(t, n, r);
            var i = this;
            if (r = void 0 === r || r ? !0 : !1, void 0 === t || void 0 === n || !e.is.core(t)) return void e.util.error("An element must have a core reference and parameters set");
            if ("nodes" !== n.group && "edges" !== n.group) return void e.util.error("An element must be of type `nodes` or `edges`; you specified `" + n.group + "`");
            if (this.length = 1, this[0] = this, this._private = {
                    cy: t,
                    single: !0,
                    data: n.data || {},
                    position: n.position || {},
                    autoWidth: void 0,
                    autoHeight: void 0,
                    listeners: [],
                    group: n.group,
                    style: {},
                    rstyle: {},
                    styleCxts: [],
                    removed: !0,
                    selected: n.selected ? !0 : !1,
                    selectable: void 0 === n.selectable ? !0 : n.selectable ? !0 : !1,
                    locked: n.locked ? !0 : !1,
                    grabbed: !1,
                    grabbable: void 0 === n.grabbable ? !0 : n.grabbable ? !0 : !1,
                    active: !1,
                    classes: {},
                    animation: {
                        current: [],
                        queue: []
                    },
                    rscratch: {},
                    scratch: n.scratch || {},
                    edges: [],
                    children: []
                }, n.renderedPosition) {
                var a = n.renderedPosition,
                    o = t.pan(),
                    s = t.zoom();
                this._private.position = {
                    x: (a.x - o.x) / s,
                    y: (a.y - o.y) / s
                }
            }
            if (e.is.string(n.classes))
                for (var l = n.classes.split(/\s+/), u = 0, c = l.length; c > u; u++) {
                    var d = l[u];
                    d && "" !== d && (i._private.classes[d] = !0)
                }
            n.css && t.style().applyBypass(this, n.css), (void 0 === r || r) && this.restore()
        }, e.Collection = function(n, r, i) {
            if (!(this instanceof e.Collection)) return new e.Collection(n, r);
            if (void 0 === n || !e.is.core(n)) return void e.util.error("A collection must have a reference to the core");
            var a = {},
                o = {},
                s = !1;
            if (r) {
                if (r.length > 0 && e.is.plainObject(r[0]) && !e.is.element(r[0])) {
                    s = !0;
                    for (var l = [], u = {}, c = 0, d = r.length; d > c; c++) {
                        var h = r[c];
                        null == h.data && (h.data = {});
                        var p = h.data;
                        if (null == p.id) p.id = t.generate(n, h);
                        else if (0 !== n.getElementById(p.id).length || u[p.id]) continue;
                        var f = new e.Element(n, h, !1);
                        l.push(f), u[p.id] = !0
                    }
                    r = l
                }
            } else r = [];
            this.length = 0;
            for (var c = 0, d = r.length; d > c; c++) {
                var v = r[c];
                if (v) {
                    var g = v._private.data.id;
                    (!i || i.unique && !a[g]) && (a[g] = v, o[g] = this.length, this[this.length] = v, this.length++)
                }
            }
            this._private = {
                cy: n,
                ids: a,
                indexes: o
            }, s && this.restore()
        }, e.elefn = e.elesfn = e.Element.prototype = e.Collection.prototype, e.elesfn.cy = function() {
            return this._private.cy
        }, e.elesfn.element = function() {
            return this[0]
        }, e.elesfn.collection = function() {
            return e.is.collection(this) ? this : new e.Collection(this._private.cy, [this])
        }, e.elesfn.unique = function() {
            return new e.Collection(this._private.cy, this, {
                unique: !0
            })
        }, e.elesfn.getElementById = function(t) {
            var n = this._private.cy,
                r = this._private.ids[t];
            return r ? r : e.Collection(n)
        }, e.elesfn.json = function() {
            var t = this.element();
            if (null == t) return void 0;
            var n = t._private,
                r = e.util.copy({
                    data: n.data,
                    position: n.position,
                    group: n.group,
                    bypass: n.bypass,
                    removed: n.removed,
                    selected: n.selected,
                    selectable: n.selectable,
                    locked: n.locked,
                    grabbed: n.grabbed,
                    grabbable: n.grabbable,
                    classes: ""
                }),
                i = [];
            for (var a in n.classes) n.classes[a] && i.push(a);
            for (var o = 0; o < i.length; o++) {
                var a = i[o];
                r.classes += a + (o < i.length - 1 ? " " : "")
            }
            return r
        }, e.elesfn.jsons = function() {
            for (var e = [], t = 0; t < this.length; t++) {
                var n = this[t],
                    r = n.json();
                e.push(r)
            }
            return e
        }, e.elesfn.clone = function() {
            for (var t = this.cy(), n = [], r = 0; r < this.length; r++) {
                var i = this[r],
                    a = i.json(),
                    o = new e.Element(t, a, !1);
                n.push(o)
            }
            return new e.Collection(t, n)
        }, e.elesfn.copy = e.elesfn.clone, e.elesfn.restore = function(n) {
            var r = this,
                i = [],
                a = r.cy();
            void 0 === n && (n = !0);
            for (var o = [], s = [], l = [], u = 0, c = 0, d = 0, h = r.length; h > d; d++) {
                var p = r[d];
                p.isNode() ? (s.push(p), u++) : (l.push(p), c++)
            }
            o = s.concat(l);
            for (var d = 0, h = o.length; h > d; d++) {
                var p = o[d];
                if (p.removed()) {
                    var f = p._private,
                        v = f.data;
                    if (void 0 === v.id) v.id = t.generate(a, p);
                    else {
                        if (e.is.emptyString(v.id) || !e.is.string(v.id)) {
                            e.util.error("Can not create element with invalid string ID `" + v.id + "`");
                            continue
                        }
                        if (0 !== a.getElementById(v.id).length) {
                            e.util.error("Can not create second element with ID `" + v.id + "`");
                            continue
                        }
                    }
                    var g = v.id;
                    if (p.isEdge()) {
                        for (var y = p, m = ["source", "target"], x = m.length, b = !1, w = 0; x > w; w++) {
                            var _ = m[w],
                                E = v[_];
                            null == E || "" === E ? (e.util.error("Can not create edge `" + g + "` with unspecified " + _), b = !0) : a.getElementById(E).empty() && (e.util.error("Can not create edge `" + g + "` with nonexistant " + _ + " `" + E + "`"), b = !0)
                        }
                        if (b) continue;
                        var T = a.getElementById(v.source),
                            S = a.getElementById(v.target);
                        T._private.edges.push(y), S._private.edges.push(y), y._private.source = T, y._private.target = S
                    }
                    f.ids = {}, f.ids[g] = p, f.removed = !1, a.addToPool(p), i.push(p)
                }
            }
            for (var d = 0; u > d; d++) {
                var C = o[d],
                    v = C._private.data,
                    k = C._private.data.parent,
                    D = null != k;
                if (D) {
                    var N = a.getElementById(k);
                    if (N.empty()) v.parent = void 0;
                    else {
                        for (var P = !1, M = N; !M.empty();) {
                            if (C.same(M)) {
                                P = !0, v.parent = void 0;
                                break
                            }
                            M = M.parent()
                        }
                        P || (N[0]._private.children.push(C), C._private.parent = N[0], a._private.hasCompoundNodes = !0)
                    }
                }
            }
            if (i = new e.Collection(a, i), i.length > 0) {
                var B = i.add(i.connectedNodes()).add(i.parent());
                B.updateStyle(n), n ? i.rtrigger("add") : i.trigger("add")
            }
            return r
        }, e.elesfn.removed = function() {
            var e = this[0];
            return e && e._private.removed
        }, e.elesfn.inside = function() {
            var e = this[0];
            return e && !e._private.removed
        }, e.elesfn.remove = function(t) {
            function n(e) {
                for (var t = e._private.edges, n = 0; n < t.length; n++) i(t[n])
            }

            function r(e) {
                for (var t = e._private.children, n = 0; n < t.length; n++) i(t[n])
            }

            function i(e) {
                var t = c[e.id()];
                t || (c[e.id()] = !0, e.isNode() ? (u.push(e), n(e), r(e)) : u.unshift(e))
            }

            function a(e, t) {
                for (var n = e._private.edges, r = 0; r < n.length; r++) {
                    var i = n[r];
                    if (t === i) {
                        n.splice(r, 1);
                        break
                    }
                }
            }

            function o(e, t) {
                t = t[0], e = e[0];
                for (var n = e._private.children, r = 0; r < n.length; r++)
                    if (n[r][0] === t[0]) {
                        n.splice(r, 1);
                        break
                    }
            }
            var s = this,
                l = [],
                u = [],
                c = {},
                d = s._private.cy;
            void 0 === t && (t = !0);
            for (var h = 0, p = s.length; p > h; h++) {
                var f = s[h];
                i(f)
            }
            for (var h = 0; h < u.length; h++) {
                var f = u[h];
                if (f._private.removed = !0, d.removeFromPool(f), l.push(f), f.isEdge()) {
                    var v = f.source()[0],
                        g = f.target()[0];
                    a(v, f), a(g, f)
                } else {
                    var y = f.parent();
                    0 !== y.length && o(y, f)
                }
            }
            var m = d._private.elements;
            d._private.hasCompoundNodes = !1;
            for (var h = 0; h < m.length; h++) {
                var f = m[h];
                if (f.isParent()) {
                    d._private.hasCompoundNodes = !0;
                    break
                }
            }
            var x = new e.Collection(this.cy(), l);
            x.size() > 0 && (t && this.cy().notify({
                type: "remove",
                collection: x
            }), x.trigger("remove"));
            for (var b = {}, h = 0; h < u.length; h++) {
                var f = u[h],
                    w = "nodes" === f._private.group,
                    _ = f._private.data.parent;
                if (w && void 0 !== _ && !b[_]) {
                    b[_] = !0;
                    var y = d.getElementById(_);
                    y && 0 !== y.length && !y._private.removed && 0 === y.children().length && y.updateStyle()
                }
            }
            return this
        }, e.elesfn.move = function(e) {
            var t = this._private.cy;
            if (void 0 !== e.source || void 0 !== e.target) {
                var n = e.source,
                    r = e.target,
                    i = t.getElementById(n).length > 0,
                    a = t.getElementById(r).length > 0;
                if (i || a) {
                    var o = this.jsons();
                    this.remove();
                    for (var s = 0; s < o.length; s++) {
                        var l = o[s];
                        "edges" === l.group && (i && (l.data.source = n), a && (l.data.target = r))
                    }
                    return t.add(o)
                }
            } else if (void 0 !== e.parent) {
                var u = e.parent,
                    c = null === u || t.getElementById(u).length > 0;
                if (c) {
                    var o = this.jsons(),
                        d = this.descendants(),
                        h = d.merge(d.add(this).connectedEdges());
                    this.remove();
                    for (var s = 0; s < this.length; s++) {
                        var l = o[s];
                        "nodes" === l.group && (l.data.parent = null === u ? void 0 : u)
                    }
                }
                return t.add(o).merge(h.restore())
            }
            return this
        }
    }(cytoscape),
    function(e) {
        "use strict";
        e.fn.eles({
            stdBreadthFirstSearch: function(t) {
                return t = e.util.extend({}, t, {
                    std: !0
                }), this.breadthFirstSearch(t)
            },
            breadthFirstSearch: function(t, n, r) {
                var i, a, o;
                e.is.plainObject(t) && !e.is.elementOrCollection(t) && (i = t, t = i.roots, n = i.visit, r = i.directed, a = i.std, o = i.thisArg), r = 2 !== arguments.length || e.is.fn(n) ? r : n, n = e.is.fn(n) ? n : function() {};
                for (var s, l = this._private.cy, u = e.is.string(t) ? this.filter(t) : t, c = [], d = [], h = {}, p = {}, f = {}, v = 0, g = this.nodes(), y = this.edges(), m = 0; m < u.length; m++) u[m].isNode() && (c.unshift(u[m]), f[u[m].id()] = !0, d.push(u[m]), p[u[m].id()] = 0);
                for (; 0 !== c.length;) {
                    var x, u = c.shift(),
                        b = p[u.id()],
                        w = h[u.id()],
                        _ = null == w ? void 0 : w.connectedNodes().not(u)[0];
                    if (x = a ? n.call(o, u, w, _, v++, b) : n.call(u, v++, b, u, w, _), x === !0) {
                        s = u;
                        break
                    }
                    if (x === !1) break;
                    for (var E = u.connectedEdges(r ? function() {
                            return this.data("source") === u.id()
                        } : void 0).intersect(y), m = 0; m < E.length; m++) {
                        var T = E[m],
                            S = T.connectedNodes(function() {
                                return this.id() !== u.id()
                            }).intersect(g);
                        0 === S.length || f[S.id()] || (S = S[0], c.push(S), f[S.id()] = !0, p[S.id()] = p[u.id()] + 1, d.push(S), h[S.id()] = T)
                    }
                }
                for (var C = [], m = 0; m < d.length; m++) {
                    var k = d[m],
                        D = h[k.id()];
                    D && C.push(D), C.push(k)
                }
                return {
                    path: new e.Collection(l, C, {
                        unique: !0
                    }),
                    found: new e.Collection(l, s, {
                        unique: !0
                    })
                }
            },
            stdDepthFirstSearch: function(t) {
                return t = e.util.extend({}, t, {
                    std: !0
                }), this.depthFirstSearch(t)
            },
            depthFirstSearch: function(t, n, r) {
                var i, a, o;
                e.is.plainObject(t) && !e.is.elementOrCollection(t) && (i = t, t = i.roots, n = i.visit, r = i.directed, a = i.std, o = i.thisArg), r = 2 !== arguments.length || e.is.fn(n) ? r : n, n = e.is.fn(n) ? n : function() {};
                for (var s, l = this._private.cy, u = e.is.string(t) ? this.filter(t) : t, c = [], d = [], h = {}, p = {}, f = {}, v = 0, g = this.edges(), y = this.nodes(), m = 0; m < u.length; m++) u[m].isNode() && (c.push(u[m]), d.push(u[m]), p[u[m].id()] = 0);
                for (; 0 !== c.length;) {
                    var u = c.pop();
                    if (!f[u.id()]) {
                        f[u.id()] = !0;
                        var x, b = p[u.id()],
                            w = h[u.id()],
                            _ = null == w ? void 0 : w.connectedNodes().not(u)[0];
                        if (x = a ? n.call(o, u, w, _, v++, b) : n.call(u, v++, b, u, w, _), x === !0) {
                            s = u;
                            break
                        }
                        if (x === !1) break;
                        for (var E = u.connectedEdges(r ? function() {
                                return this.data("source") === u.id()
                            } : void 0).intersect(g), m = 0; m < E.length; m++) {
                            var T = E[m],
                                S = T.connectedNodes(function() {
                                    return this.id() !== u.id()
                                }).intersect(y);
                            0 === S.length || f[S.id()] || (S = S[0], c.push(S), p[S.id()] = p[u.id()] + 1, d.push(S), h[S.id()] = T)
                        }
                    }
                }
                for (var C = [], m = 0; m < d.length; m++) {
                    var k = d[m],
                        D = h[k.id()];
                    D && C.push(D), C.push(k)
                }
                return {
                    path: new e.Collection(l, C, {
                        unique: !0
                    }),
                    found: new e.Collection(l, s, {
                        unique: !0
                    })
                }
            },
            kruskal: function(t) {
                function n(e) {
                    for (var t = 0; t < i.length; t++) {
                        var n = i[t];
                        if (n.anySame(e)) return {
                            eles: n,
                            index: t
                        }
                    }
                }
                t = e.is.fn(t) ? t : function() {
                    return 1
                };
                for (var r = new e.Collection(this._private.cy, []), i = [], a = this.nodes(), o = 0; o < a.length; o++) i.push(a[o].collection());
                for (var s = this.edges(), l = s.toArray().sort(function(e, n) {
                        var r = t.call(e, e),
                            i = t.call(n, n);
                        return r - i
                    }), o = 0; o < l.length; o++) {
                    var u = l[o],
                        c = u.source()[0],
                        d = u.target()[0],
                        h = n(c),
                        p = n(d);
                    h.index !== p.index && (r = r.add(u), i[h.index] = h.eles.add(p.eles), i.splice(p.index, 1))
                }
                return a.add(r)
            },
            dijkstra: function(t, n, r) {
                var i;
                e.is.plainObject(t) && !e.is.elementOrCollection(t) && (i = t, t = i.root, n = i.weight, r = i.directed);
                var a = this._private.cy;
                n = e.is.fn(n) ? n : function() {
                    return 1
                };
                for (var o = e.is.string(t) ? this.filter(t)[0] : t[0], s = {}, l = {}, u = {}, c = this.edges().filter(function() {
                        return !this.isLoop()
                    }), d = this.nodes(), h = [], p = 0; p < d.length; p++) s[d[p].id()] = d[p].same(o) ? 0 : 1 / 0, h.push(d[p]);
                var f = function(e) {
                    return s[e.id()]
                };
                h = new e.Collection(a, h);
                for (var v = e.Minheap(a, h, f), g = function(e, t) {
                        for (var i, a = (r ? e.edgesTo(t) : e.edgesWith(t)).intersect(c), o = 1 / 0, s = 0; s < a.length; s++) {
                            var l = a[s],
                                u = n.apply(l, [l]);
                            (o > u || !i) && (o = u, i = l)
                        }
                        return {
                            edge: i,
                            dist: o
                        }
                    }; v.size() > 0;) {
                    var y = v.pop(),
                        m = y.value,
                        x = y.id,
                        b = a.getElementById(x);
                    if (u[x] = m, m === Math.Infinite) break;
                    for (var w = b.neighborhood().intersect(d), p = 0; p < w.length; p++) {
                        var _ = w[p],
                            E = _.id(),
                            T = g(b, _),
                            S = m + T.dist;
                        S < v.getValueById(E) && (v.edit(E, S), l[E] = {
                            node: b,
                            edge: T.edge
                        })
                    }
                }
                return {
                    distanceTo: function(t) {
                        var n = e.is.string(t) ? d.filter(t)[0] : t[0];
                        return u[n.id()]
                    },
                    pathTo: function(t) {
                        var n = e.is.string(t) ? d.filter(t)[0] : t[0],
                            r = [],
                            i = n;
                        if (n.length > 0)
                            for (r.unshift(n); l[i.id()];) {
                                var o = l[i.id()];
                                r.unshift(o.edge), r.unshift(o.node), i = o.node
                            }
                        return new e.Collection(a, r)
                    }
                }
            }
        }), e.elesfn.bfs = e.elesfn.breadthFirstSearch, e.elesfn.dfs = e.elesfn.depthFirstSearch, e.elesfn.stdBfs = e.elesfn.stdBreadthFirstSearch, e.elesfn.stdDfs = e.elesfn.stdDepthFirstSearch
    }(cytoscape),
    function(e) {
        "use strict";
        e.fn.eles({
            aStar: function(t) {
                t = t || {};
                var n = function(e, t, r, a) {
                        if (e == t) return a.push(i.getElementById(t)), a;
                        if (t in r) {
                            var o = r[t],
                                s = p[t];
                            return a.push(i.getElementById(t)), a.push(i.getElementById(s)), n(e, o, r, a)
                        }
                        return void 0
                    },
                    r = function(e, t) {
                        if (0 === e.length) return void 0;
                        for (var n = 0, r = t[e[0]], i = 1; i < e.length; i++) {
                            var a = t[e[i]];
                            r > a && (r = a, n = i)
                        }
                        return n
                    },
                    i = this._private.cy;
                if (null == t || null == t.root) return void 0;
                var a = e.is.string(t.root) ? this.filter(t.root)[0] : t.root[0];
                if (null == t.goal) return void 0;
                var o = e.is.string(t.goal) ? this.filter(t.goal)[0] : t.goal[0];
                if (null != t.heuristic && e.is.fn(t.heuristic)) var s = t.heuristic;
                else var s = function() {
                    return 0
                };
                if (null != t.weight && e.is.fn(t.weight)) var l = t.weight;
                else var l = function(e) {
                    return 1
                };
                if (null != t.directed) var u = t.directed;
                else var u = !1;
                var c = [],
                    d = [a.id()],
                    h = {},
                    p = {},
                    f = {},
                    v = {};
                f[a.id()] = 0, v[a.id()] = s(a);
                for (var g = this.edges().stdFilter(function(e) {
                        return !e.isLoop()
                    }), y = this.nodes(), m = 0; d.length > 0;) {
                    var x = r(d, v),
                        b = i.getElementById(d[x]);
                    if (m++, b.id() == o.id()) {
                        var w = n(a.id(), o.id(), h, []);
                        return w.reverse(), {
                            found: !0,
                            distance: f[b.id()],
                            path: new e.Collection(i, w),
                            steps: m
                        }
                    }
                    c.push(b.id()), d.splice(x, 1);
                    var _ = b.connectedEdges();
                    u && (_ = _.stdFilter(function(e) {
                        return e.data("source") === b.id()
                    })), _ = _.intersect(g);
                    for (var E = 0; E < _.length; E++) {
                        var T = _[E],
                            S = T.connectedNodes().stdFilter(function(e) {
                                return e.id() !== b.id()
                            }).intersect(y);
                        if (-1 == c.indexOf(S.id())) {
                            var C = f[b.id()] + l.apply(T, [T]); - 1 != d.indexOf(S.id()) ? C < f[S.id()] && (f[S.id()] = C, v[S.id()] = C + s(S), h[S.id()] = b.id()) : (f[S.id()] = C, v[S.id()] = C + s(S), d.push(S.id()), h[S.id()] = b.id(), p[S.id()] = T.id())
                        }
                    }
                }
                return {
                    found: !1,
                    distance: void 0,
                    path: void 0,
                    steps: m
                }
            },
            floydWarshall: function(t) {
                t = t || {};
                var n = this._private.cy;
                if (null != t.weight && e.is.fn(t.weight)) var r = t.weight;
                else var r = function(e) {
                    return 1
                };
                if (null != t.directed) var i = t.directed;
                else var i = !1;
                for (var a = this.edges().stdFilter(function(e) {
                        return !e.isLoop()
                    }), o = this.nodes(), s = o.length, l = {}, u = 0; s > u; u++) l[o[u].id()] = u;
                for (var c = [], u = 0; s > u; u++) {
                    for (var d = new Array(s), h = 0; s > h; h++) u == h ? d[h] = 0 : d[h] = 1 / 0;
                    c.push(d)
                }
                var p = [],
                    f = [],
                    v = function(e) {
                        for (var t = 0; s > t; t++) {
                            for (var n = new Array(s), r = 0; s > r; r++) n[r] = void 0;
                            e.push(n)
                        }
                    };
                v(p), v(f);
                for (var u = 0; u < a.length; u++) {
                    var g = l[a[u].source().id()],
                        y = l[a[u].target().id()],
                        m = r.apply(a[u], [a[u]]);
                    c[g][y] > m && (c[g][y] = m, p[g][y] = y, f[g][y] = a[u])
                }
                if (!i)
                    for (var u = 0; u < a.length; u++) {
                        var g = l[a[u].target().id()],
                            y = l[a[u].source().id()],
                            m = r.apply(a[u], [a[u]]);
                        c[g][y] > m && (c[g][y] = m, p[g][y] = y, f[g][y] = a[u])
                    }
                for (var x = 0; s > x; x++)
                    for (var u = 0; s > u; u++)
                        for (var h = 0; s > h; h++) c[u][x] + c[x][h] < c[u][h] && (c[u][h] = c[u][x] + c[x][h], p[u][h] = p[u][x]);
                for (var b = [], u = 0; s > u; u++) b.push(o[u].id());
                var w = {
                    distance: function(t, r) {
                        if (e.is.string(t)) var i = n.filter(t)[0].id();
                        else var i = t.id();
                        if (e.is.string(r)) var a = n.filter(r)[0].id();
                        else var a = r.id();
                        return c[l[i]][l[a]]
                    },
                    path: function(t, r) {
                        var i = function(e, t, r, i, a) {
                            if (e === t) return n.getElementById(i[e]);
                            if (void 0 === r[e][t]) return void 0;
                            for (var o = [n.getElementById(i[e])], s = e; e !== t;) {
                                s = e, e = r[e][t];
                                var l = a[s][e];
                                o.push(l), o.push(n.getElementById(i[e]))
                            }
                            return o
                        };
                        if (e.is.string(t)) var a = n.filter(t)[0].id();
                        else var a = t.id();
                        if (e.is.string(r)) var o = n.filter(r)[0].id();
                        else var o = r.id();
                        var s = i(l[a], l[o], p, b, f);
                        return new e.Collection(n, s)
                    }
                };
                return w
            },
            bellmanFord: function(t) {
                if (t = t || {}, null != t.weight && e.is.fn(t.weight)) var n = t.weight;
                else var n = function(e) {
                    return 1
                };
                if (null != t.directed) var r = t.directed;
                else var r = !1;
                if (null == t.root) return void e.util.error("options.root required");
                if (e.is.string(t.root)) var i = this.filter(t.root)[0];
                else var i = t.root[0];
                for (var a = this._private.cy, o = this.edges().stdFilter(function(e) {
                        return !e.isLoop()
                    }), s = this.nodes(), l = s.length, u = {}, c = 0; l > c; c++) u[s[c].id()] = c;
                for (var d = [], h = [], p = [], c = 0; l > c; c++) s[c].id() === i.id() ? d[c] = 0 : d[c] = 1 / 0, h[c] = void 0;
                for (var f = !1, c = 1; l > c; c++) {
                    f = !1;
                    for (var v = 0; v < o.length; v++) {
                        var g = u[o[v].source().id()],
                            y = u[o[v].target().id()],
                            m = n.apply(o[v], [o[v]]),
                            x = d[g] + m;
                        if (x < d[y] && (d[y] = x, h[y] = g, p[y] = o[v], f = !0), !r) {
                            var x = d[y] + m;
                            x < d[g] && (d[g] = x, h[g] = y, p[g] = o[v], f = !0)
                        }
                    }
                    if (!f) break
                }
                if (f)
                    for (var v = 0; v < o.length; v++) {
                        var g = u[o[v].source().id()],
                            y = u[o[v].target().id()],
                            m = n.apply(o[v], [o[v]]);
                        if (d[g] + m < d[y]) return e.util.error("Error: graph contains a negative weigth cycle!"), {
                            pathTo: void 0,
                            distanceTo: void 0,
                            hasNegativeWeightCycle: !0
                        }
                    }
                for (var b = [], c = 0; l > c; c++) b.push(s[c].id());
                var w = {
                    distanceTo: function(t) {
                        if (e.is.string(t)) var n = a.filter(t)[0].id();
                        else var n = t.id();
                        return d[u[n]]
                    },
                    pathTo: function(t) {
                        var n = function(e, t, n, r, i, o) {
                            for (;;) {
                                if (i.push(a.getElementById(r[n])), i.push(o[n]), t === n) return i;
                                var s = e[n];
                                if ("undefined" == typeof s) return void 0;
                                n = s
                            }
                        };
                        if (e.is.string(t)) var r = a.filter(t)[0].id();
                        else var r = t.id();
                        var o = [],
                            s = n(h, u[i.id()], u[r], b, o, p);
                        return null != s && s.reverse(), new e.Collection(a, s)
                    },
                    hasNegativeWeightCycle: !1
                };
                return w
            },
            kargerStein: function(t) {
                t = t || {};
                var n = function(e, t, n) {
                        for (var r = n[e], i = r[1], a = r[2], o = t[i], s = t[a], l = n.filter(function(e) {
                                return t[e[1]] === o && t[e[2]] === s ? !1 : t[e[1]] === s && t[e[2]] === o ? !1 : !0
                            }), u = 0; u < l.length; u++) {
                            var c = l[u];
                            c[1] === s ? (l[u] = c.slice(0), l[u][1] = o) : c[2] === s && (l[u] = c.slice(0), l[u][2] = o)
                        }
                        for (var u = 0; u < t.length; u++) t[u] === s && (t[u] = o);
                        return l
                    },
                    r = function(e, t, i, a) {
                        if (a >= i) return t;
                        var o = Math.floor(Math.random() * t.length),
                            s = n(o, e, t);
                        return r(e, s, i - 1, a)
                    },
                    i = this._private.cy,
                    a = this.edges().stdFilter(function(e) {
                        return !e.isLoop()
                    }),
                    o = this.nodes(),
                    s = o.length,
                    l = a.length,
                    u = Math.ceil(Math.pow(Math.log(s) / Math.LN2, 2)),
                    c = Math.floor(s / Math.sqrt(2));
                if (2 > s) return void e.util.error("At least 2 nodes are required for KargerSteing algorithm!");
                for (var d = {}, h = 0; s > h; h++) d[o[h].id()] = h;
                for (var p = [], h = 0; l > h; h++) {
                    var f = a[h];
                    p.push([h, d[f.source().id()], d[f.target().id()]])
                }
                for (var v, g = 1 / 0, y = [], h = 0; s > h; h++) y.push(h);
                for (var m = 0; u >= m; m++) {
                    var x = y.slice(0),
                        b = r(x, p, s, c),
                        w = x.slice(0),
                        _ = r(x, b, c, 2),
                        E = r(w, b, c, 2);
                    _.length <= E.length && _.length < g ? (g = _.length, v = [_, x]) : E.length <= _.length && E.length < g && (g = E.length, v = [E, w])
                }
                for (var T = v[0].map(function(e) {
                        return a[e[0]]
                    }), S = [], C = [], k = v[1][0], h = 0; h < v[1].length; h++) {
                    var D = v[1][h];
                    D === k ? S.push(o[h]) : C.push(o[h])
                }
                var N = {
                    cut: new e.Collection(i, T),
                    partition1: new e.Collection(i, S),
                    partition2: new e.Collection(i, C)
                };
                return N
            },
            pageRank: function(t) {
                t = t || {};
                var n = function(e) {
                    for (var t = e.length, n = 0, r = 0; t > r; r++) n += e[r];
                    for (var r = 0; t > r; r++) e[r] = e[r] / n
                };
                if (null != t && null != t.dampingfactor) var r = t.dampingFactor;
                else var r = .8;
                if (null != t && null != t.precision) var i = t.precision;
                else var i = 1e-6;
                if (null != t && null != t.iterations) var a = t.iterations;
                else var a = 200;
                if (null != t && null != t.weight && e.is.fn(t.weight)) var o = t.weight;
                else var o = function(e) {
                    return 1
                };
                for (var s = this._private.cy, l = this.edges().stdFilter(function(e) {
                        return !e.isLoop()
                    }), u = this.nodes(), c = u.length, d = l.length, h = {}, p = 0; c > p; p++) h[u[p].id()] = p;
                for (var f = [], v = [], g = (1 - r) / c, p = 0; c > p; p++) {
                    for (var y = [], m = 0; c > m; m++) y.push(0);
                    f.push(y), v.push(0)
                }
                for (var p = 0; d > p; p++) {
                    var x = l[p],
                        b = h[x.source().id()],
                        w = h[x.target().id()],
                        _ = o.apply(x, [x]);
                    f[w][b] += _, v[b] += _
                }
                for (var E = 1 / c + g, m = 0; c > m; m++)
                    if (0 === v[m])
                        for (var p = 0; c > p; p++) f[p][m] = E;
                    else
                        for (var p = 0; c > p; p++) f[p][m] = f[p][m] / v[m] + g;
                for (var T, S = [], C = [], p = 0; c > p; p++) S.push(1), C.push(0);
                for (var k = 0; a > k; k++) {
                    for (var D = C.slice(0), p = 0; c > p; p++)
                        for (var m = 0; c > m; m++) D[p] += f[p][m] * S[m];
                    n(D), T = S, S = D;
                    for (var N = 0, p = 0; c > p; p++) N += Math.pow(T[p] - S[p], 2);
                    if (i > N) break
                }
                var P = {
                    rank: function(t) {
                        if (e.is.string(t)) var n = s.filter(t)[0].id();
                        else var n = t.id();
                        return S[h[n]]
                    }
                };
                return P
            },
            degreeCentralityNormalized: function(t) {
                if (t = t || {}, null != t.directed) var n = t.directed;
                else var n = !1;
                var r = this.nodes(),
                    i = r.length;
                if (n) {
                    for (var a = {}, o = {}, s = 0, l = 0, u = 0; i > u; u++) {
                        var c = r[u],
                            d = this.degreeCentrality(e.util.extend({}, t, {
                                root: c
                            }));
                        s < d.indegree && (s = d.indegree), l < d.outdegree && (l = d.outdegree), a[c.id()] = d.indegree, o[c.id()] = d.outdegree
                    }
                    return {
                        indegree: function(t) {
                            if (e.is.string(t)) var t = cy.filter(t)[0].id();
                            else var t = t.id();
                            return a[t] / s
                        },
                        outdegree: function(t) {
                            if (e.is.string(t)) var t = cy.filter(t)[0].id();
                            else var t = t.id();
                            return o[t] / l
                        }
                    }
                }
                for (var h = {}, p = 0, u = 0; i > u; u++) {
                    var c = r[u],
                        d = this.degreeCentrality(e.util.extend({}, t, {
                            root: c
                        }));
                    p < d.degree && (p = d.degree), h[c.id()] = d.degree
                }
                return {
                    degree: function(t) {
                        if (e.is.string(t)) var t = cy.filter(t)[0].id();
                        else var t = t.id();
                        return h[t] / p
                    }
                }
            },
            degreeCentrality: function(t) {
                t = t || {};
                var n = this;
                if (null == t || null == t.root) return void 0;
                var r = e.is.string(t.root) ? this.filter(t.root)[0] : t.root[0];
                if (null != t.weight && e.is.fn(t.weight)) var i = t.weight;
                else var i = function(e) {
                    return 1
                };
                if (null != t.directed) var a = t.directed;
                else var a = !1;
                if (null != t.alpha && e.is.number(t.alpha)) var o = t.alpha;
                else o = 0;
                if (a) {
                    for (var s = r.connectedEdges('edge[target = "' + r.id() + '"]').intersection(n), l = r.connectedEdges('edge[source = "' + r.id() + '"]').intersection(n), u = s.length, c = l.length, d = 0, h = 0, p = 0; p < s.length; p++) {
                        var f = s[p];
                        d += i.apply(f, [f])
                    }
                    for (var p = 0; p < l.length; p++) {
                        var f = l[p];
                        h += i.apply(f, [f])
                    }
                    return {
                        indegree: Math.pow(u, 1 - o) * Math.pow(d, o),
                        outdegree: Math.pow(c, 1 - o) * Math.pow(h, o)
                    }
                }
                for (var v = r.connectedEdges().intersection(n), g = v.length, y = 0, p = 0; p < v.length; p++) {
                    var f = v[p];
                    y += i.apply(f, [f])
                }
                return {
                    degree: Math.pow(g, 1 - o) * Math.pow(y, o)
                }
            },
            closenessCentralityNormalized: function(t) {
                t = t || {};
                var n = t.harmonic;
                void 0 === n && (n = !0);
                for (var r = {}, i = 0, a = this.nodes(), o = this.floydWarshall({
                        weight: t.weight,
                        directed: t.directed
                    }), s = 0; s < a.length; s++) {
                    for (var l = 0, u = 0; u < a.length; u++)
                        if (s != u) {
                            var c = o.distance(a[s], a[u]);
                            l += n ? 1 / c : c
                        }
                    n || (l = 1 / l), l > i && (i = l), r[a[s].id()] = l
                }
                return {
                    closeness: function(t) {
                        if (e.is.string(t)) var t = cy.filter(t)[0].id();
                        else var t = t.id();
                        return r[t] / i
                    }
                }
            },
            closenessCentrality: function(t) {
                if (t = t || {}, null == t.root) return void e.util.error("options.root required");
                if (e.is.string(t.root)) var n = this.filter(t.root)[0];
                else var n = t.root[0];
                if (null != t.weight && e.is.fn(t.weight)) var r = t.weight;
                else var r = function() {
                    return 1
                };
                if (null != t.directed && e.is.bool(t.directed)) var i = t.directed;
                else var i = !1;
                var a = t.harmonic;
                void 0 === a && (a = !0);
                for (var o = this.dijkstra({
                        root: n,
                        weight: r,
                        directed: i
                    }), s = 0, l = this.nodes(), u = 0; u < l.length; u++)
                    if (l[u].id() != n.id()) {
                        var c = o.distanceTo(l[u]);
                        s += a ? 1 / c : c
                    }
                return a ? s : 1 / s
            },
            betweennessCentrality: function(t) {
                if (t = t || {}, null != t.weight && e.is.fn(t.weight)) var n = t.weight,
                    r = !0;
                else var r = !1;
                if (null != t.directed && e.is.bool(t.directed)) var i = t.directed;
                else var i = !1;
                for (var a = function(e, t) {
                        e.unshift(t);
                        for (var n = 0; v[e[n]] < v[e[n + 1]] && n < e.length - 1; n++) {
                            var r = e[n];
                            e[n] = e[n + 1], e[n + 1] = r
                        }
                    }, o = this._private.cy, s = this.nodes(), l = {}, u = {}, c = 0; c < s.length; c++) i ? l[s[c].id()] = s[c].outgoers("node") : l[s[c].id()] = s[c].openNeighborhood("node");
                for (var c = 0; c < s.length; c++) u[s[c].id()] = 0;
                for (var d = 0; d < s.length; d++) {
                    for (var h = [], p = {}, f = {}, v = {}, g = [], c = 0; c < s.length; c++) p[s[c].id()] = [], f[s[c].id()] = 0, v[s[c].id()] = Number.POSITIVE_INFINITY;
                    for (f[s[d].id()] = 1, v[s[d].id()] = 0, g.unshift(s[d].id()); g.length > 0;) {
                        var y = g.pop();
                        h.push(y), r ? l[y].forEach(function(e) {
                            if (o.$("#" + y).edgesTo(e).length > 0) var t = o.$("#" + y).edgesTo(e)[0];
                            else var t = e.edgesTo("#" + y)[0];
                            var r = n.apply(t, [t]);
                            v[e.id()] > v[y] + r && (v[e.id()] = v[y] + r, g.indexOf(e.id()) < 0 ? a(g, e.id()) : (g.splice(g.indexOf(e.id()), 1), a(g, e.id())), f[e.id()] = 0, p[e.id()] = []), v[e.id()] == v[y] + r && (f[e.id()] = f[e.id()] + f[y], p[e.id()].push(y))
                        }) : l[y].forEach(function(e) {
                            v[e.id()] == Number.POSITIVE_INFINITY && (g.unshift(e.id()), v[e.id()] = v[y] + 1), v[e.id()] == v[y] + 1 && (f[e.id()] = f[e.id()] + f[y], p[e.id()].push(y))
                        })
                    }
                    for (var m = {}, c = 0; c < s.length; c++) m[s[c].id()] = 0;
                    for (; h.length > 0;) {
                        var x = h.pop();
                        p[x].forEach(function(e) {
                            m[e] = m[e] + f[e] / f[x] * (1 + m[x]), x != s[d].id() && (u[x] = u[x] + m[x])
                        })
                    }
                }
                var b = 0;
                for (var w in u) b < u[w] && (b = u[w]);
                var _ = {
                    betweenness: function(t) {
                        if (e.is.string(t)) var t = o.filter(t)[0].id();
                        else var t = t.id();
                        return u[t]
                    },
                    betweennessNormalized: function(t) {
                        if (e.is.string(t)) var t = o.filter(t)[0].id();
                        else var t = t.id();
                        return u[t] / b
                    }
                };
                return _.betweennessNormalised = _.betweennessNormalized, _
            }
        }), e.elesfn.dc = e.elesfn.degreeCentrality, e.elesfn.dcn = e.elesfn.degreeCentralityNormalised = e.elesfn.degreeCentralityNormalized, e.elesfn.cc = e.elesfn.closenessCentrality, e.elesfn.ccn = e.elesfn.closenessCentralityNormalised = e.elesfn.closenessCentralityNormalized, e.elesfn.bc = e.elesfn.betweennessCentrality
    }(cytoscape),
    function(e) {
        "use strict";
        e.fn.eles({
            animated: e.define.animated(),
            clearQueue: e.define.clearQueue(),
            delay: e.define.delay(),
            animate: e.define.animate(),
            stop: e.define.stop()
        })
    }(cytoscape),
    function(e) {
        "use strict";
        e.fn.eles({
            addClass: function(t) {
                t = t.split(/\s+/);
                for (var n = this, r = [], i = 0; i < t.length; i++) {
                    var a = t[i];
                    if (!e.is.emptyString(a))
                        for (var o = 0; o < n.length; o++) {
                            var s = n[o],
                                l = s._private.classes[a];
                            s._private.classes[a] = !0, l || r.push(s)
                        }
                }
                return r.length > 0 && new e.Collection(this._private.cy, r).updateStyle().trigger("class"), n
            },
            hasClass: function(e) {
                var t = this[0];
                return null != t && t._private.classes[e] ? !0 : !1
            },
            toggleClass: function(t, n) {
                for (var r = t.split(/\s+/), i = this, a = [], o = 0, s = i.length; s > o; o++)
                    for (var l = i[o], u = 0; u < r.length; u++) {
                        var c = r[u];
                        if (!e.is.emptyString(c)) {
                            var d = l._private.classes[c],
                                h = n || void 0 === n && !d;
                            h ? (l._private.classes[c] = !0, d || a.push(l)) : (l._private.classes[c] = !1, d && a.push(l))
                        }
                    }
                return a.length > 0 && new e.Collection(this._private.cy, a).updateStyle().trigger("class"), i
            },
            removeClass: function(t) {
                t = t.split(/\s+/);
                for (var n = this, r = [], i = 0; i < n.length; i++)
                    for (var a = n[i], o = 0; o < t.length; o++) {
                        var s = t[o];
                        if (s && "" !== s) {
                            var l = a._private.classes[s];
                            a._private.classes[s] = void 0, l && r.push(a)
                        }
                    }
                return r.length > 0 && new e.Collection(n._private.cy, r).updateStyle(), n.trigger("class"), n
            },
            flashClass: function(e, t) {
                var n = this;
                if (null == t) t = 250;
                else if (0 === t) return n;
                return n.addClass(e), setTimeout(function() {
                    n.removeClass(e)
                }, t), n
            }
        })
    }(cytoscape),
    function(e) {
        "use strict";
        e.fn.eles({
            allAre: function(e) {
                return this.filter(e).length === this.length
            },
            is: function(e) {
                return this.filter(e).length > 0
            },
            some: function(e, t) {
                for (var n = 0; n < this.length; n++) {
                    var r = t ? e.apply(t, [this[n], n, this]) : e(this[n], n, this);
                    if (r) return !0
                }
                return !1
            },
            every: function(e, t) {
                for (var n = 0; n < this.length; n++) {
                    var r = t ? e.apply(t, [this[n], n, this]) : e(this[n], n, this);
                    if (!r) return !1
                }
                return !0
            },
            same: function(e) {
                return e = this.cy().collection(e), this.length !== e.length ? !1 : this.intersect(e).length === this.length
            },
            anySame: function(e) {
                return e = this.cy().collection(e), this.intersect(e).length > 0
            },
            allAreNeighbors: function(e) {
                return e = this.cy().collection(e), this.neighborhood().intersect(e).length === e.length
            }
        }), e.elesfn.allAreNeighbours = e.elesfn.allAreNeighbors
    }(cytoscape),
    function(e) {
        "use strict";
        e.fn.eles({
            parent: function(t) {
                for (var n = [], r = this._private.cy, i = 0; i < this.length; i++) {
                    var a = this[i],
                        o = r.getElementById(a._private.data.parent);
                    o.size() > 0 && n.push(o)
                }
                return new e.Collection(r, n, {
                    unique: !0
                }).filter(t)
            },
            parents: function(t) {
                for (var n = [], r = this.parent(); r.nonempty();) {
                    for (var i = 0; i < r.length; i++) {
                        var a = r[i];
                        n.push(a)
                    }
                    r = r.parent()
                }
                return new e.Collection(this.cy(), n, {
                    unique: !0
                }).filter(t)
            },
            commonAncestors: function(e) {
                for (var t, n = 0; n < this.length; n++) {
                    var r = this[n],
                        i = r.parents();
                    t = t || i, t = t.intersect(i)
                }
                return t.filter(e)
            },
            orphans: function(e) {
                return this.stdFilter(function(e) {
                    return e.isNode() && e.parent().empty()
                }).filter(e)
            },
            nonorphans: function(e) {
                return this.stdFilter(function(e) {
                    return e.isNode() && e.parent().nonempty()
                }).filter(e)
            },
            children: function(t) {
                for (var n = [], r = 0; r < this.length; r++) {
                    var i = this[r];
                    n = n.concat(i._private.children)
                }
                return new e.Collection(this.cy(), n, {
                    unique: !0
                }).filter(t)
            },
            siblings: function(e) {
                return this.parent().children().not(this).filter(e)
            },
            isParent: function() {
                var e = this[0];
                return e ? 0 !== e._private.children.length : void 0
            },
            isChild: function() {
                var e = this[0];
                return e ? void 0 !== e._private.data.parent && 0 !== e.parent().length : void 0
            },
            descendants: function(t) {
                function n(e) {
                    for (var t = 0; t < e.length; t++) {
                        var i = e[t];
                        r.push(i), i.children().nonempty() && n(i.children())
                    }
                }
                var r = [];
                return n(this.children()), new e.Collection(this.cy(), r, {
                    unique: !0
                }).filter(t)
            }
        }), e.elesfn.ancestors = e.elesfn.parents
    }(cytoscape),
    function(e) {
        "use strict";
        var t = 1,
            n = 0;
        e.fn.eles({
            data: e.define.data({
                field: "data",
                bindingEvent: "data",
                allowBinding: !0,
                allowSetting: !0,
                settingEvent: "data",
                settingTriggersEvent: !0,
                triggerFnName: "trigger",
                allowGetting: !0,
                immutableKeys: {
                    id: !0,
                    source: !0,
                    target: !0,
                    parent: !0
                },
                updateStyle: !0
            }),
            removeData: e.define.removeData({
                field: "data",
                event: "data",
                triggerFnName: "trigger",
                triggerEvent: !0,
                immutableKeys: {
                    id: !0,
                    source: !0,
                    target: !0,
                    parent: !0
                },
                updateStyle: !0
            }),
            scratch: e.define.data({
                field: "scratch",
                bindingEvent: "scratch",
                allowBinding: !0,
                allowSetting: !0,
                settingEvent: "scratch",
                settingTriggersEvent: !0,
                triggerFnName: "trigger",
                allowGetting: !0,
                updateStyle: !0
            }),
            removeScratch: e.define.removeData({
                field: "scratch",
                event: "scratch",
                triggerFnName: "trigger",
                triggerEvent: !0,
                updateStyle: !0
            }),
            rscratch: e.define.data({
                field: "rscratch",
                allowBinding: !1,
                allowSetting: !0,
                settingTriggersEvent: !1,
                allowGetting: !0
            }),
            removeRscratch: e.define.removeData({
                field: "rscratch",
                triggerEvent: !1
            }),
            id: function() {
                var e = this[0];
                return e ? e._private.data.id : void 0
            },
            position: e.define.data({
                field: "position",
                bindingEvent: "position",
                allowBinding: !0,
                allowSetting: !0,
                settingEvent: "position",
                settingTriggersEvent: !0,
                triggerFnName: "rtrigger",
                allowGetting: !0,
                validKeys: ["x", "y"],
                onSet: function(e) {
                    var t = e.updateCompoundBounds();
                    t.rtrigger("position")
                },
                canSet: function(e) {
                    return !e.locked()
                }
            }),
            silentPosition: e.define.data({
                field: "position",
                bindingEvent: "position",
                allowBinding: !1,
                allowSetting: !0,
                settingEvent: "position",
                settingTriggersEvent: !1,
                triggerFnName: "trigger",
                allowGetting: !0,
                validKeys: ["x", "y"],
                onSet: function(e) {
                    e.updateCompoundBounds()
                },
                canSet: function(e) {
                    return !e.locked()
                }
            }),
            positions: function(t, n) {
                if (e.is.plainObject(t)) this.position(t);
                else if (e.is.fn(t)) {
                    for (var r = t, i = 0; i < this.length; i++) {
                        var a = this[i],
                            t = r.apply(a, [i, a]);
                        if (t && !a.locked()) {
                            var o = a._private.position;
                            o.x = t.x, o.y = t.y
                        }
                    }
                    var s = this.updateCompoundBounds(),
                        l = s.length > 0 ? this.add(s) : this;
                    n ? l.trigger("position") : l.rtrigger("position")
                }
                return this
            },
            silentPositions: function(e) {
                return this.positions(e, !0)
            },
            updateCompoundBounds: function() {
                function t(e) {
                    var t = e.children(),
                        n = e._private.style,
                        i = "include" === n["compound-sizing-wrt-labels"].value,
                        a = t.boundingBox({
                            includeLabels: i,
                            includeEdges: !0
                        }),
                        o = {
                            top: n["padding-top"].pxValue,
                            bottom: n["padding-bottom"].pxValue,
                            left: n["padding-left"].pxValue,
                            right: n["padding-right"].pxValue
                        },
                        s = e._private.position,
                        l = !1;
                    "auto" === n.width.value && (e._private.autoWidth = a.w + o.left + o.right, s.x = (a.x1 + a.x2 - o.left + o.right) / 2, l = !0), "auto" === n.height.value && (e._private.autoHeight = a.h + o.top + o.bottom, s.y = (a.y1 + a.y2 - o.top + o.bottom) / 2, l = !0), l && r.push(e)
                }
                var n = this.cy();
                if (!n.styleEnabled() || !n.hasCompoundNodes()) return n.collection();
                for (var r = [], i = this.parent(); i.nonempty();) {
                    for (var a = 0; a < i.length; a++) {
                        var o = i[a];
                        t(o)
                    }
                    i = i.parent()
                }
                return new e.Collection(n, r)
            },
            renderedPosition: function(t, n) {
                var r = this[0],
                    i = this.cy(),
                    a = i.zoom(),
                    o = i.pan(),
                    s = e.is.plainObject(t) ? t : void 0,
                    l = void 0 !== s || void 0 !== n && e.is.string(t);
                if (r && r.isNode()) {
                    if (!l) {
                        var u = r._private.position;
                        return s = {
                            x: u.x * a + o.x,
                            y: u.y * a + o.y
                        }, void 0 === t ? s : s[t]
                    }
                    for (var c = 0; c < this.length; c++) {
                        var r = this[c];
                        void 0 !== n ? r._private.position[t] = (n - o[t]) / a : void 0 !== s && (r._private.position = {
                            x: (s.x - o.x) / a,
                            y: (s.y - o.y) / a
                        })
                    }
                    this.rtrigger("position")
                } else if (!l) return void 0;
                return this
            },
            relativePosition: function(t, n) {
                var r = this[0],
                    i = this.cy(),
                    a = e.is.plainObject(t) ? t : void 0,
                    o = void 0 !== a || void 0 !== n && e.is.string(t),
                    s = i.hasCompoundNodes();
                if (r && r.isNode()) {
                    if (!o) {
                        var l = r._private.position,
                            u = s ? r.parent() : null,
                            c = u && u.length > 0,
                            d = c;
                        c && (u = u[0]);
                        var h = d ? u._private.position : {
                            x: 0,
                            y: 0
                        };
                        return a = {
                            x: l.x - h.x,
                            y: l.y - h.y
                        }, void 0 === t ? a : a[t]
                    }
                    for (var p = 0; p < this.length; p++) {
                        var r = this[p],
                            u = s ? r.parent() : null,
                            c = u && u.length > 0,
                            d = c;
                        c && (u = u[0]);
                        var h = d ? u._private.position : {
                            x: 0,
                            y: 0
                        };
                        void 0 !== n ? r._private.position[t] = n + h[t] : void 0 !== a && (r._private.position = {
                            x: a.x + h.x,
                            y: a.y + h.y
                        })
                    }
                    this.rtrigger("position")
                } else if (!o) return void 0;
                return this
            },
            width: function() {
                var e = this[0],
                    t = e._private.cy,
                    n = t._private.styleEnabled;
                if (e) {
                    if (n) {
                        var r = e._private.style.width;
                        return "auto" === r.strValue ? e._private.autoWidth : r.pxValue
                    }
                    return 1
                }
            },
            outerWidth: function() {
                var e = this[0],
                    r = e._private.cy,
                    i = r._private.styleEnabled;
                if (e) {
                    if (i) {
                        var a = e._private.style,
                            o = "auto" === a.width.strValue ? e._private.autoWidth : a.width.pxValue,
                            s = a["border-width"] ? a["border-width"].pxValue * t + n : 0;
                        return o + s
                    }
                    return 1
                }
            },
            renderedWidth: function() {
                var e = this[0];
                if (e) {
                    var t = e.width();
                    return t * this.cy().zoom()
                }
            },
            renderedOuterWidth: function() {
                var e = this[0];
                if (e) {
                    var t = e.outerWidth();
                    return t * this.cy().zoom()
                }
            },
            height: function() {
                var e = this[0],
                    t = e._private.cy,
                    n = t._private.styleEnabled;
                if (e && "nodes" === e._private.group) {
                    if (n) {
                        var r = e._private.style.height;
                        return "auto" === r.strValue ? e._private.autoHeight : r.pxValue
                    }
                    return 1
                }
            },
            outerHeight: function() {
                var e = this[0],
                    r = e._private.cy,
                    i = r._private.styleEnabled;
                if (e && "nodes" === e._private.group) {
                    if (!i) return 1;
                    var a = e._private.style,
                        o = "auto" === a.height.strValue ? e._private.autoHeight : a.height.pxValue,
                        s = a["border-width"] ? a["border-width"].pxValue * t + n : 0;
                    return o + s
                }
            },
            renderedHeight: function() {
                var e = this[0];
                if (e && "nodes" === e._private.group) {
                    var t = e.height();
                    return t * this.cy().zoom()
                }
            },
            renderedOuterHeight: function() {
                var e = this[0];
                if (e && "nodes" === e._private.group) {
                    var t = e.outerHeight();
                    return t * this.cy().zoom()
                }
            },
            renderedBoundingBox: function(e) {
                var t = this.boundingBox(e),
                    n = this.cy(),
                    r = n.zoom(),
                    i = n.pan(),
                    a = t.x1 * r + i.x,
                    o = t.x2 * r + i.x,
                    s = t.y1 * r + i.y,
                    l = t.y2 * r + i.y;
                return {
                    x1: a,
                    x2: o,
                    y1: s,
                    y2: l,
                    w: o - a,
                    h: l - s
                }
            },
            boundingBox: function(e) {
                var t = this,
                    n = t._private.cy,
                    r = n._private,
                    i = r.styleEnabled;
                e = e || {};
                var a = void 0 === e.includeNodes ? !0 : e.includeNodes,
                    o = void 0 === e.includeEdges ? !0 : e.includeEdges,
                    s = void 0 === e.includeLabels ? !0 : e.includeLabels;
                i && r.renderer.recalculateRenderedStyle(this);
                for (var l = 1 / 0, u = -(1 / 0), c = 1 / 0, d = -(1 / 0), h = 0; h < t.length; h++) {
                    var p, f, v, g, y, m, x = t[h],
                        b = x._private,
                        w = b.style,
                        _ = i ? b.style.display.value : "element",
                        E = "nodes" === b.group,
                        T = !1;
                    if ("none" !== _) {
                        if (E && a) {
                            T = !0;
                            var S = b.position;
                            y = S.x, m = S.y;
                            var C = x.outerWidth(),
                                k = C / 2,
                                D = x.outerHeight(),
                                N = D / 2;
                            p = y - k, f = y + k, v = m - N, g = m + N, l = l > p ? p : l, u = f > u ? f : u, c = c > v ? v : c, d = g > d ? g : d
                        } else if (x.isEdge() && o) {
                            T = !0;
                            var P = b.source,
                                M = P._private,
                                B = M.position,
                                L = b.target,
                                O = L._private,
                                A = O.position,
                                I = b.rstyle || {};
                            if (p = B.x, f = A.x, v = B.y, g = A.y, p > f) {
                                var z = p;
                                p = f, f = z
                            }
                            if (v > g) {
                                var z = v;
                                v = g, g = z
                            }
                            if (l = l > p ? p : l, u = f > u ? f : u, c = c > v ? v : c, d = g > d ? g : d, i)
                                for (var R = I.bezierPts || [], C = w.width.pxValue, j = C / 2, F = 0; F < R.length; F++) {
                                    var q = R[F];
                                    p = q.x - j, f = q.x + j, v = q.y - j, g = q.y + j, l = l > p ? p : l, u = f > u ? f : u, c = c > v ? v : c, d = g > d ? g : d
                                }
                            if (i && "haystack" === w["curve-style"].strValue) {
                                var V = b.rscratch.haystackPts;
                                if (p = V[0], v = V[1], f = V[2], g = V[3], p > f) {
                                    var z = p;
                                    p = f, f = z
                                }
                                if (v > g) {
                                    var z = v;
                                    v = g, g = z
                                }
                                l = l > p ? p : l, u = f > u ? f : u, c = c > v ? v : c, d = g > d ? g : d
                            }
                        }
                        if (i) {
                            var w = x._private.style,
                                I = x._private.rstyle,
                                X = w.content.strValue,
                                H = w["font-size"],
                                Y = w["text-halign"],
                                $ = w["text-valign"],
                                W = I.labelWidth,
                                U = I.labelHeight,
                                Z = I.labelX,
                                G = I.labelY;
                            if (T && s && X && H && null != U && null != W && null != Z && null != G && Y && $) {
                                var K, J, Q, ee, te = U,
                                    ne = W;
                                if (x.isEdge()) K = Z - ne / 2, J = Z + ne / 2, Q = G - te / 2, ee = G + te / 2;
                                else {
                                    switch (Y.value) {
                                        case "left":
                                            K = Z - ne, J = Z;
                                            break;
                                        case "center":
                                            K = Z - ne / 2, J = Z + ne / 2;
                                            break;
                                        case "right":
                                            K = Z, J = Z + ne
                                    }
                                    switch ($.value) {
                                        case "top":
                                            Q = G - te, ee = G;
                                            break;
                                        case "center":
                                            Q = G - te / 2, ee = G + te / 2;
                                            break;
                                        case "bottom":
                                            Q = G, ee = G + te
                                    }
                                }
                                l = l > K ? K : l, u = J > u ? J : u, c = c > Q ? Q : c, d = ee > d ? ee : d
                            }
                        }
                    }
                }
                var re = function(e) {
                    return e === 1 / 0 || e === -(1 / 0) ? 0 : e
                };
                return l = re(l), u = re(u), c = re(c), d = re(d), {
                    x1: l,
                    x2: u,
                    y1: c,
                    y2: d,
                    w: u - l,
                    h: d - c
                }
            }
        });
        var r = e.elesfn;
        r.attr = r.data, r.removeAttr = r.removeData, r.modelPosition = r.point = r.position, r.modelPositions = r.points = r.positions, r.renderedPoint = r.renderedPosition, r.relativePoint = r.relativePosition, r.boundingbox = r.boundingBox, r.renderedBoundingbox = r.renderedBoundingBox
    }(cytoscape),
    function(e) {
        "use strict";

        function t(e) {
            return function(t) {
                var n = this;
                if (void 0 === t && (t = !0), 0 !== n.length && n.isNode() && !n.removed()) {
                    for (var r = 0, i = n[0], a = i._private.edges, o = 0; o < a.length; o++) {
                        var s = a[o];
                        (t || !s.isLoop()) && (r += e(i, s))
                    }
                    return r
                }
            }
        }

        function n(e, t) {
            return function(n) {
                for (var r, i = this.nodes(), a = 0; a < i.length; a++) {
                    var o = i[a],
                        s = o[e](n);
                    void 0 === s || void 0 !== r && !t(s, r) || (r = s)
                }
                return r
            }
        }
        e.fn.eles({
            degree: t(function(e, t) {
                return t.source().same(t.target()) ? 2 : 1
            }),
            indegree: t(function(e, t) {
                return t.target().same(e) ? 1 : 0
            }),
            outdegree: t(function(e, t) {
                return t.source().same(e) ? 1 : 0
            })
        }), e.fn.eles({
            minDegree: n("degree", function(e, t) {
                return t > e
            }),
            maxDegree: n("degree", function(e, t) {
                return e > t
            }),
            minIndegree: n("indegree", function(e, t) {
                return t > e
            }),
            maxIndegree: n("indegree", function(e, t) {
                return e > t
            }),
            minOutdegree: n("outdegree", function(e, t) {
                return t > e
            }),
            maxOutdegree: n("outdegree", function(e, t) {
                return e > t
            })
        }), e.fn.eles({
            totalDegree: function(e) {
                for (var t = 0, n = this.nodes(), r = 0; r < n.length; r++) t += n[r].degree(e);
                return t
            }
        })
    }(cytoscape),
    function(e) {
        "use strict";
        e.fn.eles({
            on: e.define.on(),
            one: e.define.on({
                unbindSelfOnTrigger: !0
            }),
            once: e.define.on({
                unbindAllBindersOnTrigger: !0
            }),
            off: e.define.off(),
            trigger: e.define.trigger(),
            rtrigger: function(e, t) {
                return 0 !== this.length ? (this.cy().notify({
                    type: e,
                    collection: this
                }), this.trigger(e, t), this) : void 0
            }
        }), e.define.eventAliasesOn(e.elesfn)
    }(cytoscape),
    function(e) {
        "use strict";
        e.fn.eles({
            nodes: function(e) {
                return this.filter(function(e, t) {
                    return t.isNode()
                }).filter(e)
            },
            edges: function(e) {
                return this.filter(function(e, t) {
                    return t.isEdge()
                }).filter(e)
            },
            filter: function(t) {
                var n = this._private.cy;
                if (e.is.fn(t)) {
                    for (var r = [], i = 0; i < this.length; i++) {
                        var a = this[i];
                        t.apply(a, [i, a]) && r.push(a)
                    }
                    return new e.Collection(n, r)
                }
                return e.is.string(t) || e.is.elementOrCollection(t) ? new e.Selector(t).filter(this) : void 0 === t ? this : new e.Collection(n)
            },
            not: function(t) {
                var n = this._private.cy;
                if (t) {
                    e.is.string(t) && (t = this.filter(t));
                    for (var r = [], i = 0; i < this.length; i++) {
                        var a = this[i],
                            o = t._private.ids[a.id()];
                        o || r.push(a)
                    }
                    return new e.Collection(n, r)
                }
                return this
            },
            absoluteComplement: function() {
                var e = this._private.cy;
                return e.elements().not(this)
            },
            intersect: function(t) {
                var n = this._private.cy;
                if (e.is.string(t)) {
                    var r = t;
                    return this.filter(r)
                }
                for (var i = [], a = this, o = t, s = this.length < t.length, l = s ? o._private.ids : a._private.ids, u = s ? a : o, c = 0; c < u.length; c++) {
                    var d = u[c]._private.data.id,
                        h = l[d];
                    h && i.push(h)
                }
                return new e.Collection(n, i)
            },
            xor: function(t) {
                var n = this._private.cy;
                e.is.string(t) && (t = n.$(t));
                var r = [],
                    i = this,
                    a = t,
                    o = function(e, t) {
                        for (var n = 0; n < e.length; n++) {
                            var i = e[n],
                                a = i._private.data.id,
                                o = t._private.ids[a];
                            o || r.push(i)
                        }
                    };
                return o(i, a), o(a, i), new e.Collection(n, r)
            },
            diff: function(t) {
                var n = this._private.cy;
                e.is.string(t) && (t = n.$(t));
                var r = [],
                    i = [],
                    a = [],
                    o = this,
                    s = t,
                    l = function(e, t, n) {
                        for (var r = 0; r < e.length; r++) {
                            var i = e[r],
                                o = i._private.data.id,
                                s = t._private.ids[o];
                            s ? a.push(i) : n.push(i)
                        }
                    };
                return l(o, s, r), l(s, o, i), {
                    left: new e.Collection(n, r, {
                        unique: !0
                    }),
                    right: new e.Collection(n, i, {
                        unique: !0
                    }),
                    both: new e.Collection(n, a, {
                        unique: !0
                    })
                }
            },
            add: function(t) {
                var n = this._private.cy;
                if (!t) return this;
                if (e.is.string(t)) {
                    var r = t;
                    t = n.elements(r)
                }
                for (var i = [], a = 0; a < this.length; a++) i.push(this[a]);
                for (var a = 0; a < t.length; a++) {
                    var o = !this._private.ids[t[a].id()];
                    o && i.push(t[a])
                }
                return new e.Collection(n, i)
            },
            merge: function(t) {
                var n = this._private,
                    r = n.cy;
                if (!t) return this;
                if (e.is.string(t)) {
                    var i = t;
                    t = r.elements(i)
                }
                for (var a = 0; a < t.length; a++) {
                    var o = t[a],
                        s = o.id(),
                        l = !n.ids[s];
                    if (l) {
                        var u = this.length++;
                        this[u] = o, n.ids[s] = o, n.indexes[s] = u
                    }
                }
                return this
            },
            unmergeOne: function(e) {
                e = e[0];
                var t = this._private,
                    n = e.id(),
                    r = t.indexes[n];
                if (null == r) return this;
                this[r] = void 0, t.ids[n] = void 0, t.indexes[n] = void 0;
                var i = r === this.length - 1;
                if (this.length > 1 && !i) {
                    var a = this.length - 1,
                        o = this[a];
                    this[a] = void 0, this[r] = o, t.indexes[o.id()] = r
                }
                return this.length--, this
            },
            unmerge: function(t) {
                var n = this._private.cy;
                if (!t) return this;
                if (e.is.string(t)) {
                    var r = t;
                    t = n.elements(r)
                }
                for (var i = 0; i < t.length; i++) this.unmergeOne(t[i]);
                return this
            },
            map: function(e, t) {
                for (var n = [], r = this, i = 0; i < r.length; i++) {
                    var a = r[i],
                        o = t ? e.apply(t, [a, i, r]) : e(a, i, r);
                    n.push(o)
                }
                return n
            },
            stdFilter: function(t, n) {
                for (var r = [], i = this, a = this._private.cy, o = 0; o < i.length; o++) {
                    var s = i[o],
                        l = n ? t.apply(n, [s, o, i]) : t(s, o, i);
                    l && r.push(s)
                }
                return new e.Collection(a, r)
            },
            max: function(e, t) {
                for (var n, r = -(1 / 0), i = this, a = 0; a < i.length; a++) {
                    var o = i[a],
                        s = t ? e.apply(t, [o, a, i]) : e(o, a, i);
                    s > r && (r = s, n = o)
                }
                return {
                    value: r,
                    ele: n
                }
            },
            min: function(e, t) {
                for (var n, r = 1 / 0, i = this, a = 0; a < i.length; a++) {
                    var o = i[a],
                        s = t ? e.apply(t, [o, a, i]) : e(o, a, i);
                    r > s && (r = s, n = o)
                }
                return {
                    value: r,
                    ele: n
                }
            }
        });
        var t = e.elesfn;
        t.u = t["|"] = t["+"] = t.union = t.or = t.add, t["\\"] = t["!"] = t["-"] = t.difference = t.relativeComplement = t.not, t.n = t["&"] = t["."] = t.and = t.intersection = t.intersect, t["^"] = t["(+)"] = t["(-)"] = t.symmetricDifference = t.symdiff = t.xor, t.fnFilter = t.filterFn = t.stdFilter, t.complement = t.abscomp = t.absoluteComplement
    }(cytoscape),
    function(e) {
        "use strict";
        e.fn.eles({
            isNode: function() {
                return "nodes" === this.group()
            },
            isEdge: function() {
                return "edges" === this.group()
            },
            isLoop: function() {
                return this.isEdge() && this.source().id() === this.target().id()
            },
            isSimple: function() {
                return this.isEdge() && this.source().id() !== this.target().id()
            },
            group: function() {
                var e = this[0];
                return e ? e._private.group : void 0
            }
        })
    }(cytoscape),
    function(e) {
        "use strict";
        e.fn.eles({
            each: function(t) {
                if (e.is.fn(t))
                    for (var n = 0; n < this.length; n++) {
                        var r = this[n],
                            i = t.apply(r, [n, r]);
                        if (i === !1) break
                    }
                return this
            },
            forEach: function(t, n) {
                if (e.is.fn(t))
                    for (var r = 0; r < this.length; r++) {
                        var i = this[r],
                            a = n ? t.apply(n, [i, r, this]) : t(i, r, this);
                        if (a === !1) break
                    }
                return this
            },
            toArray: function() {
                for (var e = [], t = 0; t < this.length; t++) e.push(this[t]);
                return e
            },
            slice: function(t, n) {
                var r = [],
                    i = this.length;
                null == n && (n = i), null == t && (t = 0), 0 > t && (t = i + t), 0 > n && (n = i + n);
                for (var a = t; a >= 0 && n > a && i > a; a++) r.push(this[a]);
                return new e.Collection(this.cy(), r)
            },
            size: function() {
                return this.length
            },
            eq: function(t) {
                return this[t] || new e.Collection(this.cy())
            },
            first: function() {
                return this[0] || new e.Collection(this.cy())
            },
            last: function() {
                return this[this.length - 1] || new e.Collection(this.cy())
            },
            empty: function() {
                return 0 === this.length
            },
            nonempty: function() {
                return !this.empty()
            },
            sort: function(t) {
                if (!e.is.fn(t)) return this;
                var n = this.cy(),
                    r = this.toArray().sort(t);
                return new e.Collection(n, r)
            },
            sortByZIndex: function() {
                return this.sort(e.Collection.zIndexSort)
            },
            zDepth: function() {
                var e = this[0];
                if (!e) return void 0;
                var t = e._private,
                    n = t.group;
                if ("nodes" === n) {
                    var r = t.data.parent ? e.parents().size() : 0;
                    return e.isParent() ? r : Number.MAX_VALUE
                }
                var i = t.source,
                    a = t.target,
                    o = i.zDepth(),
                    s = a.zDepth();
                return Math.max(o, s, 0)
            }
        }), e.Collection.zIndexSort = function(e, t) {
            var n = e.cy(),
                r = e._private,
                i = t._private,
                a = r.style["z-index"].value - i.style["z-index"].value,
                o = 0,
                s = 0,
                l = n.hasCompoundNodes(),
                u = "nodes" === r.group,
                c = "edges" === r.group,
                d = "nodes" === i.group,
                h = "edges" === i.group;
            l && (o = e.zDepth(), s = t.zDepth());
            var p = o - s,
                f = 0 === p;
            return f ? u && h ? 1 : c && d ? -1 : 0 === a ? r.index - i.index : a : p
        }
    }(cytoscape),
    function(e) {
        "use strict";
        e.fn.eles({
            layoutPositions: function(t, n, r) {
                var i = this.nodes(),
                    a = this.cy();
                if (t.trigger({
                        type: "layoutstart",
                        layout: t
                    }), n.animate) {
                    for (var o = 0; o < i.length; o++) {
                        var s = i[o],
                            l = o === i.length - 1,
                            u = r.call(s, o, s),
                            c = s.position();
                        e.is.number(c.x) && e.is.number(c.y) || s.silentPosition({
                            x: 0,
                            y: 0
                        }), s.animate({
                            position: u
                        }, {
                            duration: n.animationDuration,
                            step: l ? function() {
                                n.fit && a.fit(n.eles, n.padding)
                            } : void 0,
                            complete: l ? function() {
                                null != n.zoom && a.zoom(n.zoom), n.pan && a.pan(n.pan), n.fit && a.fit(n.eles, n.padding), t.one("layoutstop", n.stop), t.trigger({
                                    type: "layoutstop",
                                    layout: t
                                })
                            } : void 0
                        })
                    }
                    t.one("layoutready", n.ready), t.trigger({
                        type: "layoutready",
                        layout: t
                    })
                } else i.positions(r), n.fit && a.fit(n.eles, n.padding), null != n.zoom && a.zoom(n.zoom), n.pan && a.pan(n.pan), t.one("layoutready", n.ready), t.trigger({
                    type: "layoutready",
                    layout: t
                }), t.one("layoutstop", n.stop), t.trigger({
                    type: "layoutstop",
                    layout: t
                });
                return this
            },
            layout: function(t) {
                var n = this.cy();
                return n.layout(e.util.extend({}, t, {
                    eles: this
                })), this
            },
            makeLayout: function(t) {
                var n = this.cy();
                return n.makeLayout(e.util.extend({}, t, {
                    eles: this
                }))
            }
        }), e.elesfn.createLayout = e.elesfn.makeLayout
    }(cytoscape),
    function(e) {
        "use strict";
        e.fn.eles({
            updateStyle: function(e) {
                var t = this._private.cy;
                if (!t.styleEnabled()) return this;
                if (t._private.batchingStyle) {
                    for (var n = t._private.batchStyleEles, r = 0; r < this.length; r++) {
                        var i = this[r];
                        n.ids[i._private.id] || n.push(i)
                    }
                    return this
                }
                var a = t.style();
                e = e || void 0 === e ? !0 : !1, a.apply(this);
                var o = this.updateCompoundBounds(),
                    s = o.length > 0 ? this.add(o) : this;
                return e ? s.rtrigger("style") : s.trigger("style"), this
            },
            updateMappers: function(e) {
                var t = this._private.cy,
                    n = t.style();
                if (e = e || void 0 === e ? !0 : !1, !t.styleEnabled()) return this;
                n.updateMappers(this);
                var r = this.updateCompoundBounds(),
                    i = r.length > 0 ? this.add(r) : this;
                return e ? i.rtrigger("style") : i.trigger("style"), this
            },
            renderedCss: function(e) {
                var t = this.cy();
                if (!t.styleEnabled()) return this;
                var n = this[0];
                if (n) {
                    var r = n.cy().style().getRenderedStyle(n);
                    return void 0 === e ? r : r[e]
                }
            },
            css: function(t, n) {
                var r = this.cy();
                if (!r.styleEnabled()) return this;
                var i = !1,
                    a = r.style();
                if (e.is.plainObject(t)) {
                    var o = t;
                    a.applyBypass(this, o, i);
                    var s = this.updateCompoundBounds(),
                        l = s.length > 0 ? this.add(s) : this;
                    l.rtrigger("style")
                } else if (e.is.string(t)) {
                    if (void 0 === n) {
                        var u = this[0];
                        return u ? u._private.style[t].strValue : void 0
                    }
                    a.applyBypass(this, t, n, i);
                    var s = this.updateCompoundBounds(),
                        l = s.length > 0 ? this.add(s) : this;
                    l.rtrigger("style")
                } else if (void 0 === t) {
                    var u = this[0];
                    return u ? a.getRawStyle(u) : void 0
                }
                return this
            },
            removeCss: function(e) {
                var t = this.cy();
                if (!t.styleEnabled()) return this;
                var n = !1,
                    r = t.style(),
                    i = this;
                if (void 0 === e)
                    for (var a = 0; a < i.length; a++) {
                        var o = i[a];
                        r.removeAllBypasses(o, n)
                    } else {
                        e = e.split(/\s+/);
                        for (var a = 0; a < i.length; a++) {
                            var o = i[a];
                            r.removeBypasses(o, e, n)
                        }
                    }
                var s = this.updateCompoundBounds(),
                    l = s.length > 0 ? this.add(s) : this;
                return l.rtrigger("style"), this
            },
            show: function() {
                return this.css("display", "element"), this
            },
            hide: function() {
                return this.css("display", "none"), this
            },
            visible: function() {
                var e = this.cy();
                if (!e.styleEnabled()) return !0;
                var t = this[0],
                    n = e.hasCompoundNodes();
                if (t) {
                    var r = t._private.style;
                    if ("visible" !== r.visibility.value || "element" !== r.display.value) return !1;
                    if ("nodes" === t._private.group) {
                        if (!n) return !0;
                        var i = t._private.data.parent ? t.parents() : null;
                        if (i)
                            for (var a = 0; a < i.length; a++) {
                                var o = i[a],
                                    s = o._private.style,
                                    l = s.visibility.value,
                                    u = s.display.value;
                                if ("visible" !== l || "element" !== u) return !1
                            }
                        return !0
                    }
                    var c = t._private.source,
                        d = t._private.target;
                    return c.visible() && d.visible()
                }
            },
            hidden: function() {
                var e = this[0];
                return e ? !e.visible() : void 0
            },
            effectiveOpacity: function() {
                var e = this.cy();
                if (!e.styleEnabled()) return 1;
                var t = e.hasCompoundNodes(),
                    n = this[0];
                if (n) {
                    var r = n._private,
                        i = r.style.opacity.value;
                    if (!t) return i;
                    var a = r.data.parent ? n.parents() : null;
                    if (a)
                        for (var o = 0; o < a.length; o++) {
                            var s = a[o],
                                l = s._private.style.opacity.value;
                            i = l * i
                        }
                    return i
                }
            },
            transparent: function() {
                var e = this.cy();
                if (!e.styleEnabled()) return !1;
                var t = this[0],
                    n = t.cy().hasCompoundNodes();
                return t ? n ? 0 === t.effectiveOpacity() : 0 === t._private.style.opacity.value : void 0
            },
            isFullAutoParent: function() {
                var e = this.cy();
                if (!e.styleEnabled()) return !1;
                var t = this[0];
                if (t) {
                    var n = "auto" === t._private.style.width.value,
                        r = "auto" === t._private.style.height.value;
                    return t.isParent() && n && r
                }
            },
            backgrounding: function() {
                var e = this.cy();
                if (!e.styleEnabled()) return !1;
                var t = this[0];
                return t._private.backgrounding ? !0 : !1
            }
        }), e.elesfn.bypass = e.elesfn.style = e.elesfn.css, e.elesfn.renderedStyle = e.elesfn.renderedCss, e.elesfn.removeBypass = e.elesfn.removeStyle = e.elesfn.removeCss
    }(cytoscape),
    function(e) {
        "use strict";

        function t(t) {
            return function() {
                var n = arguments,
                    r = [];
                if (2 === n.length) {
                    var i = n[0],
                        a = n[1];
                    this.bind(t.event, i, a)
                } else if (1 === n.length) {
                    var a = n[0];
                    this.bind(t.event, a)
                } else if (0 === n.length) {
                    for (var o = 0; o < this.length; o++) {
                        var s = this[o],
                            l = !t.ableField || s._private[t.ableField],
                            u = s._private[t.field] != t.value;
                        if (t.overrideAble) {
                            var c = t.overrideAble(s);
                            if (void 0 !== c && (l = c, !c)) return this
                        }
                        l && (s._private[t.field] = t.value, u && r.push(s))
                    }
                    var d = e.Collection(this.cy(), r);
                    d.updateStyle(), d.trigger(t.event)
                }
                return this
            }
        }

        function n(n) {
            e.elesfn[n.field] = function() {
                var e = this[0];
                if (e) {
                    if (n.overrideField) {
                        var t = n.overrideField(e);
                        if (void 0 !== t) return t
                    }
                    return e._private[n.field]
                }
            }, e.elesfn[n.on] = t({
                event: n.on,
                field: n.field,
                ableField: n.ableField,
                overrideAble: n.overrideAble,
                value: !0
            }), e.elesfn[n.off] = t({
                event: n.off,
                field: n.field,
                ableField: n.ableField,
                overrideAble: n.overrideAble,
                value: !1
            })
        }
        n({
            field: "locked",
            overrideField: function(e) {
                return e.cy().autolock() ? !0 : void 0
            },
            on: "lock",
            off: "unlock"
        }), n({
            field: "grabbable",
            overrideField: function(e) {
                return e.cy().autoungrabify() ? !1 : void 0
            },
            on: "grabify",
            off: "ungrabify"
        }), n({
            field: "selected",
            ableField: "selectable",
            overrideAble: function(e) {
                return e.cy().autounselectify() ? !1 : void 0
            },
            on: "select",
            off: "unselect"
        }), n({
            field: "selectable",
            overrideField: function(e) {
                return e.cy().autounselectify() ? !1 : void 0
            },
            on: "selectify",
            off: "unselectify"
        }), e.elesfn.deselect = e.elesfn.unselect, e.elesfn.grabbed = function() {
            var e = this[0];
            return e ? e._private.grabbed : void 0
        }, n({
            field: "active",
            on: "activate",
            off: "unactivate"
        }), e.elesfn.inactive = function() {
            var e = this[0];
            return e ? !e._private.active : void 0
        }
    }(cytoscape),
    function(e) {
        "use strict";

        function t(t) {
            return function(n) {
                for (var r = [], i = this._private.cy, a = 0; a < this.length; a++) {
                    var o = this[a],
                        s = o._private[t.attr];
                    s && r.push(s)
                }
                return new e.Collection(i, r, {
                    unique: !0
                }).filter(n)
            }
        }

        function n(t) {
            return function(n) {
                var r = [],
                    i = this._private.cy,
                    a = t || {};
                e.is.string(n) && (n = i.$(n));
                for (var o = this._private.ids, s = n._private.ids, l = 0; l < n.length; l++)
                    for (var u = n[l]._private.edges, c = 0; c < u.length; c++) {
                        var d = u[c],
                            h = d._private.data,
                            p = o[h.source] && s[h.target],
                            f = s[h.source] && o[h.target],
                            v = p || f;
                        if (v) {
                            if (a.thisIs) {
                                if ("source" === a.thisIs && !p) continue;
                                if ("target" === a.thisIs && !f) continue
                            }
                            r.push(d)
                        }
                    }
                return new e.Collection(i, r, {
                    unique: !0
                })
            }
        }

        function r(t) {
            var n = {
                codirected: !1
            };
            return t = e.util.extend({}, n, t),
                function(n) {
                    for (var r = this._private.cy, i = [], a = this.edges(), o = t, s = 0; s < a.length; s++)
                        for (var l = a[s], u = l.source()[0], c = u.id(), d = l.target()[0], h = d.id(), p = u._private.edges, f = 0; f < p.length; f++) {
                            var v = p[f],
                                g = v._private.data,
                                y = g.target,
                                m = g.source,
                                x = y === h && m === c,
                                b = c === y && h === m;
                            (o.codirected && x || !o.codirected && (x || b)) && i.push(v)
                        }
                    return new e.Collection(r, i, {
                        unique: !0
                    }).filter(n)
                }
        }
        e.fn.eles({
            roots: function(t) {
                for (var n = this, r = [], i = 0; i < n.length; i++) {
                    var a = n[i];
                    if (a.isNode()) {
                        var o = a.connectedEdges(function() {
                            return this.data("target") === a.id() && this.data("source") !== a.id()
                        }).length > 0;
                        o || r.push(a)
                    }
                }
                return new e.Collection(this._private.cy, r, {
                    unique: !0
                }).filter(t)
            },
            leaves: function(t) {
                for (var n = this, r = [], i = 0; i < n.length; i++) {
                    var a = n[i];
                    if (a.isNode()) {
                        var o = a.connectedEdges(function() {
                            return this.data("source") === a.id() && this.data("target") !== a.id()
                        }).length > 0;
                        o || r.push(a)
                    }
                }
                return new e.Collection(this._private.cy, r, {
                    unique: !0
                }).filter(t)
            },
            outgoers: function(t) {
                for (var n = this, r = [], i = 0; i < n.length; i++) {
                    var a = n[i],
                        o = a.id();
                    if (a.isNode())
                        for (var s = a._private.edges, l = 0; l < s.length; l++) {
                            var u = s[l],
                                c = u._private.data.source,
                                d = u._private.data.target;
                            c === o && d !== o && (r.push(u), r.push(u.target()[0]))
                        }
                }
                return new e.Collection(this._private.cy, r, {
                    unique: !0
                }).filter(t)
            },
            successors: function(t) {
                for (var n = this, r = [], i = {};;) {
                    var a = n.outgoers();
                    if (0 === a.length) break;
                    for (var o = !1, s = 0; s < a.length; s++) {
                        var l = a[s],
                            u = l.id();
                        i[u] || (i[u] = !0, r.push(l), o = !0)
                    }
                    if (!o) break;
                    n = a
                }
                return new e.Collection(this._private.cy, r, {
                    unique: !0
                }).filter(t)
            },
            incomers: function(t) {
                for (var n = this, r = [], i = 0; i < n.length; i++) {
                    var a = n[i],
                        o = a.id();
                    if (a.isNode())
                        for (var s = a._private.edges, l = 0; l < s.length; l++) {
                            var u = s[l],
                                c = u._private.data.source,
                                d = u._private.data.target;
                            d === o && c !== o && (r.push(u), r.push(u.source()[0]))
                        }
                }
                return new e.Collection(this._private.cy, r, {
                    unique: !0
                }).filter(t)
            },
            predecessors: function(t) {
                for (var n = this, r = [], i = {};;) {
                    var a = n.incomers();
                    if (0 === a.length) break;
                    for (var o = !1, s = 0; s < a.length; s++) {
                        var l = a[s],
                            u = l.id();
                        i[u] || (i[u] = !0, r.push(l), o = !0)
                    }
                    if (!o) break;
                    n = a
                }
                return new e.Collection(this._private.cy, r, {
                    unique: !0
                }).filter(t)
            }
        }), e.fn.eles({
            neighborhood: function(t) {
                for (var n = [], r = this._private.cy, i = this.nodes(), a = 0; a < i.length; a++)
                    for (var o = i[a], s = o.connectedEdges(), l = 0; l < s.length; l++) {
                        var u = s[l],
                            c = u.connectedNodes().not(o);
                        c.length > 0 && n.push(c[0]), n.push(u[0])
                    }
                return new e.Collection(r, n, {
                    unique: !0
                }).filter(t)
            },
            closedNeighborhood: function(e) {
                return this.neighborhood().add(this).filter(e)
            },
            openNeighborhood: function(e) {
                return this.neighborhood(e)
            }
        }), e.elesfn.neighbourhood = e.elesfn.neighborhood, e.elesfn.closedNeighbourhood = e.elesfn.closedNeighborhood, e.elesfn.openNeighbourhood = e.elesfn.openNeighborhood, e.fn.eles({
            source: function(e) {
                var t, n = this[0];
                return n && (t = n._private.source), t && e ? t.filter(e) : t
            },
            target: function(e) {
                var t, n = this[0];
                return n && (t = n._private.target), t && e ? t.filter(e) : t
            },
            sources: t({
                attr: "source"
            }),
            targets: t({
                attr: "target"
            })
        }), e.fn.eles({
            edgesWith: n(),
            edgesTo: n({
                thisIs: "source"
            })
        }), e.fn.eles({
            connectedEdges: function(t) {
                for (var n = [], r = this._private.cy, i = this, a = 0; a < i.length; a++) {
                    var o = i[a];
                    if (o.isNode())
                        for (var s = o._private.edges, l = 0; l < s.length; l++) {
                            var u = s[l];
                            n.push(u)
                        }
                }
                return new e.Collection(r, n, {
                    unique: !0
                }).filter(t)
            },
            connectedNodes: function(t) {
                for (var n = [], r = this._private.cy, i = this, a = 0; a < i.length; a++) {
                    var o = i[a];
                    o.isEdge() && (n.push(o.source()[0]), n.push(o.target()[0]))
                }
                return new e.Collection(r, n, {
                    unique: !0
                }).filter(t)
            },
            parallelEdges: r(),
            codirectedEdges: r({
                codirected: !0
            })
        })
    }(cytoscape),
    function(e) {
        "use strict";
        e.fn.eles({
            fit: function() {},
            center: function() {}
        })
    }(cytoscape),
    function(e) {
        "use strict";
        e.Minheap = function(t, n, r) {
            return new e.Heap(t, n, e.Heap.minHeapComparator, r)
        }, e.Maxheap = function(t, n, r) {
            return new e.Heap(t, n, e.Heap.maxHeapComparator, r)
        }, e.Heap = function(t, n, r, i) {
            if ("undefined" != typeof r && "undefined" != typeof n) {
                "undefined" == typeof i && (i = e.Heap.idFn);
                var a, o, s, l = [],
                    u = {},
                    c = [],
                    d = 0;
                for (n = this.getArgumentAsCollection(n, t), s = n.length, d = 0; s > d; d += 1) {
                    if (l.push(i.call(t, n[d], d, n)), a = n[d].id(), u.hasOwnProperty(a)) throw "ERROR: Multiple items with the same id found: " + a;
                    u[a] = d, c.push(a)
                }
                for (this._private = {
                        cy: t,
                        heap: l,
                        pointers: u,
                        elements: c,
                        comparator: r,
                        extractor: i,
                        length: s
                    }, d = Math.floor(s / 2); d >= 0; d -= 1) o = this.heapify(d);
                return o
            }
        }, e.Heap.idFn = function(e) {
            return e.id()
        }, e.Heap.minHeapComparator = function(e, t) {
            return e >= t
        }, e.Heap.maxHeapComparator = function(e, t) {
            return t >= e
        }, e.fn.heap = function(t, n) {
            for (var r in t) {
                var i = t[r];
                e.Heap.prototype[r] = i
            }
        }, e.heapfn = e.Heap.prototype, e.heapfn.size = function() {
            return this._private.length
        }, e.heapfn.getArgumentAsCollection = function(t, n) {
            var r;
            if ("undefined" == typeof n && (n = this._private.cy), e.is.elementOrCollection(t)) r = t;
            else {
                for (var i = [], a = [].concat.apply([], [t]), o = 0; o < a.length; o++) {
                    var s = a[o],
                        l = n.getElementById(s);
                    l.length > 0 && i.push(l)
                }
                r = new e.Collection(n, i)
            }
            return r
        }, e.heapfn.isHeap = function() {
            var e, t, n, r, i, a = this._private.heap,
                o = a.length,
                s = this._private.comparator;
            for (e = 0; o > e; e += 1)
                if (t = 2 * e + 1, n = t + 1, r = o > t ? s(a[t], a[e]) : !0, i = o > n ? s(a[n], a[e]) : !0, !r || !i) return !1;
            return !0
        }, e.heapfn.heapSwap = function(e, t) {
            var n = this._private.heap,
                r = this._private.pointers,
                i = this._private.elements,
                a = n[e],
                o = i[e],
                s = i[e],
                l = i[t];
            n[e] = n[t],
                i[e] = i[t], r[s] = t, r[l] = e, n[t] = a, i[t] = o
        }, e.heapfn.heapify = function(e, t) {
            var n, r, i, a, o, s, l, u = 0,
                c = !1;
            for ("undefined" == typeof t && (t = !0), n = this._private.heap, u = n.length, s = this._private.comparator, r = e; !c;) t ? (i = 2 * r + 1, a = i + 1, o = r, u > i && !s(n[i], n[o]) && (o = i), u > a && !s(n[a], n[o]) && (o = a), c = o === r, c || (this.heapSwap(o, r), r = o)) : (l = Math.floor((r - 1) / 2), o = r, c = 0 > l || s(n[o], n[l]), c || (this.heapSwap(o, l), r = l))
        }, e.heapfn.insert = function(e) {
            var t, n, r, i, a, o = this.getArgumentAsCollection(e),
                s = o.length;
            for (a = 0; s > a; a += 1) {
                if (t = o[a], n = this._private.heap.length, r = this._private.extractor(t), i = t.id(), this._private.pointers.hasOwnProperty(i)) throw "ERROR: Multiple items with the same id found: " + i;
                this._private.heap.push(r), this._private.elements.push(i), this._private.pointers[i] = n, this.heapify(n, !1)
            }
            this._private.length = this._private.heap.length
        }, e.heapfn.getValueById = function(e) {
            if (this._private.pointers.hasOwnProperty(e)) {
                var t = this._private.pointers[e];
                return this._private.heap[t]
            }
        }, e.heapfn.contains = function(e) {
            for (var t = this.getArgumentAsCollection(e), n = 0; n < t.length; n += 1) {
                var r = t[n].id();
                if (!this._private.pointers.hasOwnProperty(r)) return !1
            }
            return !0
        }, e.heapfn.top = function() {
            return this._private.length > 0 ? {
                value: this._private.heap[0],
                id: this._private.elements[0]
            } : void 0
        }, e.heapfn.pop = function() {
            if (this._private.length > 0) {
                var e, t, n, r = this.top(),
                    i = this._private.length - 1;
                return this.heapSwap(0, i), e = this._private.elements[i], t = this._private.heap[i], n = e, this._private.heap.pop(), this._private.elements.pop(), this._private.length = this._private.heap.length, this._private.pointers[n] = void 0, this.heapify(0), r
            }
        }, e.heapfn.findDirectionHeapify = function(e) {
            var t = Math.floor((e - 1) / 2),
                n = this._private.heap,
                r = 0 > t || this._private.comparator(n[e], n[t]);
            this.heapify(e, r)
        }, e.heapfn.edit = function(t, n) {
            for (var r = this.getArgumentAsCollection(t), i = 0; i < r.length; i += 1) {
                var a = r[i].id(),
                    o = this._private.pointers[a],
                    s = this._private.heap[o];
                e.is.number(n) ? this._private.heap[o] = n : e.is.fn(n) && (this._private.heap[o] = n.call(this._private.cy, s, o)), this.findDirectionHeapify(o)
            }
        }, e.heapfn.remove = function(e) {
            for (var t = this.getArgumentAsCollection(e), n = 0; n < t.length; n += 1) {
                var r, i, a, o = t[n].id(),
                    s = this._private.pointers[o],
                    l = this._private.length - 1;
                s !== l && this.heapSwap(s, l), r = this._private.elements[l], i = this._private.heap[l], a = r, this._private.heap.pop(), this._private.elements.pop(), this._private.length = this._private.heap.length, this._private.pointers[a] = void 0, this.findDirectionHeapify(s)
            }
            return i
        }
    }(cytoscape),
    function(e) {
        "use strict";

        function t(e) {
            this.options = e, this.data = {
                select: [void 0, void 0, void 0, void 0, 0],
                renderer: this,
                cy: e.cy,
                container: e.cy.container(),
                canvases: new Array(t.CANVAS_LAYERS),
                contexts: new Array(t.CANVAS_LAYERS),
                canvasNeedsRedraw: new Array(t.CANVAS_LAYERS),
                bufferCanvases: new Array(t.BUFFER_COUNT),
                bufferContexts: new Array(t.CANVAS_LAYERS)
            }, this.hoverData = {
                down: null,
                last: null,
                downTime: null,
                triggerMode: null,
                dragging: !1,
                initialPan: [null, null],
                capture: !1
            }, this.timeoutData = {
                panTimeout: null
            }, this.dragData = {
                possibleDragElements: []
            }, this.touchData = {
                start: null,
                capture: !1,
                startPosition: [null, null, null, null, null, null],
                singleTouchStartTime: null,
                singleTouchMoved: !0,
                now: [null, null, null, null, null, null],
                earlier: [null, null, null, null, null, null]
            }, this.zoomData = {
                freeToZoom: !1,
                lastPointerX: null
            }, this.redraws = 0, this.showFps = e.showFps, this.bindings = [], this.data.canvasContainer = document.createElement("div");
            var n = this.data.canvasContainer.style;
            n.position = "absolute", n.zIndex = "0", n.overflow = "hidden", this.data.container.appendChild(this.data.canvasContainer);
            for (var r = 0; r < t.CANVAS_LAYERS; r++) this.data.canvases[r] = document.createElement("canvas"), this.data.contexts[r] = this.data.canvases[r].getContext("2d"), this.data.canvases[r].style.position = "absolute", this.data.canvases[r].setAttribute("data-id", "layer" + r), this.data.canvases[r].style.zIndex = String(t.CANVAS_LAYERS - r), this.data.canvasContainer.appendChild(this.data.canvases[r]), this.data.canvasNeedsRedraw[r] = !1;
            this.data.topCanvas = this.data.canvases[0], this.data.canvases[t.NODE].setAttribute("data-id", "layer" + t.NODE + "-node"), this.data.canvases[t.SELECT_BOX].setAttribute("data-id", "layer" + t.SELECT_BOX + "-selectbox"), this.data.canvases[t.DRAG].setAttribute("data-id", "layer" + t.DRAG + "-drag");
            for (var r = 0; r < t.BUFFER_COUNT; r++) this.data.bufferCanvases[r] = document.createElement("canvas"), this.data.bufferContexts[r] = this.data.bufferCanvases[r].getContext("2d"), this.data.bufferCanvases[r].style.position = "absolute", this.data.bufferCanvases[r].setAttribute("data-id", "buffer" + r), this.data.bufferCanvases[r].style.zIndex = String(-r - 1), this.data.bufferCanvases[r].style.visibility = "hidden";
            this.hideEdgesOnViewport = e.hideEdgesOnViewport, this.hideLabelsOnViewport = e.hideLabelsOnViewport, this.textureOnViewport = e.textureOnViewport, this.wheelSensitivity = e.wheelSensitivity, this.motionBlurEnabled = e.motionBlur, this.forcedPixelRatio = e.pixelRatio, this.motionBlur = !0, this.motionBlurOpacity = e.motionBlurOpacity, this.motionBlurTransparency = 1 - this.motionBlurOpacity, this.motionBlurPxRatio = 1, this.mbPxRBlurry = 1, this.minMbLowQualFrames = 4, this.fullQualityMb = !1, this.clearedForMotionBlur = [], this.desktopTapThreshold = e.desktopTapThreshold, this.desktopTapThreshold2 = e.desktopTapThreshold * e.desktopTapThreshold, this.touchTapThreshold = e.touchTapThreshold, this.touchTapThreshold2 = e.touchTapThreshold * e.touchTapThreshold, this.tapholdDuration = 500, this.load()
        }
        t.CANVAS_LAYERS = 3, t.SELECT_BOX = 0, t.DRAG = 1, t.NODE = 2, t.BUFFER_COUNT = 3, t.TEXTURE_BUFFER = 0, t.MOTIONBLUR_BUFFER_NODE = 1, t.MOTIONBLUR_BUFFER_DRAG = 2, t.panOrBoxSelectDelay = 400;
        var n = "undefined" != typeof Path2D;
        t.usePaths = function() {
            return n
        }, t.prototype.notify = function(n) {
            var r;
            r = e.is.array(n.type) ? n.type : [n.type];
            for (var i = 0; i < r.length; i++) {
                var a = r[i];
                switch (a) {
                    case "destroy":
                        return void this.destroy();
                    case "add":
                    case "remove":
                    case "load":
                        this.updateNodesCache(), this.updateEdgesCache();
                        break;
                    case "viewport":
                        this.data.canvasNeedsRedraw[t.SELECT_BOX] = !0;
                        break;
                    case "style":
                        this.updateCachedZSortedEles()
                }("load" === a || "resize" === a) && (this.invalidateContainerClientCoordsCache(), this.matchCanvasSize(this.data.container))
            }
            this.data.canvasNeedsRedraw[t.NODE] = !0, this.data.canvasNeedsRedraw[t.DRAG] = !0, this.redraw()
        }, t.prototype.destroy = function() {
            this.destroyed = !0;
            for (var e = 0; e < this.bindings.length; e++) {
                var t = this.bindings[e],
                    n = t;
                n.target.removeEventListener(n.event, n.handler, n.useCapture)
            }
            if (this.removeObserver && this.removeObserver.disconnect(), this.labelCalcDiv) try {
                document.body.removeChild(this.labelCalcDiv)
            } catch (r) {}
        };
        for (var r in e.math) t.prototype[r] = e.math[r];
        e("renderer", "canvas", t)
    }(cytoscape),
    function(e) {
        "use strict";
        var t = e("renderer", "canvas"),
            n = t.prototype,
            r = t.arrowShapes = {};
        t.arrowShapeHeight = .3;
        var i = function(e, t, n, r, i, a, o, s) {
                var l = n - i / 2,
                    u = n + i / 2,
                    c = r - a / 2,
                    d = r + a / 2;
                return e >= l && u >= e && t >= c && d >= t
            },
            a = function(e, t, n, r, i) {
                r = -r;
                var a = e * Math.cos(r) - t * Math.sin(r),
                    o = e * Math.sin(r) + t * Math.cos(r),
                    s = a * n,
                    l = o * n,
                    u = s + i.x,
                    c = l + i.y;
                return {
                    x: u,
                    y: c
                }
            };
        r.arrow = {
            _points: [-.15, -.3, 0, 0, .15, -.3],
            collide: function(t, n, i, a, o, s, l, u) {
                var c = r.arrow._points;
                return e.math.pointInsidePolygon(t, n, c, i, a, o, s, l, u)
            },
            roughCollide: i,
            draw: function(e, t, n, i) {
                for (var o = r.arrow._points, s = 0; s < o.length / 2; s++) {
                    var l = a(o[2 * s], o[2 * s + 1], t, n, i);
                    e.lineTo(l.x, l.y)
                }
            },
            spacing: function(e) {
                return 0
            },
            gap: function(e) {
                return 2 * e._private.style.width.pxValue
            }
        }, r.triangle = r.arrow, r["triangle-backcurve"] = {
            _ctrlPt: [0, -.15],
            collide: function(t, n, i, a, o, s, l, u) {
                var c = r.triangle._points;
                return e.math.pointInsidePolygon(t, n, c, i, a, o, s, l, u)
            },
            roughCollide: i,
            draw: function(e, t, n, i) {
                for (var o, s = r.triangle._points, l = 0; l < s.length / 2; l++) {
                    var u = a(s[2 * l], s[2 * l + 1], t, n, i);
                    0 === l && (o = u), e.lineTo(u.x, u.y)
                }
                var c = this._ctrlPt,
                    d = a(c[0], c[1], t, n, i);
                e.quadraticCurveTo(d.x, d.y, o.x, o.y)
            },
            spacing: function(e) {
                return 0
            },
            gap: function(e) {
                return 2 * e._private.style.width.pxValue
            }
        }, r["triangle-tee"] = {
            _points: [-.15, -.3, 0, 0, .15, -.3, -.15, -.3],
            _pointsTee: [-.15, -.4, -.15, -.5, .15, -.5, .15, -.4],
            collide: function(t, n, i, a, o, s, l, u) {
                var c = r["triangle-tee"]._points,
                    d = r["triangle-tee"]._pointsTee,
                    h = e.math.pointInsidePolygon(t, n, d, i, a, o, s, l, u) || e.math.pointInsidePolygon(t, n, c, i, a, o, s, l, u);
                return h
            },
            roughCollide: i,
            draw: function(e, t, n, i) {
                for (var o = r["triangle-tee"]._points, s = 0; s < o.length / 2; s++) {
                    var l = a(o[2 * s], o[2 * s + 1], t, n, i);
                    e.lineTo(l.x, l.y)
                }
                var u = r["triangle-tee"]._pointsTee,
                    c = a(u[0], u[1], t, n, i);
                e.moveTo(c.x, c.y);
                for (var s = 0; s < u.length / 2; s++) {
                    var l = a(u[2 * s], u[2 * s + 1], t, n, i);
                    e.lineTo(l.x, l.y)
                }
            },
            spacing: function(e) {
                return 0
            },
            gap: function(e) {
                return 2 * e._private.style.width.pxValue
            }
        }, r["half-triangle-overshot"] = {
            _points: [0, -.25, -.5, -.25, .5, .25],
            leavePathOpen: !0,
            matchEdgeWidth: !0,
            collide: function(t, n, r, i, a, o, s, l) {
                var u = this._points;
                return e.math.pointInsidePolygon(t, n, u, r, i, a, o, s, l)
            },
            roughCollide: i,
            draw: function(e, t, n, r) {
                for (var i = this._points, o = 0; o < i.length / 2; o++) {
                    var s = a(i[2 * o], i[2 * o + 1], t, n, r);
                    e.lineTo(s.x, s.y)
                }
            },
            spacing: function(e) {
                return 0
            },
            gap: function(e) {
                return 2 * e._private.style.width.pxValue
            }
        }, r.none = {
            collide: function(e, t, n, r, i, a, o, s) {
                return !1
            },
            roughCollide: function(e, t, n, r, i, a, o, s) {
                return !1
            },
            draw: function(e) {},
            spacing: function(e) {
                return 0
            },
            gap: function(e) {
                return 0
            }
        }, r.circle = {
            _baseRadius: .15,
            collide: function(e, t, n, i, a, o, s, l) {
                if (a != o) {
                    var u = (o + l) / (a + l);
                    return t /= u, i /= u, Math.pow(n - e, 2) + Math.pow(i - t, 2) <= Math.pow((a + l) * r.circle._baseRadius, 2)
                }
                return Math.pow(n - e, 2) + Math.pow(i - t, 2) <= Math.pow((a + l) * r.circle._baseRadius, 2)
            },
            roughCollide: i,
            draw: function(e, t, n, i) {
                e.arc(i.x, i.y, r.circle._baseRadius * t, 0, 2 * Math.PI, !1)
            },
            spacing: function(e) {
                return n.getArrowWidth(e._private.style.width.pxValue) * r.circle._baseRadius
            },
            gap: function(e) {
                return 2 * e._private.style.width.pxValue
            }
        }, r.inhibitor = {
            _points: [-.25, 0, -.25, -.1, .25, -.1, .25, 0],
            collide: function(t, n, i, a, o, s, l, u) {
                var c = r.inhibitor._points;
                return e.math.pointInsidePolygon(t, n, c, i, a, o, s, l, u)
            },
            roughCollide: i,
            draw: function(e, t, n, i) {
                for (var o = r.inhibitor._points, s = 0; s < o.length / 2; s++) {
                    var l = a(o[2 * s], o[2 * s + 1], t, n, i);
                    e.lineTo(l.x, l.y)
                }
            },
            spacing: function(e) {
                return 1
            },
            gap: function(e) {
                return 1
            }
        }, r.tee = r.inhibitor, r.square = {
            _points: [-.15, 0, .15, 0, .15, -.3, -.15, -.3],
            collide: function(t, n, i, a, o, s, l, u) {
                var c = r.square._points;
                return e.math.pointInsidePolygon(t, n, c, i, a, o, s, l, u)
            },
            roughCollide: i,
            draw: function(e, t, n, i) {
                for (var o = r.square._points, s = 0; s < o.length / 2; s++) {
                    var l = a(o[2 * s], o[2 * s + 1], t, n, i);
                    e.lineTo(l.x, l.y)
                }
            },
            spacing: function(e) {
                return 0
            },
            gap: function(e) {
                return 2 * e._private.style.width.pxValue
            }
        }, r.diamond = {
            _points: [-.15, -.15, 0, -.3, .15, -.15, 0, 0],
            collide: function(t, n, i, a, o, s, l, u) {
                var c = r.diamond._points;
                return e.math.pointInsidePolygon(t, n, c, i, a, o, s, l, u)
            },
            roughCollide: i,
            draw: function(e, t, n, i) {
                for (var o = r.diamond._points, s = 0; s < o.length / 2; s++) {
                    var l = a(o[2 * s], o[2 * s + 1], t, n, i);
                    e.lineTo(l.x, l.y)
                }
            },
            spacing: function(e) {
                return 0
            },
            gap: function(e) {
                return e._private.style.width.pxValue
            }
        }
    }(cytoscape),
    function(e) {
        "use strict";
        var t = e("renderer", "canvas"),
            n = t.prototype;
        n.getCachedNodes = function() {
            var e = this.data,
                t = this.data.cy;
            return null == e.cache && (e.cache = {}), null == e.cache.cachedNodes && (e.cache.cachedNodes = t.nodes()), e.cache.cachedNodes
        }, n.updateNodesCache = function() {
            var e = this.data,
                t = this.data.cy;
            null == e.cache && (e.cache = {}), e.cache.cachedNodes = t.nodes()
        }, n.getCachedEdges = function() {
            var e = this.data,
                t = this.data.cy;
            return null == e.cache && (e.cache = {}), null == e.cache.cachedEdges && (e.cache.cachedEdges = t.edges()), e.cache.cachedEdges
        }, n.updateEdgesCache = function() {
            var e = this.data,
                t = this.data.cy;
            null == e.cache && (e.cache = {}), e.cache.cachedEdges = t.edges()
        }
    }(cytoscape),
    function(e) {
        "use strict";
        var t = e("renderer", "canvas"),
            n = t.prototype;
        n.projectIntoViewport = function(e, t) {
            var n = this.findContainerClientCoords(),
                r = n[0],
                i = n[1],
                a = e - r,
                o = t - i;
            return a -= this.data.cy.pan().x, o -= this.data.cy.pan().y, a /= this.data.cy.zoom(), o /= this.data.cy.zoom(), [a, o]
        }, n.findContainerClientCoords = function() {
            var e = this.data.container,
                t = this.containerBB = this.containerBB || e.getBoundingClientRect();
            return [t.left, t.top, t.right - t.left, t.bottom - t.top]
        }, n.invalidateContainerClientCoordsCache = function() {
            this.containerBB = null
        }, n.findNearestElement = function(n, r, i, a) {
            function o(e) {
                var a = e.outerWidth() + 2 * f,
                    o = e.outerHeight() + 2 * f,
                    s = a / 2,
                    u = o / 2,
                    d = e._private.position;
                if (d.x - s <= n && n <= d.x + s && d.y - u <= r && r <= d.y + u) {
                    var h = !i || e.visible() && !e.transparent();
                    if (i && !h) return;
                    var p = t.nodeShapes[l.getNodeShape(e)];
                    e._private.style["border-width"].pxValue / 2;
                    p.checkPoint(n, r, 0, a, o, d.x, d.y) && c.push(e)
                }
            }

            function s(a) {
                var s, u, d = a._private.rscratch,
                    f = a._private.style,
                    v = f.width.pxValue / 2 + p,
                    g = v * v,
                    y = 2 * v,
                    m = a._private.source,
                    x = a._private.target,
                    b = !1,
                    w = function() {
                        if (void 0 !== u) return u;
                        if (!i) return u = !0, !0;
                        var e = a.visible() && !a.transparent();
                        return e ? (u = !0, !0) : (u = !1, !1)
                    };
                if ("self" === d.edgeType || "compound" === d.edgeType)((b = e.math.inBezierVicinity(n, r, d.startX, d.startY, d.cp2ax, d.cp2ay, d.selfEdgeMidX, d.selfEdgeMidY, g)) && w() && g > (s = e.math.sqDistanceToQuadraticBezier(n, r, d.startX, d.startY, d.cp2ax, d.cp2ay, d.selfEdgeMidX, d.selfEdgeMidY)) || (b = e.math.inBezierVicinity(n, r, d.selfEdgeMidX, d.selfEdgeMidY, d.cp2cx, d.cp2cy, d.endX, d.endY, g)) && w() && g > (s = e.math.sqDistanceToQuadraticBezier(n, r, d.selfEdgeMidX, d.selfEdgeMidY, d.cp2cx, d.cp2cy, d.endX, d.endY))) && c.push(a);
                else if ("haystack" === d.edgeType) {
                    var _ = f["haystack-radius"].value,
                        E = _ / 2,
                        T = x._private.position,
                        S = x.width(),
                        C = x.height(),
                        k = m._private.position,
                        D = m.width(),
                        N = m.height(),
                        P = k.x + d.source.x * D * E,
                        M = k.y + d.source.y * N * E,
                        B = T.x + d.target.x * S * E,
                        L = T.y + d.target.y * C * E;
                    (b = e.math.inLineVicinity(n, r, P, M, B, L, y)) && w() && g > (s = e.math.sqDistanceToFiniteLine(n, r, P, M, B, L)) && c.push(a)
                } else "straight" === d.edgeType ? (b = e.math.inLineVicinity(n, r, d.startX, d.startY, d.endX, d.endY, y)) && w() && g > (s = e.math.sqDistanceToFiniteLine(n, r, d.startX, d.startY, d.endX, d.endY)) && c.push(a) : "bezier" === d.edgeType && (b = e.math.inBezierVicinity(n, r, d.startX, d.startY, d.cp2x, d.cp2y, d.endX, d.endY, g)) && w() && g > (s = e.math.sqDistanceToQuadraticBezier(n, r, d.startX, d.startY, d.cp2x, d.cp2y, d.endX, d.endY)) && c.push(a);
                if (b && w() && 0 === c.length || c[c.length - 1] !== a) {
                    var O = t.arrowShapes[f["source-arrow-shape"].value],
                        A = t.arrowShapes[f["target-arrow-shape"].value],
                        m = m || a._private.source,
                        x = x || a._private.target,
                        T = x._private.position,
                        k = m._private.position,
                        I = l.getArrowWidth(f.width.pxValue),
                        z = l.getArrowHeight(f.width.pxValue),
                        R = I,
                        j = z;
                    (O.roughCollide(n, r, d.arrowStartX, d.arrowStartY, I, z, [d.arrowStartX - k.x, d.arrowStartY - k.y], p) && O.collide(n, r, d.arrowStartX, d.arrowStartY, I, z, [d.arrowStartX - k.x, d.arrowStartY - k.y], p) || A.roughCollide(n, r, d.arrowEndX, d.arrowEndY, R, j, [d.arrowEndX - T.x, d.arrowEndY - T.y], p) && A.collide(n, r, d.arrowEndX, d.arrowEndY, R, j, [d.arrowEndX - T.x, d.arrowEndY - T.y], p)) && c.push(a)
                }
                h && c.length > 0 && c[c.length - 1] === a && (o(m), o(x))
            }
            for (var l = this, u = this.getCachedZSortedEles(), c = [], d = this.data.cy.zoom(), h = this.data.cy.hasCompoundNodes(), p = (a ? 24 : 8) / d, f = (a ? 8 : 2) / d, v = u.length - 1; v >= 0; v--) {
                var g = u[v];
                if (c.length > 0) break;
                "nodes" === g._private.group ? o(u[v]) : s(u[v])
            }
            return c.length > 0 ? c[c.length - 1] : null
        }, n.getAllInBox = function(n, r, i, a) {
            var o = this.getCachedNodes(),
                s = this.getCachedEdges(),
                l = [],
                u = Math.min(n, i),
                c = Math.max(n, i),
                d = Math.min(r, a),
                h = Math.max(r, a);
            n = u, i = c, r = d, a = h;
            for (var p, f = 0; f < o.length; f++) {
                var v = o[f]._private.position,
                    g = this.getNodeShape(o[f]),
                    y = this.getNodeWidth(o[f]),
                    m = this.getNodeHeight(o[f]),
                    x = o[f]._private.style["border-width"].pxValue / 2,
                    b = t.nodeShapes[g];
                b.intersectBox(n, r, i, a, y, m, v.x, v.y, x) && l.push(o[f])
            }
            for (var f = 0; f < s.length; f++) {
                var w = s[f]._private.rscratch;
                if ("self" == s[f]._private.rscratch.edgeType && ((p = e.math.boxInBezierVicinity(n, r, i, a, w.startX, w.startY, w.cp2ax, w.cp2ay, w.endX, w.endY, s[f]._private.style.width.pxValue)) && (2 == p || 1 == p && e.math.checkBezierInBox(n, r, i, a, w.startX, w.startY, w.cp2ax, w.cp2ay, w.endX, w.endY, s[f]._private.style.width.pxValue)) || (p = e.math.boxInBezierVicinity(n, r, i, a, w.startX, w.startY, w.cp2cx, w.cp2cy, w.endX, w.endY, s[f]._private.style.width.pxValue)) && (2 == p || 1 == p && e.math.checkBezierInBox(n, r, i, a, w.startX, w.startY, w.cp2cx, w.cp2cy, w.endX, w.endY, s[f]._private.style.width.pxValue))) && l.push(s[f]), "bezier" == w.edgeType && (p = e.math.boxInBezierVicinity(n, r, i, a, w.startX, w.startY, w.cp2x, w.cp2y, w.endX, w.endY, s[f]._private.style.width.pxValue)) && (2 == p || 1 == p && e.math.checkBezierInBox(n, r, i, a, w.startX, w.startY, w.cp2x, w.cp2y, w.endX, w.endY, s[f]._private.style.width.pxValue)) && l.push(s[f]), "straight" == w.edgeType && (p = e.math.boxInBezierVicinity(n, r, i, a, w.startX, w.startY, .5 * w.startX + .5 * w.endX, .5 * w.startY + .5 * w.endY, w.endX, w.endY, s[f]._private.style.width.pxValue)) && (2 == p || 1 == p && e.math.checkStraightEdgeInBox(n, r, i, a, w.startX, w.startY, w.endX, w.endY, s[f]._private.style.width.pxValue)) && l.push(s[f]), "haystack" == w.edgeType) {
                    var _ = s[f].target()[0],
                        E = _.position(),
                        T = s[f].source()[0],
                        S = T.position(),
                        C = S.x + w.source.x,
                        k = S.y + w.source.y,
                        D = E.x + w.target.x,
                        N = E.y + w.target.y,
                        P = C >= n && i >= C && k >= r && a >= k,
                        M = D >= n && i >= D && N >= r && a >= N;
                    P && M && l.push(s[f])
                }
            }
            return l
        }, n.getNodeWidth = function(e) {
            return e.width()
        }, n.getNodeHeight = function(e) {
            return e.height()
        }, n.getNodeShape = function(e) {
            var t = e._private.style.shape.value;
            return e.isParent() ? "rectangle" === t || "roundrectangle" === t ? t : "rectangle" : t
        }, n.getNodePadding = function(e) {
            var t = e._private.style["padding-left"].pxValue,
                n = e._private.style["padding-right"].pxValue,
                r = e._private.style["padding-top"].pxValue,
                i = e._private.style["padding-bottom"].pxValue;
            return isNaN(t) && (t = 0), isNaN(n) && (n = 0), isNaN(r) && (r = 0), isNaN(i) && (i = 0), {
                left: t,
                right: n,
                top: r,
                bottom: i
            }
        }, n.zOrderSort = e.Collection.zIndexSort, n.updateCachedZSortedEles = function() {
            this.getCachedZSortedEles(!0)
        }, n.getCachedZSortedEles = function(e) {
            var t = this.lastZOrderCachedNodes,
                n = this.lastZOrderCachedEdges,
                r = this.getCachedNodes(),
                i = this.getCachedEdges(),
                a = [];
            if (!e && t && n && t === r && n === i) a = this.cachedZSortedEles;
            else {
                for (var o = 0; o < r.length; o++) {
                    var s = r[o];
                    (s.animated() || s.visible() && !s.transparent()) && a.push(s)
                }
                for (var o = 0; o < i.length; o++) {
                    var l = i[o];
                    (l.animated() || l.visible() && !l.transparent()) && a.push(l)
                }
                a.sort(this.zOrderSort), this.cachedZSortedEles = a
            }
            return this.lastZOrderCachedNodes = r, this.lastZOrderCachedEdges = i, a
        }, n.projectBezier = function(t) {
            function n(e) {
                a.push({
                    x: r(e[0], e[2], e[4], .05),
                    y: r(e[1], e[3], e[5], .05)
                }), a.push({
                    x: r(e[0], e[2], e[4], .25),
                    y: r(e[1], e[3], e[5], .25)
                }), a.push({
                    x: r(e[0], e[2], e[4], .4),
                    y: r(e[1], e[3], e[5], .4)
                });
                var t = {
                    x: r(e[0], e[2], e[4], .5),
                    y: r(e[1], e[3], e[5], .5)
                };
                a.push(t), "self" === i.edgeType || "compound" === i.edgeType ? (i.midX = i.selfEdgeMidX, i.midY = i.selfEdgeMidY) : (i.midX = t.x, i.midY = t.y), a.push({
                    x: r(e[0], e[2], e[4], .6),
                    y: r(e[1], e[3], e[5], .6)
                }), a.push({
                    x: r(e[0], e[2], e[4], .75),
                    y: r(e[1], e[3], e[5], .75)
                }), a.push({
                    x: r(e[0], e[2], e[4], .95),
                    y: r(e[1], e[3], e[5], .95)
                })
            }
            var r = e.math.qbezierAt,
                i = t._private.rscratch,
                a = t._private.rstyle.bezierPts = [];
            "self" === i.edgeType ? (n([i.startX, i.startY, i.cp2ax, i.cp2ay, i.selfEdgeMidX, i.selfEdgeMidY]), n([i.selfEdgeMidX, i.selfEdgeMidY, i.cp2cx, i.cp2cy, i.endX, i.endY])) : "bezier" === i.edgeType && n([i.startX, i.startY, i.cp2x, i.cp2y, i.endX, i.endY])
        }, n.recalculateNodeLabelProjection = function(e) {
            var t = e._private.style.content.strValue;
            if (t && !t.match(/^\s+$/)) {
                var n, r, i = e.outerWidth(),
                    a = e.outerHeight(),
                    o = e._private.position,
                    s = e._private.style["text-halign"].strValue,
                    l = e._private.style["text-valign"].strValue,
                    u = e._private.rscratch,
                    c = e._private.rstyle;
                switch (s) {
                    case "left":
                        n = o.x - i / 2;
                        break;
                    case "right":
                        n = o.x + i / 2;
                        break;
                    default:
                        n = o.x
                }
                switch (l) {
                    case "top":
                        r = o.y - a / 2;
                        break;
                    case "bottom":
                        r = o.y + a / 2;
                        break;
                    default:
                        r = o.y
                }
                u.labelX = n, u.labelY = r, c.labelX = n, c.labelY = r, this.applyLabelDimensions(e)
            }
        }, n.recalculateEdgeLabelProjection = function(t) {
            var n = t._private.style.content.strValue;
            if (n && !n.match(/^\s+$/)) {
                var r, i, a, o, s = t._private,
                    l = s.rscratch,
                    u = s.rstyle;
                if ("self" == l.edgeType) a = l.selfEdgeMidX, o = l.selfEdgeMidY;
                else if ("straight" == l.edgeType) a = (l.startX + l.endX) / 2, o = (l.startY + l.endY) / 2;
                else if ("bezier" == l.edgeType) a = e.math.qbezierAt(l.startX, l.cp2x, l.endX, .5), o = e.math.qbezierAt(l.startY, l.cp2y, l.endY, .5);
                else if ("haystack" == l.edgeType) {
                    var c = l.haystackPts;
                    a = (c[0] + c[2]) / 2, o = (c[1] + c[3]) / 2
                }
                r = a, i = o, l.labelX = r, l.labelY = i, u.labelX = r, u.labelY = i, this.applyLabelDimensions(t)
            }
        }, n.applyLabelDimensions = function(e) {
            var t = e._private.rscratch,
                n = e._private.rstyle,
                r = this.getLabelText(e),
                i = this.calculateLabelDimensions(e, r);
            n.labelWidth = i.width, t.labelWidth = i.width, n.labelHeight = i.height, t.labelHeight = i.height
        }, n.getLabelText = function(e) {
            var t = e._private.style,
                n = e._private.style.content.strValue,
                r = t["text-transform"].value,
                i = e._private.rscratch;
            if ("none" == r || ("uppercase" == r ? n = n.toUpperCase() : "lowercase" == r && (n = n.toLowerCase())), "wrap" === t["text-wrap"].value) {
                if (i.labelWrapKey === i.labelKey) return i.labelWrapCachedText;
                for (var a = n.split("\n"), o = t["text-max-width"].pxValue, s = [], l = 0; l < a.length; l++) {
                    var u = a[l],
                        c = this.calculateLabelDimensions(e, u, "line=" + u),
                        d = c.width;
                    if (d > o) {
                        for (var h = u.split(/\s+/), p = "", f = 0; f < h.length; f++) {
                            var v = h[f],
                                g = 0 === p.length ? v : p + " " + v,
                                y = this.calculateLabelDimensions(e, g, "testLine=" + g),
                                m = y.width;
                            o >= m ? p += v + " " : (s.push(p), p = v + " ")
                        }
                        p.match(/^\s+$/) || s.push(p)
                    } else s.push(u)
                }
                i.labelWrapCachedLines = s, i.labelWrapCachedText = n = s.join("\n"), i.labelWrapKey = i.labelKey
            }
            return n
        }, n.calculateLabelDimensions = function(e, t, n) {
            var r = this,
                i = e._private.style,
                a = i["font-style"].strValue,
                o = i["font-size"].pxValue + "px",
                s = i["font-family"].strValue,
                l = i["font-weight"].strValue,
                u = e._private.labelKey;
            n && (u += "$@$" + n);
            var c = r.labelDimCache || (r.labelDimCache = {});
            if (c[u]) return c[u];
            var d = this.labelCalcDiv;
            d || (d = this.labelCalcDiv = document.createElement("div"), document.body.appendChild(d));
            var h = d.style;
            return h.fontFamily = s, h.fontStyle = a, h.fontSize = o, h.fontWeight = l, h.position = "absolute", h.left = "-9999px", h.top = "-9999px", h.zIndex = "-1", h.visibility = "hidden", h.pointerEvents = "none", h.padding = "0", h.lineHeight = "1", "wrap" === i["text-wrap"].value ? h.whiteSpace = "pre" : h.whiteSpace = "normal", d.textContent = t, c[u] = {
                width: d.clientWidth,
                height: d.clientHeight
            }, c[u]
        }, n.recalculateRenderedStyle = function(e) {
            for (var t = [], n = [], r = {}, i = 0; i < e.length; i++) {
                var a = e[i],
                    o = a._private,
                    s = o.style,
                    l = o.rscratch,
                    u = o.rstyle,
                    c = o.data.id,
                    d = null != l.boundingBoxKey && o.boundingBoxKey === l.boundingBoxKey,
                    h = null != l.labelKey && o.labelKey === l.labelKey,
                    p = d && h;
                if ("nodes" === a._private.group) {
                    var f = o.position,
                        v = null != u.nodeX && null != u.nodeY && f.x === u.nodeX && f.y === u.nodeY,
                        g = null != u.nodeW && u.nodeW === s.width.pxValue,
                        y = null != u.nodeH && u.nodeH === s.height.pxValue;
                    v && p && g && y || n.push(a), u.nodeX = f.x, u.nodeY = f.y, u.nodeW = s.width.pxValue, u.nodeH = s.height.pxValue
                } else {
                    var m = a._private.source._private.position,
                        x = a._private.target._private.position,
                        b = null != u.srcX && null != u.srcY && m.x === u.srcX && m.y === u.srcY,
                        w = null != u.tgtX && null != u.tgtY && x.x === u.tgtX && x.y === u.tgtY,
                        _ = b && w;
                    if (!_ || !p) {
                        var E = o.style["curve-style"].value;
                        if ("bezier" === E) {
                            if (!r[c]) {
                                t.push(a), r[c] = !0;
                                for (var T = a.parallelEdges(), i = 0; i < T.length; i++) {
                                    var S = T[i],
                                        C = S._private.data.id;
                                    r[C] || (t.push(S), r[C] = !0)
                                }
                            }
                        } else t.push(a)
                    }
                    u.srcX = m.x, u.srcY = m.y, u.tgtX = x.x, u.tgtY = x.y
                }
                l.boundingBoxKey = o.boundingBoxKey, l.labelKey = o.labelKey
            }
            this.recalculateEdgeProjections(t), this.recalculateLabelProjections(n, t)
        }, n.recalculateLabelProjections = function(e, t) {
            for (var n = 0; n < e.length; n++) this.recalculateNodeLabelProjection(e[n]);
            for (var n = 0; n < t.length; n++) this.recalculateEdgeLabelProjection(t[n])
        }, n.recalculateEdgeProjections = function(e) {
            this.findEdgeControlPoints(e)
        }, n.findEdgeControlPoints = function(n) {
            if (n && 0 !== n.length) {
                for (var r, i = this.data.cy, a = i.hasCompoundNodes(), o = {}, s = [], l = [], u = 0; u < n.length; u++) {
                    var c = n[u],
                        d = c._private.style,
                        h = "unbundled-bezier" === d["curve-style"].value;
                    if ("none" !== d.display.value)
                        if ("haystack" !== d["curve-style"].value) {
                            var p = c._private.data.source,
                                f = c._private.data.target;
                            r = p > f ? f + "-" + p : p + "-" + f, h && (r = "unbundled" + c._private.data.id), null == o[r] && (o[r] = [], s.push(r)), o[r].push(c), h && (o[r].hasUnbundled = !0)
                        } else l.push(c)
                }
                for (var v, g, y, m, x, b, w, _, E, T, S, C, k, D, N = 0; N < s.length; N++) {
                    r = s[N];
                    var P = o[r];
                    if (P.sort(function(e, t) {
                            return e._private.index - t._private.index
                        }), v = P[0]._private.source, g = P[0]._private.target, v._private.data.id > g._private.data.id) {
                        var M = v;
                        v = g, g = M
                    }
                    if (y = v._private.position, m = g._private.position, x = this.getNodeWidth(v), b = this.getNodeHeight(v), w = this.getNodeWidth(g), _ = this.getNodeHeight(g), E = t.nodeShapes[this.getNodeShape(v)], T = t.nodeShapes[this.getNodeShape(g)], S = v._private.style["border-width"].pxValue, C = g._private.style["border-width"].pxValue, D = !1, P.length > 1 && v !== g || P.hasUnbundled) {
                        var B = E.intersectLine(y.x, y.y, x, b, m.x, m.y, S / 2),
                            L = T.intersectLine(m.x, m.y, w, _, y.x, y.y, C / 2),
                            O = {
                                x1: B[0],
                                x2: L[0],
                                y1: B[1],
                                y2: L[1]
                            },
                            A = L[1] - B[1],
                            I = L[0] - B[0],
                            z = Math.sqrt(I * I + A * A),
                            R = {
                                x: I,
                                y: A
                            },
                            j = {
                                x: R.x / z,
                                y: R.y / z
                            };
                        k = {
                            x: -j.y,
                            y: j.x
                        }, (T.checkPoint(B[0], B[1], C / 2, w, _, m.x, m.y) || E.checkPoint(L[0], L[1], S / 2, x, b, y.x, y.y)) && (k = {}, D = !0)
                    }
                    for (var c, F, u = 0; u < P.length; u++) {
                        c = P[u], F = c._private.rscratch;
                        var q = F.lastEdgeIndex,
                            V = u,
                            X = F.lastNumEdges,
                            H = P.length,
                            Y = c._private.style,
                            $ = Y["control-point-step-size"].pxValue,
                            W = void 0 !== Y["control-point-distance"] ? Y["control-point-distance"].pxValue : void 0,
                            U = Y["control-point-weight"].value,
                            h = "unbundled-bezier" === Y["curve-style"].value,
                            Z = c._private.source !== v;
                        Z && h && (W *= -1);
                        var G = F.lastSrcCtlPtX,
                            K = y.x,
                            J = F.lastSrcCtlPtY,
                            Q = y.y,
                            ee = F.lastSrcCtlPtW,
                            te = v.outerWidth(),
                            ne = F.lastSrcCtlPtH,
                            re = v.outerHeight(),
                            ie = F.lastTgtCtlPtX,
                            ae = m.x,
                            oe = F.lastTgtCtlPtY,
                            se = m.y,
                            le = F.lastTgtCtlPtW,
                            ue = g.outerWidth(),
                            ce = F.lastTgtCtlPtH,
                            de = g.outerHeight(),
                            he = F.lastW,
                            pe = Y["control-point-step-size"].pxValue;
                        if (D ? F.badBezier = !0 : F.badBezier = !1, G !== K || J !== Q || ee !== te || ne !== re || ie !== ae || oe !== se || le !== ue || ce !== de || he !== pe || !(q === V && X === H || h)) {
                            if (F.lastSrcCtlPtX = K, F.lastSrcCtlPtY = Q, F.lastSrcCtlPtW = te, F.lastSrcCtlPtH = re, F.lastTgtCtlPtX = ae, F.lastTgtCtlPtY = se, F.lastTgtCtlPtW = ue, F.lastTgtCtlPtH = de, F.lastEdgeIndex = V, F.lastNumEdges = H, F.lastWidth = pe, v === g) {
                                F.edgeType = "self";
                                var fe = u,
                                    ve = $;
                                h && (fe = 0, ve = W), F.cp2ax = y.x, F.cp2ay = y.y - (1 + Math.pow(b, 1.12) / 100) * ve * (fe / 3 + 1), F.cp2cx = y.x - (1 + Math.pow(x, 1.12) / 100) * ve * (fe / 3 + 1), F.cp2cy = y.y, F.selfEdgeMidX = (F.cp2ax + F.cp2cx) / 2, F.selfEdgeMidY = (F.cp2ay + F.cp2cy) / 2
                            } else if (a && (v.isParent() || v.isChild() || g.isParent() || g.isChild()) && (v.parents().anySame(g) || g.parents().anySame(v))) {
                                F.edgeType = "compound", F.badBezier = !1;
                                var fe = u,
                                    ve = $;
                                h && (fe = 0, ve = W);
                                var ge = 50,
                                    ye = {
                                        x: y.x - x / 2,
                                        y: y.y - b / 2
                                    },
                                    me = {
                                        x: m.x - w / 2,
                                        y: m.y - _ / 2
                                    },
                                    xe = 1;
                                F.cp2ax = ye.x, F.compoundStretchA = Math.max(xe, Math.log(.01 * x)), F.cp2ay = ye.y - (1 + Math.pow(ge, 1.12) / 100) * ve * (fe / 3 + 1) * F.compoundStretchA, F.compoundStretchB = Math.max(xe, Math.log(.01 * w)), F.cp2cx = me.x - (1 + Math.pow(ge, 1.12) / 100) * ve * (fe / 3 + 1) * F.compoundStretchB, F.cp2cy = me.y, F.selfEdgeMidX = (F.cp2ax + F.cp2cx) / 2, F.selfEdgeMidY = (F.cp2ay + F.cp2cy) / 2
                            } else if (P.length % 2 !== 1 || u !== Math.floor(P.length / 2) || h) {
                                var be, we = (.5 - P.length / 2 + u) * $,
                                    _e = e.math.signum(we);
                                be = h ? W : void 0 !== W ? _e * W : void 0;
                                var Ee = void 0 !== be ? be : we,
                                    Te = 1 - U,
                                    Se = U;
                                Z && (Te = U, Se = 1 - U);
                                var Ce = {
                                    x: O.x1 * Te + O.x2 * Se,
                                    y: O.y1 * Te + O.y2 * Se
                                };
                                F.edgeType = "bezier", F.cp2x = Ce.x + k.x * Ee, F.cp2y = Ce.y + k.y * Ee
                            } else F.edgeType = "straight";
                            this.findEndpoints(c);
                            var ke = !e.is.number(F.startX) || !e.is.number(F.startY),
                                De = !e.is.number(F.arrowStartX) || !e.is.number(F.arrowStartY),
                                Ne = !e.is.number(F.endX) || !e.is.number(F.endY),
                                Pe = !e.is.number(F.arrowEndX) || !e.is.number(F.arrowEndY),
                                Me = 3,
                                Be = this.getArrowWidth(c._private.style.width.pxValue) * t.arrowShapeHeight,
                                Le = Me * Be,
                                Oe = e.math.distance({
                                    x: F.cp2x,
                                    y: F.cp2y
                                }, {
                                    x: F.startX,
                                    y: F.startY
                                }),
                                Ae = Le > Oe,
                                Ie = e.math.distance({
                                    x: F.cp2x,
                                    y: F.cp2y
                                }, {
                                    x: F.endX,
                                    y: F.endY
                                }),
                                ze = Le > Ie;
                            if ("bezier" === F.edgeType) {
                                var Re = !1;
                                if (ke || De || Ae) {
                                    Re = !0;
                                    var je = {
                                            x: F.cp2x - y.x,
                                            y: F.cp2y - y.y
                                        },
                                        Fe = Math.sqrt(je.x * je.x + je.y * je.y),
                                        qe = {
                                            x: je.x / Fe,
                                            y: je.y / Fe
                                        },
                                        Ve = Math.max(x, b),
                                        Xe = {
                                            x: F.cp2x + 2 * qe.x * Ve,
                                            y: F.cp2y + 2 * qe.y * Ve
                                        },
                                        He = E.intersectLine(y.x, y.y, x, b, Xe.x, Xe.y, S / 2);
                                    Ae ? (F.cp2x = F.cp2x + qe.x * (Le - Oe), F.cp2y = F.cp2y + qe.y * (Le - Oe)) : (F.cp2x = He[0] + qe.x * Le, F.cp2y = He[1] + qe.y * Le)
                                }
                                if (Ne || Pe || ze) {
                                    Re = !0;
                                    var je = {
                                            x: F.cp2x - m.x,
                                            y: F.cp2y - m.y
                                        },
                                        Fe = Math.sqrt(je.x * je.x + je.y * je.y),
                                        qe = {
                                            x: je.x / Fe,
                                            y: je.y / Fe
                                        },
                                        Ve = Math.max(x, b),
                                        Xe = {
                                            x: F.cp2x + 2 * qe.x * Ve,
                                            y: F.cp2y + 2 * qe.y * Ve
                                        },
                                        Ye = T.intersectLine(m.x, m.y, w, _, Xe.x, Xe.y, C / 2);
                                    ze ? (F.cp2x = F.cp2x + qe.x * (Le - Ie), F.cp2y = F.cp2y + qe.y * (Le - Ie)) : (F.cp2x = Ye[0] + qe.x * Le, F.cp2y = Ye[1] + qe.y * Le)
                                }
                                Re && this.findEndpoints(c)
                            } else "straight" === F.edgeType && (F.midX = (K + ae) / 2, F.midY = (Q + se) / 2);
                            this.projectBezier(c), this.recalculateEdgeLabelProjection(c)
                        }
                    }
                }
                for (var u = 0; u < l.length; u++) {
                    var c = l[u],
                        $e = c._private,
                        We = $e.rscratch,
                        F = We;
                    if (!We.haystack) {
                        var Ue = 2 * Math.random() * Math.PI;
                        We.source = {
                            x: Math.cos(Ue),
                            y: Math.sin(Ue)
                        };
                        var Ue = 2 * Math.random() * Math.PI;
                        We.target = {
                            x: Math.cos(Ue),
                            y: Math.sin(Ue)
                        }
                    }
                    var v = $e.source,
                        g = $e.target,
                        y = v._private.position,
                        m = g._private.position,
                        x = v.width(),
                        w = g.width(),
                        b = v.height(),
                        _ = g.height(),
                        Ve = d["haystack-radius"].value,
                        Ze = Ve / 2;
                    F.haystackPts = [F.source.x * x * Ze + y.x, F.source.y * b * Ze + y.y, F.target.x * w * Ze + m.x, F.target.y * _ * Ze + m.y], We.edgeType = "haystack", We.haystack = !0, this.recalculateEdgeLabelProjection(c)
                }
                return o
            }
        }, n.findEndpoints = function(n) {
            var r, i = n.source()[0],
                a = n.target()[0],
                o = n._private.style["target-arrow-shape"].value,
                s = n._private.style["source-arrow-shape"].value,
                l = a._private.style["border-width"].pxValue,
                u = i._private.style["border-width"].pxValue,
                c = n._private.rscratch;
            if ("self" == c.edgeType || "compound" == c.edgeType) {
                var d = [c.cp2cx, c.cp2cy];
                r = t.nodeShapes[this.getNodeShape(a)].intersectLine(a._private.position.x, a._private.position.y, this.getNodeWidth(a), this.getNodeHeight(a), d[0], d[1], l / 2);
                var h = e.math.shortenIntersection(r, d, t.arrowShapes[o].spacing(n)),
                    p = e.math.shortenIntersection(r, d, t.arrowShapes[o].gap(n));
                c.endX = p[0], c.endY = p[1], c.arrowEndX = h[0], c.arrowEndY = h[1];
                var d = [c.cp2ax, c.cp2ay];
                r = t.nodeShapes[this.getNodeShape(i)].intersectLine(i._private.position.x, i._private.position.y, this.getNodeWidth(i), this.getNodeHeight(i), d[0], d[1], u / 2);
                var f = e.math.shortenIntersection(r, d, t.arrowShapes[s].spacing(n)),
                    v = e.math.shortenIntersection(r, d, t.arrowShapes[s].gap(n));
                c.startX = v[0], c.startY = v[1], c.arrowStartX = f[0], c.arrowStartY = f[1]
            } else if ("straight" == c.edgeType) {
                r = t.nodeShapes[this.getNodeShape(a)].intersectLine(a._private.position.x, a._private.position.y, this.getNodeWidth(a), this.getNodeHeight(a), i.position().x, i.position().y, l / 2), 0 === r.length ? c.noArrowPlacement = !0 : c.noArrowPlacement = !1;
                var h = e.math.shortenIntersection(r, [i.position().x, i.position().y], t.arrowShapes[o].spacing(n)),
                    p = e.math.shortenIntersection(r, [i.position().x, i.position().y], t.arrowShapes[o].gap(n));
                c.endX = p[0], c.endY = p[1], c.arrowEndX = h[0], c.arrowEndY = h[1], r = t.nodeShapes[this.getNodeShape(i)].intersectLine(i._private.position.x, i._private.position.y, this.getNodeWidth(i), this.getNodeHeight(i), a.position().x, a.position().y, u / 2), 0 === r.length ? c.noArrowPlacement = !0 : c.noArrowPlacement = !1;
                var f = e.math.shortenIntersection(r, [a.position().x, a.position().y], t.arrowShapes[s].spacing(n)),
                    v = e.math.shortenIntersection(r, [a.position().x, a.position().y], t.arrowShapes[s].gap(n));
                c.startX = v[0], c.startY = v[1], c.arrowStartX = f[0], c.arrowStartY = f[1], e.is.number(c.startX) && e.is.number(c.startY) && e.is.number(c.endX) && e.is.number(c.endY) ? c.badLine = !1 : c.badLine = !0
            } else if ("bezier" == c.edgeType) {
                var d = [c.cp2x, c.cp2y];
                r = t.nodeShapes[this.getNodeShape(a)].intersectLine(a._private.position.x, a._private.position.y, this.getNodeWidth(a), this.getNodeHeight(a), d[0], d[1], l / 2);
                var h = e.math.shortenIntersection(r, d, t.arrowShapes[o].spacing(n)),
                    p = e.math.shortenIntersection(r, d, t.arrowShapes[o].gap(n));
                c.endX = p[0], c.endY = p[1], c.arrowEndX = h[0], c.arrowEndY = h[1], r = t.nodeShapes[this.getNodeShape(i)].intersectLine(i._private.position.x, i._private.position.y, this.getNodeWidth(i), this.getNodeHeight(i), d[0], d[1], u / 2);
                var f = e.math.shortenIntersection(r, d, t.arrowShapes[s].spacing(n)),
                    v = e.math.shortenIntersection(r, d, t.arrowShapes[s].gap(n));
                c.startX = v[0], c.startY = v[1], c.arrowStartX = f[0], c.arrowStartY = f[1]
            } else if (c.isArcEdge) return
        }, n.findEdges = function(e) {
            for (var t = this.getCachedEdges(), n = {}, r = [], i = 0; i < e.length; i++) n[e[i]._private.data.id] = e[i];
            for (var i = 0; i < t.length; i++)(n[t[i]._private.data.source] || n[t[i]._private.data.target]) && r.push(t[i]);
            return r
        }, n.getArrowWidth = n.getArrowHeight = function(e) {
            var t = this.arrowWidthCache = this.arrowWidthCache || {},
                n = t[e];
            return n ? n : (n = Math.max(Math.pow(13.37 * e, .9), 29), t[e] = n, n)
        }
    }(cytoscape),
    function(e) {
        "use strict";
        var t = e("renderer", "canvas"),
            n = t.prototype;
        n.drawEdge = function(e, n, r) {
            var i = n._private.rscratch,
                a = t.usePaths();
            if (!i.badBezier && ("bezier" !== i.edgeType && "straight" !== i.edgeType || !isNaN(i.startX))) {
                var o = n._private.style;
                if (!(o.width.pxValue <= 0)) {
                    var s = o["overlay-padding"].pxValue,
                        l = o["overlay-opacity"].value,
                        u = o["overlay-color"].value;
                    if (r) {
                        if (0 === l) return;
                        this.strokeStyle(e, u[0], u[1], u[2], l), e.lineCap = "round", "self" != n._private.rscratch.edgeType || a || (e.lineCap = "butt")
                    } else {
                        var c = o["line-color"].value;
                        this.strokeStyle(e, c[0], c[1], c[2], o.opacity.value), e.lineCap = "butt"
                    }
                    var d, h, p, f;
                    p = d = n._private.source, f = h = n._private.target;
                    var v = o.width.pxValue + (r ? 2 * s : 0),
                        g = r ? "solid" : o["line-style"].value;
                    e.lineWidth = v;
                    var y = o["shadow-blur"].pxValue,
                        m = o["shadow-opacity"].value,
                        x = o["shadow-color"].value,
                        b = o["shadow-offset-x"].pxValue,
                        w = o["shadow-offset-y"].pxValue;
                    if (this.shadowStyle(e, x, r ? 0 : m, y, b, w), "haystack" === i.edgeType) this.drawStyledEdge(n, e, i.haystackPts, g, v);
                    else if ("self" === i.edgeType || "compound" === i.edgeType) {
                        var _ = n._private.rscratch,
                            E = [_.startX, _.startY, _.cp2ax, _.cp2ay, _.selfEdgeMidX, _.selfEdgeMidY, _.selfEdgeMidX, _.selfEdgeMidY, _.cp2cx, _.cp2cy, _.endX, _.endY];
                        this.drawStyledEdge(n, e, E, g, v)
                    } else if ("straight" === i.edgeType) {
                        var T = h._private.position.x - d._private.position.x,
                            S = h._private.position.y - d._private.position.y,
                            C = i.endX - i.startX,
                            k = i.endY - i.startY;
                        if (0 > T * C + S * k) i.straightEdgeTooShort = !0;
                        else {
                            var _ = i;
                            this.drawStyledEdge(n, e, [_.startX, _.startY, _.endX, _.endY], g, v), i.straightEdgeTooShort = !1
                        }
                    } else {
                        var _ = i;
                        this.drawStyledEdge(n, e, [_.startX, _.startY, _.cp2x, _.cp2y, _.endX, _.endY], g, v)
                    }
                    "haystack" === i.edgeType ? this.drawArrowheads(e, n, r) : i.noArrowPlacement !== !0 && void 0 !== i.startX && this.drawArrowheads(e, n, r), this.shadowStyle(e, "transparent", 0)
                }
            }
        }, n.drawStyledEdge = function(e, n, r, i, a) {
            var o, s = e._private.rscratch,
                l = n,
                u = !1,
                c = t.usePaths();
            if (c) {
                for (var d = r, h = s.pathCacheKey && d.length === s.pathCacheKey.length, p = h, f = 0; p && f < d.length; f++) s.pathCacheKey[f] !== d[f] && (p = !1);
                p ? (o = n = s.pathCache, u = !0) : (o = n = new Path2D, s.pathCacheKey = d, s.pathCache = o)
            }
            if (l.setLineDash) switch (i) {
                case "dotted":
                    l.setLineDash([1, 1]);
                    break;
                case "dashed":
                    l.setLineDash([6, 3]);
                    break;
                case "solid":
                    l.setLineDash([])
            }
            u || (n.beginPath && n.beginPath(), n.moveTo(r[0], r[1]), 6 !== r.length || s.badBezier ? 12 !== r.length || s.badBezier ? 4 !== r.length || s.badLine || n.lineTo(r[2], r[3]) : (n.quadraticCurveTo(r[2], r[3], r[4], r[5]), n.quadraticCurveTo(r[8], r[9], r[10], r[11])) : n.quadraticCurveTo(r[2], r[3], r[4], r[5])), n = l, c ? n.stroke(o) : n.stroke(), n.setLineDash && n.setLineDash([])
        }, n.drawArrowheads = function(e, t, n) {
            function r(n, r, i, a, o) {
                var s = v[n + "-arrow-shape"].value;
                if ("none" !== s) {
                    var l = e.globalCompositeOperation,
                        u = "hollow" === v[n + "-arrow-fill"].value ? "both" : "filled",
                        c = v[n + "-arrow-fill"].value;
                    "half-triangle-overshot" === s && (c = "hollow", u = "hollow"), (1 !== v.opacity.value || "hollow" === c) && (e.globalCompositeOperation = "destination-out", d.fillStyle(e, 255, 255, 255, 1), d.strokeStyle(e, 255, 255, 255, 1), d.drawArrowShape(t, n, e, u, v.width.pxValue, v[n + "-arrow-shape"].value, r, i, a, o), e.globalCompositeOperation = l);
                    var h = v[n + "-arrow-color"].value;
                    d.fillStyle(e, h[0], h[1], h[2], v.opacity.value), d.strokeStyle(e, h[0], h[1], h[2], v.opacity.value), d.drawArrowShape(t, n, e, c, v.width.pxValue, v[n + "-arrow-shape"].value, r, i, a, o)
                }
            }
            if (!n) {
                var i, a, o, s, l, u, c = t._private.rscratch,
                    d = this,
                    h = "haystack" === c.edgeType,
                    p = t.source().position(),
                    f = t.target().position();
                h ? (o = c.haystackPts[0], s = c.haystackPts[1], l = c.haystackPts[2], u = c.haystackPts[3]) : (o = c.arrowStartX, s = c.arrowStartY, l = c.arrowEndX, u = c.arrowEndY);
                var v = t._private.style;
                i = o - p.x, a = s - p.y, h || isNaN(o) || isNaN(s) || isNaN(i) || isNaN(a) || r("source", o, s, i, a);
                var g = c.midX,
                    y = c.midY;
                h && (g = (o + l) / 2, y = (s + u) / 2), i = o - l, a = s - u, "self" === c.edgeType && (i = 1, a = -1), isNaN(g) || isNaN(y) || r("mid-target", g, y, i, a), i *= -1, a *= -1, isNaN(g) || isNaN(y) || r("mid-source", g, y, i, a), i = l - f.x, a = u - f.y, h || isNaN(l) || isNaN(u) || isNaN(i) || isNaN(a) || r("target", l, u, i, a)
            }
        }, n.drawArrowShape = function(e, n, r, i, a, o, s, l, u, c) {
            var d, h = t.usePaths(),
                p = e._private.rscratch,
                f = !1,
                v = r,
                g = {
                    x: s,
                    y: l
                },
                y = Math.asin(c / Math.sqrt(u * u + c * c));
            0 > u ? y += Math.PI / 2 : y = -(Math.PI / 2 + y);
            var m = this.getArrowWidth(a),
                x = t.arrowShapes[o];
            if (h) {
                var b = m + "$" + o + "$" + y + "$" + s + "$" + l;
                p.arrowPathCacheKey = p.arrowPathCacheKey || {}, p.arrowPathCache = p.arrowPathCache || {};
                var w = p.arrowPathCacheKey[n] === b;
                w ? (d = r = p.arrowPathCache[n], f = !0) : (d = r = new Path2D, p.arrowPathCacheKey[n] = b, p.arrowPathCache[n] = d)
            }
            r.beginPath && r.beginPath(), f || x.draw(r, m, y, g), !x.leavePathOpen && r.closePath && r.closePath(), r = v, ("filled" === i || "both" === i) && (h ? r.fill(d) : r.fill()), ("hollow" === i || "both" === i) && (r.lineWidth = x.matchEdgeWidth ? a : 1, r.lineJoin = "miter", h ? r.stroke(d) : r.stroke())
        }
    }(cytoscape),
    function(e) {
        "use strict";
        var t = e("renderer", "canvas"),
            n = t.prototype;
        n.getCachedImage = function(e, t) {
            var n = this,
                r = n.imageCache = n.imageCache || {};
            if (r[e] && r[e].image) return r[e].image;
            var i = r[e] = r[e] || {},
                a = i.image = new Image;
            return a.addEventListener("load", t), a.src = e, a
        }, n.safeDrawImage = function(e, n, r, i, a, o, s, l, u, c) {
            var d = this;
            try {
                e.drawImage(n, r, i, a, o, s, l, u, c)
            } catch (h) {
                d.data.canvasNeedsRedraw[t.NODE] = !0, d.data.canvasNeedsRedraw[t.DRAG] = !0, d.drawingImage = !0, d.redraw()
            }
        }, n.drawInscribedImage = function(e, n, r) {
            var i = this,
                a = r._private.position.x,
                o = r._private.position.y,
                s = r._private.style,
                l = s["background-fit"].value,
                u = s["background-position-x"],
                c = s["background-position-y"],
                d = s["background-repeat"].value,
                h = r.width(),
                p = r.height(),
                f = r._private.rscratch,
                v = s["background-clip"].value,
                g = "node" === v,
                y = s["background-image-opacity"].value,
                m = n.width,
                x = n.height;
            if (0 !== m && 0 !== x) {
                var b = s["background-width"];
                "auto" !== b.value && (m = "%" === b.units ? b.value / 100 * h : b.pxValue);
                var w = s["background-height"];
                if ("auto" !== w.value && (x = "%" === w.units ? w.value / 100 * p : w.pxValue), 0 !== m && 0 !== x) {
                    if ("contain" === l) {
                        var _ = Math.min(h / m, p / x);
                        m *= _, x *= _
                    } else if ("cover" === l) {
                        var _ = Math.max(h / m, p / x);
                        m *= _, x *= _
                    }
                    var E = a - h / 2;
                    E += "%" === u.units ? (h - m) * u.value / 100 : u.pxValue;
                    var T = o - p / 2;
                    T += "%" === c.units ? (p - x) * c.value / 100 : c.pxValue, f.pathCache && (E -= a, T -= o, a = 0, o = 0);
                    var S = e.globalAlpha;
                    if (e.globalAlpha = y, "no-repeat" === d) g && (e.save(), f.pathCache ? e.clip(f.pathCache) : (t.nodeShapes[i.getNodeShape(r)].drawPath(e, a, o, h, p), e.clip())), i.safeDrawImage(e, n, 0, 0, n.width, n.height, E, T, m, x), g && e.restore();
                    else {
                        var C = e.createPattern(n, d);
                        e.fillStyle = C, t.nodeShapes[i.getNodeShape(r)].drawPath(e, a, o, h, p), e.translate(E, T), e.fill(), e.translate(-E, -T)
                    }
                    e.globalAlpha = S
                }
            }
        }
    }(cytoscape),
    function(e) {
        "use strict";

        function t(e, t, n, r, i, a) {
            var a = a || 5;
            e.beginPath(), e.moveTo(t + a, n), e.lineTo(t + r - a, n), e.quadraticCurveTo(t + r, n, t + r, n + a), e.lineTo(t + r, n + i - a), e.quadraticCurveTo(t + r, n + i, t + r - a, n + i), e.lineTo(t + a, n + i), e.quadraticCurveTo(t, n + i, t, n + i - a), e.lineTo(t, n + a), e.quadraticCurveTo(t, n, t + a, n), e.closePath(), e.fill()
        }
        var n = e("renderer", "canvas"),
            r = n.prototype;
        r.drawEdgeText = function(t, n) {
            var r = n._private.style.content.strValue;
            if (r && !r.match(/^\s+$/) && (!this.hideEdgesOnViewport || !(this.dragData.didDrag || this.pinching || this.hoverData.dragging || this.data.wheel || this.swipePanning))) {
                var i = n._private.style["font-size"].pxValue * n.cy().zoom(),
                    a = n._private.style["min-zoomed-font-size"].pxValue;
                if (!(a > i)) {
                    t.textAlign = "center", t.textBaseline = "middle";
                    var o = n._private.rscratch;
                    if (e.is.number(o.labelX) && e.is.number(o.labelY)) {
                        var s, l, u, c = n._private.style,
                            d = "autorotate" === c["edge-text-rotation"].strValue;
                        if (d) {
                            switch (o.edgeType) {
                                case "haystack":
                                    l = o.haystackPts[2] - o.haystackPts[0], u = o.haystackPts[3] - o.haystackPts[1];
                                    break;
                                default:
                                    l = o.endX - o.startX, u = o.endY - o.startY
                            }
                            s = Math.atan(u / l), t.translate(o.labelX, o.labelY), t.rotate(s), this.drawText(t, n, 0, 0), t.rotate(-s), t.translate(-o.labelX, -o.labelY)
                        } else this.drawText(t, n, o.labelX, o.labelY)
                    }
                }
            }
        }, r.drawNodeText = function(t, n) {
            var r = n._private.style.content.strValue;
            if (r && !r.match(/^\s+$/)) {
                var i = n._private.style["font-size"].pxValue * n.cy().zoom(),
                    a = n._private.style["min-zoomed-font-size"].pxValue;
                if (!(a > i)) {
                    var o = n._private.style["text-halign"].strValue,
                        s = n._private.style["text-valign"].strValue,
                        l = n._private.rscratch;
                    if (e.is.number(l.labelX) && e.is.number(l.labelY)) {
                        switch (o) {
                            case "left":
                                t.textAlign = "right";
                                break;
                            case "right":
                                t.textAlign = "left";
                                break;
                            default:
                                t.textAlign = "center"
                        }
                        switch (s) {
                            case "top":
                                t.textBaseline = "bottom";
                                break;
                            case "bottom":
                                t.textBaseline = "top";
                                break;
                            default:
                                t.textBaseline = "middle"
                        }
                        this.drawText(t, n, l.labelX, l.labelY)
                    }
                }
            }
        }, r.getFontCache = function(e) {
            var t;
            this.fontCaches = this.fontCaches || [];
            for (var n = 0; n < this.fontCaches.length; n++)
                if (t = this.fontCaches[n], t.context === e) return t;
            return t = {
                context: e
            }, this.fontCaches.push(t), t
        }, r.setupTextStyle = function(e, t) {
            var n = t.effectiveOpacity(),
                r = t._private.style,
                i = r["font-style"].strValue,
                a = r["font-size"].pxValue + "px",
                o = r["font-family"].strValue,
                s = r["font-weight"].strValue,
                l = r["text-opacity"].value * r.opacity.value * n,
                u = r["text-outline-opacity"].value * l,
                c = r.color.value,
                d = r["text-outline-color"].value,
                h = r["text-shadow-blur"].pxValue,
                p = r["text-shadow-opacity"].value,
                f = r["text-shadow-color"].value,
                v = r["text-shadow-offset-x"].pxValue,
                g = r["text-shadow-offset-y"].pxValue,
                y = t._private.fontKey,
                m = this.getFontCache(e);
            m.key !== y && (e.font = i + " " + s + " " + a + " " + o, m.key = y);
            var x = this.getLabelText(t);
            return e.lineJoin = "round", this.fillStyle(e, c[0], c[1], c[2], l), this.strokeStyle(e, d[0], d[1], d[2], u), this.shadowStyle(e, f, p, h, v, g), x
        }, r.drawText = function(e, n, r, i) {
            var a = n._private,
                o = a.style,
                s = a.rstyle,
                l = a.rscratch,
                u = n.effectiveOpacity();
            if (0 !== u && 0 !== o["text-opacity"].value) {
                var c = this.setupTextStyle(e, n),
                    d = o["text-halign"].value,
                    h = o["text-valign"].value;
                if (n.isEdge() && (d = "center", h = "center"), null != c && !isNaN(r) && !isNaN(i)) {
                    var p = o["text-background-opacity"].value,
                        f = o["text-border-opacity"].value,
                        v = o["text-border-width"].pxValue;
                    if (p > 0 || v > 0 && f > 0) {
                        var g = 4 + v / 2;
                        n.isNode() && ("top" === h ? i -= g : "bottom" === h && (i += g), "left" === d ? r -= g : "right" === d && (r += g));
                        var y = s.labelWidth,
                            m = s.labelHeight,
                            x = r;
                        d && ("center" == d ? x -= y / 2 : "left" == d && (x -= y));
                        var b = i;
                        if (n.isNode() ? "top" == h ? b -= m : "center" == h && (b -= m / 2) : b -= m / 2, "autorotate" === o["edge-text-rotation"].strValue ? (i = 0, y += 4, x = r - y / 2, b = i - m / 2) : (x -= g, b -= g, m += 2 * g, y += 2 * g), p > 0) {
                            var w = e.fillStyle,
                                _ = o["text-background-color"].value;
                            e.fillStyle = "rgba(" + _[0] + "," + _[1] + "," + _[2] + "," + p * u + ")";
                            var E = o["text-background-shape"].strValue;
                            "roundrectangle" == E ? t(e, x, b, y, m, 2) : e.fillRect(x, b, y, m), e.fillStyle = w
                        }
                        if (v > 0 && f > 0) {
                            var T = e.strokeStyle,
                                S = e.lineWidth,
                                C = o["text-border-color"].value,
                                k = o["text-border-style"].value;
                            if (e.strokeStyle = "rgba(" + C[0] + "," + C[1] + "," + C[2] + "," + f * u + ")", e.lineWidth = v, e.setLineDash) switch (k) {
                                case "dotted":
                                    e.setLineDash([1, 1]);
                                    break;
                                case "dashed":
                                    e.setLineDash([4, 2]);
                                    break;
                                case "double":
                                    e.lineWidth = v / 4, e.setLineDash([]);
                                    break;
                                case "solid":
                                    e.setLineDash([])
                            }
                            if (e.strokeRect(x, b, y, m), "double" === k) {
                                var D = v / 2;
                                e.strokeRect(x + D, b + D, y - 2 * D, m - 2 * D)
                            }
                            e.setLineDash && e.setLineDash([]), e.lineWidth = S, e.strokeStyle = T
                        }
                    }
                    var N = 2 * o["text-outline-width"].pxValue;
                    if (N > 0 && (e.lineWidth = N), "wrap" === o["text-wrap"].value) {
                        var P = l.labelWrapCachedLines,
                            M = s.labelHeight / P.length;
                        switch (h) {
                            case "top":
                                i -= (P.length - 1) * M;
                                break;
                            case "bottom":
                                break;
                            default:
                            case "center":
                                i -= (P.length - 1) * M / 2
                        }
                        for (var B = 0; B < P.length; B++) N > 0 && e.strokeText(P[B], r, i), e.fillText(P[B], r, i), i += M
                    } else N > 0 && e.strokeText(c, r, i), e.fillText(c, r, i);
                    this.shadowStyle(e, "transparent", 0)
                }
            }
        }
    }(cytoscape),
    function(e) {
        "use strict";
        var t = e("renderer", "canvas"),
            n = t.prototype;
        n.drawNode = function(e, n, r) {
            var i, a, o = this,
                s = n._private.style,
                l = n._private.rscratch,
                u = n._private,
                c = u.position;
            if (void 0 !== c.x && void 0 !== c.y) {
                var d, h = t.usePaths(),
                    p = e,
                    f = !1,
                    v = s["overlay-padding"].pxValue,
                    g = s["overlay-opacity"].value,
                    y = s["overlay-color"].value;
                if (!r || 0 !== g) {
                    var m = n.effectiveOpacity();
                    if (0 !== m)
                        if (i = this.getNodeWidth(n), a = this.getNodeHeight(n), e.lineWidth = s["border-width"].pxValue, void 0 !== r && r) g > 0 && (this.fillStyle(e, y[0], y[1], y[2], g), t.nodeShapes.roundrectangle.drawPath(e, n._private.position.x, n._private.position.y, i + 2 * v, a + 2 * v), e.fill());
                        else {
                            var x, b = s["background-image"].value[2] || s["background-image"].value[1];
                            if (void 0 !== b) {
                                x = this.getCachedImage(b, function() {
                                    o.data.canvasNeedsRedraw[t.NODE] = !0, o.data.canvasNeedsRedraw[t.DRAG] = !0, o.drawingImage = !0, o.redraw()
                                });
                                var w = u.backgrounding;
                                u.backgrounding = !x.complete, w !== u.backgrounding && n.updateStyle(!1)
                            }
                            var _ = s["background-color"].value,
                                E = s["border-color"].value,
                                T = s["border-style"].value;
                            this.fillStyle(e, _[0], _[1], _[2], s["background-opacity"].value * m), this.strokeStyle(e, E[0], E[1], E[2], s["border-opacity"].value * m);
                            var S = s["shadow-blur"].pxValue,
                                C = s["shadow-opacity"].value,
                                k = s["shadow-color"].value,
                                D = s["shadow-offset-x"].pxValue,
                                N = s["shadow-offset-y"].pxValue;
                            if (this.shadowStyle(e, k, C, S, D, N), e.lineJoin = "miter", e.setLineDash) switch (T) {
                                case "dotted":
                                    e.setLineDash([1, 1]);
                                    break;
                                case "dashed":
                                    e.setLineDash([4, 2]);
                                    break;
                                case "solid":
                                case "double":
                                    e.setLineDash([])
                            }
                            var P = s.shape.strValue;
                            if (h) {
                                var M = P + "$" + i + "$" + a;
                                e.translate(c.x, c.y), l.pathCacheKey === M ? (d = e = l.pathCache, f = !0) : (d = e = new Path2D, l.pathCacheKey = M, l.pathCache = d)
                            }
                            if (!f) {
                                var B = c;
                                h && (B = {
                                    x: 0,
                                    y: 0
                                }), t.nodeShapes[this.getNodeShape(n)].drawPath(e, B.x, B.y, i, a)
                            }
                            e = p, h ? e.fill(d) : e.fill(), this.shadowStyle(e, "transparent", 0), void 0 !== b && x.complete && this.drawInscribedImage(e, x, n);
                            var L = s["background-blacken"].value,
                                O = s["border-width"].pxValue;
                            if (this.hasPie(n) && (this.drawPie(e, n, m), (0 !== L || 0 !== O) && (h || t.nodeShapes[this.getNodeShape(n)].drawPath(e, c.x, c.y, i, a))), L > 0 ? (this.fillStyle(e, 0, 0, 0, L), h ? e.fill(d) : e.fill()) : 0 > L && (this.fillStyle(e, 255, 255, 255, -L), h ? e.fill(d) : e.fill()), O > 0 && (h ? e.stroke(d) : e.stroke(), "double" === T)) {
                                e.lineWidth = s["border-width"].pxValue / 3;
                                var A = e.globalCompositeOperation;
                                e.globalCompositeOperation = "destination-out", h ? e.stroke(d) : e.stroke(), e.globalCompositeOperation = A
                            }
                            h && e.translate(-c.x, -c.y), e.setLineDash && e.setLineDash([])
                        }
                }
            }
        }, n.hasPie = function(e) {
            return e = e[0], e._private.hasPie
        }, n.drawPie = function(n, r, i) {
            r = r[0];
            var a = r._private,
                o = a.style,
                s = o["pie-size"],
                l = this.getNodeWidth(r),
                u = this.getNodeHeight(r),
                c = a.position.x,
                d = a.position.y,
                h = Math.min(l, u) / 2,
                p = 0,
                f = t.usePaths();
            f && (c = 0, d = 0), "%" === s.units ? h = h * s.value / 100 : void 0 !== s.pxValue && (h = s.pxValue / 2);
            for (var v = 1; v <= e.style.pieBackgroundN; v++) {
                var g = o["pie-" + v + "-background-size"].value,
                    y = o["pie-" + v + "-background-color"].value,
                    m = o["pie-" + v + "-background-opacity"].value * i,
                    x = g / 100;
                x + p > 1 && (x = 1 - p);
                var b = 1.5 * Math.PI + 2 * Math.PI * p,
                    w = 2 * Math.PI * x,
                    _ = b + w;
                0 === g || p >= 1 || p + x > 1 || (n.beginPath(), n.moveTo(c, d), n.arc(c, d, h, b, _), n.closePath(), this.fillStyle(n, y[0], y[1], y[2], m), n.fill(), p += x)
            }
        }
    }(cytoscape),
    function(e) {
        "use strict";
        var t = e("renderer", "canvas"),
            n = t,
            r = t.prototype;
        r.getPixelRatio = function() {
            var e = this.data.contexts[0];
            if (null != this.forcedPixelRatio) return this.forcedPixelRatio;
            var t = e.backingStorePixelRatio || e.webkitBackingStorePixelRatio || e.mozBackingStorePixelRatio || e.msBackingStorePixelRatio || e.oBackingStorePixelRatio || e.backingStorePixelRatio || 1;
            return (window.devicePixelRatio || 1) / t
        }, r.paintCache = function(e) {
            for (var t, n = this.paintCaches = this.paintCaches || [], r = !0, i = 0; i < n.length; i++)
                if (t = n[i], t.context === e) {
                    r = !1;
                    break
                }
            return r && (t = {
                context: e
            }, n.push(t)), t
        }, r.fillStyle = function(e, t, n, r, i) {
            e.fillStyle = "rgba(" + t + "," + n + "," + r + "," + i + ")"
        }, r.strokeStyle = function(e, t, n, r, i) {
            e.strokeStyle = "rgba(" + t + "," + n + "," + r + "," + i + ")"
        }, r.shadowStyle = function(e, t, n, r, i, a) {
            var o = this.data.cy.zoom(),
                s = this.paintCache(e);
            (0 !== s.shadowOpacity || 0 !== n) && (s.shadowOpacity = n, n > 0 ? (e.shadowBlur = r * o, e.shadowColor = "rgba(" + t[0] + "," + t[1] + "," + t[2] + "," + n + ")", e.shadowOffsetX = i * o, e.shadowOffsetY = a * o) : (e.shadowBlur = 0, e.shadowColor = "transparent"))
        }, r.matchCanvasSize = function(e) {
            var r = this.data,
                i = e.clientWidth,
                a = e.clientHeight,
                o = this.getPixelRatio(),
                s = this.motionBlurPxRatio;
            (e === this.data.bufferCanvases[n.MOTIONBLUR_BUFFER_NODE] || e === this.data.bufferCanvases[n.MOTIONBLUR_BUFFER_DRAG]) && (o = s);
            var l, u = i * o,
                c = a * o;
            if (u !== this.canvasWidth || c !== this.canvasHeight) {
                this.fontCaches = null;
                var d = r.canvasContainer;
                d.style.width = i + "px", d.style.height = a + "px";
                for (var h = 0; h < t.CANVAS_LAYERS; h++) l = r.canvases[h], (l.width !== u || l.height !== c) && (l.width = u, l.height = c, l.style.width = i + "px", l.style.height = a + "px");
                for (var h = 0; h < t.BUFFER_COUNT; h++) l = r.bufferCanvases[h], (l.width !== u || l.height !== c) && (l.width = u, l.height = c, l.style.width = i + "px", l.style.height = a + "px");
                this.textureMult = 1, 1 >= o && (l = r.bufferCanvases[t.TEXTURE_BUFFER], this.textureMult = 2, l.width = u * this.textureMult, l.height = c * this.textureMult), this.canvasWidth = u, this.canvasHeight = c
            }
        }, r.renderTo = function(e, t, n, r) {
            this.redraw({
                forcedContext: e,
                forcedZoom: t,
                forcedPan: n,
                drawAllLayers: !0,
                forcedPxRatio: r
            })
        }, r.timeToRender = function() {
            return this.redrawTotalTime / this.redrawCount
        }, t.minRedrawLimit = 1e3 / 60, t.maxRedrawLimit = 1e3, t.motionBlurDelay = 100, r.redraw = function(r) {
            function i() {
                function r(e, t, n, r, i) {
                    var a = e.globalCompositeOperation;
                    e.globalCompositeOperation = "destination-out", c.fillStyle(e, 255, 255, 255, c.motionBlurTransparency), e.fillRect(t, n, r, i), e.globalCompositeOperation = a
                }

                function i(e, t) {
                    var i, s, d, h;
                    c.clearingMotionBlur || e !== p.bufferContexts[n.MOTIONBLUR_BUFFER_NODE] && e !== p.bufferContexts[n.MOTIONBLUR_BUFFER_DRAG] ? (i = k, s = S, d = c.canvasWidth, h = c.canvasHeight) : (i = {
                        x: C.x * y,
                        y: C.y * y
                    }, s = T * y, d = c.canvasWidth * y, h = c.canvasHeight * y), e.setTransform(1, 0, 0, 1, 0, 0), "motionBlur" === t ? r(e, 0, 0, d, h) : a || void 0 !== t && !t || e.clearRect(0, 0, d, h), o || (e.translate(i.x, i.y), e.scale(s, s)), u && e.translate(u.x, u.y), l && e.scale(l, l)
                }

                function b(e, t) {
                    for (var n = e.eles, r = 0; r < n.length; r++) {
                        var i = n[r];
                        i.isNode() ? (c.drawNode(t, i), q || c.drawNodeText(t, i), c.drawNode(t, i, !0)) : F || (c.drawEdge(t, i), q || c.drawEdgeText(t, i), c.drawEdge(t, i, !0))
                    }
                }
                c.textureDrawLastFrame && !v && (f[n.NODE] = !0, f[n.SELECT_BOX] = !0);
                var _ = c.getCachedEdges(),
                    E = h.style()._private.coreStyle,
                    T = h.zoom(),
                    S = void 0 !== l ? l : T,
                    C = h.pan(),
                    k = {
                        x: C.x,
                        y: C.y
                    },
                    N = {
                        zoom: T,
                        pan: {
                            x: C.x,
                            y: C.y
                        }
                    },
                    P = c.prevViewport,
                    M = void 0 === P || N.zoom !== P.zoom || N.pan.x !== P.pan.x || N.pan.y !== P.pan.y;
                M || x && !m || (c.motionBlurPxRatio = 1), u && (k = u), S *= d, k.x *= d, k.y *= d;
                var B = {
                    drag: {
                        nodes: [],
                        edges: [],
                        eles: []
                    },
                    nondrag: {
                        nodes: [],
                        edges: [],
                        eles: []
                    }
                };
                if (v || (c.textureDrawLastFrame = !1), v) {
                    c.textureDrawLastFrame = !0;
                    var L;
                    if (!c.textureCache) {
                        c.textureCache = {}, L = c.textureCache.bb = h.elements().boundingBox(), c.textureCache.texture = c.data.bufferCanvases[t.TEXTURE_BUFFER];
                        var O = c.data.bufferContexts[t.TEXTURE_BUFFER];
                        O.setTransform(1, 0, 0, 1, 0, 0), O.clearRect(0, 0, c.canvasWidth * c.textureMult, c.canvasHeight * c.textureMult), c.redraw({
                            forcedContext: O,
                            drawOnlyNodeLayer: !0,
                            forcedPxRatio: d * c.textureMult
                        });
                        var N = c.textureCache.viewport = {
                            zoom: h.zoom(),
                            pan: h.pan(),
                            width: c.canvasWidth,
                            height: c.canvasHeight
                        };
                        N.mpan = {
                            x: (0 - N.pan.x) / N.zoom,
                            y: (0 - N.pan.y) / N.zoom
                        }
                    }
                    f[n.DRAG] = !1, f[n.NODE] = !1;
                    var A = p.contexts[n.NODE],
                        I = c.textureCache.texture,
                        N = c.textureCache.viewport;
                    L = c.textureCache.bb, A.setTransform(1, 0, 0, 1, 0, 0), g ? r(A, 0, 0, N.width, N.height) : A.clearRect(0, 0, N.width, N.height);
                    var z = E["outside-texture-bg-color"].value,
                        R = E["outside-texture-bg-opacity"].value;
                    c.fillStyle(A, z[0], z[1], z[2], R), A.fillRect(0, 0, N.width, N.height);
                    var T = h.zoom();
                    i(A, !1), A.clearRect(N.mpan.x, N.mpan.y, N.width / N.zoom / d, N.height / N.zoom / d), A.drawImage(I, N.mpan.x, N.mpan.y, N.width / N.zoom / d, N.height / N.zoom / d)
                } else c.textureOnViewport && !a && (c.textureCache = null);
                var j = c.pinching || c.hoverData.dragging || c.swipePanning || c.data.wheelZooming || c.hoverData.draggingEles,
                    F = c.hideEdgesOnViewport && j,
                    q = c.hideLabelsOnViewport && j;
                if (f[n.DRAG] || f[n.NODE] || o || s) {
                    F || c.findEdgeControlPoints(_);
                    for (var V = c.getCachedZSortedEles(), X = h.extent(), H = 0; H < V.length; H++) {
                        var Y, $ = V[H],
                            L = a ? null : $.boundingBox(),
                            W = a ? !0 : e.math.boundingBoxesIntersect(X, L);
                        W && (Y = $._private.rscratch.inDragLayer ? B.drag : B.nondrag, Y.eles.push($))
                    }
                }
                var U = [];
                if (U[n.NODE] = !f[n.NODE] && g && !c.clearedForMotionBlur[n.NODE] || c.clearingMotionBlur, U[n.NODE] && (c.clearedForMotionBlur[n.NODE] = !0), U[n.DRAG] = !f[n.DRAG] && g && !c.clearedForMotionBlur[n.DRAG] || c.clearingMotionBlur, U[n.DRAG] && (c.clearedForMotionBlur[n.DRAG] = !0), f[n.NODE] || o || s || U[n.NODE]) {
                    var Z = g && !U[n.NODE] && 1 !== y,
                        A = a || (Z ? c.data.bufferContexts[n.MOTIONBLUR_BUFFER_NODE] : p.contexts[n.NODE]),
                        G = g && !Z ? "motionBlur" : void 0;
                    i(A, G), b(B.nondrag, A), o || g || (f[n.NODE] = !1)
                }
                if (!s && (f[n.DRAG] || o || U[n.DRAG])) {
                    var Z = g && !U[n.DRAG] && 1 !== y,
                        A = a || (Z ? c.data.bufferContexts[n.MOTIONBLUR_BUFFER_DRAG] : p.contexts[n.DRAG]);
                    i(A, g && !Z ? "motionBlur" : void 0), b(B.drag, A), o || g || (f[n.DRAG] = !1)
                }
                if (c.showFps || !s && f[n.SELECT_BOX] && !o) {
                    var A = a || p.contexts[n.SELECT_BOX];
                    if (i(A), 1 == p.select[4] && (c.hoverData.selecting || c.touchData.selecting)) {
                        var T = p.cy.zoom(),
                            K = E["selection-box-border-width"].value / T;
                        A.lineWidth = K, A.fillStyle = "rgba(" + E["selection-box-color"].value[0] + "," + E["selection-box-color"].value[1] + "," + E["selection-box-color"].value[2] + "," + E["selection-box-opacity"].value + ")", A.fillRect(p.select[0], p.select[1], p.select[2] - p.select[0], p.select[3] - p.select[1]), K > 0 && (A.strokeStyle = "rgba(" + E["selection-box-border-color"].value[0] + "," + E["selection-box-border-color"].value[1] + "," + E["selection-box-border-color"].value[2] + "," + E["selection-box-opacity"].value + ")", A.strokeRect(p.select[0], p.select[1], p.select[2] - p.select[0], p.select[3] - p.select[1]))
                    }
                    if (p.bgActivePosistion && !c.hoverData.selecting) {
                        var T = p.cy.zoom(),
                            J = p.bgActivePosistion;
                        A.fillStyle = "rgba(" + E["active-bg-color"].value[0] + "," + E["active-bg-color"].value[1] + "," + E["active-bg-color"].value[2] + "," + E["active-bg-opacity"].value + ")", A.beginPath(), A.arc(J.x, J.y, E["active-bg-size"].pxValue / T, 0, 2 * Math.PI), A.fill()
                    }
                    var Q = c.averageRedrawTime;
                    if (c.showFps && Q) {
                        Q = Math.round(Q);
                        var ee = Math.round(1e3 / Q);
                        A.setTransform(1, 0, 0, 1, 0, 0), A.fillStyle = "rgba(255, 0, 0, 0.75)", A.strokeStyle = "rgba(255, 0, 0, 0.75)", A.lineWidth = 1, A.fillText("1 frame = " + Q + " ms = " + ee + " fps", 0, 20);
                        var te = 60;
                        A.strokeRect(0, 30, 250, 20), A.fillRect(0, 30, 250 * Math.min(ee / te, 1), 20)
                    }
                    o || (f[n.SELECT_BOX] = !1)
                }
                if (g && 1 !== y) {
                    var ne = p.contexts[n.NODE],
                        re = c.data.bufferCanvases[n.MOTIONBLUR_BUFFER_NODE],
                        ie = p.contexts[n.DRAG],
                        ae = c.data.bufferCanvases[n.MOTIONBLUR_BUFFER_DRAG],
                        oe = function(e, t, n) {
                            e.setTransform(1, 0, 0, 1, 0, 0), n || !w ? e.clearRect(0, 0, c.canvasWidth, c.canvasHeight) : r(e, 0, 0, c.canvasWidth, c.canvasHeight);
                            var i = y;
                            e.drawImage(t, 0, 0, c.canvasWidth * i, c.canvasHeight * i, 0, 0, c.canvasWidth, c.canvasHeight)
                        };
                    (f[n.NODE] || U[n.NODE]) && (oe(ne, re, U[n.NODE]), f[n.NODE] = !1), (f[n.DRAG] || U[n.DRAG]) && (oe(ie, ae, U[n.DRAG]), f[n.DRAG] = !1)
                }
                var se = Date.now();
                void 0 === c.averageRedrawTime && (c.averageRedrawTime = se - D), void 0 === c.redrawCount && (c.redrawCount = 0), c.redrawCount++, void 0 === c.redrawTotalTime && (c.redrawTotalTime = 0), c.redrawTotalTime += se - D, c.lastRedrawTime = se - D, c.averageRedrawTime = c.averageRedrawTime / 2 + (se - D) / 2, c.currentlyDrawing = !1, c.prevViewport = N, c.clearingMotionBlur && (c.clearingMotionBlur = !1, c.motionBlurCleared = !0, c.motionBlur = !0), g && (c.motionBlurTimeout = setTimeout(function() {
                    c.motionBlurTimeout = null, c.clearedForMotionBlur[n.NODE] = !1, c.clearedForMotionBlur[n.DRAG] = !1, c.motionBlur = !1, c.clearingMotionBlur = !v, c.mbFrames = 0, f[n.NODE] = !0, f[n.DRAG] = !0, c.redraw()
                }, t.motionBlurDelay)), c.drawingImage = !1
            }
            r = r || {};
            var a = r.forcedContext,
                o = r.drawAllLayers,
                s = r.drawOnlyNodeLayer,
                l = r.forcedZoom,
                u = r.forcedPan,
                c = this,
                d = void 0 === r.forcedPxRatio ? this.getPixelRatio() : r.forcedPxRatio,
                h = c.data.cy,
                p = c.data,
                f = p.canvasNeedsRedraw,
                v = c.textureOnViewport && !a && (c.pinching || c.hoverData.dragging || c.swipePanning || c.data.wheelZooming),
                g = void 0 !== r.motionBlur ? r.motionBlur : c.motionBlur,
                y = c.motionBlurPxRatio,
                m = h.hasCompoundNodes(),
                x = c.hoverData.draggingEles,
                b = c.hoverData.selecting || c.touchData.selecting ? !0 : !1;
            g = g && !a && c.motionBlurEnabled && !b;
            var w = g;
            !a && c.motionBlurTimeout && clearTimeout(c.motionBlurTimeout), !a && this.redrawTimeout && clearTimeout(this.redrawTimeout), this.redrawTimeout = null, void 0 === this.averageRedrawTime && (this.averageRedrawTime = 0);
            var _ = t.minRedrawLimit,
                E = t.maxRedrawLimit,
                T = this.averageRedrawTime;
            T = _ > T ? _ : T, T = E > T ? T : E, void 0 === this.lastDrawTime && (this.lastDrawTime = 0);
            var S = Date.now(),
                C = S - this.lastDrawTime,
                k = C >= T;
            if (!a && !c.clearingMotionBlur) {
                if (!k || this.currentlyDrawing) return void(this.redrawTimeout = setTimeout(function() {
                    c.redraw()
                }, T));
                this.lastDrawTime = S, this.currentlyDrawing = !0
            }
            g && (null == c.mbFrames && (c.mbFrames = 0), c.drawingImage || c.mbFrames++, c.mbFrames < 3 && (w = !1), c.mbFrames > c.minMbLowQualFrames && (c.motionBlurPxRatio = c.mbPxRBlurry)), c.clearingMotionBlur && (c.motionBlurPxRatio = 1);
            var D = Date.now();
            a ? i() : e.util.requestAnimationFrame(i), a || c.initrender || (c.initrender = !0, h.trigger("initrender")), a || h.triggerOnRender()
        }
    }(cytoscape),
    function(e) {
        "use strict";
        var t = e("renderer", "canvas"),
            n = t.prototype;
        n.drawPolygonPath = function(e, t, n, r, i, a) {
            var o = r / 2,
                s = i / 2;
            e.beginPath && e.beginPath(), e.moveTo(t + o * a[0], n + s * a[1]);
            for (var l = 1; l < a.length / 2; l++) e.lineTo(t + o * a[2 * l], n + s * a[2 * l + 1]);
            e.closePath()
        }, n.drawPolygon = function(e, t, n, r, i, a) {
            this.drawPolygonPath(e, t, n, r, i, a), e.fill()
        }, n.drawRoundRectanglePath = function(t, n, r, i, a, o) {
            var s = i / 2,
                l = a / 2,
                u = e.math.getRoundRectangleRadius(i, a);
            t.beginPath && t.beginPath(), t.moveTo(n, r - l), t.arcTo(n + s, r - l, n + s, r, u), t.arcTo(n + s, r + l, n, r + l, u), t.arcTo(n - s, r + l, n - s, r, u), t.arcTo(n - s, r - l, n, r - l, u), t.lineTo(n, r - l), t.closePath()
        }, n.drawRoundRectangle = function(e, t, n, r, i, a) {
            this.drawRoundRectanglePath(e, t, n, r, i, a), e.fill()
        }
    }(cytoscape),
    function(e) {
        "use strict";
        var t = e("renderer", "canvas"),
            n = t.prototype;
        n.createBuffer = function(e, t) {
            var n = document.createElement("canvas");
            return n.width = e, n.height = t, [n, n.getContext("2d")]
        }, n.bufferCanvasImage = function(t) {
            var n = this.data,
                r = n.cy,
                i = r.elements().boundingBox(),
                a = t.full ? Math.ceil(i.w) : this.data.container.clientWidth,
                o = t.full ? Math.ceil(i.h) : this.data.container.clientHeight,
                s = 1;
            if (void 0 !== t.scale) a *= t.scale, o *= t.scale, s = t.scale;
            else if (e.is.number(t.maxWidth) || e.is.number(t.maxHeight)) {
                var l = 1 / 0,
                    u = 1 / 0;
                e.is.number(t.maxWidth) && (l = s * t.maxWidth / a), e.is.number(t.maxHeight) && (u = s * t.maxHeight / o), s = Math.min(l, u), a *= s, o *= s
            }
            var c = document.createElement("canvas");
            c.width = a, c.height = o, c.style.width = a + "px", c.style.height = o + "px";
            var d = c.getContext("2d");
            if (a > 0 && o > 0)
                if (d.clearRect(0, 0, a, o), t.bg && (d.fillStyle = t.bg, d.rect(0, 0, a, o), d.fill()), d.globalCompositeOperation = "source-over", t.full) this.redraw({
                    forcedContext: d,
                    drawAllLayers: !0,
                    forcedZoom: s,
                    forcedPan: {
                        x: -i.x1 * s,
                        y: -i.y1 * s
                    },
                    forcedPxRatio: 1
                });
                else {
                    var h = r.pan(),
                        p = {
                            x: h.x * s,
                            y: h.y * s
                        },
                        f = r.zoom() * s;
                    this.redraw({
                        forcedContext: d,
                        drawAllLayers: !0,
                        forcedZoom: f,
                        forcedPan: p,
                        forcedPxRatio: 1
                    })
                }
            return c
        }, n.png = function(e) {
            return this.bufferCanvasImage(e).toDataURL("image/png")
        }, n.jpg = function(e) {
            return this.bufferCanvasImage(e).toDataURL("image/jpeg")
        }
    }(cytoscape),
    function(e) {
        "use strict";
        var t = e("renderer", "canvas"),
            n = t,
            r = n.prototype;
        r.registerBinding = function(e, t, n, r) {
            this.bindings.push({
                target: e,
                event: t,
                handler: n,
                useCapture: r
            }), e.addEventListener(t, n, r)
        }, r.nodeIsDraggable = function(e) {
            return 0 !== e._private.style.opacity.value && "visible" == e._private.style.visibility.value && "element" == e._private.style.display.value && !e.locked() && e.grabbable() ? !0 : !1
        }, r.load = function() {
            var t = this,
                r = function(e) {
                    var n;
                    if (e.addToList && t.data.cy.hasCompoundNodes()) {
                        if (!e.addToList.hasId) {
                            e.addToList.hasId = {};
                            for (var r = 0; r < e.addToList.length; r++) {
                                var i = e.addToList[r];
                                e.addToList.hasId[i.id()] = !0
                            }
                        }
                        n = e.addToList.hasId
                    }
                    return n || {}
                },
                i = function(e, t) {
                    if (e._private.cy.hasCompoundNodes() && (null != t.inDragLayer || null != t.addToList))
                        for (var n = r(t), i = e.descendants(), a = 0; a < i.size(); a++) {
                            var o = i[a],
                                s = o._private;
                            t.inDragLayer && (s.rscratch.inDragLayer = !0), t.addToList && !n[o.id()] && (t.addToList.push(o), n[o.id()] = !0, s.grabbed = !0);
                            for (var l = s.edges, u = 0; t.inDragLayer && u < l.length; u++) l[u]._private.rscratch.inDragLayer = !0
                        }
                },
                a = function(e, t) {
                    var n = e._private,
                        a = r(t);
                    t.inDragLayer && (n.rscratch.inDragLayer = !0), t.addToList && !a[e.id()] && (t.addToList.push(e), a[e.id()] = !0, n.grabbed = !0);
                    for (var o = n.edges, l = 0; t.inDragLayer && l < o.length; l++) o[l]._private.rscratch.inDragLayer = !0;
                    i(e, t), s(e, {
                        inDragLayer: t.inDragLayer
                    })
                },
                o = function(e) {
                    if (e)
                        for (var t = 0; t < e.length; t++) {
                            var n = e[t]._private;
                            if ("nodes" === n.group) {
                                n.rscratch.inDragLayer = !1, n.grabbed = !1;
                                for (var r = n.edges, i = 0; i < r.length; i++) r[i]._private.rscratch.inDragLayer = !1;
                                s(e[t], {
                                    inDragLayer: !1
                                })
                            } else "edges" === n.group && (n.rscratch.inDragLayer = !1)
                        }
                },
                s = function(e, t) {
                    if (null != t.inDragLayer || null != t.addToList) {
                        var n = e;
                        if (e._private.cy.hasCompoundNodes()) {
                            for (; n.parent().nonempty();) n = n.parent()[0];
                            if (n != e) {
                                for (var i = n.descendants().merge(n).unmerge(e).unmerge(e.descendants()), a = i.connectedEdges(), o = r(t), s = 0; s < i.size(); s++) void 0 !== t.inDragLayer && (i[s]._private.rscratch.inDragLayer = t.inDragLayer), t.addToList && !o[i[s].id()] && (t.addToList.push(i[s]), o[i[s].id()] = !0, i[s]._private.grabbed = !0);
                                for (var l = 0; void 0 !== t.inDragLayer && l < a.length; l++) a[l]._private.rscratch.inDragLayer = t.inDragLayer
                            }
                        }
                    }
                };
            "undefined" != typeof MutationObserver ? (t.removeObserver = new MutationObserver(function(e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n],
                        i = r.removedNodes;
                    if (i)
                        for (var a = 0; a < i.length; a++) {
                            var o = i[a];
                            if (o === t.data.container) {
                                t.destroy();
                                break
                            }
                        }
                }
            }), t.removeObserver.observe(t.data.container.parentNode, {
                childList: !0
            })) : t.registerBinding(t.data.container, "DOMNodeRemoved", function(e) {
                t.destroy()
            }), t.registerBinding(window, "resize", e.util.debounce(function(e) {
                t.invalidateContainerClientCoordsCache(), t.matchCanvasSize(t.data.container), t.data.canvasNeedsRedraw[n.NODE] = !0, t.redraw()
            }, 100));
            for (var l = function(e) {
                    t.registerBinding(e, "scroll", function(e) {
                        t.invalidateContainerClientCoordsCache()
                    })
                }, u = t.data.cy.container(); l(u), u.parentNode;) u = u.parentNode;
            t.registerBinding(t.data.container, "contextmenu", function(e) {
                e.preventDefault()
            });
            var c = function() {
                return 0 !== t.data.select[4]
            };
            t.registerBinding(t.data.container, "mousedown", function(r) {
                r.preventDefault(), t.hoverData.capture = !0, t.hoverData.which = r.which;
                var i = t.data.cy,
                    o = t.projectIntoViewport(r.clientX, r.clientY),
                    s = t.data.select,
                    l = t.findNearestElement(o[0], o[1], !0, !1),
                    u = t.dragData.possibleDragElements;
                t.hoverData.mdownPos = o;
                var c = t.data.canvasNeedsRedraw,
                    d = function() {
                        t.hoverData.tapholdCancelled = !1, clearTimeout(t.hoverData.tapholdTimeout), t.hoverData.tapholdTimeout = setTimeout(function() {
                            if (!t.hoverData.tapholdCancelled) {
                                var n = t.hoverData.down;
                                n ? n.trigger(new e.Event(r, {
                                    type: "taphold",
                                    cyPosition: {
                                        x: o[0],
                                        y: o[1]
                                    }
                                })) : i.trigger(new e.Event(r, {
                                    type: "taphold",
                                    cyPosition: {
                                        x: o[0],
                                        y: o[1]
                                    }
                                }))
                            }
                        }, t.tapholdDuration)
                    };
                if (3 == r.which) {
                    t.hoverData.cxtStarted = !0;
                    var h = new e.Event(r, {
                        type: "cxttapstart",
                        cyPosition: {
                            x: o[0],
                            y: o[1]
                        }
                    });
                    l ? (l.activate(), l.trigger(h), t.hoverData.down = l) : i.trigger(h), t.hoverData.downTime = (new Date).getTime(), t.hoverData.cxtDragged = !1
                } else if (1 == r.which) {
                    if (l && l.activate(), null != l) {
                        if (t.nodeIsDraggable(l)) {
                            var p = new e.Event(r, {
                                type: "grab",
                                cyPosition: {
                                    x: o[0],
                                    y: o[1]
                                }
                            });
                            if (l.isNode() && !l.selected()) u = t.dragData.possibleDragElements = [], a(l, {
                                addToList: u
                            }), l.trigger(p);
                            else if (l.isNode() && l.selected()) {
                                u = t.dragData.possibleDragElements = [];
                                for (var f = i.$(function() {
                                        return this.isNode() && this.selected()
                                    }), v = 0; v < f.length; v++) t.nodeIsDraggable(f[v]) && a(f[v], {
                                    addToList: u
                                });
                                l.trigger(p)
                            }
                            c[n.NODE] = !0, c[n.DRAG] = !0
                        }
                        l.trigger(new e.Event(r, {
                            type: "mousedown",
                            cyPosition: {
                                x: o[0],
                                y: o[1]
                            }
                        })).trigger(new e.Event(r, {
                            type: "tapstart",
                            cyPosition: {
                                x: o[0],
                                y: o[1]
                            }
                        })).trigger(new e.Event(r, {
                            type: "vmousedown",
                            cyPosition: {
                                x: o[0],
                                y: o[1]
                            }
                        }))
                    } else null == l && i.trigger(new e.Event(r, {
                        type: "mousedown",
                        cyPosition: {
                            x: o[0],
                            y: o[1]
                        }
                    })).trigger(new e.Event(r, {
                        type: "tapstart",
                        cyPosition: {
                            x: o[0],
                            y: o[1]
                        }
                    })).trigger(new e.Event(r, {
                        type: "vmousedown",
                        cyPosition: {
                            x: o[0],
                            y: o[1]
                        }
                    }));
                    if (t.hoverData.down = l, t.hoverData.downTime = (new Date).getTime(), null == l || l.isEdge()) {
                        s[4] = 1;
                        var g = Math.max(0, n.panOrBoxSelectDelay - (+new Date - t.hoverData.downTime));
                        clearTimeout(t.bgActiveTimeout), i.boxSelectionEnabled() || l && l.isEdge() ? t.bgActiveTimeout = setTimeout(function() {
                            l && l.unactivate(), t.data.bgActivePosistion = {
                                x: o[0],
                                y: o[1]
                            }, t.hoverData.dragging = !0, c[n.SELECT_BOX] = !0, t.redraw()
                        }, g) : (t.data.bgActivePosistion = {
                            x: o[0],
                            y: o[1]
                        }, c[n.SELECT_BOX] = !0, t.redraw())
                    }
                    d()
                }
                s[0] = s[2] = o[0], s[1] = s[3] = o[1]
            }, !1), t.registerBinding(window, "mousemove", e.util.throttle(function(r) {
                var i = !1,
                    o = t.hoverData.capture;
                if (!o) {
                    var s = t.findContainerClientCoords();
                    if (!(r.clientX > s[0] && r.clientX < s[0] + t.canvasWidth && r.clientY > s[1] && r.clientY < s[1] + t.canvasHeight)) return;
                    for (var l = t.data.container, u = r.target, c = u.parentNode, d = !1; c;) {
                        if (c === l) {
                            d = !0;
                            break
                        }
                        c = c.parentNode
                    }
                    if (!d) return
                }
                var h = t.data.cy,
                    p = h.zoom(),
                    f = t.projectIntoViewport(r.clientX, r.clientY),
                    v = t.data.select,
                    g = t.data.canvasNeedsRedraw,
                    y = null;
                t.hoverData.draggingEles || (y = t.findNearestElement(f[0], f[1], !0, !1));
                var m = t.hoverData.last,
                    x = t.hoverData.down,
                    b = [f[0] - v[2], f[1] - v[3]],
                    w = t.dragData.possibleDragElements,
                    _ = v[2] - v[0],
                    E = _ * _,
                    T = v[3] - v[1],
                    S = T * T,
                    C = E + S,
                    k = C * p * p;
                t.hoverData.tapholdCancelled = !0;
                var D = function() {
                    var e = t.hoverData.dragDelta = t.hoverData.dragDelta || [];
                    0 === e.length ? (e.push(b[0]), e.push(b[1])) : (e[0] += b[0], e[1] += b[1])
                };
                if (i = !0, null != y ? y.trigger(new e.Event(r, {
                        type: "mousemove",
                        cyPosition: {
                            x: f[0],
                            y: f[1]
                        }
                    })).trigger(new e.Event(r, {
                        type: "vmousemove",
                        cyPosition: {
                            x: f[0],
                            y: f[1]
                        }
                    })).trigger(new e.Event(r, {
                        type: "tapdrag",
                        cyPosition: {
                            x: f[0],
                            y: f[1]
                        }
                    })) : null == y && h.trigger(new e.Event(r, {
                        type: "mousemove",
                        cyPosition: {
                            x: f[0],
                            y: f[1]
                        }
                    })).trigger(new e.Event(r, {
                        type: "vmousemove",
                        cyPosition: {
                            x: f[0],
                            y: f[1]
                        }
                    })).trigger(new e.Event(r, {
                        type: "tapdrag",
                        cyPosition: {
                            x: f[0],
                            y: f[1]
                        }
                    })), 3 === t.hoverData.which) {
                    var N = new e.Event(r, {
                        type: "cxtdrag",
                        cyPosition: {
                            x: f[0],
                            y: f[1]
                        }
                    });
                    x ? x.trigger(N) : h.trigger(N), t.hoverData.cxtDragged = !0, t.hoverData.cxtOver && y === t.hoverData.cxtOver || (t.hoverData.cxtOver && t.hoverData.cxtOver.trigger(new e.Event(r, {
                        type: "cxtdragout",
                        cyPosition: {
                            x: f[0],
                            y: f[1]
                        }
                    })), t.hoverData.cxtOver = y, y && y.trigger(new e.Event(r, {
                        type: "cxtdragover",
                        cyPosition: {
                            x: f[0],
                            y: f[1]
                        }
                    })))
                } else if (t.hoverData.dragging) {
                    if (i = !0, h.panningEnabled() && h.userPanningEnabled()) {
                        var P;
                        if (t.hoverData.justStartedPan) {
                            var M = t.hoverData.mdownPos;
                            P = {
                                x: (f[0] - M[0]) * p,
                                y: (f[1] - M[1]) * p
                            }, t.hoverData.justStartedPan = !1
                        } else P = {
                            x: b[0] * p,
                            y: b[1] * p
                        };
                        h.panBy(P), t.hoverData.dragged = !0
                    }
                    f = t.projectIntoViewport(r.clientX, r.clientY)
                } else if (1 == v[4] && (null == x || x.isEdge()) && (!h.boxSelectionEnabled() || +new Date - t.hoverData.downTime >= n.panOrBoxSelectDelay) && !t.hoverData.selecting && k >= t.desktopTapThreshold2 && h.panningEnabled() && h.userPanningEnabled()) t.hoverData.dragging = !0, t.hoverData.selecting = !1, t.hoverData.justStartedPan = !0, v[4] = 0;
                else {
                    if (h.boxSelectionEnabled() && !t.hoverData.dragging && Math.pow(v[2] - v[0], 2) + Math.pow(v[3] - v[1], 2) > 7 && v[4] && (clearTimeout(t.bgActiveTimeout), t.data.bgActivePosistion = void 0, t.hoverData.selecting = !0, g[n.SELECT_BOX] = !0, t.redraw()), x && x.isEdge() && x.active() && x.unactivate(), y != m && (m && (m.trigger(new e.Event(r, {
                            type: "mouseout",
                            cyPosition: {
                                x: f[0],
                                y: f[1]
                            }
                        })), m.trigger(new e.Event(r, {
                            type: "tapdragout",
                            cyPosition: {
                                x: f[0],
                                y: f[1]
                            }
                        }))), y && (y.trigger(new e.Event(r, {
                            type: "mouseover",
                            cyPosition: {
                                x: f[0],
                                y: f[1]
                            }
                        })), y.trigger(new e.Event(r, {
                            type: "tapdragover",
                            cyPosition: {
                                x: f[0],
                                y: f[1]
                            }
                        }))), t.hoverData.last = y), x && x.isNode() && t.nodeIsDraggable(x))
                        if (k >= t.desktopTapThreshold2) {
                            var B = !t.dragData.didDrag;
                            B && (g[n.NODE] = !0), t.dragData.didDrag = !0;
                            for (var L = [], O = 0; O < w.length; O++) {
                                var A = w[O];
                                if (t.hoverData.draggingEles || a(A, {
                                        inDragLayer: !0
                                    }), A.isNode() && t.nodeIsDraggable(A) && A.grabbed()) {
                                    var I = A._private.position;
                                    if (L.push(A), e.is.number(b[0]) && e.is.number(b[1]) && (I.x += b[0], I.y += b[1], B)) {
                                        var z = t.hoverData.dragDelta;
                                        e.is.number(z[0]) && e.is.number(z[1]) && (I.x += z[0], I.y += z[1])
                                    }
                                }
                            }
                            t.hoverData.draggingEles = !0;
                            var R = new e.Collection(h, L);
                            R.updateCompoundBounds(), R.trigger("position drag"), g[n.DRAG] = !0, t.redraw()
                        } else D();
                    i = !0
                }
                return v[2] = f[0], v[3] = f[1], i ? (r.stopPropagation && r.stopPropagation(), r.preventDefault && r.preventDefault(), !1) : void 0
            }, 1e3 / 30, {
                trailing: !0
            }), !1), t.registerBinding(window, "mouseup", function(r) {
                var i = t.hoverData.capture;
                if (i) {
                    t.hoverData.capture = !1;
                    var a = t.data.cy,
                        s = t.projectIntoViewport(r.clientX, r.clientY),
                        l = t.data.select,
                        u = t.findNearestElement(s[0], s[1], !0, !1),
                        c = t.dragData.possibleDragElements,
                        d = t.hoverData.down,
                        h = r.shiftKey,
                        p = t.data.canvasNeedsRedraw;
                    if (t.data.bgActivePosistion && (p[n.SELECT_BOX] = !0, t.redraw()), t.hoverData.tapholdCancelled = !0, t.data.bgActivePosistion = void 0, clearTimeout(t.bgActiveTimeout), d && d.unactivate(), 3 === t.hoverData.which) {
                        var f = new e.Event(r, {
                            type: "cxttapend",
                            cyPosition: {
                                x: s[0],
                                y: s[1]
                            }
                        });
                        if (d ? d.trigger(f) : a.trigger(f), !t.hoverData.cxtDragged) {
                            var v = new e.Event(r, {
                                type: "cxttap",
                                cyPosition: {
                                    x: s[0],
                                    y: s[1]
                                }
                            });
                            d ? d.trigger(v) : a.trigger(v)
                        }
                        t.hoverData.cxtDragged = !1, t.hoverData.which = null
                    } else {
                        if (null != d || t.dragData.didDrag || t.hoverData.dragged || (a.$(function() {
                                return this.selected()
                            }).unselect(), c.length > 0 && (p[n.NODE] = !0), t.dragData.possibleDragElements = c = []), null != u ? u.trigger(new e.Event(r, {
                                type: "mouseup",
                                cyPosition: {
                                    x: s[0],
                                    y: s[1]
                                }
                            })).trigger(new e.Event(r, {
                                type: "tapend",
                                cyPosition: {
                                    x: s[0],
                                    y: s[1]
                                }
                            })).trigger(new e.Event(r, {
                                type: "vmouseup",
                                cyPosition: {
                                    x: s[0],
                                    y: s[1]
                                }
                            })) : null == u && a.trigger(new e.Event(r, {
                                type: "mouseup",
                                cyPosition: {
                                    x: s[0],
                                    y: s[1]
                                }
                            })).trigger(new e.Event(r, {
                                type: "tapend",
                                cyPosition: {
                                    x: s[0],
                                    y: s[1]
                                }
                            })).trigger(new e.Event(r, {
                                type: "vmouseup",
                                cyPosition: {
                                    x: s[0],
                                    y: s[1]
                                }
                            })), t.dragData.didDrag || t.hoverData.dragged || (null != u ? u.trigger(new e.Event(r, {
                                type: "click",
                                cyPosition: {
                                    x: s[0],
                                    y: s[1]
                                }
                            })).trigger(new e.Event(r, {
                                type: "tap",
                                cyPosition: {
                                    x: s[0],
                                    y: s[1]
                                }
                            })).trigger(new e.Event(r, {
                                type: "vclick",
                                cyPosition: {
                                    x: s[0],
                                    y: s[1]
                                }
                            })) : null == u && a.trigger(new e.Event(r, {
                                type: "click",
                                cyPosition: {
                                    x: s[0],
                                    y: s[1]
                                }
                            })).trigger(new e.Event(r, {
                                type: "tap",
                                cyPosition: {
                                    x: s[0],
                                    y: s[1]
                                }
                            })).trigger(new e.Event(r, {
                                type: "vclick",
                                cyPosition: {
                                    x: s[0],
                                    y: s[1]
                                }
                            }))), u != d || t.dragData.didDrag || null != u && u._private.selectable && (t.hoverData.dragging || ("additive" === a.selectionType() || h ? u.selected() ? u.unselect() : u.select() : h || (a.$(":selected").unmerge(u).unselect(), u.select())), p[n.NODE] = !0), t.hoverData.selecting && a.boxSelectionEnabled() && Math.pow(l[2] - l[0], 2) + Math.pow(l[3] - l[1], 2) > 7 && l[4]) {
                            var g = [],
                                y = t.getAllInBox(l[0], l[1], l[2], l[3]);
                            p[n.SELECT_BOX] = !0, y.length > 0 && (p[n.NODE] = !0);
                            for (var m = 0; m < y.length; m++) y[m]._private.selectable && g.push(y[m]);
                            var x = new e.Collection(a, g);
                            "additive" === a.selectionType() ? x.select() : (h || a.$(":selected").unmerge(x).unselect(), x.select()), t.redraw()
                        }
                        t.hoverData.dragging && (t.hoverData.dragging = !1, p[n.SELECT_BOX] = !0, p[n.NODE] = !0, t.redraw()), l[4] || (p[n.DRAG] = !0, p[n.NODE] = !0, o(c), d && d.trigger("free"))
                    }
                    l[4] = 0, t.hoverData.down = null, t.hoverData.cxtStarted = !1, t.hoverData.draggingEles = !1, t.hoverData.selecting = !1, t.dragData.didDrag = !1, t.hoverData.dragged = !1, t.hoverData.dragDelta = []
                }
            }, !1);
            var d = function(e) {
                if (!t.scrollingPage) {
                    var r = t.data.cy,
                        i = t.projectIntoViewport(e.clientX, e.clientY),
                        a = [i[0] * r.zoom() + r.pan().x, i[1] * r.zoom() + r.pan().y];
                    if (t.hoverData.draggingEles || t.hoverData.dragging || t.hoverData.cxtStarted || c()) return void e.preventDefault();
                    if (r.panningEnabled() && r.userPanningEnabled() && r.zoomingEnabled() && r.userZoomingEnabled()) {
                        e.preventDefault(), t.data.wheelZooming = !0, clearTimeout(t.data.wheelTimeout), t.data.wheelTimeout = setTimeout(function() {
                            t.data.wheelZooming = !1, t.data.canvasNeedsRedraw[n.NODE] = !0, t.redraw()
                        }, 150);
                        var o = e.deltaY / -250 || e.wheelDeltaY / 1e3 || e.wheelDelta / 1e3;
                        o *= t.wheelSensitivity;
                        var s = 1 === e.deltaMode;
                        s && (o *= 33), r.zoom({
                            level: r.zoom() * Math.pow(10, o),
                            renderedPosition: {
                                x: a[0],
                                y: a[1]
                            }
                        })
                    }
                }
            };
            t.registerBinding(t.data.container, "wheel", d, !0), t.registerBinding(window, "scroll", function(e) {
                t.scrollingPage = !0, clearTimeout(t.scrollingPageTimeout), t.scrollingPageTimeout = setTimeout(function() {
                    t.scrollingPage = !1
                }, 250)
            }, !0), t.registerBinding(t.data.container, "mouseout", function(n) {
                var r = t.projectIntoViewport(n.clientX, n.clientY);
                t.data.cy.trigger(new e.Event(n, {
                    type: "mouseout",
                    cyPosition: {
                        x: r[0],
                        y: r[1]
                    }
                }))
            }, !1), t.registerBinding(t.data.container, "mouseover", function(n) {
                var r = t.projectIntoViewport(n.clientX, n.clientY);
                t.data.cy.trigger(new e.Event(n, {
                    type: "mouseover",
                    cyPosition: {
                        x: r[0],
                        y: r[1]
                    }
                }))
            }, !1);
            var h, p, f, v, g, y, m, x, b, w, _, E, T, S = function(e, t, n, r) {
                    return Math.sqrt((n - e) * (n - e) + (r - t) * (r - t))
                },
                C = function(e, t, n, r) {
                    return (n - e) * (n - e) + (r - t) * (r - t)
                };
            t.registerBinding(t.data.container, "touchstart", function(r) {
                clearTimeout(this.threeFingerSelectTimeout), r.target !== t.data.link && r.preventDefault(), t.touchData.capture = !0, t.data.bgActivePosistion = void 0;
                var i = t.data.cy,
                    o = t.getCachedNodes(),
                    s = t.getCachedEdges(),
                    l = t.touchData.now,
                    u = t.touchData.earlier,
                    c = t.data.canvasNeedsRedraw;
                if (r.touches[0]) {
                    var d = t.projectIntoViewport(r.touches[0].clientX, r.touches[0].clientY);
                    l[0] = d[0], l[1] = d[1]
                }
                if (r.touches[1]) {
                    var d = t.projectIntoViewport(r.touches[1].clientX, r.touches[1].clientY);
                    l[2] = d[0], l[3] = d[1]
                }
                if (r.touches[2]) {
                    var d = t.projectIntoViewport(r.touches[2].clientX, r.touches[2].clientY);
                    l[4] = d[0], l[5] = d[1]
                }
                if (r.touches[1]) {
                    var k = function(e) {
                        for (var t = 0; t < e.length; t++) e[t]._private.grabbed = !1, e[t]._private.rscratch.inDragLayer = !1, e[t].active() && e[t].unactivate()
                    };
                    k(o), k(s);
                    var D = t.findContainerClientCoords();
                    b = D[0], w = D[1], _ = D[2], E = D[3], h = r.touches[0].clientX - b, p = r.touches[0].clientY - w, f = r.touches[1].clientX - b, v = r.touches[1].clientY - w, T = h >= 0 && _ >= h && f >= 0 && _ >= f && p >= 0 && E >= p && v >= 0 && E >= v;
                    var N = i.pan(),
                        P = i.zoom();
                    g = S(h, p, f, v), y = C(h, p, f, v), m = [(h + f) / 2, (p + v) / 2], x = [(m[0] - N.x) / P, (m[1] - N.y) / P];
                    var M = 200,
                        B = M * M;
                    if (B > y && !r.touches[2]) {
                        var L = t.findNearestElement(l[0], l[1], !0, !0),
                            O = t.findNearestElement(l[2], l[3], !0, !0);
                        return L && L.isNode() ? (L.activate().trigger(new e.Event(r, {
                            type: "cxttapstart",
                            cyPosition: {
                                x: l[0],
                                y: l[1]
                            }
                        })), t.touchData.start = L) : O && O.isNode() ? (O.activate().trigger(new e.Event(r, {
                            type: "cxttapstart",
                            cyPosition: {
                                x: l[0],
                                y: l[1]
                            }
                        })), t.touchData.start = O) : (i.trigger(new e.Event(r, {
                            type: "cxttapstart",
                            cyPosition: {
                                x: l[0],
                                y: l[1]
                            }
                        })), t.touchData.start = null), t.touchData.start && (t.touchData.start._private.grabbed = !1), t.touchData.cxt = !0, t.touchData.cxtDragged = !1, t.data.bgActivePosistion = void 0, void t.redraw()
                    }
                }
                if (r.touches[2]);
                else if (r.touches[1]);
                else if (r.touches[0]) {
                    var A = t.findNearestElement(l[0], l[1], !0, !0);
                    if (null != A) {
                        if (A.activate(), t.touchData.start = A, A.isNode() && t.nodeIsDraggable(A)) {
                            var I = t.dragData.touchDragEles = [];
                            if (c[n.NODE] = !0, c[n.DRAG] = !0, A.selected())
                                for (var z = i.$(function() {
                                        return this.isNode() && this.selected()
                                    }), R = 0; R < z.length; R++) {
                                    var j = z[R];
                                    t.nodeIsDraggable(j) && a(j, {
                                        addToList: I
                                    })
                                } else a(A, {
                                    addToList: I
                                });
                            A.trigger(new e.Event(r, {
                                type: "grab",
                                cyPosition: {
                                    x: l[0],
                                    y: l[1]
                                }
                            }))
                        }
                        A.trigger(new e.Event(r, {
                            type: "touchstart",
                            cyPosition: {
                                x: l[0],
                                y: l[1]
                            }
                        })).trigger(new e.Event(r, {
                            type: "tapstart",
                            cyPosition: {
                                x: l[0],
                                y: l[1]
                            }
                        })).trigger(new e.Event(r, {
                            type: "vmousdown",
                            cyPosition: {
                                x: l[0],
                                y: l[1]
                            }
                        }))
                    }
                    null == A && (i.trigger(new e.Event(r, {
                        type: "touchstart",
                        cyPosition: {
                            x: l[0],
                            y: l[1]
                        }
                    })).trigger(new e.Event(r, {
                        type: "tapstart",
                        cyPosition: {
                            x: l[0],
                            y: l[1]
                        }
                    })).trigger(new e.Event(r, {
                        type: "vmousedown",
                        cyPosition: {
                            x: l[0],
                            y: l[1]
                        }
                    })), t.data.bgActivePosistion = {
                        x: d[0],
                        y: d[1]
                    }, c[n.SELECT_BOX] = !0, t.redraw());
                    for (var F = 0; F < l.length; F++) u[F] = l[F], t.touchData.startPosition[F] = l[F];
                    t.touchData.singleTouchMoved = !1, t.touchData.singleTouchStartTime = +new Date, clearTimeout(t.touchData.tapholdTimeout), t.touchData.tapholdTimeout = setTimeout(function() {
                        t.touchData.singleTouchMoved !== !1 || t.pinching || (t.touchData.start ? t.touchData.start.trigger(new e.Event(r, {
                            type: "taphold",
                            cyPosition: {
                                x: l[0],
                                y: l[1]
                            }
                        })) : (t.data.cy.trigger(new e.Event(r, {
                            type: "taphold",
                            cyPosition: {
                                x: l[0],
                                y: l[1]
                            }
                        })), i.$(":selected").unselect()))
                    }, t.tapholdDuration)
                }
            }, !1), t.registerBinding(window, "touchmove", e.util.throttle(function(r) {
                var i = t.data.select,
                    o = t.touchData.capture;
                o && r.preventDefault();
                var s = t.data.cy,
                    l = t.touchData.now,
                    u = t.touchData.earlier,
                    c = s.zoom(),
                    d = t.data.canvasNeedsRedraw;
                if (r.touches[0]) {
                    var m = t.projectIntoViewport(r.touches[0].clientX, r.touches[0].clientY);
                    l[0] = m[0], l[1] = m[1]
                }
                if (r.touches[1]) {
                    var m = t.projectIntoViewport(r.touches[1].clientX, r.touches[1].clientY);
                    l[2] = m[0], l[3] = m[1]
                }
                if (r.touches[2]) {
                    var m = t.projectIntoViewport(r.touches[2].clientX, r.touches[2].clientY);
                    l[4] = m[0], l[5] = m[1]
                }
                for (var _ = [], E = 0; E < l.length; E++) _[E] = l[E] - u[E];
                var k = t.touchData.startPosition,
                    D = l[0] - k[0],
                    N = D * D,
                    P = l[1] - k[1],
                    M = P * P,
                    B = N + M,
                    L = B * c * c;
                if (o && t.touchData.cxt) {
                    var O = r.touches[0].clientX - b,
                        A = r.touches[0].clientY - w,
                        I = r.touches[1].clientX - b,
                        z = r.touches[1].clientY - w,
                        R = C(O, A, I, z),
                        j = R / y,
                        F = 150,
                        q = F * F,
                        V = 1.5,
                        X = V * V;
                    if (j >= X || R >= q) {
                        t.touchData.cxt = !1, t.touchData.start && (t.touchData.start.unactivate(), t.touchData.start = null), t.data.bgActivePosistion = void 0, d[n.SELECT_BOX] = !0;
                        var H = new e.Event(r, {
                            type: "cxttapend",
                            cyPosition: {
                                x: l[0],
                                y: l[1]
                            }
                        });
                        t.touchData.start ? t.touchData.start.trigger(H) : s.trigger(H)
                    }
                }
                if (o && t.touchData.cxt) {
                    var H = new e.Event(r, {
                        type: "cxtdrag",
                        cyPosition: {
                            x: l[0],
                            y: l[1]
                        }
                    });
                    t.data.bgActivePosistion = void 0, d[n.SELECT_BOX] = !0, t.touchData.start ? t.touchData.start.trigger(H) : s.trigger(H), t.touchData.start && (t.touchData.start._private.grabbed = !1), t.touchData.cxtDragged = !0;
                    var Y = t.findNearestElement(l[0], l[1], !0, !0);
                    t.touchData.cxtOver && Y === t.touchData.cxtOver || (t.touchData.cxtOver && t.touchData.cxtOver.trigger(new e.Event(r, {
                        type: "cxtdragout",
                        cyPosition: {
                            x: l[0],
                            y: l[1]
                        }
                    })), t.touchData.cxtOver = Y, Y && Y.trigger(new e.Event(r, {
                        type: "cxtdragover",
                        cyPosition: {
                            x: l[0],
                            y: l[1]
                        }
                    })))
                } else if (o && r.touches[2] && s.boxSelectionEnabled()) t.data.bgActivePosistion = void 0, clearTimeout(this.threeFingerSelectTimeout), this.lastThreeTouch = +new Date, t.touchData.selecting = !0, d[n.SELECT_BOX] = !0, i && 0 !== i.length && void 0 !== i[0] ? (i[2] = (l[0] + l[2] + l[4]) / 3, i[3] = (l[1] + l[3] + l[5]) / 3) : (i[0] = (l[0] + l[2] + l[4]) / 3, i[1] = (l[1] + l[3] + l[5]) / 3, i[2] = (l[0] + l[2] + l[4]) / 3 + 1, i[3] = (l[1] + l[3] + l[5]) / 3 + 1), i[4] = 1, t.touchData.selecting = !0, t.redraw();
                else if (o && r.touches[1] && s.zoomingEnabled() && s.panningEnabled() && s.userZoomingEnabled() && s.userPanningEnabled()) {
                    t.data.bgActivePosistion = void 0, d[n.SELECT_BOX] = !0;
                    var $ = t.dragData.touchDragEles;
                    if ($) {
                        d[n.DRAG] = !0;
                        for (var W = 0; W < $.length; W++) $[W]._private.grabbed = !1, $[W]._private.rscratch.inDragLayer = !1
                    }
                    var O = r.touches[0].clientX - b,
                        A = r.touches[0].clientY - w,
                        I = r.touches[1].clientX - b,
                        z = r.touches[1].clientY - w,
                        U = S(O, A, I, z),
                        Z = U / g;
                    if (1 != Z && T) {
                        var G = O - h,
                            K = A - p,
                            J = I - f,
                            Q = z - v,
                            ee = (G + J) / 2,
                            te = (K + Q) / 2,
                            ne = s.zoom(),
                            re = ne * Z,
                            ie = s.pan(),
                            ae = x[0] * ne + ie.x,
                            oe = x[1] * ne + ie.y,
                            se = {
                                x: -re / ne * (ae - ie.x - ee) + ae,
                                y: -re / ne * (oe - ie.y - te) + oe
                            };
                        if (t.touchData.start) {
                            var $ = t.dragData.touchDragEles;
                            if ($)
                                for (var W = 0; W < $.length; W++) {
                                    var le = $[W]._private;
                                    le.grabbed = !1, le.rscratch.inDragLayer = !1
                                }
                            var ue = t.touchData.start._private;
                            ue.active = !1, ue.grabbed = !1, ue.rscratch.inDragLayer = !1, d[n.DRAG] = !0, t.touchData.start.trigger("free").trigger("unactivate")
                        }
                        s.viewport({
                            zoom: re,
                            pan: se,
                            cancelOnFailedZoom: !0
                        }), g = U, h = O, p = A, f = I, v = z, t.pinching = !0
                    }
                    if (r.touches[0]) {
                        var m = t.projectIntoViewport(r.touches[0].clientX, r.touches[0].clientY);
                        l[0] = m[0], l[1] = m[1]
                    }
                    if (r.touches[1]) {
                        var m = t.projectIntoViewport(r.touches[1].clientX, r.touches[1].clientY);
                        l[2] = m[0], l[3] = m[1]
                    }
                    if (r.touches[2]) {
                        var m = t.projectIntoViewport(r.touches[2].clientX, r.touches[2].clientY);
                        l[4] = m[0], l[5] = m[1]
                    }
                } else if (r.touches[0]) {
                    var ce = t.touchData.start,
                        de = t.touchData.last,
                        Y = Y || t.findNearestElement(l[0], l[1], !0, !0);
                    if (null != ce && "nodes" == ce._private.group && t.nodeIsDraggable(ce))
                        if (L >= t.touchTapThreshold2) {
                            for (var $ = t.dragData.touchDragEles, he = 0; he < $.length; he++) {
                                var pe = $[he];
                                if (t.nodeIsDraggable(pe) && pe.isNode() && pe.grabbed()) {
                                    t.dragData.didDrag = !0;
                                    var fe = pe._private.position,
                                        ve = !t.hoverData.draggingEles;
                                    if (e.is.number(_[0]) && e.is.number(_[1]) && (fe.x += _[0], fe.y += _[1]), ve) {
                                        a(pe, {
                                            inDragLayer: !0
                                        }), d[n.NODE] = !0;
                                        var ge = t.touchData.dragDelta;
                                        e.is.number(ge[0]) && e.is.number(ge[1]) && (fe.x += ge[0], fe.y += ge[1])
                                    }
                                }
                            }
                            var ye = new e.Collection(s, pe);
                            ye.updateCompoundBounds(), ye.trigger("position drag"), t.hoverData.draggingEles = !0, d[n.DRAG] = !0, t.touchData.startPosition[0] == u[0] && t.touchData.startPosition[1] == u[1] && (d[n.NODE] = !0), t.redraw()
                        } else {
                            var ge = t.touchData.dragDelta = t.touchData.dragDelta || [];
                            0 === ge.length ? (ge.push(_[0]), ge.push(_[1])) : (ge[0] += _[0], ge[1] += _[1])
                        }
                    null != ce && (ce.trigger(new e.Event(r, {
                        type: "touchmove",
                        cyPosition: {
                            x: l[0],
                            y: l[1]
                        }
                    })), ce.trigger(new e.Event(r, {
                        type: "tapdrag",
                        cyPosition: {
                            x: l[0],
                            y: l[1]
                        }
                    })), ce.trigger(new e.Event(r, {
                        type: "vmousemove",
                        cyPosition: {
                            x: l[0],
                            y: l[1]
                        }
                    }))), null == ce && (null != Y && (Y.trigger(new e.Event(r, {
                        type: "touchmove",
                        cyPosition: {
                            x: l[0],
                            y: l[1]
                        }
                    })), Y.trigger(new e.Event(r, {
                        type: "tapdrag",
                        cyPosition: {
                            x: l[0],
                            y: l[1]
                        }
                    })), Y.trigger(new e.Event(r, {
                        type: "vmousemove",
                        cyPosition: {
                            x: l[0],
                            y: l[1]
                        }
                    }))), null == Y && (s.trigger(new e.Event(r, {
                        type: "touchmove",
                        cyPosition: {
                            x: l[0],
                            y: l[1]
                        }
                    })), s.trigger(new e.Event(r, {
                        type: "tapdrag",
                        cyPosition: {
                            x: l[0],
                            y: l[1]
                        }
                    })), s.trigger(new e.Event(r, {
                        type: "vmousemove",
                        cyPosition: {
                            x: l[0],
                            y: l[1]
                        }
                    })))), Y != de && (de && de.trigger(new e.Event(r, {
                        type: "tapdragout",
                        cyPosition: {
                            x: l[0],
                            y: l[1]
                        }
                    })), Y && Y.trigger(new e.Event(r, {
                        type: "tapdragover",
                        cyPosition: {
                            x: l[0],
                            y: l[1]
                        }
                    }))), t.touchData.last = Y;
                    for (var W = 0; W < l.length; W++) l[W] && t.touchData.startPosition[W] && Math.abs(l[W] - t.touchData.startPosition[W]) > 4 && (t.touchData.singleTouchMoved = !0);
                    if (o && (null == ce || ce.isEdge()) && s.panningEnabled() && s.userPanningEnabled()) {
                        t.swipePanning ? s.panBy({
                            x: _[0] * c,
                            y: _[1] * c
                        }) : L >= t.touchTapThreshold2 && (t.swipePanning = !0, s.panBy({
                            x: D * c,
                            y: P * c
                        })), ce && (ce.unactivate(), t.data.bgActivePosistion || (t.data.bgActivePosistion = {
                            x: l[0],
                            y: l[1]
                        }), d[n.SELECT_BOX] = !0, t.touchData.start = null);
                        var m = t.projectIntoViewport(r.touches[0].clientX, r.touches[0].clientY);
                        l[0] = m[0], l[1] = m[1]
                    }
                }
                for (var E = 0; E < l.length; E++) u[E] = l[E]
            }, 1e3 / 30, {
                trailing: !0
            }), !1), t.registerBinding(window, "touchcancel", function(e) {
                var n = t.touchData.start;
                t.touchData.capture = !1, n && n.unactivate()
            }), t.registerBinding(window, "touchend", function(r) {
                var i = t.touchData.start,
                    a = t.touchData.capture;
                if (a) {
                    t.touchData.capture = !1, r.preventDefault();
                    var s = t.data.select;
                    t.swipePanning = !1, t.hoverData.draggingEles = !1;
                    var l = t.data.cy,
                        u = l.zoom(),
                        c = t.touchData.now,
                        d = t.touchData.earlier,
                        h = t.data.canvasNeedsRedraw;
                    if (r.touches[0]) {
                        var p = t.projectIntoViewport(r.touches[0].clientX, r.touches[0].clientY);
                        c[0] = p[0], c[1] = p[1]
                    }
                    if (r.touches[1]) {
                        var p = t.projectIntoViewport(r.touches[1].clientX, r.touches[1].clientY);
                        c[2] = p[0], c[3] = p[1]
                    }
                    if (r.touches[2]) {
                        var p = t.projectIntoViewport(r.touches[2].clientX, r.touches[2].clientY);
                        c[4] = p[0], c[5] = p[1]
                    }
                    i && i.unactivate();
                    var f;
                    if (t.touchData.cxt) {
                        if (f = new e.Event(r, {
                                type: "cxttapend",
                                cyPosition: {
                                    x: c[0],
                                    y: c[1]
                                }
                            }), i ? i.trigger(f) : l.trigger(f), !t.touchData.cxtDragged) {
                            var v = new e.Event(r, {
                                type: "cxttap",
                                cyPosition: {
                                    x: c[0],
                                    y: c[1]
                                }
                            });
                            i ? i.trigger(v) : l.trigger(v)
                        }
                        return t.touchData.start && (t.touchData.start._private.grabbed = !1), t.touchData.cxt = !1, t.touchData.start = null, void t.redraw()
                    }
                    if (!r.touches[2] && l.boxSelectionEnabled() && t.touchData.selecting) {
                        t.touchData.selecting = !1, clearTimeout(this.threeFingerSelectTimeout);
                        var g = [],
                            y = t.getAllInBox(s[0], s[1], s[2], s[3]);
                        s[0] = void 0, s[1] = void 0, s[2] = void 0, s[3] = void 0, s[4] = 0, h[n.SELECT_BOX] = !0;
                        for (var m = 0; m < y.length; m++) y[m]._private.selectable && g.push(y[m]);
                        var x = new e.Collection(l, g);
                        "single" === l.selectionType() && l.$(":selected").unmerge(x).unselect(), x.select(), x.length > 0 ? h[n.NODE] = !0 : t.redraw()
                    }
                    var b = !1;
                    if (null != i && (i._private.active = !1, b = !0, i.unactivate()), r.touches[2]) t.data.bgActivePosistion = void 0, h[n.SELECT_BOX] = !0;
                    else if (r.touches[1]);
                    else if (r.touches[0]);
                    else if (!r.touches[0]) {
                        t.data.bgActivePosistion = void 0, h[n.SELECT_BOX] = !0;
                        var w = t.dragData.touchDragEles;
                        if (null != i) {
                            var _ = i._private.grabbed;
                            o(w), h[n.DRAG] = !0, h[n.NODE] = !0, _ && i.trigger("free"), i.trigger(new e.Event(r, {
                                type: "touchend",
                                cyPosition: {
                                    x: c[0],
                                    y: c[1]
                                }
                            })).trigger(new e.Event(r, {
                                type: "tapend",
                                cyPosition: {
                                    x: c[0],
                                    y: c[1]
                                }
                            })).trigger(new e.Event(r, {
                                type: "vmouseup",
                                cyPosition: {
                                    x: c[0],
                                    y: c[1]
                                }
                            })), i.unactivate(), t.touchData.start = null
                        } else {
                            var E = t.findNearestElement(c[0], c[1], !0, !0);
                            null != E && E.trigger(new e.Event(r, {
                                type: "touchend",
                                cyPosition: {
                                    x: c[0],
                                    y: c[1]
                                }
                            })).trigger(new e.Event(r, {
                                type: "tapend",
                                cyPosition: {
                                    x: c[0],
                                    y: c[1]
                                }
                            })).trigger(new e.Event(r, {
                                type: "vmouseup",
                                cyPosition: {
                                    x: c[0],
                                    y: c[1]
                                }
                            })), null == E && l.trigger(new e.Event(r, {
                                type: "touchend",
                                cyPosition: {
                                    x: c[0],
                                    y: c[1]
                                }
                            })).trigger(new e.Event(r, {
                                type: "tapend",
                                cyPosition: {
                                    x: c[0],
                                    y: c[1]
                                }
                            })).trigger(new e.Event(r, {
                                type: "vmouseup",
                                cyPosition: {
                                    x: c[0],
                                    y: c[1]
                                }
                            }))
                        }
                        var T = t.touchData.startPosition[0] - c[0],
                            S = T * T,
                            C = t.touchData.startPosition[1] - c[1],
                            k = C * C,
                            D = S + k,
                            N = D * u * u;
                        null != i && !t.dragData.didDrag && i._private.selectable && N < t.touchTapThreshold2 && !t.pinching && ("single" === l.selectionType() ? (l.$(":selected").unmerge(i).unselect(), i.select()) : i.selected() ? i.unselect() : i.select(), b = !0, h[n.NODE] = !0), t.touchData.singleTouchMoved === !1 && (i ? i.trigger(new e.Event(r, {
                            type: "tap",
                            cyPosition: {
                                x: c[0],
                                y: c[1]
                            }
                        })).trigger(new e.Event(r, {
                            type: "vclick",
                            cyPosition: {
                                x: c[0],
                                y: c[1]
                            }
                        })) : l.trigger(new e.Event(r, {
                            type: "tap",
                            cyPosition: {
                                x: c[0],
                                y: c[1]
                            }
                        })).trigger(new e.Event(r, {
                            type: "vclick",
                            cyPosition: {
                                x: c[0],
                                y: c[1]
                            }
                        }))), t.touchData.singleTouchMoved = !0
                    }
                    for (var P = 0; P < c.length; P++) d[P] = c[P];
                    t.dragData.didDrag = !1, 0 === r.touches.length && (t.touchData.dragDelta = []), b && i && i.updateStyle(!1), r.touches.length < 2 && (t.pinching = !1, h[n.NODE] = !0, t.redraw())
                }
            }, !1)
        }
    }(cytoscape),
    function(e) {
        "use strict";

        function t(t, n) {
            a[t] = {
                points: n,
                draw: function(e, n, i, o, s) {
                    r.drawPolygon(e, n, i, o, s, a[t].points)
                },
                drawPath: function(e, n, i, o, s) {
                    r.drawPolygonPath(e, n, i, o, s, a[t].points)
                },
                intersectLine: function(n, r, i, o, s, l, u) {
                    return e.math.polygonIntersectLine(s, l, a[t].points, n, r, i / 2, o / 2, u)
                },
                intersectBox: function(n, r, i, o, s, l, u, c, d) {
                    var h = a[t].points;
                    return e.math.boxIntersectPolygon(n, r, i, o, h, s, l, u, c, [0, -1], d)
                },
                checkPoint: function(n, r, i, o, s, l, u) {
                    return e.math.pointInsidePolygon(n, r, a[t].points, l, u, o, s, [0, -1], i)
                }
            }
        }
        for (var n = e("renderer", "canvas"), r = n.prototype, i = n.usePaths(), a = n.nodeShapes = {}, o = Math.sin(0), s = Math.cos(0), l = {}, u = {}, c = .1, d = 0 * Math.PI; d < 2 * Math.PI; d += c) l[d] = Math.sin(d), u[d] = Math.cos(d);
        a.ellipse = {
            draw: function(e, t, n, r, i) {
                a.ellipse.drawPath(e, t, n, r, i), e.fill()
            },
            drawPath: function(e, t, n, r, a) {
                if (i) {
                    e.beginPath && e.beginPath();
                    for (var d, h, p = r / 2, f = a / 2, v = 0 * Math.PI; v < 2 * Math.PI; v += c) d = t - p * l[v] * o + p * u[v] * s, h = n + f * u[v] * o + f * l[v] * s, 0 === v ? e.moveTo(d, h) : e.lineTo(d, h);
                    e.closePath()
                } else e.beginPath && e.beginPath(), e.translate(t, n), e.scale(r / 2, a / 2), e.arc(0, 0, 1, 0, 2 * Math.PI * .999, !1), e.closePath(), e.scale(2 / r, 2 / a), e.translate(-t, -n)
            },
            intersectLine: function(t, n, r, i, a, o, s) {
                var l = e.math.intersectLineEllipse(a, o, t, n, r / 2 + s, i / 2 + s);
                return l
            },
            intersectBox: function(t, n, r, i, a, o, s, l, u) {
                return e.math.boxIntersectEllipse(t, n, r, i, u, a, o, s, l)
            },
            checkPoint: function(e, t, n, r, i, a, o) {
                return e -= a, t -= o, e /= r / 2 + n, t /= i / 2 + n, Math.pow(e, 2) + Math.pow(t, 2) <= 1
            }
        }, t("triangle", e.math.generateUnitNgonPointsFitToSquare(3, 0)), t("square", e.math.generateUnitNgonPointsFitToSquare(4, 0)), a.rectangle = a.square, a.roundrectangle = {
            points: e.math.generateUnitNgonPointsFitToSquare(4, 0),
            draw: function(e, t, n, i, a) {
                r.drawRoundRectangle(e, t, n, i, a, 10)
            },
            drawPath: function(e, t, n, i, a) {
                r.drawRoundRectanglePath(e, t, n, i, a, 10)
            },
            intersectLine: function(t, n, r, i, a, o, s) {
                return e.math.roundRectangleIntersectLine(a, o, t, n, r, i, s)
            },
            intersectBox: function(t, n, r, i, a, o, s, l, u) {
                return e.math.roundRectangleIntersectBox(t, n, r, i, a, o, s, l, u)
            },
            checkPoint: function(t, n, r, i, o, s, l) {
                var u = e.math.getRoundRectangleRadius(i, o);
                if (e.math.pointInsidePolygon(t, n, a.roundrectangle.points, s, l, i, o - 2 * u, [0, -1], r)) return !0;
                if (e.math.pointInsidePolygon(t, n, a.roundrectangle.points, s, l, i - 2 * u, o, [0, -1], r)) return !0;
                var c = function(e, t, n, r, i, a, o) {
                    return e -= n, t -= r, e /= i / 2 + o, t /= a / 2 + o, Math.pow(e, 2) + Math.pow(t, 2) <= 1
                };
                return c(t, n, s - i / 2 + u, l - o / 2 + u, 2 * u, 2 * u, r) ? !0 : c(t, n, s + i / 2 - u, l - o / 2 + u, 2 * u, 2 * u, r) ? !0 : c(t, n, s + i / 2 - u, l + o / 2 - u, 2 * u, 2 * u, r) ? !0 : c(t, n, s - i / 2 + u, l + o / 2 - u, 2 * u, 2 * u, r) ? !0 : !1
            }
        }, t("diamond", [0, 1, 1, 0, 0, -1, -1, 0]), t("pentagon", e.math.generateUnitNgonPointsFitToSquare(5, 0)), t("hexagon", e.math.generateUnitNgonPointsFitToSquare(6, 0)), t("heptagon", e.math.generateUnitNgonPointsFitToSquare(7, 0)), t("octagon", e.math.generateUnitNgonPointsFitToSquare(8, 0));
        var h = new Array(20),
            p = e.math.generateUnitNgonPoints(5, 0),
            f = e.math.generateUnitNgonPoints(5, Math.PI / 5),
            v = .5 * (3 - Math.sqrt(5));
        v *= 1.57;
        for (var d = 0; d < f.length / 2; d++) f[2 * d] *= v, f[2 * d + 1] *= v;
        for (var d = 0; 5 > d; d++) h[4 * d] = p[2 * d], h[4 * d + 1] = p[2 * d + 1], h[4 * d + 2] = f[2 * d], h[4 * d + 3] = f[2 * d + 1];
        h = e.math.fitPolygonToSquare(h), t("star", h), t("vee", [-1, -1, 0, -.333, 1, -1, 0, 1]), t("rhomboid", [-1, -1, .333, -1, 1, 1, -.333, 1])
    }(cytoscape),
    function(e) {
        "use strict";

        function t(t) {
            this._private = {}, this._private.options = e.util.extend({}, n, t)
        }
        var n = {
            animate: !0,
            maxSimulationTime: 4e3,
            fit: !0,
            padding: 30,
            boundingBox: void 0,
            ungrabifyWhileSimulating: !1,
            ready: void 0,
            stop: void 0,
            repulsion: void 0,
            stiffness: void 0,
            friction: void 0,
            gravity: !0,
            fps: void 0,
            precision: void 0,
            nodeMass: void 0,
            edgeLength: void 0,
            stepSize: .1,
            stableEnergy: function(e) {
                var t = e;
                return t.max <= .5 || t.mean <= .3
            },
            infinite: !1
        };
        t.prototype.run = function() {
            var t = this,
                n = this._private.options;
            return e.util.require("arbor", function(r) {
                function i(e, t) {
                    return null == t ? void 0 : "function" == typeof t ? t.apply(e, [e._private.data, {
                        nodes: u.length,
                        edges: c.length,
                        element: e
                    }]) : t
                }

                function a(e) {
                    if (!e.isFullAutoParent()) {
                        var t = e._private.data.id,
                            r = i(e, n.nodeMass),
                            a = e._private.locked,
                            o = e.position(),
                            s = p.fromScreen({
                                x: o.x,
                                y: o.y
                            });
                        e.scratch().arbor = p.addNode(t, {
                            element: e,
                            mass: r,
                            fixed: a,
                            x: a && s ? s.x : void 0,
                            y: a && s ? s.y : void 0
                        })
                    }
                }

                function o(e) {
                    var t = e.source().id(),
                        r = e.target().id(),
                        a = i(e, n.edgeLength);
                    e.scratch().arbor = p.addEdge(t, r, {
                        length: a
                    })
                }
                var s = n.cy,
                    l = n.eles,
                    u = l.nodes().not(":parent"),
                    c = l.edges(),
                    d = e.util.makeBoundingBox(n.boundingBox ? n.boundingBox : {
                        x1: 0,
                        y1: 0,
                        w: s.width(),
                        h: s.height()
                    }),
                    h = !1;
                if (t.trigger({
                        type: "layoutstart",
                        layout: t
                    }), void 0 !== n.liveUpdate && (n.animate = n.liveUpdate), l.nodes().size() <= 1) return n.fit && s.reset(), l.nodes().position({
                    x: Math.round((d.x1 + d.x2) / 2),
                    y: Math.round((d.y1 + d.y2) / 2)
                }), t.one("layoutready", n.ready), t.trigger({
                    type: "layoutready",
                    layout: t
                }), t.one("layoutstop", n.stop), void t.trigger({
                    type: "layoutstop",
                    layout: t
                });
                var p = t._private.system = r.ParticleSystem();
                p.parameters({
                    repulsion: n.repulsion,
                    stiffness: n.stiffness,
                    friction: n.friction,
                    gravity: n.gravity,
                    fps: n.fps,
                    dt: n.dt,
                    precision: n.precision
                }), n.animate && n.fit && s.fit(d, n.padding);
                var f, v = 250,
                    g = !1,
                    y = +new Date,
                    m = {
                        init: function(e) {},
                        redraw: function() {
                            var e = p.energy();
                            if (!n.infinite && null != n.stableEnergy && null != e && e.n > 0 && n.stableEnergy(e)) return void t.stop();
                            n.infinite || v == 1 / 0 || (clearTimeout(f), f = setTimeout(S, v));
                            var r = s.collection();
                            p.eachNode(function(e, t) {
                                var n = e.data,
                                    i = n.element;
                                null != i && (i.locked() || i.grabbed() || (i.silentPosition({
                                    x: d.x1 + t.x,
                                    y: d.y1 + t.y
                                }), r.merge(i)))
                            }), n.animate && r.length > 0 && (h = !0, r.rtrigger("position"), n.fit && s.fit(n.padding), y = +new Date, h = !1), g || (g = !0, t.one("layoutready", n.ready), t.trigger({
                                type: "layoutready",
                                layout: t
                            }))
                        }
                    };
                p.renderer = m, p.screenSize(d.w, d.h), p.screenPadding(n.padding, n.padding, n.padding, n.padding), p.screenStep(n.stepSize);
                var x;
                u.on("grab free position", x = function(e) {
                    if (!h) {
                        var t = this.position(),
                            i = p.fromScreen(t);
                        if (i) {
                            var a = r.Point(i.x, i.y),
                                o = n.padding;
                            switch (d.x1 + o <= t.x && t.x <= d.x2 - o && d.y1 + o <= t.y && t.y <= d.y2 - o && (this.scratch().arbor.p = a), e.type) {
                                case "grab":
                                    this.scratch().arbor.fixed = !0;
                                    break;
                                case "free":
                                    this.scratch().arbor.fixed = !1
                            }
                        }
                    }
                });
                var b;
                u.on("lock unlock", b = function(e) {
                    node.scratch().arbor.fixed = node.locked()
                });
                var w;
                l.on("remove", w = function(e) {});
                var _;
                s.on("add", "*", _ = function() {});
                var E;
                s.on("resize", E = function() {
                    if (null == n.boundingBox && null != t._private.system) {
                        var e = s.width(),
                            r = s.height();
                        p.screenSize(e, r)
                    }
                }), u.each(function(e, t) {
                    a(t)
                }), c.each(function(e, t) {
                    o(t)
                });
                var T = u.filter(":grabbable");
                n.ungrabifyWhileSimulating && T.ungrabify();
                var S = t._private.doneHandler = function() {
                    t._private.doneHandler = null, n.animate || (n.fit && s.reset(), u.rtrigger("position")), u.off("grab free position", x), u.off("lock unlock", b), l.off("remove", w), s.off("add", "*", _), s.off("resize", E), n.ungrabifyWhileSimulating && T.grabify(), t.one("layoutstop", n.stop), t.trigger({
                        type: "layoutstop",
                        layout: t
                    })
                };
                p.start(), !n.infinite && null != n.maxSimulationTime && n.maxSimulationTime > 0 && n.maxSimulationTime !== 1 / 0 && setTimeout(function() {
                    t.stop()
                }, n.maxSimulationTime)
            }), this
        }, t.prototype.stop = function() {
            return null != this._private.system && this._private.system.stop(), this._private.doneHandler && this._private.doneHandler(), this
        }, e("layout", "arbor", t)
    }(cytoscape),
    function(e) {
        "use strict";

        function t(t) {
            this.options = e.util.extend({}, n, t)
        }
        var n = {
            fit: !0,
            directed: !1,
            padding: 30,
            circle: !1,
            spacingFactor: 1.75,
            boundingBox: void 0,
            avoidOverlap: !0,
            roots: void 0,
            maximalAdjustments: 0,
            animate: !1,
            animationDuration: 500,
            ready: void 0,
            stop: void 0
        };
        t.prototype.run = function() {
            var t, n = this.options,
                r = n,
                i = n.cy,
                a = r.eles,
                o = a.nodes().not(":parent"),
                s = a,
                l = e.util.makeBoundingBox(r.boundingBox ? r.boundingBox : {
                    x1: 0,
                    y1: 0,
                    w: i.width(),
                    h: i.height()
                });
            if (e.is.elementOrCollection(r.roots)) t = r.roots;
            else if (e.is.array(r.roots)) {
                for (var u = [], c = 0; c < r.roots.length; c++) {
                    var d = r.roots[c],
                        h = i.getElementById(d);
                    u.push(h)
                }
                t = new e.Collection(i, u)
            } else if (e.is.string(r.roots)) t = i.$(r.roots);
            else if (r.directed) t = o.roots();
            else {
                for (var p = [], f = o; f.length > 0;) {
                    var v = i.collection();
                    a.bfs({
                        roots: f[0],
                        visit: function(e, t, n, r, i) {
                            v = v.add(n)
                        },
                        directed: !1
                    }), f = f.not(v), p.push(v)
                }
                t = i.collection();
                for (var c = 0; c < p.length; c++) {
                    var g = p[c],
                        y = g.maxDegree(!1),
                        m = g.filter(function() {
                            return this.degree(!1) === y
                        });
                    t = t.add(m)
                }
            }
            var x = [],
                b = {},
                w = {},
                _ = {},
                E = {},
                T = {};
            s.bfs({
                roots: t,
                directed: r.directed,
                visit: function(e, t, n, r, i) {
                    var a = this[0],
                        o = a.id();
                    if (x[t] || (x[t] = []), x[t].push(a), b[o] = !0, w[o] = t, _[o] = i, E[o] = r, i) {
                        var s = i.id(),
                            l = T[s] = T[s] || [];
                        l.push(n)
                    }
                }
            });
            for (var S = [], c = 0; c < o.length; c++) {
                var h = o[c];
                b[h.id()] || S.push(h)
            }
            for (var C = 3 * S.length, k = 0; 0 !== S.length && C > k;) {
                for (var D = S.shift(), N = D.neighborhood().nodes(), P = !1, c = 0; c < N.length; c++) {
                    var M = w[N[c].id()];
                    if (void 0 !== M) {
                        x[M].push(D), P = !0;
                        break
                    }
                }
                P || S.push(D), k++
            }
            for (; 0 !== S.length;) {
                var D = S.shift(),
                    P = !1;
                P || (0 === x.length && x.push([]), x[0].push(D))
            }
            var B = function() {
                for (var e = 0; e < x.length; e++)
                    for (var t = x[e], n = 0; n < t.length; n++) {
                        var r = t[n];
                        r._private.scratch.breadthfirst = {
                            depth: e,
                            index: n
                        }
                    }
            };
            B();
            for (var L = function(e) {
                    for (var t, n = e.connectedEdges(function() {
                            return this.data("target") === e.id()
                        }), r = e._private.scratch.breadthfirst, i = 0, a = 0; a < n.length; a++) {
                        var o = n[a],
                            s = o.source()[0],
                            l = s._private.scratch.breadthfirst;
                        r.depth <= l.depth && i < l.depth && (i = l.depth, t = s)
                    }
                    return t
                }, O = 0; O < r.maximalAdjustments; O++) {
                for (var A = x.length, I = [], c = 0; A > c; c++)
                    for (var M = x[c], z = M.length, R = 0; z > R; R++) {
                        var h = M[R],
                            j = h._private.scratch.breadthfirst,
                            F = L(h);
                        F && (j.intEle = F, I.push(h))
                    }
                for (var c = 0; c < I.length; c++) {
                    var h = I[c],
                        j = h._private.scratch.breadthfirst,
                        F = j.intEle,
                        q = F._private.scratch.breadthfirst;
                    x[j.depth].splice(j.index, 1);
                    for (var V = q.depth + 1; V > x.length - 1;) x.push([]);
                    x[V].push(h), j.depth = V, j.index = x[V].length - 1
                }
                B()
            }
            var X = 0;
            if (r.avoidOverlap) {
                for (var c = 0; c < o.length; c++) {
                    var H = o[c].outerWidth(),
                        Y = o[c].outerHeight();
                    X = Math.max(X, H, Y)
                }
                X *= r.spacingFactor
            }
            for (var $ = {}, W = function(e) {
                    if ($[e.id()]) return $[e.id()];
                    for (var t = e._private.scratch.breadthfirst.depth, n = e.neighborhood().nodes().not(":parent"), r = 0, i = 0, a = 0; a < n.length; a++) {
                        var o = n[a],
                            s = o._private.scratch.breadthfirst,
                            l = s.index,
                            u = s.depth,
                            c = x[u].length;
                        (t > u || 0 === t) && (r += l / c, i++)
                    }
                    return i = Math.max(1, i), r /= i, 0 === i && (r = void 0), $[e.id()] = r, r
                }, U = function(e, t) {
                    var n = W(e),
                        r = W(t);
                    return n - r
                }, Z = 0; 3 > Z; Z++) {
                for (var c = 0; c < x.length; c++) x[c] = x[c].sort(U);
                B()
            }
            for (var G = 0, c = 0; c < x.length; c++) G = Math.max(x[c].length, G);
            for (var K = {
                    x: l.x1 + l.w / 2,
                    y: l.x1 + l.h / 2
                }, J = function(e, t) {
                    var n = e._private.scratch.breadthfirst,
                        i = n.depth,
                        a = n.index,
                        o = x[i].length,
                        s = Math.max(l.w / (o + 1), X),
                        u = Math.max(l.h / (x.length + 1), X),
                        c = Math.min(l.w / 2 / x.length, l.h / 2 / x.length);
                    if (c = Math.max(c, X), r.circle) {
                        if (r.circle) {
                            var d = c * i + c - (x.length > 0 && x[0].length <= 3 ? c / 2 : 0),
                                h = 2 * Math.PI / x[i].length * a;
                            return 0 === i && 1 === x[0].length && (d = 1), {
                                x: K.x + d * Math.cos(h),
                                y: K.y + d * Math.sin(h)
                            }
                        }
                        return {
                            x: K.x + (a + 1 - (o + 1) / 2) * s,
                            y: (i + 1) * u
                        }
                    }
                    var p = {
                        x: K.x + (a + 1 - (o + 1) / 2) * s,
                        y: (i + 1) * u
                    };
                    return t ? p : p
                }, Q = {}, c = x.length - 1; c >= 0; c--)
                for (var M = x[c], R = 0; R < M.length; R++) {
                    var D = M[R];
                    Q[D.id()] = J(D, c === x.length - 1)
                }
            return o.layoutPositions(this, r, function() {
                return Q[this.id()]
            }), this
        }, e("layout", "breadthfirst", t)
    }(cytoscape),
    function(e) {
        "use strict";

        function t(t) {
            this.options = e.util.extend({}, n, t)
        }
        var n = {
            fit: !0,
            padding: 30,
            boundingBox: void 0,
            avoidOverlap: !0,
            radius: void 0,
            startAngle: 1.5 * Math.PI,
            counterclockwise: !1,
            sort: void 0,
            animate: !1,
            animationDuration: 500,
            ready: void 0,
            stop: void 0
        };
        t.prototype.run = function() {
            var t = this.options,
                n = t,
                r = t.cy,
                i = n.eles,
                a = i.nodes().not(":parent");
            n.sort && (a = a.sort(n.sort));
            for (var o, s = e.util.makeBoundingBox(n.boundingBox ? n.boundingBox : {
                    x1: 0,
                    y1: 0,
                    w: r.width(),
                    h: r.height()
                }), l = {
                    x: s.x1 + s.w / 2,
                    y: s.y1 + s.h / 2
                }, u = n.startAngle, c = 2 * Math.PI / a.length, d = 0, h = 0; h < a.length; h++) {
                var p = a[h].outerWidth(),
                    f = a[h].outerHeight();
                d = Math.max(d, p, f)
            }
            if (o = e.is.number(n.radius) ? n.radius : a.length <= 1 ? 0 : Math.min(s.h, s.w) / 2 - d, a.length > 1 && n.avoidOverlap) {
                d *= 1.75;
                var c = 2 * Math.PI / a.length,
                    v = Math.cos(c) - Math.cos(0),
                    g = Math.sin(c) - Math.sin(0),
                    y = Math.sqrt(d * d / (v * v + g * g));
                o = Math.max(y, o)
            }
            var m = function(e, t) {
                var r = o * Math.cos(u),
                    i = o * Math.sin(u),
                    a = {
                        x: l.x + r,
                        y: l.y + i
                    };
                return u = n.counterclockwise ? u - c : u + c, a
            };
            return a.layoutPositions(this, n, m), this
        }, e("layout", "circle", t)
    }(cytoscape),
    function(e) {
        "use strict";

        function t(t) {
            this.options = e.util.extend(!0, {}, n, t)
        }
        var n = {
            animate: !0,
            refresh: 1,
            maxSimulationTime: 4e3,
            ungrabifyWhileSimulating: !1,
            fit: !0,
            padding: 30,
            boundingBox: void 0,
            ready: function() {},
            stop: function() {},
            randomize: !1,
            avoidOverlap: !0,
            handleDisconnected: !0,
            nodeSpacing: function(e) {
                return 10
            },
            flow: void 0,
            alignment: void 0,
            edgeLength: void 0,
            edgeSymDiffLength: void 0,
            edgeJaccardLength: void 0,
            unconstrIter: void 0,
            userConstIter: void 0,
            allConstIter: void 0,
            infinite: !1
        };
        t.prototype.run = function() {
            var t = this,
                n = this.options;
            return t.manuallyStopped = !1, e.util.require("cola", function(r) {
                var i = n.cy,
                    a = n.eles,
                    o = a.nodes(),
                    s = a.edges(),
                    l = !1,
                    u = e.util.makeBoundingBox(n.boundingBox ? n.boundingBox : {
                        x1: 0,
                        y1: 0,
                        w: i.width(),
                        h: i.height()
                    }),
                    c = function(t, n) {
                        if (e.is.fn(t)) {
                            var r = t;
                            return r.apply(n, [n])
                        }
                        return t
                    },
                    d = function() {
                        for (var t = {
                                min: 1 / 0,
                                max: -(1 / 0)
                            }, r = {
                                min: 1 / 0,
                                max: -(1 / 0)
                            }, a = 0; a < o.length; a++) {
                            var s = o[a],
                                d = s._private.scratch.cola;
                            if (t.min = Math.min(t.min, d.x || 0), t.max = Math.max(t.max, d.x || 0), r.min = Math.min(r.min, d.y || 0), r.max = Math.max(r.max, d.y || 0), !d.updatedDims) {
                                var h = s.boundingBox(),
                                    f = c(n.nodeSpacing, s);
                                d.width = h.w + 2 * f, d.height = h.h + 2 * f
                            }
                        }
                        o.positions(function(n, i) {
                            var a, o = i._private.scratch.cola;
                            return i.grabbed() || i.isParent() || (a = {
                                x: u.x1 + o.x - t.min,
                                y: u.y1 + o.y - r.min
                            }, e.is.number(a.x) && e.is.number(a.y) || (a = void 0)), a
                        }), o.updateCompoundBounds(), l || (p(), l = !0), n.fit && i.fit(n.padding)
                    },
                    h = function() {
                        n.ungrabifyWhileSimulating && y.grabify(), o.off("grab free position", m), o.off("lock unlock", x), t.one("layoutstop", n.stop), t.trigger({
                            type: "layoutstop",
                            layout: t
                        })
                    },
                    p = function() {
                        t.one("layoutready", n.ready), t.trigger({
                            type: "layoutready",
                            layout: t
                        })
                    },
                    f = n.refresh,
                    v = 1;
                n.refresh < 0 ? (v = Math.abs(n.refresh), f = 1) : f = Math.max(1, f);
                var g = t.adaptor = r.adaptor({
                    trigger: function(e) {
                        var t = r.EventType ? r.EventType.tick : null,
                            i = r.EventType ? r.EventType.end : null;
                        switch (e.type) {
                            case "tick":
                            case t:
                                n.animate && d();
                                break;
                            case "end":
                            case i:
                                d(), n.infinite || h()
                        }
                    },
                    kick: function() {
                        var r = function() {
                                if (t.manuallyStopped) return h(), !0;
                                var e = g.tick();
                                return e && n.infinite && g.resume(), e
                            },
                            i = function() {
                                for (var e, t = 0; f > t && !e; t++) e = e || r();
                                return e
                            };
                        if (n.animate) {
                            var a = function() {
                                i() || e.util.requestAnimationFrame(a)
                            };
                            e.util.requestAnimationFrame(a)
                        } else
                            for (; !r(););
                    },
                    on: function(e, t) {},
                    drag: function() {}
                });
                t.adaptor = g;
                var y = o.filter(":grabbable");
                n.ungrabifyWhileSimulating && y.ungrabify();
                var m;
                o.on("grab free position", m = function(t) {
                    var n = this,
                        r = n._private.scratch.cola,
                        i = n._private.position;
                    switch (n.grabbed() ? (r.x = i.x - u.x1, r.y = i.y - u.y1, g.dragstart(r)) : e.is.number(r.x) && e.is.number(r.y) && (i.x = r.x + u.x1, i.y = r.y + u.y1), t.type) {
                        case "grab":
                            g.dragstart(r), g.resume();
                            break;
                        case "free":
                            g.dragend(r)
                    }
                });
                var x;
                o.on("lock unlock", x = function(e) {
                    var t = this,
                        n = t._private.scratch.cola;
                    t.locked() ? g.dragstart(n) : g.dragend(n)
                });
                var b = o.stdFilter(function(e) {
                    return !e.isParent()
                });
                if (g.nodes(b.map(function(e, t) {
                        var r = c(n.nodeSpacing, e),
                            i = e.position(),
                            a = e.boundingBox(),
                            o = e._private.scratch.cola = {
                                x: n.randomize || void 0 === i.x ? Math.round(Math.random() * u.w) : i.x,
                                y: n.randomize || void 0 === i.y ? Math.round(Math.random() * u.h) : i.y,
                                width: a.w + 2 * r,
                                height: a.h + 2 * r,
                                index: t
                            };
                        return o
                    })), n.alignment) {
                    var w = [],
                        _ = [];
                    b.forEach(function(e) {
                        var t = c(n.alignment, e),
                            r = e._private.scratch.cola,
                            i = r.index;
                        t && (null != t.x && w.push({
                            node: i,
                            offset: t.x
                        }), null != t.y && _.push({
                            node: i,
                            offset: t.y
                        }))
                    });
                    var E = [];
                    w.length > 0 && E.push({
                        type: "alignment",
                        axis: "x",
                        offsets: w
                    }), _.length > 0 && E.push({
                        type: "alignment",
                        axis: "y",
                        offsets: _
                    }), g.constraints(E)
                }
                g.groups(o.stdFilter(function(e) {
                    return e.isParent()
                }).map(function(e, t) {
                    var r = e._private.style,
                        i = c(n.nodeSpacing, e),
                        a = r["padding-left"].pxValue + i,
                        o = r["padding-right"].pxValue + i,
                        s = r["padding-top"].pxValue + i,
                        l = r["padding-bottom"].pxValue + i;
                    return e._private.scratch.cola = {
                        index: t,
                        padding: Math.max(a, o, s, l),
                        leaves: e.descendants().stdFilter(function(e) {
                            return !e.isParent()
                        }).map(function(e) {
                            return e[0]._private.scratch.cola.index
                        })
                    }, e
                }).map(function(e) {
                    return e._private.scratch.cola.groups = e.descendants().stdFilter(function(e) {
                        return e.isParent()
                    }).map(function(e) {
                        return e._private.scratch.cola.index
                    }), e._private.scratch.cola
                }));
                var T, S;
                null != n.edgeLength ? (T = n.edgeLength, S = "linkDistance") : null != n.edgeSymDiffLength ? (T = n.edgeSymDiffLength, S = "symmetricDiffLinkLengths") : null != n.edgeJaccardLength ? (T = n.edgeJaccardLength, S = "jaccardLinkLengths") : (T = 100, S = "linkDistance");
                var C = function(e) {
                    return e.calcLength
                };
                if (g.links(s.stdFilter(function(e) {
                        return !e.source().isParent() && !e.target().isParent()
                    }).map(function(e, t) {
                        var n = e._private.scratch.cola = {
                            source: e.source()[0]._private.scratch.cola.index,
                            target: e.target()[0]._private.scratch.cola.index
                        };
                        return null != T && (n.calcLength = c(T, e)), n
                    })), g.size([u.w, u.h]), null != T && g[S](C), n.flow) {
                    var k, D = "y",
                        N = 50;
                    e.is.string(n.flow) ? k = {
                        axis: n.flow,
                        minSeparation: N
                    } : e.is.number(n.flow) ? k = {
                        axis: D,
                        minSeparation: n.flow
                    } : e.is.plainObject(n.flow) ? (k = n.flow, k.axis = k.axis || D, k.minSeparation = null != k.minSeparation ? k.minSeparation : N) : k = {
                        axis: D,
                        minSeparation: N
                    }, g.flowLayout(k.axis, k.minSeparation)
                }
                t.trigger({
                    type: "layoutstart",
                    layout: t
                }), g.avoidOverlaps(n.avoidOverlap).handleDisconnected(n.handleDisconnected).start(n.unconstrIter, n.userConstIter, n.allConstIter), n.infinite || setTimeout(function() {
                    t.manuallyStopped || g.stop()
                }, n.maxSimulationTime)
            }), this
        }, t.prototype.stop = function() {
            return this.adaptor && (this.manuallyStopped = !0, this.adaptor.stop()), this
        }, e("layout", "cola", t)
    }(cytoscape),
    function(e) {
        "use strict";

        function t(t) {
            this.options = e.util.extend({}, n, t)
        }
        var n = {
            fit: !0,
            padding: 30,
            startAngle: 1.5 * Math.PI,
            counterclockwise: !1,
            minNodeSpacing: 10,
            boundingBox: void 0,
            avoidOverlap: !0,
            height: void 0,
            width: void 0,
            concentric: function(e) {
                return e.degree()
            },
            levelWidth: function(e) {
                return e.maxDegree() / 4
            },
            animate: !1,
            animationDuration: 500,
            ready: void 0,
            stop: void 0
        };
        t.prototype.run = function() {
            for (var t = this.options, n = t, r = t.cy, i = n.eles, a = i.nodes().not(":parent"), o = e.util.makeBoundingBox(n.boundingBox ? n.boundingBox : {
                    x1: 0,
                    y1: 0,
                    w: r.width(),
                    h: r.height()
                }), s = {
                    x: o.x1 + o.w / 2,
                    y: o.y1 + o.h / 2
                }, l = [], u = n.startAngle, c = 0, d = 0; d < a.length; d++) {
                var h, p = a[d];
                h = n.concentric.apply(p, [p]), l.push({
                    value: h,
                    node: p
                }), p._private.scratch.concentric = h
            }
            a.updateStyle();
            for (var d = 0; d < a.length; d++) {
                var p = a[d];
                c = Math.max(c, p.outerWidth(), p.outerHeight())
            }
            l.sort(function(e, t) {
                return t.value - e.value
            });
            for (var f = n.levelWidth(a), v = [
                    []
                ], g = v[0], d = 0; d < l.length; d++) {
                var y = l[d];
                if (g.length > 0) {
                    var m = Math.abs(g[0].value - y.value);
                    m >= f && (g = [], v.push(g))
                }
                g.push(y)
            }
            var x = {},
                b = 0,
                w = c + n.minNodeSpacing;
            if (!n.avoidOverlap) {
                var _ = v.length > 0 && v[0].length > 1,
                    E = Math.min(o.w, o.h) / 2 - w,
                    T = E / (v.length + _ ? 1 : 0);
                w = Math.min(w, T)
            }
            for (var d = 0; d < v.length; d++) {
                var S = v[d],
                    C = 2 * Math.PI / S.length;
                if (S.length > 1 && n.avoidOverlap) {
                    var k = Math.cos(C) - Math.cos(0),
                        D = Math.sin(C) - Math.sin(0),
                        N = Math.sqrt(w * w / (k * k + D * D));
                    b = Math.max(N, b)
                }
                for (var P = 0; P < S.length; P++) {
                    var y = S[P],
                        u = n.startAngle + (n.counterclockwise ? -1 : 1) * C * P,
                        M = {
                            x: s.x + b * Math.cos(u),
                            y: s.y + b * Math.sin(u)
                        };
                    x[y.node.id()] = M
                }
                b += w
            }
            return a.layoutPositions(this, n, function() {
                var e = this.id();
                return x[e]
            }), this
        }, e("layout", "concentric", t)
    }(cytoscape),
    function(e) {
        "use strict";

        function t(t) {
            this.options = e.util.extend({}, r, t)
        }
        var n, r = {
            ready: function() {},
            stop: function() {},
            animate: !0,
            refresh: 4,
            fit: !0,
            padding: 30,
            boundingBox: void 0,
            randomize: !0,
            debug: !1,
            nodeRepulsion: 4e5,
            nodeOverlap: 10,
            idealEdgeLength: 10,
            edgeElasticity: 100,
            nestingFactor: 5,
            gravity: 250,
            numIter: 100,
            initialTemp: 200,
            coolingFactor: .95,
            minTemp: 1
        };
        t.prototype.run = function() {
            var t = this.options,
                r = t.cy,
                a = this;
            a.stopped = !1, a.trigger({
                type: "layoutstart",
                layout: a
            }), n = !0 === t.debug ? !0 : !1;
            var o = new Date,
                d = i(r, a, t);
            n && s(d), !0 === t.randomize && l(d, r), m(d, r, t);
            var h = function(e) {
                    return a.stopped ? !1 : (c(d, r, t, e), d.temperature = d.temperature * t.coolingFactor, d.temperature < t.minTemp ? !1 : !0)
                },
                p = function() {
                    u(d, r, t), !0 === t.fit && r.fit(t.padding);
                    var e = new Date;
                    console.info("Layout took " + (e - o) + " ms"), a.one("layoutstop", t.stop), a.trigger({
                        type: "layoutstop",
                        layout: a
                    })
                };
            if (t.animate) {
                var f = 0,
                    v = function() {
                        for (var n, i = 0; i < t.refresh && f < t.numIter;) {
                            var n = h(f);
                            if (n === !1) break;
                            i++, f++
                        }
                        u(d, r, t), t.fit && r.fit(t.padding), n !== !1 && f + 1 < t.numIter ? e.util.requestAnimationFrame(v) : p()
                    };
                e.util.requestAnimationFrame(v)
            } else {
                for (var f = 0; f < t.numIter && h(f) !== !1; f++);
                p()
            }
            return this
        }, t.prototype.stop = function() {
            return this.stopped = !0, this
        };
        var i = function(t, n, r) {
                for (var i = r.eles.edges(), o = r.eles.nodes(), s = {
                        layout: n,
                        layoutNodes: [],
                        idToIndex: {},
                        nodeSize: o.size(),
                        graphSet: [],
                        indexToGraph: [],
                        layoutEdges: [],
                        edgeSize: i.size(),
                        temperature: r.initialTemp,
                        clientWidth: t.width(),
                        clientHeight: t.width(),
                        boundingBox: e.util.makeBoundingBox(r.boundingBox ? r.boundingBox : {
                            x1: 0,
                            y1: 0,
                            w: t.width(),
                            h: t.height()
                        })
                    }, l = 0; l < s.nodeSize; l++) {
                    var u = {};
                    u.id = o[l].data("id"), u.parentId = o[l].data("parent"), u.children = [], u.positionX = o[l].position("x"), u.positionY = o[l].position("y"), u.offsetX = 0, u.offsetY = 0, u.height = o[l].height(), u.width = o[l].width(), u.maxX = u.positionX + u.width / 2, u.minX = u.positionX - u.width / 2, u.maxY = u.positionY + u.height / 2, u.minY = u.positionY - u.height / 2, u.padLeft = o[l]._private.style["padding-left"].pxValue, u.padRight = o[l]._private.style["padding-right"].pxValue, u.padTop = o[l]._private.style["padding-top"].pxValue, u.padBottom = o[l]._private.style["padding-bottom"].pxValue, s.layoutNodes.push(u), s.idToIndex[u.id] = l
                }
                for (var c = [], d = 0, h = -1, p = [], l = 0; l < s.nodeSize; l++) {
                    var f = s.layoutNodes[l],
                        v = f.parentId;
                    null != v ? s.layoutNodes[s.idToIndex[v]].children.push(f.id) : (c[++h] = f.id, p.push(f.id))
                }
                for (s.graphSet.push(p); h >= d;) {
                    var g = c[d++],
                        y = s.idToIndex[g],
                        m = s.layoutNodes[y],
                        x = m.children;
                    if (x.length > 0) {
                        s.graphSet.push(x);
                        for (var l = 0; l < x.length; l++) c[++h] = x[l]
                    }
                }
                for (var l = 0; l < s.graphSet.length; l++)
                    for (var b = s.graphSet[l], w = 0; w < b.length; w++) {
                        var _ = s.idToIndex[b[w]];
                        s.indexToGraph[_] = l
                    }
                for (var l = 0; l < s.edgeSize; l++) {
                    var E = i[l],
                        T = {};
                    T.id = E.data("id"), T.sourceId = E.data("source"), T.targetId = E.data("target");
                    var S = r.idealEdgeLength,
                        C = s.idToIndex[T.sourceId],
                        k = s.idToIndex[T.targetId],
                        D = s.indexToGraph[C],
                        N = s.indexToGraph[k];
                    if (D != N) {
                        for (var P = a(T.sourceId, T.targetId, s), M = s.graphSet[P], B = 0, u = s.layoutNodes[C]; - 1 === $.inArray(u.id, M);) u = s.layoutNodes[s.idToIndex[u.parentId]], B++;
                        for (u = s.layoutNodes[k]; - 1 === $.inArray(u.id, M);) u = s.layoutNodes[s.idToIndex[u.parentId]], B++;
                        S *= B * r.nestingFactor
                    }
                    T.idealLength = S, s.layoutEdges.push(T)
                }
                return s
            },
            a = function(e, t, n) {
                var r = o(e, t, 0, n);
                return 2 > r.count ? 0 : r.graph
            },
            o = function(e, t, n, r) {
                var i = r.graphSet[n];
                if (-1 < $.inArray(e, i) && -1 < $.inArray(t, i)) return {
                    count: 2,
                    graph: n
                };
                for (var a = 0, s = 0; s < i.length; s++) {
                    var l = i[s],
                        u = r.idToIndex[l],
                        c = r.layoutNodes[u].children;
                    if (0 !== c.length) {
                        var d = r.indexToGraph[r.idToIndex[c[0]]],
                            h = o(e, t, d, r);
                        if (0 !== h.count) {
                            if (1 !== h.count) return h;
                            if (a++, 2 === a) break
                        }
                    }
                }
                return {
                    count: a,
                    graph: n
                }
            },
            s = function(e) {
                if (n) {
                    console.debug("layoutNodes:");
                    for (var t = 0; t < e.nodeSize; t++) {
                        var r = e.layoutNodes[t],
                            i = "\nindex: " + t + "\nId: " + r.id + "\nChildren: " + r.children.toString() + "\nparentId: " + r.parentId + "\npositionX: " + r.positionX + "\npositionY: " + r.positionY + "\nOffsetX: " + r.offsetX + "\nOffsetY: " + r.offsetY + "\npadLeft: " + r.padLeft + "\npadRight: " + r.padRight + "\npadTop: " + r.padTop + "\npadBottom: " + r.padBottom;
                        console.debug(i)
                    }
                    console.debug("idToIndex");
                    for (var t in e.idToIndex) console.debug("Id: " + t + "\nIndex: " + e.idToIndex[t]);
                    console.debug("Graph Set");
                    for (var a = e.graphSet, t = 0; t < a.length; t++) console.debug("Set : " + t + ": " + a[t].toString());
                    for (var i = "IndexToGraph", t = 0; t < e.indexToGraph.length; t++) i += "\nIndex : " + t + " Graph: " + e.indexToGraph[t];
                    console.debug(i), i = "Layout Edges";
                    for (var t = 0; t < e.layoutEdges.length; t++) {
                        var o = e.layoutEdges[t];
                        i += "\nEdge Index: " + t + " ID: " + o.id + " SouceID: " + o.sourceId + " TargetId: " + o.targetId + " Ideal Length: " + o.idealLength
                    }
                    console.debug(i), i = "nodeSize: " + e.nodeSize, i += "\nedgeSize: " + e.edgeSize, i += "\ntemperature: " + e.temperature, console.debug(i)
                }
            },
            l = function(e, t) {
                for (var n = e.clientWidth, r = e.clientHeight, i = 0; i < e.nodeSize; i++) {
                    var a = e.layoutNodes[i];
                    a.positionX = Math.random() * n, a.positionY = Math.random() * r
                }
            },
            u = function(e, t, n) {
                var r = e.layout,
                    i = n.eles.nodes(),
                    a = e.boundingBox,
                    o = {
                        x1: 1 / 0,
                        x2: -(1 / 0),
                        y1: 1 / 0,
                        y2: -(1 / 0)
                    };
                n.boundingBox && (i.forEach(function(t) {
                    var n = e.layoutNodes[e.idToIndex[t.data("id")]];
                    o.x1 = Math.min(o.x1, n.positionX), o.x2 = Math.max(o.x2, n.positionX), o.y1 = Math.min(o.y1, n.positionY), o.y2 = Math.max(o.y2, n.positionY)
                }), o.w = o.x2 - o.x1, o.h = o.y2 - o.y1), i.positions(function(t, r) {
                    var i = e.layoutNodes[e.idToIndex[r.data("id")]];
                    if (n.boundingBox) {
                        var s = (i.positionX - o.x1) / o.w,
                            l = (i.positionY - o.y1) / o.h;
                        return {
                            x: a.x1 + s * a.w,
                            y: a.y1 + l * a.h
                        }
                    }
                    return {
                        x: i.positionX,
                        y: i.positionY
                    }
                }), !0 !== e.ready && (e.ready = !0, r.one("layoutready", n.ready), r.trigger({
                    type: "layoutready",
                    layout: this
                }))
            },
            c = function(e, t, n, r) {
                d(e, t, n), v(e, t, n), g(e, t, n), y(e, t, n), m(e, t, n)
            },
            d = function(e, t, n) {
                for (var r = 0; r < e.graphSet.length; r++)
                    for (var i = e.graphSet[r], a = i.length, o = 0; a > o; o++)
                        for (var s = e.layoutNodes[e.idToIndex[i[o]]], l = o + 1; a > l; l++) {
                            var u = e.layoutNodes[e.idToIndex[i[l]]];
                            h(s, u, e, t, n)
                        }
            },
            h = function(e, t, n, r, i) {
                var a = t.positionX - e.positionX,
                    o = t.positionY - e.positionY;
                if (0 !== a || 0 !== o) {
                    var s = f(e, t, a, o);
                    if (s > 0) var l = i.nodeOverlap * s,
                        u = Math.sqrt(a * a + o * o),
                        c = l * a / u,
                        d = l * o / u;
                    else var h = p(e, a, o),
                        v = p(t, -1 * a, -1 * o),
                        g = v.x - h.x,
                        y = v.y - h.y,
                        m = g * g + y * y,
                        u = Math.sqrt(m),
                        l = i.nodeRepulsion / m,
                        c = l * g / u,
                        d = l * y / u;
                    e.offsetX -= c, e.offsetY -= d, t.offsetX += c, t.offsetY += d
                }
            },
            p = function(e, t, n) {
                var r = e.positionX,
                    i = e.positionY,
                    a = e.height,
                    o = e.width,
                    s = n / t,
                    l = a / o,
                    u = {};
                do {
                    if (0 === t && n > 0) {
                        u.x = r, u.y = i + a / 2;
                        break
                    }
                    if (0 === t && 0 > n) {
                        u.x = r, u.y = i + a / 2;
                        break
                    }
                    if (t > 0 && s >= -1 * l && l >= s) {
                        u.x = r + o / 2, u.y = i + o * n / 2 / t;
                        break
                    }
                    if (0 > t && s >= -1 * l && l >= s) {
                        u.x = r - o / 2, u.y = i - o * n / 2 / t;
                        break
                    }
                    if (n > 0 && (-1 * l >= s || s >= l)) {
                        u.x = r + a * t / 2 / n, u.y = i + a / 2;
                        break
                    }
                    if (0 > n && (-1 * l >= s || s >= l)) {
                        u.x = r - a * t / 2 / n, u.y = i - a / 2;
                        break
                    }
                } while (!1);
                return u
            },
            f = function(e, t, n, r) {
                if (n > 0) var i = e.maxX - t.minX;
                else var i = t.maxX - e.minX;
                if (r > 0) var a = e.maxY - t.minY;
                else var a = t.maxY - e.minY;
                return i >= 0 && a >= 0 ? Math.sqrt(i * i + a * a) : 0
            },
            v = function(e, t, n) {
                for (var r = 0; r < e.edgeSize; r++) {
                    var i = e.layoutEdges[r],
                        a = e.idToIndex[i.sourceId],
                        o = e.layoutNodes[a],
                        s = e.idToIndex[i.targetId],
                        l = e.layoutNodes[s],
                        u = l.positionX - o.positionX,
                        c = l.positionY - o.positionY;
                    if (0 === u && 0 === c) return;
                    var d = p(o, u, c),
                        h = p(l, -1 * u, -1 * c),
                        f = h.x - d.x,
                        v = h.y - d.y,
                        g = Math.sqrt(f * f + v * v),
                        y = Math.pow(i.idealLength - g, 2) / n.edgeElasticity;
                    if (0 !== g) var m = y * f / g,
                        x = y * v / g;
                    else var m = 0,
                        x = 0;
                    o.offsetX += m, o.offsetY += x, l.offsetX -= m, l.offsetY -= x
                }
            },
            g = function(e, t, n) {
                for (var r = 0; r < e.graphSet.length; r++) {
                    var i = e.graphSet[r],
                        a = i.length;
                    if (0 === r) var o = e.clientHeight / 2,
                        s = e.clientWidth / 2;
                    else var l = e.layoutNodes[e.idToIndex[i[0]]],
                        u = e.layoutNodes[e.idToIndex[l.parentId]],
                        o = u.positionX,
                        s = u.positionY;
                    for (var c = 0; a > c; c++) {
                        var d = e.layoutNodes[e.idToIndex[i[c]]],
                            h = o - d.positionX,
                            p = s - d.positionY,
                            f = Math.sqrt(h * h + p * p);
                        if (f > 1) {
                            var v = n.gravity * h / f,
                                g = n.gravity * p / f;
                            d.offsetX += v, d.offsetY += g
                        }
                    }
                }
            },
            y = function(e, t, n) {
                var r = [],
                    i = 0,
                    a = -1;
                for (r.push.apply(r, e.graphSet[0]), a += e.graphSet[0].length; a >= i;) {
                    var o = r[i++],
                        s = e.idToIndex[o],
                        l = e.layoutNodes[s],
                        u = l.children;
                    if (0 < u.length) {
                        for (var c = l.offsetX, d = l.offsetY, h = 0; h < u.length; h++) {
                            var p = e.layoutNodes[e.idToIndex[u[h]]];
                            p.offsetX += c, p.offsetY += d, r[++a] = u[h]
                        }
                        l.offsetX = 0, l.offsetY = 0
                    }
                }
            },
            m = function(e, t, n) {
                for (var r = 0; r < e.nodeSize; r++) {
                    var i = e.layoutNodes[r];
                    0 < i.children.length && (i.maxX = void 0, i.minX = void 0, i.maxY = void 0, i.minY = void 0)
                }
                for (var r = 0; r < e.nodeSize; r++) {
                    var i = e.layoutNodes[r];
                    if (!(0 < i.children.length)) {
                        var a = x(i.offsetX, i.offsetY, e.temperature);
                        i.positionX += a.x, i.positionY += a.y, i.offsetX = 0, i.offsetY = 0, i.minX = i.positionX - i.width, i.maxX = i.positionX + i.width, i.minY = i.positionY - i.height, i.maxY = i.positionY + i.height, b(i, e)
                    }
                }
                for (var r = 0; r < e.nodeSize; r++) {
                    var i = e.layoutNodes[r];
                    0 < i.children.length && (i.positionX = (i.maxX + i.minX) / 2, i.positionY = (i.maxY + i.minY) / 2, i.width = i.maxX - i.minX, i.height = i.maxY - i.minY)
                }
            },
            x = function(e, t, n) {
                var r = Math.sqrt(e * e + t * t);
                if (r > n) var i = {
                    x: n * e / r,
                    y: n * t / r
                };
                else var i = {
                    x: e,
                    y: t
                };
                return i
            },
            b = function(e, t) {
                var n = e.parentId;
                if (null != n) {
                    var r = t.layoutNodes[t.idToIndex[n]],
                        i = !1;
                    return (null == r.maxX || e.maxX + r.padRight > r.maxX) && (r.maxX = e.maxX + r.padRight, i = !0), (null == r.minX || e.minX - r.padLeft < r.minX) && (r.minX = e.minX - r.padLeft, i = !0), (null == r.maxY || e.maxY + r.padBottom > r.maxY) && (r.maxY = e.maxY + r.padBottom, i = !0), (null == r.minY || e.minY - r.padTop < r.minY) && (r.minY = e.minY - r.padTop, i = !0), i ? b(r, t) : void 0
                }
            };
        e("layout", "cose", t)
    }(cytoscape),
    function(e) {
        "use strict";

        function t(t) {
            this.options = e.util.extend(!0, {}, n, t)
        }
        var n = {
            nodeSep: void 0,
            edgeSep: void 0,
            rankSep: void 0,
            rankDir: void 0,
            minLen: function(e) {
                return 1
            },
            edgeWeight: function(e) {
                return 1
            },
            fit: !0,
            padding: 30,
            animate: !1,
            animationDuration: 500,
            boundingBox: void 0,
            ready: function() {},
            stop: function() {}
        };
        t.prototype.run = function() {
            var t = this.options,
                n = this;
            return e.util.require("dagre", function(r) {
                var i = t.cy,
                    a = t.eles,
                    o = function(t, n) {
                        return e.is.fn(n) ? n.apply(t, [t]) : n
                    },
                    s = e.util.makeBoundingBox(t.boundingBox ? t.boundingBox : {
                        x1: 0,
                        y1: 0,
                        w: i.width(),
                        h: i.height()
                    }),
                    l = new r.graphlib.Graph({
                        multigraph: !0,
                        compound: !0
                    }),
                    u = {},
                    c = function(e, t) {
                        null != t && (u[e] = t)
                    };
                c("nodesep", t.nodeSep), c("edgesep", t.edgeSep), c("ranksep", t.rankSep), c("rankdir", t.rankDir), l.setGraph(u), l.setDefaultEdgeLabel(function() {
                    return {}
                }), l.setDefaultNodeLabel(function() {
                    return {}
                });
                for (var d = a.nodes(), h = 0; h < d.length; h++) {
                    var p = d[h];
                    l.setNode(p.id(), {
                        width: p.width(),
                        height: p.height(),
                        name: p.id()
                    })
                }
                for (var h = 0; h < d.length; h++) {
                    var p = d[h];
                    p.isChild() && l.setParent(p.id(), p.parent().id())
                }
                for (var f = a.edges().stdFilter(function(e) {
                        return !e.source().isParent() && !e.target().isParent()
                    }), h = 0; h < f.length; h++) {
                    var v = f[h];
                    l.setEdge(v.source().id(), v.target().id(), {
                        minlen: o(v, t.minLen),
                        weight: o(v, t.edgeWeight),
                        name: v.id()
                    }, v.id())
                }
                r.layout(l);
                for (var g = l.nodes(), h = 0; h < g.length; h++) {
                    var y = g[h],
                        m = l.node(y);
                    i.getElementById(y).scratch().dagre = m
                }
                var x;
                t.boundingBox ? (x = {
                    x1: 1 / 0,
                    x2: -(1 / 0),
                    y1: 1 / 0,
                    y2: -(1 / 0)
                }, d.forEach(function(e) {
                    var t = e.scratch().dagre;
                    x.x1 = Math.min(x.x1, t.x), x.x2 = Math.max(x.x2, t.x), x.y1 = Math.min(x.y1, t.y), x.y2 = Math.max(x.y2, t.y)
                }), x.w = x.x2 - x.x1, x.h = x.y2 - x.y1) : x = s;
                var b = function(e) {
                    if (t.boundingBox) {
                        var n = (e.x - x.x1) / x.w,
                            r = (e.y - x.y1) / x.h;
                        return {
                            x: s.x1 + n * s.w,
                            y: s.y1 + r * s.h
                        }
                    }
                    return e
                };
                d.layoutPositions(n, t, function() {
                    var e = this.scratch().dagre;
                    return b({
                        x: e.x,
                        y: e.y
                    })
                })
            }), this
        }, e("layout", "dagre", t)
    }(cytoscape),
    function(e) {
        "use strict";

        function t(t) {
            this.options = e.util.extend({}, n, t)
        }
        var n = {
            fit: !0,
            padding: 30,
            boundingBox: void 0,
            avoidOverlap: !0,
            rows: void 0,
            columns: void 0,
            position: function(e) {},
            sort: void 0,
            animate: !1,
            animationDuration: 500,
            ready: void 0,
            stop: void 0
        };
        t.prototype.run = function() {
            var t = this.options,
                n = t,
                r = t.cy,
                i = n.eles,
                a = i.nodes().not(":parent");
            n.sort && (a = a.sort(n.sort));
            var o = e.util.makeBoundingBox(n.boundingBox ? n.boundingBox : {
                x1: 0,
                y1: 0,
                w: r.width(),
                h: r.height()
            });
            if (0 === o.h || 0 === o.w) a.layoutPositions(this, n, function() {
                return {
                    x: o.x1,
                    y: o.y1
                }
            });
            else {
                var s = a.size(),
                    l = Math.sqrt(s * o.h / o.w),
                    u = Math.round(l),
                    c = Math.round(o.w / o.h * l),
                    d = function(e) {
                        if (null == e) return Math.min(u, c);
                        var t = Math.min(u, c);
                        t == u ? u = e : c = e
                    },
                    h = function(e) {
                        if (null == e) return Math.max(u, c);
                        var t = Math.max(u, c);
                        t == u ? u = e : c = e
                    };
                if (null != n.rows && null != n.columns) u = n.rows, c = n.columns;
                else if (null != n.rows && null == n.columns) u = n.rows, c = Math.ceil(s / u);
                else if (null == n.rows && null != n.columns) c = n.columns, u = Math.ceil(s / c);
                else if (c * u > s) {
                    var p = d(),
                        f = h();
                    (p - 1) * f >= s ? d(p - 1) : (f - 1) * p >= s && h(f - 1)
                } else
                    for (; s > c * u;) {
                        var p = d(),
                            f = h();
                        (f + 1) * p >= s ? h(f + 1) : d(p + 1)
                    }
                var v = o.w / c,
                    g = o.h / u;
                if (n.avoidOverlap)
                    for (var y = 0; y < a.length; y++) {
                        var m = a[y],
                            x = m.outerWidth(),
                            b = m.outerHeight();
                        v = Math.max(v, x), g = Math.max(g, b)
                    }
                for (var w = {}, _ = function(e, t) {
                        return w["c-" + e + "-" + t] ? !0 : !1
                    }, E = function(e, t) {
                        w["c-" + e + "-" + t] = !0
                    }, T = 0, S = 0, C = function() {
                        S++, S >= c && (S = 0, T++)
                    }, k = {}, y = 0; y < a.length; y++) {
                    var m = a[y],
                        D = n.position(m);
                    if (D && (void 0 !== D.row || void 0 !== D.col)) {
                        var N = {
                            row: D.row,
                            col: D.col
                        };
                        if (void 0 === N.col)
                            for (N.col = 0; _(N.row, N.col);) N.col++;
                        else if (void 0 === N.row)
                            for (N.row = 0; _(N.row, N.col);) N.row++;
                        k[m.id()] = N, E(N.row, N.col)
                    }
                }
                var P = function(e, t) {
                    var n, r;
                    if (t.locked() || t.isFullAutoParent()) return !1;
                    var i = k[t.id()];
                    if (i) n = i.col * v + v / 2 + o.x1, r = i.row * g + g / 2 + o.y1;
                    else {
                        for (; _(T, S);) C();
                        n = S * v + v / 2 + o.x1, r = T * g + g / 2 + o.y1, E(T, S), C()
                    }
                    return {
                        x: n,
                        y: r
                    }
                };
                a.layoutPositions(this, n, P)
            }
            return this
        }, e("layout", "grid", t)
    }(cytoscape),
    function(e) {
        "use strict";

        function t(t) {
            this.options = e.util.extend(!0, {}, n, t)
        }
        var n = {
            ready: function() {},
            stop: function() {}
        };
        t.prototype.run = function() {
            var e = this.options,
                t = e.eles,
                n = this;
            e.cy;
            return n.trigger("layoutstart"), t.nodes().positions(function() {
                return {
                    x: 0,
                    y: 0
                }
            }), n.one("layoutready", e.ready), n.trigger("layoutready"), n.one("layoutstop", e.stop), n.trigger("layoutstop"), this
        }, t.prototype.stop = function() {
            return this
        }, e("layout", "null", t)
    }(cytoscape),
    function(e) {
        "use strict";

        function t(t) {
            this.options = e.util.extend(!0, {}, n, t)
        }
        var n = {
            positions: void 0,
            zoom: void 0,
            pan: void 0,
            fit: !0,
            padding: 30,
            animate: !1,
            animationDuration: 500,
            ready: void 0,
            stop: void 0
        };
        t.prototype.run = function() {
            function t(e) {
                if (null == n.positions) return null;
                if (a) return n.positions.apply(e, [e]);
                var t = n.positions[e._private.data.id];
                return null == t ? null : t
            }
            var n = this.options,
                r = n.eles,
                i = r.nodes(),
                a = e.is.fn(n.positions);
            return i.layoutPositions(this, n, function(e, n) {
                var r = t(n);
                return n.locked() || null == r ? !1 : r
            }), this
        }, e("layout", "preset", t)
    }(cytoscape),
    function(e) {
        "use strict";

        function t(t) {
            this.options = e.util.extend(!0, {}, n, t)
        }
        var n = {
            fit: !0,
            padding: 30,
            boundingBox: void 0,
            animate: !1,
            animationDuration: 500,
            ready: void 0,
            stop: void 0
        };
        t.prototype.run = function() {
            var t = this.options,
                n = t.cy,
                r = t.eles,
                i = r.nodes().not(":parent"),
                a = e.util.makeBoundingBox(t.boundingBox ? t.boundingBox : {
                    x1: 0,
                    y1: 0,
                    w: n.width(),
                    h: n.height()
                }),
                o = function(e, t) {
                    return {
                        x: a.x1 + Math.round(Math.random() * a.w),
                        y: a.y1 + Math.round(Math.random() * a.h)
                    }
                };
            return i.layoutPositions(this, t, o), this
        }, e("layout", "random", t)
    }(cytoscape),
    function($$) {
        "use strict";

        function SpreadLayout(e) {
            this.options = $$.util.extend({}, defaults, e)
        }

        function cellCentroid(e) {
            for (var t, n, r, i = e.halfedges, a = 0, o = 0, s = 0, l = 0; l < i.length; ++l) t = i[l].getEndpoint(), n = i[l].getStartpoint(), a += t.x * n.y, a -= t.y * n.x, r = t.x * n.y - n.x * t.y, o += (t.x + n.x) * r, s += (t.y + n.y) * r;
            return a /= 2, r = 6 * a, {
                x: o / r,
                y: s / r
            }
        }

        function sitesDistance(e, t) {
            var n = e.x - t.x,
                r = e.y - t.y;
            return Math.sqrt(n * n + r * r)
        }
        var defaults = {
            animate: !0,
            ready: void 0,
            stop: void 0,
            fit: !0,
            minDist: 20,
            padding: 20,
            expandingFactor: -1,
            maxFruchtermanReingoldIterations: 50,
            maxExpandIterations: 4,
            boundingBox: void 0
        };
        SpreadLayout.prototype.run = function() {
            var layout = this,
                options = this.options;
            return $$.util.requires(["foograph", "Voronoi"], function(foograph, Voronoi) {
                function setPositions(e) {
                    for (var t = e.vertices, n = [], r = 0; r < t.length; ++r) {
                        var i = t[r];
                        n[i.id] = {
                            x: i.x,
                            y: i.y
                        }
                    }
                    nodes.positions(function(e, t) {
                        var r = t._private.data.id,
                            i = n[r];
                        return {
                            x: Math.round(simBB.x1 + i.x),
                            y: Math.round(simBB.y1 + i.y)
                        }
                    }), options.fit && cy.fit(options.padding), cy.nodes().rtrigger("position")
                }
                var cy = options.cy,
                    nodes = cy.nodes(),
                    edges = cy.edges(),
                    cWidth = cy.width(),
                    cHeight = cy.height(),
                    simulationBounds = options.boundingBox ? $$.util.makeBoundingBox(options.boundingBox) : null,
                    padding = options.padding,
                    simBBFactor = Math.max(1, .8 * Math.log(nodes.length));
                nodes.length < 100 && (simBBFactor /= 2), layout.trigger({
                    type: "layoutstart",
                    layout: layout
                });
                var simBB = {
                    x1: 0,
                    y1: 0,
                    x2: cWidth * simBBFactor,
                    y2: cHeight * simBBFactor
                };
                simulationBounds && (simBB.x1 = simulationBounds.x1, simBB.y1 = simulationBounds.y1, simBB.x2 = simulationBounds.x2, simBB.y2 = simulationBounds.y2), simBB.x1 += padding, simBB.y1 += padding, simBB.x2 -= padding, simBB.y2 -= padding;
                var width = simBB.x2 - simBB.x1,
                    height = simBB.y2 - simBB.y1,
                    startTime = Date.now();
                if (nodes.size() <= 1) {
                    nodes.positions({
                        x: Math.round((simBB.x1 + simBB.x2) / 2),
                        y: Math.round((simBB.y1 + simBB.y2) / 2)
                    }), options.fit && cy.fit(options.padding);
                    var endTime = Date.now();
                    return console.info("Layout on " + nodes.size() + " nodes took " + (endTime - startTime) + " ms"), layout.one("layoutready", options.ready), layout.trigger("layoutready"), layout.one("layoutstop", options.stop), void layout.trigger("layoutstop")
                }
                var pData = {
                    width: width,
                    height: height,
                    minDist: options.minDist,
                    expFact: options.expandingFactor,
                    expIt: 0,
                    maxExpIt: options.maxExpandIterations,
                    vertices: [],
                    edges: [],
                    startTime: startTime,
                    maxFruchtermanReingoldIterations: options.maxFruchtermanReingoldIterations
                };
                nodes.each(function(e, t) {
                    var n = this._private.data.id;
                    pData.vertices.push({
                        id: n,
                        x: 0,
                        y: 0
                    })
                }), edges.each(function() {
                    var e = this.source().id(),
                        t = this.target().id();
                    pData.edges.push({
                        src: e,
                        tgt: t
                    })
                });
                var t1 = $$.Thread();
                t1.require(foograph, "foograph"), t1.require(Voronoi), t1.require(sitesDistance), t1.require(cellCentroid);
                var didLayoutReady = !1;
                t1.on("message", function(e) {
                    var t = e.message;
                    options.animate && (setPositions(t), didLayoutReady || (layout.trigger("layoutready"), didLayoutReady = !0))
                }), layout.one("layoutready", options.ready), t1.pass(pData).run(function(pData) {
                    function checkMinDist(e) {
                        for (var t = 0, n = 0; n < e.length; ++n) {
                            var r = e[n];
                            null != r.lSite && null != r.rSite && sitesDistance(r.lSite, r.rSite) < lMinDist && ++t
                        }
                        return t
                    }
                    foograph = eval("foograph"), Voronoi = eval("Voronoi");
                    for (var lWidth = pData.width, lHeight = pData.height, lMinDist = pData.minDist, lExpFact = pData.expFact, lMaxExpIt = pData.maxExpIt, lMaxFruchtermanReingoldIterations = pData.maxFruchtermanReingoldIterations, savePositions = function() {
                            pData.width = lWidth, pData.height = lHeight, pData.expIt = expandIteration, pData.expFact = lExpFact, pData.vertices = [];
                            for (var e = 0; e < fv.length; ++e) pData.vertices.push({
                                id: fv[e].label,
                                x: fv[e].x,
                                y: fv[e].y
                            })
                        }, messagePositions = function() {
                            broadcast(pData)
                        }, frg = new foograph.Graph("FRgraph", !1), frgNodes = {}, dataVertices = pData.vertices, ni = 0; ni < dataVertices.length; ++ni) {
                        var id = dataVertices[ni].id,
                            v = new foograph.Vertex(id, Math.round(Math.random() * lHeight), Math.round(Math.random() * lHeight));
                        frgNodes[id] = v, frg.insertVertex(v)
                    }
                    for (var dataEdges = pData.edges, ei = 0; ei < dataEdges.length; ++ei) {
                        var srcNodeId = dataEdges[ei].src,
                            tgtNodeId = dataEdges[ei].tgt;
                        frg.insertEdge("", 1, frgNodes[srcNodeId], frgNodes[tgtNodeId])
                    }
                    var fv = frg.vertices,
                        iterations = lMaxFruchtermanReingoldIterations,
                        frLayoutManager = new foograph.ForceDirectedVertexLayout(lWidth, lHeight, iterations, !1, lMinDist);
                    frLayoutManager.callback = function() {
                        savePositions(), messagePositions()
                    }, frLayoutManager.layout(frg), savePositions(), messagePositions();
                    for (var voronoi = new Voronoi, bbox = {
                            xl: 0,
                            xr: lWidth,
                            yt: 0,
                            yb: lHeight
                        }, vSites = [], i = 0; i < fv.length; ++i) vSites[fv[i].label] = fv[i];
                    for (var diagram = voronoi.compute(fv, bbox), cells = diagram.cells, i = 0; i < cells.length; ++i) {
                        var cell = cells[i],
                            site = cell.site,
                            centroid = cellCentroid(cell),
                            currv = vSites[site.label];
                        currv.x = centroid.x, currv.y = centroid.y
                    }
                    0 > lExpFact && (lExpFact = Math.max(.05, Math.min(.1, lMinDist / Math.sqrt(lWidth * lHeight / fv.length) * .5)));
                    for (var prevInfractions = checkMinDist(diagram.edges), bStop = 0 >= prevInfractions, voronoiIteration = 0, expandIteration = 0; !bStop;) {
                        ++voronoiIteration;
                        for (var it = 0; 4 >= it; ++it) {
                            voronoi.recycle(diagram), diagram = voronoi.compute(fv, bbox), cells = diagram.cells;
                            for (var i = 0; i < cells.length; ++i) {
                                var cell = cells[i],
                                    site = cell.site,
                                    centroid = cellCentroid(cell),
                                    currv = vSites[site.label];
                                currv.x = centroid.x, currv.y = centroid.y
                            }
                        }
                        var currInfractions = checkMinDist(diagram.edges);
                        0 >= currInfractions ? bStop = !0 : (currInfractions >= prevInfractions || voronoiIteration >= 4) && (expandIteration >= lMaxExpIt ? bStop = !0 : (lWidth += lWidth * lExpFact, lHeight += lHeight * lExpFact, bbox = {
                            xl: 0,
                            xr: lWidth,
                            yt: 0,
                            yb: lHeight
                        }, ++expandIteration, voronoiIteration = 0)), prevInfractions = currInfractions, savePositions(), messagePositions()
                    }
                    return savePositions(), pData
                }).then(function(e) {
                    var t = e.vertices;
                    setPositions(e);
                    var n = e.startTime,
                        r = new Date;
                    console.info("Layout on " + t.length + " nodes took " + (r - n) + " ms"), layout.one("layoutstop", options.stop), options.animate || layout.trigger("layoutready"), layout.trigger("layoutstop"), t1.stop()
                })
            }), this
        }, SpreadLayout.prototype.stop = function() {}, $$("layout", "spread", SpreadLayout)
    }(cytoscape),
    function(e) {
        "use strict";

        function t(t) {
            this.options = e.util.extend(!0, {}, n, t)
        }
        var n = {
            animate: !0,
            maxSimulationTime: 4e3,
            ungrabifyWhileSimulating: !1,
            fit: !0,
            padding: 30,
            boundingBox: void 0,
            random: !1,
            infinite: !1,
            ready: void 0,
            stop: void 0,
            stiffness: 400,
            repulsion: 400,
            damping: .5
        };
        t.prototype.run = function() {
            var t = this,
                n = this,
                r = this.options;
            return e.util.require("Springy", function(i) {
                function a(e) {
                    var t = e.scratch("springy").model.id,
                        n = w.layout.nodePoints[t].p,
                        r = e.position(),
                        i = null != r.x && null != r.y ? y(e.position()) : {
                            x: 4 * Math.random() - 2,
                            y: 4 * Math.random() - 2
                        };
                    n.x = i.x, n.y = i.y
                }

                function o() {
                    n.stopped = !1, r.ungrabifyWhileSimulating && E.ungrabify(), w.start()
                }
                var s = !1,
                    l = r.cy;
                t.trigger({
                    type: "layoutstart",
                    layout: t
                });
                var u = r.eles,
                    c = u.nodes().not(":parent"),
                    d = u.edges(),
                    h = e.util.makeBoundingBox(r.boundingBox ? r.boundingBox : {
                        x1: 0,
                        y1: 0,
                        w: l.width(),
                        h: l.height()
                    }),
                    p = new i.Graph;
                c.each(function(e, t) {
                    t.scratch("springy", {
                        model: p.newNode({
                            element: t
                        })
                    })
                }), d.each(function(e, t) {
                    var n = t.source().scratch("springy").model,
                        r = t.target().scratch("springy").model;
                    t.scratch("springy", {
                        model: p.newEdge(n, r, {
                            element: t
                        })
                    })
                });
                var f = window.sim = new i.Layout.ForceDirected(p, r.stiffness, r.repulsion, r.damping);
                r.infinite && (f.minEnergyThreshold = -(1 / 0));
                var v = f.getBoundingBox(),
                    g = function(e) {
                        v = f.getBoundingBox();
                        var t = v.topright.subtract(v.bottomleft),
                            n = e.subtract(v.bottomleft).divide(t.x).x * h.w + h.x1,
                            r = e.subtract(v.bottomleft).divide(t.y).y * h.h + h.x1;
                        return new i.Vector(n, r)
                    },
                    y = function(e) {
                        v = f.getBoundingBox();
                        var t = v.topright.subtract(v.bottomleft),
                            n = (e.x - h.x1) / h.w * t.x + v.bottomleft.x,
                            r = (e.y - h.y1) / h.h * t.y + v.bottomleft.y;
                        return new i.Vector(n, r)
                    },
                    m = l.collection(),
                    x = l.nodes().size(),
                    b = 1,
                    w = new i.Renderer(f, function() {
                        n.stopped || m.length > 0 && r.animate && (s = !0, m.rtrigger("position"), r.fit && l.fit(r.padding), m = l.collection(), s = !1)
                    }, function(e, t, n) {}, function(e, i) {
                        if (!n.stopped) {
                            var a = g(i),
                                o = e.data.element;
                            o.locked() || o.grabbed() || (o._private.position = {
                                x: a.x,
                                y: a.y
                            }, m.merge(o)), b == x && (t.one("layoutready", r.ready), t.trigger({
                                type: "layoutready",
                                layout: t
                            })), b++
                        }
                    });
                c.each(function(e, t) {
                    r.random || a(t)
                });
                var _;
                c.on("position", _ = function() {
                    s || a(this)
                });
                var E = c.filter(":grabbable");
                n.stopSystem = function() {
                    n.stopped = !0, p.filterNodes(function() {
                        return !1
                    }), r.ungrabifyWhileSimulating && E.grabify(), r.fit && l.fit(r.padding), c.off("drag position", _), t.one("layoutstop", r.stop), t.trigger({
                        type: "layoutstop",
                        layout: t
                    }), n.stopSystem = null
                }, o(), r.infinite || setTimeout(function() {
                    n.stop()
                }, r.maxSimulationTime)
            }), this
        }, t.prototype.stop = function() {
            return null != this.stopSystem && this.stopSystem(), this
        }, e("layout", "springy", t)
    }(cytoscape),
    function(e) {
        "use strict";

        function t(e) {
            this.options = e
        }
        t.prototype.recalculateRenderedStyle = function() {}, t.prototype.notify = function() {}, e("renderer", "null", t)
    }(cytoscape);