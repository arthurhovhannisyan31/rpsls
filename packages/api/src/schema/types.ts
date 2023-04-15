export interface FieldError {
  path: string
  message: string
}

export interface ResponseData<T> {
  errors?: FieldError[]
  data?: T
}
