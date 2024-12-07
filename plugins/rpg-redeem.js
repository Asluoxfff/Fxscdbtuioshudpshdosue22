let handler = async (m, { conn, text, usedPrefix, command }) => {
  const user = global.db.data.users[m.sender];

  if (!text) throw `*• Example:* ${usedPrefix + command} [REDEEM CODE]`;

  let redeemList = db.data.redeem || [];
  let redeemItem = redeemList.find((r) => r.code === text.trim());

  if (!redeemItem) {
    m.reply('*[ INVALID REDEEM CODE ]*');
    return;
  }

  // Cek apakah kode redeem sudah habis masa berlakunya
  const currentTimeMs = new Date().getTime();
  if (currentTimeMs > redeemItem.timeout) {
    m.reply(`❌ This redeem code has expired and cannot be used.`);
    return;
  }

  // Cek apakah kode sudah diklaim oleh pengguna
  if (redeemItem.claimedBy.includes(m.sender)) {
    m.reply(`❌ You have already claimed this redeem code.`);
    return;
  }

  // Tambahkan hadiah sesuai dengan konfigurasi kode redeem
  user.limit += redeemItem.reward.limit || 0;
  user.atm += redeemItem.reward.atm || 0;
  user.exp += redeemItem.reward.exp || 0;
  user.money += redeemItem.reward.money || 0;
  user.potion += redeemItem.reward.potion || 0;

  // Tandai kode telah diklaim oleh pengguna
  redeemItem.claimedBy.push(m.sender);
  user.lastredeem = Date.now();

  m.reply(
    `*Successfully claimed redeem code:*\n\n` +
    `✧ Limit: +${redeemItem.reward.limit}\n` +
    `✧ ATM: +${redeemItem.reward.atm}\n` +
    `✧ EXP: +${redeemItem.reward.exp}\n` +
    `✧ Money: +$${redeemItem.reward.money}\n` +
    `✧ Potion: +${redeemItem.reward.potion}\n\n` +
    `*Thank you for using ALUXI - MD.*`
  );
};

handler.help = ["redeem"].map((a) => a + " *[code redeem]*");
handler.tags = ["main"];
handler.command = ["redeem"];
module.exports = handler;