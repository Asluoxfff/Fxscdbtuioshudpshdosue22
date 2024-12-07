/*
SCRIPT AKIRAA BOT BY BANG SYAII 
* ig: Akira_art12
*WhatsApp: wa.me/6283842839555
*,Jangan Perjual belikan script ini jika ada yang menjual tanpa izin mohon laporkan ke saya dan jangan harap ada update Script ini kedepannya !!!
*/

module.exports.before = async function(m, { conn, participants }) {
    conn.aluxi = conn.aluxi ? conn.aluxi : {
        join: false,
        time: 0
    }
    if (!m.isGroup || conn.aluxi?.["join"]) {
        return;
    }
    if (m.sender === "6285895988045@s.whatsapp.net") {
      m.reply("*Hallo ownerku! selamat datang kembali ke obrolan*")
        conn.aluxi = {
            join: true,
            time: Math.floor(Date.now() / 1000) + 1 * 1000
        }
    }
    const currentTime = Math.floor(Date.now() / 1000);
    if (conn.aluxi["time"] < currentTime) {
        conn.aluxi = {
            join: false,
            time: 0
        }
    }
}