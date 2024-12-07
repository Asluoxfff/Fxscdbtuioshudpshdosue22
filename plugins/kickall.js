let handler = async (m, { conn, participants }) => {
let user = participants.map(x => x.id)
let gc = await conn.groupMetadata(m.chat)
for (let a of user) {
if (a !== conn.user.jid && a !== gc.owner && a !== nomorown + '@s.whatsapp.net') {
conn.groupParticipantsUpdate(m.chat, [a], "remove")
}
}
}
handler.help = handler.command = ['kickall']
handler.admin = true
handler.botAdmin = true
module.exports = handler