/*
SCRIPT AKIRAA BOT BY BANG SYAII 
* ig: Akira_art12
*WhatsApp: wa.me/6283842839555
*,Jangan Perjual belikan script ini jika ada yang menjual tanpa izin mohon laporkan ke saya dan jangan harap ada update Script ini kedepannya !!!
*/

let { sticker5 } = require('../lib/sticker.js');
let axios = require('axios');
let uploadFile = require("../lib/uploadFile.js");

let handler = async (m, { conn, text }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  let reply;

  if (text && m.quoted) {
    if (m.quoted.sender) {
      reply = {
        "name": await conn.getName(m.quoted.sender),
        "text": m.quoted.text || '',
        "chatId": m.chat.split('@')[0],
      };
    }
  } else if (text && !m.quoted) {
    reply = {};
  } else if (!text && m.quoted) {
    if (m.quoted.text) {
      text = m.quoted.text || '';
    }
    reply = {};
  } else {
    throw "Masukkan teks atau balas teks yang ingin dijadikan quote!";
  }

  let img = await q.download?.();

  let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/320b066dc81928b782c7b.png');
if (mime) {
  const obj = {
    type: "quote",
    format: "png",
    backgroundColor: "#FFFFFF",
    width: 512,
    height: 768,
    scale: 2,
    "messages": [{
      "entities": [],
      "media": {
        "url": await uploadFile(img)
      },
      avatar: true,
      from: {
        id: 1,
        name: await conn.getName(m.sender),
        photo: {
          url: pp
        }
      },
      text: text || '',
      replyMessage: reply
    }]
  };
  const json = await axios.post('https://bot.lyo.su/quote/generate', obj, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const buffer = Buffer.from(json.data.result.image, 'base64');
  let sticker = await sticker5(buffer, false, global.packname, global.author);

  if (sticker) return conn.sendFile(m.chat, sticker, 'Quotly.webp', '', m);
 } else {
 const obj = {
    type: "quote",
    format: "png",
    backgroundColor: "#FFFFFF",
    width: 512,
    height: 768,
    scale: 2,
    "messages": [{
      "entities": [],
      avatar: true,
      from: {
        id: 1,
        name: await conn.getName(m.sender),
        photo: {
          url: pp
        }
      },
      text: text || '',
      replyMessage: reply
    }]
  };
 
  const json = await axios.post('https://bot.lyo.su/quote/generate', obj, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const buffer = Buffer.from(json.data.result.image, 'base64');
  let sticker = await sticker5(buffer, false, global.packname, global.author);

  if (sticker) return conn.sendFile(m.chat, sticker, 'Quotly.webp', '', m);
  }
};

handler.help = ['qc'];
handler.tags = ['sticker'];
handler.command = /^(qc|quotely)$/i;

module.exports = handler;