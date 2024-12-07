let handler = m => m

let linkRegex = /(anj(k|g)|ajn?(g|k)|a?njin(g|k)|bajingan|b(a?n)?gsa?t|ko?nto?l|me?me?(k|q)|pe?pe?(k|q)|meki|titi(t|d)|pe?ler|tetek|toket|ngewe|go?blo?k|to?lo?l|idiot|(k|ng)e?nto?(t|d)|jembut|bego|dajj?al|janc(u|o)k|pantek|puki ?(mak)?|kimak|babi|anj|bangsad|bgsd|peler|pantek|ngentod|kontol|ngentd|ngntod|koncol|kncl|kncol|kampang|lonte|col(i|mek?)|pelacur|henceu?t|nigga|fuck|dick|bitch|tits|bastard|asshole|a(su|sw|syu)|anj(jiang|jing)|cok|cuk|jan(cok|cuk)|juancuk)/i

handler.before = async function (m, { isAdmin, isBotAdmin }) {
  if ((m.isBaileys && m.fromMe) || m.fromMe || !m.isGroup) return true
  let chat = global.db.data.chats[m.chat]
  let isGroupLink = linkRegex.exec(m.text)
  let sdk = "`[ SYSTEM DETECTED ]` Kata-kata aneh terdeteksi. maaf saya harus menghapus pesan ini"
  if (chat.antiToxic && isGroupLink) {
    conn.reply(m.chat, sdk, fkontak)
    await conn.sendMessage(m.chat, { delete: m.key })
  }
  return true
}

module.exports = handler