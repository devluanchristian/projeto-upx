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

// src/use-cases/edit-equipment-use-case.ts
var edit_equipment_use_case_exports = {};
__export(edit_equipment_use_case_exports, {
  EditEquipmentUseCase: () => EditEquipmentUseCase
});
module.exports = __toCommonJS(edit_equipment_use_case_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EditEquipmentUseCase
});
