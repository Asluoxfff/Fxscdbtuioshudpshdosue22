let handler = async (m, { conn, args, usedPrefix, command }) => {
    let isClose = { // Switch Case Like :v
        'open': 'not_announcement',
        'close': 'announcement',
        'unlock': 'unlocked',
        'lock': 'locked',
    }[(args[0] || '')]
    if (isClose === undefined)
        throw `
*Format salah! Contoh :*
  *○ ${usedPrefix + command} close*
  *○ ${usedPrefix + command} open*
  *○ ${usedPrefix + command} unlock*
  *○ ${usedPrefix + command} lock*
`.trim()
    await conn.groupSettingUpdate(m.chat, isClose)
await conn.reply(m.chat, 'sᴜᴄᴄᴇss', fkontak)
}
handler.help = ['group *open / close*']
handler.tags = ['group']
handler.command = /^(group|grup|groups|gc|aluxi)$/i

handler.admin = true
handler.botAdmin = true

module.exports = handler