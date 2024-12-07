let handler = async (m) => {

let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    if (typeof db.data.users[who] == 'undefined') throw 'Pengguna tidak ada didalam data base'
    let user = global.db.data.users[who]
    let limit = user.premiumTime >= 1 ? 'Unlimited' : user.limit    
let ah = `╭╌‌╌‌╌‌╌‌╌‌╌‌╌‌╌╌‌╌‌ 
│ *USERNAME:*
│⬡ ${user.registered ? user.name : conn.getName(who)}
│ *TAG:*
│⬡ @${who.split('@')[0]}
│ *LEVEL:*
│⬡ ${user.level}
│ *ROLE:*
│⬡ ${user.role}
│ *STATUS:*  
│⬡ ${who.split`@`[0] == global.nomorown ? 'DEVELOPER' : user.premiumTime >= 1 ? 'PREMIUM SERVICE' : user.level >= 1000 ? 'ELITE SERVICE' : 'FREE SERVICE'}
│ *LIMIT:* 
│⬡ ${limit} \n╰╌‌╌‌╌‌╌‌╌‌╌‌╌‌╌╌‌╌‌‌\nIngin Memiliki limit unlimited? silahkan hubungi owner`
conn.sendMessage(m.chat, {
text: ah,
contextInfo: {
mentionedJid: [who],
externalAdReply: {
showAdAttribution: true,
body: 'L I M I T',
thumbnailUrl: 'https://files.catbox.moe/1tba8a.jpg',
sourceUrl: "ALVIAN UXIO Inc.",
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: fkontak})
}
handler.help = ['limit']
handler.tags = ['main']
handler.customPrefix = /^(limit|.limit)$/i 
handler.command = new RegExp
module.exports = handler