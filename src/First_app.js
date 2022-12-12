import React, { useState } from "react";
import AgoraUIKit from "agora-react-uikit";
import AgoraRTC from "agora-rtc-sdk-ng";
const FirstApp = () => {
  const [videoCall, setVideoCall] = useState(false);
  const rtcProps = {
    appId: "b1010079b6b941c48ef2897e61cd4277",
    channel: "newChannel", // your agora channel
    token: "007eJxTYPi//O/8CYqGvC/1f3suPL17mabY/+I+13unezbNsvp5Q1FVgSHJ0MDQwMDcMsksydLEMNnEIjXNyMLSPNXMMDnFxMjcPE1/cnJDICODtshSJkYGCATxuRjyUsudMxLz8lJzGBgAlaoiTg==", // use null or skip if using app in testing mode
  };
  const callbacks = {
    EndCall: () => setVideoCall(false),
  };
  return (
    <div>
     {
        videoCall ? (
            <div style={{display: 'flex', width: '100vw', height: '100vh'}}>
              <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
            </div>
          ) : (
            <h3 onClick={() => setVideoCall(true)}>Start Call</h3>
          )
     }
    </div>
  );
};

export default FirstApp;
