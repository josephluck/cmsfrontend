function get(key) {
  return window.localStorage.getItem(key);
}

function set(key, value) {
  window.localStorage.setItem(key, value);
}

function remove(key) {
  window.localStorage.removeItem(key);
}

export default {
  get,
  set,
  remove
}