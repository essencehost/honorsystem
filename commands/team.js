const Discord = require('discord.js');
const http = require('http');

exports.run = (client, message, args) => {
    let logChannel = '489605729624522762';

    let teamMates = message.member.user.tag + " and " + message.mentions.members.first().user.username + "#" + message.mentions.members.first().user.discriminator;
    console.log(message.mentions.members.array().join());    

    try {
        var post_data = "xmas_jam_team_registering:%BEGIN%" + message.member.user.tag + "%SPLIT%" + message.mentions.members.first().user.username + "#" + message.mentions.members.first().user.discriminator + "%END%";
        var post_req = http.request({
            host: 'sv443.ddns.net',
            port: '80',
            path: '/mphost',
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
                'Content-Length': Buffer.byteLength(post_data)
            },
            function(res) {
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    console.log('Response: ' + chunk);
                });
            }
        });

        // post the data
        post_req.write(post_data);
        post_req.end();
    }
    catch(err) {
        console.log("Couldn't POST to server: " + err);
        message.reply("the server couldn't be reached. Please try again in a few hours!");
    }

    let embed = new Discord.RichEmbed()
    .setTitle('New team submitted:')
    .setColor(client.config.embed_color_default)
    .setDescription(`**${teamMates}**\n just formed a team!`);

    client.channels.get(logChannel).send(embed);
}
