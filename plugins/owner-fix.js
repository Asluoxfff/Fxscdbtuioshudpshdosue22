let handler = async (m, {conn}) => {
let grup = Object.keys(db.data.chats).filter(jid => jid.endsWith('@g.us'))

let jumlah = 0
for (let id of grup) {
try {
await conn.groupMetadata(id)
} catch (e) {
delete db.data.chats[id]
jumlah += 1
}
}
if (jumlah == 0) {
await m.reply('Database normal kok sayang, tidak ada yang Error')
} else {
await m.reply(`Sukses membersihkan database grup yang Error.\nTotal: ${jumlah} Id`)
}
}
handler.help = 
handler.command = ['fixdatabase', 'fixdb']
handler.tags = ['owner']
handler.owner = true

module.exports = handler