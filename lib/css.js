export function cssVariable(name, node = document.body) {
  return getComputedStyle(node).getPropertyValue(name);
}
