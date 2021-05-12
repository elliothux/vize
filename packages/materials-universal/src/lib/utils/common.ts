export function isChildrenEmpty(children: React.ReactElement[]) {
  if (!children) {
    return true;
  }
  if (Array.isArray(children)) {
    return children.length <= 0;
  }
  return false;
}

const protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;
const localhostDomainRE = /^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/;
const nonLocalhostDomainRE = /^[^\s\.]+\.\S{2,}$/;

export function isUrl(str: any): boolean {
  if (typeof str !== 'string') {
    return false;
  }

  const match = str.match(protocolAndDomainRE);
  if (!match) {
    return false;
  }

  const everythingAfterProtocol = match[1];
  if (!everythingAfterProtocol) {
    return false;
  }

  return localhostDomainRE.test(everythingAfterProtocol) || nonLocalhostDomainRE.test(everythingAfterProtocol);
}
