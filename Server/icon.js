const { MessageEmbed } = require('discord.js');

exports.run = async ({ client, message, args }) => {

    let guild = client.guilds.cache.get(args[0]) || message.guild;
    let icon = guild.iconURL() ? guild.iconURL({ format: 'png', dynamic: true, size: 2048 }) : 'https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png'
    message.channel.send(new MessageEmbed().setDescription(`<:link:571405258538876928> Clique [aqui](${icon}) para baixar a imagem!`).setImage(icon).setColor("#36393F"))
}


exports.help = {
    name: "icon",
    aliases: ['guildicon'],
    description: "Mostra o icone do servidor",
    usage: "avatar"
};