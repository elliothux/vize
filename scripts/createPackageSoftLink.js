const path = require('path');
const fs = require('fs');

[[path.resolve(__dirname, '../packages/i18n'), path.resolve(__dirname, '../packages/management-ui/src/i18n')]].forEach(
  ([from, to]) => {
    console.log(`Create soft link from "${from}" to "${to}"`);
    if (fs.existsSync(to)) {
      fs.unlinkSync(to);
    }
    fs.symlinkSync(from, to);
  },
);
