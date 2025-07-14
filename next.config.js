// module.exports = {
//   reactStrictMode: true,
//   output: 'export'
// };
const webpack = require('webpack');

module.exports = {
  reactStrictMode: true,
  output: 'export',
  webpack: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('cesium'),
      })
    );
    return config;
  },
};
