let fetch = require("node-fetch");
let handler = async (m, { conn, usedPrefix, command, text, isOwner }) => {
 if (!text) throw `Use ${usedPrefix + command} aluxi`
    conn.reply(m.chat, wait, fkontak)
	conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
try {
let prompt = 'namamu adalah aluxi, kamu baik dan ramah'
let res = await elxyz(text, m.sender, prompt) 
conn.reply(m.chat, `${res.data.answer}`, fkontak) 
} catch (e) {
  console.log(e) 
  m.reply('failed') 
 }
}

 // please follow the channel https://whatsapp.com/channel/0029VaddOXtAInPl84jp7Q1p for the next feature

handler.help = ['elxyzai']
handler.tags = ['ai']
handler.command = /^(elxyzai|elxyz)$/i
module.exports = handler

// SCRAPER BY IZUMII [! a.k.a Irull2nd ]

async function elxyz(text, sesi, logic) {
    try {
    let response = await fetch('https://elxyz.me/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Mobile/15E148',
        },
        body: JSON.stringify({
        prompt: text,
        sessionId: sesi,
        character: logic
        }),
    });
    let data = await response.json();
    return data;
        } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}