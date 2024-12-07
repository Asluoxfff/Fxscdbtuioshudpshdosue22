let fetch = require('node-fetch')
let uploadFile = require('../lib/uploadFile.js')

let handler = async (m, { conn, usedPrefix, command, text }) => {  
  conn.remini = conn.remini ? conn.remini : {}
  if (m.chat in conn.remini) throw 'there is still a process that has not been completed, please wait until it is finished'
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || q.mediaType || ''
  if (!mime) throw `send/reply image with caption ${usedPrefix + command}`
  if (!/image\/(jpe?g|png)/.test(mime)) throw `mime ${mime} not support`
  else conn.remini[m.chat] = true
  conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
  let media = await q.download()
  let url = await uploadFile(media)
  let timer = setTimeout(() => {
    if (conn.remini[m.chat]) {
      delete conn.remini[m.chat];
      m.reply(`sorry, the process took too long.
please try again.`);
    }
  }, 60000); 
try {
  let res = `https://skizo.tech/api/remini?url=${url}&apikey=` // fill your apikey, chat admin APIs to make your apikey if you don't have
  conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
  conn.sendFile(m.chat, res, 'remini.jpg', done, m)
} catch (e) {
    console.log(e);
    m.reply(e);
 } finally {
    clearTimeout(timer);
    delete conn.remini[m.chat];
  }
};

// please follow the channel https://whatsapp.com/channel/0029VaddOXtAInPl84jp7Q1p for the next feature

handler.help = ['remini']
handler.tags = ['ai']
handler.command = /^(remini)$/i
module.exports = handler