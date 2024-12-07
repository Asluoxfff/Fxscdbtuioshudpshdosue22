const { generateWAMessageFromContent } = require("@whiskeysockets/baileys");
var handler = async (m, { conn, usedPrefix: _p }) => {
    let info = `salam tersebut mungkin dapat berbeda-beda tergantung pada budaya dan tradisi lokal di mana agama Khonghucu dianut. Namun, secara umum, salam dalam kepercayaan Khonghucu sering kali mencerminkan nilai-nilai kesopanan, hormat, dan harmoni.`

    if (m.text.match(/Wei De Dong Tian/i)) {
        info = `salam tersebut mungkin dapat berbeda-beda tergantung pada budaya dan tradisi lokal di mana agama Khonghucu dianut. Namun, secara umum, salam dalam kepercayaan Khonghucu sering kali mencerminkan nilai-nilai kesopanan, hormat, dan harmoni.`;
    }
    
    let khong = `📚 Wei De Dong Tian bagi umat yang percaya 🙏`;

    await conn.sendMessage(m.chat, {
        react: {
            text: '🙏',
            key: m.key,
        }
    });
    await conn.reply(m.chat, khong, m);
    
let prep = generateWAMessageFromContent(m.chat, { liveLocationMessage: { 
degreesLatitude: 34.672314, degreesLongitude: 135.484802,
caption: info,
sequenceNumber: 1656662972682001, timeOffset: 8600, jpegThumbnail: null
}}, { quoted: m

					})
return conn.relayMessage(m.chat, prep.message, { messageId: prep.key.id })
}

// handler.customPrefix = /^(assalam(ualaikum)?|(salamualaiku|(sa(lamu|m)liku|sala))m)$/i;

handler.customPrefix = /^(Wei De Dong Tian)$/i;


handler.command = new RegExp;

module.exports = handler;