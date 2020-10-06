const { MessageEmbed } = require('discord.js');

exports.run = async ({ client, message, args }) => {

    message.delete({ timeout: 100, reason: 'It had to be done.' }).catch(() => { });

    let pessoa = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    const avatar = pessoa.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 });

    let foto = new MessageEmbed()
        .setTitle(`:frame_photo: ${pessoa.tag}`)
        .setDescription(`<:link:571405258538876928> Clique [aqui](${avatar}) para baixar a imagem!`)
        .setImage(avatar)
        .setFooter(message.author.tag, message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
        .setTimestamp(new Date())
        .setColor("#36393F")
    message.channel.send(foto);
}

exports.help = {
    name: "avatar",
    aliases: ['foto', 'imagem'],
    description: "Mostra avatar de um membro",
    usage: "avatar [@user]"
};
