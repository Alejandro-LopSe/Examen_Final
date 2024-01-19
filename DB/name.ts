// deno-lint-ignore-file
import mongoose from "mongoose";
import { contacto } from "../type.ts";
import { getpais } from "../controlers/customerror.ts";
import { GraphQLError } from "graphql";

const Schema = mongoose.Schema;

const contactoSchema = new Schema(
  {
    name: { type: String, required: true },
    pais: { type: String },
    tlf: { type: String, required: true },
  }
);
contactoSchema.path("tlf").validate(async function(tlf:string){
  const wrongtlf = await getpais(tlf)
  const valid = wrongtlf.is_valid
  if(false===valid){
    throw new GraphQLError("Error, tlf incorrecto, siga el formato '+xxxxxxxxxxx'")
  }
  const exist = await contactoModel.findOne({tlf: tlf})

  if(exist && this.id!==exist!.id){
    throw new GraphQLError("Error al añadir Contacto. Ya existe.")
  }else if(exist && this.id===exist!.id){
    return "El tlf es el mismo."
  }
  
})

contactoSchema.pre("save", async function(next){
  console.log("saving");
  const pais = await getpais(this.tlf)
  this.pais=pais.country
  next()
})

export type contactoModelType = mongoose.Document & Omit<contacto, "id">;

export const contactoModel = mongoose.model<contactoModelType>(
  "contactos",
  contactoSchema
);
