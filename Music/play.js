const { MessageEmbed } = require('discord.js');

module.exports.run = async ({ client, message, prefix }) => {
    try {

        const youtube = client.music.youtube;
        const args = message.content.split(' ');

        if (args[1] === undefined || args[1] === null) return message.channel.send(`use \`${prefix}play\` **nome da música**`)
        const searchString = args.slice(1).join(' ');
        const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
        const vc = message.member.voice.channel;

        if (!vc) return message.channel.send("Você não está em um canal de voz");

        const permissions = vc.permissionsFor(message.client.user);

        if (!permissions.has('CONNECT')) return message.channel.send("Não consigo entrar no seu canal de voz");
        if (!permissions.has('SPEAK')) return message.channel.send("Não consigo falar no seu canal de voz");

        function getVote(name) {
            switch (name) {
                case "UM":
                    return 1;
                case "DOIS":
                    return 2;
                case "TRES":
                    return 3;
                case "Quatro":
                    return 4;
                case "Cinco":
                    return 5;
                default:
                    return;
            }
        }
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id);
                await client.music.handleVideo(video2, message, vc, true);
            }
            return message.channel.send(`Playlist **${playlist.title} ** adicionado à lista de reprodução atual..`);
        } else {
            try {
                var video = await youtube.getVideo(url);
                if (video) return client.music.handleVideo(video, message, vc);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 5);
                    let index = 0;

                    const MusicEmbed = new MessageEmbed()
                        .setTitle("Selecione de 1 á 5")
                        .setDescription(`${videos.map(video2 => `${++index}- ** ${video2.title}**`).join('\n')}\n\nReaja no valor desejado.`)
                        .setColor('#FFFFFF')
                    message.channel.send(MusicEmbed).then(async msg => {

                        const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id, { time: 60 * 1000 });
                        collector.on("collect", async r => {
                            if (r.emoji.name === "❌") {
                                msg.delete({ timeout: 1000, reason: 'Musica end' }).catch(() => { })
                            }
                            let vote = getVote(r.emoji.name);
                            if (vote) {
                                collector.stop();
                                var video = await youtube.getVideoByID(videos[vote - 1].id);
                                r.remove(message.author).catch(() => { })
                                msg.delete({ timeout: 12 * 1000, reason: 'It had to be done.' });
                                return client.music.handleVideo(video, message, vc);
                            }
                        })
                        switch (videos.length) {
                            case 5: {
                                await msg.react(client.emojis.cache.get('568470831043313678')); //'1
                                await msg.react(client.emojis.cache.get('568470831621996544')); //2
                                await msg.react(client.emojis.cache.get('568470831697625103')); //3
                                await msg.react(client.emojis.cache.get('568470831512944693')); //4
                                await msg.react(client.emojis.cache.get('568470831630516233')); //5
                                await msg.react('❌');
                                break;
                            }
                            case 2: {
                                await msg.react(client.emojis.cache.get('568470831043313678'));//1
                                await msg.react(client.emojis.cache.get('568470831621996544'));//1
                                await msg.react('❌');
                                break;
                            }
                            case 0:
                                MusicEmbed.setDescription('Nenhuma música encontrada')
                                msg.edit(MusicEmbed).then(m => m.delete({ timeout: 12 * 1000, reason: 'a' })).catch(() => { });
                                break;
                        }
                    })
                } catch (err) {
                    console.log(err)
                    return;
                }
            }
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports.help = {
    name: "play",
    aliases: ['p', 'tocar', 'youtubeplay'],
    description: "Toca uma música do youtube",
    usage: 'play nome da musica'
}