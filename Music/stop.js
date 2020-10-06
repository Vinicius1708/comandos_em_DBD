
module.exports.run = async ({ client, message }) => {

    const serverQueue = client.music.queue.get(message.guild.id);

    if (!message.member.voice.channel) return message.channel.send("Você não está em um canal de voz");
    if (!serverQueue) return message.channel.send("Nada está tocando agora!");

    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();

    message.channel.send('Music sttoped.')
}


module.exports.help = {
    name: "stop",
    aliases: ['parar', 'cancelar'],
    description: "Cancela todas as músicas que estão tocando.",
    usage: 'stop'
}