import React, { useEffect } from "react";
import "./ChatView.css";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { selectedImage } from "./features/appSlice";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
function ChatView() {
  const selectedImg = useSelector(selectedImage);
  const history = useHistory();

  useEffect(() => {
    if (!selectedImg) {
      exit();
    }
  }, [selectedImg]);
  const exit = () => {
    history.replace("/chats");
  };

  return (
    <div className="chatView">
      <img src={selectedImg} onClick={exit} alt="profile" />
      <div className="chatView-timer">
        <CountdownCircleTimer
          isPlaying
          duration={10}
          strokeWidth={6}
          size={50}
          colors={[
            ["#004777", 0.33],
            ["#F78801", 0.33],
            ["#A30000", 0.33],
          ]}
        >
          {({ remainingTime }) => {
            if (remainingTime === 0) {
              exit();
            }
            return remainingTime;
          }}
        </CountdownCircleTimer>
      </div>
    </div>
  );
}

export default ChatView;
