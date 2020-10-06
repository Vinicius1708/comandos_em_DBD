var moment = require('moment'); moment.locale('pt-BR');
const { MessageEmbed } = require('discord.js');

exports.run = async ({ client, message, args }) => {

    let pessoa = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    let membro = message.guild.member(pessoa);
    let status = pessoa.presence.status;
    const embed = new MessageEmbed()

    if (pessoa.presence.activities !== null) {
        if (pessoa.presence.activities.streaming) {
            embed.setDescription('<:transmitindo:570969579736662018> Transmitindo **' + pessoa.presence.activities.name + '**.');
        } else {
            embed.setDescription('🎮 Jogando **' + pessoa.presence.activities.name + '**.');
        }
    }
    const contaCriada = moment(pessoa.createdTimestamp).format('lll');
    const diasContaCriada = moment.duration(message.createdTimestamp - pessoa.createdTimestamp).asDays();

    const entrouNoServer = moment(membro.joinedTimestamp).format('lll');
    const diasEntrouNoServer = moment.duration(message.createdTimestamp - membro.joinedTimestamp).asDays();

    const avatar = pessoa.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 });

    embed.setColor('#ff0202')
    embed.setDescription(`:link: Clique [aqui](http://34.94.198.94/${pessoa.id}/) para ver o último avatar desse usuário!`);
    embed.addField(':busts_in_silhouette: Usuário', `\`${pessoa.tag}\``, true);
    embed.addField(':id:', `\`${pessoa.id}\``, true);
    embed.setThumbnail(avatar);
    embed.addField('📅 Conta Criada:', `\`${contaCriada}  (${Math.floor(diasContaCriada)} dias)\``, true);
    embed.addField('📅 Entrou no serve:', `\`${entrouNoServer} (${Math.floor(diasEntrouNoServer)} dias)\``, true);
    embed.setTimestamp();
    embed.setAuthor(pessoa.tag, avatar)
    embed.setFooter(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }))


    const role = membro.roles.cache.filter(r => r.id !== message.guild.id).map(r => r).join(" | ").slice(0, 2000) || 'Sem cargo';
    embed.addField(`Cargos: (${membro.roles.cache.size - 1})`, `${role}`)

    let servidores = client.guilds.cache.filter(a => a.members.cache.get(membro.id));

    let serverComp = 1;
    if (serverComp) {
        embed.addField(`🌐 Servidores compartilhado (${servidores.size})`, `>>> ${servidores.map(a => `\`${a.name}\``).join(' | ')}`);
    }

    switch (status) {
        case 'online':
            embed.addField(":information_desk_person: Status", '<:Online:568464325363367956> Online');
            break;
        case 'dnd':
            embed.addField(":information_desk_person: Status", '<:ocupado:717379117237928017> Ocupado(a)');
            break;
        case 'idle':
            embed.addField(":information_desk_person: Status", '<:ausente:717379869721231421> Ausente');
            break;
        case 'offline':
            embed.addField(":information_desk_person: Status", '<:Offline:568464325350653968> Offline');
            break;
    }
    var tradd = {
        "CREATE_INSTANT_INVITE": "Criar convite instantâneo",
        "KICK_MEMBERS": "Expulsar usuários",
        "BAN_MEMBERS": "Banir usuários",
        "ADMINISTRATOR": "Administrador",
        "MANAGE_CHANNELS": "Gerenciar canais",
        "MANAGE_GUILD": "Gerenciar servidor",
        "STREAM": "Transmitir",
        "ADD_REACTIONS": "Adicionar reação",
        "VIEW_AUDIT_LOG": "Ver registro de auditoria",
        "VIEW_CHANNEL": "Ver canais",
        "READ_MESSAGES": "Ver mensagens",
        "SEND_MESSAGES": "Enviar mensagens",
        "SEND_TTS_MESSAGES": "Enviar mensagens com aúdio",
        "MANAGE_MESSAGES": "Gerenciar mensagens",
        "EMBED_LINKS": "Links em embed",
        "ATTACH_FILES": "Arquivos arquivados",
        "READ_MESSAGE_HISTORY": "Ver histórico de mensagens",
        "MENTION_EVERYONE": "Mencionar todos",
        "EXTERNAL_EMOJIS": "Emojis externos",
        "USE_EXTERNAL_EMOJIS": "Usar emojis externos",
        "CONNECT": "Conectar",
        "SPEAK": "Falar",
        "MUTE_MEMBERS": "Silenciar usuários",
        "DEAFEN_MEMBERS": "Perdoar usuários",
        "MOVE_MEMBERS": "Mover usuários",
        "USE_VAD": "Usar detecção de voz",
        "PRIORITY_SPEAKER": "Prioridade para falar",
        "CHANGE_NICKNAME": "Trocar apelido",
        "MANAGE_NICKNAMES": "Gerenciar apelidos",
        "MANAGE_ROLES": "Gerenciar cargos",
        "MANAGE_ROLES_OR_PERMISSIONS": "Gerenciar cargos e permissões",
        "MANAGE_WEBHOOKS": "Gerenciar webhooks",
        "MANAGE_EMOJIS": "Gerenciar emojis"
    }
    const msg = await message.channel.send(embed).catch(() => { });

    const collector = msg.createReactionCollector((r, u) => (r.emoji.name === '▶️' || r.emoji.name === '◀️') && (u.id !== client.user.id && u.id === message.author.id));

    collector.on("collect", async (r, u) => {
        switch (r.emoji.name) {

            case '▶️': {
                let embedPerms = new MessageEmbed();
                embedPerms.setThumbnail(pessoa.avatarURL);
                embedPerms.addField('💁 Posição de Entrada', `\`preguiça de fazer\``)
                if (message.guild.owner.user.id == pessoa.id) {
                    embedPerms.addField(`**${pessoa.tag}**`, `<:owner:691749202950357045> \`Dono(A)\``)
                }
                embedPerms.addField('🛡️ Permissões', `${message.member.permissions.toArray().map(perms => `\`${tradd[perms]}\``).join(", ")}`)
                embedPerms.setAuthor(pessoa.tag, pessoa.avatarURL)
                msg.edit(embedPerms).catch(() => { });
                await msg.reactions.removeAll().catch(() => { })
                await msg.react('◀️').catch(() => { });
                break;
            }
            case '◀️': {
                msg.edit(embed).catch(() => { });
                await msg.reactions.removeAll().catch(() => { })
                await msg.react('▶️').catch(() => { });
                break;
            }
        }
    })
    msg.react('▶️').catch(() => { });
}
exports.help = {
    name: "userinfo",
    aliases: ['ui'],
    description: "Mostra info de um usuário",
    usage: 'userinfo [@usuário]'
};
