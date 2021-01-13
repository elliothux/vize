#!/usr/bin/env node

function checkNodeVersion() {
  const currentNodeVersion = process.versions.node;
  const semver = currentNodeVersion.split('.');
  const major = semver[0];
  if (Number(major) < 8) {
    console.error('You must update your node version(>=8) to use vize-cli');
    process.exit(1);
  }
}

checkNodeVersion();

require('../dist/index.js');
