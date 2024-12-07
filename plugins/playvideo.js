const { Youtube } = require('@neoxr/youtube-scraper');
const yt = new Youtube({
    fileAsUrl: false
});

let handler = async (m, { conn, args, text, delay, usedPrefix, command }) => {
    if (!text) return m.reply("Example: .playvid someone");
    await yete(m, text, conn, delay); // Pass m, conn, and delay to yete function
};
handler.help = ["playvid", "playvideo"];
handler.tags = ["downloader"];
handler.command = ["playvid", "playvideo"];
module.exports = handler;

async function yete(m, text, conn, delay) { // Add m, conn, and delay as parameters
    try {
        m.reply('Please wait...');
        let result = await yt.play(text);
        if (!result || !result.status) {
            return m.reply('Sorry, no results found.');
        }
        let res = `${result.title}
* *Channel :* ${result.channel}
* *Duration :* ${result.duration}
* *Extension :* mp4
* *File Size :* ${result.data.size}
* *Published :* ${result.publish}
* *Quality :* ${result.data.quality}
* *Views :* ${result.views}`;

  m.reply(res);
        await conn.sendMessage(m.chat, {
            video: result.data.url,
            mimetype: "video/mp4",
        }, {
            quoted: m
        });
    } catch (e) {
        throw e.message;
    }
}