const similarity = require("similarity");
const threshold = 0.72;
let handler = (m) => m;
handler.before = async (m, { conn }) => {
  let id = m.chat;
  if (
    !m.quoted ||
    !m.quoted.fromMe ||
    !m.quoted.isBaileys ||
    !m.text ||
    !/Ketik.*hlog/i.test(m.quoted.text) ||
    /.*hlog/i.test(m.text)
  )
    return !0;
  conn.tebaklogo = conn.tebaklogo ? conn.tebaklogo : {};
  if (!(id in conn.tebaklogo))
    return conn.reply(m.chat, "Soal itu telah berakhir", m);
  if (m.quoted.id == conn.tebaklogo[id][0].id) {
    let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text);
    if (isSurrender) {
      clearTimeout(conn.tebaklogo[id][3]);
      delete conn.tebaklogo[id];
      return conn.reply(m.chat, "*Yah Menyerah :( !*", m);
    }
    let json = JSON.parse(JSON.stringify(conn.tebaklogo[id][1]));
    // m.reply(JSON.stringify(json, null, '\t'))
    if (m.text.toLowerCase() == json.hasil.data.jawaban.toLowerCase().trim()) {
      global.db.data.users[m.sender].exp += conn.tebaklogo[id][2];
      conn.reply(m.chat, `✅ *Benar!*\n+${conn.tebaklogo[id][2]} XP`, m);
      clearTimeout(conn.tebaklogo[id][3]);
      delete conn.tebaklogo[id];
    } else if (
      similarity(
        m.text.toLowerCase(),
        json.hasil.data.jawaban.toLowerCase().trim(),
      ) >= threshold
    )
      m.reply(`❗ *Dikit Lagi!*`);
    else conn.reply(m.chat, `❌ *Salah!*`, m);
  }
  return !0;
};
module.exports = handler;

const buttontebaklogo = [["tebaklogo", "/tebaklogo"]];
