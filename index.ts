import express, { Express } from "express"
import dotenv from "dotenv"
import { connectDb } from "./config/connectDb"
import clientRoutes from "./routes/index.route"

dotenv.config()
connectDb()

const app: Express = express()
const port: string = process.env.PORT

app.set("views", `${__dirname}/views`)
app.set("view engine", "pug")

app.use(express.static("public"))

clientRoutes(app)

app.listen(port, () => {
  console.log("App is listening on port " + port)
})