const { generateWAMessageFromContent } = require("@whiskeysockets/baileys");
var handler = async (m, { conn, usedPrefix: _p }) => {
    let info = `Daripada seribu kata yang tak berarti,
lebih baik sepatah kata yang penuh arti,
yang dapat membuat si pendengar
menjadi penuh damai`

    if (m.text.match(/Sotthi jitu/i)) {
        info = `Daripada seribu kata yang tak berarti,
lebih baik sepatah kata yang penuh arti,
yang dapat membuat si pendengar
menjadi penuh damai`;
    }
    
    let buddhis = `📚 Sotthi bhavatu bagi umat yang percaya 🙏`;

    await conn.sendMessage(m.chat, {
        react: {
            text: '🙏',
            key: m.key,
        }
    });
    await conn.reply(m.chat, buddhis, m);
    
let prep = generateWAMessageFromContent(m.chat, { liveLocationMessage: { 
degreesLatitude: 34.672314, degreesLongitude: 135.484802,
caption: info,
sequenceNumber: 1656662972682001, timeOffset: 8600, jpegThumbnail: null
}}, { quoted: m

					})
return conn.relayMessage(m.chat, prep.message, { messageId: prep.key.id })
}

// handler.customPrefix = /^(assalam(ualaikum)?|(salamualaiku|(sa(lamu|m)liku|sala))m)$/i;

handler.customPrefix = /^(Sotthi jitu|Sotthi)$/i;


handler.command = new RegExp;

module.exports = handler;