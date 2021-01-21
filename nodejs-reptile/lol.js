const axios = require('axios')

const fs = require('fs')

const cheerio = require('cheerio')

const url = 'https://wall.alphacoders.com/by_sub_category.php?id=169908&name=%E8%8B%B1%E9%9B%84%E8%81%94%E7%9B%9F+%E5%A3%81%E7%BA%B8&lang=Chinese&page='

const baseUrl = 'https://wall.alphacoders.com/'

async function getImages(index) {
  const imagesUrl = []
  await axios.get(url + index).then(res => {
    $ = cheerio.load(res.data.toString())
    const length = $('.boxgrid').length;
    for (let i = 0; i < length; i++) {
      let url = $('.boxgrid').eq(i).find("a").attr("href")
      imagesUrl.push(`${baseUrl}${url}`)
    }
  })
  fs.mkdir(`./images/${index}`, err => { })
  await imagesUrl.forEach(url => {
    axios.get(url).then(res => {
      $ = cheerio.load(res.data.toString())
      let picUrl = $('.img-container-desktop a').attr('href')
      axios.get(picUrl, {
        responseType: 'arraybuffer'
      }).then(res => {
        fs.writeFile(`images/${index}/${new Date().getTime()}.jpg`, res.data, err => console.log(err))
      })
    })
  })
}
async function init() {
  for (let i = 1; i <= 144; i++) {
    await getImages(i)
  }
}
init()


