export function posixPath(path) {
  return path.replaceAll("\\", "/");
}
