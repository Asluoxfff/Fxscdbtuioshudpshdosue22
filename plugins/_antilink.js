let handler = m => m

let linkRegex = /(chat.whatsapp.com\/([0-9A-Za-z]{20,24})|(https?:\/\/)?(www\.)?([a-zA-Z0-9\-]+\.)+(com|xyz|me|my|id|io|eu\.org|biz|biz\.id)(\/[^\s]+)?)/i

handler.before = async function (m, { isAdmin, isBotAdmin }) {
  if ((m.isBaileys && m.fromMe) || m.fromMe || !m.isGroup) return true
  let chat = global.db.data.chats[m.chat]
  let isGroupLink = linkRegex.exec(m.text)
  let sdk = "`[ SYSTEM DETECTED ]` Link terdeteksi. maaf saya harus menghapus pesan ini"
  if (chat.antiLink && isGroupLink) {
    conn.reply(m.chat, sdk, fkontak)
    await conn.sendMessage(m.chat, { delete: m.key })
  }
  return true
}

module.exports = handler