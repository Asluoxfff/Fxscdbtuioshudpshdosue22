const similarity = require("similarity");
const threshold = 0.72;
let handler = (m) => m;
handler.before = async function (m) {
  let id = m.chat;
  if (
    !m.quoted ||
    !m.quoted.fromMe ||
    !m.quoted.isBaileys ||
    !/Ketik.*who/i.test(m.quoted.text)
  )
    return !0;
  this.siapaaluxi = this.siapaaluxi ? this.siapaaluxi : {};
  if (!(id in this.siapaaluxi)) return m.reply("Soal itu telah berakhir");
  if (m.quoted.id == this.siapaaluxi[id][0].id) {
    let json = JSON.parse(JSON.stringify(this.siapaaluxi[id][1]));
    // m.reply(JSON.stringify(json, null, '\t'))
    if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
      global.db.data.users[m.sender].exp += this.siapaaluxi[id][2];
      await this.reply(m.chat, `*Benar!*\n+${this.siapaaluxi[id][2]} XP`, m);
      clearTimeout(this.siapaaluxi[id][3]);
      delete this.siapaaluxi[id];
    } else if (
      similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >=
      threshold
    )
      m.reply(`*Dikit Lagi!*`);
    else m.reply(`*Salah!*`);
  }
  return !0;
};
handler.exp = 30;

module.exports = handler;