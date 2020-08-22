export function isChildrenEmpty(children: React.ReactElement[]) {
  if (!children) {
    return true;
  }
  if (Array.isArray(children)) {
    return children.length <= 0;
  }
  return false;
}
