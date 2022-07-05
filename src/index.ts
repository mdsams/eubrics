import { authentication } from "./authentication";
import { nameRouter } from "./routes/Router"
import { userRouter } from "./routes/userRoutes";
import { taskRouter } from "./routes/taskRoutes"
import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import path from "path";

const app = express()
app.use(express.json())
app.use(cors())
app.use('/', userRouter)
app.use('/get-behaviours', nameRouter)
app.use('/task', authentication, taskRouter)

// ** MIDDLEWARE ** //
const whitelist = ['http://localhost:3000', 'http://localhost:3000', 'https://shrouded-journey-38552.herokuapp.com']
const corsOptions = {
  origin: function ({ origin, callback }: any) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}



if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../public')));
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
  });
  // Serve any static files
  // Handle React routing, return all requests to React app

}

app.listen(process.env.PORT || 7678, () => console.log("app listening on port 3000"))

mongoose.connect("mongodb+srv://shams:Tyuio420@eubrics.kgyzi.mongodb.net/EubricsDatabase?retryWrites=true&w=majority" || '', (err: any) => {
  if (err) {
    console.log('Cant connect db')
  } else {
    console.log('Connected to db')
  }
})