import express, { Express } from "express"
import dotenv from "dotenv"
import { connectDb } from "./config/connectDb"
import clientRoutes from "./routes/client/index.route"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"

dotenv.config()
connectDb()

const app: Express = express()
const port: string = process.env.PORT

app.set("views", `${__dirname}/views`)
app.set("view engine", "pug")

app.use(express.static("public"))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Cookie parser
app.use(cookieParser())

clientRoutes(app)

app.listen(port, () => {
  console.log("App is listening on port " + port)
})