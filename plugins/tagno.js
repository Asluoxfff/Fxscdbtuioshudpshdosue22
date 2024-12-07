let handler = async (m, { conn, text, usedPrefix, command }) => {
let anjks1 = "Use Example .tagno 62xxx"
if (!text) {
    return m.reply(Func.example(usedPrefix, command, "62xxx"));
  }
      let caption = "@" + text.split("@")[0] 
await conn.reply(m.chat, caption, null, {
      contextInfo: {
            mentionedJid: conn.parseMention(caption),
            groupMentions: [],
      }
    });
}
handler.help = ["tagno"].map(a => a + " *[tag nomor orang]*")
handler.tags = ["tools"]
handler.command = ["tagno"]
handler.limit = true

module.exports = handler