const { inspect } = require("util");

module.exports.run = async ({ client, message, args }) => {


    if (!client.devs.includes(message.author.id)) return;

    //if (message.author.id !== '498492304592601090') return 0;
    let code = args.join(" ")

    if (!code) return message.channel.send('Digite algo!')

    const user = (id) => client.users.cache.find((user) => user.id == id);
    const canal = (id) => client.channels.cache.find((c) => c.id == id);
    const role = (id) => message.guild.roles.cache.find((r) => r.id == id);

    code = code.replace(/^`{3}(js)?|`{3}$/g, '')
    code = code.replace(/<@!?(\d{16,18})>/g, 'user($1)');
    code = code.replace(/<#?(\d{16,18})>/g, 'canal($1)');
    code = code.replace(/<@&?(\d{16,18})>/g, 'role($1)')

    let result;

    try {
        const evaled = await eval(code);
        result = inspect(evaled, { depth: 0 });

    } catch (error) {
        result = error.toString();
    };
    result = result.replace(/_user\((\d{16,18})\)/g, '<@$1>');
    message.channel.send(result, { split: { char: "\n" }, code: 'js' });
}

exports.help = {
    name: "eval",
    aliases: ['eval', 'executarcmds', 'e'],
    description: "Executa CMD's",
    usage: 'eval [code]'
};