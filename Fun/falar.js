exports.run = async ({ message, args }) => {
    message.delete({ timeout: 500, reason: 'It had to be done.' }).catch(() => { })

    if (!args.join(" ")) return message.reply("Digite algo!");
    let say = args.join(' ');
    message.mentions.users.forEach((u) => say = say.replace(u.toString(), "@" + u.tag))
    message.mentions.roles.forEach((r) => say = say.replace(r.toString(), "@" + r.name))
    message.channel.send(say, { disableEveryone: true });
}

exports.help = {
    name: "falar",
    aliases: ['say', 'dizer', 'speak'],
    description: "Faça com que eu fale qualquer frase para você.",
    usage: 'falar [texto]'
};
