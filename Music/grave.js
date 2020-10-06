const { MessageEmbed } = require('discord.js');

module.exports.run = async ({ client, message, args }) => {

    const embed = new MessageEmbed()
    embed.setColor('#ff0202')

    const serverQueue = client.music.queue.get(message.guild.id)

    if (!message.member.voice.channel) return message.channel.send("Você não está em um canal de voz");
    if (!serverQueue) return message.channel.send("Nada está tocando agora!");

    embed.setDescription(`🔊 O Grave esta em: \`${parseInt(serverQueue.connection.dispatcher.volumeDecibels)}/10\``)
    if (args[0] === undefined || args[0] === null) return message.channel.send(embed)

    let say = args.join('');
    if (parseInt(parseInt(say)) > 10) return message.channel.send("O Grave já está no maximo.");

    serverQueue.connection.dispatcher.setVolumeDecibels(parseInt(say))

    embed.setDescription(`🔊 Grave alterado para: \`${parseInt(say)}/10\``)
    message.channel.send(embed)
}


exports.help = {
    name: 'grave',
    aliases: ['g', 'graveboost'],
    description: "Aumenta/abaixa o Grave de uma musica",
    usage: 'grave [1 á 10]'
};

