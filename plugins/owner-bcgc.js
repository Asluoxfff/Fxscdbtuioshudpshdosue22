/*
SCRIPT AKIRAA BOT BY BANG SYAII 
* ig: Akira_art12
*WhatsApp: wa.me/6283842839555
*,Jangan Perjual belikan script ini jika ada yang menjual tanpa izin mohon laporkan ke saya dan jangan harap ada update Script ini kedepannya !!!
*/

let uploadImage = require('../lib/uploadImage.js');
const fs = require("fs");
let handler = async (m, { conn, text, participants, usedPrefix , command}) => {
  let groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map(v => v[0]);
  conn.reply(m.chat, `_Mengirim pesan broadcast ke ${groups.length} grup_`, m);
  for (let id of groups) {
    let participantIds = participants.map(a => a.id);
    await conn.sendMessage(id, {
document: fs.readFileSync('./package.json'),
fileName: `ALUXI - MD`,
mimetype: "image/png",
fileLength: 999999999999999,
jpegThumbnail: fs.readFileSync('./media/alxo.png'),
description: 'hello',
caption: "[ `BROADCAST CHAT` ]\n\n" + text,
contextInfo: {
isForwarded: true,
mentionedJid: [m?.sender], 
forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363199957492480@newsletter',
                            newsletterName: `ALVIAN UXIO Inc.`,
                            serverMessageId: -1
                        },
                        businessMessageForwardInfo: {
                            businessOwnerJid: conn.decodeJid(conn.user.id)
                        },
externalAdReply: { 
title: `© ALUXI - MD [ ${version} ]`, 
body: `• Uptime: ${Func.toDate(process.uptime() * 1000)}`,
thumbnailUrl: global.thumb,
sourceUrl: `-`,
mediaType: 1,
renderLargerThumbnail: true }}},
{quoted:fkontak}).catch(_ => _);
  }
  m.reply(`Selesai Broadcast ${groups.length} Group`);
}

handler.help = ['bcgc'].map(v => v + ' <teks>');
handler.tags = ['owner'];
handler.command = /^(bcgc)$/i;
handler.owner = true;
module.exports = handler;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

const randomID = length => require('crypto').randomBytes(Math.ceil(length * .5)).toString('hex').slice(0, length);