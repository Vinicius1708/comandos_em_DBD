exports.run = async ({ channel, args }) => {
    const specialCodes = {
        '0': ':zero:',
        '1': ':one:',
        '2': ':two:',
        '3': ':three:',
        '4': ':four:',
        '5': ':five:',
        '6': ':six:',
        '7': ':seven:',
        '8': ':eight:',
        '9': ':nine:',
        '#': ':hash:',
        '*': ':asterisk:',
        '?': ':grey_question:',
        '!': ':grey_exclamation:',
        ' ': '   '
    }

    if (!args.join(" ")) return channel.send("Digite algo!");


    const emojified = args.join(' ').toLowerCase().split('').map(letter => {
        if (/[a-z]/g.test(letter)) {
            return `:regional_indicator_${letter}: `
        } else if (specialCodes[letter]) {
            return `${specialCodes[letter]} `
        }
        return letter
    }).join('')
    channel.send(emojified)
}

exports.help = {
    name: "emojify",
    aliases: ['say', 'dizer', 'speak'],
    description: "Faça com que eu fale qualquer frase para você.",
    usage: 'falar [texto]'
};
