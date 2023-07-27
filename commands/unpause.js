module.exports = (message, player) => {
    try {
        player.unpause()
        message.channel.send("Playing again!")
    } catch (error) {
        console.log(error)
    }
}
