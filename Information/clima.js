const weather = require("weather-js");
const { MessageEmbed } = require('discord.js')

module.exports.run = async ({ channel, args, prefix }) => {

    if (args[0] === undefined || args[0] === null) return channel.send(new MessageEmbed().setDescription(`Forma de usar: \`${prefix}clima cidade/estado\``).setColor("#ff0000"))

    let tuamsg = args.slice(0).join(' ')

    try {

        weather.find({ search: tuamsg, degreeType: 'C', lang: 'pt-BR' }, (err, result) => {
            result = result[0];
            if (!result) {
                channel.send("Fale um local que exista, ou coloque o nome corretamente!");
                return;
            }
            var current = result.current;
            var location = result.location;
            let embed = new MessageEmbed()
                .setAuthor(`Tempo para: ${location.name}`)
                .setDescription(`${current.skytext}`)
                .setThumbnail(current.imageUrl)
                .addField(":alarm_clock: Fuso horário:", `UTC${location.timezone >= 0 ? "+" : ""}${location.timezone}`, true)
                .addField(":thermometer: Tipo de grau:", location.degreetype, true)
                .addField(':thermometer: Temperatura:', `${current.temperature}° C`, true)
                .addField(':thermometer: Sensação térmica:', `${current.feelslike}° C`, true)
                .addField(':wind_blowing_face: Ventos:', current.winddisplay, true)
                .addField(':sweat_drops: Umidade:', `${current.humidity}%`, true)
                .setColor(0xff6e00)
                .setTimestamp();
            channel.send({ embed });
        })
    } catch (e) {
        console.log(`[LOG]: 'clima.js' ${e.name}:${e.message}`)
    }
}

exports.help = {
    name: "clima",
    aliases: ['tempo', 'weather'],
    description: "Mostra o clima da cidade"
};