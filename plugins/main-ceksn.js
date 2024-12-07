const { createHash } = require("crypto");
const fs = require("fs");
const {
  generateWAMessageFromContent,
  proto,
  prepareWAMessageMedia,
} = require("@whiskeysockets/baileys");
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix }) {
  let sn = createHash('md5').update(m.sender).digest('hex')
  
  const user = db.data.users[m.sender];
  let thumb = "https://telegra.ph/file/6bcbacb886c0ca12c9e3b.jpg"
  let uskr = global.db.data.users[m.sender].sn
  let caption = `BERIKUT ID SN KAMU:\n${uskr}`
  let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                "messageContextInfo": {
                    "deviceListMetadata": {},
                    "deviceListMetadataVersion": 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: {
                        mentionedJid: [m?.sender],
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363199957492480@newsletter',
                            newsletterName: `ALVIAN UXIO Inc.`,
                            serverMessageId: -1
                        },
                        businessMessageForwardInfo: {
                            businessOwnerJid: conn.decodeJid(conn.user.id)
                        },
                        externalAdReply: {
                            title: 'SERIAL NUMBER',
                            body: "ALUXI - MD",
                            thumbnailUrl: global.thumb,
                            sourceUrl: '',
                            mediaType: 1,
                            renderLargerThumbnail: true
                        }
                    },
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: `Berikut ID SN Kamu:\n${uskr}`
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: `© ALVIAN UXIO Inc.`
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        
                        thumbnailUrl: global.thumb,
                        gifPlayback: true,
                        subtitle: "ALVIAN UXIO Inc.",
                        hasMediaAttachment: true,
                        ...(await prepareWAMessageMedia({
                            document: fs.readFileSync('./package.json'),
                            mimetype: "image/png",
                            fileLength: 99999999999999,
                            jpegThumbnail: fs.readFileSync("./media/alxo.png"),
                            fileName: "REGISTERED",
                        }, {
                            upload: conn.waUploadToServer
                        }))
                    }),
                    gifPlayback: true,
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: [{
                                    "name": "cta_copy",
                                    "buttonParamsJson": `{\"display_text\":\"COPY ID SN\",\"id\":\"123456789\",\"copy_code\":\"${uskr}\"}`
                                }, 
                    {
                      name: "quick_reply",
                      buttonParamsJson: `{\"display_text\":\"AUTO UNREGISTER\",\"id\":\".unreg ${uskr}\"}`,
                    },
                        ]
                    })
                })
            }
        }
    }, {
        quoted: fkontak
    });

    await m.reply(caption)
}

handler.help = ['ceksn']
handler.tags = ['user']
handler.command = /^(ceksn)$/i
handler.register = true
module.exports = handler