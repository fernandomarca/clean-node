const express = require("express");
const router = express.Router();

module.exports = () => {
  const router = new SignUpRouter();
  router.post("/signup", ExpressRouterAdapter.adapt(router));
};

class ExpressRouterAdapter {
  static adapt(router) {
    return async (req, res) => {
      const httpRequest = {
        body: req.body,
      };
      const httpResponse = await router.route(httpRequest);
      res.status(httpResponse.statusCode).json(httpResponse.body);
    };
  }
}

// signup-route = //Presentation
class SignUpRouter {
  async route(httpRequest) {
    const { email, password, repeatPassword } = httpRequest.body;
    const user = new SignUpUseCase().signUp(email, password, repeatPassword);
    return {
      statusCode: 200,
      body: user,
    };
  }
}

// signup-usecase //regras de negocio = Domain
class SignUpUseCase {
  async signUp(email, password, repeatPassword) {
    if (password === repeatPassword) {
      new AddAccountRepository().add(email, password);
    }
  }
}

// add-account-repo // Infra
class AddAccountRepository {
  async add(email, password) {
    const user = await AccountModel.create({ email, password });
    return user;
  }
}

//docker build -t clean-node
//docker image rm <id>
//docker images -a
//docker run -it clean-node sh
//docker run -p 5000:5000 clean-node
//docker-compose up -d