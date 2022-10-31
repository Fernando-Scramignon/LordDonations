import { IadressesCreate } from "../../interfaces/adresses";

import { AppDataSource } from "../../data-source";
import { AppError } from "../../erros/appError";

import { Addresseses } from "../../entities/Addresses.entities";

import { v4 as uuid } from "uuid"
// // import bcrypt from "bcrypt";

const adressesCreateService = async ({city, state, number, cep, district}: IadressesCreate) => {

    const AddressesesRepository = AppDataSource.getRepository(Addresseses) ;

    if(!city || !state || !number || !cep || !district) {
        throw new AppError(400, "Wrong format");
    }

    const DadosAddresseses = await AddressesesRepository.find();

    const cepAlreadyExists = DadosAddresseses.find(user => user.cep === cep);

    // const numberAlreadyExists = DadosAddresseses.find(user => user.number === number)

    if (cepAlreadyExists) {
        throw new AppError(409, "address already exists");
    }

    const myID = uuid();

    const newAddresseses = {
    "id":myID,
	"city": city,
	"state":state,
	"number":number,
	"cep":cep,
	"district":district
}

    AddressesesRepository.create(newAddresseses);
    await AddressesesRepository.save(newAddresseses);

    return newAddresseses;
}

export default adressesCreateService;