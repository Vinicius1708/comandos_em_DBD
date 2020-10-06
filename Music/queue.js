const { MessageEmbed } = require('discord.js');
let moment = require('moment')

module.exports.run = async ({ client, message }) => {

    let connection = message.guild.voice.connection;
    const serverQueue = client.music.queue.get(message.guild.id);

    if (!message.member.voice.channel) return message.reply("você não está em um canal de voz");
    if (!serverQueue) return message.channel.send("Nada está tocando agora");

    let tempo = serverQueue.songs.map(song => `${(song.horas < 10 ? "0" + song.horas : song.horas) + ":" + (song.min < 10 ? "0" + song.min : song.min) + ":" + (song.seg < 10 ? "0" + song.seg : song.seg)}`);

    function timeConver(time) {
        return new Date(Date.now() - time).toISOString().substring(11, 19)
    }

    let queueList = "";
    if (serverQueue.songs[0]) {
        for (var i = 0; i < serverQueue.songs.length; i++) {
            if (i === 0) {
                var emLive = `${tempo[i]}`;
                var live = emLive.replace(`00:00:00`, "<:infinito:665331943147175956>");
                queueList += `\`${i + 1}.\` 𝐓𝐎𝐂𝐀𝐍𝐃𝐎 𝐀𝐆𝐎𝐑𝐀: [**__${serverQueue.songs[i].title}__**](${serverQueue.songs[i].url}) - **${serverQueue.songs[i].canal}** - ${client.music.queue.get(message.guild.id).userAuthor[0]} \`${timeConver(connection.dispatcher.startTime)}\`/${live}\n\n`;
            } else {
                var emLive2 = `${tempo[i]}`;
                var live = emLive2.replace(`00:00:00`, "<:infinito:665331943147175956>");
                queueList += `\`${i + 1}.\` [${serverQueue.songs[i].title}](${serverQueue.songs[i].url}) - **${serverQueue.songs[i].canal}** - ${client.music.queue.get(message.guild.id).userAuthor[i]} ${live}\n\n`;
            }
            if (i >= 9) break;
        }
    }
    let embed = new MessageEmbed();
    embed.setTitle(`Musicas na fila: ${serverQueue.songs.length}`);
    embed.setColor("#00ceff");
    embed.setDescription(queueList);
    message.channel.send(embed);
}

module.exports.help = {
    name: "fila",
    aliases: ['f', 'queue', 'list'],
    description: "Mostra todas as músicas que estão na fila",
    usage: 'fila'
}