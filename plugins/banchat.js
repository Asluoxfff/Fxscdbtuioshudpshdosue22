let handler = async (m, { conn, isOwner, text, isAdmin }) => {
  let who
  if (m.isGroup) {
    if (!(isAdmin || isOwner)) {
      global.dfail('admin', m, conn)
      throw false
    }
    if (isOwner) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat
    else who = m.chat
  } else {
    if (!isOwner) {
      global.dfail('owner', m, conn)
      throw false
    }
    who = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat
  }

  try {
if (!isOwner && isAdmin) return
    if (who.endsWith('g.us')) global.db.data.chats[who].isBanned = true


    conn.reply(m.chat, `Berhasil Ban! ${await conn.user.name} tidak aktif dichat ${await conn.getName(who) == undefined ? 'ini' : await conn.getName(who)}.`, m)
  } catch (e) {
    throw `Nomor tidak ada didatabase.`
  }
}
handler.help = ['banchat']
handler.tags = ['owner']
handler.command = ['mute', 'banchat']
handler.admin = true
module.exports = handler