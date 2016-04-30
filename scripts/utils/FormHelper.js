function serialize(form) {
  let data = {};

  for (let i = 0, x = form.elements.length; i < x; i++) {
    let node = form.elements[i];

    if (!node.disabled && node.name && !node.classList.contains('spreadsheet-input')) {
      data[node.name] = node.value;
    }
  }
  return data;
}

export default {
  serialize
}