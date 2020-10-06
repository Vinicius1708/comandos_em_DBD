module.exports.run = async ({ client, message }) => {

    try {

        if (!message.member.voice.channel) return message.channel.send("Você não está em um canal de voz");

        const serverQueue = client.music.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send("Nada está tocando agora!");

        serverQueue.connection.dispatcher.end();

    } catch (err) {
        console.log(err);
    }
}

module.exports.help = {
    name: "pular",
    aliases: ['skip', 'next'],
    description: "Pula a música que esta tocando.",
    usage: 'pular'
}