//© Nahida - BOT 2023-2024
// • Credits : wa.me/6289687537657 [ Fanzz ]
// • Owner: 6289687537657,62882021236704,628817057468

/*
• untuk siapa pun yang ketahuan menjual script ini tanpa sepengetahuan developer mohon untuk dilaporkan !
*/

//© Nahida - BOT 2023-2024
// • Credits : wa.me/6289687537657 [ Fanzz ]
// • Owner: 6289687537657,62882021236704,628817057468

/*
• untuk siapa pun yang ketahuan menjual script ini tanpa sepengetahuan developer mohon untuk dilaporkan !
*/

const yts = require("yt-search");
const ytdl = require("ytdl-core");
const fs = require("fs");
const path = require("path");
const https = require("https");
const {
    exec
} = require("child_process"); // Tambahkan ini

/**
 * Mencari video YouTube berdasarkan jumlah pencarian terbanyak dan mengunduh audionya
 * @param {string} searchTitle - Judul video yang akan dicari
 * @returns {Promise<{audioPath: string, thumbnailPath: string, title: string, url: string, author: string, audioSize: number}>} - Path ke file audio yang diunduh, thumbnail, judul, URL, nama pengupload, dan ukuran file audio
 */
export async function searchAndDownloadAudio(searchTitle) {
    const searchResults = await yts(searchTitle);
    const video = searchResults.all.sort((a, b) => b.views - a.views)[0];
    const videoUrl = video.url;
    const videoTitle = video.title;
    const videoAuthor = video.author.name;
    const thumbnailUrl = video.thumbnail;
    const outputDir = path.join(process.cwd(), 'tmp');
    ensureDirectoryExistence(outputDir);
    const mp3Path = path.join(outputDir, `audio_${Date.now()}.mp3`);
    const flacPath = path.join(outputDir, `audio_${Date.now()}.flac`);
    const thumbnailPath = path.join(outputDir, `thumbnail_${Date.now()}.jpg`);

    // Mengunduh audio dalam format MP3
    const audioInfo = await ytdl.getInfo(videoUrl);
    const audioFormat = ytdl.chooseFormat(audioInfo.formats, {
        quality: 'highestaudio',
        filter: 'audioonly'
    });

    if (!audioFormat) {
        throw new Error('Tidak ada format audio yang tersedia');
    }

    await new Promise((resolve, reject) => {
        ytdl(videoUrl, {
                format: audioFormat
            })
            .pipe(fs.createWriteStream(mp3Path))
            .on('finish', resolve)
            .on('error', reject);
    });

    // Mengonversi MP3 ke FLAC
    await new Promise((resolve, reject) => {
        exec(`ffmpeg -i ${mp3Path} ${flacPath}`, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });

    // Mengunduh thumbnail
    const thumbnailStream = fs.createWriteStream(thumbnailPath);
    thumbnailStream.on('error', (err) => {
        throw err;
    });
    await new Promise((resolve, reject) => {
        https.get(thumbnailUrl, (response) => {
            response.pipe(thumbnailStream)
                .on('finish', resolve)
                .on('error', reject);
        });
    });

    // Mendapatkan ukuran file audio FLAC
    const audioSize = fs.statSync(flacPath).size;

    // Menghapus file MP3 setelah konversi selesai
    fs.unlinkSync(mp3Path);

    return {
        audioPath: flacPath,
        thumbnailPath,
        title: videoTitle,
        url: videoUrl,
        author: videoAuthor,
        audioSize
    };
}

/**
 * Membuat direktori jika belum ada
 * @param {string} dir - Path ke direktori
 */
function ensureDirectoryExistence(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {
            recursive: true
        });
    }
}

let handler = async (m, {
    conn,
    text
}) => {
let ANJ = "```"
    const searchTitle = text.trim();

    if (!searchTitle) {
        return conn.reply(m.chat, 'Silakan masukkan judul video yang ingin dicari.', m);
    }

    try {
        const {
            audioPath,
            thumbnailPath,
            title,
            url,
            author,
            audioSize
        } = await searchAndDownloadAudio(searchTitle);
        await conn.sendMessage(m.chat, {
            image: {
                url: thumbnailPath
            },
            caption: `Berikut adalah thumbnail video.\n\n**Judul:** ${title}\n**URL:** ${url}\n**Pengupload:** ${author}`
        }, {
            quoted: m
        });

        await conn.sendMessage(m.chat, {
            audio: {
                url: audioPath
            },
            mimetype: 'audio/mp4',
            fileName: `audio_${Date.now()}.flac`,
            caption: `${ANJ}SUCCESS GET MUSIC DATA${ANJ}\n\n**Title:** ${title}\n**Url:** ${url}\n**Channel:** ${author}\n**Size:** ${(audioSize / (1024 * 1024)).toFixed(2)} MB`
        }, {
            quoted: m
        });

        // Menghapus file setelah terkirim
        await fs.promises.unlink(audioPath);
        await fs.promises.unlink(thumbnailPath);
    } catch (error) {
        conn.reply(m.chat, `Terjadi kesalahan saat mencari dan mengunduh media: ${error.message}`, m);
    }
};

handler.help = ['play4 <judul_video>'];
handler.command = ['play4'];
handler.tags = ['tools'];

module.exports = handler;