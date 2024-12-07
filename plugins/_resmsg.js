async function before(m, { isAdmin, isBotAdmin }) {
    // Abaikan pesan dari bot sendiri
    if (m.isBaileys && m.fromMe) return;

    // Pastikan struktur data untuk pesan global dan grup ada
    global.db.data.msgs = global.db.data.msgs || {};
    let groupId = m.chat;

    // Pastikan data pesan untuk grup ini ada
    global.db.data.msgs[groupId] = global.db.data.msgs[groupId] || {};
    let msgs = global.db.data.msgs[groupId];

    // Mencari kunci yang sesuai dengan pesan yang diterima
    let foundKey = Object.keys(msgs).find(key => m.text === key);
    if (!foundKey) return; // Jika tidak ditemukan, abaikan pesan tanpa balasan

    // Memastikan data pesan valid
    let _m = JSON.parse(JSON.stringify(msgs[foundKey]), (_, v) => {
        if (
            v !== null &&
            typeof v === 'object' &&
            'type' in v &&
            v.type === 'Buffer' &&
            'data' in v &&
            Array.isArray(v.data)
        ) {
            return Buffer.from(v.data);
        }
        return v;
    });

    // Jika pesan tidak memiliki konten yang valid, abaikan
    if (!_m.message) {
        console.log('Pesan tidak valid:', _m);
        return;
    }

    // Ambil konten pesan
    const content = _m.message.conversation || _m.message.extendedTextMessage?.text;
    if (!content) return; // Jika konten kosong, abaikan

    // Template pesan dikutip
    const quoted = {
        key: {
            remoteJid: "status@broadcast",
            participant: "0@s.whatsapp.net",
            fromMe: false,
            id: ""
        },
        message: {
            conversation: "*ALUXI MD*"
        }
    };

    // Kirim pesan ke grup
    await this.sendMessage(m.chat, { text: content }, { quoted });
}

module.exports = {
    before,
};