const { createHash } = require("crypto");
let handler = async (m, { text, usedPrefix }) => {
let user = global.db.data.users[m.sender]
let name = conn.getName(m.sender)
if(user.registered !== false) throw 'Kamu Sudah terdaftar!!\nIngin daftar ulang? ketik unreg snmu'
    let id = await createHash("md5").update(m.sender).digest("hex");
    user.registered = true;
    user.name = name;
    user.sn = "Aluxi-" + id;
    let p = `*Selamat Kamu sudah Mendaftar ✅*\n•Ketik Menu Untuk Melanjutkan\n\n SN KAMU: *${user.sn}*`
    const arr = [
        { text: `*[ V ]*\n\n${p}`, timeout: 100 },
        { text:  `*[ VE ]*\n\n${p}`, timeout: 100 },
        { text:  `*[ VER ]*\n\n${p}`, timeout: 100 },
        { text:  `*[ VERI ]*\n\n${p}`, timeout: 100 },
        { text:  `*[ VERIF ]*\n\n${p}`, timeout: 100 },
        { text:  `*[ VERIFY ]*\n\n${p}`, timeout: 100 },
        { text:  `*[ VERIFY  S ]*\n\n${p}`, timeout: 100 },
        { text:  `*[ VERIFY  SU ]*\n\n${p}`, timeout: 100 },
        { text:  `*[ VERIFY  SUC ]*\n\n${p}`, timeout: 100 },
        { text:  `*[ VERIFY  SUCC ]*\n\n${p}`, timeout: 100 },
        { text:  `*[ VERIFY  SUCCE ]*\n\n${p}`, timeout: 100 },
        { text:  `*[ VERIFY  SUCCES ]*\n\n${p}`, timeout: 100 },
        { text:  `*[ VERIFY  SUCCESS ]*\n\n${p}`, timeout: 100 },
    ];

    const lll = await conn.sendMessage(m.chat, { text: 'Sedang menverifikasi....' }, { quoted: m });

    for (let i = 0; i < arr.length; i++) {
        await new Promise(resolve => setTimeout(resolve, arr[i].timeout));
        await conn.relayMessage(m.chat, {
            protocolMessage: {
                key: lll.key,
                type: 14,
                editedMessage: {
                    conversation: arr[i].text
                }
            }
        }, {});
    }
}

handler.help = ['@verify']
handler.tags = ['main']
handler.customPrefix = /^(@verify|.verify)$/i
handler.command = new RegExp

module.exports = handler