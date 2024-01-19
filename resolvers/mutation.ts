// deno-lint-ignore-file
import { contactoModel } from "../DB/name.ts";
import {CustomError,contacto} from "../type.ts";
import { getcontact } from "../controlers/customerror.ts";
import { getpais,newCustomError } from "../controlers/customerror.ts";
import { GraphQLError } from "graphql";
import mongoose from "mongoose";
export const Mutation  = {
    addContact: async (_:unknown, args:{name: string, tlf: string}): Promise<contacto | GraphQLError | CustomError> => {
        
        const {name, tlf} = args
        if(!name || !tlf){
            throw new GraphQLError("NOT PROVIDED. Faltan datos.")
        }
        const pais = await getpais(tlf)
        const name_n = new contactoModel({
            name: name,
            pasi: pais.country,
            tlf: tlf
        })
        const name_new = await contactoModel.create(name_n)
        
        const contact = await getcontact(name_new.id)
        return contact
            
        
    },
    updateContact: async (_:unknown, args:{id: string,name: string, tlf: string}): Promise<contacto | GraphQLError | CustomError> => {
        
        const {id,name,tlf} = args
        if(!id){
            throw new GraphQLError("NOT PROVIDED, Falta id.")
        }else if(mongoose.isValidObjectId(id)){
            throw new GraphQLError("ERROR, Id no tiene el formato correcto.")
        }
        const name_1 = await contactoModel.findById(id)

        if(!name_1){
            throw new GraphQLError("NOT FOUND, Id erronea.")
        }
        
        if(name){
            name_1.name=name
        }
        if(tlf){
            name_1.tlf = tlf
        }
        const c = await name_1.save()        
        const contact = await  getcontact(c.id)
        return contact
    },
    deleteContact: async (_:unknown, args:{id: string}): Promise<boolean | GraphQLError | CustomError> => {
        
        const {id} = args
        if(!id){
            throw new GraphQLError("NOT PROVIDED. Falta id.")
        }else if(mongoose.isValidObjectId(id)){
            throw new GraphQLError("ERROR, Id no tiene el formato correcto.")
        }
        const name_1 = await contactoModel.findByIdAndDelete(id)

        if(!name_1){
            return false
        }
        return true
    }
}