import React from "react";

const ChatList = ({ users, selectedUser, setSelectedUser }) => {
  return (
    <div className="chat-list">
      <div className="chat-header-title">Messages</div>

      {users.map((u) => (
        <div
          key={u._id}
          className={`chat-user ${
            selectedUser?._id === u._id ? "active" : ""
          }`}
          onClick={() => setSelectedUser(u)}
        >
          <img src={u.profile} alt="" />

          <div className="user-info">
            <p>{u.username}</p>
            <span>Start chat</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;