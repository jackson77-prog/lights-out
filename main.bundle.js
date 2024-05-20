(()=>{
    var t = {
        725: (t,e,n)=>{
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.EzComponent = e.HttpMethod = void 0;
            const i = n(671);
            var o;
            !function(t) {
                t.GET = "GET",
                t.POST = "POST",
                t.PUT = "PUT",
                t.DELETE = "DELETE",
                t.PATCH = "PATCH",
                t.OPTIONS = "OPTIONS"
            }(o || (e.HttpMethod = o = {}));
            class r {
                get onResizeEvent() {
                    return r.resizeEvent
                }
                constructor(t, e) {
                    this.html = t,
                    this.css = e,
                    this.htmlElement = window.document.createElement("div"),
                    this.shadow = this.htmlElement.attachShadow({
                        mode: "open"
                    }),
                    this.template = window.document.createElement("template"),
                    this.template.innerHTML = this.html;
                    for (let t of window.document.styleSheets)
                        t.ownerNode && this.shadow.appendChild(t.ownerNode.cloneNode(!0));
                    this.styles = window.document.createElement("style"),
                    this.styles.innerHTML = this.css,
                    this.shadow.appendChild(this.styles);
                    const n = window.document.createElement("div");
                    n.id = "rootTemplate",
                    n.appendChild(this.template.content),
                    this.template.content.appendChild(n),
                    this.shadow.appendChild(n),
                    this.shadow.appendChild(this.template.content.cloneNode(!0)),
                    window.onresize || (window.onresize = ()=>{
                        r.resizeEvent.next({
                            windowWidth: window.innerWidth,
                            windowHeight: window.innerHeight
                        })
                    }
                    )
                }
                addComponent(t, e="root", n=!1) {
                    if (n)
                        if ("root" === e)
                            this.shadow.firstChild && this.shadow.insertBefore(t.htmlElement, this.shadow.firstChild);
                        else {
                            let n = this.shadow.getElementById(e);
                            n && (n.firstChild ? n.insertBefore(t.htmlElement, n.firstChild) : n.appendChild(t.htmlElement))
                        }
                    else if ("root" === e)
                        this.shadow.appendChild(t.htmlElement);
                    else {
                        let n = this.shadow.getElementById(e);
                        n && n.appendChild(t.htmlElement)
                    }
                }
                removeComponent(t) {
                    return t.htmlElement.remove(),
                    t
                }
                appendToDomElement(t) {
                    t.appendChild(this.htmlElement)
                }
                static ajax(t, e, n=[], o) {
                    const r = new i.EventSubject
                      , s = new XMLHttpRequest;
                    s.open(e, t);
                    for (let t of n)
                        Object.keys(t).forEach((e=>{
                            t[e] && s.setRequestHeader(e, t[e])
                        }
                        ));
                    return s.onload = ()=>{
                        s.status >= 200 && s.status < 300 ? r.next(JSON.parse(s.responseText)) : r.error(new Error(s.statusText))
                    }
                    ,
                    s.onerror = ()=>{
                        r.error(new Error("Network error"))
                    }
                    ,
                    s.send(JSON.stringify(o)),
                    r
                }
                getWindowSize() {
                    return {
                        windowWidth: window.innerWidth,
                        windowHeight: window.innerHeight
                    }
                }
                focus(t) {
                    let e = this.shadow.getElementById(t);
                    e && e.focus()
                }
                click(t) {
                    let e = this.shadow.getElementById(t);
                    e && e.click()
                }
                getValue(t) {
                    const e = this.shadow.getElementById(t);
                    if (e instanceof HTMLInputElement)
                        return e.value;
                    if (e instanceof HTMLTextAreaElement)
                        return e.value;
                    if (e instanceof HTMLSelectElement)
                        return e.value;
                    if (e instanceof HTMLOptionElement)
                        return e.value;
                    throw new Error("Element does not have a value property")
                }
            }
            e.EzComponent = r,
            r.resizeEvent = new i.EventSubject
        }
        ,
        720: (t,e,n)=>{
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.EzDialog = e.popupDialog = void 0;
            const i = n(725)
              , o = n(671);
            e.popupDialog = void 0;
            class r extends i.EzComponent {
                constructor(t="", e="") {
                    super(t, e),
                    this.closeEvent = new o.EventSubject;
                    const n = window.document.createElement("style");
                    n.innerHTML = "\n.dialog-background {\n    display: none;\n    position: absolute;\n    text-align:center;\n    z-index: 1050;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    overflow: hidden;\n    outline: 0;\n    background-color: rgb(0, 0, 0, 0.5);\n\n}\n.dialog-popup {\n    position: relative;\n    top:50%;\n    background-color: white;\n    border-radius: 10px;\n    padding: 10px;\n    transform: translateY(-50%);\n    margin:auto;\n    box-shadow: 4px 8px 8px 4px rgba(0, 0, 0, 0.2);\n\tdisplay:inline-block;\n\toverflow:hidden;\n}",
                    this.shadow.appendChild(n),
                    this.background = window.document.createElement("div"),
                    this.background.className = "dialog-background",
                    this.background.id = "background-root",
                    this.background.style.display = "none",
                    this.popup = window.document.createElement("div"),
                    this.popup.className = "dialog-popup",
                    this.background.appendChild(this.popup),
                    this.shadow.appendChild(this.background);
                    const i = this.shadow.getElementById("rootTemplate");
                    i && this.popup.appendChild(i)
                }
                show(t=!0) {
                    this.background.style.display = t ? "inline-block" : "none"
                }
                static clickPopupButton(t) {
                    if (e.popupDialog) {
                        const e = this.popupButtons.length > t ? this.popupButtons[t] : void 0;
                        e && e.click()
                    }
                }
                static popup(t, n, i="Alert", o=["Ok"], s="") {
                    const a = new r('\n<div style="width: 600px; margin: -10px">\n    <div\n        id="title"\n        style="\n            background: silver;\n            padding: 10px;\n            font-size: 20pt;\n            font-weight: bold;\n            overflow: hidden;\n        "\n    >\n        My Dialog\n    </div>\n    <div\n        style="\n            display: flex;\n            min-height: 100px;\n            margin: 10px;\n            font-size: 20px;\n            text-align: center;\n            align-items: center;\n            justify-items: center;\n            line-height: 20px;\n        "\n    >\n        <div\n            id="content"\n            style="display: block; width: 100%; text-align: center"\n        >\n            Question goes here\n        </div>\n    </div>\n    <div id="buttonDiv" style="margin: 10px; text-align: right; justify-content: center">\n    </div>\n</div>');
                    e.popupDialog = a;
                    let c = a.shadow.getElementById("title");
                    c && (c.innerHTML = i);
                    let u = a.shadow.getElementById("content");
                    u && (u.innerHTML = n);
                    const l = a.shadow.getElementById("buttonDiv");
                    if (l)
                        for (let t of o) {
                            let e = window.document.createElement("button");
                            e.innerHTML = t,
                            e.value = t,
                            e.id = "btn_" + t,
                            e.className = s,
                            e.style.marginLeft = "10px",
                            e.addEventListener("click", (()=>{
                                a.show(!1),
                                a.closeEvent.next(e.value)
                            }
                            )),
                            this.popupButtons.push(e),
                            l.appendChild(e)
                        }
                    return t.addComponent(a),
                    a.show(),
                    a.closeEvent.subscribe((()=>{
                        t.removeComponent(a)
                    }
                    )),
                    a.closeEvent
                }
            }
            e.EzDialog = r,
            r.popupButtons = []
        }
        ,
        598: (t,e)=>{
            "use strict";
            function n(t) {
                return String(t)
            }
            function i(t, e, i, o, r=!1) {
                const s = n(e)
                  , a = function(t) {
                    return `__${String(t)}`
                }(e);
                Object.defineProperty(t, a, {
                    value: i,
                    writable: !0,
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(t, s, {
                    get() {
                        return this[a]
                    },
                    set(t) {
                        r && o(t),
                        this[a] = t,
                        r || o(t)
                    },
                    enumerable: !0,
                    configurable: !0
                })
            }
            function o(t, e, i, o, r=!1) {
                const s = n(e);
                Object.defineProperty(t, s, {
                    get: i.get,
                    set(e) {
                        r && o(e),
                        i.set && i.set.call(t, e),
                        r || o(e)
                    },
                    enumerable: i.enumerable,
                    configurable: i.configurable
                })
            }
            function r(t, e) {
                let n = Object.getOwnPropertyDescriptor(t, e);
                if (!n)
                    throw new Error(`can not find setter with name: ${e}`);
                return n
            }
            function s(t, e, s=(t=>t)) {
                return function(a, c) {
                    c.addInitializer((function() {
                        const a = this.shadow.getElementById(t);
                        if (!a)
                            throw new Error(`can not find HTML element with id: ${t}`);
                        const u = r(this, n(c.name))
                          , l = c.access.get(this);
                        void 0 !== l && (a.style[e] = s.call(this, l)),
                        u.set ? o(this, c.name, u, (t=>{
                            a.style[e] = s.call(this, t)
                        }
                        )) : i(this, c.name, l, (t=>{
                            a.style[e] = s.call(this, t)
                        }
                        ))
                    }
                    ))
                }
            }
            function a(t, e=(t=>t)) {
                return function(s, a) {
                    a.addInitializer((function() {
                        const s = this.shadow.getElementById(t);
                        if (!s)
                            throw new Error(`can not find HTML element with id: ${t}`);
                        const c = r(this, n(a.name))
                          , u = a.access.get(this);
                        if (void 0 !== u) {
                            let t = e.call(this, u).split(" ").filter((t=>t.length > 0));
                            t.length > 0 && (s.className = t.join(" "))
                        }
                        c.set ? o(this, a.name, c, (t=>{
                            let n, i = a.access.get(this);
                            i && (n = e.call(this, i).split(" ").filter((t=>t.length > 0)),
                            n.length > 0 && n.forEach((t=>s.className = s.className.replace(t, ""))));
                            let o = e.call(this, t).split(" ").filter((t=>t.length > 0));
                            o.length > 0 && o.forEach((t=>s.className += ` ${t}`))
                        }
                        ), !0) : i(this, a.name, u, (t=>{
                            let n, i = a.access.get(this);
                            i && (n = e.call(this, i).split(" ").filter((t=>t.length > 0)),
                            n.length > 0 && n.forEach((t=>s.className = s.className.replace(t, ""))));
                            let o = e.call(this, t).split(" ").filter((t=>t.length > 0));
                            o.length > 0 && o.forEach((t=>s.className += ` ${t}`))
                        }
                        ), !0)
                    }
                    ))
                }
            }
            function c(t, e=(t=>t)) {
                return function(s, a) {
                    a.addInitializer((function() {
                        const s = this.shadow.getElementById(t);
                        if (!s)
                            throw new Error(`can not find HTML element with id: ${t}`);
                        const c = r(this, n(a.name))
                          , u = a.access.get(this);
                        void 0 !== u && (s instanceof HTMLInputElement || s instanceof HTMLTextAreaElement || s instanceof HTMLSelectElement ? s.value = e.call(this, u) : s instanceof HTMLOptionElement ? (s.value = e.call(this, u),
                        s.text = e.call(this, u)) : s.innerHTML = e.call(this, u)),
                        c.set ? o(this, a.name, c, (t=>{
                            s instanceof HTMLInputElement || s instanceof HTMLTextAreaElement || s instanceof HTMLSelectElement ? s.value = e.call(this, t) : s instanceof HTMLOptionElement ? (s.value = e.call(this, t),
                            s.text = e.call(this, t)) : s.innerHTML = e.call(this, t)
                        }
                        )) : i(this, a.name, u, (t=>{
                            s instanceof HTMLInputElement || s instanceof HTMLTextAreaElement || s instanceof HTMLSelectElement ? s.value = e.call(this, t) : s instanceof HTMLOptionElement ? (s.value = e.call(this, t),
                            s.text = e.call(this, t)) : s.innerHTML = e.call(this, t)
                        }
                        ))
                    }
                    ))
                }
            }
            function u(t, e, s=(t=>t)) {
                return function(a, c) {
                    c.addInitializer((function() {
                        const a = this.shadow.getElementById(t);
                        if (!a)
                            throw new Error(`can not find HTML element with id: ${t}`);
                        const u = r(this, n(c.name))
                          , l = c.access.get(this);
                        let d;
                        d = t=>{
                            "" !== s.call(this, t) ? a.setAttribute(e, s.call(this, t)) : a.removeAttribute(e)
                        }
                        ,
                        void 0 !== l && d(l),
                        u.set ? o(this, c.name, u, d) : i(this, c.name, l, d)
                    }
                    ))
                }
            }
            function l(t, e, n="") {
                return s(t, e, (t=>`${t}${n}`))
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.BindStyleToNumberAppendPx = e.BindStyleToNumber = e.BindValueToNumber = e.BindCheckedToBoolean = e.BindVisibleToBoolean = e.BindDisabledToBoolean = e.BindCSSClassToBoolean = e.BindAttribute = e.BindValue = e.BindCSSClass = e.BindStyle = void 0,
            e.BindStyle = s,
            e.BindCSSClass = a,
            e.BindValue = c,
            e.BindAttribute = u,
            e.BindCSSClassToBoolean = function(t, e) {
                return a(t, (t=>t ? e : ""))
            }
            ,
            e.BindDisabledToBoolean = function(t) {
                return u(t, "disabled", (t=>t ? "disabled" : ""))
            }
            ,
            e.BindVisibleToBoolean = function(t) {
                return s(t, "display", (t=>t ? "block" : "none"))
            }
            ,
            e.BindCheckedToBoolean = function(t) {
                return u(t, "checked", (t=>t ? "checked" : ""))
            }
            ,
            e.BindValueToNumber = function(t, e="") {
                return c(t, (t=>`${t}${e}`))
            }
            ,
            e.BindStyleToNumber = l,
            e.BindStyleToNumberAppendPx = function(t, e) {
                return l(t, e, "px")
            }
        }
        ,
        233: (t,e)=>{
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.bootstrap = void 0,
            e.bootstrap = function(t, e="", ...n) {
                e.length > 0 && (window.document.body.innerHTML = e);
                let i = Object.assign(new t(...n));
                const o = window.document.getElementById("main-target");
                return o ? i.appendToDomElement(o) : i.appendToDomElement(window.document.body),
                i
            }
        }
        ,
        747: (t,e)=>{
            "use strict";
            function n(t, e) {
                return function(n, i) {
                    i.addInitializer((function() {
                        let i = this.shadow.getElementById(t);
                        i && i.addEventListener(e, (t=>{
                            "input" !== e && "change" !== e || ("checkbox" === i.type ? t.value = i.checked ? "on" : "" : t.value = i.value),
                            n.call(this, t)
                        }
                        ))
                    }
                    ))
                }
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.Timer = e.Input = e.Change = e.Blur = e.Click = e.WindowEvent = e.GenericEvent = void 0,
            e.GenericEvent = n,
            e.WindowEvent = function(t) {
                return function(e, n) {
                    n.addInitializer((function() {
                        window.addEventListener(t, (t=>{
                            e.call(this, t)
                        }
                        ))
                    }
                    ))
                }
            }
            ,
            e.Click = function(t) {
                return n(t, "click")
            }
            ,
            e.Blur = function(t) {
                return n(t, "blur")
            }
            ,
            e.Change = function(t) {
                return n(t, "change")
            }
            ,
            e.Input = function(t) {
                return n(t, "input")
            }
            ,
            e.Timer = function(t) {
                return function(e, n) {
                    n.addInitializer((function() {
                        const n = setInterval((()=>{
                            e.call(this, (()=>{
                                clearInterval(n)
                            }
                            ))
                        }
                        ), t)
                    }
                    ))
                }
            }
        }
        ,
        671: (t,e)=>{
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.EventSubject = void 0;
            e.EventSubject = class {
                constructor() {
                    this.refCount = 0,
                    this.callbacks = [],
                    this.errorFns = []
                }
                subscribe(t, e) {
                    return this.callbacks.push({
                        id: this.refCount,
                        fn: t
                    }),
                    e && this.errorFns.push({
                        id: this.refCount,
                        fn: e
                    }),
                    this.refCount++
                }
                unsubscribe(t) {
                    this.callbacks = this.callbacks.filter((e=>e.id !== t)),
                    this.errorFns = this.errorFns.filter((e=>e.id !== t))
                }
                next(t) {
                    for (const e of this.callbacks)
                        e.fn(t)
                }
                error(t) {
                    for (const e of this.errorFns)
                        e.fn(t)
                }
                toPromise() {
                    return new Promise(((t,e)=>{
                        this.subscribe((e=>{
                            t(e)
                        }
                        ), (t=>{
                            e(t)
                        }
                        ))
                    }
                    ))
                }
            }
        }
        ,
        251: function(t, e, n) {
            "use strict";
            var i = this && this.__createBinding || (Object.create ? function(t, e, n, i) {
                void 0 === i && (i = n);
                var o = Object.getOwnPropertyDescriptor(e, n);
                o && !("get"in o ? !e.__esModule : o.writable || o.configurable) || (o = {
                    enumerable: !0,
                    get: function() {
                        return e[n]
                    }
                }),
                Object.defineProperty(t, i, o)
            }
            : function(t, e, n, i) {
                void 0 === i && (i = n),
                t[i] = e[n]
            }
            )
              , o = this && this.__exportStar || function(t, e) {
                for (var n in t)
                    "default" === n || Object.prototype.hasOwnProperty.call(e, n) || i(e, t, n)
            }
            ;
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            o(n(598), e),
            o(n(747), e),
            o(n(725), e),
            o(n(720), e),
            o(n(671), e),
            o(n(233), e)
        },
        552: (t,e,n)=>{
            "use strict";
            n.d(e, {
                A: ()=>a
            });
            var i = n(601)
              , o = n.n(i)
              , r = n(314)
              , s = n.n(r)()(o());
            s.push([t.id, "* {\n    margin: 0;\n    padding: 0;\n}\n", ""]);
            const a = s
        }
        ,
        314: t=>{
            "use strict";
            t.exports = function(t) {
                var e = [];
                return e.toString = function() {
                    return this.map((function(e) {
                        var n = ""
                          , i = void 0 !== e[5];
                        return e[4] && (n += "@supports (".concat(e[4], ") {")),
                        e[2] && (n += "@media ".concat(e[2], " {")),
                        i && (n += "@layer".concat(e[5].length > 0 ? " ".concat(e[5]) : "", " {")),
                        n += t(e),
                        i && (n += "}"),
                        e[2] && (n += "}"),
                        e[4] && (n += "}"),
                        n
                    }
                    )).join("")
                }
                ,
                e.i = function(t, n, i, o, r) {
                    "string" == typeof t && (t = [[null, t, void 0]]);
                    var s = {};
                    if (i)
                        for (var a = 0; a < this.length; a++) {
                            var c = this[a][0];
                            null != c && (s[c] = !0)
                        }
                    for (var u = 0; u < t.length; u++) {
                        var l = [].concat(t[u]);
                        i && s[l[0]] || (void 0 !== r && (void 0 === l[5] || (l[1] = "@layer".concat(l[5].length > 0 ? " ".concat(l[5]) : "", " {").concat(l[1], "}")),
                        l[5] = r),
                        n && (l[2] ? (l[1] = "@media ".concat(l[2], " {").concat(l[1], "}"),
                        l[2] = n) : l[2] = n),
                        o && (l[4] ? (l[1] = "@supports (".concat(l[4], ") {").concat(l[1], "}"),
                        l[4] = o) : l[4] = "".concat(o)),
                        e.push(l))
                    }
                }
                ,
                e
            }
        }
        ,
        601: t=>{
            "use strict";
            t.exports = function(t) {
                return t[1]
            }
        }
        ,
        331: (t,e,n)=>{
            "use strict";
            n.r(e),
            n.d(e, {
                default: ()=>i
            });
            const i = "#board {\n    position: relative;\n    margin: auto;\n    border: 2px solid rgb(0, 0, 0);\n    background-color: rgb(0, 0, 0);\n}\n"
        }
        ,
        189: (t,e,n)=>{
            "use strict";
            n.r(e),
            n.d(e, {
                default: ()=>i
            });
            const i = "#cell {\n    position: absolute;\n    box-sizing: border-box;\n    border: 2px solid rgb(0, 0, 0);\n    border-radius: 15%;\n}\n"
        }
        ,
        460: (t,e,n)=>{
            "use strict";
            n.r(e),
            n.d(e, {
                default: ()=>i
            });
            const i = "#main {\n    position: relative;\n    width: auto;\n    margin: auto;\n}\n"
        }
        ,
        878: t=>{
            t.exports = '<div id="board"></div>\n'
        }
        ,
        12: t=>{
            t.exports = '<div id="cell"></div>\n'
        }
        ,
        299: t=>{
            t.exports = '<div id="main">\n    <ol id="list"></ol>\n    <form>\n        <label>Variant:&nbsp;</label>\n        <select id="selectVariant">\n            <option value="cardinalNeighbors">Cardinal Neighbors</option>\n            <option value="diagonalNeighbors">Diagonal Neighbors</option>\n            <option value="rowAndColumn">Row and Column</option>\n        </select>\n        <br />\n\n        <label>Width:&nbsp;</label>\n        <span>3</span>\n        <input type="range" min="3" max="10" value="5" id="width" />\n        <span>10</span>\n        <br />\n\n        <label>Height:&nbsp;</label>\n        <span>3</span>\n        <input type="range" min="3" max="10" value="5" id="height" />\n        <span>10</span>\n        <br />\n\n        <button type="button" id="reset">New Game</button>\n    </form>\n</div>\n'
        }
        ,
        721: (t,e,n)=>{
            "use strict";
            n.r(e),
            n.d(e, {
                default: ()=>v
            });
            var i = n(72)
              , o = n.n(i)
              , r = n(825)
              , s = n.n(r)
              , a = n(659)
              , c = n.n(a)
              , u = n(56)
              , l = n.n(u)
              , d = n(540)
              , h = n.n(d)
              , f = n(113)
              , p = n.n(f)
              , m = n(552)
              , g = {};
            g.styleTagTransform = p(),
            g.setAttributes = l(),
            g.insert = c().bind(null, "head"),
            g.domAPI = s(),
            g.insertStyleElement = h();
            o()(m.A, g);
            const v = m.A && m.A.locals ? m.A.locals : void 0
        }
        ,
        72: t=>{
            "use strict";
            var e = [];
            function n(t) {
                for (var n = -1, i = 0; i < e.length; i++)
                    if (e[i].identifier === t) {
                        n = i;
                        break
                    }
                return n
            }
            function i(t, i) {
                for (var r = {}, s = [], a = 0; a < t.length; a++) {
                    var c = t[a]
                      , u = i.base ? c[0] + i.base : c[0]
                      , l = r[u] || 0
                      , d = "".concat(u, " ").concat(l);
                    r[u] = l + 1;
                    var h = n(d)
                      , f = {
                        css: c[1],
                        media: c[2],
                        sourceMap: c[3],
                        supports: c[4],
                        layer: c[5]
                    };
                    if (-1 !== h)
                        e[h].references++,
                        e[h].updater(f);
                    else {
                        var p = o(f, i);
                        i.byIndex = a,
                        e.splice(a, 0, {
                            identifier: d,
                            updater: p,
                            references: 1
                        })
                    }
                    s.push(d)
                }
                return s
            }
            function o(t, e) {
                var n = e.domAPI(e);
                n.update(t);
                return function(e) {
                    if (e) {
                        if (e.css === t.css && e.media === t.media && e.sourceMap === t.sourceMap && e.supports === t.supports && e.layer === t.layer)
                            return;
                        n.update(t = e)
                    } else
                        n.remove()
                }
            }
            t.exports = function(t, o) {
                var r = i(t = t || [], o = o || {});
                return function(t) {
                    t = t || [];
                    for (var s = 0; s < r.length; s++) {
                        var a = n(r[s]);
                        e[a].references--
                    }
                    for (var c = i(t, o), u = 0; u < r.length; u++) {
                        var l = n(r[u]);
                        0 === e[l].references && (e[l].updater(),
                        e.splice(l, 1))
                    }
                    r = c
                }
            }
        }
        ,
        659: t=>{
            "use strict";
            var e = {};
            t.exports = function(t, n) {
                var i = function(t) {
                    if (void 0 === e[t]) {
                        var n = document.querySelector(t);
                        if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement)
                            try {
                                n = n.contentDocument.head
                            } catch (t) {
                                n = null
                            }
                        e[t] = n
                    }
                    return e[t]
                }(t);
                if (!i)
                    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
                i.appendChild(n)
            }
        }
        ,
        540: t=>{
            "use strict";
            t.exports = function(t) {
                var e = document.createElement("style");
                return t.setAttributes(e, t.attributes),
                t.insert(e, t.options),
                e
            }
        }
        ,
        56: (t,e,n)=>{
            "use strict";
            t.exports = function(t) {
                var e = n.nc;
                e && t.setAttribute("nonce", e)
            }
        }
        ,
        825: t=>{
            "use strict";
            t.exports = function(t) {
                if ("undefined" == typeof document)
                    return {
                        update: function() {},
                        remove: function() {}
                    };
                var e = t.insertStyleElement(t);
                return {
                    update: function(n) {
                        !function(t, e, n) {
                            var i = "";
                            n.supports && (i += "@supports (".concat(n.supports, ") {")),
                            n.media && (i += "@media ".concat(n.media, " {"));
                            var o = void 0 !== n.layer;
                            o && (i += "@layer".concat(n.layer.length > 0 ? " ".concat(n.layer) : "", " {")),
                            i += n.css,
                            o && (i += "}"),
                            n.media && (i += "}"),
                            n.supports && (i += "}");
                            var r = n.sourceMap;
                            r && "undefined" != typeof btoa && (i += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r)))), " */")),
                            e.styleTagTransform(i, t, e.options)
                        }(e, t, n)
                    },
                    remove: function() {
                        !function(t) {
                            if (null === t.parentNode)
                                return !1;
                            t.parentNode.removeChild(t)
                        }(e)
                    }
                }
            }
        }
        ,
        113: t=>{
            "use strict";
            t.exports = function(t, e) {
                if (e.styleSheet)
                    e.styleSheet.cssText = t;
                else {
                    for (; e.firstChild; )
                        e.removeChild(e.firstChild);
                    e.appendChild(document.createTextNode(t))
                }
            }
        }
        ,
        575: function(t, e, n) {
            "use strict";
            var i = this && this.__esDecorate || function(t, e, n, i, o, r) {
                function s(t) {
                    if (void 0 !== t && "function" != typeof t)
                        throw new TypeError("Function expected");
                    return t
                }
                for (var a, c = i.kind, u = "getter" === c ? "get" : "setter" === c ? "set" : "value", l = !e && t ? i.static ? t : t.prototype : null, d = e || (l ? Object.getOwnPropertyDescriptor(l, i.name) : {}), h = !1, f = n.length - 1; f >= 0; f--) {
                    var p = {};
                    for (var m in i)
                        p[m] = "access" === m ? {} : i[m];
                    for (var m in i.access)
                        p.access[m] = i.access[m];
                    p.addInitializer = function(t) {
                        if (h)
                            throw new TypeError("Cannot add initializers after decoration has completed");
                        r.push(s(t || null))
                    }
                    ;
                    var g = (0,
                    n[f])("accessor" === c ? {
                        get: d.get,
                        set: d.set
                    } : d[u], p);
                    if ("accessor" === c) {
                        if (void 0 === g)
                            continue;
                        if (null === g || "object" != typeof g)
                            throw new TypeError("Object expected");
                        (a = s(g.get)) && (d.get = a),
                        (a = s(g.set)) && (d.set = a),
                        (a = s(g.init)) && o.unshift(a)
                    } else
                        (a = s(g)) && ("field" === c ? o.unshift(a) : d[u] = a)
                }
                l && Object.defineProperty(l, i.name, d),
                h = !0
            }
              , o = this && this.__runInitializers || function(t, e, n) {
                for (var i = arguments.length > 2, o = 0; o < e.length; o++)
                    n = i ? e[o].call(t, n) : e[o].call(t);
                return i ? n : void 0
            }
              , r = this && this.__importDefault || function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            ;
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.Board = void 0;
            const s = r(n(878))
              , a = r(n(331))
              , c = r(n(836))
              , u = n(251)
              , l = n(965)
              , d = n(746)
              , h = n(802);
            let f = (()=>{
                var t;
                let e, n, r = u.EzComponent, f = [], p = [], m = [], g = [];
                return t = class extends r {
                    constructor(t, e, n) {
                        super(s.default, a.default),
                        this.width = o(this, f, void 0),
                        this.height = (o(this, p),
                        o(this, m, void 0)),
                        this.cells = o(this, g),
                        this.moves = 0,
                        this.width = t,
                        this.height = e,
                        this.cells = n,
                        this.cells.forEach((t=>{
                            this.addComponent(t, "board"),
                            t.onClick.subscribe((t=>{
                                this.onClick(t)
                            }
                            )),
                            t.onEnter.subscribe((t=>{
                                this.onMouseEnter(t)
                            }
                            )),
                            t.onLeave.subscribe((t=>{
                                this.onMouseLeave(t)
                            }
                            ))
                        }
                        )),
                        this.onSolved = new u.EventSubject
                    }
                    get({x: t, y: e}) {
                        const n = t + e * this.width;
                        return this.cells[n]
                    }
                    onClick(t) {
                        t.toggle(),
                        this.neighbors(t).forEach((t=>{
                            t.toggle()
                        }
                        )),
                        this.isSolved() && this.onSolved.next(this)
                    }
                    onMouseEnter(t) {
                        t.highlighted = !0,
                        this.neighbors(t).forEach((t=>{
                            t.highlighted = !0
                        }
                        ))
                    }
                    onMouseLeave(t) {
                        t.highlighted = !1,
                        this.neighbors(t).forEach((t=>{
                            t.highlighted = !1
                        }
                        ))
                    }
                    isSolved() {
                        return this.cells.every((t=>t.isOff()))
                    }
                    isInBounds({x: t, y: e}) {
                        return 0 <= t && t < this.width && 0 <= e && e < this.height
                    }
                    static from({width: t, height: e, value: n}, i) {
                        const o = n.split("").map(((e,n)=>{
                            const i = Math.floor(n % t)
                              , o = Math.floor(n / t)
                              , r = (0,
                            h.match)(e).returnType().with("X", (()=>"on")).otherwise((()=>"off"));
                            return console.log(i, o, r),
                            new l.Cell({
                                x: i,
                                y: o
                            },r)
                        }
                        ));
                        return new i(t,e,o)
                    }
                    static random(t, e, n) {
                        const i = [];
                        for (let n = 0; n < e; n++)
                            for (let e = 0; e < t; e++) {
                                const t = Math.random() < .3 ? "on" : "off";
                                i.push(new l.Cell({
                                    x: e,
                                    y: n
                                },t))
                            }
                        return new n(t,e,i)
                    }
                }
                ,
                (()=>{
                    var o;
                    const s = "function" == typeof Symbol && Symbol.metadata ? Object.create(null !== (o = r[Symbol.metadata]) && void 0 !== o ? o : null) : void 0;
                    e = [(0,
                    u.BindStyle)("board", "width", (t=>(0,
                    d.toPx)(t * c.default.cell.width)))],
                    n = [(0,
                    u.BindStyle)("board", "height", (t=>(0,
                    d.toPx)(t * c.default.cell.height)))],
                    i(null, null, e, {
                        kind: "field",
                        name: "width",
                        static: !1,
                        private: !1,
                        access: {
                            has: t=>"width"in t,
                            get: t=>t.width,
                            set: (t,e)=>{
                                t.width = e
                            }
                        },
                        metadata: s
                    }, f, p),
                    i(null, null, n, {
                        kind: "field",
                        name: "height",
                        static: !1,
                        private: !1,
                        access: {
                            has: t=>"height"in t,
                            get: t=>t.height,
                            set: (t,e)=>{
                                t.height = e
                            }
                        },
                        metadata: s
                    }, m, g),
                    s && Object.defineProperty(t, Symbol.metadata, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: s
                    })
                }
                )(),
                t
            }
            )();
            e.Board = f
        },
        907: (t,e,n)=>{
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.CardinalNeighborsBoard = void 0;
            const i = n(96);
            class o extends i.NeighborsBoard {
                constructor(t, e, n) {
                    super(t, e, n)
                }
                offsets() {
                    return [{
                        dx: 0,
                        dy: -1
                    }, {
                        dx: -1,
                        dy: 0
                    }, {
                        dx: 1,
                        dy: 0
                    }, {
                        dx: 0,
                        dy: 1
                    }]
                }
            }
            e.CardinalNeighborsBoard = o
        }
        ,
        960: (t,e,n)=>{
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.DiagonalNeighborsBoard = void 0;
            const i = n(96);
            class o extends i.NeighborsBoard {
                constructor(t, e, n) {
                    super(t, e, n)
                }
                offsets() {
                    return [{
                        dx: -1,
                        dy: -1
                    }, {
                        dx: 1,
                        dy: -1
                    }, {
                        dx: -1,
                        dy: 1
                    }, {
                        dx: 1,
                        dy: 1
                    }]
                }
            }
            e.DiagonalNeighborsBoard = o
        }
        ,
        96: (t,e,n)=>{
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.NeighborsBoard = void 0;
            const i = n(575);
            class o extends i.Board {
                constructor(t, e, n) {
                    super(t, e, n)
                }
                neighbors(t) {
                    const {x: e, y: n} = t.position;
                    return this.offsets().map((({dx: t, dy: i})=>({
                        x: e + t,
                        y: n + i
                    }))).filter((t=>this.isInBounds(t))).map((t=>this.get(t)))
                }
            }
            e.NeighborsBoard = o
        }
        ,
        296: (t,e,n)=>{
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.RowAndColumnBoard = void 0;
            const i = n(575);
            class o extends i.Board {
                constructor(t, e, n) {
                    super(t, e, n)
                }
                neighbors({position: {x: t, y: e}}) {
                    const n = [];
                    for (let i = 0; i < this.width; i++)
                        i !== t && n.push(this.get({
                            x: i,
                            y: e
                        }));
                    for (let i = 0; i < this.height; i++)
                        i !== e && n.push(this.get({
                            x: t,
                            y: i
                        }));
                    return n
                }
            }
            e.RowAndColumnBoard = o
        }
        ,
        965: function(t, e, n) {
            "use strict";
            var i = this && this.__runInitializers || function(t, e, n) {
                for (var i = arguments.length > 2, o = 0; o < e.length; o++)
                    n = i ? e[o].call(t, n) : e[o].call(t);
                return i ? n : void 0
            }
              , o = this && this.__esDecorate || function(t, e, n, i, o, r) {
                function s(t) {
                    if (void 0 !== t && "function" != typeof t)
                        throw new TypeError("Function expected");
                    return t
                }
                for (var a, c = i.kind, u = "getter" === c ? "get" : "setter" === c ? "set" : "value", l = !e && t ? i.static ? t : t.prototype : null, d = e || (l ? Object.getOwnPropertyDescriptor(l, i.name) : {}), h = !1, f = n.length - 1; f >= 0; f--) {
                    var p = {};
                    for (var m in i)
                        p[m] = "access" === m ? {} : i[m];
                    for (var m in i.access)
                        p.access[m] = i.access[m];
                    p.addInitializer = function(t) {
                        if (h)
                            throw new TypeError("Cannot add initializers after decoration has completed");
                        r.push(s(t || null))
                    }
                    ;
                    var g = (0,
                    n[f])("accessor" === c ? {
                        get: d.get,
                        set: d.set
                    } : d[u], p);
                    if ("accessor" === c) {
                        if (void 0 === g)
                            continue;
                        if (null === g || "object" != typeof g)
                            throw new TypeError("Object expected");
                        (a = s(g.get)) && (d.get = a),
                        (a = s(g.set)) && (d.set = a),
                        (a = s(g.init)) && o.unshift(a)
                    } else
                        (a = s(g)) && ("field" === c ? o.unshift(a) : d[u] = a)
                }
                l && Object.defineProperty(l, i.name, d),
                h = !0
            }
              , r = this && this.__importDefault || function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            ;
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.Cell = void 0;
            const s = r(n(12))
              , a = r(n(189))
              , c = r(n(836))
              , u = n(251)
              , l = n(746);
            let d = (()=>{
                var t;
                let e, n, r, d, h, f, p, m, g = u.EzComponent, v = [], b = [], y = [], w = [], E = [], C = [], x = [], S = [], M = [], T = [], B = [];
                return t = class extends g {
                    constructor(t, e="off") {
                        super(s.default, a.default),
                        this.width = (i(this, v),
                        i(this, b, c.default.cell.width)),
                        this.height = (i(this, y),
                        i(this, w, c.default.cell.height)),
                        this.position = (i(this, E),
                        i(this, C, void 0)),
                        this.status = (i(this, x),
                        i(this, S, void 0)),
                        this.highlighted = (i(this, M),
                        i(this, T, !1)),
                        this.onClick = i(this, B),
                        this.position = t,
                        this.status = e,
                        this.onClick = new u.EventSubject,
                        this.onEnter = new u.EventSubject,
                        this.onLeave = new u.EventSubject
                    }
                    toggle() {
                        this.status = "on" === this.status ? "off" : "on"
                    }
                    isOn() {
                        return "on" === this.status
                    }
                    isOff() {
                        return "off" === this.status
                    }
                    onMouseDown() {
                        this.onClick.next(this)
                    }
                    onMouseEnter() {
                        this.onEnter.next(this)
                    }
                    onMouseLeave() {
                        this.onLeave.next(this)
                    }
                }
                ,
                (()=>{
                    var i;
                    const s = "function" == typeof Symbol && Symbol.metadata ? Object.create(null !== (i = g[Symbol.metadata]) && void 0 !== i ? i : null) : void 0;
                    e = [(0,
                    u.BindStyle)("cell", "width", l.toPx)],
                    n = [(0,
                    u.BindStyle)("cell", "height", l.toPx)],
                    r = [(0,
                    u.BindStyle)("cell", "left", (function({x: t}) {
                        return (0,
                        l.toPx)(t * this.width)
                    }
                    )), (0,
                    u.BindStyle)("cell", "top", (function({y: t}) {
                        return (0,
                        l.toPx)(t * this.height)
                    }
                    ))],
                    d = [(0,
                    u.BindStyle)("cell", "backgroundColor", (t=>"on" === t ? c.default.cell.onColor : c.default.cell.offColor))],
                    h = [(0,
                    u.BindStyle)("cell", "boxShadow", (t=>t ? `inset 0 0 0 2px ${c.default.cell.highlightColor}` : ""))],
                    f = [(0,
                    u.GenericEvent)("cell", "mousedown")],
                    p = [(0,
                    u.GenericEvent)("cell", "mouseenter")],
                    m = [(0,
                    u.GenericEvent)("cell", "mouseleave")],
                    o(t, null, f, {
                        kind: "method",
                        name: "onMouseDown",
                        static: !1,
                        private: !1,
                        access: {
                            has: t=>"onMouseDown"in t,
                            get: t=>t.onMouseDown
                        },
                        metadata: s
                    }, null, v),
                    o(t, null, p, {
                        kind: "method",
                        name: "onMouseEnter",
                        static: !1,
                        private: !1,
                        access: {
                            has: t=>"onMouseEnter"in t,
                            get: t=>t.onMouseEnter
                        },
                        metadata: s
                    }, null, v),
                    o(t, null, m, {
                        kind: "method",
                        name: "onMouseLeave",
                        static: !1,
                        private: !1,
                        access: {
                            has: t=>"onMouseLeave"in t,
                            get: t=>t.onMouseLeave
                        },
                        metadata: s
                    }, null, v),
                    o(null, null, e, {
                        kind: "field",
                        name: "width",
                        static: !1,
                        private: !1,
                        access: {
                            has: t=>"width"in t,
                            get: t=>t.width,
                            set: (t,e)=>{
                                t.width = e
                            }
                        },
                        metadata: s
                    }, b, y),
                    o(null, null, n, {
                        kind: "field",
                        name: "height",
                        static: !1,
                        private: !1,
                        access: {
                            has: t=>"height"in t,
                            get: t=>t.height,
                            set: (t,e)=>{
                                t.height = e
                            }
                        },
                        metadata: s
                    }, w, E),
                    o(null, null, r, {
                        kind: "field",
                        name: "position",
                        static: !1,
                        private: !1,
                        access: {
                            has: t=>"position"in t,
                            get: t=>t.position,
                            set: (t,e)=>{
                                t.position = e
                            }
                        },
                        metadata: s
                    }, C, x),
                    o(null, null, d, {
                        kind: "field",
                        name: "status",
                        static: !1,
                        private: !1,
                        access: {
                            has: t=>"status"in t,
                            get: t=>t.status,
                            set: (t,e)=>{
                                t.status = e
                            }
                        },
                        metadata: s
                    }, S, M),
                    o(null, null, h, {
                        kind: "field",
                        name: "highlighted",
                        static: !1,
                        private: !1,
                        access: {
                            has: t=>"highlighted"in t,
                            get: t=>t.highlighted,
                            set: (t,e)=>{
                                t.highlighted = e
                            }
                        },
                        metadata: s
                    }, T, B),
                    s && Object.defineProperty(t, Symbol.metadata, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: s
                    })
                }
                )(),
                t
            }
            )();
            e.Cell = d
        },
        836: (t,e)=>{
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.default = {
                cell: {
                    width: 64,
                    height: 64,
                    offColor: "grey",
                    onColor: "tomato",
                    highlightColor: "gainsboro"
                }
            }
        }
        ,
        182: function(t, e, n) {
            "use strict";
            var i = this && this.__runInitializers || function(t, e, n) {
                for (var i = arguments.length > 2, o = 0; o < e.length; o++)
                    n = i ? e[o].call(t, n) : e[o].call(t);
                return i ? n : void 0
            }
              , o = this && this.__esDecorate || function(t, e, n, i, o, r) {
                function s(t) {
                    if (void 0 !== t && "function" != typeof t)
                        throw new TypeError("Function expected");
                    return t
                }
                for (var a, c = i.kind, u = "getter" === c ? "get" : "setter" === c ? "set" : "value", l = !e && t ? i.static ? t : t.prototype : null, d = e || (l ? Object.getOwnPropertyDescriptor(l, i.name) : {}), h = !1, f = n.length - 1; f >= 0; f--) {
                    var p = {};
                    for (var m in i)
                        p[m] = "access" === m ? {} : i[m];
                    for (var m in i.access)
                        p.access[m] = i.access[m];
                    p.addInitializer = function(t) {
                        if (h)
                            throw new TypeError("Cannot add initializers after decoration has completed");
                        r.push(s(t || null))
                    }
                    ;
                    var g = (0,
                    n[f])("accessor" === c ? {
                        get: d.get,
                        set: d.set
                    } : d[u], p);
                    if ("accessor" === c) {
                        if (void 0 === g)
                            continue;
                        if (null === g || "object" != typeof g)
                            throw new TypeError("Object expected");
                        (a = s(g.get)) && (d.get = a),
                        (a = s(g.set)) && (d.set = a),
                        (a = s(g.init)) && o.unshift(a)
                    } else
                        (a = s(g)) && ("field" === c ? o.unshift(a) : d[u] = a)
                }
                l && Object.defineProperty(l, i.name, d),
                h = !0
            }
              , r = this && this.__awaiter || function(t, e, n, i) {
                return new (n || (n = Promise))((function(o, r) {
                    function s(t) {
                        try {
                            c(i.next(t))
                        } catch (t) {
                            r(t)
                        }
                    }
                    function a(t) {
                        try {
                            c(i.throw(t))
                        } catch (t) {
                            r(t)
                        }
                    }
                    function c(t) {
                        var e;
                        t.done ? o(t.value) : (e = t.value,
                        e instanceof n ? e : new n((function(t) {
                            t(e)
                        }
                        ))).then(s, a)
                    }
                    c((i = i.apply(t, e || [])).next())
                }
                ))
            }
              , s = this && this.__importDefault || function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            ;
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.MainComponent = void 0;
            const a = s(n(299))
              , c = s(n(460))
              , u = n(251)
              , l = n(575)
              , d = n(907)
              , h = n(960)
              , f = n(296)
              , p = s(n(966))
              , m = {
                cardinalNeighbors: d.CardinalNeighborsBoard,
                diagonalNeighbors: h.DiagonalNeighborsBoard,
                rowAndColumn: f.RowAndColumnBoard
            };
            let g = (()=>{
                var t;
                let e, n, s, h, f, g, v = u.EzComponent, b = [], y = [], w = [], E = [], C = [];
                return t = class extends v {
                    constructor() {
                        super(a.default, c.default),
                        this.boardConstructor = (i(this, b),
                        d.CardinalNeighborsBoard),
                        this.numRows = i(this, y, 5),
                        this.numColumns = (i(this, w),
                        i(this, E, 5)),
                        this.board = i(this, C),
                        this.board = l.Board.random(this.numRows, this.numColumns, this.boardConstructor),
                        this.addComponent(this.board),
                        this.onSolvedSubscription = this.board.onSolved.subscribe((t=>{
                            this.onSolved(t)
                        }
                        )),
                        this.startTime = Date.now()
                    }
                    reset() {
                        this.board.onSolved.unsubscribe(this.onSolvedSubscription),
                        this.removeComponent(this.board),
                        this.board = l.Board.random(this.numRows, this.numColumns, this.boardConstructor),
                        this.onSolvedSubscription = this.board.onSolved.subscribe((t=>{
                            this.onSolved(t)
                        }
                        )),
                        this.addComponent(this.board),
                        this.startTime = Date.now()
                    }
                    onWidthChange() {
                        const t = parseInt(this.getValue("width"));
                        this.numRows = t
                    }
                    onHeightChange() {
                        const t = parseInt(this.getValue("height"));
                        this.numColumns = t
                    }
                    onBoardConstructorChange(t) {
                        const e = this.getValue("selectVariant");
                        this.boardConstructor = m[e]
                    }
                    onSolved(t) {
                        return r(this, void 0, void 0, (function*() {
                            const t = Date.now() - this.startTime;
                            u.EzDialog.popup(this, `Victory in ${(0,
                            p.default)(t)}`, "Lights Out!", ["Play Again?"], "").subscribe((()=>{
                                this.reset()
                            }
                            ))
                        }
                        ))
                    }
                }
                ,
                (()=>{
                    var i;
                    const r = "function" == typeof Symbol && Symbol.metadata ? Object.create(null !== (i = v[Symbol.metadata]) && void 0 !== i ? i : null) : void 0;
                    e = [(0,
                    u.BindValue)("width", (t=>`${t}`))],
                    n = [(0,
                    u.BindValue)("height", (t=>`${t}`))],
                    s = [(0,
                    u.Click)("reset")],
                    h = [(0,
                    u.Change)("width")],
                    f = [(0,
                    u.Change)("height")],
                    g = [(0,
                    u.Change)("selectVariant")],
                    o(t, null, s, {
                        kind: "method",
                        name: "reset",
                        static: !1,
                        private: !1,
                        access: {
                            has: t=>"reset"in t,
                            get: t=>t.reset
                        },
                        metadata: r
                    }, null, b),
                    o(t, null, h, {
                        kind: "method",
                        name: "onWidthChange",
                        static: !1,
                        private: !1,
                        access: {
                            has: t=>"onWidthChange"in t,
                            get: t=>t.onWidthChange
                        },
                        metadata: r
                    }, null, b),
                    o(t, null, f, {
                        kind: "method",
                        name: "onHeightChange",
                        static: !1,
                        private: !1,
                        access: {
                            has: t=>"onHeightChange"in t,
                            get: t=>t.onHeightChange
                        },
                        metadata: r
                    }, null, b),
                    o(t, null, g, {
                        kind: "method",
                        name: "onBoardConstructorChange",
                        static: !1,
                        private: !1,
                        access: {
                            has: t=>"onBoardConstructorChange"in t,
                            get: t=>t.onBoardConstructorChange
                        },
                        metadata: r
                    }, null, b),
                    o(null, null, e, {
                        kind: "field",
                        name: "numRows",
                        static: !1,
                        private: !1,
                        access: {
                            has: t=>"numRows"in t,
                            get: t=>t.numRows,
                            set: (t,e)=>{
                                t.numRows = e
                            }
                        },
                        metadata: r
                    }, y, w),
                    o(null, null, n, {
                        kind: "field",
                        name: "numColumns",
                        static: !1,
                        private: !1,
                        access: {
                            has: t=>"numColumns"in t,
                            get: t=>t.numColumns,
                            set: (t,e)=>{
                                t.numColumns = e
                            }
                        },
                        metadata: r
                    }, E, C),
                    r && Object.defineProperty(t, Symbol.metadata, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: r
                    })
                }
                )(),
                t
            }
            )();
            e.MainComponent = g
        },
        746: (t,e)=>{
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.toPx = void 0;
            e.toPx = t=>`${t}px`
        }
        ,
        802: (t,e)=>{
            function n(t, e) {
                (null == e || e > t.length) && (e = t.length);
                for (var n = 0, i = new Array(e); n < e; n++)
                    i[n] = t[n];
                return i
            }
            function i(t, e) {
                var i = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
                if (i)
                    return (i = i.call(t)).next.bind(i);
                if (Array.isArray(t) || (i = function(t, e) {
                    if (t) {
                        if ("string" == typeof t)
                            return n(t, e);
                        var i = Object.prototype.toString.call(t).slice(8, -1);
                        return "Object" === i && t.constructor && (i = t.constructor.name),
                        "Map" === i || "Set" === i ? Array.from(t) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? n(t, e) : void 0
                    }
                }(t)) || e && t && "number" == typeof t.length) {
                    i && (t = i);
                    var o = 0;
                    return function() {
                        return o >= t.length ? {
                            done: !0
                        } : {
                            done: !1,
                            value: t[o++]
                        }
                    }
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            var o = Symbol.for("@ts-pattern/matcher")
              , r = Symbol.for("@ts-pattern/isVariadic")
              , s = "@ts-pattern/anonymous-select-key"
              , a = function(t) {
                return Boolean(t && "object" == typeof t)
            }
              , c = function(t) {
                return t && !!t[o]
            }
              , u = function t(e, n, s) {
                if (c(e)) {
                    var u = e[o]().match(n)
                      , l = u.matched
                      , d = u.selections;
                    return l && d && Object.keys(d).forEach((function(t) {
                        return s(t, d[t])
                    }
                    )),
                    l
                }
                if (a(e)) {
                    if (!a(n))
                        return !1;
                    if (Array.isArray(e)) {
                        if (!Array.isArray(n))
                            return !1;
                        for (var h, f = [], p = [], m = [], g = i(e.keys()); !(h = g()).done; ) {
                            var v = e[h.value];
                            c(v) && v[r] ? m.push(v) : m.length ? p.push(v) : f.push(v)
                        }
                        if (m.length) {
                            if (m.length > 1)
                                throw new Error("Pattern error: Using `...P.array(...)` several times in a single pattern is not allowed.");
                            if (n.length < f.length + p.length)
                                return !1;
                            var b = n.slice(0, f.length)
                              , y = 0 === p.length ? [] : n.slice(-p.length)
                              , w = n.slice(f.length, 0 === p.length ? 1 / 0 : -p.length);
                            return f.every((function(e, n) {
                                return t(e, b[n], s)
                            }
                            )) && p.every((function(e, n) {
                                return t(e, y[n], s)
                            }
                            )) && (0 === m.length || t(m[0], w, s))
                        }
                        return e.length === n.length && e.every((function(e, i) {
                            return t(e, n[i], s)
                        }
                        ))
                    }
                    return Object.keys(e).every((function(i) {
                        var r, a = e[i];
                        return (i in n || c(r = a) && "optional" === r[o]().matcherType) && t(a, n[i], s)
                    }
                    ))
                }
                return Object.is(n, e)
            }
              , l = function t(e) {
                var n, i, r;
                return a(e) ? c(e) ? null != (n = null == (i = (r = e[o]()).getSelectionKeys) ? void 0 : i.call(r)) ? n : [] : Array.isArray(e) ? d(e, t) : d(Object.values(e), t) : []
            }
              , d = function(t, e) {
                return t.reduce((function(t, n) {
                    return t.concat(e(n))
                }
                ), [])
            };
            function h() {
                var t = [].slice.call(arguments);
                if (1 === t.length) {
                    var e = t[0];
                    return function(t) {
                        return u(e, t, (function() {}
                        ))
                    }
                }
                if (2 === t.length)
                    return u(t[0], t[1], (function() {}
                    ));
                throw new Error("isMatching wasn't given the right number of arguments: expected 1 or 2, received " + t.length + ".")
            }
            function f(t) {
                return Object.assign(t, {
                    optional: function() {
                        return m(t)
                    },
                    and: function(e) {
                        return b(t, e)
                    },
                    or: function(e) {
                        return y(t, e)
                    },
                    select: function(e) {
                        return void 0 === e ? E(t) : E(e, t)
                    }
                })
            }
            function p(t) {
                return Object.assign(function(t) {
                    var e;
                    return Object.assign(t, ((e = {})[Symbol.iterator] = function() {
                        var e, n = 0, i = [{
                            value: Object.assign(t, ((e = {})[r] = !0,
                            e)),
                            done: !1
                        }, {
                            done: !0,
                            value: void 0
                        }];
                        return {
                            next: function() {
                                var t;
                                return null != (t = i[n++]) ? t : i.at(-1)
                            }
                        }
                    }
                    ,
                    e))
                }(t), {
                    optional: function() {
                        return p(m(t))
                    },
                    select: function(e) {
                        return p(void 0 === e ? E(t) : E(e, t))
                    }
                })
            }
            function m(t) {
                var e;
                return f(((e = {})[o] = function() {
                    return {
                        match: function(e) {
                            var n = {}
                              , i = function(t, e) {
                                n[t] = e
                            };
                            return void 0 === e ? (l(t).forEach((function(t) {
                                return i(t, void 0)
                            }
                            )),
                            {
                                matched: !0,
                                selections: n
                            }) : {
                                matched: u(t, e, i),
                                selections: n
                            }
                        },
                        getSelectionKeys: function() {
                            return l(t)
                        },
                        matcherType: "optional"
                    }
                }
                ,
                e))
            }
            var g = function(t, e) {
                for (var n, o = i(t); !(n = o()).done; )
                    if (!e(n.value))
                        return !1;
                return !0
            }
              , v = function(t, e) {
                for (var n, o = i(t.entries()); !(n = o()).done; ) {
                    var r = n.value;
                    if (!e(r[1], r[0]))
                        return !1
                }
                return !0
            };
            function b() {
                var t, e = [].slice.call(arguments);
                return f(((t = {})[o] = function() {
                    return {
                        match: function(t) {
                            var n = {}
                              , i = function(t, e) {
                                n[t] = e
                            };
                            return {
                                matched: e.every((function(e) {
                                    return u(e, t, i)
                                }
                                )),
                                selections: n
                            }
                        },
                        getSelectionKeys: function() {
                            return d(e, l)
                        },
                        matcherType: "and"
                    }
                }
                ,
                t))
            }
            function y() {
                var t, e = [].slice.call(arguments);
                return f(((t = {})[o] = function() {
                    return {
                        match: function(t) {
                            var n = {}
                              , i = function(t, e) {
                                n[t] = e
                            };
                            return d(e, l).forEach((function(t) {
                                return i(t, void 0)
                            }
                            )),
                            {
                                matched: e.some((function(e) {
                                    return u(e, t, i)
                                }
                                )),
                                selections: n
                            }
                        },
                        getSelectionKeys: function() {
                            return d(e, l)
                        },
                        matcherType: "or"
                    }
                }
                ,
                t))
            }
            function w(t) {
                var e;
                return (e = {})[o] = function() {
                    return {
                        match: function(e) {
                            return {
                                matched: Boolean(t(e))
                            }
                        }
                    }
                }
                ,
                e
            }
            function E() {
                var t, e = [].slice.call(arguments), n = "string" == typeof e[0] ? e[0] : void 0, i = 2 === e.length ? e[1] : "string" == typeof e[0] ? void 0 : e[0];
                return f(((t = {})[o] = function() {
                    return {
                        match: function(t) {
                            var e, o = ((e = {})[null != n ? n : s] = t,
                            e);
                            return {
                                matched: void 0 === i || u(i, t, (function(t, e) {
                                    o[t] = e
                                }
                                )),
                                selections: o
                            }
                        },
                        getSelectionKeys: function() {
                            return [null != n ? n : s].concat(void 0 === i ? [] : l(i))
                        }
                    }
                }
                ,
                t))
            }
            function C(t) {
                return "number" == typeof t
            }
            function x(t) {
                return "string" == typeof t
            }
            function S(t) {
                return "bigint" == typeof t
            }
            var M = f(w((function(t) {
                return !0
            }
            )))
              , T = M
              , B = function t(e) {
                return Object.assign(f(e), {
                    startsWith: function(n) {
                        return t(b(e, (i = n,
                        w((function(t) {
                            return x(t) && t.startsWith(i)
                        }
                        )))));
                        var i
                    },
                    endsWith: function(n) {
                        return t(b(e, (i = n,
                        w((function(t) {
                            return x(t) && t.endsWith(i)
                        }
                        )))));
                        var i
                    },
                    minLength: function(n) {
                        return t(b(e, function(t) {
                            return w((function(e) {
                                return x(e) && e.length >= t
                            }
                            ))
                        }(n)))
                    },
                    maxLength: function(n) {
                        return t(b(e, function(t) {
                            return w((function(e) {
                                return x(e) && e.length <= t
                            }
                            ))
                        }(n)))
                    },
                    includes: function(n) {
                        return t(b(e, (i = n,
                        w((function(t) {
                            return x(t) && t.includes(i)
                        }
                        )))));
                        var i
                    },
                    regex: function(n) {
                        return t(b(e, (i = n,
                        w((function(t) {
                            return x(t) && Boolean(t.match(i))
                        }
                        )))));
                        var i
                    }
                })
            }(w(x))
              , O = function t(e) {
                return Object.assign(f(e), {
                    between: function(n, i) {
                        return t(b(e, function(t, e) {
                            return w((function(n) {
                                return C(n) && t <= n && e >= n
                            }
                            ))
                        }(n, i)))
                    },
                    lt: function(n) {
                        return t(b(e, function(t) {
                            return w((function(e) {
                                return C(e) && e < t
                            }
                            ))
                        }(n)))
                    },
                    gt: function(n) {
                        return t(b(e, function(t) {
                            return w((function(e) {
                                return C(e) && e > t
                            }
                            ))
                        }(n)))
                    },
                    lte: function(n) {
                        return t(b(e, function(t) {
                            return w((function(e) {
                                return C(e) && e <= t
                            }
                            ))
                        }(n)))
                    },
                    gte: function(n) {
                        return t(b(e, function(t) {
                            return w((function(e) {
                                return C(e) && e >= t
                            }
                            ))
                        }(n)))
                    },
                    int: function() {
                        return t(b(e, w((function(t) {
                            return C(t) && Number.isInteger(t)
                        }
                        ))))
                    },
                    finite: function() {
                        return t(b(e, w((function(t) {
                            return C(t) && Number.isFinite(t)
                        }
                        ))))
                    },
                    positive: function() {
                        return t(b(e, w((function(t) {
                            return C(t) && t > 0
                        }
                        ))))
                    },
                    negative: function() {
                        return t(b(e, w((function(t) {
                            return C(t) && t < 0
                        }
                        ))))
                    }
                })
            }(w(C))
              , j = function t(e) {
                return Object.assign(f(e), {
                    between: function(n, i) {
                        return t(b(e, function(t, e) {
                            return w((function(n) {
                                return S(n) && t <= n && e >= n
                            }
                            ))
                        }(n, i)))
                    },
                    lt: function(n) {
                        return t(b(e, function(t) {
                            return w((function(e) {
                                return S(e) && e < t
                            }
                            ))
                        }(n)))
                    },
                    gt: function(n) {
                        return t(b(e, function(t) {
                            return w((function(e) {
                                return S(e) && e > t
                            }
                            ))
                        }(n)))
                    },
                    lte: function(n) {
                        return t(b(e, function(t) {
                            return w((function(e) {
                                return S(e) && e <= t
                            }
                            ))
                        }(n)))
                    },
                    gte: function(n) {
                        return t(b(e, function(t) {
                            return w((function(e) {
                                return S(e) && e >= t
                            }
                            ))
                        }(n)))
                    },
                    positive: function() {
                        return t(b(e, w((function(t) {
                            return S(t) && t > 0
                        }
                        ))))
                    },
                    negative: function() {
                        return t(b(e, w((function(t) {
                            return S(t) && t < 0
                        }
                        ))))
                    }
                })
            }(w(S))
              , _ = f(w((function(t) {
                return "boolean" == typeof t
            }
            )))
              , k = f(w((function(t) {
                return "symbol" == typeof t
            }
            )))
              , N = f(w((function(t) {
                return null == t
            }
            )))
              , P = f(w((function(t) {
                return null != t
            }
            )))
              , D = {
                __proto__: null,
                matcher: o,
                optional: m,
                array: function() {
                    var t, e = [].slice.call(arguments);
                    return p(((t = {})[o] = function() {
                        return {
                            match: function(t) {
                                if (!Array.isArray(t))
                                    return {
                                        matched: !1
                                    };
                                if (0 === e.length)
                                    return {
                                        matched: !0
                                    };
                                var n = e[0]
                                  , i = {};
                                if (0 === t.length)
                                    return l(n).forEach((function(t) {
                                        i[t] = []
                                    }
                                    )),
                                    {
                                        matched: !0,
                                        selections: i
                                    };
                                var o = function(t, e) {
                                    i[t] = (i[t] || []).concat([e])
                                };
                                return {
                                    matched: t.every((function(t) {
                                        return u(n, t, o)
                                    }
                                    )),
                                    selections: i
                                }
                            },
                            getSelectionKeys: function() {
                                return 0 === e.length ? [] : l(e[0])
                            }
                        }
                    }
                    ,
                    t))
                },
                set: function() {
                    var t, e = [].slice.call(arguments);
                    return f(((t = {})[o] = function() {
                        return {
                            match: function(t) {
                                if (!(t instanceof Set))
                                    return {
                                        matched: !1
                                    };
                                var n = {};
                                if (0 === t.size)
                                    return {
                                        matched: !0,
                                        selections: n
                                    };
                                if (0 === e.length)
                                    return {
                                        matched: !0
                                    };
                                var i = function(t, e) {
                                    n[t] = (n[t] || []).concat([e])
                                }
                                  , o = e[0];
                                return {
                                    matched: g(t, (function(t) {
                                        return u(o, t, i)
                                    }
                                    )),
                                    selections: n
                                }
                            },
                            getSelectionKeys: function() {
                                return 0 === e.length ? [] : l(e[0])
                            }
                        }
                    }
                    ,
                    t))
                },
                map: function() {
                    var t, e = [].slice.call(arguments);
                    return f(((t = {})[o] = function() {
                        return {
                            match: function(t) {
                                if (!(t instanceof Map))
                                    return {
                                        matched: !1
                                    };
                                var n = {};
                                if (0 === t.size)
                                    return {
                                        matched: !0,
                                        selections: n
                                    };
                                var i, o = function(t, e) {
                                    n[t] = (n[t] || []).concat([e])
                                };
                                if (0 === e.length)
                                    return {
                                        matched: !0
                                    };
                                if (1 === e.length)
                                    throw new Error("`P.map` wasn't given enough arguments. Expected (key, value), received " + (null == (i = e[0]) ? void 0 : i.toString()));
                                var r = e[0]
                                  , s = e[1];
                                return {
                                    matched: v(t, (function(t, e) {
                                        var n = u(r, e, o)
                                          , i = u(s, t, o);
                                        return n && i
                                    }
                                    )),
                                    selections: n
                                }
                            },
                            getSelectionKeys: function() {
                                return 0 === e.length ? [] : [].concat(l(e[0]), l(e[1]))
                            }
                        }
                    }
                    ,
                    t))
                },
                intersection: b,
                union: y,
                not: function(t) {
                    var e;
                    return f(((e = {})[o] = function() {
                        return {
                            match: function(e) {
                                return {
                                    matched: !u(t, e, (function() {}
                                    ))
                                }
                            },
                            getSelectionKeys: function() {
                                return []
                            },
                            matcherType: "not"
                        }
                    }
                    ,
                    e))
                },
                when: w,
                select: E,
                any: M,
                _: T,
                string: B,
                number: O,
                bigint: j,
                boolean: _,
                symbol: k,
                nullish: N,
                nonNullable: P,
                instanceOf: function(t) {
                    return f(w(function(t) {
                        return function(e) {
                            return e instanceof t
                        }
                    }(t)))
                },
                shape: function(t) {
                    return f(w(h(t)))
                }
            }
              , I = {
                matched: !1,
                value: void 0
            }
              , L = function() {
                function t(t, e) {
                    this.input = void 0,
                    this.state = void 0,
                    this.input = t,
                    this.state = e
                }
                var e = t.prototype;
                return e.with = function() {
                    var e = this
                      , n = [].slice.call(arguments);
                    if (this.state.matched)
                        return this;
                    var i = n[n.length - 1]
                      , o = [n[0]]
                      , r = void 0;
                    3 === n.length && "function" == typeof n[1] ? r = n[1] : n.length > 2 && o.push.apply(o, n.slice(1, n.length - 1));
                    var a = !1
                      , c = {}
                      , l = function(t, e) {
                        a = !0,
                        c[t] = e
                    }
                      , d = !o.some((function(t) {
                        return u(t, e.input, l)
                    }
                    )) || r && !Boolean(r(this.input)) ? I : {
                        matched: !0,
                        value: i(a ? s in c ? c[s] : c : this.input, this.input)
                    };
                    return new t(this.input,d)
                }
                ,
                e.when = function(e, n) {
                    if (this.state.matched)
                        return this;
                    var i = Boolean(e(this.input));
                    return new t(this.input,i ? {
                        matched: !0,
                        value: n(this.input, this.input)
                    } : I)
                }
                ,
                e.otherwise = function(t) {
                    return this.state.matched ? this.state.value : t(this.input)
                }
                ,
                e.exhaustive = function() {
                    if (this.state.matched)
                        return this.state.value;
                    var t;
                    try {
                        t = JSON.stringify(this.input)
                    } catch (e) {
                        t = this.input
                    }
                    throw new Error("Pattern matching error: no pattern matches value " + t)
                }
                ,
                e.run = function() {
                    return this.exhaustive()
                }
                ,
                e.returnType = function() {
                    return this
                }
                ,
                t
            }();
            e.P = D,
            e.Pattern = D,
            e.isMatching = h,
            e.match = function(t) {
                return new L(t,I)
            }
        }
        ,
        966: (t,e,n)=>{
            "use strict";
            n.r(e),
            n.d(e, {
                default: ()=>u
            });
            const i = t=>Number.isFinite(t) ? t : 0;
            function o(t) {
                switch (typeof t) {
                case "number":
                    if (Number.isFinite(t))
                        return function(t) {
                            return {
                                days: Math.trunc(t / 864e5),
                                hours: Math.trunc(t / 36e5 % 24),
                                minutes: Math.trunc(t / 6e4 % 60),
                                seconds: Math.trunc(t / 1e3 % 60),
                                milliseconds: Math.trunc(t % 1e3),
                                microseconds: Math.trunc(i(1e3 * t) % 1e3),
                                nanoseconds: Math.trunc(i(1e6 * t) % 1e3)
                            }
                        }(t);
                    break;
                case "bigint":
                    return function(t) {
                        return {
                            days: t / 86400000n,
                            hours: t / 3600000n % 24n,
                            minutes: t / 60000n % 60n,
                            seconds: t / 1000n % 60n,
                            milliseconds: t % 1000n,
                            microseconds: 0n,
                            nanoseconds: 0n
                        }
                    }(t)
                }
                throw new TypeError("Expected a finite number or bigint")
            }
            const r = t=>0 === t || 0n === t
              , s = (t,e)=>1 === e || 1n === e ? t : `${t}s`
              , a = 1e-7
              , c = 86400000n;
            function u(t, e) {
                const n = "bigint" == typeof t;
                if (!n && !Number.isFinite(t))
                    throw new TypeError("Expected a finite number or bigint");
                (e = {
                    ...e
                }).colonNotation && (e.compact = !1,
                e.formatSubMilliseconds = !1,
                e.separateMilliseconds = !1,
                e.verbose = !1),
                e.compact && (e.unitCount = 1,
                e.secondsDecimalDigits = 0,
                e.millisecondsDecimalDigits = 0);
                let i = [];
                const u = (t,n,o,a)=>{
                    if (0 !== i.length && e.colonNotation || !r(t) || e.colonNotation && "m" === o) {
                        if (a = a ?? String(t),
                        e.colonNotation) {
                            const t = a.includes(".") ? a.split(".")[0].length : a.length
                              , e = i.length > 0 ? 2 : 1;
                            a = "0".repeat(Math.max(0, e - t)) + a
                        } else
                            a += e.verbose ? " " + s(n, t) : o;
                        i.push(a)
                    }
                }
                  , l = o(t)
                  , d = BigInt(l.days);
                if (u(d / 365n, "year", "y"),
                u(d % 365n, "day", "d"),
                u(Number(l.hours), "hour", "h"),
                u(Number(l.minutes), "minute", "m"),
                e.separateMilliseconds || e.formatSubMilliseconds || !e.colonNotation && t < 1e3) {
                    const t = Number(l.seconds)
                      , n = Number(l.milliseconds)
                      , i = Number(l.microseconds)
                      , o = Number(l.nanoseconds);
                    if (u(t, "second", "s"),
                    e.formatSubMilliseconds)
                        u(n, "millisecond", "ms"),
                        u(i, "microsecond", "µs"),
                        u(o, "nanosecond", "ns");
                    else {
                        const t = n + i / 1e3 + o / 1e6
                          , r = "number" == typeof e.millisecondsDecimalDigits ? e.millisecondsDecimalDigits : 0
                          , s = t >= 1 ? Math.round(t) : Math.ceil(t)
                          , a = r ? t.toFixed(r) : s;
                        u(Number.parseFloat(a), "millisecond", "ms", a)
                    }
                } else {
                    const i = ((t,e)=>{
                        const n = Math.floor(t * 10 ** e + a);
                        return (Math.round(n) / 10 ** e).toFixed(e)
                    }
                    )((n ? Number(t % c) : t) / 1e3 % 60, "number" == typeof e.secondsDecimalDigits ? e.secondsDecimalDigits : 1)
                      , o = e.keepDecimalsOnWholeSeconds ? i : i.replace(/\.0+$/, "");
                    u(Number.parseFloat(o), "second", "s", o)
                }
                if (0 === i.length)
                    return "0" + (e.verbose ? " milliseconds" : "ms");
                const h = e.colonNotation ? ":" : " ";
                return "number" == typeof e.unitCount && (i = i.slice(0, Math.max(e.unitCount, 1))),
                i.join(h)
            }
        }
    }
      , e = {};
    function n(i) {
        var o = e[i];
        if (void 0 !== o)
            return o.exports;
        var r = e[i] = {
            id: i,
            exports: {}
        };
        return t[i].call(r.exports, r, r.exports, n),
        r.exports
    }
    n.n = t=>{
        var e = t && t.__esModule ? ()=>t.default : ()=>t;
        return n.d(e, {
            a: e
        }),
        e
    }
    ,
    n.d = (t,e)=>{
        for (var i in e)
            n.o(e, i) && !n.o(t, i) && Object.defineProperty(t, i, {
                enumerable: !0,
                get: e[i]
            })
    }
    ,
    n.o = (t,e)=>Object.prototype.hasOwnProperty.call(t, e),
    n.r = t=>{
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }
    ,
    n.nc = void 0;
    (()=>{
        "use strict";
        n(721);
        const t = n(251)
          , e = n(182);
        (0,
        t.bootstrap)(e.MainComponent)
    }
    )()
}
)();
