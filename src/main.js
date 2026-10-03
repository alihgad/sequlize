import express from 'express'
import { PORT } from "./config/config.service.js"
import { connect } from './db/connection.js'
import { userRouter , blogRouter } from './module/index.js'
const app = express()

app.use(express.json())

await connect()
app.use("/user", userRouter)
app.use("/blog", blogRouter)
app.get('/', async (req, res) => {
  res.send('Hello World!')
})

app.use((err,req,res,next)=>{
  res.status(err.cause || 500).json({
    message : err.message,
    stack : err.stack,
    err
  })
})
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))