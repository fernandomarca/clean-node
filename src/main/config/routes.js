const router = require('express').Router()
const { readdirSync } = require('fs')

module.exports = app => {
  app.use('/api', router)
  readdirSync(`${__dirname}/../routes`).map(async file => {
    if (!file.includes('.test.')) {
      (await require(`../routes/${file}`))(router)
    }
  })
}
