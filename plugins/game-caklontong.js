const { caklontong } = require("@bochilteam/scraper");

let timeout = 130000;
let poin = 10000;
let handler = async (m, { conn, usedPrefix }) => {
    conn.cakaluxi = conn.cakaluxi ? conn.cakaluxi : {};
    let id = m.chat;
    if (id in conn.cakaluxi) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.cakaluxi[id][0]);
        throw false;
    }
    let json = await caklontong();
    
    // Get user's profile picture and other details
    let who = m.sender;
    let name = 'unknown'; // Default name in case of error
    let pp = global.thumb; // Default profile picture

    try {
        name = await conn.getName(who);
    } catch (e) {
        console.error('Error getting name:', e);
    }

    try {
        pp = await conn.getProfilePicture(who);
    } catch (e) {
        console.error('Error getting profile picture:', e);
    }
    
    let caption = `
${json.soal}
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}calo untuk bantuan
Bonus: ${poin} XP
`.trim();
    const caklontongMessage = await conn.sendFile(
        m.chat,
        pp,
        'profile.jpg',
        caption,
        m
    );
    conn.cakaluxi[id] = [
        caklontongMessage,
        json,
        poin,
        setTimeout(async () => {
            if (conn.cakaluxi[id]) {
                await conn.reply(
                    m.chat,
                    `Waktu habis!\nJawabannya adalah *${json.jawaban}*\n${json.deskripsi}`,
                    conn.cakaluxi[id][0]
                );
                delete conn.cakaluxi[id];
            }
        }, timeout)
    ];
};

handler.help = ['caklontong'];
handler.tags = ['game'];
handler.command = /^(caklontong|calontong)/i;

module.exports = handler;