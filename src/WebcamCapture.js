import { RadioButtonChecked } from '@material-ui/icons';
import React,{useRef, useCallback} from 'react'
import Webcam from 'react-webcam';
import {useDispatch} from "react-redux"
import { setCameraImage } from './features/cameraSlice';
import { useHistory } from 'react-router';
import "./WebcamCapture.css"

const videoConstraiants = {
    width: 250,
    height: 400,
    facingNode: "user",
};


function WebcamCapture() {
    const webcamRef = useRef(null);
    const dispatch = useDispatch();
    const history = useHistory()
    const capture = useCallback(() => {
        const imageSrc =webcamRef.current.getScreenshot();
        dispatch(setCameraImage(imageSrc))
        history.push("/preview")
    },[webcamRef])
    return (
        <div className="webcamCapture">
            <Webcam
            audio={false}
            height={videoConstraiants.height}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={videoConstraiants.width}
            videoConstraints={videoConstraiants}/>

            <RadioButtonChecked className="webcamCapture-button"
            onClick={capture} fontSize="large"/>
        </div>
    )
}

export default WebcamCapture
