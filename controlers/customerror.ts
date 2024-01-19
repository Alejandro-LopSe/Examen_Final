// deno-lint-ignore-file
import {CustomError,contacto} from "../type.ts";
import { contactoModel } from "../DB/name.ts";
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
import { GraphQLError } from "graphql";
export const newCustomError= function (clas: string, message: string, sol: string ,error?: any): CustomError{

    return {
      errors: error,
      ErrorClass: clas,
      Message: message,
      Solution: sol
    }

}
const env = await load()
const token_api = Deno.env.get("token_api") || env["token_api"];
export const getpais = async function(tlf: string){
  try{
    const data = await fetch(`https://api.api-ninjas.com/v1/validatephone?number=${tlf}`,
      {
        headers: {
          'X-Api-Key': token_api
      }})

    return data.json()
  }catch(error){
    return newCustomError("error imprevisto",error.message,error.path,error)
  }
}
export const gethora = async function(country: string){
  try{
    const data = await fetch(`https://api.api-ninjas.com/v1/worldtime?city=${country}`,
      {
        headers: {
          'X-Api-Key': token_api
      }})

    return data.json()
  }catch(error){
    return error as GraphQLError
  }
}
export const getcontacts = async function(){
  try{
    const conctacts = await contactoModel.find({})
    const finalconctact: contacto[]= await  Promise.all(conctacts.map(async (elem)=>{
      const pais = await getpais(elem.tlf)
      const hora = await gethora(pais.country)
      return {
        id: elem.id,
        name: elem.name,
        pais: pais.country,
        tlf: elem.tlf,
        time:  hora.datetime
      }
    }))
    return finalconctact
  }catch(error){
    return error as GraphQLError
  }
}
export const getcontact = async function(id: string){
  try{
    const conctacts = await contactoModel.findById(id)
    if(!conctacts){throw new GraphQLError("Id, invalida")}
    const pais = await getpais(conctacts.tlf)
    const hora = await gethora(pais.country)
    const finalconctact: contacto= {
        id: conctacts.id,
        name: conctacts.name,
        pais: pais.country,
        tlf: conctacts.tlf,
        time:  hora.datetime
      }
    return finalconctact
  }catch(error){
    return error as GraphQLError
  }
}
export default newCustomError