let fs = require("fs");
let handler = async (m, { conn }) => {
  let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
  else who = m.sender;
  let name = conn.getName(m.sender);
  let user = global.db.data.users[who];
  let premium = user.premium ? "PREMIUM SERVICE" : "FREE SERVICE";
  let premiumDate = isNaN(user.premiumDate)
      ? user.premiumDate
      : `${(await Func.toDate(user.premiumDate)) || "Tidak ada waktu durasi"}`;
  let anu;
  if (user) {
    anu = `
Info : @${who.split(`@`)[0]}    

Balance :
> $ ${user.money}
Limit :
> ≈ ${user.limit}
Premium :
> ${premium}
Durasi Premium :
> ${premiumDate}`;
  } else {
    anu = `User tidak ditemukan`;
  }
  await conn.sendMessage(
    m.chat,
    {
      text: anu,
      contextInfo: {
      mentionedJid: [who],
        externalAdReply: {
          title: "USER BALANCE",
         body: "ALUXI - MD",
          thumbnailUrl: "https://telegra.ph/file/bb562cfd966da4ed5b81a.jpg",
          sourceUrl: "",
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
    },
    { quoted: m },
  );
};

handler.help = ["balance", "money"];
handler.tags = ["rpg"];
handler.command = ["balance", "money", "uang"];

module.exports = handler;