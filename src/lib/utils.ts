// @ts-ignore
export const debounce = (callback, wait) => {
  // @ts-ignore
  let timeoutId = null;
  // @ts-ignore
  return (...args) => {
    // @ts-ignore
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
};


export function compare(a, b) {
  return a.location.name.localeCompare(b.location.name);
}
