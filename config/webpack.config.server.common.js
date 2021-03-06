const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const paths = require('./paths')

function forEachLoader (config, callback) {
  config.module.rules.forEach(rule => {
    const loaders = rule.use || rule.oneOf
    if (loaders && loaders.length) {
      loaders.forEach(callback)
    }
  })
}

module.exports = function (config) {
  config.name = 'server'
  config.target = 'node'
  config.entry = [path.resolve(paths.appSrc, 'server', 'index.js')]
  config.output.path = path.resolve(paths.appBuild, 'server')
  config.output.filename = '[name].js'
  config.output.chunkFilename = '[name].chunk.js'
  config.output.libraryTarget = 'commonjs2'
  delete config.optimization.splitChunks
  delete config.optimization.runtimeChunk

  // There's no need to bundle code from node_modules in the server bundle
  // because the NodeJS runtime can load them from node_modules itself.
  // There are some modules that won't work correctly if they aren't bundled
  // though (such as react-universal-component, webpack-flush-chunks and
  // require-universal-module) so we specifically exclude those here as an
  // example even though this project doesn't include them.
  config.externals = [
    fs
      .readdirSync(paths.appNodeModules)
      .filter(x => !/\.bin|react-universal-component|require-universal-module|webpack-flush-chunks|regenerator-runtime/.test(x))
      .reduce((externals, mod) => {
        externals[mod] = `commonjs ${mod}`
        return externals
      }, {}),
    // things like require('lodash/mapValues') won’t be matched by the above but we can use a
    // regular expression to catch them
    /lodash\/.*/
  ]

  // stop the file loader from emitting files into server/static
  forEachLoader(config, loader => {
    if (loader.loader === require.resolve('file-loader')) {
      loader.options.emitFile = false
    }
  })

  // don't use lodash-es on the server, just use normal lodash
  delete config.resolve.alias.lodash

  // remove unwanted plugins
  _.remove(config.plugins, plugin =>
    plugin instanceof webpack.DefinePlugin ||
    (plugin.config && plugin.config.precacheManifestFilename)
  )

  config.node = {
    // we want __dirname to point to the actual filesystem path instead of output.publicPath
    __dirname: false,
    __filename: false
  }

  return config
}
