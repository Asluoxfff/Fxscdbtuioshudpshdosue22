let handler = async (m, { command, usedPrefix, text }) => {
    if (!m.isGroup) return m.reply("Command ini hanya dapat digunakan di grup.");
    if (!text) return m.reply(`*• Example :* ${usedPrefix + command} *[nama pesan]*`);

    // Ambil ID grup
    let groupId = m.chat;

    // Pastikan struktur data ada
    global.db.data.msgs = global.db.data.msgs || {};
    global.db.data.msgs[groupId] = global.db.data.msgs[groupId] || {};

    let msgs = global.db.data.msgs[groupId];

    if (!(text in msgs)) return m.reply(`Pesan tidak ditemukan dalam grup ini : *[ ${text} ]*`);
    if (/\d{5,16}@s\.whatsapp\.net$/.test(text)) {
        return m.reply(`Tidak dapat menghapus pesan yang terkait dengan nomor ponsel atau JID : *[ ${text} ]*`);
    }

    // Hapus pesan
    delete msgs[text];
    m.reply(`Berhasil menghapus pesan dalam grup ini : *[ ${text} ]*`);
};

handler.help = ['dellist'].map((a) => a + " *[premium & admin only]*");
handler.tags = ['premium'];
handler.command = ['dellist'];
handler.admin = true;
handler.premium = false;

module.exports = handler;