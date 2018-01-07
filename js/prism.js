/* http://prismjs.com/download.html?themes=prism-twilight&languages=markup+css+clike+javascript */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
    Prism = function () {
        var e = /\blang(?:uage)?-(\w+)\b/i,
            t = 0,
            n = _self.Prism = {
                util: {
                    encode: function (e) {
                        return e instanceof a ? new a(e.type, n.util.encode(e.content), e.alias) : "Array" === n.util.type(e) ? e.map(n.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
                    },
                    type: function (e) {
                        return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]
                    },
                    objId: function (e) {
                        return e.__id || Object.defineProperty(e, "__id", {
                            value: ++t
                        }), e.__id
                    },
                    clone: function (e) {
                        var t = n.util.type(e);
                        switch (t) {
                        case "Object":
                            var a = {};
                            for (var r in e) e.hasOwnProperty(r) && (a[r] = n.util.clone(e[r]));
                            return a;
                        case "Array":
                            return e.map && e.map(function (e) {
                                return n.util.clone(e)
                            })
                        }
                        return e
                    }
                },
                languages: {
                    extend: function (e, t) {
                        var a = n.util.clone(n.languages[e]);
                        for (var r in t) a[r] = t[r];
                        return a
                    },
                    insertBefore: function (e, t, a, r) {
                        r = r || n.languages;
                        var l = r[e];
                        if (2 == arguments.length) {
                            a = arguments[1];
                            for (var i in a) a.hasOwnProperty(i) && (l[i] = a[i]);
                            return l
                        }
                        var o = {};
                        for (var s in l)
                            if (l.hasOwnProperty(s)) {
                                if (s == t)
                                    for (var i in a) a.hasOwnProperty(i) && (o[i] = a[i]);
                                o[s] = l[s]
                            }
                        return n.languages.DFS(n.languages, function (t, n) {
                            n === r[e] && t != e && (this[t] = o)
                        }), r[e] = o
                    },
                    DFS: function (e, t, a, r) {
                        r = r || {};
                        for (var l in e) e.hasOwnProperty(l) && (t.call(e, l, e[l], a || l), "Object" !== n.util.type(e[l]) || r[n.util.objId(e[l])] ? "Array" !== n.util.type(e[l]) || r[n.util.objId(e[l])] || (r[n.util.objId(e[l])] = !0, n.languages.DFS(e[l], t, l, r)) : (r[n.util.objId(e[l])] = !0, n.languages.DFS(e[l], t, null, r)))
                    }
                },
                plugins: {},
                highlightAll: function (e, t) {
                    var a = {
                        callback: t,
                        selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
                    };
                    n.hooks.run("before-highlightall", a);
                    for (var r, l = a.elements || document.querySelectorAll(a.selector), i = 0; r = l[i++];) n.highlightElement(r, e === !0, a.callback)
                },
                highlightElement: function (t, a, r) {
                    for (var l, i, o = t; o && !e.test(o.className);) o = o.parentNode;
                    o && (l = (o.className.match(e) || [, ""])[1], i = n.languages[l]), t.className = t.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l, o = t.parentNode, /pre/i.test(o.nodeName) && (o.className = o.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l);
                    var s = t.textContent,
                        u = {
                            element: t,
                            language: l,
                            grammar: i,
                            code: s
                        };
                    if (!s || !i) return n.hooks.run("complete", u), void 0;
                    if (n.hooks.run("before-highlight", u), a && _self.Worker) {
                        var c = new Worker(n.filename);
                        c.onmessage = function (e) {
                            u.highlightedCode = e.data, n.hooks.run("before-insert", u), u.element.innerHTML = u.highlightedCode, r && r.call(u.element), n.hooks.run("after-highlight", u), n.hooks.run("complete", u)
                        }, c.postMessage(JSON.stringify({
                            language: u.language,
                            code: u.code,
                            immediateClose: !0
                        }))
                    } else u.highlightedCode = n.highlight(u.code, u.grammar, u.language), n.hooks.run("before-insert", u), u.element.innerHTML = u.highlightedCode, r && r.call(t), n.hooks.run("after-highlight", u), n.hooks.run("complete", u)
                },
                highlight: function (e, t, r) {
                    var l = n.tokenize(e, t);
                    return a.stringify(n.util.encode(l), r)
                },
                tokenize: function (e, t) {
                    var a = n.Token,
                        r = [e],
                        l = t.rest;
                    if (l) {
                        for (var i in l) t[i] = l[i];
                        delete t.rest
                    }
                    e: for (var i in t)
                        if (t.hasOwnProperty(i) && t[i]) {
                            var o = t[i];
                            o = "Array" === n.util.type(o) ? o : [o];
                            for (var s = 0; s < o.length; ++s) {
                                var u = o[s],
                                    c = u.inside,
                                    g = !!u.lookbehind,
                                    h = !!u.greedy,
                                    f = 0,
                                    d = u.alias;
                                u = u.pattern || u;
                                for (var p = 0; p < r.length; p++) {
                                    var m = r[p];
                                    if (r.length > e.length) break e;
                                    if (!(m instanceof a)) {
                                        u.lastIndex = 0;
                                        var y = u.exec(m),
                                            v = 1;
                                        if (!y && h && p != r.length - 1) {
                                            var b = r[p + 1].matchedStr || r[p + 1],
                                                k = m + b;
                                            if (p < r.length - 2 && (k += r[p + 2].matchedStr || r[p + 2]), u.lastIndex = 0, y = u.exec(k), !y) continue;
                                            var w = y.index + (g ? y[1].length : 0);
                                            if (w >= m.length) continue;
                                            var _ = y.index + y[0].length,
                                                P = m.length + b.length;
                                            if (v = 3, P >= _) {
                                                if (r[p + 1].greedy) continue;
                                                v = 2, k = k.slice(0, P)
                                            }
                                            m = k
                                        }
                                        if (y) {
                                            g && (f = y[1].length);
                                            var w = y.index + f,
                                                y = y[0].slice(f),
                                                _ = w + y.length,
                                                S = m.slice(0, w),
                                                O = m.slice(_),
                                                j = [p, v];
                                            S && j.push(S);
                                            var A = new a(i, c ? n.tokenize(y, c) : y, d, y, h);
                                            j.push(A), O && j.push(O), Array.prototype.splice.apply(r, j)
                                        }
                                    }
                                }
                            }
                        }
                    return r
                },
                hooks: {
                    all: {},
                    add: function (e, t) {
                        var a = n.hooks.all;
                        a[e] = a[e] || [], a[e].push(t)
                    },
                    run: function (e, t) {
                        var a = n.hooks.all[e];
                        if (a && a.length)
                            for (var r, l = 0; r = a[l++];) r(t)
                    }
                }
            },
            a = n.Token = function (e, t, n, a, r) {
                this.type = e, this.content = t, this.alias = n, this.matchedStr = a || null, this.greedy = !!r
            };
        if (a.stringify = function (e, t, r) {
                if ("string" == typeof e) return e;
                if ("Array" === n.util.type(e)) return e.map(function (n) {
                    return a.stringify(n, t, e)
                }).join("");
                var l = {
                    type: e.type,
                    content: a.stringify(e.content, t, r),
                    tag: "span",
                    classes: ["token", e.type],
                    attributes: {},
                    language: t,
                    parent: r
                };
                if ("comment" == l.type && (l.attributes.spellcheck = "true"), e.alias) {
                    var i = "Array" === n.util.type(e.alias) ? e.alias : [e.alias];
                    Array.prototype.push.apply(l.classes, i)
                }
                n.hooks.run("wrap", l);
                var o = "";
                for (var s in l.attributes) o += (o ? " " : "") + s + '="' + (l.attributes[s] || "") + '"';
                return "<" + l.tag + ' class="' + l.classes.join(" ") + '" ' + o + ">" + l.content + "</" + l.tag + ">"
            }, !_self.document) return _self.addEventListener ? (_self.addEventListener("message", function (e) {
            var t = JSON.parse(e.data),
                a = t.language,
                r = t.code,
                l = t.immediateClose;
            _self.postMessage(n.highlight(r, n.languages[a], a)), l && _self.close()
        }, !1), _self.Prism) : _self.Prism;
        var r = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();
        return r && (n.filename = r.src, document.addEventListener && !r.hasAttribute("data-manual") && document.addEventListener("DOMContentLoaded", n.highlightAll)), _self.Prism
    }();
"undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism);
Prism.languages.markup = {
    comment: /<!--[\w\W]*?-->/,
    prolog: /<\?[\w\W]+?\?>/,
    doctype: /<!DOCTYPE[\w\W]+?>/,
    cdata: /<!\[CDATA\[[\w\W]*?]]>/i,
    tag: {
        pattern: /<\/?(?!\d)[^\s>\/=.$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,
        inside: {
            tag: {
                pattern: /^<\/?[^\s>\/]+/i,
                inside: {
                    punctuation: /^<\/?/,
                    namespace: /^[^\s>\/:]+:/
                }
            },
            "attr-value": {
                pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,
                inside: {
                    punctuation: /[=>"']/
                }
            },
            punctuation: /\/?>/,
            "attr-name": {
                pattern: /[^\s>\/]+/,
                inside: {
                    namespace: /^[^\s>\/:]+:/
                }
            }
        }
    },
    entity: /&#?[\da-z]{1,8};/i
}, Prism.hooks.add("wrap", function (a) {
    "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"))
}), Prism.languages.xml = Prism.languages.markup, Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup;
Prism.languages.css = {
    comment: /\/\*[\w\W]*?\*\//,
    atrule: {
        pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i,
        inside: {
            rule: /@[\w-]+/
        }
    },
    url: /url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
    selector: /[^\{\}\s][^\{\};]*?(?=\s*\{)/,
    string: /("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,
    property: /(\b|\B)[\w-]+(?=\s*:)/i,
    important: /\B!important\b/i,
    "function": /[-a-z0-9]+(?=\()/i,
    punctuation: /[(){};:]/
}, Prism.languages.css.atrule.inside.rest = Prism.util.clone(Prism.languages.css), Prism.languages.markup && (Prism.languages.insertBefore("markup", "tag", {
    style: {
        pattern: /(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,
        lookbehind: !0,
        inside: Prism.languages.css,
        alias: "language-css"
    }
}), Prism.languages.insertBefore("inside", "attr-value", {
    "style-attr": {
        pattern: /\s*style=("|').*?\1/i,
        inside: {
            "attr-name": {
                pattern: /^\s*style/i,
                inside: Prism.languages.markup.tag.inside
            },
            punctuation: /^\s*=\s*['"]|['"]\s*$/,
            "attr-value": {
                pattern: /.+/i,
                inside: Prism.languages.css
            }
        },
        alias: "language-css"
    }
}, Prism.languages.markup.tag));
Prism.languages.clike = {
    comment: [{
        pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
        lookbehind: !0
    }, {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: !0
    }],
    string: {
        pattern: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0
    },
    "class-name": {
        pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
        lookbehind: !0,
        inside: {
            punctuation: /(\.|\\)/
        }
    },
    keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
    "boolean": /\b(true|false)\b/,
    "function": /[a-z0-9_]+(?=\()/i,
    number: /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
    operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
    punctuation: /[{}[\];(),.:]/
};
Prism.languages.javascript = Prism.languages.extend("clike", {
    keyword: /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
    number: /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
    "function": /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i
}), Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
        pattern: /(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
        lookbehind: !0,
        greedy: !0
    }
}), Prism.languages.insertBefore("javascript", "class-name", {
    "template-string": {
        pattern: /`(?:\\\\|\\?[^\\])*?`/,
        greedy: !0,
        inside: {
            interpolation: {
                pattern: /\$\{[^}]+\}/,
                inside: {
                    "interpolation-punctuation": {
                        pattern: /^\$\{|\}$/,
                        alias: "punctuation"
                    },
                    rest: Prism.languages.javascript
                }
            },
            string: /[\s\S]+/
        }
    }
}), Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
    script: {
        pattern: /(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,
        lookbehind: !0,
        inside: Prism.languages.javascript,
        alias: "language-javascript"
    }
}), Prism.languages.js = Prism.languages.javascript;

! function () {
    self.Prism && Prism.hooks.add("after-highlight", function (e) {
        var t = e.element.parentNode;
        if (t && /pre/i.test(t.nodeName) && -1 !== t.className.indexOf("code-toolbar")) {
            var n = document.createElement("div");
            if (n.setAttribute("class", "toolbar"), window.ZeroClipboard) {
                var a = document.createElement("a");
                a.innerHTML = "Copy";
                var o = new ZeroClipboard(a);
                o.on("ready", function (e) {
                    o.on("copy", function (e) {
                        var t = e.target.parentNode.parentNode.getElementsByTagName("code")[0];
                        e.clipboardData.setData("text/plain", t.textContent || t.innerText)
                    }), o.on("aftercopy", function (e) {
                        e.target.parentNode.parentNode.getElementsByTagName("code")[0].focus()
                    })
                }), n.appendChild(a)
            }
            t.appendChild(n)
        }
    })
}();

! function (e, t) {
    "use strict";
    var $, B, Y, r = e,
        a = r.document,
        n = r.navigator,
        i = r.setTimeout,
        o = r.clearTimeout,
        l = r.setInterval,
        s = r.clearInterval,
        f = r.getComputedStyle,
        u = r.encodeURIComponent,
        c = r.ActiveXObject,
        d = r.Error,
        p = r.Number.parseInt || r.parseInt,
        v = r.Number.parseFloat || r.parseFloat,
        h = r.Number.isNaN || r.isNaN,
        m = r.Date.now,
        y = r.Object.keys,
        g = r.Object.defineProperty,
        b = r.Object.prototype.hasOwnProperty,
        w = r.Array.prototype.slice,
        x = function () {
            var e = function (e) {
                return e
            };
            if ("function" == typeof r.wrap && "function" == typeof r.unwrap) try {
                var t = a.createElement("div"),
                    n = r.unwrap(t);
                1 === t.nodeType && n && 1 === n.nodeType && (e = r.unwrap)
            } catch (i) {}
            return e
        }(),
        C = function (e) {
            return w.call(e, 0)
        },
        E = function () {
            var e, r, a, n, i, o, l = C(arguments),
                s = l[0] || {};
            for (e = 1, r = l.length; r > e; e++)
                if (null != (a = l[e]))
                    for (n in a) b.call(a, n) && (i = s[n], o = a[n], s !== o && o !== t && (s[n] = o));
            return s
        },
        T = function (e) {
            var t, r, a, n;
            if ("object" != typeof e || null == e || "number" == typeof e.nodeType) t = e;
            else if ("number" == typeof e.length)
                for (t = [], r = 0, a = e.length; a > r; r++) b.call(e, r) && (t[r] = T(e[r]));
            else {
                t = {};
                for (n in e) b.call(e, n) && (t[n] = T(e[n]))
            }
            return t
        },
        j = function (e, t) {
            for (var r = {}, a = 0, n = t.length; n > a; a++) t[a] in e && (r[t[a]] = e[t[a]]);
            return r
        },
        D = function (e, t) {
            var r = {};
            for (var a in e) - 1 === t.indexOf(a) && (r[a] = e[a]);
            return r
        },
        k = function (e) {
            if (e)
                for (var t in e) b.call(e, t) && delete e[t];
            return e
        },
        N = function (e, t) {
            if (e && 1 === e.nodeType && e.ownerDocument && t && (1 === t.nodeType && t.ownerDocument && t.ownerDocument === e.ownerDocument || 9 === t.nodeType && !t.ownerDocument && t === e.ownerDocument))
                do {
                    if (e === t) return !0;
                    e = e.parentNode
                } while (e);
            return !1
        },
        O = function (e) {
            var t;
            return "string" == typeof e && e && (t = e.split("#")[0].split("?")[0], t = e.slice(0, e.lastIndexOf("/") + 1)), t
        },
        I = function (e) {
            var t, r;
            return "string" == typeof e && e && (r = e.match(/^(?:|[^:@]*@|.+\)@(?=http[s]?|file)|.+?\s+(?: at |@)(?:[^:\(]+ )*[\(]?)((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/), r && r[1] ? t = r[1] : (r = e.match(/\)@((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/), r && r[1] && (t = r[1]))), t
        },
        A = function () {
            var e, t;
            try {
                throw new d
            } catch (r) {
                t = r
            }
            return t && (e = t.sourceURL || t.fileName || I(t.stack)), e
        },
        L = function () {
            var e, r, n;
            if (a.currentScript && (e = a.currentScript.src)) return e;
            if (r = a.getElementsByTagName("script"), 1 === r.length) return r[0].src || t;
            if ("readyState" in r[0])
                for (n = r.length; n--;)
                    if ("interactive" === r[n].readyState && (e = r[n].src)) return e;
            return "loading" === a.readyState && (e = r[r.length - 1].src) ? e : (e = A()) ? e : t
        },
        _ = function () {
            var e, r, n, i = a.getElementsByTagName("script");
            for (e = i.length; e--;) {
                if (!(n = i[e].src)) {
                    r = null;
                    break
                }
                if (n = O(n), null == r) r = n;
                else if (r !== n) {
                    r = null;
                    break
                }
            }
            return r || t
        },
        F = function () {
            var e = O(L()) || _() || "";
            return e + "ZeroClipboard.swf"
        },
        S = function () {
            var e = /win(dows|[\s]?(nt|me|ce|xp|vista|[\d]+))/i;
            return !!n && (e.test(n.appVersion || "") || e.test(n.platform || "") || -1 !== (n.userAgent || "").indexOf("Windows"))
        },
        z = function () {
            return null == e.opener && (!!e.top && e != e.top || !!e.parent && e != e.parent)
        }(),
        Z = {
            bridge: null,
            version: "0.0.0",
            pluginType: "unknown",
            disabled: null,
            outdated: null,
            sandboxed: null,
            unavailable: null,
            degraded: null,
            deactivated: null,
            overdue: null,
            ready: null
        },
        V = "11.0.0",
        X = {},
        M = {},
        P = null,
        H = 0,
        R = 0,
        J = {
            ready: "Flash communication is established",
            error: {
                "flash-disabled": "Flash is disabled or not installed. May also be attempting to run Flash in a sandboxed iframe, which is impossible.",
                "flash-outdated": "Flash is too outdated to support ZeroClipboard",
                "flash-sandboxed": "Attempting to run Flash in a sandboxed iframe, which is impossible",
                "flash-unavailable": "Flash is unable to communicate bidirectionally with JavaScript",
                "flash-degraded": "Flash is unable to preserve data fidelity when communicating with JavaScript",
                "flash-deactivated": "Flash is too outdated for your browser and/or is configured as click-to-activate.\nThis may also mean that the ZeroClipboard SWF object could not be loaded, so please check your `swfPath` configuration and/or network connectivity.\nMay also be attempting to run Flash in a sandboxed iframe, which is impossible.",
                "flash-overdue": "Flash communication was established but NOT within the acceptable time limit",
                "version-mismatch": "ZeroClipboard JS version number does not match ZeroClipboard SWF version number",
                "clipboard-error": "At least one error was thrown while ZeroClipboard was attempting to inject your data into the clipboard",
                "config-mismatch": "ZeroClipboard configuration does not match Flash's reality",
                "swf-not-found": "The ZeroClipboard SWF object could not be loaded, so please check your `swfPath` configuration and/or network connectivity"
            }
        },
        K = ["flash-unavailable", "flash-degraded", "flash-overdue", "version-mismatch", "config-mismatch", "clipboard-error"],
        U = ["flash-disabled", "flash-outdated", "flash-sandboxed", "flash-unavailable", "flash-degraded", "flash-deactivated", "flash-overdue"],
        W = new RegExp("^flash-(" + U.map(function (e) {
            return e.replace(/^flash-/, "")
        }).join("|") + ")$"),
        G = new RegExp("^flash-(" + U.slice(1).map(function (e) {
            return e.replace(/^flash-/, "")
        }).join("|") + ")$"),
        q = {
            swfPath: F(),
            trustedDomains: e.location.host ? [e.location.host] : [],
            cacheBust: !0,
            forceEnhancedClipboard: !1,
            flashLoadTimeout: 3e4,
            autoActivate: !0,
            bubbleEvents: !0,
            fixLineEndings: !0,
            containerId: "global-zeroclipboard-html-bridge",
            containerClass: "global-zeroclipboard-container",
            swfObjectId: "global-zeroclipboard-flash-bridge",
            hoverClass: "zeroclipboard-is-hover",
            activeClass: "zeroclipboard-is-active",
            forceHandCursor: !1,
            title: null,
            zIndex: 999999999
        },
        Q = function (e) {
            if ("object" == typeof e && null !== e)
                for (var t in e)
                    if (b.call(e, t))
                        if (/^(?:forceHandCursor|title|zIndex|bubbleEvents|fixLineEndings)$/.test(t)) q[t] = e[t];
                        else if (null == Z.bridge)
                if ("containerId" === t || "swfObjectId" === t) {
                    if (!ve(e[t])) throw new Error("The specified `" + t + "` value is not valid as an HTML4 Element ID");
                    q[t] = e[t]
                } else q[t] = e[t]; {
                    if ("string" != typeof e || !e) return T(q);
                    if (b.call(q, e)) return q[e]
                }
        },
        ee = function () {
            return Je(), {
                browser: j(n, ["userAgent", "platform", "appName", "appVersion"]),
                flash: D(Z, ["bridge"]),
                zeroclipboard: {
                    version: Ue.version,
                    config: Ue.config()
                }
            }
        },
        te = function () {
            return !!(Z.disabled || Z.outdated || Z.sandboxed || Z.unavailable || Z.degraded || Z.deactivated)
        },
        re = function (e, r) {
            var a, n, i, o = {};
            if ("string" == typeof e && e) i = e.toLowerCase().split(/\s+/);
            else if ("object" == typeof e && e && "undefined" == typeof r)
                for (a in e) b.call(e, a) && "string" == typeof a && a && "function" == typeof e[a] && Ue.on(a, e[a]);
            if (i && i.length) {
                for (a = 0, n = i.length; n > a; a++) e = i[a].replace(/^on/, ""), o[e] = !0, X[e] || (X[e] = []), X[e].push(r);
                if (o.ready && Z.ready && Ue.emit({
                        type: "ready"
                    }), o.error) {
                    for (a = 0, n = U.length; n > a; a++)
                        if (Z[U[a].replace(/^flash-/, "")] === !0) {
                            Ue.emit({
                                type: "error",
                                name: U[a]
                            });
                            break
                        }
                    $ !== t && Ue.version !== $ && Ue.emit({
                        type: "error",
                        name: "version-mismatch",
                        jsVersion: Ue.version,
                        swfVersion: $
                    })
                }
            }
            return Ue
        },
        ae = function (e, t) {
            var r, a, n, i, o;
            if (0 === arguments.length) i = y(X);
            else if ("string" == typeof e && e) i = e.split(/\s+/);
            else if ("object" == typeof e && e && "undefined" == typeof t)
                for (r in e) b.call(e, r) && "string" == typeof r && r && "function" == typeof e[r] && Ue.off(r, e[r]);
            if (i && i.length)
                for (r = 0, a = i.length; a > r; r++)
                    if (e = i[r].toLowerCase().replace(/^on/, ""), o = X[e], o && o.length)
                        if (t)
                            for (n = o.indexOf(t); - 1 !== n;) o.splice(n, 1), n = o.indexOf(t, n);
                        else o.length = 0;
            return Ue
        },
        ne = function (e) {
            var t;
            return t = "string" == typeof e && e ? T(X[e]) || null : T(X)
        },
        ie = function (e) {
            var t, r, a;
            return e = he(e), e && !Ce(e) ? "ready" === e.type && Z.overdue === !0 ? Ue.emit({
                type: "error",
                name: "flash-overdue"
            }) : (t = E({}, e), we.call(this, t), "copy" === e.type && (a = Ie(M), r = a.data, P = a.formatMap), r) : void 0
        },
        oe = function () {
            var e = Z.sandboxed;
            if (Je(), "boolean" != typeof Z.ready && (Z.ready = !1), Z.sandboxed !== e && Z.sandboxed === !0) Z.ready = !1, Ue.emit({
                type: "error",
                name: "flash-sandboxed"
            });
            else if (!Ue.isFlashUnusable() && null === Z.bridge) {
                var t = q.flashLoadTimeout;
                "number" == typeof t && t >= 0 && (H = i(function () {
                    "boolean" != typeof Z.deactivated && (Z.deactivated = !0), Z.deactivated === !0 && Ue.emit({
                        type: "error",
                        name: "flash-deactivated"
                    })
                }, t)), Z.overdue = !1, Ne()
            }
        },
        le = function () {
            Ue.clearData(), Ue.blur(), Ue.emit("destroy"), Oe(), Ue.off()
        },
        se = function (e, t) {
            var r;
            if ("object" == typeof e && e && "undefined" == typeof t) r = e, Ue.clearData();
            else {
                if ("string" != typeof e || !e) return;
                r = {}, r[e] = t
            }
            for (var a in r) "string" == typeof a && a && b.call(r, a) && "string" == typeof r[a] && r[a] && (M[a] = Re(r[a]))
        },
        fe = function (e) {
            "undefined" == typeof e ? (k(M), P = null) : "string" == typeof e && b.call(M, e) && delete M[e]
        },
        ue = function (e) {
            return "undefined" == typeof e ? T(M) : "string" == typeof e && b.call(M, e) ? M[e] : void 0
        },
        ce = function (e) {
            if (e && 1 === e.nodeType) {
                B && (Ve(B, q.activeClass), B !== e && Ve(B, q.hoverClass)), B = e, Ze(e, q.hoverClass);
                var t = e.getAttribute("title") || q.title;
                if ("string" == typeof t && t) {
                    var r = ke(Z.bridge);
                    r && r.setAttribute("title", t)
                }
                var a = q.forceHandCursor === !0 || "pointer" === $e(e, "cursor");
                Pe(a), Me()
            }
        },
        de = function () {
            var e = ke(Z.bridge);
            e && (e.removeAttribute("title"), e.style.left = "0px", e.style.top = "-9999px", e.style.width = "1px", e.style.height = "1px"), B && (Ve(B, q.hoverClass), Ve(B, q.activeClass), B = null)
        },
        pe = function () {
            return B || null
        },
        ve = function (e) {
            return "string" == typeof e && e && /^[A-Za-z][A-Za-z0-9_:\-\.]*$/.test(e)
        },
        he = function (e) {
            var t;
            if ("string" == typeof e && e ? (t = e, e = {}) : "object" == typeof e && e && "string" == typeof e.type && e.type && (t = e.type), t) {
                t = t.toLowerCase(), !e.target && (/^(copy|aftercopy|_click)$/.test(t) || "error" === t && "clipboard-error" === e.name) && (e.target = Y), E(e, {
                    type: t,
                    target: e.target || B || null,
                    relatedTarget: e.relatedTarget || null,
                    currentTarget: Z && Z.bridge || null,
                    timeStamp: e.timeStamp || m() || null
                });
                var r = J[e.type];
                return "error" === e.type && e.name && r && (r = r[e.name]), r && (e.message = r), "ready" === e.type && E(e, {
                    target: null,
                    version: Z.version
                }), "error" === e.type && (W.test(e.name) && E(e, {
                    target: null,
                    minimumVersion: V
                }), G.test(e.name) && E(e, {
                    version: Z.version
                })), "copy" === e.type && (e.clipboardData = {
                    setData: Ue.setData,
                    clearData: Ue.clearData
                }), "aftercopy" === e.type && (e = Ae(e, P)), e.target && !e.relatedTarget && (e.relatedTarget = me(e.target)), ye(e)
            }
        },
        me = function (e) {
            var t = e && e.getAttribute && e.getAttribute("data-clipboard-target");
            return t ? a.getElementById(t) : null
        },
        ye = function (e) {
            if (e && /^_(?:click|mouse(?:over|out|down|up|move))$/.test(e.type)) {
                var n = e.target,
                    i = "_mouseover" === e.type && e.relatedTarget ? e.relatedTarget : t,
                    o = "_mouseout" === e.type && e.relatedTarget ? e.relatedTarget : t,
                    l = Xe(n),
                    s = r.screenLeft || r.screenX || 0,
                    f = r.screenTop || r.screenY || 0,
                    u = a.body.scrollLeft + a.documentElement.scrollLeft,
                    c = a.body.scrollTop + a.documentElement.scrollTop,
                    d = l.left + ("number" == typeof e._stageX ? e._stageX : 0),
                    p = l.top + ("number" == typeof e._stageY ? e._stageY : 0),
                    v = d - u,
                    h = p - c,
                    m = s + v,
                    y = f + h,
                    g = "number" == typeof e.movementX ? e.movementX : 0,
                    b = "number" == typeof e.movementY ? e.movementY : 0;
                delete e._stageX, delete e._stageY, E(e, {
                    srcElement: n,
                    fromElement: i,
                    toElement: o,
                    screenX: m,
                    screenY: y,
                    pageX: d,
                    pageY: p,
                    clientX: v,
                    clientY: h,
                    x: v,
                    y: h,
                    movementX: g,
                    movementY: b,
                    offsetX: 0,
                    offsetY: 0,
                    layerX: 0,
                    layerY: 0
                })
            }
            return e
        },
        ge = function (e) {
            var t = e && "string" == typeof e.type && e.type || "";
            return !/^(?:(?:before)?copy|destroy)$/.test(t)
        },
        be = function (e, t, r, a) {
            a ? i(function () {
                e.apply(t, r)
            }, 0) : e.apply(t, r)
        },
        we = function (e) {
            if ("object" == typeof e && e && e.type) {
                var t = ge(e),
                    a = X["*"] || [],
                    n = X[e.type] || [],
                    i = a.concat(n);
                if (i && i.length) {
                    var o, l, s, f, u, c = this;
                    for (o = 0, l = i.length; l > o; o++) s = i[o], f = c, "string" == typeof s && "function" == typeof r[s] && (s = r[s]), "object" == typeof s && s && "function" == typeof s.handleEvent && (f = s, s = s.handleEvent), "function" == typeof s && (u = E({}, e), be(s, f, [u], t))
                }
                return this
            }
        },
        xe = function (e) {
            var t = null;
            return (z === !1 || e && "error" === e.type && e.name && -1 !== K.indexOf(e.name)) && (t = !1), t
        },
        Ce = function (e) {
            var t = e.target || B || null,
                r = "swf" === e._source;
            switch (delete e._source, e.type) {
            case "error":
                var a = "flash-sandboxed" === e.name || xe(e);
                "boolean" == typeof a && (Z.sandboxed = a), -1 !== U.indexOf(e.name) ? E(Z, {
                    disabled: "flash-disabled" === e.name,
                    outdated: "flash-outdated" === e.name,
                    unavailable: "flash-unavailable" === e.name,
                    degraded: "flash-degraded" === e.name,
                    deactivated: "flash-deactivated" === e.name,
                    overdue: "flash-overdue" === e.name,
                    ready: !1
                }) : "version-mismatch" === e.name && ($ = e.swfVersion, E(Z, {
                    disabled: !1,
                    outdated: !1,
                    unavailable: !1,
                    degraded: !1,
                    deactivated: !1,
                    overdue: !1,
                    ready: !1
                })), Ye();
                break;
            case "ready":
                $ = e.swfVersion;
                var n = Z.deactivated === !0;
                E(Z, {
                    disabled: !1,
                    outdated: !1,
                    sandboxed: !1,
                    unavailable: !1,
                    degraded: !1,
                    deactivated: !1,
                    overdue: n,
                    ready: !n
                }), Ye();
                break;
            case "beforecopy":
                Y = t;
                break;
            case "copy":
                var i, o, l = e.relatedTarget;
                !M["text/html"] && !M["text/plain"] && l && (o = l.value || l.outerHTML || l.innerHTML) && (i = l.value || l.textContent || l.innerText) ? (e.clipboardData.clearData(), e.clipboardData.setData("text/plain", i), o !== i && e.clipboardData.setData("text/html", o)) : !M["text/plain"] && e.target && (i = e.target.getAttribute("data-clipboard-text")) && (e.clipboardData.clearData(), e.clipboardData.setData("text/plain", i));
                break;
            case "aftercopy":
                Ee(e), Ue.clearData(), t && t !== ze() && t.focus && t.focus();
                break;
            case "_mouseover":
                Ue.focus(t), q.bubbleEvents === !0 && r && (t && t !== e.relatedTarget && !N(e.relatedTarget, t) && Te(E({}, e, {
                    type: "mouseenter",
                    bubbles: !1,
                    cancelable: !1
                })), Te(E({}, e, {
                    type: "mouseover"
                })));
                break;
            case "_mouseout":
                Ue.blur(), q.bubbleEvents === !0 && r && (t && t !== e.relatedTarget && !N(e.relatedTarget, t) && Te(E({}, e, {
                    type: "mouseleave",
                    bubbles: !1,
                    cancelable: !1
                })), Te(E({}, e, {
                    type: "mouseout"
                })));
                break;
            case "_mousedown":
                Ze(t, q.activeClass), q.bubbleEvents === !0 && r && Te(E({}, e, {
                    type: e.type.slice(1)
                }));
                break;
            case "_mouseup":
                Ve(t, q.activeClass), q.bubbleEvents === !0 && r && Te(E({}, e, {
                    type: e.type.slice(1)
                }));
                break;
            case "_click":
                Y = null, q.bubbleEvents === !0 && r && Te(E({}, e, {
                    type: e.type.slice(1)
                }));
                break;
            case "_mousemove":
                q.bubbleEvents === !0 && r && Te(E({}, e, {
                    type: e.type.slice(1)
                }))
            }
            return /^_(?:click|mouse(?:over|out|down|up|move))$/.test(e.type) ? !0 : void 0
        },
        Ee = function (e) {
            if (e.errors && e.errors.length > 0) {
                var t = T(e);
                E(t, {
                    type: "error",
                    name: "clipboard-error"
                }), delete t.success, i(function () {
                    Ue.emit(t)
                }, 0)
            }
        },
        Te = function (e) {
            if (e && "string" == typeof e.type && e) {
                var t, n = e.target || null,
                    i = n && n.ownerDocument || a,
                    o = {
                        view: i.defaultView || r,
                        canBubble: !0,
                        cancelable: !0,
                        detail: "click" === e.type ? 1 : 0,
                        button: "number" == typeof e.which ? e.which - 1 : "number" == typeof e.button ? e.button : i.createEvent ? 0 : 1
                    },
                    l = E(o, e);
                n && i.createEvent && n.dispatchEvent && (l = [l.type, l.canBubble, l.cancelable, l.view, l.detail, l.screenX, l.screenY, l.clientX, l.clientY, l.ctrlKey, l.altKey, l.shiftKey, l.metaKey, l.button, l.relatedTarget], t = i.createEvent("MouseEvents"), t.initMouseEvent && (t.initMouseEvent.apply(t, l), t._source = "js", n.dispatchEvent(t)))
            }
        },
        je = function () {
            var e = q.flashLoadTimeout;
            if ("number" == typeof e && e >= 0) {
                var t = Math.min(1e3, e / 10),
                    r = q.swfObjectId + "_fallbackContent";
                R = l(function () {
                    var e = a.getElementById(r);
                    Be(e) && (Ye(), Z.deactivated = null, Ue.emit({
                        type: "error",
                        name: "swf-not-found"
                    }))
                }, t)
            }
        },
        De = function () {
            var e = a.createElement("div");
            return e.id = q.containerId, e.className = q.containerClass, e.style.position = "absolute", e.style.left = "0px", e.style.top = "-9999px", e.style.width = "1px", e.style.height = "1px", e.style.zIndex = "" + He(q.zIndex), e
        },
        ke = function (e) {
            for (var t = e && e.parentNode; t && "OBJECT" === t.nodeName && t.parentNode;) t = t.parentNode;
            return t || null
        },
        Ne = function () {
            var e, t = Z.bridge,
                n = ke(t);
            if (!t) {
                var i = Se(r.location.host, q),
                    o = "never" === i ? "none" : "all",
                    l = _e(E({
                        jsVersion: Ue.version
                    }, q)),
                    s = q.swfPath + Le(q.swfPath, q);
                n = De();
                var f = a.createElement("div");
                n.appendChild(f), a.body.appendChild(n);
                var u = a.createElement("div"),
                    c = "activex" === Z.pluginType;
                u.innerHTML = '<object id="' + q.swfObjectId + '" name="' + q.swfObjectId + '" width="100%" height="100%" ' + (c ? 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"' : 'type="application/x-shockwave-flash" data="' + s + '"') + ">" + (c ? '<param name="movie" value="' + s + '"/>' : "") + '<param name="allowScriptAccess" value="' + i + '"/><param name="allowNetworking" value="' + o + '"/><param name="menu" value="false"/><param name="wmode" value="transparent"/><param name="flashvars" value="' + l + '"/><div id="' + q.swfObjectId + '_fallbackContent">&nbsp;</div></object>', t = u.firstChild, u = null, x(t).ZeroClipboard = Ue, n.replaceChild(t, f), je()
            }
            return t || (t = a[q.swfObjectId], t && (e = t.length) && (t = t[e - 1]), !t && n && (t = n.firstChild)), Z.bridge = t || null, t
        },
        Oe = function () {
            var e = Z.bridge;
            if (e) {
                var r = ke(e);
                r && ("activex" === Z.pluginType && "readyState" in e ? (e.style.display = "none", function a() {
                    if (4 === e.readyState) {
                        for (var t in e) "function" == typeof e[t] && (e[t] = null);
                        e.parentNode && e.parentNode.removeChild(e), r.parentNode && r.parentNode.removeChild(r)
                    } else i(a, 10)
                }()) : (e.parentNode && e.parentNode.removeChild(e), r.parentNode && r.parentNode.removeChild(r))), Ye(), Z.ready = null, Z.bridge = null, Z.deactivated = null, $ = t
            }
        },
        Ie = function (e) {
            var t = {},
                r = {};
            if ("object" == typeof e && e) {
                for (var a in e)
                    if (a && b.call(e, a) && "string" == typeof e[a] && e[a]) switch (a.toLowerCase()) {
                    case "text/plain":
                    case "text":
                    case "air:text":
                    case "flash:text":
                        t.text = e[a], r.text = a;
                        break;
                    case "text/html":
                    case "html":
                    case "air:html":
                    case "flash:html":
                        t.html = e[a], r.html = a;
                        break;
                    case "application/rtf":
                    case "text/rtf":
                    case "rtf":
                    case "richtext":
                    case "air:rtf":
                    case "flash:rtf":
                        t.rtf = e[a], r.rtf = a
                    }
                    return {
                        data: t,
                        formatMap: r
                    }
            }
        },
        Ae = function (e, t) {
            if ("object" != typeof e || !e || "object" != typeof t || !t) return e;
            var r = {};
            for (var a in e)
                if (b.call(e, a))
                    if ("errors" === a) {
                        r[a] = e[a] ? e[a].slice() : [];
                        for (var n = 0, i = r[a].length; i > n; n++) r[a][n].format = t[r[a][n].format]
                    } else if ("success" !== a && "data" !== a) r[a] = e[a];
            else {
                r[a] = {};
                var o = e[a];
                for (var l in o) l && b.call(o, l) && b.call(t, l) && (r[a][t[l]] = o[l])
            }
            return r
        },
        Le = function (e, t) {
            var r = null == t || t && t.cacheBust === !0;
            return r ? (-1 === e.indexOf("?") ? "?" : "&") + "noCache=" + m() : ""
        },
        _e = function (e) {
            var t, a, n, i, o = "",
                l = [];
            if (e.trustedDomains && ("string" == typeof e.trustedDomains ? i = [e.trustedDomains] : "object" == typeof e.trustedDomains && "length" in e.trustedDomains && (i = e.trustedDomains)), i && i.length)
                for (t = 0, a = i.length; a > t; t++)
                    if (b.call(i, t) && i[t] && "string" == typeof i[t]) {
                        if (n = Fe(i[t]), !n) continue;
                        if ("*" === n) {
                            l.length = 0, l.push(n);
                            break
                        }
                        l.push.apply(l, [n, "//" + n, r.location.protocol + "//" + n])
                    }
            return l.length && (o += "trustedOrigins=" + u(l.join(","))), e.forceEnhancedClipboard === !0 && (o += (o ? "&" : "") + "forceEnhancedClipboard=true"), "string" == typeof e.swfObjectId && e.swfObjectId && (o += (o ? "&" : "") + "swfObjectId=" + u(e.swfObjectId)), "string" == typeof e.jsVersion && e.jsVersion && (o += (o ? "&" : "") + "jsVersion=" + u(e.jsVersion)), o
        },
        Fe = function (e) {
            if (null == e || "" === e) return null;
            if (e = e.replace(/^\s+|\s+$/g, ""), "" === e) return null;
            var t = e.indexOf("//");
            e = -1 === t ? e : e.slice(t + 2);
            var r = e.indexOf("/");
            return e = -1 === r ? e : -1 === t || 0 === r ? null : e.slice(0, r), e && ".swf" === e.slice(-4).toLowerCase() ? null : e || null
        },
        Se = function () {
            var e = function (e) {
                var t, r, a, n = [];
                if ("string" == typeof e && (e = [e]), "object" != typeof e || !e || "number" != typeof e.length) return n;
                for (t = 0, r = e.length; r > t; t++)
                    if (b.call(e, t) && (a = Fe(e[t]))) {
                        if ("*" === a) {
                            n.length = 0, n.push("*");
                            break
                        } - 1 === n.indexOf(a) && n.push(a)
                    }
                return n
            };
            return function (t, r) {
                var a = Fe(r.swfPath);
                null === a && (a = t);
                var n = e(r.trustedDomains),
                    i = n.length;
                if (i > 0) {
                    if (1 === i && "*" === n[0]) return "always";
                    if (-1 !== n.indexOf(t)) return 1 === i && t === a ? "sameDomain" : "always"
                }
                return "never"
            }
        }(),
        ze = function () {
            try {
                return a.activeElement
            } catch (e) {
                return null
            }
        },
        Ze = function (e, t) {
            var r, a, n, i = [];
            if ("string" == typeof t && t && (i = t.split(/\s+/)), e && 1 === e.nodeType && i.length > 0) {
                for (n = (" " + (e.className || "") + " ").replace(/[\t\r\n\f]/g, " "), r = 0, a = i.length; a > r; r++) - 1 === n.indexOf(" " + i[r] + " ") && (n += i[r] + " ");
                n = n.replace(/^\s+|\s+$/g, ""), n !== e.className && (e.className = n)
            }
            return e
        },
        Ve = function (e, t) {
            var r, a, n, i = [];
            if ("string" == typeof t && t && (i = t.split(/\s+/)), e && 1 === e.nodeType && i.length > 0 && e.className) {
                for (n = (" " + e.className + " ").replace(/[\t\r\n\f]/g, " "), r = 0, a = i.length; a > r; r++) n = n.replace(" " + i[r] + " ", " ");
                n = n.replace(/^\s+|\s+$/g, ""), n !== e.className && (e.className = n)
            }
            return e
        },
        $e = function (e, t) {
            var r = f(e, null).getPropertyValue(t);
            return "cursor" !== t || r && "auto" !== r || "A" !== e.nodeName ? r : "pointer"
        },
        Xe = function (e) {
            var t = {
                left: 0,
                top: 0,
                width: 0,
                height: 0
            };
            if (e.getBoundingClientRect) {
                var n = e.getBoundingClientRect(),
                    i = r.pageXOffset,
                    o = r.pageYOffset,
                    l = a.documentElement.clientLeft || 0,
                    s = a.documentElement.clientTop || 0,
                    f = 0,
                    u = 0;
                if ("relative" === $e(a.body, "position")) {
                    var c = a.body.getBoundingClientRect(),
                        d = a.documentElement.getBoundingClientRect();
                    f = c.left - d.left || 0, u = c.top - d.top || 0
                }
                t.left = n.left + i - l - f, t.top = n.top + o - s - u, t.width = "width" in n ? n.width : n.right - n.left, t.height = "height" in n ? n.height : n.bottom - n.top
            }
            return t
        },
        Be = function (e) {
            if (!e) return !1;
            var t = f(e, null);
            if (!t) return !1;
            var r = v(t.height) > 0,
                a = v(t.width) > 0,
                n = v(t.top) >= 0,
                i = v(t.left) >= 0,
                o = r && a && n && i,
                l = o ? null : Xe(e),
                s = "none" !== t.display && "collapse" !== t.visibility && (o || !!l && (r || l.height > 0) && (a || l.width > 0) && (n || l.top >= 0) && (i || l.left >= 0));
            return s
        },
        Ye = function () {
            o(H), H = 0, s(R), R = 0
        },
        Me = function () {
            var e;
            if (B && (e = ke(Z.bridge))) {
                var t = Xe(B);
                E(e.style, {
                    width: t.width + "px",
                    height: t.height + "px",
                    top: t.top + "px",
                    left: t.left + "px",
                    zIndex: "" + He(q.zIndex)
                })
            }
        },
        Pe = function (e) {
            Z.ready === !0 && (Z.bridge && "function" == typeof Z.bridge.setHandCursor ? Z.bridge.setHandCursor(e) : Z.ready = !1)
        },
        He = function (e) {
            if (/^(?:auto|inherit)$/.test(e)) return e;
            var t;
            return "number" != typeof e || h(e) ? "string" == typeof e && (t = He(p(e, 10))) : t = e, "number" == typeof t ? t : "auto"
        },
        Re = function (e) {
            var t = /(\r\n|\r|\n)/g;
            return "string" == typeof e && q.fixLineEndings === !0 && (S() ? /((^|[^\r])\n|\r([^\n]|$))/.test(e) && (e = e.replace(t, "\r\n")) : /\r/.test(e) && (e = e.replace(t, "\n"))), e
        },
        Je = function (t) {
            var r, a, n, i = Z.sandboxed,
                o = null;
            if (t = t === !0, z === !1) o = !1;
            else {
                try {
                    a = e.frameElement || null
                } catch (l) {
                    n = {
                        name: l.name,
                        message: l.message
                    }
                }
                if (a && 1 === a.nodeType && "IFRAME" === a.nodeName) try {
                    o = a.hasAttribute("sandbox")
                } catch (l) {
                    o = null
                } else {
                    try {
                        r = document.domain || null
                    } catch (l) {
                        r = null
                    }(null === r || n && "SecurityError" === n.name && /(^|[\s\(\[@])sandbox(es|ed|ing|[\s\.,!\)\]@]|$)/.test(n.message.toLowerCase())) && (o = !0)
                }
            }
            return Z.sandboxed = o, i === o || t || Ke(c), o
        },
        Ke = function (e) {
            function f(e) {
                var t = e.match(/[\d]+/g);
                return t.length = 3, t.join(".")
            }

            function u(e) {
                return !!e && (e = e.toLowerCase()) && (/^(pepflashplayer\.dll|libpepflashplayer\.so|pepperflashplayer\.plugin)$/.test(e) || "chrome.plugin" === e.slice(-13))
            }

            function c(e) {
                e && (i = !0, e.version && (s = f(e.version)), !s && e.description && (s = f(e.description)), e.filename && (l = u(e.filename)))
            }
            var t, r, a, i = !1,
                o = !1,
                l = !1,
                s = "";
            if (n.plugins && n.plugins.length) t = n.plugins["Shockwave Flash"], c(t), n.plugins["Shockwave Flash 2.0"] && (i = !0, s = "2.0.0.11");
            else if (n.mimeTypes && n.mimeTypes.length) a = n.mimeTypes["application/x-shockwave-flash"], t = a && a.enabledPlugin, c(t);
            else if ("undefined" != typeof e) {
                o = !0;
                try {
                    r = new e("ShockwaveFlash.ShockwaveFlash.7"), i = !0, s = f(r.GetVariable("$version"))
                } catch (d) {
                    try {
                        r = new e("ShockwaveFlash.ShockwaveFlash.6"), i = !0, s = "6.0.21"
                    } catch (p) {
                        try {
                            r = new e("ShockwaveFlash.ShockwaveFlash"), i = !0, s = f(r.GetVariable("$version"))
                        } catch (h) {
                            o = !1
                        }
                    }
                }
            }
            Z.disabled = i !== !0, Z.outdated = s && v(s) < v(V), Z.version = s || "0.0.0", Z.pluginType = l ? "pepper" : o ? "activex" : i ? "netscape" : "unknown"
        };
    Ke(c), Je(!0);
    var Ue = function () {
        return this instanceof Ue ? void("function" == typeof Ue._createClient && Ue._createClient.apply(this, C(arguments))) : new Ue
    };
    g(Ue, "version", {
        value: "2.3.0-beta.1",
        writable: !1,
        configurable: !0,
        enumerable: !0
    }), Ue.config = function () {
        return Q.apply(this, C(arguments))
    }, Ue.state = function () {
        return ee.apply(this, C(arguments))
    }, Ue.isFlashUnusable = function () {
        return te.apply(this, C(arguments))
    }, Ue.on = function () {
        return re.apply(this, C(arguments))
    }, Ue.off = function () {
        return ae.apply(this, C(arguments))
    }, Ue.handlers = function () {
        return ne.apply(this, C(arguments))
    }, Ue.emit = function () {
        return ie.apply(this, C(arguments))
    }, Ue.create = function () {
        return oe.apply(this, C(arguments))
    }, Ue.destroy = function () {
        return le.apply(this, C(arguments))
    }, Ue.setData = function () {
        return se.apply(this, C(arguments))
    }, Ue.clearData = function () {
        return fe.apply(this, C(arguments))
    }, Ue.getData = function () {
        return ue.apply(this, C(arguments))
    }, Ue.focus = Ue.activate = function () {
        return ce.apply(this, C(arguments))
    }, Ue.blur = Ue.deactivate = function () {
        return de.apply(this, C(arguments))
    }, Ue.activeElement = function () {
        return pe.apply(this, C(arguments))
    };
    var We = 0,
        Ge = {},
        qe = 0,
        Qe = {},
        et = {};
    E(q, {
        autoActivate: !0
    });
    var tt = function (e) {
            var t = this;
            t.id = "" + We++, Ge[t.id] = {
                instance: t,
                elements: [],
                handlers: {}
            }, e && t.clip(e), Ue.on("*", function (e) {
                return t.emit(e)
            }), Ue.on("destroy", function () {
                t.destroy()
            }), Ue.create()
        },
        rt = function (e, r) {
            var a, n, i, o = {},
                l = Ge[this.id],
                s = l && l.handlers;
            if (!l) throw new Error("Attempted to add new listener(s) to a destroyed ZeroClipboard client instance");
            if ("string" == typeof e && e) i = e.toLowerCase().split(/\s+/);
            else if ("object" == typeof e && e && "undefined" == typeof r)
                for (a in e) b.call(e, a) && "string" == typeof a && a && "function" == typeof e[a] && this.on(a, e[a]);
            if (i && i.length) {
                for (a = 0, n = i.length; n > a; a++) e = i[a].replace(/^on/, ""), o[e] = !0, s[e] || (s[e] = []), s[e].push(r);
                if (o.ready && Z.ready && this.emit({
                        type: "ready",
                        client: this
                    }), o.error) {
                    for (a = 0, n = U.length; n > a; a++)
                        if (Z[U[a].replace(/^flash-/, "")]) {
                            this.emit({
                                type: "error",
                                name: U[a],
                                client: this
                            });
                            break
                        }
                    $ !== t && Ue.version !== $ && this.emit({
                        type: "error",
                        name: "version-mismatch",
                        jsVersion: Ue.version,
                        swfVersion: $
                    })
                }
            }
            return this
        },
        at = function (e, t) {
            var r, a, n, i, o, l = Ge[this.id],
                s = l && l.handlers;
            if (!s) return this;
            if (0 === arguments.length) i = y(s);
            else if ("string" == typeof e && e) i = e.split(/\s+/);
            else if ("object" == typeof e && e && "undefined" == typeof t)
                for (r in e) b.call(e, r) && "string" == typeof r && r && "function" == typeof e[r] && this.off(r, e[r]);
            if (i && i.length)
                for (r = 0, a = i.length; a > r; r++)
                    if (e = i[r].toLowerCase().replace(/^on/, ""), o = s[e], o && o.length)
                        if (t)
                            for (n = o.indexOf(t); - 1 !== n;) o.splice(n, 1), n = o.indexOf(t, n);
                        else o.length = 0;
            return this
        },
        nt = function (e) {
            var t = null,
                r = Ge[this.id] && Ge[this.id].handlers;
            return r && (t = "string" == typeof e && e ? r[e] ? r[e].slice(0) : [] : T(r)), t
        },
        it = function (e) {
            if (ut.call(this, e)) {
                "object" == typeof e && e && "string" == typeof e.type && e.type && (e = E({}, e));
                var t = E({}, he(e), {
                    client: this
                });
                ct.call(this, t)
            }
            return this
        },
        ot = function (e) {
            if (!Ge[this.id]) throw new Error("Attempted to clip element(s) to a destroyed ZeroClipboard client instance");
            e = dt(e);
            for (var t = 0; t < e.length; t++)
                if (b.call(e, t) && e[t] && 1 === e[t].nodeType) {
                    e[t].zcClippingId ? -1 === Qe[e[t].zcClippingId].indexOf(this.id) && Qe[e[t].zcClippingId].push(this.id) : (e[t].zcClippingId = "zcClippingId_" + qe++, Qe[e[t].zcClippingId] = [this.id], q.autoActivate === !0 && pt(e[t]));
                    var r = Ge[this.id] && Ge[this.id].elements; - 1 === r.indexOf(e[t]) && r.push(e[t])
                }
            return this
        },
        lt = function (e) {
            var t = Ge[this.id];
            if (!t) return this;
            var a, r = t.elements;
            e = "undefined" == typeof e ? r.slice(0) : dt(e);
            for (var n = e.length; n--;)
                if (b.call(e, n) && e[n] && 1 === e[n].nodeType) {
                    for (a = 0; - 1 !== (a = r.indexOf(e[n], a));) r.splice(a, 1);
                    var i = Qe[e[n].zcClippingId];
                    if (i) {
                        for (a = 0; - 1 !== (a = i.indexOf(this.id, a));) i.splice(a, 1);
                        0 === i.length && (q.autoActivate === !0 && vt(e[n]), delete e[n].zcClippingId)
                    }
                }
            return this
        },
        st = function () {
            var e = Ge[this.id];
            return e && e.elements ? e.elements.slice(0) : []
        },
        ft = function () {
            Ge[this.id] && (this.unclip(), this.off(), delete Ge[this.id])
        },
        ut = function (e) {
            if (!e || !e.type) return !1;
            if (e.client && e.client !== this) return !1;
            var t = Ge[this.id],
                r = t && t.elements,
                a = !!r && r.length > 0,
                n = !e.target || a && -1 !== r.indexOf(e.target),
                i = e.relatedTarget && a && -1 !== r.indexOf(e.relatedTarget),
                o = e.client && e.client === this;
            return t && (n || i || o) ? !0 : !1
        },
        ct = function (e) {
            var t = Ge[this.id];
            if ("object" == typeof e && e && e.type && t) {
                var a = ge(e),
                    n = t && t.handlers["*"] || [],
                    i = t && t.handlers[e.type] || [],
                    o = n.concat(i);
                if (o && o.length) {
                    var l, s, f, u, c, d = this;
                    for (l = 0, s = o.length; s > l; l++) f = o[l], u = d, "string" == typeof f && "function" == typeof r[f] && (f = r[f]), "object" == typeof f && f && "function" == typeof f.handleEvent && (u = f, f = f.handleEvent), "function" == typeof f && (c = E({}, e), be(f, u, [c], a))
                }
            }
        },
        dt = function (e) {
            return "string" == typeof e && (e = []), "number" != typeof e.length ? [e] : e
        },
        pt = function (e) {
            if (e && 1 === e.nodeType) {
                var t = function (e) {
                        (e || (e = r.event)) && ("js" !== e._source && (e.stopImmediatePropagation(), e.preventDefault()), delete e._source)
                    },
                    a = function (a) {
                        (a || (a = r.event)) && (t(a), Ue.focus(e))
                    };
                e.addEventListener("mouseover", a, !1), e.addEventListener("mouseout", t, !1), e.addEventListener("mouseenter", t, !1), e.addEventListener("mouseleave", t, !1), e.addEventListener("mousemove", t, !1), et[e.zcClippingId] = {
                    mouseover: a,
                    mouseout: t,
                    mouseenter: t,
                    mouseleave: t,
                    mousemove: t
                }
            }
        },
        vt = function (e) {
            if (e && 1 === e.nodeType) {
                var t = et[e.zcClippingId];
                if ("object" == typeof t && t) {
                    for (var r, a, n = ["move", "leave", "enter", "out", "over"], i = 0, o = n.length; o > i; i++) r = "mouse" + n[i], a = t[r], "function" == typeof a && e.removeEventListener(r, a, !1);
                    delete et[e.zcClippingId]
                }
            }
        };
    Ue._createClient = function () {
        tt.apply(this, C(arguments))
    }, Ue.prototype.on = function () {
        return rt.apply(this, C(arguments))
    }, Ue.prototype.off = function () {
        return at.apply(this, C(arguments))
    }, Ue.prototype.handlers = function () {
        return nt.apply(this, C(arguments))
    }, Ue.prototype.emit = function () {
        return it.apply(this, C(arguments))
    }, Ue.prototype.clip = function () {
        return ot.apply(this, C(arguments))
    }, Ue.prototype.unclip = function () {
        return lt.apply(this, C(arguments))
    }, Ue.prototype.elements = function () {
        return st.apply(this, C(arguments))
    }, Ue.prototype.destroy = function () {
        return ft.apply(this, C(arguments))
    }, Ue.prototype.setText = function (e) {
        if (!Ge[this.id]) throw new Error("Attempted to set pending clipboard data from a destroyed ZeroClipboard client instance");
        return Ue.setData("text/plain", e), this
    }, Ue.prototype.setHtml = function (e) {
        if (!Ge[this.id]) throw new Error("Attempted to set pending clipboard data from a destroyed ZeroClipboard client instance");
        return Ue.setData("text/html", e), this
    }, Ue.prototype.setRichText = function (e) {
        if (!Ge[this.id]) throw new Error("Attempted to set pending clipboard data from a destroyed ZeroClipboard client instance");
        return Ue.setData("application/rtf", e), this
    }, Ue.prototype.setData = function () {
        if (!Ge[this.id]) throw new Error("Attempted to set pending clipboard data from a destroyed ZeroClipboard client instance");
        return Ue.setData.apply(this, C(arguments)), this
    }, Ue.prototype.clearData = function () {
        if (!Ge[this.id]) throw new Error("Attempted to clear pending clipboard data from a destroyed ZeroClipboard client instance");
        return Ue.clearData.apply(this, C(arguments)), this
    }, Ue.prototype.getData = function () {
        if (!Ge[this.id]) throw new Error("Attempted to get pending clipboard data from a destroyed ZeroClipboard client instance");
        return Ue.getData.apply(this, C(arguments))
    }, "function" == typeof define && define.amd ? define(function () {
        return Ue
    }) : "object" == typeof module && module && "object" == typeof module.exports && module.exports ? module.exports = Ue : e.ZeroClipboard = Ue
}(function () {
    return this || window
}());
