# PlatmanQuizman
A Discord bot that plays the audio from a given link sent through a Direct Message for a given amount of seconds.

[Add Link](https://discord.com/api/oauth2/authorize?client_id=1009551579487154176&permissions=1117184&scope=bot%20applications.commands)

## Commands
Default prefix: &  

| Server Commands | Description                |
|---------|------------------------------------|
| stalk   | Connect to a voice channel.        |
| caught  | Disconnect from the voice channel. |
| spy  | Saves all the messages in the channel where the command was used to a local json file: "Server-channel.json" |

The prefix isn't needed for DM commands.

| DM Commands | Description                |
|---------|------------------------------------|
| play link [seconds: optional] | Play the audio in the link. |
| pause  | Pause the audio. |
| unpause  | Unpauses the audio. |