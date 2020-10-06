const { MessageAttachment } = require('discord.js');

module.exports.run = async ({ client, channel, author }) => {
    channel.startTyping()
    const rank = await client.CanvasTemplates.perfil({ author, client })
    channel.send(new MessageAttachment(rank, 'perfil.png')).then(() => channel.stopTyping())
}

exports.help = {
    name: "perfil",
    aliases: ['profile'],
    description: "mostra seu profile.",
    usage: 'profile (@user)'
};
