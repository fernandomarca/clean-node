const MongoHelper = require('../infra/helpers/mongo-helper')
const { mongoUrl, port } = require('./config/env')

MongoHelper.connect(mongoUrl)
  .then(() => {
    const app = require('./config/app')

    app.listen(port, () => console.log(`🚀 server running at http://localhost:${port}`))
  })
  .catch(console.error)
