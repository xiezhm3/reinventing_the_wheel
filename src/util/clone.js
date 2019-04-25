export function deepClone(obj) {
  // undefined, null, function, non-object(primitive value)
  if (!obj || typeof obj !== "object") {
    return obj;
  }
  // DOM node
  if (obj.nodeType && "cloneNode" in obj) {
    return obj.cloneNode(true);
  }

  var _toString = String.prototype.toString;

  if (_toString.call(obj) === "[object Date]") {
    return new Date(obj.getTime());
  }

  if (_toString.call(obj) === "[object RegExp]") {
    var flags = [];
    if (obj.global) {
      flags.push("g");
    }
    if (obj.multiline) {
      flags.push("m");
    }
    if (obj.ignoreCase) {
      flags.push("i");
    }
    return new RegExp(obj.source, flags.join(""));
  }

  var result = Array.isArray(obj) ? [] : {};

  for (var key in obj) {
    result[key] = deepClone(obj[key]);
  }

  return result;
}

export function shallowClone(obj) {
  if (typeof obj !== "object") {
    return;
  }
  const copied = obj instanceof Array ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copied[key] = obj[key];
    }
  }
  return copied;
}
