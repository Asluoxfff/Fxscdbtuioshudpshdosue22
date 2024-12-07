const ytdl = require("ytdl-core");
const yts = require("yt-search");
const fs = require("fs");
const { pipeline } = require("stream");
const { promisify } = require("util");
const streamPipeline = promisify(pipeline);
const os = require("os");
// Concatenate all cookies into one string
const cookies = [
  "PREF=f6=40000000&tz=Asia.Jakarta",
  "GPS=1",
  "__Secure-1PSIDTS=sidts-CjEBQT4rXz6TAs_mRFseJrISrEJp4lz7uVweL8olgkm01sacfvzV2ZAS8FyYbH9bod1xEAA",
  "__Secure-3PSIDTS=sidts-CjEBQT4rXz6TAs_mRFseJrISrEJp4lz7uVweL8olgkm01sacfvzV2ZAS8FyYbH9bod1xEAA",
  "HSID=A5mo6X-WJTWaobr3w",
  "SSID=AmFBx8BK0_r4oS7jd",
  "APISID=pE4TPH85ZvkGxU1r/AI8ySF2W7dcVb6aE2",
  "SAPISID=GIDkZjblv59ZiLLG/AkQe1CVIE20amJ93k",
  "__Secure-1PAPISID=GIDkZjblv59ZiLLG/AkQe1CVIE20amJ93k",
  "__Secure-3PAPISID=GIDkZjblv59ZiLLG/AkQe1CVIE20amJ93k",
  "SID=g.a000pggvNEL1S1ctt-rxBF2NmSvZBFqUqe3zG3INaMpt8Rl28RcFldP-LrpRlQ4bRpwoTVY54gACgYKASwSARMSFQHGX2Mi1jEp4vEYLqTUOr2bKlTMURoVAUF8yKryWmBeI6N0BcQEx7IwM_-x0076",
  "__Secure-1PSID=g.a000pggvNEL1S1ctt-rxBF2NmSvZBFqUqe3zG3INaMpt8Rl28RcFzFb34QPlphj4IdP4pLPHLAACgYKAZ8SARMSFQHGX2MiT-zcKhj5v0M9IFkH985iIhoVAUF8yKp7qKK99sJMo0R0PexEFuiy0076",
  "__Secure-3PSID=g.a000pggvNEL1S1ctt-rxBF2NmSvZBFqUqe3zG3INaMpt8Rl28RcF5cfzF-E1BFVlW9lJXcyV_wACgYKAdYSARMSFQHGX2Mi8ofjQzoJ-RwU_pstl44c1hoVAUF8yKrsTDkecHtOTsJgA-wAjtax0076",
  "LOGIN_INFO=AFmmF2swRQIhAMPAlhSoN4Ee0O2gKtiTS7N7azsbsN5MGVl0DKCwmmn8AiBE_xRKrT0lStBlDwyYspJuP9n5duZiwNofKof8LfUpQw:QUQ3MjNmeUlBTTFnbldNX09SWExtR3U0TnJ2MXFIMjBKYXZtQ3Q5UzVUTy1yVkJtdUV2SHhJZHprZ1RpVmhVb241dDYtNUhSTmtGOG1tVU5nYXRhZC1KbGJsSTUtVTNqN2o2QkFUTC15WE9lYjlaTHlIYXJYaHRMU3FibF9SRTlNTGJTLXhlYm01MVFCNVU1SERwTTIyV3VGYXFDZUdEWTRn",
  "SIDCC=AKEyXzXYUEeUsHin4sKauST_c-t4NQZyzOxxjq0KcIqsCa7Y3b1zlMosbS2q0cTpkmnALXCPGg",
  "__Secure-1PSIDCC=AKEyXzUleDhMuw283WsqaLlq88t3RzQTtPlbBCHqaYfQh4MjUbDA5gvQdFVE1zzxhAaOZW_X",
  "__Secure-3PSIDCC=AKEyXzUq08KA4_5Rn0fbSEMn_G4GWIvhInPjUqGYVjl2IL76hFI7v9t0617EvThfsKr4LB0iyQ"
].join('; ');

const handler = async (m, { conn, command, text, usedPrefix }) => {
  conn.play = conn.play || {};
  if (!text) throw `*• Example :* ${usedPrefix + command} *[query]*`;
  m.reply("Processing...");

  let url;

  try {
    const search = await yts(text);
    if (!search) throw "Not Found, Try Another Title";
    const vid = search.videos[0];
    const { title, thumbnail, views, ago, url: videoUrl, seconds } = vid;

    if (seconds > 3600) {
      return m.reply("Duration too long. Please choose a video under 1 hour.");
    }

    url = videoUrl;
    const caption = `Title: ${title}\nViews: ${views}\nUploaded: ${ago}\nDuration: ${seconds} seconds\nThumbnail: ${thumbnail}\nYouTube URL: ${videoUrl}`;
    m.reply(caption);

    try {
      const audioStream = ytdl(videoUrl, {
        filter: "audioonly",
        quality: "highestaudio",
        requestOptions: {
          headers: {
            cookie: cookies,
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'accept-language': 'en-US,en;q=0.9',
            'referer': 'https://www.youtube.com/'  // Menambahkan referer untuk validasi
          }
        }
      });

      const tmpDir = os.tmpdir();
      const filePath = `${tmpDir}/${title}.mp3`;
      const writableStream = fs.createWriteStream(filePath);

      await streamPipeline(audioStream, writableStream);

      let doc = {
        audio: { url: filePath },
        mimetype: "audio/mp4",
        fileName: title,
        contextInfo: {
          externalAdReply: {
            showAdAttribution: true,
            mediaType: 2,
            mediaUrl: videoUrl,
            title: title,
            sourceUrl: videoUrl,
            thumbnail: (await conn.getFile(thumbnail)).data,
          },
        },
      };

      await conn.sendMessage(m.chat, doc, { quoted: m });

      fs.unlink(filePath, (err) => {
        if (err) console.error(`Failed to delete audio file: ${err}`);
        else console.log(`Deleted audio file: ${filePath}`);
      });
    } catch (downloadError) {
      console.error("Download error:", downloadError);
      m.reply(`Failed to download audio. Error detail: ${downloadError.message}`);
    }

  } catch (error) {
    console.error("Error during processing:", error);
    m.reply(`An error occurred: ${error.message}`);
  }
};

handler.help = ["play3 *[query]*"];
handler.tags = ["downloader"];
handler.command = /^(play3)$/i;

module.exports = handler;