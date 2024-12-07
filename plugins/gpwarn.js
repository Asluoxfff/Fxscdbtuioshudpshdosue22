/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

let handler = async (m, {conn, 
text,
args,
usedPrefix, 
command,
participants
}) => {

  let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false;


if (!who) return conn.sendMessage(m.chat, {text: `Tag/reply orangnya yg mau di ${command} !`, mentions: participants.map(a => a.id)}, {quoted: m})

let user = global.db.data.users[who]
if (user.warn == undefined) user.warn = 0
if (user.warn >= 15) {
 conn.groupParticipantsUpdate(m.chat, [who], 'remove').then(_ =>{
 conn.reply(m.chat, '📣 *Kamu akan dikeluarkan dari grup karena total warn kamu mencapai 15 point* ❗', m)
 user.warn = 0
  })
} else {
if (command == 'warn') {
user.warn += 1
conn.reply(m.chat, `*Sukses menambahkan warn kepada @${who.split`@`[0]}* •> ${user.warn}/15`, m, {
          contextInfo: {
            mentionedJid: [who],
          },
        })
} else if (command == 'delwarn') {
user.warn -= 1
conn.reply(m.chat, `*Sukses mengurangi warn kepada @${who.split`@`[0]}* •> ${user.warn}/15`, m, {
          contextInfo: {
            mentionedJid: [who],
          },
        })
}
}
}
handler.help = ['warn @tag']
handler.tags = ['own']
handler.command = /^(unwarn|warn|delwarn)$/i
handler.admin = true
handler.group = true
module.exports = handler