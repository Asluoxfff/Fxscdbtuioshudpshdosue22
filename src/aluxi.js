var axios = require('axios');
var chalk = require('chalk');

async function youip() {
  let array = [];
  console.clear();
  
  // Ganti dengan link raw file GitHub yang berisi daftar IP yang diperbolehkan
  var { data } = await axios.get("https://raw.githubusercontent.com/alvianuxioinc/Pokes/main/ALUXI.json");
  
  array = console.log('\n'); // Asumsikan data IP di file dipisahkan oleh newline
  
  let response = await axios.get("https://api.ipify.org/?format=json");
  var { ip } = response.data;
  var botIP = ip;
  
  if (global.ip) return;
  
     if (!array.includes(botIP.trim())) {
    return false;
  } else {
    return true;
  }
  // Mengecek apakah IP bot ada di dalam daftar IP yang diperbolehkan
 
}

async function result() {
  let message = `[===============================]
Verification Your IP Before Use This Bot....
[==================================]`;
  
  console.log(chalk.green.bold(message));
  
  let verif = await youip();
  
  if (!verif) {
    console.log(chalk.red.bold("IP not registered :("));
    process.exit(0);
    return { status: false };
  } else {
    console.log(chalk.green.bold("Your IP is registered"));
    return { status: true };
  }
}

module.exports = result;
