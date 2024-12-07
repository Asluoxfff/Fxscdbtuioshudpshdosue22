const { siapakahaku } = require("@bochilteam/scraper");

let timeout = 130000;
let poin = 10000;
let handler = async (m, { conn, usedPrefix }) => {
    conn.siapaaluxi = conn.siapaaluxi ? conn.siapaaluxi : {};
    let id = m.chat;
    if (id in conn.siapaaluxi) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.siapaaluxi[id][0]);
        throw false;
    }
    const json = await siapakahaku();
    
    let who = m.sender;
    let name = conn.getName(who);
    let discriminator = who.substring(1, 25);
    let pp = 'https://i.pinimg.com/564x/d4/17/75/d41775c2a051fe94269e71bdcbd240a5.jpg';

    try {
        pp = await conn.getProfilePicture(who);
    } catch (e) {
        console.log(e)
    }
    
    const taggedUser = name ? ` from @${name}` : '';
    const taggedUser2 = m.sender ? ` https://wa.me/${m.sender.split('@')[0]}` : '';
    let caption = `
This question ${taggedUser}( ${taggedUser2} )\n\n
Siapakah aku? ${json.soal}
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}who untuk bantuan
Bonus: ${poin} XP
`.trim();
    const quizMessage = await conn.sendFile(m.chat, pp, 'siapakahaku.jpg', caption, m);
    conn.siapaaluxi[id] = [
        quizMessage,
        json,
        poin,
        setTimeout(() => {
            if (conn.siapaaluxi[id]) {
                conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.siapaaluxi[id][0]);
                delete conn.siapaaluxi[id];
            }
        }, timeout)
    ];
};

handler.help = ['siapakahaku'];
handler.tags = ['game'];
handler.command = /^siapa(kah)?aku/i;

module.exports = handler;