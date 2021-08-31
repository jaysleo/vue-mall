const Version = new Date().getTime()
module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    open: true,
    overlay: {
      warnings: false,
      errors: false
    },
    // proxy: {
    //   '/api': { // 访问路径，可以自己设置，
    //     // http://192.168.1.128:8085
    //     // https://hii7mo3m.dnat.tech
    //     // http://pifa.5laoye.com
    //     // https://7ma44orc.dnat.tech
    //     target: 'https://pifa.5laoye.com', // 代理接口，即后端运行所在的端口
    //     changeOrigin: true, // 设置是否跨域
    //     ws: true,
    //     pathRewrite: { // 访问路径重写
    //       '^/api': ''
    //     }
    //   }
    // }
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: {
      // 一种方式，打包后的css 会带版本号，不改变文件名的。
      filename: 'css/[name].[' + Version + '].css',
      chunkFilename: 'css/[name].[' + Version + '].css'
    }
  },
  configureWebpack: config => {
    config.output.chunkFilename = 'js/[name].[' + Version + '].js' // 这种方式适合设备缓存不严重的
    config.output.chunkFilename = 'js/[name].js?v=' + Version // 这种是给打包后的chunk文件加版本号。
  }
}

