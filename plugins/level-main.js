let handler = async (m, { conn, text, args, usedPrefix, command }) => {
let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
  else who = m.sender;
let user = global.db.data.users[who];
    let qkr = `Level kamu saat ini : ${user.level}\nRole kamu saat ini : ${user.role}`
m.reply(qkr)
};
handler.help = ["level"]
handler.tags = ["user"];
handler.command = ["level"];
module.exports = handler;