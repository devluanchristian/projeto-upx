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

// src/use-cases/create-equipment-use-case.ts
var create_equipment_use_case_exports = {};
__export(create_equipment_use_case_exports, {
  CreateEquipmentUseCase: () => CreateEquipmentUseCase
});
module.exports = __toCommonJS(create_equipment_use_case_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateEquipmentUseCase
});
