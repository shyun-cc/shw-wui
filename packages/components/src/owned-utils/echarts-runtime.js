/**
 * Copyright (c) 2022-present, pure-admin. MIT; see LICENSES/pureadmin-utils.MIT.txt.
 * Owned fork of verified npm 2.6.4 ESM, gitHead metadata 56e7946b96f955ece198c1ee78da8547d8f0ee06.
 * Formatted and top-level symbols restored from public export names; no upstream package import.
 * The original TypeScript source is unavailable (official GitHub repository/commit returned HTTP 404).
 */
import * as Vue from 'vue';
import { useGlobal, delay, useResizeObserver, arrayAnyExist, isBrowser } from './runtime.js';
function onUnmountedIfActive(fn) {
  if (Vue.getCurrentInstance()) Vue.onUnmounted(fn);
}

var useECharts = (e, t) => {
  let disposed = false;
  let stopContainerObserver;
  let tooltipHost;
  let tooltipMove;
  function clearTooltipMove() {
    if (tooltipHost && tooltipMove) tooltipHost.removeEventListener('mousemove', tooltipMove);
    tooltipHost = undefined;
    tooltipMove = undefined;
  }
  let n = '$echarts',
    r = t?.theme
      ? (0, Vue.isProxy)(t.theme) || (0, Vue.isRef)(t.theme)
        ? t.theme
        : (0, Vue.ref)(t.theme)
      : (0, Vue.ref)('default'),
    o = t?.tooltipId ?? 'tooltipElement',
    s = useGlobal().$echarts;
  s ||
    Object.keys(useGlobal()).forEach((S) => {
      useGlobal()?.[S]?.Axis && useGlobal()?.[S]?.ChartView && ((s = useGlobal()?.[S]), (n = S));
    });
  let i = !0,
    l = !1,
    a = null,
    f = (0, Vue.ref)({}),
    m = (0, Vue.ref)(),
    b = (0, Vue.computed)(() =>
      r.value !== 'dark' ? f.value : { backgroundColor: 'transparent', ...f.value },
    );
  function g(S) {
    if (disposed) return;
    let v = (0, Vue.unref)(e);
    if (!(!v || !(0, Vue.unref)(v))) {
      if (!s) throw new Error('useECharts:  echarts\u672A\u7ED1\u5B9A\u5230globalProperties');
      a = s.init(v, S, t);
    }
  }
  function u(S, ...v) {
    if (disposed) return;
    if (((f.value = S), (m.value = v), (0, Vue.unref)(e)?.offsetHeight === 0)) {
      delay().then(() => u((0, Vue.unref)(b), ...v));
      return;
    }
    (0, Vue.nextTick)(() => {
      delay().then(() => {
        if (disposed) return;
        (!a && g(r.value),
          (S.clear ?? !0) && p(),
          a?.setOption((0, Vue.unref)(b)),
          v &&
            v.map((O) => {
              (O?.type !== 'zrender' &&
                typeof O?.callback == 'function' &&
                a?.on(O?.name, O?.query ? O?.query : '', (T) => {
                  O?.callback(T);
                }),
                O?.type === 'zrender' &&
                  typeof O?.callback == 'function' &&
                  a?.getZr().on(O?.name, (T) => {
                    T.target || O?.callback(T);
                  }));
            }),
          S?.addTooltip && H(S.addTooltip));
      });
    });
  }
  function p() {
    a && a.clear();
  }
  function d() {
    a && a.resize();
  }
  function h(S) {
    let v = S?.type ?? 'default',
      D = S?.opts ?? {};
    a.showLoading(v, D);
  }
  function A() {
    a.hideLoading();
  }
  function M(S) {
    a.appendData(S);
  }
  function x() {
    return a.getWidth();
  }
  function E() {
    return a.getHeight();
  }
  function k() {
    return (a || g(r.value), a);
  }
  function w() {
    return a.getDom();
  }
  function B() {
    return a.getOption();
  }
  function Z(S) {
    return a.getDataURL(S);
  }
  function $(S) {
    return a.getConnectedDataURL(S);
  }
  function H(S) {
    if (!S || !isBrowser) return;
    let v = document.querySelector('html');
    if (!document.getElementById(o)) {
      let T = document.createElement('div');
      (T.setAttribute('id', o), (T.style.display = 'block'), v.appendChild(T));
    }
    let D = document.querySelector(`#${o}`),
      O = (T) => {
        if (T?.targetType !== 'axisLabel') return;
        let re = `
        padding: 5px;
        font-size: 12px;
        display: inline;
        border-radius: 4px;
        position: absolute;
        background-color: #303133;
        z-index: 99999;color: #fff;
        box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 8px;
      `;
        ((D.style.cssText = re),
          (D.textContent = T?.value == null ? '' : String(T.value)),
          clearTooltipMove(),
          (tooltipHost = v),
          (tooltipMove = (_) => {
            let P = _.pageX - 10,
              N = _.pageY + 15;
            ((D.style.top = N + 'px'), (D.style.left = P + 'px'));
          }),
          v.addEventListener('mousemove', tooltipMove));
      };
    (a?.on('mouseover', (T) => {
      ((S === 'x' && T.componentType == 'xAxis') ||
        (S === 'y' && T.componentType == 'yAxis') ||
        (S.toString() === 'true' && T.componentType.includes('Axis'))) &&
        O(T);
    }),
      a?.on('mouseout', () => {
        (clearTooltipMove(), (D.style.cssText = 'display:none'));
      }));
  }
  function F() {
    return { name: n, value: s };
  }
  (0, Vue.watch)(
    () => r.value,
    (S) => {
      a && (clearTooltipMove(), a.dispose(), g(S), u(f.value, ...m.value));
    },
  );
  function I() {
    a &&
      delay(f.value?.delay ?? 300).then(() => {
        d();
      });
  }
  return (
    (0, Vue.onMounted)(() => {
      (0, Vue.nextTick)(() => {
        if (disposed) return;
        if (f.value?.container) {
          let S = f.value?.delay ?? 40;
          ((stopContainerObserver = useResizeObserver(f.value.container, d, { time: S }).stop),
            (l = arrayAnyExist(['body', 'html', 'document'], Array.of(f.value.container).flat())),
            l && window.addEventListener('resize', I));
        } else ((i = f.value?.resize ?? !0), i && window.addEventListener('resize', I));
      });
    }),
    onUnmountedIfActive(() => {
      disposed = true;
      stopContainerObserver?.();
      clearTooltipMove();
      (!f.value?.container && i && window.removeEventListener('resize', I),
        f.value?.container && l && window.removeEventListener('resize', I),
        a && (a.dispose(), (a = null), document.querySelector(`#${o}`)?.remove()));
    }),
    {
      echarts: s,
      setOptions: u,
      getInstance: k,
      showLoading: h,
      hideLoading: A,
      clear: p,
      resize: d,
      getGlobalProperties: F,
      getDom: w,
      getWidth: x,
      getHeight: E,
      getOption: B,
      appendData: M,
      getDataURL: Z,
      getConnectedDataURL: $,
      addTooltip: H,
    }
  );
};
export { useECharts };
