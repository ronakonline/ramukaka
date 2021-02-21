var request = require('request');
const loveyou = require("loveyou-api");

module.exports = {

    getimage: async function(requestimg) {
        var image = await loveyou.nsfw(requestimg).then((url) => { return url; });
        //console.log(image);
        return image;
    }
};