const { MessageEmbed } = require('discord.js');

exports.run = ({ client, message, args }) => {
    try {

        var num = 0;

        const guild = client.guilds.cache.get(args[0]) || message.guild;

        var servers = guild.emojis.cache
        let emojisLength = guild.emojis.cache.size;

        if (!guild.emojis.cache.size > 0) return message.channel.send('Esse servidor parece não ter emojis 😕')

        var pagina = 1;
        var totalPages = parseInt(servers.size / 20 + 1);

        var embed = new MessageEmbed()

            .setDescription(`${servers.map(se => se).slice(0, 20).join(' | ')}`)
            .setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL)
            .setAuthor(`${emojisLength} emojis, ${guild.name}`)
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

                            .addField(`Servidores:`, `${servers.map(se => se).slice(pagina * 20 - 20, pagina * 20).join(' | ')}`)
                            .setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL)
                            .setColor('#36393e')
                            .setAuthor(`${emojisLength} emojis, ${guild.name}`)

                        ser.edit(embed)
                        r.users.remove(message.author.id).catch(() => { })
                    } else {
                        pagina = totalPages
                        num = totalPages * 20 - 20

                        var embedb = new MessageEmbed()

                            .setDescription(`${servers.map(se => se).slice(totalPages * 20 - 20, pagina * 20).join(' | ')}`)
                            .setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL)

                            .setAuthor(`${emojisLength} emojis, ${guild.name}`)
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

                            .setDescription(`${servers.map(se => se).slice(pagina * 20 - 20, pagina * 20).join(' | ')}`)
                            .setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL)

                            .setAuthor(`${emojisLength} emojis, ${guild.name}`)
                            .setColor('#36393e')
                        ser.edit(embedc)

                        r.users.remove(message.author.id).catch(() => { })
                    } else {
                        pagina = 1
                        num = 0

                        var embedd = new MessageEmbed()

                            .setDescription(`${servers.map(se => se).slice(0, pagina * 20).join(' | ')}`)
                            .setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL)

                            .setAuthor(`${emojisLength} emojis, ${guild.name}`)
                            .setColor('#36393e')
                        ser.edit(embedd)

                        r.users.remove(message.author.id).catch(() => { })
                    }
                })
            }
        })
    } catch (e) {
        message.channel.send(`:x: ERRO:\`\`\`js\n${e.name}: ${e.message}\`\`\``)
    }
}
exports.help = {
    name: 'emojis',
    aliases: ['emoticons'],
    description: 'Veja todos os emojis que um servidor possuí!',
    usage: 'emojis'
};
