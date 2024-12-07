let fs = require("fs");
let levelling = require('../lib/levelling');
let handler = async (m, { conn }) => {
  let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
  else who = m.sender;

  let name = conn.getName(m.sender);
  let user = global.db.data.users[who];
let { min, xp, max } = levelling.xpRange(user.level, global.multiplier);
let curr = user.exp - min;
    let minxp = max - user.exp;
  let anu;
  if (user) {
    anu = `
Level: ${user.level}\nRole: ${user.role}
XP: ${curr} / ${minxp}`;
  } else {
    anu = `User tidak ditemukan`;
  }
  await conn.sendMessage(
    m.chat,
    {
      text: anu,
      contextInfo: {
        externalAdReply: {
          title: "ROLE / TIER",
         body: "ALUXI - MD",
          thumbnailUrl: global.thumb,
          sourceUrl: "",
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
    },
    { quoted: m },
  );
};

handler.help = ["tier", "role"];
handler.tags = ["rpg"];
handler.command = ["tier", "role", "Tingkat"];

module.exports = handler;