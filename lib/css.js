export function cssVariable(name, node = document.body) {
  return getComputedStyle(node).getPropertyValue(name);
}

export function overrideStyleProperty(name, value, node = document.body) {
  if (value) {
    node.style.setProperty(name, value);
  }
}
