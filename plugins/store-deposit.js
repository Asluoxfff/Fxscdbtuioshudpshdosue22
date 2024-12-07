/*
SCRIPT AKIRAA BOT BY BANG SYAII 
* ig: Akira_art12
*WhatsApp: wa.me/6283842839555
*,Jangan Perjual belikan script ini jika ada yang menjual tanpa izin mohon laporkan ke saya dan jangan harap ada update Script ini kedepannya !!!
*/

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
    const user = global.db.data.users[m.sender];

    switch (command) {
        case "deposit": {
            if (!text) throw `*• Example:* ${usedPrefix + command} 1000`;
            let q = await (await fetch("https://api.neoxr.eu/api/topup-dana?number=083842839555&amount=" + text)).json();
            if (!q.status) {
                let jumlah = q.available_amount.map((v, index) => index + 1 + ". " + v).join("\n");
                throw "*[ VALID DEPOSIT AMOUNT ]*\n\n" + jumlah;
            }
            let buffer = await Buffer.from(q.data.qr_image, "base64");
            let deposit = `*• BALANCE DEPOSIT*\n*Total Price:* ${q.data.price_format} *(Admin fee)*\n*Qr Expired:* ${q.data.expired_at}\n\n*Scan the Qr above to make a deposit , type .proof to send transaction results*`;
            let { key } = await conn.sendFile(m.chat, buffer, null, deposit, m);
            let topup = await (await fetch(`https://api.neoxr.eu/api/topup-check?id=${q.data.id}&code=${q.data.code}`)).json();
            if (topup.data.status === "SUCCEEDED") {
                user.saldo += text;
                await conn.reply(m.chat, "*BALANCE DEPOSIT SUCCESSFUL ✅*\n*•Price:* Rp: " + text + "\n\n*Balance has been entered into your account, please check by typing .mybalance*", key);
            }
            break;
        }
    }
};

handler.command = handler.help = ["deposit"];
handler.tags = ["store"];
module.exports = handler;