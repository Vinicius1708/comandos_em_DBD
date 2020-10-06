const { MessageEmbed } = require("discord.js");

module.exports.run = async ({ client, message, args }) => {


    const embed = new MessageEmbed()
    embed.setColor('#ff0202')

    const serverQueue = client.music.queue.get(message.guild.id);
    if (!message.member.voice.channel) return message.channel.send("Você não está em um canal de voz");
    if (!serverQueue) return message.channel.send("Nada está tocando agora!");

    embed.setDescription(`🔊 O volume esta em: \`${parseInt(serverQueue.connection.dispatcher.volume) / 100}/100\``)
    if (args[0] === undefined || args[0] === null) return message.channel.send(embed)

    let say = args.join('');
    if (parseInt(parseInt(say)) > 100) return message.channel.send("O volume está no maximo.");

    serverQueue.connection.dispatcher.setVolume(parseInt(say) / 100)

    embed.setDescription(`🔊 Volume alterado para: \`${parseInt(say)}/100\``)
    message.channel.send(embed)
}

exports.help = {
    name: 'volume',
    aliases: ['altura', 'v'],
    description: "Aumenta/abaixa o volume de uma musica",
    usage: 'volume [1 á 200]'
};