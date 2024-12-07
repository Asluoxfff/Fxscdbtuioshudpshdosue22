let fetch = require("node-fetch")
let handler = async (m, { conn, text, usedPrefix, command }) => {
conn.sendMessage(m.chat, { 
      audio: { url: "https://files.catbox.moe/fl76cr.opus" }, 
      mimetype: 'audio/mpeg' 
    }, { quoted: m });
}
handler.help = ["psdf"]
handler.tags = [""]
handler.command = ["psdf"]
module.exports = handler