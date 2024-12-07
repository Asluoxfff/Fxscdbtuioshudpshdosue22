const axios = require('axios');
const cheerio = require('cheerio');

const extractData = ($, selector, attr = 'text') => {
    return $(selector).map((_, el) => attr === 'text' ? $(el).text().trim() : $(el).attr(attr)).get();
};

const an1 = async (query) => {
    const url = `https://an1.com/tags/MOD/?story=${encodeURIComponent(query)}&do=search&subaction=search`;
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const selectors = {
            nama: 'body > div.page > div > div > div.app_list > div > div > div.cont > div.data > div.name > a > span',
            rating: 'div > ul > li.current-rating',
            developer: 'body > div.page > div > div > div.app_list > div > div > div.cont > div.data > div.developer.xsmf.muted',
            thumb: 'body > div.page > div > div > div.app_list > div > div > div.img > img',
            link: 'body > div.page > div > div > div.app_list > div > div > div.cont > div.data > div.name > a'
        };

        const results = Object.keys(selectors).reduce((acc, key) => {
            acc[key] = extractData($, selectors[key], key === 'link' ? 'href' : 'text');
            return acc;
        }, {});

        const format = results.link.map((_, i) => ({
            judul: results.nama[i] || 'N/A',
            dev: results.developer[i] || 'N/A',
            rating: results.rating[i] || 'N/A',
            thumb: results.thumb[i] || 'N/A',
            link: results.link[i] || 'N/A'
        }));

        return {
            creator: "avosky",
            data: format
        };
    } catch (error) {
        throw new Error('Data retrieval failed');
    }
};

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text.trim()) return m.reply(`Masukkan kata kunci yang ingin dicari, misalnya: ${usedPrefix}${command} pou`);

    try {
        const result = await an1(text);

        if (result.data.length === 0) {
            m.reply('Tidak ada hasil.');
        } else {
            const response = result.data.reduce((msg, item, index) => (
                `${msg}${index + 1}. Judul: ${item.judul}\nDeveloper: ${item.dev}\nRating: ${item.rating}\nLink: ${item.link}\nThumbnail: ${item.thumb}\n\n`
            ), `Hasil pencarian dari an1 untuk: ${text}\n\n`);

            m.reply(response);
        }
    } catch (error) {
        m.reply('Terjadi kesalahan.');
    }
};

handler.help = ["an1"];
handler.tags = ["search"];
handler.command = ["an1"];

module.exports = handler;