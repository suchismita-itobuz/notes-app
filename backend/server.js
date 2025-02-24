import express from "express";
import userRoute from "./routes/userRoute.js";
import noteRoute from "./routes/noteRoute.js";
import dbConnect from "./config/dbConnection.js";
import cors from "cors"
import * as http from 'http';
import { Server } from "socket.io"
import { send } from "process";



const app = express()


app.use(cors())

app.use(express.json())
app.use("/user", userRoute)
app.use("/notes",noteRoute)
app.use('/uploads', express.static('uploads'));

const port = process.env.PORT;


const server = http.createServer(app); //server is created 
server.listen(port, () => console.log(`Server is running on port ${port}`));

const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173', //frontend url
      methods: ['GET', 'POST'] //methods allowed
    },
  });  //backend coonection with frontend established

io.on('connection',(socket)=>{
    console.log(`User connected ${socket.id}`)

    socket.on("joinRoom",({senderID, receiverID})=>{
        const roomID = [senderID, receiverID].sort().join("_")
        socket.join(roomID);
        console.log(`${senderID} joined ${roomID}`)
    })

    socket.on("send_message", (data) => {
      const { text, sentBy, roomID } = data;
      io.to(roomID).emit("receive_message", { text, sentBy }); 
  });
  
})


dbConnect()
