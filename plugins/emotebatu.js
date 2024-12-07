let handler = async (m, { conn, text, usedPrefix, command }) => {
let you = "`EMOTE KOK BATU`  🗿🗿🗿"
m.reply(you)
}

handler.customPrefix = /^(🗿)$/i;
handler.command = new RegExp();
module.exports = handler