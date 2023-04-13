export interface FieldError {
  field: string
  message: string
}

export interface ResponseData<T> {
  errors?: FieldError[]
  data?: T
}
