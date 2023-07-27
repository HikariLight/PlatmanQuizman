const { EmbedBuilder } = require("discord.js")

const serverCommandsEmbed = new EmbedBuilder()
    .setColor(0x008080)
    .setTitle("Server Commands")

    .addFields(
        { name: "stalk", value: "Join the voice channel." },
        { name: "caught", value: "Leave the voice channel." },
        { name: "spy", value: "This is secret." }
    )

const DMCommandsEmbed = new EmbedBuilder()
    .setColor(0x008080)
    .setTitle("DM Commands")

    .addFields(
        {
            name: "play link [duration in seconds: optional]",
            value: "Play audio in the link.",
        },
        { name: "pause", value: "Pause the audio." },
        { name: "unpause", value: "Unpause the audio." }
    )

module.exports = (message) => {
    message.channel.send({ embeds: [serverCommandsEmbed, DMCommandsEmbed] })
}
