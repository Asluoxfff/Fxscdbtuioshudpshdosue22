let handler = async (m, {conn, command}) => {
switch (command) {
case 'cekpremium':
case 'cekprem':
let user = global.db.data.users[m.sender]
if (user.premium) {
conn.reply(m.chat, 'Kamu masih Premium ✅', m)
} else conn.reply(m.chat, 'kamu bukan user premium\nPerpanjang premium hubungi owner', m)
break
  }
}
handler.command = /^cekpremium|cekprem$/i
module.exports = handler