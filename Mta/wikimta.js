const cheerio = require('cheerio');
var request = require('request');

module.exports.run = async ({ channel, args, prefix }) => {
    if (args[0] === undefined || args[0] === null) return channel.send(`Digite oque deseja procurar, EX \`${prefix}wikimta OnPlayerUpdate\``)

    request('https://wiki.multitheftauto.com/wiki/' + args[0], async function (error, response, body) {
        const result = cheerio.load(response.body);
        const titleText = result('pre').text();

        if (!titleText > null) return channel.send(`Nenhum resultado foi encontrado para: \`${args[0]}\``);
        channel.send(titleText, { split: { char: "\n" }, code: 'cs' });
    })
}

exports.help = {
    name: "wikimta",
    aliases: ['wiki-mta'],
    description: "Faz uma busca no wikimta de uma função",
    usage: 'wikimta'
}

