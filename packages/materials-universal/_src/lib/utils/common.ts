export function isChildrenEmpty(children: React.ReactElement[]) {
  if (!children) {
    return true;
  }
  if (Array.isArray(children)) {
    return children.filter(i => !!i).length <= 0;
  }
  return false;
}

export function createEmptyNode(className?: string): [HTMLDivElement, () => void] {
  const node = document.createElement('div');
  if (className) {
    node.setAttribute('class', className);
  }
  document.body.appendChild(node);
  return [node, () => document.body.removeChild(node)];
}
