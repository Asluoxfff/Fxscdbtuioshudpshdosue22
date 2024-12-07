/*
SCRIPT AKIRAA BOT BY BANG SYAII 
* ig: Akira_art12
*WhatsApp: wa.me/6283842839555
*,Jangan Perjual belikan script ini jika ada yang menjual tanpa izin mohon laporkan ke saya dan jangan harap ada update Script ini kedepannya !!!
*/

let handler  = async (m, { conn, text, usedPrefix }) => {
  function msToDate(ms) {
		temp = ms
		days = Math.floor(ms / (24*60*60*1000));
		daysms = ms % (24*60*60*1000);
		hours = Math.floor((daysms)/(60*60*1000));
		hoursms = ms % (60*60*1000);
		minutes = Math.floor((hoursms)/(60*1000));
		minutesms = ms % (60*1000);
		sec = Math.floor((minutesms)/(1000));
		return days+" Hari "+hours+" Jam "+ minutes + " Menit";
		// +minutes+":"+sec;
  }

	let users = global.db.data.users
	let { registered, name } = global.db.data.users[m.sender]

  var text = ""
  var i = 1
  for (let jid in users){
    if (users[jid].premium){
      text += `\n\n╭╌> ${i}. ${conn.getName(jid)}\n│⬡ @${jid.replace(/@.+/, '')}\n│⬡ ${msToDate(global.db.data.users[jid].premiumDate - new Date() * 1)}\n╰╌╌╌╌╌╌╌╌‌`
      i += 1
    }
  }

  return conn.reply(m.chat,`LIST PREMIUM USER\n\nTotal Premium : ${i-1} user\nBuy Premium ?\nKetik *${usedPrefix}owner*\n${text}`,m , { contextInfo: { mentionedJid: conn.parseMention(text) }})
}
handler.help = ['listpremium']
handler.tags = ['info']
handler.command = /^(listpremium|premiumlist|listprem|premlist)$/i
handler.owner = true
module.exports = handler