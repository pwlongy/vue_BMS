module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        assets : '@/assets',
        components: '@/components',
        views: "@/views",
        utils: "@/utils",
        common: "@/common"
      }
    }
  },
  chainWebpack: config => {
    config.module.rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true
      })
  },
  devServer: {
    proxy: "http://localhost:3000"
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     ws: true,
    //     changeOrigin: true
    //   }
    // }
  }
}