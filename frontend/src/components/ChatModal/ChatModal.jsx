import { useState, useEffect } from "react";
import { X, Send } from "lucide-react";

const ChatModal = ({ receiverName, messages, setOpenModal, openModal, senderID, roomID, socket }) => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState(messages || []); // Store messages locally

  useEffect(() => {
    setChatMessages(messages || []); // Update messages when prop changes
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const newMessage = {
      text: message,
      sentBy: senderID,
      roomID,
    };

    // Emit message to the backend
    socket.emit("send_message", newMessage);

    // Update UI immediately
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (newMessage) => {
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  const onClose = () => {
    setOpenModal(false);
  };

  if (!openModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gray-200 px-4 py-3 flex justify-between items-center">
          <h2 className="text-lg font-semibold">{receiverName}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X size={20} />
          </button>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 min-h-[300px] max-h-[400px]">
          {chatMessages.map((msg, index) => (
            <div
            key={index}
            className={`px-4 py-2 rounded-lg max-w-[80%] text-white ${
              msg.sentBy === senderID ? "bg-green-500 self-end ml-auto" : "bg-blue-500 self-start"
            }`}
          >
            {msg.text}
          </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t px-4 py-3 flex items-center gap-2">
          <input
            type="text"
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button onClick={handleSendMessage} className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
