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

export function open(url: string, newTab = false) {
  if (!isUrl(url)) {
    return;
  }

  if (newTab) {
    window.open(url);
  } else {
    window.open(url, '_self');
  }
}
