const { BingImageCreator } = require("../scrape/bingimg.js");

const handler = async (m, { conn, args, usedPrefix, command }) => {
  let text;
  if (args.length >= 1) {
    text = args.slice(0).join(" ");
  } else if (m.quoted && m.quoted.text) {
    text = m.quoted.text;
  } else {
    throw "*• Example:* .bingimg 1girl";
  }

  await m.reply("Please wait...");
  try {
    const res = new BingImageCreator({
      cookie: `18YhijO2zxo9nNPIIoixcWIv_0Q49ggTEz7klMcqHXD2d0bzceziRytHnO6d_qkTSNCZVig83ujX4F55nCUDCxfECttyC0Aj4YGVaXXTjNgqhMsmmyknMR7my8n2tDXn1iaHQagbzOMvIXxeJF7a3Cj-AXs7RcJ9KWEidYizi_vMcGAvs7DVYbY5t2Nf6-VqaV5g92bDPjF4SW4lX--H1Lw`,
    });
    const data = await res.createImage(text);

    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        try {
          if (!data[i].endsWith(".svg")) {
            await conn.sendFile(
              m.chat,
              data[i],
              "",
              `Image *(${i + 1}/${data.length})*\n\n*Prompt*: ${text}`,
              m,
              false,
              { mentions: [m.sender] },
            );
          }
        } catch (error) {
          console.error(`Error sending file: ${error.message}`);
          await m.reply(`Failed to send image *(${i + 1}/${data.length})*`);
        }
      }
    } else {
      await m.reply("No images found.");
    }
  } catch (error) {
    console.error(`Error in handler: ${error.message}`);
    await m.reply(`${error}\n\n${error.message}`);
  }
};

handler.help = ["bingimg"].map((a) => a + " *[prompt]*");
handler.tags = ["ai"];
handler.command = ["bingimg", "bingimg2"];
handler.register = true;

module.exports = handler;