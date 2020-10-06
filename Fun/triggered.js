const { MessageAttachment, MessageEmbed } = require('discord.js');


module.exports.run = async ({ client, channel, author }) => {

    channel.startTyping()
    const rank = await client.CanvasTemplates.triggered(author.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }))
    channel.send(new MessageAttachment(rank, 'tr.gif')).then(() => channel.stopTyping())
}

exports.help = {
    name: "triggered",
    aliases: ['tr', 'rage'],
    description: "Sabe quando alguém está irritado? Então, crie uma imagem de alguém triggered!",
    usage: 'triggered [@uchiha obito]'
};
