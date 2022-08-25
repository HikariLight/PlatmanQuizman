const { createAudioResource, getVoiceConnections } = require('@discordjs/voice');
const ytdl = require('ytdl-core');

module.exports = (message, command, player) => {
    const stream = ytdl(command[1], { filter: 'audioonly' });
    const resource = createAudioResource(stream);

    const [voiceConnection] = getVoiceConnections().values();

    try{
        voiceConnection.subscribe(player);
        player.play(resource);
        message.channel.send("Playing!");

        if(command[2] !== undefined){
            let duration = parseInt(command[2]) + 1; // There's always a 1 second delay before playing starts which takes up actual playing time.
            setTimeout(() => player.pause(), duration * 1000);
        }

    } catch(error){
        console.log(error);
    }
}