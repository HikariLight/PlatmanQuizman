module.exports = (message, player) => {
    try {
        player.pause()
        message.channel.send("Paused.")
    } catch (error) {
        console.log(error)
    }
}
