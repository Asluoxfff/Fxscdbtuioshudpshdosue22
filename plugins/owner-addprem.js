let { MessageType } = require('@whiskeysockets/baileys');
let handler = async (m, { conn, text, usedPrefix }) => {
  function no(number) {
    return number.replace(/\s/g, '').replace(/([@+-])/g, '');
  }

  var hl = [];
  hl[0] = text.split('|')[0];
  hl[0] = no(hl[0]) + "@s.whatsapp.net";
  hl[1] = text.split('|')[1];

  if (!text) return conn.reply(m.chat, `*❏ GET NUMBER*\n\n• ${usedPrefix}prem number|days\n*Example:* ${usedPrefix}prem 6289654360447|99\n\n• ${usedPrefix}prem @tag|days\n*Example:* ${usedPrefix}prem @⁨+62 896-5436-0447⁩|99`, m);
  if (typeof db.data.users[hl[0]] === 'undefined') throw 'Pengguna tidak ada didalam database';

  var jumlahHari = 86400000 * hl[1];
  var now = new Date().getTime();
  
  // Penambahan kode agar saat kamu tidak mengatur waktu, akan diganti dengan permanent
  if (isNaN(jumlahHari)) {
    global.db.data.users[hl[0]].premium = true;
    global.db.data.users[hl[0]].premiumDate = Infinity;
  } else {
    global.db.data.users[hl[0]].premium = true;
    if (now < global.db.data.users[hl[0]].premiumDate) global.db.data.users[hl[0]].premiumDate += jumlahHari;
    global.db.data.users[hl[0]].premiumDate = now + jumlahHari;
  }

  let premiumDate = global.db.data.users[hl[0]].premiumDate === Infinity ? 'Unlimited' : msToDate(global.db.data.users[hl[0]].premiumDate - now);

  conn.reply(m.chat, `*❏ UPGRADE PREMIUM*\n\nBerhasil menambahkan akses premium kepada *@${hl[0].split('@')[0]}* selama *${hl[1]} hari*.\n\n*Premium : ${premiumDate}*`, m, { contextInfo: { mentionedJid: [hl[0]] } });
  conn.reply(hl[0], `*THANKS FOR BUY PREMIUM*\n\nBerhasil menambahkan ke akses premium *@${hl[0].split('@')[0]}* selama *${hl[1]} hari*.\n\n*Premium : ${premiumDate}*\nlimit: UNLIMITED\nInfo: Terimakasih telah membeli premium di aluxi!`, fkontak, { contextInfo: { mentionedJid: [hl[0]] } });
};

handler.help = ['prem *@tag|days*'];
handler.tags = ['owner'];
handler.command = /^(prem|addprem)$/i;
handler.owner = true;
handler.fail = null;

module.exports = handler;

function msToDate(ms) {
  let temp = ms;
  let days = Math.floor(ms / (24 * 60 * 60 * 1000));
  let daysms = ms % (24 * 60 * 60 * 1000);
  let hours = Math.floor((daysms) / (60 * 60 * 1000));
  let hoursms = ms % (60 * 60 * 1000);
  let minutes = Math.floor((hoursms) / (60 * 1000));
  let minutesms = ms % (60 * 1000);
  let sec = Math.floor((minutesms) / (1000));
  return days + "H " + hours + "J " + minutes + "M";
}