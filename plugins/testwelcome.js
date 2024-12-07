const canvafy = require('canvafy');
const fs = require("fs");
let handler = async (m, { conn, args, groupMetadata, usedPrefix, command }) => {

let SPJ = await (await conn.groupMetadata(m.chat)).subject
let member = groupMetadata.participants.length;
const well = await new canvafy.WelcomeLeave()
  . setAvatar(global.thumb)
  .setBackground("image", "https://files.catbox.moe/0q7zy8.jpg")
  .setTitle(`JOINED GROUP:`)
  .setDescription(`${SPJ}`) 
  .setBorder("#fff")
  .setAvatarBorder("#fff")
  .setOverlayOpacity(0.5)
  .build();            

conn.sendMessage(
                m.chat,
                {
                  image: well,
                  fileName: wm,
                  mimetype: "image/jpeg",
                  fileLength: 9999999,
                  pageCount: fpagedoc,
                  caption: `Welcome @${m.sender.split(`@`)[0]} \nin group ${SPJ}`,
                  contextInfo: {
                    mentionedJid: [m.sender],
                    externalAdReply: {
                      title: `${m.sender.split(`@`)[0]} Joined`,
                      body: `Total member : ${member}`,
                      thumbnailUrl: global.thumb,
                      sourceUrl: null,
                      mediaType: 1,
                      renderLargerThumbnail: true,
                    },
                  },
                },
                { quoted: null },
              );
}
handler.command = handler.help = ["testwelcome"]
module.exports = handler