const NewsAPI = require('newsapi');
const { newstoken } = require('../config.json');
const request = require('request');
const newsapi = new NewsAPI(newstoken);

// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them

module.exports = {
    getheadline: async function() {
        var article = await newsapi.v2.topHeadlines({
            language: 'en',
            country: 'in'
        }).then(response => {
            if (response.status === 'ok') {
                var Index = Math.floor(Math.random() * response.totalResults);
                // console.log(Index);
                return response.articles[Index];
            }
        });
        // console.log(article);
        return article
    },
    corona: async function() {
        var cases = await new Promise((resolve) => {
            request({ uri: "https://api.covidindiatracker.com/total.json", json: true }, function(error, response) {
                //console.log(response.body);
                resolve(response.body);
            })
        })

        return cases;

    }
};