const webpack = require('webpack')

module.exports = {
    //引入jquery
    chainWebpack: config => {
        config.plugin('provide').use(webpack.ProvidePlugin, [{
            $: 'jquery',
            jquery: 'jquery',
            jquery: 'jquery',
            'window.jquery': 'jquery'
        }])
    }
}