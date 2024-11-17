
import { app } from "./app.js"
import dotenv from "dotenv"
import { connection } from "./db/index.js"
dotenv.config({
    path:"./src/.env"
})

const PORT = process.env.PORT || 7001

connection()
.then(() => {
    app.listen(PORT, () => {
        console.log(`app is listening at port ${PORT}`)
    })
    
})
.catch((err) => {
    console.log("MongoDB Connection error: ",err)
})


