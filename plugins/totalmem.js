/*
SCRIPT AKIRAA BOT BY BANG SYAII 
* ig: Akira_art12
*WhatsApp: wa.me/6283842839555
*,Jangan Perjual belikan script ini jika ada yang menjual tanpa izin mohon laporkan ke saya dan jangan harap ada update Script ini kedepannya !!!
*/

let uploadImage = require('../lib/uploadImage.js');

let handler = async (m, { conn, text, participants, usedPrefix , command}) => {
  let PhoneNum = require("awesome-phonenumber");
        let regionNames = new Intl.DisplayNames(["en"], {
            type: "region",
        });
        let data = conn.groupMetadata[m.chat];
        let arr = [];
        for (let i of participants) {
            arr.push({
                number: i.id,
                code: regionNames.of(PhoneNum("+" + i.id.split("@")[0]).getRegionCode("internasional")),
            });
        }
          let json = {};
            for (let contact of arr) {
                let country = contact.code;
                json[country] = (json[country] || 0) + 1;
            }
         let countryCounts = Object.keys(json).map((country) => ({
                name: country,
                total: json[country],
            }));
         let totalSum = countryCounts.reduce((acc, country) => acc + country.total, 0);
        let totalRegion = [...new Set(arr.map(a => a.code))]
        let hasil = countryCounts.map(({
                name,
                total
            }) => ({
                name,
                total,
                percentage: ((total / totalSum) * 100).toFixed(2) + '%'
            }));
        let cap = `┌─⭓「 *TOTAL MEMBER* 」
│ *• Total :* ${data.participants.length}
│ *• Total Region :* ${totalRegion.length}
└───────────────⭓

┌─⭓「 *REGION MEMBER* 」
${hasil.sort((b, a) => a.total - b.total).map(a => `│ *• Region :* ${a.name} *[ ${a.percentage} ]*
│ *• Total :* ${a.total} Member`).join("\n")}
└───────────────⭓`
        conn.reply(m.chat, cap, fakestatus("*[ Total Member ]*"))
}

handler.help = ['bcgc'].map(v => v + ' <teks>');
handler.tags = ['owner'];
handler.command = /^(totalmem|totalmember)$/i;
handler.limit = true;
handler.register = true;
module.exports = handler;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

const randomID = length => require('crypto').randomBytes(Math.ceil(length * .5)).toString('hex').slice(0, length);