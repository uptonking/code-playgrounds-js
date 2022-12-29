const baseConfig = require('../../config/jest.base');
const pkgConfig = {
  displayName: 'level-db-like',
  rootDir: '../..',
  // setupFilesAfterEnv: ['<rootDir>/config/setupTests.js'],
};

module.exports = {
  ...baseConfig,
  ...pkgConfig,
};
