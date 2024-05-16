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

// src/repositories/in-memory/in-memory-user-repository.ts
var in_memory_user_repository_exports = {};
__export(in_memory_user_repository_exports, {
  InMemoryUserRepository: () => InMemoryUserRepository
});
module.exports = __toCommonJS(in_memory_user_repository_exports);
var InMemoryUserRepository = class {
  constructor() {
    this.items = [];
  }
  create(data) {
    return __async(this, null, function* () {
      const user = {
        id: "user-01",
        name: data.name,
        CPF: data.CPF,
        password_hash: data.password_hash,
        created_at: /* @__PURE__ */ new Date()
      };
      this.items.push(user);
      return user;
    });
  }
  findByCPF(CPF) {
    return __async(this, null, function* () {
      const user = this.items.find((user2) => user2.CPF === CPF);
      if (!user) {
        return null;
      }
      return user;
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InMemoryUserRepository
});
