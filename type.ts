// deno-lint-ignore-file
export type contacto = {
    id?: string
    name: string
    pais: string
    tlf: string
    time: Date
}

export type CustomError = {
    errors?: {}
    ErrorClass: string,
    Message: string,
    Solution: string
  }