const fetch = require('node-fetch');

let handler = async (m, { conn, usedPrefix, command }) => {
    try {
        let res = await fetch(`https://itzpire.com/random/lahelu`);
        let json = await res.json();

        if (json.status === "success") {
            let randomIndex = Math.floor(Math.random() * json.data.length);
            let meme = json.data[randomIndex];
            
            // Prepare the message
            let message = `*[ RANDOM MEME ]*\n\n`;
            message += `*• Title :* ${meme.title}\n`;
            message += `*• User :* ${meme.userUsername}\n`;
            message += `*• Hashtag :* ${meme.hashtags.join(", ")}\n`;
            message += `*• Source :* lahelu.com`;

            if (meme.mediaType === 0) { 
                await conn.sendMedia(m.chat, meme.media, 'meme.jpg', message, m);  
            } else if (meme.mediaType === 1) { 
                await conn.sendMedia(m.chat, meme.media, 'meme.mp4', message, m); 
            }
        } else {
            m.reply('Failed.');
        }
    } catch (error) {
        console.error(error);
        m.reply('An error occurred while fetching the response.');
    }
};

handler.help = ["meme"].map((a) => a + " *[random meme]*");
handler.tags = ["internet"];
handler.command = ["meme"];

module.exports = handler;