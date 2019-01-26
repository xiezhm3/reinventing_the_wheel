export function deepClone(obj) {
  if (typeof obj !== "object") {
    return;
  }
  const copied = obj instanceof Array ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copied[key] =
        typeof obj[key] === "object" ? deepClone(obj[key]) : obj[key];
    }
  }
  return copied;
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
