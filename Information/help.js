const { MessageEmbed } = require('discord.js');

exports.run = async ({ client, message, args, prefix }) => {

    try {

        let e = new MessageEmbed();
        e.setColor("#00ceff");

        //client.commands.has(client.aliases.get(command) || client.commands.get(command).help.name)

        let command = args[0];
        if (client.commands.has(command)) {
            command = client.commands.get(command);
            e.setTitle(`Aqui esta minha ajuda sobre o comando ${command.help.name}`)
            e.addField(`Comando: \`${command.help.name}\``, `\`\`\`ini\n[ ${command.help.description} ]\`\`\``)
            e.addField('💁 Como usar', `\`${prefix}${command.help.usage}\``)
            e.addField('↩️ Alternativas', `\`${command.help.aliases}\``)
            e.addField('💡 Observações', `parâmetro entre \`[]\`: Obrigatório | parâmetro entre \`()\` opcional`)
            e.setTimestamp()
            e.setFooter(message.author.tag, message.author.avatarURL)
            message.channel.send(e)

        }
        const valuesA = Array.from(client.commandsSeparated);

        valuesA.forEach(async val => {
            let name = val.shift();
            let modiArray = name
                .replace('Admin', '👮 Admin')
                .replace('Discord', '<:dc:579359045685739531> Discord')
                .replace('Fun', '😂 Fun')
                .replace('Information', '📖 Informações')
                .replace('Music', '🎧 Música')
                .replace('Rank', '🔶 Rank')
                .replace('Server', '🌐 Server')
                .replace('Owner', '<:owner:691749202950357045> Owner')
                .replace('Samp', '<:samp:579360245227323408> Samp')

            if (!client.devs.includes(message.author.id)) {
                if (name == "Owner") return;
            }


            // e.setDescription(`Aqui você verá um breve resumo dos meus comandos, para saber mais reaja no emoji da determinada categoria. Caso tenha alguma dúvida sobre como usar o comando use: \`${prefix}ajuda [nome-do-comando]\`.`)
            e.addField(`${modiArray}`, `\`${val.toString().replace(/,/g, ", ").replace(/.js/g, "")}\``);
            e.setFooter(message.author.tag + ' essa mensagem vai ser apagada em 1 minuto...', message.author.avatarURL())
        })
        if (args[0] === undefined || args[0] === null) return message.channel.send(e).then(m => m.delete({ timeout: 60 * 1000, reason: 'help comand' }))
    }
    catch (e) {
        message.channel.send(`\`\`\`${e.name}: ${e.message}\`\`\``);
    }
}

exports.help = {
    name: "ajuda",
    aliases: ['help'],
    description: "Mostra minha lista de comandos",
    usage: 'ajuda'
};