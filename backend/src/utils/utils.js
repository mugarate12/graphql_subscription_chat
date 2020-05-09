const handleError = (error) => {
  const errorMessage = `${error.name}: ${error.message}`

  return new Error(errorMessage)
}

const throwError = (condition, message) => {
  if (condition) {
    throw new Error(message)
  }
}

module.exports = {
  handleError,
  throwError
}
