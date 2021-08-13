module.exports = {
    devServer: {
        porxy: {
            '/api': {
                target: 'http://localhost:3000/api',
                changeOrigin: true, 
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    outputDir: '../backend/public'
}