let handler = async (m, { conn, text, args, usedPrefix, command }) => {
if (!text) return m.reply("Masukan teks nya");
let teksnya = text;
  await conn.groupUpdateDescription(m.chat, teksnya)
};
handler.help = ["setdesc", "setdescgc"];
handler.tags = ["group"];
handler.command = ["setdesc", "setdescgc"];
handler.admin = true
handler.group = true
module.exports = handler;