//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  name: "hacktiv-footer"
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  _vm._self._c || _h;

  return _vm._m(0);
};

var __vue_staticRenderFns__ = [function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "footer-h8"
  }, [_c('div', {
    staticClass: "footer-h8-left"
  }, [_c('img', {
    staticClass: "logo-hacktiv8 img-logo",
    attrs: {
      "src": "https://i.postimg.cc/Y2NMhk3W/Logo-Hacktiv8-bordered-1.png",
      "alt": ""
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "footer-h8-bottom-row"
  }, [_c('div', {
    staticClass: "social-links"
  }, [_c('a', {
    staticClass: "social-link hover-link w-inline-block",
    attrs: {
      "href": "https://twitter.com/hacktiv8id",
      "target": "_blank"
    }
  }, [_c('img', {
    staticClass: "social-link-image",
    attrs: {
      "src": "https://img.icons8.com/metro/26/ffffff/twitter.png",
      "alt": ""
    }
  })]), _c('a', {
    staticClass: "social-link hover-link w-inline-block",
    attrs: {
      "href": "https://www.facebook.com/hacktiv8id",
      "target": "_blank"
    }
  }, [_c('img', {
    staticClass: "social-link-image",
    attrs: {
      "src": "https://img.icons8.com/metro/26/ffffff/facebook-new--v2.png",
      "alt": ""
    }
  })]), _c('a', {
    staticClass: "social-link hover-link w-inline-block",
    attrs: {
      "href": "https://instagram.com/hacktiv8id",
      "target": "_blank"
    }
  }, [_c('img', {
    staticClass: "social-link-image",
    attrs: {
      "src": "https://img.icons8.com/metro/26/ffffff/instagram-new.png",
      "alt": ""
    }
  })]), _c('a', {
    staticClass: "social-link hover-link w-inline-block",
    attrs: {
      "href": "https://www.youtube.com/c/hacktiv8",
      "target": "_blank"
    }
  }, [_c('img', {
    staticClass: "social-link-image",
    attrs: {
      "src": "https://img.icons8.com/metro/26/ffffff/youtube.png"
    }
  })])])])]);
}];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-87cc5850_0", {
    source: ".footer-h8[data-v-87cc5850]{border:none;display:flex;align-items:center;justify-content:space-between;font-size:14px;background-color:#000;border-top:1px solid #e6eaea}.footer-h8-bottom-row[data-v-87cc5850]{margin-right:20px}.footer-h8-bottom-links[data-v-87cc5850]{display:flex;justify-content:space-between;color:#a59e9c;font-size:15px}.logo-hacktiv8[data-v-87cc5850]{max-width:100px;padding:20px;align-items:center;margin-left:20px;cursor:pointer}.social-link[data-v-87cc5850]{margin-right:20px;color:#7d7e7e}.social-link-image[data-v-87cc5850]:hover{animation:rotation-data-v-87cc5850 8s infinite linear}@keyframes rotation-data-v-87cc5850{from{transform:rotate(0)}to{transform:rotate(359deg)}}.img-logo[data-v-87cc5850]{transition:transform .7s ease-in-out}.img-logo[data-v-87cc5850]:hover{transform:rotate(360deg)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = "data-v-87cc5850";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var entry_esm = /*#__PURE__*/(() => {
  // Get component instance
  const installable = __vue_component__; // Attach install function executed by Vue.use()

  installable.install = Vue => {
    Vue.component('VueHacktivFooter', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;

export default entry_esm;
