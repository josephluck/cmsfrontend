function serialize(form) {
  let data,
      i,
      len,
      node,
      ref;

  data = {};
  ref = form.elements;

  for (i = 0, len = ref.length; i < len; i++) {
    node = ref[i];
    if (!node.disabled && node.name) {
      data[node.name] = node.value;
    }
  }
  return data;
}

export default {
  serialize
}