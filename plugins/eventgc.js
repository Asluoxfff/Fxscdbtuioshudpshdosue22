const { randomBytes } = require("crypto");

const handler = async (m, { text, usedPrefix, command }) => {
const { generateWAMessageFromContent, proto } = require("@whiskeysockets/baileys");
  if (!text) {
    throw `*• Example:* ${usedPrefix + command} *judul|deskripsi|lokasi|link*`;
  }
  try {
    const sendEvent = async (m, { text }) => {
      let [evtName, evtDesc, evtLocation, evtLink, evtDate] = text.split('|');
      const jumlahHari = 360;
      const now = new Date().getTime();
      const msg = generateWAMessageFromContent(m.chat, {
        messageContextInfo: {
          messageSecret: randomBytes(32),
        },
        eventMessage: {
          isCanceled: false,
          name: evtName || 'Test event',
          description: evtDesc || m.name,
          location: {
            degreesLatitude: 0,
            degreesLongitude: 0,
            name: evtLocation || 'PLANET ALUXI',
          },
          joinLink: evtLink || 'https://about.alvianuxio.my.id',
          startTime: {
            low: m.messageTimestamp.low + 86400 * evtDate,
            high: 0,
            unsigned: true,
          },
        },
      }, {});

      return conn.relayMessage(m.chat, msg.message, {
        messageId: msg.key.id,
      });
    };

    const eventMessage = await sendEvent(m, { text });
    return eventMessage;
  } catch (e) {
    throw 'Maaf, aku tidak mengerti';
  }
};

handler.help = ["eventgc"].map((a) => a + " *[question]*");
handler.tags = ["group"];
handler.command = ["eventgc", "event"];
handler.group = true;

module.exports = handler;

/*
*Note* :
- I'll Update this soo keep ur eyes on my channel, dont forget to follow it 🙂‍↕
- https://kyoukahashiba.xyz/
- Thanks For NaylaHnf X Azfir X KyoukaHashiba
- Please Don't Delete WM
*/