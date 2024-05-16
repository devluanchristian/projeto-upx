"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/http/controllers/create-account.controller.ts
var create_account_controller_exports = {};
__export(create_account_controller_exports, {
  createAccount: () => createAccount
});
module.exports = __toCommonJS(create_account_controller_exports);
var import_zod = require("zod");

// src/http/controllers/util/isValidCPF.ts
function isValidCPF(cpf) {
  cpf = cpf.replace(/[^\d]/g, "");
  if (cpf.length !== 11) {
    return false;
  }
  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = soma % 11;
  const digitoVerificador1 = resto < 2 ? 0 : 11 - resto;
  if (digitoVerificador1 !== parseInt(cpf.charAt(9))) {
    return false;
  }
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = soma % 11;
  const digitoVerificador2 = resto < 2 ? 0 : 11 - resto;
  if (digitoVerificador2 !== parseInt(cpf.charAt(10))) {
    return false;
  }
  return true;
}

// src/repositories/prisma/prisma-user-repository.ts
var import_client = require("@prisma/client");
var PrismaUserRepository = class extends import_client.PrismaClient {
  constructor() {
    super({
      log: ["warn", "error"]
    });
  }
  create(data) {
    return __async(this, null, function* () {
      const user = yield this.user.create({
        data
      });
      return user;
    });
  }
  findByCPF(CPF) {
    return __async(this, null, function* () {
      const user = yield this.user.findUnique({
        where: { CPF }
      });
      return user;
    });
  }
};

// src/use-cases/create-account-use-case.ts
var import_bcryptjs = require("bcryptjs");
var CreateAccountUseCase = class {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      name,
      CPF,
      password
    }) {
      const password_hash = yield (0, import_bcryptjs.hash)(password, 8);
      const cpfAlreadyExists = yield this.userRepository.findByCPF(CPF);
      if (cpfAlreadyExists) {
        throw new Error("CPF already exists");
      }
      const user = yield this.userRepository.create({
        name,
        CPF,
        password_hash
      });
      return { user };
    });
  }
};

// src/http/controllers/create-account.controller.ts
function createAccount(request, reply) {
  return __async(this, null, function* () {
    const createAccountBodySchema = import_zod.z.object({
      name: import_zod.z.string(),
      CPF: import_zod.z.string().refine((value) => isValidCPF(value), {
        message: "CPF inv\xE1lido"
      }),
      password: import_zod.z.string().min(8)
    });
    const { name, CPF, password } = createAccountBodySchema.parse(request.body);
    try {
      const userRepository = new PrismaUserRepository();
      const createAccountUseCase = new CreateAccountUseCase(userRepository);
      const { user } = yield createAccountUseCase.execute({
        name,
        CPF,
        password
      });
      reply.status(201).send(user);
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(400).send({ message: error.message });
      }
      reply.status(500).send({ error });
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createAccount
});
