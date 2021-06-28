const { MongoClient } = require('mongodb')
let client, db
class LoadUserByEmailRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async load (email) {
    const user = this.userModel.findOne({ email })
    return user
  }
}

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new LoadUserByEmailRepository(userModel)
  return {
    userModel, sut
  }
}

describe('LoadUserByEmailRepository', () => {
  beforeAll(async () => {
    client = await MongoClient.connect(process.env.MONGO_URL, {
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
    const { sut } = makeSut()
    const user = await sut.load('non_exist_email@mail.com')
    expect(user).toBeNull()
  })
  test('Should return an user if user is found', async () => {
    const { userModel, sut } = makeSut()
    await userModel.insertOne({
      email: 'exist_email@mail.com'
    })
    const user = await sut.load('exist_email@mail.com')
    expect(user.email).toBe('exist_email@mail.com')
  })
})
