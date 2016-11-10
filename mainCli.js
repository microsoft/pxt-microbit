const pxtCore = require("pxt-core");

exports.mainCli = function (args) {
    pxtCore.mainCli(__dirname, args);
}

exports.pxtCoreDir = function() {
    return require.resolve("pxt-core");
}

exports.pxtGlobalConfig = function() {
    return pxtCore.globalConfig;
}