import express from "express";
import userRoute from "./routes/userRoute.js";
import noteRoute from "./routes/noteRoute.js";
import dbConnect from "./config/dbConnection.js";
import cors from "cors"
import * as http from 'http';
import { Server } from "socket.io"
import { chat } from "./controllers/noteController.js";



const app = express()


app.use(cors())

app.use(express.json())
app.use("/user", userRoute)
app.use("/notes",noteRoute)
app.use('/uploads', express.static('uploads'));

const port = process.env.PORT;


const server = http.createServer(app);
server.listen(port, () => console.log(`Server is running on port ${port}`));

const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST']
    },
  });

io.on('connection',(socket)=>{
    console.log(`User connected ${socket.id}`)

    socket.on("send_message",(data)=>{
        console.log(data.message.message)
        console.log(data.fname)
        chat(data.fname,data.message.message)
    })

    
    
})





dbConnect()
