module.exports.run = async ({ client, message }) => {
    const serverQueue = client.music.queue.get(message.guild.id);

    if (!message.member.voice.channel) return message.channel.send("Você não está em um canal de voz");
    if (!serverQueue) return message.channel.send("Nada está tocando agora!");

    serverQueue.connection.dispatcher.resume();
    message.channel.send('⏯️ Musica despausada com sucesso')

}


module.exports.help = {
    name: "resume",
    aliases: ['continuar', 'despause'],
    description: "continue uma música que esta pausada!",
    usage: 'resume'
}