const stalk = require("../commands/stalk");
const caught = require("../commands/caught");
const play = require("../commands/play");
const pause = require("../commands/pause");

const prefix = "&";

module.exports = (client, message) => {

    if(message.guildId === null){
        const command = message.content.split(" ");

        console.log(`Direct message: ${message.content}`);

        switch(command[0]){
            case "play":
                play(message, command);
                break;

            case "pause":
                pause(message);
                break;
        }
    }

    else if(message.guildId !== null && message.content.startsWith(prefix)){
        const command = message.content.split(prefix);

        console.log(`Server message: ${message.content}`);

        switch(command[1]){
            case "stalk":
                stalk(client, message);
                break;

            case "caught":
                caught(message);
                break;
        }
    }
}