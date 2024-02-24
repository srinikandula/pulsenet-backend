export const successFormat = (status, message, data, error) => {
    return {
      status,
      message,
      data,
      error
    }
  }
    
export const errorFormat = (status, message, data, error, code = 400) => {
    return {
      status,
      message,
      data,
      error,
      code
    }
}
  

  