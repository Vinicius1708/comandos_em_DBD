const { MessageEmbed } = require('discord.js');

exports.run = ({ client, message }) => {
    if (!client.devs.includes(message.author.id)) return;

    var servers = client.guilds.cache
    var num = 0;
    var pagina = 1;
    var totalPages = parseInt(servers.size / 10 + 1);

    var embed = new MessageEmbed()
        .setDescription(`${servers.map(se => `Nome: \`${se.name}\` - ID: \`${se.id}\` Users: \`${se.memberCount}\``).slice(0, 10).join('\n')}`)
        .setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL)
        .setAuthor(`${client.guilds.cache.size} servers, ${client.users.cache.size} users`)
        .setColor('#36393e')
    message.channel.send(embed).then(async ser => {

        if (servers.size > 10) {

            await ser.react("⬅");
            await ser.react("➡");

            const voltar = ser.createReactionCollector((r, u) => r.emoji.name === "⬅" && u.id === message.author.id, { time: 100000 });
            const proximo = ser.createReactionCollector((r, u) => r.emoji.name === "➡" && u.id === message.author.id, { time: 100000 });

            voltar.on("collect", async r => {
                if (pagina !== 1) {
                    num = num - 10
                    num = num.toString().length > 1 ? num - parseInt(num.toString().slice(num.toString().length - 1)) : 0
                    pagina -= 1
                    var embed = new MessageEmbed()

                        .addField(`Servidores:`, `${servers.map(se => `Nome: \`${se.name}\` - ID: \`${se.id}\` Users: \`${se.memberCount}\``).slice(pagina * 10 - 10, pagina * 10).join('\n')}`)
                        .setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL)
                        .setColor('#36393e')
                        .setAuthor(`${client.guilds.cache.size} servers, ${client.users.cache.size} users`)

                    ser.edit(embed)
                    r.users.remove(message.author.id).catch(() => { })
                } else {
                    pagina = totalPages
                    num = totalPages * 10 - 20

                    var embedb = new MessageEmbed()

                        .setDescription(`${servers.map(se => `Nome: \`${se.name}\` - ID: \`${se.id}\` Users: \`${se.memberCount}\``).slice(totalPages * 10 - 10, pagina * 10).join('\n')}`)
                        .setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL)

                        .setAuthor(`${client.guilds.cache.size} servers, ${client.users.cache.size} users`)
                        .setColor('#36393e')
                    ser.edit(embedb)

                    r.users.remove(message.author.id).catch(() => { })
                }
            })

            proximo.on("collect", async r => {
                if (pagina !== totalPages) {
                    num = num.toString().length > 1 ? num - parseInt(num.toString().slice(num.toString().length - 1)) : 0
                    num = num + 10
                    pagina += 1

                    var embedc = new MessageEmbed()

                        .setDescription(`${servers.map(se => `Nome: \`${se.name}\` - ID: \`${se.id}\` Users: \`${se.memberCount}\``).slice(pagina * 10 - 10, pagina * 10).join('\n')}`)
                        .setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL)

                        .setAuthor(`${client.guilds.cache.size} servers, ${client.users.cache.size} users`)
                        .setColor('#36393e')
                    ser.edit(embedc)

                    r.users.remove(message.author.id).catch(() => { })
                } else {
                    pagina = 1
                    num = 0

                    var embedd = new MessageEmbed()

                        .setDescription(`${servers.map(se => `Nome: \`${se.name}\` - ID: \`${se.id}\` Users: \`${se.memberCount}\``).slice(0, pagina * 10).join('\n')}`)
                        .setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL)

                        .setAuthor(`${client.guilds.cache.size} servers, ${client.users.cache.size} users`)
                        .setColor('#36393e')
                    ser.edit(embedd)

                    r.users.remove(message.author.id).catch(() => { })
                }
            })
        }
    })
}
exports.help = {
    name: "servers",
    aliases: ['guilds'],
    description: "Mostra os servers que eu estou",
    usage: 'servers'
};