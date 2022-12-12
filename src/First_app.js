import React, { useState } from "react";
import AgoraUIKit from "agora-react-uikit";
import AgoraRTC from "agora-rtc-sdk-ng";
const FirstApp = () => {
  const [videoCall, setVideoCall] = useState(false);
  const [tokenInp, setTokenInp] = useState("");
  const [channelInp, setChannelInp] = useState("");
  const rtcProps = {
    appId: "b1010079b6b941c48ef2897e61cd4277",
    channel: channelInp, // your agora channel
    token: tokenInp,
  };
  const callbacks = {
    EndCall: () => setVideoCall(false),
  };
  return (
    <div>
      {videoCall ? (
        <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
          <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
        </div>
      ) : (
        <>
          <input
            type="text"
            onChange={(e) => setChannelInp(e.target.value)}
            placeholder="channel name"
          />
          <br />
          <br />
          <input
            type="text"
            onChange={(e) => setTokenInp(e.target.value)}
            placeholder="toekn"
          />
          <br />
          <br />
          <button onClick={() => setVideoCall(true)}>Start Call</button>
        </>
      )}
    </div>
  );
};

export default FirstApp;
