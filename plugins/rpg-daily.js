const free = 5000;
const prem = 10000;
const moneyfree = 5000;
const moneyprem = 10000;
const potionfree = 60;
const potionprem = 150;
const timeout = 86400000;
const limitfree = 15;
const limitprem = 25;

let handler = async (m, { conn, isPrems }) => {
  let time = global.db.data.users[m.sender].lastclaim + 86400000;
  if (new Date() - global.db.data.users[m.sender].lastclaim < 86400000)
    throw `Anda sudah mengklaim, klaim harian hari ini\ntunggu selama ${msToTime(time - new Date())} lagi`;
  //  conn.reply(m.chat, `Anda sudah mengklaim dan mendapatkan :`, m)
  global.db.data.users[m.sender].exp += isPrems ? prem : free;
  global.db.data.users[m.sender].money += isPrems ? moneyprem : moneyfree;
  global.db.data.users[m.sender].potion += isPrems ? potionprem : potionfree;
  global.db.data.users[m.sender].limit += isPrems ? limitprem : limitfree;
  // global.db.data.users[m.sender].potion += 5
  conn.reply(
    m.chat,
    `Selamat kamu mendapatkan:\n\n+${isPrems ? prem : free} Exp\n+${isPrems ? moneyprem : moneyfree} Money\n+${isPrems ? limitprem : limitfree} Limit\n+${isPrems ? potionprem : potionfree} Potion`,
    m,
  );
  global.db.data.users[m.sender].lastclaim = new Date() * 1;
  setTimeout(() => {
    conn.reply(m.chat, `Daily sudah bisa di dapatkan kembali`, m);
  }, timeout);
};
handler.help = ["daily"];
handler.tags = ["rpg"];
handler.command = ["daily"];
handler.limit = true;

module.exports = handler;

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + " jam " + minutes + " menit " + seconds + " detik";
}