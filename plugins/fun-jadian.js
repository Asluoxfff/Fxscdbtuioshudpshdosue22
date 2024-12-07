let toM = a => '@' + a.split('@')[0]
async function handler(m, { groupMetadata, participants }) {
let member = participants
        .map((u) => u.id)
        .filter((v) => v !== conn.user.jid);
      let org = member[Math.floor(Math.random() * member.length)];
      let org2 = member[Math.floor(Math.random() * member.length)];
    m.reply(`@${org.split("@")[0]} ❤️ @${org2.split("@")[0]}\n\n"${pickRandom(jodohReasons)}"`, null, {
        contextInfo: {
mentionedJid: [org, org2] }
    })
}
handler.help = ['jadian']
handler.tags = ['main', 'fun']
handler.command = ['jadian', 'cekjodoh']

handler.group = true;
handler.limit = true;
module.exports = handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}
let jodohReasons = [
        "Kalian berdua memiliki kesamaan yang luar biasa dan saling melengkapi.",
        "Hubungan kalian penuh dengan pengertian dan saling mendukung.",
        "Kalian memiliki chemistry yang kuat dan akan saling melengkapi.",
        "Kalian saling memahami satu sama lain tanpa perlu banyak kata.",
        "Kalian berdua selalu menemukan cara untuk membuat satu sama lain tersenyum.",
        "Kalian memiliki tujuan hidup yang sama dan saling mendukung.",
        "Kalian berdua memiliki rasa hormat yang besar satu sama lain.",
        "Kalian bisa saling mengandalkan dalam situasi apapun.",
        "Kalian selalu merasa nyaman dan aman saat bersama.",
        "Kalian berdua selalu tahu bagaimana membuat satu sama lain bahagia.",
        "Kalian memiliki ketertarikan yang sama dan dapat menikmatinya bersama.",
        "Kalian bisa saling melengkapi dalam banyak hal.",
        "Kalian selalu saling mendukung dan memberi semangat.",
        "Kalian berdua memiliki cara yang unik dalam menunjukkan cinta.",
        "Kalian berbagi banyak kenangan indah bersama.",
        "Kalian selalu menemukan cara untuk menyelesaikan masalah bersama.",
        "Kalian saling mengerti dan menerima kekurangan satu sama lain."
    ];