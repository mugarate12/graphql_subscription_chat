const graphqlTestCall = require('./../../src/utils/graphqlTestCall')
const connection = require('./../../src/database/connection')
const USERTABLENAME = 'users'

describe('users case', () => {
  const user = {
    username: "matt_cardoso",
    password: "majuge123"
  }

  it('should create a new user', async () => {
    const createUserMutation = `
      mutation UserMutation($username: String!, $password: String!, $name: String) {
        createUser(username: $username, password: $password, name: $name)
      }
    `

    const newUserRequestSucess = await graphqlTestCall(createUserMutation,{
        username: user.username,
        password: user.password
      })

    const newUserRequestError = await graphqlTestCall(createUserMutation, {
      username: 'not_provided_fields'
    })

    const searchNewUserFromDatabase = await connection(USERTABLENAME)
      .select('username')
      .where({
        username: user.username,
      })
      .first()

    expect(newUserRequestSucess).toEqual({ data: { createUser: true }})
    expect(searchNewUserFromDatabase.username).toBe(user.username)
    newUserRequestError.errors.map(error => expect(error).toBeDefined())
  })

  it('should login a user', async () => {
    const loginUserQuery = `
      query SignIn($username: String!, $password: String!){
        loginUser(username: $username, password: $password){
          token
        }
      }
    `

    const token = await graphqlTestCall(loginUserQuery, {
      username: user.username,
      password: user.password
    })

    const loginUserRequestError = await graphqlTestCall(loginUserQuery, {
      username: user.username
    })

    const usernameNotValid = await graphqlTestCall(loginUserQuery, {
      username: "oraoraora"
    })
    
    expect(token.data.loginUser).toEqual({ token: expect.any(String) })
    loginUserRequestError.errors.map(error => expect(error).toBeDefined())
    usernameNotValid.errors.map(error => expect(error).toBeDefined())
  })
})
