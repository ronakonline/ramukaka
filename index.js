const Discord = require('discord.js');
const { token, prefix, giphytoken } = require('./config.json');
const fun = require('./commands/fun')
const nsfw = require('./commands/nsfw');
const news = require('./commands/news')


const client = new Discord.Client()
var Servers = []

client.on('ready', () => {
    client.user.setActivity('!kaka', { type: 'LISTENING' });
    console.log('Logged in as ' + client.user.tag + '!!')
    client.guilds.cache.filter(server => {
        Servers.push(server.name);
    })
    console.log('Total Servers ' + Servers.length);
})

process.on('uncaughtException', function(err) {
    console.log('Caught exception: ', err);
});

client.on('message', (message) => {

    //Check if message author is bot or not 
    if (message.author.bot !== true) {
        //checks if message starts with prefix
        if (message.content.startsWith(prefix)) {

            //split command from message
            var decode = message.content.split(" ", 2);
            decode[1] = decode[1].toLowerCase();

            //get the index of first space
            var firstspace = message.content.indexOf(" ")

            //get the index of second space
            var secondspace = message.content.indexOf(" ", firstspace + 1)

            //check command
            if (decode[1] == 'helloto') {
                message.channel.send('Arey Bhai <@' + message.mentions.members.first() + '> Hello from ' + message.author.username);
            } else if (decode[1] == 'curse') {
                message.channel.send('<@' + message.mentions.members.first() + '> ' + fun.curse());
            } else if (decode[1] == 'insult') {
                message.channel.send('<@' + message.mentions.members.first() + '>' + fun.insult());
            } else if (decode[1] == 'gif') {
                var image = message.content.substring(secondspace + 1);
                fun.gif(image).then((data) => {
                    embed = {
                        title: 'Ye lo beta 😉',
                        image: { url: data.images.fixed_height.url }
                    }
                    message.channel.send(({ embed: embed }))
                })

            } else if (decode[1] == 'nsfw') {
                if (message.channel.nsfw) {
                    var request = message.content.substring(secondspace + 1);
                    nsfw.getimage(request).then((image) => {
                        embed = {
                            title: 'Ye lo beta 😉',
                            image: { url: image }
                        }
                        message.channel.send(({ embed: embed }))
                    }).catch((error) => {
                        if (error.response.status == 404) {
                            embed = {
                                title: 'Koi Photo Nhi mili beta 😥😥'
                            }
                            message.channel.send(({ embed: embed }))
                        }
                    })

                } else {
                    embed = {
                        title: 'Beta NSFW Channel me Jaao! 😊😊'
                    }
                    message.channel.send(({ embed: embed }))

                }

            } else if (decode[1] == 'joke') {

                fun.joke().then((data) => {
                    embed = {
                        "title": "Ye le Joke 😂 ",
                        "description": data
                    }
                    message.channel.send(({ embed }))
                }).catch((error) => {
                    //console.log();
                    message.channel.send("Network Problem 😶😶")
                })

            } else if (decode[1] == 'flipcoin') {
                message.channel.send(fun.flipcoin());
            } else if (decode[1] == "stats") {
                var server = message.channel.guild.id;
                const guild = client.guilds.cache.get(server)
                const Users = guild.members.cache.filter(member => !member.user.bot).size;
                const Bots = guild.members.cache.filter(member => member.user.bot).size;
                const Online = guild.members.cache.filter(member => member.presence.status == "online").size;

                message.channel.send("Total Memeber 👤 : " + Users + "\nTotal Bots 🤖 : " + Bots + "\nOnline Users 🚏:" + Online);
            } else if (decode[1] == "news") {
                news.getheadline().then((data) => {
                    message.channel.send(data.title);
                }).catch((error) => {
                    message.channel.send("News Network not working! 😑😑");
                });
            } else if (decode[1] == "corona") {
                news.corona().then((data) => {
                    message.channel.send("India Ka Score  \nTotal Cases : " + data.confirmed + "\nActive : " + data.active + "\nRecovered : " + data.recovered);
                })
            } else if (decode[1] == "gaymeter") {

                if (message.mentions.members.first() === undefined) {
                    return message.channel.send('Kisi ko Mention toh kro!');
                }
                if (message.guild.ownerID == message.mentions.members.first().id) {
                    message.channel.send('Maalik ke baare me galat baat nhi BSDK! 😠')
                } else {
                    message.channel.send('<@' + message.mentions.members.first() + '>' + ' is ' + fun.gaymeter() + '% gay! 💅👨‍❤️‍💋‍👨')
                }

            } else if (decode[1] == "meme") {
                fun.meme(message);
            } else if (decode[1] == "desimeme") {
                fun.desimeme(message);
            } else if (decode[1] == '8141195974') {
                process.exit(1);
            } else if (decode[1] == "help") {
                const embed = {
                    "title": "Commands List",
                    "description": "\nRohit mera Malik hai!!\n\n\n",
                    "color": 1369036,
                    "timestamp": "2020-07-22T08:15:42.777Z",
                    "footer": {
                        "icon_url": "https://0.academia-photos.com/6826254/7141838/8044042/s200_ramu.kaka.jpg_oh_b8f67675e4967c44417407e404bc88dc_oe_5590c8d9___gda___1432237460_487e8b1021b866cd8bd038e6cb8f81ca",
                        "text": "Regards - Ramu kaka"
                    },
                    "thumbnail": {
                        "url": "https://0.academia-photos.com/6826254/7141838/8044042/s200_ramu.kaka.jpg_oh_b8f67675e4967c44417407e404bc88dc_oe_5590c8d9___gda___1432237460_487e8b1021b866cd8bd038e6cb8f81ca"
                    },
                    "author": {
                        "name": "Ramu Kaka [BOT]"
                    },
                    "fields": [{
                            "name": "!kaka curse @mention",
                            "value": "It will curse a mentioned user...\n\n"
                        },
                        {
                            "name": "!kaka insult @mention",
                            "value": "Insult a mentioned user!\n\n"
                        },
                        {
                            "name": "!kaka gif [fail,joke,sad]",
                            "value": "To get gif of search!\n\n"
                        },
                        {
                            "name": "!kaka nsfw [boobs,ass,pussy,anal,gif]",
                            "value": "To get a random nsfw image of searched category!\n\n\n"
                        },
                        {
                            "name": "!kaka joke",
                            "value": "Randome Joke!\n\n\n"
                        },
                        {
                            "name": "!kaka stats",
                            "value": "Server Stats!\n\n\n"
                        },
                        {
                            "name": "!kaka news",
                            "value": "Indian news headline"
                        },
                        {
                            "name": "!kaka flipcoin",
                            "value": "Flips a coin"
                        },
                        {
                            "name": "!kaka corona",
                            "value": "Corona data of India"
                        },
                        {
                            "name": "!kaka gaymeter @mention",
                            "value": "show the gay percentage of mentioned user!"
                        },
                        {
                            "name": "!kaka meme",
                            "value": "Gives a random meme from reddit"
                        },
                        {
                            "name": "!kaka desimeme",
                            "value": "Gives random indian meme from reddit"
                        }
                    ]
                };
                message.channel.send(({ embed: embed }))
            }
        }

    }

})

client.login(token);

//Discord.token(token)