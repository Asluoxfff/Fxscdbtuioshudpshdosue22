const { Prodia } = require("prodia.js");
const apiKey = "df165bab-9893-4f02-92bf-e8b09592b43a";
const prodia = new Prodia(apiKey);

async function generateImage(params) {
  const generate = await prodia.generateImage(params);

  while (generate.status !== "succeeded" && generate.status !== "failed") {
    await new Promise((resolve) => setTimeout(resolve, 250));

    const job = await prodia.getJob(generate.job);

    if (job.status === "succeeded") {
      return job;
    }
  }
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `• *Example :* ${usedPrefix + command} 1girl`;
  m.reply(wait);
  try {
    const generateImageParams = {
      prompt: text,
      model: conn.txt2img,
      sampler: "DPM++ SDE Karras",
      cfg_scale: 7,
      steps: 25,
      width: 736,
      height: 1308,
    };
    let txt2img = await generateImage(generateImageParams);
    conn.sendMessage(
      m.chat,
      {
        image: {
          url: txt2img.imageUrl,
        },
        caption: `*Text To Generate Image*\n\n*Prompt:* ${text}\n*Model:* ${conn.txt2img}`,
      },
      {
        quoted: m,
      },
    );
  } catch (e) {
    m.reply(error);
  }
};
handler.help = ["txt2img"].map((a) => a + " *[prompt]*");
handler.tags = ["ai"];
handler.command = ["txt2img"];
module.exports = handler;
