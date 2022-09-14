"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUsersService = void 0;
const data_source_1 = require("../../data-source");
const users_entity_1 = require("../../entities/users.entity");
const appError_1 = require("../../erros/appError");
const bcrypt_1 = require("bcrypt");
const updateUsersService = ({ id, age, cpf, email, name, password }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!age && !cpf && !email && !name && !password) {
        throw new appError_1.AppError(400, "Wrong format");
    }
    let newPassword = password;
    if (password) {
        newPassword = yield (0, bcrypt_1.hash)(password, 10);
    }
    const usersRepository = data_source_1.AppDataSource.getRepository(users_entity_1.Users);
    const { affected } = yield usersRepository.update(id, { name, cpf, email, age, password: newPassword });
    if (affected === 0)
        throw new appError_1.AppError(404, "user not found");
    return { message: "User updated" };
});
exports.updateUsersService = updateUsersService;
