let { family100 } = require ('@bochilteam/scraper')
const winScore = 4999
async function handler(m) {
    this.family100 = this.family100 ? this.family100 : {}
    let id = 'family100_' + m.chat
    if (id in this.family100) {
        this.reply(m.chat, 'Masih ada kuis yang belum terjawab di chat ini', this.family100[id].msg)
        throw false
    }
    const json = await family100()
const fkontak = {
    "key": {
      "participants": "0@s.whatsapp.net",
      "remoteJid": "status@broadcast",
      "fromMe": false,
      "id": "Halo"
    },
    "message": {
      "contactMessage": {
        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    },
    "participant": "0@s.whatsapp.net"
  };

    let caption = `
*Soal:* ${json.soal}
Terdapat *${json.jawaban.length}* jawaban${json.jawaban.find(v => v.includes(' ')) ? `
(beberapa jawaban terdapat spasi)
`: ''}
+${winScore} XP tiap jawaban benar
    `.trim()
    this.family100[id] = {
        id,
        msg: await this.reply(m.chat, caption, fkontak),
        ...json,
        terjawab: Array.from(json.jawaban, () => false),
        winScore,
    }
}
handler.help = ['family100']
handler.tags = ['game']
handler.command = /^family100$/i
handler.group = true

module.exports = handler