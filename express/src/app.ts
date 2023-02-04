import 'dotenv/config'
import express from "express"
import { Request, Response } from "express"

// import LolaDB SDK and initialize it with your API key
import LolaDB from '@loladb/sdk-js'
const lola = new LolaDB(process.env.LOLA_API_KEY)

// create and setup express app
const app = express()
app.use(express.json())


/**
 * Get's all users.
 * 
 * In this example, a SQL query is defined in lola like:
 * 
 * SELECT * FROM users LIMIT {{offset}},{{limit}};
 * 
 **/
app.get("/users", async function (req: Request, res: Response) {
  const { data: users, error } = await lola.query.execute({
    queryId: '{{YOUR_QUERY_ID}}',
    context: {
      offset: req.query.offset || 0,
      limit: req.query.limit || 10,
    }
  })

  if(error){
    console.error(error)
    return res.status(500).send(error)
  }

  res.json(users)
})


/**
 * Get's a user by id.
 * 
 * In this example, a SQL query is defined in lola like:
 * 
 * SELECT * FROM users WHERE userId = '{{userId}}'
 */
app.get("/users/:id", async function (req: Request, res: Response) {
  const { data: user, error } = await lola.query.execute({
    queryId: '{{YOUR_QUERY_ID}}',
    context: {
      userId: req.params.id,
    }
  })
  
  if(error){
    console.error(error)
    return res.status(500).send(error)
  }

  res.json(user)

})

/**
 * Creates a new user.
 * 
 * In this example, a SQL query is defined in lola like:
 * 
 * INSERT INTO users (first_name, last_name, email, password)
 * VALUES ('{{firstName}}', '{{lastName}}', '{{email}}', '{{password}}')
 */
app.post("/users", async function (req: Request, res: Response) {
  const { data: result, error } = await lola.query.execute({
    queryId: '{{YOUR_QUERY_ID}}',
    context: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    }
  })

  if(error){
    console.error(error)
    return res.status(500).send(error)
  }

  return res.send(result)
})

/**
 * Updates an existing user.
 * 
 * In this example, a SQL query is defined in lola like:
 * 
 * UPDATE users SET ? WHERE id = '{{userId}}'
 * 
 * By using the `?` placeholder, as long as the context object has object properties that match the 
 * column names of the table it is writing to, the query will work.
 */
app.put("/users/:userId", async function (req: Request, res: Response) {
  const { data: result, error } = await lola.query.execute({
    queryId: '{{YOUR_QUERY_ID}}',
    context: {
      email: req.body.email,
    }
  })

  if(error){
    console.error(error)
    return res.status(500).send(error)
  }

  return res.send(result)
})


/**
 * Deletes a user.
 * 
 * In this example, a SQL query is defined in lola like:
 * 
 * DELETE FROM users WHERE userId = '{{userId}}'
 */
app.delete("/users/:id", async function (req: Request, res: Response) {
  const { data: result, error } = await lola.query.execute({
    queryId: '{{YOUR_QUERY_ID}}',
    context: {
      userId: req.params.id,
    }
  })

  if(error){
    console.error(error)
    return res.status(500).send(error)
  }

  return res.send(result)
})


// start express server
app.listen(3003, () => {
    console.log("Server started at http://localhost:3003")
})
