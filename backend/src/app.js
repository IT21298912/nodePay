import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import corsOption from "./Config/CorsConfig.js";
import response from "./Utils/ResponseHandler/ResponseHandler.js";
import ResTypes from "./Utils/Constants/ResTypes.js";
import db from './db.js'
import PaymentRoute from './Routes/PaymentRoute.js'
import OrderRoute from './Routes/OrderRoute.js'


dotenv.config()
const app = express()
const PORT = process.env.PORT || 8500

app.use(cors(corsOption))
app.use(express.json())

app.get('/', (req, res) => {
    return response(res, 200, ResTypes.successMessages.server_online)
})

// proxies
app.use('/order', OrderRoute)
app.use('/payment', PaymentRoute)

//not found route
app.use((req, res) => {
    return response(res, 404, ResTypes.errors.not_found)
})

app.listen(PORT, () => {
    db()
    console.log(`Gateway is listening on ${PORT}`);
})
