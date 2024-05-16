"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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

// src/app.ts
var import_fastify = __toESM(require("fastify"));

// src/http/controllers/create-account.controller.ts
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

// src/http/controllers/authenticate-account.controller.ts
var import_zod2 = require("zod");

// src/use-cases/authenticate-account-use-case.ts
var import_bcryptjs2 = require("bcryptjs");
var AuthenticateAccountUseCase = class {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      CPF,
      password
    }) {
      const user = yield this.userRepository.findByCPF(CPF);
      if (!user) {
        throw new Error("Credencias invalidas");
      }
      const doesPasswordMatches = yield (0, import_bcryptjs2.compare)(password, user.password_hash);
      if (!doesPasswordMatches) {
        throw new Error("Credencias invalidas");
      }
      return {
        user
      };
    });
  }
};

// src/http/controllers/authenticate-account.controller.ts
function authenticateAccount(request, reply) {
  return __async(this, null, function* () {
    const authenticateAccountBodySchema = import_zod2.z.object({
      CPF: import_zod2.z.string().refine((value) => isValidCPF(value), {
        message: "CPF inv\xE1lido"
      }),
      password: import_zod2.z.string().min(8)
    });
    const { CPF, password } = authenticateAccountBodySchema.parse(request.body);
    try {
      const userRepository = new PrismaUserRepository();
      const authenticateAccountUseCase = new AuthenticateAccountUseCase(
        userRepository
      );
      const { user } = yield authenticateAccountUseCase.execute({
        CPF,
        password
      });
      reply.status(200).send({ message: `Ol\xE1 ${user.name}, voc\xEA est\xE1 logado` });
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(400).send({ message: error.message });
      }
      reply.status(500).send({ error });
    }
  });
}

// src/http/controllers/create-equipment.controller.ts
var import_zod3 = require("zod");

// src/use-cases/create-equipment-use-case.ts
var CreateEquipmentUseCase = class {
  constructor(equipmentRepository) {
    this.equipmentRepository = equipmentRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      name,
      currentInstallationDate,
      nextManutentionDate,
      location,
      serialNumber
    }) {
      const equipment = yield this.equipmentRepository.create({
        name,
        status: true,
        currentInstallationDate,
        nextManutentionDate,
        location,
        serialNumber
      });
      return { equipment };
    });
  }
};

// src/repositories/prisma/prisma-equipment-repository.ts
var import_client2 = require("@prisma/client");
var PrismaEquipmentRepository = class extends import_client2.PrismaClient {
  constructor() {
    super({
      log: ["warn", "error"]
    });
  }
  create(data) {
    return __async(this, null, function* () {
      const equipment = yield this.equipment.create({
        data
      });
      return equipment;
    });
  }
  findById(id) {
    return __async(this, null, function* () {
      const equipment = yield this.equipment.findUnique({
        where: { id }
      });
      return equipment;
    });
  }
  save(id, data) {
    return __async(this, null, function* () {
      const editedEquipment = yield this.equipment.update({
        where: { id },
        data
      });
      return editedEquipment;
    });
  }
  delete(id) {
    return __async(this, null, function* () {
      yield this.equipment.delete({
        where: { id }
      });
    });
  }
};

// src/http/controllers/create-equipment.controller.ts
function createEquipment(request, reply) {
  return __async(this, null, function* () {
    const createEquipmentBodySchema = import_zod3.z.object({
      name: import_zod3.z.string(),
      status: import_zod3.z.boolean(),
      nextManutentionDate: import_zod3.z.string(),
      currentInstallationDate: import_zod3.z.string(),
      location: import_zod3.z.string(),
      serialNumber: import_zod3.z.string()
    });
    const {
      name,
      currentInstallationDate,
      location,
      nextManutentionDate,
      serialNumber,
      status
    } = createEquipmentBodySchema.parse(request.body);
    try {
      const repositories = new PrismaEquipmentRepository();
      const createEquipmentUseCase = new CreateEquipmentUseCase(repositories);
      const { equipment } = yield createEquipmentUseCase.execute({
        name,
        currentInstallationDate,
        location,
        nextManutentionDate,
        serialNumber,
        status
      });
      reply.status(201).send(equipment);
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(400).send({ message: error.message });
      }
      reply.status(500).send({ error });
    }
  });
}

// src/http/controllers/edit-equipment.controller.ts
var import_zod4 = require("zod");

// src/use-cases/edit-equipment-use-case.ts
var EditEquipmentUseCase = class {
  constructor(equipmentRepository) {
    this.equipmentRepository = equipmentRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      equipmentId,
      name,
      currentInstallationDate,
      nextManutentionDate,
      location,
      status,
      serialNumber
    }) {
      const equipment = yield this.equipmentRepository.findById(equipmentId);
      if (!equipment) {
        throw new Error("Equipment not found");
      }
      equipment.name = name;
      equipment.currentInstallationDate = new Date(currentInstallationDate);
      equipment.nextManutentionDate = new Date(nextManutentionDate);
      equipment.location = location;
      equipment.serialNumber = serialNumber;
      equipment.updated_at = /* @__PURE__ */ new Date();
      if (status) {
        equipment.status = true;
      } else {
        equipment.status = false;
      }
      const editedEquipment = yield this.equipmentRepository.save(
        equipmentId,
        equipment
      );
      return { editedEquipment };
    });
  }
};

// src/http/controllers/edit-equipment.controller.ts
function editEquipment(request, reply) {
  return __async(this, null, function* () {
    const editEquipmentBodySchema = import_zod4.z.object({
      name: import_zod4.z.string(),
      status: import_zod4.z.boolean(),
      nextManutentionDate: import_zod4.z.string(),
      currentInstallationDate: import_zod4.z.string(),
      location: import_zod4.z.string(),
      serialNumber: import_zod4.z.string()
    });
    const getEquipmentSchema = import_zod4.z.object({
      equipmentId: import_zod4.z.string()
    });
    const { equipmentId } = getEquipmentSchema.parse(request.params);
    const {
      name,
      currentInstallationDate,
      location,
      nextManutentionDate,
      serialNumber,
      status
    } = editEquipmentBodySchema.parse(request.body);
    try {
      const repositories = new PrismaEquipmentRepository();
      const editEquipmentUseCase = new EditEquipmentUseCase(repositories);
      const { editedEquipment } = yield editEquipmentUseCase.execute({
        equipmentId,
        name,
        currentInstallationDate,
        location,
        nextManutentionDate,
        serialNumber,
        status
      });
      reply.status(201).send(editedEquipment);
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(400).send({ message: error.message });
      }
      reply.status(500).send({ error });
    }
  });
}

// src/http/controllers/delete-equipment.controller.ts
var import_zod5 = require("zod");

// src/use-cases/delete-equipment-use-case.ts
var DeleteEquipmentUseCase = class {
  constructor(equipmentRepository) {
    this.equipmentRepository = equipmentRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      equipmentId
    }) {
      const equipment = yield this.equipmentRepository.findById(equipmentId);
      if (!equipment) {
        throw new Error("Equipment not found");
      }
      yield this.equipmentRepository.delete(equipmentId);
      return { messagem: "Item deleted successfully" };
    });
  }
};

// src/http/controllers/delete-equipment.controller.ts
function deleteEquipment(request, reply) {
  return __async(this, null, function* () {
    const getEquipmentSchema = import_zod5.z.object({
      equipmentId: import_zod5.z.string()
    });
    const { equipmentId } = getEquipmentSchema.parse(request.params);
    try {
      const repositories = new PrismaEquipmentRepository();
      const deleteEquipmentUseCase = new DeleteEquipmentUseCase(repositories);
      yield deleteEquipmentUseCase.execute({
        equipmentId
      });
      reply.status(200).send({ message: "Equipment deleted successfully" });
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(400).send({ message: error.message });
      }
      reply.status(500).send({ error });
    }
  });
}

// src/http/routes.ts
function appRoutes(app2) {
  return __async(this, null, function* () {
    app2.post("/register", createAccount);
    app2.post("/login", authenticateAccount);
    app2.post("/equipment", createEquipment);
    app2.put("/equipment/:equipmentId", editEquipment);
    app2.delete("/equipment/:equipmentId", deleteEquipment);
  });
}

// src/app.ts
var app = (0, import_fastify.default)();
app.register(appRoutes);

// src/env/index.ts
var import_zod6 = require("zod");
var import_config = require("dotenv/config");
var envSchema = import_zod6.z.object({
  NODE_ENV: import_zod6.z.enum(["dev", "test", "production"]).default("dev"),
  PORT: import_zod6.z.coerce.number().default(3333)
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error("Invalid environment variable", _env.error.format());
  throw new Error("Invalid environment variable");
}
var env = _env.data;

// src/server.ts
app.listen({
  host: "0.0.0.0",
  port: env.PORT
}).then(() => {
  console.log("\u{1F680} Servidor rodando...");
});
