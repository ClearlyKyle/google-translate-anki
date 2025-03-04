/* Copyright 2014 Google */
(function() {
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  
	var fetchOptions = function(selectId, url, action, params = {}) {
	  var selectEl = document.getElementById(selectId);
	  return new Promise((resolve, reject) => {
		chrome.storage.local.get(selectId, (stored) => {
		  var storedVal = stored[selectId] || 'Basic';
		  fetch(url, { method: "POST", body: JSON.stringify({"action": action, "params": params}) }).then(r => r.json()).then(data => {
			for (var i = 0; i < data.length; i++) {
			  var name = data[i];
			  e = document.createElement("option");
			  e.value = name;
			  e.text = name;
			  if (name === storedVal) e.selected = true;
			  selectEl.appendChild(e);
			}
		  }).then(r => resolve(r)).catch(e => reject(e));
		});
	  });
	}
	var saveOption = function(selectId) {
	  var selectEl = document.getElementById(selectId);
	  return chrome.storage.local.set({[selectId]: selectEl.value})
	}
	document.addEventListener("DOMContentLoaded", function() {
	  var urlEl = document.getElementById('ankiConnectUrl');
	  var saveAnkiBtn = document.getElementById('saveAnkiBtn');
	  var modelName = document.getElementById('ankiModelNameSel');
	  
	  chrome.storage.local.get('ankiConnectUrl', ({ankiConnectUrl}) => {
		var url = ankiConnectUrl || 'http://localhost:8765';
		urlEl.classList.add('focused');
		urlEl.value = url;
  
		Promise.all([
		  fetchOptions('ankiDeckNameSel', url, 'deckNames'),
		  fetchOptions('ankiModelNameSel', url, 'modelNames'),
  
		  fetchOptions('ankiFieldSentence', url, 'modelFieldNames', {"modelName": "Basic"}),
		  fetchOptions('ankiFieldTranslation', url, 'modelFieldNames', {"modelName": "Basic"}),
		  fetchOptions('ankiFieldWord', url, 'modelFieldNames', {"modelName": "Basic"})
		])
		  .then(() => {      
			
			modelName.addEventListener("change", function() {
  
			  var array = ["ankiFieldSentence","ankiFieldTranslation","ankiFieldWord"];
  
			  for (var i = 0; i < array.length; i++) 
			  {
				document.getElementById(array[i]).length = 0;
				fetchOptions(array[i], url, 'modelFieldNames', {"modelName": document.getElementById('ankiModelNameSel').value});
  
				var option = document.createElement("option");
				option.text = "";
				document.getElementById(array[i]).appendChild(option);
			  } 
			});
  
			saveAnkiBtn.classList.remove('jfk-button-disabled');
			saveAnkiBtn.addEventListener('click', (e) => {
			  Promise.all([
				saveOption('ankiDeckNameSel'),
				saveOption('ankiModelNameSel'),
				saveOption('ankiConnectUrl'),
  
				saveOption('ankiFieldSentence'),
				saveOption('ankiFieldTranslation'),
				saveOption('ankiFieldWord')
			  ])
				.then(() => alert(`Options saved!`))
				.catch(error => alert(`Cannot save options: ${error}`))
			});
		  })
		  .catch(error => alert(`Cannot fetch options via AnkiConnect: ${error}`))
	  });
	});

  var g, k = this,
    m = function(a) {
      return "string" == typeof a
    },
    n = function() {},
    aa = function(a) {
      a.Oa = void 0;
      a.$ = function() {
        return a.Oa ? a.Oa : a.Oa = new a
      }
    },
    ba = function(a) {
      var b = typeof a;
      if ("object" == b)
        if (a) {
          if (a instanceof Array) return "array";
          if (a instanceof Object) return b;
          var c = Object.prototype.toString.call(a);
          if ("[object Window]" == c) return "object";
          if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
          if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
        } else return "null";
      else if ("function" == b && "undefined" == typeof a.call) return "object";
      return b
    },
    p = function(a) {
      return "array" == ba(a)
    },
    ca = function(a) {
      var b = ba(a);
      return "array" == b || "object" == b && "number" == typeof a.length
    },
    q = function(a) {
      return "function" == ba(a)
    },
    r = function(a) {
      var b = typeof a;
      return "object" == b && null != a || "function" == b
    },
    da = "closure_uid_" + (1E9 * Math.random() >>>
            0),
    ea = 0,
    fa = function(a, b, c) {
      return a.call.apply(a.bind, arguments)
    },
    ha = function(a, b, c) {
      if (!a) throw Error();
      if (2 < arguments.length) {
        var d = Array.prototype.slice.call(arguments, 2);
        return function() {
          var c = Array.prototype.slice.call(arguments);
          Array.prototype.unshift.apply(c, d);
          return a.apply(b, c)
        }
      }
      return function() {
        return a.apply(b, arguments)
      }
    },
    t = function(a, b, c) {
      Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? t = fa : t = ha;
      return t.apply(null, arguments)
    },
    v = function(a, b) {
      var c =
                Array.prototype.slice.call(arguments, 1);
      return function() {
        var b = c.slice();
        b.push.apply(b, arguments);
        return a.apply(this, b)
      }
    },
    ia = Date.now || function() {
      return +new Date
    },
    w = function(a, b) {
      function c() {}
      c.prototype = b.prototype;
      a.i = b.prototype;
      a.prototype = new c;
      a.prototype.constructor = a;
      a.wd = function(a, c, f) {
        for (var d = Array(arguments.length - 2), e = 2; e < arguments.length; e++) d[e - 2] = arguments[e];
        return b.prototype[c].apply(a, d)
      }
    };
  var ja = function(a) {
      a = String(a).toLowerCase().replace("_", "-");
      if ("zh-cn" == a) return "zh-CN";
      if ("zh-tw" == a) return "zh-TW";
      var b = a.indexOf("-");
      a = 0 <= b ? a.substring(0, b) : a;
      return "zh" == a ? "zh-CN" : a
    },
    x = function(a) {
      a = chrome.i18n.getMessage(a);
      return chrome.i18n.getMessage(a)
    };
  var y = function(a) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, y);
    else {
      var b = Error().stack;
      b && (this.stack = b)
    }
    a && (this.message = String(a))
  };
  w(y, Error);
  y.prototype.name = "CustomError";
  var ka;
  var la = function(a, b) {
      for (var c = a.split("%s"), d = "", e = Array.prototype.slice.call(arguments, 1); e.length && 1 < c.length;) d += c.shift() + e.shift();
      return d + c.join("%s")
    },
    ma = String.prototype.trim ? function(a) {
      return a.trim()
    } : function(a) {
      return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
    },
    ua = function(a) {
      if (!na.test(a)) return a; - 1 != a.indexOf("&") && (a = a.replace(oa, "&amp;")); - 1 != a.indexOf("<") && (a = a.replace(pa, "&lt;")); - 1 != a.indexOf(">") && (a = a.replace(qa, "&gt;")); - 1 != a.indexOf('"') && (a = a.replace(ra, "&quot;")); - 1 != a.indexOf("'") &&
                (a = a.replace(sa, "&#39;")); - 1 != a.indexOf("\x00") && (a = a.replace(ta, "&#0;"));
      return a
    },
    oa = /&/g,
    pa = /</g,
    qa = />/g,
    ra = /"/g,
    sa = /'/g,
    ta = /\x00/g,
    na = /[\x00&<>"']/,
    va = function(a, b) {
      return a < b ? -1 : a > b ? 1 : 0
    };
  var wa = function(a, b) {
    b.unshift(a);
    y.call(this, la.apply(null, b));
    b.shift()
  };
  w(wa, y);
  wa.prototype.name = "AssertionError";
  var xa = function(a, b, c, d) {
      var e = "Assertion failed";
      if (c) {
        e += ": " + c;
        var f = d
      } else a && (e += ": " + a, f = b);
      throw new wa("" + e, f || []);
    },
    z = function(a, b, c) {
      a || xa("", null, b, Array.prototype.slice.call(arguments, 2))
    },
    ya = function(a, b) {
      throw new wa("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
    },
    za = function(a, b, c) {
      m(a) || xa("Expected string but got %s: %s.", [ba(a), a], b, Array.prototype.slice.call(arguments, 2));
      return a
    },
    Aa = function(a, b, c) {
      q(a) || xa("Expected function but got %s: %s.", [ba(a), a], b, Array.prototype.slice.call(arguments,
        2))
    },
    Ba = function(a, b, c) {
      r(a) && 1 == a.nodeType || xa("Expected Element but got %s: %s.", [ba(a), a], b, Array.prototype.slice.call(arguments, 2))
    },
    Da = function(a, b, c, d) {
      a instanceof b || xa("Expected instanceof %s but got %s.", [Ca(b), Ca(a)], c, Array.prototype.slice.call(arguments, 3))
    },
    Ca = function(a) {
      return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a
    };
  var Ea = Array.prototype.indexOf ? function(a, b, c) {
      z(null != a.length);
      return Array.prototype.indexOf.call(a, b, c)
    } : function(a, b, c) {
      c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
      if (m(a)) return m(b) && 1 == b.length ? a.indexOf(b, c) : -1;
      for (; c < a.length; c++)
        if (c in a && a[c] === b) return c;
      return -1
    },
    A = Array.prototype.forEach ? function(a, b, c) {
      z(null != a.length);
      Array.prototype.forEach.call(a, b, c)
    } : function(a, b, c) {
      for (var d = a.length, e = m(a) ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a)
    },
    Fa = Array.prototype.filter ? function(a,
      b, c) {
      z(null != a.length);
      return Array.prototype.filter.call(a, b, c)
    } : function(a, b, c) {
      for (var d = a.length, e = [], f = 0, h = m(a) ? a.split("") : a, l = 0; l < d; l++)
        if (l in h) {
          var u = h[l];
          b.call(c, u, l, a) && (e[f++] = u)
        }
      return e
    },
    Ga = Array.prototype.map ? function(a, b, c) {
      z(null != a.length);
      return Array.prototype.map.call(a, b, c)
    } : function(a, b, c) {
      for (var d = a.length, e = Array(d), f = m(a) ? a.split("") : a, h = 0; h < d; h++) h in f && (e[h] = b.call(c, f[h], h, a));
      return e
    },
    Ha = Array.prototype.some ? function(a, b, c) {
      z(null != a.length);
      return Array.prototype.some.call(a,
        b, c)
    } : function(a, b, c) {
      for (var d = a.length, e = m(a) ? a.split("") : a, f = 0; f < d; f++)
        if (f in e && b.call(c, e[f], f, a)) return !0;
      return !1
    },
    Ia = Array.prototype.every ? function(a, b, c) {
      z(null != a.length);
      return Array.prototype.every.call(a, b, c)
    } : function(a, b, c) {
      for (var d = a.length, e = m(a) ? a.split("") : a, f = 0; f < d; f++)
        if (f in e && !b.call(c, e[f], f, a)) return !1;
      return !0
    },
    Ja = function(a, b) {
      return 0 <= Ea(a, b)
    },
    Ka = function(a, b) {
      b = Ea(a, b);
      var c;
      if (c = 0 <= b) z(null != a.length), Array.prototype.splice.call(a, b, 1);
      return c
    },
    La = function(a) {
      return Array.prototype.concat.apply([],
        arguments)
    },
    Ma = function(a) {
      var b = a.length;
      if (0 < b) {
        for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
        return c
      }
      return []
    },
    Na = function(a, b) {
      for (var c = 1; c < arguments.length; c++) {
        var d = arguments[c];
        if (ca(d)) {
          var e = a.length || 0,
            f = d.length || 0;
          a.length = e + f;
          for (var h = 0; h < f; h++) a[e + h] = d[h]
        } else a.push(d)
      }
    },
    Pa = function(a, b, c, d) {
      z(null != a.length);
      Array.prototype.splice.apply(a, Oa(arguments, 1))
    },
    Oa = function(a, b, c) {
      z(null != a.length);
      return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a, b,
        c)
    };
  var Qa = function(a, b, c) {
      for (var d in a) b.call(c, a[d], d, a)
    },
    Ra = function(a, b) {
      for (var c in a)
        if (a[c] == b) return !0;
      return !1
    },
    Sa = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),
    Ta = function(a, b) {
      for (var c, d, e = 1; e < arguments.length; e++) {
        d = arguments[e];
        for (c in d) a[c] = d[c];
        for (var f = 0; f < Sa.length; f++) c = Sa[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
      }
    },
    Ua = function(a) {
      var b = arguments.length;
      if (1 == b && p(arguments[0])) return Ua.apply(null, arguments[0]);
      if (b % 2) throw Error("Uneven number of arguments");
      for (var c = {}, d = 0; d < b; d += 2) c[arguments[d]] = arguments[d + 1];
      return c
    };
  var Wa = function() {
    this.a = "";
    this.b = Va
  };
  Wa.prototype.hb = !0;
  Wa.prototype.Za = function() {
    return this.a
  };
  Wa.prototype.c = function() {
    return 1
  };
  Wa.prototype.toString = function() {
    return "TrustedResourceUrl{" + this.a + "}"
  };
  var Xa = function(a) {
      if (a instanceof Wa && a.constructor === Wa && a.b === Va) return a.a;
      ya("expected object of type TrustedResourceUrl, got '" + a + "' of type " + ba(a));
      return "type_error:TrustedResourceUrl"
    },
    Va = {},
    Ya = function(a) {
      var b = new Wa;
      b.a = a;
      return b
    };
  var B;
  a: {
    var Za = k.navigator;
    if (Za) {
      var $a = Za.userAgent;
      if ($a) {
        B = $a;
        break a
      }
    }
    B = ""
  }
  var C = function(a) {
    return -1 != B.indexOf(a)
  };
  var ab = function() {
    return (C("Chrome") || C("CriOS")) && !C("Edge")
  };
  var cb = function() {
    this.a = "";
    this.f = bb;
    this.b = null
  };
  cb.prototype.c = function() {
    return this.b
  };
  cb.prototype.hb = !0;
  cb.prototype.Za = function() {
    return this.a
  };
  cb.prototype.toString = function() {
    return "SafeHtml{" + this.a + "}"
  };
  var bb = {},
    db = function(a) {
      var b = new cb;
      b.a = a;
      b.b = 0
    };
  db("<!DOCTYPE html>");
  db("");
  db("<br>");
  var eb = function() {
    return C("iPhone") && !C("iPod") && !C("iPad")
  };
  var fb = function(a) {
    fb[" "](a);
    return a
  };
  fb[" "] = n;
  var hb = function(a, b) {
    var c = gb;
    return Object.prototype.hasOwnProperty.call(c, a) ? c[a] : c[a] = b(a)
  };
  var ib = C("Opera"),
    D = C("Trident") || C("MSIE"),
    E = C("Edge"),
    F = C("Gecko") && !(-1 != B.toLowerCase().indexOf("webkit") && !C("Edge")) && !(C("Trident") || C("MSIE")) && !C("Edge"),
    H = -1 != B.toLowerCase().indexOf("webkit") && !C("Edge"),
    I = C("Macintosh"),
    jb = C("Windows"),
    kb = C("Android"),
    lb = eb(),
    mb = C("iPad"),
    nb = C("iPod"),
    ob = function() {
      var a = k.document;
      return a ? a.documentMode : void 0
    },
    pb;
  a: {
    var qb = "",
      rb = function() {
        var a = B;
        if (F) return /rv:([^\);]+)(\)|;)/.exec(a);
        if (E) return /Edge\/([\d\.]+)/.exec(a);
        if (D) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
        if (H) return /WebKit\/(\S+)/.exec(a);
        if (ib) return /(?:Version)[ \/]?(\S+)/.exec(a)
      }();rb && (qb = rb ? rb[1] : "");
    if (D) {
      var sb = ob();
      if (null != sb && sb > parseFloat(qb)) {
        pb = String(sb);
        break a
      }
    }
    pb = qb
  }
  var tb = pb,
    gb = {},
    J = function(a) {
      return hb(a, function() {
        for (var b = 0, c = ma(String(tb)).split("."), d = ma(String(a)).split("."), e = Math.max(c.length, d.length), f = 0; 0 == b && f < e; f++) {
          var h = c[f] || "",
            l = d[f] || "";
          do {
            h = /(\d*)(\D*)(.*)/.exec(h) || ["", "", "", ""];
            l = /(\d*)(\D*)(.*)/.exec(l) || ["", "", "", ""];
            if (0 == h[0].length && 0 == l[0].length) break;
            b = va(0 == h[1].length ? 0 : parseInt(h[1], 10), 0 == l[1].length ? 0 : parseInt(l[1], 10)) || va(0 == h[2].length, 0 == l[2].length) || va(h[2], l[2]);
            h = h[3];
            l = l[3]
          } while (0 == b)
        }
        return 0 <= b
      })
    },
    ub;
  var vb = k.document;
  ub = vb && D ? ob() || ("CSS1Compat" == vb.compatMode ? parseInt(tb, 10) : 5) : void 0;
  var wb = !D || 9 <= Number(ub),
    xb = !F && !D || D && 9 <= Number(ub) || F && J("1.9.1"),
    yb = D && !J("9");
  var zb = function(a, b) {
    var c = (c = a && a.ownerDocument) && (c.defaultView || c.parentWindow) || k;
    "undefined" != typeof c.HTMLScriptElement && "undefined" != typeof c.Location && "undefined" != typeof c.Element && z(a && (a instanceof c.HTMLScriptElement || !(a instanceof c.Location || a instanceof c.Element)), "Argument is not a %s (or a non-Element, non-Location mock); got: %s", "HTMLScriptElement", r(a) ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : void 0 === a ? "undefined" : null === a ? "null" : typeof a);
    a.src = Xa(b)
  };
  var Cb = function(a) {
      return a ? new Ab(Bb(a)) : ka || (ka = new Ab)
    },
    K = function(a, b) {
      return m(b) ? a.getElementById(b) : b
    },
    Db = function(a, b) {
      var c = b || document;
      if (c.getElementsByClassName) a = c.getElementsByClassName(a)[0];
      else {
        c = document;
        var d = b || c;
        if (d.querySelectorAll && d.querySelector && a) a = d.querySelector("" + (a ? "." + a : ""));
        else {
          b = b || c;
          if (b.querySelectorAll && b.querySelector && a) a = b.querySelectorAll("" + (a ? "." + a : ""));
          else if (a && b.getElementsByClassName) {
            var e = b.getElementsByClassName(a);
            a = e
          } else if (e = b.getElementsByTagName("*"),
          a) {
            var f = {};
            for (c = d = 0; b = e[c]; c++) {
              var h = b.className;
              "function" == typeof h.split && Ja(h.split(/\s+/), a) && (f[d++] = b)
            }
            f.length = d;
            a = f
          } else a = e;
          a = a[0] || null
        }
      }
      return a || null
    },
    Fb = function(a, b) {
      Qa(b, function(b, d) {
        b && b.hb && (b = b.Za());
        "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : Eb.hasOwnProperty(d) ? a.setAttribute(Eb[d], b) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, b) : a[d] = b
      })
    },
    Eb = {
      cellpadding: "cellPadding",
      cellspacing: "cellSpacing",
      colspan: "colSpan",
      frameborder: "frameBorder",
      height: "height",
      maxlength: "maxLength",
      nonce: "nonce",
      role: "role",
      rowspan: "rowSpan",
      type: "type",
      usemap: "useMap",
      valign: "vAlign",
      width: "width"
    },
    Hb = function(a, b, c) {
      return Gb(document, arguments)
    },
    Gb = function(a, b) {
      var c = String(b[0]),
        d = b[1];
      if (!wb && d && (d.name || d.type)) {
        c = ["<", c];
        d.name && c.push(' name="', ua(d.name), '"');
        if (d.type) {
          c.push(' type="', ua(d.type), '"');
          var e = {};
          Ta(e, d);
          delete e.type;
          d = e
        }
        c.push(">");
        c = c.join("")
      }
      c = a.createElement(c);
      d && (m(d) ? c.className = d : p(d) ? c.className =
                d.join(" ") : Fb(c, d));
      2 < b.length && Ib(a, c, b, 2);
      return c
    },
    Ib = function(a, b, c, d) {
      function e(c) {
        c && b.appendChild(m(c) ? a.createTextNode(c) : c)
      }
      for (; d < c.length; d++) {
        var f = c[d];
        if (!ca(f) || r(f) && 0 < f.nodeType) e(f);
        else {
          a: {
            if (f && "number" == typeof f.length) {
              if (r(f)) {
                var h = "function" == typeof f.item || "string" == typeof f.item;
                break a
              }
              if (q(f)) {
                h = "function" == typeof f.item;
                break a
              }
            }
            h = !1
          }
          A(h ? Ma(f) : f, e)
        }
      }
    },
    Jb = function(a, b) {
      Ib(Bb(a), a, arguments, 1)
    },
    Kb = function(a) {
      for (var b; b = a.firstChild;) a.removeChild(b)
    },
    Lb = function(a) {
      a &&
                a.parentNode && a.parentNode.removeChild(a)
    },
    Mb = function(a, b) {
      if (!a || !b) return !1;
      if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
      if ("undefined" != typeof a.compareDocumentPosition) return a == b || !!(a.compareDocumentPosition(b) & 16);
      for (; b && a != b;) b = b.parentNode;
      return b == a
    },
    Bb = function(a) {
      z(a, "Node cannot be null or undefined.");
      return 9 == a.nodeType ? a : a.ownerDocument || a.document
    },
    L = function(a, b) {
      z(null != a, "goog.dom.setTextContent expects a non-null value for node");
      if ("textContent" in a) a.textContent =
                b;
      else if (3 == a.nodeType) a.data = String(b);
      else if (a.firstChild && 3 == a.firstChild.nodeType) {
        for (; a.lastChild != a.firstChild;) a.removeChild(a.lastChild);
        a.firstChild.data = String(b)
      } else {
        Kb(a);
        var c = Bb(a);
        a.appendChild(c.createTextNode(String(b)))
      }
    },
    Nb = {
      SCRIPT: 1,
      STYLE: 1,
      HEAD: 1,
      IFRAME: 1,
      OBJECT: 1
    },
    Ob = {
      IMG: " ",
      BR: "\n"
    },
    Pb = function(a) {
      if (D && !J("9")) {
        var b = a.getAttributeNode("tabindex");
        b = null != b && b.specified
      } else b = a.hasAttribute("tabindex");
      b && (a = a.tabIndex, b = "number" == typeof a && 0 <= a && 32768 > a);
      return b
    },
    Qb =
        function(a, b) {
          b ? a.tabIndex = 0 : (a.tabIndex = -1, a.removeAttribute("tabIndex"))
        },
    Sb = function(a) {
      var b = [];
      Rb(a, b, !1);
      return b.join("")
    },
    Rb = function(a, b, c) {
      if (!(a.nodeName in Nb))
        if (3 == a.nodeType) c ? b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : b.push(a.nodeValue);
        else if (a.nodeName in Ob) b.push(Ob[a.nodeName]);
        else
          for (a = a.firstChild; a;) Rb(a, b, c), a = a.nextSibling
    },
    Ab = function(a) {
      this.a = a || k.document || document
    };
  g = Ab.prototype;
  g.h = function(a) {
    return K(this.a, a)
  };
  g.setProperties = Fb;
  g.ta = function(a, b, c) {
    return Gb(this.a, arguments)
  };
  g.appendChild = function(a, b) {
    a.appendChild(b)
  };
  g.rb = Jb;
  g.getChildren = function(a) {
    return xb && void 0 != a.children ? a.children : Fa(a.childNodes, function(a) {
      return 1 == a.nodeType
    })
  };
  g.contains = Mb;
  var Tb = function(a, b, c) {
    this.f = c;
    this.c = a;
    this.g = b;
    this.b = 0;
    this.a = null
  };
  Tb.prototype.get = function() {
    if (0 < this.b) {
      this.b--;
      var a = this.a;
      this.a = a.next;
      a.next = null
    } else a = this.c();
    return a
  };
  var Ub = function(a, b) {
    a.g(b);
    a.b < a.f && (a.b++, b.next = a.a, a.a = b)
  };
  var Vb = function(a) {
      k.setTimeout(function() {
        throw a;
      }, 0)
    },
    Wb, Xb = function() {
      var a = k.MessageChannel;
      "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !C("Presto") && (a = function() {
        var a = document.createElement("IFRAME");
        a.style.display = "none";
        a.src = "";
        document.documentElement.appendChild(a);
        var b = a.contentWindow;
        a = b.document;
        a.open();
        a.write("");
        a.close();
        var c = "callImmediate" + Math.random(),
          d = "file:" == b.location.protocol ? "*" : b.location.protocol + "//" + b.location.host;
        a = t(function(a) {
          if (("*" == d || a.origin == d) && a.data == c) this.port1.onmessage()
        }, this);
        b.addEventListener("message", a, !1);
        this.port1 = {};
        this.port2 = {
          postMessage: function() {
            b.postMessage(c, d)
          }
        }
      });
      if ("undefined" !== typeof a && !C("Trident") && !C("MSIE")) {
        var b = new a,
          c = {},
          d = c;
        b.port1.onmessage = function() {
          if (void 0 !== c.next) {
            c = c.next;
            var a = c.Xa;
            c.Xa = null;
            a()
          }
        };
        return function(a) {
          d.next = {
            Xa: a
          };
          d = d.next;
          b.port2.postMessage(0)
        }
      }
      return "undefined" !== typeof document && "onreadystatechange" in document.createElement("SCRIPT") ?
        function(a) {
          var b = document.createElement("SCRIPT");
          b.onreadystatechange = function() {
            b.onreadystatechange = null;
            b.parentNode.removeChild(b);
            b = null;
            a();
            a = null
          };
          document.documentElement.appendChild(b)
        } : function(a) {
          k.setTimeout(a, 0)
        }
    };
  var Yb = function() {
      this.b = this.a = null
    },
    $b = new Tb(function() {
      return new Zb
    }, function(a) {
      a.reset()
    }, 100);
  Yb.prototype.add = function(a, b) {
    var c = $b.get();
    c.set(a, b);
    this.b ? this.b.next = c : (z(!this.a), this.a = c);
    this.b = c
  };
  Yb.prototype.remove = function() {
    var a = null;
    this.a && (a = this.a, this.a = this.a.next, this.a || (this.b = null), a.next = null);
    return a
  };
  var Zb = function() {
    this.next = this.b = this.a = null
  };
  Zb.prototype.set = function(a, b) {
    this.a = a;
    this.b = b;
    this.next = null
  };
  Zb.prototype.reset = function() {
    this.next = this.b = this.a = null
  };
  var ec = function(a, b) {
      ac || bc();
      cc || (ac(), cc = !0);
      dc.add(a, b)
    },
    ac, bc = function() {
      if (-1 != String(k.Promise).indexOf("[native code]")) {
        var a = k.Promise.resolve(void 0);
        ac = function() {
          a.then(fc)
        }
      } else ac = function() {
        var a = fc;
        !q(k.setImmediate) || k.Window && k.Window.prototype && !C("Edge") && k.Window.prototype.setImmediate == k.setImmediate ? (Wb || (Wb = Xb()), Wb(a)) : k.setImmediate(a)
      }
    },
    cc = !1,
    dc = new Yb,
    fc = function() {
      for (var a; a = dc.remove();) {
        try {
          a.a.call(a.b)
        } catch (b) {
          Vb(b)
        }
        Ub($b, a)
      }
      cc = !1
    };
  var gc = function(a) {
      a.prototype.then = a.prototype.then;
      a.prototype.$goog_Thenable = !0
    },
    hc = function(a) {
      if (!a) return !1;
      try {
        return !!a.$goog_Thenable
      } catch (b) {
        return !1
      }
    };
  var M = function(a, b) {
      this.a = 0;
      this.l = void 0;
      this.f = this.b = this.c = null;
      this.g = this.j = !1;
      if (a != n) try {
        var c = this;
        a.call(b, function(a) {
          ic(c, 2, a)
        }, function(a) {
          if (!(a instanceof jc)) try {
            if (a instanceof Error) throw a;
            throw Error("Promise rejected.");
          } catch (e) {}
          ic(c, 3, a)
        })
      } catch (d) {
        ic(this, 3, d)
      }
    },
    kc = function() {
      this.next = this.f = this.c = this.b = this.a = null;
      this.g = !1
    };
  kc.prototype.reset = function() {
    this.f = this.c = this.b = this.a = null;
    this.g = !1
  };
  var lc = new Tb(function() {
      return new kc
    }, function(a) {
      a.reset()
    }, 100),
    mc = function(a, b, c) {
      var d = lc.get();
      d.b = a;
      d.c = b;
      d.f = c;
      return d
    };
  M.prototype.then = function(a, b, c) {
    null != a && Aa(a, "opt_onFulfilled should be a function.");
    null != b && Aa(b, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");
    return nc(this, q(a) ? a : null, q(b) ? b : null, c)
  };
  gc(M);
  M.prototype.cancel = function(a) {
    0 == this.a && ec(function() {
      var b = new jc(a);
      oc(this, b)
    }, this)
  };
  var oc = function(a, b) {
      if (0 == a.a)
        if (a.c) {
          var c = a.c;
          if (c.b) {
            for (var d = 0, e = null, f = null, h = c.b; h && (h.g || (d++, h.a == a && (e = h), !(e && 1 < d))); h = h.next) e || (f = h);
            e && (0 == c.a && 1 == d ? oc(c, b) : (f ? (d = f, z(c.b), z(null != d), d.next == c.f && (c.f = d), d.next = d.next.next) : pc(c), qc(c, e, 3, b)))
          }
          a.c = null
        } else ic(a, 3, b)
    },
    sc = function(a, b) {
      a.b || 2 != a.a && 3 != a.a || rc(a);
      z(null != b.b);
      a.f ? a.f.next = b : a.b = b;
      a.f = b
    },
    nc = function(a, b, c, d) {
      var e = mc(null, null, null);
      e.a = new M(function(a, h) {
        e.b = b ? function(c) {
          try {
            var e = b.call(d, c);
            a(e)
          } catch (G) {
            h(G)
          }
        } : a;
        e.c = c ? function(b) {
          try {
            var e = c.call(d, b);
            void 0 === e && b instanceof jc ? h(b) : a(e)
          } catch (G) {
            h(G)
          }
        } : h
      });
      e.a.c = a;
      sc(a, e);
      return e.a
    };
  M.prototype.s = function(a) {
    z(1 == this.a);
    this.a = 0;
    ic(this, 2, a)
  };
  M.prototype.u = function(a) {
    z(1 == this.a);
    this.a = 0;
    ic(this, 3, a)
  };
  var ic = function(a, b, c) {
      if (0 == a.a) {
        a === c && (b = 3, c = new TypeError("Promise cannot resolve to itself"));
        a.a = 1;
        a: {
          var d = c,
            e = a.s,
            f = a.u;
          if (d instanceof M) {
            null != e && Aa(e, "opt_onFulfilled should be a function.");
            null != f && Aa(f, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");
            sc(d, mc(e || n, f || null, a));
            var h = !0
          } else if (hc(d)) d.then(e, f, a),
          h = !0;
          else {
            if (r(d)) try {
              var l = d.then;
              if (q(l)) {
                tc(d, l, e, f, a);
                h = !0;
                break a
              }
            } catch (u) {
              f.call(a, u);
              h = !0;
              break a
            }
            h = !1
          }
        }
        h ||
                    (a.l = c, a.a = b, a.c = null, rc(a), 3 != b || c instanceof jc || uc(a, c))
      }
    },
    tc = function(a, b, c, d, e) {
      var f = !1,
        h = function(a) {
          f || (f = !0, c.call(e, a))
        },
        l = function(a) {
          f || (f = !0, d.call(e, a))
        };
      try {
        b.call(a, h, l)
      } catch (u) {
        l(u)
      }
    },
    rc = function(a) {
      a.j || (a.j = !0, ec(a.o, a))
    },
    pc = function(a) {
      var b = null;
      a.b && (b = a.b, a.b = b.next, b.next = null);
      a.b || (a.f = null);
      null != b && z(null != b.b);
      return b
    };
  M.prototype.o = function() {
    for (var a; a = pc(this);) qc(this, a, this.a, this.l);
    this.j = !1
  };
  var qc = function(a, b, c, d) {
      if (3 == c && b.c && !b.g)
        for (; a && a.g; a = a.c) a.g = !1;
      if (b.a) b.a.c = null, vc(b, c, d);
      else try {
        b.g ? b.b.call(b.f) : vc(b, c, d)
      } catch (e) {
        wc.call(null, e)
      }
      Ub(lc, b)
    },
    vc = function(a, b, c) {
      2 == b ? a.b.call(a.f, c) : a.c && a.c.call(a.f, c)
    },
    uc = function(a, b) {
      a.g = !0;
      ec(function() {
        a.g && wc.call(null, b)
      })
    },
    wc = Vb,
    jc = function(a) {
      y.call(this, a)
    };
  w(jc, y);
  jc.prototype.name = "cancel";
  /*
     Portions of this code are from MochiKit, received by
     The Closure Authors under the MIT license. All other code is Copyright
     2005-2009 The Closure Authors. All Rights Reserved.
    */
  var N = function(a, b) {
    this.g = [];
    this.L = a;
    this.J = b || null;
    this.f = this.a = !1;
    this.c = void 0;
    this.s = this.u = this.l = !1;
    this.j = 0;
    this.b = null;
    this.o = 0
  };
  N.prototype.cancel = function(a) {
    if (this.a) this.c instanceof N && this.c.cancel();
    else {
      if (this.b) {
        var b = this.b;
        delete this.b;
        a ? b.cancel(a) : (b.o--, 0 >= b.o && b.cancel())
      }
      this.L ? this.L.call(this.J, this) : this.s = !0;
      this.a || xc(this, new yc)
    }
  };
  N.prototype.C = function(a, b) {
    this.l = !1;
    zc(this, a, b)
  };
  var zc = function(a, b, c) {
      a.a = !0;
      a.c = c;
      a.f = !b;
      Ac(a)
    },
    Cc = function(a) {
      if (a.a) {
        if (!a.s) throw new Bc;
        a.s = !1
      }
    },
    xc = function(a, b) {
      Cc(a);
      Dc(b);
      zc(a, !1, b)
    },
    Dc = function(a) {
      z(!(a instanceof N), "An execution sequence may not be initiated with a blocking Deferred.")
    },
    Ec = function(a, b, c, d) {
      z(!a.u, "Blocking Deferreds can not be re-used");
      a.g.push([b, c, d]);
      a.a && Ac(a)
    };
  N.prototype.then = function(a, b, c) {
    var d, e, f = new M(function(a, b) {
      d = a;
      e = b
    });
    Ec(this, d, function(a) {
      a instanceof yc ? f.cancel() : e(a)
    });
    return f.then(a, b, c)
  };
  gc(N);
  N.prototype.isError = function(a) {
    return a instanceof Error
  };
  var Fc = function(a) {
      return Ha(a.g, function(a) {
        return q(a[1])
      })
    },
    Ac = function(a) {
      if (a.j && a.a && Fc(a)) {
        var b = a.j,
          c = Gc[b];
        c && (k.clearTimeout(c.B), delete Gc[b]);
        a.j = 0
      }
      a.b && (a.b.o--, delete a.b);
      b = a.c;
      for (var d = c = !1; a.g.length && !a.l;) {
        var e = a.g.shift(),
          f = e[0],
          h = e[1];
        e = e[2];
        if (f = a.f ? h : f) try {
          var l = f.call(e || a.J, b);
          void 0 !== l && (a.f = a.f && (l == b || a.isError(l)), a.c = b = l);
          if (hc(b) || "function" === typeof k.Promise && b instanceof k.Promise) d = !0, a.l = !0
        } catch (u) {
          b = u, a.f = !0, Fc(a) || (c = !0)
        }
      }
      a.c = b;
      d && (l = t(a.C, a, !0), d = t(a.C, a, !1), b instanceof N ? (Ec(b, l, d), b.u = !0) : b.then(l, d));
      c && (b = new Hc(b), Gc[b.B] = b, a.j = b.B)
    },
    Bc = function() {
      y.call(this)
    };
  w(Bc, y);
  Bc.prototype.message = "Deferred has already fired";
  Bc.prototype.name = "AlreadyCalledError";
  var yc = function() {
    y.call(this)
  };
  w(yc, y);
  yc.prototype.message = "Deferred was canceled";
  yc.prototype.name = "CanceledError";
  var Hc = function(a) {
    this.B = k.setTimeout(t(this.b, this), 0);
    this.a = a
  };
  Hc.prototype.b = function() {
    z(Gc[this.B], "Cannot throw an error that is not scheduled.");
    delete Gc[this.B];
    throw this.a;
  };
  var Gc = {};
  var Mc = function(a, b) {
      var c = b || {};
      b = c.document || document;
      var d = Xa(a),
        e = document.createElement("SCRIPT"),
        f = {
          kb: e,
          Ca: void 0
        },
        h = new N(Ic, f),
        l = null,
        u = null != c.timeout ? c.timeout : 5E3;
      0 < u && (l = window.setTimeout(function() {
        Jc(e, !0);
        xc(h, new Kc(1, "Timeout reached for loading script " + d))
      }, u), f.Ca = l);
      e.onload = e.onreadystatechange = function() {
        e.readyState && "loaded" != e.readyState && "complete" != e.readyState || (Jc(e, c.qb || !1, l), Cc(h), Dc(null), zc(h, !0, null))
      };
      e.onerror = function() {
        Jc(e, !0, l);
        xc(h, new Kc(0, "Error while loading script " +
                    d))
      };
      f = c.attributes || {};
      Ta(f, {
        type: "text/javascript",
        charset: "UTF-8"
      });
      Fb(e, f);
      zb(e, a);
      Lc(b).appendChild(e);
      return h
    },
    Lc = function(a) {
      var b;
      return (b = (a || document).getElementsByTagName("HEAD")) && 0 != b.length ? b[0] : a.documentElement
    },
    Ic = function() {
      if (this && this.kb) {
        var a = this.kb;
        a && "SCRIPT" == a.tagName && Jc(a, !0, this.Ca)
      }
    },
    Jc = function(a, b, c) {
      null != c && k.clearTimeout(c);
      a.onload = n;
      a.onerror = n;
      a.onreadystatechange = n;
      b && window.setTimeout(function() {
        Lb(a)
      }, 0)
    },
    Kc = function(a, b) {
      var c = "Jsloader error (code #" +
                a + ")";
      b && (c += ": " + b);
      y.call(this, c);
      this.code = a
    };
  w(Kc, y);
  var Nc = function(a, b) {
      this.b = a instanceof Wa ? a : Ya(String(a));
      this.a = b ? b : "callback";
      this.Ca = 5E3
    },
    Oc = 0;
  Nc.prototype.send = function(a, b, c, d) {
    if (a) {
      var e = {};
      for (f in a) e[f] = a[f];
      a = e
    } else a = {};
    d = d || "_" + (Oc++).toString(36) + ia().toString(36);
    e = "_callbacks___" + d;
    b && (k[e] = Pc(d, b), a[this.a] = e);
    b = {
      timeout: this.Ca,
      qb: !0
    };
    e = Xa(this.b);
    var f = /\?/.test(e) ? "&" : "?";
    for (u in a)
      for (var h = p(a[u]) ? a[u] : [a[u]], l = 0; l < h.length; l++) null != h[l] && (e += f + encodeURIComponent(u) + "=" + encodeURIComponent(String(h[l])), f = "&");
    var u = Ya(e);
    u = Mc(u, b);
    Ec(u, null, Qc(d, a, c), void 0);
    return {
      B: d,
      Ya: u
    }
  };
  Nc.prototype.cancel = function(a) {
    a && (a.Ya && a.Ya.cancel(), a.B && Rc(a.B, !1))
  };
  var Qc = function(a, b, c) {
      return function() {
        Rc(a, !1);
        c && c(b)
      }
    },
    Pc = function(a, b) {
      return function(c) {
        Rc(a, !0);
        b.apply(void 0, arguments)
      }
    },
    Rc = function(a, b) {
      a = "_callbacks___" + a;
      if (k[a])
        if (b) try {
          delete k[a]
        } catch (c) {
          k[a] = void 0
        } else k[a] = n
    };
  var Tc = function(a) {
      this.g = [];
      chrome.i18n.getAcceptLanguages(t(this.o, this));
      this.a = "";
      this.b = "1";
      this.c = !0;
      this.f = [];
      this.l = !!a;
      chrome.storage.local.get(null, t(this.u, this));
      Sc(this)
    },
    Uc = !!chrome.i18n.detectLanguage;
  Tc.prototype.u = function(a) {
    "gtxTargetLang" in a && (this.a = a.gtxTargetLang);
    "gtxShowBubble" in a && (this.b = a.gtxShowBubble);
    "gtxDetectLanguage" in a && (this.c = a.gtxDetectLanguage);
    "gtxSourceLangList" in a && Vc(this, a.gtxSourceLangList);
    "gtxTargetLangList" in a && (this.f = Vc(this, a.gtxTargetLangList));
    this.loaded = !0;
    if (this.l) {
      var b = (new Date).getTime(),
        c = "gtxTimeStamp" in a ? a.gtxTimeStamp : 0,
        d = chrome.i18n.getUILanguage ? chrome.i18n.getUILanguage() : "en";
      a = "gtxDisplayLanguage" in a ? a.gtxDisplayLanguage : "";
      (864E5 < Math.abs(b -
                c) || d != a) && (new Nc("https://translate.googleapis.com/translate_a/l", "cb")).send({
        client: "gtx",
        hl: d
      }, t(this.s, this, d))
    }
  };
  var Vc = function(a, b) {
    var c = [],
      d;
    for (d in b) c.push({
      code: d,
      name: b[d]
    });
    c.sort(a.j);
    a = {};
    for (b = 0; b < c.length; b++) a[c[b].code] = c[b].name;
    return a
  };
  Tc.prototype.j = function(a, b) {
    return a.name.localeCompare(b.name)
  };
  var Wc = function(a) {
      var b = {};
      b.gtxTargetLang = a.a;
      b.gtxShowBubble = a.b;
      b.gtxDetectLanguage = a.c;
      chrome.storage.local.set(b)
    },
    Sc = function(a) {
      chrome.storage.onChanged.addListener(function(b) {
        b.gtxTargetLang && (a.a = b.gtxTargetLang.newValue);
        b.gtxShowBubble && (a.b = b.gtxShowBubble.newValue)
      })
    };
  Tc.prototype.o = function(a) {
    this.g = a
  };
  Tc.prototype.s = function(a, b) {
    var c = (new Date).getTime(),
      d = {};
    d.gtxSourceLangList = b.sl;
    d.gtxTargetLangList = b.tl;
    d.gtxDisplayLanguage = a;
    d.gtxTimeStamp = c;
    chrome.storage.local.set(d);
    this.f = b.tl
  };
  var Xc = Object.freeze || function(a) {
    return a
  };
  var Yc = !D || 9 <= Number(ub),
    Zc = !D || 9 <= Number(ub),
    $c = D && !J("9");
  !H || J("528");
  F && J("1.9b") || D && J("8") || ib && J("9.5") || H && J("528");
  F && !J("8") || D && J("9");
  var ad = function() {
    if (!k.addEventListener || !Object.defineProperty) return !1;
    var a = !1,
      b = Object.defineProperty({}, "passive", {
        get: function() {
          a = !0
        }
      });
    k.addEventListener("test", n, b);
    k.removeEventListener("test", n, b);
    return a
  }();
  var O = function() {
    this.C = this.C;
    this.u = this.u
  };
  O.prototype.C = !1;
  O.prototype.na = function() {
    this.C || (this.C = !0, this.v())
  };
  var bd = function(a, b) {
    a.C ? b() : (a.u || (a.u = []), a.u.push(b))
  };
  O.prototype.v = function() {
    if (this.u)
      for (; this.u.length;) this.u.shift()()
  };
  var cd = function(a) {
    a && "function" == typeof a.na && a.na()
  };
  var dd = function(a, b) {
    this.type = a;
    this.b = this.target = b;
    this.f = !1;
    this.jb = !0
  };
  dd.prototype.j = function() {
    this.f = !0
  };
  dd.prototype.g = function() {
    this.jb = !1
  };
  var P = function(a, b) {
    dd.call(this, a ? a.type : "");
    this.relatedTarget = this.b = this.target = null;
    this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
    this.key = "";
    this.a = 0;
    this.l = this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
    this.pointerId = 0;
    this.pointerType = "";
    this.c = null;
    if (a) {
      var c = this.type = a.type,
        d = a.changedTouches ? a.changedTouches[0] : null;
      this.target = a.target || a.srcElement;
      this.b = b;
      if (b = a.relatedTarget) {
        if (F) {
          a: {
            try {
              fb(b.nodeName);
              var e = !0;
              break a
            } catch (f) {}
            e = !1
          }
          e || (b = null)
        }
      } else "mouseover" ==
                c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
      this.relatedTarget = b;
      null === d ? (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0) : (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0);
      this.button = a.button;
      this.a = a.keyCode || 0;
      this.key = a.key || "";
      this.ctrlKey = a.ctrlKey;
      this.altKey = a.altKey;
      this.shiftKey =
                a.shiftKey;
      this.metaKey = a.metaKey;
      this.l = I ? a.metaKey : a.ctrlKey;
      this.pointerId = a.pointerId || 0;
      this.pointerType = m(a.pointerType) ? a.pointerType : ed[a.pointerType] || "";
      this.c = a;
      a.defaultPrevented && this.g()
    }
  };
  w(P, dd);
  var fd = Xc([1, 4, 2]),
    ed = Xc({
      2: "touch",
      3: "pen",
      4: "mouse"
    }),
    gd = function(a) {
      return Yc ? 0 == a.c.button : "click" == a.type ? !0 : !!(a.c.button & fd[0])
    };
  P.prototype.j = function() {
    P.i.j.call(this);
    this.c.stopPropagation ? this.c.stopPropagation() : this.c.cancelBubble = !0
  };
  P.prototype.g = function() {
    P.i.g.call(this);
    var a = this.c;
    if (a.preventDefault) a.preventDefault();
    else if (a.returnValue = !1, $c) try {
      if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) a.keyCode = -1
    } catch (b) {}
  };
  var hd = "closure_listenable_" + (1E6 * Math.random() | 0),
    id = function(a) {
      return !(!a || !a[hd])
    },
    jd = 0;
  var kd = function(a, b, c, d, e) {
      this.listener = a;
      this.proxy = null;
      this.src = b;
      this.type = c;
      this.capture = !!d;
      this.xa = e;
      this.key = ++jd;
      this.removed = this.ra = !1
    },
    ld = function(a) {
      a.removed = !0;
      a.listener = null;
      a.proxy = null;
      a.src = null;
      a.xa = null
    };
  var md = function(a) {
    this.src = a;
    this.a = {};
    this.b = 0
  };
  md.prototype.add = function(a, b, c, d, e) {
    var f = a.toString();
    a = this.a[f];
    a || (a = this.a[f] = [], this.b++);
    var h = nd(a, b, d, e); - 1 < h ? (b = a[h], c || (b.ra = !1)) : (b = new kd(b, this.src, f, !!d, e), b.ra = c, a.push(b));
    return b
  };
  md.prototype.remove = function(a, b, c, d) {
    a = a.toString();
    if (!(a in this.a)) return !1;
    var e = this.a[a];
    b = nd(e, b, c, d);
    return -1 < b ? (ld(e[b]), z(null != e.length), Array.prototype.splice.call(e, b, 1), 0 == e.length && (delete this.a[a], this.b--), !0) : !1
  };
  var od = function(a, b) {
    var c = b.type;
    c in a.a && Ka(a.a[c], b) && (ld(b), 0 == a.a[c].length && (delete a.a[c], a.b--))
  };
  md.prototype.removeAll = function(a) {
    a = a && a.toString();
    var b = 0,
      c;
    for (c in this.a)
      if (!a || c == a) {
        for (var d = this.a[c], e = 0; e < d.length; e++) ++b, ld(d[e]);
        delete this.a[c];
        this.b--
      }
    return b
  };
  var pd = function(a, b, c, d, e) {
      a = a.a[b.toString()];
      b = -1;
      a && (b = nd(a, c, d, e));
      return -1 < b ? a[b] : null
    },
    nd = function(a, b, c, d) {
      for (var e = 0; e < a.length; ++e) {
        var f = a[e];
        if (!f.removed && f.listener == b && f.capture == !!c && f.xa == d) return e
      }
      return -1
    };
  var qd = "closure_lm_" + (1E6 * Math.random() | 0),
    rd = {},
    sd = 0,
    Q = function(a, b, c, d, e) {
      if (d && d.once) return td(a, b, c, d, e);
      if (p(b)) {
        for (var f = 0; f < b.length; f++) Q(a, b[f], c, d, e);
        return null
      }
      c = ud(c);
      return id(a) ? a.listen(b, c, r(d) ? !!d.capture : !!d, e) : vd(a, b, c, !1, d, e)
    },
    vd = function(a, b, c, d, e, f) {
      if (!b) throw Error("Invalid event type");
      var h = r(e) ? !!e.capture : !!e,
        l = wd(a);
      l || (a[qd] = l = new md(a));
      c = l.add(b, c, d, h, f);
      if (c.proxy) return c;
      d = xd();
      c.proxy = d;
      d.src = a;
      d.listener = c;
      if (a.addEventListener) ad || (e = h), void 0 === e && (e = !1),
      a.addEventListener(b.toString(), d, e);
      else if (a.attachEvent) a.attachEvent(yd(b.toString()), d);
      else throw Error("addEventListener and attachEvent are unavailable.");
      sd++;
      return c
    },
    xd = function() {
      var a = zd,
        b = Zc ? function(c) {
          return a.call(b.src, b.listener, c)
        } : function(c) {
          c = a.call(b.src, b.listener, c);
          if (!c) return c
        };
      return b
    },
    td = function(a, b, c, d, e) {
      if (p(b)) {
        for (var f = 0; f < b.length; f++) td(a, b[f], c, d, e);
        return null
      }
      c = ud(c);
      return id(a) ? a.j.add(String(b), c, !0, r(d) ? !!d.capture : !!d, e) : vd(a, b, c, !0, d, e)
    },
    Ad = function(a,
      b, c, d, e) {
      if (p(b))
        for (var f = 0; f < b.length; f++) Ad(a, b[f], c, d, e);
      else d = r(d) ? !!d.capture : !!d, c = ud(c), id(a) ? a.S(b, c, d, e) : a && (a = wd(a)) && (b = pd(a, b, c, d, e)) && Bd(b)
    },
    Bd = function(a) {
      if ("number" != typeof a && a && !a.removed) {
        var b = a.src;
        if (id(b)) od(b.j, a);
        else {
          var c = a.type,
            d = a.proxy;
          b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent && b.detachEvent(yd(c), d);
          sd--;
          (c = wd(b)) ? (od(c, a), 0 == c.b && (c.src = null, b[qd] = null)) : ld(a)
        }
      }
    },
    yd = function(a) {
      return a in rd ? rd[a] : rd[a] = "on" + a
    },
    Dd = function(a, b, c, d) {
      var e = !0;
      if (a = wd(a))
        if (b = a.a[b.toString()])
          for (b = b.concat(), a = 0; a < b.length; a++) {
            var f = b[a];
            f && f.capture == c && !f.removed && (f = Cd(f, d), e = e && !1 !== f)
          }
      return e
    },
    Cd = function(a, b) {
      var c = a.listener,
        d = a.xa || a.src;
      a.ra && Bd(a);
      return c.call(d, b)
    },
    zd = function(a, b) {
      if (a.removed) return !0;
      if (!Zc) {
        if (!b) a: {
          b = ["window", "event"];
          for (var c = k, d = 0; d < b.length; d++)
            if (c = c[b[d]], null == c) {
              b = null;
              break a
            }
          b = c
        }
        d = b;
        b = new P(d, this);
        c = !0;
        if (!(0 > d.keyCode || void 0 != d.returnValue)) {
          a: {
            var e = !1;
            if (0 == d.keyCode) try {
              d.keyCode = -1;
              break a
            } catch (h) {
              e = !0
            }
            if (e || void 0 == d.returnValue) d.returnValue = !0
          }
          d = [];
          for (e = b.b; e; e = e.parentNode) d.push(e);a = a.type;
          for (e = d.length - 1; !b.f && 0 <= e; e--) {
            b.b = d[e];
            var f = Dd(d[e], a, !0, b);
            c = c && f
          }
          for (e = 0; !b.f && e < d.length; e++) b.b = d[e],
          f = Dd(d[e], a, !1, b),
          c = c && f
        }
        return c
      }
      return Cd(a, new P(b, this))
    },
    wd = function(a) {
      a = a[qd];
      return a instanceof md ? a : null
    },
    Ed = "__closure_events_fn_" + (1E9 * Math.random() >>> 0),
    ud = function(a) {
      z(a, "Listener can not be null.");
      if (q(a)) return a;
      z(a.handleEvent, "An object listener must have handleEvent method.");
      a[Ed] || (a[Ed] = function(b) {
        return a.handleEvent(b)
      });
      return a[Ed]
    };
  var R = function() {
    O.call(this);
    this.j = new md(this);
    this.nb = this;
    this.ca = null
  };
  w(R, O);
  R.prototype[hd] = !0;
  g = R.prototype;
  g.Ba = function(a) {
    this.ca = a
  };
  g.addEventListener = function(a, b, c, d) {
    Q(this, a, b, c, d)
  };
  g.removeEventListener = function(a, b, c, d) {
    Ad(this, a, b, c, d)
  };
  g.D = function(a) {
    Fd(this);
    var b = this.ca;
    if (b) {
      var c = [];
      for (var d = 1; b; b = b.ca) c.push(b), z(1E3 > ++d, "infinite loop")
    }
    b = this.nb;
    d = a.type || a;
    if (m(a)) a = new dd(a, b);
    else if (a instanceof dd) a.target = a.target || b;
    else {
      var e = a;
      a = new dd(d, b);
      Ta(a, e)
    }
    e = !0;
    if (c)
      for (var f = c.length - 1; !a.f && 0 <= f; f--) {
        var h = a.b = c[f];
        e = Gd(h, d, !0, a) && e
      }
    a.f || (h = a.b = b, e = Gd(h, d, !0, a) && e, a.f || (e = Gd(h, d, !1, a) && e));
    if (c)
      for (f = 0; !a.f && f < c.length; f++) h = a.b = c[f], e = Gd(h, d, !1, a) && e;
    return e
  };
  g.v = function() {
    R.i.v.call(this);
    this.j && this.j.removeAll(void 0);
    this.ca = null
  };
  g.listen = function(a, b, c, d) {
    Fd(this);
    return this.j.add(String(a), b, !1, c, d)
  };
  g.S = function(a, b, c, d) {
    return this.j.remove(String(a), b, c, d)
  };
  var Gd = function(a, b, c, d) {
      b = a.j.a[String(b)];
      if (!b) return !0;
      b = b.concat();
      for (var e = !0, f = 0; f < b.length; ++f) {
        var h = b[f];
        if (h && !h.removed && h.capture == c) {
          var l = h.listener,
            u = h.xa || h.src;
          h.ra && od(a.j, h);
          e = !1 !== l.call(u, d) && e
        }
      }
      return e && 0 != d.jb
    },
    Fd = function(a) {
      z(a.j, "Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")
    };
  var Hd = function(a, b) {
    if (q(a)) b && (a = t(a, b));
    else if (a && "function" == typeof a.handleEvent) a = t(a.handleEvent, a);
    else throw Error("Invalid listener argument");
    2147483647 < Number(50) || k.setTimeout(a, 50)
  };
  var Id = function(a) {
      if (a.classList) return a.classList;
      a = a.className;
      return m(a) && a.match(/\S+/g) || []
    },
    Jd = function(a, b) {
      return a.classList ? a.classList.contains(b) : Ja(Id(a), b)
    },
    Kd = function(a, b) {
      a.classList ? a.classList.add(b) : Jd(a, b) || (a.className += 0 < a.className.length ? " " + b : b)
    },
    Ld = function(a, b) {
      if (a.classList) A(b, function(b) {
        Kd(a, b)
      });
      else {
        var c = {};
        A(Id(a), function(a) {
          c[a] = !0
        });
        A(b, function(a) {
          c[a] = !0
        });
        a.className = "";
        for (var d in c) a.className += 0 < a.className.length ? " " + d : d
      }
    },
    Md = function(a, b) {
      a.classList ?
        a.classList.remove(b) : Jd(a, b) && (a.className = Fa(Id(a), function(a) {
          return a != b
        }).join(" "))
    },
    Nd = function(a, b) {
      a.classList ? A(b, function(b) {
        Md(a, b)
      }) : a.className = Fa(Id(a), function(a) {
        return !Ja(b, a)
      }).join(" ")
    };
  var Od = {
      yd: !0
    },
    Pd = {
      xd: !0
    },
    Qd = {
      zd: !0
    },
    Rd = function() {
      throw Error("Do not instantiate directly");
    };
  Rd.prototype.la = null;
  Rd.prototype.T = function() {
    return this.content
  };
  Rd.prototype.toString = function() {
    return this.content
  };
  var Sd = function(a, b) {
    this.content = String(a);
    this.la = null != b ? b : null
  };
  w(Sd, Rd);
  Sd.prototype.Z = Qd;
  var Td = function() {
    Rd.call(this)
  };
  w(Td, Rd);
  Td.prototype.Z = Od;
  var Ud = function() {
    Rd.call(this)
  };
  w(Ud, Rd);
  Ud.prototype.Z = Pd;
  Ud.prototype.la = 1;
  var Zd = function(a, b, c) {
      z(a, "Soy template may not be null.");
      a = a(b || Vd, void 0, void 0);
      c = (c || Cb()).a.createElement("DIV");
      a = Xd(a);
      b = a.match(Yd);
      z(!b, "This template starts with a %s, which cannot be a child of a <div>, as required by soy internals. Consider using goog.soy.renderElement instead.\nTemplate output: %s", b && b[0], a);
      c.innerHTML = a;
      1 == c.childNodes.length && (a = c.firstChild, 1 == a.nodeType && (c = a));
      return c
    },
    Xd = function(a) {
      if (!r(a)) return String(a);
      if (a instanceof Rd) {
        if (a.Z === Od) return za(a.T());
        if (a.Z === Qd) return ua(a.T())
      }
      ya("Soy template output is unsafe for use as HTML: " + a);
      return "zSoyz"
    },
    Yd = /^<(body|caption|col|colgroup|head|html|tr|td|th|tbody|thead|tfoot)>/i,
    Vd = {};
  var $d = F ? "MozUserSelect" : H || E ? "WebkitUserSelect" : null;
  var ce = function(a, b, c, d, e, f) {
      if (!(D || E || H && J("525"))) return !0;
      if (I && e) return ae(a);
      if (e && !d) return !1;
      "number" == typeof b && (b = be(b));
      e = 17 == b || 18 == b || I && 91 == b;
      if ((!c || I) && e || I && 16 == b && (d || f)) return !1;
      if ((H || E) && d && c) switch (a) {
      case 220:
      case 219:
      case 221:
      case 192:
      case 186:
      case 189:
      case 187:
      case 188:
      case 190:
      case 191:
      case 192:
      case 222:
        return !1
      }
      if (D && d && b == a) return !1;
      switch (a) {
      case 13:
        return !0;
      case 27:
        return !(H || E)
      }
      return ae(a)
    },
    ae = function(a) {
      if (48 <= a && 57 >= a || 96 <= a && 106 >= a || 65 <= a && 90 >= a || (H || E) && 0 == a) return !0;
      switch (a) {
      case 32:
      case 43:
      case 63:
      case 64:
      case 107:
      case 109:
      case 110:
      case 111:
      case 186:
      case 59:
      case 189:
      case 187:
      case 61:
      case 188:
      case 190:
      case 191:
      case 192:
      case 222:
      case 219:
      case 220:
      case 221:
        return !0;
      default:
        return !1
      }
    },
    be = function(a) {
      if (F) a = de(a);
      else if (I && H) switch (a) {
      case 93:
        a = 91
      }
      return a
    },
    de = function(a) {
      switch (a) {
      case 61:
        return 187;
      case 59:
        return 186;
      case 173:
        return 189;
      case 224:
        return 91;
      case 0:
        return 224;
      default:
        return a
      }
    };
  var ee = function(a, b) {
    R.call(this);
    a && this.attach(a, b)
  };
  w(ee, R);
  g = ee.prototype;
  g.ea = null;
  g.ya = null;
  g.Pa = null;
  g.za = null;
  g.G = -1;
  g.V = -1;
  g.Ga = !1;
  var fe = {
      3: 13,
      12: 144,
      63232: 38,
      63233: 40,
      63234: 37,
      63235: 39,
      63236: 112,
      63237: 113,
      63238: 114,
      63239: 115,
      63240: 116,
      63241: 117,
      63242: 118,
      63243: 119,
      63244: 120,
      63245: 121,
      63246: 122,
      63247: 123,
      63248: 44,
      63272: 46,
      63273: 36,
      63275: 35,
      63276: 33,
      63277: 34,
      63289: 144,
      63302: 45
    },
    ge = {
      Up: 38,
      Down: 40,
      Left: 37,
      Right: 39,
      Enter: 13,
      F1: 112,
      F2: 113,
      F3: 114,
      F4: 115,
      F5: 116,
      F6: 117,
      F7: 118,
      F8: 119,
      F9: 120,
      F10: 121,
      F11: 122,
      F12: 123,
      "U+007F": 46,
      Home: 36,
      End: 35,
      PageUp: 33,
      PageDown: 34,
      Insert: 45
    },
    he = D || E || H && J("525"),
    ie = I && F;
  g = ee.prototype;
  g.xb = function(a) {
    if (H || E)
      if (17 == this.G && !a.ctrlKey || 18 == this.G && !a.altKey || I && 91 == this.G && !a.metaKey) this.V = this.G = -1; - 1 == this.G && (a.ctrlKey && 17 != a.a ? this.G = 17 : a.altKey && 18 != a.a ? this.G = 18 : a.metaKey && 91 != a.a && (this.G = 91));
    he && !ce(a.a, this.G, a.shiftKey, a.ctrlKey, a.altKey, a.metaKey) ? this.handleEvent(a) : (this.V = be(a.a), ie && (this.Ga = a.altKey))
  };
  g.zb = function(a) {
    this.V = this.G = -1;
    this.Ga = a.altKey
  };
  g.handleEvent = function(a) {
    var b = a.c,
      c = b.altKey;
    if (D && "keypress" == a.type) var d = this.V;
    else if ((H || E) && "keypress" == a.type) d = this.V;
    else if (ib && !H) d = this.V;
    else {
      d = b.keyCode || this.V;
      var e = b.charCode || 0;
      ie && (c = this.Ga);
      I && 63 == e && 224 == d && (d = 191)
    }(e = d = be(d)) ? 63232 <= d && d in fe ? e = fe[d] : 25 == d && a.shiftKey && (e = 9): b.keyIdentifier && b.keyIdentifier in ge && (e = ge[b.keyIdentifier]);
    a = e == this.G;
    this.G = e;
    b = new je(e, 0, a, b);
    b.altKey = c;
    this.D(b)
  };
  g.h = function() {
    return this.ea
  };
  g.attach = function(a, b) {
    this.za && this.detach();
    this.ea = a;
    this.ya = Q(this.ea, "keypress", this, b);
    this.Pa = Q(this.ea, "keydown", this.xb, b, this);
    this.za = Q(this.ea, "keyup", this.zb, b, this)
  };
  g.detach = function() {
    this.ya && (Bd(this.ya), Bd(this.Pa), Bd(this.za), this.za = this.Pa = this.ya = null);
    this.ea = null;
    this.V = this.G = -1
  };
  g.v = function() {
    ee.i.v.call(this);
    this.detach()
  };
  var je = function(a, b, c, d) {
    P.call(this, d);
    this.type = "key";
    this.a = a;
    this.repeat = c
  };
  w(je, P);
  var ke, le = {
    Cb: "activedescendant",
    Hb: "atomic",
    Ib: "autocomplete",
    Kb: "busy",
    mb: "checked",
    Nb: "colindex",
    Sb: "controls",
    Ub: "describedby",
    Xb: "disabled",
    Zb: "dropeffect",
    $b: "expanded",
    ac: "flowto",
    cc: "grabbed",
    gc: "haspopup",
    ic: "hidden",
    kc: "invalid",
    lc: "label",
    mc: "labelledby",
    nc: "level",
    sc: "live",
    Cc: "multiline",
    Dc: "multiselectable",
    Hc: "orientation",
    Ic: "owns",
    Jc: "posinset",
    Lc: "pressed",
    Pc: "readonly",
    Rc: "relevant",
    Sc: "required",
    Wc: "rowindex",
    Zc: "selected",
    ad: "setsize",
    cd: "sort",
    sd: "valuemax",
    td: "valuemin",
    ud: "valuenow",
    vd: "valuetext"
  };
  var me = {
    Db: "alert",
    Eb: "alertdialog",
    Fb: "application",
    Gb: "article",
    Jb: "banner",
    Lb: "button",
    Mb: "checkbox",
    Ob: "columnheader",
    Pb: "combobox",
    Qb: "complementary",
    Rb: "contentinfo",
    Tb: "definition",
    Vb: "dialog",
    Wb: "directory",
    Yb: "document",
    bc: "form",
    dc: "grid",
    ec: "gridcell",
    fc: "group",
    hc: "heading",
    jc: "img",
    oc: "link",
    pc: "list",
    qc: "listbox",
    rc: "listitem",
    tc: "log",
    uc: "main",
    vc: "marquee",
    wc: "math",
    xc: "menu",
    yc: "menubar",
    zc: "menuitem",
    Ac: "menuitemcheckbox",
    Bc: "menuitemradio",
    Ec: "navigation",
    Fc: "note",
    Gc: "option",
    Kc: "presentation",
    Mc: "progressbar",
    Nc: "radio",
    Oc: "radiogroup",
    Qc: "region",
    Tc: "row",
    Uc: "rowgroup",
    Vc: "rowheader",
    Xc: "scrollbar",
    Yc: "search",
    $c: "separator",
    bd: "slider",
    dd: "spinbutton",
    ed: "status",
    TAB: "tab",
    fd: "tablist",
    gd: "tabpanel",
    hd: "textbox",
    jd: "textinfo",
    kd: "timer",
    ld: "toolbar",
    md: "tooltip",
    nd: "tree",
    od: "treegrid",
    pd: "treeitem"
  };
  var ne = function(a, b) {
      b ? (z(Ra(me, b), "No such ARIA role " + b), a.setAttribute("role", b)) : a.removeAttribute("role")
    },
    pe = function(a, b, c) {
      p(c) && (c = c.join(" "));
      var d = oe(b);
      "" === c || void 0 == c ? (ke || (ke = {
        atomic: !1,
        autocomplete: "none",
        dropeffect: "none",
        haspopup: !1,
        live: "off",
        multiline: !1,
        multiselectable: !1,
        orientation: "vertical",
        readonly: !1,
        relevant: "additions text",
        required: !1,
        sort: "none",
        busy: !1,
        disabled: !1,
        hidden: !1,
        invalid: "false"
      }), c = ke, b in c ? a.setAttribute(d, c[b]) : a.removeAttribute(d)) : a.setAttribute(d,
        c)
    },
    qe = function(a) {
      a = a.getAttribute(oe("label"));
      return null == a || void 0 == a ? "" : String(a)
    },
    oe = function(a) {
      z(a, "ARIA attribute cannot be empty.");
      z(Ra(le, a), "No such ARIA attribute " + a);
      return "aria-" + a
    };
  var re = function(a) {
    O.call(this);
    this.b = a;
    this.a = {}
  };
  w(re, O);
  var se = [];
  g = re.prototype;
  g.listen = function(a, b, c, d) {
    p(b) || (b && (se[0] = b.toString()), b = se);
    for (var e = 0; e < b.length; e++) {
      var f = Q(a, b[e], c || this.handleEvent, d || !1, this.b || this);
      if (!f) break;
      this.a[f.key] = f
    }
    return this
  };
  g.S = function(a, b, c, d, e) {
    if (p(b))
      for (var f = 0; f < b.length; f++) this.S(a, b[f], c, d, e);
    else c = c || this.handleEvent, d = r(d) ? !!d.capture : !!d, e = e || this.b || this, c = ud(c), d = !!d, b = id(a) ? pd(a.j, String(b), c, d, e) : a ? (a = wd(a)) ? pd(a, b, c, d, e) : null : null, b && (Bd(b), delete this.a[b.key]);
    return this
  };
  g.removeAll = function() {
    Qa(this.a, function(a, b) {
      this.a.hasOwnProperty(b) && Bd(a)
    }, this);
    this.a = {}
  };
  g.v = function() {
    re.i.v.call(this);
    this.removeAll()
  };
  g.handleEvent = function() {
    throw Error("EventHandler.handleEvent not implemented");
  };
  var te = function() {};
  aa(te);
  te.prototype.a = 0;
  var S = function(a) {
    R.call(this);
    this.f = a || Cb();
    this.Fa = ue;
    this.B = null;
    this.I = !1;
    this.b = null;
    this.o = void 0;
    this.s = this.ja = this.g = null;
    this.Wa = !1
  };
  w(S, R);
  S.prototype.Ta = te.$();
  var ue = null,
    ve = function(a, b) {
      switch (a) {
      case 1:
        return b ? "disable" : "enable";
      case 2:
        return b ? "highlight" : "unhighlight";
      case 4:
        return b ? "activate" : "deactivate";
      case 8:
        return b ? "select" : "unselect";
      case 16:
        return b ? "check" : "uncheck";
      case 32:
        return b ? "focus" : "blur";
      case 64:
        return b ? "open" : "close"
      }
      throw Error("Invalid component state");
    },
    we = function(a, b) {
      if (a.g && a.g.s) {
        var c = a.g.s,
          d = a.B;
        d in c && delete c[d];
        c = a.g.s;
        if (null !== c && b in c) throw Error('The object already contains the key "' + b + '"');
        c[b] = a
      }
      a.B = b
    };
  S.prototype.h = function() {
    return this.b
  };
  var xe = function(a) {
      a = a.b;
      z(a, "Can not call getElementStrict before rendering/decorating.");
      return a
    },
    ye = function(a) {
      return a.b ? Db("jfk-checkbox-checkmark", a.b || a.f.a) : null
    },
    ze = function(a) {
      a.o || (a.o = new re(a));
      return a.o
    };
  S.prototype.Ba = function(a) {
    if (this.g && this.g != a) throw Error("Method not supported");
    S.i.Ba.call(this, a)
  };
  S.prototype.Da = function() {
    this.b = this.f.a.createElement("DIV")
  };
  var Ae = function(a, b) {
      if (a.I) throw Error("Component already rendered");
      a.b || a.Da();
      b ? b.insertBefore(a.b, null) : a.f.a.body.appendChild(a.b);
      a.g && !a.g.I || a.M()
    },
    Be = function(a, b) {
      if (a.I) throw Error("Component already rendered");
      if (b && a.$a(b)) {
        a.Wa = !0;
        var c = Bb(b);
        a.f && a.f.a == c || (a.f = Cb(b));
        a.sa(b);
        a.M()
      } else throw Error("Invalid element to decorate");
    };
  g = S.prototype;
  g.$a = function() {
    return !0
  };
  g.sa = function(a) {
    this.b = a
  };
  g.M = function() {
    this.I = !0;
    Ce(this, function(a) {
      !a.I && a.h() && a.M()
    })
  };
  g.da = function() {
    Ce(this, function(a) {
      a.I && a.da()
    });
    this.o && this.o.removeAll();
    this.I = !1
  };
  g.v = function() {
    this.I && this.da();
    this.o && (this.o.na(), delete this.o);
    Ce(this, function(a) {
      a.na()
    });
    !this.Wa && this.b && Lb(this.b);
    this.g = this.b = this.s = this.ja = null;
    S.i.v.call(this)
  };
  var Ce = function(a, b) {
    a.ja && A(a.ja, b, void 0)
  };
  S.prototype.removeChild = function(a, b) {
    if (a) {
      var c = m(a) ? a : a.B || (a.B = ":" + (a.Ta.a++).toString(36));
      this.s && c ? (a = this.s, a = (null !== a && c in a ? a[c] : void 0) || null) : a = null;
      if (c && a) {
        var d = this.s;
        c in d && delete d[c];
        Ka(this.ja, a);
        b && (a.da(), a.b && Lb(a.b));
        b = a;
        if (null == b) throw Error("Unable to set parent component");
        b.g = null;
        S.i.Ba.call(b, null)
      }
    }
    if (!a) throw Error("Child is not in parent component");
    return a
  };
  var T = function() {},
    De;
  aa(T);
  var Fe = function() {
      var a = new Ee;
      a.m = function() {
        return "jfk-checkbox"
      };
      return a
    },
    Ge = {
      button: "pressed",
      checkbox: "checked",
      menuitem: "selected",
      menuitemcheckbox: "checked",
      menuitemradio: "checked",
      radio: "checked",
      tab: "selected",
      treeitem: "selected"
    };
  T.prototype.oa = function() {};
  T.prototype.aa = function(a) {
    return a.f.ta("DIV", He(this, a).join(" "), a.T())
  };
  T.prototype.pa = function(a) {
    return a
  };
  var Je = function(a, b, c) {
    if (a = a.h ? a.h() : a) {
      var d = [b];
      D && !J("7") && (d = Ie(Id(a), b), d.push(b));
      (c ? Ld : Nd)(a, d)
    }
  };
  T.prototype.ab = function() {
    return !0
  };
  T.prototype.H = function(a, b) {
    b.id && we(a, b.id);
    var c = this.pa(b);
    c && c.firstChild ? Ke(a, c.firstChild.nextSibling ? Ma(c.childNodes) : c.firstChild) : a.ma = null;
    var d = 0,
      e = this.m(),
      f = this.m(),
      h = !1,
      l = !1,
      u = !1,
      G = Ma(Id(b));
    A(G, function(a) {
      h || a != e ? l || a != f ? d |= Le(this, a) : l = !0 : (h = !0, f == e && (l = !0));
      1 == Le(this, a) && (Ba(c), Pb(c) && Qb(c, !1))
    }, this);
    a.w = d;
    h || (G.push(e), f == e && (l = !0));
    l || G.push(f);
    (a = a.Ha) && G.push.apply(G, a);
    if (D && !J("7")) {
      var Wd = Ie(G);
      0 < Wd.length && (G.push.apply(G, Wd), u = !0)
    }
    if (!h || !l || a || u) b.className = G.join(" ");
    return b
  };
  T.prototype.ib = function(a) {
    if (null == a.Fa) {
      var b = a.I ? a.b : a.f.a.body;
      a: {
        var c = Bb(b);
        if (c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(b, null))) {
          c = c.direction || c.getPropertyValue("direction") || "";
          break a
        }
        c = ""
      }
      a.Fa = "rtl" == (c || (b.currentStyle ? b.currentStyle.direction : null) || b.style && b.style.direction)
    }
    a.Fa && this.cb(a.h(), !0);
    a.a() && this.Aa(a, a.X)
  };
  var Me = function(a, b) {
    if (a = a.oa()) {
      z(b, "The element passed as a first parameter cannot be null.");
      var c = b.getAttribute("role") || null;
      a != c && ne(b, a)
    }
  };
  g = T.prototype;
  g.Ja = function(a, b) {
    var c = !b;
    b = D || ib ? a.getElementsByTagName("*") : null;
    if ($d) {
      if (c = c ? "none" : "", a.style && (a.style[$d] = c), b) {
        a = 0;
        for (var d; d = b[a]; a++) d.style && (d.style[$d] = c)
      }
    } else if (D || ib)
      if (c = c ? "on" : "", a.setAttribute("unselectable", c), b)
        for (a = 0; d = b[a]; a++) d.setAttribute("unselectable", c)
  };
  g.cb = function(a, b) {
    Je(a, this.m() + "-rtl", b)
  };
  g.bb = function(a) {
    var b;
    return a.A & 32 && (b = a.h()) ? Pb(b) : !1
  };
  g.Aa = function(a, b) {
    var c;
    if (a.A & 32 && (c = a.h())) {
      if (!b && a.w & 32) {
        try {
          c.blur()
        } catch (d) {}
        a.w & 32 && a.eb()
      }
      Pb(c) != b && Qb(c, b)
    }
  };
  g.Ka = function(a, b, c) {
    var d = a.h();
    if (d) {
      var e = Ne(this, b);
      e && Je(a, e, c);
      this.O(d, b, c)
    }
  };
  g.O = function(a, b, c) {
    De || (De = {
      1: "disabled",
      8: "selected",
      16: "checked",
      64: "expanded"
    });
    z(a, "The element passed as a first parameter cannot be null.");
    b = De[b];
    var d = a.getAttribute("role") || null;
    d && (d = Ge[d] || b, b = "checked" == b || "selected" == b ? d : b);
    b && pe(a, b, c)
  };
  g.m = function() {
    return "goog-control"
  };
  var He = function(a, b) {
      var c = a.m(),
        d = [c],
        e = a.m();
      e != c && d.push(e);
      c = b.getState();
      for (e = []; c;) {
        var f = c & -c;
        e.push(Ne(a, f));
        c &= ~f
      }
      d.push.apply(d, e);
      (a = b.Ha) && d.push.apply(d, a);
      D && !J("7") && d.push.apply(d, Ie(d));
      return d
    },
    Ie = function(a, b) {
      var c = [];
      b && (a = La(a, [b]));
      A([], function(d) {
        !Ia(d, v(Ja, a)) || b && !Ja(d, b) || c.push(d.join("_"))
      });
      return c
    },
    Ne = function(a, b) {
      a.a || Oe(a);
      return a.a[b]
    },
    Le = function(a, b) {
      if (!a.C) {
        a.a || Oe(a);
        var c = a.a,
          d = {},
          e;
        for (e in c) d[c[e]] = e;
        a.C = d
      }
      a = parseInt(a.C[b], 10);
      return isNaN(a) ? 0 : a
    },
    Oe = function(a) {
      var b = a.m();
      var c = -1 != b.replace(/\xa0|\s/g, " ").indexOf(" ");
      z(!c, "ControlRenderer has an invalid css class: '" + b + "'");
      a.a = {
        1: b + "-disabled",
        2: b + "-hover",
        4: b + "-active",
        8: b + "-selected",
        16: b + "-checked",
        32: b + "-focused",
        64: b + "-open"
      }
    };
  var Pe = function() {};
  w(Pe, T);
  aa(Pe);
  g = Pe.prototype;
  g.oa = function() {
    return "button"
  };
  g.O = function(a, b, c) {
    switch (b) {
    case 8:
    case 16:
      z(a, "The button DOM element cannot be null.");
      pe(a, "pressed", c);
      break;
    default:
    case 64:
    case 1:
      Pe.i.O.call(this, a, b, c)
    }
  };
  g.aa = function(a) {
    var b = Pe.i.aa.call(this, a),
      c = a.L;
    b && (c ? b.title = c : b.removeAttribute("title"));
    (c = a.K()) && this.Ia(b, c);
    a.A & 16 && this.O(b, 16, a.N());
    return b
  };
  g.H = function(a, b) {
    b = Pe.i.H.call(this, a, b);
    var c = this.K(b);
    a.Sa = c;
    a.L = b.title;
    a.A & 16 && this.O(b, 16, a.N());
    return b
  };
  g.K = n;
  g.Ia = n;
  g.m = function() {
    return "goog-button"
  };
  var Qe = function(a, b) {
      if (!a) throw Error("Invalid class name " + a);
      if (!q(b)) throw Error("Invalid decorator function " + b);
    },
    Re = {};
  var U = function(a, b, c) {
    S.call(this, c);
    if (!b) {
      b = this.constructor;
      for (var d; b;) {
        d = b[da] || (b[da] = ++ea);
        if (d = Re[d]) break;
        b = b.i ? b.i.constructor : null
      }
      b = d ? q(d.$) ? d.$() : new d : null
    }
    this.c = b;
    this.ma = void 0 !== a ? a : null
  };
  w(U, S);
  g = U.prototype;
  g.ma = null;
  g.w = 0;
  g.A = 39;
  g.Y = 255;
  g.X = !0;
  g.Ha = null;
  g.va = !0;
  var Te = function(a) {
    a.I && 0 != a.va && Se(a, !1);
    a.va = !1
  };
  U.prototype.Da = function() {
    var a = this.c.aa(this);
    this.b = a;
    Me(this.c, a);
    this.c.Ja(a, !1);
    this.X || (a.style.display = "none", a && pe(a, "hidden", !0))
  };
  U.prototype.$a = function(a) {
    return this.c.ab(a)
  };
  U.prototype.sa = function(a) {
    this.b = a = this.c.H(this, a);
    Me(this.c, a);
    this.c.Ja(a, !1);
    this.X = "none" != a.style.display
  };
  U.prototype.M = function() {
    U.i.M.call(this);
    var a = this.c,
      b = xe(this);
    z(this);
    z(b);
    this.X || pe(b, "hidden", !this.X);
    this.a() || a.O(b, 1, !this.a());
    this.A & 8 && a.O(b, 8, this.isSelected());
    this.A & 16 && a.O(b, 16, this.N());
    this.A & 64 && a.O(b, 64, !!(this.w & 64));
    this.c.ib(this);
    this.A & -2 && (this.va && Se(this, !0), this.A & 32 && (a = this.h())) && (b = this.J || (this.J = new ee), b.attach(a), ze(this).listen(b, "key", this.yb).listen(a, "focus", this.wb).listen(a, "blur", this.eb))
  };
  var Se = function(a, b) {
    var c = ze(a),
      d = a.h();
    b ? (c.listen(d, "mouseover", a.Na).listen(d, "mousedown", a.U).listen(d, "mouseup", a.ga).listen(d, "mouseout", a.Ma), a.ua != n && c.listen(d, "contextmenu", a.ua), D && (J(9) || c.listen(d, "dblclick", a.gb), a.ba || (a.ba = new Ue(a), bd(a, v(cd, a.ba))))) : (c.S(d, "mouseover", a.Na).S(d, "mousedown", a.U).S(d, "mouseup", a.ga).S(d, "mouseout", a.Ma), a.ua != n && c.S(d, "contextmenu", a.ua), D && (J(9) || c.S(d, "dblclick", a.gb), cd(a.ba), a.ba = null))
  };
  U.prototype.da = function() {
    U.i.da.call(this);
    this.J && this.J.detach();
    this.X && this.a() && this.c.Aa(this, !1)
  };
  U.prototype.v = function() {
    U.i.v.call(this);
    this.J && (this.J.na(), delete this.J);
    delete this.c;
    this.ba = this.Ha = this.ma = null
  };
  U.prototype.T = function() {
    return this.ma
  };
  var Ke = function(a, b) {
      a.ma = b
    },
    Ve = function(a) {
      a = a.T();
      if (!a) return "";
      if (!m(a))
        if (p(a)) a = Ga(a, Sb).join("");
        else {
          if (yb && null !== a && "innerText" in a) a = a.innerText.replace(/(\r\n|\r|\n)/g, "\n");
          else {
            var b = [];
            Rb(a, b, !0);
            a = b.join("")
          }
          a = a.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
          a = a.replace(/\u200B/g, "");
          yb || (a = a.replace(/ +/g, " "));
          " " != a && (a = a.replace(/^\s*/, ""))
        }
      return a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
    };
  U.prototype.a = function() {
    return !(this.w & 1)
  };
  U.prototype.setEnabled = function(a) {
    var b = this.g;
    b && "function" == typeof b.a && !b.a() || !We(this, 1, !a) || (a || (Xe(this, !1), Ye(this, !1)), this.X && this.c.Aa(this, a), Ze(this, 1, !a, !0))
  };
  var Ye = function(a, b) {
      We(a, 2, b) && Ze(a, 2, b)
    },
    Xe = function(a, b) {
      We(a, 4, b) && Ze(a, 4, b)
    };
  g = U.prototype;
  g.isSelected = function() {
    return !!(this.w & 8)
  };
  g.Qa = function(a) {
    We(this, 8, a) && Ze(this, 8, a)
  };
  g.N = function() {
    return !!(this.w & 16)
  };
  g.ha = function(a) {
    We(this, 16, a) && Ze(this, 16, a)
  };
  g.ia = function(a) {
    We(this, 32, a) && Ze(this, 32, a)
  };
  g.getState = function() {
    return this.w
  };
  var Ze = function(a, b, c, d) {
      d || 1 != b ? a.A & b && c != !!(a.w & b) && (a.c.Ka(a, b, c), a.w = c ? a.w | b : a.w & ~b) : a.setEnabled(!c)
    },
    $e = function(a, b, c) {
      if (a.I && a.w & b && !c) throw Error("Component already rendered");
      !c && a.w & b && Ze(a, b, !1);
      a.A = c ? a.A | b : a.A & ~b
    },
    V = function(a, b) {
      return !!(a.Y & b) && !!(a.A & b)
    },
    We = function(a, b, c) {
      return !!(a.A & b) && !!(a.w & b) != c && (!(0 & b) || a.D(ve(b, c))) && !a.C
    };
  g = U.prototype;
  g.Na = function(a) {
    (!a.relatedTarget || !Mb(this.h(), a.relatedTarget)) && this.D("enter") && this.a() && V(this, 2) && Ye(this, !0)
  };
  g.Ma = function(a) {
    a.relatedTarget && Mb(this.h(), a.relatedTarget) || !this.D("leave") || (V(this, 4) && Xe(this, !1), V(this, 2) && Ye(this, !1))
  };
  g.ua = n;
  g.U = function(a) {
    this.a() && (V(this, 2) && Ye(this, !0), !gd(a) || H && I && a.ctrlKey || (V(this, 4) && Xe(this, !0), this.c && this.c.bb(this) && this.h().focus()));
    !gd(a) || H && I && a.ctrlKey || a.g()
  };
  g.ga = function(a) {
    this.a() && (V(this, 2) && Ye(this, !0), this.w & 4 && this.R(a) && V(this, 4) && Xe(this, !1))
  };
  g.gb = function(a) {
    this.a() && this.R(a)
  };
  g.R = function(a) {
    V(this, 16) && this.ha(!this.N());
    V(this, 8) && this.Qa(!0);
    if (V(this, 64)) {
      var b = !(this.w & 64);
      We(this, 64, b) && Ze(this, 64, b)
    }
    b = new dd("action", this);
    a && (b.altKey = a.altKey, b.ctrlKey = a.ctrlKey, b.metaKey = a.metaKey, b.shiftKey = a.shiftKey, b.l = a.l);
    return this.D(b)
  };
  g.wb = function() {
    V(this, 32) && this.ia(!0)
  };
  g.eb = function() {
    V(this, 4) && Xe(this, !1);
    V(this, 32) && this.ia(!1)
  };
  g.yb = function(a) {
    return this.X && this.a() && this.fa(a) ? (a.g(), a.j(), !0) : !1
  };
  g.fa = function(a) {
    return 13 == a.a && this.R(a)
  };
  if (!q(U)) throw Error("Invalid component class " + U);
  if (!q(T)) throw Error("Invalid renderer class " + T);
  var af = U[da] || (U[da] = ++ea);
  Re[af] = T;
  Qe("goog-control", function() {
    return new U(null)
  });
  var Ue = function(a) {
    O.call(this);
    this.b = a;
    this.a = !1;
    this.c = new re(this);
    bd(this, v(cd, this.c));
    a = xe(this.b);
    this.c.listen(a, "mousedown", this.g).listen(a, "mouseup", this.j).listen(a, "click", this.f)
  };
  w(Ue, O);
  var bf = !D || 9 <= Number(ub);
  Ue.prototype.g = function() {
    this.a = !1
  };
  Ue.prototype.j = function() {
    this.a = !0
  };
  var cf = function(a, b) {
    if (!bf) return a.button = 0, a.type = b, a;
    var c = document.createEvent("MouseEvents");
    c.initMouseEvent(b, a.bubbles, a.cancelable, a.view || null, a.detail, a.screenX, a.screenY, a.clientX, a.clientY, a.ctrlKey, a.altKey, a.shiftKey, a.metaKey, 0, a.relatedTarget || null);
    return c
  };
  Ue.prototype.f = function(a) {
    if (this.a) this.a = !1;
    else {
      var b = a.c,
        c = b.button,
        d = b.type,
        e = cf(b, "mousedown");
      this.b.U(new P(e, a.b));
      e = cf(b, "mouseup");
      this.b.ga(new P(e, a.b));
      bf || (b.button = c, b.type = d)
    }
  };
  Ue.prototype.v = function() {
    this.b = null;
    Ue.i.v.call(this)
  };
  var df = function() {};
  w(df, Pe);
  aa(df);
  g = df.prototype;
  g.oa = function() {};
  g.aa = function(a) {
    Te(a);
    a.Y &= -256;
    $e(a, 32, !1);
    return a.f.ta("BUTTON", {
      "class": He(this, a).join(" "),
      disabled: !a.a(),
      title: a.L || "",
      value: a.K() || ""
    }, Ve(a) || "")
  };
  g.ab = function(a) {
    return "BUTTON" == a.tagName || "INPUT" == a.tagName && ("button" == a.type || "submit" == a.type || "reset" == a.type)
  };
  g.H = function(a, b) {
    Te(a);
    a.Y &= -256;
    $e(a, 32, !1);
    if (b.disabled) {
      var c = za(Ne(this, 1));
      Kd(b, c)
    }
    return df.i.H.call(this, a, b)
  };
  g.ib = function(a) {
    ze(a).listen(a.h(), "click", a.R)
  };
  g.Ja = n;
  g.cb = n;
  g.bb = function(a) {
    return a.a()
  };
  g.Aa = n;
  g.Ka = function(a, b, c) {
    df.i.Ka.call(this, a, b, c);
    (a = a.h()) && 1 == b && (a.disabled = c)
  };
  g.K = function(a) {
    return a.value
  };
  g.Ia = function(a, b) {
    a && (a.value = b)
  };
  g.O = n;
  var W = function(a, b, c) {
    U.call(this, a, b || df.$(), c)
  };
  w(W, U);
  W.prototype.K = function() {
    return this.Sa
  };
  W.prototype.v = function() {
    W.i.v.call(this);
    delete this.Sa;
    delete this.L
  };
  W.prototype.M = function() {
    W.i.M.call(this);
    if (this.A & 32) {
      var a = this.h();
      a && ze(this).listen(a, "keyup", this.fa)
    }
  };
  W.prototype.fa = function(a) {
    return 13 == a.a && "key" == a.type || 32 == a.a && "keyup" == a.type ? this.R(a) : 32 == a.a
  };
  Qe("goog-button", function() {
    return new W(null)
  });
  D && J(8);
  var ef = function(a) {
      if (null != a) switch (a.la) {
      case 1:
        return 1;
      case -1:
        return -1;
      case 0:
        return 0
      }
      return null
    },
    gf = function(a) {
      if (null != a && a.Z === Od) return z(a.constructor === Td), a;
      if (a instanceof cb) {
        var b = ff;
        if (a instanceof cb && a.constructor === cb && a.f === bb) var c = a.a;
        else ya("expected object of type SafeHtml, got '" + a + "' of type " + ba(a)), c = "type_error:SafeHtml";
        a = b(c, a.c())
      } else a = ff(ua(String(String(a))), ef(a));
      return a
    },
    ff = function(a) {
      function b(a) {
        this.content = a
      }
      b.prototype = a.prototype;
      return function(a,
        d) {
        a = new b(String(a));
        void 0 !== d && (a.la = d);
        return a
      }
    }(Td);
  (function(a) {
    function b(a) {
      this.content = a
    }
    b.prototype = a.prototype;
    return function(a, d) {
      a = String(a);
      if (!a) return "";
      a = new b(a);
      void 0 !== d && (a.la = d);
      return a
    }
  })(Td);
  var X = function(a) {
      return null != a && a.Z === Od ? (z(a.constructor === Td), String(String(a.T()).replace(hf, "").replace(jf, "&lt;")).replace(kf, lf)) : ua(String(a))
    },
    nf = function(a) {
      if (null != a && a.Z === Pd) return z(a.constructor === Ud), a.T().replace(/([^"'\s])$/, "$1 ");
      a = String(a);
      mf.test(a) || (ya("Bad value `%s` for |filterHtmlAttributes", [a]), a = "zSoyz");
      return a
    },
    of = {
      "\x00": "&#0;",
      "\t": "&#9;",
      "\n": "&#10;",
      "\x0B": "&#11;",
      "\f": "&#12;",
      "\r": "&#13;",
      " ": "&#32;",
      '"': "&quot;",
      "&": "&amp;",
      "'": "&#39;",
      "-": "&#45;",
      "/": "&#47;",
      "<": "&lt;",
      "=": "&#61;",
      ">": "&gt;",
      "`": "&#96;",
      "\u0085": "&#133;",
      "\u00a0": "&#160;",
      "\u2028": "&#8232;",
      "\u2029": "&#8233;"
    },
    lf = function(a) {
      return of[a]
    },
    kf = /[\x00\x22\x27\x3c\x3e]/g,
    mf = /^(?!on|src|(?:style|action|archive|background|cite|classid|codebase|data|dsync|href|longdesc|usemap)\s*$)(?:[a-z0-9_$:-]*)$/i,
    hf = /<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g,
    jf = /</g;
  var pf = function(a) {
    a = a || {};
    var b = a.content,
      c = ff,
      d = '<div role="button"' + (a.id ? ' id="' + X(a.id) + '"' : "") + ' class="';
    var e = a || {};
    var f = "goog-inline-block jfk-button ",
      h = e.style;
    switch (r(h) ? h.toString() : h) {
    case 0:
      f += "jfk-button-standard";
      break;
    case 2:
      f += "jfk-button-action";
      break;
    case 3:
      f += "jfk-button-primary";
      break;
    case 1:
      f += "jfk-button-default";
      break;
    case 4:
      f += "jfk-button-flat";
      break;
    case 5:
      f += "jfk-button-mini";
      break;
    case 6:
      f += "jfk-button-contrast";
      break;
    default:
      f += "jfk-button-standard"
    }
    f += (1 == e.width ?
      " jfk-button-narrow" : "") + (e.checked ? " jfk-button-checked" : "") + (e.ka ? " " + e.ka : "") + (e.disabled ? " jfk-button-disabled" : "");
    return c(d + X(new Sd(f, void 0)) + '"' + (a.disabled ? ' aria-disabled="true"' : ' tabindex="' + (a.Ra ? X(a.Ra) : "0") + '"') + (a.title ? a.Bb ? ' data-tooltip="' + X(a.title) + '"' : ' title="' + X(a.title) + '"' : "") + (a.value ? ' value="' + X(a.value) + '"' : "") + (a.attributes ? " " + nf(a.attributes) : "") + ">" + gf(null != b ? b : "") + "</div>")
  };
  pf.a = "jfk.templates.button.strict";
  (function() {
    if (jb) {
      var a = /Windows NT ([0-9.]+)/;
      return (a = a.exec(B)) ? a[1] : "0"
    }
    return I ? (a = /10[_.][0-9_.]+/, (a = a.exec(B)) ? a[0].replace(/_/g, ".") : "10") : kb ? (a = /Android\s+([^\);]+)(\)|;)/, (a = a.exec(B)) ? a[1] : "") : lb || mb || nb ? (a = /(?:iPhone|CPU)\s+OS\s+(\S+)/, (a = a.exec(B)) ? a[1].replace(/_/g, ".") : "") : ""
  })();
  var qf = C("Firefox"),
    rf = eb() || C("iPod"),
    sf = C("iPad"),
    tf = C("Android") && !(ab() || C("Firefox") || C("Opera") || C("Silk")),
    uf = ab(),
    vf = C("Safari") && !(ab() || C("Coast") || C("Opera") || C("Edge") || C("Silk") || C("Android")) && !(eb() || C("iPad") || C("iPod"));
  var wf = function(a) {
    return (a = a.exec(B)) ? a[1] : ""
  };
  (function() {
    if (qf) return wf(/Firefox\/([0-9.]+)/);
    if (D || E || ib) return tb;
    if (uf) return eb() || C("iPad") || C("iPod") ? wf(/CriOS\/([0-9.]+)/) : wf(/Chrome\/([0-9.]+)/);
    if (vf && !(eb() || C("iPad") || C("iPod"))) return wf(/Version\/([0-9.]+)/);
    if (rf || sf) {
      var a = /Version\/(\S+).*Mobile\/(\S+)/.exec(B);
      if (a) return a[1] + "." + a[2]
    } else if (tf) return (a = wf(/Android\s+([0-9.]+)/)) ? a : wf(/Version\/([0-9.]+)/);
    return ""
  })();
  var Y = function(a, b, c, d) {
    W.call(this, a, xf.$(), b);
    this.P = c || 0;
    this.qa = d || 0;
    this.Va = !1
  };
  w(Y, W);
  Y.prototype.setEnabled = function(a) {
    this.a() != a && (Y.i.setEnabled.call(this, a), yf(this))
  };
  Y.prototype.ia = function(a) {
    Y.i.ia.call(this, a);
    zf(this, !1)
  };
  Y.prototype.U = function(a) {
    Y.i.U.call(this, a);
    this.a() && zf(this, !0)
  };
  Y.prototype.ga = function(a) {
    Y.i.ga.call(this, a);
    this.a() && zf(this, !0)
  };
  var zf = function(a, b) {
      a.h() && (a = a.h(), b ? Kd(a, "jfk-button-clear-outline") : Md(a, "jfk-button-clear-outline"))
    },
    yf = function(a) {
      a.h() && Af(a.c, a)
    },
    xf = function() {
      this.u = this.m() + "-standard";
      this.b = this.m() + "-action";
      this.s = this.m() + "-primary";
      this.g = this.m() + "-default";
      this.j = this.m() + "-flat";
      this.o = this.m() + "-narrow";
      this.l = this.m() + "-mini";
      this.f = this.m() + "-contrast"
    };
  w(xf, Pe);
  aa(xf);
  g = xf.prototype;
  g.W = function(a, b, c) {
    a && c.P != a && (c.P = a, yf(c));
    b && c.qa != b && (c.qa = b, yf(c))
  };
  g.m = function() {
    return "jfk-button"
  };
  g.aa = function(a) {
    Da(a, Y, "Button is expected to be instance of jfk.Button");
    var b = a.f,
      c = Zd(pf, {
        disabled: !a.a(),
        checked: a.N(),
        style: a.P,
        title: a.L,
        Bb: a.Va,
        value: a.K(),
        width: a.qa
      }, b);
    b.rb(c, a.T());
    this.H(a, c);
    return c
  };
  g.H = function(a, b) {
    xf.i.H.call(this, a, b);
    this.c || (this.c = Ua(this.u, v(this.W, 0, null), this.b, v(this.W, 2, null), this.s, v(this.W, 3, null), this.g, v(this.W, 1, null), this.j, v(this.W, 4, null), this.l, v(this.W, 5, null), this.f, v(this.W, 6, null), this.o, v(this.W, null, 1)));
    for (var c = Id(b), d = 0; d < c.length; ++d) {
      var e = this.c[c[d]];
      e && e(a)
    }
    if (c = b.getAttribute("data-tooltip")) a.L = c, a.Va = !0;
    return b
  };
  g.K = function(a) {
    return a.getAttribute("value") || ""
  };
  g.Ia = function(a, b) {
    a && a.setAttribute("value", b)
  };
  var Af = function(a, b) {
    function c(a, b) {
      (a ? d : e).push(b)
    }
    z(b.h(), "Button element must already exist when updating style.");
    var d = [],
      e = [],
      f = b.P;
    c(0 == f, a.u);
    c(2 == f, a.b);
    c(3 == f, a.s);
    c(4 == f, a.j);
    c(5 == f, a.l);
    c(1 == f, a.g);
    c(6 == f, a.f);
    c(1 == b.qa, a.o);
    c(!b.a(), a.m() + "-disabled");
    Nd(b.h(), e);
    Ld(b.h(), d)
  };
  var Ee = function() {};
  w(Ee, T);
  aa(Ee);
  Ee.prototype.aa = function(a) {
    var b = a.f.ta("SPAN", He(this, a).join(" "));
    Bf(this, b, a.l);
    return b
  };
  Ee.prototype.H = function(a, b) {
    b = Ee.i.H.call(this, a, b);
    z(b);
    var c = Id(b),
      d = !1;
    Ja(c, Cf(this, null)) ? d = null : Ja(c, Cf(this, !0)) ? d = !0 : Ja(c, Cf(this, !1)) && (d = !1);
    a.l = d;
    z(b, "The element cannot be null.");
    pe(b, "checked", null == d ? "mixed" : 1 == d ? "true" : "false");
    return b
  };
  Ee.prototype.oa = function() {
    return "checkbox"
  };
  var Bf = function(a, b, c) {
    if (b) {
      z(b);
      var d = Cf(a, c);
      z(d);
      z(b);
      Jd(b, d) || (Qa(Df, function(a) {
        a = Cf(this, a);
        z(b);
        a == d ? Kd(b, a) : Md(b, a)
      }, a), pe(b, "checked", null == c ? "mixed" : 1 == c ? "true" : "false"))
    }
  };
  Ee.prototype.m = function() {
    return "goog-checkbox"
  };
  var Cf = function(a, b) {
    a = a.m();
    if (1 == b) return a + "-checked";
    if (0 == b) return a + "-unchecked";
    if (null == b) return a + "-undetermined";
    throw Error("Invalid checkbox state: " + b);
  };
  var Ef = function(a, b, c) {
    c = c || Ee.$();
    U.call(this, null, c, b);
    this.l = void 0 !== a ? a : !1
  };
  w(Ef, U);
  var Df = {
    mb: !0,
    qd: !1,
    rd: null
  };
  g = Ef.prototype;
  g.F = null;
  g.N = function() {
    return 1 == this.l
  };
  g.ha = function(a) {
    a != this.l && (this.l = a, Bf(this.c, this.h(), this.l))
  };
  g.M = function() {
    Ef.i.M.call(this);
    if (this.va) {
      var a = ze(this);
      this.F && a.listen(this.F, "click", this.La).listen(this.F, "mouseover", this.Na).listen(this.F, "mouseout", this.Ma).listen(this.F, "mousedown", this.U).listen(this.F, "mouseup", this.ga);
      a.listen(this.h(), "click", this.La)
    }
    a = xe(this);
    if (this.F && a != this.F && /^[\s\xa0]*$/.test(qe(a))) {
      if (!this.F.id) {
        var b = this.F;
        var c = (this.B || (this.B = ":" + (this.Ta.a++).toString(36))) + ".lbl";
        b.id = c
      }
      pe(a, "labelledby", this.F.id)
    }
  };
  g.setEnabled = function(a) {
    Ef.i.setEnabled.call(this, a);
    if (a = this.h()) a.tabIndex = this.a() ? 0 : -1
  };
  g.La = function(a) {
    a.j();
    var b = this.l ? "uncheck" : "check";
    this.a() && !a.target.href && this.D(b) && (a.g(), this.ha(this.l ? !1 : !0), this.D("change"))
  };
  g.fa = function(a) {
    32 == a.a && (this.R(a), this.La(a));
    return !1
  };
  Qe("goog-checkbox", function() {
    return new Ef
  });
  var Ff = function(a) {
    a = a || {};
    var b = a.lb ? " " + X("jfk-checkbox-undetermined") : a.checked ? " " + X("jfk-checkbox-checked") : " " + X("jfk-checkbox-unchecked");
    var c = a.lb ? "mixed" : a.checked ? "true" : "false";
    var d = a.pb ? ' aria-labelledby="' + X(a.pb) + '"' : a.ob ? ' aria-label="' + X(a.ob) + '"' : "";
    return ff('<span class="' + X("jfk-checkbox") + " " + X("goog-inline-block") + b + (a.disabled ? " " + X("jfk-checkbox-disabled") : "") + (a.ka ? " " + X(a.ka) : "") + '" role="checkbox" aria-checked="' + c + '"' + d + (a.id ? ' id="' + X(a.id) + '"' : "") + (a.disabled ? ' aria-disabled="true" tabindex="-1"' :
      ' tabindex="' + (a.Ra ? X(a.Ra) : "0") + '"') + (a.attributes ? " " + nf(a.attributes) : "") + ' dir="ltr"><div class="' + X("jfk-checkbox-checkmark") + '" role="presentation"></div></span>')
  };
  Ff.a = "jfk.templates.checkbox.main";
  var Gf = function(a, b) {
    var c = Fe();
    Ef.call(this, a, b, c);
    $e(this, 4, !0)
  };
  w(Gf, Ef);
  Gf.prototype.Da = function() {
    this.b = Zd(Ff, {
      checked: this.N(),
      disabled: !this.a(),
      lb: null == this.l
    }, this.f)
  };
  Gf.prototype.sa = function(a) {
    Gf.i.sa.call(this, a);
    Kd(a, "goog-inline-block");
    this.h().dir = "ltr";
    ye(this) || (a = this.f.ta("DIV", "jfk-checkbox-checkmark"), this.h().appendChild(a));
    a = ye(this);
    z(a, "Expected element in component with class: %s", "jfk-checkbox-checkmark");
    ne(a, "presentation")
  };
  Gf.prototype.ia = function(a) {
    Gf.i.ia.call(this, a);
    Hf(this, !1)
  };
  Gf.prototype.U = function(a) {
    Gf.i.U.call(this, a);
    this.a() && Hf(this, !0)
  };
  var Hf = function(a, b) {
    a.h() && (a = a.h(), b ? Kd(a, "jfk-checkbox-clearOutline") : Md(a, "jfk-checkbox-clearOutline"))
  };
  var If = function(a) {
    a = a || {};
    return ff('<div class="' + X("jfk-radiobutton") + (a.checked ? " " + X("jfk-radiobutton-checked") : "") + (a.disabled ? " " + X("jfk-radiobutton-disabled") : "") + (a.ka ? " " + X(a.ka) : "") + '"' + (a.name ? ' data-name="' + X(a.name) + '"' : "") + (a.value ? ' data-value="' + X(a.value) + '"' : "") + (a.id ? ' id="' + X(a.id) + '"' : "") + (a.attributes ? " " + nf(a.attributes) : "") + ' role="radio"><span class="' + X("jfk-radiobutton-radio") + '"></span><div class="' + X("jfk-radiobutton-label") + '">' + (a.label ? gf(a.label) : "") + "</div></div>")
  };
  If.a = "jfk.templates.radiobutton.strict";
  var Z = function(a, b, c, d) {
    U.call(this, null, Jf.$(), a);
    this.P = c || "";
    this.Ea = d || "";
    $e(this, 16, !0);
    this.Y &= -17;
    b && Kf(this, b)
  };
  w(Z, U);
  Z.prototype.R = function(a) {
    this.ha(!0);
    return Z.i.R.call(this, a)
  };
  Z.prototype.fa = function(a) {
    switch (a.a) {
    case 38:
    case 37:
      return this.D(a.ctrlKey ? "b" : "d"), !0;
    case 40:
    case 39:
      return this.D(a.ctrlKey ? "a" : "c"), !0;
    case 32:
      return this.R(a);
    case 9:
      return this.D(a.shiftKey ? "g" : "f"), !1
    }
    return Z.i.fa.call(this, a)
  };
  Z.prototype.K = function() {
    return this.P
  };
  Z.prototype.setEnabled = function(a) {
    Z.i.setEnabled.call(this, a);
    this.D("e")
  };
  var Kf = function(a, b) {
      a.Ua = b;
      a.h() && (b = a.Ua, a = a.c.pa(a.h()), z(a), Kb(a), Jb(a, b))
    },
    Jf = function() {};
  w(Jf, T);
  aa(Jf);
  g = Jf.prototype;
  g.aa = function(a) {
    var b = Zd(If, {
      checked: a.N(),
      disabled: !a.a(),
      name: a.Ea,
      value: a.K()
    }, a.f);
    if (a = a.Ua) {
      var c = this.pa(b);
      z(c);
      Kb(c);
      Jb(c, a)
    }
    return b
  };
  g.H = function(a, b) {
    Jf.i.H.call(this, a, b);
    var c = b.getAttribute("data-value");
    if (c) {
      a.P = c;
      var d = a.h();
      d && d.setAttribute("data-value", c)
    }
    if (c = b.getAttribute("data-name")) a.Ea = c, a.h() && a.h().setAttribute("data-name", c);
    c = this.pa(b);
    z(c);
    c.firstChild ? Kf(a, c.firstChild.nextSibling ? Ma(c.childNodes) : c.firstChild) : Kf(a, null);
    return b
  };
  g.oa = function() {
    return "radio"
  };
  g.pa = function(a) {
    return Db(this.m() + "-label", a)
  };
  g.m = function() {
    return "jfk-radiobutton"
  };
  var Mf = function(a) {
    R.call(this);
    this.a = [];
    Lf(this, a)
  };
  w(Mf, R);
  Mf.prototype.b = null;
  Mf.prototype.c = null;
  var Lf = function(a, b) {
    b && (A(b, function(a) {
      Nf(this, a, !1)
    }, a), Na(a.a, b))
  };
  Mf.prototype.clear = function() {
    var a = this.a;
    if (!p(a))
      for (var b = a.length - 1; 0 <= b; b--) delete a[b];
    a.length = 0;
    this.b = null
  };
  Mf.prototype.v = function() {
    Mf.i.v.call(this);
    delete this.a;
    this.b = null
  };
  var Nf = function(a, b, c) {
    b && ("function" == typeof a.c ? a.c(b, c) : "function" == typeof b.Qa && b.Qa(c))
  };
  var Pf = function(a, b) {
    R.call(this);
    this.f = b || "";
    this.a = new Mf;
    bd(this, v(cd, this.a));
    this.b = new re(this);
    bd(this, v(cd, this.b));
    this.a.c = Of;
    this.b.listen(this.a, "select", v(this.D, "change"));
    this.b.listen(this, "a", this.tb);
    this.b.listen(this, "b", this.ub);
    this.b.listen(this, "c", this.vb);
    this.b.listen(this, "d", this.Ab);
    this.b.listen(this, "e", this.wa);
    this.b.listen(this, "f", v(this.fb, !1));
    this.b.listen(this, "g", v(this.fb, !0));
    a && A(a, this.c, this)
  };
  w(Pf, R);
  Pf.prototype.c = function(a) {
    z(null != a);
    this.b.listen(a, "action", this.sb);
    a.Ba(this);
    var b = this.f;
    a.Ea = b;
    a.h() && a.h().setAttribute("data-name", b);
    b = a.N();
    var c = this.a,
      d = c.a.length;
    a && (Nf(c, a, !1), Pa(c.a, d, 0, a));
    b && Qf(this, a);
    a.h() && this.wa()
  };
  var Qf = function(a, b) {
      var c = a.a;
      b != c.b && (Nf(c, c.b, !1), c.b = b, Nf(c, b, !0));
      c.D("select");
      a.wa()
    },
    Rf = function(a) {
      return (a = a.a.b) ? a.K() : null
    },
    Sf = function(a, b, c) {
      var d = a.a.a[b] || null;
      c && Qf(a, d);
      A(Ma(a.a.a), function(a) {
        a.h() && Qb(a.h(), d == a)
      });
      try {
        d.h().focus()
      } catch (e) {}
    },
    Uf = function(a, b, c, d) {
      c = Tf(a, b, c); - 1 != c && a.a.a[c] && (Qb(b.h(), !1), Sf(a, c, d))
    },
    Tf = function(a, b, c) {
      var d = a.a.a.length;
      b = b ? Ea(a.a.a, b) : -1;
      for (var e = 1; e <= d; e++) {
        var f = (b + c * e) % d;
        f = 0 > f * d ? f + d : f;
        if ((a.a.a[f] || null).a()) return f
      }
      return -1
    };
  g = Pf.prototype;
  g.Ab = function(a) {
    a = a.target;
    z(a);
    Uf(this, a, -1, !0)
  };
  g.vb = function(a) {
    a = a.target;
    z(a);
    Uf(this, a, 1, !0)
  };
  g.ub = function(a) {
    a = a.target;
    z(a);
    Uf(this, a, -1, !1)
  };
  g.tb = function(a) {
    a = a.target;
    z(a);
    Uf(this, a, 1, !1)
  };
  g.fb = function(a) {
    var b = this.wa();
    try {
      var c = b[a ? 0 : 1];
      c && c.h().focus()
    } catch (d) {}
  };
  g.wa = function() {
    var a = this.a.b,
      b = this.a.a[0] || null,
      c = a && a.a(),
      d = c ? a : b;
    z(d, "Must have at least one button in the group");
    d.a() || (a = Tf(this, d, 1), d = -1 != a ? this.a.a[a] || null : null);
    var e = d;
    d && !c && (a = Tf(this, d, -1), e = -1 != a ? this.a.a[a] || null : null);
    A(Ma(this.a.a), function(a) {
      a.h() && Qb(a.h(), d == a || e == a)
    });
    return [d, e]
  };
  g.sb = function(a) {
    a = a.target;
    Qf(this, a);
    try {
      a.h().focus()
    } catch (b) {}
  };
  g.v = function() {
    A(Ma(this.a.a), function(a) {
      cd(a)
    });
    Pf.i.v.call(this)
  };
  var Of = function(a, b) {
    a.ha(b);
    a.h() && Qb(a.h(), b)
  };
  var Wf = function() {
    this.a = new Tc;
    this.j = document.getElementById("targetLangSel");
    Vf();
    this.L = new Y;
    Be(this.L, document.getElementById("saveBtn"));
    this.J = new Y;
    Be(this.J, document.getElementById("resetBtn"));
    this.l = document.getElementById("saveStatus");
    this.u = new Z(void 0, x("MSG_OPTIONS_ICON_DESC"), "1");
    this.o = new Z(void 0, x("MSG_OPTIONS_POPUP_DESC"), "2");
    this.C = new Z(void 0, x("MSG_OPTIONS_NONE_DESC"), "0");
    Ae(this.u, document.getElementById("popup-option-content"));
    if (!Uc) {
      this.f = Hb("DIV", "popup-option-ai");
      document.getElementById("popup-option-content").appendChild(this.f);
      this.b = new Gf;
      this.g = Hb("SPAN", "popup-option-ai-lbl");
      L(this.g, x("MSG_OPTIONS_ALWAYS_SHOW_ICON"));
      var a = this.b,
        b = this.g;
      if (a.I) {
        var c = !!(a.w & 32);
        a.da();
        a.F = b;
        a.M();
        c && xe(a).focus()
      } else a.F = b;
      Ae(this.b, this.f);
      this.f.appendChild(this.g)
    }
    Ae(this.o, document.getElementById("popup-option-content"));
    a = Hb("DIV", "popup-option-tip", x("MSG_OPTIONS_POPUP_TIP"));
    document.getElementById("popup-option-content").appendChild(a);
    Ae(this.C, document.getElementById("popup-option-content"));
    a = Hb("DIV", "popup-option-tip", x("MSG_OPTIONS_NONE_TIP"));
    document.getElementById("popup-option-content").appendChild(a);
    this.c = new Pf([this.u, this.o, this.C])
  };
  Wf.prototype.s = function() {
    if (this.a.loaded) {
      Vf();
      Xf(this);
      for (var a = this.c.a.a.length, b = 0; b < a; ++b) {
        var c = this.c.a.a[b] || null;
        if (c.K() == this.a.b) {
          Qf(this.c, c);
          break
        }
      }
      this.j.addEventListener("change", t(this.P, this));
      Q(this.c, "change", this.ja, !1, this);
      Uc || (this.b.ha(!this.a.c), Uc || this.b.setEnabled("1" == Rf(this.c)), Q(this.b, "change", this.ba, !1, this));
      Q(this.L, "action", this.ca, !1, this);
      Q(this.J, "action", function() {
        window.history.go(0)
      })
    } else Hd(this.s, this)
  };
  var Xf = function(a) {
    var b = 0;
    a: {
      var c = a.a.f;
      break a;
      throw Error("Invalid input for getLangList()");
    }
    var d = a.a;
    if ("" != d.a) d = d.a;
    else a: {
      for (var e = 0; e < d.g.length; e++) {
        var f = ja(d.g[e]);
        if (d.f[f]) {
          d = f;
          break a
        }
      }
      d = "en"
    }
    d = d || "";
    for (var h in c) e = document.createElement("option"), e.value = h, e.text = c[h], e.a = b++, a.j.appendChild(e), h == d && (e.selected = !0)
  };
  Wf.prototype.P = function() {
    this.a.a = this.j.value
  };
  Wf.prototype.ja = function() {
    Uc || this.b.setEnabled("1" == Rf(this.c));
    var a = Rf(this.c);
    this.a.b = a
  };
  Wf.prototype.ba = function() {
    this.a.c = !this.b.N()
  };
  Wf.prototype.ca = function() {
    Wc(this.a);
    this.l.style.display = "";
    this.l.style.setProperty("-webkit-transition", "opacity 0.4s ease-out");
    this.l.style.opacity = 1;
    window.setTimeout(function() {
      document.getElementById("saveStatus").style.opacity = 0
    }, 1500)
  };
  var Vf = function() {
    L(K(document, "options-page-title"), x("MSG_OPTIONS_PAGE_TITLE"));
    L(K(document, "options-title-heading"), x("MSG_OPTIONS_TITLE"));
    L(K(document, "lang-option"), x("MSG_OPTIONS_LANG"));
    L(K(document, "popup-option"), x("MSG_OPTIONS_POPUP"));
    L(K(document, "popup-option-title"), x("MSG_OPTIONS_POPUP_TITLE"));
    L(K(document, "saveBtn"), x("MSG_OPTIONS_SAVE"));
    L(K(document, "resetBtn"), x("MSG_OPTIONS_RESET"));
    L(K(document, "saveStatus"), x("MSG_OPTIONS_SAVED_STATUS"));
    L(K(document, "footer-homepage"), x("MSG_OPTIONS_FOOTER_HOMEPAGE"));
    L(K(document, "patched-footer-homepage"), x("MSG_OPTIONS_PATCHED_FOOTER_HOMEPAGE"));
    L(K(document, "footer-privacy"), x("MSG_OPTIONS_FOOTER_PRIVACY"));
    L(K(document, "connect-url-label"), x("MSG_CONNECT_URL_LABEL"));
    L(K(document, "model-name-option"), x("MSG_MODEL_NAME_OPTION"));
    L(K(document, "deck-name-option"), x("MSG_DECK_NAME_OPTION"));
    L(K(document, "anki-options-title-heading"), x("MSG_ANKI_OPTIONS_TITLE"));
    L(K(document, "deck-field-option-sentence"), x("MSG_DECK_SELECTED_TEXT_OPTION")); /* fields */
    L(K(document, "deck-field-option-translation"), x("MSG_DECK_TRANSLATION_OPTION")); /* fields */
    L(K(document, "deck-field-option-word"), x("MSG_DECK_WORD_OPTION")); /* fields */
    L(K(document, "saveAnkiBtn"), x("MSG_SAVE_ANKI_OPTIONS"));
  };
  document.addEventListener("DOMContentLoaded", function() {
    (new Wf).s()
  });
})();