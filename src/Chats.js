import React, { useEffect, useState } from "react";
import "./Chats.css";
import { Avatar } from "@material-ui/core";
import { ChatBubble, Search } from "@material-ui/icons";
import { db } from "./firebase";
import Chat from "./Chat.js";
function Chats() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);
  return (
    <div className="chats">
      ,
      <div className="chats-header">
        <Avatar className="chats-avatar" />
        <div className="chats-search">
          <Search />
          <input placeholder="Friends" type="text" />
        </div>
        <ChatBubble className="chats-chatIcon" />
      </div>
      <div className="chat-posts">
        {posts.map(({ id, data: { username, timestamp, imageUrl, read } }) => {
          return (
            <Chat
              key={id}
              id={id}
              username={username}
              timestamp={timestamp}
              imageUrl={imageUrl}
              read={read}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Chats;
