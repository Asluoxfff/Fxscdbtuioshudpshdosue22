/*
  PLUGINS CJS REGMAIL
  YouTube : @krsna_081
  Ch Wa : https://whatsapp.com/channel/0029VaOQ0f3BA1f7HHV9DV1J
*/

const canvafy = require("canvafy");
const fsPromises = require('fs').promises;
const crypto = require("crypto");
const fetch = require('node-fetch');
const nodemailer = require('nodemailer');
let timeout = 300000; // Waktu tunggu untuk OTP
let maxAttempts = 3; // Batas maksimal percobaan OTP

let handler = async (m, { conn, command, text, usedPrefix }) => {
    conn.regmail = conn.regmail ? conn.regmail : {};
    let id = m.sender;
    let user = global.db.data.users[m.sender];
    
    if (user.registered === true) return conn.reply(m.chat, '*[ YOU ALREADY REGISTERED ]*', m);
    if (id in conn.regmail) {
        conn.reply(m.chat, '*❗Selesaikan registrasi email ini terlebih dahulu!*', conn.regmail[id].reply);
        return;
    }
    
    if (!text) return m.reply(`*• Example :* ${usedPrefix}${command} akiraacntik001@gmail.com`);
    
    let email = text.trim();
    if (!isValidEmail(email)) return m.reply(`*• Example :* ${usedPrefix}${command} akiraacntik001@gmail.com`);

    let generateOTP = Array.from({ length: 4 }, generateRandomCharacter).join('');
    let avatar = await conn.profilePictureUrl(m.sender, 'image').catch(_ => "https://telegra.ph/file/d3ac1a2ec44371fd44160.png");

    try {
        await kirimVerifikasi({
            penerima: email,
            title: 'Verifikasi ALUXI - MD WhatsApp',
            kodeVerifikasi: generateOTP,
            wm: wm,
            expiryMessage: `Kode ini akan kedaluwarsa dalam 5 menit.`,
            ignoreMessage: `Jika kamu tidak meminta kode ini, abaikan email ini.`,
            imageURL: avatar
        });
    } catch (error) {
        throw '*Gagal mengirim email. Coba lagi nanti.*';
    }

    conn.regmail[id] = {
        otp: generateOTP,
        email: email,
        attempts: 0,
        maxAttempts: maxAttempts,
        time: Date.now(),
        reply: m
    };

    let caption = `Kode OTP telah dikirim ke email: ${email}.\nSilakan cek email Anda dan masukkan OTP Anda disini.`;
    conn.reply(m.chat, caption, fstatus('_Process Verifikasi_'));

    setTimeout(() => {
        if (id in conn.regmail && Date.now() - conn.regmail[id].time >= timeout) {
            conn.reply(m.chat, '*Kode OTP kadaluarsa, registrasi gagal!*', m);
            delete conn.regmail[id];
        }
    }, timeout);
};

handler.before = async (m, { conn }) => {
    conn.regmail = conn.regmail ? conn.regmail : {};
    let id = m.sender;
    if (!conn.regmail[id]) return;
    if (!m.text) return;
    
    let { otp, attempts, maxAttempts, email } = conn.regmail[id]; // Pastikan destructuring sesuai dengan nama variabel
    if (m.text.trim() === otp) {
        let user = global.db.data.users[m.sender];
        let newId = await Func.makeId(25);
        user.email = conn.regmail[m.sender].email;
        user.regTime = +new Date();
        user.registered = true;
        user.sn = "Ak-" + newId;
        
        let capt = `*± R E G I S T E R - S U C C E S S*
*• Email :* ${email}
*• Number :* ${m.sender.split("@")[0]}
*• Age :* 0
*• Serial ID :* Sent in private chat

Terima kasih telah melakukan verifikasi di AkiraaBot, data pengguna telah disimpan dengan aman di database bot. Semoga ke depannya AkiraaBot lebih baik dari sebelumnya.`;

        let sn = "AK-" + newId;
        await conn.reply(m.sender, `*ID :* ${sn}\n\n*Don't lose/delete your ID code*`, fkontak);
        let pp = await conn.profilePictureUrl(m.sender, "image")
      .catch((_) => "https://telegra.ph/file/d3ac1a2ec44371fd44160.png");
        let p = await new canvafy.Security()
            .setAvatar(pp)
            .setBackground("image", "https://telegra.ph/file/1ae9a16f5f38b7bf3e548.jpg")
            .setCreatedTimestamp(Date.now())
            .setSuspectTimestamp(1)
            .setBorder("#f0f0f0")
            .setLocale("id")
            .setAvatarBorder("#f0f0f0")
            .setOverlayOpacity(0.7)
            .build();
        
        await conn.sendFile(m.chat, p, '', capt, m);
        delete conn.regmail[m.sender]; // Hapus proses verifikasi setelah sukses
    } else {
        conn.regmail[m.sender].attempts = attempts + 1;

        if (conn.regmail[m.sender].attempts >= maxAttempts) {
            conn.reply(m.chat, '*❌ Kode OTP salah terlalu banyak. Proses registrasi dibatalkan.*', m);
            delete conn.regmail[m.sender];
        } else {
            conn.reply(m.chat, `*❌ Kode OTP salah. Sisa percobaan: ${maxAttempts - conn.regmail[id].attempts}.*`, m);
        }
    }
};

handler.help = ['regmail'].map((a) => a + " *[email]*");
handler.tags = ['info'];
handler.command = /^regmail$/i;
handler.private = false;
module.exports = handler;

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function generateRandomCharacter() {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return characters[Math.floor(Math.random() * characters.length)];
}

async function kirimVerifikasi({ penerima, title, content, kodeVerifikasi, wm, expiryMessage, ignoreMessage, imageURL }) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bbcb123c@gmail.com', // ( ganti dengan email google kalian )
            pass: 'vtdh qtrx zjzu mava', // ( bukan password akun google kalian, tapi password A2f akun Klian. tutor lebih lengkapnya ada di yt "how to get google app password" )
        },
    });

    const emailHTML = `
<div style="font-family: 'Roboto', sans-serif; background-color: #f4f7f9; padding: 30px; max-width: 600px; margin: auto; border-radius: 12px; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);">
    <div style="background: #ffffff; border-radius: 15px; overflow: hidden;">
        <div style="background-image: url('${imageURL}'); background-size: cover; background-position: center; padding: 60px 20px; text-align: center;"></div>
        <div style="padding: 40px 30px;">
            <p style="font-size: 18px; color: #333333; margin-bottom: 15px;">${ucapan} ${penerima}</p>
            <p style="font-size: 16px; color: #666666; margin-bottom: 30px;">Terima kasih telah melakukan Verifikasi di AkiraaBot, Harap gunakan kode Verifikasi ~> [ ${kodeVerifikasi} ] <~ untuk menyelesaikan Verifikasi Anda. Atau bisa juga dengan mengklik tombol di bawah ini :</p>
            <div style="background-color: #FF6F61; color: #ffffff; padding: 10px; text-align: center; font-size: 16px; font-weight: bold; border-radius: 7px;">
                <a href="https://wa.me/62858959880450?text=${kodeVerifikasi}" style="color: #ffffff; text-decoration: none;">Click Here</a>
            </div>
            <p style="font-size: 14px; color: #999999; margin-top: 20px;">${expiryMessage}</p>
            <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0;">
            <p style="font-size: 14px; color: #999999;">${ignoreMessage}</p>
            <p style="font-size: 14px; color: #999999; text-align: center; margin-top: 30px;">
                <a href="https://wa.me/6281235807940" style="color: #FF6F61; text-decoration: none; font-weight: 600;">${wm}</a>
            </p>
        </div>
    </div>
</div>`;


    const mailOptions = {
        from: `"ALVIAN UXIO" <bbcb123c@gmail.com>`, // ( ganti email google kalian mulai dari "<akiraa@gmail.com>" sesuai sendiri )
        to: penerima,
        subject: title,
        html: emailHTML,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log('Email berhasil terkirim:', info.response);
}