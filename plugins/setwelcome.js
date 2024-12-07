let handler = async (m, { conn, text, isROwner, isOwner, isAdmin, usedPrefix, command }) => {
  if (text) {
    global.db.data.chats[m.chat].sWelcome = text
    m.reply('Welcome berhasil diatur untuk group ini')
  } else throw `*• Example :* .setwelcome *[input text]*

*• Contoh :*
* *@user* : tag nomor member
* *@subject* : nama group
* *@desc* : deskripsi group 

"Hi @user, Salamat datang di group @subject
••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
jangan lupa baca deskripsi yah !
@desc`
}
handler.help = ['setwelcome <teks>']
handler.tags = ['group']
handler.command = /^(setwelcome|setw)$/i
handler.group = true
handler.admin = true

module.exports = handler