import { posixPath } from "../lib/path";

const PACKAGE_NAME = "ye-ui";

export function getStoryName(dirname) {
  const storyName = posixPath(dirname)
    .split(`/${PACKAGE_NAME}/`)[1]
    .replace(/^components\//, "");
  return `${PACKAGE_NAME}/${storyName}`;
}

export function getStoryFile(storyKind) {
  if (!storyKind.includes("/providers/")) {
    return storyKind.replace(
      RegExp(`^${PACKAGE_NAME}/`),
      `${PACKAGE_NAME}/components/`
    );
  }
}
