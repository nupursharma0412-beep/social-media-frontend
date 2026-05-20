import React, { useEffect, useState } from "react";
import { getChatUsers } from "../services/chat.api";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import "../style/chat.scss";

const Messages = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await getChatUsers();
    setUsers(data.users);
  };

  return (
    <div className="messages-page">
      <ChatList
        users={users}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />

      <ChatWindow user={selectedUser} />
    </div>
  );
};

export default Messages;