import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { getMessages, sendMessage } from "../services/chat.api";
import { socket } from "../../../socket";

const ChatWindow = ({ user }) => {
  const { user: currentUser } = useAuth();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const bottomRef = useRef();

  useEffect(() => {
    if (user) loadMessages();
  }, [user]);

  useEffect(() => {
    if (!currentUser) return;

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("addUser", currentUser._id);

    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;

    const handleReceive = (data) => {
      if (data.senderId === user?._id) {
        setMessages((prev) => [...prev, data]);
      }
    };

    socket.on("receiveMessage", handleReceive);

    return () => socket.off("receiveMessage", handleReceive);
  }, [currentUser, user]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadMessages = async () => {
    const data = await getMessages(user._id);
    setMessages(data);
  };

  const handleSend = async () => {
  if (!text.trim()) return;

  const msg = {
    senderId: currentUser._id,
    receiverId: user._id,
    text,
  };

  // ✅ Update UI immediately — don't wait for the API
  setMessages((prev) => [...prev, msg]);
  setText("");

  socket.emit("sendMessage", msg);

  try {
    await sendMessage(user._id, msg.text);
  } catch (err) {
    setMessages((prev) => prev.filter((m) => m !== msg));
    console.error("Failed to send message", err);
  }
};

  if (!user) {
    return <div className="chat-empty">Select a user to start chatting</div>;
  }

  return (
    <div className="chat-window">

      <div className="chat-header">
        <img src={user.profile} alt="" />
        <p>{user.username}</p>
      </div>

      <div className="chat-messages">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`bubble ${
              m.senderId === currentUser._id ? "me" : "other"
            }`}
          >
            {m.text}
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      <div className="chat-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>

    </div>
  );
};

export default ChatWindow;