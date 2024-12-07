let handler = async (m, { conn, args, usedPrefix, command }) => {
  conn.chatModify({ delete: true, lastMessages: [{ key: m.key, messageTimestamp: m.messageTimestamp }] }, m.chat)
  m.reply("SUCCESS CLEARED CHAT")
};
handler.help = ["clearchat"].map((a) => a + " *[example code]*");
handler.tags = ["owner"];
handler.command = ["clearchat"];
handler.owner = true;
module.exports = handler;