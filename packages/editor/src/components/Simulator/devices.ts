export type DeviceItem = [string, number, number, string];

export const phones: DeviceItem[] = [
  [
    'iPhone 8',
    375,
    667,
    `Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1`,
  ],
  [
    'iPhone 8 Plus',
    414,
    736,
    `Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1`,
  ],
  [
    'iPhone XS Max',
    414,
    896,
    `Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/13.2b11866 Mobile/16A366 Safari/605.1.15`,
  ],
  [
    'iPhone X',
    375,
    812,
    `Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1`,
  ],
  [
    'iPhone SE',
    320,
    568,
    `Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15F79`,
  ],
  [
    'Android',
    360,
    640,
    `Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 5 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko; googleweblight) Chrome/38.0.1025.166 Mobile Safari/535.19`,
  ],
  [
    'Pixel 2',
    412,
    732,
    `Mozilla/5.0 (Linux; Android 8.1.0; Pixel Build/OPM4.171019.021.P1; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/74.0.3729.157 Mobile Safari/537.36`,
  ],
  [
    'Pixel 2 XL',
    360,
    720,
    `Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3359.139 Mobile Safari/537.36`,
  ],
  [
    'Galaxy S8',
    360,
    740,
    `Mozilla/5.0 (Linux; Android 7.0; SM-G892A Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/60.0.3112.107 Mobile Safari/537.36`,
  ],
];

export const phoneNames = phones.map(i => i[0]);

export const tablets: DeviceItem[] = [
  [
    'iPad Air',
    834,
    1112,
    `Mozilla/5.0 (iPad; CPU OS 11_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E216`,
  ],
  [
    'iPad mini',
    768,
    1024,
    `Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`,
  ],
  [
    "iPad Pro 12.9''",
    1024,
    1366,
    `Mozilla/5.0 (iPad; CPU OS 12_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16B92`,
  ],
  [
    'Tablet',
    768,
    1024,
    `Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`,
  ],
  [
    'Nexus 9',
    768,
    1024,
    `Mozilla/5.0 (Linux; Android 7.1.1; Nexus 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36`,
  ],
  [
    'Nexus 10',
    800,
    1280,
    `Mozilla/5.0 (Linux; Android 4.3; Nexus 10 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.72 Safari/537.36 DMBrowser-BV`,
  ],
];

export const tabletNames = tablets.map(i => i[0]);

const defaultUA = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36`;
const macBookUA = `Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_6; en-en) AppleWebKit/533.19.4 (KHTML, like Gecko) Version/5.0.3 Safari/533.19.4`;

export const desktops: DeviceItem[] = [
  ['Desktop', 1024, 1024, defaultUA],
  ['Desktop HD', 1440, 1024, defaultUA],
  ["MacBook Pro 13'", 2560, 1600, macBookUA],
  ["MacBook Pro 15'", 2880, 1800, macBookUA],
  [
    'ChromeBook Pixel',
    1280,
    850,
    `Mozilla/5.0 (X11; CrOS x86_64 10704.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3437.0 Safari/537.36`,
  ],
];

export const desktopNames = desktops.map(i => i[0]);
