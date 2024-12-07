let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text.trim()) return m.reply(`Masukkan kata kunci yang ingin dicari, misalnya: ${usedPrefix}${command} pou`);    
    
    const axios = require('axios');
    const cheerio = require('cheerio');

    const extractData = ($, selector, attr = 'text') => {
        return $(selector).map((_, el) => attr === 'text' ? $(el).text().trim() : $(el).attr(attr)).get();
    };

    const liteapks = async (query) => {
        // Ganti URL dengan parameter yang sesuai untuk liteapks.com
        const url = `https://liteapks.com/?s=${encodeURIComponent(query)}`;
        try {
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);

            const selectors = {
                nama: 'h2.entry-title > a', // Update selector sesuai dengan struktur halaman pencarian
                rating: 'div.meta-rating',   // Update selector sesuai dengan struktur halaman pencarian
                developer: 'div.meta-developer', // Update selector sesuai dengan struktur halaman pencarian
                thumb: 'div.entry-thumbnail > img', // Update selector sesuai dengan struktur halaman pencarian
                link: 'h2.entry-title > a'
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

    try {
        const result = await liteapks(text);

        if (result.data.length === 0) {
            m.reply('Tidak ada hasil.');
        } else {
            const response = result.data.reduce((msg, item, index) => (
                `${msg}${index + 1}. Judul: ${item.judul}\nDeveloper: ${item.dev}\nRating: ${item.rating}\nLink: ${item.link}\nThumbnail: ${item.thumb}\n\n`
            ), `Hasil pencarian dari liteapks untuk: ${text}\n\n`);

            m.reply(response);
        }
    } catch (error) {
        m.reply('Terjadi kesalahan.');
    }
};

handler.help = ["liteapks"]
handler.tags = ["internet"]
handler.command = ["liteapks"]

module.exports = handler;