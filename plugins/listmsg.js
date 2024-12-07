let handler = async (m, { conn, usedPrefix, command }) => {
    if (!m.isGroup) return m.reply("Command ini hanya dapat digunakan di grup.");

    // Ambil ID grup
    let groupId = m.chat;

    // Pastikan struktur data ada
    global.db.data.msgs = global.db.data.msgs || {};
    global.db.data.msgs[groupId] = global.db.data.msgs[groupId] || {};

    let msgs = global.db.data.msgs[groupId];

    // Filter untuk tidak menampilkan nama yang berupa nomor ponsel atau JID
    let msg = Object.entries(msgs)
        .map(([nama, isi]) => ({ nama, ...isi }))
        .filter(v => !/^\d{5,16}@/.test(v.nama)) // Regex untuk JID (nomor ponsel)
        .map(v => v.nama);

    let anunya = Object.entries(msgs)
        .map(([nama, isi]) => ({ nama, ...isi }))
        .filter(v => !/^\d{5,16}@/.test(v.nama)); // Regex yang sama untuk memfilter

    let list = anunya.map((v, index) => `│ *( ${index + 1} )* ${v.nama}`).join('\n');

    if (msg[0]) {
        return conn.reply(m.chat, `┌─⭓「 *Message List* 」\n${list}\n└───────────────⭓`, m);
    } else {
        throw `Belum ada daftar pesan di grup ini.`;
    }
};

handler.help = ['list'].map((a) => a + " *[premium & admin only]*");
handler.tags = ['premium'];
handler.command = ['list'];
handler.premium = false;
handler.admin = true;
module.exports = handler;