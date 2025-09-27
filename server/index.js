const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDb = require('./src/config/db.config');
const authRoutes = require("./src/routes/auth.route")
const userRoutes = require("./src/routes/user.route")
const authMiddleware = require("./src/middlewares/auth.middleware")
const organisationRoutes = require('./src/routes/organisation.route')
const notesRoutes = require('./src/routes/notes.route')
require("dotenv").config();


const app = express();
connectDb();
app.use(express.json())
app.use(cors({ 
        origin: process.env.CLIENT_URL, 
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
      }));
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.set("trust proxy", true);


app.use('/auth', authRoutes)

app.use('/organisation', organisationRoutes)
app.use('/user', authMiddleware, userRoutes)
app.use('/notes', authMiddleware, notesRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`App is listening on http://localhost:${process.env.PORT}`)
})
