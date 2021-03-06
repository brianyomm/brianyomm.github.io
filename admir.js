require = function t(e, n, r) {
    function i(s, o) {
        if (!n[s]) {
            if (!e[s]) {
                var l = "function" == typeof require && require;
                if (!o && l) return l(s, !0);
                if (a) return a(s, !0);
                var u = new Error("Cannot find module '" + s + "'");
                throw u.code = "MODULE_NOT_FOUND", u
            }
            var c = n[s] = {
                exports: {}
            };
            e[s][0].call(c.exports, function(t) {
                var n = e[s][1][t];
                return i(n ? n : t)
            }, c, c.exports, t, e, n, r)
        }
        return n[s].exports
    }
    for (var a = "function" == typeof require && require, s = 0; s < r.length; s++) i(r[s]);
    return i
}({
    1: [function(t, e, n) {
        var r = t("jquery"),
            i = t("underscore"),
            a = t("Backbone");
        a.$ = t("jquery");
        var s = (t("./modules/nameCodec"), t("./modules/canvasParallax"), t("./collections/ProjectCollection")),
            o = t("./models/ProfileModel"),
            l = t("./routers/Router"),
            u = new s,
            c = new o,
            h = function() {
                var t = r("body"),
                    e = parseInt(r(window).innerWidth(), 10);
                900 >= e ? t.addClass("device--mobile") : t.removeClass("device--mobile")
            };
        h();
        var f = i.throttle(h, 100);
        r(window).on("resize", f), r.when(u.fetch({
            url: "projects.json"
        }), c.fetch({
            url: "profile.json"
        })).then(function(t, e) {
            new l({
                projects: u,
                profile: c
            })
        })
    }, {
        "./collections/ProjectCollection": 18,
        "./models/ProfileModel": 20,
        "./modules/canvasParallax": 22,
        "./modules/nameCodec": 24,
        "./routers/Router": 27,
        Backbone: 2,
        jquery: "jquery",
        underscore: "backbone/node_modules/underscore"
    }],
    2: [function(t, e, n) {
        ! function(e, r) {
            if ("function" == typeof define && define.amd) define(["underscore", "jquery", "exports"], function(t, n, i) {
                e.Backbone = r(e, i, t, n)
            });
            else if ("undefined" != typeof n) {
                var i = t("underscore");
                r(e, n, i)
            } else e.Backbone = r(e, {}, e._, e.jQuery || e.Zepto || e.ender || e.$)
        }(this, function(t, e, n, r) {
            var i = t.Backbone,
                a = [],
                s = (a.push, a.slice);
            a.splice;
            e.VERSION = "1.1.2", e.$ = r, e.noConflict = function() {
                return t.Backbone = i, this
            }, e.emulateHTTP = !1, e.emulateJSON = !1;
            var o = e.Events = {
                    on: function(t, e, n) {
                        if (!u(this, "on", t, [e, n]) || !e) return this;
                        this._events || (this._events = {});
                        var r = this._events[t] || (this._events[t] = []);
                        return r.push({
                            callback: e,
                            context: n,
                            ctx: n || this
                        }), this
                    },
                    once: function(t, e, r) {
                        if (!u(this, "once", t, [e, r]) || !e) return this;
                        var i = this,
                            a = n.once(function() {
                                i.off(t, a), e.apply(this, arguments)
                            });
                        return a._callback = e, this.on(t, a, r)
                    },
                    off: function(t, e, r) {
                        var i, a, s, o, l, c, h, f;
                        if (!this._events || !u(this, "off", t, [e, r])) return this;
                        if (!t && !e && !r) return this._events = void 0, this;
                        for (o = t ? [t] : n.keys(this._events), l = 0, c = o.length; c > l; l++)
                            if (t = o[l], s = this._events[t]) {
                                if (this._events[t] = i = [], e || r)
                                    for (h = 0, f = s.length; f > h; h++) a = s[h], (e && e !== a.callback && e !== a.callback._callback || r && r !== a.context) && i.push(a);
                                i.length || delete this._events[t]
                            }
                        return this
                    },
                    trigger: function(t) {
                        if (!this._events) return this;
                        var e = s.call(arguments, 1);
                        if (!u(this, "trigger", t, e)) return this;
                        var n = this._events[t],
                            r = this._events.all;
                        return n && c(n, e), r && c(r, arguments), this
                    },
                    stopListening: function(t, e, r) {
                        var i = this._listeningTo;
                        if (!i) return this;
                        var a = !e && !r;
                        r || "object" != typeof e || (r = this), t && ((i = {})[t._listenId] = t);
                        for (var s in i) t = i[s], t.off(e, r, this), (a || n.isEmpty(t._events)) && delete this._listeningTo[s];
                        return this
                    }
                },
                l = /\s+/,
                u = function(t, e, n, r) {
                    if (!n) return !0;
                    if ("object" == typeof n) {
                        for (var i in n) t[e].apply(t, [i, n[i]].concat(r));
                        return !1
                    }
                    if (l.test(n)) {
                        for (var a = n.split(l), s = 0, o = a.length; o > s; s++) t[e].apply(t, [a[s]].concat(r));
                        return !1
                    }
                    return !0
                },
                c = function(t, e) {
                    var n, r = -1,
                        i = t.length,
                        a = e[0],
                        s = e[1],
                        o = e[2];
                    switch (e.length) {
                        case 0:
                            for (; ++r < i;)(n = t[r]).callback.call(n.ctx);
                            return;
                        case 1:
                            for (; ++r < i;)(n = t[r]).callback.call(n.ctx, a);
                            return;
                        case 2:
                            for (; ++r < i;)(n = t[r]).callback.call(n.ctx, a, s);
                            return;
                        case 3:
                            for (; ++r < i;)(n = t[r]).callback.call(n.ctx, a, s, o);
                            return;
                        default:
                            for (; ++r < i;)(n = t[r]).callback.apply(n.ctx, e);
                            return
                    }
                },
                h = {
                    listenTo: "on",
                    listenToOnce: "once"
                };
            n.each(h, function(t, e) {
                o[e] = function(e, r, i) {
                    var a = this._listeningTo || (this._listeningTo = {}),
                        s = e._listenId || (e._listenId = n.uniqueId("l"));
                    return a[s] = e, i || "object" != typeof r || (i = this), e[t](r, i, this), this
                }
            }), o.bind = o.on, o.unbind = o.off, n.extend(e, o);
            var f = e.Model = function(t, e) {
                var r = t || {};
                e || (e = {}), this.cid = n.uniqueId("c"), this.attributes = {}, e.collection && (this.collection = e.collection), e.parse && (r = this.parse(r, e) || {}), r = n.defaults({}, r, n.result(this, "defaults")), this.set(r, e), this.changed = {}, this.initialize.apply(this, arguments)
            };
            n.extend(f.prototype, o, {
                changed: null,
                validationError: null,
                idAttribute: "id",
                initialize: function() {},
                toJSON: function(t) {
                    return n.clone(this.attributes)
                },
                sync: function() {
                    return e.sync.apply(this, arguments)
                },
                get: function(t) {
                    return this.attributes[t]
                },
                escape: function(t) {
                    return n.escape(this.get(t))
                },
                has: function(t) {
                    return null != this.get(t)
                },
                set: function(t, e, r) {
                    var i, a, s, o, l, u, c, h;
                    if (null == t) return this;
                    if ("object" == typeof t ? (a = t, r = e) : (a = {})[t] = e, r || (r = {}), !this._validate(a, r)) return !1;
                    s = r.unset, l = r.silent, o = [], u = this._changing, this._changing = !0, u || (this._previousAttributes = n.clone(this.attributes), this.changed = {}), h = this.attributes, c = this._previousAttributes, this.idAttribute in a && (this.id = a[this.idAttribute]);
                    for (i in a) e = a[i], n.isEqual(h[i], e) || o.push(i), n.isEqual(c[i], e) ? delete this.changed[i] : this.changed[i] = e, s ? delete h[i] : h[i] = e;
                    if (!l) {
                        o.length && (this._pending = r);
                        for (var f = 0, p = o.length; p > f; f++) this.trigger("change:" + o[f], this, h[o[f]], r)
                    }
                    if (u) return this;
                    if (!l)
                        for (; this._pending;) r = this._pending, this._pending = !1, this.trigger("change", this, r);
                    return this._pending = !1, this._changing = !1, this
                },
                unset: function(t, e) {
                    return this.set(t, void 0, n.extend({}, e, {
                        unset: !0
                    }))
                },
                clear: function(t) {
                    var e = {};
                    for (var r in this.attributes) e[r] = void 0;
                    return this.set(e, n.extend({}, t, {
                        unset: !0
                    }))
                },
                hasChanged: function(t) {
                    return null == t ? !n.isEmpty(this.changed) : n.has(this.changed, t)
                },
                changedAttributes: function(t) {
                    if (!t) return this.hasChanged() ? n.clone(this.changed) : !1;
                    var e, r = !1,
                        i = this._changing ? this._previousAttributes : this.attributes;
                    for (var a in t) n.isEqual(i[a], e = t[a]) || ((r || (r = {}))[a] = e);
                    return r
                },
                previous: function(t) {
                    return null != t && this._previousAttributes ? this._previousAttributes[t] : null
                },
                previousAttributes: function() {
                    return n.clone(this._previousAttributes)
                },
                fetch: function(t) {
                    t = t ? n.clone(t) : {}, void 0 === t.parse && (t.parse = !0);
                    var e = this,
                        r = t.success;
                    return t.success = function(n) {
                        return e.set(e.parse(n, t), t) ? (r && r(e, n, t), void e.trigger("sync", e, n, t)) : !1
                    }, I(this, t), this.sync("read", this, t)
                },
                save: function(t, e, r) {
                    var i, a, s, o = this.attributes;
                    if (null == t || "object" == typeof t ? (i = t, r = e) : (i = {})[t] = e, r = n.extend({
                            validate: !0
                        }, r), i && !r.wait) {
                        if (!this.set(i, r)) return !1
                    } else if (!this._validate(i, r)) return !1;
                    i && r.wait && (this.attributes = n.extend({}, o, i)), void 0 === r.parse && (r.parse = !0);
                    var l = this,
                        u = r.success;
                    return r.success = function(t) {
                        l.attributes = o;
                        var e = l.parse(t, r);
                        return r.wait && (e = n.extend(i || {}, e)), n.isObject(e) && !l.set(e, r) ? !1 : (u && u(l, t, r), void l.trigger("sync", l, t, r))
                    }, I(this, r), a = this.isNew() ? "create" : r.patch ? "patch" : "update", "patch" === a && (r.attrs = i), s = this.sync(a, this, r), i && r.wait && (this.attributes = o), s
                },
                destroy: function(t) {
                    t = t ? n.clone(t) : {};
                    var e = this,
                        r = t.success,
                        i = function() {
                            e.trigger("destroy", e, e.collection, t)
                        };
                    if (t.success = function(n) {
                            (t.wait || e.isNew()) && i(), r && r(e, n, t), e.isNew() || e.trigger("sync", e, n, t)
                        }, this.isNew()) return t.success(), !1;
                    I(this, t);
                    var a = this.sync("delete", this, t);
                    return t.wait || i(), a
                },
                url: function() {
                    var t = n.result(this, "urlRoot") || n.result(this.collection, "url") || F();
                    return this.isNew() ? t : t.replace(/([^\/])$/, "$1/") + encodeURIComponent(this.id)
                },
                parse: function(t, e) {
                    return t
                },
                clone: function() {
                    return new this.constructor(this.attributes)
                },
                isNew: function() {
                    return !this.has(this.idAttribute)
                },
                isValid: function(t) {
                    return this._validate({}, n.extend(t || {}, {
                        validate: !0
                    }))
                },
                _validate: function(t, e) {
                    if (!e.validate || !this.validate) return !0;
                    t = n.extend({}, this.attributes, t);
                    var r = this.validationError = this.validate(t, e) || null;
                    return r ? (this.trigger("invalid", this, r, n.extend(e, {
                        validationError: r
                    })), !1) : !0
                }
            });
            var p = ["keys", "values", "pairs", "invert", "pick", "omit"];
            n.each(p, function(t) {
                f.prototype[t] = function() {
                    var e = s.call(arguments);
                    return e.unshift(this.attributes), n[t].apply(n, e)
                }
            });
            var d = e.Collection = function(t, e) {
                    e || (e = {}), e.model && (this.model = e.model), void 0 !== e.comparator && (this.comparator = e.comparator), this._reset(), this.initialize.apply(this, arguments), t && this.reset(t, n.extend({
                        silent: !0
                    }, e))
                },
                m = {
                    add: !0,
                    remove: !0,
                    merge: !0
                },
                g = {
                    add: !0,
                    remove: !1
                };
            n.extend(d.prototype, o, {
                model: f,
                initialize: function() {},
                toJSON: function(t) {
                    return this.map(function(e) {
                        return e.toJSON(t)
                    })
                },
                sync: function() {
                    return e.sync.apply(this, arguments)
                },
                add: function(t, e) {
                    return this.set(t, n.extend({
                        merge: !1
                    }, e, g))
                },
                remove: function(t, e) {
                    var r = !n.isArray(t);
                    t = r ? [t] : n.clone(t), e || (e = {});
                    var i, a, s, o;
                    for (i = 0, a = t.length; a > i; i++) o = t[i] = this.get(t[i]), o && (delete this._byId[o.id], delete this._byId[o.cid], s = this.indexOf(o), this.models.splice(s, 1), this.length--, e.silent || (e.index = s, o.trigger("remove", o, this, e)), this._removeReference(o, e));
                    return r ? t[0] : t
                },
                set: function(t, e) {
                    e = n.defaults({}, e, m), e.parse && (t = this.parse(t, e));
                    var r = !n.isArray(t);
                    t = r ? t ? [t] : [] : n.clone(t);
                    var i, a, s, o, l, u, c, h = e.at,
                        p = this.model,
                        d = this.comparator && null == h && e.sort !== !1,
                        g = n.isString(this.comparator) ? this.comparator : null,
                        v = [],
                        y = [],
                        _ = {},
                        x = e.add,
                        b = e.merge,
                        w = e.remove,
                        T = !d && x && w ? [] : !1;
                    for (i = 0, a = t.length; a > i; i++) {
                        if (l = t[i] || {}, s = l instanceof f ? o = l : l[p.prototype.idAttribute || "id"], u = this.get(s)) w && (_[u.cid] = !0), b && (l = l === o ? o.attributes : l, e.parse && (l = u.parse(l, e)), u.set(l, e), d && !c && u.hasChanged(g) && (c = !0)), t[i] = u;
                        else if (x) {
                            if (o = t[i] = this._prepareModel(l, e), !o) continue;
                            v.push(o), this._addReference(o, e)
                        }
                        o = u || o, !T || !o.isNew() && _[o.id] || T.push(o), _[o.id] = !0
                    }
                    if (w) {
                        for (i = 0, a = this.length; a > i; ++i) _[(o = this.models[i]).cid] || y.push(o);
                        y.length && this.remove(y, e)
                    }
                    if (v.length || T && T.length)
                        if (d && (c = !0), this.length += v.length, null != h)
                            for (i = 0, a = v.length; a > i; i++) this.models.splice(h + i, 0, v[i]);
                        else {
                            T && (this.models.length = 0);
                            var k = T || v;
                            for (i = 0, a = k.length; a > i; i++) this.models.push(k[i])
                        }
                    if (c && this.sort({
                            silent: !0
                        }), !e.silent) {
                        for (i = 0, a = v.length; a > i; i++)(o = v[i]).trigger("add", o, this, e);
                        (c || T && T.length) && this.trigger("sort", this, e)
                    }
                    return r ? t[0] : t
                },
                reset: function(t, e) {
                    e || (e = {});
                    for (var r = 0, i = this.models.length; i > r; r++) this._removeReference(this.models[r], e);
                    return e.previousModels = this.models, this._reset(), t = this.add(t, n.extend({
                        silent: !0
                    }, e)), e.silent || this.trigger("reset", this, e), t
                },
                push: function(t, e) {
                    return this.add(t, n.extend({
                        at: this.length
                    }, e))
                },
                pop: function(t) {
                    var e = this.at(this.length - 1);
                    return this.remove(e, t), e
                },
                unshift: function(t, e) {
                    return this.add(t, n.extend({
                        at: 0
                    }, e))
                },
                shift: function(t) {
                    var e = this.at(0);
                    return this.remove(e, t), e
                },
                slice: function() {
                    return s.apply(this.models, arguments)
                },
                get: function(t) {
                    return null == t ? void 0 : this._byId[t] || this._byId[t.id] || this._byId[t.cid]
                },
                at: function(t) {
                    return this.models[t]
                },
                where: function(t, e) {
                    return n.isEmpty(t) ? e ? void 0 : [] : this[e ? "find" : "filter"](function(e) {
                        for (var n in t)
                            if (t[n] !== e.get(n)) return !1;
                        return !0
                    })
                },
                findWhere: function(t) {
                    return this.where(t, !0)
                },
                sort: function(t) {
                    if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
                    return t || (t = {}), n.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) : this.models.sort(n.bind(this.comparator, this)), t.silent || this.trigger("sort", this, t), this
                },
                pluck: function(t) {
                    return n.invoke(this.models, "get", t)
                },
                fetch: function(t) {
                    t = t ? n.clone(t) : {}, void 0 === t.parse && (t.parse = !0);
                    var e = t.success,
                        r = this;
                    return t.success = function(n) {
                        var i = t.reset ? "reset" : "set";
                        r[i](n, t), e && e(r, n, t), r.trigger("sync", r, n, t)
                    }, I(this, t), this.sync("read", this, t)
                },
                create: function(t, e) {
                    if (e = e ? n.clone(e) : {}, !(t = this._prepareModel(t, e))) return !1;
                    e.wait || this.add(t, e);
                    var r = this,
                        i = e.success;
                    return e.success = function(t, n) {
                        e.wait && r.add(t, e), i && i(t, n, e)
                    }, t.save(null, e), t
                },
                parse: function(t, e) {
                    return t
                },
                clone: function() {
                    return new this.constructor(this.models)
                },
                _reset: function() {
                    this.length = 0, this.models = [], this._byId = {}
                },
                _prepareModel: function(t, e) {
                    if (t instanceof f) return t;
                    e = e ? n.clone(e) : {}, e.collection = this;
                    var r = new this.model(t, e);
                    return r.validationError ? (this.trigger("invalid", this, r.validationError, e), !1) : r
                },
                _addReference: function(t, e) {
                    this._byId[t.cid] = t, null != t.id && (this._byId[t.id] = t), t.collection || (t.collection = this), t.on("all", this._onModelEvent, this)
                },
                _removeReference: function(t, e) {
                    this === t.collection && delete t.collection, t.off("all", this._onModelEvent, this)
                },
                _onModelEvent: function(t, e, n, r) {
                    ("add" !== t && "remove" !== t || n === this) && ("destroy" === t && this.remove(e, r), e && t === "change:" + e.idAttribute && (delete this._byId[e.previous(e.idAttribute)], null != e.id && (this._byId[e.id] = e)), this.trigger.apply(this, arguments))
                }
            });
            var v = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "difference", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain", "sample"];
            n.each(v, function(t) {
                d.prototype[t] = function() {
                    var e = s.call(arguments);
                    return e.unshift(this.models), n[t].apply(n, e)
                }
            });
            var y = ["groupBy", "countBy", "sortBy", "indexBy"];
            n.each(y, function(t) {
                d.prototype[t] = function(e, r) {
                    var i = n.isFunction(e) ? e : function(t) {
                        return t.get(e)
                    };
                    return n[t](this.models, i, r)
                }
            });
            var _ = e.View = function(t) {
                    this.cid = n.uniqueId("view"), t || (t = {}), n.extend(this, n.pick(t, b)), this._ensureElement(), this.initialize.apply(this, arguments), this.delegateEvents()
                },
                x = /^(\S+)\s*(.*)$/,
                b = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
            n.extend(_.prototype, o, {
                tagName: "div",
                $: function(t) {
                    return this.$el.find(t)
                },
                initialize: function() {},
                render: function() {
                    return this
                },
                remove: function() {
                    return this.$el.remove(), this.stopListening(), this
                },
                setElement: function(t, n) {
                    return this.$el && this.undelegateEvents(), this.$el = t instanceof e.$ ? t : e.$(t), this.el = this.$el[0], n !== !1 && this.delegateEvents(), this
                },
                delegateEvents: function(t) {
                    if (!t && !(t = n.result(this, "events"))) return this;
                    this.undelegateEvents();
                    for (var e in t) {
                        var r = t[e];
                        if (n.isFunction(r) || (r = this[t[e]]), r) {
                            var i = e.match(x),
                                a = i[1],
                                s = i[2];
                            r = n.bind(r, this), a += ".delegateEvents" + this.cid, "" === s ? this.$el.on(a, r) : this.$el.on(a, s, r)
                        }
                    }
                    return this
                },
                undelegateEvents: function() {
                    return this.$el.off(".delegateEvents" + this.cid), this
                },
                _ensureElement: function() {
                    if (this.el) this.setElement(n.result(this, "el"), !1);
                    else {
                        var t = n.extend({}, n.result(this, "attributes"));
                        this.id && (t.id = n.result(this, "id")), this.className && (t["class"] = n.result(this, "className"));
                        var r = e.$("<" + n.result(this, "tagName") + ">").attr(t);
                        this.setElement(r, !1)
                    }
                }
            }), e.sync = function(t, r, i) {
                var a = T[t];
                n.defaults(i || (i = {}), {
                    emulateHTTP: e.emulateHTTP,
                    emulateJSON: e.emulateJSON
                });
                var s = {
                    type: a,
                    dataType: "json"
                };
                if (i.url || (s.url = n.result(r, "url") || F()), null != i.data || !r || "create" !== t && "update" !== t && "patch" !== t || (s.contentType = "application/json", s.data = JSON.stringify(i.attrs || r.toJSON(i))), i.emulateJSON && (s.contentType = "application/x-www-form-urlencoded", s.data = s.data ? {
                        model: s.data
                    } : {}), i.emulateHTTP && ("PUT" === a || "DELETE" === a || "PATCH" === a)) {
                    s.type = "POST", i.emulateJSON && (s.data._method = a);
                    var o = i.beforeSend;
                    i.beforeSend = function(t) {
                        return t.setRequestHeader("X-HTTP-Method-Override", a), o ? o.apply(this, arguments) : void 0
                    }
                }
                "GET" === s.type || i.emulateJSON || (s.processData = !1), "PATCH" === s.type && w && (s.xhr = function() {
                    return new ActiveXObject("Microsoft.XMLHTTP")
                });
                var l = i.xhr = e.ajax(n.extend(s, i));
                return r.trigger("request", r, l, i), l
            };
            var w = !("undefined" == typeof window || !window.ActiveXObject || window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent),
                T = {
                    create: "POST",
                    update: "PUT",
                    patch: "PATCH",
                    "delete": "DELETE",
                    read: "GET"
                };
            e.ajax = function() {
                return e.$.ajax.apply(e.$, arguments)
            };
            var k = e.Router = function(t) {
                    t || (t = {}), t.routes && (this.routes = t.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
                },
                C = /\((.*?)\)/g,
                S = /(\(\?)?:\w+/g,
                P = /\*\w+/g,
                A = /[\-{}\[\]+?.,\\\^$|#\s]/g;
            n.extend(k.prototype, o, {
                initialize: function() {},
                route: function(t, r, i) {
                    n.isRegExp(t) || (t = this._routeToRegExp(t)), n.isFunction(r) && (i = r, r = ""), i || (i = this[r]);
                    var a = this;
                    return e.history.route(t, function(n) {
                        var s = a._extractParameters(t, n);
                        a.execute(i, s), a.trigger.apply(a, ["route:" + r].concat(s)), a.trigger("route", r, s), e.history.trigger("route", a, r, s)
                    }), this
                },
                execute: function(t, e) {
                    t && t.apply(this, e)
                },
                navigate: function(t, n) {
                    return e.history.navigate(t, n), this
                },
                _bindRoutes: function() {
                    if (this.routes) {
                        this.routes = n.result(this, "routes");
                        for (var t, e = n.keys(this.routes); null != (t = e.pop());) this.route(t, this.routes[t])
                    }
                },
                _routeToRegExp: function(t) {
                    return t = t.replace(A, "\\$&").replace(C, "(?:$1)?").replace(S, function(t, e) {
                        return e ? t : "([^/?]+)"
                    }).replace(P, "([^?]*?)"), new RegExp("^" + t + "(?:\\?([\\s\\S]*))?$")
                },
                _extractParameters: function(t, e) {
                    var r = t.exec(e).slice(1);
                    return n.map(r, function(t, e) {
                        return e === r.length - 1 ? t || null : t ? decodeURIComponent(t) : null
                    })
                }
            });
            var O = e.History = function() {
                    this.handlers = [], n.bindAll(this, "checkUrl"), "undefined" != typeof window && (this.location = window.location, this.history = window.history)
                },
                j = /^[#\/]|\s+$/g,
                M = /^\/+|\/+$/g,
                N = /msie [\w.]+/,
                R = /\/$/,
                D = /#.*$/;
            O.started = !1, n.extend(O.prototype, o, {
                interval: 50,
                atRoot: function() {
                    return this.location.pathname.replace(/[^\/]$/, "$&/") === this.root
                },
                getHash: function(t) {
                    var e = (t || this).location.href.match(/#(.*)$/);
                    return e ? e[1] : ""
                },
                getFragment: function(t, e) {
                    if (null == t)
                        if (this._hasPushState || !this._wantsHashChange || e) {
                            t = decodeURI(this.location.pathname + this.location.search);
                            var n = this.root.replace(R, "");
                            t.indexOf(n) || (t = t.slice(n.length))
                        } else t = this.getHash();
                    return t.replace(j, "")
                },
                start: function(t) {
                    if (O.started) throw new Error("Backbone.history has already been started");
                    O.started = !0, this.options = n.extend({
                        root: "/"
                    }, this.options, t), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, this._wantsPushState = !!this.options.pushState, this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
                    var r = this.getFragment(),
                        i = document.documentMode,
                        a = N.exec(navigator.userAgent.toLowerCase()) && (!i || 7 >= i);
                    if (this.root = ("/" + this.root + "/").replace(M, "/"), a && this._wantsHashChange) {
                        var s = e.$('<iframe src="javascript:0" tabindex="-1">');
                        this.iframe = s.hide().appendTo("body")[0].contentWindow, this.navigate(r)
                    }
                    this._hasPushState ? e.$(window).on("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !a ? e.$(window).on("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), this.fragment = r;
                    var o = this.location;
                    if (this._wantsHashChange && this._wantsPushState) {
                        if (!this._hasPushState && !this.atRoot()) return this.fragment = this.getFragment(null, !0), this.location.replace(this.root + "#" + this.fragment), !0;
                        this._hasPushState && this.atRoot() && o.hash && (this.fragment = this.getHash().replace(j, ""), this.history.replaceState({}, document.title, this.root + this.fragment))
                    }
                    return this.options.silent ? void 0 : this.loadUrl()
                },
                stop: function() {
                    e.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl), this._checkUrlInterval && clearInterval(this._checkUrlInterval), O.started = !1
                },
                route: function(t, e) {
                    this.handlers.unshift({
                        route: t,
                        callback: e
                    })
                },
                checkUrl: function(t) {
                    var e = this.getFragment();
                    return e === this.fragment && this.iframe && (e = this.getFragment(this.getHash(this.iframe))), e === this.fragment ? !1 : (this.iframe && this.navigate(e), void this.loadUrl())
                },
                loadUrl: function(t) {
                    return t = this.fragment = this.getFragment(t), n.any(this.handlers, function(e) {
                        return e.route.test(t) ? (e.callback(t), !0) : void 0
                    })
                },
                navigate: function(t, e) {
                    if (!O.started) return !1;
                    e && e !== !0 || (e = {
                        trigger: !!e
                    });
                    var n = this.root + (t = this.getFragment(t || ""));
                    if (t = t.replace(D, ""), this.fragment !== t) {
                        if (this.fragment = t, "" === t && "/" !== n && (n = n.slice(0, -1)), this._hasPushState) this.history[e.replace ? "replaceState" : "pushState"]({}, document.title, n);
                        else {
                            if (!this._wantsHashChange) return this.location.assign(n);
                            this._updateHash(this.location, t, e.replace), this.iframe && t !== this.getFragment(this.getHash(this.iframe)) && (e.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, t, e.replace))
                        }
                        return e.trigger ? this.loadUrl(t) : void 0
                    }
                },
                _updateHash: function(t, e, n) {
                    if (n) {
                        var r = t.href.replace(/(javascript:|#).*$/, "");
                        t.replace(r + "#" + e)
                    } else t.hash = "#" + e
                }
            }), e.history = new O;
            var E = function(t, e) {
                var r, i = this;
                r = t && n.has(t, "constructor") ? t.constructor : function() {
                    return i.apply(this, arguments)
                }, n.extend(r, i, e);
                var a = function() {
                    this.constructor = r
                };
                return a.prototype = i.prototype, r.prototype = new a, t && n.extend(r.prototype, t), r.__super__ = i.prototype, r
            };
            f.extend = d.extend = k.extend = _.extend = O.extend = E;
            var F = function() {
                    throw new Error('A "url" property or function must be specified')
                },
                I = function(t, e) {
                    var n = e.error;
                    e.error = function(r) {
                        n && n(t, r, e), t.trigger("error", t, r, e)
                    }
                };
            return e
        })
    }, {
        underscore: 3
    }],
    3: [function(t, e, n) {
        (function() {
            function t(t) {
                function e(e, n, r, i, a, s) {
                    for (; a >= 0 && s > a; a += t) {
                        var o = i ? i[a] : a;
                        r = n(r, e[o], o, e)
                    }
                    return r
                }
                return function(n, r, i, a) {
                    r = b(r, a, 4);
                    var s = !A(n) && x.keys(n),
                        o = (s || n).length,
                        l = t > 0 ? 0 : o - 1;
                    return arguments.length < 3 && (i = n[s ? s[l] : l], l += t), e(n, r, i, s, l, o)
                }
            }

            function r(t) {
                return function(e, n, r) {
                    n = w(n, r);
                    for (var i = P(e), a = t > 0 ? 0 : i - 1; a >= 0 && i > a; a += t)
                        if (n(e[a], a, e)) return a;
                    return -1
                }
            }

            function i(t, e, n) {
                return function(r, i, a) {
                    var s = 0,
                        o = P(r);
                    if ("number" == typeof a) t > 0 ? s = a >= 0 ? a : Math.max(a + o, s) : o = a >= 0 ? Math.min(a + 1, o) : a + o + 1;
                    else if (n && a && o) return a = n(r, i), r[a] === i ? a : -1;
                    if (i !== i) return a = e(f.call(r, s, o), x.isNaN), a >= 0 ? a + s : -1;
                    for (a = t > 0 ? s : o - 1; a >= 0 && o > a; a += t)
                        if (r[a] === i) return a;
                    return -1
                }
            }

            function a(t, e) {
                var n = R.length,
                    r = t.constructor,
                    i = x.isFunction(r) && r.prototype || u,
                    a = "constructor";
                for (x.has(t, a) && !x.contains(e, a) && e.push(a); n--;) a = R[n], a in t && t[a] !== i[a] && !x.contains(e, a) && e.push(a)
            }
            var s = this,
                o = s._,
                l = Array.prototype,
                u = Object.prototype,
                c = Function.prototype,
                h = l.push,
                f = l.slice,
                p = u.toString,
                d = u.hasOwnProperty,
                m = Array.isArray,
                g = Object.keys,
                v = c.bind,
                y = Object.create,
                _ = function() {},
                x = function(t) {
                    return t instanceof x ? t : this instanceof x ? void(this._wrapped = t) : new x(t)
                };
            "undefined" != typeof n ? ("undefined" != typeof e && e.exports && (n = e.exports = x), n._ = x) : s._ = x, x.VERSION = "1.8.3";
            var b = function(t, e, n) {
                    if (void 0 === e) return t;
                    switch (null == n ? 3 : n) {
                        case 1:
                            return function(n) {
                                return t.call(e, n)
                            };
                        case 2:
                            return function(n, r) {
                                return t.call(e, n, r)
                            };
                        case 3:
                            return function(n, r, i) {
                                return t.call(e, n, r, i)
                            };
                        case 4:
                            return function(n, r, i, a) {
                                return t.call(e, n, r, i, a)
                            }
                    }
                    return function() {
                        return t.apply(e, arguments)
                    }
                },
                w = function(t, e, n) {
                    return null == t ? x.identity : x.isFunction(t) ? b(t, e, n) : x.isObject(t) ? x.matcher(t) : x.property(t)
                };
            x.iteratee = function(t, e) {
                return w(t, e, 1 / 0)
            };
            var T = function(t, e) {
                    return function(n) {
                        var r = arguments.length;
                        if (2 > r || null == n) return n;
                        for (var i = 1; r > i; i++)
                            for (var a = arguments[i], s = t(a), o = s.length, l = 0; o > l; l++) {
                                var u = s[l];
                                e && void 0 !== n[u] || (n[u] = a[u])
                            }
                        return n
                    }
                },
                k = function(t) {
                    if (!x.isObject(t)) return {};
                    if (y) return y(t);
                    _.prototype = t;
                    var e = new _;
                    return _.prototype = null, e
                },
                C = function(t) {
                    return function(e) {
                        return null == e ? void 0 : e[t]
                    }
                },
                S = Math.pow(2, 53) - 1,
                P = C("length"),
                A = function(t) {
                    var e = P(t);
                    return "number" == typeof e && e >= 0 && S >= e
                };
            x.each = x.forEach = function(t, e, n) {
                e = b(e, n);
                var r, i;
                if (A(t))
                    for (r = 0, i = t.length; i > r; r++) e(t[r], r, t);
                else {
                    var a = x.keys(t);
                    for (r = 0, i = a.length; i > r; r++) e(t[a[r]], a[r], t)
                }
                return t
            }, x.map = x.collect = function(t, e, n) {
                e = w(e, n);
                for (var r = !A(t) && x.keys(t), i = (r || t).length, a = Array(i), s = 0; i > s; s++) {
                    var o = r ? r[s] : s;
                    a[s] = e(t[o], o, t)
                }
                return a
            }, x.reduce = x.foldl = x.inject = t(1), x.reduceRight = x.foldr = t(-1), x.find = x.detect = function(t, e, n) {
                var r;
                return r = A(t) ? x.findIndex(t, e, n) : x.findKey(t, e, n), void 0 !== r && -1 !== r ? t[r] : void 0
            }, x.filter = x.select = function(t, e, n) {
                var r = [];
                return e = w(e, n), x.each(t, function(t, n, i) {
                    e(t, n, i) && r.push(t)
                }), r
            }, x.reject = function(t, e, n) {
                return x.filter(t, x.negate(w(e)), n)
            }, x.every = x.all = function(t, e, n) {
                e = w(e, n);
                for (var r = !A(t) && x.keys(t), i = (r || t).length, a = 0; i > a; a++) {
                    var s = r ? r[a] : a;
                    if (!e(t[s], s, t)) return !1
                }
                return !0
            }, x.some = x.any = function(t, e, n) {
                e = w(e, n);
                for (var r = !A(t) && x.keys(t), i = (r || t).length, a = 0; i > a; a++) {
                    var s = r ? r[a] : a;
                    if (e(t[s], s, t)) return !0
                }
                return !1
            }, x.contains = x.includes = x.include = function(t, e, n, r) {
                return A(t) || (t = x.values(t)), ("number" != typeof n || r) && (n = 0), x.indexOf(t, e, n) >= 0
            }, x.invoke = function(t, e) {
                var n = f.call(arguments, 2),
                    r = x.isFunction(e);
                return x.map(t, function(t) {
                    var i = r ? e : t[e];
                    return null == i ? i : i.apply(t, n)
                })
            }, x.pluck = function(t, e) {
                return x.map(t, x.property(e))
            }, x.where = function(t, e) {
                return x.filter(t, x.matcher(e))
            }, x.findWhere = function(t, e) {
                return x.find(t, x.matcher(e))
            }, x.max = function(t, e, n) {
                var r, i, a = -(1 / 0),
                    s = -(1 / 0);
                if (null == e && null != t) {
                    t = A(t) ? t : x.values(t);
                    for (var o = 0, l = t.length; l > o; o++) r = t[o], r > a && (a = r)
                } else e = w(e, n), x.each(t, function(t, n, r) {
                    i = e(t, n, r), (i > s || i === -(1 / 0) && a === -(1 / 0)) && (a = t, s = i)
                });
                return a
            }, x.min = function(t, e, n) {
                var r, i, a = 1 / 0,
                    s = 1 / 0;
                if (null == e && null != t) {
                    t = A(t) ? t : x.values(t);
                    for (var o = 0, l = t.length; l > o; o++) r = t[o], a > r && (a = r)
                } else e = w(e, n), x.each(t, function(t, n, r) {
                    i = e(t, n, r), (s > i || i === 1 / 0 && a === 1 / 0) && (a = t, s = i)
                });
                return a
            }, x.shuffle = function(t) {
                for (var e, n = A(t) ? t : x.values(t), r = n.length, i = Array(r), a = 0; r > a; a++) e = x.random(0, a), e !== a && (i[a] = i[e]), i[e] = n[a];
                return i
            }, x.sample = function(t, e, n) {
                return null == e || n ? (A(t) || (t = x.values(t)), t[x.random(t.length - 1)]) : x.shuffle(t).slice(0, Math.max(0, e))
            }, x.sortBy = function(t, e, n) {
                return e = w(e, n), x.pluck(x.map(t, function(t, n, r) {
                    return {
                        value: t,
                        index: n,
                        criteria: e(t, n, r)
                    }
                }).sort(function(t, e) {
                    var n = t.criteria,
                        r = e.criteria;
                    if (n !== r) {
                        if (n > r || void 0 === n) return 1;
                        if (r > n || void 0 === r) return -1
                    }
                    return t.index - e.index
                }), "value")
            };
            var O = function(t) {
                return function(e, n, r) {
                    var i = {};
                    return n = w(n, r), x.each(e, function(r, a) {
                        var s = n(r, a, e);
                        t(i, r, s)
                    }), i
                }
            };
            x.groupBy = O(function(t, e, n) {
                x.has(t, n) ? t[n].push(e) : t[n] = [e]
            }), x.indexBy = O(function(t, e, n) {
                t[n] = e
            }), x.countBy = O(function(t, e, n) {
                x.has(t, n) ? t[n]++ : t[n] = 1
            }), x.toArray = function(t) {
                return t ? x.isArray(t) ? f.call(t) : A(t) ? x.map(t, x.identity) : x.values(t) : []
            }, x.size = function(t) {
                return null == t ? 0 : A(t) ? t.length : x.keys(t).length
            }, x.partition = function(t, e, n) {
                e = w(e, n);
                var r = [],
                    i = [];
                return x.each(t, function(t, n, a) {
                    (e(t, n, a) ? r : i).push(t)
                }), [r, i]
            }, x.first = x.head = x.take = function(t, e, n) {
                return null == t ? void 0 : null == e || n ? t[0] : x.initial(t, t.length - e)
            }, x.initial = function(t, e, n) {
                return f.call(t, 0, Math.max(0, t.length - (null == e || n ? 1 : e)))
            }, x.last = function(t, e, n) {
                return null == t ? void 0 : null == e || n ? t[t.length - 1] : x.rest(t, Math.max(0, t.length - e))
            }, x.rest = x.tail = x.drop = function(t, e, n) {
                return f.call(t, null == e || n ? 1 : e)
            }, x.compact = function(t) {
                return x.filter(t, x.identity)
            };
            var j = function(t, e, n, r) {
                for (var i = [], a = 0, s = r || 0, o = P(t); o > s; s++) {
                    var l = t[s];
                    if (A(l) && (x.isArray(l) || x.isArguments(l))) {
                        e || (l = j(l, e, n));
                        var u = 0,
                            c = l.length;
                        for (i.length += c; c > u;) i[a++] = l[u++]
                    } else n || (i[a++] = l)
                }
                return i
            };
            x.flatten = function(t, e) {
                return j(t, e, !1)
            }, x.without = function(t) {
                return x.difference(t, f.call(arguments, 1))
            }, x.uniq = x.unique = function(t, e, n, r) {
                x.isBoolean(e) || (r = n, n = e, e = !1), null != n && (n = w(n, r));
                for (var i = [], a = [], s = 0, o = P(t); o > s; s++) {
                    var l = t[s],
                        u = n ? n(l, s, t) : l;
                    e ? (s && a === u || i.push(l), a = u) : n ? x.contains(a, u) || (a.push(u), i.push(l)) : x.contains(i, l) || i.push(l)
                }
                return i
            }, x.union = function() {
                return x.uniq(j(arguments, !0, !0))
            }, x.intersection = function(t) {
                for (var e = [], n = arguments.length, r = 0, i = P(t); i > r; r++) {
                    var a = t[r];
                    if (!x.contains(e, a)) {
                        for (var s = 1; n > s && x.contains(arguments[s], a); s++);
                        s === n && e.push(a)
                    }
                }
                return e
            }, x.difference = function(t) {
                var e = j(arguments, !0, !0, 1);
                return x.filter(t, function(t) {
                    return !x.contains(e, t)
                })
            }, x.zip = function() {
                return x.unzip(arguments)
            }, x.unzip = function(t) {
                for (var e = t && x.max(t, P).length || 0, n = Array(e), r = 0; e > r; r++) n[r] = x.pluck(t, r);
                return n
            }, x.object = function(t, e) {
                for (var n = {}, r = 0, i = P(t); i > r; r++) e ? n[t[r]] = e[r] : n[t[r][0]] = t[r][1];
                return n
            }, x.findIndex = r(1), x.findLastIndex = r(-1), x.sortedIndex = function(t, e, n, r) {
                n = w(n, r, 1);
                for (var i = n(e), a = 0, s = P(t); s > a;) {
                    var o = Math.floor((a + s) / 2);
                    n(t[o]) < i ? a = o + 1 : s = o
                }
                return a
            }, x.indexOf = i(1, x.findIndex, x.sortedIndex), x.lastIndexOf = i(-1, x.findLastIndex), x.range = function(t, e, n) {
                null == e && (e = t || 0, t = 0), n = n || 1;
                for (var r = Math.max(Math.ceil((e - t) / n), 0), i = Array(r), a = 0; r > a; a++, t += n) i[a] = t;
                return i
            };
            var M = function(t, e, n, r, i) {
                if (!(r instanceof e)) return t.apply(n, i);
                var a = k(t.prototype),
                    s = t.apply(a, i);
                return x.isObject(s) ? s : a
            };
            x.bind = function(t, e) {
                if (v && t.bind === v) return v.apply(t, f.call(arguments, 1));
                if (!x.isFunction(t)) throw new TypeError("Bind must be called on a function");
                var n = f.call(arguments, 2),
                    r = function() {
                        return M(t, r, e, this, n.concat(f.call(arguments)))
                    };
                return r
            }, x.partial = function(t) {
                var e = f.call(arguments, 1),
                    n = function() {
                        for (var r = 0, i = e.length, a = Array(i), s = 0; i > s; s++) a[s] = e[s] === x ? arguments[r++] : e[s];
                        for (; r < arguments.length;) a.push(arguments[r++]);
                        return M(t, n, this, this, a)
                    };
                return n
            }, x.bindAll = function(t) {
                var e, n, r = arguments.length;
                if (1 >= r) throw new Error("bindAll must be passed function names");
                for (e = 1; r > e; e++) n = arguments[e], t[n] = x.bind(t[n], t);
                return t
            }, x.memoize = function(t, e) {
                var n = function(r) {
                    var i = n.cache,
                        a = "" + (e ? e.apply(this, arguments) : r);
                    return x.has(i, a) || (i[a] = t.apply(this, arguments)), i[a]
                };
                return n.cache = {}, n
            }, x.delay = function(t, e) {
                var n = f.call(arguments, 2);
                return setTimeout(function() {
                    return t.apply(null, n)
                }, e)
            }, x.defer = x.partial(x.delay, x, 1), x.throttle = function(t, e, n) {
                var r, i, a, s = null,
                    o = 0;
                n || (n = {});
                var l = function() {
                    o = n.leading === !1 ? 0 : x.now(), s = null, a = t.apply(r, i), s || (r = i = null)
                };
                return function() {
                    var u = x.now();
                    o || n.leading !== !1 || (o = u);
                    var c = e - (u - o);
                    return r = this, i = arguments, 0 >= c || c > e ? (s && (clearTimeout(s), s = null), o = u, a = t.apply(r, i), s || (r = i = null)) : s || n.trailing === !1 || (s = setTimeout(l, c)), a
                }
            }, x.debounce = function(t, e, n) {
                var r, i, a, s, o, l = function() {
                    var u = x.now() - s;
                    e > u && u >= 0 ? r = setTimeout(l, e - u) : (r = null, n || (o = t.apply(a, i), r || (a = i = null)))
                };
                return function() {
                    a = this, i = arguments, s = x.now();
                    var u = n && !r;
                    return r || (r = setTimeout(l, e)), u && (o = t.apply(a, i), a = i = null), o
                }
            }, x.wrap = function(t, e) {
                return x.partial(e, t)
            }, x.negate = function(t) {
                return function() {
                    return !t.apply(this, arguments)
                }
            }, x.compose = function() {
                var t = arguments,
                    e = t.length - 1;
                return function() {
                    for (var n = e, r = t[e].apply(this, arguments); n--;) r = t[n].call(this, r);
                    return r
                }
            }, x.after = function(t, e) {
                return function() {
                    return --t < 1 ? e.apply(this, arguments) : void 0
                }
            }, x.before = function(t, e) {
                var n;
                return function() {
                    return --t > 0 && (n = e.apply(this, arguments)), 1 >= t && (e = null), n
                }
            }, x.once = x.partial(x.before, 2);
            var N = !{
                    toString: null
                }.propertyIsEnumerable("toString"),
                R = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
            x.keys = function(t) {
                if (!x.isObject(t)) return [];
                if (g) return g(t);
                var e = [];
                for (var n in t) x.has(t, n) && e.push(n);
                return N && a(t, e), e
            }, x.allKeys = function(t) {
                if (!x.isObject(t)) return [];
                var e = [];
                for (var n in t) e.push(n);
                return N && a(t, e), e
            }, x.values = function(t) {
                for (var e = x.keys(t), n = e.length, r = Array(n), i = 0; n > i; i++) r[i] = t[e[i]];
                return r
            }, x.mapObject = function(t, e, n) {
                e = w(e, n);
                for (var r, i = x.keys(t), a = i.length, s = {}, o = 0; a > o; o++) r = i[o], s[r] = e(t[r], r, t);
                return s
            }, x.pairs = function(t) {
                for (var e = x.keys(t), n = e.length, r = Array(n), i = 0; n > i; i++) r[i] = [e[i], t[e[i]]];
                return r
            }, x.invert = function(t) {
                for (var e = {}, n = x.keys(t), r = 0, i = n.length; i > r; r++) e[t[n[r]]] = n[r];
                return e
            }, x.functions = x.methods = function(t) {
                var e = [];
                for (var n in t) x.isFunction(t[n]) && e.push(n);
                return e.sort()
            }, x.extend = T(x.allKeys), x.extendOwn = x.assign = T(x.keys), x.findKey = function(t, e, n) {
                e = w(e, n);
                for (var r, i = x.keys(t), a = 0, s = i.length; s > a; a++)
                    if (r = i[a], e(t[r], r, t)) return r
            }, x.pick = function(t, e, n) {
                var r, i, a = {},
                    s = t;
                if (null == s) return a;
                x.isFunction(e) ? (i = x.allKeys(s), r = b(e, n)) : (i = j(arguments, !1, !1, 1), r = function(t, e, n) {
                    return e in n
                }, s = Object(s));
                for (var o = 0, l = i.length; l > o; o++) {
                    var u = i[o],
                        c = s[u];
                    r(c, u, s) && (a[u] = c)
                }
                return a
            }, x.omit = function(t, e, n) {
                if (x.isFunction(e)) e = x.negate(e);
                else {
                    var r = x.map(j(arguments, !1, !1, 1), String);
                    e = function(t, e) {
                        return !x.contains(r, e)
                    }
                }
                return x.pick(t, e, n)
            }, x.defaults = T(x.allKeys, !0), x.create = function(t, e) {
                var n = k(t);
                return e && x.extendOwn(n, e), n
            }, x.clone = function(t) {
                return x.isObject(t) ? x.isArray(t) ? t.slice() : x.extend({}, t) : t
            }, x.tap = function(t, e) {
                return e(t), t
            }, x.isMatch = function(t, e) {
                var n = x.keys(e),
                    r = n.length;
                if (null == t) return !r;
                for (var i = Object(t), a = 0; r > a; a++) {
                    var s = n[a];
                    if (e[s] !== i[s] || !(s in i)) return !1
                }
                return !0
            };
            var D = function(t, e, n, r) {
                if (t === e) return 0 !== t || 1 / t === 1 / e;
                if (null == t || null == e) return t === e;
                t instanceof x && (t = t._wrapped), e instanceof x && (e = e._wrapped);
                var i = p.call(t);
                if (i !== p.call(e)) return !1;
                switch (i) {
                    case "[object RegExp]":
                    case "[object String]":
                        return "" + t == "" + e;
                    case "[object Number]":
                        return +t !== +t ? +e !== +e : 0 === +t ? 1 / +t === 1 / e : +t === +e;
                    case "[object Date]":
                    case "[object Boolean]":
                        return +t === +e
                }
                var a = "[object Array]" === i;
                if (!a) {
                    if ("object" != typeof t || "object" != typeof e) return !1;
                    var s = t.constructor,
                        o = e.constructor;
                    if (s !== o && !(x.isFunction(s) && s instanceof s && x.isFunction(o) && o instanceof o) && "constructor" in t && "constructor" in e) return !1
                }
                n = n || [], r = r || [];
                for (var l = n.length; l--;)
                    if (n[l] === t) return r[l] === e;
                if (n.push(t), r.push(e), a) {
                    if (l = t.length, l !== e.length) return !1;
                    for (; l--;)
                        if (!D(t[l], e[l], n, r)) return !1
                } else {
                    var u, c = x.keys(t);
                    if (l = c.length, x.keys(e).length !== l) return !1;
                    for (; l--;)
                        if (u = c[l], !x.has(e, u) || !D(t[u], e[u], n, r)) return !1
                }
                return n.pop(), r.pop(), !0
            };
            x.isEqual = function(t, e) {
                return D(t, e)
            }, x.isEmpty = function(t) {
                return null == t ? !0 : A(t) && (x.isArray(t) || x.isString(t) || x.isArguments(t)) ? 0 === t.length : 0 === x.keys(t).length
            }, x.isElement = function(t) {
                return !(!t || 1 !== t.nodeType)
            }, x.isArray = m || function(t) {
                return "[object Array]" === p.call(t)
            }, x.isObject = function(t) {
                var e = typeof t;
                return "function" === e || "object" === e && !!t
            }, x.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function(t) {
                x["is" + t] = function(e) {
                    return p.call(e) === "[object " + t + "]"
                }
            }), x.isArguments(arguments) || (x.isArguments = function(t) {
                return x.has(t, "callee")
            }), "function" != typeof /./ && "object" != typeof Int8Array && (x.isFunction = function(t) {
                return "function" == typeof t || !1
            }), x.isFinite = function(t) {
                return isFinite(t) && !isNaN(parseFloat(t))
            }, x.isNaN = function(t) {
                return x.isNumber(t) && t !== +t
            }, x.isBoolean = function(t) {
                return t === !0 || t === !1 || "[object Boolean]" === p.call(t)
            }, x.isNull = function(t) {
                return null === t
            }, x.isUndefined = function(t) {
                return void 0 === t
            }, x.has = function(t, e) {
                return null != t && d.call(t, e)
            }, x.noConflict = function() {
                return s._ = o, this
            }, x.identity = function(t) {
                return t
            }, x.constant = function(t) {
                return function() {
                    return t
                }
            }, x.noop = function() {}, x.property = C, x.propertyOf = function(t) {
                return null == t ? function() {} : function(e) {
                    return t[e]
                }
            }, x.matcher = x.matches = function(t) {
                return t = x.extendOwn({}, t),
                    function(e) {
                        return x.isMatch(e, t)
                    }
            }, x.times = function(t, e, n) {
                var r = Array(Math.max(0, t));
                e = b(e, n, 1);
                for (var i = 0; t > i; i++) r[i] = e(i);
                return r
            }, x.random = function(t, e) {
                return null == e && (e = t, t = 0), t + Math.floor(Math.random() * (e - t + 1))
            }, x.now = Date.now || function() {
                return (new Date).getTime()
            };
            var E = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#x27;",
                    "`": "&#x60;"
                },
                F = x.invert(E),
                I = function(t) {
                    var e = function(e) {
                            return t[e]
                        },
                        n = "(?:" + x.keys(t).join("|") + ")",
                        r = RegExp(n),
                        i = RegExp(n, "g");
                    return function(t) {
                        return t = null == t ? "" : "" + t, r.test(t) ? t.replace(i, e) : t
                    }
                };
            x.escape = I(E), x.unescape = I(F), x.result = function(t, e, n) {
                var r = null == t ? void 0 : t[e];
                return void 0 === r && (r = n), x.isFunction(r) ? r.call(t) : r
            };
            var L = 0;
            x.uniqueId = function(t) {
                var e = ++L + "";
                return t ? t + e : e
            }, x.templateSettings = {
                evaluate: /<%([\s\S]+?)%>/g,
                interpolate: /<%=([\s\S]+?)%>/g,
                escape: /<%-([\s\S]+?)%>/g
            };
            var z = /(.)^/,
                B = {
                    "'": "'",
                    "\\": "\\",
                    "\r": "r",
                    "\n": "n",
                    "\u2028": "u2028",
                    "\u2029": "u2029"
                },
                q = /\\|'|\r|\n|\u2028|\u2029/g,
                X = function(t) {
                    return "\\" + B[t]
                };
            x.template = function(t, e, n) {
                !e && n && (e = n), e = x.defaults({}, e, x.templateSettings);
                var r = RegExp([(e.escape || z).source, (e.interpolate || z).source, (e.evaluate || z).source].join("|") + "|$", "g"),
                    i = 0,
                    a = "__p+='";
                t.replace(r, function(e, n, r, s, o) {
                    return a += t.slice(i, o).replace(q, X), i = o + e.length, n ? a += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" : r ? a += "'+\n((__t=(" + r + "))==null?'':__t)+\n'" : s && (a += "';\n" + s + "\n__p+='"), e
                }), a += "';\n", e.variable || (a = "with(obj||{}){\n" + a + "}\n"), a = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n";
                try {
                    var s = new Function(e.variable || "obj", "_", a)
                } catch (o) {
                    throw o.source = a, o
                }
                var l = function(t) {
                        return s.call(this, t, x)
                    },
                    u = e.variable || "obj";
                return l.source = "function(" + u + "){\n" + a + "}", l
            }, x.chain = function(t) {
                var e = x(t);
                return e._chain = !0, e
            };
            var H = function(t, e) {
                return t._chain ? x(e).chain() : e
            };
            x.mixin = function(t) {
                x.each(x.functions(t), function(e) {
                    var n = x[e] = t[e];
                    x.prototype[e] = function() {
                        var t = [this._wrapped];
                        return h.apply(t, arguments), H(this, n.apply(x, t))
                    }
                })
            }, x.mixin(x), x.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(t) {
                var e = l[t];
                x.prototype[t] = function() {
                    var n = this._wrapped;
                    return e.apply(n, arguments), "shift" !== t && "splice" !== t || 0 !== n.length || delete n[0], H(this, n)
                }
            }), x.each(["concat", "join", "slice"], function(t) {
                var e = l[t];
                x.prototype[t] = function() {
                    return H(this, e.apply(this._wrapped, arguments))
                }
            }), x.prototype.value = function() {
                return this._wrapped
            }, x.prototype.valueOf = x.prototype.toJSON = x.prototype.value, x.prototype.toString = function() {
                return "" + this._wrapped
            }, "function" == typeof define && define.amd && define("underscore", [], function() {
                return x
            })
        }).call(this)
    }, {}],
    4: [function(t, e, n) {
        (function(t) {
            (function(e, n, r, i, a) {
                var s = "undefined" != typeof e && e.exports && "undefined" != typeof t ? t : this || window;
                (s._gsQueue || (s._gsQueue = [])).push(function() {
                        "use strict";
                        s._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, n) {
                                var r = function(t) {
                                        var e, n = [],
                                            r = t.length;
                                        for (e = 0; e !== r; n.push(t[e++]));
                                        return n
                                    },
                                    i = function(t, e, r) {
                                        n.call(this, t, e, r), this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0, this.render = i.prototype.render
                                    },
                                    a = 1e-10,
                                    s = n._internals,
                                    o = s.isSelector,
                                    l = s.isArray,
                                    u = i.prototype = n.to({}, .1, {}),
                                    c = [];
                                i.version = "1.17.0", u.constructor = i, u.kill()._gc = !1, i.killTweensOf = i.killDelayedCallsTo = n.killTweensOf, i.getTweensOf = n.getTweensOf, i.lagSmoothing = n.lagSmoothing, i.ticker = n.ticker, i.render = n.render, u.invalidate = function() {
                                    return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), n.prototype.invalidate.call(this)
                                }, u.updateTo = function(t, e) {
                                    var r, i = this.ratio,
                                        a = this.vars.immediateRender || t.immediateRender;
                                    e && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
                                    for (r in t) this.vars[r] = t[r];
                                    if (this._initted || a)
                                        if (e) this._initted = !1, a && this.render(0, !0, !0);
                                        else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && n._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
                                        var s = this._time;
                                        this.render(0, !0, !1), this._initted = !1, this.render(s, !0, !1)
                                    } else if (this._time > 0 || a) {
                                        this._initted = !1, this._init();
                                        for (var o, l = 1 / (1 - i), u = this._firstPT; u;) o = u.s + u.c, u.c *= l, u.s = o - u.c, u = u._next
                                    }
                                    return this
                                }, u.render = function(t, e, n) {
                                    this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
                                    var r, i, o, l, u, c, h, f, p = this._dirty ? this.totalDuration() : this._totalDuration,
                                        d = this._time,
                                        m = this._totalTime,
                                        g = this._cycle,
                                        v = this._duration,
                                        y = this._rawPrevTime;
                                    if (t >= p ? (this._totalTime = p, this._cycle = this._repeat, this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = v, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (r = !0, i = "onComplete", n = n || this._timeline.autoRemoveChildren), 0 === v && (this._initted || !this.vars.lazy || n) && (this._startTime === this._timeline._duration && (t = 0), (0 === t || 0 > y || y === a) && y !== t && (n = !0, y > a && (i = "onReverseComplete")), this._rawPrevTime = f = !e || t || y === t ? t : a)) : 1e-7 > t ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== m || 0 === v && y > 0) && (i = "onReverseComplete", r = this._reversed), 0 > t && (this._active = !1, 0 === v && (this._initted || !this.vars.lazy || n) && (y >= 0 && (n = !0), this._rawPrevTime = f = !e || t || y === t ? t : a)), this._initted || (n = !0)) : (this._totalTime = this._time = t, 0 !== this._repeat && (l = v + this._repeatDelay, this._cycle = this._totalTime / l >> 0, 0 !== this._cycle && this._cycle === this._totalTime / l && this._cycle--, this._time = this._totalTime - this._cycle * l, this._yoyo && 0 !== (1 & this._cycle) && (this._time = v - this._time), this._time > v ? this._time = v : this._time < 0 && (this._time = 0)), this._easeType ? (u = this._time / v, c = this._easeType, h = this._easePower, (1 === c || 3 === c && u >= .5) && (u = 1 - u), 3 === c && (u *= 2), 1 === h ? u *= u : 2 === h ? u *= u * u : 3 === h ? u *= u * u * u : 4 === h && (u *= u * u * u * u), 1 === c ? this.ratio = 1 - u : 2 === c ? this.ratio = u : this._time / v < .5 ? this.ratio = u / 2 : this.ratio = 1 - u / 2) : this.ratio = this._ease.getRatio(this._time / v)), d === this._time && !n && g === this._cycle) return void(m !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate")));
                                    if (!this._initted) {
                                        if (this._init(), !this._initted || this._gc) return;
                                        if (!n && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = d, this._totalTime = m, this._rawPrevTime = y, this._cycle = g, s.lazyTweens.push(this), void(this._lazy = [t, e]);
                                        this._time && !r ? this.ratio = this._ease.getRatio(this._time / v) : r && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                                    }
                                    for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== d && t >= 0 && (this._active = !0), 0 === m && (2 === this._initted && t > 0 && this._init(), this._startAt && (t >= 0 ? this._startAt.render(t, e, n) : i || (i = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === v) && (e || this._callback("onStart"))), o = this._firstPT; o;) o.f ? o.t[o.p](o.c * this.ratio + o.s) : o.t[o.p] = o.c * this.ratio + o.s, o = o._next;
                                    this._onUpdate && (0 > t && this._startAt && this._startTime && this._startAt.render(t, e, n), e || (this._totalTime !== m || r) && this._callback("onUpdate")), this._cycle !== g && (e || this._gc || this.vars.onRepeat && this._callback("onRepeat")), i && (!this._gc || n) && (0 > t && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, e, n), r && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[i] && this._callback(i), 0 === v && this._rawPrevTime === a && f !== a && (this._rawPrevTime = 0))
                                }, i.to = function(t, e, n) {
                                    return new i(t, e, n)
                                }, i.from = function(t, e, n) {
                                    return n.runBackwards = !0, n.immediateRender = 0 != n.immediateRender, new i(t, e, n)
                                }, i.fromTo = function(t, e, n, r) {
                                    return r.startAt = n, r.immediateRender = 0 != r.immediateRender && 0 != n.immediateRender, new i(t, e, r)
                                }, i.staggerTo = i.allTo = function(t, e, a, s, u, h, f) {
                                    s = s || 0;
                                    var p, d, m, g, v = a.delay || 0,
                                        y = [],
                                        _ = function() {
                                            a.onComplete && a.onComplete.apply(a.onCompleteScope || this, arguments), u.apply(f || a.callbackScope || this, h || c)
                                        };
                                    for (l(t) || ("string" == typeof t && (t = n.selector(t) || t), o(t) && (t = r(t))), t = t || [], 0 > s && (t = r(t), t.reverse(), s *= -1), p = t.length - 1, m = 0; p >= m; m++) {
                                        d = {};
                                        for (g in a) d[g] = a[g];
                                        d.delay = v, m === p && u && (d.onComplete = _), y[m] = new i(t[m], e, d), v += s
                                    }
                                    return y
                                }, i.staggerFrom = i.allFrom = function(t, e, n, r, a, s, o) {
                                    return n.runBackwards = !0, n.immediateRender = 0 != n.immediateRender, i.staggerTo(t, e, n, r, a, s, o)
                                }, i.staggerFromTo = i.allFromTo = function(t, e, n, r, a, s, o, l) {
                                    return r.startAt = n, r.immediateRender = 0 != r.immediateRender && 0 != n.immediateRender, i.staggerTo(t, e, r, a, s, o, l)
                                }, i.delayedCall = function(t, e, n, r, a) {
                                    return new i(e, 0, {
                                        delay: t,
                                        onComplete: e,
                                        onCompleteParams: n,
                                        callbackScope: r,
                                        onReverseComplete: e,
                                        onReverseCompleteParams: n,
                                        immediateRender: !1,
                                        useFrames: a,
                                        overwrite: 0
                                    })
                                }, i.set = function(t, e) {
                                    return new i(t, 0, e)
                                }, i.isTweening = function(t) {
                                    return n.getTweensOf(t, !0).length > 0
                                };
                                var h = function(t, e) {
                                        for (var r = [], i = 0, a = t._first; a;) a instanceof n ? r[i++] = a : (e && (r[i++] = a), r = r.concat(h(a, e)), i = r.length), a = a._next;
                                        return r
                                    },
                                    f = i.getAllTweens = function(e) {
                                        return h(t._rootTimeline, e).concat(h(t._rootFramesTimeline, e))
                                    };
                                i.killAll = function(t, n, r, i) {
                                    null == n && (n = !0), null == r && (r = !0);
                                    var a, s, o, l = f(0 != i),
                                        u = l.length,
                                        c = n && r && i;
                                    for (o = 0; u > o; o++) s = l[o], (c || s instanceof e || (a = s.target === s.vars.onComplete) && r || n && !a) && (t ? s.totalTime(s._reversed ? 0 : s.totalDuration()) : s._enabled(!1, !1))
                                }, i.killChildTweensOf = function(t, e) {
                                    if (null != t) {
                                        var a, u, c, h, f, p = s.tweenLookup;
                                        if ("string" == typeof t && (t = n.selector(t) || t), o(t) && (t = r(t)), l(t))
                                            for (h = t.length; --h > -1;) i.killChildTweensOf(t[h], e);
                                        else {
                                            a = [];
                                            for (c in p)
                                                for (u = p[c].target.parentNode; u;) u === t && (a = a.concat(p[c].tweens)), u = u.parentNode;
                                            for (f = a.length, h = 0; f > h; h++) e && a[h].totalTime(a[h].totalDuration()), a[h]._enabled(!1, !1)
                                        }
                                    }
                                };
                                var p = function(t, n, r, i) {
                                    n = n !== !1, r = r !== !1, i = i !== !1;
                                    for (var a, s, o = f(i), l = n && r && i, u = o.length; --u > -1;) s = o[u], (l || s instanceof e || (a = s.target === s.vars.onComplete) && r || n && !a) && s.paused(t)
                                };
                                return i.pauseAll = function(t, e, n) {
                                    p(!0, t, e, n)
                                }, i.resumeAll = function(t, e, n) {
                                    p(!1, t, e, n)
                                }, i.globalTimeScale = function(e) {
                                    var r = t._rootTimeline,
                                        i = n.ticker.time;
                                    return arguments.length ? (e = e || a, r._startTime = i - (i - r._startTime) * r._timeScale / e, r = t._rootFramesTimeline, i = n.ticker.frame, r._startTime = i - (i - r._startTime) * r._timeScale / e, r._timeScale = t._rootTimeline._timeScale = e, e) : r._timeScale
                                }, u.progress = function(t) {
                                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
                                }, u.totalProgress = function(t) {
                                    return arguments.length ? this.totalTime(this.totalDuration() * t, !1) : this._totalTime / this.totalDuration()
                                }, u.time = function(t, e) {
                                    return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
                                }, u.duration = function(e) {
                                    return arguments.length ? t.prototype.duration.call(this, e) : this._duration
                                }, u.totalDuration = function(t) {
                                    return arguments.length ? -1 === this._repeat ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
                                }, u.repeat = function(t) {
                                    return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
                                }, u.repeatDelay = function(t) {
                                    return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
                                }, u.yoyo = function(t) {
                                    return arguments.length ? (this._yoyo = t, this) : this._yoyo
                                }, i
                            }, !0), s._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, n) {
                                var r = function(t) {
                                        e.call(this, t), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
                                        var n, r, i = this.vars;
                                        for (r in i) n = i[r], u(n) && -1 !== n.join("").indexOf("{self}") && (i[r] = this._swapSelfInParams(n));
                                        u(i.tweens) && this.add(i.tweens, 0, i.align, i.stagger)
                                    },
                                    i = 1e-10,
                                    a = n._internals,
                                    o = r._internals = {},
                                    l = a.isSelector,
                                    u = a.isArray,
                                    c = a.lazyTweens,
                                    h = a.lazyRender,
                                    f = [],
                                    p = s._gsDefine.globals,
                                    d = function(t) {
                                        var e, n = {};
                                        for (e in t) n[e] = t[e];
                                        return n
                                    },
                                    m = o.pauseCallback = function(t, e, n, r) {
                                        var a, s = t._timeline,
                                            o = s._totalTime,
                                            l = t._startTime,
                                            u = t._rawPrevTime < 0 || 0 === t._rawPrevTime && s._reversed,
                                            c = u ? 0 : i,
                                            h = u ? i : 0;
                                        if (e || !this._forcingPlayhead) {
                                            for (s.pause(l), a = t._prev; a && a._startTime === l;) a._rawPrevTime = h, a = a._prev;
                                            for (a = t._next; a && a._startTime === l;) a._rawPrevTime = c, a = a._next;
                                            e && e.apply(r || s.vars.callbackScope || s, n || f), (this._forcingPlayhead || !s._paused) && s.seek(o)
                                        }
                                    },
                                    g = function(t) {
                                        var e, n = [],
                                            r = t.length;
                                        for (e = 0; e !== r; n.push(t[e++]));
                                        return n
                                    },
                                    v = r.prototype = new e;
                                return r.version = "1.17.0", v.constructor = r, v.kill()._gc = v._forcingPlayhead = !1, v.to = function(t, e, r, i) {
                                    var a = r.repeat && p.TweenMax || n;
                                    return e ? this.add(new a(t, e, r), i) : this.set(t, r, i)
                                }, v.from = function(t, e, r, i) {
                                    return this.add((r.repeat && p.TweenMax || n).from(t, e, r), i)
                                }, v.fromTo = function(t, e, r, i, a) {
                                    var s = i.repeat && p.TweenMax || n;
                                    return e ? this.add(s.fromTo(t, e, r, i), a) : this.set(t, i, a)
                                }, v.staggerTo = function(t, e, i, a, s, o, u, c) {
                                    var h, f = new r({
                                        onComplete: o,
                                        onCompleteParams: u,
                                        callbackScope: c,
                                        smoothChildTiming: this.smoothChildTiming
                                    });
                                    for ("string" == typeof t && (t = n.selector(t) || t), t = t || [], l(t) && (t = g(t)), a = a || 0, 0 > a && (t = g(t), t.reverse(), a *= -1), h = 0; h < t.length; h++) i.startAt && (i.startAt = d(i.startAt)), f.to(t[h], e, d(i), h * a);
                                    return this.add(f, s)
                                }, v.staggerFrom = function(t, e, n, r, i, a, s, o) {
                                    return n.immediateRender = 0 != n.immediateRender, n.runBackwards = !0, this.staggerTo(t, e, n, r, i, a, s, o)
                                }, v.staggerFromTo = function(t, e, n, r, i, a, s, o, l) {
                                    return r.startAt = n, r.immediateRender = 0 != r.immediateRender && 0 != n.immediateRender, this.staggerTo(t, e, r, i, a, s, o, l)
                                }, v.call = function(t, e, r, i) {
                                    return this.add(n.delayedCall(0, t, e, r), i)
                                }, v.set = function(t, e, r) {
                                    return r = this._parseTimeOrLabel(r, 0, !0), null == e.immediateRender && (e.immediateRender = r === this._time && !this._paused), this.add(new n(t, 0, e), r)
                                }, r.exportRoot = function(t, e) {
                                    t = t || {}, null == t.smoothChildTiming && (t.smoothChildTiming = !0);
                                    var i, a, s = new r(t),
                                        o = s._timeline;
                                    for (null == e && (e = !0), o._remove(s, !0), s._startTime = 0, s._rawPrevTime = s._time = s._totalTime = o._time, i = o._first; i;) a = i._next, e && i instanceof n && i.target === i.vars.onComplete || s.add(i, i._startTime - i._delay), i = a;
                                    return o.add(s, 0), s
                                }, v.add = function(i, a, s, o) {
                                    var l, c, h, f, p, d;
                                    if ("number" != typeof a && (a = this._parseTimeOrLabel(a, 0, !0, i)), !(i instanceof t)) {
                                        if (i instanceof Array || i && i.push && u(i)) {
                                            for (s = s || "normal", o = o || 0, l = a, c = i.length, h = 0; c > h; h++) u(f = i[h]) && (f = new r({
                                                tweens: f
                                            })), this.add(f, l), "string" != typeof f && "function" != typeof f && ("sequence" === s ? l = f._startTime + f.totalDuration() / f._timeScale : "start" === s && (f._startTime -= f.delay())), l += o;
                                            return this._uncache(!0)
                                        }
                                        if ("string" == typeof i) return this.addLabel(i, a);
                                        if ("function" != typeof i) throw "Cannot add " + i + " into the timeline; it is not a tween, timeline, function, or string.";
                                        i = n.delayedCall(0, i)
                                    }
                                    if (e.prototype.add.call(this, i, a), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                                        for (p = this, d = p.rawTime() > i._startTime; p._timeline;) d && p._timeline.smoothChildTiming ? p.totalTime(p._totalTime, !0) : p._gc && p._enabled(!0, !1), p = p._timeline;
                                    return this
                                }, v.remove = function(e) {
                                    if (e instanceof t) return this._remove(e, !1);
                                    if (e instanceof Array || e && e.push && u(e)) {
                                        for (var n = e.length; --n > -1;) this.remove(e[n]);
                                        return this
                                    }
                                    return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
                                }, v._remove = function(t, n) {
                                    e.prototype._remove.call(this, t, n);
                                    var r = this._last;
                                    return r ? this._time > r._startTime + r._totalDuration / r._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
                                }, v.append = function(t, e) {
                                    return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
                                }, v.insert = v.insertMultiple = function(t, e, n, r) {
                                    return this.add(t, e || 0, n, r)
                                }, v.appendMultiple = function(t, e, n, r) {
                                    return this.add(t, this._parseTimeOrLabel(null, e, !0, t), n, r)
                                }, v.addLabel = function(t, e) {
                                    return this._labels[t] = this._parseTimeOrLabel(e), this
                                }, v.addPause = function(t, e, r, i) {
                                    var a = n.delayedCall(0, m, ["{self}", e, r, i], this);
                                    return a.data = "isPause", this.add(a, t)
                                }, v.removeLabel = function(t) {
                                    return delete this._labels[t], this
                                }, v.getLabelTime = function(t) {
                                    return null != this._labels[t] ? this._labels[t] : -1
                                }, v._parseTimeOrLabel = function(e, n, r, i) {
                                    var a;
                                    if (i instanceof t && i.timeline === this) this.remove(i);
                                    else if (i && (i instanceof Array || i.push && u(i)))
                                        for (a = i.length; --a > -1;) i[a] instanceof t && i[a].timeline === this && this.remove(i[a]);
                                    if ("string" == typeof n) return this._parseTimeOrLabel(n, r && "number" == typeof e && null == this._labels[n] ? e - this.duration() : 0, r);
                                    if (n = n || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e]) null == e && (e = this.duration());
                                    else {
                                        if (a = e.indexOf("="), -1 === a) return null == this._labels[e] ? r ? this._labels[e] = this.duration() + n : n : this._labels[e] + n;
                                        n = parseInt(e.charAt(a - 1) + "1", 10) * Number(e.substr(a + 1)), e = a > 1 ? this._parseTimeOrLabel(e.substr(0, a - 1), 0, r) : this.duration()
                                    }
                                    return Number(e) + n
                                }, v.seek = function(t, e) {
                                    return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), e !== !1)
                                }, v.stop = function() {
                                    return this.paused(!0)
                                }, v.gotoAndPlay = function(t, e) {
                                    return this.play(t, e)
                                }, v.gotoAndStop = function(t, e) {
                                    return this.pause(t, e)
                                }, v.render = function(t, e, n) {
                                    this._gc && this._enabled(!0, !1);
                                    var r, a, s, o, l, u = this._dirty ? this.totalDuration() : this._totalDuration,
                                        f = this._time,
                                        p = this._startTime,
                                        d = this._timeScale,
                                        m = this._paused;
                                    if (t >= u) this._totalTime = this._time = u, this._reversed || this._hasPausedChild() || (a = !0, o = "onComplete", l = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 === t || this._rawPrevTime < 0 || this._rawPrevTime === i) && this._rawPrevTime !== t && this._first && (l = !0, this._rawPrevTime > i && (o = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : i, t = u + 1e-4;
                                    else if (1e-7 > t)
                                        if (this._totalTime = this._time = 0, (0 !== f || 0 === this._duration && this._rawPrevTime !== i && (this._rawPrevTime > 0 || 0 > t && this._rawPrevTime >= 0)) && (o = "onReverseComplete", a = this._reversed), 0 > t) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (l = a = !0, o = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (l = !0), this._rawPrevTime = t;
                                        else {
                                            if (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : i, 0 === t && a)
                                                for (r = this._first; r && 0 === r._startTime;) r._duration || (a = !1), r = r._next;
                                            t = 0, this._initted || (l = !0)
                                        } else this._totalTime = this._time = this._rawPrevTime = t;
                                    if (this._time !== f && this._first || n || l) {
                                        if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== f && t > 0 && (this._active = !0), 0 === f && this.vars.onStart && 0 !== this._time && (e || this._callback("onStart")), this._time >= f)
                                            for (r = this._first; r && (s = r._next, !this._paused || m);)(r._active || r._startTime <= this._time && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, n) : r.render((t - r._startTime) * r._timeScale, e, n)), r = s;
                                        else
                                            for (r = this._last; r && (s = r._prev, !this._paused || m);)(r._active || r._startTime <= f && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, n) : r.render((t - r._startTime) * r._timeScale, e, n)), r = s;
                                        this._onUpdate && (e || (c.length && h(), this._callback("onUpdate"))), o && (this._gc || (p === this._startTime || d !== this._timeScale) && (0 === this._time || u >= this.totalDuration()) && (a && (c.length && h(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[o] && this._callback(o)))
                                    }
                                }, v._hasPausedChild = function() {
                                    for (var t = this._first; t;) {
                                        if (t._paused || t instanceof r && t._hasPausedChild()) return !0;
                                        t = t._next
                                    }
                                    return !1
                                }, v.getChildren = function(t, e, r, i) {
                                    i = i || -9999999999;
                                    for (var a = [], s = this._first, o = 0; s;) s._startTime < i || (s instanceof n ? e !== !1 && (a[o++] = s) : (r !== !1 && (a[o++] = s), t !== !1 && (a = a.concat(s.getChildren(!0, e, r)), o = a.length))), s = s._next;
                                    return a
                                }, v.getTweensOf = function(t, e) {
                                    var r, i, a = this._gc,
                                        s = [],
                                        o = 0;
                                    for (a && this._enabled(!0, !0), r = n.getTweensOf(t), i = r.length; --i > -1;)(r[i].timeline === this || e && this._contains(r[i])) && (s[o++] = r[i]);
                                    return a && this._enabled(!1, !0), s
                                }, v.recent = function() {
                                    return this._recent
                                }, v._contains = function(t) {
                                    for (var e = t.timeline; e;) {
                                        if (e === this) return !0;
                                        e = e.timeline
                                    }
                                    return !1
                                }, v.shiftChildren = function(t, e, n) {
                                    n = n || 0;
                                    for (var r, i = this._first, a = this._labels; i;) i._startTime >= n && (i._startTime += t), i = i._next;
                                    if (e)
                                        for (r in a) a[r] >= n && (a[r] += t);
                                    return this._uncache(!0)
                                }, v._kill = function(t, e) {
                                    if (!t && !e) return this._enabled(!1, !1);
                                    for (var n = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), r = n.length, i = !1; --r > -1;) n[r]._kill(t, e) && (i = !0);
                                    return i
                                }, v.clear = function(t) {
                                    var e = this.getChildren(!1, !0, !0),
                                        n = e.length;
                                    for (this._time = this._totalTime = 0; --n > -1;) e[n]._enabled(!1, !1);
                                    return t !== !1 && (this._labels = {}), this._uncache(!0)
                                }, v.invalidate = function() {
                                    for (var e = this._first; e;) e.invalidate(), e = e._next;
                                    return t.prototype.invalidate.call(this)
                                }, v._enabled = function(t, n) {
                                    if (t === this._gc)
                                        for (var r = this._first; r;) r._enabled(t, !0), r = r._next;
                                    return e.prototype._enabled.call(this, t, n)
                                }, v.totalTime = function(e, n, r) {
                                    this._forcingPlayhead = !0;
                                    var i = t.prototype.totalTime.apply(this, arguments);
                                    return this._forcingPlayhead = !1, i
                                }, v.duration = function(t) {
                                    return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration)
                                }, v.totalDuration = function(t) {
                                    if (!arguments.length) {
                                        if (this._dirty) {
                                            for (var e, n, r = 0, i = this._last, a = 999999999999; i;) e = i._prev, i._dirty && i.totalDuration(), i._startTime > a && this._sortChildren && !i._paused ? this.add(i, i._startTime - i._delay) : a = i._startTime, i._startTime < 0 && !i._paused && (r -= i._startTime, this._timeline.smoothChildTiming && (this._startTime += i._startTime / this._timeScale), this.shiftChildren(-i._startTime, !1, -9999999999), a = 0), n = i._startTime + i._totalDuration / i._timeScale, n > r && (r = n), i = e;
                                            this._duration = this._totalDuration = r, this._dirty = !1
                                        }
                                        return this._totalDuration
                                    }
                                    return 0 !== this.totalDuration() && 0 !== t && this.timeScale(this._totalDuration / t), this
                                }, v.paused = function(e) {
                                    if (!e)
                                        for (var n = this._first, r = this._time; n;) n._startTime === r && "isPause" === n.data && (n._rawPrevTime = 0), n = n._next;
                                    return t.prototype.paused.apply(this, arguments)
                                }, v.usesFrames = function() {
                                    for (var e = this._timeline; e._timeline;) e = e._timeline;
                                    return e === t._rootFramesTimeline
                                }, v.rawTime = function() {
                                    return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
                                }, r
                            }, !0), s._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(t, e, n) {
                                var r = function(e) {
                                        t.call(this, e), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0
                                    },
                                    i = 1e-10,
                                    a = e._internals,
                                    s = a.lazyTweens,
                                    o = a.lazyRender,
                                    l = new n(null, null, 1, 0),
                                    u = r.prototype = new t;
                                return u.constructor = r, u.kill()._gc = !1, r.version = "1.17.0", u.invalidate = function() {
                                    return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), t.prototype.invalidate.call(this)
                                }, u.addCallback = function(t, n, r, i) {
                                    return this.add(e.delayedCall(0, t, r, i), n)
                                }, u.removeCallback = function(t, e) {
                                    if (t)
                                        if (null == e) this._kill(null, t);
                                        else
                                            for (var n = this.getTweensOf(t, !1), r = n.length, i = this._parseTimeOrLabel(e); --r > -1;) n[r]._startTime === i && n[r]._enabled(!1, !1);
                                    return this
                                }, u.removePause = function(e) {
                                    return this.removeCallback(t._internals.pauseCallback, e)
                                }, u.tweenTo = function(t, n) {
                                    n = n || {};
                                    var r, i, a, s = {
                                        ease: l,
                                        useFrames: this.usesFrames(),
                                        immediateRender: !1
                                    };
                                    for (i in n) s[i] = n[i];
                                    return s.time = this._parseTimeOrLabel(t), r = Math.abs(Number(s.time) - this._time) / this._timeScale || .001, a = new e(this, r, s), s.onStart = function() {
                                        a.target.paused(!0), a.vars.time !== a.target.time() && r === a.duration() && a.duration(Math.abs(a.vars.time - a.target.time()) / a.target._timeScale), n.onStart && a._callback("onStart")
                                    }, a
                                }, u.tweenFromTo = function(t, e, n) {
                                    n = n || {}, t = this._parseTimeOrLabel(t), n.startAt = {
                                        onComplete: this.seek,
                                        onCompleteParams: [t],
                                        callbackScope: this
                                    }, n.immediateRender = n.immediateRender !== !1;
                                    var r = this.tweenTo(e, n);
                                    return r.duration(Math.abs(r.vars.time - t) / this._timeScale || .001)
                                }, u.render = function(t, e, n) {
                                    this._gc && this._enabled(!0, !1);
                                    var r, a, l, u, c, h, f = this._dirty ? this.totalDuration() : this._totalDuration,
                                        p = this._duration,
                                        d = this._time,
                                        m = this._totalTime,
                                        g = this._startTime,
                                        v = this._timeScale,
                                        y = this._rawPrevTime,
                                        _ = this._paused,
                                        x = this._cycle;
                                    if (t >= f) this._locked || (this._totalTime = f, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (a = !0, u = "onComplete", c = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 === t || 0 > y || y === i) && y !== t && this._first && (c = !0, y > i && (u = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : i, this._yoyo && 0 !== (1 & this._cycle) ? this._time = t = 0 : (this._time = p, t = p + 1e-4);
                                    else if (1e-7 > t)
                                        if (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== d || 0 === p && y !== i && (y > 0 || 0 > t && y >= 0) && !this._locked) && (u = "onReverseComplete", a = this._reversed), 0 > t) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (c = a = !0, u = "onReverseComplete") : y >= 0 && this._first && (c = !0), this._rawPrevTime = t;
                                        else {
                                            if (this._rawPrevTime = p || !e || t || this._rawPrevTime === t ? t : i, 0 === t && a)
                                                for (r = this._first; r && 0 === r._startTime;) r._duration || (a = !1), r = r._next;
                                            t = 0, this._initted || (c = !0)
                                        } else 0 === p && 0 > y && (c = !0), this._time = this._rawPrevTime = t, this._locked || (this._totalTime = t, 0 !== this._repeat && (h = p + this._repeatDelay, this._cycle = this._totalTime / h >> 0, 0 !== this._cycle && this._cycle === this._totalTime / h && this._cycle--, this._time = this._totalTime - this._cycle * h, this._yoyo && 0 !== (1 & this._cycle) && (this._time = p - this._time), this._time > p ? (this._time = p, t = p + 1e-4) : this._time < 0 ? this._time = t = 0 : t = this._time));
                                    if (this._cycle !== x && !this._locked) {
                                        var b = this._yoyo && 0 !== (1 & x),
                                            w = b === (this._yoyo && 0 !== (1 & this._cycle)),
                                            T = this._totalTime,
                                            k = this._cycle,
                                            C = this._rawPrevTime,
                                            S = this._time;
                                        if (this._totalTime = x * p, this._cycle < x ? b = !b : this._totalTime += p, this._time = d, this._rawPrevTime = 0 === p ? y - 1e-4 : y, this._cycle = x, this._locked = !0, d = b ? 0 : p, this.render(d, e, 0 === p), e || this._gc || this.vars.onRepeat && this._callback("onRepeat"), w && (d = b ? p + 1e-4 : -1e-4, this.render(d, !0, !1)), this._locked = !1, this._paused && !_) return;
                                        this._time = S, this._totalTime = T, this._cycle = k, this._rawPrevTime = C
                                    }
                                    if (!(this._time !== d && this._first || n || c)) return void(m !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate")));
                                    if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== m && t > 0 && (this._active = !0), 0 === m && this.vars.onStart && 0 !== this._totalTime && (e || this._callback("onStart")), this._time >= d)
                                        for (r = this._first; r && (l = r._next, !this._paused || _);)(r._active || r._startTime <= this._time && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, n) : r.render((t - r._startTime) * r._timeScale, e, n)), r = l;
                                    else
                                        for (r = this._last; r && (l = r._prev, !this._paused || _);)(r._active || r._startTime <= d && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, n) : r.render((t - r._startTime) * r._timeScale, e, n)), r = l;
                                    this._onUpdate && (e || (s.length && o(), this._callback("onUpdate"))), u && (this._locked || this._gc || (g === this._startTime || v !== this._timeScale) && (0 === this._time || f >= this.totalDuration()) && (a && (s.length && o(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[u] && this._callback(u)))
                                }, u.getActive = function(t, e, n) {
                                    null == t && (t = !0), null == e && (e = !0), null == n && (n = !1);
                                    var r, i, a = [],
                                        s = this.getChildren(t, e, n),
                                        o = 0,
                                        l = s.length;
                                    for (r = 0; l > r; r++) i = s[r], i.isActive() && (a[o++] = i);
                                    return a
                                }, u.getLabelAfter = function(t) {
                                    t || 0 !== t && (t = this._time);
                                    var e, n = this.getLabelsArray(),
                                        r = n.length;
                                    for (e = 0; r > e; e++)
                                        if (n[e].time > t) return n[e].name;
                                    return null
                                }, u.getLabelBefore = function(t) {
                                    null == t && (t = this._time);
                                    for (var e = this.getLabelsArray(), n = e.length; --n > -1;)
                                        if (e[n].time < t) return e[n].name;
                                    return null
                                }, u.getLabelsArray = function() {
                                    var t, e = [],
                                        n = 0;
                                    for (t in this._labels) e[n++] = {
                                        time: this._labels[t],
                                        name: t
                                    };
                                    return e.sort(function(t, e) {
                                        return t.time - e.time
                                    }), e
                                }, u.progress = function(t, e) {
                                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration()
                                }, u.totalProgress = function(t, e) {
                                    return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration()
                                }, u.totalDuration = function(e) {
                                    return arguments.length ? -1 === this._repeat ? this : this.duration((e - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (t.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
                                }, u.time = function(t, e) {
                                    return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
                                }, u.repeat = function(t) {
                                    return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
                                }, u.repeatDelay = function(t) {
                                    return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
                                }, u.yoyo = function(t) {
                                    return arguments.length ? (this._yoyo = t, this) : this._yoyo
                                }, u.currentLabel = function(t) {
                                    return arguments.length ? this.seek(t, !0) : this.getLabelBefore(this._time + 1e-8)
                                }, r
                            }, !0),
                            function() {
                                var t = 180 / Math.PI,
                                    e = [],
                                    n = [],
                                    r = [],
                                    i = {},
                                    a = s._gsDefine.globals,
                                    o = function(t, e, n, r) {
                                        this.a = t, this.b = e, this.c = n, this.d = r, this.da = r - t, this.ca = n - t, this.ba = e - t
                                    },
                                    l = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
                                    u = function(t, e, n, r) {
                                        var i = {
                                                a: t
                                            },
                                            a = {},
                                            s = {},
                                            o = {
                                                c: r
                                            },
                                            l = (t + e) / 2,
                                            u = (e + n) / 2,
                                            c = (n + r) / 2,
                                            h = (l + u) / 2,
                                            f = (u + c) / 2,
                                            p = (f - h) / 8;
                                        return i.b = l + (t - l) / 4, a.b = h + p, i.c = a.a = (i.b + a.b) / 2, a.c = s.a = (h + f) / 2, s.b = f - p, o.b = c + (r - c) / 4, s.c = o.a = (s.b + o.b) / 2, [i, a, s, o]
                                    },
                                    c = function(t, i, a, s, o) {
                                        var l, c, h, f, p, d, m, g, v, y, _, x, b, w = t.length - 1,
                                            T = 0,
                                            k = t[0].a;
                                        for (l = 0; w > l; l++) p = t[T], c = p.a, h = p.d, f = t[T + 1].d, o ? (_ = e[l], x = n[l], b = (x + _) * i * .25 / (s ? .5 : r[l] || .5), d = h - (h - c) * (s ? .5 * i : 0 !== _ ? b / _ : 0), m = h + (f - h) * (s ? .5 * i : 0 !== x ? b / x : 0), g = h - (d + ((m - d) * (3 * _ / (_ + x) + .5) / 4 || 0))) : (d = h - (h - c) * i * .5, m = h + (f - h) * i * .5, g = h - (d + m) / 2), d += g, m += g, p.c = v = d, 0 !== l ? p.b = k : p.b = k = p.a + .6 * (p.c - p.a), p.da = h - c, p.ca = v - c, p.ba = k - c, a ? (y = u(c, k, v, h), t.splice(T, 1, y[0], y[1], y[2], y[3]), T += 4) : T++, k = m;
                                        p = t[T], p.b = k, p.c = k + .4 * (p.d - k), p.da = p.d - p.a, p.ca = p.c - p.a, p.ba = k - p.a, a && (y = u(p.a, k, p.c, p.d), t.splice(T, 1, y[0], y[1], y[2], y[3]))
                                    },
                                    h = function(t, r, i, a) {
                                        var s, l, u, c, h, f, p = [];
                                        if (a)
                                            for (t = [a].concat(t), l = t.length; --l > -1;) "string" == typeof(f = t[l][r]) && "=" === f.charAt(1) && (t[l][r] = a[r] + Number(f.charAt(0) + f.substr(2)));
                                        if (s = t.length - 2, 0 > s) return p[0] = new o(t[0][r], 0, 0, t[-1 > s ? 0 : 1][r]), p;
                                        for (l = 0; s > l; l++) u = t[l][r], c = t[l + 1][r], p[l] = new o(u, 0, 0, c), i && (h = t[l + 2][r], e[l] = (e[l] || 0) + (c - u) * (c - u), n[l] = (n[l] || 0) + (h - c) * (h - c));
                                        return p[l] = new o(t[l][r], 0, 0, t[l + 1][r]), p
                                    },
                                    f = function(t, a, s, o, u, f) {
                                        var p, d, m, g, v, y, _, x, b = {},
                                            w = [],
                                            T = f || t[0];
                                        u = "string" == typeof u ? "," + u + "," : l, null == a && (a = 1);
                                        for (d in t[0]) w.push(d);
                                        if (t.length > 1) {
                                            for (x = t[t.length - 1], _ = !0, p = w.length; --p > -1;)
                                                if (d = w[p], Math.abs(T[d] - x[d]) > .05) {
                                                    _ = !1;
                                                    break
                                                }
                                            _ && (t = t.concat(), f && t.unshift(f), t.push(t[1]), f = t[t.length - 3])
                                        }
                                        for (e.length = n.length = r.length = 0, p = w.length; --p > -1;) d = w[p], i[d] = -1 !== u.indexOf("," + d + ","), b[d] = h(t, d, i[d], f);
                                        for (p = e.length; --p > -1;) e[p] = Math.sqrt(e[p]), n[p] = Math.sqrt(n[p]);
                                        if (!o) {
                                            for (p = w.length; --p > -1;)
                                                if (i[d])
                                                    for (m = b[w[p]], y = m.length - 1, g = 0; y > g; g++) v = m[g + 1].da / n[g] + m[g].da / e[g], r[g] = (r[g] || 0) + v * v;
                                            for (p = r.length; --p > -1;) r[p] = Math.sqrt(r[p])
                                        }
                                        for (p = w.length, g = s ? 4 : 1; --p > -1;) d = w[p], m = b[d], c(m, a, s, o, i[d]), _ && (m.splice(0, g), m.splice(m.length - g, g));
                                        return b
                                    },
                                    p = function(t, e, n) {
                                        e = e || "soft";
                                        var r, i, a, s, l, u, c, h, f, p, d, m = {},
                                            g = "cubic" === e ? 3 : 2,
                                            v = "soft" === e,
                                            y = [];
                                        if (v && n && (t = [n].concat(t)), null == t || t.length < g + 1) throw "invalid Bezier data";
                                        for (f in t[0]) y.push(f);
                                        for (u = y.length; --u > -1;) {
                                            for (f = y[u], m[f] = l = [], p = 0, h = t.length, c = 0; h > c; c++) r = null == n ? t[c][f] : "string" == typeof(d = t[c][f]) && "=" === d.charAt(1) ? n[f] + Number(d.charAt(0) + d.substr(2)) : Number(d), v && c > 1 && h - 1 > c && (l[p++] = (r + l[p - 2]) / 2), l[p++] = r;
                                            for (h = p - g + 1, p = 0, c = 0; h > c; c += g) r = l[c], i = l[c + 1], a = l[c + 2], s = 2 === g ? 0 : l[c + 3], l[p++] = d = 3 === g ? new o(r, i, a, s) : new o(r, (2 * i + r) / 3, (2 * i + a) / 3, a);
                                            l.length = p
                                        }
                                        return m
                                    },
                                    d = function(t, e, n) {
                                        for (var r, i, a, s, o, l, u, c, h, f, p, d = 1 / n, m = t.length; --m > -1;)
                                            for (f = t[m], a = f.a, s = f.d - a, o = f.c - a, l = f.b - a, r = i = 0, c = 1; n >= c; c++) u = d * c, h = 1 - u, r = i - (i = (u * u * s + 3 * h * (u * o + h * l)) * u), p = m * n + c - 1, e[p] = (e[p] || 0) + r * r
                                    },
                                    m = function(t, e) {
                                        e = e >> 0 || 6;
                                        var n, r, i, a, s = [],
                                            o = [],
                                            l = 0,
                                            u = 0,
                                            c = e - 1,
                                            h = [],
                                            f = [];
                                        for (n in t) d(t[n], s, e);
                                        for (i = s.length, r = 0; i > r; r++) l += Math.sqrt(s[r]), a = r % e, f[a] = l, a === c && (u += l, a = r / e >> 0, h[a] = f, o[a] = u, l = 0, f = []);
                                        return {
                                            length: u,
                                            lengths: o,
                                            segments: h
                                        }
                                    },
                                    g = s._gsDefine.plugin({
                                        propName: "bezier",
                                        priority: -1,
                                        version: "1.3.4",
                                        API: 2,
                                        global: !0,
                                        init: function(t, e, n) {
                                            this._target = t, e instanceof Array && (e = {
                                                values: e
                                            }), this._func = {}, this._round = {}, this._props = [], this._timeRes = null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10);
                                            var r, i, a, s, o, l = e.values || [],
                                                u = {},
                                                c = l[0],
                                                h = e.autoRotate || n.vars.orientToBezier;
                                            this._autoRotate = h ? h instanceof Array ? h : [
                                                ["x", "y", "rotation", h === !0 ? 0 : Number(h) || 0]
                                            ] : null;
                                            for (r in c) this._props.push(r);
                                            for (a = this._props.length; --a > -1;) r = this._props[a], this._overwriteProps.push(r), i = this._func[r] = "function" == typeof t[r], u[r] = i ? t[r.indexOf("set") || "function" != typeof t["get" + r.substr(3)] ? r : "get" + r.substr(3)]() : parseFloat(t[r]), o || u[r] !== l[0][r] && (o = u);
                                            if (this._beziers = "cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type ? f(l, isNaN(e.curviness) ? 1 : e.curviness, !1, "thruBasic" === e.type, e.correlate, o) : p(l, e.type, u), this._segCount = this._beziers[r].length, this._timeRes) {
                                                var d = m(this._beziers, this._timeRes);
                                                this._length = d.length, this._lengths = d.lengths, this._segments = d.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
                                            }
                                            if (h = this._autoRotate)
                                                for (this._initialRotations = [], h[0] instanceof Array || (this._autoRotate = h = [h]), a = h.length; --a > -1;) {
                                                    for (s = 0; 3 > s; s++) r = h[a][s], this._func[r] = "function" == typeof t[r] ? t[r.indexOf("set") || "function" != typeof t["get" + r.substr(3)] ? r : "get" + r.substr(3)] : !1;
                                                    r = h[a][2], this._initialRotations[a] = this._func[r] ? this._func[r].call(this._target) : this._target[r]
                                                }
                                            return this._startRatio = n.vars.runBackwards ? 1 : 0, !0
                                        },
                                        set: function(e) {
                                            var n, r, i, a, s, o, l, u, c, h, f = this._segCount,
                                                p = this._func,
                                                d = this._target,
                                                m = e !== this._startRatio;
                                            if (this._timeRes) {
                                                if (c = this._lengths, h = this._curSeg, e *= this._length, i = this._li, e > this._l2 && f - 1 > i) {
                                                    for (u = f - 1; u > i && (this._l2 = c[++i]) <= e;);
                                                    this._l1 = c[i - 1], this._li = i, this._curSeg = h = this._segments[i], this._s2 = h[this._s1 = this._si = 0]
                                                } else if (e < this._l1 && i > 0) {
                                                    for (; i > 0 && (this._l1 = c[--i]) >= e;);
                                                    0 === i && e < this._l1 ? this._l1 = 0 : i++, this._l2 = c[i], this._li = i, this._curSeg = h = this._segments[i], this._s1 = h[(this._si = h.length - 1) - 1] || 0, this._s2 = h[this._si]
                                                }
                                                if (n = i, e -= this._l1, i = this._si, e > this._s2 && i < h.length - 1) {
                                                    for (u = h.length - 1; u > i && (this._s2 = h[++i]) <= e;);
                                                    this._s1 = h[i - 1], this._si = i
                                                } else if (e < this._s1 && i > 0) {
                                                    for (; i > 0 && (this._s1 = h[--i]) >= e;);
                                                    0 === i && e < this._s1 ? this._s1 = 0 : i++, this._s2 = h[i], this._si = i
                                                }
                                                o = (i + (e - this._s1) / (this._s2 - this._s1)) * this._prec
                                            } else n = 0 > e ? 0 : e >= 1 ? f - 1 : f * e >> 0, o = (e - n * (1 / f)) * f;
                                            for (r = 1 - o, i = this._props.length; --i > -1;) a = this._props[i], s = this._beziers[a][n], l = (o * o * s.da + 3 * r * (o * s.ca + r * s.ba)) * o + s.a, this._round[a] && (l = Math.round(l)), p[a] ? d[a](l) : d[a] = l;
                                            if (this._autoRotate) {
                                                var g, v, y, _, x, b, w, T = this._autoRotate;
                                                for (i = T.length; --i > -1;) a = T[i][2], b = T[i][3] || 0, w = T[i][4] === !0 ? 1 : t, s = this._beziers[T[i][0]], g = this._beziers[T[i][1]], s && g && (s = s[n], g = g[n], v = s.a + (s.b - s.a) * o, _ = s.b + (s.c - s.b) * o, v += (_ - v) * o, _ += (s.c + (s.d - s.c) * o - _) * o, y = g.a + (g.b - g.a) * o, x = g.b + (g.c - g.b) * o, y += (x - y) * o, x += (g.c + (g.d - g.c) * o - x) * o, l = m ? Math.atan2(x - y, _ - v) * w + b : this._initialRotations[i], p[a] ? d[a](l) : d[a] = l)
                                            }
                                        }
                                    }),
                                    v = g.prototype;
                                g.bezierThrough = f, g.cubicToQuadratic = u, g._autoCSS = !0, g.quadraticToCubic = function(t, e, n) {
                                    return new o(t, (2 * e + t) / 3, (2 * e + n) / 3, n)
                                }, g._cssRegister = function() {
                                    var t = a.CSSPlugin;
                                    if (t) {
                                        var e = t._internals,
                                            n = e._parseToProxy,
                                            r = e._setPluginRatio,
                                            i = e.CSSPropTween;
                                        e._registerComplexSpecialProp("bezier", {
                                            parser: function(t, e, a, s, o, l) {
                                                e instanceof Array && (e = {
                                                    values: e
                                                }), l = new g;
                                                var u, c, h, f = e.values,
                                                    p = f.length - 1,
                                                    d = [],
                                                    m = {};
                                                if (0 > p) return o;
                                                for (u = 0; p >= u; u++) h = n(t, f[u], s, o, l, p !== u), d[u] = h.end;
                                                for (c in e) m[c] = e[c];
                                                return m.values = d, o = new i(t, "bezier", 0, 0, h.pt, 2), o.data = h, o.plugin = l, o.setRatio = r, 0 === m.autoRotate && (m.autoRotate = !0), !m.autoRotate || m.autoRotate instanceof Array || (u = m.autoRotate === !0 ? 0 : Number(m.autoRotate), m.autoRotate = null != h.end.left ? [
                                                    ["left", "top", "rotation", u, !1]
                                                ] : null != h.end.x ? [
                                                    ["x", "y", "rotation", u, !1]
                                                ] : !1), m.autoRotate && (s._transform || s._enableTransforms(!1), h.autoRotate = s._target._gsTransform), l._onInitTween(h.proxy, m, s._tween), o
                                            }
                                        })
                                    }
                                }, v._roundProps = function(t, e) {
                                    for (var n = this._overwriteProps, r = n.length; --r > -1;)(t[n[r]] || t.bezier || t.bezierThrough) && (this._round[n[r]] = e)
                                }, v._kill = function(t) {
                                    var e, n, r = this._props;
                                    for (e in this._beziers)
                                        if (e in t)
                                            for (delete this._beziers[e], delete this._func[e], n = r.length; --n > -1;) r[n] === e && r.splice(n, 1);
                                    return this._super._kill.call(this, t)
                                }
                            }(), s._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(t, e) {
                                var n, r, i, a, o = function() {
                                        t.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = o.prototype.setRatio
                                    },
                                    l = s._gsDefine.globals,
                                    u = {},
                                    c = o.prototype = new t("css");
                                c.constructor = o, o.version = "1.17.0", o.API = 2, o.defaultTransformPerspective = 0, o.defaultSkewType = "compensated", o.defaultSmoothOrigin = !0, c = "px", o.suffixMap = {
                                    top: c,
                                    right: c,
                                    bottom: c,
                                    left: c,
                                    width: c,
                                    height: c,
                                    fontSize: c,
                                    padding: c,
                                    margin: c,
                                    perspective: c,
                                    lineHeight: ""
                                };
                                var h, f, p, d, m, g, v = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
                                    y = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                                    _ = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                                    x = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
                                    b = /(?:\d|\-|\+|=|#|\.)*/g,
                                    w = /opacity *= *([^)]*)/i,
                                    T = /opacity:([^;]*)/i,
                                    k = /alpha\(opacity *=.+?\)/i,
                                    C = /^(rgb|hsl)/,
                                    S = /([A-Z])/g,
                                    P = /-([a-z])/gi,
                                    A = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                                    O = function(t, e) {
                                        return e.toUpperCase()
                                    },
                                    j = /(?:Left|Right|Width)/i,
                                    M = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                                    N = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                                    R = /,(?=[^\)]*(?:\(|$))/gi,
                                    D = Math.PI / 180,
                                    E = 180 / Math.PI,
                                    F = {},
                                    I = document,
                                    L = function(t) {
                                        return I.createElementNS ? I.createElementNS("http://www.w3.org/1999/xhtml", t) : I.createElement(t)
                                    },
                                    z = L("div"),
                                    B = L("img"),
                                    q = o._internals = {
                                        _specialProps: u
                                    },
                                    X = navigator.userAgent,
                                    H = function() {
                                        var t = X.indexOf("Android"),
                                            e = L("a");
                                        return p = -1 !== X.indexOf("Safari") && -1 === X.indexOf("Chrome") && (-1 === t || Number(X.substr(t + 8, 1)) > 3), m = p && Number(X.substr(X.indexOf("Version/") + 8, 1)) < 6, d = -1 !== X.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(X) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(X)) && (g = parseFloat(RegExp.$1)), e ? (e.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(e.style.opacity)) : !1
                                    }(),
                                    V = function(t) {
                                        return w.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
                                    },
                                    $ = function(t) {
                                        window.console && console.log(t)
                                    },
                                    U = "",
                                    Y = "",
                                    W = function(t, e) {
                                        e = e || z;
                                        var n, r, i = e.style;
                                        if (void 0 !== i[t]) return t;
                                        for (t = t.charAt(0).toUpperCase() + t.substr(1), n = ["O", "Moz", "ms", "Ms", "Webkit"], r = 5; --r > -1 && void 0 === i[n[r] + t];);
                                        return r >= 0 ? (Y = 3 === r ? "ms" : n[r], U = "-" + Y.toLowerCase() + "-", Y + t) : null
                                    },
                                    G = I.defaultView ? I.defaultView.getComputedStyle : function() {},
                                    Z = o.getStyle = function(t, e, n, r, i) {
                                        var a;
                                        return H || "opacity" !== e ? (!r && t.style[e] ? a = t.style[e] : (n = n || G(t)) ? a = n[e] || n.getPropertyValue(e) || n.getPropertyValue(e.replace(S, "-$1").toLowerCase()) : t.currentStyle && (a = t.currentStyle[e]), null == i || a && "none" !== a && "auto" !== a && "auto auto" !== a ? a : i) : V(t)
                                    },
                                    Q = q.convertToPixels = function(t, n, r, i, a) {
                                        if ("px" === i || !i) return r;
                                        if ("auto" === i || !r) return 0;
                                        var s, l, u, c = j.test(n),
                                            h = t,
                                            f = z.style,
                                            p = 0 > r;
                                        if (p && (r = -r), "%" === i && -1 !== n.indexOf("border")) s = r / 100 * (c ? t.clientWidth : t.clientHeight);
                                        else {
                                            if (f.cssText = "border:0 solid red;position:" + Z(t, "position") + ";line-height:0;", "%" !== i && h.appendChild) f[c ? "borderLeftWidth" : "borderTopWidth"] = r + i;
                                            else {
                                                if (h = t.parentNode || I.body, l = h._gsCache, u = e.ticker.frame, l && c && l.time === u) return l.width * r / 100;
                                                f[c ? "width" : "height"] = r + i
                                            }
                                            h.appendChild(z), s = parseFloat(z[c ? "offsetWidth" : "offsetHeight"]), h.removeChild(z), c && "%" === i && o.cacheWidths !== !1 && (l = h._gsCache = h._gsCache || {}, l.time = u, l.width = s / r * 100), 0 !== s || a || (s = Q(t, n, r, i, !0))
                                        }
                                        return p ? -s : s
                                    },
                                    J = q.calculateOffset = function(t, e, n) {
                                        if ("absolute" !== Z(t, "position", n)) return 0;
                                        var r = "left" === e ? "Left" : "Top",
                                            i = Z(t, "margin" + r, n);
                                        return t["offset" + r] - (Q(t, e, parseFloat(i), i.replace(b, "")) || 0)
                                    },
                                    K = function(t, e) {
                                        var n, r, i, a = {};
                                        if (e = e || G(t, null))
                                            if (n = e.length)
                                                for (; --n > -1;) i = e[n], (-1 === i.indexOf("-transform") || Ct === i) && (a[i.replace(P, O)] = e.getPropertyValue(i));
                                            else
                                                for (n in e)(-1 === n.indexOf("Transform") || kt === n) && (a[n] = e[n]);
                                        else if (e = t.currentStyle || t.style)
                                            for (n in e) "string" == typeof n && void 0 === a[n] && (a[n.replace(P, O)] = e[n]);
                                        return H || (a.opacity = V(t)), r = It(t, e, !1), a.rotation = r.rotation, a.skewX = r.skewX, a.scaleX = r.scaleX, a.scaleY = r.scaleY, a.x = r.x, a.y = r.y, Pt && (a.z = r.z, a.rotationX = r.rotationX, a.rotationY = r.rotationY, a.scaleZ = r.scaleZ), a.filters && delete a.filters, a
                                    },
                                    tt = function(t, e, n, r, i) {
                                        var a, s, o, l = {},
                                            u = t.style;
                                        for (s in n) "cssText" !== s && "length" !== s && isNaN(s) && (e[s] !== (a = n[s]) || i && i[s]) && -1 === s.indexOf("Origin") && ("number" == typeof a || "string" == typeof a) && (l[s] = "auto" !== a || "left" !== s && "top" !== s ? "" !== a && "auto" !== a && "none" !== a || "string" != typeof e[s] || "" === e[s].replace(x, "") ? a : 0 : J(t, s), void 0 !== u[s] && (o = new dt(u, s, u[s], o)));
                                        if (r)
                                            for (s in r) "className" !== s && (l[s] = r[s]);
                                        return {
                                            difs: l,
                                            firstMPT: o
                                        }
                                    },
                                    et = {
                                        width: ["Left", "Right"],
                                        height: ["Top", "Bottom"]
                                    },
                                    nt = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                                    rt = function(t, e, n) {
                                        var r = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
                                            i = et[e],
                                            a = i.length;
                                        for (n = n || G(t, null); --a > -1;) r -= parseFloat(Z(t, "padding" + i[a], n, !0)) || 0, r -= parseFloat(Z(t, "border" + i[a] + "Width", n, !0)) || 0;
                                        return r
                                    },
                                    it = function(t, e) {
                                        (null == t || "" === t || "auto" === t || "auto auto" === t) && (t = "0 0");
                                        var n = t.split(" "),
                                            r = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : n[0],
                                            i = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : n[1];
                                        return null == i ? i = "center" === r ? "50%" : "0" : "center" === i && (i = "50%"), ("center" === r || isNaN(parseFloat(r)) && -1 === (r + "").indexOf("=")) && (r = "50%"), t = r + " " + i + (n.length > 2 ? " " + n[2] : ""), e && (e.oxp = -1 !== r.indexOf("%"), e.oyp = -1 !== i.indexOf("%"), e.oxr = "=" === r.charAt(1), e.oyr = "=" === i.charAt(1), e.ox = parseFloat(r.replace(x, "")), e.oy = parseFloat(i.replace(x, "")), e.v = t), e || t
                                    },
                                    at = function(t, e) {
                                        return "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e)
                                    },
                                    st = function(t, e) {
                                        return null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) + e : parseFloat(t)
                                    },
                                    ot = function(t, e, n, r) {
                                        var i, a, s, o, l, u = 1e-6;
                                        return null == t ? o = e : "number" == typeof t ? o = t : (i = 360, a = t.split("_"), l = "=" === t.charAt(1), s = (l ? parseInt(t.charAt(0) + "1", 10) * parseFloat(a[0].substr(2)) : parseFloat(a[0])) * (-1 === t.indexOf("rad") ? 1 : E) - (l ? 0 : e), a.length && (r && (r[n] = e + s), -1 !== t.indexOf("short") && (s %= i, s !== s % (i / 2) && (s = 0 > s ? s + i : s - i)), -1 !== t.indexOf("_cw") && 0 > s ? s = (s + 9999999999 * i) % i - (s / i | 0) * i : -1 !== t.indexOf("ccw") && s > 0 && (s = (s - 9999999999 * i) % i - (s / i | 0) * i)), o = e + s), u > o && o > -u && (o = 0), o
                                    },
                                    lt = {
                                        aqua: [0, 255, 255],
                                        lime: [0, 255, 0],
                                        silver: [192, 192, 192],
                                        black: [0, 0, 0],
                                        maroon: [128, 0, 0],
                                        teal: [0, 128, 128],
                                        blue: [0, 0, 255],
                                        navy: [0, 0, 128],
                                        white: [255, 255, 255],
                                        fuchsia: [255, 0, 255],
                                        olive: [128, 128, 0],
                                        yellow: [255, 255, 0],
                                        orange: [255, 165, 0],
                                        gray: [128, 128, 128],
                                        purple: [128, 0, 128],
                                        green: [0, 128, 0],
                                        red: [255, 0, 0],
                                        pink: [255, 192, 203],
                                        cyan: [0, 255, 255],
                                        transparent: [255, 255, 255, 0]
                                    },
                                    ut = function(t, e, n) {
                                        return t = 0 > t ? t + 1 : t > 1 ? t - 1 : t, 255 * (1 > 6 * t ? e + (n - e) * t * 6 : .5 > t ? n : 2 > 3 * t ? e + (n - e) * (2 / 3 - t) * 6 : e) + .5 | 0
                                    },
                                    ct = o.parseColor = function(t) {
                                        var e, n, r, i, a, s;
                                        return t && "" !== t ? "number" == typeof t ? [t >> 16, t >> 8 & 255, 255 & t] : ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), lt[t] ? lt[t] : "#" === t.charAt(0) ? (4 === t.length && (e = t.charAt(1), n = t.charAt(2), r = t.charAt(3), t = "#" + e + e + n + n + r + r), t = parseInt(t.substr(1), 16), [t >> 16, t >> 8 & 255, 255 & t]) : "hsl" === t.substr(0, 3) ? (t = t.match(v), i = Number(t[0]) % 360 / 360, a = Number(t[1]) / 100, s = Number(t[2]) / 100, n = .5 >= s ? s * (a + 1) : s + a - s * a, e = 2 * s - n, t.length > 3 && (t[3] = Number(t[3])), t[0] = ut(i + 1 / 3, e, n), t[1] = ut(i, e, n), t[2] = ut(i - 1 / 3, e, n), t) : (t = t.match(v) || lt.transparent, t[0] = Number(t[0]), t[1] = Number(t[1]), t[2] = Number(t[2]), t.length > 3 && (t[3] = Number(t[3])), t)) : lt.black
                                    },
                                    ht = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
                                for (c in lt) ht += "|" + c + "\\b";
                                ht = new RegExp(ht + ")", "gi");
                                var ft = function(t, e, n, r) {
                                        if (null == t) return function(t) {
                                            return t
                                        };
                                        var i, a = e ? (t.match(ht) || [""])[0] : "",
                                            s = t.split(a).join("").match(_) || [],
                                            o = t.substr(0, t.indexOf(s[0])),
                                            l = ")" === t.charAt(t.length - 1) ? ")" : "",
                                            u = -1 !== t.indexOf(" ") ? " " : ",",
                                            c = s.length,
                                            h = c > 0 ? s[0].replace(v, "") : "";
                                        return c ? i = e ? function(t) {
                                            var e, f, p, d;
                                            if ("number" == typeof t) t += h;
                                            else if (r && R.test(t)) {
                                                for (d = t.replace(R, "|").split("|"), p = 0; p < d.length; p++) d[p] = i(d[p]);
                                                return d.join(",")
                                            }
                                            if (e = (t.match(ht) || [a])[0], f = t.split(e).join("").match(_) || [], p = f.length, c > p--)
                                                for (; ++p < c;) f[p] = n ? f[(p - 1) / 2 | 0] : s[p];
                                            return o + f.join(u) + u + e + l + (-1 !== t.indexOf("inset") ? " inset" : "")
                                        } : function(t) {
                                            var e, a, f;
                                            if ("number" == typeof t) t += h;
                                            else if (r && R.test(t)) {
                                                for (a = t.replace(R, "|").split("|"), f = 0; f < a.length; f++) a[f] = i(a[f]);
                                                return a.join(",")
                                            }
                                            if (e = t.match(_) || [], f = e.length, c > f--)
                                                for (; ++f < c;) e[f] = n ? e[(f - 1) / 2 | 0] : s[f];
                                            return o + e.join(u) + l
                                        } : function(t) {
                                            return t
                                        }
                                    },
                                    pt = function(t) {
                                        return t = t.split(","),
                                            function(e, n, r, i, a, s, o) {
                                                var l, u = (n + "").split(" ");
                                                for (o = {}, l = 0; 4 > l; l++) o[t[l]] = u[l] = u[l] || u[(l - 1) / 2 >> 0];
                                                return i.parse(e, o, a, s)
                                            }
                                    },
                                    dt = (q._setPluginRatio = function(t) {
                                        this.plugin.setRatio(t);
                                        for (var e, n, r, i, a = this.data, s = a.proxy, o = a.firstMPT, l = 1e-6; o;) e = s[o.v], o.r ? e = Math.round(e) : l > e && e > -l && (e = 0), o.t[o.p] = e, o = o._next;
                                        if (a.autoRotate && (a.autoRotate.rotation = s.rotation), 1 === t)
                                            for (o = a.firstMPT; o;) {
                                                if (n = o.t, n.type) {
                                                    if (1 === n.type) {
                                                        for (i = n.xs0 + n.s + n.xs1, r = 1; r < n.l; r++) i += n["xn" + r] + n["xs" + (r + 1)];
                                                        n.e = i
                                                    }
                                                } else n.e = n.s + n.xs0;
                                                o = o._next
                                            }
                                    }, function(t, e, n, r, i) {
                                        this.t = t, this.p = e, this.v = n, this.r = i, r && (r._prev = this, this._next = r)
                                    }),
                                    mt = (q._parseToProxy = function(t, e, n, r, i, a) {
                                        var s, o, l, u, c, h = r,
                                            f = {},
                                            p = {},
                                            d = n._transform,
                                            m = F;
                                        for (n._transform = null, F = e, r = c = n.parse(t, e, r, i), F = m, a && (n._transform = d, h && (h._prev = null, h._prev && (h._prev._next = null))); r && r !== h;) {
                                            if (r.type <= 1 && (o = r.p, p[o] = r.s + r.c, f[o] = r.s, a || (u = new dt(r, "s", o, u, r.r), r.c = 0), 1 === r.type))
                                                for (s = r.l; --s > 0;) l = "xn" + s, o = r.p + "_" + l, p[o] = r.data[l], f[o] = r[l], a || (u = new dt(r, l, o, u, r.rxp[l]));
                                            r = r._next
                                        }
                                        return {
                                            proxy: f,
                                            end: p,
                                            firstMPT: u,
                                            pt: c
                                        }
                                    }, q.CSSPropTween = function(t, e, r, i, s, o, l, u, c, h, f) {
                                        this.t = t, this.p = e, this.s = r, this.c = i, this.n = l || e, t instanceof mt || a.push(this.n), this.r = u, this.type = o || 0, c && (this.pr = c, n = !0), this.b = void 0 === h ? r : h, this.e = void 0 === f ? r + i : f, s && (this._next = s, s._prev = this)
                                    }),
                                    gt = function(t, e, n, r, i, a) {
                                        var s = new mt(t, e, n, r - n, i, -1, a);
                                        return s.b = n, s.e = s.xs0 = r, s
                                    },
                                    vt = o.parseComplex = function(t, e, n, r, i, a, s, o, l, u) {
                                        n = n || a || "", s = new mt(t, e, 0, 0, s, u ? 2 : 1, null, !1, o, n, r), r += "";
                                        var c, f, p, d, m, g, _, x, b, w, T, k, S = n.split(", ").join(",").split(" "),
                                            P = r.split(", ").join(",").split(" "),
                                            A = S.length,
                                            O = h !== !1;
                                        for ((-1 !== r.indexOf(",") || -1 !== n.indexOf(",")) && (S = S.join(" ").replace(R, ", ").split(" "), P = P.join(" ").replace(R, ", ").split(" "), A = S.length), A !== P.length && (S = (a || "").split(" "), A = S.length), s.plugin = l, s.setRatio = u, c = 0; A > c; c++)
                                            if (d = S[c], m = P[c], x = parseFloat(d), x || 0 === x) s.appendXtra("", x, at(m, x), m.replace(y, ""), O && -1 !== m.indexOf("px"), !0);
                                            else if (i && ("#" === d.charAt(0) || lt[d] || C.test(d))) k = "," === m.charAt(m.length - 1) ? ")," : ")", d = ct(d), m = ct(m), b = d.length + m.length > 6, b && !H && 0 === m[3] ? (s["xs" + s.l] += s.l ? " transparent" : "transparent", s.e = s.e.split(P[c]).join("transparent")) : (H || (b = !1), s.appendXtra(b ? "rgba(" : "rgb(", d[0], m[0] - d[0], ",", !0, !0).appendXtra("", d[1], m[1] - d[1], ",", !0).appendXtra("", d[2], m[2] - d[2], b ? "," : k, !0), b && (d = d.length < 4 ? 1 : d[3], s.appendXtra("", d, (m.length < 4 ? 1 : m[3]) - d, k, !1)));
                                        else if (g = d.match(v)) {
                                            if (_ = m.match(y), !_ || _.length !== g.length) return s;
                                            for (p = 0, f = 0; f < g.length; f++) T = g[f], w = d.indexOf(T, p), s.appendXtra(d.substr(p, w - p), Number(T), at(_[f], T), "", O && "px" === d.substr(w + T.length, 2), 0 === f), p = w + T.length;
                                            s["xs" + s.l] += d.substr(p)
                                        } else s["xs" + s.l] += s.l ? " " + d : d;
                                        if (-1 !== r.indexOf("=") && s.data) {
                                            for (k = s.xs0 + s.data.s, c = 1; c < s.l; c++) k += s["xs" + c] + s.data["xn" + c];
                                            s.e = k + s["xs" + c]
                                        }
                                        return s.l || (s.type = -1, s.xs0 = s.e), s.xfirst || s
                                    },
                                    yt = 9;
                                for (c = mt.prototype, c.l = c.pr = 0; --yt > 0;) c["xn" + yt] = 0, c["xs" + yt] = "";
                                c.xs0 = "", c._next = c._prev = c.xfirst = c.data = c.plugin = c.setRatio = c.rxp = null, c.appendXtra = function(t, e, n, r, i, a) {
                                    var s = this,
                                        o = s.l;
                                    return s["xs" + o] += a && o ? " " + t : t || "", n || 0 === o || s.plugin ? (s.l++, s.type = s.setRatio ? 2 : 1, s["xs" + s.l] = r || "", o > 0 ? (s.data["xn" + o] = e + n, s.rxp["xn" + o] = i, s["xn" + o] = e, s.plugin || (s.xfirst = new mt(s, "xn" + o, e, n, s.xfirst || s, 0, s.n, i, s.pr), s.xfirst.xs0 = 0), s) : (s.data = {
                                        s: e + n
                                    }, s.rxp = {}, s.s = e, s.c = n, s.r = i, s)) : (s["xs" + o] += e + (r || ""), s)
                                };
                                var _t = function(t, e) {
                                        e = e || {}, this.p = e.prefix ? W(t) || t : t, u[t] = u[this.p] = this, this.format = e.formatter || ft(e.defaultValue, e.color, e.collapsible, e.multi), e.parser && (this.parse = e.parser), this.clrs = e.color, this.multi = e.multi, this.keyword = e.keyword, this.dflt = e.defaultValue, this.pr = e.priority || 0
                                    },
                                    xt = q._registerComplexSpecialProp = function(t, e, n) {
                                        "object" != typeof e && (e = {
                                            parser: n
                                        });
                                        var r, i, a = t.split(","),
                                            s = e.defaultValue;
                                        for (n = n || [s], r = 0; r < a.length; r++) e.prefix = 0 === r && e.prefix, e.defaultValue = n[r] || s, i = new _t(a[r], e)
                                    },
                                    bt = function(t) {
                                        if (!u[t]) {
                                            var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
                                            xt(t, {
                                                parser: function(t, n, r, i, a, s, o) {
                                                    var c = l.com.greensock.plugins[e];
                                                    return c ? (c._cssRegister(), u[r].parse(t, n, r, i, a, s, o)) : ($("Error: " + e + " js file not loaded."), a)
                                                }
                                            })
                                        }
                                    };
                                c = _t.prototype, c.parseComplex = function(t, e, n, r, i, a) {
                                    var s, o, l, u, c, h, f = this.keyword;
                                    if (this.multi && (R.test(n) || R.test(e) ? (o = e.replace(R, "|").split("|"), l = n.replace(R, "|").split("|")) : f && (o = [e], l = [n])), l) {
                                        for (u = l.length > o.length ? l.length : o.length, s = 0; u > s; s++) e = o[s] = o[s] || this.dflt, n = l[s] = l[s] || this.dflt, f && (c = e.indexOf(f), h = n.indexOf(f), c !== h && (-1 === h ? o[s] = o[s].split(f).join("") : -1 === c && (o[s] += " " + f)));
                                        e = o.join(", "), n = l.join(", ")
                                    }
                                    return vt(t, this.p, e, n, this.clrs, this.dflt, r, this.pr, i, a)
                                }, c.parse = function(t, e, n, r, a, s, o) {
                                    return this.parseComplex(t.style, this.format(Z(t, this.p, i, !1, this.dflt)), this.format(e), a, s)
                                }, o.registerSpecialProp = function(t, e, n) {
                                    xt(t, {
                                        parser: function(t, r, i, a, s, o, l) {
                                            var u = new mt(t, i, 0, 0, s, 2, i, !1, n);
                                            return u.plugin = o, u.setRatio = e(t, r, a._tween, i), u
                                        },
                                        priority: n
                                    })
                                }, o.useSVGTransformAttr = p || d;
                                var wt, Tt = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
                                    kt = W("transform"),
                                    Ct = U + "transform",
                                    St = W("transformOrigin"),
                                    Pt = null !== W("perspective"),
                                    At = q.Transform = function() {
                                        this.perspective = parseFloat(o.defaultTransformPerspective) || 0, this.force3D = o.defaultForce3D !== !1 && Pt ? o.defaultForce3D || "auto" : !1
                                    },
                                    Ot = window.SVGElement,
                                    jt = function(t, e, n) {
                                        var r, i = I.createElementNS("http://www.w3.org/2000/svg", t),
                                            a = /([a-z])([A-Z])/g;
                                        for (r in n) i.setAttributeNS(null, r.replace(a, "$1-$2").toLowerCase(), n[r]);
                                        return e.appendChild(i), i
                                    },
                                    Mt = I.documentElement,
                                    Nt = function() {
                                        var t, e, n, r = g || /Android/i.test(X) && !window.chrome;
                                        return I.createElementNS && !r && (t = jt("svg", Mt), e = jt("rect", t, {
                                            width: 100,
                                            height: 50,
                                            x: 100
                                        }), n = e.getBoundingClientRect().width, e.style[St] = "50% 50%", e.style[kt] = "scaleX(0.5)", r = n === e.getBoundingClientRect().width && !(d && Pt), Mt.removeChild(t)), r
                                    }(),
                                    Rt = function(t, e, n, r, i) {
                                        var a, s, l, u, c, h, f, p, d, m, g, v, y, _, x = t._gsTransform,
                                            b = Ft(t, !0);
                                        x && (y = x.xOrigin, _ = x.yOrigin), (!r || (a = r.split(" ")).length < 2) && (f = t.getBBox(), e = it(e).split(" "), a = [(-1 !== e[0].indexOf("%") ? parseFloat(e[0]) / 100 * f.width : parseFloat(e[0])) + f.x, (-1 !== e[1].indexOf("%") ? parseFloat(e[1]) / 100 * f.height : parseFloat(e[1])) + f.y]), n.xOrigin = u = parseFloat(a[0]), n.yOrigin = c = parseFloat(a[1]), r && b !== Et && (h = b[0], f = b[1], p = b[2], d = b[3], m = b[4], g = b[5], v = h * d - f * p, s = u * (d / v) + c * (-p / v) + (p * g - d * m) / v, l = u * (-f / v) + c * (h / v) - (h * g - f * m) / v, u = n.xOrigin = a[0] = s, c = n.yOrigin = a[1] = l), x && (i || i !== !1 && o.defaultSmoothOrigin !== !1 ? (s = u - y, l = c - _, x.xOffset += s * b[0] + l * b[2] - s, x.yOffset += s * b[1] + l * b[3] - l) : x.xOffset = x.yOffset = 0), t.setAttribute("data-svg-origin", a.join(" "))
                                    },
                                    Dt = function(t) {
                                        return !!(Ot && "function" == typeof t.getBBox && t.getCTM && (!t.parentNode || t.parentNode.getBBox && t.parentNode.getCTM))
                                    },
                                    Et = [1, 0, 0, 1, 0, 0],
                                    Ft = function(t, e) {
                                        var n, r, i, a, s, o = t._gsTransform || new At,
                                            l = 1e5;
                                        if (kt ? r = Z(t, Ct, null, !0) : t.currentStyle && (r = t.currentStyle.filter.match(M), r = r && 4 === r.length ? [r[0].substr(4), Number(r[2].substr(4)), Number(r[1].substr(4)), r[3].substr(4), o.x || 0, o.y || 0].join(",") : ""), n = !r || "none" === r || "matrix(1, 0, 0, 1, 0, 0)" === r, (o.svg || t.getBBox && Dt(t)) && (n && -1 !== (t.style[kt] + "").indexOf("matrix") && (r = t.style[kt], n = 0), i = t.getAttribute("transform"), n && i && (-1 !== i.indexOf("matrix") ? (r = i, n = 0) : -1 !== i.indexOf("translate") && (r = "matrix(1,0,0,1," + i.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", n = 0))), n) return Et;
                                        for (i = (r || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], yt = i.length; --yt > -1;) a = Number(i[yt]), i[yt] = (s = a - (a |= 0)) ? (s * l + (0 > s ? -.5 : .5) | 0) / l + a : a;
                                        return e && i.length > 6 ? [i[0], i[1], i[4], i[5], i[12], i[13]] : i
                                    },
                                    It = q.getTransform = function(t, n, r, a) {
                                        if (t._gsTransform && r && !a) return t._gsTransform;
                                        var s, l, u, c, h, f, p = r ? t._gsTransform || new At : new At,
                                            d = p.scaleX < 0,
                                            m = 2e-5,
                                            g = 1e5,
                                            v = Pt ? parseFloat(Z(t, St, n, !1, "0 0 0").split(" ")[2]) || p.zOrigin || 0 : 0,
                                            y = parseFloat(o.defaultTransformPerspective) || 0;
                                        if (p.svg = !(!t.getBBox || !Dt(t)), p.svg && (Rt(t, Z(t, St, i, !1, "50% 50%") + "", p, t.getAttribute("data-svg-origin")), wt = o.useSVGTransformAttr || Nt), s = Ft(t), s !== Et) {
                                            if (16 === s.length) {
                                                var _, x, b, w, T, k = s[0],
                                                    C = s[1],
                                                    S = s[2],
                                                    P = s[3],
                                                    A = s[4],
                                                    O = s[5],
                                                    j = s[6],
                                                    M = s[7],
                                                    N = s[8],
                                                    R = s[9],
                                                    D = s[10],
                                                    F = s[12],
                                                    I = s[13],
                                                    L = s[14],
                                                    z = s[11],
                                                    B = Math.atan2(j, D);
                                                p.zOrigin && (L = -p.zOrigin, F = N * L - s[12], I = R * L - s[13], L = D * L + p.zOrigin - s[14]), p.rotationX = B * E, B && (w = Math.cos(-B), T = Math.sin(-B), _ = A * w + N * T, x = O * w + R * T, b = j * w + D * T, N = A * -T + N * w, R = O * -T + R * w, D = j * -T + D * w, z = M * -T + z * w, A = _, O = x, j = b), B = Math.atan2(N, D), p.rotationY = B * E, B && (w = Math.cos(-B), T = Math.sin(-B), _ = k * w - N * T, x = C * w - R * T, b = S * w - D * T, R = C * T + R * w, D = S * T + D * w, z = P * T + z * w, k = _, C = x, S = b), B = Math.atan2(C, k), p.rotation = B * E, B && (w = Math.cos(-B), T = Math.sin(-B), k = k * w + A * T, x = C * w + O * T, O = C * -T + O * w, j = S * -T + j * w, C = x), p.rotationX && Math.abs(p.rotationX) + Math.abs(p.rotation) > 359.9 && (p.rotationX = p.rotation = 0, p.rotationY += 180), p.scaleX = (Math.sqrt(k * k + C * C) * g + .5 | 0) / g, p.scaleY = (Math.sqrt(O * O + R * R) * g + .5 | 0) / g, p.scaleZ = (Math.sqrt(j * j + D * D) * g + .5 | 0) / g, p.skewX = 0, p.perspective = z ? 1 / (0 > z ? -z : z) : 0, p.x = F, p.y = I, p.z = L, p.svg && (p.x -= p.xOrigin - (p.xOrigin * k - p.yOrigin * A), p.y -= p.yOrigin - (p.yOrigin * C - p.xOrigin * O))
                                            } else if ((!Pt || a || !s.length || p.x !== s[4] || p.y !== s[5] || !p.rotationX && !p.rotationY) && (void 0 === p.x || "none" !== Z(t, "display", n))) {
                                                var q = s.length >= 6,
                                                    X = q ? s[0] : 1,
                                                    H = s[1] || 0,
                                                    V = s[2] || 0,
                                                    $ = q ? s[3] : 1;
                                                p.x = s[4] || 0, p.y = s[5] || 0, u = Math.sqrt(X * X + H * H), c = Math.sqrt($ * $ + V * V), h = X || H ? Math.atan2(H, X) * E : p.rotation || 0, f = V || $ ? Math.atan2(V, $) * E + h : p.skewX || 0, Math.abs(f) > 90 && Math.abs(f) < 270 && (d ? (u *= -1, f += 0 >= h ? 180 : -180, h += 0 >= h ? 180 : -180) : (c *= -1, f += 0 >= f ? 180 : -180)), p.scaleX = u, p.scaleY = c, p.rotation = h, p.skewX = f, Pt && (p.rotationX = p.rotationY = p.z = 0, p.perspective = y, p.scaleZ = 1), p.svg && (p.x -= p.xOrigin - (p.xOrigin * X + p.yOrigin * V), p.y -= p.yOrigin - (p.xOrigin * H + p.yOrigin * $))
                                            }
                                            p.zOrigin = v;
                                            for (l in p) p[l] < m && p[l] > -m && (p[l] = 0)
                                        }
                                        return r && (t._gsTransform = p, p.svg && (wt && t.style[kt] ? e.delayedCall(.001, function() {
                                            qt(t.style, kt)
                                        }) : !wt && t.getAttribute("transform") && e.delayedCall(.001, function() {
                                            t.removeAttribute("transform")
                                        }))), p
                                    },
                                    Lt = function(t) {
                                        var e, n, r = this.data,
                                            i = -r.rotation * D,
                                            a = i + r.skewX * D,
                                            s = 1e5,
                                            o = (Math.cos(i) * r.scaleX * s | 0) / s,
                                            l = (Math.sin(i) * r.scaleX * s | 0) / s,
                                            u = (Math.sin(a) * -r.scaleY * s | 0) / s,
                                            c = (Math.cos(a) * r.scaleY * s | 0) / s,
                                            h = this.t.style,
                                            f = this.t.currentStyle;
                                        if (f) {
                                            n = l, l = -u, u = -n, e = f.filter, h.filter = "";
                                            var p, d, m = this.t.offsetWidth,
                                                v = this.t.offsetHeight,
                                                y = "absolute" !== f.position,
                                                _ = "progid:DXImageTransform.Microsoft.Matrix(M11=" + o + ", M12=" + l + ", M21=" + u + ", M22=" + c,
                                                x = r.x + m * r.xPercent / 100,
                                                T = r.y + v * r.yPercent / 100;
                                            if (null != r.ox && (p = (r.oxp ? m * r.ox * .01 : r.ox) - m / 2, d = (r.oyp ? v * r.oy * .01 : r.oy) - v / 2, x += p - (p * o + d * l), T += d - (p * u + d * c)), y ? (p = m / 2, d = v / 2, _ += ", Dx=" + (p - (p * o + d * l) + x) + ", Dy=" + (d - (p * u + d * c) + T) + ")") : _ += ", sizingMethod='auto expand')", -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? h.filter = e.replace(N, _) : h.filter = _ + " " + e, (0 === t || 1 === t) && 1 === o && 0 === l && 0 === u && 1 === c && (y && -1 === _.indexOf("Dx=0, Dy=0") || w.test(e) && 100 !== parseFloat(RegExp.$1) || -1 === e.indexOf(e.indexOf("Alpha")) && h.removeAttribute("filter")), !y) {
                                                var k, C, S, P = 8 > g ? 1 : -1;
                                                for (p = r.ieOffsetX || 0, d = r.ieOffsetY || 0, r.ieOffsetX = Math.round((m - ((0 > o ? -o : o) * m + (0 > l ? -l : l) * v)) / 2 + x), r.ieOffsetY = Math.round((v - ((0 > c ? -c : c) * v + (0 > u ? -u : u) * m)) / 2 + T), yt = 0; 4 > yt; yt++) C = nt[yt], k = f[C], n = -1 !== k.indexOf("px") ? parseFloat(k) : Q(this.t, C, parseFloat(k), k.replace(b, "")) || 0, S = n !== r[C] ? 2 > yt ? -r.ieOffsetX : -r.ieOffsetY : 2 > yt ? p - r.ieOffsetX : d - r.ieOffsetY, h[C] = (r[C] = Math.round(n - S * (0 === yt || 2 === yt ? 1 : P))) + "px"
                                            }
                                        }
                                    },
                                    zt = q.set3DTransformRatio = q.setTransformRatio = function(t) {
                                        var e, n, r, i, a, s, o, l, u, c, h, f, p, m, g, v, y, _, x, b, w, T, k, C = this.data,
                                            S = this.t.style,
                                            P = C.rotation,
                                            A = C.rotationX,
                                            O = C.rotationY,
                                            j = C.scaleX,
                                            M = C.scaleY,
                                            N = C.scaleZ,
                                            R = C.x,
                                            E = C.y,
                                            F = C.z,
                                            I = C.svg,
                                            L = C.perspective,
                                            z = C.force3D;
                                        if (((1 === t || 0 === t) && "auto" === z && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !z) && !F && !L && !O && !A || wt && I || !Pt) return void(P || C.skewX || I ? (P *= D, T = C.skewX * D, k = 1e5, e = Math.cos(P) * j, i = Math.sin(P) * j, n = Math.sin(P - T) * -M, a = Math.cos(P - T) * M, T && "simple" === C.skewType && (y = Math.tan(T), y = Math.sqrt(1 + y * y), n *= y, a *= y, C.skewY && (e *= y, i *= y)), I && (R += C.xOrigin - (C.xOrigin * e + C.yOrigin * n) + C.xOffset, E += C.yOrigin - (C.xOrigin * i + C.yOrigin * a) + C.yOffset, wt && (C.xPercent || C.yPercent) && (m = this.t.getBBox(), R += .01 * C.xPercent * m.width, E += .01 * C.yPercent * m.height), m = 1e-6, m > R && R > -m && (R = 0), m > E && E > -m && (E = 0)), x = (e * k | 0) / k + "," + (i * k | 0) / k + "," + (n * k | 0) / k + "," + (a * k | 0) / k + "," + R + "," + E + ")", I && wt ? this.t.setAttribute("transform", "matrix(" + x) : S[kt] = (C.xPercent || C.yPercent ? "translate(" + C.xPercent + "%," + C.yPercent + "%) matrix(" : "matrix(") + x) : S[kt] = (C.xPercent || C.yPercent ? "translate(" + C.xPercent + "%," + C.yPercent + "%) matrix(" : "matrix(") + j + ",0,0," + M + "," + R + "," + E + ")");
                                        if (d && (m = 1e-4, m > j && j > -m && (j = N = 2e-5), m > M && M > -m && (M = N = 2e-5), !L || C.z || C.rotationX || C.rotationY || (L = 0)), P || C.skewX) P *= D, g = e = Math.cos(P), v = i = Math.sin(P), C.skewX && (P -= C.skewX * D, g = Math.cos(P), v = Math.sin(P), "simple" === C.skewType && (y = Math.tan(C.skewX * D), y = Math.sqrt(1 + y * y), g *= y, v *= y, C.skewY && (e *= y, i *= y))), n = -v, a = g;
                                        else {
                                            if (!(O || A || 1 !== N || L || I)) return void(S[kt] = (C.xPercent || C.yPercent ? "translate(" + C.xPercent + "%," + C.yPercent + "%) translate3d(" : "translate3d(") + R + "px," + E + "px," + F + "px)" + (1 !== j || 1 !== M ? " scale(" + j + "," + M + ")" : ""));
                                            e = a = 1, n = i = 0
                                        }
                                        u = 1, r = s = o = l = c = h = 0, f = L ? -1 / L : 0, p = C.zOrigin, m = 1e-6, b = ",", w = "0", P = O * D, P && (g = Math.cos(P), v = Math.sin(P), o = -v, c = f * -v, r = e * v, s = i * v, u = g, f *= g, e *= g, i *= g), P = A * D, P && (g = Math.cos(P), v = Math.sin(P), y = n * g + r * v, _ = a * g + s * v, l = u * v, h = f * v, r = n * -v + r * g, s = a * -v + s * g, u *= g, f *= g, n = y, a = _), 1 !== N && (r *= N, s *= N, u *= N, f *= N), 1 !== M && (n *= M, a *= M, l *= M, h *= M), 1 !== j && (e *= j, i *= j, o *= j, c *= j), (p || I) && (p && (R += r * -p, E += s * -p, F += u * -p + p), I && (R += C.xOrigin - (C.xOrigin * e + C.yOrigin * n) + C.xOffset, E += C.yOrigin - (C.xOrigin * i + C.yOrigin * a) + C.yOffset), m > R && R > -m && (R = w), m > E && E > -m && (E = w), m > F && F > -m && (F = 0)), x = C.xPercent || C.yPercent ? "translate(" + C.xPercent + "%," + C.yPercent + "%) matrix3d(" : "matrix3d(", x += (m > e && e > -m ? w : e) + b + (m > i && i > -m ? w : i) + b + (m > o && o > -m ? w : o), x += b + (m > c && c > -m ? w : c) + b + (m > n && n > -m ? w : n) + b + (m > a && a > -m ? w : a), A || O ? (x += b + (m > l && l > -m ? w : l) + b + (m > h && h > -m ? w : h) + b + (m > r && r > -m ? w : r), x += b + (m > s && s > -m ? w : s) + b + (m > u && u > -m ? w : u) + b + (m > f && f > -m ? w : f) + b) : x += ",0,0,0,0,1,0,", x += R + b + E + b + F + b + (L ? 1 + -F / L : 1) + ")", S[kt] = x
                                    };
                                c = At.prototype, c.x = c.y = c.z = c.skewX = c.skewY = c.rotation = c.rotationX = c.rotationY = c.zOrigin = c.xPercent = c.yPercent = c.xOffset = c.yOffset = 0, c.scaleX = c.scaleY = c.scaleZ = 1, xt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
                                    parser: function(t, e, n, r, a, s, l) {
                                        if (r._lastParsedTransform === l) return a;
                                        r._lastParsedTransform = l;
                                        var u, c, h, f, p, d, m, g, v, y = t._gsTransform,
                                            _ = r._transform = It(t, i, !0, l.parseTransform),
                                            x = t.style,
                                            b = 1e-6,
                                            w = Tt.length,
                                            T = l,
                                            k = {},
                                            C = "transformOrigin";
                                        if ("string" == typeof T.transform && kt) h = z.style, h[kt] = T.transform, h.display = "block", h.position = "absolute", I.body.appendChild(z), u = It(z, null, !1), I.body.removeChild(z), null != T.xPercent && (u.xPercent = st(T.xPercent, _.xPercent)), null != T.yPercent && (u.yPercent = st(T.yPercent, _.yPercent));
                                        else if ("object" == typeof T) {
                                            if (u = {
                                                    scaleX: st(null != T.scaleX ? T.scaleX : T.scale, _.scaleX),
                                                    scaleY: st(null != T.scaleY ? T.scaleY : T.scale, _.scaleY),
                                                    scaleZ: st(T.scaleZ, _.scaleZ),
                                                    x: st(T.x, _.x),
                                                    y: st(T.y, _.y),
                                                    z: st(T.z, _.z),
                                                    xPercent: st(T.xPercent, _.xPercent),
                                                    yPercent: st(T.yPercent, _.yPercent),
                                                    perspective: st(T.transformPerspective, _.perspective)
                                                }, m = T.directionalRotation, null != m)
                                                if ("object" == typeof m)
                                                    for (h in m) T[h] = m[h];
                                                else T.rotation = m;
                                                "string" == typeof T.x && -1 !== T.x.indexOf("%") && (u.x = 0, u.xPercent = st(T.x, _.xPercent)), "string" == typeof T.y && -1 !== T.y.indexOf("%") && (u.y = 0, u.yPercent = st(T.y, _.yPercent)), u.rotation = ot("rotation" in T ? T.rotation : "shortRotation" in T ? T.shortRotation + "_short" : "rotationZ" in T ? T.rotationZ : _.rotation, _.rotation, "rotation", k), Pt && (u.rotationX = ot("rotationX" in T ? T.rotationX : "shortRotationX" in T ? T.shortRotationX + "_short" : _.rotationX || 0, _.rotationX, "rotationX", k), u.rotationY = ot("rotationY" in T ? T.rotationY : "shortRotationY" in T ? T.shortRotationY + "_short" : _.rotationY || 0, _.rotationY, "rotationY", k)), u.skewX = null == T.skewX ? _.skewX : ot(T.skewX, _.skewX), u.skewY = null == T.skewY ? _.skewY : ot(T.skewY, _.skewY), (c = u.skewY - _.skewY) && (u.skewX += c, u.rotation += c)
                                        }
                                        for (Pt && null != T.force3D && (_.force3D = T.force3D, d = !0), _.skewType = T.skewType || _.skewType || o.defaultSkewType, p = _.force3D || _.z || _.rotationX || _.rotationY || u.z || u.rotationX || u.rotationY || u.perspective, p || null == T.scale || (u.scaleZ = 1); --w > -1;) n = Tt[w], f = u[n] - _[n], (f > b || -b > f || null != T[n] || null != F[n]) && (d = !0, a = new mt(_, n, _[n], f, a), n in k && (a.e = k[n]), a.xs0 = 0, a.plugin = s, r._overwriteProps.push(a.n));
                                        return f = T.transformOrigin, _.svg && (f || T.svgOrigin) && (g = _.xOffset, v = _.yOffset, Rt(t, it(f), u, T.svgOrigin, T.smoothOrigin), a = gt(_, "xOrigin", (y ? _ : u).xOrigin, u.xOrigin, a, C), a = gt(_, "yOrigin", (y ? _ : u).yOrigin, u.yOrigin, a, C), (g !== _.xOffset || v !== _.yOffset) && (a = gt(_, "xOffset", y ? g : _.xOffset, _.xOffset, a, C),
                                            a = gt(_, "yOffset", y ? v : _.yOffset, _.yOffset, a, C)), f = wt ? null : "0px 0px"), (f || Pt && p && _.zOrigin) && (kt ? (d = !0, n = St, f = (f || Z(t, n, i, !1, "50% 50%")) + "", a = new mt(x, n, 0, 0, a, -1, C), a.b = x[n], a.plugin = s, Pt ? (h = _.zOrigin, f = f.split(" "), _.zOrigin = (f.length > 2 && (0 === h || "0px" !== f[2]) ? parseFloat(f[2]) : h) || 0, a.xs0 = a.e = f[0] + " " + (f[1] || "50%") + " 0px", a = new mt(_, "zOrigin", 0, 0, a, -1, a.n), a.b = h, a.xs0 = a.e = _.zOrigin) : a.xs0 = a.e = f) : it(f + "", _)), d && (r._transformType = _.svg && wt || !p && 3 !== this._transformType ? 2 : 3), a
                                    },
                                    prefix: !0
                                }), xt("boxShadow", {
                                    defaultValue: "0px 0px 0px 0px #999",
                                    prefix: !0,
                                    color: !0,
                                    multi: !0,
                                    keyword: "inset"
                                }), xt("borderRadius", {
                                    defaultValue: "0px",
                                    parser: function(t, e, n, a, s, o) {
                                        e = this.format(e);
                                        var l, u, c, h, f, p, d, m, g, v, y, _, x, b, w, T, k = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                                            C = t.style;
                                        for (g = parseFloat(t.offsetWidth), v = parseFloat(t.offsetHeight), l = e.split(" "), u = 0; u < k.length; u++) this.p.indexOf("border") && (k[u] = W(k[u])), f = h = Z(t, k[u], i, !1, "0px"), -1 !== f.indexOf(" ") && (h = f.split(" "), f = h[0], h = h[1]), p = c = l[u], d = parseFloat(f), _ = f.substr((d + "").length), x = "=" === p.charAt(1), x ? (m = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), m *= parseFloat(p), y = p.substr((m + "").length - (0 > m ? 1 : 0)) || "") : (m = parseFloat(p), y = p.substr((m + "").length)), "" === y && (y = r[n] || _), y !== _ && (b = Q(t, "borderLeft", d, _), w = Q(t, "borderTop", d, _), "%" === y ? (f = b / g * 100 + "%", h = w / v * 100 + "%") : "em" === y ? (T = Q(t, "borderLeft", 1, "em"), f = b / T + "em", h = w / T + "em") : (f = b + "px", h = w + "px"), x && (p = parseFloat(f) + m + y, c = parseFloat(h) + m + y)), s = vt(C, k[u], f + " " + h, p + " " + c, !1, "0px", s);
                                        return s
                                    },
                                    prefix: !0,
                                    formatter: ft("0px 0px 0px 0px", !1, !0)
                                }), xt("backgroundPosition", {
                                    defaultValue: "0 0",
                                    parser: function(t, e, n, r, a, s) {
                                        var o, l, u, c, h, f, p = "background-position",
                                            d = i || G(t, null),
                                            m = this.format((d ? g ? d.getPropertyValue(p + "-x") + " " + d.getPropertyValue(p + "-y") : d.getPropertyValue(p) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
                                            v = this.format(e);
                                        if (-1 !== m.indexOf("%") != (-1 !== v.indexOf("%")) && (f = Z(t, "backgroundImage").replace(A, ""), f && "none" !== f)) {
                                            for (o = m.split(" "), l = v.split(" "), B.setAttribute("src", f), u = 2; --u > -1;) m = o[u], c = -1 !== m.indexOf("%"), c !== (-1 !== l[u].indexOf("%")) && (h = 0 === u ? t.offsetWidth - B.width : t.offsetHeight - B.height, o[u] = c ? parseFloat(m) / 100 * h + "px" : parseFloat(m) / h * 100 + "%");
                                            m = o.join(" ")
                                        }
                                        return this.parseComplex(t.style, m, v, a, s)
                                    },
                                    formatter: it
                                }), xt("backgroundSize", {
                                    defaultValue: "0 0",
                                    formatter: it
                                }), xt("perspective", {
                                    defaultValue: "0px",
                                    prefix: !0
                                }), xt("perspectiveOrigin", {
                                    defaultValue: "50% 50%",
                                    prefix: !0
                                }), xt("transformStyle", {
                                    prefix: !0
                                }), xt("backfaceVisibility", {
                                    prefix: !0
                                }), xt("userSelect", {
                                    prefix: !0
                                }), xt("margin", {
                                    parser: pt("marginTop,marginRight,marginBottom,marginLeft")
                                }), xt("padding", {
                                    parser: pt("paddingTop,paddingRight,paddingBottom,paddingLeft")
                                }), xt("clip", {
                                    defaultValue: "rect(0px,0px,0px,0px)",
                                    parser: function(t, e, n, r, a, s) {
                                        var o, l, u;
                                        return 9 > g ? (l = t.currentStyle, u = 8 > g ? " " : ",", o = "rect(" + l.clipTop + u + l.clipRight + u + l.clipBottom + u + l.clipLeft + ")", e = this.format(e).split(",").join(u)) : (o = this.format(Z(t, this.p, i, !1, this.dflt)), e = this.format(e)), this.parseComplex(t.style, o, e, a, s)
                                    }
                                }), xt("textShadow", {
                                    defaultValue: "0px 0px 0px #999",
                                    color: !0,
                                    multi: !0
                                }), xt("autoRound,strictUnits", {
                                    parser: function(t, e, n, r, i) {
                                        return i
                                    }
                                }), xt("border", {
                                    defaultValue: "0px solid #000",
                                    parser: function(t, e, n, r, a, s) {
                                        return this.parseComplex(t.style, this.format(Z(t, "borderTopWidth", i, !1, "0px") + " " + Z(t, "borderTopStyle", i, !1, "solid") + " " + Z(t, "borderTopColor", i, !1, "#000")), this.format(e), a, s)
                                    },
                                    color: !0,
                                    formatter: function(t) {
                                        var e = t.split(" ");
                                        return e[0] + " " + (e[1] || "solid") + " " + (t.match(ht) || ["#000"])[0]
                                    }
                                }), xt("borderWidth", {
                                    parser: pt("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
                                }), xt("float,cssFloat,styleFloat", {
                                    parser: function(t, e, n, r, i, a) {
                                        var s = t.style,
                                            o = "cssFloat" in s ? "cssFloat" : "styleFloat";
                                        return new mt(s, o, 0, 0, i, -1, n, !1, 0, s[o], e)
                                    }
                                });
                                var Bt = function(t) {
                                    var e, n = this.t,
                                        r = n.filter || Z(this.data, "filter") || "",
                                        i = this.s + this.c * t | 0;
                                    100 === i && (-1 === r.indexOf("atrix(") && -1 === r.indexOf("radient(") && -1 === r.indexOf("oader(") ? (n.removeAttribute("filter"), e = !Z(this.data, "filter")) : (n.filter = r.replace(k, ""), e = !0)), e || (this.xn1 && (n.filter = r = r || "alpha(opacity=" + i + ")"), -1 === r.indexOf("pacity") ? 0 === i && this.xn1 || (n.filter = r + " alpha(opacity=" + i + ")") : n.filter = r.replace(w, "opacity=" + i))
                                };
                                xt("opacity,alpha,autoAlpha", {
                                    defaultValue: "1",
                                    parser: function(t, e, n, r, a, s) {
                                        var o = parseFloat(Z(t, "opacity", i, !1, "1")),
                                            l = t.style,
                                            u = "autoAlpha" === n;
                                        return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + o), u && 1 === o && "hidden" === Z(t, "visibility", i) && 0 !== e && (o = 0), H ? a = new mt(l, "opacity", o, e - o, a) : (a = new mt(l, "opacity", 100 * o, 100 * (e - o), a), a.xn1 = u ? 1 : 0, l.zoom = 1, a.type = 2, a.b = "alpha(opacity=" + a.s + ")", a.e = "alpha(opacity=" + (a.s + a.c) + ")", a.data = t, a.plugin = s, a.setRatio = Bt), u && (a = new mt(l, "visibility", 0, 0, a, -1, null, !1, 0, 0 !== o ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit"), a.xs0 = "inherit", r._overwriteProps.push(a.n), r._overwriteProps.push(n)), a
                                    }
                                });
                                var qt = function(t, e) {
                                        e && (t.removeProperty ? (("ms" === e.substr(0, 2) || "webkit" === e.substr(0, 6)) && (e = "-" + e), t.removeProperty(e.replace(S, "-$1").toLowerCase())) : t.removeAttribute(e))
                                    },
                                    Xt = function(t) {
                                        if (this.t._gsClassPT = this, 1 === t || 0 === t) {
                                            this.t.setAttribute("class", 0 === t ? this.b : this.e);
                                            for (var e = this.data, n = this.t.style; e;) e.v ? n[e.p] = e.v : qt(n, e.p), e = e._next;
                                            1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                                        } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
                                    };
                                xt("className", {
                                    parser: function(t, e, r, a, s, o, l) {
                                        var u, c, h, f, p, d = t.getAttribute("class") || "",
                                            m = t.style.cssText;
                                        if (s = a._classNamePT = new mt(t, r, 0, 0, s, 2), s.setRatio = Xt, s.pr = -11, n = !0, s.b = d, c = K(t, i), h = t._gsClassPT) {
                                            for (f = {}, p = h.data; p;) f[p.p] = 1, p = p._next;
                                            h.setRatio(1)
                                        }
                                        return t._gsClassPT = s, s.e = "=" !== e.charAt(1) ? e : d.replace(new RegExp("\\s*\\b" + e.substr(2) + "\\b"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""), t.setAttribute("class", s.e), u = tt(t, c, K(t), l, f), t.setAttribute("class", d), s.data = u.firstMPT, t.style.cssText = m, s = s.xfirst = a.parse(t, u.difs, s, o)
                                    }
                                });
                                var Ht = function(t) {
                                    if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                                        var e, n, r, i, a, s = this.t.style,
                                            o = u.transform.parse;
                                        if ("all" === this.e) s.cssText = "", i = !0;
                                        else
                                            for (e = this.e.split(" ").join("").split(","), r = e.length; --r > -1;) n = e[r], u[n] && (u[n].parse === o ? i = !0 : n = "transformOrigin" === n ? St : u[n].p), qt(s, n);
                                        i && (qt(s, kt), a = this.t._gsTransform, a && (a.svg && this.t.removeAttribute("data-svg-origin"), delete this.t._gsTransform))
                                    }
                                };
                                for (xt("clearProps", {
                                        parser: function(t, e, r, i, a) {
                                            return a = new mt(t, r, 0, 0, a, 2), a.setRatio = Ht, a.e = e, a.pr = -10, a.data = i._tween, n = !0, a
                                        }
                                    }), c = "bezier,throwProps,physicsProps,physics2D".split(","), yt = c.length; yt--;) bt(c[yt]);
                                c = o.prototype, c._firstPT = c._lastParsedTransform = c._transform = null, c._onInitTween = function(t, e, s) {
                                    if (!t.nodeType) return !1;
                                    this._target = t, this._tween = s, this._vars = e, h = e.autoRound, n = !1, r = e.suffixMap || o.suffixMap, i = G(t, ""), a = this._overwriteProps;
                                    var l, c, d, g, v, y, _, x, b, w = t.style;
                                    if (f && "" === w.zIndex && (l = Z(t, "zIndex", i), ("auto" === l || "" === l) && this._addLazySet(w, "zIndex", 0)), "string" == typeof e && (g = w.cssText, l = K(t, i), w.cssText = g + ";" + e, l = tt(t, l, K(t)).difs, !H && T.test(e) && (l.opacity = parseFloat(RegExp.$1)), e = l, w.cssText = g), e.className ? this._firstPT = c = u.className.parse(t, e.className, "className", this, null, null, e) : this._firstPT = c = this.parse(t, e, null), this._transformType) {
                                        for (b = 3 === this._transformType, kt ? p && (f = !0, "" === w.zIndex && (_ = Z(t, "zIndex", i), ("auto" === _ || "" === _) && this._addLazySet(w, "zIndex", 0)), m && this._addLazySet(w, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (b ? "visible" : "hidden"))) : w.zoom = 1, d = c; d && d._next;) d = d._next;
                                        x = new mt(t, "transform", 0, 0, null, 2), this._linkCSSP(x, null, d), x.setRatio = kt ? zt : Lt, x.data = this._transform || It(t, i, !0), x.tween = s, x.pr = -1, a.pop()
                                    }
                                    if (n) {
                                        for (; c;) {
                                            for (y = c._next, d = g; d && d.pr > c.pr;) d = d._next;
                                            (c._prev = d ? d._prev : v) ? c._prev._next = c: g = c, (c._next = d) ? d._prev = c : v = c, c = y
                                        }
                                        this._firstPT = g
                                    }
                                    return !0
                                }, c.parse = function(t, e, n, a) {
                                    var s, o, l, c, f, p, d, m, g, v, y = t.style;
                                    for (s in e) p = e[s], o = u[s], o ? n = o.parse(t, p, s, this, n, a, e) : (f = Z(t, s, i) + "", g = "string" == typeof p, "color" === s || "fill" === s || "stroke" === s || -1 !== s.indexOf("Color") || g && C.test(p) ? (g || (p = ct(p), p = (p.length > 3 ? "rgba(" : "rgb(") + p.join(",") + ")"), n = vt(y, s, f, p, !0, "transparent", n, 0, a)) : !g || -1 === p.indexOf(" ") && -1 === p.indexOf(",") ? (l = parseFloat(f), d = l || 0 === l ? f.substr((l + "").length) : "", ("" === f || "auto" === f) && ("width" === s || "height" === s ? (l = rt(t, s, i), d = "px") : "left" === s || "top" === s ? (l = J(t, s, i), d = "px") : (l = "opacity" !== s ? 0 : 1, d = "")), v = g && "=" === p.charAt(1), v ? (c = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), c *= parseFloat(p), m = p.replace(b, "")) : (c = parseFloat(p), m = g ? p.replace(b, "") : ""), "" === m && (m = s in r ? r[s] : d), p = c || 0 === c ? (v ? c + l : c) + m : e[s], d !== m && "" !== m && (c || 0 === c) && l && (l = Q(t, s, l, d), "%" === m ? (l /= Q(t, s, 100, "%") / 100, e.strictUnits !== !0 && (f = l + "%")) : "em" === m ? l /= Q(t, s, 1, "em") : "px" !== m && (c = Q(t, s, c, m), m = "px"), v && (c || 0 === c) && (p = c + l + m)), v && (c += l), !l && 0 !== l || !c && 0 !== c ? void 0 !== y[s] && (p || p + "" != "NaN" && null != p) ? (n = new mt(y, s, c || l || 0, 0, n, -1, s, !1, 0, f, p), n.xs0 = "none" !== p || "display" !== s && -1 === s.indexOf("Style") ? p : f) : $("invalid " + s + " tween value: " + e[s]) : (n = new mt(y, s, l, c - l, n, 0, s, h !== !1 && ("px" === m || "zIndex" === s), 0, f, p), n.xs0 = m)) : n = vt(y, s, f, p, !0, null, n, 0, a)), a && n && !n.plugin && (n.plugin = a);
                                    return n
                                }, c.setRatio = function(t) {
                                    var e, n, r, i = this._firstPT,
                                        a = 1e-6;
                                    if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                                        if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                                            for (; i;) {
                                                if (e = i.c * t + i.s, i.r ? e = Math.round(e) : a > e && e > -a && (e = 0), i.type)
                                                    if (1 === i.type)
                                                        if (r = i.l, 2 === r) i.t[i.p] = i.xs0 + e + i.xs1 + i.xn1 + i.xs2;
                                                        else if (3 === r) i.t[i.p] = i.xs0 + e + i.xs1 + i.xn1 + i.xs2 + i.xn2 + i.xs3;
                                                else if (4 === r) i.t[i.p] = i.xs0 + e + i.xs1 + i.xn1 + i.xs2 + i.xn2 + i.xs3 + i.xn3 + i.xs4;
                                                else if (5 === r) i.t[i.p] = i.xs0 + e + i.xs1 + i.xn1 + i.xs2 + i.xn2 + i.xs3 + i.xn3 + i.xs4 + i.xn4 + i.xs5;
                                                else {
                                                    for (n = i.xs0 + e + i.xs1, r = 1; r < i.l; r++) n += i["xn" + r] + i["xs" + (r + 1)];
                                                    i.t[i.p] = n
                                                } else -1 === i.type ? i.t[i.p] = i.xs0 : i.setRatio && i.setRatio(t);
                                                else i.t[i.p] = e + i.xs0;
                                                i = i._next
                                            } else
                                                for (; i;) 2 !== i.type ? i.t[i.p] = i.b : i.setRatio(t), i = i._next;
                                        else
                                            for (; i;) {
                                                if (2 !== i.type)
                                                    if (i.r && -1 !== i.type)
                                                        if (e = Math.round(i.s + i.c), i.type) {
                                                            if (1 === i.type) {
                                                                for (r = i.l, n = i.xs0 + e + i.xs1, r = 1; r < i.l; r++) n += i["xn" + r] + i["xs" + (r + 1)];
                                                                i.t[i.p] = n
                                                            }
                                                        } else i.t[i.p] = e + i.xs0;
                                                else i.t[i.p] = i.e;
                                                else i.setRatio(t);
                                                i = i._next
                                            }
                                }, c._enableTransforms = function(t) {
                                    this._transform = this._transform || It(this._target, i, !0), this._transformType = this._transform.svg && wt || !t && 3 !== this._transformType ? 2 : 3
                                };
                                var Vt = function(t) {
                                    this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
                                };
                                c._addLazySet = function(t, e, n) {
                                    var r = this._firstPT = new mt(t, e, 0, 0, this._firstPT, 2);
                                    r.e = n, r.setRatio = Vt, r.data = this
                                }, c._linkCSSP = function(t, e, n, r) {
                                    return t && (e && (e._prev = t), t._next && (t._next._prev = t._prev), t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next, r = !0), n ? n._next = t : r || null !== this._firstPT || (this._firstPT = t), t._next = e, t._prev = n), t
                                }, c._kill = function(e) {
                                    var n, r, i, a = e;
                                    if (e.autoAlpha || e.alpha) {
                                        a = {};
                                        for (r in e) a[r] = e[r];
                                        a.opacity = 1, a.autoAlpha && (a.visibility = 1)
                                    }
                                    return e.className && (n = this._classNamePT) && (i = n.xfirst, i && i._prev ? this._linkCSSP(i._prev, n._next, i._prev._prev) : i === this._firstPT && (this._firstPT = n._next), n._next && this._linkCSSP(n._next, n._next._next, i._prev), this._classNamePT = null), t.prototype._kill.call(this, a)
                                };
                                var $t = function(t, e, n) {
                                    var r, i, a, s;
                                    if (t.slice)
                                        for (i = t.length; --i > -1;) $t(t[i], e, n);
                                    else
                                        for (r = t.childNodes, i = r.length; --i > -1;) a = r[i], s = a.type, a.style && (e.push(K(a)), n && n.push(a)), 1 !== s && 9 !== s && 11 !== s || !a.childNodes.length || $t(a, e, n)
                                };
                                return o.cascadeTo = function(t, n, r) {
                                    var i, a, s, o, l = e.to(t, n, r),
                                        u = [l],
                                        c = [],
                                        h = [],
                                        f = [],
                                        p = e._internals.reservedProps;
                                    for (t = l._targets || l.target, $t(t, c, f), l.render(n, !0, !0), $t(t, h), l.render(0, !0, !0), l._enabled(!0), i = f.length; --i > -1;)
                                        if (a = tt(f[i], c[i], h[i]), a.firstMPT) {
                                            a = a.difs;
                                            for (s in r) p[s] && (a[s] = r[s]);
                                            o = {};
                                            for (s in a) o[s] = c[i][s];
                                            u.push(e.fromTo(f[i], n, o, a))
                                        }
                                    return u
                                }, t.activate([o]), o
                            }, !0),
                            function() {
                                var t = s._gsDefine.plugin({
                                        propName: "roundProps",
                                        priority: -1,
                                        API: 2,
                                        init: function(t, e, n) {
                                            return this._tween = n, !0
                                        }
                                    }),
                                    e = t.prototype;
                                e._onInitAllProps = function() {
                                    for (var t, e, n, r = this._tween, i = r.vars.roundProps instanceof Array ? r.vars.roundProps : r.vars.roundProps.split(","), a = i.length, s = {}, o = r._propLookup.roundProps; --a > -1;) s[i[a]] = 1;
                                    for (a = i.length; --a > -1;)
                                        for (t = i[a], e = r._firstPT; e;) n = e._next, e.pg ? e.t._roundProps(s, !0) : e.n === t && (this._add(e.t, t, e.s, e.c), n && (n._prev = e._prev), e._prev ? e._prev._next = n : r._firstPT === e && (r._firstPT = n), e._next = e._prev = null, r._propLookup[t] = o), e = n;
                                    return !1
                                }, e._add = function(t, e, n, r) {
                                    this._addTween(t, e, n, n + r, e, !0), this._overwriteProps.push(e)
                                }
                            }(),
                            function() {
                                var t = /(?:\d|\-|\+|=|#|\.)*/g,
                                    e = /[A-Za-z%]/g;
                                s._gsDefine.plugin({
                                    propName: "attr",
                                    API: 2,
                                    version: "0.4.0",
                                    init: function(n, r, i) {
                                        var a, s, o, l, u;
                                        if ("function" != typeof n.setAttribute) return !1;
                                        this._target = n, this._proxy = {}, this._start = {}, this._end = {}, this._suffix = {};
                                        for (a in r) this._start[a] = this._proxy[a] = s = n.getAttribute(a) + "", this._end[a] = o = r[a] + "", this._suffix[a] = l = e.test(o) ? o.replace(t, "") : e.test(s) ? s.replace(t, "") : "", l && (u = o.indexOf(l), -1 !== u && (o = o.substr(0, u))), this._addTween(this._proxy, a, parseFloat(s), o, a) || (this._suffix[a] = ""), "=" === o.charAt(1) && (this._end[a] = this._firstPT.s + this._firstPT.c + l), this._overwriteProps.push(a);
                                        return !0
                                    },
                                    set: function(t) {
                                        this._super.setRatio.call(this, t);
                                        for (var e, n = this._overwriteProps, r = n.length, i = 1 === t ? this._end : t ? this._proxy : this._start, a = i === this._proxy; --r > -1;) e = n[r], this._target.setAttribute(e, i[e] + (a ? this._suffix[e] : ""))
                                    }
                                })
                            }(), s._gsDefine.plugin({
                                propName: "directionalRotation",
                                version: "0.2.1",
                                API: 2,
                                init: function(t, e, n) {
                                    "object" != typeof e && (e = {
                                        rotation: e
                                    }), this.finals = {};
                                    var r, i, a, s, o, l, u = e.useRadians === !0 ? 2 * Math.PI : 360,
                                        c = 1e-6;
                                    for (r in e) "useRadians" !== r && (l = (e[r] + "").split("_"), i = l[0], a = parseFloat("function" != typeof t[r] ? t[r] : t[r.indexOf("set") || "function" != typeof t["get" + r.substr(3)] ? r : "get" + r.substr(3)]()), s = this.finals[r] = "string" == typeof i && "=" === i.charAt(1) ? a + parseInt(i.charAt(0) + "1", 10) * Number(i.substr(2)) : Number(i) || 0, o = s - a, l.length && (i = l.join("_"), -1 !== i.indexOf("short") && (o %= u, o !== o % (u / 2) && (o = 0 > o ? o + u : o - u)), -1 !== i.indexOf("_cw") && 0 > o ? o = (o + 9999999999 * u) % u - (o / u | 0) * u : -1 !== i.indexOf("ccw") && o > 0 && (o = (o - 9999999999 * u) % u - (o / u | 0) * u)), (o > c || -c > o) && (this._addTween(t, r, a, a + o, r), this._overwriteProps.push(r)));
                                    return !0
                                },
                                set: function(t) {
                                    var e;
                                    if (1 !== t) this._super.setRatio.call(this, t);
                                    else
                                        for (e = this._firstPT; e;) e.f ? e.t[e.p](this.finals[e.p]) : e.t[e.p] = this.finals[e.p], e = e._next
                                }
                            })._autoCSS = !0, s._gsDefine("easing.Back", ["easing.Ease"], function(t) {
                                var e, n, r, i = s.GreenSockGlobals || s,
                                    a = i.com.greensock,
                                    o = 2 * Math.PI,
                                    l = Math.PI / 2,
                                    u = a._class,
                                    c = function(e, n) {
                                        var r = u("easing." + e, function() {}, !0),
                                            i = r.prototype = new t;
                                        return i.constructor = r, i.getRatio = n, r
                                    },
                                    h = t.register || function() {},
                                    f = function(t, e, n, r, i) {
                                        var a = u("easing." + t, {
                                            easeOut: new e,
                                            easeIn: new n,
                                            easeInOut: new r
                                        }, !0);
                                        return h(a, t), a
                                    },
                                    p = function(t, e, n) {
                                        this.t = t, this.v = e, n && (this.next = n, n.prev = this, this.c = n.v - e, this.gap = n.t - t)
                                    },
                                    d = function(e, n) {
                                        var r = u("easing." + e, function(t) {
                                                this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1
                                            }, !0),
                                            i = r.prototype = new t;
                                        return i.constructor = r, i.getRatio = n, i.config = function(t) {
                                            return new r(t)
                                        }, r
                                    },
                                    m = f("Back", d("BackOut", function(t) {
                                        return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
                                    }), d("BackIn", function(t) {
                                        return t * t * ((this._p1 + 1) * t - this._p1)
                                    }), d("BackInOut", function(t) {
                                        return (t *= 2) < 1 ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
                                    })),
                                    g = u("easing.SlowMo", function(t, e, n) {
                                        e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = n === !0
                                    }, !0),
                                    v = g.prototype = new t;
                                return v.constructor = g, v.getRatio = function(t) {
                                    var e = t + (.5 - t) * this._p;
                                    return t < this._p1 ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
                                }, g.ease = new g(.7, .7), v.config = g.config = function(t, e, n) {
                                    return new g(t, e, n)
                                }, e = u("easing.SteppedEase", function(t) {
                                    t = t || 1, this._p1 = 1 / t, this._p2 = t + 1
                                }, !0), v = e.prototype = new t, v.constructor = e, v.getRatio = function(t) {
                                    return 0 > t ? t = 0 : t >= 1 && (t = .999999999), (this._p2 * t >> 0) * this._p1
                                }, v.config = e.config = function(t) {
                                    return new e(t)
                                }, n = u("easing.RoughEase", function(e) {
                                    e = e || {};
                                    for (var n, r, i, a, s, o, l = e.taper || "none", u = [], c = 0, h = 0 | (e.points || 20), f = h, d = e.randomize !== !1, m = e.clamp === !0, g = e.template instanceof t ? e.template : null, v = "number" == typeof e.strength ? .4 * e.strength : .4; --f > -1;) n = d ? Math.random() : 1 / h * f, r = g ? g.getRatio(n) : n, "none" === l ? i = v : "out" === l ? (a = 1 - n, i = a * a * v) : "in" === l ? i = n * n * v : .5 > n ? (a = 2 * n, i = a * a * .5 * v) : (a = 2 * (1 - n), i = a * a * .5 * v), d ? r += Math.random() * i - .5 * i : f % 2 ? r += .5 * i : r -= .5 * i, m && (r > 1 ? r = 1 : 0 > r && (r = 0)), u[c++] = {
                                        x: n,
                                        y: r
                                    };
                                    for (u.sort(function(t, e) {
                                            return t.x - e.x
                                        }), o = new p(1, 1, null), f = h; --f > -1;) s = u[f], o = new p(s.x, s.y, o);
                                    this._prev = new p(0, 0, 0 !== o.t ? o : o.next)
                                }, !0), v = n.prototype = new t, v.constructor = n, v.getRatio = function(t) {
                                    var e = this._prev;
                                    if (t > e.t) {
                                        for (; e.next && t >= e.t;) e = e.next;
                                        e = e.prev
                                    } else
                                        for (; e.prev && t <= e.t;) e = e.prev;
                                    return this._prev = e, e.v + (t - e.t) / e.gap * e.c
                                }, v.config = function(t) {
                                    return new n(t)
                                }, n.ease = new n, f("Bounce", c("BounceOut", function(t) {
                                    return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                                }), c("BounceIn", function(t) {
                                    return (t = 1 - t) < 1 / 2.75 ? 1 - 7.5625 * t * t : 2 / 2.75 > t ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
                                }), c("BounceInOut", function(t) {
                                    var e = .5 > t;
                                    return t = e ? 1 - 2 * t : 2 * t - 1, t = 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5
                                })), f("Circ", c("CircOut", function(t) {
                                    return Math.sqrt(1 - (t -= 1) * t)
                                }), c("CircIn", function(t) {
                                    return -(Math.sqrt(1 - t * t) - 1)
                                }), c("CircInOut", function(t) {
                                    return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
                                })), r = function(e, n, r) {
                                    var i = u("easing." + e, function(t, e) {
                                            this._p1 = t >= 1 ? t : 1, this._p2 = (e || r) / (1 > t ? t : 1), this._p3 = this._p2 / o * (Math.asin(1 / this._p1) || 0), this._p2 = o / this._p2
                                        }, !0),
                                        a = i.prototype = new t;
                                    return a.constructor = i, a.getRatio = n, a.config = function(t, e) {
                                        return new i(t, e)
                                    }, i
                                }, f("Elastic", r("ElasticOut", function(t) {
                                    return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * this._p2) + 1
                                }, .3), r("ElasticIn", function(t) {
                                    return -(this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2))
                                }, .3), r("ElasticInOut", function(t) {
                                    return (t *= 2) < 1 ? -.5 * (this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) * .5 + 1
                                }, .45)), f("Expo", c("ExpoOut", function(t) {
                                    return 1 - Math.pow(2, -10 * t)
                                }), c("ExpoIn", function(t) {
                                    return Math.pow(2, 10 * (t - 1)) - .001
                                }), c("ExpoInOut", function(t) {
                                    return (t *= 2) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
                                })), f("Sine", c("SineOut", function(t) {
                                    return Math.sin(t * l)
                                }), c("SineIn", function(t) {
                                    return -Math.cos(t * l) + 1
                                }), c("SineInOut", function(t) {
                                    return -.5 * (Math.cos(Math.PI * t) - 1)
                                })), u("easing.EaseLookup", {
                                    find: function(e) {
                                        return t.map[e]
                                    }
                                }, !0), h(i.SlowMo, "SlowMo", "ease,"), h(n, "RoughEase", "ease,"), h(e, "SteppedEase", "ease,"), m
                            }, !0)
                    }), s._gsDefine && s._gsQueue.pop()(),
                    function(t, n) {
                        "use strict";
                        var r = t.GreenSockGlobals = t.GreenSockGlobals || t;
                        if (!r.TweenLite) {
                            var a, s, o, l, u, c = function(t) {
                                    var e, n = t.split("."),
                                        i = r;
                                    for (e = 0; e < n.length; e++) i[n[e]] = i = i[n[e]] || {};
                                    return i
                                },
                                h = c("com.greensock"),
                                f = 1e-10,
                                p = function(t) {
                                    var e, n = [],
                                        r = t.length;
                                    for (e = 0; e !== r; n.push(t[e++]));
                                    return n
                                },
                                d = function() {},
                                m = function() {
                                    var t = Object.prototype.toString,
                                        e = t.call([]);
                                    return function(n) {
                                        return null != n && (n instanceof Array || "object" == typeof n && !!n.push && t.call(n) === e)
                                    }
                                }(),
                                g = {},
                                v = function(a, s, o, l) {
                                    this.sc = g[a] ? g[a].sc : [], g[a] = this, this.gsClass = null, this.func = o;
                                    var u = [];
                                    this.check = function(h) {
                                        for (var f, p, d, m, y = s.length, _ = y; --y > -1;)(f = g[s[y]] || new v(s[y], [])).gsClass ? (u[y] = f.gsClass, _--) : h && f.sc.push(this);
                                        if (0 === _ && o)
                                            for (p = ("com.greensock." + a).split("."), d = p.pop(), m = c(p.join("."))[d] = this.gsClass = o.apply(o, u), l && (r[d] = m, "function" == typeof i && i.amd ? i((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + a.split(".").pop(), [], function() {
                                                    return m
                                                }) : a === n && "undefined" != typeof e && e.exports && (e.exports = m)), y = 0; y < this.sc.length; y++) this.sc[y].check()
                                    }, this.check(!0)
                                },
                                y = t._gsDefine = function(t, e, n, r) {
                                    return new v(t, e, n, r)
                                },
                                _ = h._class = function(t, e, n) {
                                    return e = e || function() {}, y(t, [], function() {
                                        return e
                                    }, n), e
                                };
                            y.globals = r;
                            var x = [0, 0, 1, 1],
                                b = [],
                                w = _("easing.Ease", function(t, e, n, r) {
                                    this._func = t, this._type = n || 0, this._power = r || 0, this._params = e ? x.concat(e) : x
                                }, !0),
                                T = w.map = {},
                                k = w.register = function(t, e, n, r) {
                                    for (var i, a, s, o, l = e.split(","), u = l.length, c = (n || "easeIn,easeOut,easeInOut").split(","); --u > -1;)
                                        for (a = l[u], i = r ? _("easing." + a, null, !0) : h.easing[a] || {}, s = c.length; --s > -1;) o = c[s], T[a + "." + o] = T[o + a] = i[o] = t.getRatio ? t : t[o] || new t
                                };
                            for (o = w.prototype, o._calcEnd = !1, o.getRatio = function(t) {
                                    if (this._func) return this._params[0] = t, this._func.apply(null, this._params);
                                    var e = this._type,
                                        n = this._power,
                                        r = 1 === e ? 1 - t : 2 === e ? t : .5 > t ? 2 * t : 2 * (1 - t);
                                    return 1 === n ? r *= r : 2 === n ? r *= r * r : 3 === n ? r *= r * r * r : 4 === n && (r *= r * r * r * r), 1 === e ? 1 - r : 2 === e ? r : .5 > t ? r / 2 : 1 - r / 2
                                }, a = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], s = a.length; --s > -1;) o = a[s] + ",Power" + s, k(new w(null, null, 1, s), o, "easeOut", !0), k(new w(null, null, 2, s), o, "easeIn" + (0 === s ? ",easeNone" : "")), k(new w(null, null, 3, s), o, "easeInOut");
                            T.linear = h.easing.Linear.easeIn, T.swing = h.easing.Quad.easeInOut;
                            var C = _("events.EventDispatcher", function(t) {
                                this._listeners = {}, this._eventTarget = t || this
                            });
                            o = C.prototype, o.addEventListener = function(t, e, n, r, i) {
                                i = i || 0;
                                var a, s, o = this._listeners[t],
                                    c = 0;
                                for (null == o && (this._listeners[t] = o = []), s = o.length; --s > -1;) a = o[s], a.c === e && a.s === n ? o.splice(s, 1) : 0 === c && a.pr < i && (c = s + 1);
                                o.splice(c, 0, {
                                    c: e,
                                    s: n,
                                    up: r,
                                    pr: i
                                }), this !== l || u || l.wake()
                            }, o.removeEventListener = function(t, e) {
                                var n, r = this._listeners[t];
                                if (r)
                                    for (n = r.length; --n > -1;)
                                        if (r[n].c === e) return void r.splice(n, 1)
                            }, o.dispatchEvent = function(t) {
                                var e, n, r, i = this._listeners[t];
                                if (i)
                                    for (e = i.length, n = this._eventTarget; --e > -1;) r = i[e], r && (r.up ? r.c.call(r.s || n, {
                                        type: t,
                                        target: n
                                    }) : r.c.call(r.s || n))
                            };
                            var S = t.requestAnimationFrame,
                                P = t.cancelAnimationFrame,
                                A = Date.now || function() {
                                    return (new Date).getTime()
                                },
                                O = A();
                            for (a = ["ms", "moz", "webkit", "o"], s = a.length; --s > -1 && !S;) S = t[a[s] + "RequestAnimationFrame"], P = t[a[s] + "CancelAnimationFrame"] || t[a[s] + "CancelRequestAnimationFrame"];
                            _("Ticker", function(t, e) {
                                var n, r, i, a, s, o = this,
                                    c = A(),
                                    h = e !== !1 && S,
                                    p = 500,
                                    m = 33,
                                    g = "tick",
                                    v = function(t) {
                                        var e, l, u = A() - O;
                                        u > p && (c += u - m), O += u, o.time = (O - c) / 1e3, e = o.time - s, (!n || e > 0 || t === !0) && (o.frame++, s += e + (e >= a ? .004 : a - e), l = !0), t !== !0 && (i = r(v)), l && o.dispatchEvent(g)
                                    };
                                C.call(o), o.time = o.frame = 0, o.tick = function() {
                                    v(!0)
                                }, o.lagSmoothing = function(t, e) {
                                    p = t || 1 / f, m = Math.min(e, p, 0)
                                }, o.sleep = function() {
                                    null != i && (h && P ? P(i) : clearTimeout(i), r = d, i = null, o === l && (u = !1))
                                }, o.wake = function() {
                                    null !== i ? o.sleep() : o.frame > 10 && (O = A() - p + 5), r = 0 === n ? d : h && S ? S : function(t) {
                                        return setTimeout(t, 1e3 * (s - o.time) + 1 | 0)
                                    }, o === l && (u = !0), v(2)
                                }, o.fps = function(t) {
                                    return arguments.length ? (n = t, a = 1 / (n || 60), s = this.time + a, void o.wake()) : n
                                }, o.useRAF = function(t) {
                                    return arguments.length ? (o.sleep(), h = t, void o.fps(n)) : h
                                }, o.fps(t), setTimeout(function() {
                                    h && o.frame < 5 && o.useRAF(!1)
                                }, 1500)
                            }), o = h.Ticker.prototype = new h.events.EventDispatcher, o.constructor = h.Ticker;
                            var j = _("core.Animation", function(t, e) {
                                if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = e.immediateRender === !0, this.data = e.data, this._reversed = e.reversed === !0, $) {
                                    u || l.wake();
                                    var n = this.vars.useFrames ? V : $;
                                    n.add(this, n._time), this.vars.paused && this.paused(!0)
                                }
                            });
                            l = j.ticker = new h.Ticker, o = j.prototype, o._dirty = o._gc = o._initted = o._paused = !1, o._totalTime = o._time = 0, o._rawPrevTime = -1, o._next = o._last = o._onUpdate = o._timeline = o.timeline = null, o._paused = !1;
                            var M = function() {
                                u && A() - O > 2e3 && l.wake(), setTimeout(M, 2e3)
                            };
                            M(), o.play = function(t, e) {
                                return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
                            }, o.pause = function(t, e) {
                                return null != t && this.seek(t, e), this.paused(!0)
                            }, o.resume = function(t, e) {
                                return null != t && this.seek(t, e), this.paused(!1)
                            }, o.seek = function(t, e) {
                                return this.totalTime(Number(t), e !== !1)
                            }, o.restart = function(t, e) {
                                return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, e !== !1, !0)
                            }, o.reverse = function(t, e) {
                                return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
                            }, o.render = function(t, e, n) {}, o.invalidate = function() {
                                return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
                            }, o.isActive = function() {
                                var t, e = this._timeline,
                                    n = this._startTime;
                                return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime()) >= n && t < n + this.totalDuration() / this._timeScale
                            }, o._enabled = function(t, e) {
                                return u || l.wake(), this._gc = !t, this._active = this.isActive(), e !== !0 && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
                            }, o._kill = function(t, e) {
                                return this._enabled(!1, !1)
                            }, o.kill = function(t, e) {
                                return this._kill(t, e), this
                            }, o._uncache = function(t) {
                                for (var e = t ? this : this.timeline; e;) e._dirty = !0, e = e.timeline;
                                return this
                            }, o._swapSelfInParams = function(t) {
                                for (var e = t.length, n = t.concat(); --e > -1;) "{self}" === t[e] && (n[e] = this);
                                return n
                            }, o._callback = function(t) {
                                var e = this.vars;
                                e[t].apply(e[t + "Scope"] || e.callbackScope || this, e[t + "Params"] || b)
                            }, o.eventCallback = function(t, e, n, r) {
                                if ("on" === (t || "").substr(0, 2)) {
                                    var i = this.vars;
                                    if (1 === arguments.length) return i[t];
                                    null == e ? delete i[t] : (i[t] = e, i[t + "Params"] = m(n) && -1 !== n.join("").indexOf("{self}") ? this._swapSelfInParams(n) : n, i[t + "Scope"] = r), "onUpdate" === t && (this._onUpdate = e)
                                }
                                return this
                            }, o.delay = function(t) {
                                return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay
                            }, o.duration = function(t) {
                                return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration)
                            }, o.totalDuration = function(t) {
                                return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration
                            }, o.time = function(t, e) {
                                return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
                            }, o.totalTime = function(t, e, n) {
                                if (u || l.wake(), !arguments.length) return this._totalTime;
                                if (this._timeline) {
                                    if (0 > t && !n && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
                                        this._dirty && this.totalDuration();
                                        var r = this._totalDuration,
                                            i = this._timeline;
                                        if (t > r && !n && (t = r), this._startTime = (this._paused ? this._pauseTime : i._time) - (this._reversed ? r - t : t) / this._timeScale, i._dirty || this._uncache(!1), i._timeline)
                                            for (; i._timeline;) i._timeline._time !== (i._startTime + i._totalTime) / i._timeScale && i.totalTime(i._totalTime, !0), i = i._timeline
                                    }
                                    this._gc && this._enabled(!0, !1), (this._totalTime !== t || 0 === this._duration) && (this.render(t, e, !1), F.length && Y())
                                }
                                return this
                            }, o.progress = o.totalProgress = function(t, e) {
                                return arguments.length ? this.totalTime(this.duration() * t, e) : this._time / this.duration()
                            }, o.startTime = function(t) {
                                return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime
                            }, o.endTime = function(t) {
                                return this._startTime + (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
                            }, o.timeScale = function(t) {
                                if (!arguments.length) return this._timeScale;
                                if (t = t || f, this._timeline && this._timeline.smoothChildTiming) {
                                    var e = this._pauseTime,
                                        n = e || 0 === e ? e : this._timeline.totalTime();
                                    this._startTime = n - (n - this._startTime) * this._timeScale / t
                                }
                                return this._timeScale = t, this._uncache(!1)
                            }, o.reversed = function(t) {
                                return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
                            }, o.paused = function(t) {
                                if (!arguments.length) return this._paused;
                                var e, n, r = this._timeline;
                                return t != this._paused && r && (u || t || l.wake(), e = r.rawTime(), n = e - this._pauseTime, !t && r.smoothChildTiming && (this._startTime += n, this._uncache(!1)), this._pauseTime = t ? e : null, this._paused = t, this._active = this.isActive(), !t && 0 !== n && this._initted && this.duration() && this.render(r.smoothChildTiming ? this._totalTime : (e - this._startTime) / this._timeScale, !0, !0)), this._gc && !t && this._enabled(!0, !1), this
                            };
                            var N = _("core.SimpleTimeline", function(t) {
                                j.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0
                            });
                            o = N.prototype = new j, o.constructor = N, o.kill()._gc = !1, o._first = o._last = o._recent = null, o._sortChildren = !1, o.add = o.insert = function(t, e, n, r) {
                                var i, a;
                                if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), i = this._last, this._sortChildren)
                                    for (a = t._startTime; i && i._startTime > a;) i = i._prev;
                                return i ? (t._next = i._next, i._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = i, this._recent = t, this._timeline && this._uncache(!0), this
                            }, o._remove = function(t, e) {
                                return t.timeline === this && (e || t._enabled(!1, !0), t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), t._next = t._prev = t.timeline = null, t === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
                            }, o.render = function(t, e, n) {
                                var r, i = this._first;
                                for (this._totalTime = this._time = this._rawPrevTime = t; i;) r = i._next, (i._active || t >= i._startTime && !i._paused) && (i._reversed ? i.render((i._dirty ? i.totalDuration() : i._totalDuration) - (t - i._startTime) * i._timeScale, e, n) : i.render((t - i._startTime) * i._timeScale, e, n)), i = r
                            }, o.rawTime = function() {
                                return u || l.wake(), this._totalTime
                            };
                            var R = _("TweenLite", function(e, n, r) {
                                    if (j.call(this, n, r), this.render = R.prototype.render, null == e) throw "Cannot tween a null target.";
                                    this.target = e = "string" != typeof e ? e : R.selector(e) || e;
                                    var i, a, s, o = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType),
                                        l = this.vars.overwrite;
                                    if (this._overwrite = l = null == l ? H[R.defaultOverwrite] : "number" == typeof l ? l >> 0 : H[l], (o || e instanceof Array || e.push && m(e)) && "number" != typeof e[0])
                                        for (this._targets = s = p(e), this._propLookup = [], this._siblings = [], i = 0; i < s.length; i++) a = s[i], a ? "string" != typeof a ? a.length && a !== t && a[0] && (a[0] === t || a[0].nodeType && a[0].style && !a.nodeType) ? (s.splice(i--, 1), this._targets = s = s.concat(p(a))) : (this._siblings[i] = W(a, this, !1), 1 === l && this._siblings[i].length > 1 && Z(a, this, null, 1, this._siblings[i])) : (a = s[i--] = R.selector(a), "string" == typeof a && s.splice(i + 1, 1)) : s.splice(i--, 1);
                                    else this._propLookup = {}, this._siblings = W(e, this, !1), 1 === l && this._siblings.length > 1 && Z(e, this, null, 1, this._siblings);
                                    (this.vars.immediateRender || 0 === n && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -f, this.render(-this._delay))
                                }, !0),
                                D = function(e) {
                                    return e && e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
                                },
                                E = function(t, e) {
                                    var n, r = {};
                                    for (n in t) X[n] || n in e && "transform" !== n && "x" !== n && "y" !== n && "width" !== n && "height" !== n && "className" !== n && "border" !== n || !(!z[n] || z[n] && z[n]._autoCSS) || (r[n] = t[n], delete t[n]);
                                    t.css = r
                                };
                            o = R.prototype = new j, o.constructor = R, o.kill()._gc = !1, o.ratio = 0, o._firstPT = o._targets = o._overwrittenProps = o._startAt = null, o._notifyPluginsOfEnabled = o._lazy = !1, R.version = "1.17.0", R.defaultEase = o._ease = new w(null, null, 1, 1), R.defaultOverwrite = "auto", R.ticker = l, R.autoSleep = 120, R.lagSmoothing = function(t, e) {
                                l.lagSmoothing(t, e)
                            }, R.selector = t.$ || t.jQuery || function(e) {
                                var n = t.$ || t.jQuery;
                                return n ? (R.selector = n, n(e)) : "undefined" == typeof document ? e : document.querySelectorAll ? document.querySelectorAll(e) : document.getElementById("#" === e.charAt(0) ? e.substr(1) : e)
                            };
                            var F = [],
                                I = {},
                                L = R._internals = {
                                    isArray: m,
                                    isSelector: D,
                                    lazyTweens: F
                                },
                                z = R._plugins = {},
                                B = L.tweenLookup = {},
                                q = 0,
                                X = L.reservedProps = {
                                    ease: 1,
                                    delay: 1,
                                    overwrite: 1,
                                    onComplete: 1,
                                    onCompleteParams: 1,
                                    onCompleteScope: 1,
                                    useFrames: 1,
                                    runBackwards: 1,
                                    startAt: 1,
                                    onUpdate: 1,
                                    onUpdateParams: 1,
                                    onUpdateScope: 1,
                                    onStart: 1,
                                    onStartParams: 1,
                                    onStartScope: 1,
                                    onReverseComplete: 1,
                                    onReverseCompleteParams: 1,
                                    onReverseCompleteScope: 1,
                                    onRepeat: 1,
                                    onRepeatParams: 1,
                                    onRepeatScope: 1,
                                    easeParams: 1,
                                    yoyo: 1,
                                    immediateRender: 1,
                                    repeat: 1,
                                    repeatDelay: 1,
                                    data: 1,
                                    paused: 1,
                                    reversed: 1,
                                    autoCSS: 1,
                                    lazy: 1,
                                    onOverwrite: 1,
                                    callbackScope: 1
                                },
                                H = {
                                    none: 0,
                                    all: 1,
                                    auto: 2,
                                    concurrent: 3,
                                    allOnStart: 4,
                                    preexisting: 5,
                                    "true": 1,
                                    "false": 0
                                },
                                V = j._rootFramesTimeline = new N,
                                $ = j._rootTimeline = new N,
                                U = 30,
                                Y = L.lazyRender = function() {
                                    var t, e = F.length;
                                    for (I = {}; --e > -1;) t = F[e], t && t._lazy !== !1 && (t.render(t._lazy[0], t._lazy[1], !0), t._lazy = !1);
                                    F.length = 0
                                };
                            $._startTime = l.time, V._startTime = l.frame, $._active = V._active = !0, setTimeout(Y, 1), j._updateRoot = R.render = function() {
                                var t, e, n;
                                if (F.length && Y(), $.render((l.time - $._startTime) * $._timeScale, !1, !1), V.render((l.frame - V._startTime) * V._timeScale, !1, !1), F.length && Y(), l.frame >= U) {
                                    U = l.frame + (parseInt(R.autoSleep, 10) || 120);
                                    for (n in B) {
                                        for (e = B[n].tweens, t = e.length; --t > -1;) e[t]._gc && e.splice(t, 1);
                                        0 === e.length && delete B[n]
                                    }
                                    if (n = $._first, (!n || n._paused) && R.autoSleep && !V._first && 1 === l._listeners.tick.length) {
                                        for (; n && n._paused;) n = n._next;
                                        n || l.sleep()
                                    }
                                }
                            }, l.addEventListener("tick", j._updateRoot);
                            var W = function(t, e, n) {
                                    var r, i, a = t._gsTweenID;
                                    if (B[a || (t._gsTweenID = a = "t" + q++)] || (B[a] = {
                                            target: t,
                                            tweens: []
                                        }), e && (r = B[a].tweens, r[i = r.length] = e, n))
                                        for (; --i > -1;) r[i] === e && r.splice(i, 1);
                                    return B[a].tweens
                                },
                                G = function(t, e, n, r) {
                                    var i, a, s = t.vars.onOverwrite;
                                    return s && (i = s(t, e, n, r)), s = R.onOverwrite, s && (a = s(t, e, n, r)), i !== !1 && a !== !1
                                },
                                Z = function(t, e, n, r, i) {
                                    var a, s, o, l;
                                    if (1 === r || r >= 4) {
                                        for (l = i.length, a = 0; l > a; a++)
                                            if ((o = i[a]) !== e) o._gc || o._kill(null, t, e) && (s = !0);
                                            else if (5 === r) break;
                                        return s
                                    }
                                    var u, c = e._startTime + f,
                                        h = [],
                                        p = 0,
                                        d = 0 === e._duration;
                                    for (a = i.length; --a > -1;)(o = i[a]) === e || o._gc || o._paused || (o._timeline !== e._timeline ? (u = u || Q(e, 0, d), 0 === Q(o, u, d) && (h[p++] = o)) : o._startTime <= c && o._startTime + o.totalDuration() / o._timeScale > c && ((d || !o._initted) && c - o._startTime <= 2e-10 || (h[p++] = o)));
                                    for (a = p; --a > -1;)
                                        if (o = h[a], 2 === r && o._kill(n, t, e) && (s = !0), 2 !== r || !o._firstPT && o._initted) {
                                            if (2 !== r && !G(o, e)) continue;
                                            o._enabled(!1, !1) && (s = !0)
                                        }
                                    return s
                                },
                                Q = function(t, e, n) {
                                    for (var r = t._timeline, i = r._timeScale, a = t._startTime; r._timeline;) {
                                        if (a += r._startTime, i *= r._timeScale, r._paused) return -100;
                                        r = r._timeline
                                    }
                                    return a /= i, a > e ? a - e : n && a === e || !t._initted && 2 * f > a - e ? f : (a += t.totalDuration() / t._timeScale / i) > e + f ? 0 : a - e - f
                                };
                            o._init = function() {
                                var t, e, n, r, i, a = this.vars,
                                    s = this._overwrittenProps,
                                    o = this._duration,
                                    l = !!a.immediateRender,
                                    u = a.ease;
                                if (a.startAt) {
                                    this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), i = {};
                                    for (r in a.startAt) i[r] = a.startAt[r];
                                    if (i.overwrite = !1, i.immediateRender = !0, i.lazy = l && a.lazy !== !1, i.startAt = i.delay = null, this._startAt = R.to(this.target, 0, i), l)
                                        if (this._time > 0) this._startAt = null;
                                        else if (0 !== o) return
                                } else if (a.runBackwards && 0 !== o)
                                    if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
                                    else {
                                        0 !== this._time && (l = !1), n = {};
                                        for (r in a) X[r] && "autoCSS" !== r || (n[r] = a[r]);
                                        if (n.overwrite = 0, n.data = "isFromStart", n.lazy = l && a.lazy !== !1, n.immediateRender = l, this._startAt = R.to(this.target, 0, n), l) {
                                            if (0 === this._time) return
                                        } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
                                    }
                                if (this._ease = u = u ? u instanceof w ? u : "function" == typeof u ? new w(u, a.easeParams) : T[u] || R.defaultEase : R.defaultEase, a.easeParams instanceof Array && u.config && (this._ease = u.config.apply(u, a.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                                    for (t = this._targets.length; --t > -1;) this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], s ? s[t] : null) && (e = !0);
                                else e = this._initProps(this.target, this._propLookup, this._siblings, s);
                                if (e && R._onPluginEvent("_onInitAllProps", this), s && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), a.runBackwards)
                                    for (n = this._firstPT; n;) n.s += n.c, n.c = -n.c, n = n._next;
                                this._onUpdate = a.onUpdate, this._initted = !0
                            }, o._initProps = function(e, n, r, i) {
                                var a, s, o, l, u, c;
                                if (null == e) return !1;
                                I[e._gsTweenID] && Y(), this.vars.css || e.style && e !== t && e.nodeType && z.css && this.vars.autoCSS !== !1 && E(this.vars, e);
                                for (a in this.vars) {
                                    if (c = this.vars[a], X[a]) c && (c instanceof Array || c.push && m(c)) && -1 !== c.join("").indexOf("{self}") && (this.vars[a] = c = this._swapSelfInParams(c, this));
                                    else if (z[a] && (l = new z[a])._onInitTween(e, this.vars[a], this)) {
                                        for (this._firstPT = u = {
                                                _next: this._firstPT,
                                                t: l,
                                                p: "setRatio",
                                                s: 0,
                                                c: 1,
                                                f: !0,
                                                n: a,
                                                pg: !0,
                                                pr: l._priority
                                            }, s = l._overwriteProps.length; --s > -1;) n[l._overwriteProps[s]] = this._firstPT;
                                        (l._priority || l._onInitAllProps) && (o = !0), (l._onDisable || l._onEnable) && (this._notifyPluginsOfEnabled = !0)
                                    } else this._firstPT = n[a] = u = {
                                        _next: this._firstPT,
                                        t: e,
                                        p: a,
                                        f: "function" == typeof e[a],
                                        n: a,
                                        pg: !1,
                                        pr: 0
                                    }, u.s = u.f ? e[a.indexOf("set") || "function" != typeof e["get" + a.substr(3)] ? a : "get" + a.substr(3)]() : parseFloat(e[a]), u.c = "string" == typeof c && "=" === c.charAt(1) ? parseInt(c.charAt(0) + "1", 10) * Number(c.substr(2)) : Number(c) - u.s || 0;
                                    u && u._next && (u._next._prev = u)
                                }
                                return i && this._kill(i, e) ? this._initProps(e, n, r, i) : this._overwrite > 1 && this._firstPT && r.length > 1 && Z(e, this, n, this._overwrite, r) ? (this._kill(n, e), this._initProps(e, n, r, i)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (I[e._gsTweenID] = !0), o)
                            }, o.render = function(t, e, n) {
                                var r, i, a, s, o = this._time,
                                    l = this._duration,
                                    u = this._rawPrevTime;
                                if (t >= l) this._totalTime = this._time = l, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (r = !0, i = "onComplete", n = n || this._timeline.autoRemoveChildren), 0 === l && (this._initted || !this.vars.lazy || n) && (this._startTime === this._timeline._duration && (t = 0), (0 === t || 0 > u || u === f && "isPause" !== this.data) && u !== t && (n = !0, u > f && (i = "onReverseComplete")), this._rawPrevTime = s = !e || t || u === t ? t : f);
                                else if (1e-7 > t) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== o || 0 === l && u > 0) && (i = "onReverseComplete", r = this._reversed), 0 > t && (this._active = !1, 0 === l && (this._initted || !this.vars.lazy || n) && (u >= 0 && (u !== f || "isPause" !== this.data) && (n = !0), this._rawPrevTime = s = !e || t || u === t ? t : f)), this._initted || (n = !0);
                                else if (this._totalTime = this._time = t, this._easeType) {
                                    var c = t / l,
                                        h = this._easeType,
                                        p = this._easePower;
                                    (1 === h || 3 === h && c >= .5) && (c = 1 - c), 3 === h && (c *= 2), 1 === p ? c *= c : 2 === p ? c *= c * c : 3 === p ? c *= c * c * c : 4 === p && (c *= c * c * c * c), 1 === h ? this.ratio = 1 - c : 2 === h ? this.ratio = c : .5 > t / l ? this.ratio = c / 2 : this.ratio = 1 - c / 2
                                } else this.ratio = this._ease.getRatio(t / l);
                                if (this._time !== o || n) {
                                    if (!this._initted) {
                                        if (this._init(), !this._initted || this._gc) return;
                                        if (!n && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = o, this._rawPrevTime = u, F.push(this), void(this._lazy = [t, e]);
                                        this._time && !r ? this.ratio = this._ease.getRatio(this._time / l) : r && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                                    }
                                    for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== o && t >= 0 && (this._active = !0), 0 === o && (this._startAt && (t >= 0 ? this._startAt.render(t, e, n) : i || (i = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === l) && (e || this._callback("onStart"))), a = this._firstPT; a;) a.f ? a.t[a.p](a.c * this.ratio + a.s) : a.t[a.p] = a.c * this.ratio + a.s, a = a._next;
                                    this._onUpdate && (0 > t && this._startAt && t !== -1e-4 && this._startAt.render(t, e, n), e || (this._time !== o || r) && this._callback("onUpdate")), i && (!this._gc || n) && (0 > t && this._startAt && !this._onUpdate && t !== -1e-4 && this._startAt.render(t, e, n), r && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[i] && this._callback(i), 0 === l && this._rawPrevTime === f && s !== f && (this._rawPrevTime = 0))
                                }
                            }, o._kill = function(t, e, n) {
                                if ("all" === t && (t = null), null == t && (null == e || e === this.target)) return this._lazy = !1, this._enabled(!1, !1);
                                e = "string" != typeof e ? e || this._targets || this.target : R.selector(e) || e;
                                var r, i, a, s, o, l, u, c, h, f = n && this._time && n._startTime === this._startTime && this._timeline === n._timeline;
                                if ((m(e) || D(e)) && "number" != typeof e[0])
                                    for (r = e.length; --r > -1;) this._kill(t, e[r], n) && (l = !0);
                                else {
                                    if (this._targets) {
                                        for (r = this._targets.length; --r > -1;)
                                            if (e === this._targets[r]) {
                                                o = this._propLookup[r] || {}, this._overwrittenProps = this._overwrittenProps || [], i = this._overwrittenProps[r] = t ? this._overwrittenProps[r] || {} : "all";
                                                break
                                            }
                                    } else {
                                        if (e !== this.target) return !1;
                                        o = this._propLookup, i = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
                                    }
                                    if (o) {
                                        if (u = t || o, c = t !== i && "all" !== i && t !== o && ("object" != typeof t || !t._tempKill), n && (R.onOverwrite || this.vars.onOverwrite)) {
                                            for (a in u) o[a] && (h || (h = []), h.push(a));
                                            if ((h || !t) && !G(this, n, e, h)) return !1
                                        }
                                        for (a in u)(s = o[a]) && (f && (s.f ? s.t[s.p](s.s) : s.t[s.p] = s.s, l = !0), s.pg && s.t._kill(u) && (l = !0), s.pg && 0 !== s.t._overwriteProps.length || (s._prev ? s._prev._next = s._next : s === this._firstPT && (this._firstPT = s._next), s._next && (s._next._prev = s._prev), s._next = s._prev = null), delete o[a]), c && (i[a] = 1);
                                        !this._firstPT && this._initted && this._enabled(!1, !1)
                                    }
                                }
                                return l
                            }, o.invalidate = function() {
                                return this._notifyPluginsOfEnabled && R._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], j.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -f, this.render(-this._delay)), this
                            }, o._enabled = function(t, e) {
                                if (u || l.wake(), t && this._gc) {
                                    var n, r = this._targets;
                                    if (r)
                                        for (n = r.length; --n > -1;) this._siblings[n] = W(r[n], this, !0);
                                    else this._siblings = W(this.target, this, !0)
                                }
                                return j.prototype._enabled.call(this, t, e), this._notifyPluginsOfEnabled && this._firstPT ? R._onPluginEvent(t ? "_onEnable" : "_onDisable", this) : !1
                            }, R.to = function(t, e, n) {
                                return new R(t, e, n)
                            }, R.from = function(t, e, n) {
                                return n.runBackwards = !0, n.immediateRender = 0 != n.immediateRender, new R(t, e, n)
                            }, R.fromTo = function(t, e, n, r) {
                                return r.startAt = n, r.immediateRender = 0 != r.immediateRender && 0 != n.immediateRender, new R(t, e, r)
                            }, R.delayedCall = function(t, e, n, r, i) {
                                return new R(e, 0, {
                                    delay: t,
                                    onComplete: e,
                                    onCompleteParams: n,
                                    callbackScope: r,
                                    onReverseComplete: e,
                                    onReverseCompleteParams: n,
                                    immediateRender: !1,
                                    lazy: !1,
                                    useFrames: i,
                                    overwrite: 0
                                })
                            }, R.set = function(t, e) {
                                return new R(t, 0, e)
                            }, R.getTweensOf = function(t, e) {
                                if (null == t) return [];
                                t = "string" != typeof t ? t : R.selector(t) || t;
                                var n, r, i, a;
                                if ((m(t) || D(t)) && "number" != typeof t[0]) {
                                    for (n = t.length, r = []; --n > -1;) r = r.concat(R.getTweensOf(t[n], e));
                                    for (n = r.length; --n > -1;)
                                        for (a = r[n], i = n; --i > -1;) a === r[i] && r.splice(n, 1)
                                } else
                                    for (r = W(t).concat(), n = r.length; --n > -1;)(r[n]._gc || e && !r[n].isActive()) && r.splice(n, 1);
                                return r
                            }, R.killTweensOf = R.killDelayedCallsTo = function(t, e, n) {
                                "object" == typeof e && (n = e, e = !1);
                                for (var r = R.getTweensOf(t, e), i = r.length; --i > -1;) r[i]._kill(n, t)
                            };
                            var J = _("plugins.TweenPlugin", function(t, e) {
                                this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = J.prototype
                            }, !0);
                            if (o = J.prototype, J.version = "1.10.1", J.API = 2, o._firstPT = null, o._addTween = function(t, e, n, r, i, a) {
                                    var s, o;
                                    return null != r && (s = "number" == typeof r || "=" !== r.charAt(1) ? Number(r) - Number(n) : parseInt(r.charAt(0) + "1", 10) * Number(r.substr(2))) ? (this._firstPT = o = {
                                        _next: this._firstPT,
                                        t: t,
                                        p: e,
                                        s: n,
                                        c: s,
                                        f: "function" == typeof t[e],
                                        n: i || e,
                                        r: a
                                    }, o._next && (o._next._prev = o), o) : void 0
                                }, o.setRatio = function(t) {
                                    for (var e, n = this._firstPT, r = 1e-6; n;) e = n.c * t + n.s, n.r ? e = Math.round(e) : r > e && e > -r && (e = 0), n.f ? n.t[n.p](e) : n.t[n.p] = e, n = n._next
                                }, o._kill = function(t) {
                                    var e, n = this._overwriteProps,
                                        r = this._firstPT;
                                    if (null != t[this._propName]) this._overwriteProps = [];
                                    else
                                        for (e = n.length; --e > -1;) null != t[n[e]] && n.splice(e, 1);
                                    for (; r;) null != t[r.n] && (r._next && (r._next._prev = r._prev), r._prev ? (r._prev._next = r._next, r._prev = null) : this._firstPT === r && (this._firstPT = r._next)), r = r._next;
                                    return !1
                                }, o._roundProps = function(t, e) {
                                    for (var n = this._firstPT; n;)(t[this._propName] || null != n.n && t[n.n.split(this._propName + "_").join("")]) && (n.r = e), n = n._next
                                }, R._onPluginEvent = function(t, e) {
                                    var n, r, i, a, s, o = e._firstPT;
                                    if ("_onInitAllProps" === t) {
                                        for (; o;) {
                                            for (s = o._next, r = i; r && r.pr > o.pr;) r = r._next;
                                            (o._prev = r ? r._prev : a) ? o._prev._next = o: i = o, (o._next = r) ? r._prev = o : a = o, o = s
                                        }
                                        o = e._firstPT = i
                                    }
                                    for (; o;) o.pg && "function" == typeof o.t[t] && o.t[t]() && (n = !0), o = o._next;
                                    return n
                                }, J.activate = function(t) {
                                    for (var e = t.length; --e > -1;) t[e].API === J.API && (z[(new t[e])._propName] = t[e]);
                                    return !0
                                }, y.plugin = function(t) {
                                    if (!(t && t.propName && t.init && t.API)) throw "illegal plugin definition.";
                                    var e, n = t.propName,
                                        r = t.priority || 0,
                                        i = t.overwriteProps,
                                        a = {
                                            init: "_onInitTween",
                                            set: "setRatio",
                                            kill: "_kill",
                                            round: "_roundProps",
                                            initAll: "_onInitAllProps"
                                        },
                                        s = _("plugins." + n.charAt(0).toUpperCase() + n.substr(1) + "Plugin", function() {
                                            J.call(this, n, r), this._overwriteProps = i || []
                                        }, t.global === !0),
                                        o = s.prototype = new J(n);
                                    o.constructor = s, s.API = t.API;
                                    for (e in a) "function" == typeof t[e] && (o[a[e]] = t[e]);
                                    return s.version = t.version, J.activate([s]), s
                                }, a = t._gsQueue) {
                                for (s = 0; s < a.length; s++) a[s]();
                                for (o in g) g[o].func || t.console.log("GSAP encountered missing dependency: com.greensock." + o)
                            }
                            u = !1
                        }
                    }("undefined" != typeof e && e.exports && "undefined" != typeof t ? t : this || window, "TweenMax"), a("undefined" != typeof TweenMax ? TweenMax : window.TweenMax)
            }).call(t, void 0, void 0, void 0, void 0, function(t) {
                e.exports = t
            })
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    5: [function(t, e, n) {
        (function(n) {
            var r = t;
            (function(t, e, i, a, s) {
                var o = "undefined" != typeof t && t.exports && "undefined" != typeof n ? n : this || window;
                (o._gsQueue || (o._gsQueue = [])).push(function() {
                        "use strict";
                        o._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(t, e) {
                            var n, r, i, a, s = function() {
                                    t.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = s.prototype.setRatio
                                },
                                l = o._gsDefine.globals,
                                u = {},
                                c = s.prototype = new t("css");
                            c.constructor = s, s.version = "1.17.0", s.API = 2, s.defaultTransformPerspective = 0, s.defaultSkewType = "compensated", s.defaultSmoothOrigin = !0, c = "px", s.suffixMap = {
                                top: c,
                                right: c,
                                bottom: c,
                                left: c,
                                width: c,
                                height: c,
                                fontSize: c,
                                padding: c,
                                margin: c,
                                perspective: c,
                                lineHeight: ""
                            };
                            var h, f, p, d, m, g, v = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
                                y = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                                _ = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                                x = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
                                b = /(?:\d|\-|\+|=|#|\.)*/g,
                                w = /opacity *= *([^)]*)/i,
                                T = /opacity:([^;]*)/i,
                                k = /alpha\(opacity *=.+?\)/i,
                                C = /^(rgb|hsl)/,
                                S = /([A-Z])/g,
                                P = /-([a-z])/gi,
                                A = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                                O = function(t, e) {
                                    return e.toUpperCase()
                                },
                                j = /(?:Left|Right|Width)/i,
                                M = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                                N = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                                R = /,(?=[^\)]*(?:\(|$))/gi,
                                D = Math.PI / 180,
                                E = 180 / Math.PI,
                                F = {},
                                I = document,
                                L = function(t) {
                                    return I.createElementNS ? I.createElementNS("http://www.w3.org/1999/xhtml", t) : I.createElement(t)
                                },
                                z = L("div"),
                                B = L("img"),
                                q = s._internals = {
                                    _specialProps: u
                                },
                                X = navigator.userAgent,
                                H = function() {
                                    var t = X.indexOf("Android"),
                                        e = L("a");
                                    return p = -1 !== X.indexOf("Safari") && -1 === X.indexOf("Chrome") && (-1 === t || Number(X.substr(t + 8, 1)) > 3), m = p && Number(X.substr(X.indexOf("Version/") + 8, 1)) < 6, d = -1 !== X.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(X) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(X)) && (g = parseFloat(RegExp.$1)), e ? (e.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(e.style.opacity)) : !1
                                }(),
                                V = function(t) {
                                    return w.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
                                },
                                $ = function(t) {
                                    window.console && console.log(t)
                                },
                                U = "",
                                Y = "",
                                W = function(t, e) {
                                    e = e || z;
                                    var n, r, i = e.style;
                                    if (void 0 !== i[t]) return t;
                                    for (t = t.charAt(0).toUpperCase() + t.substr(1), n = ["O", "Moz", "ms", "Ms", "Webkit"], r = 5; --r > -1 && void 0 === i[n[r] + t];);
                                    return r >= 0 ? (Y = 3 === r ? "ms" : n[r], U = "-" + Y.toLowerCase() + "-", Y + t) : null
                                },
                                G = I.defaultView ? I.defaultView.getComputedStyle : function() {},
                                Z = s.getStyle = function(t, e, n, r, i) {
                                    var a;
                                    return H || "opacity" !== e ? (!r && t.style[e] ? a = t.style[e] : (n = n || G(t)) ? a = n[e] || n.getPropertyValue(e) || n.getPropertyValue(e.replace(S, "-$1").toLowerCase()) : t.currentStyle && (a = t.currentStyle[e]), null == i || a && "none" !== a && "auto" !== a && "auto auto" !== a ? a : i) : V(t)
                                },
                                Q = q.convertToPixels = function(t, n, r, i, a) {
                                    if ("px" === i || !i) return r;
                                    if ("auto" === i || !r) return 0;
                                    var o, l, u, c = j.test(n),
                                        h = t,
                                        f = z.style,
                                        p = 0 > r;
                                    if (p && (r = -r), "%" === i && -1 !== n.indexOf("border")) o = r / 100 * (c ? t.clientWidth : t.clientHeight);
                                    else {
                                        if (f.cssText = "border:0 solid red;position:" + Z(t, "position") + ";line-height:0;", "%" !== i && h.appendChild) f[c ? "borderLeftWidth" : "borderTopWidth"] = r + i;
                                        else {
                                            if (h = t.parentNode || I.body, l = h._gsCache, u = e.ticker.frame, l && c && l.time === u) return l.width * r / 100;
                                            f[c ? "width" : "height"] = r + i
                                        }
                                        h.appendChild(z), o = parseFloat(z[c ? "offsetWidth" : "offsetHeight"]), h.removeChild(z), c && "%" === i && s.cacheWidths !== !1 && (l = h._gsCache = h._gsCache || {}, l.time = u, l.width = o / r * 100), 0 !== o || a || (o = Q(t, n, r, i, !0))
                                    }
                                    return p ? -o : o
                                },
                                J = q.calculateOffset = function(t, e, n) {
                                    if ("absolute" !== Z(t, "position", n)) return 0;
                                    var r = "left" === e ? "Left" : "Top",
                                        i = Z(t, "margin" + r, n);
                                    return t["offset" + r] - (Q(t, e, parseFloat(i), i.replace(b, "")) || 0)
                                },
                                K = function(t, e) {
                                    var n, r, i, a = {};
                                    if (e = e || G(t, null))
                                        if (n = e.length)
                                            for (; --n > -1;) i = e[n], (-1 === i.indexOf("-transform") || Ct === i) && (a[i.replace(P, O)] = e.getPropertyValue(i));
                                        else
                                            for (n in e)(-1 === n.indexOf("Transform") || kt === n) && (a[n] = e[n]);
                                    else if (e = t.currentStyle || t.style)
                                        for (n in e) "string" == typeof n && void 0 === a[n] && (a[n.replace(P, O)] = e[n]);
                                    return H || (a.opacity = V(t)), r = It(t, e, !1), a.rotation = r.rotation, a.skewX = r.skewX, a.scaleX = r.scaleX, a.scaleY = r.scaleY, a.x = r.x, a.y = r.y, Pt && (a.z = r.z, a.rotationX = r.rotationX, a.rotationY = r.rotationY, a.scaleZ = r.scaleZ), a.filters && delete a.filters, a
                                },
                                tt = function(t, e, n, r, i) {
                                    var a, s, o, l = {},
                                        u = t.style;
                                    for (s in n) "cssText" !== s && "length" !== s && isNaN(s) && (e[s] !== (a = n[s]) || i && i[s]) && -1 === s.indexOf("Origin") && ("number" == typeof a || "string" == typeof a) && (l[s] = "auto" !== a || "left" !== s && "top" !== s ? "" !== a && "auto" !== a && "none" !== a || "string" != typeof e[s] || "" === e[s].replace(x, "") ? a : 0 : J(t, s), void 0 !== u[s] && (o = new dt(u, s, u[s], o)));
                                    if (r)
                                        for (s in r) "className" !== s && (l[s] = r[s]);
                                    return {
                                        difs: l,
                                        firstMPT: o
                                    }
                                },
                                et = {
                                    width: ["Left", "Right"],
                                    height: ["Top", "Bottom"]
                                },
                                nt = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                                rt = function(t, e, n) {
                                    var r = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
                                        i = et[e],
                                        a = i.length;
                                    for (n = n || G(t, null); --a > -1;) r -= parseFloat(Z(t, "padding" + i[a], n, !0)) || 0, r -= parseFloat(Z(t, "border" + i[a] + "Width", n, !0)) || 0;
                                    return r
                                },
                                it = function(t, e) {
                                    (null == t || "" === t || "auto" === t || "auto auto" === t) && (t = "0 0");
                                    var n = t.split(" "),
                                        r = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : n[0],
                                        i = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : n[1];
                                    return null == i ? i = "center" === r ? "50%" : "0" : "center" === i && (i = "50%"), ("center" === r || isNaN(parseFloat(r)) && -1 === (r + "").indexOf("=")) && (r = "50%"), t = r + " " + i + (n.length > 2 ? " " + n[2] : ""), e && (e.oxp = -1 !== r.indexOf("%"), e.oyp = -1 !== i.indexOf("%"), e.oxr = "=" === r.charAt(1), e.oyr = "=" === i.charAt(1), e.ox = parseFloat(r.replace(x, "")), e.oy = parseFloat(i.replace(x, "")), e.v = t), e || t
                                },
                                at = function(t, e) {
                                    return "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e)
                                },
                                st = function(t, e) {
                                    return null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) + e : parseFloat(t)
                                },
                                ot = function(t, e, n, r) {
                                    var i, a, s, o, l, u = 1e-6;
                                    return null == t ? o = e : "number" == typeof t ? o = t : (i = 360, a = t.split("_"), l = "=" === t.charAt(1), s = (l ? parseInt(t.charAt(0) + "1", 10) * parseFloat(a[0].substr(2)) : parseFloat(a[0])) * (-1 === t.indexOf("rad") ? 1 : E) - (l ? 0 : e), a.length && (r && (r[n] = e + s), -1 !== t.indexOf("short") && (s %= i, s !== s % (i / 2) && (s = 0 > s ? s + i : s - i)), -1 !== t.indexOf("_cw") && 0 > s ? s = (s + 9999999999 * i) % i - (s / i | 0) * i : -1 !== t.indexOf("ccw") && s > 0 && (s = (s - 9999999999 * i) % i - (s / i | 0) * i)), o = e + s), u > o && o > -u && (o = 0), o
                                },
                                lt = {
                                    aqua: [0, 255, 255],
                                    lime: [0, 255, 0],
                                    silver: [192, 192, 192],
                                    black: [0, 0, 0],
                                    maroon: [128, 0, 0],
                                    teal: [0, 128, 128],
                                    blue: [0, 0, 255],
                                    navy: [0, 0, 128],
                                    white: [255, 255, 255],
                                    fuchsia: [255, 0, 255],
                                    olive: [128, 128, 0],
                                    yellow: [255, 255, 0],
                                    orange: [255, 165, 0],
                                    gray: [128, 128, 128],
                                    purple: [128, 0, 128],
                                    green: [0, 128, 0],
                                    red: [255, 0, 0],
                                    pink: [255, 192, 203],
                                    cyan: [0, 255, 255],
                                    transparent: [255, 255, 255, 0]
                                },
                                ut = function(t, e, n) {
                                    return t = 0 > t ? t + 1 : t > 1 ? t - 1 : t, 255 * (1 > 6 * t ? e + (n - e) * t * 6 : .5 > t ? n : 2 > 3 * t ? e + (n - e) * (2 / 3 - t) * 6 : e) + .5 | 0
                                },
                                ct = s.parseColor = function(t) {
                                    var e, n, r, i, a, s;
                                    return t && "" !== t ? "number" == typeof t ? [t >> 16, t >> 8 & 255, 255 & t] : ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), lt[t] ? lt[t] : "#" === t.charAt(0) ? (4 === t.length && (e = t.charAt(1), n = t.charAt(2), r = t.charAt(3), t = "#" + e + e + n + n + r + r), t = parseInt(t.substr(1), 16), [t >> 16, t >> 8 & 255, 255 & t]) : "hsl" === t.substr(0, 3) ? (t = t.match(v), i = Number(t[0]) % 360 / 360, a = Number(t[1]) / 100, s = Number(t[2]) / 100, n = .5 >= s ? s * (a + 1) : s + a - s * a, e = 2 * s - n, t.length > 3 && (t[3] = Number(t[3])), t[0] = ut(i + 1 / 3, e, n), t[1] = ut(i, e, n), t[2] = ut(i - 1 / 3, e, n), t) : (t = t.match(v) || lt.transparent, t[0] = Number(t[0]), t[1] = Number(t[1]), t[2] = Number(t[2]), t.length > 3 && (t[3] = Number(t[3])), t)) : lt.black
                                },
                                ht = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
                            for (c in lt) ht += "|" + c + "\\b";
                            ht = new RegExp(ht + ")", "gi");
                            var ft = function(t, e, n, r) {
                                    if (null == t) return function(t) {
                                        return t
                                    };
                                    var i, a = e ? (t.match(ht) || [""])[0] : "",
                                        s = t.split(a).join("").match(_) || [],
                                        o = t.substr(0, t.indexOf(s[0])),
                                        l = ")" === t.charAt(t.length - 1) ? ")" : "",
                                        u = -1 !== t.indexOf(" ") ? " " : ",",
                                        c = s.length,
                                        h = c > 0 ? s[0].replace(v, "") : "";
                                    return c ? i = e ? function(t) {
                                        var e, f, p, d;
                                        if ("number" == typeof t) t += h;
                                        else if (r && R.test(t)) {
                                            for (d = t.replace(R, "|").split("|"), p = 0; p < d.length; p++) d[p] = i(d[p]);
                                            return d.join(",")
                                        }
                                        if (e = (t.match(ht) || [a])[0], f = t.split(e).join("").match(_) || [], p = f.length, c > p--)
                                            for (; ++p < c;) f[p] = n ? f[(p - 1) / 2 | 0] : s[p];
                                        return o + f.join(u) + u + e + l + (-1 !== t.indexOf("inset") ? " inset" : "")
                                    } : function(t) {
                                        var e, a, f;
                                        if ("number" == typeof t) t += h;
                                        else if (r && R.test(t)) {
                                            for (a = t.replace(R, "|").split("|"), f = 0; f < a.length; f++) a[f] = i(a[f]);
                                            return a.join(",")
                                        }
                                        if (e = t.match(_) || [], f = e.length, c > f--)
                                            for (; ++f < c;) e[f] = n ? e[(f - 1) / 2 | 0] : s[f];
                                        return o + e.join(u) + l
                                    } : function(t) {
                                        return t
                                    }
                                },
                                pt = function(t) {
                                    return t = t.split(","),
                                        function(e, n, r, i, a, s, o) {
                                            var l, u = (n + "").split(" ");
                                            for (o = {}, l = 0; 4 > l; l++) o[t[l]] = u[l] = u[l] || u[(l - 1) / 2 >> 0];
                                            return i.parse(e, o, a, s)
                                        }
                                },
                                dt = (q._setPluginRatio = function(t) {
                                    this.plugin.setRatio(t);
                                    for (var e, n, r, i, a = this.data, s = a.proxy, o = a.firstMPT, l = 1e-6; o;) e = s[o.v], o.r ? e = Math.round(e) : l > e && e > -l && (e = 0), o.t[o.p] = e, o = o._next;
                                    if (a.autoRotate && (a.autoRotate.rotation = s.rotation), 1 === t)
                                        for (o = a.firstMPT; o;) {
                                            if (n = o.t, n.type) {
                                                if (1 === n.type) {
                                                    for (i = n.xs0 + n.s + n.xs1, r = 1; r < n.l; r++) i += n["xn" + r] + n["xs" + (r + 1)];
                                                    n.e = i
                                                }
                                            } else n.e = n.s + n.xs0;
                                            o = o._next
                                        }
                                }, function(t, e, n, r, i) {
                                    this.t = t, this.p = e, this.v = n, this.r = i, r && (r._prev = this, this._next = r)
                                }),
                                mt = (q._parseToProxy = function(t, e, n, r, i, a) {
                                    var s, o, l, u, c, h = r,
                                        f = {},
                                        p = {},
                                        d = n._transform,
                                        m = F;
                                    for (n._transform = null, F = e, r = c = n.parse(t, e, r, i), F = m, a && (n._transform = d, h && (h._prev = null, h._prev && (h._prev._next = null))); r && r !== h;) {
                                        if (r.type <= 1 && (o = r.p, p[o] = r.s + r.c, f[o] = r.s, a || (u = new dt(r, "s", o, u, r.r), r.c = 0), 1 === r.type))
                                            for (s = r.l; --s > 0;) l = "xn" + s, o = r.p + "_" + l, p[o] = r.data[l], f[o] = r[l], a || (u = new dt(r, l, o, u, r.rxp[l]));
                                        r = r._next
                                    }
                                    return {
                                        proxy: f,
                                        end: p,
                                        firstMPT: u,
                                        pt: c
                                    }
                                }, q.CSSPropTween = function(t, e, r, i, s, o, l, u, c, h, f) {
                                    this.t = t, this.p = e, this.s = r, this.c = i, this.n = l || e, t instanceof mt || a.push(this.n), this.r = u, this.type = o || 0, c && (this.pr = c, n = !0), this.b = void 0 === h ? r : h, this.e = void 0 === f ? r + i : f, s && (this._next = s, s._prev = this)
                                }),
                                gt = function(t, e, n, r, i, a) {
                                    var s = new mt(t, e, n, r - n, i, -1, a);
                                    return s.b = n, s.e = s.xs0 = r, s
                                },
                                vt = s.parseComplex = function(t, e, n, r, i, a, s, o, l, u) {
                                    n = n || a || "", s = new mt(t, e, 0, 0, s, u ? 2 : 1, null, !1, o, n, r), r += "";
                                    var c, f, p, d, m, g, _, x, b, w, T, k, S = n.split(", ").join(",").split(" "),
                                        P = r.split(", ").join(",").split(" "),
                                        A = S.length,
                                        O = h !== !1;
                                    for ((-1 !== r.indexOf(",") || -1 !== n.indexOf(",")) && (S = S.join(" ").replace(R, ", ").split(" "), P = P.join(" ").replace(R, ", ").split(" "), A = S.length), A !== P.length && (S = (a || "").split(" "), A = S.length), s.plugin = l, s.setRatio = u, c = 0; A > c; c++)
                                        if (d = S[c], m = P[c], x = parseFloat(d), x || 0 === x) s.appendXtra("", x, at(m, x), m.replace(y, ""), O && -1 !== m.indexOf("px"), !0);
                                        else if (i && ("#" === d.charAt(0) || lt[d] || C.test(d))) k = "," === m.charAt(m.length - 1) ? ")," : ")", d = ct(d), m = ct(m), b = d.length + m.length > 6, b && !H && 0 === m[3] ? (s["xs" + s.l] += s.l ? " transparent" : "transparent", s.e = s.e.split(P[c]).join("transparent")) : (H || (b = !1), s.appendXtra(b ? "rgba(" : "rgb(", d[0], m[0] - d[0], ",", !0, !0).appendXtra("", d[1], m[1] - d[1], ",", !0).appendXtra("", d[2], m[2] - d[2], b ? "," : k, !0), b && (d = d.length < 4 ? 1 : d[3], s.appendXtra("", d, (m.length < 4 ? 1 : m[3]) - d, k, !1)));
                                    else if (g = d.match(v)) {
                                        if (_ = m.match(y), !_ || _.length !== g.length) return s;
                                        for (p = 0, f = 0; f < g.length; f++) T = g[f], w = d.indexOf(T, p), s.appendXtra(d.substr(p, w - p), Number(T), at(_[f], T), "", O && "px" === d.substr(w + T.length, 2), 0 === f), p = w + T.length;
                                        s["xs" + s.l] += d.substr(p)
                                    } else s["xs" + s.l] += s.l ? " " + d : d;
                                    if (-1 !== r.indexOf("=") && s.data) {
                                        for (k = s.xs0 + s.data.s, c = 1; c < s.l; c++) k += s["xs" + c] + s.data["xn" + c];
                                        s.e = k + s["xs" + c]
                                    }
                                    return s.l || (s.type = -1, s.xs0 = s.e), s.xfirst || s
                                },
                                yt = 9;
                            for (c = mt.prototype, c.l = c.pr = 0; --yt > 0;) c["xn" + yt] = 0, c["xs" + yt] = "";
                            c.xs0 = "", c._next = c._prev = c.xfirst = c.data = c.plugin = c.setRatio = c.rxp = null, c.appendXtra = function(t, e, n, r, i, a) {
                                var s = this,
                                    o = s.l;
                                return s["xs" + o] += a && o ? " " + t : t || "", n || 0 === o || s.plugin ? (s.l++, s.type = s.setRatio ? 2 : 1, s["xs" + s.l] = r || "", o > 0 ? (s.data["xn" + o] = e + n, s.rxp["xn" + o] = i, s["xn" + o] = e, s.plugin || (s.xfirst = new mt(s, "xn" + o, e, n, s.xfirst || s, 0, s.n, i, s.pr), s.xfirst.xs0 = 0), s) : (s.data = {
                                    s: e + n
                                }, s.rxp = {}, s.s = e, s.c = n, s.r = i, s)) : (s["xs" + o] += e + (r || ""), s)
                            };
                            var _t = function(t, e) {
                                    e = e || {}, this.p = e.prefix ? W(t) || t : t, u[t] = u[this.p] = this, this.format = e.formatter || ft(e.defaultValue, e.color, e.collapsible, e.multi), e.parser && (this.parse = e.parser), this.clrs = e.color, this.multi = e.multi, this.keyword = e.keyword, this.dflt = e.defaultValue, this.pr = e.priority || 0
                                },
                                xt = q._registerComplexSpecialProp = function(t, e, n) {
                                    "object" != typeof e && (e = {
                                        parser: n
                                    });
                                    var r, i, a = t.split(","),
                                        s = e.defaultValue;
                                    for (n = n || [s], r = 0; r < a.length; r++) e.prefix = 0 === r && e.prefix, e.defaultValue = n[r] || s, i = new _t(a[r], e)
                                },
                                bt = function(t) {
                                    if (!u[t]) {
                                        var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
                                        xt(t, {
                                            parser: function(t, n, r, i, a, s, o) {
                                                var c = l.com.greensock.plugins[e];
                                                return c ? (c._cssRegister(), u[r].parse(t, n, r, i, a, s, o)) : ($("Error: " + e + " js file not loaded."), a)
                                            }
                                        })
                                    }
                                };
                            c = _t.prototype, c.parseComplex = function(t, e, n, r, i, a) {
                                var s, o, l, u, c, h, f = this.keyword;
                                if (this.multi && (R.test(n) || R.test(e) ? (o = e.replace(R, "|").split("|"), l = n.replace(R, "|").split("|")) : f && (o = [e], l = [n])), l) {
                                    for (u = l.length > o.length ? l.length : o.length, s = 0; u > s; s++) e = o[s] = o[s] || this.dflt, n = l[s] = l[s] || this.dflt, f && (c = e.indexOf(f), h = n.indexOf(f), c !== h && (-1 === h ? o[s] = o[s].split(f).join("") : -1 === c && (o[s] += " " + f)));
                                    e = o.join(", "), n = l.join(", ")
                                }
                                return vt(t, this.p, e, n, this.clrs, this.dflt, r, this.pr, i, a)
                            }, c.parse = function(t, e, n, r, a, s, o) {
                                return this.parseComplex(t.style, this.format(Z(t, this.p, i, !1, this.dflt)), this.format(e), a, s)
                            }, s.registerSpecialProp = function(t, e, n) {
                                xt(t, {
                                    parser: function(t, r, i, a, s, o, l) {
                                        var u = new mt(t, i, 0, 0, s, 2, i, !1, n);
                                        return u.plugin = o, u.setRatio = e(t, r, a._tween, i), u
                                    },
                                    priority: n
                                })
                            }, s.useSVGTransformAttr = p || d;
                            var wt, Tt = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
                                kt = W("transform"),
                                Ct = U + "transform",
                                St = W("transformOrigin"),
                                Pt = null !== W("perspective"),
                                At = q.Transform = function() {
                                    this.perspective = parseFloat(s.defaultTransformPerspective) || 0, this.force3D = s.defaultForce3D !== !1 && Pt ? s.defaultForce3D || "auto" : !1
                                },
                                Ot = window.SVGElement,
                                jt = function(t, e, n) {
                                    var r, i = I.createElementNS("http://www.w3.org/2000/svg", t),
                                        a = /([a-z])([A-Z])/g;
                                    for (r in n) i.setAttributeNS(null, r.replace(a, "$1-$2").toLowerCase(), n[r]);
                                    return e.appendChild(i), i
                                },
                                Mt = I.documentElement,
                                Nt = function() {
                                    var t, e, n, r = g || /Android/i.test(X) && !window.chrome;
                                    return I.createElementNS && !r && (t = jt("svg", Mt), e = jt("rect", t, {
                                        width: 100,
                                        height: 50,
                                        x: 100
                                    }), n = e.getBoundingClientRect().width, e.style[St] = "50% 50%", e.style[kt] = "scaleX(0.5)", r = n === e.getBoundingClientRect().width && !(d && Pt), Mt.removeChild(t)), r
                                }(),
                                Rt = function(t, e, n, r, i) {
                                    var a, o, l, u, c, h, f, p, d, m, g, v, y, _, x = t._gsTransform,
                                        b = Ft(t, !0);
                                    x && (y = x.xOrigin, _ = x.yOrigin), (!r || (a = r.split(" ")).length < 2) && (f = t.getBBox(), e = it(e).split(" "), a = [(-1 !== e[0].indexOf("%") ? parseFloat(e[0]) / 100 * f.width : parseFloat(e[0])) + f.x, (-1 !== e[1].indexOf("%") ? parseFloat(e[1]) / 100 * f.height : parseFloat(e[1])) + f.y]), n.xOrigin = u = parseFloat(a[0]), n.yOrigin = c = parseFloat(a[1]), r && b !== Et && (h = b[0], f = b[1], p = b[2], d = b[3], m = b[4], g = b[5], v = h * d - f * p, o = u * (d / v) + c * (-p / v) + (p * g - d * m) / v, l = u * (-f / v) + c * (h / v) - (h * g - f * m) / v, u = n.xOrigin = a[0] = o, c = n.yOrigin = a[1] = l), x && (i || i !== !1 && s.defaultSmoothOrigin !== !1 ? (o = u - y, l = c - _, x.xOffset += o * b[0] + l * b[2] - o, x.yOffset += o * b[1] + l * b[3] - l) : x.xOffset = x.yOffset = 0), t.setAttribute("data-svg-origin", a.join(" "))
                                },
                                Dt = function(t) {
                                    return !!(Ot && "function" == typeof t.getBBox && t.getCTM && (!t.parentNode || t.parentNode.getBBox && t.parentNode.getCTM))
                                },
                                Et = [1, 0, 0, 1, 0, 0],
                                Ft = function(t, e) {
                                    var n, r, i, a, s, o = t._gsTransform || new At,
                                        l = 1e5;
                                    if (kt ? r = Z(t, Ct, null, !0) : t.currentStyle && (r = t.currentStyle.filter.match(M), r = r && 4 === r.length ? [r[0].substr(4), Number(r[2].substr(4)), Number(r[1].substr(4)), r[3].substr(4), o.x || 0, o.y || 0].join(",") : ""), n = !r || "none" === r || "matrix(1, 0, 0, 1, 0, 0)" === r, (o.svg || t.getBBox && Dt(t)) && (n && -1 !== (t.style[kt] + "").indexOf("matrix") && (r = t.style[kt], n = 0), i = t.getAttribute("transform"), n && i && (-1 !== i.indexOf("matrix") ? (r = i, n = 0) : -1 !== i.indexOf("translate") && (r = "matrix(1,0,0,1," + i.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", n = 0))), n) return Et;
                                    for (i = (r || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], yt = i.length; --yt > -1;) a = Number(i[yt]), i[yt] = (s = a - (a |= 0)) ? (s * l + (0 > s ? -.5 : .5) | 0) / l + a : a;
                                    return e && i.length > 6 ? [i[0], i[1], i[4], i[5], i[12], i[13]] : i
                                },
                                It = q.getTransform = function(t, n, r, a) {
                                    if (t._gsTransform && r && !a) return t._gsTransform;
                                    var o, l, u, c, h, f, p = r ? t._gsTransform || new At : new At,
                                        d = p.scaleX < 0,
                                        m = 2e-5,
                                        g = 1e5,
                                        v = Pt ? parseFloat(Z(t, St, n, !1, "0 0 0").split(" ")[2]) || p.zOrigin || 0 : 0,
                                        y = parseFloat(s.defaultTransformPerspective) || 0;
                                    if (p.svg = !(!t.getBBox || !Dt(t)), p.svg && (Rt(t, Z(t, St, i, !1, "50% 50%") + "", p, t.getAttribute("data-svg-origin")), wt = s.useSVGTransformAttr || Nt), o = Ft(t), o !== Et) {
                                        if (16 === o.length) {
                                            var _, x, b, w, T, k = o[0],
                                                C = o[1],
                                                S = o[2],
                                                P = o[3],
                                                A = o[4],
                                                O = o[5],
                                                j = o[6],
                                                M = o[7],
                                                N = o[8],
                                                R = o[9],
                                                D = o[10],
                                                F = o[12],
                                                I = o[13],
                                                L = o[14],
                                                z = o[11],
                                                B = Math.atan2(j, D);
                                            p.zOrigin && (L = -p.zOrigin, F = N * L - o[12], I = R * L - o[13], L = D * L + p.zOrigin - o[14]), p.rotationX = B * E, B && (w = Math.cos(-B), T = Math.sin(-B), _ = A * w + N * T, x = O * w + R * T, b = j * w + D * T, N = A * -T + N * w, R = O * -T + R * w, D = j * -T + D * w, z = M * -T + z * w, A = _, O = x, j = b), B = Math.atan2(N, D), p.rotationY = B * E, B && (w = Math.cos(-B), T = Math.sin(-B), _ = k * w - N * T, x = C * w - R * T, b = S * w - D * T, R = C * T + R * w, D = S * T + D * w, z = P * T + z * w, k = _, C = x, S = b), B = Math.atan2(C, k), p.rotation = B * E, B && (w = Math.cos(-B), T = Math.sin(-B), k = k * w + A * T, x = C * w + O * T, O = C * -T + O * w, j = S * -T + j * w, C = x), p.rotationX && Math.abs(p.rotationX) + Math.abs(p.rotation) > 359.9 && (p.rotationX = p.rotation = 0, p.rotationY += 180), p.scaleX = (Math.sqrt(k * k + C * C) * g + .5 | 0) / g, p.scaleY = (Math.sqrt(O * O + R * R) * g + .5 | 0) / g, p.scaleZ = (Math.sqrt(j * j + D * D) * g + .5 | 0) / g, p.skewX = 0, p.perspective = z ? 1 / (0 > z ? -z : z) : 0, p.x = F, p.y = I, p.z = L, p.svg && (p.x -= p.xOrigin - (p.xOrigin * k - p.yOrigin * A), p.y -= p.yOrigin - (p.yOrigin * C - p.xOrigin * O))
                                        } else if ((!Pt || a || !o.length || p.x !== o[4] || p.y !== o[5] || !p.rotationX && !p.rotationY) && (void 0 === p.x || "none" !== Z(t, "display", n))) {
                                            var q = o.length >= 6,
                                                X = q ? o[0] : 1,
                                                H = o[1] || 0,
                                                V = o[2] || 0,
                                                $ = q ? o[3] : 1;
                                            p.x = o[4] || 0, p.y = o[5] || 0, u = Math.sqrt(X * X + H * H), c = Math.sqrt($ * $ + V * V), h = X || H ? Math.atan2(H, X) * E : p.rotation || 0, f = V || $ ? Math.atan2(V, $) * E + h : p.skewX || 0, Math.abs(f) > 90 && Math.abs(f) < 270 && (d ? (u *= -1, f += 0 >= h ? 180 : -180, h += 0 >= h ? 180 : -180) : (c *= -1, f += 0 >= f ? 180 : -180)), p.scaleX = u, p.scaleY = c, p.rotation = h, p.skewX = f, Pt && (p.rotationX = p.rotationY = p.z = 0, p.perspective = y, p.scaleZ = 1), p.svg && (p.x -= p.xOrigin - (p.xOrigin * X + p.yOrigin * V), p.y -= p.yOrigin - (p.xOrigin * H + p.yOrigin * $))
                                        }
                                        p.zOrigin = v;
                                        for (l in p) p[l] < m && p[l] > -m && (p[l] = 0)
                                    }
                                    return r && (t._gsTransform = p, p.svg && (wt && t.style[kt] ? e.delayedCall(.001, function() {
                                        qt(t.style, kt)
                                    }) : !wt && t.getAttribute("transform") && e.delayedCall(.001, function() {
                                        t.removeAttribute("transform")
                                    }))), p
                                },
                                Lt = function(t) {
                                    var e, n, r = this.data,
                                        i = -r.rotation * D,
                                        a = i + r.skewX * D,
                                        s = 1e5,
                                        o = (Math.cos(i) * r.scaleX * s | 0) / s,
                                        l = (Math.sin(i) * r.scaleX * s | 0) / s,
                                        u = (Math.sin(a) * -r.scaleY * s | 0) / s,
                                        c = (Math.cos(a) * r.scaleY * s | 0) / s,
                                        h = this.t.style,
                                        f = this.t.currentStyle;
                                    if (f) {
                                        n = l, l = -u, u = -n, e = f.filter, h.filter = "";
                                        var p, d, m = this.t.offsetWidth,
                                            v = this.t.offsetHeight,
                                            y = "absolute" !== f.position,
                                            _ = "progid:DXImageTransform.Microsoft.Matrix(M11=" + o + ", M12=" + l + ", M21=" + u + ", M22=" + c,
                                            x = r.x + m * r.xPercent / 100,
                                            T = r.y + v * r.yPercent / 100;
                                        if (null != r.ox && (p = (r.oxp ? m * r.ox * .01 : r.ox) - m / 2, d = (r.oyp ? v * r.oy * .01 : r.oy) - v / 2, x += p - (p * o + d * l), T += d - (p * u + d * c)), y ? (p = m / 2, d = v / 2, _ += ", Dx=" + (p - (p * o + d * l) + x) + ", Dy=" + (d - (p * u + d * c) + T) + ")") : _ += ", sizingMethod='auto expand')", -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? h.filter = e.replace(N, _) : h.filter = _ + " " + e, (0 === t || 1 === t) && 1 === o && 0 === l && 0 === u && 1 === c && (y && -1 === _.indexOf("Dx=0, Dy=0") || w.test(e) && 100 !== parseFloat(RegExp.$1) || -1 === e.indexOf(e.indexOf("Alpha")) && h.removeAttribute("filter")), !y) {
                                            var k, C, S, P = 8 > g ? 1 : -1;
                                            for (p = r.ieOffsetX || 0, d = r.ieOffsetY || 0, r.ieOffsetX = Math.round((m - ((0 > o ? -o : o) * m + (0 > l ? -l : l) * v)) / 2 + x), r.ieOffsetY = Math.round((v - ((0 > c ? -c : c) * v + (0 > u ? -u : u) * m)) / 2 + T), yt = 0; 4 > yt; yt++) C = nt[yt], k = f[C], n = -1 !== k.indexOf("px") ? parseFloat(k) : Q(this.t, C, parseFloat(k), k.replace(b, "")) || 0, S = n !== r[C] ? 2 > yt ? -r.ieOffsetX : -r.ieOffsetY : 2 > yt ? p - r.ieOffsetX : d - r.ieOffsetY, h[C] = (r[C] = Math.round(n - S * (0 === yt || 2 === yt ? 1 : P))) + "px"
                                        }
                                    }
                                },
                                zt = q.set3DTransformRatio = q.setTransformRatio = function(t) {
                                    var e, n, r, i, a, s, o, l, u, c, h, f, p, m, g, v, y, _, x, b, w, T, k, C = this.data,
                                        S = this.t.style,
                                        P = C.rotation,
                                        A = C.rotationX,
                                        O = C.rotationY,
                                        j = C.scaleX,
                                        M = C.scaleY,
                                        N = C.scaleZ,
                                        R = C.x,
                                        E = C.y,
                                        F = C.z,
                                        I = C.svg,
                                        L = C.perspective,
                                        z = C.force3D;
                                    if (((1 === t || 0 === t) && "auto" === z && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !z) && !F && !L && !O && !A || wt && I || !Pt) return void(P || C.skewX || I ? (P *= D, T = C.skewX * D, k = 1e5, e = Math.cos(P) * j, i = Math.sin(P) * j, n = Math.sin(P - T) * -M, a = Math.cos(P - T) * M, T && "simple" === C.skewType && (y = Math.tan(T), y = Math.sqrt(1 + y * y), n *= y, a *= y, C.skewY && (e *= y, i *= y)), I && (R += C.xOrigin - (C.xOrigin * e + C.yOrigin * n) + C.xOffset, E += C.yOrigin - (C.xOrigin * i + C.yOrigin * a) + C.yOffset, wt && (C.xPercent || C.yPercent) && (m = this.t.getBBox(), R += .01 * C.xPercent * m.width, E += .01 * C.yPercent * m.height), m = 1e-6, m > R && R > -m && (R = 0), m > E && E > -m && (E = 0)), x = (e * k | 0) / k + "," + (i * k | 0) / k + "," + (n * k | 0) / k + "," + (a * k | 0) / k + "," + R + "," + E + ")", I && wt ? this.t.setAttribute("transform", "matrix(" + x) : S[kt] = (C.xPercent || C.yPercent ? "translate(" + C.xPercent + "%," + C.yPercent + "%) matrix(" : "matrix(") + x) : S[kt] = (C.xPercent || C.yPercent ? "translate(" + C.xPercent + "%," + C.yPercent + "%) matrix(" : "matrix(") + j + ",0,0," + M + "," + R + "," + E + ")");
                                    if (d && (m = 1e-4, m > j && j > -m && (j = N = 2e-5), m > M && M > -m && (M = N = 2e-5), !L || C.z || C.rotationX || C.rotationY || (L = 0)), P || C.skewX) P *= D, g = e = Math.cos(P), v = i = Math.sin(P), C.skewX && (P -= C.skewX * D, g = Math.cos(P), v = Math.sin(P), "simple" === C.skewType && (y = Math.tan(C.skewX * D), y = Math.sqrt(1 + y * y), g *= y, v *= y, C.skewY && (e *= y, i *= y))), n = -v, a = g;
                                    else {
                                        if (!(O || A || 1 !== N || L || I)) return void(S[kt] = (C.xPercent || C.yPercent ? "translate(" + C.xPercent + "%," + C.yPercent + "%) translate3d(" : "translate3d(") + R + "px," + E + "px," + F + "px)" + (1 !== j || 1 !== M ? " scale(" + j + "," + M + ")" : ""));
                                        e = a = 1, n = i = 0
                                    }
                                    u = 1, r = s = o = l = c = h = 0, f = L ? -1 / L : 0, p = C.zOrigin, m = 1e-6, b = ",", w = "0", P = O * D, P && (g = Math.cos(P), v = Math.sin(P), o = -v, c = f * -v, r = e * v, s = i * v, u = g, f *= g, e *= g, i *= g), P = A * D, P && (g = Math.cos(P), v = Math.sin(P), y = n * g + r * v, _ = a * g + s * v, l = u * v, h = f * v, r = n * -v + r * g, s = a * -v + s * g, u *= g, f *= g, n = y, a = _), 1 !== N && (r *= N, s *= N, u *= N, f *= N), 1 !== M && (n *= M, a *= M, l *= M, h *= M), 1 !== j && (e *= j, i *= j, o *= j, c *= j), (p || I) && (p && (R += r * -p, E += s * -p, F += u * -p + p), I && (R += C.xOrigin - (C.xOrigin * e + C.yOrigin * n) + C.xOffset, E += C.yOrigin - (C.xOrigin * i + C.yOrigin * a) + C.yOffset), m > R && R > -m && (R = w), m > E && E > -m && (E = w), m > F && F > -m && (F = 0)), x = C.xPercent || C.yPercent ? "translate(" + C.xPercent + "%," + C.yPercent + "%) matrix3d(" : "matrix3d(", x += (m > e && e > -m ? w : e) + b + (m > i && i > -m ? w : i) + b + (m > o && o > -m ? w : o), x += b + (m > c && c > -m ? w : c) + b + (m > n && n > -m ? w : n) + b + (m > a && a > -m ? w : a), A || O ? (x += b + (m > l && l > -m ? w : l) + b + (m > h && h > -m ? w : h) + b + (m > r && r > -m ? w : r), x += b + (m > s && s > -m ? w : s) + b + (m > u && u > -m ? w : u) + b + (m > f && f > -m ? w : f) + b) : x += ",0,0,0,0,1,0,", x += R + b + E + b + F + b + (L ? 1 + -F / L : 1) + ")", S[kt] = x
                                };
                            c = At.prototype, c.x = c.y = c.z = c.skewX = c.skewY = c.rotation = c.rotationX = c.rotationY = c.zOrigin = c.xPercent = c.yPercent = c.xOffset = c.yOffset = 0, c.scaleX = c.scaleY = c.scaleZ = 1, xt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
                                parser: function(t, e, n, r, a, o, l) {
                                    if (r._lastParsedTransform === l) return a;
                                    r._lastParsedTransform = l;
                                    var u, c, h, f, p, d, m, g, v, y = t._gsTransform,
                                        _ = r._transform = It(t, i, !0, l.parseTransform),
                                        x = t.style,
                                        b = 1e-6,
                                        w = Tt.length,
                                        T = l,
                                        k = {},
                                        C = "transformOrigin";
                                    if ("string" == typeof T.transform && kt) h = z.style, h[kt] = T.transform, h.display = "block", h.position = "absolute", I.body.appendChild(z), u = It(z, null, !1), I.body.removeChild(z), null != T.xPercent && (u.xPercent = st(T.xPercent, _.xPercent)), null != T.yPercent && (u.yPercent = st(T.yPercent, _.yPercent));
                                    else if ("object" == typeof T) {
                                        if (u = {
                                                scaleX: st(null != T.scaleX ? T.scaleX : T.scale, _.scaleX),
                                                scaleY: st(null != T.scaleY ? T.scaleY : T.scale, _.scaleY),
                                                scaleZ: st(T.scaleZ, _.scaleZ),
                                                x: st(T.x, _.x),
                                                y: st(T.y, _.y),
                                                z: st(T.z, _.z),
                                                xPercent: st(T.xPercent, _.xPercent),
                                                yPercent: st(T.yPercent, _.yPercent),
                                                perspective: st(T.transformPerspective, _.perspective)
                                            }, m = T.directionalRotation, null != m)
                                            if ("object" == typeof m)
                                                for (h in m) T[h] = m[h];
                                            else T.rotation = m;
                                            "string" == typeof T.x && -1 !== T.x.indexOf("%") && (u.x = 0, u.xPercent = st(T.x, _.xPercent)), "string" == typeof T.y && -1 !== T.y.indexOf("%") && (u.y = 0, u.yPercent = st(T.y, _.yPercent)), u.rotation = ot("rotation" in T ? T.rotation : "shortRotation" in T ? T.shortRotation + "_short" : "rotationZ" in T ? T.rotationZ : _.rotation, _.rotation, "rotation", k), Pt && (u.rotationX = ot("rotationX" in T ? T.rotationX : "shortRotationX" in T ? T.shortRotationX + "_short" : _.rotationX || 0, _.rotationX, "rotationX", k), u.rotationY = ot("rotationY" in T ? T.rotationY : "shortRotationY" in T ? T.shortRotationY + "_short" : _.rotationY || 0, _.rotationY, "rotationY", k)), u.skewX = null == T.skewX ? _.skewX : ot(T.skewX, _.skewX), u.skewY = null == T.skewY ? _.skewY : ot(T.skewY, _.skewY), (c = u.skewY - _.skewY) && (u.skewX += c, u.rotation += c)
                                    }
                                    for (Pt && null != T.force3D && (_.force3D = T.force3D, d = !0), _.skewType = T.skewType || _.skewType || s.defaultSkewType, p = _.force3D || _.z || _.rotationX || _.rotationY || u.z || u.rotationX || u.rotationY || u.perspective, p || null == T.scale || (u.scaleZ = 1); --w > -1;) n = Tt[w], f = u[n] - _[n], (f > b || -b > f || null != T[n] || null != F[n]) && (d = !0, a = new mt(_, n, _[n], f, a), n in k && (a.e = k[n]), a.xs0 = 0, a.plugin = o, r._overwriteProps.push(a.n));
                                    return f = T.transformOrigin, _.svg && (f || T.svgOrigin) && (g = _.xOffset, v = _.yOffset, Rt(t, it(f), u, T.svgOrigin, T.smoothOrigin), a = gt(_, "xOrigin", (y ? _ : u).xOrigin, u.xOrigin, a, C), a = gt(_, "yOrigin", (y ? _ : u).yOrigin, u.yOrigin, a, C), (g !== _.xOffset || v !== _.yOffset) && (a = gt(_, "xOffset", y ? g : _.xOffset, _.xOffset, a, C), a = gt(_, "yOffset", y ? v : _.yOffset, _.yOffset, a, C)), f = wt ? null : "0px 0px"), (f || Pt && p && _.zOrigin) && (kt ? (d = !0, n = St, f = (f || Z(t, n, i, !1, "50% 50%")) + "", a = new mt(x, n, 0, 0, a, -1, C), a.b = x[n], a.plugin = o, Pt ? (h = _.zOrigin, f = f.split(" "), _.zOrigin = (f.length > 2 && (0 === h || "0px" !== f[2]) ? parseFloat(f[2]) : h) || 0, a.xs0 = a.e = f[0] + " " + (f[1] || "50%") + " 0px", a = new mt(_, "zOrigin", 0, 0, a, -1, a.n), a.b = h, a.xs0 = a.e = _.zOrigin) : a.xs0 = a.e = f) : it(f + "", _)), d && (r._transformType = _.svg && wt || !p && 3 !== this._transformType ? 2 : 3), a
                                },
                                prefix: !0
                            }), xt("boxShadow", {
                                defaultValue: "0px 0px 0px 0px #999",
                                prefix: !0,
                                color: !0,
                                multi: !0,
                                keyword: "inset"
                            }), xt("borderRadius", {
                                defaultValue: "0px",
                                parser: function(t, e, n, a, s, o) {
                                    e = this.format(e);
                                    var l, u, c, h, f, p, d, m, g, v, y, _, x, b, w, T, k = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                                        C = t.style;
                                    for (g = parseFloat(t.offsetWidth), v = parseFloat(t.offsetHeight), l = e.split(" "), u = 0; u < k.length; u++) this.p.indexOf("border") && (k[u] = W(k[u])), f = h = Z(t, k[u], i, !1, "0px"), -1 !== f.indexOf(" ") && (h = f.split(" "), f = h[0], h = h[1]), p = c = l[u], d = parseFloat(f), _ = f.substr((d + "").length), x = "=" === p.charAt(1), x ? (m = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), m *= parseFloat(p), y = p.substr((m + "").length - (0 > m ? 1 : 0)) || "") : (m = parseFloat(p), y = p.substr((m + "").length)), "" === y && (y = r[n] || _), y !== _ && (b = Q(t, "borderLeft", d, _), w = Q(t, "borderTop", d, _), "%" === y ? (f = b / g * 100 + "%", h = w / v * 100 + "%") : "em" === y ? (T = Q(t, "borderLeft", 1, "em"), f = b / T + "em", h = w / T + "em") : (f = b + "px", h = w + "px"), x && (p = parseFloat(f) + m + y, c = parseFloat(h) + m + y)), s = vt(C, k[u], f + " " + h, p + " " + c, !1, "0px", s);
                                    return s
                                },
                                prefix: !0,
                                formatter: ft("0px 0px 0px 0px", !1, !0)
                            }), xt("backgroundPosition", {
                                defaultValue: "0 0",
                                parser: function(t, e, n, r, a, s) {
                                    var o, l, u, c, h, f, p = "background-position",
                                        d = i || G(t, null),
                                        m = this.format((d ? g ? d.getPropertyValue(p + "-x") + " " + d.getPropertyValue(p + "-y") : d.getPropertyValue(p) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
                                        v = this.format(e);
                                    if (-1 !== m.indexOf("%") != (-1 !== v.indexOf("%")) && (f = Z(t, "backgroundImage").replace(A, ""), f && "none" !== f)) {
                                        for (o = m.split(" "), l = v.split(" "), B.setAttribute("src", f), u = 2; --u > -1;) m = o[u], c = -1 !== m.indexOf("%"), c !== (-1 !== l[u].indexOf("%")) && (h = 0 === u ? t.offsetWidth - B.width : t.offsetHeight - B.height, o[u] = c ? parseFloat(m) / 100 * h + "px" : parseFloat(m) / h * 100 + "%");
                                        m = o.join(" ")
                                    }
                                    return this.parseComplex(t.style, m, v, a, s)
                                },
                                formatter: it
                            }), xt("backgroundSize", {
                                defaultValue: "0 0",
                                formatter: it
                            }), xt("perspective", {
                                defaultValue: "0px",
                                prefix: !0
                            }), xt("perspectiveOrigin", {
                                defaultValue: "50% 50%",
                                prefix: !0
                            }), xt("transformStyle", {
                                prefix: !0
                            }), xt("backfaceVisibility", {
                                prefix: !0
                            }), xt("userSelect", {
                                prefix: !0
                            }), xt("margin", {
                                parser: pt("marginTop,marginRight,marginBottom,marginLeft")
                            }), xt("padding", {
                                parser: pt("paddingTop,paddingRight,paddingBottom,paddingLeft")
                            }), xt("clip", {
                                defaultValue: "rect(0px,0px,0px,0px)",
                                parser: function(t, e, n, r, a, s) {
                                    var o, l, u;
                                    return 9 > g ? (l = t.currentStyle, u = 8 > g ? " " : ",", o = "rect(" + l.clipTop + u + l.clipRight + u + l.clipBottom + u + l.clipLeft + ")", e = this.format(e).split(",").join(u)) : (o = this.format(Z(t, this.p, i, !1, this.dflt)), e = this.format(e)), this.parseComplex(t.style, o, e, a, s)
                                }
                            }), xt("textShadow", {
                                defaultValue: "0px 0px 0px #999",
                                color: !0,
                                multi: !0
                            }), xt("autoRound,strictUnits", {
                                parser: function(t, e, n, r, i) {
                                    return i
                                }
                            }), xt("border", {
                                defaultValue: "0px solid #000",
                                parser: function(t, e, n, r, a, s) {
                                    return this.parseComplex(t.style, this.format(Z(t, "borderTopWidth", i, !1, "0px") + " " + Z(t, "borderTopStyle", i, !1, "solid") + " " + Z(t, "borderTopColor", i, !1, "#000")), this.format(e), a, s)
                                },
                                color: !0,
                                formatter: function(t) {
                                    var e = t.split(" ");
                                    return e[0] + " " + (e[1] || "solid") + " " + (t.match(ht) || ["#000"])[0]
                                }
                            }), xt("borderWidth", {
                                parser: pt("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
                            }), xt("float,cssFloat,styleFloat", {
                                parser: function(t, e, n, r, i, a) {
                                    var s = t.style,
                                        o = "cssFloat" in s ? "cssFloat" : "styleFloat";
                                    return new mt(s, o, 0, 0, i, -1, n, !1, 0, s[o], e)
                                }
                            });
                            var Bt = function(t) {
                                var e, n = this.t,
                                    r = n.filter || Z(this.data, "filter") || "",
                                    i = this.s + this.c * t | 0;
                                100 === i && (-1 === r.indexOf("atrix(") && -1 === r.indexOf("radient(") && -1 === r.indexOf("oader(") ? (n.removeAttribute("filter"), e = !Z(this.data, "filter")) : (n.filter = r.replace(k, ""), e = !0)), e || (this.xn1 && (n.filter = r = r || "alpha(opacity=" + i + ")"), -1 === r.indexOf("pacity") ? 0 === i && this.xn1 || (n.filter = r + " alpha(opacity=" + i + ")") : n.filter = r.replace(w, "opacity=" + i))
                            };
                            xt("opacity,alpha,autoAlpha", {
                                defaultValue: "1",
                                parser: function(t, e, n, r, a, s) {
                                    var o = parseFloat(Z(t, "opacity", i, !1, "1")),
                                        l = t.style,
                                        u = "autoAlpha" === n;
                                    return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + o), u && 1 === o && "hidden" === Z(t, "visibility", i) && 0 !== e && (o = 0), H ? a = new mt(l, "opacity", o, e - o, a) : (a = new mt(l, "opacity", 100 * o, 100 * (e - o), a), a.xn1 = u ? 1 : 0, l.zoom = 1, a.type = 2, a.b = "alpha(opacity=" + a.s + ")", a.e = "alpha(opacity=" + (a.s + a.c) + ")", a.data = t, a.plugin = s, a.setRatio = Bt), u && (a = new mt(l, "visibility", 0, 0, a, -1, null, !1, 0, 0 !== o ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit"), a.xs0 = "inherit", r._overwriteProps.push(a.n), r._overwriteProps.push(n)), a
                                }
                            });
                            var qt = function(t, e) {
                                    e && (t.removeProperty ? (("ms" === e.substr(0, 2) || "webkit" === e.substr(0, 6)) && (e = "-" + e), t.removeProperty(e.replace(S, "-$1").toLowerCase())) : t.removeAttribute(e))
                                },
                                Xt = function(t) {
                                    if (this.t._gsClassPT = this, 1 === t || 0 === t) {
                                        this.t.setAttribute("class", 0 === t ? this.b : this.e);
                                        for (var e = this.data, n = this.t.style; e;) e.v ? n[e.p] = e.v : qt(n, e.p), e = e._next;
                                        1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                                    } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
                                };
                            xt("className", {
                                parser: function(t, e, r, a, s, o, l) {
                                    var u, c, h, f, p, d = t.getAttribute("class") || "",
                                        m = t.style.cssText;
                                    if (s = a._classNamePT = new mt(t, r, 0, 0, s, 2), s.setRatio = Xt, s.pr = -11, n = !0, s.b = d, c = K(t, i), h = t._gsClassPT) {
                                        for (f = {}, p = h.data; p;) f[p.p] = 1, p = p._next;
                                        h.setRatio(1)
                                    }
                                    return t._gsClassPT = s, s.e = "=" !== e.charAt(1) ? e : d.replace(new RegExp("\\s*\\b" + e.substr(2) + "\\b"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""), t.setAttribute("class", s.e), u = tt(t, c, K(t), l, f), t.setAttribute("class", d), s.data = u.firstMPT, t.style.cssText = m, s = s.xfirst = a.parse(t, u.difs, s, o)
                                }
                            });
                            var Ht = function(t) {
                                if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                                    var e, n, r, i, a, s = this.t.style,
                                        o = u.transform.parse;
                                    if ("all" === this.e) s.cssText = "", i = !0;
                                    else
                                        for (e = this.e.split(" ").join("").split(","), r = e.length; --r > -1;) n = e[r], u[n] && (u[n].parse === o ? i = !0 : n = "transformOrigin" === n ? St : u[n].p), qt(s, n);
                                    i && (qt(s, kt), a = this.t._gsTransform, a && (a.svg && this.t.removeAttribute("data-svg-origin"), delete this.t._gsTransform))
                                }
                            };
                            for (xt("clearProps", {
                                    parser: function(t, e, r, i, a) {
                                        return a = new mt(t, r, 0, 0, a, 2), a.setRatio = Ht, a.e = e, a.pr = -10, a.data = i._tween, n = !0, a
                                    }
                                }), c = "bezier,throwProps,physicsProps,physics2D".split(","), yt = c.length; yt--;) bt(c[yt]);
                            c = s.prototype, c._firstPT = c._lastParsedTransform = c._transform = null, c._onInitTween = function(t, e, o) {
                                if (!t.nodeType) return !1;
                                this._target = t, this._tween = o, this._vars = e, h = e.autoRound, n = !1, r = e.suffixMap || s.suffixMap, i = G(t, ""), a = this._overwriteProps;
                                var l, c, d, g, v, y, _, x, b, w = t.style;
                                if (f && "" === w.zIndex && (l = Z(t, "zIndex", i), ("auto" === l || "" === l) && this._addLazySet(w, "zIndex", 0)), "string" == typeof e && (g = w.cssText, l = K(t, i), w.cssText = g + ";" + e, l = tt(t, l, K(t)).difs, !H && T.test(e) && (l.opacity = parseFloat(RegExp.$1)), e = l, w.cssText = g), e.className ? this._firstPT = c = u.className.parse(t, e.className, "className", this, null, null, e) : this._firstPT = c = this.parse(t, e, null), this._transformType) {
                                    for (b = 3 === this._transformType, kt ? p && (f = !0, "" === w.zIndex && (_ = Z(t, "zIndex", i), ("auto" === _ || "" === _) && this._addLazySet(w, "zIndex", 0)), m && this._addLazySet(w, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (b ? "visible" : "hidden"))) : w.zoom = 1, d = c; d && d._next;) d = d._next;
                                    x = new mt(t, "transform", 0, 0, null, 2), this._linkCSSP(x, null, d), x.setRatio = kt ? zt : Lt, x.data = this._transform || It(t, i, !0), x.tween = o, x.pr = -1, a.pop()
                                }
                                if (n) {
                                    for (; c;) {
                                        for (y = c._next, d = g; d && d.pr > c.pr;) d = d._next;
                                        (c._prev = d ? d._prev : v) ? c._prev._next = c: g = c, (c._next = d) ? d._prev = c : v = c, c = y
                                    }
                                    this._firstPT = g
                                }
                                return !0
                            }, c.parse = function(t, e, n, a) {
                                var s, o, l, c, f, p, d, m, g, v, y = t.style;
                                for (s in e) p = e[s], o = u[s], o ? n = o.parse(t, p, s, this, n, a, e) : (f = Z(t, s, i) + "", g = "string" == typeof p, "color" === s || "fill" === s || "stroke" === s || -1 !== s.indexOf("Color") || g && C.test(p) ? (g || (p = ct(p), p = (p.length > 3 ? "rgba(" : "rgb(") + p.join(",") + ")"), n = vt(y, s, f, p, !0, "transparent", n, 0, a)) : !g || -1 === p.indexOf(" ") && -1 === p.indexOf(",") ? (l = parseFloat(f), d = l || 0 === l ? f.substr((l + "").length) : "", ("" === f || "auto" === f) && ("width" === s || "height" === s ? (l = rt(t, s, i), d = "px") : "left" === s || "top" === s ? (l = J(t, s, i), d = "px") : (l = "opacity" !== s ? 0 : 1, d = "")), v = g && "=" === p.charAt(1), v ? (c = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), c *= parseFloat(p), m = p.replace(b, "")) : (c = parseFloat(p), m = g ? p.replace(b, "") : ""), "" === m && (m = s in r ? r[s] : d), p = c || 0 === c ? (v ? c + l : c) + m : e[s], d !== m && "" !== m && (c || 0 === c) && l && (l = Q(t, s, l, d), "%" === m ? (l /= Q(t, s, 100, "%") / 100, e.strictUnits !== !0 && (f = l + "%")) : "em" === m ? l /= Q(t, s, 1, "em") : "px" !== m && (c = Q(t, s, c, m), m = "px"), v && (c || 0 === c) && (p = c + l + m)), v && (c += l), !l && 0 !== l || !c && 0 !== c ? void 0 !== y[s] && (p || p + "" != "NaN" && null != p) ? (n = new mt(y, s, c || l || 0, 0, n, -1, s, !1, 0, f, p), n.xs0 = "none" !== p || "display" !== s && -1 === s.indexOf("Style") ? p : f) : $("invalid " + s + " tween value: " + e[s]) : (n = new mt(y, s, l, c - l, n, 0, s, h !== !1 && ("px" === m || "zIndex" === s), 0, f, p), n.xs0 = m)) : n = vt(y, s, f, p, !0, null, n, 0, a)), a && n && !n.plugin && (n.plugin = a);
                                return n
                            }, c.setRatio = function(t) {
                                var e, n, r, i = this._firstPT,
                                    a = 1e-6;
                                if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                                    if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                                        for (; i;) {
                                            if (e = i.c * t + i.s, i.r ? e = Math.round(e) : a > e && e > -a && (e = 0), i.type)
                                                if (1 === i.type)
                                                    if (r = i.l, 2 === r) i.t[i.p] = i.xs0 + e + i.xs1 + i.xn1 + i.xs2;
                                                    else if (3 === r) i.t[i.p] = i.xs0 + e + i.xs1 + i.xn1 + i.xs2 + i.xn2 + i.xs3;
                                            else if (4 === r) i.t[i.p] = i.xs0 + e + i.xs1 + i.xn1 + i.xs2 + i.xn2 + i.xs3 + i.xn3 + i.xs4;
                                            else if (5 === r) i.t[i.p] = i.xs0 + e + i.xs1 + i.xn1 + i.xs2 + i.xn2 + i.xs3 + i.xn3 + i.xs4 + i.xn4 + i.xs5;
                                            else {
                                                for (n = i.xs0 + e + i.xs1, r = 1; r < i.l; r++) n += i["xn" + r] + i["xs" + (r + 1)];
                                                i.t[i.p] = n
                                            } else -1 === i.type ? i.t[i.p] = i.xs0 : i.setRatio && i.setRatio(t);
                                            else i.t[i.p] = e + i.xs0;
                                            i = i._next
                                        } else
                                            for (; i;) 2 !== i.type ? i.t[i.p] = i.b : i.setRatio(t), i = i._next;
                                    else
                                        for (; i;) {
                                            if (2 !== i.type)
                                                if (i.r && -1 !== i.type)
                                                    if (e = Math.round(i.s + i.c), i.type) {
                                                        if (1 === i.type) {
                                                            for (r = i.l, n = i.xs0 + e + i.xs1, r = 1; r < i.l; r++) n += i["xn" + r] + i["xs" + (r + 1)];
                                                            i.t[i.p] = n
                                                        }
                                                    } else i.t[i.p] = e + i.xs0;
                                            else i.t[i.p] = i.e;
                                            else i.setRatio(t);
                                            i = i._next
                                        }
                            }, c._enableTransforms = function(t) {
                                this._transform = this._transform || It(this._target, i, !0), this._transformType = this._transform.svg && wt || !t && 3 !== this._transformType ? 2 : 3
                            };
                            var Vt = function(t) {
                                this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
                            };
                            c._addLazySet = function(t, e, n) {
                                var r = this._firstPT = new mt(t, e, 0, 0, this._firstPT, 2);
                                r.e = n, r.setRatio = Vt, r.data = this
                            }, c._linkCSSP = function(t, e, n, r) {
                                return t && (e && (e._prev = t), t._next && (t._next._prev = t._prev), t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next, r = !0), n ? n._next = t : r || null !== this._firstPT || (this._firstPT = t), t._next = e, t._prev = n), t
                            }, c._kill = function(e) {
                                var n, r, i, a = e;
                                if (e.autoAlpha || e.alpha) {
                                    a = {};
                                    for (r in e) a[r] = e[r];
                                    a.opacity = 1, a.autoAlpha && (a.visibility = 1)
                                }
                                return e.className && (n = this._classNamePT) && (i = n.xfirst, i && i._prev ? this._linkCSSP(i._prev, n._next, i._prev._prev) : i === this._firstPT && (this._firstPT = n._next), n._next && this._linkCSSP(n._next, n._next._next, i._prev), this._classNamePT = null), t.prototype._kill.call(this, a)
                            };
                            var $t = function(t, e, n) {
                                var r, i, a, s;
                                if (t.slice)
                                    for (i = t.length; --i > -1;) $t(t[i], e, n);
                                else
                                    for (r = t.childNodes, i = r.length; --i > -1;) a = r[i], s = a.type, a.style && (e.push(K(a)), n && n.push(a)), 1 !== s && 9 !== s && 11 !== s || !a.childNodes.length || $t(a, e, n)
                            };
                            return s.cascadeTo = function(t, n, r) {
                                var i, a, s, o, l = e.to(t, n, r),
                                    u = [l],
                                    c = [],
                                    h = [],
                                    f = [],
                                    p = e._internals.reservedProps;
                                for (t = l._targets || l.target, $t(t, c, f), l.render(n, !0, !0), $t(t, h), l.render(0, !0, !0), l._enabled(!0), i = f.length; --i > -1;)
                                    if (a = tt(f[i], c[i], h[i]), a.firstMPT) {
                                        a = a.difs;
                                        for (s in r) p[s] && (a[s] = r[s]);
                                        o = {};
                                        for (s in a) o[s] = c[i][s];
                                        u.push(e.fromTo(f[i], n, o, a))
                                    }
                                return u
                            }, t.activate([s]), s
                        }, !0)
                    }), o._gsDefine && o._gsQueue.pop()(),
                    function(e) {
                        "use strict";
                        var n = function() {
                            return (o.GreenSockGlobals || o)[e]
                        };
                        "function" == typeof a && a.amd ? a(["TweenLite"], n) : "undefined" != typeof t && t.exports && (r("../TweenLite.js"), t.exports = n())
                    }("CSSPlugin"), s("undefined" != typeof css_plugin ? css_plugin : window.css_plugin)
            }).call(n, void 0, void 0, void 0, void 0, function(t) {
                e.exports = t
            })
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    6: [function(t, e, n) {
        "use strict";

        function r() {
            var t = new s.HandlebarsEnvironment;
            return f.extend(t, s), t.SafeString = l["default"], t.Exception = c["default"], t.Utils = f, t.escapeExpression = f.escapeExpression, t.VM = d, t.template = function(e) {
                return d.template(e, t)
            }, t
        }
        var i = function(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        };
        n.__esModule = !0;
        var a = t("./handlebars/base"),
            s = i(a),
            o = t("./handlebars/safe-string"),
            l = i(o),
            u = t("./handlebars/exception"),
            c = i(u),
            h = t("./handlebars/utils"),
            f = i(h),
            p = t("./handlebars/runtime"),
            d = i(p),
            m = t("./handlebars/no-conflict"),
            g = i(m),
            v = r();
        v.create = r, g["default"](v), v["default"] = v, n["default"] = v, e.exports = n["default"]
    }, {
        "./handlebars/base": 7,
        "./handlebars/exception": 8,
        "./handlebars/no-conflict": 9,
        "./handlebars/runtime": 10,
        "./handlebars/safe-string": 11,
        "./handlebars/utils": 12
    }],
    7: [function(t, e, n) {
        "use strict";

        function r(t, e) {
            this.helpers = t || {}, this.partials = e || {}, i(this)
        }

        function i(t) {
            t.registerHelper("helperMissing", function() {
                if (1 === arguments.length) return void 0;
                throw new c["default"]('Missing helper: "' + arguments[arguments.length - 1].name + '"')
            }), t.registerHelper("blockHelperMissing", function(e, n) {
                var r = n.inverse,
                    i = n.fn;
                if (e === !0) return i(this);
                if (e === !1 || null == e) return r(this);
                if (d(e)) return e.length > 0 ? (n.ids && (n.ids = [n.name]), t.helpers.each(e, n)) : r(this);
                if (n.data && n.ids) {
                    var s = a(n.data);
                    s.contextPath = l.appendContextPath(n.data.contextPath, n.name), n = {
                        data: s
                    }
                }
                return i(e, n)
            }), t.registerHelper("each", function(t, e) {
                function n(e, n, i) {
                    u && (u.key = e, u.index = n, u.first = 0 === n, u.last = !!i, h && (u.contextPath = h + e)), o += r(t[e], {
                        data: u,
                        blockParams: l.blockParams([t[e], e], [h + e, null])
                    })
                }
                if (!e) throw new c["default"]("Must pass iterator to #each");
                var r = e.fn,
                    i = e.inverse,
                    s = 0,
                    o = "",
                    u = void 0,
                    h = void 0;
                if (e.data && e.ids && (h = l.appendContextPath(e.data.contextPath, e.ids[0]) + "."), m(t) && (t = t.call(this)), e.data && (u = a(e.data)), t && "object" == typeof t)
                    if (d(t))
                        for (var f = t.length; f > s; s++) n(s, s, s === t.length - 1);
                    else {
                        var p = void 0;
                        for (var g in t) t.hasOwnProperty(g) && (p && n(p, s - 1), p = g, s++);
                        p && n(p, s - 1, !0)
                    }
                return 0 === s && (o = i(this)), o
            }), t.registerHelper("if", function(t, e) {
                return m(t) && (t = t.call(this)), !e.hash.includeZero && !t || l.isEmpty(t) ? e.inverse(this) : e.fn(this)
            }), t.registerHelper("unless", function(e, n) {
                return t.helpers["if"].call(this, e, {
                    fn: n.inverse,
                    inverse: n.fn,
                    hash: n.hash
                })
            }), t.registerHelper("with", function(t, e) {
                m(t) && (t = t.call(this));
                var n = e.fn;
                if (l.isEmpty(t)) return e.inverse(this);
                if (e.data && e.ids) {
                    var r = a(e.data);
                    r.contextPath = l.appendContextPath(e.data.contextPath, e.ids[0]), e = {
                        data: r
                    }
                }
                return n(t, e)
            }), t.registerHelper("log", function(e, n) {
                var r = n.data && null != n.data.level ? parseInt(n.data.level, 10) : 1;
                t.log(r, e)
            }), t.registerHelper("lookup", function(t, e) {
                return t && t[e]
            })
        }

        function a(t) {
            var e = l.extend({}, t);
            return e._parent = t, e
        }
        var s = function(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        };
        n.__esModule = !0, n.HandlebarsEnvironment = r, n.createFrame = a;
        var o = t("./utils"),
            l = s(o),
            u = t("./exception"),
            c = s(u),
            h = "3.0.1";
        n.VERSION = h;
        var f = 6;
        n.COMPILER_REVISION = f;
        var p = {
            1: "<= 1.0.rc.2",
            2: "== 1.0.0-rc.3",
            3: "== 1.0.0-rc.4",
            4: "== 1.x.x",
            5: "== 2.0.0-alpha.x",
            6: ">= 2.0.0-beta.1"
        };
        n.REVISION_CHANGES = p;
        var d = l.isArray,
            m = l.isFunction,
            g = l.toString,
            v = "[object Object]";
        r.prototype = {
            constructor: r,
            logger: y,
            log: _,
            registerHelper: function(t, e) {
                if (g.call(t) === v) {
                    if (e) throw new c["default"]("Arg not supported with multiple helpers");
                    l.extend(this.helpers, t)
                } else this.helpers[t] = e
            },
            unregisterHelper: function(t) {
                delete this.helpers[t]
            },
            registerPartial: function(t, e) {
                if (g.call(t) === v) l.extend(this.partials, t);
                else {
                    if ("undefined" == typeof e) throw new c["default"]("Attempting to register a partial as undefined");
                    this.partials[t] = e
                }
            },
            unregisterPartial: function(t) {
                delete this.partials[t]
            }
        };
        var y = {
            methodMap: {
                0: "debug",
                1: "info",
                2: "warn",
                3: "error"
            },
            DEBUG: 0,
            INFO: 1,
            WARN: 2,
            ERROR: 3,
            level: 1,
            log: function(t, e) {
                if ("undefined" != typeof console && y.level <= t) {
                    var n = y.methodMap[t];
                    (console[n] || console.log).call(console, e)
                }
            }
        };
        n.logger = y;
        var _ = y.log;
        n.log = _
    }, {
        "./exception": 8,
        "./utils": 12
    }],
    8: [function(t, e, n) {
        "use strict";

        function r(t, e) {
            var n = e && e.loc,
                a = void 0,
                s = void 0;
            n && (a = n.start.line, s = n.start.column, t += " - " + a + ":" + s);
            for (var o = Error.prototype.constructor.call(this, t), l = 0; l < i.length; l++) this[i[l]] = o[i[l]];
            Error.captureStackTrace && Error.captureStackTrace(this, r), n && (this.lineNumber = a, this.column = s)
        }
        n.__esModule = !0;
        var i = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
        r.prototype = new Error, n["default"] = r, e.exports = n["default"]
    }, {}],
    9: [function(t, e, n) {
        (function(t) {
            "use strict";
            n.__esModule = !0, n["default"] = function(e) {
                var n = "undefined" != typeof t ? t : window,
                    r = n.Handlebars;
                e.noConflict = function() {
                    n.Handlebars === e && (n.Handlebars = r)
                }
            }, e.exports = n["default"]
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    10: [function(t, e, n) {
        "use strict";

        function r(t) {
            var e = t && t[0] || 1,
                n = m.COMPILER_REVISION;
            if (e !== n) {
                if (n > e) {
                    var r = m.REVISION_CHANGES[n],
                        i = m.REVISION_CHANGES[e];
                    throw new d["default"]("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + r + ") or downgrade your runtime to an older version (" + i + ").")
                }
                throw new d["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + t[1] + ").")
            }
        }

        function i(t, e) {
            function n(n, r, i) {
                i.hash && (r = f.extend({}, r, i.hash)), n = e.VM.resolvePartial.call(this, n, r, i);
                var a = e.VM.invokePartial.call(this, n, r, i);
                if (null == a && e.compile && (i.partials[i.name] = e.compile(n, t.compilerOptions, e), a = i.partials[i.name](r, i)), null != a) {
                    if (i.indent) {
                        for (var s = a.split("\n"), o = 0, l = s.length; l > o && (s[o] || o + 1 !== l); o++) s[o] = i.indent + s[o];
                        a = s.join("\n")
                    }
                    return a
                }
                throw new d["default"]("The partial " + i.name + " could not be compiled when running in runtime-only mode")
            }

            function r(e) {
                var n = void 0 === arguments[1] ? {} : arguments[1],
                    a = n.data;
                r._setup(n), !n.partial && t.useData && (a = u(e, a));
                var s = void 0,
                    o = t.useBlockParams ? [] : void 0;
                return t.useDepths && (s = n.depths ? [e].concat(n.depths) : [e]), t.main.call(i, e, i.helpers, i.partials, a, o, s)
            }
            if (!e) throw new d["default"]("No environment passed to template");
            if (!t || !t.main) throw new d["default"]("Unknown template object: " + typeof t);
            e.VM.checkRevision(t.compiler);
            var i = {
                strict: function(t, e) {
                    if (!(e in t)) throw new d["default"]('"' + e + '" not defined in ' + t);
                    return t[e]
                },
                lookup: function(t, e) {
                    for (var n = t.length, r = 0; n > r; r++)
                        if (t[r] && null != t[r][e]) return t[r][e]
                },
                lambda: function(t, e) {
                    return "function" == typeof t ? t.call(e) : t
                },
                escapeExpression: f.escapeExpression,
                invokePartial: n,
                fn: function(e) {
                    return t[e]
                },
                programs: [],
                program: function(t, e, n, r, i) {
                    var s = this.programs[t],
                        o = this.fn(t);
                    return e || i || r || n ? s = a(this, t, o, e, n, r, i) : s || (s = this.programs[t] = a(this, t, o)), s
                },
                data: function(t, e) {
                    for (; t && e--;) t = t._parent;
                    return t
                },
                merge: function(t, e) {
                    var n = t || e;
                    return t && e && t !== e && (n = f.extend({}, e, t)), n
                },
                noop: e.VM.noop,
                compilerInfo: t.compiler
            };
            return r.isTop = !0, r._setup = function(n) {
                n.partial ? (i.helpers = n.helpers, i.partials = n.partials) : (i.helpers = i.merge(n.helpers, e.helpers), t.usePartial && (i.partials = i.merge(n.partials, e.partials)))
            }, r._child = function(e, n, r, s) {
                if (t.useBlockParams && !r) throw new d["default"]("must pass block params");
                if (t.useDepths && !s) throw new d["default"]("must pass parent depths");
                return a(i, e, t[e], n, 0, r, s)
            }, r
        }

        function a(t, e, n, r, i, a, s) {
            function o(e) {
                var i = void 0 === arguments[1] ? {} : arguments[1];
                return n.call(t, e, t.helpers, t.partials, i.data || r, a && [i.blockParams].concat(a), s && [e].concat(s))
            }
            return o.program = e, o.depth = s ? s.length : 0, o.blockParams = i || 0, o
        }

        function s(t, e, n) {
            return t ? t.call || n.name || (n.name = t, t = n.partials[t]) : t = n.partials[n.name], t
        }

        function o(t, e, n) {
            if (n.partial = !0, void 0 === t) throw new d["default"]("The partial " + n.name + " could not be found");
            return t instanceof Function ? t(e, n) : void 0
        }

        function l() {
            return ""
        }

        function u(t, e) {
            return e && "root" in e || (e = e ? m.createFrame(e) : {}, e.root = t), e
        }
        var c = function(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        };
        n.__esModule = !0, n.checkRevision = r, n.template = i, n.wrapProgram = a, n.resolvePartial = s, n.invokePartial = o, n.noop = l;
        var h = t("./utils"),
            f = c(h),
            p = t("./exception"),
            d = c(p),
            m = t("./base")
    }, {
        "./base": 7,
        "./exception": 8,
        "./utils": 12
    }],
    11: [function(t, e, n) {
        "use strict";

        function r(t) {
            this.string = t
        }
        n.__esModule = !0, r.prototype.toString = r.prototype.toHTML = function() {
            return "" + this.string
        }, n["default"] = r, e.exports = n["default"]
    }, {}],
    12: [function(t, e, n) {
        "use strict";

        function r(t) {
            return c[t]
        }

        function i(t) {
            for (var e = 1; e < arguments.length; e++)
                for (var n in arguments[e]) Object.prototype.hasOwnProperty.call(arguments[e], n) && (t[n] = arguments[e][n]);
            return t
        }

        function a(t, e) {
            for (var n = 0, r = t.length; r > n; n++)
                if (t[n] === e) return n;
            return -1
        }

        function s(t) {
            if ("string" != typeof t) {
                if (t && t.toHTML) return t.toHTML();
                if (null == t) return "";
                if (!t) return t + "";
                t = "" + t
            }
            return f.test(t) ? t.replace(h, r) : t
        }

        function o(t) {
            return t || 0 === t ? m(t) && 0 === t.length ? !0 : !1 : !0
        }

        function l(t, e) {
            return t.path = e, t
        }

        function u(t, e) {
            return (t ? t + "." : "") + e
        }
        n.__esModule = !0, n.extend = i, n.indexOf = a, n.escapeExpression = s, n.isEmpty = o, n.blockParams = l, n.appendContextPath = u;
        var c = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;"
            },
            h = /[&<>"'`]/g,
            f = /[&<>"'`]/,
            p = Object.prototype.toString;
        n.toString = p;
        var d = function(t) {
            return "function" == typeof t
        };
        d(/x/) && (n.isFunction = d = function(t) {
            return "function" == typeof t && "[object Function]" === p.call(t)
        });
        var d;
        n.isFunction = d;
        var m = Array.isArray || function(t) {
            return t && "object" == typeof t ? "[object Array]" === p.call(t) : !1
        };
        n.isArray = m
    }, {}],
    13: [function(t, e, n) {
        e.exports = t("./dist/cjs/handlebars.runtime")["default"]
    }, {
        "./dist/cjs/handlebars.runtime": 6
    }],
    14: [function(t, e, n) {
        e.exports = t("handlebars/runtime")["default"]
    }, {
        "handlebars/runtime": 13
    }],
    15: [function(t, e, n) {
        window.matchMedia || (window.matchMedia = function() {
                "use strict";
                var t = window.styleMedia || window.media;
                if (!t) {
                    var e = document.createElement("style"),
                        n = document.getElementsByTagName("script")[0],
                        r = null;
                    e.type = "text/css", e.id = "matchmediajs-test", n.parentNode.insertBefore(e, n), r = "getComputedStyle" in window && window.getComputedStyle(e, null) || e.currentStyle, t = {
                        matchMedium: function(t) {
                            var n = "@media " + t + "{ #matchmediajs-test { width: 1px; } }";
                            return e.styleSheet ? e.styleSheet.cssText = n : e.textContent = n, "1px" === r.width
                        }
                    }
                }
                return function(e) {
                    return {
                        matches: t.matchMedium(e || "all"),
                        media: e || "all"
                    }
                }
            }()),
            function(t, n, r) {
                "use strict";

                function i(n) {
                    "object" == typeof e && "object" == typeof e.exports ? e.exports = n : "function" == typeof define && define.amd && define("picturefill", function() {
                        return n
                    }), "object" == typeof t && (t.picturefill = n)
                }

                function a(t) {
                    var e, n, r, i, a, s = t || {};
                    e = s.elements || o.getAllElements();
                    for (var u = 0, c = e.length; c > u; u++)
                        if (n = e[u], r = n.parentNode, i = void 0, a = void 0, "IMG" === n.nodeName.toUpperCase() && (n[o.ns] || (n[o.ns] = {}), s.reevaluate || !n[o.ns].evaluated)) {
                            if (r && "PICTURE" === r.nodeName.toUpperCase()) {
                                if (o.removeVideoShim(r), i = o.getMatch(n, r), i === !1) continue
                            } else i = void 0;
                            (r && "PICTURE" === r.nodeName.toUpperCase() || !o.sizesSupported && n.srcset && l.test(n.srcset)) && o.dodgeSrcset(n), i ? (a = o.processSourceSet(i), o.applyBestCandidate(a, n)) : (a = o.processSourceSet(n), (void 0 === n.srcset || n[o.ns].srcset) && o.applyBestCandidate(a, n)), n[o.ns].evaluated = !0
                        }
                }

                function s() {
                    function e() {
                        clearTimeout(r), r = setTimeout(s, 60)
                    }
                    o.initTypeDetects(), a();
                    var r, i = setInterval(function() {
                            return a(), /^loaded|^i|^c/.test(n.readyState) ? void clearInterval(i) : void 0
                        }, 250),
                        s = function() {
                            a({
                                reevaluate: !0
                            })
                        };
                    t.addEventListener ? t.addEventListener("resize", e, !1) : t.attachEvent && t.attachEvent("onresize", e)
                }
                if (t.HTMLPictureElement) return void i(function() {});
                n.createElement("picture");
                var o = t.picturefill || {},
                    l = /\s+\+?\d+(e\d+)?w/;
                o.ns = "picturefill",
                    function() {
                        o.srcsetSupported = "srcset" in r, o.sizesSupported = "sizes" in r, o.curSrcSupported = "currentSrc" in r
                    }(), o.trim = function(t) {
                        return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
                    }, o.makeUrl = function() {
                        var t = n.createElement("a");
                        return function(e) {
                            return t.href = e, t.href
                        }
                    }(), o.restrictsMixedContent = function() {
                        return "https:" === t.location.protocol
                    }, o.matchesMedia = function(e) {
                        return t.matchMedia && t.matchMedia(e).matches
                    }, o.getDpr = function() {
                        return t.devicePixelRatio || 1
                    }, o.getWidthFromLength = function(t) {
                        var e;
                        if (!t || t.indexOf("%") > -1 != !1 || !(parseFloat(t) > 0 || t.indexOf("calc(") > -1)) return !1;
                        t = t.replace("vw", "%"), o.lengthEl || (o.lengthEl = n.createElement("div"), o.lengthEl.style.cssText = "border:0;display:block;font-size:1em;left:0;margin:0;padding:0;position:absolute;visibility:hidden", o.lengthEl.className = "helper-from-picturefill-js"), o.lengthEl.style.width = "0px";
                        try {
                            o.lengthEl.style.width = t
                        } catch (r) {}
                        return n.body.appendChild(o.lengthEl), e = o.lengthEl.offsetWidth, 0 >= e && (e = !1), n.body.removeChild(o.lengthEl), e
                    }, o.detectTypeSupport = function(e, n) {
                        var r = new t.Image;
                        return r.onerror = function() {
                            o.types[e] = !1, a()
                        }, r.onload = function() {
                            o.types[e] = 1 === r.width, a()
                        }, r.src = n, "pending"
                    }, o.types = o.types || {}, o.initTypeDetects = function() {
                        o.types["image/jpeg"] = !0, o.types["image/gif"] = !0, o.types["image/png"] = !0, o.types["image/svg+xml"] = n.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1"), o.types["image/webp"] = o.detectTypeSupport("image/webp", "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=")
                    }, o.verifyTypeSupport = function(t) {
                        var e = t.getAttribute("type");
                        if (null === e || "" === e) return !0;
                        var n = o.types[e];
                        return "string" == typeof n && "pending" !== n ? (o.types[e] = o.detectTypeSupport(e, n), "pending") : "function" == typeof n ? (n(), "pending") : n
                    }, o.parseSize = function(t) {
                        var e = /(\([^)]+\))?\s*(.+)/g.exec(t);
                        return {
                            media: e && e[1],
                            length: e && e[2]
                        }
                    }, o.findWidthFromSourceSize = function(e) {
                        for (var r, i = o.trim(e).split(/\s*,\s*/), a = 0, s = i.length; s > a; a++) {
                            var l = i[a],
                                u = o.parseSize(l),
                                c = u.length,
                                h = u.media;
                            if (c && (!h || o.matchesMedia(h)) && (r = o.getWidthFromLength(c))) break
                        }
                        return r || Math.max(t.innerWidth || 0, n.documentElement.clientWidth)
                    }, o.parseSrcset = function(t) {
                        for (var e = [];
                            "" !== t;) {
                            t = t.replace(/^\s+/g, "");
                            var n, r = t.search(/\s/g),
                                i = null;
                            if (-1 !== r) {
                                n = t.slice(0, r);
                                var a = n.slice(-1);
                                if (("," === a || "" === n) && (n = n.replace(/,+$/, ""), i = ""), t = t.slice(r + 1), null === i) {
                                    var s = t.indexOf(","); - 1 !== s ? (i = t.slice(0, s), t = t.slice(s + 1)) : (i = t, t = "")
                                }
                            } else n = t, t = "";
                            (n || i) && e.push({
                                url: n,
                                descriptor: i
                            })
                        }
                        return e
                    }, o.parseDescriptor = function(t, e) {
                        var n, r = e || "100vw",
                            i = t && t.replace(/(^\s+|\s+$)/g, ""),
                            a = o.findWidthFromSourceSize(r);
                        if (i)
                            for (var s = i.split(" "), l = s.length - 1; l >= 0; l--) {
                                var u = s[l],
                                    c = u && u.slice(u.length - 1);
                                if ("h" !== c && "w" !== c || o.sizesSupported) {
                                    if ("x" === c) {
                                        var h = u && parseFloat(u, 10);
                                        n = h && !isNaN(h) ? h : 1
                                    }
                                } else n = parseFloat(parseInt(u, 10) / a)
                            }
                        return n || 1
                    }, o.getCandidatesFromSourceSet = function(t, e) {
                        for (var n = o.parseSrcset(t), r = [], i = 0, a = n.length; a > i; i++) {
                            var s = n[i];
                            r.push({
                                url: s.url,
                                resolution: o.parseDescriptor(s.descriptor, e)
                            })
                        }
                        return r
                    }, o.dodgeSrcset = function(t) {
                        t.srcset && (t[o.ns].srcset = t.srcset, t.srcset = "", t.setAttribute("data-pfsrcset", t[o.ns].srcset))
                    }, o.processSourceSet = function(t) {
                        var e = t.getAttribute("srcset"),
                            n = t.getAttribute("sizes"),
                            r = [];
                        return "IMG" === t.nodeName.toUpperCase() && t[o.ns] && t[o.ns].srcset && (e = t[o.ns].srcset), e && (r = o.getCandidatesFromSourceSet(e, n)), r
                    }, o.backfaceVisibilityFix = function(t) {
                        var e = t.style || {},
                            n = "webkitBackfaceVisibility" in e,
                            r = e.zoom;
                        n && (e.zoom = ".999", n = t.offsetWidth, e.zoom = r)
                    }, o.setIntrinsicSize = function() {
                        var e = {},
                            r = function(t, e, n) {
                                e && t.setAttribute("width", parseInt(e / n, 10))
                            };
                        return function(i, a) {
                            var s;
                            i[o.ns] && !t.pfStopIntrinsicSize && (void 0 === i[o.ns].dims && (i[o.ns].dims = i.getAttribute("width") || i.getAttribute("height")), i[o.ns].dims || (a.url in e ? r(i, e[a.url], a.resolution) : (s = n.createElement("img"), s.onload = function() {
                                if (e[a.url] = s.width, !e[a.url]) try {
                                    n.body.appendChild(s), e[a.url] = s.width || s.offsetWidth, n.body.removeChild(s)
                                } catch (t) {}
                                i.src === a.url && r(i, e[a.url], a.resolution), i = null, s.onload = null, s = null
                            }, s.src = a.url)))
                        }
                    }(), o.applyBestCandidate = function(t, e) {
                        var n, r, i;
                        t.sort(o.ascendingSort), r = t.length, i = t[r - 1];
                        for (var a = 0; r > a; a++)
                            if (n = t[a], n.resolution >= o.getDpr()) {
                                i = n;
                                break
                            }
                        i && (i.url = o.makeUrl(i.url), e.src !== i.url && (o.restrictsMixedContent() && "http:" === i.url.substr(0, "http:".length).toLowerCase() ? void 0 !== window.console && console.warn("Blocked mixed content image " + i.url) : (e.src = i.url, o.curSrcSupported || (e.currentSrc = e.src), o.backfaceVisibilityFix(e))), o.setIntrinsicSize(e, i))
                    }, o.ascendingSort = function(t, e) {
                        return t.resolution - e.resolution
                    }, o.removeVideoShim = function(t) {
                        var e = t.getElementsByTagName("video");
                        if (e.length) {
                            for (var n = e[0], r = n.getElementsByTagName("source"); r.length;) t.insertBefore(r[0], n);
                            n.parentNode.removeChild(n)
                        }
                    }, o.getAllElements = function() {
                        for (var t = [], e = n.getElementsByTagName("img"), r = 0, i = e.length; i > r; r++) {
                            var a = e[r];
                            ("PICTURE" === a.parentNode.nodeName.toUpperCase() || null !== a.getAttribute("srcset") || a[o.ns] && null !== a[o.ns].srcset) && t.push(a)
                        }
                        return t
                    }, o.getMatch = function(t, e) {
                        for (var n, r = e.childNodes, i = 0, a = r.length; a > i; i++) {
                            var s = r[i];
                            if (1 === s.nodeType) {
                                if (s === t) return n;
                                if ("SOURCE" === s.nodeName.toUpperCase()) {
                                    null !== s.getAttribute("src") && void 0 !== typeof console && console.warn("The `src` attribute is invalid on `picture` `source` element; instead, use `srcset`.");
                                    var l = s.getAttribute("media");
                                    if (s.getAttribute("srcset") && (!l || o.matchesMedia(l))) {
                                        var u = o.verifyTypeSupport(s);
                                        if (u === !0) {
                                            n = s;
                                            break
                                        }
                                        if ("pending" === u) return !1
                                    }
                                }
                            }
                        }
                        return n
                    }, s(), a._ = o, i(a)
            }(window, window.document, new window.Image)
    }, {}],
    16: [function(t, e, n) {
        ! function(t) {
            var n, r, i = "0.4.2",
                a = "hasOwnProperty",
                s = /[\.\/]/,
                o = /\s*,\s*/,
                l = "*",
                u = function(t, e) {
                    return t - e
                },
                c = {
                    n: {}
                },
                h = function() {
                    for (var t = 0, e = this.length; e > t; t++)
                        if ("undefined" != typeof this[t]) return this[t]
                },
                f = function() {
                    for (var t = this.length; --t;)
                        if ("undefined" != typeof this[t]) return this[t]
                },
                p = function(t, e) {
                    t = String(t);
                    var i, a = r,
                        s = Array.prototype.slice.call(arguments, 2),
                        o = p.listeners(t),
                        l = 0,
                        c = [],
                        d = {},
                        m = [],
                        g = n;
                    m.firstDefined = h, m.lastDefined = f, n = t, r = 0;
                    for (var v = 0, y = o.length; y > v; v++) "zIndex" in o[v] && (c.push(o[v].zIndex), o[v].zIndex < 0 && (d[o[v].zIndex] = o[v]));
                    for (c.sort(u); c[l] < 0;)
                        if (i = d[c[l++]], m.push(i.apply(e, s)), r) return r = a, m;
                    for (v = 0; y > v; v++)
                        if (i = o[v], "zIndex" in i)
                            if (i.zIndex == c[l]) {
                                if (m.push(i.apply(e, s)), r) break;
                                do
                                    if (l++, i = d[c[l]], i && m.push(i.apply(e, s)), r) break;
                                while (i)
                            } else d[i.zIndex] = i;
                    else if (m.push(i.apply(e, s)), r) break;
                    return r = a, n = g, m
                };
            p._events = c, p.listeners = function(t) {
                var e, n, r, i, a, o, u, h, f = t.split(s),
                    p = c,
                    d = [p],
                    m = [];
                for (i = 0, a = f.length; a > i; i++) {
                    for (h = [], o = 0, u = d.length; u > o; o++)
                        for (p = d[o].n, n = [p[f[i]], p[l]], r = 2; r--;) e = n[r], e && (h.push(e), m = m.concat(e.f || []));
                    d = h
                }
                return m
            }, p.on = function(t, e) {
                if (t = String(t), "function" != typeof e) return function() {};
                for (var n = t.split(o), r = 0, i = n.length; i > r; r++) ! function(t) {
                    for (var n, r = t.split(s), i = c, a = 0, o = r.length; o > a; a++) i = i.n, i = i.hasOwnProperty(r[a]) && i[r[a]] || (i[r[a]] = {
                        n: {}
                    });
                    for (i.f = i.f || [], a = 0, o = i.f.length; o > a; a++)
                        if (i.f[a] == e) {
                            n = !0;
                            break
                        }!n && i.f.push(e)
                }(n[r]);
                return function(t) {
                    +t == +t && (e.zIndex = +t)
                }
            }, p.f = function(t) {
                var e = [].slice.call(arguments, 1);
                return function() {
                    p.apply(null, [t, null].concat(e).concat([].slice.call(arguments, 0)))
                }
            }, p.stop = function() {
                r = 1
            }, p.nt = function(t) {
                return t ? new RegExp("(?:\\.|\\/|^)" + t + "(?:\\.|\\/|$)").test(n) : n
            }, p.nts = function() {
                return n.split(s)
            }, p.off = p.unbind = function(t, e) {
                if (!t) return void(p._events = c = {
                    n: {}
                });
                var n = t.split(o);
                if (n.length > 1)
                    for (var r = 0, i = n.length; i > r; r++) p.off(n[r], e);
                else {
                    n = t.split(s);
                    var u, h, f, r, i, d, m, g = [c];
                    for (r = 0, i = n.length; i > r; r++)
                        for (d = 0; d < g.length; d += f.length - 2) {
                            if (f = [d, 1], u = g[d].n, n[r] != l) u[n[r]] && f.push(u[n[r]]);
                            else
                                for (h in u) u[a](h) && f.push(u[h]);
                            g.splice.apply(g, f)
                        }
                    for (r = 0, i = g.length; i > r; r++)
                        for (u = g[r]; u.n;) {
                            if (e) {
                                if (u.f) {
                                    for (d = 0, m = u.f.length; m > d; d++)
                                        if (u.f[d] == e) {
                                            u.f.splice(d, 1);
                                            break
                                        }!u.f.length && delete u.f
                                }
                                for (h in u.n)
                                    if (u.n[a](h) && u.n[h].f) {
                                        var v = u.n[h].f;
                                        for (d = 0, m = v.length; m > d; d++)
                                            if (v[d] == e) {
                                                v.splice(d, 1);
                                                break
                                            }!v.length && delete u.n[h].f
                                    }
                            } else {
                                delete u.f;
                                for (h in u.n) u.n[a](h) && u.n[h].f && delete u.n[h].f
                            }
                            u = u.n
                        }
                }
            }, p.once = function(t, e) {
                var n = function() {
                    return p.unbind(t, n), e.apply(this, arguments)
                };
                return p.on(t, n)
            }, p.version = i, p.toString = function() {
                return "You are running Eve " + i
            }, "undefined" != typeof e && e.exports ? e.exports = p : "function" == typeof define && define.amd ? define("eve", [], function() {
                return p
            }) : t.eve = p
        }(this),
        function(r, i) {
            if ("function" == typeof define && define.amd) define(["eve"], function(t) {
                return i(r, t)
            });
            else if ("undefined" != typeof n) {
                var a = t("eve");
                e.exports = i(r, a)
            } else i(r, r.eve)
        }(window || this, function(t, e) {
            var n = function(e) {
                    var n = {},
                        r = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame || function(t) {
                            setTimeout(t, 16)
                        },
                        i = Array.isArray || function(t) {
                            return t instanceof Array || "[object Array]" == Object.prototype.toString.call(t)
                        },
                        a = 0,
                        s = "M" + (+new Date).toString(36),
                        o = function() {
                            return s + (a++).toString(36)
                        },
                        l = Date.now || function() {
                            return +new Date
                        },
                        u = function(t) {
                            var e = this;
                            if (null == t) return e.s;
                            var n = e.s - t;
                            e.b += e.dur * n, e.B += e.dur * n, e.s = t
                        },
                        c = function(t) {
                            var e = this;
                            return null == t ? e.spd : void(e.spd = t)
                        },
                        h = function(t) {
                            var e = this;
                            return null == t ? e.dur : (e.s = e.s * t / e.dur, void(e.dur = t))
                        },
                        f = function() {
                            var t = this;
                            delete n[t.id], t.update(), e("mina.stop." + t.id, t)
                        },
                        p = function() {
                            var t = this;
                            t.pdif || (delete n[t.id], t.update(), t.pdif = t.get() - t.b)
                        },
                        d = function() {
                            var t = this;
                            t.pdif && (t.b = t.get() - t.pdif, delete t.pdif, n[t.id] = t)
                        },
                        m = function() {
                            var t, e = this;
                            if (i(e.start)) {
                                t = [];
                                for (var n = 0, r = e.start.length; r > n; n++) t[n] = +e.start[n] + (e.end[n] - e.start[n]) * e.easing(e.s)
                            } else t = +e.start + (e.end - e.start) * e.easing(e.s);
                            e.set(t)
                        },
                        g = function() {
                            var t = 0;
                            for (var i in n)
                                if (n.hasOwnProperty(i)) {
                                    var a = n[i],
                                        s = a.get();
                                    t++, a.s = (s - a.b) / (a.dur / a.spd), a.s >= 1 && (delete n[i], a.s = 1, t--, function(t) {
                                        setTimeout(function() {
                                            e("mina.finish." + t.id, t)
                                        })
                                    }(a)), a.update()
                                }
                            t && r(g)
                        },
                        v = function(t, e, i, a, s, l, y) {
                            var _ = {
                                id: o(),
                                start: t,
                                end: e,
                                b: i,
                                s: 0,
                                dur: a - i,
                                spd: 1,
                                get: s,
                                set: l,
                                easing: y || v.linear,
                                status: u,
                                speed: c,
                                duration: h,
                                stop: f,
                                pause: p,
                                resume: d,
                                update: m
                            };
                            n[_.id] = _;
                            var x, b = 0;
                            for (x in n)
                                if (n.hasOwnProperty(x) && (b++, 2 == b)) break;
                            return 1 == b && r(g), _
                        };
                    return v.time = l, v.getById = function(t) {
                        return n[t] || null
                    }, v.linear = function(t) {
                        return t
                    }, v.easeout = function(t) {
                        return Math.pow(t, 1.7)
                    }, v.easein = function(t) {
                        return Math.pow(t, .48)
                    }, v.easeinout = function(t) {
                        if (1 == t) return 1;
                        if (0 == t) return 0;
                        var e = .48 - t / 1.04,
                            n = Math.sqrt(.1734 + e * e),
                            r = n - e,
                            i = Math.pow(Math.abs(r), 1 / 3) * (0 > r ? -1 : 1),
                            a = -n - e,
                            s = Math.pow(Math.abs(a), 1 / 3) * (0 > a ? -1 : 1),
                            o = i + s + .5;
                        return 3 * (1 - o) * o * o + o * o * o
                    }, v.backin = function(t) {
                        if (1 == t) return 1;
                        var e = 1.70158;
                        return t * t * ((e + 1) * t - e)
                    }, v.backout = function(t) {
                        if (0 == t) return 0;
                        t -= 1;
                        var e = 1.70158;
                        return t * t * ((e + 1) * t + e) + 1
                    }, v.elastic = function(t) {
                        return t == !!t ? t : Math.pow(2, -10 * t) * Math.sin((t - .075) * (2 * Math.PI) / .3) + 1
                    }, v.bounce = function(t) {
                        var e, n = 7.5625,
                            r = 2.75;
                        return 1 / r > t ? e = n * t * t : 2 / r > t ? (t -= 1.5 / r, e = n * t * t + .75) : 2.5 / r > t ? (t -= 2.25 / r, e = n * t * t + .9375) : (t -= 2.625 / r, e = n * t * t + .984375), e
                    }, t.mina = v, v
                }("undefined" == typeof e ? function() {} : e),
                r = function(t) {
                    function n(t, e) {
                        if (t) {
                            if (t.nodeType) return w(t);
                            if (i(t, "array") && n.set) return n.set.apply(n, t);
                            if (t instanceof y) return t;
                            if (null == e) return t = k.doc.querySelector(String(t)), w(t)
                        }
                        return t = null == t ? "100%" : t, e = null == e ? "100%" : e, new b(t, e)
                    }

                    function r(t, e) {
                        if (e) {
                            if ("#text" == t && (t = k.doc.createTextNode(e.text || e["#text"] || "")), "#comment" == t && (t = k.doc.createComment(e.text || e["#text"] || "")), "string" == typeof t && (t = r(t)), "string" == typeof e) return 1 == t.nodeType ? "xlink:" == e.substring(0, 6) ? t.getAttributeNS($, e.substring(6)) : "xml:" == e.substring(0, 4) ? t.getAttributeNS(U, e.substring(4)) : t.getAttribute(e) : "text" == e ? t.nodeValue : null;
                            if (1 == t.nodeType) {
                                for (var n in e)
                                    if (e[C](n)) {
                                        var i = S(e[n]);
                                        i ? "xlink:" == n.substring(0, 6) ? t.setAttributeNS($, n.substring(6), i) : "xml:" == n.substring(0, 4) ? t.setAttributeNS(U, n.substring(4), i) : t.setAttribute(n, i) : t.removeAttribute(n)
                                    }
                            } else "text" in e && (t.nodeValue = e.text)
                        } else t = k.doc.createElementNS(U, t);
                        return t
                    }

                    function i(t, e) {
                        return e = S.prototype.toLowerCase.call(e), "finite" == e ? isFinite(t) : "array" == e && (t instanceof Array || Array.isArray && Array.isArray(t)) ? !0 : "null" == e && null === t || e == typeof t && null !== t || "object" == e && t === Object(t) || E.call(t).slice(8, -1).toLowerCase() == e
                    }

                    function a(t) {
                        if ("function" == typeof t || Object(t) !== t) return t;
                        var e = new t.constructor;
                        for (var n in t) t[C](n) && (e[n] = a(t[n]));
                        return e
                    }

                    function s(t, e) {
                        for (var n = 0, r = t.length; r > n; n++)
                            if (t[n] === e) return t.push(t.splice(n, 1)[0])
                    }

                    function o(t, e, n) {
                        function r() {
                            var i = Array.prototype.slice.call(arguments, 0),
                                a = i.join("␀"),
                                o = r.cache = r.cache || {},
                                l = r.count = r.count || [];
                            return o[C](a) ? (s(l, a), n ? n(o[a]) : o[a]) : (l.length >= 1e3 && delete o[l.shift()], l.push(a), o[a] = t.apply(e, i), n ? n(o[a]) : o[a])
                        }
                        return r
                    }

                    function l(t, e, n, r, i, a) {
                        if (null == i) {
                            var s = t - n,
                                o = e - r;
                            return s || o ? (180 + 180 * O.atan2(-o, -s) / R + 360) % 360 : 0
                        }
                        return l(t, e, i, a) - l(n, r, i, a)
                    }

                    function u(t) {
                        return t % 360 * R / 180
                    }

                    function c(t) {
                        return 180 * t / R % 360
                    }

                    function h(t) {
                        var e = [];
                        return t = t.replace(/(?:^|\s)(\w+)\(([^)]+)\)/g, function(t, n, r) {
                            return r = r.split(/\s*,\s*|\s+/), "rotate" == n && 1 == r.length && r.push(0, 0), "scale" == n && (r.length > 2 ? r = r.slice(0, 2) : 2 == r.length && r.push(0, 0), 1 == r.length && r.push(r[0], 0, 0)), "skewX" == n ? e.push(["m", 1, 0, O.tan(u(r[0])), 1, 0, 0]) : "skewY" == n ? e.push(["m", 1, O.tan(u(r[0])), 0, 1, 0, 0]) : e.push([n.charAt(0)].concat(r)), t
                        }), e
                    }

                    function f(t, e) {
                        var r = tt(t),
                            i = new n.Matrix;
                        if (r)
                            for (var a = 0, s = r.length; s > a; a++) {
                                var o, l, u, c, h, f = r[a],
                                    p = f.length,
                                    d = S(f[0]).toLowerCase(),
                                    m = f[0] != d,
                                    g = m ? i.invert() : 0;
                                "t" == d && 2 == p ? i.translate(f[1], 0) : "t" == d && 3 == p ? m ? (o = g.x(0, 0), l = g.y(0, 0), u = g.x(f[1], f[2]), c = g.y(f[1], f[2]), i.translate(u - o, c - l)) : i.translate(f[1], f[2]) : "r" == d ? 2 == p ? (h = h || e, i.rotate(f[1], h.x + h.width / 2, h.y + h.height / 2)) : 4 == p && (m ? (u = g.x(f[2], f[3]), c = g.y(f[2], f[3]), i.rotate(f[1], u, c)) : i.rotate(f[1], f[2], f[3])) : "s" == d ? 2 == p || 3 == p ? (h = h || e, i.scale(f[1], f[p - 1], h.x + h.width / 2, h.y + h.height / 2)) : 4 == p ? m ? (u = g.x(f[2], f[3]), c = g.y(f[2], f[3]), i.scale(f[1], f[1], u, c)) : i.scale(f[1], f[1], f[2], f[3]) : 5 == p && (m ? (u = g.x(f[3], f[4]), c = g.y(f[3], f[4]), i.scale(f[1], f[2], u, c)) : i.scale(f[1], f[2], f[3], f[4])) : "m" == d && 7 == p && i.add(f[1], f[2], f[3], f[4], f[5], f[6])
                            }
                        return i
                    }

                    function p(t) {
                        var e = t.node.ownerSVGElement && w(t.node.ownerSVGElement) || t.node.parentNode && w(t.node.parentNode) || n.select("svg") || n(0, 0),
                            r = e.select("defs"),
                            i = null == r ? !1 : r.node;
                        return i || (i = x("defs", e.node).node), i
                    }

                    function d(t) {
                        return t.node.ownerSVGElement && w(t.node.ownerSVGElement) || n.select("svg")
                    }

                    function m(t, e, n) {
                        function i(t) {
                            if (null == t) return D;
                            if (t == +t) return t;
                            r(u, {
                                width: t
                            });
                            try {
                                return u.getBBox().width
                            } catch (e) {
                                return 0
                            }
                        }

                        function a(t) {
                            if (null == t) return D;
                            if (t == +t) return t;
                            r(u, {
                                height: t
                            });
                            try {
                                return u.getBBox().height
                            } catch (e) {
                                return 0
                            }
                        }

                        function s(r, i) {
                            null == e ? l[r] = i(t.attr(r) || 0) : r == e && (l = i(null == n ? t.attr(r) || 0 : n))
                        }
                        var o = d(t).node,
                            l = {},
                            u = o.querySelector(".svg---mgr");
                        switch (u || (u = r("rect"), r(u, {
                            x: -9e9,
                            y: -9e9,
                            width: 10,
                            height: 10,
                            "class": "svg---mgr",
                            fill: "none"
                        }), o.appendChild(u)), t.type) {
                            case "rect":
                                s("rx", i), s("ry", a);
                            case "image":
                                s("width", i), s("height", a);
                            case "text":
                                s("x", i), s("y", a);
                                break;
                            case "circle":
                                s("cx", i), s("cy", a), s("r", i);
                                break;
                            case "ellipse":
                                s("cx", i), s("cy", a), s("rx", i), s("ry", a);
                                break;
                            case "line":
                                s("x1", i), s("x2", i), s("y1", a), s("y2", a);
                                break;
                            case "marker":
                                s("refX", i), s("markerWidth", i), s("refY", a), s("markerHeight", a);
                                break;
                            case "radialGradient":
                                s("fx", i), s("fy", a);
                                break;
                            case "tspan":
                                s("dx", i), s("dy", a);
                                break;
                            default:
                                s(e, i)
                        }
                        return o.removeChild(u), l
                    }

                    function v(t) {
                        i(t, "array") || (t = Array.prototype.slice.call(arguments, 0));
                        for (var e = 0, n = 0, r = this.node; this[e];) delete this[e++];
                        for (e = 0; e < t.length; e++) "set" == t[e].type ? t[e].forEach(function(t) {
                            r.appendChild(t.node)
                        }) : r.appendChild(t[e].node);
                        var a = r.childNodes;
                        for (e = 0; e < a.length; e++) this[n++] = w(a[e]);
                        return this
                    }

                    function y(t) {
                        if (t.snap in Y) return Y[t.snap];
                        var e;
                        try {
                            e = t.ownerSVGElement
                        } catch (n) {}
                        this.node = t, e && (this.paper = new b(e)), this.type = t.tagName || t.nodeName;
                        var r = this.id = V(this);
                        if (this.anims = {}, this._ = {
                                transform: []
                            }, t.snap = r, Y[r] = this, "g" == this.type && (this.add = v), this.type in {
                                g: 1,
                                mask: 1,
                                pattern: 1,
                                symbol: 1
                            })
                            for (var i in b.prototype) b.prototype[C](i) && (this[i] = b.prototype[i])
                    }

                    function _(t) {
                        this.node = t
                    }

                    function x(t, e) {
                        var n = r(t);
                        e.appendChild(n);
                        var i = w(n);
                        return i
                    }

                    function b(t, e) {
                        var n, i, a, s = b.prototype;
                        if (t && "svg" == t.tagName) {
                            if (t.snap in Y) return Y[t.snap];
                            var o = t.ownerDocument;
                            n = new y(t), i = t.getElementsByTagName("desc")[0], a = t.getElementsByTagName("defs")[0], i || (i = r("desc"), i.appendChild(o.createTextNode("Created with Snap")), n.node.appendChild(i)), a || (a = r("defs"), n.node.appendChild(a)), n.defs = a;
                            for (var l in s) s[C](l) && (n[l] = s[l]);
                            n.paper = n.root = n
                        } else n = x("svg", k.doc.body), r(n.node, {
                            height: e,
                            version: 1.1,
                            width: t,
                            xmlns: U
                        });
                        return n
                    }

                    function w(t) {
                        return t ? t instanceof y || t instanceof _ ? t : t.tagName && "svg" == t.tagName.toLowerCase() ? new b(t) : t.tagName && "object" == t.tagName.toLowerCase() && "image/svg+xml" == t.type ? new b(t.contentDocument.getElementsByTagName("svg")[0]) : new y(t) : t
                    }

                    function T(t, e) {
                        for (var n = 0, r = t.length; r > n; n++) {
                            var i = {
                                    type: t[n].type,
                                    attr: t[n].attr()
                                },
                                a = t[n].children();
                            e.push(i), a.length && T(a, i.childNodes = [])
                        }
                    }
                    n.version = "0.4.0", n.toString = function() {
                        return "Snap v" + this.version
                    }, n._ = {};
                    var k = {
                        win: t.window,
                        doc: t.window.document
                    };
                    n._.glob = k;
                    var C = "hasOwnProperty",
                        S = String,
                        P = parseFloat,
                        A = parseInt,
                        O = Math,
                        j = O.max,
                        M = O.min,
                        N = O.abs,
                        R = (O.pow, O.PI),
                        D = (O.round, ""),
                        E = Object.prototype.toString,
                        F = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\))\s*$/i,
                        I = (n._.separator = /[,\s]+/, /[\s]*,[\s]*/),
                        L = {
                            hs: 1,
                            rg: 1
                        },
                        z = /([a-z])[\s,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\s]*,?[\s]*)+)/gi,
                        B = /([rstm])[\s,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\s]*,?[\s]*)+)/gi,
                        q = /(-?\d*\.?\d*(?:e[\-+]?\\d+)?)[\s]*,?[\s]*/gi,
                        X = 0,
                        H = "S" + (+new Date).toString(36),
                        V = function(t) {
                            return (t && t.type ? t.type : D) + H + (X++).toString(36)
                        },
                        $ = "http://www.w3.org/1999/xlink",
                        U = "http://www.w3.org/2000/svg",
                        Y = {};
                    n.url = function(t) {
                        return "url('#" + t + "')"
                    };
                    n._.$ = r, n._.id = V, n.format = function() {
                        var t = /\{([^\}]+)\}/g,
                            e = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,
                            n = function(t, n, r) {
                                var i = r;
                                return n.replace(e, function(t, e, n, r, a) {
                                    e = e || r, i && (e in i && (i = i[e]), "function" == typeof i && a && (i = i()))
                                }), i = (null == i || i == r ? t : i) + ""
                            };
                        return function(e, r) {
                            return S(e).replace(t, function(t, e) {
                                return n(t, e, r)
                            })
                        }
                    }(), n._.clone = a, n._.cacher = o, n.rad = u, n.deg = c, n.sin = function(t) {
                        return O.sin(n.rad(t))
                    }, n.tan = function(t) {
                        return O.tan(n.rad(t))
                    }, n.cos = function(t) {
                        return O.cos(n.rad(t))
                    }, n.asin = function(t) {
                        return n.deg(O.asin(t))
                    }, n.acos = function(t) {
                        return n.deg(O.acos(t))
                    }, n.atan = function(t) {
                        return n.deg(O.atan(t))
                    }, n.atan2 = function(t) {
                        return n.deg(O.atan2(t))
                    }, n.angle = l, n.len = function(t, e, r, i) {
                        return Math.sqrt(n.len2(t, e, r, i))
                    }, n.len2 = function(t, e, n, r) {
                        return (t - n) * (t - n) + (e - r) * (e - r)
                    }, n.closestPoint = function(t, e, n) {
                        function r(t) {
                            var r = t.x - e,
                                i = t.y - n;
                            return r * r + i * i
                        }
                        for (var i, a, s, o, l = t.node, u = l.getTotalLength(), c = u / l.pathSegList.numberOfItems * .125, h = 1 / 0, f = 0; u >= f; f += c)(o = r(s = l.getPointAtLength(f))) < h && (i = s, a = f, h = o);
                        for (c *= .5; c > .5;) {
                            var p, d, m, g, v, y;
                            (m = a - c) >= 0 && (v = r(p = l.getPointAtLength(m))) < h ? (i = p, a = m, h = v) : (g = a + c) <= u && (y = r(d = l.getPointAtLength(g))) < h ? (i = d, a = g, h = y) : c *= .5
                        }
                        return i = {
                            x: i.x,
                            y: i.y,
                            length: a,
                            distance: Math.sqrt(h)
                        }
                    }, n.is = i, n.snapTo = function(t, e, n) {
                        if (n = i(n, "finite") ? n : 10, i(t, "array")) {
                            for (var r = t.length; r--;)
                                if (N(t[r] - e) <= n) return t[r]
                        } else {
                            t = +t;
                            var a = e % t;
                            if (n > a) return e - a;
                            if (a > t - n) return e - a + t
                        }
                        return e
                    }, n.getRGB = o(function(t) {
                        if (!t || (t = S(t)).indexOf("-") + 1) return {
                            r: -1,
                            g: -1,
                            b: -1,
                            hex: "none",
                            error: 1,
                            toString: Q
                        };
                        if ("none" == t) return {
                            r: -1,
                            g: -1,
                            b: -1,
                            hex: "none",
                            toString: Q
                        };
                        if (!(L[C](t.toLowerCase().substring(0, 2)) || "#" == t.charAt()) && (t = W(t)), !t) return {
                            r: -1,
                            g: -1,
                            b: -1,
                            hex: "none",
                            error: 1,
                            toString: Q
                        };
                        var e, r, a, s, o, l, u = t.match(F);
                        return u ? (u[2] && (a = A(u[2].substring(5), 16), r = A(u[2].substring(3, 5), 16), e = A(u[2].substring(1, 3), 16)), u[3] && (a = A((o = u[3].charAt(3)) + o, 16), r = A((o = u[3].charAt(2)) + o, 16), e = A((o = u[3].charAt(1)) + o, 16)), u[4] && (l = u[4].split(I), e = P(l[0]), "%" == l[0].slice(-1) && (e *= 2.55), r = P(l[1]), "%" == l[1].slice(-1) && (r *= 2.55), a = P(l[2]), "%" == l[2].slice(-1) && (a *= 2.55), "rgba" == u[1].toLowerCase().slice(0, 4) && (s = P(l[3])), l[3] && "%" == l[3].slice(-1) && (s /= 100)), u[5] ? (l = u[5].split(I), e = P(l[0]), "%" == l[0].slice(-1) && (e /= 100), r = P(l[1]), "%" == l[1].slice(-1) && (r /= 100), a = P(l[2]), "%" == l[2].slice(-1) && (a /= 100), ("deg" == l[0].slice(-3) || "°" == l[0].slice(-1)) && (e /= 360), "hsba" == u[1].toLowerCase().slice(0, 4) && (s = P(l[3])), l[3] && "%" == l[3].slice(-1) && (s /= 100), n.hsb2rgb(e, r, a, s)) : u[6] ? (l = u[6].split(I), e = P(l[0]), "%" == l[0].slice(-1) && (e /= 100), r = P(l[1]), "%" == l[1].slice(-1) && (r /= 100), a = P(l[2]), "%" == l[2].slice(-1) && (a /= 100), ("deg" == l[0].slice(-3) || "°" == l[0].slice(-1)) && (e /= 360), "hsla" == u[1].toLowerCase().slice(0, 4) && (s = P(l[3])), l[3] && "%" == l[3].slice(-1) && (s /= 100), n.hsl2rgb(e, r, a, s)) : (e = M(O.round(e), 255), r = M(O.round(r), 255), a = M(O.round(a), 255), s = M(j(s, 0), 1), u = {
                            r: e,
                            g: r,
                            b: a,
                            toString: Q
                        }, u.hex = "#" + (16777216 | a | r << 8 | e << 16).toString(16).slice(1), u.opacity = i(s, "finite") ? s : 1, u)) : {
                            r: -1,
                            g: -1,
                            b: -1,
                            hex: "none",
                            error: 1,
                            toString: Q
                        }
                    }, n), n.hsb = o(function(t, e, r) {
                        return n.hsb2rgb(t, e, r).hex
                    }), n.hsl = o(function(t, e, r) {
                        return n.hsl2rgb(t, e, r).hex
                    }), n.rgb = o(function(t, e, n, r) {
                        if (i(r, "finite")) {
                            var a = O.round;
                            return "rgba(" + [a(t), a(e), a(n), +r.toFixed(2)] + ")"
                        }
                        return "#" + (16777216 | n | e << 8 | t << 16).toString(16).slice(1)
                    });
                    var W = function(t) {
                            var e = k.doc.getElementsByTagName("head")[0] || k.doc.getElementsByTagName("svg")[0],
                                n = "rgb(255, 0, 0)";
                            return (W = o(function(t) {
                                if ("red" == t.toLowerCase()) return n;
                                e.style.color = n, e.style.color = t;
                                var r = k.doc.defaultView.getComputedStyle(e, D).getPropertyValue("color");
                                return r == n ? null : r
                            }))(t)
                        },
                        G = function() {
                            return "hsb(" + [this.h, this.s, this.b] + ")"
                        },
                        Z = function() {
                            return "hsl(" + [this.h, this.s, this.l] + ")"
                        },
                        Q = function() {
                            return 1 == this.opacity || null == this.opacity ? this.hex : "rgba(" + [this.r, this.g, this.b, this.opacity] + ")"
                        },
                        J = function(t, e, r) {
                            if (null == e && i(t, "object") && "r" in t && "g" in t && "b" in t && (r = t.b, e = t.g, t = t.r), null == e && i(t, string)) {
                                var a = n.getRGB(t);
                                t = a.r, e = a.g, r = a.b
                            }
                            return (t > 1 || e > 1 || r > 1) && (t /= 255, e /= 255, r /= 255), [t, e, r]
                        },
                        K = function(t, e, r, a) {
                            t = O.round(255 * t), e = O.round(255 * e), r = O.round(255 * r);
                            var s = {
                                r: t,
                                g: e,
                                b: r,
                                opacity: i(a, "finite") ? a : 1,
                                hex: n.rgb(t, e, r),
                                toString: Q
                            };
                            return i(a, "finite") && (s.opacity = a), s
                        };
                    n.color = function(t) {
                        var e;
                        return i(t, "object") && "h" in t && "s" in t && "b" in t ? (e = n.hsb2rgb(t), t.r = e.r, t.g = e.g, t.b = e.b, t.opacity = 1, t.hex = e.hex) : i(t, "object") && "h" in t && "s" in t && "l" in t ? (e = n.hsl2rgb(t), t.r = e.r, t.g = e.g, t.b = e.b, t.opacity = 1, t.hex = e.hex) : (i(t, "string") && (t = n.getRGB(t)), i(t, "object") && "r" in t && "g" in t && "b" in t && !("error" in t) ? (e = n.rgb2hsl(t), t.h = e.h, t.s = e.s, t.l = e.l, e = n.rgb2hsb(t), t.v = e.b) : (t = {
                            hex: "none"
                        }, t.r = t.g = t.b = t.h = t.s = t.v = t.l = -1, t.error = 1)), t.toString = Q, t
                    }, n.hsb2rgb = function(t, e, n, r) {
                        i(t, "object") && "h" in t && "s" in t && "b" in t && (n = t.b, e = t.s, r = t.o, t = t.h), t *= 360;
                        var a, s, o, l, u;
                        return t = t % 360 / 60, u = n * e, l = u * (1 - N(t % 2 - 1)), a = s = o = n - u, t = ~~t, a += [u, l, 0, 0, l, u][t], s += [l, u, u, l, 0, 0][t], o += [0, 0, l, u, u, l][t], K(a, s, o, r)
                    }, n.hsl2rgb = function(t, e, n, r) {
                        i(t, "object") && "h" in t && "s" in t && "l" in t && (n = t.l, e = t.s, t = t.h), (t > 1 || e > 1 || n > 1) && (t /= 360, e /= 100, n /= 100), t *= 360;
                        var a, s, o, l, u;
                        return t = t % 360 / 60, u = 2 * e * (.5 > n ? n : 1 - n), l = u * (1 - N(t % 2 - 1)), a = s = o = n - u / 2, t = ~~t, a += [u, l, 0, 0, l, u][t], s += [l, u, u, l, 0, 0][t], o += [0, 0, l, u, u, l][t], K(a, s, o, r)
                    }, n.rgb2hsb = function(t, e, n) {
                        n = J(t, e, n), t = n[0], e = n[1], n = n[2];
                        var r, i, a, s;
                        return a = j(t, e, n), s = a - M(t, e, n), r = 0 == s ? null : a == t ? (e - n) / s : a == e ? (n - t) / s + 2 : (t - e) / s + 4, r = (r + 360) % 6 * 60 / 360, i = 0 == s ? 0 : s / a, {
                            h: r,
                            s: i,
                            b: a,
                            toString: G
                        }
                    }, n.rgb2hsl = function(t, e, n) {
                        n = J(t, e, n), t = n[0], e = n[1], n = n[2];
                        var r, i, a, s, o, l;
                        return s = j(t, e, n), o = M(t, e, n), l = s - o, r = 0 == l ? null : s == t ? (e - n) / l : s == e ? (n - t) / l + 2 : (t - e) / l + 4, r = (r + 360) % 6 * 60 / 360, a = (s + o) / 2, i = 0 == l ? 0 : .5 > a ? l / (2 * a) : l / (2 - 2 * a), {
                            h: r,
                            s: i,
                            l: a,
                            toString: Z
                        }
                    }, n.parsePathString = function(t) {
                        if (!t) return null;
                        var e = n.path(t);
                        if (e.arr) return n.path.clone(e.arr);
                        var r = {
                                a: 7,
                                c: 6,
                                o: 2,
                                h: 1,
                                l: 2,
                                m: 2,
                                r: 4,
                                q: 4,
                                s: 4,
                                t: 2,
                                v: 1,
                                u: 3,
                                z: 0
                            },
                            a = [];
                        return i(t, "array") && i(t[0], "array") && (a = n.path.clone(t)), a.length || S(t).replace(z, function(t, e, n) {
                            var i = [],
                                s = e.toLowerCase();
                            if (n.replace(q, function(t, e) {
                                    e && i.push(+e)
                                }), "m" == s && i.length > 2 && (a.push([e].concat(i.splice(0, 2))), s = "l", e = "m" == e ? "l" : "L"), "o" == s && 1 == i.length && a.push([e, i[0]]), "r" == s) a.push([e].concat(i));
                            else
                                for (; i.length >= r[s] && (a.push([e].concat(i.splice(0, r[s]))), r[s]););
                        }), a.toString = n.path.toString, e.arr = n.path.clone(a), a
                    };
                    var tt = n.parseTransformString = function(t) {
                        if (!t) return null;
                        var e = [];
                        return i(t, "array") && i(t[0], "array") && (e = n.path.clone(t)), e.length || S(t).replace(B, function(t, n, r) {
                            var i = [];
                            n.toLowerCase();
                            r.replace(q, function(t, e) {
                                e && i.push(+e)
                            }), e.push([n].concat(i))
                        }), e.toString = n.path.toString, e
                    };
                    n._.svgTransform2string = h, n._.rgTransform = /^[a-z][\s]*-?\.?\d/i, n._.transform2matrix = f, n._unit2px = m;
                    k.doc.contains || k.doc.compareDocumentPosition ? function(t, e) {
                        var n = 9 == t.nodeType ? t.documentElement : t,
                            r = e && e.parentNode;
                        return t == r || !(!r || 1 != r.nodeType || !(n.contains ? n.contains(r) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(r)))
                    } : function(t, e) {
                        if (e)
                            for (; e;)
                                if (e = e.parentNode, e == t) return !0;
                        return !1
                    };
                    n._.getSomeDefs = p, n._.getSomeSVG = d, n.select = function(t) {
                        return t = S(t).replace(/([^\\]):/g, "$1\\:"), w(k.doc.querySelector(t))
                    }, n.selectAll = function(t) {
                        for (var e = k.doc.querySelectorAll(t), r = (n.set || Array)(), i = 0; i < e.length; i++) r.push(w(e[i]));
                        return r
                    }, setInterval(function() {
                        for (var t in Y)
                            if (Y[C](t)) {
                                var e = Y[t],
                                    n = e.node;
                                ("svg" != e.type && !n.ownerSVGElement || "svg" == e.type && (!n.parentNode || "ownerSVGElement" in n.parentNode && !n.ownerSVGElement)) && delete Y[t]
                            }
                    }, 1e4), y.prototype.attr = function(t, n) {
                        var r = this,
                            a = r.node;
                        if (!t) {
                            if (1 != a.nodeType) return {
                                text: a.nodeValue
                            };
                            for (var s = a.attributes, o = {}, l = 0, u = s.length; u > l; l++) o[s[l].nodeName] = s[l].nodeValue;
                            return o
                        }
                        if (i(t, "string")) {
                            if (!(arguments.length > 1)) return e("snap.util.getattr." + t, r).firstDefined();
                            var c = {};
                            c[t] = n, t = c
                        }
                        for (var h in t) t[C](h) && e("snap.util.attr." + h, r, t[h]);
                        return r
                    }, n.parse = function(t) {
                        var e = k.doc.createDocumentFragment(),
                            n = !0,
                            r = k.doc.createElement("div");
                        if (t = S(t), t.match(/^\s*<\s*svg(?:\s|>)/) || (t = "<svg>" + t + "</svg>", n = !1), r.innerHTML = t, t = r.getElementsByTagName("svg")[0])
                            if (n) e = t;
                            else
                                for (; t.firstChild;) e.appendChild(t.firstChild);
                        return new _(e)
                    }, n.fragment = function() {
                        for (var t = Array.prototype.slice.call(arguments, 0), e = k.doc.createDocumentFragment(), r = 0, i = t.length; i > r; r++) {
                            var a = t[r];
                            a.node && a.node.nodeType && e.appendChild(a.node), a.nodeType && e.appendChild(a), "string" == typeof a && e.appendChild(n.parse(a).node)
                        }
                        return new _(e)
                    }, n._.make = x, n._.wrap = w, b.prototype.el = function(t, e) {
                        var n = x(t, this.node);
                        return e && n.attr(e), n
                    }, y.prototype.children = function() {
                        for (var t = [], e = this.node.childNodes, r = 0, i = e.length; i > r; r++) t[r] = n(e[r]);
                        return t
                    }, y.prototype.toJSON = function() {
                        var t = [];
                        return T([this], t), t[0]
                    }, e.on("snap.util.getattr", function() {
                        var t = e.nt();
                        t = t.substring(t.lastIndexOf(".") + 1);
                        var n = t.replace(/[A-Z]/g, function(t) {
                            return "-" + t.toLowerCase()
                        });
                        return et[C](n) ? this.node.ownerDocument.defaultView.getComputedStyle(this.node, null).getPropertyValue(n) : r(this.node, t)
                    });
                    var et = {
                        "alignment-baseline": 0,
                        "baseline-shift": 0,
                        clip: 0,
                        "clip-path": 0,
                        "clip-rule": 0,
                        color: 0,
                        "color-interpolation": 0,
                        "color-interpolation-filters": 0,
                        "color-profile": 0,
                        "color-rendering": 0,
                        cursor: 0,
                        direction: 0,
                        display: 0,
                        "dominant-baseline": 0,
                        "enable-background": 0,
                        fill: 0,
                        "fill-opacity": 0,
                        "fill-rule": 0,
                        filter: 0,
                        "flood-color": 0,
                        "flood-opacity": 0,
                        font: 0,
                        "font-family": 0,
                        "font-size": 0,
                        "font-size-adjust": 0,
                        "font-stretch": 0,
                        "font-style": 0,
                        "font-variant": 0,
                        "font-weight": 0,
                        "glyph-orientation-horizontal": 0,
                        "glyph-orientation-vertical": 0,
                        "image-rendering": 0,
                        kerning: 0,
                        "letter-spacing": 0,
                        "lighting-color": 0,
                        marker: 0,
                        "marker-end": 0,
                        "marker-mid": 0,
                        "marker-start": 0,
                        mask: 0,
                        opacity: 0,
                        overflow: 0,
                        "pointer-events": 0,
                        "shape-rendering": 0,
                        "stop-color": 0,
                        "stop-opacity": 0,
                        stroke: 0,
                        "stroke-dasharray": 0,
                        "stroke-dashoffset": 0,
                        "stroke-linecap": 0,
                        "stroke-linejoin": 0,
                        "stroke-miterlimit": 0,
                        "stroke-opacity": 0,
                        "stroke-width": 0,
                        "text-anchor": 0,
                        "text-decoration": 0,
                        "text-rendering": 0,
                        "unicode-bidi": 0,
                        visibility: 0,
                        "word-spacing": 0,
                        "writing-mode": 0
                    };
                    e.on("snap.util.attr", function(t) {
                            var n = e.nt(),
                                i = {};
                            n = n.substring(n.lastIndexOf(".") + 1), i[n] = t;
                            var a = n.replace(/-(\w)/gi, function(t, e) {
                                    return e.toUpperCase()
                                }),
                                s = n.replace(/[A-Z]/g, function(t) {
                                    return "-" + t.toLowerCase()
                                });
                            et[C](s) ? this.node.style[a] = null == t ? D : t : r(this.node, i)
                        }),
                        function(t) {}(b.prototype), n.ajax = function(t, n, r, a) {
                            var s = new XMLHttpRequest,
                                o = V();
                            if (s) {
                                if (i(n, "function")) a = r, r = n, n = null;
                                else if (i(n, "object")) {
                                    var l = [];
                                    for (var u in n) n.hasOwnProperty(u) && l.push(encodeURIComponent(u) + "=" + encodeURIComponent(n[u]));
                                    n = l.join("&")
                                }
                                return s.open(n ? "POST" : "GET", t, !0), n && (s.setRequestHeader("X-Requested-With", "XMLHttpRequest"), s.setRequestHeader("Content-type", "application/x-www-form-urlencoded")), r && (e.once("snap.ajax." + o + ".0", r), e.once("snap.ajax." + o + ".200", r), e.once("snap.ajax." + o + ".304", r)), s.onreadystatechange = function() {
                                    4 == s.readyState && e("snap.ajax." + o + "." + s.status, a, s)
                                }, 4 == s.readyState ? s : (s.send(n), s)
                            }
                        }, n.load = function(t, e, r) {
                            n.ajax(t, function(t) {
                                var i = n.parse(t.responseText);
                                r ? e.call(r, i) : e(i)
                            })
                        };
                    var nt = function(t) {
                        var e = t.getBoundingClientRect(),
                            n = t.ownerDocument,
                            r = n.body,
                            i = n.documentElement,
                            a = i.clientTop || r.clientTop || 0,
                            s = i.clientLeft || r.clientLeft || 0,
                            o = e.top + (g.win.pageYOffset || i.scrollTop || r.scrollTop) - a,
                            l = e.left + (g.win.pageXOffset || i.scrollLeft || r.scrollLeft) - s;
                        return {
                            y: o,
                            x: l
                        }
                    };
                    return n.getElementByPoint = function(t, e) {
                        var n = this,
                            r = (n.canvas, k.doc.elementFromPoint(t, e));
                        if (k.win.opera && "svg" == r.tagName) {
                            var i = nt(r),
                                a = r.createSVGRect();
                            a.x = t - i.x, a.y = e - i.y, a.width = a.height = 1;
                            var s = r.getIntersectionList(a, null);
                            s.length && (r = s[s.length - 1])
                        }
                        return r ? w(r) : null
                    }, n.plugin = function(t) {
                        t(n, y, b, k, _)
                    }, k.win.Snap = n, n
                }(t || this);
            return r.plugin(function(r, i, a, s, o) {
                function l(t, e) {
                    if (null == e) {
                        var n = !0;
                        if (e = "linearGradient" == t.type || "radialGradient" == t.type ? t.node.getAttribute("gradientTransform") : "pattern" == t.type ? t.node.getAttribute("patternTransform") : t.node.getAttribute("transform"), !e) return new r.Matrix;
                        e = r._.svgTransform2string(e)
                    } else e = r._.rgTransform.test(e) ? d(e).replace(/\.{3}|\u2026/g, t._.transform || E) : r._.svgTransform2string(e), p(e, "array") && (e = r.path ? r.path.toString.call(e) : d(e)), t._.transform = e;
                    var i = r._.transform2matrix(e, t.getBBox(1));
                    return n ? i : void(t.matrix = i)
                }

                function u(t) {
                    function e(t, e) {
                        var n = g(t.node, e);
                        n = n && n.match(a), n = n && n[2], n && "#" == n.charAt() && (n = n.substring(1), n && (o[n] = (o[n] || []).concat(function(n) {
                            var r = {};
                            r[e] = URL(n), g(t.node, r)
                        })))
                    }

                    function n(t) {
                        var e = g(t.node, "xlink:href");
                        e && "#" == e.charAt() && (e = e.substring(1), e && (o[e] = (o[e] || []).concat(function(e) {
                            t.attr("xlink:href", "#" + e)
                        })))
                    }
                    for (var r, i = t.selectAll("*"), a = /^\s*url\(("|'|)(.*)\1\)\s*$/, s = [], o = {}, l = 0, u = i.length; u > l; l++) {
                        r = i[l], e(r, "fill"), e(r, "stroke"), e(r, "filter"), e(r, "mask"), e(r, "clip-path"), n(r);
                        var c = g(r.node, "id");
                        c && (g(r.node, {
                            id: r.id
                        }), s.push({
                            old: c,
                            id: r.id
                        }))
                    }
                    for (l = 0, u = s.length; u > l; l++) {
                        var h = o[s[l].old];
                        if (h)
                            for (var f = 0, p = h.length; p > f; f++) h[f](s[l].id)
                    }
                }

                function c(t, e, n) {
                    return function(r) {
                        var i = r.slice(t, e);
                        return 1 == i.length && (i = i[0]), n ? n(i) : i
                    }
                }

                function h(t) {
                    return function() {
                        var e = t ? "<" + this.type : "",
                            n = this.node.attributes,
                            r = this.node.childNodes;
                        if (t)
                            for (var i = 0, a = n.length; a > i; i++) e += " " + n[i].name + '="' + n[i].value.replace(/"/g, '\\"') + '"';
                        if (r.length) {
                            for (t && (e += ">"), i = 0, a = r.length; a > i; i++) 3 == r[i].nodeType ? e += r[i].nodeValue : 1 == r[i].nodeType && (e += x(r[i]).toString());
                            t && (e += "</" + this.type + ">")
                        } else t && (e += "/>");
                        return e
                    }
                }
                var f = i.prototype,
                    p = r.is,
                    d = String,
                    m = r._unit2px,
                    g = r._.$,
                    v = r._.make,
                    y = r._.getSomeDefs,
                    _ = "hasOwnProperty",
                    x = r._.wrap;
                f.getBBox = function(t) {
                    if (!r.Matrix || !r.path) return this.node.getBBox();
                    var e = this,
                        n = new r.Matrix;
                    if (e.removed) return r._.box();
                    for (;
                        "use" == e.type;)
                        if (t || (n = n.add(e.transform().localMatrix.translate(e.attr("x") || 0, e.attr("y") || 0))), e.original) e = e.original;
                        else {
                            var i = e.attr("xlink:href");
                            e = e.original = e.node.ownerDocument.getElementById(i.substring(i.indexOf("#") + 1))
                        }
                    var a = e._,
                        s = r.path.get[e.type] || r.path.get.deflt;
                    try {
                        return t ? (a.bboxwt = s ? r.path.getBBox(e.realPath = s(e)) : r._.box(e.node.getBBox()), r._.box(a.bboxwt)) : (e.realPath = s(e), e.matrix = e.transform().localMatrix, a.bbox = r.path.getBBox(r.path.map(e.realPath, n.add(e.matrix))), r._.box(a.bbox))
                    } catch (o) {
                        return r._.box()
                    }
                };
                var b = function() {
                    return this.string
                };
                f.transform = function(t) {
                    var e = this._;
                    if (null == t) {
                        for (var n, i = this, a = new r.Matrix(this.node.getCTM()), s = l(this), o = [s], u = new r.Matrix, c = s.toTransformString(), h = d(s) == d(this.matrix) ? d(e.transform) : c;
                            "svg" != i.type && (i = i.parent());) o.push(l(i));
                        for (n = o.length; n--;) u.add(o[n]);
                        return {
                            string: h,
                            globalMatrix: a,
                            totalMatrix: u,
                            localMatrix: s,
                            diffMatrix: a.clone().add(s.invert()),
                            global: a.toTransformString(),
                            total: u.toTransformString(),
                            local: c,
                            toString: b
                        }
                    }
                    return t instanceof r.Matrix ? (this.matrix = t, this._.transform = t.toTransformString()) : l(this, t), this.node && ("linearGradient" == this.type || "radialGradient" == this.type ? g(this.node, {
                        gradientTransform: this.matrix
                    }) : "pattern" == this.type ? g(this.node, {
                        patternTransform: this.matrix
                    }) : g(this.node, {
                        transform: this.matrix
                    })), this
                }, f.parent = function() {
                    return x(this.node.parentNode)
                }, f.append = f.add = function(t) {
                    if (t) {
                        if ("set" == t.type) {
                            var e = this;
                            return t.forEach(function(t) {
                                e.add(t)
                            }), this
                        }
                        t = x(t), this.node.appendChild(t.node), t.paper = this.paper
                    }
                    return this
                }, f.appendTo = function(t) {
                    return t && (t = x(t), t.append(this)), this
                }, f.prepend = function(t) {
                    if (t) {
                        if ("set" == t.type) {
                            var e, n = this;
                            return t.forEach(function(t) {
                                e ? e.after(t) : n.prepend(t), e = t
                            }), this
                        }
                        t = x(t);
                        var r = t.parent();
                        this.node.insertBefore(t.node, this.node.firstChild), this.add && this.add(), t.paper = this.paper, this.parent() && this.parent().add(), r && r.add()
                    }
                    return this
                }, f.prependTo = function(t) {
                    return t = x(t), t.prepend(this), this
                }, f.before = function(t) {
                    if ("set" == t.type) {
                        var e = this;
                        return t.forEach(function(t) {
                                var n = t.parent();
                                e.node.parentNode.insertBefore(t.node, e.node), n && n.add()
                            }), this.parent().add(),
                            this
                    }
                    t = x(t);
                    var n = t.parent();
                    return this.node.parentNode.insertBefore(t.node, this.node), this.parent() && this.parent().add(), n && n.add(), t.paper = this.paper, this
                }, f.after = function(t) {
                    t = x(t);
                    var e = t.parent();
                    return this.node.nextSibling ? this.node.parentNode.insertBefore(t.node, this.node.nextSibling) : this.node.parentNode.appendChild(t.node), this.parent() && this.parent().add(), e && e.add(), t.paper = this.paper, this
                }, f.insertBefore = function(t) {
                    t = x(t);
                    var e = this.parent();
                    return t.node.parentNode.insertBefore(this.node, t.node), this.paper = t.paper, e && e.add(), t.parent() && t.parent().add(), this
                }, f.insertAfter = function(t) {
                    t = x(t);
                    var e = this.parent();
                    return t.node.parentNode.insertBefore(this.node, t.node.nextSibling), this.paper = t.paper, e && e.add(), t.parent() && t.parent().add(), this
                }, f.remove = function() {
                    var t = this.parent();
                    return this.node.parentNode && this.node.parentNode.removeChild(this.node), delete this.paper, this.removed = !0, t && t.add(), this
                }, f.select = function(t) {
                    return t = d(t).replace(/([^\\]):/g, "$1\\:"), x(this.node.querySelector(t))
                }, f.selectAll = function(t) {
                    for (var e = this.node.querySelectorAll(t), n = (r.set || Array)(), i = 0; i < e.length; i++) n.push(x(e[i]));
                    return n
                }, f.asPX = function(t, e) {
                    return null == e && (e = this.attr(t)), +m(this, t, e)
                }, f.use = function() {
                    var t, e = this.node.id;
                    return e || (e = this.id, g(this.node, {
                        id: e
                    })), t = "linearGradient" == this.type || "radialGradient" == this.type || "pattern" == this.type ? v(this.type, this.node.parentNode) : v("use", this.node.parentNode), g(t.node, {
                        "xlink:href": "#" + e
                    }), t.original = this, t
                }, f.clone = function() {
                    var t = x(this.node.cloneNode(!0));
                    return g(t.node, "id") && g(t.node, {
                        id: t.id
                    }), u(t), t.insertAfter(this), t
                }, f.toDefs = function() {
                    var t = y(this);
                    return t.appendChild(this.node), this
                }, f.pattern = f.toPattern = function(t, e, n, r) {
                    var i = v("pattern", y(this));
                    return null == t && (t = this.getBBox()), p(t, "object") && "x" in t && (e = t.y, n = t.width, r = t.height, t = t.x), g(i.node, {
                        x: t,
                        y: e,
                        width: n,
                        height: r,
                        patternUnits: "userSpaceOnUse",
                        id: i.id,
                        viewBox: [t, e, n, r].join(" ")
                    }), i.node.appendChild(this.node), i
                }, f.marker = function(t, e, n, r, i, a) {
                    var s = v("marker", y(this));
                    return null == t && (t = this.getBBox()), p(t, "object") && "x" in t && (e = t.y, n = t.width, r = t.height, i = t.refX || t.cx, a = t.refY || t.cy, t = t.x), g(s.node, {
                        viewBox: [t, e, n, r].join(" "),
                        markerWidth: n,
                        markerHeight: r,
                        orient: "auto",
                        refX: i || 0,
                        refY: a || 0,
                        id: s.id
                    }), s.node.appendChild(this.node), s
                };
                var w = function(t, e, r, i) {
                    "function" != typeof r || r.length || (i = r, r = n.linear), this.attr = t, this.dur = e, r && (this.easing = r), i && (this.callback = i)
                };
                r._.Animation = w, r.animation = function(t, e, n, r) {
                    return new w(t, e, n, r)
                }, f.inAnim = function() {
                    var t = this,
                        e = [];
                    for (var n in t.anims) t.anims[_](n) && ! function(t) {
                        e.push({
                            anim: new w(t._attrs, t.dur, t.easing, t._callback),
                            mina: t,
                            curStatus: t.status(),
                            status: function(e) {
                                return t.status(e)
                            },
                            stop: function() {
                                t.stop()
                            }
                        })
                    }(t.anims[n]);
                    return e
                }, r.animate = function(t, r, i, a, s, o) {
                    "function" != typeof s || s.length || (o = s, s = n.linear);
                    var l = n.time(),
                        u = n(t, r, l, l + a, n.time, i, s);
                    return o && e.once("mina.finish." + u.id, o), u
                }, f.stop = function() {
                    for (var t = this.inAnim(), e = 0, n = t.length; n > e; e++) t[e].stop();
                    return this
                }, f.animate = function(t, r, i, a) {
                    "function" != typeof i || i.length || (a = i, i = n.linear), t instanceof w && (a = t.callback, i = t.easing, r = i.dur, t = t.attr);
                    var s, o, l, u, h = [],
                        f = [],
                        m = {},
                        g = this;
                    for (var v in t)
                        if (t[_](v)) {
                            g.equal ? (u = g.equal(v, d(t[v])), s = u.from, o = u.to, l = u.f) : (s = +g.attr(v), o = +t[v]);
                            var y = p(s, "array") ? s.length : 1;
                            m[v] = c(h.length, h.length + y, l), h = h.concat(s), f = f.concat(o)
                        }
                    var x = n.time(),
                        b = n(h, f, x, x + r, n.time, function(t) {
                            var e = {};
                            for (var n in m) m[_](n) && (e[n] = m[n](t));
                            g.attr(e)
                        }, i);
                    return g.anims[b.id] = b, b._attrs = t, b._callback = a, e("snap.animcreated." + g.id, b), e.once("mina.finish." + b.id, function() {
                        delete g.anims[b.id], a && a.call(g)
                    }), e.once("mina.stop." + b.id, function() {
                        delete g.anims[b.id]
                    }), g
                };
                var T = {};
                f.data = function(t, n) {
                    var i = T[this.id] = T[this.id] || {};
                    if (0 == arguments.length) return e("snap.data.get." + this.id, this, i, null), i;
                    if (1 == arguments.length) {
                        if (r.is(t, "object")) {
                            for (var a in t) t[_](a) && this.data(a, t[a]);
                            return this
                        }
                        return e("snap.data.get." + this.id, this, i[t], t), i[t]
                    }
                    return i[t] = n, e("snap.data.set." + this.id, this, n, t), this
                }, f.removeData = function(t) {
                    return null == t ? T[this.id] = {} : T[this.id] && delete T[this.id][t], this
                }, f.outerSVG = f.toString = h(1), f.innerSVG = h(), f.toDataURL = function() {
                    if (t && t.btoa) {
                        var e = this.getBBox(),
                            n = r.format('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{width}" height="{height}" viewBox="{x} {y} {width} {height}">{contents}</svg>', {
                                x: +e.x.toFixed(3),
                                y: +e.y.toFixed(3),
                                width: +e.width.toFixed(3),
                                height: +e.height.toFixed(3),
                                contents: this.outerSVG()
                            });
                        return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(n)))
                    }
                }, o.prototype.select = f.select, o.prototype.selectAll = f.selectAll
            }), r.plugin(function(t, e, n, r, i) {
                function a(t, e, n, r, i, a) {
                    return null == e && "[object SVGMatrix]" == s.call(t) ? (this.a = t.a, this.b = t.b, this.c = t.c, this.d = t.d, this.e = t.e, void(this.f = t.f)) : void(null != t ? (this.a = +t, this.b = +e, this.c = +n, this.d = +r, this.e = +i, this.f = +a) : (this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.e = 0, this.f = 0))
                }
                var s = Object.prototype.toString,
                    o = String,
                    l = Math,
                    u = "";
                ! function(e) {
                    function n(t) {
                        return t[0] * t[0] + t[1] * t[1]
                    }

                    function r(t) {
                        var e = l.sqrt(n(t));
                        t[0] && (t[0] /= e), t[1] && (t[1] /= e)
                    }
                    e.add = function(t, e, n, r, i, s) {
                        var o, l, u, c, h = [
                                [],
                                [],
                                []
                            ],
                            f = [
                                [this.a, this.c, this.e],
                                [this.b, this.d, this.f],
                                [0, 0, 1]
                            ],
                            p = [
                                [t, n, i],
                                [e, r, s],
                                [0, 0, 1]
                            ];
                        for (t && t instanceof a && (p = [
                                [t.a, t.c, t.e],
                                [t.b, t.d, t.f],
                                [0, 0, 1]
                            ]), o = 0; 3 > o; o++)
                            for (l = 0; 3 > l; l++) {
                                for (c = 0, u = 0; 3 > u; u++) c += f[o][u] * p[u][l];
                                h[o][l] = c
                            }
                        return this.a = h[0][0], this.b = h[1][0], this.c = h[0][1], this.d = h[1][1], this.e = h[0][2], this.f = h[1][2], this
                    }, e.invert = function() {
                        var t = this,
                            e = t.a * t.d - t.b * t.c;
                        return new a(t.d / e, -t.b / e, -t.c / e, t.a / e, (t.c * t.f - t.d * t.e) / e, (t.b * t.e - t.a * t.f) / e)
                    }, e.clone = function() {
                        return new a(this.a, this.b, this.c, this.d, this.e, this.f)
                    }, e.translate = function(t, e) {
                        return this.add(1, 0, 0, 1, t, e)
                    }, e.scale = function(t, e, n, r) {
                        return null == e && (e = t), (n || r) && this.add(1, 0, 0, 1, n, r), this.add(t, 0, 0, e, 0, 0), (n || r) && this.add(1, 0, 0, 1, -n, -r), this
                    }, e.rotate = function(e, n, r) {
                        e = t.rad(e), n = n || 0, r = r || 0;
                        var i = +l.cos(e).toFixed(9),
                            a = +l.sin(e).toFixed(9);
                        return this.add(i, a, -a, i, n, r), this.add(1, 0, 0, 1, -n, -r)
                    }, e.x = function(t, e) {
                        return t * this.a + e * this.c + this.e
                    }, e.y = function(t, e) {
                        return t * this.b + e * this.d + this.f
                    }, e.get = function(t) {
                        return +this[o.fromCharCode(97 + t)].toFixed(4)
                    }, e.toString = function() {
                        return "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")"
                    }, e.offset = function() {
                        return [this.e.toFixed(4), this.f.toFixed(4)]
                    }, e.determinant = function() {
                        return this.a * this.d - this.b * this.c
                    }, e.split = function() {
                        var e = {};
                        e.dx = this.e, e.dy = this.f;
                        var i = [
                            [this.a, this.c],
                            [this.b, this.d]
                        ];
                        e.scalex = l.sqrt(n(i[0])), r(i[0]), e.shear = i[0][0] * i[1][0] + i[0][1] * i[1][1], i[1] = [i[1][0] - i[0][0] * e.shear, i[1][1] - i[0][1] * e.shear], e.scaley = l.sqrt(n(i[1])), r(i[1]), e.shear /= e.scaley, this.determinant() < 0 && (e.scalex = -e.scalex);
                        var a = -i[0][1],
                            s = i[1][1];
                        return 0 > s ? (e.rotate = t.deg(l.acos(s)), 0 > a && (e.rotate = 360 - e.rotate)) : e.rotate = t.deg(l.asin(a)), e.isSimple = !(+e.shear.toFixed(9) || e.scalex.toFixed(9) != e.scaley.toFixed(9) && e.rotate), e.isSuperSimple = !+e.shear.toFixed(9) && e.scalex.toFixed(9) == e.scaley.toFixed(9) && !e.rotate, e.noRotation = !+e.shear.toFixed(9) && !e.rotate, e
                    }, e.toTransformString = function(t) {
                        var e = t || this.split();
                        return +e.shear.toFixed(9) ? "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)] : (e.scalex = +e.scalex.toFixed(4), e.scaley = +e.scaley.toFixed(4), e.rotate = +e.rotate.toFixed(4), (e.dx || e.dy ? "t" + [+e.dx.toFixed(4), +e.dy.toFixed(4)] : u) + (1 != e.scalex || 1 != e.scaley ? "s" + [e.scalex, e.scaley, 0, 0] : u) + (e.rotate ? "r" + [+e.rotate.toFixed(4), 0, 0] : u))
                    }
                }(a.prototype), t.Matrix = a, t.matrix = function(t, e, n, r, i, s) {
                    return new a(t, e, n, r, i, s)
                }
            }), r.plugin(function(t, n, r, i, a) {
                function s(r) {
                    return function(i) {
                        if (e.stop(), i instanceof a && 1 == i.node.childNodes.length && ("radialGradient" == i.node.firstChild.tagName || "linearGradient" == i.node.firstChild.tagName || "pattern" == i.node.firstChild.tagName) && (i = i.node.firstChild, p(this).appendChild(i), i = h(i)), i instanceof n)
                            if ("radialGradient" == i.type || "linearGradient" == i.type || "pattern" == i.type) {
                                i.node.id || m(i.node, {
                                    id: i.id
                                });
                                var s = g(i.node.id)
                            } else s = i.attr(r);
                        else if (s = t.color(i), s.error) {
                            var o = t(p(this).ownerSVGElement).gradient(i);
                            o ? (o.node.id || m(o.node, {
                                id: o.id
                            }), s = g(o.node.id)) : s = i
                        } else s = v(s);
                        var l = {};
                        l[r] = s, m(this.node, l), this.node.style[r] = _
                    }
                }

                function o(t) {
                    e.stop(), t == +t && (t += "px"), this.node.style.fontSize = t
                }

                function l(t) {
                    for (var e = [], n = t.childNodes, r = 0, i = n.length; i > r; r++) {
                        var a = n[r];
                        3 == a.nodeType && e.push(a.nodeValue), "tspan" == a.tagName && (1 == a.childNodes.length && 3 == a.firstChild.nodeType ? e.push(a.firstChild.nodeValue) : e.push(l(a)))
                    }
                    return e
                }

                function u() {
                    return e.stop(), this.node.style.fontSize
                }
                var c = t._.make,
                    h = t._.wrap,
                    f = t.is,
                    p = t._.getSomeDefs,
                    d = /^url\(#?([^)]+)\)$/,
                    m = t._.$,
                    g = t.url,
                    v = String,
                    y = t._.separator,
                    _ = "";
                e.on("snap.util.attr.mask", function(t) {
                        if (t instanceof n || t instanceof a) {
                            if (e.stop(), t instanceof a && 1 == t.node.childNodes.length && (t = t.node.firstChild, p(this).appendChild(t), t = h(t)), "mask" == t.type) var r = t;
                            else r = c("mask", p(this)), r.node.appendChild(t.node);
                            !r.node.id && m(r.node, {
                                id: r.id
                            }), m(this.node, {
                                mask: g(r.id)
                            })
                        }
                    }),
                    function(t) {
                        e.on("snap.util.attr.clip", t), e.on("snap.util.attr.clip-path", t), e.on("snap.util.attr.clipPath", t)
                    }(function(t) {
                        if (t instanceof n || t instanceof a) {
                            if (e.stop(), "clipPath" == t.type) var r = t;
                            else r = c("clipPath", p(this)), r.node.appendChild(t.node), !r.node.id && m(r.node, {
                                id: r.id
                            });
                            m(this.node, {
                                "clip-path": g(r.node.id || r.id)
                            })
                        }
                    }), e.on("snap.util.attr.fill", s("fill")), e.on("snap.util.attr.stroke", s("stroke"));
                var x = /^([lr])(?:\(([^)]*)\))?(.*)$/i;
                e.on("snap.util.grad.parse", function(t) {
                        t = v(t);
                        var e = t.match(x);
                        if (!e) return null;
                        var n = e[1],
                            r = e[2],
                            i = e[3];
                        return r = r.split(/\s*,\s*/).map(function(t) {
                            return +t == t ? +t : t
                        }), 1 == r.length && 0 == r[0] && (r = []), i = i.split("-"), i = i.map(function(t) {
                            t = t.split(":");
                            var e = {
                                color: t[0]
                            };
                            return t[1] && (e.offset = parseFloat(t[1])), e
                        }), {
                            type: n,
                            params: r,
                            stops: i
                        }
                    }), e.on("snap.util.attr.d", function(n) {
                        e.stop(), f(n, "array") && f(n[0], "array") && (n = t.path.toString.call(n)), n = v(n), n.match(/[ruo]/i) && (n = t.path.toAbsolute(n)), m(this.node, {
                            d: n
                        })
                    })(-1), e.on("snap.util.attr.#text", function(t) {
                        e.stop(), t = v(t);
                        for (var n = i.doc.createTextNode(t); this.node.firstChild;) this.node.removeChild(this.node.firstChild);
                        this.node.appendChild(n)
                    })(-1), e.on("snap.util.attr.path", function(t) {
                        e.stop(), this.attr({
                            d: t
                        })
                    })(-1), e.on("snap.util.attr.class", function(t) {
                        e.stop(), this.node.className.baseVal = t
                    })(-1), e.on("snap.util.attr.viewBox", function(t) {
                        var n;
                        n = f(t, "object") && "x" in t ? [t.x, t.y, t.width, t.height].join(" ") : f(t, "array") ? t.join(" ") : t, m(this.node, {
                            viewBox: n
                        }), e.stop()
                    })(-1), e.on("snap.util.attr.transform", function(t) {
                        this.transform(t), e.stop()
                    })(-1), e.on("snap.util.attr.r", function(t) {
                        "rect" == this.type && (e.stop(), m(this.node, {
                            rx: t,
                            ry: t
                        }))
                    })(-1), e.on("snap.util.attr.textpath", function(t) {
                        if (e.stop(), "text" == this.type) {
                            var r, i, a;
                            if (!t && this.textPath) {
                                for (i = this.textPath; i.node.firstChild;) this.node.appendChild(i.node.firstChild);
                                return i.remove(), void delete this.textPath
                            }
                            if (f(t, "string")) {
                                var s = p(this),
                                    o = h(s.parentNode).path(t);
                                s.appendChild(o.node), r = o.id, o.attr({
                                    id: r
                                })
                            } else t = h(t), t instanceof n && (r = t.attr("id"), r || (r = t.id, t.attr({
                                id: r
                            })));
                            if (r)
                                if (i = this.textPath, a = this.node, i) i.attr({
                                    "xlink:href": "#" + r
                                });
                                else {
                                    for (i = m("textPath", {
                                            "xlink:href": "#" + r
                                        }); a.firstChild;) i.appendChild(a.firstChild);
                                    a.appendChild(i), this.textPath = h(i)
                                }
                        }
                    })(-1), e.on("snap.util.attr.text", function(t) {
                        if ("text" == this.type) {
                            for (var n = this.node, r = function(t) {
                                    var e = m("tspan");
                                    if (f(t, "array"))
                                        for (var n = 0; n < t.length; n++) e.appendChild(r(t[n]));
                                    else e.appendChild(i.doc.createTextNode(t));
                                    return e.normalize && e.normalize(), e
                                }; n.firstChild;) n.removeChild(n.firstChild);
                            for (var a = r(t); a.firstChild;) n.appendChild(a.firstChild)
                        }
                        e.stop()
                    })(-1), e.on("snap.util.attr.fontSize", o)(-1), e.on("snap.util.attr.font-size", o)(-1), e.on("snap.util.getattr.transform", function() {
                        return e.stop(), this.transform()
                    })(-1), e.on("snap.util.getattr.textpath", function() {
                        return e.stop(), this.textPath
                    })(-1),
                    function() {
                        function n(n) {
                            return function() {
                                e.stop();
                                var r = i.doc.defaultView.getComputedStyle(this.node, null).getPropertyValue("marker-" + n);
                                return "none" == r ? r : t(i.doc.getElementById(r.match(d)[1]))
                            }
                        }

                        function r(t) {
                            return function(n) {
                                e.stop();
                                var r = "marker" + t.charAt(0).toUpperCase() + t.substring(1);
                                if ("" == n || !n) return void(this.node.style[r] = "none");
                                if ("marker" == n.type) {
                                    var i = n.node.id;
                                    return i || m(n.node, {
                                        id: n.id
                                    }), void(this.node.style[r] = g(i))
                                }
                            }
                        }
                        e.on("snap.util.getattr.marker-end", n("end"))(-1), e.on("snap.util.getattr.markerEnd", n("end"))(-1), e.on("snap.util.getattr.marker-start", n("start"))(-1), e.on("snap.util.getattr.markerStart", n("start"))(-1), e.on("snap.util.getattr.marker-mid", n("mid"))(-1), e.on("snap.util.getattr.markerMid", n("mid"))(-1), e.on("snap.util.attr.marker-end", r("end"))(-1), e.on("snap.util.attr.markerEnd", r("end"))(-1), e.on("snap.util.attr.marker-start", r("start"))(-1), e.on("snap.util.attr.markerStart", r("start"))(-1), e.on("snap.util.attr.marker-mid", r("mid"))(-1), e.on("snap.util.attr.markerMid", r("mid"))(-1)
                    }(), e.on("snap.util.getattr.r", function() {
                        return "rect" == this.type && m(this.node, "rx") == m(this.node, "ry") ? (e.stop(), m(this.node, "rx")) : void 0
                    })(-1), e.on("snap.util.getattr.text", function() {
                        if ("text" == this.type || "tspan" == this.type) {
                            e.stop();
                            var t = l(this.node);
                            return 1 == t.length ? t[0] : t
                        }
                    })(-1), e.on("snap.util.getattr.#text", function() {
                        return this.node.textContent
                    })(-1), e.on("snap.util.getattr.viewBox", function() {
                        e.stop();
                        var n = m(this.node, "viewBox");
                        return n ? (n = n.split(y), t._.box(+n[0], +n[1], +n[2], +n[3])) : void 0
                    })(-1), e.on("snap.util.getattr.points", function() {
                        var t = m(this.node, "points");
                        return e.stop(), t ? t.split(y) : void 0
                    })(-1), e.on("snap.util.getattr.path", function() {
                        var t = m(this.node, "d");
                        return e.stop(), t
                    })(-1), e.on("snap.util.getattr.class", function() {
                        return this.node.className.baseVal
                    })(-1), e.on("snap.util.getattr.fontSize", u)(-1), e.on("snap.util.getattr.font-size", u)(-1)
            }), r.plugin(function(t, e, n, r, i) {
                var a = /\S+/g,
                    s = String,
                    o = e.prototype;
                o.addClass = function(t) {
                    var e, n, r, i, o = s(t || "").match(a) || [],
                        l = this.node,
                        u = l.className.baseVal,
                        c = u.match(a) || [];
                    if (o.length) {
                        for (e = 0; r = o[e++];) n = c.indexOf(r), ~n || c.push(r);
                        i = c.join(" "), u != i && (l.className.baseVal = i)
                    }
                    return this
                }, o.removeClass = function(t) {
                    var e, n, r, i, o = s(t || "").match(a) || [],
                        l = this.node,
                        u = l.className.baseVal,
                        c = u.match(a) || [];
                    if (c.length) {
                        for (e = 0; r = o[e++];) n = c.indexOf(r), ~n && c.splice(n, 1);
                        i = c.join(" "), u != i && (l.className.baseVal = i)
                    }
                    return this
                }, o.hasClass = function(t) {
                    var e = this.node,
                        n = e.className.baseVal,
                        r = n.match(a) || [];
                    return !!~r.indexOf(t)
                }, o.toggleClass = function(t, e) {
                    if (null != e) return e ? this.addClass(t) : this.removeClass(t);
                    var n, r, i, s, o = (t || "").match(a) || [],
                        l = this.node,
                        u = l.className.baseVal,
                        c = u.match(a) || [];
                    for (n = 0; i = o[n++];) r = c.indexOf(i), ~r ? c.splice(r, 1) : c.push(i);
                    return s = c.join(" "), u != s && (l.className.baseVal = s), this
                }
            }), r.plugin(function(t, n, r, i, a) {
                function s(t) {
                    return t
                }

                function o(t) {
                    return function(e) {
                        return +e.toFixed(3) + t
                    }
                }
                var l = {
                        "+": function(t, e) {
                            return t + e
                        },
                        "-": function(t, e) {
                            return t - e
                        },
                        "/": function(t, e) {
                            return t / e
                        },
                        "*": function(t, e) {
                            return t * e
                        }
                    },
                    u = String,
                    c = /[a-z]+$/i,
                    h = /^\s*([+\-\/*])\s*=\s*([\d.eE+\-]+)\s*([^\d\s]+)?\s*$/;
                e.on("snap.util.attr", function(t) {
                    var n = u(t).match(h);
                    if (n) {
                        var r = e.nt(),
                            i = r.substring(r.lastIndexOf(".") + 1),
                            a = this.attr(i),
                            s = {};
                        e.stop();
                        var o = n[3] || "",
                            f = a.match(c),
                            p = l[n[1]];
                        if (f && f == o ? t = p(parseFloat(a), +n[2]) : (a = this.asPX(i), t = p(this.asPX(i), this.asPX(i, n[2] + o))), isNaN(a) || isNaN(t)) return;
                        s[i] = t, this.attr(s)
                    }
                })(-10), e.on("snap.util.equal", function(t, n) {
                    var r = u(this.attr(t) || ""),
                        i = u(n).match(h);
                    if (i) {
                        e.stop();
                        var a = i[3] || "",
                            f = r.match(c),
                            p = l[i[1]];
                        return f && f == a ? {
                            from: parseFloat(r),
                            to: p(parseFloat(r), +i[2]),
                            f: o(f)
                        } : (r = this.asPX(t), {
                            from: r,
                            to: p(r, this.asPX(t, i[2] + a)),
                            f: s
                        })
                    }
                })(-10)
            }), r.plugin(function(n, r, i, a, s) {
                var o = i.prototype,
                    l = n.is;
                o.rect = function(t, e, n, r, i, a) {
                    var s;
                    return null == a && (a = i), l(t, "object") && "[object Object]" == t ? s = t : null != t && (s = {
                        x: t,
                        y: e,
                        width: n,
                        height: r
                    }, null != i && (s.rx = i, s.ry = a)), this.el("rect", s)
                }, o.circle = function(t, e, n) {
                    var r;
                    return l(t, "object") && "[object Object]" == t ? r = t : null != t && (r = {
                        cx: t,
                        cy: e,
                        r: n
                    }), this.el("circle", r)
                };
                var u = function() {
                    function t() {
                        this.parentNode.removeChild(this)
                    }
                    return function(e, n) {
                        var r = a.doc.createElement("img"),
                            i = a.doc.body;
                        r.style.cssText = "position:absolute;left:-9999em;top:-9999em", r.onload = function() {
                            n.call(r), r.onload = r.onerror = null, i.removeChild(r)
                        }, r.onerror = t, i.appendChild(r), r.src = e
                    }
                }();
                o.image = function(t, e, r, i, a) {
                        var s = this.el("image");
                        if (l(t, "object") && "src" in t) s.attr(t);
                        else if (null != t) {
                            var o = {
                                "xlink:href": t,
                                preserveAspectRatio: "none"
                            };
                            null != e && null != r && (o.x = e, o.y = r), null != i && null != a ? (o.width = i, o.height = a) : u(t, function() {
                                n._.$(s.node, {
                                    width: this.offsetWidth,
                                    height: this.offsetHeight
                                })
                            }), n._.$(s.node, o)
                        }
                        return s
                    }, o.ellipse = function(t, e, n, r) {
                        var i;
                        return l(t, "object") && "[object Object]" == t ? i = t : null != t && (i = {
                            cx: t,
                            cy: e,
                            rx: n,
                            ry: r
                        }), this.el("ellipse", i)
                    }, o.path = function(t) {
                        var e;
                        return l(t, "object") && !l(t, "array") ? e = t : t && (e = {
                            d: t
                        }), this.el("path", e)
                    }, o.group = o.g = function(t) {
                        var e = this.el("g");
                        return 1 == arguments.length && t && !t.type ? e.attr(t) : arguments.length && e.add(Array.prototype.slice.call(arguments, 0)), e
                    }, o.svg = function(t, e, n, r, i, a, s, o) {
                        var u = {};
                        return l(t, "object") && null == e ? u = t : (null != t && (u.x = t), null != e && (u.y = e), null != n && (u.width = n), null != r && (u.height = r), null != i && null != a && null != s && null != o && (u.viewBox = [i, a, s, o])), this.el("svg", u)
                    }, o.mask = function(t) {
                        var e = this.el("mask");
                        return 1 == arguments.length && t && !t.type ? e.attr(t) : arguments.length && e.add(Array.prototype.slice.call(arguments, 0)), e
                    }, o.ptrn = function(t, e, n, r, i, a, s, o) {
                        if (l(t, "object")) var u = t;
                        else u = {
                            patternUnits: "userSpaceOnUse"
                        }, t && (u.x = t), e && (u.y = e), null != n && (u.width = n), null != r && (u.height = r), null != i && null != a && null != s && null != o ? u.viewBox = [i, a, s, o] : u.viewBox = [t || 0, e || 0, n || 0, r || 0];
                        return this.el("pattern", u)
                    }, o.use = function(t) {
                        return null != t ? (t instanceof r && (t.attr("id") || t.attr({
                            id: n._.id(t)
                        }), t = t.attr("id")), "#" == String(t).charAt() && (t = t.substring(1)), this.el("use", {
                            "xlink:href": "#" + t
                        })) : r.prototype.use.call(this)
                    }, o.symbol = function(t, e, n, r) {
                        var i = {};
                        return null != t && null != e && null != n && null != r && (i.viewBox = [t, e, n, r]), this.el("symbol", i)
                    }, o.text = function(t, e, n) {
                        var r = {};
                        return l(t, "object") ? r = t : null != t && (r = {
                            x: t,
                            y: e,
                            text: n || ""
                        }), this.el("text", r)
                    }, o.line = function(t, e, n, r) {
                        var i = {};
                        return l(t, "object") ? i = t : null != t && (i = {
                            x1: t,
                            x2: n,
                            y1: e,
                            y2: r
                        }), this.el("line", i)
                    }, o.polyline = function(t) {
                        arguments.length > 1 && (t = Array.prototype.slice.call(arguments, 0));
                        var e = {};
                        return l(t, "object") && !l(t, "array") ? e = t : null != t && (e = {
                            points: t
                        }), this.el("polyline", e)
                    }, o.polygon = function(t) {
                        arguments.length > 1 && (t = Array.prototype.slice.call(arguments, 0));
                        var e = {};
                        return l(t, "object") && !l(t, "array") ? e = t : null != t && (e = {
                            points: t
                        }), this.el("polygon", e)
                    },
                    function() {
                        function r() {
                            return this.selectAll("stop")
                        }

                        function i(t, e) {
                            var r = c("stop"),
                                i = {
                                    offset: +e + "%"
                                };
                            return t = n.color(t), i["stop-color"] = t.hex, t.opacity < 1 && (i["stop-opacity"] = t.opacity), c(r, i), this.node.appendChild(r), this
                        }

                        function a() {
                            if ("linearGradient" == this.type) {
                                var t = c(this.node, "x1") || 0,
                                    e = c(this.node, "x2") || 1,
                                    r = c(this.node, "y1") || 0,
                                    i = c(this.node, "y2") || 0;
                                return n._.box(t, r, math.abs(e - t), math.abs(i - r))
                            }
                            var a = this.node.cx || .5,
                                s = this.node.cy || .5,
                                o = this.node.r || 0;
                            return n._.box(a - o, s - o, 2 * o, 2 * o)
                        }

                        function s(t, n) {
                            function r(t, e) {
                                for (var n = (e - h) / (t - f), r = f; t > r; r++) s[r].offset = +(+h + n * (r - f)).toFixed(2);
                                f = t, h = e
                            }
                            var i, a = e("snap.util.grad.parse", null, n).firstDefined();
                            if (!a) return null;
                            a.params.unshift(t), i = "l" == a.type.toLowerCase() ? l.apply(0, a.params) : u.apply(0, a.params), a.type != a.type.toLowerCase() && c(i.node, {
                                gradientUnits: "userSpaceOnUse"
                            });
                            var s = a.stops,
                                o = s.length,
                                h = 0,
                                f = 0;
                            o--;
                            for (var p = 0; o > p; p++) "offset" in s[p] && r(p, s[p].offset);
                            for (s[o].offset = s[o].offset || 100, r(o, s[o].offset), p = 0; o >= p; p++) {
                                var d = s[p];
                                i.addStop(d.color, d.offset)
                            }
                            return i
                        }

                        function l(t, e, s, o, l) {
                            var u = n._.make("linearGradient", t);
                            return u.stops = r, u.addStop = i, u.getBBox = a, null != e && c(u.node, {
                                x1: e,
                                y1: s,
                                x2: o,
                                y2: l
                            }), u
                        }

                        function u(t, e, s, o, l, u) {
                            var h = n._.make("radialGradient", t);
                            return h.stops = r, h.addStop = i, h.getBBox = a, null != e && c(h.node, {
                                cx: e,
                                cy: s,
                                r: o
                            }), null != l && null != u && c(h.node, {
                                fx: l,
                                fy: u
                            }), h
                        }
                        var c = n._.$;
                        o.gradient = function(t) {
                            return s(this.defs, t)
                        }, o.gradientLinear = function(t, e, n, r) {
                            return l(this.defs, t, e, n, r)
                        }, o.gradientRadial = function(t, e, n, r, i) {
                            return u(this.defs, t, e, n, r, i)
                        }, o.toString = function() {
                            var t, e = this.node.ownerDocument,
                                r = e.createDocumentFragment(),
                                i = e.createElement("div"),
                                a = this.node.cloneNode(!0);
                            return r.appendChild(i), i.appendChild(a), n._.$(a, {
                                xmlns: "http://www.w3.org/2000/svg"
                            }), t = i.innerHTML, r.removeChild(r.firstChild), t
                        }, o.toDataURL = function() {
                            return t && t.btoa ? "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(this))) : void 0
                        }, o.clear = function() {
                            for (var t, e = this.node.firstChild; e;) t = e.nextSibling, "defs" != e.tagName ? e.parentNode.removeChild(e) : o.clear.call({
                                node: e
                            }), e = t
                        }
                    }()
            }), r.plugin(function(t, e, n, r) {
                function i(t) {
                    var e = i.ps = i.ps || {};
                    return e[t] ? e[t].sleep = 100 : e[t] = {
                        sleep: 100
                    }, setTimeout(function() {
                        for (var n in e) e[L](n) && n != t && (e[n].sleep--, !e[n].sleep && delete e[n])
                    }), e[t]
                }

                function a(t, e, n, r) {
                    return null == t && (t = e = n = r = 0), null == e && (e = t.y, n = t.width, r = t.height, t = t.x), {
                        x: t,
                        y: e,
                        width: n,
                        w: n,
                        height: r,
                        h: r,
                        x2: t + n,
                        y2: e + r,
                        cx: t + n / 2,
                        cy: e + r / 2,
                        r1: q.min(n, r) / 2,
                        r2: q.max(n, r) / 2,
                        r0: q.sqrt(n * n + r * r) / 2,
                        path: k(t, e, n, r),
                        vb: [t, e, n, r].join(" ")
                    }
                }

                function s() {
                    return this.join(",").replace(z, "$1")
                }

                function o(t) {
                    var e = I(t);
                    return e.toString = s, e
                }

                function l(t, e, n, r, i, a, s, o, l) {
                    return null == l ? m(t, e, n, r, i, a, s, o) : c(t, e, n, r, i, a, s, o, g(t, e, n, r, i, a, s, o, l))
                }

                function u(n, r) {
                    function i(t) {
                        return +(+t).toFixed(3)
                    }
                    return t._.cacher(function(t, a, s) {
                        t instanceof e && (t = t.attr("d")), t = N(t);
                        for (var o, u, h, f, p, d = "", m = {}, g = 0, v = 0, y = t.length; y > v; v++) {
                            if (h = t[v], "M" == h[0]) o = +h[1], u = +h[2];
                            else {
                                if (f = l(o, u, h[1], h[2], h[3], h[4], h[5], h[6]), g + f > a) {
                                    if (r && !m.start) {
                                        if (p = l(o, u, h[1], h[2], h[3], h[4], h[5], h[6], a - g), d += ["C" + i(p.start.x), i(p.start.y), i(p.m.x), i(p.m.y), i(p.x), i(p.y)], s) return d;
                                        m.start = d, d = ["M" + i(p.x), i(p.y) + "C" + i(p.n.x), i(p.n.y), i(p.end.x), i(p.end.y), i(h[5]), i(h[6])].join(), g += f, o = +h[5], u = +h[6];
                                        continue
                                    }
                                    if (!n && !r) return p = l(o, u, h[1], h[2], h[3], h[4], h[5], h[6], a - g)
                                }
                                g += f, o = +h[5], u = +h[6]
                            }
                            d += h.shift() + h
                        }
                        return m.end = d, p = n ? g : r ? m : c(o, u, h[0], h[1], h[2], h[3], h[4], h[5], 1)
                    }, null, t._.clone)
                }

                function c(t, e, n, r, i, a, s, o, l) {
                    var u = 1 - l,
                        c = $(u, 3),
                        h = $(u, 2),
                        f = l * l,
                        p = f * l,
                        d = c * t + 3 * h * l * n + 3 * u * l * l * i + p * s,
                        m = c * e + 3 * h * l * r + 3 * u * l * l * a + p * o,
                        g = t + 2 * l * (n - t) + f * (i - 2 * n + t),
                        v = e + 2 * l * (r - e) + f * (a - 2 * r + e),
                        y = n + 2 * l * (i - n) + f * (s - 2 * i + n),
                        _ = r + 2 * l * (a - r) + f * (o - 2 * a + r),
                        x = u * t + l * n,
                        b = u * e + l * r,
                        w = u * i + l * s,
                        T = u * a + l * o,
                        k = 90 - 180 * q.atan2(g - y, v - _) / X;
                    return {
                        x: d,
                        y: m,
                        m: {
                            x: g,
                            y: v
                        },
                        n: {
                            x: y,
                            y: _
                        },
                        start: {
                            x: x,
                            y: b
                        },
                        end: {
                            x: w,
                            y: T
                        },
                        alpha: k
                    }
                }

                function h(e, n, r, i, s, o, l, u) {
                    t.is(e, "array") || (e = [e, n, r, i, s, o, l, u]);
                    var c = M.apply(null, e);
                    return a(c.min.x, c.min.y, c.max.x - c.min.x, c.max.y - c.min.y)
                }

                function f(t, e, n) {
                    return e >= t.x && e <= t.x + t.width && n >= t.y && n <= t.y + t.height
                }

                function p(t, e) {
                    return t = a(t), e = a(e), f(e, t.x, t.y) || f(e, t.x2, t.y) || f(e, t.x, t.y2) || f(e, t.x2, t.y2) || f(t, e.x, e.y) || f(t, e.x2, e.y) || f(t, e.x, e.y2) || f(t, e.x2, e.y2) || (t.x < e.x2 && t.x > e.x || e.x < t.x2 && e.x > t.x) && (t.y < e.y2 && t.y > e.y || e.y < t.y2 && e.y > t.y)
                }

                function d(t, e, n, r, i) {
                    var a = -3 * e + 9 * n - 9 * r + 3 * i,
                        s = t * a + 6 * e - 12 * n + 6 * r;
                    return t * s - 3 * e + 3 * n
                }

                function m(t, e, n, r, i, a, s, o, l) {
                    null == l && (l = 1), l = l > 1 ? 1 : 0 > l ? 0 : l;
                    for (var u = l / 2, c = 12, h = [-.1252, .1252, -.3678, .3678, -.5873, .5873, -.7699, .7699, -.9041, .9041, -.9816, .9816], f = [.2491, .2491, .2335, .2335, .2032, .2032, .1601, .1601, .1069, .1069, .0472, .0472], p = 0, m = 0; c > m; m++) {
                        var g = u * h[m] + u,
                            v = d(g, t, n, i, s),
                            y = d(g, e, r, a, o),
                            _ = v * v + y * y;
                        p += f[m] * q.sqrt(_)
                    }
                    return u * p
                }

                function g(t, e, n, r, i, a, s, o, l) {
                    if (!(0 > l || m(t, e, n, r, i, a, s, o) < l)) {
                        var u, c = 1,
                            h = c / 2,
                            f = c - h,
                            p = .01;
                        for (u = m(t, e, n, r, i, a, s, o, f); U(u - l) > p;) h /= 2, f += (l > u ? 1 : -1) * h, u = m(t, e, n, r, i, a, s, o, f);
                        return f
                    }
                }

                function v(t, e, n, r, i, a, s, o) {
                    if (!(V(t, n) < H(i, s) || H(t, n) > V(i, s) || V(e, r) < H(a, o) || H(e, r) > V(a, o))) {
                        var l = (t * r - e * n) * (i - s) - (t - n) * (i * o - a * s),
                            u = (t * r - e * n) * (a - o) - (e - r) * (i * o - a * s),
                            c = (t - n) * (a - o) - (e - r) * (i - s);
                        if (c) {
                            var h = l / c,
                                f = u / c,
                                p = +h.toFixed(2),
                                d = +f.toFixed(2);
                            if (!(p < +H(t, n).toFixed(2) || p > +V(t, n).toFixed(2) || p < +H(i, s).toFixed(2) || p > +V(i, s).toFixed(2) || d < +H(e, r).toFixed(2) || d > +V(e, r).toFixed(2) || d < +H(a, o).toFixed(2) || d > +V(a, o).toFixed(2))) return {
                                x: h,
                                y: f
                            }
                        }
                    }
                }

                function y(t, e, n) {
                    var r = h(t),
                        i = h(e);
                    if (!p(r, i)) return n ? 0 : [];
                    for (var a = m.apply(0, t), s = m.apply(0, e), o = ~~(a / 8), l = ~~(s / 8), u = [], f = [], d = {}, g = n ? 0 : [], y = 0; o + 1 > y; y++) {
                        var _ = c.apply(0, t.concat(y / o));
                        u.push({
                            x: _.x,
                            y: _.y,
                            t: y / o
                        })
                    }
                    for (y = 0; l + 1 > y; y++) _ = c.apply(0, e.concat(y / l)), f.push({
                        x: _.x,
                        y: _.y,
                        t: y / l
                    });
                    for (y = 0; o > y; y++)
                        for (var x = 0; l > x; x++) {
                            var b = u[y],
                                w = u[y + 1],
                                T = f[x],
                                k = f[x + 1],
                                C = U(w.x - b.x) < .001 ? "y" : "x",
                                S = U(k.x - T.x) < .001 ? "y" : "x",
                                P = v(b.x, b.y, w.x, w.y, T.x, T.y, k.x, k.y);
                            if (P) {
                                if (d[P.x.toFixed(4)] == P.y.toFixed(4)) continue;
                                d[P.x.toFixed(4)] = P.y.toFixed(4);
                                var A = b.t + U((P[C] - b[C]) / (w[C] - b[C])) * (w.t - b.t),
                                    O = T.t + U((P[S] - T[S]) / (k[S] - T[S])) * (k.t - T.t);
                                A >= 0 && 1 >= A && O >= 0 && 1 >= O && (n ? g++ : g.push({
                                    x: P.x,
                                    y: P.y,
                                    t1: A,
                                    t2: O
                                }))
                            }
                        }
                    return g
                }

                function _(t, e) {
                    return b(t, e)
                }

                function x(t, e) {
                    return b(t, e, 1)
                }

                function b(t, e, n) {
                    t = N(t), e = N(e);
                    for (var r, i, a, s, o, l, u, c, h, f, p = n ? 0 : [], d = 0, m = t.length; m > d; d++) {
                        var g = t[d];
                        if ("M" == g[0]) r = o = g[1], i = l = g[2];
                        else {
                            "C" == g[0] ? (h = [r, i].concat(g.slice(1)), r = h[6], i = h[7]) : (h = [r, i, r, i, o, l, o, l], r = o, i = l);
                            for (var v = 0, _ = e.length; _ > v; v++) {
                                var x = e[v];
                                if ("M" == x[0]) a = u = x[1], s = c = x[2];
                                else {
                                    "C" == x[0] ? (f = [a, s].concat(x.slice(1)), a = f[6], s = f[7]) : (f = [a, s, a, s, u, c, u, c], a = u, s = c);
                                    var b = y(h, f, n);
                                    if (n) p += b;
                                    else {
                                        for (var w = 0, T = b.length; T > w; w++) b[w].segment1 = d, b[w].segment2 = v, b[w].bez1 = h, b[w].bez2 = f;
                                        p = p.concat(b)
                                    }
                                }
                            }
                        }
                    }
                    return p
                }

                function w(t, e, n) {
                    var r = T(t);
                    return f(r, e, n) && b(t, [
                        ["M", e, n],
                        ["H", r.x2 + 10]
                    ], 1) % 2 == 1
                }

                function T(t) {
                    var e = i(t);
                    if (e.bbox) return I(e.bbox);
                    if (!t) return a();
                    t = N(t);
                    for (var n, r = 0, s = 0, o = [], l = [], u = 0, c = t.length; c > u; u++)
                        if (n = t[u], "M" == n[0]) r = n[1], s = n[2], o.push(r), l.push(s);
                        else {
                            var h = M(r, s, n[1], n[2], n[3], n[4], n[5], n[6]);
                            o = o.concat(h.min.x, h.max.x), l = l.concat(h.min.y, h.max.y), r = n[5], s = n[6]
                        }
                    var f = H.apply(0, o),
                        p = H.apply(0, l),
                        d = V.apply(0, o),
                        m = V.apply(0, l),
                        g = a(f, p, d - f, m - p);
                    return e.bbox = I(g), g
                }

                function k(t, e, n, r, i) {
                    if (i) return [
                        ["M", +t + +i, e],
                        ["l", n - 2 * i, 0],
                        ["a", i, i, 0, 0, 1, i, i],
                        ["l", 0, r - 2 * i],
                        ["a", i, i, 0, 0, 1, -i, i],
                        ["l", 2 * i - n, 0],
                        ["a", i, i, 0, 0, 1, -i, -i],
                        ["l", 0, 2 * i - r],
                        ["a", i, i, 0, 0, 1, i, -i],
                        ["z"]
                    ];
                    var a = [
                        ["M", t, e],
                        ["l", n, 0],
                        ["l", 0, r],
                        ["l", -n, 0],
                        ["z"]
                    ];
                    return a.toString = s, a
                }

                function C(t, e, n, r, i) {
                    if (null == i && null == r && (r = n), t = +t, e = +e, n = +n, r = +r, null != i) var a = Math.PI / 180,
                        o = t + n * Math.cos(-r * a),
                        l = t + n * Math.cos(-i * a),
                        u = e + n * Math.sin(-r * a),
                        c = e + n * Math.sin(-i * a),
                        h = [
                            ["M", o, u],
                            ["A", n, n, 0, +(i - r > 180), 0, l, c]
                        ];
                    else h = [
                        ["M", t, e],
                        ["m", 0, -r],
                        ["a", n, r, 0, 1, 1, 0, 2 * r],
                        ["a", n, r, 0, 1, 1, 0, -2 * r],
                        ["z"]
                    ];
                    return h.toString = s, h
                }

                function S(e) {
                    var n = i(e),
                        r = String.prototype.toLowerCase;
                    if (n.rel) return o(n.rel);
                    t.is(e, "array") && t.is(e && e[0], "array") || (e = t.parsePathString(e));
                    var a = [],
                        l = 0,
                        u = 0,
                        c = 0,
                        h = 0,
                        f = 0;
                    "M" == e[0][0] && (l = e[0][1], u = e[0][2], c = l, h = u, f++, a.push(["M", l, u]));
                    for (var p = f, d = e.length; d > p; p++) {
                        var m = a[p] = [],
                            g = e[p];
                        if (g[0] != r.call(g[0])) switch (m[0] = r.call(g[0]), m[0]) {
                            case "a":
                                m[1] = g[1], m[2] = g[2], m[3] = g[3], m[4] = g[4], m[5] = g[5], m[6] = +(g[6] - l).toFixed(3), m[7] = +(g[7] - u).toFixed(3);
                                break;
                            case "v":
                                m[1] = +(g[1] - u).toFixed(3);
                                break;
                            case "m":
                                c = g[1], h = g[2];
                            default:
                                for (var v = 1, y = g.length; y > v; v++) m[v] = +(g[v] - (v % 2 ? l : u)).toFixed(3)
                        } else {
                            m = a[p] = [], "m" == g[0] && (c = g[1] + l, h = g[2] + u);
                            for (var _ = 0, x = g.length; x > _; _++) a[p][_] = g[_]
                        }
                        var b = a[p].length;
                        switch (a[p][0]) {
                            case "z":
                                l = c, u = h;
                                break;
                            case "h":
                                l += +a[p][b - 1];
                                break;
                            case "v":
                                u += +a[p][b - 1];
                                break;
                            default:
                                l += +a[p][b - 2], u += +a[p][b - 1]
                        }
                    }
                    return a.toString = s, n.rel = o(a), a
                }

                function P(e) {
                    var n = i(e);
                    if (n.abs) return o(n.abs);
                    if (F(e, "array") && F(e && e[0], "array") || (e = t.parsePathString(e)), !e || !e.length) return [
                        ["M", 0, 0]
                    ];
                    var r, a = [],
                        l = 0,
                        u = 0,
                        c = 0,
                        h = 0,
                        f = 0;
                    "M" == e[0][0] && (l = +e[0][1], u = +e[0][2], c = l, h = u, f++, a[0] = ["M", l, u]);
                    for (var p, d, m = 3 == e.length && "M" == e[0][0] && "R" == e[1][0].toUpperCase() && "Z" == e[2][0].toUpperCase(), g = f, v = e.length; v > g; g++) {
                        if (a.push(p = []), d = e[g], r = d[0], r != r.toUpperCase()) switch (p[0] = r.toUpperCase(), p[0]) {
                                case "A":
                                    p[1] = d[1], p[2] = d[2], p[3] = d[3], p[4] = d[4], p[5] = d[5], p[6] = +d[6] + l, p[7] = +d[7] + u;
                                    break;
                                case "V":
                                    p[1] = +d[1] + u;
                                    break;
                                case "H":
                                    p[1] = +d[1] + l;
                                    break;
                                case "R":
                                    for (var y = [l, u].concat(d.slice(1)), _ = 2, x = y.length; x > _; _++) y[_] = +y[_] + l, y[++_] = +y[_] + u;
                                    a.pop(), a = a.concat(D(y, m));
                                    break;
                                case "O":
                                    a.pop(), y = C(l, u, d[1], d[2]), y.push(y[0]), a = a.concat(y);
                                    break;
                                case "U":
                                    a.pop(), a = a.concat(C(l, u, d[1], d[2], d[3])), p = ["U"].concat(a[a.length - 1].slice(-2));
                                    break;
                                case "M":
                                    c = +d[1] + l, h = +d[2] + u;
                                default:
                                    for (_ = 1, x = d.length; x > _; _++) p[_] = +d[_] + (_ % 2 ? l : u)
                            } else if ("R" == r) y = [l, u].concat(d.slice(1)), a.pop(), a = a.concat(D(y, m)), p = ["R"].concat(d.slice(-2));
                            else if ("O" == r) a.pop(), y = C(l, u, d[1], d[2]), y.push(y[0]), a = a.concat(y);
                        else if ("U" == r) a.pop(), a = a.concat(C(l, u, d[1], d[2], d[3])), p = ["U"].concat(a[a.length - 1].slice(-2));
                        else
                            for (var b = 0, w = d.length; w > b; b++) p[b] = d[b];
                        if (r = r.toUpperCase(), "O" != r) switch (p[0]) {
                            case "Z":
                                l = +c, u = +h;
                                break;
                            case "H":
                                l = p[1];
                                break;
                            case "V":
                                u = p[1];
                                break;
                            case "M":
                                c = p[p.length - 2], h = p[p.length - 1];
                            default:
                                l = p[p.length - 2], u = p[p.length - 1]
                        }
                    }
                    return a.toString = s, n.abs = o(a), a
                }

                function A(t, e, n, r) {
                    return [t, e, n, r, n, r]
                }

                function O(t, e, n, r, i, a) {
                    var s = 1 / 3,
                        o = 2 / 3;
                    return [s * t + o * n, s * e + o * r, s * i + o * n, s * a + o * r, i, a]
                }

                function j(e, n, r, i, a, s, o, l, u, c) {
                    var h, f = 120 * X / 180,
                        p = X / 180 * (+a || 0),
                        d = [],
                        m = t._.cacher(function(t, e, n) {
                            var r = t * q.cos(n) - e * q.sin(n),
                                i = t * q.sin(n) + e * q.cos(n);
                            return {
                                x: r,
                                y: i
                            }
                        });
                    if (c) k = c[0], C = c[1], w = c[2], T = c[3];
                    else {
                        h = m(e, n, -p), e = h.x, n = h.y, h = m(l, u, -p), l = h.x, u = h.y;
                        var g = (q.cos(X / 180 * a), q.sin(X / 180 * a), (e - l) / 2),
                            v = (n - u) / 2,
                            y = g * g / (r * r) + v * v / (i * i);
                        y > 1 && (y = q.sqrt(y), r = y * r, i = y * i);
                        var _ = r * r,
                            x = i * i,
                            b = (s == o ? -1 : 1) * q.sqrt(U((_ * x - _ * v * v - x * g * g) / (_ * v * v + x * g * g))),
                            w = b * r * v / i + (e + l) / 2,
                            T = b * -i * g / r + (n + u) / 2,
                            k = q.asin(((n - T) / i).toFixed(9)),
                            C = q.asin(((u - T) / i).toFixed(9));
                        k = w > e ? X - k : k, C = w > l ? X - C : C, 0 > k && (k = 2 * X + k), 0 > C && (C = 2 * X + C), o && k > C && (k -= 2 * X), !o && C > k && (C -= 2 * X)
                    }
                    var S = C - k;
                    if (U(S) > f) {
                        var P = C,
                            A = l,
                            O = u;
                        C = k + f * (o && C > k ? 1 : -1), l = w + r * q.cos(C), u = T + i * q.sin(C), d = j(l, u, r, i, a, 0, o, A, O, [C, P, w, T])
                    }
                    S = C - k;
                    var M = q.cos(k),
                        N = q.sin(k),
                        R = q.cos(C),
                        D = q.sin(C),
                        E = q.tan(S / 4),
                        F = 4 / 3 * r * E,
                        I = 4 / 3 * i * E,
                        L = [e, n],
                        z = [e + F * N, n - I * M],
                        B = [l + F * D, u - I * R],
                        H = [l, u];
                    if (z[0] = 2 * L[0] - z[0], z[1] = 2 * L[1] - z[1], c) return [z, B, H].concat(d);
                    d = [z, B, H].concat(d).join().split(",");
                    for (var V = [], $ = 0, Y = d.length; Y > $; $++) V[$] = $ % 2 ? m(d[$ - 1], d[$], p).y : m(d[$], d[$ + 1], p).x;
                    return V
                }

                function M(t, e, n, r, i, a, s, o) {
                    for (var l, u, c, h, f, p, d, m, g = [], v = [
                            [],
                            []
                        ], y = 0; 2 > y; ++y)
                        if (0 == y ? (u = 6 * t - 12 * n + 6 * i, l = -3 * t + 9 * n - 9 * i + 3 * s, c = 3 * n - 3 * t) : (u = 6 * e - 12 * r + 6 * a, l = -3 * e + 9 * r - 9 * a + 3 * o, c = 3 * r - 3 * e), U(l) < 1e-12) {
                            if (U(u) < 1e-12) continue;
                            h = -c / u, h > 0 && 1 > h && g.push(h)
                        } else d = u * u - 4 * c * l, m = q.sqrt(d), 0 > d || (f = (-u + m) / (2 * l), f > 0 && 1 > f && g.push(f), p = (-u - m) / (2 * l), p > 0 && 1 > p && g.push(p));
                    for (var _, x = g.length, b = x; x--;) h = g[x], _ = 1 - h, v[0][x] = _ * _ * _ * t + 3 * _ * _ * h * n + 3 * _ * h * h * i + h * h * h * s, v[1][x] = _ * _ * _ * e + 3 * _ * _ * h * r + 3 * _ * h * h * a + h * h * h * o;
                    return v[0][b] = t, v[1][b] = e, v[0][b + 1] = s, v[1][b + 1] = o, v[0].length = v[1].length = b + 2, {
                        min: {
                            x: H.apply(0, v[0]),
                            y: H.apply(0, v[1])
                        },
                        max: {
                            x: V.apply(0, v[0]),
                            y: V.apply(0, v[1])
                        }
                    }
                }

                function N(t, e) {
                    var n = !e && i(t);
                    if (!e && n.curve) return o(n.curve);
                    for (var r = P(t), a = e && P(e), s = {
                            x: 0,
                            y: 0,
                            bx: 0,
                            by: 0,
                            X: 0,
                            Y: 0,
                            qx: null,
                            qy: null
                        }, l = {
                            x: 0,
                            y: 0,
                            bx: 0,
                            by: 0,
                            X: 0,
                            Y: 0,
                            qx: null,
                            qy: null
                        }, u = (function(t, e, n) {
                            var r, i;
                            if (!t) return ["C", e.x, e.y, e.x, e.y, e.x, e.y];
                            switch (!(t[0] in {
                                T: 1,
                                Q: 1
                            }) && (e.qx = e.qy = null), t[0]) {
                                case "M":
                                    e.X = t[1], e.Y = t[2];
                                    break;
                                case "A":
                                    t = ["C"].concat(j.apply(0, [e.x, e.y].concat(t.slice(1))));
                                    break;
                                case "S":
                                    "C" == n || "S" == n ? (r = 2 * e.x - e.bx, i = 2 * e.y - e.by) : (r = e.x, i = e.y), t = ["C", r, i].concat(t.slice(1));
                                    break;
                                case "T":
                                    "Q" == n || "T" == n ? (e.qx = 2 * e.x - e.qx, e.qy = 2 * e.y - e.qy) : (e.qx = e.x, e.qy = e.y), t = ["C"].concat(O(e.x, e.y, e.qx, e.qy, t[1], t[2]));
                                    break;
                                case "Q":
                                    e.qx = t[1], e.qy = t[2], t = ["C"].concat(O(e.x, e.y, t[1], t[2], t[3], t[4]));
                                    break;
                                case "L":
                                    t = ["C"].concat(A(e.x, e.y, t[1], t[2]));
                                    break;
                                case "H":
                                    t = ["C"].concat(A(e.x, e.y, t[1], e.y));
                                    break;
                                case "V":
                                    t = ["C"].concat(A(e.x, e.y, e.x, t[1]));
                                    break;
                                case "Z":
                                    t = ["C"].concat(A(e.x, e.y, e.X, e.Y))
                            }
                            return t
                        }), c = function(t, e) {
                            if (t[e].length > 7) {
                                t[e].shift();
                                for (var n = t[e]; n.length;) f[e] = "A", a && (p[e] = "A"), t.splice(e++, 0, ["C"].concat(n.splice(0, 6)));
                                t.splice(e, 1), v = V(r.length, a && a.length || 0)
                            }
                        }, h = function(t, e, n, i, s) {
                            t && e && "M" == t[s][0] && "M" != e[s][0] && (e.splice(s, 0, ["M", i.x, i.y]), n.bx = 0, n.by = 0, n.x = t[s][1], n.y = t[s][2], v = V(r.length, a && a.length || 0))
                        }, f = [], p = [], d = "", m = "", g = 0, v = V(r.length, a && a.length || 0); v > g; g++) {
                        r[g] && (d = r[g][0]), "C" != d && (f[g] = d, g && (m = f[g - 1])), r[g] = u(r[g], s, m), "A" != f[g] && "C" == d && (f[g] = "C"), c(r, g), a && (a[g] && (d = a[g][0]), "C" != d && (p[g] = d, g && (m = p[g - 1])), a[g] = u(a[g], l, m), "A" != p[g] && "C" == d && (p[g] = "C"), c(a, g)), h(r, a, s, l, g), h(a, r, l, s, g);
                        var y = r[g],
                            _ = a && a[g],
                            x = y.length,
                            b = a && _.length;
                        s.x = y[x - 2], s.y = y[x - 1], s.bx = B(y[x - 4]) || s.x, s.by = B(y[x - 3]) || s.y, l.bx = a && (B(_[b - 4]) || l.x), l.by = a && (B(_[b - 3]) || l.y), l.x = a && _[b - 2], l.y = a && _[b - 1]
                    }
                    return a || (n.curve = o(r)), a ? [r, a] : r
                }

                function R(t, e) {
                    if (!e) return t;
                    var n, r, i, a, s, o, l;
                    for (t = N(t), i = 0, s = t.length; s > i; i++)
                        for (l = t[i], a = 1, o = l.length; o > a; a += 2) n = e.x(l[a], l[a + 1]), r = e.y(l[a], l[a + 1]), l[a] = n, l[a + 1] = r;
                    return t
                }

                function D(t, e) {
                    for (var n = [], r = 0, i = t.length; i - 2 * !e > r; r += 2) {
                        var a = [{
                            x: +t[r - 2],
                            y: +t[r - 1]
                        }, {
                            x: +t[r],
                            y: +t[r + 1]
                        }, {
                            x: +t[r + 2],
                            y: +t[r + 3]
                        }, {
                            x: +t[r + 4],
                            y: +t[r + 5]
                        }];
                        e ? r ? i - 4 == r ? a[3] = {
                            x: +t[0],
                            y: +t[1]
                        } : i - 2 == r && (a[2] = {
                            x: +t[0],
                            y: +t[1]
                        }, a[3] = {
                            x: +t[2],
                            y: +t[3]
                        }) : a[0] = {
                            x: +t[i - 2],
                            y: +t[i - 1]
                        } : i - 4 == r ? a[3] = a[2] : r || (a[0] = {
                            x: +t[r],
                            y: +t[r + 1]
                        }), n.push(["C", (-a[0].x + 6 * a[1].x + a[2].x) / 6, (-a[0].y + 6 * a[1].y + a[2].y) / 6, (a[1].x + 6 * a[2].x - a[3].x) / 6, (a[1].y + 6 * a[2].y - a[3].y) / 6, a[2].x, a[2].y])
                    }
                    return n
                }
                var E = e.prototype,
                    F = t.is,
                    I = t._.clone,
                    L = "hasOwnProperty",
                    z = /,?([a-z]),?/gi,
                    B = parseFloat,
                    q = Math,
                    X = q.PI,
                    H = q.min,
                    V = q.max,
                    $ = q.pow,
                    U = q.abs,
                    Y = u(1),
                    W = u(),
                    G = u(0, 1),
                    Z = t._unit2px,
                    Q = {
                        path: function(t) {
                            return t.attr("path")
                        },
                        circle: function(t) {
                            var e = Z(t);
                            return C(e.cx, e.cy, e.r)
                        },
                        ellipse: function(t) {
                            var e = Z(t);
                            return C(e.cx || 0, e.cy || 0, e.rx, e.ry)
                        },
                        rect: function(t) {
                            var e = Z(t);
                            return k(e.x || 0, e.y || 0, e.width, e.height, e.rx, e.ry)
                        },
                        image: function(t) {
                            var e = Z(t);
                            return k(e.x || 0, e.y || 0, e.width, e.height)
                        },
                        line: function(t) {
                            return "M" + [t.attr("x1") || 0, t.attr("y1") || 0, t.attr("x2"), t.attr("y2")]
                        },
                        polyline: function(t) {
                            return "M" + t.attr("points")
                        },
                        polygon: function(t) {
                            return "M" + t.attr("points") + "z"
                        },
                        deflt: function(t) {
                            var e = t.node.getBBox();
                            return k(e.x, e.y, e.width, e.height)
                        }
                    };
                t.path = i, t.path.getTotalLength = Y, t.path.getPointAtLength = W, t.path.getSubpath = function(t, e, n) {
                    if (this.getTotalLength(t) - n < 1e-6) return G(t, e).end;
                    var r = G(t, n, 1);
                    return e ? G(r, e).end : r
                }, E.getTotalLength = function() {
                    return this.node.getTotalLength ? this.node.getTotalLength() : void 0
                }, E.getPointAtLength = function(t) {
                    return W(this.attr("d"), t)
                }, E.getSubpath = function(e, n) {
                    return t.path.getSubpath(this.attr("d"), e, n)
                }, t._.box = a, t.path.findDotsAtSegment = c, t.path.bezierBBox = h, t.path.isPointInsideBBox = f, t.closest = function(e, n, r, i) {
                    for (var s = 100, o = a(e - s / 2, n - s / 2, s, s), l = [], u = r[0].hasOwnProperty("x") ? function(t) {
                            return {
                                x: r[t].x,
                                y: r[t].y
                            }
                        } : function(t) {
                            return {
                                x: r[t],
                                y: i[t]
                            }
                        }, c = 0; 1e6 >= s && !c;) {
                        for (var h = 0, p = r.length; p > h; h++) {
                            var d = u(h);
                            if (f(o, d.x, d.y)) {
                                c++, l.push(d);
                                break
                            }
                        }
                        c || (s *= 2, o = a(e - s / 2, n - s / 2, s, s))
                    }
                    if (1e6 != s) {
                        var m, g = 1 / 0;
                        for (h = 0, p = l.length; p > h; h++) {
                            var v = t.len(e, n, l[h].x, l[h].y);
                            g > v && (g = v, l[h].len = v, m = l[h])
                        }
                        return m
                    }
                }, t.path.isBBoxIntersect = p, t.path.intersection = _, t.path.intersectionNumber = x, t.path.isPointInside = w, t.path.getBBox = T, t.path.get = Q, t.path.toRelative = S, t.path.toAbsolute = P, t.path.toCubic = N, t.path.map = R, t.path.toString = s, t.path.clone = o
            }), r.plugin(function(t, r, i, a) {
                var s = Math.max,
                    o = Math.min,
                    l = function(t) {
                        if (this.items = [], this.bindings = {}, this.length = 0, this.type = "set", t)
                            for (var e = 0, n = t.length; n > e; e++) t[e] && (this[this.items.length] = this.items[this.items.length] = t[e], this.length++)
                    },
                    u = l.prototype;
                u.push = function() {
                    for (var t, e, n = 0, r = arguments.length; r > n; n++) t = arguments[n], t && (e = this.items.length, this[e] = this.items[e] = t, this.length++);
                    return this
                }, u.pop = function() {
                    return this.length && delete this[this.length--], this.items.pop()
                }, u.forEach = function(t, e) {
                    for (var n = 0, r = this.items.length; r > n; n++)
                        if (t.call(e, this.items[n], n) === !1) return this;
                    return this
                }, u.animate = function(r, i, a, s) {
                    "function" != typeof a || a.length || (s = a, a = n.linear), r instanceof t._.Animation && (s = r.callback, a = r.easing, i = a.dur, r = r.attr);
                    var o = arguments;
                    if (t.is(r, "array") && t.is(o[o.length - 1], "array")) var l = !0;
                    var u, c = function() {
                            u ? this.b = u : u = this.b
                        },
                        h = 0,
                        f = this,
                        p = s && function() {
                            ++h == f.length && s.call(this)
                        };
                    return this.forEach(function(t, n) {
                        e.once("snap.animcreated." + t.id, c), l ? o[n] && t.animate.apply(t, o[n]) : t.animate(r, i, a, p)
                    })
                }, u.remove = function() {
                    for (; this.length;) this.pop().remove();
                    return this
                }, u.bind = function(t, e, n) {
                    var r = {};
                    if ("function" == typeof e) this.bindings[t] = e;
                    else {
                        var i = n || t;
                        this.bindings[t] = function(t) {
                            r[i] = t, e.attr(r)
                        }
                    }
                    return this
                }, u.attr = function(t) {
                    var e = {};
                    for (var n in t) this.bindings[n] ? this.bindings[n](t[n]) : e[n] = t[n];
                    for (var r = 0, i = this.items.length; i > r; r++) this.items[r].attr(e);
                    return this
                }, u.clear = function() {
                    for (; this.length;) this.pop()
                }, u.splice = function(t, e, n) {
                    t = 0 > t ? s(this.length + t, 0) : t, e = s(0, o(this.length - t, e));
                    var r, i = [],
                        a = [],
                        u = [];
                    for (r = 2; r < arguments.length; r++) u.push(arguments[r]);
                    for (r = 0; e > r; r++) a.push(this[t + r]);
                    for (; r < this.length - t; r++) i.push(this[t + r]);
                    var c = u.length;
                    for (r = 0; r < c + i.length; r++) this.items[t + r] = this[t + r] = c > r ? u[r] : i[r - c];
                    for (r = this.items.length = this.length -= e - c; this[r];) delete this[r++];
                    return new l(a)
                }, u.exclude = function(t) {
                    for (var e = 0, n = this.length; n > e; e++)
                        if (this[e] == t) return this.splice(e, 1), !0;
                    return !1
                }, u.insertAfter = function(t) {
                    for (var e = this.items.length; e--;) this.items[e].insertAfter(t);
                    return this
                }, u.getBBox = function() {
                    for (var t = [], e = [], n = [], r = [], i = this.items.length; i--;)
                        if (!this.items[i].removed) {
                            var a = this.items[i].getBBox();
                            t.push(a.x), e.push(a.y), n.push(a.x + a.width), r.push(a.y + a.height)
                        }
                    return t = o.apply(0, t), e = o.apply(0, e), n = s.apply(0, n), r = s.apply(0, r), {
                        x: t,
                        y: e,
                        x2: n,
                        y2: r,
                        width: n - t,
                        height: r - e,
                        cx: t + (n - t) / 2,
                        cy: e + (r - e) / 2
                    }
                }, u.clone = function(t) {
                    t = new l;
                    for (var e = 0, n = this.items.length; n > e; e++) t.push(this.items[e].clone());
                    return t
                }, u.toString = function() {
                    return "Snap‘s set"
                }, u.type = "set", t.Set = l, t.set = function() {
                    var t = new l;
                    return arguments.length && t.push.apply(t, Array.prototype.slice.call(arguments, 0)), t
                }
            }), r.plugin(function(t, n, r, i) {
                function a(t) {
                    var e = t[0];
                    switch (e.toLowerCase()) {
                        case "t":
                            return [e, 0, 0];
                        case "m":
                            return [e, 1, 0, 0, 1, 0, 0];
                        case "r":
                            return 4 == t.length ? [e, 0, t[2], t[3]] : [e, 0];
                        case "s":
                            return 5 == t.length ? [e, 1, 1, t[3], t[4]] : 3 == t.length ? [e, 1, 1] : [e, 1]
                    }
                }

                function s(e, n, r) {
                    n = v(n).replace(/\.{3}|\u2026/g, e), e = t.parseTransformString(e) || [], n = t.parseTransformString(n) || [];
                    for (var i, s, o, l, u = Math.max(e.length, n.length), c = [], p = [], d = 0; u > d; d++) {
                        if (o = e[d] || a(n[d]), l = n[d] || a(o), o[0] != l[0] || "r" == o[0].toLowerCase() && (o[2] != l[2] || o[3] != l[3]) || "s" == o[0].toLowerCase() && (o[3] != l[3] || o[4] != l[4])) {
                            e = t._.transform2matrix(e, r()), n = t._.transform2matrix(n, r()), c = [
                                ["m", e.a, e.b, e.c, e.d, e.e, e.f]
                            ], p = [
                                ["m", n.a, n.b, n.c, n.d, n.e, n.f]
                            ];
                            break
                        }
                        for (c[d] = [], p[d] = [], i = 0, s = Math.max(o.length, l.length); s > i; i++) i in o && (c[d][i] = o[i]), i in l && (p[d][i] = l[i])
                    }
                    return {
                        from: f(c),
                        to: f(p),
                        f: h(c)
                    }
                }

                function o(t) {
                    return t
                }

                function l(t) {
                    return function(e) {
                        return +e.toFixed(3) + t
                    }
                }

                function u(t) {
                    return t.join(" ")
                }

                function c(e) {
                    return t.rgb(e[0], e[1], e[2])
                }

                function h(t) {
                    var e, n, r, i, a, s, o = 0,
                        l = [];
                    for (e = 0, n = t.length; n > e; e++) {
                        for (a = "[", s = ['"' + t[e][0] + '"'], r = 1, i = t[e].length; i > r; r++) s[r] = "val[" + o++ + "]";
                        a += s + "]", l[e] = a
                    }
                    return Function("val", "return Snap.path.toString.call([" + l + "])")
                }

                function f(t) {
                    for (var e = [], n = 0, r = t.length; r > n; n++)
                        for (var i = 1, a = t[n].length; a > i; i++) e.push(t[n][i]);
                    return e
                }

                function p(t) {
                    return isFinite(parseFloat(t))
                }

                function d(e, n) {
                    return t.is(e, "array") && t.is(n, "array") ? e.toString() == n.toString() : !1
                }
                var m = {},
                    g = /[a-z]+$/i,
                    v = String;
                m.stroke = m.fill = "colour", n.prototype.equal = function(t, n) {
                    return e("snap.util.equal", this, t, n).firstDefined()
                }, e.on("snap.util.equal", function(e, n) {
                    var r, i, a = v(this.attr(e) || ""),
                        y = this;
                    if (p(a) && p(n)) return {
                        from: parseFloat(a),
                        to: parseFloat(n),
                        f: o
                    };
                    if ("colour" == m[e]) return r = t.color(a), i = t.color(n), {
                        from: [r.r, r.g, r.b, r.opacity],
                        to: [i.r, i.g, i.b, i.opacity],
                        f: c
                    };
                    if ("viewBox" == e) return r = this.attr(e).vb.split(" ").map(Number), i = n.split(" ").map(Number), {
                        from: r,
                        to: i,
                        f: u
                    };
                    if ("transform" == e || "gradientTransform" == e || "patternTransform" == e) return n instanceof t.Matrix && (n = n.toTransformString()), t._.rgTransform.test(n) || (n = t._.svgTransform2string(n)), s(a, n, function() {
                        return y.getBBox(1)
                    });
                    if ("d" == e || "path" == e) return r = t.path.toCubic(a, n), {
                        from: f(r[0]),
                        to: f(r[1]),
                        f: h(r[0])
                    };
                    if ("points" == e) return r = v(a).split(t._.separator), i = v(n).split(t._.separator), {
                        from: r,
                        to: i,
                        f: function(t) {
                            return t
                        }
                    };
                    var _ = a.match(g),
                        x = v(n).match(g);
                    return _ && d(_, x) ? {
                        from: parseFloat(a),
                        to: parseFloat(n),
                        f: l(_)
                    } : {
                        from: this.asPX(e),
                        to: this.asPX(e, n),
                        f: o
                    }
                })
            }), r.plugin(function(t, n, r, i) {
                for (var a = n.prototype, s = "hasOwnProperty", o = ("createTouch" in i.doc), l = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "touchstart", "touchmove", "touchend", "touchcancel"], u = {
                        mousedown: "touchstart",
                        mousemove: "touchmove",
                        mouseup: "touchend"
                    }, c = (function(t, e) {
                        var n = "y" == t ? "scrollTop" : "scrollLeft",
                            r = e && e.node ? e.node.ownerDocument : i.doc;
                        return r[n in r.documentElement ? "documentElement" : "body"][n]
                    }), h = function() {
                        return this.originalEvent.preventDefault()
                    }, f = function() {
                        return this.originalEvent.stopPropagation()
                    }, p = function(t, e, n, r) {
                        var i = o && u[e] ? u[e] : e,
                            a = function(i) {
                                var a = c("y", r),
                                    l = c("x", r);
                                if (o && u[s](e))
                                    for (var p = 0, d = i.targetTouches && i.targetTouches.length; d > p; p++)
                                        if (i.targetTouches[p].target == t || t.contains(i.targetTouches[p].target)) {
                                            var m = i;
                                            i = i.targetTouches[p], i.originalEvent = m, i.preventDefault = h, i.stopPropagation = f;
                                            break
                                        }
                                var g = i.clientX + l,
                                    v = i.clientY + a;
                                return n.call(r, i, g, v)
                            };
                        return e !== i && t.addEventListener(e, a, !1), t.addEventListener(i, a, !1),
                            function() {
                                return e !== i && t.removeEventListener(e, a, !1), t.removeEventListener(i, a, !1), !0
                            }
                    }, d = [], m = function(t) {
                        for (var n, r = t.clientX, i = t.clientY, a = c("y"), s = c("x"), l = d.length; l--;) {
                            if (n = d[l], o) {
                                for (var u, h = t.touches && t.touches.length; h--;)
                                    if (u = t.touches[h], u.identifier == n.el._drag.id || n.el.node.contains(u.target)) {
                                        r = u.clientX, i = u.clientY, (t.originalEvent ? t.originalEvent : t).preventDefault();
                                        break
                                    }
                            } else t.preventDefault();
                            var f = n.el.node;
                            f.nextSibling, f.parentNode, f.style.display;
                            r += s, i += a, e("snap.drag.move." + n.el.id, n.move_scope || n.el, r - n.el._drag.x, i - n.el._drag.y, r, i, t)
                        }
                    }, g = function(n) {
                        t.unmousemove(m).unmouseup(g);
                        for (var r, i = d.length; i--;) r = d[i], r.el._drag = {}, e("snap.drag.end." + r.el.id, r.end_scope || r.start_scope || r.move_scope || r.el, n), e.off("snap.drag.*." + r.el.id);
                        d = []
                    }, v = l.length; v--;) ! function(e) {
                    t[e] = a[e] = function(n, r) {
                        if (t.is(n, "function")) this.events = this.events || [], this.events.push({
                            name: e,
                            f: n,
                            unbind: p(this.node || document, e, n, r || this)
                        });
                        else
                            for (var i = 0, a = this.events.length; a > i; i++)
                                if (this.events[i].name == e) try {
                                    this.events[i].f.call(this)
                                } catch (s) {}
                                return this
                    }, t["un" + e] = a["un" + e] = function(t) {
                        for (var n = this.events || [], r = n.length; r--;)
                            if (n[r].name == e && (n[r].f == t || !t)) return n[r].unbind(), n.splice(r, 1), !n.length && delete this.events, this;
                        return this
                    }
                }(l[v]);
                a.hover = function(t, e, n, r) {
                    return this.mouseover(t, n).mouseout(e, r || n)
                }, a.unhover = function(t, e) {
                    return this.unmouseover(t).unmouseout(e)
                };
                var y = [];
                a.drag = function(n, r, i, a, s, o) {
                    function l(l, u, h) {
                        (l.originalEvent || l).preventDefault(), c._drag.x = u, c._drag.y = h, c._drag.id = l.identifier, !d.length && t.mousemove(m).mouseup(g), d.push({
                            el: c,
                            move_scope: a,
                            start_scope: s,
                            end_scope: o
                        }), r && e.on("snap.drag.start." + c.id, r), n && e.on("snap.drag.move." + c.id, n), i && e.on("snap.drag.end." + c.id, i), e("snap.drag.start." + c.id, s || a || c, u, h, l)
                    }

                    function u(t, n, r) {
                        e("snap.draginit." + c.id, c, t, n, r)
                    }
                    var c = this;
                    if (!arguments.length) {
                        var h;
                        return c.drag(function(t, e) {
                            this.attr({
                                transform: h + (h ? "T" : "t") + [t, e]
                            })
                        }, function() {
                            h = this.transform().local
                        })
                    }
                    return e.on("snap.draginit." + c.id, l), c._drag = {}, y.push({
                        el: c,
                        start: l,
                        init: u
                    }), c.mousedown(u), c
                }, a.undrag = function() {
                    for (var n = y.length; n--;) y[n].el == this && (this.unmousedown(y[n].init), y.splice(n, 1), e.unbind("snap.drag.*." + this.id), e.unbind("snap.draginit." + this.id));
                    return !y.length && t.unmousemove(m).unmouseup(g), this
                }
            }), r.plugin(function(t, n, r, i) {
                var a = (n.prototype, r.prototype),
                    s = /^\s*url\((.+)\)/,
                    o = String,
                    l = t._.$;
                t.filter = {}, a.filter = function(e) {
                    var r = this;
                    "svg" != r.type && (r = r.paper);
                    var i = t.parse(o(e)),
                        a = t._.id(),
                        s = (r.node.offsetWidth, r.node.offsetHeight, l("filter"));
                    return l(s, {
                        id: a,
                        filterUnits: "userSpaceOnUse"
                    }), s.appendChild(i.node), r.defs.appendChild(s), new n(s)
                }, e.on("snap.util.getattr.filter", function() {
                    e.stop();
                    var n = l(this.node, "filter");
                    if (n) {
                        var r = o(n).match(s);
                        return r && t.select(r[1])
                    }
                }), e.on("snap.util.attr.filter", function(r) {
                    if (r instanceof n && "filter" == r.type) {
                        e.stop();
                        var i = r.node.id;
                        i || (l(r.node, {
                            id: r.id
                        }), i = r.id), l(this.node, {
                            filter: t.url(i)
                        })
                    }
                    r && "none" != r || (e.stop(), this.node.removeAttribute("filter"))
                }), t.filter.blur = function(e, n) {
                    null == e && (e = 2);
                    var r = null == n ? e : [e, n];
                    return t.format('<feGaussianBlur stdDeviation="{def}"/>', {
                        def: r
                    })
                }, t.filter.blur.toString = function() {
                    return this()
                }, t.filter.shadow = function(e, n, r, i, a) {
                    return "string" == typeof r && (i = r, a = i, r = 4), "string" != typeof i && (a = i, i = "#000"), i = i || "#000", null == r && (r = 4), null == a && (a = 1), null == e && (e = 0, n = 2), null == n && (n = e), i = t.color(i), t.format('<feGaussianBlur in="SourceAlpha" stdDeviation="{blur}"/><feOffset dx="{dx}" dy="{dy}" result="offsetblur"/><feFlood flood-color="{color}"/><feComposite in2="offsetblur" operator="in"/><feComponentTransfer><feFuncA type="linear" slope="{opacity}"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>', {
                        color: i,
                        dx: e,
                        dy: n,
                        blur: r,
                        opacity: a
                    })
                }, t.filter.shadow.toString = function() {
                    return this()
                }, t.filter.grayscale = function(e) {
                    return null == e && (e = 1), t.format('<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {b} {h} 0 0 0 0 0 1 0"/>', {
                        a: .2126 + .7874 * (1 - e),
                        b: .7152 - .7152 * (1 - e),
                        c: .0722 - .0722 * (1 - e),
                        d: .2126 - .2126 * (1 - e),
                        e: .7152 + .2848 * (1 - e),
                        f: .0722 - .0722 * (1 - e),
                        g: .2126 - .2126 * (1 - e),
                        h: .0722 + .9278 * (1 - e)
                    })
                }, t.filter.grayscale.toString = function() {
                    return this()
                }, t.filter.sepia = function(e) {
                    return null == e && (e = 1), t.format('<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {h} {i} 0 0 0 0 0 1 0"/>', {
                        a: .393 + .607 * (1 - e),
                        b: .769 - .769 * (1 - e),
                        c: .189 - .189 * (1 - e),
                        d: .349 - .349 * (1 - e),
                        e: .686 + .314 * (1 - e),
                        f: .168 - .168 * (1 - e),
                        g: .272 - .272 * (1 - e),
                        h: .534 - .534 * (1 - e),
                        i: .131 + .869 * (1 - e)
                    })
                }, t.filter.sepia.toString = function() {
                    return this()
                }, t.filter.saturate = function(e) {
                    return null == e && (e = 1), t.format('<feColorMatrix type="saturate" values="{amount}"/>', {
                        amount: 1 - e
                    })
                }, t.filter.saturate.toString = function() {
                    return this()
                }, t.filter.hueRotate = function(e) {
                    return e = e || 0, t.format('<feColorMatrix type="hueRotate" values="{angle}"/>', {
                        angle: e
                    })
                }, t.filter.hueRotate.toString = function() {
                    return this()
                }, t.filter.invert = function(e) {
                    return null == e && (e = 1), t.format('<feComponentTransfer><feFuncR type="table" tableValues="{amount} {amount2}"/><feFuncG type="table" tableValues="{amount} {amount2}"/><feFuncB type="table" tableValues="{amount} {amount2}"/></feComponentTransfer>', {
                        amount: e,
                        amount2: 1 - e
                    })
                }, t.filter.invert.toString = function() {
                    return this()
                }, t.filter.brightness = function(e) {
                    return null == e && (e = 1), t.format('<feComponentTransfer><feFuncR type="linear" slope="{amount}"/><feFuncG type="linear" slope="{amount}"/><feFuncB type="linear" slope="{amount}"/></feComponentTransfer>', {
                        amount: e
                    })
                }, t.filter.brightness.toString = function() {
                    return this()
                }, t.filter.contrast = function(e) {
                    return null == e && (e = 1), t.format('<feComponentTransfer><feFuncR type="linear" slope="{amount}" intercept="{amount2}"/><feFuncG type="linear" slope="{amount}" intercept="{amount2}"/><feFuncB type="linear" slope="{amount}" intercept="{amount2}"/></feComponentTransfer>', {
                        amount: e,
                        amount2: .5 - e / 2
                    })
                }, t.filter.contrast.toString = function() {
                    return this()
                }
            }), r.plugin(function(t, e, n, r, i) {
                var a = t._.box,
                    s = t.is,
                    o = /^[^a-z]*([tbmlrc])/i,
                    l = function() {
                        return "T" + this.dx + "," + this.dy
                    };
                e.prototype.getAlign = function(t, e) {
                    null == e && s(t, "string") && (e = t, t = null), t = t || this.paper;
                    var n = t.getBBox ? t.getBBox() : a(t),
                        r = this.getBBox(),
                        i = {};
                    switch (e = e && e.match(o), e = e ? e[1].toLowerCase() : "c") {
                        case "t":
                            i.dx = 0, i.dy = n.y - r.y;
                            break;
                        case "b":
                            i.dx = 0, i.dy = n.y2 - r.y2;
                            break;
                        case "m":
                            i.dx = 0, i.dy = n.cy - r.cy;
                            break;
                        case "l":
                            i.dx = n.x - r.x, i.dy = 0;
                            break;
                        case "r":
                            i.dx = n.x2 - r.x2, i.dy = 0;
                            break;
                        default:
                            i.dx = n.cx - r.cx, i.dy = 0
                    }
                    return i.toString = l, i
                }, e.prototype.align = function(t, e) {
                    return this.transform("..." + this.getAlign(t, e))
                }
            }), r
        })
    }, {
        eve: 17
    }],
    17: [function(t, e, n) {
        ! function(t) {
            var n, r, i = "0.4.2",
                a = "hasOwnProperty",
                s = /[\.\/]/,
                o = /\s*,\s*/,
                l = "*",
                u = function(t, e) {
                    return t - e
                },
                c = {
                    n: {}
                },
                h = function() {
                    for (var t = 0, e = this.length; e > t; t++)
                        if ("undefined" != typeof this[t]) return this[t]
                },
                f = function() {
                    for (var t = this.length; --t;)
                        if ("undefined" != typeof this[t]) return this[t]
                },
                p = function(t, e) {
                    t = String(t);
                    var i, a = r,
                        s = Array.prototype.slice.call(arguments, 2),
                        o = p.listeners(t),
                        l = 0,
                        c = [],
                        d = {},
                        m = [],
                        g = n;
                    m.firstDefined = h, m.lastDefined = f, n = t, r = 0;
                    for (var v = 0, y = o.length; y > v; v++) "zIndex" in o[v] && (c.push(o[v].zIndex), o[v].zIndex < 0 && (d[o[v].zIndex] = o[v]));
                    for (c.sort(u); c[l] < 0;)
                        if (i = d[c[l++]], m.push(i.apply(e, s)), r) return r = a, m;
                    for (v = 0; y > v; v++)
                        if (i = o[v], "zIndex" in i)
                            if (i.zIndex == c[l]) {
                                if (m.push(i.apply(e, s)), r) break;
                                do
                                    if (l++, i = d[c[l]], i && m.push(i.apply(e, s)), r) break;
                                while (i)
                            } else d[i.zIndex] = i;
                    else if (m.push(i.apply(e, s)), r) break;
                    return r = a, n = g, m
                };
            p._events = c, p.listeners = function(t) {
                var e, n, r, i, a, o, u, h, f = t.split(s),
                    p = c,
                    d = [p],
                    m = [];
                for (i = 0, a = f.length; a > i; i++) {
                    for (h = [], o = 0, u = d.length; u > o; o++)
                        for (p = d[o].n, n = [p[f[i]], p[l]], r = 2; r--;) e = n[r], e && (h.push(e), m = m.concat(e.f || []));
                    d = h
                }
                return m
            }, p.on = function(t, e) {
                if (t = String(t), "function" != typeof e) return function() {};
                for (var n = t.split(o), r = 0, i = n.length; i > r; r++) ! function(t) {
                    for (var n, r = t.split(s), i = c, a = 0, o = r.length; o > a; a++) i = i.n, i = i.hasOwnProperty(r[a]) && i[r[a]] || (i[r[a]] = {
                        n: {}
                    });
                    for (i.f = i.f || [], a = 0, o = i.f.length; o > a; a++)
                        if (i.f[a] == e) {
                            n = !0;
                            break
                        }!n && i.f.push(e)
                }(n[r]);
                return function(t) {
                    +t == +t && (e.zIndex = +t)
                }
            }, p.f = function(t) {
                var e = [].slice.call(arguments, 1);
                return function() {
                    p.apply(null, [t, null].concat(e).concat([].slice.call(arguments, 0)))
                }
            }, p.stop = function() {
                r = 1
            }, p.nt = function(t) {
                return t ? new RegExp("(?:\\.|\\/|^)" + t + "(?:\\.|\\/|$)").test(n) : n
            }, p.nts = function() {
                return n.split(s)
            }, p.off = p.unbind = function(t, e) {
                if (!t) return void(p._events = c = {
                    n: {}
                });
                var n = t.split(o);
                if (n.length > 1)
                    for (var r = 0, i = n.length; i > r; r++) p.off(n[r], e);
                else {
                    n = t.split(s);
                    var u, h, f, r, i, d, m, g = [c];
                    for (r = 0, i = n.length; i > r; r++)
                        for (d = 0; d < g.length; d += f.length - 2) {
                            if (f = [d, 1], u = g[d].n, n[r] != l) u[n[r]] && f.push(u[n[r]]);
                            else
                                for (h in u) u[a](h) && f.push(u[h]);
                            g.splice.apply(g, f)
                        }
                    for (r = 0, i = g.length; i > r; r++)
                        for (u = g[r]; u.n;) {
                            if (e) {
                                if (u.f) {
                                    for (d = 0, m = u.f.length; m > d; d++)
                                        if (u.f[d] == e) {
                                            u.f.splice(d, 1);
                                            break
                                        }!u.f.length && delete u.f
                                }
                                for (h in u.n)
                                    if (u.n[a](h) && u.n[h].f) {
                                        var v = u.n[h].f;
                                        for (d = 0, m = v.length; m > d; d++)
                                            if (v[d] == e) {
                                                v.splice(d, 1);
                                                break
                                            }!v.length && delete u.n[h].f
                                    }
                            } else {
                                delete u.f;
                                for (h in u.n) u.n[a](h) && u.n[h].f && delete u.n[h].f
                            }
                            u = u.n
                        }
                }
            }, p.once = function(t, e) {
                var n = function() {
                    return p.unbind(t, n), e.apply(this, arguments)
                };
                return p.on(t, n)
            }, p.version = i, p.toString = function() {
                return "You are running Eve " + i
            }, "undefined" != typeof e && e.exports ? e.exports = p : "function" == typeof define && define.amd ? define("eve", [], function() {
                return p
            }) : t.eve = p
        }(this)
    }, {}],
    18: [function(t, e, n) {
        var r = (t("jquery"), t("underscore"), t("Backbone")),
            i = t("../models/ProjectModel");
        e.exports = r.Collection.extend({
            model: i
        })
    }, {
        "../models/ProjectModel": 21,
        Backbone: 2,
        jquery: "jquery",
        underscore: "backbone/node_modules/underscore"
    }],
    19: [function(t, e, n) {
        var r = (t("jquery"), t("underscore"), t("Backbone"));
        e.exports = r.Model.extend({
            initialize: function() {},
            defaults: {},
            validate: function(t) {
                !t.name
            }
        })
    }, {
        Backbone: 2,
        jquery: "jquery",
        underscore: "backbone/node_modules/underscore"
    }],
    20: [function(t, e, n) {
        var r = (t("jquery"), t("underscore"), t("Backbone"));
        e.exports = r.Model.extend({
            initialize: function() {},
            defaults: {},
            validate: function(t) {
                return t.name ? void 0 : "The project name was not defined!"
            }
        })
    }, {
        Backbone: 2,
        jquery: "jquery",
        underscore: "backbone/node_modules/underscore"
    }],
    21: [function(t, e, n) {
        var r = (t("jquery"), t("underscore"), t("Backbone"));
        e.exports = r.Model.extend({
            initialize: function() {},
            defaults: {},
            validate: function(t) {
                return t.name ? void 0 : "The project name was not defined!"
            }
        })
    }, {
        Backbone: 2,
        jquery: "jquery",
        underscore: "backbone/node_modules/underscore"
    }],
    22: [function(t, e, n) {
        var r = t("jquery"),
            i = t("TweenMax");
        t("css_plugin");
        e.exports = {
            init: function(t, e, n) {
                var i = this;
                r(window).on("mousemove", {
                    canvas: r(t),
                    elements: r(e),
                    fixer: n
                }, i.animate)
            },
            destroy: function(t) {
                var e = this;
                r(window).off("mousemove", e.animate), r(t).each(function() {
                    var t = r(this);
                    i.to(t, .5, {
                        x: 0,
                        y: 0
                    }), i.to(t, 1, {
                        css: {
                            z: 1,
                            rotationY: 0
                        }
                    })
                })
            },
            animate: function(t) {
                var e = t.pageX - .5 * t.data.canvas.width(),
                    n = t.pageY - .5 * t.data.canvas.height() <= r(window).innerHeight() ? t.pageY - .5 * t.data.canvas.height() : r(window).innerHeight();
                t.data.elements.each(function() {
                    var a = r(this),
                        s = a.data("parallax-values").split(","),
                        o = parseFloat(s[0]),
                        l = parseFloat(s[1]),
                        u = parseFloat(s[2]);
                    o && l ? i.to(a, .5, {
                        x: (a.position().left + e * o) * t.data.fixer,
                        y: (a.position().top + n * l) * t.data.fixer
                    }) : console.log("Can't initiate 2D parallax movement, because the X and Y axis attribute is not provided."), u && i.to(a, 1, {
                        css: {
                            z: (a.position().left + n * u) * t.data.fixer
                        }
                    })
                })
            }
        }
    }, {
        TweenMax: 4,
        css_plugin: 5,
        jquery: "jquery"
    }],
    23: [function(t, e, n) {
        var r = t("jquery"),
            i = t("underscore"),
            a = t("snapsvg");
        e.exports = {
            init: function(t) {
                var e = this;
                return t.selector && t.points ? void(i.isArray(t.selector) ? i.each(t.selector, function(n, r) {
                    e.setCanvas(n, t.points[r], t.stroke_color, t.stroke_width)
                }) : e.setCanvas(t.selector, t.points, t.stroke_color, t.stroke_width)) : (console.log("Selector or path points argument was not provided."), !1)
            },
            setCanvas: function(t, e, n, i) {
                var s = new a(t),
                    o = s.path(e).attr({
                        stroke: n,
                        "stroke-width": i,
                        fill: "none"
                    }),
                    l = o.getTotalLength();
                o.attr({
                    "stroke-dasharray": l + " " + l,
                    "stroke-dashoffset": l
                }), r(t).attr({
                    "data-stroke-dasharray": l + " " + l,
                    "data-stroke-dashoffset": l
                })
            },
            easeIn: function(t, e) {
                r(t).find("path").animate({
                    "stroke-dashoffset": ""
                }, 500, e)
            },
            easeOut: function(t, e) {
                r(t).find("path").animate({
                    "stroke-dasharray": r(t).data("stroke-dasharray"),
                    "stroke-dashoffset": r(t).data("stroke-dashoffset")
                }, 400, e)
            }
        }
    }, {
        jquery: "jquery",
        snapsvg: 16,
        underscore: "backbone/node_modules/underscore"
    }],
    24: [function(t, e, n) {
        e.exports = {
            encode: function(t) {
                return t.replace(/\s+/g, "-").toLowerCase()
            },
            decode: function(t) {
                return t.replace(/-/g, " ").replace(/\w\S*/g, function(t) {
                    return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase()
                })
            }
        }
    }, {}],
    25: [function(t, e, n) {
        var r = t("jquery"),
            i = t("underscore"),
            a = (t("Backbone"), t("TweenMax")),
            s = (t("css_plugin"), t("../modules/drawSVG")),
            o = t("../modules/canvasParallax");
        e.exports = {
            tweens: {},
            tweenIn: function(t, e) {
                var n = this.tweens;
                n ? (r("body").removeClass("core--landing core--project core--profile core--error").addClass("core--" + t + " tweenInit"), i.each(n, function(t, e) {
                    r(t.selector).hasClass("tweenOnce") || a.set(t.selector, t.tweenFrom)
                }), s.init({
                    selector: "#frame__svg",
                    points: "M0,2.4h375.5v595.3H3.4V2.4z",
                    stroke_color: "#2C308C",
                    stroke_width: 15
                }), s.easeIn("#frame__svg", function() {
                    r("body").addClass("tweenIn"), s.init({
                        selector: ["#helpers__circle", "#helpers__line"],
                        points: ["M45,25c0,11-9,20-20,20S5,36,5,25S14,5,25,5S45,14,45,25z", "M5,5h120"],
                        stroke_color: "#E3E5EC",
                        stroke_width: 5
                    }), s.easeIn(".helpers__svg"), i.each(n, function(t, e) {
                        var n = a.to(t.selector, t.tweenDuration, t.tweenTo);
                        if ("hero" === e) var i = setInterval(function() {
                            1 === n.progress() && (clearInterval(i), r("body").removeClass("tweenInit"), r("body").hasClass("device--mobile") ? !1 : o.init(".canvas", ".parallax", -.004))
                        }, 1e3 / 60)
                    })
                })) : console.log("Can't initiate page tween. No tween objects found...")
            },
            tweenOut: function(t) {
                var e = this.tweens;
                e ? (o.destroy(".parallax"), r("body").addClass("tweenInit"), s.easeOut("#frame__svg", function() {
                    r("#frame__svg").empty(), s.easeOut(".helpers__svg", function() {
                        r(".helpers__svg").empty()
                    }), i.each(e, function(e, n) {
                        if (!r(e.selector).hasClass("tweenOnce")) var i = a.to(e.selector, e.tweenDuration, e.tweenFrom);
                        if ("hero" === n) var s = setInterval(function() {
                            1 === i.progress() && (clearInterval(s), r("body").removeClass("tweenInit tweenIn"), t.render())
                        }, 1e3 / 60)
                    })
                })) : console.log("Can't initiate page tween. No tween objects found...")
            }
        }
    }, {
        "../modules/canvasParallax": 22,
        "../modules/drawSVG": 23,
        Backbone: 2,
        TweenMax: 4,
        css_plugin: 5,
        jquery: "jquery",
        underscore: "backbone/node_modules/underscore"
    }],
    26: [function(t, e, n) {
        e.exports = {
            calc: function(t) {
                var e = new Date;
                return (e - t) / 1e3
            },
            log: function(t) {
                var e = new Date;
                console.log("It took " + (e - t) / 1e3 + "s to render this page.")
            }
        }
    }, {}],
    27: [function(t, e, n) {
        var r = t("jquery"),
            i = (t("underscore"), t("Backbone"));
        i.$ = t("jquery");
        var a = t("../modules/nameCodec"),
            s = t("../modules/renderProgress");
        e.exports = i.Router.extend({
            initialize: function(t) {
                this.options = t, i.history.bind("all", function(t, e) {
                    window.scrollTo(0, 0)
                }), i.history.start()
            },
            routes: {
                "": "index",
                "project/:name": "project",
                profile: "profile",
                "*notFound": "notFound"
            },
            index: function() {
                var e = new Date,
                    n = t("../views/IndexView"),
                    r = t("../views/IndexPaginationView"),
                    i = this.options.projects,
                    a = i.at(0);
                if (i) {
                    new r({
                        collection: i,
                        el: "#pagination",
                        template: t("../templates/IndexPaginationTemplate")
                    })
                }
                if (a) {
                    new n({
                        projects: i,
                        model: a,
                        el: "#render"
                    })
                }
                s.log(e)
            },
            project: function(e) {
                r("#pagination").removeClass("tweenOnce");
                var n = new Date,
                    i = t("../views/ProjectView"),
                    o = t("../views/ProjectPaginationView"),
                    l = this.options.projects,
                    u = l.get(e),
                    c = l.get(u.get("next"));
                if (u) {
                    new o({
                        model: c,
                        el: "#pagination",
                        template: t("../templates/ProjectPaginationTemplate")
                    }), new i({
                        projects: l,
                        model: u,
                        el: "#render"
                    });
                    s.log(n)
                } else console.log("Project " + a.decode(e) + " could not be rendered, because it does not exist!")
            },
            profile: function() {
                var e = new Date,
                    n = t("../views/ProfileView"),
                    r = this.options.profile;
                if (r) {
                    new n({
                        model: r,
                        el: "#render"
                    })
                }
                s.log(e)
            },
            notFound: function(e) {
                var n = new Date,
                    r = t("../views/ErrorView"),
                    i = t("../models/ErrorModel"),
                    a = new i({
                        title: "404",
                        body: '<p>Hell to the no! Maybe you should try <a href="#/">this route</a> instead.</p>'
                    });
                if (a) {
                    new r({
                        model: a,
                        el: "#render"
                    })
                }
                s.log(n)
            }
        })
    }, {
        "../models/ErrorModel": 19,
        "../modules/nameCodec": 24,
        "../modules/renderProgress": 26,
        "../templates/IndexPaginationTemplate": 29,
        "../templates/ProjectPaginationTemplate": 32,
        "../views/ErrorView": 35,
        "../views/IndexPaginationView": 36,
        "../views/IndexView": 37,
        "../views/ProfileView": 38,
        "../views/ProjectPaginationView": 39,
        "../views/ProjectView": 40,
        Backbone: 2,
        jquery: "jquery",
        underscore: "backbone/node_modules/underscore"
    }],
    28: [function(t, e, n) {
        var r = t("hbsfy/runtime");
        e.exports = r.template({
            1: function(t, e, n, r) {
                var i, a;
                return '	<!-- Title -->\n	<div id="error__title" class="parallax parallax--title" data-parallax-values="15,20">\n		<h1>' + (null != (a = null != (a = e.title || (null != t ? t.title : t)) ? a : e.helperMissing, i = "function" == typeof a ? a.call(t, {
                    name: "title",
                    hash: {},
                    data: r
                }) : a) ? i : "") + "</h1>\n	</div>\n	<!-- end Title -->\n"
            },
            3: function(t, e, n, r) {
                var i, a;
                return '	<!-- Title -->\n	<div id="error__body" class="parallax parallax--body" data-parallax-values="10,15">\n		' + (null != (a = null != (a = e.body || (null != t ? t.body : t)) ? a : e.helperMissing, i = "function" == typeof a ? a.call(t, {
                    name: "body",
                    hash: {},
                    data: r
                }) : a) ? i : "") + "\n	</div>\n	<!-- end Title -->\n"
            },
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(t, e, n, r) {
                var i;
                return '<!-- 404 -->\n<div id="error" class="error--404">\n' + (null != (i = e["if"].call(t, null != t ? t.title : t, {
                    name: "if",
                    hash: {},
                    fn: this.program(1, r, 0),
                    inverse: this.noop,
                    data: r
                })) ? i : "") + (null != (i = e["if"].call(t, null != t ? t.body : t, {
                    name: "if",
                    hash: {},
                    fn: this.program(3, r, 0),
                    inverse: this.noop,
                    data: r
                })) ? i : "") + '</div>\n<!-- end 404 -->\n<!-- Background -->\n<div id="error__background"></div>\n<!-- end Background -->\n'
            },
            useData: !0
        })
    }, {
        "hbsfy/runtime": 14
    }],
    29: [function(t, e, n) {
        var r = t("hbsfy/runtime");
        e.exports = r.template({
            1: function(t, e, n, r) {
                var i;
                return '<ul class="list list--pagination">\n' + (null != (i = e.each.call(t, t, {
                    name: "each",
                    hash: {},
                    fn: this.program(2, r, 0),
                    inverse: this.noop,
                    data: r
                })) ? i : "") + "</ul>\n"
            },
            2: function(t, e, n, r) {
                var i, a, s = e.helperMissing,
                    o = "function";
                return '		<li class="list--pagination__element"><a role="button" data-url="' + (null != (a = null != (a = e.id || (null != t ? t.id : t)) ? a : s, i = typeof a === o ? a.call(t, {
                    name: "id",
                    hash: {},
                    data: r
                }) : a) ? i : "") + '"><span class="list--pagination__number">0' + (null != (a = null != (a = e.number || (null != t ? t.number : t)) ? a : s, i = typeof a === o ? a.call(t, {
                    name: "number",
                    hash: {},
                    data: r
                }) : a) ? i : "") + "</span>" + (null != (a = null != (a = e.name || (null != t ? t.name : t)) ? a : s, i = typeof a === o ? a.call(t, {
                    name: "name",
                    hash: {},
                    data: r
                }) : a) ? i : "") + "</a></li> \n"
            },
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(t, e, n, r) {
                var i;
                return null != (i = e["if"].call(t, t, {
                    name: "if",
                    hash: {},
                    fn: this.program(1, r, 0),
                    inverse: this.noop,
                    data: r
                })) ? i : ""
            },
            useData: !0
        })
    }, {
        "hbsfy/runtime": 14
    }],
    30: [function(t, e, n) {
        var r = t("hbsfy/runtime");
        e.exports = r.template({
            1: function(t, e, n, r) {
                var i, a, s = e.helperMissing,
                    o = "function",
                    l = this.escapeExpression;
                return "<!-- " + l((a = null != (a = e.name || (null != t ? t.name : t)) ? a : s, typeof a === o ? a.call(t, {
                    name: "name",
                    hash: {},
                    data: r
                }) : a)) + ' -->\n<div id="project" class="project--' + (null != (a = null != (a = e.id || (null != t ? t.id : t)) ? a : s, i = typeof a === o ? a.call(t, {
                    name: "id",
                    hash: {},
                    data: r
                }) : a) ? i : "") + '">\n\n	<!-- Title -->\n	<div id="project__title" class="parallax parallax--title" data-parallax-values="15,20">\n		<h1><a href="#/project/' + (null != (a = null != (a = e.id || (null != t ? t.id : t)) ? a : s, i = typeof a === o ? a.call(t, {
                    name: "id",
                    hash: {},
                    data: r
                }) : a) ? i : "") + '">' + l((a = null != (a = e.name || (null != t ? t.name : t)) ? a : s, typeof a === o ? a.call(t, {
                    name: "name",
                    hash: {},
                    data: r
                }) : a)) + '</a></h1>\n	</div>\n	<!-- end Title -->\n	<!-- Hero -->\n	<div id="project__hero" class="parallax parallax--hero" data-parallax-values="2,5">\n		<!-- Picture -->\n		<div id="project__picture" class="parallax parallax--picture" data-parallax-values="-10,-10" style="background-image: url(\'https://dilphn32tomd1.cloudfront.net/img/projects/' + (null != (a = null != (a = e.id || (null != t ? t.id : t)) ? a : s, i = typeof a === o ? a.call(t, {
                    name: "id",
                    hash: {},
                    data: r
                }) : a) ? i : "") + "/hero/hero-background.jpg');\"></div>\n		<!-- end Pictrue -->\n	</div>\n	<!-- end Hero -->\n" + (null != (i = e["if"].call(t, null != t ? t.date : t, {
                    name: "if",
                    hash: {},
                    fn: this.program(2, r, 0),
                    inverse: this.noop,
                    data: r
                })) ? i : "") + (null != (i = e["if"].call(t, null != t ? t.number : t, {
                    name: "if",
                    hash: {},
                    fn: this.program(5, r, 0),
                    inverse: this.noop,
                    data: r
                })) ? i : "") + "</div>\n<!-- end " + l((a = null != (a = e.name || (null != t ? t.name : t)) ? a : s, typeof a === o ? a.call(t, {
                    name: "name",
                    hash: {},
                    data: r
                }) : a)) + " -->\n"
            },
            2: function(t, e, n, r) {
                var i, a;
                return '	<!-- Meta -->\n	<div id="project__meta" class="parallax parallax--meta" data-parallax-values="3,-7">\n		<p class="project__date">' + (null != (a = null != (a = e.date || (null != t ? t.date : t)) ? a : e.helperMissing, i = "function" == typeof a ? a.call(t, {
                    name: "date",
                    hash: {},
                    data: r
                }) : a) ? i : "") + "</p>\n" + (null != (i = e["if"].call(t, null != t ? t.client : t, {
                    name: "if",
                    hash: {},
                    fn: this.program(3, r, 0),
                    inverse: this.noop,
                    data: r
                })) ? i : "") + "	</div>\n	<!-- end Meta -->\n"
            },
            3: function(t, e, n, r) {
                var i, a;
                return '		<p class="project__client">' + (null != (a = null != (a = e.client || (null != t ? t.client : t)) ? a : e.helperMissing, i = "function" == typeof a ? a.call(t, {
                    name: "client",
                    hash: {},
                    data: r
                }) : a) ? i : "") + "</p>\n"
            },
            5: function(t, e, n, r) {
                var i, a, s = e.helperMissing,
                    o = "function";
                return '	<!-- URL -->\n	<div id="project__url" class="parallax parallax--url" data-parallax-values="10,15">\n		<div id="project__indicator"></div>\n		<a href="#/project/' + (null != (a = null != (a = e.id || (null != t ? t.id : t)) ? a : s, i = typeof a === o ? a.call(t, {
                    name: "id",
                    hash: {},
                    data: r
                }) : a) ? i : "") + '">Load Project</a>\n	</div>\n	<!-- URL -->\n	<!-- Number -->\n	<div id="project__number" class="parallax parallax--number" data-parallax-values="-5,15">\n		<p>0' + (null != (a = null != (a = e.number || (null != t ? t.number : t)) ? a : s, i = typeof a === o ? a.call(t, {
                    name: "number",
                    hash: {},
                    data: r
                }) : a) ? i : "") + "</p>\n	</div>\n	<!-- end Number -->\n"
            },
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(t, e, n, r) {
                var i;
                return null != (i = e["if"].call(t, null != t ? t.name : t, {
                    name: "if",
                    hash: {},
                    fn: this.program(1, r, 0),
                    inverse: this.noop,
                    data: r
                })) ? i : ""
            },
            useData: !0
        })
    }, {
        "hbsfy/runtime": 14
    }],
    31: [function(t, e, n) {
        var r = t("hbsfy/runtime");
        e.exports = r.template({
            1: function(t, e, n, r) {
                var i;
                return '			<!-- Sidebar -->\n			<aside id="profile__sidebar">\n				<!-- Picture -->\n				<div id="profile__picture" style="background-image: url(\'https://dilphn32tomd1.cloudfront.net/img/profile/profile__pic.jpg\');"></div>\n				<!-- end Pictrue -->			\n' + (null != (i = e.each.call(t, null != t ? t.sidebar : t, {
                    name: "each",
                    hash: {},
                    fn: this.program(2, r, 0),
                    inverse: this.noop,
                    data: r
                })) ? i : "") + "			</aside>\n			<!-- end Sidebar -->\n"
            },
            2: function(t, e, n, r) {
                var i;
                return (null != (i = e["if"].call(t, null != t ? t.experience : t, {
                    name: "if",
                    hash: {},
                    fn: this.program(3, r, 0),
                    inverse: this.noop,
                    data: r
                })) ? i : "") + (null != (i = e["if"].call(t, null != t ? t.awards : t, {
                    name: "if",
                    hash: {},
                    fn: this.program(6, r, 0),
                    inverse: this.noop,
                    data: r
                })) ? i : "") + (null != (i = e["if"].call(t, null != t ? t.contact : t, {
                    name: "if",
                    hash: {},
                    fn: this.program(9, r, 0),
                    inverse: this.noop,
                    data: r
                })) ? i : "")
            },
            3: function(t, e, n, r) {
                var i;
                return '				<div id="profile__experience" class="profile__sidebar__node">\n					<h2>Experience</h2>\n' + (null != (i = e.each.call(t, null != t ? t.experience : t, {
                    name: "each",
                    hash: {},
                    fn: this.program(4, r, 0),
                    inverse: this.noop,
                    data: r
                })) ? i : "") + "				</div>\n"
            },
            4: function(t, e, n, r) {
                var i, a = this.lambda;
                return '					<ul class="list list--profile">\n						<li class="list__node list__node--profile"><span class="exp exp--company">' + (null != (i = a(null != t ? t.company : t, t)) ? i : "") + '</span><span class="exp exp--role">' + (null != (i = a(null != t ? t.role : t, t)) ? i : "") + "</span></li>\n					</ul>\n"
            },
            6: function(t, e, n, r) {
                var i;
                return '				<div id="profile__awards" class="profile__sidebar__node">\n					<h2>Awards</h2>\n' + (null != (i = e.each.call(t, null != t ? t.awards : t, {
                    name: "each",
                    hash: {},
                    fn: this.program(7, r, 0),
                    inverse: this.noop,
                    data: r
                })) ? i : "") + "				</div>\n"
            },
            7: function(t, e, n, r) {
                var i, a = this.lambda;
                return '					<ul class="list list--profile">\n						<li class="list__node list__node--profile"><span class="award award--number">' + (null != (i = a(null != t ? t.number : t, t)) ? i : "") + '</span><span class="award award--type">' + (null != (i = a(null != t ? t.type : t, t)) ? i : "") + "</span></li>\n					</ul>\n"
            },
            9: function(t, e, n, r) {
                var i;
                return '				<div id="profile__contact" class="profile__sidebar__node">\n					<h2>Contact</h2>\n' + (null != (i = e.each.call(t, null != t ? t.contact : t, {
                    name: "each",
                    hash: {},
                    fn: this.program(10, r, 0),
                    inverse: this.noop,
                    data: r
                })) ? i : "") + "				</div>\n"
            },
            10: function(t, e, n, r) {
                var i, a = this.lambda;
                return '					<ul class="list list--profile">\n						<li class="list__node list__node--profile"><a href="' + (null != (i = a(null != t ? t.url : t, t)) ? i : "") + '" target="_blank">' + (null != (i = a(null != t ? t.type : t, t)) ? i : "") + "</a></li>\n					</ul>\n"
            },
            12: function(t, e, n, r) {
                var i, a;
                return '			<!-- Body -->\n			<div id="profile__body">\n				' + (null != (a = null != (a = e.body || (null != t ? t.body : t)) ? a : e.helperMissing, i = "function" == typeof a ? a.call(t, {
                    name: "body",
                    hash: {},
                    data: r
                }) : a) ? i : "") + "\n			</div>\n			<!-- end Body -->\n"
            },
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(t, e, n, r) {
                var i;
                return '<!-- Profile -->\n<div id="profile">\n	<!-- Main -->\n	<main id="profile__main">\n		<!-- Container -->\n		<div class="container container--wide">\n' + (null != (i = e["if"].call(t, null != t ? t.sidebar : t, {
                    name: "if",
                    hash: {},
                    fn: this.program(1, r, 0),
                    inverse: this.noop,
                    data: r
                })) ? i : "") + (null != (i = e["if"].call(t, null != t ? t.body : t, {
                    name: "if",
                    hash: {},
                    fn: this.program(12, r, 0),
                    inverse: this.noop,
                    data: r
                })) ? i : "") + "		</div>\n		<!-- end Container -->\n	</main>\n	<!-- end Main -->\n</div>\n<!-- end Profile -->"
            },
            useData: !0
        })
    }, {
        "hbsfy/runtime": 14
    }],
    32: [function(t, e, n) {
        var r = t("hbsfy/runtime");
        e.exports = r.template({
            1: function(t, e, n, r) {
                var i, a, s = e.helperMissing,
                    o = "function";
                return '<!-- Hero -->\n<div id="pagination__hero">\n	<!-- Subtitle -->\n	<div id="pagination__subtitle">\n		<h5><a href="#/project/' + (null != (a = null != (a = e.id || (null != t ? t.id : t)) ? a : s, i = typeof a === o ? a.call(t, {
                    name: "id",
                    hash: {},
                    data: r
                }) : a) ? i : "") + '">Next Project</a></h5>\n	</div>\n	<!-- end Subtitle -->\n	<!-- Title -->\n	<div id="pagination__title">\n		<h1><a href="#/project/' + (null != (a = null != (a = e.id || (null != t ? t.id : t)) ? a : s, i = typeof a === o ? a.call(t, {
                    name: "id",
                    hash: {},
                    data: r
                }) : a) ? i : "") + '">' + (null != (a = null != (a = e.name || (null != t ? t.name : t)) ? a : s, i = typeof a === o ? a.call(t, {
                    name: "name",
                    hash: {},
                    data: r
                }) : a) ? i : "") + '</a></h1>\n	</div>\n	<!-- end Title -->\n	<!-- Picture -->\n	<div id="pagination__picture" style="background-image: url(\'https://dilphn32tomd1.cloudfront.net/img/projects/' + (null != (a = null != (a = e.id || (null != t ? t.id : t)) ? a : s, i = typeof a === o ? a.call(t, {
                    name: "id",
                    hash: {},
                    data: r
                }) : a) ? i : "") + "/hero/hero-background.jpg');\"></div>\n	<!-- end Pictrue -->\n</div>\n<!-- end Hero -->\n"
            },
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(t, e, n, r) {
                var i;
                return null != (i = e["if"].call(t, null != t ? t.id : t, {
                    name: "if",
                    hash: {},
                    fn: this.program(1, r, 0),
                    inverse: this.noop,
                    data: r
                })) ? i : ""
            },
            useData: !0
        })
    }, {
        "hbsfy/runtime": 14
    }],
    33: [function(t, e, n) {
        var r = t("hbsfy/runtime");
        e.exports = r.template({
            1: function(t, e, n, r, i, a) {
                var s, o, l = e.helperMissing,
                    u = "function",
                    c = this.escapeExpression;
                return "<!-- " + c((o = null != (o = e.name || (null != t ? t.name : t)) ? o : l, typeof o === u ? o.call(t, {
                    name: "name",
                    hash: {},
                    data: r
                }) : o)) + ' -->\n<div id="project" class="project--' + (null != (o = null != (o = e.id || (null != t ? t.id : t)) ? o : l, s = typeof o === u ? o.call(t, {
                    name: "id",
                    hash: {},
                    data: r
                }) : o) ? s : "") + '">\n	<!-- Title -->\n	<div id="project__title" class="parallax parallax--title" data-parallax-values="15,20">\n		<h1>' + (null != (o = null != (o = e.name || (null != t ? t.name : t)) ? o : l, s = typeof o === u ? o.call(t, {
                    name: "name",
                    hash: {},
                    data: r
                }) : o) ? s : "") + '</h1>\n	</div>\n	<!-- end Title -->\n	<!-- Hero -->\n	<div id="project__hero">\n		<!-- Picture -->\n		<div id="project__picture" class="parallax parallax--picture" data-parallax-values="-2,5,20" data-share="https://dilphn32tomd1.cloudfront.net/img/projects/' + (null != (o = null != (o = e.id || (null != t ? t.id : t)) ? o : l, s = typeof o === u ? o.call(t, {
                    name: "id",
                    hash: {},
                    data: r
                }) : o) ? s : "") + '/share/share__fb.jpg" style="background-image: url(\'https://dilphn32tomd1.cloudfront.net/img/projects/' + (null != (o = null != (o = e.id || (null != t ? t.id : t)) ? o : l, s = typeof o === u ? o.call(t, {
                    name: "id",
                    hash: {},
                    data: r
                }) : o) ? s : "") + '/hero/hero-background.jpg\');"></div>\n		<!-- end Pictrue -->\n	</div>\n	<!-- end Hero -->\n	<!-- Main -->\n	<main id="project__main">\n\n		<!-- Meta -->\n		<div id="project__meta" class="project__node">\n			<!-- Container -->\n			<div class="container container--base">\n' + (null != (s = e["if"].call(t, null != t ? t.roles : t, {
                    name: "if",
                    hash: {},
                    fn: this.program(2, r, 0, i, a),
                    inverse: this.noop,
                    data: r
                })) ? s : "") + (null != (s = e["if"].call(t, null != t ? t.date : t, {
                    name: "if",
                    hash: {},
                    fn: this.program(5, r, 0, i, a),
                    inverse: this.noop,
                    data: r
                })) ? s : "") + (null != (s = e["if"].call(t, null != t ? t.awards : t, {
                    name: "if",
                    hash: {},
                    fn: this.program(7, r, 0, i, a),
                    inverse: this.noop,
                    data: r
                })) ? s : "") + (null != (s = e["if"].call(t, null != t ? t.status : t, {
                    name: "if",
                    hash: {},
                    fn: this.program(9, r, 0, i, a),
                    inverse: this.noop,
                    data: r
                })) ? s : "") + "			</div>\n			<!-- end Container -->\n		</div>\n		<!-- end Meta -->\n" + (null != (s = e["if"].call(t, null != t ? t.nodes : t, {
                    name: "if",
                    hash: {},
                    fn: this.program(11, r, 0, i, a),
                    inverse: this.noop,
                    data: r
                })) ? s : "") + '		<!-- Social -->\n		<div id="project__social">\n			<!-- Intro -->\n			<div class="project__social__element">\n				<!-- Container -->\n				<div class="container container--small">\n					<h2>Thank you!</h2>\n					<p>For your time and effort spent on browsing through my project. If you liked it feel free to spread the word.</p>\n					<ul class="list list--social">\n						<li class="list--social__element"><a role="button" data-social="facebook">Facebook</a></li>\n						<li class="list--social__element"><a role="button" data-social="twitter">Twitter</a></li> \n						<li class="list--social__element"><a role="button" data-social="pinterest">Pinterest</a></li>\n					</ul>\n				</div>\n				<!-- end Container -->\n			</div>\n			<!-- end Intro -->\n		</div>				\n		<!-- end Social -->\n	</main>\n	<!-- end Main -->\n</div>\n<!-- end ' + c((o = null != (o = e.name || (null != t ? t.name : t)) ? o : l, typeof o === u ? o.call(t, {
                    name: "name",
                    hash: {},
                    data: r
                }) : o)) + " -->\n"
            },
            2: function(t, e, n, r) {
                var i;
                return '				<!-- Roles -->\n				<div id="project__roles" class="project__meta__element">\n					<h2>Role</h2>\n					<ul class="list list--meta">\n' + (null != (i = e.each.call(t, null != t ? t.roles : t, {
                    name: "each",
                    hash: {},
                    fn: this.program(3, r, 0),
                    inverse: this.noop,
                    data: r
                })) ? i : "") + "					</ul>\n				</div>\n				<!-- end Roles -->\n"
            },
            3: function(t, e, n, r) {
                var i;
                return '						<li class="list--meta__element">' + (null != (i = this.lambda(t, t)) ? i : "") + "</li>\n"
            },
            5: function(t, e, n, r) {
                var i, a;
                return '				<!-- Date -->\n				<div id="project__date" class="project__meta__element">\n					<h2>Date</h2>\n					<ul class="list list--meta">\n						<li class="list--meta__element">' + (null != (a = null != (a = e.date || (null != t ? t.date : t)) ? a : e.helperMissing, i = "function" == typeof a ? a.call(t, {
                    name: "date",
                    hash: {},
                    data: r
                }) : a) ? i : "") + "</li>\n					</ul>\n				</div>\n				<!-- end Date -->\n"
            },
            7: function(t, e, n, r) {
                var i;
                return '				<!-- Awards -->\n				<div id="project__awards" class="project__meta__element">\n					<h2>Awards</h2>\n					<ul class="list list--meta">\n' + (null != (i = e.each.call(t, null != t ? t.awards : t, {
                    name: "each",
                    hash: {},
                    fn: this.program(3, r, 0),
                    inverse: this.noop,
                    data: r
                })) ? i : "") + "					</ul>\n				</div>\n				<!-- end Awards -->\n"
            },
            9: function(t, e, n, r) {
                var i, a;
                return '				<!-- Status -->\n				<div id="project__status" class="project__meta__element">\n					<h2>Status</h2>\n					<ul class="list list--meta">\n						<li class="list--meta__element">' + (null != (a = null != (a = e.status || (null != t ? t.status : t)) ? a : e.helperMissing, i = "function" == typeof a ? a.call(t, {
                    name: "status",
                    hash: {},
                    data: r
                }) : a) ? i : "") + "</li>\n					</ul>\n				</div>\n				<!-- end Status -->\n"
            },
            11: function(t, e, n, r, i, a) {
                var s;
                return null != (s = e.each.call(t, null != t ? t.nodes : t, {
                    name: "each",
                    hash: {},
                    fn: this.program(12, r, 0, i, a),
                    inverse: this.noop,
                    data: r
                })) ? s : ""
            },
            12: function(t, e, n, r, i, a) {
                var s, o;
                return '		<!-- Node -->\n		<div id="project__' + (null != (o = null != (o = e.key || r && r.key) ? o : e.helperMissing, s = "function" == typeof o ? o.call(t, {
                    name: "key",
                    hash: {},
                    data: r
                }) : o) ? s : "") + '" class="project__node">\n' + (null != (s = e.each.call(t, t, {
                    name: "each",
                    hash: {},
                    fn: this.program(13, r, 0, i, a),
                    inverse: this.noop,
                    data: r
                })) ? s : "") + "		</div>\n		<!-- end Node -->\n"
            },
            13: function(t, e, n, r, i, a) {
                var s;
                return (null != (s = e["if"].call(t, null != t ? t.body : t, {
                    name: "if",
                    hash: {},
                    fn: this.program(14, r, 0, i, a),
                    inverse: this.noop,
                    data: r
                })) ? s : "") + (null != (s = e["if"].call(t, null != t ? t.mockups : t, {
                    name: "if",
                    hash: {},
                    fn: this.program(16, r, 0, i, a),
                    inverse: this.noop,
                    data: r
                })) ? s : "")
            },
            14: function(t, e, n, r) {
                var i, a;
                return '			<!-- Intro -->\n			<div class="project__intro project__element">\n				<!-- Container -->\n				<div class="container container--base">\n					' + (null != (a = null != (a = e.body || (null != t ? t.body : t)) ? a : e.helperMissing, i = "function" == typeof a ? a.call(t, {
                    name: "body",
                    hash: {},
                    data: r
                }) : a) ? i : "") + "\n				</div>\n				<!-- end Container -->\n			</div>\n			<!-- end Intro -->\n"
            },
            16: function(t, e, n, r, i, a) {
                var s;
                return null != (s = e.each.call(t, null != t ? t.mockups : t, {
                    name: "each",
                    hash: {},
                    fn: this.program(17, r, 0, i, a),
                    inverse: this.noop,
                    data: r
                })) ? s : ""
            },
            17: function(t, e, n, r, i, a) {
                var s, o;
                return '			<!-- Mockup -->\n			<div id="project__' + (null != (o = null != (o = e.key || r && r.key) ? o : e.helperMissing, s = "function" == typeof o ? o.call(t, {
                    name: "key",
                    hash: {},
                    data: r
                }) : o) ? s : "") + '" class="project__element project__element--nested">\n				<!-- Container -->\n				<div class="container container--wide">\n' + (null != (s = e.each.call(t, t, {
                    name: "each",
                    hash: {},
                    fn: this.program(18, r, 0, i, a),
                    inverse: this.noop,
                    data: r
                })) ? s : "") + "				</div>\n				<!-- end Container -->\n			</div>\n			<!-- end Mockup -->\n"
            },
            18: function(t, e, n, r, i, a) {
                var s, o = this.lambda;
                return '					<!-- Mockup -->\n					<div class="project__' + (null != (s = o(this.data(r, 1) && this.data(r, 1).key, t)) ? s : "") + "__" + (null != (s = o(t, t)) ? s : "") + ' project__element project__element--picture">\n						<picture>\n							<source \n							media="(min-width: 56.25em)" \n							srcset="https://dilphn32tomd1.cloudfront.net/img/projects/' + (null != (s = o(null != a[5] ? a[5].id : a[5], t)) ? s : "") + "/" + (null != (s = o(this.data(r, 3) && this.data(r, 3).key, t)) ? s : "") + "/" + (null != (s = o(this.data(r, 1) && this.data(r, 1).key, t)) ? s : "") + "/" + (null != (s = o(t, t)) ? s : "") + "/mockup-desktop.jpg,\n							    	https://dilphn32tomd1.cloudfront.net/img/projects/" + (null != (s = o(null != a[5] ? a[5].id : a[5], t)) ? s : "") + "/" + (null != (s = o(this.data(r, 3) && this.data(r, 3).key, t)) ? s : "") + "/" + (null != (s = o(this.data(r, 1) && this.data(r, 1).key, t)) ? s : "") + "/" + (null != (s = o(t, t)) ? s : "") + '/mockup-desktop@2x.jpg 2x">			    	\n							<source \n							media="(min-width: 32.25em)" \n							srcset="https://dilphn32tomd1.cloudfront.net/img/projects/' + (null != (s = o(null != a[5] ? a[5].id : a[5], t)) ? s : "") + "/" + (null != (s = o(this.data(r, 3) && this.data(r, 3).key, t)) ? s : "") + "/" + (null != (s = o(this.data(r, 1) && this.data(r, 1).key, t)) ? s : "") + "/" + (null != (s = o(t, t)) ? s : "") + "/mockup-tablet-landscape.jpg,\n							    	https://dilphn32tomd1.cloudfront.net/img/projects/" + (null != (s = o(null != a[5] ? a[5].id : a[5], t)) ? s : "") + "/" + (null != (s = o(this.data(r, 3) && this.data(r, 3).key, t)) ? s : "") + "/" + (null != (s = o(this.data(r, 1) && this.data(r, 1).key, t)) ? s : "") + "/" + (null != (s = o(t, t)) ? s : "") + '/mockup-tablet-landscape@2x.jpg 2x">	\n							<source \n							media="(min-width: 25em)" \n							srcset="https://dilphn32tomd1.cloudfront.net/img/projects/' + (null != (s = o(null != a[5] ? a[5].id : a[5], t)) ? s : "") + "/" + (null != (s = o(this.data(r, 3) && this.data(r, 3).key, t)) ? s : "") + "/" + (null != (s = o(this.data(r, 1) && this.data(r, 1).key, t)) ? s : "") + "/" + (null != (s = o(t, t)) ? s : "") + "/mockup-tablet-portrait.jpg, \n							    	https://dilphn32tomd1.cloudfront.net/img/projects/" + (null != (s = o(null != a[5] ? a[5].id : a[5], t)) ? s : "") + "/" + (null != (s = o(this.data(r, 3) && this.data(r, 3).key, t)) ? s : "") + "/" + (null != (s = o(this.data(r, 1) && this.data(r, 1).key, t)) ? s : "") + "/" + (null != (s = o(t, t)) ? s : "") + '/mockup-tablet-portrait@2x.jpg 2x">	    			    		            \n							<img \n							src="https://dilphn32tomd1.cloudfront.net/img/projects/' + (null != (s = o(null != a[5] ? a[5].id : a[5], t)) ? s : "") + "/" + (null != (s = o(this.data(r, 3) && this.data(r, 3).key, t)) ? s : "") + "/" + (null != (s = o(this.data(r, 1) && this.data(r, 1).key, t)) ? s : "") + "/" + (null != (s = o(t, t)) ? s : "") + '/mockup-mobile.jpg" \n							srcset="https://dilphn32tomd1.cloudfront.net/img/projects/' + (null != (s = o(null != a[5] ? a[5].id : a[5], t)) ? s : "") + "/" + (null != (s = o(this.data(r, 3) && this.data(r, 3).key, t)) ? s : "") + "/" + (null != (s = o(this.data(r, 1) && this.data(r, 1).key, t)) ? s : "") + "/" + (null != (s = o(t, t)) ? s : "") + '/mockup-mobile@2x.jpg 2x"\n							alt="Mockup Image">\n						</picture>	\n					</div>	\n					<!-- end Mockup -->		\n'
            },
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(t, e, n, r, i, a) {
                var s;
                return null != (s = e["if"].call(t, null != t ? t.name : t, {
                    name: "if",
                    hash: {},
                    fn: this.program(1, r, 0, i, a),
                    inverse: this.noop,
                    data: r
                })) ? s : ""
            },
            useData: !0,
            useDepths: !0
        })
    }, {
        "hbsfy/runtime": 14
    }],
    34: [function(t, e, n) {
        ! function(e) {
            "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof n ? t("jquery") : jQuery)
        }(function(t) {
            t.fn.jquerySharer = function(e) {
                var n = t.extend({
                        popUpWidth: 860,
                        popUpHeight: 700,
                        popUpTop: Math.round(t(window).height() / 2 - 350),
                        popUpLeft: Math.round(t(window).width() / 2 - 430),
                        title: encodeURIComponent("Admir Hadzic / Art Director & Developer"),
                        image: encodeURIComponent(""),
                        description: ""
                    }, e),
                    r = t(this).data("social"),
                    i = t("#project");
                switch (i.length > 0 ? (n.title = encodeURIComponent(t("#project__title h1").text()), n.image = t("#project__picture").data("share"), n.description = n.title + encodeURIComponent(" - Explore the art direction, concept and artistic approach that brought this project to life.")) : alert("Can't initiate sharing process because the project content doesn't exist."), r) {
                    case "facebook":
                        url = "https://www.facebook.com/dialog/feed?app_id=457141291153748&redirect_uri=" + encodeURIComponent("http://www.admirhadzic.com") + "&link=" + encodeURIComponent(window.location.href) + "&picture=" + n.image + "&description=" + n.description;
                        break;
                    case "twitter":
                        url = "http://twitter.com/share?url=" + encodeURIComponent(window.location.href) + "&text=" + n.description;
                        break;
                    case "pinterest":
                        url = "http://pinterest.com/pin/create/button/?url=" + encodeURIComponent(window.location.href) + "&media=" + n.image + "&description=" + n.description
                }
                window.open(url, "", "left=" + n.popUpLeft + " , top=" + n.popUpTop + ", width=" + n.popUpWidth + ", height=" + n.popUpHeight + ", personalbar=0, toolbar=0, scrollbars=1, resizable=1")
            }
        })
    }, {
        jquery: "jquery"
    }],
    35: [function(t, e, n) {
        var r = t("jquery"),
            i = (t("underscore"), t("Backbone"));
        i.$ = t("jquery");
        var a = t("../modules/pageTween");
        e.exports = i.View.extend({
            el: "#render",
            template: t("../templates/ErrorTemplate"),
            initialize: function(t) {
                this.options = t, this.render()
            },
            events: {},
            render: function() {
                var t = this;
                a.tweens = {
                    header: {
                        selector: "#header",
                        tweenDuration: .6,
                        tweenFrom: {
                            y: -80,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            y: 0,
                            autoAlpha: 1,
                            onComplete: function() {
                                r("#header").addClass("tweenOnce")
                            }
                        }
                    },
                    pagination: {
                        selector: "#pagination",
                        tweenDuration: .6,
                        tweenFrom: {
                            y: 50,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            y: 0,
                            autoAlpha: 1,
                            onComplete: function() {
                                r("#pagination").removeClass("tweenOnce")
                            }
                        }
                    },
                    title: {
                        selector: "#project__title",
                        tweenDuration: .4,
                        tweenFrom: {
                            x: -50,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            x: 0,
                            autoAlpha: 1
                        }
                    },
                    number: {
                        selector: "#project__number",
                        tweenDuration: .4,
                        tweenFrom: {
                            x: -80,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            x: 0,
                            autoAlpha: 1
                        }
                    },
                    indicator: {
                        selector: "#project__indicator",
                        tweenDuration: .4,
                        tweenFrom: {
                            height: 0,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            height: 50,
                            autoAlpha: 1
                        }
                    },
                    url: {
                        selector: "#project__url",
                        tweenDuration: .4,
                        tweenFrom: {
                            y: 25,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            y: 0,
                            autoAlpha: 1
                        }
                    },
                    hero: {
                        selector: "#project__hero",
                        tweenDuration: .4,
                        tweenFrom: {
                            x: 50,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            x: 0,
                            autoAlpha: 1
                        }
                    },
                    picture: {
                        selector: "#project__picture",
                        tweenDuration: .6,
                        tweenFrom: {
                            z: 300
                        },
                        tweenTo: {
                            z: 0
                        }
                    },
                    meta: {
                        selector: "#project__meta",
                        tweenDuration: .4,
                        tweenFrom: {
                            x: 50,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            x: 0,
                            autoAlpha: 1
                        }
                    },
                    profile_sidebar: {
                        selector: "#profile__sidebar",
                        tweenDuration: .4,
                        tweenFrom: {
                            x: -50,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            x: 0,
                            autoAlpha: 1
                        }
                    },
                    profile_body: {
                        selector: "#profile__body",
                        tweenDuration: .4,
                        tweenFrom: {
                            x: 50,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            x: 0,
                            autoAlpha: 1
                        }
                    },
                    error_title: {
                        selector: "#error__title",
                        tweenDuration: .4,
                        tweenFrom: {
                            y: -50,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            y: 0,
                            autoAlpha: 1
                        }
                    },
                    error_body: {
                        selector: "#error__body",
                        tweenDuration: .4,
                        tweenFrom: {
                            y: 50,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            y: 0,
                            autoAlpha: 1
                        }
                    }
                }, r("body").hasClass("tweenInit") || (r("body").hasClass("tweenIn") ? a.tweenOut(t) : t.$el.html(t.template(t.model.toJSON())).promise().done(function() {
                    var e = r("#overlay"),
                        n = Math.floor(5 * Math.random()) + 1;
                    e.css("background-image", "url(https://dilphn32tomd1.cloudfront.net/img/layout/overlay__bg-" + n + ".gif)"), a.tweenIn("error", t)
                }))
            }
        })
    }, {
        "../modules/pageTween": 25,
        "../templates/ErrorTemplate": 28,
        Backbone: 2,
        jquery: "jquery",
        underscore: "backbone/node_modules/underscore"
    }],
    36: [function(t, e, n) {
        var r = t("jquery"),
            i = (t("underscore"), t("Backbone"));
        i.$ = t("jquery"), e.exports = i.View.extend({
            el: "#pagination",
            initialize: function(t) {
                this.options = t, this.render()
            },
            events: {
                "click .list--pagination__element a": "fetchProject"
            },
            fetchProject: function(e) {
                var n = t("../views/IndexView"),
                    i = r(e.target),
                    a = i.data("url");
                i.parent().siblings("li").children().removeClass("active"), i.addClass("active");
                var s = this.collection.get(a);
                if (s) {
                    new n({
                        model: s,
                        el: "#render"
                    })
                }
            },
            render: function() {
                this.$el.html(this.options.template(this.collection.toJSON())).promise().done(function() {
                    r("#pagination ul li a").hasClass("active") || r("#pagination ul li:first-child a").addClass("active")
                })
            }
        })
    }, {
        "../views/IndexView": 37,
        Backbone: 2,
        jquery: "jquery",
        underscore: "backbone/node_modules/underscore"
    }],
    37: [function(t, e, n) {
        var r = t("jquery"),
            i = (t("underscore"), t("Backbone"));
        i.$ = t("jquery");
        var a = t("../modules/pageTween");
        e.exports = i.View.extend({
            el: "#render",
            template: t("../templates/IndexTemplate"),
            initialize: function(t) {
                this.options = t, this.render()
            },
            events: {},
            render: function() {
                var e = this;
                a.tweens = {
                    header: {
                        selector: "#header",
                        tweenDuration: .6,
                        tweenFrom: {
                            y: -80,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            y: 0,
                            autoAlpha: 1,
                            onComplete: function() {
                                r("#header").addClass("tweenOnce")
                            }
                        }
                    },
                    pagination: {
                        selector: "#pagination",
                        tweenDuration: .6,
                        tweenFrom: {
                            y: 50,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            y: 0,
                            autoAlpha: 1,
                            onComplete: function() {
                                r("#pagination").addClass("tweenOnce")
                            }
                        }
                    },
                    title: {
                        selector: "#project__title",
                        tweenDuration: .4,
                        tweenFrom: {
                            x: -50,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            x: 0,
                            autoAlpha: 1
                        }
                    },
                    number: {
                        selector: "#project__number",
                        tweenDuration: .4,
                        tweenFrom: {
                            x: -80,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            x: 0,
                            autoAlpha: 1
                        }
                    },
                    indicator: {
                        selector: "#project__indicator",
                        tweenDuration: .4,
                        tweenFrom: {
                            height: 0,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            height: 50,
                            autoAlpha: 1
                        }
                    },
                    url: {
                        selector: "#project__url",
                        tweenDuration: .4,
                        tweenFrom: {
                            y: 25,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            y: 0,
                            autoAlpha: 1
                        }
                    },
                    hero: {
                        selector: "#project__hero",
                        tweenDuration: .4,
                        tweenFrom: {
                            x: 50,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            x: 0,
                            autoAlpha: 1
                        }
                    },
                    picture: {
                        selector: "#project__picture",
                        tweenDuration: .6,
                        tweenFrom: {
                            z: 300
                        },
                        tweenTo: {
                            z: 0
                        }
                    },
                    meta: {
                        selector: "#project__meta",
                        tweenDuration: .4,
                        tweenFrom: {
                            x: 50,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            x: 0,
                            autoAlpha: 1
                        }
                    },
                    profile_sidebar: {
                        selector: "#profile__sidebar",
                        tweenDuration: .4,
                        tweenFrom: {
                            x: -50,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            x: 0,
                            autoAlpha: 1
                        }
                    },
                    profile_body: {
                        selector: "#profile__body",
                        tweenDuration: .4,
                        tweenFrom: {
                            x: 50,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            x: 0,
                            autoAlpha: 1
                        }
                    },
                    error_title: {
                        selector: "#error__title",
                        tweenDuration: .4,
                        tweenFrom: {
                            y: -50,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            y: 0,
                            autoAlpha: 1
                        }
                    },
                    error_body: {
                        selector: "#error__body",
                        tweenDuration: .4,
                        tweenFrom: {
                            y: 50,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            y: 0,
                            autoAlpha: 1
                        }
                    }
                }, r("body").hasClass("tweenInit") || (r("body").hasClass("tweenIn") ? a.tweenOut(e) : r("<img>").attr("src", function() {
                    return "img/projects/" + e.model.get("id") + "/hero/hero-background.jpg"
                }).load(function() {
                    e.$el.html(e.template(e.model.toJSON())).promise().done(function() {
                        a.tweenIn("landing", e);
                        var n = t("picturefill");
                        n()
                    })
                }))
            }
        })
    }, {
        "../modules/pageTween": 25,
        "../templates/IndexTemplate": 30,
        Backbone: 2,
        jquery: "jquery",
        picturefill: 15,
        underscore: "backbone/node_modules/underscore"
    }],
    38: [function(t, e, n) {
        var r = t("jquery"),
            i = (t("underscore"), t("Backbone"));
        i.$ = t("jquery");
        var a = t("../modules/pageTween");
        e.exports = i.View.extend({
            el: "#render",
            template: t("../templates/ProfileTemplate"),
            initialize: function(t) {
                this.options = t, this.render()
            },
            events: {},
            render: function() {
                var t = this;
                a.tweens = {
                    header: {
                        selector: "#header",
                        tweenDuration: .6,
                        tweenFrom: {
                            y: -80,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            y: 0,
                            autoAlpha: 1,
                            onComplete: function() {
                                r("#header").addClass("tweenOnce")
                            }
                        }
                    },
                    pagination: {
                        selector: "#pagination",
                        tweenDuration: .6,
                        tweenFrom: {
                            y: 50,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            y: 0,
                            autoAlpha: 1,
                            onComplete: function() {
                                r("#pagination").removeClass("tweenOnce")
                            }
                        }
                    },
                    title: {
                        selector: "#project__title",
                        tweenDuration: .4,
                        tweenFrom: {
                            x: -50,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            x: 0,
                            autoAlpha: 1
                        }
                    },
                    number: {
                        selector: "#project__number",
                        tweenDuration: .4,
                        tweenFrom: {
                            x: -80,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            x: 0,
                            autoAlpha: 1
                        }
                    },
                    indicator: {
                        selector: "#project__indicator",
                        tweenDuration: .4,
                        tweenFrom: {
                            height: 0,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            height: 50,
                            autoAlpha: 1
                        }
                    },
                    url: {
                        selector: "#project__url",
                        tweenDuration: .4,
                        tweenFrom: {
                            y: 25,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            y: 0,
                            autoAlpha: 1
                        }
                    },
                    hero: {
                        selector: "#project__hero",
                        tweenDuration: .4,
                        tweenFrom: {
                            x: 50,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            x: 0,
                            autoAlpha: 1
                        }
                    },
                    picture: {
                        selector: "#project__picture",
                        tweenDuration: .6,
                        tweenFrom: {
                            z: 300
                        },
                        tweenTo: {
                            z: 0
                        }
                    },
                    meta: {
                        selector: "#project__meta",
                        tweenDuration: .4,
                        tweenFrom: {
                            x: 50,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            x: 0,
                            autoAlpha: 1
                        }
                    },
                    profile_sidebar: {
                        selector: "#profile__sidebar",
                        tweenDuration: .4,
                        tweenFrom: {
                            x: -50,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            x: 0,
                            autoAlpha: 1
                        }
                    },
                    profile_body: {
                        selector: "#profile__body",
                        tweenDuration: .4,
                        tweenFrom: {
                            x: 50,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            x: 0,
                            autoAlpha: 1
                        }
                    },
                    error_title: {
                        selector: "#error__title",
                        tweenDuration: .4,
                        tweenFrom: {
                            y: -50,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            y: 0,
                            autoAlpha: 1
                        }
                    },
                    error_body: {
                        selector: "#error__body",
                        tweenDuration: .4,
                        tweenFrom: {
                            y: 50,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            y: 0,
                            autoAlpha: 1
                        }
                    }
                }, r("body").hasClass("tweenInit") || (r("body").hasClass("tweenIn") ? a.tweenOut(t) : t.$el.html(t.template(t.model.toJSON())).promise().done(function() {
                    a.tweenIn("profile", t)
                }))
            }
        })
    }, {
        "../modules/pageTween": 25,
        "../templates/ProfileTemplate": 31,
        Backbone: 2,
        jquery: "jquery",
        underscore: "backbone/node_modules/underscore"
    }],
    39: [function(t, e, n) {
        var r = (t("jquery"), t("underscore"), t("Backbone")),
            i = t("TweenMax");
        r.$ = t("jquery"), e.exports = r.View.extend({
            el: "#pagination",
            initialize: function(t) {
                this.options = t, this.render()
            },
            events: {},
            render: function() {
                function t() {
                    setTimeout(function() {
                        n = i.getAllTweens(), n.length > 0 ? requestAnimationFrame(t) : e.$el.html(e.options.template(e.model.toJSON())).promise().done(function() {})
                    }, 1e3 / r)
                }
                var e = this,
                    n = i.getAllTweens(),
                    r = 15;
                t()
            }
        })
    }, {
        Backbone: 2,
        TweenMax: 4,
        jquery: "jquery",
        underscore: "backbone/node_modules/underscore"
    }],
    40: [function(t, e, n) {
        var r = t("jquery"),
            i = (t("underscore"), t("Backbone"));
        i.$ = t("jquery");
        var a = t("../modules/pageTween");
        t("../vendor/jquerySharer");
        e.exports = i.View.extend({
            el: "#render",
            template: t("../templates/ProjectTemplate"),
            initialize: function(t) {
                this.options = t, this.render()
            },
            events: {
                "click .list--social__element a": "socialShare"
            },
            socialShare: function(t) {
                var e = r(t.target);
                e.jquerySharer()
            },
            render: function() {
                var e = this;
                a.tweens = {
                    header: {
                        selector: "#header",
                        tweenDuration: .6,
                        tweenFrom: {
                            y: -80,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            y: 0,
                            autoAlpha: 1,
                            onComplete: function() {
                                r("#header").addClass("tweenOnce")
                            }
                        }
                    },
                    pagination: {
                        selector: "#pagination",
                        tweenDuration: .6,
                        tweenFrom: {
                            y: 50,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            y: 0,
                            autoAlpha: 1,
                            onComplete: function() {
                                r("#pagination").removeClass("tweenOnce")
                            }
                        }
                    },
                    title: {
                        selector: "#project__title",
                        tweenDuration: .4,
                        tweenFrom: {
                            x: -50,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            x: 0,
                            autoAlpha: 1
                        }
                    },
                    number: {
                        selector: "#project__number",
                        tweenDuration: .4,
                        tweenFrom: {
                            x: -80,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            x: 0,
                            autoAlpha: 1
                        }
                    },
                    indicator: {
                        selector: "#project__indicator",
                        tweenDuration: .4,
                        tweenFrom: {
                            height: 0,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            height: 50,
                            autoAlpha: 1
                        }
                    },
                    url: {
                        selector: "#project__url",
                        tweenDuration: .4,
                        tweenFrom: {
                            y: 25,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            y: 0,
                            autoAlpha: 1
                        }
                    },
                    hero: {
                        selector: "#project__hero",
                        tweenDuration: .6,
                        tweenFrom: {
                            x: 50,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            x: 0,
                            autoAlpha: 1
                        }
                    },
                    meta: {
                        selector: "#project__meta",
                        tweenDuration: .4,
                        tweenFrom: {
                            x: 50,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            x: 0,
                            autoAlpha: 1
                        }
                    },
                    picture: {
                        selector: "#project__picture",
                        tweenDuration: .6,
                        tweenFrom: {
                            z: 200
                        },
                        tweenTo: {
                            z: 0
                        }
                    },
                    profile_sidebar: {
                        selector: "#profile__sidebar",
                        tweenDuration: .4,
                        tweenFrom: {
                            x: -50,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            x: 0,
                            autoAlpha: 1
                        }
                    },
                    profile_body: {
                        selector: "#profile__body",
                        tweenDuration: .4,
                        tweenFrom: {
                            x: 50,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            x: 0,
                            autoAlpha: 1
                        }
                    },
                    error_title: {
                        selector: "#error__title",
                        tweenDuration: .4,
                        tweenFrom: {
                            y: -50,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            y: 0,
                            autoAlpha: 1
                        }
                    },
                    error_body: {
                        selector: "#error__body",
                        tweenDuration: .4,
                        tweenFrom: {
                            y: 50,
                            autoAlpha: 0
                        },
                        tweenTo: {
                            y: 0,
                            autoAlpha: 1
                        }
                    }
                }, r("body").hasClass("tweenInit") || (r("body").hasClass("tweenIn") ? a.tweenOut(e) : r("<img>").attr("src", function() {
                    return "img/projects/" + e.model.get("id") + "/hero/hero-background.jpg"
                }).load(function() {
                    e.$el.html(e.template(e.model.toJSON())).promise().done(function() {
                        a.tweenIn("project", e);
                        var n = t("picturefill");
                        n()
                    })
                }))
            }
        })
    }, {
        "../modules/pageTween": 25,
        "../templates/ProjectTemplate": 33,
        "../vendor/jquerySharer": 34,
        Backbone: 2,
        jquery: "jquery",
        picturefill: 15,
        underscore: "backbone/node_modules/underscore"
    }],
    "backbone/node_modules/underscore": [function(t, e, n) {
        arguments[4][3][0].apply(n, arguments)
    }, {
        dup: 3
    }],
    jquery: [function(t, e, n) {
        ! function(t, n) {
            "object" == typeof e && "object" == typeof e.exports ? e.exports = t.document ? n(t, !0) : function(t) {
                if (!t.document) throw new Error("jQuery requires a window with a document");
                return n(t)
            } : n(t)
        }("undefined" != typeof window ? window : this, function(t, e) {
            function n(t) {
                var e = "length" in t && t.length,
                    n = K.type(t);
                return "function" === n || K.isWindow(t) ? !1 : 1 === t.nodeType && e ? !0 : "array" === n || 0 === e || "number" == typeof e && e > 0 && e - 1 in t
            }

            function r(t, e, n) {
                if (K.isFunction(e)) return K.grep(t, function(t, r) {
                    return !!e.call(t, r, t) !== n
                });
                if (e.nodeType) return K.grep(t, function(t) {
                    return t === e !== n
                });
                if ("string" == typeof e) {
                    if (ot.test(e)) return K.filter(e, t, n);
                    e = K.filter(e, t)
                }
                return K.grep(t, function(t) {
                    return U.call(e, t) >= 0 !== n
                })
            }

            function i(t, e) {
                for (;
                    (t = t[e]) && 1 !== t.nodeType;);
                return t
            }

            function a(t) {
                var e = dt[t] = {};
                return K.each(t.match(pt) || [], function(t, n) {
                    e[n] = !0
                }), e
            }

            function s() {
                Q.removeEventListener("DOMContentLoaded", s, !1), t.removeEventListener("load", s, !1), K.ready()
            }

            function o() {
                Object.defineProperty(this.cache = {}, 0, {
                    get: function() {
                        return {}
                    }
                }), this.expando = K.expando + o.uid++
            }

            function l(t, e, n) {
                var r;
                if (void 0 === n && 1 === t.nodeType)
                    if (r = "data-" + e.replace(xt, "-$1").toLowerCase(), n = t.getAttribute(r), "string" == typeof n) {
                        try {
                            n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : _t.test(n) ? K.parseJSON(n) : n
                        } catch (i) {}
                        yt.set(t, e, n)
                    } else n = void 0;
                return n
            }

            function u() {
                return !0
            }

            function c() {
                return !1
            }

            function h() {
                try {
                    return Q.activeElement
                } catch (t) {}
            }

            function f(t, e) {
                return K.nodeName(t, "table") && K.nodeName(11 !== e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t
            }

            function p(t) {
                return t.type = (null !== t.getAttribute("type")) + "/" + t.type, t
            }

            function d(t) {
                var e = Ft.exec(t.type);
                return e ? t.type = e[1] : t.removeAttribute("type"), t
            }

            function m(t, e) {
                for (var n = 0, r = t.length; r > n; n++) vt.set(t[n], "globalEval", !e || vt.get(e[n], "globalEval"))
            }

            function g(t, e) {
                var n, r, i, a, s, o, l, u;
                if (1 === e.nodeType) {
                    if (vt.hasData(t) && (a = vt.access(t), s = vt.set(e, a), u = a.events)) {
                        delete s.handle, s.events = {};
                        for (i in u)
                            for (n = 0, r = u[i].length; r > n; n++) K.event.add(e, i, u[i][n])
                    }
                    yt.hasData(t) && (o = yt.access(t), l = K.extend({}, o), yt.set(e, l))
                }
            }

            function v(t, e) {
                var n = t.getElementsByTagName ? t.getElementsByTagName(e || "*") : t.querySelectorAll ? t.querySelectorAll(e || "*") : [];
                return void 0 === e || e && K.nodeName(t, e) ? K.merge([t], n) : n
            }

            function y(t, e) {
                var n = e.nodeName.toLowerCase();
                "input" === n && kt.test(t.type) ? e.checked = t.checked : ("input" === n || "textarea" === n) && (e.defaultValue = t.defaultValue)
            }

            function _(e, n) {
                var r, i = K(n.createElement(e)).appendTo(n.body),
                    a = t.getDefaultComputedStyle && (r = t.getDefaultComputedStyle(i[0])) ? r.display : K.css(i[0], "display");
                return i.detach(), a
            }

            function x(t) {
                var e = Q,
                    n = Bt[t];
                return n || (n = _(t, e), "none" !== n && n || (zt = (zt || K("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement), e = zt[0].contentDocument, e.write(), e.close(), n = _(t, e), zt.detach()), Bt[t] = n), n
            }

            function b(t, e, n) {
                var r, i, a, s, o = t.style;
                return n = n || Ht(t), n && (s = n.getPropertyValue(e) || n[e]), n && ("" !== s || K.contains(t.ownerDocument, t) || (s = K.style(t, e)), Xt.test(s) && qt.test(e) && (r = o.width, i = o.minWidth, a = o.maxWidth, o.minWidth = o.maxWidth = o.width = s, s = n.width, o.width = r, o.minWidth = i, o.maxWidth = a)), void 0 !== s ? s + "" : s
            }

            function w(t, e) {
                return {
                    get: function() {
                        return t() ? void delete this.get : (this.get = e).apply(this, arguments)
                    }
                }
            }

            function T(t, e) {
                if (e in t) return e;
                for (var n = e[0].toUpperCase() + e.slice(1), r = e, i = Gt.length; i--;)
                    if (e = Gt[i] + n, e in t) return e;
                return r
            }

            function k(t, e, n) {
                var r = $t.exec(e);
                return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : e
            }

            function C(t, e, n, r, i) {
                for (var a = n === (r ? "border" : "content") ? 4 : "width" === e ? 1 : 0, s = 0; 4 > a; a += 2) "margin" === n && (s += K.css(t, n + wt[a], !0, i)), r ? ("content" === n && (s -= K.css(t, "padding" + wt[a], !0, i)), "margin" !== n && (s -= K.css(t, "border" + wt[a] + "Width", !0, i))) : (s += K.css(t, "padding" + wt[a], !0, i), "padding" !== n && (s += K.css(t, "border" + wt[a] + "Width", !0, i)));
                return s
            }

            function S(t, e, n) {
                var r = !0,
                    i = "width" === e ? t.offsetWidth : t.offsetHeight,
                    a = Ht(t),
                    s = "border-box" === K.css(t, "boxSizing", !1, a);
                if (0 >= i || null == i) {
                    if (i = b(t, e, a), (0 > i || null == i) && (i = t.style[e]), Xt.test(i)) return i;
                    r = s && (Z.boxSizingReliable() || i === t.style[e]), i = parseFloat(i) || 0
                }
                return i + C(t, e, n || (s ? "border" : "content"), r, a) + "px"
            }

            function P(t, e) {
                for (var n, r, i, a = [], s = 0, o = t.length; o > s; s++) r = t[s], r.style && (a[s] = vt.get(r, "olddisplay"), n = r.style.display, e ? (a[s] || "none" !== n || (r.style.display = ""), "" === r.style.display && Tt(r) && (a[s] = vt.access(r, "olddisplay", x(r.nodeName)))) : (i = Tt(r), "none" === n && i || vt.set(r, "olddisplay", i ? n : K.css(r, "display"))));
                for (s = 0; o > s; s++) r = t[s], r.style && (e && "none" !== r.style.display && "" !== r.style.display || (r.style.display = e ? a[s] || "" : "none"));
                return t
            }

            function A(t, e, n, r, i) {
                return new A.prototype.init(t, e, n, r, i)
            }

            function O() {
                return setTimeout(function() {
                    Zt = void 0
                }), Zt = K.now()
            }

            function j(t, e) {
                var n, r = 0,
                    i = {
                        height: t
                    };
                for (e = e ? 1 : 0; 4 > r; r += 2 - e) n = wt[r], i["margin" + n] = i["padding" + n] = t;
                return e && (i.opacity = i.width = t), i
            }

            function M(t, e, n) {
                for (var r, i = (ne[e] || []).concat(ne["*"]), a = 0, s = i.length; s > a; a++)
                    if (r = i[a].call(n, e, t)) return r
            }

            function N(t, e, n) {
                var r, i, a, s, o, l, u, c, h = this,
                    f = {},
                    p = t.style,
                    d = t.nodeType && Tt(t),
                    m = vt.get(t, "fxshow");
                n.queue || (o = K._queueHooks(t, "fx"), null == o.unqueued && (o.unqueued = 0, l = o.empty.fire, o.empty.fire = function() {
                    o.unqueued || l()
                }), o.unqueued++, h.always(function() {
                    h.always(function() {
                        o.unqueued--, K.queue(t, "fx").length || o.empty.fire()
                    })
                })), 1 === t.nodeType && ("height" in e || "width" in e) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], u = K.css(t, "display"), c = "none" === u ? vt.get(t, "olddisplay") || x(t.nodeName) : u, "inline" === c && "none" === K.css(t, "float") && (p.display = "inline-block")), n.overflow && (p.overflow = "hidden", h.always(function() {
                    p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
                }));
                for (r in e)
                    if (i = e[r], Jt.exec(i)) {
                        if (delete e[r], a = a || "toggle" === i, i === (d ? "hide" : "show")) {
                            if ("show" !== i || !m || void 0 === m[r]) continue;
                            d = !0
                        }
                        f[r] = m && m[r] || K.style(t, r)
                    } else u = void 0;
                if (K.isEmptyObject(f)) "inline" === ("none" === u ? x(t.nodeName) : u) && (p.display = u);
                else {
                    m ? "hidden" in m && (d = m.hidden) : m = vt.access(t, "fxshow", {}), a && (m.hidden = !d), d ? K(t).show() : h.done(function() {
                        K(t).hide()
                    }), h.done(function() {
                        var e;
                        vt.remove(t, "fxshow");
                        for (e in f) K.style(t, e, f[e])
                    });
                    for (r in f) s = M(d ? m[r] : 0, r, h), r in m || (m[r] = s.start, d && (s.end = s.start, s.start = "width" === r || "height" === r ? 1 : 0))
                }
            }

            function R(t, e) {
                var n, r, i, a, s;
                for (n in t)
                    if (r = K.camelCase(n), i = e[r], a = t[n], K.isArray(a) && (i = a[1], a = t[n] = a[0]), n !== r && (t[r] = a, delete t[n]), s = K.cssHooks[r], s && "expand" in s) {
                        a = s.expand(a), delete t[r];
                        for (n in a) n in t || (t[n] = a[n], e[n] = i)
                    } else e[r] = i
            }

            function D(t, e, n) {
                var r, i, a = 0,
                    s = ee.length,
                    o = K.Deferred().always(function() {
                        delete l.elem
                    }),
                    l = function() {
                        if (i) return !1;
                        for (var e = Zt || O(), n = Math.max(0, u.startTime + u.duration - e), r = n / u.duration || 0, a = 1 - r, s = 0, l = u.tweens.length; l > s; s++) u.tweens[s].run(a);
                        return o.notifyWith(t, [u, a, n]), 1 > a && l ? n : (o.resolveWith(t, [u]), !1)
                    },
                    u = o.promise({
                        elem: t,
                        props: K.extend({}, e),
                        opts: K.extend(!0, {
                            specialEasing: {}
                        }, n),
                        originalProperties: e,
                        originalOptions: n,
                        startTime: Zt || O(),
                        duration: n.duration,
                        tweens: [],
                        createTween: function(e, n) {
                            var r = K.Tween(t, u.opts, e, n, u.opts.specialEasing[e] || u.opts.easing);
                            return u.tweens.push(r), r
                        },
                        stop: function(e) {
                            var n = 0,
                                r = e ? u.tweens.length : 0;
                            if (i) return this;
                            for (i = !0; r > n; n++) u.tweens[n].run(1);
                            return e ? o.resolveWith(t, [u, e]) : o.rejectWith(t, [u, e]), this
                        }
                    }),
                    c = u.props;
                for (R(c, u.opts.specialEasing); s > a; a++)
                    if (r = ee[a].call(u, t, c, u.opts)) return r;
                return K.map(c, M, u), K.isFunction(u.opts.start) && u.opts.start.call(t, u), K.fx.timer(K.extend(l, {
                    elem: t,
                    anim: u,
                    queue: u.opts.queue
                })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
            }

            function E(t) {
                return function(e, n) {
                    "string" != typeof e && (n = e, e = "*");
                    var r, i = 0,
                        a = e.toLowerCase().match(pt) || [];
                    if (K.isFunction(n))
                        for (; r = a[i++];) "+" === r[0] ? (r = r.slice(1) || "*", (t[r] = t[r] || []).unshift(n)) : (t[r] = t[r] || []).push(n)
                }
            }

            function F(t, e, n, r) {
                function i(o) {
                    var l;
                    return a[o] = !0, K.each(t[o] || [], function(t, o) {
                        var u = o(e, n, r);
                        return "string" != typeof u || s || a[u] ? s ? !(l = u) : void 0 : (e.dataTypes.unshift(u), i(u), !1)
                    }), l
                }
                var a = {},
                    s = t === _e;
                return i(e.dataTypes[0]) || !a["*"] && i("*")
            }

            function I(t, e) {
                var n, r, i = K.ajaxSettings.flatOptions || {};
                for (n in e) void 0 !== e[n] && ((i[n] ? t : r || (r = {}))[n] = e[n]);
                return r && K.extend(!0, t, r), t
            }

            function L(t, e, n) {
                for (var r, i, a, s, o = t.contents, l = t.dataTypes;
                    "*" === l[0];) l.shift(), void 0 === r && (r = t.mimeType || e.getResponseHeader("Content-Type"));
                if (r)
                    for (i in o)
                        if (o[i] && o[i].test(r)) {
                            l.unshift(i);
                            break
                        }
                if (l[0] in n) a = l[0];
                else {
                    for (i in n) {
                        if (!l[0] || t.converters[i + " " + l[0]]) {
                            a = i;
                            break
                        }
                        s || (s = i)
                    }
                    a = a || s
                }
                return a ? (a !== l[0] && l.unshift(a), n[a]) : void 0
            }

            function z(t, e, n, r) {
                var i, a, s, o, l, u = {},
                    c = t.dataTypes.slice();
                if (c[1])
                    for (s in t.converters) u[s.toLowerCase()] = t.converters[s];
                for (a = c.shift(); a;)
                    if (t.responseFields[a] && (n[t.responseFields[a]] = e), !l && r && t.dataFilter && (e = t.dataFilter(e, t.dataType)), l = a, a = c.shift())
                        if ("*" === a) a = l;
                        else if ("*" !== l && l !== a) {
                    if (s = u[l + " " + a] || u["* " + a], !s)
                        for (i in u)
                            if (o = i.split(" "), o[1] === a && (s = u[l + " " + o[0]] || u["* " + o[0]])) {
                                s === !0 ? s = u[i] : u[i] !== !0 && (a = o[0], c.unshift(o[1]));
                                break
                            }
                    if (s !== !0)
                        if (s && t["throws"]) e = s(e);
                        else try {
                            e = s(e)
                        } catch (h) {
                            return {
                                state: "parsererror",
                                error: s ? h : "No conversion from " + l + " to " + a
                            }
                        }
                }
                return {
                    state: "success",
                    data: e
                }
            }

            function B(t, e, n, r) {
                var i;
                if (K.isArray(e)) K.each(e, function(e, i) {
                    n || ke.test(t) ? r(t, i) : B(t + "[" + ("object" == typeof i ? e : "") + "]", i, n, r)
                });
                else if (n || "object" !== K.type(e)) r(t, e);
                else
                    for (i in e) B(t + "[" + i + "]", e[i], n, r)
            }

            function q(t) {
                return K.isWindow(t) ? t : 9 === t.nodeType && t.defaultView
            }
            var X = [],
                H = X.slice,
                V = X.concat,
                $ = X.push,
                U = X.indexOf,
                Y = {},
                W = Y.toString,
                G = Y.hasOwnProperty,
                Z = {},
                Q = t.document,
                J = "2.1.4",
                K = function(t, e) {
                    return new K.fn.init(t, e)
                },
                tt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
                et = /^-ms-/,
                nt = /-([\da-z])/gi,
                rt = function(t, e) {
                    return e.toUpperCase()
                };
            K.fn = K.prototype = {
                jquery: J,
                constructor: K,
                selector: "",
                length: 0,
                toArray: function() {
                    return H.call(this)
                },
                get: function(t) {
                    return null != t ? 0 > t ? this[t + this.length] : this[t] : H.call(this)
                },
                pushStack: function(t) {
                    var e = K.merge(this.constructor(), t);
                    return e.prevObject = this, e.context = this.context, e
                },
                each: function(t, e) {
                    return K.each(this, t, e)
                },
                map: function(t) {
                    return this.pushStack(K.map(this, function(e, n) {
                        return t.call(e, n, e)
                    }))
                },
                slice: function() {
                    return this.pushStack(H.apply(this, arguments))
                },
                first: function() {
                    return this.eq(0)
                },
                last: function() {
                    return this.eq(-1)
                },
                eq: function(t) {
                    var e = this.length,
                        n = +t + (0 > t ? e : 0);
                    return this.pushStack(n >= 0 && e > n ? [this[n]] : [])
                },
                end: function() {
                    return this.prevObject || this.constructor(null)
                },
                push: $,
                sort: X.sort,
                splice: X.splice
            }, K.extend = K.fn.extend = function() {
                var t, e, n, r, i, a, s = arguments[0] || {},
                    o = 1,
                    l = arguments.length,
                    u = !1;
                for ("boolean" == typeof s && (u = s, s = arguments[o] || {}, o++), "object" == typeof s || K.isFunction(s) || (s = {}), o === l && (s = this, o--); l > o; o++)
                    if (null != (t = arguments[o]))
                        for (e in t) n = s[e], r = t[e], s !== r && (u && r && (K.isPlainObject(r) || (i = K.isArray(r))) ? (i ? (i = !1, a = n && K.isArray(n) ? n : []) : a = n && K.isPlainObject(n) ? n : {}, s[e] = K.extend(u, a, r)) : void 0 !== r && (s[e] = r));
                return s
            }, K.extend({
                expando: "jQuery" + (J + Math.random()).replace(/\D/g, ""),
                isReady: !0,
                error: function(t) {
                    throw new Error(t)
                },
                noop: function() {},
                isFunction: function(t) {
                    return "function" === K.type(t)
                },
                isArray: Array.isArray,
                isWindow: function(t) {
                    return null != t && t === t.window
                },
                isNumeric: function(t) {
                    return !K.isArray(t) && t - parseFloat(t) + 1 >= 0
                },
                isPlainObject: function(t) {
                    return "object" !== K.type(t) || t.nodeType || K.isWindow(t) ? !1 : t.constructor && !G.call(t.constructor.prototype, "isPrototypeOf") ? !1 : !0
                },
                isEmptyObject: function(t) {
                    var e;
                    for (e in t) return !1;
                    return !0
                },
                type: function(t) {
                    return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? Y[W.call(t)] || "object" : typeof t
                },
                globalEval: function(t) {
                    var e, n = eval;
                    t = K.trim(t), t && (1 === t.indexOf("use strict") ? (e = Q.createElement("script"), e.text = t, Q.head.appendChild(e).parentNode.removeChild(e)) : n(t))
                },
                camelCase: function(t) {
                    return t.replace(et, "ms-").replace(nt, rt)
                },
                nodeName: function(t, e) {
                    return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
                },
                each: function(t, e, r) {
                    var i, a = 0,
                        s = t.length,
                        o = n(t);
                    if (r) {
                        if (o)
                            for (; s > a && (i = e.apply(t[a], r), i !== !1); a++);
                        else
                            for (a in t)
                                if (i = e.apply(t[a], r), i === !1) break
                    } else if (o)
                        for (; s > a && (i = e.call(t[a], a, t[a]), i !== !1); a++);
                    else
                        for (a in t)
                            if (i = e.call(t[a], a, t[a]), i === !1) break; return t
                },
                trim: function(t) {
                    return null == t ? "" : (t + "").replace(tt, "")
                },
                makeArray: function(t, e) {
                    var r = e || [];
                    return null != t && (n(Object(t)) ? K.merge(r, "string" == typeof t ? [t] : t) : $.call(r, t)), r
                },
                inArray: function(t, e, n) {
                    return null == e ? -1 : U.call(e, t, n)
                },
                merge: function(t, e) {
                    for (var n = +e.length, r = 0, i = t.length; n > r; r++) t[i++] = e[r];
                    return t.length = i, t
                },
                grep: function(t, e, n) {
                    for (var r, i = [], a = 0, s = t.length, o = !n; s > a; a++) r = !e(t[a], a), r !== o && i.push(t[a]);
                    return i
                },
                map: function(t, e, r) {
                    var i, a = 0,
                        s = t.length,
                        o = n(t),
                        l = [];
                    if (o)
                        for (; s > a; a++) i = e(t[a], a, r), null != i && l.push(i);
                    else
                        for (a in t) i = e(t[a], a, r), null != i && l.push(i);
                    return V.apply([], l)
                },
                guid: 1,
                proxy: function(t, e) {
                    var n, r, i;
                    return "string" == typeof e && (n = t[e], e = t, t = n), K.isFunction(t) ? (r = H.call(arguments, 2), i = function() {
                        return t.apply(e || this, r.concat(H.call(arguments)))
                    }, i.guid = t.guid = t.guid || K.guid++, i) : void 0
                },
                now: Date.now,
                support: Z
            }), K.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
                Y["[object " + e + "]"] = e.toLowerCase()
            });
            var it = function(t) {
                function e(t, e, n, r) {
                    var i, a, s, o, l, u, h, p, d, m;
                    if ((e ? e.ownerDocument || e : B) !== N && M(e), e = e || N, n = n || [], o = e.nodeType, "string" != typeof t || !t || 1 !== o && 9 !== o && 11 !== o) return n;
                    if (!r && D) {
                        if (11 !== o && (i = yt.exec(t)))
                            if (s = i[1]) {
                                if (9 === o) {
                                    if (a = e.getElementById(s), !a || !a.parentNode) return n;
                                    if (a.id === s) return n.push(a), n
                                } else if (e.ownerDocument && (a = e.ownerDocument.getElementById(s)) && L(e, a) && a.id === s) return n.push(a), n
                            } else {
                                if (i[2]) return J.apply(n, e.getElementsByTagName(t)), n;
                                if ((s = i[3]) && b.getElementsByClassName) return J.apply(n, e.getElementsByClassName(s)), n
                            }
                        if (b.qsa && (!E || !E.test(t))) {
                            if (p = h = z, d = e, m = 1 !== o && t, 1 === o && "object" !== e.nodeName.toLowerCase()) {
                                for (u = C(t), (h = e.getAttribute("id")) ? p = h.replace(xt, "\\$&") : e.setAttribute("id", p), p = "[id='" + p + "'] ", l = u.length; l--;) u[l] = p + f(u[l]);
                                d = _t.test(t) && c(e.parentNode) || e, m = u.join(",")
                            }
                            if (m) try {
                                return J.apply(n, d.querySelectorAll(m)), n
                            } catch (g) {} finally {
                                h || e.removeAttribute("id")
                            }
                        }
                    }
                    return P(t.replace(lt, "$1"), e, n, r)
                }

                function n() {
                    function t(n, r) {
                        return e.push(n + " ") > w.cacheLength && delete t[e.shift()], t[n + " "] = r
                    }
                    var e = [];
                    return t
                }

                function r(t) {
                    return t[z] = !0, t
                }

                function i(t) {
                    var e = N.createElement("div");
                    try {
                        return !!t(e)
                    } catch (n) {
                        return !1
                    } finally {
                        e.parentNode && e.parentNode.removeChild(e), e = null
                    }
                }

                function a(t, e) {
                    for (var n = t.split("|"), r = t.length; r--;) w.attrHandle[n[r]] = e
                }

                function s(t, e) {
                    var n = e && t,
                        r = n && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || Y) - (~t.sourceIndex || Y);
                    if (r) return r;
                    if (n)
                        for (; n = n.nextSibling;)
                            if (n === e) return -1;
                    return t ? 1 : -1
                }

                function o(t) {
                    return function(e) {
                        var n = e.nodeName.toLowerCase();
                        return "input" === n && e.type === t
                    }
                }

                function l(t) {
                    return function(e) {
                        var n = e.nodeName.toLowerCase();
                        return ("input" === n || "button" === n) && e.type === t
                    }
                }

                function u(t) {
                    return r(function(e) {
                        return e = +e, r(function(n, r) {
                            for (var i, a = t([], n.length, e), s = a.length; s--;) n[i = a[s]] && (n[i] = !(r[i] = n[i]))
                        })
                    })
                }

                function c(t) {
                    return t && "undefined" != typeof t.getElementsByTagName && t
                }

                function h() {}

                function f(t) {
                    for (var e = 0, n = t.length, r = ""; n > e; e++) r += t[e].value;
                    return r
                }

                function p(t, e, n) {
                    var r = e.dir,
                        i = n && "parentNode" === r,
                        a = X++;
                    return e.first ? function(e, n, a) {
                        for (; e = e[r];)
                            if (1 === e.nodeType || i) return t(e, n, a)
                    } : function(e, n, s) {
                        var o, l, u = [q, a];
                        if (s) {
                            for (; e = e[r];)
                                if ((1 === e.nodeType || i) && t(e, n, s)) return !0
                        } else
                            for (; e = e[r];)
                                if (1 === e.nodeType || i) {
                                    if (l = e[z] || (e[z] = {}), (o = l[r]) && o[0] === q && o[1] === a) return u[2] = o[2];
                                    if (l[r] = u, u[2] = t(e, n, s)) return !0
                                }
                    }
                }

                function d(t) {
                    return t.length > 1 ? function(e, n, r) {
                        for (var i = t.length; i--;)
                            if (!t[i](e, n, r)) return !1;
                        return !0
                    } : t[0]
                }

                function m(t, n, r) {
                    for (var i = 0, a = n.length; a > i; i++) e(t, n[i], r);
                    return r
                }

                function g(t, e, n, r, i) {
                    for (var a, s = [], o = 0, l = t.length, u = null != e; l > o; o++)(a = t[o]) && (!n || n(a, r, i)) && (s.push(a), u && e.push(o));
                    return s
                }

                function v(t, e, n, i, a, s) {
                    return i && !i[z] && (i = v(i)), a && !a[z] && (a = v(a, s)), r(function(r, s, o, l) {
                        var u, c, h, f = [],
                            p = [],
                            d = s.length,
                            v = r || m(e || "*", o.nodeType ? [o] : o, []),
                            y = !t || !r && e ? v : g(v, f, t, o, l),
                            _ = n ? a || (r ? t : d || i) ? [] : s : y;
                        if (n && n(y, _, o, l), i)
                            for (u = g(_, p), i(u, [], o, l), c = u.length; c--;)(h = u[c]) && (_[p[c]] = !(y[p[c]] = h));
                        if (r) {
                            if (a || t) {
                                if (a) {
                                    for (u = [], c = _.length; c--;)(h = _[c]) && u.push(y[c] = h);
                                    a(null, _ = [], u, l)
                                }
                                for (c = _.length; c--;)(h = _[c]) && (u = a ? tt(r, h) : f[c]) > -1 && (r[u] = !(s[u] = h))
                            }
                        } else _ = g(_ === s ? _.splice(d, _.length) : _), a ? a(null, s, _, l) : J.apply(s, _)
                    })
                }

                function y(t) {
                    for (var e, n, r, i = t.length, a = w.relative[t[0].type], s = a || w.relative[" "], o = a ? 1 : 0, l = p(function(t) {
                            return t === e
                        }, s, !0), u = p(function(t) {
                            return tt(e, t) > -1
                        }, s, !0), c = [function(t, n, r) {
                            var i = !a && (r || n !== A) || ((e = n).nodeType ? l(t, n, r) : u(t, n, r));
                            return e = null, i
                        }]; i > o; o++)
                        if (n = w.relative[t[o].type]) c = [p(d(c), n)];
                        else {
                            if (n = w.filter[t[o].type].apply(null, t[o].matches), n[z]) {
                                for (r = ++o; i > r && !w.relative[t[r].type]; r++);
                                return v(o > 1 && d(c), o > 1 && f(t.slice(0, o - 1).concat({
                                    value: " " === t[o - 2].type ? "*" : ""
                                })).replace(lt, "$1"), n, r > o && y(t.slice(o, r)), i > r && y(t = t.slice(r)), i > r && f(t))
                            }
                            c.push(n)
                        }
                    return d(c)
                }

                function _(t, n) {
                    var i = n.length > 0,
                        a = t.length > 0,
                        s = function(r, s, o, l, u) {
                            var c, h, f, p = 0,
                                d = "0",
                                m = r && [],
                                v = [],
                                y = A,
                                _ = r || a && w.find.TAG("*", u),
                                x = q += null == y ? 1 : Math.random() || .1,
                                b = _.length;
                            for (u && (A = s !== N && s); d !== b && null != (c = _[d]); d++) {
                                if (a && c) {
                                    for (h = 0; f = t[h++];)
                                        if (f(c, s, o)) {
                                            l.push(c);
                                            break
                                        }
                                    u && (q = x)
                                }
                                i && ((c = !f && c) && p--, r && m.push(c))
                            }
                            if (p += d, i && d !== p) {
                                for (h = 0; f = n[h++];) f(m, v, s, o);
                                if (r) {
                                    if (p > 0)
                                        for (; d--;) m[d] || v[d] || (v[d] = Z.call(l));
                                    v = g(v)
                                }
                                J.apply(l, v), u && !r && v.length > 0 && p + n.length > 1 && e.uniqueSort(l)
                            }
                            return u && (q = x, A = y), m
                        };
                    return i ? r(s) : s
                }
                var x, b, w, T, k, C, S, P, A, O, j, M, N, R, D, E, F, I, L, z = "sizzle" + 1 * new Date,
                    B = t.document,
                    q = 0,
                    X = 0,
                    H = n(),
                    V = n(),
                    $ = n(),
                    U = function(t, e) {
                        return t === e && (j = !0), 0
                    },
                    Y = 1 << 31,
                    W = {}.hasOwnProperty,
                    G = [],
                    Z = G.pop,
                    Q = G.push,
                    J = G.push,
                    K = G.slice,
                    tt = function(t, e) {
                        for (var n = 0, r = t.length; r > n; n++)
                            if (t[n] === e) return n;
                        return -1
                    },
                    et = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                    nt = "[\\x20\\t\\r\\n\\f]",
                    rt = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                    it = rt.replace("w", "w#"),
                    at = "\\[" + nt + "*(" + rt + ")(?:" + nt + "*([*^$|!~]?=)" + nt + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + it + "))|)" + nt + "*\\]",
                    st = ":(" + rt + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + at + ")*)|.*)\\)|)",
                    ot = new RegExp(nt + "+", "g"),
                    lt = new RegExp("^" + nt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + nt + "+$", "g"),
                    ut = new RegExp("^" + nt + "*," + nt + "*"),
                    ct = new RegExp("^" + nt + "*([>+~]|" + nt + ")" + nt + "*"),
                    ht = new RegExp("=" + nt + "*([^\\]'\"]*?)" + nt + "*\\]", "g"),
                    ft = new RegExp(st),
                    pt = new RegExp("^" + it + "$"),
                    dt = {
                        ID: new RegExp("^#(" + rt + ")"),
                        CLASS: new RegExp("^\\.(" + rt + ")"),
                        TAG: new RegExp("^(" + rt.replace("w", "w*") + ")"),
                        ATTR: new RegExp("^" + at),
                        PSEUDO: new RegExp("^" + st),
                        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + nt + "*(even|odd|(([+-]|)(\\d*)n|)" + nt + "*(?:([+-]|)" + nt + "*(\\d+)|))" + nt + "*\\)|)", "i"),
                        bool: new RegExp("^(?:" + et + ")$", "i"),
                        needsContext: new RegExp("^" + nt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + nt + "*((?:-\\d)?\\d*)" + nt + "*\\)|)(?=[^-]|$)", "i")
                    },
                    mt = /^(?:input|select|textarea|button)$/i,
                    gt = /^h\d$/i,
                    vt = /^[^{]+\{\s*\[native \w/,
                    yt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                    _t = /[+~]/,
                    xt = /'|\\/g,
                    bt = new RegExp("\\\\([\\da-f]{1,6}" + nt + "?|(" + nt + ")|.)", "ig"),
                    wt = function(t, e, n) {
                        var r = "0x" + e - 65536;
                        return r !== r || n ? e : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
                    },
                    Tt = function() {
                        M()
                    };
                try {
                    J.apply(G = K.call(B.childNodes), B.childNodes), G[B.childNodes.length].nodeType
                } catch (kt) {
                    J = {
                        apply: G.length ? function(t, e) {
                            Q.apply(t, K.call(e))
                        } : function(t, e) {
                            for (var n = t.length, r = 0; t[n++] = e[r++];);
                            t.length = n - 1
                        }
                    }
                }
                b = e.support = {}, k = e.isXML = function(t) {
                    var e = t && (t.ownerDocument || t).documentElement;
                    return e ? "HTML" !== e.nodeName : !1
                }, M = e.setDocument = function(t) {
                    var e, n, r = t ? t.ownerDocument || t : B;
                    return r !== N && 9 === r.nodeType && r.documentElement ? (N = r, R = r.documentElement, n = r.defaultView, n && n !== n.top && (n.addEventListener ? n.addEventListener("unload", Tt, !1) : n.attachEvent && n.attachEvent("onunload", Tt)), D = !k(r), b.attributes = i(function(t) {
                        return t.className = "i", !t.getAttribute("className")
                    }), b.getElementsByTagName = i(function(t) {
                        return t.appendChild(r.createComment("")), !t.getElementsByTagName("*").length
                    }), b.getElementsByClassName = vt.test(r.getElementsByClassName), b.getById = i(function(t) {
                        return R.appendChild(t).id = z, !r.getElementsByName || !r.getElementsByName(z).length
                    }), b.getById ? (w.find.ID = function(t, e) {
                        if ("undefined" != typeof e.getElementById && D) {
                            var n = e.getElementById(t);
                            return n && n.parentNode ? [n] : []
                        }
                    }, w.filter.ID = function(t) {
                        var e = t.replace(bt, wt);
                        return function(t) {
                            return t.getAttribute("id") === e
                        }
                    }) : (delete w.find.ID, w.filter.ID = function(t) {
                        var e = t.replace(bt, wt);
                        return function(t) {
                            var n = "undefined" != typeof t.getAttributeNode && t.getAttributeNode("id");
                            return n && n.value === e
                        }
                    }), w.find.TAG = b.getElementsByTagName ? function(t, e) {
                        return "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t) : b.qsa ? e.querySelectorAll(t) : void 0
                    } : function(t, e) {
                        var n, r = [],
                            i = 0,
                            a = e.getElementsByTagName(t);
                        if ("*" === t) {
                            for (; n = a[i++];) 1 === n.nodeType && r.push(n);
                            return r
                        }
                        return a
                    }, w.find.CLASS = b.getElementsByClassName && function(t, e) {
                        return D ? e.getElementsByClassName(t) : void 0
                    }, F = [], E = [], (b.qsa = vt.test(r.querySelectorAll)) && (i(function(t) {
                        R.appendChild(t).innerHTML = "<a id='" + z + "'></a><select id='" + z + "-\f]' msallowcapture=''><option selected=''></option></select>", t.querySelectorAll("[msallowcapture^='']").length && E.push("[*^$]=" + nt + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || E.push("\\[" + nt + "*(?:value|" + et + ")"), t.querySelectorAll("[id~=" + z + "-]").length || E.push("~="), t.querySelectorAll(":checked").length || E.push(":checked"), t.querySelectorAll("a#" + z + "+*").length || E.push(".#.+[+~]")
                    }), i(function(t) {
                        var e = r.createElement("input");
                        e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && E.push("name" + nt + "*[*^$|!~]?="), t.querySelectorAll(":enabled").length || E.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), E.push(",.*:")
                    })), (b.matchesSelector = vt.test(I = R.matches || R.webkitMatchesSelector || R.mozMatchesSelector || R.oMatchesSelector || R.msMatchesSelector)) && i(function(t) {
                        b.disconnectedMatch = I.call(t, "div"), I.call(t, "[s!='']:x"), F.push("!=", st)
                    }), E = E.length && new RegExp(E.join("|")), F = F.length && new RegExp(F.join("|")), e = vt.test(R.compareDocumentPosition), L = e || vt.test(R.contains) ? function(t, e) {
                        var n = 9 === t.nodeType ? t.documentElement : t,
                            r = e && e.parentNode;
                        return t === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(r)))
                    } : function(t, e) {
                        if (e)
                            for (; e = e.parentNode;)
                                if (e === t) return !0;
                        return !1
                    }, U = e ? function(t, e) {
                        if (t === e) return j = !0, 0;
                        var n = !t.compareDocumentPosition - !e.compareDocumentPosition;
                        return n ? n : (n = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1, 1 & n || !b.sortDetached && e.compareDocumentPosition(t) === n ? t === r || t.ownerDocument === B && L(B, t) ? -1 : e === r || e.ownerDocument === B && L(B, e) ? 1 : O ? tt(O, t) - tt(O, e) : 0 : 4 & n ? -1 : 1)
                    } : function(t, e) {
                        if (t === e) return j = !0, 0;
                        var n, i = 0,
                            a = t.parentNode,
                            o = e.parentNode,
                            l = [t],
                            u = [e];
                        if (!a || !o) return t === r ? -1 : e === r ? 1 : a ? -1 : o ? 1 : O ? tt(O, t) - tt(O, e) : 0;
                        if (a === o) return s(t, e);
                        for (n = t; n = n.parentNode;) l.unshift(n);
                        for (n = e; n = n.parentNode;) u.unshift(n);
                        for (; l[i] === u[i];) i++;
                        return i ? s(l[i], u[i]) : l[i] === B ? -1 : u[i] === B ? 1 : 0
                    }, r) : N
                }, e.matches = function(t, n) {
                    return e(t, null, null, n)
                }, e.matchesSelector = function(t, n) {
                    if ((t.ownerDocument || t) !== N && M(t), n = n.replace(ht, "='$1']"), b.matchesSelector && D && (!F || !F.test(n)) && (!E || !E.test(n))) try {
                        var r = I.call(t, n);
                        if (r || b.disconnectedMatch || t.document && 11 !== t.document.nodeType) return r
                    } catch (i) {}
                    return e(n, N, null, [t]).length > 0
                }, e.contains = function(t, e) {
                    return (t.ownerDocument || t) !== N && M(t), L(t, e)
                }, e.attr = function(t, e) {
                    (t.ownerDocument || t) !== N && M(t);
                    var n = w.attrHandle[e.toLowerCase()],
                        r = n && W.call(w.attrHandle, e.toLowerCase()) ? n(t, e, !D) : void 0;
                    return void 0 !== r ? r : b.attributes || !D ? t.getAttribute(e) : (r = t.getAttributeNode(e)) && r.specified ? r.value : null
                }, e.error = function(t) {
                    throw new Error("Syntax error, unrecognized expression: " + t)
                }, e.uniqueSort = function(t) {
                    var e, n = [],
                        r = 0,
                        i = 0;
                    if (j = !b.detectDuplicates, O = !b.sortStable && t.slice(0), t.sort(U), j) {
                        for (; e = t[i++];) e === t[i] && (r = n.push(i));
                        for (; r--;) t.splice(n[r], 1)
                    }
                    return O = null, t
                }, T = e.getText = function(t) {
                    var e, n = "",
                        r = 0,
                        i = t.nodeType;
                    if (i) {
                        if (1 === i || 9 === i || 11 === i) {
                            if ("string" == typeof t.textContent) return t.textContent;
                            for (t = t.firstChild; t; t = t.nextSibling) n += T(t)
                        } else if (3 === i || 4 === i) return t.nodeValue
                    } else
                        for (; e = t[r++];) n += T(e);
                    return n
                }, w = e.selectors = {
                    cacheLength: 50,
                    createPseudo: r,
                    match: dt,
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
                        ATTR: function(t) {
                            return t[1] = t[1].replace(bt, wt), t[3] = (t[3] || t[4] || t[5] || "").replace(bt, wt), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                        },
                        CHILD: function(t) {
                            return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || e.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && e.error(t[0]), t
                        },
                        PSEUDO: function(t) {
                            var e, n = !t[6] && t[2];
                            return dt.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : n && ft.test(n) && (e = C(n, !0)) && (e = n.indexOf(")", n.length - e) - n.length) && (t[0] = t[0].slice(0, e), t[2] = n.slice(0, e)), t.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function(t) {
                            var e = t.replace(bt, wt).toLowerCase();
                            return "*" === t ? function() {
                                return !0
                            } : function(t) {
                                return t.nodeName && t.nodeName.toLowerCase() === e
                            }
                        },
                        CLASS: function(t) {
                            var e = H[t + " "];
                            return e || (e = new RegExp("(^|" + nt + ")" + t + "(" + nt + "|$)")) && H(t, function(t) {
                                return e.test("string" == typeof t.className && t.className || "undefined" != typeof t.getAttribute && t.getAttribute("class") || "")
                            })
                        },
                        ATTR: function(t, n, r) {
                            return function(i) {
                                var a = e.attr(i, t);
                                return null == a ? "!=" === n : n ? (a += "", "=" === n ? a === r : "!=" === n ? a !== r : "^=" === n ? r && 0 === a.indexOf(r) : "*=" === n ? r && a.indexOf(r) > -1 : "$=" === n ? r && a.slice(-r.length) === r : "~=" === n ? (" " + a.replace(ot, " ") + " ").indexOf(r) > -1 : "|=" === n ? a === r || a.slice(0, r.length + 1) === r + "-" : !1) : !0
                            }
                        },
                        CHILD: function(t, e, n, r, i) {
                            var a = "nth" !== t.slice(0, 3),
                                s = "last" !== t.slice(-4),
                                o = "of-type" === e;
                            return 1 === r && 0 === i ? function(t) {
                                return !!t.parentNode
                            } : function(e, n, l) {
                                var u, c, h, f, p, d, m = a !== s ? "nextSibling" : "previousSibling",
                                    g = e.parentNode,
                                    v = o && e.nodeName.toLowerCase(),
                                    y = !l && !o;
                                if (g) {
                                    if (a) {
                                        for (; m;) {
                                            for (h = e; h = h[m];)
                                                if (o ? h.nodeName.toLowerCase() === v : 1 === h.nodeType) return !1;
                                            d = m = "only" === t && !d && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (d = [s ? g.firstChild : g.lastChild], s && y) {
                                        for (c = g[z] || (g[z] = {}), u = c[t] || [], p = u[0] === q && u[1], f = u[0] === q && u[2], h = p && g.childNodes[p]; h = ++p && h && h[m] || (f = p = 0) || d.pop();)
                                            if (1 === h.nodeType && ++f && h === e) {
                                                c[t] = [q, p, f];
                                                break
                                            }
                                    } else if (y && (u = (e[z] || (e[z] = {}))[t]) && u[0] === q) f = u[1];
                                    else
                                        for (;
                                            (h = ++p && h && h[m] || (f = p = 0) || d.pop()) && ((o ? h.nodeName.toLowerCase() !== v : 1 !== h.nodeType) || !++f || (y && ((h[z] || (h[z] = {}))[t] = [q, f]), h !== e)););
                                    return f -= i, f === r || f % r === 0 && f / r >= 0
                                }
                            }
                        },
                        PSEUDO: function(t, n) {
                            var i, a = w.pseudos[t] || w.setFilters[t.toLowerCase()] || e.error("unsupported pseudo: " + t);
                            return a[z] ? a(n) : a.length > 1 ? (i = [t, t, "", n], w.setFilters.hasOwnProperty(t.toLowerCase()) ? r(function(t, e) {
                                for (var r, i = a(t, n), s = i.length; s--;) r = tt(t, i[s]), t[r] = !(e[r] = i[s])
                            }) : function(t) {
                                return a(t, 0, i)
                            }) : a
                        }
                    },
                    pseudos: {
                        not: r(function(t) {
                            var e = [],
                                n = [],
                                i = S(t.replace(lt, "$1"));
                            return i[z] ? r(function(t, e, n, r) {
                                for (var a, s = i(t, null, r, []), o = t.length; o--;)(a = s[o]) && (t[o] = !(e[o] = a))
                            }) : function(t, r, a) {
                                return e[0] = t, i(e, null, a, n), e[0] = null, !n.pop()
                            }
                        }),
                        has: r(function(t) {
                            return function(n) {
                                return e(t, n).length > 0
                            }
                        }),
                        contains: r(function(t) {
                            return t = t.replace(bt, wt),
                                function(e) {
                                    return (e.textContent || e.innerText || T(e)).indexOf(t) > -1
                                }
                        }),
                        lang: r(function(t) {
                            return pt.test(t || "") || e.error("unsupported lang: " + t), t = t.replace(bt, wt).toLowerCase(),
                                function(e) {
                                    var n;
                                    do
                                        if (n = D ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return n = n.toLowerCase(), n === t || 0 === n.indexOf(t + "-");
                                    while ((e = e.parentNode) && 1 === e.nodeType);
                                    return !1
                                }
                        }),
                        target: function(e) {
                            var n = t.location && t.location.hash;
                            return n && n.slice(1) === e.id
                        },
                        root: function(t) {
                            return t === R
                        },
                        focus: function(t) {
                            return t === N.activeElement && (!N.hasFocus || N.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                        },
                        enabled: function(t) {
                            return t.disabled === !1
                        },
                        disabled: function(t) {
                            return t.disabled === !0
                        },
                        checked: function(t) {
                            var e = t.nodeName.toLowerCase();
                            return "input" === e && !!t.checked || "option" === e && !!t.selected
                        },
                        selected: function(t) {
                            return t.parentNode && t.parentNode.selectedIndex, t.selected === !0
                        },
                        empty: function(t) {
                            for (t = t.firstChild; t; t = t.nextSibling)
                                if (t.nodeType < 6) return !1;
                            return !0
                        },
                        parent: function(t) {
                            return !w.pseudos.empty(t)
                        },
                        header: function(t) {
                            return gt.test(t.nodeName)
                        },
                        input: function(t) {
                            return mt.test(t.nodeName)
                        },
                        button: function(t) {
                            var e = t.nodeName.toLowerCase();
                            return "input" === e && "button" === t.type || "button" === e
                        },
                        text: function(t) {
                            var e;
                            return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
                        },
                        first: u(function() {
                            return [0]
                        }),
                        last: u(function(t, e) {
                            return [e - 1]
                        }),
                        eq: u(function(t, e, n) {
                            return [0 > n ? n + e : n]
                        }),
                        even: u(function(t, e) {
                            for (var n = 0; e > n; n += 2) t.push(n);
                            return t
                        }),
                        odd: u(function(t, e) {
                            for (var n = 1; e > n; n += 2) t.push(n);
                            return t
                        }),
                        lt: u(function(t, e, n) {
                            for (var r = 0 > n ? n + e : n; --r >= 0;) t.push(r);
                            return t
                        }),
                        gt: u(function(t, e, n) {
                            for (var r = 0 > n ? n + e : n; ++r < e;) t.push(r);
                            return t
                        })
                    }
                }, w.pseudos.nth = w.pseudos.eq;
                for (x in {
                        radio: !0,
                        checkbox: !0,
                        file: !0,
                        password: !0,
                        image: !0
                    }) w.pseudos[x] = o(x);
                for (x in {
                        submit: !0,
                        reset: !0
                    }) w.pseudos[x] = l(x);
                return h.prototype = w.filters = w.pseudos, w.setFilters = new h, C = e.tokenize = function(t, n) {
                    var r, i, a, s, o, l, u, c = V[t + " "];
                    if (c) return n ? 0 : c.slice(0);
                    for (o = t, l = [], u = w.preFilter; o;) {
                        (!r || (i = ut.exec(o))) && (i && (o = o.slice(i[0].length) || o), l.push(a = [])), r = !1, (i = ct.exec(o)) && (r = i.shift(), a.push({
                            value: r,
                            type: i[0].replace(lt, " ")
                        }), o = o.slice(r.length));
                        for (s in w.filter) !(i = dt[s].exec(o)) || u[s] && !(i = u[s](i)) || (r = i.shift(), a.push({
                            value: r,
                            type: s,
                            matches: i
                        }), o = o.slice(r.length));
                        if (!r) break
                    }
                    return n ? o.length : o ? e.error(t) : V(t, l).slice(0)
                }, S = e.compile = function(t, e) {
                    var n, r = [],
                        i = [],
                        a = $[t + " "];
                    if (!a) {
                        for (e || (e = C(t)), n = e.length; n--;) a = y(e[n]), a[z] ? r.push(a) : i.push(a);
                        a = $(t, _(i, r)), a.selector = t
                    }
                    return a
                }, P = e.select = function(t, e, n, r) {
                    var i, a, s, o, l, u = "function" == typeof t && t,
                        h = !r && C(t = u.selector || t);
                    if (n = n || [], 1 === h.length) {
                        if (a = h[0] = h[0].slice(0), a.length > 2 && "ID" === (s = a[0]).type && b.getById && 9 === e.nodeType && D && w.relative[a[1].type]) {
                            if (e = (w.find.ID(s.matches[0].replace(bt, wt), e) || [])[0], !e) return n;
                            u && (e = e.parentNode), t = t.slice(a.shift().value.length)
                        }
                        for (i = dt.needsContext.test(t) ? 0 : a.length; i-- && (s = a[i], !w.relative[o = s.type]);)
                            if ((l = w.find[o]) && (r = l(s.matches[0].replace(bt, wt), _t.test(a[0].type) && c(e.parentNode) || e))) {
                                if (a.splice(i, 1), t = r.length && f(a), !t) return J.apply(n, r), n;
                                break
                            }
                    }
                    return (u || S(t, h))(r, e, !D, n, _t.test(t) && c(e.parentNode) || e), n
                }, b.sortStable = z.split("").sort(U).join("") === z, b.detectDuplicates = !!j, M(), b.sortDetached = i(function(t) {
                    return 1 & t.compareDocumentPosition(N.createElement("div"))
                }), i(function(t) {
                    return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
                }) || a("type|href|height|width", function(t, e, n) {
                    return n ? void 0 : t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
                }), b.attributes && i(function(t) {
                    return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
                }) || a("value", function(t, e, n) {
                    return n || "input" !== t.nodeName.toLowerCase() ? void 0 : t.defaultValue
                }), i(function(t) {
                    return null == t.getAttribute("disabled")
                }) || a(et, function(t, e, n) {
                    var r;
                    return n ? void 0 : t[e] === !0 ? e.toLowerCase() : (r = t.getAttributeNode(e)) && r.specified ? r.value : null
                }), e
            }(t);
            K.find = it, K.expr = it.selectors, K.expr[":"] = K.expr.pseudos, K.unique = it.uniqueSort, K.text = it.getText, K.isXMLDoc = it.isXML, K.contains = it.contains;
            var at = K.expr.match.needsContext,
                st = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
                ot = /^.[^:#\[\.,]*$/;
            K.filter = function(t, e, n) {
                var r = e[0];
                return n && (t = ":not(" + t + ")"), 1 === e.length && 1 === r.nodeType ? K.find.matchesSelector(r, t) ? [r] : [] : K.find.matches(t, K.grep(e, function(t) {
                    return 1 === t.nodeType
                }))
            }, K.fn.extend({
                find: function(t) {
                    var e, n = this.length,
                        r = [],
                        i = this;
                    if ("string" != typeof t) return this.pushStack(K(t).filter(function() {
                        for (e = 0; n > e; e++)
                            if (K.contains(i[e], this)) return !0
                    }));
                    for (e = 0; n > e; e++) K.find(t, i[e], r);
                    return r = this.pushStack(n > 1 ? K.unique(r) : r), r.selector = this.selector ? this.selector + " " + t : t, r
                },
                filter: function(t) {
                    return this.pushStack(r(this, t || [], !1))
                },
                not: function(t) {
                    return this.pushStack(r(this, t || [], !0))
                },
                is: function(t) {
                    return !!r(this, "string" == typeof t && at.test(t) ? K(t) : t || [], !1).length
                }
            });
            var lt, ut = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
                ct = K.fn.init = function(t, e) {
                    var n, r;
                    if (!t) return this;
                    if ("string" == typeof t) {
                        if (n = "<" === t[0] && ">" === t[t.length - 1] && t.length >= 3 ? [null, t, null] : ut.exec(t), !n || !n[1] && e) return !e || e.jquery ? (e || lt).find(t) : this.constructor(e).find(t);
                        if (n[1]) {
                            if (e = e instanceof K ? e[0] : e, K.merge(this, K.parseHTML(n[1], e && e.nodeType ? e.ownerDocument || e : Q, !0)), st.test(n[1]) && K.isPlainObject(e))
                                for (n in e) K.isFunction(this[n]) ? this[n](e[n]) : this.attr(n, e[n]);
                            return this
                        }
                        return r = Q.getElementById(n[2]), r && r.parentNode && (this.length = 1, this[0] = r), this.context = Q, this.selector = t, this
                    }
                    return t.nodeType ? (this.context = this[0] = t, this.length = 1, this) : K.isFunction(t) ? "undefined" != typeof lt.ready ? lt.ready(t) : t(K) : (void 0 !== t.selector && (this.selector = t.selector, this.context = t.context), K.makeArray(t, this))
                };
            ct.prototype = K.fn, lt = K(Q);
            var ht = /^(?:parents|prev(?:Until|All))/,
                ft = {
                    children: !0,
                    contents: !0,
                    next: !0,
                    prev: !0
                };
            K.extend({
                dir: function(t, e, n) {
                    for (var r = [], i = void 0 !== n;
                        (t = t[e]) && 9 !== t.nodeType;)
                        if (1 === t.nodeType) {
                            if (i && K(t).is(n)) break;
                            r.push(t)
                        }
                    return r
                },
                sibling: function(t, e) {
                    for (var n = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && n.push(t);
                    return n
                }
            }), K.fn.extend({
                has: function(t) {
                    var e = K(t, this),
                        n = e.length;
                    return this.filter(function() {
                        for (var t = 0; n > t; t++)
                            if (K.contains(this, e[t])) return !0
                    })
                },
                closest: function(t, e) {
                    for (var n, r = 0, i = this.length, a = [], s = at.test(t) || "string" != typeof t ? K(t, e || this.context) : 0; i > r; r++)
                        for (n = this[r]; n && n !== e; n = n.parentNode)
                            if (n.nodeType < 11 && (s ? s.index(n) > -1 : 1 === n.nodeType && K.find.matchesSelector(n, t))) {
                                a.push(n);
                                break
                            }
                    return this.pushStack(a.length > 1 ? K.unique(a) : a)
                },
                index: function(t) {
                    return t ? "string" == typeof t ? U.call(K(t), this[0]) : U.call(this, t.jquery ? t[0] : t) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                },
                add: function(t, e) {
                    return this.pushStack(K.unique(K.merge(this.get(), K(t, e))))
                },
                addBack: function(t) {
                    return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
                }
            }), K.each({
                parent: function(t) {
                    var e = t.parentNode;
                    return e && 11 !== e.nodeType ? e : null
                },
                parents: function(t) {
                    return K.dir(t, "parentNode")
                },
                parentsUntil: function(t, e, n) {
                    return K.dir(t, "parentNode", n)
                },
                next: function(t) {
                    return i(t, "nextSibling")
                },
                prev: function(t) {
                    return i(t, "previousSibling")
                },
                nextAll: function(t) {
                    return K.dir(t, "nextSibling")
                },
                prevAll: function(t) {
                    return K.dir(t, "previousSibling")
                },
                nextUntil: function(t, e, n) {
                    return K.dir(t, "nextSibling", n)
                },
                prevUntil: function(t, e, n) {
                    return K.dir(t, "previousSibling", n)
                },
                siblings: function(t) {
                    return K.sibling((t.parentNode || {}).firstChild, t)
                },
                children: function(t) {
                    return K.sibling(t.firstChild)
                },
                contents: function(t) {
                    return t.contentDocument || K.merge([], t.childNodes)
                }
            }, function(t, e) {
                K.fn[t] = function(n, r) {
                    var i = K.map(this, e, n);
                    return "Until" !== t.slice(-5) && (r = n), r && "string" == typeof r && (i = K.filter(r, i)), this.length > 1 && (ft[t] || K.unique(i), ht.test(t) && i.reverse()), this.pushStack(i)
                }
            });
            var pt = /\S+/g,
                dt = {};
            K.Callbacks = function(t) {
                t = "string" == typeof t ? dt[t] || a(t) : K.extend({}, t);
                var e, n, r, i, s, o, l = [],
                    u = !t.once && [],
                    c = function(a) {
                        for (e = t.memory && a, n = !0, o = i || 0, i = 0, s = l.length, r = !0; l && s > o; o++)
                            if (l[o].apply(a[0], a[1]) === !1 && t.stopOnFalse) {
                                e = !1;
                                break
                            }
                        r = !1, l && (u ? u.length && c(u.shift()) : e ? l = [] : h.disable())
                    },
                    h = {
                        add: function() {
                            if (l) {
                                var n = l.length;
                                ! function a(e) {
                                    K.each(e, function(e, n) {
                                        var r = K.type(n);
                                        "function" === r ? t.unique && h.has(n) || l.push(n) : n && n.length && "string" !== r && a(n)
                                    })
                                }(arguments), r ? s = l.length : e && (i = n, c(e))
                            }
                            return this
                        },
                        remove: function() {
                            return l && K.each(arguments, function(t, e) {
                                for (var n;
                                    (n = K.inArray(e, l, n)) > -1;) l.splice(n, 1), r && (s >= n && s--, o >= n && o--)
                            }), this
                        },
                        has: function(t) {
                            return t ? K.inArray(t, l) > -1 : !(!l || !l.length)
                        },
                        empty: function() {
                            return l = [], s = 0, this
                        },
                        disable: function() {
                            return l = u = e = void 0, this
                        },
                        disabled: function() {
                            return !l
                        },
                        lock: function() {
                            return u = void 0, e || h.disable(), this
                        },
                        locked: function() {
                            return !u
                        },
                        fireWith: function(t, e) {
                            return !l || n && !u || (e = e || [], e = [t, e.slice ? e.slice() : e], r ? u.push(e) : c(e)), this
                        },
                        fire: function() {
                            return h.fireWith(this, arguments), this
                        },
                        fired: function() {
                            return !!n
                        }
                    };
                return h
            }, K.extend({
                Deferred: function(t) {
                    var e = [
                            ["resolve", "done", K.Callbacks("once memory"), "resolved"],
                            ["reject", "fail", K.Callbacks("once memory"), "rejected"],
                            ["notify", "progress", K.Callbacks("memory")]
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
                                var t = arguments;
                                return K.Deferred(function(n) {
                                    K.each(e, function(e, a) {
                                        var s = K.isFunction(t[e]) && t[e];
                                        i[a[1]](function() {
                                            var t = s && s.apply(this, arguments);
                                            t && K.isFunction(t.promise) ? t.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[a[0] + "With"](this === r ? n.promise() : this, s ? [t] : arguments)
                                        })
                                    }), t = null
                                }).promise()
                            },
                            promise: function(t) {
                                return null != t ? K.extend(t, r) : r
                            }
                        },
                        i = {};
                    return r.pipe = r.then, K.each(e, function(t, a) {
                        var s = a[2],
                            o = a[3];
                        r[a[1]] = s.add, o && s.add(function() {
                            n = o
                        }, e[1 ^ t][2].disable, e[2][2].lock), i[a[0]] = function() {
                            return i[a[0] + "With"](this === i ? r : this, arguments), this
                        }, i[a[0] + "With"] = s.fireWith
                    }), r.promise(i), t && t.call(i, i), i
                },
                when: function(t) {
                    var e, n, r, i = 0,
                        a = H.call(arguments),
                        s = a.length,
                        o = 1 !== s || t && K.isFunction(t.promise) ? s : 0,
                        l = 1 === o ? t : K.Deferred(),
                        u = function(t, n, r) {
                            return function(i) {
                                n[t] = this, r[t] = arguments.length > 1 ? H.call(arguments) : i, r === e ? l.notifyWith(n, r) : --o || l.resolveWith(n, r)
                            }
                        };
                    if (s > 1)
                        for (e = new Array(s), n = new Array(s), r = new Array(s); s > i; i++) a[i] && K.isFunction(a[i].promise) ? a[i].promise().done(u(i, r, a)).fail(l.reject).progress(u(i, n, e)) : --o;
                    return o || l.resolveWith(r, a), l.promise()
                }
            });
            var mt;
            K.fn.ready = function(t) {
                return K.ready.promise().done(t), this
            }, K.extend({
                isReady: !1,
                readyWait: 1,
                holdReady: function(t) {
                    t ? K.readyWait++ : K.ready(!0)
                },
                ready: function(t) {
                    (t === !0 ? --K.readyWait : K.isReady) || (K.isReady = !0, t !== !0 && --K.readyWait > 0 || (mt.resolveWith(Q, [K]), K.fn.triggerHandler && (K(Q).triggerHandler("ready"), K(Q).off("ready"))))
                }
            }), K.ready.promise = function(e) {
                return mt || (mt = K.Deferred(), "complete" === Q.readyState ? setTimeout(K.ready) : (Q.addEventListener("DOMContentLoaded", s, !1), t.addEventListener("load", s, !1))), mt.promise(e)
            }, K.ready.promise();
            var gt = K.access = function(t, e, n, r, i, a, s) {
                var o = 0,
                    l = t.length,
                    u = null == n;
                if ("object" === K.type(n)) {
                    i = !0;
                    for (o in n) K.access(t, e, o, n[o], !0, a, s)
                } else if (void 0 !== r && (i = !0, K.isFunction(r) || (s = !0), u && (s ? (e.call(t, r), e = null) : (u = e, e = function(t, e, n) {
                        return u.call(K(t), n)
                    })), e))
                    for (; l > o; o++) e(t[o], n, s ? r : r.call(t[o], o, e(t[o], n)));
                return i ? t : u ? e.call(t) : l ? e(t[0], n) : a
            };
            K.acceptData = function(t) {
                return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType
            }, o.uid = 1, o.accepts = K.acceptData, o.prototype = {
                key: function(t) {
                    if (!o.accepts(t)) return 0;
                    var e = {},
                        n = t[this.expando];
                    if (!n) {
                        n = o.uid++;
                        try {
                            e[this.expando] = {
                                value: n
                            }, Object.defineProperties(t, e)
                        } catch (r) {
                            e[this.expando] = n, K.extend(t, e)
                        }
                    }
                    return this.cache[n] || (this.cache[n] = {}), n
                },
                set: function(t, e, n) {
                    var r, i = this.key(t),
                        a = this.cache[i];
                    if ("string" == typeof e) a[e] = n;
                    else if (K.isEmptyObject(a)) K.extend(this.cache[i], e);
                    else
                        for (r in e) a[r] = e[r];
                    return a
                },
                get: function(t, e) {
                    var n = this.cache[this.key(t)];
                    return void 0 === e ? n : n[e]
                },
                access: function(t, e, n) {
                    var r;
                    return void 0 === e || e && "string" == typeof e && void 0 === n ? (r = this.get(t, e), void 0 !== r ? r : this.get(t, K.camelCase(e))) : (this.set(t, e, n), void 0 !== n ? n : e)
                },
                remove: function(t, e) {
                    var n, r, i, a = this.key(t),
                        s = this.cache[a];
                    if (void 0 === e) this.cache[a] = {};
                    else {
                        K.isArray(e) ? r = e.concat(e.map(K.camelCase)) : (i = K.camelCase(e), e in s ? r = [e, i] : (r = i, r = r in s ? [r] : r.match(pt) || [])), n = r.length;
                        for (; n--;) delete s[r[n]]
                    }
                },
                hasData: function(t) {
                    return !K.isEmptyObject(this.cache[t[this.expando]] || {})
                },
                discard: function(t) {
                    t[this.expando] && delete this.cache[t[this.expando]]
                }
            };
            var vt = new o,
                yt = new o,
                _t = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
                xt = /([A-Z])/g;
            K.extend({
                hasData: function(t) {
                    return yt.hasData(t) || vt.hasData(t)
                },
                data: function(t, e, n) {
                    return yt.access(t, e, n)
                },
                removeData: function(t, e) {
                    yt.remove(t, e)
                },
                _data: function(t, e, n) {
                    return vt.access(t, e, n)
                },
                _removeData: function(t, e) {
                    vt.remove(t, e)
                }
            }), K.fn.extend({
                data: function(t, e) {
                    var n, r, i, a = this[0],
                        s = a && a.attributes;
                    if (void 0 === t) {
                        if (this.length && (i = yt.get(a), 1 === a.nodeType && !vt.get(a, "hasDataAttrs"))) {
                            for (n = s.length; n--;) s[n] && (r = s[n].name, 0 === r.indexOf("data-") && (r = K.camelCase(r.slice(5)), l(a, r, i[r])));
                            vt.set(a, "hasDataAttrs", !0)
                        }
                        return i
                    }
                    return "object" == typeof t ? this.each(function() {
                        yt.set(this, t)
                    }) : gt(this, function(e) {
                        var n, r = K.camelCase(t);
                        if (a && void 0 === e) {
                            if (n = yt.get(a, t), void 0 !== n) return n;
                            if (n = yt.get(a, r), void 0 !== n) return n;
                            if (n = l(a, r, void 0), void 0 !== n) return n
                        } else this.each(function() {
                            var n = yt.get(this, r);
                            yt.set(this, r, e), -1 !== t.indexOf("-") && void 0 !== n && yt.set(this, t, e)
                        })
                    }, null, e, arguments.length > 1, null, !0)
                },
                removeData: function(t) {
                    return this.each(function() {
                        yt.remove(this, t)
                    })
                }
            }), K.extend({
                queue: function(t, e, n) {
                    var r;
                    return t ? (e = (e || "fx") + "queue", r = vt.get(t, e), n && (!r || K.isArray(n) ? r = vt.access(t, e, K.makeArray(n)) : r.push(n)), r || []) : void 0
                },
                dequeue: function(t, e) {
                    e = e || "fx";
                    var n = K.queue(t, e),
                        r = n.length,
                        i = n.shift(),
                        a = K._queueHooks(t, e),
                        s = function() {
                            K.dequeue(t, e)
                        };
                    "inprogress" === i && (i = n.shift(), r--), i && ("fx" === e && n.unshift("inprogress"), delete a.stop, i.call(t, s, a)), !r && a && a.empty.fire()
                },
                _queueHooks: function(t, e) {
                    var n = e + "queueHooks";
                    return vt.get(t, n) || vt.access(t, n, {
                        empty: K.Callbacks("once memory").add(function() {
                            vt.remove(t, [e + "queue", n])
                        })
                    })
                }
            }), K.fn.extend({
                queue: function(t, e) {
                    var n = 2;
                    return "string" != typeof t && (e = t, t = "fx", n--), arguments.length < n ? K.queue(this[0], t) : void 0 === e ? this : this.each(function() {
                        var n = K.queue(this, t, e);
                        K._queueHooks(this, t), "fx" === t && "inprogress" !== n[0] && K.dequeue(this, t)
                    })
                },
                dequeue: function(t) {
                    return this.each(function() {
                        K.dequeue(this, t)
                    })
                },
                clearQueue: function(t) {
                    return this.queue(t || "fx", [])
                },
                promise: function(t, e) {
                    var n, r = 1,
                        i = K.Deferred(),
                        a = this,
                        s = this.length,
                        o = function() {
                            --r || i.resolveWith(a, [a])
                        };
                    for ("string" != typeof t && (e = t, t = void 0), t = t || "fx"; s--;) n = vt.get(a[s], t + "queueHooks"), n && n.empty && (r++, n.empty.add(o));
                    return o(), i.promise(e)
                }
            });
            var bt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                wt = ["Top", "Right", "Bottom", "Left"],
                Tt = function(t, e) {
                    return t = e || t, "none" === K.css(t, "display") || !K.contains(t.ownerDocument, t)
                },
                kt = /^(?:checkbox|radio)$/i;
            ! function() {
                var t = Q.createDocumentFragment(),
                    e = t.appendChild(Q.createElement("div")),
                    n = Q.createElement("input");
                n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), e.appendChild(n), Z.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, e.innerHTML = "<textarea>x</textarea>", Z.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue
            }();
            var Ct = "undefined";
            Z.focusinBubbles = "onfocusin" in t;
            var St = /^key/,
                Pt = /^(?:mouse|pointer|contextmenu)|click/,
                At = /^(?:focusinfocus|focusoutblur)$/,
                Ot = /^([^.]*)(?:\.(.+)|)$/;
            K.event = {
                global: {},
                add: function(t, e, n, r, i) {
                    var a, s, o, l, u, c, h, f, p, d, m, g = vt.get(t);
                    if (g)
                        for (n.handler && (a = n, n = a.handler, i = a.selector), n.guid || (n.guid = K.guid++), (l = g.events) || (l = g.events = {}), (s = g.handle) || (s = g.handle = function(e) {
                                return typeof K !== Ct && K.event.triggered !== e.type ? K.event.dispatch.apply(t, arguments) : void 0
                            }), e = (e || "").match(pt) || [""], u = e.length; u--;) o = Ot.exec(e[u]) || [], p = m = o[1], d = (o[2] || "").split(".").sort(), p && (h = K.event.special[p] || {}, p = (i ? h.delegateType : h.bindType) || p, h = K.event.special[p] || {}, c = K.extend({
                            type: p,
                            origType: m,
                            data: r,
                            handler: n,
                            guid: n.guid,
                            selector: i,
                            needsContext: i && K.expr.match.needsContext.test(i),
                            namespace: d.join(".")
                        }, a), (f = l[p]) || (f = l[p] = [], f.delegateCount = 0, h.setup && h.setup.call(t, r, d, s) !== !1 || t.addEventListener && t.addEventListener(p, s, !1)), h.add && (h.add.call(t, c), c.handler.guid || (c.handler.guid = n.guid)), i ? f.splice(f.delegateCount++, 0, c) : f.push(c), K.event.global[p] = !0)
                },
                remove: function(t, e, n, r, i) {
                    var a, s, o, l, u, c, h, f, p, d, m, g = vt.hasData(t) && vt.get(t);
                    if (g && (l = g.events)) {
                        for (e = (e || "").match(pt) || [""], u = e.length; u--;)
                            if (o = Ot.exec(e[u]) || [], p = m = o[1], d = (o[2] || "").split(".").sort(), p) {
                                for (h = K.event.special[p] || {}, p = (r ? h.delegateType : h.bindType) || p, f = l[p] || [], o = o[2] && new RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = a = f.length; a--;) c = f[a], !i && m !== c.origType || n && n.guid !== c.guid || o && !o.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (f.splice(a, 1), c.selector && f.delegateCount--, h.remove && h.remove.call(t, c));
                                s && !f.length && (h.teardown && h.teardown.call(t, d, g.handle) !== !1 || K.removeEvent(t, p, g.handle), delete l[p])
                            } else
                                for (p in l) K.event.remove(t, p + e[u], n, r, !0);
                        K.isEmptyObject(l) && (delete g.handle, vt.remove(t, "events"))
                    }
                },
                trigger: function(e, n, r, i) {
                    var a, s, o, l, u, c, h, f = [r || Q],
                        p = G.call(e, "type") ? e.type : e,
                        d = G.call(e, "namespace") ? e.namespace.split(".") : [];
                    if (s = o = r = r || Q, 3 !== r.nodeType && 8 !== r.nodeType && !At.test(p + K.event.triggered) && (p.indexOf(".") >= 0 && (d = p.split("."), p = d.shift(), d.sort()), u = p.indexOf(":") < 0 && "on" + p, e = e[K.expando] ? e : new K.Event(p, "object" == typeof e && e), e.isTrigger = i ? 2 : 3, e.namespace = d.join("."), e.namespace_re = e.namespace ? new RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = r), n = null == n ? [e] : K.makeArray(n, [e]), h = K.event.special[p] || {}, i || !h.trigger || h.trigger.apply(r, n) !== !1)) {
                        if (!i && !h.noBubble && !K.isWindow(r)) {
                            for (l = h.delegateType || p, At.test(l + p) || (s = s.parentNode); s; s = s.parentNode) f.push(s), o = s;
                            o === (r.ownerDocument || Q) && f.push(o.defaultView || o.parentWindow || t)
                        }
                        for (a = 0;
                            (s = f[a++]) && !e.isPropagationStopped();) e.type = a > 1 ? l : h.bindType || p, c = (vt.get(s, "events") || {})[e.type] && vt.get(s, "handle"), c && c.apply(s, n), c = u && s[u], c && c.apply && K.acceptData(s) && (e.result = c.apply(s, n), e.result === !1 && e.preventDefault());
                        return e.type = p, i || e.isDefaultPrevented() || h._default && h._default.apply(f.pop(), n) !== !1 || !K.acceptData(r) || u && K.isFunction(r[p]) && !K.isWindow(r) && (o = r[u], o && (r[u] = null), K.event.triggered = p, r[p](), K.event.triggered = void 0, o && (r[u] = o)), e.result
                    }
                },
                dispatch: function(t) {
                    t = K.event.fix(t);
                    var e, n, r, i, a, s = [],
                        o = H.call(arguments),
                        l = (vt.get(this, "events") || {})[t.type] || [],
                        u = K.event.special[t.type] || {};
                    if (o[0] = t, t.delegateTarget = this, !u.preDispatch || u.preDispatch.call(this, t) !== !1) {
                        for (s = K.event.handlers.call(this, t, l), e = 0;
                            (i = s[e++]) && !t.isPropagationStopped();)
                            for (t.currentTarget = i.elem, n = 0;
                                (a = i.handlers[n++]) && !t.isImmediatePropagationStopped();)(!t.namespace_re || t.namespace_re.test(a.namespace)) && (t.handleObj = a, t.data = a.data, r = ((K.event.special[a.origType] || {}).handle || a.handler).apply(i.elem, o), void 0 !== r && (t.result = r) === !1 && (t.preventDefault(), t.stopPropagation()));
                        return u.postDispatch && u.postDispatch.call(this, t), t.result
                    }
                },
                handlers: function(t, e) {
                    var n, r, i, a, s = [],
                        o = e.delegateCount,
                        l = t.target;
                    if (o && l.nodeType && (!t.button || "click" !== t.type))
                        for (; l !== this; l = l.parentNode || this)
                            if (l.disabled !== !0 || "click" !== t.type) {
                                for (r = [], n = 0; o > n; n++) a = e[n], i = a.selector + " ", void 0 === r[i] && (r[i] = a.needsContext ? K(i, this).index(l) >= 0 : K.find(i, this, null, [l]).length), r[i] && r.push(a);
                                r.length && s.push({
                                    elem: l,
                                    handlers: r
                                })
                            }
                    return o < e.length && s.push({
                        elem: this,
                        handlers: e.slice(o)
                    }), s
                },
                props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                fixHooks: {},
                keyHooks: {
                    props: "char charCode key keyCode".split(" "),
                    filter: function(t, e) {
                        return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t
                    }
                },
                mouseHooks: {
                    props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                    filter: function(t, e) {
                        var n, r, i, a = e.button;
                        return null == t.pageX && null != e.clientX && (n = t.target.ownerDocument || Q, r = n.documentElement, i = n.body, t.pageX = e.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), t.pageY = e.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)), t.which || void 0 === a || (t.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), t
                    }
                },
                fix: function(t) {
                    if (t[K.expando]) return t;
                    var e, n, r, i = t.type,
                        a = t,
                        s = this.fixHooks[i];
                    for (s || (this.fixHooks[i] = s = Pt.test(i) ? this.mouseHooks : St.test(i) ? this.keyHooks : {}), r = s.props ? this.props.concat(s.props) : this.props, t = new K.Event(a), e = r.length; e--;) n = r[e], t[n] = a[n];
                    return t.target || (t.target = Q), 3 === t.target.nodeType && (t.target = t.target.parentNode), s.filter ? s.filter(t, a) : t
                },
                special: {
                    load: {
                        noBubble: !0
                    },
                    focus: {
                        trigger: function() {
                            return this !== h() && this.focus ? (this.focus(), !1) : void 0
                        },
                        delegateType: "focusin"
                    },
                    blur: {
                        trigger: function() {
                            return this === h() && this.blur ? (this.blur(), !1) : void 0
                        },
                        delegateType: "focusout"
                    },
                    click: {
                        trigger: function() {
                            return "checkbox" === this.type && this.click && K.nodeName(this, "input") ? (this.click(), !1) : void 0
                        },
                        _default: function(t) {
                            return K.nodeName(t.target, "a")
                        }
                    },
                    beforeunload: {
                        postDispatch: function(t) {
                            void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
                        }
                    }
                },
                simulate: function(t, e, n, r) {
                    var i = K.extend(new K.Event, n, {
                        type: t,
                        isSimulated: !0,
                        originalEvent: {}
                    });
                    r ? K.event.trigger(i, null, e) : K.event.dispatch.call(e, i), i.isDefaultPrevented() && n.preventDefault()
                }
            }, K.removeEvent = function(t, e, n) {
                t.removeEventListener && t.removeEventListener(e, n, !1)
            }, K.Event = function(t, e) {
                return this instanceof K.Event ? (t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && t.returnValue === !1 ? u : c) : this.type = t, e && K.extend(this, e), this.timeStamp = t && t.timeStamp || K.now(), void(this[K.expando] = !0)) : new K.Event(t, e)
            }, K.Event.prototype = {
                isDefaultPrevented: c,
                isPropagationStopped: c,
                isImmediatePropagationStopped: c,
                preventDefault: function() {
                    var t = this.originalEvent;
                    this.isDefaultPrevented = u, t && t.preventDefault && t.preventDefault()
                },
                stopPropagation: function() {
                    var t = this.originalEvent;
                    this.isPropagationStopped = u, t && t.stopPropagation && t.stopPropagation()
                },
                stopImmediatePropagation: function() {
                    var t = this.originalEvent;
                    this.isImmediatePropagationStopped = u, t && t.stopImmediatePropagation && t.stopImmediatePropagation(), this.stopPropagation()
                }
            }, K.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout"
            }, function(t, e) {
                K.event.special[t] = {
                    delegateType: e,
                    bindType: e,
                    handle: function(t) {
                        var n, r = this,
                            i = t.relatedTarget,
                            a = t.handleObj;
                        return (!i || i !== r && !K.contains(r, i)) && (t.type = a.origType, n = a.handler.apply(this, arguments), t.type = e), n
                    }
                }
            }), Z.focusinBubbles || K.each({
                focus: "focusin",
                blur: "focusout"
            }, function(t, e) {
                var n = function(t) {
                    K.event.simulate(e, t.target, K.event.fix(t), !0)
                };
                K.event.special[e] = {
                    setup: function() {
                        var r = this.ownerDocument || this,
                            i = vt.access(r, e);
                        i || r.addEventListener(t, n, !0), vt.access(r, e, (i || 0) + 1)
                    },
                    teardown: function() {
                        var r = this.ownerDocument || this,
                            i = vt.access(r, e) - 1;
                        i ? vt.access(r, e, i) : (r.removeEventListener(t, n, !0), vt.remove(r, e))
                    }
                }
            }), K.fn.extend({
                on: function(t, e, n, r, i) {
                    var a, s;
                    if ("object" == typeof t) {
                        "string" != typeof e && (n = n || e, e = void 0);
                        for (s in t) this.on(s, e, n, t[s], i);
                        return this
                    }
                    if (null == n && null == r ? (r = e, n = e = void 0) : null == r && ("string" == typeof e ? (r = n, n = void 0) : (r = n, n = e, e = void 0)), r === !1) r = c;
                    else if (!r) return this;
                    return 1 === i && (a = r, r = function(t) {
                        return K().off(t), a.apply(this, arguments)
                    }, r.guid = a.guid || (a.guid = K.guid++)), this.each(function() {
                        K.event.add(this, t, r, n, e)
                    })
                },
                one: function(t, e, n, r) {
                    return this.on(t, e, n, r, 1)
                },
                off: function(t, e, n) {
                    var r, i;
                    if (t && t.preventDefault && t.handleObj) return r = t.handleObj, K(t.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
                    if ("object" == typeof t) {
                        for (i in t) this.off(i, e, t[i]);
                        return this
                    }
                    return (e === !1 || "function" == typeof e) && (n = e, e = void 0), n === !1 && (n = c), this.each(function() {
                        K.event.remove(this, t, n, e)
                    })
                },
                trigger: function(t, e) {
                    return this.each(function() {
                        K.event.trigger(t, e, this)
                    })
                },
                triggerHandler: function(t, e) {
                    var n = this[0];
                    return n ? K.event.trigger(t, e, n, !0) : void 0
                }
            });
            var jt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
                Mt = /<([\w:]+)/,
                Nt = /<|&#?\w+;/,
                Rt = /<(?:script|style|link)/i,
                Dt = /checked\s*(?:[^=]|=\s*.checked.)/i,
                Et = /^$|\/(?:java|ecma)script/i,
                Ft = /^true\/(.*)/,
                It = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
                Lt = {
                    option: [1, "<select multiple='multiple'>", "</select>"],
                    thead: [1, "<table>", "</table>"],
                    col: [2, "<table><colgroup>", "</colgroup></table>"],
                    tr: [2, "<table><tbody>", "</tbody></table>"],
                    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                    _default: [0, "", ""]
                };
            Lt.optgroup = Lt.option, Lt.tbody = Lt.tfoot = Lt.colgroup = Lt.caption = Lt.thead, Lt.th = Lt.td, K.extend({
                clone: function(t, e, n) {
                    var r, i, a, s, o = t.cloneNode(!0),
                        l = K.contains(t.ownerDocument, t);
                    if (!(Z.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || K.isXMLDoc(t)))
                        for (s = v(o), a = v(t), r = 0, i = a.length; i > r; r++) y(a[r], s[r]);
                    if (e)
                        if (n)
                            for (a = a || v(t), s = s || v(o), r = 0, i = a.length; i > r; r++) g(a[r], s[r]);
                        else g(t, o);
                    return s = v(o, "script"), s.length > 0 && m(s, !l && v(t, "script")), o
                },
                buildFragment: function(t, e, n, r) {
                    for (var i, a, s, o, l, u, c = e.createDocumentFragment(), h = [], f = 0, p = t.length; p > f; f++)
                        if (i = t[f], i || 0 === i)
                            if ("object" === K.type(i)) K.merge(h, i.nodeType ? [i] : i);
                            else if (Nt.test(i)) {
                        for (a = a || c.appendChild(e.createElement("div")), s = (Mt.exec(i) || ["", ""])[1].toLowerCase(), o = Lt[s] || Lt._default, a.innerHTML = o[1] + i.replace(jt, "<$1></$2>") + o[2], u = o[0]; u--;) a = a.lastChild;
                        K.merge(h, a.childNodes), a = c.firstChild, a.textContent = ""
                    } else h.push(e.createTextNode(i));
                    for (c.textContent = "", f = 0; i = h[f++];)
                        if ((!r || -1 === K.inArray(i, r)) && (l = K.contains(i.ownerDocument, i), a = v(c.appendChild(i), "script"), l && m(a), n))
                            for (u = 0; i = a[u++];) Et.test(i.type || "") && n.push(i);
                    return c
                },
                cleanData: function(t) {
                    for (var e, n, r, i, a = K.event.special, s = 0; void 0 !== (n = t[s]); s++) {
                        if (K.acceptData(n) && (i = n[vt.expando], i && (e = vt.cache[i]))) {
                            if (e.events)
                                for (r in e.events) a[r] ? K.event.remove(n, r) : K.removeEvent(n, r, e.handle);
                            vt.cache[i] && delete vt.cache[i]
                        }
                        delete yt.cache[n[yt.expando]]
                    }
                }
            }), K.fn.extend({
                text: function(t) {
                    return gt(this, function(t) {
                        return void 0 === t ? K.text(this) : this.empty().each(function() {
                            (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = t)
                        })
                    }, null, t, arguments.length)
                },
                append: function() {
                    return this.domManip(arguments, function(t) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var e = f(this, t);
                            e.appendChild(t)
                        }
                    })
                },
                prepend: function() {
                    return this.domManip(arguments, function(t) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var e = f(this, t);
                            e.insertBefore(t, e.firstChild)
                        }
                    })
                },
                before: function() {
                    return this.domManip(arguments, function(t) {
                        this.parentNode && this.parentNode.insertBefore(t, this)
                    })
                },
                after: function() {
                    return this.domManip(arguments, function(t) {
                        this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
                    })
                },
                remove: function(t, e) {
                    for (var n, r = t ? K.filter(t, this) : this, i = 0; null != (n = r[i]); i++) e || 1 !== n.nodeType || K.cleanData(v(n)), n.parentNode && (e && K.contains(n.ownerDocument, n) && m(v(n, "script")), n.parentNode.removeChild(n));
                    return this
                },
                empty: function() {
                    for (var t, e = 0; null != (t = this[e]); e++) 1 === t.nodeType && (K.cleanData(v(t, !1)), t.textContent = "");
                    return this
                },
                clone: function(t, e) {
                    return t = null == t ? !1 : t, e = null == e ? t : e, this.map(function() {
                        return K.clone(this, t, e)
                    })
                },
                html: function(t) {
                    return gt(this, function(t) {
                        var e = this[0] || {},
                            n = 0,
                            r = this.length;
                        if (void 0 === t && 1 === e.nodeType) return e.innerHTML;
                        if ("string" == typeof t && !Rt.test(t) && !Lt[(Mt.exec(t) || ["", ""])[1].toLowerCase()]) {
                            t = t.replace(jt, "<$1></$2>");
                            try {
                                for (; r > n; n++) e = this[n] || {}, 1 === e.nodeType && (K.cleanData(v(e, !1)), e.innerHTML = t);
                                e = 0
                            } catch (i) {}
                        }
                        e && this.empty().append(t)
                    }, null, t, arguments.length)
                },
                replaceWith: function() {
                    var t = arguments[0];
                    return this.domManip(arguments, function(e) {
                        t = this.parentNode, K.cleanData(v(this)), t && t.replaceChild(e, this)
                    }), t && (t.length || t.nodeType) ? this : this.remove()
                },
                detach: function(t) {
                    return this.remove(t, !0)
                },
                domManip: function(t, e) {
                    t = V.apply([], t);
                    var n, r, i, a, s, o, l = 0,
                        u = this.length,
                        c = this,
                        h = u - 1,
                        f = t[0],
                        m = K.isFunction(f);
                    if (m || u > 1 && "string" == typeof f && !Z.checkClone && Dt.test(f)) return this.each(function(n) {
                        var r = c.eq(n);
                        m && (t[0] = f.call(this, n, r.html())), r.domManip(t, e)
                    });
                    if (u && (n = K.buildFragment(t, this[0].ownerDocument, !1, this), r = n.firstChild, 1 === n.childNodes.length && (n = r), r)) {
                        for (i = K.map(v(n, "script"), p), a = i.length; u > l; l++) s = n, l !== h && (s = K.clone(s, !0, !0), a && K.merge(i, v(s, "script"))), e.call(this[l], s, l);
                        if (a)
                            for (o = i[i.length - 1].ownerDocument, K.map(i, d), l = 0; a > l; l++) s = i[l], Et.test(s.type || "") && !vt.access(s, "globalEval") && K.contains(o, s) && (s.src ? K._evalUrl && K._evalUrl(s.src) : K.globalEval(s.textContent.replace(It, "")))
                    }
                    return this
                }
            }), K.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            }, function(t, e) {
                K.fn[t] = function(t) {
                    for (var n, r = [], i = K(t), a = i.length - 1, s = 0; a >= s; s++) n = s === a ? this : this.clone(!0), K(i[s])[e](n), $.apply(r, n.get());
                    return this.pushStack(r)
                }
            });
            var zt, Bt = {},
                qt = /^margin/,
                Xt = new RegExp("^(" + bt + ")(?!px)[a-z%]+$", "i"),
                Ht = function(e) {
                    return e.ownerDocument.defaultView.opener ? e.ownerDocument.defaultView.getComputedStyle(e, null) : t.getComputedStyle(e, null)
                };
            ! function() {
                function e() {
                    s.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", s.innerHTML = "", i.appendChild(a);
                    var e = t.getComputedStyle(s, null);
                    n = "1%" !== e.top, r = "4px" === e.width, i.removeChild(a)
                }
                var n, r, i = Q.documentElement,
                    a = Q.createElement("div"),
                    s = Q.createElement("div");
                s.style && (s.style.backgroundClip = "content-box", s.cloneNode(!0).style.backgroundClip = "", Z.clearCloneStyle = "content-box" === s.style.backgroundClip, a.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", a.appendChild(s), t.getComputedStyle && K.extend(Z, {
                    pixelPosition: function() {
                        return e(), n
                    },
                    boxSizingReliable: function() {
                        return null == r && e(), r
                    },
                    reliableMarginRight: function() {
                        var e, n = s.appendChild(Q.createElement("div"));
                        return n.style.cssText = s.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", n.style.marginRight = n.style.width = "0", s.style.width = "1px", i.appendChild(a), e = !parseFloat(t.getComputedStyle(n, null).marginRight), i.removeChild(a), s.removeChild(n), e
                    }
                }))
            }(), K.swap = function(t, e, n, r) {
                var i, a, s = {};
                for (a in e) s[a] = t.style[a], t.style[a] = e[a];
                i = n.apply(t, r || []);
                for (a in e) t.style[a] = s[a];
                return i
            };
            var Vt = /^(none|table(?!-c[ea]).+)/,
                $t = new RegExp("^(" + bt + ")(.*)$", "i"),
                Ut = new RegExp("^([+-])=(" + bt + ")", "i"),
                Yt = {
                    position: "absolute",
                    visibility: "hidden",
                    display: "block"
                },
                Wt = {
                    letterSpacing: "0",
                    fontWeight: "400"
                },
                Gt = ["Webkit", "O", "Moz", "ms"];
            K.extend({
                cssHooks: {
                    opacity: {
                        get: function(t, e) {
                            if (e) {
                                var n = b(t, "opacity");
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
                    "float": "cssFloat"
                },
                style: function(t, e, n, r) {
                    if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                        var i, a, s, o = K.camelCase(e),
                            l = t.style;
                        return e = K.cssProps[o] || (K.cssProps[o] = T(l, o)), s = K.cssHooks[e] || K.cssHooks[o], void 0 === n ? s && "get" in s && void 0 !== (i = s.get(t, !1, r)) ? i : l[e] : (a = typeof n, "string" === a && (i = Ut.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(K.css(t, e)), a = "number"), null != n && n === n && ("number" !== a || K.cssNumber[o] || (n += "px"), Z.clearCloneStyle || "" !== n || 0 !== e.indexOf("background") || (l[e] = "inherit"), s && "set" in s && void 0 === (n = s.set(t, n, r)) || (l[e] = n)), void 0)
                    }
                },
                css: function(t, e, n, r) {
                    var i, a, s, o = K.camelCase(e);
                    return e = K.cssProps[o] || (K.cssProps[o] = T(t.style, o)), s = K.cssHooks[e] || K.cssHooks[o], s && "get" in s && (i = s.get(t, !0, n)), void 0 === i && (i = b(t, e, r)), "normal" === i && e in Wt && (i = Wt[e]), "" === n || n ? (a = parseFloat(i), n === !0 || K.isNumeric(a) ? a || 0 : i) : i
                }
            }), K.each(["height", "width"], function(t, e) {
                K.cssHooks[e] = {
                    get: function(t, n, r) {
                        return n ? Vt.test(K.css(t, "display")) && 0 === t.offsetWidth ? K.swap(t, Yt, function() {
                            return S(t, e, r)
                        }) : S(t, e, r) : void 0
                    },
                    set: function(t, n, r) {
                        var i = r && Ht(t);
                        return k(t, n, r ? C(t, e, r, "border-box" === K.css(t, "boxSizing", !1, i), i) : 0)
                    }
                }
            }), K.cssHooks.marginRight = w(Z.reliableMarginRight, function(t, e) {
                return e ? K.swap(t, {
                    display: "inline-block"
                }, b, [t, "marginRight"]) : void 0
            }), K.each({
                margin: "",
                padding: "",
                border: "Width"
            }, function(t, e) {
                K.cssHooks[t + e] = {
                    expand: function(n) {
                        for (var r = 0, i = {}, a = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++) i[t + wt[r] + e] = a[r] || a[r - 2] || a[0];
                        return i
                    }
                }, qt.test(t) || (K.cssHooks[t + e].set = k)
            }), K.fn.extend({
                css: function(t, e) {
                    return gt(this, function(t, e, n) {
                        var r, i, a = {},
                            s = 0;
                        if (K.isArray(e)) {
                            for (r = Ht(t), i = e.length; i > s; s++) a[e[s]] = K.css(t, e[s], !1, r);
                            return a
                        }
                        return void 0 !== n ? K.style(t, e, n) : K.css(t, e)
                    }, t, e, arguments.length > 1)
                },
                show: function() {
                    return P(this, !0)
                },
                hide: function() {
                    return P(this)
                },
                toggle: function(t) {
                    return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function() {
                        Tt(this) ? K(this).show() : K(this).hide()
                    })
                }
            }), K.Tween = A, A.prototype = {
                constructor: A,
                init: function(t, e, n, r, i, a) {
                    this.elem = t, this.prop = n, this.easing = i || "swing", this.options = e, this.start = this.now = this.cur(), this.end = r, this.unit = a || (K.cssNumber[n] ? "" : "px")
                },
                cur: function() {
                    var t = A.propHooks[this.prop];
                    return t && t.get ? t.get(this) : A.propHooks._default.get(this)
                },
                run: function(t) {
                    var e, n = A.propHooks[this.prop];
                    return this.options.duration ? this.pos = e = K.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : A.propHooks._default.set(this), this
                }
            }, A.prototype.init.prototype = A.prototype, A.propHooks = {
                _default: {
                    get: function(t) {
                        var e;
                        return null == t.elem[t.prop] || t.elem.style && null != t.elem.style[t.prop] ? (e = K.css(t.elem, t.prop, ""), e && "auto" !== e ? e : 0) : t.elem[t.prop]
                    },
                    set: function(t) {
                        K.fx.step[t.prop] ? K.fx.step[t.prop](t) : t.elem.style && (null != t.elem.style[K.cssProps[t.prop]] || K.cssHooks[t.prop]) ? K.style(t.elem, t.prop, t.now + t.unit) : t.elem[t.prop] = t.now
                    }
                }
            }, A.propHooks.scrollTop = A.propHooks.scrollLeft = {
                set: function(t) {
                    t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
                }
            }, K.easing = {
                linear: function(t) {
                    return t
                },
                swing: function(t) {
                    return .5 - Math.cos(t * Math.PI) / 2
                }
            }, K.fx = A.prototype.init, K.fx.step = {};
            var Zt, Qt, Jt = /^(?:toggle|show|hide)$/,
                Kt = new RegExp("^(?:([+-])=|)(" + bt + ")([a-z%]*)$", "i"),
                te = /queueHooks$/,
                ee = [N],
                ne = {
                    "*": [function(t, e) {
                        var n = this.createTween(t, e),
                            r = n.cur(),
                            i = Kt.exec(e),
                            a = i && i[3] || (K.cssNumber[t] ? "" : "px"),
                            s = (K.cssNumber[t] || "px" !== a && +r) && Kt.exec(K.css(n.elem, t)),
                            o = 1,
                            l = 20;
                        if (s && s[3] !== a) {
                            a = a || s[3], i = i || [], s = +r || 1;
                            do o = o || ".5", s /= o, K.style(n.elem, t, s + a); while (o !== (o = n.cur() / r) && 1 !== o && --l)
                        }
                        return i && (s = n.start = +s || +r || 0, n.unit = a, n.end = i[1] ? s + (i[1] + 1) * i[2] : +i[2]), n
                    }]
                };
            K.Animation = K.extend(D, {
                    tweener: function(t, e) {
                        K.isFunction(t) ? (e = t, t = ["*"]) : t = t.split(" ");
                        for (var n, r = 0, i = t.length; i > r; r++) n = t[r], ne[n] = ne[n] || [], ne[n].unshift(e)
                    },
                    prefilter: function(t, e) {
                        e ? ee.unshift(t) : ee.push(t)
                    }
                }), K.speed = function(t, e, n) {
                    var r = t && "object" == typeof t ? K.extend({}, t) : {
                        complete: n || !n && e || K.isFunction(t) && t,
                        duration: t,
                        easing: n && e || e && !K.isFunction(e) && e
                    };
                    return r.duration = K.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in K.fx.speeds ? K.fx.speeds[r.duration] : K.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function() {
                        K.isFunction(r.old) && r.old.call(this), r.queue && K.dequeue(this, r.queue)
                    }, r
                }, K.fn.extend({
                    fadeTo: function(t, e, n, r) {
                        return this.filter(Tt).css("opacity", 0).show().end().animate({
                            opacity: e
                        }, t, n, r)
                    },
                    animate: function(t, e, n, r) {
                        var i = K.isEmptyObject(t),
                            a = K.speed(e, n, r),
                            s = function() {
                                var e = D(this, K.extend({}, t), a);
                                (i || vt.get(this, "finish")) && e.stop(!0)
                            };
                        return s.finish = s, i || a.queue === !1 ? this.each(s) : this.queue(a.queue, s)
                    },
                    stop: function(t, e, n) {
                        var r = function(t) {
                            var e = t.stop;
                            delete t.stop, e(n)
                        };
                        return "string" != typeof t && (n = e, e = t, t = void 0), e && t !== !1 && this.queue(t || "fx", []), this.each(function() {
                            var e = !0,
                                i = null != t && t + "queueHooks",
                                a = K.timers,
                                s = vt.get(this);
                            if (i) s[i] && s[i].stop && r(s[i]);
                            else
                                for (i in s) s[i] && s[i].stop && te.test(i) && r(s[i]);
                            for (i = a.length; i--;) a[i].elem !== this || null != t && a[i].queue !== t || (a[i].anim.stop(n), e = !1, a.splice(i, 1));
                            (e || !n) && K.dequeue(this, t)
                        })
                    },
                    finish: function(t) {
                        return t !== !1 && (t = t || "fx"), this.each(function() {
                            var e, n = vt.get(this),
                                r = n[t + "queue"],
                                i = n[t + "queueHooks"],
                                a = K.timers,
                                s = r ? r.length : 0;
                            for (n.finish = !0, K.queue(this, t, []), i && i.stop && i.stop.call(this, !0), e = a.length; e--;) a[e].elem === this && a[e].queue === t && (a[e].anim.stop(!0), a.splice(e, 1));
                            for (e = 0; s > e; e++) r[e] && r[e].finish && r[e].finish.call(this);
                            delete n.finish
                        })
                    }
                }), K.each(["toggle", "show", "hide"], function(t, e) {
                    var n = K.fn[e];
                    K.fn[e] = function(t, r, i) {
                        return null == t || "boolean" == typeof t ? n.apply(this, arguments) : this.animate(j(e, !0), t, r, i)
                    }
                }), K.each({
                    slideDown: j("show"),
                    slideUp: j("hide"),
                    slideToggle: j("toggle"),
                    fadeIn: {
                        opacity: "show"
                    },
                    fadeOut: {
                        opacity: "hide"
                    },
                    fadeToggle: {
                        opacity: "toggle"
                    }
                }, function(t, e) {
                    K.fn[t] = function(t, n, r) {
                        return this.animate(e, t, n, r)
                    }
                }), K.timers = [], K.fx.tick = function() {
                    var t, e = 0,
                        n = K.timers;
                    for (Zt = K.now(); e < n.length; e++) t = n[e], t() || n[e] !== t || n.splice(e--, 1);
                    n.length || K.fx.stop(), Zt = void 0
                }, K.fx.timer = function(t) {
                    K.timers.push(t), t() ? K.fx.start() : K.timers.pop()
                }, K.fx.interval = 13, K.fx.start = function() {
                    Qt || (Qt = setInterval(K.fx.tick, K.fx.interval))
                }, K.fx.stop = function() {
                    clearInterval(Qt), Qt = null
                }, K.fx.speeds = {
                    slow: 600,
                    fast: 200,
                    _default: 400
                }, K.fn.delay = function(t, e) {
                    return t = K.fx ? K.fx.speeds[t] || t : t, e = e || "fx", this.queue(e, function(e, n) {
                        var r = setTimeout(e, t);
                        n.stop = function() {
                            clearTimeout(r)
                        }
                    })
                },
                function() {
                    var t = Q.createElement("input"),
                        e = Q.createElement("select"),
                        n = e.appendChild(Q.createElement("option"));
                    t.type = "checkbox", Z.checkOn = "" !== t.value, Z.optSelected = n.selected, e.disabled = !0, Z.optDisabled = !n.disabled, t = Q.createElement("input"), t.value = "t", t.type = "radio", Z.radioValue = "t" === t.value
                }();
            var re, ie, ae = K.expr.attrHandle;
            K.fn.extend({
                attr: function(t, e) {
                    return gt(this, K.attr, t, e, arguments.length > 1)
                },
                removeAttr: function(t) {
                    return this.each(function() {
                        K.removeAttr(this, t)
                    })
                }
            }), K.extend({
                attr: function(t, e, n) {
                    var r, i, a = t.nodeType;
                    if (t && 3 !== a && 8 !== a && 2 !== a) return typeof t.getAttribute === Ct ? K.prop(t, e, n) : (1 === a && K.isXMLDoc(t) || (e = e.toLowerCase(), r = K.attrHooks[e] || (K.expr.match.bool.test(e) ? ie : re)), void 0 === n ? r && "get" in r && null !== (i = r.get(t, e)) ? i : (i = K.find.attr(t, e), null == i ? void 0 : i) : null !== n ? r && "set" in r && void 0 !== (i = r.set(t, n, e)) ? i : (t.setAttribute(e, n + ""), n) : void K.removeAttr(t, e))
                },
                removeAttr: function(t, e) {
                    var n, r, i = 0,
                        a = e && e.match(pt);
                    if (a && 1 === t.nodeType)
                        for (; n = a[i++];) r = K.propFix[n] || n, K.expr.match.bool.test(n) && (t[r] = !1), t.removeAttribute(n)
                },
                attrHooks: {
                    type: {
                        set: function(t, e) {
                            if (!Z.radioValue && "radio" === e && K.nodeName(t, "input")) {
                                var n = t.value;
                                return t.setAttribute("type", e), n && (t.value = n), e
                            }
                        }
                    }
                }
            }), ie = {
                set: function(t, e, n) {
                    return e === !1 ? K.removeAttr(t, n) : t.setAttribute(n, n), n
                }
            }, K.each(K.expr.match.bool.source.match(/\w+/g), function(t, e) {
                var n = ae[e] || K.find.attr;
                ae[e] = function(t, e, r) {
                    var i, a;
                    return r || (a = ae[e], ae[e] = i, i = null != n(t, e, r) ? e.toLowerCase() : null, ae[e] = a), i
                }
            });
            var se = /^(?:input|select|textarea|button)$/i;
            K.fn.extend({
                prop: function(t, e) {
                    return gt(this, K.prop, t, e, arguments.length > 1)
                },
                removeProp: function(t) {
                    return this.each(function() {
                        delete this[K.propFix[t] || t]
                    })
                }
            }), K.extend({
                propFix: {
                    "for": "htmlFor",
                    "class": "className"
                },
                prop: function(t, e, n) {
                    var r, i, a, s = t.nodeType;
                    if (t && 3 !== s && 8 !== s && 2 !== s) return a = 1 !== s || !K.isXMLDoc(t), a && (e = K.propFix[e] || e, i = K.propHooks[e]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(t, n, e)) ? r : t[e] = n : i && "get" in i && null !== (r = i.get(t, e)) ? r : t[e]
                },
                propHooks: {
                    tabIndex: {
                        get: function(t) {
                            return t.hasAttribute("tabindex") || se.test(t.nodeName) || t.href ? t.tabIndex : -1
                        }
                    }
                }
            }), Z.optSelected || (K.propHooks.selected = {
                get: function(t) {
                    var e = t.parentNode;
                    return e && e.parentNode && e.parentNode.selectedIndex, null
                }
            }), K.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
                K.propFix[this.toLowerCase()] = this
            });
            var oe = /[\t\r\n\f]/g;
            K.fn.extend({
                addClass: function(t) {
                    var e, n, r, i, a, s, o = "string" == typeof t && t,
                        l = 0,
                        u = this.length;
                    if (K.isFunction(t)) return this.each(function(e) {
                        K(this).addClass(t.call(this, e, this.className))
                    });
                    if (o)
                        for (e = (t || "").match(pt) || []; u > l; l++)
                            if (n = this[l], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(oe, " ") : " ")) {
                                for (a = 0; i = e[a++];) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                                s = K.trim(r), n.className !== s && (n.className = s)
                            }
                    return this
                },
                removeClass: function(t) {
                    var e, n, r, i, a, s, o = 0 === arguments.length || "string" == typeof t && t,
                        l = 0,
                        u = this.length;
                    if (K.isFunction(t)) return this.each(function(e) {
                        K(this).removeClass(t.call(this, e, this.className))
                    });
                    if (o)
                        for (e = (t || "").match(pt) || []; u > l; l++)
                            if (n = this[l], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(oe, " ") : "")) {
                                for (a = 0; i = e[a++];)
                                    for (; r.indexOf(" " + i + " ") >= 0;) r = r.replace(" " + i + " ", " ");
                                s = t ? K.trim(r) : "", n.className !== s && (n.className = s)
                            }
                    return this
                },
                toggleClass: function(t, e) {
                    var n = typeof t;
                    return "boolean" == typeof e && "string" === n ? e ? this.addClass(t) : this.removeClass(t) : K.isFunction(t) ? this.each(function(n) {
                        K(this).toggleClass(t.call(this, n, this.className, e), e)
                    }) : this.each(function() {
                        if ("string" === n)
                            for (var e, r = 0, i = K(this), a = t.match(pt) || []; e = a[r++];) i.hasClass(e) ? i.removeClass(e) : i.addClass(e);
                        else(n === Ct || "boolean" === n) && (this.className && vt.set(this, "__className__", this.className), this.className = this.className || t === !1 ? "" : vt.get(this, "__className__") || "")
                    })
                },
                hasClass: function(t) {
                    for (var e = " " + t + " ", n = 0, r = this.length; r > n; n++)
                        if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(oe, " ").indexOf(e) >= 0) return !0;
                    return !1
                }
            });
            var le = /\r/g;
            K.fn.extend({
                val: function(t) {
                    var e, n, r, i = this[0]; {
                        if (arguments.length) return r = K.isFunction(t), this.each(function(n) {
                            var i;
                            1 === this.nodeType && (i = r ? t.call(this, n, K(this).val()) : t, null == i ? i = "" : "number" == typeof i ? i += "" : K.isArray(i) && (i = K.map(i, function(t) {
                                return null == t ? "" : t + ""
                            })), e = K.valHooks[this.type] || K.valHooks[this.nodeName.toLowerCase()], e && "set" in e && void 0 !== e.set(this, i, "value") || (this.value = i))
                        });
                        if (i) return e = K.valHooks[i.type] || K.valHooks[i.nodeName.toLowerCase()], e && "get" in e && void 0 !== (n = e.get(i, "value")) ? n : (n = i.value, "string" == typeof n ? n.replace(le, "") : null == n ? "" : n)
                    }
                }
            }), K.extend({
                valHooks: {
                    option: {
                        get: function(t) {
                            var e = K.find.attr(t, "value");
                            return null != e ? e : K.trim(K.text(t))
                        }
                    },
                    select: {
                        get: function(t) {
                            for (var e, n, r = t.options, i = t.selectedIndex, a = "select-one" === t.type || 0 > i, s = a ? null : [], o = a ? i + 1 : r.length, l = 0 > i ? o : a ? i : 0; o > l; l++)
                                if (n = r[l], (n.selected || l === i) && (Z.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !K.nodeName(n.parentNode, "optgroup"))) {
                                    if (e = K(n).val(), a) return e;
                                    s.push(e)
                                }
                            return s
                        },
                        set: function(t, e) {
                            for (var n, r, i = t.options, a = K.makeArray(e), s = i.length; s--;) r = i[s], (r.selected = K.inArray(r.value, a) >= 0) && (n = !0);
                            return n || (t.selectedIndex = -1), a
                        }
                    }
                }
            }), K.each(["radio", "checkbox"], function() {
                K.valHooks[this] = {
                    set: function(t, e) {
                        return K.isArray(e) ? t.checked = K.inArray(K(t).val(), e) >= 0 : void 0
                    }
                }, Z.checkOn || (K.valHooks[this].get = function(t) {
                    return null === t.getAttribute("value") ? "on" : t.value
                })
            }), K.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(t, e) {
                K.fn[e] = function(t, n) {
                    return arguments.length > 0 ? this.on(e, null, t, n) : this.trigger(e)
                }
            }), K.fn.extend({
                hover: function(t, e) {
                    return this.mouseenter(t).mouseleave(e || t)
                },
                bind: function(t, e, n) {
                    return this.on(t, null, e, n)
                },
                unbind: function(t, e) {
                    return this.off(t, null, e)
                },
                delegate: function(t, e, n, r) {
                    return this.on(e, t, n, r)
                },
                undelegate: function(t, e, n) {
                    return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", n)
                }
            });
            var ue = K.now(),
                ce = /\?/;
            K.parseJSON = function(t) {
                return JSON.parse(t + "")
            }, K.parseXML = function(t) {
                var e, n;
                if (!t || "string" != typeof t) return null;
                try {
                    n = new DOMParser, e = n.parseFromString(t, "text/xml")
                } catch (r) {
                    e = void 0
                }
                return (!e || e.getElementsByTagName("parsererror").length) && K.error("Invalid XML: " + t), e
            };
            var he = /#.*$/,
                fe = /([?&])_=[^&]*/,
                pe = /^(.*?):[ \t]*([^\r\n]*)$/gm,
                de = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
                me = /^(?:GET|HEAD)$/,
                ge = /^\/\//,
                ve = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
                ye = {},
                _e = {},
                xe = "*/".concat("*"),
                be = t.location.href,
                we = ve.exec(be.toLowerCase()) || [];
            K.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: be,
                    type: "GET",
                    isLocal: de.test(we[1]),
                    global: !0,
                    processData: !0,
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: {
                        "*": xe,
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
                        "text json": K.parseJSON,
                        "text xml": K.parseXML
                    },
                    flatOptions: {
                        url: !0,
                        context: !0
                    }
                },
                ajaxSetup: function(t, e) {
                    return e ? I(I(t, K.ajaxSettings), e) : I(K.ajaxSettings, t)
                },
                ajaxPrefilter: E(ye),
                ajaxTransport: E(_e),
                ajax: function(t, e) {
                    function n(t, e, n, s) {
                        var l, c, v, y, x, w = e;
                        2 !== _ && (_ = 2, o && clearTimeout(o), r = void 0, a = s || "", b.readyState = t > 0 ? 4 : 0, l = t >= 200 && 300 > t || 304 === t, n && (y = L(h, b, n)), y = z(h, y, b, l), l ? (h.ifModified && (x = b.getResponseHeader("Last-Modified"), x && (K.lastModified[i] = x), x = b.getResponseHeader("etag"), x && (K.etag[i] = x)), 204 === t || "HEAD" === h.type ? w = "nocontent" : 304 === t ? w = "notmodified" : (w = y.state, c = y.data, v = y.error, l = !v)) : (v = w, (t || !w) && (w = "error", 0 > t && (t = 0))), b.status = t, b.statusText = (e || w) + "", l ? d.resolveWith(f, [c, w, b]) : d.rejectWith(f, [b, w, v]), b.statusCode(g), g = void 0, u && p.trigger(l ? "ajaxSuccess" : "ajaxError", [b, h, l ? c : v]), m.fireWith(f, [b, w]), u && (p.trigger("ajaxComplete", [b, h]), --K.active || K.event.trigger("ajaxStop")))
                    }
                    "object" == typeof t && (e = t, t = void 0), e = e || {};
                    var r, i, a, s, o, l, u, c, h = K.ajaxSetup({}, e),
                        f = h.context || h,
                        p = h.context && (f.nodeType || f.jquery) ? K(f) : K.event,
                        d = K.Deferred(),
                        m = K.Callbacks("once memory"),
                        g = h.statusCode || {},
                        v = {},
                        y = {},
                        _ = 0,
                        x = "canceled",
                        b = {
                            readyState: 0,
                            getResponseHeader: function(t) {
                                var e;
                                if (2 === _) {
                                    if (!s)
                                        for (s = {}; e = pe.exec(a);) s[e[1].toLowerCase()] = e[2];
                                    e = s[t.toLowerCase()]
                                }
                                return null == e ? null : e
                            },
                            getAllResponseHeaders: function() {
                                return 2 === _ ? a : null
                            },
                            setRequestHeader: function(t, e) {
                                var n = t.toLowerCase();
                                return _ || (t = y[n] = y[n] || t, v[t] = e), this
                            },
                            overrideMimeType: function(t) {
                                return _ || (h.mimeType = t), this
                            },
                            statusCode: function(t) {
                                var e;
                                if (t)
                                    if (2 > _)
                                        for (e in t) g[e] = [g[e], t[e]];
                                    else b.always(t[b.status]);
                                return this
                            },
                            abort: function(t) {
                                var e = t || x;
                                return r && r.abort(e), n(0, e), this
                            }
                        };
                    if (d.promise(b).complete = m.add, b.success = b.done, b.error = b.fail, h.url = ((t || h.url || be) + "").replace(he, "").replace(ge, we[1] + "//"), h.type = e.method || e.type || h.method || h.type, h.dataTypes = K.trim(h.dataType || "*").toLowerCase().match(pt) || [""], null == h.crossDomain && (l = ve.exec(h.url.toLowerCase()), h.crossDomain = !(!l || l[1] === we[1] && l[2] === we[2] && (l[3] || ("http:" === l[1] ? "80" : "443")) === (we[3] || ("http:" === we[1] ? "80" : "443")))), h.data && h.processData && "string" != typeof h.data && (h.data = K.param(h.data, h.traditional)), F(ye, h, e, b), 2 === _) return b;
                    u = K.event && h.global, u && 0 === K.active++ && K.event.trigger("ajaxStart"), h.type = h.type.toUpperCase(), h.hasContent = !me.test(h.type), i = h.url, h.hasContent || (h.data && (i = h.url += (ce.test(i) ? "&" : "?") + h.data, delete h.data), h.cache === !1 && (h.url = fe.test(i) ? i.replace(fe, "$1_=" + ue++) : i + (ce.test(i) ? "&" : "?") + "_=" + ue++)), h.ifModified && (K.lastModified[i] && b.setRequestHeader("If-Modified-Since", K.lastModified[i]), K.etag[i] && b.setRequestHeader("If-None-Match", K.etag[i])), (h.data && h.hasContent && h.contentType !== !1 || e.contentType) && b.setRequestHeader("Content-Type", h.contentType), b.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + xe + "; q=0.01" : "") : h.accepts["*"]);
                    for (c in h.headers) b.setRequestHeader(c, h.headers[c]);
                    if (h.beforeSend && (h.beforeSend.call(f, b, h) === !1 || 2 === _)) return b.abort();
                    x = "abort";
                    for (c in {
                            success: 1,
                            error: 1,
                            complete: 1
                        }) b[c](h[c]);
                    if (r = F(_e, h, e, b)) {
                        b.readyState = 1, u && p.trigger("ajaxSend", [b, h]), h.async && h.timeout > 0 && (o = setTimeout(function() {
                            b.abort("timeout")
                        }, h.timeout));
                        try {
                            _ = 1, r.send(v, n)
                        } catch (w) {
                            if (!(2 > _)) throw w;
                            n(-1, w)
                        }
                    } else n(-1, "No Transport");
                    return b
                },
                getJSON: function(t, e, n) {
                    return K.get(t, e, n, "json")
                },
                getScript: function(t, e) {
                    return K.get(t, void 0, e, "script")
                }
            }), K.each(["get", "post"], function(t, e) {
                K[e] = function(t, n, r, i) {
                    return K.isFunction(n) && (i = i || r, r = n, n = void 0), K.ajax({
                        url: t,
                        type: e,
                        dataType: i,
                        data: n,
                        success: r
                    })
                }
            }), K._evalUrl = function(t) {
                return K.ajax({
                    url: t,
                    type: "GET",
                    dataType: "script",
                    async: !1,
                    global: !1,
                    "throws": !0
                })
            }, K.fn.extend({
                wrapAll: function(t) {
                    var e;
                    return K.isFunction(t) ? this.each(function(e) {
                        K(this).wrapAll(t.call(this, e))
                    }) : (this[0] && (e = K(t, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
                        for (var t = this; t.firstElementChild;) t = t.firstElementChild;
                        return t
                    }).append(this)), this)
                },
                wrapInner: function(t) {
                    return K.isFunction(t) ? this.each(function(e) {
                        K(this).wrapInner(t.call(this, e))
                    }) : this.each(function() {
                        var e = K(this),
                            n = e.contents();
                        n.length ? n.wrapAll(t) : e.append(t)
                    })
                },
                wrap: function(t) {
                    var e = K.isFunction(t);
                    return this.each(function(n) {
                        K(this).wrapAll(e ? t.call(this, n) : t)
                    })
                },
                unwrap: function() {
                    return this.parent().each(function() {
                        K.nodeName(this, "body") || K(this).replaceWith(this.childNodes)
                    }).end()
                }
            }), K.expr.filters.hidden = function(t) {
                return t.offsetWidth <= 0 && t.offsetHeight <= 0
            }, K.expr.filters.visible = function(t) {
                return !K.expr.filters.hidden(t)
            };
            var Te = /%20/g,
                ke = /\[\]$/,
                Ce = /\r?\n/g,
                Se = /^(?:submit|button|image|reset|file)$/i,
                Pe = /^(?:input|select|textarea|keygen)/i;
            K.param = function(t, e) {
                var n, r = [],
                    i = function(t, e) {
                        e = K.isFunction(e) ? e() : null == e ? "" : e, r[r.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
                    };
                if (void 0 === e && (e = K.ajaxSettings && K.ajaxSettings.traditional), K.isArray(t) || t.jquery && !K.isPlainObject(t)) K.each(t, function() {
                    i(this.name, this.value)
                });
                else
                    for (n in t) B(n, t[n], e, i);
                return r.join("&").replace(Te, "+")
            }, K.fn.extend({
                serialize: function() {
                    return K.param(this.serializeArray())
                },
                serializeArray: function() {
                    return this.map(function() {
                        var t = K.prop(this, "elements");
                        return t ? K.makeArray(t) : this
                    }).filter(function() {
                        var t = this.type;
                        return this.name && !K(this).is(":disabled") && Pe.test(this.nodeName) && !Se.test(t) && (this.checked || !kt.test(t))
                    }).map(function(t, e) {
                        var n = K(this).val();
                        return null == n ? null : K.isArray(n) ? K.map(n, function(t) {
                            return {
                                name: e.name,
                                value: t.replace(Ce, "\r\n")
                            }
                        }) : {
                            name: e.name,
                            value: n.replace(Ce, "\r\n")
                        }
                    }).get()
                }
            }), K.ajaxSettings.xhr = function() {
                try {
                    return new XMLHttpRequest
                } catch (t) {}
            };
            var Ae = 0,
                Oe = {},
                je = {
                    0: 200,
                    1223: 204
                },
                Me = K.ajaxSettings.xhr();
            t.attachEvent && t.attachEvent("onunload", function() {
                for (var t in Oe) Oe[t]()
            }), Z.cors = !!Me && "withCredentials" in Me, Z.ajax = Me = !!Me, K.ajaxTransport(function(t) {
                var e;
                return Z.cors || Me && !t.crossDomain ? {
                    send: function(n, r) {
                        var i, a = t.xhr(),
                            s = ++Ae;
                        if (a.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                            for (i in t.xhrFields) a[i] = t.xhrFields[i];
                        t.mimeType && a.overrideMimeType && a.overrideMimeType(t.mimeType), t.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                        for (i in n) a.setRequestHeader(i, n[i]);
                        e = function(t) {
                            return function() {
                                e && (delete Oe[s], e = a.onload = a.onerror = null, "abort" === t ? a.abort() : "error" === t ? r(a.status, a.statusText) : r(je[a.status] || a.status, a.statusText, "string" == typeof a.responseText ? {
                                    text: a.responseText
                                } : void 0, a.getAllResponseHeaders()))
                            }
                        }, a.onload = e(), a.onerror = e("error"), e = Oe[s] = e("abort");
                        try {
                            a.send(t.hasContent && t.data || null)
                        } catch (o) {
                            if (e) throw o
                        }
                    },
                    abort: function() {
                        e && e()
                    }
                } : void 0
            }), K.ajaxSetup({
                accepts: {
                    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                },
                contents: {
                    script: /(?:java|ecma)script/
                },
                converters: {
                    "text script": function(t) {
                        return K.globalEval(t), t
                    }
                }
            }), K.ajaxPrefilter("script", function(t) {
                void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET")
            }), K.ajaxTransport("script", function(t) {
                if (t.crossDomain) {
                    var e, n;
                    return {
                        send: function(r, i) {
                            e = K("<script>").prop({
                                async: !0,
                                charset: t.scriptCharset,
                                src: t.url
                            }).on("load error", n = function(t) {
                                e.remove(), n = null, t && i("error" === t.type ? 404 : 200, t.type)
                            }), Q.head.appendChild(e[0])
                        },
                        abort: function() {
                            n && n()
                        }
                    }
                }
            });
            var Ne = [],
                Re = /(=)\?(?=&|$)|\?\?/;
            K.ajaxSetup({
                jsonp: "callback",
                jsonpCallback: function() {
                    var t = Ne.pop() || K.expando + "_" + ue++;
                    return this[t] = !0, t
                }
            }), K.ajaxPrefilter("json jsonp", function(e, n, r) {
                var i, a, s, o = e.jsonp !== !1 && (Re.test(e.url) ? "url" : "string" == typeof e.data && !(e.contentType || "").indexOf("application/x-www-form-urlencoded") && Re.test(e.data) && "data");
                return o || "jsonp" === e.dataTypes[0] ? (i = e.jsonpCallback = K.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, o ? e[o] = e[o].replace(Re, "$1" + i) : e.jsonp !== !1 && (e.url += (ce.test(e.url) ? "&" : "?") + e.jsonp + "=" + i), e.converters["script json"] = function() {
                    return s || K.error(i + " was not called"), s[0]
                }, e.dataTypes[0] = "json", a = t[i], t[i] = function() {
                    s = arguments
                }, r.always(function() {
                    t[i] = a, e[i] && (e.jsonpCallback = n.jsonpCallback, Ne.push(i)), s && K.isFunction(a) && a(s[0]), s = a = void 0
                }), "script") : void 0
            }), K.parseHTML = function(t, e, n) {
                if (!t || "string" != typeof t) return null;
                "boolean" == typeof e && (n = e, e = !1), e = e || Q;
                var r = st.exec(t),
                    i = !n && [];
                return r ? [e.createElement(r[1])] : (r = K.buildFragment([t], e, i), i && i.length && K(i).remove(), K.merge([], r.childNodes))
            };
            var De = K.fn.load;
            K.fn.load = function(t, e, n) {
                if ("string" != typeof t && De) return De.apply(this, arguments);
                var r, i, a, s = this,
                    o = t.indexOf(" ");
                return o >= 0 && (r = K.trim(t.slice(o)), t = t.slice(0, o)), K.isFunction(e) ? (n = e, e = void 0) : e && "object" == typeof e && (i = "POST"), s.length > 0 && K.ajax({
                    url: t,
                    type: i,
                    dataType: "html",
                    data: e
                }).done(function(t) {
                    a = arguments, s.html(r ? K("<div>").append(K.parseHTML(t)).find(r) : t)
                }).complete(n && function(t, e) {
                    s.each(n, a || [t.responseText, e, t])
                }), this
            }, K.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(t, e) {
                K.fn[e] = function(t) {
                    return this.on(e, t)
                }
            }), K.expr.filters.animated = function(t) {
                return K.grep(K.timers, function(e) {
                    return t === e.elem
                }).length
            };
            var Ee = t.document.documentElement;
            K.offset = {
                setOffset: function(t, e, n) {
                    var r, i, a, s, o, l, u, c = K.css(t, "position"),
                        h = K(t),
                        f = {};
                    "static" === c && (t.style.position = "relative"), o = h.offset(), a = K.css(t, "top"), l = K.css(t, "left"), u = ("absolute" === c || "fixed" === c) && (a + l).indexOf("auto") > -1, u ? (r = h.position(), s = r.top, i = r.left) : (s = parseFloat(a) || 0, i = parseFloat(l) || 0), K.isFunction(e) && (e = e.call(t, n, o)), null != e.top && (f.top = e.top - o.top + s), null != e.left && (f.left = e.left - o.left + i), "using" in e ? e.using.call(t, f) : h.css(f)
                }
            }, K.fn.extend({
                offset: function(t) {
                    if (arguments.length) return void 0 === t ? this : this.each(function(e) {
                        K.offset.setOffset(this, t, e)
                    });
                    var e, n, r = this[0],
                        i = {
                            top: 0,
                            left: 0
                        },
                        a = r && r.ownerDocument;
                    if (a) return e = a.documentElement, K.contains(e, r) ? (typeof r.getBoundingClientRect !== Ct && (i = r.getBoundingClientRect()), n = q(a), {
                        top: i.top + n.pageYOffset - e.clientTop,
                        left: i.left + n.pageXOffset - e.clientLeft
                    }) : i
                },
                position: function() {
                    if (this[0]) {
                        var t, e, n = this[0],
                            r = {
                                top: 0,
                                left: 0
                            };
                        return "fixed" === K.css(n, "position") ? e = n.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), K.nodeName(t[0], "html") || (r = t.offset()), r.top += K.css(t[0], "borderTopWidth", !0), r.left += K.css(t[0], "borderLeftWidth", !0)), {
                            top: e.top - r.top - K.css(n, "marginTop", !0),
                            left: e.left - r.left - K.css(n, "marginLeft", !0)
                        }
                    }
                },
                offsetParent: function() {
                    return this.map(function() {
                        for (var t = this.offsetParent || Ee; t && !K.nodeName(t, "html") && "static" === K.css(t, "position");) t = t.offsetParent;
                        return t || Ee
                    })
                }
            }), K.each({
                scrollLeft: "pageXOffset",
                scrollTop: "pageYOffset"
            }, function(e, n) {
                var r = "pageYOffset" === n;
                K.fn[e] = function(i) {
                    return gt(this, function(e, i, a) {
                        var s = q(e);
                        return void 0 === a ? s ? s[n] : e[i] : void(s ? s.scrollTo(r ? t.pageXOffset : a, r ? a : t.pageYOffset) : e[i] = a)
                    }, e, i, arguments.length, null)
                }
            }), K.each(["top", "left"], function(t, e) {
                K.cssHooks[e] = w(Z.pixelPosition, function(t, n) {
                    return n ? (n = b(t, e), Xt.test(n) ? K(t).position()[e] + "px" : n) : void 0
                })
            }), K.each({
                Height: "height",
                Width: "width"
            }, function(t, e) {
                K.each({
                    padding: "inner" + t,
                    content: e,
                    "": "outer" + t
                }, function(n, r) {
                    K.fn[r] = function(r, i) {
                        var a = arguments.length && (n || "boolean" != typeof r),
                            s = n || (r === !0 || i === !0 ? "margin" : "border");
                        return gt(this, function(e, n, r) {
                            var i;
                            return K.isWindow(e) ? e.document.documentElement["client" + t] : 9 === e.nodeType ? (i = e.documentElement, Math.max(e.body["scroll" + t], i["scroll" + t], e.body["offset" + t], i["offset" + t], i["client" + t])) : void 0 === r ? K.css(e, n, s) : K.style(e, n, r, s)
                        }, e, a ? r : void 0, a, null)
                    }
                })
            }), K.fn.size = function() {
                return this.length
            }, K.fn.andSelf = K.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
                return K
            });
            var Fe = t.jQuery,
                Ie = t.$;
            return K.noConflict = function(e) {
                return t.$ === K && (t.$ = Ie), e && t.jQuery === K && (t.jQuery = Fe), K
            }, typeof e === Ct && (t.jQuery = t.$ = K), K
        })
    }, {}]
}, {}, [1]);