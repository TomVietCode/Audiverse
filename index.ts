import express, { Express } from "express"
import dotenv from "dotenv"
dotenv.config()
import { connectDb } from "./config/connectDb"
import clientRoutes from "./routes/client/index.route"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import adminRoutes from "./routes/admin/index.route"
import path from "path"
import methodOverride from "method-override"

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

// Tiny MCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// Method Override
app.use(methodOverride('_method'))

adminRoutes(app)
clientRoutes(app)

app.listen(port, () => {
  console.log("App is listening on port " + port)
})