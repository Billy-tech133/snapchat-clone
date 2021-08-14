import {
  AttachFile,
  Close,
  Create,
  Crop,
  MusicNote,
  Note,
  Send,
  Timer,
} from "@material-ui/icons";
import React, { useEffect } from "react";
import "./Preview.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { resetCameraImage, selectCameraImage } from "./features/cameraSlice";
import { TextField } from "@material-ui/core";
import { db, storage } from "./firebase";
import firebase from "firebase";
import { v4 as uuid } from "uuid";
import { selectUser } from "./features/appSlice";
function Preview() {
  const user = useSelector(selectUser);
  const cameraImage = useSelector(selectCameraImage);
  const history = useHistory();
  const dispatch = useDispatch();
  const closePreview = () => {
    dispatch(resetCameraImage());
    history.replace("/");
  };
  const sendPost = () => {
    const id = uuid();
    const uploadTask = storage
      .ref(`post/${id}`)
      .putString(cameraImage, "data_url");

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.log(error);
      },
      () => {
        //COMPLETE FUNCTION
        storage
          .ref("post")
          .child(id)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              imageUrl: url,
              username: user.username,
              read: false,
              profilePic: user.profilePic,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            history.replace("/chats");
          });
      }
    );
  };
  useEffect(() => {
    if (!cameraImage) {
      history.replace("/");
    }
  }, [cameraImage, history]);
  return (
    <div className="preview">
      <Close onClick={closePreview} className="preview-close" />
      <div className="preview-toolbarRight">
        <TextField />
        <Create />
        <Note />
        <MusicNote />
        <AttachFile />
        <Crop />
        <Timer />
      </div>
      <img src={cameraImage} alt="my" />
      <div className="preview-footer" onClick={sendPost}>
        <h2>Send Now</h2>
        <Send fontSize="small" className="preview-sendIcon" />
      </div>
    </div>
  );
}

export default Preview;
