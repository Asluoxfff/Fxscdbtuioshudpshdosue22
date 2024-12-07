const fetch = require('node-fetch');

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) return m.reply(`• *Example :* ${usedPrefix}${command} *[url]*`);
    
    m.reply('Please wait...');
    
    try {
        // Mengirimkan permintaan ke itzpire.com dan menunggu respons
        let res = await fetch(`https://itzpire.com/download/aio?url=${text}`);
        let hasil = await res.json();
        
        // Mendapatkan URL dari hasil respon
        if (hasil.result && hasil.result.url) {
            await conn.sendFile(m.chat, hasil.result.url, '', '', m);
        } else {
            m.reply('Error: Tidak dapat menemukan URL di dalam respons API.');
        }
        
    } catch (error) {
        // Mengirimkan pesan error jika terjadi kesalahan saat mengambil data
        m.reply('Error: ' + error.message);
    }
};

handler.help = ["aio", "all", "semua"].map((a) => a + " *[url]*");
handler.tags = ["downloader"];
handler.command = ["aio", "all", "semua"];
handler.limit = 4;

module.exports = handler;