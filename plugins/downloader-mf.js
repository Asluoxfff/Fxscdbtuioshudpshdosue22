const fetch = require('node-fetch');
let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) return m.reply(`*• Example :* ${usedPrefix}${command} *[mediafire url]*`);
    m.reply("Loading...");

    try {
        let res = await fetch(`https://widipe.com/mediafire?link=${text}`);
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        let x = await res.json();

        let result = x.result;
        let cpt = `*[ MEDIAFIRE DOWNLOADER ]*

*• File Name :* ${result.filename}
*• Type :* ${result.filetype}
*• Extension :* ${result.ext}
*• Size :* ${result.filesizeH}
*• Upload :* ${result.upload_date}`;
m.reply(cpt)

        let ext = result.filetype
        let filename = result.filename;
        let url = result.url;

        await conn.sendFile(m.chat, url, filename, cpt, m, false, {
            mimetype: `application/${ext}`,
            fileName: filename,
            contextInfo: {
                externalAdReply: {
                    title: filename,
                    thumbnailUrl: 'https://telegra.ph/file/5dc6090854dd0e52d3e9e.jpg',
                    sourceUrl: text,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });
    } catch (e) {
        m.reply(`Error: ${e.message}`);
    }
};

handler.help = ["mediafire"].map((a) => a + " *[url]*");
handler.tags = ["downloader"];
handler.command = ["mediafire", "mf"];

module.exports = handler;