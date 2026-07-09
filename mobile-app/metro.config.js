const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Desativa configurações problemáticas no Windows
config.serializer = {
  ...config.serializer,
  getModulesRunBeforeMainModule: () => [],
};

config.resolver = {
  ...config.resolver,
  unstable_enableSymlinks: false,
  unstable_conditionNames: ['require'],
};

module.exports = config;
