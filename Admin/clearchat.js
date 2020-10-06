exports.run = async ({ message, args }) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Você não tem permissão para usar esse comando!");
    if (!args.join(" ")) return message.reply("Digite o tanto de mensagens que voce quer apagar.!");

    let totalDelMsg = parseInt(args[0]) - 1;
    let apagadas = totalDelMsg - 1;

    async function clear() {
        try {
            message.delete();
            const fetched = await message.channel.messages.fetch({ limit: totalDelMsg });
            message.channel.bulkDelete(fetched);
            message.reply(`\`${apagadas}\` Mensagens apagadas.`);
        } catch (e) {
            return message.reply(`Parece que algo deu errado! \`${e}\``);
        }
    }
    clear();
}
exports.help = {
    name: "clearchat",
    aliases: ['apagarchat', 'limparchat', 'cc'],
    description: "Limpa o chat aonde o comando foi executado",
    usage: 'cc [2 á 100]'
};