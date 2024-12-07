const { toPTT } = require("../lib/converter.js");
const fs = require('fs').promises;
const os = require('os');
const path = require('path');

let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (m.quoted ? m.quoted : m.msg).mimetype || '';
    if (!/video|audio/.test(mime)) throw `reply video/audio you want to convert to voice note/vn with caption ${usedPrefix + command}`;
    
    let media = await q.download?.();
    if (!media) throw 'Can\'t download media';

    // Create a temporary file path
    let tempDir = '/home/container/tmp'; // Adjust this path if necessary
    let tempFilePath = path.join(tempDir, `${Date.now()}.mp4`);

    console.log(`Temporary directory: ${tempDir}`);
    console.log(`Temporary file path: ${tempFilePath}`);
    
    try {
        // Ensure the temporary directory exists
        await fs.mkdir(tempDir, { recursive: true });

        // Write the downloaded media to the temporary file
        await fs.writeFile(tempFilePath, media);
        console.log(`File written successfully to ${tempFilePath}`);

        // Convert the media to PTT
        let audio;
        try {
            audio = await toPTT(tempFilePath, 'mp4');
        } catch (conversionError) {
            console.error('Error during conversion:', conversionError);
            throw new Error(`Conversion failed: ${conversionError.message}`);
        }

        if (!audio || !audio.data) throw new Error('Can\'t convert media to audio');
        
        console.log(`Conversion successful: ${tempFilePath}`);
        
        // Send the converted audio file
        await conn.sendFile(m.chat, audio.data, 'audio.mp3', '', m, true, { mimetype: 'audio/mp4' });
    } catch (error) {
        console.error('Error during file processing:', error);
        throw `An error occurred during the file conversion process: ${error.message}`;
    } finally {
        // Clean up the temporary file
        try {
            await fs.unlink(tempFilePath);
        } catch (cleanupError) {
            console.error('Error cleaning up the temporary file:', cleanupError);
        }
    }
};

handler.help = ['tovn (reply)'];
handler.tags = ['audio'];
handler.limit = true;
handler.command = /^to(vn|(ptt)?)$/i;

module.exports = handler;