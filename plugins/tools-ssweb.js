/*
 * *[Plugins Ssweb]*
 * https://whatsapp.com/channel/0029VaGgcSa3bbV4dMm9Fe3B
*/

const uploadImage = require("../lib/uploadImage.js");

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`Masukkan tautan yang valid\n\n*Contoh:*\n${usedPrefix + command} link`)
await m.reply(wait)
    let link = /^(https?:\/\/)/.test(text) ? text : "https://" + text
    try {
        let res = `https://zenkey.vercel.app/api/tools/ssweb?url=${encodeURIComponent(link)}`
        await conn.sendMessage(m.chat, {
            image: { url: res },
            caption: `*[ SCREENSHOT WEB ]*\nUrl : ${link}\n\nFrom : @${m.sender.split('@')[0]}`,
            mentions: [m.sender]
        }, { quoted: m })

    } catch (e) {
        await m.reply(e.toString())
    }
}

handler.help = ["ss", "ssf", "ssweb"]
handler.tags = ["tools"]
handler.command = /^ss(web|f)?$/i
module.exports = handler