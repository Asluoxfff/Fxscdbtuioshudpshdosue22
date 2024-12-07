const moment = require("moment-timezone");
const PhoneNumber = require("awesome-phonenumber");
const fs = require("fs");
const fetch = require("node-fetch");
const os = require("os");
const freeMemory = os.freemem();
const totalMemory = os.totalmem();
const usedMemory = totalMemory - freeMemory;
const {
  generateWAMessageFromContent,
  proto,
  prepareWAMessageMedia,
} = require("@whiskeysockets/baileys");
let syaii = `ALUXI ONLINE`
let handler = async (m, { conn, text, usedPrefix, command }) => {
conn.sendMessage(m.chat, {
document: fs.readFileSync('./package.json'),
fileName: `ALUXI - MD`,
mimetype: "image/png",
fileLength: 999999999999999,
jpegThumbnail: fs.readFileSync('./media/alxo.png'),
description: 'hello',
caption: syaii,
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
body: `ONLINE • UPTIME: ${Func.toDate(process.uptime() * 1000)}`,
thumbnailUrl: global.thumb,
sourceUrl: `-`,
mediaType: 1,
renderLargerThumbnail: true }}},
{quoted:fkontak})
}
handler.help = ["bot"]
handler.tags = ["main"]
handler.command = ["bot", "tes"]
module.exports = handler