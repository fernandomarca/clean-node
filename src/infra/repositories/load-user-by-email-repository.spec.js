const { MongoClient } = require('mongodb')
class LoadUserByEmailRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async load (email) {
    const user = this.userModel.findOne({ email })
    return user
  }
}

describe('LoadUserByEmailRepository', () => {
  let client, db
  beforeAll(async () => {
    const client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    db = client.db()
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })

  afterAll(async () => {
    await client.close()
  })

  test('Should return null if no user is found', async () => {
    const userModel = await db.collection('users')
    const sut = new LoadUserByEmailRepository(userModel)
    const user = await sut.load('non_exist_email@mail.com')
    expect(user).toBeNull()
  })
  test('Should return an user if user is found', async () => {
    const userModel = await db.collection('users')
    await userModel.insertOne({
      email: 'exist_email@mail.com'
    })
    const sut = new LoadUserByEmailRepository(userModel)
    const user = await sut.load('exist_email@mail.com')
    expect(user.email).toBe('exist_email@mail.com')
  })
})
