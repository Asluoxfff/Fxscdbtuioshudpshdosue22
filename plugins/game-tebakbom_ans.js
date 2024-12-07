let fs = require ('fs')
let handler = m => m
handler.before = async function (m) {
   let id = m.chat
   let reward = 4999
   let body = typeof m.text == 'string' ? m.text : false

this.bomb = this.bomb ? this.bomb : {}
   if (!(id in this.bomb) && m.quoted && /kotak/i.test(m.quoted.text)) return this.reply(m.chat, `Sesi telah berakhir, silahkan kirim .tebakbom untuk membuat sesi baru.`, m)
   if ((id in this.bomb) && !isNaN(body)) {
      let timeout = 180000
      let json = this.bomb[id][1].find(v => v.position == body)
      if (!json) return this.reply(m.chat, `Untuk membuka kotak kirim angka 1 - 9`, m)
      if (json.emot == '💥') {
         json.state = true
         let bomb = this.bomb[id][1]
         let teks = `° *T E B A K  B O M B*\n\n`
         teks += `*BOM MELEDAK!!*\n\n`
         teks += bomb.slice(0, 3).map(v => v.state ? v.emot : v.number).join('') + '\n'
         teks += bomb.slice(3, 6).map(v => v.state ? v.emot : v.number).join('') + '\n'
         teks += bomb.slice(6).map(v => v.state ? v.emot : v.number).join('') + '\n\n'
         teks += `Timeout : [ *${((timeout / 1000) / 60)} menit* ]\n`
         teks += `*Permainan selesai!*, kotak berisi bom terbuka.`
         await conn.sendMessage(m.chat, {
text: teks,
contextInfo: {
externalAdReply: {  
title: "| G A M E  O V E R",
body: 'Kamu Kalah...',
thumbnailUrl: "https://telegra.ph/file/f633b87e8e69b2e70857d.png",
sourceUrl: null,
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m })
            clearTimeout(this.bomb[id][2])
            delete this.bomb[id]
         
      } else if (json.state) {
         return this.reply(m.chat, `Kotak ${json.number} sudah di buka silahkan pilih kotak yang lain.`, m)
      } else {
         json.state = true
         let changes = this.bomb[id][1]
         let open = changes.filter(v => v.state && v.emot != '💥').length
         if (open >= 8) {
            let teks = `°  *T E B A K  B O M B*\n\n`
            teks += `Kirim angka *1* - *9* untuk membuka *9* kotak nomor di bawah ini :\n\n`
            teks += changes.slice(0, 3).map(v => v.state ? v.emot : v.number).join('') + '\n'
            teks += changes.slice(3, 6).map(v => v.state ? v.emot : v.number).join('') + '\n'
            teks += changes.slice(6).map(v => v.state ? v.emot : v.number).join('') + '\n\n'
            teks += `Timeout : [ *${((timeout / 1000) / 60)} menit* ]\n`
            teks += `*Permainan selesai!* kotak berisi bom tidak terbuka✅ : (+ *${reward}* Exp )`
            await conn.sendMessage(m.chat, {
text: teks,
contextInfo: {
externalAdReply: {  
title: "| C O N G R U L A T I O N S",
body: 'Kamu Menang!!',
thumbnailUrl: "https://telegra.ph/file/ef0501eb8ba5871d3c3ce.jpg",
sourceUrl: null,
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m })
               global.db.users[m.sender].exp += reward
               clearTimeout(this.bomb[id][2])
               delete this.bomb[id]
         } else {
            let teks = `°  *T E B A K  B O M B*\n\n`
            teks += `Kirim angka *1* - *9* untuk membuka *9* kotak nomor di bawah ini :\n\n`
            teks += changes.slice(0, 3).map(v => v.state ? v.emot : v.number).join('') + '\n'
            teks += changes.slice(3, 6).map(v => v.state ? v.emot : v.number).join('') + '\n'
            teks += changes.slice(6).map(v => v.state ? v.emot : v.number).join('') + '\n\n'
            teks += `Timeout : [ *${((timeout / 1000) / 60)} menit* ]\n`
            teks += `Kotak berisi bom tidak terbuka.`
            let { key } = await this.sendMessage(m.chat, {text: teks})
await this.sendMessage(m.chat, {text: teks, edit: key}).then(() => {
               global.db.data.users[m.sender].exp += reward
            })
         }
      }
   }
}

module.exports = handler;

async function randomInt(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1)) + min
}