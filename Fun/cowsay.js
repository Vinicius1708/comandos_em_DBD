let cowsay = require("cowsay")
const { MessageEmbed } = require('discord.js');

exports.run = async ({ channel, args, prefix }) => {
    let botmessage = args.slice(0).join(" ")

    if (args[0] === undefined || args[0] === null) return channel.send(new MessageEmbed().setDescription(`Forma de usar: \`${prefix}cowsay [texto]\``))
    channel.send(cowsay.say({ text: `${botmessage}`, e: "oO", T: "U " }), { code: 'js' });
}

exports.help = {
    name: "cowsay",
    aliases: ['cow'],
    description: "Faça uma vaquinha dizer algo para você!",
    usage: 'cowsay <Mensagem>'
};