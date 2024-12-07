const axios = require("axios");

let handler = async (m, { conn, text }) => {
  
m.reply(".akiraa tidak tersedia\n\nmungkin maksud mu .aluxi")
};
handler.command = ["akiraa"];
handler.tags = ["ai"];
handler.help = ["akiraa"].map((a) => a + " *[on/off]*");

module.exports = handler;