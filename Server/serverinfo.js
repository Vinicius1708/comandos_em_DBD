
module.exports.run = async ({ client, message, args }) => {

    const { MessageEmbed } = require('discord.js');
    const moment = require('moment'); moment.locale("pt-BR")

    let guild = client.guilds.cache.get(args[0]) || message.guild;
    let iconSplash = guild.splashURL() ? guild.splashURL({ format: 'png', size: 1024 }) : ''

    let bots = guild.members.cache.filter(m => m.user.bot).size;
    let humans = guild.members.cache.filter(m => !m.user.bot).size;

    let text = guild.channels.cache.filter(m => m.type == "text").size;
    let voice = guild.channels.cache.filter(i => i.type == "voice").size;

    let membro = guild.member(client.user); // message.author

    const entrouNoServer = moment(membro.joinedTimestamp).format('L');
    const guildcreate = moment(guild.createdAt).format('L');

    let online = guild.members.cache.filter(a => a.presence.status == "online");
    let offline = guild.members.cache.filter(a => a.presence.status == "offline");

    let ocupado = guild.members.cache.filter(a => a.presence.status == "dnd");
    let ausente = guild.members.cache.filter(a => a.presence.status == "idle");

    let embed = new MessageEmbed();
    embed.setColor('#ff0202');
    embed.setThumbnail(guild.iconURL({ format: 'png', dynamic: true, size: 2048 }));


    embed.setDescription(`<:Online:568464325363367956> Online: \`${online.size}\` - <:Offline:568464325350653968> Offline: \`${offline.size}\` - <:ocupado:717379117237928017> Ocupado: \`${ocupado.size}\` - <:ausente:717379869721231421> Ausente: \`${ausente.size}\` `)

    embed.addField('🌐 Server:', `\`${guild.name}\``, true);
    embed.addField('🆔', `\`${guild.id}\``, true);

    embed.addField('🌎 Region:', `\`${guild.region.toUpperCase()}\``, true);
    embed.addField('👥 Users:', `\`${guild.memberCount.toLocaleString()}\``, true);

    embed.addField('🤖 Bots:', `\`${bots.toLocaleString()}\``, true);
    embed.addField('🤷 Humans:', `\`${humans.toLocaleString()}\``, true);

    embed.addField('💬 Text:', `\`${text.toLocaleString()}\``, true);
    embed.addField('🔊 Voice:', `\`${voice.toLocaleString()}\``, true);

    embed.addField('📌 Cargos:', `\`${guild.roles.cache.size.toLocaleString()}\``, true);
    embed.addField('🛒 Emojis:', `\`${guild.emojis.cache.size.toLocaleString()}\``, true);

    embed.addField('📅 Created At', `\`${guildcreate}\``, true);
    embed.addField('📅 Joined At', `\`${entrouNoServer}\``, true)

    embed.setImage(iconSplash);

    embed.setTimestamp();
    embed.setFooter(message.author.tag, message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 }))

    message.channel.send(embed)

}

module.exports.help = {
    name: "serverinfo",
    aliases: ['guildinfo', 'si'],
    description: "Mostra informações do servidor",
    usage: 'userinfo'
}
