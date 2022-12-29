function checkAppEnv(env) {
  return (
    process.env.APP_ENV && process.env.APP_ENV.toLowerCase().indexOf(env) !== -1
  );
}

module.exports = function (api) {
  // 若build依赖于env，就不要再指定api.cache为forever或never了,NODE_ENV
  // api.cache(true);

  const env = api.env();
  // const isProd = api.env('production');

  // 用在react应用开发调试阶段，会启用@babel/preset-react、react-refresh/babel
  const isEnvReactHot = checkAppEnv('reacthot');
  // 用在react项目打包阶段，会启用@babel/preset-react，不会启用react-refresh/babel
  const isEnvReact = checkAppEnv('react');
  console.log(';; process.env.APP_ENV, ', process.env.APP_ENV);

  // Plugins run before Presets. Plugin ordering is first to last.
  const plugins = [
    // [
    //   'babel-plugin-styled-components',
    //   {
    //     displayName: true,
    //     fileName: true,
    //   },
    // ],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    '@babel/proposal-object-rest-spread',
    isEnvReactHot && 'react-refresh/babel',
  ].filter(Boolean);

  function configModule() {
    if (env === 'esm' || env === 'es6') {
      // 编译成node自身的commonjs
      return 'auto';
    }
    return false;
  }

  // Preset ordering is reversed (last to first).
  const presets = [
    [
      '@babel/preset-env',
      {
        // modules: env === 'esm' ? false : 'auto',
        modules: configModule(),
        targets: 'defaults',
        // targets: '> 0.25%, not dead',
        useBuiltIns: 'usage',
        corejs: { version: 3, proposals: true },
        debug: false,
      },
    ],
    [
      '@babel/preset-typescript',
      {
        // later: 支持其他框架的jsx
        isTSX: !!isEnvReact,
        allExtensions: true,
        onlyRemoveTypeImports: true,
        allowNamespaces: true,
        allowDeclareFields: true,
      },
    ],
    isEnvReact && [
      '@babel/preset-react',
      { development: env !== 'production' },
    ],
  ].filter(Boolean);

  const ignore = ['node_modules'];

  return {
    plugins,
    presets,
    ignore,
  };
};
