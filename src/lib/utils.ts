// @ts-nocheck
import { ResponseData } from "../types";

export const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
};

export function compare(a: ResponseData, b: ResponseData) {
  return a.name.localeCompare(b.name);
}
