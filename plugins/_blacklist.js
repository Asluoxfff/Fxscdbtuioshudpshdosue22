async function before(m, { conn, isAdmin, isBotAdmin }) {
   if (!m.isGroup) return;
    if (m.fromMe) return;

    let bl = db.data.chats[m.chat].blacklist || [];

    if (Object.values(bl).find(users => users.id == m.sender) && isAdmin) {
        // Menghapus pengguna dari grup jika ada di dalam daftar hitam
        conn.sendMessage(m.chat, { delete: { ...m.key }});
      for (let usr of bl) {
        let idbl = usr.id;
        if (idbl === m.fromMe) return;
        conn.reply(m.chat, "Anda terdeteksi di dalam daftar hitam, Maaf Saya akan mengeluarkan anda", m);
        conn.delay(3000)
        conn.groupParticipantsUpdate(m.chat, [idbl], "remove")
        }  
    }
}

module.exports = {
    before,
};