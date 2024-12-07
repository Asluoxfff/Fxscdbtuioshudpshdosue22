let handler = async (m, { conn, text, isROwner, isOwner, isAdmin, usedPrefix, command }) => {
  if (text) {
    global.db.data.chats[m.chat].sBye = text
    m.reply('Left Berhasil diatur untuk group ini')
  } else throw `*• Example :* setleft *[input text]*

*• Contoh :*
* *@user* : tag nomor member
* *@subject* : nama group
* *@desc* : deskripsi group 

"Selamat Tinggal @user, semoga kamu cepat kembali !`
}
handler.help = ['setleft <teks>']
handler.tags = ['group']
handler.command = /^(setleft|setbye)$/i
handler.group = true
handler.admin = true

module.exports = handler