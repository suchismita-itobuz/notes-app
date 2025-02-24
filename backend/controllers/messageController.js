import Message from "../models/MessageSchema.js"


export async function fetchMessagesByRoomId(req,res) {
    try {
        const { roomID } = req.params;
        const messages = await Message.find({ roomID }).populate("sentBy", "fname");
        res.status(200).json(messages); 
    } catch (error) {
        console.error("Error fetching chat history:", error);
        res.status(500).json(
            { error: "Internal server error" }
        );
    }
}
  