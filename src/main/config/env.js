const mongoUrl = process.env.MONGO_URL || `mongo://mongo:27017/clean-node`

const tokenSecret = process.env.TOKEN_SECRET || 'secret'

const port = process.env.PORT || 3333

module.exports = { mongoUrl, tokenSecret, port }
