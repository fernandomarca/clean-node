const LoginRouter = require('../../presentation/routers/login-router')
const AuthUseCase = require('../../domain/usecases/auth-usecase')
const EmailValidator = require('../../utils/helpers/email-validator')
const LoadUserByEmailRepository = require('../../infra/repositories/load-user-by-email-repository')
const UpdateAccessTokenRepository = require('../../infra/repositories/update-access-token-repository')
const Encrypter = require('../../utils/helpers/encrypter')
const TokenGenerator = require('../../utils/helpers/tokenGenerator')
const env = require('../config/env')
module.exports = class LoginRouterComposer {
  static compose () {
    // helpers
    const encrypter = new Encrypter()
    const tokenGenerator = new TokenGenerator(env.tokenSecret)
    const emailValidator = new EmailValidator()
    // repositories
    const loadUserByEmailRepository = new LoadUserByEmailRepository()
    const updateAccessTokenRepository = new UpdateAccessTokenRepository()
    // useCases
    const authUseCase = new AuthUseCase({
      loadUserByEmailRepository,
      updateAccessTokenRepository,
      encrypter,
      tokenGenerator
    })
    // Router
    return LoginRouter({ authUseCase, emailValidator })
  }
}
