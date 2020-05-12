const connection = require('./../../src/database/connection')
const graphqlTestCall = require('./../../src/utils/graphqlTestCall')
const MESSAGE_TABLE_NAME = 'messages'
const USER_TABLE_NAME = 'users'

describe('messages case', () => {
  const user = {
    username: "matt_cardoso2",
    password: "majuge123",
    name: "Mateus"
  }
  const contact = {
    username: "matt_cardoso3",
    password: 'majuge123'
  }
  let token

  beforeAll(async () => {
    const createUserMutation = `
      mutation UserMutation($username: String!, $password: String!, $name: String) {
        createUser(username: $username, password: $password, name: $name)
      }
    `
    const loginUserQuery = `
      query SignIn($username: String!, $password: String!){
        loginUser(username: $username, password: $password){
          token
        }
      }
    `

    const newUserRequestSucess = await graphqlTestCall(createUserMutation,{
      username: user.username,
      password: user.password,
      name: user.name
    })
    const contactUser = await graphqlTestCall(createUserMutation,{
      username: contact.username,
      password: contact.password
    })
    const loginUserRequestSucess = await graphqlTestCall(loginUserQuery, {
      username: user.username,
      password: user.password
    })
    token = `Bearer ${loginUserRequestSucess.data.loginUser.token}`
  })

  it('should create a message', async () => {
    const AddMessageMutation = `
      mutation MessageMutation($content: String!, $toUser: String!){
        addMessage(content: $content, toUser: $toUser)
      }
    `

    const addMessageRequestSucess = await graphqlTestCall(AddMessageMutation, {
      content: "sou uma mensagem",
      toUser: contact.username
    }, token)
    const addMessageRequestError = await graphqlTestCall(AddMessageMutation, {}, token)
    const addMessageRequestWithoutToken = await graphqlTestCall(AddMessageMutation, {
      content: "sou uma mensagem",
      toUser: contact.username
    })

    // pra buscar essa mensagem no banco
    const toUser = await connection(USER_TABLE_NAME)
      .select('id')
      .where({
        username: contact.username
      })
      .first()
    const myUser = await connection(USER_TABLE_NAME)
      .select('id')
      .where({
        username: user.username
      })
      .first()
    const searchMessageFromDatabase = await connection(MESSAGE_TABLE_NAME)
      .select('*')
      .where({
        authorFK: myUser.id,
        contactFK: toUser.id
      })
      .first()

    expect(addMessageRequestSucess.data.addMessage).toEqual(true)
    expect(searchMessageFromDatabase.content).toBe('sou uma mensagem')
    expect(searchMessageFromDatabase.authorFK).toBe(myUser.id)
    expect(searchMessageFromDatabase.contactFK).toBe(toUser.id)
    addMessageRequestError.errors.map(error => expect(error).toBeDefined())
    addMessageRequestWithoutToken.errors.map(error => expect(error).toBeDefined())
  })

  it('should get messages to conversation with two users', async () => {
    const ConversationQuery = `
      query Conversation($contactUsername: String!){
        conversation(contactUsername: $contactUsername){
          id
          content
          author {
            id
            username
            name
          }
        }
      }
    `

    const conversationRequestSucess = await graphqlTestCall(ConversationQuery, {
      contactUsername: contact.username
    }, token)
    const conversationRequestError = await graphqlTestCall(ConversationQuery, {}, token)
    const conversationRequestWithoutToken = await graphqlTestCall(ConversationQuery, {
      contactUsername: contact.username
    })

    // console.log(conversationRequestSucess.data.conversation) 
    expect(conversationRequestSucess.data.conversation).toEqual(expect.any(Array))
    conversationRequestError.errors.map(error => expect(error).toBeDefined())
    conversationRequestWithoutToken.errors.map(error => expect(error).toBeDefined())
  })
})
