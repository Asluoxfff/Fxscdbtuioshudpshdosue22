const axios = require('axios'); // Make sure to include axios for making requests

let handler = async (m, { conn, args, text, delay, usedPrefix, command }) => {
    if (!text) return m.reply("Example: .play <URL>");
    await yete(m, text, conn, delay); // Pass m, conn, and delay to yete function
};
handler.help = ["play", "playmp3", "playyt"];
handler.tags = ["downloader"];
handler.command = ["play", "playmp3", "playyt"];
module.exports = handler;

async function yete(m, url, conn, delay) { // Change text to url for clarity
    try {
        m.reply('Please wait...');
        const result = await ytd(url); // Call the new ytd function
        if (!result) {
            return m.reply('Sorry, no results found.');
        }
        let res = `${result.title}
* *Duration:* ${result.durationLabel}
* *Quality:* ${result.quality}
* *Type:* ${result.type}
* *Thumbnail:* ${result.thumbnail}`;

        m.reply(res);
        await conn.sendMessage(m.chat, {
            video: result.link, // Assuming the link is for the video/audio file
            mimetype: result.type === 'audio' ? "audio/mp4" : "video/mp4", // Adjust based on type
        }, {
            quoted: m
        });
    } catch (e) {
        m.reply(`Error: ${e.message}`); // Display the error message to the user
    }
}

// Replace the existing ytd function with your provided ytd function
async function ytd(url, qualityIndex = 4, typeIndex = 2) {
    const SaveTube = {
        qualities: {
            audio: { 1: '32', 2: '64', 3: '128', 4: '192' },
            video: { 1: '144', 2: '240', 3: '360', 4: '480', 5: '720', 6: '1080', 7: '1440', 8: '2160' }
        },

        headers: {
            'accept': '*/*',
            'referer': 'https://ytshorts.savetube.me/',
            'origin': 'https://ytshorts.savetube.me/',
            'user-agent': 'Postify/1.0.0',
            'Content-Type': 'application/json'
        },

        cdn() {
            return Math.floor(Math.random() * 11) + 51;
        },

        checkQuality(type, qualityIndex) {
            if (!(qualityIndex in this.qualities[type])) {
                throw new Error(`❌ Kualitas ${type} tidak valid. Pilih salah satu: ${Object.keys(this.qualities[type]).join(', ')}`);
            }
        },

        async fetchData(url, cdn, body = {}) {
            const headers = {
                ...this.headers,
                'authority': `cdn${cdn}.savetube.su`
            };

            try {
                const response = await axios.post(url, body, { headers });
                return response.data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },

        dLink(cdnUrl, type, quality, videoKey) {
            return `https://${cdnUrl}/download`;
        }
    };

    const type = typeIndex === 1 ? 'audio' : 'video';
    const quality = SaveTube.qualities[type][qualityIndex];

    if (!type) throw new Error('❌ Tipe tidak valid. Pilih 1 untuk audio atau 2 untuk video.');
    SaveTube.checkQuality(type, qualityIndex);

    const cdnNumber = SaveTube.cdn();
    const cdnUrl = `cdn${cdnNumber}.savetube.su`;

    const videoInfo = await SaveTube.fetchData(`https://${cdnUrl}/info`, cdnNumber, { url });
    const badi = {
        downloadType: type,
        quality: quality,
        key: videoInfo.data.key
    };

    const dlRes = await SaveTube.fetchData(SaveTube.dLink(cdnUrl, type, quality, videoInfo.data.key), cdnNumber, badi);

    return {
        link: dlRes.data.downloadUrl,
        duration: videoInfo.data.duration,
        durationLabel: videoInfo.data.durationLabel,
        fromCache: videoInfo.data.fromCache,
        id: videoInfo.data.id,
        key: videoInfo.data.key,
        thumbnail: videoInfo.data.thumbnail,
        title: videoInfo.data.title,
        quality,
        type
    };
}