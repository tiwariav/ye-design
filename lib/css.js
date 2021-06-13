export function cssVar(name, node = document.body) {
  return getComputedStyle(node).getPropertyValue(name);
}
