import React, { useEffect, useState } from "react";
import "./Chats.css";
import { Avatar } from "@material-ui/core";
import { ChatBubble, RadioButtonChecked, Search } from "@material-ui/icons";
import { auth, db } from "./firebase";
import Chat from "./Chat.js";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUser } from "./features/appSlice";
import { useHistory } from "react-router";
import { resetCameraImage } from "./features/cameraSlice";

function Chats() {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const takeSnap = () => {
    dispatch(resetCameraImage());
    history.push("/");
  };
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
      <div className="chats-header">
        <Avatar
          src={user.profilePic}
          onClick={() => auth.signOut()}
          className="chats-avatar"
        />
        <div className="chats-search">
          <Search className="chats-searchIcon" />
          <input placeholder="Friends" type="text" />
        </div>
        <ChatBubble className="chats-chatIcon" />
      </div>
      <div className="chat-posts">
        {posts.map(
          ({
            id,
            data: { profilePic, username, timestamp, imageUrl, read },
          }) => {
            return (
              <Chat
                key={id}
                id={id}
                username={username}
                timestamp={timestamp}
                imageUrl={imageUrl}
                read={read}
                profilePic={profilePic}
              />
            );
          }
        )}
      </div>
      <RadioButtonChecked className="chats-takePicIcon" onClick={takeSnap} />
    </div>
  );
}

export default Chats;
