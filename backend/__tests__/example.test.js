const graphqlTestCall = require('./../src/utils/graphqlTestCall')

describe('test example', () => {
  const addMessageMutation = `
    mutation MessageMutation($content: String!){
      addMessage(content: $content){
        id,
        content,
        author
      }
    }
  `

  it('should test add message', async () => {
    const message = await graphqlTestCall(
      addMessageMutation,
      {
        content: "eu sou uma mensagem"
      }
    )

    expect(message).toEqual({data: {
      addMessage: {
        id: 1,
        content: "eu sou uma mensagem",
        author: "eu mesmo"
      }
    }})
  })

})