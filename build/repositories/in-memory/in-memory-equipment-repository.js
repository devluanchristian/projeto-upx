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

// src/repositories/in-memory/in-memory-equipment-repository.ts
var in_memory_equipment_repository_exports = {};
__export(in_memory_equipment_repository_exports, {
  InMemoryEquipmentRepository: () => InMemoryEquipmentRepository
});
module.exports = __toCommonJS(in_memory_equipment_repository_exports);
var InMemoryEquipmentRepository = class {
  constructor() {
    this.items = [];
  }
  create(data) {
    return __async(this, null, function* () {
      var _a, _b, _c, _d;
      const equipment = {
        id: "equipment-01",
        name: data.name,
        description: (_a = data.description) != null ? _a : null,
        lastManutentionDate: data.lastManutentionDate ? new Date(data.lastManutentionDate) : null,
        nextManutentionDate: new Date(data.nextManutentionDate),
        currentInstallationDate: new Date(data.currentInstallationDate),
        location: data.location,
        url_image: (_b = data.url_image) != null ? _b : null,
        status: (_c = data.status) != null ? _c : null,
        // Corrigido para ser boolean | null
        serialNumber: data.serialNumber,
        created_at: /* @__PURE__ */ new Date(),
        updated_at: (_d = /* @__PURE__ */ new Date()) != null ? _d : null
        //
      };
      this.items.push(equipment);
      return equipment;
    });
  }
  findById(id) {
    return __async(this, null, function* () {
      const equipment = this.items.find((item) => item.id === id);
      if (!equipment) {
        return null;
      }
      return equipment;
    });
  }
  save(id, equipment) {
    return __async(this, null, function* () {
      const equipmentId = this.items.find((item) => item.id === id);
      if (equipmentId) {
        const itemIndex = this.items.findIndex((item) => item.id === equipment.id);
        this.items[itemIndex] = equipment;
      }
      return equipment;
    });
  }
  delete(equipmentId) {
    return __async(this, null, function* () {
      const itemIndex = this.items.findIndex((item) => item.id === equipmentId);
      this.items.splice(itemIndex, 1);
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InMemoryEquipmentRepository
});
