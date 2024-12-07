let handler = async (m, { text }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
    else who = m.chat
    if (!who) throw '*• Example:* .addowner @users *[tag or reply users]*'
    if (global.owner.includes(who.split('@')[0])) throw '*• Example:* .addowner @users *[tag or reply users]*'
    global.owner.push(who.split('@')[0])
    const caption = `Sekarang @${who.split('@')[0]} telah dijadikan sebagai owner ${namebot}!`
    await felzar.reply(m.chat, caption, m, {
        mentions: felzar.parseMention(caption)
    });
}
handler.help = ['addowner'].map(a => a + ' *[tag users]*')
handler.tags = ['owner']
handler.command = /^(add|tambah|\+)owner$/i
handler.rowner = true

module.exports = handler