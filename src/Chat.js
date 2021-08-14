import { StopRounded } from "@material-ui/icons";
import React from "react";
import "./Chat.css";
import { Avatar } from "@material-ui/core";
// import ReactTimeago from "react-time-ago";
import { db } from "./firebase";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { selectImage } from "./features/appSlice";
function Chat({ id, username, timestamp, profilePic, read, imageUrl }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const open = () => {
    if (!read) {
      dispatch(selectImage(imageUrl));
      db.collection("posts").doc(id).set(
        {
          read: true,
        },
        { merge: true }
      );
      history.push("/chats/view");
    }
  };

  return (
    <div onClick={open} className="chat">
      <Avatar className="chat-avatar" src={profilePic} />
      <div className="chat-info">
        <h4>{username}</h4>
        <p>
          {!read && "Tap to view - "}
          {new Date(timestamp?.toDate()).toUTCString()}
        </p>
      </div>

      {!read && <StopRounded className="chat-readIcon" />}
    </div>
  );
}

export default Chat;
