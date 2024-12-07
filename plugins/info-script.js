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
let handler = async (m, { conn, text, usedPrefix, command }) => {
  conn.sendButton(m.chat,[["TAMPILKAN MENU",`.menu`]],m, {
 body: "⋄ sᴄʀɪᴘᴛ ᴀʟᴠɪᴀɴ ᴜxɪᴏ - ᴍᴅ  ⋄\n⎙ sᴄʀɪᴘᴛ ɪɴɪ ᴘʀɪᴠᴀᴛᴇ\n\n`FIXED FEATURE :`\n\n• Fitur ai\n• Fitur simi\n• Fitur pinterest\n• Fitur qc\n• Fitur hd\n\n `ADDED FEATURE :`\n\n• Ulartangga\n• Close time\n• Open time\n• quizz\n• lengkapikalimat\n• Warewolf\n• List Online\n• List totalpesan\n• Suit pvp\n\n `RE-NEW APPEARANCE :`\n\n• Menu tampilan baru\n• Owner tampilan baru\n• info sc tampilan baru\n• pinterest tampilan baru\n• afk tampilan baru",
 footer: `© ALVIAN UXIO Inc.`,
url: "https://telegra.ph/file/6bcbacb886c0ca12c9e3b.jpg"
})
}
handler.help = ["script"]
handler.tags = ["main"]
handler.command = ["sc", "script"]
module.exports = handler