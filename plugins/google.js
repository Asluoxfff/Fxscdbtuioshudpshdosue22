const fetch = require("node-fetch");

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) return conn.reply(m.chat, `Masukkan teks yang ingin dicari.\n\nContoh :\n${command} Kapan Google Dibuat`, m)
    let apikey = global.lol;
    let url = `https://api.lolhuman.xyz/api/gsearch?apikey=595a355759b2413843d90719&query=${encodeURIComponent(text)}`;
    
    let wait = "_Sedang mencari informasi..._"
    conn.reply(m.chat, wait, m);
    
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        
        let data = await response.json();
        let sddd = "https://files.catbox.moe/mmzp8o.jpg"
        let msg = data.result.map(({ title, link, desc }) => {
            return `╭─────{ GOOGLE }──────╮\n*${title}* \n│ ⬡ _${link}_\n│ ⬡ _${desc}_\n╰───────`;
        }).join('\n\n');
        
        await conn.sendMessage(m.chat, {
            text: msg,
            contextInfo: {
                externalAdReply: {
                    title: 'Hasil Pencarian Google',
                    body: 'Hasil ini berasal dari Google',
                    thumbnailUrl: sddd,
                    sourceUrl: 'https://www.google.com/search?q=' + `${text}`,
                    mediaType: 2, 
                    renderLargerThumbnail: true
                }
            }
        });
    } catch (e) {
        console.error(e);
        m.reply(`Terjadi kesalahan saat mengambil data dari API.`);
    }
}

handler.help = ['google'].map(v => v + ' <query>');
handler.tags = ['internet'];
handler.command = /^google$/i;
handler.limit = true;

module.exports = handler;