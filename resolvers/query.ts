// deno-lint-ignore-file
import mongoose from "mongoose";
import { GraphQLError } from "graphql";
import newCustomError, { getcontact, getcontacts } from "../controlers/customerror.ts";
import { CustomError, contacto } from "../type.ts";

export const Query = {
    getContacts: async (): Promise<contacto[] | GraphQLError | CustomError> => {
        const contact = await getcontacts()
        if(!contact){
            throw new GraphQLError("Error al obtener contactos.")
        }
        return contact
    },

    getContact: async (_: unknown, args: {id: string}): Promise<contacto | GraphQLError | CustomError> => {
        if(!args || !args.id){
            throw new GraphQLError("Id no establecida.")
        }else if(mongoose.isValidObjectId(args.id)){
            throw new GraphQLError("Id no tiene el formato correcto.")
        }
        const contact = await getcontact(args.id)
        if(!contact){
            throw new GraphQLError("Id no valida.")
        }
        return contact
    }
}