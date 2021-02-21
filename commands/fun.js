const badwords = require('badwords/array');
const insults = require('../utils/insults');
const { giphytoken } = require('../config.json')
const request = require('request-promise')
const req = require('request');
const Discord = require('discord.js');

var GphApiClient = require('giphy-js-sdk-core');
const { DataResolver } = require('discord.js');
gify = GphApiClient(giphytoken)

module.exports = {
    curse: function() {
        return badwords[Math.floor(Math.random() * 200)]
    },
    insult: function() {
        return insults[Math.floor(Math.random() * 160)]
    },
    gif: async function(image) {
        var gifimage = await gify.search('gifs', { "q": image }).then((response) => {

            var responseindex = Math.floor(Math.random() * response.data.length)
            return response.data[responseindex];

        })
        return gifimage;
    },
    joke: async function() {
        var joke = await request.get({ uri: 'https://icanhazdadjoke.com/', json: true });
        // console.log(joke.joke);
        return (joke.status == 200 ? joke.joke : "error");
    },
    flipcoin: function() {
        var r = Math.round(Math.random() * 1)
        return (r == 0 ? 'Head 🟤' : 'Tail ⚪');
    },
    gaymeter: function() {
        var per = Math.round(Math.random() * 100)
        return per;
    },
    meme: function(msg) {
        const embed = new Discord.MessageEmbed();
        req('https://www.reddit.com/r/memes/random/.json', (error, response) => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeDownvotes = content[0].data.children[0].data.downs;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            embed.addField(`${memeTitle}`, `[View thread](${memeUrl})`);
            embed.setImage(memeImage);
            embed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`);
            msg.channel.send(embed)
                .then(sent => console.log(`Sent a reply to ${sent.author.username}`))
            console.log('Bot responded with: ' + memeImage);
        })
    },
    desimeme: function(msg) {
        var subreddit = ['desimemes', 'SaimanSays', 'IndianDankMemes', 'IndianSavageMemes', 'dankinindia', 'IndianxMemes']
        var randome_sub_reddit = Math.floor(Math.random() * 5)
            // console.log(subreddit[randome_sub_reddit])
        let url = 'https://www.reddit.com/r/' + subreddit[randome_sub_reddit] + '/random/.json'
        const embed = new Discord.MessageEmbed();
        req(url, (error, response) => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeDownvotes = content[0].data.children[0].data.downs;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            embed.addField(`${memeTitle}`, `[View thread](${memeUrl})`);
            embed.setImage(memeImage);
            embed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`);
            msg.channel.send(embed)
                .then(sent => console.log(`Sent a reply to ${sent.author.username}`))
            console.log('Bot responded with: ' + memeImage);
        })
    }
};