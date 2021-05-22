export function injectStyle(content: string, className: string, onlyOne = true) {
  if (onlyOne && document.getElementsByClassName(className).length) {
    return;
  }

  if (!content.toString().trim()) {
    return;
  }

  const style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.setAttribute('class', className);
  style.innerHTML = content;
  document.head.appendChild(style);
  return style;
}
