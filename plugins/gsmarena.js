let axios = require('axios');
let cheerio = require('cheerio');
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Use ${usedPrefix + command} iphone 19 pro`
    conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });
    try {
        let res = await gsm(text) 
        let resultText = ''
        for (let i = 0; i < res.result.length; i++) {
            let result = res.result[i]
            let hasil = `id : ${result.id}\nname : ${result.name}\ndescription : ${result.description}\n`
            resultText += hasil + '\n'
        }
        conn.reply(m.chat, resultText, m) 
    } catch (e) {
        console.log(e) 
        conn.reply(m.chat, e, m) 
    }
}

// please follow the channel https://whatsapp.com/channel/0029VaddOXtAInPl84jp7Q1p for the next feature

handler.help = ['gsmarena']
handler.tags = ['internet']
handler.command = /^(gsmarena)$/i
module.exports = handler

// SCRAPERS BY DANNTEAM😾🔥

async function gsm(query) {
    try {
        const response = await axios({
            method: "get",
            url: `https://gsmarena.com/results.php3?sQuickSearch=yes&sName=${query}`
        });
        const $ = cheerio.load(response.data);
        const result = [];
        const devices = $(".makers").find("li");
        devices.each((i, e) => {
            const img = $(e).find("img");
            result.push({
                id: $(e).find("a").attr("href").replace(".php", ""),
                name: $(e).find("span").html().split("<br>").join(" "),
                thumbnail: img.attr("src"),
                description: img.attr("title")
            });
        });
        return { result }; 
    } catch (error) {
        console.error(error);
        throw error;
    }
}