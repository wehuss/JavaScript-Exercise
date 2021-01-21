const axios = require('axios')
// 文件操作
const fs = require('fs')
// DOM操作
const cheerio = require('cheerio')

const url = 'https://www.liepin.com/zhaopin/?init=-1&headckid=0417b67c8d823dcb&fromSearchBtn=2&sfrom=click-pc_homepage-centre_searchbox-search_new&ckid=0417b67c8d823dcb&degradeFlag=0&key=%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91&siTag=D_7XS8J-xxxQY6y2bMqEWQ%7EfA9rXquZc5IkJpXC-Ycixw&d_sfrom=search_fp&d_ckId=466b672969a37b2deaf20975f4b05e7c&d_curPage=0&d_pageSize=40&d_headId=466b672969a37b2deaf20975f4b05e7c&curPage=';

const jobList = []
for (let i = 0; i <= 9; i++) {
  axios.get(`${url}${i}`).then(res => {
    $ = cheerio.load(res.data.toString())
    $('.sojob-list').find('.sojob-item-main').each(i => {
      let job = {}
      job['职位名称'] = $('.sojob-item-main').eq(i).find('.job-info h3 a').text()
      job['公司名称'] = $('.sojob-item-main').eq(i).find('.company-info .company-name a').text()
      jobList.push(job)
    })
    // console.log('jobList', jobList)
    fs.writeFile(`./nodejs-reptile/jobList.json`, JSON.stringify(jobList), err => {
      console.log(err)
    })
  })
}
