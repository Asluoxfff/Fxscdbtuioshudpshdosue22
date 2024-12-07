const { generateWAMessageFromContent } = require("@whiskeysockets/baileys");
var handler = async (m, { conn, usedPrefix: _p }) => {
    let info = `Om swastiastu sebagai bentuk salam pembuka yang biasa diberikan oleh seseorang kepada orang lain ketika bertemu sebagai bentuk penghormatan kepada umat yang memiliki keyakinan sama ataupun umat beda agama`

    if (m.text.match(/Om Swastyastu/i)) {
        info = `Om swastiastu sebagai bentuk salam pembuka yang biasa diberikan oleh seseorang kepada orang lain ketika bertemu sebagai bentuk penghormatan kepada umat yang memiliki keyakinan sama ataupun umat beda agama`;
    }
    
    let tys = `📚 Om Swastyastu bagi umat yang percaya 🙏`;

    await conn.sendMessage(m.chat, {
        react: {
            text: '🙏',
            key: m.key,
        }
    });
    await conn.reply(m.chat, tys, m);
    
let prep = generateWAMessageFromContent(m.chat, { liveLocationMessage: { 
degreesLatitude: 34.672314, degreesLongitude: 135.484802,
caption: info,
sequenceNumber: 1656662972682001, timeOffset: 8600, jpegThumbnail: null
}}, { quoted: m

					})
return conn.relayMessage(m.chat, prep.message, { messageId: prep.key.id })
}

// handler.customPrefix = /^(assalam(ualaikum)?|(salamualaiku|(sa(lamu|m)liku|sala))m)$/i;

handler.customPrefix = /^(Om Swastiastu|Om Swastyastu|Swastyastu)$/i;


handler.command = new RegExp;

module.exports = handler;