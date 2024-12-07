let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) return m.reply(`• *Example :* ${usedPrefix}${command} *[mediafire url]*`)
    m.reply(wait)
    const axios = require('axios');
    const res = await axios.get(`https://api.botwa.space/api/mediafire?url=${text}&apikey=fFUzSrI1ZcD3`)
    const x = await res.data
    if (x.status === 'success') {
        const { link, filename, filesize } = x.result
        let p = `*[ MEDIAFIRE DOWNLOADER ]*
*• File Name :* ${filename}
*• Size :* ${filesize}`
        conn.sendMessage(m.chat, {
            text: p,
            contextInfo: {
                externalAdReply: {  
                    title: "MEDIAFIRE DOWNLOADER",
                    body: 'MEDIAFIRE DOWNLOADER BY ALUXI - MD',
                    thumbnailUrl: 'https://telegra.ph/file/60d4d4c62a6f6ce43aa66.jpg',
                    sourceUrl: "-",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m})
        await conn.sendMessage(m.chat, {
            document: {
                url: link
            },
            mimetype: `application/octet-stream`,
            fileName: `${filename}`,
            caption: "*SUCCCES*\n\n" + p,
            contextInfo: {
                externalAdReply: {
                    title: `${filename}`,
                    body: 'MEDIAFIRE DOWNLOADER',
                    thumbnailUrl: 'https://telegra.ph/file/60d4d4c62a6f6ce43aa66.jpg',
                    sourceUrl: "-",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });
    } else {
        m.reply(`Error: ${x.message}`)
    }
}

handler.help = ["mediafire"].map((a) => a + " *[url]*");
handler.tags = ["downloader"];
handler.command = ["mediafire","mf"];

module.exports = handler;