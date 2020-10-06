const { MessageEmbed } = require('discord.js');

exports.run = ({ client, message, args }) => {

    let ok = message.guild.roles.cache;
    var servers = ok
    var num = 0;
    var pagina = 1;
    var totalPages = parseInt(servers.size / 20 + 1);

    var embed = new MessageEmbed()
        .setDescription(`${servers.map(se => `<@&${se.id}> ${se.id}`).slice(0, 20).join('\n')}`)
        .setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL)
        .setAuthor(`${client.guilds.cache.get(message.guild.id).roles.cache.size} cargos`)
        .setColor('#36393e')
    message.channel.send(embed).then(async ser => {

        if (servers.size > 20) {
            await ser.react("⬅");
            await ser.react("➡");

            const voltar = ser.createReactionCollector((r, u) => r.emoji.name === "⬅" && u.id === message.author.id, { time: 200000 });
            const proximo = ser.createReactionCollector((r, u) => r.emoji.name === "➡" && u.id === message.author.id, { time: 200000 });

            voltar.on("collect", async r => {
                if (pagina !== 1) {
                    num = num - 20
                    num = num.toString().length > 1 ? num - parseInt(num.toString().slice(num.toString().length - 1)) : 0
                    pagina -= 1
                    var embed = new MessageEmbed()

                        .addField(`Servidores:`, `${servers.map(se => `<@&${se.id}> ${se.id}`).slice(pagina * 20 - 20, pagina * 20).join('\n')}`)
                        .setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL)
                        .setColor('#36393e')
                        .setAuthor(`${client.guilds.cache.get(message.guild.id).roles.cache.size} cargos`)

                    ser.edit(embed)
                    r.users.remove(message.author.id).catch(() => { })
                } else {
                    pagina = totalPages
                    num = totalPages * 20 - 20

                    var embedb = new MessageEmbed()

                        .setDescription(`${servers.map(se => `<@&${se.id}> ${se.id}`).slice(totalPages * 20 - 20, pagina * 20).join('\n')}`)
                        .setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL)

                        .setAuthor(`${client.guilds.cache.get(message.guild.id).roles.cache.size} cargos`)
                        .setColor('#36393e')
                    ser.edit(embedb)

                    r.users.remove(message.author.id).catch(() => { })
                }
            })

            proximo.on("collect", async r => {
                if (pagina !== totalPages) {
                    num = num.toString().length > 1 ? num - parseInt(num.toString().slice(num.toString().length - 1)) : 0
                    num = num + 20
                    pagina += 1

                    var embedc = new MessageEmbed()

                        .setDescription(`${servers.map(se => `<@&${se.id}> ${se.id}`).slice(pagina * 20 - 20, pagina * 20).join('\n')}`)
                        .setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL)

                        .setAuthor(`${client.guilds.cache.get(message.guild.id).roles.cache.size} cargos`)
                        .setColor('#36393e')
                    ser.edit(embedc)

                    r.users.remove(message.author.id).catch(() => { })
                } else {
                    pagina = 1
                    num = 0

                    var embedd = new MessageEmbed()

                        .setDescription(`${servers.map(se => `<@&${se.id}> ${se.id}`).slice(0, pagina * 20).join('\n')}`)
                        .setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL)

                        .setAuthor(`${client.guilds.cache.get(message.guild.id).roles.cache.size} cargos`)
                        .setColor('#36393e')
                    ser.edit(embedd)

                    r.users.remove(message.author.id).catch(() => { })
                }
            })
        }
    })
}
exports.help = {
    name: 'cargos',
    aliases: ['roles'],
    description: "Lista todos os cargos que determinado servidor possuí!",
    usage: "cargos"
};
