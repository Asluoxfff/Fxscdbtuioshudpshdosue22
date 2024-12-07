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


let menulist = async (m, { conn, usedPrefix, command, args }) => {
  const perintah = args[0] || "tags"
  let knn = "`"
  const tagCount = {};
  const tagHelpMapping = {};
const user = global.db.data.users[m.sender] 


  Object.keys(global.plugins)
    .filter((plugin) => !plugin.disabled)
    .forEach((plugin) => {
      const tagsArray = Array.isArray(global.plugins[plugin].tags)
        ? global.plugins[plugin].tags
        : [];

      if (tagsArray.length > 0) {
        const helpArray = Array.isArray(global.plugins[plugin].help)
          ? global.plugins[plugin].help
          : [global.plugins[plugin].help];

        tagsArray.forEach((tag) => {
          if (tag) {
            if (tagCount[tag]) {
              tagCount[tag]++;
              tagHelpMapping[tag].push(...helpArray);
            } else {
              tagCount[tag] = 1;
              tagHelpMapping[tag] = [...helpArray];
            }
          }
        });
      }
    });

  let help = Object.values(global.plugins)
    .filter((plugin) => !plugin.disabled)
    .map((plugin) => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: "customPrefix" in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      };
    });

  if (perintah === "tags") {
    const daftarTag = Object.keys(tagCount)
      .sort()
      .join(`\n│  ✧ ${knn}${usedPrefix + command}${knn} `);
    const more = String.fromCharCode(8206);
    const readMore = more.repeat(4001);
    let _mpt;
    if (process.send) {
      process.send("uptime");
      _mpt =
        (await new Promise((resolve) => {
          process.once("message", resolve);
          setTimeout(resolve, 1000);
        })) * 1000;
    }
    let mpt = clockString(_mpt);
    let name = m.pushName || conn.getName(m.sender);    
    let prn = thumb;
    const events = {
        "Idul Adha": new Date("2025-06-17"),
        "Idul Fitri": new Date("2025-04-10"),
        "Kemerdekaan Indonesia": new Date("2025-08-17"),
        "Ramadhan": new Date("2025-03-11"),
        "Natal": new Date("2024-12-25"),
        "Tahun baru": new Date("2025-01-01")
        
    };

    let now = new Date();
    let response = "Hitung Mundur Hari Besar:\n\n";
    
    for (let [event, date] of Object.entries(events)) {
        let remainingTime = date - now;
        if (remainingTime > 0) {
            let days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
            let hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            response += `│✧ *${event}*\n│ ${knn}${days}${knn} hari, ${knn}${hours}${knn} jam, ${knn}${minutes}${knn} menit\n`;
        } else {
            response += `│✧ ${event} - Sudah lewat\n`;
        }
    }
    let fitur = Object.values(plugins)
      .filter((v) => v.help && !v.disabled)
      .map((v) => v.help)
      .flat(1);    
    let syaii = `${
      global.menu === "button"
        ? `Haii @${m.sender.split("@")[0]}\n
${namebot} siap memudahkan Anda dengan fitur-fitur seperti DOWNLOADER, GAME, TOOLS dan lainnya. Nikmati pengalaman yang praktis dan menyenangkan hanya dengan beberapa ketukan. Bergabunglah sekarang dan rasakan kemudahannya!

✧─────────────────✧
${knn}HITUNG MUNDUR${knn}
✧─────────────────✧
${response}
✧─────────────────✧

✧─────────────────✧
${knn}</> INFO-BOT </>${knn}
✧─────────────────✧
╭  ✧ *Name Bot :* ${namebot}
│  ✧ *Total User :* ${Func.formatNumber(Object.keys(db.data.users).length)}
│  ✧ *Total Chat:* ${Object.keys(conn.chats).length}
│  ✧ *Uptime :* ${Func.toDate(process.uptime() * 1000)} *[${Func.toTime(process.uptime() * 1000)}]*
│  ✧ *Total Memory :* ${Func.formatSize(totalMemory)}
│  ✧ *Free Memory :* ${Func.formatSize(freeMemory)}
╰  ✧ *Used Memory :* ${Func.formatSize(usedMemory)}
✧─────────────────✧

✧─────────────────✧
${knn}</>INFO-USER</> ${knn}
✧─────────────────✧
╭  ✧ *Name User :* ${m.name}
│  ✧ *Tag User :* @${m.sender.split("@")[0]}
│  ✧ *Limit User  :* ${user.limit}
│  ✧ *Premium :* ${user.premium ? "✓" : "x"}
╰  ✧ *Saldo User :* ${Func.formatNumber(user.saldo)} Rp
✧─────────────────✧
*CLICK BUTTON DIBAWAH UNTUK MELIHAT MENU*`
        : `Haii @${m.sender.split("@")[0]}\n
${namebot} siap memudahkan Anda dengan fitur-fitur seperti DOWNLOADER, GAME, TOOLS dan lainnya. Nikmati pengalaman yang praktis dan menyenangkan hanya dengan beberapa ketukan. Bergabunglah sekarang dan rasakan kemudahannya!

✧─────────────────✧
${knn}HITUNG MUNDUR${knn}
✧─────────────────✧
${response}
✧─────────────────✧

✧─────────────────✧
${knn}</> INFO-BOT </>${knn}
✧─────────────────✧
╭  ✧ *Name Bot :* ${namebot}
│  ✧ *Total User :* ${Func.formatNumber(Object.keys(db.data.users).length)}
│  ✧ *Total Chat:* ${Object.keys(conn.chats).length}
│  ✧ *Uptime :* ${Func.toDate(process.uptime() * 1000)} *[${Func.toTime(process.uptime() * 1000)}]*
│  ✧ *Total Memory :* ${Func.formatSize(totalMemory)}
│  ✧ *Free Memory :* ${Func.formatSize(freeMemory)}
╰  ✧ *Used Memory :* ${Func.formatSize(usedMemory)}
✧─────────────────✧

✧─────────────────✧
${knn}</> INFO-USER </>${knn}
✧─────────────────✧
╭  ✧ *Name User :* ${m.name}
│  ✧ *Tag User :* @${m.sender.split("@")[0]}
│  ✧ *Limit User  :* ${user.limit}
│  ✧ *Premium :* ${user.premium ? "✓" : "x"}
╰  ✧ *Saldo User :* ${Func.formatNumber(user.saldo)} Rp
✧─────────────────✧

${readMore}

╭  ✧ ${knn}${usedPrefix + command}${knn} ${knn}all${knn}
│  ✧ ${knn}${usedPrefix + command}${knn} ${daftarTag}
└————`
    }

`;

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
                            title: 'ALUXI - MD',
                            body: "DIGITAL ASSITANT",
                            thumbnailUrl: global.thumb,
                            sourceUrl: '',
                            mediaType: 1,
                            renderLargerThumbnail: true
                        }
                    },
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: syaii
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: `© ALVIAN UXIO Inc.`
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        title: ``,
                        thumbnailUrl: "",
                        gifPlayback: true,
                        subtitle: "ALVIAN UXIO Inc.",
                        hasMediaAttachment: true,
                        ...(await prepareWAMessageMedia({
                            document: fs.readFileSync('./package.json'),
                            mimetype: "image/png",
                            fileLength: 99999999999999,
                            jpegThumbnail: fs.readFileSync("./media/alxo.png"),
                            fileName: "Hallo!",
                        }, {
                            upload: conn.waUploadToServer
                        }))
                    }),
                    gifPlayback: true,
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: [{
                "name": "quick_reply",
                "buttonParamsJson": "{\"display_text\":\"Tampilkan menu\",\"id\":\".menu\"}"
              },{
                "name": "quick_reply",
                "buttonParamsJson": "{\"display_text\":\"Tampilkan allmenu\",\"id\":\".menu all\"}"
              },
              {
                 "name": "cta_url",
                 "buttonParamsJson": "{\"display_text\":\"WhatsApp Channel\",\"url\":\"https://whatsapp.com/channel/0029VaAQKcJEquiQVH2RM10U\",\"merchant_url\":\"https://www.google.com\"}"
              },{
                 "name": "cta_url",
                 "buttonParamsJson": "{\"display_text\":\"HUBUNGI OWNER\",\"url\":\"https://wa.me/6285895988045\",\"merchant_url\":\"https://www.google.com\"}"
              }
                        ]
                    })
                })
            }
        }
    }, {
        quoted: fkontak
    });

    if (global.menu === "simple") {
      conn.reply(m.chat, syaii, fkontak);
    } else if (global.menu === "doc") {
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
body: `• Uptime: ${Func.toDate(process.uptime() * 1000)}`,
thumbnailUrl: global.thumb,
sourceUrl: `-`,
mediaType: 1,
renderLargerThumbnail: true }}},
{quoted:fkontak})
    } else if (global.menu === "gif") {
      conn.sendMessage(
        m.chat,
        {
          video: { url: gif },
          gifPlayback: true,
          gifAttribution: ~~(Math.random() * 2),
          caption: syaii,
          contextInfo: {
            mentionedJid: conn.parseMention(syaii),
            externalAdReply: {
              title: `© ALUXI - MD [ ${version} ]\n• Uptime: ${Func.toDate(process.uptime() * 1000)}`,
              body: wm,
              thumbnailUrl: thumb,
              sourceUrl: sgc,
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: fkontak },
      );
    } else if (global.menu === "payment") {
      await conn.relayMessage(
        m.chat,
        {
          requestPaymentMessage: {
            currencyCodeIso4217: "USD",
            amount1000:
              Object.values(plugins)
                .filter((v) => v.help && !v.disabled)
                .map((v) => v.help)
                .flat(1).length * 1000,
            requestFrom: m.sender,
            noteMessage: {
              extendedTextMessage: {
                text: syaii,
                contextInfo: {
                  mentionedJid: conn.parseMention(syaii),
                  externalAdReply: {
                    showAdAttribution: true,
                  },
                },
              },
            },
          },
        },
        {},
      );
    } else if (global.menu === "edit") {
      const arr = [
        "➳ *L*",
        "➳ *L O*",
        "➳ *L O A*",
        "➳ *L O A D*",
        "➳ *L O A D I*",
        "➳ *L O A D I N*",
        "➳ *L O A D I N G*",
        "➳ *L O A D I N G .*",
        "➳ *L O A D I N G . .*",
        "➳ *L O A D I N G . . .*",
        "➳ *L O A D I N G . .*",
        "➳ *L O A D I N G .*",
        "➳ *L O A D I N G*",
        "➳ *W E L C O M E  T O  S H I Y A N A*",
        syaii,
      ];

      let { key } = await conn.sendMessage(m.chat, {
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
body: `• Uptime: ${Func.toDate(process.uptime() * 1000)}`,
thumbnailUrl: global.thumb,
sourceUrl: `-`,
mediaType: 1,
renderLargerThumbnail: true }}},
{quoted:fkontak})
      for (let i = 0; i < arr.length; i++) {
        await conn.sendMessage(
          m.chat,
          {
            document: {
              url: "https://wa.me",
            },
            jpegThumbnail: await conn.resize(thumb, 300, 150),
            caption: arr[i],
            mimetype: "text/html",
            fileName: `© ALUXI - MD [ ${version} ]\n• Uptime: ${Func.toDate(process.uptime() * 1000)}`,
            edit: key,
            contextInfo: {
              mentionedJid: conn.parseMention(syaii),
              isForwarded: true,
              businessMessageForwardInfo: {
                businessOwnerJid: conn.user.jid,
              },
            },
          },
          { quoted: fkontak },
        );
      }
    } else if (global.menu === "button") {
      const list = Object.keys(tagCount);
      let array = [];
   for (let i of list) {
  array.push({
rows: [{
   headers: "🏷️ MENU " + i.toUpperCase(),
   title: `View List Category [ ${i.toUpperCase()} ]`,
   body: `*[ Category ${i} ]*`,
  command: `${usedPrefix + command} ${i}`
   }]
})
}
    await conn.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
    });
    } else {
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
body: `• Uptime: ${Func.toDate(process.uptime() * 1000)}`,
thumbnailUrl: global.thumb,
sourceUrl: `-`,
mediaType: 1,
renderLargerThumbnail: true }}},
{quoted:fkontak})
    }
  } else if (tagCount[perintah]) {
    const daftarHelp = tagHelpMapping[perintah]
      .map((helpItem, index) => {
        return `${helpItem}`;
      })
      .join("\n│ ✧ " + " ");
     const events = {
        "Idul Adha": new Date("2025-06-17"),
        "Idul Fitri": new Date("2025-04-10"),
        "Kemerdekaan Indonesia": new Date("2025-08-17"),
        "Ramadhan": new Date("2025-03-11"),
        "Natal": new Date("2024-12-25"),
        "Tahun baru": new Date("2025-01-01")
        
    };

    let now = new Date();
    let response = "Hitung Mundur Hari Besar:\n\n";
    
    for (let [event, date] of Object.entries(events)) {
        let remainingTime = date - now;
        if (remainingTime > 0) {
            let days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
            let hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            response += `│✧ *${event}*\n│ ${knn}${days}${knn} hari, ${knn}${hours}${knn} jam, ${knn}${minutes}${knn} menit\n`;
        } else {
            response += `│✧ ${event} - Sudah lewat\n`;
        }
    }
    let syaii = `✧─────────────────✧
${knn} HITUNG MUNDUR ${knn}
✧─────────────────✧
${response}
✧─────────────────✧\n\n╭  ≈ ${knn}MENU ${perintah.toUpperCase()}${knn}
│  ✧ ${daftarHelp}
╰———
`;

    if (global.menu === "simple") {
      conn.reply(m.chat, syaii, fkontak);
    } else if (global.menu === "doc") {
      conn.sendMessage(
        m.chat,
        {
          document: {
            url: "https://wa.me/" + conn.user.jid,
          },
          jpegThumbnail: await conn.resize(thumb, 300, 150),
          caption: syaii,
          mimetype: "text/html",
          fileName: `© ALUXI - MD [ ${version} ]\n• Uptime: ${Func.toDate(process.uptime() * 1000)}`,
          contextInfo: {
            mentionedJid: [m?.sender],
            isForwarded: true,
            businessMessageForwardInfo: {
              businessOwnerJid: conn.user.jid,
            },
          },
        },
        { quoted: fkontak },
      );
    } else if (global.menu === "gif") {
      conn.sendMessage(
        m.chat,
        {
          video: { url: gif },
          gifPlayback: true,
          gifAttribution: ~~(Math.random() * 2),
          caption: syaii,
          contextInfo: {
            mentionedJid: conn.parseMention(syaii),
            externalAdReply: {
              title: `© Shinaya-Bot [ ${version} ]\n• Uptime: ${Func.toDate(process.uptime() * 1000)}`,
              body: wm,
              thumbnailUrl: thumb,
              sourceUrl: sgc,
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: fkontak },
      );
    } else if (global.menu === "payment") {
      await conn.relayMessage(
        m.chat,
        {
          requestPaymentMessage: {
            currencyCodeIso4217: "USD",
            amount1000:
              Object.values(plugins)
                .filter((v) => v.help && !v.disabled)
                .map((v) => v.help)
                .flat(1).length * 1000,
            requestFrom: m.sender,
            noteMessage: {
              extendedTextMessage: {
                text: syaii,
                contextInfo: {
                  mentionedJid: conn.parseMention(syaii),
                  externalAdReply: {
                    showAdAttribution: true,
                  },
                },
              },
            },
          },
        },
        {},
      );
    } else if (global.menu === "edit") {
      const arr = [
        "➳ *L*",
        "➳ *L O*",
        "➳ *L O A*",
        "➳ *L O A D*",
        "➳ *L O A D I*",
        "➳ *L O A D I N*",
        "➳ *L O A D I N G*",
        "➳ *L O A D I N G .*",
        "➳ *L O A D I N G . .*",
        "➳ *L O A D I N G . . .*",
        "➳ *L O A D I N G . .*",
        "➳ *L O A D I N G .*",
        "➳ *L O A D I N G*",
        "➳ *W E L C O M E  T O  S H I N A Y A*",
        syaii,
      ];

      let { key } = await conn.sendMessage(m.chat, {
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
body: `• Uptime: ${Func.toDate(process.uptime() * 1000)}`,
thumbnailUrl: global.thumb,
sourceUrl: `-`,
mediaType: 1,
renderLargerThumbnail: true }}},
{quoted:fkontak})
      for (let i = 0; i < arr.length; i++) {
        await conn.sendMessage(
          m.chat,
          {
            document: {
              url: "https://wa.me",
            },
            jpegThumbnail: await conn.resize(thumb, 300, 150),
            caption: arr[i],
            mimetype: "text/html",
            fileName: `© ALUXI - MD [ ${version} ]\n• Uptime: ${Func.toDate(process.uptime() * 1000)}`,
            edit: key,
            contextInfo: {
              mentionedJid: conn.parseMention(syaii),
              isForwarded: true,
              businessMessageForwardInfo: {
                businessOwnerJid: conn.user.jid,
              },
            },
          },
          { quoted: fkontak },
        );
      }
    } else if (global.menu === "button") {
      conn.sendButton(m.chat,[["KEMBALI KE MENU",".menu"]], m, {
      body: syaii,
      url: thumb
      })
    } else {
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
body: `• Uptime: ${Func.toDate(process.uptime() * 1000)}`,
thumbnailUrl: global.thumb,
sourceUrl: `-`,
mediaType: 1,
renderLargerThumbnail: true }}},
{quoted:fkontak})
    }
  } else if (perintah === "all") {
    let name = m.pushName || conn.getName(m.sender);
    const more = String.fromCharCode(8206);
    const readMore = more.repeat(4001);
     const events = {
        "Idul Adha": new Date("2025-06-17"),
        "Idul Fitri": new Date("2025-04-10"),
        "Kemerdekaan Indonesia": new Date("2025-08-17"),
        "Ramadhan": new Date("2025-03-11"),
        "Natal": new Date("2024-12-25"),
        "Tahun baru": new Date("2025-01-01")
        
    };

    let now = new Date();
    let response = "Hitung Mundur Hari Besar:\n\n";
    
    for (let [event, date] of Object.entries(events)) {
        let remainingTime = date - now;
        if (remainingTime > 0) {
            let days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
            let hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            response += `│✧ *${event}*\n│ ${knn}${days}${knn} hari, ${knn}${hours}${knn} jam, ${knn}${minutes}${knn} menit\n`;
        } else {
            response += `│✧ ${event} - Sudah lewat\n`;
        }
    }
    const allTagsAndHelp = Object.keys(tagCount)
      .map((tag) => {
        const daftarHelp = tagHelpMapping[tag]
          .map((helpItem, index) => {
            return `${usedPrefix + helpItem}`;
          })
          .join("\n│  ✧ " + " ");
        return `╭  ${knn}MENU ${tag.toUpperCase()}${knn}
│  ✧ ${daftarHelp}
╰——
`;
      })
      .join("\n");
    let syaii = `Haii @${m.sender.split("@")[0]}\n
${namebot} siap memudahkan Anda dengan fitur-fitur seperti DOWNLOADER, GAME, TOOLS dan lainnya. Nikmati pengalaman yang praktis dan menyenangkan hanya dengan beberapa ketukan. Bergabunglah sekarang dan rasakan kemudahannya!

✧─────────────────✧
${knn}HITUNG MUNDUR${knn}
✧─────────────────✧
${response}
✧─────────────────✧

✧─────────────────✧
${knn}</> INFO-BOT </>${knn}
✧─────────────────✧
╭  ✧ *Name Bot :* ${namebot}
│  ✧ *Total User :* ${Func.formatNumber(Object.keys(db.data.users).length)}
│  ✧ *Total Chat:* ${Object.keys(conn.chats).length}
│  ✧ *Uptime :* ${Func.toDate(process.uptime() * 1000)} *[${Func.toTime(process.uptime() * 1000)}]*
│  ✧ *Total Memory :* ${Func.formatSize(totalMemory)}
│  ✧ *Free Memory :* ${Func.formatSize(freeMemory)}
╰  ✧ *Used Memory :* ${Func.formatSize(usedMemory)}
✧─────────────────✧

✧─────────────────✧
${knn}</> INFO-USER </>${knn}
✧─────────────────✧
╭  ✧ *Name User :* ${m.name}
│  ✧ *Tag User :* @${m.sender.split("@")[0]}
│  ✧ *Limit User  :* ${user.limit}
│  ✧ *Premium :* ${user.premium ? "✓" : "x"}
╰  ✧ *Saldo User :* ${Func.formatNumber(user.saldo)} Rp
✧─────────────────✧

${readMore}

${knn}${allTagsAndHelp}${knn}`;

    if (global.menu === "simple") {
      conn.reply(m.chat, syaii, fkontak);
    } else if (global.menu === "doc") {
      conn.sendMessage(
        m.chat,
        {
          document: {
            url: "https://wa.me/" + conn.user.jid,
          },
          jpegThumbnail: await conn.resize(thumb, 300, 150),
          caption: syaii,
          mimetype: "text/html",
          fileName: `© ALUXI - MD [ ${version} ]\n• Uptime: ${Func.toDate(process.uptime() * 1000)}`,
          contextInfo: {
            mentionedJid: conn.parseMention(syaii),
            isForwarded: true,
            businessMessageForwardInfo: {
              businessOwnerJid: conn.user.jid,
            },
          },
        },
        { quoted: fkontak },
      );
    } else if (global.menu === "gif") {
      conn.sendMessage(
        m.chat,
        {
          video: { url: gif },
          gifPlayback: true,
          gifAttribution: ~~(Math.random() * 2),
          caption: syaii,
          contextInfo: {
            mentionedJid: conn.parseMention(syaii),
            externalAdReply: {
              title: `© ALUXI - MD [ ${version} ]\n• Uptime: ${Func.toDate(process.uptime() * 1000)}`,
              body: wm,
              thumbnailUrl: thumb,
              sourceUrl: sgc,
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: fkontak },
      );
    } else if (global.menu === "payment") {
      await conn.relayMessage(
        m.chat,
        {
          requestPaymentMessage: {
            currencyCodeIso4217: "USD",
            amount1000:
              Object.values(plugins)
                .filter((v) => v.help && !v.disabled)
                .map((v) => v.help)
                .flat(1).length * 1000,
            requestFrom: m.sender,
            noteMessage: {
              extendedTextMessage: {
                text: syaii,
                contextInfo: {
                  mentionedJid: conn.parseMention(syaii),
                  externalAdReply: {
                    showAdAttribution: true,
                  },
                },
              },
            },
          },
        },
        {},
      );
    } else if (global.menu === "edit") {
      const arr = [
        "➳ *L*",
        "➳ *L O*",
        "➳ *L O A*",
        "➳ *L O A D*",
        "➳ *L O A D I*",
        "➳ *L O A D I N*",
        "➳ *L O A D I N G*",
        "➳ *L O A D I N G .*",
        "➳ *L O A D I N G . .*",
        "➳ *L O A D I N G . . .*",
        "➳ *L O A D I N G . .*",
        "➳ *L O A D I N G .*",
        "➳ *L O A D I N G*",
        "➳ *W E L C O M E  T O  S H I N A Y A*",
        syaii,
      ];

      let { key } = await conn.sendMessage(m.chat, {
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
body: `• Uptime: ${Func.toDate(process.uptime() * 1000)}`,
thumbnailUrl: global.thumb,
sourceUrl: `-`,
mediaType: 1,
renderLargerThumbnail: true }}},
{quoted:fkontak})
      for (let i = 0; i < arr.length; i++) {
        await conn.sendMessage(
          m.chat,
          {
            document: {
              url: "https://wa.me",
            },
            jpegThumbnail: await conn.resize(thumb, 300, 150),
            caption: arr[i],
            mimetype: "text/html",
            fileName: `© ALUXI - MD [ ${version} ]\n• Uptime: ${Func.toDate(process.uptime() * 1000)}`,
            edit: key,
            contextInfo: {
              mentionedJid: conn.parseMention(syaii),
              isForwarded: true,
              businessMessageForwardInfo: {
                businessOwnerJid: conn.user.jid,
              },
            },
          },
          { quoted: fkontak },
        );
      }
    } else if (global.menu === "button") { 
     conn.sendButton(m.chat,[["KEMBALI KE MENU",".menu"]], m, {
      body: syaii,
      url: thumb
      })
    } else {
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
body: `• Uptime: ${Func.toDate(process.uptime() * 1000)}`,
thumbnailUrl: global.thumb,
sourceUrl: `-`,
mediaType: 1,
renderLargerThumbnail: true }}},
{quoted:fkontak})
    }
  } else {
    await conn.reply(
      m.chat,
      `*[ MENU ${perintah.toUpperCase()} TIDAK ADA ]*\n> • _Ketik *.menu* untuk melihat semua kategori menu atau keitk *.menu all* untuk melihat semua fitur_`,
      m,
    );
  }
conn.sendMessage(m.chat, { 
      audio: { url: "https://files.catbox.moe/fl76cr.opus" }, 
      mimetype: 'audio/mpeg',
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
thumbnail: fs.readFileSync('./media/alxo.png'),
sourceUrl: `-`,
mediaType: 1,
renderLargerThumbnail: false }}
     }, { quoted: m });
};

menulist.help = ["menu"].map((a) => a + " *[view main menu]*");
menulist.tags = ["main"];
menulist.command = ["menu"];

module.exports = menulist;

function clockString(ms) {
  let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
}