//© AkiraaBot 2023-2024
// • Credits : wa.me/6281235807940 [ krizz ]
// • Owner: 6281235807940

/*
• untuk siapa pun yang ketahuan menjual script ini tanpa sepengetahuan developer mohon untuk dilaporkan !
*/

const { proto } = require('@whiskeysockets/baileys');

let handler = async (m, { conn, text, command, usedPrefix }) => {
    let M = proto.WebMessageInfo;

    if (!m.isGroup) return m.reply("Command ini hanya dapat digunakan di grup.");
    if (!m.quoted) return m.reply(`*• Example :* ${usedPrefix + command} *[reply message]*`);
    if (!text) return m.reply(`*• Example :* ${usedPrefix + command} raja iblis`);

    // Ambil ID grup
    let groupId = m.chat;

    // Pastikan struktur data ada
    global.db.data.msgs = global.db.data.msgs || {};
    global.db.data.msgs[groupId] = global.db.data.msgs[groupId] || {};

    let msgs = global.db.data.msgs[groupId];
    if (text in msgs) return m.reply(`Pesan sudah ada dalam grup ini : *[ ${text} ]*`);

    // Simpan pesan ke grup tertentu
    msgs[text] = await M.fromObject(await m.getQuotedObj()).toJSON();
    return m.reply(`Berhasil menambahkan pesan dalam grup ini : *[ ${text} ]*`);
};

handler.help = ["addlist"].map((a) => a + " *[premium & admin only]*");
handler.tags = ["premium"];
handler.command = ["addlist"];
handler.admin = true;
handler.premium = false;

module.exports = handler;