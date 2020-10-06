
const { MessageEmbed } = require('discord.js');

exports.run = async ({ client, message, args, prefix }) => {



    client.mysqlConnection.query(`SELECT * FROM guilds WHERE GUILD_ID = '${message.guild.id}'`, async (err, rows) => {

        // if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`${message.author}, você não tem permissão para executar esse comando.`)
        if (rows[0] == null) return message.channel.send('MySqL error.');

        const entrada = rows[0].CHANNELID_WELCOME;
        const saida = rows[0].CHANNELID_LEFT;
        const log = rows[0].CHANNELID_LOGS;
        const role = rows[0].CARGOID_WELCOME;
        const contador = rows[0].CHANNELID_MEMBERCOUNT;

        let channel = message.mentions.channels.first() || client.channels.cache.get(args[1]);
        let sql;
        let cargo = message.mentions.roles.first() || client.guilds.cache.get(message.guild.id).roles.cache.get(args[1])
        const toMute = message.guild.members.cache.get(client.user.id)
        const rolePerm = message.member.roles.highest.position >= toMute.roles.highest.position


        let embed = new MessageEmbed()
        let embedConfig = new MessageEmbed()
        embedConfig.setColor('RANDOM')
        embed.setColor('RANDOM')
        embed.setThumbnail(client.user.avatarURL())

        if (contador > false) {
            embed.addField('<:atived:708772992523436162> contador:', `<#${contador}> \`[${prefix}config remove-contador]\``)
        } else {
            embed.addField('<:desatived:708773188611604582> contador:', `\`${prefix}config contador #canal\``)
        }
        if (entrada > false) {
            embed.addField('<:atived:708772992523436162> Entrada:', `<#${entrada}> \`[${prefix}config remove-entrada]\``)
        } else {
            embed.addField('<:desatived:708773188611604582> Entrada:', `\`${prefix}config entrada #canal\``)
        }

        if (saida > false) {
            embed.addField('<:atived:708772992523436162> Saída:', `<#${saida}> \`[${prefix}config remove-saida]\``)
        } else {
            embed.addField('<:desatived:708773188611604582> Saída:', `\`${prefix}config saida #canal\``)
        }

        if (log > false) {
            embed.addField('<:atived:708772992523436162> log:', `<#${log}> \`[${prefix}config remove-log]\``)
        } else {
            embed.addField('<:desatived:708773188611604582> log:', `\`[${prefix}config log #canal]\``)
        }
        if (role > false) {
            embed.addField('<:atived:708772992523436162> auto-role:', `<@&${role}> \`[${prefix}config remove-autorole]\``)
        } else {
            embed.addField('<:desatived:708773188611604582> auto-role:', `\`[${prefix}config role @role]\``)
        }
        if (!args[0]) return message.channel.send(embed);

        if (args[0] == "contador" || args[0] == "member-count" || args[0] == "count") {
            if (!channel) return message.channel.send('O canal mencionado é inválido.')
            embedConfig.setDescription(`<:atived:708772992523436162> Contador de membros ativado no tópico: ${channel}`)
            sql = `UPDATE guilds SET CHANNELID_MEMBERCOUNT = '${channel.id}' WHERE GUILD_ID = '${message.guild.id}'`;
            const array = {
                CHANNELID_MEMBERCOUNT: channel.id
            }
            const rows = [array]
            const member = message.guild.member(message.author)

            await client.functions.count.memberCount(member, rows)
            await client.mysqlConnection.query(sql)
        }
        //=================================
        if (args[0] == "prefix" || args[0] == "prefixo") {
            if (!args[1]) return message.channel.send('Digite o novo prefixo')
            embedConfig.setDescription(`<:atived:708772992523436162> Prefixo alterado para: ${args[1]}`)
            sql = `UPDATE guilds SET prefix = '${args[1]}' WHERE GUILD_ID = '${message.guild.id}'`;
            client.mysqlConnection.query(sql)
        }
        //=================================
        if (args[0] == "log" || args[0] == "logs") {
            if (!channel) return message.channel.send('O canal mencionado é inválido.');
            embedConfig.setDescription(`<:atived:708772992523436162> Canal onde irei mandar os logs: ${channel}`)
            sql = `UPDATE guilds SET CHANNELID_LOGS = '${channel.id}' WHERE GUILD_ID = '${message.guild.id}'`;
            client.mysqlConnection.query(sql)
        }
        //=================================
        if (args[0] == "cargo" || args[0] == "role") {
            if (!cargo) return message.channel.send('O cargo mencionado é inválido.');
            //if (rolePerm) return message.channel.send('Esse membro tem um cargo maior que o meu.')
            embedConfig.setDescription(`<:atived:708772992523436162> auto-role ativado com o cargo: ${cargo}`)
            sql = `UPDATE guilds SET CARGOID_WELCOME = '${cargo.id}' WHERE GUILD_ID = '${message.guild.id}'`;
            client.mysqlConnection.query(sql)
        }
        //=================================
        if (args[0] == "entrada" || args[0] == "wellcome") {
            if (!channel) return message.channel.send('O canal mencionado é inválido.');
            embedConfig.setDescription(`<:atived:708772992523436162> canal aonde irei mandar notificações de quando alguém entrar: ${channel}`)
            sql = `UPDATE guilds SET CHANNELID_WELCOME = '${channel.id}' WHERE GUILD_ID = '${message.guild.id}'`;
            client.mysqlConnection.query(sql)
        }
        //=================================
        if (args[0] == "saida" || args[0] == "leave") {
            if (!channel) return message.channel.send('O canal mencionado é inválido.');
            embedConfig.setDescription(`<:atived:708772992523436162> canal aonde irei mandar notificações de quando alguém sair: ${channel}`)
            sql = `UPDATE guilds SET CHANNELID_LEFT = '${channel.id}' WHERE GUILD_ID = '${message.guild.id}'`;
            client.mysqlConnection.query(sql)
        }
        //=================================
        if (args[0] == "remove-entrada" || args[0] == "remove-wellcome" || args[0] == "remove-boasvindas") {
            embedConfig.setDescription(`<:desatived:708773188611604582> Boas vindas desativada, não irei mais notificar quando alguém sair: (<#${entrada}>)`)
            sql = `UPDATE guilds SET CHANNELID_WELCOME = '0' WHERE GUILD_ID = '${message.guild.id}'`;
            client.mysqlConnection.query(sql)
        }
        //=================================
        if (args[0] == "remove-saida" || args[0] == "remove-leave") {
            embedConfig.setDescription(`<:desatived:708773188611604582> sáida desativada, não irei mais notificar quando alguém entrar: (<#${saida}>)`)
            sql = `UPDATE guilds SET CHANNELID_LEFT = '0' WHERE GUILD_ID = '${message.guild.id}'`;
            client.mysqlConnection.query(sql)
        }
        //=================================
        if (args[0] == "remove-autorole" || args[0] == "remove-cargo" || args[0] == "remove-role" || args[0] == "remove-roleadd") {
            embedConfig.setDescription(`<:desatived:708773188611604582>  cargo <@&${role}> não vai ser mais adicionado quando alguém entrar`)
            sql = `UPDATE guilds SET CARGOID_WELCOME = '0' WHERE GUILD_ID = '${message.guild.id}'`;
            client.mysqlConnection.query(sql)
        }
        //=================================
        if (args[0] == "remove-log" || args[0] == "remover-log" || args[0] == "log-off") {
            embedConfig.setDescription(`<:desatived:708773188611604582>  Não irei mais mandar os logs no canal: (<#${entrada}>)`)
            sql = `UPDATE guilds SET CHANNELID_LOGS = '0' WHERE GUILD_ID = '${message.guild.id}'`;
            client.mysqlConnection.query(sql)
        }
        //=================================
        if (args[0] == "remove-contador" || args[0] == "remove-member-count" || args[0] == "remove-count") {
            embedConfig.setDescription(`<:desatived:708773188611604582> Não irei mais contar os membros no tópico do canal: (<#${contador}>)`)
            sql = `UPDATE guilds SET CHANNELID_MEMBERCOUNT = '0' WHERE GUILD_ID = '${message.guild.id}'`;
            client.mysqlConnection.query(sql)
            try {
                await message.guild.channels.cache.get(`${contador}`).setTopic('')
            } catch (e) {
                console.log(`${message.guild.name}\n${e.name}: ${e.message}`)
            }
        }
        message.channel.send(embedConfig)
    })
}
exports.help = {
    name: "config",
    aliases: ['configurar', 'c'],
    description: "Shows the bot settings for your server",
    usage: 'config'
};
