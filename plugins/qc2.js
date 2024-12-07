const axios = require("axios");
const { Sticker } = require("wa-sticker-formatter");
let { sticker5 } = require('../lib/sticker.js');
const { sticker } = require("../lib/sticker.js");
const uploadImage = require("../lib/uploadImage.js");
let handler = async (m, { conn, text, usedPrefix, command, isOwner }) => {
let qc = `
「 Example: .qc pink hallo 」

╭───────「 Color List︎ 」︎──────⬣ 
┣─⬣ 「 pink 」
┣─⬣ 「 blue 」
┣─⬣ 「 red 」
┣─⬣ 「 green 」
┣─⬣ 「 yellow 」
┣─⬣ 「 purple 」
┣─⬣ 「 darkblue 」
┣─⬣ 「 lightblue 」
┣─⬣ 「 ash 」
┣─⬣ 「 orange 」
┣─⬣ 「 black 」
┣─⬣ 「 white 」
┣─⬣ 「 teal 」
┣─⬣ 「 lightpink 」
┣─⬣ 「 chocolate 」
┣─⬣ 「 salmon 」
┣─⬣ 「 magenta 」
┣─⬣ 「 tan 」
┣─⬣ 「 wheat 」
┣─⬣ 「 deeppink 」
┣─⬣ 「 fire 」
┣─⬣ 「 skyblue 」
┣─⬣ 「 safron 」
┣─⬣ 「 brightskyblue 」
┣─⬣ 「 hotpink 」
┣─⬣ 「 lightskyblue 」
┣─⬣ 「 seagreen 」
┣─⬣ 「 darkred 」
┣─⬣ 「 orangered 」
┣─⬣ 「 cyan 」
┣─⬣ 「 violet 」
┣─⬣ 「 mossgreen 」
┣─⬣ 「 darkgreen 」
┣─⬣ 「 navyblue 」
┣─⬣ 「 darkorange 」
┣─⬣ 「 darkpurple 」
┣─⬣ 「 fuchsia 」
┣─⬣ 「 darkmagenta 」
┣─⬣ 「 darkgray 」
┣─⬣ 「 peachpuff 」
┣─⬣ 「 blackishgreen 」
┣─⬣ 「 darkishred 」
┣─⬣ 「 goldenrod 」
┣─⬣ 「 darkishgray 」
┣─⬣ 「 darkishpurple 」
┣─⬣ 「 gold 」
┣─⬣ 「 silver 」
╰───────「 Select Color 」︎︎──────⬣ 
`
    if (!text) return m.reply(qc)
if (text.length > 100) return m.reply(`Max 100 character.`)
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0]: m.fromMe ? conn.user.jid: m.sender
let name = `${conn.getName(who)}`
let [color, ...message] = text.split(' ');
message = message.join(' ');
let backgroundColor;
switch(color) {
case 'pink':
backgroundColor = '#f68ac9';
break;
case 'blue': case 'biru':
backgroundColor = '#6cace4';
break;
case 'red': case 'merah':
backgroundColor = '#f44336';
break;
case 'green': case 'hijau':
backgroundColor = '#4caf50';
break;
case 'yellow': case 'kuning':
backgroundColor = '#ffeb3b';
break;
case 'purple': case 'ungu':
backgroundColor = '#9c27b0';
break;
case 'darkblue': case 'birutua':
backgroundColor = '#0d47a1';
break;
case 'lightblue': case 'birumuda':
backgroundColor = '#03a9f4'; 
break;
case 'ash': case 'abu':
backgroundColor = '#9e9e9e';
break;
case 'orange': case 'oren':
backgroundColor = '#ff9800';
break;
case 'black': case 'hitam':
backgroundColor = '#000000';
break;
case 'white': case 'putih':
backgroundColor = '#ffffff';
break;
case 'teal': case 'birukehijauan':
backgroundColor = '#008080';
break;
case 'lightpink': case 'merahmuda':
backgroundColor = '#FFC0CB';
break;
case 'chocolate': case 'coklat':
backgroundColor = '#A52A2A';
case 'salmon':
backgroundColor = '#FFA07A'; 
break; 
case 'magenta': case 'merahjambu':
backgroundColor = '#FF00FF'; 
break; 
case 'tan': case 'kecokelatan':
backgroundColor = '#D2B48C'; 
break;
case 'wheat': case 'gandum':
backgroundColor = '#F5DEB3'; 
break;
case 'deeppink':
backgroundColor = '#FF1493'; 
break; 
case 'fire': case 'api':
backgroundColor = '#B22222';
break;
case 'skyblue': case 'birulangit':
backgroundColor = '#00BFFF';
break; 
case 'orange': case 'oren':
backgroundColor = '#FF7F50';
break;
case 'brightskyblue': case 'birulangitcerah':
backgroundColor = '#1E90FF'; 
break; 
case 'hotpink':
backgroundColor = '#FF69B4'; 
break; 
case 'lightskyblue':
backgroundColor = '#87CEEB'; 
break; 
case 'seagreen':
backgroundColor = '#20B2AA'; 
break; 
case 'darkred':
backgroundColor = '#8B0000'; 
break; 
case 'orangered':
backgroundColor = '#FF4500'; 
break; 
case 'cyan':
backgroundColor = '#48D1CC'; 
break; 
case 'violet':
backgroundColor = '#BA55D3'; 
break; 
case 'mossgreen':
backgroundColor = '#00FF7F'; 
break; 
case 'darkgreen':
backgroundColor = '#008000'; 
break; 
case 'navyblue':
backgroundColor = '#191970'; 
break; 
case 'darkorange':
backgroundColor = '#FF8C00'; 
break; 
case 'darkpurple':
backgroundColor = '#9400D3'; 
break; 
case 'fuchsia':
backgroundColor = '#FF00FF'; 
break; 
case 'darkmagenta':
backgroundColor = '#8B008B'; 
break;
case 'darkgray':
backgroundColor = '#2F4F4F'; 
break;
case 'peachpuff':
backgroundColor = '#FFDAB9'; 
break;
case 'darkishgreen':
backgroundColor = '#BDB76B'; 
break;
case 'darkishred':
backgroundColor = '#DC143C'; 
break;
case 'goldenrod':
backgroundColor = '#DAA520'; 
break;
case 'darkishgray':
backgroundColor = '#696969'; 
break;
case 'darkishpurple':
backgroundColor = '#483D8B'; 
break;
case 'gold':
backgroundColor = '#FFD700'; 
break;
case 'silver':
backgroundColor = '#C0C0C0'; 
break;
default:
backgroundColor = '#ffffff';
break;
}
let obj = {
type: 'quote',
format: 'png',
backgroundColor,
width: 512,
height: 768,
scale: 2,
messages: [
{
entities: [],
avatar: true,
from: {
id: 1,
name: name,
photo: { 
url: await conn.profilePictureUrl(m.sender, "image").catch(() => 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'),
}
},
text: message,
replyMessage: {},
},
],
};
const json = await axios.post('https://bot.lyo.su/quote/generate', obj, {
      headers: {
         'Content-Type': 'application/json'
      }
   })
   const buffer = Buffer.from(json.data.result.image, 'base64')
   let stiker = await sticker5(buffer, false, global.packname, global.author)
    if (stiker) return conn.sendFile(m.chat, stiker, 'Quotly.webp', '', m)
}
handler.help = ['qc']
handler.tags = ['sticker']
handler.command = /^(fc2|fakechat2|qc2)$/i
handler.limit = true
handler.onlyprem = false
module.exports = handler

async function fakechat(text, name, url) {
    let body = {
        "type": "quote",
        "format": "webp",
        "backgroundColor": "#FFFFFF",
        "width": 512,
        "height": 512,
        "scale": 2,
        "messages": [{
        "avatar": true,
        "from": {
            "first_name": name,
            "language_code": "en",
            "name": name,
            "photo": {
            "url": url
            }
        },
        "text": text,
        "replyMessage": {}
        }]
    }
    let res = await axios.post('https://bot.lyo.su/quote/generate', body);
    return Buffer.from(res.data.result.image, "base64");
}

async function fakechatImg(url, text, name, avatar) {
    
}