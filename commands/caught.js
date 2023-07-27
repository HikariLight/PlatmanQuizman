const { getVoiceConnection } = require("@discordjs/voice")

module.exports = (message) => {
    const voiceConnection = getVoiceConnection(message.guildId)

    if (voiceConnection !== undefined) {
        voiceConnection.destroy()
        message.channel.send("NUUUU IT WASNT ME OFFICER!!")
    }
}
