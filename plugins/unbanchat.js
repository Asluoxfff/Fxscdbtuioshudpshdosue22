/*════════════════════════════════════
  ├ Weem Gweh Jier
  ├ WhatsApp: wa.me/62857021072505
  ├ Jangan Perjual Belikan Esce Ini!  
═════════════════════════════════════
*/
let handler = async (m, { isOwner, text, isAdmin }) => {
  let who
  if (m.isGroup) {
    if (!(isAdmin || isOwner)) {
      m.reply(global.status.admin)
      throw false
    }
    if (isOwner) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat
    who = m.mentionedJid[0] ? m.mentionedJid[0] : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat
  } else {
    if (!isOwner) {
      m.reply(global.status.owner)
      throw false
    }
    who = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat
  }
  try {
    if (who.endsWith('g.us')) global.db.data.chats[who].isBanned = false
    else global.db.data.users[who].banned = false
    m.reply(`🚩 Sukses! Bot aktif dichat ${await conn.getName(who) == undefined ? 'ini' : await conn.getName(who)}.`)
  } catch (e) {
    throw `🚩Nomor tidak ada didatabase!`
  }
}
handler.help = ['unban']
handler.tags = ['owner', 'group']
handler.command = ['unban', 'unbanchat']
handler.owner = true
module.exports = handler