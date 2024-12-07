const { generateWAMessageFromContent } = require("@whiskeysockets/baileys");
var handler = async (m, { conn, usedPrefix: _p }) => {
    let info = `Hal ini ditegaskan oleh Tuhan Yesus sendiri, Damai sejahtera kutinggalkan bagimu. Damai sejahtera-Ku Kuberikan kepadamu, dan apa yang Kuberikan tidak seperti apa yang diberikan oleh dunia kepadamu`

    if (m.text.match(/shalom/i)) {
        info = `Hal ini ditegaskan oleh Tuhan Yesus sendiri, Damai sejahtera kutinggalkan bagimu. Damai sejahtera-Ku Kuberikan kepadamu, dan apa yang Kuberikan tidak seperti apa yang diberikan oleh dunia kepadamu`;
    }
    
    let shalom = `📚 Shalom bagi umat yang percaya 🙏`;

    await conn.sendMessage(m.chat, {
        react: {
            text: '🙏',
            key: m.key,
        }
    });
    await conn.reply(m.chat, shalom, m);
    
let prep = generateWAMessageFromContent(m.chat, { liveLocationMessage: { 
degreesLatitude: 34.672314, degreesLongitude: 135.484802,
caption: info,
sequenceNumber: 1656662972682001, timeOffset: 8600, jpegThumbnail: null
}}, { quoted: m

					})
return conn.relayMessage(m.chat, prep.message, { messageId: prep.key.id })
}

// handler.customPrefix = /^(assalam(ualaikum)?|(salamualaiku|(sa(lamu|m)liku|sala))m)$/i;

handler.customPrefix = /^(shalom|syalom)$/i;


handler.command = new RegExp;

module.exports = handler;