const fs = require("fs");
let handler = async (m, { conn, text, usedPrefix, command }) => {
  db.data.redeem = db.data.redeem || [];

  if (!text) throw `*• Example:* ${usedPrefix + command} CODE|limit,atm,exp,money,potion|5d`;

  let [code, rewards, duration] = text.split('|');
  if (!code || !rewards || !duration) throw `*• Example:* ${usedPrefix + command} WELCOME123|50,100,200,5000,10|5d`;

  let [limit, atm, exp, money, potion] = rewards.split(',').map(v => parseInt(v.trim()));
  if ([limit, atm, exp, money, potion].some(v => isNaN(v))) {
    throw `*• Example:* ${usedPrefix + command} WELCOME123|50,100,200,5000,10\n\nEnsure rewards are numbers!`;
  }

  // Mengubah durasi dari format (number)d menjadi milidetik
  let durationMs = parseDuration(duration);
  if (!durationMs) throw `Invalid duration format. Use (number)d, e.g. 5d for 5 days.`;

  // Menambahkan kode redeem ke database dengan waktu kedaluwarsa
  db.data.redeem.push({
    code: code.trim(),
    reward: { limit, atm, exp, money, potion },
    claimedBy: [],
    timeout: Date.now() + durationMs // Menggunakan durasi timeout yang diberikan
  });

  m.reply(`✅ Successfully created redeem code:\n\n` +
    `🔑 Code: ${code.trim()}\n` +
    `🎁 Rewards:\n` +
    `  - 💎 Limit: ${limit}\n` +
    `  - 💳 ATM: ${atm}\n` +
    `  - ✨ EXP: ${exp}\n` +
    `  - 💰 Money: $${money}\n` +
    `  - 🧪 Potion: ${potion}\n\n` +
    `📢 The code will expire in: ${duration}`);

  // Kirim pemberitahuan ke semua grup
  let grup = Object.keys(db.data.chats).filter(v => v.endsWith('@g.us'));
  let cgc = `[ *NEW REDEEM CODE* ]\n\n` +
    `*Code: ${code.trim()}*\n` +
    `Rewards:\n` +
    `  • Limit: ${limit}\n` +
    `  • ATM: ${atm}\n` +
    `  • EXP: ${exp}\n` +
    `  • Money: $${money}\n` +
    `  • Potion: ${potion}\n\n` +
    `Redeem it now!\n` +
    `📢 The code will expire in: ${duration}`;

  for (let gc of grup) {
    await conn.sendMessage(gc, {
      document: fs.readFileSync('./package.json'),
      fileName: `ALUXI - MD`,
      mimetype: "image/png",
      fileLength: 999999999999999,
      jpegThumbnail: fs.readFileSync('./media/alxo.png'),
      description: 'hello',
      caption: cgc,
      contextInfo: {
        isForwarded: true,
        mentionedJid: conn.parseMention(cgc),
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363199957492480@newsletter',
          newsletterName: `ALVIAN UXIO Inc.`,
          serverMessageId: -1
        },
        businessMessageForwardInfo: {
          businessOwnerJid: conn.decodeJid(conn.user.id)
        },
        externalAdReply: {
          title: `© ALUXI - MD`,
          body: `REDEEM CODE`,
          thumbnailUrl: global.thumb,
          sourceUrl: `-`,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: fkontak });
    await conn.delay(5000);
  }
};

// Fungsi untuk mengubah durasi dalam format (number)d menjadi milidetik
function parseDuration(duration) {
  const match = duration.match(/^(\d+)(d)$/);
  if (match) {
    return parseInt(match[1]) * 86400000; // Mengonversi hari ke milidetik (1 hari = 86400000 ms)
  }
  return null;
}

handler.help = ["set-redeem"].map(a => a + ' *[code|limit,atm,exp,money,potion|duration]*');
handler.tags = ["owner"];
handler.command = ["set-redeem"];
handler.owner = true;
module.exports = handler;