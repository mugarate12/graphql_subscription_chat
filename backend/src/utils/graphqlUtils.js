const graphqlFields = (resolverInfo) => {
  let fields = []
  // se o retorn não tiver tipos escolhiveis(Tipo User, que deixa escolher entre id, content, author)
  // Esse info.fieldNodes[0].selectionSet vai ser undefined
  // não tem tipos escolhiveis é tipo o createUser que retorna um Boolean, ou seja, um único campo sem chance de escolha
  if (!resolverInfo.fieldNodes[0].selectionSet) {
    return fields
  }

  resolverInfo.fieldNodes[0].selectionSet.selections.map((Field, index) => {
    fields[index] = Field.name.value
  })

  return fields
}

module.exports = {
  graphqlFields
}
