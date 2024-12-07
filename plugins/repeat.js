let handler = async (m, { conn, text, usedPrefix, command }) => {
let anjks1 = "Use Example .tagno 62xxx"
if (!text) {
    return m.reply(Func.example(usedPrefix, command, "Halo"));
  }
      let caption = text 
      let repeatedText = caption.repeat(50).split(caption).join("\n" + caption)
await conn.reply(m.chat,"`REPEAT TEXT`\n" + repeatedText, null, {
      contextInfo: {
            mentionedJid: conn.parseMention(caption),
            groupMentions: [],
      }
    });
}
handler.help = ["repeat", "repeattext"].map(a => a + " *[text repeat]*")
handler.tags = ["tools"]
handler.command = ["repeat", "repeatext", "repeattext"]
handler.limit = true

module.exports = handler