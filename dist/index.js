var e=require("nanoid");require("axios");var r=function(){try{var r=[e.nanoid(32)];return Promise.all(r).then(function(e){return console.log("success",e)}).catch(function(e){return console.log("error",e)}),Promise.resolve("")}catch(e){return Promise.reject(e)}},n={bcaWeb3Connect:r};exports.bcaWeb3Connect=r,exports.default=n;
//# sourceMappingURL=index.js.map
