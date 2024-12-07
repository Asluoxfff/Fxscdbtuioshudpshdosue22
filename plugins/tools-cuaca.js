let axios = require ("axios")

let handler = async (m, { args }) => {
  if (!args[0]) throw " please provide place or location name"
  try {
    const response = axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${args}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273`
    )
    const res = await response
    const name = res.data.name
    const Country = res.data.sys.country
    const Weather = res.data.weather[0].description
    const Temperature = res.data.main.temp + "°C"
    const Minimum_Temperature = res.data.main.temp_min + "°C"
    const Maximum_Temperature = res.data.main.temp_max + "°C"
    const Humidity = res.data.main.humidity + "%"
    const Wind = res.data.wind.speed + "km/h"
    const wea = `「 Tempat 」 : ${name}\n「 Negara 」 : ${Country}\n「 Cuaca 」 : ${Weather}\n「 Suhu 」 : ${Temperature}\n「 Suhu Minimum 」 : ${Minimum_Temperature}\n「 Suhu Maksimal 」 : ${Maximum_Temperature}\n「 Kelembaban 」 : ${Humidity}\n「 🌬️ 」 Wind: ${Wind}
  `

    m.reply(wea)
  } catch (e) {
    return m.reply("Error location not found!!!")
  }
}

handler.help = ['weather']
handler.tags = ['tools']

handler.command = /^(weather|cuaca)$/i

module.exports = handler