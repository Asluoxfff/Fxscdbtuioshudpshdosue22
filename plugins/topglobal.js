/*
SCRIPT AKIRAA BOT BY BANG SYAII 
* ig: Akira_art12
*WhatsApp: wa.me/6283842839555
*,Jangan Perjual belikan script ini jika ada yang menjual tanpa izin mohon laporkan ke saya dan jangan harap ada update Script ini kedepannya !!!
*/

function formatmoney(money) {
  const suffixes = [
    "",
    "k",
    "m",
    "b",
    "t",
    "q",
    "Q",
    "s",
    "S",
    "o",
    "n",
    "d",
    "U",
    "D",
    "Td",
    "qd",
    "Qd",
    "sd",
    "Sd",
    "od",
    "nd",
    "V",
    "Uv",
    "Dv",
    "Tv",
    "qv",
    "Qv",
    "sv",
    "Sv",
    "ov",
    "nv",
    "T",
    "UT",
    "DT",
    "TT",
    "qt",
    "QT",
    "st",
    "ST",
    "ot",
    "nt"
  ];
  const suffixIndex = Math.floor(Math.log10(money) / 3);
  const suffix = suffixes[suffixIndex];
  const scaledmoney = money / Math.pow(10, suffixIndex * 3);
  return scaledmoney.toFixed(2) + suffix;
}

async function handler(m, { conn }) {
let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
  else who = m.sender;
  let name = conn.getName(m.sender);
  let user = global.db.data.users[who];
  let anu;
  conn.sendMessage(m.chat, {
    react: {
      text: "🕒",
      key: m.key
    }
  });
  let money = Object.entries(global.db.data.users).sort(
    (a, b) => b[1].money - a[1].money
  );
  let getUser = money.map(v => v[0]);
  let show = Math.min(10, money.length);
  let rankmoney = money.map(([user]) => user);
  let teks = `[ *T O P - G L O B A L* ] \n`;
  teks += `[ 🏆 ] *You:* *${rankmoney.indexOf(m.sender) +
    1}* of *${getUser.length}*\n\n`;
  teks += money
    .slice(0, show)
    .map(
      ([user, data], i) =>
        i +
        1 +
        ". @" +
        user.split`@`[0] +
        "\n" +
        "   ◦ *Money* : *" +
        formatmoney(data.money) +
        "*\n" +
        "   ◦ *Level* : *" +
        data.level +
        "*\n   ◦ *Role* : *" + data.role + "*"
    )
    .join("\n");
  teks += `\n\nALUXI - MD`;
  conn.reply(m.chat, teks, m)
}

handler.command = ["topglobal"];
handler.tags = ["xp", "main"];
handler.help = ["topglobal"];
handler.register = true;

module.exports = handler;