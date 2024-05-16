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

// src/use-cases/create-account-use-case.ts
var create_account_use_case_exports = {};
__export(create_account_use_case_exports, {
  CreateAccountUseCase: () => CreateAccountUseCase
});
module.exports = __toCommonJS(create_account_use_case_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateAccountUseCase
});