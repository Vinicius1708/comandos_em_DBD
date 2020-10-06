const { MessageEmbed } = require('discord.js');
const moment = require('moment')
const cpuStat = require("cpu-stat");
const os = require('os')

exports.run = async ({ client, message }) => {
    cpuStat.usagePercent(async function (err, percent, seconds) {
        const text = `\`\`\`ini\n[ ${os.cpus().map(i => `${i.model}`)[0]} ]\`\`\`\n🌐 Servers: \`${client.guilds.cache.size}\`\n👥 Users: \`${client.users.cache.size}\`\n\n🔥 CPU: \`${percent.toFixed(2)}%\`\n📝 Memória: \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)}\`\n\n💻 Sistema: \`${os.platform()} - ${os.arch()}\`\n<:owner:691749202950357045> Owner: \`Cartter#5516\``
        message.channel.send(new MessageEmbed().setDescription(text))
    })
}

exports.help = {
    name: "stats",
    aliases: ['vps', 'botinfo'],
    description: "Mostra os dados do bot",
    usage: 'stats'
};
