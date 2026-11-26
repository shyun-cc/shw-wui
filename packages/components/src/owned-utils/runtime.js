/**
 * Copyright (c) 2022-present, pure-admin. MIT; see LICENSES/pureadmin-utils.MIT.txt.
 * Owned fork of verified npm 2.6.4 ESM, gitHead metadata 56e7946b96f955ece198c1ee78da8547d8f0ee06.
 * Formatted and top-level symbols restored from public export names; no upstream package import.
 * The original TypeScript source is unavailable (official GitHub repository/commit returned HTTP 404).
 */
import * as Ct from 'vue';

var Se = Object.defineProperty;

var Qe = Object.getOwnPropertyDescriptor;

var Je = Object.getOwnPropertyNames;

var et = Object.prototype.hasOwnProperty;

var tt = (e, t) => {
    for (var n in t) Se(e, n, { get: t[n], enumerable: !0 });
  },
  Ee = (e, t, n, r) => {
    if ((t && typeof t == 'object') || typeof t == 'function')
      for (let o of Je(t))
        !et.call(e, o) &&
          o !== n &&
          Se(e, o, { get: () => t[o], enumerable: !(r = Qe(t, o)) || r.enumerable });
    return e;
  },
  me = (e, t, n) => (Ee(e, t, 'default'), n && Ee(n, t, 'default'));

var removeLeftSpace = (e) => e.replace(/^\s*/, ''),
  removeRightSpace = (e) => e.replace(/(\s*$)/g, ''),
  removeBothSidesSpace = (e) => e.replace(/^\s*|\s*$/g, ''),
  removeAllSpace = (e) => e.replace(/\s*/g, '');

var nt = Object.prototype.toString;

function is(e, t) {
  return nt.call(e) === `[object ${t}]`;
}

function isObject(e) {
  return e !== null && is(e, 'Object');
}

function isPlainObject(e) {
  let t;
  return (
    Object.prototype.toString.call(e) === '[object Object]' &&
    ((t = Object.getPrototypeOf(e)), t === null || t == Object.getPrototypeOf({}))
  );
}

function isDef(e) {
  return typeof e < 'u';
}

function isUnDef(e) {
  return !isDef(e);
}

function isNull(e) {
  return e === null;
}

function isNullAndUnDef(e) {
  return isNull(e) && isUnDef(e);
}

function isNullOrUnDef(e) {
  return isNull(e) || isUnDef(e);
}

function isEmpty(e) {
  return isArray(e) || isString(e)
    ? e.length === 0
    : e instanceof Map || e instanceof Set
      ? e.size === 0
      : isObject(e)
        ? Object.keys(e).length === 0
        : !1;
}

function isAllEmpty(e) {
  return !!(isEmpty(e) || isNullOrUnDef(e));
}

function isDate(e) {
  return is(e, 'Date');
}

function isLeapYear(e) {
  return e % 4 === 0 && (e % 100 !== 0 || e % 400 === 0);
}

function isNumber(e) {
  return is(e, 'Number');
}

function isPromise(e) {
  if (!e || !(typeof e == 'object' || typeof e == 'function')) return !1;
  let t = e;
  return (
    t instanceof Promise ||
    (isFunction(t.then) &&
      isFunction(t.catch) &&
      (Object.prototype.toString.call(t) === '[object Promise]' ||
        t.constructor?.name === 'Promise'))
  );
}

function isString(e) {
  return is(e, 'String');
}

function isFunction(e) {
  return typeof e == 'function';
}

function isBoolean(e) {
  return is(e, 'Boolean');
}

function isRegExp(e) {
  return is(e, 'RegExp');
}

function isArray(e) {
  return e && Array.isArray(e);
}

function isJSON(e) {
  if (isString(e))
    try {
      let t = JSON.parse(e);
      return !!(isObject(t) && t);
    } catch {
      return !1;
    }
  return !1;
}

function isWindow(e) {
  return typeof window < 'u' && is(e, 'Window');
}

function isElement(e) {
  return isObject(e) && !!e.tagName;
}

var isBase64 = (e) => {
    if (e === '' || e.trim() === '') return !1;
    try {
      return btoa(atob(e)) == e;
    } catch {
      return !1;
    }
  },
  isHex = (e) => /^#[a-fA-F0-9]{3}$|#[a-fA-F0-9]{6}$/.test(e),
  isRgb = (e) => /^rgb\((\s*\d+\s*,?){3}\)$/.test(e),
  isRgba = (e) => /^rgba\((\s*\d+\s*,\s*){3}\s*\d(\.\d+)?\s*\)$/.test(e),
  isServer = typeof window > 'u',
  isClient = !isServer,
  isBrowser = typeof document < 'u';

function isUrl(e) {
  let t =
    '^(?:(https?|ftp|rtsp|mms|ws|wss):\\/\\/)?(?:\\S+(?::\\S*)?@)?(?:(?:localhost)|(?:[1-9]\\d{0,2}(?:\\.\\d{1,3}){3})|(?:$[0-9a-fA-F:]+$)|(?:(?:[a-zA-Z0-9-_]+\\.)+[a-zA-Z]{2,63}))(?::\\d{1,5})?(?:[/?#]\\S*)?$';
  return new RegExp(t, 'i').test(e);
}

function isPhone(e) {
  return /^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/.test(
    e,
  );
}

function isEmail(e) {
  return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(e);
}

function isQQ(e) {
  return /^[1-9][0-9]{4,12}$/.test(e.toString());
}

function isPostCode(e) {
  return /^[1-9][0-9]{5}$/.test(e.toString());
}

function hasCNChars(e, t) {
  let n = '[\u4E00-\u9FFF',
    r =
      '\u3002\uFF1B\uFF0C\uFF1A\u201C\u201D\uFF08\uFF09\u3001\uFF1F\u300A\u300B\uFF01\u3010\u3011\uFFE5';
  if ((t?.pure && (e = removeAllSpace(e)), t?.all)) {
    let o;
    return (
      t?.unicode
        ? (o = new RegExp(`(^${n}${r}${t?.unicode}]+$)`, 'g'))
        : t?.replaceUnicode
          ? (o = new RegExp(`(^${n}${t?.replaceUnicode}]+$)`, 'g'))
          : (o = new RegExp(`(^${n}${r}]+$)`, 'g')),
      o.test(e)
    );
  } else {
    let o;
    return (
      t?.unicode
        ? (o = new RegExp(`(${n}${r}${t?.unicode}]+)`, 'g'))
        : t?.replaceUnicode
          ? (o = new RegExp(`(${n}${t?.replaceUnicode}]+)`, 'g'))
          : (o = new RegExp(`(${n}${r}]+)`, 'g')),
      o.test(e)
    );
  }
}

function isLowerCase(e) {
  return /^[a-z]+$/.test(e);
}

function isUpperCase(e) {
  return /^[A-Z]+$/.test(e);
}

function isAlphabets(e) {
  return /^[A-Za-z]+$/.test(e);
}

function isExistSpace(e) {
  return !!new RegExp(/\s+/g).test(e);
}

function isHtml(e) {
  return /<("[^"]*"|'[^']*'|[^'">])*>/.test(e);
}

var addZero = (e) => {
    let t = parseFloat(e);
    if (isNaN(t)) return !1;
    t = Math.round(e * 100) / 100;
    let n = t.toString(),
      r = n.indexOf('.');
    for (r < 0 && ((r = n.length), (n += '.')); n.length <= r + 2; ) n += '0';
    return n;
  },
  centsToDollars = (e, t = !0) => {
    let n = e;
    ((n = e * 0.01), (n += ''));
    let r = n.indexOf('.') > -1 ? /(\d{1,3})(?=(?:\d{3})+\.)/g : /(\d{1,3})(?=(?:\d{3})+$)/g;
    return ((n = n.replace(r, '$1')), t ? addZero(n) : n);
  },
  dollarsToCents = (e, t = 100) => {
    let n = 0,
      r = e.toString(),
      o = t.toString();
    try {
      n += r.split('.')[1].length;
    } catch {}
    try {
      n += o.split('.')[1].length;
    } catch {}
    return (Number(r.replace('.', '')) * Number(o.replace('.', ''))) / Math.pow(10, n);
  },
  getDecimalPlaces = (e) => (
    (e = e.toString()),
    e.includes('.') ? e.toString().split('.')[1].length : 0
  ),
  priceUppercase = (e, t = '\u6574') => {
    let n = [
        '\u96F6',
        '\u58F9',
        '\u8D30',
        '\u53C1',
        '\u8086',
        '\u4F0D',
        '\u9646',
        '\u67D2',
        '\u634C',
        '\u7396',
      ],
      r = ['', '\u62FE', '\u4F70', '\u4EDF'],
      o = ['', '\u4E07', '\u4EBF', '\u5146'],
      s = ['\u89D2', '\u5206', '\u6BEB', '\u5398'],
      i = '\u5143',
      a,
      f,
      m = '',
      b;
    if (e == '' || ((e = parseFloat(e)), e >= 1e15)) return '';
    if (e == 0) return ((m = n[0] + i), m);
    ((e = e.toString()),
      e.indexOf('.') == -1
        ? ((a = e), (f = ''), (i = `\u5143${t}`))
        : ((b = e.split('.')), (a = b[0]), (f = b[1].substr(0, 4))));
    let g = 0,
      u = 0,
      p,
      d,
      h,
      A,
      M = 0;
    if (parseInt(a, 10) > 0) {
      ((g = 0), (u = a.length));
      for (let x = 0; x < u; x++)
        ((p = a.substr(x, 1)),
          (d = u - x - 1),
          (A = d / 4),
          (h = d % 4),
          p == '0' ? g++ : (g > 0 && (m += n[0]), (g = 0), (m += n[parseInt(p)] + r[h])),
          h == 0 && g < 4 && (m += o[A]));
      m += i;
    }
    if (f != '') {
      M = f.length;
      for (let x = 0; x < M; x++) ((p = f.substr(x, 1)), p != '0' && (m += n[Number(p)] + s[x]));
    }
    return (m == '' && (m += n[0] + i), m);
  },
  priceToThousands = (e, t) => {
    if (isAllEmpty(e)) return '';
    let n = t?.digit ?? 0;
    if (t?.round ?? !1)
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: n,
        maximumFractionDigits: n,
      }).format(e);
    {
      let o = e.toString(),
        [s, i] = o.split('.'),
        l = '';
      return (
        i ? (l = i.slice(0, n).padEnd(n, '0')) : n > 0 && (l = '0'.repeat(n)),
        s.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (l ? '.' + l : '')
      );
    }
  };

function oe(e) {
  e.preventDefault();
}

// One shared registry makes allowMouseEvent permanent across visibility changes.
const bannedMouseEvents = new Set();
function syncBannedMouseEvents() {
  for (const event of bannedMouseEvents) {
    document.removeEventListener(event, oe);
    if (document.visibilityState !== 'hidden') {
      document.addEventListener(event, oe, { passive: false });
    }
  }
}
function banMouseEvent(eventList) {
  if (!isBrowser) return;
  for (const event of eventList) bannedMouseEvents.add(event);
  if (bannedMouseEvents.size) document.addEventListener('visibilitychange', syncBannedMouseEvents);
  syncBannedMouseEvents();
}
function allowMouseEvent(eventList) {
  if (!isBrowser) return;
  for (const event of eventList) {
    bannedMouseEvents.delete(event);
    document.removeEventListener(event, oe);
  }
  if (!bannedMouseEvents.size)
    document.removeEventListener('visibilitychange', syncBannedMouseEvents);
}

function dataURLtoBlob(e) {
  if (!isBrowser) return;
  let t = e.split(','),
    r = t[0].match(/:(.*?);/)[1],
    o = window.atob(t[1]),
    s = o.length,
    i = new Uint8Array(s);
  for (; s--; ) i[s] = o.charCodeAt(s);
  return new Blob([i], { type: r });
}

function urlToBase64(e, t, n) {
  return new Promise((r, o) => {
    isBrowser || o();
    let s = document.createElement('CANVAS'),
      i = s.getContext('2d'),
      l = new Image();
    ((l.crossOrigin = ''),
      (l.onload = function () {
        if (!s || !i) return o();
        ((s.height = l.height), (s.width = l.width), i.drawImage(l, 0, 0));
        let a = s.toDataURL(t || 'image/png', n);
        ((s = null), r(a));
      }),
      (l.src = e));
  });
}

function convertImageToGray(e, t = {}) {
  return new Promise((n, r) => {
    isBrowser || r();
    let { red: o = 0.3, green: s = 0.59, blue: i = 0.11, scale: l = 1 } = t,
      a = new Image();
    (new URL(e, window.location.href).origin !== window.location.origin &&
      ((a.crossOrigin = 'anonymous'), (a.referrerPolicy = 'no-referrer')),
      (a.onload = () => {
        let f = document.createElement('canvas'),
          m = f.getContext('2d');
        if (!m) {
          r('\u65E0\u6CD5\u83B7\u53D6\u753B\u5E03\u4E0A\u4E0B\u6587');
          return;
        }
        let b = a.width * l,
          g = a.height * l;
        ((f.width = b), (f.height = g), m.drawImage(a, 0, 0, b, g));
        let u;
        try {
          u = m.getImageData(0, 0, f.width, f.height);
        } catch (d) {
          r(d);
          return;
        }
        let p = u.data;
        for (let d = 0; d < p.length; d += 4) {
          let h = p[d] * o + p[d + 1] * s + p[d + 2] * i;
          p[d] = p[d + 1] = p[d + 2] = h;
        }
        (m.putImageData(u, 0, 0), n(f.toDataURL()));
      }),
      (a.onerror = () => {
        r('\u56FE\u7247\u52A0\u8F7D\u5931\u8D25');
      }),
      (a.src = e));
  });
}

var hasClass = (e, t) =>
    isBrowser ? !!e?.className.match(new RegExp('(\\s|^)' + t + '(\\s|$)')) : !1,
  addClass = (e, t, n) => {
    isBrowser &&
      (hasClass(e, t) || (e.className += ' ' + t),
      n && !hasClass(e, n) && (e.className += ' ' + n));
  },
  removeClass = (e, t, n) => {
    if (isBrowser) {
      if (hasClass(e, t)) {
        let r = new RegExp('(\\s|^)' + t + '(\\s|$)');
        e.className = e.className.replace(r, ' ').trim();
      }
      if (n && hasClass(e, n)) {
        let r = new RegExp('(\\s|^)' + n + '(\\s|$)');
        e.className = e.className.replace(r, ' ').trim();
      }
    }
  },
  toggleClass = (e, t, n) => {
    if (!isBrowser) return;
    let r = n || document.body,
      { className: o } = r,
      s = o.replace(t, '').trim().split(/\s+/).join(' ');
    r.className = e ? `${s} ${t}` : s;
  },
  getClass = (e) =>
    isBrowser ? (isExistSpace(e?.className) ? e?.className.split(' ') : e?.className) : '';

var at = Object.prototype.toString;

function hasOwnProp(e, t) {
  return e && e.hasOwnProperty ? e.hasOwnProperty(t) : !1;
}

function lt(e, t, n) {
  if (e)
    if (e.forEach) e.forEach(t, n);
    else for (let r = 0, o = e.length; r < o; r++) t.call(n, e[r], r, e);
}

function ut(e, t, n) {
  if (e) for (let r in e) hasOwnProp(e, r) && t.call(n, e[r], r, e);
}

function de(e, t) {
  let n = e.__proto__.constructor;
  return t ? new n(t) : new n();
}

function ie(e, t) {
  return t ? ge(e, t) : e;
}

function ge(e, t) {
  if (e)
    switch (at.call(e)) {
      case '[object Object]': {
        let n = Object.create(e.__proto__);
        return (
          ut(e, function (r, o) {
            n[o] = ie(r, t);
          }),
          n
        );
      }
      case '[object Date]':
      case '[object RegExp]':
        return de(e, e.valueOf());
      case '[object Array]':
      case '[object Arguments]': {
        let n = [];
        return (
          lt(e, function (r) {
            n.push(ie(r, t));
          }),
          n
        );
      }
      case '[object Set]': {
        let n = de(e);
        return (
          n.forEach(function (r) {
            n.add(ie(r, t));
          }),
          n
        );
      }
      case '[object Map]': {
        let n = de(e);
        return (
          n.forEach(function (r) {
            n.set(ie(r, t));
          }),
          n
        );
      }
    }
  return e;
}

function clone(e, t) {
  return e && ge(e, t);
}

function cloneDeep(e) {
  return e && ge(e, !0);
}

var randomColor = (e) => {
  let t = e?.type ?? 'rgb',
    n = e?.num ?? 0;
  if (n === 0)
    switch (t) {
      case 'rgb':
        return isBrowser ? window.crypto.getRandomValues(new Uint8Array(3)).toString() : void 0;
      case 'hex':
        return `#${Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, `${Math.random() * 10}`)}`;
      case 'hsl':
        return [
          360 * Math.random(),
          `${100 * Math.random()}%`,
          `${100 * Math.random()}%`,
        ].toString();
    }
  else
    switch (t) {
      case 'rgb':
        let r = [];
        if (!isBrowser) return;
        for (let i = 0; i < n; i++)
          r.push(window.crypto.getRandomValues(new Uint8Array(3)).toString());
        return r;
      case 'hex':
        let o = [];
        for (let i = 0; i < n; i++)
          o.push(
            `#${Math.floor(Math.random() * 16777215)
              .toString(16)
              .padStart(6, `${Math.random() * 10}`)}`,
          );
        return o;
      case 'hsl':
        let s = [];
        for (let i = 0; i < n; i++)
          s.push(
            [360 * Math.random(), `${100 * Math.random()}%`, `${100 * Math.random()}%`].toString(),
          );
        return s;
    }
};

function te(e, t) {
  return Math.floor(Math.random() * (t - e + 1)) + e;
}

function he(e, t, n) {
  return `hsl(${e}, ${t}%, ${n}%)`;
}

var randomGradient = (e = {}) => {
    let {
        baseHue: t = te(0, 360),
        hueOffset: n = 30,
        saturation: r = 70,
        lightness: o = 60,
        angle: s = 135,
        randomizeHue: i = !1,
        randomizeSaturation: l = !1,
        randomizeLightness: a = !1,
        randomizeAngle: f = !1,
      } = e,
      m = i ? te(0, 360) : t,
      b = l ? te(50, 100) : r,
      g = a ? te(40, 70) : o,
      u = f ? te(0, 360) : s,
      p = he(m, b, g),
      d = he((m + n) % 360, b, g),
      h = he((m + 180) % 360, b, g);
    return `linear-gradient(${u}deg, ${p}, ${d}, ${h})`;
  },
  hexToRgb = (e) => {
    let t = e.replace('#', '').match(/../g);
    for (let n = 0; n < 3; n++) t[n] = parseInt(t[n], 16);
    return t;
  },
  rgbToHex = (e, t, n) => {
    let r = [e.toString(16), t.toString(16), n.toString(16)];
    for (let o = 0; o < 3; o++) r[o].length == 1 && (r[o] = `0${r[o]}`);
    return `#${r.join('')}`;
  },
  darken = (e, t) => {
    let n = hexToRgb(e);
    for (let r = 0; r < 3; r++) n[r] = Math.floor(n[r] * (1 - t));
    return rgbToHex(n[0], n[1], n[2]);
  },
  lighten = (e, t) => {
    let n = hexToRgb(e);
    for (let r = 0; r < 3; r++) n[r] = Math.floor((255 - n[r]) * t + n[r]);
    return rgbToHex(n[0], n[1], n[2]);
  };

function convertPath(e) {
  let t = /^\\\\\?\\/.test(e),
    n = /[^\u0000-\u0080]+/.test(e);
  return t || n ? e : e.replace(/\\/g, '/');
}

var ae = 52.35987755982988,
  C = 3.141592653589793,
  ce = 6378245,
  le = 0.006693421622965943;

function Pe(e, t) {
  let n = +e,
    r = +t,
    o = -100 + 2 * n + 3 * r + 0.2 * r * r + 0.1 * n * r + 0.2 * Math.sqrt(Math.abs(n));
  return (
    (o += ((20 * Math.sin(6 * n * C) + 20 * Math.sin(2 * n * C)) * 2) / 3),
    (o += ((20 * Math.sin(r * C) + 40 * Math.sin((r / 3) * C)) * 2) / 3),
    (o += ((160 * Math.sin((r / 12) * C) + 320 * Math.sin((r * C) / 30)) * 2) / 3),
    o
  );
}

function Ie(e, t) {
  let n = +e,
    r = +t,
    o = 300 + e + 2 * r + 0.1 * n * n + 0.1 * n * r + 0.1 * Math.sqrt(Math.abs(n));
  return (
    (o += ((20 * Math.sin(6 * n * C) + 20 * Math.sin(2 * n * C)) * 2) / 3),
    (o += ((20 * Math.sin(n * C) + 40 * Math.sin((n / 3) * C)) * 2) / 3),
    (o += ((150 * Math.sin((n / 12) * C) + 300 * Math.sin((n / 30) * C)) * 2) / 3),
    o
  );
}

function bd09togcj02(e, t) {
  let n = +e,
    r = +t,
    o = n - 0.0065,
    s = r - 0.006,
    i = Math.sqrt(o * o + s * s) - 2e-5 * Math.sin(s * ae),
    l = Math.atan2(s, o) - 3e-6 * Math.cos(o * ae),
    a = i * Math.cos(l),
    f = i * Math.sin(l);
  return [a, f];
}

function gcj02tobd09(e, t) {
  let n = +e,
    r = +t,
    o = Math.sqrt(n * n + r * r) + 2e-5 * Math.sin(r * ae),
    s = Math.atan2(r, n) + 3e-6 * Math.cos(n * ae),
    i = o * Math.cos(s) + 0.0065,
    l = o * Math.sin(s) + 0.006;
  return [i, l];
}

function wgs84togcj02(e, t) {
  let n = +e,
    r = +t;
  if (out_of_china(n, r)) return [n, r];
  {
    let o = Pe(n - 105, r - 35),
      s = Ie(n - 105, r - 35),
      i = (r / 180) * C,
      l = Math.sin(i);
    l = 1 - le * l * l;
    let a = Math.sqrt(l);
    ((o = (o * 180) / (((ce * (1 - le)) / (l * a)) * C)),
      (s = (s * 180) / ((ce / a) * Math.cos(i) * C)));
    let f = r + o;
    return [n + s, f];
  }
}

function gcj02towgs84(e, t) {
  let n = +e,
    r = +t;
  if (out_of_china(n, r)) return [n, r];
  {
    let o = Pe(n - 105, r - 35),
      s = Ie(n - 105, r - 35),
      i = (r / 180) * C,
      l = Math.sin(i);
    l = 1 - le * l * l;
    let a = Math.sqrt(l);
    ((o = (o * 180) / (((ce * (1 - le)) / (l * a)) * C)),
      (s = (s * 180) / ((ce / a) * Math.cos(i) * C)));
    let f = r + o,
      m = n + s;
    return [n * 2 - m, r * 2 - f];
  }
}

function out_of_china(e, t) {
  let n = +e,
    r = +t;
  return !(n > 73.66 && n < 135.05 && r > 3.86 && r < 53.55);
}

var max = (e) => (isArray(e) && e.length > 0 ? Math.max.apply(null, e) : 0),
  min = (e) => (isArray(e) && e.length > 0 ? Math.min.apply(null, e) : 0),
  sum = (e) => (isArray(e) && e.length > 0 ? e.reduce((t, n) => t + n) : 0),
  average = (e) => (isArray(e) && e.length > 0 ? sum(e) / e.length : 0),
  numberToChinese = (e) => {
    if (!e && typeof e > 'u') return '';
    if (Number(e) === 0) return '\u96F6';
    let t = [
        '\u96F6',
        '\u4E00',
        '\u4E8C',
        '\u4E09',
        '\u56DB',
        '\u4E94',
        '\u516D',
        '\u4E03',
        '\u516B',
        '\u4E5D',
        '\u5341',
      ],
      n = ['', '\u5341', '\u767E', '\u5343', '\u4E07', '\u4EBF', '\u70B9', ''],
      r = ('' + e).replace(/(^0*)/g, '').split('.'),
      o = 0,
      s = '';
    for (let i = r[0].length - 1; i >= 0; i--) {
      switch (o) {
        case 0:
          s = n[7] + s;
          break;
        case 4:
          new RegExp('0{4}//d{' + (r[0].length - i - 1) + '}$').test(r[0]) || (s = n[4] + s);
          break;
        case 8:
          ((s = n[5] + s), (n[7] = n[5]), (o = 0));
          break;
      }
      (o % 4 == 2 && r[0].charAt(i + 2) != 0 && r[0].charAt(i + 1) == 0 && (s = t[0] + s),
        r[0].charAt(i) != 0 && (s = t[r[0].charAt(i)] + n[o % 4] + s),
        o++);
    }
    if (r.length > 1) {
      s += n[6];
      for (let i = 0; i < r[1].length; i++) s += t[r[1].charAt(i)];
    }
    return (
      s == '\u4E00\u5341' && (s = '\u5341'),
      s.match(/^一/) && s.length == 3 && (s = s.replace('\u4E00', '')),
      s
    );
  };

function exceedMathMax(e) {
  let t = e > Number.MAX_SAFE_INTEGER;
  return (
    t && console.warn('The calculation length has exceeded the JS maximum security integer'),
    t
  );
}

function ye(e, t) {
  let n = e.toString().split('.').length > 1 ? e.toString().split('.')[1].length : 0,
    r = t.toString().split('.').length > 1 ? t.toString().split('.')[1].length : 0;
  return Math.pow(10, Math.max(n, r));
}

function addition(e, t, n) {
  let r = ye(e, t),
    o = e * r + t * r;
  exceedMathMax(o);
  let s = o / r;
  return ((s = n || n ? s.toFixed(n) : s), Number(s));
}

function subtraction(e, t, n) {
  let r = ye(e, t),
    o = e * r - t * r;
  exceedMathMax(o);
  let s = o / r;
  return ((s = n || n ? s.toFixed(n) : s), Number(s));
}

function multiplication(e, t, n) {
  let r = e * t;
  exceedMathMax(r);
  let o = r;
  return ((o = n ? o.toFixed(n) : o), Number(o));
}

function divisionOperation(e, t, n) {
  let r = ye(e, t),
    o = (e * r) / (t * r);
  return (exceedMathMax(o), (o = n || n ? o.toFixed(n) : o), Number(o));
}

var formatBytes = (e, t) => {
  if (e == 0) return '0 Bytes';
  let n = 1024,
    r = t || 2,
    o = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    s = Math.floor(Math.log(e) / Math.log(n));
  return parseFloat((e / Math.pow(n, s)).toFixed(r)) + ' ' + o[s];
};

function dateFormat(e) {
  let t = new Date(),
    n = {
      'M+': t.getMonth() + 1,
      'D+': t.getDate(),
      'H+': t.getHours(),
      'm+': t.getMinutes(),
      's+': t.getSeconds(),
    };
  /(Y+)/.test(e) && (e = e.replace(RegExp.$1, (t.getFullYear() + '').substr(4 - RegExp.$1.length)));
  for (let r in n)
    new RegExp('(' + r + ')').test(e) &&
      (e = e.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? n[r] : ('00' + n[r]).substr(('' + n[r]).length),
      ));
  return e;
}

function getCurrentWeek(e = '\u661F\u671F') {
  let t = new Date().getDay();
  return `${e}${t === 0 ? '\u65E5' : numberToChinese(t)}`;
}

function monthDays(e) {
  e = new Date(e);
  let t = e.getFullYear(),
    n = e.getMonth() + 1;
  return new Date(t, n, 0).getDate();
}

function createYear(e) {
  let t = [];
  for (let n = 0; n <= new Date().getFullYear() - e; n++) t.push(e + n);
  return t.reverse();
}

function getCurrentDate(e) {
  let t = e?.type ?? 1,
    n = getCurrentWeek(e?.prefix ?? '\u661F\u671F'),
    r = {
      ymd: dateFormat('YYYY\u5E74MM\u6708DD\u65E5'),
      hms: dateFormat('HH\u65F6mm\u5206ss\u79D2'),
      week: n,
    },
    o = { ymd: dateFormat('YYYY-MM-DD'), hms: dateFormat('HH-mm-ss'), week: n },
    s = { ymd: dateFormat('YYYY/MM/DD'), hms: dateFormat('HH/mm/ss'), week: n };
  switch (t) {
    case 1:
      return r;
    case 2:
      return o;
    case 3:
      return s;
    default:
      return r;
  }
}

function getTime(e, t = !0) {
  let n = (i) => ((i = Math.floor(i)), i < 10 && t ? `0${i}` : i),
    r = n(e / 3600),
    o = n((e % 3600) / 60),
    s = n(e % 60);
  return { h: r, m: o, s };
}

var delay = (e = 20) => new Promise((t) => setTimeout(t, e)),
  debounce = (e, t = 200, n = !1) => {
    let r,
      o = t,
      s = void 0;
    return function () {
      (r && clearTimeout(r),
        n
          ? (r || e.call(s, ...arguments), (r = setTimeout(() => (r = null), o)))
          : (r = setTimeout(() => e.call(s, ...arguments), o)));
    };
  },
  throttle = (e, t = 1e3) => {
    let n;
    return function () {
      n ||
        (n = setTimeout(() => {
          (e.call(void 0, ...arguments), (n = null));
        }, t));
    };
  };

function Fe(e) {
  return e !== null && typeof e == 'object' && !Array.isArray(e);
}

function Be(e) {
  return Array.isArray(e);
}

function Ne(e) {
  return e instanceof Date;
}

function Ue(e) {
  return e instanceof RegExp;
}

function je(e) {
  return e instanceof Map;
}

function ze(e) {
  return e instanceof Set;
}

function mapsEqual(e, t, n) {
  if (e.size !== t.size) return !1;
  for (let [r, o] of e) if (!t.has(r) || !n(o, t.get(r))) return !1;
  return !0;
}

function setsEqual(e, t) {
  if (e.size !== t.size) return !1;
  for (let n of e) if (!t.has(n)) return !1;
  return !0;
}

function gt(e, t, n) {
  if (e.length !== t.length) return !1;
  for (let r = 0; r < e.length; r++) if (!n(e[r], t[r])) return !1;
  return !0;
}

function deepEqual(e, t, n = new WeakMap()) {
  if (e === t) return !0;
  if (Ne(e) && Ne(t)) return e.getTime() === t.getTime();
  if (Ue(e) && Ue(t)) return e.toString() === t.toString();
  if (je(e) && je(t)) return mapsEqual(e, t, deepEqual);
  if (ze(e) && ze(t)) return setsEqual(e, t);
  if (Be(e) && Be(t)) return gt(e, t, deepEqual);
  if (Fe(e) && Fe(t)) {
    if (n.has(e)) return n.get(e) === t;
    n.set(e, t);
    let r = Object.keys(e),
      o = Object.keys(t);
    if (r.length !== o.length) return !1;
    for (let s of r)
      if (!Object.prototype.hasOwnProperty.call(t, s) || !deepEqual(e[s], t[s], n)) return !1;
    return !0;
  }
  return !1;
}

var deviceDetection = () => {
    if (!isBrowser) return;
    let e = navigator.userAgent.toLowerCase(),
      t = e.match(/midp/i) == 'midp',
      n = e.match(/ucweb/i) == 'ucweb',
      r = e.match(/android/i) == 'android',
      o = e.match(/iphone os/i) == 'iphone os',
      s = e.match(/windows ce/i) == 'windows ce',
      i = e.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4',
      l = e.match(/windows mobile/i) == 'windows mobile';
    return t || n || r || o || s || i || l;
  },
  getBrowserInfo = () => {
    if (!isBrowser) return;
    let e = navigator.userAgent,
      t,
      n = e.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    return /trident/i.test(n[1])
      ? ((t = /\brv[ :]+(\d+)/g.exec(e) || []), { browser: 'ie', version: t[1] || '' })
      : n[1] === 'Chrome' && ((t = e.match(/\b(OPR|Edge)\/(\d+)/)), t != null)
        ? { browser: t[1].replace('OPR', 'Opera').toLowerCase(), version: t[2] }
        : ((n = n[2] ? [n[1], n[2]] : [navigator.appName, navigator.appVersion, '-?']),
          (t = e.match(/version\/(\d+)/i)) != null && n.splice(1, 1, t[1]),
          { browser: n[0].toLowerCase(), version: n[1] });
  };

var openLink = (e, t = '_blank') => {
  if (!isBrowser) return;
  let n = document.createElement('a');
  (n.setAttribute('href', e),
    n.setAttribute('target', t),
    n.setAttribute('rel', 'noreferrer noopener'),
    n.setAttribute('id', 'external'));
  let r = document.getElementById('external');
  (r && document.body.removeChild(r), document.body.appendChild(n), n.click(), n.remove());
};

function downloadByOnlineUrl(e, t, n, r) {
  urlToBase64(e).then((o) => {
    downloadByBase64(o, t, n, r);
  });
}

function downloadByBase64(e, t, n, r) {
  let o = dataURLtoBlob(e);
  downloadByData(o, t, n, r);
}

function downloadByData(e, t, n, r) {
  if (!isBrowser) return;
  let o = typeof r < 'u' ? [r, e] : [e],
    s = new Blob(o, { type: n || 'application/octet-stream' }),
    i = window.URL.createObjectURL(s),
    l = document.createElement('a');
  ((l.style.display = 'none'),
    (l.href = i),
    l.setAttribute('download', t),
    typeof l.download > 'u' && l.setAttribute('target', '_blank'),
    document.body.appendChild(l),
    l.click(),
    document.body.removeChild(l),
    window.URL.revokeObjectURL(i));
}

function downloadByUrl(e, t, n = '_self') {
  if (!isBrowser) return;
  let r = window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1,
    o = window.navigator.userAgent.toLowerCase().indexOf('safari') > -1;
  if (/(iP)/g.test(window.navigator.userAgent))
    return (console.error('Your browser does not support download!'), !1);
  if (r || o) {
    let s = document.createElement('a');
    if (
      ((s.href = e),
      (s.target = n),
      s.download !== void 0 && (s.download = t || e.substring(e.lastIndexOf('/') + 1, e.length)),
      document.createEvent)
    ) {
      let i = document.createEvent('MouseEvents');
      return (i.initEvent('click', !0, !0), s.dispatchEvent(i), !0);
    }
  }
  return (e.indexOf('?') === -1 && (e += '?download'), openLink(e, n), !0);
}

function isEqualObject(e, t) {
  if (e === t) return !0;
  if (typeof e != 'object' || typeof t != 'object' || e == null || t == null) return !1;
  let n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (let o of n) if (!r.includes(o) || !isEqualObject(e[o], t[o])) return !1;
  return !0;
}

function isEqualArray(e, t) {
  if (!e || !t) return !1;
  let { length: n } = e;
  if (n !== t.length) return !1;
  for (let r = 0; r < n; r++) if (!isEqual(e[r], t[r])) return !1;
  return !0;
}

function isEqual(e, t) {
  let n = Object.prototype.toString.call(e);
  return n !== Object.prototype.toString.call(t)
    ? !1
    : n === '[object Object]'
      ? isEqualObject(e, t)
      : n === '[object Array]'
        ? isEqualArray(e, t)
        : n === '[object Function]'
          ? e === t
            ? !0
            : e.toString() === t.toString()
          : e === t;
}

function formDataHander(e) {
  let t = new FormData();
  return (
    Object.keys(e).forEach((n) => {
      t.append(n, e[n]);
    }),
    t
  );
}

function createFormData(e, t = {}) {
  let n = new FormData(),
    r = t.fileKey || 'file',
    o = t.filter || [],
    s = (l) => o.includes(l),
    i = (l, a, f) => {
      let m = f ? `${f}[${l}]` : l;
      s(a) ||
        (t.handleFile && (a instanceof File || a instanceof Blob)
          ? t.handleFile({ file: a, key: m, formData: n })
          : a instanceof File || a instanceof Blob
            ? n.append(r, a, a instanceof File ? a.name : 'blob')
            : Array.isArray(a)
              ? a.forEach((b, g) => i(String(g), b, m))
              : a && typeof a == 'object' && a.constructor === Object
                ? Object.keys(a).forEach((b) => i(b, a[b], m))
                : n.append(m, a));
    };
  return (Object.keys(e).forEach((l) => i(l, e[l])), n);
}

var withInstall = (e, t) => {
    if (
      ((e.install = (n) => {
        for (let r of [e, ...Object.values(t ?? {})]) n.component(r.name, r);
      }),
      t)
    )
      for (let [n, r] of Object.entries(t)) e[n] = r;
    return e;
  },
  withNoopInstall = (e) => ((e.install = () => {}), e),
  withInstallFunction = (e, t) => (
    (e.install = (n) => {
      ((e._context = n._context), (n.config.globalProperties[t] = e));
    }),
    e
  );

var nameCamelize = (e) => {
    let t = /-(\w)/g;
    return e.replace(t, (n, r) => (r ? r.toUpperCase() : ''));
  },
  nameHyphenate = (e) => {
    let t = /\B([A-Z])/g;
    return e.replace(t, '-$1').toLowerCase();
  };

var delObjectProperty = (e, t) => {
  let n = { ...e };
  return (
    (isArray(t) ? t : [t]).forEach((o) => {
      delete n[o];
    }),
    n
  );
};

function toSet(e) {
  if (e) {
    if (e instanceof Set) return e;
    if (Array.isArray(e)) return new Set(e);
    if (typeof e == 'object')
      return new Set(Object.keys(e).filter((t) => e[t] === !0 || e[t] === 1));
  }
}

function shouldCleanKey(e, t, n) {
  let { includeKeys: r, excludeKeys: o } = n;
  if (r !== void 0) {
    let s = !1;
    if ((typeof r == 'function' ? (s = r(e, t)) : (s = toSet(r)?.has(e) ?? !1), !s)) return !1;
  }
  if (o !== void 0) {
    let s = !1;
    if ((typeof o == 'function' ? (s = o(e, t)) : (s = toSet(o)?.has(e) ?? !1), s)) return !1;
  }
  return !0;
}

function isInvalidValue(e, t) {
  let {
    excludeWhitespaceStrings: n = !1,
    excludeEmptyObjects: r = !1,
    excludeEmptyArrays: o = !1,
    customFilter: s = () => !1,
  } = t;
  return !!(
    e == null ||
    e === '' ||
    (n && typeof e == 'string' && e.trim() === '') ||
    (r && typeof e == 'object' && !Array.isArray(e) && Object.keys(e).length === 0) ||
    (o && Array.isArray(e) && e.length === 0) ||
    s(e)
  );
}

function cleanObject(e, t = {}) {
  let {
    maxDepth: n = 1 / 0,
    allowRootIfEmpty: r = !1,
    customFilter: o,
    stripKeysInObjects: s = {},
  } = t;
  function i(a, f, m) {
    let b = s[a];
    if (!b) return !1;
    if (typeof b == 'function') return b(f, m);
    for (let g of b)
      if (typeof g == 'function') {
        if (g(f, m)) return !0;
      } else if (g === f) return !0;
    return !1;
  }
  function l(a, f, m, b) {
    if (f > n) return a;
    if (!(typeof o == 'function' && o(a, m, b)) && !isInvalidValue(a, t)) {
      if (Array.isArray(a)) {
        let g = a.map((u) => l(u, f + 1, void 0, a)).filter((u) => u !== void 0);
        return t.excludeEmptyArrays && g.length === 0 ? void 0 : g;
      }
      if (typeof a == 'object' && a !== null) {
        let g = a;
        if (typeof m == 'string' && s[m]) {
          let h = {};
          for (let A in g) i(m, A, g[A]) || (h[A] = g[A]);
          g = h;
        }
        let u = {},
          p = !1;
        for (let h of Reflect.ownKeys(g)) {
          let A = g[h];
          if (!shouldCleanKey(h, A, t)) continue;
          let M = l(A, f + 1, h, g);
          M !== void 0 && ((u[h] = M), (p = !0));
        }
        let d = !p && Object.keys(u).length === 0;
        return (t.excludeEmptyObjects && d) || (d && !r) ? void 0 : u;
      }
      return a;
    }
  }
  return l(e, 1);
}

function getPerformance() {
  return new Promise((e, t) => {
    isBrowser || t();
    let n = window.performance.timing;
    delay(500)
      .then((r) => {
        e({
          dns: (n.domainLookupEnd - n.domainLookupStart) / 1e3,
          tcp: (n.connectEnd - n.connectStart) / 1e3,
          request: (n.responseEnd - n.responseStart) / 1e3,
          dom: (n.domComplete - n.domInteractive) / 1e3,
          whiteScreen: (n.domComplete - n.navigationStart) / 1e3,
        });
      })
      .catch((r) => {
        t(r);
      });
  });
}

var ne = class {
    storage;
    constructor(t) {
      this.storage = t;
    }
    setItem(t, n) {
      isAllEmpty(this.storage) || this.storage.setItem(t, JSON.stringify(n));
    }
    getItem(t) {
      if (!isAllEmpty(this.storage)) return JSON.parse(this.storage.getItem(t));
    }
    removeItem(t) {
      isAllEmpty(this.storage) || this.storage.removeItem(t);
    }
    clear() {
      isAllEmpty(this.storage) || this.storage.clear();
    }
  },
  fe = class extends ne {
    constructor(t) {
      super(t);
    }
  },
  storageLocal = () => (isClient ? new fe(window.localStorage) : new fe('')),
  storageSession = () => (isClient ? new ne(window.sessionStorage) : new ne(''));

function subBefore(e, t) {
  return isString(t) ? e.substring(0, e.indexOf(t)) : '';
}

function subAfter(e, t) {
  return isString(t) ? e.substring(e.lastIndexOf(t) + t.length, e.length) : '';
}

function subBothSides(e, t) {
  return isString(t) ? [subBefore(e, t), subAfter(e, t)] : [];
}

function subBetween(e, t, n) {
  if (!isString(t) || !isString(n)) return '';
  let r = e.substring(e.indexOf(t) + t.length, e.length);
  return r.substring(0, r.indexOf(n));
}

function subTextAddEllipsis(e, t = 3) {
  return ((e = e.toString()), e.length > t ? e.substr(0, t) + '...' : e);
}

function splitNum(e) {
  return e ? [...(e + '')].map(Number) : '';
}

function hideTextAtIndex(e, t, n = '*') {
  (isNumber(e) && (e = e.toString()), isArray(t) || (t = Array.of(t)));
  let r = e.split('');
  for (let o = 0; o < t.length; o++) {
    let s = t[o];
    if (isObject(s) && !isArray(s)) {
      let { start: i, end: l } = s;
      i >= 0 && i < l && r.fill(n, i, l + 1);
      continue;
    }
    isNumber(s) && Number.isInteger(s) && s >= 0 && (r[t[o]] = n);
  }
  return r.join('');
}

function getSvgInfo(e) {
  if (!isBrowser) return { width: 0, height: 0, body: '' };
  try {
    let n = new DOMParser().parseFromString(e, 'image/svg+xml'),
      r = n.querySelector('parsererror');
    if (r)
      return (
        console.warn('getSvgInfo: Invalid SVG string detected. Parser error:', r.textContent),
        { width: 0, height: 0, body: '' }
      );
    let o = n.querySelector('svg');
    if (!o)
      return (
        console.warn('getSvgInfo: <svg> element not found in provided string.'),
        { width: 0, height: 0, body: '' }
      );
    let s = 0,
      i = 0,
      l = o.getAttribute('viewBox');
    if (l) {
      let a = l.trim().split(/\s+/);
      if (a.length >= 4) {
        let f = parseFloat(a[2]),
          m = parseFloat(a[3]);
        (isNaN(f) || (s = f), isNaN(m) || (i = m));
      }
    }
    if ((!l || s === 0 || i === 0) && (s === 0 || i === 0)) {
      let a = o.getAttribute('width'),
        f = o.getAttribute('height');
      if (a) {
        let m = parseFloat(a);
        isNaN(m) || (s = m);
      }
      if (f) {
        let m = parseFloat(f);
        isNaN(m) || (i = m);
      }
    }
    return (
      (s = isNaN(s) ? 0 : s),
      (i = isNaN(i) ? 0 : i),
      { width: s, height: i, body: o.innerHTML || '' }
    );
  } catch (t) {
    return (
      console.error(
        'getSvgInfo: Unexpected error during SVG parsing. Returning default values.',
        t,
      ),
      { width: 0, height: 0, body: '' }
    );
  }
}

var extractPathList = (e) => {
    if (!Array.isArray(e)) return (console.warn('tree must be an array'), []);
    if (!e || e.length === 0) return [];
    let t = [];
    for (let n of e)
      (n.children && n.children.length > 0 && extractPathList(n.children), t.push(n.uniqueId));
    return t;
  },
  deleteChildren = (e, t = []) => {
    if (!Array.isArray(e)) return (console.warn('menuTree must be an array'), []);
    if (!e || e.length === 0) return [];
    for (let [n, r] of e.entries())
      (r.children && r.children.length === 1 && delete r.children,
        (r.id = n),
        (r.parentId = t.length ? t[t.length - 1] : null),
        (r.pathList = [...t, r.id]),
        (r.uniqueId = r.pathList.length > 1 ? r.pathList.join('-') : r.pathList[0]),
        r.children && r.children.length > 0 && deleteChildren(r.children, r.pathList));
    return e;
  },
  buildHierarchyTree = (e, t = []) => {
    if (!Array.isArray(e)) return (console.warn('tree must be an array'), []);
    if (!e || e.length === 0) return [];
    for (let [n, r] of e.entries())
      ((r.id = n),
        (r.parentId = t.length ? t[t.length - 1] : null),
        (r.pathList = [...t, r.id]),
        r.children && r.children.length > 0 && buildHierarchyTree(r.children, r.pathList));
    return e;
  },
  getNodeByUniqueId = (e, t) => {
    if (!Array.isArray(e)) return (console.warn('menuTree must be an array'), []);
    if (!e || e.length === 0) return [];
    let n = e.find((o) => o.uniqueId === t);
    if (n) return n;
    let r = e
      .filter((o) => o.children)
      .map((o) => o.children)
      .flat(1);
    return getNodeByUniqueId(r, t);
  },
  appendFieldByUniqueId = (e, t, n) => {
    if (!Array.isArray(e)) return (console.warn('menuTree must be an array'), []);
    if (!e || e.length === 0) return [];
    for (let r of e) {
      let o = r.children && r.children.length > 0;
      (r.uniqueId === t &&
        Object.prototype.toString.call(n) === '[object Object]' &&
        Object.assign(r, n),
        o && appendFieldByUniqueId(r.children, t, n));
    }
    return e;
  },
  handleTree = (e, t, n, r) => {
    if (!Array.isArray(e)) return (console.warn('data must be an array'), []);
    let o = { id: t || 'id', parentId: n || 'parentId', childrenList: r || 'children' },
      s = {},
      i = {},
      l = [];
    for (let f of e) {
      let m = f[o.parentId];
      (s[m] == null && (s[m] = []), (i[f[o.id]] = f), s[m].push(f));
    }
    for (let f of e) {
      let m = f[o.parentId];
      i[m] == null && l.push(f);
    }
    for (let f of l) a(f);
    function a(f) {
      if ((s[f[o.id]] !== null && (f[o.childrenList] = s[f[o.id]]), f[o.childrenList]))
        for (let m of f[o.childrenList]) a(m);
    }
    return l;
  };

function getLocation() {
  if (isBrowser) return window.location;
}

function getQueryMap(e) {
  if (!isUrl(e)) return (console.error(`${e}\u4E0D\u7B26\u5408\u8D85\u94FE\u63A5\u89C4\u8303`), {});
  let t = e.indexOf('?'),
    r = e.slice(t + 1).split('&'),
    o = {};
  for (let s = 0; s < r.length; s++) o[r[s].split('=')[0]] = r[s].split('=')[1];
  return o;
}

var buildUUID = () => {
    let e = '',
      t = [];
    for (let n = 0; n <= 15; n++) t[n] = n.toString(16);
    for (let n = 1; n <= 36; n++)
      n === 9 || n === 14 || n === 19 || n === 24
        ? (e += '-')
        : n === 15
          ? (e += 4)
          : n === 20
            ? (e += t[(Math.random() * 4) | 8])
            : (e += t[(Math.random() * 16) | 0]);
    return e.replace(/-/g, '');
  },
  buildGUID = () => {
    let e = '',
      t = [];
    for (let n = 0; n <= 15; n++) t[n] = n.toString(16);
    for (let n = 1; n <= 36; n++)
      n === 9 || n === 14 || n === 19 || n === 24
        ? (e += '-')
        : n === 15
          ? (e += '4')
          : n === 20
            ? (e += t[(Math.random() * 4) | 8])
            : (e += t[Math.floor(Math.random() * 16)]);
    return e;
  },
  buildPrefixUUID = (e = '') => {
    let t = 0,
      n = Date.now(),
      r = Math.floor(Math.random() * 1e9);
    return (t++, `${e}${r}${t}${String(n)}`);
  },
  uuid = (e, t, n = '') => {
    let r = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''),
      o = [],
      s;
    if (((t = t || r.length), e)) for (s = 0; s < e; s++) o[s] = r[0 | (Math.random() * t)];
    else {
      let i;
      for (o[8] = o[13] = o[18] = o[23] = '-', o[14] = '4', s = 0; s < 36; s++)
        o[s] || ((i = 0 | (Math.random() * 16)), (o[s] = r[s == 19 ? (i & 3) | 8 : i]));
    }
    return n ? n + o.join('') : o.join('');
  };

function shuffleArray(e) {
  for (let t = e.length - 1; t > 0; t--) {
    let n = Math.floor(Math.random() * (t + 1));
    [e[t], e[n]] = [e[n], e[t]];
  }
  return e;
}

function isIncludeAllChildren(e, t) {
  return e.every((n) => t.some((r) => r === n));
}

var intersection = (...e) => [...e].reduce((t, n) => t.filter((r) => n.includes(r)));

function swapOrder(e, t, n) {
  return ((e[t] = e.splice(n, 1, e[t])[0]), e);
}

function getKeyList(e, t, n = !0) {
  let r = [];
  for (let o of e) o[t] !== void 0 && o[t] !== null && r.push(o[t]);
  return n ? Array.from(new Set(r)) : r;
}

function randomDivide(e, t, n = {}) {
  let r = n.minPerPart ?? 0,
    o = n.maxPerPart,
    s = n.order ?? 'random';
  if ((n.minPerPart && e < t * r) || (o && e > t * o))
    return (
      console.error(
        '\u603B\u6570\u4E0D\u8DB3\u4EE5\u6309\u6307\u5B9A\u7684\u6700\u5C0F\u9600\u503C\u5206\u6210\u76F8\u5E94\u7684\u4EFD\u6570\uFF0C\u6216\u8005\u603B\u6570\u8D85\u8FC7\u4E86\u6309\u6700\u5927\u9600\u503C\u5206\u914D\u7684\u80FD\u529B',
      ),
      []
    );
  let i = e - r * t,
    l = Array.from({ length: t }, () => Math.random()),
    a = l.reduce((g, u) => g + u, 0),
    f = l.map((g) => {
      let u = Math.floor((g / a) * i),
        p = r + u;
      return (o !== void 0 && (p = Math.min(p, o)), p);
    }),
    m = f.reduce((g, u) => g + u, 0),
    b = 0;
  for (; m !== e; )
    (b >= f.length && (b = 0),
      m < e && (o === void 0 || f[b] < o) ? (f[b]++, m++) : m > e && f[b] > r && (f[b]--, m--),
      b++);
  switch (s) {
    case 'asc':
      f.sort((g, u) => g - u);
      break;
    case 'desc':
      f.sort((g, u) => u - g);
      break;
    case 'random':
      shuffleArray(f);
      break;
  }
  return f;
}

var arrayAllExist = (e, t) => {
    if (!isArray(e) || !isArray(t)) return !1;
    let n = new Set(e);
    return t.every((r) => n.has(r));
  },
  arrayAllExistDeep = (e, t) => t.every((n) => e.some((r) => deepEqual(r, n))),
  arrayAnyExist = (e, t) => {
    if (!isArray(e) || !isArray(t)) return !1;
    let n = new Set(e);
    return t.some((r) => n.has(r));
  };

function arrayAnyExistDeep(e, t) {
  return t.some((n) => e.some((r) => deepEqual(r, n)));
}

function extractFields(e, ...t) {
  let n = new Array(e.length);
  for (let r = 0; r < e.length; r++) {
    let o = {};
    for (let s of t) o[s] = e[r][s];
    n[r] = o;
  }
  return n;
}

var c = {};

tt(c, { Vue: () => Ct });

me(c, Ct);

var Rt = ['class', 'style'],
  kt = /^on[A-Z]/;

function entries(e) {
  return Object.keys(e).map((t) => [t, e[t]]);
}

function useAttrs(e = {}) {
  let t = (0, c.getCurrentInstance)();
  if (!t) return {};
  let { excludeListeners: n = !1, excludeKeys: r = [] } = e,
    o = (0, c.shallowRef)({}),
    s = r.concat(Rt);
  return (
    (t.attrs = (0, c.reactive)(t.attrs)),
    (0, c.watchEffect)(() => {
      let i = entries(t.attrs).reduce(
        (l, [a, f]) => (!s.includes(a) && !(n && kt.test(a)) && (l[a] = f), l),
        {},
      );
      o.value = i;
    }),
    o
  );
}

var useDynamicComponent = (e) => (0, c.h)((0, c.resolveComponent)(e));

function copyTextToClipboard(input, { target = isBrowser ? document.body : undefined } = {}) {
  const textarea = document.createElement('textarea');
  const activeElement = document.activeElement;
  const selection = document.getSelection();
  const ranges = selection
    ? Array.from({ length: selection.rangeCount }, (_, i) => selection.getRangeAt(i))
    : [];
  textarea.value = input;
  textarea.setAttribute('readonly', '');
  Object.assign(textarea.style, {
    contain: 'strict',
    position: 'absolute',
    left: '-9999px',
    fontSize: '12pt',
  });
  try {
    target?.append(textarea);
    textarea.select();
    textarea.selectionStart = 0;
    textarea.selectionEnd = input.length;
    return document.execCommand('copy');
  } finally {
    textarea.remove();
    if (selection) {
      selection.removeAllRanges();
      for (const range of ranges) selection.addRange(range);
    }
    if (activeElement instanceof HTMLElement) activeElement.focus();
  }
}

var useCopyToClipboard = (e = '') => {
  let t = (0, c.shallowRef)(e),
    n = (0, c.shallowRef)(!1);
  return (
    (0, c.watch)(
      t,
      (o = e) => {
        ((o = (0, c.isProxy)(o) || (0, c.isRef)(o) ? (0, c.unref)(o) : o),
          (o = o.trim().length === 0 ? e : o),
          o.length > 0 ? (n.value = copyTextToClipboard(o)) : (n.value = !1));
      },
      { flush: 'sync' },
    ),
    {
      clipboardValue: t,
      copied: n,
      update: (o) => {
        t.value = (0, c.isProxy)(o) || (0, c.isRef)(o) ? (0, c.unref)(o) : o;
        let s = t.value.trim().length === 0 ? e : t.value;
        s.length > 0 ? (n.value = copyTextToClipboard(s)) : (n.value = !1);
      },
    }
  );
};

function U(e) {
  (0, c.getCurrentInstance)() && (0, c.onUnmounted)(e);
}

function Ge(e) {
  return (0, c.getCurrentScope)() ? ((0, c.onScopeDispose)(e), !0) : !1;
}

function be(e) {
  let t = (0, c.toValue)(e);
  return t?.$el ?? t;
}

var useDark = (e) => {
  let t = e?.className ?? 'dark',
    n = (0, c.shallowRef)(!1),
    r,
    o = () => {
      let i = e?.selector
        ? e.selector === 'html'
          ? document.documentElement
          : document.body
        : document.documentElement;
      n.value = i.classList.contains(t);
    },
    s = () => {
      (e?.selector
        ? e.selector === 'html'
          ? document.documentElement
          : document.body
        : document.documentElement
      ).classList.toggle(t);
    };
  return (
    U(() => {
      r && (r.takeRecords(), r.disconnect());
    }),
    (0, c.onBeforeMount)(() => {
      let i = e?.selector
        ? e.selector === 'html'
          ? document.documentElement
          : document.body
        : document.documentElement;
      (o(),
        (r = new MutationObserver(o)),
        r.observe(i, { attributes: !0, attributeFilter: ['class'] }));
    }),
    { isDark: n, toggleDark: s }
  );
};

function Xe(e, t = 'px') {
  if (!e) return '';
  if (isString(e)) return e;
  if (isNumber(e)) return `${e}${t}`;
  console.warn('\u7ED1\u5B9A\u503C\u5FC5\u987B\u662F\u5B57\u7B26\u4E32\u6216\u6570\u5B57');
}

var useDraggable = (e, t, n) => {
  let r = n?.dragRefStyle ?? { cursor: 'move', userSelect: 'none' },
    o = n?.resize ?? !0,
    s = (0, c.ref)(!1),
    i = (0, c.ref)(!0),
    l = (0, c.reactive)({ offsetX: 0, offsetY: 0 }),
    a = null,
    activeDragCleanup,
    boundDragElement,
    disposed = false,
    f = (x) => {
      if (disposed || !i.value) return;
      activeDragCleanup?.();
      let E = x.clientX,
        k = x.clientY,
        { offsetX: w, offsetY: B } = l,
        Z = isString(e) ? document.querySelector(e) : e.value,
        $ = Z.getBoundingClientRect(),
        H = $.left,
        F = $.top,
        I = $.width,
        S = $.height,
        v = document.documentElement.clientWidth,
        D = document.documentElement.clientHeight,
        O = -H + w,
        T = -F + B,
        re = v - H - I + w,
        _ = D - F - S + B,
        P = (j) => {
          let xe = Math.min(Math.max(w + j.clientX - E, O), re),
            we = Math.min(Math.max(B + j.clientY - k, T), _);
          ((s.value = !0),
            (l.offsetX = xe),
            (l.offsetY = we),
            a !== null && cancelAnimationFrame(a),
            (a = requestAnimationFrame(() => {
              Z.style.transform = `translate(${Xe(xe)}, ${Xe(we)})`;
            })));
        },
        N = () => {
          activeDragCleanup = undefined;
          ((s.value = !1),
            document.removeEventListener('mousemove', P),
            document.removeEventListener('mouseup', N),
            a !== null && (cancelAnimationFrame(a), (a = null)));
        };
      activeDragCleanup = N;
      (document.addEventListener('mousemove', P), document.addEventListener('mouseup', N));
    },
    m = () => {
      (0, c.nextTick)(() => {
        if (disposed || !i.value) return;
        let x = isString(e) ? document.querySelector(e) : e.value,
          E = isString(t) ? document.querySelector(t) : t.value;
        E &&
          x &&
          (r &&
            Object.keys(r).forEach((k) => {
              let w = k;
              E.style[w] = r[w];
            }),
          boundDragElement?.removeEventListener('mousedown', f),
          (boundDragElement = E),
          E.addEventListener('mousedown', f));
      });
    },
    b = () => {
      activeDragCleanup?.();
      boundDragElement?.removeEventListener('mousedown', f);
      boundDragElement = undefined;
    },
    g = () => {
      activeDragCleanup?.();
      if (disposed) return;
      let x = isString(e) ? document.querySelector(e) : e.value;
      x &&
        ((l.offsetX = 0),
        (l.offsetY = 0),
        (x.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'),
        (0, c.nextTick)(() => {
          if (disposed) return;
          x.style.transform = 'none';
          let E = () => {
            ((x.style.transition = ''), x.removeEventListener('transitionend', E));
          };
          x.addEventListener('transitionend', E);
        }));
    },
    u = o
      ? debounce(
          () => {
            if (disposed || !i.value || s.value) return;
            let x = isString(e) ? document.querySelector(e) : e.value;
            if (x) {
              let E = x.getBoundingClientRect(),
                k = document.documentElement.clientWidth,
                w = document.documentElement.clientHeight;
              (E.left < 0 || E.top < 0 || E.right > k || E.bottom > w) && g();
            }
          },
          isBoolean(o) ? 60 : o,
        )
      : !1,
    p = () => {
      (b(), (s.value = !1), (i.value = !0), (l.offsetX = 0), (l.offsetY = 0));
    },
    d = isFunction(u),
    h = () => {
      (p(), m(), isBrowser && d && window.addEventListener('resize', u));
    },
    A = () => {
      (d && window.removeEventListener('resize', u),
        b(),
        (s.value = !1),
        (i.value = !0),
        m(),
        isBrowser && d && window.addEventListener('resize', u));
    },
    M = () => {
      (b(),
        (s.value = !1),
        (i.value = !1),
        isBrowser && d && window.removeEventListener('resize', u));
    };
  return (
    (0, c.onBeforeUnmount)(() => {
      disposed = true;
      (p(),
        isBrowser &&
          (d && window.removeEventListener('resize', u), a !== null && cancelAnimationFrame(a)));
    }),
    { draggable: i, dragging: s, transform: l, init: h, open: A, close: M, reset: g }
  );
};

function useResizeObserver(e, t, n = {}) {
  let { time: r = 40, box: o = 'content-box', immediate: s = !0 } = n,
    i,
    l = !s,
    stopped = false,
    a = debounce((h, A) => {
      if (stopped) return;
      l ? t(h, A) : (l = !0);
    }, r),
    f = () => {
      i && (i.disconnect(), (i = null));
    },
    m = (h) => typeof h == 'string',
    b = (h) => (isBrowser ? Array.from(document.querySelectorAll(h)) : []),
    g = (0, c.computed)(() =>
      m(e) ? b(e) : Array.isArray(e) ? e.map((h) => (m(h) ? b(h) : be(h))).flat() : [be(e)],
    ),
    u,
    p = () => {
      stopped = false;
      isBrowser &&
        (f(),
        u?.(),
        (u = (0, c.watch)(
          g,
          (h, A, M) => {
            (window &&
              h.length &&
              ((i = new ResizeObserver(a)),
              h.forEach((x) => {
                if (x && (i.observe(x, { box: o }), !l)) {
                  let E = x.getBoundingClientRect(),
                    k = {
                      target: x,
                      contentRect: E,
                      borderBoxSize: [{ inlineSize: E.width, blockSize: E.height }],
                      contentBoxSize: [{ inlineSize: E.width, blockSize: E.height }],
                      devicePixelContentBoxSize: [{ inlineSize: E.width, blockSize: E.height }],
                    };
                  t([k], i);
                }
              })),
              M(f));
          },
          { immediate: !0, flush: 'post', deep: !0 },
        )));
    };
  (0, c.nextTick)(() => {
    if (!stopped) p();
  });
  let d = () => {
    stopped = true;
    (f(), u && u());
  };
  return (Ge(d), { stop: d, restart: p });
}

function useGlobal() {
  let {
    appContext: {
      config: { globalProperties: e },
    },
  } = (0, c.getCurrentInstance)();
  return e;
}

function Pt(e) {
  return `${e}-${new Date().getTime()}-${Math.random().toString(36).substr(2, 9)}`;
}

function useLoader(e = !0) {
  function t(o, s) {
    if (!isBrowser) return;
    let l = (Array.isArray(o) ? o : [o])
      .map((a) =>
        (Array.isArray(a.src) ? a.src : [a.src]).map((m) => {
          let b = s === 'css' ? `link[href="${m}"]` : `script[src="${m}"]`,
            g = document.querySelector(b),
            u;
          return (
            g
              ? ((u = g.cloneNode(!1)), g.replaceWith(u))
              : (s === 'css'
                  ? ((u = document.createElement('link')), (u.rel = 'stylesheet'), (u.href = m))
                  : ((u = document.createElement('script')),
                    (u.type = 'text/javascript'),
                    (u.src = m)),
                (u.id = Pt(s === 'css' ? 'pure-utils-css' : 'pure-utils-script')),
                (a.element instanceof HTMLElement
                  ? a.element
                  : document[a.element ?? (s === 'css' ? 'head' : 'body')]
                ).appendChild(u)),
            new Promise((p, d) => {
              ((u.onload = () => p({ src: m, message: '\u52A0\u8F7D\u6210\u529F' })),
                (u.onerror = () => d({ src: m, message: '\u52A0\u8F7D\u5931\u8D25' })));
            })
          );
        }),
      )
      .flat();
    return Promise.all(l);
  }
  function n(o) {
    return t(o, 'css');
  }
  function r(o) {
    return t(o, 'script');
  }
  return (
    U(() => {
      isBrowser &&
        e &&
        document
          .querySelectorAll('link[id^="pure-utils-css"], script[id^="pure-utils-script"]')
          .forEach((o) => o.remove());
    }),
    { loadCss: n, loadScript: r }
  );
}

var easeInOutQuad = ({ timeElapsed: e, startValue: t, byValue: n, duration: r }) => (
    (e /= r / 2),
    e < 1 ? (n / 2) * e ** 2 + t : (-n / 2) * (--e * (e - 2) - 1) + t
  ),
  useScrollTo = (e) => {
    let t = (0, c.isProxy)(e.el) ? e.el : (0, c.ref)(e.el),
      n = e.to,
      r = e.directions,
      o = e?.duration ?? 0,
      s = (0, c.shallowRef)(!1),
      i = null,
      l = () => {
        let m = t.value;
        if (!m) return;
        i !== null && cancelAnimationFrame(i);
        let b = m.scrollHeight - m.clientHeight,
          g = m.scrollWidth - m.clientWidth,
          u = Math.max(0, Math.min(n, r === 'scrollTop' ? b : g));
        if (o === 0 || m[r] === u) {
          ((m[r] = u),
            e.callback &&
              isFunction(e.callback) &&
              (o === 0
                ? e.callback('\u6EDA\u52A8\u5B8C\u6BD5')
                : e.callback('\u65E0\u9700\u6EDA\u52A8')));
          return;
        }
        let p = m[r],
          d = u - p,
          A = Math.max(1, o / 60),
          M = 0,
          x = () => {
            M += A;
            let E = easeInOutQuad({ timeElapsed: M, startValue: p, byValue: d, duration: o });
            ((m[r] = E),
              M < o
                ? (i = requestAnimationFrame(x))
                : ((m[r] = u),
                  (i = null),
                  e.callback && isFunction(e.callback) && e.callback('\u6EDA\u52A8\u5B8C\u6BD5')));
          };
        i = requestAnimationFrame(x);
      };
    return {
      start: () => {
        s.value || ((s.value = !0), l());
      },
      stop: () => {
        (i !== null && (cancelAnimationFrame(i), (i = null)), (s.value = !1));
      },
    };
  };

var watermarkSequence = 0,
  useWatermark = (e = (0, c.ref)(isBrowser ? document.body : ''), t = !1) => {
    let n = `shw-watermark-${++watermarkSequence}`,
      observer,
      disposed = false,
      r = (0, c.shallowRef)(),
      o = (u) =>
        new Promise((p, d) => {
          if (!isBrowser) {
            d();
            return;
          }
          let h = new Image();
          (new URL(u, window.location.href).origin !== window.location.origin &&
            ((h.crossOrigin = 'anonymous'), (h.referrerPolicy = 'no-referrer')),
            (h.onload = () => p(h)),
            (h.onerror = d),
            (h.src = u));
        }),
      s = () => {
        observer?.disconnect();
        observer = undefined;
        if (isBrowser && t) window.removeEventListener('resize', a);
        const node = (0, c.unref)(r);
        r.value = undefined;
        node?.remove();
      };
    function i(u, p) {
      if (!isBrowser) return Promise.resolve('');
      let d = p?.width ?? 250,
        h = p?.height ?? 100,
        A = p?.verticalOffset ?? 0,
        M = d * 2,
        x = h + A;
      return new Promise((E) => {
        let k = document.createElement('canvas');
        ((k.width = M), (k.height = x));
        let w = k.getContext('2d');
        if (!w) {
          E('');
          return;
        }
        let B = ($, H) => {
          let F = ((p?.rotate ?? -10) * Math.PI) / 180,
            I = $ + d / 2,
            S = H + h / 2;
          if (
            (w.save(),
            w.translate(I, S),
            w.rotate(F),
            p?.globalAlpha && (w.globalAlpha = p.globalAlpha),
            p?.shadowConfig)
          ) {
            let { shadowConfig: P } = p;
            ((w.shadowBlur = P[0]),
              (w.shadowColor = P?.[1] ?? '#000000'),
              (w.shadowOffsetX = P?.[2] ?? 0),
              (w.shadowOffsetY = P?.[3] ?? 0));
          }
          w.font = p?.font ?? "normal 16px Arial, 'Courier New', 'Droid Sans', sans-serif";
          let v = u.includes(p?.wrap ?? '\u3001') ? 'center' : 'left',
            D = p?.textAlign ?? v;
          if (
            ((w.textAlign = D), (w.textBaseline = 'middle'), p?.gradient && isArray(p?.gradient))
          ) {
            let P = w.createLinearGradient(0, 0, d, 0);
            (p?.gradient.forEach((N) => {
              P.addColorStop(N.value, N.color);
            }),
              (w.fillStyle = P));
          } else w.fillStyle = p?.color ?? 'rgba(128, 128, 128, 0.3)';
          let O = u.split(p?.wrap ?? '\u3001'),
            T = p?.lineHeight ?? 20,
            _ = -((O.length * T) / 2) + T / 2;
          (O.forEach((P, N) => {
            let j;
            (D === 'left' || D === 'start'
              ? (j = -d / 4)
              : D === 'right' || D === 'end'
                ? (j = d / 4)
                : (j = 0),
              w.fillText(P, j, _ + N * T));
          }),
            w.restore());
        };
        (() => {
          let $ = p?.image;
          $
            ? o($)
                .then((H) => {
                  let F = p?.imageWidth ?? H.width,
                    I = p?.imageHeight ?? H.height;
                  (w.save(),
                    w.translate(d / 2, h / 2),
                    w.rotate(((p?.rotate ?? -10) * Math.PI) / 180),
                    w.drawImage(H, -F / 2, -I / 2, F, I),
                    w.restore(),
                    w.save(),
                    w.translate(d + d / 2, A + h / 2),
                    w.rotate(((p?.rotate ?? -10) * Math.PI) / 180),
                    w.drawImage(H, -F / 2, -I / 2, F, I),
                    w.restore(),
                    E(k.toDataURL('image/png')));
                })
                .catch(() => {
                  (B(0, 0), B(d, A), E(k.toDataURL('image/png')));
                })
            : (B(0, 0), B(d, A), E(k.toDataURL('image/png')));
        })();
      });
    }
    function l(u = {}) {
      let p = (0, c.unref)(r);
      p &&
        (isDef(u.width) && (p.style.width = `${u.width}px`),
        isDef(u.height) && (p.style.height = `${u.height}px`),
        isDef(u.str) &&
          i(u.str, u.attr).then((d) => {
            p.style.background = `url(${d}) left top repeat`;
          }));
    }
    let a = debounce(() => {
        let u = (0, c.unref)(e);
        if (!u) return;
        let { clientHeight: p, clientWidth: d } = u;
        l({ height: p, width: d });
      }),
      f = (u, p) => {
        if (!isBrowser || disposed) return;
        if ((0, c.unref)(r)) return (l({ str: u, attr: p }), n);
        let d = (0, c.unref)(e);
        if (!d) return;
        let h = document.createElement('div');
        if (
          ((r.value = h),
          (h.id = n),
          (h.style.pointerEvents = 'none'),
          (h.style.top = '0px'),
          (h.style.left = '0px'),
          (h.style.position = d === document.body ? 'fixed' : 'absolute'),
          (h.style.zIndex = p?.zIndex ?? '100000'),
          !d)
        )
          return n;
        let { clientHeight: A, clientWidth: M } = d;
        return (
          l({ str: u, width: M, height: A, attr: p }),
          d?.style?.position || (d.style.position = 'relative'),
          d.appendChild(h),
          n
        );
      };
    function b(text, attributes) {
      observer?.disconnect();
      const parent = (0, c.unref)(e);
      if (!parent || typeof MutationObserver === 'undefined') return;
      observer = new MutationObserver(() => {
        const node = (0, c.unref)(r);
        if (!disposed && node && !parent.contains(node)) {
          r.value = undefined;
          f(text, attributes);
        }
      });
      observer.observe(parent, { childList: true, subtree: true });
    }
    function g(text, attributes) {
      if (!isBrowser || disposed) return;
      observer?.disconnect();
      observer = undefined;
      f(text, attributes);
      if (t) window.addEventListener('resize', a);
      if (attributes?.forever) b(text, attributes);
    }
    U(() => {
      disposed = true;
      s();
    });
    return { clear: s, setWatermark: g };
  };

export {
  addClass,
  addZero,
  addition,
  allowMouseEvent,
  appendFieldByUniqueId,
  arrayAllExist,
  arrayAllExistDeep,
  arrayAnyExist,
  arrayAnyExistDeep,
  average,
  banMouseEvent,
  bd09togcj02,
  buildGUID,
  buildHierarchyTree,
  buildPrefixUUID,
  buildUUID,
  centsToDollars,
  cleanObject,
  clone,
  cloneDeep,
  convertImageToGray,
  convertPath,
  copyTextToClipboard,
  createFormData,
  createYear,
  darken,
  dataURLtoBlob,
  dateFormat,
  debounce,
  deepEqual,
  delObjectProperty,
  delay,
  deleteChildren,
  deviceDetection,
  divisionOperation,
  dollarsToCents,
  downloadByBase64,
  downloadByData,
  downloadByOnlineUrl,
  downloadByUrl,
  easeInOutQuad,
  entries,
  exceedMathMax,
  extractFields,
  extractPathList,
  formDataHander,
  formatBytes,
  gcj02tobd09,
  gcj02towgs84,
  getBrowserInfo,
  getClass,
  getCurrentDate,
  getCurrentWeek,
  getDecimalPlaces,
  getKeyList,
  getLocation,
  getNodeByUniqueId,
  getPerformance,
  getQueryMap,
  getSvgInfo,
  getTime,
  handleTree,
  hasCNChars,
  hasClass,
  hasOwnProp,
  hexToRgb,
  hideTextAtIndex,
  intersection,
  is,
  isAllEmpty,
  isAlphabets,
  isArray,
  isBase64,
  isBoolean,
  isBrowser,
  isClient,
  isDate,
  isDef,
  isElement,
  isEmail,
  isEmpty,
  isEqual,
  isEqualArray,
  isEqualObject,
  isExistSpace,
  isFunction,
  isHex,
  isHtml,
  isIncludeAllChildren,
  isInvalidValue,
  isJSON,
  isLeapYear,
  isLowerCase,
  isNull,
  isNullAndUnDef,
  isNullOrUnDef,
  isNumber,
  isObject,
  isPhone,
  isPlainObject,
  isPostCode,
  isPromise,
  isQQ,
  isRegExp,
  isRgb,
  isRgba,
  isServer,
  isString,
  isUnDef,
  isUpperCase,
  isUrl,
  isWindow,
  lighten,
  mapsEqual,
  max,
  min,
  monthDays,
  multiplication,
  nameCamelize,
  nameHyphenate,
  numberToChinese,
  openLink,
  out_of_china,
  priceToThousands,
  priceUppercase,
  randomColor,
  randomDivide,
  randomGradient,
  removeAllSpace,
  removeBothSidesSpace,
  removeClass,
  removeLeftSpace,
  removeRightSpace,
  rgbToHex,
  setsEqual,
  shouldCleanKey,
  shuffleArray,
  splitNum,
  storageLocal,
  storageSession,
  subAfter,
  subBefore,
  subBetween,
  subBothSides,
  subTextAddEllipsis,
  subtraction,
  sum,
  swapOrder,
  throttle,
  toSet,
  toggleClass,
  urlToBase64,
  useAttrs,
  useCopyToClipboard,
  useDark,
  useDraggable,
  useDynamicComponent,
  useGlobal,
  useLoader,
  useResizeObserver,
  useScrollTo,
  useWatermark,
  uuid,
  wgs84togcj02,
  withInstall,
  withInstallFunction,
  withNoopInstall,
};
