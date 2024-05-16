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

// src/http/controllers/create-equipment.controller.ts
var create_equipment_controller_exports = {};
__export(create_equipment_controller_exports, {
  createEquipment: () => createEquipment
});
module.exports = __toCommonJS(create_equipment_controller_exports);
var import_zod = require("zod");

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
var import_client = require("@prisma/client");
var PrismaEquipmentRepository = class extends import_client.PrismaClient {
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
    const createEquipmentBodySchema = import_zod.z.object({
      name: import_zod.z.string(),
      status: import_zod.z.boolean(),
      nextManutentionDate: import_zod.z.string(),
      currentInstallationDate: import_zod.z.string(),
      location: import_zod.z.string(),
      serialNumber: import_zod.z.string()
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createEquipment
});
