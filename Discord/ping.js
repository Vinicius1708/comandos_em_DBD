const { MessageEmbed } = require('discord.js');

module.exports.run = async ({ client, message }) => {
    let botping = new Date() - message.createdAt;
    let pEmbed = new MessageEmbed()
        .addField('🤖 BOT:', `\`${+ Math.floor(botping) + "ms"}\``, true)
        .addField('📡 API:', `\`${+ Math.floor(client.ws.ping) + "ms"}\``, true)
        .setColor("#ff0000")
    message.channel.send(pEmbed)
}

exports.help = {
    name: "ping",
    aliases: ['pong'],
    description: "Mostra o ping atual do bot",
    usage: 'ping'
};
