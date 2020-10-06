const moment = require("moment"); require("moment-duration-format")
const { MessageEmbed } = require('discord.js');

exports.run = async ({ client, message }) => {
    let duration = moment.duration(client.uptime).format('D [D], H [H], m [M], s [S]');
    message.channel.send(new MessageEmbed().setDescription(`Olá ${message.author} estou online à: \`${duration}\``).setColor("#098ef1"))
}

exports.help = {
    name: "ontime",
    aliases: ['uptime', 'tempoon'],
    description: "Mostra quanto tempo que eu estou online",
    usage: 'ontime'
};
