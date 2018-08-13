const path = require('path');

function resolve (dir) {
    return path.join(__dirname,dir)
}

module.exports={
    lintOnSave:true,
    chainWebpack:(config)=>{
        config.resolve.alias
            .set('@',resolve('src'))
            .set('@assets',resolve('src/assets'))
            .set('@common',resolve('src/common'))
            .set('@pages',resolve('src/pages'))
            .set('@router',resolve('src/router'))
            .set('@config',resolve('src/config'))
            .set('@store',resolve('src/store'))
            .set('@service',resolve('src/service'))
            .set('@utils',resolve('src/utils'))
    }
}
