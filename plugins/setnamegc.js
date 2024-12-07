let handler = async (m, { conn, text, args, usedPrefix, command }) => {
if (!text) return m.reply("Masukan teks nya");
let teksnya = text;
  await conn.groupUpdateSubject(m.chat, teksnya)
};
handler.help = ["setnamegc", "sngc"];
handler.tags = ["group"];
handler.command = ["setnamegc", "sngc"];
handler.group = true
handler.admin = true
module.exports = handler;