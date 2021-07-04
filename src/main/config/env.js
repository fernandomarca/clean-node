const dotenv = require('dotenv')
const result = dotenv.config()

if (result.error) {
  throw result.error
}

const { parsed: envs } = result
// console.log(envs)

const mongoUrl = process.env.MONGO_URL || `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.kofp7.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`

const tokenSecret = process.env.TOKEN_SECRET || 'secret'

const port = process.env.PORT || 3333

module.exports = { envs, mongoUrl, tokenSecret, port }
