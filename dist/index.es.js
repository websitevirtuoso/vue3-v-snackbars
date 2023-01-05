(function(){"use strict";try{if(typeof document!="undefined"){var t=document.createElement("style");t.appendChild(document.createTextNode(".vue-notification-group{position:fixed}.vue-notification-group .vue-notification-wrapper .v-snackbar:not(.v-snackbar--absolute){position:inherit!important;height:inherit!important}.vue-notification-group .vue-notification-wrapper .v-overlay__content{position:relative}.v-fade-enter-active,.v-fade-move{transition:all .5s}.v-fade-enter-from,.v-fade-leave-to{opacity:0}@media (max-width: 575.98px){.vue-notification-group{left:inherit!important;width:100%!important}}")),document.head.appendChild(t)}}catch(e){console.error("vite-plugin-css-injected-by-js",e)}})();
import { defineComponent as w, resolveComponent as _, openBlock as f, createElementBlock as h, normalizeStyle as x, createVNode as m, TransitionGroup as D, withCtx as l, Fragment as k, renderList as E, mergeProps as B, createSlots as I, createElementVNode as $, createTextVNode as C } from "vue";
function N(t) {
  return { all: t = t || /* @__PURE__ */ new Map(), on: function(e, i) {
    var o = t.get(e);
    o ? o.push(i) : t.set(e, [i]);
  }, off: function(e, i) {
    var o = t.get(e);
    o && (i ? o.splice(o.indexOf(i) >>> 0, 1) : t.set(e, []));
  }, emit: function(e, i) {
    var o = t.get(e);
    o && o.slice().map(function(s) {
      s(i);
    }), (o = t.get("*")) && o.slice().map(function(s) {
      s(e, i);
    });
  } };
}
const r = N(), d = { IDLE: 0, DESTROYED: 2 }, b = (t) => (typeof t == "string" && (t = { title: t }), typeof t == "object" && r.emit("add", t), {
  success: (e, i) => {
    r.emit("add", { ...i, color: "success", title: e });
  },
  info(e, i) {
    r.emit("add", { ...i, color: "info", title: e });
  },
  error(e, i) {
    r.emit("add", { ...i, color: "error", title: e });
  }
});
b.close = (t) => {
  r.emit("close", t);
};
const T = {
  x: ["left", "center", "right"],
  y: ["top", "bottom"]
}, O = ((t) => () => t++)(0), S = (t) => t.split(/\s+/gi).filter((e) => e), A = (t) => {
  const e = S(t);
  let i = "", o = "";
  return e.forEach((s) => {
    T.y.indexOf(s) !== -1 && (o = s), T.x.indexOf(s) !== -1 && (i = s);
  }), { x: i, y: o };
};
class L {
  constructor(e, i, o) {
    this.remaining = i, this.callback = e, this.notifyItem = o, this.resume();
  }
  resume() {
    this.start = Date.now(), clearTimeout(this.notifyItem.timer), this.notifyItem.timer = setTimeout(this.callback, this.remaining);
  }
}
const P = w({
  name: "Notifications",
  inheritAttrs: !1,
  props: {
    reverseDirection: {
      type: Boolean,
      default: !0
    },
    max: {
      type: Number,
      default: 1 / 0
    },
    // next prop can have next values
    // top left, top center, top right
    // bottom left, bottom center, bottom right
    location: {
      type: String,
      default: "bottom center"
    },
    color: {
      type: String,
      default: "success"
    },
    timeout: {
      type: Number,
      default: 5e3
    },
    showCloseButton: {
      type: Boolean,
      default: !0
    },
    ignoreDuplicates: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["click", "destroy"],
  data() {
    return {
      list: []
    };
  },
  computed: {
    active() {
      return this.list.filter((t) => t.state !== d.DESTROYED);
    },
    maxWidth() {
      return this.active.length === 0 ? 0 : this.active.reduce((t, e) => t.width > e.width ? t : e).width;
    },
    styles() {
      const { x: t, y: e } = A(this.location), i = this.maxWidth, o = {
        width: `${i}px`
      };
      return e && (o[e] = "0px"), t && (t === "center" ? o.left = `calc(50% - ${+i / 2}px)` : o[t] = "0px"), o;
    },
    botToTop() {
      return this.styles.hasOwnProperty("bottom");
    }
  },
  mounted() {
    r.on("add", this.addItem), r.on("close", this.closeItem);
  },
  methods: {
    addItem(t = {}) {
      if (t.clean || t.clear) {
        this.destroyAll();
        return;
      }
      const e = t.timeout ? t.timeout : this.timeout, i = t.ignoreDuplicates ? t.ignoreDuplicates : this.ignoreDuplicates, o = t.hasOwnProperty("showCloseButton") ? t.showCloseButton : this.showCloseButton, s = t.hasOwnProperty("color") ? t.color : this.color, { title: p, id: u } = t, c = {
        id: u || O(),
        title: p,
        color: s,
        timeout: e,
        width: 0,
        showCloseButton: o,
        state: d.IDLE
      };
      e >= 0 && new L(() => this.destroy(c), e, c);
      let n = -1;
      const y = this.active.some((a) => a.title === t.title);
      if (!(i ? !y : !0))
        return;
      (this.reverseDirection ? !this.botToTop : this.botToTop) ? (this.list.push(c), this.active.length > this.max && (n = 0)) : (this.list.unshift(c), this.active.length > this.max && (n = this.active.length - 1)), this.$nextTick(() => {
        const a = document.querySelector(`.v-snackbars-${c.id} .v-snackbar__wrapper`), v = this.list.find((g) => g.id === c.id);
        a && a.clientWidth > 0 && v && (v.width = a.clientWidth);
      }), n !== -1 && this.destroy(this.active[n]);
    },
    closeItem(t) {
      this.destroyById(t);
    },
    destroy(t) {
      clearTimeout(t.timer), t.state = d.DESTROYED, this.clean(), this.$emit("destroy", t);
    },
    destroyAll() {
      this.active.forEach(this.destroy);
    },
    destroyById(t) {
      const e = this.list.find((i) => i.id === t);
      e && this.destroy(e);
    },
    clean() {
      this.list = this.list.filter((t) => t.state !== d.DESTROYED);
    }
  }
});
const W = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [o, s] of e)
    i[o] = s;
  return i;
}, M = ["data-id"], R = ["innerHTML"];
function Y(t, e, i, o, s, p) {
  const u = _("v-btn"), c = _("v-snackbar");
  return f(), h("div", {
    class: "vue-notification-group",
    style: x(t.styles)
  }, [
    m(D, {
      tag: "span",
      name: "v-fade",
      onAfterLeave: t.clean
    }, {
      default: l(() => [
        (f(!0), h(k, null, E(t.active, (n) => (f(), h("div", {
          key: n.id,
          "data-id": n.id,
          class: "vue-notification-wrapper"
        }, [
          m(c, B(t.$attrs, {
            timeout: n.timeout,
            location: t.location,
            class: `v-snackbars v-snackbars-${n.id}`,
            color: n.color,
            "model-value": !0,
            "data-test": "notification",
            contained: ""
          }), I({
            default: l(() => [
              $("span", {
                innerHTML: n.title
              }, null, 8, R)
            ]),
            _: 2
          }, [
            n.showCloseButton ? {
              name: "actions",
              fn: l(() => [
                m(u, {
                  color: "black",
                  class: "close",
                  text: "",
                  onClick: (y) => t.destroy(n)
                }, {
                  default: l(() => [
                    C(" Close ")
                  ]),
                  _: 2
                }, 1032, ["onClick"])
              ]),
              key: "0"
            } : void 0
          ]), 1040, ["timeout", "location", "class", "color"])
        ], 8, M))), 128))
      ]),
      _: 1
    }, 8, ["onAfterLeave"])
  ], 4);
}
const V = /* @__PURE__ */ W(P, [["render", Y]]);
function j(t, e = {}) {
  Object.entries(e).forEach((o) => (/* @__PURE__ */ new Map()).set(...o));
  const i = e.name || "notify";
  t.config.globalProperties["$" + i] = b, t.component(e.componentName || "vNotifications", V);
}
const F = {
  install: j
};
export {
  F as default,
  b as useNotification
};
