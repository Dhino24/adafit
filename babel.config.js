// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: { safari: '12' },
      useBuiltIns: 'usage',
      corejs: 3
    }]
  ]
}